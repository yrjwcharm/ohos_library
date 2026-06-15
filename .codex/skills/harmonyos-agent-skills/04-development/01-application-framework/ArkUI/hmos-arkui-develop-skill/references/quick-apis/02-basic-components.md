## 2. 基础组件


> **组件索引**：`Text`、`Span`、`ImageSpan`、`SymbolSpan / SymbolGlyph`、`TextInput`、`TextArea`、`Button`、`Image`、`Slider`、`Toggle`、`Radio`、`Checkbox`、`CheckboxGroup`、`Progress`、`Rating`、`LoadingProgress`、`Search`、`Select`、`RichEditor`、`overlay`、`其他基础组件速查`
> **组件索引**：`Text`、`Span`、`ImageSpan`、`SymbolSpan / SymbolGlyph`、`TextInput`、`TextArea`、`Button`、`Image`、`Slider`、`Toggle`、`Radio`、`Checkbox`、`CheckboxGroup`、`Progress`、`Rating`、`LoadingProgress`、`Search`、`Select`、`其他基础组件速查`

### Text

文本显示组件。可包含 Span/ImageSpan/SymbolSpan 子组件。

**构造：** `Text(content?: string | Resource, value?: TextOptions)`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| content | string \| Resource | 否 | '' | 文本内容 |
| value | TextOptions | 否 | — | API 11+ 初始化选项 |

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .fontColor | `.fontColor(value: ResourceColor)` | — | 字体颜色 |
| .fontSize | `.fontSize(value: Length)` | 16fp | 字号 |
| .fontWeight | `.fontWeight(value: FontWeight \| number \| string)` | Normal | 字重 |
| .fontStyle | `.fontStyle(value: FontStyle)` | Normal | 字体样式 |
| .fontFamily | `.fontFamily(value: ResourceStr)` | 'HarmonyOS Sans' | 字体族 |
| .letterSpacing | `.letterSpacing(value: number \| string)` | 0 | 字符间距 |
| .textAlign | `.textAlign(value: TextAlign)` | Start | 水平对齐 |
| .baselineOffset | `.baselineOffset(value: number \| ResourceStr)` | 0 | 基线偏移 |
| .decoration | `.decoration(value: DecorationStyleInterface)` | {type:None, color:Black} | 装饰线 |
| .textOverflow | `.textOverflow(value: {overflow: TextOverflow})` | None | 溢出处理 |
| .maxLines | `.maxLines(value: number)` | Infinity | 最大行数 |
| .lineHeight | `.lineHeight(value: number \| string)` | — | 行高 |
| .textShadow | `.textShadow(value: TextShadowOptions)` | — | API 10+ 文字阴影 |
| .minFontSize | `.minFontSize(value: number \| string)` | — | 最小字号 |
| .maxFontSize | `.maxFontSize(value: number \| string)` | — | 最大字号 |
| .copyOption | `.copyOption(value: CopyOptions)` | None | API 9+ 复制选项 |
| .selection | `.selection(start: number, end: number)` | — | API 11+ 选中区域 |
| .ellipsisMode | `.ellipsisMode(value: EllipsisMode)` | END | API 11+ 省略位置 |
| .textCase | `.textCase(value: TextCase)` | — | 大小写 |
| .fontFeature | `.fontFeature(value: string)` | — | API 12+ 文字特性 |
| .heightAdaptivePolicy | `.heightAdaptivePolicy(value: TextHeightAdaptivePolicy)` | MaxLines | API 10+ 自适应策略 |
| .textIndent | `.textIndent(value: Length)` | 0 | API 10+ 首行缩进 |
| .wordBreak | `.wordBreak(value: WordBreak)` | NORMAL | API 11+ 断行规则 |
| .halfLeading | `.halfLeading(value: boolean)` | false | API 12+ 垂直居中 |
| .lineSpacing | `.lineSpacing(value: LineSpacingOptions)` | — | API 12+ 行间距 |
| .caretColor | `.caretColor(value: ResourceColor)` | '#007DFF' | API 14+ 手柄颜色 |
| .selectedBackgroundColor | `.selectedBackgroundColor(value: ResourceColor)` | — | API 14+ 选中底板色 |
| .textSelectable | `.textSelectable(value: TextSelectableMode)` | — | API 12+ 可选择 |
| .enableDataDetector | `.enableDataDetector(value: boolean)` | false | API 11+ 文本识别 |
| .lineBreakStrategy | `.lineBreakStrategy(value: LineBreakStrategy)` | — | API 12+ 折行规则 |
| .maxFontScale | `.maxFontScale(value: number \| Resource)` | — | API 12+ 最大缩放倍数 |
| .minFontScale | `.minFontScale(value: number \| Resource)` | — | API 12+ 最小缩放倍数 |
| .contentTransition | `.contentTransition(value: Optional\<ContentTransition\>)` | — | API 20+ 动效 |
| .marqueeOptions | `.marqueeOptions(value: TextMarqueeOptions)` | — | API 18+ 跑马灯 |
| .enableHapticFeedback | `.enableHapticFeedback(value: boolean)` | — | API 13+ 触控反馈 |

> DecorationStyleInterface：`{ type: TextDecorationType, color?: ResourceColor, style?: TextDecorationStyle }`
> TextDecorationType 枚举：Underline / Overline / LineThrough / None
> TextDecorationStyle 枚举：SOLID / DOUBLE / DOTTED / DASHED / WAVY
>
> TextShadowOptions：`{ radius: number, color?: ResourceColor, offsetX?: number, offsetY?: number }`

**事件：**

| 事件 | 签名 | 说明 |
|------|------|------|
| .onCopy | `.onCopy(event: (value: string) => void)` | API 9+ 复制回调 |

---

### Span

文本行内片段。

**构造：** `Span(value: string | Resource)`

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .fontColor | `.fontColor(value: ResourceColor)` | — | 字体颜色 |
| .fontSize | `.fontSize(value: Length)` | 16fp | 字号 |
| .fontWeight | `.fontWeight(value: FontWeight \| number)` | Normal | 字重 |
| .fontStyle | `.fontStyle(value: FontStyle)` | Normal | 字体样式 |
| .fontFamily | `.fontFamily(value: ResourceStr)` | — | 字体族 |
| .decoration | `.decoration(value: DecorationStyleInterface)` | {type:None} | 装饰线 |
| .letterSpacing | `.letterSpacing(value: number \| string)` | 0 | 字符间距 |
| .textCase | `.textCase(value: TextCase)` | — | 大小写 |
| .lineHeight | `.lineHeight(value: Length)` | — | 行高 |
| .textShadow | `.textShadow(value: TextShadowOptions)` | — | API 10+ 文字阴影 |

---

### ImageSpan

文本行内图片。

**构造：** `ImageSpan(value: ResourceStr | PixelMap)`

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .verticalAlign | `.verticalAlign(value: ImageSpanAlignment)` | BOTTOM | 垂直对齐 |
| .objectFit | `.objectFit(value: ImageFit)` | Cover | 填充方式 |
| .alt | `.alt(value: PixelMap)` | — | API 12+ 占位图 |

**事件：**

| 事件 | 签名 | 说明 |
|------|------|------|
| .onComplete | `.onComplete(event: () => void)` | 加载完成 |
| .onError | `.onError(event: () => void)` | 加载失败 |

---

### SymbolSpan / SymbolGlyph

系统 Symbol 图标。

**构造：** `SymbolSpan(value: Resource)` / `SymbolGlyph(value?: Resource)`

**属性方法 (两者共用)：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .fontColor | `.fontColor(value: Array\<ResourceColor\>)` | — | 颜色数组 |
| .fontSize | `.fontSize(value: Length)` | 16fp | 尺寸 |
| .fontWeight | `.fontWeight(value: FontWeight \| number)` | Normal | 字重 |
| .renderingStrategy | `.renderingStrategy(value: SymbolRenderingStrategy)` | — | 渲染策略 |
| .effectStrategy | `.effectStrategy(value: SymbolEffectStrategy)` | — | 动效策略 |

SymbolGlyph 额外方法：`.symbolEffect(effect: SymbolEffect, isActive?: boolean)`

---

### TextInput

单行文本输入框。

**构造：** `TextInput(value?: TextInputOptions)`

**TextInputOptions：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| placeholder | ResourceStr | 否 | — | 占位文本 |
| text | ResourceStr | 否 | — | 输入内容，支持 $$ |
| controller | TextInputController | 否 | — | 控制器 |

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .type | `.type(value: InputType)` | Normal | 输入类型 |
| .placeholderColor | `.placeholderColor(value: ResourceColor)` | 跟随主题 | 占位符颜色 |
| .placeholderFont | `.placeholderFont(value?: Font)` | — | 占位符字体 |
| .enterKeyType | `.enterKeyType(value: EnterKeyType)` | Done | 回车键类型 |
| .caretColor | `.caretColor(value: ResourceColor)` | '#007DFF' | 光标颜色 |
| .maxLength | `.maxLength(value: number)` | Infinity | 最大字符数 |
| .fontColor | `.fontColor(value: ResourceColor)` | — | 字体颜色 |
| .fontSize | `.fontSize(value: Length)` | 16fp | 字号 |
| .fontStyle | `.fontStyle(value: FontStyle)` | Normal | 字体样式 |
| .fontWeight | `.fontWeight(value: FontWeight \| number \| string)` | Normal | 字重 |
| .fontFamily | `.fontFamily(value: ResourceStr)` | 'HarmonyOS Sans' | 字体族 |
| .showPasswordIcon | `.showPasswordIcon(value: boolean)` | true | 密码模式图标 |
| .copyOption | `.copyOption(value: CopyOptions)` | LocalDevice | 复制选项 |
| .textAlign | `.textAlign(value: TextAlign)` | Start | 对齐方式 |
| .inputFilter | `.inputFilter(value: ResourceStr, error?: Callback\<string\>)` | — | API 8+ 正则过滤 |
| .style | `.style(value: TextInputStyle \| TextContentStyle)` | Default | API 9+ 输入框风格 |
| .showUnderline | `.showUnderline(value: boolean)` | false | API 10+ 下划线 |
| .selectedBackgroundColor | `.selectedBackgroundColor(value: ResourceColor)` | — | API 10+ 选中底板色 |
| .caretStyle | `.caretStyle(value: CaretStyle)` | — | API 10+ 光标样式 |
| .showCounter | `.showCounter(value: boolean)` | false | API 10+ 字数统计 |
| .counterType | `.counterType(value: InputCounterType)` | — | API 11+ 计数器类型 |
| .enableKeyboardOnFocus | `.enableKeyboardOnFocus(value: boolean)` | true | API 10+ 聚焦弹键盘 |
| .selectionMenuHidden | `.selectionMenuHidden(value: boolean)` | false | API 12+ 隐藏选择菜单 |

**事件：**

| 事件 | 签名 | 说明 |
|------|------|------|
| .onChange | `.onChange(event: (value: string) => void)` | 文本变化 |
| .onSubmit | `.onSubmit(event: (enterKey: EnterKeyType) => void)` | 回车提交 |
| .onEditChange | `.onEditChange(event: (isEditing: boolean) => void)` | 编辑状态变化 |
| .onCopy | `.onCopy(event: (value: string) => void)` | API 9+ 复制 |
| .onCut | `.onCut(event: (value: string) => void)` | API 9+ 剪切 |
| .onPaste | `.onPaste(event: (value: string) => void)` | API 9+ 粘贴 |

---

### TextArea

多行文本输入框。

**构造：** `TextArea(value?: TextAreaOptions)`

**TextAreaOptions：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| placeholder | ResourceStr | 否 | — | 占位文本 |
| text | ResourceStr | 否 | — | 输入内容，支持 $$ |
| controller | TextAreaController | 否 | — | 控制器 |

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .placeholderColor | `.placeholderColor(value: ResourceColor)` | 跟随主题 | 占位符颜色 |
| .placeholderFont | `.placeholderFont(value?: Font)` | — | 占位符字体 |
| .textAlign | `.textAlign(value: TextAlign)` | Start | 文本对齐 |
| .caretColor | `.caretColor(value: ResourceColor)` | '#007DFF' | 光标颜色 |
| .fontColor | `.fontColor(value: ResourceColor)` | — | 字体颜色 |
| .fontSize | `.fontSize(value: Length)` | 16fp | 字号 |
| .fontStyle | `.fontStyle(value: FontStyle)` | Normal | 字体样式 |
| .fontWeight | `.fontWeight(value: FontWeight \| number)` | Normal | 字重 |
| .fontFamily | `.fontFamily(value: ResourceStr)` | 'HarmonyOS Sans' | 字体族 |
| .copyOption | `.copyOption(value: CopyOptions)` | LocalDevice | 复制选项 |
| .barState | `.barState(value: BarState)` | Auto | 滚动条状态 |
| .maxLength | `.maxLength(value: number)` | Infinity | 最大字符数 |
| .showCounter | `.showCounter(value: boolean)` | false | API 10+ 字数统计 |
| .enableKeyboardOnFocus | `.enableKeyboardOnFocus(value: boolean)` | true | 聚焦弹键盘 |

**事件：**

| 事件 | 签名 | 说明 |
|------|------|------|
| .onChange | `.onChange(event: (value: string) => void)` | 文本变化 |
| .onSubmit | `.onSubmit(event: (enterKey: EnterKeyType) => void)` | API 18+ 回车 |
| .onCopy / .onCut / .onPaste | 同 TextInput | — |

---

### Button

按钮组件。可包含单个子组件。

**构造：**

```typescript
Button(options: ButtonOptions)                          // 含子组件
Button(label?: ResourceStr, options?: ButtonOptions)     // 文本按钮
Button()                                                 // 空按钮
```

**ButtonOptions：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| type | ButtonType | 否 | ROUNDED_RECTANGLE | 按钮形状 |
| stateEffect | boolean | 否 | true | 按压态效果 |
| buttonStyle | ButtonStyleMode | 否 | EMPHASIZED | API 11+ 样式模式 |
| controlSize | ControlSize | 否 | NORMAL | API 11+ 尺寸 |
| role | ButtonRole | 否 | NORMAL | API 12+ 角色 |

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .type | `.type(value: ButtonType)` | ROUNDED_RECTANGLE | 按钮形状 |
| .fontSize | `.fontSize(value: Length)` | 跟随 controlSize | 字号 |
| .fontColor | `.fontColor(value: ResourceColor)` | 白色 | 字体颜色 |
| .fontWeight | `.fontWeight(value: FontWeight \| number \| string)` | 500 | 字重 |
| .fontStyle | `.fontStyle(value: FontStyle)` | Normal | API 8+ 字体样式 |
| .stateEffect | `.stateEffect(value: boolean)` | true | 按压效果 |
| .fontFamily | `.fontFamily(value: string \| Resource)` | 'HarmonyOS Sans' | API 8+ 字体族 |
| .labelStyle | `.labelStyle(value: LabelStyle)` | — | API 10+ 文本样式 |
| .buttonStyle | `.buttonStyle(value: ButtonStyleMode)` | EMPHASIZED | API 11+ 样式 |
| .controlSize | `.controlSize(value: ControlSize)` | NORMAL | API 11+ 尺寸 |
| .role | `.role(value: ButtonRole)` | NORMAL | API 12+ 角色 |
| .contentModifier | `.contentModifier(modifier: ContentModifier\<ButtonConfiguration\>)` | — | API 12+ 自定义内容 |
| .minFontScale | `.minFontScale(value: number \| Resource)` | — | API 18+ 最小缩放 |
| .maxFontScale | `.maxFontScale(value: number \| Resource)` | — | API 18+ 最大缩放 |

---

### Image

图片组件。

**构造：** `Image(src: PixelMap | ResourceStr | DrawableDescriptor)` 或 `Image(src, imageAIOptions?)` API 12+

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| src | PixelMap \| ResourceStr \| DrawableDescriptor | 是 | — | 图片数据源 |
| imageAIOptions | ImageAIOptions | 否 | — | API 12+ AI 分析选项 |

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .alt | `.alt(value: string \| Resource \| PixelMap)` | null | 占位图 |
| .objectFit | `.objectFit(value: ImageFit)` | Cover | 填充方式 |
| .objectRepeat | `.objectRepeat(value: ImageRepeat)` | NoRepeat | 重复样式 |
| .interpolation | `.interpolation(value: ImageInterpolation)` | Low | 插值效果 |
| .renderMode | `.renderMode(value: ImageRenderMode)` | Original | 渲染模式 |
| .sourceSize | `.sourceSize(value: ImageSourceSize)` | — | 解码尺寸 |
| .fillColor | `.fillColor(value: ResourceColor)` | — | 填充色(仅SVG) |
| .autoResize | `.autoResize(value: boolean)` | false | 自动缩放 |
| .syncLoad | `.syncLoad(value: boolean)` | false | API 8+ 同步加载 |
| .colorFilter | `.colorFilter(value: ColorFilter \| DrawingColorFilter)` | — | API 9+ 颜色滤镜 |
| .autoPlay | `.autoPlay(value: boolean)` | true | API 11+ 自动播放动图 |
| .resizable | `.resizable(value: ResizableOptions)` | — | API 11+ 可拉伸 |
| .copyOption | `.copyOption(value: CopyOptions)` | None | API 9+ 复制选项 |
| .fitOriginalSize | `.fitOriginalSize(value: boolean)` | false | 跟随图源尺寸 |
| .matchTextDirection | `.matchTextDirection(value: boolean)` | false | 跟随文字方向 |
| .imageMatrix | `.imageMatrix(value: ImageMatrix)` | — | API 15+ 变换矩阵 |
| .enableAnalyzer | `.enableAnalyzer(value: boolean)` | false | API 12+ AI 图像分析 |

**事件：**

| 事件 | 签名 | 说明 |
|------|------|------|
| .onComplete | `.onComplete(event: (result: ImageLoadResult) => void)` | 加载成功 |
| .onError | `.onError(event: (error: ImageError) => void)` | 加载失败 |
| .onFinish | `.onFinish(event: () => void)` | API 11+ 动图播放完成 |

> ImageLoadResult：`{ width: number, height: number, componentWidth: number, componentHeight: number, loadingStatus: number }`
> ImageError：`{ componentWidth: number, componentHeight: number, message: string }`

---

### Slider

滑动选择器。

**构造：** `Slider(options?: SliderOptions)`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| value | number | 否 | 0 | 当前值 |
| min | number | 否 | 0 | 最小值 |
| max | number | 否 | 100 | 最大值 |
| step | number | 否 | 1 | 步长 |
| style | SliderStyle | 否 | OutSet | 样式 |
| direction | Axis | 否 | Horizontal | 方向 |
| reverse | boolean | 否 | false | 是否反转 |

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .blockColor | `.blockColor(value: ResourceColor)` | — | 滑块颜色 |
| .trackColor | `.trackColor(value: ResourceColor)` | — | 轨道颜色 |
| .selectedColor | `.selectedColor(value: ResourceColor)` | — | 已选颜色 |
| .showSteps | `.showSteps(value: boolean)` | false | 显示步长 |
| .showTips | `.showTips(value: boolean)` | false | 显示提示 |
| .trackThickness | `.trackThickness(value: Length)` | — | 轨道粗细 |
| .blockSize | `.blockSize(value: Size)` | — | 滑块尺寸 |
| .blockBorderColor | `.blockBorderColor(value: ResourceColor)` | — | 滑块边框色 |
| .blockBorderWidth | `.blockBorderWidth(value: Length)` | 0 | 滑块边框宽 |

**事件：**

| 事件 | 签名 | 说明 |
|------|------|------|
| .onChange | `.onChange(event: (value: number, mode: SliderChangeMode) => void)` | 值变化 |

> onChange 回调：`(value: number, mode: SliderChangeMode) => void`
> SliderChangeMode 枚举：Begin / Moving / End / Click

---

### Toggle

开关/复选/按钮切换组件。

**构造：** `Toggle(options: ToggleOptions)`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| type | ToggleType | 否 | Switch | 类型(Checkbox/Switch/Button) |
| isOn | boolean | 否 | false | 开关状态，支持 $$ |

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .selectedColor | `.selectedColor(value: ResourceColor)` | — | 选中颜色 |
| .switchPointColor | `.switchPointColor(value: ResourceColor)` | — | Switch 圆点颜色 |
| .switchStyle | `.switchStyle(value: SwitchStyle)` | — | API 12+ Switch 样式 |

**事件：**

| 事件 | 签名 | 说明 |
|------|------|------|
| .onChange | `.onChange(event: (isOn: boolean) => void)` | 状态变化 |

---

### Radio

单选按钮。

**构造：** `Radio(options: RadioOptions)`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| value | string | 是 | — | 当前 Radio 标识 |
| group | string | 是 | — | 分组名称 |
| indicatorType | RadioIndicatorType | 否 | — | 指示器类型 |
| indicatorBuilder | CustomBuilder | 否 | — | 自定义指示器 |

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .checked | `.checked(value: boolean)` | false | 选中状态，支持 $$ |
| .radioStyle | `.radioStyle(value?: RadioStyle)` | — | 样式 |

**事件：**

| 事件 | 签名 | 说明 |
|------|------|------|
| .onChange | `.onChange(event: (isChecked: boolean) => void)` | 选中变化 |

---

### Checkbox

复选框。

**构造：** `Checkbox(options?: CheckboxOptions)`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| name | string | 否 | — | 名称 |
| group | string | 否 | — | 分组 |
| indicatorBuilder | CustomBuilder | 否 | — | 自定义指示器 |

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .select | `.select(value: boolean)` | false | 选中状态，支持 $$ |
| .selectedColor | `.selectedColor(value: ResourceColor)` | — | 选中颜色 |
| .unselectedColor | `.unselectedColor(value: ResourceColor)` | — | 未选中颜色 |
| .mark | `.mark(value: MarkStyle)` | — | 勾选样式 |
| .shape | `.shape(value: CheckBoxShape)` | — | 形状 |

**事件：**

| 事件 | 签名 | 说明 |
|------|------|------|
| .onChange | `.onChange(event: (value: boolean) => void)` | 选中变化 |

---

### CheckboxGroup

复选框组。

**构造：** `CheckboxGroup(options?: CheckboxGroupOptions)`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| group | string | 否 | — | 分组名称 |

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .selectAll | `.selectAll(value: boolean)` | false | 全选，支持 $$ |
| .selectedColor | `.selectedColor(value: ResourceColor)` | — | 选中颜色 |
| .unselectedColor | `.unselectedColor(value: ResourceColor)` | — | 未选中颜色 |
| .mark | `.mark(value: MarkStyle)` | — | 勾选样式 |
| .checkboxShape | `.checkboxShape(value: CheckBoxShape)` | — | 形状 |

**事件：**

| 事件 | 签名 | 说明 |
|------|------|------|
| .onChange | `.onChange(event: (value: CheckboxGroupResult) => void)` | 变化回调，CheckboxGroupResult：`{ name: Array<string>, status: SelectStatus }`，SelectStatus：0=All(全选)，1=Part(部分)，2=None(全未选) |

---

### Progress

进度条。

**构造：** `Progress(options: ProgressOptions)`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| value | number | 是 | — | 当前值 |
| total | number | 否 | 100 | 总值 |
| type | ProgressType | 否 | Linear | 类型 |

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .value | `.value(value: number)` | — | 当前值 |
| .color | `.color(value: ResourceColor \| LinearGradient)` | — | 进度颜色 |
| .style | `.style(value: ProgressStyleOptions)` | — | 样式 |
| .backgroundColor | `.backgroundColor(value: ResourceColor)` | — | 背景色 |

---

### Rating

评分组件。

**构造：** `Rating(options?: RatingOptions)`

**RatingOptions：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| rating | number | 否 | 0 | 当前评分值 |
| indicator | boolean | 否 | false | 是否仅作为指示器（不可交互） |

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .stars | `.stars(value: number)` | 5 | 星星数 |
| .stepSize | `.stepSize(value: number)` | 0.5 | 步长 |
| .starStyle | `.starStyle(value: StarStyleOptions)` | — | 星星样式，StarStyleOptions：`{ backgroundUri: ResourceStr, foregroundUri: ResourceStr, secondaryUri?: ResourceStr }` |

**事件：**

| 事件 | 签名 | 说明 |
|------|------|------|
| .onChange | `.onChange(event: (value: number) => void)` | 评分变化 |

---

### LoadingProgress

加载进度指示器。

**构造：** `LoadingProgress()`

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .color | `.color(value: ResourceColor)` | — | 颜色 |
| .enableLoading | `.enableLoading(value: boolean)` | true | 启用加载 |

---

### Search

搜索框组件。

**构造：** `Search(options?: SearchOptions)`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| value | ResourceStr | 否 | — | 搜索内容，支持 $$ |
| placeholder | ResourceStr | 否 | — | 占位文本 |
| icon | string | 否 | — | 搜索图标 |
| controller | SearchController | 否 | — | 控制器 |

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .searchButton | `.searchButton(value: ResourceStr, option?)` | — | 搜索按钮 |
| .placeholderColor | `.placeholderColor(value: ResourceColor)` | — | 占位符颜色 |
| .placeholderFont | `.placeholderFont(value?: Font)` | — | 占位符字体 |
| .textFont | `.textFont(value?: Font)` | — | 文本字体 |
| .textAlign | `.textAlign(value: TextAlign)` | — | 文本对齐 |
| .copyOption | `.copyOption(value: CopyOptions)` | — | 复制选项 |
| .searchIcon | `.searchIcon(value: SearchIconOptions)` | — | 搜索图标样式 |
| .cancelButton | `.cancelButton(value: CancelButtonOptions)` | — | 取消按钮样式 |
| .fontColor | `.fontColor(value: ResourceColor)` | — | 字体颜色 |
| .caretStyle | `.caretStyle(value: CaretStyle)` | — | API 10+ 光标样式 |
| .selectedBackgroundColor | `.selectedBackgroundColor(value: ResourceColor)` | — | 选中底板色 |

**事件：**

| 事件 | 签名 | 说明 |
|------|------|------|
| .onSubmit | `.onSubmit(event: (value: string) => void)` | 提交搜索 |
| .onChange | `.onChange(event: (value: string) => void)` | 内容变化 |
| .onCopy | `.onCopy(event: (value: string) => void)` | 复制 |
| .onCut | `.onCut(event: (value: string) => void)` | 剪切 |

---

### Select

下拉选择。

**构造：** `Select(options: Array<SelectOption>)`

> Select 构造器：`Select(options: Array<SelectOption>)`
> 每个 SelectOption：`{ value: string, icon?: ResourceStr, symbolIcon?: SymbolGlyphModifier }`
> ⚠️ 传数组不是传单个对象：`Select([{ value: 'A' }, { value: 'B' }])`

**SelectOption：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| value | ResourceStr | 是 | — | 选项文本 |
| icon | ResourceStr | 否 | — | 选项图标 |
| symbolIcon | SymbolGlyphModifier | 否 | — | 选项符号图标 |

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .selected | `.selected(value: number \| Resource)` | — | 选中索引 |
| .value | `.value(value: ResourceStr)` | — | 显示文本 |
| .controlSize | `.controlSize(value: ControlSize)` | — | 尺寸 |
| .font | `.font(value: Font)` | — | 字体 |
| .fontColor | `.fontColor(value: ResourceColor)` | — | 字体颜色 |
| .selectedOptionBgColor | `.selectedOptionBgColor(value: ResourceColor)` | — | 选中项背景色 |
| .selectedOptionFontColor | `.selectedOptionFontColor(value: ResourceColor)` | — | 选中项字体色 |
| .optionBgColor | `.optionBgColor(value: ResourceColor)` | — | 选项背景色 |
| .optionFontColor | `.optionFontColor(value: ResourceColor)` | — | 选项字体色 |
| .space | `.space(value: number)` | — | 间距 |

**事件：**

| 事件 | 签名 | 说明 |
|------|------|------|
| .onSelect | `.onSelect(event: (index: number, value?: string) => void)` | 选中回调 |

---

### 其他基础组件速查

| 组件 | 构造签名 | 属性方法 | 事件 |
|------|---------|---------|------|
| **Divider** | `Divider()` | `.vertical(bool)` `.color(color)` `.strokeWidth(Length)` `.lineCap(LineCapStyle)` | — |
| **Blank** | `Blank(min?: number\|string)` | `.color(ResourceColor)` | — |
| **Marquee** | `Marquee({start, step?:6, loop?:-1, fromStart?:true, src})` | `.fontColor()` `.fontSize()` `.fontWeight()` `.allowScale()` | `.onStart()` `.onBounce()` `.onFinish()` |
| **ImageAnimator** | `ImageAnimator()` | `.images(Array<ImageAnimatorInfo>)` `.state(AnimationStatus)` `.duration(number)` `.reverse(boolean)` `.fillMode(FillMode)` `.iterations(number)` | `.onStart()` `.onFinish()` `.onRepeat()` |
| **ToolBarItem** | `ToolBarItem(options?: {placement?, content?, icon?, action?})` | — API 20+ | — |
| **RichEditor** | `RichEditor({controller: RichEditorController})` | `.fontSize()` `.fontColor()` `.fontWeight()` | `.onReady()` `.onChange()` |

> **RichEditor 注意：** 必须传 `controller` 参数，不能空构造。`controller: RichEditorController = new RichEditorController()`

### 通用方法注意事项

| 方法 | 签名 | 注意 |
|------|------|------|
| **.overlay** | `.overlay(value: CustomBuilder, options?)` | 必须传 @Builder 函数，不能直接传组件。正确：先定义 `@Builder overlayFn() { Text('label') }`，再 `.overlay(this.overlayFn)` |

---
