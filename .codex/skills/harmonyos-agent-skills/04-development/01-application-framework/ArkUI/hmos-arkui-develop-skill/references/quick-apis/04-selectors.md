## 4. 选择器组件


> **组件索引**：`DatePicker`、`TimePicker`、`TextPicker`、`PatternLock`、`Stepper / StepperItem 速查`

### DatePicker

日期选择器。

**构造：** `DatePicker(options?: DatePickerOptions)`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| start | Date | 否 | 1970-1-1 | 起始日期 |
| end | Date | 否 | 2100-12-31 | 结束日期 |
| selected | Date | 否 | 当前日期 | 选中日期 |
| lunar | boolean | 否 | false | 农历 |

**属性方法：** `.lunar(boolean)`

**事件：** `.onDateChange(callback)` `.onDateAccept(callback)`

---

### TimePicker

时间选择器。

**构造：** `TimePicker(options?: TimePickerOptions)`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| selected | Date | 否 | 当前时间 | 选中时间 |
| useMilitaryTime | boolean | 否 | true | 24小时制 |

**事件：** `.onChange(callback)`

---

### TextPicker

文本选择器。

**构造：** `TextPicker(options?: TextPickerOptions)`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| range | string[] \| Resource | 否 | — | 数据范围 |
| selected | number | 否 | 0 | 选中索引 |
| value | string | 否 | — | 选中值 |

**属性方法：** `.canLoop(boolean)` `.defaultPickerItemHeight(number)`

**事件：** `.onChange(callback)` `.onAccept(callback)`

---

### PatternLock

图案密码锁。

**构造：** `PatternLock(options?: PatternLockOptions)`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| controller | PatternLockController | 否 | — | 控制器 |
| sideLength | number | 否 | 300vp | 边长 |
| circleRadius | number | 否 | 14vp | 圆点半径 |
| regularColor | ResourceColor | 否 | #FF182431 | 常规颜色 |
| selectedColor | ResourceColor | 否 | #FF182431 | 选中颜色 |
| activeColor | ResourceColor | 否 | #FF182431 | 激活颜色 |
| pathColor | ResourceColor | 否 | #FF317AF7 | 路径颜色 |

**属性方法：** `.autoReset(boolean)` `.challengeResult(PatternLockChallengeResult)`

**事件：** `.onPatternComplete(callback: (input: number[]) => void)`
