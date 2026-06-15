# 流水线 Step 3-5 详细执行规则

## Step 3: 跨端技术方案 — 详细说明

native-analyse 会综合多端代码和知识库，产出跨端通用的技术方案：
- 逐端读取代码/知识库，合并为统一业务流程全貌
- brain-storm 式迭代问询，关键决策点交互确认
- 产出 tech-spec.md（背景 → 现有流程 → 整体设计 → 子任务拆分 → 三板斧）

---

## Step 4: 制定端级实施计划 — 多平台策略

**⚠️ 禁止使用 Agent 工具 fork 子进程来执行 /native-plan**，因为子进程无法加载 native-plan skill，会导致 native-plan 内容缺失。

### 多平台执行（≥2 个平台）

**逐平台在主会话中调用 `/native-plan`**，每个平台一轮：

```
第一轮: /native-plan --platform ios "需求描述"
  → 产出 iOS 端计划 → 等待用户确认
第二轮: /native-plan --platform android "需求描述"
  → 产出 Android 端计划 → 等待用户确认
第三轮: /native-plan --platform harmony "需求描述"（如有）
  → 产出 Harmony 端计划 → 等待用户确认
```

**执行规则：**

1. 按平台拆分模块列表 —— 每轮只传入该平台相关的模块
2. 所有平台共享同一个 tech-spec.md（跨端技术方案）
3. 每个平台计划完成后等待用户确认，再进入下一个平台
4. **⚠️ 每个平台 plan 确认后，必须触发 `native-flow:pipeline:after-plan` 事件（per-platform），禁止跳过**
5. 跨平台依赖冲突时提醒用户（如共享层变更影响所有平台）

### 跨阶段一致性校验（plan ← tech-spec）

每个平台的 plan 完成后，自动校验 plan 子任务是否覆盖 tech-spec 中属于该平台的所有子任务。若存在遗漏，输出差异表并提示用户确认是否补充：

```
⚠️ Plan 覆盖度校验:
tech-spec 子任务 [X] 未在 plan-ios.md 中找到对应项。
请确认: 1) 补充到 plan  2) 标记为不适用  3) 忽略
```

---

## Step 5: 编码实施 — 多平台策略

**⚠️ 禁止使用 Agent 工具 fork 子进程来执行 /native-coding**，因为编码过程需要 brain-storm 式交互，子进程无法与用户直接对话。

native-coding 会：
1. 解析 plan-{platform}.md 中的子任务依赖关系，构建 DAG 并拓扑排序
2. 加载平台规范、架构文档、仓库知识库作为编码准绳
3. 按自下而上的依赖链逐个子任务编码
4. 每个子任务完成后自动调用 `/native-build-fix` 构建验证
5. 构建通过后记录进度，继续下一个子任务

### 多平台执行（≥2 个平台）

**逐平台在主会话中调用 `/native-coding`**，每个平台一轮：

```
第一轮: /native-coding --platform ios
  → 按 iOS 端计划编码 → 逐子任务构建验证
第二轮: /native-coding --platform android
  → 按 Android 端计划编码 → 逐子任务构建验证
第三轮: /native-coding --platform harmony（如有）
  → 按 Harmony 端计划编码 → 逐子任务构建验证
```

**执行规则：**

1. 按平台拆分 — 每轮只编码该平台 plan-{platform}.md 中的子任务
2. 共享层子任务在第一个平台的编码中完成，后续平台复用产出
3. 每个平台编码完成后等待用户确认，再进入下一个平台
4. **⚠️ 每个平台编码完成后，必须触发 `native-flow:pipeline:after-coding` 事件（per-platform），禁止跳过**
5. 编码中断后可通过 `/native-coding` 从断点恢复

### 跨阶段一致性校验（coding ← plan）

每个平台编码完成后，自动校验 coding-progress 中的已完成子任务是否覆盖 plan-{platform}.md 中的所有子任务。若存在遗漏，输出差异表并提示用户确认：

```
⚠️ Coding 覆盖度校验:
plan-ios.md 子任务 [Y] 未在 coding-progress-ios.json 中标记为 done。
请确认: 1) 继续编码  2) 标记为不适用  3) 忽略
```

### 需求回溯校验（coding → 原始需求）

所有平台编码完成后，回溯 `project-info.json` 中的 `description` 和 `tech-spec.md` 中的需求要点，逐条确认是否已被代码实现覆盖。输出回溯报告：

```
📋 需求回溯报告:
✅ 需求点 1: [描述] → 已覆盖（plan-ios 子任务 A, coding 文件 X）
✅ 需求点 2: [描述] → 已覆盖（plan-android 子任务 B, coding 文件 Y）
❓ 需求点 3: [描述] → 未找到明确对应，请用户确认
```