## 6. 访问限定符约束

| 装饰器 | 允许的访问限定符 | 禁止的访问限定符 |
|--------|-----------------|-----------------|
| @State / @Prop / @Provide / @BuilderParam / 常规变量 | 默认/public/private（private 会阻止外部初始化） | protected（struct 无继承） |
| @StorageLink / @StorageProp / @LocalStorageLink / @LocalStorageProp / @Consume | 默认/private | public / protected |
| @Link / @ObjectLink | 默认/public | **private**（因为必须外部初始化）/ protected |
| @Require + @State/@Prop/@Provide/@BuilderParam | 默认/public | **private**（与 @Require 矛盾）/ protected |
| 所有 | — | **protected**（struct 没有继承能力，所有 protected 修饰会产生告警） |

## 常见错误

- **@State 装饰组件入参**：@State 只能装饰组件内部变量，入参用 @Prop/@Param
- **@Local 装饰组件入参**：@Local 只能组件内部初始化，入参用 @Param
- **@Prop 装饰组件内部变量**：@Prop 只能装饰组件入参
- **@Param 装饰组件内部变量**：@Param 只能装饰组件入参
- **@Link 本地初始化**：`@Link count: number = 0` 禁止，@Link 必须外部传入
- **@ObjectLink 本地初始化**：@ObjectLink 禁止本地初始化
- **@ObjectLink 装饰简单类型**：不支持 number/string/boolean，需用 @Prop
- **@Consume 被外部初始化**：@Consume 不可以被外部初始化

---
