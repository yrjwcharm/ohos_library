# 多设备适配规格要求

## 核心概念

### 优先级等级与执行纪律

#### 等级定义

- **[P0] 强制要求**：不遵守会导致应用在部分设备上出现严重体验问题。开发时**必须满足**，无需额外确认，直接实施。
- **[P1] 推荐做法**：建议遵循以获得更好的用户体验。开发时**必须先向用户确认**，未经确认**禁止实施**。

#### 执行流程（强制）

决策树评估和输出**必须**遵守以下流程，禁止跳过：

0. **前置条件最先评估**：SPEC-00 和 SPEC-04 均无条件命中，所有涉及多设备适配的页面都必须满足。前置条件必须在步骤 1~7 之前完成评估并输出命中结论，禁止跳过。步骤 1~7 必须按顺序逐条评估，每一步都需明确输出"命中 SPEC-xx"或"未命中"及理由，禁止因前面步骤已命中就跳过后续步骤。
1. **收集命中清单**：汇总前置条件（SPEC-00、SPEC-04）和步骤 1~7 中所有命中的 SPEC 编号，不得遗漏。
2. **读取完整要求**：逐个读取每个命中 SPEC 的完整要求（从下方规格清单中提取），禁止只看速查表摘要就输出方案。
3. **按优先级拆分**：将所有命中 SPEC 的条款拆分为 P0（强制）和 P1（推荐）两组。
4. **P1 条款枚举**：对照下方"规格优先级速查表"，逐个读取每个命中 SPEC 的 P1 列内容，将所有 P1 条款逐一列出，禁止因只读规格详细定义而遗漏速查表中的 P1 摘要。
5. **P0 条款**：直接纳入实施方案，无需确认。
6. **P0 逐元素验证矩阵**：对每个含尺寸/倍数约束的 P0 条款，必须按元素类型拆分到最小粒度后输出验证矩阵。禁止将多种元素类型合并为一行笼统描述。具体规则：
   - 当 P0 条款同时约束多种元素类型（如"图标/文字"、"图片/文字"）时，必须对每种元素类型分别占一行
   - 每行必须列出 sm（基准值）、md（折叠态倍数）、lg/xl（平板态倍数）以及合规判定
   - 当 P0 条款约束尺寸占比（如"高度≤50%屏高"）时，每个使用该约束的 UI 组件各占一行，列出具体实现值和合规判定
   - 禁止出现"字号按断点梯度"这类合并描述替代逐元素验证
7. **P1 条款**：按下方模板输出确认清单，逐条等待用户确认后方可实施；用户未回复、回复模糊或回复"不需要"时，该条款不实施。

输出格式：

```
P0 强制条款（直接实施）
| # | SPEC | 条款摘要 | 优先级 |
|---|------|---------|--------|
| 1 | ...  | ...     | P0     |

P0 逐元素验证矩阵
| SPEC | 元素类型 | sm(基准) | md(折叠) | 倍数 | lg/xl(平板) | 倍数 | 合规 |
|------|---------|---------|---------|------|-----------|------|------|
| SPEC-13 | 文字-标题栏字号 | 20fp | 22fp | 1.1x | 24fp | 1.2x | ✓ |
| SPEC-13 | 图标-搜索图标 | 24vp | 24vp | 1.0x | 24vp | 1.0x | ✓ |
| SPEC-02 | 图片-轮播封面 | ... | constraintSize(maxHeight: 50%屏高) | — | — | ✓ |
| ... | ... | ... | ... | ... | ... | ... |

P1 推荐条款（需用户逐条确认）
| # | SPEC | 条款摘要 | 是否实施？ |
|---|------|---------|-----------|
| 1 | ...  | ...     | 待确认    |
请逐条确认是否实施上述 P1 条款。
```

---

## 场景决策树

```
开始
  │
  └─→ 前置: 所有场景必须先命中以下两个 SPEC，它们是后续所有 SPEC 的前置基线
        │
        │  `SPEC-00` 布局基础要求（无条件命中）：
        │     ├ 无错位变形、无截断遮挡
        │     └ 所有后续 SPEC 条款不能违背这两条核心要求
        │
        │  `SPEC-04` 小方形屏布局优化（无条件命中）：
        │     └ 所有涉及多设备适配的页面都必须满足小方形屏基本约束
        │
        ├─→ 步骤1: 所有场景（各条件并行评估，可同时命中多个）
        │     ├ 场景: 信息流/新闻列表/社交动态流/商品推荐列表等使用左右边距收窄内容的布局
        │     │       → 命中 `SPEC-07`
        │     ├ 场景: 大屏设备上的页签搜索场景或音乐播放类界面
        │     │       → 命中 `SPEC-06`
        │     ├ 场景: 大屏设备上页面容器或核心业务控件出现大面积空白区域
        │     │       → 命中 `SPEC-09`
        │     └─→ 全部判断完毕 → 步骤2
        │
        ├─→ 步骤2: 分析是否涉及图片展示场景（各条件并行评估，可同时命中多个）
        │     ├ 场景: 宫格或瀑布流布局中展示图片（独立宫格浏览、瀑布流图片列表、信息流中的宫格聚合配图）
        │     │       → 命中 `SPEC-01`
        │     ├ 场景: 单张图片或轮播图横向撑满内容区或窗口边缘（内容区全宽、轮播卡片、沉浸式全窗口）
        │     │       → 命中 `SPEC-02`
        │     │       （`SPEC-01` 针对多列宫格/瀑布流，`SPEC-02` 针对单列全宽/轮播单图）
        │     ├ 场景: 上下图文结构布局（首页入口型卡片、信息流图文列表、内容详情页上图下文）
        │     │       → 命中 `SPEC-03`
        │     │       （页面同时含轮播图和图文卡片时，轮播图走 `SPEC-02`，图文卡片走 `SPEC-03`）
        │     └─→ 全部判断完毕 → 步骤3
        │
        ├─→ 步骤3: 分析是否涉及底部导航栏/侧边栏场景（各条件并行评估，可同时命中多个）
        │     │
        │     ├ 场景: 应用使用底部导航栏/侧边栏（Tab/TabBar）
        │     │       → 命中 `SPEC-08`
        │     │
        │     └─→ 全部判断完毕 → 步骤4
        │
        ├─→ 步骤4: 分析是否涉及文字/图标尺寸场景（各条件并行评估，可同时命中多个）
        │     ├ 场景: 展示文字的场景（标签、按钮、列表项、正文内容、标题等文本元素）
        │     │       → 命中 `SPEC-11`
        │     ├ 场景: 展示界面图标的场景（导航图标、工具栏图标、列表项图标、功能入口图标等）
        │     │       → 命中 `SPEC-12`
        │     ├ 场景: 大屏设备上文字和图标随屏幕放大的尺寸场景（折叠屏展开态、平板、电脑、智慧屏）
        │     │       → 命中 `SPEC-13`
        │     │       （`SPEC-11`/`SPEC-12` 定义尺寸下限，`SPEC-13` 定义相对尺寸上限）
        │     └─→ 全部判断完毕 → 步骤5
        │
        ├─→ 步骤5: 分析是否涉及系统窗口模式场景（各条件并行评估，可同时命中多个）
        │     ├ 场景: 应用在系统分屏模式（上下分屏/左右分屏）下运行，需确保布局适配与比例调节无变形
        │     │       → 命中 `SPEC-10`
        │     ├ 场景: 应用需要支持悬浮窗运行模式，适配等比缩放与横向悬浮窗
        │     │       → 命中 `SPEC-15`
        │     └─→ 全部判断完毕 → 步骤6
        │
        └─→ 步骤6: 分析是否涉及特殊组件场景（各条件并行评估，可同时命中多个）
              ├ 场景: 视频播放、视频会议、视频通话、直播等需要持续展示视频画面，使用画中画能力
              │       → 命中 `SPEC-05`
              ├ 场景: 弹出框（Dialog/Popup/Modal）在折叠屏展开态、平板、电脑、智慧屏等大屏设备上尺寸约束
              │       → 命中 `SPEC-14`
              └─→ 全部判断完毕 → 步骤7

        └─→ 步骤7: 分析是否涉及特殊屏幕形态场景（各条件并行评估，可同时命中多个）
              ├ 场景: 圆形屏（智能手表）适配，涉及页面切屏策略、弧形组件、容器圆角、ArcSwiper
              │       → 命中 `SPEC-16`
              └─→ 全部判断完毕 → 步骤8
        └─→ 步骤8: 收集命中清单，按优先级拆分输出
              │
              ├ 收集步骤1~7中所有命中的 SPEC 编号
              ├ 读取每个命中 SPEC 的完整要求（从下方规格详细定义中提取）
              ├ 按优先级拆分为 P0（强制）和 P1（推荐）两组
              │
              ├ P0 条款：直接纳入实施方案，无需确认
              │
              ├ P1 条款：按下方模板输出确认清单，逐条等待用户确认后方可实施
              │
              └ 输出格式：
                  ┌─ P0 强制条款（直接实施）
                  │  | # | SPEC | 条款摘要 | 优先级 |
                  │  |---|------|---------|--------|
                  │  | 1 | ... | ... | P0 |
                  │
                  └─ P1 推荐条款（需用户逐条确认）
                     | # | SPEC | 条款摘要 | 是否实施？ |
                     |---|------|---------|-----------|
                     | 1 | ... | ... | 待确认 |
                     请逐条确认是否实施上述 P1 条款。
```

> **多图片场景补充说明**：当页面包含多种图片场景时，按容器类型分别命中——宫格/瀑布流中的图片 → `SPEC-01`；轮播图/单张全宽图 → `SPEC-02`；信息流图文卡片/详情页上图下文 → `SPEC-03`。

**禁止行为**：
- 禁止将 P1 条款混入 P0 实施方案中一并执行
- 禁止在代码中直接实现未经确认的 P1 条款
- 禁止以"推荐做法"为由绕过确认流程
- 禁止在用户未确认时通过代码注释标注"P1待确认"但仍写入了实际逻辑
- 禁止直接覆盖原有constraintSize/padding约束，应将 SPEC 的约束合并到已有配置中，除非开发者明确要求。此约束仅适用于**尺寸约束类属性**（constraintSize、padding、margin），不适用于**渲染模式类属性**（objectFit、height('100%')导致拉伸等）——当渲染模式类属性导致图片变形或拉伸时，允许移除或修改这些属性以修复问题。
- 禁止将"图标/文字"等多元素类型条款合并为一行笼统描述（如"字号按断点梯度"），必须按元素类型逐行输出验证矩阵
- 禁止跳过速查表 P1 列的逐行对照，仅凭规格详细定义中的描述来收集 P1 条款

### 规格优先级速查表

> 命中任何含 P1 条款的 SPEC 时，必须遵守 [P1 执行纪律](#p1-执行纪律强制)。

| SPEC | P0 条款                         | P1 条款                                       | 速查摘要 |
|------|-------------------------------|---------------------------------------------|---------|
| SPEC-00 | 无错位变形、无截断遮挡                   | —                                           | 布局基线，所有 SPEC 前置 |
| SPEC-01 | 图片高度 10%~50% 屏高               | 手势缩放列数                                      | 宫格/瀑布流图片 |
| SPEC-02 | 内容区全宽图高度≤50%屏高                | 沉浸式图片高度≤60%屏高                               | 单图/轮播 |
| SPEC-03 | 信息流图片≤40%、详情页≤60%             | 图片放大≤1.2x(折叠)/1.5x(平板)、对齐方式、宽屏布局优化、手势缩放卡片密度 | 上下图文 |
| SPEC-04 | —                             | 页签左右结构、标题栏紧凑、搜索框→图标、分段式索引条、短视频Stack分层、沉浸式浏览 | 小方形屏（阔折叠折叠态） |
| SPEC-05 | —                             | 画中画能力                                       | 视频类场景 |
| SPEC-06 | —                             | 搜索框聚合、播放条聚合                                 | 大屏信息聚合 |
| SPEC-07 | 左边距≤20%屏宽                     | 同应用页面/端边距一致                                 | 信息流边距 |
| SPEC-08 | —                             | **宽屏侧边导航、侧边栏宽度≤40%、拖拽调整侧边面板宽度**             | 底部导航侧边化 |
| SPEC-09 | 留白≤70%                        | 留白≤60%                                      | 大屏留白 |
| SPEC-10 | 分屏布局无异常、分屏比例调节无变形             | —                                           | 分屏适配 |
| SPEC-11 | 最小字号                          | —                                           | 字体合规 |
| SPEC-12 | 最小图标                          | —                                           | 图标合规 |
| SPEC-13 | 图标/文字放大≤1.2x(折叠)/1.5x(平板)     | 一排图标数量                                      | 大屏图标文字 |
| SPEC-14 | 弹出框尺寸约束                       | —                                           | 弹出框 |
| SPEC-15 | —                             | 悬浮窗适配                                       | 悬浮窗 |
| SPEC-16 | 横向/垂直切屏、容器borderRadius('50%') | 弧形组件、ArcSwiper                              | 圆形屏（智能手表） |

---

## 规格清单

### SPEC-00 布局基础要求

**适用场景**

所有涉及多设备适配的场景。应用必须支持在不同尺寸的设备上显示良好，所有界面元素（包括但不限于图片、视频、文字、图标）都应满足以下核心要求。这是所有 SPEC 条款的前置基线——任何具体的规格条款都不能违背这两条核心要求。

**多设备体验标准**

1. **[P0] 无错位变形**：图片、视频等媒体元素在任意屏幕尺寸下保持正确的宽高比与位置，不出现拉伸、压缩、模糊等变形问题。

2. **[P0] 无截断遮挡**：文字、按钮、列表项等内容在任意屏幕尺寸下完整可见，不出现截断、重叠遮挡等信息缺失问题。

---

### SPEC-01 宫格图片信息量适中

**适用场景**

宫格布局或瀑布流布局中展示图片的场景，包括但不限于：独立宫格浏览、瀑布流图片列表、信息流中的宫格聚合配图。

**多设备体验标准**

1. **[P0] 高度占比约束**：宫格布局或瀑布流布局的图片单行高度不要低于屏幕高度的 10%，不要超过屏幕高度的 50%。

2. **[P1] 手势缩放列数**：为宫格类布局提供双指捏合缩放能力，允许用户动态调整每行展示的卡片数量。

**解决方案**

- Ability 侧监听窗口高度变化并写入 AppStorage（详见 [窗口监听指南](./window_detection.md)）：
```typescript
// EntryAbility.onWindowStageCreate → loadContent 回调内
windowStage.loadContent('pages/Index', (err) => {
  if (err.code) {
    return;
  }
  const mainWindow = windowStage.getMainWindowSync();
  const uiContext = mainWindow.getUIContext();
  const initHeight: number = uiContext.px2vp(mainWindow.getWindowProperties().windowRect.height);
  AppStorage.setOrCreate('screenHeightVp', initHeight);
  mainWindow.on('windowSizeChange', (size: window.Size) => {
    const heightVp: number = uiContext.px2vp(size.height);
    AppStorage.setOrCreate('screenHeightVp', heightVp);
  });
});
```

- 初始化宫格图片列数
```typescript
@State columns: number = 3;
private readonly MIN_COLUMNS: number = 2;
private readonly MAX_COLUMNS: number = 4;

private getColumnForBreakpoint(bp: WidthBreakpoint): number {
   if (bp === WidthBreakpoint.WIDTH_XS) return 2;
   if (bp === WidthBreakpoint.WIDTH_MD) return 3;
   if (bp === WidthBreakpoint.WIDTH_LG) return 4;
   if (bp === WidthBreakpoint.WIDTH_XL) return 4;
   return 3;
}

aboutToAppear(): void {
   const widthBp = this.getUIContext().getWindowWidthBreakpoint();
   this.columns = this.getColumnForBreakpoint(widthBp) ?? 3;
}
```

- 组件侧通过 `@StorageProp` 消费，使用 `constraintSize` 约束高度占比；通过 `PinchGesture` 放缩宫格图列数

```typescript
@StorageProp('screenHeightVp') screenHeightVp: number = 0;

Scroll() {
   GridRow({ columns: this.columns, gutter: { x: 12, y: 12 } }) {
      ForEach(AlbumViewConstants.IMAGE_LIST, (item: ImageData, index: number) => {
         GridCol() {
            Image(item.src)
               .width('100%')
               .aspectRatio(1)
               .objectFit(ImageFit.Cover)
               .autoResize(true)
               .borderColor(item.selected ? Color.Blue : Color.White)
               .borderWidth(1)
               // SPEC-01: 高度占比 10%~50%
               .constraintSize({
                  minHeight: this.screenHeightVp > 0 ? this.screenHeightVp * 0.1 : 0,
                  maxHeight: this.screenHeightVp > 0 ? this.screenHeightVp * 0.5 : undefined
               })
               .onClick(() => {
                  item.selected = !item.selected;
               })
         }
      }, (item: ImageData, index: number) => index + JSON.stringify(item))
   }
   .width('100%')
   .padding({ left: 12, right: 12 })
}
.layoutWeight(1)
.width('100%')
.scrollBar(BarState.Auto)
.edgeEffect(EdgeEffect.Spring)
// parallelGesture 避免阻断滚动
.parallelGesture(
   PinchGesture({ fingers: 2 })
      .onActionEnd((event: GestureEvent) => {
         if (event.scale < 1 && this.columns < this.MAX_COLUMNS) {
            // 捏合 → 缩小 → 增加列数
            this.getUIContext().animateTo({ duration: 300 }, () => { this.columns += 1; });
         } else if (event.scale > 1 && this.columns > this.MIN_COLUMNS) {
            // 张开 → 放大 → 减少列数
            this.getUIContext().animateTo({ duration: 300 }, () => { this.columns -= 1; });
         }
      })
)
```

---

### SPEC-02 单图信息量适中

**适用场景**

单张图片在页面中横向撑满时（包括内容区全宽、轮播卡片顶满内容区、沉浸式顶满窗口边缘等），需约束其高度占比，确保图片下方留有充足空间展示文字或其他信息，兼顾视觉冲击力与信息获取效率。


**多设备体验标准**

1. **[P0] 内容区全宽图片高度上限**：单张图片或轮播卡片宽度顶满内容区时，图片高度不超过屏幕高度的 50%。

2. **[P1] 沉浸式全窗口图片高度上限**：沉浸式单张图片顶满窗口边缘时，图片高度不超过屏幕高度的 60%。

**解决方案**

- Ability 侧监听窗口高度变化并写入 AppStorage（详见 [窗口监听指南](./window_detection.md)）：
```typescript
// AppStorage 已在 EntryAbility 中设置 screenHeightVp
windowStage.loadContent('pages/Index', (err) => {
  if (err.code) {
    return;
  }
  const mainWindow = windowStage.getMainWindowSync();
  const uiContext = mainWindow.getUIContext();
  const initHeight: number = uiContext.px2vp(mainWindow.getWindowProperties().windowRect.height);
  AppStorage.setOrCreate('screenHeightVp', initHeight);
  mainWindow.on('windowSizeChange', (size: window.Size) => {
    const heightVp: number = uiContext.px2vp(size.height);
    AppStorage.setOrCreate('screenHeightVp', heightVp);
  });
});
```

- 组件侧消费 — 使用 `constraintSize` 约束高度占比
```typescript
@StorageProp('screenHeightVp') screenHeightVp: number = 0

// 内容区全宽图片 → 高度上限 50%
Image(src)
  .width('100%')
  .constraintSize({
    maxHeight: this.screenHeightVp > 0 ? this.screenHeightVp * 0.5 : undefined
  })
  .objectFit(ImageFit.Cover)

// 沉浸式全窗口图片 → 高度上限 60%
Image(src)
  .width('100%')
  .constraintSize({
    maxHeight: this.screenHeightVp > 0 ? this.screenHeightVp * 0.6 : undefined
  })
  .objectFit(ImageFit.Cover)
```


---

### SPEC-03 上下图文信息量适中

**适用场景**

上下图文结构（上图下文 / 上文下图）是应用中最常见的布局形式之一，需合理控制图片尺寸和占比，确保信息量适中。典型场景包括：首页入口型卡片（应用首页功能入口、推荐卡片）、信息流（新闻列表、社交动态流）、内容详情页（新闻详情、文章阅读）。


**多设备体验标准**

1. **[P1] 放大倍数约束**：
   - 双折叠/三折叠设备展开态上图片等比放大时，放大倍数不超过 1.2 倍。
   - 平板上图片比直板机放大不超过 1.5 倍。

2. **[P1] 对齐方式**：上下图文结构中，信息流场景的图片建议左对齐，阅读场景的图片建议居中对齐。

3. **[P1] 宽屏设备布局优化**：在平板、双折叠/三折叠设备展开态、电脑设备最大化窗口等宽屏设备上，建议通过延伸布局、挪移布局等方式让图文进行合理布局，避免图片过大。

4. **[P0] 高度占比约束**：
   - 信息流场景：非宫格聚合图片高度不要超过屏幕高度的 40%，长图或宫格聚合图片整体高度不要超过屏幕高度的 60%。
   - 内容详情页：图片高度不要超过屏幕高度的 60%。

5. **[P1] 手势缩放卡片密度**：为图文布局提供双指捏合缩放能力，允许用户动态调整卡片尺寸或列表密度。

**解决方案**

- Ability 侧监听窗口高度变化并写入 AppStorage（详见 [窗口监听指南](./window_detection.md)）：
```typescript
// AppStorage 已在 EntryAbility 中设置 screenHeightVp
windowStage.loadContent('pages/Index', (err) => {
  if (err.code) {
    return;
  }
  const mainWindow = windowStage.getMainWindowSync();
  const uiContext = mainWindow.getUIContext();
  const initHeight: number = uiContext.px2vp(mainWindow.getWindowProperties().windowRect.height);
  AppStorage.setOrCreate('screenHeightVp', initHeight);
  AppStorage.setOrCreate('currentWidthBreakpoint', uiContext.getWindowWidthBreakpoint());
  mainWindow.on('windowSizeChange', (size: window.Size) => {
    const heightVp: number = uiContext.px2vp(size.height);
    AppStorage.setOrCreate('screenHeightVp', heightVp);
    AppStorage.setOrCreate('currentWidthBreakpoint', uiContext.getWindowWidthBreakpoint());
  });
});
```

- BreakpointType 按断点分配单图基础宽度/高度尺寸，保证尺寸放大倍数不超过1.2：       
```typescript
export class BreakpointType<T> {
   sm: T;
   md: T;
   lg: T;

   constructor(sm: T, md: T, lg: T) {
      this.sm = sm;
      this.md = md;
      this.lg = lg;
   }

   getValue(currentBreakpoint: WidthBreakpoint): T {
      if (currentBreakpoint === WidthBreakpoint.WIDTH_MD) {
         return this.md;
      }
      if (currentBreakpoint === WidthBreakpoint.WIDTH_LG) {
         return this.lg;
      } else {
         return this.sm;
      }
   }
}

getSingleImageWidth(): number {
  const baseWidth: number = new BreakpointType<number>(320, 380, 450)
  .getValue(this.currentBreakpoint);
  return baseWidth;
}
```

- constraintSize 约束高度占比：
```typescript
// 图片高度占屏幕高度比例上限
private readonly IMAGE_HEIGHT_RATIO: number = 0.4;
@StorageProp('screenHeightVp') screenHeightVp: number = 0
@StorageProp('currentWidthBreakpoint') currentBreakpoint: WidthBreakpoint = WidthBreakpoint.WIDTH_LG
@State pictureMarginTop: number = Common.PICTURE_MARGIN_TOP;  // 8

Image(this.cardItem.pictureArray[0])
 .width(this.getSingleImageWidth())
 .objectFit(ImageFit.Cover)
 .constraintSize({
   maxHeight: this.screenHeightVp > 0 ? this.screenHeightVp * this.IMAGE_HEIGHT_RATIO : undefined
 })
 .onClick(() => {
   this.jump(0);
 })
 .margin({ top: `${this.pictureMarginTop}${Common.SUFFIX_VP}` })
```

- 双指缩放驱动文字/行高/间距实时变化：
```typescript
Row() {
   Text(this.cardItem.content)
      .fontSize(`${this.contentFontSize}fp`)
      .lineHeight(`${this.contentFontHeight}vp`)
      .width(BaseCommon.FULL_PERCENT)
      .fontColor(this.isDarkMode ? $r('app.color.card_item_content_fc_dark') : Color.Black)
      .copyOption(CopyOptions.LocalDevice)
}
.gesture(
   PinchGesture({ fingers: Common.PINCH_GESTURE_FINGERS })
      .onActionUpdate((event?: GestureEvent) => {
         if (event && (this.isDetailPage || this.isPictureDetail)) {
            // PINCH-01: 基于上次基准 × 当前手势缩放比，钳位到 [MIN_SCALE, MAX_SCALE]
            let tmp = this.pinchValue * event.scale;
            if (tmp > Common.MAX_SCALE) {
               tmp = Common.MAX_SCALE;
            }
            if (tmp < Common.MIN_SCALE) {
               tmp = Common.MIN_SCALE;
            }
            this.scaleValue = tmp;
            this.contentFontSize = Common.CONTENT_FONT_SIZE * this.scaleValue;
            this.contentFontHeight = Common.CONTENT_FONT_HEIGHT * this.scaleValue;
            this.pictureMarginTop = Common.PICTURE_MARGIN_TOP *
               (this.scaleValue > 1 ? this.scaleValue : 1);
         }
      })
      .onActionEnd(() => {
         // PINCH-02: 手势结束，记录当前缩放值为下次基准
         this.pinchValue = this.scaleValue;
      })
)
```

---

### SPEC-04 阔折叠设备小外屏（小方形屏）布局优化

**适用场景**

小方形屏（屏幕比例 1:1，横向分辨率 < 600vp，横向断点 WidthBreakpoint.WIDTH_SM / 纵向断点 HeightBreakpoint.HEIGHT_MD）设备上的布局适配场景。典型设备为 Pura X 外屏（阔折叠折叠态）。由于 1:1 的屏幕比例和小尺寸屏幕，需要特别关注内容完整性，确保布局完整显示，避免内容截断、挤压或堆叠。

适用场景包括但不限于：底部导航 + 内容列表的经典布局、标题栏与搜索框并存的页面头部、短视频播放页面、包含自定义弹窗的页面、信息流/列表类页面。

**多设备体验标准**

1. **[P1] 底部页签左右结构切换**： 外屏高度较小的阔折叠折叠态，页签栏从上下结构切换为左右结构。

2. **[P1] 标题栏留白优化**：针对屏幕高度较小的阔折叠设备，建议适当缩小标题栏字号与垂直占位，减少顶部留白区域，增加核心内容显示空间。

3. **[P1] 搜索入口形态优化**：针对屏幕高度较小的阔折叠设备，建议将独立搜索框切换为搜索图标，并与标题栏同行显示，以减少顶部垂直占位并增加核心内容显示空间。

4. **[P1] 使用分段式索引条**：针对屏幕高度较小的阔折叠设备，采用分段式索引条，长按指定分段可滑动选取具体字母进行索引。

5. **[P1] 短视频播放页面适配**：短视频播放页面使用 `Stack` 分层布局，背景图片（视频）等比例缩放并上下沉浸。侧边控件区使用 `Scroll` 支持滑动，使用 `Blank` 和 `displayPriority` 控制留白，容器高度不足时自动隐藏。

6. **[P1] 沉浸式浏览**：小方形屏通用场景中，考虑到屏幕空间有限，建议使用上滑隐藏、下滑恢复的功能。上滑临时隐藏标题栏、页签栏等界面元素，下滑时通过动画逐渐恢复显示。

**解决方案**

- 在 Ability 生命周期中初始化系统断点，注册窗口尺寸变化监听：

```typescript
// onWindowStageCreate → loadContent 回调内
windowStage.loadContent('pages/Index', (err) => {
  if (err.code) {
    return;
  }
  const mainWindow = windowStage.getMainWindowSync();
  const uiContext = mainWindow.getUIContext();

  // 初始化系统断点
  AppStorage.setOrCreate('currentWidthBreakpoint', uiContext.getWindowWidthBreakpoint());
  AppStorage.setOrCreate('currentHeightBreakpoint', uiContext.getWindowHeightBreakpoint());

  // 监听窗口尺寸变化，实时更新系统断点
  mainWindow.on('windowSizeChange', () => {
    AppStorage.setOrCreate('currentWidthBreakpoint', uiContext.getWindowWidthBreakpoint());
    AppStorage.setOrCreate('currentHeightBreakpoint', uiContext.getWindowHeightBreakpoint());
  });
});
```

- 在页面中通过 横向断点（`WidthBreakpoint.WIDTH_SM`）和纵向断点（`HeightBreakpoint.HEIGHT_MD`） 判定小方形屏，联动调整标题字号与搜索入口形态：

```typescript
@StorageLink('currentWidthBreakpoint') currentWidthBp: WidthBreakpoint = WidthBreakpoint.WIDTH_SM;
@StorageLink('currentHeightBreakpoint') currentHeightBp: HeightBreakpoint = HeightBreakpoint.HEIGHT_SM;
```

- 标题栏与搜索图标同行显示（小高度阔折叠设备时）：

```typescript
Row() {
   Text('联系人')
      .fontSize(this.currentWidthBp === WidthBreakpoint.WIDTH_SM &&
         this.currentHeightBp === HeightBreakpoint.HEIGHT_MD ? 18 : 20)
      .fontWeight(FontWeight.Bold)
   Blank()
   if (this.currentWidthBp === WidthBreakpoint.WIDTH_SM &&
      this.currentHeightBp === HeightBreakpoint.HEIGHT_MD) {
      Stack() {
         Circle().width(28).height(28).fill('#F8BBD9')
         Image($r('app.media.ic_search')).width(14).height(14).fillColor(Color.White)
      }
   }
   Image($r('app.media.ic_add')).width(24).height(24).fillColor('#8C8C8C')
   Image($r('app.media.ic_more')).width(24).height(24).fillColor('#8C8C8C')
}
.height(this.currentWidthBp === WidthBreakpoint.WIDTH_SM &&
   this.currentHeightBp === HeightBreakpoint.HEIGHT_MD ? 44 : 56)
```

- 启用 `autoCollapse` 分段式索引条：

```typescript
AlphabetIndexer({ arrayValue: this.dataSet, selected: 0 })
   .autoCollapse(true)  // 启用自动折叠
   .selectedColor(this.selectedColor)
   .popupSelectedColor(this.popupSelectedColor)
```

- 短视频播放页面 `Stack` 分层布局：

```typescript
Stack({ alignContent: Alignment.BottomEnd }) {
  // 背景图片（视频）— 等比例缩放并上下沉浸
  Row() {
    Image($r('app.media.background_image'))
      .height('100%').objectFit(ImageFit.Cover).aspectRatio(0.6)
  }.height('100%').width('100%').justifyContent(FlexAlign.Center)

  // 底部页签区
  List() { /* ... */ }
    .listDirection(Axis.Horizontal).height(this.bottomBarHeight)
    .padding({ bottom: this.bottomAvoidHeight })

  // 视频描述区
  Column() { /* ... */ }.alignItems(HorizontalAlign.Start)
    .padding({ left: $r('app.float.margin_md'), right: $r('app.float.margin_md') })

  // 侧边控件区 — Scroll 支持滑动 + Blank/displayPriority 控制留白
  Scroll() {
    Column() {
      Blank().layoutWeight(3).displayPriority(1)
      // 点赞、评论、分享等侧边控件
      Blank().layoutWeight(1).displayPriority(1)
    }
  }.scrollBar(BarState.Off).layoutWeight(1).width('56vp').align(Alignment.Bottom)
    .margin({ top: this.topAvoidHeight + 24, bottom: this.bottomBarHeight, right: '8vp' })

  // 顶部页签区
  Row() { /* ... */ }
}.height('100%').width('100%').backgroundColor(Color.Black)
```

- 沉浸式浏览（上滑隐藏/下滑恢复标题栏和页签栏）：

```typescript
@State topBarHeight: number = 0
@State bottomBarHeight: number = 0
@State barOpacity: number = 1

aboutToAppear(): void {
   this.topBarHeight = TOP_BAR_BASE;
   this.bottomBarHeight = BOTTOM_BAR_BASE;
}

// 在 Stack 内：列表内容设置顶部外边距，监听滚动动态调整
List() {
   // 列表内容
}
.margin({ top: this.topBarHeight, bottom: this.bottomBarHeight })
.onScrollFrameBegin((offset: number) => {
   if (this.currentWidthBp !== WidthBreakpoint.WIDTH_SM ||
      (this.currentHeightBp !== HeightBreakpoint.HEIGHT_MD &&
         this.currentHeightBp !== HeightBreakpoint.HEIGHT_SM)) {
      return { offsetRemain: offset };
   }
   if (offset > 0 && this.barOpacity > 0) {
      // 上滑：隐藏标题栏和页签栏
      this.getUIContext().animateTo({ duration: 300 }, () => {
         this.topBarHeight = 0
         this.bottomBarHeight = 0
         this.barOpacity = 0
      })
   }
   if (offset < 0 && this.barOpacity === 0) {
      // 下滑：恢复标题栏和页签栏
      this.getUIContext().animateTo({ duration: 300 }, () => {
         this.topBarHeight = 78 + this.topAvoidHeight
         this.bottomBarHeight = 56 + this.bottomAvoidHeight
         this.barOpacity = 1
      })
   }
   return { offsetRemain: offset }
})

// 标题栏绑定高度和透明度
Row() { /* 标题栏内容 */ }
   .height(this.topBarHeight)
   .opacity(this.barOpacity)

// 页签栏绑定高度和透明度
Row() { /* 页签栏内容 */ }
   .height(this.bottomBarHeight)
   .opacity(this.barOpacity)
```

---

### SPEC-05 视频类场景使用画中画能力

**适用场景**

视频播放、视频会议、视频通话、直播等需要持续展示视频画面的场景。


**多设备体验标准**

1. **[P1] 启用画中画能力**：在视频播放、视频会议、视频通话、直播场景中，应接入系统画中画能力，支持用户在离开当前页面时将视频画面缩小为小窗继续播放/展示。

**解决方案**

基于 `@kit.ArkUI` 的 `PiPWindow` API（API 20+，支持 Phone / Tablet / PC(2in1)）。完整示例参见 [PipWindow.ets](../assets/PipWindow.ets)。

- 步骤 1：创建画中画控制器（在 `onPageShow` 中调用）

```typescript
import { PiPWindow, typeNode } from '@kit.ArkUI';

// 检查设备是否支持画中画
if (!PiPWindow.isPiPEnabled()) {
  console.error('画中画功能在当前系统不可用');
  return;
}

// 配置画中画参数
let config: PiPWindow.PiPConfiguration = {
  context: this.getUIContext().getHostContext() as Context,
  componentController: xComponentController,
  templateType: PiPWindow.PiPTemplateType.VIDEO_PLAY,
  contentWidth: 1920,
  contentHeight: 1080,
};

// 创建控制器，注册状态与控制事件回调
PiPWindow.create(config, customNodeController.getNode())
  .then((controller: PiPWindow.PiPController) => {
    controller.setAutoStartEnabled(true); // 返回桌面时自动进入画中画
    controller.on('stateChange', (state: PiPWindow.PiPState, reason: string) => { /* 处理状态变化 */ });
    controller.on('controlEvent', (control: PiPWindow.ControlEventParam) => {
      // 转发控制面板操作（播放/暂停）给播放器
      if (control.controlType === PiPWindow.PiPControlType.VIDEO_PLAY_PAUSE) {
        if (control.status === PiPWindow.PiPControlStatus.PLAY) { /* player.play() */ }
        else if (control.status === PiPWindow.PiPControlStatus.PAUSE) { /* player.pause() */ }
      }
    });
  });
```

- 步骤 2：启动画中画

```typescript
pipController.startPiP();
```

- 步骤 3：更新媒体源尺寸（视频尺寸变化时调用）

```typescript
pipController.updateContentSize(width, height);
```

- 步骤 4：停止画中画（恢复全屏）

```typescript
pipController.stopPiP();
```

- XComponent 节点管理（画中画启动时移出主布局，停止时回添）

```typescript
// 画中画即将启动 → 从主布局移除节点（避免节点被两处引用）
customNodeController.removeNode();

// 画中画即将停止 → 将节点重新添加回主布局（不要 dispose，否则无法再次启动）
customNodeController.addNode();
```

- 页面生命周期集成

```typescript
onPageShow(): void {
  PipManager.getInstance().initPipController(this.getUIContext().getHostContext() as Context);
  PipManager.getInstance().setAutoStart(true);
}

onPageHide(): void {
  PipManager.getInstance().removeNode();
}

aboutToDisappear(): void {
  PipManager.getInstance().unregisterPipStateChangeListener();
}
```

- module.json5 配置

```json5
{
  "module": {
    "abilities": [
      {
        "name": "EntryAbility",
        "continuable": true
      }
    ]
  }
}
```

---

### SPEC-06 大屏设备上信息聚合

**适用场景**

大屏设备上，页签搜索场景中建议搜索框，子页签与标题栏聚合显示；音乐类应用建议播放条与底部页签聚合显示


**多设备体验标准**

1. **[P1] 搜索框与子页签和标题栏聚合显示**：在信息搜索，信息展示，新闻阅读，商品浏览等场景，建议大屏设备上顶部的搜索框和子页签和标题栏放在同一行。

2. **[P1] 音乐播放类界面播放条与底部页签聚合显示**：在音乐播放类界面，建议大屏设备上页面底部的播放条和底部页签聚合显示，放在同一行或者同一区间中。

---

### SPEC-07 信息流边距控制

**适用场景**

信息流列表通过左右边距控制卡片或内容区域的水平显示宽度，避免内容在宽屏设备上横向过度拉伸，保持阅读舒适度。典型场景包括：新闻信息流、社交动态流、商品推荐列表等使用边距来收窄内容宽度的信息流布局。

**多设备体验标准**

1. **[P0] 左边距强制上限**：信息流场景中，左边距不超过屏幕宽度的 20%。

2. **[P1] 同应用不同页面边距**：同一个应用内不同的页面建议保持相同的边距

3. **[P1] 同应用不同端边距**：同一个应用在不同端上，可以根据设备屏幕的宽度进行适量的边距调整

**解决方案**

- 监听窗口断点变化：

```typescript
// 监听窗口断点变化，使用断点能力适配分屏
windowStage.loadContent('pages/Index', (err) => {
  if (err.code) {
    return;
  }
  const mainWindow = windowStage.getMainWindowSync();
  const uiContext = mainWindow.getUIContext();

  // 初始化系统断点
  AppStorage.setOrCreate('currentWidthBreakpoint', uiContext.getWindowWidthBreakpoint());
  AppStorage.setOrCreate('currentHeightBreakpoint', uiContext.getWindowHeightBreakpoint());

  // 监听窗口尺寸变化，实时更新系统断点
  mainWindow.on('windowSizeChange', () => {
     AppStorage.setOrCreate('currentWidthBreakpoint', uiContext.getWindowWidthBreakpoint());
     AppStorage.setOrCreate('currentHeightBreakpoint', uiContext.getWindowHeightBreakpoint());
  });
});
```

- 配置断点枚举类:
```typescript
export class BreakpointType<T> {
  sm: T;
  md: T;
  lg: T;

  constructor(sm: T, md: T, lg: T) {
    this.sm = sm;
    this.md = md;
    this.lg = lg;
  }

  getValue(currentBreakpoint: WidthBreakpoint): T {
    if (currentBreakpoint === WidthBreakpoint.WIDTH_MD) {
      return this.md;
    }
    if (currentBreakpoint === WidthBreakpoint.WIDTH_LG) {
      return this.lg;
    } else {
      return this.sm;
    }
  }
}
```

- 根据不同的断点值获取边距，保证各个断点边距值不超过屏幕宽度20%：
```typescript
@StorageLink('currentWidthBreakpoint') currentBreakpoint: WidthBreakpoint = WidthBreakpoint.WIDTH_XS;

.padding({
   left: new BreakpointType($r('app.float.window_padding_left_sm'),
      $r('app.float.window_padding_left_md'),
      $r('app.float.window_padding_left_lg')).getValue(this.currentBreakpoint),
   right: new BreakpointType($r('app.float.window_padding_left_sm'),
      $r('app.float.window_padding_left_md'),
      $r('app.float.window_padding_left_lg')).getValue(this.currentBreakpoint)
})
```

---

### SPEC-08 宽屏场景底部导航侧边化与能力扩展

**适用场景**

应用主界面使用底部导航（Bottom Tab）承载一级导航，且存在平板、折叠屏展开态、桌面窗口化等宽屏使用场景。

**侧边导航形态选择与能力对比**：

| 对比维度 | 侧边 Tab（Side Tab） | 侧边导航栏（Side Navigation） |
|---------|---------------------|---------------------------|
| 核心定位 | 底部 Tab 的位置迁移形态 | 面向宽屏的信息架构增强形态 |
| 信息架构 | 保持原有一级结构，导航项数量和层级与底部 Tab 一致 | 可引入分组、二级层级或导航分区 |
| 交互模式 | 强调与底部 Tab 的状态连续 | 可新增高频操作与功能直达入口 |
| 能力扩展 | 无扩展，仅位置变化 | 可扩展导航层级、增加导航选项、增加高频功能直达 |
| 适用场景 | 仅位置变更时优先使用 | 需要增强信息架构与效率时优先使用 |

**多设备体验标准**

1. **[P1] 宽屏结构切换推荐**：当应用窗口宽度 **>= 840vp** （系统断点`lg`） 时，应用的底部导航栏切换为侧边导航栏。

2. **[P1] 侧边栏宽度**：单侧边栏宽度变化，引起内容区扩展或缩小时，侧边栏宽度始终不超过窗口宽度的40%；应用内也可同时存在左右侧面板，内容区至少占窗口的60%。

3. **[P1] 侧边面板拖拽调整宽度**：侧边面板（导航、筛选、信息）支持拖拽调整宽度，允许用户根据使用偏好灵活调整侧边面板宽度。

**解决方案**

- 使用 Tabs 组件基于断点切换底部/侧边导航：

```typescript
Tabs({
  barPosition: this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_LG ? BarPosition.Start : BarPosition.End
}) {
  TabContent() {
    TopTabView({
      pageInfos: this.pageInfos,
      mainWindowInfo: this.mainWindowInfo,
      firstLevelIndex: this.firstLevelIndex,
      tabData: this.tabData
    })
  }
  .tabBar(this.tabBuilder(this.firstTabList[0], 0))

  TabContent()
    .tabBar(this.tabBuilder(this.firstTabList[1], 1))

  TabContent()
    .tabBar(this.tabBuilder(this.firstTabList[2], 2))

  TabContent()
    .tabBar(this.tabBuilder(this.firstTabList[3], 3))
}
.barBackgroundColor('#CCF1F3F5')
.barWidth(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_LG ? 96 : '100%')
.barHeight(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_LG ? '100%' : 56 + this.getUIContext().px2vp(this.mainWindowInfo.AvoidNavigationIndicator?.bottomRect.height))
.barMode(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_LG ? BarMode.Scrollable : BarMode.Fixed,
  { nonScrollableLayoutStyle: LayoutStyle.ALWAYS_CENTER })
.barBackgroundBlurStyle(BlurStyle.COMPONENT_THICK)
.vertical(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_LG)
.onChange((index: number) => {
  this.firstLevelIndex = index;
})
```

- 使用 SideBarContainer 实现侧边导航栏（参考 [侧边栏](./responsive_layout.md#1-侧边栏sidebarcontainer--断点)）：

```typescript
SideBarContainer(this.mainWindowInfo.widthBp === WidthBreakpoint.WIDTH_SM ? SideBarContainerType.Overlay :
  SideBarContainerType.Embed) {
  Column() {
    // 侧边导航栏内容
  }
  .backgroundColor('#F1F3F5')

  Column() {
    // 主内容区
  }
  .backgroundColor('#FDBFFC')
  .padding({
    top: this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) + 12,
    bottom: this.getUIContext().px2vp(this.mainWindowInfo.AvoidNavigationIndicator?.bottomRect.height),
    left: 16,
    right: 16
  })
}
.showSideBar(this.isShowingSidebar)
.sideBarWidth(new WidthBreakpointType('80%', '50%', '40%', '40%').getValue(this.mainWindowInfo.widthBp))
.controlButton({ top: this.getUIContext().px2vp(this.mainWindowInfo.AvoidSystem?.topRect.height) + 12 })
```

---

### SPEC-09 大屏设备页面/控件留白比例约束

**适用场景**

在平板、2in1、折叠屏展开态或桌面窗口化等大屏设备上，页面容器或核心业务控件出现大面积空白区域的场景。

**多设备体验标准**

1. **[P1] 留白比例推荐值**：大屏设备上，页面或关键控件的留白比例建议不超过 **60%**，以保证信息密度和可读性。

2. **[P0] 留白比例强制上限**：大屏设备上，页面或关键控件的留白比例不得超过 **70%**；超过该阈值视为适配不合规。

---

### SPEC-10 分屏适配

**适用场景**

应用在系统分屏模式（上下分屏、左右分屏）下运行的场景，需确保布局在不同分屏比例下显示正常。

**多设备体验标准**

1. **[P0] 分屏布局显示良好**：分屏运行时，应用布局显示良好，无元素截断、遮挡、溢出等异常问题。

2. **[P0] 分屏比例调节无变形**：应用支持分屏比例调节，比例调节时元素无变形、挤压的情况出现。

**解决方案**

- 在 `module.json5` 中声明支持的窗口模式：

```json5
{
  "module": {
    "abilities": [
      {
        "name": "EntryAbility",
        // 支持全屏和分屏模式
        "supportWindowMode": ["fullscreen", "split"]
      }
    ]
  }
}
```

- 监听窗口断点变化，使用断点能力适配分屏：

```typescript
// 监听窗口断点变化，使用断点能力适配分屏
windowStage.loadContent('pages/Index', (err) => {
  if (err.code) {
    return;
  }
  const mainWindow = windowStage.getMainWindowSync();
  const uiContext = mainWindow.getUIContext();

  // 初始化系统断点
  AppStorage.setOrCreate('currentWidthBreakpoint', uiContext.getWindowWidthBreakpoint());
  AppStorage.setOrCreate('currentHeightBreakpoint', uiContext.getWindowHeightBreakpoint());

  // 监听窗口尺寸变化，实时更新系统断点
  mainWindow.on('windowSizeChange', () => {
     AppStorage.setOrCreate('currentWidthBreakpoint', uiContext.getWindowWidthBreakpoint());
     AppStorage.setOrCreate('currentHeightBreakpoint', uiContext.getWindowHeightBreakpoint());
  });
});
```

- 使用 `GridRow` / `GridCol` 配合断点差异化列数和跨列：

```typescript
GridRow({
  columns: { sm: 4, md: 11, lg: 3 }
}) {
  GridCol({
    span: { sm: 2, md: 12, lg: 3 }
  }) { /* TopTabBar */ }

  GridCol({
    span: { sm: 2, md: 2, lg: 2 }
  }) { /* SearchBar */ }
}
```

- 监听窗口状态变化，在分屏模式下进行服务降级（详见 [窗口监听指南](./window_detection.md#窗口状态监听)）：

```typescript
// 能力检查
if (canIUse('SystemCapability.Window.SessionManager')) {
  this.mainWindow!.on('windowStatusChange', (status: window.WindowStatusType) => {
    AppStorage.setOrCreate('windowStatus', status);
  });
}

// 组件侧根据窗口状态降级
@StorageProp('windowStatus') windowStatus: number = window.WindowStatusType.FULL_SCREEN

build() {
  if (this.windowStatus === window.WindowStatusType.SPLIT_SCREEN) {
    // 分屏模式：降级处理，隐藏次要功能、简化动画、减少信息密度
    CompactLayout()
  } else {
    FullLayout()
  }
}
```

- 使用 `Scroll` 及 `.layoutWeight` 自动调整组件尺寸并保证组件滚动可见：

```typescript
@Component
export struct HomeContent {
  @StorageProp('currentWidthBreakpoint') widthBreakpoint: WidthBreakpoint = WidthBreakpoint.WIDTH_LG;
  private scroller: Scroller = new Scroller();

  build() {
    Column() {
      // ── 固定区域: 顶部 Header 不随内容滚动 ──
      HomeHeader()

      // ── 弹性区域: 内容滚动区 ──
      Scroll(this.scroller) {
        Column() {
          Categories()
          Column() {
            RecommendedProductView()
            WelfareView()
            Selection()
            FlashSale()
          }
        }
      }
      .layoutWeight(1)              // ★ 关键: 占满 Header 以下的全部剩余高度
                                     //   全屏 → 可视区域大，大部分内容直接可见
                                     //   上下分屏 → 可视区域减半 → 自动滚动
      .scrollBar(BarState.Off)
    }
    .height('100%')                 // ★ Column 撑满窗口高度
    .width('100%')
  }
}
```

---

### SPEC-11 字体大小合规

**适用场景**

应用内所有展示文字的场景，包括但不限于：标签、按钮、列表项、正文内容、标题等文本元素。确保文字在不同设备类型上具备足够的可读性，且在用户调整系统字体缩放时不会出现过小或过大的问题。

**多设备体验标准**

1. **[P0] 手机/折叠屏/平板文本字号**：文本字号不小于 8 vp（推荐不小于 12 vp）。

2. **[P0] 电脑文本字号**：文本字号不小于 10 vp（推荐不小于 14 vp）。

3. **[P0] 智慧屏文本字号**：文本字号不小于 14 vp（推荐不小于 16 vp），其中正文字号建议 22～26 vp。

4. **[P0] 智能穿戴文本字号**：文本字号不小于 10 vp（推荐不小于 13 vp）。

| 设备类型 | 最小字号（必须） | 推荐字号 |
|---------|----------------|---------|
| 手机/折叠屏/平板 | 8 vp | 12 vp |
| 电脑 | 10 vp | 14 vp |
| 智慧屏 | 14 vp | 16 vp（正文 22～26 vp） |
| 智能穿戴 | 10 vp | 13 vp |

**解决方案**

- 使用 `minFontSize` 约束最小字号：

```typescript
import { deviceInfo } from '@kit.BasicServicesKit';

function getMinFontSize(): number {
  const deviceType = deviceInfo.deviceType;
  switch (deviceType) {
    case 'phone':
    case 'tablet':
      return 8; // 推荐 12vp，最小 8vp
    case '2in1':
      return 10; // 推荐 14vp，最小 10vp
    case 'tv':
      return 14; // 推荐 16vp，最小 14vp
    case 'wearable':
      return 10; // 推荐 13vp，最小 10vp
    default:
      return 12;
  }
}

Text('示例文本')
  .fontSize(16)
  // SPEC-11: 约束最小字号（绝对值），确保可读性
  .minFontSize(getMinFontSize())
```

---

### SPEC-12 界面图标大小合规

**适用场景**

应用内所有界面图标（非启动图标）的尺寸约束，包括但不限于：导航图标、工具栏图标、列表项图标、功能入口图标等。确保图标在不同设备类型上具备足够的可点击性和辨识度。

**多设备体验标准**

1. **[P0] 手机/折叠屏/平板界面图标**：图标大小不小于 8 vp（推荐不小于 12 vp）。

2. **[P0] 电脑界面图标**：图标大小不小于 10 vp（推荐不小于 14 vp）。

3. **[P0] 智慧屏界面图标**：图标大小不小于 22 vp（推荐不小于 26 vp）。

4. **[P0] 智能穿戴界面图标**：图标大小不小于 16 vp（推荐不小于 20 vp）。

| 设备类型 | 最小图标尺寸（必须） | 推荐图标尺寸 |
|---------|---------------------|-------------|
| 手机/折叠屏/平板 | 8 vp | 12 vp |
| 电脑 | 10 vp | 14 vp |
| 智慧屏 | 22 vp | 26 vp |
| 智能穿戴 | 16 vp | 20 vp |

**解决方案**

- 根据设备类型获取最小图标尺寸约束，并使用`constraintSize`约束图标大小：

```typescript
import { deviceInfo } from '@kit.BasicServicesKit';

function getMinIconSize(): number {
  const deviceType = deviceInfo.deviceType;
  switch (deviceType) {
    case 'phone':
    case 'tablet':
      return 8; // 推荐 12vp，最小 8vp
    case '2in1':
      return 10; // 推荐 14vp，最小 10vp
    case 'tv':
      return 22; // 推荐 26vp，最小 22vp
    case 'wearable':
      return 16; // 推荐 20vp，最小 16vp
    default:
      return 12;
  }
}
```

- 图标组件尺寸约束：

```typescript
Image($r('app.media.icon'))
  .constraintSize({
    minWidth: getMinIconSize(),
    minHeight: getMinIconSize()
  })
  .objectFit(ImageFit.Contain)
```

---

### SPEC-13 大屏设备图标文字大小适中

**适用场景**

折叠屏设备（双折叠/三折叠）展开态、平板、电脑、智慧屏等大屏设备上，文字和图标随屏幕放大时的尺寸约束。需确保展开态或大屏上的文字/图标物理大小合理，避免信息过密。

**多设备体验标准**

1. **[P0] 放大倍数约束**：
   - 双折叠/三折叠设备展开态文字、图标大小为折叠态的 1～1.2 倍，放大倍数不超过 1.2 倍。
   - 平板上文字/图标大小为直板机的 1～1.5 倍，放大倍数不超过 1.5 倍。

2. **[P1] 一排图标数量约束**：
   - 双折叠设备展开态横竖屏/三折叠设备双屏态横竖屏/三折叠设备三屏态竖屏/平板竖屏：一排不超过 8 个图标。
   - 三折叠设备三屏态横屏/平板横屏：一排不超过 13 个图标。
   - 智慧屏：一排不超过 12 个图标。

**解决方案**

- `onWindowStageCreate` → `loadContent` 回调内，通过 `mainWindow.getUIContext()` 获取 UIContext，初始化断点并监听窗口尺寸变化：

```typescript
windowStage.loadContent('pages/Index', (err) => {
  if (err.code) {
    return;
  }
  const mainWindow = windowStage.getMainWindowSync();
  const uiContext = mainWindow.getUIContext();

  AppStorage.setOrCreate('currentWidthBreakpoint', uiContext.getWindowWidthBreakpoint());
  AppStorage.setOrCreate('currentHeightBreakpoint', uiContext.getWindowHeightBreakpoint());

  mainWindow.on('windowSizeChange', () => {
    AppStorage.setOrCreate('currentWidthBreakpoint', uiContext.getWindowWidthBreakpoint());
    AppStorage.setOrCreate('currentHeightBreakpoint', uiContext.getWindowHeightBreakpoint());
  });
});
```

- 字体/图标尺寸均通过 `BreakpointType` 按断点直接取值，`onBreakpointChange` 中联动更新：

```typescript
// 字体：sm=14vp, md≤14×1.2=16vp, lg≤14×1.5=21vp
private fontSizes: BreakpointType<number> = new BreakpointType(14, 16, 21);
// 图标：sm=24vp, md≤24×1.2=28vp, lg≤24×1.5=36vp
private iconSizes: BreakpointType<number> = new BreakpointType(24, 28, 36);

onBreakpointChange(): void {
  this.fontSize = this.fontSizes.getValue(this.currentWidthBp);
  this.iconSize = this.iconSizes.getValue(this.currentWidthBp);
}
```

- 一排图标数量通过 BreakpointType 按断点约束

```typescript
// 展开态/平板竖屏 ≤8，横屏 ≤13
private colsPerRow: BreakpointType<number> = new BreakpointType(4, 8, 13);

onBreakpointChange(): void {
  this.cols = this.colsPerRow.getValue(this.currentWidthBp);
}
```

---

### SPEC-14 弹出框大小适中

**适用场景**

折叠屏设备（双折叠/三折叠）展开态、平板、电脑、智慧屏等大屏设备上弹出框（Dialog / Popup / Modal）的尺寸约束。需确保弹出框在不同设备形态下大小适中，不会因屏幕放大而过度拉伸。

**多设备体验标准**

1. **[P0] 折叠屏弹出框高度约束**：
   - 双折叠/三折叠设备展开态弹出框高度为折叠态的 1～1.2 倍，放大倍数不超过 1.2 倍。

2. **[P0] 平板弹出框高度约束**：弹出框高度为直板机的 1～1.5 倍。

3. **[P0] 电脑弹出框尺寸约束**：弹出框最小不低于 360×240 vp，最大不超过当前应用窗口尺寸。

4. **[P0] 智慧屏弹出框尺寸约束**：弹出框宽度 < 36% 屏幕总宽度，高度 < 80% 屏幕总高度。

5. **[P0] 自定义弹窗适配小方形屏**：当窗口高度无法完整显示自定义弹窗时，弹窗内容区需使用 `Scroll` 包裹，并使用 `constraintSize` 约束高度最大不超过父组件的 90%，避免弹窗内容截断。

### 解决方案

- Ability 侧监听窗口尺寸变化并写入 AppStorage（详见 [窗口监听指南](./window_detection.md)）：

```typescript
// EntryAbility.onWindowStageCreate → loadContent 回调内
windowStage.loadContent('pages/Index', (err) => {
  if (err.code) {
    return;
  }
  const mainWindow = windowStage.getMainWindowSync();
  const uiContext = mainWindow.getUIContext();

  // 初始值
  const initRect = mainWindow.getWindowProperties().windowRect;
  AppStorage.setOrCreate('screenWidthVp', uiContext.px2vp(initRect.width));
  AppStorage.setOrCreate('screenHeightVp', uiContext.px2vp(initRect.height));

  // 窗口尺寸变化监听
  mainWindow.on('windowSizeChange', (size: window.Size) => {
    AppStorage.setOrCreate('screenWidthVp', uiContext.px2vp(size.width));
    AppStorage.setOrCreate('screenHeightVp', uiContext.px2vp(size.height));
  });
});
```

- 配置 `customStyle` 为 `true` 自定义弹窗样式
```typescript
dialogController: CustomDialogController = new CustomDialogController({
  builder: MyCustomDialog(),
  alignment: DialogAlignment.Center,
  customStyle: true
});
```

- **推荐模式（通用）**：`Scroll` 直接做 `@CustomDialog` 的 `build()` 根节点，用 `constraintSize` 约束尺寸。适用于所有设备形态（含小方形屏），内容超出时自动滚动。`maxHeight` 可使用百分比或绝对值：

```typescript
@CustomDialog
struct MyCustomDialog {
   controller: CustomDialogController
   @StorageProp('screenHeightVp') windowHeightVp: number = 0

   build() {
      Scroll() {
         Column() {
            // ...弹窗内容...
            // 唯一的 padding 来源，不要在外层重复添加
         }
         .padding(24)
      }
      .scrollBar(BarState.Auto)
      .backgroundColor(Color.White)
      .borderRadius(16)
      .width('85%')
      .constraintSize({
         maxWidth: 480,
         maxHeight: this.windowHeightVp > 0 ? this.windowHeightVp * 0.8 : '90%'
      })
   }
}
```

**关键约束（禁止违反）**：

| # | 规则 | 原因 |
|---|------|------|
| 1 | `build()` 根节点必须是 `Scroll`，不要在 Scroll 外再套 `Column` | 外层 Column 无显式高度 → 内部 `Scroll.layoutWeight(1)` 产生循环依赖 → Scroll 高度解析失败 → 内容截断 |
| 2 | 禁止在 `Scroll` 上使用 `layoutWeight` | `layoutWeight` 要求父容器有显式高度，`@CustomDialog` 根节点的父容器（对话框遮罩层）不满足此条件 |
| 3 | `padding` 只设在内容 `Column` 上，禁止在 `Scroll` 或外层容器再添加 | 双层 padding 侵占内容空间，小屏设备上加剧截断 |

**反模式（禁止使用）**：

```typescript
// ❌ 反模式: Column > Scroll.layoutWeight(1) 循环依赖
@CustomDialog
struct BadDialog {
   build() {
      Column() {                // 无显式高度
         Scroll() { ... }
            .layoutWeight(1)    // 需要父容器有确定高度 → 循环依赖 → 内容截断
      }
      .constraintSize({ maxHeight: '90%' })
      .padding(24)              // 与内层 Column.padding 重复，侵占空间
   }
}
```


---

### SPEC-15 悬浮窗适配

**适用场景**

1. 所有应用都应支持悬浮窗运行

**多设备体验标准**

1. **[P1] 直板机和折叠屏适配悬浮窗**：应用支持悬浮窗等比缩放调节；游戏、视频播放、视频会议、直播等沉浸式场景，须适配横向悬浮窗（宽 > 高的横屏比例悬浮窗）。

2. **[P1] 平板设备适配悬浮窗**：应用支持悬浮窗无极缩放调节；应用支持横向悬浮窗。

**解决方案**

- 在 `module.json5` 中声明悬浮窗支持的窗口模式：

```json5
{
  "module": {
    "abilities": [
      {
        "name": "EntryAbility",
        // 声明支持的窗口模式，当前仅支持悬浮窗
        "supportWindowMode": ["floating"]
      }
    ]
  }
}
```

- 声明支持横向悬浮窗（沉浸式场景必须）：

```json5
{
  "module": {
    "abilities": [
      {
        "name": "EntryAbility",
        // landscape: 固定横向悬浮窗
        // landscape_auto: 动态可变为横向，需配合 enableLandscapeMultiWindow API 使用
        "preferMultiWindowOrientation": "landscape_auto"
      }
    ]
  }
}
```

- 沉浸式场景动态启用/禁用横向悬浮窗：

```typescript
import { window } from '@kit.ArkUI';
import { BusinessError } from '@kit.BasicServicesKit';
import { common } from '@kit.AbilityKit';

const TAG = 'LandscapeMultiWindow';

@Component
export struct LandscapeVideoPlayer {
  private windowClass: window.Window | undefined = undefined;

  aboutToAppear(): void {
    try {
      this.windowClass = (this.getUIContext().getHostContext() as common.UIAbilityContext)
        .windowStage.getMainWindowSync();
      // 进入视频播放页时启用横向悬浮窗
      this.windowClass.enableLandscapeMultiWindow().catch((error: BusinessError) => {
        console.error(TAG, `enableLandscapeMultiWindow err, code: ${error.code}, message: ${error.message}`);
      });
    } catch (err) {
      let error = err as BusinessError;
      console.error(TAG, `aboutToAppear err, code: ${error.code}, message: ${error.message}`);
    }
  }

  aboutToDisappear(): void {
    // 离开视频播放页时禁用横向悬浮窗
    this.windowClass?.disableLandscapeMultiWindow().catch((error: BusinessError) => {
      console.error(TAG, `disableLandscapeMultiWindow err, code: ${error.code}, message: ${error.message}`);
    });
  }

  build() {
    // 视频播放布局
  }
}
```

- 监听窗口状态变化，在悬浮窗模式下进行服务降级（详见 [窗口监听指南](./window_detection.md#窗口状态监听)）：

```typescript
// 能力检查
if (canIUse('SystemCapability.Window.SessionManager')) {
  this.mainWindow!.on('windowStatusChange', (status: window.WindowStatusType) => {
    AppStorage.setOrCreate('windowStatus', status);
  });
}

// 组件侧根据窗口状态降级
@StorageProp('windowStatus') windowStatus: number = window.WindowStatusType.FULL_SCREEN

build() {
  if (this.windowStatus === window.WindowStatusType.FLOATING) {
    // 悬浮窗模式：降级处理，精简布局、隐藏次要信息、简化交互
    SimplifiedLayout()
  } else {
    FullLayout()
  }
}
```

---

### SPEC-16 圆形屏（智能手表）布局适配

**适用场景**

圆形屏（横向断点 xs / 纵向断点 sm）设备上的布局适配场景。典型设备为智能手表等可穿戴装置，主要特点为即时通知和轻量级交互。智能穿戴设备应利用其便携性，作为大型屏幕设备的补充和扩展，而不是替代。

> 由于手表等圆形屏幕设备在屏幕形态和使用场景上的独特性，建议**独立创建 HAP 包**进行发布和安装。在开发穿戴应用时，需要将工程中 `module.json5` 的 `deviceTypes` 改为 `wearable`。

**多设备体验标准**

1. **[P1] 横向切屏 + 垂直切屏策略**：当显示的内容量超过单屏范围时，必须采用横向切屏和垂直切屏的布局策略，避免内容平铺导致的圆形屏幕边缘信息丢失。横向切屏将更多内容切换至下一屏独立布置；垂直切屏拓展上下信息承载空间。

2. **[P1] 优先使用弧形组件**：优先使用 ArkUI 为圆形屏幕提供的弧形适配组件（API version 18 开始支持）进行智能手表界面开发。

