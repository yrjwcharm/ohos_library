# 
#  Copyright (c) 2026 Huawei Device Co., Ltd.
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#  
#      http://www.apache.org/licenses/LICENSE-2.0
#  
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.
# 

#!/usr/bin/env python3
"""
Media File Format Analyzer for HarmonyOS Media Kit

Detects media file format via magic bytes, validates container structure,
checks for truncation and corruption. Only deeply analyzes formats supported
by HarmonyOS Media Kit; unsupported formats get a direct conclusion.

Usage:
    python media_file_analyzer.py --file <path> [--json] [--max-read-size 65536]

Output: JSON with format detection, container integrity, truncation check,
        issues list, overall assessment, and error code correlation.
"""

import argparse
import json
import os
import struct
import sys
from datetime import datetime, timezone
from pathlib import Path

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

SUPPORTED_FORMATS = {"mp4", "mkv", "ts", "m4a", "aac", "mp3", "flac", "wav", "ogg", "amr"}

DEFAULT_HEADER_READ = 65536   # 64 KB
DEFAULT_TAIL_READ = 4096      # 4 KB
MOOV_SCAN_TAIL = 32768        # 32 KB – scan tail for moov atom

# Format signature table: (offset, magic_bytes) -> (format_id, display_name)
# None means secondary check is required
FORMAT_SIGNATURES = [
    # Supported formats
    (4,  b"ftyp",                                      None),          # MP4 / M4A / 3GP
    (0,  b"\x1a\x45\xdf\xa3",                         ("mkv", "Matroska")),
    (0,  b"\x47",                                      ("ts", "MPEG-TS")),
    (0,  b"\xff\xf1",                                  ("aac", "AAC ADTS")),
    (0,  b"\xff\xf9",                                  ("aac", "AAC ADTS")),
    (0,  b"\xff\xfb",                                  ("mp3", "MP3")),
    (0,  b"\xff\xf3",                                  ("mp3", "MP3")),
    (0,  b"\xff\xf2",                                  ("mp3", "MP3")),
    (0,  b"ID3",                                       ("mp3", "MP3 (ID3)")),
    (0,  b"fLaC",                                      ("flac", "FLAC")),
    (0,  b"RIFF",                                      None),          # WAV / AVI
    (0,  b"OggS",                                      ("ogg", "OGG")),
    (0,  b"#!AMR",                                     ("amr", "AMR")),
    # Unsupported formats (detect for quick return)
    (0,  b"FLV\x01",                                   ("flv", "Flash Video")),
    (0,  b"\x30\x26\xb2\x75\x8e\x66\xcf\x11",        ("wmv", "WMV/ASF")),
    (0,  b"\x1f\x43\xd6\x81",                         ("webm", "WebM")),
]

# MP4 ftyp brand -> format mapping
MP4_BRAND_MAP = {
    b"M4A ": "m4a",
    b"M4A0": "m4a",
    b"M4AH": "m4a",
    b"m4a ": "m4a",
    b"3gp":  "mp4",   # 3GP variants map to mp4 container for our purposes
    b"3g2":  "mp4",
    b"isom": "mp4",
    b"iso2": "mp4",
    b"iso3": "mp4",
    b"iso4": "mp4",
    b"iso5": "mp4",
    b"iso6": "mp4",
    b"mp41": "mp4",
    b"mp42": "mp4",
    b"avc1": "mp4",
    b"MSNV": "mp4",
    b"dash": "mp4",
    b"qt  ": "mp4",
}

# Extension -> expected format mapping
EXTENSION_FORMAT_MAP = {
    ".mp4": "mp4", ".m4v": "mp4", ".m4a": "m4a", ".m4r": "m4a",
    ".3gp": "mp4", ".3g2": "mp4",
    ".mkv": "mkv", ".mk3d": "mkv", ".mka": "mkv",
    ".ts":  "ts",  ".m2ts": "ts", ".mts": "ts",
    ".aac": "aac", ".adts": "aac",
    ".mp3": "mp3",
    ".flac": "flac",
    ".wav": "wav", ".wave": "wav",
    ".ogg": "ogg", ".oga": "ogg", ".ogv": "ogg",
    ".amr": "amr", ".awb": "amr",
    ".avi": "avi", ".wmv": "wmv", ".asf": "wmv",
    ".flv": "flv", ".webm": "webm", ".ape": "ape",
}

# ---------------------------------------------------------------------------
# Data classes (plain dicts for simplicity)
# ---------------------------------------------------------------------------

def _format_info(detected_format, display_name, file_extension, extension_matches,
                 confidence, supported, signature_hex=None):
    return {
        "detected_format": detected_format,
        "display_name": display_name,
        "file_extension": file_extension,
        "extension_matches_format": extension_matches,
        "detection_confidence": confidence,
        "supported_by_media_kit": supported,
        "signature_hex": signature_hex,
    }


def _issue(severity, category, message, detail=None):
    d = {"severity": severity, "category": category, "message": message}
    if detail:
        d["detail"] = detail
    return d


def _truncation_info(is_truncated, declared_size, actual_size, assessment,
                     is_oversized=False, extra_bytes=None):
    return {
        "is_truncated": is_truncated,
        "is_oversized": is_oversized,
        "declared_size": declared_size,
        "actual_size": actual_size,
        "size_diff": actual_size - declared_size if declared_size is not None else None,
        "extra_bytes": extra_bytes,
        "assessment": assessment,
    }


def _error_code_correlation(fmt, issues, truncated):
    """Build error code correlation based on analysis results."""
    cor_5400103 = {"relevant": False, "reason": ""}
    cor_5400106 = {"relevant": False, "reason": ""}

    if fmt is None:
        cor_5400103["relevant"] = True
        cor_5400103["reason"] = "无法识别文件格式，文件可能严重损坏导致 IO 错误"
        cor_5400106["relevant"] = True
        cor_5400106["reason"] = "无法识别文件格式，播放器无法解析"
        return {"5400103": cor_5400103, "5400106": cor_5400106}

    if fmt not in SUPPORTED_FORMATS:
        cor_5400106["relevant"] = True
        cor_5400106["reason"] = f"文件格式 {fmt} 不在 Media Kit 支持范围内"
        return {"5400103": cor_5400103, "5400106": cor_5400106}

    if truncated:
        cor_5400103["relevant"] = True
        cor_5400103["reason"] = "文件可能被截断，读取超出范围时触发 IO 错误"
        cor_5400106["relevant"] = True
        cor_5400106["reason"] = "文件截断导致容器结构不完整"

    for iss in issues:
        cat = iss["category"]
        if cat in ("header_corrupt", "zero_filled", "missing_moov", "atom_size_overflow", "wav_trailing_data"):
            cor_5400103["relevant"] = True
            cor_5400103["reason"] = cor_5400103["reason"] or "文件头部损坏可能导致 IO 错误"
            cor_5400106["relevant"] = True
            cor_5400106["reason"] = cor_5400106["reason"] or "文件容器结构损坏"
        if cat == "extension_mismatch":
            cor_5400106["relevant"] = True
            cor_5400106["reason"] = cor_5400106["reason"] or "文件扩展名与实际格式不匹配"
        if cat == "wav_trailing_data":
            cor_5400103["relevant"] = True
            cor_5400103["reason"] = "WAV 文件包含尾部多余非码流数据，可能导致播放器 IO 错误"

    if not cor_5400106["reason"]:
        cor_5400106["reason"] = "文件格式在支持范围内且结构正常，错误码非文件格式问题"
    if not cor_5400103["reason"]:
        cor_5400103["reason"] = "文件可正常读取，IO 错误非文件层面问题"

    return {"5400103": cor_5400103, "5400106": cor_5400106}

# ---------------------------------------------------------------------------
# Analyzer
# ---------------------------------------------------------------------------

class MediaFileAnalyzer:
    def __init__(self, file_path, max_read_size=None):
        self.path = Path(file_path)
        self.max_read_size = max_read_size or DEFAULT_HEADER_READ
        self._header = None
        self._tail = None
        self._file_size = None

    # -- I/O helpers --

    def _get_file_size(self):
        if self._file_size is None:
            self._file_size = os.path.getsize(str(self.path))
        return self._file_size

    def _read_header(self, size=None):
        if self._header is None or (size and size > len(self._header)):
            try:
                read_size = size or self.max_read_size
                with open(str(self.path), "rb") as f:
                    self._header = f.read(read_size)
            except OSError:
                self._header = b""
        return self._header

    def _read_tail(self, size=DEFAULT_TAIL_READ):
        if self._tail is None:
            try:
                fsz = self._get_file_size()
                tail_start = max(0, fsz - size)
                with open(str(self.path), "rb") as f:
                    f.seek(tail_start)
                    self._tail = f.read()
            except OSError:
                self._tail = b""
        return self._tail

    # -- Format detection --

    def _detect_format(self):
        """Detect file format via magic bytes. Returns _format_info dict."""
        header = self._read_header(64)
        if len(header) < 4:
            return _format_info(None, None, self._get_extension(), None, "low", False)

        ext = self._get_extension()

        for offset, magic, result in FORMAT_SIGNATURES:
            end = offset + len(magic)
            if len(header) < end:
                continue
            if header[offset:end] == magic:
                sig_hex = header[:16].hex()

                if result is None:
                    # Secondary check needed
                    return self._secondary_check(header, ext, sig_hex)

                fmt_id, display = result
                supported = fmt_id in SUPPORTED_FORMATS
                ext_match = self._extension_matches(ext, fmt_id)
                confidence = "high" if len(magic) >= 3 else "medium"
                return _format_info(fmt_id, display, ext, ext_match, confidence, supported, sig_hex)

        return _format_info(None, None, ext, None, "low", False)

    def _secondary_check(self, header, ext, sig_hex):
        """Handle formats that need secondary identification (MP4 family, RIFF family)."""
        if header[4:8] == b"ftyp":
            # MP4 / M4A / 3GP
            brand = header[8:12]
            fmt_id = MP4_BRAND_MAP.get(brand, "mp4")
            supported = fmt_id in SUPPORTED_FORMATS
            ext_match = self._extension_matches(ext, fmt_id)
            display = "MPEG-4 Audio" if fmt_id == "m4a" else "MPEG-4"
            return _format_info(fmt_id, display, ext, ext_match, "high", supported, sig_hex)

        if header[:4] == b"RIFF":
            subtype = header[8:12]
            if subtype == b"WAVE":
                ext_match = self._extension_matches(ext, "wav")
                return _format_info("wav", "WAVE Audio", ext, ext_match, "high", True, sig_hex)
            elif subtype == b"AVI ":
                ext_match = self._extension_matches(ext, "avi")
                return _format_info("avi", "AVI", ext, ext_match, "high", False, sig_hex)
            else:
                ext_match = self._extension_matches(ext, "riff_unknown")
                return _format_info("riff", f"RIFF ({subtype.decode('ascii', errors='replace')})",
                                    ext, ext_match, "medium", False, sig_hex)

        return _format_info(None, None, ext, None, "low", False, sig_hex)

    def _get_extension(self):
        return self.path.suffix.lower()

    def _extension_matches(self, ext, fmt_id):
        if not ext or not fmt_id:
            return None
        expected = EXTENSION_FORMAT_MAP.get(ext)
        if expected is None:
            return None
        return expected == fmt_id

    # -- Container structure checks --

    def _check_container_structure(self, fmt):
        """Check container structure for supported formats. Returns list of issues."""
        issues = []
        if fmt == "mp4" or fmt == "m4a":
            issues.extend(self._check_mp4_structure())
        elif fmt == "mkv":
            issues.extend(self._check_mkv_structure())
        elif fmt == "ts":
            issues.extend(self._check_ts_structure())
        elif fmt == "aac":
            issues.extend(self._check_aac_structure())
        elif fmt == "mp3":
            issues.extend(self._check_mp3_structure())
        elif fmt == "flac":
            issues.extend(self._check_flac_structure())
        elif fmt == "wav":
            issues.extend(self._check_wav_structure())
        elif fmt == "ogg":
            issues.extend(self._check_ogg_structure())
        elif fmt == "amr":
            issues.extend(self._check_amr_structure())
        return issues

    def _check_mp4_structure(self):
        """Check MP4/M4A container: ftyp, moov, mdat atoms."""
        issues = []
        header = self._read_header()
        tail = self._read_tail(MOOV_SCAN_TAIL)
        fsz = self._get_file_size()

        # Scan for top-level atoms in header
        atoms = self._scan_mp4_atoms(header, min(fsz, self.max_read_size))

        # Also scan tail for moov (moov can be at end of file)
        if "moov" not in atoms:
            tail_atoms = self._scan_mp4_atoms_in_tail(tail, fsz)
            for name, info in tail_atoms.items():
                if name not in atoms:
                    atoms[name] = info

        if "ftyp" not in atoms:
            issues.append(_issue("critical", "missing_ftyp",
                                 "MP4 文件缺少 ftyp 原子，容器头无效"))
        if "moov" not in atoms:
            issues.append(_issue("critical", "missing_moov",
                                 "MP4 文件缺少 moov 原子（元数据），无法解析轨道信息"))
        if "mdat" not in atoms:
            issues.append(_issue("warning", "missing_mdat",
                                 "MP4 文件缺少 mdat 原子（媒体数据），文件可能为空容器"))

        # Check atom sizes
        for name, info in atoms.items():
            atom_end = info["offset"] + info["size"]
            if info["size"] > 0 and atom_end > fsz:
                issues.append(_issue("critical", "atom_size_overflow",
                                     f"{name} 原子声明大小 {info['size']} 超出文件范围",
                                     {"atom": name, "declared_size": info["size"],
                                      "atom_offset": info["offset"], "file_size": fsz}))

        # Check for zero-filled header
        if len(header) >= 32 and header[:32] == b"\x00" * 32:
            issues.append(_issue("critical", "zero_filled",
                                 "文件头部 32 字节全为零，文件可能被零填充"))

        return issues

    def _scan_mp4_atoms(self, data, max_offset):
        """Scan data for top-level MP4 atoms."""
        atoms = {}
        pos = 0
        limit = min(len(data), max_offset)
        while pos + 8 <= limit:
            try:
                size = struct.unpack(">I", data[pos:pos+4])[0]
            except struct.error:
                break
            name = data[pos+4:pos+8]
            try:
                name_str = name.decode("ascii")
            except (UnicodeDecodeError, ValueError):
                name_str = name.hex()

            if size == 0:
                # Atom extends to end of file
                atoms[name_str] = {"offset": pos, "size": self._get_file_size() - pos}
                break
            elif size == 1:
                # Extended size
                if pos + 16 > limit:
                    break
                size = struct.unpack(">Q", data[pos+8:pos+16])[0]

            if size < 8:
                break  # Invalid atom

            atoms[name_str] = {"offset": pos, "size": size}
            pos += size
        return atoms

    def _scan_mp4_atoms_in_tail(self, tail_data, file_size):
        """Scan tail data for MP4 atoms (backwards scan for moov)."""
        atoms = {}
        tail_len = len(tail_data)
        tail_start = file_size - tail_len
        pos = 0
        while pos + 8 <= tail_len:
            try:
                size = struct.unpack(">I", tail_data[pos:pos+4])[0]
            except struct.error:
                break
            name = tail_data[pos+4:pos+8]
            try:
                name_str = name.decode("ascii")
            except (UnicodeDecodeError, ValueError):
                name_str = name.hex()

            if size == 0:
                atoms[name_str] = {"offset": tail_start + pos, "size": file_size - (tail_start + pos)}
                break
            elif size == 1:
                if pos + 16 > tail_len:
                    break
                size = struct.unpack(">Q", tail_data[pos+8:pos+16])[0]

            if size < 8:
                pos += 1
                continue

            atoms[name_str] = {"offset": tail_start + pos, "size": size}
            pos += size
        return atoms

    def _check_mkv_structure(self):
        """Check MKV container: EBML header, Segment, Tracks."""
        issues = []
        header = self._read_header()
        fsz = self._get_file_size()

        # EBML header already verified by magic bytes
        # Look for Segment element (ID: 0x18538067)
        # Look for SegmentInfo (ID: 0x1549A966)
        # Look for Tracks (ID: 0x1654AE6B)
        segment_found = False
        try:
            # Simple scan: look for Segment element ID in first 32KB
            scan_data = header[:32768]
            segment_id = b"\x18\x53\x80\x67"
            idx = scan_data.find(segment_id)
            if idx >= 0:
                segment_found = True
        except Exception:
            pass

        if not segment_found:
            issues.append(_issue("critical", "missing_segment",
                                 "MKV 文件缺少 Segment 元素，容器结构不完整"))

        # Check for zero-filled header
        if len(header) >= 32 and header[:32] == b"\x00" * 32:
            issues.append(_issue("critical", "zero_filled",
                                 "文件头部 32 字节全为零"))

        return issues

    def _check_ts_structure(self):
        """Check MPEG-TS: sync byte at regular 188-byte intervals."""
        issues = []
        header = self._read_header()

        sync = 0x47
        packet_size = 188
        sync_count = 0
        for i in range(0, min(len(header), packet_size * 10), packet_size):
            if i < len(header) and header[i] == sync:
                sync_count += 1

        if sync_count < 5:
            issues.append(_issue("critical", "ts_sync_failure",
                                 f"TS sync byte 验证失败（仅 {sync_count}/10 个位置匹配）"))
        return issues

    def _check_aac_structure(self):
        """Check AAC ADTS: validate frame header."""
        issues = []
        header = self._read_header(64)

        if len(header) < 7:
            issues.append(_issue("critical", "header_too_short", "文件过小，无法解析 ADTS 帧"))
            return issues

        # ADTS sync word: 12 bits = 0xFFF
        sync = (header[0] << 8 | header[1]) & 0xFFF0
        if sync != 0xFFF0:
            issues.append(_issue("critical", "aac_sync_failed", "ADTS 同步字无效"))
            return issues

        # Sampling frequency index (3 bits at byte 2, bits 5-7)
        sf_index = (header[2] >> 2) & 0x07
        valid_sf = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15}
        if sf_index not in valid_sf:
            issues.append(_issue("warning", "aac_invalid_sample_rate",
                                 f"ADTS 采样率索引无效: {sf_index}"))
        return issues

    def _check_mp3_structure(self):
        """Check MP3: validate MPEG frame sync after possible ID3 tag."""
        issues = []
        header = self._read_header(4096)
        data = header

        # Skip ID3v2 tag if present
        if data[:3] == b"ID3":
            if len(data) < 10:
                issues.append(_issue("warning", "id3_truncated", "ID3 标签不完整"))
                return issues
            id3_size = ((data[6] & 0x7F) << 21) | ((data[7] & 0x7F) << 14) | \
                       ((data[8] & 0x7F) << 7) | (data[9] & 0x7F)
            data = data[id3_size + 10:]

        # Look for MPEG frame sync: 11 bits set (0xFF and upper 3 bits of next byte)
        found_sync = False
        for i in range(min(len(data) - 1, 4096)):
            if data[i] == 0xFF and (data[i+1] & 0xE0) == 0xE0:
                found_sync = True
                break

        if not found_sync:
            issues.append(_issue("critical", "mp3_sync_failed",
                                 "未找到有效的 MPEG 音频帧同步字"))
        return issues

    def _check_flac_structure(self):
        """Check FLAC: stream header + metadata block."""
        issues = []
        header = self._read_header(64)

        if len(header) < 8:
            issues.append(_issue("critical", "header_too_short", "文件过小"))
            return issues

        # fLaC magic already verified
        # First metadata block header: 4 bytes (1 bit last flag + 7 bit type + 24 bit length)
        block_type = (header[4] >> 0) & 0x7F
        # Type 0 = STREAMINFO (mandatory, must be first)
        if block_type != 0:
            issues.append(_issue("critical", "flac_missing_streaminfo",
                                 "FLAC 文件缺少 STREAMINFO 元数据块"))
        return issues

    def _check_wav_structure(self):
        """Check WAV: RIFF + WAVE + fmt + data sub-chunks."""
        issues = []
        header = self._read_header(4096)
        fsz = self._get_file_size()

        if len(header) < 44:
            issues.append(_issue("critical", "header_too_short", "WAV 文件过小"))
            return issues

        # RIFF + WAVE already verified
        riff_size = struct.unpack("<I", header[4:8])[0]

        # Search for fmt and data sub-chunks
        has_fmt = False
        has_data = False
        data_chunk_offset = None
        data_chunk_size = None
        pos = 12  # After RIFF header + WAVE
        while pos + 8 <= len(header):
            chunk_id = header[pos:pos+4]
            chunk_size = struct.unpack("<I", header[pos+4:pos+8])[0]
            if chunk_id == b"fmt ":
                has_fmt = True
            elif chunk_id == b"data":
                has_data = True
                data_chunk_offset = pos
                data_chunk_size = chunk_size
            pos += 8 + chunk_size
            if chunk_size == 0:
                break

        if not has_fmt:
            issues.append(_issue("critical", "wav_missing_fmt", "WAV 文件缺少 fmt 子块"))
        if not has_data:
            issues.append(_issue("warning", "wav_missing_data", "WAV 文件缺少 data 子块"))

        # Check for trailing non-stream data beyond data chunk
        if has_data and data_chunk_offset is not None and data_chunk_size is not None:
            data_end = data_chunk_offset + 8 + data_chunk_size
            if data_end < fsz:
                trailing = fsz - data_end
                issues.append(_issue("warning", "wav_trailing_data",
                    f"WAV 文件 data 子块后有 {trailing} 字节多余数据"
                    f"（data 块结束于 {data_end}，文件大小 {fsz}）",
                    {"data_chunk_offset": data_chunk_offset,
                     "data_chunk_size": data_chunk_size,
                     "data_chunk_end": data_end,
                     "trailing_bytes": trailing}))

        return issues

    def _check_ogg_structure(self):
        """Check OGG: page structure."""
        issues = []
        header = self._read_header(256)

        if len(header) < 27:
            issues.append(_issue("critical", "header_too_short", "OGG 文件过小"))
            return issues

        # OggS capture pattern already verified
        # Version must be 0
        version = header[4]
        if version != 0:
            issues.append(_issue("warning", "ogg_bad_version",
                                 f"OGG 页版本号异常: {version}（预期 0）"))

        # Number of page segments
        num_segments = header[26]
        if num_segments == 0:
            issues.append(_issue("warning", "ogg_empty_page", "OGG 首页无段数据"))

        return issues

    def _check_amr_structure(self):
        """Check AMR: file header."""
        issues = []
        header = self._read_header(12)

        # #!AMR already verified by magic bytes
        if len(header) >= 6 and header[:6] == b"#!AMR\x0a":
            pass  # Valid AMR-NB header
        elif len(header) >= 8 and header[:8] == b"#!AMR-WB":
            pass  # Valid AMR-WB header
        else:
            issues.append(_issue("warning", "amr_header_incomplete", "AMR 文件头不完整"))
        return issues

    # -- Truncation detection --

    def _check_truncation(self, fmt):
        """Check if file appears to be truncated. Returns _truncation_info."""
        fsz = self._get_file_size()

        if fmt in ("mp4", "m4a"):
            return self._check_truncation_mp4(fsz)
        elif fmt == "mkv":
            return self._check_truncation_mkv(fsz)
        elif fmt == "wav":
            return self._check_truncation_wav(fsz)
        else:
            return self._check_truncation_generic(fmt, fsz)

    def _check_truncation_mp4(self, fsz):
        header = self._read_header()
        tail = self._read_tail(MOOV_SCAN_TAIL)
        total_size = 0
        pos = 0
        limit = min(len(header), self.max_read_size)
        while pos + 8 <= limit:
            try:
                size = struct.unpack(">I", header[pos:pos+4])[0]
            except struct.error:
                break
            if size == 0:
                total_size = fsz
                break
            elif size == 1:
                if pos + 16 > limit:
                    break
                size = struct.unpack(">Q", header[pos+8:pos+16])[0]
            if size < 8:
                break
            total_size = pos + size
            pos += size

        # If moov not found in header, check tail
        atoms = self._scan_mp4_atoms(header, min(fsz, self.max_read_size))
        tail_atoms = self._scan_mp4_atoms_in_tail(tail, fsz)
        for name, info in tail_atoms.items():
            if name not in atoms:
                atoms[name] = info

        # Sum all found atom sizes
        computed_end = 0
        for info in atoms.values():
            end = info["offset"] + info["size"]
            if end > computed_end:
                computed_end = end

        is_truncated = computed_end > fsz if computed_end > 0 else False
        assessment = "file_truncated" if is_truncated else "file_complete"
        return _truncation_info(is_truncated, computed_end, fsz, assessment)

    def _check_truncation_mkv(self, fsz):
        header = self._read_header()
        # Look for Segment element and read its declared size
        segment_id = b"\x18\x53\x80\x67"
        idx = header.find(segment_id)
        if idx < 0:
            return _truncation_info(False, None, fsz, "segment_not_found")

        # Segment size follows element ID (variable-length EBML integer)
        pos = idx + 4
        if pos >= len(header):
            return _truncation_info(False, None, fsz, "cannot_read_size")

        first_byte = header[pos]
        vint_width = 1
        mask = 0x80
        while vint_width <= 8 and (first_byte & mask) == 0:
            mask >>= 1
            vint_width += 1

        if pos + vint_width > len(header):
            return _truncation_info(False, None, fsz, "cannot_read_size")

        segment_size = first_byte & (mask - 1)
        for i in range(1, vint_width):
            segment_size = (segment_size << 8) | header[pos + i]

        declared_total = idx + 4 + vint_width + segment_size
        is_truncated = declared_total > fsz
        assessment = "file_truncated" if is_truncated else "file_complete"
        return _truncation_info(is_truncated, declared_total, fsz, assessment)

    def _check_truncation_wav(self, fsz):
        header = self._read_header(12)
        if len(header) < 8:
            return _truncation_info(False, None, fsz, "header_too_short")
        riff_size = struct.unpack("<I", header[4:8])[0]
        declared_total = riff_size + 8
        if declared_total > fsz:
            return _truncation_info(True, declared_total, fsz, "file_truncated")
        elif declared_total < fsz:
            extra = fsz - declared_total
            return _truncation_info(False, declared_total, fsz, "file_has_extra_data",
                                    is_oversized=True, extra_bytes=extra)
        else:
            return _truncation_info(False, declared_total, fsz, "file_complete")

    def _check_truncation_generic(self, fmt, fsz):
        """Generic truncation check for formats without explicit size headers."""
        tail = self._read_tail()
        # Check if file ends cleanly (not mid-structure)
        if fsz == 0:
            return _truncation_info(True, None, 0, "empty_file")
        if tail and tail[-4:] == b"\x00" * 4 and fsz < 1024:
            # Very small file ending in zeros - suspicious
            return _truncation_info(True, None, fsz, "possibly_truncated_small_file")
        return _truncation_info(False, None, fsz, "file_complete")

    # -- Corruption detection --

    def _detect_corruption(self, fmt, format_info):
        """Detect common corruption patterns. Returns list of issues."""
        issues = []
        header = self._read_header(64)
        ext = format_info["file_extension"]

        # Zero-filled header
        if len(header) >= 32 and header == b"\x00" * min(32, len(header)):
            issues.append(_issue("critical", "zero_filled",
                                 "文件头部全为零，文件可能为零填充或损坏"))
            return issues  # No point checking further

        # Extension mismatch
        if format_info["extension_matches_format"] is False:
            issues.append(_issue("warning", "extension_mismatch",
                                 f"文件扩展名为 {ext}，但实际格式为 {format_info['display_name']}"))

        return issues

    # -- Main analysis --

    def analyze(self):
        """Run full analysis and return result dict."""
        # Check file exists and is readable
        try:
            fsz = self._get_file_size()
        except OSError as e:
            return {
                "file_path": str(self.path),
                "file_size": 0,
                "analysis_timestamp": datetime.now(timezone.utc).isoformat(),
                "format_detection": _format_info(None, None, self._get_extension(),
                                                  None, "low", False),
                "container_integrity": None,
                "truncation_check": None,
                "issues": [_issue("critical", "file_unreadable", f"无法读取文件: {e}")],
                "overall_assessment": "analysis_error",
                "error_code_correlation": {
                    "5400103": {"relevant": True, "reason": "文件无法读取"},
                    "5400106": {"relevant": True, "reason": "文件无法读取"},
                },
            }

        if fsz == 0:
            return {
                "file_path": str(self.path),
                "file_size": 0,
                "analysis_timestamp": datetime.now(timezone.utc).isoformat(),
                "format_detection": _format_info(None, None, self._get_extension(),
                                                  None, "low", False),
                "container_integrity": None,
                "truncation_check": _truncation_info(True, None, 0, "empty_file"),
                "issues": [_issue("critical", "empty_file", "文件为空（0 字节）")],
                "overall_assessment": "unknown_format",
                "error_code_correlation": {
                    "5400103": {"relevant": True, "reason": "文件为空，无法读取任何数据"},
                    "5400106": {"relevant": True, "reason": "文件为空，无法识别格式"},
                },
            }

        # Step 1: Format detection
        fmt_info = self._detect_format()
        fmt = fmt_info["detected_format"]

        # Step 2: Quick return for unsupported formats
        if fmt and fmt not in SUPPORTED_FORMATS:
            return {
                "file_path": str(self.path),
                "file_size": fsz,
                "analysis_timestamp": datetime.now(timezone.utc).isoformat(),
                "format_detection": fmt_info,
                "container_integrity": None,
                "truncation_check": None,
                "issues": [_issue("critical", "unsupported_format",
                                  f"文件格式 {fmt_info['display_name']} 不在 HarmonyOS Media Kit 支持范围内",
                                  {"supported_formats": sorted(SUPPORTED_FORMATS)})],
                "overall_assessment": "unsupported_format",
                "error_code_correlation": _error_code_correlation(fmt, [], False),
            }

        # Step 3: Unknown format
        if fmt is None:
            return {
                "file_path": str(self.path),
                "file_size": fsz,
                "analysis_timestamp": datetime.now(timezone.utc).isoformat(),
                "format_detection": fmt_info,
                "container_integrity": None,
                "truncation_check": None,
                "issues": [_issue("critical", "unknown_format",
                                  "无法识别文件格式，文件可能已严重损坏或格式不在检测范围内")],
                "overall_assessment": "unknown_format",
                "error_code_correlation": _error_code_correlation(None, [], False),
            }

        # Step 4: Deep analysis for supported formats
        container_issues = self._check_container_structure(fmt)
        truncation = self._check_truncation(fmt)
        corruption_issues = self._detect_corruption(fmt, fmt_info)

        all_issues = container_issues + corruption_issues
        if truncation["is_truncated"]:
            all_issues.append(_issue("critical", "truncated",
                                     f"文件被截断: 声明 {truncation['declared_size']} 字节，实际 {truncation['actual_size']} 字节",
                                     {"declared": truncation["declared_size"],
                                      "actual": truncation["actual_size"],
                                      "diff": truncation["size_diff"]}))

        # Check for oversized file (trailing data beyond container declaration)
        if truncation.get("is_oversized") and not any(
                i["category"] == "wav_trailing_data" for i in all_issues):
            all_issues.append(_issue("warning", "wav_trailing_data",
                f"WAV 文件包含尾部多余数据: RIFF 声明 {truncation['declared_size']} 字节，"
                f"实际文件 {truncation['actual_size']} 字节，多余 {truncation['extra_bytes']} 字节"))

        # Determine overall assessment
        critical_count = sum(1 for i in all_issues if i["severity"] == "critical")
        warning_count = sum(1 for i in all_issues if i["severity"] == "warning")

        if critical_count > 0:
            assessment = "likely_corrupt"
        elif warning_count > 0:
            assessment = "possibly_corrupt"
        else:
            assessment = "healthy"

        return {
            "file_path": str(self.path),
            "file_size": fsz,
            "analysis_timestamp": datetime.now(timezone.utc).isoformat(),
            "format_detection": fmt_info,
            "container_integrity": {
                "issues_found": len(container_issues),
                "details": container_issues,
            },
            "truncation_check": truncation,
            "issues": all_issues,
            "overall_assessment": assessment,
            "error_code_correlation": _error_code_correlation(fmt, all_issues, truncation["is_truncated"]),
        }

# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Media File Format Analyzer for HarmonyOS Media Kit")
    parser.add_argument("--file", required=True, help="Path to the media file")
    parser.add_argument("--json", action="store_true", help="Output as JSON")
    parser.add_argument("--max-read-size", type=int, default=None,
                        help="Maximum bytes to read from file header (default: 65536)")
    args = parser.parse_args()

    try:
        analyzer = MediaFileAnalyzer(args.file, args.max_read_size)
        result = analyzer.analyze()
    except Exception as e:
        result = {
            "file_path": args.file,
            "file_size": 0,
            "analysis_timestamp": datetime.now(timezone.utc).isoformat(),
            "format_detection": _format_info(None, None, Path(args.file).suffix.lower(), None, "low", False),
            "container_integrity": None,
            "truncation_check": None,
            "issues": [_issue("critical", "analysis_error", f"分析过程出错: {e}")],
            "overall_assessment": "analysis_error",
            "error_code_correlation": {
                "5400103": {"relevant": True, "reason": "分析过程出错"},
                "5400106": {"relevant": True, "reason": "分析过程出错"},
            },
        }

    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
