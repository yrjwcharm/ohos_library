## 3. 数据展示组件


> **组件索引**：`Gauge`、`DataPanel`、`QRCode`、`CalendarPicker / TextClock / TextTimer 速查`

### Gauge

仪表盘组件。

**构造：** `Gauge(options: GaugeOptions)`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| value | number | 是 | — | 当前值 |
| min | number | 否 | 0 | 最小值 |
| max | number | 否 | 100 | 最大值 |

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .value | `.value(value: number)` | — | 当前值 |
| .startAngle | `.startAngle(value: number)` | 0 | 起始角度 |
| .endAngle | `.endAngle(value: number)` | 360 | 结束角度 |
| .colors | `.colors(value: Array)` | — | 颜色分段 |
| .strokeWidth | `.strokeWidth(value: Length)` | 4vp | 线宽 |
| .description | `.description(value: CustomBuilder)` | — | 描述区域 |
| .trackShadow | `.trackShadow(value: ShadowOptions)` | — | 轨道阴影 |
| .indicator | `.indicator(value: GaugeIndicatorOptions)` | — | 指示器 |

---

### DataPanel

数据面板。

**构造：** `DataPanel(options: DataPanelOptions)`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| values | number[] | 是 | — | 数据值(最多9项) |
| max | number | 否 | 100 | 最大值 |
| type | DataPanelType | 否 | Circle | 类型(Line/Circle) |

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .closeEffect | `.closeEffect(value: boolean)` | false | 关闭动效 |
| .valueColors | `.valueColors(value: Array\<ResourceColor \| LinearGradient\>)` | — | 数据颜色 |
| .trackBackgroundColor | `.trackBackgroundColor(value: ResourceColor)` | — | 轨道背景色 |
| .strokeWidth | `.strokeWidth(value: Length)` | 24vp | 线宽 |
| .trackShadow | `.trackShadow(value: ShadowOptions)` | — | 轨道阴影 |

---

### QRCode

二维码组件。

**构造：** `QRCode(value: string)`

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .color | `.color(value: ResourceColor)` | Black | 二维码颜色 |
| .backgroundColor | `.backgroundColor(value: ResourceColor)` | White | 背景色 |
| .contentOpacity | `.contentOpacity(value: number)` | 1.0 | 内容透明度 |

---

### CalendarPicker / TextClock / TextTimer 速查

| 组件 | 构造签名 | 核心属性 | 核心事件 |
|------|---------|---------|---------|
| **CalendarPicker** | `CalendarPicker(options?: CalendarPickerOptions)` | `.selectedDate(Date)` `.edgeAlign(CalendarAlign)` `.startDate(Date)` `.endDate(Date)` | `.onDateChange(callback)` |
| **TextClock** | `TextClock(options?: {timeZoneOffset?, is24Hour?})` | `.format(string)` | `.onDateChange(callback)` |
| **TextTimer** | `TextTimer(options?: {isCountDown?, count?, controller?})` | `.format(string)` `.fontColor()` `.fontSize()` | `.onTimer(callback)` |

---
