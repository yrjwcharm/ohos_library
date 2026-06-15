# 常见问题

## 权限问题

- 错误码 5400101 (MSERR_EXT_API9_NO_PERMISSION)：应用缺少必要的媒体权限。需在 module.json5 中声明 `ohos.permission.INTERNET`（网络流）、`ohos.permission.READ_MEDIA`（本地文件读取）等权限。对于 AVScreenCapture，还需检查是否获取了用户授权。此错误码也可能表示系统内存不足（No Memory），需结合错误消息区分。
- 错误码 5411005 (MSERR_EXT_API14_IO_NO_PERMISSION)：访问网络资源时被服务器拒绝权限，常见于 HTTP 403 响应。检查资源访问令牌、鉴权信息是否正确。
- 错误码 5411006 (MSERR_EXT_API14_IO_NETWORK_ACCESS_DENIED)：系统网络策略阻止了访问，检查是否在沙箱环境或受限制网络中运行。

## 参数问题

- 错误码 5400102 (MSERR_EXT_API9_INVALID_PARAMETER)：传入参数不合法。常见原因：(1) URL 为空或格式错误；(2) fdSrc 的 fd 已关闭或 offset/length 越界；(3) seek 的 timeMs 为负数；(4) setVolume 的 volume 不在 0~1 范围内；(5) setSpeed 的 speed 不是 PlaybackSpeed 枚举值。需逐一检查 API 调用参数。
- 错误码 5400106 (MSERR_EXT_API9_UNSUPPORT_FORMAT)：不支持的媒体格式。内部可能由多种原因触发：(1) 音频编码格式不支持（MSERR_UNSUPPORT_AUD_ENC_TYPE/MSERR_UNSUPPORT_AUD_DEC_TYPE）；(2) 视频编码格式不支持（MSERR_UNSUPPORT_VID_ENC_TYPE/MSERR_UNSUPPORT_VID_DEC_TYPE）；(3) 容器格式不支持（MSERR_UNSUPPORT_CONTAINER_TYPE）；(4) 协议不支持（MSERR_UNSUPPORT_PROTOCOL_TYPE）；(5) 码流解析失败（MSERR_UNSUPPORT_STREAM）。需要确认设备支持的编解码器列表，并检查媒体文件格式。

## 状态问题

- 错误码 5400102 (操作不被允许) / 状态机错误：在错误的状态下调用 API。AVPlayer 的合法状态转换为：idle -> initialized（设置 url/fdSrc/dataSrc 后）-> prepared（调用 prepare 后）-> playing -> paused -> stopped -> completed。常见错误操作：(1) 未 prepare 就调用 play；(2) 在 released 状态后继续调用任何方法；(3) 在 error 状态下未 reset 就重新播放。应始终监听 `stateChange` 事件，仅在合法状态下发起操作。
- 错误码 5410002 (MSERR_EXT_API16_SEEK_CONTINUOUS_UNSUPPORTED)：在快速连续 seek 时触发。上一次 seek 尚未完成（未收到 `seekDone` 事件）就发起了新的 seek。解决方案：等待 `seekDone` 事件回调后再发下一次 seek 请求。
- 错误码 5400105 (MSERR_EXT_API9_SERVICE_DIED)：媒体服务进程崩溃。可能原因：(1) 系统内存不足导致服务被 kill；(2) 服务内部严重错误。需要销毁当前 AVPlayer 实例，重新 `createAVPlayer` 并从头初始化播放流程。

## 网络问题

- 错误码 5400103 (MSERR_EXT_API9_IO)：通用 IO 错误，网络场景下可能由多种网络问题触发。
- 错误码 5400104 (MSERR_EXT_API9_TIMEOUT)：网络超时。TCP 连接建立、数据传输过程中的超时。检查网络连通性和带宽。
- 错误码 5411001 (MSERR_EXT_API14_IO_CANNOT_FIND_HOST)：DNS 解析失败，检查 URL 中的主机名是否正确。
- 错误码 5411002 (MSERR_EXT_API14_IO_CONNECTION_TIMEOUT)：TCP 连接超时，目标服务器可能不可达或端口被阻止。
- 错误码 5411003 (MSERR_EXT_API14_IO_NETWORK_ABNORMAL)：传输过程中网络异常，如连接重置、数据包丢失。可能是网络质量差或服务器端异常断开。
- 错误码 5411004 (MSERR_EXT_API14_IO_NETWORK_UNAVAILABLE)：设备网络不可用，检查飞行模式、WiFi/移动数据状态。
- 错误码 5411007 (MSERR_EXT_API14_IO_RESOURE_NOT_FOUND)：HTTP 404，请求的媒体资源不存在。检查 URI 路径是否正确，资源是否已被删除或移动。
- 错误码 5411008~5411010：SSL/TLS 相关错误。5411008 表示服务器要求客户端证书；5411009 表示 SSL 握手失败；5411010 表示服务器证书不可信。检查证书配置和信任链。
- 错误码 5411011 (MSERR_EXT_API14_IO_UNSUPPORTTED_REQUEST)：服务器不支持该请求类型，可能是 HTTP 方法或协议特性不被支持。

## 服务异常

- 错误码 5400105 (MSERR_EXT_API9_SERVICE_DIED)：媒体服务死亡（`media_service` 进程崩溃或被系统杀死）。处理步骤：(1) 销毁当前 AVPlayer/AVRecorder 实例；(2) 重新创建实例；(3) 重新初始化（设置源、Surface 等）；(4) 重新播放/录制。建议监听 `stateChange` 事件的 error 状态，以及时感知服务异常。
- 错误码 5400107 (MSERR_EXT_API9_AUDIO_INTERRUPTED)：音频被中断。这是正常业务场景，不是错误。当电话来电、闹钟响铃等高优先级音频事件发生时触发。应监听 `audioInterrupt` 事件，根据中断类型（INTERRUPT_HINT_PAUSE / INTERRUPT_HINT_STOP 等）暂停或停止播放，并在中断结束后根据恢复提示继续播放。
- AVPlayer 播放黑屏有声音无画面：常见原因：(1) 未设置 surfaceId（视频渲染需要 XComponent 或 Window 的 surfaceId）；(2) surfaceId 设置时机错误（应在 prepared 状态前设置）；(3) Surface 已销毁或不可用。检查 surfaceId 是否有效，以及在正确的状态设置。
- AVPlayer 播放卡顿/缓冲频繁：监听 `bufferingUpdate` 事件获取缓冲百分比和缓冲策略。如果是网络流，检查网络带宽；如果是本地文件，检查磁盘 IO 性能。可以适当降低码率（通过 selectBitrate 选择较低码率）。
- DRM 验证失败 (MSERR_DRM_VERIFICATION_FAILED)：播放受 DRM 保护的内容时验证失败。检查 DRM 证书是否有效、是否正确设置了 MediaKeySystem 信息。
