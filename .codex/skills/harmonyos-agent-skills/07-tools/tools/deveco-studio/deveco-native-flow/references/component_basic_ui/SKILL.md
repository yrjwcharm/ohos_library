---
name: component_basic_ui
description: "HarmonyOS ArkTS 基础 UI 组件使用规范。包含 Text、Button、Image、Toggle、Slider、Progress、Checkbox、Radio、Rating、LoadingProgress、Marquee、Qrcode、Badge 等基础显示和交互组件。Use when: (1) 实现文本显示，(2) 实现按钮交互，(3) 实现图片展示，(4) 实现选择控件，(5) 实现进度显示。Triggers: Text、Button、Image、图片、文本、按钮、开关、滑块、进度条、复选框、单选、评分、加载、跑马灯、二维码、徽标。"
user-invocable: false
---

# 基础 UI 组件 (component_basic_ui)

本 skill 覆盖 HarmonyOS ArkTS **基础 UI 组件**的使用规范。详细规范见各 `references/《组件名》组件使用规范.md`，按需加载。

## 本分组组件

| 组件 | 规范文件 | 用途 |
|------|----------|------|
| Text | references/text组件使用规范.md | 文本显示 |
| Button | references/button组件使用规范.md | 按钮交互 |
| Image | references/image组件使用规范.md | 图片展示 |
| Toggle | references/toggle组件使用规范.md | 开关切换 |
| Slider | references/slider组件使用规范.md | 滑块选择 |
| Progress | references/progress组件使用规范.md | 进度显示 |
| Checkbox | references/checkbox组件使用规范.md | 复选框 |
| Radio | references/radio组件使用规范.md | 单选按钮 |
| Rating | references/rating组件使用规范.md | 评分组件 |
| LoadingProgress | references/loading_progress组件使用规范.md | 加载动画 |
| Marquee | references/marquee组件使用规范.md | 跑马灯 |
| Qrcode | references/qrcode组件使用规范.md | 二维码 |
| Badge | references/badge组件使用规范.md | 徽标标记 |

## 何时读哪个文件

- 文本显示 / 字体样式 / 文本对齐 → `references/text组件使用规范.md`
- 按钮交互 / 按钮样式 / 按钮类型 → `references/button组件使用规范.md`
- 图片展示 / 图片加载 / 图片缩放 → `references/image组件使用规范.md`
- 开关切换 / Toggle / Switch → `references/toggle组件使用规范.md`
- 滑块选择 / 数值选择 / Slider → `references/slider组件使用规范.md`
- 进度显示 / Progress / 加载进度 → `references/progress组件使用规范.md`

## 快速索引

### Text 组件

```typescript
// 基础用法
Text('Hello World')
  .fontSize(16)
  .fontColor('#333333')
  .textAlign(TextAlign.Center)
  .maxLines(2)
  .textOverflow({ overflow: TextOverflow.Ellipsis })
```

**常用属性**：
- `fontSize(value: number | string | Resource)` - 字体大小
- `fontColor(value: ResourceColor)` - 字体颜色
- `fontWeight(value: number | FontWeight | string)` - 字体粗细
- `textAlign(value: TextAlign)` - 文本对齐
- `maxLines(value: number)` - 最大行数
- `textOverflow(value: { overflow: TextOverflow })` - 溢出处理

### Button 组件

```typescript
// 基础用法
Button('确定')
  .type(ButtonType.Capsule)
  .stateEffect(true)
  .onClick(() => {
    // 点击事件
  })

// 带选项的按钮
Button({ type: ButtonType.Circle, stateEffect: true }) {
  Image($r('app.media.icon'))
}
```

**ButtonType 枚举**：
- `Capsule` - 胶囊按钮（圆角默认为高度的一半）
- `Circle` - 圆形按钮
- `Normal` - 普通按钮（无圆角）

**常用属性**：
- `type(value: ButtonType)` - 按钮类型
- `stateEffect(value: boolean)` - 按压效果
- `buttonStyle(value: ButtonStyleMode)` - 按钮样式模式
- `controlSize(value: ControlSize)` - 控件大小

### Image 组件

```typescript
// 基础用法
Image($r('app.media.icon'))
  .width(100)
  .height(100)
  .objectFit(ImageFit.Cover)
  .interpolation(ImageInterpolation.High)
```

**常用属性**：
- `objectFit(value: ImageFit)` - 图片缩放类型
- `interpolation(value: ImageInterpolation)` - 图片插值
- `renderMode(value: ImageRenderMode)` - 渲染模式
- `alt(value: string | PixelMap | Resource)` - 加载失败占位图

### Toggle 组件

```typescript
// 开关
Toggle({ type: ToggleType.Switch, isOn: false })
  .onChange((isOn: boolean) => {
    // 切换事件
  })

// 复选框样式
Toggle({ type: ToggleType.Checkbox, isOn: false })
```

**ToggleType 枚举**：
- `Checkbox` - 复选框
- `Button` - 按钮
- `Switch` - 开关

### Slider 组件

```typescript
Slider({
  value: 50,
  min: 0,
  max: 100,
  step: 1,
  style: SliderStyle.OutSet
})
  .blockColor('#007DFF')
  .trackColor('#CCCCCC')
  .onChange((value: number) => {
    // 值变化
  })
```

### Progress 组件

```typescript
// 线性进度条
Progress({ value: 50, total: 100, type: ProgressType.Linear })
  .color('#007DFF')

// 环形进度条
Progress({ value: 50, total: 100, type: ProgressType.Ring })

// 加载进度条
Progress({ value: 50, total: 100, type: ProgressType.Loading })
```

**ProgressType 枚举**：
- `Linear` - 线性进度条
- `Ring` - 环形进度条
- `Eclipse` - 圆形进度条
- `ScaleRing` - 刻度环形进度条
- `Capsule` - 胶囊进度条
- `Loading` - 加载进度条

## 通用约定

- 所有组件继承自 `CommonMethod`，支持通用属性（宽度、高度、边距等）
- 颜色值支持 `string | number | Resource` 类型
- 使用 `$r('app.media.xxx')` 引用资源，`$rawfile('xxx')` 引用原始文件
- 事件回调使用箭头函数绑定以避免上下文问题