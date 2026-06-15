# 网络

## has.getNetworkType

has.getNetworkType(Object object)

获取网络类型。

**起始版本：** 1.0.0

**需要权限：** 在module.json5中声明**ohos.permission.GET_NETWORK_INFO**。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| networkType | string | 网络类型。<br/>cellular：蜂窝网络<br/>wifi：Wi-Fi网络<br/>bluetooth：蓝牙网络<br/>ethernet：以太网网络<br/>vpn：VPN网络<br/>none：无网络<br/>unknown：不常见的网络类型 |

**示例：**

```js
has.getNetworkType({
  success: (res) => {
    console.info('getNetworkType success', res);
  },
  fail: (err) => {
    console.error('getNetworkType fail', err);
  },
  complete: (res) => {
    console.info('getNetworkType complete', res);
  }
});
```

## has.getLocalIPAddress

has.getLocalIPAddress(Object object)

获取局域网IP地址。

**起始版本：** 1.0.12

**需要权限：** 在module.json5中声明**ohos.permission.GET_WIFI_INFO**。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| errMsg | string | 错误信息。 |
| localip | string | 本机局域网IP地址。 |
| netmask | string | 本机局域网子网掩码。 |

**示例：**

```js
has.getLocalIPAddress({
  success: (res) => {
    console.info('getLocalIPAddress success', res);
  },
  fail: (err) => {
    console.error('getLocalIPAddress fail', err);
  },
  complete: (res) => {
    console.info('getLocalIPAddress complete', res);
  }
})
```

## has.onNetworkStatusChange

has.onNetworkStatusChange(function callback)

监听网络状态变化事件。

**起始版本：** 1.0.4

**需要权限：** 在module.json5中声明**ohos.permission.GET_NETWORK_INFO**。

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 网络状态变化事件的监听函数。 |

**callback返回值：**

Object类型，包括以下字段。

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| isConnected | boolean | 当前是否有网络连接。 |
| networkType | string | 网络类型。<br/>cellular：蜂窝网络<br/>wifi：Wi-Fi网络<br/>bluetooth：蓝牙网络<br/>ethernet：以太网网络<br/>vpn：VPN网络<br/>none：无网络<br/>unknown：不常见的网络类型 |

**示例：**

```js
has.onNetworkStatusChange(function(res) { 
  console.info('onNetworkStatusChange callback triggered', res);
});
```

## has.offNetworkStatusChange

has.offNetworkStatusChange(function callback)

移除网络状态变化事件的监听函数。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | [has.onNetworkStatusChange](#hasonnetworkstatuschange)传入的监听函数。不传此参数则移除所有监听函数。 |

**示例：**

```js
const onNetworkStatusChangeFn = function(res) {
  console.info('onNetworkStatusChange callback triggered', res);
};
has.onNetworkStatusChange(onNetworkStatusChangeFn);
has.offNetworkStatusChange(onNetworkStatusChangeFn) ; // 需传入与监听时同一个的函数对象
```

## has.onNetworkWeakChange

has.onNetworkWeakChange(function callback)

监听弱网状态变化事件。

**起始版本：** 1.0.12

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 弱网状态变化事件的监听函数。 |

**callback返回值：**

Object类型，包括以下字段。

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| weakNet | boolean | 当前是否处于弱网状态。 |
| networkType | string | 网络类型。<br/>cellular：蜂窝网络<br/>wifi：Wi-Fi网络 |

**示例：**

```js
has.onNetworkWeakChange(function(res) {
  console.info('onNetworkWeakChange callback triggered', res);
});
// 取消监听
has.offNetworkWeakChange();
```

## has.offNetworkWeakChange

has.offNetworkWeakChange(function callback)

移除弱网状态变化事件的监听函数。

**起始版本：** 1.0.12

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | [has.onNetworkWeakChange](#hasonnetworkweakchange)传入的监听函数。不传此参数则移除所有监听函数。 |

**示例：**

```js
const onNetworkWeakChangeFn = function(res) {
  console.info('onNetworkWeakChange callback triggered', res);
};
has.onNetworkWeakChange(onNetworkWeakChangeFn);
has.offNetworkWeakChange(onNetworkWeakChangeFn) ; // 需传入与监听时同一个的函数对象
```
