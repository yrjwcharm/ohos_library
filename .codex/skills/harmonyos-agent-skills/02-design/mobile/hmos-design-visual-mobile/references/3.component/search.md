# Reference: search

[Metadata]
- **Component**: `harmony-search`
- **中文名称**: 浮动搜索栏 (Floating Search-Phone)
- **Template Source**: `references/4.template/search-tem.html`
- **Benchmark Source**: `test-cases/Component/search/benchmark.html`

## 1. Content Presentation (内容呈现格式)

### 1.1 Base Structure

```html
<div class="harmony-search{{#on}} is-on{{/on}}"
  data-component="search"
  data-search="{{searchMode}}"
  data-state="{{state}}">
  <span class="harmony-search__overlay"></span>
  <span class="harmony-search__icon">{{searchIcon}}</span>
  {{^typing}}{{^output}}
  <span class="harmony-search__text harmony-search__text--placeholder">{{placeholder}}</span>
  {{/output}}{{/typing}}
  {{#actived}}
  <span class="harmony-search__input-area">
    <span class="harmony-search__cursor"></span>
    <span class="harmony-search__text harmony-search__text--placeholder">{{placeholder}}</span>
  </span>
  {{/actived}}
  {{#typing}}
  <span class="harmony-search__input-area">
    <span class="harmony-search__text harmony-search__text--value">{{value}}</span>
    <span class="harmony-search__cursor"></span>
  </span>
  {{/typing}}
  {{#output}}
  <span class="harmony-search__text harmony-search__text--value">{{value}}</span>
  {{/output}}
  {{#typing}}{{#cancel}}<button class="harmony-search__cancel" aria-label="清除" type="button">{{cancelIcon}}</button>{{/cancel}}{{/typing}}
  {{#output}}{{#cancel}}<button class="harmony-search__cancel" aria-label="清除" type="button">{{cancelIcon}}</button>{{/cancel}}{{/output}}
  {{#on}}
  <span class="harmony-search__action">
    {{^typing}}{{^output}}<span class="harmony-search__action-icon">{{voiceIcon}}</span>
    <span class="harmony-search__divider"></span>{{/output}}{{/typing}}
    {{#typing}}{{#cancel}}<button class="harmony-search__cancel" aria-label="清除" type="button">{{cancelIcon}}</button>
    <span class="harmony-search__divider"></span>{{/cancel}}{{/typing}}
    {{#output}}{{#cancel}}<button class="harmony-search__cancel" aria-label="清除" type="button">{{cancelIcon}}</button>
    <span class="harmony-search__divider"></span>{{/cancel}}{{/output}}
    <button class="harmony-search__action-btn" type="button">{{actionLabel}}</button>
  </span>
  {{/on}}
</div>
```

- 容器为 inline-flex，水平垂直居中，默认 gap 8px（Actived gap 6px）。
- 必须包含 `.harmony-search__overlay`（状态叠加层），绝对定位 inset:0。
- 默认 padding 8px 12px，ON 状态 padding 4px 4px 4px 12px。
- Hover/Pressed 状态 padding 9px 12px。
- 圆角 24px，宽 328px，高 40px。

### 1.2 Search Icon

```html
<span class="harmony-search__icon">{{searchIcon}}</span>
```

- 18×18 容器，flex-shrink:0，颜色继承 placeholder 色。
- SVG viewBox="0 0 18 18"，放大镜图标。

### 1.3 Placeholder Text

```html
<span class="harmony-search__text harmony-search__text--placeholder">{{placeholder}}</span>
```

- 字号 16px，行高 22px，字重 400。
- 颜色：`rgba(0,0,0,0.6)` (font_secondary)。
- `white-space:nowrap; overflow:hidden; text-overflow:ellipsis`。

### 1.4 Value Text

```html
<span class="harmony-search__text harmony-search__text--value">{{value}}</span>
```

- 字号 16px，行高 22px，字重 500。
- 颜色：`rgba(0,0,0,0.898)` (font_primary)。

### 1.5 Cursor

```html
<span class="harmony-search__cursor"></span>
```

- 1.5×24px，背景色 `rgba(10,89,247,1)`，圆角 1px，flex-shrink:0。

### 1.6 Cancel Button

```html
<button class="harmony-search__cancel" aria-label="清除" type="button">{{cancelIcon}}</button>
```

- 32×32 容器，flex-shrink:0，flex 居中。
- 内含 16×16 × 图标 SVG。
- Button reset: `border:0; padding:0; background:none; cursor:pointer`。

### 1.7 Voice Icon (ON 模式)

```html
<span class="harmony-search__action-icon">{{voiceIcon}}</span>
```

- 32×32 容器，flex-shrink:0，flex 居中。
- 内含 16×16 麦克风图标 SVG。
- Icon hover/pressed/focus 时圆角 50%。

### 1.8 Divider (ON 模式)

```html
<span class="harmony-search__divider"></span>
```

- 1×12px，圆角 1px，flex-shrink:0。
- 背景色：`rgba(0,0,0,0.047)` (comp_background_tertiary)。

### 1.9 Search Action Button (ON 模式)

```html
<button class="harmony-search__action-btn" type="button">{{actionLabel}}</button>
```

- 高度 32px，padding 6px 12px，圆角 16px。
- 字号 14px，行高 19px，字重 500。
- 颜色：`rgba(10,89,247,1)` (font_emphasize)。
- Button reset: `border:0; background:none; cursor:pointer`。

## 2. Interaction States (交互状态)

### 2.1 State Dimensions

| 维度 | 字段 | 可选值 |
|------|------|--------|
| 搜索模式 | `data-search` | `off` / `on` |
| 状态 | `data-state` | `normal` / `actived` / `hover` / `pressed` / `focus` / `typing` / `output` / `icon-hover` / `icon-focus` / `icon-pressed` |

### 2.2 OFF Mode State Matrix

| data-state | CSS 类 | Padding | Gap | 视觉表现 |
|------------|--------|---------|-----|---------|
| `normal` | (无额外类) | 8px 12px | 8px | 图标 + placeholder 文本 |
| `actived` | `.is-actived` | 8px 12px | 6px | 图标 + cursor + placeholder |
| `hover` | `.is-hover` | 9px 12px | 8px | overlay rgba(0,0,0,0.047) 覆盖全容器 |
| `pressed` | `.is-pressed` | 9px 12px | 8px | overlay rgba(0,0,0,0.098) 覆盖全容器 |
| `focus` | `.is-focus` | 8px 12px | 8px | 2px rgba(10,89,247,1) 外扩 ring (inset:-2px) |
| `typing` | (无额外类) | 8px 12px | 8px | 图标 + 输入值 + cursor + cancel 按钮 |
| `output` | (无额外类) | 8px 12px | 8px | 图标 + 结果值 + cancel 按钮 |

### 2.3 ON Mode State Matrix

| data-state | CSS 类 | Padding | Gap | 视觉表现 |
|------------|--------|---------|-----|---------|
| `normal` | `.is-on` | 4px 4px 4px 12px | 8px | 图标 + placeholder + voice + divider + Search 按钮 |
| `actived` | `.is-on.is-actived` | 4px 4px 4px 12px | 6px | 图标 + cursor + placeholder + voice + divider + Search 按钮 |
| `hover` | `.is-on.is-hover` | 4px 4px 4px 12px | 8px | overlay rgba(0,0,0,0.047) 仅覆盖 Search 按钮 |
| `pressed` | `.is-on.is-pressed` | 4px 4px 4px 12px | 8px | overlay rgba(0,0,0,0.098) 仅覆盖 Search 按钮 |
| `focus` | `.is-on.is-focus` | 4px 4px 4px 12px | 8px | 2px ring 仅覆盖 Search 按钮 (outline-offset:-2px) |
| `typing` | `.is-on` | 4px 4px 4px 12px | 8px | 图标 + 输入值 + cursor + cancel + divider + Search 按钮 |
| `output` | `.is-on` | 4px 4px 4px 12px | 8px | 图标 + 结果值 + cancel + divider + Search 按钮 |
| `icon-hover` | `.is-on.is-icon-hover` | 4px 4px 4px 12px | 8px | overlay rgba(0,0,0,0.047) 仅覆盖 voice 图标 (圆形) |
| `icon-focus` | `.is-on.is-icon-focus` | 4px 4px 4px 12px | 8px | 2px ring 仅覆盖 voice 图标 (outline-offset:0, 圆形) |
| `icon-pressed` | `.is-on.is-icon-pressed` | 4px 4px 4px 12px | 8px | overlay rgba(0,0,0,0.098) 仅覆盖 voice 图标 (圆形) |

### 2.4 Overlay 规则

- `.harmony-search__overlay`：绝对定位，inset:0，border-radius:inherit，pointer-events:none。
- OFF 模式 hover/pressed：overlay 覆盖全容器。
- ON 模式 hover/pressed/focus：覆盖目标为 Search 按钮 (`.harmony-search__action-btn`)。
- ON 模式 icon-hover/icon-focus/icon-pressed：覆盖目标为 voice 图标 (`.harmony-search__action-icon`)，圆形 (border-radius:50%)。

### 2.5 Focus Ring 规则

- OFF 模式：通过 `::before` 伪元素，inset:-2px，border:2px solid rgba(10,89,247,1)，圆角=搜索框圆角+2px。
- ON 模式：直接作用于 Search 按钮，outline:2px solid rgba(10,89,247,1)，outline-offset:-2px。
- ON 模式 icon-focus：作用于 voice 图标，outline:2px solid rgba(10,89,247,1)，outline-offset:0，border-radius:50%。

### 2.6 Icon States (ON 模式特有)

- `icon-hover`：voice 图标背景变为 rgba(0,0,0,0.047)，圆角 50%。
- `icon-pressed`：voice 图标背景变为 rgba(0,0,0,0.098)，圆角 50%。
- `icon-focus`：voice 图标 outline:2px solid rgba(10,89,247,1)，outline-offset:0，圆角 50%。

## 3. Dynamic Response (动态响应)

- **Width Stability**：固定宽度 328px，不随内容变化。
- **Height Stability**：固定高度 40px，不随状态变化。
- **Border Radius**：固定 24px，不变。
- **Text Overflow**：`white-space:nowrap; overflow:hidden; text-overflow:ellipsis`，单行截断。
- **Padding 变化**：
  - 默认：8px 12px
  - Hover/Pressed：9px 12px
  - ON 模式：4px 4px 4px 12px
- **Gap 变化**：
  - 默认：8px
  - Actived：6px
- **Flex 防拉伸**：所有图标、按钮、光标均为 flex-shrink:0，仅文本区域 flex:1。
- **Cancel 按钮显隐**：仅在 typing/output 状态出现。

## 4. Template Injection (模版注入)

- `{{searchMode}}`: `off` | `on` — 搜索模式，决定是否显示 Search action 区域
- `{{state}}`: `normal` | `actived` | `hover` | `pressed` | `focus` | `typing` | `output` | `icon-hover` | `icon-focus` | `icon-pressed`
- `{{placeholder}}`: 占位文本，默认 "Search"
- `{{value}}`: 输入值文本，typing/output 状态使用
- `{{searchIcon}}`: 搜索图标 SVG 插槽 (18×18 放大镜)
- `{{cancelIcon}}`: 清除图标 SVG 插槽 (16×16 ×)
- `{{voiceIcon}}`: 语音图标 SVG 插槽 (16×16 麦克风)
- `{{actionLabel}}`: Search 按钮文本，默认 "Search"
- `{{#on}}...{{/on}}`: ON 模式条件块
- `{{#typing}}...{{/typing}}`: typing 状态条件块
- `{{#output}}...{{/output}}`: output 状态条件块
- `{{#actived}}...{{/actived}}`: actived 状态条件块
- `{{#cancel}}...{{/cancel}}`: cancel 按钮条件块
- `{{#hover}}...{{/hover}}`: hover 状态 CSS 类开关（由 `{{state}}` 派生）
- `{{#pressed}}...{{/pressed}}`: pressed 状态 CSS 类开关（由 `{{state}}` 派生）
- `{{#focus}}...{{/focus}}`: focus 状态 CSS 类开关（由 `{{state}}` 派生）
- `{{#icon-hover}}...{{/icon-hover}}`: icon-hover 状态 CSS 类开关（由 `{{state}}` 派生）
- `{{#icon-focus}}...{{/icon-focus}}`: icon-focus 状态 CSS 类开关（由 `{{state}}` 派生）
- `{{#icon-pressed}}...{{/icon-pressed}}`: icon-pressed 状态 CSS 类开关（由 `{{state}}` 派生）

### 4.1 Numeric Baseline

| 属性 | 值 |
|------|-----|
| Width | 328px |
| Height | 40px |
| Border Radius | 24px |
| Default Padding | 8px 12px |
| Hover/Pressed Padding | 9px 12px |
| ON Padding | 4px 4px 4px 12px |
| Default Gap | 8px |
| Actived Gap | 6px |
| Font Size (text) | 16px |
| Line Height (text) | 22px |
| Font Size (action btn) | 14px |
| Line Height (action btn) | 19px |
| Search Icon | 18×18 |
| Cursor | 1.5×24, radius 1px |
| Cancel Button | 32×32, icon 16×16 |
| Voice Icon Container | 32×32, icon 16×16 |
| Divider | 1×12, radius 1px |
| Action Button | h:32px, padding 6px 12px, radius 16px |
| Focus Ring (OFF) | 2px, inset:-2px |
| Focus Ring (ON btn) | 2px, outline-offset:-2px |
| Focus Ring (ON icon) | 2px, outline-offset:0 |
| Backdrop Blur | 8px |

### 4.2 Color Baseline (Design Tokens)

| Token | Value | Usage |
|-------|-------|-------|
| `--search-fill-1` | `rgba(255,255,255,0.4)` | 背景层1 |
| `--search-fill-2` | `rgba(255,255,255,0.15)` | 背景层2 (plus-lighter blend) |
| `--search-shadow-1` | `0 4px 48px rgba(0,0,0,0.08)` | 外层阴影 |
| `--search-shadow-2` | `0 4px 8px rgba(0,0,0,0.25)` | 内层玻璃阴影 |
| `--search-backdrop-blur` | `8px` | 背景模糊 |
| `--search-placeholder` | `rgba(0,0,0,0.6)` | 占位文本色 (font_secondary) |
| `--search-text` | `rgba(0,0,0,0.898)` | 输入文本色 (font_primary) |
| `--search-action-text` | `rgba(10,89,247,1)` | Search 按钮文本色 (font_emphasize) |
| `--search-cursor` | `rgba(10,89,247,1)` | 光标颜色 |
| `--search-hover-overlay` | `rgba(0,0,0,0.047)` | Hover 叠加层 (interactive_hover) |
| `--search-pressed-overlay` | `rgba(0,0,0,0.098)` | Pressed 叠加层 (interactive_pressed) |
| `--search-focus-ring` | `rgba(10,89,247,1)` | Focus 环颜色 (interactive_focus) |
| `--search-divider` | `rgba(0,0,0,0.047)` | 分割线色 (comp_background_tertiary) |

### 4.3 Typography Baseline

| 元素 | 字号/行高 | 字重 | 字体 |
|------|----------|------|------|
| Placeholder text | 16px/22px | 400 | HarmonyHeiTi |
| Value text | 16px/22px | 500 | HarmonyHeiTi |
| Action button | 14px/19px | 500 | HarmonyHeiTi |

## 5. Audit Checklist

- [ ] 仅描述视觉表现，不包含业务逻辑。
- [ ] 状态命名与 template 一致（`normal|actived|hover|pressed|focus|typing|output|icon-hover|icon-focus|icon-pressed`）。
- [ ] 所有 `{{variable}}` 在 template 中可被消费。
- [ ] OFF/ON 模式状态矩阵完整覆盖 17 状态。
- [ ] Overlay 实现使用独立层而非改底色。
- [ ] Focus ring 按设计节点参数实现（OFF: inset:-2px, ON btn: outline-offset:-2px, ON icon: outline-offset:0）。
- [ ] 图标 (18×18/16×16) 和按钮 (32×32) 防拉伸约束到位。
- [ ] Cancel 按钮清除默认外观（`border:0; padding:0; background:none;`）。
- [ ] Action 按钮清除默认外观。
- [ ] 背景 Fill blend mode 与设计一致：`plus-lighter`。
- [ ] 底部背板背景模糊为 `backdrop-filter: blur(8px)`。
- [ ] 字体为 HarmonyOS 字体家族。
