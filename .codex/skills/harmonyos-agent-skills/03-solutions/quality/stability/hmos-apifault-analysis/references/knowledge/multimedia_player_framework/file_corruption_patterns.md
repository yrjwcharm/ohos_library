# 媒体文件损坏模式与错误码关联

本文档描述媒体文件损坏的常见模式、与错误码的对应关系，以及 hilog 日志特征。
用于配合 `scripts/media_file_analyzer.py` 脚本进行文件级别的诊断。

## 1. Media Kit 支持的格式清单

### 视频容器（3 种）

| 格式 | 扩展名 | Magic Bytes (hex) | 编解码器 |
|------|--------|-------------------|---------|
| MPEG-4 | .mp4 | `00 00 00 XX 66 74 79 70` (offset 4: `ftyp`) | H.265, H.264 + AAC, MP3 |
| Matroska | .mkv | `1A 45 DF A3` (offset 0) | H.265, H.264 + AAC, MP3 |
| MPEG-TS | .ts | `47` (sync byte, 每 188 字节重复) | H.265, H.264 + AAC |

### 音频容器（7 种）

| 格式 | 扩展名 | Magic Bytes (hex) | 编解码器 |
|------|--------|-------------------|---------|
| M4A | .m4a | `00 00 00 XX 66 74 79 70 4D 34 41` (ftyp + brand M4A) | AAC |
| AAC | .aac | `FF F1` / `FF F9` (ADTS) | AAC LC/HE-AAC |
| MP3 | .mp3 | `FF FB` / `FF F3` (帧同步) 或 `49 44 33` (ID3) | MPEG-1/2 Audio Layer 3 |
| FLAC | .flac | `66 4C 61 43` ("fLaC") | FLAC |
| WAV | .wav | `52 49 46 46 XX XX XX XX 57 41 56 45` | PCM |
| OGG | .ogg | `4F 67 67 53` ("OggS") | Vorbis |
| AMR | .amr | `23 21 41 4D 52` ("#!AMR") | AMR-NB/WB |

### 视频编解码器

| 编解码器 | 必选/可选 | 说明 |
|---------|----------|------|
| H.265/HEVC | 必选 | API 10+ 全部设备必须支持 |
| H.264/AVC | 必选 | 所有设备必须支持 |

### 音频编解码器

| 编解码器 | 容器 | 说明 |
|---------|------|------|
| AAC LC/HE-AAC v1/v2 | MP4, M4A, AAC, MKV, TS | 主流音频格式 |
| MP3 | MP3, MKV | 广泛支持 |
| Vorbis | OGG | OGG 容器专用 |
| FLAC | FLAC | 无损音频 |
| PCM | WAV | 无压缩音频 |
| AMR | AMR | 语音编码 |

### 网络协议

- HTTP/HTTPS（渐进式流）
- HLS (HTTP Live Streaming)
- DASH (Dynamic Adaptive Streaming over HTTP)
- HTTP-FLV（直播流）

## 2. 不支持的格式列表

以下格式不在 Media Kit 支持范围内，脚本检测到时直接返回 `unsupported_format` 结论：

| 格式 | 扩展名 | Magic Bytes (hex) |
|------|--------|-------------------|
| AVI | .avi | `52 49 46 46 XX XX XX XX 41 56 49 20` |
| WMV/ASF | .wmv/.asf | `30 26 B2 75 8E 66 CF 11 A6 D9 00 00 00 62 CE 6C` |
| Flash Video | .flv | `46 4C 56 01` |
| WebM | .webm | `1A 45 DF A3`（与 MKV 相同 EBML 头，但编解码器不同） |
| APE | .ape | 无固定签名 |

> **注意：** WebM 与 MKV 共享 EBML 容器头，但 Media Kit 仅支持 MKV 容器中的 H.264/H.265 编解码器，不支持 WebM 的 VP8/VP9/Opus 编解码器。

## 3. 损坏模式与 hilog 日志对应关系速查表

以下速查表基于 `scenario_logs.json` 中验证通过的故障场景（status=PASS），以及 `common_issues.md` 中的问题模式归纳。

**速查表使用方式：** Agent 在阶段 1 提取到 hilog 日志后，用日志中的关键字匹配下表「典型 hilog 关键字」列，确定属于哪种损坏模式，再结合脚本分析结论交叉验证。

### 速查表

| 损坏模式 | 触发错误码 | 典型 hilog 关键字（按出现顺序） | 验证场景来源 | 脚本应执行的检查 |
|---------|-----------|-------------------------------|-------------|----------------|
| **文件头损坏/空文件** | 5400106 | ① `mediaDataSize_: 0, seekable_: -1` (BaseStreamDemuxer) <br>② `GetPeekRange interrupt 0 0` (StreamDemuxer) <br>③ `PeekRange failed, ret: -5` (TypeFinder) <br>④ `Not data for sniff 0` (TypeFinder) <br>⑤ `SnifferMediaType is failed` (DemuxerPluginManager) <br>⑥ `Parse meta failed, ret: -7` (MediaDemuxer) <br>⑦ `Demuxer plugin is nullptr` (MediaDemuxer) <br>⑧ `CONTAINER_ERR-null-unsupport interface, unsupport container format type` (PlayerListenerProxy) | RC-02-6（不支持的媒体格式） | 格式检测 + 文件头完整性 |
| **容器格式不支持** | 5400106 | ① `mediaDataSize_: {小值}, seekable_: 1` (BaseStreamDemuxer，数据量极小) <br>② `Sniff data [{实际}/{需要}]` (FfmpegDemuxerPlugin，如 528/16384) <br>③ `eos&data return data` (StreamDemuxer，提前遇到 EOS) <br>④ `SnifferMediaType is failed` (DemuxerPluginManager) <br>⑤ `LoadDemuxerPlugin video plugin failed` (DemuxerPluginManager) <br>⑥ `Parse meta failed, ret: -7` (MediaDemuxer) <br>⑦ `DoSetSource error` (HiPlayer) <br>⑧ `CONTAINER_ERR-null-unsupport interface, unsupport container format type` (PlayerListenerProxy) | RC-02-6（不支持的媒体格式） | 格式检测 + 扩展名匹配 + 容器结构 |
| **Demuxer 解析失败**（文件结构损坏或编码不支持） | 5400106 | ① `SetSource in. <private>` (FileFdSourcePlugin) <br>② `SetSource ioctl loc, ret -1, loc 0, errno13` (FileFdSourcePlugin) <br>③ `ioctl failed to get file type` (FileFdSourcePlugin) <br>④ `mediaDataSize_: {值}, seekable_: 1` (BaseStreamDemuxer) <br>⑤ `Sniff data [{值}/16384]` (FfmpegDemuxerPlugin) <br>⑥ `SnifferMediaType is failed` (DemuxerPluginManager) <br>⑦ `LoadDemuxerPlugin video plugin failed` (DemuxerPluginManager) <br>⑧ `Parse meta failed, ret: -7` (MediaDemuxer) <br>⑨ `DoSetSource error` (HiPlayer) <br>⑩ `CONTAINER_ERR-null-unsupport interface, unsupport container format type` (PlayerListenerProxy) | RC-03-2（Demuxer解析失败） | 格式检测 + 容器结构 + 截断检测 |
| **文件截断** | 5400103, 5400106 | ① `mediaDataSize_: {值}, seekable_: 1` (数据量正常但 EOS 提前) <br>② `eos&data return data` (StreamDemuxer，反复出现) <br>③ `Parse meta failed, ret: -7` (MediaDemuxer) <br>④ 若 moov 不完整 → 5400106 <br>⑤ 若读取超范围 → 5400103 (MSERR_DATA_SOURCE_IO_ERROR) | 推断（无直接 scenario） | 截断检测（原子大小 vs 实际文件大小） |
| **尾部多余数据** | 5400103 | ① `mediaDataSize_: {值}, seekable_: 1`（数据量正常） <br>② `eos&data return data`（StreamDemuxer，在声明的 RIFF/data chunk 结束后仍有数据） <br>③ 播放器读取到 EOF 而非容器边界 → 5400103 (MSERR_DATA_SOURCE_IO_ERROR) | 推断（WAV 实际案例） | RIFF 声明大小 vs 实际文件大小 + data 子块边界检查 |
| **扩展名与实际格式不匹配** | 5400106 | 与「容器格式不支持」模式相同，但 hilog 中 `Sniff data` 可能显示实际格式被尝试解析。Agent 需结合脚本检测结果（`extension_matches_format: false`）判断 | 推断（RC-02-6 变体） | 格式检测 + 扩展名匹配 |

### hilog 关键路径（Demuxer 处理链路）

文件播放时的 Demuxer 处理链路如下，日志按此顺序出现：

```
FileFdSourcePlugin::SetSource → BaseStreamDemuxer::SetSource
  → FfmpegDemuxerPlugin::SniffWithSize
    → DemuxerPluginManager::LoadDemuxerPlugin
      → MediaDemuxer::InnerPrepare
        → HiPlayer::CollectionErrorInfo ("DoSetSource error")
          → PlayerListenerProxy::onError (内部错误码 + errorMsg)
            → AVPlayerCallback::OnErrorCb (API9 错误码 5400106)
```

各组件对应的 hilog tag：
| 组件 | hilog Tag | 说明 |
|------|-----------|------|
| FileFdSourcePlugin | `C02b22/FileFdSourcePlugin` | 文件数据源，读取 fd |
| BaseStreamDemuxer | `C02b22/BaseStreamDemuxer` | 流解封装器基础层 |
| StreamDemuxer | `C02b22/StreamDemuxer` | 流解封装器，处理数据拉取 |
| FfmpegDemuxerPlugin | `C02b3a/FfmpegDemuxerPlugin` | FFmpeg 解封装插件，格式探测 |
| DemuxerPluginManager | `C02b22/DemuxerPluginManager` | 解封装插件管理器 |
| MediaDemuxer | `C02b3a/MediaDemuxer` | 媒体解封装器 |
| TypeFinder | `C02b3a/TypeFinder` | 类型探测器 |
| HiPlayer | `C02b22/HiPlayer` | 播放器引擎 |
| PlayerListenerProxy | `C02b2b/PlayerListenerProxy` | 播放器回调代理 |
| AVPlayerCallback | `C02b2b/AVPlayerCallback` | JS 层播放器回调 |

### 关键判别逻辑

根据 hilog 中的关键信息快速定位损坏模式：

| hilog 特征 | 含义 | 对应损坏模式 |
|-----------|------|-------------|
| `mediaDataSize_: 0` | 文件为空或路径无效 | 空文件/零填充 |
| `mediaDataSize_: {极小值}` + `Sniff data [小/大]` | 文件过小无法识别（如 528/16384） | 文件截断或零填充 |
| `Sniff data [{正常值}/16384]` + `SnifferMediaType is failed` | 文件头可读但格式不匹配 | 不支持格式或损坏 |
| `ioctl failed to get file type` + `errno13` | 文件权限问题或 fd 无效 | IO 层面问题 |
| `eos&data return data` 反复出现 | 数据提前结束 | 截断的典型特征 |
| `CONTAINER_ERR-null-unsupport interface, unsupport container format type` | 容器格式不被识别 | 格式不支持/损坏 |
| `DoSetSource error` | 数据源设置阶段失败 | 上层汇总错误 |

## 4. 错误码与文件分析关联矩阵

| 错误码 | 文件分析关注点 | 脚本应执行的检查 | 日志辅助判断 |
|--------|--------------|-----------------|-------------|
| **5400103** (IO Error) | 文件是否可读、完整、无多余尾部数据 | 格式检测 + 截断检测 + 尾部数据检测 + IO 可达性 | `ioctl failed` → 权限/路径问题；`eos&data` 反复出现 → 截断；文件大小 > RIFF 声明大小 → 尾部多余数据 |
| **5400106** (Unsupported Format) | 格式是否支持、容器结构是否有效 | 格式检测 + 扩展名匹配 + 容器结构 | `SnifferMediaType is failed` → 格式识别失败；`CONTAINER_ERR` → 容器层面问题 |
| **5400102** (Invalid Parameter) | 文件路径/URI 是否有效 | 格式检测（判断文件是否为有效媒体文件） | `fdSrc` 参数相关日志 → 参数校验问题 |

## 5. 脚本输出与诊断结论映射

`scripts/media_file_analyzer.py` 的 `overall_assessment` 字段与诊断结论的对应关系：

| overall_assessment | 含义 | 根因优先级 | 错误码关联 |
|-------------------|------|-----------|-----------|
| `healthy` | 文件格式正常，无损坏迹象 | 非文件问题，需排查其它原因 | 5400103/5400106 非文件层面 |
| `likely_corrupt` | 发现关键问题（缺少关键结构、截断等） | rank 1 根因：文件损坏 | 5400103/5400106 相关 |
| `possibly_corrupt` | 发现次要问题（扩展名不匹配等） | rank 1 或 rank 2 根因 | 5400106 相关 |
| `unsupported_format` | 文件格式不在 Media Kit 支持范围 | rank 1 根因：格式不支持 | 5400106 直接相关 |
| `unknown_format` | 无法识别文件格式（可能严重损坏） | rank 1 根因：文件损坏 | 5400103/5400106 相关 |
| `analysis_error` | 脚本无法读取文件 | rank 1 根因：文件不可达 | 5400103 直接相关 |
