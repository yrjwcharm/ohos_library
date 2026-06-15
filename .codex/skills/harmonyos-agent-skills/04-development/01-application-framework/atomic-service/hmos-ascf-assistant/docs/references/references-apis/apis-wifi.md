# Wi-Fi

## has.onWifiConnectedWithPartialInfo

has.onWifiConnectedWithPartialInfo(function callback)

监听连接上Wi-Fi的事件。

**起始版本：** 1.0.14

**需要权限：** 在module.json5文件中声明**ohos.permission.GET_WIFI_INFO**。

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 连接上Wi-Fi的事件的回调函数。 |

**callback返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| wifi | [WifiInfo](#wifiinfo) | 只包含SSID属性的WifiInfo对象。 |

**示例：**

```js
const callback = (res) => {
  console.info('onWifiConnectedWithPartialInfo', res); 
};

has.onWifiConnectedWithPartialInfo(callback);
```

## has.offWifiConnectedWithPartialInfo

has.offWifiConnectedWithPartialInfo(function callback)

移除连接上Wi-Fi的事件的监听函数。

**起始版本：** 1.0.14

**需要权限**：在module.json5文件中声明**ohos.permission.GET_WIFI_INFO**。

**参数**：

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | 取消监听连接上Wi-Fi的事件的回调函数，不传此参数则移除所有监听函数 。 |

**示例：**

```js
let callback = (res) => { 
  console.info('onWifiConnectedWithPartialInfo', res); 
}; 

has.onWifiConnectedWithPartialInfo(callback); 
has.offWifiConnectedWithPartialInfo(callback); 
has.offWifiConnectedWithPartialInfo();
```

## has.onWifiConnected

has.onWifiConnected(function callback)

监听连接上Wi-Fi的事件。

**起始版本：** 1.0.4

**需要权限：**

1. 在module.json5文件中声明**ohos.permission.GET_WIFI_INFO**、**ohos.permission.SET_WIFI_INFO**、**ohos.permission.LOCATION**、**ohos.permission.APPROXIMATELY_LOCATION。** 
2. 使用[has.authorize()](apis-authorization.md#hasauthorize)中申请[scope.userLocation](../../guides/develop-authorization.md#scope-列表)。

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 连接上Wi-Fi的事件的回调函数。 |

**callback返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| wifi | [WifiInfo](#wifiinfo) | Wi-Fi信息。 |

**示例：**

```js
const callback = (res) => {
  console.info('onWifiConnected', res);
};

has.onWifiConnected(callback);
```

## has.offWifiConnected

has.offWifiConnected(function callback)

移除连接上Wi-Fi的事件的监听函数。

**起始版本：** 1.0.4

**需要权限**：在module.json5文件中声明**ohos.permission.GET_WIFI_INFO**。

**参数**：

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | 取消监听连接上Wi-Fi的事件的回调函数，不传此参数则移除所有监听函数 。 |

**示例：**

```js
let callback = (res) => {
  console.info('onWifiConnected', res);
};
has.onWifiConnected(callback);
has.offWifiConnected(callback); // 需传入与监听时同一个的函数对象
has.offWifiConnected();
```

## has.onGetWifiList

has.onGetWifiList(function callback)

监听获取到Wi-Fi列表数据事件。

**起始版本：** 1.0.4

**需要权限：** 在module.json5文件中声明**ohos.permission.GET_WIFI_INFO**。

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 监听获取到Wi-Fi列表数据事件的回调函数。 |

**callback返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| wifiList | Array&lt;[WifiInfo](#wifiinfo)&gt; | Wi-Fi列表数据。 |

**示例：**

```js
has.onGetWifiList(
  (res) => {
    console.info('onGetWifiList', res);
  }
);
```

## has.offGetWifiList

has.offGetWifiList(function callback)

移除获取到Wi-Fi列表数据事件的监听函数。

**起始版本：** 1.0.4

**需要权限：** 在module.json5文件中声明**ohos.permission.GET_WIFI_INFO**。

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | 取消监听获取到Wi-Fi列表数据事件的回调函数，不传此参数则移除所有监听函数。 |

**示例：**

```js
let listener = (res) => {
  console.info('onGetWifiList', res);
};
has.onGetWifiList(listener);
has.offGetWifiList(listener);
has.offGetWifiList();
```

## has.getWifiList

has.getWifiList(Object object)

请求获取Wi-Fi列表。

**起始版本：** 1.0.4

**需要权限**：

1. 在module.json5文件中声明**ohos.permission.GET_WIFI_INFO**、**ohos.permission.SET_WIFI_INFO**、**ohos.permission.LOCATION**、**ohos.permission.APPROXIMATELY_LOCATION。**
2. 使用[has.authorize()](apis-authorization.md#hasauthorize)中申请[scope.userLocation](../../guides/develop-authorization.md#scope-列表)。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.getWifiList({
  success: (res) => {
    console.info('getWifiList success', res);
  },
  fail: (err) => {
    console.error('getWifiList fail', err);
  },
  complete: (res) => {
    console.info('getWifiList complete', res);
  }
});
```

## has.getConnectedWifi

has.getConnectedWifi(Object object)

获取已连接中的Wi-Fi信息。

**起始版本：** 1.0.4

**需要权限**：

1. 在module.json5文件中声明**ohos.permission.GET_WIFI_INFO**、**ohos.permission.SET_WIFI_INFO**、**ohos.permission.LOCATION**、**ohos.permission.APPROXIMATELY_LOCATION。**
2. 使用[has.authorize()](apis-authorization.md#hasauthorize)中申请[scope.userLocation](../../guides/develop-authorization.md#scope-列表)。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| partialInfo | boolean | false | 否 | 是否需要返回部分Wi-Fi信息。设置为true时返回的WifiInfo只包含SSID和BSSID字段。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| wifi | [WifiInfo](#wifiinfo) | Wi-Fi信息。 |

**示例：**

```js
has.getConnectedWifi({
  success: (res) => {
    console.info('getConnectedWifi success', res);
  },
  fail: (err) => {
    console.error('getConnectedWifi fail', err);
  },
  complete: (res) => {
    console.info('getConnectedWifi complete', res);
  }
});
```

## has.connectWifi

has.connectWifi(Object object)

连接Wi-Fi。若已知Wi-Fi信息，可以直接使用该接口连接。

**起始版本：** 1.0.4

**需要权限**：

1. 在module.json5文件中声明**ohos.permission.GET_WIFI_INFO**、**ohos.permission.SET_WIFI_INFO**、**ohos.permission.LOCATION**、**ohos.permission.APPROXIMATELY_LOCATION。**
2. 使用[has.authorize()](apis-authorization.md#hasauthorize)中申请[scope.userLocation](../../guides/develop-authorization.md#scope-列表)。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| SSID | string | - | 是 | Wi-Fi设备 SSID。 |
| BSSID | string | - | 否 | Wi-Fi设备 BSSID。 |
| password | string | - | 是 | Wi-Fi设备的密码。 |
| manual | boolean | false | 否 | 跳转到系统设置页进行连接 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.connectWifi({
  SSID: 'SSID',
  BSSID: 'BSSID',
  password: 'password',
  success: (res) => {
    console.info('connectWifi success', res);
  },
  fail: (err) => {
    console.error('connectWifi fail', err);
  },
  complete: (res) => {
    console.info('connectWifi complete', res);
  }
});
```

## WifiInfo

Wifi信息。

**起始版本：** 1.0.4

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| SSID | string | Wi-Fi的SSID。 |
| BSSID | string | Wi-Fi的BSSID，随机设备地址。 |
| secure | boolean | Wi-Fi是否安全，无效加密类型和开放加密类型为不安全。 |
| signalStrength | number | Wi-Fi信号强度，取值范围0-1。 |
| frequency | number | Wi-Fi频段单位MHz。 |
