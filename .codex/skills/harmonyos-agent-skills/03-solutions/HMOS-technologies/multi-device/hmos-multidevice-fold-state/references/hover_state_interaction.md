# 悬停态分屏与多形态适配指南

## 目标

在折叠设备悬停态下实现分屏布局，将展示区与操作区分离，同时覆盖多种折叠形态的适配。

## 文档导航

本文档涵盖以下主题：

1. **悬停态分屏实现方案**：FolderStack / FoldSplitContainer / 自定义实现（方案选择 ~ 方案三）
2. **屏幕旋转策略**：折痕方向判定、延迟调度、方向管理（方案三步骤 5）
3. **多段折叠形态适配**：三折叠 F/M/G 形态布局、特殊比例折叠屏内外屏差异化适配、小方屏沉浸式浏览（多段折叠形态适配建议）

## 背景

折叠屏提供"悬停态"体验：用户将设备半折后立在桌面上，实现免手持操作。悬停态适用于视频通话、视频播放、拍照和听歌等不需要频繁交互的场景。

进入悬停态后，页面需要重新布局：

- **上半屏**为显示区域，优先承载浏览型内容（如视频画面、拍摄预览）
- **下半屏**为操作区域，优先承载交互控件（如播放控制、拍照按钮）
- 弹出框和半模态优先放在下半屏；跟随上下文的控件（如菜单）跟随触发元素所在侧的屏幕显示

长视频、短视频、直播、通话、会议、拍摄类应用涉及悬停态时需要单独适配。

## 方案选择

系统提供三种悬停态实现方式，根据页面复杂度和定制需求选择：

| | FolderStack | FoldSplitContainer | 自定义实现 |
| --- | --- | --- | --- |
| 适用场景 | 视频全屏播放等交互少的场景 | 固定主次分栏场景（如游戏画面+操作区） | 页面布局复杂或需要自定义悬停触发条件 |
| 折痕避让 | 自动 | 自动 | 需手动获取折痕区域并计算布局 |
| 自定义布局 | 支持（展开态/折叠态） | 不支持（固定二分栏/三分栏） | 支持 |
| 自定义旋转策略 | 不支持 | 不支持 | 支持 |
| 自定义触发条件 | 不支持 | 不支持 | 支持 |
| 开发难度 | 简单 | 简单 | 困难 |

> 来源：[折叠屏悬停态最佳实践](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-folded-hover)

## 方案一：FolderStack（推荐，适用于大多数场景）

FolderStack 继承自 Stack 组件，通过 `upperItems` 指定需要移到上半屏的子组件 ID，其他组件自动堆叠在下半屏，折痕区域自动避让。

> 注意：FolderStack 需要撑满页面全屏，如果不撑满则只作为普通 Stack 使用。该组件的悬停能力仅针对双折叠设备生效。当父组件为 if/else 条件渲染节点时，悬停能力将会失效。

### 基本用法

```typescript
FolderStack({ upperItems: ['upper'] }) {
  VideoPlayView({ avPlayerUtil: this.avPlayerUtil })
    .id('upper')

  VideoControlView({ avPlayerUtil: this.avPlayerUtil })

  BackTitleView({
    title: Const.PAGE_TITLES[0]
  })
}
```

> 来源：[折叠屏悬停态最佳实践 - 使用FolderStack](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-folded-hover)、示例代码 [HoverUseFolderStack.ets](https://gitcode.com/harmonyos_samples/FoldedHover/blob/master/entry/src/main/ets/view/hoverview/HoverUseFolderStack.ets)

### 常用属性和事件

```typescript
FolderStack({ upperItems: ['upperItemsId'] }) {
  Column() {
    Text("video zone").height("100%").width("100%").textAlign(TextAlign.Center).fontSize(25)
  }.backgroundColor('rgb(0, 74, 175)').width("100%").height("100%").id("upperItemsId")

  Column() {
    Text("video title").width("100%").height(50).textAlign(TextAlign.Center).fontSize(25)
  }.width("100%").height("100%").justifyContent(FlexAlign.Start)

  Column() {
    Text("video bar").width("100%").height(50).textAlign(TextAlign.Center).fontSize(25)
  }.width("100%").height("100%").justifyContent(FlexAlign.End)
}
.enableAnimation(true)   // 开启进入/退出悬停态的过渡动效，默认 true
.autoHalfFold(true)      // 半折叠态自动旋转，默认 true
.onFolderStateChange((msg) => {
  // 折叠状态变化回调
  if (msg.foldStatus === FoldStatus.FOLD_STATUS_EXPANDED) {
    console.info("展开态")
  } else if (msg.foldStatus === FoldStatus.FOLD_STATUS_HALF_FOLDED) {
    console.info("半折叠态")
  }
})
.onHoverStatusChange((msg) => {
  // 悬停状态变化回调
  console.info('isHoverMode:' + msg.isHoverMode)
  console.info('appRotation:' + msg.appRotation)
  console.info('windowStatusType:' + msg.windowStatusType)
})
.alignContent(Alignment.Bottom)
.height("100%")
.width("100%")
```

> 来源：[FolderStack API 参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-folderstack)

### autoHalfFold 属性详解

`autoHalfFold` 是 FolderStack 和 FoldSplitContainer 提供的**自动旋转能力**，用于在半折叠态自动调整屏幕方向，使分屏布局合理。

> 来源：[FolderStack API 参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-folderstack)、[折叠屏悬停态最佳实践](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-folded-hover)

#### 作用机制

- **默认值**：`true`（开启自动旋转）
- **触发条件**：设备进入半折叠态（`FOLD_STATUS_HALF_FOLDED`）
- **行为**：框架自动判断折痕方向并旋转屏幕，使分屏布局为"上展示下操作"或"左展示右操作"
- **退出恢复**：退出悬停态时自动恢复系统默认方向

#### 适用场景

| 折痕方向 | 正常使用方向 | 悬停态自动旋转结果 | 分屏布局 |
|---------|------------|------------------|---------|
| 横折痕（水平） | 竖屏 | 保持竖屏 | 上展示下操作 |
| 竖折痕（垂直） | 竖屏 | 旋转 90 度到横屏 | 上展示下操作（原左右变为上下） |

#### 限制与注意事项

1. **仅支持双折叠设备**：三折叠设备（如 Mate XT）不适用，需使用自定义实现
2. **不支持自定义旋转策略**：旋转方向和时机由框架控制，开发者无法干预
3. **不支持自定义触发条件**：仅响应系统半折叠状态，无法自定义悬停阈值
4. **需要全屏使用**：FolderStack 必须撑满页面全屏，否则仅作为普通 Stack 使用
5. **条件渲染失效**：当父组件为 `if/else` 条件渲染节点时，悬停能力将会失效

> 注意 1、4、5 来源：[FolderStack API 参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-folderstack)

#### 何时需要关闭 autoHalfFold

以下场景需要设置 `.autoHalfFold(false)` 并采用自定义实现：

- 需要在悬停态保持特定方向（如始终横屏或始终竖屏）
- 三折叠设备需要差异化方向策略
- 需要根据业务状态动态调整旋转策略
- 竖折痕设备需要自定义翻转逻辑（见方案三的屏幕旋转指南）

### onHoverStatusChange 回调参数

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `foldStatus` | FoldStatus | 当前设备的折叠状态 |
| `isHoverMode` | boolean | 当前是否为悬停态 |
| `appRotation` | AppRotation | 当前应用方向 |
| `windowStatusType` | WindowStatusType | 窗口模式枚举 |

> 来源：[FolderStack API 参考 - HoverEventParam](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-folderstack)

## 方案二：FoldSplitContainer（适用于固定分栏场景）

FoldSplitContainer 是系统提供的分栏组件，可以实现二分栏、三分栏在展开态、悬停态和折叠态的区域控制。进入悬停态时会自动避让折痕区域。

> 窗口宽度小于等于 600vp 时默认使用二分栏；窗口宽度大于 600vp 时可支持扩展区域；窗口宽度大于 600vp 且在横屏半折状态下可触发悬停态布局。

### 基本用法（二分栏）

```typescript
import { FoldSplitContainer } from '@kit.ArkUI';

@Entry
@Component
struct TwoColumns {
  @Builder
  privateRegion() {
    Text("Primary")
      .backgroundColor('rgba(255, 0, 0, 0.1)')
      .fontSize(28)
      .textAlign(TextAlign.Center)
      .height('100%')
      .width('100%')
  }

  @Builder
  secondaryRegion() {
    Text("Secondary")
      .backgroundColor('rgba(0, 255, 0, 0.1)')
      .fontSize(28)
      .textAlign(TextAlign.Center)
      .height('100%')
      .width('100%')
  }

  build() {
    RelativeContainer() {
      FoldSplitContainer({
        primary: () => {
          this.privateRegion()
        },
        secondary: () => {
          this.secondaryRegion()
        }
      })
    }
    .height('100%')
    .width('100%')
  }
}
```

> 来源：[FoldSplitContainer API 参考 - 示例1](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-foldsplitcontainer)

### 三分栏与布局配置

```typescript
import {
  FoldSplitContainer,
  PresetSplitRatio,
  ExtraRegionPosition
} from '@kit.ArkUI';

@State expandedLayoutOptions: ExpandedRegionLayoutOptions = {
  verticalSplitRatio: PresetSplitRatio.LAYOUT_1V1,    // 展开态上下比例 1:1
  horizontalSplitRatio: PresetSplitRatio.LAYOUT_3V2,  // 展开态主/侧比例 3:2
  isExtraRegionPerpendicular: true                     // 扩展区贯穿整个组件
};

@State hoverModeLayoutOptions: HoverModeRegionLayoutOptions = {
  showExtraRegion: false  // 悬停态不显示扩展区域
};

@State foldedLayoutOptions: FoldedRegionLayoutOptions = {
  verticalSplitRatio: PresetSplitRatio.LAYOUT_1V1  // 折叠态上下比例 1:1
};

FoldSplitContainer({
  primary: () => { this.primaryArea() },
  secondary: () => { this.secondaryArea() },
  extra: () => { this.extraArea() },
  expandedLayoutOptions: this.expandedLayoutOptions,
  hoverModeLayoutOptions: this.hoverModeLayoutOptions,
  foldedLayoutOptions: this.foldedLayoutOptions,
})
```

预设比例常量：

| 常量 | 值 | 说明 |
| --- | --- | --- |
| `PresetSplitRatio.LAYOUT_1V1` | 1 | 1:1 比例 |
| `PresetSplitRatio.LAYOUT_3V2` | 1.5 | 3:2 比例 |
| `PresetSplitRatio.LAYOUT_2V3` | 0.667 | 2:3 比例 |

布局配置参数说明：

| 参数 | 所属配置 | 说明 |
| --- | --- | --- |
| `verticalSplitRatio` | 展开态/折叠态 | 上下区域高度比例 |
| `horizontalSplitRatio` | 展开态 | 主区域与扩展区域宽度比例 |
| `isExtraRegionPerpendicular` | 展开态 | 扩展区是否贯穿整个组件，默认 true |
| `extraRegionPosition` | 展开态 | 扩展区位置（TOP/BOTTOM），默认 TOP |
| `showExtraRegion` | 悬停态 | 是否显示扩展区域，默认 false |

> 来源：[FoldSplitContainer API 参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-foldsplitcontainer)

## 方案三：自定义实现（适用于复杂场景）

当 FolderStack 和 FoldSplitContainer 无法满足需求时（例如需要自定义悬停触发条件或窗口旋转策略），可以自定义实现悬停态布局。

### 实现原理

1. **监听悬停态**：通过 `display.on('foldStatusChange')` 监听折叠状态变化，结合设备横屏状态判断是否进入悬停态
2. **调整布局**：通过 `display.getCurrentFoldCreaseRegion()` 获取折痕区域位置和大小，手动计算并设置上下半屏组件的尺寸和位置

### 步骤 1：监听折叠状态并判断悬停态

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

> 来源：示例代码 [Index.ets](https://gitcode.com/harmonyos_samples/FoldedHover/blob/master/entry/src/main/ets/pages/Index.ets)

### 步骤 2：获取折痕区域

```typescript
static getFoldCreaseRegion(): void {
  try {
    if (display.isFoldable()) {
      let foldRegion: display.FoldCreaseRegion = display.getCurrentFoldCreaseRegion();
      let rect: display.Rect = foldRegion.creaseRects[0];
      // creaseRegion[0] = 折痕上边界(vp)，creaseRegion[1] = 折痕高度(vp)
      let creaseRegion: number[] = [uiContext!.px2vp(rect.top), uiContext!.px2vp(rect.height)];
      AppStorage.setOrCreate('creaseRegion', creaseRegion);
    }
  } catch (error) {
    hilog.error(0x0000, TAG, `getFoldCreaseRegion error: ${error.code}, message: ${error.message}`);
  }
}
```

> 来源：示例代码 [DisplayUtil.ets](https://gitcode.com/harmonyos_samples/FoldedHover/blob/master/entry/src/main/ets/common/utils/DisplayUtil.ets)

### 步骤 3：根据折痕区域调整布局

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
.width('80%')
.height('24vp')
.position({
  x: '24vp',
  y: this.isHover ? this.creaseRegion[0] + this.creaseRegion[1] + 36 : '36vp'
})
```

> 来源：示例代码 [VideoPlayView.ets](https://gitcode.com/harmonyos_samples/FoldedHover/blob/master/entry/src/main/ets/view/basicview/VideoPlayView.ets)、[BackTitleView.ets](https://gitcode.com/harmonyos_samples/FoldedHover/blob/master/entry/src/main/ets/view/basicview/BackTitleView.ets)

### 步骤 4：注册和取消监听

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

> 注意：退出应用或退出监听页面时，必须调用 `display.off('foldStatusChange')` 取消监听。

> 来源：[折叠屏悬停态最佳实践](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-folded-hover)

### 步骤 5：屏幕旋转策略（自定义实现核心）

当关闭 `autoHalfFold` 或使用自定义实现时，**必须手动管理屏幕旋转**。这是悬停态适配中最容易出错的部分。

> 本节内容来源：[折展问题修复场景库 - 场景 2：方向反复切换](./bug-fix-cases.md#场景-2方向反复切换或偶发反向)、[场景 3：竖折痕左右折叠时未按语义翻转 90 度](./bug-fix-cases.md#场景-3竖折痕左右折叠时未按语义翻转-90-度)、[场景 4：固定竖折痕设备被矩形假象误判为横折痕](./bug-fix-cases.md#场景-4固定竖折痕设备被矩形假象误判为横折痕)、[折痕区域避让指南 - 步骤 3：折痕方向检测](./crease_avoidance.md#步骤-3折痕方向检测双向评分算法)

#### 5.0 折痕方向的获取与判定

屏幕旋转策略的第一步是**判断折痕是竖折痕还是横折痕**。这是运行时动态获取的，不能硬编码。

**数据来源**：`display.getCurrentFoldCreaseRegion()` 返回的 `FoldCreaseRegion` 对象，其 `creaseRects[0]` 是折痕矩形（`display.Rect`），包含 `left`、`top`、`width`、`height`（单位 px，全局坐标）。

**竖折痕与横折痕的定义**：

| 方向 | 折痕矩形特征 | 屏幕分割效果 |
|------|------------|------------|
| 竖折痕（垂直） | `height > width`（折痕沿纵向延伸） | 将屏幕分为左右两部分 |
| 横折痕（水平） | `width > height`（折痕沿横向延伸） | 将屏幕分为上下两部分 |

**判定算法**：禁止仅依赖单次 `width/height` 比较判断方向。应使用三级判定算法，按以下优先级执行：

| 级别 | 判定方式 | 适用场景 | 可信度 |
|------|---------|---------|-------|
| 第一级 | 物理像素轴比阈值（1.35） | `height >= width * 1.35` → 竖折痕；`width >= height * 1.35` → 横折痕 | 高，无需进一步计算 |
| 第二级 | 几何评分对比 | 轴比在 1/1.35 之间（宽高接近）时，计算"直接评分"与"交换评分"的差异 | 中，需结合评分阈值 0.22 |
| 第三级 | 方向组兜底 | 评分差异 < 0.22 时，沿用当前 `isVerticalCrease` 状态或当前方向组 | 低，不轻易翻转轴结论 |

**方向锁定机制**：检测到方向后应锁定，避免折叠过程中因折痕数据微小变化导致方向抖动。仅在完全展开或完全折叠时重置方向锁定。

> 来源：[折痕区域避让指南 - 步骤 3：折痕方向检测](./crease_avoidance.md#步骤-3折痕方向检测双向评分算法)、[折展问题修复场景库 - 场景 4：固定竖折痕设备被矩形假象误判为横折痕](./bug-fix-cases.md#场景-4固定竖折痕设备被矩形假象误判为横折痕)。完整的三级判定代码和评分算法详见这两个文档，此处不再重复。

#### 5.1 方向决策原则

**核心规则**：方向决策基于**折痕轴方向**，而非当前视口宽高比。

| 折痕方向 | 正常使用方向 | 悬停态目标方向 | 原因 |
|---------|------------|--------------|------|
| 横折痕（水平） | 竖屏 | 保持竖屏 `PORTRAIT` | 分屏为上下布局，竖屏合理 |
| 竖折痕（垂直） | 竖屏 | 旋转 90 度到横屏 `LANDSCAPE` | 原左右分屏需翻转为上下分屏 |

**错误做法**：仅根据 `rootWidth > rootHeight` 判断方向，会导致竖折痕设备在悬停态保持左右分屏而非上下分屏。

**正确做法**：先判断折痕轴方向，再映射到目标方向组。

```typescript
import { window } from '@kit.ArkUI';

// 判断是否接近正方形（用于特殊比例设备）
private isNearSquareRoot(rootWidthVp: number, rootHeightVp: number): boolean {
  if (rootWidthVp <= 0 || rootHeightVp <= 0) return false;
  const ratio = rootWidthVp / rootHeightVp;
  return ratio >= 0.78 && ratio <= 1.28;
}

// 根据折痕轴方向决定悬停态目标方向
private getTargetHoverOrientation(
  isVerticalCrease: boolean,
  rootWidthVp: number,
  rootHeightVp: number
): window.Orientation {
  const isNearSquare = this.isNearSquareRoot(rootWidthVp, rootHeightVp);
  
  if (isVerticalCrease) {
    // 竖折痕：翻转 90 度后进入横屏方向组
    return isNearSquare 
      ? window.Orientation.AUTO_ROTATION_PORTRAIT
      : window.Orientation.AUTO_ROTATION_LANDSCAPE;
  }
  // 横折痕：保持原方向组
  return isNearSquare 
    ? window.Orientation.AUTO_ROTATION_LANDSCAPE
    : window.Orientation.AUTO_ROTATION_PORTRAIT;
}
```

#### 5.2 延迟调度机制（避免方向抖动）

**问题**：在 `foldStatusChange`、`onAreaChange`、`foldDisplayModeChange` 多个回调中直接调用 `setPreferredOrientation`，会导致方向反复切换、界面抖动。

**解决方案**：使用延迟调度 + 去重机制。

```typescript
import { window } from '@kit.ArkUI';

@State private isHoverMode: boolean = false;
private hostWindow?: window.Window;
private orientationTimerId: number = -1;
private pendingOrientation?: window.Orientation;
private appliedOrientation?: window.Orientation;

// 延迟参数（经验值，可根据设备调整）
private readonly hoverLockDelayMs: number = 120;   // 进入悬停延迟上锁
private readonly hoverUnlockDelayMs: number = 220; // 退出悬停延迟解锁

// 获取窗口实例
private async ensureHostWindow() {
  if (!this.hostWindow) {
    try {
      this.hostWindow = await window.getLastWindow(getContext(this));
    } catch (e) {
      console.error('Failed to get window:', e);
    }
  }
}

// 延迟调度方向切换
private schedulePreferredOrientation(target: window.Orientation, delayMs: number) {
  // 去重：已是目标方向且无待执行任务，跳过
  if (this.appliedOrientation === target && this.orientationTimerId < 0) {
    this.pendingOrientation = undefined;
    return;
  }
  // 去重：已在等待同一方向，跳过
  if (this.pendingOrientation === target && this.orientationTimerId >= 0) {
    return;
  }
  
  // 清除之前的调度
  this.clearOrientationSchedule();
  
  // 设置新的调度
  this.pendingOrientation = target;
  this.orientationTimerId = setTimeout(() => {
    this.orientationTimerId = -1;
    this.pendingOrientation = undefined;
    this.applyPreferredOrientation(target);
  }, delayMs) as number;
}

// 清除方向调度
private clearOrientationSchedule() {
  if (this.orientationTimerId >= 0) {
    clearTimeout(this.orientationTimerId);
    this.orientationTimerId = -1;
  }
  this.pendingOrientation = undefined;
}

// 应用方向
private applyPreferredOrientation(orientation: window.Orientation) {
  if (!this.hostWindow) return;
  try {
    this.hostWindow.setPreferredOrientation(orientation);
    this.appliedOrientation = orientation;
  } catch (e) {
    console.error('Failed to set orientation:', e);
  }
}
```

#### 5.3 完整悬停态方向管理流程

```typescript
import display from '@ohos.display';
import { window } from '@kit.ArkUI';

@State private foldStatus: number = Number(display.FoldStatus.FOLD_STATUS_UNKNOWN);
@State private isHoverMode: boolean = false;
@State private isVerticalCrease: boolean = false;
private hostWindow?: window.Window;
private orientationTimerId: number = -1;
private pendingOrientation?: window.Orientation;
private appliedOrientation?: window.Orientation;
private readonly hoverLockDelayMs: number = 120;
private readonly hoverUnlockDelayMs: number = 220;

// 判断四种半折叠状态
private isHoverFoldStatus(status: number): boolean {
  return status === Number(display.FoldStatus.FOLD_STATUS_HALF_FOLDED) ||
    status === Number(display.FoldStatus.FOLD_STATUS_HALF_FOLDED_WITH_SECOND_EXPANDED) ||
    status === Number(display.FoldStatus.FOLD_STATUS_HALF_FOLDED_WITH_SECOND_HALF_FOLDED) ||
    status === Number(display.FoldStatus.FOLD_STATUS_EXPANDED_WITH_SECOND_HALF_FOLDED);
}

aboutToAppear() {
  this.ensureHostWindow();
  this.bindFoldListeners();
}

aboutToDisappear() {
  this.unbindFoldListeners();
  this.clearOrientationSchedule();
  // 页面退出时恢复自动旋转
  this.applyPreferredOrientation(window.Orientation.AUTO_ROTATION);
}

private bindFoldListeners() {
  try {
    display.on('foldStatusChange', (status) => {
      this.foldStatus = Number(status);
      this.updateFoldLayoutState();
    });
  } catch (_) {}
}

private unbindFoldListeners() {
  try {
    display.off('foldStatusChange');
  } catch (_) {}
}

private updateFoldLayoutState() {
  if (!display.isFoldable()) {
    this.resetHoverLayoutState();
    return;
  }
  
  const foldStatus = Number(display.getFoldStatus());
  
  // 判断是否进入悬停态
  if (!this.isHoverFoldStatus(foldStatus)) {
    this.resetHoverLayoutState();
    return;
  }
  
  // 获取折痕区域并判断折痕方向
  const creaseRegion = display.getCurrentFoldCreaseRegion();
  if (!creaseRegion || creaseRegion.creaseRects.length === 0) {
    this.resetHoverLayoutState();
    return;
  }
  
  const rect = creaseRegion.creaseRects[0];
  const widthPx = Math.abs(rect.width);
  const heightPx = Math.abs(rect.height);
  const axisRatioThreshold = 1.35;
  
  // 折痕方向判断（此处为简化示意，仅展示第一级轴比判定）
  // 生产环境应使用三级判定算法：轴比阈值 → 几何评分 → 方向组兜底
  // 详见 crease_avoidance.md 步骤 3 和 bug-fix-cases.md 场景 4
  if (heightPx >= widthPx * axisRatioThreshold) {
    this.isVerticalCrease = true;  // 竖折痕
  } else if (widthPx >= heightPx * axisRatioThreshold) {
    this.isVerticalCrease = false; // 横折痕
  } else {
    // 宽高接近，沿用当前状态
    return;
  }
  
  // 计算目标方向
  const defaultDisplay = display.getDefaultDisplaySync();
  const rootWidthVp = defaultDisplay.width / defaultDisplay.densityPixels;
  const rootHeightVp = defaultDisplay.height / defaultDisplay.densityPixels;
  const targetOrientation = this.getTargetHoverOrientation(
    this.isVerticalCrease, rootWidthVp, rootHeightVp
  );
  
  // 进入悬停态，延迟上锁
  this.isHoverMode = true;
  this.schedulePreferredOrientation(targetOrientation, this.hoverLockDelayMs);
}

private resetHoverLayoutState() {
  const wasHover = this.isHoverMode;
  this.isHoverMode = false;
  
  // 退出悬停态，延迟解锁
  if (wasHover) {
    this.schedulePreferredOrientation(
      window.Orientation.AUTO_ROTATION, 
      this.hoverUnlockDelayMs
    );
  }
}
```

#### 5.4 关键要点总结

| 要点 | 说明 | 错误做法 |
|------|------|---------|
| **方向基于折痕轴** | 竖折痕翻转 90 度到横屏，横折痕保持竖屏 | 仅根据 `rootWidth > rootHeight` 判断 |
| **延迟调度** | 进入延迟 ~120ms，退出延迟 ~220ms | 在回调中直接调用 `setPreferredOrientation` |
| **去重保护** | 目标方向与当前一致时跳过 | 多次重复设置同一方向 |
| **状态变化时清理** | `foldStatus` 变化时先清理旧方向锁 | 不清理导致方向锁冲突 |
| **页面退出恢复** | `aboutToDisappear` 中恢复 `AUTO_ROTATION` | 不恢复导致影响后续页面 |
| **悬停中不改方向** | 悬停中仅允许重算分界线和区域尺寸 | 悬停中反复切换方向 |

#### 5.5 常见问题排查

| 问题现象 | 可能原因 | 排查方向 |
|---------|---------|---------|
| 悬停态左右分屏而非上下分屏 | 竖折痕未翻转 90 度 | 检查 `getTargetHoverOrientation` 逻辑 |
| 方向反复切换、界面抖动 | 多处回调竞争设置方向 | 检查是否使用延迟调度 |
| 退出悬停后方向异常 | 未恢复 `AUTO_ROTATION` | 检查 `aboutToDisappear` 清理逻辑 |
| 悬停态黑屏 | 方向已切换但分区按旧轴计算 | 检查方向和分区是否使用同一轴结论 |

## 多段折叠形态适配建议

### 基于断点而非设备形态

不同折叠屏设备（双折叠、三折叠、阔折叠等）的屏幕尺寸差异显著，应使用统一的断点体系进行布局判断，避免与具体机型绑定。

推荐做法：

1. 使用运行时窗口宽度做断点分层（sm / md / lg）
2. 使用高宽比做补充判断，避免单一宽度误判
3. 页面布局的判断条件**不推荐**使用 `deviceType`、`isFoldable`、`foldStatus` 等接口，否则会导致不同屏幕尺寸折叠屏下的布局混乱

> 来源：[折叠屏应用开发 - 界面开发](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-foldable-guide)、[三折叠应用开发](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-matext-guide)

### 三折叠 F/M/G 形态差异化布局

三折叠设备存在 9 种折叠状态（左右两块折叠屏各 3 种状态的组合），对应用呈现为三种主要形态：

| 形态 | FoldStatus | 典型窗口尺寸 | 断点 | 推荐布局 | 方向策略 |
| --- | --- | --- | --- | --- | --- |
| **F 态**（折叠态） | FOLD_STATUS_FOLDED | ~350 × 776vp | sm × lg | 单栏紧凑，核心内容优先 | 锁定竖屏 PORTRAIT |
| **M 态**（双屏态） | FOLD_STATUS_EXPANDED | ~712 × 776vp | md × md | 双栏过渡，平衡信息密度 | 锁定竖屏 PORTRAIT |
| **G 态**（全展态） | FOLD_STATUS_EXPANDED_WITH_SECOND_EXPANDED | ~1107 × 776vp | lg × md | 三栏高信息密度 | 跟随桌面方向 AUTO_ROTATION |

**关键原则**：F/M/G 形态标签仅作为语义入口，实际布局空间以运行时断点和窗口尺寸判定，不硬编码设备尺寸。

```typescript
@StorageProp('currentWidthBreakpoint') currentBreakpoint: string = 'sm';

build() {
  if (this.currentBreakpoint === 'sm') {
    // F 态：单栏紧凑布局
    SingleColumnLayout({ priority: 'core' })
  } else if (this.currentBreakpoint === 'md') {
    // M 态：双栏过渡布局
    TwoColumnLayout()
  } else {
    // G 态：三栏高密度布局
    ThreeColumnLayout()
  }
}
```

**方向策略切换**：

```typescript
private onFoldStatusChange: Callback<display.FoldStatus> = (data: display.FoldStatus) => {
  if (data === display.FoldStatus.FOLD_STATUS_EXPANDED_WITH_SECOND_EXPANDED) {
    // G 态：跟随桌面方向
    windowClass.setPreferredOrientation(window.Orientation.AUTO_ROTATION);
  } else {
    // F/M 态：锁定竖屏
    windowClass.setPreferredOrientation(window.Orientation.PORTRAIT);
  }
};
```

> 来源：[三折叠应用开发 - 界面开发](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-matext-guide)

### 特殊比例折叠屏内外屏差异化适配

用于内外屏比例差异显著的折叠屏（如 Pura X：1:1 方形外屏 + 16:10 矮胖内屏）：

#### 屏幕特征

| 屏幕 | 典型比例 | 典型尺寸(vp) | 断点 | 设计原则 |
| --- | --- | --- | --- | --- |
| 外屏 | 1:1 方形 | ~326 × 326 | sm × md | 核心信息优先，导航简化 |
| 内屏 | 16:10 宽屏 | ~440 × 707 | sm × lg | 扩展信息，分栏提升密度 |

**外屏限制**：
- 仅支持全屏模式，不支持分屏和悬浮窗
- 不支持旋转，仅支持反向横屏（270度）
- 应隐藏状态栏和导航栏，将空间释放给内容区

#### 双通道判断当前屏幕

使用 `getFoldStatus()` + `windowSizeChange` 双通道判断当前使用的是内屏还是外屏：

```typescript
@State isOuterScreen: boolean = false;

aboutToAppear() {
  // 同步获取初始状态
  this.updateScreenState(display.getFoldStatus());

  // 监听后续变化
  display.on('foldStatusChange', (status: display.FoldStatus) => {
    this.updateScreenState(status);
  });
}

private updateScreenState(foldStatus: display.FoldStatus): void {
  // FOLD_STATUS_FOLDED 表示外屏显示
  this.isOuterScreen = (foldStatus === display.FoldStatus.FOLD_STATUS_FOLDED);
}
```

#### 小方屏断点标识

Pura X 外屏的断点组合为**横向断点 sm + 纵向断点 md**，可与普通折叠屏外屏（横向 sm + 纵向 lg）区分：

```typescript
@StorageProp('currentWidthBreakpoint') currentWidthBreakpoint: string = 'sm';
@StorageProp('currentHeightBreakpoint') currentHeightBreakpoint: string = 'sm';

// Pura X 外屏：width=sm + height=md（1:1 方形小屏）
// 普通折叠屏外屏：width=sm + height=lg（窄长屏）
private get isSmallSquareScreen(): boolean {
  return this.currentWidthBreakpoint === 'sm' && this.currentHeightBreakpoint === 'md';
}
```

#### 内外屏差异化布局策略

```typescript
build() {
  if (this.isOuterScreen) {
    // 外屏策略：核心信息优先
    Column() {
      // 简化为底部 Tab 导航
      Tabs({ barPosition: BarPosition.End }) {
        TabContent() { CoreContent() }
          .tabBar('首页')
        TabContent() { CoreMessages() }
          .tabBar('消息')
      }
    }
  } else {
    // 内屏策略：利用宽屏空间
    Row() {
      // 侧边导航 + 内容区分栏
      Navigation() {
        SideBar()
      }
      .width('30%')

      Column() {
        ExtendedContent()
        DetailedInfo()
      }
      .layoutWeight(1)
    }
  }
}
```

**外屏布局要点**：
- 仅展示核心信息，裁剪或隐藏非必要内容
- 导航简化为底部 Tab，减少层级深度
- 避免内容溢出或布局拥挤

**内屏布局要点**：
- 利用宽屏空间展示扩展信息
- 多栏布局提升信息密度
- 导航使用侧边栏 + 内容区
- 支持分屏和悬浮窗模式

> 来源：[Pura X阔折叠应用开发](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-purax-guide)、[折叠屏应用开发](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-foldable-guide)

#### 小方屏沉浸式浏览（滑动隐藏标题栏和 Tab 栏）

Pura X 外屏仅有 326 × 326 vp，标题栏和底部 Tab 栏会占用大量内容空间。在滚动浏览时，应**渐进隐藏标题栏和 Tab 栏**以释放空间，滚动回顶时恢复。这是 Pura X 小方屏的重点优化手段，普通折叠屏外屏空间足够不需要此处理。

> 竖折叠设备悬停态分屏后，下半屏（操作区）的空间同样有限，可参考类似思路优化操作区空间利用。

**交互逻辑**：

| 操作 | 行为 |
|------|------|
| 上滑 | 标题栏高度和透明度在 100vp 滚动距离内渐进缩小到 0 |
| 下滑 | 以 300ms 动画恢复标题栏和 Tab 栏到完整高度 |

**避让区高度获取**：

标题栏和 Tab 栏的初始高度需要包含系统避让区（状态栏、导航指示条），通过窗口避让区接口动态获取：

```typescript
import { window } from '@kit.ArkUI';

@State topAvoidHeight: number = 0;
@State bottomAvoidHeight: number = 0;

// 初始高度 = 组件自身高度 + 系统避让区高度
@StorageLink('topBarHeight') topBarHeight: number = 78 + this.topAvoidHeight;
@State bottomBarHeight: number = 56 + this.bottomAvoidHeight;

aboutToAppear() {
  const win = window.findWindow('...');
  const topAvoid = win.getWindowAvoidArea(window.AvoidAreaType.TYPE_SYSTEM);
  this.topAvoidHeight = px2vp(topAvoid.topRect.height);
  const bottomAvoid = win.getWindowAvoidArea(window.AvoidAreaType.TYPE_NAVIGATION_INDICATOR);
  this.bottomAvoidHeight = px2vp(bottomAvoid.bottomRect.height);

  // Pura X 外屏底部导航指示条高度为 0（无系统导航栏），需动态查询而非硬编码
  this.topBarHeight = 78 + this.topAvoidHeight;
  this.bottomBarHeight = 56 + this.bottomAvoidHeight;
}
```

**实现代码**：

```typescript
@State barOpacity: number = 1;
@State currentYOffset: number = 0;
@State hideDone: boolean = false;
@State isHiding: boolean = false;

// 在 Scroll 组件的回调中处理
.onScrollFrameBegin((offset: number) => {
  // 仅在小方屏生效
  if (this.currentWidthBreakpoint !== 'sm' || this.currentHeightBreakpoint !== 'md') {
    return { offsetRemain: offset };
  }

  // 上滑 → 隐藏
  if (offset > 0 && !this.hideDone) {
    this.currentYOffset += offset;
    if (this.currentYOffset <= 100) {
      this.bottomBarHeight = (56 + this.bottomAvoidHeight) * (1 - this.currentYOffset / 100);
      this.topBarHeight = (78 + this.topAvoidHeight) * (1 - this.currentYOffset / 100);
      this.barOpacity = 1 - this.currentYOffset / 100;
    } else {
      this.topBarHeight = 0;
      this.bottomBarHeight = 0;
      this.barOpacity = 0;
      this.hideDone = true;
    }
    this.isHiding = true;
  }

  // 下滑 → 恢复
  if (offset < 0 && this.isHiding) {
    this.hideDone = false;
    this.getUIContext().animateTo({ duration: 300 }, () => {
      this.bottomBarHeight = 56 + this.bottomAvoidHeight;
      this.topBarHeight = 78 + this.topAvoidHeight;
      this.barOpacity = 1;
      this.currentYOffset = 0;
      this.isHiding = false;
    });
  }
  return { offsetRemain: offset };
})
```

**关键要点**：

- 隐藏/恢复仅在小方屏（`width=sm + height=md`）生效，其他屏幕尺寸不触发
- 避让区高度通过 `getWindowAvoidArea` 动态获取，不硬编码（Pura X 外屏底部导航指示条高度为 0）
- 渐进隐藏范围 100vp、恢复动画 300ms 为官方推荐值
- 页面内容区域高度应绑定 `topBarHeight` 和 `bottomBarHeight`，随隐藏/恢复动态调整

> 来源：[Pura X阔折叠应用开发](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-purax-guide)、[小方形屏适配建议](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-multi-device-screen-layout)

## 验证清单

### 基础功能
- 可正确进入/退出悬停态
- 上半屏显示浏览型内容，下半屏承载交互操作
- 折痕区域无关键内容和交互控件

### 屏幕旋转（自定义实现必检）
- 竖折痕设备悬停态旋转 90 度到横屏，分屏为上下布局
- 横折痕设备悬停态保持竖屏，分屏为上下布局
- 方向切换无抖动、无反复翻转
- 退出悬停态后方向恢复 `AUTO_ROTATION`
- 页面退出后方向已恢复，不影响后续页面

### 多形态适配
- 多形态切换后布局稳定，无重叠遮挡
- 内外屏切换后结构稳定，无关键内容缺失
- F/M/G 态布局差异化：F 单栏、M 双栏、G 三栏
- 外屏核心信息优先，内屏分栏提升信息密度

### 其他
- 全屏/分屏/悬浮窗切换后布局无重叠或裁切
- 页面退出后监听已回收

## 参考来源

- [示例代码 - 实现折叠屏悬停态](https://gitcode.com/harmonyos_samples/FoldedHover)
- [三折叠应用开发](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-matext-guide)
- [Pura X阔折叠应用开发](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-purax-guide)
- [折叠屏应用开发](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-foldable-guide)
