# ArkTS 语法约束摘要

> 基于 `ArkTSLinter_1_1` 规则实现、配套规则标签以及一组最小样例整理。  
> 本文将 linter 中隐含的 ArkTS 语言约束整理为自然语言摘要，重点说明“允许什么、禁止什么、在什么条件下例外”，而不是解释源码实现流程。

本文是基于当前实现整理出的工程化摘要，不等同于官方语言规范全文，也不覆盖 UI ArkTS。对多文件模块、shared module 和 TS/ETS 互操作等场景，本文以规则源码为主要依据；对纯非 UI 单文件 `.ets` 场景，附录样例可用 `arkts-cli` 做复现检查。

## 1. 概述

从 `ArkTSLinter_1_1` 的规则集合看，ArkTS 并不是简单的 TypeScript 别名，而是建立在 TypeScript 语法表面之上的受限语言子集。它的核心倾向可以概括为：

- 追求显式、静态、可判定的类型表达。
- 明显压缩 JavaScript 的动态对象模型。
- 减少依赖复杂推断、结构类型兼容和运行时反射能力。
- 通过 `Sendable`、shared module 和 taskpool 规则，把并发与共享数据纳入语言约束的一部分。

因此，本文中的“语法知识点”包含三类内容：

- 纯语法限制：某类语法结构直接不支持。
- 类型系统限制：语法表面可写，但类型语义被收紧。
- 运行模型限制：围绕 `Sendable`、共享模块和并发函数的静态约束。

## 2. 规则阅读方法

本 linter 中的规则，不应一律理解成“绝对禁止”。从规则属性看，至少存在四种强度：

- 错误级禁止：出现即视为不符合 ArkTS 语法或语义要求。
- warning 级限制：语言仍认为该写法不理想或不推荐，但保留兼容空间。
- 条件允许：某个语法构造并非完全禁用，而是在少数上下文放宽。
- 迁移型规则：规则带有 `migratable` 属性，表示在非严格迁移模式下可能被跳过，但从语言规范角度仍属于 ArkTS 不推荐或不支持写法。

本文在后续章节中默认把错误级规则作为主规格，同时显式注明 warning 和条件放宽。

本文对证据来源使用以下固定口径：

- 规则源码：直接来自 `Problems.ts`、`CookBookMsg.ts`、`TypeScriptLinter.ts` 等实现或规则标签。
- 样例验证：可由 `examples/` 中的最小 `.ets` 样例配合 `arkts-cli` 复现。
- 推导说明：对多条规则做的保守归纳，用于解释边界，不应视为比实现更强的规范文本。

## 3. 声明与作用域

### 3.1 变量声明

规则定义：

- 变量声明必须使用 `let` 或 `const`，不能使用 `var`。
- 变量声明不支持解构形式，包括对象解构和数组解构。
- 变量若没有类型标注且没有初始化器，会被视为不合法，因为这会把类型确定交给隐式推断。
- 若变量推断结果落到 `any` 或 `unknown`，也不符合 ArkTS 的类型要求。
- 普通变量上的确定赋值断言 `!` 被视为 warning 级限制。

允许边界：

- 有显式类型，或有明确初始化器且推断结果不落入 `any` / `unknown` 时，可以省略类型标注。
- `catch` 子句中的异常变量是特例。由于 TypeScript 对该位置本身存在约束，linter 不把“省略异常变量类型”当作错误。

不允许写法：

```ts
var x = 1
let { a } = obj
let y!
let z
```

允许示例：

```ts
let count = 1
const label: string = "ok"
```

不允许示例：

```ts
var x = 1
let [a, b] = [1, 2]
```

证据：

- 规则源码：`arkts-no-var`、`arkts-no-destruct-decls`、`arkts-no-any-unknown`、`arkts-no-definite-assignment`
- 样例验证：`examples/allow_typed_object_literal_ok.ets`、`examples/forbid_var_fail.ets`、`examples/forbid_destructuring_decl_fail.ets`

### 3.2 参数声明

规则定义：

- 参数不支持解构形式。
- 构造函数参数属性不支持，不能在参数位置直接书写 `public`、`private`、`protected`、`readonly` 来声明成员。
- 省略参数类型后，如果推断链条落到 `any` / `unknown`，同样不符合 ArkTS 的显式类型要求。

允许边界：

- 普通参数可省略类型，但前提是推断结果稳定且不涉及 `any` / `unknown`。

### 3.3 函数声明与函数值

规则定义：

- 局部函数声明不支持。函数声明应位于源码顶层或命名空间模块块中。
- 函数表达式不支持，应优先使用箭头函数。
- 生成器函数不支持，因此 `yield` 表达式也不支持。
- 独立函数体内不允许使用 `this`。
- 函数若缺少显式返回类型，而返回值又依赖复杂调用推断，会被视为返回类型推断受限。

允许边界：

- 箭头函数本身是允许的。
- 返回类型并非一律必须显式书写；只有当推断结果不可靠、不可表达或签名本身缺少足够信息时，才被视为不符合要求。

不允许写法：

```ts
function outer() {
  function inner() {}
}

const f = function () {}
function* gen() {}
```

允许示例：

```ts
let inc = (x: number): number => {
  return x + 1
}
```

不允许示例：

```ts
function outer(): number {
  function inner(): number {
    return 1
  }
  return inner()
}
```

证据：

- 规则源码：`arkts-no-func-expressions`、`arkts-no-nested-funcs`、`arkts-no-generators`、`arkts-no-standalone-this`、`arkts-no-implicit-return-types`
- 样例验证：`examples/allow_arrow_function_ok.ets`、`examples/forbid_nested_function_fail.ets`

### 3.4 类声明

规则定义：

- 类表达式不支持，类应使用常规类声明。
- 一个类最多只允许一个静态代码块。
- 私有 `#identifier` 形式不支持。
- 类成员名称不得形成重复含义，包括普通标识符与私有名在去掉 `#` 后的冲突。
- 方法不允许被重新赋值。
- 不能把函数当作开放对象再追加属性。

允许边界：

- 类作为值并非一律报错，它属于 warning 级限制；ArkTS 倾向把类当作类型和构造器，而不是普通对象值。
- 某些动态或库类型上下文会放宽“类值使用”检查，但这不是常规 ArkTS 风格。

### 3.5 接口、枚举与命名空间

规则定义：

- 接口合并不支持，枚举合并不支持。
- 接口不能继承类。
- 接口继承多个父接口时，如果同名属性类型不一致，会被视为不合法。
- 命名空间不能作为普通对象使用。
- 命名空间内部只允许声明性成员；普通语句和空分号都不应出现。
- 简写 ambient module、带通配符的模块名、UMD 形式都不支持。

补充说明：

- ArkTS 对命名空间的态度更接近“历史兼容语法”，而不是推荐的模块组织方式。

### 3.6 唯一命名

规则定义：

- 类型、命名空间、类、函数、导入名等声明要求唯一。
- linter 明确不接受利用 TypeScript 声明合并来消解重复命名。

## 4. 表达式与语句

### 4.1 对象字面量

规则定义：

- 对象字面量不能无上下文自由出现；它应能对应某个显式声明的类或接口类型。
- 对象字面量不能拿来直接充当类型声明。
- 对象字面量属性名默认应是标识符。

允许边界：

- 在 `Record`、动态对象、库类型等少数上下文中，数字字面量属性名可以被放宽。
- 某些 struct 初始化场景允许对象字面量初始化。

特殊限制：

- 若对象字面量在联合类型上下文中同时匹配多个候选目标，并且这些候选属于静态 ArkTS 类型体系，则会被视为歧义对象字面量。
- 在 `Sendable` 目标类型上下文中，对象字面量初始化会直接触发 sendable 规则错误。

示例：

```ts
interface Point {
  x: number
  y: number
}

const p: Point = { x: 1, y: 2 }
```

```ts
// 不允许
const obj = { x: 1, y: 2 }
type T = { x: number }
```

边界示例：

```ts
interface Point {
  x: number
  y: number
}

let ok: Point = { x: 1, y: 2 }
```

```ts
let bad = { x: 1, y: 2 }
```

证据：

- 规则源码：`arkts-no-untyped-obj-literals`、`arkts-no-obj-literals-as-types`、`arkts-identifiers-as-prop-names`、`arkts-no-ambiguity-obj-literal`
- 样例验证：`examples/allow_typed_object_literal_ok.ets`、`examples/forbid_object_literal_no_context_fail.ets`

### 4.2 数组字面量

规则定义：

- 数组字面量必须由可推断元素组成。
- 若数组元素中出现无上下文的对象字面量，则数组整体会被视为不合法。

允许边界：

- 数组元素若已具有上下文类型，并且赋值关系可判定，则允许省略部分类型书写。
- 若数组目标类型是 `Sendable`，仍不能直接用数组字面量初始化。

允许示例：

```ts
let values: number[] = [1, 2, 3]
let first: number = values[0]
```

不允许示例：

```ts
let bad = [{ x: 1 }, { y: 2 }]
```

证据：

- 规则源码：`arkts-no-noninferrable-arr-literals`
- 样例验证：`examples/allow_array_element_access_ok.ets`
- 备注：数组中混入无上下文对象字面量与对象字面量规则共享同一约束逻辑，附录暂未提供独立最小样例。

### 4.3 属性访问与元素访问

规则定义：

- 计算属性名整体受限。
- 普通字段访问不鼓励用索引访问替代。
- 索引签名整体不支持，仅有少数特判上下文允许。

元素访问允许边界：

- 数组、元组、字符串、`Record`、`Map`、枚举、某些内建对象、某些库类型上允许元素访问。
- 其他普通类实例、接口实例或结构化对象，不能把索引访问当作常规字段访问机制。

计算属性名边界：

- 普通对象上的计算属性名并非全部禁止，而是需要满足“可静态判定为合法属性名”的条件。
- `Sendable` 类和 `Sendable` 接口中，计算属性名原则上不允许。
- 对 `@arkts.collections.d.ets` 中与 `Symbol.iterator` 相关的少数集合声明，存在专门豁免。

允许示例：

```ts
let values: number[] = [1, 2, 3]
let first: number = values[0]
```

```ts
let scores: Record<number, string> = {
  1: "one",
  2: "two"
}
console.log(scores[1])
```

不允许示例：

```ts
class Point {
  x: number = 1
}

let p: Point = new Point()
let bad = p["x"]
```

证据：

- 规则源码：`arkts-identifiers-as-prop-names`、`arkts-no-props-by-index`、`arkts-no-indexed-signatures`、`arkts-sendable-computed-prop-name`
- 样例验证：`examples/allow_array_element_access_ok.ets`、`examples/allow_record_numeric_key_ok.ets`、`examples/forbid_object_index_access_fail.ets`

### 4.4 赋值与结构操作

规则定义：

- 解构赋值不支持。
- `delete` 运算不支持。
- 逗号运算符仅允许出现在 `for` 循环初始化和增量位置。
- 对象展开不支持。
- 展开元素仅在数组或数组派生类型被展开到数组字面量或调用参数位置时允许。
- 原型链修改和 `prototype` 赋值不支持。
- 方法不能在赋值语句中被重绑定。

不允许示例：

```ts
class Point {
  x: number = 1
}

let p: Point = new Point()
delete p.x
```

证据：

- 规则源码：`arkts-no-destruct-assignment`、`arkts-no-delete`、`arkts-no-comma-outside-loops`、`arkts-no-spread`、`arkts-no-prototype-assignment`、`arkts-no-method-reassignment`
- 样例验证：`examples/forbid_delete_fail.ets`

### 4.5 运算符

规则定义：

- `in` 运算符不支持。
- `instanceof` 只部分支持。
- 一元 `+`、`-`、`~` 只接受数值类型。
- `typeof` 只允许出现在表达式上下文，不允许作为类型查询。
- `is` 类型谓词不支持。

`instanceof` 的边界：

- 左操作数必须是引用类型。
- 左操作数不能是原始类型。
- 左操作数不能把类型名当值来参与判断。
- `this instanceof X` 被保留为可接受场景。

允许示例：

```ts
let x: number = 1
let kind: string = typeof x
```

不允许示例：

```ts
class Point {
  x: number = 1
}

type PointCtor = typeof Point
```

```ts
class Point {
  x: number = 1
}

let p: Point = new Point()
let ok = "x" in p
```

证据：

- 规则源码：`arkts-no-in`、`arkts-instanceof-ref-types`、`arkts-no-polymorphic-unops`、`arkts-no-type-query`、`arkts-no-is`
- 样例验证：`examples/allow_typeof_expression_ok.ets`、`examples/forbid_type_query_fail.ets`、`examples/forbid_in_fail.ets`

### 4.6 控制流语句

规则定义：

- `for...in` 不支持。
- `with` 不支持。
- `throw` 不能抛出任意值，抛出的表达式必须是 `Error` 体系的类或接口实例。
- `catch` 子句不支持显式异常类型标注。

### 4.7 元属性、JSX 与错误抑制

规则定义：

- `new.target` 不支持。
- JSX 不支持，包括普通 JSX 元素和自闭合 JSX 元素。
- 关闭类型检查的注释指令不允许，包括 `@ts-nocheck`、`@ts-ignore`、`@ts-expect-error`。

补充说明：

- 这说明 ArkTS 不仅限制语法本身，也限制“绕过类型系统”的手段。

## 5. 类型系统

### 5.1 基础受限类型

规则定义：

- `any` 和 `unknown` 不被接受。
- `symbol` 类型不被接受，绝大多数 `Symbol` API 也不被接受。
- `this` 类型不支持。
- `ESObject` 属于受限类型，不是任意位置都能使用。

`ESObject` 的边界：

- 在变量、属性、参数、函数类型、部分返回类型、部分 `as` 断言等边界位置可能被容忍。
- 但对象字面量直接初始化 `ESObject`，或把 `ESObject` 广泛传播到静态类型空间，会触发 warning。

### 5.2 高级类型表达式

规则定义：

- 条件类型不支持。
- 映射类型不支持。
- 交叉类型不支持。
- 索引访问类型不支持。
- 对象字面量类型不支持。
- 调用签名不支持。
- 构造签名不支持。

构造签名的细分：

- 在类型字面量中的构造签名报 `ConstructorType`。
- 在接口中的构造签名报 `ConstructorIface`。
- 构造函数类型节点本身也属于不支持写法。

### 5.3 结构类型兼容

规则定义：

- ArkTS 不接受广义结构类型兼容模型。
- 当赋值主要依赖“成员形状相似”而不是显式声明关系时，linter 会把它视为结构类型风险。

规格含义：

- ArkTS 更倾向名义化关系、显式声明关系或更可预测的兼容关系。
- 这与 TypeScript 的“只要结构相容即可赋值”有明显差异。

### 5.4 类型断言

规则定义：

- 只接受 `as T` 语法，不接受尖括号断言。
- `as const` 不支持。
- 某些原始类型到装箱对象类型的断言被视为不合法，例如 `number as Number`、`boolean as Boolean`。

`Sendable` 相关断言边界：

- 把非 sendable 数据断言为 sendable 类型不允许。
- 把非 sendable 函数断言为 sendable 函数类型别名不允许。

不允许示例：

```ts
let pair = [1, 2] as const
```

证据：

- 规则源码：`arkts-as-casts`、`arkts-no-as-const`、`arkts-sendable-as-expr`、`arkts-sendable-function-as-expr`
- 样例验证：`examples/forbid_as_const_fail.ets`

### 5.5 泛型

规则定义：

- 泛型调用如果省略类型参数，而编译器推断出的类型参数中出现 `unknown`，则会触发错误。
- ArkTS 不是完全禁止泛型推断，而是禁止“不充分、不可接受”的推断。

### 5.6 返回类型推断

规则定义：

- 返回类型推断不是完全禁用，但被严格限制。
- 方法签名、环境声明、无函数体声明若缺少返回类型，通常会被直接视为不完整。
- 当函数返回值依赖另一个未显式标注返回类型的函数调用时，当前函数的返回类型推断会被认为不可靠。

允许边界：

- 简单、稳定、无需跨函数继续推断的返回值，仍可能被接受。
- 箭头函数在某些库类型上下文中允许更多推断空间。

### 5.7 工具类型

规则定义：

- 一批标准工具类型被直接限制，包括 `Awaited`、`Pick`、`Omit`、`Exclude`、`Extract`、`NonNullable`、`Parameters`、`ReturnType`、`InstanceType`、`ThisType` 等。
- `Partial<T>` 仅当 `T` 是类或接口时才可能被放宽；若 `T` 不是类或接口，则仍视为不支持。

## 6. 面向对象与对象模型

### 6.1 继承与实现

规则定义：

- `implements` 子句中不能写类类型，只能写接口。
- 接口不能继承类。

规格含义：

- ArkTS 不允许借助 TypeScript 把“类的实例形状”当作接口协议来复用。

### 6.2 类、命名空间、枚举作为值

规则定义：

- 命名空间不能作为对象值使用。
- 类作为对象值使用属于 warning 级限制。

差异说明：

- 命名空间作为值在 ArkTS 中属于明确错误。
- 类作为值更接近“保留兼容但不鼓励”的状态，尤其在动态或库类型上下文中可能放宽。

### 6.3 函数对象与反射式调用

规则定义：

- `Function.apply` 和 `Function.call` 不支持。
- `Function.bind` 是 warning 级限制。
- 在函数对象上声明属性不支持。

规格含义：

- ArkTS 不鼓励把函数当成具有可变对象行为的值，也不鼓励通过函数对象反射式改写调用语义。

边界示例：

```ts
let inc = (x: number): number => x + 1
```

```ts
let inc = (x: number): number => x + 1
let bound = inc.bind(undefined, 1)
```

证据：

- 规则源码：`arkts-no-func-apply-call`、`arkts-no-func-bind`、`arkts-no-func-props`
- 样例验证：`examples/warn_function_bind_warn.ets`
- 备注：`Function.bind` 在当前实现中属于 warning 级限制；最小样例同时可能伴随其他错误。

## 7. 模块与导入导出

### 7.1 基本导入导出

规则定义：

- `import` 必须位于文件前部，不能出现在其他声明或语句之后。
- `import =` 和 `require` 形式的导入赋值不支持。
- `export =` 不支持。
- import assertion 不支持。

动态 `import()` 的边界：

- 当前实现并未把动态 `import()` 本身作为核心禁止项。
- 但一旦第二参数对象中出现 `assert`，仍会触发 import assertion 错误。

示例说明：

```ts
import { foo } from "./foo"
```

```ts
// 不允许
const x = 1
import { foo } from "./foo"
```

```ts
// 不允许
import data from "./a.json" assert { type: "json" }
```

证据：

- 规则源码：`arkts-no-misplaced-imports`、`arkts-no-require`、`arkts-no-export-assignment`、`arkts-no-import-assertions`
- 备注：这些示例涉及多文件模块上下文，本文以规则源码为主要依据；附录未提供单文件独立样例。

### 7.2 特殊模块形式

规则定义：

- shorthand ambient module 不支持。
- 模块名中的通配符不支持。
- UMD 模块定义不支持。

### 7.3 TS/ETS 互操作

规则定义：

- 从 ETS 导入到 TS 时，只允许导入 `Sendable` 类和 `Sendable` 接口。
- TS 文件不能重导出 ETS 实体。
- 从 ETS 到 TS 的 namespace import 不支持。
- 从 ETS 到 TS 的副作用导入不支持。

## 8. 标准库与受限内建能力

### 8.1 受限标准库 API

规则定义：

- `eval` 不支持。
- `Object` 上大量动态元编程 API 被限制，包括 `assign`、`create`、`defineProperty`、`freeze`、`seal`、`setPrototypeOf` 等。
- `Reflect` 上与反射、原型、属性描述符相关的一批 API 被限制。
- `ProxyHandler` 上与代理陷阱直接对应的一批 API 被限制。
- `Symbol` / `SymbolConstructor` 相关使用整体受限。

### 8.2 `Symbol` 的边界

规则定义：

- `symbol` 类型本身不支持。
- `Symbol()` 相关 API 基本不支持。

允许边界：

- `Symbol.iterator` 存在专门允许列表。
- 某些集合声明文件中的迭代器计算属性存在特判。

## 9. `Sendable` 规则

`Sendable` 不是单一语法点，而是一组围绕“可共享、可并发传递数据”的静态规则。

### 9.1 什么可以被视为 sendable

从规则抽象看，下列类型可进入 sendable 判定：

- 基本原始类型及其空值形态。
- `@Sendable` 类。
- `@arkts.lang.d.ets` 中 `lang.ISendable` 体系接口及其派生类型。
- `@Sendable` 函数。
- `@Sendable` 函数类型别名。
- 所有成员都 sendable 的联合类型。
- `const enum` 在某些 sendable / shareable 场景中被视为允许。

### 9.2 `@Sendable` 装饰器

规则定义：

- `@Sendable` 只能用于 `class`、`function`、`typeAlias`。
- 用在其他声明位置，会直接报错。
- `@Sendable` 实体不能再附加其他非 sendable 装饰器。

版本门槛：

- 当 `compatibleSdkVersion` 低于 API 12 beta3 时，sendable 函数和 sendable type alias 仍被视为不可用。

### 9.3 `Sendable` 类

规则定义：

- 非 sendable 类不能继承或实现 sendable 类型。
- sendable 类可以实现接口，但继承时只能继承 sendable 类。
- sendable 类继承目标必须是真正的 sendable 类实体，不能通过局部变量或不透明中间值伪装继承目标。
- sendable 类字段必须显式书写类型。
- sendable 类字段类型必须是 sendable 类型。
- sendable 类中不允许使用确定赋值断言 `!`。
- sendable 类中不允许使用计算属性名。
- sendable 类型对象不能由对象字面量或数组字面量直接初始化。

允许示例：

```ts
@Sendable
class Box {
  value: number

  constructor(value: number) {
    this.value = value
  }
}
```

不允许示例：

```ts
@Sendable
class Box {
  value = 1
}
```

证据：

- 规则源码：`arkts-sendable-class-inheritance`、`arkts-sendable-prop-types`、`arkts-sendable-definite-assignment`、`arkts-sendable-generic-types`、`arkts-sendable-obj-init`、`arkts-sendable-explicit-field-type`
- 样例验证：`examples/allow_sendable_class_ok.ets`、`examples/forbid_sendable_missing_field_type_fail.ets`

### 9.4 `Sendable` 接口

规则定义：

- sendable 接口的属性类型必须是 sendable 类型。
- 如果属性类型引用类型别名，而该别名再带有非 sendable 泛型实参，会产生 warning。
- sendable 接口同样不允许计算属性名。

### 9.5 `Sendable` 泛型

规则定义：

- sendable 类型的泛型实参必须全部是 sendable 类型。
- sendable 类型参数的默认类型若不是 sendable 类型，也不合法。
- 该检查同时作用于类型引用和 `new` 表达式上的类型实参。

### 9.6 `Sendable` 闭包捕获

规则定义：

- sendable 类和 sendable 函数中，只允许捕获导入变量。
- 同文件外层局部变量、函数、类、接口、枚举、命名空间、参数等闭包捕获均受限制。

允许边界：

- 已导出的顶层声明、顶层 sendable 实体、`const enum` 成员存在特殊放宽。
- 属性访问中的属性名部分不会被当作闭包捕获对象。

### 9.7 `Sendable` 函数与 type alias

规则定义：

- `@Sendable` 函数只能带 `@Sendable` 装饰器。
- 如果某组重载函数整体被视为 sendable，则相关重载声明都需要显式带 `@Sendable`。
- sendable 函数不允许任意访问函数对象属性。
- `@Sendable` 类型别名只能声明为函数类型。
- sendable 函数类型别名的赋值右侧必须是 sendable 函数或 sendable 函数类型别名对象。
- 非 sendable 函数不能通过 `as` 断言转换成 sendable 函数类型。

## 10. shared module 与并发函数

### 10.1 shared module

识别方式：

- 文件在导入语句之后、第一条非导入语句位置出现 `"use shared"` 字面量时，被视为 shared module。

导入规则：

- shared module 不允许副作用导入，也就是不能写没有 `importClause` 的裸导入。

导出规则：

- shared module 只允许导出 shareable 实体。
- shareable 比 sendable 略宽，允许纯原始字面量类型和 `const enum`。
- `export * from ...` 不允许。
- `type alias` 导出若不可 shareable，可能降级为 warning，而不是错误。

示例说明：

```ts
"use shared"

export const VERSION: string = "1.0"
```

```ts
"use shared"

import "./side-effect-only"
```

```ts
"use shared"

export * from "./other"
```

证据：

- 规则源码：`arkts-no-side-effects-imports`、`arkts-shared-module-exports`、`arkts-shared-module-no-wildcard-export`
- 备注：这些示例依赖多文件模块布局，本文以规则源码为主要依据；附录未提供单文件独立样例。

### 10.2 taskpool 与并发函数

规则定义：

- 传给 taskpool 相关 API 的函数，必须是普通函数，并且带 `@Concurrent` 装饰器。
- 规则既作用于调用表达式，也作用于部分任务对象构造场景。

规格含义：

- ArkTS 不接受“只要是可调用值就能安全进入并发执行框架”的模型，而要求显式并发标记。

## 11. 规则强度说明

### 11.1 错误级规则

下列类型的规则应理解为默认错误级限制：

- `any` / `unknown`
- 条件类型、映射类型、交叉类型、索引访问类型
- `var`
- 解构声明、解构赋值、解构参数
- `delete`、`in`、`for...in`、`with`
- `throw` 任意值
- `JSX`
- `new.target`
- `Function.apply` / `Function.call`
- `import =`、`export =`、import assertion
- sendable 继承、属性、泛型、闭包捕获等核心规则

### 11.2 warning 级规则

以下规则在实现中明确标为 warning：

- 普通确定赋值断言 `DefiniteAssignment`
- `globalThis`
- `Function.bind`
- 类作为对象值 `ClassAsObject`
- `ESObject` 使用限制
- shared module 中不可 shareable 的 `type alias` 导出
- sendable 场景中某些类型别名参数问题 `SendablePropTypeWarning`

warning 示例：

```ts
let g = globalThis
```

证据：

- 规则源码：`arkts-no-definite-assignment`、`arkts-no-globalthis`、`arkts-no-func-bind`、`arkts-no-classes-as-obj`、`arkts-limited-esobj`、`arkts-shared-module-exports`、`arkts-sendable-prop-types`
- 样例验证：`examples/warn_global_this_warn.ets`
- 备注：warning 不会阻止 `Syntax Check: OK`。

### 11.3 条件允许规则

下列构造不是简单“全禁”：

- 对象字面量：在显式上下文类型、struct 初始化等场景可用。
- 数字属性名：在 `Record`、动态对象、库类型中可放宽。
- 元素访问：数组、元组、字符串、`Record`、`Map`、枚举等场景可用。
- `typeof`：表达式上下文允许，类型查询不允许。
- 泛型推断：稳定推断允许，推断到 `unknown` 时不允许。
- 动态 `import()`：本身未被当前规则直接否定，但 `assert` 选项不允许。

### 11.4 迁移型规则

以下规则带 `migratable` 属性，应理解为“规范上仍受限，但迁移模式下可能放宽”：

- 数字或字符串字面量属性名
- 私有 `#identifier`
- 重复命名
- `var`
- 参数属性
- 索引字段访问
- 函数表达式、类表达式
- `as` 类型断言
- 解构赋值、解构声明
- `catch` 类型标注
- `throw` 类型不当
- 局部函数
- 返回类型推断受限

## 12. 附录 A：规则标签索引

| 类别 | 代表标签 | 说明 |
| --- | --- | --- |
| 声明 | `arkts-no-var` | 禁止 `var` |
| 声明 | `arkts-no-destruct-decls` | 禁止解构变量声明 |
| 声明 | `arkts-no-destruct-params` | 禁止解构参数 |
| 声明 | `arkts-no-ctor-prop-decls` | 禁止构造参数属性 |
| 声明 | `arkts-no-private-identifiers` | 禁止私有 `#identifier` |
| 声明 | `arkts-unique-names` | 声明名必须唯一 |
| 声明 | `arkts-no-decl-merging` | 禁止声明合并 |
| 函数 | `arkts-no-func-expressions` | 禁止函数表达式 |
| 函数 | `arkts-no-class-literals` | 禁止类表达式 |
| 函数 | `arkts-no-nested-funcs` | 禁止局部函数声明 |
| 函数 | `arkts-no-generators` | 禁止生成器和 `yield` |
| 函数 | `arkts-no-standalone-this` | 独立函数中禁止 `this` |
| 函数 | `arkts-no-implicit-return-types` | 返回类型推断受限 |
| 函数 | `arkts-no-definite-assignment` | 普通变量上的确定赋值断言属于 warning 级限制 |
| 函数 | `arkts-no-func-props` | 禁止在函数对象上声明属性 |
| 对象 | `arkts-no-untyped-obj-literals` | 对象字面量必须有显式上下文类型 |
| 对象 | `arkts-no-noninferrable-arr-literals` | 数组字面量元素必须可推断 |
| 对象 | `arkts-no-obj-literals-as-types` | 禁止对象字面量类型 |
| 对象 | `arkts-no-ambiguity-obj-literal` | 禁止歧义对象字面量 |
| 对象 | `arkts-no-classes-as-obj` | 类作为对象值属于 warning 级限制 |
| 属性 | `arkts-identifiers-as-prop-names` | 属性名应为标识符 |
| 属性 | `arkts-no-props-by-index` | 普通字段禁止按索引访问 |
| 属性 | `arkts-no-indexed-signatures` | 禁止索引签名 |
| 属性 | `arkts-no-method-reassignment` | 禁止方法重绑定 |
| 属性 | `arkts-no-multiple-static-blocks` | 类最多只允许一个静态代码块 |
| 属性 | `arkts-no-spread` | 展开仅允许数组或数组派生类型 |
| 属性 | `arkts-no-prototype-assignment` | 禁止原型链或 `prototype` 赋值 |
| 命名空间 | `arkts-no-ns-as-obj` | 命名空间不能作为对象值 |
| 命名空间 | `arkts-no-ns-statements` | 命名空间中禁止非声明语句 |
| 运算符 | `arkts-no-delete` | 禁止 `delete` |
| 运算符 | `arkts-no-in` | 禁止 `in` |
| 运算符 | `arkts-instanceof-ref-types` | `instanceof` 只部分支持 |
| 运算符 | `arkts-no-polymorphic-unops` | 一元算术仅支持数值类型 |
| 运算符 | `arkts-no-comma-outside-loops` | 逗号运算符只允许出现在 `for` 循环中 |
| 运算符 | `arkts-no-is` | 禁止 `is` 类型谓词 |
| 类型 | `arkts-no-any-unknown` | 禁止 `any` / `unknown` |
| 类型 | `arkts-no-symbol` | 限制 `symbol` 和 `Symbol` |
| 类型 | `arkts-no-typing-with-this` | 禁止 `this` 类型 |
| 类型 | `arkts-no-conditional-types` | 禁止条件类型 |
| 类型 | `arkts-no-mapped-types` | 禁止映射类型 |
| 类型 | `arkts-no-intersection-types` | 禁止交叉类型 |
| 类型 | `arkts-no-aliases-by-index` | 禁止索引访问类型 |
| 类型 | `arkts-no-call-signatures` | 禁止调用签名 |
| 类型 | `arkts-no-ctor-signatures-type` | 禁止类型字面量中的构造签名 |
| 类型 | `arkts-no-ctor-signatures-iface` | 禁止接口构造签名 |
| 类型 | `arkts-no-ctor-signatures-funcs` | 禁止构造函数类型节点 |
| 类型 | `arkts-no-utility-types` | 限制标准工具类型 |
| 类型 | `arkts-no-structural-typing` | 禁止结构类型兼容 |
| 类型 | `arkts-no-inferred-generic-params` | 限制泛型参数推断 |
| 类型 | `arkts-strict-typing` | 强制严格类型检查 |
| 断言 | `arkts-as-casts` | 仅接受 `as T` |
| 断言 | `arkts-no-as-const` | 禁止 `as const` |
| 断言 | `arkts-sendable-as-expr` | 禁止把非 sendable 数据断言为 sendable |
| 模块 | `arkts-no-misplaced-imports` | `import` 必须前置 |
| 模块 | `arkts-no-require` | 禁止 `require`/`import =` |
| 模块 | `arkts-no-export-assignment` | 禁止 `export =` |
| 模块 | `arkts-no-import-assertions` | 禁止 import assertion |
| 模块 | `arkts-no-special-imports` | 禁止特殊 `import type` 形式 |
| 模块 | `arkts-no-special-exports` | 禁止特殊 `export type` 形式 |
| 模块 | `arkts-no-ambient-decls` | 禁止 shorthand ambient module |
| 模块 | `arkts-no-module-wildcards` | 禁止模块名通配符 |
| 模块 | `arkts-no-umd` | 禁止 UMD |
| 模块 | `arkts-no-ts-deps` | 禁止依赖 TypeScript 代码 |
| 模块 | `arkts-no-ts-import-ets` | TS 导入 ETS 时只允许 sendable 类和接口 |
| 模块 | `arkts-no-ts-sendable-type-inheritance` | TS 中禁止在继承或实现子句中使用 sendable 类型 |
| 模块 | `arkts-no-dts-sendable-type-export` | sdk ts 文件中禁止导出 sendable 类和接口 |
| 模块 | `arkts-no-ts-re-export-ets` | TS 中禁止重导出 ETS 实体 |
| 模块 | `arkts-no-namespace-import-in-ts-import-ets` | TS 从 ETS 导入时禁止 namespace import |
| 标准库 | `arkts-limited-stdlib` | 限制动态标准库 API |
| 标准库 | `arkts-limited-esobj` | 限制 `ESObject` |
| 函数对象 | `arkts-no-func-apply-call` | 禁止 `Function.apply` / `call` |
| 函数对象 | `arkts-no-func-bind` | 限制 `Function.bind` |
| JSX | `arkts-no-jsx` | 禁止 JSX |
| 元属性 | `arkts-no-new-target` | 禁止 `new.target` |
| 类型检查 | `arkts-strict-typing-required` | 禁止 `@ts-ignore` 等抑制注释 |
| 语句 | `arkts-no-destruct-assignment` | 禁止解构赋值 |
| 语句 | `arkts-no-for-in` | 禁止 `for...in` |
| 语句 | `arkts-no-with` | 禁止 `with` |
| 语句 | `arkts-no-types-in-catch` | 禁止 `catch` 子句显式类型标注 |
| 语句 | `arkts-limited-throw` | `throw` 不能抛出任意值 |
| 枚举 | `arkts-no-enum-mixed-types` | 枚举成员初始化必须是同类型编译期表达式 |
| 枚举 | `arkts-no-enum-merging` | 禁止枚举合并 |
| 继承 | `arkts-implements-only-iface` | `implements` 子句中只能写接口 |
| 继承 | `arkts-extends-only-class` | 接口不能继承类 |
| 继承 | `arkts-no-extend-same-prop` | 接口多继承时禁止同名不兼容成员 |
| Sendable | `arkts-sendable-class-inheritance` | sendable 继承受限 |
| Sendable | `arkts-sendable-prop-types` | sendable 属性类型必须可发送 |
| Sendable | `arkts-sendable-definite-assignment` | sendable 类中禁止 `!` |
| Sendable | `arkts-sendable-generic-types` | sendable 泛型实参必须可发送 |
| Sendable | `arkts-sendable-imported-variables` | sendable 类只允许捕获导入变量 |
| Sendable | `arkts-sendable-class-decorator` | sendable 类只允许 `@Sendable` |
| Sendable | `arkts-sendable-obj-init` | sendable 类型禁止字面量初始化 |
| Sendable | `arkts-sendable-computed-prop-name` | sendable 类型禁止计算属性名 |
| Sendable | `arkts-sendable-decorator-limited` | `@Sendable` 只能用于 class/function/typeAlias |
| Sendable | `arkts-sendable-beta-compatible` | API 12 beta3 之前 sendable function/typeAlias 不可用 |
| Sendable 函数 | `arkts-sendable-function-imported-variables` | sendable 函数只允许捕获导入变量 |
| Sendable 函数 | `arkts-sendable-function-decorator` | sendable 函数只允许 `@Sendable` |
| Sendable 函数 | `arkts-sendable-function-overload-decorator` | sendable 重载函数的每个声明都要显式 `@Sendable` |
| Sendable 函数 | `arkts-sendable-function-property` | 限制 sendable 函数属性访问 |
| Sendable 函数 | `arkts-sendable-function-as-expr` | 禁止把非 sendable 函数断言为 sendable type alias |
| Sendable 别名 | `arkts-sendable-typealias-decorator` | sendable type alias 只允许 `@Sendable` |
| Sendable 别名 | `arkts-sendable-typeAlias-declaration` | sendable type alias 只能是函数类型 |
| Sendable 赋值 | `arkts-sendable-function-assignment` | sendable 函数类型赋值受限 |
| shared module | `arkts-no-side-effects-imports` | 共享模块禁止副作用导入 |
| shared module | `arkts-shared-module-exports` | 共享模块只能导出 shareable 实体 |
| shared module | `arkts-shared-module-no-wildcard-export` | 共享模块禁止 `export *` |
| 并发 | `arkts-taskpool-concurrent-function-args` | taskpool 参数必须是 `@Concurrent` 普通函数 |

## 13. 附录 B：按语法构造速查

- 声明：`var`、解构声明、参数属性、局部函数、类表达式、函数表达式、重复命名。
- 类型表达式：`any`、`unknown`、`symbol`、`this` 类型、条件类型、映射类型、交叉类型、索引访问类型、对象字面量类型、调用签名、构造签名、受限工具类型。
- 运算符：`delete`、`in`、部分 `instanceof`、一元 `+/-/~`、类型查询 `typeof`、`is`。
- 语句：`for...in`、`with`、受限 `throw`、带类型的 `catch`。
- 模块：前置 `import`、禁止 `require` / `import =` / `export =` / import assertion / ambient module / UMD。
- 对象模型：属性名必须静态可判定、索引访问受限、原型改写受限、函数对象反射式调用受限。
- 并发与共享：`Sendable`、shared module、taskpool 并发函数。

## 14. 附录 C：样例与复现方法

以下样例可用于复现本文中已经给出“样例验证”结论的单文件场景：

| 示例文件 | 预期 | 代表诊断或结果 |
| --- | --- | --- |
| `examples/allow_typed_object_literal_ok.ets` | 允许 | `Syntax Check: OK` |
| `examples/allow_array_element_access_ok.ets` | 允许 | `Syntax Check: OK` |
| `examples/allow_typeof_expression_ok.ets` | 允许 | `Syntax Check: OK` |
| `examples/allow_arrow_function_ok.ets` | 允许 | `Syntax Check: OK` |
| `examples/allow_sendable_class_ok.ets` | 允许 | `Syntax Check: OK` |
| `examples/allow_record_numeric_key_ok.ets` | 允许 | `Syntax Check: OK` |
| `examples/forbid_var_fail.ets` | 报错 | `arkts-no-var` |
| `examples/forbid_destructuring_decl_fail.ets` | 报错 | `arkts-no-destruct-decls` |
| `examples/forbid_object_literal_no_context_fail.ets` | 报错 | `arkts-no-untyped-obj-literals` |
| `examples/forbid_object_index_access_fail.ets` | 报错 | `arkts-no-props-by-index` |
| `examples/forbid_type_query_fail.ets` | 报错 | `arkts-no-type-query` |
| `examples/forbid_nested_function_fail.ets` | 报错 | `arkts-no-nested-funcs` |
| `examples/forbid_as_const_fail.ets` | 报错 | `arkts-no-as-const` |
| `examples/forbid_delete_fail.ets` | 报错 | `arkts-no-delete` |
| `examples/forbid_in_fail.ets` | 报错 | `arkts-no-in` |
| `examples/forbid_sendable_missing_field_type_fail.ets` | 报错 | `arkts-sendable-explicit-field-type` |
| `examples/warn_global_this_warn.ets` | warning | `arkts-no-globalthis`，整体仍 `Syntax Check: OK` |
| `examples/warn_function_bind_warn.ets` | warning | 命中 `arkts-no-func-bind`，并可能伴随其他错误 |

通用复现命令：

```bash
node ./arkts-cli/bin/arkts-cli.js \
  --input third_party/typescript/src/linter/ArkTSLinter_1_1/examples/<file>.ets \
  --out-dir <tmp-dir>
```

说明：

- `arkts-cli` 当前只覆盖纯非 UI `.ets` 单文件场景。
- 多文件模块、shared module 和 TS/ETS 互操作规则主要依据规则源码，不在本附录的单文件复现范围内。

## 15. 结论

如果只看这套 linter 反映出的语言边界，ArkTS 的核心不是“尽可能兼容 TypeScript”，而是在 TypeScript 的语法外壳里保留一套更可控、更静态、更适合并发与跨模块共享的数据模型。

它鼓励：

- 显式类型
- 明确继承关系
- 类和接口建模
- 保守的对象使用方式
- 受控的并发数据流

本文适合用作当前实现下的规则摘要、样例索引和工程实践速查；它不应替代官方语言规范、SDK 文档或未来版本实现说明。

它压缩：

- 动态对象塑形
- 结构类型随意兼容
- 运行时反射
- 靠注释关闭类型系统
- 靠复杂推断省略规格

如果后续还要继续细化，最有价值的下一步不是继续扩充禁止项，而是补一份“ArkTS 中推荐的正向写法清单”，把可接受的函数、类、对象、模块和 `Sendable` 设计模式正向整理出来。
