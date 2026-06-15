# ArkTS Rules Reference

Huawei HarmonyOS ArkTS Rules 完整规则参考文档。

---

## Rule Index

**Total: 83 rules (78 rules with FaultID mapping + 5 additional rules defined in cookBookTag: 118, 127, 147, 152, 153)**

| Ref | Rule Tag | Severity | Migratable | Description | FaultID |
|-----|----------|----------|------------|-------------|---------|
| 1 | `arkts-identifiers-as-prop-names` | ERROR | Yes | Objects with property names that are not identifiers are not supported |
| 2 | `arkts-no-symbol` | ERROR | - | `Symbol()` API is not supported |
| 3 | `arkts-no-private-identifiers` | ERROR | Yes | Private `#` identifiers are not supported |
| 4 | `arkts-unique-names` | ERROR | Yes | Use unique names for types and namespaces |
| 5 | `arkts-no-var` | ERROR | Yes | Use `let` instead of `var` |
| 8 | `arkts-no-any-unknown` | ERROR | - | Use explicit types instead of `any`, `unknown` |
| 14 | `arkts-no-call-signatures` | ERROR | - | Use `class` instead of a type with call signature |
| 15 | `arkts-no-ctor-signatures-type` | ERROR | - | Use `class` instead of a type with constructor signature |
| 16 | `arkts-no-multiple-static-blocks` | ERROR | - | Only one static block is supported |
| 17 | `arkts-no-indexed-signatures` | ERROR | - | Indexed signatures are not supported |
| 19 | `arkts-no-intersection-types` | ERROR | - | Use inheritance instead of intersection types |
| 21 | `arkts-no-typing-with-this` | ERROR | - | Type notation using `this` is not supported |
| 22 | `arkts-no-conditional-types` | ERROR | - | Conditional types are not supported |
| 25 | `arkts-no-ctor-prop-decls` | ERROR | Yes | Declaring fields in `constructor` is not supported |
| 27 | `arkts-no-ctor-signatures-iface` | ERROR | - | Construct signatures are not supported in interfaces |
| 28 | `arkts-no-aliases-by-index` | ERROR | - | Indexed access types are not supported |
| 29 | `arkts-no-props-by-index` | ERROR | Yes | Indexed access is not supported for fields |
| 30 | `arkts-no-structural-typing` | ERROR | - | Structural typing is not supported |
| 34 | `arkts-no-inferred-generic-params` | ERROR | Yes | Type inference in case of generic function calls is limited |
| 37 | `arkts-no-regexp-literals` | ERROR | - | RegExp literals are not supported |
| 38 | `arkts-no-untyped-obj-literals` | ERROR | - | Object literal must correspond to some explicitly declared class or interface |
| 40 | `arkts-no-obj-literals-as-types` | ERROR | - | Object literals cannot be used as type declarations |
| 43 | `arkts-no-noninferrable-arr-literals` | ERROR | - | Array literals must contain elements of only inferrable types |
| 46 | `arkts-no-func-expressions` | ERROR | Yes | Use arrow functions instead of function expressions |
| 49 | `arkts-no-generic-lambdas` | ERROR | Yes | Use generic functions instead of generic arrow functions |
| 50 | `arkts-no-class-literals` | ERROR | Yes | Class literals are not supported |
| 51 | `arkts-implements-only-iface` | ERROR | - | Classes cannot be specified in `implements` clause |
| 52 | `arkts-no-method-reassignment` | ERROR | - | Reassigning object methods is not supported |
| 53 | `arkts-as-casts` | ERROR | Yes | Only `as T` syntax is supported for type casts |
| 54 | `arkts-no-jsx` | ERROR | - | JSX expressions are not supported |
| 55 | `arkts-no-polymorphic-unops` | ERROR | - | Unary operators `+`, `-` and `~` work only on numbers |
| 59 | `arkts-no-delete` | ERROR | - | `delete` operator is not supported |
| 60 | `arkts-no-type-query` | ERROR | - | `typeof` operator is allowed only in expression contexts |
| 65 | `arkts-instanceof-ref-types` | ERROR | - | `instanceof` operator is partially supported |
| 66 | `arkts-no-in` | ERROR | - | `in` operator is not supported |
| 69 | `arkts-no-destruct-assignment` | ERROR | Yes | Destructuring assignment is not supported |
| 71 | `arkts-no-comma-outside-loops` | ERROR | - | The comma operator `,` is supported only in `for` loops |
| 74 | `arkts-no-destruct-decls` | ERROR | Yes | Destructuring variable declarations are not supported |
| 79 | `arkts-no-types-in-catch` | ERROR | Yes | Type annotation in catch clause is not supported |
| 80 | `arkts-no-for-in` | ERROR | - | `for .. in` is not supported |
| 83 | `arkts-no-mapped-types` | ERROR | - | Mapped type expression is not supported |
| 84 | `arkts-no-with` | ERROR | - | `with` statement is not supported |
| 87 | `arkts-limited-throw` | ERROR | Yes | `throw` statements cannot accept values of arbitrary types |
| 90 | `arkts-no-implicit-return-types` | ERROR | Yes | Function return type inference is limited |
| 91 | `arkts-no-destruct-params` | ERROR | - | Destructuring parameter declarations are not supported |
| 92 | `arkts-no-nested-funcs` | ERROR | Yes | Nested functions are not supported |
| 93 | `arkts-no-standalone-this` | ERROR | - | Using `this` inside stand-alone functions is not supported |
| 94 | `arkts-no-generators` | ERROR | - | Generator functions are not supported |
| 96 | `arkts-no-is` | ERROR | - | Type guarding is supported with `instanceof` and `as` |
| 99 | `arkts-no-spread` | ERROR | - | It is possible to spread only arrays or classes derived from arrays into the rest parameter or array literals |
| 102 | `arkts-no-extend-same-prop` | ERROR | - | Interface can not extend interfaces with the same method |
| 103 | `arkts-no-decl-merging` | ERROR | - | Declaration merging is not supported |
| 104 | `arkts-extends-only-class` | ERROR | - | Interfaces cannot extend classes |
| 106 | `arkts-no-ctor-signatures-funcs` | ERROR | - | Constructor function type is not supported |
| 111 | `arkts-no-enum-mixed-types` | ERROR | - | Enumeration members can be initialized only with compile time expressions of the same type |
| 113 | `arkts-no-enum-merging` | ERROR | - | `enum` declaration merging is not supported |
| 114 | `arkts-no-ns-as-obj` | ERROR | - | Namespaces cannot be used as objects |
| 116 | `arkts-no-ns-statements` | ERROR | - | Non-declaration statements in namespaces are not supported |
| 118 | `arkts-no-special-imports` | ERROR | - | Special import type declarations are not supported |
| 119 | `arkts-no-side-effects-imports` | ERROR | - | Importing a module for side-effects only is not supported |
| 120 | `arkts-no-import-default-as` | ERROR | Yes | `import default as ...` is not supported |
| 121 | `arkts-no-require` | ERROR | - | `require` and `import` assignment are not supported |
| 126 | `arkts-no-export-assignment` | ERROR | - | `export = ...` assignment is not supported |
| 127 | `arkts-no-special-exports` | ERROR | - | Special `export type` declarations are not supported |
| 128 | `arkts-no-ambient-decls` | ERROR | - | Ambient module declaration is not supported |
| 129 | `arkts-no-module-wildcards` | ERROR | - | Wildcards in module names are not supported |
| 130 | `arkts-no-umd` | ERROR | - | Universal module definitions (UMD) are not supported |
| 132 | `arkts-no-new-target` | ERROR | - | `new.target` is not supported |
| 134 | `arkts-no-definite-assignment` | WARNING | - | Definite assignment assertions are not supported |
| 136 | `arkts-no-prototype-assignment` | ERROR | - | Prototype assignment is not supported |
| 137 | `arkts-no-globalthis` | ERROR | - | `globalThis` is not supported |
| 138 | `arkts-no-utility-types` | ERROR | - | Some of utility types are not supported |
| 139 | `arkts-no-func-props` | ERROR | - | Declaring properties on functions is not supported |
| 140 | `arkts-no-func-apply-bind-call` | ERROR | - | `Function.apply`, `Function.bind`, `Function.call` are not supported |
| 142 | `arkts-no-as-const` | ERROR | - | `as const` assertions are not supported |
| 143 | `arkts-no-import-assertions` | ERROR | - | Import assertions are not supported |
| 144 | `arkts-limited-stdlib` | ERROR | - | Usage of standard library is restricted |
| 145 | `arkts-strict-typing` | ERROR | - | Strict type checking is enforced |
| 146 | `arkts-strict-typing-required` | ERROR | - | Switching off type checks with in-place comments is not allowed |
| 147 | `arkts-no-ts-deps` | ERROR | - | No dependencies on TypeScript code are currently allowed |
| **148** | `arkts-no-decorators-except-arkui` | **WARNING** | - | No decorators except ArkUI decorators are currently allowed |
| 149 | `arkts-no-classes-as-obj` | ERROR | - | Classes cannot be used as objects |
| 150 | `arkts-no-misplaced-imports` | ERROR | - | `import` statements after other statements are not allowed |
| **151** | `arkts-limited-esobj` | **WARNING** | - | Usage of `ESObject` type is restricted |
| **152** | `arkts-obj-prop-quoted` | **WARNING** | - | Object property names should be quoted |
| **153** | `arkts-prefer-undefined` | **WARNING** | - | Prefer `undefined` over `null`, convert external nulls with `?? undefined` |

---

## Rule Details by Category

### 1. Type System Rules

#### Rule 8: Use explicit types instead of `any`, `unknown` (`arkts-no-any-unknown`)
- **Severity**: ERROR
- **FaultID**: AnyType (0), UnknownType (18)
- **Description**: ArkTS forbids the use of `any` and `unknown` types.
- **Bad Example**:
  ```typescript
  let x: any;
  const y: unknown = getValue();
  ```
- **Good Example**:
  ```typescript
  let x: string;
  const y: string = getValue();
  ```

#### Rule 22: Conditional types are not supported (`arkts-no-conditional-types`)
- **Severity**: ERROR
- **FaultID**: ConditionalType (43)
- **Description**: Conditional types like `T extends U ? X : Y` are not supported.
- **Bad Example**:
  ```typescript
  type MyType<T> = T extends string ? string : number;
  ```

#### Rule 83: Mapped type expression is not supported (`arkts-no-mapped-types`)
- **Severity**: ERROR
- **FaultID**: MappedType (44)
- **Description**: Mapped types are not supported.
- **Bad Example**:
  ```typescript
  type Readonly<T> = { readonly [P in keyof T]: T[P] };
  ```

---

### 2. Utility Types Restrictions

#### Rule 138: Some of utility types are not supported (`arkts-no-utility-types`)
- **Severity**: ERROR
- **FaultID**: UtilityType (72)
- **CookBookRef**: 138
- **Description**: Only limited TypeScript utility types are supported.

**Supported Utility Types:**
| Type | Description |
|------|-------------|
| `Awaited<T>` | Unwraps the awaited type of a Promise |
| `Pick<T, K>` | Constructs a type by picking the set of properties K from T |
| `Omit<T, K>` | Constructs a type by omitting the set of properties K from T |
| `Exclude<T, U>` | Constructs a type by excluding from T all properties that are assignable to U |
| `Extract<T, U>` | Constructs a type by extracting from T all properties that are assignable to U |
| `NonNullable<T>` | Constructs a type by excluding null and undefined from T |
| `Parameters<T>` | Constructs a tuple type from the types used in the parameters of a function type T |
| `ConstructorParameters<T>` | Constructs a tuple or array type from the types of a constructor function type |
| `ReturnType<T>` | Constructs a type consisting of the return type of function T |
| `InstanceType<T>` | Constructs a type consisting of the instance type of a constructor function type T |
| `ThisParameterType<T>` | Extracts the type of the this parameter for a function type |
| `OmitThisParameter<T>` | Removes the this parameter from a function type |
| `ThisType<T>` | Marker for contextual this type |
| `Uppercase<S>` | Transforms a string literal type to uppercase |
| `Lowercase<S>` | Transforms a string literal type to lowercase |
| `Capitalize<S>` | Transforms the first character of a string literal type to uppercase |
| `Uncapitalize<S>` | Transforms the first character of a string literal type to lowercase |

**Not Supported:** `Partial<T>`, `Required<T>`, `Readonly<T>`, `Record<K, T>`, `Infer`, etc.

---

### 3. Standard Library API Restrictions (Rule 144)

#### Rule 144: Usage of standard library is restricted (`arkts-limited-stdlib`)
- **Severity**: ERROR
- **FaultID**: LimitedStdLibApi (78)
- **CookBookRef**: 144
- **Description**: Many JavaScript standard library APIs are restricted in ArkTS for performance and security reasons.

#### Restricted Global Functions
```javascript
["eval"]
```

#### Restricted Object APIs
```javascript
[
  "__proto__", "__defineGetter__", "__defineSetter__", "__lookupGetter__", "__lookupSetter__",
  "assign", "create",
  "defineProperties", "defineProperty", "freeze", "fromEntries", "getOwnPropertyDescriptor",
  "getOwnPropertyDescriptors", "getOwnPropertySymbols", "getPrototypeOf", "hasOwnProperty", "is",
  "isExtensible", "isFrozen", "isPrototypeOf", "isSealed", "preventExtensions", "propertyIsEnumerable",
  "seal", "setPrototypeOf"
]
```

**Examples:**
- ❌ `Object.assign(target, source)` - Use spread syntax `...` instead
- ❌ `Object.create(proto)` - Not supported
- ❌ `Object.freeze(obj)` - Not supported
- ❌ `Object.defineProperty(obj, prop, descriptor)` - Not supported

#### Restricted Reflect APIs
```javascript
[
  "apply", "construct", "defineProperty", "deleteProperty", "getOwnPropertyDescriptor",
  "getPrototypeOf", "isExtensible", "preventExtensions", "setPrototypeOf"
]
```

#### Restricted Proxy Handler APIs
```javascript
[
  "apply", "construct", "defineProperty", "deleteProperty", "get", "getOwnPropertyDescriptor",
  "getPrototypeOf", "has", "isExtensible", "ownKeys", "preventExtensions", "set", "setPrototypeOf"
]
```

#### Restricted Symbol APIs
Only `Symbol.iterator` is allowed. All other `Symbol` APIs are restricted.

---

### 4. Function Rules

#### Rule 46: Use arrow functions instead of function expressions (`arkts-no-func-expressions`)
- **Severity**: ERROR
- **FaultID**: FunctionExpression (22)
- **Migratable**: Yes
- **Bad Example**:
  ```typescript
  const fn = function(x: number): number { return x * 2; };
  ```
- **Good Example**:
  ```typescript
  const fn = (x: number): number => { return x * 2; };
  ```

#### Rule 92: Nested functions are not supported (`arkts-no-nested-funcs`)
- **Severity**: ERROR
- **FaultID**: LocalFunction (42)
- **Migratable**: Yes
- **Bad Example**:
  ```typescript
  function outer() {
    const value = 10;
    function inner() {  // ❌ Nested function
      console.log(value);
    }
    inner();
  }
  ```
- **Good Example**:
  ```typescript
  function outer() {
    const value = 10;
    const inner = (): void => {  // ❌ Still nested, but arrow
      console.log(value);
    };
    inner();
  }
  ```
- **Note**: In ArkTS, functions cannot be nested. Use lambdas (arrow functions) at top-level or as class methods only.

#### Rule 93: Using `this` inside stand-alone functions is not supported (`arkts-no-standalone-this`)
- **Severity**: ERROR
- **FaultID**: FunctionContainsThis (49)
- **Bad Example**:
  ```typescript
  const obj = {
    value: 10,
    fn: function() {
      console.log(this.value);  // ❌
    }
  };
  ```
- **Good Example**:
  ```typescript
  class MyClass {
    value: number = 10;
    fn(): void {
      console.log(this.value);  // ✅
    }
  }
  ```

#### Rule 140: `Function.apply`, `Function.bind`, `Function.call` are not supported (`arkts-no-func-apply-bind-call`)
- **Severity**: ERROR
- **FaultID**: FunctionApplyBindCall (74)
- **Bad Examples**:
  ```typescript
  function greet(greeting: string, name: string): string {
    return `${greeting}, ${name}!`;
  }

  greet.apply(null, ["Hello", "World"]);      // ❌
  const boundGreet = greet.bind(null, "Hi"); // ❌
  greet.call(null, "Hello", "World");       // ❌
  ```
- **Good Example**:
  ```typescript
  function greet(greeting: string, name: string): string {
    return `${greeting}, ${name}!`;
  }

  greet("Hello", "World");  // ✅ Direct call
  ```

---

### 5. Class Rules

#### Rule 149: Classes cannot be used as objects (`arkts-no-classes-as-obj`)
- **Severity**: ERROR
- **FaultID**: ClassAsObject (46)
- **Bad Example**:
  ```typescript
  class MyClass {
    static prop = 10;
  }

  MyClass.someMethod = () => {};  // ❌
  const obj = MyClass;            // ❌ Using class as object
  ```

#### Rule 51: Classes cannot be specified in `implements` clause (`arkts-implements-only-iface`)
- **Severity**: ERROR
- **FaultID**: ImplementsClass (53)
- **Bad Example**:
  ```typescript
  class Base {}
  class Derived implements Base {}  // ❌ Can only implement interfaces
  ```
- **Good Example**:
  ```typescript
  interface IBase {}
  class Derived implements IBase {}  // ✅
  class Derived2 extends Base {}     // ✅ Extends a class
  ```

---

### 6. Expression and Statement Rules

#### Rule 59: `delete` operator is not supported (`arkts-no-delete`)
- **Severity**: ERROR
- **FaultID**: DeleteOperator (33)
- **Bad Example**:
  ```typescript
  delete obj.property;  // ❌
  ```
- **Good Example**:
  ```typescript
  obj.property = undefined;  // ✅ Alternative
  ```

#### Rule 66: `in` operator is not supported (`arkts-no-in`)
- **Severity**: ERROR
- **FaultID**: InOperator (20)
- **Bad Example**:
  ```typescript
  if ("name" in obj) { ... }  // ❌
  ```
- **Good Example**:
  ```typescript
  if (obj.hasOwnProperty("name")) { ... }  // ✅ But hasOwnProperty is also restricted!
  if (obj.name !== undefined) { ... }     // ✅ Better alternative
  ```

#### Rule 69: Destructuring assignment is not supported (`arkts-no-destruct-assignment`)
- **Severity**: ERROR
- **FaultID**: DestructuringAssignment (29)
- **Migratable**: Yes
- **Bad Example**:
  ```typescript
  const obj = { a: 1, b: 2 };
  const { a, b } = obj;  // ❌
  ```

#### Rule 74: Destructuring variable declarations are not supported (`arkts-no-destruct-decls`)
- **Severity**: ERROR
- **FaultID**: DestructuringDeclaration (30)
- **Migratable**: Yes
- **Bad Example**:
  ```typescript
  function fn({ a, b }: { a: number; b: number }) { ... }  // ❌
  ```

#### Rule 80: `for .. in` is not supported (`arkts-no-for-in`)
- **Severity**: ERROR
- **FaultID**: ForInStatement (19)
- **Bad Example**:
  ```typescript
  for (const key in obj) { ... }  // ❌
  ```
- **Good Example**:
  ```typescript
  for (const item of array) { ... }  // ✅ Use for..of for arrays
  ```

#### Rule 84: `with` statement is not supported (`arkts-no-with`)
- **Severity**: ERROR
- **FaultID**: WithStatement (15)
- **Bad Example**:
  ```typescript
  with (obj) {
    console.log(property);  // ❌
  }
  ```

---

### 7. Decorators (Rule 148)

#### Rule 148: No decorators except ArkUI decorators are currently allowed (`arkts-no-decorators-except-arkui`)
- **Severity**: WARNING
- **FaultID**: UnsupportedDecorators (81)
- **Allowed ArkUI Decorators:**
  ```javascript
  [
    "AnimatableExtend", "Builder", "BuilderParam", "Component", "Concurrent", "Consume",
    "CustomDialog", "Entry", "Extend", "Link", "LocalStorageLink", "LocalStorageProp",
    "ObjectLink", "Observed", "Preview", "Prop", "Provide", "Reusable", "State",
    "StorageLink", "StorageProp", "Styles", "Watch", "Require", "Track"
  ]
  ```

**Usage Examples:**
```typescript
@Component  // ✅ Allowed
struct MyComponent {
  @State count: number = 0;  // ✅ Allowed
  @Prop message: string = '';  // ✅ Allowed

  build() {
    Text(`${this.message}, count: ${this.count}`)
  }
}
```

---

### 8. ESObject Type (Rule 151)

#### Rule 151: Usage of `ESObject` type is restricted (`arkts-limited-esobj`)
- **Severity**: WARNING
- **FaultID**: EsObjectType (83)
- **Description**: The `ESObject` type is used for JavaScript interop but should be avoided in pure ArkTS code.

#### Rule 152: Object property names should be quoted (`arkts-obj-prop-quoted`)
- **Severity**: WARNING
- **Description**: Object literal property names should be enclosed in quotes for consistency and to avoid potential issues with reserved words or special characters.

**Part 1: Object Property Naming**

- **Bad Example**:
  ```typescript
  // ❌ 错误
  const result: Record<string, Object> = {
    errorCode: 999,
    errorMsg: '降级',
    cardInfo: {},
    faceData: undefined
  };
  callback(result);
  ```
- **Good Example**:
  ```typescript
  // ✅ 正确
  const result: Record<string, Object> = {
    'errorCode': 999,
    'errorMsg': '降级',
    'cardInfo': {},
    'faceData': undefined
  };
  callback(result);
  ```

**Part 2: Map to Record Conversion**

`Map<string, string>` 不能直接赋值给 `Record<string, Object>`，需要遍历转换。

- **Bad Example**:
  ```typescript
  // ❌ 错误 - 类型不匹配
  const cardInfo: Record<string, Object> = new Map<string, string>();  // 错误
  ```
- **Good Example**:
  ```typescript
  // ✅ 正确 - 遍历转换
  const ocrResult: Map<string, string> = /*generate from other function*/;
  const cardInfo: Record<string, Object> = {};
  ocrResult.forEach((value, key) => {
    cardInfo[key] = value as Object;  // 需要类型断言
  });
  ```

#### Rule 153: Prefer `undefined` over `null` (`arkts-prefer-undefined`)
- **Severity**: WARNING
- **Description**: 在 ArkTS 中优先使用 `undefined` 而非 `null` 作为空值表示。`undefined` 是更安全的默认值，且与 ArkTS 的类型系统更兼容。对于外部可能返回 `null` 的 API，应使用 `?? undefined` 进行转换。

- **Bad Example**:
  ```typescript
  // ❌ 错误 - 直接使用可能为 null 的外部数据
  const value: string | null = externalApi.getValue();
  const result = someFunction(value);  // null 可能导致问题

  // ❌ 错误 - 主动使用 null
  let data: string | null = null;
  ```
- **Good Example**:
  ```typescript
  // ✅ 正确 - 使用 ?? undefined 转换外部 null 数据
  const value: string | undefined = externalApi.getValue() ?? undefined;
  const result = someFunction(value);  // 统一使用 undefined

  // ✅ 正确 - 优先使用 undefined
  let data: string | undefined = undefined;
  ```

---

### 9. Import/Export Rules

#### Rule 121: `require` and `import` assignment are not supported (`arkts-no-require`)
- **Severity**: ERROR
- **FaultID**: ImportAssignment (61)
- **Bad Examples**:
  ```typescript
  import iam = require("module");  // ❌
  export = something;              // ❌ (Rule 126)
  ```

#### Rule 150: `import` statements after other statements are not allowed (`arkts-no-misplaced-imports`)
- **Severity**: ERROR
- **FaultID**: ImportAfterStatement (82)
- **Bad Example**:
  ```typescript
  const x = 1;
  import { Something } from './module';  // ❌ Imports must come first
  ```
- **Good Example**:
  ```typescript
  import { Something } from './module';  // ✅ Imports first
  const x = 1;
  ```

---

### 10. Other Rules

#### Rule 5: Use `let` instead of `var` (`arkts-no-var`)
- **Severity**: ERROR
- **FaultID**: VarDeclaration (31)
- **Migratable**: Yes
- **Bad Example**:
  ```typescript
  var x = 10;  // ❌
  ```
- **Good Example**:
  ```typescript
  let x = 10;  // ✅
  ```

#### Rule 2: `Symbol()` API is not supported (`arkts-no-symbol`)
- **Severity**: ERROR
- **FaultID**: SymbolType (1)
- **Bad Example**:
  ```typescript
  const sym = Symbol('description');  // ❌
  ```
- **Exception**: `Symbol.iterator` is allowed for iteration protocol.

#### Rule 3: Private `#` identifiers are not supported (`arkts-no-private-identifiers`)
- **Severity**: ERROR
- **FaultID**: PrivateIdentifier (41)
- **Migratable**: Yes
- **Bad Example**:
  ```typescript
  class MyClass {
    #privateField: number = 0;  // ❌
  }
  ```

#### Rule 54: JSX expressions are not supported (`arkts-no-jsx`)
- **Severity**: ERROR
- **FaultID**: JsxElement (51)
- **Note**: ArkTS uses ArkUI declarative UI syntax instead of JSX.

#### Rule 132: `new.target` is not supported (`arkts-no-new-target`)
- **Severity**: ERROR
- **FaultID**: NewTarget (68)
- **Bad Example**:
  ```typescript
  class MyClass {
    constructor() {
      console.log(new.target);  // ❌
    }
  }
  ```

#### Rule 137: `globalThis` is not supported (`arkts-no-globalthis`)
- **Severity**: ERROR
- **FaultID**: GlobalThis (71)
- **Bad Example**:
  ```typescript
  globalThis.someValue = 10;  // ❌
  ```

---

## Standard Library Files Not Supported

HarmonyOS ArkTS does not support importing from these standard TypeScript library definition files:

```javascript
[
  "lib.dom.d.ts", "lib.dom.iterable.d.ts", "lib.webworker.d.ts", "lib.webworker.importscripd.ts",
  "lib.webworker.iterable.d.ts", "lib.scripthost.d.ts", "lib.decorators.d.ts", "lib.decorators.legacy.d.ts",
  "lib.es5.d.ts", "lib.es2015.core.d.ts", "lib.es2015.collection.d.ts", "lib.es2015.generator.d.ts",
  "lib.es2015.iterable.d.ts", "lib.es2015.promise.d.ts", "lib.es2015.proxy.d.ts", "lib.es2015.reflect.d.ts",
  "lib.es2015.symbol.d.ts", "lib.es2015.symbol.wellknown.d.ts", "lib.es2016.array.include.d.ts",
  "lib.es2017.object.d.ts", "lib.es2017.sharedmemory.d.ts", "lib.es2017.string.d.ts", "lib.es2017.intl.d.ts",
  "lib.es2017.typedarrays.d.ts", "lib.es2018.asyncgenerator.d.ts", "lib.es2018.asynciterable.d.ts",
  "lib.es2018.intl.d.ts", "lib.es2018.promise.d.ts", "lib.es2018.regexp.d.ts", "lib.es2019.array.d.ts",
  "lib.es2019.object.d.ts", "lib.es2019.string.d.ts", "lib.es2019.symbol.d.ts", "lib.es2019.intl.d.ts",
  "lib.es2020.bigint.d.ts", "lib.es2020.date.d.ts", "lib.es2020.promise.d.ts", "lib.es2020.sharedmemory.d.ts",
  "lib.es2020.string.d.ts", "lib.es2020.symbol.wellknown.d.ts", "lib.es2020.intl.d.ts", "lib.es2020.number.d.ts",
  "lib.es2021.promise.d.ts", "lib.es2021.string.d.ts", "lib.es2021.weakref.d.ts", "lib.es2021.intl.d.ts",
  "lib.es2022.array.d.ts", "lib.es2022.error.d.ts", "lib.es2022.intl.d.ts", "lib.es2022.object.d.ts",
  "lib.es2022.sharedmemory.d.ts", "lib.es2022.string.d.ts", "lib.es2022.regexp.d.ts", "lib.es2023.array.d.ts"
]
```

---

## Ignored Directories

The linter automatically ignores these directories:
- `node_modules`
- `oh_modules`
- `build`
- `.preview`

---

## Note on ArkTS Version

This document applies to:
- **ArkTSLinter_1_0** - Earlier version
- **ArkTSLinter_1_1** - Current version

The main difference between versions:
- Rule 140 changed from: `"Function.apply", "Function.bind", "Function.call" are not supported (arkts-no-func-apply-bind-call)`
  to in ArkTS 1.1: `'Function.bind' is not supported (arkts-no-func-bind)`

---

### 11. Additional Rules with Details

#### Rule 14: Use `class` instead of a type with call signature (`arkts-no-call-signatures`)
- **Severity**: ERROR
- **FaultID**: CallSignature (177)
- **Description**: Types with call signatures should be replaced with classes.
- **Bad Example**:
  ```typescript
  type Callable = {
    (x: number): string;
  };
  ```
- **Good Example**:
  ```typescript
  class Callable {
    call(x: number): string { return String(x); }
  }
  ```

#### Rule 15: Use `class` instead of a type with constructor signature (`arkts-no-ctor-signatures-type`)
- **Severity**: ERROR
- **FaultID**: ConstructorType (36)
- **Description**: Types with constructor signatures should be replaced with classes.
- **Bad Example**:
  ```typescript
  type ClassType = {
    new (name: string): MyClass;
  };
  ```

#### Rule 16: Only one static block is supported (`arkts-no-multiple-static-blocks`)
- **Severity**: ERROR
- **FaultID**: MultipleStaticBlocks (55)
- **Bad Example**:
  ```typescript
  class MyClass {
    static {
      // First static block
    }
    static {
      // ❌ Second static block not allowed
    }
  }
  ```

#### Rule 17: Indexed signatures are not supported (`arkts-no-indexed-signatures`)
- **Severity**: ERROR
- **FaultID**: IndexMember (179)
- **Bad Example**:
  ```typescript
  interface MyInterface {
    [key: string]: any;  // ❌
  }
  ```

#### Rule 19: Use inheritance instead of intersection types (`arkts-no-intersection-types`)
- **Severity**: ERROR
- **FaultID**: IntersectionType (23)
- **Description**: Intersection types like `T & U` are not supported.
- **Bad Example**:
  ```typescript
  type Combined = TypeA & TypeB;  // ❌
  ```
- **Good Example**:
  ```typescript
  interface Combined extends TypeA, TypeB { }  // ✅
  ```

#### Rule 21: Type notation using `this` is not supported (`arkts-no-typing-with-this`)
- **Severity**: ERROR
- **FaultID**: ThisType (56)
- **Bad Example**:
  ```typescript
  type Container = {
    data: any;
    getThis: () => this;
  };
  ```

#### Rule 25: Declaring fields in `constructor` is not supported (`arkts-no-ctor-prop-decls`)
- **Severity**: ERROR
- **FaultID**: ParameterProperties (63)
- **Migratable**: Yes
- **Bad Example**:
  ```typescript
  class MyClass {
    constructor(public name: string, private age: number) {}  // ❌
  }
  ```
- **Good Example**:
  ```typescript
  class MyClass {
    public name: string;
    private age: number;
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
  }
  ```

#### Rule 27: Construct signatures are not supported in interfaces (`arkts-no-ctor-signatures-iface`)
- **Severity**: ERROR
- **FaultID**: ConstructorIface (37)
- **Bad Example**:
  ```typescript
  interface IMyClass {
    new (name: string): IMyClass;  // ❌
  }
  ```

#### Rule 28: Indexed access types are not supported (`arkts-no-aliases-by-index`)
- **Severity**: ERROR
- **FaultID**: IndexedAccessType (28)
- **Bad Example**:
  ```typescript
  type Value = Record<string, any>;
  type Name = Value['name'];  // ❌
  ```

#### Rule 29: Indexed access is not supported for fields (`arkts-no-props-by-index`)
- **Severity**: ERROR
- **FaultID**: PropertyAccessByIndex (50)
- **Migratable**: Yes
- **Bad Example**:
  ```typescript
  const obj = { a: 1, b: 2 };
  const value = obj['key'];  // ❌
  ```
- **Good Example**:
  ```typescript
  const obj = { a: 1, b: 2 };
  const value = obj.key;  // ✅ Use dot notation
  ```

#### Rule 30: Structural typing is not supported (`arkts-no-structural-typing`)
- **Severity**: ERROR
- **FaultID**: StructuralIdentity (58)
- **Description**: ArkTS uses nominal typing, not structural typing.
- **Bad Example**:
  ```typescript
  interface Point { x: number; y: number; }
  interface Point2D { x: number; y: number; }

  function printPoint(p: Point) {}
  const p2: Point2D = { x: 1, y: 2 };
  printPoint(p2);  // ❌ Structural type not compatible
  ```

#### Rule 34: Type inference in case of generic function calls is limited (`arkts-no-inferred-generic-params`)
- **Severity**: ERROR
- **FaultID**: GenericCallNoTypeArgs (62)
- **Migratable**: Yes
- **Bad Example**:
  ```typescript
  function identity<T>(value: T): T { return value; }

  const result = identity(42);  // ❌ Type inference limited
  ```
- **Good Example**:
  ```typescript
  const result: number = identity(42);  // ✅ Explicit type
  ```

#### Rule 37: RegExp literals are not supported (`arkts-no-regexp-literals`)
- **Severity**: ERROR
- **FaultID**: RegexLiteral (7)
- **Bad Example**:
  ```typescript
  const pattern = /test/;  // ❌
  ```
- **Good Example**:
  ```typescript
  const pattern = "test";  // ✅ Use string
  // Or use RegExp class with new syntax
  const regex = new RegExp("test");  // ✅
  ```

#### Rule 38: Object literal must correspond to some explicitly declared class or interface (`arkts-no-untyped-obj-literals`)
- **Severity**: ERROR
- **FaultID**: ObjectLiteralNoContextType (2)
- **Bad Example**:
  ```typescript
  const obj = { name: "John", age: 30 };  // ❌ No type annotation
  ```
- **Good Example**:
  ```typescript
  interface Person { name: string; age: number; }
  const obj: Person = { name: "John", age: 30 };  // ✅
  ```

#### Rule 40: Object literals cannot be used as type declarations (`arkts-no-obj-literals-as-types`)
- **Severity**: ERROR
- **FaultID**: ObjectTypeLiteral (24)
- **Bad Example**:
  ```typescript
  type MyType = {
    name: string;
    age: number;
  };  // ❌ Use interface instead
  ```
- **Good Example**:
  ```typescript
  interface MyType {
    name: string;
    age: number;
  }  // ✅
  ```

#### Rule 43: Array literals must contain elements of only inferrable types (`arkts-no-noninferrable-arr-literals`)
- **Severity**: ERROR
- **FaultID**: ArrayLiteralNoContextType (3)
- **Bad Example**:
  ```typescript
  const arr = [1, 2, 3];  // ❌ Type not inferable without context
  ```
- **Good Example**:
  ```typescript
  const arr: number[] = [1, 2, 3];  // ✅ Explicit type
  ```

#### Rule 49: Use generic functions instead of generic arrow functions (`arkts-no-generic-lambdas`)
- **Severity**: ERROR
- **FaultID**: LambdaWithTypeParameters (27)
- **Migratable**: Yes
- **Bad Example**:
  ```typescript
  const identity = <T>(value: T): T => value;  // ❌
  ```
- **Good Example**:
  ```typescript
  function identity<T>(value: T): T { return value; }  // ✅
  ```

#### Rule 50: Class literals are not supported (`arkts-no-class-literals`)
- **Severity**: ERROR
- **FaultID**: ClassExpression (28)
- **Migratable**: Yes
- **Bad Example**:
  ```typescript
  const MyClass = class {
    constructor(public value: number) {}
  };  // ❌
  ```
- **Good Example**:
  ```typescript
  class MyClass {
    constructor(public value: number) {}
  }  // ✅
  ```

#### Rule 52: Reassigning object methods is not supported (`arkts-no-method-reassignment`)
- **Severity**: ERROR
- **FaultID**: NoUndefinedPropAccess (54)
- **Bad Example**:
  ```typescript
  const obj = {
    value: 10,
    method() { return this.value; }
  };
  obj.method = function() { return 20; };  // ❌
  ```

#### Rule 55: Unary operators `+`, `-` and `~` work only on numbers (`arkts-no-polymorphic-unops`)
- **Severity**: ERROR
- **FaultID**: UnaryArithmNotNumber (35)
- **Bad Examples**:
  ```typescript
  const str = "42";
  const num = +str;  // ❌ Only works on numbers
  const neg = -str;  // ❌
  const bits = ~str; // ❌
  ```

#### Rule 60: `typeof` operator is allowed only in expression contexts (`arkts-no-type-query`)
- **Severity**: ERROR
- **FaultID**: TypeQuery (6)
- **Bad Example**:
  ```typescript
  type T = typeof someVariable;  // ❌ typeof not allowed in type context
  ```
- **Good Example**:
  ```typescript
  const typeName: string = typeof someVariable;  // ✅ typeof in expression context
  ```

#### Rule 65: `instanceof` operator is partially supported (`arkts-instanceof-ref-types`)
- **Severity**: ERROR
- **FaultID**: InstanceofUnsupported (64)
- **Description**: `instanceof` only works with reference types (classes), not primitives or interfaces.
- **Bad Example**:
  ```typescript
  if (value instanceof string) {}  // ❌
  if (obj instanceof MyInterface) {}  // ❌
  ```
- **Good Example**:
  ```typescript
  if (obj instanceof MyClass) {}  // ✅ Works with classes
  ```

#### Rule 71: The comma operator `,` is supported only in `for` loops (`arkts-no-comma-outside-loops`)
- **Severity**: ERROR
- **FaultID**: CommaOperator (25)
- **Bad Example**:
  ```typescript
  const x = (a, b, c);  // ❌ Comma operator outside for loop
  ```
- **Good Example**:
  ```typescript
  for (let i = 0, j = 0; i < 10; i++, j++) {}  // ✅ Allowed in for loop
  ```

#### Rule 79: Type annotation in catch clause is not supported (`arkts-no-types-in-catch`)
- **Severity**: ERROR
- **FaultID**: CatchWithUnsupportedType (32)
- **Migratable**: Yes
- **Bad Example**:
  ```typescript
  try {
    throw new Error("test");
  } catch (e: Error) {  // ❌
    console.log(e.message);
  }
  ```
- **Good Example**:
  ```typescript
  try {
    throw new Error("test");
  } catch (e) {  // ✅
    console.log(e.message);
  }
  ```

#### Rule 87: `throw` statements cannot accept values of arbitrary types (`arkts-limited-throw`)
- **Severity**: ERROR
- **FaultID**: ThrowStatement (16)
- **Migratable**: Yes
- **Bad Example**:
  ```typescript
  throw "error message";  // ❌ Can only throw Error objects
  throw 42;              // ❌
  ```
- **Good Example**:
  ```typescript
  throw new Error("error message");  // ✅
  ```

#### Rule 90: Function return type inference is limited (`arkts-no-implicit-return-types`)
- **Severity**: ERROR
- **FaultID**: LimitedReturnTypeInference (26)
- **Migratable**: Yes
- **Bad Example**:
  ```typescript
  function add(a: number, b: number) {
    return a + b;  // ❌ Return type not explicitly declared
  }
  ```
- **Good Example**:
  ```typescript
  function add(a: number, b: number): number {
    return a + b;  // ✅
  }
  ```

#### Rule 91: Destructuring parameter declarations are not supported (`arkts-no-destruct-params`)
- **Severity**: ERROR
- **FaultID**: DestructuringParameter (9)
- **Bad Example**:
  ```typescript
  function greet({ name, age }: { name: string; age: number }) {  // ❌
    console.log(name, age);
  }
  ```
- **Good Example**:
  ```typescript
  interface Person { name: string; age: number; }
  function greet(person: Person) {
    console.log(person.name, person.age);
  }
  ```

#### Rule 94: Generator functions are not supported (`arkts-no-generators`)
- **Severity**: ERROR
- **FaultID**: GeneratorFunction (48), YieldExpression (10)
- **Bad Example**:
  ```typescript
  function* generator() {
    yield 1;
    yield 2;
  }  // ❌
  ```

#### Rule 96: Type guarding is supported with `instanceof` and `as` (`arkts-no-is`)
- **Severity**: ERROR
- **FaultID**: IsOperator (8)
- **Bad Example**:
  ```typescript
  function isString(value: unknown): value is string {
    return typeof value === "string";  // ❌ is not supported
  }
  ```
- **Good Example**:
  ```typescript
  function isString(value: unknown): boolean {
    return typeof value === "string";
  }
  const str = value as string;  // ✅ Use type assertion
  ```

#### Rule 99: Spread operator limitations (`arkts-no-spread`)
- **Severity**: ERROR
- **FaultID**: SpreadOperator (77)
- **Description**: Only arrays or classes derived from arrays can be spread into rest parameters or array literals.
- **Bad Example**:
  ```typescript
  function fn(...args: any[]) {}
  fn(...obj);  // ❌ Cannot spread objects
  const arr = [1, ...obj];  // ❌
  ```
- **Good Example**:
  ```typescript
  const arr = [...arr1, ...arr2];  // ✅ Spread arrays
  const newArr = [1, 2, 3, ...arr];  // ✅
  ```

#### Rule 102: Interface can not extend interfaces with the same method (`arkts-no-extend-same-prop`)
- **Severity**: ERROR
- **FaultID**: IntefaceExtendDifProps (57)
- **Bad Example**:
  ```typescript
  interface Base {
    method(): string;
  }
  interface Derived extends Base {
    method(): string;  // ❌ Can't redeclare same method
  }
  ```

#### Rule 103: Declaration merging is not supported (`arkts-no-decl-merging`)
- **Severity**: ERROR
- **FaultID**: InterfaceMerging (11), EnumMerging (113)
- **Bad Examples**:
  ```typescript
  interface MyInterface {
    prop1: string;
  }
  interface MyInterface {  // ❌
    prop2: number;
  }

  enum MyEnum { A, B }
  enum MyEnum { C = 2 }  // ❌
  ```

#### Rule 104: Interfaces cannot extend classes (`arkts-extends-only-class`)
- **Severity**: ERROR
- **FaultID**: InterfaceExtendsClass (13)
- **Bad Example**:
  ```typescript
  class Base {}
  interface Derived extends Base {}  // ❌
  ```
- **Good Example**:
  ```typescript
  class Base {}
  class Derived extends Base {}  // ✅
  interface IBase {}
  interface Derived extends Base, IBase {}  // ✅ Interface can extend class AND interface
  ```

#### Rule 106: Constructor function type is not supported (`arkts-no-ctor-signatures-funcs`)
- **Severity**: ERROR
- **FaultID**: ConstructorFuncs (38)
- **Bad Example**:
  ```typescript
  type MyType = Function & { new (name: string): any };  // ❌
  ```

#### Rule 111: Enumeration members can be initialized only with compile time expressions of the same type (`arkts-no-enum-mixed-types`)
- **Severity**: ERROR
- **FaultID**: EnumMemberNonConstInit (52)
- **Bad Example**:
  ```typescript
  enum MyEnum {
    A = 1,
    B = "string",  // ❌ Mixed types
    C = 2 + A      // ❌ Not a constant expression
  }
  ```
- **Good Example**:
  ```typescript
  enum MyEnum {
    A = 1,
    B = 2,
    C = 3  // ✅ Same type (number)
  }

  enum StringEnum {
    A = "one",
    B = "two",
    C = "three"  // ✅ Same type (string)
  }
  ```

#### Rule 113: `enum` declaration merging is not supported (`arkts-no-enum-merging`)
- **Severity**: ERROR
- **FaultID**: EnumMerging (12)
- **Bad Example**:
  ```typescript
  enum Color {
    Red,
    Green
  }
  enum Color {  // ❌ Cannot merge enum declarations
    Blue
  }
  ```

#### Rule 114: Namespaces cannot be used as objects (`arkts-no-ns-as-obj`)
- **Severity**: ERROR
- **FaultID**: NamespaceAsObject (45)
- **Bad Example**:
  ```typescript
  namespace MyNS {
    export const value = 10;
  }

  MyNS.someMethod();  // ❌ Namespace used as object
  MyNS.newProp = 20;  // ❌
  ```

#### Rule 116: Non-declaration statements in namespaces are not supported (`arkts-no-ns-statements`)
- **Severity**: ERROR
- **FaultID**: NonDeclarationInNamespace (47)
- **Bad Example**:
  ```typescript
  namespace MyNS {
    export const value = 10;
    console.log(value);  // ❌ Non-declaration statement
  }
  ```
- **Good Example**:
  ```typescript
  namespace MyNS {
    export const value = 10;  // ✅ Declaration only
    export function doSomething() {}  // ✅
  }
  ```

#### Rule 118: Special import type declarations are not supported (`arkts-no-special-imports`)
- **Severity**: ERROR
- **FaultID**: N/A (defined in cookBookTag but no FaultID mapping)
- **Description**: Type-only imports (`import type`) are not supported.
- **Bad Example**:
  ```typescript
  import type { MyType } from './module';  // ❌
  import { type MyType } from './module';  // ❌
  ```
- **Good Example**:
  ```typescript
  import { MyType } from './module';  // ✅ Normal import
  ```

#### Rule 119: Importing a module for side-effects only is not supported (`arkts-no-side-effects-imports`)
- **Severity**: ERROR
- **FaultID**: ImportFromPath (21)
- **Bad Example**:
  ```typescript
  import './module';  // ❌ Side-effect import
  ```

#### Rule 120: `import default as ...` is not supported (`arkts-no-import-default-as`)
- **Severity**: ERROR
- **FaultID**: DefaultImport (59)
- **Migratable**: Yes
- **Bad Example**:
  ```typescript
  import { default as myDefault } from './module';  // ❌
  ```
- **Good Example**:
  ```typescript
  import myDefault from './module';  // ✅
  ```

#### Rule 121: `require` and `import` assignment are not supported (`arkts-no-require`)
- **Severity**: ERROR
- **FaultID**: ImportAssignment (61)
- **Note**: Also covers Rule 126 `export = ...`
- **Bad Examples**:
  ```typescript
  import iam = require("module");  // ❌
  export = something;              // ❌ (Rule 126)
  import os = require("os");       // ❌
  ```

#### Rule 126: `export = ...` assignment is not supported (`arkts-no-export-assignment`)
- **Severity**: ERROR
- **FaultID**: ExportAssignment (60)
- **Bad Example**:
  ```typescript
  class MyClass {}
  export = MyClass;  // ❌ CommonJS-style export
  ```
- **Good Example**:
  ```typescript
  export default MyClass;  // ✅ ES6 export
  ```

#### Rule 127: Special `export type` declarations are not supported (`arkts-no-special-exports`)
- **Severity**: ERROR
- **FaultID**: No mapped fault (generic export type rule)
- **Bad Example**:
  ```typescript
  export type { MyType } from './module';  // ❌
  export { type MyType } from './module';  // ❌
  ```
- **Good Example**:
  ```typescript
  export { MyType } from './module';  // ✅
  ```

#### Rule 128: Ambient module declaration is not supported (`arkts-no-ambient-decls`)
- **Severity**: ERROR
- **FaultID**: ShorthandAmbientModuleDecl (65)
- **Bad Example**:
  ```typescript
  declare module "my-library" {
    export function doSomething(): void;
  }  // ❌
  ```

#### Rule 129: Wildcards in module names are not supported (`arkts-no-module-wildcards`)
- **Severity**: ERROR
- **FaultID**: WildcardsInModuleName (66)
- **Bad Example**:
  ```typescript
  declare module "my-lib/*" {
    // ❌ Wildcard not supported
  }
  ```

#### Rule 130: Universal module definitions (UMD) are not supported (`arkts-no-umd`)
- **Severity**: ERROR
- **FaultID**: UMDModuleDefinition (67)
- **Bad Example**:
  ```typescript
  export as namespace MyLib;
  ```

#### Rule 134: Definite assignment assertions are not supported (`arkts-no-definite-assignment`)
- **Severity**: WARNING
- **FaultID**: DefiniteAssignment (69)
- **Bad Example**:
  ```typescript
  let value!: number;  // ❌ Definite assignment assertion (!)
  ```

#### Rule 136: Prototype assignment is not supported (`arkts-no-prototype-assignment`)
- **Severity**: ERROR
- **FaultID**: Prototype (70)
- **Bad Example**:
  ```typescript
  MyClass.prototype.newMethod = function() {};  // ❌
  Object.prototype.customProp = 'value';        // ❌
  ```

#### Rule 139: Declaring properties on functions is not supported (`arkts-no-func-props`)
- **Severity**: ERROR
- **FaultID**: PropertyDeclOnFunction (73)
- **Bad Example**:
  ```typescript
  function myFunction() {}
  myFunction.customProperty = 'value';  // ❌
  myFunction.doSomething = () => {};    // ❌
  ```

#### Rule 140: `Function.apply`, `Function.bind`, `Function.call` are not supported (`arkts-no-func-apply-bind-call`)
- **Severity**: ERROR
- **FaultID**: FunctionApplyBindCall (74)
- **Note**: In ArkTS 1.1, this only covers `Function.bind`
- **Bad Examples**:
  ```typescript
  function greet(greeting: string, name: string): string {
    return `${greeting}, ${name}!`;
  }

  greet.apply(null, ["Hello", "World"]);      // ❌
  const boundGreet = greet.bind(null, "Hi"); // ❌
  greet.call(null, "Hello", "World");       // ❌
  ```
- **Good Example**:
  ```typescript
  greet("Hello", "World");  // ✅ Direct call
  ```

#### Rule 142: `as const` assertions are not supported (`arkts-no-as-const`)
- **Severity**: ERROR
- **FaultID**: ConstAssertion (75)
- **Bad Example**:
  ```typescript
  const config = {
    endpoint: "/api",
    timeout: 5000
  } as const;  // ❌
  ```

#### Rule 143: Import assertions are not supported (`arkts-no-import-assertions`)
- **Severity**: ERROR
- **FaultID**: ImportAssertion (76)
- **Bad Example**:
  ```typescript
  import data from './data.json' assert { type: 'json' };  // ❌
  ```

#### Rule 144: Usage of standard library is restricted (`arkts-limited-stdlib`)
- **Severity**: ERROR
- **FaultID**: LimitedStdLibApi (78)
- **CookBookRef**: 144
- **Description**: Many JavaScript standard library APIs are restricted.

#### Rule 145: Strict type checking is enforced (`arkts-strict-typing`)
- **Severity**: ERROR
- **FaultID**: StrictDiagnostic (80)
- **CookBookRef**: 145
- **Description**: ArkTS enforces strict type checking. Type errors cannot be ignored.

#### Rule 146: Switching off type checks with in-place comments is not allowed (`arkts-strict-typing-required`)
- **Severity**: ERROR
- **FaultID**: ErrorSuppression (79)
- **CookBookRef**: 146
- **Bad Example**:
  ```typescript
  // @ts-ignore  // ❌ Not allowed
  const value: any = getValue();

  // @ts-nocheck  // ❌ Not allowed
  ```
  ```typescript
  // eslint-disable-next-line @typescript-eslint/no-explicit-any  // ❌
  const value: any = getValue();
  ```

#### Rule 147: No dependencies on TypeScript code are currently allowed (`arkts-no-ts-deps`)
- **Severity**: ERROR
- **Excluded from FaultID enum but enforced as general rule**
- **Description**: ArkTS modules cannot depend on TypeScript-only code.

---

## Quick Reference: Most Common Errors

| Error | Solution |
|-------|----------|
| `Object.assign is not supported` | Use spread syntax: `{ ...source }` |
| `Destructuring is not supported` | Manually assign each property |
| `Nested functions are not supported` | Use arrow functions at class level |
| `any/unknown is not supported` | Use explicit types |
| `Symbol() is not supported` | Use string constants or enums instead |
| `delete is not supported` | Set to `undefined` or `null` |
| `for..in is not supported` | Use `for..of` for arrays |
| `import/require assignment` | Use named/default imports: `import { x } from 'mod'` |