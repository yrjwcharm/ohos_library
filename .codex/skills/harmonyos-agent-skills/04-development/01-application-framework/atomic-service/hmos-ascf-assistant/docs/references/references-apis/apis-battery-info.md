# 电量

## has.getBatteryInfoSync

has.getBatteryInfoSync(): Object

同步获取设备电池信息。

**起始版本：** 1.0.4

**返回值：**

返回Object对象，包括以下字段。

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| level | number | 设备电量，范围 1 - 100。 |
| isCharging | boolean | 是否正在充电中。 |
| isLowPowerModeEnabled | boolean | 是否处于省电模式。 |

**示例：**

```js
let res = has.getBatteryInfoSync();
console.info('getBatteryInfoSync result: ', res);
```

## has.getBatteryInfo

has.getBatteryInfo(Object object)

获取设备电池信息。

**起始版本：** 1.0.4

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

Object类型，包括以下字段。

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| level | number | 设备电量，范围 1 - 100。 |
| isCharging | boolean | 是否正在充电中。 |
| isLowPowerModeEnabled | boolean | 是否处于省电模式。 |

**示例：**

```js
has.getBatteryInfo({
  success: (res) => {
    console.info('getBatteryInfo success', res);
  },
  fail: (err) => {
    console.error('getBatteryInfo fail', err);
  },
  complete: (res) => {
    console.info('getBatteryInfo complete', res);
  }
});
```
