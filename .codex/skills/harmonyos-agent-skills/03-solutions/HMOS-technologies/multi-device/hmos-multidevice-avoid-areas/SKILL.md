---
name: hmos-multidevice-avoid-areas
description: Handle HarmonyOS avoid-area adaptation through a declarative scene and resource index. Use when the task involves safe area expansion, status bar or navigation bar avoidance, notch or cutout handling, immersive full-screen layouts, or soft keyboard overlap handling.
metadata:
  version: 1.0.1
  keywords:
    - 避让区
    - 安全区
    - safe area
    - avoid area
    - 状态栏避让
    - 导航栏避让
    - 挖孔屏
    - 刘海屏
    - cutout
    - 沉浸式布局
    - 全屏适配
    - 软键盘遮挡
    - 键盘顶起
    - keyboard overlap
---

# 设备避让区适配

## 技能定义

| 字段 | 内容 |
| --- | --- |
| `skill_id` | `device-avoid-areas` |
| `skill_name` | `设备避让区适配` |
| `one_line_purpose` | 为系统栏、挖孔区、软键盘和沉浸式布局提供统一避让策略。 |
| `device_scope` | `phone / tablet / 2in1 / tv / wearable` |
| `problem_scope` | `safe area、状态栏和导航栏避让、挖孔区、软键盘、沉浸式布局` |
| `not_in_scope` | `与系统区域无关的普通间距调整、纯业务交互逻辑` |
| `primary_outputs` | `primary_scene`、`device_constraints`、`implementation_notes`、`fix_plan`、`verification_matrix` |

## 核心约束

- 先明确要处理的是哪类避让区域，再决定使用动态检测、安全区扩展还是沉浸式方案。
- 不要硬编码系统栏、挖孔区或键盘尺寸，应优先使用 API 动态获取。
- 涉及沉浸式布局时，必须同时说明背景延伸策略和内容避让策略。
- 涉及软键盘时，必须说明弹出、收起和焦点变化三类时机的布局更新逻辑。
- 关键内容和核心点击区域不得放在挖孔区或不可交互区域。
- 未说明异常场景下的回退策略前，不得宣称避让方案完整。
- **VAL 阶段路由强制要求**：当验证涉及折叠设备多形态验证、hidumper 模拟、分辨率阶梯验证时，**不得在本 SKILL 内自行执行验证操作**（如直接调用 hdc 截屏、尝试悬浮窗等），必须按以下步骤路由：	 
  1. 读取 `../hmos-multidevice-scenario-entry/references/multi-device-verification.md`	 
  2. 按文档中的标准流程执行验证

- **HDS 组件升级提示**：当 DEV 阶段涉及以下避让场景时，应主动提示用户可考虑使用 HDS（UI Design Kit）组件以减少手动避让代码：
  - 手动安全区扩展 + 沉浸式布局 → `HdsNavigation` 的 `enableComponentSafeArea: true` 自动处理标题栏安全区
  - 手动 `expandSafeArea` + 背景延伸 → `HdsNavigation` 配合 `systemMaterialEffect`（沉浸光感材质）实现自适应沉浸式效果
  - `dynamicHideTitleBar` 可替代手动实现的滚动隐藏标题栏方案
  - HDS 组件详细 API 和示例参见 `../hmos-multidevice-scenario-entry/references/hds-ui-design-kit.md`，路由入口为 `SCENE-09`。
  - **升级建议不构成强制要求**；用户明确选择手动避让方案时，仍以本技能的 AVOID 场景为准。
  - `hdsMaterial`（沉浸光感）仅支持手机和平板，其他设备需回退到手动方案。

### 资源采纳优先级

当用户问题描述与 `RSC_AVOID_06`（scenario-development-cases.md）中的某个场景高度匹配时，必须按以下优先级采纳：

1. **场景方案（RSC_AVOID_06）为首要实现依据** — 其中的 API 调用、算法逻辑、组件结构、回调处理等细节不得省略或简化。如果场景方案提供了完整代码，必须完整采纳，不得选择性丢弃。
2. **指南文档（RSC_AVOID_01/02/03/04）为补充参考** — 仅在场景方案未覆盖的边界情况或需要额外解释时查阅，不得用指南文档中的通用描述替代场景方案中的具体实现。
3. **修复案例（RSC_AVOID_05）用于 FIX 阶段** — 仅在排查已有问题时参考，不用于新功能开发。

判断"高度匹配"的标准：用户描述的 UI 结构、交互行为、避让目标与场景方案的标题或描述基本一致（如"列表滚动隐藏标题栏"匹配场景1，"底部导航栏避让"匹配场景2）。

## 阶段标签

| 标签 | 阶段 | 当前模块关注点 |
| --- | --- | --- |
| `REQ` | 需求分析设计 | 避让区域类型、背景与内容边界、沉浸式适配、安全区扩展 |
| `DEV` | 开发 | 动态获取避让区域API、padding设置、窗口设置、expandSafeArea安全区域设置 |
| `FIX` | 问题修复 | 内容被系统栏区域遮挡、软键盘拉起遮挡内容、沉浸式错位、刘海区/挖孔区内容遮挡或交互失效 |
| `VAL` | 功能验证 | 截图证据、系统区域变化证据、键盘开闭证据 |

## 统一输出字段

- 路由字段：`active_phases`、`primary_phase`、`primary_scene`、`secondary_scenes`、`resources_used`
- `REQ`：`device_constraints`、`capability_boundary`、`acceptance_focus`
- `DEV`：`code_touchpoints`、`reuse_resources`、`implementation_notes`、`integration_risks`
- `FIX`：`problem_profile`、`root_cause_hypothesis`、`fix_plan`、`regression_watchlist`
- `VAL`：`verification_matrix`、`evidence_requirements`、`pass_criteria`、`residual_risks`

## 字段释义

- `device_constraints`：指由状态栏、导航栏、挖孔区、软键盘和沉浸式窗口带来的适配硬约束。在 `device-avoid-areas` 中，通常是哪些系统区域会遮挡内容、背景是否允许延伸、哪些交互区绝不能落入不可点击区域。
- `capability_boundary`：指当前避让方案在哪些窗口模式、系统 UI 状态或设备类型下有效，哪些场景需要回退或额外处理。
- `acceptance_focus`：指需求阶段验收时必须重点确认的遮挡现象、键盘开闭行为和系统区域变化表现。
- 统一输出字段中每个阶段列出的字段表示“命中避让场景后，该阶段必须输出这些字段”，由阶段决定输出内容，不再由场景单独定义。

## 场景决策树

```
用户提出避让区相关问题
│
├── Step 1: 阶段判断（primary_phase）
│   │
│   │  判断原则: 用户是否在描述已有代码/页面上出现的不正确结果
│   │
│   ├── FIX: 满足以下任一条件
│   │   ├── 用户描述了已有实现运行后的异常结果
│   │   │   强信号: "不生效"、"仍然是"、"错乱"、"跳变"、"返回值为0"、"被压缩"
│   │   │   中信号: "被遮挡"、"没有延伸"、"没有更新"、"重叠"、"上推"、"截断"
│   │   ├── 用户明确要求排查/修复已有问题
│   │   │   关键词: "排查原因"、"修复"、"为什么不生效"、"请排查"
│   │   └── prompt 同时包含 API/代码片段 + 异常结果（双重确认）
│   │
│   ├── DEV: 描述全新功能需求，无已有异常
│   │   关键词: "需要实现"、"请给出开发方案"、"请给出完整方案"
│   │   注意: "不能被遮挡"（设计约束）≠ "被遮挡"（已有问题）
│   │
│   └── REQ: 描述需求并要求分析/评估
│   │   关键词: "请给出需求分析"、"请分析"、"评估"
│
├── Step 2: 主场景路由（primary_scene）
│   │
│   ├── Q1: 是否涉及键盘弹出/遮挡输入框？
│   │   └── 是 → AVOID-04 软键盘避让与输入区稳定性
│   │       └── 结束路由
│   │
│   ├── Q2: 是否调用了 setWindowLayoutFullScreen 或 setWindowSystemBarProperties？
│   │   ├── 是 → AVOID-03 沉浸式全屏布局
│   │   │   └── 例外：如果核心是挖孔/Cutout遮挡UI元素 → AVOID-01（挖孔优先于全屏）
│   │   └── 否 → 继续 Q3
│   │
│   ├── Q3: 核心问题是"背景延伸但内容不延伸"？
│   │   │   特征关键词: expandSafeArea、背景铺满、内容保持安全区
│   │   ├── 是 → AVOID-02 安全区扩展与背景延伸
│   │   │   └── 例外：如果同时调用了全屏API → AVOID-03
│   │   └── 否 → 继续 Q4
│   │
│   └── Q4: 是否涉及避让区域信息的获取/监听？
│       │   特征关键词: getWindowAvoidArea、avoidAreaChange、
│       │             TYPE_CUTOUT、避让失效、返回异常值
│       ├── 是 → AVOID-01 避让区域识别与动态获取
│       └── 否 → 不命中避让区技能（not_in_scope）
│
└── Step 3: 关联场景补充（secondary_scenes）
    │   按用户问题中同时涉及的内容添加，无明确关联则输出 []
    │
    ├── AVOID-01 + AVOID-02: 同时涉及避让区域获取 + 背景延伸/内容边界
    ├── AVOID-01 + AVOID-03: 同时涉及避让区域获取 + 全屏模式
    ├── AVOID-03 + AVOID-02: 同时涉及全屏模式 + expandSafeArea
    ├── AVOID-04 + AVOID-01: 同时涉及键盘 + 多种避让区域监听
    └── []: 无明确关联
```

## 场景索引

#### `AVOID-01` 避让区域识别与动态获取

```yaml
scene_id: AVOID-01
scene_name: 避让区域识别与动态获取
phase_tags: [REQ, DEV, FIX, VAL]
intent_signals:
  - AvoidAreaType
  - TYPE_SYSTEM
  - TYPE_NAVIGATION_INDICATOR
  - TYPE_CUTOUT
  - TYPE_KEYBOARD
applies_when:
  - 需要动态获取系统栏、挖孔区或键盘区域
  - 当前问题表现为内容被系统区域遮挡
  - 涉及挖孔/Cutout/TYPE_CUTOUT 遮挡 UI 元素（最高优先级，即使同时使用全屏 API）
  - 折叠屏展开/折叠或横竖屏切换后，避让区域高度变化导致布局不更新
  - avoidAreaChange 监听未注册或 getWindowAvoidArea 时序问题导致获取旧值
  - getWindowAvoidArea 返回值异常（为 0 或不正确），且未使用全屏 API
not_applies_when:
  - 只是背景延伸且不涉及动态获取避让区域（属于 AVOID-02）
  - 已使用 setWindowLayoutFullScreen 或 setWindowSystemBarProperties 开启全屏，getWindowAvoidArea 只是为全屏布局提供避让参数（属于 AVOID-03）
  - 使用 setWindowLayoutFullScreen 后 getWindowAvoidArea 返回 0，属于全屏配置问题（属于 AVOID-03）
  - 仅涉及键盘弹出遮挡输入框（属于 AVOID-04）
  - 用户使用了 expandSafeArea 且问题出在内容层未加 padding 避让（属于 AVOID-02）
  - 用户问题主要涉及软键盘弹出遮挡，getWindowAvoidArea 只是辅助监听（属于 AVOID-04）
  - 问题核心是 padding 加在错误位置，而非避让区域获取（属于 AVOID-02）
decisions:
  REQ:
    - 确定目标避让区域类型：无输入框跳过 TYPE_KEYBOARD；内容不靠近边缘可降低优先级（参考 RSC_AVOID_06 场景5 状态栏适配中避让区域类型的选择）
    - 确定覆盖设备形态：折叠屏必须考虑展开/折叠后高度变化；平板注意导航条可能不存在
    - 确定是否需要持续监听：静态布局可一次性获取；支持旋转/折叠必须 avoidAreaChange
  DEV:
    - 选择获取方式：一次性用 getWindowAvoidArea，响应变化用 avoidAreaChange，通常两者配合（参考 RSC_AVOID_06 场景4 挖孔区四方向检测的实现）
    - 选择注册时机：全局复用在 onWindowStageCreate，单页面用在 aboutToAppear（注意窗口就绪时序）
    - 选择消费策略：padding（最常用）/ margin / 组件级 offset / 结构切换（横竖屏两套布局）
    - 处理时序兜底：avoidAreaChange 回调触发前用缓存值，getWindowAvoidArea 返回 0 时延迟重试
  FIX:
    - 定位问题环节：始终遮挡→获取环节；变化后遮挡→监听环节（参考 RSC_AVOID_05 场景11）；首次加载遮挡→时序环节（参考 RSC_AVOID_05 场景10）
    - 检查避让类型完整性：是否遗漏 TYPE_CUTOUT 或 TYPE_NAVIGATION_INDICATOR（参考 RSC_AVOID_05 场景2 挖孔区未检测 TYPE_CUTOUT）
    - 检查回调链路：是否注册 → 注册时机是否正确 → 回调是否触发 → UI 状态是否绑定
    - 检查设备形态切换：折叠屏展开/横竖屏旋转后回调是否重新触发、值是否正确更新（参考 RSC_AVOID_05 场景10 windowSizeChange 时序问题、场景12 display.on 时序跳变）
  VAL:
    - 截图验证：直板竖屏/横屏、折叠屏折叠态/展开态、平板默认态
    - 动态变化证据：旋转前后、折叠/展开前后的截图对比
    - 数值验证：getWindowAvoidArea 返回值不为 0，avoidAreaChange 回调值在变化前后不同
resource_refs:
  - RSC_AVOID_01
  - RSC_AVOID_05
  - RSC_AVOID_06
```

#### `AVOID-02` 安全区扩展与背景延伸

```yaml
scene_id: AVOID-02
scene_name: 安全区扩展与背景延伸
phase_tags: [REQ, DEV, FIX, VAL]
intent_signals:
  - expandSafeArea
  - SafeAreaType
  - SafeAreaEdge
  - 背景延伸
  - 背景色铺满状态栏
  - 图片延伸到系统栏
  - 内容保持在安全区
applies_when:
  - 背景需要铺满系统区域，但内容仍需保持在安全区内
  - 需要明确顶部和底部内容边界
  - 未调用 setWindowLayoutFullScreen，仅用 expandSafeArea 延伸背景
  - 核心特征是"背景延伸、内容不延伸"
  - expandSafeArea 已设置但背景未延伸或内容层未留 padding
  - padding 加在了外层容器而非子组件上，导致背景色出现间隙（属于分层问题，不是全屏设置问题）
not_applies_when:
  - 页面使用了 setWindowLayoutFullScreen 开启全屏（属于 AVOID-03）
  - 使用了 setWindowSystemBarProperties 设置状态栏透明（属于 AVOID-03）
  - 涉及避让系统导航条 + 沉浸效果且使用 AvoidAreaManager 管理器（属于 AVOID-03）
  - 涉及键盘弹出遮挡输入框（属于 AVOID-04）
  - 需要动态获取避让区域类型（属于 AVOID-01）
decisions:
  REQ:
    - 确定需要延伸的层：背景层（颜色/图片）必须铺满系统栏区域，内容层（文字/按钮）必须保持在安全区内
    - 确定延伸方向：通常顶部（状态栏）和底部（导航条），左右视设计稿决定
    - 确定内容安全间距：内容距离安全区边缘的最小距离，是否需要额外留白
  DEV:
    - 选择 expandSafeArea 参数：SafeAreaType 指定 SYSTEM/CUTOUT/KEYBOARD，SafeAreaEdge 指定 TOP/BOTTOM/START/END
    - 决定设置层级：expandSafeArea 加在背景容器上，而非内容组件上
    - 决定内容层 padding 补偿：背景延伸后内容层需手动加 padding 保持安全区，padding 必须加在子组件上（加在外层容器会导致背景色间隙）
    - 处理 SafeAreaEdge 遗漏：只设 TOP 不设 BOTTOM → 底部出现间隙；需按设计稿逐方向确认
  FIX:
    - 定位间隙来源：背景色在系统栏区域出现间隙 → padding 加在了外层容器而非子组件，分层策略有误（参考 RSC_AVOID_05 场景4 顶部 padding 位置错误导致背景色间隙）
    - 定位内容溢出：内容跑到状态栏区域 → expandSafeArea 错误地加在了内容层而非背景层
    - 排查全屏 API 干扰：如果同时调了 setWindowLayoutFullScreen，问题可能属于 AVOID-03 而非本场景
  VAL:
    - 截图验证：安全区边界处背景是否铺满、内容是否保持安全距离
    - 多设备验证：不同状态栏高度、有无导航条的设备上表现是否一致
    - 旋转验证：横竖屏切换后背景是否仍然延伸、内容是否仍然安全
resource_refs:
  - RSC_AVOID_02
  - RSC_AVOID_05
```

#### `AVOID-03` 沉浸式全屏布局

```yaml
scene_id: AVOID-03
scene_name: 沉浸式全屏布局
phase_tags: [REQ, DEV, FIX, VAL]
intent_signals:
  - setWindowLayoutFullScreen
  - 全屏
  - 沉浸式
  - 状态栏透明
  - 列表沉浸
  - 滚动隐藏标题栏
  - 浮层 TabBar
  - 阅读器全屏
  - 视频播放全屏
applies_when:
  - 页面需要背景或媒体内容铺满边缘
  - 当前问题表现为全屏后内容与系统栏重叠
  - 列表/信息流场景需要上滑隐藏标题栏和导航栏
  - 核心特征是"调用了 setWindowLayoutFullScreen 或状态栏透明设置"
  - 涉及浮层 TabBar、自定义导航栏等全屏场景组件
not_applies_when:
  - 仅使用 expandSafeArea 背景延伸，未开启全屏（属于 AVOID-02）
  - 问题核心是 padding 加在了错误位置（如外层容器而非子组件），而非全屏设置问题（属于 AVOID-02）
  - 问题核心是 avoidAreaChange 监听未注册或 getWindowAvoidArea 时序问题导致折叠屏变化后不更新（属于 AVOID-01）
  - 涉及键盘弹出导致布局问题（属于 AVOID-04）
  - 仅需要获取避让区域高度，不涉及全屏（属于 AVOID-01）
  - 涉及挖孔遮挡 UI 元素（属于 AVOID-01，挖孔优先于全屏）
decisions:
  REQ:
    - 确定沉浸式类型：完全沉浸（视频/阅读器全屏）、半沉浸（列表上滑隐藏标题栏）（参考 RSC_AVOID_06 场景1 列表滚动沉浸）、持续沉浸（自定义导航栏+透明状态栏）
    - 确定系统栏可见性：完全隐藏 vs 透明显示 vs 半透明叠加
    - 确定退出机制：返回键退出、手势退出、超时自动退出
  DEV:
    - 选择窗口级 API：setWindowLayoutFullScreen 开启全屏 + setWindowSystemBarProperties 设置状态栏颜色/透明度
    - 选择页面级避让策略：全屏后内容延伸到系统栏区域，需在页面内用 avoidAreaChange 获取高度手动处理 padding
    - 处理列表沉浸：上滑隐藏标题栏 → 监听滚动偏移量动态调整；浮层 TabBar → offset 跟随滚动（参考 RSC_AVOID_06 场景1 onScrollFrameBegin 线性比例算法）
    - 处理自定义导航栏：padding-top = 状态栏高度（从 avoidAreaChange 获取），不能硬编码
    - 识别实践场景：命中 list immersive / video immersive / reading immersive 时必须逐条对照实现（参考 RSC_AVOID_06 场景1/2/3 的完整方案）
  FIX:
    - 确认全屏是否生效：setWindowLayoutFullScreen 调用后 getWindowAvoidArea 仍返回 0 → 全屏配置未生效或调用时机不对
    - 定位内容遮挡：全屏后内容跑到状态栏下面 → 页面内未加避让 padding 或未注册 avoidAreaChange（参考 RSC_AVOID_05 场景1 阅读器顶部遮挡、场景7 底部被导航指示器遮挡）
    - 定位系统栏显示异常：setWindowSystemBarProperties 后状态栏仍不透明 → 检查调用时机（需在窗口创建后）和参数格式
    - 排查非全屏场景：如果未调用 setWindowLayoutFullScreen，问题属于 AVOID-01 或 AVOID-02
  VAL:
    - 截图验证：全屏模式下背景是否铺满、内容是否合理避让
    - 系统栏交互验证：滑动/点击时系统栏是否按预期显示/隐藏/恢复
    - 多设备验证：不同状态栏高度下自定义导航栏高度是否正确
    - 退出验证：各种退出方式是否正常恢复非沉浸状态
resource_refs:
  - RSC_AVOID_03
  - RSC_AVOID_06
  - RSC_AVOID_05
```

#### `AVOID-04` 软键盘避让与输入区稳定性

```yaml
scene_id: AVOID-04
scene_name: 软键盘避让与输入区稳定性
phase_tags: [REQ, DEV, FIX, VAL]
intent_signals:
  - keyboardAvoidMode
  - avoidAreaChange
  - 输入框被遮挡
  - 键盘弹出
applies_when:
  - 输入框、按钮或底部操作栏会被软键盘遮挡
  - 当前问题表现为键盘开闭导致内容跳动或错位
not_applies_when:
  - 页面没有输入交互
  - 不涉及软键盘，仅涉及系统栏或挖孔区（属于 AVOID-01/02/03）
decisions:
  REQ:
    - 确定页面输入场景：单输入框（登录页）、多输入框（表单）、底部输入框（聊天页）、固定底部栏（底部按钮+输入框）
    - 确定避让期望：内容上推/滚动到可见区域/底部栏固定上移/布局重排
    - 确定焦点切换行为：多输入框间切换时是否需要平滑滚动
    - 确定键盘收起后恢复：是否立即恢复原位、是否有动画过渡
  DEV:
    - 选择 keyboardAvoidMode：RESIZE（调整窗口大小，适合固定布局）PAN（平移内容，适合单输入框简单场景）OFFSET（偏移，适合有底部固定栏的场景）
    - 处理底部固定栏：键盘弹出后底部栏需上移 → 通过 avoidAreaChange 中 TYPE_KEYBOARD 获取高度计算 offset
    - 处理列表/表单滚动：键盘弹出后自动滚动到焦点输入框 → 结合 scroller.scrollToIndex 或 scrollTo
    - 处理键盘动画时序：键盘收起动画期间布局可能跳动 → avoidAreaChange 回调中 keyboard height 从非 0 变为 0 时延迟恢复
  FIX:
    - 定位问题类型：输入框被遮挡 → 避让模式或 offset 计算有误；布局跳动 → 键盘弹出/收起动画冲突；底部栏异常 → 固定定位与键盘避让策略冲突
    - 检查 keyboardAvoidMode：是否选错模式（如列表页用了 PAN 导致内容被裁切而非滚动）
    - 检查焦点与滚动同步：点击输入框后是否自动滚动到可见位置，多输入框切换时是否跟随
    - 检查键盘收起恢复：收起后布局是否恢复原位、是否有残留 offset、快速弹出/收起时是否稳定
    - 排查非键盘问题：如果遮挡来自系统栏或挖孔而非键盘 → 属于 AVOID-01/02/03
  VAL:
    - 截图验证：键盘弹出时输入框是否可见、底部栏是否正确上移
    - 键盘收起验证：收起后布局是否恢复原位、无残留偏移
    - 焦点切换验证：多输入框间切换时页面是否平滑滚动到目标输入框
    - 多输入法验证：系统键盘 vs 第三方输入法（高度不同）表现是否一致
    - 边界场景：快速弹出/收起、横屏键盘、物理键盘连接时的稳定性
resource_refs:
  - RSC_AVOID_01
  - RSC_AVOID_04
  - RSC_AVOID_05
  - RSC_AVOID_06
```

## 资源索引

#### `RSC_AVOID_01` 避让区域类型参考

```yaml
resource_id: RSC_AVOID_01
resource_type: reference
path: ./references/avoid_area_types.md
used_for:
  - 识别系统栏、导航栏、挖孔区和键盘区域类型
  - 设计动态获取与监听策略
load_when:
  - 命中 AVOID-01 或 AVOID-04
avoid_when:
  - 当前不涉及系统区域和键盘区域
supports_scenes:
  - AVOID-01
  - AVOID-04
output_fields:
  - device_constraints
  - capability_boundary
  - implementation_notes
  - root_cause_hypothesis
  - verification_matrix
```

#### `RSC_AVOID_02` 安全区扩展参考

```yaml
resource_id: RSC_AVOID_02
resource_type: reference
path: ./references/safe_area_api.md
used_for:
  - 定义安全区扩展和背景延伸的边界
  - 判断内容层与背景层的职责划分
load_when:
  - 命中 AVOID-02
avoid_when:
  - 页面不使用安全区扩展
supports_scenes:
  - AVOID-02
output_fields:
  - device_constraints
  - capability_boundary
  - implementation_notes
  - fix_plan
  - pass_criteria
```

#### `RSC_AVOID_03` 沉浸式布局参考

```yaml
resource_id: RSC_AVOID_03
resource_type: reference
path: ./references/immersive_layout.md
used_for:
  - 定义窗口级全屏和页面级避让的配合方式
  - 排查沉浸式布局中的内容遮挡问题
load_when:
  - 命中 AVOID-03
avoid_when:
  - 页面不需要沉浸式展示
supports_scenes:
  - AVOID-03
output_fields:
  - device_constraints
  - implementation_notes
  - root_cause_hypothesis
  - verification_matrix
  - residual_risks
```

#### `RSC_AVOID_04` 键盘避让参考

```yaml
resource_id: RSC_AVOID_04
resource_type: reference
path: ./references/keyboard_handling.md
used_for:
  - 设计键盘弹出、收起和焦点切换时的避让逻辑
  - 排查输入区跳动、按钮被遮挡等问题
load_when:
  - 命中 AVOID-04
avoid_when:
  - 页面没有输入交互
supports_scenes:
  - AVOID-04
output_fields:
  - acceptance_focus
  - implementation_notes
  - fix_plan
  - verification_matrix
  - evidence_requirements
```

#### `RSC_AVOID_05` 问题修复案例集

```yaml
resource_id: RSC_AVOID_05
resource_type: reference
path: ./references/bug-fix-cases.md
used_for:
  - 排查状态栏遮挡、挖孔区遮挡、沉浸式布局错位、键盘避让异常等常见问题
  - 排查安全区扩展与背景延伸相关的 padding 位置错误、背景色间隙等问题
load_when:
  - 命中 AVOID-01 或 AVOID-02 或 AVOID-03 或 AVOID-04 且处于 FIX 阶段
avoid_when:
  - 当前不涉及问题修复
supports_scenes:
  - AVOID-01
  - AVOID-02
  - AVOID-03
  - AVOID-04
output_fields:
  - problem_profile
  - root_cause_hypothesis
  - fix_plan
  - regression_watchlist
```

#### `RSC_AVOID_06` 开发场景方案集

```yaml
resource_id: RSC_AVOID_06
resource_type: reference
path: ./references/scenario-development-cases.md
used_for:
  - 提供沉浸式布局等场景的完整开发方案与分步实现
  - 提供挖孔区适配、底部导航栏避让、状态栏适配、键盘易操作等场景的完整开发方案
load_when:
  - 命中 AVOID-01 或 AVOID-03 或 AVOID-04 且处于 REQ 或 DEV 阶段
avoid_when:
  - 当前处于 FIX 阶段（应走 RSC_AVOID_05）
supports_scenes:
  - AVOID-01
  - AVOID-03
  - AVOID-04
output_fields:
  - acceptance_focus
  - implementation_notes
  - code_touchpoints
  - verification_matrix
```
