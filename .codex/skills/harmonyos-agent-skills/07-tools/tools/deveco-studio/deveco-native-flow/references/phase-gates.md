# 阶段门禁、完整性校验与进度展示

## 阶段门禁（Phase Gate）

每个阶段开始前检查前置条件，完成后校验产出物内容。与「产出物完整性校验」（检查文件是否存在）互补，阶段门禁关注**内容是否达标**。

| 阶段 | 前置条件（Pre-condition） | 产出校验（Post-condition） |
|------|--------------------------|--------------------------|
| detect | 用户提供了需求描述或文档 | `project-info.json` 包含 `selected_modules`，每个平台至少有 1 个 main 模块 |
| init | `project-info.json` 存在且 `selected_modules` 非空 | `setup.json` 中每个模块的 `status` 均为 `ready` |
| analyse | `setup.json` 存在且至少 1 个模块 `status=ready` | `tech-spec.md` 包含「子任务列表」章节，且子任务数 ≥ 1 |
| plan | `tech-spec.md` 存在且包含子任务列表 | `plan-{platform}.md` 包含「子任务」章节，且子任务覆盖 tech-spec 中属于该平台的所有子任务 |
| coding | `plan-{platform}.md` 存在且包含子任务列表 | `coding-progress-{platform}.json` 中所有子任务 `status=done`，且覆盖 plan 中的全部子任务 |

**执行规则**：
1. 阶段开始时检查前置条件，不满足则**中止并提示用户**（说明缺什么、如何补）
2. 阶段完成时检查产出校验，不满足则**标记为 draft 状态**，提示用户确认或补充
3. 门禁检查失败不自动重试，由用户决定下一步

## 产出物完整性校验

除了 `completed_phases` 字段判断外，pipeline 还应校验对应产出物文件是否实际存在，防止状态与文件不一致：

| 阶段 | 校验文件 | 不一致时处理 |
|------|---------|-------------|
| `detect` | `project-info.json` | 从 `completed_phases` 移除，提示重新执行 |
| `init` | `setup.json` | 从 `completed_phases` 移除，提示重新执行 |
| `analyse` | `tech-spec.md` | 从 `completed_phases` 移除，提示重新执行 |
| `plan` | `plan-{platform}.md`（至少一个平台的文件存在） | 从 `completed_phases` 移除，提示重新执行 |
| `coding` | `coding-progress-{platform}.json`（至少一个平台的文件存在） | 从 `completed_phases` 移除，提示重新执行 |

## 进度展示格式

当用户执行 `/pipeline`（无参数）或 `/pipeline list` 时，按以下格式展示当前需求的完整进度：

```
需求: user-profile-edit
描述: 在用户资料页添加编辑功能
平台: ios, android

流程进度:
  1. detect     ✅ completed    project-info.json ✓
  2. init       ✅ completed    setup.json ✓
  3. analyse    ✅ completed    tech-spec.md ✓
  4. plan       ✅ completed    plan-ios.md ✓  plan-android.md ✓
  5. coding     🔄 in_progress  coding-progress-ios.json (3/6)  coding-progress-android.json (0/4)

下一步: 继续编码 → /native-coding
```

状态图标说明：

| 图标 | 状态 | 说明 |
|------|------|------|
| ✅ | completed | 已完成 |
| 🔄 | in_progress | 进行中 |
| ⬜ | pending | 未开始 |
| ❌ | invalidated | 已失效，需恢复 |
| ⚠️ | file_missing | 状态已完成但产出物文件缺失 |