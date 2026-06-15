# Text 组件使用规范

## 概述

Text 组件用于显示文本内容，是 HarmonyOS ArkTS 中最基础的文字显示组件。

## 接口

```typescript
Text(content?: string | Resource, value?: TextOptions): TextAttribute
```

**参数说明**：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| content | string \| Resource | 否 | 文本内容 |
| value | TextOptions | 否 | 文本选项，包含 controller |

**TextOptions 接口**：

```typescript
interface TextOptions {
  controller?: TextController;  // 文本控制器
}
```

## 子组件

Text 组件可以包含 Span、ImageSpan、SymbolSpan 等子组件，用于实现富文本效果。

```typescript
Text() {
  Span('普通文本')
  ImageSpan($r('app.media.icon'))
    .width(16)
    .height(16)
  Span('继续文本')
}
```

## 属性

### 字体相关属性

| 属性 | 参数类型 | 说明 |
|------|----------|------|
| font(value: Font) | Font | 统一设置字体样式 |
| fontColor(value: ResourceColor) | ResourceColor | 字体颜色 |
| fontSize(value: number \| string \| Resource) | number \| string \| Resource | 字体大小 |
| fontWeight(value: number \| FontWeight \| string) | number \| FontWeight \| string | 字体粗细 |
| fontStyle(value: FontStyle) | FontStyle | 字体样式（正常/斜体） |
| fontFamily(value: string \| Resource) | string \| Resource | 字体名称 |

**Font 接口**：

```typescript
interface Font {
  size?: number | string | Resource;     // 字体大小
  weight?: number | FontWeight | string; // 字体粗细
  family?: string | Resource;            // 字体名称
  style?: FontStyle;                     // 字体样式
}
```

**FontWeight 枚举**：

| 值 | 说明 |
|----|------|
| Lighter | 较细 |
| Normal | 正常 |
| Regular | 常规 |
| Medium | 中等 |
| Bold | 粗体 |
| Bolder | 更粗 |
| 100-900 | 数值粗细 |

### 文本布局属性

| 属性 | 参数类型 | 说明 |
|------|----------|------|
| textAlign(value: TextAlign) | TextAlign | 水平对齐方式 |
| lineHeight(value: number \| string \| Resource) | number \| string \| Resource | 行高 |
| letterSpacing(value: number \| string) | number \| string | 字间距 |
| textIndent(value: Length) | Length | 首行缩进 |
| wordBreak(value: WordBreak) | WordBreak | 换行规则 |

**TextAlign 枚举**：

| 值 | 说明 |
|----|------|
| Start | 对齐起始端 |
| Center | 居中对齐 |
| End | 对齐结束端 |

### 文本溢出属性

| 属性 | 参数类型 | 说明 |
|------|----------|------|
| maxLines(value: number) | number | 最大行数 |
| textOverflow(value: { overflow: TextOverflow }) | { overflow: TextOverflow } | 溢出处理方式 |
| minFontSize(value: number \| string \| Resource) | number \| string \| Resource | 最小字体大小（自适应） |
| maxFontSize(value: number \| string \| Resource) | number \| string \| Resource | 最大字体大小（自适应） |
| heightAdaptivePolicy(value: TextHeightAdaptivePolicy) | TextHeightAdaptivePolicy | 高度自适应策略 |
| ellipsisMode(value: EllipsisMode) | EllipsisMode | 省略号位置 |

**TextOverflow 枚举**：

| 值 | 说明 |
|----|------|
| Clip | 裁剪 |
| Ellipsis | 省略号 |
| None | 无处理 |

**TextHeightAdaptivePolicy 枚举**：

| 值 | 说明 |
|----|------|
| MaxLinesFirst | 优先使用 maxLines |
| MinFontSizeFirst | 优先使用最小字体限制 |
| LayoutConstraintFirst | 优先使用布局约束 |

### 文本修饰属性

| 属性 | 参数类型 | 说明 |
|------|----------|------|
| decoration(value: { type: TextDecorationType; color?: ResourceColor }) | object | 文本装饰线 |
| textCase(value: TextCase) | TextCase | 文本大小写 |
| baselineOffset(value: number \| string) | number \| string | 基线偏移 |
| textShadow(value: ShadowOptions \| Array\<ShadowOptions\>) | ShadowOptions | 文本阴影 |

**TextDecorationType 枚举**：

| 值 | 说明 |
|----|------|
| None | 无装饰 |
| Underline | 下划线 |
| Overline | 上划线 |
| LineThrough | 删除线 |

**TextCase 枚举**：

| 值 | 说明 |
|----|------|
| Normal | 保持原文 |
| LowerCase | 小写 |
| UpperCase | 大写 |

### 交互属性

| 属性 | 参数类型 | 说明 |
|------|----------|------|
| copyOption(value: CopyOptions) | CopyOptions | 复制选项 |
| draggable(value: boolean) | boolean | 是否可拖拽 |
| selection(selectionStart: number, selectionEnd: number) | number, number | 文本选择范围 |

**CopyOptions 枚举**：

| 值 | 说明 |
|----|------|
| None | 不允许复制 |
| InApp | 应用内复制 |
| LocalDevice | 本地设备复制 |
| Distributed | 分布式复制 |

### 数据检测属性

| 属性 | 参数类型 | 说明 |
|------|----------|------|
| enableDataDetector(enable: boolean) | boolean | 启用数据检测 |
| dataDetectorConfig(config: TextDataDetectorConfig) | TextDataDetectorConfig | 数据检测配置 |

## 事件

| 事件 | 参数 | 说明 |
|------|------|------|
| onCopy(callback: (value: string) => void) | value: string | 复制回调 |
| onTextSelectionChange(callback: (selectionStart: number, selectionEnd: number) => void) | selectionStart, selectionEnd | 选择变化回调 |

## TextController

```typescript
class TextController {
  closeSelectionMenu(): void;  // 关闭选择菜单
}
```

## 使用示例

### 基础用法

```typescript
@Entry
@Component
struct TextExample {
  build() {
    Column() {
      // 基础文本
      Text('Hello HarmonyOS')

      // 带样式的文本
      Text('带样式文本')
        .fontSize(20)
        .fontColor('#333333')
        .fontWeight(FontWeight.Bold)
        .textAlign(TextAlign.Center)

      // 多行文本
      Text('这是一段很长的文本内容，当文本超过设定的最大行数时，将会显示省略号')
        .maxLines(2)
        .textOverflow({ overflow: TextOverflow.Ellipsis })
        .width(200)

      // 自适应字体
      Text('自适应字体大小')
        .width(100)
        .height(40)
        .minFontSize(10)
        .maxFontSize(20)
        .heightAdaptivePolicy(TextHeightAdaptivePolicy.MinFontSizeFirst)
    }
  }
}
```

### 富文本

```typescript
Text() {
  Span('普通文本')
    .fontColor('#333333')
  Span('红色文本')
    .fontColor('#FF0000')
    .fontWeight(FontWeight.Bold)
  ImageSpan($r('app.media.icon'))
    .width(16)
    .height(16)
  Span('继续文本')
    .decoration({ type: TextDecorationType.Underline, color: '#0000FF' })
}
.fontSize(16)
```

### 可选择文本

```typescript
@Entry
@Component
struct SelectableText {
  private textController: TextController = new TextController()

  build() {
    Column() {
      Text('这是可以选择复制的文本内容', { controller: this.textController })
        .copyOption(CopyOptions.LocalDevice)
        .onCopy((value: string) => {
          console.log('复制内容: ' + value)
        })

      Button('关闭选择菜单')
        .onClick(() => {
          this.textController.closeSelectionMenu()
        })
    }
  }
}
```

### 文本阴影

```typescript
Text('带阴影的文本')
  .fontSize(24)
  .fontColor('#FFFFFF')
  .textShadow({
    radius: 5,
    color: '#000000',
    offsetX: 2,
    offsetY: 2
  })
```

## 最佳实践

1. **使用 Resource 引用字符串资源**：
```typescript
Text($r('app.string.hello'))
```

2. **处理长文本**：
```typescript
Text(longText)
  .maxLines(2)
  .textOverflow({ overflow: TextOverflow.Ellipsis })
```

3. **国际化文本**：
```typescript
// 使用资源文件
Text($r('app.string.welcome'))
```

4. **性能优化**：
- 避免在 Text 组件中进行复杂计算
- 对于频繁更新的文本，考虑使用 @State 或其他状态管理
- 使用 RichEditor 替代复杂的富文本需求