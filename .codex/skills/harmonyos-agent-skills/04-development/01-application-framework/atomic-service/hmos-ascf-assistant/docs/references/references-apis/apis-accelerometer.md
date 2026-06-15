# 加速计

## has.startAccelerometer

has.startAccelerometer(Object object)

开始监听加速度数据。

**起始版本：** 1.0.4

**需要权限**：在module.json5文件中声明**ohos.permission.ACCELEROMETER**。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| interval | string | normal | 否 | 监听加速度数据回调函数的执行频率。<br/>- game：适用于更新游戏的回调频率，在 20ms/次 左右。<br/>- ui：适用于更新 UI 的回调频率，在 60ms/次 左右。<br/>- normal：普通的回调频率，在 200ms/次 左右。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.startAccelerometer({
  success: () => {
    console.info('startAccelerometer success');
  },
  fail: (err) => {
    console.error('startAccelerometer fail', err);
  },
  complete: (res) => {
    console.info('startAccelerometer complete', res);
  }
});
```

## has.stopAccelerometer

has.stopAccelerometer(Object object)

停止监听加速度数据。

**起始版本：** 1.0.4

**需要权限**：在module.json5文件中声明**ohos.permission.ACCELEROMETER**。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.stopAccelerometer({
  success: () => {
    console.info('stopAccelerometer success');
  },
  fail: (err) => {
    console.error('stopAccelerometer fail', err);
  },
  complete: (res) => {
    console.info('stopAccelerometer complete', res);
  }
});
```

## has.onAccelerometerChange

has.onAccelerometerChange(function callback)

监听加速度数据变化事件。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 加速度变化事件的回调函数。 |

**callback返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| x | number | 施加在设备x轴的加速度，单位：m/s²。 |
| y | number | 施加在设备y轴的加速度，单位：m/s²。 |
| z | number | 施加在设备z轴的加速度，单位：m/s²。 |

**示例：**

```js
has.onAccelerometerChange(function(res) {
  console.info('onAccelerometerChange callback triggered', res);
});
```

## has.offAccelerometerChange

has.offAccelerometerChange(function callback)

移除加速度数据变化事件的监听函数。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | [has.onAccelerometerChange](#hasonaccelerometerchange)传入的监听函数。不传此参数则移除所有监听函数。 |

**示例：**

```js
const onAccelerometerChangeFn = function(res) {
  console.info('onAccelerometerChange callback triggered', res);
};

has.onAccelerometerChange(onAccelerometerChangeFn);
has.offAccelerometerChange(onAccelerometerChangeFn);
```
