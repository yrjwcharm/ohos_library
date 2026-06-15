## 1. 自定义组件基本约束

| 规则 | 说明 |
|------|------|
| struct 无继承 | 自定义组件基于 struct 实现，**不能有继承关系** |
| 禁止名称冲突 | 自定义组件名、类名、函数名**不得与系统组件名重复** |
| 单一 @Entry | 单个 UI 页面中**仅允许存在一个** @Entry 装饰的自定义组件 |
| @Component 与 @ComponentV2 互斥 | **无法同时使用** @ComponentV2 与 @Component 装饰同一个 struct |
| @ComponentV2 仅使用 V2 装饰器 | 在 @ComponentV2 中**只能**使用 @Local、@Param、@Once、@Event、@Provider、@Consumer 等 V2 装饰器，不支持 LocalStorage 等 V1 能力 |
| build() 必须定义 | 自定义组件**必须定义** build() 函数 |
| 成员函数/变量不建议 static | 自定义组件的成员函数和变量仅能从组件内部访问，**不建议声明为静态** |
| V1 不支持静态代码块 | 在 @Component 或 @CustomDialog 装饰的组件中，静态代码块**不会被执行**（API version 22 起编译告警）。@ComponentV2 支持 |
| 创建组件不需要 new | 创建组件时**不需要使用 new 关键字** |
| 箭头函数 this 规则 | 事件绑定**推荐使用箭头函数**；匿名函数在 ArkTS 中不允许使用 |
