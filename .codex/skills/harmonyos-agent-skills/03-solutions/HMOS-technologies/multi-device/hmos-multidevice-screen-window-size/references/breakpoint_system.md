# 断点系统完全指南

## 目录

1. [断点方案推荐](#断点方案推荐)
2. [断点设计原理](#断点设计原理)
3. [横向断点](#横向断点)
4. [纵向断点](#纵向断点)
5. [断点监听](#断点监听)

---

## 断点方案推荐

### 优先使用系统断点

当项目尚未建立断点体系时，**必须优先使用系统断点**（`getWindowWidthBreakpoint()` / `getWindowHeightBreakpoint()`）。

> **优先级排序**：已有断点系统 > 系统断点

### 选择决策流程

```
项目是否已有自建断点管理模块？
  ├─ 是 → 复用已有断点体系（★★★）
  └─ 否 → 必须使用系统断点 API（★★☆）
```

---

## 断点设计原理

断点(Breakpoint)是响应式布局中最常用的特征，用于将窗口宽度或窗口高宽比划分为不同的范围。当窗口尺寸从一个断点变化到另一个断点时，页面布局会相应调整。

### 核心概念

- **横向断点**: 基于窗口宽度(vp)划分，代表窗口的宽度特征
- **纵向断点**: 基于窗口高宽比划分，代表窗口的相对高度特征

### 为什么需要两种断点？

**原则一: 布局拉通**
> 两个宽度相近的窗口，页面布局应保持一致，断点归一。

例如:
- 手机竖屏(374vp宽) 和 折叠屏外屏竖屏(345vp宽) → 都使用sm断点
- 平板横屏(1137vp宽) 和 三折叠G态横屏(1107vp宽) → 都使用lg断点

**原则二: 差异化设计**
> 高度相对宽度较小的窗口(横向窗口或类方形窗口)，页面布局进行差异化设计，增加纵向断点。

### 8 种屏幕形态分类

同一设备由于横竖屏旋转，会产生横向和纵向两种屏幕形态。根据横向断点与纵向断点的组合，可划分为 8 种屏幕形态：

| 屏幕形态 | 典型设备                                                 | 横向断点 | 纵向断点 |
|---|------------------------------------------------------|---|---|
| **超大屏横屏** | PC / 2in1                                            | xl | sm |
| **大屏横屏** | Pad、三折叠三屏态、折叠PC（半折叠态）、大阔折（展开态）                       | lg | sm |
| **大屏竖屏** | Pad（竖屏）、三折叠三屏态（竖屏）、大阔折（展开态）                          | md | lg |
| **大方形屏** | Mate X（展开态）、Mate XT（双屏M态）                            | md | md |
| **直板机竖屏** | Mate 60、小折叠（展开态）、阔折叠（展开态）、双折叠（折叠态）、三折叠（折叠态）、大阔折（折叠态） | sm | lg |
| **直板机横屏** | 直板机横屏、小折叠/阔折叠/双折叠/三折叠（横屏）、大阔折（折叠态）                   | md | sm |
| **小方形屏** | Pura X 外屏（阔折叠折叠态）                                    | sm | md |
| **圆形屏** | 智能手表                                                 | xs | sm |

### 断点模式选择原则

设计断点时，**必须参考上述 8 种屏幕形态分类**，根据应用的目标设备范围和页面布局需求，选择合适的断点适配模式：

- **仅横向断点**：适用于布局差异主要由宽度决定的页面（如列表/详情自适应）。此时需覆盖 sm / md / lg 三种横向断点对应的典型屏幕形态。
- **横向断点 + 纵向断点**：适用于横向窗口与纵向窗口布局差异明显的页面（如导航栏位置、内容区域排列方式随窗口形态变化）。需同时监听横向和纵向断点，针对不同屏幕形态组合分别设计布局。

> **关键**：不要凭空设定断点区间和布局方案，必须以上述 8 种屏幕形态为依据，确保每种形态都有对应的布局设计，避免出现某类设备上布局异常的问题。

---

## 横向断点

横向断点以应用窗口宽度为判断条件，建议划分为5个区间:

| 断点名称 | 窗口宽度(vp) | 典型设备场景 |
|---------|-------------|-------------|
| **xs** | (0, 320) | 智能穿戴设备 |
| **sm** | [320, 600) | 手机竖屏、折叠屏外屏竖屏、三折叠F态竖屏 |
| **md** | [600, 840) | 手机横屏、双折叠展开态、三折叠M态 |
| **lg** | [840, 1440) | 平板、三折叠G态、部分手机横屏 |
| **xl** | [1440, +∞) | 电脑、大尺寸平板 |

### 系统横向断点

> **说明**：`WidthBreakpoint` 为系统内置枚举，**无需 import 导入**，可直接使用。

优先使用系统接口 getWindowWidthBreakpoint() 获取当前窗口的横向断点值:

```typescript
// WidthBreakpoint 为系统内置枚举，无需 import
let widthBp: WidthBreakpoint = uiContext.getWindowWidthBreakpoint();
// 返回枚举: WIDTH_XS(0) / WIDTH_SM(1) / WIDTH_MD(2) / WIDTH_LG(3) / WIDTH_XL(4)
```

| 名称      | 值  | 说明                                  |
|-----------|-----|---------------------------------------|
| WIDTH_XS  | 0   | 窗口宽度小于320vp                     |
| WIDTH_SM  | 1   | 窗口宽度大于等于320vp，且小于600vp    |
| WIDTH_MD  | 2   | 窗口宽度大于等于600vp，且小于840vp    |
| WIDTH_LG  | 3   | 窗口宽度大于等于840vp，且小于1440vp   |
| WIDTH_XL  | 4   | 窗口宽度大于等于1440vp                |

---

## 纵向断点

纵向断点以应用窗口高宽比为判断条件:

| 断点名称   | 高宽比范围 | 窗口类型 |
|--------|-----------|---------|
| **sm** | (0, 0.8) | 横向窗口 |
| **md** | [0.8, 1.2) | 类方形窗口 |
| **lg** | [1.2, +∞) | 纵向窗口 |

### 系统纵向断点

> **说明**：`HeightBreakpoint` 为系统内置枚举，**无需 import 导入**，可直接使用。

优先使用系统接口 getWindowHeightBreakpoint() 获取当前窗口的纵向断点值:

```typescript
// HeightBreakpoint 为系统内置枚举，无需 import
let heightBp: HeightBreakpoint = uiContext.getWindowHeightBreakpoint();
// 返回枚举: HEIGHT_SM(0) / HEIGHT_MD(1) / HEIGHT_LG(2)
```

| 名称      | 值  | 说明                                |
|-----------|-----|-------------------------------------|
| HEIGHT_SM | 0   | 窗口高宽比小于0.8                   |
| HEIGHT_MD | 1   | 窗口高宽比大于等于0.8，且小于1.2    |
| HEIGHT_LG | 2   | 窗口高宽比大于等于1.2               |

---

## 断点监听

### ⚠️ 重要原则：断点必须可变化

断点必须能够响应窗口尺寸变化，否则断点值将始终保持初始值，无法实现响应式布局。

```typescript
// ❌ 错误: 断点值固定，不会随窗口变化
@State currentBreakpoint: string = 'sm';  // 永远是 'sm'

// ✅ 推荐方案: 使用系统断点 + 窗口监听
windowStage.loadContent('pages/Index', (err) => {
  if (err.code) {
    return;
  }
  let widthBp = uiContext.getWindowWidthBreakpoint(); // 获取初始值
  windowClass.on('windowSizeChange', () => {
    widthBp = uiContext.getWindowWidthBreakpoint();
  });
})
```

### 推荐方案详细用法

使用系统断点枚举 + `windowSizeChange` 监听的完整实现见 [SystemBreakpointExample.ets](../assets/SystemBreakpointExample.ets)：

```typescript
// 页面组件：使用系统断点枚举消费断点
@StorageProp('currentWidthBreakpoint') @Watch('onBreakpointChange')
widthBp: WidthBreakpoint = WidthBreakpoint.WIDTH_SM;

// 断点初始化和监听在 EntryAbility 的 loadContent 回调中完成（见前置条件一/二）
```

断点类型工具类（简化断点条件渲染）见 [BreakpointType.ets](../assets/BreakpointType.ets)：

```typescript
// 伪代码：根据断点获取对应值
const columns = new BreakpointType(4, 8, 12);
```

---

## 注意事项

- 断点回调中只更新 UI 状态（布局切换、显隐切换），不要执行网络请求或复杂计算。

### 前置条件一：getMainWindowSync 必须在 loadContent 回调内调用

`windowStage.getMainWindowSync()` **必须**在 `loadContent` 的回调函数内调用，不能在 `loadContent` 之前调用。在 `loadContent` 之前调用会拿到 0×0 的窗口实例，导致断点初始化值错误、`px2vp` 转换为 0、监听注册失败。

```typescript
// ❌ 错误：在 loadContent 之前获取窗口实例，拿到 0×0
onWindowStageCreate(windowStage: window.WindowStage): void {
  this.mainWindow = windowStage.getMainWindowSync(); // 此时窗口尚未完成布局
  AppStorage.setOrCreate('currentWidthBreakpoint',
    this.mainWindow.getUIContext().getWindowWidthBreakpoint()); // 返回错误值
  windowStage.loadContent('pages/Index', (err) => { /* ... */ });
}

// ✅ 正确：在 loadContent 回调内获取窗口实例
onWindowStageCreate(windowStage: window.WindowStage): void {
  windowStage.loadContent('pages/Index', (err) => {
    if (err.code) { return; }
    this.mainWindow = windowStage.getMainWindowSync(); // 窗口已完成布局
    const uiContext = this.mainWindow.getUIContext();

    // 初始化断点和窗口尺寸
    AppStorage.setOrCreate('currentWidthBreakpoint', uiContext.getWindowWidthBreakpoint());
    const initRect = this.mainWindow.getWindowProperties().windowRect;
    AppStorage.setOrCreate('screenWidthVp', uiContext.px2vp(initRect.width));
    AppStorage.setOrCreate('screenHeightVp', uiContext.px2vp(initRect.height));

    // 监听窗口尺寸变化
    this.mainWindow.on('windowSizeChange', (size: window.Size) => {
      AppStorage.setOrCreate('currentWidthBreakpoint', uiContext.getWindowWidthBreakpoint());
      AppStorage.setOrCreate('screenWidthVp', uiContext.px2vp(size.width));
      AppStorage.setOrCreate('screenHeightVp', uiContext.px2vp(size.height));
    });
  });
}
```

**检查要点**：
- 如果 `AppStorage` 中的 `screenWidthVp` / `screenHeightVp` 始终为 0，首先检查 `getMainWindowSync()` 是否在 `loadContent` 回调内调用。
- `getWindowProperties().windowRect` 和 `px2vp()` 都依赖正确的窗口实例，必须在回调内使用。

### 前置条件二：使用 @StorageProp 消费断点时必须确保数据源已注册

组件通过 `@StorageProp('currentWidthBreakpoint')` 消费系统断点时，`AppStorage` 中必须存在该 key 且能够随窗口尺寸变化更新，否则 `@StorageProp` 始终使用组件声明的默认值，组件无法感知窗口尺寸变化，布局固定在初始状态不切换。

数据源的注册位置不限于 EntryAbility，只要在组件使用 `@StorageProp` 之前完成即可。以下以在 EntryAbility 中注册为例：

1. **初始化**：通过 `getWindowWidthBreakpoint()` 获取当前断点，写入 `AppStorage`
2. **监听变化**：注册 `windowSizeChange`，在回调中更新 `AppStorage`

```typescript
// 以 EntryAbility 注册为例 — 必须在 loadContent 回调中（见前置条件一）
windowStage.loadContent('pages/Index', (err) => {
  if (err.code) {
    return;
  }
  const mainWindow = windowStage.getMainWindowSync()
  const uiContext = mainWindow.getUIContext()

  // 步骤1：初始化断点
  AppStorage.setOrCreate('currentWidthBreakpoint', uiContext.getWindowWidthBreakpoint())

  // 步骤2：监听窗口尺寸变化，同步更新断点
  mainWindow.on('windowSizeChange', () => {
    AppStorage.setOrCreate('currentWidthBreakpoint', uiContext.getWindowWidthBreakpoint())
  })
})
```

**检查要点**：
- `@StorageProp` 是只读绑定，组件自身不应该负责写入，数据源必须在组件外部注册。
- 初始化和变化监听缺一不可：只有初始化没有监听 → 断点不随窗口变化；只有监听没有初始化 → 首次渲染使用错误默认值。
- 当组件出现"断点值始终不变"的问题时，首先检查数据源注册处是否有对应的 `AppStorage.setOrCreate` 初始化和 `windowSizeChange` 监听。

### 前置条件三：禁止用 get 计算属性驱动断点派生状态

`get` 计算属性不是状态变量，ArkUI 框架不会追踪其返回值的变化。即使 `get` 内部读取了 `@StorageProp` 断点值，框架也只追踪 `@StorageProp` 本身的变化，不会因 `get` 的返回值变化而触发 UI 更新。因此，**禁止用 `get` 从断点值派生响应式状态**。

```typescript
// ❌ 错误：用 get 派生断点相关的响应式状态
@StorageProp('currentWidthBreakpoint') widthBp: WidthBreakpoint = WidthBreakpoint.WIDTH_SM

private get isSmallScreen(): boolean {
  return this.widthBp === WidthBreakpoint.WIDTH_SM || this.widthBp === WidthBreakpoint.WIDTH_XS
}

// 以下所有用法都不会响应断点变化：
// 1. if/else 分支
if (this.isSmallScreen) { /* ... */ }
// 2. 属性绑定
.showSideBar(this.isSmallScreen)
```

**正确做法**：使用 `@State` 变量 + `@Watch` 回调显式同步派生状态：

```typescript
// ✅ 正确：@State + @Watch 显式同步断点派生状态
@StorageProp('currentWidthBreakpoint') @Watch('onBreakpointChange')
widthBp: WidthBreakpoint = WidthBreakpoint.WIDTH_SM
@State isSmallScreen: boolean = true

aboutToAppear(): void {
  this.onBreakpointChange()  // 初始化
}

onBreakpointChange(): void {
  this.isSmallScreen = this.widthBp === WidthBreakpoint.WIDTH_SM ||
    this.widthBp === WidthBreakpoint.WIDTH_XS
}

// 现在 this.isSmallScreen 的变化会被框架追踪，所有依赖它的 UI 都能正确更新
```

**要点**：
- `get` 计算属性适合在 `build()` 内用于**一次性求值**（如 `.fontSize(this.getTitle())`），不适合用于**从断点值派生响应式状态**。
- 需要根据断点派生任何会影响 UI 的状态时，必须使用 `@State` + `@Watch` 显式同步。
- `aboutToAppear` 中必须调用一次回调初始化 `@State` 值，避免首次渲染使用错误的默认值。

---

## 断点回调状态完整性检查

### 核心原则：双向完整映射

断点回调（`@Watch` 回调）中的状态映射必须是**双向完整**的——每个断点值都必须明确对应一个确定的 UI 状态，不能只处理"需要变化"的那一侧而依赖初始值的隐式正确性。

### 错误模式

```typescript
// ❌ 错误：只处理宽屏方向的赋值，窄屏方向依赖初始值
onBreakpointChange(): void {
  this.isSmallScreen = this.widthBp === WidthBreakpoint.WIDTH_SM
  if (!this.isSmallScreen) {
    this.showSideBar = true  // 宽屏打开
    // 窄屏时什么都不做，showSideBar 可能残留 true
  }
}
```

**残留场景**：用户在宽屏上使用（`showSideBar = true`），然后折叠设备或旋转到竖屏 → 断点变为 sm → 回调触发但 `showSideBar` 未被设为 `false` → 侧边栏在小屏上异常残留。

### 正确模式

```typescript
// ✅ 正确：每个断点分支都明确赋值，不依赖初始值
onBreakpointChange(): void {
  this.isSmallScreen = this.widthBp === WidthBreakpoint.WIDTH_SM
  if (this.isSmallScreen) {
    this.showSideBar = false   // 窄屏：明确关闭
  } else {
    this.showSideBar = true    // 宽屏：明确打开
  }
}
```

### 自检清单

编写断点回调时，逐条检查以下项目：

| # | 检查项 | 说明 |
|---|--------|------|
| 1 | **全断点覆盖** | 回调中是否对 sm / md / lg / xl 每种断点都明确设置了所有受影响的 `@State` 变量？ |
| 2 | **双向变迁** | 是否验证了宽→窄和窄→宽两种切换方向，状态都能正确更新？ |
| 3 | **无隐式依赖** | 是否有变量的正确性依赖于初始值（如 `= false`）而非回调中的显式赋值？ |

### 验证矩阵模板

编写断点回调后，填写以下矩阵确认每个断点下每个 UI 状态的预期值：

| UI 状态变量 | sm | md | lg | xl |
|------------|-----|-----|-----|-----|
| `showSideBar` | `false` | `true` | `true` | `true` |
| `isSmallScreen` | `true` | `false` | `false` | `false` |
| *(其他变量)* | | | | |

矩阵中不允许出现空白格；每个格必须有明确的值，回调代码必须覆盖所有格。