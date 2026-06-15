# 罗盘

## has.startCompass

has.startCompass(Object object)

开始监听罗盘数据。

**起始版本：** 1.0.4

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.startCompass({
  success: () => {
    console.info('startCompass success');
  },
  fail: (err) => {
    console.error('startCompass fail', err);
  },
  complete: (res) => {
    console.info('startCompass complete', res);
  }
});
```

## has.stopCompass

has.stopCompass(Object object)

停止监听罗盘数据。

**起始版本：** 1.0.4

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.stopCompass({
  success: () => {
    console.info('stopCompass success');
  },
  fail: (err) => {
    console.error('stopCompass fail', err);
  },
  complete: (res) => {
    console.info('stopCompass complete', res);
  }
});
```

## has.onCompassChange

has.onCompassChange(function callback)

监听罗盘数据变化事件。

频率：5次/秒，接口调用后会自动开始监听，可使用[has.stopCompass](#hasstopcompass)停止监听。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 罗盘变化事件的回调函数。 |

**callback返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| direction | number | 面对的方向度数。 |
| accuracy | string | 精度。<br/>high：高精度。<br/>medium：中等精度。<br/>low：低精度。<br/>unreliable：不可信，原因未知。 |

**示例：**

```js
has.onCompassChange(function(res) {
  console.info('onCompassChange callback triggered', res);
});
```

## has.offCompassChange

has.offCompassChange(function callback)

取消监听罗盘变化事件，如果参数为空，则取消所有的事件监听。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | 罗盘变化的回调函数。 |

**示例：**

```js
const onCompassChangeFn = function(res) {
  console.info('onCompassChange callback triggered', res);
};
has.onCompassChange(onCompassChangeFn);
has.offCompassChange(onCompassChangeFn);
```
