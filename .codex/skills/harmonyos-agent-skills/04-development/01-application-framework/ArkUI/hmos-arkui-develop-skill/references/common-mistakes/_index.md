# AI 常见错误索引

> **本文档定位：预防工具，不是检视工具。**
>
> 使用时机：
> 1. **编码前**：快速扫描第 1-2 节（import 和 UIContext），这两类错误出现频率最高
> 2. **编码中**：写属性和参数时对照第 7 节（属性参数使用错误），根据功能类型对照其他章节（状态管理看第 3-5 节，列表渲染看第 6 节，导航看第 8 节）
> 3. **检视时**：逐条对照清单，每条都有对应的约束规则章节号可深入查阅

| 文件 | 节号 | 主题 | 使用时机 |
|------|------|------|----------|
| [01-import.md](common-mistakes/01-import.md) | 第1节 | import 路径和模块错误 | 编码前必扫 |
| [02-uicontext.md](common-mistakes/02-uicontext.md) | 第2节 | 全局接口未通过 UIContext 调用 | 编码前必扫 |
| [03-v1v2-mix.md](common-mistakes/03-v1v2-mix.md) | 第3节 | 状态管理 V1/V2 混用 | 编码中 |
| [04-decorator-position.md](common-mistakes/04-decorator-position.md) | 第4节 | 装饰器用在错误的位置 | 编码中 |
| [05-build-violations.md](common-mistakes/05-build-violations.md) | 第5节 | build() 函数内违规操作 | 编码中 |
| [06-foreach.md](common-mistakes/06-foreach.md) | 第6节 | ForEach / LazyForEach 错误 | 编码中 |
| [07-attribute-params.md](common-mistakes/07-attribute-params.md) | 第7节 | 属性和 API 参数使用错误 | 编码中 |
| [08-navigation.md](common-mistakes/08-navigation.md) | 第8节 | 导航和路由错误 | 编码中 |
| [09-nesting-naming.md](common-mistakes/09-nesting-naming.md) | 第9节 | 组件嵌套和命名冲突 | 检视时 |
| [10-type-annotation.md](common-mistakes/10-type-annotation.md) | 第10节 | 状态变量类型省略 | 检视时 |
| [11-deprecated.md](common-mistakes/11-deprecated.md) | 第11节 | 废弃接口使用 | 检视时 |
