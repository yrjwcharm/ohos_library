# 相机

## has.createCameraContext

has.createCameraContext(): CameraContext

创建[camera](../references-components/components-camera.md)上下文CameraContext对象。

**起始版本：** 1.0.4

**返回值：**

返回[CameraContext](#cameracontext)对象。

**示例：**

```js
const cameraContext = has.createCameraContext();
```

## CameraContext

camera上下文对象。

**起始版本：** 1.0.4

### CameraContext.startRecord

CameraContext.startRecord(Object object)

开始录像。

**起始版本：** 1.0.4

**需要权限：**

1. 在module.json5中声明**ohos.permission.CAMERA**、**ohos.permission.MICROPHONE**。

2. 需要用户授权 **[scope.camera](../../guides/develop-authorization.md#scope-列表)** 权限，录像场景还需授权 **[scope.record](../../guides/develop-authorization.md#scope-列表)** 权限。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述                                   |
| -------- | -------- | -------- | -------- |--------------------------------------|
| timeoutCallback | function | - | 否 | 超过录制时长上限时会结束录像并触发此回调，录像异常退出时也会触发此回调。 |
| timeout | number | 30 | 否 | 录制时长上限，单位为秒，最长不能超过5分钟。               |
| success | function | - | 否 | 接口调用成功的回调函数。                         |
| fail | function | - | 否 | 接口调用失败的回调函数。                         |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。            |

**timeoutCallback返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| tempThumbPath | string | 封面图片文件的临时路径（本地路径）。 |
| tempVideoPath | string | 视频文件的临时路径（本地路径）。 |

**示例：**

```js
const cameraContext = has.createCameraContext();
cameraContext.startRecord({
  timeoutCallback: (res) => {
    console.info('startRecord timeoutCallback', res);
  },
  timeout: 20,
  success: () => {
    console.info('startRecord success');
  },
  fail: (err) => {
    console.error('startRecord fail', err);
  },
  complete: (res) => {
    console.info('startRecord complete', res);
  }
});
```

### CameraContext.stopRecord

CameraContext.stopRecord(Object object)

结束录像。

**起始版本：** 1.0.4

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| tempThumbPath | string | 封面图片文件的临时路径（本地路径）。 |
| tempVideoPath | string | 视频文件的临时路径（本地路径）。 |

**示例：**

```js
const cameraContext = has.createCameraContext();
cameraContext.stopRecord({
  success: (res) => {
    console.info('stopRecord success', res);
  },
  fail: (err) => {
    console.error('stopRecord fail', err);
  },
  complete: (res) => {
    console.info('stopRecord complete', res);
  }
});
```

### CameraContext.takePhoto

CameraContext.takePhoto(Object object)

拍摄照片。

**起始版本：** 1.0.4

**需要权限：** 

1. 在module.json5中声明ohos.permission.CAMERA、ohos.permission.MICROPHONE。

2. 需要用户授权 **[scope.camera](../../guides/develop-authorization.md#scope-列表)** 权限，录像场景还需授权 **[scope.record](../../guides/develop-authorization.md#scope-列表)** 权限。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| quality | string | normal | 否 | 成像质量。<br/>high：高质量<br/>normal：普通质量<br/>low：低质量 |
| selfieMirror | boolean | true | 否 | 是否开启镜像。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| tempImagePath | string | 照片文件的临时路径（本地路径）。 |

**示例：**

```js
const cameraContext = has.createCameraContext();
cameraContext.takePhoto({
  quality: 'high',
  selfieMirror: false,
  success: (res) => {
    console.info('takePhoto success', res);
  },
  fail: (err) => {
    console.error('takePhoto fail', err);
  },
  complete: (res) => {
    console.info('takePhoto complete', res);
  }
});
```
