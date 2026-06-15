## 14. 布局容器约束

### List / Grid / WaterFlow / Swiper
- 使用 LazyForEach 时需注意**子组件尺寸不能缺失**，否则懒加载失效
- 同一容器内**不建议**同时使用 ForEach 和 LazyForEach
- 设置 cachedCount 可优化懒加载性能

### Flex
- 注意 flexWrap 默认值和主轴方向的对齐方式
- 嵌套过深可能导致性能问题

### RelativeContainer
- 锚点规则需正确设置
- center / middle 等对齐规则需指定 anchor 和 align

### Scroll
- 嵌套滚动场景注意滚动冲突

### 常见错误

| 错误写法 | 正确写法 | 说明 |
|---------|---------|------|
| `List` 内直接放非 `ListItem` 子组件 | List 内必须用 `ListItem` 包裹 | List 仅接受 ListItem 作为直接子组件 |
| `Tabs` 内直接放非 `TabContent` 子组件 | Tabs 内必须用 `TabContent` | Tabs 仅接受 TabContent 作为直接子组件 |
| `Grid` 内直接放非 `GridItem` 子组件 | Grid 内必须用 `GridItem` | Grid 仅接受 GridItem 作为直接子组件 |

---
