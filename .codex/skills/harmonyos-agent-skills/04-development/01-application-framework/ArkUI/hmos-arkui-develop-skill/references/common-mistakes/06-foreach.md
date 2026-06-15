## 6. ForEach / LazyForEach 错误

| ❌ AI 常见错误 | 原因 | 规则章节 |
|--------------|------|---------|
| `ForEach(this.list, item => { ... })` 缺少第三个参数 | 缺少 key 生成器导致渲染异常 | 规则第7节 渲染控制约束 |
| `ForEach(this.list, ..., (item, index) => index)` 用索引做 key | 索引做 key 导致渲染不正确和性能差 | 规则第7节 渲染控制约束 |
| `LazyForEach` 的 dataSource 用状态变量并重新赋值 | 重新赋值 dataSource 会导致异常，必须用 DataChangeListener | 规则第7节 渲染控制约束 |
| `LazyForEach` 放在 Scroll 里 | LazyForEach 仅在 List/Grid/WaterFlow/Swiper 中有效 | 规则第7节 渲染控制约束 |

**根因**：AI 不了解 ForEach/LazyForEach 的键值机制和数据更新规则。
