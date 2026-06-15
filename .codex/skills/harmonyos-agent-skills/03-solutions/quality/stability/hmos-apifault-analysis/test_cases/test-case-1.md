# 测试用例 1：分析apifault的faultlog，生成问题分析报告

## 场景描述
用户希望分析apifault的faultlog，生成问题分析报告。

## 用户输入
请使用hmos-apifault-analysis 分析故障日志：xx.log，问题描述：xx

## 执行步骤
线索提取与模块识别：从日志或问题描述中提取错误码、事件名、DOMAIN、调用栈（含 .so 库名）、API 名称、hilog domain_id 等线索，读取 references/module_mapping.md 匹配涉及的模块。
分诊查询：读取 references/knowledge/{module_name}/ 下的知识库文件（error_codes.json、api_chain.json、common_issues.md），按错误码精确匹配、API 调用链匹配、常见问题模式匹配；查询官方文档中的错误码说明和相关 API 用法；评估诊断置信度。
深潜分析（低置信度时执行）：按 API 调用链追踪代码实现，搜索代码仓错误头文件获取错误码定义，分析项目源码的 API 调用时序与权限声明，交叉验证多来源证据，并追溯根因至应用侧具体操作行为。
分析与修复建议（可选）：扫描源码文件，定位问题相关源码，检查权限声明、API 调用时序和语法问题，生成具体可操作的代码修改建议。
报告生成：输出结构化问题诊断报告，包含问题摘要、线索提取、知识库匹配、根因分析（含证据链和置信度）、修复建议及参考文档。
