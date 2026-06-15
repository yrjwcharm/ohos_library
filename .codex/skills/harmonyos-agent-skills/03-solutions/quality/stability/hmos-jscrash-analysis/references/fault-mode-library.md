# JSError 故障模式库

本库用于 JS Crash / ArkTS 异常崩溃的三级根因匹配。输入来源是 appevent、errorManager 或 faultlogger 中的 `Reason`、`Error name`、`Error message`、`Error code`、`Stacktrace`、`HybridStack` 等字段。

## 匹配规则

1. 优先用 `Reason` 或 `Error name` 匹配二级根因。
2. 再用 `Error message` 做三级根因匹配；带 `<name>`、`<string>`、`<size>`、`<heap-type>` 的条目按通配模板匹配。
3. 如果 `Error message` 只命中二级根因，三级根因输出为“未收录子类”，并继续结合调用栈判断责任代码。
4. `Stacktrace` / `HybridStack` 用于确认调用来源和责任模块；不能只凭错误类型定界。

## 一级根因

| 一级根因 | 说明 |
| --- | --- |
| `JSError` | appevent、errorManager 上报的 ArkTS 异常导致应用异常崩溃。 |

## 二级根因索引

| 二级根因 | 说明 |
| --- | --- |
| `ReferenceError` | 引用错误。 |
| `URIError` | 无效 URL / URI 相关错误。 |
| `Error` | 自定义 Error 或 builtins 错误。 |
| `OutOfMemoryError` | ArkTS 虚拟机堆内存不足。 |
| `TerminationError` | 终止错误，通常由于进程或虚拟机执行被强制终止。 |
| `AggregateError` | 多个错误对象被包装为一个错误。 |

## 三级根因库

| 一级根因 | 二级根因 | Error message 模式 | 三级根因 | 分析要点 / 修复方向 |
| --- | --- | --- | --- | --- |
| `JSError` | `ReferenceError` | `undefinedsub-class must call super before use 'this'` | 子类构造函数中使用 `this` 之前未调用 `super()`。 | 检查继承类构造函数，确保访问 `this` 或实例成员前先调用一次 `super()`。 |
| `JSError` | `ReferenceError` | `super() forbidden re-bind 'this'` | 子类构造函数中多次调用 `super()`。 | 检查构造函数分支，保证 `super()` 只调用一次，避免条件分支重复调用。 |
| `JSError` | `ReferenceError` | `<name> is not defined` | 尝试访问未定义变量。 | 根据 `<name>` 和栈顶应用帧检查变量声明、作用域、导入导出、条件编译或初始化时序。 |
| `JSError` | `URIError` | `DecodeURI: invalid character: <string>` | URI 解码异常。 | 检查传入 `DecodeURI` / URI 解析接口的字符串是否真实有效、编码合法；对外部输入加校验并用 `try-catch` 兜底。 |
| `JSError` | `Error` | `The underlying ArrayBuffer is null or detached.` | `ArrayBuffer` 被分离或释放后继续使用。 | 检查 ArrayBuffer 生命周期、跨线程/转移后访问、Native/JS 边界对象释放时序；使用前确认 buffer 未 detached。 |
| `JSError` | `Error` | `The ArkTS Map's constructor cannot be directly invoked.` | 不可直接调用 ArkTS `Map` 构造函数。 | 检查是否以错误方式直接调用构造函数；按 ArkTS 语法使用 `new Map()` 或正确集合初始化方式。 |
| `JSError` | `OutOfMemoryError` | `OutOfMemory when trying to allocate <size> bytes function name: <name>, <heap-type> oom, total size <size> bytes, used size <size> bytes` | ArkTS 虚拟机堆内存不足，产生 OOM 异常。 | 结合分配函数、申请大小、堆类型和堆栈判断高频分配或泄漏路径；稳定堆栈看具体代码，不稳定堆栈用 Snapshot / heapsnapshot 对比泄漏对象。 |
| `JSError` | `TerminationError` | `Terminate execution!` | 虚拟机被强制终止执行。 | 通过 faultlogger 中的 `Stacktrace` 或 `HybridStack` 查看调用来源，定位是谁触发终止和终止前的业务状态。 |
| `JSError` | `AggregateError` | `None` | `PromiseAny()` 中所有 promise 均 reject 时产生 `AggregateError`。 | 此类 Error 通常不会产生 FaultLog 文件；开发者应从 `AggregateError.errors` 取出所有异常并做自定义处理。 |

## 输出要求

命中本库时，在报告的“关键证据链”中补充：

```text
错误模式匹配：JSError -> <二级根因> -> <Error message 模式>
三级根因：<三级根因说明>
```

如果只命中二级根因，输出：

```text
错误模式匹配：JSError -> <二级根因> -> 未收录子类
三级根因：需结合 Error message 与栈顶应用帧继续判断
```
