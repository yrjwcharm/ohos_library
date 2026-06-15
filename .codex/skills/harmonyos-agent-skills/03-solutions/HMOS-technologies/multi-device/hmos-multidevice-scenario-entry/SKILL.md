---
name: hmos-multidevice-scenario-entry
description: Entry skill for HarmonyOS multi-device adaptation. Use when the task broadly concerns HarmonyOS multi-device adaptation, the task involves foldable device verification or when the correct scenario is still unclear. This skill classifies the request by phase and scenario type, then routes to one or more scenario files for screen and window size, fold state, avoid areas, interaction methods, natural orientation, hardware access, or HDS (UI Design Kit) enhanced components.
metadata:
  version: 1.0.1
  keywords:
    - HarmonyOS多设备适配
    - 鸿蒙多设备适配
    - 多设备场景路由
    - 多设备适配入口
    - 折叠屏适配
    - 平板适配
    - 大屏适配
    - 多设备问题分类
    - 多设备验证
    - 设备形态适配
    - HDS
    - UI Design Kit
    - 沉浸光感
    - 高端界面组件
---

# 鸿蒙多设备适配总场景入口

## 技能定义

| 字段 | 内容 |
| --- | --- |
| `skill_id` | `harmonyos-multi-device-scenario-entry` |
| `skill_name` | `鸿蒙多设备适配总场景入口` |
| `one_line_purpose` | 先判断当前问题属于哪类多设备适配场景，再把请求引导到对应场景文件。 |
| `device_scope` | `phone / tablet / tv / 2in1 / wearable` |
| `problem_scope` | `多设备布局、折展状态、避让区、交互方式、自然方向、硬件能力差异、HDS 高端界面组件` |
| `not_in_scope` | `分布式流转、账号体系、网络通信、纯业务功能设计、与多设备无关的常规 UI 微调` |
| `primary_outputs` | `active_phases`、`primary_phase`、`primary_scene`、`secondary_scenes`、`route_reason`、`next_scene_refs` |

## 总入口约束

- 这个 skill 只负责入口分流，不直接展开场景实现细节。
- 先判定阶段，再判定场景类型；不要跳过阶段识别直接选场景。
- 当请求同时命中多个场景时，必须输出主场景和次场景，而不是强行只保留一个。
- 只有在当前问题的根因明确落在某个场景时，才允许单场景处理；否则按复合场景处理。
- `screen-window-size` 是布局类兜底场景，不应吞并折展、避让、方向、交互和硬件问题。
- 进入场景文件后，应优先遵循该场景文件的边界定义和约束，不要让总入口覆盖场景的专有规则。

## 阶段标签

| 标签 | 阶段 | 总入口关注点 |
| --- | --- | --- |
| `REQ` | 需求分析设计 | 问题边界、设备范围、主适配维度 |
| `DEV` | 开发 | 主代码落点在哪个场景，是否需要多个场景联合 |
| `FIX` | 问题修复 | 根因属于哪个适配域，是否存在连带回归域 |
| `VAL` | 功能验证 | 验证矩阵应覆盖哪个场景，是否需要交叉验证 |

## 统一输出字段

- 入口字段：`active_phases`、`primary_phase`、`primary_scene`、`secondary_scenes`、`route_reason`、`next_scene_refs`
- `REQ`：`problem_frame`、`device_scope_summary`、`routing_focus`
- `DEV`：`primary_code_domain`、`secondary_code_domains`、`integration_edges`
- `FIX`：`suspected_root_domain`、`linked_regression_domains`、`handoff_priority`
- `VAL`：`validation_domains`、`cross_checks`、`evidence_scope`

## 字段释义

- `primary_scene`：当前请求最应该先进入的场景。
- `secondary_scenes`：与主场景联动的次级场景列表，只允许填写 `SCENE-xx` 形式的场景 id，不填写 skill 路径。
- `route_reason`：说明为什么命中当前主场景，而不是其他场景。
- `next_scene_refs`：下一步应该实际打开的场景文件路径列表。
- `primary_scene_ref`：当前场景卡片直接指向的主场景路径，只在场景卡片内部使用。
- `secondary_scene_refs`：当前场景卡片常见的次级场景路径，只在场景卡片内部使用。
- `scene_strategy`：当前场景是 `single` 还是 `composite`。
- `candidate_scenes`：当 `scene_strategy: composite` 时，可作为主次场景的候选 `SCENE-xx` 列表。
- `candidate_scene_refs`：当 `scene_strategy: composite` 时，可进一步展开的候选场景文件路径列表。
- 这个总场景入口不输出 `device_constraints`；`device_constraints` 属于场景文件的 `REQ` 字段，由对应场景在展开分析时产出。

## 强制路由执行流程

本节为**硬性执行约束**，不可跳过、不可省略、不可用自身经验替代。

### 执行步骤（严格按序）

1. **路由判断**：根据用户请求判定 `active_phases`、`primary_scene`、`secondary_scenes`、`route_reason`，确定 `next_scene_refs`。
2. **读取主场景文件**：必须使用 Read 工具读取 `next_scene_refs` 中主场景的 SKILL.md 文件全文。不允许凭经验猜测场景文件的内容。
3. **读取场景参考文档**：主场景 SKILL.md 中 references/ 目录下与当前任务直接相关的参考文档（至少读取主场景的核心参考），也必须使用 Read 工具读取。
4. **输出路由确认**：在读取完成后、开始实现之前，向用户确认已读取的文档列表。
5. **进入实现**：基于场景文件和参考文档中的约束、API 用法、配置格式进行实现，不允许绕过文档直接写代码。

### 禁止行为

- **禁止跳步**：不允许路由判断后直接进入代码实现，跳过场景文件和参考文档的读取。
- **禁止凭经验替代**：不允许用自身训练数据中的 API 猜测替代文档中的明确格式和用法。配置文件格式（如 easy_go.json）、API 签名、metadata name 等必须以文档为准。
- **禁止静默忽略**：如果读取场景文件后发现路由判断有误，必须主动纠正路由并重新读取正确的场景文件，不允许继续沿用错误路由。

### 检查点

在向用户输出路由结果时，必须同时列出已读取的文件路径。格式示例：

```
场景路由：SCENE-01
已读取文档：
  - .claude/skills/hmos-multidevice-screen-window-size/SKILL.md
  - .claude/skills/hmos-multidevice-screen-window-size/references/easy-go.md
```

如果此检查点缺失，说明流程未正确执行。

## AI 检索要求

- 先从用户表达判断 `active_phases`：
  - 需求、设计、方案、选型、边界，归入 `REQ`
  - 开发、实现、怎么写、代码接线，归入 `DEV`
  - 修复、bug、异常、错位、崩溃，归入 `FIX`
  - 验证、测试、验收、截图证据、回归，归入 `VAL`
- 再按问题关键词命中主场景，不要一次性读取全部场景文件。
- 命中单一场景时，只打开对应场景文件。
- 命中复合场景时，先确定 `primary_scene`，再从 `secondary_scenes` 里补充 1-2 个次级场景，并汇总为最终的 `next_scene_refs`。
- 若问题只表现为“多设备布局不一致”而未出现更强特征词，默认先走 `SCENE-01`。
- 涉及“旋转后布局未更新、窗口变化未同步”但不涉及自然方向语义、`setPreferredOrientation` 或 `rotation` 值解释时，仍优先走 `SCENE-01`。
- 若请求出现明确系统区域遮挡、折痕、方向语义、输入设备或硬件能力词，则优先使用对应专有场景，不要被布局关键词抢走。
- 若请求涉及折叠设备验证、hidumper 模拟、多形态分辨率阶梯验证，且当前处于 VAL 阶段，优先走 `SCENE-08`；若同时伴随开发或修复问题，先走对应主场景，再在 VAL 阶段补充 `SCENE-08`。
- 若请求出现 `Hds` 前缀组件名、`@kit.UIDesignKit`、`hdsEffect`、`hdsMaterial`、`hdsDrawable`、`symbolRegister`、沉浸光感、点光源、流光、核心操作栏、高端界面等信号词，优先走 `SCENE-09`。
- 若请求同时涉及常规 ArkUI 组件升级（如 Navigation → HdsNavigation、Tabs → HdsTabs、SideBarContainer → HdsSideBar）和布局/避让问题，优先走 `SCENE-09`（HDS 组件通常代码更简洁，内置安全区和响应式能力），同时联动对应布局/避让场景作为约束参考。
- 若请求仅涉及常规 ArkUI 布局断点/栅格/窗口监听，未提及 HDS 或增强组件，则仍走 `SCENE-01`，但在 DEV 阶段可主动提示 HDS 组件可作为更优替代方案。

## Skill 自动加载

当路由到某个场景并准备打开 `next_scene_refs` 中的场景文件时，如果该文件路径在本地不存在，需要先通过 `remote_load.sh` 脚本从远端安装对应的 skill。完整的加载策略、缓存机制和暴露方式详见 [remote-skill-loading.md](./references/remote-skill-loading.md)。

### 场景与 Skill 名称映射

| 场景 ID | Skill 名称 | 场景文件相对路径 |
| --- | --- | --- |
| `SCENE-01` | `hmos-multidevice-screen-window-size` | `../hmos-multidevice-screen-window-size/SKILL.md` |
| `SCENE-02` | `hmos-multidevice-fold-state` | `../hmos-multidevice-fold-state/SKILL.md` |
| `SCENE-03` | `hmos-multidevice-avoid-areas` | `../hmos-multidevice-avoid-areas/SKILL.md` |
| `SCENE-04` | `hmos-multidevice-interaction-methods` | `../hmos-multidevice-interaction-methods/SKILL.md` |
| `SCENE-05` | `hmos-multidevice-natural-orientation` | `../hmos-multidevice-natural-orientation/SKILL.md` |
| `SCENE-06` | `hmos-multidevice-hardware-access` | `../hmos-multidevice-hardware-access/SKILL.md` |

### 加载流程

详见 [remote-skill-loading.md](./references/remote-skill-loading.md)。

### 约束

- 只有在场景文件确实不存在时才触发安装，不要重复安装已存在的 skill。
- `SCENE-07`（复合问题联合场景）和 `SCENE-08`（折叠设备多形态验证场景）没有独立的远程 skill，不需要走自动加载流程。
- 安装失败时，应告知用户手动执行脚本或检查网络连接，不要在安装失败后继续读取不存在的文件。

## 场景簇索引

#### `SCENE-01` 布局与窗口尺寸场景

```yaml
scene_id: SCENE-01
scene_name: 布局与窗口尺寸场景
phase_tags: [REQ, DEV, FIX, VAL]
priority: P2
intent_signals:
  - 响应式
  - breakpoint
  - GridRow
  - GridCol
  - 多栏
  - windowSizeChange
  - media query
  - 窗口变化
  - 旋转后布局不同步
  - 平行视界
  - 分屏
  - 启动页图标
applies_when:
  - 主要问题是断点、结构切换或窗口尺寸变化
  - 问题可以不依赖折叠态、系统避让区、方向语义、输入设备或硬件能力来解释
not_applies_when:
  - 存在折痕、悬停态、Pura X、键盘遮挡、状态栏遮挡、自然方向语义、`setPreferredOrientation`、`rotation` 值解释、mouse、canIUse 等更强信号
scene_strategy: single
primary_scene_ref: ../hmos-multidevice-screen-window-size/SKILL.md
secondary_scenes:
  - SCENE-02
  - SCENE-03
secondary_scene_refs:
  - ../hmos-multidevice-fold-state/SKILL.md
  - ../hmos-multidevice-avoid-areas/SKILL.md
```

#### `SCENE-02` 折展状态与折痕场景

```yaml
scene_id: SCENE-02
scene_name: 折展状态与折痕场景
phase_tags: [REQ, DEV, FIX, VAL]
priority: P0
intent_signals:
  - foldStatus
  - 折叠
  - 展开
  - 悬停态
  - 折痕
  - tri-fold
  - G态
  - Pura X
applies_when:
  - 主要问题依赖设备折叠状态、折痕几何或宽折叠形态
  - 页面在手机和平板正常，但在折叠设备上出现结构或行为异常
not_applies_when:
  - 问题只与普通横竖屏变化或普通窗口断点有关
scene_strategy: single
primary_scene_ref: ../hmos-multidevice-fold-state/SKILL.md
secondary_scenes:
  - SCENE-01
  - SCENE-05
secondary_scene_refs:
  - ../hmos-multidevice-screen-window-size/SKILL.md
  - ../hmos-multidevice-natural-orientation/SKILL.md
```

#### `SCENE-03` 系统区域与键盘避让场景

```yaml
scene_id: SCENE-03
scene_name: 系统区域与键盘避让场景
phase_tags: [REQ, DEV, FIX, VAL]
priority: P0
intent_signals:
  - safe area
  - 状态栏
  - 导航栏
  - 挖孔
  - 刘海
  - 沉浸式
  - 键盘遮挡
  - 输入法
applies_when:
  - 主要问题是内容被系统区域、挖孔区或软键盘遮挡
  - 需要处理背景延伸和内容避让边界
not_applies_when:
  - 问题只是普通 margin 或栅格调整
scene_strategy: single
primary_scene_ref: ../hmos-multidevice-avoid-areas/SKILL.md
secondary_scenes:
  - SCENE-01
  - SCENE-02
secondary_scene_refs:
  - ../hmos-multidevice-screen-window-size/SKILL.md
  - ../hmos-multidevice-fold-state/SKILL.md
```

#### `SCENE-04` 多输入与焦点交互场景

```yaml
scene_id: SCENE-04
scene_name: 多输入与焦点交互场景
phase_tags: [REQ, DEV, FIX, VAL]
priority: P1
intent_signals:
  - 鼠标
  - hover
  - 右键
  - 键盘焦点
  - shortcut
  - 手写笔
  - 拖拽
  - 外接键鼠
applies_when:
  - 主要问题是交互模型会随输入方式变化
  - 需要同时兼容触摸、鼠标、键盘或手写笔
not_applies_when:
  - 问题只表现为布局变化，没有交互行为变化
scene_strategy: single
primary_scene_ref: ../hmos-multidevice-interaction-methods/SKILL.md
secondary_scenes:
  - SCENE-01
secondary_scene_refs:
  - ../hmos-multidevice-screen-window-size/SKILL.md
```

#### `SCENE-05` 自然方向与旋转语义场景

```yaml
scene_id: SCENE-05
scene_name: 自然方向与旋转语义场景
phase_tags: [REQ, DEV, FIX, VAL]
priority: P1
intent_signals:
  - rotation 值
  - orientation
  - 自然竖屏
  - 自然横屏
  - setPreferredOrientation
  - 传感器方向
  - 横竖屏误判
applies_when:
  - 主要问题是方向语义、rotation 值或自然方向类型
  - 需要区分屏幕旋转、窗口方向和自然方向
not_applies_when:
  - 只是宽度断点变化或窗口尺寸同步导致的布局切换
scene_strategy: single
primary_scene_ref: ../hmos-multidevice-natural-orientation/SKILL.md
secondary_scenes:
  - SCENE-02
  - SCENE-01
secondary_scene_refs:
  - ../hmos-multidevice-fold-state/SKILL.md
  - ../hmos-multidevice-screen-window-size/SKILL.md
```

#### `SCENE-06` 硬件能力与外设场景

```yaml
scene_id: SCENE-06
scene_name: 硬件能力与外设场景
phase_tags: [REQ, DEV, FIX, VAL]
priority: P0
intent_signals:
  - canIUse
  - SysCap
  - 相机
  - camera
  - 传感器
  - GPS
  - NFC
  - 蓝牙
  - 外接设备
  - 热插拔
applies_when:
  - 主要问题是硬件能力存在设备差异，或调用前必须先检测能力
  - 行为异常与设备枚举、权限声明、连接切换或降级策略直接相关
not_applies_when:
  - 问题是纯 UI 布局、方向或避让，不涉及硬件能力差异
scene_strategy: single
primary_scene_ref: ../hmos-multidevice-hardware-access/SKILL.md
secondary_scenes:
  - SCENE-04
secondary_scene_refs:
  - ../hmos-multidevice-interaction-methods/SKILL.md
```

#### `SCENE-07` 复合问题联合场景

```yaml
scene_id: SCENE-07
scene_name: 复合问题联合场景
phase_tags: [REQ, DEV, FIX, VAL]
priority: P1
intent_signals:
  - 同时出现折叠、键盘、窗口、方向、输入或硬件中的多个信号
  - 需要解释主问题和连带问题
  - 单一场景不足以完整覆盖
applies_when:
  - 问题必须同时依赖两个以上场景才能解释
  - 需要先选主场景，再合并次场景
not_applies_when:
  - 单一场景已经足够解释问题
scene_strategy: composite
candidate_scenes:
  - SCENE-01
  - SCENE-02
  - SCENE-03
  - SCENE-04
  - SCENE-05
  - SCENE-06
  - SCENE-09
candidate_scene_refs:
  - ../hmos-multidevice-screen-window-size/SKILL.md
  - ../hmos-multidevice-fold-state/SKILL.md
  - ../hmos-multidevice-avoid-areas/SKILL.md
  - ../hmos-multidevice-interaction-methods/SKILL.md
  - ../hmos-multidevice-natural-orientation/SKILL.md
  - ../hmos-multidevice-hardware-access/SKILL.md
  - ./references/hds-ui-design-kit.md
```

#### `SCENE-08` 折叠设备多形态验证场景

```yaml
scene_id: SCENE-08
scene_name: 折叠设备多形态验证场景
phase_tags: [VAL]
priority: P1
intent_signals:
  - hidumper
  - 折叠态验证
  - 展开态验证
  - 悬停态验证
  - 三屏态验证
  - 分辨率阶梯
  - 多形态验证
  - 模拟折叠
  - 多设备验证
applies_when:
  - 主要问题是需要通过 hidumper 模拟折叠设备的折叠/悬停/展开/三屏四种形态进行布局适配验证
  - 属于 VAL 阶段，需要对折叠设备多屏形态进行分辨率阶梯验证
not_applies_when:
  - 仅涉及直板机或平板设备验证（无折叠形态）
  - 问题属于开发实现而非验证流程
scene_strategy: single
primary_scene_ref: ./references/multi-device-verification.md
```

#### `SCENE-09` HDS (UI Design Kit) 高端界面组件场景

```yaml
scene_id: SCENE-09
scene_name: HDS (UI Design Kit) 高端界面组件场景
phase_tags: [REQ, DEV, FIX, VAL]
priority: P1
intent_signals:
  - HDS
  - UI Design Kit
  - UIDesignKit
  - HdsNavigation
  - HdsTabs
  - HdsSideBar
  - HdsSideMenu
  - HdsSnackBar
  - HdsActionBar
  - HdsListItem
  - MultiWindowEntryInAPP
  - hdsEffect
  - hdsMaterial
  - hdsDrawable
  - symbolRegister
  - 沉浸光感
  - 点光源
  - 流光效果
  - 按压阴影
  - 核心操作栏
  - 高端界面
  - barFloatingStyle
  - dynamicHideTitleBar
applies_when:
  - 需要使用 @kit.UIDesignKit 提供的高端增强型组件（导航、页签、侧边栏、操作栏、列表、视效等）
  - 需要使用 HDS 视效能力（点光源、按压阴影、流光、沉浸光感材质）
  - 需要处理 HDS 图标资源（分层/单层图标处理、自定义 Symbol 注册）
  - 用户明确要求使用 HDS 组件替代原生 ArkUI 组件以获得更好视觉效果或更少适配代码
not_applies_when:
  - 问题纯属于常规 ArkUI 基础组件的布局或样式微调，无 HDS 组件使用意图
  - 问题是纯业务逻辑或分布式能力，与 UI 组件增强无关
scene_strategy: single
primary_scene_ref: ./references/hds-ui-design-kit.md
secondary_scenes:
  - SCENE-01
  - SCENE-03
  - SCENE-02
secondary_scene_refs:
  - ../hmos-multidevice-screen-window-size/SKILL.md
  - ../hmos-multidevice-avoid-areas/SKILL.md
  - ../hmos-multidevice-fold-state/SKILL.md
```

#### SCENE-09 与其他场景的交叉引流规则

当请求同时命中 SCENE-09 和其他场景时，按以下规则处理：

1. **SCENE-09 + SCENE-01（布局与窗口）**：
   - 用户想用 `HdsSideBar` 替代 `SideBarContainer` / `Navigation` 分栏 → 主走 SCENE-09，SCENE-01 作为布局约束参考
   - `HdsTabs` 的 `barFloatingStyle.barWidth` 响应式宽度配置 → 主走 SCENE-09
   - 用户只关心断点/栅格布局，不涉及 HDS 组件 → 主走 SCENE-01

2. **SCENE-09 + SCENE-03（避让区）**：
   - `HdsNavigation` 的 `enableComponentSafeArea` 自动处理安全区 → 推荐优先使用 HDS（代码量更少）
   - `hdsMaterial` 沉浸光感替代手动沉浸式全屏 → 主走 SCENE-09
   - 纯键盘避让/挖孔区避让，不涉及 HDS → 主走 SCENE-03

3. **SCENE-09 + SCENE-02（折展）**：
   - `MultiWindowEntryInAPP` 仅在折叠屏/平板横屏生效 → 主走 SCENE-09（组件用法），SCENE-02 作为设备约束参考
   - 折叠屏悬停态布局不涉及 HDS 组件 → 主走 SCENE-02

4. **SCENE-09 + SCENE-04（交互）**：
   - `hdsEffect` 按压阴影/点光源增强触摸反馈 → 主走 SCENE-09
   - `HdsActionBar` 的 hoverTips 支持鼠标悬停 → 主走 SCENE-09（组件用法），SCENE-04 作为交互规范参考
   - 纯键盘焦点/手写笔/鼠标右键，不涉及 HDS → 主走 SCENE-04

## 输出约定

- 先输出结构化场景判断，再**实际读取**对应场景文件（见"强制路由执行流程"）。
- 如果必须联合多个场景，优先输出 `SCENE-07` 的组合策略。
- 不要把场景和实现混在一起；入口负责定位，场景文件负责展开。
- 最终输出应尽量保持字段稳定，不要因表达习惯改变字段名。
- 路由输出后，必须等待场景文件和核心参考文档读取完成，才能进入实现阶段。不允许"路由 → 直接写代码"的两步跳过。
