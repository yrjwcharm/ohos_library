# 折展问题修复场景库

- [场景 1：悬停态布局未生效](#场景-1悬停态布局未生效)
- [场景 2：方向反复切换或偶发反向](#场景-2方向反复切换或偶发反向)
- [场景 3：竖折痕左右折叠时未按语义翻转 90 度](#场景-3竖折痕左右折叠时未按语义翻转-90-度)
- [场景 4：固定竖折痕设备被矩形假象误判为横折痕](#场景-4固定竖折痕设备被矩形假象误判为横折痕)
- [场景 5：折痕避让偏移或跨折痕](#场景-5折痕避让偏移或跨折痕)
- [场景 6：悬停态黑屏（布局只剩 Blank）](#场景-6悬停态黑屏布局只剩-blank)
- [场景 7：开合后连续性断档](#场景-7开合后连续性断档)
- [场景 8：生命周期回收缺失导致串态](#场景-8生命周期回收缺失导致串态)

---

## 场景 1：悬停态布局未生效

### 问题描述

折叠到半折叠（HALF_FOLDED）后仍沿用常态单屏布局，关键内容或操作区跨折痕，导致可用性下降。

典型表现：
- 进入悬停态后，页面仍显示单栏布局，没有分屏展示区与操作区。
- `dumpLayout` 中没有出现分屏容器，内容仍以全屏宽度排列。

### 根因分析

- **缺少折展状态监听入口**：未注册 `foldStatusChange` / `foldDisplayModeChange`，或注册后回调为空。
- **悬停态与常态布局分支未拆分**：即使有监听，`build()` 中没有根据 `isHoverMode` 条件分发不同的布局结构。
- **仅用宽度阈值判断多栏**：仅依赖 `pageWidth >= 600` 区分单栏/双栏，无法识别悬停态。

**Bad case：仅靠宽度阈值，无折展感知**

```typescript
// ❌ 只根据宽度阈值切换单栏/双栏，完全不感知折叠状态
@State pageWidth: number = 0;

build() {
  if (this.pageWidth >= 600) {
    this.DualPaneLayout()   // 仅基于宽度，无法命中悬停分屏
  } else {
    this.SinglePaneLayout()
  }
}
.onAreaChange((_: Area, newArea: Area) => {
  this.pageWidth = Number(newArea.width);
})
```

### 通用修复方案

建立统一折展状态入口，为悬停态单独提供分屏结构。

**Good case：完整折展状态检测 + 悬停分屏**

```typescript
import display from '@ohos.display';
import { window } from '@kit.ArkUI';

@State foldStatus: number = Number(display.FoldStatus.FOLD_STATUS_UNKNOWN);
@State foldDisplayMode: number = Number(display.FoldDisplayMode.FOLD_DISPLAY_MODE_UNKNOWN);
@State isHoverMode: boolean = false;
@State isVerticalCrease: boolean = false;
private hostWindow?: window.Window;

// 判断四种半折叠状态
private isHoverFoldStatus(status: number): boolean {
  return status === Number(display.FoldStatus.FOLD_STATUS_HALF_FOLDED) ||
    status === Number(display.FoldStatus.FOLD_STATUS_HALF_FOLDED_WITH_SECOND_EXPANDED) ||
    status === Number(display.FoldStatus.FOLD_STATUS_HALF_FOLDED_WITH_SECOND_HALF_FOLDED) ||
    status === Number(display.FoldStatus.FOLD_STATUS_EXPANDED_WITH_SECOND_HALF_FOLDED);
}

private isSingleScreenFoldDisplayMode(mode: number): boolean {
  return mode === Number(display.FoldDisplayMode.FOLD_DISPLAY_MODE_MAIN) ||
    mode === Number(display.FoldDisplayMode.FOLD_DISPLAY_MODE_SUB);
}

aboutToAppear() {
  this.ensureHostWindow();
  this.bindFoldListeners();
  this.updateFoldLayoutState();
}

aboutToDisappear() {
  this.unbindFoldListeners();
  this.applyPreferredOrientation(window.Orientation.AUTO_ROTATION);
}

private bindFoldListeners() {
  try {
    display.on('foldStatusChange', (status) => {
      this.foldStatus = Number(status);
      this.updateFoldLayoutState();
    });
    display.on('foldDisplayModeChange', (mode) => {
      this.foldDisplayMode = Number(mode);
      this.updateFoldLayoutState();
    });
  } catch (_) {}
}

private updateFoldLayoutState() {
  if (!display.isFoldable()) {
    this.resetHoverLayoutState();
    return;
  }
  const foldStatus = Number(display.getFoldStatus());
  const foldDisplayMode = Number(display.getFoldDisplayMode());
  if (this.isSingleScreenFoldDisplayMode(foldDisplayMode) || !this.isHoverFoldStatus(foldStatus)) {
    this.resetHoverLayoutState();
    return;
  }
  // ... 获取折痕几何、计算分界线、设置 isHoverMode ...
  this.isHoverMode = true;
  this.applyPreferredOrientation(targetHoverOrientation);
}

build() {
  if (this.isHoverMode) {
    if (this.isVerticalCrease) {
      this.VerticalHoverLayout()   // 左展示右操作
    } else {
      this.HorizontalHoverLayout() // 上展示下操作
    }
  } else {
    this.NormalLayout()
  }
}
```

### 关键要点

| 要点 | 说明 |
|---|---|
| **必须有折展状态监听** | `foldStatusChange` + `foldDisplayModeChange` 是悬停态的统一入口 |
| **悬停态必须有独立布局分支** | `isHoverMode` 控制 build() 分发，不能仅靠宽度阈值 |
| **监听注册与页面生命周期成对** | `aboutToAppear` 注册、`aboutToDisappear` 注销 |
| **悬停态与常态复用业务状态** | 只变更布局承载位置，不改写业务状态机 |

---

## 场景 2：方向反复切换或偶发反向

### 问题描述

进入悬停后方向来回翻转，界面抖动。折展过程中偶发方向与页面语义不一致。

典型表现：
- 进入悬停态时屏幕方向在横屏/竖屏间反复切换。
- 悬停中方向与设计意图不匹配（如本应横屏却显示为竖屏）。

### 根因分析

- **在尺寸变化或多处回调中重复执行方向决策**：`onAreaChange`、`foldStatusChange`、`foldDisplayModeChange` 多个回调都触发 `setPreferredOrientation`，互相覆盖。
- **方向切换无延迟保护**：方向锁和布局刷新同时触发，系统尚未完成旋转就收到新的方向请求。
- **退出悬停时立即解锁**：折叠状态刚变就恢复 `AUTO_ROTATION`，此时窗口尺寸还在变化中。

**Bad case：方向切换无延迟，多处回调竞争**

```typescript
// ❌ 方向决策无延迟，多个回调竞争执行
private updateFoldLayoutState() {
  // ...
  this.hostWindow.setPreferredOrientation(targetOrientation); // 立即执行
  this.isHoverMode = true;
}

// onAreaChange 也在回调中重新计算方向
.onAreaChange(() => {
  this.updateFoldLayoutState(); // 与 foldStatusChange 竞争
})
```

### 通用修复方案

使用延迟调度机制：进入悬停时延迟上锁，退出悬停时延迟解锁，避免与窗口尺寸变化的过渡期冲突。

**Good case：延迟调度 + 去重**

```typescript
private orientationTimerId: number = -1;
private pendingOrientation?: window.Orientation;
private readonly hoverLockDelayMs: number = 120;
private readonly hoverUnlockDelayMs: number = 220;

private schedulePreferredOrientation(target: window.Orientation, delayMs: number) {
  if (this.appliedOrientation === target && this.orientationTimerId < 0) {
    this.pendingOrientation = undefined;
    return; // 已是目标方向且无待执行任务，跳过
  }
  if (this.pendingOrientation === target && this.orientationTimerId >= 0) {
    return; // 已在等待同一方向，跳过
  }
  this.clearOrientationSchedule();
  this.pendingOrientation = target;
  this.orientationTimerId = setTimeout(() => {
    this.orientationTimerId = -1;
    this.pendingOrientation = undefined;
    this.applyPreferredOrientation(target);
  }, delayMs) as number;
}

private clearOrientationSchedule() {
  if (this.orientationTimerId >= 0) {
    clearTimeout(this.orientationTimerId);
    this.orientationTimerId = -1;
  }
  this.pendingOrientation = undefined;
}

// 使用
private updateFoldLayoutState() {
  // ... 悬停态检测 ...
  this.isHoverMode = true;
  this.schedulePreferredOrientation(targetOrientation, this.hoverLockDelayMs);
}

private resetHoverLayoutState() {
  const wasHover = this.isHoverMode;
  this.isHoverMode = false;
  if (wasHover) {
    this.schedulePreferredOrientation(window.Orientation.AUTO_ROTATION, this.hoverUnlockDelayMs);
  }
}

aboutToDisappear() {
  this.clearOrientationSchedule();
  this.applyPreferredOrientation(window.Orientation.AUTO_ROTATION);
}
```

### 关键要点

| 要点 | 说明 |
|---|---|
| **方向切换必须延迟调度** | 锁定延迟 ~120ms，解锁延迟 ~220ms，避免与窗口过渡冲突 |
| **去重保护** | 目标方向与当前一致或已在排队时跳过 |
| **退出时清理定时器** | `aboutToDisappear` 中 `clearTimeout` + 恢复方向 |
| **悬停中不改方向状态** | 悬停中仅允许重算分界线和区域尺寸 |

---

## 场景 3：竖折痕左右折叠时未按语义翻转 90 度

### 问题描述

页面要求"上展示下操作"，但竖折痕进入悬停后仍表现为未翻转方向。同一页面在不同折展路径中，方向有时正确有时回退。

典型表现：
- 竖折痕设备进入悬停后，布局仍为左右分屏，而非期望的上下分屏。
- 折叠→展开→再折叠后方向与首次不一致。

### 根因分析

- **方向决策过度依赖当前 `rootWidth/rootHeight`，未优先绑定折痕轴方向**：当折痕矩形在旋转过程中出现轴互换时，宽度/高度比较结果不稳定。
- **"方向锁一次"被误用为"全生命周期只锁一次"**：同一折展状态变化时没有清理旧方向锁。
- **90 度旋转被跳过**：检测到需要旋转时直接放弃悬停适配，而非执行旋转。

**Bad case：遇到 90 度旋转直接放弃悬停**

```typescript
// ❌ 需要旋转 90 度时直接放弃悬停适配
private updateFoldLayoutState() {
  // ... 折展检测 ...
  const targetOrientation = this.getTargetHoverOrientationGroup(isVerticalCrease, rootW, rootH);
  const currentOrientation = this.getDisplayOrientationGroup();
  const needQuarterTurn = targetOrientation !== currentOrientation;

  if (needQuarterTurn) {
    // 遇到需要 90 度旋转就直接放弃，用户永远看不到竖折痕的悬停分屏
    this.resetHoverLayoutState();
    return;
  }
  this.isHoverMode = true;
  this.applyPreferredOrientation(targetOrientation);
}
```

### 通用修复方案

竖折痕使用翻转 90 度后的语义方向（横屏方向组），不跳过旋转。先根据折痕原始矩形判定折痕轴，再决定方向组。

**Good case：按折痕轴固定映射方向**

```typescript
private isNearSquareRoot(rootWidthVp: number, rootHeightVp: number): boolean {
  if (rootWidthVp <= 0 || rootHeightVp <= 0) return false;
  const ratio = rootWidthVp / rootHeightVp;
  return ratio >= 0.78 && ratio <= 1.28;
}

private getTargetHoverOrientationGroup(isVerticalCrease: boolean,
  rootWidthVp: number, rootHeightVp: number): window.Orientation {
  const isNearSquare = this.isNearSquareRoot(rootWidthVp, rootHeightVp);
  if (isVerticalCrease) {
    // 竖折痕：翻转 90 度后进入横屏方向组
    return isNearSquare ? window.Orientation.AUTO_ROTATION_PORTRAIT
      : window.Orientation.AUTO_ROTATION_LANDSCAPE;
  }
  // 横折痕：保持原方向组
  return isNearSquare ? window.Orientation.AUTO_ROTATION_LANDSCAPE
    : window.Orientation.AUTO_ROTATION_PORTRAIT;
}

private updateFoldLayoutState() {
  // ... 折展检测 ...
  const isVerticalCrease = this.shouldUseVerticalCreaseLayout(/* ... */);
  const targetOrientation = this.getTargetHoverOrientationGroup(isVerticalCrease, rootW, rootH);
  // 不跳过旋转，直接应用目标方向
  this.isHoverMode = true;
  this.isVerticalCrease = isVerticalCrease;
  this.schedulePreferredOrientation(targetOrientation, this.hoverLockDelayMs);
}
```

### 关键要点

| 要点 | 说明 |
|---|---|
| **竖折痕必须翻转 90 度** | 方向组选择基于折痕轴语义，而非当前视口宽高 |
| **不跳过需要旋转的场景** | 需要旋转时先切方向，方向就绪后再渲染分栏 |
| **状态变化时先清理旧方向锁** | `foldStatus / foldDisplayMode / 折痕轴` 变化时重新决策 |
| **页面退出时统一恢复 `AUTO_ROTATION`** | 避免跨页面串态 |

---

## 场景 4：固定竖折痕设备被矩形假象误判为横折痕

### 问题描述

设备物理折痕为竖轴，但 `creaseRect` 在某些姿态下表现为横向宽条（例如 `2232x128`）。页面本应"上展示下操作"，却被误分为左右分栏。

### 根因分析

- **折痕轴仅依赖单次 `width/height` 比较**：旋转过程下 `convertGlobalToRelativeCoordinate` 可能产生轴互换，导致短时误判。
- **未引入设备固定折痕轴约束**：已知竖折痕设备不应因为旋转临时改变轴判定。
- **缺乏旋转稳定性保护**：坐标转换结果在旋转过程中不稳定。

### 通用修复方案

折痕轴判定按"几何评分优先，方向组兜底"执行，并引入评分机制避免单次 width/height 比较误判。

**Good case：多级折痕轴判定**

```typescript
private shouldUseVerticalCreaseLayout(rawRectPx: CreaseRectInfo, rawRectVp: CreaseRectInfo,
  rootWidthVp: number, rootHeightVp: number, contentTopInsetVp: number): boolean {
  const widthPx = Math.abs(rawRectPx.width);
  const heightPx = Math.abs(rawRectPx.height);

  // 第一级：物理像素轴比明确判定（阈值 1.35）
  const axisRatioThreshold = 1.35;
  if (heightPx >= widthPx * axisRatioThreshold) return true;  // 高>宽 → 竖折痕
  if (widthPx >= heightPx * axisRatioThreshold) return false;  // 宽>高 → 横折痕

  // 第二级：几何评分对比（直接 vs 交换后的水平带评分）
  const scores = this.getHorizontalBandScores(rawRectVp, rootWidthVp, rootHeightVp, contentTopInsetVp);
  const scoreDelta = scores.swappedScore - scores.directScore;
  const scoreDecisionThreshold = 0.22;
  if (scoreDelta > scoreDecisionThreshold) return true;
  if (scoreDelta < -scoreDecisionThreshold) return false;

  // 第三级：兜底沿用当前状态或方向组
  return this.isVerticalCrease ||
    this.getCurrentOrientationGroup() === window.Orientation.AUTO_ROTATION_LANDSCAPE;
}

private scoreHorizontalBand(topVp: number, heightVp: number, coverageVp: number,
  rootWidthVp: number, rootHeightVp: number): number {
  if (rootWidthVp <= 0 || rootHeightVp <= 0) return -10000;
  const safeTop = Math.max(0, Math.min(topVp, rootHeightVp));
  const safeHeight = Math.max(1, Math.min(heightVp, rootHeightVp - safeTop));
  // 评分：横向覆盖率高得分，厚度大扣分，偏离中心扣分
  const coverageRatio = Math.max(0, Math.min(coverageVp / rootWidthVp, 1.6));
  const thicknessRatio = Math.max(0, Math.min(safeHeight / rootHeightVp, 1));
  const centerY = safeTop + safeHeight / 2;
  const centerDistanceRatio = Math.abs(centerY - rootHeightVp / 2) / Math.max(1, rootHeightVp / 2);
  let score = coverageRatio * 2.2 - thicknessRatio * 3.2 - centerDistanceRatio * 0.35;
  if (safeTop <= 1 || safeTop + safeHeight >= rootHeightVp - 1) score -= 0.5;
  return score;
}
```

### 关键要点

| 要点 | 说明 |
|---|---|
| **轴比阈值 1.35** | 物理像素比值超过此阈值的轴判定可信，无需进一步计算 |
| **评分机制做二级判定** | 轴比模糊时用几何评分对比，避免误判 |
| **兜底用当前状态** | 无明确判定时沿用上次结果，不轻易翻转轴结论 |
| **坐标转换需加旋转保护** | `convertGlobalToRelativeCoordinate` 在旋转过程中结果不稳定，必要时回退到原始矩形 + root 偏移的同单位换算 |

---

## 场景 5：折痕避让偏移或跨折痕

### 问题描述

分界线偏上/偏下，设备间表现不一致。交互控件落入折痕区域，点击和阅读体验下降。

### 根因分析

- **使用经验比例切分布局，未读取真实折痕几何**：如固定 50% 切分，不读取 `getCurrentFoldCreaseRegion()`。
- **全局坐标与页面坐标混用，未完成坐标映射**：折痕矩形是全局坐标，直接用于页面布局计算导致偏移。
- **将 `16/40 vp` 直接当作分区边界锚点**：安全间距应加在分区内部，不应影响分界线位置。
- **未扣除 root 偏移**：页面根节点的 `globalPosition` 偏移未从折痕坐标中扣减。

**Bad case：无折痕几何感知，固定 50% 切分**

```typescript
// ❌ 不读取折痕几何，固定按 50% 切分
@Builder HorizontalHoverLayout() {
  Column() {
    // 上半屏
    Row().height('50%')
    // 下半屏
    Row().height('50%')
  }
}
```

### 通用修复方案

读取真实折痕几何，完成坐标映射后再计算分界线位置。

**Good case：真实折痕几何 + 坐标映射**

```typescript
// 获取折痕矩形（全局坐标 → 页面相对坐标 → vp 单位）
private recalculateCreaseBand() {
  const foldRegion = display.getCurrentFoldCreaseRegion();
  if (!foldRegion || foldRegion.creaseRects.length === 0) return;

  const creaseRect = foldRegion.creaseRects[0];

  // 全局坐标 → 页面相对坐标
  const relativeRectPx = this.toRelativeCreaseRect(
    new CreaseRectInfo(creaseRect.left, creaseRect.top, creaseRect.width, creaseRect.height),
    foldRegion.displayId
  );

  // px → vp
  const relativeRectVp = new CreaseRectInfo(
    Math.max(0, px2vp(relativeRectPx.left)),
    Math.max(0, px2vp(relativeRectPx.top)),
    Math.max(0, px2vp(relativeRectPx.width)),
    Math.max(0, px2vp(relativeRectPx.height))
  );

  // 根据折痕轴选择水平/垂直分界线
  const creaseBand = this.isVerticalCrease
    ? this.resolveVerticalCreaseBand(relativeRectVp, rootWidthVp, rootHeightVp)
    : this.resolveHorizontalCreaseBand(relativeRectVp, rootWidthVp, rootHeightVp,
        this.safeTopInsetVp, this.safeBottomInsetVp);

  this.creaseLeftVp = creaseBand.left;
  this.creaseTopVp = creaseBand.top;
  this.creaseWidthVp = creaseBand.width;
  this.creaseHeightVp = creaseBand.height;
}

// 坐标映射：全局坐标 → 页面相对坐标（扣除 root 偏移）
private toRelativeCreaseRect(creaseRect: CreaseRectInfo, displayId: number): CreaseRectInfo {
  try {
    const topLeft = display.convertGlobalToRelativeCoordinate(
      new DisplayPoint(creaseRect.left, creaseRect.top), displayId
    );
    const bottomRight = display.convertGlobalToRelativeCoordinate(
      new DisplayPoint(creaseRect.left + creaseRect.width, creaseRect.top + creaseRect.height),
      displayId
    );
    const x1 = topLeft.position.x, y1 = topLeft.position.y;
    const x2 = bottomRight.position.x, y2 = bottomRight.position.y;
    return new CreaseRectInfo(
      Math.min(x1, x2), Math.min(y1, y2),
      Math.abs(x2 - x1), Math.abs(y2 - y1)
    );
  } catch (_) {
    return creaseRect; // 回退
  }
}

// 水平分界线：锚定到屏幕中线（扣除安全区偏移后）
private resolveHorizontalCreaseBand(rawRectVp: CreaseRectInfo, rootWidthVp: number,
  rootHeightVp: number, contentTopInsetVp: number, contentBottomInsetVp: number): CreaseRectInfo {
  const safeTopInset = Math.max(0, contentTopInsetVp);
  const safeBottomInset = Math.max(0, contentBottomInsetVp);
  const physicalDisplayHeightVp = this.getPhysicalDisplayHeightVp();
  // 优先使用物理屏幕高度，不可得时用 rootHeight + 安全区推算
  const fullDisplayHeightVp = physicalDisplayHeightVp > 0
    ? physicalDisplayHeightVp
    : (rootHeightVp + safeTopInset + safeBottomInset);
  // 分界线锚定在物理屏幕中线，扣减安全区顶部偏移
  const targetSplitTopYVp = fullDisplayHeightVp / 2 - safeTopInset;
  return new CreaseRectInfo(0, this.clampValue(targetSplitTopYVp, 0, rootHeightVp), rootWidthVp, 0);
}

@Builder HorizontalHoverLayout() {
  Column() {
    // 上分区：视频区（锚定折痕上边界）
    Row().height(this.creaseTopVp)
    // 下分区：操作区（从折痕下边界到屏幕底部）
    Row().height(this.rootHeightVp - this.creaseTopVp)
  }
}
```

### 关键要点

| 要点 | 说明 |
|---|---|
| **必须读取真实折痕几何** | `getCurrentFoldCreaseRegion()` 而非经验比例 |
| **全局坐标必须转换为页面坐标** | `convertGlobalToRelativeCoordinate` + 扣除 root 偏移 |
| **分界线锚定折痕真实边界** | 上分区下边界 = 折痕上边界，下分区上边界 = 折痕下边界 |
| **`16/40 vp` 仅用于分区内部安全间距** | 不替代分界线定位 |
| **必须扣除安全区偏移** | `safeTopInsetVp` / `safeBottomInsetVp` 影响分界线计算 |

---

## 场景 6：悬停态黑屏（布局只剩 Blank）

### 问题描述

进入悬停后出现整屏黑色，内容区不可见。`dumpLayout` 中仍有页面根节点，但关键组件缺失，仅保留大面积 `Blank`。

### 根因分析

- **折痕轴误判 + 折痕厚度误算叠加**：避让区覆盖主要内容区。
- **方向锁和折痕重算链路不同步**：方向已切换但分区仍按旧轴计算。
- **折痕厚度缺少异常值保险**：误把整屏或大面积内容当成折痕避让区。

### 通用修复方案

对折痕厚度做上下界约束，黑屏问题先归类为"折痕分区计算错误"排查。

```typescript
// 折痕厚度保险：不超过可用高/宽的 35%
private clampCreaseThickness(creaseHeightVp: number, availableHeightVp: number): number {
  const maxThickness = availableHeightVp * 0.35;
  if (creaseHeightVp > maxThickness) {
    // 异常值：回退到薄边估算
    return Math.min(creaseHeightVp, 8); // 8vp 薄边
  }
  return creaseHeightVp;
}

// 方向与分区使用同一轴结论
private updateFoldLayoutState() {
  // ... 折展检测 ...
  const isVerticalCrease = this.shouldUseVerticalCreaseLayout(/* ... */);
  const targetOrientation = this.getTargetHoverOrientationGroup(isVerticalCrease, rootW, rootH);

  // 先清理失效方向锁
  if (this.hoverLockedOrientation !== targetOrientation) {
    this.hoverLockedOrientation = targetOrientation;
  }
  this.schedulePreferredOrientation(this.hoverLockedOrientation, this.hoverLockDelayMs);

  // 折痕分区使用与方向决策同一轴结论
  const creaseBand = isVerticalCrease
    ? this.resolveVerticalCreaseBand(relativeRectVp, rootW, rootH)
    : this.resolveHorizontalCreaseBand(relativeRectVp, rootW, rootH, topInset, bottomInset);

  // 校验：分区后两个区域都必须有正面积
  if (isVerticalCrease && (creaseBand.height <= 0 || creaseBand.width < 0)) {
    this.resetHoverLayoutState();
    return;
  }
  if (!isVerticalCrease && (creaseBand.width <= 0 || creaseBand.height < 0)) {
    this.resetHoverLayoutState();
    return;
  }
  this.isHoverMode = true;
}
```

### 关键要点

| 要点 | 说明 |
|---|---|
| **黑屏先排查折痕分区计算** | 归类为"避让区覆盖主内容" |
| **方向和分区使用同一轴结论** | 避免方向已切但分区仍按旧轴计算 |
| **折痕厚度加保险阈值** | 超过可用区域 35% 时回退到薄边估算 |
| **分区后校验正面积** | 两个分区都必须有有效尺寸，否则回退 |
| **验证必须同时采集截图与布局树** | 截图确认视觉结果，布局树确认组件是否仍在渲染树 |

---

## 场景 7：开合后连续性断档

### 问题描述

折展后出现步骤增加、滚动偏移、输入丢失、媒体进度异常。暂停态在折展后被错误拉起播放，或播放态出现回退跳变。

### 根因分析

- **缺少跨折展状态快照机制**：折展时没有保存视频播放进度、播放/暂停状态。
- **恢复链路只覆盖单一触发点**：仅依赖定时器触发，不监听 `onPrepared` 回调。
- **`autoplay` 抢跑覆盖业务状态**：Video 组件重建后 `autoPlay(true)` 覆盖了暂停态。
- **恢复任务不可重入**：多次重建时丢失状态。

**Bad case：视频无连续性保护**

```typescript
// ❌ 视频组件无跨折展状态保护
Video({ controller: this.videoController })
  .src(this.videoUrl)
  .autoPlay(true)     // 折展后组件重建，autoPlay 覆盖了暂停态
  .loop(true)
  .controls(true)
  // 没有 onPrepared / onStart / onPause / onFinish / onUpdate 回调
```

### 通用修复方案

使用"快照→延迟恢复→prepared 二次恢复"的双触发机制，抑制 autoplay 抢跑。

**Good case：完整视频连续性保护**

```typescript
// --- 状态快照 ---
private videoRestoreTimerId: number = -1;
private pendingVideoRestore: boolean = false;
private pendingVideoRestoreSec: number = 0;
private pendingVideoRestorePlaying: boolean = true;
private pendingVideoRestorePreparedSerialBase: number = 0;
private pendingVideoRestoreCapturedAtMs: number = 0;
private isApplyingVideoRestore: boolean = false;
private playbackAnchorSec: number = 0;
private playbackAnchorTimestampMs: number = 0;
private videoPreparedSerial: number = 0;
private readonly videoRestoreDelayMs: number = 80;
private readonly videoRestorePreparedWaitMs: number = 1400;

// --- 在折展变化回调中捕获快照 ---
private readonly onFoldStatusChange = (status: display.FoldStatus): void => {
  const nextStatus = Number(status);
  if (nextStatus === this.foldStatus) return;
  this.captureVideoContinuitySnapshot(); // 先保存
  this.foldStatus = nextStatus;
  this.updateFoldLayoutState();
  this.scheduleVideoContinuityRestore(); // 延迟恢复
};

// --- 快照：保存进度 + 播放状态 ---
private captureVideoContinuitySnapshot() {
  const snapshotSec = this.shouldKeepVideoPlaying
    ? this.getEstimatedVideoSecond()
    : this.normalizeVideoSecond(this.videoCurrentSec);
  this.pendingVideoRestoreSec = snapshotSec;
  this.pendingVideoRestorePlaying = this.shouldKeepVideoPlaying;
  this.pendingVideoRestorePreparedSerialBase = this.videoPreparedSerial;
  this.pendingVideoRestoreCapturedAtMs = Date.now();
  this.pendingVideoRestore = true;
}

// --- 估算当前播放秒数（折展过渡期间无法直接读取） ---
private getEstimatedVideoSecond(nowMs: number = Date.now()): number {
  if (!this.shouldKeepVideoPlaying || this.playbackAnchorTimestampMs <= 0) {
    return this.normalizeVideoSecond(this.videoCurrentSec);
  }
  const elapsedSec = Math.max(0, nowMs - this.playbackAnchorTimestampMs) / 1000;
  let estimatedSec = this.playbackAnchorSec + elapsedSec;
  if (this.videoDurationSec > 0 && estimatedSec > this.videoDurationSec) {
    estimatedSec = estimatedSec % this.videoDurationSec;
  }
  return this.normalizeVideoSecond(estimatedSec);
}

// --- 恢复：seek + play/pause ---
private applyVideoContinuityRestoreNow(seekToSnapshot: boolean = true) {
  if (!this.pendingVideoRestore) return;
  const restoreSec = this.normalizeVideoSecond(this.pendingVideoRestoreSec);
  const shouldPlay = this.pendingVideoRestorePlaying;
  const hasPreparedAfterCapture = this.videoPreparedSerial > this.pendingVideoRestorePreparedSerialBase;
  const elapsedSinceCaptureMs = Math.max(0, Date.now() - this.pendingVideoRestoreCapturedAtMs);
  const canFinalizeRestore = hasPreparedAfterCapture || elapsedSinceCaptureMs >= this.videoRestorePreparedWaitMs;

  this.isApplyingVideoRestore = true;
  try {
    if (seekToSnapshot || !shouldPlay) {
      try { this.videoController.setCurrentTime(restoreSec); } catch (_) {}
    }
    try {
      if (shouldPlay) { this.videoController.start(); }
      else { this.videoController.pause(); }
    } catch (_) {}
  } finally {
    this.isApplyingVideoRestore = false;
  }

  if (canFinalizeRestore) {
    this.pendingVideoRestore = false;
    this.clearVideoRestoreSchedule();
  } else {
    // prepared 还没到，继续等待
    this.pendingVideoRestore = true;
    this.scheduleVideoContinuityRestore();
  }
}

// --- prepared 回调：二次恢复 ---
private handleVideoPrepared(info: PreparedInfo) {
  this.videoPreparedSerial += 1;
  this.videoDurationSec = Math.max(0, info.duration);
  if (this.pendingVideoRestore) {
    this.clearVideoRestoreSchedule();
    this.applyVideoContinuityRestoreNow();
    return;
  }
}

// --- Video 组件：抑制 autoplay 抢跑 ---
Video({ controller: this.videoController })
  .autoPlay(this.shouldKeepVideoPlaying && !this.pendingVideoRestore)
  .onPrepared((info) => this.handleVideoPrepared(info))
  .onStart(() => { this.shouldKeepVideoPlaying = true; })
  .onPause(() => { this.shouldKeepVideoPlaying = false; })
  .onFinish(() => { this.shouldKeepVideoPlaying = false; })
  .onUpdate((info) => { this.videoCurrentSec = info.time; })

// --- 生命周期清理 ---
aboutToDisappear() {
  this.clearVideoRestoreSchedule();
  this.pendingVideoRestore = false;
}
```

### 关键要点

| 要点 | 说明 |
|---|---|
| **折展变化前先保存快照** | `captureVideoContinuitySnapshot()` 在 `foldStatus` 更新前调用 |
| **双触发恢复** | 延迟 80ms 定时器 + `onPrepared` 回调，谁先到谁执行 |
| **抑制 autoplay 抢跑** | `autoPlay` 条件排除 `pendingVideoRestore` 状态 |
| **用时间锚点估算进度** | 过渡期间无法直接读取播放位置，用锚点时间戳推算 |
| **恢复标记在 prepared 后才清除** | 避免 prepared 前清空导致恢复失效 |
| **生命周期清理** | `aboutToDisappear` 清理定时器和恢复标记 |

---

## 场景 8：生命周期回收缺失导致串态

### 问题描述

页面退出后仍响应旧监听，影响后续页面。折展相关状态在跨页面后出现污染。

### 根因分析

- `display.on` / `window.on` 未与页面生命周期成对回收。
- 临时方向锁和恢复任务未在离场时清理。

### 通用修复方案

所有监听注册必须与对应 `off` 成对出现，页面离场时统一清理。

**Good case：完整生命周期回收**

```typescript
private foldStatusCallback?: (status: display.FoldStatus) => void;
private foldDisplayModeCallback?: (mode: display.FoldDisplayMode) => void;
private orientationTimerId: number = -1;
private videoRestoreTimerId: number = -1;

aboutToAppear() {
  this.bindFoldListeners();
  this.updateFoldLayoutState();
}

aboutToDisappear() {
  // 1. 注销折展监听
  this.unbindFoldListeners();
  // 2. 清理方向调度定时器
  this.clearOrientationSchedule();
  // 3. 清理视频恢复定时器
  this.clearVideoRestoreSchedule();
  this.pendingVideoRestore = false;
  // 4. 恢复方向
  this.applyPreferredOrientation(window.Orientation.AUTO_ROTATION);
}

private bindFoldListeners() {
  // 先 off 再 on，防止重复注册
  this.foldStatusCallback = (status) => { /* ... */ };
  this.foldDisplayModeCallback = (mode) => { /* ... */ };
  try {
    display.off('foldStatusChange', this.foldStatusCallback);
    display.off('foldDisplayModeChange', this.foldDisplayModeCallback);
    display.on('foldStatusChange', this.foldStatusCallback);
    display.on('foldDisplayModeChange', this.foldDisplayModeCallback);
  } catch (_) {}
}

private unbindFoldListeners() {
  try {
    if (this.foldStatusCallback) display.off('foldStatusChange', this.foldStatusCallback);
    if (this.foldDisplayModeCallback) display.off('foldDisplayModeChange', this.foldDisplayModeCallback);
  } catch (_) {}
}
```

### 关键要点

| 要点 | 说明 |
|---|---|
| **`on` / `off` 必须成对** | 使用同一个回调引用注销，不要用匿名函数 |
| **注册前先 `off`** | 防止重复注册导致回调执行多次 |
| **离场时清理所有定时器和恢复任务** | 方向调度、视频恢复、延迟任务 |
| **离场时恢复方向** | `AUTO_ROTATION` 确保不影响后续页面 |

---

## 统一验证矩阵

- **状态维度**：展开、半折叠、折叠三态切换。
- **路径维度**：`折叠→展开→折叠` 与 `折叠→悬停→折叠` 两条链路均验证。
- **连续性维度**：滚动、输入、媒体进度与播放/暂停状态保持语义一致。
- **生命周期维度**：页面进入/退出后无监听残留、无方向串态、无任务残留。
- **证据维度**：`snapshot_display + dumpLayout + DisplayManagerService` 三份证据同时具备，禁止只看单一日志下结论。
