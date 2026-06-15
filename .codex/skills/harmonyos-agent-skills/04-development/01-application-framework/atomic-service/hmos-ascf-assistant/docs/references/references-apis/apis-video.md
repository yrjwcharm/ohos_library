# 视频

## has.chooseMedia

has.chooseMedia(Object object)

拍摄或从手机相册中选择图片或视频。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| count | number | 9 | 否 | 最多可以选择的图片张数，最大不能超过20。 |
| mediaType | Array&lt;string&gt; | ['image', 'video'] | 否 | 文件类型。<br/>image ：只能拍摄图片或从相册选择图片。<br/>video：只能拍摄视频或从相册选择视频。<br/>mix：可同时选择图片和视频。 |
| sizeType | Array&lt;string&gt; | ['original', 'compressed'] | 否 | 所选的图片的尺寸。<br/>original：原图。<br/>compressed：压缩图。 |
| sourceType | Array&lt;string&gt;| ['album', 'camera'] | 否 | 选择图片的来源。<br/>album：从相册选图。<br/>camera：使用相机拍摄。 |
| maxDuration | number | 10 | 否 | 拍摄视频最长拍摄时间，单位秒。时间范围为 3s 至 60s 之间。仅在sourceType为camera时生效。 |
| camera | string | 'back' | 否 | 仅在sourceType为camera时生效，使用前置或后置摄像头。仅允许：<br/>back：后置摄像头。<br/>front：前置摄像头。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型                  | 描述 |
| -------- |---------------------| -------- |
| tempFiles | Array&lt;Object&gt; | 图片的本地临时文件列表。 |
| type | string              | 文件类型，有效值有image 、video、mix。 |

**tempFiles：**

| 属性 | 类型 | 描述 |
| -------- | -------- | -------- |
| tempFilePath | string | 本地临时文件路径（本地路径）。 |
| size | number | 本地临时文件大小，单位B。 |
| duration | number | 视频的时间长度，单位毫秒。 |
| height | number | 视频的高度。 |
| width | number | 视频的宽度。 |
| thumbTempFilePath | string | 视频缩略图临时文件路径。 |
| fileType | string | 文件类型。<br/>image：图片。<br/>video：视频。 |

**示例：**

```js
has.chooseMedia({
  count: 2,
  mediaType: ['image', 'video'],
  sourceType: ['album', 'camera'],
  maxDuration: 10,
  sizeType: ['original', 'compressed'],
  camera: 'front',
  success: (res) => {
    console.info('chooseMedia success', res);
  },
  fail: (err) => {
    console.error('chooseMedia fail', err);
  },
  complete: (res) => {
    console.info('chooseMedia completed', res);
  }
});
```

## has.createVideoContext

has.createVideoContext(String id): VideoContext

创建[video](../references-components/components-video.md)上下文VideoContext对象。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| id | string | 是 | video组件的id。 |
| this | Object | 否 | 在自定义组件下，通过当前组件实例的this，来操作组件内video组件。<br/>**起始版本：** 1.0.16 |

**返回值：**

返回[VideoContext](#videocontext)对象。

**示例：**

```js
let videoContext = has.createVideoContext('myVideo');
```

## VideoContext

### VideoContext.play

VideoContext.play()

播放视频。

**起始版本：** 1.0.0

**示例：**

```js
const videoContext = has.createVideoContext('myVideo');
videoContext.play();
```

### VideoContext.pause

VideoContext.pause()

暂停播放视频。

**起始版本：** 1.0.0

**示例：**

```js
const videoContext = has.createVideoContext('myVideo');
videoContext.pause();
```

### VideoContext.stop

VideoContext.stop()

停止播放视频。

**起始版本：** 1.0.4

**示例：**

```js
const videoContext = has.createVideoContext('myVideo');
videoContext.stop();
```

### VideoContext.seek

VideoContext.seek(number position)

视频跳转到指定位置。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| position | number | 是 | 跳转到的位置，单位s。 |

**示例：**

```js
const videoContext = has.createVideoContext('myVideo');
videoContext.seek(5);
```

### VideoContext.playbackRate

VideoContext.playbackRate(number rate)

设置视频倍速播放。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| rate | number | 是 | 播放倍速。支持的播放倍速有：0.125、0.25、0.5、0.75、1、1.25、1.5、1.75、2，部分投屏设备不支持全量的播放倍速。 |

**示例：**

```js
const videoContext = has.createVideoContext('myVideo');
videoContext.playbackRate(0.5);
```

### VideoContext.requestFullScreen

VideoContext.requestFullScreen(Object object)

进入全屏。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| direction | number | 否 | 设置全屏时视频的方向，不指定则根据宽高比自动判断。<br/>0：正常竖向。<br/>90：屏幕逆时针90度。<br/>-90：屏幕顺时针90度。<br/>**起始版本：** 1.0.16 |

**示例：**

```js
const videoContext = has.createVideoContext('myVideo');
videoContext.requestFullScreen({
  direction: 0
});
```

### VideoContext.exitFullScreen

VideoContext.exitFullScreen()

退出全屏。

**起始版本：** 1.0.4

**示例：**

```js
const videoContext = has.createVideoContext('myVideo');
videoContext.exitFullScreen();
```

### VideoContext.requestBackgroundPlayback

VideoContext.requestBackgroundPlayback()

进入后台音频播放模式。

**起始版本：** 1.0.16

**需要权限：** 开启后台音频播放，需要如下配置：

- 在module.json5中声明**ohos.permission.KEEP_BACKGROUND_RUNNING**权限。
- 在module.json5中声明**backgroundModes**配置项。  

  ```json
  "module": {
    "abilities": [
      {
        "backgroundModes": [
          "audioPlayback"
        ]
      }
    ]
  }
  ```

- 在[app.json](../references-framework/appjson-global-config.md)中配置**requiredBackgroundModes**属性。  

  ```json
  "requiredBackgroundModes": ["audio"]
  ```

**示例：**

```js
const videoContext = has.createVideoContext('myVideo');
videoContext.requestBackgroundPlayback();
```

### VideoContext.exitBackgroundPlayback

VideoContext.exitBackgroundPlayback()

退出后台音频播放模式。

**起始版本：** 1.0.16

**示例：**

```js
const videoContext = has.createVideoContext('myVideo');
videoContext.exitBackgroundPlayback();
```

## has.saveVideoToPhotosAlbum

has.saveVideoToPhotosAlbum(Object object)

保存视频到系统相册。

**起始版本：** 1.0.4

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| filePath | string | 是 | 视频文件路径，可以是临时文件路径，也可以是永久文件路径（本地路径）。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.saveVideoToPhotosAlbum({
  filePath: 'internal://tmp/xxx.mp4', // 此处仅为样例，请开发者更换为可用视频资源地址。
  success: () => {
    console.info('saveVideoToPhotosAlbum success');
  },
  fail: (err) => {
    console.error('saveVideoToPhotosAlbum fail', err);
  },
  complete: (res) => {
    console.info('saveVideoToPhotosAlbum complete', res);
  }
});
```

## has.getVideoInfo

has.getVideoInfo(Object object)

获取视频详细信息。

**起始版本：** 1.0.4

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| src | string | 是 | 视频文件路径，可以是临时文件路径也可以是永久文件路径 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| orientation | string | 画面方向，返回以下值：<br/>up：默认。<br/>down：180度旋转。<br/>left：逆时针旋转90度。<br/>right：顺时针旋转90度。 |
| type | string | 视频格式。 |
| size | number | 视频大小，单位kB。 |
| duration | number | 视频的时长。 |
| height | number | 视频的高度，单位px。 |
| width | number | 视频的宽度，单位px。 |

**示例：**

```js
has.getVideoInfo({
  src: 'internal://tmp/xxx.mp4', // 此处仅为样例，请开发者更换为可用视频资源地址。
  success: (res) => {
    console.info('getVideoInfo success', res);
  },
  fail: (err) => {
    console.error('getVideoInfo fail', err);
  },
  complete: (res) => {
    console.info('getVideoInfo complete', res);
  }
});
```

## has.chooseVideo

has.chooseVideo(Object object)

拍摄视频或从手机相册中选视频。

**起始版本：** 1.0.4

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| sourceType | Array&lt;string&gt; | ['album', 'camera'] | 否 | 视频选择的来源。<br/>album：从相册选择视频。<br/>camera：使用相机拍摄视频。 |
| maxDuration | number | 60 | 否 | 拍摄视频最长拍摄时间，单位秒。时间范围为3s至60s之间。仅在sourceType为camera时生效。 |
| camera | string | 'back' | 否 | 仅在sourceType为camera时生效，使用前置或后置摄像头。仅允许：<br/>back：后置摄像头。<br/>front：前置摄像头。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| tempFilePath | string | 选定视频的临时文件路径（本地路径）。 |
| duration | number | 选定视频的时间长度，单位毫秒。 |
| size | number | 选定视频的数据量大小。 |
| height | number | 返回选定视频的高度。 |
| width | number | 返回选定视频的宽度。 |

**示例：**

```js
has.chooseVideo({
  sourceType: ['album', 'camera'],
  maxDuration: 60,
  camera: 'back',
  success: (res) => {
    console.info('chooseVideo success', res);
  },
  fail: (err) => {
    console.error('chooseVideo fail', err);
  },
  complete: (res) => {
    console.info('chooseVideo complete', res);
  }
});
```
