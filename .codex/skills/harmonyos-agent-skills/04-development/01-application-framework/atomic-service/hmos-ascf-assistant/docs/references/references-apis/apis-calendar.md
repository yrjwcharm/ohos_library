# 日历

## has.addPhoneCalendar

has.addPhoneCalendar(Object object)

向系统日历添加日程。

**起始版本：** 1.0.4

**需要权限：**

1. 在module.json5中声明**ohos.permission.READ_CALENDAR**和**ohos.permission.WRITE_CALENDAR**。

2. 在has.authorize中申请[scope.addPhoneCalendar](../../guides/develop-authorization.md#scope-列表)授权。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| title | string | - | 是 | 日程标题。 |
| startTime | number | - | 是 | 开始时间的unix时间戳。 |
| allDay | boolean | false | 否 | 是否全天事件，默认false。 |
| description | string | - | 否 | 日程说明。 |
| location | string | - | 否 | 日程地点。 |
| endTime | string | - | 否 | 结束时间的unix时间戳，默认与开始时间相同。 |
| alarm | boolean | true | 否 | 是否提醒，默认true。 |
| alarmOffset | number | 0 | 否 | 提醒提前量，单位秒，自动计算取整，不足60秒，按0分钟计算，默认0表示开始时提醒。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.authorize({
  scope: 'scope.addPhoneCalendar',
  success: () => {
    has.addPhoneCalendar({
      title: '单次日程',
      startTime: 1730379600,
      description: '日程描述',
      location: '日程地点',
      endTime: '1730386800',
      alarm: true,
      alarmOffset: 60,
    });
  }
});
```

## has.addPhoneRepeatCalendar

has.addPhoneRepeatCalendar(Object object)

向系统日历添加重复日程。

**起始版本：** 1.0.4

**需要权限：**

1. 在module.json5中声明**ohos.permission.READ_CALENDAR**和**ohos.permission.WRITE_CALENDAR**。
2. 在has.authorize中申请[scope.addPhoneCalendar](../../guides/develop-authorization.md#scope-列表)授权。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| title | string | - | 是 | 日程标题。 |
| startTime | number | - | 是 | 开始时间的unix时间戳。 |
| allDay | boolean | false | 否 | 是否全天事件，默认false。 |
| description | string | - | 否 | 日程说明。 |
| location | string | - | 否 | 日程地点。 |
| endTime | string | - | 否 | 结束时间的unix时间戳，默认与开始时间相同。 |
| alarm | boolean | true | 否 | 是否提醒，默认true。 |
| alarmOffset | number | 0 | 否 | 提醒提前量，单位秒，自动计算取整，不足60秒，按0分钟计算，默认0表示开始时提醒。 |
| repeatInterval | string | month | 否 | 重复周期，默认month每月重复。<br/>day：每天重复。<br/>week：每周重复。<br/>month：每月重复。该模式日期不能大于28日。<br/>year：每年重复。 |
| repeatEndTime | number | - | 否 | 重复周期结束时间的unix时间戳，不填表示一直重复。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.authorize({
  scope: 'scope.addPhoneCalendar',
  success: () => {
    has.addPhoneRepeatCalendar({
      title: '重复日程',
      startTime: 1730379600,
      description: '日程描述',
      location: '日程地点',
      endTime: '1730386800',
      alarm: true,
      alarmOffset: 60,
      repeatInterval: 'day',
      repeatEndTime: 1732978800
    });
  }
});
```
