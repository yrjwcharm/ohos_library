---
name: hmos-multidevice-screen-window-size
description: HarmonyOS 多设备屏幕窗口尺寸适配。当任务涉及以下任一场景时必须调用：（1）比价与分屏：比价/比价场景/比价窗口/价格对比/创建新窗口/多窗口并行/双窗口；（2）平行视界与分栏：平行视界/EasyGo/easy_go.json/分栏效果/分栏布局/列表详情分栏/navigationSplit/routerSplit/Navigation分栏；（3）响应式与自适应布局：响应式布局/自适应布局/断点/GridRow/GridCol/WidthBreakpoint/HeightBreakpoint/重复布局/分栏布局/挪移布局/缩进布局；（4）窗口监听：windowSizeChange/窗口尺寸变化/布局未同步更新；（5）组件自适应：layoutWeight/Blank/aspectRatio/displayPriority/FlexWrap/拉伸/均分/隐藏/折行/缩放/占比/百分比宽度；（6）多设备适配：手机/平板/2in1/穿戴/折叠屏/双折/三折/大屏/横竖屏/密度/字体缩放/滚动延伸；（7）布局异常：截断/留白/溢出/遮挡/错位/对齐异常/GridRow不降列/断点不切换/图片变形/压缩。不适用于：FoldStatus、hover、折痕、安全区、与尺寸无关的调整。
metadata:
  version: 1.0.1
  keywords:
    - 自适应布局
    - 响应式布局
    - 屏幕窗口尺寸
    - 窗口尺寸变化
    - 双折
    - 三折
    - 平板
    - 大屏
    - GridRow
    - GridCol
    - WidthBreakpoint
    - HeightBreakpoint
    - windowSizeChange
    - 平行视界
    - EasyGo
    - 应用内分屏
    - 分栏布局
    - 列表详情
    - 截断
    - 留白
    - 溢出
    - 错位
    - aspectRatio
    - displayPriority
    - 多设备资源
    - 资源限定词
    - 分层参数
    - 资源差异化
---

# 屏幕窗口尺寸适配

## 技能定义

| 字段 | 内容                                       |
| --- |------------------------------------------|
| `skill_id` | `screen-window-size`                     |
| `skill_name` | `屏幕窗口尺寸适配`                               |
| `one_line_purpose` | 为多设备布局提供断点策略、结构切换策略和窗口监听策略。              |
| `device_scope` | `phone / tablet / tv / 2in1 / wearable`          |
| `problem_scope` | `断点体系、响应式布局、自适应布局、窗口变化监听、媒体查询、字体缩放、显示密度` |
| `not_in_scope` | `纯业务逻辑重构、与尺寸无关的视觉微调`                     |

## 核心约束

- 所有窗口尺寸适配场景都必须先命中 `SIZE-00`
- 先判断问题属于组件级自适应还是页面级响应式，再选方案。
- 优先复用统一断点体系，不要引入与现有阈值冲突的新断点。
- 涉及结构切换时，优先使用 `GridRow`、`GridCol` 或其他响应式容器，而不是零散条件分支。
- 涉及窗口变化监听时，必须说明监听入口、状态同步和取消监听逻辑。
- 需要横向窗口或特殊比例支持时，必须说明宽度、纵向断点或高宽比谁是主判定条件。
- 未给出不同断点下的结构变化和内容取舍前，不得宣称方案完整。
- `FIX` 阶段必须先保护单屏基线体验，再处理多屏问题；禁止出现“多屏改善但单屏明显退化”。
- 针对图片拉伸问题，优先修复“容器约束与渲染模式”的根因，禁止通过人为拉伸系数制造或掩盖问题。
- 仅修复图片拉伸时，不得通过限制整页主内容宽度制造大面积留白；优先限制目标图片的渲染宽度或容器策略。
- **资源收集强制流程**：决策树走完后，**必须执行资源收集步骤**（步骤 10），将所有命中场景的 `resource_refs` 合并去重，逐一读取全部资源文件后才能输出实施方案；**禁止在资源未读取完毕时输出代码或方案**。
- **平行视界优先约束**：当用户需求中明确提及「平行视界」「EasyGo」或「easy_go.json」时，**必须优先使用 EasyGo 系统配置方案（SIZE-07）**，禁止使用 Navigation `.mode(NavigationMode.Split)` / `SideBarContainer` 等手动分栏代码替代。EasyGo 方案通过 `easy_go.json` 配置文件 + `module.json5` 声明实现，页面代码保持普通 Stack 导航与 `pushPath`，由系统自动在宽屏设备上接管分栏；禁止在命中 SIZE-07 时同时手写 `NavigationMode.Split` 切换逻辑。
- **Navigation 分栏简化优先约束**：在非 EasyGo 场景下需要实现 Navigation 单/双栏切换时，**优先使用 `NavigationMode.Auto`**，系统自动在 ≤600vp 时使用 Stack、>600vp 时使用 Split，无需引入 `WidthBreakpoint`、`@StorageProp` 或 `windowSizeChange` 监听代码。仅在需要自定义断点阈值、运行时动态切换（如聊天场景全屏回退）、或不同断点差异化 `navBarWidth` 时才使用手动断点切换。详见 RESP-02 方案选择表。
- **SKILL 方案优先约束**：断点、布局、窗口监听相关的 API 和实现方式，**必须仅使用本技能资源（`references/` 和 `assets/` 目录下的文件）中明确记录的方案**。禁止使用训练数据中记忆但未在本技能资源中出现的 API（例如 `GridRow.onBreakpointChange` 未出现在任何 reference 或 asset 文件中，不得使用）。当训练知识与技能文档方案冲突时，以技能文档为准。输出代码前，应先对照已读取的资源文件确认所用 API 是否有文档依据。
- **HDS 组件升级提示**：当 DEV 阶段涉及以下常规 ArkUI 组件的多设备布局时，应主动提示用户可考虑使用 HDS（UI Design Kit）增强组件以获得更好的跨设备体验和更少的适配代码：
  - `SideBarContainer` / `Navigation` 分栏 → `HdsSideBar`（内置 embed/overlay 双模式，自动安全区处理）
  - `Tabs` 底部页签 → `HdsTabs`（内置悬浮样式 `barFloatingStyle` 支持三断点响应式宽度、迷你栏、沉浸光感）
  - `List` / `ListItem` → `HdsListItem` / `HdsListItemCard`（内置横滑操作和卡片样式）
  - `MultiWindowEntry` 应用内分屏（非 HDS 版）→ `MultiWindowEntryInAPP`（专为折叠/平板大屏优化）
  - HDS 组件详细 API 和示例参见 `../hmos-multidevice-scenario-entry/references/hds-ui-design-kit.md`，路由入口为 `SCENE-09`。
  - **升级建议不构成强制要求**；用户明确选择常规组件时，仍以本技能方案为准。

## 阶段标签

| 标签 | 阶段 | 当前模块关注点 |
| --- | --- | --- |
| `REQ` | 需求分析设计 | 断点边界、设备范围、结构变化原则 |
| `DEV` | 开发 | 断点状态管理、容器选型、监听落点 |
| `FIX` | 问题修复 | 断点错配、布局断裂、状态未同步 |
| `VAL` | 功能验证 | 断点切换证据、窗口变化证据、布局稳定性 |

## 统一输出字段

- 路由字段：`active_phases`、`primary_phase`、`primary_scene`、`secondary_scenes`、`resources_used`
- `REQ`：`device_constraints`、`capability_boundary`、`acceptance_focus`
- `DEV`：`code_touchpoints`、`reuse_resources`、`implementation_notes`、`integration_risks`
- `FIX`：`problem_profile`、`root_cause_hypothesis`、`fix_plan`、`regression_watchlist`
- `VAL`：`verification_matrix`、`evidence_requirements`、`pass_criteria`、`residual_risks`

## 字段释义

- `device_constraints`：指由设备形态、窗口状态、输入方式或系统区域带来的适配硬约束。在 `screen-window-size` 中，通常是断点范围、主判定维度和不同尺寸下是否发生结构切换。它不是 API 列表，也不是代码修改点。
- `capability_boundary`：指当前方案支持到哪里、不支持什么、在哪些设备或窗口条件下需要降级或不处理。
- `acceptance_focus`：指需求阶段验收时必须重点确认的现象、证据或边界条件。

## 场景决策树

```
开始
  │
  ├─→ 步骤1: 所有窗口尺寸适配场景，必须先命中 `SIZE-00`（适配规格）→ 步骤2
  │
  ├─→ 步骤2: 判断问题类型
  │     └─→ 异常修复类：组件尺寸截断 / 留白 / 溢出 / 压缩；偏移 / 错位 / 对齐异常；
  │           层级错乱 / 堆叠 / 遮挡 / GridRow 不降列；layoutWeight / Blank / aspectRatio 不生效
  │           → 命中 `SIZE-05` → 步骤3
  │     └─→ 非异常修复类（新需求 / 布局优化 / 功能开发）→ 步骤3
  │
  ├─→ 步骤3: 分析是否涉及响应式布局（`SIZE-01`）
  │     └─→ 重复布局：同质内容随空间增减列数（列表布局、瀑布流布局、轮播布局、网格布局）
  │           → 命中 `SIZE-01` → 步骤4
  │     └─→ 分栏布局：不同类别内容需要同屏并列（侧边栏、单/双栏、三分栏）
  │           → 命中 `SIZE-01` → 步骤4
  │     └─→ 挪移布局：同一组内容需要在不同尺寸下改变排列方向（插图文字组合、底部/侧边导航）
  │           → 命中 `SIZE-01` → 步骤4
  │     └─→ 缩进布局：单列内容在宽屏下需要居中限宽（单列列表布局）
  │           → 命中 `SIZE-01` → 步骤4
  │     └─→ 不涉及 → 步骤4
  │
  ├─→ 步骤4: 分析是否涉及断点系统（`SIZE-02`，满足任一即命中）
  │     └─→ 涉及：`SIZE-01` 已命中 / 多设备形态或尺寸变化调整UX布局与交互
  │           → 命中 `SIZE-02` → 步骤5
  │     └─→ 不涉及 → 步骤5
  │
  ├─→ 步骤5: 分析是否涉及组件级自适应能力
  │     └─→ 拉伸：需要某个区域撑满剩余空间
  │           → 命中 `SIZE-04` → 步骤6
  │     └─→ 均分：内容数量固定、均分显示（如工具栏、底部菜单栏）
  │           → 命中 `SIZE-04` → 步骤6
  │     └─→ 占比：子组件需要按固定比例分配父容器空间
  │           → 命中 `SIZE-04` → 步骤6
  │     └─→ 缩放：需要保持等比缩放（如图片、固定比例容器）
  │           → 命中 `SIZE-04` → 步骤6
  │     └─→ 延伸：内容数量可变，空间不足时隐藏尾部元素，通过滑动查看更多元素
  │           → 命中 `SIZE-04` → 步骤6
  │     └─→ 隐藏：子组件按预设优先级随容器尺寸变化显示或隐藏，相同优先级同时显隐
  │           → 命中 `SIZE-04` → 步骤6
  │     └─→ 折行：布局方向尺寸不足自动换行显示
  │           → 命中 `SIZE-04` → 步骤6
  │     └─→ 不涉及 → 步骤6
  │
  ├─→ 步骤6: 分析是否涉及窗口尺寸监听
  │     └─→ 涉及：窗口监听（windowSizeChange / AppStorage）/ 监听失效（布局未同步 / 状态未刷新 / 监听未注册）/ 断点系统
  │           → 命中 `SIZE-03` → 步骤7
  │     └─→ 不涉及 → 步骤7
  │
  ├─→ 步骤7: 分析是否涉及宽屏/折叠屏设备平行视界分栏适配
  │     └─→ 涉及：平行视界（EasyGo / easy_go.json）/ 导航分栏（navigationSplit / routerSplit）
  │           / 分栏配置（enableReducedContainerSize / wideWindowMode / squareWindowMode / fullScreenPages）
  │           → 命中 `SIZE-07` → 步骤8
  │     └─→ 不涉及 → 步骤8
  │
  ├─→ 步骤8: 分析是否涉及应用内分屏
  │     └─→ 涉及：分屏（startAbility + StartOptions / WINDOW_MODE_SPLIT_SECONDARY）
  │           / 分屏方向（preferMultiWindowOrientation）/ 比价场景 / 多窗口并行操作
  │           → 命中 `SIZE-06` → 步骤9
  │     └─→ 不涉及 → 步骤9
  │
  └─→ 步骤9: 分析是否涉及多设备资源文件差异化
       └─→ 涉及：不同设备需要不同颜色、字体、间距、图片等资源值
             / 资源限定词目录（base / tablet / device 等）
             / 分层参数 / 资源匹配规则
             → 命中 `SIZE-08` → 步骤10
       └─→ 不涉及 → 步骤10

  └─→ 步骤10: 分析是否进入 VAL 阶段
       └─→ 不涉及验证 → 步骤11
       └─→ 涉及验证
             ├─→ 验证内容涉及折叠设备多形态验证 / hidumper 模拟 / 分辨率阶梯验证
             │     → 禁止在本 SKILL 内自行执行验证操作（hdc 截屏、悬浮窗等）
             │     → 必须路由：1. 读取 ../hmos-multidevice-scenario-entry/references/multi-device-verification.md
             │                 2. 按文档标准流程执行验证 → 步骤11
             └─→ 其他验证（断点切换日志、窗口尺寸数值确认等本 SKILL 可覆盖）
                   → 在本 SKILL 内按 VAL 阶段标准输出执行 → 步骤11

  └─→ 步骤11: 资源收集与强制读取（所有场景判断完毕后必须执行）
       └─→ 11.1: 逐场景枚举资源清单
       │       回溯步骤1~10中所有已命中的场景，逐一列出每个场景的 scene_id 及其 `resource_refs`。
       │       **禁止只看主场景而跳过次场景**；所有命中场景都必须参与枚举。
       │       输出格式示例：
       │         SIZE-00 → resource_refs: [RSC_SIZE_01]
       │         SIZE-01 → resource_refs: [RSC_SIZE_02]
       └─→ 11.2: 合并去重，生成本次完整资源读取列表
       │       将 11.1 中所有 `resource_refs` 合并去重，得到最终的资源 ID 集合。
       └─→ 11.3: 交叉对照资源索引，补全每个资源的文件路径
       │       在下方"资源索引"区域中，按资源 ID 查找对应的 `path` 字段。
       │       **禁止猜测路径**；每个资源的路径必须从资源索引中精确匹配。
       │       输出 `resources_used` 字段，格式：
       │         resources_used:
       │           - RSC_SIZE_01: ./references/adaptation-specification.md
       │           - RSC_SIZE_02: ./references/responsive_layout.md
       └─→ 11.4: **读取全部资源文件**，使用 Read 工具并行读取，不得跳过任何一个
       └─→ 11.5: 完整性校验
       │       读取完毕后，核对 11.2 的资源 ID 集合与实际已读取的文件列表，确保一一对应。
       │       如有遗漏，必须补读后才能继续。
       └─→ 11.6: 全部资源读取并校验完毕后，方可输出实施方案或代码
       └─→ ⚠️ 禁止在资源未读取完毕时输出代码或方案

多场景命中规则：
  - 异常修复（SIZE-05）命中后，仍需继续步骤3~10以确定涉及的能力维度，辅助根因定位
  - 窗口监听（SIZE-03）是断点系统（SIZE-02）的基础，两者同时命中时 SIZE-03 提供监听与同步机制、SIZE-02 提供阈值与断点判定
  - 断点系统（SIZE-02）步骤4的首条命中信号为"SIZE-01 已命中"，确保响应式布局场景自动触发断点系统
  - 多设备资源文件（SIZE-08）与布局类场景（SIZE-01/02/04）可同时命中：布局策略决定结构，资源文件决定样式值
```

## 场景索引

#### `SIZE-00` 多设备窗口适配规格

```yaml
scene_id: SIZE-00
scene_name: 多设备窗口适配规格
phase_tags: [REQ, DEV, FIX]
intent_signals:
  - 适配规格：多设备适配 / 布局基础要求
applies_when:
  - 所有涉及屏幕窗口尺寸适配的需求，必须先进入此场景读取规格要求
  - 需要了解 HarmonyOS 多设备适配的标准规范、设计原则和约束条件
not_applies_when:
  - 纯业务逻辑重构，不涉及窗口尺寸适配
decisions:
  REQ:
    - 读取适配规格文档，明确适配边界和 SPEC 规格约束
    - 确定涉及的 SPEC 条款和优先级（P0/P1）
  DEV:
    - 按规格文档实现布局方案，参考 SPEC 中的解决方案
  FIX:
    - 对照规格文档定位偏差，确认修复方案不违背 SPEC 规格约束
resource_refs:
  - RSC_SIZE_01
```

#### `SIZE-01` 响应式布局

```yaml
scene_id: SIZE-01
scene_name: 响应式布局
phase_tags: [REQ, DEV, FIX]
intent_signals:
  - 重复布局(List lanes / WaterFlow columnsTemplate / Grid columnsTemplate / Swiper displayCount)：多列列表 / 瀑布流 / 多列轮播 / 多列网格
  - 分栏布局(Navigation NavigationMode / SideBarContainer showSideBar / Tabs)：侧边栏 / 单栏双栏 / 三分栏 / 聊天 / 邮箱 / 日历
  - 挪移布局(GridRow columns / GridCol span / Tabs barPosition vertical)：插图文字上下左右切换 / 底部导航变侧边导航
  - 缩进布局(GridCol offset / span)：居中留白 / 内容缩进
  - 栅格布局(GridRow / GridCol / Grid)：响应式布局 / 断点切换
  - 布局差异：单折 / 双折 / 三折
applies_when:
  - 使用 List / WaterFlow / Swiper / Grid 实现重复布局（列数/行数随断点变化）
  - 使用 SideBarContainer / Navigation 实现分栏布局（侧边栏/单双栏/三分栏）
  - 使用 Tabs / GridRow / GridCol 实现挪移布局（位置/方向切换）
  - 使用 GridRow / GridCol 实现缩进布局（居中留白）
  - 页面级结构需要根据断点切换（单栏↔双栏↔三栏）
  - 聊天（二分栏路由切换）、邮箱（三分栏内容区优先）、日历（三分栏导航区优先）
not_applies_when:
  - 仅涉及组件级微观调整（拉伸、缩放、隐藏等），无需断点参与（见 SIZE-04）
  - 仅涉及断点系统设计与阈值定义（见 SIZE-02）
  - 仅涉及窗口尺寸监听与同步（见 SIZE-03）
  - 仅与安全区、键盘、折痕相关
  - 静态布局，不依赖运行时尺寸变化
decisions:
  REQ:
    - 确定布局类型（重复/分栏/挪移/缩进）及其子类型
    - 确定页面骨架和容器选型
    - 定义不同断点下的结构变化和内容取舍
    - 分栏布局额外决策：侧边栏 vs 单双栏 vs 三分栏；三分栏优先级；是否需要路由切换
  DEV:
    - 实现重复布局：按断点配置列数/间距
    - 实现分栏布局：按断点配置侧边栏显示/导航栏模式/路由切换
    - 实现挪移布局：按断点配置组件位置与方向
    - 实现缩进布局：按断点配置内容占列和偏移
  FIX:
    - 定位结构切换断点边界错误
    - 定位分栏路由切换异常
    - 定位三分栏优先级异常
    - 定位内容溢出或布局缺失
resource_refs:
  - RSC_SIZE_02
```

#### `SIZE-02` 断点系统

```yaml
scene_id: SIZE-02
scene_name: 断点系统
phase_tags: [REQ, DEV, FIX]
intent_signals:
   - 断点设计：横向断点 / 纵向断点 / 高宽比
   - 系统断点(WidthBreakpoint / HeightBreakpoint / getWindowWidthBreakpoint / getWindowHeightBreakpoint)：旋转折叠断点变化
   - 自定义断点(BreakpointType / BreakpointObserver / BreakpointConstants)：开发者已有断点 / AI辅助开发断点
   - 布局差异：单折 / 双折 / 三折
applies_when:
   - 涉及断点系统设计、阈值定义、横向断点与纵向断点
   - 系统断点 vs 自定义断点的选型决策
   - 断点错配、断点不一致、断点值不随窗口变化更新
not_applies_when:
   - 仅涉及响应式容器的布局结构选型（如选择 GridRow 还是 List），不涉及断点状态管理或阈值配置（见 SIZE-01）
   - 仅涉及组件级自适应能力（见 SIZE-04）
   - 仅涉及窗口尺寸监听与同步（见 SIZE-03）
   - 仅与安全区、键盘、折痕相关
   - 静态布局，不依赖运行时尺寸变化
decisions:
   REQ:
      - 确定系统断点 vs 自定义断点的选型
      - 定义宽度/纵向断点/高宽比的主判定条件
   DEV:
      - 实现断点状态管理方式（AppStorage / @StorageProp / GridRow 内置）
      - 完成断点监听与同步粒度配置
   FIX:
      - 定位断点错配、断点不一致、断点值不随窗口变化更新
resource_refs:
   - RSC_SIZE_03
```

#### `SIZE-03` 窗口监听

```yaml
scene_id: SIZE-03
scene_name: 窗口监听
phase_tags: [REQ, DEV, FIX]
intent_signals:
   - 窗口监听(windowSizeChange)：旋转 / 折叠 / 拖拽 / 窗口尺寸变化
   - 监听失效：布局未同步更新 / 状态未刷新 / 监听未注册
applies_when:
   - 需要监听窗口尺寸变化（旋转、折叠、拖拽）
   - 窗口变化后布局未同步更新、状态未刷新
   - 窗口监听入口、状态同步和取消监听逻辑
   - 防抖策略和性能优化
   - 涉及断点系统设计
not_applies_when:
   - 仅涉及响应式布局容器选型（见 SIZE-01）
   - 仅涉及组件级自适应能力（见 SIZE-04）
   - 仅与安全区、键盘、折痕相关
   - 与窗口尺寸本身无关的系统配置监听
   - 静态布局，不依赖运行时尺寸变化
   - 组件使用从窗口尺寸计算出的固定宽度（如 `px2vp(windowRect.width * 0.65)`）导致旋转后截断，但该宽度可用 `'100%'`、`layoutWeight` 等响应式方式替代时，应走 SIZE-05（异常修复）或 SIZE-04（自适应布局），不应走窗口监听
decisions:
   REQ:
      - 确定窗口监听方式（windowSizeChange）
      - 定义同步粒度和防抖策略（100~200ms）
      - 确定 AppStorage 全局共享 vs 组件独立监听
   DEV:
      - 实现监听注册（loadContent 回调内）和取消监听（onWindowStageDestroy）
      - 完成 px2vp 转换和 AppStorage 全局同步
   FIX:
      - 定位监听未注册、状态未同步、取消监听遗漏导致内存泄漏
resource_refs:
   - RSC_SIZE_04
```

#### `SIZE-04` 自适应布局

```yaml
scene_id: SIZE-04
scene_name: 自适应布局
phase_tags: [REQ, DEV, FIX]
intent_signals:
   - 拉伸(layoutWeight / Blank)：撑满剩余空间 / 均分布局
   - 缩放(aspectRatio)：图片等比 / 容器比例保持
   - 隐藏(displayPriority / visibility)：空间不足隐藏低优先级组件
   - 折行(FlexWrap)：内容自动换行
   - 均分(SpaceEvenly / 百分比宽高)：均匀分布 / 均匀排列 / 等间距分布
   - 延伸(List / Scroll)：内容超出容器时滚动展示
   - 自适应布局：自适应变化
applies_when:
   - 组件级微观调整，无需断点参与：拉伸（layoutWeight / Blank）、缩放（aspectRatio）、隐藏（displayPriority / visibility）、折行（FlexWrap）、均分（SpaceEvenly）、占比（百分比宽高）、延伸（List / Scroll）
   - 容器内组件跟随容器尺寸变化的自适应需求
not_applies_when:
   - 需要断点驱动的页面级结构切换（见 SIZE-01）
   - 仅涉及断点系统设计（见 SIZE-02）
   - 仅涉及窗口尺寸监听（见 SIZE-03）
   - 组件尺寸截断、留白、溢出等异常问题（见 SIZE-05）
decisions:
   REQ:
      - 选择自适应能力（拉伸/缩放/隐藏/折行/均分/占比/延伸）
      - 确定是否需要与响应式布局（SIZE-01）组合使用
   DEV:
      - 配置组件属性（layoutWeight、Blank、aspectRatio、displayPriority 等）
   FIX:
      - 定位组件属性配置不当导致的尺寸不适配
resource_refs:
   - RSC_SIZE_05
```

#### `SIZE-05` 异常修复

```yaml
scene_id: SIZE-05
scene_name: 异常修复
phase_tags: [DEV, FIX]
intent_signals:
   - 尺寸异常：截断 / 留白 / 溢出 / 压缩
   - 位置异常：偏移 / 错位 / 对齐异常
   - 布局异常：层级错乱 / 堆叠 / 遮挡 / GridRow 不降列 / 布局容器选择错误
   - 组件异常(layoutWeight / Blank / aspectRatio)：不生效 / 拉伸变形
applies_when:
   - 组件宽度/高度在多设备上不适配导致截断、留白、溢出、压缩、内容被切掉（尺寸异常）
   - 组件相对位置或绝对位置在多设备上不适配导致偏移、错位、对齐异常、层级错乱、组件跑到屏幕外（位置异常）
   - 布局容器选择或配置不当导致堆叠、遮挡、截断、布局错乱、GridRow 不降列（布局异常）
not_applies_when:
   - 仅与断点系统设计相关（见 SIZE-02）
   - 仅与窗口尺寸监听相关（见 SIZE-03）
   - 纯业务逻辑重构，不涉及布局适配
decisions:
   DEV:
      - 按判断规则分类异常类型：先看容器（布局异常）→ 再看位置（位置异常）→ 最后看尺寸（尺寸异常）
      - 针对尺寸异常：调整固定尺寸/补充断点分支/解决空间竞争
      - 针对位置异常：修复绝对定位/锚点适配/对齐方式/边距累加
      - 针对布局异常：替换或修复布局容器选型/断点参考系/滚动缺失/嵌套结构
   FIX:
      - 定位根因属于尺寸异常（SIZE-0x）、位置异常（POS-0x）还是布局异常（LAYOUT-0x）
      - 对照修复场景库确定修复方案，验证单屏基线未退化
resource_refs:
   - RSC_SIZE_06
```

#### `SIZE-06` 应用内分屏

```yaml
scene_id: SIZE-06
scene_name: 应用内分屏
phase_tags: [REQ, DEV, FIX]
intent_signals:
   - 分屏(startAbility / StartOptions / WINDOW_MODE_SPLIT_SECONDARY)：多窗口 / 双窗口并行操作
   - 分屏方向(preferMultiWindowOrientation)：横向分屏 / 竖向分屏
   - 比价场景
applies_when:
   - 通过 startAbility + StartOptions 启动另一个 UIAbility 实现系统级分屏
   - 分屏后页面截断、数据未传递、参数不更新、布局异常
   - 需要两个独立窗口并行操作
not_applies_when:
   - 仅与断点或响应式布局相关（见 SIZE-02、SIZE-01）
   - 平行视界 EasyGo 分栏适配（见 SIZE-07）
   - 纯悬浮窗适配不涉及分屏（见 adaptation-specification SPEC-15）
   - 分屏后仅组件尺寸截断且与分屏窗口尺寸无直接因果（见 SIZE-05）
decisions:
   REQ:
      - 确定分屏方向（preferMultiWindowOrientation：default / portrait / landscape / landscape_auto）
      - 确定目标页面复用策略（复用 NavDestination 还是独立页面）
   DEV:
      - 实现 startAbility + StartOptions 分屏启动
      - 处理参数传递和分屏后布局适配
   FIX:
      - 定位分屏后截断、数据未传递、参数不更新、布局异常
resource_refs:
   - RSC_SIZE_07
```

#### `SIZE-07` 平行视界分栏适配

```yaml
scene_id: SIZE-07
scene_name: 平行视界分栏适配
phase_tags: [REQ, DEV, FIX]
intent_signals:
   - 平行视界(EasyGo / easy_go.json)：宽屏自动分栏 / 折叠屏分栏
   - 导航分栏(navigationSplit / routerSplit)：Navigation 分栏 / Router 分栏
   - 分栏配置(enableReducedContainerSize / wideWindowMode / squareWindowMode / fullScreenPages)：分栏截断 / 占位页 / 全屏页
applies_when:
   - 宽屏/折叠屏设备上需要以分栏方式同时显示主页和详情页
   - 涉及 easy_go.json 配置、module.json5 声明
   - 分栏后 UI 截断、左右页共享资源冲突
not_applies_when:
   - 应用内分屏（startAbility + StartOptions，见 SIZE-06）
   - 手动实现左右分栏布局（见 SIZE-01）
   - 纯响应式布局不涉及系统分栏
decisions:
   REQ:
      - 确定导航模式（Navigation → navigationSplit / Router → routerSplit）
      - 确定主页和关联页的映射关系
   DEV:
      - 创建 easy_go.json 配置文件并在 module.json5 中声明
      - 同时配置 wideWindowMode 和 squareWindowMode 确保折叠屏覆盖
      - 处理分栏后 UI 截断（enableReducedContainerSize 或自适应布局）
   FIX:
      - 定位分栏未生效（配置缺失或阈值未覆盖）
      - 定位分栏后截断（宽度减半但按全宽布局）
      - 定位手写双栏与 EasyGo 冲突或 param 为 null 崩溃
resource_refs:
   - RSC_SIZE_08
```

#### `SIZE-08` 多设备资源文件

```yaml
scene_id: SIZE-08
scene_name: 多设备资源文件
phase_tags: [REQ, DEV, FIX]
intent_signals:
   - 资源差异化：不同设备需要不同的颜色 / 字体 / 间距 / 图片资源值
   - 资源限定词(qualifier directory)：base / tablet / device 等限定词目录
   - 应用资源($r('app.type.name'))：自定义资源 / 资源文件 / color.json / float.json / string.json
   - 系统资源($r('sys.type.resource_id'))：分层参数 / 系统预置资源
   - 资源匹配：限定词目录匹配规则 / 资源查找优先级
   - 资源组目录：element / media 资源类型
applies_when:
   - 不同设备或配置需要使用不同的资源值（颜色、字体、间距、图片等）
   - 需要创建限定词目录实现设备差异化资源
   - 需要使用系统分层参数保证多设备视觉一致性
   - 资源限定词匹配异常或资源未找到
not_applies_when:
   - 仅涉及布局结构变化，不涉及资源值差异化（见 SIZE-01）
   - 仅涉及断点系统设计（见 SIZE-02）
   - 资源值在不同设备上一致，无需差异化处理
decisions:
   REQ:
      - 确定需要差异化的资源类型（颜色/字体/间距/图片）
      - 确定使用应用资源还是系统资源（或组合使用）
      - 定义限定词目录策略（按设备类型、屏幕尺寸等限定）
   DEV:
      - 在 base 目录中定义所有资源的默认值
      - 按需创建限定词目录（如 tablet）并放置差异化资源
      - 使用 $r('app.type.name') 引用应用资源
      - 使用 $r('sys.type.resource_id') 引用系统分层参数
   FIX:
      - 定位资源未找到（base 缺失默认值或限定词目录命名错误）
      - 定位资源匹配异常（限定词优先级或匹配规则不正确）
      - 定位系统资源引用错误（resource_id 不存在或类型不匹配）
resource_refs:
   - RSC_SIZE_09
```

## 资源索引

#### `RSC_SIZE_01` 多设备适配规格参考

```yaml
resource_id: RSC_SIZE_01
path: ./references/adaptation-specification.md
used_for:
   - 定义 HarmonyOS 多设备适配的标准规范、设计原则和约束条件
   - SPEC-00 至 SPEC-16 的完整规格清单与解决方案
load_when:
   - 命中 SIZE-00
avoid_when:
   - 当前不涉及适配规格参考
```

#### `RSC_SIZE_02` 响应式布局参考

```yaml
resource_id: RSC_SIZE_02
path: ./references/responsive_layout.md
used_for:
   - 设计四种响应式布局（重复布局、分栏布局、挪移布局、缩进布局）
   - 页面级结构切换策略
load_when:
   - 命中 SIZE-01
avoid_when:
   - 当前不涉及页面级布局结构
```

#### `RSC_SIZE_03` 断点系统设计参考

```yaml
resource_id: RSC_SIZE_03
path: ./references/breakpoint_system.md
used_for:
   - 断点系统设计原理
   - 系统断点与自定义断点的选型与阈值定义
load_when:
   - 命中 SIZE-02
avoid_when:
   - 当前不涉及断点系统
```

#### `RSC_SIZE_04` 窗口监听机制参考

```yaml
resource_id: RSC_SIZE_04
path: ./references/window_detection.md
used_for:
   - 窗口尺寸变化监听机制
   - 监听注册、状态同步和取消监听策略
load_when:
   - 命中 SIZE-03
avoid_when:
   - 当前不涉及窗口监听
```

#### `RSC_SIZE_05` 自适应布局参考

```yaml
resource_id: RSC_SIZE_05
path: ./references/adaptive_layout.md
used_for:
   - 七种自适应能力（拉伸、缩放、隐藏、占比、折行、均分、延伸）
   - 组件级微观调整策略
load_when:
   - 命中 SIZE-04
avoid_when:
   - 当前不涉及组件级自适应
```

#### `RSC_SIZE_06` 异常修复场景库参考

```yaml
resource_id: RSC_SIZE_06
path: ./references/bug-fix-cases.md
used_for:
   - 异常修复场景分类和根因分析
   - 尺寸异常 SIZE-0x / 位置异常 POS-0x / 布局异常 LAYOUT-0x
load_when:
   - 命中 SIZE-05
avoid_when:
   - 当前不涉及布局异常修复
```

#### `RSC_SIZE_07` 应用内分屏参考

```yaml
resource_id: RSC_SIZE_07
path: ./references/split-screen.md
used_for:
   - 应用内分屏完整指南
   - startAbility + StartOptions 分屏实现
   - 分屏常见问题表
load_when:
   - 命中 SIZE-06
avoid_when:
   - 当前不涉及应用内分屏
```

#### `RSC_SIZE_08` 平行视界分栏适配参考

```yaml
resource_id: RSC_SIZE_08
path: ./references/easy-go.md
used_for:
   - 平行视界（EasyGo）分栏适配完整指南
   - easy_go.json 配置字段说明和多设备差异化配置
   - 分栏常见问题排查（不分栏、截断、资源冲突、param 崩溃）
load_when:
   - 命中 SIZE-07
avoid_when:
   - 当前不涉及系统分栏适配
```

#### `RSC_SIZE_09` 多设备资源文件参考

```yaml
resource_id: RSC_SIZE_09
path: ./references/multi-device-resource.md
used_for:
   - 多设备资源文件使用指南（应用资源与系统资源）
   - 资源限定词目录结构、匹配规则和查找优先级
   - 资源组目录（element / media）定义格式
   - 应用资源引用 $r('app.type.name') 与系统资源引用 $r('sys.type.resource_id')
   - 限定词目录差异化资源配置示例
load_when:
   - 命中 SIZE-08
avoid_when:
   - 当前不涉及多设备资源差异化
```
