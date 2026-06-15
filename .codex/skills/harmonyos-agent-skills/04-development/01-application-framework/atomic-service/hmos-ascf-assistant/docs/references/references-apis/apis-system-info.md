# 系统信息

## has.env

has.env: Object

环境变量。

**起始版本：** 1.0.0

**支持属性**：

| 名称             | 类型   | 默认值  | 必填 | 描述                               |
|-----------------|-------|------|-----|-----------------------------------|
| USER_DATA_PATH  | string | -    | 否   | 文件系统中用户目录路径（本地路径）。 |

**示例：**

```js
const path = has.env.USER_DATA_PATH;
```

## has.getSystemInfoSync

has.getSystemInfoSync(): Object

使用同步方式获取系统信息。

**起始版本：** 1.0.0

**返回值：**

返回系统信息的Object对象，包括以下字段。

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| brand | string | 手机品牌。 |
| model | string | 手机型号。 |
| screenWidth | number | 手机屏幕宽度，单位 px。 |
| screenHeight | number | 手机屏幕高度，单位 px。 |
| windowWidth | number | 手机可使用窗口宽度，单位 px。 |
| windowHeight | number | 手机可使用窗口高度，单位 px。 |
| statusBarHeight | number | 手机状态栏的高度，单位 px。 |
| safeArea | Object | 在竖屏正方向下的安全区域。部分机型没有安全区域概念，也不会返回safeArea字段，开发者需自行兼容。<br/>**起始版本：** 1.0.10 |
| language | string | 当前手机系统的语言，例如：zh_CN。 |
| SDKVersion | string | ASCF框架的版本号，SDKVersion是三位版本号，由[大版本].[小版本].[修订版本]三部分组成，例如：1.0.0。 |
| OSApiVersion | string | 系统API版本，例如在HarmonyOS 5.0，返回12。 |
| system | string | 系统版本。<br/>**起始版本：** 1.0.3 |
| platform | string | 客户端平台，取值为固定值'ohos'。<br/>**起始版本：** 1.0.9 |
| fontSizeSetting | number | 用户设置字体大小，单位 px。 |
| bluetoothEnabled | boolean | 手机蓝牙的系统权限开关。 |
| locationEnabled | boolean | 手机地理位置的系统开关。 |
| wifiEnabled | boolean | 手机Wi-Fi的系统开关。 |
| deviceOrientation | string | 设备方向。 |
| theme | string | 系统当前主题，取值为\`light\`或\`dark\`。 |
| indicatorHeight | number | 底部导航栏的高度，单位 px，可用于实现在沉浸式页面下的避让高度计算。<br/>**起始版本：** 1.0.3 |

**safeArea具体字段**：

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| left | number | 安全区域左上角横坐标。 |
| right | number | 安全区域右下角横坐标。 |
| top | number | 安全区域左上角纵坐标。 |
| bottom | number | 安全区域右下角纵坐标。 |
| width | number | 安全区域的宽度，单位逻辑像素。 |
| height | number | 安全区域的高度，单位逻辑像素。 |

**示例：**

```js
const sysInfo = has.getSystemInfoSync();
console.info(sysInfo.brand);
console.info(sysInfo.windowWidth);
console.info(sysInfo.windowHeight);
console.info(sysInfo.statusBarHeight);
```

## has.getSystemInfo

has.getSystemInfo(Object object)

使用异步方式获取系统信息。

**起始版本：** 1.0.0

**参数**：

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。<br/>函数本身无返回值，调用成功情况下 success 和 complete 的回调参数请参见“[has.getSystemInfoSync](#hasgetsysteminfosync)的返回值”。 |
| fail | function | 否 | 接口调用失败的回调函数。<br/>回调失败的情况下fail和complete的回调参数只有errMsg字段。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.getSystemInfo({
  success: (res) => {
    console.info(res.brand);
    console.info(res.windowWidth);
    console.info(res.windowHeight);
    console.info(res.statusBarHeight);
  },
  fail: (err) => {
    console.error('get system info fail', err);
  },
  complete: (res) => {
    console.info('get system info complete', res);
  }
});
```

## has.getWindowInfo

has.getWindowInfo(): Object

使用同步方式获取窗口信息。

**起始版本：** 1.0.12

**返回值：**

返回窗口信息的Object对象，包括以下字段。

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| pixelRatio | number | 设备像素比。 |
| screenWidth | number | 手机屏幕宽度，单位px。 |
| screenHeight | number | 手机屏幕高度，单位 px。 |
| windowWidth | number | 可使用窗口宽度，单位px。 |
| windowHeight | number | 可使用窗口高度，单位px。 |
| statusBarHeight | number | 状态栏的高度，单位px。 |
| safeArea | Object | 在竖屏正方向下的安全区域。部分机型没有安全区域概念，也不会返回safeArea字段，开发者需自行兼容。 |
| screenTop | number | 窗口上边缘的y值，单位px。 |

**safeArea具体字段：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| left | number | 安全区域左上角横坐标。 |
| right | number | 安全区域右下角横坐标。 |
| top | number | 安全区域左上角纵坐标。 |
| bottom | number | 安全区域右下角纵坐标。 |
| width | number | 安全区域的宽度，单位逻辑像素。 |
| height | number | 安全区域的高度，单位逻辑像素。 |

**示例：**

```js
const windowInfo = has.getWindowInfo();
console.info(windowInfo.pixelRatio);
console.info(windowInfo.screenWidth);
console.info(windowInfo.screenHeight);
console.info(windowInfo.windowWidth);
console.info(windowInfo.windowHeight);
console.info(windowInfo.statusBarHeight);
console.info(windowInfo.safeArea);
console.info(windowInfo.screenTop);
```

## has.getSystemSetting

has.getSystemSetting(): Object

使用同步方式获取设备设置信息。

**起始版本：** 1.0.12

**返回值：**

返回设备设置信息的Object对象，包括以下字段。

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| bluetoothEnabled | boolean | 蓝牙的系统开关。 |
| locationEnabled | boolean | 地理位置的系统开关。 |
| wifiEnabled | boolean | Wi-Fi 的系统开关。 |
| deviceOrientation | string | 设备方向。<br/>合法值：<br/>portrait：竖屏。<br/>landscape ：横屏。 |

**示例：**

```js
const systemSetting = has.getSystemSetting();
console.info(systemSetting.bluetoothEnabled);
console.info(systemSetting.deviceOrientation);
console.info(systemSetting.locationEnabled);
console.info(systemSetting.wifiEnabled);
```

## has.getDeviceInfo

has.getDeviceInfo(): Object

使用同步方式获取设备基础信息。

**起始版本：** 1.0.12

**返回值：**

返回设备基础信息的Object对象，包括以下字段。

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| brand | string | 设备品牌。 |
| model | string | 设备型号。 |
| system | string | 操作系统及版本。 |
| platform | string | 客户端平台。 |
| memorySize | string | 设备内存大小，单位为 MB。 |

**示例：**

```js
const deviceInfo = has.getDeviceInfo();

console.info(deviceInfo.brand);
console.info(deviceInfo.model);
console.info(deviceInfo.platform);
console.info(deviceInfo.system);
```
