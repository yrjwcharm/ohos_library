# 需求操作详细流程

## 删除需求

删除是**不可逆操作**（产出物、工作空间、分支全部丢失），必须按以下步骤执行。

### Step 1: 确认删除

先展示待删除需求的完整状态，让用户明确确认：

1. **用 Read 读取** `.bundle-flow/state.json` 和 `.bundle-flow/{id}/metadata.json`（如存在）
2. 输出确认信息：

```markdown
即将删除需求: {requirement_id}
- 描述: {description}
- 当前阶段: {current_phase}
- 已完成: {completed_phases}
- 涉及平台: {platforms}
- 产出物: {列出已有的文件：project-info.json / setup.json / tech-spec.md / plan-{platform}.md / coding-progress-{platform}.json}

⚠️ 此操作不可逆，以下内容将被永久删除：
- 产出物目录: .bundle-flow/{id}/
- 工作空间: .bundle-flow-workspace/{id}/
- 各仓库的 bundle-flow/{id} 本地分支

确认删除？(yes/no)
```

3. **等待用户回复 yes 后**才继续执行，否则取消。

### Step 2: 清理 Worktree

对 `.bundle-flow-workspace/{id}/` 下的每个模块目录，检查是否为 git worktree：

```bash
# 对每个模块目录，检查是否是 worktree（.git 是文件而非目录）
MODULE_DIR=.bundle-flow-workspace/{id}/{module_name}
if [ -f "$MODULE_DIR/.git" ]; then
  # 从 .git 文件中解析出父仓库路径
  PARENT_GIT=$(cat "$MODULE_DIR/.git" | sed 's/gitdir: //' | sed 's|/\.git/worktrees/.*||')
  # 用父仓库执行 worktree remove
  git -C "$PARENT_GIT" worktree remove "$MODULE_DIR" --force
fi
```

如果 `git worktree remove` 失败（如父仓库已不存在），fallback 为直接删除目录并手动清理 `.git/worktrees/` 残留引用。

### Step 3: 清理分支

对 setup.json 中记录的每个仓库（通过 `source: "worktree"` 的 `original_path` 或 `source: "cloned"` 跳过），清理本地分支：

```bash
# 仅清理通过 worktree 创建的分支（clone 的仓库随目录一起删除）
git -C "{original_path}" branch -d "bundle-flow/{id}" 2>/dev/null
```

分支删除失败（如有未合并的提交）时，**不强制删除**，输出提示让用户自行决定：

```markdown
⚠️ 分支 bundle-flow/{id} 在仓库 {repo_name} 中有未合并的提交，未自动删除。
如需强制删除: git -C "{original_path}" branch -D "bundle-flow/{id}"
```

### Step 4: 清理目录和 state.json

1. **用 Bash 删除**产出物目录和工作空间：
   ```bash
   rm -rf .bundle-flow/{id}/ .bundle-flow-workspace/{id}/
   ```
2. **用 Read + Write 更新** state.json，从 `requirements` 中移除该需求

### Step 5: 处理 active 悬空

如果删除的是当前 `active` 的需求：

- **还有其他需求** → 自动将 `active` 切换到 `requirements` 中 `created_at` 最近的需求，并执行切换需求的 **Step 3 + Step 4**（加载新上下文 + 输出隔离线）
- **没有其他需求** → 将 `active` 设为 `""`，输出：

```markdown
---
⚠️ 上下文隔离线 — 需求已删除
需求 {id} 的所有上下文已失效，禁止引用。
当前无活跃需求。
---

已删除需求: {id}
当前无活跃需求，可通过 /pipeline <需求描述> 创建新需求。
```

如果删除的**不是**当前 `active` 的需求，仅输出删除完成确认，无需隔离线。

---

## 导入需求

从已有的 tech-spec.md 文件导入需求，自动反向生成项目检测和初始化阶段的产出物，恢复完整的 pipeline 上下文。导入完成后，状态与正常走完 detect → init → analyse 完全一致，下游 skill 无法区分来源。

### 使用场景

团队协作时，一位同事（如 iOS 端）产出了 tech-spec.md 技术方案，另一位同事（如 Android/鸿蒙端）需要基于这份方案继续执行 plan → coding。

### 触发方式

```
/pipeline import <tech-spec-path> [--platform android,harmony]
```

- `<tech-spec-path>`：tech-spec.md 文件路径（必填）
- `--platform`：指定要初始化和执行 plan/coding 的平台（可选，不指定则交互式选择）

### 执行流程

**Step 1: 冲突检测**

读取 `.bundle-flow/state.json`，检查是否已有同名需求：
- 有 → 使用 AskUserQuestion 让用户选择：覆盖 / 换名 / 取消
- 无 → 继续

**Step 2: 解析 tech-spec.md**

从文档中提取关键信息。根据文档格式分两种策略：

**标准格式**（pipeline 产出的 tech-spec.md）— 直接从 header 解析：

```markdown
# 技术方案: [功能名称]          → description
> Plan ID: `feature-confirmation-dialog` → requirement_id
> 涉及平台: [iOS, Android]       → all_platforms
> 涉及模块: [module-a, ...]   → module_names
```

从子任务章节提取模块角色：

```markdown
### 4.1 子任务 1: xxx
**关联模块**：`module-a`(shared), `module-b`(iOS)
```

**非标准格式**（手写文档）— 降级为 AI 提取模式：

1. 通读全文，提取所有提到的模块名称和平台关键词
2. 将提取结果展示给用户确认/补充

**Step 3: 补全模块结构化信息**

对每个提取到的模块名称，从项目配置中获取详细信息（如模块路径、依赖关系等）。查不到的模块询问用户补充。

**Step 4: 平台选择与过滤**

如果命令行指定了 `--platform`，使用指定的平台；否则使用 AskUserQuestion 交互式选择：

```markdown
tech-spec.md 涉及以下平台: iOS, Android, HarmonyOS

你要在哪些平台上执行 plan 和 coding？
```

选项为文档中提到的所有平台（multiSelect: true）。

选定平台后过滤模块列表：
- 保留选定平台相关的模块
- **共享层（共享代码）始终保留**（跨平台共享依赖）

**Step 5: 用户确认**

展示解析和补全后的完整信息，让用户确认：

```markdown
从 tech-spec.md 中解析到以下信息：

- requirement_id: feature-confirmation-dialog
- description: 新增功能确认弹窗
- 文档涉及平台: iOS, Android, HarmonyOS
- 你选择的平台: Android, HarmonyOS

模块列表:
| # | 模块 | 平台 | 角色 | 路径 |
|---|--------|------|------|----------|
| 1 | android-feature-module | Android | main | ... |
| 2 | harmony-feature-module | HarmonyOS | main | ... |
| 3 | core-module | shared | dependency | ... |

确认无误？
```

使用 AskUserQuestion，选项：确认 / 需要调整。

**Step 6: 创建目录并生成 project-info.json**

1. **用 Bash 创建目录**：`mkdir -p .bundle-flow/{requirement_id} .bundle-flow-workspace/{requirement_id}`
2. **用 Write 写入** `.bundle-flow/{requirement_id}/project-info.json`，格式与项目检测产出完全一致：

```json
{
  "requirement_id": "feature-confirmation-dialog",
  "description": "新增功能确认弹窗",
  "created_at": "2026-04-02T10:00:00Z",
  "selected_modules": {
    "android": [
      {
        "name": "android-feature-module",
        "path": "modules/android-feature-module",
        "role": "main",
        "desc": "功能模块",
        "category": "android"
      }
    ],
    "harmony": [...],
    "shared": [...]
  },
  "platforms": ["android", "harmony"],
  "total_modules": 3
}
```

**Step 7: 执行项目初始化**

调用项目初始化流程，传入 requirement_id 和模块列表。初始化工作空间、同步基线，产出 `setup.json`。

**Step 8: 初始化状态并放置 tech-spec.md**

按以下顺序执行（每一步都必须调用对应工具完成，目录已在 Step 6 中创建）：

1. **用 Bash 复制** tech-spec.md 到 `.bundle-flow/{requirement_id}/tech-spec.md`
2. **用 Write 写入** `.bundle-flow/{requirement_id}/metadata.json`（仅写入 native-analyse 负责的字段，native-plan 的字段由后续 `/native-plan` 执行时写入）：

   ```json
   {
     "tech_spec_status": "confirmed",
     "tech_spec_confirmed_at": "2026-04-02T10:00:00Z",
     "created_at": "2026-04-02T10:00:00Z"
   }
   ```

3. **用 Read + Write 更新** `.bundle-flow/state.json`：注册需求，设为 `active`

   ```json
   {
     "active": "feature-confirmation-dialog",
     "requirements": {
       "feature-confirmation-dialog": {
         "description": "新增功能确认弹窗",
         "current_phase": "analyse",
         "completed_phases": ["detect", "init", "analyse"],
         "invalidated_phases": [],
         "current_change_round": 1,
         "platforms": ["android", "harmony"],
         "created_at": "2026-04-02T10:00:00Z"
       }
     }
   }
   ```

**Step 9: 完成提示**

```markdown
导入完成！环境已就绪。

需求: feature-confirmation-dialog
已完成阶段: detect ✅ → init ✅ → analyse ✅
你的平台: Android, HarmonyOS

下一步:
  /native-plan --platform android → 生成 Android 端实施计划
  /native-plan --platform harmony → 生成鸿蒙端实施计划
```

### 与正常 pipeline 的等价性

import 完成后，所有产出物和状态与正常走完 detect → init → analyse 完全一致：

| 产出物 | 正常 pipeline | import |
|--------|----------|--------|
| `state.json` | detect 阶段创建 | Step 8 创建，格式一致 |
| `project-info.json` | 项目检测产出 | Step 6 生成，格式一致 |
| `setup.json` | 项目初始化产出 | Step 7 由项目初始化产出 |
| `tech-spec.md` | native-analyse 产出 | Step 8 复制用户提供的文件 |
| `metadata.json` | native-analyse 创建 | Step 8 创建，格式一致 |

下游的 `/native-plan` 和 `/native-coding` 无法区分是正常 pipeline 还是 import 产生的上下文。

---

## 翻译需求

将已有平台的功能翻译到目标平台（通常是 Android/iOS → HarmonyOS），自动读取源端代码生成翻译规格。

> 详细流程见 `references/translate-operations.md`