# 测试用例 2：运行指定测试套件并启用 ASan 检测

## 场景描述
用户希望运行指定测试套件 ActsAbilityTest，并启用 Address Sanitizer（ASan）检测（适用于 C++ 测试）。

## 前置条件
- 项目路径 `/Users/developer/MyHarmonyApp` 存在且为有效的 HarmonyOS 工程
- entry 模块包含测试套件 ActsAbilityTest
- C++ 测试支持 ASan 检测
- hvigorw 命令可用

## 执行步骤
1. AI 代理解析用户请求："运行 entry 模块的 ActsAbilityTest 测试套件，启用 ASan 检测"
2. 调用 `scripts/run_instrument_test.py` 脚本，传入以下参数：
   - `--project-path /Users/developer/MyHarmonyApp`
   - `--module entry`
   - `--scope ActsAbilityTest`
   - `--asan`（启用 ASan 检测）
   - `--no-coverage`（默认启用覆盖率，此处显式禁用）
3. 脚本执行并返回 JSON 格式结果

## 预期结果
- 脚本成功执行，返回的 JSON 中 `success` 字段为 `true`
- `data.modules` 包含 `["entry"]`
- `data.reports.entry` 包含测试结果文件路径
- ASan 检测在 C++ 测试中生效（如有内存错误会报告）
- 不生成覆盖率报告

## 验证方法
- 检查返回的 JSON 结构是否符合规范
- 验证测试结果文件是否存在
- 确认 ASan 检测是否启用（可通过日志查看）

## 备注
如果测试套件不存在或模块不支持 C++ 测试，脚本应返回相应错误信息。