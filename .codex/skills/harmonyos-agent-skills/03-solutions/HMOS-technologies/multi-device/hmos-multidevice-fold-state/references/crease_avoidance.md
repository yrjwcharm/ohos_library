# 折痕避让指南

## 目标

在折叠设备悬停态下，确保关键内容与交互控件不落在折痕区域，保证可读性和可操作性。

## 背景

折叠屏设备半折后立在桌面上即进入"悬停态"。此时中间折痕区域存在两个问题：

1. **操作困难**：折痕处触摸精度低，点击和滑动容易误触
2. **内容变形**：弯折区域显示内容会产生视觉畸变

长视频、短视频、直播、通话、会议、拍摄类应用涉及悬停态时，必须对折痕区域进行避让适配。

> 来源：[折叠屏应用开发 - UX体验建议](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-foldable-guide)、[应用UX体验建议](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/experience-suggestions-ux)

## 方案选择

系统提供两种内置组件可自动完成折痕避让，只有自定义实现悬停态时才需要手动处理：

| 方案 | 避让方式 | 适用场景 |
| --- | --- | --- |
| FolderStack | 自动避让 | 视频播放等交互少的场景 |
| FoldSplitContainer | 自动避让 | 固定分栏场景（如游戏画面+操作区） |
| 自定义实现 | 手动获取折痕区域并计算布局 | 需要自定义悬停触发条件或旋转策略 |

### 如何在 FolderStack 和 FoldSplitContainer 之间选择

两者都能自动避让折痕，核心区别在于布局模型：

- **FolderStack 基于 Stack（层叠布局）**：组件之间可以互相叠加，上半屏组件覆盖下半屏的同一区域。适合"一个大画面 + 若干悬浮控件"的场景，例如视频全屏播放——画面占满上半屏，播放控制条和返回按钮悬浮在下半屏。
- **FoldSplitContainer 基于分栏布局**：primary 和 secondary 各自拥有独立的矩形区域，互不重叠，且支持三种折叠态分别配置分栏比例。适合"两个区域各有独立内容"的场景，例如游戏——上半屏显示游戏画面，下半屏显示独立的操作面板或信息栏。

简单判断：如果上下两部分内容需要叠加显示，选 FolderStack；如果需要严格分栏、互不遮挡，选 FoldSplitContainer。

## 方案一：自动避让（FolderStack / FoldSplitContainer）

使用 FolderStack 或 FoldSplitContainer 时，折痕避让由框架自动完成，开发者无需关心折痕位置。

### FolderStack 用法

将需要显示在上半屏的组件 ID 注册到 `upperItems` 数组中，其余组件自动堆叠在下半屏，折痕区域自动避让。

```typescript
// FolderStack：upperItems 中的组件自动移到上半屏，其余组件在下半屏
FolderStack({ upperItems: ['upper'] }) {
  VideoPlayView({ avPlayerUtil: this.avPlayerUtil })
    .id('upper')

  VideoControlView({ avPlayerUtil: this.avPlayerUtil })

  BackTitleView({ title: Const.PAGE_TITLES[0] })
}
.enableAnimation(true)   // 开启进入/退出悬停态的过渡动效，默认 true
.autoHalfFold(true)      // 半折叠态自动旋转，默认 true
```

> 注意：FolderStack 需要撑满页面全屏，如果不撑满则只作为普通 Stack 使用。该组件的悬停能力仅针对双折叠设备生效。

> 来源：[FolderStack API 参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-folderstack)、[折叠屏悬停态最佳实践](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-folded-hover)

### FoldSplitContainer 用法

将上下屏的组件分别注册到 `primary` 和 `secondary` 回调中，进入悬停态时自动避让折痕区域。

```typescript
import { FoldSplitContainer } from '@kit.ArkUI';

FoldSplitContainer({
  primary: () => {
    this.primaryArea()   // 主要区域（上半屏）
  },
  secondary: () => {
    this.secondaryArea() // 次要区域（下半屏）
  }
})
```

> 来源：[FoldSplitContainer API 参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-foldsplitcontainer)、[折叠屏悬停态最佳实践](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-folded-hover)

## 方案二：手动避让（自定义实现悬停态）

当需要自定义悬停触发条件或窗口旋转策略时，需要手动获取折痕区域并计算布局。

### 相关 API

| API | 用途 |
| --- | --- |
| `display.isFoldable()` | 检查设备是否为可折叠设备 |
| `display.getCurrentFoldCreaseRegion()` | 获取当前折痕矩形的位置和大小（全局坐标，单位 px） |
| `display.convertGlobalToRelativeCoordinate()` | 将全局坐标转换为相对坐标 |
| `display.on('foldStatusChange')` | 监听折叠状态变化 |
| `display.off('foldStatusChange')` | 取消监听 |
| `UIContext.px2vp()` | 像素单位转 vp |

> 来源：[Display API 参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display)、[屏幕属性开发指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/screenproperty-guideline)

### 步骤 1：获取折痕区域

通过 `getCurrentFoldCreaseRegion()` 获取折痕区域的位置和大小，并转换为 vp 单位：

```typescript
import display from '@ohos.display';

static getFoldCreaseRegion(): void {
  try {
    if (display.isFoldable()) {
      let foldRegion: display.FoldCreaseRegion = display.getCurrentFoldCreaseRegion();
      let rect: display.Rect = foldRegion.creaseRects[0];
      // creaseRegion[0] = 折痕上边界的 vp 值（上半屏高度）
      // creaseRegion[1] = 折痕区域的 vp 高度
      let creaseRegion: number[] = [uiContext!.px2vp(rect.top), uiContext!.px2vp(rect.height)];
      AppStorage.setOrCreate('creaseRegion', creaseRegion);
    }
  } catch (error) {
    hilog.error(0x0000, TAG, `getFoldCreaseRegion error: ${error.code}, message: ${error.message}`);
  }
}
```

> 来源：[折叠屏悬停态最佳实践 - 获取折痕区域](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-folded-hover)、示例代码 [DisplayUtil.ets](https://gitcode.com/harmonyos_samples/FoldedHover/blob/master/entry/src/main/ets/common/utils/DisplayUtil.ets)

### 步骤 2：坐标转换（全局坐标 → 页面相对坐标）

`getCurrentFoldCreaseRegion()` 返回的是全局屏幕坐标。当页面不是全屏（如分屏、悬浮窗）或页面根节点有偏移时，需要通过 `convertGlobalToRelativeCoordinate` 转换为页面相对坐标：

```typescript
private recalculateCreaseBand(rootGlobalYVp: number, rootHeightVp: number): void {
  const region = display.getCurrentFoldCreaseRegion();
  if (!region || !region.creaseRects || region.creaseRects.length === 0) {
    this.hasCrease = false;
    this.creaseHeightVp = 0;
    // 无折痕数据时回退到屏幕中心线
    this.splitLineVp = rootHeightVp > 0 ? rootHeightVp * 0.5 : 0;
    return;
  }

  const rect = region.creaseRects[0];
  // 全局坐标转相对坐标
  const p1 = display.convertGlobalToRelativeCoordinate({ x: rect.left, y: rect.top }, region.displayId);
  const p2 = display.convertGlobalToRelativeCoordinate(
    { x: rect.left + rect.width, y: rect.top + rect.height }, region.displayId
  );

  const mappedTopVp = px2vp(Math.min(p1.position.y, p2.position.y));
  const mappedBottomVp = px2vp(Math.max(p1.position.y, p2.position.y));
  const topInRootVp = mappedTopVp - rootGlobalYVp;

  this.creaseHeightVp = mappedBottomVp - mappedTopVp;
  this.splitLineVp = topInRootVp + this.creaseHeightVp * 0.5;
  this.hasCrease = true;
}
```

> 来源：[Display API 参考 - convertGlobalToRelativeCoordinate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display)

### 步骤 3：折痕方向检测（双向评分算法）

不同设备的折痕方向不同（水平或垂直），需要动态检测。通过宽高比初筛 + 几何评分比较判断折痕方向：

```typescript
// 第一级：物理像素宽高比判断（阈值 1.35）
private detectCreaseDirection(rawRectPx: { width: number; height: number }): boolean | null {
  const widthPx = Math.abs(rawRectPx.width);
  const heightPx = Math.abs(rawRectPx.height);
  const axisRatioThreshold = 1.35;

  if (heightPx >= widthPx * axisRatioThreshold) return true;   // 高 > 宽 → 垂直折痕
  if (widthPx >= heightPx * axisRatioThreshold) return false;   // 宽 > 高 → 水平折痕
  return null; // 宽高接近，进入第二级评分
}

// 第二级：几何评分比较
private scoreHorizontalBand(topVp: number, heightVp: number, rootWidthVp: number, rootHeightVp: number): number {
  const coverageRatio = Math.min(rootWidthVp / Math.max(1, rootWidthVp), 1.6);
  const thicknessRatio = Math.min(heightVp / Math.max(1, rootHeightVp), 1);
  const centerY = topVp + heightVp / 2;
  const centerDistanceRatio = Math.abs(centerY - rootHeightVp / 2) / Math.max(1, rootHeightVp / 2);

  let score = coverageRatio * 2.2 - thicknessRatio * 3.2 - centerDistanceRatio * 0.35;
  if (topVp <= 1 || topVp + heightVp >= rootHeightVp - 1) score -= 0.5;
  return score;
}
```

**方向锁定机制**：检测到方向后应锁定，避免折叠过程中因折痕数据微小变化导致方向抖动。仅在完全展开或完全折叠时重置方向锁定。

### 步骤 4：折痕高度安全钳位

折痕数据可能出现异常值（过大），需要对折痕高度进行安全钳位：

```typescript
private clampCreaseThickness(creaseHeightVp: number, screenDimensionVp: number): number {
  const maxThickness = screenDimensionVp * 0.35;
  if (creaseHeightVp > maxThickness) {
    // 异常值：使用折痕物理短边作为安全高度
    return Math.min(creaseHeightVp, 8); // 8vp 为折痕物理短边估算值
  }
  return creaseHeightVp;
}
```

**原则**：折痕区域不超过屏幕对应维度的 35%。超过时取折痕物理短边作为安全高度。

### 步骤 5：内容安全间距

折痕区域两侧的内容需要额外的安全间距，防止内容紧贴折痕：

- **上方内容**：底边距折痕上边界 ≥ **16vp**
- **下方内容**：顶边距折痕下边界 ≥ **40vp**

```typescript
// 上分区下边界 = 折痕上边界 - 16vp（内容安全间距）
const upperContentBottomVp = creaseTopVp - 16;
// 下分区上边界 = 折痕下边界 + 40vp（内容安全间距）
const lowerContentTopVp = creaseBottomVp + 40;
```

> 注意：16vp / 40vp 是分区**内部的内容保护间距**，不是分区锚点。分区锚点始终以折痕边界为准。

### 步骤 6：无折痕数据回退

当 `getCurrentFoldCreaseRegion()` 返回空数据时，仍需进入悬停态布局，使用屏幕中心线作为分割：

```typescript
if (!hasCreaseData) {
  // 回退方案：屏幕 50% 位置作为分割线
  splitLineVp = rootHeightVp * 0.5;
  creaseHeightVp = 0; // 无折痕区域
}
```

### 步骤 7：按折痕边界分配布局空间

布局分区规则：

- **上半屏**：从屏幕顶部到折痕上边界
- **折痕区域**：不放置任何内容或交互控件
- **下半屏**：从折痕下边界到屏幕底部

```typescript
@State creaseRegion: number[] = [0, 0]

build() {
  Stack() {
    if (this.isHover) {
      Column() {
        // 上半屏：高度 = creaseRegion[0]（折痕上边界）
        VideoPlayView()
          .height(this.creaseRegion[0])

        // 折痕区域：用 Blank 占位，不放置任何可见内容
        Blank()
          .height(this.creaseRegion[1])

        // 下半屏：占据剩余空间
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

> 来源：[折叠屏悬停态最佳实践 - 调整布局](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-folded-hover)

### 步骤 8：使用 position 精确定位

对于需要精确控制位置的组件（如悬浮控制按钮），根据折痕区域计算 y 坐标：

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

> 来源：示例代码 [VideoPlayView.ets](https://gitcode.com/harmonyos_samples/FoldedHover/blob/master/entry/src/main/ets/view/basicview/VideoPlayView.ets)、[BackTitleView.ets](https://gitcode.com/harmonyos_samples/FoldedHover/blob/master/entry/src/main/ets/view/basicview/BackTitleView.ets)

### 步骤 9：状态变化时重新获取折痕区域

折叠状态变化时，折痕位置可能改变，需要重新获取并刷新布局：

```typescript
@State isHover: boolean = false

private onFoldStatusChange: Callback<display.FoldStatus> = (data: display.FoldStatus) => {
  try {
    let orientation: display.Orientation = display.getDefaultDisplaySync().orientation;
    // 悬停态判断：半折叠 + 横屏
    if (data === display.FoldStatus.FOLD_STATUS_HALF_FOLDED &&
      (orientation === display.Orientation.LANDSCAPE ||
        orientation === display.Orientation.LANDSCAPE_INVERTED)) {
      this.isHover = true;
      // 重新获取折痕区域
      DisplayUtil.getFoldCreaseRegion();
    } else {
      this.isHover = false;
    }
  } catch (error) {
    hilog.error(0x0000, TAG, `onFoldStatusChange error: ${error.code}`);
  }
};
```

> 来源：[折叠屏悬停态最佳实践 - 监听悬停态](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-folded-hover)、示例代码 [Index.ets](https://gitcode.com/harmonyos_samples/FoldedHover/blob/master/entry/src/main/ets/pages/Index.ets)

### 步骤 10：注册和取消监听

在页面生命周期中注册和取消折叠状态监听：

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

> 注意：退出应用或退出监听页面时，必须调用 `display.off('foldStatusChange')` 取消监听，避免出现问题。

> 来源：[屏幕属性开发指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/screenproperty-guideline)

## 验证清单

- 悬停态下关键按钮、输入框不在折痕区域内
- 上下半屏内容不与折痕区域重叠
- 折展切换后避让范围正确刷新，无布局跳变
- 页面根节点有 globalPosition 偏移时坐标转换正确
- 折痕方向检测正确处理水平和垂直两种情况
- 折痕高度异常时安全钳位生效（不超过屏幕 35%）
- 无折痕数据时以屏幕中心线分割，上下各占 50%
- 上方内容底边距折痕 ≥ 16vp，下方内容顶边距折痕 ≥ 40vp
- 页面退出后监听已正确回收

## 参考来源

- [示例代码 - 实现折叠屏悬停态](https://gitcode.com/harmonyos_samples/FoldedHover)
- [Display API 参考 - convertGlobalToRelativeCoordinate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display)
- [折叠屏应用开发](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-foldable-guide)
