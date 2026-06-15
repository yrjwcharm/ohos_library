# multimedia_av_codec 常见问题模式

## 1. 参数校验问题

### 1.1 空指针传入 (AV_ERR_INVALID_VAL = 3)

**现象**: CAPI 函数返回 `AV_ERR_INVALID_VAL` (3)，日志中可见 "is nullptr" 或 "magic error"。

**根因**: 所有 CAPI 实现函数的第一步都是校验输入参数非空和 magic number。以下参数为常见空指针场景：
- `OH_AudioDecoder_CreateByMime(mime)` 中 `mime` 为 nullptr
- `OH_VideoDecoder_Configure(codec, format)` 中 `codec` 或 `format` 为 nullptr
- `OH_AudioDecoder_SetCallback(codec, callback, userData)` 中 `callback.onError` 等回调为 nullptr
- `OH_AVMuxer_Create(fd, format)` 中 `fd` 无效

**排查方向**:
1. 检查 CAPI 返回值是否为 `AV_ERR_INVALID_VAL`
2. 查看 HiLog 中的 "is nullptr" 或 "magic error" 日志
3. 确认创建/获取对象的步骤是否成功

### 1.2 字符串超长 (MAX_LENGTH = 255)

**现象**: CreateByMime/CreateByName 返回 nullptr。

**根因**: mime 或 name 参数字符串长度超过 255 字符。代码中有 `strlen(mime) < MAX_LENGTH` 的检查。

**排查方向**: 检查传入的 MIME 类型或编解码器名称是否正确，不应超过 255 字符。

### 1.3 格式配置参数缺失或不匹配

**现象**:
- `OH_AudioDecoder_Configure` 返回错误
- `OH_VideoDecoder_Configure` 返回 `AV_ERR_VIDEO_UNSUPPORTED_COLOR_SPACE_CONVERSION` (301)

**根因**:
- 缺少必要的媒体键（如 `OH_MD_KEY_AUD_CHANNEL_COUNT`、`OH_MD_KEY_AUD_SAMPLE_RATE`、`OH_MD_KEY_BITRATE`）
- 通道数/采样率/比特率与编解码器能力不匹配（对应 `AVCS_ERR_CONFIGURE_MISMATCH_CHANNEL_COUNT`、`AVCS_ERR_MISMATCH_SAMPLE_RATE`、`AVCS_ERR_MISMATCH_BIT_RATE`）
- 配置了 HDR Vivid 色彩空间转换但编解码器不支持

**排查方向**:
1. 使用 `OH_AVCodec_GetCapability` 查询支持的参数范围
2. 检查 configure 时传入的 OH_AVFormat 是否包含所有必要键
3. 确认 `OH_MD_KEY_VIDEO_DECODER_OUTPUT_COLOR_SPACE` 配置与输入视频类型匹配

### 1.4 Buffer 属性错误

**现象**: `OH_AudioDecoder_PushInputData` 返回 `AV_ERR_INVALID_VAL`。

**根因**: `attr.size < 0`（缓冲区大小为负值）。代码中有 `CHECK_AND_RETURN_RET_LOG(attr.size >= 0, AV_ERR_INVALID_VAL, "Invalid buffer size!")` 的校验。

## 2. 状态机问题

### 2.1 无效状态下操作 (AV_ERR_INVALID_STATE / AVCS_ERR_INVALID_STATE)

**现象**: 在编解码器未进入正确状态时调用 API，返回操作不被允许的错误。

**正确状态流转**:
```
Created -> Configured -> Prepared -> Running -> Stopped/Flushed
                                      |              |
                                      +--- EOS ------+
```

**常见错误操作**:
- 未 Configure 就调用 Start
- 未 SetCallback 就调用 Start
- 已 Stopped 后直接调用 Start（需要重新 Configure 或调用 Prepare）
- 在 Flushing 过程中继续推送数据

**排查方向**:
1. 检查 API 调用时序是否正确
2. 注意 Flush 操作期间 `isFlushing_` 标志会被设为 true，此时 buffer 回调会被忽略

### 2.2 回调被忽略

**现象**: 编解码器运行正常但收不到 buffer 回调。

**根因**: CAPI 层有多个原子标志位控制回调行为：
- `isFlushing_ = true`: Flush 期间不传递 buffer
- `isFlushed_ = true`: Flush 完成后不传递旧 buffer
- `isStop_ = true`: Stop 后不传递 buffer
- `isEOS_ = true`: EOS 后不传递输入 buffer

**排查方向**: 确认是否在 Flush/Stop/EOS 之后错误地期望继续收到回调。

## 3. 编解码配置问题

### 3.1 不支持的编解码类型

**现象**: 返回 `AV_ERR_UNSUPPORT` (9) 或 JS 层 `5400106`。

**根因**:
- 使用了设备不支持的 MIME 类型
- 指定了不支持的 Profile/Level 组合
- 硬件编解码器不支持该格式（应尝试 SOFTWARE 类别）

**排查方向**:
1. 使用 `OH_AVCodec_GetCapability` 查询设备支持的编解码能力
2. 使用 `OH_AVCodec_GetCapabilityByCategory` 区分硬件/软件编解码器
3. 使用 `OH_AVCapability_IsVideoSizeSupported` 检查分辨率是否支持

### 3.2 硬件资源不足 (AVCS_ERR_INSUFFICIENT_HARDWARE_RESOURCES)

**现象**: 创建或启动编解码器时返回硬件资源不足错误。

**根因**:
- 同时创建的编解码器实例数超过硬件限制
- 系统内存不足以分配硬件编解码器
- 其它应用占用了硬件编解码资源

**排查方向**:
1. 使用 `OH_AVCapability_GetMaxSupportedInstances` 查询最大实例数
2. 确保不需要的编解码器实例已正确 Destroy
3. 建议同时创建的 AVPlayer/编解码器实例不超过 16 个

### 3.3 FLAC 编码器压缩级别错误 (AVCS_ERR_CONFIGURE_ERROR)

**现象**: FLAC 编码器 Configure 返回配置错误。

**根因**: FLAC 压缩级别超出有效范围（0-8）。需通过 `OH_MD_KEY_COMPLIANCE_LEVEL` 设置。

**排查方向**: 检查 `OH_MD_KEY_COMPLIANCE_LEVEL` 值是否在 0-8 范围内。

## 4. 数据流问题

### 4.1 输入数据错误 (AV_ERR_INPUT_DATA_ERROR / AVCS_ERR_INPUT_DATA_ERROR)

**现象**: 解码器通过 onError 回调报告输入数据错误。

**根因**:
- 输入的编码数据损坏或截断
- 输入数据格式与配置的 MIME 类型不匹配
- 缺少必要的编解码参数集（SPS/PPS for H.264/H.265）
- 数据中缺少 `OH_MD_KEY_CODEC_CONFIG` 配置

**排查方向**:
1. 确认输入数据格式与 MIME 类型匹配
2. 检查是否通过 `OH_MD_KEY_CODEC_CONFIG` 传递了必要的 SPS/PPS 信息
3. 检查输入 buffer 的 offset/size/presentationTimeUs 是否正确

### 4.2 EOS 处理

**现象**: 推送 EOS 标志后收不到最后的输出 buffer 或回调异常。

**根因**:
- 使用 `AVCODEC_BUFFER_FLAG_EOS` 标志推送空 buffer 时 `isEOS_` 被设为 true
- EOS 后不会收到新的输入 buffer 回调
- 需要等待所有输出 buffer 输出完毕后再 Destroy

**排查方向**:
1. 确保在收到所有输出数据后再调用 Stop/Destroy
2. 检查 EOS buffer 的 size 是否为 0

### 4.3 Buffer 未释放导致泄漏

**现象**: 编解码过程中内存持续增长。

**根因**:
- 未调用 `OH_AudioDecoder_FreeOutputData` / `OH_VideoDecoder_RenderOutputBuffer` 释放输出 buffer
- CAPI 层的 `memoryObjList_` / `bufferMap_` 中缓存了过多未释放的 buffer 对象

**排查方向**: 确保每次收到输出 buffer 后都调用了对应的释放/渲染方法。

## 5. 服务/IPC 问题

### 5.1 服务死亡 (AV_ERR_SERVICE_DIED = 7)

**现象**: onError 回调收到 `AV_ERR_SERVICE_DIED`，或 API 返回服务死亡错误。

**根因**:
- avcodec 服务进程崩溃
- IPC 连接断开
- `AVCS_ERR_IPC_GET_SUB_SYSTEM_ABILITY_FAILED`: 获取 SA 失败
- `AVCS_ERR_IPC_SET_DEATH_LISTENER_FAILED`: 设置死亡监听失败

**排查方向**:
1. 检查 hilog 中是否有 avcodec 服务崩溃信息
2. 检查系统 SA 是否正常运行
3. 在 onError 回调中处理 SERVICE_DIED，重建编解码器实例

### 5.2 IPC 通信错误

**现象**: `AVCS_ERR_IPC_UNKNOWN` 或 `AVCS_ERR_CREATE_AVCODEC_STUB_FAILED`。

**根因**:
- 编解码服务进程不存在或未注册
- IPC 权限问题

**排查方向**: 检查 avcodec SA 配置是否正确，系统是否正常启动。

## 6. 文件/IO 问题

### 6.1 文件操作失败

**现象**: `AV_ERR_IO` (4) 或 `AVCS_ERR_OPEN_FILE_FAILED`。

**根因**:
- fd 无效或已关闭（Muxer/Source 创建时）
- 文件权限不足
- 磁盘空间不足
- `AVCS_ERR_NOT_FIND_FILE`: 文件不存在

**排查方向**:
1. 确认 fd 在使用期间保持打开
2. 检查文件权限和磁盘空间
3. 对于 URI，确认网络可访问性

### 6.2 网络问题

**现象**: `AV_ERR_TIMEOUT` (5)、`AV_ERR_IO_CANNOT_FIND_HOST` (5411001) 等网络错误。

**根因**:
- `AV_ERR_IO_CONNECTION_TIMEOUT`: 网络连接超时
- `AV_ERR_IO_NETWORK_ABNORMAL`: 网络异常
- `AV_ERR_IO_NO_PERMISSION`: 网络权限被拒绝
- `AV_ERR_IO_CLEARTEXT_NOT_PERMITTED` (5411012): 不允许 HTTP 明文传输
- `AV_ERR_IO_SSL_CONNECT_FAIL`: SSL 连接失败

**排查方向**:
1. 检查网络权限声明（ohos.permission.INTERNET）
2. 使用 HTTPS 而非 HTTP
3. 检查 SSL 证书有效性
4. 设置合理的网络超时时间

## 7. DRM 相关问题

### 7.1 DRM 解密失败 (AV_ERR_DRM_DECRYPT_FAILED = 201)

**现象**: 解码 DRM 加密内容时返回解密失败。

**根因**:
- DRM 许可证未获取或已过期
- `OH_AVCencInfo` 配置错误（算法、密钥ID、IV 不匹配）
- DRM 插件不支持指定的加密算法

**排查方向**:
1. 确认 DRM 许可证已正确获取
2. 检查 `OH_AVCencInfo_SetAlgorithm` 设置的加密算法是否正确
3. 确认 keyId 和 IV 是否与加密内容匹配

## 8. 内存问题

### 8.1 内存不足 (AV_ERR_NO_MEMORY = 1 / 5400101)

**现象**: 创建编解码器或处理 buffer 时返回内存不足。

**根因**:
- 系统可用内存不足
- 编解码器实例过多
- Buffer 未释放导致内存累积

**排查方向**:
1. 减少同时运行的编解码器实例数
2. 确保及时释放输出 buffer
3. 检查系统内存使用情况

## 9. 跨版本兼容性问题

### 9.1 回调接口版本差异

**现象**: 编译或运行时回调不匹配。

**根因**:
- API 9 使用 `OH_AVCodecAsyncCallback`（已废弃）
- API 11+ 应使用 `OH_AVCodecCallback`（使用 OH_AVBuffer 替代 OH_AVMemory）
- 两者混用会导致回调不触发或数据类型不匹配

**排查方向**: 确认目标 API 版本并使用对应的回调类型。

### 9.2 API 废弃与替代

**现象**: 使用已废弃 API 编译警告或行为异常。

**根因**:
- `OH_AVCodecOnNeedInputData` / `OH_AVCodecOnNewOutputData` (API 9, 废弃于 API 11)
- 应使用 `OH_AVCodecOnNeedInputBuffer` / `OH_AVCodecOnNewOutputBuffer` (API 11+)
- `OH_MD_KEY_SCALING_MODE` (废弃于 API 14, 应使用 `OH_NativeWindow_NativeWindowSetScalingModeV2`)
- `OH_ED_KEY_TIME_STAMP` / `OH_ED_KEY_EOS` (废弃于 API 14)

**排查方向**: 检查使用的 API 是否有更新版本替代。
