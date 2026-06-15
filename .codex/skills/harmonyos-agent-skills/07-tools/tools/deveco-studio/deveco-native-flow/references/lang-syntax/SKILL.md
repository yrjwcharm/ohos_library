---
name: lang-syntax
description: HarmonyOS ArkTS 语言语法规范知识库，涵盖类型约束、类约束、函数约束、模块约束、声明式UI语法、状态管理等核心规则。When to use: 在实现任何 HarmonyOS ArkTS 代码时都必须使用本 Skill，包括
    - 编写或生成 ArkTS 代码、
    - 编写/修改 struct/@Component、
    - 使用或接入组件、
    - 查阅或校验 ArkTS 规范、
    - 评审 ArkTS 代码、
    - 排查与 ArkTS 约束相关的问题。
trigger：ArkTS、HarmonyOS、鸿蒙、struct、@Component、@State、@Prop、@Link、声明式UI、类型约束、核心约束。
user-invocable: false
---

# ArkTS 语法规范 (lang-syntax)

## 推荐阅读顺序

- **必读**：核心约束摘要
- **按需**：类型约束 / 类约束 / 函数约束 / 模块约束
- **参考**：完整规则列表

## 核心约束摘要（硬约束）

生成或修改 ArkTS 代码前必须满足以下约束，详细条文见 `references/arkts-rules.md`。

### 静态类型约束（最高优先级）

- **禁止 `any` 和 `unknown`**：必须使用显式类型（`arkts-no-any-unknown`）
- **禁止 `var`**：使用 `let` 或 `const`（`arkts-no-var`）
- **禁止 `Symbol()` API**：不支持（`arkts-no-symbol`）
- **禁止私有标识符 `#`**：使用 `private` 关键字代替（`arkts-no-private-identifiers`）
- **禁止 `Object` 和 `Record`**：使用具体类型（`arkts-no-obj-literals`）
- **唯一命名**：类型和命名空间必须使用唯一名称（`arkts-unique-names`）

### 类型约束

- **禁止交叉类型**：使用继承代替（`arkts-no-intersection-types`）
- **禁止条件类型**：不支持（`arkts-no-conditional-types`）
- **禁止索引签名**：使用 `Map` 或具体类型（`arkts-no-indexed-signatures`）
- **禁止 this 类型注解**：不支持（`arkts-no-typing-with-this`）
- **禁止构造签名类型**：使用 `class`（`arkts-no-ctor-signatures-type`）
- **禁止调用签名类型**：使用 `class`（`arkts-no-call-signatures`）

### 类约束

- **禁止在构造函数中声明属性**：必须在类体中声明（`arkts-no-ctor-prop-decls`）
- **禁止多个静态块**：只允许一个静态块（`arkts-no-multiple-static-blocks`）
- **禁止接口构造签名**：不支持（`arkts-no-ctor-signatures-iface`）

### 函数约束

- **禁止函数表达式**：使用箭头函数或函数声明（`arkts-no-func-expressions`）
- **禁止 `arguments` 对象**：使用剩余参数 `...args`（`arkts-no-arguments`）
- **禁止泛函数类型**：使用具体类型（`arkts-no-generic-func-types`）

### 语句约束

- **禁止 `in` 操作符**：不支持（`arkts-no-in-operator`）
- **禁止 `delete` 操作符**：不支持（`arkts-no-delete`）
- **禁止解构赋值**：不支持（`arkts-no-destructuring`）
- **禁止 `eval`**：不支持（`arkts-no-eval`）
- **禁止 `with` 语句**：不支持（`arkts-no-with`）

### 声明式 UI 约束

- **@Component 装饰器**：每个 UI 组件必须使用 `@Component` 装饰器
- **struct 定义**：UI 组件必须定义为 `struct`
- **build 方法**：每个 `@Component` 必须有 `build()` 方法
- **状态装饰器**：
  - `@State`：组件内状态，双向绑定
  - `@Prop`：父组件单向传递
  - `@Link`：父子组件双向同步
  - `@Observed` + `@ObjectLink`：嵌套对象状态
  - `@Provide` + `@Consume`：跨层级状态
  - `@LocalStorageLink` / `@LocalStorageProp`：页面级状态
  - `@StorageLink` / `@StorageProp`：应用级状态

## 按场景索引（何时读哪一篇）

| 场景 | 阅读 |
|------|------|
| 编写类型定义 | references/arkts-rules.md - 类型约束部分 |
| 编写 class/struct | references/arkts-rules.md - 类约束部分 |
| 编写函数 | references/arkts-rules.md - 函数约束部分 |
| 编写模块 | references/arkts-rules.md - 模块约束部分 |
| 编写声明式 UI | references/arkts-rules.md - ArkUI 约束部分 |
| 完整规则查询 | references/arkts-rules.md |

## 文档目录

1. [ArkTS 完整规则参考](references/arkts-rules.md)

## 提交前/评审前检查清单

- [ ] 无 `any` / `unknown` 类型，已使用显式类型
- [ ] 无 `var`，已用 `let` 或 `const`
- [ ] 无 `#` 私有标识符，已用 `private`
- [ ] 无交叉类型，已用继承
- [ ] 无条件类型、索引签名
- [ ] 无构造函数属性声明，已在类体中声明
- [ ] 无函数表达式，已用箭头函数
- [ ] 无解构赋值
- [ ] 无 `in` / `delete` 操作符
- [ ] @Component struct 有 build() 方法
- [ ] 状态装饰器使用正确