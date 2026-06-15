## 4. 状态管理 V2 装饰器约束

### @ObservedV2 / @Trace
- @ObservedV2 装饰 class，@Trace 装饰需要被观察的属性
- **V1 装饰器不能和 @ObservedV2 一起使用**
- 需要深度观察时，**每一层** class 都需要用 @ObservedV2 + @Trace

### @Local
- **必须在组件内部初始化**
- 不允许从外部传入初始化

### @Param
- 可从父组件传入
- 默认**单向同步**（父到子）
- 配合 @Event 实现双向同步

### @Once
- 表示仅在组件首次创建时接收参数，后续父组件变化**不更新**

### @Event
- 用于配合 @Param 实现子到父的回调通知

### @Provider / @Consumer (V2)
- 跨层级数据传递
- @Provider 注入，@Consumer 消费

### @Computed (V2)
- 计算属性装饰器，自动缓存
- 仅在依赖的 @Trace 属性变化时重新计算

### @Monitor (V2) / addMonitor / clearMonitor
- addMonitor/clearMonitor 目标**必须是** @ObservedV2 class（带 @Trace）或 @ComponentV2 实例（错误码 130000）
- 回调**必须是命名函数**，不能是匿名函数（错误码 130002）

### makeObserved
- 将普通对象转为 V2 可观测对象
- **不支持** collections 类型和 @Sendable 装饰的 class
- **不支持**非 object 类型、undefined、null
- **不支持** @ObservedV2 装饰的类

### applySyncUpdates / flushUpdates / flushUIUpdates
- 用于手动触发 V2 状态更新
- 在非 UI 线程修改状态后，需要手动调用来刷新 UI

---

## 常见错误

### 错误 1：@Monitor 回调中访问 IMonitor 值的方式错误

**错误写法**：
```typescript
@Monitor('searchKeywordValue')
onSearchKeywordChange(mon: IMonitor): void {
  let keyword: string = mon.value?.after ?? ''  // ❌ 'after' 不存在
  let keyword: string = mon.value<string>().after ?? ''  // ❌ IMonitorValue 没有 'after'
}
```

**正确写法**：
```typescript
@Monitor('searchKeywordValue')
onSearchKeywordChange(mon: IMonitor): void {
  let keyword: string = mon.value<string>()?.now ?? ''  // ✅ 属性是 now，需要传类型参数
  let before: string = mon.value<string>()?.before ?? ''
}
```

**API 签名**：
- `mon.value<T>(path?: string): IMonitorValue<T> | undefined`
- `IMonitorValue<T>` 有三个属性：`before: T`、`now: T`、`path: string`
- 注意是 `now` 不是 `after`，且必须传泛型类型参数

### 错误 2：Navigation 多文件路由架构

`@ComponentV2 export struct` 完全支持跨文件导出和引用。Navigation 多文件路由有两种正确方案：

**方案一：自定义路由表（静态 import，推荐简单项目）**
```typescript
// PageA.ets — 独立页面文件
@ComponentV2
export struct PageA {
  @Param navPathStack: NavPathStack = new NavPathStack()
  @Param goodsIdValue: string = ''

  build() {
    NavDestination() { /* ... */ }
  }
}

// MainHost.ets — 主入口
import { PageA } from './PageA'
import { PageB } from './PageB'

@Entry
@ComponentV2
struct MainHost {
  @Local navPathStackValue: NavPathStack = new NavPathStack()

  @Builder
  pageMap(name: string, param: Object) {
    if (name === 'PageA') {
      PageA({ navPathStack: this.navPathStackValue, goodsIdValue: '123' })
    } else if (name === 'PageB') {
      PageB({ navPathStack: this.navPathStackValue })
    }
  }

  build() {
    Navigation(this.navPathStackValue) { /* 首页内容 */ }
      .navDestination(this.pageMap)
  }
}
```

**方案二：系统路由表（无需 import，推荐跨模块项目）**
- 配置 `router_map.json`，用 `pushPathByName()` 跳转
- 每个页面导出 `@Builder export function XxxBuilder()` 构造函数
- 详见官方文档「Navigation跨包路由」

**V2 传递 navPathStack**：用 `@Param` 接收父组件传入的 navPathStack（非 `@Consume`）。
