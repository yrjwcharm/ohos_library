## 7. 渲染控制约束

### ForEach

| 规则 | 说明 |
|------|------|
| 必须与容器组件配合使用 | 返回的组件必须是父容器允许的子组件类型 |
| **不建议键值包含 index** | 会导致渲染结果非预期和性能降低 |
| 键值必须唯一 | 重复键值导致渲染异常 |
| 默认键值生成有性能隐患 | 默认使用 `index + '__' + JSON.stringify(item)`，复杂对象 JSON 序列化占用大量内存 |
| JSON.stringify 可能失败 | 含 bigint 等不可序列化类型时会导致 jscrash |
| 不建议与 LazyForEach 同时使用 | 在同一滚动容器内不应混用 |
| 大量子组件场景建议用 LazyForEach/Repeat | ForEach 在大数据量时可能导致卡顿 |
| 不建议用内容相同的数组项替换旧项 | 键值未变时会导致**数据变化不渲染** |
| 对象数据类型建议用唯一 ID 作为键值 | 保证键值唯一性和一致性 |

### LazyForEach

| 规则 | 说明 |
|------|------|
| 仅特定容器支持懒加载 | 仅 List、ListItemGroup、Grid、Swiper、WaterFlow 支持数据懒加载 |
| 容器内只能包含一个 LazyForEach | 不建议同时包含 ListItem、ForEach、LazyForEach 或多个 LazyForEach |
| **每次迭代必须且只允许创建一个子组件** | 子组件生成函数有且只有一个根组件 |
| 键值必须唯一且一致 | 键值相同导致渲染异常 |
| 必须使用 DataChangeListener 更新 | 重新赋值第一个参数 dataSource 会导致异常；**dataSource 使用状态变量时，状态变量改变不会触发 UI 刷新** |
| 刷新需生成新键值 | 使用 onDataChange 更新时，需生成不同于原来的键值才能触发组件刷新 |
| 子组件尺寸缺失导致懒加载失效 | 高度或宽度缺失会导致部分场景懒加载失效 |
| 不建议在 index 中记录删除位置 | 删除后 index 未更新会导致删除结果与预期不符 |
| 优先使用 Repeat | Repeat 基于 V2 状态管理，使用更便利，推荐迁移 |

### Repeat (V2)

| 规则 | 说明 |
|------|------|
| 仅在 @ComponentV2 中使用 | — |
| 支持 virtualScroll / nonVirtualScroll 模式 | virtualScroll 配合 List/Grid/WaterFlow/Swiper 实现懒加载 |
| virtualScroll 模式需设置 cachedCount | — |
| key() 必须唯一 | — |
| 推荐 | 相比 ForEach/LazyForEach，Repeat 使用更便利，渲染效率更高 |

### if/else

| 规则 | 说明 |
|------|------|
| 条件渲染"透明" | 父子组件之间的条件渲染不影响父组件对子组件的限制（如 Grid 内只能用 GridItem） |
| 分支必须创建组件 | 空构建函数会产生语法错误 |
| 分支切换不保留状态 | if 分支更改时，旧子组件被销毁、新子组件被创建，**不保留状态**。需将状态提升到父组件 |
| 条件中不得改变应用状态 | 构造函数中的表达式不得更改应用程序状态 |

## 常见错误

### ForEach
- **缺少第三个参数（键值生成器）**：`ForEach(this.list, item => { ... })` 缺少 key 生成器会导致渲染异常
- **用索引做 key**：`(item, index) => index` 会导致渲染不正确和性能差

### LazyForEach
- **dataSource 用状态变量并重新赋值**：重新赋值 dataSource 会导致异常，必须用 DataChangeListener
- **放在 Scroll 里使用**：LazyForEach 仅在 List/Grid/WaterFlow/Swiper 中有效，Scroll 不支持懒加载

---
