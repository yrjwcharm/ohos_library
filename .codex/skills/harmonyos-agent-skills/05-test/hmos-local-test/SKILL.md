---
name: hmos-local-test
description: 在 HarmonyOS 应用/服务开发中执行模块的 Local Test（ArkTS/JS 单元测试），支持运行、覆盖率统计等模式，并可指定测试范围（模块、测试套件、单个用例）。
---

## 参考文档
本技能涉及的操作细节可参考以下文档（位于 `references/` 文件夹内）：
- `references/local_test_doc.md`：包含 HarmonyOS Local Test 的完整使用指南，包括测试用例创建、运行模式（普通/调试/覆盖率）、命令行执行等详细说明。

## 使用场景
- AI 代理根据用户需求（如“运行 entry 模块的所有测试用例”或“对 Index.test.ets 中的测试套件 ActsAbilityTest 执行覆盖率统计”）自动调用该技能。
- 持续集成/自动化测试流水线中集成。

## 测试文件到参数的推断

当用户指定一个或多个测试文件（如 `Index.test.ets`）为测试范围时，需按以下规则推断 `--module` 和 `--scope` 参数。

### 推断 module

从测试文件路径中提取模块名。Local Test 的测试文件位于 `<module>/test/` 目录下，`test` 的父目录即为模块名。

例如：
- `entry/test/Index.test.ets` → module = `entry`
- `feature/test/Login.test.ets` → module = `feature`

### 推断 scope

**必须**读取测试文件内容，提取 `describe()` 声明的套件名和 `it()` 声明的方法名。scope 的格式为：

- 套件级：`{suiteName}`（如 `ActsAbilityTest`）
- 方法级：`{suiteName}#{methodName}`（如 `ActsAbilityTest#testMethod`）
- 多个值用逗号分隔

推断规则：
- 用户仅指定文件 → 提取文件中**所有** `describe()` 的套件名，传 `--scope Suite1,Suite2`
- 用户指定套件 → 传 `--scope SuiteName`
- 用户指定方法 → 传 `--scope SuiteName#methodName`

> ⚠️ **关键规则：当用户指定具体测试文件时，必须同时传入 `--module` 和 `--scope`。**
> 仅传 `--module` 而不传 `--scope` 会导致该模块下**所有**测试被执行，这不符合用户指定单个文件的意图。

## 技能入口
调用 `scripts/run_local_test.py` 脚本，传入以下命令行参数。

### 命令行参数

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| `--project-path` | string | 是 | - | 工程根目录绝对路径 |
| `--module` | string | 否 | None | 测试模块名，如 `entry`。缺省时执行所有模块。多个用逗号分隔 |
| `--coverage` / `--no-coverage` | flag | 否 | `--coverage`（启用） | `--coverage` 启用覆盖率收集；`--no-coverage` 禁用 |
| `--scope` | string | 否 | None | 测试套级和函数级测试范围，格式：`{suiteName}#{methodName}` 或 `{suiteName}`，多个用逗号分隔 |
| `--timeout` | integer | 否 | 300 | 命令执行超时时间（秒） |

> **注意：Local Test 不支持 ASan 检测**，如需对 C++ 代码进行 Address Sanitizer 检测，请使用 `hmos-instrument-test` 技能并指定 `--asan` 参数。

> **重要规则：非必填参数的处理**
> - 仅当用户明确指定了某非必填参数的值时，才在调用脚本时传入该参数。
> - 若用户未提及某非必填参数，**不要**传入该参数，脚本将自动使用其默认值。
> - 例：用户只说"运行测试"，则只传 `--project-path`，不传 `--module`、`--coverage`、`--scope`、`--timeout`。

### 输出结果（JSON 格式）

脚本执行后会将结果以 JSON 格式输出到标准输出。输出包含执行状态、消息以及详细的测试报告信息。

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| success | boolean | 是 | 执行是否成功 |
| message | string | 是 | 简要的结果消息 |
| data | object | 否 | 成功时存在，包含测试结果详情 |
| error | object | 否 | 失败时存在，包含错误详情 |

#### data 对象（成功时）

| 字段 | 类型 | 说明 |
|------|------|------|
| modules | array of string | 全部预期的测试模块列表 |
| reports | object | 各模块的测试报告信息，键为模块名，值为报告对象 |
| collected_modules | array of string | 实际收集到输出结果的模块列表（存在 `.test/default` 目录**且** `test_result_file` 不为空） |
| missing_modules | array of string | 预期执行但未收集到的模块列表（无输出目录或 `test_result_file` 为空）。空表示全部收集成功 |

> **partial 标志**：当 `data.missing_modules` 不为空时，顶层会额外包含 `"partial": true` 字段，`message` 会说明收集完整度（如 `2/3 modules collected. Missing: feature.`）。`success` 仍为 `true`，因为测试执行本身成功（hvigorw 退出码 0），仅结果收集不完整。**注意：模块即使有 `.test/default` 目录，若 `test_result_file` 缺失也会被视为未收集。**

##### reports 对象（每个模块）

| 字段 | 类型 | 说明 |
|------|------|------|
| test_result_file | string \| null | 测试结果文件路径（`test_result.txt`），始终返回。文件不存在时为 `null` |
| coverage_html | string \| null | ArkTS 覆盖率 HTML 报告路径，仅在启用 `--coverage`（默认）时返回。文件不存在时为 `null` |
| coverage_json | string \| null | ArkTS 覆盖率 JSON 报告路径，仅在启用 `--coverage`（默认）时返回。文件不存在时为 `null` |

#### error 对象（失败时）

| 字段 | 类型 | 说明 |
|------|------|------|
| type | string | 异常类型名称（如 `ValueError`、`RuntimeError`） |
| message | string | 错误描述 |
| details | object | 附加的调试信息，如 `traceback` 堆栈信息 |

## 输出范式

AI 代理执行脚本后，应解析 JSON 输出并按以下格式向用户呈现结果。

### 成功时

```
📊 Local Test 执行报告
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ 状态：{message}
📦 预期模块：{module1, module2, ...}

📁 {模块名}
  📄 测试结果：{test_result_file}
  📊 ArkTS 覆盖率 HTML：{coverage_html，无则省略此行}
  📊 ArkTS 覆盖率 JSON：{coverage_json，无则省略此行}

📁 {另一个模块...}
  ...
```

### 部分收集时（data.missing_modules 非空）

```
📊 Local Test 执行报告
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ 状态：{message}
📦 预期模块：{module1, module2, ...}
📥 已收集：{collected_modules}
❌ 缺失：{missing_modules}

📁 {已收集的同名模块}
  📄 测试结果：{test_result_file}
  ...
```

### 失败时

```
📊 Local Test 执行报告
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ 状态：{message}
🔴 错误类型：{error.type}
📝 详情：{error.message}
```

> **规则**：
> - 仅在字段存在且非 `null` 时才展示对应行
> - 失败时简要展示 `error.type` 和 `error.message`，避免展开完整 traceback

### 示例调用
#### 1. 运行 entry 模块所有测试并生成覆盖率报告
```bash
python scripts/run_local_test.py --project-path /Users/developer/MyHarmonyApp --module entry --coverage
```

#### 2. 运行指定测试套件，禁用覆盖率
```bash
python scripts/run_local_test.py --project-path /Users/developer/MyHarmonyApp --module entry --no-coverage --scope ActsAbilityTest
```

#### 3. 运行多个模块，指定超时时间
```bash
python scripts/run_local_test.py --project-path /Users/developer/MyHarmonyApp --module entry,feature --timeout 600
```

#### 4. 运行单个测试用例
```bash
python scripts/run_local_test.py --project-path /Users/developer/MyHarmonyApp --module entry --scope ActsAbilityTest#testMethod
```