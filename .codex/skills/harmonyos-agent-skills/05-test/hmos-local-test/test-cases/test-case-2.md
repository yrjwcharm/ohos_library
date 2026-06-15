# 测试用例 2：运行指定测试套件并禁用覆盖率

## 场景描述
用户希望运行指定测试套件 ActsAbilityTest，不收集覆盖率。

## 前置条件
- 项目路径 `/Users/developer/MyHarmonyApp` 存在且为有效的 HarmonyOS 工程
- entry 模块包含测试套件 ActsAbilityTest
- hvigorw 命令可用

## 执行步骤
1. AI 代理解析用户请求："对 Index.test.ets 中的测试套件 ActsAbilityTest 执行测试，不收集覆盖率"
2. 调用 `scripts/run_local_test.py` 脚本，传入以下参数：
   - `--project-path /Users/developer/MyHarmonyApp`
   - `--module entry`
   - `--scope ActsAbilityTest`
   - `--no-coverage`（显式禁用覆盖率收集）
3. 脚本执行并返回 JSON 格式结果

## 预期结果
- 脚本成功执行，返回的 JSON 中 `success` 字段为 `true`
- `data.modules` 包含 `["entry"]`
- `data.reports.entry` 包含测试结果文件路径
- 不生成覆盖率报告

## 验证方法
- 检查返回的 JSON 结构是否符合规范
- 验证测试结果文件是否存在
- 确认覆盖率报告未生成

## 备注
如果测试套件不存在，脚本应返回相应错误信息。