## 12. 扩展能力约束

### DrawModifier
- **一个实例只能设置给一个组件**，禁止多个组件复用同一个 DrawModifier
- **不支持**在 attributeModifier 内调用 drawModifier

### GestureModifier
- **不支持**自定义组件
- **不支持**在 attributeModifier 内调用 gestureModifier

### AttributeUpdater
- **一个对象只能关联一个组件**，用于多个组件时只有一个生效
- 与状态变量同时更新同一属性时会**互相覆盖**

### NodeContainer
- **仅支持**自定义 FrameNode 节点和 BuilderNode 根节点作为子节点
- 系统组件代理节点**不能**成功挂载

### 节点单父规则
- 一个节点**只能有一个父节点**。挂载到多个 NodeContainer 会导致异常
- 迁移节点时**必须先从旧父节点移除**，再添加到新父节点

### FrameNode
- 声明式（系统）FrameNode **不可修改**：不能设置属性、增删子节点、绑定控制器（错误码 100021）
- 未挂载的节点**不能进行节点操作**（错误码 106203）

---
