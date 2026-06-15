# 蓝牙-通用

## has.startBluetoothDevicesDiscovery

has.startBluetoothDevicesDiscovery(Object object)

开始搜寻附近的蓝牙外围设备。此操作比较耗费系统资源，请在搜索并连接到设备后调用[has.stopBluetoothDevicesDiscovery](#hasstopbluetoothdevicesdiscovery)方法停止搜索。

**起始版本：** 1.0.4

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| services | Array&lt;string&gt; | - | 否 | 要搜索的主service的UUID列表。某些蓝牙设备会广播自己的主service的UUID。如果设置此参数，则只搜索广播包有对应UUID的主服务的蓝牙设备。建议通过该参数过滤掉周边不需要处理的其他蓝牙设备。<br/>**起始版本：** 1.0.18 |
| allowDuplicatesKey | boolean | false | 否 | 是否允许重复上报同一设备。如果允许重复上报，则[has.onBluetoothDeviceFound](#hasonbluetoothdevicefound)方法会多次上报同一设备，但是RSSI值会有不同。 |
| interval | number | 0 | 否 | 上报设备的间隔，单位ms。0表示找到新设备立即上报，其他数值根据传入的间隔上报。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.startBluetoothDevicesDiscovery({
  services: ['FEE7'],
  success: () => {
    console.info('startBluetoothDevicesDiscovery success');
  },
  fail: (err) => {
    console.error('startBluetoothDevicesDiscovery fail', err);
  },
  complete: (res) => {
    console.info('startBluetoothDevicesDiscovery complete', res);
  }
});
```

## has.stopBluetoothDevicesDiscovery

has.stopBluetoothDevicesDiscovery (Object object)

停止搜寻附近的蓝牙外围设备。若已经找到需要的蓝牙设备并不需要继续搜索时，建议调用该接口停止蓝牙搜索。

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
has.stopBluetoothDevicesDiscovery({
  success: () => {
    console.info('stopBluetoothDevicesDiscovery success');
  },
  fail: (err) => {
    console.error('stopBluetoothDevicesDiscovery fail', err);
  },
  complete: (res) => {
    console.info('stopBluetoothDevicesDiscovery complete', res);
  }
});
```

## has.openBluetoothAdapter

has.openBluetoothAdapter(Object object)

初始化蓝牙模块。

**起始版本：** 1.0.4

**需要权限：** 在module.json5文件中声明**ohos.permission.ACCESS_BLUETOOTH**。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.openBluetoothAdapter({
  success: () => {
    console.info('openBluetoothAdapter success');
  },
  fail: (err) => {
    console.error('openBluetoothAdapter fail', err);
  },
  complete: (res) => {
    console.info('openBluetoothAdapter complete', res);
  }
});
```

## has.closeBluetoothAdapter

has.closeBluetoothAdapter(Object object)

关闭蓝牙模块。调用该方法将断开所有已建立的连接并释放系统资源。建议在使用蓝牙流程后，与[has.openBluetoothAdapter](#hasopenbluetoothadapter)成对调用。

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
has.closeBluetoothAdapter({
  success: () => {
    console.info('closeBluetoothAdapter success');
  },
  fail: (err) => {
    console.error('closeBluetoothAdapter fail', err);
  },
  complete: (res) => {
    console.info('closeBluetoothAdapter complete', res);
  }
});
```

## has.onBluetoothDeviceFound

has.onBluetoothDeviceFound(function callback)

监听搜索到新设备的事件。

> **注意：**
>
> 若在[has.onBluetoothDeviceFound](#hasonbluetoothdevicefound)回调了某个设备，则此设备会添加到[has.getBluetoothDevices](#hasgetbluetoothdevices)接口获取到的数组中。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 监听寻找到新设备事件的回调函数。 |

**callback返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| devices | Array&lt;Object&gt; | 新搜索到的设备列表。 |

**devices说明：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| name | string | 蓝牙设备名称，某些设备可能没有。 |
| deviceId | string | 蓝牙设备 id。 |
| RSSI | number | 当前蓝牙设备的信号强度，单位dBm。<br/>**起始版本：** 1.0.18 |
| advertisData | ArrayBuffer | 当前蓝牙设备的广播数据段中的ManufacturerData数据段。<br/>**起始版本：** 1.0.18 |
| advertisServiceUUIDs | Array&lt;string&gt; | 当前蓝牙设备的广播数据段中的ServiceUUIDs数据段。<br/>**起始版本：** 1.0.18 |
| localName | string | 当前蓝牙设备的广播数据段中的LocalName数据段。<br/>**起始版本：** 1.0.18 |
| serviceData | Object | 当前蓝牙设备的广播数据段中的ServiceData数据段。<br/>**起始版本：** 1.0.18 |
| connectable | boolean | 当前蓝牙设备是否可连接。<br/>**起始版本：** 1.0.18 |

**示例：**

```js
// ArrayBuffer转16进制字符串示例
function ab2hex(buffer) {
  const hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function (bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  );
  return hexArr.join('');
};

has.onBluetoothDeviceFound(function (res) {
  const devices = res.devices;
  console.info('new device list has founded');
  console.info(ab2hex(devices[0].advertisData));
});
```

## has.offBluetoothDeviceFound

has.offBluetoothDeviceFound()

移除搜索到新设备的事件的全部监听函数。

**起始版本：** 1.0.4

**示例：**

```js
has.offBluetoothDeviceFound();
```

## has.onBluetoothAdapterStateChange

has.onBluetoothAdapterStateChange(function callback)

监听蓝牙适配器状态变化事件。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 蓝牙适配器状态变化事件的回调函数。 |

**callback返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| available | boolean | 蓝牙适配器是否可用。 |
| discovering | boolean | 是否正在搜索设备。 |

**示例：**

```js
has.onBluetoothAdapterStateChange(function(res) {
  console.info('adapterState changed, now is', res);
});
```

## has.offBluetoothAdapterStateChange

has.offBluetoothAdapterStateChange()

移除蓝牙适配器状态变化事件的全部监听函数。

**起始版本：** 1.0.4

**示例：**

```js
has.offBluetoothAdapterStateChange();
```

## has.getBluetoothDevices

has.getBluetoothDevices(Object object)

获取在蓝牙模块生效期间所有搜索到的蓝牙设备。包括已经和本机处于连接状态的设备。

**起始版本：** 1.0.4

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 属性 | 类型 | 描述 |
| -------- | -------- | -------- |
| devices | Array&lt;Object&gt; | 蓝牙设备列表。 |

**devices说明：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| name | string | 蓝牙设备名称，某些设备可能没有。 |
| deviceId | string | 蓝牙设备id。 |
| RSSI | number | 当前蓝牙设备的信号强度，单位dBm。<br/>**起始版本：** 1.0.18 |
| advertisData | ArrayBuffer | 当前蓝牙设备的广播数据段中的ManufacturerData数据段。<br/>**起始版本：** 1.0.18 |
| advertisServiceUUIDs | Array&lt;string&gt; | 当前蓝牙设备的广播数据段中的ServiceUUIDs数据段。<br/>**起始版本：** 1.0.18 |
| localName | string | 当前蓝牙设备的广播数据段中的LocalName数据段。<br/>**起始版本：** 1.0.18 |
| serviceData | Object | 当前蓝牙设备的广播数据段中的ServiceData数据段。<br/>**起始版本：** 1.0.18 |
| connectable | boolean | 当前蓝牙设备是否可连接。<br/>**起始版本：** 1.0.18 |

**示例：**

```js
// ArrayBuffer转16进制字符串示例
function ab2hex(buffer) {
  const hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function (bit) {
      return ('00' + bit.toString(16)).slice(-2);
    }
  );
  return hexArr.join('');
};

has.getBluetoothDevices({
  success: (res) => {
    console.info('getBluetoothDevices success', res);
    if (res.devices[0]) {
      console.info(ab2hex(res.devices[0].advertisData));
    }
  },
  fail: (err) => {
    console.error('getBluetoothDevices fail', err);
  },
  complete: (res) => {
    console.info('getBluetoothDevices complete', res);
  }
});
```

## has.getBluetoothAdapterState

has.getBluetoothAdapterState(Object object)

获取本机蓝牙适配器状态。

**起始版本：** 1.0.4

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
| available | boolean | 蓝牙适配器是否可用。 |
| discovering | boolean | 是否正在搜索设备。 |

**示例：**

```js
has.getBluetoothAdapterState({
  success: () => {
    console.info('getBluetoothAdapterState success');
  },
  fail: (err) => {
    console.error('getBluetoothAdapterState fail', err);
  },
  complete: (res) => {
    console.info('getBluetoothAdapterState complete', res);
  }
});
```
