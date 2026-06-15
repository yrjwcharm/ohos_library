## 10. 状态变量类型省略

| ❌ AI 常见错误 | ✅ 正确写法 | 规则章节 |
|--------------|-----------|---------|
| `@State count = 0` | `@State count: number = 0` | 规则第3节 状态管理V1装饰器 |
| `@Local name = ''` | `@Local name: string = ''` | 规则第4节 状态管理V2装饰器 |
| `@State list = []` | `@State list: Array<string> = []` | 规则第3节 状态管理V1装饰器 |

**根因**：AI 倾向省略类型注解，但 ArkUI 装饰器要求每个状态变量必须声明类型。
