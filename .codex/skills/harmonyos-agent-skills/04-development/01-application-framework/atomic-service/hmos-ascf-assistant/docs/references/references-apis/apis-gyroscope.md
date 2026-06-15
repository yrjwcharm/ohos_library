# 陀螺仪

## has.startGyroscope

has.startGyroscope(Object object)

开始监听陀螺仪数据。

**起始版本：** 1.0.4

**需要权限**：在module.json5文件中声明**ohos.permission.GYROSCOPE**。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| interval | string | normal | 否 | 监听陀螺仪数据回调函数的执行频率。<br/>game：适用于更新游戏的回调频率，在20ms/次左右。<br/>ui：适用于更新UI的回调频率，在60ms/次左右。<br/>normal：普通的回调频率，在200ms/次左右。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.startGyroscope({
  success: () => {
    console.info('startGyroscope success');
  },
  fail: (err) => {
    console.error('startGyroscope fail', err);
  },
  complete: (res) => {
    console.info('startGyroscope complete', res);
  }
});
```

## has.stopGyroscope

has.stopGyroscope(Object object)

停止监听陀螺仪数据。

**起始版本：** 1.0.4

**需要权限**：在module.json5文件中声明**ohos.permission.GYROSCOPE**。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.stopGyroscope({
  success: () => {
    console.info('stopGyroscope success');
  },
  fail: (err) => {
    console.error('stopGyroscope fail', err);
  },
  complete: (res) => {
    console.info('stopGyroscope complete', res);
  }
});
```

## has.onGyroscopeChange

has.onGyroscopeChange(function callback)

监听陀螺仪数据变化事件。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 陀螺仪数据变化事件的回调函数。 |

**callback返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| x | number | x轴的角速度。 |
| y | number | y轴的角速度。 |
| z | number | z轴的角速度。 |

**示例：**

```js
has.onGyroscopeChange(function(res) {
  console.info('onGyroscopeChange callback triggered', res);
});
```

## has.offGyroscopeChange

has.offGyroscopeChange(function callback)

移除陀螺仪数据变化事件的监听函数。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | [has.onGyroscopeChange](#hasongyroscopechange)传入的监听函数。不传此参数则移除所有监听函数。 |

**示例：**

```js
const onGyroscopeChangeFn = function(res) {
  console.info('onGyroscopeChange callback triggered', res);
};
has.onGyroscopeChange(onGyroscopeChangeFn);
has.offGyroscopeChange(onGyroscopeChangeFn);
```
