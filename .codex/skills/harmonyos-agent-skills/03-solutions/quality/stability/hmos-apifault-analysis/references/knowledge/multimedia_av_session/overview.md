# multimedia_av_session

## 模块职责

AVSession 部件为系统提供统一的媒体控制能力。用户通过系统播控中心控制本端和远端音视频应用的播放行为。该模块管理媒体会话的创建、销毁、激活、去激活，支持媒体元数据设置、播放状态同步、控制命令下发，并提供音频投播（CastAudio）、设备发现、分布式会话控制等高级功能。同时支持桌面歌词（DesktopLyric）特性。

## 目录结构

```
multimedia_av_session/
├── frameworks/
│   ├── js/napi/session/          # NAPI Bridge Layer (JS <-> C++)
│   │   ├── include/              # NAPI 头文件
│   │   └── src/                  # NAPI 实现
│   ├── native/
│   │   ├── session/src/          # 客户端 AVSessionManager 实现
│   │   └── ohavsession/          # C API 实现
│   ├── common/                   # 公共工具类
│   └── taihe/                    # Taihe IDL 绑定
├── interfaces/
│   ├── inner_api/native/session/include/  # 内部 API 头文件
│   └── kits/c/                   # C API 公共头文件
├── services/session/
│   ├── adapter/                  # 外部依赖适配
│   ├── ipc/                      # IPC 通信层 (proxy/stub)
│   └── server/                   # 服务端 SA 实现
├── utils/                        # 公共工具
├── avpicker/                     # 投播选择器 UI 组件
├── avvolumepanel/                # 音量面板 UI 组件
└── sa_profile/                   # 系统能力 Profile
```

## 核心文件

- `frameworks/js/napi/session/src/napi_avsession_manager.cpp` — NAPI Manager 层，注册所有 avSession 静态函数（createAVSession, getAllSessionDescriptors, createController, castAudio, startCast 等），包含完整的内部错误码到 JS 错误码的映射表 (errcode_)
- `frameworks/js/napi/session/src/napi_avsession.cpp` — NAPI AVSession 实例方法（setAVMetadata, setAVPlaybackState, activate, destroy, on/off 事件等），包含会话控制回调注册
- `frameworks/js/napi/session/src/napi_avsession_controller.cpp` — NAPI AVSessionController 实例方法（getAVPlaybackState, sendControlCommand, getAVMetadata 等），包含控制器事件监听
- `frameworks/js/napi/session/include/napi_avsession_manager.h` — NapiAVSessionManager 类声明，定义所有静态成员函数和事件处理映射
- `frameworks/native/session/src/avsession_manager_impl.cpp` — 客户端 AVSessionManagerImpl 实现，通过 IPC Proxy 调用服务端 AVSessionService
- `interfaces/inner_api/native/session/include/avsession_errors.h` — 内部错误码定义（ERR_NO_MEMORY, ERR_SERVICE_NOT_EXIST, ERR_SESSION_NOT_EXIST 等）
- `interfaces/kits/c/native_avsession_errors.h` (api/interface_sdk_c/) — C API 公共错误码定义
- `services/session/server/avsession_service.cpp` — 服务端 SystemAbility 实现
- `services/session/server/avsession_item.cpp` — 会话记录对象
- `services/session/ipc/` — IPC 通信层（AVSessionServiceProxy/Stub）
- `error_doc/errorcode-avsession.md` — 完整的 JS 错误码文档，包含错误描述、可能原因和处理步骤

## 架构层次

```
JS 应用层 (d.ts API)
    ↓ NAPI Bridge
frameworks/js/napi/session/ (NapiAVSessionManager, NapiAVSession, NapiAVSessionController)
    ↓ AVSessionManager::GetInstance()
frameworks/native/session/src/avsession_manager_impl.cpp (客户端 IPC Proxy)
    ↓ IPC (AVSessionServiceProxy)
services/session/server/avsession_service.cpp (服务端 SA)
    ↓
avsession_item.cpp (会话管理)
```

## 错误码体系

- **201**: 权限拒绝 (ERR_PERMISSION_DENIED)
- **202**: 系统API权限 (ERR_NO_PERMISSION)
- **401**: 参数无效 (ERR_INVALID_PARAM)
- **6600101**: 会话服务异常（含内存不足、服务不存在、IPC错误等多种内部错误）
- **6600102**: 会话不存在
- **6600103**: 控制器不存在
- **6600104**: RPC发送请求失败
- **6600105**: 无效会话命令
- **6600106**: 会话未激活
- **6600107**: 命令/消息过载
- **6600108**: 设备连接失败
- **6600109**: 远端连接不存在
- **6600110**: 桌面歌词未启用
- **6600111**: 桌面歌词不支持
- **6611000-6616100**: 投播控制错误码（设备错误、网络IO、解析、解码、音频渲染、DRM）
