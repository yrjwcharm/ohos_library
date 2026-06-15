# Reference: toolbar

[Metadata]
- **Component**: `harmony-toolbar`
- **中文名称**: 工具栏
- **Template Source**: `references/4.template/toolbar-tem.html`
- **Benchmark Source**: `test-cases/Component/toolbar/benchmark.html`

## 1. Content Presentation (内容呈现格式)

### 1.1 Base Structure

```html
<div class="harmony-toolbar harmony-toolbar--{{variant}}" data-component="toolbar" data-figma-node-id="152:19248">
  <button class="harmony-toolbar__item{{#if isActive}} harmony-toolbar__item--active{{/if}}" type="button" aria-pressed="{{isActive}}">
    <span class="harmony-toolbar__icon" aria-hidden="true">{{#if isActive}}&#xF0021;{{else}}&#xF0025;{{/if}}</span>
    <span class="harmony-toolbar__label">{{label}}</span>
  </button>
  <!-- ... more toolbar items ... -->
</div>
```

- toolbar 根节点为浮动玻璃 pill 容器，固定圆角 `28px`。
- 横向变体高度固定 `56px`，左右 padding `12px`。
- 纵向变体尺寸固定 `56×248`，上下 padding `12px`。
- item 使用 `<button>` 承载可交互视觉，必须清除浏览器默认按钮样式。
- item 默认尺寸 `56×56`，6 tabs 变体按 Pixso stretch 归一为 `50.6667×56`。

### 1.2 Variant Slot Map

| variant | orientation | root size | item count | Pixso node |
|---|---|---:|---:|---|
| `3` | horizontal | `192×56` | 3 | `152:19307` |
| `4` | horizontal | `248×56` | 4 | `152:19302` |
| `5` | horizontal | `304×56` | 5 | `152:19296` |
| `6` | horizontal | `328×56` | 6 | `152:19289` |
| `vertical-icon` | vertical | `56×248` | 4 | `152:19280` |

### 1.3 Icon Snippet

- **OFF**：glyph `&#xF0025;`，HMSymbol `24×24`，颜色 `--harmony-toolbar-primary` (`rgba(0,0,0,0.898)`)。
- **ON / active**：glyph `&#xF0021;`，HMSymbol `24×24`，颜色 `--harmony-toolbar-emphasize` (`rgba(10,89,247,1)`)。
- 图标必须使用固定 `24×24` 槽位，禁止被 item 宽度拉伸。

```html
<span class="harmony-toolbar__icon" aria-hidden="true">&#xF0025;</span>
<span class="harmony-toolbar__icon" aria-hidden="true">&#xF0021;</span>
```

### 1.4 Item Content Snippets

```html
<!-- default / OFF -->
<button class="harmony-toolbar__item" type="button" aria-pressed="false">
  <span class="harmony-toolbar__icon" aria-hidden="true">&#xF0025;</span>
  <span class="harmony-toolbar__label">Tab</span>
</button>

<!-- active / ON -->
<button class="harmony-toolbar__item harmony-toolbar__item--active" type="button" aria-pressed="true">
  <span class="harmony-toolbar__icon" aria-hidden="true">&#xF0021;</span>
  <span class="harmony-toolbar__label">Tab</span>
</button>
```

## 2. Interaction States (交互状态)

### 2.1 State Matrix

| state | class | icon glyph | color | visual rule |
|---|---|---|---|---|
| default / OFF | none | `F0025` | `--harmony-toolbar-primary` | transparent item bg |
| active / ON | `harmony-toolbar__item--active` | `F0021` | `--harmony-toolbar-emphasize` | text + icon blue |
| hover | `harmony-toolbar__item--hover` or `:hover` | state-dependent | state-dependent | bg `rgba(0,0,0,0.05)` |
| pressed | `harmony-toolbar__item--pressed` or `:active` | state-dependent | state-dependent | bg `rgba(0,0,0,0.1)` |
| focus | `harmony-toolbar__item--focus` or `:focus-visible` | state-dependent | state-dependent | inset 2px focus ring `rgba(10,89,247,0.28)` |
| disabled | `harmony-toolbar__item--disabled` or `disabled` | `F0025` | `rgba(0,0,0,0.35)` | opacity `0.4`, no pointer events |

Pixso only exposes ON/OFF. Hover, pressed, focus, and disabled are benchmark interaction overlays and must not change root container geometry.

### 2.2 Material

- root fill: `rgba(255,255,255,0.4)` + linear-dodge layer `rgba(255,255,255,0.15)` (`152:19383`).
- root effect: `0 4px 48px rgba(0,0,0,0.08)` + glass shadow `0 4px 8px rgba(0,0,0,0.25)` (`152:19382`).
- blur: `backdrop-filter: blur(80px)` (`52:17307`).
- radius: `28px` for all variants.

## 3. Dynamic Response (动态响应)

- **Item Count Contract**：`variant=3|4|5|6` 时 item 数应与 variant 对齐；`vertical-icon` 渲染 4 个 item。
- **Label Overflow**：label 槽宽为 item 宽度，固定 `14px` 高，超长文案单行 ellipsis。
- **Geometry Stability**：root 高度和 item 高度固定，不因 label 长度、active 切换、hover/focus 状态变化而改变。
- **Six Item Width**：`variant=6` 的 item 宽度使用 `50.6667px`，对应 Pixso 中 328px root、左右 padding 12px 后的 304px 内容区均分。
- **Empty State**：toolbar 无空态场景；至少渲染一个 item。若业务数据为空，消费端不应渲染该组件。

## 4. Template Injection (模版注入)

- `{{variant}}`: `3 | 4 | 5 | 6 | vertical-icon`
- `{{items}}`: item 列表，每个 item 包含：
  - `{{label}}`: 标签文本，默认 `Tab`
  - `{{isActive}}`: 布尔，true 时添加 `harmony-toolbar__item--active` 并使用 glyph `F0021`
  - `{{isHover}}`: 布尔，true 时添加 `harmony-toolbar__item--hover`
  - `{{isPressed}}`: 布尔，true 时添加 `harmony-toolbar__item--pressed`
  - `{{isFocus}}`: 布尔，true 时添加 `harmony-toolbar__item--focus`
  - `{{isDisabled}}`: 布尔，true 时添加 `harmony-toolbar__item--disabled`、`disabled` 与 `aria-disabled="true"`
  - `{{ariaLabel}}`: 可选，无可见 label 或 label 不足以说明功能时提供

### 4.1 Numeric Baseline

- 横向 root：height `56px`，radius `28px`，padding `0 12px`。
- `variant=3`：width `192px`，3 items。
- `variant=4`：width `248px`，4 items。
- `variant=5`：width `304px`，5 items。
- `variant=6`：width `328px`，6 items，item width `50.6667px`。
- `variant=vertical-icon`：width `56px`，height `248px`，padding `12px 0`，4 items。
- item：`56×56`，padding `4px 0`，gap `2px`，radius `14px`。
- icon：HMSymbol `24×24`，font-size `24px`，line-height `24px`。
- label：HarmonyHeiTi Medium, `10px / 14px`，height `14px`。
- active color：`rgba(10,89,247,1)`。
- primary color：`rgba(0,0,0,0.898)`.
- disabled color：`rgba(0,0,0,0.35)` with opacity `0.4`.

## 5. Audit Checklist

- [ ] 仅描述视觉表现，不包含业务逻辑。
- [ ] 变体命名与 benchmark 一致（`3` / `4` / `5` / `6` / `vertical-icon`）。
- [ ] 状态命名与 benchmark 一致（default / active / hover / pressed / focus / disabled）。
- [ ] root 几何尺寸与 Pixso 节点一致。
- [ ] item、icon、label 均固定尺寸，状态切换不引发布局漂移。
- [ ] 与 `references/4.template/toolbar-tem.html` 的变量契约一致。
- [ ] Token 映射可追溯至 MCP localStyleMap (`52:17308`, `52:17310`, `36:1902`, `36:1904`, `152:19383`, `152:19382`, `52:17307`)。
- [ ] 图标使用 HMSymbol 字体方案，无外部 SVG 或临时 localhost 资源。
