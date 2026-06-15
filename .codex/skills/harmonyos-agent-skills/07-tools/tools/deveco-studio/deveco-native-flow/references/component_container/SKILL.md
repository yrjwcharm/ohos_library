---
name: component_container
description: "HarmonyOS ArkTS 容器组件使用规范。包含 Column、Row、Stack、Flex、List、Grid、Scroll、Swiper、Tabs、Refresh、RelativeContainer 等布局容器组件。Use when: (1) 实现页面布局，(2) 实现列表滚动，(3) 实现层叠布局，(4) 实现网格布局，(5) 实现轮播切换，(6) 下拉刷新，(7) 上拉加载更多。Triggers: Column、Row、Stack、Flex、List、Grid、Scroll、Swiper、Tabs、Refresh、布局、容器、列表、网格、滚动、堆叠、轮播、标签页、下拉刷新、上拉加载。"
user-invocable: false
---

# 容器组件 (component_container)

本 skill 覆盖 HarmonyOS ArkTS **容器组件**的使用规范。详细规范见各 `references/《组件名》组件使用规范.md`，按需加载。

## 本分组组件

| 组件 | 规范文件 | 用途 |
|------|----------|------|
| Column | references/column组件使用规范.md | 纵向布局 |
| Row | references/row组件使用规范.md | 横向布局 |
| Stack | references/stack组件使用规范.md | 层叠布局 |
| Flex | references/flex组件使用规范.md | 弹性布局 |
| List | references/list组件使用规范.md | 列表容器 |
| Grid | references/grid组件使用规范.md | 网格容器 |
| Scroll | references/scroll组件使用规范.md | 滚动容器 |
| Swiper | references/swiper组件使用规范.md | 轮播容器 |
| Tabs | references/tabs组件使用规范.md | 标签页容器 |
| Refresh | references/refresh组件使用规范.md | 下拉刷新容器 |

## 何时读哪个文件

- 纵向布局 / 垂直排列 → `references/column组件使用规范.md`
- 横向布局 / 水平排列 → `references/row组件使用规范.md`
- 层叠布局 / 堆叠 → `references/stack组件使用规范.md`
- 弹性布局 / Flex → `references/flex组件使用规范.md`
- 列表 / 长列表 / ListItem → `references/list组件使用规范.md`
- 网格 / GridItem → `references/grid组件使用规范.md`
- 滚动 / Scroll → `references/scroll组件使用规范.md`
- 下拉刷新 / Refresh / 上拉加载 → `references/refresh组件使用规范.md`

## 快速索引

### Column 组件（纵向布局）

```typescript
Column({ space: 10 }) {
  Text('第一行')
  Text('第二行')
  Text('第三行')
}
.width('100%')
.height(200)
.alignItems(HorizontalAlign.Center)      // 水平居中
.justifyContent(FlexAlign.SpaceBetween)  // 垂直两端分布
```

**对齐属性**：
- `alignItems(value: HorizontalAlign)` - 子组件水平对齐
- `justifyContent(value: FlexAlign)` - 子组件垂直分布

**HorizontalAlign 枚举**：
| 值 | 说明 |
|----|------|
| Start | 起始对齐 |
| Center | 居中对齐 |
| End | 结束对齐 |

### Row 组件（横向布局）

```typescript
Row({ space: 10 }) {
  Text('左侧')
  Text('中间')
  Text('右侧')
}
.width('100%')
.height(50)
.justifyContent(FlexAlign.SpaceBetween)   // 水平两端分布
.alignItems(VerticalAlign.Center)         // 垂直居中
```

**对齐属性**：
- `alignItems(value: VerticalAlign)` - 子组件垂直对齐
- `justifyContent(value: FlexAlign)` - 子组件水平分布

**VerticalAlign 枚举**：
| 值 | 说明 |
|----|------|
| Top | 顶部对齐 |
| Center | 居中对齐 |
| Bottom | 底部对齐 |

### Stack 组件（层叠布局）

```typescript
Stack({ alignContent: Alignment.Bottom }) {
  // 底层
  Image($r('app.media.background'))
    .width('100%')
    .height(200)
  // 中层
  Text('标题')
    .fontSize(20)
  // 顶层
  Badge({ count: 5 }) {
    // ...
  }
}
.width('100%')
.height(200)
```

**Alignment 枚举**：
| 值 | 说明 |
|----|------|
| TopStart | 左上 |
| Top | 上中 |
| TopEnd | 右上 |
| Start | 左中 |
| Center | 居中 |
| End | 右中 |
| BottomStart | 左下 |
| Bottom | 下中 |
| BottomEnd | 右下 |

### List 组件（列表容器）

```typescript
List({ space: 10 }) {
  ForEach(this.dataList, (item: DataItem) => {
    ListItem() {
      Row() {
        Text(item.title)
        Text(item.desc)
      }
    }
  })
}
.width('100%')
.height('100%')
.listDirection(Axis.Vertical)  // 列表方向
.divider({ strokeWidth: 1, color: '#EEEEEE' })  // 分割线
.onScroll(() => {
  // 滚动事件
})
```

**常用属性**：
- `listDirection(value: Axis)` - 列表方向
- `divider(value: DividerStyle)` - 分割线样式
- `scrollBar(value: BarState)` - 滚动条状态
- `edgeEffect(value: EdgeEffect)` - 边缘效果

### Scroll 组件（滚动容器）

```typescript
Scroll() {
  Column() {
    // 内容区域
    ForEach(this.items, (item: Item) => {
      Text(item.title)
    })
  }
}
.width('100%')
.height(300)
.scrollable(ScrollDirection.Vertical)  // 滚动方向
.scrollBar(BarState.Auto)              // 滚动条
.edgeEffect(EdgeEffect.Spring)         // 边缘弹簧效果
.onScroll((xOffset: number, yOffset: number) => {
  // 滚动回调
})
```

**ScrollDirection 枚举**：
| 值 | 说明 |
|----|------|
| Vertical | 垂直滚动 |
| Horizontal | 水平滚动 |
| None | 不可滚动 |
| Auto | 自动判断 |

### Flex 组件（弹性布局）

```typescript
Flex({
  direction: FlexDirection.Row,
  wrap: FlexWrap.Wrap,
  justifyContent: FlexAlign.SpaceBetween,
  alignItems: ItemAlign.Center
}) {
  Text('项目1')
  Text('项目2')
  Text('项目3')
}
.width('100%')
```

**FlexDirection 枚举**：
| 值 | 说明 |
|----|------|
| Row | 水平排列 |
| RowReverse | 水平反向排列 |
| Column | 垂直排列 |
| ColumnReverse | 垂直反向排列 |

**FlexWrap 枚举**：
| 值 | 说明 |
|----|------|
| NoWrap | 不换行 |
| Wrap | 换行 |
| WrapReverse | 反向换行 |

**FlexAlign 枚举**（justifyContent）：
| 值 | 说明 |
|----|------|
| Start | 起始对齐 |
| Center | 居中 |
| End | 结束对齐 |
| SpaceBetween | 两端分布 |
| SpaceAround | 环绕分布 |
| SpaceEvenly | 均匀分布 |

## FlexAlign 对齐速查

```
Start:      |■■■■■■|······|
Center:     |···■■■■■■··|
End:        |······|■■■■■■|
SpaceBetween: |■■■|··|■■■|··|■■■|
SpaceAround:  |·■■■·|·■■■·|·■■■·|
SpaceEvenly:  |··■■■··|··■■■··|··■■■··|
```

## 通用约定

- 容器组件继承自 `CommonMethod`，支持通用属性
- 使用 `space` 参数设置子组件间距
- 使用 `alignItems` 设置交叉轴对齐
- 使用 `justifyContent` 设置主轴对齐
- 列表类组件优先使用 List + LazyForEach 实现性能优化