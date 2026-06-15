---
name: deveco-native-flow
description: |
  三端一致开发流水线（HarmonyOS/Android/iOS）：analyse → plan → coding → build → verify。
  自包含：内嵌 HarmonyOS ArkTS 知识路由，无需外部 skill 依赖。
  支持正向开发和翻译开发两种模式。

  执行流程：
  1. 自动检测项目类型和平台
  2. 执行 analyse 阶段生成跨端技术方案（读取 references/native-analyse/SKILL.md）
  3. 逐端执行 plan 阶段生成实施计划（读取 references/native-plan/SKILL.md）
  4. 逐端执行 coding 阶段完成编码（读取 references/native-coding/SKILL.md）
  5. 构建验证 + UI 验证

  Triggers: 三端开发, native pipeline, deveco pipeline, cross-platform, 跨端开发, 技术方案, 实施计划, 编码实施
license: MIT
metadata:
  author: harmonyos-dev-skills
  version: "1.0.0"
  created: "2026-05-06"
  keywords: ["harmonyos", "cross-platform", "pipeline", "deveco", "arkts"]
---

# 三端一致开发流水线 (deveco-native-flow)

analyse → plan → coding 一站式开发流水线，支持 HarmonyOS/Android/iOS 三端开发。内嵌 HarmonyOS ArkTS 知识路由，无需外部 skill 依赖。

---

## Skill 加载约定

本文档使用 `READ_REF(<name>)` 作为加载子 skill 的统一简写：
- **Claude Code**：读取 `<skill_root>/references/<name>/SKILL.md` 文件并遵循其中的指引
- **其他 AI 工具**：同上，读取 `<skill_root>/references/<name>/SKILL.md` 文件

其中 `<skill_root>` 是本 skill 的安装目录。运行 `init.sh` 时会将其解析为绝对路径写入项目配置。

---

## MCP 前置条件

### 1. DevEco MCP（HarmonyOS 开发必需）

提供项目构建、ETS 静态检查、知识搜索、设备操作等核心能力。

```json
{
  "mcpServers": {
    "mcp_deveco": {
      "command": "npx",
      "args": ["-y", "@deveco-codegenie/mcp"],
      "env": {
        "DEVECO_PATH": "/Applications/DevEco-Studio.app",
        "PROJECT_PATH": "${workspaceFolder:-$(pwd)}"
      }
    }
  }
}
```

#### 工具名称匹配规则

MCP 工具的完整名称格式为 `mcp__<server-name>__<tool-name>`。按后缀匹配调用：

| 后缀（tool-name） | 用途 |
|---|---|
| `build_project` | 项目构建 |
| `check_ets_files` | ETS 静态检查 |
| `harmonyos_knowledge_search` | 云端知识搜索 |
| `init_project_path` | 初始化项目路径 |
| `start_app` | 启动应用 |
| `perform_ui_action` | UI 操作 |
| `get_app_ui_tree` | 获取 UI 元素树 |
| `project_sync` | 项目同步 |

### 2. ArkTS LSP MCP（HarmonyOS 可选，推荐）

提供 LSP 驱动的代码导航能力（引用查找、定义跳转、类型信息），用于安全重构。

> **详细配置（macOS/Linux/Windows）**请查看 `references/mcp-arkts-lsp-config.md`

---

## HarmonyOS 知识路由（内嵌）

当涉及 HarmonyOS 平台开发时，本 skill 内嵌了完整的知识路由能力。

### 意图识别

| 意图 | 典型场景 | 路由目标 |
|------|----------|----------|
| **Learn** | 询问鸿蒙新特性、API 对比、最佳实践 | 加载 kits_* + harmony-learner |
| **Verify** | 在设备上验证、截图、查看日志 | harmony-verify + MCP 设备工具 |
| **Refactor** | 重命名、移动代码、安全删除 | refactoring |
| **Plan/Code** | 开发新功能、修 bug、写页面 | 完整路由（含知识搜索兜底） |

### 路由规则

1. **Verify** → `references/harmony-verify/SKILL.md` + MCP 设备工具
2. **Refactor** → `references/refactoring/SKILL.md`
3. **Learn** → 加载本地知识 skill（不触发 knowledge_search），然后 `references/harmony-learner/SKILL.md`
4. **Plan/Code** → 完整路由（含 knowledge_search 兜底）
5. **意图模糊** → 默认走 Plan/Code 路径
6. **多意图混合** → 拆分处理，分别路由

> **详细路由表**（组件 → Skill、Kit → Skill）请查看 `references/knowledge-router.md`

---

## 执行流程

### Step 0: 初始化检查（自动执行）

**每次调用 /deveco-native-flow 时，首先执行以下检查：**

1. **检测项目类型和平台**：
   - 检查 `build-profile.json5` 存在 → HarmonyOS 项目
   - 检查 `build.gradle.kts` 或 `build.gradle` 存在 → Android 项目
   - 检查 `*.xcodeproj` 或 `Podfile` 存在 → iOS 项目
   - 多个特征文件同时存在 → 多平台项目

2. **检查初始化状态**：检查 `.deveco-flow/rules.md` 是否存在
   - 不存在 → **自动执行初始化脚本**：
     - macOS/Linux: `bash <skill_root>/scripts/init.sh <project-root>`
     - Windows: `powershell -ExecutionPolicy Bypass -File <skill_root>\scripts\init.ps1 <project-root>`
   - 存在 → 继续

3. **加载 HarmonyOS 知识**（如涉及 HarmonyOS 平台）：
   ```
   读取 <skill_root>/references/lang-syntax/SKILL.md → ArkTS 语法约束
   根据需求涉及的能力，读取对应的 references/kits_<name>/SKILL.md
   ```

#### Checklist - 初始化检查

- [ ] 项目类型检测完成（HarmonyOS/Android/iOS）
- [ ] 初始化脚本执行成功（`.deveco-flow/rules.md` 存在）
- [ ] MCP 工具连接正常（DevEco MCP）

### Step 1: 需求创建

1. **创建需求目录**：`.bundle-flow/{requirement_id}/`
2. **初始化 state.json**：
   ```json
   {
     "active": "requirement-id",
     "requirements": {
       "requirement-id": {
         "description": "需求描述",
         "current_phase": "analyse",
         "completed_phases": [],
         "invalidated_phases": [],
         "platforms": ["harmony", "android", "ios"],
         "project_root": "/absolute/path/to/project"
       }
     }
   }
   ```

> 需求管理（list/switch/delete/change/import）详见 `references/requirement-operations.md`

---

### Step 2: Analyse 阶段（跨端技术方案）

**在进入本阶段前，如涉及 HarmonyOS 平台，确保已加载 ArkTS 知识**

**执行流程（读取 `references/native-analyse/SKILL.md`）：**

- Phase 0: 上下文恢复
- Phase 1: 需求澄清（brain-storm 式迭代问询）
- Phase 2: 现有流程分析（逐端读取代码/知识库，合并为统一业务全貌）
- Phase 3: 整体设计（架构图/交互图/数据流/技术选型）
- Phase 4: 子任务拆分（跨端通用契约 + 各端差异提示）
- Phase 5: 三板斧（切流/监控/应急）
- Phase 6: 输出持久化 → `tech-spec.md` + `metadata.json`

**产出物**：`.bundle-flow/{id}/tech-spec.md`（跨端通用技术方案，不分平台）

---

### Step 3: Plan 阶段（端级实施计划）

**在进入本阶段前，如涉及 HarmonyOS 平台，再次加载 ArkTS 知识**

**执行流程（读取 `references/native-plan/SKILL.md`）：**

**必须在主会话中执行，不能使用 Agent 子进程。逐平台顺序执行：**

```
for platform in platforms:
    READ_REF(native-plan) → 读取 plan-{platform}.md（如已存在则恢复）
    执行 plan 流程 → 输出 plan-{platform}.md
    等待用户确认
```

- Phase 0: 上下文恢复（检测 tech-spec、已有 plan）
- Phase 1: 需求重述（精简模式引用 tech-spec，完整模式独立分析）
- Phase 2: 影响分析（聚焦当前端特有细节）
- Phase 3: 架构设计（端内实现架构）
- Phase 4: 变更流程（按 Bundle 细化为文件级变更清单）
- Phase 5: 分阶段实施计划（DAG 依赖排序）
- Phase 6: 风险评估
- Phase 7: 集成测试（UserStory）
- Phase 8: 输出持久化 → `plan-{platform}.md` + `metadata.json`

**产出物**：`.bundle-flow/{id}/plan-{platform}.md`（按平台分文件）

> 多平台执行策略、一致性校验详见 `references/pipeline-steps-detail.md`

---

### Step 4: Coding 阶段（编码实施）

**在进入本阶段前，如涉及 HarmonyOS 平台，加载对应组件/Kit 知识**

**执行流程（读取 `references/native-coding/SKILL.md`）：**

**必须在主会话中执行，不能使用 Agent 子进程。逐平台顺序执行：**

```
for platform in platforms:
    READ_REF(native-coding) → 读取 coding-progress-{platform}.json（如已存在则恢复）
    执行 coding 流程 → 代码变更 + 构建验证
```

- Phase 1: 上下文恢复（检测编码进度，断点恢复）
- Phase 2: 依赖分析（解析子任务 DAG，拓扑排序）
- Phase 3: 知识库加载
  - **HarmonyOS**：读取 `references/lang-syntax/SKILL.md`、`references/kits_<relevant>/SKILL.md`
  - **Android/iOS**：读取项目 `.knowledge/` 目录，采样现有代码风格
- Phase 4: 逐子任务编码循环
- Phase 5: 完成总结

**产出物**：`.bundle-flow/{id}/coding-progress-{platform}.json` + 代码变更

---

### Step 5: 构建验证（必须）

**所有平台编码完成后，逐平台执行最终全量构建验证：**

1. **HarmonyOS**：使用 DevEco MCP `build_project` 工具或 `hvigorw assembleHap`
2. **Android**：`./gradlew compileDebugKotlin`
3. **iOS**：`xcodebuild build -scheme <scheme> -destination 'generic/platform=iOS'`

构建失败 → 读取 `references/native-build-fix/SKILL.md` 修复，直到通过。
构建通过 → 更新 `state.json`：`completed_phases` 添加 `"build"`

#### Checklist - 构建验证

- [ ] 各平台构建通过（HarmonyOS/Android/iOS）
- [ ] 所有编译错误已修复
- [ ] `state.json` 已更新（`completed_phases` 包含 `"build"`）

---

### Step 6: UI 验证（必须）

**构建验证通过后，必须执行 UI + 日志集成验证。验证不可跳过。**

#### 验证流程

逐平台顺序执行：HarmonyOS → Android → iOS

每个平台：
1. **选择验证设备**：按设备矩阵选择至少一种设备类型（手机必选）
2. **安装构建产物**：将构建产物安装到目标设备
3. **逐 UserStory 验证**：按 plan 中的 UserStory，逐设备类型执行操作步骤 + 截图 + 日志验证
4. **汇总验证报告**：生成 `verification-report-{platform}.md`

> **详细设备矩阵**（HarmonyOS/Android/iOS）请查看 `references/verify-devices.md`

#### 验证工具

| 平台 | 工具 | 说明 |
|------|------|------|
| HarmonyOS | DevEco MCP + hdc + uitest | 截图、UI 树、点击、日志等 |
| Android | mobile-mcp + adb | 截图、UI 操作、日志收集 |
| iOS | mobile-mcp + simctl | 截图、UI 操作、日志收集 |

#### 失败处理

- **全部通过** → 更新 `state.json`：`completed_phases` 添加 `"verify"`，流程结束
- **存在失败** → 输出验证报告，询问用户：fix / ignore / retry

> 详细验证流程参见 `references/native-verify.md`

#### Checklist - UI 验证

- [ ] 验证设备已启动（至少手机设备）
- [ ] 构建产物已安装到设备
- [ ] 所有 UserStory 已验证
- [ ] 日志验证通过（无 Error/Fatal 级别日志）
- [ ] `state.json` 已更新（`completed_phases` 包含 `"verify"`）

---

## 使用方式

### 正向开发

```
/deveco-native-flow "需求描述"
```

示例：
```
/deveco-native-flow "实现用户个人资料编辑页面，支持三端"
```

### 翻译开发

```
/deveco-native-flow translate --source android --target harmony "需求描述"
```

翻译模式差异：
- analyse 阶段不做 brain-storm 设计，而是深度阅读源端代码后生成翻译映射
- coding 阶段每个子任务会先 Read 源端参照文件再翻译

> 翻译模式详细流程详见 `references/translate-operations.md`

### 需求管理

| 命令 | 说明 |
|------|------|
| `list` | 列出所有需求 |
| `switch <id>` | 切换活跃需求 |
| `delete <id>` | 删除需求 |
| `change "描述"` | 需求变更 |

> 详细操作流程详见 `references/requirement-operations.md`、`references/change-management.md`

---

## 进度判断与恢复

### 进度判断逻辑

读取 `.bundle-flow/state.json` 的 `completed_phases`：

```
if "analyse" not in completed_phases → 执行 Step 2 (analyse)
elif "plan" not in completed_phases → 执行 Step 3 (plan，逐平台)
elif "coding" not in completed_phases → 执行 Step 4 (coding，逐平台)
elif "build" not in completed_phases → 执行 Step 5 (构建验证)
elif "verify" not in completed_phases → 执行 Step 6 (UI 验证)
else → 全部完成
```

### 错误恢复

所有状态持久化在 `.bundle-flow/` 目录，新会话自动读取 state.json 恢复进度。

| 场景 | 恢复机制 |
|------|----------|
| analyse 中断 | 检测已有 tech-spec.md，提示继续/废弃/修改 |
| plan 中断 | 检测已有 plan-{platform}.md，提示继续/废弃/修改 |
| coding 中断 | 读取 coding-progress-{platform}.json，从断点继续 |

> 详细错误恢复机制详见 `references/error-recovery.md`

---

## 目录结构

```
.bundle-flow/
├── state.json                       # 全局状态
└── {requirement_id}/
    ├── tech-spec.md                 # analyse产出
    ├── metadata.json                # 元数据
    ├── plan-{platform}.md           # plan产出
    ├── coding-progress-{platform}.json
    ├── verification-report-{platform}.md
    ├── changes/                     # 需求变更
    └── snapshots/                   # 快照
```

> 详细格式见 `references/state-schema.md`

---

## 需求变更管理

当需求已在流水线中，发生需求变动时，通过 `/deveco-native-flow change "变更描述"` 触发。

### 场景自动判断

```
/deveco-native-flow change "变更描述"
    ↓
读取 state.json → 获取当前需求状态
    ↓
completed_phases 包含 "coding"?
    ↓                    ↓
   Yes                  No
    ↓                    ↓
  场景 A               场景 B
  增量迭代             回退修改
```

> 两个场景的详细执行流程详见 `references/change-management.md`

---

## 护栏机制

| 场景 | 触发条件 | 动作 |
|-----|---------|------|
| brain-storm 过多 | 超过 5 轮未收敛 | 强制总结，输出 draft 供确认 |
| 构建修复循环 | 连续 3 轮错误数不减 | 暂停，输出摘要请求用户介入 |
| 同一区域反复修改 | 连续 2 次改同一位置未解决 | 切换方案 |
| 阶段交互过多 | 单阶段超 10 次交互 | 提示拆分需求 |
| plan-code 冲突 | 编码时发现 plan 与实际代码矛盾 | 暂停，提示用户更新 plan |
| 知识库冲突 | plan 方案与知识库规范矛盾 | 暂停，展示冲突点，由用户决策 |

> 详细护栏规则详见 `references/error-recovery.md`

---

## 关键规则

1. **必须初始化**：每次调用首先检查/执行 init.sh
2. **HarmonyOS 知识内嵌**：涉及 HarmonyOS 时，从 `references/` 读取 ArkTS 语法和 Kit 知识
3. **必须分阶段**：严格按照 analyse → plan → coding → build → verify 顺序执行
4. **plan/coding 逐平台顺序执行**：必须在主会话中执行，不能使用 Agent 子进程
5. **必须验证**：build 和 verify 阶段不可跳过
6. **状态持久化**：所有进度保存在 `.bundle-flow/` 目录
7. **跨阶段一致性**：plan 完成后检查与 tech-spec 的覆盖率，coding 完成后检查与 plan 的覆盖率

### Checklist - 关键规则验证

- [ ] 每次调用都执行了初始化检查
- [ ] 遵循 analyse → plan → coding → build → verify 顺序
- [ ] plan/coding 在主会话中执行（非 Agent 子进程）
- [ ] build 和 verify 验证已执行且通过
- [ ] HarmonyOS 知识已加载（如涉及）
- [ ] 状态持久化正确（`.bundle-flow/` 目录存在）

---

## 子 Skill 索引

### 流水线子 Skill

| 子 Skill | 路径 | 说明 |
|----------|------|------|
| native-analyse | `references/native-analyse/SKILL.md` | 跨端技术方案分析 |
| native-plan | `references/native-plan/SKILL.md` | 端级实施计划 |
| native-coding | `references/native-coding/SKILL.md` | 编码实施 |
| native-build-fix | `references/native-build-fix/SKILL.md` | 多平台构建错误修复 |

### 流水线参考文档

| 文档 | 路径 | 说明 |
|------|------|------|
| 变更管理 | `references/change-management.md` | 需求变更流程（增量/回退） |
| 错误恢复 | `references/error-recovery.md` | 护栏机制与恢复策略 |
| 阶段门禁 | `references/phase-gates.md` | 阶段前置/后置条件校验 |
| 流水线步骤详情 | `references/pipeline-steps-detail.md` | 多平台执行策略 |
| 需求操作 | `references/requirement-operations.md` | 创建/切换/删除/导入需求 |
| 状态格式 | `references/state-schema.md` | state.json 格式与目录结构 |
| 事件处理 | `references/event-handler-guide.md` | Pipeline 事件分发 |
| 翻译操作 | `references/translate-operations.md` | 跨平台翻译流程 |
| 多端集成验证 | `references/native-verify.md` | 多端多设备验证流程（必选） |

### HarmonyOS 知识子 Skill（内嵌）

**语法 & 组件**：`lang-syntax`、`component_basic_ui`、`component_container`

**Kit API（30+）**：ability、arkts、data、network、ui、file、media、device、connectivity、security、web、form、ipc、localization、performance、accessibility、avsession、input、ime、graphics2d、basic_services、telephony、distributed、test

**知识 & 工程**：`knowledge_search`、`harmony-learner`、`harmony-build-fix`、`harmony-verify`、`refactoring`

> **完整 Kit 路由表与详细用法**请查看 `references/knowledge-router.md`

---

## ArkTS 核心约束

**硬约束**：禁止 `any/unknown/var`、禁止 `#` 私有标识符、禁止交叉类型/条件类型/索引签名、禁止解构赋值和 `in/delete`、`@Component struct` 必须有 `build()`、状态使用装饰器。

> **详细规则**请查看 `references/arkts-syntax-quick-ref.md` 和 `references/lang-syntax/SKILL.md`

---

## 辅助脚本

| 脚本 | 路径 | 用途 |
|------|------|------|
| init.sh | `scripts/init.sh` | 初始化（macOS/Linux） |
| init.ps1 | `scripts/init.ps1` | 初始化（Windows PowerShell） |
| hdc.sh | `references/harmony-verify/scripts/hdc.sh` | 设备操作辅助（macOS/Linux） |
| hdc.ps1 | `references/harmony-verify/scripts/hdc.ps1` | 设备操作辅助（Windows） |