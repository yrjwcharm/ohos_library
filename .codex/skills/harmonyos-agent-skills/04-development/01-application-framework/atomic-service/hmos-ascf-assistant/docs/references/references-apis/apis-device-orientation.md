# 设备方向

## has.startDeviceMotionListening

has.startDeviceMotionListening(Object object)

开始监听设备方向的变化。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| interval | string | normal | 否 | 监听设备方向的变化回调函数的执行频率。详细内容参见“interval合法值”。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**interval合法值：**

| 值 | 描述 |
| -------- | -------- |
| game | 适用于更新游戏的回调频率，在20ms/次左右。 |
| ui | 适用于更新 UI 的回调频率，在60ms/次左右。 |
| normal | 普通的回调频率，在200ms/次左右。 |

**示例：**

```js
has.startDeviceMotionListening({
  success: (res) => {
    console.info('startDeviceMotionListening success', res);
  },
  fail: (err) => {
    console.error('startDeviceMotionListening fail', err);
  },
  complete: (res) => {
    console.info('startDeviceMotionListening complete', res);
  }
});
```

## has.stopDeviceMotionListening

has.stopDeviceMotionListening(Object object)

停止监听设备方向的变化。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.stopDeviceMotionListening({
  success: () => {
    console.info('stopDeviceMotionListening success');
  },
  fail: (err) => {
    console.error('stopDeviceMotionListening fail', err);
  },
  complete: (res) => {
    console.info('stopDeviceMotionListening complete', res);
  }
});
```

## has.onDeviceMotionChange

has.onDeviceMotionChange(function callback)

监听设备方向变化事件。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 设备方向变化事件的回调函数。 |

**callback返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| alpha | number | 当手机坐标X/Y和地球X/Y重合时，绕着Z轴转动的夹角为alpha，范围值为[0, 2\*PI)。逆时针转动为正。 |
| beta | number | 当手机坐标Y/Z 和地球Y/Z重合时，绕着X轴转动的夹角为beta。范围值为[-1\*PI, PI)。顶部朝着地球表面转动为正，也有可能朝着用户为正。 |
| gamma | number | 当手机坐标X/Z 和地球X/Z重合时，绕着Y轴转动的夹角为gamma。范围值为[-1\*PI/2, PI/2)。右边朝着地球表面转动为正。 |

**示例：**

```js
const listener = function(res) {
  console.info('onDeviceMotionChange callback triggered', res);
};

has.onDeviceMotionChange(listener);
```

## has.offDeviceMotionChange

has.offDeviceMotionChange(function callback)

取消监听设备方向变化事件，如果参数为空，则取消所有的事件监听。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | 设备方向变化事件的回调函数。 |

**示例：**

```js
const listener = function(res) {
  console.info('onDeviceMotionChange callback triggered', res);
};

has.onDeviceMotionChange(listener);
has.offDeviceMotionChange(listener);
```
