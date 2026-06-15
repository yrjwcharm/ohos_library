# Layout Reference: Card

## 0. Metadata
- **Source Page**: Pixso source node `23:13468` (`卡片布局`)
- **Layout Type**: `mobile-card`
- **Canvas**: `360 × 780`
- **Content Height**: 长滚动页面，内容延伸至 y≈2637（约 3.4 倍视口高度）
- **Theme Base**: `background_primary`（白色 page canvas）+ `comp_background_primary`（卡片表面）+ glass morphism floating elements
- **Related Layouts**: `mobile-grid`（宫格首页，水平滚动为主；本布局为多卡片类型垂直堆叠长滚动）

## 1. Layout Identification
该页面属于标准的移动端内容卡片页（卡片布局），以多种卡片类型的垂直堆叠 + section header 分区管理为核心组织形式。

判断依据：
- 顶层存在稳定结构：固定 `titlebar` → 内容区首项 `search bar`（可滚动）→ content sections → 固定 `layout-bottom-shell(bottomtab + home indicator)`。
- 内容区由 section header 分区，每个 section 内包含一种或多种卡片类型的组合。
- 卡片类型丰富：hero banner、入口 icon 网格（5 列）、横向 2 列卡片（156×88）、竖向 3 列缩略卡片（98×140）、大尺寸特色卡片（328×212）、横向特色卡片（328×172，海报+文本+按钮）、竖向特色卡片（156 宽，image + 文本底板）。
- 卡片以**封面图 + 标题 + 副标题 + 可选叠加信息（评分、播放按钮）** 为核心结构。
- 页面为长滚动形式，内容高度远超视口，纵向滚动为主（非水平滚动）。
- 底部为固定吸底的 `layout-bottom-shell`，内部承载 4-tab bottomtab（首页/动态/会员购/我的，品牌橙色活跃态）及 home indicator / aibottombar。
- 页面承载内容浏览、推荐、榜单、分类入口等「首页/工作台/内容页」语义。

与 `mobile-grid` 的核心差异：
- 内容方向以**纵向滚动**为主，非水平滚动。
- 卡片类型**多样化**（7 种），grid 布局以单一宫格卡片为主。
- 卡片排列以 **2 列 / 3 列网格**为主，非单行水平滚动。
- 存在大尺寸特色卡片（328×212、328×172），grid 布局无此类大面积卡片。
- Section header 是强制性的分区手段，grid 布局的 header 是可选的。

## 2. Hit Rules
命中 `mobile-card` 时，页面应同时满足以下特征：
- 画布为单屏移动端竖向比例（360×780），页面为长滚动形式。
- 顶部固定壳层为 `titlebar`；可选 `search bar` 属于内容区首项，初始与 titlebar 视觉重叠但随内容滚动。
- 内容区由 2 个以上 section 垂直堆叠，每个 section 有 section header（标题文本，fs=16 Medium）。
- 内容以多种类型卡片为核心，卡片按 2 列或 3 列网格排列（非水平滚动行）。
- 卡片结构以「封面图 + 标题 + 副标题」为基础，叠加可选信息（评分 badge、播放按钮、元数据）。
- 至少存在一种大尺寸特色卡片（宽度 328px，高度 > 150px），包含海报图 + 文本 + 操作按钮。
- 底部为 tab bar（4~5 tab）。

## 3. Exclusion Rules
出现以下任一特征时，不应优先命中该布局：
- 页面以水平滚动宫格卡片为主 → 优先评估 `mobile-grid`。
- 页面为单列垂直 list item 堆叠，无封面图卡片 → 优先评估 `mobile-list`。
- 页面为纯设置/控件操作页 → 优先评估 `mobile-settings-single-column`。
- 页面无 section header，内容区域不分区。
- 卡片类型单一（全为同一尺寸/结构），无大尺寸特色卡片。
- 底部无 tab bar（仅 home indicator）且为独立功能页。

## 4. Page Skeleton

```html
<main class="layout-mobile-card">
  <header class="layout-titlebar"></header>

  <section class="layout-content">
    <!-- Search is the first scrollable content item.
         It visually floats at y≈96 and overlaps the titlebar backdrop,
         but it must scroll away with content. -->
    <section class="layout-search-bar"></section>

    <!-- Hero banner -->
    <section class="layout-region layout-region-hero">
      <div class="layout-hero-banner"></div>
      <div class="layout-hero-indicator"></div>
    </section>

    <!-- Entrance icon grid -->
    <section class="layout-region layout-region-entrance">
      <div class="layout-entrance-grid">
        <div class="layout-entrance-item"></div>
        <div class="layout-entrance-item"></div>
      </div>
    </section>

    <!-- Horizontal 2-col card section -->
    <section class="layout-region layout-region-h2col">
      <div class="layout-grid-2col">
        <div class="layout-card-h"></div>
        <div class="layout-card-h"></div>
      </div>
    </section>

    <!-- Section with header + 3-col thumbnail cards -->
    <section class="layout-region layout-region-thumb">
      <header class="layout-section-header"></header>
      <div class="layout-grid-3col">
        <div class="layout-card-thumb"></div>
        <div class="layout-card-thumb"></div>
        <div class="layout-card-thumb"></div>
      </div>
    </section>

    <!-- Section with header + large feature card -->
    <section class="layout-region layout-region-feature">
      <header class="layout-section-header"></header>
      <div class="layout-card-feature-large"></div>
    </section>

    <!-- Horizontal 2-col card section (repeat) -->
    <section class="layout-region layout-region-h2col"></section>

    <!-- Section with header + large horizontal feature cards -->
    <section class="layout-region layout-region-hfeature">
      <header class="layout-section-header"></header>
      <div class="layout-card-hfeature"></div>
      <div class="layout-card-hfeature"></div>
      <div class="layout-card-hfeature"></div>
    </section>

    <!-- Section with vertical feature cards (image + text plate) -->
    <section class="layout-region layout-region-vfeature">
      <div class="layout-grid-2col">
        <div class="layout-card-vfeature">
          <div class="layout-card-vfeature-img"></div>
          <div class="layout-card-vfeature-text"></div>
        </div>
      </div>
    </section>
  </section>

  <footer class="layout-bottom-shell">
    <nav class="layout-bottomtab"></nav>
  </footer>
</main>
```

## 5. Shell Rules

### 5.1 Root Canvas
- 画板固定为 `360 × 780`。
- 页面背景使用一级底色（`background_primary`，白色）。
- 页面为长滚动单列流向，自上而下阅读。
- 内容高度不受视口限制，可延伸至数倍视口高度。

### 5.2 Safe Areas
- 顶部固定保留：
  - `titlebar.md normal`：`124px`（组件内部已包含 statusbar 36px + title content 88px）
  - 顶部壳层合计：`124px`
  - 注意：`124px` 是 titlebar 材质/渐变背板高度，不是 search bar 的排版起点。
- 底部固定保留：
  - `layout-bottom-shell` 区域：`97px`（含 tab pill + home indicator / aibottombar + gradient mask）
- 固定壳层均为浮层定位，不参与内容流。

### 5.3 Content Width
- 页面主内容区标准宽度：`328px`（360 − 16×2）。
- 2 列卡片：每列 156px，列间距 16px（156+16+156=328）。
- 3 列缩略卡片：每列 98px，列间距 17px（98+17+98+17+98=328）。
- 全宽卡片（banner / feature）：328px。

### 5.4 Content Scroll Region
- 页面整体纵向滚动。
- 顶部只有 `titlebar` 是固定在 screen 内的顶部壳层浮层，不参与内容流。
- `search bar` 是视觉上的 floating glass 组件，但滚动所有权归属内容区：它必须作为 `.layout-content` 的首个内容项渲染，随纵向内容一起滚动，不得作为 screen 直属固定浮层。
- 底部 `layout-bottom-shell` 为浮层，不参与内容流；bottomtab 与 home indicator / aibottombar 必须作为同一个底部系统浮层整体吸底。
- 内容区通过 `padding-top` / `padding-bottom` 预留 titlebar/search 初始视觉位置与底部浮层安全区。
- **顶部 Z 轴与堆叠上下文（强制）**：`layout-content` 不得设置 `z-index` 或任何会创建新堆叠上下文的属性（如 `transform`、`filter`、`opacity<1`、`isolation:isolate`）。否则 `.layout-search-bar` 即使声明更高 `z-index`，也会被父级堆叠上下文压到 titlebar 下方。正确层级为：`bottomtab/layout-bottom-shell(z-index:100)` > `search bar(z-index:30, 内容流首项)` > `titlebar(z-index:10)` > `ordinary content(z-index:auto)`。
- **titlebar 背板硬边禁令（强制）**：layout 层不得在 `.harmony-titlebar` 根节点上额外添加整块 `backdrop-filter` / `-webkit-backdrop-filter`。titlebar 底部过渡必须来自常驻纵向渐隐背景（alpha 逐步归零），而不是一整块 124px 毛玻璃硬面。search 初始态位于 titlebar 上方；普通内容滚动时从 titlebar 渐隐背板下方经过。

## 6. Vertical Structure

### 6.1 Top Region
- 顶部必须完整复用 `titlebar.md` 的 `normal` variant（360×124），不得拆出独立 `public.md statusbar` 再手写 56px titlebar。
- `titlebar.md normal` 贴顶放置（y=0, h=124），组件内部自带 statusbar（36px）与标题内容区（88px）。
- titlebar 的背板必须是常驻的半透明纵向渐隐层：顶部保持较高不透明度，向下逐步衰减到透明。滚动过渡效果来自内容从 titlebar 背板下方经过，而不是通过 `scrollTop` 切换整块背板。
- titlebar 渐隐背板推荐 CSS：`.harmony-titlebar { z-index:10; background: linear-gradient(180deg, rgba(...,0.98) 0%, rgba(...,0.90) 42%, rgba(...,0.48) 78%, rgba(...,0) 100%); }`。不得在 titlebar 根节点追加整块 `backdrop-filter`，避免形成生硬的底部模糊边界。
- titlebar 固定在 screen 顶部，search 与内容滚动。不得把 search 作为 titlebar 子节点包进 titlebar 背板，也不得把 search 写成 screen 直属固定浮层。
- 标题栏内为：标题文本 + 右侧 floating action button（40×40, r=1000, grid icon / action icon）。
- 标题文本与右侧 icon button 所在内容层的排版底边约为 `y=88`（statusbar 36px + normal 内容区内 action top 12px + action 40px）。

### 6.2 Search Bar
- `floating search bar` 是内容区首个可滚动组件，初始位于标题/按钮内容层下方 `8px`，即初始 y≈96；不得按完整 titlebar 背板高度放到 `y=124`。
- 336×40px（右侧含 40×40 filter/clock button），圆角 24px，glass morphism 填充。
- 搜索 icon（magnifyingglass, 16×16）+ placeholder 文本「搜索...」（16px）。
- 右侧 clock/filter button（40×40, r=1000），glass morphism。
- 禁止将 search 写成 screen 直属 `position:absolute/fixed/sticky` 顶部固定浮层。推荐实现：`.layout-content { position:relative; padding-top: 96px; }`（不得设置 `z-index`），`.layout-search-bar { position: relative; z-index: 30; height: 40px; margin-bottom: 16px; }`。

### 6.3 Content Regions
内容区以 search bar 作为首个可滚动组件，search bar 下方按以下顺序堆叠：

1. **Hero Banner**（y≈152, h=219）
   - 全宽 banner 图（328×219），左侧起始边距 16px。
   - 底部 page indicator dots（280×32，5 个圆点，1 个激活态 pill）。

2. **Entrance Icon Grid**（y≈379, h=76）
   - 5 列 icon 入口，每项 68×76。
   - icon 圆形背板（40×40, r=50%, 品牌色 20% 透明度）+ 标签文本（12px）。
   - 排列间距：每项间距约 19px（(328−68×5)/4 ≈ 19）。

3. **Horizontal 2-Column Cards ×2 rows**（y≈467, 每行 h≈146）
   - 2 列排列，每卡 156×88。
   - 卡片内容：cover image + 评分 badge（22×16, r=4, 黑色 30% 底 + 白色文字）+ title（14px）+ subtitle（12px, 40% opacity）。
   - 列间距 16px，行间距约 60px（不含文字区）。

4. **Section Header + Vertical 3-Column Thumbnail Cards**（header y≈757 / cards y≈805, h≈188）
   - Section header（240×48, fs=16 Medium）— 文本为页面级业务数据，不写死在 layout 中。
   - 3 列排列，每卡 98×140。
   - 卡片内容：cover image + play button overlay（24×24, 居中）+ 可选评分 badge + title（14px）+ subtitle（12px, 40% opacity）。
   - 列间距 17px。

5. **Section Header + Large Feature Card**（header y≈1002 / card y≈1050, h=212）
   - Section header（240×48, fs=16 Medium）— 同上，文本为业务数据。
   - 全宽 328×212，浅灰底板（`comp_background_secondary`, r≈17）。
   - 内容：cover image（328×153）+ title overlay（16px Bold, 白色）+ play button（24×24, 居中）+ 评分 badge + 小缩略图（76×43）+ 标题（14px）+ 副标题（12px, 40% opacity）+ 关注 button（64×28, r=14, 灰色）。

6. **Horizontal 2-Column Cards ×2 rows**（y≈1274，同模式 3）

7. **Section Header + Large Horizontal Feature Cards ×3**（header y≈1555 / cards y≈1603, 每卡 h=172）
   - Section header（240×48, fs=16 Medium）— 同上，文本为业务数据。
   - 全宽 328×172，含遮罩底板。
   - 内容：poster image（114×152, 左侧）+ 标题（14px Medium）+ 元数据行（10px, 50% opacity）+ 播放统计（10px）+ 播放 button（64×25, r=12.5, 品牌橙色）+ 缓存 button（64×25, r=12.5, 灰色）。
   - 卡片间距：约 12px。

8. **Vertical Feature Cards ×4**（y≈2155, image+text plate 配对）
   - 2 列排列，每列 156px 宽。
   - 上：cover image（156×163~189）。
   - 下：文本底板（156×61, `comp_background_secondary`），含 title（14px）+ subtitle（12px, 40% opacity）。
   - 列间距 16px，行间距由 image 高度 + text plate 高度决定。

### 6.4 Bottom Region
- `layout-bottom-shell` 贴底（y=683, h=97），浮层定位。
- 渐变蒙层：`background_secondary` 透明→20% 不透明。
- Glass pill tab bar（328×53, r=100），4 tab 项。
- Home indicator（360×28）。
- 活跃 tab：品牌橙色（`rgba(237,111,33,1.0)`）文字 + icon，其余 tab 为 `font_primary`。
- bottomtab 背后优先使用自然延伸的滚动内容或页面纹理来支撑玻璃折射，不应额外覆盖一块整宽半透明灰/白底板。若必须增加材质探针层，只能作为低可见度纹理/光斑补充，不得是 screen 底部绝对定位的 100px+ 矩形覆盖层，也不得遮挡底部内容文字。

## 7. Block Patterns

### 7.1 Hero Banner
用于页面顶部重点推荐/活动入口。

结构特征：
- 尺寸：`328 × 219`，左侧起始边距 16px。
- 全图填充（Pixso VECTOR 扁平化）。
- 底部 page indicator dots：5 个指示点（4 个 6×6 圆形 + 1 个 12×6 pill 形激活态），白色，位于 banner 下方。

适用场景：
- 首页顶部 banner
- 活动/专题入口
- 热门推荐

### 7.2 Entrance Icon Grid（icon 入口网格）
用于分类/功能入口的 icon 网格。

结构特征：
- 每项尺寸：`68 × 76`。
- icon 圆形背板：40×40, r=50%，品牌色 20% 透明度填充。
- 标签文本：12px Regular，居中，位于 icon 下方。
- 5 列排列，等间距分布（间距约 19px）。

适用场景：
- 分类入口（分类/排行/优惠/收藏/会员）
- 功能导航（网格入口型）

### 7.3 Horizontal Card（横向 2 列卡片）
用于内容推荐的 2 列标准卡片。

结构特征：
- 尺寸：`156 × 88`（仅 cover image），加文字区后整卡约 156×146。
- Cover image：156×88，圆角按卡片规范。
- 评分 badge overlay（可选）：22×16, r=4，黑色 30% 底 + 白色 10px 文字，位于 cover 右下或左下角。
- Title：14px Regular，`font_primary`，单行截断。
- Subtitle：12px Regular，40% opacity，单行截断。
- 2 列排列，列间距 16px。

适用场景：
- 内容推荐列表
- 影剧/课程/商品卡片
- 任何「横图 + 标题 + 副标题」的组合

### 7.4 Vertical Thumbnail Card（竖向 3 列缩略卡片）
用于竖版内容的缩略展示。

结构特征：
- 尺寸：`98 × 140`（仅 cover image），加文字区后整卡约 98×188。
- Cover image：98×140。
- Play button overlay（可选）：24×24，居中覆盖在 cover 上。
- 评分 badge（可选）：22×16, r=4。
- Title：14px Regular，单行截断。
- Subtitle：12px Regular，40% opacity，单行截断。
- 3 列排列，列间距 17px。

适用场景：
- 竖版视频/直播封面
- 专辑/歌单封面
- 竖版内容推荐

### 7.5 Large Feature Card（大尺寸特色卡片）
用于重点内容的大面积展示，混合多种信息。

结构特征：
- 尺寸：`328 × 212`，全宽。
- 底板：浅灰（`comp_background_secondary`），r≈17。
- 内容层（从上到下）：
  1. Cover image（328×153），带 title overlay（16px Bold, 白色）+ play button（24×24, 居中）
  2. 评分 badge（右下角）
  3. 底部信息区：小缩略图（76×43）+ 标题（14px）+ 副标题（12px, 40% opacity）+ 操作 button（64×28, r=14, 灰色）

适用场景：
- 每日推荐/编辑精选
- 重点内容推广
- 专题卡片

### 7.6 Large Horizontal Feature Card（横向特色卡片）
用于内容详情型推荐，海报 + 文本 + 操作按钮的组合。

结构特征：
- 尺寸：`328 × 172`，全宽，含遮罩底板。
- 内容：
  - 左侧：poster image（114×152），圆角。
  - 右侧文本栈：title（14px Medium）+ 元数据行（10px, 50% opacity，如「电影 . 剧情片 . 日期」）+ 播放统计（10px, 50% opacity）。
  - 底部：播放 button（64×25, r=12.5, 品牌橙色）+ 缓存 button（64×25, r=12.5, 灰色）。
- 卡片间距：约 12px。

适用场景：
- 往期回顾/历史内容
- 搜索结果列表
- 视频/影剧推荐

### 7.7 Vertical Feature Card（竖向特色卡片）
用于图文结合的竖向内容展示。

结构特征：
- 宽度：`156px`（2 列排列，列间距 16px）。
- 上部：cover image（156×163~189），高度可变。
- 下部：文本底板（156×61, `comp_background_secondary`），含 title（14px）+ subtitle（12px, 40% opacity）。
- Image 与 text plate 紧密衔接（无缝）。

适用场景：
- 图文内容列表
- 资讯/文章推荐
- 社区内容

### 7.8 Section Header
用于每个内容 section 的标题。

结构特征：
- 尺寸：`240 × 48`。
- 文本：16px Medium，`font_primary`（深色 `rgba(24,36,49,1.0)`）。
- 无需右侧箭头（纯标题，非入口）。

### 7.9 Rating Badge（评分 badge）
跨卡片类型的通用叠加元素。

结构特征：
- 尺寸：`22 × 16`，圆角 4px。
- 背景：`rgba(0,0,0,0.30)` 半透明黑色。
- 文本：10px Regular，白色。
- 位置：卡片 cover 的右下角或左下角。

### 7.10 Play Button（播放按钮）
跨卡片类型的通用叠加元素。

结构特征：
- 尺寸：`24 × 24`。
- 位置：卡片 cover 水平居中、垂直居中。
- 类型：Pixso VECTOR 扁平化（圆形播放图标）。

## 8. Spatial Tokens

引用来源：`references/2.theme/mobile-scale.md`

### 8.1 Horizontal
- 页面边距：`16px`（内容区 328px 居中于 360px）。
- 2 列卡片列间距：`16px`（156 + 16 + 156 = 328）。
- 3 列缩略卡片列间距：`17px`（98 + 17 + 98 + 17 + 98 = 328）。
- 5 列 icon 入口间距：约 `19px`（等间距分布）。
- 全宽卡片（banner / feature）：`328px`。

### 8.2 Vertical
- `titlebar.md normal` 内容层（标题 + icon button，底边约 y=88）→ `search bar`：`8px`。注意：这是 search 的初始视觉位置，不代表 search 是 screen 固定浮层；search 必须作为内容区首项随纵向滚动。
- `titlebar.md normal` 的 124px 渐变背板允许延伸到 search bar 后方，不能把背板底边当作 search 的布局起点。
- `search bar` → hero banner：约 `16px`。
- hero banner → entrance grid：约 `24px`。
- entrance grid → 2-col cards：约 `12px`。
- section header（48px）→ 其下方卡片：约 `10px`。
- 2-col card 行间距：约 `60px`（含文字区）。
- Large feature card → 下方 section：约 `16px`。
- Horizontal feature card 间距：约 `12px`。
- Vertical feature card 行间距：约 `74px`（image height + text plate height）。

补充约束：
- 页面级 spacing 若没有组件 Numeric Baseline 真值，优先吸附到 `mobile-scale`。
- Glass morphism 元素引用 `theme.md` 的 glass token 体系。

## 9. Composition Mapping

### 9.0 Fast Path: Card Content Page Priority
- 命中「首页 / 工作台 / 内容页 / 发现页 / 推荐页 / 详情页局部模块」等以多类型卡片为核心的语义时，优先按本布局装配。
- 卡片类型多样性是本布局的核心特征；单一卡片类型的页面应评估其他布局。
- Section header 是强制性分区手段，每个内容 section 必须有 header。

| Layout Block | Component Reference | Variant / Composition | Layout Responsibility | Component Responsibility |
| --- | --- | --- | --- | --- |
| `titlebar` | `titlebar.md` | `harmony-titlebar` + `normal` + 1 action（grid icon） | 贴顶 124px，完整承载 statusbar + 标题内容 + floating button | 时间文本、状态图标、标题文本、右侧 icon button、渐变模糊背板 |
| `search bar` | `search.md` | `harmony-search` + `off/normal` + filter button | 336×40 glass pill，作为 `.layout-content` 首项，初始位于 y≈96，并随内容滚动；含搜索框 + 右侧 filter button | 搜索 icon、placeholder、filter button（clock icon） |
| `Hero Banner` | 无 — 页面级自定义 | 328×219 图片 + page indicator dots | banner 容器 + 指示点 | 整图渲染 + 5 点指示器（1 个 pill 激活态） |
| `Entrance Icon Grid` | 无 — 页面级自定义 | 5 列 icon 入口（68×76），圆形背板 + 标签 | 5 列网格容器 | icon 圆形背板、标签文本 |
| `Horizontal Card` | 无 — 页面级自定义 | 156×88 cover + rating badge + title + subtitle，2 列排列 | 2 列网格容器 + 行间距 | cover 图片、评分 badge、标题、副标题 |
| `Section Header` | `subheader.md` 或自定义 | 240×48，fs=16 Medium，纯标题 | section 标题区域 | 标题文本 |
| `Vertical Thumbnail Card` | 无 — 页面级自定义 | 98×140 cover + play button + 可选 rating + title + subtitle，3 列排列 | 3 列网格容器 | cover 图片、播放按钮、评分、标题、副标题 |
| `Large Feature Card` | 无 — 页面级自定义 | 328×212，底板(r≈17) + cover + overlay + 底部信息 + button | 全宽卡片容器 | cover 图片、title overlay、评分、缩略图、标题、副标题、关注 button |
| `Large Horizontal Feature Card` | 无 — 页面级自定义 | 328×172，poster(114×152) + 文本栈 + 播放/缓存 button | 全宽卡片容器 + 卡片间距 | poster 图片、标题、元数据、统计、播放 button（橙色 pill）、缓存 button（灰色 pill） |
| `Vertical Feature Card` | 无 — 页面级自定义 | 156×163~189 image + 156×61 text plate，2 列排列 | 2 列网格容器 + 行间距 | cover 图片、文本底板（title+subtitle） |
| `bottom shell` | `bottomtab.md` + 可选 `aibottombar.md` | `layout-bottom-shell` 包裹 `harmony-bottomtab(4)` + `activeIndex=0`；若使用独立 home indicator，则追加 `harmony-aibottombar` | 贴底 97px（含渐变蒙层 + pill + indicator），`position:absolute; bottom:0; left:0; right:0; z-index:100`，不进入滚动流 | 4 tab 项（首页/动态/会员购/我的），活跃态橙色；home indicator 渲染 |

装配约束：
- 多种卡片类型当前均无对应组件 reference，页面实现时作为容器级自定义块，但必须遵守本 layout 的几何约束。
- 若后续为卡片类型补充组件 reference（如 `card-horizontal`、`card-thumbnail`、`card-feature` 等），本映射表应更新。
- Section header 优先复用 `subheader.md`（text-only variant）。
- Rating badge 和 Play button 是跨卡片类型的通用元素，应抽取为可复用 snippet。
- 底部 tab bar 的活跃色为此页面的品牌橙色（`rgba(237,111,33,1.0)`），不是系统默认蓝色。

## 10. Adaptive Behavior

### 10.1 Fixed Shell vs Scrollable Content

**Screen 容器约束（强制）**：
- `.screen` 必须使用固定高度（`height: 780px` 或 `height: 792px`），不得使用 `min-height`。
- `.screen` 必须使用 `overflow: hidden; display: flex; flex-direction: column`，screen 自身不滚动。内容滚动委托给内部 `.layout-content`（`overflow-y: auto; flex: 1 1 auto; min-height: 0`）。禁止在 `.screen` 上设置 `overflow-y: auto` 让 screen 直接滚动——该模式会破坏浮层壳层的吸底可靠性。
- `.screen` 必须设置 `position: relative`，作为所有浮层壳层的定位参考。

**浮层壳层 CSS 模式（强制）**：
- 固定系统壳层（titlebar、`layout-bottom-shell`）必须使用 `position: absolute`，不参与内容流。`titlebar` 必须使用完整 `titlebar.md normal`，不得再额外渲染独立 statusbar。`bottomtab` / `aibottombar` 不应作为 `.layout-content` 的子节点，也不得跟随内容滚动。
- `search bar` 不属于固定系统壳层：它必须作为 `.layout-content` 首项，使用 `position: relative; z-index: 30` 建立层级，初始位于 y≈96，并随内容滚动离开顶部。
- Z-index 分层：`layout-bottom-shell(z-index:100)` > `search bar(z-index:30, 内容流首项相对定位)` > `titlebar(z-index:10)` > `ordinary content(z-index:auto)`。`.layout-content` 自身不得声明 `z-index`，否则 search 会被父级堆叠上下文限制，无法真正压过 titlebar。由于 titlebar 的 124px 渐隐背板会延伸到 search 后方，search 初始态必须位于 titlebar 上方；滚动过程中普通内容从 titlebar 渐隐背板下方经过。
- 顶部固定壳层使用 `top: 0; left: 0`（titlebar）；search bar 的初始 y≈96 来自内容区 top padding，即标题/按钮内容层底边 88px + 8px 间距。
- 底部壳层使用 `.layout-bottom-shell { position: absolute; bottom: 0; left: 0; right: 0; height: 97px; z-index: 100; overflow: hidden; pointer-events: none; }`，确保滚动时始终固定在页面底部；内部可交互子元素恢复 `pointer-events: auto`。
- `titlebar` 应直接采用 `titlebar.md normal` 的 124px 高度与纵向渐隐背板，不得在 layout 层重写为 92px / 56px 简化壳层，也不得改成整块实底或硬边毛玻璃面；不得在 `.harmony-titlebar` 根节点叠加整块 `backdrop-filter`。
- titlebar 背板滚动语义必须与 v31/v36 修正后一致：背板从首屏开始常驻，使用 `linear-gradient(180deg, rgba(..., 0.98) 0%, rgba(..., 0.90) 42%, rgba(..., 0.48) 78%, rgba(..., 0) 100%)` 这类顶部高透明度、底部归零的渐隐结构；search 初始态位于 titlebar 上方，普通内容区从背板下方滚过形成过渡感。
- 禁止为了“滚动后出现背板”而监听 `.layout-content.scrollTop` 切换 `.is-scrolled`、`.harmony-titlebar::before` 或 `background: transparent -> gradient`。这会把顶部做成硬切换背板，和 v31 的连续渐隐滚动效果不一致。
- titlebar 的 124px 背板是视觉过渡层，允许与 search bar 区域重叠；布局间距必须以 titlebar 内容层（标题 + icon button）为基准。
- 浮层容器推荐设置 `pointer-events: none`，其直接子元素设置 `pointer-events: auto`，避免浮层阻挡内容交互。

**内容区安全区**：
- `titlebar.md normal`（124px，内含 statusbar）与底部 `layout-bottom-shell`（97px，包含 bottomtab 与 home indicator / aibottombar）为固定浮层，不参与内容流；`search bar` 是内容区首项，参与内容流并随内容滚动。
- 内容区为自由长滚动，无高度限制。
- 内容区需通过 `padding-top`（≈96px，使 search 初始 y≈96）和 `padding-bottom`（≈113px，含底部 shell 97px + 安全余量）预留浮层安全区；search 自身 40px 高度与 `margin-bottom:16px` 共同使首屏 hero 起始 y≈152。

### 10.2 Card Content Growth
- Cover image 固定尺寸，使用 `object-fit: cover`。
- Title 单行截断 `text-overflow: ellipsis`。
- Subtitle 单行截断 `text-overflow: ellipsis`。
- 元数据/统计文本单行截断。
- 卡片总高度不随文本长度变化（封面图固定 + 文字区固定）。

### 10.3 Section Growth
- 页面可追加更多 section，每个 section 由 header + 卡片组构成。
- 新增 section 在已有区域后继续向下堆叠。
- Section 数量增长后，页面纵向滚动距离增长，无上限。

### 10.4 Column Consistency
- 2 列卡片列间距始终为 16px，不随卡片数量变化。
- 3 列缩略卡片列间距始终为 17px。
- 全宽卡片始终为 328px。
- 列数不随视口宽度变化（移动端固定布局）。

### 10.5 Glass Morphism Consistency
- 所有浮动玻璃元素（search bar、filter button、bottomtab pill）必须使用统一的 glass token。
- glass 效果：半透明 fill + linear dodge overlay + 8-layer shadow/glow stack。
- 禁止不同 glass 元素使用不同的阴影参数。

## 11. Semantic Token Usage

| Semantic Part | Recommended Token |
| --- | --- |
| Page canvas | `background_primary`（白色） |
| Card text plate / large feature card plate | `comp_background_secondary`（浅灰 `rgba(241,243,245,1.0)`） |
| Titlebar title / section header / card title | `font_primary` |
| Card subtitle / description | `font_tertiary`（40% opacity） |
| Card metadata / stats | `font_tertiary`（50% opacity） |
| Rating badge background | 半透明黑 `rgba(0,0,0,0.30)` |
| Rating badge text / title overlay on dark | `font_on_primary`（白色） |
| Brand accent（active tab, play button） | 品牌橙色 `rgba(237,111,33,1.0)` |
| Entrance icon background | 品牌橙色 20% `rgba(237,111,33,0.20)` |
| Play button（pill） | 品牌橙色 |
| Cache/follow button（pill） | `comp_background_tertiary`（灰色 `rgba(0,0,0,0.05)`） |
| Glass fill（search bar / bottomtab / filter button） | glass token |
| Search placeholder | `font_secondary` |

应用约束：
- 品牌橙色是本页面的主强调色（非系统默认蓝），不可替换为其他颜色。
- 白色页面的卡片文本底板必须使用浅灰 `comp_background_secondary`，确保卡片层次。
- Rating badge 的黑色半透明底是固定设计，不与 light/dark 主题联动。

## 12. Component Placement Contract
此布局命中时，页面应优先复用以下组件 reference：
- `titlebar.md`（`normal` variant, 1 action；组件内部已包含 statusbar，不得再单独调用 `public.md`）
- `search.md`（`off/normal` variant, 含 filter button 扩展）
- `bottomtab.md`（4-tab variant, activeIndex=0, 品牌橙色活跃态）
- `subheader.md`（text-only variant，section header）

补充说明：
- 7 种卡片类型当前均无对应组件 reference，页面实现时按本 layout §7 的几何约束自定义。
- Rating badge 和 Play button 作为跨类型通用元素，建议抽取为独立 snippet。
- `cardview.md` 的现有 variant 尺寸均不匹配本布局的卡片类型，不要强行映射。
- `chipstab.md` 不适用于本布局（本页面无类别分类标签栏）。
- `list.md` 不适用于本布局的卡片内容（卡片以封面图为主，非 icon+文本行）。

## 13. Rendering Constraints
- 禁止把整页实现为连续的匿名 frame 容器。
- 内容区必须以 section（header + 卡片组）为单位组织，不得平铺卡片。
- 2 列/3 列网格使用 CSS Grid 或 Flexbox，不得用绝对定位逐卡摆放。
- 全宽卡片使用 328px 宽度 + 16px 左边距。
- 卡片内 cover image 固定尺寸，使用 `object-fit: cover`，禁止拉伸变形。
- 固定系统壳层（完整 `titlebar.md normal`、`layout-bottom-shell`）必须使用 `position: absolute`（定位参考为 `.screen`），不得使用 `position: fixed`（会脱离 phone preview card 上下文）。不得额外渲染独立 statusbar；bottomtab / aibottombar 应放在该 shell 内，不得放入滚动内容区。
- search bar 不属于固定系统壳层：它必须作为 `.layout-content` 首项参与内容流，使用 `position: relative; z-index: 30`，不得作为 `.screen` 直属 `position:absolute/fixed/sticky` 浮层。
- 禁止用 `.bottom-glass-probe` 或类似节点在 bottomtab 背后生成可见的整宽灰/白矩形面板；bottomtab 的可见面只能是 pill bar 与轻量渐变蒙层。
- Glass 元素效果通过 CSS `backdrop-filter` + `box-shadow` + `background` 实现。
- 实现输出必须先满足 Composition Mapping（§9），再做模板注入与样式微调。

## 14. Variant Definition

### 14.1 `mobile-card`
适用于：
- 应用首页（内容推荐型，非宫格型）
- 工作台/内容浏览页
- 发现/推荐页（多卡片类型混合）
- 详情页局部模块（如「猜你喜欢」「相关推荐」卡片区）

核心特征：
- 单屏移动端
- 顶部标题栏 + 搜索栏
- Hero banner + 分类入口网格
- 多类型卡片垂直堆叠（7 种卡片类型）
- Section header 分区管理
- 2 列 / 3 列网格排列
- 底部 4-tab bar（品牌色活跃态）
- 长滚动，内容高度数倍于视口

### 14.2 `mobile-card-compact`
在 `mobile-card` 基础上：
- 无 hero banner 和 entrance grid，页面直接从 section 卡片开始。
- 卡片类型精简为 2~3 种。
- 适用于二级内容页、分类浏览页。

### 14.3 `mobile-card-detail-module`
在 `mobile-card` 基础上：
- 仅包含一个 section 的卡片组（如「猜你喜欢」「相关推荐」）。
- 无顶部壳层和底部 tab bar，作为详情页的嵌入模块使用。
- 卡片类型取 1~2 种。

### 14.4 与其他布局的边界

| 特征 | mobile-card | mobile-grid | mobile-list |
|------|-----------|-------------|-------------|
| 内容方向 | 纵向滚动 | 水平滚动（宫格） | 纵向堆叠 |
| 卡片类型 | 7 种，多样化 | 1~2 种 | 1 种（list item） |
| 卡片排列 | 2 列 / 3 列网格 | 单行水平滚动 | 单列 328px |
| 全宽大卡片 | 有（212px / 172px） | 无 | 无 |
| 封面图尺寸 | 88~189px | 131×131（固定） | 24~48px icon |
| Section header | 强制 | 可选 | 无 |
| 底部 | 4-tab bar | tab bar + miniplayer | tab bar / indicator |
| 页面高度 | 长滚动（~2600px） | 短滚动（~800px） | 视内容定 |
| 典型页 | 首页/工作台/内容页 | 音乐首页/发现 | 个人中心/设置入口 |

## 15. Audit Checklist
- [ ] 能明确识别为「移动端内容卡片页（卡片布局）」而非宫格首页或列表页。
- [ ] `Hit Rules` 与 `Exclusion Rules` 无冲突，能排除 grid、list、settings 布局。
- [ ] 页面骨架先于组件拼装被命中。
- [ ] 7 种卡片类型的几何约束已明确（§7.1~§7.7）。
- [ ] 跨类型通用元素（Rating badge、Play button）已抽取定义。
- [ ] 2 列/3 列网格的列间距和卡片尺寸已精确到 px。
- [ ] Section header 已作为强制性分区手段标注。
- [ ] `Composition Mapping` 标注了所有卡片类型的 reference 缺失状态。
- [ ] `Adaptive Behavior` 已覆盖长滚动、文本溢出、section 增长、列一致性。
- [ ] `Semantic Token Usage` 已覆盖品牌橙色、白色页面底板、glass 元素。
- [ ] Glass morphism 元素标记了统一的 token 约束。
- [ ] 文档描述的是布局结构，不包含业务逻辑。
- [ ] search 已明确为 `.layout-content` 首项：初始 y≈96、336×40、随纵向内容滚动，且不得作为 screen 直属固定浮层。
- [ ] titlebar 固定顶部，且背板为常驻纵向渐隐层；不得用 `scrollTop` / `.is-scrolled` 切换硬背板，不得在 `.harmony-titlebar` 根节点添加整块 `backdrop-filter`。
- [ ] `.layout-content` 自身未设置 `z-index` / `transform` / `filter` / `opacity<1` 等堆叠上下文属性；search 作为内容流首项 `z-index:30`，titlebar 为 `z-index:10`。
- [ ] 浮层安全区 padding 已定义（content padding-top≈96px, bottom≈113px；search 40px + 16px margin 形成 hero 起始 y≈152）。
- [ ] 卡片内 cover、badge、title、subtitle 防拉伸约束已明确。
