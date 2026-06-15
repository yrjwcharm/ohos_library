# 自适应布局指南

## 目录

1. [核心概念](#核心概念)
2. [七种自适应能力](#七种自适应能力)
3. [注意事项](#注意事项)

---

## 核心概念

### 什么是自适应布局

自适应布局关注**组件级**的微观调整，通过组件属性配置让布局自动适应容器尺寸变化，无需断点参与。与响应式布局（需要断点切换页面结构）互补，自适应布局是优先使用的基础手段。

### 自适应布局 vs 响应式布局

| 对比项 | 自适应布局 | 响应式布局 |
|--------|-----------|-----------|
| 关注点 | 组件级微观调整 | 页面级宏观调整 |
| 是否需要断点 | 否 | 是 |
| 实现方式 | 组件属性（layoutWeight、Blank 等） | GridRow、SideBarContainer 等 |
| 典型场景 | 表单输入框拉伸、图片等比缩放 | 单栏变双栏、导航+内容切换 |

### 七种能力总览

| 自适应布局类别 | 自适应布局能力 | 使用场景 | 实现方式 |
| --- | --- | --- | --- |
| 自适应拉伸 | 拉伸能力 | 容器尺寸变化时，增加或减小的空间**全部分配**给指定区域 | `flexGrow` / `flexShrink` / `Blank` / `layoutWeight` |
|  | 均分能力 | 容器尺寸变化时，增加或减小的空间**均匀分配**给所有空白区域 | `justifyContent` 设置 `FlexAlign.SpaceEvenly` |
| 自适应缩放 | 占比能力 | 子组件宽高**按预设比例**随容器变化 | 百分比宽高 / `layoutWeight` |
|  | 缩放能力 | 子组件宽高**按预设比例**随容器变化，**宽高比不变** | `aspectRatio` |
| 自适应延伸 | 延伸能力 | 子组件按列表先后顺序，随容器尺寸变化显示或隐藏 | `List` / `Scroll` + `Row`/`Column` |
|  | 隐藏能力 | 子组件按**预设显示优先级**，随容器尺寸变化显示或隐藏 | `displayPriority` |
| 自适应折行 | 折行能力 | 容器尺寸不足以显示完整内容时**自动换行** | `Flex({ wrap: FlexWrap.Wrap })` |

### 关键属性/API

| 属性/API | 说明 | 适用能力 |
|---------|------|---------|
| `flexGrow` | 仅当父容器宽度大于所有子组件宽度总和时生效，子组件按比例拉伸分配多余空间。默认值 0。 | ADAPT-01 拉伸 |
| `flexShrink` | 仅当父容器宽度小于所有子组件宽度总和时生效，子组件按比例收缩分配不足空间。默认值 1。 | ADAPT-01 拉伸 |
| `layoutWeight` | 按权重分配剩余空间（Row/Column/Flex 父容器生效，设置后组件自身尺寸失效） | ADAPT-01 拉伸、ADAPT-05 均分、ADAPT-06 占比 |
| `Blank()` | 弹性空白填充（仅 Row/Column/Flex 父容器生效） | ADAPT-01 拉伸 |
| `aspectRatio` | 固定宽高比 | ADAPT-02 缩放 |
| `displayPriority` | 按优先级显隐 | ADAPT-03 隐藏 |
| `Visibility` | 手动控制组件显隐 | ADAPT-03 隐藏 |
| `FlexWrap.Wrap` | 自动换行 | ADAPT-04 折行 |
| `FlexAlign.SpaceEvenly` | 子项均匀分布 | ADAPT-05 均分 |
| 百分比宽高 | 用 `'30%'` 等字符串设置尺寸 | ADAPT-06 占比 |
| `List` | 可滚动列表，按需加载 | ADAPT-07 延伸 |
| `Scroll` | 可滚动容器 | ADAPT-07 延伸 |

---

## 七种自适应能力

### 1. 拉伸 (Stretch) — `ADAPT-01`

容器尺寸变化时，增加或减小的空间**全部分配**给容器内指定区域。常用于内容区两侧留白、设置项文字与开关之间等场景。

**flexGrow / flexShrink / flexBasis**：Flex 布局的标准拉伸属性，精确控制子组件如何分配多余空间或收缩不足空间。

| 属性 | 默认值 | 生效条件 | 行为 |
|------|--------|---------|------|
| `flexGrow` | 0 | 父容器宽度 > 所有子组件宽度总和 | 按比例**拉伸**分配多余空间 |
| `flexShrink` | 1 | 父容器宽度 < 所有子组件宽度总和 | 按比例**收缩**分配不足空间 |
| `flexBasis` | `'auto'` | 始终 | 设置主轴方向基准尺寸，与 width/height 冲突时以 flexBasis 为准 |

```typescript
Flex({ justifyContent: FlexAlign.Start }) {
  // 两侧留白区：不拉伸、可收缩
  Column().width(150).flexGrow(0).flexShrink(1)
  // 中间内容区：可拉伸、不收缩
  Column().width(400).flexGrow(1).flexShrink(0)
  Column().width(150).flexGrow(0).flexShrink(1)
}
```

> 父容器基准尺寸 = 150 + 400 + 150 = 700vp。大于 700vp 时多余空间全部分配给中间内容区（flexGrow=1）；小于 700vp 时左右留白按 1:1 收缩（flexShrink=1）。

**layoutWeight**：在 Row/Column/Flex 中按权重分配剩余空间的简化写法。

```typescript
Row() {
  Text('标签')
  TextInput().layoutWeight(1)  // 自动拉伸填充剩余空间
}
```

> **layoutWeight vs flexGrow**：`layoutWeight` 仅在 Row/Column/Flex 中生效，设置后组件自身尺寸失效；`flexGrow` 仅在 Flex 子组件中生效，可与 `flexShrink` 搭配精确控制拉伸和收缩行为。

**Blank**：在固定宽度元素之间插入弹性空白，仅当父组件为 Row/Column/Flex 时生效。

```typescript
Row() {
  Text('固定标题')
  Blank()         // 自动填充中间空白
  Text('固定操作')
}
```

### 2. 缩放 (Scale) — `ADAPT-02`

组件按容器宽度等比缩放，通过百分比宽度配合 `aspectRatio` 保持宽高比，除非特殊说明，否则需要保持原始宽高比。

```typescript
Image($r('app.media.banner'))
  .width('100%')
  .aspectRatio(this.bannerRatio)   // 高度自动计算
  .onComplete((result: ImageLoadResult) => {
    if (result && result.width > 0 && result.height > 0) {
      this.bannerRatio = result.width / result.height;
    }
  })
```

自定义组件也可使用：

```typescript
Column() {
  Text('等比缩放卡片')
}
.width('100%')
.aspectRatio(this.ratio)
```

### 3. 隐藏 (Hidden) — `ADAPT-03`

空间不足时按优先级自动隐藏次要内容。

**displayPriority（推荐）**：优先级数值越大越不容易被隐藏，默认值为 1。

```typescript
Row() {
  Text('核心标题').displayPriority(2)   // 高优先级
  Text('副标题').displayPriority(1)     // 低优先级，空间不足时先隐藏
}
```

**visibility**：通过条件判断手动控制显隐，适合需要精确控制阈值的场景。

```typescript
Text('摘要')
  .visibility(this.width > 300 ? Visibility.Visible : Visibility.None)
```

### 4. 折行 (Wrap) — `ADAPT-04`

空间不足时自动换行。

```typescript
Flex({ wrap: FlexWrap.Wrap }) {
  ForEach(this.tags, (tag: string) => {
    Text(tag).margin({ right: 8, bottom: 8 })
  })
}
```

### 5. 均分 (Equi-width) — `ADAPT-05`

将空间平均分配给子组件。

**SpaceEvenly**：子项间距相等，包括首尾与容器边缘的间距。

```typescript
Row() {
  ForEach(this.icons, (icon: Resource) => {
    Image(icon).width(24)
  })
}
.width('100%')
.justifyContent(FlexAlign.SpaceEvenly)
```

**layoutWeight**：每个子项设置相同权重，平分空间。

```typescript
Row() {
  ForEach(this.items, (item: Item) => {
    Column() { /* 内容 */ }.layoutWeight(1)
  })
}
```

### 6. 占比 (Proportion) — `ADAPT-06`

按照特定比例分配空间。

**layoutWeight**：按权重值分配剩余空间。

```typescript
Row() {
  Column() { /* 侧边栏 */ }.layoutWeight(1)
  Column() { /* 内容区 */ }.layoutWeight(3)  // 占3/4
}
```

**百分比宽高**：直接用百分比字符串设置尺寸。

```typescript
Row() {
  Column() { /* 侧边栏 */ }.width('30%')
  Column() { /* 内容区 */ }.width('70%')
}
```

### 7. 延伸 (Extension) — `ADAPT-07`

屏幕越大显示内容越多，通过可滚动容器实现。

**List**：自带滚动和按需加载，适合纵向延伸。

```typescript
List() {
  ForEach(this.items, (item: Item) => {
    ListItem() { /* 列表项 */ }
  })
}
```

**Scroll + Row/Column**：手动组合，适合横向延伸。

```typescript
Scroll() {
  Row() {
    ForEach(this.items, (item: Item) => {
      Column() { /* 卡片 */ }.width(160).margin({ right: 12 })
    })
  }
}
.scrollable(ScrollDirection.Horizontal)
```

---

## 注意事项

- `flexGrow` / `flexShrink` 仅在 Flex 父容器中生效；`layoutWeight` 在 Row/Column/Flex 中均可生效
- `layoutWeight` 设置后组件自身的 width/height 会失效；`flexGrow` 不影响组件原始尺寸，仅分配多余空间
- `displayPriority` 只在父容器空间不足时才会隐藏子组件，空间充足时所有组件都会显示；相同优先级的子组件同时显示或隐藏
- `Blank` 只能在 Flex/Row/Column 等弹性布局容器中使用
- `aspectRatio` 设置后高度由宽度和比例自动计算，不要再手动设置 height
- `layoutWeight` 在非弹性容器中不生效，需配合 Flex/Row/Column 使用
- 自适应布局不需要断点参与；需要断点切换页面结构的场景参考栅格布局（GridRow）和响应式布局
