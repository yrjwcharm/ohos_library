# 场景开发案例集

## 目录

1. [场景1：列表页滚动沉浸浏览](#场景1列表页滚动沉浸浏览)
2. [场景2：底部导航栏避让](#场景2底部导航栏避让)
3. [场景3：短视频沉浸](#场景3短视频沉浸)
4. [场景4：挖孔区适配](#场景4挖孔区适配)
5. [场景5：状态栏适配](#场景5状态栏适配)
6. [场景6：键盘易操作](#场景6键盘易操作)

---

## 场景1：列表页滚动沉浸浏览

**场景描述：**
- 列表类页面（商品列表、信息流）
- 上滑浏览内容时逐渐隐藏顶部标题栏和底部导航栏，下滑时恢复
- 多设备断点适配：紧凑型（xs/sm/md）使用底部 TabBar 并支持滚动隐藏，宽屏型（lg/xl/xxl）使用侧边导航栏且不隐藏

**多设备体验标准：**

为方便浏览和获取信息，可采用滑动或点击的方式，将顶部和底部的标题栏、导航栏等空间隐藏，以便提供更大的信息显示量。

**解决方案：** 使用 **setWindowLayoutFullScreen 开启全屏** + **getWindowAvoidArea 获取避让区高度** + **Stack + Tabs(barHeight=0) + 浮层 TabBar 骨架** + **onScrollFrameBegin 累计偏移线性比例驱动隐藏/恢复** + **onBreakpointChange 断点切换重置状态**

### 步骤 1：EntryAbility 开启全屏布局

```ts
const mainWindow = windowStage.getMainWindowSync();
mainWindow.setWindowLayoutFullScreen(true);
```

### 步骤 2：监听避让区，获取状态栏和导航条高度

```ts
private updateAvoidArea(): void {
  const systemArea = this.mainWindow.getWindowAvoidArea(AvoidAreaType.TYPE_SYSTEM);
  this.topAvoidHeight = px2vp(systemArea.topRect.height);
  const navArea = this.mainWindow.getWindowAvoidArea(AvoidAreaType.TYPE_NAVIGATION_INDICATOR);
  this.bottomAvoidHeight = px2vp(navArea.bottomRect.height);
}
```

根容器通过 `padding({ top: this.topAvoidHeight })` 避让状态栏，Scroll 通过 `.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.BOTTOM])` 延伸到导航条区域。

### 步骤 3：布局骨架——Stack 叠加 Tabs + 浮层 TabBar

```
Column（paddingTop = 状态栏高度）
└── Stack
    ├── Tabs（barHeight=0，宽屏时 paddingLeft=80）
    │   └── TabContent → CustomTitleBar + Scroll > GridRow
    └── TabBar（紧凑型底部水平 / 宽屏左侧垂直）
```

### 步骤 4：浮层 TabBar 底部导航条避让

浮层 TabBar 位于 Stack 中，不参与主内容流布局，因此不会自动避开系统导航条。使用 `margin({ bottom: bottomAvoidHeight })` 将 TabBar 抬高到导航条上方。

关键点：
- `bottomAvoidHeight` 通过步骤 2 的 `TYPE_NAVIGATION_INDICATOR` 动态获取，不同设备导航条高度不同
- 浮层 TabBar 在 Stack 中使用 `hitTestBehavior(HitTestMode.Transparent)` 的外层容器包裹，确保不阻挡底层滚动
- `bottomBarMarginBottom`（步骤 5）是纯粹的视觉间距（如 8vp），与 `bottomAvoidHeight`（系统导航条高度）是两个独立概念，需要同时处理

```ts
Column() {
  Row() {
    // Tab 项...
  }
  .width('100%')
  .height(this.bottomBarHeight)
  .opacity(this.bottomBarOpacity)
  .backgroundColor('#FFFFFF')
  .margin({ bottom: this.bottomAvoidHeight })
}
.width('100%')
.height('100%')
.justifyContent(FlexAlign.End)
.hitTestBehavior(HitTestMode.Transparent)
```

### 步骤 5：核心滚动算法——onScrollFrameBegin + 线性比例

定义与标题栏/TabBar 关联的状态变量，通过累计滚动偏移计算 0~1 的 ratio，线性驱动所有属性。

> 注意：`bottomBarMarginBottom` 是纯粹的视觉间距，与导航条高度 `bottomAvoidHeight` 无关，两者独立处理。

```ts
@State titleBarHeight: number = 56;
@State titleBarOpacity: number = 1;
@State bottomBarHeight: number = 56;
@State bottomBarOpacity: number = 1;
@State bottomBarMarginBottom: number = 8;
private accumulatedOffset: number = 0;
const HIDE_THRESHOLD = 100; // vp

.onScrollFrameBegin((offset: number, state: ScrollState) => {
  if (!this.isCompactBp()) return { offsetRemain: offset }; // 仅紧凑型生效
  this.accumulatedOffset = Math.max(0, Math.min(HIDE_THRESHOLD, this.accumulatedOffset + offset));
  const ratio = this.accumulatedOffset / HIDE_THRESHOLD;
  this.titleBarHeight = 56 * (1 - ratio);
  this.titleBarOpacity = 1 - ratio;
  this.bottomBarHeight  = 56 * (1 - ratio);
  this.bottomBarOpacity = 1 - ratio;
  this.bottomBarMarginBottom = 8 * (1 - ratio);
  return { offsetRemain: offset };
})
```

效果：上滑 0~100vp 线性渐隐，超过 100vp 完全隐藏，下滑线性恢复。

### 步骤 6：断点切换时重置

从紧凑型切到宽屏时恢复初始值：

```ts
.onBreakpointChange((breakpoint: string) => {
  const wasCompact = this.isCompactBp();
  this.currentBp = breakpoint;
  if (wasCompact && !this.isCompactBp()) {
    this.accumulatedOffset = 0;
    this.titleBarHeight = 56; this.titleBarOpacity = 1;
    this.bottomBarHeight = 56; this.bottomBarOpacity = 1;
    this.bottomBarMarginBottom = 8;
  }
})
```

---

## 场景2：底部导航栏避让

**场景描述：**
- 手机、折叠屏、平板等设备屏幕底部有系统导航条，应用需对底部导航条进行适配
- 底部固定空间（TabBar、操作栏、悬浮按钮）需要向上抬高，避免与导航条遮挡，同时背景色延伸到导航条底部实现沉浸效果
- 可滚动内容需要能延伸显示在导航条下方，滚动到底部时最后一项内容不被导航条遮挡
- 弹出框、半模态等控件需要向上避让导航条，避免交互误触
- 沉浸式场景（全屏播放视频、图片查看）导航条可自动隐藏，支持从底部上滑恢复

**多设备体验标准：**

手机、折叠屏、平板等设备屏幕底部有导航条，应用需对底部导航条进行适配。

- 应用内的底部固定控件、输入键盘、应用底部的悬浮按钮等均需要进行向上抬高，避免和导航条互相遮挡，也要避免导航条底部背景色与应用内底部背景色不融合，需要为导航条提供沉浸的背景效果。
- 应用内的可滚动内容，需要能显示在导航条下方。当滚动到最底部时，要避免导航条遮挡导致最底部功能不可用。
- 应用内的弹出框、半模态等控件，需要向上避让导航条，避免交互误触。
- 沉浸式场景，例如游戏、全屏播放视频，导航条可自动隐藏，支持从底部上滑恢复显示导航条。

**解决方案：** 使用 **setWindowLayoutFullScreen 开启全屏** + **getMainWindow 回调内获取避让区高度 + avoidAreaChange 监听变化** + **AppStorage + @StorageProp 全局响应** + **外层 Column 承载 padding 避免挤压内容** + **TabBar 高度扩展 + padding 避让实现背景延伸** + **List 底部 padding 确保最后一项不被遮挡** + **半模态底部 margin 避让导航条** + **setSpecificSystemBarEnabled 动态隐藏/恢复导航条**

### 步骤 1：EntryAbility 开启全屏布局并获取避让区

```ts
onWindowStageCreate(windowStage: window.WindowStage): void {
  windowStage.getMainWindow((err, mainWindow) => {
    if (err.code) { return; }

    mainWindow.setWindowLayoutFullScreen(true);

    // 获取初始避让区高度
    let systemAvoidArea = mainWindow.getWindowAvoidArea(window.AvoidAreaType.TYPE_SYSTEM);
    AppStorage.setOrCreate('topAvoidHeight', systemAvoidArea.topRect.height);

    let navAvoidArea = mainWindow.getWindowAvoidArea(window.AvoidAreaType.TYPE_NAVIGATION_INDICATOR);
    AppStorage.setOrCreate('bottomAvoidHeight', navAvoidArea.bottomRect.height);
    AppStorage.setOrCreate('isFullScreen', false);

    // 监听避让区变化（折叠/旋转时自动更新）
    mainWindow.on('avoidAreaChange', (data) => {
      if (data.type === window.AvoidAreaType.TYPE_SYSTEM) {
        AppStorage.setOrCreate('topAvoidHeight', data.area.topRect.height);
      } else if (data.type === window.AvoidAreaType.TYPE_NAVIGATION_INDICATOR) {
        AppStorage.setOrCreate('bottomAvoidHeight', data.area.bottomRect.height);
      }
    });

    // loadContent 在避让区初始化之后调用，确保页面 aboutToAppear 时 AppStorage 已就绪
    windowStage.loadContent('pages/Index', (err) => {
      if (err.code) { return; }
      mainWindow.getUIContext().setKeyboardAvoidMode(KeyboardAvoidMode.RESIZE);
    });
  });
}
```

关键点：
- `getMainWindow` 回调内设置全屏、获取避让区、注册监听，最后才 `loadContent`，确保页面加载时 AppStorage 已有值
- `bottomAvoidHeight` 存储原始 px 值，页面中通过 `px2vp()` 转换
- `KeyboardAvoidMode.RESIZE` 使键盘弹出时压缩页面而非上抬

### 步骤 2：页面整体布局——Stack 叠加模式

```ts
build() {
  Stack({ alignContent: Alignment.Bottom }) {
    // 第一层：主内容区
    Column() {
      this.TitleBar()
      this.TabHeader()
      this.NewsList()
    }
    .width('100%')
    .height('100%')

    // 第二层：悬浮按钮
    this.FloatingButtons()
    // 第三层：底部 TabBar
    this.BottomTabBar()

    // 第四层：半模态弹窗
    if (this.showSheet) {
      this.HalfModalSheet()
    }
  }
  .width('100%')
  .height('100%')
  .backgroundColor('#F5F5F5')
}
```

关键点：Stack 多层叠加，TabBar 和悬浮按钮浮在内容之上，不占用 Column 布局空间。

### 步骤 3：顶部标题栏——外层 Column 承载 padding 避免挤压

> **关键：padding 必须加在外层容器上，不能直接加在固定高度的 Row 上，否则 padding 会挤压内容区导致文字截断。**

```ts
@Builder
TitleBar() {
  Column() {
    Row() {
     // 标题栏内容
    }
    .width('100%')
    .height(52)                                           // 固定内容高度，不受 padding 影响
    .padding({ left: 16, right: 16 })
  }
  .width('100%')
  .padding({ top: px2vp(this.topAvoidHeight) })           // 外层 Column 承载避让高度
  .backgroundColor(Color.White)                           // 白色背景延伸到状态栏后方
}
```

关键点：
- 外层 `Column` 承载 `padding({ top })`，撑大总高度，不挤压内层 Row 的 52px 内容区
- 白色背景自然延伸到状态栏区域，实现沉浸一体化

### 步骤 4：底部 TabBar——高度扩展 + padding 避让实现背景沉浸

```ts
@Builder
BottomTabBar() {
  Column() {
    Row() {
      // Tab 内容...
    }
    .width('100%')
    .height(52)
  }
  .width('100%')
  .height(52 + px2vp(this.bottomAvoidHeight))             // 总高度 = 内容高度 + 导航条高度
  .padding({ bottom: px2vp(this.bottomAvoidHeight) })      // 内容上移避让导航条
  .backgroundColor(Color.White)                            // 白色背景延伸到导航条底部
}
```

关键点：
- `height(52 + px2vp(bottomAvoidHeight))`：总高度包含导航条区域，背景色自然延伸
- `padding({ bottom: px2vp(bottomAvoidHeight) })`：将 Tab 图标/文字上移，不被导航条遮挡
- 其他底部固定操作栏同理（商品详情页底部按钮栏、购物车结算栏等）

### 步骤 5：悬浮按钮抬高避让

```ts
@Builder
FloatingButtons() {
  Column({ space: 12 }) {
    // 按钮内容...
  }
  .width('100%')
  .alignItems(HorizontalAlign.End)                         // 按钮靠右
  .padding({ right: 16, bottom: 16 + 56 + px2vp(this.bottomAvoidHeight) })
}
```

关键点：`bottom` 偏移 = 间距 + TabBar 高度 + 导航条高度，确保按钮在 TabBar 之上且不被导航条遮挡。`.width('100%')` + `alignItems(HorizontalAlign.End)` 使按钮靠右显示。

### 步骤 6：可滚动内容——底部 padding 确保最后一项不被遮挡

```ts
@Builder
NewsList() {
  List({ space: 8 }) {
    ForEach(this.newsList, (item: NewsItem, index: number) => {
      ListItem() {
        // 列表项内容...
      }
    }, (item: NewsItem, index: number) => `${index}`)
  }
  .width('100%')
  .layoutWeight(1)
  .padding({
    left: 12,
    right: 12,
    top: 8,
    bottom: 52 + px2vp(this.bottomAvoidHeight) + 8        // TabBar高度 + 导航条高度 + 间距
  })
  .scrollBar(BarState.Auto)
}
```

关键点：
- List 用 `layoutWeight(1)` 占满剩余空间，内容可延伸到导航条下方
- `padding({ bottom: 52 + px2vp(bottomAvoidHeight) + 8 })`：滚动到底时最后一条内容不被浮在底部的 TabBar 遮挡

### 步骤 7：半模态弹窗避让导航条

```ts
@Builder
HalfModalSheet() {
  Column() {
    // 面板标题和选项内容...

    Blank()

    Button('确认操作')
      .width('90%')
      .height(44)
      .borderRadius(22)
      .margin({ bottom: 16 + px2vp(this.bottomAvoidHeight) })  // 底部按钮避让导航条
  }
  .width('100%')
  .height('60%')
  .backgroundColor(Color.White)
  .borderRadius({ topLeft: 16, topRight: 16 })
  .shadow({ radius: 20, color: '#33000000', offsetY: -4 })
  .padding({ top: 16 })
}
```

关键点：半模态底部操作按钮的 `margin({ bottom: 16 + px2vp(bottomAvoidHeight) })` 确保不被导航条遮挡。

### 步骤 8：沉浸式全屏——动态隐藏/恢复导航条

```ts
@StorageProp('isFullScreen') @Watch('onFullScreenChange') isFullScreen: boolean = false
private mainWindow: window.Window | null = null

aboutToAppear(): void {
  window.getLastWindow(getContext(this) as common.UIAbilityContext).then((win: window.Window) => {
    this.mainWindow = win
  })
}

private onFullScreenChange(): void {
  if (!this.mainWindow) return
  if (this.isFullScreen) {
    this.mainWindow.setSpecificSystemBarEnabled('navigationIndicator', false)  // 隐藏导航条
  } else {
    this.mainWindow.setSpecificSystemBarEnabled('navigationIndicator', true)   // 恢复导航条
  }
}
```

关键点：
- `setSpecificSystemBarEnabled('navigationIndicator', false/true)` 控制导航条的显示与隐藏
- `@Watch('onFullScreenChange')` 监听 `isFullScreen` 变化，自动触发隐藏/恢复
- 隐藏导航条后系统自动支持从底部上滑手势恢复导航条显示

---

## 场景3：短视频沉浸

**场景描述：**
- 短视频类应用，视频画面铺满全屏，延伸到状态栏和导航条后方实现沉浸
- 浮层底部TabBar和顶部标题栏叠加在视频上，交互区域避让导航条防止误触
- 视频保持原始宽高比居中显示（FIT模式），黑边区域由Stack背景色填充

**多设备体验标准：**

针对短视频场景，在确保核心信息完整的情况下，尽量减少边距缩进。

**解决方案：** 使用 **setWindowLayoutFullScreen 开启全屏** + **getWindowAvoidArea + avoidAreaChange 获取并监听避让区** + **AppStorage + @StorageProp 全局响应避让高度** + **XComponent + AVPlayer + VIDEO_SCALE_TYPE_FIT 保持原始比例 + 手动宽高比计算居中偏移** + **Swiper 垂直滑动切换 + ForEach** + **Stack 叠加布局（视频层 + TabBar浮层 + 顶部标题栏浮层）** 

### 前提条件：配置网络权限

短视频应用通常需要播放网络视频资源，必须在 `module.json5` 中声明网络权限：

```json
{
  "module": {
    "name": "entry",
    "type": "entry",
    ...
    "requestPermissions": [
      { "name": "ohos.permission.INTERNET" }
    ]
  }
}
```

> **关键：** 如果视频源包含网络URL（http/https协议），必须配置 `ohos.permission.INTERNET` 权限，否则网络视频无法加载播放。

### 步骤 1：EntryAbility 开启全屏 + 避让区监听

在 `EntryAbility.ets` 的 `onWindowStageCreate` 中，先通过 `loadContent` 加载页面内容，然后在回调中获取主窗口并开启全屏、初始化避让区信息。

```ts
import { AbilityConstant, ConfigurationConstant, UIAbility, Want } from '@kit.AbilityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { window } from '@kit.ArkUI';

export default class EntryAbility extends UIAbility {
  private mainWindow: window.Window | null = null;

  onWindowStageCreate(windowStage: window.WindowStage): void {
    windowStage.loadContent('pages/Index', (err) => {
      if (err.code) { return; }

      this.mainWindow = windowStage.getMainWindowSync();
      this.mainWindow.setWindowLayoutFullScreen(true);

      const uiCtx = this.mainWindow.getUIContext();
      AppStorage.setOrCreate('currentBp', uiCtx.getWindowWidthBreakpoint());
      const initRect = this.mainWindow.getWindowProperties().windowRect;
      AppStorage.setOrCreate('windowSize', {
        width: uiCtx.px2vp(initRect.width),
        height: uiCtx.px2vp(initRect.height)
      });
      AppStorage.setOrCreate('navHeight',
        uiCtx.px2vp(this.mainWindow.getWindowAvoidArea(window.AvoidAreaType.TYPE_NAVIGATION_INDICATOR).bottomRect.height));
      AppStorage.setOrCreate('sysHeight',
        uiCtx.px2vp(this.mainWindow.getWindowAvoidArea(window.AvoidAreaType.TYPE_SYSTEM).topRect.height));

      this.mainWindow.on('windowSizeChange', (size: window.Size) => {
        AppStorage.setOrCreate('currentBp', uiCtx.getWindowWidthBreakpoint());
        AppStorage.setOrCreate('windowSize', {
          width: uiCtx.px2vp(size.width),
          height: uiCtx.px2vp(size.height)
        });
      });

      this.mainWindow.on('avoidAreaChange', (data) => {
        if (data.type === window.AvoidAreaType.TYPE_SYSTEM) {
          AppStorage.setOrCreate('sysHeight', uiCtx.px2vp(data.area.topRect.height));
        } else if (data.type === window.AvoidAreaType.TYPE_NAVIGATION_INDICATOR) {
          AppStorage.setOrCreate('navHeight', uiCtx.px2vp(data.area.bottomRect.height));
        }
      });
    });
  }

  onWindowStageDestroy(): void {
    if (this.mainWindow) {
      this.mainWindow.off('windowSizeChange');
      this.mainWindow.off('avoidAreaChange');
      this.mainWindow = null;
    }
  }
}
```

关键点：
- `loadContent` 回调内设置全屏，确保页面内容已加载后再操作窗口
- 四项信息存入 `AppStorage`：`currentBp`（断点）、`windowSize`（窗口尺寸vp）、`navHeight`（导航条高度vp）、`sysHeight`（状态栏高度vp）
- `px2vp()` 转换在 `UIContext` 上调用，确保单位正确
- `onWindowStageDestroy` 中注销监听，防止内存泄漏

### 步骤 2：主页面布局——Stack 叠加 Swiper + 浮层 TabBar + 顶部标题栏

使用 `Stack` 作为根容器，三层叠加：视频Swiper（底层） → TabBar浮层（中间） → 顶部标题栏浮层（顶层）。通过 `WidthBreakpoint` 断点判断设备类型，切换底部水平TabBar与左侧垂直TabBar。

```
状态变量：
  @StorageProp('currentBp') @Watch('onBreakpointChange') currentBp
  @StorageProp('navHeight') navHeight                    // 导航条高度
  @StorageProp('sysHeight') sysHeight                    // 状态栏高度
  @State isWideScreen: boolean                           // lg/xl 断点

onBreakpointChange():
  isWideScreen = (currentBp == WIDTH_LG || WIDTH_XL)

build():
  Stack() {
    VideoSwiper()                                        // 底层：视频 Swiper
    if (isWideScreen) SideTabBar() else BottomTabBar()   // 中间层：TabBar 浮层
    TopOverlay()                                         // 顶层：标题栏浮层
  }
```

**VideoSwiper**：Swiper + ForEach + VideoPlayer，配置 `.vertical(true).loop(true).indicator(false)`，`.onChange` 更新当前视频索引。

**TopOverlay**——顶部标题栏避让状态栏：
```
Row() { /* 标题文本 + 搜索按钮 */ }
  .width('100%')
  .padding({ left: isWideScreen ? 96 : 16, top: sysHeight })  // 避让状态栏；宽屏左侧避开 SideTabBar
  .position({ x: 0, y: 0 })                                    // 固定在顶部
```

**BottomTabBar**——底部水平 TabBar 避让导航条：
```
Column() {
  Row() { /* ForEach TAB_ITEMS → Text，选中态样式 */ }
    .width('100%')
    .height(52)
    .justifyContent(FlexAlign.SpaceEvenly)
    .backgroundColor('#33000000')
}
.width('100%')
.height('100%')                                              // ⚠️ 必须设 height('100%')，否则 justifyContent(FlexAlign.End) 无法将 Row 推到底部
.justifyContent(FlexAlign.End)                               // 将 Row 推到底部
.hitTestBehavior(HitTestMode.Transparent)                    // 不阻挡 Swiper 滑动手势
.margin({ bottom: navHeight })                               // 避让导航条
```

**SideTabBar**——左侧垂直 TabBar 避让状态栏：
```
Column() { /* ForEach TAB_ITEMS → Text，选中态样式 */ }
  .width(80)
  .height('100%')
  .justifyContent(FlexAlign.Center)
  .backgroundColor('#33000000')
  .position({ x: 0, y: 0 })                                 // 固定在左侧
  .padding({ top: sysHeight })                               // 避让状态栏（平板通常无导航条，无需底部避让）
```

关键点：
- **Stack 三层叠加**：视频Swiper（底层，占满全屏） → TabBar浮层（中间） → 顶部标题栏（顶层），TabBar不占用Swiper布局空间
- **断点驱动布局切换**：`isWideScreen`（lg/xl）→ 左侧垂直 `SideTabBar`（`padding({ top: sysHeight })` 避让状态栏），否则 → 底部水平 `BottomTabBar`（`margin({ bottom: navHeight })` 避让导航条）
- **BottomTabBar 避让细节**：外层 `Column` 设 `.height('100%')` + `.justifyContent(FlexAlign.End)` 将 Row 推到底部；`.hitTestBehavior(HitTestMode.Transparent)` 确保不阻挡 Swiper 滑动手势；`.margin({ bottom: navHeight })` 抬高到导航条上方
- **SideTabBar 避让细节**：`.position({ x: 0, y: 0 })` 固定在左侧；`.padding({ top: sysHeight })` 避让状态栏；平板设备通常无导航条，无需底部避让
- **TopOverlay**：`.position({ x: 0, y: 0 })` 固定在顶部；`.padding({ top: sysHeight })` 避让状态栏；宽屏时 `left: 96` 避开侧边 TabBar
- **Swiper**：`.vertical(true)` 支持上下滑动切换视频；`.loop(true)` 循环播放；`.onChange` 更新当前视频索引

### 步骤 3：VideoPlayer——XComponent + AVPlayer 播放器组件

独立的播放器组件，使用 `XComponent` 提供渲染_surface，`AVPlayer` 控制播放生命周期。通过手动宽高比计算实现视频居中显示。

```
@Component export struct VideoPlayer {
  // Props
  @Prop @Watch('onIndexChange') currentIndex: number     // Swiper 当前页索引
  @Prop index: number                                    // 本项索引
  @Prop source: string                                   // 视频源（rawfile 文件名或网络 URL）
  @StorageProp('windowSize') windowSize                  // 窗口尺寸，用于 layoutVideo 计算

  // 布局状态（由 layoutVideo() 计算）
  @State videoWidth / videoHeight: Length                // XComponent 尺寸
  @State videoX / videoY: number                         // XComponent 偏移

  // 播放状态
  @State isPlaying / showPlayIcon: boolean
  private player: AVPlayer | null
  private originalWidth / originalHeight: number         // 视频原始分辨率
}

build():
  Stack() {
    XComponent(SURFACE, controller)
      .width(videoWidth).height(videoHeight)
      .position({ x: videoX, y: videoY })               // 由 layoutVideo() 动态计算
      .onLoad → initPlayer()

    if (showPlayIcon) {
      Image(play_icon).onClick → player.play()
    }
  }
  .width('100%').height('100%')
  .backgroundColor(Color.Black)                          // 黑边填充色
  .onClick → 切换 isPlaying / showPlayIcon

initPlayer():
  media.createAVPlayer().then(player => {
    player.on('stateChange'):
      initialized → player.surfaceId = xCtrl.surfaceId; player.prepare()
      prepared → player.videoScaleType = VIDEO_SCALE_TYPE_FIT; 条件播放
      completed → player.seek(0); player.play()         // 循环播放

    player.on('videoSizeChange', (w, h)):
      originalWidth = w; originalHeight = h; layoutVideo()

    // 视频源加载：本地 rawfile 优先，网络 URL 降级
    try { player.fdSrc = getRawFdSync(source) }
    catch { if (source.startsWith('http')) player.url = source }
  })

onIndexChange():
  currentIndex == index → player.play(); layoutVideo()
  否则 → player.pause()

aboutToDisappear():
  player?.release()
```

关键点：
- **XComponent + AVPlayer**：XComponent 提供 SURFACE 类型渲染_surface，`onLoad` 回调中初始化播放器
- **状态机驱动播放**：`stateChange` 回调处理 `initialized` → `prepare`、`prepared` → `play`、`completed` → `seek(0)` 循环播放
- **VIDEO_SCALE_TYPE_FIT**：保持原始宽高比，不裁切不拉伸，黑边由 Stack 黑色背景填充
- **播放/暂停交互**：点击 Stack 切换播放/暂停，暂停时显示系统图标 `sys.symbol.play_fill`
- **onIndexChange**：Swiper 切换时当前项播放+重新布局，非当前项暂停
- **视频源加载**：优先尝试 `getRawFdSync` 加载本地 rawfile，失败后降级为 `player.url` 加载网络地址
- **aboutToDisappear**：释放播放器资源，防止内存泄漏

### 步骤 4：手动宽高比计算——视频居中偏移

替代 `AdaptiveImmersion` 的手动布局算法。在 `videoSizeChange` 和断点/窗口变化时，根据视频原始宽高比与屏幕宽高比的关系，计算 XComponent 的尺寸和偏移位置，使视频居中显示。

```ts
private layoutVideo(): void {
  if (this.originalWidth === 0 || this.originalHeight === 0) {
    return;
  }
  const screenW = this.windowSize.width;
  const screenH = this.windowSize.height;
  if (screenW === 0 || screenH === 0) {
    this.videoWidth = '100%';
    this.videoHeight = '100%';
    this.videoX = 0;
    this.videoY = 0;
    return;
  }
  const videoRatio = this.originalWidth / this.originalHeight;
  const screenRatio = screenW / screenH;
  if (videoRatio > screenRatio) {
    // 视频更宽：左右撑满，上下居中（上下黑边）
    this.videoWidth = screenW;
    this.videoHeight = screenW / videoRatio;
    this.videoX = 0;
    this.videoY = (screenH - this.videoHeight) / 2;
  } else {
    // 视频更高：上下撑满，左右居中（左右黑边）
    this.videoHeight = screenH;
    this.videoWidth = screenH * videoRatio;
    this.videoX = (screenW - this.videoWidth) / 2;
    this.videoY = 0;
  }
}
```

关键点：
- **居中偏移计算**：比较 `videoRatio`（视频宽高比）与 `screenRatio`（屏幕宽高比），选择撑满方向，另一个方向居中偏移
- **视频更宽（如16:9在9:16屏幕上）**：宽度撑满屏幕，高度按比例缩放，Y轴居中偏移（上下黑边）
- **视频更高（如9:16在16:9屏幕上）**：高度撑满屏幕，宽度按比例缩放，X轴居中偏移（左右黑边）
- **窗口尺寸响应**：`windowSize` 通过 `@StorageProp` 注入，旋转/折叠/窗口变化时自动触发重算
- **降级兜底**：窗口尺寸为 0 时（初始化阶段），XComponent 使用 `'100%'` 占满

---

## 场景4：挖孔区适配

**场景描述：**
- 竖屏挖孔在顶部，横屏挖孔在左/右侧边，需动态切换避让边
- 固定交互元素（标题栏、搜索框、Tab栏、底部导航栏）需避开挖孔区且背景延伸不留间隙
- 可滚动内容（列表/卡片）和悬浮控件（弹窗/侧边栏）无需避让

**多设备体验标准：**

- 界面布局需要适配摄像头的挖孔区域，若重要信息或交互操作 (例如底部页签/顶部页签、工具栏、标题栏、搜索框、输入框、悬浮按钮、横幅通知等) 和挖孔区之间有遮挡，则需要局部避开挖孔区显示。

- 若重要信息或交互操作和挖孔区无遮挡，则无需避开挖孔区显示；悬浮类控件或功能 (例如弹出框、侧边栏等)，无需避开挖孔区显示；可以上下滚动的内容，例如列表、卡片等无需避开挖孔区显示。

- 若应用支持横竖屏旋转，则横竖屏的界面布局均需满足以上挖孔适配要求。

**解决方案：** **setWindowLayoutFullScreen + setWindowSystemBarEnable([])** + **module.json5 配置 orientation 允许旋转** + **getWindowAvoidArea(TYPE_CUTOUT) 同步获取四边挖孔（存原始 px，页面 this.getUIContext().px2vp() 转换）** + **avoidAreaChange 旋转时自动更新** + **各固定组件 padding 避让 + expandSafeArea 背景沉浸**

### 步骤 1：EntryAbility 全屏 + 隐藏系统栏 + 开启旋转

```ts
windowStage.getMainWindow((err, mainWindow) => {
  mainWindow.setWindowLayoutFullScreen(true);
  mainWindow.setWindowSystemBarEnable([]); // 隐藏状态栏和导航栏
  mainWindow.setPreferredOrientation(window.Orientation.AUTO_ROTATION); // 支持自动旋转
});
```

> **⚠️ 关键：仅代码中 `setPreferredOrientation` 不够，必须在 `module.json5` 中同步声明 `orientation` 配置，否则应用不会响应设备旋转。**

在 `entry/src/main/module.json5` 的 `abilities` 中添加：

```json
{
  "name": "EntryAbility",
  "orientation": "auto_rotation",
  ...
}
```

> **注意：`AUTO_ROTATION_RESTRICTED` 在模拟器或某些设备上可能不生效（系统会限制旋转方向），建议使用 `AUTO_ROTATION` + `"auto_rotation"` 确保所有设备均支持旋转。**

### 步骤 2：getWindowAvoidArea(TYPE_CUTOUT) 同步获取四边挖孔

> **⚠️ 关键：`getWindowAvoidArea` 返回的是原始 px 值，不能在 `loadContent` 之前调用 `getUIContext().px2vp()`（此时无 UI 上下文会崩溃）。可以存储原始 px 值到 AppStorage，在页面中用 `this.getUIContext().px2vp()` 转换。**

```ts
private updateCutout(): void {
  if (!this.windowClass) return;
  const area = this.windowClass.getWindowAvoidArea(window.AvoidAreaType.TYPE_CUTOUT)
  let top = 0, left = 0, right = 0, bottom = 0
  if (area.topRect.height > 0)    top = area.topRect.height + area.topRect.top
  if (area.leftRect.width > 0)    left = area.leftRect.left + area.leftRect.width
  if (area.rightRect.width > 0)   right = area.screenWidth - area.rightRect.left
  if (area.bottomRect.height > 0) bottom = area.screenHeight - area.bottomRect.top
  // 存储原始 px 值，不调用 px2vp
  AppStorage.setOrCreate('cutoutTop', top)
  AppStorage.setOrCreate('cutoutLeft', left)
  AppStorage.setOrCreate('cutoutRight', right)
  AppStorage.setOrCreate('cutoutBottom', bottom)
}
```

关键点：
- 同步返回，旋转时系统自动映射到对应边（竖屏 topRect → 横屏 leftRect/rightRect），无需手动判断方向
- `avoidAreaChange` 旋转时自动触发
- **存储原始 px 值**，页面中用 `this.getUIContext().px2vp()` 转换为 vp 后使用

### 步骤 3：页面通过 @StorageProp 读取挖孔值并 this.getUIContext().px2vp() 转换

```ts
@StorageProp('cutoutTop') cutoutTop: number = 0
@StorageProp('cutoutLeft') cutoutLeft: number = 0
@StorageProp('cutoutRight') cutoutRight: number = 0
@StorageProp('cutoutBottom') cutoutBottom: number = 0

// 使用时必须 px2vp 转换
.padding({
  top: this.getUIContext().px2vp()(this.cutoutTop),
  left: this.getUIContext().px2vp(this.cutoutLeft),
  right: this.getUIContext().px2vp(this.cutoutRight)
})
```

### 步骤 4：固定组件 padding 避让 + expandSafeArea 背景延伸

> **关键：padding 必须加在外层容器上，不能直接加在固定高度的 Row 上，否则 padding 会挤压内容区导致文字截断。**

```ts
// 标题栏：外层 Column 承载挖孔 padding（撑大总高度），内层 Row 保持固定内容高度
Column() {
  Row() {
    Text('标题')
  }
  .width('100%')
  .height(48)  // 固定内容高度，不受 padding 影响
}
.padding({ top: p.top, left: p.left, right: p.right })  // padding 撑大外层，不挤压内容
.backgroundColor('#FFFFFF')
.expandSafeArea([SafeAreaType.CUTOUT], [SafeAreaEdge.TOP, SafeAreaEdge.START, SafeAreaEdge.END])

// 底部导航栏：同理
Column() {
  Row() {
    // Tab 内容
  }
  .width('100%')
  .height(56)
}
.padding({ bottom: p.bottom, left: p.left, right: p.right })
.expandSafeArea([SafeAreaType.CUTOUT], [SafeAreaEdge.BOTTOM, SafeAreaEdge.START, SafeAreaEdge.END])
```

关键点：
- **外层 Column + padding**：padding 撑大外层容器高度，不影响内层固定高度组件的内容区
- **内层 Row + 固定 height**：内容区始终完整，不会被 padding 挤压截断
- **expandSafeArea**：延伸背景色到挖孔区——**背景沉浸 + 内容避让**分离
- **错误写法**：直接在固定 height 的 Row 上加 `.padding({ top: p.top })`，会导致内容区 = height - paddingTop，文字被截断

### 避让规则

| 元素类型 | 避让 | 方式 |
|---------|-----|------|
| 标题栏/搜索框/Tab栏/底部导航栏 | ✅ | padding + expandSafeArea |
| 列表/卡片（可滚动） | ❌ | 随 Scroll 自然滚动 |
| 弹窗/侧边栏（悬浮） | ❌ | Stack 独立层 |

---

## 场景5：状态栏适配

**场景描述：**
- 阅读类、工具类等常规页面，内容区域需避让顶部状态栏，防止文字/控件被状态栏遮挡
- 背景色延伸到状态栏后方实现沉浸，同时顶部标题栏/内容通过 padding 下移
- 状态栏高度随设备变化（折叠屏展开/旋转），需动态响应

**多设备体验标准：**

应用需要对状态栏进行适配显示。

- 采用沉浸一体化的背景设计，保证效果的整体性，避免状态栏区域被单独切割。

- 根据页面内状态栏区域的背景色选择合适的状态栏颜色 (黑/白)，保证状态栏信息的易读性。

- 避免在状态栏背景区域内采用左右半区对比差异过大的颜色，导致部分状态栏信息无法阅读。

**解决方案：** 使用 **setWindowLayoutFullScreen 开启全屏** + **WindowUtil 单例封装 getWindowAvoidArea + avoidAreaChange** + **监听器回调模式驱动页面状态更新** + **根容器 padding({ top: topAvoidHeight }) 避让状态栏**

### 步骤 1：EntryAbility 开启全屏布局并初始化 WindowUtil

```ts
onWindowStageCreate(windowStage: window.WindowStage): void {
  windowStage.loadContent('pages/Index', (err) => {
    if (err.code) { return; }
    const mainWindow = windowStage.getMainWindowSync();
    mainWindow.setWindowLayoutFullScreen(true);
    WindowUtil.getInstance().init(mainWindow);
  });
}
```

### 步骤 2：WindowUtil 单例——获取并监听避让区

```ts
export interface AvoidAreaInfo { topHeight: number; bottomHeight: number; }

export class WindowUtil {
  private static instance: WindowUtil | null = null;
  private mainWindow: window.Window | null = null;
  private avoidAreaInfo: AvoidAreaInfo = { topHeight: 0, bottomHeight: 0 };
  private listeners: Set<(info: AvoidAreaInfo) => void> = new Set();

  static getInstance(): WindowUtil { /* 单例 */ }

  init(mainWindow: window.Window): void {
    this.mainWindow = mainWindow;
    this.updateAvoidArea();
    this.mainWindow.on('avoidAreaChange', () => { this.updateAvoidArea(); });
  }

  private updateAvoidArea(): void {
    const systemArea = this.mainWindow!.getWindowAvoidArea(window.AvoidAreaType.TYPE_SYSTEM);
    const navArea = this.mainWindow!.getWindowAvoidArea(window.AvoidAreaType.TYPE_NAVIGATION_INDICATOR);
    this.avoidAreaInfo = {
      topHeight: px2vp(systemArea.topRect.height),
      bottomHeight: px2vp(navArea.bottomRect.height)
    };
    this.listeners.forEach(cb => cb(this.avoidAreaInfo));
  }

  registerListener(cb: (info: AvoidAreaInfo) => void): void {
    this.listeners.add(cb);
    cb(this.avoidAreaInfo); // 立即回传当前值
  }

  unregisterListener(cb: (info: AvoidAreaInfo) => void): void { this.listeners.delete(cb); }

  destroy(): void {
    this.mainWindow?.off('avoidAreaChange');
    this.listeners.clear();
    this.mainWindow = null;
    WindowUtil.instance = null;
  }
}
```

关键点：
- 通过 `TYPE_SYSTEM` 获取状态栏高度，`TYPE_NAVIGATION_INDICATOR` 获取导航条高度
- `avoidAreaChange` 监听折叠屏展开、旋转等场景的高度变化，自动通知所有注册页面
- 注册时立即回传当前值，确保页面初始化即拿到正确高度

### 步骤 3：页面消费避让高度——根容器 padding 避让

```ts
@Entry
@Component
struct Index {
  @State topAvoidHeight: number = 0;

  aboutToAppear(): void {
    WindowUtil.getInstance().registerListener((info) => {
      this.topAvoidHeight = info.topHeight;
    });
  }

  build() {
    Stack() {
      Column() {
        TopBar()
        Scroll() {
          // 页面内容...
        }.layoutWeight(1)
        BottomBar()
      }
    }
    .padding({ top: this.topAvoidHeight })  // 根容器顶部 padding 避让状态栏
  }
}
```

关键点：
- 根容器通过 `padding({ top: topAvoidHeight })` 整体下移，所有子组件自动避开状态栏
- `topAvoidHeight` 为 `@State` 变量，避让区变化时 UI 自动刷新
- 页面销毁时调用 `unregisterListener` 避免泄漏

---

## 场景6：键盘易操作

**场景描述：**
- 含表单输入、操作按钮、列表的页面，需适配折叠屏/平板大屏双手操作易达性
- 软键盘弹出时不遮挡输入框、底部操作按钮和弹窗
- 大屏设备操作按钮置于底部两侧拇指热区，小屏居中排列
- 支持键盘 Tab 焦点导航、方向键网格导航和快捷键操作

**多设备体验标准：**

页面布局满足折叠屏/平板等大屏设备双手操作易操作性，键盘输入时，键盘上的按键操作要避开难交互区域。

**解决方案：** 使用 **WindowUtil 单例监听 TYPE_SYSTEM + TYPE_NAVIGATION_INDICATOR + TYPE_KEYBOARD 三类避让区** + **BreakpointManager 断点系统驱动布局切换** + **外层 Column padding({ bottom: keyboardHeight }) 缩小可视区域** + **操作栏放入 Scroll 内部随内容滚动避开键盘** + **弹窗用独立 padding({ bottom: keyboardHeight }) 上推** + **tabIndex + nextFocus + KeyboardShortcutManager 实现键盘导航**

### 步骤 1：WindowUtil 监听三类避让区（状态栏 + 导航条 + 键盘）

```ts
export interface AvoidAreaInfo { topHeight: number; bottomHeight: number; keyboardHeight: number; }

private updateAvoidArea(): void {
  const systemArea = this.mainWindow!.getWindowAvoidArea(AvoidAreaType.TYPE_SYSTEM);
  const navArea = this.mainWindow!.getWindowAvoidArea(AvoidAreaType.TYPE_NAVIGATION_INDICATOR);
  const kbArea = this.mainWindow!.getWindowAvoidArea(AvoidAreaType.TYPE_KEYBOARD);
  const ctx = this.mainWindow!.getUIContext();
  this.avoidAreaInfo = {
    topHeight: ctx.px2vp(systemArea.topRect.height),
    bottomHeight: ctx.px2vp(navArea.bottomRect.height),
    keyboardHeight: ctx.px2vp(kbArea.bottomRect.height)
  };
  this.notifyListeners();
}
```

关键点：`TYPE_KEYBOARD` 返回键盘占据的底部高度，键盘收起时为 0。`avoidAreaChange` 在键盘弹出/收起/焦点切换时自动触发。

### 步骤 2：外层 Column 用 keyboardHeight 缩小可视区域

```ts
private getBottomPadding(): number {
  let padding = this.keyboardHeight;
  if (this.currentBp === 'sm') { padding += this.bottomAvoidHeight; }
  return padding;
}

// 根容器
Column() {
  TopBar()
  Scroll() { /* 表单 + 列表 + 操作栏 */ }
}
.padding({ top: this.topAvoidHeight, bottom: this.getBottomPadding() })
```

关键点：`keyboardHeight` 加入根容器 bottom padding，Scroll 可视区域等比缩小，内容整体上移至键盘上方，系统自动滚动到焦点输入框。

### 步骤 3：操作栏放入 Scroll 内部——键盘弹出时可滚达

```
Column（paddingBottom = keyboardHeight + bottomAvoidHeight）
├── TopBar（固定顶部）
└── Scroll
    ├── FormSection（表单输入）
    ├── GridSection（列表卡片）
    └── BottomBar（取消 + 提交按钮）  ← 在 Scroll 内部，可滚动触达
```

关键点：操作栏在 Scroll 内部而非固定底部，键盘弹出后用户向下滚动即可找到按钮，不会因可视区域缩小而丢失。

### 步骤 4：弹窗独立避让——padding 上推而非压缩高度

```ts
// 弹窗作为 Stack 兄弟节点，不受 Column padding 影响
Column()  // 弹窗外层遮罩
  .width('100%')
  .height('100%')
  .padding({ bottom: this.keyboardHeight })  // 底部留出键盘空间
  .justifyContent(FlexAlign.Center)          // 居中区域自动缩小到键盘上方
```

关键点：弹窗是 Stack 中的独立层，用自身 `padding({ bottom: keyboardHeight })` 上推居中区域，不影响主内容层布局。

### 步骤 5：断点系统驱动大屏双手易达性

```ts
// BreakpointManager 监听 WidthBreakpoint 系统枚举
private getFormColumns(): number {
  if (this.currentBp === 'lg') return 3;   // 平板三列
  if (this.currentBp === 'md') return 2;   // 折叠屏展开两列
  return 1;                                 // 手机单列
}
private getSideMargin(): number {
  if (this.currentBp === 'lg') return 48;  // 大屏两侧留白，内容居中
  if (this.currentBp === 'md') return 32;
  return 0;
}
// 操作栏：大屏按钮在底部两侧（拇指热区）
Row() {
  Button('取消').width(sm ? 100 : 120)
  Blank()
  Button('提交').width(sm ? 100 : 120)
}
.padding({ left: sm ? 16 : sideMargin + 16, right: sm ? 16 : sideMargin + 16 })
```

关键点：sm 单列全宽、md 两列 + 侧边距、lg 三列 + 大侧边距，操作按钮始终在底部两侧拇指易达区域。

### 步骤 6：键盘焦点导航与快捷键

```ts
// Tab 顺序：顶栏 → 表单 → 列表 → 底部按钮 → 弹窗
TextInput().tabIndex(3).id('input_username')
TextInput().tabIndex(4).id('input_email')
// 卡片方向键网格导航
Column().focusable(true).tabIndex(10 + index)
  .nextFocus({
    left: `card_${index - 1}`, right: `card_${index + 1}`,
    up: `card_${index - columns}`, down: `card_${index + columns}`
  })
// 全局快捷键
this.shortcutManager.registerAll([
  { key: KeyCode.KEYCODE_S, ctrl: true, action: () => this.onSubmit() },
  { key: KeyCode.KEYCODE_ESCAPE, action: () => this.handleEscape() },
]);
// 弹窗内焦点隔离 + 默认焦点
Button('确认').tabIndex(31).defaultFocus(true)
```

关键点：tabIndex 按视觉阅读顺序编号，nextFocus 基于列数动态计算上下左右目标，弹窗内 tabIndex 独立编号段，`defaultFocus(true)` 确保弹窗打开时焦点落在确认按钮上。

---
