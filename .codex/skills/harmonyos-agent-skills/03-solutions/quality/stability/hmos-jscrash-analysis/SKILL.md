---
name: hmos-jscrash-analysis
description: >
  DFX Skills，分析 HarmonyOS/OpenHarmony 应用的 JS Crash（ArkTS/JS 层闪退）faultlogger 日志，
  按 Reason、Error name、Error message、Error code 和 Stacktrace 定位根因并给出修复建议。
  当用户提供包含 JS Crash、Reason:Error/TypeError/SyntaxError/ReferenceError/RangeError/
  BusinessError/OutOfMemoryError/URIError/TerminationError/AggregateError、Error message、
  Stacktrace、HybridStack、faultlogger、Cannot get SourceMap info 等字段的日志，
  或询问 HarmonyOS 应用启动/点击后闪退、ArkTS 崩溃、JS Crash 怎么定位、OOM 闪退原因时，
  必须使用此技能。即使用户只说“帮分析这个 JS Crash 日志”“应用闪退了是什么原因”
  “ArkTS 报错导致崩溃怎么修”，也应立即触发此技能。
metadata:
   author: Huawei Reliability Technology Lab
   version: 1.0.0
---

# JS Crash Analysis

## 目标

系统化分析 HarmonyOS / OpenHarmony 应用 JS Crash 日志，输出基于证据的根因、责任代码位置和应用侧修复建议。分析必须以日志真实字段为依据，不得编造未出现的堆栈、错误码或业务路径。

## 工作流

1. 提取关键信息
   - 如果用户给了文件路径，读取文件内容并提取 `Reason`、`Error name`、`Error message`、`Error code`、`page`、`Stacktrace`、`Uid/Pid`、故障时间。
   - 如果用户直接粘贴日志，手动提取上述关键字段。
   - 保留原始 `Error message` 和最靠前的应用栈帧作为证据。

2. 分类故障类型
   - 以 `Reason` 为第一分类键；缺失时用 `Error name`；两者都缺失时用 `Error message` 关键词推断，并标注可信度降低。
   - 常见类型：`ReferenceError`、`TypeError`、`Error`、`BusinessError`、`SyntaxError`、`RangeError`、`OutOfMemoryError`、`URIError`、`TerminationError`、`AggregateError`。

3. 匹配错误模式
   - 优先读取 `references/fault-mode-library.md`，按 `Reason` / `Error name` / `Error message` 匹配 JSError 三级根因。
   - 再读取 `references/jscrash-patterns.md`，补充未覆盖错误的根因解释与修复建议。
   - 多个模式命中时，优先选择与完整 `Error message`、`Error code` 和栈顶应用帧同时吻合的模式。
   - 不要只凭 Reason 下结论；同一个 Reason 下有多种完全不同根因。
   - 最终报告必须输出“故障模式库匹配”表，字段与 `references/fault-mode-library.md` 对齐：一级根因、二级根因、三级根因、Error message 模式、匹配依据。

4. 分析堆栈
   - 优先定位第一个应用栈帧，例如 `entry|entry|...|src/main/ets/...:line:column` 或 `entry/src/main/ets/...:line:column`。
   - 框架栈（如 `stateMgmt.js`、`json_js.js`、`js_url.js`、`js_uri.js`）只用于判断触发框架，不作为应用根因。
   - 如果日志提示 `Cannot get SourceMap info, dump raw stack`，说明没有还原源码映射；仍要使用 raw stack 中的应用路径、行号和调用链。

5. 形成根因
   - 说明触发路径：哪个接口/组件/变量/参数/资源/文件/URL/递归/内存分配触发了异常。
   - 区分“应用未捕获异常导致进程崩溃”和“框架主动抛出明确错误”。大多数 JS Crash 的修复都在应用侧。
   - 对 `OutOfMemoryError`，判断堆栈是否稳定：稳定堆栈偏向高频调用或泄漏路径；不稳定堆栈需通过 Snapshot 对比泄漏对象。已上架应用市场的应用通常不能使用 Snapshot 分析模板。

## 输出格式要求

分析完成后，参考 `cppcrash-analysis` 的结构输出结论，并强制呈现故障模式库的三级根因匹配结果：

```text
## JS Crash 分析报告

### 分析结论摘要
- 根因模块：<责任领域归属：三方应用 / 系统框架 / 三方 SDK / 不确定>
<责任模块名称，例如：entry / appentry / @xxx/network / @xxx/push / ArkUI / Web / RDB / Camera / Window / ResourceManager>
注意：
（1）必须基于故障根本原因输出定界结果。若根因明确是应用入参、状态、生命周期、资源、URL、SQL、递归或异常未捕获问题，责任模块应划分给应用或三方 SDK。
（2）框架栈如 stateMgmt.js、json_js.js、js_url.js、js_uri.js 只表示抛错框架，不等同于系统根因；需要结合第一个应用栈帧判断责任代码。
（3）如果缺少 SourceMap 或业务代码，只能初步定界时，要明确写出“不确定”及缺失证据。
- 根因总结：...

### 故障基本信息
- 故障时间：<Timestamp / Fault time，若有>
- 故障进程：<Module name / processName>
- PID / UID：<pid / uid>
- 应用版本：<Version / VersionCode，若有>
- 故障类型：<Reason / Error name>
- 错误信息：<Error message 原文>
- 错误码：<Error code，若有>
- 页面/Ability：<page 或日志中的页面信息，若有>
- 栈顶应用帧：<第一个应用栈帧>
- 源码位置：<文件:行:列，若日志可见>

### 故障模式库匹配
| 层级 | 根因 | 匹配依据 |
| --- | --- | --- |
| 一级根因 | `JSError` | appevent / errorManager / faultlogger 上报 ArkTS 异常崩溃 |
| 二级根因 | <fault-mode-library.md 中的二级根因，如 Error / TypeError / ReferenceError / URIError / OutOfMemoryError / TerminationError / AggregateError> | <Reason / Error name 原文> |
| 三级根因 | <fault-mode-library.md 中命中的三级根因；若仅命中二级，写“未收录子类”> | <Error message 模式，例如 `DecodeURI: invalid character: <string>`；若未命中，写实际 Error message 与兜底原因> |

匹配说明：
- 若 `fault-mode-library.md` 精确命中三级根因，必须输出命中的 `Error message 模式` 和 `三级根因`。
- 若只命中二级根因，三级根因写“未收录子类”，并在“根因判断”中结合 `references/jscrash-patterns.md` 与堆栈继续定性。
- 若 `fault-mode-library.md` 与 `jscrash-patterns.md` 结论不同，优先以日志中 `Error message + Error code + 栈顶应用帧` 同时支持的结论为准，并说明取舍依据。

### 根因判断
- **类别**：<二级根因类型>
- **触发点**：<文件:行:列 处的具体调用 / 变量 / 参数 / 组件 / 资源 / URL / SQL / 递归 / 内存分配>
- **直接原因**：<导致 JS Crash 的直接错误，例如空对象属性访问、非法参数、未捕获业务异常、JSON 非法、递归栈溢出、OOM 等>
- **根本原因**：<状态管理、生命周期、接口契约、输入校验、异常处理、资源管理或内存管理层面的深层原因>

### 关键证据链
1. 日志字段：<Reason / Error name / Error message / Error code 原文>
2. 故障模式库证据：<一级根因 -> 二级根因 -> 三级根因，必须与上方“故障模式库匹配”一致>
3. 调用栈证据：<栈顶应用帧及关键上游帧；系统/框架帧只作为传播路径>
4. HybridStack / Native 桥接证据（如有）：<NAPI、libfs、libark_jsruntime 等关键帧及其意义>
5. 源码行号（如有）：<文件:行:列>

### 修复建议
1. <围绕三级根因给出应用侧或 SDK 侧直接修复建议>
2. <补充输入校验、try-catch、生命周期/状态检查、资源路径检查、URL/JSON/SQL 校验、内存释放等>
3. <如果只能初步定界，说明需要补充什么源码或映射才能闭环>
```

## 资源

- `references/jscrash-patterns.md`: JS Crash 错误模式、分析结论和修复建议矩阵。
- `references/fault-mode-library.md`: JSError 一级/二级/三级根因库，用于在报告中输出故障模式匹配结果。
