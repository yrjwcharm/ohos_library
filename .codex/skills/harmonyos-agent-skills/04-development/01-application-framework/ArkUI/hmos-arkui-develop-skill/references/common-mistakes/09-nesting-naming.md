## 9. 组件嵌套和命名冲突

| ❌ AI 常见错误 | 原因 | 规则章节 |
|--------------|------|---------|
| `List` 内直接放非 `ListItem` 子组件 | List 内必须用 ListItem 包裹 | 规则第14节 布局容器约束 |
| `Tabs` 内直接放非 `TabContent` 子组件 | Tabs 内必须用 TabContent | 规则第14节 布局容器约束 |
| `Grid` 内直接放非 `GridItem` 子组件 | Grid 内必须用 GridItem | 规则第14节 布局容器约束 |
| 组件命名 `Button`、`Text`、`Image` | 与系统组件名冲突 | 规则第1节 自定义组件基本约束 |
| 变量命名 `rerender`、`aboutToAppear` | 与框架保留字冲突 | 规则第21节 内置保留字 |

**根因**：AI 不了解容器组件的子组件约束和框架保留字列表。
