## 3. 状态管理 V1 装饰器约束

### @State
- 观察能力：仅能观察到**第一层**的变化（赋值、数组项增删、Map/Set API 调用）
- 嵌套对象的**深层属性变化**无法被观察到，需配合 @Observed/@ObjectLink
- 不支持 undefined、null 类型

### @Prop
- **单向同步**，本地修改会被父组件更新覆盖
- 允许本地初始化，也可被外部初始化
- @Prop 装饰的变量在本地**拷贝了数据源**

### @Link
- **必须被外部初始化**，**禁止本地初始化**
- 与数据源**双向同步**
- 只能被 V1 状态变量初始化

### @ObjectLink
- **禁止本地初始化**，必须从父组件传入
- **禁止整体赋值**（`this.objLink = ...`），只允许修改属性（`this.objLink.a = ...`）
- API version 19 前：类型**必须**为被 @Observed 装饰的 class 实例
- API version 19+：可接收复杂类型，但嵌套类型观察仍需 @Observed
- **不支持简单类型**（number, string, boolean），如需使用简单类型请用 @Prop

### @Observed
- 用于装饰 class
- 嵌套场景下，**非简单类型的属性也需要被 @Observed 装饰**，否则观察不到变化

### @Provide / @Consume
- @Consume **不可以被外部初始化**
- @Provide 可被外部初始化，也可本地初始化

### @StorageLink / @StorageProp / @LocalStorageLink / @LocalStorageProp
- **不可以被外部初始化**，与 AppStorage / LocalStorage 自动绑定

### @Watch
- 严格禁止在 @Watch 回调中修改**自身被监视的变量**，否则会导致无限循环

### @Builder
- **禁止在 @Builder 内部定义状态变量**或使用生命周期函数
- 参数类型**不允许** undefined、null 和返回 undefined、null 的表达式
- 按引用传递时需用 `$$` 语法；按值传递按值拷贝
- 全局 @Builder 函数如果不涉及组件状态变量变化，建议使用全局定义

### @BuilderParam
- 用于占位，允许被外部初始化

### @Extend
- **仅支持全局定义**（不能在组件内部定义）
- **仅当前文件可用**，不支持 export（需要 export 请用 AttributeModifier）
- **不能与 @Styles 混用**

### @Styles
- **不支持参数**
- **不支持业务逻辑语句**
- 仅支持**通用属性**（不支持组件私有属性如 Button 的 fontColor）
- 不支持 export

### @Require
- 含义是必须被外部初始化，与 private 自相矛盾
- **禁止** @Require 和 private 同时装饰 @State/@Prop/@Provide/@BuilderParam/常规成员变量

### @AnimatableExtend
- 装饰的函数参数类型**只允许** number、string、Color 及其联合类型
- 鸿蒙卡片中动画最大时长 **1000ms**

### wrapBuilder
- 类型参数必须与 @Builder 函数签名**严格一致**

## 常见错误

- **省略状态变量类型注解**：ArkUI 装饰器要求每个状态变量必须声明类型
  - ❌ `@State count = 0` → ✅ `@State count: number = 0`
  - ❌ `@State list = []` → ✅ `@State list: Array<string> = []`

---
