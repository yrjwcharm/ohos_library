# 隐私

## has.onPrivacyStateChanged

has.onPrivacyStateChanged(function callback)

监听隐私协议变化事件。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 隐私协议变化事件的回调函数。 |

**callback返回值：**

返回值为JSON格式的string，需反序列化，包括以下字段：

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| resultType | number | 用户是否同意隐私协议。返回resultType为1表示同意。 |
| appIndex | number | 应用包的分身索引标识，仅在分身应用中生效。 |

**示例：**

```js
has.onPrivacyStateChanged(function(res) {
  try {
    const resObj = JSON.parse(res); // 先转成对象后再使用
    console.info(`onPrivacyStateChanged resultType = ${resObj.resultType}`);
    console.info(`onPrivacyStateChanged appIndex = ${resObj.appIndex}`);
  } catch (err) {
    console.error('onPrivacyStateChanged fail', err.message);
  }
});
```

## has.getPrivacySetting

has.getPrivacySetting(Object object)

查询隐私授权情况。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值**：

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| needAuthorization | boolean | 是否需要用户授权隐私协议。 |

**示例：**

```js
has.getPrivacySetting({
  success: (res) => {
    console.info('getPrivacySetting success', res);
  },
  fail: (err) => {
    console.error('getPrivacySetting fail', err);
  },
  complete: (res) => {
    console.info('getPrivacySetting complete', res);
  }
});
```