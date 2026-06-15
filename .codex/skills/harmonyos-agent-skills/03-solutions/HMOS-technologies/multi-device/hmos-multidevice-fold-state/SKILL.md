---
name: hmos-multidevice-fold-state
description: HarmonyOS foldable-device adaptation skill for requirements, development, bug-fix, and verification phases. Activate when the task involves fold status detection, hover-mode split-screen layouts, crease avoidance, fold continuity, multi-fold form-factor mapping (e.g. F/M/G), inner/outer screen ratio differences, or fold-related issue remediation.
metadata:
  version: 1.0.1
  keywords:
    - 折展状态
    - 折叠屏
    - FoldStatus
    - foldStatus
    - foldDisplayMode
    - 悬停态
    - hover mode
    - 折痕避让
    - crease
    - 开合连续性
    - 内外屏切换
    - 双折
    - 三折
    - F态
    - M态
    - G态
---

# 设备折展状态适配

## 技能定义

| 字段 | 内容 |
| --- | --- |
| `skill_id` | device-fold-state |
| `skill_name` | 设备折展状态适配 |
| `one_line_purpose` | 为折叠屏多形态设备提供悬停适配、折痕避让、开合连续性能力。 |
| `device_scope` | phone / tablet / 2in1 / tv / wearable |
| `problem_scope` | FoldStatus、悬停态、折痕避让、开合连续性、多段折叠形态映射（如 F/M/G）、内外屏比例差异适配、折展问题修复 |
| `not_in_scope` | 普通手机或平板的常规响应式布局、与折展无关的纯视觉调整 |
| `primary_outputs` | 见"统一输出字段"章节，按阶段（REQ/DEV/FIX/VAL）输出对应字段 |

## 核心约束

- 先识别设备形态和当前折叠状态，再决定布局与交互策略。
- 方向决策优先级：页面业务需求 > 系统折叠状态信号（`foldStatus` / `foldDisplayMode`） > 折痕几何推算。同一折叠状态内只锁定一次屏幕方向，状态变化时必须先解锁再重选。
- 折展逻辑与业务状态分离：折展适配不得改写业务显示状态机；悬停态与展开态复用同一套显示判定条件，只调整内容落在哪个分屏。
- 折痕区域避让：关键内容和交互不得落在折痕区域。分屏必须先统一坐标系再计算分界；分区边界锚定折痕真实边界（上下或左右），`16 vp / 40 vp` 仅用于内容安全间距。
- **悬停态联动折痕避让**：悬停态分屏（FOLD-01）命中时，折痕避让（FOLD-02）**必须作为联动场景自动纳入 `secondary_scenes`**，无需用户 prompt 显式提及折痕或避让关键词。悬停态下分屏分界线穿越折痕区域，避让是不可跳过的硬约束。
- 开合后不得引入额外操作步骤，不得出现滚动偏移、输入丢失、图像模糊或播放进度漂移。
- 未给出运行验证证据前，不得判定折展适配完成。
- **VAL 阶段路由强制要求**：当验证涉及折叠设备多形态验证、hidumper 模拟、分辨率阶梯验证时，**不得在本 SKILL 内自行执行验证操作**（如直接调用 hdc 截屏、尝试悬浮窗等），必须按以下步骤路由：
  1. 读取 `../hmos-multidevice-scenario-entry/references/multi-device-verification.md`
  2. 按文档中的标准流程执行验证
- **HDS 组件升级提示**：当 DEV 阶段涉及折叠屏/平板的应用内多窗场景时，应主动提示用户可使用 HDS（UI Design Kit）的 `MultiWindowEntryInAPP` 组件（`SCENE-09`），该组件专为折叠屏展开态和三折叠横屏优化，比手动 `startAbility + StartOptions` 方案代码更少。`HdsSideBar` 也可用于折叠屏展开态的侧边栏导航。详细 API 和示例参见 `../hmos-multidevice-scenario-entry/references/hds-ui-design-kit.md`。设备约束：`MultiWindowEntryInAPP` 仅支持折叠屏展开态、三折叠横屏、平板横屏，其他形态下按钮不可交互。升级建议不构成强制要求，用户明确选择手动方案时以本技能方案为准。

## 阶段标签

| 标签 | 阶段 | 当前模块关注点 |
| --- | --- | --- |
| `REQ` | 需求分析设计 | 设备形态、折展状态、方向策略、显示职责 |
| `DEV` | 开发 | 状态监听、分屏布局、折痕计算、开合连续性、生命周期回收 |
| `FIX` | 问题修复 | 折展问题修复、方向偏差、状态不同步、折痕跨越、连续性断档 |
| `VAL` | 功能验证 | foldStatus 证据、方向证据、折痕避让截图、连续性行为回归 |

## 统一输出字段

- 路由字段：`active_phases`、`primary_phase`、`primary_scene`、`secondary_scenes`、`resources_used`
- `REQ`：`device_constraints`、`capability_boundary`、`acceptance_focus`
- `DEV`：`code_touchpoints`、`reuse_resources`、`implementation_notes`、`integration_risks`
- `FIX`：`problem_profile`、`root_cause_hypothesis`、`fix_plan`、`regression_watchlist`
- `VAL`：`verification_matrix`、`evidence_requirements`、`pass_criteria`、`residual_risks`

## 字段释义

- `device_constraints`：指由设备折叠形态、折展状态、折痕区域和宽折叠特性带来的适配硬约束。在 `device-fold-state` 中，通常是需要支持哪些 fold status、折痕区域禁止承载哪些内容、悬停态是否允许重选方向。
- `capability_boundary`：指当前折展方案适用于哪些设备形态和状态，哪些设备或状态不支持，或只能降级处理。
- `acceptance_focus`：指需求阶段验收时必须确认的折展行为、方向结果、折痕避让和状态切换表现。
- scene 中 `deliverables.REQ` 出现 `device_constraints`，表示"该折展场景命中后，需求分析必须先给出设备约束结论"，不是在场景层重新发明字段。

## 场景决策树

```
开始
  │
  ├─→ 步骤1: 是否涉及折叠状态检测（FoldStatus、foldStatusChange、foldDisplayModeChange）
  │     └─→ 涉及 → 先读取折叠状态检测指南，继续判断 -> 步骤2
  │     └─→ 不涉及 → 不命中折展场景
  │
  ├─→ 步骤2: 是否涉及悬停态分屏或多形态适配（上下或左右分屏、展示区与操作区分离、
  │           多段折叠形态映射 F/M/G、内外屏比例差异、悬停态黑屏、竖折痕误判为横向）
  │     └─→ 涉及 → 命中 `FOLD-01`，同时自动联动 `FOLD-02`（悬停态分屏必涉折痕） -> 步骤3
  │     └─→ 不涉及 → 步骤3
  │
  ├─→ 步骤3: 是否涉及折痕区域避让（内容跨折痕、点击区落在折痕上、避让区偏下/偏上、
  │           分界线不在中线、内容被折痕吞掉）
  │     └─→ 涉及 → 命中 `FOLD-02`（若步骤2已联动则跳过重复命中） -> 步骤4
  │     └─→ 不涉及，但步骤2已命中 → `FOLD-02` 已通过联动纳入，直接 -> 步骤4
  │     └─→ 不涉及，且步骤2未命中 → 步骤4
  │
  ├─→ 步骤4: 是否涉及开合连续性（操作步骤增加、滚动偏移、输入丢失、图片模糊、播放进度不一致）
  │     └─→ 涉及 → 命中 `FOLD-03` -> 步骤5
  │     └─→ 不涉及 → 步骤5
  │
  └─→ 步骤5: 是否需要折展问题修复（折展行为偏差、悬停态错乱、方向偏差、
              折痕跨越、连续性断档、生命周期回收）
        └─→ 涉及 → 命中 `FOLD-04`
        └─→ 不涉及 → 结束
```

## 场景索引


#### `FOLD-01` 悬停态分屏与多形态适配

```yaml
scene_id: FOLD-01
scene_name: 悬停态分屏与多形态适配
phase_tags: [REQ, DEV, FIX, VAL]
priority: P0
intent_signals:
  - 悬停态
  - HALF_FOLDED
  - 分屏布局
  - 上展示下操作 / 左展示右操作
  - 多段折叠
  - 多形态折展
  - F/M/G
  - 形态映射
  - 特殊比例折叠屏
  - 1:1 外屏
  - 16:10 内屏
  - 内外屏比例差异
  - 小方屏
  - 沉浸式浏览
  - 标题栏隐藏
  - 导航栏收起
applies_when:
  - 页面在悬停态需要将展示区和操作区拆到分屏（上下或左右）
  - 当前问题表现为悬停态布局职责混乱
  - 目标设备存在多段折叠形态差异（可映射为 F/M/G 等）
  - 当前问题表现为某一形态下方向或结构判断错误
  - 目标设备存在明显的外屏和内屏比例差异
  - 需要处理宽折叠内容密度或导航形式变化
  - 外屏小方屏需要沉浸式浏览体验（滑动隐藏标题栏和导航栏以释放空间）
not_applies_when:
  - 页面没有悬停态交互设计
  - 设备仅存在单一折展形态，无需形态映射
  - 设备不具备宽折叠屏幕特征
decisions:
  REQ:
    - 明确各分区的职责分配（如展示区与操作区）
    - 明确方向锁定策略和退出悬停后的恢复策略
    - 形态映射基线：可将不同设备形态抽象为"小可视区/中间态/大可视区"等统一语义（如 F/M/G）
    - 确定不同折叠组合下的布局和方向策略
    - 明确"大可视区形态"下的方向和信息密度策略
    - 定义外屏与内屏的布局差异，决定哪些内容在外屏裁剪、隐藏或延后展示
    - 悬停态分区布局必须同步给出折痕避让方案：分区边界锚定折痕真实边界，折痕区域不承载内容
  DEV:
    - 形态标签只作为语义入口，真实布局空间仍以运行时窗口尺寸和断点判定
    - 选择分屏容器方案（FolderStack / FoldSplitContainer / 自定义实现）
    - 确定状态监听入口与悬停态切换的布局更新时机
    - 分屏分界线必须锚定折痕真实边界（通过 getCurrentFoldCreaseRegion 获取并映射坐标），折痕区域用空白占位，`16 vp / 40 vp` 仅作为内容安全间距
    - 悬停态分屏时操作区放置在折痕两侧中面积较大的一侧，展示区放置在较小的一侧；两侧面积相近时按"上展示下操作"分配
    - 三折叠 F/M/G 形态通过运行时窗口宽度断点区分布局（sm→单栏、md→双栏、lg→三栏），方向策略按形态差异化设置（详见 RSC_FOLD_02 多段折叠形态适配建议）
    - 内外屏差异化适配：使用 `getFoldStatus()` + `windowSizeChange` 双通道判断当前屏幕，外屏仅展示核心信息并简化导航，内屏利用宽屏空间分栏提升信息密度
  FIX:
    - 排查悬停态布局未生效或分区职责混乱的根因
    - 排查多形态下方向或结构判断错误
    - 排查悬停态下折痕区域是否有内容或交互控件误落
  VAL:
    - 验证悬停态分屏布局与分区职责是否符合设计
    - 验证形态切换时方向锁定与恢复策略
    - 验证悬停态下折痕区域避让是否符合标准（上 16vp / 下 40vp 安全间距）
resource_refs:
  - RSC_FOLD_01
  - RSC_FOLD_02
  - RSC_FOLD_03
  - RSC_FOLD_04
  - RSC_FOLD_06
```

#### `FOLD-02` 折痕区域避让

```yaml
scene_id: FOLD-02
scene_name: 折痕区域避让
phase_tags: [REQ, DEV, FIX, VAL]
priority: P0
intent_signals:
  - 折痕
  - CreaseRegion
  - getFoldCreaseRegion
  - 内容被劈开
  - 避让区偏下
  - 分界线不在中线
  - 状态栏偏移
  - 悬停态避让
  - 分屏折痕
  - 内容被折痕遮挡
applies_when:
  - 关键内容或交互可能落在折痕区域
  - 状态变化后需要重新计算折痕避让范围
  - 悬停态分屏场景下分界线穿越折痕区域（FOLD-01 联动触发）
not_applies_when:
  - 设备没有折痕区域输入
decisions:
  REQ:
    - 确定折痕区域获取方式和重算时机
    - 决定哪些内容必须远离折痕
  DEV:
    - 先映射折痕矩形到页面坐标，再计算分界线，禁止未映射直接参与布局
    - 横折痕：上分区下边界锚定折痕上边界，下分区上边界锚定折痕下边界；竖折痕：左右分区同理
    - `16 vp / 40 vp` 仅作为分区内部内容安全间距，不替代边界定位
    - 若页面根节点有 `globalPosition` 偏移，必须在同单位下扣减后再分区
    - 折痕方向判定按"轴比阈值优先 → 几何评分对比 → 方向组兜底"三级执行，禁止仅依赖单次 width/height 比较判断方向（详见 RSC_FOLD_05 场景4）
    - 折痕厚度必须安全钳位：折痕区域不超过屏幕对应维度 35%，超阈值时回退到薄边估算（详见 RSC_FOLD_05 场景5）
    - 无折痕数据时仍需进入悬停态，使用屏幕 50% 位置作为分割线回退
  FIX:
    - 排查避让区偏下/偏上时坐标系混用与"中线 + 固定偏移"策略
    - 排查分界线不在中线时布局容器约束问题
    - 排查竖折痕误判为横向时轴比阈值和评分机制是否生效（详见 RSC_FOLD_05 场景4）
  VAL:
    - 验证关键内容与交互未落在折痕区域
    - 验证状态变化后折痕避让范围正确重算
resource_refs:
  - RSC_FOLD_01
  - RSC_FOLD_02
  - RSC_FOLD_03
  - RSC_FOLD_06
```

#### `FOLD-03` 开合连续性保障

```yaml
scene_id: FOLD-03
scene_name: 开合连续性保障
phase_tags: [REQ, DEV, FIX, VAL]
priority: P0
intent_signals:
  - 开合连续性
  - 操作步骤增加
  - 页面滚动位置偏移
  - 输入内容丢失
  - 图片模糊
  - 播放进度不一致
applies_when:
  - 折叠/展开后出现状态断档，导致操作路径变长或体验降级
  - 需要保证滚动、输入、图像和媒体时间轴在折展后的连续性
not_applies_when:
  - 问题仅为静态布局差异，不涉及状态连续
decisions:
  REQ:
    - 明确哪些状态必须跨折展保持（滚动锚点、输入草稿、媒体时间轴）
  DEV:
    - 明确恢复链路触发时机，禁止基于过期视口恢复
    - 采用断点驱动布局刷新，而非直接监听 foldStatus 驱动
    - 列表滚动位置：通过 `onScrollIndex()` 持续记录可见项索引，折展后用 `scrollToIndex()` 恢复；WaterFlow 列数变化时使用 `SLIDING_WINDOW` 模式（详见 RSC_FOLD_06 场景1）
    - 视频播放进度：折展前通过时间戳差值快照进度和播放状态，折展后采用序列号防旧 prepared 误响应 + 双通道恢复（onPrepared 即时触发 + 定时器兜底），autoPlay 必须配合恢复条件控制（详见 RSC_FOLD_04 视频播放连续性、RSC_FOLD_05）
    - 图片画质：折展后图片需按新窗口尺寸重新加载适配分辨率，网络图片通过 CDN 裁剪按断点切换分辨率，或使用 `autoResize` 自动降采样（详见 RSC_FOLD_04 图片画质保持）
  FIX:
    - 排查折展后操作步骤增加、滚动偏移、输入丢失等连续性断档
    - 明确降级策略回收点，避免质量衰减累积
  VAL:
    - 验证折展后滚动位置、输入内容、媒体进度保持一致
    - 验证未引入额外操作步骤
resource_refs:
  - RSC_FOLD_01
  - RSC_FOLD_04
  - RSC_FOLD_06
```

#### `FOLD-04` 折展问题修复

```yaml
scene_id: FOLD-04
scene_name: 折展问题修复
phase_tags: [DEV, FIX, VAL]
priority: P0
intent_signals:
  - 折展问题修复
  - 悬停态错乱
  - 方向偏差
  - 折痕跨越
  - 连续性断档
  - 生命周期回收
applies_when:
  - 已有页面在折展态出现行为偏差，需要修复但不重构页面架构
  - 需要按"问题描述-根因分析-通用修复方案"输出修复路径
not_applies_when:
  - 当前任务是新页面从零设计
decisions:
  DEV:
    - 先归类问题类型，再选对应通用修复模板，避免按页面类型定制
    - 修复顺序统一为：监听入口 -> 几何/状态 -> 布局/交互 -> 生命周期回收 -> 回归验证
    - 方向与分界线优先基于真实折痕几何，不使用经验比例硬编码
  FIX:
    - 出现"避让区偏下/偏上"时，先排查坐标系混用与"中线 + 固定偏移"策略，再排查布局容器约束
    - 禁止在折展修复中改写业务状态机语义
  VAL:
    - 验证修复后原有显示逻辑未被破坏
    - 回归验证折展状态切换下布局、方向、折痕避让均正常
resource_refs:
  - RSC_FOLD_01
  - RSC_FOLD_02
  - RSC_FOLD_03
  - RSC_FOLD_05
  - RSC_FOLD_06
```

## 资源索引

资产优先级约定：
- P0：各场景卡片 `references` 字段中引用的参考文档，作为场景命中的首要知识来源。
- P1：端到端案例集（用于加速落地，不替代 P0）。


#### RSC_FOLD_01 折叠状态检测

```yaml
resource_id: RSC_FOLD_01
resource_type: reference
path:
  - ./references/fold_status_detection.md
phase_tags: [REQ, DEV, FIX, VAL]
priority: P0
used_for:
  - 通过 @ohos.display API 检测折叠/展开/悬停状态及显示模式，作为所有折展场景的统一前置入口
load_when:
  - 涉及 FoldStatus、foldStatusChange、foldDisplayModeChange 或需要识别当前折叠态
supports_scenes:
  - FOLD-01
  - FOLD-02
  - FOLD-03
  - FOLD-04
```

#### RSC_FOLD_02 悬停态分屏与多形态适配

```yaml
resource_id: RSC_FOLD_02
resource_type: reference
path:
  - ./references/hover_state_interaction.md
phase_tags: [REQ, DEV, FIX, VAL]
priority: P0
used_for:
  - 悬停态分屏布局方案对比（FolderStack / FoldSplitContainer / 自定义实现）、上下分区职责分配、方向锁定策略
load_when:
  - 悬停态需要拆分展示区与操作区，或需要选择分屏容器方案
supports_scenes:
  - FOLD-01
  - FOLD-04
```

#### RSC_FOLD_03 折痕区域避让

```yaml
resource_id: RSC_FOLD_03
resource_type: reference
path:
  - ./references/crease_avoidance.md
phase_tags: [REQ, DEV, FIX, VAL]
priority: P0
used_for:
  - 折痕区域获取、坐标映射、避让方案对比（自动 vs 手动）、组件选型
load_when:
  - 内容或交互可能落在折痕区域，需要计算避让范围
supports_scenes:
  - FOLD-02
  - FOLD-04
```

#### RSC_FOLD_04 开合连续性

```yaml
resource_id: RSC_FOLD_04
resource_type: reference
path:
  - ./references/fold_continuity.md
phase_tags: [REQ, DEV, FIX, VAL]
priority: P0
used_for:
  - 折叠/展开后保持滚动位置、输入内容、媒体播放进度的连续性，断点驱动布局刷新
load_when:
  - 折展后出现状态断档（滚动偏移、输入丢失、进度漂移），需要保障跨态连续性
supports_scenes:
  - FOLD-03
```

#### RSC_FOLD_05 折展问题修复场景库

```yaml
resource_id: RSC_FOLD_05
resource_type: reference
path:
  - ./references/bug-fix-cases.md
phase_tags: [DEV, FIX, VAL]
priority: P0
used_for:
  - 折展问题通用修复路径，含悬停态未生效、方向切换异常、竖折痕误判为横向等典型问题模板
load_when:
  - 命中 FOLD-04，需要按"问题描述-根因分析-通用修复方案"路径输出
supports_scenes:
  - FOLD-04
```

#### RSC_FOLD_06 场景开发案例集

```yaml
resource_id: RSC_FOLD_06
resource_type: reference
path:
  - ./references/scenario-development-cases.md
phase_tags: [REQ, DEV, FIX]
priority: P1
used_for:
  - 端到端场景开发参考案例（列表焦点保持、阅读布局切换、会议悬停适配、视频折痕避让）
load_when:
  - 需要端到端落地参考而非单点 API 参考
supports_scenes:
  - FOLD-01
  - FOLD-02
  - FOLD-03
  - FOLD-04
```
