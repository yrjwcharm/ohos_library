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
Hilog Log Collector for HarmonyOS

Pulls hilog files from a connected device via hdc, parses binary logs using
hilogtool (or falls back to gzip decompression), and outputs a list of
readable text files for downstream analysis.

Usage:
    python hilog_collector.py --output-dir diagnosis --hilogtool "C:/path/to/hilogtool.exe" --time-window 30

Output (stdout): JSON with status, parsed_files list, and metadata.
"""

import argparse
import gzip
import json
import os
import re
import shutil
import subprocess
import sys
from datetime import datetime, timedelta
from pathlib import Path

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

HDC_CMD_TIMEOUT = 30          # seconds per hdc command
HILOGTOOL_CMD_TIMEOUT = 60    # seconds for hilogtool parse
DEVICE_HILOG_DIR = "/data/log/hilog/"
TIMESTAMP_PATTERN = re.compile(r"(\d{8}-\d{6})")

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def run_cmd(cmd: list, timeout: int = HDC_CMD_TIMEOUT) -> tuple[int, str]:
    """Run a command and return (returncode, stdout+stderr)."""
    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=timeout,
            encoding="utf-8",
            errors="replace",
        )
        output = result.stdout + result.stderr
        return result.returncode, output.strip()
    except subprocess.TimeoutExpired:
        return -1, f"Command timed out after {timeout}s: {' '.join(cmd)}"
    except FileNotFoundError:
        return -2, f"Command not found: {cmd[0]}"


def parse_filename_timestamp(filename: str) -> datetime | None:
    """Extract timestamp from hilog filename like hilog.305.20260524-152948.gz."""
    m = TIMESTAMP_PATTERN.search(filename)
    if not m:
        return None
    try:
        return datetime.strptime(m.group(1), "%Y%m%d-%H%M%S")
    except ValueError:
        return None


def output_json(data: dict) -> None:
    """Write JSON to stdout."""
    print(json.dumps(data, ensure_ascii=False, indent=2))


def safe_read_text(path: Path, max_bytes: int = 128) -> bool:
    """Check if a file looks like readable text by reading first chunk."""
    try:
        with open(path, "rb") as f:
            chunk = f.read(max_bytes)
        # If most bytes are valid UTF-8 printable chars, treat as text
        try:
            chunk.decode("utf-8")
            return True
        except UnicodeDecodeError:
            return False
    except OSError:
        return False


# ---------------------------------------------------------------------------
# Core logic
# ---------------------------------------------------------------------------

def check_device() -> tuple[bool, str]:
    """Check if a device is connected via hdc. Returns (connected, output)."""
    rc, out = run_cmd(["hdc", "shell", "echo", "ok"])
    if rc == -2:
        return False, "hdc command not found"
    if rc != 0:
        return False, out or "hdc failed to connect to device"
    return True, out


def list_device_files() -> tuple[bool, list[str]]:
    """List files in device hilog directory. Returns (success, file_list)."""
    rc, out = run_cmd(["hdc", "shell", "ls", "-t", DEVICE_HILOG_DIR])
    if rc != 0:
        return False, []
    files = [f.strip() for f in out.splitlines() if f.strip()]
    return True, files


def pull_file(remote_path: str, local_path: Path) -> tuple[bool, str]:
    """Pull a single file from device. Returns (success, message)."""
    rc, out = run_cmd(["hdc", "file", "recv", remote_path, str(local_path)])
    if rc != 0:
        return False, out or f"Failed to pull {remote_path}"
    return True, out


def find_dict_files(device_files: list[str]) -> list[str]:
    """Identify dictionary files (hilog_dict*) from device file list."""
    return [f for f in device_files if f.startswith("hilog_dict")]


def filter_gz_files(device_files: list[str], time_window: int) -> list[tuple[str, datetime]]:
    """Filter .gz log files within time_window minutes. Returns [(filename, timestamp)] sorted newest first."""
    cutoff = datetime.now() - timedelta(minutes=time_window)
    results = []
    for f in device_files:
        if not f.endswith(".gz"):
            continue
        ts = parse_filename_timestamp(f)
        if ts and ts >= cutoff:
            results.append((f, ts))
        elif not ts:
            # Files without timestamp — include anyway (can't filter by time)
            results.append((f, datetime.min))
    # Sort newest first
    results.sort(key=lambda x: x[1], reverse=True)
    return results


def parse_with_hilogtool(hilogtool_path: str, raw_dir: Path, parsed_dir: Path) -> tuple[bool, str]:
    """Parse binary hilog files using hilogtool. Returns (success, dict_file_used)."""
    # Find dictionary file
    dict_files = sorted(raw_dir.glob("hilog_dict*"))
    if not dict_files:
        return False, "no dictionary file found"

    dict_file = dict_files[-1]  # Use latest dictionary file

    # Snapshot files before parse
    files_before = set(raw_dir.iterdir())

    # Run hilogtool parse
    rc, out = run_cmd(
        [hilogtool_path, "parse", "-i", str(raw_dir), "-d", str(dict_file)],
        timeout=HILOGTOOL_CMD_TIMEOUT,
    )
    if rc != 0:
        return False, f"hilogtool failed: {out}"

    # Identify new files (parsed output)
    files_after = set(raw_dir.iterdir())
    new_files = files_after - files_before

    # Move parsed text files to parsed_dir
    for f in new_files:
        if f.is_file() and safe_read_text(f):
            shutil.move(str(f), str(parsed_dir / f.name))

    return True, str(dict_file.name)


def parse_with_gzip(raw_dir: Path, parsed_dir: Path) -> None:
    """Fallback: decompress .gz files and copy others."""
    for f in raw_dir.iterdir():
        if not f.is_file():
            continue
        if f.name.endswith(".gz"):
            out_name = f.stem + ".log"
            try:
                with gzip.open(f, "rb") as gz_in:
                    content = gz_in.read()
                with open(parsed_dir / out_name, "wb") as out_f:
                    out_f.write(content)
            except Exception:
                # If gzip fails, copy raw
                shutil.copy2(str(f), str(parsed_dir / f.name))
        elif f.name.startswith("hilog_dict"):
            # Skip dictionary files
            continue
        else:
            shutil.copy2(str(f), str(parsed_dir / f.name))


def collect_parsed_files(parsed_dir: Path) -> list[str]:
    """List parsed files sorted by timestamp (oldest first)."""
    files = []
    for f in parsed_dir.iterdir():
        if f.is_file():
            ts = parse_filename_timestamp(f.name)
            files.append((f, ts or datetime.min))
    # Sort oldest first; files without timestamp go first
    files.sort(key=lambda x: x[1])
    return [str(f[0]) for f in files]


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Hilog log collector for HarmonyOS")
    parser.add_argument("--output-dir", default="diagnosis", help="Output base directory (default: diagnosis)")
    parser.add_argument("--hilogtool", default=None, help="Path to hilogtool.exe")
    parser.add_argument("--time-window", type=int, default=10, help="Pull files created within N minutes (default: 10)")
    args = parser.parse_args()

    base_dir = Path(args.output_dir)
    raw_dir = base_dir / "hilog_raw"
    parsed_dir = base_dir / "hilog_parsed"

    # 1. Init: create and clean directories
    raw_dir.mkdir(parents=True, exist_ok=True)
    parsed_dir.mkdir(parents=True, exist_ok=True)
    for f in parsed_dir.iterdir():
        if f.is_file():
            f.unlink()
    for f in raw_dir.iterdir():
        if f.is_file():
            f.unlink()

    # 2. Check device
    connected, msg = check_device()
    if not connected:
        output_json({
            "status": "no_device",
            "output_dir": str(parsed_dir),
            "parsed_files": [],
            "files_pulled": 0,
            "hilogtool_used": False,
            "message": f"Device not available: {msg}",
        })
        return

    # 3. List device files
    success, device_files = list_device_files()
    if not success or not device_files:
        output_json({
            "status": "no_logs",
            "output_dir": str(parsed_dir),
            "parsed_files": [],
            "files_pulled": 0,
            "hilogtool_used": False,
            "message": "No files found in " + DEVICE_HILOG_DIR,
        })
        return

    # Filter out metadata files
    device_files = [f for f in device_files if not f.startswith(".persisterInfo") or f == ".persisterInfo_1"]

    files_pulled = 0

    # 4. Pull dictionary files
    dict_names = find_dict_files(device_files)
    for dn in dict_names:
        ok, _ = pull_file(DEVICE_HILOG_DIR + dn, raw_dir / dn)
        if ok:
            files_pulled += 1

    # 5. Pull active buffer (.persisterInfo_1)
    if ".persisterInfo_1" in device_files:
        ok, _ = pull_file(DEVICE_HILOG_DIR + ".persisterInfo_1", raw_dir / ".persisterInfo_1")
        if ok:
            files_pulled += 1

    # 6. Pull all .gz files
    gz_files = filter_gz_files(device_files, args.time_window)
    for fname, _ in gz_files:
        ok, _ = pull_file(DEVICE_HILOG_DIR + fname, raw_dir / fname)
        if ok:
            files_pulled += 1

    if files_pulled == 0:
        output_json({
            "status": "no_logs",
            "output_dir": str(parsed_dir),
            "parsed_files": [],
            "files_pulled": 0,
            "hilogtool_used": False,
            "message": "No log files could be pulled",
        })
        return

    # 7. Parse
    hilogtool_used = False
    if args.hilogtool and Path(args.hilogtool).exists():
        ok, msg = parse_with_hilogtool(args.hilogtool, raw_dir, parsed_dir)
        if ok:
            hilogtool_used = True
        # If hilogtool failed, fall through to gzip

    if not hilogtool_used:
        parse_with_gzip(raw_dir, parsed_dir)

    # 8. Collect parsed files
    parsed_files = collect_parsed_files(parsed_dir)

    output_json({
        "status": "success",
        "output_dir": str(parsed_dir),
        "parsed_files": parsed_files,
        "files_pulled": files_pulled,
        "hilogtool_used": hilogtool_used,
        "message": "",
    })


if __name__ == "__main__":
    main()
