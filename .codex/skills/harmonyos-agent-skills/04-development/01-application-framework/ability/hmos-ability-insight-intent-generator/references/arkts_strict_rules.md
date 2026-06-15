# ArkTS 严格模式核心规则

生成所有意图代码时，必须遵守以下 ArkTS 严格模式规则。

## 规则速查表

| 规则                                         | 错误示例                               | 正确要点                                             |
| -------------------------------------------- | -------------------------------------- | ---------------------------------------------------- |
| 1. 禁止 `any`/`unknown`                      | `const params: any = ...`              | 定义接口并声明类型                                   |
| 2. 禁止索引访问 `obj['prop']`                | `value = params['date']`               | 使用点号 `params.date`                               |
| 3. 导入所需模块                              | `router.getParams()` 未导入            | `import router from '@ohos.router'`                  |
| 4. 对象字面量必须有类型声明                  | `return { code: 0 }`                   | 定义接口并创建显式类型变量                           |
| 5. `throw` 只能抛 `Error` 对象               | `throw error`                          | `throw new Error(JSON.stringify(error))`             |
| 6. 安全获取路由参数                          | `const date = router.getParams().date` | `try-catch` + 接口 + 判空                            |
| 7. 类属性必须初始化                          | `songName: string;`                    | `songName: string = '';`                             |
| 8. 禁止解构赋值                              | `const { songName } = this.params`     | `const songName = this.params.songName`              |
| 9. 方法返回类型不能使用对象字面量            | `(): { valid: boolean } =>`            | 定义接口 `interface ValidResult`                     |
| 10. return 语句不能直接返回对象字面量        | `return { code: 0 }`                   | `const result: Result = { code: 0 }; return result;` |
| 11. Promise.resolve 中的对象字面量需显式类型 | `return Promise.resolve({ code: 0 })`  | 先声明变量再返回                                     |

## 详细规则与示例

### 1. 类属性初始化

```typescript
// ❌ 错误：没有初始化
export default class MyExecutor extends InsightIntentEntryExecutor<string> {
  songName: string;
}

// ✅ 正确：显式初始化
export default class MyExecutor extends InsightIntentEntryExecutor<string> {
  songName: string = '';
}
```

### 2. 禁止解构赋值

```typescript
// ❌ 错误
const { songName, artistName } = this.params;

// ✅ 正确
const songName: string = this.params.songName || '';
```

### 3. 对象字面量必须有接口声明

```typescript
// ❌ 错误
const result = { code: 0, result: '播放成功' };

// ✅ 正确
interface PlayResult {
  code: number;
  result: string;
}
const result: PlayResult = { code: 0, result: '播放成功' };
```

### 4. 方法返回类型禁止使用对象字面量

```typescript
// ❌ 错误
private validate(): { valid: boolean; message: string } {
  return { valid: true, message: '' };
}

// ✅ 正确
interface ValidationResult {
  valid: boolean;
  message: string;
}
private validate(): ValidationResult {
  const result: ValidationResult = { valid: true, message: '' };
  return result;
}
```

### 5. Promise.resolve 返回值

```typescript
// ❌ 错误
return Promise.resolve({
  code: 0,
  result: '成功'
});

// ✅ 正确
interface IntentResult {
  code: number;
  result: string;
}
const successResult: IntentResult = { code: 0, result: '成功' };
return Promise.resolve(successResult);
```

### 6. throw 语句只能抛 Error

```typescript
// ❌ 错误
catch (error) {
  throw error;
}

// ✅ 正确
catch (error) {
  throw new Error(`操作失败: ${JSON.stringify(error)}`);
}
```

### 7. 禁止索引访问

```typescript
// ❌ 错误
const value = params['date'];

// ✅ 正确
interface Params { date?: string; }
const value = (params as Params).date;
```

### 8. 安全获取路由参数

```typescript
// ✅ 正确
try {
  const params = router.getParams() as RouterParams;
  const date = params?.date ?? '';
} catch (error) {
  hilog.error(0x0000, LOG_TAG, '获取参数失败: %{public}s', JSON.stringify(error));
}
```

### 9. `@InsightIntentEntry` 特有规则

- `parameters` 必须为 `{ type: 'object', properties: {...} }`（即使无参数也必须有 `properties: {}`）
- 禁止使用 `integer` 类型，统一用 `number`
- 类属性必须与 `parameters` 属性名一致，提供默认值，禁止联合类型
- `executeMode` 必须是数组
- 返回值必须为 `Promise<insightIntent.IntentResult<T>>`，`result` 中必须包含 `resultDesc`

### 10. `@InsightIntentFunctionMethod` 特有规则

- 必须同时使用 `@InsightIntentFunction()` 装饰类
- 类装饰器括号不能省略：`@InsightIntentFunction()`
- 方法必须是 `static`
- 返回值必须为 `insightIntent.ExecuteResult`，且 `result` 中包含 `resultDesc`

## 代码生成检查清单

- 是否使用了 `any` 或 `unknown` 类型？
- 是否使用了索引访问 `obj['prop']`？
- 是否导入了所有需要的模块？
- 是否为所有对象字面量定义了接口？
- `@InsightIntentEntry` 返回值是否直接声明为 `insightIntent.IntentResult<T>`？
- `result` 对象中是否包含 `resultDesc` 字段？
- 是否避免了使用 `as insightIntent.ExecuteResult` 类型转换？
- `executeMode` 是否是数组格式？
- `parameters` 是否使用了正确的 JSON Schema 格式？
- `@InsightIntentFunctionMethod` 是否同时使用了 `@InsightIntentFunction()`？
- `@InsightIntentPage` 是否直接在页面 struct 上使用？
- 装饰器顺序是否正确？