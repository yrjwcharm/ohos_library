## 7. 属性和 API 参数使用错误

AI 最容易出现的一类问题：凭记忆猜测参数名、类型、顺序或枚举值，而不是查文档。

### 7.1 参数名捏造或混淆

| ❌ AI 常见错误 | ✅ 正确写法 | 说明 |
|--------------|-----------|------|
| `.backgroundColor('#ff0000')` 写成 `.bgColor('#ff0000')` | `.backgroundColor('#ff0000')` | 捏造了不存在的属性名 |
| `.onClick((event: ClickEvent) => ...)` 写成 `.onClick((event: GestureEvent) => ...)` | 参数类型为 `ClickEvent` | 混淆了事件回调的参数类型 |
| `.borderRadius(8)` 写成 `.radius(8)` | `.borderRadius(8)` | 用了不存在的缩写 |
| `.fontSize(16)` 写成 `.textSize(16)` | `.fontSize(16)` | 捏造了不存在的属性名 |
| `List({ space: 10 })` 写成 `List({ gap: 10 })` | `space` 参数 | 参数名混淆 |
| `Text('').fontColor(Color.Red)` 写成 `Text('').textColor(Color.Red)` | `.fontColor()` | 捏造了不存在的属性名 |

### 7.2 枚举值错误

| ❌ AI 常见错误 | ✅ 正确写法 | 说明 |
|--------------|-----------|------|
| `.textAlign('center')` | `.textAlign(TextAlign.Center)` | 用字符串代替枚举值 |
| `.flexAlign('start')` | `.flexAlign(FlexAlign.Start)` | 枚举值大小写错误 |
| `.fontWeight('bold')` | `.fontWeight(FontWeight.Bold)` | 用字符串代替枚举值 |
| `.displayMode(ButtonMode.NORMAL)` | `ButtonMode` 不存在时用其他方式 | 捏造不存在的枚举 |

### 7.3 参数类型和顺序错误

| ❌ AI 常见错误 | ✅ 正确写法 | 说明 |
|--------------|-----------|------|
| `.margin(10, 20, 10, 20)` | `.margin({ top: 10, right: 20, bottom: 10, left: 20 })` | margin 四值写法不对 |
| `.padding(10, 20)` | `.padding({ top: 10, right: 20 })` | padding 不支持多参数简写 |
| `.width('100%')` 写成 `.width('match_parent')` | `.width('100%')` | 借用 Android 写法 |
| `.height('wrap_content')` | `.height('auto')` 或不设置 | 借用 Android 写法 |
| `animateTo({ duration: 300, curve: 'ease' })` | `animateTo({ duration: 300, curve: Curve.Ease })` | curve 参数应为枚举 |

### 7.4 组件特有属性张冠李戴

| ❌ AI 常见错误 | ✅ 正确写法 | 说明 |
|--------------|-----------|------|
| `Image` 上用 `.textOverflow()` | `.textOverflow()` 仅 `Text` 组件支持 | 属性不属于该组件 |
| `Text` 上用 `.objectFit()` | `.objectFit()` 仅 `Image` 等媒体组件支持 | 属性不属于该组件 |
| `Button` 上用 `.fontColor()` 直接设置 | `Button` 内部文字需通过子组件或 `ButtonStyle` 设置 | Button 的文字样式设置方式不同 |
| `@Styles` 里写组件私有属性 | `@Styles` 仅支持通用属性（规则第11节 样式与主题约束） | @Styles 限制 |

**根因**：AI 凭记忆猜测 API 签名，没有通过检索确认。ArkUI 的属性名、参数类型和枚举值与其他框架（React Native、Flutter、Android）差异大，容易混淆。遇到不确定的属性参数，**必须检索知识库确认**。
