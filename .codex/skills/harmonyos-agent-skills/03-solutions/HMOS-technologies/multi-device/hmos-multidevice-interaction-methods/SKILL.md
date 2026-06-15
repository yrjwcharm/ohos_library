---
name: hmos-multidevice-interaction-methods
description: HarmonyOS应用多设备交互适配开发方案skill，提供触摸、鼠标、键盘、手写笔等多输入方式的交互方案和事件归一策略。当涉及触摸、鼠标、键盘、手写笔等设备的交互以及实现交互归一化、悬停效果、右键菜单、焦点导航、键盘快捷键、手写板输入和压感等功能时调用。
metadata:
  version: 1.0.1
  keywords:
    - 交互方式适配
    - 多输入方式
    - 触摸
    - 鼠标
    - 键盘
    - 手写笔
    - 交互归一
    - 鼠标悬停
    - 右键菜单
    - 焦点导航
    - 键盘快捷键
    - 手写笔压感
    - 拖拽归一
---

# 交互方式适配

## 技能概述
HarmonyOS应用交互方式适配skill，为触摸、鼠标、键盘、手写笔等多输入方式提供交互方案和交互事件归一策略
适用设备(device types)： phone / tablet / 2in1 / tv
适用范围：交互归一化、鼠标悬浮、右键菜单、焦点导航、键盘快捷键、手写笔输入` 
不适用范围： 纯视觉动画微调、与输入方式无关的业务流程改造

## 核心约束

- 先明确当前页面的主输入方式和兼容输入方式，再决定交互模型。
- 优先采用交互归一化方案，避免为不同输入方式维护完全独立的主流程。
- 涉及鼠标或触控板时，必须补充悬浮、右键和拖拽反馈。
- 涉及键盘时，必须明确焦点顺序、方向键行为和快捷键行为。
- 涉及手写笔时，必须区分触碰和按压。
- 多输入并存时必须给出优先级策略。
- **VAL 阶段路由强制要求**：当验证涉及折叠设备多形态验证、hidumper 模拟、分辨率阶梯验证时，**不得在本 SKILL 内自行执行验证操作**（如直接调用 hdc 截屏、尝试悬浮窗等），必须按以下步骤路由：
  1. 读取 `../hmos-multidevice-scenario-entry/references/multi-device-verification.md`
  2. 按文档中的标准流程执行验证
- **HDS 组件升级提示**：当 DEV 阶段涉及以下交互增强场景时，应主动提示用户可使用 HDS（UI Design Kit）组件获得更精致的交互反馈（`SCENE-09`）：
  - 触摸按压反馈 → `hdsEffect.PressShadowType`（按压阴影：BLEND_WHITE / BLEND_GRADIENT）
  - 触摸/鼠标交互的光影效果 → `hdsEffect.PointLight`（点光源效果，支持边框/内容/羽化受光）
  - 操作确认/即时反馈弹窗 → `HdsSnackBar`（常驻/定时两种模式）
  - 核心操作区域的按钮组 → `HdsActionBar`（内置 hoverTips 支持鼠标悬停提示）
  - 详细 API 和示例参见 `../hmos-multidevice-scenario-entry/references/hds-ui-design-kit.md`。
  - 升级建议不构成强制要求，用户明确选择常规交互方案时以本技能方案为准。

## 阶段标签

| 标签 | 阶段 | 当前模块关注点 |
| --- | --- | --- |
| `REQ` | 需求分析设计 | 主输入方式、兼容输入方式、交互边界 |
| `DEV` | 开发 | 事件归一处理、焦点链路、悬浮和快捷键实现 |
| `FIX` | 问题修复 | 焦点不连续、鼠标无反馈、快捷键冲突、手写笔异常 |
| `VAL` | 功能验证 | 输入矩阵、焦点路径、悬浮效果验证、快捷键验证 |

## 统一输出字段

- 路由字段：`active_phases`、`primary_phase`、`primary_scene`、`secondary_scenes`、`resources_used`
- `REQ`：`device_constraints`、`capability_boundary`、`acceptance_focus`
- `DEV`：`code_touchpoints`、`reuse_resources`、`implementation_notes`、`integration_risks`
- `FIX`：`problem_profile`、`root_cause_hypothesis`、`fix_plan`、`regression_watchlist`
- `VAL`：`verification_matrix`、`evidence_requirements`、`pass_criteria`、`residual_risks`

## 字段释义

- `device_constraints`：指由触摸、鼠标、键盘、手写笔或外接输入设备差异带来的交互硬约束。在 `interaction-methods` 中，通常是哪些输入方式必须支持、是否必须有 hover 或 focus、快捷键是否是必选能力。
- `capability_boundary`：指当前交互方案覆盖哪些输入方式，哪些输入路径可以降级，哪些行为只在特定设备上生效。
- `acceptance_focus`：指需求阶段验收时必须确认的焦点链路、悬浮反馈、快捷键行为和多输入回退策略。
- scene 中 `deliverables.REQ` 出现 `device_constraints`，表示“该交互场景命中后，需求阶段必须先明确输入适配边界”，不是对字段重新命名。

## 场景决策树

```
开始
  │
  ├─→ 步骤1: 分析是否涉及鼠标交互(右键菜单，鼠标悬浮)
  │     └─→ 涉及 → 命中 `INPUT-01` -> 步骤2
  │     └─→ 不涉及 → 步骤3
  │
  ├─→ 步骤2: 分析是否涉及交互归一化，即一套组件同时支持触摸和鼠标
  │     └─→ 涉及 → 命中 `INPUT-02` -> 步骤3
  │     └─→ 不涉及 → 步骤3
  │
  ├─→ 步骤3: 分析是否涉及键盘交互（焦点导航、样式或键盘快捷键）
  │     └─→ 涉及 → 命中 `INPUT-03` -> 步骤4
  │     └─→ 不涉及 → 步骤4
  │
  └─→ 步骤4: 分析是否涉及手写笔交互（手写笔交互，压感）
        └─→ 涉及 → 命中 `INPUT-04` -> 结束
        └─→ 不涉及 → 结束
```
---

## 场景索引

### `INPUT-01` 鼠标设备交互（点击，悬浮，右键菜单）

```yaml
scene_id: INPUT-01
scene_name: 鼠标设备交互
phase_tags: [REQ, DEV, FIX]
intent_signals:
  - 鼠标
  - 右键菜单
  - 鼠标悬浮反馈
applies_when:
  - 页面需要面向 PC 或平板外接鼠标
  - 当前问题表现为鼠标悬浮无反馈或右键无菜单
not_applies_when:
  - 页面只面向纯触摸设备
decisions:
  REQ:
    - 判断是否支持鼠标设备
    - 判断是否设计左键点击，右键点击，悬浮反馈，右键菜单功能
  DEV:
    - 明确鼠标左键点击、悬浮态反馈、右键菜单的实现方式
  FIX:
    - 明确鼠标左键点击、悬浮态反馈、右键菜单的实现方式
resource_refs:
  - RSC_INPUT_01
```
---

### `INPUT-02` 交互归一化

```yaml
scene_id: INPUT-02
scene_name: 交互归一化
phase_tags: [REQ, DEV, FIX]
intent_signals:
  - 鼠标左键点击和触摸点击交互归一
  - 鼠标右键点击和触摸长按交互归一
  - 拖拽归一
applies_when:
  - 同一组件需要兼容触摸和鼠标，鼠标左键点击和触摸点击归一，右键和长按菜单归一，拖拽归一
  - 当前问题表现为不同输入方式走了不同主流程
not_applies_when:
  - 当前页面只支持单一输入方式
decisions:
  REQ:
    - 判断是否同时支持触摸和鼠标设备
    - 决定点击、右键、拖拽是否涉及交互归一
  DEV:
    - 选择交互归一策略
  FIX:
    - 选择交互归一策略
resource_refs:
  - RSC_INPUT_02
```
---

### `INPUT-03` 键盘焦点导航与快捷键

```yaml
scene_id: INPUT-03
scene_name: 交互归一化
phase_tags: [REQ, DEV, FIX]
intent_signals:
  - 键盘
  - 焦点导航
  - 焦点样式
  - 键盘快捷键
applies_when:
  - 页面需要焦点导航、方向键切换焦点、键盘快捷键时
  - 当前问题表现为焦点顺序错乱或快捷键冲突
not_applies_when:
  - 页面完全不支持键盘输入
decisions:
  REQ:
   - 判断是否涉及键盘设备
   - 判断是否涉及焦点和键盘快捷键
  DEV:
   - 选择焦点功能，样式、方向键导航实现方式
   - 选择键盘快捷键及组合键实现方式
  FIX:
   - 选择焦点功能，样式、方向键导航实现方式
   - 选择键盘快捷键及组合键实现方式
resource_refs:
  - RSC_INPUT_03
```
---

### `INPUT-04` 手写笔输入与笔态交互

```yaml
scene_id: INPUT-04
scene_name: 交互归一化
phase_tags: [REQ, DEV, FIX]
intent_signals:
  - 手写笔
  - 手写笔事件区分
  - 压感
applies_when:
  - 页面需要支持手写笔触碰和按压
  - 当前问题表现为笔输入和手指触摸输入混淆
not_applies_when:
  - 目标设备不支持手写笔
decisions:
  REQ:
    - 判断是否涉及手写笔设备
    - 判断手写笔功能是否涉及笔触区分和压感应用
  DEV:
    - 区分笔触输入与普通触摸输入
    - 决定按压反馈方式
  FIX:
    - 区分笔触输入与普通触摸输入
    - 决定按压反馈方式
resource_refs:
  - RSC_INPUT_04
```

## 资源索引

### `RSC_INPUT_01` 鼠标适配指南

```yaml
resource_id: RSC_INPUT_01
resource_type: reference
path: ./references/mouse.md
phase_tags: [REQ, DEV, FIX]
used_for:
  - 页面需要面向 PC 或平板外接鼠标
  - 当前问题表现为鼠标悬浮无反馈或右键无菜单
load_when:
  - 命中 INPUT-01
avoid_when:
  - 设备没有接入鼠标设备
```

### `RSC_INPUT_02` 交互归一化指南

```yaml
resource_id: RSC_INPUT_02
resource_type: reference
path: ./references/interaction_normalization.md
phase_tags: [REQ, DEV, FIX]
used_for:
  - 定义统一点击、长按、右键和拖拽的策略
  - 排查多输入走不同主流程的问题
load_when:
  - 命中 INPUT-02
avoid_when:
  - 设备没有接入鼠标设备
```

### `RSC_INPUT_03` 键盘适配指南

```yaml
resource_id: RSC_INPUT_03
resource_type: reference
path: ./references/keyboard.md
phase_tags: [REQ, DEV, FIX]
used_for:
  - 定义焦点顺序、方向键和快捷键边界
  - 排查焦点缺失和快捷键冲突
load_when:
  - 命中 INPUT-03
avoid_when:
  - 页面不支持键盘输入
```

### `RSC_INPUT_04` 手写笔输入指南

```yaml
resource_id: RSC_INPUT_04
resource_type: reference
path: ./references/stylus.md
phase_tags: [REQ, DEV, FIX]
used_for:
  - 区分笔触和手指触摸
  - 手写笔压力检测和应用
load_when:
  - 命中 INPUT-04
avoid_when:
  - 目标设备不支持手写笔
```
