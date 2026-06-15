---
name: deveco-studio-codelinter
description: 对 HarmonyOS（鸿蒙）项目运行 DevEco Studio CodeLinter 静态代码检查，解读检查结果并提供修复建议。支持 ArkTS、TS、JS 文件，涵盖性能、安全、代码规范、正确性、跨设备适配、API 兼容性等规则集。当用户提到 codelinter、code linting、鸿蒙代码检查、鸿蒙应用质量、HarmonyOS 代码质量检查、静态代码分析、规范扫描、性能检查、安全扫描、代码审查、规则检查、lint 报告时使用。
license: MIT
metadata:
  author: harmonyos-dev-skills
  version: "1.0.0"
---

# HarmonyOS CodeLinter 代码检查

## 工作流程

### Step 0: 确认检查范围

**先询问用户需要检查哪些规则集**（可多选），然后再执行后续步骤。

| 规则集前缀 | 检查内容 | 典型使用场景 |
|-----------|---------|------------|
| `@typescript-eslint` | ArkTS/TS 语法与类型安全 | 所有项目必选 |
| `@hw-stylistic` | 代码风格（缩进、命名、行长等） | 代码规范审查 |
| `@performance` | 性能优化（懒加载、状态变量、渲染优化等） | 性能调优 |
| `@security` | 加密算法安全（AES/RSA/Hash 等） | 安全审计 |
| `@correctness` | 行为正确性（音频打断、网络切换等） | 功能正确性验证 |
| `@cross-device-app-dev` | 跨设备适配（布局、字体、断点等） | 多设备支持 |
| `@compatibility` | API 兼容性（版本兼容检查） | SDK 版本升级 |
| `@previewer` | Previewer 组件装饰器规则 | UI 预览调试 |

每个规则集可选粒度：
- **`recommended`**：推荐规则子集，告警量适中，适合日常开发
- **`all`**：全量规则，适合严格审查（告警量较大）

---

### Step 1: 生成检查配置文件

根据用户选择，在项目根目录生成或更新 `codelinter.json5`（默认配置文件名）：

```json
{
  "files": ["**/*.ets", "**/*.ts", "**/*.js"],
  "ignore": ["**/oh_modules/**", "**/build/**", "**/.preview/**", "**/node_modules/**"],
  "ruleSet": [
    "plugin:@typescript-eslint/recommended",
    "plugin:@performance/recommended"
  ],
  "rules": {}
}
```

**关键字段说明**：
- `files`：检查范围，使用 glob 模式
- `ignore`：排除目录，`oh_modules` 和 `build` 必须排除
- `ruleSet`：选中的规则集列表
- `rules`：在规则集基础上覆盖或新增单条规则（可选）
- `overrides`：对特定路径使用不同规则（可选，见 [配置示例](references/config-examples.md)）

> 完整配置字段与规则列表见 [配置示例](references/config-examples.md)

---

### Step 2: 运行 CodeLinter

命令格式：`node <codelinter入口> [options] [dir]`，`dir` 为工程根目录，不指定时默认为当前目录。

**2a. 先自动探测 DevEco Studio 安装路径**

运行以下脚本探测，找到后记录 `CODELINTER` 路径，后续命令直接使用：

```bash
# macOS：探测标准安装位置
ls /Applications/DevEco-Studio.app/Contents/plugins/codelinter/run/index.js 2>/dev/null \
  && echo "CODELINTER=/Applications/DevEco-Studio.app/Contents/plugins/codelinter/run/index.js"
```

```powershell
# Windows PowerShell：探测常见安装位置
$candidates = @(
  "$env:LOCALAPPDATA\Huawei\DevEco Studio\plugins\codelinter\run\index.js",
  "C:\Program Files\Huawei\DevEco Studio\plugins\codelinter\run\index.js",
  "C:\Program Files (x86)\Huawei\DevEco Studio\plugins\codelinter\run\index.js"
)
$found = $candidates | Where-Object { Test-Path $_ } | Select-Object -First 1
if ($found) { Write-Host "CODELINTER=$found" } else { Write-Host "未找到，请手动指定" }
```

**探测失败时**：直接问用户 DevEco Studio 的安装目录，然后拼接 `<安装目录>/plugins/codelinter/run/index.js`。

---

**2b. 执行检查**

探测到路径后，将 `<CODELINTER>` 替换为实际路径：

```bash
# 基本检查（使用项目根目录下的 code-linter.json5）
node <CODELINTER> /path/to/project

# 指定配置文件，JSON 格式输出到文件
node <CODELINTER> -c /path/to/project/code-linter.json5 -f json -o /tmp/lint-result.json /path/to/project

# 仅检查 Git 增量文件（CI 场景常用）
node <CODELINTER> -i /path/to/project

# 检查并自动执行 QuickFix
node <CODELINTER> --fix /path/to/project

# 多 product 工程，指定 product
node <CODELINTER> -p default /path/to/project
```

**完整命令行参数**：

| 参数 | 说明 |
|------|------|
| `[dir]` | 待检查的工程根目录（不指定则用当前目录） |
| `-c/--config <filepath>` | 指定配置文件（默认读取工程根目录下的 `code-linter.json5`） |
| `--fix` | 检查的同时执行 QuickFix 自动修复 |
| `-f/--format <format>` | 输出格式：`default`（文本）/ `json` / `xml` / `html` |
| `-o/--output <filepath>` | 将结果保存到文件（控制台不显示） |
| `-i/--incremental` | 仅检查 Git 增量文件（新增/修改/重命名） |
| `-p/--product <productName>` | 指定生效的 product（多 product 工程时使用） |
| `-e/--exit-on <levels>` | 指定哪些级别返回非零退出码，多个用逗号分隔（如 `error,warn`） |
| `-v/--version` | 查看 codelinter 版本 |
| `-h/--help` | 查看帮助 |

**`--exit-on` 退出码说明**：

退出码为 3 位二进制（高→低：error/warn/suggestion）转十进制，仅配置了且结果中存在该级别时对应位为 1：

| 配置 | 结果包含 | 退出码 |
|------|---------|--------|
| `--exit-on error` | error、warn、suggestion | `4`（100₂） |
| `--exit-on error,warn` | error、warn | `6`（110₂） |
| `--exit-on error` | 仅 warn | `0`（000₂） |

---

### Step 3: 解读 JSON 输出

JSON 输出为数组，按文件分组，每个文件包含 `messages` 列表：

```json
[
  {
    "filePath": "/path/to/entry/src/main/ets/pages/Index.ets",
    "messages": [
      {
        "line": 42,
        "column": 8,
        "severity": "warn",
        "message": "Preferentially use the @Builder method instead of custom components.",
        "rule": "@performance/avoid-overusing-custom-component-check"
      }
    ]
  }
]
```

**severity 映射**：

| 值 | 级别 | 处理策略 |
|----|------|---------|
| `"error"` | 🔴 错误 | 必须修复（影响编译或运行时行为） |
| `"warn"` | 🟡 警告 | 强烈建议修复 |
| `"suggestion"` | 🔵 建议 | 可选优化 |

**汇总报告格式**：

```
📊 CodeLinter 检查报告
━━━━━━━━━━━━━━━━━━━━
🔴 错误：X 个
🟡 警告：X 个
🔵 建议：X 个

📁 entry/src/main/ets/pages/Index.ets
  🟡 第42行  @performance/hp-arkui-load-on-demand
             Use LazyForEach when appropriate
  🔴 第58行  @typescript-eslint/no-explicit-any
             Disallow usage of the `any` type
```

---

### Step 4: 提供修复建议

按 🔴 → 🟡 → 🔵 顺序逐条处理，**先询问用户偏好的修复方式**：

**方式 A：`--fix` 自动修复（QuickFix）**

对支持自动修复的规则，追加 `--fix` 参数直接修复：

```bash
node <CODELINTER> --fix /path/to/project
```

> 注意：并非所有规则都支持 QuickFix，复杂的重构类问题仍需手动处理。

**方式 B：AI 辅助修复**

对无法自动修复的问题，逐条处理：

1. 读取对应文件的相关代码行
2. 给出**修复前/修复后代码对比**并说明原因
3. **等待用户确认后再写入文件**

```
// 修复前
ForEach(this.dataList, (item) => {
  ListItem() { ... }
})

// 修复后（使用 LazyForEach 实现按需加载）
LazyForEach(this.dataSource, (item) => {
  ListItem() { ... }
})
```

可按**单条规则**批量修复，或按**单个文件**逐一修复，根据用户偏好决定。

---

## 配置进阶：规则级别覆盖

在 `rules` 字段中可单独调整任意规则的严重级别：

```json
{
  "ruleSet": ["plugin:@performance/recommended"],
  "rules": {
    "@performance/hp-arkui-load-on-demand": "error",
    "@performance/hp-arkui-remove-redundant-nest-container": "warn",
    "@typescript-eslint/no-explicit-any": ["warn", {}],
    "@hw-stylistic/max-len": ["warn", { "code": 120 }],
    "@security/no-unsafe-aes": "off"
  }
}
```

级别值：`"off"`/`0`、`"warn"`/`1`、`"error"`/`2`、`"suggestion"`/`3`

---

## 检查清单

- [ ] 已确认用户需要检查的规则集
- [ ] `codelinter.json5` 已包含 `oh_modules` 和 `build` 排除路径
- [ ] 已运行 CLI 并获取结果
- [ ] 已按优先级（error → warn → suggestion）汇总问题
- [ ] 已与用户确认修复方式（`--fix` 自动修复 or AI 辅助修复）
- [ ] 修复后建议用户重新运行检查验证

---

## 常见问题

**Q: 告警数量过多怎么处理？**
先用 `recommended` 而非 `all`；可在 `rules` 中将低优先级规则设为 `"off"` 或 `"suggestion"`。

**Q: 只想检查特定目录？**
在 `files` 中指定路径，如 `["entry/src/main/ets/**/*.ets"]`。

**Q: 不同模块需要不同规则？**
使用 `overrides` 字段，见 [配置示例](references/config-examples.md)。

**Q: CI/CD 门禁集成怎么配置？**
使用 `--incremental` 只检查增量文件，配合 `--exit-on error` 在有 error 级别告警时返回非零退出码使门禁失败：
```bash
node <CODELINTER> -i -e error,warn -f json -o /tmp/lint-report.json /path/to/project
```

---

## 参考文档

- [规则集详细说明](references/rule-sets-reference.md)
- [配置示例](references/config-examples.md)
- [HarmonyOS CodeLinter 官方文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-code-linter)
