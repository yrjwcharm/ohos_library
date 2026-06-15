# multimedia_player_framework

## 模块职责

multimedia_player_framework 是媒体播放框架模块，属于 multimedia 子系统。该模块提供完整的音视频播放、录制、屏幕录制、音效池、元数据提取、转码、低功耗音视频流等媒体能力。模块采用分层架构：上层通过 JS NAPI 和 C API 对外暴露接口，中层通过服务层（IPC Client/Server）进行进程间通信和业务编排，底层通过 HiStreamer 引擎（Pipeline 架构）实现实际的解码、解封装、渲染等媒体处理。错误码系统分为内部层（MediaServiceErrCode，60+个）、扩展层（MediaServiceExtErrCode，10个）和 API9 层（JS 应用可见的 5400101~5411011 系列），逐层映射并最终以数字码形式抛给应用层。

## 目录结构

```
multimedia_player_framework/
├── interfaces/
│   ├── inner_api/native/          # C++ 内部 API（player.h, media_errors.h 等）
│   ├── kits/js/                   # JS NAPI 头文件
│   └── kits/c/                    # C API 头文件（avplayer.h, avrecorder.h 等）
├── frameworks/
│   ├── js/
│   │   ├── media/                 # NAPI 模块注册（native_module_ohos_media.cpp）
│   │   ├── avplayer/              # AVPlayer NAPI 实现
│   │   ├── avrecorder/            # AVRecorder NAPI 实现
│   │   ├── player/                # 旧版 Player NAPI
│   │   ├── recorder/              # 旧版 Recorder NAPI
│   │   ├── avscreen_capture/      # 屏幕录制 NAPI
│   │   ├── avtranscoder/          # 转码 NAPI
│   │   ├── soundpool/             # 音效池 NAPI
│   │   ├── metadatahelper/        # 元数据提取 NAPI
│   │   ├── mediasource/           # 媒体源 NAPI
│   │   ├── system_sound_manager/  # 系统音效管理 NAPI
│   │   ├── audio_haptic/          # 触觉音频 NAPI
│   │   ├── screencapturemonitor/  # 录屏监控 NAPI
│   │   └── common/                # 公共 NAPI 工具
│   ├── native/
│   │   ├── player/                # Native 播放器实现
│   │   ├── capi/                  # C API 实现（native_avplayer.cpp 等）
│   │   ├── common/                # 公共工具（media_errors.cpp 含错误码映射）
│   │   ├── recorder/              # Native 录制器
│   │   ├── avmetadatahelper/      # Native 元数据
│   │   ├── soundpool/             # Native 音效池
│   │   ├── screen_capture/        # Native 屏幕录制
│   │   ├── transcoder/            # Native 转码
│   │   ├── audio_haptic/          # Native 触觉音频
│   │   ├── lpp_audio_streamer/    # 低功耗音频流
│   │   └── lpp_video_streamer/    # 低功耗视频流
│   ├── cj/                        # Cangjie 语言绑定
│   └── taihe/                     # Taihe 语言绑定
├── services/
│   ├── services/player/           # 播放器服务（PlayerServer, PlayerClient, IPC）
│   ├── services/recorder/         # 录制器服务
│   ├── services/sa_media/         # 系统能力媒体服务
│   ├── services/engine_intf/      # 引擎接口
│   ├── engine/histreamer/
│   │   ├── player/                # HiPlayerImpl 引擎
│   │   ├── recorder/              # HiRecorder 引擎
│   │   ├── factory/               # 引擎工厂
│   │   └── lpp/                   # LPP 引擎
│   ├── include/                   # 服务接口头文件
│   └── utils/                     # 服务工具
└── error_doc/                     # 错误码文档
```

## 核心文件

- `interfaces/kits/c/avplayer.h` — C API 头文件，定义 OH_AVPlayer_* 系列 60+ 函数
- `interfaces/inner_api/native/player.h` — C++ 内部播放器接口定义
- `interfaces/inner_api/native/media_errors.h` — 内部错误码枚举定义
- `frameworks/js/media/native_module_ohos_media.cpp` — NAPI 模块注册入口，注册 "multimedia.media" 模块
- `frameworks/js/avplayer/avplayer_napi.cpp` — AVPlayer NAPI 实现（176KB），55+ 个 NAPI 方法，状态机管理，24 个事件
- `frameworks/js/avrecorder/avrecorder_napi.cpp` — AVRecorder NAPI 实现
- `frameworks/js/avscreen_capture/avscreen_capture_napi.cpp` — AVScreenCapture NAPI 实现
- `frameworks/js/avtranscoder/avtranscoder_napi.cpp` — AVTransCoder NAPI 实现
- `frameworks/js/soundpool/` — SoundPool NAPI 实现目录
- `frameworks/native/capi/player/native_avplayer.cpp` — C API 播放器实现（117KB）
- `frameworks/native/common/media_errors.cpp` — 错误码映射表，三层错误码转换逻辑
- `frameworks/native/player/` — Native 播放器核心实现
- `services/services/player/server/player_server.cpp` — PlayerServer 服务端（109KB），播放器业务逻辑编排
- `services/services/player/client/player_client.cpp` — PlayerClient 客户端，IPC 调用封装
- `services/engine/histreamer/player/hiplayer_impl.cpp` — HiPlayerImpl 引擎实现（173KB），Pipeline 架构
- `services/engine/histreamer/recorder/` — HiRecorder 引擎实现
