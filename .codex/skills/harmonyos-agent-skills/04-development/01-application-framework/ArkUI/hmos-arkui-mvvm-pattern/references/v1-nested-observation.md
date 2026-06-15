# V1 嵌套类观测模式

> 来源：[@Observed 和 @ObjectLink](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-observed-and-objectlink)

## 核心问题

`@State` / `@Prop` / `@Link` **只能观察第一层变化**。嵌套对象的深层属性修改后 UI 不刷新。

```typescript
// ✗ this.bag.book.name 变化时 Index 中 Text 不刷新
@State bag: Bag = new Bag(new Book('JS'));

build() {
  Text(`${this.bag.book.name}`)  // bag.book 是第一层，name 是第二层
    .onClick(() => {
      this.bag.book.name = 'TS';  // @State 感知不到
    })
}
```

## 解决方案：@Observed + @ObjectLink

**规则**：内层对象用 `@Observed`，子组件用 `@ObjectLink` 接收。

```
@State 感知外层变化（第一层）
      ↓ 传递给子组件
@ObjectLink + @Observed 感知内层变化（任意层）
```

## 场景一：嵌套对象

```typescript
@Observed
class Book {
  public name: string;
  constructor(name: string) { this.name = name; }
}

@Observed
class Bag {
  public book: Book;
  constructor(book: Book) { this.book = book; }
}

// 子组件：用 @ObjectLink 接收内层对象
@Component
struct BookCard {
  @ObjectLink book: Book;  // 可观察 name 变化

  build() {
    Column() {
      Text(`${this.book.name}`)  // name 变化时刷新
        .onClick(() => { this.book.name = 'C++'; })
    }
  }
}

@Entry
@Component
struct Index {
  @State bag: Bag = new Bag(new Book('JS'));

  build() {
    Column() {
      Text(`${this.bag.book.name}`)   // ✗ 此处不刷新（第二层）
      BookCard({ book: this.bag.book })  // ✓ 此处刷新（@ObjectLink）
    }
  }
}
```

## 场景二：对象数组

数组中每个元素是 `@Observed` 对象，子组件用 `@ObjectLink` 逐个接收。

```typescript
@Observed
class Info {
  public id: number;
  public info: number;
  constructor(info: number) { this.id = nextID++; this.info = info; }
}

@Component
struct Child {
  @ObjectLink info: Info;  // 观察单个数组项的属性变化

  build() {
    Button(`info = ${this.info.info}`)
      .onClick(() => { this.info.info += 1; })
  }
}

@Entry
@Component
struct Parent {
  @State arrA: Info[] = [new Info(0), new Info(0)];

  build() {
    Column() {
      ForEach(this.arrA,
        (item: Info) => { Child({ info: item }) },
        (item: Info): string => item.id.toString()
      )
    }
  }
}
```

## 场景三：二维数组 / 可观测数组

声明 `@Observed` 子类化 `Array`，使 `push`/`splice` 等操作可被观察。

```typescript
@Observed
class ObservedArray<T> extends Array<T> {}

// MVVM 中常用模式
@Observed
export class ThingViewModelArray extends Array<ThingViewModel> {}

@Component
struct Item {
  @ObjectLink itemArr: ObservedArray<string>;

  build() {
    Row() {
      ForEach(this.itemArr, (item: string, index: number) => {
        Text(`${index}: ${item}`)
      }, (item: string) => item)
    }
  }
}

@Entry
@Component
struct IndexPage {
  @State arr: Array<ObservedArray<string>> = [
    new ObservedArray<string>('apple'),
    new ObservedArray<string>('banana'),
  ];

  build() {
    Column() {
      ForEach(this.arr, (itemArr: ObservedArray<string>) => {
        Item({ itemArr: itemArr })
      })
      Button('push')
        .onClick(() => { this.arr[0].push('strawberry'); })  // ✓ 可感知
    }
  }
}
```

## 场景四：多层嵌套（三层及以上）

**规则**：每一层嵌套都需要一个子组件 + `@ObjectLink`。

```typescript
@Observed
class SubCounter {
  public counter: number;
  constructor(c: number) { this.counter = c; }
}

@Observed
class ParentCounter {
  public counter: number;
  public subCounter: SubCounter;
  constructor(c: number) {
    this.counter = c;
    this.subCounter = new SubCounter(c);
  }
}

// 第一层：观察 ParentCounter 的属性
@Component
struct CounterComp {
  @ObjectLink value: ParentCounter;

  build() {
    Column() {
      Text(`${this.value.counter}`)
        .onClick(() => { this.value.counter++; })
      // 传递内层给专门子组件
      CounterChild({ subValue: this.value.subCounter })
    }
  }
}

// 第二层：观察 SubCounter 的属性
@Component
struct CounterChild {
  @ObjectLink subValue: SubCounter;

  build() {
    Text(`${this.subValue.counter}`)
      .onClick(() => { this.subValue.counter += 1; })
  }
}
```

## @ObjectLink 限制

| 限制 | 说明 |
|------|------|
| 禁止本地初始化 | `@ObjectLink obj: MyClass = new MyClass()` → 编译报错 |
| 变量只读 | `this.obj = newObj` → 运行时报错；`this.obj.prop = val` → 允许 |
| 不能与 `@State` 共存 | 同一组件内 `@ObjectLink` 和 `@State` 不能同时使用 |
| 不支持简单类型 | `@ObjectLink count: number` → 编译报错，用 `@Prop` 替代 |

## @Prop vs @ObjectLink 对比

| 特性 | `@Prop` | `@ObjectLink` |
|------|---------|---------------|
| 数据传递 | 深拷贝（单向） | 引用（双向） |
| 修改是否影响源 | 不影响 | 影响 |
| 是否可本地初始化 | 可以 | 禁止 |
| 是否可整体赋值 | 可以 | 禁止 |
| 适用场景 | 只读展示、需要本地修改副本 | 需要双向同步 |

## @Observed 注意事项

- **构造函数中修改属性不触发 UI 更新**：构造函数中的赋值不经过代理
- **不要在构造函数中使用定时器修改属性**：应在组件的 `aboutToAppear` 中调用方法修改
- **`@Observed` 会改变原型链**：不要和其他类装饰器混用同一个 class

```typescript
// ✗ 构造函数中修改不触发更新
@Observed
class RenderClass {
  waitToRender: boolean = false;
  constructor() {
    setTimeout(() => { this.waitToRender = true; }, 1000)  // 不触发更新
  }
}

// ✓ 在组件中修改
@Observed
class RenderClass {
  public waitToRender: boolean = false;
}

@Entry
@Component
struct Index {
  @State data: RenderClass = new RenderClass();

  aboutToAppear() {
    setTimeout(() => { this.data.waitToRender = true; }, 1000)  // 触发更新
  }
}
```
