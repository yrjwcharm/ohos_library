# 方向概念指南


## 目录

1. [屏幕与窗口的区别](#屏幕与窗口的区别)
2. [@ohos.display 屏幕属性](#ohosdisplay-屏幕属性)
3. [屏幕旋转 (Display Rotation)](#屏幕旋转-display-rotation)
4. [屏幕方向 (Display Orientation)](#屏幕方向-display-orientation)
5. [窗口方向 (Window Orientation)](#窗口方向-window-orientation)
6. [自然方向 (Natural Orientation)](#自然方向-natural-orientation)
7. [窗口方向与屏幕方向的区别](#窗口方向与屏幕方向的区别)
8. [常用 API 速查](#常用-api-速查)

---

## 屏幕与窗口的区别

- **屏幕 (Display)**：物理或逻辑的显示设备，是显示内容的整体区域。通过 `display`（`@kit.ArkUI`）获取屏幕属性。
- **窗口 (Window)**：运行在屏幕上的可交互图形界面区域，属于软件层面。通过 `window`（`@kit.ArkUI`）设置窗口旋转策略。

```
屏幕 (Display) ← display.rotation, display.orientation
  └── 窗口 (Window) ← window.setPreferredOrientation()
        └── 组件 (Component)
```

---

## @ohos.display 屏幕属性

`display` 模块（通过 `@kit.ArkUI` 导入）提供管理设备屏幕的基础能力，包括获取默认显示设备信息、监听屏幕状态变化、查询折叠设备状态等。

> API 参考文档标题为 `@ohos.display`，实际开发中统一使用 `import { display } from '@kit.ArkUI'` 导入。

### 导入方式

```typescript
import { display } from '@kit.ArkUI';
```

### 核心 API

| 接口 | 说明 |
|------|------|
| `getDefaultDisplaySync()` | 获取默认 Display 对象（同步） |
| `getAllDisplays()` | 获取所有 Display 对象 |
| `isFoldable()` | 检查设备是否可折叠 |
| `getFoldStatus()` | 获取折叠设备的折叠状态 |
| `getCurrentFoldCreaseRegion()` | 获取折叠设备折痕区域 |
| `on('change', callback)` | 监听显示设备变化 |
| `on('foldStatusChange', callback)` | 监听折叠状态变化 |

> 各 API 的详细原型及参数说明见[常用 API 速查](#常用-api-速查)。

### Display 对象核心属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | number | 显示设备 ID |
| `width` | number | 屏幕宽度 (px) |
| `height` | number | 屏幕高度 (px) |
| `rotation` | number | 屏幕顺时针旋转角度 (0/1/2/3) |
| `orientation` | Orientation | 屏幕当前横竖方向 |
| `densityPixels` | number | 逻辑像素密度 |
| `refreshRate` | number | 刷新率 (Hz) |

> 注意: `display.width`/`display.height` 单位为 px，需通过 `px2vp()` 转换为 vp 使用。

---

## 屏幕旋转 (Display Rotation)

显示设备的屏幕**顺时针旋转角度**。适用于与硬件设备角度强关联的场景，如相机预览角度补偿。

### Rotation 值定义

| 值 | 角度 | 说明 |
|----|------|------|
| 0 | 0° | 屏幕顺时针旋转 0° |
| 1 | 90° | 屏幕顺时针旋转 90° |
| 2 | 180° | 屏幕顺时针旋转 180° |
| 3 | 270° | 屏幕顺时针旋转 270° |

### 获取屏幕旋转

```typescript
import { display } from '@kit.ArkUI';

const displayInfo = display.getDefaultDisplaySync();
const rotation = displayInfo.rotation; // 0, 1, 2, 3
const rotationDegrees = rotation * 90; // 0°, 90°, 180°, 270°
```

> 重要: `rotation` 的含义与设备的[自然方向](#自然方向-natural-orientation)有关。在自然竖屏设备上 rotation=0 对应 PORTRAIT，但在三折叠 G 态上 rotation=0 对应 LANDSCAPE_INVERTED。

---

## 屏幕方向 (Display Orientation)

显示设备的屏幕横竖方向，**只能获取，不能设置**。与 `rotation` 的关系取决于设备的[自然方向](#自然方向-natural-orientation)：同样的 rotation=0，在自然竖屏设备上 Orientation 为 PORTRAIT，在自然横屏设备上为 LANDSCAPE。

### Orientation 值定义

| 名称 | 值 | 说明 |
|------|---|------|
| PORTRAIT | 0 | 设备当前以竖屏方式显示 |
| LANDSCAPE | 1 | 设备当前以横屏方式显示 |
| PORTRAIT_INVERTED | 2 | 设备当前以反向竖屏方式显示 |
| LANDSCAPE_INVERTED | 3 | 设备当前以反向横屏方式显示 |

### 获取屏幕方向

```typescript
import { display } from '@kit.ArkUI';

const displayInfo = display.getDefaultDisplaySync();
console.log(`当前屏幕方向: ${displayInfo.orientation}`);
// 0=PORTRAIT, 1=LANDSCAPE, 2=PORTRAIT_INVERTED, 3=LANDSCAPE_INVERTED
```

> 注意: 应用窗口的宽高比与屏幕属性的 Orientation 没有直接关系，**不建议根据屏幕属性的 Orientation 来做窗口布局适配**。屏幕属性的 Orientation 仅用于辅助 sensor 和相机的方向修正。

---

## 窗口方向 (Window Orientation)

窗口方向代表的是**窗口旋转策略**，由开发者通过 `setPreferredOrientation()` 设置。系统根据旋转策略、设备当前握持方向、系统旋转锁定开关、应用场景综合决定显示方向。

### 18 种旋转策略

#### 固定方向类型

| 名称 | 值 | 说明 |
|------|---|------|
| PORTRAIT | 1 | 竖屏显示 |
| LANDSCAPE | 2 | 横屏显示 |
| PORTRAIT_INVERTED | 3 | 反向竖屏显示 |
| LANDSCAPE_INVERTED | 4 | 反向横屏显示 |

#### 自动旋转方向类型

| 名称 | 值 | 受控制中心开关控制 | 支持方向 |
|------|---|---|---|
| AUTO_ROTATION | 5 | 否 | 四方向 |
| AUTO_ROTATION_PORTRAIT | 6 | 否 | 竖屏/反向竖屏 |
| AUTO_ROTATION_LANDSCAPE | 7 | 否 | 横屏/反向横屏 |
| AUTO_ROTATION_RESTRICTED | 8 | 是 | 四方向 |
| AUTO_ROTATION_PORTRAIT_RESTRICTED | 9 | 是 | 竖屏/反向竖屏 |
| AUTO_ROTATION_LANDSCAPE_RESTRICTED | 10 | 是 | 横屏/反向横屏 |
| AUTO_ROTATION_UNSPECIFIED | 12 | 是 | 受系统判定（直板机三向，平板四向） |

#### 临时方向类型（常用于视频类应用）

| 名称 | 值 | 说明 |
|------|---|------|
| USER_ROTATION_PORTRAIT | 13 | 临时旋转到竖屏，之后跟随传感器 |
| USER_ROTATION_LANDSCAPE | 14 | 临时旋转到横屏，之后跟随传感器 |
| USER_ROTATION_PORTRAIT_INVERTED | 15 | 临时旋转到反向竖屏，之后跟随传感器 |
| USER_ROTATION_LANDSCAPE_INVERTED | 16 | 临时旋转到反向横屏，之后跟随传感器 |

#### 其他方向类型

| 名称 | 值 | 说明 |
|------|---|------|
| UNSPECIFIED | 0 | 未定义，由系统判定 |
| LOCKED | 11 | 锁定模式（被拉起时保持前一个应用方向） |
| FOLLOW_DESKTOP | 17 | 跟随桌面旋转模式 |

### 设置窗口方向

```typescript
import { window } from '@kit.ArkUI';

// 方式一：module.json5 配置启动时方向
// "orientation": "portrait"

// 方式二：运行时动态设置
async function setOrientation(context: UIAbilityContext, orientation: window.Orientation) {
  const windowClass = context.windowStage.getMainWindowSync();
  await windowClass.setPreferredOrientation(orientation);
}
```

### 接口行为限制

- **仅主窗口生效**：PC/2in1、子窗口、自由多窗下调用 `setPreferredOrientation()` 不生效。
- **分屏/悬浮窗场景**：系统忽略旋转策略，应用显示方向不会改变。退出这些场景后才根据策略重新调整。
- **无传感器设备**：TV 等无 sensor 设备上调用不生效。

### 分屏/自由窗口下的方向行为

平板和折叠屏展开态支持分屏、悬浮窗和自由窗口模式。在这些模式下，应用的方向控制策略表现如下：

| 窗口模式 | 方向控制 | 布局适配方式 |
|---------|---------|------------|
| 全屏 | 正常生效，`setPreferredOrientation()` 可用 | 通过旋转策略 + 响应式布局 |
| 分屏 | 旋转策略被忽略，不可控制方向 | 通过 `windowSizeChange` + 断点适配 |
| 悬浮窗 | 旋转策略被忽略 | 同上 |
| 自由窗口 | 旋转策略被忽略，窗口由用户自由拖拽调整 | 同上 |


**关键要点**：

1. 分屏/自由窗口下，`setPreferredOrientation()` 调用不会报错但不会生效，不会影响应用稳定性。
2. 退出分屏/自由窗口回到全屏后，系统会根据最后一次设置的旋转策略重新决定方向。
3. 应用应始终通过响应式布局（断点 + `windowSizeChange`）适配不同窗口尺寸，不依赖方向控制。

---

## 自然方向 (Natural Orientation)

设备的自然方向是指设备在标准使用姿势下的方向。

### 自然竖屏设备

**设备类型**: 直板手机、折叠屏折叠态、三折叠 F/M 态、平板

- 自然方向为竖屏 (rotation=0 时为 PORTRAIT)
- 横竖屏切换时: 竖屏 → 横屏，rotation 从 0 变为 1

### 自然横屏设备

**设备类型**: PC/2in1、智慧屏

- 自然方向为横屏 (rotation=0 时为 LANDSCAPE)

### 三折叠 G 态（特殊）

- 自然方向是横屏，但 rotation=0 对应 **LANDSCAPE_INVERTED**（反向横屏）
- 原因：摄像头物理位置导致

| 设备形态 | rotation=0 含义 |
|---------|---------------|
| 直板机 | PORTRAIT |
| 折叠屏折叠态 | PORTRAIT |
| 三折叠 F/M 态 | PORTRAIT |
| 三折叠 G 态 | LANDSCAPE_INVERTED |
| 平板 | PORTRAIT |
| PC/2in1 | LANDSCAPE |

---

## 窗口方向与屏幕方向的区别

| 对比项 | 屏幕侧 Orientation | 窗口侧 Orientation |
|--------|-------------------|-------------------|
| 所属模块 | `display`（`@kit.ArkUI`） | `window`（`@kit.ArkUI`） |
| 含义 | 屏幕当前横竖显示方向 | 窗口旋转策略 |
| 操作 | 只能获取，不能设置 | 由开发者设置 |
| 用途 | 辅助 sensor/相机方向修正 | 控制应用显示方向 |

**关键要点**:
1. 屏幕 rotation 决定了 display Orientation 的值，但这个映射关系因设备的[自然方向](#自然方向-natural-orientation)不同而不同，不能简单地用一套映射逻辑覆盖所有设备。
2. **控制应用的显示方向应通过设置窗口侧的 orientation（旋转策略）实现**，而非读取屏幕属性。
3. 在 rotation=0 的情况下，窗口的 orientation 可能是竖屏也可能是横屏（取决于设备和形态）。

---

## 常用 API 速查

### 获取屏幕信息

```typescript
import { display } from '@kit.ArkUI';

try {
  const displayInfo = display.getDefaultDisplaySync();
  const rotation = displayInfo.rotation;           // 0-3
  const orientation = displayInfo.orientation;     // 0-3
  const width = displayInfo.width;                 // px
  const height = displayInfo.height;               // px
  const isFoldable = display.isFoldable();          // boolean
  const foldStatus = display.getFoldStatus();       // FoldStatus enum
} catch (err) {
  console.error('Failed to get display info:', JSON.stringify(err));
}
```

| API | 原型 | 说明 |
|-----|------|------|
| 获取默认 Display | `getDefaultDisplaySync(): Display` | 同步获取默认显示设备对象，失败时抛异常需 try-catch |
| 获取所有 Display | `getAllDisplays(): Promise<Array<Display>>` | 异步获取所有显示设备对象，适用于多屏场景 |
| 是否可折叠 | `isFoldable(): boolean` | `true` 可折叠，`false` 不可折叠 |
| 获取折叠状态 | `getFoldStatus(): FoldStatus` | 返回折叠状态枚举，见下表 |
| 获取折痕区域 | `getCurrentFoldCreaseRegion(): FoldCreaseRegion` | 返回折痕矩形区域数组，`Rect` 含 left/top/width/height (px) |

**FoldStatus 枚举**:

| 名称 | 值 | 说明 |
|------|---|------|
| FOLD_STATUS_UNKNOWN | 0 | 折叠状态未知 |
| FOLD_STATUS_EXPANDED | 1 | 完全展开态 |
| FOLD_STATUS_FOLDED | 2 | 完全折叠态 |
| FOLD_STATUS_HALF_FOLDED | 3 | 半折叠态（悬停态） |
| FOLD_STATUS_EXPANDED_WITH_SECOND_EXPANDED | 4 | 折轴一展开、折轴二展开（三折叠 G 态） |
| FOLD_STATUS_FOLDED_WITH_SECOND_EXPANDED | 5 | 折轴一折叠、折轴二展开（三折叠 M 态） |

### 设置窗口方向

```typescript
import { window } from '@kit.ArkUI';

const context = getContext(this) as common.UIAbilityContext;
const windowClass = context.windowStage.getMainWindowSync();

// 锁定竖屏
windowClass.setPreferredOrientation(window.Orientation.PORTRAIT);

// 自动旋转（受控制中心开关控制）
windowClass.setPreferredOrientation(window.Orientation.AUTO_ROTATION_RESTRICTED);

// 跟随桌面
windowClass.setPreferredOrientation(window.Orientation.FOLLOW_DESKTOP);

// 临时旋转到横屏（视频全屏常用）
windowClass.setPreferredOrientation(window.Orientation.USER_ROTATION_LANDSCAPE);
```

| API | 原型 | 说明 |
|-----|------|------|
| 设置窗口方向 | `setPreferredOrientation(orientation: Orientation): Promise<void>` | `Window` 实例方法，参数为 [Orientation 枚举](#18-种旋转策略)，失败时 reject `BusinessError` |
| 获取主窗口 | `getMainWindowSync(): Window` | `WindowStage` 实例方法，同步返回 `Window` 对象，推荐优先使用（优于异步 `getLastWindow()`） |

### 监听方向变化

```typescript
import { display, window } from '@kit.ArkUI';
import { Callback } from '@kit.BasicServicesKit';

// 方式一：监听屏幕变化（获取 rotation/orientation）
const changeCallback: Callback<number> = (displayId: number) => {
  const info = display.getDefaultDisplaySync();
  console.log(`rotation: ${info.rotation}, orientation: ${info.orientation}`);
};
display.on('change', changeCallback);
// 取消时: display.off('change', changeCallback);

// 方式二：监听窗口尺寸变化（判断横竖屏，需在 Component 内使用）
const sizeCallback: Callback<window.Size> = (size: window.Size) => {
  const width = this.getUIContext().px2vp(size.width);   // this 指向 Component 实例
  const height = this.getUIContext().px2vp(size.height);
  const isLandscape = width > height;
};
windowClass.on('windowSizeChange', sizeCallback);
// 取消时: windowClass.off('windowSizeChange', sizeCallback);
```

| API | 原型 | 说明 |
|-----|------|------|
| 监听屏幕变化 | `display.on(type: 'add'\|'remove'\|'change', callback: Callback<number>): void` | callback 参数为 displayId；`'change'` 在屏幕旋转/分辨率/折叠状态变化时触发 |
| 取消监听屏幕 | `display.off(type: 'add'\|'remove'\|'change', callback?: Callback<number>): void` | 不传 callback 则关闭所有该类型监听 |
| 监听折叠变化 | `display.on(type: 'foldStatusChange', callback: Callback<FoldStatus>): void` | callback 参数为 FoldStatus |
| 取消监听折叠 | `display.off(type: 'foldStatusChange', callback?: Callback<FoldStatus>): void` | 不传 callback 则关闭所有该类型监听 |
| 监听窗口尺寸 | `windowClass.on(type: 'windowSizeChange', callback: Callback<Size>): void` | callback 参数为 `Size{width: number, height: number}`，单位 px |
| 取消监听窗口 | `windowClass.off(type: 'windowSizeChange', callback?: Callback<Size>): void` | 不传 callback 则关闭所有该类型监听 |

> 注意: 注册监听的 callback 需采用对象传递，使用匿名函数会导致内存泄漏。
>
> 重要: `display.on('change')` 回调中获取 Window 信息可能存在时序问题（窗口信息还未更新完成）。在回调中应通过 Display 实例获取屏幕信息，而非 Window 实例。
