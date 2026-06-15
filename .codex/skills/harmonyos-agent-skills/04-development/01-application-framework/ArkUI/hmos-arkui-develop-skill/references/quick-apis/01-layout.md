## 1. 布局容器


> **组件索引**：`Row`、`Column`、`Flex`、`List`、`ListItem`、`ListItemGroup`、`Grid`、`GridRow`、`GridCol`、`WaterFlow`、`Scroll`、`Tabs`、`TabContent`、`Swiper`、`Stack`、`RelativeContainer`、`SideBarContainer`、`Panel`、`Refresh`、`Badge`、`Counter`、`AlphabetIndexer`、`其他容器速查`

### Row

行容器，子组件水平排列。

**构造：** `Row(options?: RowOptions)`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| space | string \| number | 否 | — | 子元素水平间距 |

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .alignItems | `.alignItems(value: VerticalAlign)` | Center | 垂直对齐 |
| .justifyContent | `.justifyContent(value: FlexAlign)` | Start | 水平排列方式 |
| .reverse | `.reverse(isReversed: boolean)` | false | 反转子元素顺序 |

---

### Column

列容器，子组件垂直排列。

**构造：** `Column(options?: ColumnOptions)`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| space | string \| number \| Resource | 否 | — | 子元素垂直间距 |

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .alignItems | `.alignItems(value: HorizontalAlign)` | Center | 水平对齐 |
| .justifyContent | `.justifyContent(value: FlexAlign)` | Start | 垂直排列方式 |
| .reverse | `.reverse(isReversed: boolean)` | false | 反转子元素顺序 |

---

### Flex

弹性布局容器。

**构造：** `Flex(value?: FlexOptions)`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| direction | FlexDirection | 否 | Row | 主轴方向 |
| wrap | FlexWrap | 否 | NoWrap | 是否换行 |
| justifyContent | FlexAlign | 否 | Start | 主轴对齐 |
| alignItems | ItemAlign | 否 | Start | 交叉轴对齐 |
| alignContent | FlexAlign | 否 | Start | 多行对齐 |
| space | FlexSpaceOptions | 否 | — | API 12+，`{main: LengthMetrics, cross: LengthMetrics}`，LengthMetrics 需从 `@kit.ArkUI` import |

---

### List

列表容器，支持懒加载和滚动。

**构造：** `List(options?: ListOptions)`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| initialIndex | number | 否 | 0 | 初始显示项索引 |
| space | number \| string | 否 | 0 | 列表项间距 |
| scroller | Scroller | 否 | — | 滚动控制器 |

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .listDirection | `.listDirection(value: Axis)` | Vertical | 列表方向 |
| .divider | `.divider(value: ListDividerOptions \| null)` | — | 分割线 `{strokeWidth, color, startMargin, endMargin}` |
| .scrollBar | `.scrollBar(value: BarState)` | Auto | 滚动条状态 |
| .cachedCount | `.cachedCount(value: number)` | 0 | 预加载项数 |
| .lanes | `.lanes(value: number \| LengthMetrics)` | 1 | 列数 |
| .edgeEffect | `.edgeEffect(value: EdgeEffect, options?)` | Spring | 边缘效果 |
| .chainAnimation | `.chainAnimation(value: boolean)` | false | API 12+ 联动动画 |
| .multiSelectable | `.multiSelectable(value: boolean)` | false | 鼠标多选 |
| .sticky | `.sticky(value: StickyStyle)` | None | 吸顶模式 |
| .nestedScroll | `.nestedScroll(value: NestedScrollOptions)` | — | 嵌套滚动 |

**事件：**

| 事件 | 签名 | 说明 |
|------|------|------|
| .onIndexChange | `.onIndexChange(event: (index: number) => void)` | 列表滚动触发的索引变化 |
| .onScroll | `.onScroll(event: (scrollOffset: number, scrollState: ScrollState) => void)` | 列表滚动事件，ScrollState 枚举：Idle / Scroll / Fling |
| .onScrollIndex | `.onScrollIndex(event: (start: number, end: number) => void)` | 可见区域索引变化 |
| .onReachStart | `.onReachStart(event: () => void)` | 到达起始位置 |
| .onReachEnd | `.onReachEnd(event: () => void)` | 到达末尾 |

---

### ListItem

列表项组件，作为 List 的子组件。

**构造：** `ListItem(options?: ListItemOptions)`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| swipeAction | SwipeActionOptions | 否 | — | 滑动操作配置 |
| style | ListItemStyle | 否 | NONE | API 10+ 卡片样式枚举（NONE / CARD） |

**SwipeActionOptions：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| start | CustomBuilder \| SwipeActionItem | 否 | 向右滑动时左侧露出的组件 |
| end | CustomBuilder \| SwipeActionItem | 否 | 向左滑动时右侧露出的组件 |
| edgeEffect | SwipeEdgeEffect | 否 | Spring（可继续滑）/ None（到边界停） |
| onOffsetChange | (offset: number) => void | 否 | API 11+ 滑动偏移变化回调 |

**SwipeActionItem（API 10+）：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| builder | CustomBuilder | 是 | 划出组件内容 |
| actionAreaDistance | Length | 否 | 长距删除阈值，默认 56vp |
| onAction | () => void | 否 | 进入删除区后松手触发 |
| onEnterActionArea | () => void | 否 | 进入删除区时触发 |
| onExitActionArea | () => void | 否 | 退出删除区时触发 |

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .swipeAction | `.swipeAction(value: SwipeActionOptions)` | — | 滑动删除/操作 |

---

### ListItemGroup

列表项分组。

**构造：** `ListItemGroup(options?: ListItemGroupOptions)`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| header | CustomBuilder | 否 | — | 分组头部 |
| footer | CustomBuilder | 否 | — | 分组尾部 |
| space | number \| string | 否 | 0 | 列表项间距 |

> **注意：ListItemGroupOptions 没有 `divider` 属性。** 分割线通过 List 的 `.divider()` 统一设置，不能在 ListItemGroup 构造器中传入。

---

### Grid

网格容器。

**构造：** `Grid(scroller?: Scroller, layoutOptions?: GridLayoutOptions)`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| scroller | Scroller | 否 | — | 滚动控制器 |
| layoutOptions | GridLayoutOptions | 否 | — | 布局选项 |

**GridLayoutOptions：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| regularSize | [number, number] | 否 | [1, 1] | 规则项占位尺寸 |
| irregularIndexes | number[] | 否 | — | 不规则项索引 |
| onGetIrregularSizeByIndex | (index) => [number, number] | 否 | — | 获取不规则项尺寸 |
| onGetRectByIndex | (index) => [number, number, number, number] | 否 | — | API 11+ |

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .columnsTemplate | `.columnsTemplate(value: string)` | — | 列模板，如 '1fr 1fr 2fr' |
| .rowsTemplate | `.rowsTemplate(value: string)` | — | 行模板 |
| .columnsGap | `.columnsGap(value: Length)` | 0 | 列间距 |
| .rowsGap | `.rowsGap(value: Length)` | 0 | 行间距 |
| .scrollBar | `.scrollBar(value: BarState)` | Auto | 滚动条 |
| .cachedCount | `.cachedCount(value: number)` | 0 | 缓存项数 |
| .editMode | `.editMode(value: boolean)` | false | 编辑模式 |
| .edgeEffect | `.edgeEffect(value: EdgeEffect)` | Spring | 边缘效果 |

**事件：**

| 事件 | 签名 | 说明 |
|------|------|------|
| .onScrollIndex | `.onScrollIndex(event: (first, last) => void)` | 可见区域索引变化 |
| .onItemDragStart | `.onItemDragStart(event: (event: ItemDragInfo, itemIndex: number) => CustomBuilder)` | 拖拽开始，返回自定义拖拽预览 |
| .onItemDrop | `.onItemDrop(event: (event, itemIndex) => void)` | 拖拽释放 |

---

### GridRow

响应式网格行容器。

**构造：** `GridRow(option?: GridRowOptions)`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| columns | number \| GridRowColumnOption | 否 | 12 | 列数 |
| gutter | Length \| GutterOption | 否 | 0 | 间距，GutterOption：`{ x?: Length \| GridRowSizeOption, y?: Length \| GridRowSizeOption }`（x=水平间距，y=垂直间距，支持响应式断点） |
| breakpoints | BreakPoints | 否 | {value:["320vp","600vp","840vp"]} | 断点 |
| direction | GridRowDirection | 否 | Row | 排列方向 |

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .alignItems | `.alignItems(value: ItemAlign)` | Start | 对齐方式 |
| .onBreakpointChange | `.onBreakpointChange(callback: (breakpoints) => void)` | — | 断点变化回调 |

---

### GridCol

响应式网格列容器，作为 GridRow 的子组件。

**构造：** `GridCol(option?: GridColOptions)`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| span | number \| GridColColumnOption | 否 | 1 | 占列数 |
| offset | number \| GridColColumnOption | 否 | 0 | 偏移列数 |
| order | number \| GridColColumnOption | 否 | 0 | 排列顺序 |

---

### WaterFlow

瀑布流容器。

**构造：** `WaterFlow(options?: WaterFlowOptions)`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| footer | CustomBuilder | 否 | — | 尾部组件 |
| scroller | Scroller | 否 | — | 滚动控制器 |
| sections | WaterFlowSections | 否 | — | API 12+ 分区配置 |
| layoutMode | WaterFlowLayoutMode | 否 | — | 布局模式 |

> **注意：不存在 WaterFlowController。** WaterFlow 不接受 controller 参数，不要尝试 import 或创建 WaterFlowController。

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .columnsTemplate | `.columnsTemplate(value: string)` | — | 列模板 |
| .rowsTemplate | `.rowsTemplate(value: string)` | — | 行模板 |
| .columnsGap | `.columnsGap(value: Length)` | 0 | 列间距 |
| .rowsGap | `.rowsGap(value: Length)` | 0 | 行间距 |
| .layoutMode | `.layoutMode(value: WaterFlowLayoutMode)` | — | 布局模式 |
| .cachedCount | `.cachedCount(value: number)` | 0 | 缓存数量 |

---

### Scroll

滚动容器。

**构造：** `Scroll(scroller?: Scroller)`

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .scrollable | `.scrollable(value: ScrollDirection)` | Vertical | 滚动方向 |
| .scrollBar | `.scrollBar(value: BarState)` | Auto | 滚动条 |
| .scrollBarColor | `.scrollBarColor(value: ResourceColor)` | — | 滚动条颜色 |
| .scrollBarWidth | `.scrollBarWidth(value: number)` | 4vp | 滚动条宽度 |
| .edgeEffect | `.edgeEffect(value: EdgeEffect, options?)` | Spring | 边缘效果 |
| .scrollSnap | `.scrollSnap(value: ScrollSnapOptions)` | — | API 10+ 对齐 snapping（注意：`SnapAlign`/`SnapPagination` 类型不存在。如果需要 snap 效果，建议使用 List 配合 .chainScroll 或查询最新文档确认替代方案。） |
| .nestedScroll | `.nestedScroll(value: NestedScrollOptions)` | — | API 10+ 嵌套滚动 |
| .enablePaging | `.enablePaging(value: boolean)` | false | API 11+ 分页滚动 |
| .friction | `.friction(value: number \| Resource)` | — | API 10+ 摩擦系数 |
| .enableScrollInteraction | `.enableScrollInteraction(value: boolean)` | true | 是否响应滚动 |

**事件：**

| 事件 | 签名 | 说明 |
|------|------|------|
| .onScroll | `.onScroll(event: (offset, state) => void)` | 滚动事件 |
| .onScrollEdge | `.onScrollEdge(event: (side: Edge) => void)` | 到达边缘 |
| .onScrollStop | `.onScrollStop(event: () => void)` | 滚动停止 |

---

### Tabs

标签页容器。

**构造：** `Tabs(options?: TabsOptions)`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| barPosition | BarPosition | 否 | Start | 标签栏位置 |
| index | number | 否 | 0 | 初始页签索引 |
| controller | TabsController | 否 | — | 页签控制器 |

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .vertical | `.vertical(value: boolean)` | false | 是否竖向 |
| .scrollable | `.scrollable(value: boolean)` | true | 是否可滑动 |
| .barMode | `.barMode(value: BarMode, options?)` | Fixed | 标签栏模式 |
| .barWidth | `.barWidth(value: Length)` | — | 标签栏宽度 |
| .barHeight | `.barHeight(value: Length)` | — | 标签栏高度 |
| .animationDuration | `.animationDuration(value: number)` | 400 | 切换动画时长 |
| .divider | `.divider(value: DividerStyle \| null)` | — | 分割线 |

**事件：**

| 事件 | 签名 | 说明 |
|------|------|------|
| .onChange | `.onChange(event: (index: number) => void)` | 页签切换 |
| .onTabBarClick | `.onTabBarClick(event: (index: number) => void)` | 标签栏点击 |

---

### TabContent

标签页内容，作为 Tabs 子组件。

**构造：** `TabContent()`

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .tabBar | `.tabBar(value: ResourceStr \| CustomBuilder \| SubTabBarStyle \| BottomTabBarStyle)` | — | 标签栏内容 |

---

### Swiper

轮播容器。

**构造：** `Swiper(controller?: SwiperController)` — SwiperController 是全局类型，不需要 import

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .index | `.index(value: number)` | 0 | 初始索引 |
| .autoPlay | `.autoPlay(value: boolean)` | false | 自动播放 |
| .interval | `.interval(value: number)` | 3000 | 自动播放间隔(ms) |
| .indicator | `.indicator(value: DotIndicator \| DigitIndicator \| boolean)` | true | 指示器 |
| .loop | `.loop(value: boolean)` | true | 是否循环 |
| .vertical | `.vertical(value: boolean)` | false | 是否竖向 |
| .itemSpace | `.itemSpace(value: Length)` | 0 | 项间距 |
| .displayMode | `.displayMode(value: SwiperDisplayMode)` | Stretch | 显示模式 |
| .displayCount | `.displayCount(value: number \| SwiperAutoFill)` | 1 | 显示数量 |
| .effectMode | `.effectMode(value: EdgeEffect)` | Spring | 边缘效果 |
| .nestedScroll | `.nestedScroll(value: SwiperNestedScrollMode)` | — | API 11+ 嵌套滚动 |
| .disableSwipe | `.disableSwipe(value: boolean)` | false | 禁用滑动 |

> **DotIndicator 构造**：`new DotIndicator().itemWidth(n).itemHeight(n).selectedItemWidth(n).selectedItemHeight(n).color(color).selectedColor(color).maxDisplayCount(n)`
> **DigitIndicator 构造**：`new DigitIndicator().fontColor(color).selectedFontColor(color).digitFont({size, weight}).selectedDigitFont({size, weight})`

**事件：**

| 事件 | 签名 | 说明 |
|------|------|------|
| .onChange | `.onChange(event: (index: number) => void)` | 页面切换 |
| .onAnimationStart | `.onAnimationStart(event: (index, targetIndex) => void)` | 切换动画开始 |
| .onAnimationEnd | `.onAnimationEnd(event: (index) => void)` | 切换动画结束 |

---

### Stack

层叠容器。

**构造：** `Stack(options?: StackOptions)`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| alignContent | Alignment | 否 | Center | 子组件对齐方式 |

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .alignContent | `.alignContent(value: Alignment)` | Center | 子组件对齐方式 |

---

### RelativeContainer

相对布局容器。

**构造：** `RelativeContainer()`

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .guideLine | `.guideLine(value: Array<GuideLineStyle>)` | — | API 12+ 参考线 |
| .barrier | `.barrier(value: Array<BarrierStyle>)` | — | API 12+ 屏障 |

### RelativeContainer 核心用法

子组件通过 `.alignRules()` 定位，必须设置 `.id()`。

```typescript
RelativeContainer() {
  Text('child1')
    .alignRules({
      top: { anchor: '__container__', align: VerticalAlign.Top },
      left: { anchor: '__container__', align: HorizontalAlign.Start }
    })
    .id('child1')

  Text('child2')
    .alignRules({
      top: { anchor: 'child1', align: VerticalAlign.Bottom },
      left: { anchor: '__container__', align: HorizontalAlign.Start }
    })
    .id('child2')
}
```

- `anchor: '__container__'` 表示以容器为锚点
- `anchor: 'childId'` 表示以指定 id 的子组件为锚点
- align 取值：水平方向用 `HorizontalAlign.Start/Center/End`，垂直方向用 `VerticalAlign.Top/Center/Bottom`
- 可选方向：top, bottom, left, right, middle(水平), center(垂直)
- bias 偏移：`bias: { horizontal: 0.3, vertical: 0.5 }`（在两个锚点间偏移，0=靠起始锚点，1=靠结束锚点）
- margin 含义特殊：表示到该方向锚点的距离

---

### SideBarContainer

侧边栏容器。

**构造：** `SideBarContainer(type?: SideBarContainerType)`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| type | SideBarContainerType | 否 | Embed | 侧边栏类型 |

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .showSideBar | `.showSideBar(value: boolean)` | true | 显示侧边栏 |
| .controlButton | `.controlButton(value: ButtonStyle)` | — | 控制按钮样式，ButtonStyle：`{ left?: number, top?: number, width?: number, height?: number, icons?: { shown: ResourceStr, hidden: ResourceStr, switching?: ResourceStr } }` |
| .sideBarWidth | `.sideBarWidth(value: Length)` | 240vp | 侧边栏宽度 |
| .minSideBarWidth | `.minSideBarWidth(value: Length)` | — | 最小宽度 |
| .maxSideBarWidth | `.maxSideBarWidth(value: Length)` | 280vp | 最大宽度 |
| .showControlButton | `.showControlButton(value: boolean)` | true | 显示控制按钮 |
| .autoHide | `.autoHide(value: boolean)` | true | 自动隐藏 |
| .sideBarPosition | `.sideBarPosition(value: SideBarPosition)` | Start | 侧边栏位置 |

**事件：**

| 事件 | 签名 | 说明 |
|------|------|------|
| .onChange | `.onChange(event: (value: boolean) => void)` | 侧边栏显隐变化 |

---

### Panel

弹出面板。

**构造：** `Panel(show: boolean)`

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .type | `.type(value: PanelType)` | Foldable | 面板类型 |
| .mode | `.mode(value: PanelMode)` | Mini | 面板模式 |
| .dragBar | `.dragBar(value: boolean)` | true | 拖拽条 |
| .fullHeight | `.fullHeight(value: number \| string)` | — | 全屏高度 |
| .halfHeight | `.halfHeight(value: number \| string)` | — | 半屏高度 |
| .miniHeight | `.miniHeight(value: number \| string)` | 48vp | 迷你高度 |
| .show | `.show(value: boolean)` | — | 控制显隐 |
| .backgroundMask | `.backgroundMask(value: ResourceColor)` | — | 背景遮罩 |

**事件：**

| 事件 | 签名 | 说明 |
|------|------|------|
| .onChange | `.onChange(event: (width, height, mode) => void)` | 面板状态变化 |
| .onHeightChange | `.onHeightChange(event: (value: number) => void)` | 高度变化 |

---

### Refresh

下拉刷新容器。

**构造：** `Refresh(value: RefreshOptions)`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| refreshing | boolean | 是 | — | 刷新状态，支持 $$ 绑定 |
| builder | CustomBuilder | 否 | — | API 10+ 自定义刷新组件 |
| refreshingContent | ComponentContent | 否 | — | API 12+ 刷新内容 |

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .refreshOffset | `.refreshOffset(value: number)` | 64vp | API 12+ 触发刷新偏移 |
| .pullToRefresh | `.pullToRefresh(value: boolean)` | true | API 12+ 是否下拉触发 |
| .pullDownRatio | `.pullDownRatio(value: number)` | — | API 12+ 下拉比率 |

**事件：**

| 事件 | 签名 | 说明 |
|------|------|------|
| .onStateChange | `.onStateChange(event: (state: RefreshStatus) => void)` | 刷新状态变化 |
| .onRefreshing | `.onRefreshing(event: () => void)` | 刷新触发 |
| .onOffsetChange | `.onOffsetChange(event: (offset: number) => void)` | 偏移变化 |

---

### Badge

标记组件。

> **注意：** ① `style` 是必填参数，必须包含 `{ badgeSize, badgeColor }`。② `count` 和 `value` **二选一**，不能同时传入。数字型用 `count`，文字型用 `value`。

**构造 (数字型)：** `Badge(value: BadgeParamWithNumber)`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| count | number | 是 | — | 计数 |
| maxCount | number | 否 | 99 | 最大计数 |
| position | BadgePosition \| Position | 否 | RightTop | 位置 |
| style | BadgeStyle | 是 | — | 样式 |

**构造 (文字型)：** `Badge(value: BadgeParamWithString)`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| value | ResourceStr | 是 | — | 显示文字 |
| position | BadgePosition \| Position | 否 | RightTop | 位置 |
| style | BadgeStyle | 是 | — | 样式 |

**BadgeStyle：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| color | ResourceColor | 否 | White | 文字颜色 |
| fontSize | number \| string | 否 | 10 | 字号 |
| badgeSize | number \| string | 否 | 16 | 徽标尺寸 |
| badgeColor | ResourceColor | 否 | #FA2A2D | 徽标颜色 |
| fontWeight | FontWeight \| number \| string | 否 | FontWeight.Medium | 字重 |
| borderColor | ResourceColor | 否 | — | 边框颜色 |
| borderWidth | Length | 否 | 1 | 边框宽度 |

---

### Counter

简单计数器。

**构造：** `Counter()`

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .enableInc | `.enableInc(value: boolean)` | true | 允许增加 |
| .enableDec | `.enableDec(value: boolean)` | true | 允许减少 |

**事件：**

| 事件 | 签名 | 说明 |
|------|------|------|
| .onInc | `.onInc(event: () => void)` | 增加回调 |
| .onDec | `.onDec(event: () => void)` | 减少回调 |

---

### AlphabetIndexer

字母索引。

**构造：** `AlphabetIndexer(options: AlphabetIndexerOptions)`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| arrayValue | Array\<string\> | 是 | — | 索引数组 |
| selected | number | 是 | — | 选中索引，支持 $$ |

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .color | `.color(value: ResourceColor)` | — | 文字颜色 |
| .selectedColor | `.selectedColor(value: ResourceColor)` | — | 选中颜色 |
| .popupColor | `.popupColor(value: ResourceColor)` | — | 弹出颜色 |
| .usingPopup | `.usingPopup(value: boolean)` | false | 是否使用弹出 |
| .selectedFont | `.selectedFont(value: Font)` | — | 选中字体 |
| .popupFont | `.popupFont(value: Font)` | — | 弹出字体 |
| .font | `.font(value: Font)` | — | 字体 |
| .itemSize | `.itemSize(value: number \| string)` | 24vp | 索引项尺寸 |

**事件：**

| 事件 | 签名 | 说明 |
|------|------|------|
| .onSelect | `.onSelect(event: (index: number) => void)` | 选中 |
| .onRequestPopupData | `.onRequestPopupData(event: (index) => Array\<string\>)` | 请求弹出数据 |

---

### 其他容器速查

| 组件 | 构造签名 | 核心属性/事件 |
|------|---------|-------------|
| **Hyperlink** | `Hyperlink(address: string\|Resource, content?: string\|Resource)` | `.color(ResourceColor)` |
| **FolderStack** | `FolderStack(options?: {upperItems?: string[]})` | `.alignContent()` `.enableAnimation()` `.autoHalfFold()` `.onFoldStateChange()` |
| **NodeContainer** | `NodeContainer(controller: NodeController)` | — |

---
