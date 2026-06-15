# 使用@InsightIntentEntry装饰器创建自定义意图

使用该装饰器装饰一个继承自InsightIntentEntryExecutor的类，实现意图操作并配置意图依赖的Ability组件，便于AI入口拉起依赖的Ability组件时，执行对应的意图操作。

---

## ⚠️ 必须首先导入（编译前必读）

使用 `@InsightIntentEntry` 前必须完整导入以下三个符号：

```typescript
import { InsightIntentEntry, InsightIntentEntryExecutor, insightIntent } from '@kit.AbilityKit';
```

| 导入项                       | 用途                                                | 是否必须 |
| :--------------------------- | :-------------------------------------------------- | :------- |
| `InsightIntentEntry`         | 装饰器，用于修饰执行器类                            | ✅ 必须   |
| `InsightIntentEntryExecutor` | 执行器基类，需继承                                  | ✅ 必须   |
| `insightIntent`              | 命名空间，用于 `ExecuteMode`、`IntentResult` 等类型 | ✅ 必须   |

**❌ 常见错误：只导入基类和命名空间，忘记导入装饰器**

```typescript
// ❌ 错误：缺少装饰器导入
import { InsightIntentEntryExecutor, insightIntent } from '@kit.AbilityKit';
@InsightIntentEntry({...})  // 编译失败：Cannot find name 'InsightIntentEntry'
```

> 💡 **提示**：其他装饰器（Page、Link、Function 等）的导入模板请参考 SKILL.md 中的速查表。

---

## Quick Start

### 快速上手

```typescript
import { insightIntent, InsightIntentEntry, InsightIntentEntryExecutor } from '@kit.AbilityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';

const LOG_TAG: string = 'MusicIntent';

@InsightIntentEntry({
  intentName: 'PlayMusic',
  domain: 'MusicDomain',
  intentVersion: '1.0.1',
  displayName: '播放歌曲',
  llmDescription: '播放指定的音乐文件',
  abilityName: 'EntryAbility',
  executeMode: [insightIntent.ExecuteMode.UI_ABILITY_FOREGROUND],
  parameters: {
    'type': 'object',
    'properties': {
      'songName': {
        'type': 'string',
        'description': '歌曲名称',
        'minLength': 1
      }
    },
    'required': ['songName']
  }
})
export default class PlayMusicExecutor extends InsightIntentEntryExecutor<string> {
  songName: string = '';

  onExecute(): Promise<insightIntent.IntentResult<string>> {
    hilog.info(0x0000, LOG_TAG, 'Playing song: %{public}s', this.songName);
    
    // 执行播放逻辑
    this.playMusic(this.songName);
    
    const intentResult: insightIntent.IntentResult<string> = {
      code: 0,
      result: '播放成功'
    };
    
    return Promise.resolve(intentResult);
  }
  
  private playMusic(songName: string): void {
    // 实现播放逻辑
  }
}
```

**⚠️ 严禁使用 `insightIntent.ExecuteResult`**

旧版文档可能提到 `ExecuteResult`，但该类型**已废弃**且会导致编译错误。  
**必须使用 `insightIntent.IntentResult<T>`**，其中 `T` 是你自定义的结果类（必须包含 `resultDesc` 字段）。  

**错误示例（禁止）**：

```typescript
async onExecute(): Promise<insightIntent.ExecuteResult> { ... }   // ❌ 错误类型
```

**正确示例**：参见上方 Quick Start。

## ⚠️ 页面跳转正确方式（Navigation 架构）

### windowStage 属性说明

`InsightIntentEntryExecutor` 提供以下属性用于页面跳转：

| 属性          | 类型                        | 说明           | 适用场景                     |
| ------------- | --------------------------- | -------------- | ---------------------------- |
| `windowStage` | `window.WindowStage`        | 窗口舞台对象   | `UI_ABILITY_FOREGROUND` 模式 |
| `executeMode` | `insightIntent.ExecuteMode` | 执行模式       | 所有模式                     |
| `context`     | `InsightIntentContext`      | 意图执行上下文 | 所有模式                     |

### 正确的页面加载方式

#### 方式1：使用 windowStage.loadContent（推荐）

```typescript
async onExecute(): Promise<insightIntent.IntentResult<string>> {
  // 创建 LocalStorage 传递参数
  let storage = new LocalStorage();
  storage.setOrCreate('targetTab', 3);
  
  // 根据执行模式选择加载方式
  if (this.executeMode == insightIntent.ExecuteMode.UI_ABILITY_FOREGROUND) {
    this.windowStage?.loadContent('pages/Index', storage, (err) => {
      if (err.code) {
        hilog.error(DOMAIN, LOG_TAG, '加载失败: %{public}s', JSON.stringify(err));
      } else {
        hilog.info(DOMAIN, LOG_TAG, '加载成功');
      }
    });
  }
  
  return Promise.resolve({ code: 0, result: '成功' });
}
```

#### 方式2：使用 router.pushUrl（传统架构）

```typescript
async onExecute(): Promise<insightIntent.IntentResult<string>> {
  await router.pushUrl({
    url: 'pages/TargetPage',
    params: { targetTab: 3 }
  });
  
  return Promise.resolve({ code: 0, result: '成功' });
}
```

### 参数传递方式对比

| 方式          | 适用场景         | 优点               | 缺点             |
| :------------ | :--------------- | :----------------- | :--------------- |
| LocalStorage  | 意图框架传递参数 | 官方推荐，不会丢失 | 需要页面支持     |
| AppStorage    | 应用内全局参数   | 简单易用           | 可能被覆盖或丢失 |
| router params | 传统路由跳转     | 熟悉的方式         | 不适用于意图框架 |

### 完整示例（Navigation 架构）

```typescript
import { InsightIntentEntry, InsightIntentEntryExecutor, insightIntent } from '@kit.AbilityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';

const LOG_TAG: string = 'OpenMinePageIntent';
const DOMAIN: number = 0x0000;

@InsightIntentEntry({
  intentName: 'OpenMinePage',
  domain: 'MineDomain',
  intentVersion: '1.0.1',
  displayName: '我的页面',
  llmDescription: '跳转到应用的"我的"页面',
  keywords: ['我的', '个人中心'],
  abilityName: 'EntryAbility',
  executeMode: [insightIntent.ExecuteMode.UI_ABILITY_FOREGROUND]
})
export default class OpenMinePageExecutor extends InsightIntentEntryExecutor<string> {
  async onExecute(): Promise<insightIntent.IntentResult<string>> {
    hilog.info(DOMAIN, LOG_TAG, 'onExecute');
    
    try {
      // ✅ 正确：使用 LocalStorage 传递参数
      let storage = new LocalStorage();
      storage.setOrCreate('intentTargetTab', 3);
      
      // ✅ 正确：使用 windowStage 加载页面
      if (this.executeMode == insightIntent.ExecuteMode.UI_ABILITY_FOREGROUND) {
        this.windowStage?.loadContent('pages/Index', storage, (err) => {
          if (err.code) {
            hilog.error(DOMAIN, LOG_TAG, '加载失败: %{public}s', JSON.stringify(err));
          } else {
            hilog.info(DOMAIN, LOG_TAG, '加载成功');
          }
        });
      }
      
      return Promise.resolve({
        code: 0,
        result: '已跳转到"我的"页面'
      } as insightIntent.IntentResult<string>);
    } catch (error) {
      hilog.error(DOMAIN, LOG_TAG, '跳转失败: %{public}s', JSON.stringify(error));
      return Promise.resolve({
        code: -1,
        result: '跳转失败: ' + JSON.stringify(error)
      } as insightIntent.IntentResult<string>);
    }
  }
}
```

### 完整流程

1. **定义意图**：使用 `@InsightIntentEntry` 装饰器
2. **实现执行器**：继承 `InsightIntentEntryExecutor<T>`
3. **重写 onExecute**：实现业务逻辑
4. **注册意图**：在 `insight_intent.json` 中添加文件路径


## ⚠️ 常见错误与字段警告

### 错误1：使用错误的字段名

**编译错误**：`'mode' does not exist in type 'EntryIntentDecoratorInfo'`

| 正确字段                    | 错误字段                   | 说明                                                         |
| --------------------------- | -------------------------- | ------------------------------------------------------------ |
| `abilityName`               | `uiAbility`                | @InsightIntentEntry 使用 `abilityName`，@InsightIntentPage 使用 `uiAbility` |
| `executeMode`               | `mode`                     | 执行模式字段名是 `executeMode`，不是 `mode`                  |
| `insightIntent.ExecuteMode` | `insightIntent.IntentMode` | 使用 `ExecuteMode` 枚举，不是 `IntentMode`                   |

**错误示例：**
```typescript
@InsightIntentEntry({
  intentName: 'QueryHistory',
  domain: 'BrowserDomain',
  intentVersion: '1.0.0',
  displayName: '查询浏览记录',
  uiAbility: 'EntryAbility',  // ❌ 错误：应该是 abilityName
  mode: insightIntent.IntentMode.UI_ABILITY_BACKGROUND,  // ❌ 错误：应该是 executeMode + ExecuteMode
  parameters: { ... }
})
```

**正确示例：**

```typescript
@InsightIntentEntry({
  intentName: 'QueryHistory',
  domain: 'BrowserDomain',
  intentVersion: '1.0.0',
  displayName: '查询浏览记录',
  abilityName: 'EntryAbility',  // ✅ 正确
  executeMode: [insightIntent.ExecuteMode.UI_ABILITY_BACKGROUND],  // ✅ 正确
  parameters: { ... }
})
```

### 错误2：executeMode 不是数组

**编译错误**：`Type 'XXX' is not assignable to type 'ExecuteMode[]'`

**错误示例：**
```typescript
executeMode: insightIntent.ExecuteMode.UI_ABILITY_BACKGROUND  // ❌ 错误：不是数组
```

**正确示例：**
```typescript
executeMode: [insightIntent.ExecuteMode.UI_ABILITY_BACKGROUND]  // ✅ 正确：必须是数组
```

### 错误3：缺少 abilityName 字段

**编译错误**：`Property 'abilityName' is missing`

**原因**：`abilityName` 是 @InsightIntentEntry 的必填字段，必须指定绑定的 Ability 名称。

**解决方案：**
1. 读取意图文件所在模块的 `module.json5`
2. 获取 `module.abilities[0].name` 的值
3. 使用该值作为 `abilityName`

### 错误4：Promise.resolve 返回值使用未声明的对象字面量

**编译错误**：`Object literal must correspond to some explicitly declared class or interface`

**原因**：ArkTS 严格模式要求所有对象字面量必须有对应的接口定义，特别是包含 `wantParams` 的复杂对象。

**错误示例：**
```typescript
async onExecute(): Promise<insightIntent.IntentResult<string>> {
  try {
    // 业务逻辑...

    // ❌ 错误：直接使用内联对象字面量
    return Promise.resolve({
      code: 0,
      result: '操作成功',
      wantParams: {
        success: true,
        message: '操作成功',
        data: 'some data'
      }
    });
  } catch (error) {
    // ❌ 错误：catch 块中也使用了内联对象字面量
    return Promise.resolve({
      code: -1,
      result: '操作失败',
      wantParams: {
        success: false,
        message: '操作失败',
        data: ''
      }
    });
  }
}
```

**正确示例：**
```typescript
// 1. 定义 wantParams 接口
interface IntentWantParams {
  success: boolean;
  message: string;
  data: string;
}

// 2. 定义意图结果接口
interface IntentResultTyped {
  code: number;
  result: string;
  wantParams: IntentWantParams;
}

async onExecute(): Promise<insightIntent.IntentResult<string>> {
  try {
    // 业务逻辑...

    // ✅ 正确：先定义显式类型的对象
    const successWantParams: IntentWantParams = {
      success: true,
      message: '操作成功',
      data: 'some data'
    };

    const successResult: IntentResultTyped = {
      code: 0,
      result: '操作成功',
      wantParams: successWantParams
    };

    return Promise.resolve(successResult as insightIntent.IntentResult<string>);

  } catch (error) {
    const errorWantParams: IntentWantParams = {
      success: false,
      message: '操作失败',
      data: ''
    };

    const errorResult: IntentResultTyped = {
      code: -1,
      result: '操作失败',
      wantParams: errorWantParams
    };

    return Promise.resolve(errorResult as insightIntent.IntentResult<string>);
  }
}
```

**关键要点：**
1. 为 `wantParams` 定义专门的接口
2. 为整个 `IntentResult` 定义接口
3. 先创建显式类型的对象，再使用类型断言转换
4. 在 try 和 catch 块中分别使用相同的模式

### 错误8：throw 语句使用任意类型

**编译错误**：`"throw" statements cannot accept values of arbitrary types`

**原因**：ArkTS 严格模式要求 throw 语句只能抛出 Error 对象或其子类。

**错误示例：**
```typescript
private async doSomething(): Promise<void> {
  try {
    await riskyOperation();
  } catch (error) {
    // ❌ 错误：直接 throw error 变量
    throw error;
  }
}
```

**正确示例：**
```typescript
private async doSomething(): Promise<void> {
  try {
    await riskyOperation();
  } catch (error) {
    // ✅ 正确：创建新的 Error 对象
    throw new Error(`操作失败: ${JSON.stringify(error)}`);

    // 或者
    const errorMsg: string = error instanceof Error ? error.message : String(error);
    throw new Error(`操作失败: ${errorMsg}`);
  }
}
```

**常见场景：**
- 路由跳转失败
- 网络请求失败
- 文件操作失败
- 权限检查失败

### 错误6：方法返回类型使用对象字面量声明

**编译错误**：`Object literals cannot be used as type declarations (arkts-no-obj-literals-as-types)`

**原因**：ArkTS 严格模式禁止在返回类型位置直接使用对象字面量，必须先定义接口。

**错误示例：**
```typescript
// ❌ 错误：返回类型使用对象字面量
private validateParams(): { valid: boolean; message: string } {
  if (!this.name) {
    return { valid: false, message: '姓名不能为空' };
  }
  return { valid: true, message: '' };
}

// ❌ 错误：箭头函数返回类型使用对象字面量
const getResult = (): { code: number; message: string } => {
  return { code: 0, message: '成功' };
};
```

**正确示例：**
```typescript
// ✅ 正确：先定义接口
interface ValidationResult {
  valid: boolean;
  message: string;
}

private validateParams(): ValidationResult {
  if (!this.name) {
    const result: ValidationResult = { valid: false, message: '姓名不能为空' };
    return result;
  }
  const successResult: ValidationResult = { valid: true, message: '' };
  return successResult;
}

// ✅ 正确：箭头函数也使用预定义接口
interface Result {
  code: number;
  message: string;
}

const getResult = (): Result => {
  const result: Result = { code: 0, message: '成功' };
  return result;
};
```

### 错误7：方法 return 语句直接返回对象字面量

**编译错误**：`Object literal must correspond to some explicitly declared class or interface (arkts-no-untyped-obj-literals)`

**原因**：ArkTS 严格模式要求所有 return 语句中的对象字面量必须先声明为显式类型的变量，不能直接返回。

**错误示例：**
```typescript
interface ValidationResult {
  valid: boolean;
  message: string;
}

// ❌ 错误：虽然定义了接口，但直接返回对象字面量
private validateParams(): ValidationResult {
  if (!this.name) {
    return { valid: false, message: '姓名不能为空' };  // 编译错误
  }
  return { valid: true, message: '' };  // 编译错误
}
```

**正确示例：**
```typescript
interface ValidationResult {
  valid: boolean;
  message: string;
}

// ✅ 正确：先创建显式类型的变量，再返回
private validateParams(): ValidationResult {
  if (!this.name) {
    const errorResult: ValidationResult = {
      valid: false,
      message: '姓名不能为空'
    };
    return errorResult;
  }

  const successResult: ValidationResult = {
    valid: true,
    message: ''
  };
  return successResult;
}
```

**关键要点：**
- 即使已经定义了接口类型，return 语句也不能直接返回对象字面量
- 必须先创建具有显式类型的变量，然后返回该变量
- 这个规则适用于所有方法，包括 private 方法、public 方法、箭头函数等

### 错误8：泛型参数与 result 字段类型不匹配

**编译错误**：`Types of property 'result' are incompatible. Type 'string' is not comparable to type 'ContactFullInfo'.`

**原因**：`InsightIntentEntryExecutor<T>` 的泛型参数 `T` 决定了 `IntentResult<T>` 中 `result` 字段的类型。如果泛型参数是自定义类型（如 `ContactFullInfo`），则 `result` 字段必须是该类型，不能是 `string` 或其他基本类型。

**错误示例：**
```typescript
interface ContactFullInfo {
  name: string;
  telephony?: string;
  email?: string;
}

// ❌ 错误：泛型参数是 ContactFullInfo，但 result 字段是 string 类型
export default class QueryContactExecutor extends InsightIntentEntryExecutor<ContactFullInfo> {
  async onExecute(): Promise<insightIntent.IntentResult<ContactFullInfo>> {
    const contactInfo: ContactFullInfo = { name: '张三', telephony: '13800000000' };

    // 编译错误：result 字段类型不兼容
    const result: QueryContactResultTyped = {
      code: 0,
      result: '查询成功',  // ❌ string 类型，应该是 ContactFullInfo
      wantParams: { success: true, message: '查询成功' }
    };
    return Promise.resolve(result as insightIntent.IntentResult<ContactFullInfo>);
  }
}

interface QueryContactResultTyped {
  code: number;
  result: string;  // ❌ 类型不匹配
  wantParams: { success: boolean; message: string };
}
```

**正确示例：**
```typescript
interface ContactFullInfo {
  name: string;
  telephony?: string;
  email?: string;
}

// ✅ 正确：泛型参数是 ContactFullInfo，result 字段也是 ContactFullInfo 类型
export default class QueryContactExecutor extends InsightIntentEntryExecutor<ContactFullInfo> {
  async onExecute(): Promise<insightIntent.IntentResult<ContactFullInfo>> {
    const contactInfo: ContactFullInfo = { name: '张三', telephony: '13800000000' };

    const result: QueryContactResultTyped = {
      code: 0,
      result: contactInfo,  // ✅ ContactFullInfo 类型，与泛型参数匹配
      wantParams: { success: true, message: '查询成功' }
    };
    return Promise.resolve(result as insightIntent.IntentResult<ContactFullInfo>);
  }
}

interface QueryContactResultTyped {
  code: number;
  result: ContactFullInfo;  // ✅ 类型匹配
  wantParams: { success: boolean; message: string };
}
```

**类型对照表：**

| 泛型参数 `T` | `result` 字段类型 | 示例 |
|-------------|----------------|------|
| `string` | `string` | 返回简单的文本消息 |
| `number` | `number` | 返回数值结果 |
| `ContactFullInfo` | `ContactFullInfo` | 返回复杂的联系人对象 |
| `UserInfo` | `UserInfo` | 返回用户信息对象 |
| `CustomDataType` | `CustomDataType` | 返回自定义数据类型 |

**关键要点：**
1. **类型必须匹配**：`InsightIntentEntryExecutor<T>` 的泛型 `T` 必须与 `IntentResultTyped.result` 的类型一致
2. **错误处理也要注意**：即使在错误情况下（如未找到数据），`result` 字段也必须是正确的类型，可以创建空对象
3. **所有分支都要匹配**：try 块和 catch 块中的 `result` 字段类型都必须与泛型参数匹配
4. **只定义需要的字段**：如果只需要返回简单消息，使用 `string` 作为泛型参数；如果需要返回复杂对象，使用该对象类型作为泛型参数

### 错误9：装饰器和基类错误使用 namespace 前缀

**编译错误**：
```
Property 'InsightIntentEntry' does not exist on type 'typeof insightIntent'
Property 'InsightIntentEntryExecutor' does not exist on type 'typeof insightIntent'
```

**原因**：`@InsightIntentEntry` 装饰器和 `InsightIntentEntryExecutor` 基类需要**直接导入和使用**，不能通过 `insightIntent` 命名空间访问。`insightIntent` 命名空间只包含枚举（如 `ExecuteMode`）和类型（如 `IntentResult`），不包含装饰器和基类。

**错误示例**：
```typescript
import { insightIntent, InsightIntentEntry, InsightIntentEntryExecutor } from '@kit.AbilityKit';

// ❌ 错误：装饰器使用 namespace 前缀
@insightIntent.InsightIntentEntry({
  intentName: 'PlayMusic',
  domain: 'MusicDomain',
  intentVersion: '1.0.1',
  displayName: '播放音乐',
  llmDescription: '播放指定的音乐文件',
  abilityName: 'EntryAbility',
  executeMode: [insightIntent.ExecuteMode.UI_ABILITY_FOREGROUND]
})

// ❌ 错误：基类使用 namespace 前缀
export default class PlayMusicExecutor extends insightIntent.InsightIntentEntryExecutor<string> {
  async onExecute(): Promise<insightIntent.IntentResult<string>> {
    // ...
  }
}
```

**正确示例**：
```typescript
import { insightIntent, InsightIntentEntry, InsightIntentEntryExecutor } from '@kit.AbilityKit';

// ✅ 正确：装饰器直接使用
@InsightIntentEntry({
  intentName: 'PlayMusic',
  domain: 'MusicDomain',
  intentVersion: '1.0.1',
  displayName: '播放音乐',
  llmDescription: '播放指定的音乐文件',
  abilityName: 'EntryAbility',
  executeMode: [insightIntent.ExecuteMode.UI_ABILITY_FOREGROUND]  // 枚举才需要 namespace 前缀
})

// ✅ 正确：基类直接使用
export default class PlayMusicExecutor extends InsightIntentEntryExecutor<string> {
  async onExecute(): Promise<insightIntent.IntentResult<string>> {  // IntentResult 类型需要 namespace 前缀
    // ...
  }
}
```

**规则速查表**：

| 类型 | 导入方式 | 使用方式 | 是否需要 namespace 前缀 |
|------|---------|---------|----------------------|
| `@InsightIntentEntry` 装饰器 | 直接导入 | `@InsightIntentEntry` | ❌ 否 |
| `InsightIntentEntryExecutor` 基类 | 直接导入 | `extends InsightIntentEntryExecutor` | ❌ 否 |
| `ExecuteMode` 枚举 | 从 `insightIntent` 导入 | `insightIntent.ExecuteMode` | ✅ 是 |
| `IntentResult` 类型 | 从 `insightIntent` 导入 | `insightIntent.IntentResult` | ✅ 是 |
| `InsightIntentContext` 类型 | 从 `insightIntent` 导入 | `insightIntent.InsightIntentContext` | ✅ 是 |

**记忆口诀**：
> **"装饰器和基类直接用，枚举类型加前缀"**

- **装饰器**（`@InsightIntentEntry`）和**基类**（`InsightIntentEntryExecutor`）是独立的导出，直接使用
- **枚举**（`ExecuteMode`、`ReturnMode`）和**类型**（`IntentResult`、`InsightIntentContext`）属于 `insightIntent` 命名空间，需要加前缀

**对比 @InsightIntentFunction 的导入模式**：

```typescript
// @InsightIntentFunction 的导入模式（与 @InsightIntentEntry 不同）
import { InsightIntentFunction, InsightIntentFunctionMethod } from '@kit.AbilityKit';

// 装饰器直接使用
@InsightIntentFunction()
export class MyFunctions {
  @InsightIntentFunctionMethod()
  static myMethod(): string {  // 静态方法，不需要继承基类
    return 'result';
  }
}
```

**关键区别**：
- `@InsightIntentEntry` 需要导入 `insightIntent` 命名空间（用于枚举）+ 装饰器 + 基类
- `@InsightIntentFunction` 只需要导入装饰器，不需要命名空间（没有枚举使用场景）


## 快速参考

### @InsightIntentEntry 必填字段

| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `intentName` | string | 英文PascalCase，动词-名词结构 | `"PlayMusic"`, `"SearchSong"` |
| `domain` | string | 域标识符，取值范围参见[各垂域的智慧分发特性列表](https://developer.huawei.com/consumer/cn/doc/service/intents-ai-distribution-characteristic-0000001901922213#section2656133582215) | `"MusicDomain"`, `"ToolsDomain"` |
| `intentVersion` | string | 语义化版本，匹配标准意图的条件之一，默认填写1.0.1 | `"1.0.1"` |
| `displayName` | string | 中文显示名称 | `"播放音乐"` |
| `abilityName` | string | 绑定的Ability名称，**必须根据意图文件所在模块读取对应的 `module.json5`（如 `entry/src/main/module.json5`），获取 `module.abilities[0].name` 作为值** | `"EntryAbility"` |
| `executeMode` | array | 支持的执行模式 | `[insightIntent.ExecuteMode.UI_ABILITY_FOREGROUND]` |

### @InsightIntentEntry 可选字段

| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `displayDescription` | string | 详细描述 | `"播放指定音乐文件"` |
| `schema` | string | 标准意图schema | `"standard:play"` |
| `icon` | ResourceStr | 图标资源 | `$r('app.media.icon')` |
| `llmDescription` | string | LLM理解描述 | `"播放指定的音乐文件..."` |
| `keywords` | string[] | 搜索关键词 | `["播放", "音乐", "歌曲"]` |
| `parameters` | Record<string, Object> | 意图参数的数据格式声明，用于意图调用时定义入参的数据格式。使用参考[jsonschema_reference.md](./jsonschema_reference.md) | 见下文 |
| `result` | Record<string, Object> | 意图调用返回结果的数据格式声明，用于定义意图调用返回结果的数据格式。使用参考[jsonschema_reference.md](./jsonschema_reference.md) | 见下文 |

### 执行模式（executeMode）

| 模式 | 值 | 说明 | 适用场景 |
|------|---|------|----------|
| `UI_ABILITY_FOREGROUND` | 0 | 前台UI Ability | 需要用户交互的界面 |
| `UI_ABILITY_BACKGROUND` | 1 | 后台UI Ability | 后台静默任务 |
| `UI_EXTENSION_ABILITY` | 2 | UI Extension Ability | 卡片、小组件 |
| `SERVICE_EXTENSION_ABILITY` | 3 | Service Extension Ability | 纯后台服务 |

### 错误代码

| 代码 | 说明 |
|------|------|
| `0` | 成功 |
| `-1` | 通用错误 |
| `-2` | 参数无效 |
| `-3` | 网络错误 |
| `-4` | 权限拒绝 |
| `-5` | 资源未找到 |

### 常用域

| 域 | 说明 | 示例意图 |
|----|------|----------|
| `MusicDomain` | 音乐功能 | PlayMusic, SearchSong |
| `ToolsDomain` | 通用工具 | ProcessData, DownloadFile |
| `SystemSettingsDomain` | 系统设置 | OpenSettings, ChangeTheme |
| `NavigationDomain` | 导航 | NavigateToLocation |
| `ChatDomain` | 消息 | SendMessage |
| `HealthDomain` | 健康追踪 | LogWeight, TrackExercise |

## @InsightIntentEntry 装饰器详解

### 基础示例（无参数）

> **返回值建议**：优先使用 `string` 类型返回执行结果信息，便于用户了解意图执行状态。避免使用 `void` 类型。

```typescript
@InsightIntentEntry({
  intentName: 'PausePlayback',
  domain: 'MusicDomain',
  intentVersion: '1.0.1',
  displayName: '暂停播放',
  llmDescription: '暂停当前正在播放的音乐',
  abilityName: 'EntryAbility',
  executeMode: [insightIntent.ExecuteMode.UI_ABILITY_FOREGROUND]
})
export default class PausePlaybackExecutor extends InsightIntentEntryExecutor<string> {
  async onExecute(): Promise<insightIntent.IntentResult<string>> {
    try {
      // 暂停播放逻辑
      await this.pauseMusic();
      const successResult: insightIntent.IntentResult<string> = {
        code: 0,
        result: '暂停成功：已暂停当前播放'
      };
      return Promise.resolve(successResult);
    } catch (error) {
      const errorMessage: string = error instanceof Error ? error.message : String(error);
      const errorResult: insightIntent.IntentResult<string> = {
        code: -1,
        result: `暂停失败：${errorMessage}`
      };
      return Promise.resolve(errorResult);
    }
  }

  private async pauseMusic(): Promise<void> {
    // 实现暂停逻辑
  }
}
```

### 简单参数示例

```typescript
@InsightIntentEntry({
  intentName: 'SearchSong',
  domain: 'MusicDomain',
  intentVersion: '1.0.1',
  displayName: '搜索歌曲',
  llmDescription: '根据关键词搜索音乐',
  abilityName: 'EntryAbility',
  executeMode: [insightIntent.ExecuteMode.UI_ABILITY_FOREGROUND],
  parameters: {
    'type': 'object',
    'properties': {
      'query': {
        'type': 'string',
        'description': '搜索关键词',
        'minLength': 1
      }
    },
    'required': ['query']
  }
})
export default class SearchSongExecutor extends InsightIntentEntryExecutor<SearchResult> {
  query: string = '';

  async onExecute(): Promise<insightIntent.IntentResult<SearchResult>> {
    const results: SongInfo[] = await this.searchDatabase(this.query);
    
    const searchResult: SearchResult = {
      success: true,
      results: results
    };
    
    const intentResult: insightIntent.IntentResult<SearchResult> = {
      code: 0,
      result: searchResult
    };
    
    return Promise.resolve(intentResult);
  }
  
  private async searchDatabase(query: string): Promise<SongInfo[]> {
    return [];
  }
}

interface SearchResult {
  success: boolean;
  results: SongInfo[];
}

interface SongInfo {
  id: number;
  name: string;
  artist: string;
  url: string;
}
```

### 带返回值Schema示例

```typescript
@InsightIntentEntry({
  intentName: 'SearchSong',
  domain: 'MusicDomain',
  intentVersion: '1.0.1',
  displayName: '搜索歌曲',
  llmDescription: '根据关键词搜索音乐，返回匹配的歌曲列表',
  abilityName: 'EntryAbility',
  executeMode: [insightIntent.ExecuteMode.UI_ABILITY_FOREGROUND],
  parameters: {
    'type': 'object',
    'properties': {
      'query': {
        'type': 'string',
        'description': '搜索关键词'
      }
    },
    'required': ['query']
  },
  result: {
    'type': 'object',
    'properties': {
      'success': {
        'type': 'boolean',
        'description': '搜索是否成功'
      },
      'results' : {
        'type': 'array',
        'description': '搜索结果列表',
        'items': {
          'type': 'object',
          'properties': {
            'id': { 'type': 'number' },
            'name': { 'type': 'string' },
            'artist': { 'type': 'string' },
            'url': { 'type': 'string' }
          }
        }
      }
    }
  }
})
export default class SearchSongExecutor extends InsightIntentEntryExecutor<SearchResult> {
  query: string = '';

  async onExecute(): Promise<insightIntent.IntentResult<SearchResult>> {
    const results: SongInfo[] = await this.searchDatabase(this.query);
    
    const searchResult: SearchResult = {
      success: true,
      results: results
    };
    
    const intentResult: insightIntent.IntentResult<SearchResult> = {
      code: 0,
      result: searchResult
    };
    
    return Promise.resolve(intentResult);
  }
  
  private async searchDatabase(query: string): Promise<SongInfo[]> {
    return [];
  }
}
```

## InsightIntentEntryExecutor 基类详解

### 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `executeMode` | insightIntent.ExecuteMode | 表示意图执行模式。即拉起绑定的Ability组件时支持的执行模式。 |
| `context` | InsightIntentContext | 意图执行上下文 |
| `windowStage` | window.WindowStage? | 表示windowStage实例对象，和onWindowStageCreate接口的windowStage实例是同一个，可用于加载意图执行的页面。仅当executeMode字段取值为UI_ABILITY_FOREGROUND（即意图执行需要将UIAbility显示在前台时），该属性生效。 |
| `uiExtensionSession` | UIExtensionContentSession? | 表示UIExtensionContentSession实例对象，和onSessionCreate接口的UIExtensionContentSession实例是同一个，可用于加载意图执行的页面。仅当executeMode字段取值为UI_EXTENSION_ABILITY（即意图执行需要拉起UIExtensionAbility时），该属性生效。 |

### 必须重写的方法

```typescript
async onExecute(): Promise<insightIntent.IntentResult<T>>
```

### 上下文方法

```typescript
// 启动Ability，只允许拉该应用的其他Ability
await this.context.startAbility(want: Want);

// 设置返回模式（只支持UIAbility前台）
this.context.setReturnModeForUIAbilityForeground(
  insightIntent.ReturnMode.CALLBACK
);

// 设置返回模式（只支持UIExtensionAbility）
this.context.setReturnModeForUIExtensionAbility(
  insightIntent.ReturnMode.FUNCTION
);
```

### 返回模式

| 模式 | 说明 |
|------|------|
| `CALLBACK` | 通过 `onExecute()` 回调返回结果 |
| `FUNCTION` | 通过 `sendExecuteResult()` 方法返回结果 |


## 核心规则

### 代码输出要求
- ✅ 不管项目中原有意图使用的是哪种模式，必须使用@IsightIntentEntry 装饰器模式,不允许使用InsightIntentExecutor 基类模式。
- ✅ 功能实现通过继承 `InsightIntentEntryExecutor` 基类实现
- ✅ 使用 `export default` 导出继承类
- ✅ 通过重载 `onExecute` 实现具体功能
- ✅ 只允许在继承类上添加 `@InsightIntentEntry` 装饰器
- ✅ 类的属性仅支持ArkTS语法基础类型或意图实体，返回值仅支持基础类型或意图实体。
- ✅ 当类的属性是对象类型或非ArkTS语法基础类型，必须使用 `@InsightIntentEntity` 装饰器定义意图实体。@InsightIntentEntity详细使用说明请参考：[insight_intent_entity.md](./insight_intent_entity.md)
- ✅ 新增文件时，在 `insight_intent.json` 的 `insightIntentsSrcEntry` 数组中添加文件路径
- ✅ 代码生成后需要自验证，修复语法错误
- ❌ 不允许新增/更新/删除其他任何位置的代码

### parameters 与类属性对应规则（重要）

> **⚠️ 核心原则**：`@InsightIntentEntry` 的 `parameters.properties` 中的属性名必须与执行器类的属性名**一一对应**！

> **⚠️ JSON Schema 类型限制**：parameters 中的 `type` 只支持以下类型：
> - `string`：字符串
> - `number`：数字（**注意：不支持 `integer`，整数也使用 `number`**）
> - `boolean`：布尔值
> - `array`：数组
> - `object`：对象
> 
> 详细说明请参考 [jsonschema_reference.md](./jsonschema_reference.md)

#### 规则1：简单类型参数

```typescript
// ✅ 正确：parameters 属性名与类属性名一致
@InsightIntentEntry({
  parameters: {
    'properties': {
      'songName': { 'type': 'string', 'description': '歌曲名称' }
    },
    'required': ['songName']  // 必填属性必须标记
  }
})
export default class PlayMusicExecutor extends InsightIntentEntryExecutor<string> {
  songName: string = '';  // 类属性名 = parameters 属性名
}

// ❌ 错误：属性名不匹配
@InsightIntentEntry({
  parameters: {
    'properties': {
      'musicName': { 'type': 'string' }  // 与类属性名不一致
    }
  }
})
export default class PlayMusicExecutor extends InsightIntentEntryExecutor<string> {
  songName: string = '';  // 无法注入
}
```

#### 🔴 规则1.1：类属性类型必须与 JSON Schema 类型严格匹配

**类属性类型必须是 JSON Schema 支持的基础类型，禁止使用联合类型（union type）。**

```typescript
// ❌ 错误：类属性使用联合类型，与 JSON Schema 的 string 类型不匹配
type SourceType = 'file_manager' | 'gallery';

@InsightIntentEntry({
  parameters: {
    'properties': {
      'source': { 'type': 'string', 'enum': ['file_manager', 'gallery'] }
    }
  }
})
export default class PlayExecutor extends InsightIntentEntryExecutor<Result> {
  source: SourceType = 'file_manager';  // ❌ 联合类型不匹配 string
}

// ✅ 正确：类属性使用与 JSON Schema 一致的基础类型
@InsightIntentEntry({
  parameters: {
    'properties': {
      'source': { 'type': 'string', 'enum': ['file_manager', 'gallery'] }
    }
  }
})
export default class PlayExecutor extends InsightIntentEntryExecutor<Result> {
  source: string = 'file_manager';  // ✅ string 类型匹配
}
```


#### 规则2：使用实体类包装参数

```typescript
// ✅ 正确：parameters 定义 params 属性，并嵌套其子属性
@InsightIntentEntity({
  entityCategory: 'play song params category',
  parameters: {
    'type': 'object',
    'properties': {
      'songName': { 'type': 'string', 'description': '歌曲名称' },
      'artistName': { 'type': 'string', 'description': '歌手名称' }
    }
  }
})
export class PlaySongParams implements insightIntent.IntentEntity {
  entityId: string = '0x01';
  songName: string = '';
  artistName: string = '';
}

@InsightIntentEntry({
  parameters: {
    'properties': {
      'params': {                                    // 类属性名
        'type': 'object',                            // JSON Schema 只支持基础类型
        'description': '播放歌曲参数',
        'properties': {                              // 嵌套定义子属性
          'songName': { 'type': 'string', 'description': '歌曲名称' },
          'artistName': { 'type': 'string', 'description': '歌手名称' }
        }
      }
    },
    'required': ['params']  // 如果 params 必填，必须标记
  }
})
export default class PlaySongExecutor extends InsightIntentEntryExecutor<string> {
  params: PlaySongParams = new PlaySongParams();  // 类属性名 = parameters 属性名
}

// ❌ 错误：直接展开实体属性，缺少外层 params
@InsightIntentEntry({
  parameters: {
    'properties': {
      'songName': { 'type': 'string' },  // 缺少 params 包装层
      'artistName': { 'type': 'string' }
    }
  }
})
export default class PlaySongExecutor extends InsightIntentEntryExecutor<string> {
  params: PlaySongParams = new PlaySongParams();  // 无法注入
}

// ❌ 错误：type 使用自定义类型名
@InsightIntentEntry({
  parameters: {
    'properties': {
      'params': {
        'type': 'PlaySongParams'  // JSON Schema 不支持自定义类型名
      }
    }
  }
})
```

#### 规则3：嵌套对象参数

```typescript
// ✅ 正确：嵌套对象的 properties 需要完整定义
@InsightIntentEntry({
  parameters: {
    'properties': {
      'artist': {                           // 类属性名
        'type': 'object',
        'description': '歌手信息',
        'properties': {                     // 嵌套定义
          'name': { 'type': 'string', 'description': '歌手名称' },
          'country': { 'type': 'string', 'description': '国籍' }
        },
        'required': ['name']
      }
    },
    'required': ['artist']
  }
})
export default class PlayMusicExecutor extends InsightIntentEntryExecutor<string> {
  artist: ArtistInfo = new ArtistInfo();  // 类属性名 = parameters 属性名
}
```

#### 检查清单

生成代码后，必须验证以下对应关系：

| 检查项 | 说明 |
|--------|------|
| 属性名一致 | `parameters.properties` 的每个属性名 = 执行器类的属性名 |
| 类型一致 | `parameters.properties.xxx.type` = 执行器类属性的类型（**禁止使用联合类型**） |
| 嵌套定义完整 | 对象类型属性必须在 `properties` 中定义子属性 |
| 必填标记 | 必填属性必须在 `required` 数组中列出 |

**类型一致示例：**
- JSON Schema `type: 'string'` → 类属性 `string`（不是 `'a' | 'b'`）
- JSON Schema `type: 'number'` → 类属性 `number`（不是 `1 | 2`）
- JSON Schema `type: 'boolean'` → 类属性 `boolean`（不是 `true | false`）

### ArkTS 语法规范（必须严格遵守）

#### 1. 类属性初始化

```typescript
// ❌ 错误：没有初始化
export default class PlayMusicExecutor extends InsightIntentEntryExecutor<string> {
  params: MusicParams;
  songName: string;
}

// ✅ 正确：显式初始化
export default class PlayMusicExecutor extends InsightIntentEntryExecutor<string> {
  params: MusicParams = new MusicParams();
  songName: string = '';
}
```

#### 2. 禁止解构赋值

```typescript
// ❌ 错误：不支持解构赋值
const { songName, artistName } = this.params;
const { songlist } = await import('../data/music');

// ✅ 正确：直接访问
const songName: string = this.params.songName || '';
const artistName: string = this.params.artistName || '';

// ✅ 正确：使用模块对象访问
const musicModule = await import('../data/music');
const songlist: songtype[] = musicModule.songlist;
```

#### 3. 对象字面量类型声明

```typescript
// ❌ 错误：对象字面量必须对应显式声明的类或接口
const result = { code: 0, result: '播放成功' };
const playInfo = { name: song.name, author: song.author };

// ✅ 正确：定义接口并使用显式类型
interface PlayMusicResult {
  code: number;
  result?: string;
}

interface PlayInfoData {
  name: string;
  author: string;
  img: string;
  url: string;
  id: number;
}

const result: PlayMusicResult = { code: 0, result: '播放成功' };
const playInfo: PlayInfoData = {
  name: song.name,
  author: song.author,
  img: song.img,
  url: song.url,
  id: song.id
};
```

#### 4. emitter.emit 数据格式

```typescript
// ❌ 错误：emitter.emit 需要包含 data 字段
emitter.emit('playMusic', playInfo);

// ✅ 正确：使用包含 data 字段的对象
emitter.emit('playMusic', { data: playInfo });
```

#### 5. 显式类型声明

```typescript
// ❌ 错误：缺少类型声明
const message = songName && artistName ? '...' : '...';
```

#### 6. 错误处理

```typescript
try {
  await operation();
} catch (error) {
  const errorMessage: string = error instanceof Error ? error.message : String(error);
  hilog.error(0x0000, LOG_TAG, 'Error: %{public}s', errorMessage);
}
```

#### 7. Promise 返回值

```typescript
// ❌ 错误：reject 用于错误情况
return Promise.reject(result);

// ✅ 正确：resolve 用于成功结果
return Promise.resolve(result);
```

#### 8. 可选类型属性处理

```typescript
// ❌ 错误：直接将可选类型赋值给非可选类型
interface ItemInfo {
  page?: number;      // 可选类型 number | undefined
  row?: number;
  column?: number;
}

const oldPage: number = appItem.page;     // 编译错误：Type 'number | undefined' is not assignable to type 'number'
const oldRow: number = appItem.row;
const oldColumn: number = appItem.column;

// ✅ 正确：使用空值合并运算符提供默认值
const oldPage: number = appItem.page ?? 0;
const oldRow: number = appItem.row ?? 0;
const oldColumn: number = appItem.column ?? 0;

// ✅ 正确：使用逻辑或运算符（注意 0 会被视为 falsy）
const itemPage: number = appItem.page || 0;  // 如果 page 为 0，会使用默认值 0

// ✅ 推荐：使用空值合并运算符 ??（只有 null/undefined 时才使用默认值）
const itemPage: number = appItem.page ?? -1;  // 如果 page 为 0，保留 0；如果为 undefined，使用 -1
```

#### 9. 方法返回类型声明（禁止使用对象字面量）

**⚠️ ArkTS 严格模式核心规则：方法返回类型不能使用内联对象字面量声明，必须定义接口！**

**编译错误**：`Object literals cannot be used as type declarations (arkts-no-obj-literals-as-types)`

```typescript
// ❌ 错误：返回类型使用内联对象字面量声明
private validateParams(): { valid: boolean; message: string } {
  // ...
}

// ❌ 错误：返回类型使用联合的对象字面量
private getData(): { name: string } | { error: string } {
  // ...
}

// ✅ 正确：定义接口并在返回类型中使用
interface ValidationResult {
  valid: boolean;
  message: string;
}

private validateParams(): ValidationResult {
  // ...
}

// ✅ 正确：使用已定义的接口
interface DataResult {
  name: string;
}

interface ErrorResult {
  error: string;
}

private getData(): DataResult | ErrorResult {
  // ...
}
```

**关键要点**：
- 所有方法的返回类型都必须使用预定义的接口或类型
- 不能在返回类型位置直接写对象字面量 `{ ... }`
- 即使是简单的对象结构，也必须先定义接口

#### 10. 方法 return 语句禁止直接返回对象字面量

**⚠️ ArkTS 严格模式核心规则：方法中的 return 语句不能直接返回对象字面量，必须先创建显式类型的变量！**

**编译错误**：`Object literal must correspond to some explicitly declared class or interface (arkts-no-untyped-obj-literals)`

```typescript
// ❌ 错误：直接返回对象字面量
private validateParams(): ValidationResult {
  if (!this.name) {
    return { valid: false, message: '姓名不能为空' };  // 编译错误
  }
  return { valid: true, message: '' };  // 编译错误
}

// ✅ 正确：先创建显式类型的变量，再返回
private validateParams(): ValidationResult {
  if (!this.name) {
    const result: ValidationResult = { valid: false, message: '姓名不能为空' };
    return result;
  }
  const successResult: ValidationResult = { valid: true, message: '' };
  return successResult;
}

// ❌ 错误：箭头函数直接返回对象字面量
const getResult = () => ({ code: 0, message: '成功' });  // 编译错误

// ✅ 正确：先声明变量再返回
const getResult = (): ResultType => {
  const result: ResultType = { code: 0, message: '成功' };
  return result;
};
```

**通用模板**：

```typescript
interface MyResult {
  success: boolean;
  message: string;
  data?: string;
}

private myMethod(): MyResult {
  // 处理逻辑...

  // 必须先创建显式类型的变量
  const result: MyResult = {
    success: true,
    message: '操作成功'
  };

  return result;
}

private myMethodWithError(): MyResult {
  // 错误情况也需要显式类型
  const errorResult: MyResult = {
    success: false,
    message: '操作失败'
  };

  return errorResult;
}
```

**关键要点**：
- 所有 return 语句中的对象字面量都必须先声明为显式类型的变量
- 即使 return 语句在方法的不同分支中，每个分支都要遵循此规则
- 这个规则适用于所有方法，包括 private 方法、工具方法等

#### 11. 对象字面量作为返回值（重要）

**⚠️ ArkTS 严格模式核心规则：所有 `Promise.resolve()` 中的对象字面量必须使用显式类型声明！**

```typescript
// ❌ 错误：Promise.resolve 中的对象字面量没有显式类型声明
return Promise.resolve({
  code: 0,
  result: { success: true, message: '播放成功' }
});

// ❌ 错误：简单的返回对象也需要类型声明
return Promise.resolve({ code: -1 });

// ✅ 正确：定义接口并为返回对象添加显式类型声明
interface PlayMusicResult {
  success: boolean;
  message: string;
  songName?: string;
  artistName?: string;
}

// 在方法内部声明 intentResult 变量并指定类型
const successResult: PlayMusicResult = {
  success: true,
  message: '播放成功',
  songName: '起风了',
  artistName: '买辣椒也用券'
};

const intentResult: insightIntent.IntentResult<PlayMusicResult> = {
  code: 0,
  result: successResult
};
return Promise.resolve(intentResult);

// ✅ 正确：错误返回也需要类型声明
const errorResult: PlayMusicResult = {
  success: false,
  message: '未找到歌曲'
};

const errorIntentResult: insightIntent.IntentResult<PlayMusicResult> = {
  code: -5,
  result: errorResult
};
return Promise.resolve(errorIntentResult);

// ✅ 正确：无 result 的简单返回
const simpleResult: insightIntent.IntentResult<void> = { code: 0 };
return Promise.resolve(simpleResult);
```

**通用模板：**

```typescript
async onExecute(): Promise<insightIntent.IntentResult<TResult>> {
  try {
    // 1. 定义返回数据对象
    const dataResult: TResult = {
      // ... 属性值
    };
    
    // 2. 定义意图返回对象（必须显式类型声明）
    const intentResult: insightIntent.IntentResult<TResult> = {
      code: 0,
      result: dataResult
    };
    
    return Promise.resolve(intentResult);
  } catch (error) {
    const errorMessage: string = error instanceof Error ? error.message : String(error);
    
    // 错误返回也需要类型声明
    const errorResult: TResult = {
      success: false,
      message: errorMessage
    };
    
    const errorIntentResult: insightIntent.IntentResult<TResult> = {
      code: -1,
      result: errorResult
    };
    
    return Promise.resolve(errorIntentResult);
  }
}
```

#### 12. 外部模块 API 验证

```typescript
// ❌ 错误：假设 API 存在而未验证
const gridAppsInfos = cacheManager.getGridAppsInfos();  // 方法可能不存在

// ✅ 正确：使用前先搜索验证 API 是否存在
// 1. 使用 Grep 工具搜索类定义和可用方法
// 2. 确认方法名称、参数类型和返回类型
// 3. 如果方法不存在，查找替代方法

// 示例：LaunchLayoutCacheManager 的正确方法
const gridLayoutItemList: GridLayoutItemInfo[] = cacheManager.getAllGridLayoutItemList(BusinessType.BUSINESS_BASIC_DESKTOP);
```

#### 13. 模块导入路径验证

```typescript
// ❌ 错误：从主模块导入时，某些类型可能被导出为 type 而非 value
import { GridLayoutItemInfo, LaunchLayoutCacheManager, RdbStoreManager, BusinessType } from '@ohos/launchercommon';
// 编译错误：'BusinessType' cannot be used as a value because it was exported using 'export type'

// ✅ 正确：分离导入，枚举类型从具体路径导入
import { GridLayoutItemInfo, LaunchLayoutCacheManager, RdbStoreManager } from '@ohos/launchercommon';
import { BusinessType } from '@ohos/launchercommon/src/main/ets/constants/CommonConstants';

// 规则：
// 1. 如果编译器报错 "cannot be used as a value because it was exported using 'export type'"
// 2. 需要从具体源文件路径导入该类型
// 3. 使用 Grep 搜索项目中其他文件的导入方式作为参考
```

## 实战示例

### 场景1：多执行模式处理

```typescript
import { insightIntent, InsightIntentEntry, InsightIntentEntryExecutor, InsightIntentEntity } from '@kit.AbilityKit';

interface DownloadResult {
  success: boolean;
  path: string;
}

@InsightIntentEntity({
  entityCategory: 'download params category',
  parameters: {
    '$id': '/schemas/DownloadParams',
    'type': 'object',
    'description': '下载文件参数',
    'properties': {
      'url': {
        'type': 'string',
        'description': '文件URL',
        'minLength': 1
      },
      'savePath': {
        'type': 'string',
        'description': '保存路径',
        'minLength': 1
      }
    },
    'required': ['url', 'savePath']
  }
})
export class DownloadParams implements insightIntent.IntentEntity {
  entityId: string = '0x12';
  url: string = '';
  savePath:: string = '';
}

@InsightIntentEntry({
  intentName: 'DownloadFile',
  domain: 'ToolsDomain',
  intentVersion: '1.0.1',
  displayName: '下载文件',
  llmDescription: '下载指定URL的文件，支持前台和后台下载',
  abilityName: 'EntryAbility',
  executeMode: [
    insightIntent.ExecuteMode.UI_ABILITY_FOREGROUND,
    insightIntent.ExecuteMode.UI_ABILITY_BACKGROUND
  ],
  parameters: {
    'type': 'object',
    'properties': {
      'params': {
        'type': 'object',
        'description': '下载参数',
        'properties': {
          'url': {
            'type': 'string',
            'description': '文件URL',
            'minLength': 1
          },
          'savePath': {
            'type': 'string',
            'description': '保存路径',
            'minLength': 1
          }
        },
        'required': ['url', 'savePath']
      }
    },
    'required': ['params']
  }
})
export default class DownloadFileExecutor extends InsightIntentEntryExecutor<DownloadResult> {
  params: DownloadParams = new DownloadParams();

  async onExecute(): Promise<insightIntent.IntentResult<DownloadResult>> {
    if (this.executeMode === insightIntent.ExecuteMode.UI_ABILITY_FOREGROUND) {
      return await this.downloadWithUI(this.params);
    } else if (this.executeMode === insightIntent.ExecuteMode.UI_ABILITY_BACKGROUND) {
      return await this.downloadInBackground(this.params);
    }
    
    const errorResult: insightIntent.IntentResult<DownloadResult> = { code: -1 };
    return Promise.resolve(errorResult);
  }
  
  private async downloadWithUI(params: DownloadParams): Promise<insightIntent.IntentResult<DownloadResult>> {
    // 显示进度UI
    const downloadResult: DownloadResult = { success: true, path: params.savePath };
    const intentResult: insightIntent.IntentResult<DownloadResult> = {
      code: 0,
      result: downloadResult
    };
    return Promise.resolve(intentResult);
  }
  
  private async downloadInBackground(params: DownloadParams): Promise<insightIntent.IntentResult<DownloadResult>> {
    // 后台下载
    const downloadResult: DownloadResult = { success: true, path: params.savePath };
    const intentResult: insightIntent.IntentResult<DownloadResult> = {
      code: 0,
      result: downloadResult
    };
    return Promise.resolve(intentResult);
  }
}
```

### 场景2：使用Context启动Ability

```typescript
import { insightIntent, InsightIntentEntry, InsightIntentEntryExecutor } from '@kit.AbilityKit';
import Want from '@ohos.app.ability.Want';
import { hilog } from '@kit.PerformanceAnalysisKit';

const LOG_TAG: string = 'SettingsIntent';

@InsightIntentEntry({
  intentName: 'OpenSettings',
  domain: 'SystemSettingsDomain',
  intentVersion: '1.0.1',
  displayName: '打开设置',
  llmDescription: '打开应用设置页面',
  abilityName: 'EntryAbility',
  executeMode: [insightIntent.ExecuteMode.UI_ABILITY_FOREGROUND]
})
export default class OpenSettingsExecutor extends InsightIntentEntryExecutor<void> {
  async onExecute(): Promise<insightIntent.IntentResult<void>> {
    const want: Want = {
      bundleName: 'com.example.app', // 本应用名称
      abilityName: 'SettingsAbility',
      moduleName: 'entry'
    };
    
    try {
      await this.context.startAbility(want);
      hilog.info(0x0000, LOG_TAG, 'Settings opened successfully');
      const successResult: insightIntent.IntentResult<void> = { code: 0 };
      return Promise.resolve(successResult);
    } catch (error) {
      const errorMessage: string = error instanceof Error ? error.message : String(error);
      hilog.error(0x0000, LOG_TAG, 'Failed to open settings: %{public}s', errorMessage);
      const errorResult: insightIntent.IntentResult<void> = { code: -1 };
      return Promise.resolve(errorResult);
    }
  }
}
```

### 场景3：复杂参数验证

```typescript
import { insightIntent, InsightIntentEntry, InsightIntentEntryExecutor, InsightIntentEntity } from '@kit.AbilityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';

const LOG_TAG: string = 'ShareIntent';

@InsightIntentEntity({
  entityCategory: 'share params category',
  parameters: {
    '$id': '/schemas/ShareParams',
    'type': 'object',
    'description': '分享参数',
    'properties': {
      'content': {
        'type': 'string',
        'description': '分享内容',
        'minLength': 1,
        'maxLength': 1000
      },
      'platform': {
        'type': 'string',
        'description': '分享平台',
        'enum': ['wechat', 'weibo', 'qq', 'twitter']
      },
      'imageUrls': {
        'type': 'array',
        'description': '图片URL列表',
        'items': {
          'type': 'string',
          'format': 'uri'
        },
        'maxItems': 9
      }
    },
    'required': ['content', 'platform']
  }
})
export class ShareParams implements insightIntent.IntentEntity {
  entityId: string = '0x13';
  content: string = '';
  platform: string = '';
  imageUrls: string[] = [];
}

@InsightIntentEntry({
  intentName: 'ShareContent',
  domain: 'SocialDomain',
  intentVersion: '1.0.1',
  displayName: '分享内容',
  llmDescription: '分享内容到指定社交平台',
  abilityName: 'EntryAbility',
  executeMode: [insightIntent.ExecuteMode.UI_ABILITY_FOREGROUND],
  parameters: {
    'type': 'object',
    'properties': {
      'params': {
        'type': 'object',
        'description': '分享参数',
        'properties': {
          'content': {
            'type': 'string',
            'description': '分享内容',
            'minLength': 1,
            'maxLength': 1000
          },
          'platform': {
            'type': 'string',
            'description': '分享平台',
            'enum': ['wechat', 'weibo', 'qq', 'twitter']
          },
          'imageUrls': {
            'type': 'array',
            'description': '图片URL列表',
            'items': {
              'type': 'string',
              'format': 'uri'
            },
            'maxItems': 9
          }
        },
        'required': ['content', 'platform']
      }
    },
    'required': ['params']
  }
})
export default class ShareContentExecutor extends InsightIntentEntryExecutor<ShareResult> {
  params: ShareParams = new ShareParams();

  async onExecute(): Promise<insightIntent.IntentResult<ShareResult>> {
    // 参数验证
    if (!this.validateParams()) {
      hilog.error(0x0000, LOG_TAG, 'Invalid parameters');
      const invalidResult: insightIntent.IntentResult<ShareResult> = { code: -2 };
      return Promise.resolve(invalidResult);
    }
    
    // 执行分享
    const result: ShareResult = await this.shareToPlatform(this.params);
    
    const intentResult: insightIntent.IntentResult<ShareResult> = {
      code: 0,
      result: result
    };
    return Promise.resolve(intentResult);
  }
  
  private validateParams(): boolean {
    if (this.params.content.length === 0 || this.params.content.length > 1000) {
      return false;
    }
    
    const validPlatforms: string[] = ['wechat', 'weibo', 'qq', 'twitter'];
    if (!validPlatforms.includes(this.params.platform)) {
      return false;
    }
    
    if (this.params.imageUrls.length > 9) {
      return false;
    }
    
    return true;
  }
  
  private async shareToPlatform(params: ShareParams): Promise<ShareResult> {
    // 实现分享逻辑
    const shareResult: ShareResult = {
      success: true,
      platform: params.platform
    };
    return shareResult;
  }
}

interface ShareResult {
  success: boolean;
  platform: string;
}
```

### 场景4：意图与页面关联

当使用 `UI_ABILITY_FOREGROUND` 执行模式时，意图执行器可以通过 `LocalStorage` 将参数传递给目标页面。

#### 执行器端：传递参数

```typescript
@InsightIntentEntry({
  intentName: 'PlayMusic',
  // ...
  executeMode: [insightIntent.ExecuteMode.UI_ABILITY_FOREGROUND],
})
export default class PlayMusicExecutor extends InsightIntentEntryExecutor<PlayMusicResult> {
  songName: string = '';
  artistName: string = '';

  onExecute(): Promise<insightIntent.IntentResult<PlayMusicResult>> {
    // 创建 LocalStorage 并存储参数
    let storage: LocalStorage = new LocalStorage();
    storage.setOrCreate('songName', this.songName);
    storage.setOrCreate('artistName', this.artistName);
    storage.setOrCreate('playMode', 'list'); // 额外参数

    // 加载页面并传递 storage
    this.windowStage?.loadContent('pages/PlayMusicPage', storage, (err) => {
      if (err.code) {
        hilog.error(0x0000, LOG_TAG, 'Failed to load page: %{public}s', err.message);
      }
    });

    const playMusicResult: PlayMusicResult = { message: '加载播放页面' };
    const intentResult: insightIntent.IntentResult<PlayMusicResult> = {
      code: 0,
      result: playMusicResult
    };
    return Promise.resolve(intentResult);
  }
}
```

#### 页面端：接收参数

```typescript
@Entry
@Component
struct PlayMusicPage {
  // 使用 @LocalStorageProp 接收参数
  @LocalStorageProp('songName') songName: string = '';
  @LocalStorageProp('artistName') artistName: string = '';
  @LocalStorageProp('playMode') playMode: string = 'list';

  aboutToAppear(): void {
    hilog.info(0x0000, 'PlayMusicPage', 'songName: %{public}s', this.songName);
    // 使用参数初始化播放器
  }

  build() {
    Column() {
      Text(`${this.songName} - ${this.artistName}`)
        .fontSize(20)
    }
  }
}
```

#### 注意事项

1. **参数类型**：`LocalStorage` 支持基本类型（string、number、boolean）
2. **默认值**：`@LocalStorageProp` 必须提供默认值
3. **生命周期**：`LocalStorage` 与页面绑定，页面销毁时自动释放


## insight_intent.json 配置

详细配置说明请参考 [write_config_file.md](./write_config_file.md)

## 代码生成检查清单

### 🔴 必须检查（会导致编译失败）

- [ ] 所有类属性都有初始值（基本类型用默认值，对象类型用 `new ClassName()`）
- [ ] 没有使用解构赋值语法（包括 `const { x } = obj` 和 `const { x } = await import()`）
- [ ] 所有变量都有显式类型声明
- [ ] 对象字面量必须对应显式声明的类或接口
- [ ] Promise 返回值使用 `resolve()` 而不是 `reject()`
- [ ] `@InsightIntentEntry` 装饰器所有必填字段都已填写
- [ ] 执行器类使用 `export default` 导出
- [ ] emitter.emit 调用时使用包含 `data` 字段的对象
- [ ] **装饰器和基类直接使用，不使用 namespace 前缀**（`@InsightIntentEntry` ✅，`@insightIntent.InsightIntentEntry` ❌）
- [ ] **枚举和类型使用 namespace 前缀**（`insightIntent.ExecuteMode` ✅，`ExecuteMode` ❌）
- [ ] **可选类型属性访问时提供默认值（使用 `??` 或 `||`）**
- [ ] **方法返回类型不能使用对象字面量声明（必须定义接口）**
- [ ] **return 语句不能直接返回对象字面量（先创建显式类型变量）**
- [ ] **Promise.resolve() 中的对象字面量使用显式类型声明**
- [ ] **外部模块 API 调用前验证方法是否存在**

### 🟡 建议检查（可能导致运行时错误）

- [ ] 错误处理中有显式类型转换
- [ ] 可选属性访问都提供了默认值（使用 `|| ''` 或 `?? ''`）
- [ ] `onExecute()` 方法返回 `Promise<insightIntent.IntentResult<T>>`
- [ ] JsonSchema 中的 `required` 字段与实际参数匹配

### 🟢 优化建议（提升代码质量）

- [ ] 没有使用 `any` 类型
- [ ] 所有接口属性都有类型标注
- [ ] `llmDescription` 描述详细且清晰
- [ ] 使用了合适的 `domain` 和 `executeMode`
- [ ] 错误代码使用标准值（0, -1, -2, -3, -4, -5）

### 自动检查脚本

```typescript
// 示例：自动检查脚本
function checkCodeQuality(executorClass: any): void {
  // 检查类属性初始化
  const instance: any = new executorClass();
  for (const key of Object.keys(instance)) {
    if (instance[key] === undefined) {
      console.error(`属性 ${key} 未初始化`);
    }
  }
  
  // 检查是否有 onExecute 方法
  if (typeof instance.onExecute !== 'function') {
    console.error('缺少 onExecute 方法');
  }
}
```

## 注意事项

1. **参数描述亲和大模型**：工具用于大模型理解和调用，因此生成参数描述时，需要亲和大模型，更容易被大模型理解和调用
2. **最多输出一个意图结果**：如果用户提供信息无法进行生成，提示用户补充功能描述
3. **检查参数类型匹配**：意图必须实现所有必选参数且类型匹配
4. **导出要求**：被 @InsightIntentEntry 装饰的类需要使用 `export default` 导出


## 代码验证 checkList

生成意图代码后，请按以下清单进行验证：

### 必检项

| 检查项 | 检查内容 | 通过条件 |
|--------|----------|----------|
| ☐ 装饰器导入 | 是否正确导入装饰器 | `import { InsightIntentEntry, ... } from '@kit.AbilityKit'` |
| ☐ 装饰器使用 | 装饰器是否直接使用（无namespace前缀） | `@InsightIntentEntry({...})` ✅，`@insightIntent.InsightIntentEntry` ❌ |
| ☐ 基类继承 | 基类是否直接使用（无namespace前缀） | `extends InsightIntentEntryExecutor<string>` ✅，`extends insightIntent.InsightIntentEntryExecutor<string>` ❌ |
| ☐ 枚举使用 | 枚举是否使用namespace前缀 | `insightIntent.ExecuteMode.UI_ABILITY_FOREGROUND` ✅ |
| ☐ 类导出 | 是否使用 `export default` | `export default class XxxExecutor ...` |
| ☐ 属性初始化 | 所有类属性是否有初始值 | `songName: string = '';` 而非 `songName: string;` |
| ☐ 返回类型 | `onExecute` 返回值是否正确 | `Promise<insightIntent.IntentResult<T>>` |

### 必填字段检查

| 字段 | 是否必填 | 示例 |
|------|----------|-------|
| `intentName` | ✅ 必填 | `'PlayMusic'` (PascalCase) |
| `domain` | ✅ 必填 | `'MusicDomain'` |
| `intentVersion` | ✅ 必填 | `'1.0.0'` |
| `displayName` | ✅ 必填 | `'播放音乐'` |
| `abilityName` | ✅ 必填 | `'EntryAbility'` |
| `executeMode` | ✅ 必填 | `[insightIntent.ExecuteMode.UI_ABILITY_FOREGROUND]` |
| `llmDescription` | 自定义意图必填 | 大模型理解用的描述 |
| `keywords` | 自定义意图必填 | `['播放', '音乐']` |

### ArkTS 语法检查

```typescript
// ❌ 错误示例
const { songName, artistName } = this.params;  // 禁止解构赋值
const result = { code: 0 };  // 缺少类型声明

// ✅ 正确示例
const songName: string = this.params.songName ?? '';
const result: PlayResult = { code: 0 };
```

### 配置检查

- ☐ `insight_intent.json` 中是否添加了意图文件路径
- ☐ 文件路径是否正确（相对于项目根目录）
- ☐ 项目根目录的 `build-profile.json5` 中是否配置 `useNormalizedOHMUrl`

## 最佳实践

### 1. 命名规范

```typescript
// ✅ 良好的命名
intentName: 'PlayMusic'           // 动词-名词结构，PascalCase
class PlayMusicExecutor           // 描述性类名
domain: 'MusicDomain'             // 相关域
```

### 2. LLM描述优化

```typescript
// ❌ 过于简单
llmDescription: '播放音乐'

// ✅ 详细描述
llmDescription: '播放指定的音乐文件。支持通过歌曲名称、歌手信息等参数精确匹配音乐。播放成功后返回歌曲信息。'
```

### 3. 错误处理

```typescript
async onExecute(): Promise<insightIntent.IntentResult<T>> {
  try {
    const result: T = await this.performOperation();
    return Promise.resolve({ code: 0, result: result });
  } catch (error) {
    const errorMessage: string = error instanceof Error ? error.message : String(error);
    hilog.error(0x0000, LOG_TAG, 'Operation failed: %{public}s', errorMessage);
    
    // 根据错误类型返回不同的错误码
    if (errorMessage.includes('network')) {
      return Promise.resolve({ code: -3 });
    } else if (errorMessage.includes('permission')) {
      return Promise.resolve({ code: -4 });
    }
    
    return Promise.resolve({ code: -1 });
  }
}
```

### 4. 日志记录

```typescript
const LOG_TAG: string = 'PlayMusicIntent';

async onExecute(): Promise<insightIntent.IntentResult<string>> {
  hilog.info(0x0000, LOG_TAG, 'Intent execution started');
  hilog.info(0x0000, LOG_TAG, 'Parameters: %{public}s', JSON.stringify(this));
  
  try {
    const result: string = await this.playMusic();
    hilog.info(0x0000, LOG_TAG, 'Intent execution succeeded');
    return Promise.resolve({ code: 0, result: result });
  } catch (errror) {
    hilog.error(0x0000, LOG_TAG, 'Intent execution failed');
    return Promise.resolve({ code: -1 });
  }
}
```

### 5. 参数验证

```typescript
async onExecute(): Promise<insightIntent.IntentResult<T>> {
  // 参数验证
  if (!this.validateParameters()) {
    hilog.warn(0x0000, LOG_TAG, 'Invalid parameters');
    return Promise.resolve({ code: -2 });
  }
  
  // 执行逻辑
  const result: T = await this.executeLogic();
  return Promise.resolve({ code: 0, result: result });
}

private validateParameters(): boolean {
  // 实现参数验证逻辑
  return true;
}
```

### 6. 性能优化

```typescript
// ✅ 使用缓存
private cache: Map<string, T> = new Map<string, T>();

async onExecute(): Promise<insightIntent.IntentResult<T>> {
  const cacheKey: string = this.generateCacheKey();
  
  if (this.cache.has(cacheKey)) {
    return Promise.resolve({ 
      code: 0, 
      result: this.cache.get(cacheKey) 
    });
  }
  
  const result: T = await this.fetchData();
  this.cache.set(cacheKey, result);
  
  return Promise.resolve({ code: 0, result: result });
}
```

## 常见问题与解决方案

参考 [troubleshooting.md](./troubleshooting.md)，避免代码出现问题。

## 相关资源

- [InsightIntentEntry API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-insightintentdecorator#insightintententry)
- [InsightIntentEntryExecutor API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-insightintententryexecutor)
- [InsightIntentEntity API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-insightintentdecorator#insightintententity)
- [JsonSchema 规范](https://json-schema.org/)