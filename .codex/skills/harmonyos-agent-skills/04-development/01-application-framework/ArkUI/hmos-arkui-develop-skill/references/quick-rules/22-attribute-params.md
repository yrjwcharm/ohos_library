## 22. 属性和 API 参数约束

### 22.1 属性命名规则

| 规则 | 说明 |
|------|------|
| **禁止捏造不存在的属性名** | ArkUI 属性名与其他框架差异大，不确定时必须检索知识库确认 |
| **禁止使用缩写属性** | 无 `.bgColor()`、`.radius()`、`.textSize()` 等缩写，必须用全称 |
| **属性归属组件需匹配** | `.textOverflow()` 仅 Text 支持，`.objectFit()` 仅 Image 等媒体组件支持 |
| **Button 文字样式通过子组件设置** | Button 内部文字不直接支持 `.fontColor()`，需通过子组件或 ButtonStyle |
| **@Styles 仅支持通用属性** | @Styles 中不能写组件私有属性 |

### 22.2 枚举值规则

| 规则 | 说明 |
|------|------|
| **禁止用字符串代替枚举** | `.textAlign(TextAlign.Center)`，不能写 `.textAlign('center')` |
| **枚举值大小写必须精确** | `FlexAlign.Start` 不能写 `FlexAlign.start` |
| **禁止猜测不存在的枚举** | 不确定枚举值是否存在时，检索知识库确认 |

### 22.3 参数格式规则

| 规则 | 说明 |
|------|------|
| **margin/padding 不支持多参数简写** | 用 `.margin({ top: 10, right: 20, bottom: 10, left: 20 })`，不能写 `.margin(10, 20, 10, 20)` |
| **Row/Column space 在构造器传入** | `Row({ space: 16 })`，不能写 `Row().space(16)` |
| **Stack 居中用 alignContent** | `Stack().alignContent(Alignment.Center)`，不能用 `.justifyContent()` |
| **Flex 不接受 space 参数** | Flex 无 space，用子组件 margin 替代 |
| **禁止借用其他框架写法** | 不用 `match_parent`/`wrap_content`（Android），用 `'100%'`/`'auto'` |
| **animateTo curve 必须为枚举** | `curve: Curve.Ease`，不能写 `curve: 'ease'` |

### 22.4 组件构造器规则

| 规则 | 说明 |
|------|------|
| **Badge 必须包含 style** | `Badge({ count: 5, style: { badgeSize: 16, badgeColor: Color.Red } })` |
| **Badge 的 count 和 value 二选一** | 不能同时传 count 和 value |
| **Select 直接传 SelectOption 数组** | `Select([{ value: 'A' }, { value: 'B' }])`，不是嵌套 `{ options: [...] }` |
| **bindPopup 需要 2 个参数** | `.bindPopup(this.show, { message: 'text' })`，show + options |
| **WaterFlow 不接受 controller 参数** | `WaterFlow()` 空构造 |
| **RichEditor 必须传 controller** | `RichEditor({ controller: this.editor })` |
| **overlay 必须传 CustomBuilder** | 不能直接 `.overlay(Text('label'))`，需 `@Builder` 包装 |
| **Scroll 传实例不传类** | `Scroll()` 或 `Scroll(new Scroller())`，不能 `Scroll(Scroller)` |
| **ListItemGroup 无 divider 属性** | 用 List 的 `.divider()` 统一设置 |

### 22.5 回调参数规则

| 规则 | 说明 |
|------|------|
| **回调参数类型必须精确** | `onClick` 参数是 `ClickEvent`，不是 `GestureEvent` |
| **回调参数多为对象而非原始类型** | Video `onUpdate` 返回 `PlaybackInfo` 对象，`onPrepared` 返回 `PreparedInfo` 对象 |
| **bindPopup onStateChange 参数是对象** | `{ isVisible }` 对象，不是 `boolean` |
| **TextPickerResult.index 是数组** | `result.index[0]`，不是 `result.index` |
| **curves.springCurve 需要 4 个参数** | `curves.springCurve(10, 1, 228, 30)` |
| **AlertDialog 按钮字段用 value** | `{ value: 'OK', action: () => {} }`，不是 `{ text: 'OK' }` |
| **ActionSheet 选项列表用 sheets** | `{ sheets: [{ title: '选项', action }] }`，不是 `buttons` |

### 22.6 资源名称规则

| 规则 | 说明 |
|------|------|
| **禁止猜测系统符号名** | 系统符号名与直觉不同，必须查验证列表 |
| **$r 系统颜色多数不存在** | 优先用 hex 字符串如 `'#FFE84026'`，$r('sys.color.xxx') 大部分无效 |
| **mediaQuery 大写 Q** | `import { MediaQuery } from '@kit.ArkUI'`，小写 q 编译失败 |

### 22.7 全局类型不需要 import

以下类型/能力是全局内置的，**不需要 import**：

| 能力 | 说明 |
|------|------|
| `SwiperController` | 全局类型，直接 `new SwiperController()` |
| `LazyForEach` | 全局内置，不需要 import |
| `ForEach` | 全局内置 |
| 基础弹窗类型 | `AlertDialog`、`ActionSheet` 等回调类型全局可用 |

### 22.8 不存在的 API（禁止使用）

| 名称 | 说明 |
|------|------|
| `WaterFlowController` | WaterFlow 无控制器 |
| `StarStyle` 枚举 | Rating starStyle 只接受自定义图片对象 |
| `SnapAlign / SnapPagination` | scrollSnap 不可用 |
| `curves.easeInOut()` | 用 `curves.initCurve(Curve.EaseInOut)` |
| `keyframeAnimateTo()` | 不存在 |
| `LengthMetrics.vp()` | LengthMetrics 只是类型不能当值用 |
| `GradientDirection.BottomRight` | 只有 TopLeft/TopRight/BottomLeft |

### 常见错误

#### 参数名捏造

| 错误写法 | 正确写法 |
|---------|---------|
| `.bgColor('#ff0000')` | `.backgroundColor('#ff0000')` |
| `.radius(8)` | `.borderRadius(8)` |
| `.textSize(16)` | `.fontSize(16)` |
| `.textColor(Color.Red)` | `.fontColor(Color.Red)` |
| `List({ gap: 10 })` | `List({ space: 10 })` |

#### 枚举值错误

| 错误写法 | 正确写法 |
|---------|---------|
| `.textAlign('center')` | `.textAlign(TextAlign.Center)` |
| `.fontWeight('bold')` | `.fontWeight(FontWeight.Bold)` |
| `PanelType.MiniCard` | `PanelType.Minibar` |
| `PanelType.HalfCard` | `PanelType.Foldable` |
| `ImageRenderingMode.ORIGINAL` | `ImageRenderMode.Original` |
| `DataPanelType.Close / Ring` | `DataPanelType.Circle / Line` |
| `TextInputStyle.Normal` | 不存在，不调用 `.style()` |

#### 回调参数类型错误

| 错误写法 | 正确写法 |
|---------|---------|
| `Video.onTimeUpdate((time: number) => {})` | `Video.onUpdate((data: PlaybackInfo) => { data.time })` |
| `Video.onPrepared((duration: number) => {})` | `Video.onPrepared((data: PreparedInfo) => { data.duration })` |
| `bindPopup onStateChange((vis: boolean) => {})` | `onStateChange((e: PopupStateEvent) => { e.isVisible })` |
| `colors[result.index]` | `colors[result.index[0]]` |
| `curves.springCurve(0.3, 1.0)` | `curves.springCurve(10, 1, 228, 30)` |

#### 资源名称错误

| 错误写法 | 正确写法 |
|---------|---------|
| `$r('sys.symbol.share')` | `$r('sys.symbol.upload')` |
| `$r('sys.symbol.settings')` | `$r('sys.symbol.gearshape')` |
| `$r('sys.symbol.search')` | `$r('sys.symbol.magnifyingglass')` |
| `$r('sys.symbol.home')` | `$r('sys.symbol.house')` |
| `$r('sys.color.ohos_id_color_emergency')` | `'#FFE84026'`（hex） |

---