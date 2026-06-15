# 场景开发案例集

## 目录

- [场景1：列表与瀑布流折叠开合阅读焦点恢复](#场景1列表与瀑布流折叠开合阅读焦点恢复)
- [场景2：阅读应用折叠布局切换过渡动效](#场景2阅读应用折叠布局切换过渡动效)
- [场景3：会议悬浮态分屏适配](#场景3会议悬浮态分屏适配)
- [场景4：视频播放折痕避让](#场景4视频播放折痕避让)

---

## 场景1：列表与瀑布流折叠开合阅读焦点恢复

**场景描述：**

新闻资讯类应用使用 List 或 WaterFlow 展示内容列表。用户在浏览到第 N 条新闻时折叠/展开设备，屏幕尺寸变化导致布局重新计算——例如 List 在展开态可能显示更多列数，WaterFlow 的列数从 2 列变为 3 列。如果不做处理，列表会跳回顶部或偏移到其他位置，用户正在阅读的内容从视野中消失，需要重新滑动找回。

问题的根因：折叠屏开合时窗口尺寸变化，List / WaterFlow / Scroll 等可滑动组件内部的布局参数（列数、项高、间距等）随之改变，系统默认使用折叠前的滑动偏移量来维持位置，但偏移量相同的像素值在新的布局参数下对应的不再是同一批内容，因此阅读焦点发生偏移。

**多设备体验标准：**

应用在设备折叠/展开后不应出现操作步骤增加，操作更复杂等体验下降的情况。例如：如页面切换到其他页面、页面滚动位置发生偏移、输入内容丢失、图片模糊、播放进度变化。

> 来源：[折叠屏应用开发 - UX体验建议 - 开合连续性](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-foldable-guide)


**解决方案：**

对于 List 组件，通过 `onScrollIndex()` 记录当前可见项索引，折叠状态变化后使用 `scrollToIndex()` 恢复到该索引位置。对于 WaterFlow 组件，当列数未改变时系统自动保持偏移量；当列数改变时，将布局模式切换为 `SLIDING_WINDOW`，系统会根据最小索引值自动调整焦点位置。

> 来源：示例代码 [SmallWindowScene](https://gitcode.com/harmonyos_samples/SmallWindowScene)、[折叠屏应用开发 - 可滑动组件的阅读焦点不偏移](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-foldable-guide#section186893019118)

### 步骤 1：List 组件——记录索引 + 折展后恢复

通过 `onScrollIndex()` 监听当前可见的首项索引，在 `foldStatusChange` 回调中用 `scrollToIndex()` 恢复位置：

```typescript
import display from '@ohos.display';

private listScroller: Scroller = new Scroller();
@State currentIndex: number = 0;

aboutToAppear(): void {
  let callback: Callback<display.FoldStatus> = (data: display.FoldStatus) => {
    if (data === display.FoldStatus.FOLD_STATUS_EXPANDED) {
      this.listScroller.scrollToIndex(this.currentIndex);
    } else if (data === display.FoldStatus.FOLD_STATUS_FOLDED) {
      this.listScroller.scrollToIndex(this.currentIndex);
    }
  };
  try {
    display.on('foldStatusChange', callback);
  } catch (error) {
    hilog.error(0x0000, TAG, `Failed to register callback. Code: ${error.code}`);
  }
}

build() {
  List({ space: 16, scroller: this.listScroller }) {
    // ...列表项
  }
  .onScrollIndex((start: number) => {
    this.currentIndex = start;
  })
}
```

关键点：`onScrollIndex()` 持续记录可见区域首项索引，`foldStatusChange` 回调中无论展开还是折叠，都用 `scrollToIndex()` 跳回到记录的索引，确保用户正在阅读的条目重新出现在视野中。

> 来源：[Index.ets](https://gitcode.com/harmonyos_samples/SmallWindowScene/blob/master/entry/src/main/ets/pages/Index.ets)

### 步骤 2：WaterFlow 组件——SLIDING_WINDOW 模式自动保持焦点

WaterFlow 在列数不变时系统默认保持偏移量。但列数变化时（如折叠态 2 列 → 展开态 3 列），需将布局模式改为 `SLIDING_WINDOW`，系统将根据可展示区域的最小索引值自动调整：

```typescript
WaterFlow({ layoutMode: WaterFlowLayoutMode.SLIDING_WINDOW }) {
  LazyForEach(this.dataSource, (item: number) => {
    FlowItem() {
      Column() {
        Text('Num' + item).fontSize(12).height('16')
      }
    }
    .width('100%')
    .height(this.itemHeightArray[item % 100])
    .backgroundColor(this.colors[item % 5])
  }, (item: string) => item)
}
.columnsTemplate(this.waterFlowColumnsTemplate)
```

关键点：`SLIDING_WINDOW` 模式下，当列数因断点变化而改变时，系统自动以最小索引值为锚点重新排列，保证焦点不偏移。`columnsTemplate` 根据断点动态切换列数。

> 来源：[WaterFlowView.ets](https://gitcode.com/harmonyos_samples/SmallWindowScene/blob/master/entry/src/main/ets/views/WaterFlowView.ets)

### 步骤 3：布局驱动——断点而非折叠状态

上述 List 和 WaterFlow 的布局切换应通过 `windowSizeChange` 监听断点变化来驱动，而非直接使用 `foldStatusChange` 驱动布局。`foldStatusChange` 仅用于触发焦点恢复（`scrollToIndex`），布局本身的切换由断点系统统一管理：

```typescript
// EntryAbility 中注册窗口尺寸监听
private onWindowSizeChange: (windowSize: window.Size) => void = (windowSize: window.Size) => {
  AppStorage.setOrCreate('currentWidthBreakpoint', this.uiContext!.getWindowWidthBreakpoint());
  AppStorage.setOrCreate('currentHeightBreakpoint', this.uiContext!.getWindowHeightBreakpoint());
};

// 页面中根据断点切换列数
@StorageProp('currentWidthBreakpoint') currentBreakpoint: string = 'sm';

// WaterFlow 列数：sm=2列，md及以上=3列
get waterFlowColumnsTemplate() {
  return this.currentBreakpoint === 'sm' ? '1fr 1fr' : '1fr 1fr 1fr';
}
```

关键点：页面布局用断点驱动，焦点恢复用 `foldStatusChange` 驱动——两者职责分离。这样在分屏、悬浮窗等窗口变化但折叠状态未改变的场景下，布局也能正确响应。

> 来源：[EntryAbility.ets](https://gitcode.com/harmonyos_samples/SmallWindowScene/blob/master/entry/src/main/ets/entryability/EntryAbility.ets)、[折叠屏应用开发 - 适配应用界面开合连续](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-foldable-guide#section186893019118)

---

## 场景2：阅读应用折叠布局切换过渡动效

**场景描述：**
- 阅读类应用在折叠屏上运行，折叠态为单列布局，展开态切换为双列布局
- 直接切换布局会导致内容突然跳变，用户体验生硬
- 需要在折叠/展开时通过过渡动效实现平滑的布局切换

**多设备体验标准：**

设备在折叠/展开时，变化过程有连续动效，而不是硬切换。

**解决方案：** 使用 **animateTo({ duration, curve }) 包裹 layoutMode 状态变更驱动几何属性平滑过渡** + **TransitionEffect.OPACITY + scale 为折展时插入/移除的组件添加出现/消失转场效果**

### 步骤 1：用 animateTo 包裹折展触发的布局切换

折叠/展开导致布局模式变化时，通过 `animateTo` 包裹状态变更，使几何属性（宽度、列数）产生平滑过渡，而非硬切：

```ts
private switchLayout(nextMode: string) {
  this.getUIContext().animateTo({
    duration: 350,
    curve: Curve.EaseInOut,
  }, () => {
    this.layoutMode = nextMode;
  });
}
```

关键点：折展时布局模式的切换必须用 `animateTo` 包裹，框架会自动对受影响组件的宽度和位置做插值动画，满足 4.2"连续动效而非硬切换"的要求。

### 步骤 2：TransitionEffect 为组件添加折展转场效果

布局切换时部分组件因列数变化而插入或移除，通过 `TransitionEffect` 为这些组件添加出现/消失的过渡效果：

```ts
ArticleCard({ item })
  .transition(
    TransitionEffect.OPACITY
      .animation({ duration: 300, curve: Curve.Ease })
      .combine(TransitionEffect.scale({ x: 0.9, y: 0.9 })
        .animation({ duration: 300, curve: Curve.Ease }))
  )
```

关键点：`TransitionEffect.OPACITY` + `scale` 组合使卡片在折展布局切换时平滑出现/消失，而非突然弹出或消失。`animation` 参数内嵌在 `TransitionEffect` 中，状态变更即自动触发转场。

---

## 场景3：视频播放悬停态分屏适配

**场景描述：**

视频播放类应用在折叠屏上运行。用户将设备半折后立在桌面上（悬停态），希望上半屏显示视频画面，下半屏显示播放控制按钮，实现免手持观看。进入悬停态后，页面需要重新布局——原有的全屏视频页面不再适用，需要将展示区（视频画面）和操作区（控制按钮）分别放到上半屏和下半屏，同时折痕区域不能放置任何内容。

问题的根因：悬停态下屏幕被折痕分为上下两部分，如果不做适配，视频画面和控制按钮可能横跨折痕，导致折痕处的内容变形、触摸不灵敏，且没有利用上下分区"上浏览下交互"的免手持优势。

**多设备体验标准：**

长视频、短视频、直播、通话、会议、拍摄类应用需针对折叠屏的悬停态进行单独适配。在界面布局设计时充分考虑悬停态下不同屏幕区域的可视角度及交互难易度。下半屏区域内可放置交互操作，上半屏区域内进行信息显示，呈现浏览型内容。交互型控件，例如弹出框、半模态，在下半屏显示；跟随上下文的控件，例如菜单，跟随触发元素所在侧的屏幕显示。

> 来源：[折叠屏应用开发 - UX体验建议 - 悬停态适配](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-foldable-guide)

**解决方案：**

使用 FolderStack 组件实现悬停态分屏。FolderStack 继承自 Stack，通过 `upperItems` 指定需要移到上半屏的子组件 ID，其余组件自动堆叠在下半屏，折痕区域自动避让。这是系统推荐的方式，开发简单，无需手动获取折痕位置。

> 来源：[折叠屏悬停态最佳实践](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-folded-hover)、示例代码 [FoldedHover](https://gitcode.com/harmonyos_samples/FoldedHover)

### 步骤 1：使用 FolderStack 划分上下屏内容

将视频画面组件的 ID 注册到 `upperItems`，使其在悬停态时自动移到上半屏；播放控制和标题等组件不注册 ID，自动堆叠在下半屏：

```typescript
FolderStack({ upperItems: ['upper'] }) {
  // 视频画面：注册到 upperItems，悬停态自动移到上半屏
  VideoPlayView({ avPlayerUtil: this.avPlayerUtil })
    .id('upper')

  // 播放控制：未注册 ID，悬停态自动堆叠在下半屏
  VideoControlView({ avPlayerUtil: this.avPlayerUtil })

  // 标题栏：未注册 ID，悬停态自动堆叠在下半屏
  BackTitleView({
    title: Const.PAGE_TITLES[0]
  })
}
```

关键点：`FolderStack` 在非悬停态时表现为普通 Stack（所有子组件堆叠），进入悬停态后自动将 `upperItems` 中的组件移到上半屏、其余组件留在下半屏、折痕区域自动避让。开发者无需手动计算折痕位置。

> 来源：[HoverUseFolderStack.ets](https://gitcode.com/harmonyos_samples/FoldedHover/blob/master/entry/src/main/ets/view/hoverview/HoverUseFolderStack.ets)

### 步骤 2：配置悬停态属性和事件

设置过渡动效、自动旋转，并监听折叠状态和悬停状态变化：

```typescript
FolderStack({ upperItems: ['upper'] }) {
  // ...子组件
}
.enableAnimation(true)   // 开启进入/退出悬停态的过渡动效，默认 true
.autoHalfFold(true)      // 半折叠态自动旋转，默认 true
.onFolderStateChange((msg) => {
  // 折叠状态变化回调
  if (msg.foldStatus === FoldStatus.FOLD_STATUS_EXPANDED) {
    console.info("展开态")
  } else if (msg.foldStatus === FoldStatus.FOLD_STATUS_HALF_FOLDED) {
    console.info("半折叠态（悬停态）")
  }
})
.onHoverStatusChange((msg) => {
  // 悬停状态变化回调，可获取 isHoverMode、appRotation、windowStatusType
  console.info('isHoverMode:' + msg.isHoverMode)
  console.info('appRotation:' + msg.appRotation)
})
.alignContent(Alignment.Bottom)
.height("100%")
.width("100%")
```

关键点：`enableAnimation(true)` 让进入/退出悬停态时有平滑过渡动画；`onFolderStateChange` 和 `onHoverStatusChange` 可用于在状态变化时执行额外逻辑（如切换控制栏显隐）。FolderStack 必须撑满页面全屏（`height: "100%", width: "100%"`），否则只作为普通 Stack 使用。

> 来源：[FolderStack API 参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-folderstack)、[折叠屏悬停态最佳实践](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-folded-hover)

### 步骤 3：使用 FoldSplitContainer 实现固定分栏（可选）

如果需要严格分栏、互不遮挡（而非 Stack 的层叠覆盖），可以使用 FoldSplitContainer。它提供 primary 和 secondary 两个独立区域，支持展开态/悬停态/折叠态分别配置分栏比例：

```typescript
import { FoldSplitContainer } from '@kit.ArkUI';

FoldSplitContainer({
  primary: () => {
    this.primaryArea()   // 上半屏：视频画面
  },
  secondary: () => {
    this.secondaryArea() // 下半屏：控制面板
  }
})
```

选择依据：如果上下两部分内容需要叠加显示（如视频画面 + 悬浮控制条），选 FolderStack；如果需要严格分栏、互不遮挡（如游戏画面 + 独立操作面板），选 FoldSplitContainer。

> 来源：[FoldSplitContainer API 参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-foldsplitcontainer)

---

## 场景4：悬停态折痕区域避让

**场景描述：**

视频播放类应用在悬停态下需要将视频画面和详情面板分别放在上下半屏，但 FolderStack / FoldSplitContainer 的自动避让无法满足需求（例如需要自定义悬停触发条件或窗口旋转策略），需要手动获取折痕区域并计算布局。此时，上半屏视频画面的下边界应锚定在折痕上边界，下半屏控制面板的上边界应锚定在折痕下边界，折痕区域本身不放置任何内容，并且内容还需再向折痕方向留出安全间距。

问题的根因：手动实现悬停态布局时，`getCurrentFoldCreaseRegion()` 返回的是全局坐标系下的折痕矩形（单位 px），必须正确转换为页面相对坐标（vp）后才能用于布局计算。如果坐标系转换出错或直接使用像素值，会导致避让区域偏上/偏下，内容被折痕遮挡。

**多设备体验标准：**

悬停态时，中间弯折区域难以操作且显示内容会变形。长视频、短视频、直播、通话、会议、拍摄类应用需针对折痕区域进行避让适配。上半屏内容由中线向上避让 16 vp (3 毫米)、下半屏内容由中线向下避让 40 vp (7 毫米)。

> 来源：[折叠屏应用 UX 体验标准](https://developer.huawei.com/consumer/cn/doc/design-guides/ux-guidelines-foldable-screen-0000001807866557)、[应用设计最佳实践](https://developer.huawei.com/consumer/cn/doc/design-guides/practices-overview-0000001746498066)

**解决方案：**

使用 `display.on('foldStatusChange')` 监听折叠状态变化判断悬停态，通过 `getCurrentFoldCreaseRegion()` 获取折痕区域并转换为 vp，按折痕边界分配上下半屏空间，折痕区域用空白占位。

> 来源：示例代码 [FoldedHover](https://gitcode.com/harmonyos_samples/FoldedHover)、[折叠屏悬停态最佳实践](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-folded-hover)

### 步骤 1：监听折叠状态，判断悬停态

通过 `foldStatusChange` 回调检测半折叠状态，结合设备方向判断是否进入悬停态：

```typescript
import display from '@ohos.display';

@State isHover: boolean = false

private onFoldStatusChange: Callback<display.FoldStatus> = (data: display.FoldStatus) => {
  try {
    let orientation: display.Orientation = display.getDefaultDisplaySync().orientation;
    // 悬停态判断：半折叠 + 横屏
    if (data === display.FoldStatus.FOLD_STATUS_HALF_FOLDED &&
      (orientation === display.Orientation.LANDSCAPE ||
        orientation === display.Orientation.LANDSCAPE_INVERTED)) {
      this.isHover = true;
      DisplayUtil.getFoldCreaseRegion();
    } else {
      this.isHover = false;
    }
  } catch (error) {
    hilog.error(0x0000, TAG, `onFoldStatusChange error: ${error.code}, message: ${error.message}`);
  }
};
```

关键点：悬停态的判断条件是半折叠（`FOLD_STATUS_HALF_FOLDED`）且设备处于横屏方向。进入悬停态时立即获取折痕区域，退出时回退为常规布局。

> 来源：示例代码 [FoldedHover](https://gitcode.com/harmonyos_samples/FoldedHover/blob/master/entry/src/main/ets/pages/Index.ets)

### 步骤 2：获取折痕区域并转换为 vp

通过 `getCurrentFoldCreaseRegion()` 获取折痕矩形（全局坐标，单位 px），使用 `px2vp()` 转换为 vp 单位后存储：

```typescript
static getFoldCreaseRegion(): void {
  try {
    if (display.isFoldable()) {
      let foldRegion: display.FoldCreaseRegion = display.getCurrentFoldCreaseRegion();
      let rect: display.Rect = foldRegion.creaseRects[0];
      // creaseRegion[0] = 折痕上边界的 vp 值（即上半屏可用高度）
      // creaseRegion[1] = 折痕区域的 vp 高度
      let creaseRegion: number[] = [uiContext!.px2vp(rect.top), uiContext!.px2vp(rect.height)];
      AppStorage.setOrCreate('creaseRegion', creaseRegion);
    }
  } catch (error) {
    hilog.error(0x0000, TAG, `getFoldCreaseRegion error: ${error.code}, message: ${error.message}`);
  }
}
```

关键点：`rect.top` 是折痕上边界的全局坐标（px），`rect.height` 是折痕区域高度（px）。通过 `px2vp()` 转换后，`creaseRegion[0]` 即为上半屏可用高度，`creaseRegion[1]` 即为折痕区域高度。

> 来源：[DisplayUtil.ets](https://gitcode.com/harmonyos_samples/FoldedHover/blob/master/entry/src/main/ets/common/utils/DisplayUtil.ets)

### 步骤 3：按折痕边界分配布局空间

根据折痕区域将页面分为三段：上半屏（到折痕上边界）、折痕空白区、下半屏（从折痕下边界到底部）：

```typescript
@StorageProp('creaseRegion') creaseRegion: number[] = [0, 0]

build() {
  Stack() {
    if (this.isHover) {
      Column() {
        // 上半屏：高度 = 折痕上边界，放置视频画面
        VideoPlayView()
          .height(this.creaseRegion[0])

        // 折痕区域：用 Blank 占位，不放置任何可见内容
        Blank()
          .height(this.creaseRegion[1])

        // 下半屏：占据剩余空间，放置控制面板
        ControlPanel()
          .layoutWeight(1)
      }
    } else {
      // 非悬停态：常规全屏布局
      NormalLayout()
    }
  }
}
```

关键点：上半屏高度锚定折痕上边界 `creaseRegion[0]`，折痕区域用 `Blank` 占位 `creaseRegion[1]`，下半屏用 `layoutWeight(1)` 撑满剩余空间。三段之间无缝衔接，折痕区域不承载任何内容或交互控件。

> 来源：[折叠屏悬停态最佳实践 - 调整布局](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-folded-hover)

### 步骤 4：使用 position 精确定位悬浮控件

对于需要精确控制位置的悬浮控件（如返回按钮），根据折痕区域计算 y 坐标，确保不落入折痕区域：

```typescript
// 视频播放组件：悬停态时高度限制在折痕上方
Column() {
  XComponent({
    id: Const.X_COMPONENT_ID,
    type: XComponentType.SURFACE,
    controller: this.xComponentController
  })
}
.height(this.isHover ? this.creaseRegion[0] : '100%')

// 返回按钮：悬停态时定位到折痕下方
Row() {
  // ...
}
.position({
  x: '24vp',
  y: this.isHover ? this.creaseRegion[0] + this.creaseRegion[1] + 36 : '36vp'
})
```

关键点：悬浮控件的 y 坐标 = `creaseRegion[0] + creaseRegion[1] + 安全间距`，确保控件在折痕下方显示。设计规范建议上半屏内容由中线向上避让 16 vp，下半屏内容由中线向下避让 40 vp。

> 来源：[VideoPlayView.ets](https://gitcode.com/harmonyos_samples/FoldedHover/blob/master/entry/src/main/ets/view/basicview/VideoPlayView.ets)、[BackTitleView.ets](https://gitcode.com/harmonyos_samples/FoldedHover/blob/master/entry/src/main/ets/view/basicview/BackTitleView.ets)

### 步骤 5：注册和取消监听

在页面生命周期中注册和取消折叠状态监听，避免内存泄漏：

```typescript
aboutToAppear() {
  try {
    display.on('foldStatusChange', this.onFoldStatusChange);
  } catch (exception) {
    hilog.error(0x0000, TAG, 'Failed to register callback. Code: ' + JSON.stringify(exception));
  }
}

aboutToDisappear() {
  display.off('foldStatusChange', this.onFoldStatusChange);
}
```

关键点：退出应用或退出监听页面时，必须调用 `display.off('foldStatusChange')` 取消监听，否则可能导致回调在无效上下文中执行。

> 来源：[屏幕属性开发指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/screenproperty-guideline)

---
