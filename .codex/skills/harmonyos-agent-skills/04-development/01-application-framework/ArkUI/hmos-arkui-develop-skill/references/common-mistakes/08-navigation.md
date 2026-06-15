## 8. 导航和路由错误

| ❌ AI 常见错误 | 原因 | 规则章节 |
|--------------|------|---------|
| 使用 `@ohos.router` 做页面跳转 | 推荐使用 Navigation + NavDestination | 规则第9节 导航与路由约束 |
| 多个页面各自 `@Entry` | 单 Page 应用应该只有一个 @Entry | 规则第1节 自定义组件基本约束, 规则第9节 导航与路由约束 |
| Navigation 跳转未注册 builder | 会报错码 100005 | 规则第9节 导航与路由约束 |
| 使用 `pageTransition` 做页面转场 | pageTransition 已废弃，应用 Navigation 转场 | 规则第8节 动画约束 |

**根因**：AI 倾向使用更"直观"的 router API，不清楚 Navigation 是推荐方案。
