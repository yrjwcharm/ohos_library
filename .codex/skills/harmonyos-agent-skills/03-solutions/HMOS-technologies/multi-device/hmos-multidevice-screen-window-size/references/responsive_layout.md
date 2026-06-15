# 响应式布局指南

## 目录

1. [核心概念](#核心概念)
2. [断点 UX 规格速查表](#断点-ux-规格速查表)
3. [四种响应式布局](#四种响应式布局)

---

## 核心概念

### 响应式布局简介

- 响应式布局即页面根据不同屏幕尺寸自动调整布局，是页面在各种设备，各种尺寸的屏幕上都有良好的UI体验。
- 响应式布局的基础是断点（参考[断点系统完全指南](./breakpoint_system.md)）,通过断点的变化来调整布局。
- 响应式布局有重复布局、分栏布局、挪移布局和缩进布局等具体的布局方式

### 关键属性/API

| 属性/API | 说明 | 适用能力           |
|---------|------|----------------|
| `lanes`(List) | 设置List组件的布局列数或行数（List垂直滚动时表示列数，水平滚动时表示行数） | `RESP-01` 重复布局 |
| `columnsTemplate`(Grid / WaterFlow) | 设置当前网格布局列的数量、固定列宽或最小列宽值，不设置时默认1列。例如 `'1fr 1fr 2fr'` 分3列按1:1:2比例分配。支持 `repeat(auto-fit, track-size)` 设置最小列宽自动计算列数，`repeat(auto-fill, track-size)` 设置固定列宽自动计算列数，`repeat(auto-stretch, track-size)` 设置固定列宽并使用 columnsGap 作为最小列间距。track-size 支持单位 px、vp、% 或有效数字，默认 vp。 | `RESP-01` 重复布局 |
| `rowsTemplate`(Grid) | 设置当前网格布局行的数量、固定行高或最小行高值，不设置时默认1行。格式与 `columnsTemplate` 一致，支持 `repeat(auto-fit/auto-fill/auto-stretch, track-size)` 模式。 | `RESP-01` 重复布局 |
| `columnsGap`(Grid / WaterFlow) | 设置列与列的间距。默认值 0，取值范围 [0, +∞)。 | `RESP-01` 重复布局 |
| `rowsGap`(Grid / WaterFlow) | 设置行与行的间距。默认值 0，取值范围 [0, +∞)。 | `RESP-01` 重复布局 |
| `itemConstraintSize`(WaterFlow) | 设置子组件布局时的尺寸范围限制，类型为 `ConstraintSizeOptions`。同时设置 `itemConstraintSize` 和 FlowItem 的 `constraintSize` 时，minWidth/minHeight 取两者最大值，maxWidth/maxHeight 取两者最小值。只设置 `itemConstraintSize` 时相当于对所有 FlowItem 统一设置相同的 `constraintSize`。 | `RESP-01` 重复布局 |
| `WaterFlowLayoutMode`(WaterFlow) | 瀑布流布局模式枚举，用于控制布局策略。优先考虑视窗内布局信息或涉及动态切换列数时，建议使用 `SLIDING_WINDOW` 模式。 | `RESP-01` 重复布局 |
| `displayCount`(Swiper) | 设置视窗内元素显示个数。支持 `number \| SwiperAutoFill`，`SwiperAutoFill` 可通过 `minSize` 自动计算显示个数；支持 `swipeByGroup` 参数按组滑动（每组 displayCount 个）；API 12+ 支持 `ItemFillPolicy` 策略，API 22+ 新增 `PresetFillType` 按断点预设显示个数（如 `BREAKPOINT_SM1MD2LG3`）。 | `RESP-01` 重复布局 |
| `prevMargin`(Swiper) | 设置前边距，用于露出前一项的一小部分。支持 `ignoreBlank` 参数，开启后在非循环（loop=false）时首尾不会留白。 | `RESP-01` 重复布局 |
| `nextMargin`(Swiper) | 设置后边距，用于露出后一项的一小部分。支持 `ignoreBlank` 参数，开启后在非循环（loop=false）时首尾不会留白。 | `RESP-01` 重复布局 |
| `showSideBar`(SideBarContainer) | 设置SideBarContainer组件是否显示侧边栏 | `RESP-02` 分栏布局 |
| `sideBarWidth`(SideBarContainer) | 设置SideBarContainer组件侧边栏的宽度 | `RESP-02` 分栏布局 |
| `SideBarContainerType`(SideBarContainer) | 侧边栏显示模式枚举，作为 `SideBarContainer(type)` 构造参数。`Embed`(0)：侧边栏嵌入组件内，与内容区并列显示，显示侧边栏会压缩内容区；`Overlay`(1)：侧边栏浮在内容区上面，不影响内容区大小；`AUTO`(2, API 10+)：组件尺寸 ≥ minSideBarWidth + minContentWidth 时用 Embed，否则用 Overlay，未设置时默认以 600vp 作为模式切换断点值。 | `RESP-02` 分栏布局 |
| `minContentWidth`(SideBarContainer) | 设置内容区可显示的最小宽度。默认值 360vp。Embed 模式下增大组件尺寸仅增大内容区，缩小时先缩小内容区至 minContentWidth，再缩小侧边栏。 | `RESP-02` 分栏布局 |
| `minSideBarWidth`(SideBarContainer) | 设置侧边栏最小宽度约束。默认值 240vp，取值范围 [0, +∞)。优先于侧边栏子组件 minWidth。 | `RESP-02` 分栏布局 |
| `maxSideBarWidth`(SideBarContainer) | 设置侧边栏最大宽度约束。默认值 280vp，取值范围 [0, +∞)。优先于侧边栏子组件 maxWidth。 | `RESP-02` 分栏布局 |
| `mode`(Navigation) | 设置导航页的显示模式，支持单栏（Stack）、分栏（Split）和自适应（Auto） | `RESP-02` 分栏布局 |
| `navBarWidth`(Navigation) | 设置导航页宽度。仅在 `mode` 设置为 `NavigationMode.Auto` 或 `NavigationMode.Split` 时生效。默认值 240vp，API 18+ 支持 `!!` 双向绑定变量。若只设置 navBarWidth 则导航页宽度固定，分割线不可拖动。 | `RESP-02` 分栏布局 |
| `vertical`(Tabs) | 设置不同断点下 Tabs 为横向或纵向。 | `RESP-03` 挪移布局 |
| `barPosition`(Tabs) | 设置不同断点下 Tabs 的页签位置（如 `BarPosition.Start` 侧边、`BarPosition.End` 底部）。 | `RESP-03` 挪移布局 |
| `barMode`(Tabs) | 设置不同断点下 TabBar 的布局模式（`Fixed` 固定 / `Scrollable` 可滚动），以及 Scrollable 模式下 TabBar 的布局样式。 | `RESP-03` 挪移布局 |
| `barWidth`(Tabs) | 设置不同断点下 TabBar 的宽度。 | `RESP-03` 挪移布局 |
| `barHeight`(Tabs) | 设置不同断点下 TabBar 的高度。 | `RESP-03` 挪移布局 |
| `columns`(GridRow) | 设置GridRow在不同断点下的布局列数 | `RESP-03` 挪移布局 |
| `breakpoints`(GridRow) | 设置断点的划分阈值，与横向断点一致。例如 `{ value: ['320vp', '600vp', '840vp', '1440vp'] }`。 | `RESP-03` 挪移布局 |
| `span`(GridCol) | 设置栅格子组件GridCol占用栅格容器组件GridRow的列数 | `RESP-03` 挪移布局 |
| `offset`(GridCol) | 设置栅格子组件GridCol的偏移列数 | `RESP-04` 缩进布局 |
| `order`(GridCol) | 设置不同断点下栅格子组件的序号，用于控制 GridCol 的排列顺序。 | `RESP-03` 挪移布局 / `RESP-04` 缩进布局 |

---

## 断点 UX 规格速查表

> **实施时必须严格参照以下规格值，禁止使用非文档来源的默认值。** xl 断点未单独列出时与 lg 一致。

### RESP-01 重复布局

> **列数递增原则**：速查表中的 sm/md/lg 列数为通用参考值，实际实施时必须以**原始设计基线**为起点递增。
> - 若原始设计（直板机/SM断点）为 N 列，则 md = N+1，lg = N+2
> - 例如：原始设计为1列瀑布流 → 适配值为 1/2/3（而非通用的 2/3/4）
> - 例如：原始设计为2列瀑布流 → 适配值为 2/3/4（与通用值一致）

| 子场景 | 属性 | sm | md | lg |
|--------|------|----|----|-----|
| 列表布局 | `lanes` | 1 | 2 | 3 |
| 列表布局 | `lanes` 列间距 | — | 12vp | 12vp |
| 列表布局 | `space` 行间距 | 8vp | 12vp | 16vp |
| 瀑布流（基线1列） | `columnsTemplate` | 1 | 2 | 3 |
| 瀑布流（基线2列） | `columnsTemplate` | 2 | 3 | 4 |
| 轮播 | `displayCount` | 1 | 2 | 3 |
| 轮播 | `prevMargin` / `nextMargin` | 0 | 12vp | 64vp |
| 轮播 | `indicator` | 圆点 | false | false |
| 网格 | `columnsTemplate` | 2 | 3 | 4 |

### RESP-02 分栏布局

| 子场景 | 属性 | sm | md | lg |
|--------|------|----|----|-----|
| 侧边栏 | `SideBarContainerType` | Overlay | Embed | Embed |
| 侧边栏 | `sideBarWidth` | 80% | 50% | 40% |
| 侧边栏 | `showSideBar` | false | true | true |
| 单/双栏 | Navigation `mode` | Stack | Split | Split |
| 单/双栏 | `navBarWidth` | — | 50% | 50% |
| 三分栏 | `SideBarContainerType` | Overlay | Overlay | Embed |
| 三分栏 | `sideBarWidth` | 80% | 50% | 20% |
| 三分栏 | Navigation `mode` | Stack | Split | Split |
| 三分栏 | `navBarWidth` | — | 50% | 30% |
| 三分栏 | `showSideBar` | false | false | true |

### RESP-03 挪移布局

| 子场景 | 属性 | sm | md | lg |
|--------|------|----|----|-----|
| 插图文字 | GridRow `columns` | 4 | 8 | 12 |
| 插图文字 | 封面 `span` | 4 | 4 | 4 |
| 插图文字 | 列表 `span` | 4 | 4 | 8 |
| 插图文字 | 排列方式 | 上下 | 左右 | 左右 |
| 底部/侧边导航 | `barPosition` | End | End | Start |
| 底部/侧边导航 | `vertical` | false | false | true |

### RESP-04 缩进布局

| 子场景 | 属性 | sm | md | lg |
|--------|------|----|----|-----|
| 单列列表 | GridRow `columns` | 4 | 8 | 12 |
| 单列列表 | GridCol `span` | 4 | 6 | 8 |
| 单列列表 | GridCol `offset` | 0 | 1 | 2 |

---

## 四种响应式布局

### 一、重复布局 — `RESP-01`（4个场景）

#### 1. 列表布局（List + 断点）

列表布局基于横向断点，动态调整列数以实现重复布局。
具体方案：设置不同横向断点下，List组件的lanes、space属性实现目标效果。

```typescript
List({
  space: new WidthBreakpointType(8, 12, 16, 16).getValue(this.mainWindowInfo.widthBp),
  scroller: this.listScroller
}) {
  // ...
}
.scrollBar(BarState.Off)
.lanes(new WidthBreakpointType(1, 2, 3, 3).getValue(this.mainWindowInfo.widthBp), 12)
```
#### 2. 瀑布流布局（WaterFlow + 断点）

瀑布流布局基于横向断点，动态控制列数以实现重复布局。

##### 布局效果

具体方案：设置不同横向断点下，WaterFlow组件的columnsTemplate属性实现目标效果，并且FlowItem()必须配置.width('100%')，否则会造成内容溢出。

```typescript
WaterFlow() {
  LazyForEach(this.dataSource, (item: number, index: number) => {
    FlowItem() {
      Row() {}
      .width('100%')
      .height('100%')
      .borderRadius(16)
      .backgroundColor('#F1F3F5')
    }
    .width('100%')
    .height(this.itemHeightArray[index])
  }, (item: number, index: number) => JSON.stringify(item) + index)
}
.columnsTemplate(`repeat(${new WidthBreakpointType(2, 3, 4, 4).getValue(this.mainWindowInfo.widthBp)}, 1fr)`)
.columnsGap(12)
.rowsGap(12)
.width('100%')
```
#### 3. 轮播布局（Swiper + 断点）

轮播布局基于横向断点，动态控制视窗内显示元素的个数以实现重复布局。
具体方案：设置不同横向断点下，Swiper组件的displayCount、prevMargin、nextMargin和indicator属性实现目标效果。

```typescript
Swiper() {
  // ...
}
.displayCount(new WidthBreakpointType(1, 2, 3, 3).getValue(this.mainWindowInfo.widthBp))
// Setting the navigation point Style of the swiper.
.indicator(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ? Indicator.dot()
  .itemWidth(6)
  .itemHeight(6)
  .selectedItemWidth(12)
  .selectedItemHeight(6)
  .color('#4DFFFFFF')
  .selectedColor(Color.White) : false
)
// The sizes of the front and rear banners on the MD and LG devices are different.
.prevMargin(new WidthBreakpointType(0, 12, 64, 64).getValue(this.mainWindowInfo.widthBp))
.nextMargin(new WidthBreakpointType(0, 12, 64, 64).getValue(this.mainWindowInfo.widthBp))
```
#### 4. 网格布局（Grid + 断点）

网格布局基于横向断点，动态控制列数/行数以实现重复布局。
具体方案：设置不同横向断点下，Grid组件的columnsTemplate属性实现目标效果。在不设置Grid组件行数的情况下，行数 = 展示元素数量 / 列数。

> **网格布局 vs 瀑布流布局**：网格布局子组件严格对齐均分，适合规则排列场景；瀑布流布局子组件高度自定义，无需对齐，适合高度不一的内容展示。

```typescript
Grid() {
  ForEach(this.infoArray.slice(new WidthBreakpointType(4, 2, 0, 0).getValue(this.mainWindowInfo.widthBp)),
    (item: number) => {
      // ...
    }, (item: number, index: number) => JSON.stringify(item) + index)
}
.width('100%')
.columnsTemplate(`repeat(${new WidthBreakpointType(2, 3, 4, 4).getValue(this.mainWindowInfo.widthBp)}, 1fr)`)
.columnsGap(12)
.rowsGap(12)
```

### 二、分栏布局 — `RESP-02`（6个场景）

分栏布局是指在空间充足时，将窗口划分为两栏或三栏，用于展示多类内容。常见的分栏布局包括侧边栏、单/双栏和三分栏。

#### 1. 侧边栏（SideBarContainer + 断点）

侧边栏基于横向断点，动态控制侧边栏是否显示，实现二分栏布局。
具体方案：在不同横向断点下，动态控制SideBarContainer组件的showSideBar和sideBarWidth属性实现目标效果。

```typescript
SideBarContainer(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ? SideBarContainerType.Overlay :
  SideBarContainerType.Embed) {
  Column() {
    // ...
  }
  .backgroundColor('#F1F3F5')

  Column() {
    // ...
  }
  .backgroundColor('#FDBFFC')
  .padding({
    top: this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) + 12,
    bottom: this.getUIContext().px2vp(this.mainWindowInfo.AvoidNavigationIndicator?.bottomRect.height),
    left: 16,
    right: 16
  })
}
.showSideBar(this.isShowingSidebar)
.sideBarWidth(new WidthBreakpointType('80%', '50%', '40%', '40%').getValue(this.mainWindowInfo.widthBp))
.controlButton({ top: this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) + 12 })
```

#### 2. 单/双栏（Navigation + 断点）

单/双栏基于横向断点，动态控制导航栏的显示模式，实现二分栏布局。

> **单/双栏 vs 侧边栏区别**：单/双栏的导航栏能控制内容区的路由跳转（如商品列表→商品详情）；侧边栏通常不控制内容区展示的内容（如图文详情与评论区）。

> **⚠️ Navigation 与分区容器的嵌套顺序陷阱**：当 `Navigation` 与任何自带分区能力的容器（`SideBarContainer`、`Tabs`、自定义分栏 `Row`/`Column` 等）组合使用时，**Navigation 必须在内层，分区容器在外层**。反转嵌套顺序会导致宽屏下内容区空白。
>
> **根因**：Navigation 的内容区只渲染 `navPathStack` 路由推入的页面。当分区容器作为 Navigation 的直接子组件时，Navigation 将分区容器整体视为 navBar 区域，分区容器内部的内容区无法被 Navigation 识别和独立渲染，导致内容区空白。
>
> **错误模式**（Navigation 包裹分区容器）：
> ```typescript
> // ❌ Navigation 作为外层，分区容器作为子组件
> Navigation(navPathStack) {
>   SideBarContainer(...) { ... }   // 整体被当作 navBar，内容区空白
>   // 或 Tabs(...) { ... }         // 同理
>   // 或 Row() { 菜单 + 内容 }      // 同理
> }
> ```
>
> **正确模式**（分区容器包裹 Navigation）：
> ```typescript
> // ✅ 分区容器在外层，Navigation 嵌套在某一分区内
> SideBarContainer(...) {
>   Column() { 菜单 }               // 侧边栏分区
>   Navigation(navPathStack) { ... } // 内容区中的路由导航
> }
> // 或 Tabs() { TabContent() { Navigation(...) } }
> // 或 Row() { 菜单; Navigation(...) }
> ```
>
> 分区容器负责将屏幕划分为多个区域，Navigation 只在目标区域内管理路由跳转，两种职责互不干扰。

具体方案: 设置不同横向断点下，Navigation组件的mode属性实现目标效果。

**方案选择**：

| 方案 | 适用场景 | 实现方式 |
|------|---------|---------|
| `NavigationMode.Auto`| 简单分栏：在宽屏上实现自动分栏，sm 断点 Stack、md 及以上 Split，无需额外断点状态管理 | `.mode(NavigationMode.Auto)` |
| 手动断点切换 | 复杂场景：需要自定义断点阈值、需要动态切换（聊天场景中从双栏切换到单栏）、需要 `navBarWidth` 差异化配置 | `.mode(this.widthBp === WidthBreakpoint.WIDTH_SM ? NavigationMode.Stack : NavigationMode.Split)` |

**方案一：NavigationMode.Auto**

```typescript
Navigation(this.pathStack) {
  // ...
}
.mode(NavigationMode.Auto)
// 若未设置.title属性则需要设置.hideTitleBar(true)
.hideTitleBar(true)
```

系统自动根据窗口宽度切换：窄屏（<600vp）→ Stack 单栏，宽屏（≥600vp）→ Split 分栏。无需引入 `WidthBreakpoint`、`@StorageProp` 或断点监听代码，适用于大多数简单分栏场景。

**方案二：手动断点切换（复杂场景）**

```typescript
@StorageProp('currentWidthBreakpoint') currentWidthBp: WidthBreakpoint = WidthBreakpoint.WIDTH_SM;

Navigation(this.pathStack) {
  // ...
}
.mode(this.currentWidthBp === WidthBreakpoint.WIDTH_SM ? NavigationMode.Stack : NavigationMode.Split)
// 若未设置.title属性则需要设置.hideTitleBar(true)
.hideTitleBar(true)
```

适用场景：
- 需要将默认分栏阈值从 600vp 调整到其他断点（如 md→Stack, lg→Split）
- 需要在运行时动态切换模式（如聊天场景"全屏商品页"临时回退到 Stack）
- 需要配合 `navBarWidth()` 在不同断点使用不同宽度

#### 3. 二分栏典型场景——聊天（Navigation 双栏路由切换）

某些应用在双栏布局下支持通过右侧内容区链接跳转至其扩展页面并单栏展示。以社交应用为例，在横向断点为md、lg和xl时，左侧导航栏为聊天列表，右侧内容区显示聊天框，包括文字信息和商品链接；当用户在右侧点击商品链接时，可进入单栏模式，全屏展示对应的商品扩展区页面，同时隐藏原聊天页，实现沉浸式浏览体验。

```typescript
@Builder
PageMap(name: string) {
  if (name === 'conversationDetail') {
    ConversationDetail({
      // ...
    })
  } else if (name === 'conversationDetailNone') {
    ConversationDetailNone();
  } else if (name === 'productPage') {
    ProductPage({
      // ...
    })
  }
}

build() {
  Navigation(this.pathStack) {
    ConversationNavBarView({
      mainWindowInfo: this.mainWindowInfo,
      pageInfos: this.pageInfos,
      pathStack: this.pathStack,
    })
  }
  .mode(this.getNavMode())
  // 若未设置.title属性则需要设置.hideTitleBar(true)
  .hideTitleBar(true)
  // ...
  .navDestination(this.PageMap)
}

getNavMode(): NavigationMode {
  if (!this.isNavFullScreen && this.mainWindowInfo.widthBp !== WidthBreakpoint.WIDTH_SM) {
    return NavigationMode.Split;
  }
  return NavigationMode.Stack
}
```

#### 4. 三分栏（SideBarContainer + Navigation + 断点）

三分栏基于横向断点，动态控制导航栏的显示模式和侧边栏是否显示，实现三分栏布局。
具体方案：在不同横向断点下，动态控制SideBarContainer组件的showSideBar、sideBarWidth属性，和Navigation组件的mode、navBarWidth属性实现目标效果。

```typescript
SideBarContainer(new WidthBreakpointType(SideBarContainerType.Overlay, SideBarContainerType.Overlay,
  SideBarContainerType.Embed, SideBarContainerType.Embed).getValue(this.mainWindowInfo.widthBp)) {
  Column() {
    // ...
  }
  // ...

  Column() {
    Navigation(this.pathStack) {
      NavigationBarView({
        mainWindowInfo: this.mainWindowInfo,
        pageInfos: this.pageInfos,
        pathStack: this.pathStack,
        isShowingSidebar: this.isShowingSidebar,
        isTriView: true
      })
    }
    .width('100%')
    .height('100%')
    // 若未设置.title属性则需要设置.hideTitleBar(true)
    .hideTitleBar(true)
    .mode(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ? NavigationMode.Stack : NavigationMode.Split)
    .navBarWidth(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_MD ? '50%' : '30%')
    .navDestination(this.PageMap)
    .backgroundColor('#B8EEB2')
  }
  // ...
}
.showSideBar(this.isShowingSidebar)
.sideBarWidth(new WidthBreakpointType('80%', '50%', '20%', '20%').getValue(this.mainWindowInfo.widthBp))
```

#### 5. 三分栏典型场景——邮箱（账户/收件箱/详情）

在邮箱场景中，单栏状态下，默认展示收件箱页，当选择邮件对象后，展示邮件详情页。双栏和三栏状态下，右侧默认不展示邮件详情页，当选择邮件对象后，右侧展示邮件详情页。

邮箱分为三个层级目录：第一层为账户信息，第二层为收件箱（一个账户对应多条邮件），第三层为邮件详情。根据内容重要性，不同断点展示策略如下：
- **sm**: 单栏显示邮件详情
- **md**: 双栏显示收件箱 + 邮件详情
- **lg/xl**: 三栏显示账户信息 + 收件箱 + 邮件详情

具体方案：对SideBarContainer组件的showSideBar属性进行赋值，如果横向断点为lg或xl，则默认显示侧边栏，反之，则默认不显示。
```typescript
build() {
  GridRow() {
    GridCol({ span: { sm: 12, md: 12, lg: 12, xl: 12 } }) {
      SideBarContainer(new WidthBreakpointType(SideBarContainerType.Overlay, SideBarContainerType.Overlay,
        SideBarContainerType.Embed, SideBarContainerType.Embed).getValue(this.mainWindowInfo.widthBp)) {
        // Area A
        Column() {
          MailSideBar()
        }
        .width('100%')
        .height('100%')
        .backgroundColor($r('sys.color.gray_01'))

        // Area B+C
        Column() {
          Stack() {
            MailNavigation({
              mainWindowInfo: this.mainWindowInfo,
              pageInfos: this.pageInfos,
              pathStack: this.pathStack,
            })
              .margin({ top: 18 })
              .padding({ left: this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.left) })
            // ...
          }
        }
        .width('100%')
        .height('100%')
      }
      .showSideBar(this.isShowingSidebar)
      // ...
    }
  }
  .width('100%')
  .height('100%')
}
```

在SideBarContainer组件内容区中使用Navigation组件，对Navigation组件的mode属性进行赋值，如果断点为sm或xs，则为单栏，反之则为双栏。

```typescript
build() {
  Navigation(this.pathStack) {
    // ...
  }
  // 若未设置.title属性则需要设置.hideTitleBar(true)
  .hideTitleBar(true)
  .mode(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ? NavigationMode.Stack : this.notesNavMode)
  .navDestination(this.myRouter)
  // ...
}
```


#### 6. 三分栏典型场景——日历（单栏优先导航区）

在三分栏的单栏布局中，通常展示的重点是Navigation的内容区。但在某些场景下，内容区的优先级低于导航区，例如日历日程功能。在这种情况下，单栏布局会优先展示日历（即Navigation的导航区）。

日历日程分为三个层级：账户信息 → 日历 → 日程。与邮箱的区别在于，日历单栏时优先显示导航栏（日历），邮箱单栏时优先显示内容区（邮件详情）。

**关键实现**：在 `Navigation` 的 `onNavigationModeChange` 回调中处理：
- 单栏时：清空 `PathInfo` 路由，内容区不显示，实现只展示导航栏
- 双栏时：重新 push 路由参数，恢复内容区日程显示

```typescript
Row() {
  // ...

  if (this.mainWindowInfo.widthBp !== WidthBreakpoint.WIDTH_SM) {
    Column() {
      // ...
    }
    // ...
    .onClick(() => {
      if (this.navMode === NavigationMode.Split) {
        this.navMode = NavigationMode.Stack;
      } else if (this.navMode === NavigationMode.Stack && this.selectedItem.isTrip) {
        this.navMode = NavigationMode.Split;
      }
    })
  }
  // ...
Navigation(this.pathStack) {
  CalendarView({
    mainWindowInfo: this.mainWindowInfo,
    pathStack: this.pathStack,
  })
}
// 若未设置.title属性则需要设置.hideTitleBar(true)
.hideTitleBar(true)
.navDestination(this.pageMap)
.mode(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ? NavigationMode.Stack : this.navMode)
// ...
.onNavigationModeChange((mode: NavigationMode) => {
  if (this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM || mode === NavigationMode.Stack) {
    this.pathStack.clear();
  } else if (mode === NavigationMode.Split) {
    this.pathStack.pushPath({ name: this.selectedItem.date, param: this.selectedItem }, false);
  }
})
```

### 三、挪移布局 — `RESP-03`（2个场景）

挪移布局是指在空间充足时，通过调整组件的位置与展示方式，在左右布局与上下布局之间切换，用以展示更多内容或提高用户体验。常用的挪移布局包括插图和文字组合布局、底部/侧边导航。

> **UX 一致性原则**：挪移布局在切换左右/上下排列方式时，必须保证挪移前后组件的视觉布局和交互行为保持一致，避免因布局方向变化导致的 UX 差异。常见要点：
> - **高度/宽度填充对齐**：上下布局中组件根据内容自适应高度，切换为左右布局后，应确保组件高度占满父容器，与并列组件等高对齐。例如用户卡片在左右布局（lg/xl）下需设置 `.height('100%')`，避免卡片塌缩导致并列区域底部留白。

#### 1. 插图和文字组合布局（GridRow/GridCol + 断点）

插图和文字组合布局基于横向断点，设置组件所占不同的栅格数，实现左右布局与上下布局的切换。
具体方案：设置不同横向断点下，GridRow组件的columns、breakpoints属性，和GridCol组件的span属性实现目标效果。

> **GridCol 内嵌可滚动列表的高度约束陷阱**：当 GridCol 内部包含 List / WaterFlow / Scroll 等需要高度约束才能滚动的组件时，GridCol 自身必须有明确的高度约束，否则内部 List 的 `layoutWeight(1)` 不会生效，列表将无法滚动。
>
> **原因**：GridRow 内部采用 Flex 布局。当两个 GridCol 在 sm 断点垂直堆叠（各 span=4）时，GridCol 默认高度为内容自适应（`height: auto`），不会自动限制在 GridRow 可用高度内。此时内部 Column 的 `height('100%')` 会取父级（GridCol）的高度，而 GridCol 高度等于内容高度（无限撑开），List 无法获得有限约束，滚动失效。
>
> **解决方案**：对需要内部滚动的 GridCol 使用 `.layoutWeight(1)`，使其在垂直堆叠时占据剩余高度，而不是 `.height('100%')`。
>
> ```typescript
> // ❌ 错误：height('100%') 在垂直堆叠时无效，列表无法滚动
> GridRow({
>   columns: { sm: 4, md: 8, lg: 12, xl: 12 },
>   breakpoints: { value: ['320vp', '600vp', '840vp', '1440vp'] },
>   direction: GridRowDirection.Row
> }) {
>   GridCol({ span: { sm: 4, md: 4, lg: 4, xl: 4 } }) {
>     ProfileCard()  // 自适应高度
>   }
>   GridCol({ span: { sm: 4, md: 4, lg: 8, xl: 8 } }) {
>     PostListSection()  // 内部 List 用了 layoutWeight(1)
>   }
>   .height('100%')  // ❌ sm 垂直堆叠时，GridCol 高度=GridRow 高度=屏幕高度，超出可视区
> }
>
> // ✅ 正确：layoutWeight(1) 让 GridCol 在垂直堆叠时占满剩余空间
> GridRow({
>   columns: { sm: 4, md: 8, lg: 12, xl: 12 },
>   breakpoints: { value: ['320vp', '600vp', '840vp', '1440vp'] },
>   direction: GridRowDirection.Row
> }) {
>   GridCol({ span: { sm: 4, md: 4, lg: 4, xl: 4 } }) {
>     ProfileCard()
>   }
>   GridCol({ span: { sm: 4, md: 4, lg: 8, xl: 8 } }) {
>     PostListSection()
>   }
>   .layoutWeight(1)  // ✅ sm 时占 ProfileCard 之后的剩余高度，List 可滚动
> }
> ```
>
> **判断规则**：
> - GridCol 内部只有固定内容（图片、文字、按钮）→ 无需额外高度约束
> - GridCol 内部包含 List / Scroll / WaterFlow → 必须使用 `.layoutWeight(1)` 而非 `.height('100%')`
> - 此规则在 sm 断点（GridCol 垂直堆叠）下尤其关键；md/lg 断点（GridCol 左右并排）下两者效果等价，但 `layoutWeight(1)` 兼容所有场景

| 断点 | sm | md                    | lg |
|------|----|-----------------------|-----|
| 效果 | 4栅格，封面占4 + 列表占4（上下排列） | 8栅格，封面占4 + 列表占4（左右排列） | 12栅格，封面占4 + 列表占8（左右排列） |

> **适用场景**：也常用于页面顶部页签与搜索框的布局切换。

完整 GridRow 响应式栅格布局示例见 [GridRowExample.ets](../assets/GridRowExample.ets)，GridRow 断点配置示例见 [GridRowBreakpoints.ets](../assets/GridRowBreakpoints.ets)。

```typescript
GridRow({
  columns: { xs: 4, sm: 4, md: 8, lg: 12, xl: 12 },
  gutter: 0,
  breakpoints: { value: ['320vp', '600vp', '840vp', '1440vp']},
  direction: GridRowDirection.Row
}) {
  GridCol({
    span: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4 },
    offset: 0
  }) {
    // ...
  }
  .height(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ? this.getGridColHeight() : '100%')
  .padding({ top: this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) + 12})
  .backgroundColor('#AAD3F1')

  GridCol({
    span: { xs: 4, sm: 4, md: 4, lg: 8, xl: 8 },
    offset: 0
  }) {
    // ...
  }
  .backgroundColor(Color.Pink)
  .layoutWeight(1)
  .padding({ top: this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ? 0 :
    this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) })
}
```

#### 2. 底部/侧边导航（Tabs + 断点，xl/PC 可切 SideBarContainer）

底部/侧边导航基于横向断点，设置导航栏的位置与方向，实现上下布局与左右布局的切换。
具体方案: 设置不同横向断点下，Tabs组件的barPosition、vertical、barHeight、barWidth和barMode属性实现目标效果。

> **xl/PC 适配**：xl 断点或 PC/2in1 设备使用 `SideBarContainer` 替代 `Tabs`，结合 `@State` 和 `@Link` 装饰器同步当前选中的一级/二级目录索引。

```typescript
Tabs({
  barPosition: this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_LG ? BarPosition.Start : BarPosition.End
}) {
  TabContent() {
    TopTabView({
      pageInfos: this.pageInfos,
      mainWindowInfo: this.mainWindowInfo,
      firstLevelIndex: this.firstLevelIndex,
      tabData: this.tabData
    })
  }
  .tabBar(this.tabBuilder(this.firstTabList[0], 0))

  TabContent()
    .tabBar(this.tabBuilder(this.firstTabList[1], 1))

  TabContent()
    .tabBar(this.tabBuilder(this.firstTabList[2], 2))

  TabContent()
    .tabBar(this.tabBuilder(this.firstTabList[3], 3))
}
.barBackgroundColor('#CCF1F3F5')
.barWidth(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_LG ? 96 : '100%')
.barHeight(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_LG ? '100%' : 56 + this.getUIContext().px2vp(this.mainWindowInfo.AvoidNavigationIndicator?.bottomRect.height))
.barMode(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_LG ? BarMode.Scrollable : BarMode.Fixed,
  { nonScrollableLayoutStyle: LayoutStyle.ALWAYS_CENTER })
.barBackgroundBlurStyle(BlurStyle.COMPONENT_THICK)
.vertical(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_LG)
.onChange((index: number) => {
  this.firstLevelIndex = index;
})
```

> **⚠️ 高度陷阱注意事项**：
>
> 1. **barHeight('100%') 仅限 Tabs 组件内部使用**。若使用手动 Row/Column 实现侧边导航，
>    必须使用 `layoutWeight(1)` 而非 `height('100%')`，后者会包含系统状态栏区域导致溢出。
>
> 2. **layoutWeight vs height('100%') 选择规则**：
>    - 在 Row 内部横向排列的子组件：可用 `height('100%')`（高度由 Row 约束）
>    - 根容器或外层 Column 的子组件：必须用 `layoutWeight(1)`（避免包含系统栏区域）

**侧边导航项视觉规范**：

当导航切换为侧边模式（LG断点）时，每个导航项必须满足以下视觉要求：

| 属性 | 值 | 说明 |
|------|------|------|
| 导航项高度 | 64vp | 保证触摸目标足够大 |
| 图标尺寸 | 24×24vp | 与底部模式一致 |
| 文字标签 | 12fp，显示在图标下方 | 禁止只显示图标而不显示文字 |
| 间距 | Column({ space: 4 }) | 图标与文字间距 |
| 对齐方式 | justifyContent(FlexAlign.Center) | 内容垂直居中 |
| 整体排列 | 外层 Column justifyContent(FlexAlign.Center) | 所有导航项在侧边栏内垂直居中 |

**手动侧边栏布局示例**（适用于需要完全自定义侧边栏内容的场景）：

```typescript
// LG 断点：手动 Row + Column 侧边栏
Row() {
  // 侧边栏
  Column({ space: 8 }) {
    ForEach(this.tabs, (tab: TabItem) => {
      Column({ space: 4 }) {
        Image(tab.icon).width(24).height(24)
        Text(tab.label).fontSize(12)  // 必须包含文字标签
      }
      .width(96).height(64)
      .justifyContent(FlexAlign.Center)
    })
  }
  .width(96)
  .height('100%')  // 在 Row 内部使用 height('100%') 是安全的
  .justifyContent(FlexAlign.Center)  // 导航项垂直居中

  // 内容区
  Column() { /* ... */ }
  .layoutWeight(1)  // 用 layoutWeight 填充
  .height('100%')
}
.width('100%')
.layoutWeight(1)  // 根 Row 用 layoutWeight，不用 height('100%')
```

```typescript
// 通过侧边栏显示一级和二级导航
if ((this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_LG && deviceInfo.deviceType == "2in1") || this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_XL) {
  // Use SideBarContainer at XL breakpoint.
  SideBarContainer(SideBarContainerType.Embed) {
    // 一级和二级导航
    TabSideBarView({
      firstLevelIndex: this.firstLevelIndex,
      secondLevelIndex: this.secondLevelIndex,
      tabData: this.tabData,
      firstTabList: this.firstTabList
    })
    Column() {
      Row() {
        // ...
        Text(this.tabViewModel.getTabNameOfSecondLevel(this.tabViewModel.getTabNameOfFirstLevel(this.firstLevelIndex),
          this.secondLevelIndex))
          .fontSize('20fp')
          .fontWeight(700)
          .margin({
            left: 16,
          })
      }
      .padding({
        top: 60,
        bottom: 14,
      })
      VideoInfoView({
        mainWindowInfo: this.mainWindowInfo,
        firstLevelIndex: this.firstLevelIndex,
        secondLevelIndex: this.secondLevelIndex
      })
    }
    .alignItems(HorizontalAlign.Start)
  }
  .autoHide(false)
  .divider({ strokeWidth: 0.3 })
  .showControlButton(false)
  .sideBarWidth(240)
  .minSideBarWidth(240)
  .maxSideBarWidth(240)
} else {
  // ...
}
```

### 四、缩进布局 — `RESP-04`（1个场景）

缩进布局是指在空间充足时，组件居中展示并在两侧留白，通过调整内容的缩进来建立视觉层次结构，提高可读性和美观性。常用的缩进布局包括单列列表布局。

#### 1. 单列列表布局（GridRow/GridCol 的 span + offset）

单列列表布局基于横向断点，设置栅格子组件所占的栅格列数和偏移列数，实现缩进布局。
具体方案：设置不同横向断点下，GridRow组件的columns、breakpoints属性和GridCol组件的span、offset属性实现目标效果。

GridCol 偏移示例见 [GridColOffset.ets](../assets/GridColOffset.ets)。

```typescript
GridRow({
  columns: { xs: 4, sm: 4, md: 8, lg: 12, xl: 12 },
  gutter: 0,
  breakpoints: { value: ['320vp', '600vp', '840vp', '1440vp']},
  direction: GridRowDirection.Row
}) {
  GridCol({
    span: { xs: 4, sm: 4, md: 6, lg: 8, xl: 8 },
    offset: { xs: 0, sm: 0, md: 1, lg: 2, xl: 2 }
  }) {
    // ...
  }
  .width('100%')
  .height('100%')
}
```
