# Reference: switch

[Metadata]
- **Component**: `harmony-switch`
- **中文名称**: 开关 (Switch-Phone)
- **Template Source**: `references/4.template/switch-tem.html`

## 1. Content Presentation (内容呈现格式)

### 1.1 Base Structure

```html
<div class="harmony-switch{{#on}} is-on{{/on}}{{#hover}} is-hover{{/hover}}{{#pressed}} is-pressed{{/pressed}}{{#focus}} is-focus{{/focus}}{{#disabled}} is-disabled{{/disabled}}"
  data-component="switch"
  data-selected="{{selected}}"
  data-state="{{state}}"
  tabindex="0">
  <div class="harmony-switch__thumb"></div>
</div>
```

- 容器为 inline-block，相对定位，固定尺寸 36×20，border-radius 12（全圆角 pill）。
- 默认 OFF 轨道填充 `rgba(0,0,0,0.098)`，ON 轨道填充 `rgba(10,89,247,1)`。
- 拇指 16×16 圆形 (border-radius:50%)，绝对定位 top:2px。
- OFF 拇指 left:2px，带 1px 外描边 `rgba(0,0,0,0.047)` (strokeAlign:OUTSIDE 等效)。
- ON 拇指 left:18px，无描边。
- 必须包含三个伪元素层：`::before` 承载 Focus ring，`::after` 承载 Hover/Pressed overlay（两者互斥，不同时出现）。
- 支持键盘交互（tabindex="0"，Enter/Space 切换）。

### 1.2 Simple Switch (无标签)

```html
<div class="harmony-switch is-on" data-selected="on" data-state="enabled" tabindex="0">
  <div class="harmony-switch__thumb"></div>
</div>
```

- 纯开关，无文字标签。颜色由 selected 状态决定。

## 2. Interaction States (交互状态)

### 2.1 State Dimensions

| 维度 | 字段 | 可选值 |
|------|------|--------|
| 选中态 | `data-selected` | `on` / `off` |
| 状态 | `data-state` | `enabled` / `hover` / `pressed` / `focus` / `disabled` |

### 2.2 ON Mode State Matrix

| data-state | CSS 类 | 视觉表现 |
|------------|--------|---------|
| `enabled` | `.is-on` | 轨道蓝色，拇指右侧 (left:18px)，无描边 |
| `hover` | `.is-on.is-hover` | hover overlay rgba(0,0,0,0.047) 覆盖轨道 (::after) |
| `pressed` | `.is-on.is-pressed` | pressed overlay rgba(0,0,0,0.098) 覆盖轨道 (::after) |
| `focus` | `.is-on.is-focus` | 2px rgba(10,89,247,1) focus ring，strokeAlign OUTSIDE，视觉位置 -4px~-2px (::before) |
| `disabled` | `.is-on.is-disabled` | opacity:0.4，cursor:default，pointer-events:none |

### 2.3 OFF Mode State Matrix

| data-state | CSS 类 | 视觉表现 |
|------------|--------|---------|
| `enabled` | (无额外类) | 轨道灰色，拇指左侧 (left:2px)，1px 外描边 |
| `hover` | `.is-hover` | hover overlay rgba(0,0,0,0.047) 覆盖轨道 (::after) |
| `pressed` | `.is-pressed` | pressed overlay rgba(0,0,0,0.098) 覆盖轨道 (::after) |
| `focus` | `.is-focus` | 2px rgba(10,89,247,1) focus ring（同 ON）(::before) |
| `disabled` | `.is-disabled` | opacity:0.4，cursor:default，pointer-events:none |

### 2.4 Overlay 规则

- `.harmony-switch.is-hover::after`：绝对定位 inset:0，border-radius:inherit，background `rgba(0,0,0,0.047)`，pointer-events:none。
- `.harmony-switch.is-pressed::after`：同上，background `rgba(0,0,0,0.098)`。
- Hover 和 Pressed 互斥，不会同时出现。

### 2.5 Focus Ring 规则

- `.harmony-switch.is-focus::before`：绝对定位，`inset:-4px`，`border-radius:calc(12px + 2px)=14px`，`border:2px solid rgba(10,89,247,1)`，pointer-events:none。
- Pixso DSL 真值：矩形 40×24 位于 L-2 R-2 T-2 B-2，cornerRadius:12，strokeWeight:2，strokeAlign:OUTSIDE。
- CSS 映射：border 向内绘制，故 inset 需外扩至 -4px（border 外侧=-4px，内侧=-2px = Pixso 矩形边界），border-radius 加 2px 补偿以维持 pill 形状。
- Focus 和 Hover/Pressed 不会同时出现，::before / ::after 无冲突。

### 2.6 Disabled 规则

- `opacity:0.4; cursor:default; pointer-events:none;` — 禁用点击和键盘交互。
- ON disabled 和 OFF disabled 视觉一致（轨道颜色不同但整体 opacity 降低）。

## 3. Dynamic Response (动态响应)

- **Width Stability**：固定 36px，不变。
- **Height Stability**：固定 20px，不变。
- **Border Radius**：固定 12px，不变。
- **Thumb Size**：固定 16×16，不变。
- **Thumb Transition**：`transition: left 0.2s ease`，ON/OFF 切换时拇指滑动。
- **Focus Ring**：不占布局空间（absolute），不挤压相邻元素。
- **Overlay**：不占布局空间（absolute inset:0），不改变容器尺寸。

## 4. Template Injection (模版注入)

- `{{selected}}`: `on` | `off` — 驱动轨道颜色和拇指位置
- `{{state}}`: `enabled` | `hover` | `pressed` | `focus` | `disabled`
- `{{#on}}...{{/on}}`: ON 选中条件块（thumb 左移至右侧，移除描边）
- `{{#hover}}...{{/hover}}`: hover 状态 CSS 类开关
- `{{#pressed}}...{{/pressed}}`: pressed 状态 CSS 类开关
- `{{#focus}}...{{/focus}}`: focus 状态 CSS 类开关
- `{{#disabled}}...{{/disabled}}`: disabled 状态 CSS 类开关

### 4.1 Numeric Baseline

| 属性 | 值 |
|------|-----|
| Track Width | 36px |
| Track Height | 20px |
| Track Border Radius | 12px |
| Thumb Size | 16×16 |
| Thumb Border Radius | 50% |
| ON Thumb Left | 18px |
| OFF Thumb Left | 2px |
| OFF Thumb Stroke | 1px (box-shadow 模拟 strokeAlign:OUTSIDE) |
| Focus Ring Box | 40×24 (L-2,R-2,T-2,B-2) |
| Focus Ring Corner Radius | 12px (DSL rect) |
| Focus Ring CSS inset | -4px (补偿 border 向内绘制) |
| Focus Ring CSS border-radius | 14px (12+2, 维持 pill) |
| Focus Ring Stroke | 2px |
| Focus Ring Stroke Align | OUTSIDE (Pixso DSL) |
| Thumb Transition | left 0.2s ease |

### 4.2 Color Baseline (Design Tokens)

| Token ID | Name | Value | Usage |
|----------|------|-------|-------|
| 88:1701 | comp_background_emphasize | `rgba(10,89,247,1)` | ON 轨道填充 |
| 88:1702 | comp_background_primary_contrary | `rgba(255,255,255,1)` | 拇指填充 |
| 88:1703 | comp_background_secondary | `rgba(0,0,0,0.098)` | OFF 轨道填充 |
| 88:1704 | comp_background_tertiary | `rgba(0,0,0,0.047)` | OFF 拇指描边 |
| 88:1705 | interactive_focus | `rgba(10,89,247,1)` | Focus 环颜色 |
| 88:1706 | interactive_hover | `rgba(0,0,0,0.047)` | Hover 叠加层 |
| 88:1707 | interactive_pressed | `rgba(0,0,0,0.098)` | Pressed 叠加层 |

### 4.3 Typography Baseline

Switch 组件不含文本元素，无排版基线。

## 5. Audit Checklist

- [ ] 仅描述视觉表现，不包含业务逻辑。
- [ ] 状态命名与 template 一致（`enabled|hover|pressed|focus|disabled`）。
- [ ] 所有 `{{variable}}` 在 template 中可被消费。
- [ ] ON/OFF 双模式状态矩阵完整覆盖 10 状态。
- [ ] Overlay 使用 `::after` 独立层，Focus ring 使用 `::before` 独立层，互不冲突。
- [ ] Focus ring 按 Pixso DSL strokeAlign:OUTSIDE 实现，inset:-4px + border-radius:14px 补偿。
- [ ] 拇指防拉伸：固定 16×16，border-radius:50%。
- [ ] OFF 拇指描边通过 box-shadow 模拟 strokeAlign:OUTSIDE（1px）。
- [ ] Disabled 状态 pointer-events:none + opacity:0.4。
- [ ] 键盘可达：tabindex="0" + Enter/Space 切换。
- [ ] 拇指 left 过渡动画 0.2s ease。
