# ArkTS 语法指南

本文档基于 ArkTS 官方语言规范和 LiveViewKit 项目实践编写，用于指导实况窗开发中的 ArkTS 编码规范。

---

## 一、变量声明

### 1.1 基本规则

```typescript
// ✅ 推荐使用 const（值不变时）
const APP_ID: string = 'liveview.demo';

// ✅ 需要修改变量时使用 let
let currentSequence: number = 0;
let isMute: boolean = true;

// ❌ 禁止使用 var
var oldStyle: string = 'disallowed'; // 编译错误
```

### 1.2 类型标注

```typescript
// ✅ 显式类型标注（推荐用于函数参数、返回值、复杂对象）
function startLiveView(id: number): Promise<boolean> {
    let result: boolean = false;
    return result;
}

// ✅ 类型推断（简单场景可省略）
let simpleString = 'hello';  // 推断为 string
let simpleNumber = 123;      // 推断为 number

// ❌ 禁止使用 any / unknown
let uncertain: any = getData();    // 编译错误
let unknownType: unknown = data;   // 编译错误
```

---

## 二、类和接口

### 2.1 类定义

```typescript
// ✅ 标准类定义（字段在类体中声明）
export class DeliveryLiveViewController {
    // 私有静态字段
    private static defaultView: liveViewManager.LiveView | undefined = undefined;
    private static capsuleColor: string = '#FF308977';
    
    // 公共方法
    public async startLiveView(): Promise<void> {
        // 方法实现
    }
    
    // 私有静态方法
    private static async buildDefaultView(): Promise<liveViewManager.LiveView> {
        return { /* ... */ };
    }
}

// ❌ 禁止使用 class expressions
const BadClass = class {  // 编译错误
    value: number;
};
```

### 2.2 接口定义

```typescript
// ✅ 使用 interface 定义数据结构
interface LiveViewContent {
    text: string;
    textColor?: string;
}

interface ProgressLayout {
    layoutType: liveViewManager.LayoutType;
    progress: number;
    lineType: liveViewManager.LineType;
}

// ✅ 类实现接口
class MyController implements IBaseController {
    // 实现接口定义的方法
}

// ❌ 禁止内联对象类型（无接口/类型别名）
function print(data: { x: number; y: number }): void {  // 不推荐
    // ...
}
```

### 2.3 枚举定义

```typescript
// ✅ 使用 enum 定义状态常量
enum LiveViewStatus {
    WAITING_PAYMENT = 1,
    WAITING_MERCHANT = 2,
    WAITING_RIDER = 3,
    RIDER_GET_ORDER = 4,
    PRODUCT_DELIVERING = 6,
    PRODUCT_DELIVERED = 8
}

// 使用枚举
let status = LiveViewStatus.WAITING_MERCHANT;
switch (status) {
    case LiveViewStatus.WAITING_MERCHANT:
        // 处理等待商家状态
        break;
}
```

---

## 三、函数

### 3.1 函数声明

```typescript
// ✅ 顶层函数（推荐）
function isLiveViewEnabled(): Promise<boolean> {
    return liveViewManager.isLiveViewEnabled();
}

// ✅ 箭头函数（函数作为值时使用）
const onClickHandler = (event: ClickEvent): void => {
    console.log('Clicked');
};

// ✅ 方法作为属性（回调场景）
const callbacks = {
    onSuccess: (data: Data): void => { /* ... */ },
    onError: (err: Error): void => { /* ... */ }
};

// ❌ 禁止嵌套函数声明
function outer(): void {
    function inner(): void {  // 编译错误
        // ...
    }
}
```

### 3.2 异步函数

```typescript
// ✅ async/await 模式
public async updateLiveView(): Promise<boolean> {
    try {
        const result = await liveViewManager.updateLiveView(this.defaultView);
        return true;
    } catch (e) {
        const err: BusinessError = e as BusinessError;
        Logger.error('Error: %{public}d %{public}s', err.code, err.message);
        return false;
    }
}

// ✅ catch 块不能有类型标注
try {
    // ...
} catch (err) {  // ❌ 正确写法：不能写 catch (err: Error)
    const error = err as BusinessError;
}
```

### 3.3 构造函数

```typescript
// ✅ 构造函数中初始化字段
class DataService {
    private resourceManager: resourceManager.ResourceManager;
    private config: AppConfig;
    
    constructor(context: Context) {
        this.resourceManager = context.resourceManager;
        this.config = { enable: true };
    }
}
```

---

## 四、对象和属性访问

### 4.1 对象字面量

```typescript
// ✅ 构造完整对象（显式类型）
const liveViewData: LiveViewData = {
    primary: {
        title: 'Delivery',
        content: [
            { text: 'Waiting for rider' },
            { text: 'Arriving soon', textColor: '#FF0A59F7' }
        ],
        keepTime: 15,
        layoutData: {
            layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_PROGRESS,
            progress: 50,
            lineType: liveViewManager.LineType.LINE_TYPE_DOTTED_LINE
        }
    },
    capsule: {
        type: liveViewManager.CapsuleType.CAPSULE_TYPE_TEXT,
        icon: 'capsule_store.png',
        backgroundColor: '#FF308977'
    }
};

// ❌ 禁止将对象字面量直接赋值给 Sendable 类型（需先定义接口/类）
```

### 4.2 属性访问

```typescript
// ✅ 直接属性访问
this.defaultView.sequence += 1;
const title = this.defaultView.liveViewData.primary.title;

// ✅ 可选链操作
const title = this.defaultView?.liveViewData?.primary?.title ?? 'Default';

// ❌ 禁止动态属性访问（通过变量索引）
const key = 'title';
const value = obj[key];  // 编译错误
const value = obj['title'];  // 编译错误
```

---

## 五、ArkTS 禁止使用的语法

| 语法 | 替代方案 | 说明 |
|------|----------|------|
| `var` | `let` / `const` | ArkTS 不支持 var 声明 |
| 解构声明 `let {a, b} = obj` | 逐一声明 | 解构声明禁止使用 |
| 解构参数 `function f({a})` | 直接参数 | 解构参数禁止使用 |
| `delete obj.x` | 重新构造对象 | delete 操作禁止使用 |
| `for...in` | `for...of` / 显式循环 | for...in 循环禁止使用 |
| 函数表达式 `const f = function(){}` | 箭头函数 | 函数表达式禁止使用 |
| 嵌套函数 | 提取为顶层函数 | 嵌套函数声明禁止使用 |
| class 表达式 | 命名 class 声明 | class 表达式禁止使用 |
| 动态属性 `obj[key]` | 直接属性访问 | 需使用已知属性名 |
| `typeof` 类型查询 | 显式类型标注 | typeof 禁止用于类型查询 |

---

## 六、ArkUI Component 组件规范

### 6.1 Button 组件简写规则

**【重要】当 Button 组件内不包含其他子组件时，禁止生成空的大括号 `{}`**

```typescript
// ✅ 正确：Button 内无子组件时不生成大括号
Button("点击我")
  .onClick(() => {
    // 处理点击事件
  })

// ❌ 错误：Button 内无子组件但包含空大括号
Button("点击我") {
}
  .onClick(() => {
    // 处理点击事件
  })
```

**适用场景：** Button、Text、Image 等单标签组件内部无子组件时

---

### 6.2 Component Struct 必须包含 build() 方法

使用 `@Entry` 或 `@Component` 装饰器标记的 Struct **必须**包含 `build()` 方法来定义 UI 结构：

```typescript
// ✅ 正确：包含 build() 方法
@Entry
@Component
struct Index {
  aboutToAppear(): void {
    // 初始化代码
  }

  build(): void {
    Column() {
      Text("Hello")
    }
    .width('100%')
    .height('100%')
  }
}

// ✅ 正确：@Component 装饰的组件也必须包含 build()
@Component
struct MyButton {
  build(): void {
    Button("Click")
  }
}

// ❌ 错误：缺少 build() 方法
@Entry
@Component
struct BadComponent {
  aboutToAppear(): void {
    // ...
  }
  // ❌ 编译错误：struct must have at most and at least one 'build' method
}

// ❌ 错误：多个 build() 方法
@Entry
@Component
struct BadComponent {
  build(): void {
    Column() { Text("A") }
  }

  build(): void {  // ❌ 编译错误：duplicate build method
    Column() { Text("B") }
  }
}
```

### 6.2 build() 方法签名规范

```typescript
// ✅ 正确：build() 返回 void
build(): void {
  Column() {
    Text("Content")
  }
}

// ✅ build() 方法内可以包含子组件
build(): void {
  Column() {
    Row() {
      Text("Title")
      Image("icon.png")
    }
    List() {
      ForEach(this.items, (item: string) => {
        ListItem() {
          Text(item)
        }
      })
    }
  }
}
```

### 6.3 aboutToAppear() 与 build() 的关系

```typescript
// ✅ 正确：aboutToAppear() 用于初始化，build() 用于渲染 UI
@Entry
@Component
struct Index {
  aboutToAppear(): void {
    // 1. 初始化实况窗
    // 2. 加载数据
    // 3. 设置状态
  }

  build(): void {
    // UI 结构定义
    Column() {
      if (this.isLoading) {
        LoadingProgress()
      } else {
        Text(this.content)
      }
    }
  }
}

// ❌ 错误：不要在 build() 中进行副作用操作
build(): void {
  // ❌ 不要这样做
  this.fetchData();  // 应该在 aboutToAppear() 中调用
  console.info("Building UI");  // 应该在 aboutToAppear() 或 onPageShow() 中调用
}
```

---

## 七、实况窗开发常用模式

### 7.1 状态枚举与状态机

```typescript
// 实况窗状态定义
enum LiveViewStatus {
    WAITING_PAYMENT = 1,
    WAITING_MERCHANT = 2,
    WAITING_RIDER = 3,
    // ... 其他状态
}

// 状态更新逻辑
updateLiveView(): void {
    if (!this.defaultView) return;
    
    if (this.defaultView.sequence) {
        this.defaultView.sequence += 1;
    }
    
    switch (this.defaultView.sequence) {
        case LiveViewStatus.WAITING_MERCHANT:
            this.updateWaitingMerchantView();
            break;
        case LiveViewStatus.WAITING_RIDER:
            this.updateWaitingRiderView();
            break;
        // ... 其他状态分支
    }
}
```

### 7.2 资源引用

```typescript
// ✅ 使用 $r 引用资源
const title = await this.resourceManager.getStringValue(
    $r("app.string.Delivery_merchant_primary_title")
);

// ✅ 引用图片资源（字符串路径）
const icon = 'icon_store_white.png';
```

### 7.3 异步操作与错误处理

```typescript
public async startLiveView(): Promise<void> {
    // 检查实况窗是否启用
    if (!await this.isLiveViewEnabled()) {
        Logger.warn('Live view is disabled');
        return;
    }
    
    try {
        const view = await this.buildDefaultView();
        const result = await liveViewManager.startLiveView(view);
        Logger.info('Start live view result: %{public}s', JSON.stringify(result));
    } catch (e) {
        const err: BusinessError = e as BusinessError;
        Logger.error('Error code: %{public}d, message: %{public}s', err.code, err.message);
    }
}
```

### 7.4 LiveView 数据结构构造

```typescript
// 构建实况窗数据结构
private static async buildDefaultView(): Promise<liveViewManager.LiveView> {
    return {
        id: 0,
        event: 'DELIVERY',
        sequence: LiveViewStatus.WAITING_PAYMENT,
        isMute: true,
        liveViewData: {
            primary: {
                title: await this.resourceManager
                    .getStringValue($r("app.string.Delivery_default_primary_title")),
                content: [
                    {
                        text: 'Waiting for order',
                        textColor: '#FF0A59F7'
                    }
                ],
                keepTime: 15,
                clickAction: await ContextUtil.buildWantAgent('InstantDelivery'),
                layoutData: {
                    layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_PICKUP,
                    title: 'Pickup',
                    underlineColor: '#FF0A59F7'
                }
            },
            capsule: {
                type: liveViewManager.CapsuleType.CAPSULE_TYPE_TEXT,
                status: 1,
                icon: 'capsule_store.png'
            }
        }
    };
}
```

---

## 八、导入和模块

```typescript
// ✅ 导入 LiveViewKit 模块
import { liveViewManager } from '@kit.LiveViewKit';
import { BusinessError } from '@kit.BasicServicesKit';

// ✅ 导入本地工具类
import { Logger } from './LogUtil';
import { ContextUtil } from './ContextUtil';
import { ImageUtil } from './ImageUtil';

// ✅ 导入 ArkUI 组件
import router from '@ohos.router';
import promptAction from '@ohos.promptAction';
```

---

## 九、日志输出

**【强制】所有 console.log/info/warn/error 必须使用 `${}` 模板字符串格式**

```typescript
// ✅ 正确：使用模板字符串
console.info(`Request startLiveView req: ${JSON.stringify(WorkoutLiveViewController.defaultView)}`);
console.info(`Request startLiveView result: ${JSON.stringify(result)}`);
console.error(`Request startLiveView error: ${err.code}, ${err.message}`);

// ❌ 禁止使用字符串拼接
console.info('Request startLiveView req: ' + JSON.stringify(WorkoutLiveViewController.defaultView));
console.error('Request startLiveView error: ' + err.code + ', ' + err.message);
```

---

## 十、常见编译错误速查表

### 10.1 类方法调用错误

| 错误类型 | 错误信息 | 原因 | 解决方案 |
|----------|----------|------|----------|
| 实例方法调用 | `Property 'xxx' does not exist on type 'typeof ClassName'` | 直接通过类名调用实例方法（如 `ClassName.method()`） | 先创建实例：`const instance = new ClassName(); instance.method();` |
| 静态方法调用 | `Property 'xxx' does not exist on type 'ClassName'` | 实例对象调用静态方法 | 使用类名调用：`ClassName.staticMethod();` |

**示例：**
```typescript
// ❌ 错误写法
LiveViewController.startLiveView();  // startLiveView 是实例方法

// ✅ 正确写法
const controller = new LiveViewController();
controller.startLiveView();
```

### 10.2 类型错误

| 错误类型 | 错误信息 | 原因 | 解决方案 |
|----------|----------|------|----------|
| 类型推断失败 | `Cannot find name 'xxx'` 或 `Property 'xxx' does not exist` | 对象字面量缺少类型标注 | 显式声明类型：`const data: DataType = { ... }` |
| 可选字段缺失 | `Property 'xxx' is optional in type 'xxx', but required in type 'yyy'` | 类型不匹配 | 添加可选字段或调整类型定义 |
| Sendable 类型 | `Type 'xxx' is not assignable to type 'Sendable'` | ArkTS 对 Sendable 类型有严格限制 | 确保对象符合 Sendable 约束 |

### 10.3 语法错误

| 错误类型 | 错误代码 | 原因 | 解决方案 |
|----------|----------|------|----------|
| 禁止使用 var | 6133 | ArkTS 不支持 var 声明 | 改用 `let` 或 `const` |
| 禁止解构声明 | 6133 | 解构声明 `{a, b} = obj` 禁止 | 逐一声明变量 |
| 禁止解构参数 | 6133 | 解构参数 `function f({a})` 禁止 | 使用直接参数 |
| 禁止嵌套函数 | 6133 | 嵌套函数声明禁止 | 提取为顶层函数 |
| 禁止 class 表达式 | 6133 | `const C = class {}` 禁止 | 使用命名 class 声明 |
| 禁止动态属性访问 | 6133 | `obj[key]` 访问禁止 | 使用已知属性名直接访问 |
| 禁止函数表达式 | 6133 | `const f = function(){}` 禁止 | 使用箭头函数 |

### 10.4 Component Struct 错误

| 错误类型 | 错误信息 | 原因 | 解决方案 |
|----------|----------|------|----------|
| 缺少 build() 方法 | `The struct 'xxx' must have at most and at least one 'build' method` | `@Entry`/`@Component` 装饰的 struct 缺少 `build()` 方法 | 添加 `build(): void { /* UI 结构 */ }` 方法 |
| 多个 build() 方法 | `The struct 'xxx' must have at most and at least one 'build' method` | struct 中定义了多个 `build()` 方法 | 保留一个 `build()` 方法 |

**示例：**
```typescript
// ✅ 正确：包含 build() 方法
@Entry
@Component
struct Index {
  aboutToAppear(): void {
    // 初始化代码
  }

  build(): void {
    Column() {
      Text("Hello LiveView")
    }
    .width('100%')
    .height('100%')
  }
}

// ❌ 错误：缺少 build() 方法
@Entry
@Component
struct BadComponent {
  aboutToAppear(): void {
    // ...
  }
  // ❌ 编译错误：must have at least one 'build' method
}

// ❌ 错误：多个 build() 方法
@Entry
@Component
struct BadComponent {
  build(): void {
    Column() { Text("A") }
  }

  build(): void {  // ❌ 编译错误：duplicate build method
    Column() { Text("B") }
  }
}
```

### 10.5 实况窗开发特定错误

| 错误类型 | 错误描述 | 原因 | 解决方案 |
|----------|----------|------|----------|
| layoutData 修改 | 编译通过但运行异常 | 通过 `.layoutData.xxx` 修改部分字段 | 整体重写 layoutData 对象 |
| capsule 缺失 | 实况窗创建失败 | 请求体缺少 capsule 参数 | 确保所有请求包含 capsule |
| sequence 未定义 | 更新失败 | sequence 为 undefined | 使用 `??` 提供默认值 |
| await 在同步方法 | 编译错误 | 在非 async 方法中使用 await | 将方法标记为 async |

**示例：**
```typescript
// ❌ 错误写法 - 部分修改 layoutData
this.defaultView.liveViewData.primary.layoutData.progress = 50;

// ✅ 正确写法 - 整体重写
this.defaultView.liveViewData.primary.layoutData = {
    layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_PROGRESS,
    progress: 50,
    lineType: liveViewManager.LineType.LINE_TYPE_DOTTED_LINE
};
```

### 10.6 日志格式化错误

| 错误类型 | 错误描述 | 原因 | 解决方案 |
|----------|----------|------|----------|
| 字符串模板 | 编译错误 | 使用反引号字符串 `` `hello ${x}` `` | 使用 `%{public}s` 占位符 |
| 多余占位符 | 运行时警告 | 占位符数量与参数不匹配 | 确保占位符数量 = 参数数量 |
| 类型不匹配 | 运行时异常 | 占位符类型与参数类型不匹配 | `%{public}s` 用于字符串，`%{public}d` 用于数字 |

**示例：**
```typescript
// ✅ 正确写法
Logger.info('Value: %{public}s, Number: %{public}d', 'test', 123);

// ❌ 错误写法
Logger.info(`Value: ${'test'}, Number: ${123}`);  // 编译错误
```
