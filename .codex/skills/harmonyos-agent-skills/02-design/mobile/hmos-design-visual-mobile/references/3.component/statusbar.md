# Reference: statusbar

[Metadata]
- **Component**: `harmony-statusbar`
- **中文名称**: 状态栏
- **Template Source**: `references/4.template/statusbar-tem.html`

## 1. Content Presentation (内容呈现格式)

### 1.1 Base Structure

```html
<div class="harmony-statusbar harmony-statusbar-{{theme}}" data-component="statusbar">
  <span class="harmony-statusbar-time">{{time}}</span>
  <span class="harmony-statusbar-icons">
    <i class="harmony-statusbar-icon harmony-statusbar-icon-wifi">{{wifiIcon}}</i>
    <i class="harmony-statusbar-icon harmony-statusbar-icon-single-card">{{singleCardIcon}}</i>
    <i class="harmony-statusbar-icon harmony-statusbar-icon-dual-card">{{dualCardIcon}}</i>
    <i class="harmony-statusbar-icon harmony-statusbar-icon-battery">{{batteryIcon}}</i>
  </span>
</div>
```

- 文本区：时间文本（15/20，Medium），单行不换行。
- 图标区：右侧固定 `96×13` 图标槽，内部四个状态图标必须按固定子槽绝对定位排列，不得改成等距拉伸布局或 flex 平分。
- 图标顺序（从左到右）：`wifi` → `single-card` → `dual-card` → `battery`。

### 1.2 Icon/Text/Action Snippet

```html
<div class="harmony-statusbar harmony-statusbar-{{theme}}" data-component="statusbar">
  <span class="harmony-statusbar-time">08:08</span>
  <span class="harmony-statusbar-icons">
    <i class="harmony-statusbar-icon harmony-statusbar-icon-wifi"></i>
    <i class="harmony-statusbar-icon harmony-statusbar-icon-single-card"></i>
    <i class="harmony-statusbar-icon harmony-statusbar-icon-dual-card"></i>
    <i class="harmony-statusbar-icon harmony-statusbar-icon-battery"></i>
  </span>
</div>
```

## 2. Interaction States (交互状态)

- `light`：浅色状态栏。背景为 `--harmony-comp_background_primary`，图标/文字色为 `rgba(0,0,0,0.898)`（对应 DSL `Light/icon_primary` 36:1904 / `Light/font_primary` 36:3775）。PNG 图标资源引用 `assets/statusbar-*-light.png`。
- `dark`：深色状态栏。背景为 `--harmony-comp_background_neutral`，图标/文字色为 `rgba(255,255,255,1)`（对应 DSL `Light/icon_on_primary` 36:3776 / `Light/font_on_primary` 36:3774）。PNG 图标资源引用 `assets/statusbar-*-dark.png`。
- `interactive-preview`：主题切换时，文字对比度与图标资源同步切换（light ↔ dark PNG 变体，通过 Per-Theme CSS 变量注入，无需 filter）。

## 3. Dynamic Response (动态响应)

- **Time Overflow**: 时间文本保持单行展示（`white-space: nowrap`），不允许换行或推挤右侧图标组。
- **Icon Layout Contract**: 四个状态图标必须在固定 `96×13` 图标槽内按源定位排列，不能改成等距拉伸布局或 `flex space-between`。
- **Sub-slot Contract**: 每个图标必须占据自己的固定子槽；`wifi / single-card / dual-card / battery` 的顺序、宽高、`left/top` 偏移不得互换。
- **Theme Asset Switch**: `light / dark` 切换时，文字对比度与图标资源应同步切换。
- **Empty/Placeholder**: 缺省数据时保留时间槽与图标槽，不改变组件外部几何。
- **Stable Asset Contract**: 状态栏图标必须优先复用仓库内已经验证过的稳定资源与固定槽位实现；禁止为了"看起来接近"而临时重画 WiFi/卡槽/电池结构。
- **Per-Theme Asset Chain（强制）**: `light` / `dark` 变体必须通过 CSS 变量注入各自对应的 PNG 资源路径，不得通过 `filter: invert()` 等后处理方式将 light PNG 反色为 dark 效果。Dark 变体必须直接引用 `assets/statusbar-*-dark.png`，Light 变体必须直接引用 `assets/statusbar-*-light.png`。

### 3.1 Per-Theme Asset Reference Table

| 图标 | Light PNG | Dark PNG |
|------|----------|----------|
| WiFi | `assets/statusbar-wifi-light.png` | `assets/statusbar-wifi-dark.png` |
| Single Card | `assets/statusbar-single-card-light.png` | `assets/statusbar-single-card-dark.png` |
| Dual Card | `assets/statusbar-dual-card-light.png` | `assets/statusbar-dual-card-dark.png` |
| Battery | `assets/statusbar-battery-light.png` | `assets/statusbar-battery-dark.png` |

引用方式：
- Light 变体在 `.harmony-statusbar-light` 上定义 4 个 CSS 变量，每个指向 `-light.png`
- Dark 变体在 `.harmony-statusbar-dark` 上定义同样的 4 个 CSS 变量，每个指向 `-dark.png`
- 4 个 `<i>` 子槽通过 `background-image: var(--statusbar-xxx-icon)` 消费变量
- 页面消费端只需选择 `harmony-statusbar-light` 或 `harmony-statusbar-dark` class，无需手动指定 PNG 路径

## 4. Template Injection (模版注入)

- `{{theme}}`: `light|dark`
- `{{time}}`: 时间文本
- `{{wifiIcon}}`: WiFi 图标资源
- `{{singleCardIcon}}`: 单卡图标资源
- `{{dualCardIcon}}`: 双卡图标资源
- `{{batteryIcon}}`: 电池图标资源

### 4.1 Numeric Baseline (Pixso MCP DSL v2.1.15 归一值)

- 容器几何：`360×36`，内边距 `8/24/8/24`（light/dark 一致）。
- 时间文本：字号 `15`，字重 `500`，行高基线 `20`；时间文本框 `40×18`，`left=24`，`top=9`。
- 图标组容器：`96×13`，相对父容器 `left=240`，`top=11.5`。
- 图标子槽基线（均来自 DSL `pixComponentNodes` 及实例节点几何）：
  - WiFi（`36:3711`）：`15.344×12.001`，`left=0.401`，`top=0.796`
  - Single Card：`21.500×12.000`，`left=21.398`，`top=0.797`
  - Dual Card：`17.500×12.000`，`left=47.398`，`top=0.797`
  - Battery/Cell（`36:3698`）：`25.750×13.000`，`left=70.250`，`top=0`
- 字体家族：`HarmonyHeiTiMedium`（DSL `sourceMapByUrl` 键值），fallback 为 `"HarmonyOS Sans SC", "HarmonyOS Sans", "Noto Sans SC", sans-serif`。
- 组件外层展示容器（仅供 benchmark 参考，非组件本体）：`400×132`，`cornerRadius=5`，`stroke=rgba(137,72,249,1) 2px dash[5,5]`，`padding=20`，`itemSpacing=20`，`direction=Vertical`。

## 5. Audit Checklist

- [ ] 仅描述视觉表现，不包含业务逻辑。
- [ ] 状态命名与 benchmark 一致（`light`/`dark`）。
- [ ] 图标与按钮无拉伸（返回图标/箭头/switch 拇指/状态栏图标）。
- [ ] 与 `references/4.template/statusbar-tem.html` 的变量契约一致。
- [ ] 右侧图标组实现为 `96×13` 固定槽，而不是简单 `flex space-between`。
- [ ] `wifi / single-card / dual-card / battery` 的顺序与几何偏移与 Pixso DSL 一致。
- [ ] 页面实现未把 `single-card`、`dual-card` 替换为 icon-font、临时 SVG 或 flex 平均分配方案。
- [ ] 页面实现优先复用了仓库内已验证的稳定图标资源引用方式。
- [ ] Dark 变体直接引用 `-dark.png` 资源，非 `filter: invert()` 反色 light PNG。
- [ ] Light / Dark 变体各自在对应 CSS class 上通过变量注入 PNG 路径。<｜end▁of▁thinking｜>

<｜｜DSML｜｜parameter name="replace_all" string="false">false
