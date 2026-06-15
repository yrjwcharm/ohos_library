# 推送服务

## has.getAAID

has.getAAID(Object object)

获取[AAID](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/push-get-aaid)。

**起始版本：** 1.0.8

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
| AAID | string | 应用匿名标识符。 |

**示例：**

```js
has.getAAID({
  success: (res) => {
    console.info('getAAID success', res);
  },
  fail: (err) => {
    console.error('getAAID fail', err);
  },
  complete: (res) => {
    console.info('getAAID complete', res);
  }
});
```

## has.deleteAAID

has.deleteAAID(Object object)

删除AAID。

**起始版本：** 1.0.8

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.deleteAAID({
  success: () => {
    console.info('deleteAAID success');
  },
  fail: (err) => {
    console.error('deleteAAID fail', err);
  },
  complete: (res) => {
    console.info('deleteAAID complete', res);
  }
});
```

## has.getPushToken

has.getPushToken(Object object)

获取[推送服务的Token](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/push-get-token)。

**起始版本：** 1.0.8

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
| pushToken | string | 推送服务的Token。 |

**示例：**

```js
has.getPushToken({
  success: (res) => {
    console.info('getPushToken success', res);
  },
  fail: (err) => {
    console.error('getPushToken fail', err);
  },
  complete: (res) => {
    console.info('getPushToken complete', res);
  }
});
```

## has.deletePushToken

has.deletePushToken(Object object)

删除推送服务的Token。

**起始版本：** 1.0.8

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.deletePushToken({
  success: () => {
    console.info('deletePushToken success');
  },
  fail: (err) => {
    console.error('deletePushToken fail', err);
  },
  complete: (res) => {
    console.info('deletePushToken complete', res);
  }
});
```
