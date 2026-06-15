# multimedia_av_codec 模块概览

## 模块职责

multimedia_av_codec 是 OpenHarmony 多媒体子系统的音视频编解码模块，提供统一的音视频编解码（Codec）、封装（Muxer）、解封装（Demuxer）能力。该模块通过 CAPI（C API）对外暴露接口，JS 层通过 @ohos.multimedia.media 命名空间访问相关能力。支持音频编解码（AAC/FLAC/OPUS/AMR/Vorbis/Audio Vivid 等）、视频编解码（H.264/H.265/H.266/AV1/VP9/MPEG2/MPEG4 等）、媒体封装格式（MP4/M4A/AMR/MP3/WAV/AAC/FLAC/OGG）、解封装以及编解码能力查询等核心功能。

## 目录结构（简化）

```
multimedia_av_codec/
├── interfaces/
│   ├── kits/c/                          # CAPI 公开头文件（对应用层暴露）
│   │   ├── native_avcodec_base.h        # 基础定义：回调、MIME类型、枚举、媒体键
│   │   ├── native_avcodec_audiodecoder.h # 音频解码器 CAPI
│   │   ├── native_avcodec_audioencoder.h # 音频编码器 CAPI
│   │   ├── native_avcodec_audiocodec.h  # 统一音频编解码器 CAPI (API 12+)
│   │   ├── native_avcodec_videodecoder.h # 视频解码器 CAPI
│   │   ├── native_avcodec_videoencoder.h # 视频编码器 CAPI
│   │   ├── native_avcapability.h        # 编解码能力查询 CAPI
│   │   ├── native_avsource.h            # 媒体源 CAPI
│   │   ├── native_avdemuxer.h           # 解封装器 CAPI
│   │   ├── native_avmuxer.h             # 封装器 CAPI
│   │   └── native_cencinfo.h            # DRM CENC 信息 CAPI
│   └── inner_api/native/                # 内部 API 头文件（子系统内使用）
│       ├── avcodec_errors.h             # 内部错误码定义
│       ├── avcodec_audio_decoder.h      # 音频解码器内部接口
│       ├── avcodec_audio_encoder.h      # 音频编码器内部接口
│       ├── avcodec_video_decoder.h      # 视频解码器内部接口
│       ├── avcodec_video_encoder.h      # 视频编码器内部接口
│       ├── avcodec_audio_codec.h        # 统一音频编解码内部接口
│       ├── avcodec_list.h               # 编解码能力列表内部接口
│       ├── avdemuxer.h                  # 解封装器内部接口
│       ├── avmuxer.h                    # 封装器内部接口
│       └── avsource.h                   # 媒体源内部接口
├── frameworks/
│   └── native/
│       ├── capi/                        # CAPI 实现层（桥接 C API -> 内部实现）
│       │   ├── avcodec/                 # 编解码 CAPI 实现
│       │   ├── avsource/                # AVSource CAPI 实现
│       │   ├── avdemuxer/               # Demuxer CAPI 实现
│       │   ├── avmuxer/                 # Muxer CAPI 实现
│       │   ├── avcencinfo/              # CENC Info CAPI 实现
│       │   └── common/                  # 公共实现（含 native_avcapability.cpp）
│       ├── avcodec/                     # 编解码框架层实现
│       ├── avsource/                    # AVSource 框架实现
│       ├── avdemuxer/                   # Demuxer 框架实现
│       ├── avmuxer/                     # Muxer 框架实现
│       ├── avcodeclist/                 # Codec 能力列表实现
│       └── common/                      # 公共工具
├── services/
│   ├── engine/                          # 编解码引擎（音频/视频/能力列表）
│   ├── services/                        # IPC 服务层（client/server）
│   ├── media_engine/                    # 媒体引擎（插件/滤镜/FFmpeg适配）
│   ├── dfx/                             # DFX 诊断
│   ├── drm_decryptor/                   # DRM 解密
│   └── utils/                           # 工具类
└── test/                                # 测试代码
```

## 核心文件列表

### CAPI 公开头文件（interfaces/kits/c/）

| 文件 | 用途 |
|------|------|
| `native_avcodec_base.h` | 基础类型定义：回调函数指针、OH_AVCodec 结构体声明、MIME 类型常量、Profile/Level 枚举、媒体键常量 |
| `native_avcodec_audiodecoder.h` | 音频解码器 API：创建/销毁/配置/启动/停止/Flush/Reset/PushInputData/FreeOutputData |
| `native_avcodec_audioencoder.h` | 音频编码器 API：创建/销毁/配置/启动/停止/Flush/Reset/PushInputData/FreeOutputData |
| `native_avcodec_audiocodec.h` | 统一音频编解码器 API (API 12+)：替代 audiodecoder/audioencoder 的统一接口 |
| `native_avcodec_videodecoder.h` | 视频解码器 API：创建/销毁/配置/SetSurface/启动/停止/Flush/Reset/RenderOutputBuffer |
| `native_avcodec_videoencoder.h` | 视频编码器 API：创建/销毁/配置/GetInputSurface/启动/停止/Flush/Reset/NotifyEndOfStream |
| `native_avcapability.h` | 编解码能力查询 API：获取能力实例、查询支持的分辨率/帧率/Profile/像素格式等 |
| `native_avsource.h` | 媒体源 API：从文件描述符/URI/数据源创建 AVSource |
| `native_avdemuxer.h` | 解封装器 API：创建 Demuxer、读取轨道信息、ReadSample/SeekTo/UnselectTrack |
| `native_avmuxer.h` | 封装器 API：创建 Muxer、添加轨道、写入采样数据、设置元数据 |
| `native_cencinfo.h` | DRM CENC 信息 API：创建/设置加密算法/密钥ID/IV/子采样信息 |

### CAPI 实现文件（frameworks/native/capi/）

| 文件 | 对应 CAPI 头文件 | 内部实现类 |
|------|------------------|-----------|
| `avcodec/native_audio_decoder.cpp` | native_avcodec_audiodecoder.h | AVCodecAudioDecoder (via AudioDecoderFactory) |
| `avcodec/native_audio_encoder.cpp` | native_avcodec_audioencoder.h | AVCodecAudioEncoder (via AudioEncoderFactory) |
| `avcodec/native_video_decoder.cpp` | native_avcodec_videodecoder.h | AVCodecVideoDecoder (via VideoDecoderFactory) |
| `avcodec/native_video_encoder.cpp` | native_avcodec_videoencoder.h | AVCodecVideoEncoder (via VideoEncoderFactory) |
| `avcodec/native_audio_codec.cpp` | native_avcodec_audiocodec.h | AVCodecAudioCodecImpl |
| `avsource/native_avsource.cpp` | native_avsource.h | AVSource (via AVSourceFactory) |
| `avdemuxer/native_avdemuxer.cpp` | native_avdemuxer.h | AVDemuxer (via DemuxerFactory) |
| `avmuxer/native_avmuxer.cpp` | native_avmuxer.h | AVMuxer (via AVMuxerFactory) |
| `avcencinfo/native_cencinfo.cpp` | native_cencinfo.h | MetaDrmCencInfo |
| `common/native_avcapability.cpp` | native_avcapability.h | AVCodecList (via AVCodecListFactory) |

### 错误码文件

| 文件 | 用途 |
|------|------|
| `interfaces/inner_api/native/avcodec_errors.h` | 内部错误码 AVCodecServiceErrCode 枚举（约 60 个） |
| `native_averrors.h`（SDK 路径） | 公开错误码 OH_AVErrCode 枚举（约 30 个） |

### JS API 声明文件

| 文件 | 用途 |
|------|------|
| `@ohos.multimedia.media.d.ts`（SDK 路径） | JS API 声明，包含编解码、播放、录制相关接口 |

## 架构说明

此模块使用 **CAPI** 模式而非 NAPI 桥接层。调用链路为：

```
JS 应用 -> @ohos.multimedia.media (JS API)
     或
C/C++ 应用 -> OH_AudioDecoder_* / OH_VideoDecoder_* 等 (CAPI)
     |
     v
CAPI 实现层 (frameworks/native/capi/) -> 参数校验 + 错误码转换
     |
     v
框架层 (frameworks/native/avcodec/ 等) -> 业务逻辑
     |
     v
引擎层 (services/engine/) -> 具体编解码实现
     |
     v
IPC 服务层 (services/services/) -> 跨进程通信
     |
     v
插件层 (services/media_engine/plugins/) -> FFmpeg 等第三方适配
```

**错误码转换**：内部使用 `AVCodecServiceErrCode`，通过 `AVCSErrorToOHAVErrCode()` 转换为公开的 `OH_AVErrCode` 返回给用户。

**回调机制**：CAPI 使用 `OH_AVCodecAsyncCallback`（已废弃）或 `OH_AVCodecCallback`（推荐）注册回调，内部通过继承 `AVCodecCallback` 或 `MediaCodecCallback` 适配。

**关键约束**：
- SysCap: `SystemCapability.Multimedia.Media.CodecBase`
- Kit: `AVCodecKit`
- 动态库: `libnative_media_codecbase.so`
- 编解码器实例数受硬件限制，建议同时创建不超过 16 个
