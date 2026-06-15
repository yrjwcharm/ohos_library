# Reference: titlebar

[Metadata]
- **Component**: `harmony-titlebar`
- **中文名称**: 浮动标题栏
- **Template Source**: `references/4.template/titlebar-tem.html`

## 1. Content Presentation (内容呈现格式)

### 1.1 Base Structure

```html
<div class="harmony-titlebar harmony-titlebar--{{variant}}" data-component="titlebar">
  <div class="harmony-titlebar__status">
    <span class="harmony-titlebar__time">{{time}}</span>
    <span class="harmony-titlebar__status-icons">
      <i class="harmony-titlebar__status-icon harmony-titlebar__status-icon--wifi"></i>
      <i class="harmony-titlebar__status-icon harmony-titlebar__status-icon--sig1"></i>
      <i class="harmony-titlebar__status-icon harmony-titlebar__status-icon--sig2"></i>
      <i class="harmony-titlebar__status-icon harmony-titlebar__status-icon--battery"></i>
    </span>
  </div>
  <div class="harmony-titlebar__content">
    {{#leadingIcon}}
    <button class="harmony-titlebar__leading" type="button" aria-label="{{leadingAria}}">
      <span class="hm hm-24" aria-hidden="true">{{leadingIcon}}</span>
    </button>
    {{/leadingIcon}}
    <div class="harmony-titlebar__actions">
      {{#actions}}
      <button class="harmony-titlebar__action-btn" type="button" aria-label="{{actionAria}}">
        <span class="hm hm-24" aria-hidden="true">{{actionIcon}}</span>
      </button>
      {{/actions}}
    </div>
    <h2 class="harmony-titlebar__title">{{title}}</h2>
    {{#subtitle}}
    <p class="harmony-titlebar__subtitle">{{subtitle}}</p>
    {{/subtitle}}
  </div>
</div>
```

- 组件为浮动材质面板，背景采用线性渐变 + `backdrop-filter` 模糊（12px）。
- 固定宽度 `360px`，高度随 variant 变化：Big `205px`，Normal/Secondary/Drawer `124px`。
- 内含 StatusBar 区域（`360×36`）和内容区域。
- 内容区域内各元素（leading、actions、title、subtitle）为绝对定位，严格按 DSL 几何基线布局。

### 1.2 Variant Layout Matrix

| Variant | 高度 | Leading 图标 | 动作按钮数 | Title 字号 | Subtitle |
|---------|------|-------------|-----------|-----------|----------|
| Big | 205px | 无 | 3 | 30/40 Bold | 有 (14/19 Regular) |
| Normal | 124px | 无 | 3 | 26/35 Bold | 无 |
| Secondary | 124px | chevron_left (F00DA) | 1 | 20/27 Bold | 有 (14/19 Regular) |
| Drawer | 124px | indent_right (F0163) | 1 | 26/35 Bold | 无 |

### 1.3 StatusBar Snippet

```html
<div class="harmony-titlebar__status">
  <span class="harmony-titlebar__time">08:08</span>
  <span class="harmony-titlebar__status-icons">
    <i class="harmony-titlebar__status-icon harmony-titlebar__status-icon--wifi"></i>
    <i class="harmony-titlebar__status-icon harmony-titlebar__status-icon--sig1"></i>
    <i class="harmony-titlebar__status-icon harmony-titlebar__status-icon--sig2"></i>
    <i class="harmony-titlebar__status-icon harmony-titlebar__status-icon--battery"></i>
  </span>
</div>
```

- 时间文本：15/20 Medium，单行不换行。
- 图标区：`96×13` 固定槽，四个图标按子槽绝对定位。
- 图标顺序：wifi → sig1 → sig2 → battery。

### 1.4 Action Button Snippet

```html
<button class="harmony-titlebar__action-btn" type="button">
  <span class="hm hm-24" aria-hidden="true">&#xF0134;</span>
</button>
```

- IconButton：`40×40`，圆角 `1000`（正圆），白底浮动材质。
- 图标使用 HMSymbol 字体 `circle_dashed` (F0134)，24×24。
- Default 占位：当设计稿无指定具体图标时使用 `circle_dashed`。

### 1.5 Leading Button Snippet

```html
<button class="harmony-titlebar__leading" type="button">
  <span class="hm hm-24" aria-hidden="true">{{leadingIcon}}</span>
</button>
```

- 同为 `40×40` 正圆，白底浮动材质，与 action-btn 视觉一致。
- Secondary 使用 `chevron_left` (F00DA)，Drawer 使用 `indent_right` (F0163)。

## 2. Interaction States (交互状态)

### 2.1 Action Button States

- **Default**: 白底 `rgba(255,255,255,0.88)` + 阴影 `0 8px 48px rgba(0,0,0,0.08)` + 模糊 `blur(16px)`。
- **Hover**: 背景提亮至 `rgba(255,255,255,0.96)`。
- **Pressed**: 叠加 `rgba(0,0,0,0.098)`（interactive_click）。
- **Focus-visible**: 外扩 `2px solid rgba(245,249,255,0.5)` 焦点环。

### 2.2 Leading Button States

- Secondary/Drawer 的 leading 按钮交互态与 action-btn 完全一致（共用相同 hover/pressed/focus 规则）。

### 2.3 Variant Switching

- variant 切换不改动 StatusBar 区域。
- Big → Normal/Secondary/Drawer 切换时，高度、标题字号、leading 图标、action 数量、subtitle 显隐均需同步变化。

## 3. Dynamic Response (动态响应)

- **Text Overflow**: 标题和副标题均使用 `overflow:hidden + text-overflow:ellipsis + white-space:nowrap` 单行截断。
  - Big title: `328px` 宽，Big subtitle: `328px` 宽。
  - Normal title: `184px` 宽。
  - Secondary title/subtitle: `232px` 宽。
  - Drawer title: `232px` 宽。
- **Height Stability**: 组件高度由 variant 锁定（Big `205px`，其余 `124px`），不因内容变化而改变。
- **Background Gradient**: Big 变体背景为纯色填充（继承基类），Normal/Secondary/Drawer 变体背景为线性渐变（`--titlebar-normal-bg-gradient`）+ `blur(12px) saturate(1.2)`。
- **Empty/Placeholder**: 无空态场景——StatusBar、title、action 按钮始终渲染；leading 和 subtitle 按 variant 条件渲染。

## 4. Template Injection (模版注入)

- `{{variant}}`: `big|normal|secondary|drawer`
- `{{time}}`: 状态栏时间文本
- `{{title}}`: 标题文本
- `{{subtitle}}`: 副标题文本（仅 Big/Secondary）
- `{{leadingIcon}}`: HMSymbol glyph HTML entity（仅 Secondary/Drawer）
- `{{leadingAria}}`: leading 按钮 aria-label
- `{{actions}}`: 动作按钮数组迭代
  - `{{actionIcon}}`: 动作按钮图标 glyph
  - `{{actionAria}}`: 动作按钮 aria-label

### 4.1 Numeric Baseline (Pixso MCP DSL v2.1.15 归一值)

- 容器宽度：`360px`（所有 variant 一致）。
- 容器高度：Big `205px`，Normal/Secondary/Drawer `124px`。
- StatusBar：`360×36`，padding `8/24`，HORIZONTAL space-between center。
- 内容区高度：Big `169px`，Normal/Secondary `88px`，Drawer `56px`。
- 背景渐变（124px 变体）：`linear-gradient(to bottom, ...)` 从 `rgba(241,243,245,0.8)` 30% 处开始衰减至 `rgba(241,243,245,0)` 100%。
- 背景模糊：`blur(12px) saturate(1.2)`（DSL `Light/Blur/Navigation_mark` 36:1913）。
- Action/Leading 按钮：`40×40`，`border-radius: 50%`，白底 `rgba(255,255,255,0.88)`，阴影 `0 8px 48px rgba(0,0,0,0.08)`。
- 字体家族：`"HarmonyOS Sans SC", "HarmonyOS Sans", "HarmonyHeiTi", "Noto Sans SC", sans-serif`。

**Typography 基线**:

| 元素 | 字号/行高 | 字重 |
|------|----------|------|
| StatusBar time | 15/20 | 500 |
| Big title | 30/40 | 700 |
| Normal/Drawer title | 26/35 | 700 |
| Secondary title | 20/27 | 700 |
| Subtitle | 14/19 | 400 |

**图标基线**:

| 图标 | 来源 | 尺寸 |
|------|------|------|
| circle_dashed (default action) | HMSymbol F0134 | 24×24 |
| chevron_left (Secondary leading) | HMSymbol F00DA | 24×24 |
| indent_right (Drawer leading) | HMSymbol F0163 | 24×24 |
| WiFi | PNG asset | 15.34×12 |
| Signal single | PNG asset | 21.5×12 |
| Signal dual | PNG asset | 17.5×12 |
| Battery | PNG asset | 25.75×13 |

## 5. Audit Checklist

- [x] 仅描述视觉表现，不包含业务逻辑。
- [x] 状态命名与 benchmark 一致（`big|normal|secondary|drawer`）。
- [x] 图标无拉伸（HMSymbol 24×24，PNG 按原始尺寸）。
- [x] 与 `references/4.template/titlebar-tem.html` 的变量契约一致。
- [x] Action 按钮禁止拉伸，锁定 40×40 正圆几何。
- [x] Leading 按钮（Secondary/Drawer）与 action-btn 共享交互态规则。
- [x] StatusBar 图标槽固定 `96×13`，四个子槽绝对定位。
- [x] 背景渐变 alpha 曲线与 DSL mask (36:1885) 一致。
- [x] 背景模糊参数与 DSL (36:1886/36:1913) 一致：`blur(12px) saturate(1.2)`。
