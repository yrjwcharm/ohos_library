# Refresh 组件使用规范

## 概述

Refresh 是下拉刷新容器组件，包裹可滚动组件（如 List、Grid、Scroll），实现下拉刷新功能。

## 接口

```typescript
Refresh(value: { refreshing: $$boolean, builder?: CustomBuilder, promptText?: ResourceStr })
```

**参数说明**：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| refreshing | $$boolean | 是 | 双向绑定的刷新状态，`$$` 语法 |
| builder | CustomBuilder | 否 | 自定义刷新区域内容 |
| promptText | ResourceStr | 否 | 刷新区域提示文本 |

> **注意**：`refreshing` 必须使用 `$$` 双向绑定语法，不能用普通 `this.refreshing`。

## 子组件

Refresh 支持**单个**子组件，通常是可滚动容器：
- List
- Grid
- Scroll
- WaterFlow

## 属性

| 属性 | 参数类型 | 说明 |
|------|----------|------|
| refreshOffset(value: number) | number | 触发刷新的下拉距离（vp），默认 64 |
| pullToRefresh(value: boolean) | boolean | 是否支持松手自动刷新，默认 true |
| pullDownRatio(value: number) | number | 下拉跟手比例，取值 0-1 |

## 事件

| 事件 | 说明 |
|------|------|
| onRefreshing(callback: () => void) | 进入刷新状态时触发 |
| onStateChange(callback: (state: RefreshStatus) => void) | 刷新状态变化回调 |
| onOffsetChange(callback: (offset: number) => void) | 下拉偏移量变化回调 |

**RefreshStatus 枚举**：

| 值 | 说明 |
|----|------|
| Inactive | 未下拉 |
| Drag | 正在下拉，未达刷新距离 |
| OverDrag | 正在下拉，已达刷新距离 |
| Refresh | 刷新中 |
| Done | 刷新完成 |

## 使用示例

### 基础下拉刷新

```typescript
@Entry
@Component
struct BasicRefresh {
  @State refreshing: boolean = false
  @State data: string[] = ['Item 1', 'Item 2', 'Item 3']

  build() {
    Refresh({ refreshing: $$this.refreshing }) {
      List({ space: 10 }) {
        ForEach(this.data, (item: string) => {
          ListItem() {
            Text(item)
              .width('100%')
              .height(60)
              .textAlign(TextAlign.Center)
              .backgroundColor('#F5F5F5')
              .borderRadius(8)
          }
        })
      }
      .width('100%')
      .height('100%')
    }
    .onRefreshing(() => {
      setTimeout(() => {
        this.data = ['New 1', 'New 2', 'New 3']
        this.refreshing = false
      }, 1500)
    })
  }
}
```

### 下拉刷新 + 上拉加载更多

```typescript
@Entry
@Component
struct RefreshLoadMoreList {
  @State data: string[] = []
  @State refreshing: boolean = false
  @State hasMore: boolean = true
  private page: number = 1

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

        // 上拉加载更多指示器
        ListItem() {
          if (this.hasMore) {
            Row() {
              LoadingProgress()
                .width(24)
                .height(24)
              Text('加载中...')
                .fontSize(14)
                .fontColor('#999')
                .margin({ left: 8 })
            }
            .width('100%')
            .height(50)
            .justifyContent(FlexAlign.Center)
          }
        }
        .onAppear(() => {
          if (this.hasMore) {
            this.loadMore()
          }
        })
      }
      .width('100%')
      .height('100%')
      .padding({ left: 16, right: 16 })
    }
    .onRefreshing(() => {
      this.refresh()
    })
  }

  private loadData(): void {
    // 初始化加载数据
  }

  private refresh(): void {
    this.page = 1
    setTimeout(() => {
      this.data = [] // 重置数据
      this.loadData()
      this.refreshing = false
    }, 1000)
  }

  private loadMore(): void {
    this.page++
    // 追加加载数据
  }
}
```

### 自定义刷新样式

```typescript
@Entry
@Component
struct CustomRefresh {
  @State refreshing: boolean = false
  @State refreshStatus: RefreshStatus = RefreshStatus.Inactive

  @Builder
  refreshBuilder() {
    Row() {
      if (this.refreshStatus === RefreshStatus.Refresh) {
        LoadingProgress()
          .width(32)
          .height(32)
        Text('刷新中...')
          .margin({ left: 8 })
      } else if (this.refreshStatus === RefreshStatus.OverDrag) {
        Text('释放刷新')
      } else if (this.refreshStatus === RefreshStatus.Drag) {
        Text('下拉刷新')
      }
    }
    .width('100%')
    .height(64)
    .justifyContent(FlexAlign.Center)
  }

  build() {
    Refresh({ refreshing: $$this.refreshing, builder: this.refreshBuilder() }) {
      List() {
        // 列表内容
      }
    }
    .onStateChange((state: RefreshStatus) => {
      this.refreshStatus = state
    })
    .onRefreshing(() => {
      setTimeout(() => {
        this.refreshing = false
      }, 2000)
    })
  }
}
```

### 配合 onReachEnd 上拉加载

```typescript
Refresh({ refreshing: $$this.refreshing }) {
  List({ space: 10 }) {
    ForEach(this.data, (item: string) => {
      ListItem() {
        Text(item)
      }
    })
  }
  .onReachEnd(() => {
    // List 滚动到底部时触发
    this.loadMore()
  })
}
.onRefreshing(() => {
  this.refresh()
})
```

## 注意事项

1. `refreshing` 参数必须使用 `$$` 双向绑定语法
2. Refresh 只能包含**单个**子组件
3. 刷新完成后必须将 `refreshing` 设为 `false`，否则刷新动画不会停止
4. 上拉加载通常通过 List 的 `onReachEnd` 或末尾 ListItem 的 `onAppear` 实现，不是 Refresh 自身的功能
5. 自定义 builder 时，根据 `RefreshStatus` 状态切换 UI 提升用户体验

## 最佳实践

1. **配合 List 使用**：Refresh 最常见的用法是包裹 List 实现下拉刷新列表
2. **加载状态管理**：使用 `@State` 管理 `refreshing`、`hasMore`、`isLoading` 等状态，避免重复请求
3. **错误处理**：刷新失败时也要将 `refreshing` 设为 `false`
4. **LazyForEach**：大数据量场景使用 LazyForEach 搭配 Refresh 提升性能