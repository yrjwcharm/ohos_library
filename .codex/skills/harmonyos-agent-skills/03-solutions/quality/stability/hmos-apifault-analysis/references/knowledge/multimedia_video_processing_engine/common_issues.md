# 常见问题

## 环境初始化问题

### 错误码 29200002 / 29210002: 全局环境初始化失败

**表现**: 调用 `OH_ImageProcessing_InitializeEnvironment()` 或 `OH_VideoProcessing_InitializeEnvironment()` 返回 `INITIALIZE_FAILED` 错误；JS API 调用 `videoProcessingEngine.initializeEnvironment()` 抛出 BusinessError 29200002。

**可能原因**:
1. GPU 环境初始化失败。图像处理的 CAPI 实现中依次尝试初始化 OpenCL 和 OpenGL 环境（`OpenCLInit()` + `OpenGLInit()`），任一失败即返回不支持。
2. 设备 GPU 驱动异常或 GPU 资源被占用。
3. 系统图形服务未就绪。

**排查建议**:
1. 查看日志中是否有 GPU 异常上报（LOG_TAG: "VpeNapi" 或 "VPE"）。
2. 检查设备 GPU 是否正常工作（如运行其它 GPU 相关应用是否正常）。
3. 确认 `libvideoprocessingengine_ext.z.so` 是否存在于 `/system/lib64/`。如果该库不存在，仅细节增强功能可用（`ImageProcessingFactory::IsValid()` 和 `VideoProcessingFactory::IsValid()` 的降级逻辑）。
4. JS API 的 `initializeEnvironment()` 在 NAPI 层当前实现为直接返回 true，未实际调用底层 CAPI。如果从 JS 层遇到初始化失败，需要排查是否在 CAPI 层被调用。

### 错误码 29200006 / 29210006: 反初始化操作不被允许

**表现**: 调用 `OH_ImageProcessing_DeinitializeEnvironment()` 或 `OH_VideoProcessing_DeinitializeEnvironment()` 返回 `OPERATION_NOT_PERMITTED`。

**可能原因**:
1. 尚有图像/视频处理实例未销毁（未调用 Destroy）。
2. 未调用过 `InitializeEnvironment` 就调用了 `DeinitializeEnvironment`。

**排查建议**:
1. 确保所有创建的实例已通过 `OH_ImageProcessing_Destroy` / `OH_VideoProcessing_Destroy` 销毁。
2. 确保在调用 `DeinitializeEnvironment` 之前已经调用过 `InitializeEnvironment`。

---

## 实例创建问题

### 错误码 29200003 / 29210003: 创建实例失败

**表现**: 调用 `OH_ImageProcessing_Create()` 或 `OH_VideoProcessing_Create()` 返回 `CREATE_FAILED`；JS API 调用 `videoProcessingEngine.create()` 抛出 BusinessError 29200003。

**可能原因**:
1. 创建的实例数量超过上限。
2. `ImageProcessingFactory` / `VideoProcessingFactory` 创建 Native 对象失败（内存不足或内部初始化异常）。
3. OpenGL 上下文获取失败。

**排查建议**:
1. 减少同时创建的实例数量，及时销毁不再使用的实例。
2. 检查日志中是否有 "constructor failed" 或 "out of memory" 信息。
3. 检查设备内存状态。

### 错误码 29200005 / 29210005: 不支持的处理类型

**表现**: 调用 `OH_ImageProcessing_Create()` 或 `OH_VideoProcessing_Create()` 返回 `UNSUPPORTED_PROCESSING`。

**可能原因**:
1. 指定的处理类型（如元数据生成、色彩空间转换）为厂商扩展能力，当前设备不支持。
2. `libvideoprocessingengine_ext.z.so` 不存在，仅支持 DETAIL_ENHANCER 类型。

**排查建议**:
1. 在创建实例前，使用对应的 `IsXXXSupported` 查询函数检查能力是否支持。
2. 检查 `/system/lib64/libvideoprocessingengine_ext.z.so` 是否存在。若不存在，仅 `DETAIL_ENHANCER` 类型可用。

### 错误码 29200008 / 29210008: 实例无效

**表现**: 调用各种处理函数时返回 `INVALID_INSTANCE`。

**可能原因**:
1. 传入的实例指针为空。
2. 实例内部对象已被释放或损坏。
3. 在 CAPI 中 `*imageProcessor` 传入前不为 null（Create 要求初始值为 null）。

**排查建议**:
1. 检查实例是否已成功创建。
2. 确认传入的指针未被提前释放。
3. 确保 Create 调用前 `*imageProcessor` / `*videoProcessor` 已初始化为 null。

---

## 参数问题

### 错误码 401: 参数无效

**表现**: 调用任何 API 返回 `INVALID_PARAMETER`。

**可能原因**:
1. 图像/视频缓冲区指针为空。
2. 参数对象（如 OH_AVFormat）为空。
3. 创建实例时传入的 type 值不存在。

**排查建议**:
1. 检查所有传入指针是否非空。
2. 确认 type 参数使用正确的宏定义（如 `IMAGE_PROCESSING_TYPE_DETAIL_ENHANCER`）。
3. 检查回调对象是否已正确创建。

### 错误码 29200009 / 29210009: 值无效

**表现**: 调用处理函数返回 `INVALID_VALUE`。JS API 的 `enhanceDetail` / `enhanceDetailSync` 抛出 BusinessError 29200009。

**可能原因**:
1. 图像/视频缓冲区宽高过大（图像细节增强范围：32~8192 像素）。
2. 色彩空间不正确或设备不支持。
3. 细节增强档位（QualityLevel）值不正确。
4. 输入 PixelMap 格式不支持（如 P010 格式直接返回原图不做处理）。
5. 对比度增强分辨率不在支持范围内（最小 720x720，最大 20000x20000）。

**排查建议**:
1. 检查输入输出的分辨率是否在有效范围内（细节增强：32~8192）。
2. 检查色彩空间设置是否正确。
3. 确认 QualityLevel 参数值在 0~3 范围内（NONE=0, LOW=1, MEDIUM=2, HIGH=3）。
4. 检查输入图像的像素格式，P010 格式不被支持。

### 错误码 801: 能力不支持 (JS API)

**表现**: JS API 调用 `create()`、`initializeEnvironment()`、`enhanceDetail()`、`enhanceDetailSync()` 抛出 BusinessError 801。

**可能原因**:
1. 当前设备不支持 Video Processing Engine 功能（SysCap: SystemCapability.Multimedia.VideoProcessingEngine）。

**排查建议**:
1. 确认设备支持 `SystemCapability.Multimedia.VideoProcessingEngine` 系统能力。
2. 调用前可通过 `canIUse('SystemCapability.Multimedia.VideoProcessingEngine')` 检查。

---

## 处理失败问题

### 错误码 29200004 / 29210004: 处理失败

**表现**: 调用图像/视频处理函数返回 `PROCESS_FAILED`。JS API 的 `enhanceDetailSync` 抛出 BusinessError 29200004。

**可能原因**:
1. 处理超时，系统负载过高。
2. GPU 计算失败。
3. 内部算法插件（Extension）处理失败（VPE_ALGO_ERR_EXTENSION_PROCESS_FAILED）。
4. 内存拷贝失败。

**排查建议**:
1. 减小系统负载，关闭不必要的后台应用。
2. 查看日志中是否有 GPU 异常。
3. 检查 Extension 插件是否正常加载。

### 错误码 29200001 / 29210001: 未知错误

**表现**: 返回 `ERROR_UNKNOWN`。

**可能原因**:
1. GPU 计算失败（如着色器编译失败、GPU 挂起）。
2. 内存拷贝失败（memcpy 异常）。
3. 内部算法未知错误（VPE_ALGO_ERR_UNKNOWN）。

**排查建议**:
1. 检查资源是否已正确初始化。
2. 检查内存是否有效。
3. 查看 VPE 模块日志获取更多错误信息。

### 错误码 29200007 / 29210007: 内存不足

**表现**: 各种 API 调用返回 `NO_MEMORY`。

**可能原因**:
1. 设备可用内存不足。
2. 图像/视频分辨率过大导致缓冲区分配失败。
3. 实例内部数据结构内存分配失败。

**排查建议**:
1. 减少同时申请的内存。
2. 降低处理的图像/视频分辨率。
3. 及时销毁不再使用的实例释放资源。

---

## 视频处理特有问题

### Surface 配置问题

**表现**: `OH_VideoProcessing_Start()` 返回 `OPERATION_NOT_PERMITTED`。

**可能原因**:
1. 未设置输出 Surface（`SetSurface`）。
2. 未创建输入 Surface（`GetSurface`）。
3. 实例已在运行状态。

**排查建议**:
1. 确保 Start 之前已调用 `SetSurface` 和 `GetSurface`。
2. 确认实例处于 STOPPED 状态才能 Start。

### 回调未注册问题

**表现**: `OH_VideoProcessing_RenderOutputBuffer()` 返回 `OPERATION_NOT_PERMITTED`。

**可能原因**:
1. 未绑定 `OnNewOutputBuffer` 回调。
2. 实例已处于 STOPPED 状态。

**排查建议**:
1. 确保已通过 `OH_VideoProcessingCallback_BindOnNewOutputBuffer` 绑定回调。
2. 确保实例处于 RUNNING 状态。

### 状态机错误

**表现**: `OH_VideoProcessing_Destroy()` 返回 `OPERATION_NOT_PERMITTED`。

**可能原因**:
1. 实例仍在运行状态，未先调用 Stop。

**排查建议**:
1. 按正确顺序操作：Stop -> Destroy。
2. 等待 OnState 回调报告 STOPPED 后再 Destroy。

---

## 内部算法问题

### VPE_ALGO_ERR_EXTENSION_NOT_FOUND: 插件未找到

**可能原因**: Extension Manager 无法找到所需的算法插件（如 Skia 插件）。

**排查建议**:
1. 检查算法插件库是否正确安装。
2. 确认 `extension_manager` 配置是否正确。

### VPE_ALGO_ERR_EXTENSION_INIT_FAILED: 插件初始化失败

**可能原因**: 算法插件加载成功但初始化失败（如 GPU 上下文创建失败）。

**排查建议**:
1. 查看插件初始化日志。
2. 检查 GPU 环境是否正常。

### VPE_ALGO_ERR_INVALID_STATE: 状态不支持

**可能原因**: 在错误的状态下调用算法接口（如未初始化就调用 Process）。

**排查建议**:
1. 确保按正确顺序调用：Create -> SetParameter -> Process。
2. 检查是否有并发调用导致状态混乱。
