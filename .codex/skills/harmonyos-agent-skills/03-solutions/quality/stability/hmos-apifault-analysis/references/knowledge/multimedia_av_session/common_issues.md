# 常见问题

## 权限问题

### 错误码 201：权限拒绝
- **错误信息**: Permission denied
- **典型场景**: 调用 `getAllSessionDescriptors`、`sendSystemAVKeyEvent`、`sendSystemControlCommand` 等接口时，应用未声明所需权限。
- **可能原因**: 应用未在 config.json 中声明 `ohos.permission.MANAGE_MEDIA_RESOURCES` 权限，或者该权限未获得系统授权。
- **处理步骤**:
  1. 检查应用的 config.json/module.json5 是否声明了所需权限。
  2. 确认应用是否为系统签名应用（部分权限仅系统应用可用）。
  3. 检查权限是否为 user_grant 类型，需要在运行时动态申请。
- **涉及内部错误码**: ERR_PERMISSION_DENIED (-1023)

### 错误码 202：非系统应用调用系统API
- **错误信息**: Caller is not a system application
- **典型场景**: 非系统应用调用了仅限系统应用使用的接口。
- **可能原因**: 应用不是系统签名应用，但调用了系统API。
- **处理步骤**:
  1. 确认当前应用是否为系统签名应用。
  2. 如果不是系统应用，改用公开API。
- **涉及内部错误码**: ERR_NO_PERMISSION (-1012)

## 参数问题

### 错误码 401：参数无效
- **错误信息**: Parameter error
- **典型场景**:
  - `createAVSession` 传入的 tag 为空字符串、type 不在有效范围（"audio"/"video"/"voice_call"/"video_call"）内
  - `createController` 传入的 sessionId 为空
  - `castAudio` 传入的 sessionToken 无效或 AudioDeviceDescriptor 为空
  - `startAVPlayback` 传入的 bundleName 为空
  - `getHistoricalSessionDescriptors` 的 maxSize 不在 0-10 范围内且不等于 52225
  - `sendSystemAVKeyEvent` 传入的 keyEvent 无效
  - `sendSystemControlCommand` 传入的 command 无效
- **可能原因**: 参数类型错误、缺少必要参数、参数值为空或超出合法范围。
- **处理步骤**:
  1. 检查 API 调用时传入的参数类型和值是否符合接口定义要求。
  2. 特别注意 ElementName 的 bundleName 和 abilityName 不能为空。
  3. 检查 sessionId 是否为有效非空字符串。
  4. 检查枚举类型参数是否在有效范围内。
- **涉及内部错误码**: ERR_INVALID_PARAM (-1002)

## 会话服务问题

### 错误码 6600101：会话服务异常
- **错误信息**: Session service exception
- **典型场景**: 调用任何 AVSession API 都可能返回此错误。
- **可能原因**:
  1. AVSession 系统服务未启动或已崩溃。
  2. IPC 通信失败（Marshalling/Unmarshalling 错误）。
  3. 内存不足导致会话创建失败。
  4. 会话重启过程中服务被杀。
  5. 会话已存在（ERR_SESSION_IS_EXIST）。
  6. 会话监听器已存在（ERR_SESSION_LISTENER_EXIST）。
- **处理步骤**:
  1. 定时重试，超过 3s 仍失败时停止操作。
  2. 销毁当前会话或控制器并重新创建。
  3. 若重新创建失败，停止会话相关操作。
  4. 检查系统日志确认服务状态。
- **涉及内部错误码**: ERR_NO_MEMORY (-1001), ERR_SERVICE_NOT_EXIST (-1003), ERR_SESSION_LISTENER_EXIST (-1004), ERR_MARSHALLING (-1005), ERR_UNMARSHALLING (-1006), ERR_IPC_SEND_REQUEST (-1007), ERR_SESSION_EXCEED_MAX (-1008), 等多种内部错误均映射到此错误码。

### 错误码 6600102：会话不存在
- **错误信息**: The session does not exist
- **典型场景**:
  - 向已销毁的会话发送命令
  - `createController` 使用的 sessionId 对应的会话已被销毁
  - `castAudio` 的 sessionToken 对应的会话不存在
- **可能原因**: 会话已被销毁，服务端无会话记录。
- **处理步骤**:
  1. 被控端：重新创建会话。
  2. 控制端：停止向该会话发送命令。
  3. 管理端：重新查询当前会话记录，使用正确的 sessionId。
- **涉及内部错误码**: ERR_SESSION_NOT_EXIST (-1009)

### 错误码 6600103：控制器不存在
- **错误信息**: The session controller does not exist
- **典型场景**: 向已销毁的控制器发送命令。
- **可能原因**: 控制器已被销毁。
- **处理步骤**: 重新查询系统会话记录，创建对应的控制器。
- **涉及内部错误码**: ERR_CONTROLLER_NOT_EXIST (-1011)

### 错误码 6600104：IPC 连接失败
- **错误信息**: The session is not connected
- **典型场景**: RPC 发送请求失败。
- **可能原因**: 与 AVSession 系统服务的 IPC 连接异常。
- **处理步骤**: 检查 AVSession 系统服务是否正常运行。
- **涉及内部错误码**: ERR_RPC_SEND_REQUEST (-1019)

## 会话控制问题

### 错误码 6600105：无效会话命令
- **错误信息**: Invalid session command
- **典型场景**:
  - `sendSystemAVKeyEvent` 传入的按键事件不受支持
  - `sendSystemControlCommand` 传入的命令不受被控端支持
- **可能原因**: 被控端未注册该命令的回调（未通过 on() 注册对应事件）。
- **处理步骤**:
  1. 停止发送该命令。
  2. 通过 `controller.getValidCommands()` 查询被控端支持的命令集。
  3. 仅发送被控端支持的命令。
- **涉及内部错误码**: ERR_COMMAND_NOT_SUPPORT (-1010)

### 错误码 6600106：会话未激活
- **错误信息**: The session is not activated
- **典型场景**: 在会话未激活时向其发送控制命令。
- **可能原因**: 会话创建后未调用 `activate()` 或已被 `deactivate()`。
- **处理步骤**:
  1. 停止发送命令。
  2. 监听 `activeStateChange` 事件。
  3. 会话激活后恢复命令发送。
- **涉及内部错误码**: ERR_SESSION_DEACTIVE (-1013)

### 错误码 6600107：命令过载
- **错误信息**: Too many commands or events
- **典型场景**: 短时间内频繁调用 `sendControlCommand`、`sendSystemControlCommand` 等接口。
- **可能原因**: 客户端发送命令过于频繁，服务端消息队列过载。
- **处理步骤**:
  1. 降低命令发送频率。
  2. 添加适当的延迟和节流机制。
  3. 避免在循环中高频发送控制命令。
- **涉及内部错误码**: ERR_COMMAND_SEND_EXCEED_MAX (-1018)

## 投播问题

### 错误码 6600108：设备连接失败
- **错误信息**: Device connection failed
- **典型场景**: `startCasting` 或 `castAudio` 时目标设备连接失败。
- **可能原因**: 目标设备不可达、设备不支持投播、网络异常。
- **处理步骤**:
  1. 检查目标设备是否在线且可达。
  2. 确认目标设备支持投播功能。
  3. 重试投播操作。
- **涉及内部错误码**: ERR_DEVICE_CONNECTION_FAILED (-1020)

### 错误码 6600109：远端连接不存在
- **错误信息**: The remote connection is not established
- **典型场景**: `getDistributedSessionController` 查询远端会话时远端会话不存在。
- **可能原因**: 远端会话已销毁或未创建。
- **处理步骤**: 重新查询会话状态，确认远端会话是否存在。
- **涉及内部错误码**: ERR_REMOTE_CONNECTION_NOT_EXIST (-1021)

### 错误码 6611000-6616100：投播控制错误
- **典型场景**: 使用投播控制器 (AVCastController) 进行播放控制时。
- **常见子类**:
  - **6611000**: 投播控制器未知错误 -- 重新发起会话。
  - **6611001**: 远端设备异常 -- 重启远端设备。
  - **6611003**: 投播超时 -- 重新发起会话。
  - **6612001/6612002**: 网络连接失败/超时 -- 检查网络连接。
  - **6613000-6613004**: 媒体解析错误 -- 检查资源格式。
  - **6614000-6614005**: 解码错误 -- 检查文件格式和设备能力。
  - **6615000-6615002**: 音频渲染错误 -- 重启远端设备。
  - **6616000-6616100**: DRM错误 -- 更新DRM组件。

## 桌面歌词问题

### 错误码 6600110：桌面歌词未启用
- **错误信息**: Desktop lyric is not enabled
- **典型场景**: 调用 `setDesktopLyricVisible` 等接口时桌面歌词未启用。
- **处理步骤**: 先调用 `enableDesktopLyric(true)` 启用桌面歌词。
- **涉及内部错误码**: ERR_DESKTOPLYRIC_NOT_ENABLE (-1029)

### 错误码 6600111：桌面歌词不支持
- **错误信息**: Desktop lyric is not supported
- **典型场景**: 在不支持桌面歌词的设备上调用相关 API。
- **处理步骤**: 先调用 `isDesktopLyricSupported` 确认设备支持情况。
- **涉及内部错误码**: ERR_DESKTOPLYRIC_NOT_SUPPORT (-1028)

## 常见开发陷阱

### 1. 会话生命周期管理不当
- 创建会话后忘记 `activate()`，导致控制端收到 6600106 错误。
- 应用退出时未调用 `destroy()`，导致会话残留。
- 多次调用 `createAVSession` 使用相同参数，触发会话已存在错误。

### 2. 控制器重复创建
- `createController` 对同一 sessionId 重复调用时，NAPI 层会返回已有实例 (RepeatedInstance)。
- 但频繁创建和销毁控制器可能导致资源泄露。

### 3. 事件监听器泄漏
- 注册 on() 事件但未在适当时机调用 off() 取消注册。
- 特别是 `sessionServiceDie` 事件，回调引用(napi_ref)会持续持有。

### 4. 投播功能编译依赖
- `startCastDeviceDiscovery`、`stopCastDeviceDiscovery`、`startCasting`、`stopCasting`、`getAVCastController` 等 API 需要 `CASTPLUS_CAST_ENGINE_ENABLE` 编译宏。
- 若未启用该宏，这些函数返回 nullptr。

### 5. 异步操作竞态
- AVSession API 大部分为异步操作（通过 NapiAsyncWork）。
- 在异步操作完成前调用相关 API 可能导致竞态条件。
- 建议在 callback/Promise 完成后再进行下一步操作。

### 6. 服务重启恢复
- AVSession 系统服务可能因系统资源回收而重启。
- NAPI 层通过 RegisterServiceStartCallback 和 HandleServiceStart 机制自动恢复会话。
- 但恢复过程中短暂的服务不可用会导致 6600101 错误，应用需要有重试逻辑。
