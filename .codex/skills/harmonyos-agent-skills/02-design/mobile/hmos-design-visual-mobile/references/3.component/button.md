# Reference: button

[Metadata]
- **Component**: `harmony-button`
- **中文名称**: 按钮
- **Template Source**: `references/4.template/button-tem.html`

## 1. Content Presentation (内容呈现格式)

### 1.1 Base Structure

```html
<button class="harmony-button harmony-button--{{size}} harmony-button--{{type}} {{#loading}}harmony-button--loading{{/loading}}"
  data-state="{{state}}"
  type="button"
  {{disabled}}>
  <span class="harmony-button__overlay"></span>
  <span class="harmony-button__focus-ring"></span>
  {{#loading}}<span class="harmony-button__spinner"><svg class="harmony-button__spinner-img" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.5 12C23.5 7.02944 19.4706 3 14.5 3C9.52944 3 5.5 7.02944 5.5 12C5.5 16.9706 9.52944 21 14.5 21C19.4706 21 23.5 16.9706 23.5 12ZM21.5 12C21.5 8.134 18.366 5 14.5 5C10.634 5 7.5 8.134 7.5 12C7.5 15.866 10.634 19 14.5 19C18.366 19 21.5 15.866 21.5 12Z" fill="currentColor" fill-rule="evenodd"/><circle cx="2.5" cy="14.5" r="2" fill="currentColor"/><circle cx="2" cy="15" r="2" fill="currentColor"/></svg></span>{{/loading}}
  {{#icon}}<span class="harmony-button__icon">{{icon}}</span>{{/icon}}
  <span class="harmony-button__content">{{content}}</span>
</button>
```

- 容器默认为 inline-flex，水平垂直居中，gap 4px。
- 必须包含 `.harmony-button__overlay`（状态叠加层）和 `.harmony-button__focus-ring`（Focus 环）。
- Loading 状态需注入 `.harmony-button__spinner`，内含 24×24 SVG 图标。
- Button reset：`border:0; padding:0; appearance:none; -webkit-appearance:none; outline:none;` 清除浏览器默认样式。

### 1.2 Simple Text

```html
Button
```

- 纯文本直接作为 button 子节点，颜色由类型样式继承。
- 字体：HarmonyHeiTi / HarmonyOS Sans SC，字号和行高由尺寸决定。

### 1.3 Icon + Text (扩展场景)

```html
<span class="harmony-button__icon">{{icon}}</span>
<span>Button</span>
```

- Icon 尺寸与当前 size 的 font-size 一致。
- 通过 flex gap:4px 控制间距。

## 2. Interaction States (交互状态)

### 2.1 State Mapping

状态通过 `data-state` 属性驱动：

| data-state | 视觉表现 | 触发条件 |
|------------|---------|---------|
| `enabled` | 默认样式，无叠加层 | 默认 |
| `hover` | overlay `rgba(0,0,0,0.0022)` | 鼠标悬停 / 触摸长按 |
| `pressed` | overlay `rgba(0,0,0,0.0096)` | 鼠标按下 / 触摸按下 |
| `focus` | focus-ring 显示：2px `rgba(10,89,247,1)` 实线边框，外扩 4px | 键盘聚焦 |
| `loading` | 宽度 +8px，显示 24×24 spinner，cursor:default | 异步操作进行中 |
| `disabled` | opacity:0.4，pointer-events:none，disabled 属性 | 不可操作 |

### 2.2 Overlay

- `.harmony-button__overlay`：绝对定位，inset:0，`border-radius:inherit`，`pointer-events:none`。
- `[data-state="hover"]` 时 background 设为 `rgba(0,0,0,0.0022)`。
- `[data-state="pressed"]` 时 background 设为 `rgba(0,0,0,0.0096)`。

### 2.3 Focus Ring

- `.harmony-button__focus-ring`：绝对定位，`inset: -4px`，`border: 2px solid rgba(10,89,247,1)`，`pointer-events:none`，默认 `opacity:0`。
- `[data-state="focus"]` 时 `opacity:1`。
- 圆角 = button 圆角 + 4px（Medium: 24px, Small: 18px）。
- 尺寸适配：Medium → 128×48 ring box, Small → 80×36 ring box。

### 2.4 Loading Spinner

- `.harmony-button__spinner`：24×24 容器，flex-shrink:0。
- SVG 图标 `viewBox="0 0 26 24"`，`fill="currentColor"`。
- `.harmony-button--loading`：width 扩展 +8px（Medium: 128px, Small: 80px），`cursor:default`。

### 2.5 Disabled

- `[data-state="disabled"]`：`opacity:0.4; pointer-events:none;` + `disabled` 属性。

## 3. Dynamic Response (动态响应)

- **Width Stability**：
  - Medium: 120px (loading: 128px)
  - Small: 72px (loading: 80px)
- **Height Stability**：Medium 40px, Small 28px，不变。
- **Border Radius**：Medium 20px, Small 14px，不变。
- **Text Overflow**：`white-space:nowrap` 单行不换行，超出隐藏不截断（按钮内容通常短）。
- **Spinner 挤压**：loading 态按钮宽度扩展 +8px，spinner 占 24px，文本不收缩。

## 4. Template Injection (模版注入)

- `{{size}}`: `medium` | `small`
- `{{type}}`: `emphasized` | `normal` | `warning` | `selected` | `unselected`
- `{{state}}`: `enabled` | `hover` | `pressed` | `focus` | `loading` | `disabled`
- `{{content}}`: 按钮文本或富文本内容插槽
- `{{icon}}`: [optional] 前置图标 SVG 插槽，由 `{{#icon}}...{{/icon}}` 条件块包裹
- `{{disabled}}`: `disabled` 属性字符串或空
- Spinner SVG 为固定设计资产，已直接硬编码于 template 中，由 `{{#loading}}...{{/loading}}` 条件块控制渲染

### 4.1 Numeric Baseline (Pixso MCP DSL)

| 属性 | Medium | Small |
|------|--------|-------|
| Width | 120px | 72px |
| Height | 40px | 28px |
| Border Radius | 20px | 14px |
| Font Size | 16px | 14px |
| Font Weight | 400 | 400 |
| Line Height | 1 | 1 |
| Loading Width | 128px (+8) | 80px (+8) |
| Focus Ring Box | 128×48 | 80×36 |
| Focus Ring Radius | 24px (20+4) | 18px (14+4) |
| Focus Ring Stroke | 2px | 2px |
| Focus Ring Extension | 4px | 4px |
| Spinner Size | 24×24 | 24×24 |
| Content Gap | 4px | 4px |

**Typography Baseline**:

| 元素 | 字号/行高 | 字重 | 字体 |
|------|----------|------|------|
| Button text (Medium) | 16px/1 | 400 | HarmonyHeiTi |
| Button text (Small) | 14px/1 | 400 | HarmonyHeiTi |

**Color Baseline (Design Tokens)**:

| Token | Value | Usage |
|-------|-------|-------|
| `--btn-emphasized-bg` | `rgba(0,137,249,0.88)` | Emphasized 背景 |
| `--btn-selected-bg` | `rgba(199,229,253,0.88)` | Selected 背景 |
| `--btn-material-fill-1` | `rgba(255,255,255,0.16)` | Normal/Warning/Unselected 背景层1 |
| `--btn-material-fill-2` | `rgba(255,255,255,0.0225)` | Normal/Warning/Unselected 背景层2 |
| `--btn-font-on-primary` | `rgba(255,255,255,1)` | Emphasized 文本色 |
| `--btn-font-primary` | `rgba(0,0,0,0.8065)` | Normal/Selected/Unselected 文本色 |
| `--btn-warning` | `rgba(232,64,38,1)` | Warning 文本色 |
| `--btn-interactive-hover` | `rgba(0,0,0,0.0022)` | Hover 叠加层 |
| `--btn-interactive-pressed` | `rgba(0,0,0,0.0096)` | Pressed 叠加层 |
| `--btn-interactive-focus` | `rgba(10,89,247,1)` | Focus 环颜色 |

**Effect Baseline**:

| Token | Value | Usage |
|-------|-------|-------|
| `--btn-floating-shadow` | `0 4px 48px rgba(0,0,0,0.08)` | Emphasized 外阴影 |
| `--btn-floating-blur` | `30px` | Emphasized 背景模糊 |
| `--btn-floating-inner-a` | `inset 0 0 80px rgba(0,0,0,0.06)` | Emphasized 内阴影 |
| `--btn-floating-inner-b` | `inset 0 0 40px rgba(0,0,0,0.03)` | Emphasized 内阴影 |
| `--btn-floating-inner-c` | `inset 0 0 0.5px rgba(0,0,0,0.2)` | Emphasized 内描边 |
| `--btn-floating-inner-d` | `inset 0 0 0.75px rgba(40,40,40,0.25)` | Emphasized 内描边 |
| `--btn-floating-inner-e` | `inset 0 0 0.5px rgba(255,255,255,0.4)` | Emphasized 内高光 |
| `--btn-floating-inner-f` | `inset 0 0 0.75px rgba(255,255,255,0.7)` | Emphasized 内高光 |
| `--btn-material-shadow` | `0 4px 48px rgba(0,0,0,0.08)` | Normal/Warning/Selected/Unselected 阴影 |

## 5. Audit Checklist

- [x] 仅描述视觉表现，不包含业务逻辑。
- [x] 状态命名与 template 一致（`enabled|hover|pressed|focus|loading|disabled`）。
- [x] 所有 `{{variable}}` 在 template 中可被消费。
- [x] 按钮清除默认外观（`border:0; padding:0; appearance:none;`）。
- [x] 背景模糊参数与 DSL 一致：Emphasized `blur(30px)`。
- [x] Fill blend mode 与 DSL 一致：`plus-lighter`。
- [x] Focus ring 外扩尺寸与 DSL 一致：4px。
- [x] Loading 宽度扩展与 DSL 一致：+8px。
- [x] Spinner SVG viewBox 与 DSL 一致：`0 0 26 24`。
