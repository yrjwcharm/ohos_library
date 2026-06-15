# 需求变更管理 — 详细流程

## 场景 A：增量迭代（需求已完成）

当所有阶段已完成（`completed_phases` 包含 `coding`），在已有产物基础上追加一轮精简版 pipeline。跳过 detect 和 init（项目和工作空间已就绪），聚焦增量分析→计划→编码。

### 执行流程

**Phase 1: 变更请求分析**

1. 用户描述变更内容
2. 读取原 tech-spec.md 和 plan-{platform}.md，与变更描述对比
3. 判断是否需要新增模块：
   - **不需要** → 继续精简pipeline
   - **需要新增模块** → 使用 AskUserQuestion 给用户两个选择：
     - **缩小范围**：调整变更需求，使其在现有模块范围内完成，继续精简pipeline
     - **退出精简pipeline**：当次 round 中止，不写入任何产出物。用户需手动执行项目检测和初始化来补充新模块，再重新执行 `/pipeline change` 发起新一轮变更
4. 识别影响范围：原产物哪些部分受影响
5. brain-storm 式确认影响分析
6. **用 Write 写入** `changes/round-{N}/change-request.md`

**change-request.md 格式**：

```markdown
# 变更请求: Round {N}

> 基线: round-{N-1} (已完成)
> 变更时间: {timestamp}

## 变更描述
[用户提供的变更需求]

## 影响分析

### 新增模块?
- [ ] 是 → 退出精简pipeline，用户需先检测项目并初始化工作空间来补充新模块
- [x] 否 → 继续精简pipeline

### 影响范围

| 原产物 | 影响 | 说明 |
|--------|------|------|
| tech-spec.md → 三.整体设计 | 需修改 | [说明] |
| plan-{platform}.md → 4.1.x | 需修改 | [说明] |
| plan-{platform}.md → 4.2.x | 不影响 | — |
| coding (已完成代码) | 部分需修改 | [说明] |
```

**Phase 2: 增量技术方案**

调用 `/native-analyse`，但进入**增量模式**：
- 读取原 tech-spec.md 作为基线
- 只分析变更点引起的 diff
- brain-storm 式确认增量方案
- **用 Write 写入** `changes/round-{N}/delta-spec.md`

**delta-spec.md 格式**：

```markdown
# 增量技术方案: Round {N}

> 基线: tech-spec.md (round-{N-1})
> 仅描述与基线的差异部分

## 变更点 1: [标题]

**原方案** (引用 tech-spec 三.X):
> [原文引用]

**变更为**:
[新方案描述]

**变更原因**: [原因]

## 新增内容

### 新增子任务: [标题]
[与 tech-spec 四.子任务拆分 同格式]
```

**Phase 3: 增量实施计划**

调用 `/native-plan`，但进入**增量模式**：
- 读取原 plan-{platform}.md 作为基线（逐平台执行）
- 只列增量子任务：新增的 + 需要修改的
- 标注与原 plan 子任务的关系
- **用 Write 写入** `changes/round-{N}/delta-plan-{platform}.md`

**delta-plan-{platform}.md 格式**：

```markdown
# 增量实施计划: Round {N}

> 基线: plan-{platform}.md (round-{N-1})

## 子任务变更

### 修改: 4.1.2 [原任务名] → [新任务名]

**变更类型**: 修改

**原方案** (引用 plan-{platform}.md 4.1.2):
> [原文引用]

**变更为**:
[新实现方案]

**变更清单（增量）**：

| 操作 | 文件路径 | 修改内容 | 说明 |
|-----|---------|---------|------|
| 修改 | `path/to/existing.kt` | 新增 xxx 方法 | 原文件追加 |
| 新增 | `path/to/new.kt` | 新增 xxx 类 | 全新文件 |

### 新增: 4.1.5 [新任务名]

**变更类型**: 新增

**依赖**: 4.1.2（修改后版本）

[与 plan-{platform}.md 子任务同格式]
```

**Phase 4: 增量编码**

调用 `/native-coding`，传入 delta-plan-{platform}.md 路径（逐平台执行）：
- 读取 delta-plan-{platform}.md 的增量子任务
- 复用原有 workspace，在已有代码上增量修改
- 每个子任务后 build-fix
- **用 Write 写入** `changes/round-{N}/coding-progress-{platform}.json`

**Phase 5: 更新状态**

编码完成后：
- 更新 state.json 的 `current_change_round` 为 N
- `current_phase` 保持不变（增量迭代不改变原有阶段状态）
- `completed_phases` 保持不变（不追加、不移除）
- `invalidated_phases` 保持不变

---

## 场景 B：回退修改（需求未完成）

当需求尚在某个阶段进行中，需要修改已完成阶段的产物，并自动标记下游失效。

### 执行流程

**Step 1: 变更影响评估**

展示当前需求的所有阶段状态，让用户指定修改目标：

```markdown
当前需求: {requirement_id}
阶段状态:
  1. detect     ✅ completed
  2. init       ✅ completed
  3. analyse    ✅ completed
  4. plan       ✅ completed
  5. coding     🔄 in_progress (3/6 子任务)

请问要修改哪个阶段的产物？
```

使用 AskUserQuestion 工具，选项为所有已完成的阶段（`completed_phases` 中的项）。

**Step 2: 影响链分析**

根据用户选择的目标阶段，自动计算下游影响。下游阶段包含**已完成的**和**进行中的**：

| 修改阶段 | 下游失效阶段 | 说明 |
|---------|-------------|------|
| detect | init, analyse, plan, coding | 项目结构变了，全链路失效 |
| init | analyse, plan, coding | 工作空间变了，方案和代码失效 |
| analyse | plan, coding | 技术方案变了，计划和编码失效 |
| plan | coding | 计划变了，编码失效 |

**注意**：下游阶段可能处于三种状态：
- `completed`（在 `completed_phases` 中）
- `in_progress`（`current_phase` 指向该阶段，但不在 `completed_phases` 中）
- 未开始（不在任何列表中）

三种状态的阶段都需要被标记为 `invalidated`（未开始的阶段无需标记，因为本身就需要执行）。

展示影响分析并等待用户确认：

```markdown
修改 analyse（技术方案）将导致以下阶段失效：

| 阶段 | 当前状态 | 变更后 | 影响 |
|------|---------|--------|------|
| plan | ✅ completed | ❌ invalidated | 需重新执行 /native-plan |
| coding | 🔄 in_progress (3/6) | ❌ invalidated | 已完成的 3 个子任务可能需要重做 |

确认继续？修改前会自动备份当前产物。
```

**Step 3: 快照备份**

用户确认后，**在修改前**备份被修改阶段及所有下游阶段的产物：

```bash
# 创建快照目录
mkdir -p .bundle-flow/{id}/snapshots/before-change-{N}
```

备份以下文件（存在的才备份）：
- 被修改阶段的产物（如 `tech-spec.md`）
- 所有下游阶段的产物（如 `plan-{platform}.md`、`coding-progress-{platform}.json`）

**用 Write 写入** `snapshots/before-change-{N}/snapshot-meta.json`：

```json
{
  "change_number": 1,
  "change_description": "用户的变更描述",
  "target_phase": "analyse",
  "invalidated_phases": ["plan", "coding"],
  "backed_up_files": ["tech-spec.md", "plan-{platform}.md", "coding-progress-{platform}.json"],
  "created_at": "2026-03-28T10:00:00Z"
}
```

**Step 4: 原地修改**

调用被修改阶段对应的操作，进入**修改模式**：

| 目标阶段 | 操作 | 模式 |
|---------|------|------|
| detect | 重新检测项目结构，用户可增删模块 | 修改模式 |
| init | 重新初始化（新增的模块），已有的保留 | 修改模式 |
| analyse | `/native-analyse` | 读取现有 tech-spec + 变更描述，进入修改模式 |
| plan | `/native-plan` | 读取现有 plan + 变更描述，进入修改模式 |

修改模式下，操作的行为：
- 读取现有产物作为起点（不从零开始）
- 将变更描述作为额外输入
- brain-storm 式确认修改内容
- 修改完成后**原地覆盖**产物文件（已有快照备份）

**Step 5: 下游失效标记**

修改完成后：

1. **更新 state.json**：
   - 将下游阶段中处于 `completed_phases` 的，从 `completed_phases` 移到 `invalidated_phases`
   - 将下游阶段中处于 `in_progress` 的（`current_phase` 指向但不在 `completed_phases` 中），直接加入 `invalidated_phases`
   - `current_phase` 设为被修改阶段的名称

2. **输出失效报告**：

```markdown
## 变更完成报告

已修改: {target_phase} ✅

以下阶段已标记为失效，需要重新执行:

| 阶段 | 原状态 | 当前状态 | 恢复操作 |
|------|--------|---------|---------|
| plan | completed | ❌ invalidated | /native-plan |
| coding | in_progress (3/6) | ❌ invalidated | /native-coding |

已备份原产物到: snapshots/before-change-{N}/

建议执行顺序:
1. /native-plan → 重新生成计划（将读取已修改的 tech-spec）
2. /native-coding → 重新编码
```

**Step 6: 失效阶段的恢复执行**

用户按顺序重新执行失效阶段时，各操作的行为：

**plan（invalidated）**：
- 读取已修改的 tech-spec
- 提示"技术方案已变更，需要重新生成计划"
- 进入正常 plan 流程
- 完成后从 `invalidated_phases` 移回 `completed_phases`

**coding（invalidated）**：
- 读取新 plan-{platform}.md 的子任务列表
- 对比原 coding-progress-{platform}.json（从快照中读取）的已完成子任务
- **增量恢复分析**（不全部重做）：

  | 分类 | 说明 | 处理 |
  |-----|------|------|
  | **未变化** | plan 中子任务定义未改变 | 标记 `revalidated`，跳过不重做 |
  | **需重做** | plan 中子任务定义已修改 | 标记 `needs_rework`，重新编码 |
  | **新增** | plan 中新增的子任务 | 标记 `pending`，按依赖链插入执行 |
  | **废弃** | plan 中已删除的子任务 | 标记 `obsolete`，提示用户是否需要回退已写的代码 |

- 展示差异分析给用户确认后开始编码
- 完成后从 `invalidated_phases` 移回 `completed_phases`

---

## 护栏规则

| 规则 | 说明 |
|------|------|
| 变更前必须快照 | 场景 B 修改前自动备份，防止数据丢失 |
| 不允许跳过失效阶段 | invalidated 的阶段必须按顺序恢复，不能跳到后续阶段 |
| 场景 A 不影响原产物 | 增量迭代的产物放在 `changes/round-N/` 下，原产物不动 |
| 新增模块不走精简 pipeline | 场景 A 中如果需要新增模块，退出精简 pipeline，提示用户从项目检测开始 |