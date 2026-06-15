# Reference: bottomtab

[Metadata]
- **Component**: `harmony-bottomtab`
- **中文名称**: 底部页签
- **Template Source**: `references/4.template/bottomtab-tem.html`

## 1. Content Presentation (内容呈现格式)

### 1.1 Base Structure — variant=2|3|4|5

```html
<nav class="harmony-bottomtab" data-component="bottomtab" data-variant="{{variant}}">
  <div class="harmony-bottomtab__bar harmony-bottomtab__bar--{{variant}}">
    <div class="harmony-bottomtab__tabs">
      <!-- {{items}} 插槽注入，每个子节点为 .harmony-bottomtab__tab -->
    </div>
  </div>
  <div class="harmony-bottomtab__indicator">
    <div class="harmony-bottomtab__indicator-bar"></div>
  </div>
</nav>
```

- 容器 `360×100`，flex column，底部对齐。
- `::before` 伪元素承载渐变叠层 (`--bt-container-gradient`)。
- Pill bar：高度 56px，圆角 100px，白色毛玻璃材质（`rgba(255,255,255,0.15)` + `rgba(255,255,255,0.4)` with `plus-lighter` blend），80px 背景模糊。
- Bar 宽度随 tab 数量变化：2→160px, 3→236px, 4→328px, 5→328px。
- Home Indicator：`360×28`，内含 `112×5` 圆角条 (`rgba(0,0,0,0.2)`)。

### 1.2 Tab Item Snippet (.Xtab_Icon_port)

```html
<button class="harmony-bottomtab__tab {{#active}}harmony-bottomtab__tab--active{{/active}}"
  type="button" aria-pressed="{{active}}">
  <span class="harmony-bottomtab__tab-icon" aria-hidden="true">{{iconGlyph}}</span>
  <span class="harmony-bottomtab__tab-label">{{label}}</span>
</button>
```

- 尺寸：`24×48`，flex:1 均分 bar 内空间。
- Icon：24×24 HMSymbol 字体，`font-size:24px`。
- Label：10px/14px Medium HarmonyHeiTi。
- 激活态：品牌蓝 `rgba(10,89,247,1)`，非激活态：`rgba(0,0,0,0.898)`。
- Button reset：`border:0; padding:0; appearance:none;` 清除浏览器默认样式。

### 1.3 Variant: 1+bar

```html
<div class="harmony-bottomtab__row">
  <button class="harmony-bottomtab__tab-circle" type="button" aria-pressed="true">
    <span class="harmony-bottomtab__tab-icon" aria-hidden="true">{{tabIcon}}</span>
  </button>
  <div class="harmony-bottomtab__bar harmony-bottomtab__bar--single">
    <div class="harmony-bottomtab__expand">
      <div class="harmony-bottomtab__expand-album" aria-hidden="true">
        {{expandAlbum}}
      </div>
      <span class="harmony-bottomtab__expand-label">{{expandLabel}}</span>
      <div class="harmony-bottomtab__expand-group">
        {{expandIcons}}
      </div>
    </div>
  </div>
</div>
```

- 左侧：`tab-circle` 56×56 正圆，白色毛玻璃材质（同 bar），仅含 24×24 icon，无 label。
- 展开 bar：264×56，padding `6px 14px 6px 6px`，内部水平 flex gap:10px。
- Album：44×44 正圆，`overflow:hidden`，图片 `object-fit:cover`。
- Label：82px 宽，12px/16px SemiBold HarmonyHeiTi。
- 图标组：3 个 22×22 HMSymbol 图标，gap:16px。
  - 默认：backward_end_fill (`U+F00A6`) / pause_round_triangle_fill (`U+F086B`) / forward_end_fill (`U+F00A7`)

### 1.4 Variant: multibar

```html
<div class="harmony-bottomtab__row">
  <div class="harmony-bottomtab__bar harmony-bottomtab__bar--multi">
    <div class="harmony-bottomtab__tabs">
      {{items}}
    </div>
  </div>
  <div class="harmony-bottomtab__fold">
    <div class="harmony-bottomtab__album">
      {{avatarImage}}
    </div>
  </div>
</div>
```

- Bar：264×56，内含 4 个 tab（1 ON + 3 OFF）。
- 折叠bar：56×56 正圆，白色毛玻璃 (`rgba(255,255,255,0.2)`)，10px blur + saturate(1.2)。
  - 内阴影：`inset 0 2px 5px rgba(0,0,0,0.5)` + `inset 0 -2px 5px rgba(0,0,0,0.25)`
  - 外投影：`0 4px 10px rgba(0,0,0,0.1)`
  - 边框：`0.5px solid rgba(255,255,255,0.21)`
- Album：56×56 正圆头像，位于折叠bar 内部，图片 `object-fit:cover`。
- 主行：328px 宽，水平 flex gap:8px，center 对齐。

## 2. Interaction States (交互状态)

### 2.1 Tab Item States

- **Default (OFF)**：icon + label `rgba(0,0,0,0.898)`。
- **Active (ON)**：icon + label `rgba(10,89,247,1)`，class `.harmony-bottomtab__tab--active`，`aria-pressed="true"`。
- **Focus-visible**：`2px solid rgba(10,89,247,1)` outline，offset `-2px`，border-radius `8px`。
- **Hover**：无独立 hover 态（移动端触摸组件）。
- **Disabled**：`opacity: 0.4; pointer-events: none;`，通过 `disabled` 属性或 `aria-disabled="true"` 触发。

### 2.2 Tab-Circle States (1+bar)

- 始终为激活态（品牌蓝色）。
- **Focus-visible**：同 tab item 焦点环规则。

### 2.3 Bar Material

- 所有 bar（2/3/4/5/single/multi）共享同一材质：
  - Fill：底层 `rgba(255,255,255,0.4)` NORMAL + 顶层 `rgba(255,255,255,0.15)` LINEAR_DODGE（CSS `plus-lighter`）
  - Shadow：`0 4px 48px rgba(0,0,0,0.08)` + `0 4px 8px rgba(0,0,0,0.25)` (GLASS)
  - Blur：`blur(80px)`

## 3. Dynamic Response (动态响应)

- **Bar Width**：随 variant 锁定（160/236/328/264px），不因内容变化。
- **Tab Width**：`flex:1` 均分 bar 内空间，`min-width:0` 允许收缩。
- **Label Overflow**：`white-space:nowrap; overflow:hidden; text-overflow:ellipsis` 单行截断。
- **Height Stability**：容器锁定 `360×100`，bar 锁定 `56px`，indicator 锁定 `28px`。
- **Container Gradient**：`::before` 伪元素固定渐变叠层，`pointer-events:none` 不阻挡交互。
- **防拉伸**：所有 `[class*="icon"]` / `[class*="btn"]` 元素 `flex:0 0 auto`。

## 4. Template Injection (模版注入)

- `{{variant}}`: `2|3|4|5|1bar|multibar`
- `{{items}}`: tab 项 HTML 片段数组，每项为 `.harmony-bottomtab__tab` 结构
- `{{activeIndex}}`: 激活 tab 索引（0-based）
- `{{tabIcon}}`: [1+bar] 左侧圆形背板内 icon glyph
- `{{expandAlbum}}`: [1+bar] album 图片 `<img>` 元素
- `{{expandLabel}}`: [1+bar] 展开栏文字（如 "Espressos"）
- `{{expandIcons}}`: [1+bar] 3 个控制图标 `.harmony-bottomtab__expand-icon` 元素
- `{{avatarImage}}`: [multibar] 头像 `<img>` 元素

### 4.1 Numeric Baseline (Pixso MCP DSL v2.1.15)

- 容器：`360×100`
- Pill bar 高度：`56px`，圆角 `100px`
- Bar 宽度：2→160px, 3→236px, 4/5→328px, multi/single→264px
- Home Indicator：`360×28`，bar `112×5`
- Tab item：`24×48`，icon `24×24`，label `10/14 Medium`
- Tab-circle：`56×56`，icon `24×24`
- 折叠bar：`56×56`，album `56×56`
- 展开 album：`44×44`
- 展开 label：`82×16`，`12/16 SemiBold`
- 展开图标：`22×22`，`font-size:22px Medium`
- 展开 bar padding：`6px 14px 6px 6px`
- 主行 gap：`8px`
- 展开内容 gap：`10px`
- 图标组 gap：`16px`
- Bar padding：`4px 12px`（2/3/4/5/multi），single `0`
- 背景模糊：bar `blur(80px)`，fold `blur(10px) saturate(1.2)`

**Typography 基线**:

| 元素 | 字号/行高 | 字重 | 字体 |
|------|----------|------|------|
| Tab label | 10/14 | 500 | HarmonyHeiTi |
| Expand label | 12/16 | 600 | HarmonyHeiTi |
| Tab icon | 24/24 | 400 | HMSymbol |
| Expand icon | 22/22 | 500 | HMSymbol |

**图标基线**:

| 图标 | 来源 | Unicode |
|------|------|---------|
| backward_end_fill | HMSymbol | U+F00A6 |
| pause_round_triangle_fill | HMSymbol | U+F086B |
| forward_end_fill | HMSymbol | U+F00A7 |
| Tab icon (default placeholder) | HMSymbol | U+F05F3 |

## 5. Audit Checklist

- [x] 仅描述视觉表现，不包含业务逻辑。
- [x] 状态命名与 template 一致（`2|3|4|5|1bar|multibar`）。
- [x] 图标无拉伸（HMSymbol 24×24 / 22×22 锁定）。
- [x] 与 `references/4.template/bottomtab-tem.html` 的变量契约一致。
- [x] Bar 宽度锁定，不随内容变化。
- [x] Tab item 清除默认按钮外观（`border:0; padding:0; appearance:none;`）。
- [x] tab-circle 清除默认按钮外观。
- [x] 背景模糊参数与 DSL 一致：bar `blur(80px)`，fold `blur(10px) saturate(1.2)`。
- [x] Fill blend mode 与 DSL 一致：`plus-lighter`（CSS 等价 LINEAR_DODGE）。
- [x] 所有 `{{variable}}` 在 template 中可被消费。
