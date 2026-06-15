## 11. 废弃接口使用

| ❌ AI 常见错误 | ✅ 正确替代 | 规则章节 |
|--------------|-----------|---------|
| `CustomDialogController` | `promptAction.openCustomDialog` | 规则第10节 对话框与半模态约束 |
| `pageTransition` | Navigation 转场 / Modal 转场 | 规则第8节 动画约束 |
| `@ohos.*` 导入 | `@kit.*` 导入 | 规则第20节 模块导入约束 |
| `@Component` + `static {}` 静态代码块 | V1 中静态代码块不执行（API 22 起告警） | 规则第1节 自定义组件基本约束 |

**根因**：AI 训练数据中包含旧版示例，不知道这些接口已被废弃。
