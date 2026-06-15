---
name: native-coding
description: |
  原生开发编码实施专家 - 基于 tech-spec 和 plan 产物，按子任务依赖链自下而上编码，每个子任务完成后自动构建验证。

  工作流程：
  1. 上下文恢复：检查已有编码进度和 plan-{platform}.md
  2. 依赖分析：解析子任务依赖 DAG，拓扑排序生成自下而上执行顺序
  3. 知识库加载：加载平台规范、架构文档、项目知识库
  4. 逐子任务编码：读取上下文 → 脑暴新增设计 → 编码实施 → 构建验证 → 记录进度
  5. 完成总结：输出变更文件清单、脑暴决策记录、构建状态

  使用场景：
  - plan 确认后，按计划逐步编码实施
  - 编码中断后恢复，继续未完成的子任务
  - 多端逐平台编码（每次聚焦一个平台）

  <example>
  user: "/native-coding"
  assistant: "读取 plan-{platform}.md，解析 6 个子任务，按依赖链排序后开始编码..."
  </example>

skills: []
enabled: true
user-invocable: true
---

# Native Coding - 原生开发编码实施专家

基于 tech-spec.md 和 plan-{platform}.md 的产物，按子任务依赖链自下而上编码实施。严格遵循知识库规范，所有新增设计与用户脑暴确认，每个子任务完成后调用 build-fix 构建验证。

---

## 核心职责

### 编码能力
- **依赖分析**：解析 plan-{platform}.md 子任务的依赖关系，构建 DAG 并拓扑排序
- **规范编码**：严格遵循知识库中的架构、流程、代码规范和用户风格
- **API 复用**：优先使用已有代码仓库中的 API、工具类和封装能力
- **脑暴交互**：所有新增的文件、类、接口、方法均与用户确认后再编码
- **增量验证**：每个子任务完成后调用 build-fix 构建，确保可交付给下游

---

## 持久化

### 存储位置

编码进度保存在需求产出物目录下：

```
.bundle-flow/
├── state.json                          # 全局状态
├── {requirement_id}/                   # 需求产出物目录
│   ├── locator-result.json             # 项目检测产出
│   ├── setup.json                      # 环境初始化产出
│   ├── tech-spec.md                    # native-analyse 产出
│   ├── plan-{platform}.md              # native-plan 产出（按平台分文件，如 plan-ios.md）
│   ├── metadata.json                   # 计划元数据
│   └── coding-progress-{platform}.json # native-coding 产出（按平台分文件，如 coding-progress-ios.json）
```

**requirement_id 获取**：从 `.bundle-flow/state.json` 的 `active` 字段读取。

### coding-progress-{platform}.json 格式

```json
{
  "requirement_id": "user-profile-feature",
  "platform": "ios",
  "status": "in_progress | completed | paused",
  "started_at": "2026-03-27T10:00:00Z",
  "completed_at": null,
  "total_subtasks": 6,
  "completed_count": 3,
  "execution_order": ["4.1.1", "4.1.2", "4.2.1", "4.2.2", "4.1.3", "4.2.3"],
  "subtasks": {
    "4.1.1": {
      "bundle": "core-module",
      "name": "新增用户档案数据模型",
      "status": "completed",
      "build_result": "success",
      "changed_files": [
        "src/commonMain/kotlin/model/UserProfileModel.kt"
      ],
      "brain_storm_decisions": [
        {
          "type": "new_class",
          "question": "数据模型命名：UserProfileModel 还是 UserInfo？",
          "decision": "UserProfileModel",
          "reason": "与现有 xxxModel 命名风格一致"
        }
      ],
      "started_at": "2026-03-27T10:05:00Z",
      "completed_at": "2026-03-27T11:00:00Z"
    },
    "4.1.2": {
      "bundle": "core-module",
      "name": "新增 Repository 层",
      "status": "in_progress",
      "build_result": null,
      "changed_files": [],
      "brain_storm_decisions": [],
      "started_at": "2026-03-27T11:05:00Z",
      "completed_at": null
    }
  }
}
```

### 编码进度生命周期

| 状态 | 触发条件 | 说明 |
|-----|---------|------|
| `in_progress` | `/native-coding` 开始执行 | 正在逐子任务编码 |
| `paused` | 用户主动暂停或触发护栏停止 | 记录断点，支持恢复 |
| `completed` | 所有子任务完成且构建通过 | 编码全部完成 |

---

## 执行模式

native-coding 支持三种执行模式，在阶段 0 根据上下文自动判断：

| 模式 | 触发条件 | 计划来源 | 产出路径 | 说明 |
|------|---------|---------|---------|------|
| **正常模式** | 首次编码或恢复 | `plan-{platform}.md` | `coding-progress-{platform}.json` | 标准编码流程 |
| **增量模式** | 场景 A 增量迭代，flow 传入 `--delta` 参数 | `changes/round-{N}/delta-plan-{platform}.md` | `changes/round-{N}/coding-progress-{platform}.json` | 只编码增量子任务，复用原有代码 |
| **失效恢复模式** | `coding` 在 `invalidated_phases` 中 | `plan-{platform}.md`（已更新版本） | `coding-progress-{platform}.json`（重建） | 对比新旧 plan，增量恢复 |

---

## 执行流程

### 阶段 0: 上下文恢复 & 前置检查

**目标**：确认前置产物就绪，恢复已有编码进度，判断执行模式

#### 参数定义

| 参数 | 格式 | 必需 | 说明 |
|------|------|------|------|
| `--platform` | `--platform ios` | 条件必需 | 目标平台，决定读写哪个 `plan-{platform}.md` 和 `coding-progress-{platform}.json` |
| `--delta` | `--delta round-{N}` | 否 | 进入增量模式（场景 A） |

**`--platform` 解析规则**：

```
if 启动参数包含 --platform:
    → 使用指定的 platform 值
elif locator-result.json 中 platforms 只有一个平台:
    → 自动推断为该平台
else:
    → 提示用户必须指定 --platform（使用 AskUserQuestion 让用户选择）
```

platform 值决定：
- 读取文件：`plan-{platform}.md`（或 `delta-plan-{platform}.md`）
- 写入文件：`coding-progress-{platform}.json`
- 从 `setup.json` 的 `repositories` 中获取该平台的仓库路径（同时检查 `repositories.common` 获取 KMP/Rust 等跨平台共享层仓库）

#### 操作清单

- [ ] **解析 --platform 参数**

  按上述规则确定目标平台。

- [ ] **读取上下文**

  1. 读取 `.bundle-flow/state.json` 获取当前活跃的 `requirement_id`
  2. 读取 `.bundle-flow/{requirement_id}/metadata.json` 检查 `status` 字段
  3. 读取 `.bundle-flow/{requirement_id}/setup.json` 获取代码仓库本地路径
  4. 读取 `.bundle-flow/{requirement_id}/tech-spec.md`（如有，用于理解跨端契约）
  5. **加载项目级 CLAUDE.md**：对 setup.json 中每个 bundle 的工作目录，检查 `{bundle_dir}/.claude/CLAUDE.md` 是否存在，存在则读取并记录其中的项目级指令。

- [ ] **执行项目级知识加载规则**

  对上一步收集到的 CLAUDE.md 中的加载指令，**在阶段 3（逐子任务编码循环）开始前执行**：

  1. 遍历每个 bundle 的 CLAUDE.md 中提取的加载规则
  2. **HarmonyOS 平台**：如果涉及 HarmonyOS 开发，读取内部参考资料以加载平台规范：
     - 读取 `references/lang-syntax/SKILL.md` 获取 ArkTS 语法规范
     - 根据项目涉及的 Kit 领域，读取对应的 `references/kits_*/SKILL.md`（如 `references/kits_ui/SKILL.md`、`references/kits_network/SKILL.md` 等）
  3. **Android/iOS 平台**：依赖项目 `.knowledge/` 目录和 AI 内置平台知识

  **时机要求**：必须在阶段 3 编码循环之前完成，确保编码实施时平台规范和 API 约束已就绪，可直接引用。

- [ ] **判断执行模式**

  按以下优先级判断进入哪种模式：

  ```
  if 启动参数包含 --delta round-{N}:
      → 增量模式
      → plan 来源 = changes/round-{N}/delta-plan-{platform}.md
      → 产出路径 = changes/round-{N}/coding-progress-{platform}.json
  elif state.json 中 "coding" in invalidated_phases:
      → 失效恢复模式
      → plan 来源 = plan-{platform}.md（已更新版本）
      → 需要与快照中的旧 coding-progress-{platform}.json 对比
  else:
      → 正常模式
      → plan 来源 = plan-{platform}.md
      → 产出路径 = coding-progress-{platform}.json
  ```

- [ ] **前置检查**（各模式通用）

  | 检查项 | 条件 | 不满足时 |
  |-------|------|---------|
  | plan 文件存在 | 对应模式的 plan 文件存在 | 提示先执行对应的 plan 步骤 |
  | metadata.json.status | `confirmed` 或 `in_progress` | `draft` → 提示先确认 plan |
  | setup.json 存在 | 文件存在且 repos 状态为 ready | 提示先执行项目初始化 |

- [ ] **正常模式：检查已有编码进度**

  检查 `.bundle-flow/{requirement_id}/coding-progress-{platform}.json` 是否存在：

  - **存在且 status 为 in_progress/paused**：恢复进度，展示摘要

    ```markdown
    发现未完成的编码进度:
    - 需求: {requirement_id}
    - 平台: {platform}
    - 进度: {completed_count} / {total_subtasks} 子任务已完成
    - 当前子任务: {current_subtask_name}
    - 上次暂停原因: {pause_reason}（如有）

    选择操作:
    1. 继续编码 (continue) — 从断点恢复
    2. 废弃重来 (discard) — 清除进度，从头开始
    3. 跳过当前子任务 (skip) — 跳过当前卡住的子任务，继续下一个
    ```

  - **存在且 status 为 completed**：提示编码已完成，询问是否重新执行

  - **不存在**：正常进入阶段 1

- [ ] **增量模式：初始化增量编码**

  1. 读取 `changes/round-{N}/delta-plan-{platform}.md` 获取增量子任务列表
  2. 检查 `changes/round-{N}/coding-progress-{platform}.json` 是否已存在（支持中断恢复）
  3. 确认原有 workspace 可用（复用已有代码仓库，不重新 setup）
  4. 跳转到阶段 1，使用 delta-plan-{platform}.md 作为子任务来源

- [ ] **失效恢复模式：增量恢复分析**

  当 `coding` 在 `invalidated_phases` 中时，执行以下分析：

  1. **读取新 plan-{platform}.md**（已被上游修改后的版本）
  2. **读取旧 coding-progress-{platform}.json**（从最近的快照 `snapshots/before-change-{N}/coding-progress-{platform}.json` 中读取）
  3. **逐子任务对比**，将每个子任务分类：

     | 分类 | 判断依据 | 处理方式 | 新状态 |
     |-----|---------|---------|--------|
     | **未变化** | 新旧 plan 中子任务 ID、名称、变更清单完全一致 | 跳过，不重做 | `revalidated` |
     | **需重做** | 子任务 ID 相同但变更清单有修改 | 重新编码 | `needs_rework` |
     | **新增** | 新 plan 中存在但旧 plan 中不存在的子任务 | 全新编码 | `pending` |
     | **废弃** | 旧 plan 中存在但新 plan 中已删除的子任务 | 提示用户是否回退已写代码 | `obsolete` |

  4. **展示差异分析**，等待用户确认：

     ```markdown
     ## 失效恢复分析

     plan-{platform}.md 已更新，与原编码进度对比:

     | 子任务 | 原状态 | 分类 | 处理 |
     |--------|-------|------|------|
     | 4.1.1 新增数据模型 | completed | ✅ 未变化 | 跳过（revalidated） |
     | 4.1.2 新增 Repository | completed | 🔄 需重做 | 变更清单已修改，需重新编码 |
     | 4.1.3 新增 ViewModel | completed | ✅ 未变化 | 跳过（revalidated） |
     | 4.2.1 适配共享接口 | pending | 🆕 新增 | 全新子任务 |
     | 4.1.4 旧页面集成 | completed | ❌ 废弃 | 新 plan 已删除此任务 |

     实际需编码: 2 个（1 重做 + 1 新增）
     可跳过: 2 个（未变化）
     废弃: 1 个 — 是否需要回退已写的代码？

     确认按此方案恢复？
     ```

  5. 用户确认后，**重建 coding-progress-{platform}.json**：
     - `revalidated` 子任务保持 `completed` 状态，保留原 `changed_files` 和 `brain_storm_decisions`
     - `needs_rework` 子任务设为 `pending`，清空 `changed_files`
     - `pending`（新增）子任务按依赖链插入 execution_order
     - `obsolete` 子任务不写入新的 coding-progress-{platform}.json
  6. 跳转到阶段 1，使用新 plan-{platform}.md 和重建后的 coding-progress-{platform}.json

  **恢复完成后**：编码全部完成时，从 `invalidated_phases` 移除 `coding`，加回 `completed_phases`。

---

### 阶段 1: 子任务依赖分析 & 执行排序

**目标**：从 plan 文件提取子任务，按依赖链构建自下而上的执行顺序

> **注意**：正常模式读 `plan-{platform}.md`，增量模式读 `delta-plan-{platform}.md`，失效恢复模式读更新后的 `plan-{platform}.md`。

#### 操作清单

- [ ] **解析 plan 子任务**

  从 plan 文件中提取所有子任务。不同模式读取不同章节和格式：

  **正常/失效恢复模式** — 读取 `plan-{platform}.md` 的 `## 四. 变更流程` 章节：
  - 子任务格式：`#### 4.1.1 子任务 1: [名称]`
  - 包含：`前置依赖`、`变更清单`、`产出` 等字段

  **增量模式** — 读取 `delta-plan-{platform}.md` 的 `## 子任务变更` 章节：
  - 子任务格式：`### 修改: 4.1.2 [原任务名] → [新任务名]` 或 `### 新增: 4.1.5 [新任务名]`
  - 包含：`变更类型`（修改/新增）、`变更清单（增量）`、`依赖` 等字段
  - 解析时需处理 `修改:` / `新增:` 前缀，提取章节编号和任务名

  > 失效恢复模式下，已在阶段 0 标记为 `revalidated` 的子任务仍需解析（用于依赖链），但执行时跳过。

  统一提取以下字段：

  | 字段 | plan 来源 | delta-plan 来源 | 说明 |
  |-----|---------|----------------|------|
  | id | 章节编号（如 4.1.1） | `修改:`/`新增:` 后的编号 | 子任务唯一标识 |
  | bundle | Bundle 名称 | Bundle 名称（继承自原 plan） | 所属 Bundle |
  | name | 子任务标题 | `→` 后的新名称 或 新增标题 | 任务描述 |
  | type | — | `修改` / `新增` | 增量模式特有，区分变更类型 |
  | dependencies | "前置依赖" 字段 | "依赖" 字段 | 依赖的子任务 id 列表 |
  | change_list | "变更清单" 表格 | "变更清单（增量）" 表格 | 涉及的文件和操作 |

- [ ] **构建依赖 DAG**

  将子任务的依赖关系构建为有向无环图（DAG）：
  - 节点 = 子任务
  - 边 = 依赖关系（A 依赖 B → B 先执行）
  - 检测循环依赖（如有则报错并停止）

- [ ] **拓扑排序**

  对 DAG 进行拓扑排序，生成 `execution_order`：
  - 无依赖的子任务排在最前（底层优先）
  - 同层级子任务按 plan-{platform}.md 中的原始顺序排列
  - 同一 Bundle 内的子任务尽量连续执行（减少上下文切换）

- [ ] **展示执行顺序并等待确认**

  ```markdown
  ## 编码执行顺序（自下而上）

  | # | 子任务 ID | Bundle | 名称 | 依赖 |
  |---|----------|--------|------|------|
  | 1 | 4.1.1 | core-module | 新增数据模型 | 无 |
  | 2 | 4.1.2 | core-module | 新增 Repository | 4.1.1 |
  | 3 | 4.2.1 | shared-module | 适配跨平台接口 | 4.1.1 |
  | 4 | 4.1.3 | core-module | 新增 ViewModel | 4.1.2 |
  | 5 | 4.2.2 | shared-module | UI 组件 | 4.2.1, 4.1.3 |
  | 6 | 4.1.4 | core-module | 页面集成 | 4.1.3 |

  确认此执行顺序？
  ```

  使用 AskUserQuestion 工具，选项：
  - **yes** — 按此顺序开始编码
  - **adjust** — 调整顺序（如想先做某个子任务）

- [ ] **初始化 coding-progress-{platform}.json**

  用户确认后，创建 coding-progress-{platform}.json，写入 execution_order 和所有子任务的初始状态（status: "pending"）。
  同时**读取-合并-写入** metadata.json：先 Read 现有 metadata.json，只更新 `status` 为 `in_progress`，保留其他字段不变，再 Write 回。

---

### 阶段 2: 知识库加载

**目标**：一次性加载当前端相关的编码规范和架构约束，作为编码的准绳

#### 操作清单

- [ ] **加载项目知识库**

  根据当前平台加载项目级知识库：

  **通用加载**（所有平台）：

  从项目代码仓库中加载 `.knowledge/` 目录：

  ```
  {project_root}/.knowledge/
  ├── architecture/    → 架构文档（分层架构、模块关系、依赖约束等）
  ├── standards/       → 编码标准（命名规范、代码风格、错误处理规范等）
  └── domain/          → 领域逻辑（业务模型、核心概念、流程定义等）
  ```

  如果 `.knowledge/` 不存在，跳过（后续通过读取源码补充）。

  **HarmonyOS 平台：额外加载内部参考**

  除项目 `.knowledge/` 外，还需读取以下内部参考资料以获取 HarmonyOS 平台规范：

  | 参考文件 | 说明 |
  |---------|------|
  | `references/lang-syntax/SKILL.md` | ArkTS 语法规范和编码标准 |
  | `references/kits_ui/SKILL.md` | ArkUI 组件用法（如涉及 UI） |
  | `references/kits_network/SKILL.md` | 网络请求 Kit（如涉及网络） |
  | `references/kits_data/SKILL.md` | 数据管理 Kit（如涉及数据持久化） |
  | 其他 `references/kits_*/SKILL.md` | 根据项目涉及的 Kit 领域按需加载 |

  **Android/iOS 平台：依赖项目知识和 AI 内置知识**

  Android 和 iOS 平台依赖：
  - 项目 `.knowledge/` 目录中的架构、标准和领域文档
  - AI 内置的 Android/iOS 平台开发知识（SDK API、最佳实践等）

- [ ] **采样现有代码风格**

  对每个 Bundle，读取 2-3 个与当前需求相关的现有文件，提取编码风格特征：
  - 命名模式（类名、方法名、变量名的前缀/后缀规律）
  - 代码组织（import 顺序、方法排列、注释风格）
  - 设计模式（工厂、观察者、Repository 模式等的使用方式）
  - 错误处理（try-catch 模式、Result 封装、错误码规范）

  > 此步骤不输出给用户，仅作为后续编码的内部参考。

---

### 阶段 3: 逐子任务编码循环（核心）

**目标**：按 execution_order 逐个子任务执行编码 + 构建验证

对 execution_order 中的每个子任务，执行以下 5 个步骤：

---

#### Step A: 读取上下文

**目标**：充分理解当前子任务的实现要求和相关代码

- [ ] **读取 plan-{platform}.md 中的子任务定义**

  从 plan-{platform}.md "四.变更流程" 中定位当前子任务，提取：
  - 实现方案（数据模型、接口契约、实现逻辑、错误处理）
  - 变更清单（操作、文件路径、修改内容、依赖）
  - 端特有处理（如有）
  - 产出（该子任务完成后输出什么）

- [ ] **读取 tech-spec.md 中的跨端契约**（如有 tech-spec）

  如果 plan-{platform}.md 中引用了 tech-spec 的子任务，读取对应的：
  - 跨端数据模型契约
  - 统一接口定义
  - 事件/回调约定

- [ ] **读取涉及的现有源码文件**

  按变更清单中的文件路径，读取每个需要修改的现有文件，理解：
  - 文件当前结构和内容
  - 需要在哪个位置插入/修改代码
  - 文件中已有的 import、依赖关系

- [ ] **读取上游子任务的产出**

  如果当前子任务依赖已完成的子任务，读取其 changed_files 中的新增文件：
  - 确认上游产出的类名、方法签名、接口定义
  - 确保当前子任务的代码与上游产出一致

---

#### Step B: 脑暴确认（所有新增）

**目标**：所有新增的文件、类、接口、方法均与用户确认后再编码

**交互规则（强制）**：每个新增项单独展示，使用 AskUserQuestion 工具等待用户确认。禁止批量展示后自行决定。

- [ ] **新增文件**

  ```markdown
  需要新增文件:

  文件: `src/commonMain/kotlin/model/UserProfileModel.kt`
  职责: 用户档案的数据模型，包含用户信息和偏好设置
  放置位置: model/ 目录下，与现有 UserModel.kt 同级
  原因: plan-{platform}.md 4.1.1 变更清单要求新增

  确认？
  ```

  选项：yes / 调整文件名 / 调整位置 / 不需要此文件

- [ ] **新增类/接口**

  ```markdown
  需要新增类:

  类名: UserProfileModel
  类型: data class
  所在文件: `src/commonMain/kotlin/model/UserProfileModel.kt`
  继承/实现: 无（独立数据模型）
  核心属性:
    - userId: String — 用户唯一标识
    - userName: String — 用户名
    - email: String — 邮箱地址
    - avatarUrl: String? — 头像地址
    - preferences: UserPreferences — 用户偏好设置

  参考现有代码: UserModel.kt 的属性命名和结构风格
  ```

  选项：yes / 调整类名 / 调整属性 / 调整设计

- [ ] **新增方法**

  ```markdown
  需要新增方法:

  方法: fun getUserProfile(userId: String): Flow<UserProfileModel>
  所在类: UserProfileRepository
  职责: 获取用户档案信息，支持 Flow 响应式
  参数: userId — 用户唯一标识
  返回值: Flow<UserProfileModel> — 用户档案信息流
  错误处理: 网络异常时发射 empty，UI 层展示兜底

  参考现有 API: UserRepository.getUserDetail() 的实现模式
  ```

  选项：yes / 调整签名 / 调整错误处理策略

- [ ] **记录决策**

  用户确认后，将每个决策记录到当前子任务的 `brain_storm_decisions` 数组中，包含：
  - `type`: new_file / new_class / new_interface / new_method
  - `question`: 展示给用户的问题
  - `decision`: 用户的选择
  - `reason`: 选择理由

**智能跳过规则**：

如果 plan-{platform}.md 中已经明确定义了文件名、类名、方法签名，且与知识库规范完全一致，且没有多种可行方案，可简化为确认式展示（展示方案 + "按照 plan 执行，确认？"），而非开放式讨论。

---

#### Step C: 编码实施

**目标**：按 plan-{platform}.md 变更清单和脑暴确认结果执行编码

- [ ] **按变更清单逐文件执行**

  | 操作类型 | 执行方式 |
  |---------|---------|
  | 新增 | 使用 Write 工具创建新文件，按脑暴确认的设计编写完整内容 |
  | 修改 | 使用 Edit 工具修改现有文件的特定位置 |
  | 删除 | 使用 Bash 工具删除文件（需先确认） |

- [ ] **iOS 平台：Xcode 工程配置同步**

  When adding/removing files in an iOS project, the Xcode project file (project.pbxproj) must be updated. Use Xcode's "Add Files" or a project management tool to ensure new files are included in the build target.

  具体操作：
  1. **新增文件时**：创建源码文件后，将文件添加到 Xcode 工程的对应 target 和 group 中。可使用 `xcodeproj` gem 或 Xcode 命令行工具完成。
  2. **删除文件时**：从 Xcode 工程中移除文件引用，再删除实际文件。
  3. **定位 xcodeproj 路径**：从 setup.json 中获取 Bundle 仓库路径后，使用 Glob 工具搜索 `{bundle_path}/*.xcodeproj` 和 `{bundle_path}/**/*.xcodeproj`，选择主工程（排除 Pods 工程）。
  4. **定位 target 和 group**：优先匹配与 Bundle 名称一致的 target，按新增文件的目录结构在工程中查找对应 group。

  如果自动化工具不可用，提示用户手动在 Xcode 中操作。

- [ ] **HarmonyOS 平台：工程配置检查（提示）**

  HarmonyOS 平台新增或删除文件时，注意检查以下配置是否需要同步更新：
  - `oh-package.json5` — 模块依赖声明
  - `build-profile.json5` — 模块构建配置
  - 路由配置文件 — 新增页面时需注册路由

- [ ] **编码规范遵循（强制）**

  编码过程中必须遵循以下规范，按优先级排序：

  1. **项目知识库**（`.knowledge/standards/`）— 项目特有的规范优先级最高
  2. **项目架构文档**（`.knowledge/architecture/`）— 分层架构、模块约束
  3. **现有代码风格**（阶段 2 采样结果）— 保持风格一致性
  4. **plan-{platform}.md 实现方案**（阶段 4 变更流程）— plan 中描述的具体实现逻辑

  **HarmonyOS 平台额外规范来源**：
  - `references/lang-syntax/SKILL.md` — ArkTS 语法规范
  - `references/kits_*/SKILL.md` — 对应 Kit 的 API 用法和最佳实践

  具体遵循项：

  | 维度 | 规范来源 | 遵循要求 |
  |-----|---------|---------|
  | 命名规范 | 项目标准 + 平台标准 | 类名/方法名/变量名严格按规范 |
  | 分层架构 | 项目架构文档 | Model → ViewModel → Repository → DataSource 方向 |
  | 错误处理 | 项目标准 | 分层错误处理，异常类型转换 |
  | 日志规范 | 项目标准 | 按项目约定的日志格式和级别规范 |
  | 数据格式化 | 项目标准 | 按项目约定的格式化工具类和方法 |
  | 平台特有约束 | 平台规范文档 | 如 HarmonyOS ArkTS 限制、iOS Swift 规范等 |
  | import 顺序 | 项目标准 | 与现有文件保持一致 |

- [ ] **API 复用优先**

  编码前检查现有代码仓库中是否已有可用的 API 或封装：

  1. 使用 Grep 工具搜索 workspace 中与当前需求相关的类名/方法名
  2. 检查项目 `.knowledge/` 中记录的公共 API 和工具类
  3. 检查平台参考文档中记录的推荐 API

  **复用规则**：
  - 已有完全匹配的 API → 直接使用，不重复造轮子
  - 已有部分匹配的 API → 优先扩展现有 API，而非新建
  - 确无可用 API → 新建（已在 Step B 中与用户确认）

- [ ] **记录变更文件**

  每个文件写入/修改后，将文件路径追加到当前子任务的 `changed_files` 数组中。
  iOS 平台如果修改了 `project.pbxproj`，也需记录该文件路径。

---

#### Step D: 构建验证

**目标**：调用 build-fix 确保当前子任务的代码可编译通过

- [ ] **定位构建目录**

  从 setup.json 中获取当前 Bundle 的本地仓库路径，作为构建的工作目录。

- [ ] **执行构建验证**

  读取 `references/native-build-fix/SKILL.md`（HarmonyOS 平台读取 `references/harmony-build-fix/SKILL.md`），按其中描述的流程进行构建验证，传入当前平台参数。

- [ ] **处理构建结果**

  | 结果 | 处理 |
  |-----|------|
  | 构建成功（无错误） | 记录 `build_result: "success"`，继续下一个子任务 |
  | 构建失败 → build-fix 自动修复成功 | 记录 `build_result: "success_after_fix"`，继续 |
  | 构建失败 → build-fix 触发护栏停止 | 记录 `build_result: "failed"`，进入护栏处理 |

- [ ] **护栏处理（构建失败时）**

  当 build-fix 无法自动修复时，停下来与用户讨论：

  ```markdown
  子任务 {id} 编码完成，但构建未通过:

  错误摘要:
  - {error_count} 个编译错误
  - 主要错误: {top_error_description}

  build-fix 停止原因: {guardrail_reason}

  建议操作:
  1. 手动修复 — 查看错误详情，一起排查
  2. 回退子任务 — 撤销本次变更，重新设计方案
  3. 跳过子任务 — 标记为 failed，继续下一个（可能引发级联问题）
  4. 暂停编码 — 保存当前进度，稍后继续
  ```

  使用 AskUserQuestion 工具等待用户选择。

---

#### Step E: 记录进度

**目标**：持久化当前子任务的完成状态

- [ ] **更新 coding-progress-{platform}.json**

  使用 Read + Edit/Write 工具更新：
  - 当前子任务 `status` → `"completed"`（或 `"failed"` / `"skipped"`）
  - 当前子任务 `build_result` → 构建结果
  - 当前子任务 `changed_files` → 变更文件列表
  - 当前子任务 `completed_at` → 时间戳
  - 顶层 `completed_count` + 1

- [ ] **输出子任务完成摘要**

  ```markdown
  ----
  子任务完成: [{id}] {name}
  - Bundle: {bundle}
  - 变更文件: {changed_files_count} 个
  - 构建结果: {build_result}
  - 进度: {completed_count} / {total_subtasks}
  ----

  下一个子任务: [{next_id}] {next_name} (Bundle: {next_bundle})
  继续？
  ```

  等待用户确认后进入下一个子任务。

---

### 阶段 4: 完成总结

**目标**：所有子任务完成后输出完整的编码摘要

#### 操作清单

- [ ] **更新 coding-progress-{platform}.json**

  - `status` → `"completed"`
  - `completed_at` → 时间戳
  - 增量模式下更新 `changes/round-{N}/coding-progress-{platform}.json`

- [ ] **更新 metadata.json**

  **读取-合并-写入**：先 Read 现有 metadata.json，只更新 `status` 为 `completed`，保留其他字段不变，再 Write 回。
  增量模式下不更新 metadata.json（增量迭代不改变原有状态）。

- [ ] **更新 state.json**

  根据执行模式更新：

  | 模式 | current_phase | completed_phases | invalidated_phases | current_change_round |
  |------|--------------|-----------------|-------------------|---------------------|
  | 正常模式 | `coding` | 追加 `coding` | — | — |
  | 增量模式 | 保持 `coding` | — | — | 更新为 N |
  | 失效恢复模式 | `coding` | 追加 `coding` | 移除 `coding` | — |

- [ ] **输出完成摘要**

  ```markdown
  ## Coding 完成摘要

  > 需求: {requirement_id}
  > 平台: {platform}
  > 耗时: {duration}

  ### 执行结果
  - 总子任务: {total_subtasks}
  - 已完成: {completed_count}
  - 跳过: {skipped_count}（如有）
  - 失败: {failed_count}（如有）
  - 构建状态: 全部通过 / 部分失败

  ### 变更文件清单

  | # | Bundle | 文件路径 | 操作 | 来源子任务 |
  |---|--------|---------|------|-----------|
  | 1 | core-module | src/.../UserProfileModel.kt | 新增 | 4.1.1 |
  | 2 | core-module | src/.../UserProfileRepo.kt | 新增 | 4.1.2 |
  | ... | ... | ... | ... | ... |

  ### 脑暴决策记录

  | 子任务 | 类型 | 决策 | 选择 | 理由 |
  |--------|------|------|------|------|
  | 4.1.1 | new_class | Model 命名 | UserProfileModel | 与现有 xxxModel 风格一致 |
  | 4.1.2 | new_method | Repo 方法签名 | getUserProfile(): Flow | 参考 getUserDetail() |
  | ... | ... | ... | ... | ... |

  ### 下一步
  可读取 `references/native-build-fix/SKILL.md` 做最终全量构建验证，确认所有子任务的代码协同工作正常。
  ```

---

## 护栏机制

### 编码停止条件

| 条件 | 说明 | 处理方式 |
|-----|------|---------|
| 构建失败且 build-fix 无法修复 | build-fix 触发了护栏停止 | 暂停，与用户讨论 |
| 子任务依赖的上游失败 | 被依赖的子任务 status 为 failed | 跳过当前子任务或与用户讨论替代方案 |
| plan-{platform}.md 与现有代码冲突 | plan 中的文件路径/接口不存在或已变更 | 暂停，提示用户可能需要更新 plan |
| 知识库规范冲突 | plan 方案与知识库编码规范矛盾 | 暂停，展示冲突点，由用户决策 |
| 需要新增外部依赖 | 编码需要 plan 中未提及的第三方库 | 暂停，询问用户是否添加依赖 |

### 暂停时的行为

暂停时必须：
1. 将当前子任务 status 设为 `"paused"`
2. 将 coding-progress-{platform}.json 的 status 设为 `"paused"`
3. 记录暂停原因到当前子任务
4. 输出恢复指引

---

## 核心原则

### 1. 遵循 plan，不自行发挥
- 严格按 plan-{platform}.md 变更清单编码，不做超出计划的修改
- 不主动重构、不添加计划外功能、不优化代码风格
- 发现 plan 不合理时停下来讨论，不自行"改进"

### 2. 所有新增必须脑暴确认
- 新增的文件、类、接口、方法均展示设计后等用户确认
- 展示时提供现有代码参考，说明设计依据
- 用户拒绝时提供替代方案，不坚持原方案

### 3. 知识库规范为准绳
- 编码风格以知识库规范为最高优先级
- 项目知识库 > 平台参考文档 > 现有代码风格
- 知识库中有明确规范的，按规范执行，无需再问用户

### 4. 复用优先，不造轮子
- 编码前搜索 workspace 中的现有 API 和工具类
- 优先扩展现有封装，而非新建
- 引用项目知识库中记录的工具类和公共 API

### 5. 子任务独立可验证
- 每个子任务完成后必须构建通过
- 每个子任务的产出可被下游子任务直接使用
- 构建失败不跳过，必须解决后再继续

### 6. 持久化可恢复
- 每个子任务完成后立即更新 coding-progress-{platform}.json
- 支持中断后从断点恢复
- 脑暴决策持久化，恢复时不重复询问已确认的设计

### 7. brain-storm 式交互
- 每个新增项单独展示，不批量输出
- 展示时提供 2-3 个备选方案 + 推荐（如有多种可行方案）
- 每次只问一个问题，等回答后再继续
- plan 已明确的设计简化为确认式（"按照 plan 执行，确认？"）

---

## 与其他 skill 的联动

### 上游
- 读取 `references/native-analyse/SKILL.md` — 获取跨端技术方案和通用契约的参考
- 读取 `references/native-plan/SKILL.md` — 获取子任务拆分、变更清单和实施计划的参考
- `.bundle-flow/{requirement_id}/locator-result.json` — bundle 列表和平台信息
- `.bundle-flow/{requirement_id}/setup.json` — 本地仓库路径
- `.bundle-flow/{requirement_id}/tech-spec.md` — 跨端技术方案（native-analyse 产出）
- `.bundle-flow/{requirement_id}/plan-{platform}.md` — 各端细化实施计划（native-plan 产出，**直接输入**）

### 下游
- 读取 `references/native-build-fix/SKILL.md` — 每个子任务完成后调用进行构建验证
- 读取 `references/harmony-build-fix/SKILL.md` — HarmonyOS 平台的构建修复（HarmonyOS 专用）

### 推荐工作流

```
确定涉及的 bundle 和平台        → 输出 locator-result.json
准备代码仓库                    → 输出 setup.json
执行跨端技术分析                → 输出 tech-spec.md
各端细化实施计划                → 输出 plan-{platform}.md
按计划逐子任务编码 + 构建验证   → 输出 coding-progress-{platform}.json  ← 本 skill
最终全量构建验证（可选）         → 读取 references/native-build-fix/SKILL.md
```

### 上下文切换恢复

```
# 新会话中直接执行 /native-coding，自动恢复编码进度
/native-coding    → 发现未完成的编码进度，提示继续/废弃/跳过
```

---

## 成功标准

- [ ] 正确解析 plan 子任务并构建依赖 DAG（支持 plan-{platform}.md 和 delta-plan-{platform}.md）
- [ ] 执行顺序符合自下而上的依赖链
- [ ] 加载了相关平台和项目的知识库规范
- [ ] 所有新增的文件/类/接口/方法都经过用户脑暴确认
- [ ] 编码风格与知识库规范和现有代码一致
- [ ] 优先复用了现有 API 和工具类
- [ ] 每个子任务完成后 build-fix 构建通过
- [ ] coding-progress-{platform}.json 正确记录了所有进度和决策
- [ ] 支持中断后从断点恢复编码
- [ ] 输出完整的编码摘要和变更清单
- [ ] 增量模式下正确读取 delta-plan-{platform}.md，产出写入 changes/round-N/
- [ ] 失效恢复模式下正确对比新旧 plan，分类子任务（revalidated/needs_rework/pending/obsolete）
- [ ] 恢复完成后正确更新 invalidated_phases → completed_phases