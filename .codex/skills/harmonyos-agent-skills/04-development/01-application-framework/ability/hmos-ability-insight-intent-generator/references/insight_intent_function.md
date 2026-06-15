# 使用@InsightIntentFunction装饰器创建函数意图

> **⚠️ 开始之前必读**
>
> `@InsightIntentFunctionMethod` **不能单独使用**。您必须同时：
>
> - 用 `@InsightIntentFunction()` 装饰**类**
> - 用 `@InsightIntentFunctionMethod({...})` 装饰类中的**静态方法**
>
> 缺少任何一个都会导致意图无法注册或运行时错误。
> 详见下方“装饰器组合规则”章节。

使用@InsightIntentFunctionMethod装饰类中的静态函数，同时使用 @InsightIntentFunction 装饰器装饰静态函数所属的类，可以将对应的静态函数定义为意图，便于AI入口能够快速执行此函数。

---

## Quick Start

### 快速上手

```typescript
import { InsightIntentFunction, InsightIntentFunctionMethod } from '@kit.AbilityKit';

@InsightIntentFunction()
export class WeatherFunctions {
  @InsightIntentFunctionMethod({
    intentName: 'GetWeather',
    domain: 'LifeDomain',
    intentVersion: '1.0.1',
    displayName: '查询天气',
    displayDescription: '显示天气信息',
    icon: $r('app.media.app_icon'),
    llmDescription: '查询指定城市的天气信息',
    keywords: ['天气', '查询', 'weather'],
    parameters: {
      'type': 'object',
      'properties': {
        'location': {
          'type': 'string',
          'description': '城市名称，如：杭州',
          'minLength': 1
        }
      },
      'required': ['location']
    }
  })
  static getWeather(location: string): string {
    console.info(`location: ${location}`);
    return `${location}当前气温24℃`;
  }
}
```

### 完整流程

1. **（可选）创建工具类**：定义包含静态方法的类
2. **装饰类**：使用 `@InsightIntentFunction()` 装饰类
3. **装饰静态方法**：使用 `@InsightIntentFunctionMethod()` 装饰静态方法
4. **导出类**：确保类使用 `export` 导出
5. **（可选）注册意图**：在 `insight_intent.json` 中添加文件路径

## 核心规则

### 适用场景

- ✅ 纯函数计算，无需UI交互
- ✅ 数据查询、格式转换等工具类功能
- ✅ 快速执行的轻量级操作
- ✅ 无需拉起Ability或页面的场景
- ❌ 不适用于需要UI交互的场景（请使用 @InsightIntentEntry 或 @InsightIntentPage）
- ❌ 不适用于需要访问Ability上下文的场景

### 代码输出要求

- ✅ **必须**同时使用 `@InsightIntentFunction` 和 `@InsightIntentFunctionMethod` 装饰器
- ✅ 类**必须**使用 `export` 导出（不需要 `default`）
- ✅ 方法**必须**是 `static` 静态方法
- ✅ 函数参数名称、参数类型**必须**与意图定义的参数名称、参数类型保持一致
- ✅ 新增文件时，在 `insight_intent.json` 的 `insightIntentsSrcEntry` 数组中添加文件路径
- ❌ 不允许使用实例方法
- ❌ 不允许在方法中访问 this 或实例属性

### 装饰器组合规则

```typescript
// ✅ 正确：装饰器组合使用
@InsightIntentFunction()
export class MyFunctions {
  @InsightIntentFunctionMethod({...})
  static myMethod(param: string): string {
    return `result: ${param}`;
  }
}

// ❌ 错误：缺少 @InsightIntentFunction
export class MyFunctions {
  @InsightIntentFunctionMethod({...})
  static myMethod(param: string): string {
    return `result: ${param}`;
  }
}

// ❌ 错误：使用实例方法
@InsightIntentFunction()
export class MyFunctions {
  @InsightIntentFunctionMethod({...})
  myMethod(param: string): string {  // 缺少 static
    return `result: ${param}`;
  }
}
```

## 快速参考

### @InsightIntentFunctionMethod 必填字段

| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `intentName` | string | 英文PascalCase，动词-名词结构 | `"GetWeather"`, `"Calculate"` |
| `domain` | string | 域标识符，取值范围参见[各垂域的智慧分发特性列表](https://developer.huawei.com/consumer/cn/doc/service/intents-ai-distribution-characteristic-0000001901922213#section2656133582215) | `"LifeDomain"`, `"ToolsDomain"` |
| `intentVersion` | string | 语义化版本，匹配标准意图的条件之一，默认填写1.0.1 | `"1.0.1"` |
| `displayName` | string | 中文显示名称 | `"查询天气"` |
| `llmDescription` | string | LLM理解描述 | `"查询指定城市天气"` |
| `keywords` | string[] | 搜索关键词 | `["天气", "查询"]` |

### @InsightIntentFunctionMethod 可选字段

| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `displayDescription` | string | 详细描述 | `"显示天气信息"` |
| `schema` | string | 标准意图schema | `"GetWeather"` |
| `icon` | ResourceStr | 图标资源 | `$r('app.media.icon')` |
| `parameters` | Record<string, Object> | 意图参数的数据格式声明，用于意图调用时定义入参的数据格式。使用参考[jsonschema_reference.md](./jsonschema_reference.md) | 见下文 |
| `result` | Record<string, Object> | 意图调用返回结果的数据格式声明，用于定义意图调用返回结果的数据格式。使用参考[jsonschema_reference.md](./jsonschema_reference.md) | 见下文 |

### 参数与返回值类型

| 类型 | 支持情况 | 说明 |
|------|----------|------|
| `string` | ✅ | 字符串类型 |
| `number` | ✅ | 数值类型 |
| `boolean` | ✅ | 布尔类型 |
| `object` | ✅ | 对象类型（需定义完整结构） |
| `array` | ✅ | 数组类型（需定义items类型） |
| `void` | ✅ | 无返回值 |

## ⚠️⚠️⚠️ ArkTS 严格模式核心规则（必须遵守）

@InsightIntentFunctionMethod 静态函数方法必须遵守以下 ArkTS 严格模式规则：

### 禁止使用解构赋值

**❌ 错误：**
```typescript
// 错误：解构 Map 遍历
for (const [key, value] of categoryMap) {
  console.log(key, value);
}

// 错误：解构对象
const { name, age } = user;
```

**✅ 正确：**
```typescript
// 正确：使用 Array.from 和 get
const keys: string[] = Array.from(categoryMap.keys());
for (const key of keys) {
  const value: ValueType | undefined = categoryMap.get(key);
  if (value) {
    console.log(key, value);
  }
}

// 正确：直接访问属性
const name: string = user.name;
const age: number = user.age;
```

### 禁止对象字面量作为类型声明

**❌ 错误：**
```typescript
// 错误：接口中使用对象字面量类型
interface Result {
  items: {
    name: string;
    value: number;
  }[];
}
```

**✅ 正确：**
```typescript
// 正确：定义单独的接口
interface ResultItem {
  name: string;
  value: number;
}

interface Result {
  items: ResultItem[];
}
```

### 禁止箭头函数直接返回对象字面量

**❌ 错误：**
```typescript
// 错误：map 中返回对象字面量
const result = items.map((item: Item) => ({
  name: item.name,
  value: item.value
}));
```

**✅ 正确：**
```typescript
// 正确：使用 for 循环创建显式类型的对象
const result: ResultItem[] = [];
for (const item of items) {
  const resultItem: ResultItem = {
    name: item.name,
    value: item.value
  };
  result.push(resultItem);
}
```

### 禁止 Map 构造函数使用数组初始化

**❌ 错误：**
```typescript
// 错误：使用数组初始化 Map
const descriptions: Map<string, string> = new Map([
  ['key1', 'value1'],
  ['key2', 'value2']
]);
```

**✅ 正确：**
```typescript
// 正确：使用 set 方法添加元素
const descriptions: Map<string, string> = new Map();
descriptions.set('key1', 'value1');
descriptions.set('key2', 'value2');
```

### ⚠️ 数组操作的类型安全要求

**❌ 错误1：push 类型不匹配**
```typescript
interface BaseItem {
  name: string;
}

interface ExtendedItem extends BaseItem {
  age: number;
}

// 错误：声明为 BaseItem[]，但 push ExtendedItem
const items: BaseItem[] = [];
const item: ExtendedItem = { name: 'test', age: 18 };
items.push(item);  // ❌ 编译错误
```

**✅ 正确：**
```typescript
interface BaseItem {
  name: string;
}

interface ExtendedItem extends BaseItem {
  age: number;
}

// 正确：声明为 ExtendedItem[]
const items: ExtendedItem[] = [];
const item: ExtendedItem = { name: 'test', age: 18 };
items.push(item);  // ✅ 类型匹配
```

**❌ 错误2：push 对象字面量缺少类型**
```typescript
interface MethodInfo {
  name: string;
  description: string;
}

// 错误：push 包含额外属性的对象字面量
const methods: MethodInfo[] = [];
methods.push({
  name: 'test',
  description: 'desc',
  utilName: 'StrUtil'  // ❌ MethodInfo 接口没有这个属性
});
```

**✅ 正确：**
```typescript
interface MethodInfo {
  name: string;
  description: string;
}

interface MethodInfoWithUtil {
  name: string;
  description: string;
  utilName: string;
}

// 正确：使用扩展接口
const methods: MethodInfoWithUtil[] = [];
const method: MethodInfoWithUtil = {
  name: 'test',
  description: 'desc',
  utilName: 'StrUtil'
};
methods.push(method);  // ✅ 类型匹配
```

### ⚠️ 不支持结构化类型和展开运算符

**❌ 错误1：使用展开运算符**
```typescript
// 错误：不能使用展开运算符创建新对象
const base: MethodInfo = { name: 'test', description: 'desc' };
const extended: MethodInfoWithUtil = {
  ...base,  // ❌ 结构化类型不支持
  utilName: 'StrUtil'
};
```

**❌ 错误2：对象属性结构化赋值**
```typescript
// 错误：不能从一个对象创建另一个属性不同的对象
const base: MethodInfo = { name: 'test', description: 'desc' };
const extended = { ...base, utilName: 'StrUtil' };  // ❌ 编译错误
```

**✅ 正确：显式创建所有属性**
```typescript
// 正确：显式声明所有属性
const base: MethodInfo = { name: 'test', description: 'desc' };
const extended: MethodInfoWithUtil = {
  name: base.name,
  description: base.description,
  utilName: 'StrUtil'
};
```

### ⚠️ 类型不匹配的常见场景

**场景1：接口属性不完整**

```typescript
// 错误：期望的属性比实际多
interface Required {
  name: string;
  age: number;
  address: string;
}

const data: Required = {
  name: 'test',
  age: 18  // ❌ 缺少 address 属性
};
```

**场景2：类型断言不正确**
```typescript
// 错误：不安全的类型断言
const methods = [] as any[];
methods.push({
  name: 'test',
  description: 'desc'
});
// ❌ 丢失了类型检查，且可能导致运行时错误
```

**✅ 正确：使用显式接口**
```typescript
interface MethodResult {
  name: string;
  description: string;
  age: number;
  address: string;
}

const result: MethodResult = {
  name: 'test',
  description: 'desc',
  age: 18,
  address: 'default'  // ✅ 提供所有必需属性
};
```
### 完整示例对比

**❌ 错误代码（违反多条规则）：**
```typescript
interface Result {
  items: {  // ❌ 对象字面量类型
    name: string;
    value: number;
  }[];
}

static process(): string {
  const map: Map<string, number> = new Map([['a', 1]]);  // ❌ 数组初始化

  for (const [k, v] of map) {  // ❌ 解构赋值
    console.log(k, v);
  }

  const items: ResultItem[] = [{ name: 'test', value: 1 }];  // ❌ 对象字面量

  return JSON.stringify({
    items: items.map((x) => ({  // ❌ 箭头函数返回对象字面量
      name: x.name,
      value: x.value
    }))
  });
}
```

**✅ 正确代码：**
```typescript
interface ResultItem {
  name: string;
  value: number;
}

interface Result {
  items: ResultItem[];
}

static process(): string {
  const map: Map<string, number> = new Map();
  map.set('a', 1);

  const keys: string[] = Array.from(map.keys());
  for (const k of keys) {
    const v: number | undefined = map.get(k);
    if (v !== undefined) {
      console.log(k, v);
    }
  }

  const items: ResultItem[] = [];
  const item1: ResultItem = { name: 'test', value: 1 };
  items.push(item1);

  const result: Result = { items: items };
  return JSON.stringify(result);
}
```

## 示例详解

### 基础示例（无参数）

```typescript
import { InsightIntentFunction, InsightIntentFunctionMethod } from '@kit.AbilityKit';

@InsightIntentFunction()
export class TimeFunctions {
  @InsightIntentFunctionMethod({
    intentName: 'GetCurrentTime',
    domain: 'ToolsDomain',
    intentVersion: '1.0.0',
    displayName: '获取当前时间',
    llmDescription: '获取当前的日期和时间',
    keywords: ['时间', '日期', 'time']
  })
  static getCurrentTime(): string {
    return new Date().toLocaleString('zh-CN');
  }
}
```

### 带参数示例

```typescript
import { InsightIntentFunction, InsightIntentFunctionMethod } from '@kit.AbilityKit';

@InsightIntentFunction()
export class CalculatorFunctions {
  @InsightIntentFunctionMethod({
    intentName: 'Calculate',
    domain: 'ToolsDomain',
    intentVersion: '1.0.1',
    displayName: '计算',
    displayDescription: '执行数学计算',
    llmDescription: '执行加减乘除运算',
    keywords: ['计算', '数学', 'calculator'],
    parameters: {
      'type': 'object',
      'properties': {
        'a': {
          'type': 'number',
          'description': '第一个数字'
        },
        'b': {
          'type': 'number',
          'description': '第二个数字'
        },
        'operator': {
          'type': 'string',
          'description': '运算符',
          'enum': ['+', '-', '*', '/']
        }
      },
      'required': ['a', 'b', 'operator']
    }
  })
  static calculate(a: number, b: number, operator: string): string {
    let result: number = 0;
    switch (operator) {
      case '+':
        result = a + b;
        break;
      case '-':
        result = a - b;
        break;
      case '*':
        result = a * b;
        break;
      case '/':
        result = b !== 0 ? a / b : NaN;
        break;
    }
    return `${a} ${operator} ${b} = ${result}`;
  }
}
```

### 多个意图示例（同一类中）

```typescript
import { InsightIntentFunction, InsightIntentFunctionMethod } from '@kit.AbilityKit';

@InsightIntentFunction()
export class StringFunctions {
  @InsightIntentFunctionMethod({
    intentName: 'ToUpperCase',
    domain: 'ToolsDomain',
    intentVersion: '1.0.0',
    displayName: '转大写',
    llmDescription: '将字符串转换为大写',
    keywords: ['大写', '转换', 'uppercase'],
    parameters: {
      'type': 'object',
      'properties': {
        'text': {
          'type': 'string',
          'description': '要转换的文本'
        }
      },
      'required': ['text']
    }
  })
  static toUpperCase(text: string): string {
    return text.toUpperCase();
  }

  @InsightIntentFunctionMethod({
    intentName: 'ToLowerCase',
    domain: 'ToolsDomain',
    intentVersion: '1.0.0',
    displayName: '转小写',
    llmDescription: '将字符串转换为小写',
    keywords: ['小写', '转换', 'lowercase'],
    parameters: {
      'type': 'object',
      'properties': {
        'text': {
          'type': 'string',
          'description': '要转换的文本'
        }
      },
      'required': ['text']
    }
  })
  static toLowerCase(text: string): string {
    return text.toLowerCase();
  }

  @InsightIntentFunctionMethod({
    intentName: 'StringLength',
    domain: 'ToolsDomain',
    intentVersion: '1.0.0',
    displayName: '字符串长度',
    llmDescription: '计算字符串的长度',
    keywords: ['长度', '统计', 'length'],
    parameters: {
      'type': 'object',
      'properties': {
        'text': {
          'type': 'string',
          'description': '要计算长度的文本'
        }
      },
      'required': ['text']
    }
  })
  static stringLength(text: string): string {
    return `字符串长度: ${text.length}`;
  }
}
```

### 带返回值Schema示例

```typescript
import { insightIntent, InsightIntentFunction, InsightIntentFunctionMethod } from '@kit.AbilityKit';

interface WeatherResult {
  location: string;
  temperature: number;
  humidity: number;
  condition: string;
}

@InsightIntentFunction()
export class WeatherFunctions {
  @InsightIntentFunctionMethod({
    intentName: 'GetWeatherInfo',
    domain: 'LifeDomain',
    intentVersion: '1.0.1',
    displayName: '获取天气详情',
    displayDescription: '获取指定城市的详细天气信息',
    llmDescription: '查询城市天气，返回温度、湿度、天气状况等信息',
    keywords: ['天气', '气温', '湿度', 'weather'],
    parameters: {
      'type': 'object',
      'properties': {
        'location': {
          'type': 'string',
          'description': '城市名称',
          'minLength': 1
        }
      },
      'required': ['location']
    },
    result: {
      'type': 'object',
      'properties': {
        'location': {
          'type': 'string',
          'description': '城市名称'
        },
        'temperature': {
          'type': 'number',
          'description': '当前温度（摄氏度）'
        },
        'humidity': {
          'type': 'number',
          'description': '当前湿度（百分比）'
        },
        'condition': {
          'type': 'string',
          'description': '天气状况',
          'enum': ['晴天', '多云', '阴天', '小雨', '大雨']
        }
      }
    }
  })
  static getWeatherInfo(location: string): insightIntent.ExecuteResult {
  const resultData: Record<string, Object> = {
    location: location,
    temperature: 24,
    humidity: 65,
    condition: '晴天',
    resultDesc: `${location}当前气温24℃，湿度65%，晴天`  // 小艺回复文本
  };
    return {
      code: 0,
      result: resultData
    };
  }
}
```

### 标准意图示例

```typescript
import { InsightIntentFunction, InsightIntentFunctionMethod } from '@kit.AbilityKit';

@InsightIntentFunction()
export class LogisticsFunctions {
  @InsightIntentFunctionMethod({
    intentName: 'ViewLogistics',
    domain: 'LifeDomain',
    intentVersion: '1.0.1',
    displayName: '查看快递',
    displayDescription: '查看快递物流信息',
    schema: 'ViewLogistics',
    parameters: {
      'type': 'object',
      'properties': {
        'trackingNo': {
          'type': 'string',
          'description': '快递单号'
        }
      },
      'required': ['trackingNo']
    }
  })
  static viewLogistics(trackingNo: string): string {
    // 查询物流信息
    return `快递单号 ${trackingNo} 正在派送中`;
  }
}
```

## 与其他装饰器的区别

| 特性 | @InsightIntentFunctionMethod | @InsightIntentEntry | @InsightIntentPage | @InsightIntentLink |
|------|------------------------------|---------------------|-------------------|-------------------|
| **用途** | 将静态函数定义为意图 | 创建复杂意图执行器 | 将页面定义为意图 | 将URI链接定义为意图 |
| **装饰对象** | 静态方法 | 类（继承Executor） | struct 页面 | 类 |
| **基类要求** | 无 | 必须继承 InsightIntentEntryExecutor | 无 | 无 |
| **UI交互** | 不支持 | 支持 | 支持 | 支持（跳转） |
| **Ability上下文** | 无法访问 | 可以访问 | 可以访问 | 通过URI |
| **适用场景** | 纯函数计算 | 复杂业务逻辑 | 页面跳转 | URI跳转 |
| **导出方式** | `export` | `export default` | struct定义 | `export` |

## 装饰器组合图示

```
@InsightIntentFunction()          ← 装饰类
export class FunctionClass {
  @InsightIntentFunctionMethod({  ← 装饰静态方法
    intentName: 'xxx',
    domain: 'xxx',
    ...
  })
  static methodName(param: Type): ReturnType {
    // 函数实现
  }

  @InsightIntentFunctionMethod({  ← 可装饰多个静态方法
    intentName: 'yyy',
    ...
  })
  static anotherMethod(): string {
    // 另一个意图
  }
}
```

## ArkTS 编译注意事项

### 对象字面量必须有显式接口声明

ArkTS 不允许返回匿名的对象字面量，**必须**定义接口类型：

```typescript
// ❌ 错误：返回匿名对象字面量
static getCurrentMusic(): Record<string, Object> {
  return {
    songName: '未知歌曲',
    artistName: '未知歌手',
    isPlaying: false
  };
}

// ✅ 正确：定义接口并使用
interface CurrentMusicResult {
  songName: string;
  artistName: string;
  isPlaying: boolean;
}

static getCurrentMusic(): CurrentMusicResult {
  const result: CurrentMusicResult = {
    songName: '未知歌曲',
    artistName: '未知歌手',
    isPlaying: false
  };
  return result;
}
```

### 导入语法：区分默认导出和命名导出

```typescript
// 默认导出（export default）- 不使用花括号
// 源文件: export default class avplayerClass { ... }
import avplayerClass from '../services/avplayermanager';

// 命名导出（export）- 使用花括号
// 源文件: export interface songtype { ... }
import { songtype } from '../data/music';

// 同时导入默认导出和命名导出
import avplayerClass, { songtype } from '../services/avplayermanager';
// 或分开导入
import avplayerClass from '../services/avplayermanager';
import { songtype } from '../data/music';
```

### 返回对象时的完整示例

```typescript
import { InsightIntentFunction, InsightIntentFunctionMethod } from '@kit.AbilityKit';

// 1. 定义返回结果接口（必须在类外部声明）
interface QueryResult {
  status: string;
  data: string;
  message?: string;  // 可选字段
}

@InsightIntentFunction()
export class QueryFunctions {
  @InsightIntentFunctionMethod({
    intentName: 'QueryData',
    domain: 'ToolsDomain',
    intentVersion: '1.0.1',
    displayName: '查询数据',
    llmDescription: '查询数据信息',
    keywords: ['查询', '数据'],
    result: {
      'type': 'object',
      'properties': {
        'status': { 'type': 'string' },
        'data': { 'type': 'string' },
        'message': { 'type': 'string' }
      }
    }
  })
  static queryData(): QueryResult {
    // 2. 使用接口类型声明变量
    const result: QueryResult = {
      status: 'success',
      data: '查询结果',
      message: '查询成功'
    };
    return result;
  }
}
```

## 常见错误与正确写法对比

### 错误1：导入包错误

```typescript
// ❌ 错误：使用了错误的导入包
import { insightIntent } from '@kit.CoreGraphicsKit';

// ✅ 正确：使用 @kit.AbilityKit
import { InsightIntentFunction, InsightIntentFunctionMethod } from '@kit.AbilityKit';
```

### 错误2：装饰器字段错误

```typescript
// ❌ 错误：使用了错误的字段名，缺少必填字段
@InsightIntentFunctionMethod({
  name: 'getNewsTypes',  // ❌ 应该是 intentName
  llmDescription: '查询应用支持的新闻分类列表',
  keywords: ['新闻类型', '新闻分类']
  // ❌ 缺少必填字段：domain, intentVersion, displayName
})

// ✅ 正确：使用正确的字段名和必填字段
@InsightIntentFunctionMethod({
  intentName: 'GetNewsTypes',     // ✅ PascalCase 格式
  domain: 'NewsDomain',           // ✅ 必填
  intentVersion: '1.0.1',         // ✅ 必填
  displayName: '获取新闻类型',      // ✅ 必填
  displayDescription: '查询应用支持的新闻分类列表',
  llmDescription: '查询应用支持的新闻分类列表，返回全部、国内、国际、娱乐、军事、体育、科技、财经等新闻类型',
  keywords: ['新闻类型', '新闻分类', '支持哪些新闻', '新闻类别', '有哪些新闻', '查看新闻类型']
})
```

### 错误3：导出方式错误

```typescript
// ❌ 错误：使用了 export default
@InsightIntentFunction()
export default class NewsFunctions {
  @InsightIntentFunctionMethod({...})
  static getNewsTypes(): ResultType { ... }
}

// ✅ 正确：使用 export（不使用 default）
@InsightIntentFunction()
export class NewsFunctions {
  @InsightIntentFunctionMethod({...})
  static getNewsTypes(): ResultType { ... }
}
```

### 错误4：不是静态方法

```typescript
// ❌ 错误：方法缺少 static 关键字
@InsightIntentFunction()
export class NewsFunctions {
  @InsightIntentFunctionMethod({...})
  getNewsTypes(): ResultType {  // ❌ 缺少 static
    // ...
  }
}

// ✅ 正确：使用 static
@InsightIntentFunction()
export class NewsFunctions {
  @InsightIntentFunctionMethod({...})
  static getNewsTypes(): ResultType {  // ✅ 静态方法
    // ...
  }
}
```

### 错误5：创建了不必要的执行器类

```typescript
// ❌ 错误：创建了额外的执行器类（不需要）
@InsightIntentFunction()
export class NewsFunctions {
  @InsightIntentFunctionMethod({...})
  static getNewsTypes(): ResultType {
    // 实现
  }
}

// ❌ 不要这样做：不需要额外的执行器类
@InsightIntentFunction('getNewsTypes')
export default class GetNewsTypesIntentExecutor {
  async execute(): Promise<ResultType> {
    return getNewsTypes();
  }
}

// ✅ 正确：所有逻辑在静态方法中完成，不需要额外的执行器类
@InsightIntentFunction()
export class NewsFunctions {
  @InsightIntentFunctionMethod({
    intentName: 'GetNewsTypes',
    domain: 'NewsDomain',
    intentVersion: '1.0.1',
    displayName: '获取新闻类型',
    llmDescription: '查询应用支持的新闻分类列表',
    keywords: ['新闻类型', '新闻分类'],
    result: { ... }
  })
  static getNewsTypes(): ResultType {
    // 直接实现逻辑
    const result: ResultType = { ... };
    return result;
  }
}
```

### 错误6：返回值使用 Promise 包装

```typescript
// ❌ 虽然合法，但不推荐：使用 Promise 包装返回值
@InsightIntentFunctionMethod({...})
static async getNewsTypes(): Promise<GetNewsTypesResult> {
  const result: GetNewsTypesResult = { ... };
  return Promise.resolve(result);
}

// ✅ 正确：直接返回类型
@InsightIntentFunctionMethod({...})
static getNewsTypes(): GetNewsTypesResult {
  const result: GetNewsTypesResult = { ... };
  return result;
}
```

### 错误7：缺少 @InsightIntentFunction 装饰器

```typescript
// ❌ 错误：类缺少 @InsightIntentFunction 装饰器
export class MyFunctions {
  @InsightIntentFunctionMethod({...})
  static myMethod(): string {
    return 'result';
  }
}

// ✅ 正确：类和方法都需要装饰器
@InsightIntentFunction()
export class MyFunctions {
  @InsightIntentFunctionMethod({...})
  static myMethod(): string {
    return 'result';
  }
}
```

### 错误8：完整错误代码示例

```typescript
// ❌ 错误的完整示例（包含多个错误）
import { insightIntent } from '@kit.CoreGraphicsKit';

@InsightIntentFunction({
  name: 'getNewsTypes',
  llmDescription: '查询应用支持的新闻分类列表',
  keywords: ['新闻类型']
})
export static async getNewsTypes(): Promise<GetNewsTypesResult> {
  return Promise.resolve(result);
}

@InsightIntentFunction('getNewsTypes')
export default class GetNewsTypesIntentExecutor {
  async execute(): Promise<GetNewsTypesResult> {
    return getNewsTypes();
  }
}

// ✅ 正确的完整示例
import { InsightIntentFunction, InsightIntentFunctionMethod } from '@kit.AbilityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';

interface NewsTypeItem {
  id: number;
  name: string;
}

interface GetNewsTypesResult {
  code: number;
  message: string;
  newsTypes: NewsTypeItem[];
}

@InsightIntentFunction()
export class NewsFunctions {
  private static readonly LOG_TAG: string = 'NewsFunctions';

  @InsightIntentFunctionMethod({
    intentName: 'GetNewsTypes',
    domain: 'NewsDomain',
    intentVersion: '1.0.1',
    displayName: '获取新闻类型',
    displayDescription: '查询应用支持的新闻分类列表',
    llmDescription: '查询应用支持的新闻分类列表，返回全部、国内、国际、娱乐、军事、体育、科技、财经等新闻类型',
    keywords: ['新闻类型', '新闻分类', '支持哪些新闻', '新闻类别', '有哪些新闻'],
    result: {
      'type': 'object',
      'properties': {
        'code': { 'type': 'number', 'description': '返回码' },
        'message': { 'type': 'string', 'description': '返回消息' },
        'newsTypes': {
          'type': 'array',
          'items': {
            'type': 'object',
            'properties': {
              'id': { 'type': 'number' },
              'name': { 'type': 'string' }
            }
          }
        }
      }
    }
  })
  static getNewsTypes(): GetNewsTypesResult {
    hilog.info(0x0000, NewsFunctions.LOG_TAG, '获取新闻类型列表');

    const newsTypes: NewsTypeItem[] = [
      { id: 0, name: '全部' },
      { id: 1, name: '国内' },
      { id: 2, name: '国际' }
    ];

    const result: GetNewsTypesResult = {
      code: 0,
      message: '获取成功',
      newsTypes: newsTypes
    };

    return result;
  }
}
```

## 常见问题

### Q1: 为什么必须使用静态方法？

静态方法可以在不实例化类的情况下直接调用，AI入口无需了解类的实例化方式即可执行意图。

### Q2: 如何处理异步操作？

可以使用 `async/await`，但返回值需要是 Promise：

```typescript
@InsightIntentFunctionMethod({...})
static async fetchData(url: string): Promise<string> {
  const response = await fetch(url);
  return response.text();
}
```

### Q3: 可以在一个类中定义多少个意图？

没有限制，一个类中可以定义多个被 `@InsightIntentFunctionMethod` 装饰的静态方法。

### Q4: 如何注册意图？

在 `insight_intent.json` 中添加：

```json
{
  "insightIntentsSrcEntry": [
    {
      "srcEntry": "./ets/insightintents/WeatherFunctions.ets"
    }
  ]
}
```

### Q5: 参数类型必须与 parameters 定义完全匹配吗？

是的，函数的参数名称和类型必须与 `parameters` 中定义的名称和类型完全一致，否则会导致意图执行失败。

### Q6: 标准意图和自定义意图的区别？

- **标准意图**：配置 `schema`和"intentVersion"字段，系统会自动填充标准意图的定义
- **自定义意图**：需要配置 `llmDescription`、`keywords`、`parameters` 等字段

## 相关资源

- [InsightIntentFunctionMethod API 参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-insightintentdecorator#insightintentfunctionmethod)
- [标准意图接入规范](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/insight-intent-access-specifications)
- [各垂域意图Schema](https://developer.huawei.com/consumer/cn/doc/service/intents-schema-0000001901962713)
