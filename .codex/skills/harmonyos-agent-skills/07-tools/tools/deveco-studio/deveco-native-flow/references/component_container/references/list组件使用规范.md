# List 组件使用规范

## 概述

List 是高性能列表容器组件，支持垂直/水平滚动、懒加载、分组等功能。

## 接口

```typescript
List(value?: { space?: number | string, initialIndex?: number, groupIndex?: number }): ListAttribute
```

**参数说明**：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| space | number \| string | 否 | 列表项间距 |
| initialIndex | number | 否 | 初始显示项索引 |
| groupIndex | number | 否 | 初始分组索引 |

## 子组件

List 的子组件必须是 ListItem 或 ListItemGroup。

```typescript
List() {
  ListItem() {
    // 列表项内容
  }

  ListItemGroup() {
    // 列表分组
  }
}
```

## 属性

### 列表方向

| 属性 | 参数类型 | 说明 |
|------|----------|------|
| listDirection(value: Axis) | Axis | 列表排列方向 |

**Axis 枚举**：

| 值 | 说明 |
|----|------|
| Vertical | 垂直方向（默认） |
| Horizontal | 水平方向 |

### 滚动相关

| 属性 | 参数类型 | 说明 |
|------|----------|------|
| scrollBar(value: BarState) | BarState | 滚动条状态 |
| scrollBarColor(value: ResourceColor) | ResourceColor | 滚动条颜色 |
| scrollBarWidth(value: Length) | Length | 滚动条宽度 |
| edgeEffect(value: EdgeEffect) | EdgeEffect | 边缘滑动效果 |
| chainAnimationOptions(value: ChainAnimationOptions) | ChainAnimationOptions | 链式动画选项 |

**BarState 枚举**：

| 值 | 说明 |
|----|------|
| Off | 始终不显示 |
| On | 始终显示 |
| Auto | 自动显示/隐藏 |

**EdgeEffect 枚举**：

| 值 | 说明 |
|----|------|
| Spring | 弹簧效果 |
| Fade | 淡化效果 |
| None | 无效果 |

### 分割线

| 属性 | 参数类型 | 说明 |
|------|----------|------|
| divider(value: DividerStyle) | DividerStyle | 分割线样式 |

**DividerStyle 接口**：

```typescript
interface DividerStyle {
  strokeWidth: Length;      // 分割线宽度
  color?: ResourceColor;    // 分割线颜色
  startMargin?: Length;     // 起始边距
  endMargin?: Length;       // 结束边距
}
```

### 列表项对齐

| 属性 | 参数类型 | 说明 |
|------|----------|------|
| lanes(value: number) | number | 列数 |
| laneMinLength(value: Length) | Length | 最小宽度 |
| laneMaxLength(value: Length) | Length | 最大宽度 |
| alignListItem(value: ListItemAlign) | ListItemAlign | 列表项对齐 |

**ListItemAlign 枚举**：

| 值 | 说明 |
|----|------|
| Start | 起始对齐 |
| Center | 居中对齐 |
| End | 结束对齐 |

## 事件

| 事件 | 参数 | 说明 |
|------|------|------|
| onScroll(callback: (scrollState: ScrollState) => void) | ScrollState | 滚动事件回调 |
| onScrollIndex(callback: (start: number, end: number) => void) | start, end | 可见项索引变化 |
| onReachStart(callback: () => void) | - | 到达起始位置 |
| onReachEnd(callback: () => void) | - | 到达结束位置 |
| onItemDelete(callback: (index: number) => void) | index | 列表项删除 |

**ScrollState 枚举**：

| 值 | 说明 |
|----|------|
| Idle | 空闲状态 |
| Scroll | 滚动中 |
| Fling | 惯性滚动 |

## 使用示例

### 基础列表

```typescript
@Entry
@Component
struct BasicList {
  private data: string[] = ['项目 1', '项目 2', '项目 3', '项目 4', '项目 5']

  build() {
    List({ space: 10 }) {
      ForEach(this.data, (item: string, index: number) => {
        ListItem() {
          Text(item)
            .width('100%')
            .height(60)
            .fontSize(16)
            .textAlign(TextAlign.Center)
            .backgroundColor('#F0F0F0')
            .borderRadius(8)
        }
      })
    }
    .width('100%')
    .height(300)
    .padding({ left: 16, right: 16 })
  }
}
```

### 横向列表

```typescript
List({ space: 10 }) {
  ForEach(this.images, (img: Resource) => {
    ListItem() {
      Image(img)
        .width(120)
        .height(90)
        .objectFit(ImageFit.Cover)
        .borderRadius(8)
    }
  })
}
.listDirection(Axis.Horizontal)
.width('100%')
.height(100)
.padding({ left: 16, right: 16 })
```

### 带分割线的列表

```typescript
List({ space: 0 }) {
  ForEach(this.items, (item: Item) => {
    ListItem() {
      Row() {
        Text(item.title)
        Blank()
        Text('>')
          .fontColor('#999999')
      }
      .width('100%')
      .height(50)
      .padding({ left: 16, right: 16 })
    }
  })
}
.divider({
  strokeWidth: 1,
  color: '#EEEEEE',
  startMargin: 16,
  endMargin: 16
})
```

### 多列列表

```typescript
List({ space: 10 }) {
  ForEach(this.gridData, (item: GridItem) => {
    ListItem() {
      Column() {
        Image(item.icon)
          .width(48)
          .height(48)
        Text(item.name)
          .fontSize(12)
          .margin({ top: 8 })
      }
      .width('100%')
      .padding(10)
      .backgroundColor('#F5F5F5')
      .borderRadius(8)
    }
  })
}
.lanes(4)  // 4列
.width('100%')
.padding(10)
```

### 分组列表

```typescript
@Entry
@Component
struct GroupedList {
  private groups = [
    { title: 'A', items: ['Apple', 'Ant'] },
    { title: 'B', items: ['Banana', 'Ball'] },
    { title: 'C', items: ['Cat', 'Car'] }
  ]

  build() {
    List() {
      ForEach(this.groups, (group: Group) => {
        ListItemGroup({ header: this.groupHeader(group.title) }) {
          ForEach(group.items, (item: string) => {
            ListItem() {
              Text(item)
                .width('100%')
                .height(44)
                .padding({ left: 20 })
            }
          })
        }
      })
    }
    .width('100%')
    .height('100%')
  }

  @Builder
  groupHeader(title: string) {
    Text(title)
      .width('100%')
      .height(36)
      .fontSize(16)
      .fontWeight(FontWeight.Bold)
      .backgroundColor('#F0F0F0')
      .padding({ left: 16 })
  }
}
```

### 下拉刷新 / 上拉加载

```typescript
@Entry
@Component
struct RefreshList {
  @State data: string[] = []
  @State refreshing: boolean = false

  aboutToAppear() {
    this.loadData()
  }

  build() {
    Refresh({ refreshing: $$this.refreshing }) {
      List({ space: 10 }) {
        ForEach(this.data, (item: string) => {
          ListItem() {
            Text(item)
              .width('100%')
              .height(60)
              .backgroundColor('#F5F5F5')
              .borderRadius(8)
              .textAlign(TextAlign.Center)
          }
        })

        // 加载更多
        ListItem() {
          if (this.hasMore) {
            LoadingProgress()
              .width(24)
              .height(24)
          }
        }
        .onAppear(() => {
          this.loadMore()
        })
      }
      .width('100%')
      .height('100%')
    }
    .onRefreshing(() => {
      this.refreshing = true
      this.refresh()
    })
  }

  private refresh() {
    setTimeout(() => {
      this.data = [] // 重置数据
      this.loadData()
      this.refreshing = false
    }, 1000)
  }

  private loadMore() {
    // 加载更多数据
  }
}
```

## 性能优化

### 使用 LazyForEach

```typescript
class MyDataSource implements IDataSource {
  private dataArray: DataItem[] = []

  totalCount(): number {
    return this.dataArray.length
  }

  getData(index: number): DataItem {
    return this.dataArray[index]
  }

  registerDataChangeListener(listener: DataChangeListener): void {
    // 注册监听器
  }

  unregisterDataChangeListener(listener: DataChangeListener): void {
    // 注销监听器
  }
}

@Entry
@Component
struct LazyList {
  private dataSource: MyDataSource = new MyDataSource()

  build() {
    List() {
      LazyForEach(this.dataSource, (item: DataItem) => {
        ListItem() {
          // 列表项内容
        }
      }, (item: DataItem) => item.id)
    }
    .width('100%')
    .height('100%')
  }
}
```

### 优化建议

1. **使用 LazyForEach 替代 ForEach**：
   - ForEach 会一次性创建所有组件
   - LazyForEach 只创建可见区域的组件

2. **避免在 ListItem 中使用复杂布局**：
   - 减少 ListItem 内部层级
   - 避免使用多层嵌套

3. **设置固定的 ListItem 高度**：
```typescript
List() {
  // ...
}
.cachedCount(5)  // 缓存数量
```

## 最佳实践

1. **列表项复用**：
```typescript
@Builder
itemBuilder(item: ListItemData) {
  Row() {
    Image(item.icon)
    Column() {
      Text(item.title)
      Text(item.subtitle)
    }
  }
}
```

2. **滚动监听**：
```typescript
List()
  .onScrollIndex((start, end) => {
    console.log(`可见范围: ${start} - ${end}`)
  })
  .onReachEnd(() => {
    console.log('到达底部')
    this.loadMore()
  })
```

3. **弹性滚动效果**：
```typescript
List()
  .edgeEffect(EdgeEffect.Spring)  // iOS 风格弹性滚动
```

## 注意事项

1. List 的子组件必须是 ListItem 或 ListItemGroup
2. 使用 ForEach 或 LazyForEach 渲染列表项
3. 大数据量列表务必使用 LazyForEach
4. 合理设置 cachedCount 优化滚动性能