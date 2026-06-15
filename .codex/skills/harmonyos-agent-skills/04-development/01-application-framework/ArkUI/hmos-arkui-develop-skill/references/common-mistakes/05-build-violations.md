## 5. build() 函数内违规操作

AI 经常在 build() 里写不该写的代码。

| ❌ AI 常见错误 | 原因 | 规则章节 |
|--------------|------|---------|
| `let temp = compute()` 声明本地变量 | build() 中不允许声明本地变量 | 规则第2节 build函数约束 |
| `console.info(...)` 打日志 | build() 中不允许 console.info | 规则第2节 build函数约束 |
| `switch (type) { case ... }` | build() 中不允许 switch，用 if 替代 | 规则第2节 build函数约束 |
| `flag ? textA : textB` 三元表达式 | build() 中不允许三元表达式，用 if 替代 | 规则第2节 build函数约束 |
| 调用非 @Builder 的方法生成 UI | build() 中只能调用 @Builder 装饰的方法 | 规则第2节 build函数约束 |
| `this.counter += 1` 直接改状态变量 | build() 中改变状态变量导致循环渲染 | 规则第2节 build函数约束 |
| `this.arr.sort().filter(...)` | sort() 改变原数组，导致状态变更触发循环 | 规则第2节 build函数约束 |

**根因**：AI 把 build() 当成普通函数来写，不理解声明式 UI 的渲染约束。
