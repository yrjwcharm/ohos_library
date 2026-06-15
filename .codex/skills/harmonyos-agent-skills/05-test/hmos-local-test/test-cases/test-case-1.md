# 测试用例 1：运行 entry 模块所有本地测试并生成覆盖率报告

## 场景描述
用户希望运行 entry 模块的所有本地测试（ArkTS/JS 单元测试）并生成覆盖率报告。

## 前置条件
- 项目路径 `/Users/developer/MyHarmonyApp` 存在且为有效的 HarmonyOS 工程
- entry 模块包含 local test 用例（ArkTS/JS 单元测试）
- hvigorw 命令可用

## 执行步骤
1. AI 代理解析用户请求："运行 entry 模块的所有本地测试用例并生成覆盖率报告"
2. 调用 `scripts/run_local_test.py` 脚本，传入以下参数：
   - `--project-path /Users/developer/MyHarmonyApp`
   - `--module entry`
   - `--coverage`（启用覆盖率收集）
3. 脚本执行并返回 JSON 格式结果

## 预期结果
- 脚本成功执行，返回的 JSON 中 `success` 字段为 `true`
- `data.modules` 包含 `["entry"]`
- `data.reports.entry` 包含测试结果文件和覆盖率报告路径
- 测试结果文件 `test_result.txt` 存在且包含测试通过/失败信息
- 覆盖率报告（HTML 和 JSON）生成

## 验证方法
- 检查返回的 JSON 结构是否符合规范
- 验证报告文件路径是否存在
- 确认覆盖率数据是否生成

## 备注
如果项目路径无效或 hvigorw 不可用，脚本应返回错误信息。