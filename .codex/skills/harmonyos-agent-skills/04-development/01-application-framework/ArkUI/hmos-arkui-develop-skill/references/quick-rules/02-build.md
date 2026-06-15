## 2. build() 函数约束

| 规则 | 说明 |
|------|------|
| @Entry 根节点必须为容器组件 | @Entry 装饰的组件，build() 下的根节点**唯一且必要**，且**必须为容器组件**，ForEach **禁止**作为根节点 |
| @Component 根节点可为非容器 | @Component 装饰的组件，build() 下的根节点**唯一且必要**，可以为非容器组件，但 ForEach **禁止**作为根节点 |
| 不允许声明本地变量 | build() 中**不允许声明本地变量**（如 `let num = 1`） |
| 不允许 console.info | build() 中**不允许直接使用** console.info（但允许在方法或函数里使用） |
| 不允许本地作用域 | build() 中**不允许创建本地作用域** `{ ... }` |
| 不允许调用非 @Builder 方法 | build() 中**不允许调用没有用 @Builder 装饰的方法**；但允许系统组件参数是 TS 方法的返回值 |
| 不允许 switch 语法 | build() 中**不允许使用 switch 语法**，需使用 if |
| 不允许三元表达式 | build() 中**不允许使用三元表达式**（`? :`），需使用 if 组件 |
| **禁止直接改变状态变量** | build() 或 @Builder 方法里**不允许直接改变状态变量**，会导致循环渲染风险。包括：在 @Builder/@Extend/@Styles 内改变状态、计算参数时调用含状态变更的函数、对当前数组调用 sort() 后接 filter() 等 |
| sort/filter 陷阱 | `this.arr.sort().filter(...)` 中 sort() 改变了原数组，应改为 `this.arr.filter(...).sort()` |

## 常见错误

- **`this.counter += 1` 在 build() 中改状态变量**：会导致循环渲染，状态变更应放在事件回调中
- **`this.arr.sort().filter(...)`**：sort() 改变原数组触发状态变更导致循环，应改为 `this.arr.filter(...).sort()`

---
