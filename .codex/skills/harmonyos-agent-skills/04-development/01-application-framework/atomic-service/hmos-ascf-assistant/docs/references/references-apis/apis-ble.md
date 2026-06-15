# 蓝牙-低功耗中心设备

## has.createBLEConnection

has.createBLEConnection(Object object)

连接蓝牙低功耗设备。

若元服务在之前已有搜索过某个蓝牙设备，并成功建立连接，可直接传入之前搜索获取的 deviceId 直接尝试连接该设备，无需再次进行搜索操作。

**起始版本：** 1.0.4

**需要权限：**

1. 在module.json5文件中声明**ohos.permission.ACCESS_BLUETOOTH**。
2. 使用[has.authorize()](apis-authorization.md#hasauthorize)中申请[scope.bluetooth](../../guides/develop-authorization.md#scope-列表)。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| deviceId | string | 是 | 蓝牙设备 id。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.createBLEConnection({
  deviceId: '',
  success: () => {
    console.info('createBLEConnection success');
  },
  fail: (err) => {
    console.error('createBLEConnection fail', err);
  },
  complete: (res) => {
    console.info('createBLEConnection complete', res);
  }
});
```

## has.closeBLEConnection

has.closeBLEConnection(Object object)

断开与蓝牙低功耗设备的连接。

**起始版本：** 1.0.4

**需要权限：**

1. 在module.json5文件中声明**ohos.permission.ACCESS_BLUETOOTH**。
2. 使用[has.authorize()](apis-authorization.md#hasauthorize)中申请[scope.bluetooth](../../guides/develop-authorization.md#scope-列表)。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| deviceId | string | - | 是 | 蓝牙设备id。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.closeBLEConnection({
  deviceId: '',
  success: () => {
    console.info('closeBLEConnection success');
  },
  fail: (err) => {
    console.error('closeBLEConnection fail', err);
  },
  complete: (res) => {
    console.info('closeBLEConnection complete', res);
  }
});
```

## has.getConnectedBluetoothDevices

has.getConnectedBluetoothDevices(Object object)

根据主服务UUID获取已连接的蓝牙设备。

**起始版本：** 1.0.12

**需要权限：**

1. 在module.json5文件中声明**ohos.permission.ACCESS_BLUETOOTH**。
2. 使用[has.authorize()](apis-authorization.md#hasauthorize)中申请[scope.bluetooth](../../guides/develop-authorization.md#scope-列表)。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| services | Array&lt;string&gt; | 是 | 蓝牙设备主服务的UUID列表。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| devices | Object | 搜索到的设备列表。 |

**devices说明：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| name | string | 蓝牙设备名称。 |
| deviceId | string | 用于区分设备的id。 |

**示例：**

```js
has.getConnectedBluetoothDevices({
  services: [''],
  success: (res) => {
    console.info('getConnectedBluetoothDevices success', res);
  },
  fail: (err) => {
    console.error('getConnectedBluetoothDevices fail', err);
  },
  complete: (res) => {
    console.info('getConnectedBluetoothDevices complete', res);
  }
});
```

## has.onBLEConnectionStateChange

has.onBLEConnectionStateChange(function callback)

监听蓝牙低功耗连接状态改变事件。

**起始版本：** 1.0.12

**需要权限：**

1. 在module.json5文件中声明**ohos.permission.ACCESS_BLUETOOTH**。
2. 使用[has.authorize()](apis-authorization.md#hasauthorize)中申请[scope.bluetooth](../../guides/develop-authorization.md#scope-列表)。

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 蓝牙低功耗连接状态改变事件的监听函数。 |

**callback返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| deviceId | string | 蓝牙设备id。 |
| connected | boolean | 是否处于已连接状态。 |

**示例：**

```js
has.onBLEConnectionStateChange({
  function(res) {
    console.info(`device ${res.deviceId} state has changed, connected: ${res.connected}`); 
  }
});
```

## has.offBLEConnectionStateChange

has.offBLEConnectionStateChange(function callback)

移除蓝牙低功耗连接状态改变事件的监听函数。

**起始版本：** 1.0.12

**需要权限：**

1. 在module.json5文件中声明**ohos.permission.ACCESS_BLUETOOTH**。
2. 使用[has.authorize()](apis-authorization.md#hasauthorize)中申请[scope.bluetooth](../../guides/develop-authorization.md#scope-列表)。

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | 取消监听蓝牙低功耗连接状态改变的回调函数。 |

**示例：**

```js
let listener = function(res) {
  console.info(`device ${res.deviceId} state has changed, connected: ${res.connected}`);
};
has.onBLEConnectionStateChange(listener);
has.offBLEConnectionStateChange(listener);
has.offBLEConnectionStateChange();
```

## has.getBLEDeviceServices

has.getBLEDeviceServices(Object object)

获取蓝牙低功耗设备所有服务。

**起始版本：** 1.0.12

**需要权限：**

1. 在module.json5文件中声明**ohos.permission.ACCESS_BLUETOOTH**。
2. 使用[has.authorize()](apis-authorization.md#hasauthorize)中申请[scope.bluetooth](../../guides/develop-authorization.md#scope-列表)。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| deviceId | string | 是 | 蓝牙设备id。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 说明 |
| -------- | -------- | -------- |
| services | Object | 设备服务列表。 |

**services说明：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| uuid | string | 蓝牙设备服务的 UUID。 |
| isPrimary | boolean | 该服务是否为主服务。 |

**示例：**

```js
has.getBLEDeviceServices({ 
  deviceId: 'deviceId',
  success: (res) => {
    console.info('getBLEDeviceServices success', res);
  },
  fail: (err) => {
    console.error('getBLEDeviceServices fail', err);
  },
  complete: (res) => {
    console.info('getBLEDeviceServices complete', res);
  }
});
```

## has.getBLEDeviceCharacteristics

has.getBLEDeviceCharacteristics(Object object)

获取蓝牙低功耗设备某个服务中所有特征。

**起始版本：** 1.0.12

**需要权限：**

1. 在module.json5文件中声明**ohos.permission.ACCESS_BLUETOOTH**。
2. 使用[has.authorize()](apis-authorization.md#hasauthorize)中申请[scope.bluetooth](../../guides/develop-authorization.md#scope-列表)。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| deviceId | string | 是 | 蓝牙设备id。 |
| serviceId | string | 是 | 蓝牙服务UUID。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 说明 |
| -------- | -------- | -------- |
| characteristics | Object | 设备特征列表。 |

**characteristics说明：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| uuid | string | 蓝牙设备特征的UUID。 |
| properties | Object | 该特征支持的操作类型。 |

**properties说明：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| read | boolean | 该特征是否支持read操作。 |
| write | boolean | 该特征是否支持write操作。 |
| notify | boolean | 该特征是否支持notify操作。 |
| indicate | boolean | 该特征是否支持indicate操作。 |
| writeNoResponse | boolean | 该特征是否支持无回复写操作。 |
| writeDefault | boolean | 该特征是否支持有回复写操作。 |

**示例：**

```js
has.getBLEDeviceCharacteristics({ 
  deviceId: 'deviceId',
  serviceId: 'serviceId',
  success: (res) => {
    console.info('getBLEDeviceCharacteristics success', res);
  },
  fail: (err) => {
    console.error('getBLEDeviceCharacteristics fail', err);
  },
  complete: (res) => {
    console.info('getBLEDeviceCharacteristics complete', res);
  }
});
```

## has.readBLECharacteristicValue

has.readBLECharacteristicValue(Object object)

读取蓝牙低功耗设备特征值的二进制数据。

设备的特征需支持read才可以成功调用，可通过[has.getBLEDeviceCharacteristics](#hasgetbledevicecharacteristics)查询是否支持。

**起始版本：** 1.0.12

**需要权限：**

1. 在module.json5文件中声明**ohos.permission.ACCESS_BLUETOOTH**。
2. 使用[has.authorize()](apis-authorization.md#hasauthorize)中申请[scope.bluetooth](../../guides/develop-authorization.md#scope-列表)。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| deviceId | string | 是 | 蓝牙设备id。 |
| serviceId | string | 是 | 蓝牙特征对应服务的UUID。 |
| characteristicId | string | 是 | 蓝牙特征的UUID。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.readBLECharacteristicValue({ 
  deviceId: 'deviceId',
  serviceId: 'serviceId',
  characteristicId: 'characteristicId',
  success: () => {
    console.info('readBLECharacteristicValue success');
  },
  fail: (err) => {
    console.error('readBLECharacteristicValue fail', err);
  },
  complete: (res) => {
    console.info('readBLECharacteristicValue complete', res);
  }
});
```

## has.writeBLECharacteristicValue

has.writeBLECharacteristicValue(Object object)

向蓝牙低功耗设备特征值中写入二进制数据。

设备的特征需支持write才可以成功调用，可通过[has.getBLEDeviceCharacteristics](#hasgetbledevicecharacteristics)查询是否支持。

**起始版本：** 1.0.12

**需要权限：**

1. 在module.json5文件中声明**ohos.permission.ACCESS_BLUETOOTH**。
2. 使用[has.authorize()](apis-authorization.md#hasauthorize)中申请[scope.bluetooth](../../guides/develop-authorization.md#scope-列表)。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| deviceId | string | 是 | 蓝牙设备id。 |
| serviceId | string | 是 | 蓝牙特征对应服务的UUID。 |
| characteristicId | string | 是 | 蓝牙特征的UUID。 |
| value | ArrayBuffer | 是 | 蓝牙设备特征对应的二进制值。 |
| writeType | string | 否 | 蓝牙特征值的写模式设置。<br/>write：强制回复写，不支持时报错。<br/>writeNoResponse：强制无回复写，不支持时报错。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
let buffer = new ArrayBuffer(1);
let dataView = new DataView(buffer);
dataView.setUint8(0, 0);

has.writeBLECharacteristicValue({ 
  deviceId: 'deviceId',
  serviceId: 'serviceId',
  characteristicId: 'characteristicId',
  value: buffer,
  success: () => {
    console.info('writeBLECharacteristicValue success');
  },
  fail: (err) => {
    console.error('writeBLECharacteristicValue fail', err);
  },
  complete: (res) => {
    console.info('writeBLECharacteristicValue complete', res);
  }
});
```

## has.notifyBLECharacteristicValueChange

has.notifyBLECharacteristicValueChange(Object object)

启用蓝牙低功耗设备特征值变化时的notify功能，订阅特征。

设备的特征需支持notify或indicate才可以成功调用，可通过[has.getBLEDeviceCharacteristics](#hasgetbledevicecharacteristics)查询是否支持。

**起始版本：** 1.0.12

**需要权限：**

1. 在module.json5文件中声明**ohos.permission.ACCESS_BLUETOOTH**。
2. 使用[has.authorize()](apis-authorization.md#hasauthorize)中申请[scope.bluetooth](../../guides/develop-authorization.md#scope-列表)。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| deviceId | string | - | 是 | 蓝牙设备id。 |
| serviceId | string | - | 是 | 蓝牙特征对应服务的UUID。 |
| characteristicId | string | - | 是 | 蓝牙特征的UUID。 |
| state | boolean | - | 是 | 是否启用notify。 |
| type | string | indication | 否 | 设置特征订阅类型，有效值有：<br/>notification：不需要对端设备的回复。<br/>indication：需要对端设备的回复。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.notifyBLECharacteristicValueChange({
  deviceId: 'deviceId',
  serviceId: 'serviceId',
  characteristicId: 'characteristicId',
  state: true,
  success: () => {
    console.info('notifyBLECharacteristicValueChange success');
  },
  fail: (err) => {
    console.error('notifyBLECharacteristicValueChange fail', err);
  },
  complete: (res) => {
    console.info('notifyBLECharacteristicValueChange complete', res);
  }
});
```

## has.onBLECharacteristicValueChange

has.onBLECharacteristicValueChange(function callback)

监听蓝牙低功耗设备的特征值变化事件。

必须先调用[has.notifyBLECharacteristicValueChange](#hasnotifyblecharacteristicvaluechange)接口才能接收到设备推送的通知。

**起始版本：** 1.0.12

**需要权限：**

1. 在module.json5文件中声明**ohos.permission.ACCESS_BLUETOOTH**。
2. 使用[has.authorize()](apis-authorization.md#hasauthorize)中申请[scope.bluetooth](../../guides/develop-authorization.md#scope-列表)。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 蓝牙低功耗设备的特征值变化事件的监听函数。 |

**callback返回值**：

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| deviceId | string | 蓝牙设备id。 |
| serviceId | string | 蓝牙特征对应服务的UUID。 |
| characteristicId | string | 蓝牙特征的UUID。 |
| value | ArrayBuffer | 特征最新的值 |

**示例：**

```js
function ab2hex(buffer) { 
  let hexArr = Array.prototype.map.call(
  new Uint8Array(buffer),
  function(bit) {
    return ('00' + bit.toString(16)).slice(-2)
  }
 )
  return hexArr.join('');
};
has.onBLECharacteristicValueChange(
  function(res) {
    console.info(`characteristic ${res.characteristicId} has changed, now is ${res.value}`);
    console.info(ab2hex(res.value));
  }
);
```

## has.offBLECharacteristicValueChange

has.offBLECharacteristicValueChange()

移除蓝牙低功耗设备的特征值变化事件的全部监听函数。

**起始版本：** 1.0.12

**需要权限：**

1. 在module.json5文件中声明**ohos.permission.ACCESS_BLUETOOTH**。
2. 使用[has.authorize()](apis-authorization.md#hasauthorize)中申请[scope.bluetooth](../../guides/develop-authorization.md#scope-列表)。

**示例：**

```js
has.offBLECharacteristicValueChange();
```
