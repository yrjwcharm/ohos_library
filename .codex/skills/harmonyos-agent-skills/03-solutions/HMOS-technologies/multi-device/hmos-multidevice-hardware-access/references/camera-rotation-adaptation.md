# 相机旋转角度适配指南

来源：[华为开发者文档 - 适配相机旋转角度(ArkTS)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/camera-rotation)

## 目标

屏幕处于不同的屏幕状态时，原始图像需旋转不同的角度，以确保图像在合适的方向显示。本开发指导将指导开发者在预览、拍照、录像等不同场景下，如何适配相机的旋转角度。

## 概念速查

| 概念 | 说明 |
|------|------|
| `ImageRotation` | 旋转角度枚举：`ROTATION_0`（0°）/ `ROTATION_90`（90°）/ `ROTATION_180`（180°）/ `ROTATION_270`（270°） |
| `displayRotation × ImageRotation.ROTATION_90` | 屏幕旋转角度计算：`Display.rotation`（枚举值 0/1/2/3）乘以 `ROTATION_90` 得到实际角度 |
| `getPreviewRotation(imageRotation)` | 获取预览旋转角度，需在 `commitConfig` 之后调用 |
| `setPreviewRotation(previewRotation, isDisplayLocked)` | 设置预览旋转（位置参数）。`isDisplayLocked: false` 跟随窗口旋转；`true` 仅取相机镜头角度 |
| `getPhotoRotation(deviceDegree)` | 获取拍照旋转角度：后置 = 镜头安装角度 + 重力方向，前置 = 镜头安装角度 - 重力方向 |
| `getVideoRotation(deviceDegree)` | 获取录像旋转角度，规则同上，配合 `avRecorder.updateRotation()` 使用 |
| `deviceDegree` | 设备旋转角度，通过 `sensor.once(SensorId.GRAVITY)` 获取重力数据后，使用 `Decimal` 计算 |
| `display.on('change')` + `windowClass.on('windowSizeChange')` | 双监听模式：`display.on('change')` 感知旋转方向，`windowClass.on('windowSizeChange')` 感知尺寸变化 |
| `usePhysicalCameraOrientation` | 折叠屏设备上实现相机无损出图（无 FOV 损失），需先通过 `isPhysicalCameraOrientationVariable` 判断是否可变 |

## 使用场景

| 场景 | 触发条件 | 推荐用法 | 为什么要判断 | 不判断的风险 |
| --- | --- | --- | --- | --- |
| 预览旋转初始化 | 相机会话启动后 | `getPreviewRotation` + `setPreviewRotation` | 确保预览方向正确。 | 预览方向与设备持握方向不一致。 |
| 窗口旋转更新 | 设备旋转 | `display.on('change')` 回调中重新计算 | 旋转后需重新计算。 | 旋转后预览拉伸。 |
| Surface 宽高比 | 预览启动/旋转变化 | 按 `Display.rotation` 与 `cameraOrientation` 差值判断 | 0°/180° 和 90°/270° 规则不同。 | 画面压缩或拉伸。 |
| 拍照角度 | 用户点击拍照 | `getPhotoRotation(deviceDegree)` + `PhotoCaptureSetting.rotation` | 照片方向需与持握方向一致。 | 照片旋转 90°/180°/270°。 |
| 录像角度 | 开始录像 | `getVideoRotation(deviceDegree)` + `avRecorder.updateRotation` | 录像画面方向需正确。 | 录像画面方向错误。 |
| 自绘制预览 | ImageReceiver 二次处理 | 先旋转再镜像（前置） | 前置存在水平/垂直镜像差异。 | 前置预览方向异常。 |

## 官方 API

| API | 说明 | 来源模块 |
| --- | --- | --- |
| `previewOutput.getPreviewRotation(imageRotation)` | 获取预览旋转角度，需在 `commitConfig` 后调用。`imageRotation = displayRotation × ImageRotation.ROTATION_90` | `@kit.CameraKit` |
| `previewOutput.setPreviewRotation(previewRotation, isDisplayLocked)` | 设置预览旋转（位置参数）。`isDisplayLocked` 默认为 `false`：跟随窗口旋转；`true`：仅取相机镜头角度 | `@kit.CameraKit` |
| `photoOutput.getPhotoRotation(deviceDegree)` | 获取拍照旋转角度，需在 `commitConfig` 后调用 | `@kit.CameraKit` |
| `videoOutput.getVideoRotation(deviceDegree)` | 获取录像旋转角度，需在 `commitConfig` 后调用 | `@kit.CameraKit` |
| `avRecorder.updateRotation(videoRotation)` | 在 `AVRecorder.prepare` 后设置录像角度，需在 `prepared` 状态 | `@kit.MediaKit` |
| `display.getDefaultDisplaySync().rotation` | 获取屏幕旋转角度（枚举值 ×90° = 角度） | `@kit.ArkUI` |
| `display.on('change', callback)` / `display.off('change')` | 监听屏幕旋转变化 | `@kit.ArkUI` |
| `windowClass.on('windowSizeChange', callback)` | 监听窗口尺寸变化 | `@kit.ArkUI` |
| `sensor.once(sensor.SensorId.GRAVITY, callback)` | 单次获取重力数据，用于计算 `deviceDegree` | `@kit.SensorServiceKit` |
| `cameraInput.isPhysicalCameraOrientationVariable()` | 查询设备相机镜头安装角度是否可变 | `@kit.CameraKit` |
| `cameraInput.getPhysicalCameraOrientation()` | 获取设备当前折叠状态下真实的相机镜头安装角度 | `@kit.CameraKit` |
| `cameraInput.usePhysicalCameraOrientation(isUsed)` | 实现相机无损出图，避免 FOV 损失 | `@kit.CameraKit` |

## 创建会话

导入相机等相关模块，创建Session会话。相机使用预览等功能前，均需创建相机会话。

```typescript
import { camera } from '@kit.CameraKit';
import { BusinessError } from '@kit.BasicServicesKit';

function createPhotoSession(cameraManager: camera.CameraManager): camera.Session | undefined {
  let session: camera.Session | undefined = undefined;
  try {
    session = cameraManager.createSession(camera.SceneMode.NORMAL_PHOTO) as camera.PhotoSession;
  } catch (error) {
    let err = error as BusinessError;
    console.error(`Failed to create the session instance. error: ${err}`);
  }
  return session;
}

function createVideoSession(cameraManager: camera.CameraManager): camera.Session | undefined {
  let session: camera.Session | undefined = undefined;
  try {
    session = cameraManager.createSession(camera.SceneMode.NORMAL_VIDEO) as camera.VideoSession;
  } catch (error) {
    let err = error as BusinessError;
    console.error(`Failed to create the session instance. error: ${err}`);
  }
  return session;
}
```

## 预览

完成会话创建后，配置输出流。

### 获取预览旋转角度

调用 `PreviewOutput.getPreviewRotation` 获取预览旋转角度。`imageRotation` 参数：通过 `display.getDefaultDisplaySync()` 获取 Display 对象并读取其 `rotation` 属性值，乘以 `ImageRotation.ROTATION_90` 得到对应角度。

例：`Display.rotation = 1`，表示显示设备屏幕顺时针旋转为90°，则 `imageRotation` 填入 `1 × ImageRotation.ROTATION_90`。

该接口需要在 session 调用 `commitConfig` 完成配流后调用。

```typescript
import { display } from '@kit.ArkUI';

let initDisplayRotation = display.getDefaultDisplaySync().rotation;
let imageRotation = initDisplayRotation * camera.ImageRotation.ROTATION_90;

function getPreviewRotation(previewOutput: camera.PreviewOutput, imageRotation: camera.ImageRotation): camera.ImageRotation {
  let previewRotation: camera.ImageRotation = camera.ImageRotation.ROTATION_0;
  try {
    previewRotation = previewOutput.getPreviewRotation(imageRotation);
    console.info(`Preview rotation is: ${previewRotation}`);
  } catch (error) {
    let err = error as BusinessError;
    console.error(`The previewOutput.getPreviewRotation call failed. error code: ${err.code}`);
  }
  return previewRotation;
}
```

### 设置预览旋转角度

调用 `PreviewOutput.setPreviewRotation` 设置图像的预览旋转角度。该接口需要在 session 调用 `commitConfig` 完成配流后调用，如果多次调用，以最新调用设置的图像预览旋转角度为准。

- `previewRotation`：取 `getPreviewRotation` 的返回值。
- `isDisplayLocked`：可选入参，默认为 `false`。当设置为 `false`，预览旋转角度将根据相机镜头角度+屏幕显示旋转角度的值计算；当设置为 `true`，Surface 旋转锁定，旋转角度仅取相机镜头角度计算。

```typescript
function setPreviewRotation(previewOutput: camera.PreviewOutput, previewRotation: camera.ImageRotation, isDisplayLocked: boolean): void {
  try {
    previewOutput.setPreviewRotation(previewRotation, isDisplayLocked);
  } catch (error) {
    let err = error as BusinessError;
    console.error(`The previewOutput.setPreviewRotation call failed. error code: ${err.code}`);
  }
}
```

### 预览流旋转接口适配示例

在会话配置过程中调用预览旋转接口，即：使用 `commitConfig` 接口提交相关配置后调用，建议在 Start 起流前调用。

```typescript
// previewOutput是创建的预览输出
try {
  let initDisplayRotation = display.getDefaultDisplaySync().rotation;
  let initPreviewRotation = previewOutput.getPreviewRotation(initDisplayRotation * camera.ImageRotation.ROTATION_90);
  previewOutput.setPreviewRotation(initPreviewRotation, false);
} catch (error) {
  let err = error as BusinessError;
  console.error(`PreviewRotation call failed. error code: ${err.code}`);
}
```

### 监听窗口旋转

应用使用相机时，通过监听 Display 对象变化，感知窗口当前状态，如当前相机窗口发生旋转时，需对预览流进行角度修正。推荐在会话配置中完成调用预览旋转接口后，直接创建监听。

```typescript
import { display } from '@kit.ArkUI';

// previewOutput是创建的预览输出
display.off('change');
display.on('change', () => {
  try {
    let displayRotation = display.getDefaultDisplaySync().rotation;
    let imageRotation = displayRotation * camera.ImageRotation.ROTATION_90;
    let previewRotation = previewOutput.getPreviewRotation(imageRotation);
    previewOutput.setPreviewRotation(previewRotation, false);
  } catch (error) {
    let err = error as BusinessError;
    console.error(`display change PreviewRotation call failed. error code: ${err.code}`);
  }
});
```

## 拍照

完成会话创建后，配置输出流。

### 获取拍照旋转角度

调用 `PhotoOutput.getPhotoRotation` 获取拍照旋转角度。该接口需要在 session 调用 `commitConfig` 完成配流后调用。

`deviceDegree`：设备旋转角度，通过重力传感器计算得出，获取方式见计算设备旋转角度。

```typescript
function getPhotoRotation(photoOutput: camera.PhotoOutput, deviceDegree: number): camera.ImageRotation {
  let photoRotation: camera.ImageRotation = camera.ImageRotation.ROTATION_0;
  try {
    photoRotation = photoOutput.getPhotoRotation(deviceDegree);
    console.info(`Photo rotation is: ${photoRotation}`);
  } catch (error) {
    let err = error as BusinessError;
    console.error(`The photoOutput.getPhotoRotation call failed. error code: ${err.code}`);
  }
  return photoRotation;
}
```

应用将拍照角度写入 `PhotoCaptureSetting.rotation`。其余参数的配置及拍照，参考拍照开发指导。

## 录像

完成会话创建后，配置输出流。

### 获取录像旋转角度

调用 `VideoOutput.getVideoRotation` 获取录像的旋转角度。该接口需要在 session 调用 `commitConfig` 完成配流后调用。

`deviceDegree`：设备旋转角度，通过重力传感器计算得出，获取方式见计算设备旋转角度。

```typescript
function getVideoRotation(videoOutput: camera.VideoOutput, deviceDegree: number): camera.ImageRotation {
  let videoRotation: camera.ImageRotation = camera.ImageRotation.ROTATION_0;
  try {
    videoRotation = videoOutput.getVideoRotation(deviceDegree);
    console.info(`Video rotation is: ${videoRotation}`);
  } catch (error) {
    let err = error as BusinessError;
    console.error(`The videoOutput.getVideoRotation call failed. error code: ${err.code}`);
  }
  return videoRotation;
}
```

### 录像流旋转接口适配示例

在 `AVRecorder.prepare` 后使用 `updateRotation` 设置录像角度。

```typescript
import { camera } from '@kit.CameraKit';
import { media } from '@kit.MediaKit';
import { BusinessError } from '@kit.BasicServicesKit';

async function getVideoRotationAndUpdate(videoOutput: camera.VideoOutput, deviceDegree: number, avRecorder: media.AVRecorder) {
  let videoRotation: camera.ImageRotation = camera.ImageRotation.ROTATION_0;
  try {
    videoRotation = videoOutput.getVideoRotation(deviceDegree);
    console.info(`Video rotation is: ${videoRotation}`);
    if (avRecorder.state === 'prepared') {
      await avRecorder.updateRotation(videoRotation);
    }
  } catch (error) {
    let err = error as BusinessError;
    console.error(`getVideoRotationAndUpdate call failed. error code: ${err.code}`);
  }
}
```

## 计算设备旋转角度

通过调用 `sensor.once(SensorId.GRAVITY, callback)` 获取一次重力传感器在 x、y、z 三个方向上的数据，计算得出设备旋转角度 `deviceDegree`。

如果无法获得重力传感器数据，需要申请重力传感器权限 `ohos.permission.ACCELEROMETER`。权限申请参考声明权限，如何获取传感器数据参考传感器开发指导。

```typescript
import { Decimal } from '@kit.ArkTS';
import { sensor } from '@kit.SensorServiceKit';
import { BusinessError } from '@kit.BasicServicesKit';

let isSupported: boolean = false;
let getDeviceDegree: number = -1;

function getRealData(data: sensor.GravityResponse): number {
  let getDeviceDegree: number = 0;
  let x = data.x;
  let y = data.y;
  let z = data.z;
  if ((x * x + y * y) * 3 < z * z) {
    return getDeviceDegree;
  } else {
    try {
      let sd: Decimal = Decimal.atan2(y, -x);
      let sc: Decimal = Decimal.round(Number(sd) / 3.141592653589 * 180);
      getDeviceDegree = 90 - Number(sc);
      getDeviceDegree = getDeviceDegree >= 0 ? getDeviceDegree % 360 : getDeviceDegree % 360 + 360;
    } catch (error) {
      let err = error as BusinessError;
      console.error(`decimal failed, error: ${err.code}`);
    }
  }
  return getDeviceDegree;
}

async function getGravity(): Promise<number> {
  let data: sensor.Sensor[];
  try {
    data = await sensor.getSensorList();
  } catch (error) {
    let err = error as BusinessError;
    console.error(`getSensorList failed, error: ${err.code}`);
    return -1;
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i].sensorId === sensor.SensorId.GRAVITY) {
      isSupported = true;
      break;
    }
  }
  try {
    if (isSupported === true) {
      const promise: Promise<number> = new Promise((resolve) => {
        sensor.once(sensor.SensorId.GRAVITY, (data: sensor.GravityResponse) => {
          resolve(getRealData(data));
        });
      })
      return promise;
    } else {
      const promise: Promise<number> = new Promise((resolve) => {
        sensor.once(sensor.SensorId.ACCELEROMETER, (data: sensor.AccelerometerResponse) => {
          resolve(getRealData(data as sensor.GravityResponse));
        });
      })
      return promise;
    }
  } catch (error) {
    let err = error as BusinessError;
    console.error(`gePromise failed, error: ${err.code}`);
    return -1;
  }
}

async function getCurrentDeviceDegree(): Promise<number> {
  getDeviceDegree = await getGravity();
  return getDeviceDegree;
}
```

## 视频通话送远端场景

两个设备之间进行视频通话，存在设备间持握方向不一致问题，建议在本端将画面转正，再通过网络发送到对端，画面转正参考自绘制场景预览角度的归一化处理。

## 实现相机无损出图

在部分折叠屏设备上，不同折叠状态下的设备自然方向会发生改变，导致不同折叠状态下真实的相机镜头安装角度不同。为了屏蔽不同设备间的差异，系统会自动调整部分折叠状态下的相机采集图像方向和相机镜头安装角度，因此会存在视场角（FOV）损失，可能导致可见范围降低。可通过 `usePhysicalCameraOrientation` 接口实现相机无损出图。

### 使用方式

首先通过 `isPhysicalCameraOrientationVariable` 接口查询设备相机镜头安装角度是否可变：

- 当相机镜头安装角度不可变时，不同折叠状态下的相机出图均为无损出图。
- 当相机镜头安装角度可变时，需完成相机旋转适配后，通过 `getPhysicalCameraOrientation` 获取设备当前折叠状态下真实的相机镜头安装角度，并通过 `usePhysicalCameraOrientation` 实现无损出图。

推荐在 `createCameraInput` 后直接使用 `usePhysicalCameraOrientation` 接口。

```typescript
import { camera } from '@kit.CameraKit';

function enablePhysicalCameraOrientation(cameraInput: camera.CameraInput) {
  let isVarialbe: boolean = cameraInput.isPhysicalCameraOrientationVariable();

  if (isVarialbe) {
    let physicalOrientation: number = cameraInput.getPhysicalCameraOrientation();
    console.info(`physical Orientation is ${physicalOrientation}`);

    let isUsed: boolean = true;
    cameraInput.usePhysicalCameraOrientation(isUsed);
  }
}
```

## 指定XComponent的大小，防止旋转后图像拉伸变形

图像显示出现拉伸或压缩等变形，是因为图像分辨率与 XComponent 的宽高比不匹配。以应用层下发的 1920×1080(16:9) 为例，器件出图均是按照 4:3 比例出一张 RAW 图，在此基础上根据应用层下发的 16:9 比例进行裁切。因此，无论手机持握方向如何变化，应用层接收的数据始终是 16:9 比例的图片。

### 角度与布局关系示例

**后置相机，竖屏充电口向下：**
- 后置相机镜头角度 = 90°
- 屏幕旋转角度 = 0°（`Display.rotation = 0`）
- 图像预览旋转角度 = 0° + 90° = 90°
- 出图与最终成像有 90° 夹角，布局宽高与图像宽高交换。

**后置相机，横屏充电口向右：**
- 后置相机镜头角度 = 90°
- 屏幕旋转角度 = 270°（`Display.rotation = 3`）
- 图像预览旋转角度 = 270° + 90° = 360° = 0°
- 出图与最终成像有 0° 夹角，布局与图像宽高比一致。

当手机从竖屏转换为横屏时，图像始终保持 16:9 的输出比例，但镜头与屏幕显示方向之间的夹角从 90° 变为 0°。如果布局保持 9:16 不变，那么 16:9 的图像数据放置在 9:16 的空间内显示会导致图像形变。因此需根据角度调整布局宽高比。

### 实现方法

将 XComponent 的宽度和高度作为状态变量进行监听，通过 `windowClass.on('windowSizeChange')` 监听窗口的变化，根据屏幕旋转角度（`Display.rotation`）与相机镜头角度（`CameraDevice.cameraOrientation`）之间的角度差来确定布局的宽高比。通常建议在 `aboutToAppear` 中执行窗口变化的监听。

```typescript
import { bundleManager } from '@kit.AbilityKit';
import { display } from '@kit.ArkUI';
import { common } from '@kit.AbilityKit';
import { BusinessError, deviceInfo } from '@kit.BasicServicesKit';

let previewOutput: camera.PreviewOutput;
let cameraDevice: camera.CameraDevice;

@Entry
@Component
struct Index {
  @State mXComponentWidth: number = 1280;
  @State mXComponentHeight: number = 720;
  @State mRotate: number = 0;
  @State mConfigRatio: number = 16 / 9;
  private targetVersion: number = 0;
  private mWindowHeight = 0;
  private mWindowWidth = 0;

  private windowClass = (this.getUIContext().getHostContext() as common.UIAbilityContext).windowStage.getMainWindowSync();

  getBundleInfoForSelf() {
    let bundleFlags = bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION | bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_METADATA;
    try {
      bundleManager.getBundleInfoForSelf(bundleFlags).then((data) => {
        console.info(`getBundleInfoForSelf successfully. Data: ${data.targetVersion}`);
        this.targetVersion = data.targetVersion;
      }).catch((err: BusinessError) => {
        console.error(`getBundleInfoForSelf failed ${err}`);
      });
    } catch (err) {
      let message = (err as BusinessError).message;
      console.error(`getBundleInfoForSelf failed ${message}`);
    }
  }

  isIsolateForSpecialType(): boolean {
    return deviceInfo.deviceType == "tablet" && this.targetVersion <= 50000013;
  }

  aboutToAppear(): void {
    this.updateXComponentSize();
    this.getBundleInfoForSelf();
    this.windowClass.on('windowSizeChange', (size) => {
      this.mWindowWidth = size.width;
      this.mWindowHeight = size.height;
      this.updateXComponentSize();
    });
    let rotation: number = 0;
    try {
      rotation = display.getDefaultDisplaySync().rotation;
      this.mRotate = rotation * camera.ImageRotation.ROTATION_90;
    } catch (error) {
      const err = error as BusinessError;
      console.error(`Failed to get display rotation: ${err.code}, ${err.message}`);
      this.mRotate = 0;
    }
    display.on('change', () => {
      if (this.mRotate != rotation * camera.ImageRotation.ROTATION_90) {
        this.mRotate = rotation * camera.ImageRotation.ROTATION_90;
        this.updateXComponentSize();
        let imageRotation = this.getImageRotation();
        if (!imageRotation) {
          console.error(`current get image rotation is undefined`);
          return;
        }
        let previewRotation = previewOutput.getPreviewRotation(imageRotation);
        previewOutput.setPreviewRotation(previewRotation, false);
      }
    });
  }

  getImageRotation(): camera.ImageRotation | undefined {
    let displayRotation: number = 0;
    try {
      displayRotation = display.getDefaultDisplaySync().rotation
    } catch (error) {
      const err = error as BusinessError;
      console.error(`Failed to get display rotation: ${err.code}, ${err.message}`);
      return undefined;
    }
    let imageRotation = displayRotation * camera.ImageRotation.ROTATION_90;
    return imageRotation;
  }

  updateXComponentSize(): void {
    let angleDiff = (this.mRotate + cameraDevice?.cameraOrientation) % 360;
    if (this.isIsolateForSpecialType()) {
      if (angleDiff === 90 || angleDiff === 270) {
        this.mXComponentWidth = this.mConfigRatio * this.mWindowHeight;
        this.mXComponentHeight = this.mWindowHeight;
      } else {
        this.mXComponentWidth = this.mWindowWidth;
        this.mXComponentHeight = this.mConfigRatio * this.mWindowWidth;
      }
    } else {
      if (angleDiff === 90 || angleDiff === 270) {
        this.mXComponentWidth = this.mWindowWidth;
        this.mXComponentHeight = this.mConfigRatio * this.mWindowWidth;
      } else {
        this.mXComponentWidth = this.mConfigRatio * this.mWindowHeight;
        this.mXComponentHeight = this.mWindowHeight;
      }
    }
  }

  async aboutToDisAppear(): Promise<void> {
    display.off('change');
    this.windowClass.off('windowSizeChange');
  }

  build() {
    // 根据使用诉求补充界面处理逻辑。
  }
}
```

除了指定 XComponent 的宽高外，还可以通过设置 XComponent 的 `renderFit` 来实现图片的自适应大小显示、居中裁剪显示等效果。具体详情参考 RenderFit 介绍。

## 自绘制场景预览角度的归一化处理

在自绘制场景中，对于后置摄像头，可以通过调用 `getPreviewRotation` 获取旋转角度，将图像转正；对于前置摄像头，由于存在水平镜像和垂直镜像的差异，为了简化操作，需先对前置摄像头的图像角度进行归一化处理后，再将图像转正，并根据业务需求决定是否进行镜像处理。

### PixelMap 处理方式

```typescript
import { camera } from '@kit.CameraKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { image } from '@kit.ImageKit';
import { display } from '@kit.ArkUI';

let previewOutputReceiver: camera.PreviewOutput | undefined = undefined;
let curCameraPosition = camera.CameraPosition.CAMERA_POSITION_FRONT;

function onImageArrival(receiver: image.ImageReceiver): void {
  receiver.on('imageArrival', () => {
    receiver.readNextImage((err: BusinessError, nextImage: image.Image) => {
      if (err || nextImage === undefined) {
        console.error('readNextImage failed');
        return;
      }
      nextImage.getComponent(image.ComponentType.JPEG, async (err: BusinessError, imgComponent: image.Component) => {
        if (err || imgComponent === undefined) {
          console.error('getComponent failed');
        }

        if (imgComponent.byteBuffer) {
          let width = nextImage.size.width;
          let height = nextImage.size.height;
          let stride = imgComponent.rowStride;
          if (stride == width) {
            let pixelMap = await image.createPixelMap(imgComponent.byteBuffer, {
              size: { height: height, width: width },
              srcPixelFormat: image.PixelMapFormat.NV21,
            })
            updatePixelMap(pixelMap);
          } else {
            const dstBufferSize = width * height * 1.5
            const dstArr = new Uint8Array(dstBufferSize)
            for (let j = 0; j < height * 1.5; j++) {
              const srcBuf = new Uint8Array(imgComponent.byteBuffer, j * stride, width)
              dstArr.set(srcBuf, j * width)
            }
            let pixelMap = await image.createPixelMap(dstArr.buffer, {
              size: { height: height, width: width },
              srcPixelFormat: image.PixelMapFormat.NV21,
            });
            updatePixelMap(pixelMap);
          }
        } else {
          console.error('byteBuffer is null');
        }
        nextImage.release();
        console.info('image process done');
      })
    })
  })
}

async function updatePixelMap(pixelMap: image.PixelMap): Promise<void> {
  let rotation: number = 0;
  try {
    rotation = display.getDefaultDisplaySync().rotation * camera.ImageRotation.ROTATION_90;
  } catch (error) {
    const err = error as BusinessError;
    console.error(`Failed to get display rotation: ${err.code}, ${err.message}`);
    return;
  }
  let angle = previewOutputReceiver?.getPreviewRotation(rotation);
  if (angle === undefined) {
    return;
  }
  previewOutputReceiver?.setPreviewRotation(angle);
  if (curCameraPosition === camera.CameraPosition.CAMERA_POSITION_FRONT) {
    if (rotation === 90 || rotation === 270) {
      angle = (angle + 180) % 360;
    }
    await pixelMap.rotate(angle);
    await pixelMap.flip(true, false);
  } else {
    await pixelMap.rotate(angle);
  }
}
```

## 适配一多设备

为了适配一多设备，主要分为以下几步：

1. 根据屏幕比例选择合适的预览分辨率。
2. 根据确定的预览分辨率，通过宽/高得到新的比例。
3. 根据上一步的比例计算 XComponent 宽高（参考指定XComponent的大小，防止旋转后图像拉伸变形），将 `mConfigRatio` 应用于布局宽高的计算。

> 在适配折叠屏设备时，每次折叠屏镜头变化都需要重新获取屏幕比例。

```typescript
let mConfigRatio: number = 16 / 9;
let reConfigType: number = 720;
let previewProfileObj: camera.Profile = {
  format: 1003,
  size: {
    width: 1280,
    height: 720
  }
};

function getConfigRation(cameraDevice: camera.CameraDevice, cameraManager: camera.CameraManager): number {
  let previewProfile = getSurfaceSize(cameraDevice, mConfigRatio, cameraManager);
  if (previewProfile === undefined || previewProfile.size === undefined) {
    return 0;
  }
  mConfigRatio = previewProfile.size.width / previewProfile.size.height;
  return mConfigRatio;
}

function getSurfaceSize(cameraDevice: camera.CameraDevice, configRatio: number, cameraManager: camera.CameraManager): camera.Profile | undefined {
  console.info(`previewProfiles is ${configRatio}`);
  let cameraOutputCapability =
    cameraManager.getSupportedOutputCapability(cameraDevice, camera.SceneMode.NORMAL_PHOTO);
  return getPreviewProfile(cameraOutputCapability, configRatio);
}

function getPreviewProfile(cameraOutputCapability: camera.CameraOutputCapability, configRatio: number): camera.Profile | undefined {
  let previewProfiles = cameraOutputCapability.previewProfiles;
  if (previewProfiles.length < 1) {
    return undefined;
  }
  console.info(`previewProfiles this.foramt: ${previewProfileObj.format} configRatio = ${configRatio}`);
  let optimalSize: camera.Profile | undefined;
  let minDiff = Number.MAX_VALUE;
  for (let i = 0; i < previewProfiles.length; i++) {
    if (previewProfiles[i].format !== previewProfileObj.format) {
      continue;
    }
    let ratio = previewProfiles[i].size.width / previewProfiles[i].size.height;
    if (Math.abs(ratio - configRatio) > 0.2) continue;
    if (Math.abs(previewProfiles[i].size.height - reConfigType) < minDiff) {
      optimalSize = previewProfiles[i];
      minDiff = Math.abs(previewProfiles[i].size.height - reConfigType);
    }
  }

  if (optimalSize === undefined) {
    minDiff = Number.MAX_VALUE;
    for (let i = 0; i < previewProfiles.length; i++) {
      if (previewProfiles[i].format !== previewProfileObj.format) {
        continue;
      }
      if (Math.abs(previewProfiles[i].size.height - reConfigType) < minDiff) {
        optimalSize = previewProfiles[i];
        minDiff = Math.abs(previewProfiles[i].size.height - reConfigType);
      }
    }
  }
  return optimalSize;
}
```

## 拍照无法镜像

通过设置 `PhotoCaptureSetting` 中的 `mirror` 属性改变拍照镜像。

```typescript
let photoSettings: camera.PhotoCaptureSetting = {
  quality: camera.QualityLevel.QUALITY_LEVEL_HIGH,
  mirror: this.photoOutput?.isMirrorSupported()
};
this.photoRotation = getPhotoRotation(this.photoOutput!!, this.getDeviceDegree)
photoSettings.rotation = this.photoRotation
```

## 约束

- `getPreviewRotation` 必须在 `commitConfig` 之后调用。如果 `previewOutput` 未添加到 session 或已调用 `session.release`，会导致 `SERVICE_FATAL_ERROR`。
- `setPreviewRotation` 必须在 `commitConfig` 之后调用；多次调用以最新为准。
- `getPhotoRotation` 和 `getVideoRotation` 需在 `commitConfig` 之后调用。
- `isDisplayLocked: false`（默认）表示跟随窗口变化；`true` 表示 Surface 旋转锁定，旋转角度仅取相机镜头角度计算。
- 拍照/录像旋转角度：后置 `镜头安装角度 + 重力方向`，前置 `镜头安装角度 - 重力方向`。
- 录像使用 `avRecorder.updateRotation()` 需在 `AVRecorder.prepare` 后调用，且必须在 `prepared` 状态。
- 自绘制场景前置摄像头：推荐"先旋转再镜像"，需考虑水平镜像和垂直镜像的区别。前置摄像头在 `rotation === 90 || rotation === 270` 时需额外 +180° 归一化。
- 相机镜头安装角度不可变时，使用 `usePhysicalCameraOrientation` 将返回 `7400102` 错误码；未适配相机旋转时使用无损出图会导致预览、拍照、录像旋转异常。
- 平板设备且 API 版本 < 14（`targetVersion <= 50000013`）时，XComponent 宽高计算逻辑与常规逻辑相反。
- 需要重力传感器权限 `ohos.permission.ACCELEROMETER`。
- 术语统一：`Display.rotation × 90°` 为屏幕旋转角度；通过 `getPreviewRotation()` 获取预览旋转角度；通过 `getPhotoRotation()`/`getVideoRotation()` 获取拍照/录像旋转角度。详见术语基线文档。

## 决策规则

- **API 调用顺序**：`commitConfig` → `getPreviewRotation` → `setPreviewRotation` → `start`。获取和设置旋转角度必须在 `commitConfig` 之后、起流之前。
- **isDisplayLocked 选择**：默认 `false`（跟随窗口旋转，预览随设备方向自适应）；`true` 仅当需要锁定 Surface 旋转方向时使用（如横屏固定场景）。
- **前后置角度计算差异**：后置 = 镜头安装角度 + 重力方向；前置 = 镜头安装角度 - 重力方向。自绘制场景前置需先归一化（`rotation === 90 || rotation === 270` 时额外 +180°）再镜像。
- **双监听模式**：`display.on('change')` 负责感知旋转方向变化并重算角度；`windowClass.on('windowSizeChange')` 负责感知尺寸变化并重新计算 XComponent 宽高。
- **传感器降级**：优先使用 `SensorId.GRAVITY`；若不支持则降级到 `SensorId.ACCELEROMETER`（需申请 `ohos.permission.ACCELEROMETER` 权限）。
- **无损出图判断**：先调 `isPhysicalCameraOrientationVariable()`；若返回 `false` 则无需任何操作（已是无损）；若返回 `true` 则需调 `usePhysicalCameraOrientation(true)`。推荐在 `createCameraInput` 后直接调用。
- **XComponent 宽高计算**：根据 `(mRotate + cameraOrientation) % 360` 的角度差判断布局宽高比。平板且 API 版本 < 14（`targetVersion <= 50000013`）时，90°/270° 的宽高计算逻辑与常规相反。
- **录像旋转时机**：`avRecorder.updateRotation()` 必须在 `AVRecorder.prepare` 之后且状态为 `prepared` 时调用。

## 验证清单

- 四方向预览（0°/90°/180°/270°）方向正确，无拉伸。
- 四方向拍照方向与设备持握方向一致。
- 录像画面方向与录像时持握方向一致。
- 窗口旋转后 `display.on('change')` 正确触发，预览自动更新。
- 前后置相机切换后旋转角度正确。
- 折叠屏设备无损出图模式下预览、拍照、录像方向正确。
- 一多设备场景下不同屏幕比例均正常显示。

## 官方来源

- [适配相机旋转角度(ArkTS)（官方）](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/camera-rotation)
