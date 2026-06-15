# 授权


部分接口在使用之前，需要经过用户授权同意，按照使用范围，这些接口被分成多个scope。用户按scope范围进行授权，此时，该scope对应的所有接口均可以被调用。


在调用这类接口前，需要在项目的配置文件中，逐个声明需要的权限，否则应用将无法获取授权，导致接口调用失败。声明文件中的字段说明及样例可查阅：[在配置文件中声明权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/declare-permissions#%E5%9C%A8%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E4%B8%AD%E5%A3%B0%E6%98%8E%E6%9D%83%E9%99%90)。


开发者在对应业务功能执行前，必须先向用户发起授权申请。一旦用户明确同意或拒绝过授权，其授权关系会记录在后台，直到用户主动删除元服务。


此类接口调用时，可能出现以下情况：


- 如果用户未接受或拒绝过此权限的授权申请，将不会出现弹窗。

- 如果用户已授权，可以直接调用接口。

- 如果用户已拒绝授权，则不会出现弹窗，而是直接进入接口fail回调。请开发者兼容用户拒绝授权的场景。


> **注意**
> 
> 授权弹窗会展示元服务在元服务用户隐私保护指引中填写的说明，请按照[要求](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/declare-permissions#%E6%9D%83%E9%99%90%E4%BD%BF%E7%94%A8%E7%90%86%E7%94%B1%E7%9A%84%E6%96%87%E6%A1%88%E5%86%85%E5%AE%B9%E8%A7%84%E8%8C%83)填写。


## 申请权限的方式


### 引导用户在“设置”授权

用户可以在元服务设置界面（「右上角」 - 「设置」 - 「管理」）中控制对该元服务的授权状态。

开发者可以调用 [has.openSetting](../references/references-apis/apis-setting.md#hasopensetting) 打开设置界面，引导用户开启授权。

```js
has.openSetting({
  success: (res) => {
    console.info('openSetting success', res);
  },
  fail: (err) => {
    console.error('openSetting fail', err);
  },
  complete: (res) => {
    console.info('openSetting complete', res);
  }
});
```


### 发起授权请求

开发者在调用需授权API之前，必须先 [has.authorize](../references/references-apis/apis-authorization.md#hasauthorize)，向用户发起授权请求。

```js
has.authorize({
  scope: 'scope.userLocation',
  success: (res) => {
    console.info('authorize success', res);
  },
  fail: (err) => {
    console.error('authorize fail', err);
  },
  complete: (res) => {
    console.info('authorize complete', res);
  }
});
```


## scope 列表

当前发起authorize请求前，开发者还需要在应用配置文件中声明所需要的HarmonyOS系统的权限，具体可参考[声明权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/declare-permissions)。

| **scope** | **对应接口** | **描述** | 所需权限 |
| -------- | -------- | -------- | -------- |
| scope.userLocation | [has.getLocation](../references/references-apis/apis-location.md#hasgetlocation)<br/>[MapContext.moveToLocation](../references/references-apis/apis-map.md#mapcontextmovetolocation)<br/>[has.onWifiConnected](../references/references-apis/apis-wifi.md#hasonwificonnected)<br/>[has.getWifiList](../references/references-apis/apis-wifi.md#hasgetwifilist)<br/>[has.getConnectedWifi](../references/references-apis/apis-wifi.md#hasgetconnectedwifi)<br/>[has.connectWifi](../references/references-apis/apis-wifi.md#hasconnectwifi) | 精确地理位置 | ohos.permission.LOCATION<br/>ohos.permission.APPROXIMATELY_LOCATION |
| scope.userFuzzyLocation | [has.getFuzzyLocation](../references/references-apis/apis-location.md#hasgetfuzzylocation)<br/>[has.startLocationUpdate](../references/references-apis/apis-location.md#hasstartlocationupdate)<br/>[has.startLocationUpdateBackground](../references/references-apis/apis-location.md#hasstartlocationupdatebackground) | 模糊地理位置 | ohos.permission.APPROXIMATELY_LOCATION |
| scope.camera | [camera](../references/references-components/components-camera.md)组件<br/>[CameraContext.takePhoto](../references/references-apis/apis-camera.md#cameracontexttakephoto)<br/>[CameraContext.startRecord](../references/references-apis/apis-camera.md#cameracontextstartrecord)<br/>[has.startLivenessDetection](../references/references-apis/apis-ai-face-liveness-detection.md#hasstartlivenessdetection) | 摄像头 | ohos.permission.CAMERA |
| scope.addPhoneCalendar | [has.addPhoneCalendar](../references/references-apis/apis-calendar.md#hasaddphonecalendar)<br/>[has.addPhoneRepeatCalendar](../references/references-apis/apis-calendar.md#hasaddphonerepeatcalendar) | 添加日历 | ohos.permission.READ_CALENDAR<br/>ohos.permission.WRITE_CALENDAR |
| scope.bluetooth | [蓝牙-通用](../references/references-apis/apis-bluetooth.md)下的所有接口<br/>[蓝牙-低功耗中心设备](../references/references-apis/apis-ble.md)下的所有接口 | 蓝牙 | ohos.permission.ACCESS_BLUETOOTH |
| scope.record | [camera](../references/references-components/components-camera.md)组件<br/>[CameraContext.startRecord](../references/references-apis/apis-camera.md#cameracontextstartrecord)<br/>[CameraContext.takePhoto](../references/references-apis/apis-camera.md#cameracontexttakephoto)<br/>[has.startRecord](../references/references-apis/apis-record.md#hasstartrecord)<br/>[RecorderManager.start](../references/references-apis/apis-record.md#recordermanagerstart)<br/>[RecorderManager.pause](../references/references-apis/apis-record.md#recordermanagerpause)<br/>[RecorderManager.resume](../references/references-apis/apis-record.md#recordermanagerresume)<br/>[RecorderManager.stop](../references/references-apis/apis-record.md#recordermanagerstop) | 麦克风 | ohos.permission.MICROPHONE |
