---
name: hmos-multidevice-natural-orientation
description: 鸿蒙 HarmonyOS 屏幕方向与旋转相关的需求分析、开发实现、问题修复和功能验证。当任务涉及以下场景时使用：setPreferredOrientation、屏幕旋转(rotation)、屏幕方向(orientation)、自然方向、折叠屏方向、三折叠G态、follow_desktop、视频横竖屏切换、短视频自适应旋转、多设备方向策略、module.json5方向配置、方向监听、旋转检测、分屏旋转、折叠屏展开态方向、窗口方向设置、方向Bug修复。
metadata:
  version: 1.0.1
  keywords:
    - 自然方向
    - 屏幕旋转
    - 屏幕方向
    - orientation
    - rotation
    - setPreferredOrientation
    - follow_desktop
    - 横竖屏切换
    - 视频横屏
    - 短视频旋转
    - 方向监听
    - 旋转检测
    - 窗口方向
    - 折叠屏方向
    - 三折叠G态
    - module.json5方向配置
---

# 设备自然方向与屏幕旋转适配

## 技能定义

| 字段 | 内容 |
| --- | --- |
| `skill_id` | `device-natural-orientation` |
| `skill_name` | `设备自然方向适配` |
| `one_line_purpose` | 为自然竖屏、自然横屏和特殊折叠态提供统一方向判定与更新策略。 |
| `device_scope` | `phone / tablet / 2in1 / wearable / tv` |
| `problem_scope` | `屏幕旋转(rotation)、屏幕方向(display orientation)、窗口方向(window orientation)、自然方向差异、传感器旋转检测、多设备方向映射、三折叠 G 态方向、视频横竖屏切换、短视频自适应旋转` |
| `not_in_scope` | `与方向无关的纯布局问题、web视觉翻转的场景、折叠屏折痕避让（属 device-avoid-areas）、交互输入方式适配（属 interaction-methods）、硬件能力检测（属 hardware-access）` |
| `primary_outputs` | `primary_scene, device_constraints, code_touchpoints, implementation_notes, fix_plan, verification_matrix` |

## 核心约束

1. 先区分屏幕旋转(rotation)、屏幕方向(display orientation)和窗口方向(window orientation)，三者含义和用途不同，不可混用
2. 控制应用显示方向必须通过窗口侧 `setPreferredOrientation()` 设置旋转策略，不能通过屏幕属性设置
3. 涉及多设备适配时，必须明确目标设备的自然方向类型：自然竖屏(rotation=0 为 PORTRAIT)、自然横屏(rotation=0 为 LANDSCAPE)、三折叠 G 态(rotation=0 为 LANDSCAPE_INVERTED)
4. 分屏/悬浮窗/自由窗口场景下 `setPreferredOrientation()` 静默无效，应通过响应式布局适配窗口尺寸
5. 折叠屏设备 `deviceInfo.deviceType` 返回 `'phone'`，不能通过 deviceType 区分折叠屏与直板机，需使用 `display.isFoldable()`
6. 输出方案必须说明方向变化后的 UI 更新逻辑和生命周期管理（保存/恢复方向）
7. **VAL 阶段路由强制要求**：当验证涉及折叠设备多形态验证、hidumper 模拟、分辨率阶梯验证时，**不得在本 SKILL 内自行执行验证操作**（如直接调用 hdc 截屏、尝试悬浮窗等），必须按以下步骤路由：
- 读取 `../hmos-multidevice-scenario-entry/references/multi-device-verification.md`
- 按文档中的标准流程执行验证

## 三块主线结构

模块主线固定为三块，先按主线归类，再进入场景细分：

| 主线 | 主场景 | 主资源 |
| --- | --- | --- |
| 检测监听 | `ORIENT-01` | `RSC_ORIENT_03` |
| 适配策略 | `ORIENT-02`、`ORIENT-03` | `RSC_ORIENT_02`、`RSC_ORIENT_04` |
| 问题修复 | `ORIENT-04` | `RSC_ORIENT_05` |

说明：
- `RSC_ORIENT_01`（`orientation_concepts.md`）为基础概念资源，非独立场景，由各场景按需引用。
- 三块主线覆盖了方向适配的完整链路：感知变化 → 策略适配 → 问题修复。

## 阶段标签

| 标签 | 阶段 | 当前模块关注点 |
| --- | --- | --- |
| `REQ` | 需求分析设计 | 设备方向差异、自然方向类型、旋转能力边界、验收口径 |
| `DEV` | 开发 | 代码落点、旋转策略选择、断点判断、资源绑定 |
| `FIX` | 问题修复 | 根因分析（概念混淆/检测错误/映射错误）、最小改动路径、回归点 |
| `VAL` | 功能验证 | 设备覆盖矩阵、方向切换证据、通过标准 |

## 统一输出字段

- 路由字段：`active_phases`、`primary_phase`、`primary_scene`、`secondary_scenes`、`resources_used`
- `REQ`：`device_constraints`、`capability_boundary`、`acceptance_focus`
- `DEV`：`code_touchpoints`、`reuse_resources`、`implementation_notes`、`integration_risks`
- `FIX`：`problem_profile`、`root_cause_hypothesis`、`fix_plan`、`regression_watchlist`
- `VAL`：`verification_matrix`、`evidence_requirements`、`pass_criteria`、`residual_risks`

## 字段释义

- `device_constraints`：指由自然竖屏、自然横屏、rotation 语义、窗口方向和特殊折叠态带来的适配硬约束。在 `device-natural-orientation` 中，通常是需要支持哪些自然方向类型、rotation 如何解释、哪些场景禁止混用屏幕旋转和窗口方向概念。
- `capability_boundary`：指当前方向策略在哪些设备形态和方向模式下成立，哪些场景需要单独降级或绕开。
- `acceptance_focus`：指需求阶段验收时必须确认的方向判定结果、切换一致性和布局更新触发条件。
- scene 中 `deliverables.REQ` 出现 `device_constraints`，表示"该方向场景命中后，需求分析必须先给出设备约束结论"，不是在场景层重新发明字段。

## 场景决策树

```
开始
  │
  ├─→ 步骤1: 分析是否涉及旋转角度获取、方向变化监听、传感器检测、调试旋转问题
  │     └─→ 涉及 → 命中 `ORIENT-01` → 步骤2
  │     └─→ 不涉及 → 步骤2
  │
  ├─→ 步骤2: 分析是否涉及多设备方向适配、一多策略、折叠屏方向、三折叠 G 态、module.json5 方向配置、断点判断
  │     └─→ 涉及 → 命中 `ORIENT-02` → 步骤3
  │     └─→ 不涉及 → 步骤3
  │
  ├─→ 步骤3: 分析是否涉及视频横竖屏切换、短视频自适应旋转、adaptive_video 三方库、屏幕锁定
  │     └─→ 涉及 → 命中 `ORIENT-03` → 步骤4
  │     └─→ 不涉及 → 步骤4
  │
  └─→ 步骤4: 分析是否涉及方向适配 Bug（折叠屏强制竖屏、Tabs 方向锁定、分屏旋转失效、全屏退出未恢复、开合闪烁）
        └─→ 涉及 → 命中 `ORIENT-04` → 结束
        └─→ 不涉及 → 结束
```

> 涉及 rotation/orientation 概念区分、自然方向定义、18 种旋转策略等概念性问题时，先加载 `RSC_ORIENT_01`（`orientation_concepts.md`）作为前置知识。

## 场景索引

#### `ORIENT-01` 屏幕旋转检测与方向变化监听

```yaml
scene_id: ORIENT-01
scene_name: 屏幕旋转检测与方向变化监听
phase_tags: [DEV, FIX, VAL]
priority: P0
intent_signals:
  - "如何获取旋转角度"
  - "传感器检测方向"
  - "重力传感器 atan2"
  - "监听屏幕旋转"
  - "windowSizeChange"
  - "display.on('change')"
  - "hdc 调试旋转"
  - "获取设备握持角度"
  - "旋转180° 不触发"
applies_when:
  - 需要获取连续旋转角度而非离散方向
  - 需要监听方向变化并响应
  - 需要调试旋转相关问题
  - 需要实现自定义旋转检测逻辑
not_applies_when:
  - 只需使用系统旋转策略，不需要自定义检测
  - 概念不清，需先理解基础概念
decisions:
  DEV:
    - 优先使用系统旋转策略（setPreferredOrientation），仅当系统策略不满足时才自定义传感器检测
    - display.on('change') 回调中必须通过 Display 实例获取信息，不能通过 Window 实例（有时序问题）
    - windowSizeChange 在旋转 180° 时不触发，需结合 display.on('change') 补充
    - 传感器数据需防抖和平滑处理，回调必须使用命名引用以便取消
  FIX:
    - 检查回调链路：是否注册 → 注册时机是否正确 → 回调是否触发 → UI 状态是否绑定
    - display.on('change') 回调中通过 Window 实例获取信息存在时序问题，应改用 Display 实例（参考 RSC_ORIENT_03 时序问题说明）
  VAL:
    - 旋转后 rotation 值在回调触发时立即更新，180° 旋转不遗漏
    - 快速连续旋转不产生回调风暴（防抖生效），页面退出后回调已取消
resource_refs:
  - RSC_ORIENT_01
  - RSC_ORIENT_03
```

#### `ORIENT-02` 多设备方向适配（一多策略）

```yaml
scene_id: ORIENT-02
scene_name: 多设备方向适配（一多策略）
phase_tags: [REQ, DEV, FIX, VAL]
priority: P0
intent_signals:
  - "多设备方向适配"
  - "折叠屏方向"
  - "三折叠 G 态"
  - "follow_desktop"
  - "348vp 阈值"
  - "一多方向策略"
  - "module.json5 orientation"
  - "AUTO_ROTATION_RESTRICTED"
  - "断点判断方向"
  - "WidthBreakpoint"
  - "折叠屏展开态方向"
applies_when:
  - 同一应用需适配多种设备形态的方向策略
  - 需要配置 module.json5 方向
  - 需要选择设备方向映射策略
  - 需要理解三折叠 G 态特殊性
not_applies_when:
  - 纯概念理解不涉及适配实现
  - 只涉及视频横竖屏切换（应命中 ORIENT-03）
  - 只涉及传感器检测不涉及多设备策略选择
decisions:
  REQ:
    - 确定目标设备形态的自然方向：直板机/折叠屏折叠态/三折叠 F/M 态/平板为自然竖屏，PC/2in1 为自然横屏，三折叠 G 态 rotation=0 对应 LANDSCAPE_INVERTED
    - 确定旋转策略：一多推荐 module.json5 配置 follow_desktop + 运行时基于断点动态切换
    - 确定验收标准：各设备形态下方向行为预期（参考 RSC_ORIENT_02 设备旋转能力一览）
  DEV:
    - 优先使用系统断点 API（WidthBreakpoint/HeightBreakpoint）判断设备形态，而非 deviceInfo.deviceType
    - 折叠屏 deviceInfo.deviceType 返回 'phone'，需用 display.isFoldable() + 断点系统区分
    - 基于最小边或断点组合动态切换旋转策略：小屏锁竖屏，大屏支持自动旋转
    - 页面级方向策略：进入时保存方向、退出时恢复，必须成对调用 setPreferredOrientation()
  FIX:
    - 检查是否用 deviceInfo.deviceType 区分折叠屏（误判根因）→ 改用 display.isFoldable() + 断点（参考 RSC_ORIENT_05 案例1）
    - 检查分屏/悬浮窗下旋转策略失效 → 这是系统行为，应改为响应式布局适配（参考 RSC_ORIENT_05 案例3）
    - 检查 px2vp 阈值判断是否受 DPI 缩放影响 → 改用物理像素或断点 API（参考 RSC_ORIENT_05 案例6）
  VAL:
    - 截图验证：直板竖屏、折叠屏折叠态/展开态、平板各方向行为
    - 动态变化证据：折叠屏开合、横竖屏旋转前后截图对比
    - 数值验证：setPreferredOrientation 调用值与预期一致
resource_refs:
  - RSC_ORIENT_01
  - RSC_ORIENT_02
```

#### `ORIENT-03` 视频应用横竖屏切换与自适应旋转

```yaml
scene_id: ORIENT-03
scene_name: 视频应用横竖屏切换与自适应旋转
phase_tags: [DEV, FIX, VAL]
priority: P0
intent_signals:
  - "视频横竖屏切换"
  - "USER_ROTATION_LANDSCAPE"
  - "短视频自适应旋转"
  - "adaptive_video"
  - "视频全屏"
  - "屏幕锁定"
  - "横竖屏性能优化"
  - "视频全屏退出恢复"
applies_when:
  - 视频播放页需要横竖屏切换
  - 短视频页面需要自适应旋转
  - 视频全屏退出后方向未恢复
  - 需要使用 adaptive_video 三方库
not_applies_when:
  - 非视频类应用的方向适配
  - 不涉及视频播放的方向问题
decisions:
  DEV:
    - 视频全屏用 USER_ROTATION_LANDSCAPE，退出时恢复之前保存的方向
    - 进入时保存方向、退出时恢复，必须成对调用 setPreferredOrientation()
    - 折叠屏展开态视频全屏时不旋转，直接调整播窗大小
    - Navigation 场景用 onShown/onHidden 处理方向切换
    - Tabs 场景方向控制放 Tabs.onChange，不放子组件生命周期
    - 短视频自适应旋转：根据视频宽高比和设备断点分别设置旋转策略（参考 RSC_ORIENT_04 短视频自适应旋转章节）
  FIX:
    - 定位方向未恢复：检查 aboutToDisappear / onHidden 是否恢复方向、是否保存了进入前的方向值（参考 RSC_ORIENT_05 案例4）
    - 定位方向锁定异常：检查 Tabs 子组件生命周期陷阱（aboutToAppear 只触发一次）→ 改用 Tabs.onChange（参考 RSC_ORIENT_05 案例2）
    - 定位 Swiper 重复锁定：检查 Swiper.onChange 中是否重复调用 setPreferredOrientation
  VAL:
    - 截图验证：全屏/退出后方向正确、折叠屏展开态播窗大小正确
    - 连续操作验证：快速全屏/退出不导致方向状态错乱
    - 性能验证：旋转时非必要组件不重复布局（freezeWhenInactive）
resource_refs:
  - RSC_ORIENT_01
  - RSC_ORIENT_04
```

#### `ORIENT-04` 方向适配问题修复

```yaml
scene_id: ORIENT-04
scene_name: 方向适配问题修复
phase_tags: [DEV, FIX, VAL]
priority: P0
intent_signals:
  - "方向锁定异常"
  - "折叠屏被强制竖屏"
  - "Tabs 方向 Bug"
  - "分屏旋转失效"
  - "全屏退出方向未恢复"
  - "折叠屏开合闪烁"
  - "方向适配Bug"
  - "Swiper 方向锁定"
  - "aboutToAppear 方向不恢复"
  - "Navigation 方向异常"
applies_when:
  - 遇到方向适配 Bug（强制竖屏、锁定失效、闪烁等）
  - 折叠屏展开态方向异常
  - Tabs/Swiper 方向锁定问题
  - 分屏/悬浮窗下旋转不生效
  - 折叠屏开合布局闪烁
not_applies_when:
  - 新需求设计，不涉及 Bug 修复
  - 纯概念理解，不涉及实际修复
decisions:
  DEV:
    - Bug 修复优先尊重开发者原有适配方式，在其方案基础上修复，不强制切换方案
  FIX:
    - 先归类问题类型（概念混淆/检测错误/映射错误），再选对应修复方案
    - 修复顺序统一为：监听入口 → 几何/状态 → 布局/交互 → 生命周期回收 → 回归验证
    - 概念不清时先加载 RSC_ORIENT_01 确认概念是否被混淆
    - 按案例匹配修复方案（参考 RSC_ORIENT_05 案例库）
  VAL:
    - 设备矩阵覆盖：直板机/折叠屏折叠态/展开态/悬停态/平板/PC
    - 方向变化证据：hdc 日志（rotation/orientation 值）、截图对比
    - 回归验证：修复不破坏已有设备形态的方向行为
resource_refs:
  - RSC_ORIENT_01
  - RSC_ORIENT_02
  - RSC_ORIENT_05
```

## 资源索引

优先读取 P0 官方路径作为主方案，P1 工程模板仅作补充。

#### `RSC_ORIENT_01` 方向概念与 API 速查

```yaml
resource_id: RSC_ORIENT_01
resource_type: reference
path: ./references/orientation_concepts.md
used_for:
  - 理解屏幕旋转/屏幕方向/窗口方向的区别
  - 掌握自然方向概念和 18 种旋转策略
  - API 速查（display/window 核心接口）
  - 理解分屏/自由窗口下的方向行为限制
load_when:
  - 需求阶段定义设备方向差异
  - Bug 修复时确认概念是否混淆
  - 需要选择旋转策略枚举值
  - 方向概念不清时作为前置知识加载
avoid_when:
  - 已明确概念和策略，只需写代码
supports_scenes:
  - ORIENT-01
  - ORIENT-02
  - ORIENT-03
  - ORIENT-04
output_fields:
  - device_constraints
  - capability_boundary
  - acceptance_focus
  - problem_profile
  - root_cause_hypothesis
```

#### `RSC_ORIENT_02` 多设备方向适配指南

```yaml
resource_id: RSC_ORIENT_02
resource_type: reference
path: ./references/orientation_adaptation.md
used_for:
  - 多设备方向适配策略（一多）
  - 设备旋转能力一览（12 种设备/形态的旋转支持情况）
  - follow_desktop 策略详解与 module.json5 方向配置
  - 基于断点的动态旋转策略（最小边判断 + 横向纵向断点组合）
  - 运行时页面级方向策略切换（保存/恢复模式）
  - 三折叠 G 态适配
  - 常见方向适配问题（deviceType 误判、display 时序、PC 不生效等）
load_when:
  - 一多场景方向适配设计或实现
  - 需要选择设备方向映射策略
  - Bug 修复时需要参考多设备方向适配策略
avoid_when:
  - 纯概念理解不涉及适配实现
supports_scenes:
  - ORIENT-02
  - ORIENT-04
output_fields:
  - device_constraints
  - capability_boundary
  - code_touchpoints
  - implementation_notes
  - integration_risks
  - fix_plan
```

#### `RSC_ORIENT_03` 旋转检测指南

```yaml
resource_id: RSC_ORIENT_03
resource_type: reference
path: ./references/rotation_detection.md
used_for:
  - 传感器旋转检测（重力传感器 atan2）
  - 监听屏幕/窗口方向变化
  - 调试旋转问题（hdc 命令、日志过滤）
  - API 版本要求
load_when:
  - 需要获取连续旋转角度
  - 需要监听方向变化
  - 需要调试旋转问题
avoid_when:
  - 只需系统旋转策略，不需要自定义检测
supports_scenes:
  - ORIENT-01
output_fields:
  - code_touchpoints
  - implementation_notes
  - integration_risks
  - fix_plan
  - evidence_requirements
  - verification_matrix
```

#### `RSC_ORIENT_04` 视频横竖屏切换指南

```yaml
resource_id: RSC_ORIENT_04
resource_type: reference
path: ./references/video_rotation.md
used_for:
  - 视频类应用横竖屏切换实现
  - 短视频自适应旋转
  - adaptive_video 三方库使用
  - 屏幕锁定功能
  - 横竖屏切换性能优化
load_when:
  - 视频播放页需要横竖屏切换
  - 短视频页面需要自适应旋转
avoid_when:
  - 非视频类应用的方向适配
supports_scenes:
  - ORIENT-03
output_fields:
  - code_touchpoints
  - reuse_resources
  - implementation_notes
  - integration_risks
  - fix_plan
  - regression_watchlist
```

#### `RSC_ORIENT_05` 方向适配问题修复场景库

```yaml
resource_id: RSC_ORIENT_05
resource_type: reference
path: ./references/bug-fix-cases.md
used_for:
  - 方向适配实际 Bug 案例与修复方案
  - 折叠屏展开态被强制竖屏（deviceType 误判）
  - Tabs + Swiper 方向锁定（生命周期陷阱）
  - 分屏/悬浮窗下旋转失效（系统忽略策略）
  - 视频全屏退出方向未恢复（未成对恢复）
  - 折叠屏开合布局闪烁（foldStatusChange 时序问题）
  - 显示大小缩放后强制竖屏（px2vp 依赖 DPI）
  - XComponent 相机预览旋转错乱与黑屏（Surface 旋转锁）
  - 折叠屏竖屏下 Navigation Split 分栏拥挤（Split 误触）
  - 折叠屏外屏切内屏后返回自动转竖屏（方向快照过期）
load_when:
  - 遇到方向适配 Bug
avoid_when:
  - 新需求设计，不涉及 Bug 修复
supports_scenes:
  - ORIENT-04
output_fields:
  - code_touchpoints
  - implementation_notes
  - problem_profile
  - root_cause_hypothesis
  - fix_plan
  - regression_watchlist
  - evidence_requirements
  - verification_matrix
```


## 方向速查

| 设备 | 自然方向 | rotation=0 含义 | 默认是否支持旋转 |
|------|---------|---------------|----------------|
| 直板手机 | 竖屏 | PORTRAIT | 否 |
| 折叠屏折叠态 | 竖屏 | PORTRAIT | 否 |
| 折叠屏展开态 | 竖屏 | PORTRAIT | 否（但桌面可旋转） |
| 阔折叠 (Pura X) 折叠态 | — (1:1 方屏) | — | 否 |
| 阔折叠 (Pura X) 展开态 | 竖屏 | PORTRAIT | 否 |
| 阔折叠 (Pura X Max) 展开态 | 横屏 | LANDSCAPE | 是 |
| 三折叠 F/M 态 | 竖屏 | PORTRAIT | 否 |
| 三折叠 G 态 | 横屏 | LANDSCAPE_INVERTED | 是 |
| 平板 | 竖屏 | PORTRAIT | 是 |
| PC/2in1 | 横屏 | LANDSCAPE | 不支持旋转策略 |
