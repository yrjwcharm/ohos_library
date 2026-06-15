# Layout Reference: Grid

## 0. Metadata
- **Source Page**: Pixso source node `118:19305` (`首页-直板机`)
- **Layout Type**: `mobile-grid`
- **Canvas**: `360 × 792`
- **Theme Base**: `background_secondary` page canvas + `comp_background_primary` card surface + glass morphism floating elements
- **Related Layouts**: `mobile-list`（列表页，单列垂直堆叠；本布局为水平滚动宫格 + 多区域混合）

## 1. Layout Identification
该页面属于标准的移动端首页/发现页（宫格布局），以水平滚动的宫格卡片 + 多内容区域混合编排为核心组织形式。

判断依据：
- 顶层存在稳定结构：固定 `titlebar` → 内容区首项 `search bar`（可滚动）→ content regions → 固定 `bottomtab`。
- hero 大卡下方存在 chipstab 类别分类标签栏（473×52），用于切换不同内容类别，chip 可水平滚动。
- 内容区由多个独立区域垂直堆叠，每个区域有各自的标题头（section header）+ 水平滚动内容。
- 核心内容为宫格卡片：`cover image (131×131, r=8) + overlay + title`，卡片等宽排列，间距固定（8px），一行内可水平滚动。
- 存在 hero 大卡区域（224×280），同样是水平滚动。
- 页面宽度不限于 360px 视口，水平滚动区域超出视口宽度。
- 底部为bottomtab。
- 页面承载业务入口、推荐内容、榜单等「发现/首页」语义。

与 `mobile-list` 的核心差异：
- 内容不是单列垂直堆叠的入口 list item，而是多区域混合（hero + grid + list）。
- 宫格卡片以**封面图为主**，文字为辅，list item 以**icon + 文本**为主。
- 内容区支持**水平滚动**，宽度超出视口。
- 底部 tab bar 可含 miniplayer（媒体播放场景）。

## 2. Hit Rules
命中 `mobile-grid` 时，页面应同时满足以下特征：
- 画布为单屏移动端竖向比例（360×792）。
- 顶部固定壳层为 `titlebar`；可选 `search bar` 属于内容区首项，初始与 titlebar 视觉重叠但随内容滚动。
- 内容区由 2 个以上独立区域（section）垂直堆叠，每个区域有 section header（标题 + 可选右箭头）。
- 至少一个区域为宫格卡片：等宽卡片水平排列，卡片宽度在 120~180px 之间，卡片之间间距 8px，一行内水平滚动。
- 宫格卡片以「封面图 + 文字信息」为核心结构，图片占比 > 60% 卡片面积。
- 底部为`bottomtab`（4~5 tab）。

## 3. Exclusion Rules
出现以下任一特征时，不应优先命中该布局：
- 页面内容为单列垂直 list item 堆叠，无水平滚动区域 → 优先评估 `mobile-list`。
- 卡片内以 icon + 文本为主、无封面图 → 优先评估 `mobile-list`。
- 页面为纯设置/控件操作页 → 优先评估 `mobile-settings-single-column`。
- 页面为多列瀑布流（卡片高度参差、非等宽等距）→ 本布局不覆盖。
- 页面无 section header 直接进入内容区。
- 底部无 tab bar（仅 home indicator）且全页为独立功能页。

## 4. Page Skeleton

```html
<main class="layout-mobile-grid">
  <header class="layout-titlebar"></header>

  <section class="layout-content">
    <!-- Search is the first scrollable content item.
         It visually floats at y≈100 and overlaps the titlebar by 24px,
         but it must scroll away with content. -->
    <section class="layout-search-bar"></section>

    <!-- Hero card region (horizontal scroll) -->
    <section class="layout-region layout-region-hero">
      <div class="layout-hero-scroll">
        <div class="layout-hero-card"></div>
        <div class="layout-hero-card"></div>
      </div>
    </section>

    <!-- Chipstab category filter (horizontal scroll chips) -->
    <section class="layout-chipstab"></section>

    <!-- Grid card region (section header + horizontal scroll cards) -->
    <section class="layout-region layout-region-grid">
      <header class="layout-section-header"></header>
      <div class="layout-grid-scroll">
        <div class="layout-grid-card"></div>
        <div class="layout-grid-card"></div>
        <div class="layout-grid-card"></div>
      </div>
    </section>

    <!-- Optional secondary list region -->
    <section class="layout-region layout-region-list">
      <header class="layout-section-header"></header>
      <div class="layout-list-scroll"></div>
    </section>
  </section>

  <footer class="layout-bottom-bar">
    <div class="layout-bottomtab"></div>
    <div class="layout-miniplayer"></div>
  </footer>

  <div class="layout-home-indicator"></div>
</main>
```

## 5. Shell Rules

### 5.1 Root Canvas
- 画板固定为 `360 × 792`。
- 页面背景使用二级底色（`background_secondary`）。
- 页面为单列流向，自上而下阅读，但内部区域可超出视口宽度水平滚动。

### 5.2 Safe Areas
- 顶部固定保留：
  - `titlebar`（已内含 status bar）：高度由 variant 决定，`normal` = 124px
- 底部固定保留：
  - `bottom bar` 区域：`100px`（使用 `bottomtab.md` 的真实组件高度，含 bottomtab pill + fold/miniplayer + indicator + gradient mask）
- 底部固定区域合计：`100px`

### 5.3 Content Width
- 页面主内容区水平边距：`16px`（section header 等固定宽度元素对齐）。
- 水平滚动区域可超出视口宽度，无固定最大宽度。

### 5.4 Content Scroll Region
- 页面整体纵向滚动。
- 顶部只有 `titlebar` 是固定在 screen 内的顶部壳层浮层，不参与内容区 flex 高度分配。
- `search` 是视觉上的 floating glass 组件，但滚动所有权归属内容区：它必须作为 `.layout-content` 的首个内容项渲染，随纵向内容一起滚动，不得作为 screen 直属固定浮层。
- 底部 `bottomtab` 是 screen 内浮层，不参与内容区 flex 高度分配。
- **浮层 z-index 约定（强制）**：固定壳层、滚动 search 与底部浮层必须按以下 z-index 层叠，不得对调或省略：
  - `bottomtab`：`z-index: 100`（最上层，底部浮层）
  - `search`：`z-index: 30`（滚动内容内相对定位，高于 titlebar，保证首屏 search 位于 titlebar 渐隐背板上方）
  - `titlebar`：`z-index: 10`（常驻纵向渐隐背板，在 search 下方；搭配 `pointer-events: none` + 子元素 `pointer-events: auto`）
  - 内容区：`z-index: auto`（默认层，被 titlebar / bottomtab 浮层覆盖；不得对 `.layout-content` 本身声明 `z-index`）
  - 理由：search 初始 y≈100，与 titlebar 底部渐隐区（124px 高）存在 y 轴重叠（约 24px）。若 titlebar z-index 高于 search，或 `.layout-content` 创建了低层级堆叠上下文，则 search 会被 titlebar 吃掉。正确的视觉叠放是：首屏 search 在 titlebar 上面；页面纵向滚动时，search 随内容离开顶部，普通内容从 titlebar 渐隐背板下方经过。
- **堆叠上下文禁令（强制）**：`.layout-content` 不得设置 `z-index`，也不得设置会创建堆叠上下文的属性（如 `transform`、`filter`、`opacity<1`、`isolation:isolate`）。search 的 `z-index:30` 必须能参与 screen 根堆叠比较。
- 内容区占满 screen 剩余容器，但必须同时预留 top/bottom safe padding：顶部 padding 使 search 的初始 y≈100，底部为 bottomtab safe padding（建议 `100px + 16px`），避免内容被浮层遮住。
- 水平滚动所有权在各 `layout-*-scroll` 容器内，不干扰页面纵向滚动。

## 6. Vertical Structure

### 6.1 Top Region
- `titlebar` 贴顶放置，`normal` variant = 124px（已内含 status bar 36px + 标题内容区）。
- 顶部壳层必须消费 `titlebar.md` 的材质语义：根节点需标记 `data-component="titlebar"`，并使用 `harmony-titlebar--normal` 的常驻纵向渐隐背景。不得用普通自定义 `statusbar + topbar` 替代 titlebar 背板。
- titlebar 背板必须从首屏开始常驻：推荐 `linear-gradient(180deg, rgba(...,0.98) 0%, rgba(...,0.90) 42%, rgba(...,0.48) 78%, rgba(...,0) 100%)`。禁止通过监听 `scrollTop` 切换 `.is-scrolled` 或 `background: transparent -> gradient`；禁止在 `.harmony-titlebar` 根节点叠加整块 `backdrop-filter` / `-webkit-backdrop-filter`，避免生成生硬的底部模糊边界。
- titlebar 与 search 必须保持组件边界独立：titlebar 使用 `harmony-titlebar--normal` 贴顶；search 使用 `harmony-search[data-component="search"]` 作为内容区首个组件渲染，初始视觉位置在 titlebar 下方并与 titlebar 底部重叠；不得把 search 作为 titlebar 子节点包进 titlebar 背板。
- titlebar 不得作为普通 flex 子项占用文档流高度；内容容器通过 `padding-top` 预留 search 的初始 y 位置。search 可以占用内容流高度，并必须随内容纵向滚动。否则会出现 search 固定不动、与内容滚动语义不一致的问题。
- 标题栏内为：
  - 标题文本（26px Bold），左对齐
  - 右侧 1 个 icon button（40×40, r=1000, grid/settings icon）

### 6.2 Search Bar
- `floating search bar` 是内容区首个可滚动组件，初始位于 titlebar 下方（y≈100），与 titlebar 底部存在 24px 重叠区（间距 = −24px，详见 §8.2）。
- 328×40px，圆角 24px，glass morphism 填充。
- 左侧 magnifying glass icon（16×16）+ placeholder 文本（16px）。
- Search 组件背后没有额外整宽背板；只能渲染 `search.md` / `search-tem.html` 中定义的 pill 本体与内部 `.harmony-search__overlay` 状态层。不得继承 titlebar 的渐隐背景。
- 渲染时 search 的 z-index 必须高于 titlebar（详见 §5.4 浮层 z-index 约定），否则 titlebar 渐隐层会吃掉 search 上沿。
- 禁止将 search 写成 screen 直属 `position:absolute/fixed/sticky` 顶部固定浮层。推荐实现：`.layout-content { position:relative; padding-top: 100px; }`（不得设置 `z-index`），`.layout-search-bar { position: relative; z-index: 30; height: 40px; margin-bottom: 16px; }`。

### 6.3 Content Regions
内容区从 search bar 下方开始，按以下顺序堆叠：

1. **Hero Region**（y≈156）
   - 水平滚动区，2 张 hero 大卡（224×280）。
   - 卡片间距 8px，左侧起始边距 16px。
   - 无 section header。

2. **Chipstab**（y≈444）
   - 类别分类标签栏，473×52px。
   - 位于 hero 大卡与 grid region 之间，用于切换下方宫格卡片的类别（如：推荐 / 流行 / 新歌 / 摇滚 等）。
   - chip 水平排列，超出视口宽度可水平滚动。
   - 映射到 `chipstab.md` 组件。

3. **Grid Region**（y≈488）
   - Section header（328×72）+ 水平滚动宫格卡片。
   - Header 内容：左「Hi Raven，为你推荐」（个性化推荐语）+ 右箭头。
   - 宫格卡片：131×173，3 张，间距 8px，左侧起始边距 16px。

4. **List Region**（y≈725，初始部分在屏幕外，纵向滚动后可见）
   - Section header（176×56）+ 两列列表。
   - Header 内容：「喜欢「夏日漱石」的也喜欢」+ 红点指示。
   - 列表内容为两列布局（左列 416px + 右列 312px），水平滚动。

### 6.4 Bottom Region
- `bottom bar` 贴底（y=692, h=100）：
  - bottomtab 必须以浮层方式贴底（如 `position:absolute; bottom:0`），不得作为普通 flex 子项占用文档流高度；否则内容区会在 bottomtab 顶边被裁断，看起来像整块底板截断卡片。
  - 渐变蒙层使用 `bottomtab.md` 的 `::before` / `--bt-container-gradient`，最高透明度约 20%，不得写成 `background_secondary` 100% 实底。
  - bottomtab 背后应优先使用自然延伸的滚动内容、封面卡片、页面纹理或 `screen::before` 来支撑玻璃折射。若使用额外材质探针层，只能是低可见度纹理/光斑补充；禁止在 screen 底部绝对定位一块 100px+ 整宽半透明灰/白矩形背板。
  - `harmony-bottomtab` `multibar`（360×100）。
  - Glass pill bottomtab（264×56, r=100），4 tab + 文字标签。
  - Fold/miniplayer（56×56, r=128.4），位于 `.harmony-bottomtab__fold` / `.harmony-bottomtab__album`。
  - Home indicator 使用 `.harmony-bottomtab__indicator`（360×28）。

## 7. Block Patterns

### 7.1 Hero Card（hero 大卡）
用于首页头部重点推荐内容，面积大、视觉冲击强。

结构特征：
- 尺寸：`224 × 280`。
- 内容为整图填充（Pixso 导出为 VECTOR 扁平化渲染层，无内部子节点）。
- 圆角：由消费端按卡片规范定义。
- 卡片间距 8px，水平排列，一行内滚动。

适用场景：
- 首页头部推荐
- 热门歌单 / 专辑入口
- 活动 banner

### 7.2 Grid Card（宫格卡片）
这是本布局的核心承载单元。

结构特征：
- 尺寸：`131 × 173`。
- 从上到下三层：
  1. **Cover Image**：`131 × 131`，圆角 `8px`，`object-fit: cover`
  2. **Play Count Overlay**（可选）：覆盖在 cover 底部，`131 × 40`，渐变背景（透明→30% black），内含 play icon（HMSymbol U+F07E0, 20px, white）+ count 文本（10px, white 90%）
  3. **Title**：`131 × 38`，14px Regular，`font_primary`，最多 2 行截断
- 卡片间距 8px，水平排列，一行内滚动。
- 左侧起始边距 16px。
- Cover 与 overlay 的圆角是同一个视觉整体：cover 必须 `overflow:hidden`，overlay 必须显式设置底部圆角 `0 0 8px 8px`，避免 Code-to-Design 或浏览器滚动层把底部视觉还原成直角。
- Grid 横向滚动容器必须为 cover shadow / bottom radius 预留纵向空间（建议 `padding-bottom >= 8px`），不要让滚动容器的 cross-axis clipping 裁掉卡片底部圆角或阴影。

适用场景：
- 推荐歌单 / 专辑
- 分类入口
- 内容发现
- 榜单卡片

### 7.3 Grid Card — 与现有 reference 的映射关系

现有 `cardview.md` 的 5 个 variant（max/larger/medium/small/mini）的最小宽度为 156px（small），均不匹配 131px 宫格卡片。

| 属性 | 本布局 Grid Card | 现有 `cardview(small)` | 偏差 |
|------|-----------------|----------------------|------|
| 宽度 | 131px | 156px | 宽度不匹配 |
| 高度 | 173px | 156px | 高度不匹配 |
| 内容结构 | cover(131×131) + overlay + title | 自定义 slot | 结构不同 |
| 图片占比 | 76%（131/173） | 不限定 | — |

**结论：现有 reference 缺少 `grid-card` 组件（131×173，cover + overlay + title）。**

布局层的临时策略：
- Grid Card 暂时作为页面级自定义内容块，外容器由 layout 直接管理，不映射到现有组件 reference。
- 若后续 `cardview.md` 补充 `grid` variant 或新增独立的 `grid-card` 组件 reference，本映射应更新。
- 禁止将宫格卡片降级为 `list` item 拼接（list 的行高模型不适用于封面图 + 文字的垂直卡片结构）。

### 7.4 Section Header
用于每个内容区域的标题头部。

结构特征：
- 宽度 328px（与主内容区对齐）。
- 水平布局：左侧标题文本 + 右侧可选箭头/更多入口。
- 字体按区域内实际规格定义。

### 7.5 Chipstab（类别分类标签栏）
用于内容区域的类别切换，位于 hero 大卡与 grid 宫格区之间，用户可切换不同类别以筛选下方宫格内容。

结构特征：
- 尺寸：`473 × 52`（宽度超出视口，chip 可水平滚动）。
- chip 水平排列，间距由 `chipstab.md` 组件规范定义（默认 8px）。
- 左侧起始边距 16px。
- 当前活跃 chip 高亮（蓝色/品牌色背景 + 白色文字），其余 chip 为默认态（半透明背景 + 次级文字）。
- 从 Pixso DSL 导出为 VECTOR 类型（扁平化 SVG），内部 chip 结构未暴露，实现时必须还原为 `chipstab.md` 的 DOM 结构。

适用场景：
- 首页内容分类切换（推荐 / 流行 / 新歌 / 摇滚）
- 发现页标签筛选
- 任何需要在宫格区域上方提供类别过滤的场景

### 7.6 List Region（可选）

### 7.6 List Region（可选）
用于宫格区域下方的补充列表内容。

结构特征：
- Section header + 两列水平滚动列表。
- 列表 item：48×48 封面图（r=4）+ 2 行文本（title 16px Medium + subtitle 12px Regular）+ 可选 more icon。
- item 高度 72px，之间以 1px divider 分隔。

## 8. Spatial Tokens

引用来源：`references/2.theme/mobile-scale.md`

### 8.1 Horizontal
- 页面固定内容边距：`16px`（section header、search bar 等固定宽度元素）。
- 水平滚动区域起始边距：`16px`（首张卡片左对齐），后续卡片无右边距限制。
- 宫格卡片间距：`8px`。
- Hero 卡片间距：`8px`。
- Section header 右箭头与文本间距：`8px`。

### 8.2 Vertical
- `titlebar` → search bar：`-24px`（搜索栏顶部与 titlebar 底部重叠 24px。titlebar 高度 124px，搜索栏初始 y=100，因此间距 = 100 − 124 = −24。Pixso 真值来源：`23:11547` 首页宫格布局中 FloatingTitleBar 与 Floating Search-Phone 的相对位置。注意：这是初始视觉位置，不代表 search 是 screen 固定浮层；search 必须作为内容区首项随纵向滚动。）
- `titlebar` → 下方首个卡片区域：`8px`（当 titlebar 下方直接进入卡片内容、没有 search bar 等中间浮层时，titlebar 内容层底边与首个卡片顶边保持 8px 间距；若存在 search bar，则以 `titlebar → search bar` 与 `search bar → hero region` 规则为准）
- search bar → hero region：约 `16px`（搜索栏底部 y=140 到 hero 起始 y≈156）
- hero region → chipstab：约 `8px`
- chipstab → grid region：约 `0px`（chipstab 底部紧贴 grid section header 顶部）
- grid region → list region：间距由内容区自然流动
- 最后内容区域 → bottom bar：由内容区高度自然吸收

补充约束：
- 页面级 spacing 若没有组件 Numeric Baseline 真值，优先吸附到 `mobile-scale`。
- Glass morphism 元素的模糊参数和阴影参数引用 `theme.md` 的 glass token 体系。

## 9. Composition Mapping
该章节定义布局骨架如何映射到组件 reference。

### 9.0 Fast Path: Grid Home Page Priority
- 命中“首页 / 发现 / 推荐 / 首页-宫格 / 内容发现”等语义时，优先按本布局装配。
- 宫格卡片（Grid Card）当前无对应组件 reference，作为页面级自定义块处理。
- 若后续新增 `grid-card` 组件 reference，本映射表应更新为直接引用。
- Section header 不强制映射到 `subheader.md`；若 header 仅为文本 + 箭头，可复用 `subheader`；若含个性化内容（如推荐语），作为页面级自定义。

| Layout Block | Component Reference | Variant / Composition | Layout Responsibility | Component Responsibility |
| --- | --- | --- | --- | --- |
| `statusbar` | `statusbar.md` | `harmony-statusbar` + `light` | 360×36，位于 titlebar 容器内部首位，独立组件节点 | 时间文本（15/20 Medium）、PNG 图标资源（wifi/single-card/dual-card/battery，96×13 子槽绝对定位） |
| `titlebar` | `titlebar.md` | `harmony-titlebar` + `normal` + 1 action（grid icon） | 占据顶部 124px 壳层（内含独立 statusbar 组件），标题「推荐」 | 常驻纵向渐隐背板、标题文本、右侧 icon button 渲染；statusbar 不作为 titlebar 内置 `__status`，而是独立 `data-component="statusbar"` 节点；layout 层不得追加整块 backdrop-filter |
| `search bar` | `search.md` | `harmony-search` + `off` + `normal` | 328×40 glass pill，作为 `.layout-content` 首项，初始位于 titlebar 下方 y≈100，并随内容滚动 | 搜索 icon、placeholder 文本、glass morphism 效果 |
| `Hero Card` | 无 — 页面级自定义 | 224×280 图片卡片，水平滚动 | 管理 hero scroll 容器 + 卡片间距 | 整图渲染（Pixso VECTOR 扁平化），圆角 |
| `Chipstab` | `chipstab.md` | `harmony-chipstab` + variant（tab / tab-with-icon / icontab） | 473×52 类别标签栏，位于 hero 下方，chip 水平滚动 | chip 项渲染、激活/非激活态、chip 间距与滚动 |
| `Section Header`（grid） | `subheader.md` 或自定义 | 328×72，左侧推荐语 + 右箭头 | 区域标题头部 | 文本 + 可选箭头 |
| `Grid Card` | 无 — 页面级自定义 | 131×173，cover(131×131,r=8) + overlay + title | 管理 grid scroll 容器 + 卡片间距 | cover 图片、play count overlay（icon+text）、title 文本 |
| `Section Header`（list） | `subheader.md` 或自定义 | 176×56，左侧标题 + 红点指示 | 区域标题头部 | 文本 + 红点指示器 |
| `List Item`（list region） | `list.md` 或自定义 | 48×48 封面图 + 2 行文本 + more icon，72px 高 | 管理 list scroll 容器 + divider | 封面图、title+artist 文本、more icon、分割线 |
| `bottom bar` | `bottomtab.md` | `harmony-bottomtab` + `multibar` + `activeIndex=0` | 贴底 100px（含 tab pill + fold/miniplayer + home indicator） | 4 tab 项（首页/音乐厅/Cafe听/我的，首页活跃）、右侧折叠 bar/miniplayer、底部指示条 |
| `home indicator` | `bottomtab.md` 内置 indicator；独立壳层可用 `aibottombar.md` | `harmony-bottomtab__indicator` 或 `harmony-aibottombar` + `light` | 位于底部安全区 28px | 指示条渲染 |

装配约束：
- Grid Card 暂时无组件 reference 对应，页面实现时作为容器级自定义块，但必须遵守本 layout 的几何约束（131×173、8px 间距、水平滚动）。
- Search bar 使用 `search.md` 的 `off/normal` 状态，无需显示 action 区域。
- Title bar 右侧仅有 1 个 icon button（grid icon, HMSymbol U+F0134），不是 3 个。
- 音乐首页若包含 miniplayer，必须使用 `bottomtab.md` 的真实 `multibar` variant：根节点为 `.harmony-bottomtab[data-component="bottomtab"][data-variant="multibar"]`，内部包含 `.harmony-bottomtab__row`、`.harmony-bottomtab__bar--multi`、`.harmony-bottomtab__fold` / `.harmony-bottomtab__album`、`.harmony-bottomtab__indicator`。不要把 `data-component="bottomtab"` 放在页面级 wrapper 上，也不要用自定义 `bottom-shell` 替代组件根结构。
- Bottomtab 的容器背景必须来自组件 template 的 `::before` 渐变层；不要把 `.harmony-bottomtab` 自身写成不透明背景，否则会形成一块底板，遮住下方内容。若使用独立 `aibottombar.md`，媒体/首页浮动场景优先使用 transparent 语义，避免再叠一层实底。
- 不得为了增强玻璃效果额外添加可见的整宽灰/白探针面板；如果底部内容已经延伸到栏后方，就不需要探针层。
- Bottomtab 作为系统浮层时不应参与内容区布局高度计算；页面内容容器需要额外 `padding-bottom` 提供滚动安全区，而不是把内容提前截停在 bottomtab 顶部。
- 水平滚动容器的 overflow 管理：`layout-*-scroll` 容器必须 `overflow-x: auto; scroll-snap-type: x mandatory`（或近），隐藏滚动条。

## 10. Adaptive Behavior

### 10.1 Fixed Shell vs Scrollable Content
- `titlebar` 属于覆盖在内容上的固定顶部浮层；`search` 属于内容区内的可滚动 floating glass 组件，初始与 titlebar 重叠但不固定；`bottom bar`（100px，内含 home indicator）属于覆盖在内容上的底部浮层。
- 内容区占满 screen 可滚动空间，并通过 top/bottom padding 为 titlebar/search 初始视觉位置与底部系统浮层预留安全滚动空间。
- 页面整体纵向滚动。水平滚动在各自区域内独立，不干扰纵向滚动。
- 初始可见内容：hero region（280px）+ chipstab（52px）+ grid region 上部（约 200px）= 约 540px，刚好占满可见区。list region 初始在屏幕外。

### 10.2 Horizontal Scroll
- Hero scroll 和 Grid scroll 的容器宽度由内部卡片累计宽度决定（不受 328px 限制）。
- 水平滚动不截断卡片，不压缩卡片间距。
- 最后一张卡片右侧保留适当余量（建议 16px），确保滚动到底时卡片不贴边。
- 水平滚动容器只允许在主轴方向裁切滚动内容；cross-axis 必须给卡片圆角、阴影和 overlay 留出空间，避免首屏底部看起来像被切平。

### 10.3 Card Content Growth
- Grid Card cover 固定 131×131，图片使用 `object-fit: cover`。
- Title 最多 2 行，超出截断 `text-overflow: ellipsis`。
- Play count 单行，过长时截断。
- Hero Card 尺寸固定 224×280，不接受内容驱动的尺寸变化。

### 10.4 Region Growth
- 页面可追加更多 Grid Region / List Region。
- 新增区域在已有区域后继续向下堆叠，间距由 section header 管理。
- 区域数量增长后，页面纵向滚动距离增长。

### 10.5 Glass Morphism Consistency
- 所有浮动玻璃元素（search bar、bottomtab pill、miniplayer）必须使用统一的 glass token 体系。
- glass 效果包含：背景半透明 fill + drop shadow + background blur + inner shadow 多层叠加。
- 禁止不同 glass 元素使用不同的阴影参数。

## 11. Semantic Token Usage
布局层必须绑定语义 token，禁止硬编码颜色值。

| Semantic Part | Recommended Token |
| --- | --- |
| Page canvas | `background_secondary` |
| Titlebar title / section header title | `font_primary` |
| Grid card title | `font_primary` |
| Search placeholder / search icon | `font_secondary` |
| Play count text | `font_on_primary`（白色文字叠在深色渐变上） |
| List item subtitle / artist | `font_tertiary` |
| Chevron / more icon | `icon_tertiary` |
| Divider | `comp_divider` |
| Chipstab active chip bg | `floating_backgrount_emphasize`（品牌蓝） |
| Chipstab active chip text | `font_on_primary`（白色） |
| Chipstab inactive chip bg | `material_background_ultra_thin`（半透明） |
| Chipstab inactive chip text | `font_secondary` |
| Glass fill（search bar / bottomtab / miniplayer） | glass token（`comp_glass_light` 或等效） |
| Bottom tab active | `font_emphasize`（红色品牌色） |
| Bottom tab inactive | `font_primary` |
| Red dot indicator | `brand_red` 或 `#FF1949` |

应用约束：
- Play count overlay 上的白色文字必须使用 `font_on_primary`（白色系），不与页面主文字 token 混用。
- Glass 元素必须使用统一的 glass token，禁止各元素独立调参。
- 卡片内容、分割线、section header 必须与 light/dark 主题联动。

## 12. Component Placement Contract
此布局命中时，页面应优先复用以下组件 reference：
- `titlebar.md`（`normal` variant, 1 action）
- `search.md`（`off/normal` variant）
- `bottomtab.md`（`multibar` variant, activeIndex=0，4 tab + fold/miniplayer + indicator）
- `aibottombar.md`（仅当页面采用独立 home indicator 壳层时使用）
- `chipstab.md`（类别分类标签栏，3 variant：tab / tab-with-icon / icontab）
- `subheader.md`（可选，用于 section header）

补充说明：
- Grid Card 当前无对应组件 reference，页面实现时按本 layout §7.2 的几何约束自定义。
- `list.md` 可用于 list region 的行级承载（72px item 映射到 2lines 或 icon2lines variant）。
- `cardview.md` 的现有 variant 均不适用于 131×173 宫格卡片，不要强行映射。
- `divider.md` 可用于 list region 的 item 间分割线。

## 13. Rendering Constraints
- 禁止把整页实现为连续的匿名 frame 容器。
- 禁止把所有区块写成逐元素绝对定位；仅壳层级使用固定/sticky 定位。
- 水平滚动区域必须使用原生的 `overflow-x: auto` 或 `scroll`，不得用 JS 模拟滚动。
- Grid Card 内部必须防拉伸：cover 不随 title 长度变化而变形。
- Glass 元素的效果叠加必须通过 CSS 实现（`backdrop-filter` + `box-shadow` + `background`）。
- 实现输出必须先满足 Composition Mapping（§9），再做模板注入与样式微调。

## 14. Variant Definition

### 14.1 `mobile-grid`
适用于：
- 应用首页（如音乐 App 首页、视频 App 首页）
- 发现页 / 推荐页
- 内容浏览页（以宫格卡片为主要内容形式）
- 任何「封面图 + 文字标题」宫格卡片 + 多区域混合编排的页面

核心特征：
- 单屏移动端
- 顶部标题栏 + 搜索栏
- 水平滚动 hero 大卡区
- chipstab 类别分类标签栏（hero 下方，切换宫格内容类别）
- 水平滚动宫格卡片区（131×173，cover + title）
- Section header 分区管理
- 底部 glass 浮动 tab bar + miniplayer
- 可选补充列表区

### 14.2 `mobile-grid-compact`
在 `mobile-grid` 基础上：
- 无 hero 大卡区，页面直接从 grid 区域开始。
- Grid Card 尺寸可调整（如 2 列满屏 156×156 等）。
- 适用于二级发现页、分类浏览页。

### 14.3 `mobile-grid-with-banner`
在 `mobile-grid` 基础上：
- Hero 区替换为全宽 banner 轮播（swiper/carousel）。
- Banner 高度约 160~200px。
- 适用于需要 banner 曝光的首页。

### 14.4 与 `mobile-list` 的边界
| 特征 | mobile-grid | mobile-list |
|------|-----------|-------------|
| 核心内容 | 宫格卡片（cover + title） | 入口 list item（icon + title） |
| 内容方向 | 水平滚动 | 垂直堆叠 |
| 卡片宽度 | 131px（非满屏） | 328px（满屏） |
| 图片占比 | > 60%（封面图为主） | 仅 icon（24~48px） |
| 搜索栏 | 有（内容区首项 glass floating，随纵向滚动） | 无 |
| 底部 | tab bar + miniplayer | tab bar 或 home indicator |
| 典型页面 | 首页、发现、推荐 | 个人中心、设置入口、资产中心 |

## 15. Audit Checklist
- [ ] 能明确识别为“移动端首页/发现页（宫格布局）”而非列表页或设置页。
- [ ] `Hit Rules` 与 `Exclusion Rules` 无冲突，能排除列表页、设置页、瀑布流。
- [ ] 页面骨架先于组件拼装被命中。
- [ ] chipstab 类别标签栏已标注：473×52，位于 hero 下方，映射到 `chipstab.md`。
- [ ] 宫格卡片几何约束明确：131×173，cover 131×131 r=8，间距 8px。
- [ ] 水平滚动区域正确标记为 `layout-*-scroll`，overflow 约束已定义。
- [ ] Grid Card 的 reference 缺失已在 §7.3 标注，映射策略已明确。
- [ ] `Composition Mapping` 能将每个页面块映射到组件 reference 或标注为自定义。
- [ ] `Adaptive Behavior` 已覆盖水平滚动、纵向滚动、文本溢出、区域增长。
- [ ] search 已明确为 `.layout-content` 首项：初始 y≈100、328×40、`z-index:30`、随纵向内容滚动，且不得作为 screen 直属固定浮层。
- [ ] `Semantic Token Usage` 已覆盖 glass 元素、卡片内容、文字层级、tab 激活态。
- [ ] Glass morphism 元素标记了统一的 token 约束，不禁用硬编码阴影参数。
- [ ] titlebar 与下方首个卡片区域的直接间距已明确为 8px，且 titlebar 为常驻纵向渐隐背板；不得用 `scrollTop` / `.is-scrolled` 切换硬背板，不得在 titlebar 根节点添加整块 `backdrop-filter`。
- [ ] `.layout-content` 未声明 `z-index` / `transform` / `filter` / `opacity<1` 等堆叠上下文属性，保证 search 的 z-index 能真正高于 titlebar。
- [ ] 文档描述的是布局结构，不包含业务逻辑。
- [ ] 壳层高度（titlebar 124 + bottom bar 100，bottomtab 内含 indicator）已正确扣除。
- [ ] Grid Card 内 cover、overlay、title 防拉伸约束已明确。
