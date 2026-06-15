## 3. 状态管理 V1/V2 混用

AI 经常在同一个组件中混用 V1 和 V2 装饰器。

| ❌ AI 常见错误 | 原因 | 规则章节 |
|--------------|------|---------|
| `@ComponentV2` 里用 `@State` | @ComponentV2 只能用 V2 装饰器（@Local/@Param 等） | 规则第1节 自定义组件基本约束, 规则第5节 V1/V2混用约束 |
| `@Component` 里用 `@Local` | @Component 只能用 V1 装饰器 | 规则第1节 自定义组件基本约束, 规则第5节 V1/V2混用约束 |
| `@ObservedV2` class 中用 `@State` 装饰属性 | V1 装饰器不能和 @ObservedV2 一起用 | 规则第5节 V1/V2混用约束 |
| 不调用 `enableV2Compatibility` 就跨 V1/V2 传值 | V1→V2 或 V2→V1 传值需要兼容桥接 | 规则第5节 V1/V2混用约束 |

**根因**：AI 不清楚 V1 和 V2 的严格边界，生成了"看起来合理但编译报错"的混用代码。
