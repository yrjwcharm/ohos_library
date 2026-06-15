# Layout Reference: List

## 0. Metadata
- **Source Page**: Pixso source node `23:16731` (`illustration_Phone`)
- **Layout Type**: `mobile-list`
- **Canvas**: `360 × 792`
- **Theme Base**: `background_secondary` page canvas + `comp_background_primary` card surface
- **Related Layouts**: `mobile-settings-single-column`（设置页，以控件型 item 为主；当设置页以入口型 list item 为主导时，仍优先命中本布局）

## 1. Layout Identification
该页面属于标准的移动端列表页，以入口型 list item 的垂直堆叠为核心内容组织形式。

判断依据：
- 顶层存在稳定壳层：`titlebar → content cards → bottomtab`（本设计稿为多 tab 主页，底部使用 4-tab bottomtab，不是独立页的 aibottombar）。
- 主体内容以 list item 为核心承载单元，item 按业务语义分组为圆角卡片，卡片单列自上而下堆叠。
- list item 以导航入口为主：左侧 `icon + title + auxiliary text`，右侧 `value + chevron`，点击后跳转下级页面。
- 内容区顶部可存在 header 区（如身份信息、banner、概要数据等页面级自定义块），但页面主体仍由 list item 驱动。
- 底部可为 `aibottombar` 或 `bottomtab`，取决于该页面是否为多 tab 应用的主页之一。

## 2. Hit Rules
命中 `mobile-list` 时，页面应同时满足以下特征：
- 画布为单屏移动端竖向比例（360×792），页面主内容位于居中的单列内容区（328px）。
- 顶部存在稳定壳层：`titlebar`。
- 主体内容以圆角卡片为核心容器，卡片按单列自上而下堆叠，卡片之间间距固定。
- 卡片内部为入口型 list item：左侧 `appicon + title + aux`，右侧 `value + chevron`。
- list item 是页面的主导内容组织形式，占页面内容区 50% 以上。
- 部分卡片为「组卡片」：多个 item 共享同一个圆角容器，item 之间以 divider 分隔。
- 部分卡片为「单卡片」：一个 item 独占一个圆角容器。

## 3. Exclusion Rules
出现以下任一特征时，不应优先命中该布局：
- 卡片内 item 以 switch / checkbox / picker 等**控件操作为主**（原地操作，非导航跳转） → 优先评估 `mobile-settings-single-column`。如果设置页的 item 以入口导航（chevron 跳转下级）为主，仍应命中本布局。
- 页面主体为内容 feed、网格、瀑布流或多列排版。
- 页面为表单录入、富内容详情、图表看板。
- 顶部存在 tab / segmented control 作为页面主导航。
- 页面有复杂分段 + subheader 层级管理（多个独立内容区块需要标题层级），且 list item 不是主导内容形式。
- list item 仅作为页面的附属元素（如 sidebar、drawer 内列表），而非页面主体。

## 4. Page Skeleton

```html
<main class="layout-mobile-list">
  <header class="layout-titlebar"></header>

  <section class="layout-content">
    <!-- Optional header block (profile / banner / summary) -->
    <section class="layout-card layout-card-header"></section>

    <!-- Group entry card (N items sharing one container) -->
    <section class="layout-card layout-card-group-entry"></section>

    <!-- Single entry cards (1 item per container) -->
    <section class="layout-card layout-card-single-entry"></section>
    <section class="layout-card layout-card-single-entry"></section>
  </section>

  <footer class="layout-bottom-bar"></footer>
</main>
```

## 5. Shell Rules

### 5.1 Root Canvas
- 画板固定为 `360 × 792`。
- 页面背景使用二级底色，卡片使用一级表面色。
- 页面为单列流向，自上而下阅读。

### 5.2 Safe Areas
- 顶部固定保留 titlebar 系统区（titlebar 组件已内置 status bar + 标题内容；以 `normal` variant 为例，高度为 `124px`）。
- 顶部 titlebar 是固定在 screen 内的壳层浮层，不参与内容流；内容区通过 `padding-top` 预留首张卡片的初始视觉位置。
- 底部区域根据页面类型：
  - 独立页面 / 二级页面：`aibottombar` 区域 `28px`
  - 多 tab 应用主页：`bottomtab` 区域 `100px`（含 aibottombar 28px + tab pill 56px + padding）

### 5.3 Content Width
- 主内容标准宽度：`328px`
- 水平居中。
- 等价边距：左右各 `16px`

### 5.4 Content Scroll Region
- 可滚动内容区占满 screen，并通过 top/bottom padding 为固定壳层预留安全区；滚动所有权在 `layout-content`，不在根画布。
- 内容区可用高度 = screen 高度；内容的初始视觉起点由 `padding-top` 决定，不应直接用完整 titlebar 几何高度把内容推到 titlebar 下方。
- 当内容总高度超过可用高度时，内容区应滚动，壳层保持固定。
- **浮层 z-index 约定（强制）**：
  - `bottomtab`：`z-index: 100`（最上层，底部浮层）
  - 可滚动首项浮层（若存在 search / header glass card）：`z-index: 30`（内容流首项相对定位，高于 titlebar）
  - `titlebar`：`z-index: 10`（常驻纵向渐隐背板；搭配 `pointer-events: none` + 子元素 `pointer-events: auto`）
  - 普通内容区：`z-index: auto`（默认层，被 titlebar 渐隐背板覆盖；`.layout-content` 本身不得声明 `z-index`）
- **titlebar 常驻渐隐背板行为（强制）**：
  - titlebar 从首屏开始展示常驻纵向渐隐背板：顶部高透明度，底部逐步归零透明，典型为 `linear-gradient(180deg, rgba(...,0.98) 0%, rgba(...,0.90) 42%, rgba(...,0.48) 78%, rgba(...,0) 100%)`。
  - 禁止通过 `scrollTop` 监听、`.is-scrolled` 类或 `background: transparent -> gradient` 切换制造“滚动后出现背板”的硬切换效果。
  - 禁止在 `.harmony-titlebar` 根节点叠加整块 `backdrop-filter` / `-webkit-backdrop-filter`。整块 blur 会形成生硬底边，并错误遮挡首屏浮层首项。
  - 若列表页顶部存在 search 或 header glass card，首屏该浮层首项应以 `position:relative; z-index:30` 位于 titlebar 之上；普通列表内容滚动时从 titlebar 渐隐背板下方经过。
- **堆叠上下文禁令（强制）**：`.layout-content` 不得设置 `z-index`，也不得设置 `transform`、`filter`、`opacity<1`、`isolation:isolate` 等会创建新堆叠上下文的属性；否则首项浮层的 `z-index` 无法压过 titlebar。

## 6. Vertical Structure

### 6.1 Top Region
- `titlebar` 贴顶放置，高度由 variant 决定（`normal` = 124px），组件内部已包含 status bar（36px）+ 标题内容区。
- titlebar 固定在 screen 顶部，不参与内容流；其 124px 背板是视觉过渡层，布局间距必须以 titlebar 内容层（标题 / action button 下沿）为基准，而不是以完整渐变背板底边为基准。
- titlebar 背板必须为常驻纵向渐隐层，不得按滚动状态切换透明/模糊，不得追加整块 `backdrop-filter`。
- 标题栏内为：
  - 标题文本（26px Bold），左侧对齐（有 back button 时向右偏移到 `left: 66px`，为返回按钮腾出空间）
  - 右侧 action icon 区可选（0~3 个 icon）

### 6.2 Content Region
内容区从标题栏下方开始，按以下顺序堆叠：

1. **Header Card**（可选，高度按内容定义）
   - 页面级自定义内容块，可包含：
     - 身份信息（avatar + username + 箭头）
     - 数据概要（数字 + 标签）
     - Banner / 公告
   - 若存在，位于内容区顶部、entry cards 上方。
   - 这不是 list item，不映射到任何 list variant。

2. **Group Entry Card**（可选，高度由内部 item 数计算）
   - 白色圆角卡片（r=16），内含 N 个 entry item。
   - item 之间以 divider（1px）分隔。
   - 卡片高度 = `4 + N×72 + (N-1)×1 + 4`。

3. **Single Entry Cards**（页面主体）
   - 每张白色圆角卡片（r=16）内含 1 个 entry item。
   - 卡片高度 80px（item 72px + 上下各 4px 内边距）。
   - 卡片之间间距 12px。

### 6.3 Bottom Region
- 独立 / 二级页面：`aibottombar`（28px）。
- 多 tab 应用主页：`bottomtab`（100px），内含 pill 形 tab（328×56, r=100）+ aibottombar（360×28）。
- **本设计稿实例**：4-tab bottomtab，第 4 个 tab（「我的」）为当前活跃 tab，标签文字蓝色强调色（`font_emphasize`），其余 tab 为非活跃态（`font_primary`）。
- bottomtab 背后应优先由自然滚动内容、列表卡片或页面纹理提供玻璃材质所需的视觉信息。禁止额外添加可见的整宽灰/白矩形探针面板；若确需探针层，只能是低可见度、非面板感的纹理/光斑，且不得遮挡列表内容。

## 7. Block Patterns

### 7.1 Header Card（可选）
页面顶部的自定义内容区，不是 list item。

结构特征：
- 白色圆角卡片容器（r=16），内边距 12px。
- 内容为页面级自定义布局（如水平 avatar + username、垂直数据面板等）。
- 高度由内容决定，不适用 list item 的高度公式。

适用场景：
- 个人中心头像区（avatar + username + profile link）
- 数据概览面板（数字 + 标签）
- 运营 banner / 公告
- 不使用时直接省略，页面从 Group Entry Card 或 Single Entry Card 开始

### 7.2 Group Entry Card
用于同一业务主题下多个 entry item 的组合展示。

结构特征：
- 白色圆角卡片容器（r=16），内含 N 个 entry item。
- item 之间以 divider（1px, `--harmony-comp-divider`）分隔。
- 卡片高度 = `4 + N×72 + (N-1)×1 + 4`。
- divider 左端对齐 title 文本起始位置（48px appicon + 16px gap 区域跳过）。

### 7.3 Single Entry Card
用于独立功能入口的展示。

结构特征：
- 白色圆角卡片容器（r=16），内含 1 个 entry item。
- 卡片高度 80px（item 72px + 上下各 4px 内边距）。
- 卡片之间间距 12px。

### 7.4 Entry List Item（entry item 行规范）
这是本布局的核心行级承载单元。所有 list item 均使用此规范。

结构特征：
- 高度：`72px`
- 左侧：`appicon(48×48, r=12) + text-group(title 16px Medium + aux 14px Regular)`，水平布局
- 右侧：`value text(14px Regular, clamp2) + chevron(12×24 HMSymbol)`，水平右对齐，gap 4px

**与现有 list reference 的映射关系：**
该 entry item 直接映射到现有 `list.md` 的 S3 `icon2lines` variant（`List / icon-2-lines (48dp_ic)`），不新增页面级 entry 行结构。

| 属性 | 本布局 entry item | 现有 S3 `icon2lines` variant |
|------|------------------|--------------------------|
| 高度 | 72px | 72px ✓ |
| 左侧 icon 类型 | appicon 48×48 | appicon 48×48 ✓ |
| 左侧布局 | icon + text-group(title + aux)，gap 16px | HORIZONTAL，gap 16px ✓ |
| 右侧图标 | chevron | chevron ✓ |
| 右侧文本 | 有 (14px, clamp2) | 有 ✓ |

**结论：本布局的 entry item 必须直接实例化 `list-tem.html` 的 S3 `icon2lines` 变体。**

装配策略：
- 使用根结构：`<div class="harmony-list harmony-list-icon2lines" data-component="list" data-variant="icon2lines">`。
- 左侧使用模板原生 `harmony-list__appicon + harmony-list__text-group(title + aux)`，不得替换为页面级 HMSymbol 小图标槽。
- 右侧使用模板原生 `harmony-list__right-text--clamp2 + hm-list-icon--chevron`，不得改写为页面级 arrow-down。
- 禁止只复用 `.harmony-list` 类名后自定义内部结构。
- Divider 对齐约束：`icon2lines` 使用模板内部左右 divider 时，右侧容器必须与整行 72px 行高对齐（例如 `.harmony-list-icon2lines .harmony-list__right { align-self: stretch; }`），否则右 divider 会相对 24px chevron 容器定位而高于左 divider。
- Divider 拼接约束：`icon2lines` 的列表主轴 gap 必须为 0，否则左侧 divider 与右侧 divider 会被 left/right 容器之间的 gap 切断，出现分段断线。

## 8. Spatial Tokens

引用来源：`references/2.theme/mobile-scale.md`

### 8.1 Horizontal
- 页面边距：`16px`（内容区 328px 居中于 360px 画布）
- 卡片内边距：`12px`
- 卡片圆角：`16px`
- entry item 内 icon 与 title 间距：由 list 组件 `horizontal` 的 `gap: 16px` 承载
- 右侧 value 与 chevron 间距：`4px`

### 8.2 Vertical
- `titlebar`（已内含 status bar）→ 首张卡片或首个浮层内容间距 `8px`
  - **测量基准（强制）**：此间距从 titlebar **内容区底部**（标题 / action button 下沿）起算，**不是**从 titlebar 组件的完整几何边界（含渐变衰减尾巴）起算。
  - **原因**：titlebar `normal` variant 组件高度为 124px，但下半段约 36px 为 `--titlebar-normal-bg-gradient` 渐变衰减区（从 30% 处开始衰减至 0% 透明）。若以 124px 几何边界为基准 +8px = 132px 作为内容起点，实际肉眼感知的间距 = 132 − 90（内容区底部）≈ 42px，严重偏离设计意图。
  - **落地公式**（以 `normal` variant 为例）：`padding-top = statusbar(36) + content-area(88) + 8 ≈ 100px`。其他 variant 按各自 content-area 高度类推。若首项为 search/header glass 浮层，该首项可设置 `position:relative; z-index:30` 位于 titlebar 上方；`.layout-content` 自身仍不得设置 `z-index`。
- Header Card（若存在）→ 下一张卡片间距 `12px`
- Group Entry Card → 下一张卡片间距 `12px`
- Single Entry Card 之间间距：`12px`
- 最后一张卡片 → 底部 bar 间距：由内容区高度自然吸收，不设固定值

补充约束：
- 页面级 spacing 若没有组件 Numeric Baseline 真值，优先吸附到 `mobile-scale`。
- 卡片间距、圆角半径优先引用 `mobile-scale`，避免不同页面系统性漂移。

## 9. Composition Mapping
该章节定义布局骨架如何映射到组件 reference。后续页面实现必须完成这里的装配，再进入模板填充。

### 9.0 Fast Path: List Page Priority
- 命中“列表页 / 个人中心 / 我的 / 功能入口 / 设置项聚合 / 资产中心 / 会员中心”等以入口型 list item 为主导的页面时，优先按本布局装配。
- 列表页中的 entry item 默认由 `list.md` 承载行级布局；item 的差异通过 icon 内容、title 文本、right text 值表达。
- 组卡片（N items 共享容器）与单卡片（1 item 独立容器）的差异在于**容器级分组**，而非新增另一套行组件。
- Header Card 不是 list item，是页面级自定义内容块，可复用 `cardview` 容器 + 自定义内部布局；若无 header 需求则省略。

| Layout Block | Component Reference | Variant / Composition | Layout Responsibility | Component Responsibility |
| --- | --- | --- | --- | --- |
| `titlebar` | `titlebar.md` | `harmony-titlebar` + `normal` + actions | 占据顶部壳层区域（`normal` variant = 124px），内含 status bar + 标题 + action icon | status bar 时间/图标、标题文本与 action icon 渲染 |
| `Header Card` | `cardview.md` + 自定义 | `harmony-cardview` 容器 + 自定义 header 内容 | 可选：页面级自定义卡片 | `cardview` 提供容器几何与圆角；内容为页面级自定义 |
| `Group Entry Card` | `cardview.md` + `list.md` + `divider.md` | `harmony-cardview` 容器，内含 N× `harmony-list` + (N-1)× `harmony-divider(inset)` | 圆角卡片容器，容纳 N 个 entry item + 分割线 | `cardview` 提供容器；`list` 提供行级布局；`divider` 提供 item 间分割 |
| `Single Entry Card` | `cardview.md` + `list.md` | `harmony-cardview(mini)` 容器，内含 1× `harmony-list` | 80px 圆角卡片，容纳 1 个 entry item | 同上，无 divider |
| `layout-bottom-bar`（独立/二级页） | `aibottombar.md` | `harmony-aibottombar` + `light` | 贴底 28px，指示条 | 指示条渲染 |
| `layout-bottom-bar`（多 tab 主页） | `bottomtab.md` | `harmony-bottomtab(4)` + `activeIndex=3`（「我的」tab 活跃） | 贴底 100px（含 aibottombar 28px + tab pill 56px + padding），4 tab 项 | 4 个 tab 图标、标签、激活态渲染（活跃 tab 蓝色强调） |

装配约束：
- Header Card 内的内容不是 list 组件，不映射到任何 list variant；若无 header 需求则从骨架中省略该块。
- Entry item 必须映射到 S3 `icon2lines`，并按 `list-tem.html` 的模板真值实例化，不允许页面级重写内部结构。
- 若 list reference 后续补充新的入口型 variant，本映射表应在确认其模板真值后更新；在此之前保持 S3 `icon2lines` 直连。
- Group Entry Card 内的 divider 只存在于 N≥2 时；单 item 卡片不需要 divider。
- 卡片容器高度必须由内部 item 与 divider 的几何累计得到，禁止 flex 压缩。

## 10. Adaptive Behavior

### 10.1 Fixed Shell vs Scrollable Content
- `titlebar`、底部 bar 属于固定壳层，不参与内容高度竞争。
- 内容区占满 screen 可滚动空间，并通过 `padding-top` / `padding-bottom` 为 titlebar 初始视觉位置与底部系统浮层预留安全滚动空间。
- 对 `normal` titlebar，顶部 padding 推荐使用 `statusbar(36) + content-area(88) + 8 ≈ 100px`，让首张卡片或首个浮层内容与标题内容层底边保持 8px 视觉间距，同时允许 titlebar 渐变背板覆盖普通内容上方区域。若首项需要浮在 titlebar 上方，使用首项自身 `z-index:30`，不得给 `.layout-content` 加 z-index。
- 当卡片总高度超过可用高度时，内容区应滚动，壳层保持固定。
- 滚动所有权在 `layout-content`，不在根画布。

### 10.2 Text Growth
- `titlebar` 标题默认单行省略，不能挤压 action icon。
- entry item 的 title（16px）默认单行截断 `text-overflow: ellipsis`。
- entry item 的 right text（14px）默认单行，最大宽度 96px，超出截断。
- Header Card 内文本按各自规格截断。

### 10.3 Card Growth
- Header Card 高度由内容决定，内容变化时沿纵向扩展，不反向侵占上方标题栏。
- Group Entry Card 高度 = `4 + N×72 + (N-1)×1 + 4`（N 为 item 数）。
- Single Entry Card 高度固定 80px。
- 卡片内 appicon、chevron、divider 等固定几何元素禁止被拉伸。

### 10.4 Item Count Growth
- Group Entry Card 内 item 数量增长时，卡片沿纵向扩展，追加 divider + item 对。
- Single Entry Card 数量增长时，新卡片以 12px 间距向下追加。
- 当总高度超过可用高度时触发滚动，不压缩卡片间距。

## 11. Semantic Token Usage
布局层必须绑定语义 token，禁止硬编码颜色值。

| Semantic Part | Recommended Token |
| --- | --- |
| Page canvas | `background_secondary` |
| Card surface（所有圆角卡片） | `comp_background_primary` |
| Titlebar title / entry item title | `font_primary` |
| Entry item right value | `font_secondary` |
| Entry item appicon background | `comp_background_tertiary` |
| Chevron (12×24) | `icon_tertiary` |
| Divider inside group card | `comp_divider` |
| Hover overlay（list item） | `interactive_hover` |
| Pressed overlay（list item） | `interactive_pressed` |
| Bottom tab active label | `font_emphasize` |
| Bottom tab inactive label | `font_primary` |

应用约束：
- entry item appicon 使用 `list-tem.html` 的 `harmony-list__appicon` 几何和填充。
- chevron 使用 `icon_tertiary`（40% black），比正文更轻。
- 卡片容器与分割线必须与 light/dark 主题联动切换。
- 壳层背景、卡片表面、交互覆盖层必须使用语义 token。

## 12. Component Placement Contract
此布局命中时，页面应优先复用以下组件 reference：
- `titlebar.md`
- `cardview.md`（`mini` / `medium` variant）
- `list.md`（S3 `icon2lines` variant 作为 entry item 载体）
- `divider.md`（`inset` variant，仅组卡片内 item 间使用）
- `aibottombar.md`（独立 / 二级页面）
- `bottomtab.md`（多 tab 应用主页）

补充说明：
- `switch.md`、`button.md` 不是本布局的必选组件。
- `size.md` 可作为设备壳层或预览容器使用，但不是内容区装配组件。

## 13. Rendering Constraints
- 禁止把整页实现为连续的匿名 frame 容器。
- 禁止把所有区块写成逐元素绝对定位；仅允许壳层级使用固定定位。
- 卡片内容必须以可复用的语义块（header card / group entry card / single entry card）组织。
- 卡片内部优先使用 `flex` 或纵向流式布局。
- entry item 内 appicon、title、aux、right text、chevron 必须防拉伸。
- 实现输出必须先满足 Composition Mapping（§9），再做模板注入与样式微调。
- 若设计稿中存在与现有 reference 不匹配的 list variant，应在实现日志中记录偏差并引用本 layout 的映射策略。

## 14. Variant Definition

### 14.1 `mobile-list`
适用于：
- 功能入口列表页（如：资产中心、会员中心、服务大厅）
- 个人中心 / 「我的」tab 页
- 设置入口聚合页（以导航跳转为主）
- 任何以 `appicon + title + aux / value + chevron` 入口型 list item 为主导的页面

核心特征：
- 单屏移动端
- 顶部标题栏
- 中部入口型 list item 卡片（appicon + title + aux / text + chevron）
- 底部 `aibottombar` 或 `bottomtab`
- 卡片按业务语义分组（组卡片 / 单卡片）
- 顶部可选 header 自定义区

### 14.2 `mobile-list-with-header`
在 `mobile-list` 基础上：
- 内容区顶部包含 Header Card（如身份信息、数据概要、banner）
- Header Card 位于 titlebar 下方、entry cards 上方
- 适用于需要顶部概要信息的列表页

### 14.3 `mobile-list-plain`
在 `mobile-list` 基础上：
- 无 Header Card，直接从 entry cards 开始
- 无组卡片（所有 item 均为 Single Entry Card）
- 适用于最简洁的纯列表页

### 14.4 与 `mobile-settings-single-column` 的边界
| 特征 | mobile-list | mobile-settings |
|------|------------|----------------|
| item 交互 | 导航跳转（chevron / right entry → 下一级） | 控件操作（switch / picker / value select） |
| item 左侧 | appicon(48×48) + title + aux | title only / appicon(48×48) + title / dot + title |
| 顶部 header | 可选（profile / banner） | 无 |
| 底部 | `aibottombar` 或 `bottomtab` | `aibottombar`（设置页无主 tab） |
| 卡片分组 | 组卡片 + 单卡片 | 组卡片 + 单卡片 |
| 底部 note 区 | 无 | 有（说明文案） |
| 典型页面 | 个人中心、资产中心、服务入口 | 系统设置、偏好配置、提醒设置 |

## 15. Audit Checklist
- [ ] 能明确识别为“移动端入口型列表页”（item 以 chevron 导航跳转为主），而非 feed 流或表单页。设置页若以入口型 list item 为主导，仍可命中本布局。
- [ ] `Hit Rules` 与 `Exclusion Rules` 无冲突，能排除 feed 流、表单页。注意：排除的是控件型设置页（switch/picker 为主），不是入口型设置页。
- [ ] 页面骨架先于组件拼装被命中。
- [ ] 主内容宽度统一为 `328px` 居中列。
- [ ] Header Card（若存在）被识别为页面级自定义块，不映射到 list 组件。
- [ ] Entry item 的 Composition Mapping 已直接命中现有 list reference 的 S3 `icon2lines` variant。
- [ ] `Composition Mapping` 能将每个页面块唯一映射到组件 reference。
- [ ] 卡片被抽象为“Header Card（可选）/ Group Entry Card / Single Entry Card”三类。
- [ ] `Adaptive Behavior` 已覆盖文本溢出、卡片增长、item 数量增长与内容滚动。
- [ ] titlebar 固定顶部，且背板为常驻纵向渐隐层；不得按 `scrollTop` / `.is-scrolled` 切换透明/模糊，不得在 titlebar 根节点添加整块 `backdrop-filter`。
- [ ] 内容区通过 padding-top 预留首张卡片初始视觉位置，不按完整 titlebar 几何高度硬推内容。
- [ ] `.layout-content` 未声明 `z-index` / `transform` / `filter` / `opacity<1` 等堆叠上下文属性；若存在 search/header glass 首项，该首项自身使用 `position:relative; z-index:30`。
- [ ] `Semantic Token Usage` 已覆盖页面、卡片、文本、icon、divider、交互覆盖层。
- [ ] 文档描述的是布局结构，不包含业务逻辑。
- [ ] Group Entry Card 高度 = `4 + N×72 + (N-1)×1 + 4`，未被 flex 二次压缩。
- [ ] `icon2lines` 行内左右 divider 在同一 72px 行底部齐平，右侧 divider 未相对 24px chevron 容器上浮。
- [ ] entry item 的 hover / pressed 状态层已接入，不止还原静态外观。
