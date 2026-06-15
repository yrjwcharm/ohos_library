# Button 组件使用规范

## 概述

Button 组件是 HarmonyOS ArkTS 的基础交互组件，用于触发用户操作。

## 接口

```typescript
// 无参数
Button(): ButtonAttribute

// 带选项
Button(options: ButtonOptions): ButtonAttribute

// 带文本
Button(label: ResourceStr, options?: ButtonOptions): ButtonAttribute
```

**参数说明**：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| label | ResourceStr | 否 | 按钮文本内容 |
| options | ButtonOptions | 否 | 按钮选项 |

**ButtonOptions 接口**：

```typescript
interface ButtonOptions {
  type?: ButtonType;           // 按钮类型
  stateEffect?: boolean;       // 按压效果
  buttonStyle?: ButtonStyleMode; // 按钮样式模式（API 11+）
  controlSize?: ControlSize;   // 控件大小（API 11+）
}
```

## 子组件

Button 可以包含自定义子组件：

```typescript
Button() {
  Row() {
    Image($r('app.media.icon'))
      .width(16)
      .height(16)
    Text('按钮文本')
      .fontSize(14)
  }
}
```

## 按钮类型

### ButtonType 枚举

| 值 | 说明 | 圆角 |
|----|------|------|
| Capsule | 胶囊按钮 | 默认为高度的一半 |
| Circle | 圆形按钮 | 宽高相等时为圆形 |
| Normal | 普通按钮 | 无默认圆角 |

### ButtonStyleMode 枚举（API 11+）

| 值 | 说明 |
|----|------|
| NORMAL | 普通按钮（正常背景色） |
| EMPHASIZED | 强调按钮（强调背景色） |
| TEXTUAL | 文本按钮（无背景色） |

### ControlSize 枚举（API 11+）

| 值 | 说明 |
|----|------|
| small | 小尺寸 |
| normal | 正常尺寸 |

## 属性

### 按钮样式属性

| 属性 | 参数类型 | 说明 |
|------|----------|------|
| type(value: ButtonType) | ButtonType | 按钮类型 |
| stateEffect(value: boolean) | boolean | 按压效果开关 |

### 字体属性

| 属性 | 参数类型 | 说明 |
|------|----------|------|
| fontColor(value: ResourceColor) | ResourceColor | 文本颜色 |
| fontSize(value: Length) | Length | 文本大小 |
| fontWeight(value: number \| FontWeight \| string) | number \| FontWeight \| string | 字体粗细 |
| fontStyle(value: FontStyle) | FontStyle | 字体样式 |
| fontFamily(value: string \| Resource) | string \| Resource | 字体名称 |

### 按钮样式模式属性（API 11+）

| 属性 | 参数类型 | 说明 |
|------|----------|------|
| buttonStyle(value: ButtonStyleMode) | ButtonStyleMode | 按钮样式模式 |
| controlSize(value: ControlSize) | ControlSize | 控件大小 |
| labelStyle(value: LabelStyle) | LabelStyle | 标签样式 |

**LabelStyle 接口**：

```typescript
interface LabelStyle {
  overflow?: TextOverflow;              // 溢出模式
  maxLines?: number;                    // 最大行数
  minFontSize?: number | ResourceStr;   // 最小字体大小
  maxFontSize?: number | ResourceStr;   // 最大字体大小
  heightAdaptivePolicy?: TextHeightAdaptivePolicy; // 高度自适应策略
  font?: Font;                          // 字体样式
}
```

## 事件

Button 组件支持所有通用事件：

| 事件 | 参数 | 说明 |
|------|------|------|
| onClick(callback: () => void) | - | 点击事件 |
| onLongPress(callback: () => void) | - | 长按事件 |
| onTouch(callback: (event: TouchEvent) => void) | TouchEvent | 触摸事件 |

## 使用示例

### 基础按钮

```typescript
@Entry
@Component
struct ButtonExample {
  build() {
    Column({ space: 10 }) {
      // 胶囊按钮
      Button('胶囊按钮')
        .type(ButtonType.Capsule)
        .width(200)
        .height(40)

      // 圆形按钮
      Button({ type: ButtonType.Circle }) {
        Image($r('app.media.icon'))
          .width(24)
          .height(24)
      }
      .width(50)
      .height(50)

      // 普通按钮
      Button('普通按钮')
        .type(ButtonType.Normal)
        .width(200)
        .height(40)
        .borderRadius(8)

      // 带图标的按钮
      Button() {
        Row({ space: 8 }) {
          Image($r('app.media.icon'))
            .width(16)
            .height(16)
          Text('带图标按钮')
            .fontSize(14)
            .fontColor('#FFFFFF')
        }
      }
      .type(ButtonType.Capsule)
      .width(150)
      .height(40)
    }
  }
}
```

### 按钮样式

```typescript
// 不同样式的按钮
Column({ space: 10 }) {
  // 强调按钮
  Button('强调按钮')
    .buttonStyle(ButtonStyleMode.EMPHASIZED)

  // 普通按钮
  Button('普通按钮')
    .buttonStyle(ButtonStyleMode.NORMAL)

  // 文本按钮
  Button('文本按钮')
    .buttonStyle(ButtonStyleMode.TEXTUAL)
}

// 不同尺寸的按钮
Column({ space: 10 }) {
  Button('小按钮')
    .controlSize(ControlSize.SMALL)

  Button('正常按钮')
    .controlSize(ControlSize.NORMAL)
}
```

### 自定义样式按钮

```typescript
Button('自定义样式')
  .width(200)
  .height(50)
  .fontSize(18)
  .fontColor('#FFFFFF')
  .fontWeight(FontWeight.Bold)
  .backgroundColor('#007DFF')
  .borderRadius(25)
  .stateEffect(true)
  .onClick(() => {
    console.log('按钮被点击')
  })
```

### 禁用状态

```typescript
@Entry
@Component
struct DisabledButton {
  @State isEnable: boolean = false

  build() {
    Column() {
      Button('禁用按钮')
        .enabled(this.isEnable)
        .opacity(this.isEnable ? 1 : 0.4)
        .backgroundColor(this.isEnable ? '#007DFF' : '#CCCCCC')

      Toggle({ type: ToggleType.Switch, isOn: this.isEnable })
        .onChange((isOn: boolean) => {
          this.isEnable = isOn
        })
    }
  }
}
```

### 自适应标签样式

```typescript
Button('这是一个很长的按钮文本内容用于测试自适应效果')
  .width(150)
  .height(40)
  .labelStyle({
    overflow: TextOverflow.Ellipsis,
    maxLines: 1,
    minFontSize: 10,
    maxFontSize: 16
  })
```

## 最佳实践

1. **按钮类型选择**：
   - 胶囊按钮：主要操作、确认操作
   - 圆形按钮：图标按钮、工具按钮
   - 普通按钮：次要操作、需要自定义圆角

2. **按钮尺寸**：
```typescript
// 推荐的按钮高度
// 大按钮: 48vp
// 正常按钮: 40vp
// 小按钮: 32vp
```

3. **按钮状态反馈**：
```typescript
Button('有反馈的按钮')
  .stateEffect(true)  // 开启按压效果
  .onClick(() => {
    // 点击处理
  })
```

4. **组合使用**：
```typescript
// 图标+文字按钮
Button() {
  Row({ space: 8 }) {
    SymbolGlyph($r('sys.symbol.plus'))
      .fontSize(16)
      .fontColor([Color.White])
    Text('添加')
      .fontSize(14)
      .fontColor(Color.White)
  }
}
.type(ButtonType.Capsule)
.backgroundColor('#007DFF')
```

## 注意事项

1. 当 Button 有子组件时，label 参数不生效
2. ButtonType.Circle 需要设置相等的宽高才能形成完美圆形
3. stateEffect 默认为 true，可根据需要关闭
4. 使用 buttonStyle 和 controlSize 时，会应用系统默认样式