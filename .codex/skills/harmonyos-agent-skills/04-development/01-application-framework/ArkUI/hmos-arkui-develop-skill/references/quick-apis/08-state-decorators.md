## 8. 状态管理装饰器


> **组件索引**：`V1 装饰器`、`V1 全局状态 API`、`V2 装饰器 (API 12+)`、`V2 全局状态 API`

### V1 装饰器

| 装饰器 | 适用场景 | 装饰变量类型 | 说明 |
|--------|---------|-------------|------|
| **@State** | 组件内状态 | Object/class/string/number/boolean | 观察第一层属性变化，触发 UI 刷新 |
| **@Prop** | 父→子单向 | 同 @State | 父组件单向传递，子组件本地副本 |
| **@Link** | 父↔子双向 | 同 @State | 双向同步，需用 `$变量` 传递 |
| **@Observed** | 类装饰器 | class | 观察类实例的嵌套属性变化 |
| **@ObjectLink** | 嵌套对象 | @Observed 装饰的类实例 | 配合 @Observed 实现嵌套观测 |
| **@Provide / @Consume** | 跨层级 | 同 @State | 祖先提供，后代消费 |
| **@Watch** | 变量监听 | 追加在其他装饰器后 | `@Watch('onChanged')` 变化时回调 |
| **@Builder** | UI 复用 | 函数 | 声明式 UI 描述函数 |
| **@BuilderParam** | UI 插槽 | @Builder 函数 | 接收外部传入的 UI |
| **@LocalBuilder** | 本地 UI | 函数 | 不追踪外部依赖变化 |
| **@Extend** | 样式扩展 | 组件类型 | `@Extend(Text) function myStyle() {}` |
| **@Styles** | 通用样式 | 无参 | `@Styles function myStyles() {}` |
| **@StateStyles** | 多态样式 | — | {normal, pressed, disabled, focused, selected} |
| **@AnimatableExtend** | 动画扩展 | 可动画属性 | 自定义可动画扩展 |
| **@Reusable** | 组件复用 | @Component | 实现 `aboutToReuse` |
| **@Require** | 必填参数 | 变量 | 标记参数为必填 |

### V1 全局状态 API

| API | 签名/用法 | 说明 |
|-----|----------|------|
| **AppStorage** | `.setOrCreate(key, value)` `.get(key)` `.set(key)` `.delete(key)` | 应用级全局状态 |
| **@StorageLink** | `@StorageLink('key') var: type` | 与 AppStorage 双向同步 |
| **@StorageProp** | `@StorageProp('key') var: type` | 与 AppStorage 单向同步 |
| **LocalStorage** | `new LocalStorage()` `.setOrCreate()` `.get()` | 页面/模块级状态 |
| **@LocalStorageLink** | `@LocalStorageLink('key') var: type` | 与 LocalStorage 双向同步 |
| **@LocalStorageProp** | `@LocalStorageProp('key') var: type` | 与 LocalStorage 单向同步 |
| **PersistentStorage** | `.persistProp('key', default)` `.deleteProp()` | 持久化存储 |
| **Environment** | `.envProp('key', value)` | 环境变量 |

### V2 装饰器 (API 12+)

| 装饰器 | 适用场景 | 说明 |
|--------|---------|------|
| **@Local** | 组件内状态 | 替代 @State |
| **@Param** | 父→子传递 | 替代 @Prop/@Link |
| **@Once** | 追加 @Param | 仅初始化同步一次 |
| **@Event** | 子→父回调 | `@Event onValueChange: (val) => void` |
| **@Provider / @Consumer** | 跨层级 | V2 版 |
| **@Monitor** | 属性监听 | `@Monitor('p1','p2') onPChange(mon: IMonitor) {}` |
| **@SyncMonitor** | 同步监听 | 同步版本 |
| **@Computed** | 计算属性 | `@Computed get name(): string {}` |
| **@ObservedV2** | 类装饰器 | V2 版深度观测 |
| **@Trace** | 属性追踪 | `@Trace name: string = ''` |
| **@Type** | 类型标记 | 序列化类型 |
| **@ReusableV2** | 组件复用 | V2 版 |
| **@Binding** | 双向绑定 | V2 版双向绑定 |

### V2 全局状态 API

| API | 签名 | 说明 |
|-----|------|------|
| **AppStorageV2** | `.connect(this, 'key', type?)` | V2 应用级状态 |
| **PersistenceV2** | `.connect(this, 'key', type?)` | V2 持久化 |
| **makeObserved** | `makeObserved(target)` | 将对象变为可观测 |
| **canBeObserved** | `canBeObserved(target)` | 判断是否可观测 |
| **getTarget** | `getTarget(proxy)` | 获取 Proxy 原始对象 |
| **addMonitor / clearMonitor** | `addMonitor(obj, prop, cb)` / `clearMonitor(id)` | 动态监听 |

---
