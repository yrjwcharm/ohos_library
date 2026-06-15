# Reference: list

[Metadata]
- **Component**: `harmony-list`
- **中文名称**: 列表项
- **Template Source**: `references/4.template/list-tem.html`

## 1. Content Presentation (内容呈现格式)

列表项 (list) 是一个水平布局的行组件，由左侧内容区 + 右侧内容区组成，底部有分隔线。支持 6 种行高 variant。

### 1.1 Variant 矩阵

| Variant | 高度 | 行数 | 左侧布局 | 左侧内容 | 右侧图标 | 右文本行数 |
|---------|------|------|----------|----------|----------|------------|
| `single` | 48px | 1 | VERTICAL | title only | arrow-down | 1 |
| `icondot` | 56px | 1 | HORIZONTAL-sm (gap:12px) | dot(8×8) + title | arrow-down | 1 |
| `iconsingle` | 64px | 1 | HORIZONTAL (gap:16px) | appicon(48×48) + title | arrow-down | 1 |
| `2lines` | 64px | 2 | VERTICAL (gap:2px) | title + aux1 | chevron | 2 |
| `icon2lines` | 72px | 2 | HORIZONTAL (gap:16px) | appicon(48×48) + (title + aux1) | chevron | 2 |
| `3lines` | 96px | 3 | VERTICAL (gap:2px) | title + aux1 + aux2 | chevron | 2 |

### 1.2 Base Structure

```html
<div class="harmony-list harmony-list-{{variant}}" data-component="list">
  <div class="harmony-list__left harmony-list__left--{{left-layout}}">
    {{left-content}}
    <div class="harmony-list__divider--left"></div>
  </div>
  <div class="harmony-list__right">
    <span class="harmony-list__right-text{{right-clamp}}">{{right-text}}</span>
    {{right-icon}}
    <div class="harmony-list__divider--right"></div>
  </div>
</div>
```

### 1.3 Simple Text (single / 2lines / 3lines)

左侧纯文本，垂直排列，gap: 2px：

```html
<!-- single (VARIANT=single, left-layout=vertical) -->
<span class="harmony-list__title">{{title}}</span>

<!-- 2lines (VARIANT=2lines, left-layout=vertical) -->
<span class="harmony-list__title">{{title}}</span>
<span class="harmony-list__aux">{{aux1}}</span>

<!-- 3lines (VARIANT=3lines, left-layout=vertical) -->
<span class="harmony-list__title">{{title}}</span>
<span class="harmony-list__aux">{{aux1}}</span>
<span class="harmony-list__aux">{{aux2}}</span>
```

### 1.4 Icon with Text (iconsingle / icon2lines)

左侧水平布局，含 48×48 圆角图标：

```html
<!-- iconsingle (VARIANT=iconsingle, left-layout=horizontal) -->
<div class="harmony-list__appicon">
  <img src="{{appicon-src}}" alt="{{appicon-alt}}" />
</div>
<span class="harmony-list__title">{{title}}</span>

<!-- icon2lines (VARIANT=icon2lines, left-layout=horizontal) -->
<div class="harmony-list__appicon">
  <img src="{{appicon-src}}" alt="{{appicon-alt}}" />
</div>
<div class="harmony-list__text-group">
  <span class="harmony-list__title">{{title}}</span>
  <span class="harmony-list__aux">{{aux1}}</span>
</div>
```

### 1.5 Dot Indicator (icondot)

左侧水平布局，dot(8×8) + title，gap: 12px：

```html
<!-- icondot (VARIANT=icondot, left-layout=horizontal-sm) -->
<span class="hm-list-icon hm-list-icon--dot"></span>
<span class="harmony-list__title">{{title}}</span>
```

### 1.6 Right Side

右侧内容统一为 text + icon，水平右对齐，gap: 4px：

```html
<!-- rightText type (chevron): VARIANT=2lines|icon2lines|3lines -->
<span class="harmony-list__right-text harmony-list__right-text--clamp2">{{right-text}}</span>
<span class="hm-list-icon hm-list-icon--chevron">&#xF00D9;</span>

<!-- rightMenuselect type (arrow-down): VARIANT=single|icondot|iconsingle -->
<span class="harmony-list__right-text">{{right-text}}</span>
<span class="hm-list-icon hm-list-icon--arrow-down"></span>
```

## 2. Interaction States (交互状态)

- **variant**: `single` | `icondot` | `iconsingle` | `2lines` | `icon2lines` | `3lines` — 决定行高、布局、图标类型
- **right-lines**: `1` | `2` — 右文本最大行数（rightMenuselect=1, rightText=2）
- **right-icon**: `chevron` | `arrow-down` — 右图标类型
- **Hover**: 背景色变更为 `var(--harmony-interactive-hover)`（`rgba(0,0,0,0.047)`）
- **Pressed**: 背景色变更为 `var(--harmony-interactive-pressed)`（`rgba(0,0,0,0.098)`）

## 3. Dynamic Response (动态响应)

- **Text Overflow**:
  - Title (`harmony-list__title`): 单行截断 `text-overflow: ellipsis`
  - Auxiliary text (`harmony-list__aux`): 单行截断 `text-overflow: ellipsis`
  - Right text: 根据 variant 决定 1 行或 2 行截断 (`--clamp2`)
- **App Icon**: 图片使用 `object-fit: cover` 填充 48×48 容器，圆角 12px
- **Divider 几何约束**:
  - 分隔线位于左右内容区底部，绝对定位
  - iconsingle / icon2lines variant: 左 divider 跳过图标区（left:64px, width:calc(100%-64px)）
  - icondot variant: 左 divider 跳过 dot 区（left:20px, width:calc(100%-20px)）
  - 左右 divider 在列表坐标中无缝衔接（gap=0）；iconsingle / icon2lines / icondot 这些左右分割线拼接型 variant 必须将列表主轴 gap 设为 0，否则左右 divider 会被 gap 切断。
  - icon2lines variant: 右侧容器必须撑满 72px 行高，确保右侧 divider 与左侧 divider 同底对齐，不得相对 24px chevron 容器定位上浮。
- **防拉伸约束**: 所有图标、箭头、appicon 必须有 `background-size: contain` 或 CSS 几何锁定

## 4. Template Injection (模版注入)

| 变量 | 可选值 | 说明 |
|------|--------|------|
| `{{variant}}` | `single` / `icondot` / `iconsingle` / `2lines` / `icon2lines` / `3lines` | 变体类型 |
| `{{left-layout}}` | `vertical` / `horizontal` / `horizontal-sm` | 左内容区布局方向 |
| `{{left-content}}` | HTML snippet | 左内容区完整 HTML（含 title/aux/appicon/dot） |
| `{{title}}` | string | 左标题文本（16px Medium） |
| `{{aux1}}` | string | 第一行辅助文本（14px Regular） |
| `{{aux2}}` | string | 第二行辅助文本（14px Regular），仅 3lines |
| `{{right-text}}` | string | 右侧文本 |
| `{{right-clamp}}` | `""` / `" harmony-list__right-text--clamp2"` | 右侧 2 行截断类名（对应 reference right-lines: 1→'', 2→clamp2） |
| `{{right-icon}}` | HTML snippet | 右侧图标（chevron 或 arrow-down） |
| `{{appicon-src}}` | string (path) | 应用图标图片路径 |
| `{{appicon-alt}}` | string | 图标 alt 文本 |

### 4.1 Numeric Baseline (Pixso MCP 归一值)

- 容器宽度：`328px`
- 水平内边距：`12px`
- 左右内容区间距：`10px` (大部分 variant) / `0px` (iconsingle / icon2lines / icondot)
- 左文本间距（VERTICAL）：`2px`
- 图标-文本间距（HORIZONTAL）：`16px` (appicon) / `12px` (dot)
- App Icon：`48×48px`，圆角 `12px`（DSL `cornerRadius: 12`）
- Dot：`8×8px` CSS 圆形，`var(--harmony-list-dot-color)`（fallback `#46B1E3`）
- Chevron 图标：`12×24px`，`HMSymbol &#xF00D9;`，颜色 `--harmony-icon-tertiary`
- Arrow-down 图标：`8×6px` CSS 三角形，颜色 `--harmony-icon-tertiary`
- Divider 厚度：`1px`，颜色 `--harmony-comp-divider`

## 5. Audit Checklist

- [ ] 仅描述视觉表现，不包含业务逻辑
- [ ] 状态命名与 benchmark 一致
- [ ] 变体矩阵完整覆盖 6 种 variant
- [ ] 图标与按钮无拉伸（chevron 12×24、arrow-down 8×6、dot 8×8、appicon 48×48）
- [ ] Divider 几何约束正确（iconsingle 跳过 icon 区，icondot 跳过 dot 区）
- [ ] 与 `references/4.template/list-tem.html` 的变量契约一致
- [ ] Token 全部使用 `--harmony-*` 语义变量
