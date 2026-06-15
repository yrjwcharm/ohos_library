## 5. V1/V2 混用约束

| 规则 | 说明 |
|------|------|
| V1 装饰器禁止与 @ObservedV2 混用 | 依旧维持禁止现状 |
| V2 -> V1 禁止用装饰器接收 | V1 不支持用装饰器直接接收 @ObservedV2 装饰的 class，否则编译报错 |
| V1 @Link 只能被 V1 状态变量初始化 | V1 中 @Link 遵循其原本初始化规则 |
| V1->V2 需调用 enableV2Compatibility | V1 状态变量传递到 V2 组件时，需调用 `UIUtils.enableV2Compatibility()` |
| V2->V1 需调用 makeV1Observed | V2 中优先声明成 V1 状态变量数据，并调用 `UIUtils.enableV2Compatibility(UIUtils.makeV1Observed())` |
| 建议在 V2 组件构造处调用 | 避免变量被整体赋值后需要再次手动调用 |
| 禁止双重代理 | 不使用 enableV2Compatibility 和 makeV1Observed 会导致双重代理问题 |

## 常见错误

- **`@ComponentV2` 里用 `@State`**：@ComponentV2 只能用 V2 装饰器（@Local/@Param 等），混用会编译报错
- **`@Component` 里用 `@Local`**：@Component 只能用 V1 装饰器
- **`@ObservedV2` class 中用 `@State` 装饰属性**：V1 装饰器不能和 @ObservedV2 一起用
- **不调用 `enableV2Compatibility` 就跨 V1/V2 传值**：V1→V2 或 V2→V1 传值需要兼容桥接，否则编译报错
- **根因**：AI 不清楚 V1 和 V2 的严格边界，生成了"看起来合理但编译报错"的混用代码

---
