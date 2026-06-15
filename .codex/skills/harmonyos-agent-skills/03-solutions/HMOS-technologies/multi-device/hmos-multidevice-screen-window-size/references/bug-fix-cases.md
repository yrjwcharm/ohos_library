# Bug 修复场景指南

本文档合并了尺寸异常、位置异常、布局异常三类修复场景，每个场景附有唯一 ID 供路由引用。

## 分类总览与判断规则

| 分类 | 核心问题 | 关键词 | 优先判定 |
|------|---------|--------|---------|
| 尺寸异常（SIZE-0x） | 组件的**宽高值**在多设备上不适配 | 截断、留白、溢出、压缩、被切掉 | 组件本身尺寸不对 |
| 位置异常（POS-0x） | 组件的**定位坐标/相对位置**在多设备上不适配 | 偏移、错位、对齐异常、层级错乱、跑到屏幕外 | 组件尺寸正常但位置不对 |
| 布局异常（LAYOUT-0x） | **布局容器选择或配置**不当 | 堆叠、遮挡、GridRow 不降列、容器选错 | 容器类型或配置有误导致排列异常 |

### 判断规则

1. **先看容器**：如果根因是布局容器选错（如该用 Column 却用了 Stack）或容器配置错误（如 GridRow 参考系配错），归入**布局异常**。
2. **再看位置**：如果组件尺寸没问题，但位置/对齐/层级不对（如固定像素定位导致小屏跑到屏幕外），归入**位置异常**。
3. **最后看尺寸**：如果容器和定位都没问题，纯粹是组件宽高值不适配（如固定高度被截断、缺少断点分支），归入**尺寸异常**。
4. **复合问题**：一个问题同时涉及多个分类时，按根因归入主要分类；如果根因是容器选择错误导致尺寸/位置异常，优先归入**布局异常**。

---

## 一、尺寸异常

组件的宽高尺寸在不同屏幕尺寸或设备类型上无法正确适配，导致截断、留白、溢出、压缩等显示异常。

### 根因分类

1. **固定尺寸问题**：使用硬编码的像素值或固定百分比
2. **断点判断缺失**：未根据屏幕尺寸断点调整组件尺寸
3. **空间竞争问题**：多个组件争抢有限空间，导致相互挤压

---

### SIZE-01 小方形屏底部栏未收起导致主内容区被挤压

#### 问题描述

在小方形屏设备上，底部导航栏或工具栏仍保持固定垂直占位，占用了主内容区的垂直空间，导致被上下锚点约束的中间内容区高度不足，出现组件不显示或显示不全。

#### 根因分析

固定占位不只包括 `.height(...)`，也可能来自：
- 上下 `padding` 和 `margin`
- 包裹层高度

```typescript
// 问题代码示例
Row() {
  Stack() {
    // bottom bar content
  }
  .width('100%')
  .height(100)  // 固定高度，未做断点判断
}
.width('100%')
```

#### 修复方案

对底部栏的垂直占位做断点判断；当设备为小宽度且中等高度这类小方形屏时，将底部栏主体高度及其附加垂直占位尽量收起，并启用裁剪避免内部内容外溢。

```typescript
@StorageLink('currentWidthBreakpoint') currentWidthBreakpoint: WidthBreakpoint = WidthBreakpoint.WIDTH_LG;
@StorageLink('currentHeightBreakpoint') currentHeightBreakpoint: HeightBreakpoint = HeightBreakpoint.HEIGHT_MD;

private getBarHeight(): number {
  if (this.currentWidthBreakpoint === WidthBreakpoint.WIDTH_SM &&
      this.currentHeightBreakpoint === HeightBreakpoint.HEIGHT_MD) {
    return 0;
  }
  return 100
}

Row() {
  Stack() {
    // bottom bar content
  }
  .width('100%')
  .clip(true)
  .height(this.getBarHeight())
}
.width('100%')

// 同时在小方形屏上移除额外的垂直占位
// 例如：条件性移除 top/bottom padding、margin、wrapper height
```

---

### SIZE-02 内容超出父组件被截断/溢出显示

#### 问题描述

子组件的实际尺寸超出父容器的可显示区域，导致超出部分被截断不可见或溢出到父容器边界之外。

#### 根因分析

父容器无法容纳子组件的全部内容，可能是因为缺少滚动能力、容器高度约束不足等原因。

典型问题代码包括：

**问题 A：缺少 Scroll 容器**

可滚动页面的主体内容没有使用 `Scroll` 承接，或者 `Scroll` 内部的内容根节点被锁定了高度：

```typescript
// 问题代码
RelativeContainer() {
  Content()
    .width('100%')
    .height('100%')  // 问题：将内容高度锁死在视口高度
}
```

**问题 B：使用非滚动容器渲染列表**

使用 `Row` / `Column` / `Stack` 等非滚动容器 + `ForEach` 渲染列表项：

```typescript
// 问题代码
Row({ space: 10 }) {
  ForEach(this.items, (item) => {
    Column() { /* 内容 */ }
  })
}
.width('60%')
```

**问题 C：外部容器高度约束不足**

外部容器通过 `maxHeight`、`constraintSize({ maxHeight })`、`sheetMaxHeight` 等属性限制了最大高度，当内部内容的实际高度超过该限制时，超出部分被截断。

```typescript
// 问题代码：外部容器默认半屏高度，内部内容超过半屏被截断
ReDsActionSheetContent({
  slot: () => {
    this.renderUserCardDialog()  // 内容超过半屏，底部被截断
  },
  // sheetMaxHeight: '100%',  ← 未设置，使用默认半屏约束
})

// 外部容器组件内部通过 constraintSize 生效：
// .constraintSize({ maxHeight: this.sheetMaxHeight })
```

**问题 D：固定 padding/margin 在容器收缩时占比过大**

组件内部使用了较大固定值的 padding 或 margin，在容器高度充足时用于居中或留白效果正常；但当容器高度因键盘弹出、折叠屏切换等场景动态收缩时，固定 padding/margin 的绝对值未同步调整，挤占内容空间导致截断。

```typescript
// 问题代码：键盘弹出后容器高度动态缩小，但 padding 保持固定
Scroll() {
  Column() {
    RichEditor({ controller: this.richEditorController })
      .width('100%')
  }
}
.padding({
  bottom: 65,  // 固定 65vp，键盘弹出后容器可能仅剩 200vp
  top: 65       // 130vp padding 占比超过 60%，正文被压缩到极小
})
```

此问题常见于：容器通过 `constraintSize({ maxHeight })` 或 `expandSafeArea([SafeAreaType.KEYBOARD])` 动态调整高度时，内部 padding/margin 未做响应式处理。

#### 修复方案

**方案 A：使用 Scroll（适合单块整体内容）**

适用场景：页面主体内容是一个整体，需要滚动查看（如文章、表单、长图等）。

```typescript
// 修复后
RelativeContainer() {
  Scroll() {
    Content()  // 内容按自然高度布局
  }
  .width('100%')
  .height('100%')
  .scrollable(ScrollDirection.Vertical)  // 垂直滚动
  .scrollBar(BarState.Auto)
}

// 关键：删除 Content 上的 .height('100%')，让内容自然撑开
```

**方案 B：使用 List（适合多块同类内容）**

适用场景：内容由多个结构相同的列表项组成（如应用列表、图片网格、标签栏等）。

完整案例对照（goodcase: List 横向滚动 vs badcase: Row 截断）见 [list-scroll-extension-avoid-truncation.ets](../assets/list-scroll-extension-avoid-truncation.ets)。

```typescript
// 修复后
List({ space: 10 }) {
  ForEach(this.items, (item) => {
    ListItem() {
      Column() { /* 内容 */ }
    }
  })
}
.listDirection(Axis.Horizontal)  // 横向滚动
.scrollBar(BarState.Auto)
.width('100%')
.height(118)  // List 必须设置明确的高度约束
```

**方案 C：调整外部容器高度约束（适合容器约束导致的截断）**

适用场景：外部容器通过 `maxHeight`、`constraintSize`、`sheetMaxHeight` 等限制了最大高度，内部内容超过该限制被截断。

```typescript
// 修复：显式设置 sheetMaxHeight 为 '100%'
ReDsActionSheetContent({
  // ...
  slot: () => {
    this.renderUserCardDialog()
  },
  sheetMaxHeight: '100%',  // 允许全屏高度，内容不再被截断
})
```

通用思路：当内部内容高度超过外部容器的 `maxHeight` 约束时，应调整外部容器的高度配置（增大 `maxHeight`、移除 `constraintSize` 限制、或设置百分比），而非在内部内容层做 padding/Scroll 绕过。

**方案 D：动态调整固定 padding（适合键盘弹出等空间收缩场景）**

适用场景：组件内部有较大固定 padding，当外部空间因键盘弹出、折叠屏切换等原因收缩时，固定 padding 占比过大导致内容区被压缩截断。

```typescript
// 修复：根据焦点状态动态调整 padding
Scroll() {
  Column() {
    RichEditor({ controller: this.richEditorController })
      .width('100%')
  }
}
.padding({
  bottom: this.textAreaOnFocus ? 16 : 65,  // 键盘弹出时缩小 padding
  top: this.textAreaOnFocus ? 16 : 65
})
```

#### 方案选择指南

| 特征 | Scroll | List |
|-----|--------|------|
| **内容结构** | 单块整体内容 | 多个同类子项 |
| **子项类型** | 不统一（文字、图片、表单混合） | 统一（都是应用卡片、都是图片等） |
| **布局方向** | 主要是垂直滚动 | 垂直或横向滚动 |
| **典型场景** | 文章页面、表单、详情页 | 应用列表、图片网格、标签栏 |
| **性能** | 内容少时性能好 | 大量列表项时性能更好（虚拟化） |

---

### SIZE-03 AlphabetIndexer 索引条在高度不足时紧凑挤压

#### 问题描述

在小高度设备或折叠屏上，`AlphabetIndexer` 的索引条变得非常紧凑，所有字母挤在有限垂直空间内，导致可读性差或交互困难。

#### 根因分析

`AlphabetIndexer` 设置了 `.autoCollapse(false)`，在可用高度不足时不会自动折叠索引项，导致所有字母索引始终显示，造成空间不足时紧凑挤压。

```typescript
// 问题代码示例
AlphabetIndexer({ arrayValue: this.dataSet, selected: 0 })
  .autoCollapse(false)  // 禁用自动折叠，高度不足时不会收起索引项
  .selectedColor(this.selectedColor)
  .popupSelectedColor(this.popupSelectedColor)
```

#### 修复方案

启用 `.autoCollapse(true)`，让索引条在高度不足时自动折叠部分索引项，保证显示效果。

```typescript
AlphabetIndexer({ arrayValue: this.dataSet, selected: 0 })
  .autoCollapse(true)  // 启用自动折叠
  .selectedColor(this.selectedColor)
  .popupSelectedColor(this.popupSelectedColor)
```

---

### SIZE-04 Row/Column/Flex 容器内子组件溢出截断，未按预期省略或保持完整

#### 问题描述

flex 容器（Row/Column/Flex）内子组件总尺寸超过父容器或屏幕可用空间，部分组件被截断、溢出或被意外压缩，无法按预期保持完整展示或按优先级省略。

#### 根因分析

子组件尺寸超过容器可用空间时，容器的收缩/隐藏策略未正确配置，导致显示不符合预期。典型问题代码包括：

**问题 A：flexShrink 分配不符合预期**

子组件尺寸超过容器可用空间时，默认的 flexShrink 分配可能不符合开发者预期：

- 未显式设置 flexShrink 的子组件均参与等比收缩，无法精确控制谁被压缩、谁保持完整
- 容器本身缺少主轴尺寸约束（Row 需要 `.width`，Column 需要 `.height`）时，flexShrink 无法触发计算
- 结果：需要完整展示的组件被意外压缩或溢出裁剪，需要被压缩的组件反而没有让出空间

```typescript
// 问题代码示例（以 Row 为例，Column/Flex 同理）
Row() {
  Text(this.nick_name)
    .maxLines(1)
    .textOverflow({ overflow: TextOverflow.Ellipsis })
    // 缺少 .flexShrink(1)
  Row() {
    Image(...)
    Text("标签")
  }
  // 缺少 .flexShrink(0)
}
// 缺少 .width('100%')
```

**问题 B：displayPriority 缺失导致截断而非按需隐藏**

Flex 单行模式（`Row` 或 `Flex` 未设 `wrap: FlexWrap.Wrap`）下，子组件总尺寸超出容器宽度时，子组件被截断而非按优先级自动隐藏低优先级组件，导致内容显示不完整。注意：`displayPriority` 仅在 Flex 单行模式生效，`Column` 和 `Flex` 多行换行模式下不生效。

```typescript
// 问题代码（Row 或 Flex 单行模式）
ForEach(items, (item, index) => {
  Text(item)
    .fontSize(14)
  // 缺少 .displayPriority()
})
```

#### 修复方案

**方案 A：配置 flexShrink（适合需要精确控制谁被压缩、谁保持完整）**

适用场景：容器内部分组件需要保持完整展示，另一部分可以被压缩并配合文本省略号等效果。

完整案例对照（goodcase: flexShrink 精确分配 vs badcase: 文本溢出截断）见 [row-flexshrink-text-ellipsis.ets](../assets/row-flexshrink-text-ellipsis.ets)。

```typescript
// 修复后
Row() {
  Text(this.nick_name)
    .maxLines(1)
    .textOverflow({ overflow: TextOverflow.Ellipsis })
    .flexShrink(1)           // 允许压缩，配合省略号
  Row() {
    Image(...)
    Text("标签")
  }
  .flexShrink(0)             // 保持完整，不被压缩
}
.width('100%')                // 提供主轴约束边界（Column 对应 .height('100%')）
```

**方案 B：配置 displayPriority（适合空间不足时按优先级隐藏整个组件）**

适用场景：Flex 单行模式（`Row` 或 `Flex` 未设 `wrap: FlexWrap.Wrap`）下排列多个固定宽度子组件，空间不足时需要按优先级隐藏低优先级组件，而非压缩。注意：`displayPriority` 仅在 Flex 单行模式生效。

完整案例对照（goodcase: displayPriority 按优先级隐藏 vs badcase: 标签截断）见 [row-displaypriority-truncation.ets](../assets/row-displaypriority-truncation.ets)。

```typescript
// 修复后：为子组件设置优先级，值越大越优先显示
Text(item)
  .displayPriority(totalCount - index)

// 容器必须设置宽度约束，且必须是单行模式
Row({ space: 12 }) { /* ... */ }
  .width('100%')
```

#### 方案选择指南

| 特征 | flexShrink | displayPriority |
|-----|-----------|-----------------|
| **适用场景** | 精确控制谁被压缩、谁保持完整 | 空间不足时按优先级隐藏整个组件 |
| **压缩行为** | 可压缩组件按比例收缩，配合省略号 | 低优先级组件完全隐藏，不显示 |
| **文本处理** | 配合 textOverflow 显示省略号 | 隐藏整个组件（含文本） |
| **容器要求** | 必须设置主轴尺寸约束（Row 设 width，Column 设 height） | 仅 Flex 单行模式生效（Row 或 Flex 未设 wrap），容器必须设置 `.width('100%')` 或固定宽度 |
| **典型场景** | 昵称+标签、标题+按钮等混合内容 | 标签栏、工具栏等同类固定宽度项 |

---

### SIZE-05 图片容器约束与渲染模式不当导致拉伸

#### 问题描述

Image 组件的容器约束与渲染模式配置不当，在大屏设备上导致图片拉伸、截断、变形或聚焦异常。常见于首图、轮播图、横幅等场景。典型问题模式包括：

- **模式A**：Image 只设 `width('100%')` 未设 `height`，大屏宽度放大后高度等比拉伸溢出
- **模式B**：Image 同时设 `width('100%')` + `height('100%')` + `objectFit(ImageFit.Cover)`，配合容器的固定像素高度计算，导致图片在不同屏幕尺寸下被强制拉伸裁剪

#### 根因分析

**模式A：仅设宽度未设高度**

Image 组件在高宽比模式下，若只约束宽度不约束高度，大屏宽度放大后会按原始图像宽高比等比放大高度，导致图片超出容器或变形：

```typescript
// 问题代码
Image($r('app.media.banner'))
   .width('100%')
// height 未设置，大屏上高度被等比放大
```

**模式B：宽度+高度+Cover组合导致拉伸**

Image 同时设置 `width('100%')` + `height('100%')` + `objectFit(ImageFit.Cover)`，当容器使用固定像素计算高度（如 `height(someCalculation())`）时，容器高度不随宽度等比变化，导致 Image 被 Cover 模式强制拉伸裁剪：

```typescript
// 问题代码
Stack() {
  Image($r('app.media.banner'))
    .width('100%')
    .height('100%')         // 强制填满容器高度
    .objectFit(ImageFit.Cover)  // 裁剪填满，导致拉伸
}
.height(this.calcHeight())  // 固定像素计算高度，不随宽度等比变化
```

#### 修复方案

**核心原则：优先保证不破坏图片原始宽高比。** 首选通过容器层面解决（Scroll 滚动或 aspectRatio + constraintSize），而非直接限制图片高度或裁剪。

根据场景选择以下修复方式：

**方案一：Scroll 滚动容器（首选，适合模式A）** — 为图片所在的内容区添加 `Scroll` 容器，保持图片原始宽高比，超出部分可滚动查看：

```typescript
// BadCase：Image 在固定高度 Column 中，大图导致下方内容被截断
Column() {
  Image($r('app.media.banner'))
    .width('100%')
  // 其他内容...
}
.height('100%')

// GoodCase：用 Scroll 包裹内容区，图片保持原始宽高比
Scroll() {
  Column() {
    Image($r('app.media.banner'))
      .width('100%')
    // 其他内容...
  }
  .width('100%')
}
.layoutWeight(1)
.scrollable(ScrollDirection.Vertical)
.scrollBar(BarState.Auto)
```

**方案二：容器 aspectRatio + constraintSize（适合模式B）** — 当 Image 的 `height('100%')` + `objectFit(ImageFit.Cover)` 配合容器固定像素高度导致拉伸时，应移除 Image 上的 `height('100%')` 和 `objectFit(ImageFit.Cover)`，改为在**容器**上使用 `aspectRatio` 保持宽高比稳定 + `constraintSize({ maxHeight })` 限制大屏最大高度：

```typescript
// BadCase：Image height(100%) + objectFit(Cover) + 容器固定高度
Stack() {
  Image($r('app.media.banner'))
    .width('100%')
    .height('100%')
    .objectFit(ImageFit.Cover)
}
.height(this.calcHeight())

// GoodCase：移除 Image 的 height 和 objectFit，容器使用 aspectRatio + constraintSize
Stack() {
  Image($r('app.media.banner'))
    .width('100%')
}
.aspectRatio(16 / 9)
.constraintSize({ maxHeight: 236 })
```

**方案三：显式高度约束** — 为 Image 组件添加固定的 `.height()` 值，配合 `.objectFit()` 模式控制缩放行为。**会裁剪或变形图片，仅在明确不需要保留完整图片时使用**：

```typescript
Image($r('app.media.banner'))
  .width('100%')
  .height(200)
  .objectFit(ImageFit.Cover)
```

**方案四：断点条件高度** — 在不同断点下设置不同的高度：

```typescript
Image($r('app.media.banner'))
  .width('100%')
  .height(this.currentWidthBreakpoint === WidthBreakpoint.WIDTH_SM ? 120 : 240)
  .objectFit(ImageFit.Cover)
```

#### AI 判断规则

1. 如果 Image 组件只设 `width` 未设 `height` 或 `aspectRatio`，即为该场景（模式A）。
2. 如果 Image 组件同时设 `width('100%')` + `height('100%')` + `objectFit(ImageFit.Cover)`，且容器使用固定像素计算高度（非 aspectRatio 或百分比），也为该场景（模式B）。
3. **模式A优先选择方案一（Scroll 滚动容器）**，保持图片原始宽高比不裁剪、不变形。
4. **模式B优先选择方案二（容器 aspectRatio + constraintSize）**，移除 Image 上导致拉伸的 `height('100%')` 和 `objectFit(ImageFit.Cover)`，改用容器层面的宽高比约束。
5. 仅当场景明确需要固定图片显示区域（如轮播图、横幅卡片等 UI 设计要求裁剪展示）时，才使用方案三或方案四。
6. 如果图像本身有固定宽高比要求且不能滚动展示，使用方案三。
7. 宽度断点有阶梯变化时（如手机→平板→2in1），可结合方案一与方案四：用 Scroll 兜底防截断，同时按断点调整内容区高度比例。

---

### SIZE-06 DPI 显示密度变化导致断点计算错误

#### 问题描述

窗口尺寸不变但 DPI 发生变化，断点未正确切换，布局停留在错误状态。

> **补充说明**：全景多窗切换（如从全屏进入自由多窗或在不同自由多窗之间切换）不会回调 `windowSizeChange`，因为窗口尺寸未变；而悬浮窗和分屏模式下窗口尺寸会改变，会正常回调 `windowSizeChange`。因此全景多窗场景中 DPI 变化的检测只能依赖 `systemDensityChange` 监听。

#### 根因分析

仅监听 `windowSizeChange`，DPI 发生变化，但回调中调用 `getWindowDensityInfo()` 返回旧 DPI 值，导致 VP 宽度计算错误：

```typescript
// ❌ 缺少 systemDensityChange 监听
this.windowClass.on('windowSizeChange', (data: window.Size) => {
  this.recalcBreakpoint()
  // getWindowDensityInfo() 返回旧 DPI → widthVp = widthPx / oldDPI → 断点错误
})
```

#### 修复方案

必须同时监听 `windowSizeChange` 和 `systemDensityChange`：

```typescript
this.windowClass.on('windowSizeChange', (data: window.Size) => {
  this.recalcBreakpoint()
})

if(canIUse('SystemCapability.Window.SessionManager')) {
   this.windowClass.on('systemDensityChange', (density: number) => {
     this.recalcBreakpoint()
   })
}
```

---

### SIZE-07 启动页图标截断/显示不全

#### 问题描述

应用启动页图标在多设备上显示不全，出现截断现象。部分设备上只能看到图标的局部区域，或图标完全不可见。

#### 根因分析

`module.json5` 中 `startWindowIcon` 引用了超大尺寸图片资源，简易启动页模式下图标以原始尺寸居中显示，不会随窗口缩放，超出窗口部分被截断：

```json5
// 问题代码：module.json5
{
  "abilities": [
    {
      "name": "EntryAbility",
      "startWindowIcon": "$media:large_image",  // 2560×1440 像素，远超窗口尺寸
      "startWindowBackground": "$color:start_window_background"
    }
  ]
}
```

**根因**：简易启动页的 `startWindowIcon` 按原始尺寸居中显示，不缩放。HarmonyOS 文档明确建议"避免设计针对单个产品全屏尺寸的 startWindowIcon 图标资源，防止在其他尺寸设备的显示效果无法自动适配"。

#### 修复方案

**方案一：替换为合适尺寸的图标资源**

将 `startWindowIcon` 指向不超过 256×256 像素的图标资源：

```json5
{
  "abilities": [
    {
      "name": "EntryAbility",
      "startWindowIcon": "$media:startIcon",  // 144×144 像素，符合规范
      "startWindowBackground": "$color:start_window_background"
    }
  ]
}
```

适用场景：图标资源可替换，且不需要复杂的启动页视觉效果。

**方案二：使用增强启动页（API 19+）**

通过 `startWindow` 字段配置增强启动页，系统自动将图标缩放到合适尺寸（128/192/256 vp），适配不同设备：

1. 创建 `resources/base/profile/start_window.json`：

```json
{
  "startWindowAppIcon": "$media:large_image",
  "startWindowBackgroundColor": "$color:start_window_background"
}
```

2. 在 `module.json5` 中添加 `startWindow` 字段：

```json5
{
  "abilities": [
    {
      "name": "EntryAbility",
      "startWindowIcon": "$media:large_image",
      "startWindowBackground": "$color:start_window_background",
      "startWindow": "$profile:start_window"  // 增强配置生效后，startWindowIcon 失效
    }
  ]
}
```

适用场景：需要保留原有图标资源，且应用最低 API ≥ 19。

> 增强启动页配置（`startWindow`）优先级高于简易启动页（`startWindowIcon`），两者可共存。详细字段说明参考 `launch-page-config.md`。

#### 方案选择指南

| 特征 | 方案一：替换图标资源 | 方案二：增强启动页 |
|------|---------------------|-------------------|
| **修改范围** | 仅修改 `module.json5` | 新增 JSON 配置 + 修改 `module.json5` |
| **图标缩放** | 不缩放，需自行控制图标尺寸 | 系统自动缩放（128/192/256 vp） |
| **多设备适配** | 依赖图标资源尺寸 | 系统按设备自动适配 |
| **最低 API** | 无限制 | API 19+ |
| **扩展能力** | 仅支持纯色背景 + 图标 | 支持背景图片、插画、品牌标识等 |

---

### SIZE-08 外层组件未设宽度导致 constraintSize 失效、内容溢出

#### 问题描述

组件设置了 `.constraintSize({ maxWidth, maxHeight })`，但实际渲染时子组件超出预期范围，`maxWidth`/`maxHeight` 未生效，内容溢出容器。

#### 根因分析

外层组件**没有设置显式宽度**。在这种情况下，组件的宽度由子内容撑开，而不是由 `.constraintSize({ maxWidth })` 来限制。`constraintSize` 只能约束已有宽度基准的组件，当组件宽度未被任何方式确定时（没有 `.width()`、没有父容器给定宽度、也没有 `layoutWeight`），`maxWidth` 约束无法生效，子组件按自身自然尺寸布局，导致溢出。

常见于以下场景：`@CustomDialog` 弹窗根组件、`@Builder` 配合 `bindContentCover` 的浮层根组件、`promptAction.openCustomDialog` 的根组件等——这些场景中根组件不在任何有宽度约束的父容器内。

```typescript
// ❌ 问题代码：外层 Column 未设 .width()，constraintSize 无法生效
Column() {
  Row() { /* 标题栏 */ }
  Column() {
    TextInput()
    TextArea()
  }
}
.constraintSize({
  minWidth: 300,
  maxWidth: this.screenWidthVp * 0.85,  // 无法生效：没有宽度基准
  maxHeight: this.screenHeightVp * 0.65
})
```

#### 修复方案

在外层组件上设置显式 `.width()`，使其拥有确定的宽度基准，`.constraintSize()` 才能正确约束内部子组件：

```typescript
// ✅ 修复后：外层设置 .width()
Column() {
 Row() { /* 标题栏 */ }
 Column() {
   TextInput()
     .width('100%')  // 此时可以正确填充父容器宽度
   TextArea()
     .width('100%')
 }
}
.width("90%")
.constraintSize({
   minWidth: 300,
   maxWidth: this.screenWidthVp * 0.85,
   maxHeight: this.screenHeightVp * 0.65
})
```

#### 要点

- `constraintSize` 的 `maxWidth`/`maxHeight` 需要组件本身有一个宽度/高度基准才能生效。如果组件宽度完全由子内容撑开（无 `.width()`、无父容器给定宽度），`maxWidth` 约束不会被触发。
- **任何不在有宽度约束的父容器内的组件**（弹窗根节点、浮层根节点等），如果需要 `.constraintSize()` 限制尺寸，都必须手动设置 `.width()`。

---

### SIZE-09 使用 display.on('change') 监听旋转导致尺寸计算使用旧值

#### 问题描述

屏幕旋转后，组件尺寸或位置未正确更新，表现为旋转后布局偏移、错位或截断。使用 `display.on('change')` 监听屏幕变化，回调中调用 `display.getDefaultDisplaySync()` 获取新的屏幕尺寸进行布局计算，但获取到的可能是旋转前的旧尺寸。

#### 根因分析

`display.on('change')` 的回调参数仅为 display ID（number），不携带新的宽高信息。开发者需要在回调中再次调用 `display.getDefaultDisplaySync()` 获取尺寸，此时存在时序风险——回调触发时 display 对象的 `width`/`height` 属性可能尚未更新为旋转后的值，导致布局计算使用旧尺寸。

```typescript
// ❌ 问题代码：display.on('change') 回调不携带新尺寸，需二次获取
display.on('change', (data: number) => {
  // data 只是 display ID，没有尺寸信息
  const defaultDisplay = display.getDefaultDisplaySync();
  // ⚠️ defaultDisplay.width/height 可能仍是旋转前的值
  this.calcCameraSize(defaultDisplay.width, defaultDisplay.height);
});
```

#### 修复方案

使用 `window.on('windowSizeChange')` 替代 `display.on('change')`。`windowSizeChange` 回调直接携带 `window.Size`（物理像素），无需二次调用 API，回调参数即为旋转后的最新尺寸。

```typescript
// ✅ 修复后：windowSizeChange 回调直接提供新尺寸
this.hostWindow.on('windowSizeChange', (size: window.Size) => {
  // size.width/size.height 是旋转后的最新尺寸，无时序风险
  this.calcCameraSize(size.width, size.height);
});
```

注册时机应在获取到窗口实例之后（如 `window.getLastWindow` 的 then 回调中），取消监听在组件销毁时：

```typescript
// 注册
aboutToAppear() {
  window.getLastWindow(ctx).then((win: window.Window) => {
    this.hostWindow = win;
    this.hostWindow.on('windowSizeChange', (size: window.Size) => {
      this.onDisplayChanged(size.width, size.height);
    });
  });
}

// 取消
aboutToDisappear() {
  this.hostWindow?.off('windowSizeChange');
}
```

#### 要点

- `display.on('change')` 回调参数是 display ID，不携带尺寸信息；`window.on('windowSizeChange')` 回调参数是 `window.Size`，直接携带最新尺寸。
- `windowSizeChange` 回调返回的 `window.Size` 是物理像素值，布局计算需通过 `px2vp` 或 `px2lpx` 转换。
- 注册监听需在窗口实例获取完成后，取消监听需在组件销毁时执行，防止内存泄漏。

---

### 尺寸异常 AI 判断规则

1. 如果页面主内容区通过 `RelativeContainer`、`Stack` 或其他布局被顶部区和底部区同时约束，先检查底部区是否保留固定垂直占位，不要只看 `.height(...)`。
2. 如果问题只出现在小方形屏、方屏或短高度设备，优先检查是否缺少基于 `currentWidthBreakpoint` 和 `currentHeightBreakpoint` 的高度分支。
3. 继续检查底部区的上下 `padding`、`margin`、包裹层高度是否仍在小屏保留。
4. 如果底部栏在小屏不应展示完整功能，应优先收起底部栏占位，而不是先压缩中间列表项。
5. 当主体高度收起为 `0` 时，底部栏内容容器应配合 `.clip(true)`，避免内部子组件继续占据视觉空间。
6. **检查内容截断根因**：内容被截断时，按以下顺序排查：
   - **缺少滚动容器**：单块整体内容使用 `Scroll`，多块同类内容使用 `List`
   - **外部容器高度约束不足**：逐层检查 `maxHeight`、`constraintSize`、`sheetMaxHeight` 等约束
   - **固定 padding/margin 占比过大**：容器高度动态收缩时，组件内固定 padding/margin 未同步调整
   - 注意区分"容器高度约束不足"与"未做系统栏避让"两类根因
7. **检查旋转后尺寸状态同步**：组件在屏幕旋转后出现截断时，先判断宽度是否使用了从窗口尺寸计算出的固定值（如 `px2vp(windowRect.width * 0.65)`、`vp2px(windowWidth)` 等）。优先检查能否使用响应式方式替代（如 `.width('100%')`、`layoutWeight`、百分比宽高），仅在确实无法用响应式方式表达（如需要基于窗口物理尺寸按特定系数计算的自定义布局）时，才需要 `windowSizeChange` 回调中同步更新状态变量。**不要在不必要的情况下引入 `windowSizeChange` 监听来维护一个可以用 `'100%'` 替代的宽度变量**。
8. **检查 flex 容器溢出截断**：`Row`/`Column`/`Flex` 内子组件被截断或意外压缩时，检查是否正确配置了 `flexShrink`（控制谁被压缩）和 `displayPriority`（控制谁被隐藏，仅在 Flex 单行模式生效），并确保容器设置了主轴尺寸约束。详见 SIZE-04。
9. **检查 DPI 变化后断点计算**：退出自由多窗等场景导致 DPI 变化时，若仅监听 `windowSizeChange` 而 `getWindowDensityInfo()` 返回旧值，VP 宽度计算会出错。必须同时监听 `systemDensityChange`。详见 SIZE-06。
10. **检查启动页图标截断**：启动页图标显示不全时，检查 `module.json5` 中 `startWindowIcon` 引用的图片尺寸是否超过 256×256。简易启动页模式下图标以原始尺寸居中不缩放，超大图片会被截断。修复方式：替换为合适尺寸图标（方案一）或配置增强启动页 `startWindow`（方案二，API 19+）。详见 SIZE-07。
11. **检查外层组件宽度**：组件设置了 `.constraintSize()` 但子组件仍溢出时，检查外层组件是否设置了显式 `.width()`。如果外层组件不在任何有宽度约束的父容器内（如弹窗根节点、浮层根节点），则 `constraintSize` 的 `maxWidth`/`maxHeight` 无法生效。必须为外层组件设置 `.width()`。详见 SIZE-08。
12. **检查旋转后尺寸获取方式**：屏幕旋转后布局未正确更新时，检查是否使用了 `display.on('change')` + `getDefaultDisplaySync()` 获取尺寸。该组合存在回调时 display 属性未更新的风险，应替换为 `window.on('windowSizeChange')`，回调直接携带最新尺寸。详见 SIZE-09。

---

## 二、位置异常

组件在屏幕上的定位（x/y 坐标或相对位置）在不同屏幕尺寸或设备类型上无法正确适配，导致显示位置偏移或错位的问题。

### 根因分类

1. **绝对定位问题**：使用固定像素值的 `position()` 或 `offset()`
2. **锚点适配问题**：`RelativeContainer` 中的锚点设置不当
3. **对齐方式问题**：`align`、`alignContent` 等属性在不同尺寸下表现不一致
4. **边距累加问题**：`margin` 和 `padding` 累加导致位置计算错误

### 常见现象

| 现象 | 描述 | 典型场景 |
|-----|------|---------|
| 组件偏移 | 组件不在预期的位置显示 | 使用固定像素定位，小屏上组件跑到屏幕外 |
| 组件错位 | 多个组件之间的相对位置关系错乱 | 相对定位的参照组件位置变化，导致联动失效 |
| 对齐异常 | 组件未按预期对齐到某个参考点 | 居中对齐失效，左/右对齐偏移 |
| 层级错乱 | 组件的 z-index 层级关系不符合预期 | 悬浮元素被遮挡或遮挡了不该遮挡的内容 |

---

### 位置异常 AI 判断规则

（暂无案例，待补充）

---

## 三、布局异常

组件的布局方式或布局容器选择不当，导致在不同屏幕尺寸或设备类型上出现组件堆叠、遮挡、截断等显示问题。

### 根因分类

1. **容器选择问题**：误用 `Stack` 层叠布局实现本应垂直/水平排列的组件
2. **断点参考问题**：`GridRow` 等响应式组件的断点参考系配置错误
3. **滚动缺失问题**：可滚动内容未使用 `Scroll` 容器或滚动容器高度设置错误
4. **嵌套结构问题**：布局容器嵌套过深或嵌套方式不当

---

### LAYOUT-01 局部容器变窄时，GridRow 没有随之降列

#### 问题描述

当局部容器（如侧边栏、抽屉、底部面板）宽度发生变化时，内部的 `GridRow` 仍保持原来的列数，导致子项被挤压、重叠或堆叠。

#### 根因分析

`GridRow` 的断点参考系错误地绑定到了窗口宽度，而非组件自身宽度：

```typescript
// 问题代码
GridRow({
  breakpoints: { reference: BreakpointsReference.WindowSize }  // 错误：参考窗口尺寸
}) {
  // 子项
}
```

#### 修复方案

如果响应式对象是局部组件，而不是整个窗口，应改为参考组件尺寸：

```typescript
// 修复后
GridRow({
  breakpoints: { reference: BreakpointsReference.ComponentSize }  // 正确：参考组件尺寸
}) {
  // 子项
}
```

---

### LAYOUT-02 Stack 层叠布局导致底部元素遮挡主内容

#### 问题描述

页面底部有导航栏或工具栏，但主内容区域被底部栏遮挡，无法完整显示。

#### 根因分析

使用 `Stack` 作为根容器，配合 `alignContent: Alignment.BottomStart` 定位底部元素时，底部元素会层叠覆盖在上层元素上方：

```typescript
// 问题代码
Stack({ alignContent: Alignment.BottomStart }) {
  ContentArea()  // 被遮挡
  BottomBar()    // 覆盖在 ContentArea 底部区域
}
```

#### 修复方案

如果预期是垂直排列、互不遮挡，应改用 `Column`：

```typescript
// 修复后
Column() {
  ContentArea()
  BottomBar()
}
```

---

### LAYOUT-03 分屏模式下应用界面出现图片截断、文字挤压、组件遮挡等

#### 问题描述

应用未对分屏模式做适配，导致在分屏模式下，图片、文字和组件出现截断、挤压、遮挡等问题。

#### 根因分析

未根据断点动态调整布局和设置小窗口布局。完整案例对照（goodcase: 断点动态调整 vs badcase: 固定尺寸截断）见 [SplitScreenExample.ets](../assets/SplitScreenExample.ets)。

```typescript
// 问题代码
Image($r('app.media.background'))
  .height(200)
  .aspectRatio(1)
```

#### 修复方案

根据断点动态调整布局并设置小窗口布局，保证页面布局能够完整显示。

```typescript
// 以设置图片的高度为例，在小窗口布局中高度为 50vp，手机全屏时高度为 200vp
Image($r('app.media.background'))
  .height(this.currentWidthBreakpoint === WidthBreakpoint.WIDTH_SM  &&
    (this.currentHeightBreakpoint === HeightBreakpoint.HEIGHT_SM  ||
     this.currentHeightBreakpoint === HeightBreakpoint.HEIGHT_MD) ? 50 : 200)
  .aspectRatio(1)
```

---

### LAYOUT-04 Flex SpaceBetween 在小屏上导致上下区域重叠

#### 问题描述

页面使用 `Flex({ justifyContent: FlexAlign.SpaceBetween })` 将内容分为上下两区，在小屏设备上，下区内容与上区内容重叠。

#### 根因分析

`Flex` 的 `SpaceBetween` 要求子内容总高度 ≤ 容器高度，才能将子项分别推到顶部和底部。当上区内容在小屏上超出容器可用高度时，`SpaceBetween` 失效，下区被挤到与上区重叠的位置。

```typescript
// 问题代码
Column() {
  Flex({ direction: FlexDirection.Column, justifyContent: FlexAlign.SpaceBetween, alignItems: ItemAlign.End }) {
    Column() {
      // 上半区：背景图（无高度约束）+ 输入框 + 协议 + 按钮
      Stack({ alignContent: Alignment.TopStart }) {
        Image($r("app.media.bg"))
          .width("100%")
          .objectFit(ImageFit.Cover)
        Image($r('sys.media.back'))
          .onClick(() => {})
      }
      .width('100%')
      // TextInput, Row(协议), Row(按钮) ...
    }
    .width('100%')

    Column() {
      // 下半区：其他登录方式、登录遇到问题
    }
    .width('100%')
  }
}
.width('100%')
.height('100%')
```

#### 修复方案

将 `Flex(SpaceBetween)` 替换为 `Scroll() > Column()`，让内容自然流动。大屏上内容不超出一屏时无滚动，小屏上内容溢出时可滚动查看，不重叠、不截断。

```typescript
// 修复后
Column() {
  Scroll() {
    Column() {
      // 上半区（保持原有内容不变）
      Column() {
        Stack({ alignContent: Alignment.TopStart }) {
          Image($r("app.media.bg"))
            .width("100%")
            .objectFit(ImageFit.Cover)
          Image($r('sys.media.back'))
            .onClick(() => {})
        }
        .width('100%')
        // TextInput, Row(协议), Row(按钮) ...
      }
      .width('100%')

      // 下半区（保持原有内容不变）
      Column() {
        // 其他登录方式、登录遇到问题
      }
      .width('100%')
    }
    .width('100%')
    .constraintSize({ minHeight: '100%' })           // 关键：至少占满一屏
    .justifyContent(FlexAlign.SpaceBetween)           // 关键：上下两区贴顶贴底
  }
  .width('100%')
  .height('100%')
  .scrollable(ScrollDirection.Vertical)
}
.width('100%')
.height('100%')
```

---

### LAYOUT-05 Navigation navDestination 目标页缺少 NavDestination 包装导致路由跳转后页面空白

#### 问题描述

使用 `Navigation` + `NavPathStack` 实现分栏或单栏路由跳转时，调用 `pushPathByName` 或 `pushPath` 成功（无报错），但目标页面内容不显示，屏幕停留在原页面或显示空白。

#### 根因分析

`navDestination` builder 中创建的目标页组件，其 `build()` 方法直接返回 `Column` / `Row` 等普通容器，未用 `NavDestination()` 包装。Navigation 框架要求所有通过路由栈渲染的目标页必须以 `NavDestination` 作为根容器，否则框架无法将组件识别为合法的目标页内容，导致路由推入成功但页面无法渲染。

```typescript
// ❌ 问题代码：ChatDetail 的 build() 未使用 NavDestination 包装
@Component
struct ChatDetail {
  build() {
    Column() {
      Text('聊天详情')
      // ... 聊天内容
    }
    .width('100%')
    .height('100%')
  }
}

// Index 中：
@Builder
PageMap(name: string) {
  if (name === 'ChatDetail') {
    ChatDetail()  // 目标页内容不会被 Navigation 识别
  }
}
```

#### 修复方案

在目标页组件的 `build()` 方法中，用 `NavDestination()` 包裹原有内容：

```typescript
// ✅ 修复后：ChatDetail 的 build() 使用 NavDestination 包装
@Component
struct ChatDetail {
  build() {
    NavDestination() {
      Column() {
        Text('聊天详情')
        // ... 聊天内容
      }
      .width('100%')
      .height('100%')
    }
  }
}
```

所有通过 `navDestination` builder 创建的目标页组件（如聊天详情页、占位页、商品详情页等）都必须遵循此规则。如果存在多个目标页，每个目标页组件的 `build()` 都需要 `NavDestination()` 包装。

#### 要点

- `NavDestination` 是 Navigation 路由栈中目标页的必要容器，不是可选的样式包装。
- 缺少 `NavDestination` 不会产生编译错误或运行时异常，只会导致页面静默不渲染——这是该问题难以排查的原因。
- 此问题在使用 `NavigationMode.Split`（分栏）和 `NavigationMode.Stack`（单栏）时均会出现。
- `NavDestination` 支持配置 `.title()`、`.hideTitleBar()`、`.hideBackButton()` 等导航栏属性，可在 `NavDestination()` 上链式调用。

---

### LAYOUT-06 Navigation 包裹分区容器导致宽屏内容区空白

#### 问题描述

应用同时使用 `Navigation`（路由导航）和分区容器（`SideBarContainer`、`Tabs`、自定义分栏 `Row`/`Column` 等）时，在折叠屏展开态或平板等宽屏设备上，分区容器的内容区域完全空白。

#### 根因分析

`Navigation` 与分区容器的嵌套顺序错误——`Navigation` 作为外层容器包裹了分区容器。

Navigation 组件有内置的分栏逻辑：它将直接子组件视为 navBar 区域内容，通过 `navPathStack.pushPath()` 推入的页面才显示在内容区。当分区容器（SideBarContainer / Tabs / 自定义分栏布局）作为 Navigation 的直接子组件时：

1. Navigation 将分区容器整体视为 navBar 区域内容
2. 分区容器内部的内容区（如 SideBarContainer 的右侧区域、Tabs 的 TabContent、Row 的右半部分）被 Navigation 当作 navBar 的一部分，无法被识别为独立内容
3. 结果：分区容器的内容区域空白

```typescript
// ❌ 错误结构：Navigation 包裹分区容器（以 SideBarContainer 为例）
Navigation(navPathStack) {
  SideBarContainer(SideBarContainerType.Embed) {
    Column() { MainMenuComponent }  // 侧边栏 → 被 Navigation 当作 navBar 区域
    Column() { 内容 }                // 内容区 → 被 Navigation 当作 navBar 的一部分，空白
  }
}
.mode(NavigationMode.Split)

// ❌ 同理：Navigation 包裹 Tabs
Navigation(navPathStack) {
  Tabs() {
    TabContent() { 菜单 }
    TabContent() { 内容 }  // 空白
  }
}

// ❌ 同理：Navigation 包裹自定义分栏 Row
Navigation(navPathStack) {
  Row() {
    Column() { 菜单 }
    Column() { 内容 }      // 空白
  }
}
```

#### 修复方案

调整为 **分区容器在外层、Navigation 在内层**，使两种容器的职责完全分离：

- 分区容器负责将屏幕划分为多个区域（侧边栏/内容区、多个 Tab、左/右栏等）
- Navigation 嵌套在目标分区内，路由跳转全部限制在该区域内

```typescript
// ✅ 正确结构：SideBarContainer 包裹 Navigation
SideBarContainer(SideBarContainerType.Embed) {
  Column() { MainMenuComponent }    // 侧边栏分区

  Navigation(navPathStack) {        // 内容区中的路由导航
    Column() { TitleBar + 内容 }
  }
  .width('100%')
  .height('100%')
  .hideTitleBar(true)
  .mode(NavigationMode.Split)
}
.showSideBar(this.isShowingSidebar)
.sideBarWidth(240)

// ✅ 同理：Tabs 包裹 Navigation
Tabs() {
  TabContent() { 菜单 }
  TabContent() {
    Navigation(navPathStack) { ... }
  }
}

// ✅ 同理：自定义分栏 Row 包裹 Navigation
Row() {
  Column() { 菜单 }
  Navigation(navPathStack) { ... }
}
```

#### 要点

- 这是容器嵌套顺序问题，不是属性配置问题——所有受影响组件各自的属性（mode、sideBarWidth 等）均正确，但嵌套顺序导致层级冲突。
- **通用规则：Navigation 永远不应包裹分区容器**。分区容器（SideBarContainer、Tabs、自定义分栏布局）必须在外层控制区域划分，Navigation 在某一分区内管理路由。
- 该问题仅在宽屏（折叠屏展开态、平板、分屏模式）上明显复现，窄屏单栏模式下不明显（Navigation 不分栏时层级冲突被掩盖，但语义上仍然是错误的）。
- 三分栏场景（SideBarContainer + Navigation）的正确嵌套方式见 [responsive_layout.md](./responsive_layout.md) 中 RESP-02 第 4 节。

---

### 布局异常 AI 判断规则

1. **检查容器选择**：页面需要"轮播图/主内容 + 底部固定栏"垂直排列时使用 `Column`；需要"背景 + 悬浮按钮/浮层"层叠效果时使用 `Stack`。
2. **检查 GridRow 参考系**：变化的是整个页面或窗口时使用 `BreakpointsReference.WindowSize`；变化的是局部面板、卡片、抽屉、底部区域等组件宽度时使用 `BreakpointsReference.ComponentSize`。
3. **检查遮挡关系**：底部区域遮挡主内容时，检查根容器是否为 `Stack` + `Alignment.Bottom/Top`。
4. **检查 flex 容器溢出截断**：`Row`/`Column`/`Flex` 中子组件总尺寸超出容器时，检查是否正确配置了 `flexShrink` 和 `displayPriority`（仅 Flex 单行模式生效，详见 SIZE-04）。
5. **检查 DPI 与断点联动**：代码通过 `getWindowDensityInfo()` 获取 DPI 手动计算 VP 宽度来判断断点时，必须同时监听 `windowSizeChange` 和 `systemDensityChange` 两个事件（详见 SIZE-06）。
6. **检查 Navigation 与分区容器的嵌套顺序**：`Navigation` 与任何分区容器（`SideBarContainer`、`Tabs`、自定义分栏 `Row`/`Column`）组合使用时，Navigation 必须在内层，分区容器在外层。Navigation 包裹分区容器会导致宽屏内容区空白（详见 LAYOUT-06）。
