# JS Crash 错误模式矩阵

本文件为 JS Crash 定位用摘要矩阵。

## 背景

- JS Crash 通常在 `Reason` 字段中分类：`Error`、`TypeError`、`SyntaxError`、`ReferenceError`、`RangeError` 等。
- `BusinessError` 多为业务错误或系统接口错误被应用代码主动抛出或透传。
- OOM 表示堆内存不足；Heap 内不同空间达到上限后再次分配可能触发 `OutOfMemoryError`。
- `@Provide` / `@Consume` 用于父组件与后代组件双向数据同步，变量名或别名必须正确匹配。

## ReferenceError

| Error message 关键词 | 分析结论 | 修改建议 |
| --- | --- | --- |
| `missing @Provide property` / `Fail to resolve @Consume` | 初始化 `@Consume` 变量时，没有定义对应名称的 `@Provide` 变量。 | 检查变量是否存在；若存在，在父组件中定义并赋值对应 `@Provide`。 |
| `duplicate @Provide property` / `@Provide override not allowed` | 同名 `@Provide` 属性在祖先组件中已存在，不允许重复提供或覆盖。 | 删除重复 `@Provide`，或更改变量名/别名，避免祖先链路冲突。 |
| `is not initialized` | 变量未初始化即被访问。 | 初始化对应变量，或在使用前增加空值/状态校验。 |

## TypeError

| Error message 关键词 | 分析结论 | 修改建议 |
| --- | --- | --- |
| `Cannot read property` + `undefined/null` / `Cannot load property of null or undefined` | 变量不是预期对象，不能访问目标属性。 | 使用变量前校验对象存在，并检查接口返回、异步时序和默认值。 |
| `is not callable` | 变量或 `this` 不是预期函数对象，不能调用目标方法。 | 检查方法是否存在、`this` 绑定是否正确、对象类型是否符合预期。 |
| `Receiver is not a JSObject` | 传入值不是有效 JavaScript 对象。 | 校验传入对象类型和结构，必要时在边界处做严格数据校验。 |
| `Can not get Prototype on non ECMA Object` | `napi_value` 的使用范围可能超出 `napi_handle_scope` 作用域。 | 检查 N-API handle scope 的打开、关闭和 `napi_value` 生命周期。 |
| `Cannot convert a illegal value to a Primitive` | 非法值无法转换为原始类型。 | 确保对象正确实现 `valueOf()` 或 `toString()`，且返回有效原始值。 |
| `stack contains value` / `circular structure` | 对象存在循环引用，常在 `JSON.stringify` 或深拷贝时触发。 | 使用 `WeakSet` 检测并过滤循环引用，或重构数据结构避免环。 |

## Error

| Error message 关键词 | 分析结论 | 修改建议 |
| --- | --- | --- |
| 应用自定义错误，如 `ApiError ...` | 应用业务代码主动抛出异常且未处理，导致闪退。 | 避免异常路径直达进程边界；使用 `try-catch` 捕获并转为可恢复状态或错误提示。 |
| `Invalid parameter` / `The parameter invalid` / `Invalid argument` | 非法参数触发异常，通常需结合栈顶代码确认具体入参。 | 修正参数类型、范围和必填项；调用前做输入校验。 |
| `No such file or directory` | 目录或文件不存在。 | 检查路径、权限、解压/下载时序；用 `try-catch` 处理缺失文件。 |
| `WebviewController must be associated with a Web component` / `17100001` | `WebviewController` 尚未和具体 Web 组件关联。 | 检查关联时序，可通过 `onControllerAttached()` 确认后再操作。 |
| `Invalid url` / `17100002` | URL 无效，或 URL 长度超过限制。 | 校验 URL 格式、协议、编码和长度，避免传入空值或超长值。 |
| `ForEach id` + `Need to specify id generator function` | 提供的数据结构不能被默认键值生成函数处理。 | 确保数据可被默认 key 生成函数序列化，或显式传入 `ForEach` 第三个参数作为自定义 key 生成函数。 |
| `SQLite: Generic error` / `14800021` | SQL 执行过程中出现通用错误。 | 分析并修正 SQL 语句、表结构、参数绑定和事务状态。 |
| `Column out of bounds` / `14800013` | 当前列号超出 `[0, columnCount - 1]`，或列值/列类型与接口不兼容。 | 检查 ResultSet 当前列号、列名、列数量和查询结果。 |
| `Invalid resource ID` | 传入资源 ID 不存在或不适用于当前包形态。 | 排查 HAR 开启混淆、中间码 HAR、字节码 HAR、跨 HAP/HSP 包等场景；优先通过资源名称方法如 `getStringByName()` 获取资源。 |
| `UI execution context not found` / `100001` | 在上下文不明确处使用全局 Router 等 UI 上下文相关能力。 | 推荐使用 `Navigation` 作为路由框架；或通过 `UIContext.getRouter()` 获取当前上下文关联的 Router。 |
| `Session not config` | 在会话未配置前调用需要会话配置的操作。 | 先调用对应 `commitConfig` 等配置接口，再执行后续操作。 |
| `This window state is abnormal` | 目标窗口未创建或已被销毁。 | 操作窗口前检查窗口存在且状态正常。 |
| `Already closed` / `14800014` | 数据库或 ResultSet 已关闭。 | 重新打开 `RdbStore` 或重新查询获取 `ResultSet`，确保对象未 `close`。 |
| `Invalid relative path` | 传入相对路径不符合预期。 | 校验相对路径格式、根目录和调用接口要求。 |
| `Service exception` + `invalid N-API status` | 服务或 N-API 调用状态异常，文档示例指向 motion 接口调用逻辑问题。 | 检查相关接口的参数、调用时序，尤其是 `on` / `off` 配对和状态管理。 |

## BusinessError

| Error message 关键词 | 分析结论 | 修改建议 |
| --- | --- | --- |
| `Unexpected Text in JSON` + `SyntaxError` | 应用捕获 JSON `SyntaxError` 后通过 `BusinessError` 抛出，未处理导致闪退。 | 结合栈顶代码定位异常抛出位置；解析 JSON 前校验格式，并在抛出点捕获处理。 |
| `Parameter error` | 参数类型或取值错误，未处理导致闪退。 | 对照接口文档传入正确参数类型和范围；在调用前校验。 |
| `unterminated entity ref` | XML/HTML 中特殊字符未正确转义。 | 检查解析文本中的特殊字符，例如 `&` 需要正确转义为 `&amp;`。 |
| `Syntax Error. Invalid Url string` / `10200002` | URL 字符串格式非法。 | 检查 URL 格式是否符合 `parseURL` 等接口要求。 |
| `Syntax Error. Invalid Uri string` / `10200002` | URI 字符串非法，例如 path 不符合规则或 `#` 位于首字符。 | 检查 URI 格式、路径、片段和编码，按 `@ohos.uri` 规范构造。 |

## SyntaxError

| Error message 关键词 | 分析结论 | 修改建议 |
| --- | --- | --- |
| `Unexpected Text in JSON` / `Invalid Token` | 字符串格式不符合 JSON 语法，常在 `JSON.parse` 时触发。 | 解析前检查内容是否为有效 JSON，避免解析非 JSON 数据或包含非法字符的数据。 |

## RangeError

| Error message 关键词 | 分析结论 | 修改建议 |
| --- | --- | --- |
| `Invalid array length` | 数组长度为负数或超长。 | 检查长度计算逻辑，限制数组长度范围。 |
| `Stack overflow` | 函数递归调用导致栈空间溢出。 | 检查递归终止条件；必要时改写为循环形式。 |

## OutOfMemoryError

| Error message 关键词 | 分析结论 | 修改建议 |
| --- | --- | --- |
| `OutOfMemory when trying to allocate` | 应用分配内存时超过 Heap 空间上限；手机设备主线程 OldSpaceSize 上限通常接近 350MB。 | 如果 OOM 堆栈稳定，优先分析高频调用和潜在泄漏路径；如果堆栈不稳定，通过 Snapshot 对比操作前后的内存快照定位泄漏对象。 |
| `AllocateHugeObject` | 尝试分配大对象时超过大对象空间阈值。 | 检查大数组、大字符串、大图片/缓存等一次性分配，拆分或释放不必要对象。 |
| `AllocateYoungOrHugeObject` | 年轻代或大对象空间分配失败，即使小对象也可能因堆空间耗尽失败。 | 排查生命周期过长对象、列表复用、缓存释放、组件销毁释放和闭包持有。 |

## URIError

| Error message 关键词 | 分析结论 | 修改建议 |
| --- | --- | --- |
| `DecodeURI: invalid character` | URL 无效，`DecodeURI` 抛出异常导致闪退。 | 确保 URL 真实有效、编码合法；使用 `try-catch` 捕获并处理异常。 |

## 可信度规则

- HIGH：`Reason`、完整 `Error message`、`Error code`（如有）和栈顶应用帧均支持同一模式。
- MEDIUM：缺少错误码或栈帧，但 `Reason` 和 `Error message` 明确命中模式。
- LOW：只有片段化日志，或需要结合业务代码/SourceMap 才能确认。
