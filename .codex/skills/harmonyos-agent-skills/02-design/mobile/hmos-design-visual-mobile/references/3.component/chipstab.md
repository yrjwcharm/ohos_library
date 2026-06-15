# Reference: chipstab

[Metadata]
- **Component**: `harmony-chipstab`
- **中文名称**: 操作块
- **Template Source**: `references/4.template/chipstab-tem.html`

## 1. Content Presentation (内容呈现格式)

### 1.1 Base Structure

```html
<div class="harmony-chipstab harmony-chipstab-{{variant}}" data-component="chipstab" data-figma-node-id="97:18082">
  <button class="harmony-chipstab__chip {{#isActivated}}is-activated{{/isActivated}}">
    {{#if icon}}<span class="harmony-chipstab__chip-icon hm hm-16" aria-hidden="true">&#xF0009;</span>{{/if}}
    <span class="harmony-chipstab__chip-title">{{title}}</span>
  </button>
  <!-- ... more chips ... -->
  <button class="harmony-chipstab__icon-btn" aria-label="更多">
    <span class="hm hm-24" aria-hidden="true">&#xF0061;</span>
  </button>
</div>
```

- 容器固定 `360×56`，padding `10px 12px`，overflow hidden 截断超宽 chip。
- chip 为 `<button>`，`display: inline-flex`，radius `20px`，height `36px`，width auto（`stackPrimarySizing: RESIZE_TO_FIT`）。
- chip 内容 padding `8px 16px`，内部 gap `6px`。
- chip 间 gap `8px`。

### 1.2 Variant Slot Map

| 变体 | num 可见 | chip-icon (star) | icon-btn (.more) | chip 数 |
|---|---|---|---|---|
| tab | — | — | — | 6 |
| tab-with-icon | — | — | ✓ | 4 |
| icontab | — | ✓ (title 左侧) | — | 4 |

### 1.3 Icon Snippet

- **star_fill**（icontab 变体 chip 内）：glyph `&#xF0009;`（HMSymbol `star_fill`, unicode `F0009`），`16×16`，位于 title 左侧。颜色：enable → `--chipstab-icon-secondary`（`Light/icon_secondary`, `rgba(0,0,0,0.6)`），activated → `--chipstab-icon-on-primary`（`Light/icon_on_primary`, `rgba(255,255,255,1)`）。
- **dot_grid_2x2**（icon-btn 内）：glyph `&#xF0061;`（HMSymbol `dot_grid_2x2`, unicode `F0061`），`24×24`，颜色 `--chipstab-icon-color`（`Light/icon_primary`, `rgba(0,0,0,0.898)`）。

### 1.4 Chip Content Snippets

```html
<!-- tab / tab-with-icon 变体 chip（仅 title，无 num 无图标） -->
<button class="harmony-chipstab__chip is-activated">
  <span class="harmony-chipstab__chip-title">Title</span>
</button>

<!-- icontab 变体 chip（star_fill 图标 + title） -->
<button class="harmony-chipstab__chip is-activated">
  <span class="harmony-chipstab__chip-icon hm hm-16" aria-hidden="true">&#xF0009;</span>
  <span class="harmony-chipstab__chip-title">Title</span>
</button>
```

## 2. Interaction States (交互状态)

### 2.1 Variant × State Matrix

| 变体 | enable chip bg | activated chip bg | shadow / glass |
|---|---|---|---|
| tab | `97:18248` 5% white | `70:907` #0091FF | `97:18249` |
| tab-with-icon | 同上 | 同上 | 同上 |
| icontab | 同上 | 同上 | 同上 |

### 2.2 Chip States

- **enable（未选中）**：
  - 底板：`rgba(255, 255, 255, 0.05)`（5% white, `Light/Blur/Material_background_ULTRA_THIN`）
  - title 色：`rgba(0, 0, 0, 0.6)`（`Light/font_secondary`）

- **activated（选中）**：
  - 底板：`#0091FF`（`Light/Floating_backgrount_emphasize`）
  - title 色：`rgba(255, 255, 255, 1)`（`Light/font_on_primary`）

- **Effects（两种状态共用）**：
  - `box-shadow`: `0 8px 48px rgba(0,0,0,0.08)`（DROP_SHADOW）
  - `box-shadow`: `0 4px 8px rgba(0,0,0,0.25)`（GLASS）
  - `backdrop-filter: blur(8px)`（液态玻璃模糊, GLASS radius=8）
  - 来源：`97:18249` `Light/Blur/Material_ULTRA_THIN`

### 2.3 Icon Button States

- icon-btn（`.more` 按钮）为 `40×40` 圆形，不区分 enable/activated。
- 底板：同 enable chip（5% white）。
- 阴影与玻璃效果：同 chip。

## 3. Dynamic Response (动态响应)

- **Overflow Clipping**：容器 `360×56` 固定，`overflow: hidden`，超出宽度的 chip 被截断。
- **Chip Auto-Width**：chip 宽度按内容自适应（`RESIZE_TO_FIT`），不同变体 chip 数量与内容不同导致实际宽度不同。tab 变体 6 chip + num 超出 360px 被截断。
- **Geometry Stability**：容器与 chip 高度固定（56px / 36px），不受变体切换影响；chip radius 固定 20px。
- **Glass Blur Stability**：`backdrop-filter: blur(8px)` 在 chip 和 icon-btn 上均生效，不随变体切换而改变。
- **Empty/Placeholder**：chipstab 无空态场景——至少渲染一个 chip。

## 4. Template Injection (模版注入)

- `{{variant}}`: `tab | tab-with-icon | icontab`
- `{{showIconBtn}}`: 布尔（`true` → 渲染 `.more` icon button）
- `{{chips}}`：chip 列表，每个 chip 包含 `{{title}}`、`{{isActivated}}`（布尔）、`{{icon}}`（可选, star_fill glyph，仅 icontab 变体）

### 4.1 Numeric Baseline (Pixso MCP DSL v2.1.15 归一值)

- 容器：`360×56`，padding `10px 12px`，gap `8px`，overflow hidden。
- chip：height `36px`，radius `20px`，padding `8px 16px`，内部 gap `6px`，width auto。
- chip title：font-size `16px`，`Light/font_secondary`（enable）| `Light/font_on_primary`（activated）。
- chip-icon (star_fill)：`16×16`，`Light/icon_secondary`（enable）| `Light/icon_on_primary`（activated）。
- icon-btn：`40×40` circle，dot_grid_2x2 `24×24`，`Light/icon_primary`。
- 底板 activated：`#0091FF`（`70:907` `Light/Floating_backgrount_emphasize`）。
- 底板 enable：`rgba(255,255,255,0.05)`（`97:18248` `Light/Blur/Material_background_ULTRA_THIN`）。
- 阴影：`0 8px 48px rgba(0,0,0,0.08)` + `0 4px 8px rgba(0,0,0,0.25)`（`97:18249` `Light/Blur/Material_ULTRA_THIN`）。
- 玻璃模糊：`backdrop-filter: blur(8px)`。

## 5. Audit Checklist

- [ ] 仅描述视觉表现，不包含业务逻辑。
- [ ] 变体命名与 benchmark 一致（`tab` / `tab-with-icon` / `icontab`）。
- [ ] 状态命名与 benchmark 一致（`enable` / `activated`）。
- [ ] chip 无拉伸（height 36px, radius 20px 固定）。
- [ ] 容器固定 360×56，overflow hidden。
- [ ] 与 `references/4.template/chipstab-tem.html` 的变量契约一致。
- [ ] Token 映射可追溯至 MCP 节点 ID（`70:907`, `97:18248`, `97:18249`, `70:890`, `36:3776` 等）。
- [ ] 图标使用 HMSymbol 字体方案，无需外部 SVG 资源。
