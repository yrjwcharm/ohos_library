# ArkTS 语法规则快速参考

> 本文档是从 SKILL.md 移出的 ArkTS 核心约束摘要，用于快速查阅。完整规则详见 `references/lang-syntax/SKILL.md`。

---

## 静态类型约束（最高优先级）

- **禁止 `any` 和 `unknown`**：必须使用显式类型（`arkts-no-any-unknown`）
- **禁止 `var`**：使用 `let` 或 `const`（`arkts-no-var`）
- **禁止 `Symbol()` API**：不支持（`arkts-no-symbol`）
- **禁止私有标识符 `#`**：使用 `private` 关键字代替（`arkts-no-private-identifiers`）
- **禁止 `Object` 和 `Record`**：使用具体类型（`arkts-no-obj-literals`）
- **唯一命名**：类型和命名空间必须使用唯一名称（`arkts-unique-names`）

---

## 类型约束

- **禁止交叉类型**：使用继承代替（`arkts-no-intersection-types`）
- **禁止条件类型**：不支持（`arkts-no-conditional-types`）
- **禁止索引签名**：使用 `Map` 或具体类型（`arkts-no-indexed-signatures`）
- **禁止 this 类型注解**：不支持（`arkts-no-typing-with-this`）
- **禁止构造签名类型**：使用 `class`（`arkts-no-ctor-signatures-type`）
- **禁止调用签名类型**：使用 `class`（`arkts-no-call-signatures`）

---

## 类约束

- **禁止在构造函数中声明属性**：必须在类体中声明（`arkts-no-ctor-prop-decls`）
- **禁止多个静态块**：只允许一个静态块（`arkts-no-multiple-static-blocks`）
- **禁止接口构造签名**：不支持（`arkts-no-ctor-signatures-iface`）

---

## 函数约束

- **禁止函数表达式**：使用箭头函数或函数声明（`arkts-no-func-expressions`）
- **禁止 `arguments` 对象**：使用剩余参数 `...args`（`arkts-no-arguments`）
- **禁止泛函数类型**：使用具体类型（`arkts-no-generic-func-types`）

---

## 语句约束

- **禁止 `in` 操作符**：不支持（`arkts-no-in-operator`）
- **禁止 `delete` 操作符**：不支持（`arkts-no-delete`）
- **禁止解构赋值**：不支持（`arkts-no-destructuring`）
- **禁止 `eval`**：不支持（`arkts-no-eval`）
- **禁止 `with` 语句**：不支持（`arkts-no-with`）

---

## 声明式 UI 约束

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

---

## 快速检查清单

编码前检查：

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

---

## 常见错误示例

### 错误 1：使用 any 类型

```typescript
// ❌ 错误
catch(err) {  // err 默认为 any
  reject(err);
}

// ✅ 正确
catch(err: BusinessError) {
  reject(err);
}
```

### 错误 2：导入方式错误

```typescript
// ❌ 错误
import { picker } from '@ohos.file.picker';

// ✅ 正确
import picker from '@ohos.file.picker';  // 默认导入
```

### 错误 3：使用 Kit API 错误

```typescript
// ❌ 错误
import promptAction from '@ohos.arkui';  // 模块不存在

// ✅ 正确
import { promptAction } from '@kit.ArkUI';
```

### 错误 4：Button 属性错误

```typescript
// ❌ 错误
Button('选择图片')
  .disabled(this.isCompressing)  // Button 没有 disabled

// ✅ 正确
Button('选择图片')
  .enabled(!this.isCompressing)
```

---

## 参考

- **完整规则**：`references/lang-syntax/references/arkts-rules.md`
- **语法详细说明**：`references/lang-syntax/SKILL.md`