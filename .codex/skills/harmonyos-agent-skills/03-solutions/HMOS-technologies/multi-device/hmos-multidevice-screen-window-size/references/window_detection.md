# 窗口监听指南

## 目录

1. [窗口尺寸监听](#窗口尺寸监听)
2. [窗口状态监听](#窗口状态监听)
3. [注意事项](#注意事项)

---

## 窗口尺寸监听

### 核心概念

#### 什么是窗口尺寸

窗口尺寸指应用窗口的物理像素宽高值，可通过 `window.Window` 实例获取。窗口尺寸不等同于屏幕尺寸——在自由窗口模式（PC/平板）或分屏模式下，窗口可以小于屏幕。

#### 窗口尺寸何时变化

| 触发场景 | 说明 |
|---------|------|
| 设备旋转 | 竖屏 ↔ 横屏，宽高互换 |
| 折叠屏折叠/展开 | 窗口宽度突变（如折叠屏展开从 345vp → 740vp） |
| 自由窗口拖拽 | PC/平板上用户拖拽窗口边框调整大小 |
| 分屏/悬浮窗 | 进入或退出分屏模式导致窗口区域缩小 |
| 避让区域变化 | 状态栏、导航栏、输入法弹出导致可用区域改变 |

#### 关键 API

| API | 所属模块 | 说明 |
|-----|---------|------|
| `window.getLastWindow(context)` | @ohos.window | 获取当前窗口实例 |
| `windowStage.getMainWindowSync()` | @ohos.window | 通过 WindowStage 获取主窗口 |
| `windowClass.on('windowSizeChange')` | @ohos.window | 监听窗口尺寸变化，回调参数为 `window.Size`（物理像素） |
| `windowClass.getWindowProperties()` | @ohos.window | 获取窗口属性，含 `windowRect` |
| `uiContext.px2vp(px)` | UIContext 实例方法 | 物理像素转虚拟像素（API 18+ 推荐替代全局 `px2vp()`） |

#### 物理像素与 vp

`windowSizeChange` 回调返回的 `window.Size` 是物理像素值，布局计算需要转换为虚拟像素（vp）。vp 是 ArkUI 布局的标准单位，会根据屏幕密度自动缩放。

- **API 18+**：使用 `UIContext` 实例方法 `uiContext.px2vp(px)` 进行转换
- **API 18 以下**：使用全局函数 `px2vp(px)`（已标记废弃）

```
回调 size.width (px) → uiContext.px2vp(size.width) → 布局使用的 vp 值
```

### 三步流程

1. **Ability 侧**：在 `loadContent` 回调中获取窗口实例，注册 `windowSizeChange` 监听，将尺寸(vp)写入 `AppStorage`
2. **AppStorage**：作为桥梁存储当前窗口高度(vp)，所有页面共享
3. **组件侧**：通过 `@StorageProp` 读取，无需自行监听

### EntryAbility 完整示例

```typescript
import { window } from '@kit.ArkUI';

export default class EntryAbility extends UIAbility {
  private mainWindow: window.Window | null = null;

  onWindowStageCreate(windowStage: window.WindowStage): void {
    this.mainWindow = windowStage.getMainWindowSync();

    windowStage.loadContent('pages/Index', (err) => {
      if (err.code) { return; }

      // 1. 初始值：在 loadContent 回调中获取（此时窗口已完成布局）
      const initHeight: number = px2vp(this.mainWindow!.getWindowProperties().windowRect.height);
      AppStorage.setOrCreate('screenHeightVp', initHeight);

      // 2. 动态监听：窗口尺寸变化时实时更新
      this.mainWindow!.on('windowSizeChange', (size: window.Size) => {
        const heightVp: number = px2vp(size.height);
        AppStorage.setOrCreate('screenHeightVp', heightVp);
      });
    });
  }

  onWindowStageDestroy(): void {
    // 3. 取消监听：防止内存泄漏
    if (this.mainWindow) {
      this.mainWindow.off('windowSizeChange');
      this.mainWindow = null;
    }
  }
}
```

### 页面组件消费示例

```typescript
@Entry
@Component
struct Index {
  // 通过 @StorageProp 响应式读取，窗口变化时自动更新
  @StorageProp('screenHeightVp') screenHeightVp: number = 0

  build() {
    Image($r('app.media.startIcon'))
      .width('100%')
      // 使用 constraintSize 按屏幕高度占比约束
      .constraintSize({
        minHeight: this.screenHeightVp > 0 ? this.screenHeightVp * 0.1 : 0,
        maxHeight: this.screenHeightVp > 0 ? this.screenHeightVp * 0.5 : undefined
      })
  }
}
```

### 要点速查

| 要点 | 说明 |
|------|------|
| 获取窗口实例 | `windowStage.getMainWindowSync()`，不用 `window.getLastWindow()` |
| 初始值时机 | 必须在 `loadContent` 回调内，之前拿到的是 0×0 |
| px 转 vp | `const h: number = px2vp(px)`，必须加 `: number` 显式类型避免 ArkTS `any` 报错 |
| 共享方式 | `AppStorage.setOrCreate('key', value)` + `@StorageProp('key')` |
| 防泄漏 | `onWindowStageDestroy` 中 `off('windowSizeChange')`，窗口实例置 null |
| 防抖 | 建议对高频回调做 100~200ms 防抖 |

封装了防抖、AppStorage 同步和精确 vp 值的完整工具类见 [WindowSizeChangeListener.ets](../assets/WindowSizeChangeListener.ets)。

---

## 窗口状态监听

### 核心概念

#### 什么是窗口状态

窗口状态指应用窗口的显示模式，如全屏、分屏、悬浮窗、最大化、最小化等。通过 `window.WindowStatusType` 枚举表示。

| WindowStatusType | 值 | 说明 |
|-----------------|---|------|
| FULL_SCREEN | 1 | 全屏模式 |
| MAXIMIZE | 2 | 最大化模式（2in1 设备有 dock 栏和状态栏） |
| MINIMIZE | 3 | 最小化模式 |
| FLOATING | 4 | 自由悬浮窗口模式 |
| SPLIT_SCREEN | 5 | 分屏模式 |

#### 窗口状态何时变化

| 触发场景 | 说明 |
|---------|------|
| 进入/退出分屏 | 全屏 ↔ 分屏模式 |
| 切换悬浮窗 | 全屏/分屏 ↔ 悬浮窗模式 |
| 最大化/还原 | 自由窗口最大化或还原 |
| 最小化/还原 | 窗口最小化或从任务管理器恢复 |

#### 关键 API

| API | 起始版本 | 说明 |
|-----|---------|------|
| `canIUse('SystemCapability.Window.SessionManager')` | — | 能力检查，窗口状态监听需要此 SystemCapability |
| `windowClass.on('windowStatusChange')` | API 11 | 监听窗口状态变化，回调参数为 `window.WindowStatusType`，**不保证**回调时窗口 Rect 已更新 |
| `windowClass.on('windowStatusDidChange')` | API 20 | 监听窗口状态变化，回调在窗口 Rect **已完成更新**后触发 |
| `windowClass.off('windowStatusChange')` | API 11 | 取消窗口状态变化监听 |
| `windowClass.off('windowStatusDidChange')` | API 20 | 取消窗口状态变化监听 |
| `windowClass.getWindowStatus()` | API 12 | 同步查询当前窗口状态 |

#### windowStatusChange 与 windowStatusDidChange 的区别

| 对比项 | windowStatusChange (API 11) | windowStatusDidChange (API 20) |
|-------|---------------------------|-------------------------------|
| 回调时机 | 状态变化时立即回调 | 状态变化**且 Rect 属性更新完成后**回调 |
| 获取新尺寸 | 不保证能立即获取变化后的窗口大小 | 可立即获取变化后的窗口大小和位置 |
| 适用场景 | 只需感知状态类型变化（如切换布局策略） | 需要在回调中立即读取新窗口尺寸 |

> 应用若需要在收到窗口状态变化通知时能够立即获取到变化后的窗口大小、位置，建议使用 `on('windowStatusDidChange')`。

### EntryAbility 示例

```typescript
import { window } from '@kit.ArkUI';

export default class EntryAbility extends UIAbility {
  private mainWindow: window.Window | null = null;

  onWindowStageCreate(windowStage: window.WindowStage): void {
    this.mainWindow = windowStage.getMainWindowSync();

    windowStage.loadContent('pages/Index', (err) => {
      if (err.code) { return; }

      // 1. 能力检查：窗口状态监听需要 SystemCapability.Window.SessionManager
      if (canIUse('SystemCapability.Window.SessionManager')) {
        // 2. 监听窗口状态变化（API 11+）
        this.mainWindow!.on('windowStatusChange', (status: window.WindowStatusType) => {
          // 将当前窗口状态写入 AppStorage，供页面消费
          AppStorage.setOrCreate('windowStatus', status);
        });

        // 3. 如需在回调中同步获取更新后的窗口尺寸，使用 windowStatusDidChange（API 20+）
        // this.mainWindow!.on('windowStatusDidChange', (status: window.WindowStatusType) => {
        //   const rect = this.mainWindow!.getWindowProperties().windowRect;
        //   AppStorage.setOrCreate('windowWidth', px2vp(rect.width));
        //   AppStorage.setOrCreate('windowHeight', px2vp(rect.height));
        //   AppStorage.setOrCreate('windowStatus', status);
        // });
      }
    });
  }

  onWindowStageDestroy(): void {
    if (this.mainWindow) {
      this.mainWindow.off('windowStatusChange');
      // this.mainWindow.off('windowStatusDidChange');
      this.mainWindow = null;
    }
  }
}
```

### 页面组件消费示例

```typescript
@Entry
@Component
struct Index {
  @StorageProp('windowStatus') windowStatus: number = window.WindowStatusType.FULL_SCREEN

  build() {
    Column() {
      // 根据窗口状态切换布局策略
      if (this.windowStatus === window.WindowStatusType.SPLIT_SCREEN) {
        // 分屏模式：紧凑布局
        Text('分屏模式')
      } else if (this.windowStatus === window.WindowStatusType.FLOATING) {
        // 悬浮窗模式：精简布局
        Text('悬浮窗模式')
      }
    }
    .width('100%')
    .height('100%')
  }
}
```

### 要点速查

| 要点 | 说明 |
|------|------|
| 注册时机 | 在 `loadContent` 回调内注册，与 `windowSizeChange` 一致 |
| 能力检查 | 使用前必须调用 `canIUse('SystemCapability.Window.SessionManager')` 检查设备是否支持 |
| 读取当前状态 | `windowClass.getWindowStatus()` 同步获取（API 12+） |
| 防泄漏 | `onWindowStageDestroy` 中 `off('windowStatusChange')` / `off('windowStatusDidChange')` |
| 回调选择 | 仅需感知状态类型用 `windowStatusChange`；需同时获取更新后尺寸用 `windowStatusDidChange` |
| 共享方式 | `AppStorage.setOrCreate('windowStatus', status)` + `@StorageProp('windowStatus')` |

---

## 注意事项

- 组件销毁时必须取消监听（`off('windowSizeChange')`），否则会内存泄漏
- 窗口尺寸变化会频繁触发，建议对回调做防抖处理（100-200ms）
- 优先通过 AppStorage 共享尺寸状态，避免每个组件都独立监听窗口
- 尺寸变化回调中只更新 UI 相关状态，不要执行网络请求或复杂计算
- `init()` 必须在 `loadContent` 回调中调用，此时窗口已完成布局，`getWindowProperties()` 返回正确尺寸；在 loadContent 之前调用会拿到 0*0
- 获取窗口实例优先使用 `windowStage.getMainWindowSync()`，而非 `window.getLastWindow()`
- 窗口变化事件类型参考：`windowSizeChange`（尺寸）、`windowStatusChange`（状态）、`avoidAreaChange`（避让区域）、`displayIdChange`（显示屏切换）
- `windowStatusChange` 回调不保证窗口 Rect 已更新，如需在回调中读取新尺寸，应使用 `windowStatusDidChange`（API 20+）
