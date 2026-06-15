# 通用执行规则（跨阶段共享）

> 本文件为 `prd-gen.md`、`coding.md`、`review.md` 的公共前置规则，避免重复定义。
> **依赖方向（单向，禁止反转）**：`prd-gen.md` / `coding.md` / `review.md` → `common.md`。
> 本文件**不引用**任何其他 reference 文件；若需引用请内联说明，不得添加跨文件链接。

---

## 0. 工具前置条件（限定生效范围）

> 本节**主要在 `coding.md` 阶段生效**；`prd-gen.md` 阶段一若需调用外部设计工具 MCP（如 Figma），同样需确认 MCP 可用性，但只需校验对应设计工具 MCP，无需安装 `@deveco-codegenie/mcp`。`review.md` 默认不应用本节。

### 0.1 codegenie CLI 场景

- 若当前运行环境是 **codegenie CLI**，默认可直接使用相关能力，无需额外安装 MCP

### 0.2 非 codegenie CLI 场景

在调用工具前，先检查 MCP 配置中是否存在 `@deveco-codegenie/mcp@beta` 的启动方式：

- 若已存在：继续执行后续流程
- 若不存在：先安装/补充 MCP 配置，再继续执行

#### 非 opencode 场景（默认）

```jsonc
{
  "mcpServers": {
    "deveco-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@deveco-codegenie/mcp@beta"
      ],
      "env": {
        "DEVECO_PATH": "path/to/your/deveco" // 无需到 bin 一层
      }
    }
  }
}
```

#### opencode 场景

```jsonc
{
  "mcp": {
    "deveco-mcp": {
      "command": ["npx", "-y", "@deveco-codegenie/mcp@beta"],
      "type": "local",
      "enabled": true,
      "environment": {
        "PROJECT_PATH": ".",
        "DEVECO_PATH": "path/to/your/deveco" // 无需到 bin 一层
      }
    }
  }
}
```

### 0.3 工具能力映射与“缺工具先装 MCP”策略

编码/联调阶段若发现关键工具不可用，统一按“先校验 MCP、缺失即安装”的流程执行

关键工具包含：`check_ets_files`、`build_project`、`start_app`、`get_hilog_or_faultlog_recent`。

执行顺序要求：
1. 先检查 MCP 是否已安装且可调用；
2. 若未安装或不可调用，先完成 MCP 安装/补充配置；
3. 安装后重新调用原工具，继续原流程；
4. 禁止跳过该步骤改走本地替代命令。

如使用过程中遇到问题，优先查阅：
- `https://github.com/open-deveco/deveco-toolbox`

---

## 1. 项目路径与可选目录

- `rules/`、`docs/`、`templates/`、`memory/` 均视为**用户工程内可选路径**
- 目录存在则读取并执行约束；不存在则跳过，不强制创建
- 仅当用户明确要求沉淀落盘时，才建议创建 `memory/` 或其他文档目录

---

## 2. 复用优先与最小改动

1. 在新增实现前，先检索工程内是否已有可复用封装（组件、工具函数、ViewModel 基类）
2. 已有封装可满足需求时，优先复用；禁止同能力重复实现
3. 修复类任务遵循最小修复原则：只改动与问题直接相关代码

---

## 3. 质量闭环与重试策略

- 默认执行闭环：**静态检查 → 编译构建 → 推包部署（若阶段需要）**
- 每次修复后应尽快回归检查，不攒到最后统一处理
- **重试计数规则**：完整定义见 `coding.md` 阶段七顶部（全局唯一权威版本）。核心约束摘要：
  - 编译重试计数 与 用户反馈修复重试计数 **相互独立，互不叠加**
  - 累计修复次数超过 **5 次** 时**强制挂起**，通知用户人工介入
  - 进入编码阶段后，以 `coding.md` 阶段七的完整规则为准执行，本摘要不作为执行依据

---

## 4. 知识沉淀策略

### 4.1 沉淀目录检查与主动创建

在首次需要写入沉淀内容（`coding.md` 阶段七 Step 4 / `review.md` 阶段六）前，执行以下判断：

| 情况 | 处理方式 |
|------|---------|
| `memory/` 目录已存在 | 直接按既有格式追加 |
| `memory/` 不存在，**但**工程根目录可写 | 主动创建 `memory/` 目录，并告知用户"已初始化 memory/ 沉淀目录" |
| 工程根目录本身不可写（只读环境） | 在对话中输出结构化结论，并**明确提示用户**："当前工程目录不可写，以下内容请手动保存至 `memory/` 以避免丢失" |

> **禁止默认走"对话中输出"路径**：只读环境才允许在对话中输出；其余情况必须写入磁盘。

### 4.2 各沉淀文件写入时机

| 文件 | 写入时机 |
|------|---------|
| `memory/bugs.md` | 阶段六首次出现功能/逻辑问题时 |
| `memory/crashes.md` | 阶段六首次出现 Crash / 崩溃时 |
| `memory/hard-problems.md` | 疑难偶现（阶段七进入后）首次记录时 |
| `memory/arkts-patterns.md` | 评审阶段六发现新 ArkTS 通用模式差异时 |

### 4.3 各沉淀文件初始化模板

首次写入某个沉淀文件前，若文件不存在，用以下对应模板创建文件，再追加第一条条目。

---

#### memory/bugs.md

```markdown
# 功能/逻辑 Bug 记录
> 本文件由 AI 自动维护。每次新增条目追加至末尾，不要修改已有条目序号。

## BUG-{序号} {简短标题}

**模块**：{module_name}
**现象**：{用户看到的问题}
**复现步骤**：{操作路径，逐步列出}
**已尝试**：{已执行的修复方案及失败原因}
**根因**：{确认后填写}
**修复方案**：{确认后填写}
**参考**：{相关文件路径 / 文档链接}
**状态**：未解决 / 已修复 / 已挂起
```

---

#### memory/crashes.md

```markdown
# Crash 与崩溃记录
> 本文件由 AI 自动维护。每次新增条目追加至末尾，不要修改已有条目序号。

## CRASH-{序号} {简短标题}

**模块**：{module_name}
**崩溃类型**：JS Exception / C++ Crash / ANR / OOM / 其他
**触发路径**：{进入哪个页面 / 执行哪个操作后崩溃}
**崩溃现象**：{应用直接退出 / 白屏 / 无响应，附 faultlog 关键堆栈}
**已尝试**：{已执行的修复方案及失败原因}
**根因**：{确认后填写}
**修复方案**：{确认后填写}
**参考**：{相关文件路径 / HarmonyOS 文档链接 / 平台 Issue}
**状态**：未解决 / 已修复 / 已挂起（等待平台修复）
```

---

#### memory/hard-problems.md

```markdown
# 疑难偶现问题记录
> 本文件由 AI 自动维护。每次新增条目追加至末尾，不要修改已有条目序号。

## HARD-{序号} {简短标题}

**模块**：{module_name}
**偶现频率**：{每次必现 / 约 N 次触发 1 次 / 特定设备/系统版本}
**触发条件**：{已知触发路径或环境；不确定时说明"未稳定复现"}
**现象描述**：{用户看到的问题}
**已尝试排查方向**：
1. {方向一及结论}
**日志线索**：{hilog / faultlog 关键输出，有则填写}
**根因假设**：{当前最可信推断，未确认则标注"待验证"}
**最终结论**：{确认后填写；挂起则记录原因}
**参考**：{相关文件路径 / 文档链接}
**状态**：调查中 / 已修复 / 已挂起
```

---

#### memory/arkts-patterns.md

```markdown
# ArkTS 平台差异与模式记录
> 本文件由 AI 自动维护，记录 ArkTS / HarmonyOS 与常规 TypeScript 的行为差异及经验证有效的正确模式。
> 每次新增条目追加至末尾，不要修改已有条目序号。
> 通用差异条目须同步评估是否回写 coding.md 高发约束表（见 review.md 阶段六 Step 2）。

## PATTERN-{序号} {简短标题}

**场景**：{在什么开发场景下遇到此差异}
**错误做法**：
描述错误做法及其后果
`
**正确做法**：
描述正确写法
**原因说明**：{为什么正确做法有效}
**适用范围**：{哪些组件 / 场景 / API 版本受影响}
**发现来源**：{编码踩坑 / 评审发现 / 官方文档}
**是否已回写 coding.md**：是（见 coding.md 第 N 行） / 否（仅项目内生效）
```

---

## 5. 文档边界

- `prd-gen.md`：需求调研、设计稿解析、PRD 生成与定稿
- `prd-quality-gate.md`：PRD 验收清单、技术校准、一致性审查、设计稿版本记录（仅 `prd-gen.md` 阶段三生效）
- `coding.md`：编码实现、静态检查、构建部署、联调修复、日志定位、功能验收回归
- `review.md`：代码评审、风险分级、经验复盘

跨阶段动作只做引用，不重复定义流程细节。

---

## 6. 代码检索跨平台约定（Windows / macOS）

为避免检索步骤受运行环境影响，统一按以下优先级执行：

1. 优先使用 Agent 原生检索能力（如 `search_codebase` / `grep_code` / 语义检索 / `rg` 工具）。
2. 若需命令行兜底，统一优先 `rg`；仅在 `rg` 不可用时再使用系统原生命令。
   - **Windows（PowerShell）**：`rg` 优先，`Select-String` 兜底。
   - **macOS（zsh/bash）**：`rg` 优先；仅当 `rg` 缺失时才使用 `grep -RInE`。
3. 若命令行能力受限，再退回 IDE 全局搜索（文件名 + 关键词双检索）。

示例：

```powershell
# Windows / PowerShell（优先）
rg "关键词A|关键词B" .\src
rg "TODO|FIXME|HACK" .\
```

```powershell
# Windows / PowerShell（兜底）
Get-ChildItem .\src -Recurse -File | Select-String -Pattern "关键词A|关键词B"
```

```bash
# macOS / zsh/bash（优先）
rg "TODO|FIXME|HACK" ./
```

```bash
# macOS / zsh/bash（仅当 rg 不可用时兜底）
grep -RInE "TODO|FIXME|HACK" ./
```
