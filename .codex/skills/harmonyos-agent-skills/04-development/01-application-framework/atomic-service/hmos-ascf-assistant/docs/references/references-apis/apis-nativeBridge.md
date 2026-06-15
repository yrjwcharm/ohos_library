# 桥接

## has.callNative

string has.callNative(string|Object params)

提供同步调用本地方法的接口。

**需要权限：** 开发前需要申请元服务框架间通信能力权限。接入流程详见[框架间通信使用指导](../references-framework/ascf-nativeBridge.md)。

**起始版本：** 1.0.22

**参数：**

string|Object params。

**示例：**

```js
const res = has.callNative('getSystemInfo');
console.info('callNative getSystemInfo res: ', res);

const sumRes = has.callNative({
  action: 'calculate',
  args: [1, 2, 3, 4, 5]
});
console.info('callNative calculate res: ', sumRes);
```

## has.callNativeAsync

has.callNativeAsync(Object object)

提供异步调用本地方法的接口。

**需要权限：** 开发前需要申请元服务框架间通信能力权限。接入流程详见[框架间通信使用指导](../references-framework/ascf-nativeBridge.md)。

**起始版本：** 1.0.22

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| params | string\|Object | 是 | 开发者根据该参数调用本地异步方法 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.callNativeAsync({
  params: 'getSystemInfo',
  success: (res) => {
    console.info('callNativeAsync getSystemInfo success:', res);
  },
  fail: (err) => {
    console.error('callNativeAsync getSystemInfo fail:', err);
  },
  complete: (res) => {
    console.info('callNativeAsync getSystemInfo complete:', res);
  }
});
has.callNativeAsync({
  params: { action: 'makeCall', args: '13112341234' },
  success: (res) => {
    console.info('callNativeAsync makeCall success:', res);
  },
  fail: (err) => {
    console.error('callNativeAsync makeCall fail:', err);
  },
  complete: (res) => {
    console.info('callNativeAsync makeCall complete:', res);
  }
});
```
