# 模块映射表

本文件包含 6 个子映射表格，用于将不同来源的信号（错误码、DOMAIN、.so 库名、API 名称、hilog domain_id）映射到具体的模块，以及模块到代码仓/文档仓 URL 的映射。

**注意：** d.ts 声明名、文档仓 kit 名、代码仓目录名、开发指南目录名之间无机械对应关系，每个子映射需独立维护。

---

## 1. 错误码前缀 → 模块名

用于错误码驱动型问题的模块识别。从问题输入中提取的错误码数字按前缀匹配。

| 错误码前缀 | 模块名 | 代码仓目录名 |
|-----------|--------|-------------|
| 6600xxx / 661xxxx | multimedia_av_session | multimedia_av_session |
| 5400xxx / 541xxxx | multimedia_player_framework | multimedia_player_framework |
| 6800xxx | multimedia_audio_framework | multimedia_audio_framework |
| 7400xxx | multimedia_camera_framework | multimedia_camera_framework |
| 1600xxx | ability_ability_runtime | ability_ability_runtime |
| 16000xx | ability_ability_runtime（UIAbility） | ability_ability_runtime |
| 3301xxx | base_location | base_location |
| 8300xxx | telephony | telephony_core_service |
| 201 / 202 | 通用权限错误（跨模块） | — |
| 401 | 通用参数错误（跨模块） | — |

**使用规则：**
- 取错误码的前 4-7 位进行匹配，优先匹配最长的前缀
- 201/202/401 为通用错误码，不直接指向特定模块，需结合其它线索判断
- 若错误码无匹配的前缀，标注"模块未识别"

---

## 2. DOMAIN 标识 → 代码仓

用于崩溃/冻屏日志的模块识别。HiviewDFX 日志中的 DOMAIN 字段对应子系统。

| DOMAIN | 子系统 | 代码仓目录名 |
|--------|--------|-------------|
| AAFWK | Ability Framework | ability_ability_runtime |
| ARKCOMPILER | ArkCompiler | arkcompiler_ets_runtime |
| ACE | ArkUI Engine | arkui_ace_engine |
| WINDOW | Window Manager | window_window_manager |
| MULTIMEDIA | Multimedia（多种模块） | multimedia_* |
| AUDIO | Audio | multimedia_audio_framework |
| PLAYER | Player | multimedia_player_framework |
| DISTRIBUTED | Distributed | distributedhardware_* |
| ACCOUNT | Account | os_account |
| BUNDLE | Bundle Manager | bundlemanager_bundle_framework |
| NETWORK | Network | communication_netstack |
| BLUETOOTH | Bluetooth | communication_bluetooth |
| WIFI | Wi-Fi | communication_wifi |
| TELEPHONY | Telephony | telephony_core_service |
| LOCATION | Location | base_location |
| GRAPHIC | Graphic | graphic_graphic_2d |
| HDF | Hardware Driver | drivers_* |

**使用规则：**
- DOMAIN 为大写标识，从 HiviewDFX 日志的 `DOMAIN` 字段提取
- MULTIMEDIA DOMAIN 需结合 .so 库名进一步区分具体模块
- 若 DOMAIN 不在映射表中，保留 DOMAIN 值用于后续 WebSearch 搜索

---

## 3. .so 库名 → 模块名

用于崩溃/冻屏日志调用栈中的模块识别。从 `#NN pc <addr> <lib_path>` 格式中提取。

| .so 库名 | 模块名 | 代码仓目录名 |
|---------|--------|-------------|
| libavsession.so | multimedia_av_session | multimedia_av_session |
| libohavsession.so | multimedia_av_session | multimedia_av_session |
| libmedia_avplayer.so | multimedia_player_framework | multimedia_player_framework |
| libmedia_soundpool.so | multimedia_player_framework | multimedia_player_framework |
| libmedia_helper_client.so | multimedia_player_framework | multimedia_player_framework |
| libaudio_haptic.so | multimedia_player_framework | multimedia_player_framework |
| libplayer.so | multimedia_player_framework | multimedia_player_framework |
| libaudio_*.so | multimedia_audio_framework | multimedia_audio_framework |
| libcamera.so | multimedia_camera_framework | multimedia_camera_framework |
| libace.so | arkui_ace_engine | arkui_ace_engine |
| libark_jsruntime.so | arkcompiler_ets_runtime | arkcompiler_ets_runtime |
| libability_manager.so | ability_ability_runtime | ability_ability_runtime |
| liblocation_sdk.so | base_location | base_location |
| libbluetooth.so | communication_bluetooth | communication_bluetooth |
| libwifi_sdk.so | communication_wifi | communication_wifi |

**系统库（不直接指向业务模块）：**

- `libace.so` — ArkUI 引擎（跨模块通用）
- `libark_jsruntime.so` — JS 运行时（跨模块通用）
- `libc.so` / `libm.so` — C 标准库
- `libhilog.so` — 日志库

**使用规则：**
- 从调用栈最底层（#00）的非系统库开始分析
- 若调用栈中多个 .so 同时出现，优先分析 #00 附近的业务库
- 库名支持通配符匹配（如 `libaudio_*.so`）

---

## 4. API 名称前缀 → 模块名

用于 API 调用异常型问题的模块识别。

| API 名称前缀 | 模块名 | SDK .d.ts 文件 |
|-------------|--------|---------------|
| avsession.* | multimedia_av_session | @ohos.multimedia.avsession.d.ts |
| createAVSession | multimedia_av_session | @ohos.multimedia.avsession.d.ts |
| AVSession* | multimedia_av_session | @ohos.multimedia.avsession.d.ts |
| AVCastPicker* | multimedia_av_session | @ohos.multimedia.avsession.d.ts |
| AVMusicTemplate* | multimedia_av_session | @ohos.multimedia.avMusicTemplate.d.ts |
| media.create* | multimedia_player_framework | @ohos.multimedia.media.d.ts |
| media.createSoundPool | multimedia_player_framework | @ohos.multimedia.media.d.ts |
| AVPlayer* | multimedia_player_framework | @ohos.multimedia.media.d.ts |
| AVRecorder* | multimedia_player_framework | @ohos.multimedia.media.d.ts |
| SoundPool* | multimedia_player_framework | @ohos.multimedia.media.d.ts |
| AVTranscoder* | multimedia_player_framework | @ohos.multimedia.media.d.ts |
| audio.* | multimedia_audio_framework | @ohos.multimedia.audio.d.ts |
| AudioRenderer* | multimedia_audio_framework | @ohos.multimedia.audio.d.ts |
| AudioCapturer* | multimedia_audio_framework | @ohos.multimedia.audio.d.ts |
| camera.* | multimedia_camera_framework | @ohos.multimedia.camera.d.ts |
| geoLocationManager.* | base_location | @ohos.geoLocationManager.d.ts |
| ble.* / socket.* | communication_bluetooth | @ohos.bluetooth.ble.d.ts |
| wifi.* | communication_wifi | @ohos.wifi.d.ts |
| ability.* | ability_ability_runtime | @ohos.app.ability.*.d.ts |
| window.* | window_window_manager | @ohos.window.d.ts |
| connection.* / socket.* (network) | communication_netstack | @ohos.net.connection.d.ts |

**使用规则：**
- 匹配时优先使用精确匹配，再使用前缀匹配
- JS API 名称区分大小写

---

## 5. hilog domain_id → 模块名

用于 hilog 日志的模块识别。从 hilog tag `C<domain_id>/<package>/<module>` 中提取。

| hilog domain_id (0x 格式) | 十进制范围 | 模块名 |
|---------------------------|-----------|--------|
| 0xD002B91 | — | multimedia_av_session |
| 0xD002B2B ~ 0xD002B2D | — | multimedia_player_framework |
| 0xD002B84 / 0xD002B86 / 0xD002B8C | — | multimedia_audio_framework |
| 0xD001304 | — | ability_ability_runtime  |
| 0xD003900 | — | ability_ability_runtime (CJ) |
| 0xD003935 / 0xD003936 | — | arkui_ace_engine (UIService) |
| 0xD004200 / 0xD004201 | — | window_window_manager |
| 0xD001201 | — | notification_eventhandler |
| 0xD001400 | — | graphic_graphic_2d |
| 0xD000101 | — | communication_bluetooth |
| 0xD001560 | — | communication_wifi |
| 0xD002300 | — | base_location |
| 0xD004303 | — | filemanagement_app_file_service |
| 0xD001650 | — | distributeddatamgr_pasteboard |
| 0xD001711 | — | resourceschedule_background_task_mgr |
| 0xD001F00 | — | telephony_core_service |

**使用规则：**
- 先尝试精确匹配，再按范围匹配子系统
- hilog tag 中 `C` 后、第一个 `/` 前的数字为 domain_id

---

## 6. 模块名 → 代码仓与文档 URL

用于定位代码仓库和文档。代码仓 URL 直接拼接文件路径访问源码；文档仓 URL 使用 Gitee docs 仓库。

**代码仓文件访问格式：**
- 原始内容：`https://gitee.com/openharmony/{repo}/raw/master/{file_path}`
- 目录浏览：`https://gitee.com/openharmony/{repo}/tree/master/{dir_path}`

**文档仓文件访问格式：**
- 原始内容：`https://gitee.com/openharmony/docs/raw/master/{doc_path}`
- 目录浏览：`https://gitee.com/openharmony/docs/tree/master/{dir_path}`

| 模块名 | 代码仓 URL | errorcode 文档路径 | 开发指南路径 |
|--------|-----------|-------------------|-------------|
| multimedia_player_framework | https://gitee.com/openharmony/multimedia_player_framework | zh-cn/application-dev/reference/apis-media-kit/errorcode-media.md | zh-cn/application-dev/media/media/ |
| multimedia_av_session | https://gitee.com/openharmony/multimedia_av_session | zh-cn/application-dev/reference/apis-avsession-kit/errorcode-avsession.md | zh-cn/application-dev/media/avsession/ |
| multimedia_audio_framework | https://gitee.com/openharmony/multimedia_audio_framework | zh-cn/application-dev/reference/apis-audio-kit/errorcode-audio.md | zh-cn/application-dev/media/audio/ |
| multimedia_camera_framework | https://gitee.com/openharmony/multimedia_camera_framework | zh-cn/application-dev/reference/apis-camera-kit/errorcode-camera.md | zh-cn/application-dev/media/camera/ |
| multimedia_av_codec | https://gitee.com/openharmony/multimedia_av_codec | zh-cn/application-dev/reference/apis-media-kit/errorcode-media.md | zh-cn/application-dev/media/media/ |
| multimedia_video_processing_engine | https://gitee.com/openharmony/multimedia_video_processing_engine | zh-cn/application-dev/reference/apis-media-kit/errorcode-media.md | zh-cn/application-dev/media/media/ |
| ability_ability_runtime | https://gitee.com/openharmony/ability_ability_runtime | zh-cn/application-dev/reference/apis-ability-kit/errorcode-ability.md | zh-cn/application-dev/application-models/ |
| base_location | https://gitee.com/openharmony/base_location | zh-cn/application-dev/reference/apis-location-kit/errorcode-geoLocationManager.md | zh-cn/application-dev/device/location/ |
| communication_bluetooth | https://gitee.com/openharmony/communication_bluetooth | zh-cn/application-dev/reference/apis-connectivity-kit/errorcode-nfc.md（部分） | zh-cn/application-dev/connectivity/bluetooth/ |
| communication_wifi | https://gitee.com/openharmony/communication_wifi | （散布在 connectivity kit 下） | zh-cn/application-dev/connectivity/wlan/ |
| window_window_manager | https://gitee.com/openharmony/window_window_manager | zh-cn/application-dev/reference/apis-arkui/errorcode-bindSheet.md（部分） | zh-cn/application-dev/application-models/ |
| telephony_core_service | https://gitee.com/openharmony/telephony_core_service | zh-cn/application-dev/reference/apis-telephony-kit/errorcode-telephony.md | zh-cn/application-dev/device/telephony/ |

**WebFetch 兜底策略：**

当模块无映射或映射未命中时：
1. 使用 WebSearch 搜索错误码对应的官方文档
2. 使用 WebFetch 直接访问 `https://gitee.com/openharmony/docs/raw/master/zh-cn/application-dev/reference/` 下的文件

---

## 未识别信号处理指引

当从输入中提取的信号不匹配上述任何映射表条目时：

1. **标注模块未识别**：在输出中将 `module_identified` 设为 `"未识别"`
2. **保留所有线索**：将提取到的错误码、DOMAIN、.so 名、API 名称等全部记录在 `clues` 中
3. **尝试推测**：
   - 若有 .so 库名，按 `lib<模块关键词>.so` 规则推测代码仓目录名
   - 若有 DOMAIN 值，使用 WebSearch 搜索 DOMAIN + "openharmony" 定位源码
   - 若有 API 名称前缀，使用 WebSearch 搜索定位所属 kit
4. **WebSearch 兜底**：在搜索引擎中搜索错误码"openharmony"

**映射缺口反馈：** 若某个信号反复出现但不在映射表中，说明映射表需要补充。
