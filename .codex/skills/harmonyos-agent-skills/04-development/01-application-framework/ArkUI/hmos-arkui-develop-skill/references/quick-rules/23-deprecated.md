## 23. 废弃接口约束

### 23.1 废弃接口替换规则

| 规则 | 说明 |
|------|------|
| **禁止使用 CustomDialogController** | 从 API version 12 开始不推荐使用，用 `promptAction.openCustomDialog` 替代 |
| **禁止使用 pageTransition** | 用 Navigation 转场或 Modal 转场替代 |
| **禁止使用 @ohos.* 路径导入** | 旧版导入路径已废弃，必须用 `@kit.*` 替代 |
| **禁止在 @Component 中使用 static {}** | V1 中静态代码块不执行（API 22 起告警） |

### 常见错误

| 错误写法 | 正确替代 |
|---------|---------|
| `CustomDialogController` | `promptAction.openCustomDialog` |
| `pageTransition` | Navigation 转场 / Modal 转场 |
| `@Component` + `static {}` | 使用 `@ComponentV2` 或移除静态代码块 |

---