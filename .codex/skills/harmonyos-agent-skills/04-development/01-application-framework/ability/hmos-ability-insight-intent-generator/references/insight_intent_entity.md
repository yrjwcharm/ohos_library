# 使用 @InsightIntentEntity 装饰器定义意图实体

当意图参数需要包含对象类型、嵌套结构或多字段分组时，必须使用 `@InsightIntentEntity` 定义实体类。

---

## 参数模式选择（必须询问用户）

检测到需要使用 `@InsightIntentEntity` 时，先向用户说明两种模式并让其选择：

> 检测到您需要定义复杂参数，有两种实现方式：
>
> **方式A：扁平入参 + Entity 内部打包（推荐）**
> - 对外：每个字段作为独立参数，AI入口可分别填充
> - 对内：`onExecute` 中手动打包成 Entity 对象
> - 用户体验：更自然，可逐项输入
>
> **方式B：Entity 嵌套入参**
> - 对外：所有字段包装在一个 Entity 对象中作为单一参数
> - 对内：框架自动注入 Entity 对象，直接使用 `this.entityProp.xxx`
> - 用户体验：需一次性提供完整对象
>
> 请选择方式 A 或 B？

---

## 🚨 关键前提：必须识别项目页面跳转架构

**在生成任何包含页面跳转的意图代码前，必须先确认项目使用 Navigation 还是 Router 架构。** 两种架构的参数传递方式完全不同，选错会导致页面闪退。

| 架构           | 页面跳转方式                                                | 参数传递方式    | 错误后果                                                     |
| -------------- | ----------------------------------------------------------- | --------------- | ------------------------------------------------------------ |
| **Navigation** | `windowStage.loadContent('目标页', storage)`                | `LocalStorage`  | 正常                                                         |
| **Router**     | `windowStage.loadContent('首页')` + 回调中 `router.pushUrl` | `router.params` | 直接 `loadContent` 目标页 → `router.getParams()` 返回 `undefined` → 闪退 |

**判断方法**：
- 搜索 `router.pushUrl` 或 `router.push` → 存在则为 Router 架构
- 搜索 `NavPathStack`、`Navigation` 组件 → 存在则为 Navigation 架构
- 两者都有 → 按 Router 架构处理（`pushUrl` 优先）

---

## 方式A：扁平入参 + Entity 内部打包

### 核心规则

1. **Entity 定义**：使用 `@InsightIntentEntity`，`implements insightIntent.IntentEntity`
2. **Entry 的 `parameters`**：将 Entity 的字段展开为独立的顶层属性
3. **执行器类属性**：每个字段声明为独立的类属性（基础类型），与 `parameters` 属性名一致
4. **`onExecute` 内打包**：手动 `new EntityClass()` 后逐一赋值
5. **页面跳转**：必须根据项目架构选择对应的代码分支

### 代码模板（含架构分支）

```typescript
import { insightIntent, InsightIntentEntry, InsightIntentEntryExecutor, InsightIntentEntity } from '@kit.AbilityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { router } from '@kit.ArkUI';           // Router 架构时需要
import { BusinessError } from '@kit.BasicServicesKit';

const LOG_TAG = 'IntentName';
const DOMAIN = 0x0000;

// 1. 定义 Entity
@InsightIntentEntity({
  entityCategory: 'xxx params category',
  parameters: {
    '$id': '/schemas/XxxParams',
    'type': 'object',
    'description': '参数描述',
    'properties': {
      'fieldA': { 'type': 'string', 'description': '字段A', 'minLength': 1 },
      'fieldB': { 'type': 'string', 'description': '字段B' },
      'fieldC': { 'type': 'number', 'description': '字段C' }
    },
    'required': ['fieldA', 'fieldB']
  }
})
export class XxxParams implements insightIntent.IntentEntity {
  entityId: string = '0x01';
  fieldA: string = '';
  fieldB: string = '';
  fieldC: number = 0;
}

// 2. 结果接口（必须包含 resultDesc）
interface XxxResult {
  resultDesc: string;   // 小艺回复用
  success: boolean;
}

// 3. Entry 执行器（parameters 展开为顶层字段）
@InsightIntentEntry({
  intentName: 'DoSomething',
  domain: 'SomeDomain',
  intentVersion: '1.0.1',
  displayName: '做某事',
  llmDescription: '根据输入的A、B、C执行操作',
  keywords: ['关键词1', '关键词2'],
  abilityName: 'EntryAbility',
  executeMode: [insightIntent.ExecuteMode.UI_ABILITY_FOREGROUND],
  parameters: {
    'type': 'object',
    'properties': {
      'fieldA': { 'type': 'string', 'description': '字段A', 'minLength': 1 },
      'fieldB': { 'type': 'string', 'description': '字段B' },
      'fieldC': { 'type': 'number', 'description': '字段C' }
    },
    'required': ['fieldA', 'fieldB']
  }
})
export default class DoSomethingExecutor extends InsightIntentEntryExecutor<XxxResult> {
  fieldA: string = '';
  fieldB: string = '';
  fieldC: number = 0;

  async onExecute(): Promise<insightIntent.IntentResult<XxxResult>> {
    try {
      // 打包成 Entity
      const params = new XxxParams();
      params.fieldA = this.fieldA;
      params.fieldB = this.fieldB;
      params.fieldC = this.fieldC;

      // 业务逻辑使用 params.xxx
      hilog.info(DOMAIN, LOG_TAG, 'fieldA: %{public}s', params.fieldA);

      // ========== 页面跳转（必须根据架构选择分支） ==========
      if (this.executeMode === insightIntent.ExecuteMode.UI_ABILITY_FOREGROUND) {
        // 分支1：Navigation 架构（使用 LocalStorage）
        /*
        let storage = new LocalStorage();
        storage.setOrCreate('fieldA', params.fieldA);
        storage.setOrCreate('fieldB', params.fieldB);
        this.windowStage?.loadContent('pages/TargetPage', storage, (err) => {
          if (err.code) hilog.error(DOMAIN, LOG_TAG, 'Load failed: %{public}s', JSON.stringify(err));
        });
        */

        // 分支2：Router 架构（先加载首页，再 pushUrl）
        this.windowStage?.loadContent('pages/Index', (err) => {
          if (err.code) {
            hilog.error(DOMAIN, LOG_TAG, 'Load index failed: %{public}s', JSON.stringify(err));
            return;
          }
          router.pushUrl({
            url: 'pages/TargetPage',
            params: { fieldA: params.fieldA, fieldB: params.fieldB }
          }).catch((e: BusinessError) => {
            hilog.error(DOMAIN, LOG_TAG, 'Push failed: %{public}s', e.message);
          });
        });
      }

      const result: XxxResult = { resultDesc: '操作成功', success: true };
      return Promise.resolve({ code: 0, result: result });
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      const errorResult: XxxResult = { resultDesc: `操作失败: ${errorMsg}`, success: false };
      return Promise.resolve({ code: -1, result: errorResult });
    }
  }
}
```

### 方式A 自检清单

| 检查项                  | 正确做法                                                     |
| :---------------------- | :----------------------------------------------------------- |
| Entity 定义             | ✅ `@InsightIntentEntity` + `implements insightIntent.IntentEntity` + `entityId` 初始化 |
| Entry `parameters` 结构 | ✅ 字段展开为顶层 `properties`，无嵌套                        |
| 执行器类属性            | ✅ 每个字段独立声明，类型与 JSON Schema 一致（`string/number/boolean`，禁止联合类型） |
| `onExecute` 打包        | ✅ `new XxxParams()` 后逐一赋值（禁止解构）                   |
| 业务逻辑访问            | ✅ 使用 `params.xxx`                                          |
| 返回值                  | ✅ 包含 `resultDesc: string`                                  |
| **页面跳转架构**        | ✅ Navigation → `loadContent`+LocalStorage；Router → `loadContent` 首页 + `router.pushUrl` |

------

## 方式B：Entity 嵌套入参

### 核心规则

1. **Entity 定义**：同方式A
2. **Entry 的 `parameters`**：定义一个对象类型属性（如 `params`），其 `properties` 与 Entity 的 `properties` **完全一致**
3. **执行器类属性**：声明一个 Entity 类型的属性，属性名与 `parameters` 中的嵌套对象名一致
4. **`onExecute` 直接使用**：`this.entityProp.fieldX`
5. ⚠️ 嵌套对象的 `type` 必须是 `'object'`，不能写自定义类型名
6. **页面跳转**：同样需要根据架构选择分支

### 代码模板（含架构分支）

```typescript
import { insightIntent, InsightIntentEntry, InsightIntentEntryExecutor, InsightIntentEntity } from '@kit.AbilityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { router } from '@kit.ArkUI';
import { BusinessError } from '@kit.BasicServicesKit';

const LOG_TAG = 'IntentName';
const DOMAIN = 0x0000;

// 1. 定义 Entity（同方式A）
@InsightIntentEntity({
  entityCategory: 'xxx params category',
  parameters: {
    '$id': '/schemas/XxxParams',
    'type': 'object',
    'description': '参数描述',
    'properties': {
      'fieldA': { 'type': 'string', 'description': '字段A', 'minLength': 1 },
      'fieldB': { 'type': 'string', 'description': '字段B' },
      'fieldC': { 'type': 'number', 'description': '字段C' }
    },
    'required': ['fieldA', 'fieldB']
  }
})
export class XxxParams implements insightIntent.IntentEntity {
  entityId: string = '0x01';
  fieldA: string = '';
  fieldB: string = '';
  fieldC: number = 0;
}

interface XxxResult {
  resultDesc: string;
  success: boolean;
}

// 2. Entry 执行器（parameters 使用嵌套对象）
@InsightIntentEntry({
  intentName: 'DoSomething',
  domain: 'SomeDomain',
  intentVersion: '1.0.1',
  displayName: '做某事',
  llmDescription: '根据输入的参数对象执行操作',
  keywords: ['关键词1', '关键词2'],
  abilityName: 'EntryAbility',
  executeMode: [insightIntent.ExecuteMode.UI_ABILITY_FOREGROUND],
  parameters: {
    'type': 'object',
    'properties': {
      'params': {                       // 嵌套对象名
        'type': 'object',
        'description': '参数对象',
        'properties': {                 // 必须与 Entity.properties 一致
          'fieldA': { 'type': 'string', 'description': '字段A', 'minLength': 1 },
          'fieldB': { 'type': 'string', 'description': '字段B' },
          'fieldC': { 'type': 'number', 'description': '字段C' }
        },
        'required': ['fieldA', 'fieldB']
      }
    },
    'required': ['params']
  }
})
export default class DoSomethingExecutor extends InsightIntentEntryExecutor<XxxResult> {
  params: XxxParams = new XxxParams();   // 属性名与嵌套对象名一致

  async onExecute(): Promise<insightIntent.IntentResult<XxxResult>> {
    try {
      // 直接使用 this.params.fieldX
      hilog.info(DOMAIN, LOG_TAG, 'fieldA: %{public}s', this.params.fieldA);

      // ========== 页面跳转（架构分支，同方式A） ==========
      if (this.executeMode === insightIntent.ExecuteMode.UI_ABILITY_FOREGROUND) {
        // 分支1：Navigation（LocalStorage）
        // let storage = new LocalStorage();
        // storage.setOrCreate('fieldA', this.params.fieldA);
        // this.windowStage?.loadContent('pages/TargetPage', storage, ...);

        // 分支2：Router（loadContent首页 + pushUrl）
        this.windowStage?.loadContent('pages/Index', (err) => {
          if (err.code) return;
          router.pushUrl({
            url: 'pages/TargetPage',
            params: { fieldA: this.params.fieldA, fieldB: this.params.fieldB }
          }).catch((e: BusinessError) => {});
        });
      }

      const result: XxxResult = { resultDesc: '操作成功', success: true };
      return Promise.resolve({ code: 0, result: result });
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      const errorResult: XxxResult = { resultDesc: `操作失败: ${errorMsg}`, success: false };
      return Promise.resolve({ code: -1, result: errorResult });
    }
  }
}
```

### 方式B 自检清单

| 检查项                  | 正确做法                                                    |
| :---------------------- | :---------------------------------------------------------- |
| Entity 定义             | ✅ 同方式A                                                   |
| Entry `parameters` 结构 | ✅ 字段嵌套在一个对象属性下（如 `params`），`type: 'object'` |
| 嵌套对象 `properties`   | ✅ 与 Entity 的 `properties` **完全一致**                    |
| 嵌套对象 `type`         | ✅ 必须是 `'object'`，禁止写类名（如 `'XxxParams'`）         |
| 执行器类属性            | ✅ 单个 Entity 类型属性，属性名与嵌套对象名一致              |
| `onExecute` 使用        | ✅ 直接 `this.params.fieldX`                                 |
| `required` 位置         | ✅ 外层 `required` 包含嵌套对象名；内部 `required` 包含字段  |
| **页面跳转架构**        | ✅ 同方式A                                                   |

------

## 两种方式对比

| 维度              | 方式A（扁平+内部打包）         | 方式B（嵌套Entity）  |
| :---------------- | :----------------------------- | :------------------- |
| `parameters` 结构 | 字段展开为顶层                 | 嵌套在一个对象下     |
| 执行器类属性      | 多个基础类型属性               | 单个 Entity 类型属性 |
| `onExecute` 打包  | 手动 `new Entity()` 并逐一赋值 | 无需打包，直接使用   |
| Entity 注入       | ❌ 不参与框架注入               | ✅ 框架自动注入       |
| AI入口体验        | ✅ 可分别填充各字段             | ⚠️ 需构造完整对象     |
| 适用场景          | 多个独立输入字段               | 参数天然是整体对象   |

------

## 通用规则（不限模式）

### 1. 返回值必须包含 `resultDesc`

```typescript
// ✅ 正确
interface MyResult {
  resultDesc: string;   // 必填，小艺回复文本
  data?: string;
}

// ❌ 错误：缺少 resultDesc
interface MyResult {
  message: string;
}
```

### 2. 三处属性名必须一致

- 方式A：`Entity.fieldA` ↔ `parameters.properties.fieldA` ↔ `executor.fieldA`
- 方式B：`Entity.fieldA` ↔ `parameters.properties.params.properties.fieldA` ↔ `executor.params.fieldA`

### 3. Entity 的 `entityId` 不可省略

每个 Entity 类必须初始化 `entityId: string = '0xNN'`，同一应用内唯一（建议递增：`0x01`, `0x02`...）。

### 4. 可选字段处理

非必填字段在三处同步处理：

- Entity `parameters`：不加 `required`
- Entity 类属性：使用 `?` 并给默认值（如 `fieldB?: string = ''`）
- 执行器类属性（方式A）：给默认值（如 `fieldB: string = ''`）

### 5. `number` 类型禁止用 `integer`

JSON Schema 中统一使用 `'number'`。

### 6. 方式A 打包时必须逐一赋值（禁止解构）

```typescript
// ❌ 错误
const params = { ...this };

// ✅ 正确
const params = new XxxParams();
params.fieldA = this.fieldA;
params.fieldB = this.fieldB;
```

------

## 基础示例（无页面跳转）

```typescript
import { insightIntent, InsightIntentEntity } from '@kit.AbilityKit';

@InsightIntentEntity({
  entityCategory: 'artist entity category',
  parameters: {
    'type': 'object',
    'properties': {
      'name': { 'type': 'string', 'description': '歌手名称', 'minLength': 1 },
      'country': { 'type': 'string', 'description': '歌手国籍', 'default': 'zh' }
    },
    'required': ['name']
  }
})
export class ArtistInfo implements insightIntent.IntentEntity {
  entityId: string = '0x11';
  name: string = '';
  country?: string = 'zh';
}
```

------

## 常见问题

**Q1: 什么时候必须使用 @InsightIntentEntity？**
参数为对象类型、嵌套结构或需要在多个意图间复用。

**Q2: entityId 如何设置？**
`0x` + 两位十六进制数，应用内唯一。

**Q3: 页面跳转闪退怎么办？**
检查项目架构：Router 架构必须用 `loadContent` 首页 + `router.pushUrl`，不能直跳目标页。

**Q4: 返回值没有 `resultDesc` 会怎样？**
小艺无法生成回复文本，意图执行后用户看不到反馈。

------

## 相关文档

- [@InsightIntentEntry 装饰器规则](insight_intent_entry.md)
- [JsonSchema 参数定义参考](jsonschema_reference.md)
- [API 参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-insightintentdecorator#insightintententity)