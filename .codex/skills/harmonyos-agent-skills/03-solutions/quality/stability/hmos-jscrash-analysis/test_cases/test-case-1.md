# 测试用例 1：分析jscrash的faultlog，生成问题分析报告

## 场景描述
用户希望分析jscrash的faultlog，生成问题分析报告。

## 用户输入
标准输入可以为：请使用hmos-jscrash-analysis skill，分析 JS Crash 日志：jscrash.log

## 执行步骤
或者当用户输入包含 "JS Crash"、"ArkTS 崩溃"、"应用闪退"、"ReferenceError"、"TypeError"、"BusinessError"、"OutOfMemoryError"、"Stacktrace"、"HybridStack" 等关键字，或上传包含 Reason、Error message、Error code、Stacktrace 等字段的 faultlogger 日志时，Agent 将自动命中 hmos-jscrash-analysis 技能，并严格按照以下路径执行：

关键信息提取：从日志中提取 Reason、Error name、Error message、Error code、page、Stacktrace、Uid/Pid、故障时间等字段。
故障类型分类：优先使用 Reason 分类；缺失时使用 Error name；两者都缺失时结合 Error message 关键词推断，并标注可信度。
故障模式匹配：读取 references/fault-mode-library.md，按 Reason / Error name / Error message 匹配 JSError 一级、二级、三级根因。
错误模式补充：读取 references/jscrash-patterns.md，补充未覆盖错误的分析结论、触发条件和修复建议。
调用栈分析：优先定位第一个应用栈帧，识别源码文件、行号、列号和触发路径；框架栈仅作为传播路径辅助判断。
根因定界：结合错误信息、错误码、栈顶应用帧和模式库，区分应用代码、三方 SDK、系统框架或证据不足的不确定场景。
报告生成：输出 JS Crash 分析报告，包含故障基本信息、故障模式库匹配表、根因判断、关键证据链、修复建议和需要补充的材料。