# 背景音频

## has.playBackgroundAudio

has.playBackgroundAudio(Object object)

使用后台播放器播放音乐。

返回桌面，仍保持播放；当遇到其他应用/元服务的音视频源，将暂停播放原有播放的音视频源。

**起始版本：** 1.0.9

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

**参数：**

参数为Object对象，包括以下字段。

| 属性 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| dataUrl | string | 是 | 音乐链接，目前支持的格式有 m4a、aac、mp3、ogg、wav、flac、amr，支持网络音频链接和本地音频文件路径（internal://开头）。 |
| title | string | 否 | 音乐标题。 |
| coverImgUrl | string | 否 | 封面URL。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.playBackgroundAudio({
  dataUrl: 'https://www.example.com/test.mp3', // 此处仅为样例，请开发者更换为可用的网址
  title: '音乐标题',
  coverImgUrl: 'https://www.example.com/test.png', // 此处仅为样例，请开发者更换为可用的网址
  success: () => {
    console.info('playBackgroundAudio success');
  },
  fail: (err) => {
    console.error('playBackgroundAudio fail', err);
  },
  complete: (res) => {
    console.info('playBackgroundAudio complete', res);
  }
});
```

## has.pauseBackgroundAudio

has.pauseBackgroundAudio(Object object)

暂停播放音乐。

**起始版本：** 1.0.9

**参数：**

参数为Object对象，包括以下字段。

| 属性 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.pauseBackgroundAudio({
  success: () => {
    console.info('pauseBackgroundAudio success');
  },
  fail: (err) => {
    console.error('pauseBackgroundAudio fail', err);
  },
  complete: (res) => {
    console.info('pauseBackgroundAudio complete', res);
  }
});
```

## has.seekBackgroundAudio

has.seekBackgroundAudio(Object object)

控制音乐播放进度。

**起始版本：** 1.0.9

**参数：**

参数为Object对象，包括以下字段。

| 属性 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| position | number | 是 | 音乐跳转的位置，单位 s。精确到小数点后 3 位，支持 ms 级别精确度。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.seekBackgroundAudio({
  position: 30,
  success: () => {
    console.info('seekBackgroundAudio success');
  },
  fail: (err) => {
    console.error('seekBackgroundAudio fail', err);
  },
  complete: (res) => {
    console.info('seekBackgroundAudio complete', res);
  }
});
```

## has.stopBackgroundAudio

has.stopBackgroundAudio(Object object)

停止播放音乐。

**起始版本：** 1.0.9

**参数：**

参数为Object对象，包括以下字段。

| 属性 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.stopBackgroundAudio({
  success: () => {
    console.info('stopBackgroundAudio success');
  },
  fail: (err) => {
    console.error('stopBackgroundAudio fail', err);
  },
  complete: (res) => {
    console.info('stopBackgroundAudio complete', res);
  }
});
```

## has.getBackgroundAudioPlayerState

has.getBackgroundAudioPlayerState(Object object)

获取后台音乐播放状态。

**起始版本：** 1.0.9

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
| duration | number | 选定音频的长度，单位为秒，只有在音乐播放中时返回。 |
| currentPosition | number | 选定音频的播放位置，单位为秒，只有在音乐播放中时返回。 |
| status | number | 播放状态。<br/>0：暂停。<br/>1：播放中。<br/>2：没有音乐播放。 |
| downloadPercent | number | 音频的下载进度百分比，只有在音乐播放中时返回。 |
| dataUrl | string | 歌曲数据链接，只有在音乐播放中时返回。 |

**示例：**

```js
has.getBackgroundAudioPlayerState({
  success: (res) => {
    console.info('getBackgroundAudioPlayerState success', res);
  },
  fail: (err) => {
    console.error('getBackgroundAudioPlayerState fail', err);
  },
  complete: (res) => {
    console.info('getBackgroundAudioPlayerState complete', res);
  }
});
```

## has.onBackgroundAudioPlay

has.onBackgroundAudioPlay(function callback)

监听音乐播放事件。

**起始版本：** 1.0.9

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 音乐播放事件的监听函数。 |

**示例：**

```js
has.onBackgroundAudioPlay(() => {
  console.info('onBackgroundAudioPlay callback triggered');
});
```

## has.onBackgroundAudioPause

has.onBackgroundAudioPause(function callback)

监听音乐暂停事件。

**起始版本：** 1.0.9

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 音乐暂停事件的监听函数。 |

**示例：**

```js
has.onBackgroundAudioPause(() => {
  console.info('onBackgroundAudioPause callback triggered');
});
```

## has.onBackgroundAudioStop

has.onBackgroundAudioStop(function callback)

监听音乐停止事件。

**起始版本：** 1.0.9

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 音乐停止事件的监听函数。 |

**示例：**

```js
has.onBackgroundAudioStop(() => {
  console.info('onBackgroundAudioStop callback triggered');
});
```

## has.getBackgroundAudioManager

has.getBackgroundAudioManager(): BackgroundAudioManager

获取全局唯一的背景音频管理器。支持后台音频播放，元服务切入后台，如果音频处于播放状态，可以继续播放。

**起始版本：** 1.0.9

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

**返回值：**

返回[BackgroundAudioManager](#backgroundaudiomanager)对象。

**示例：**

```js
const backgroundAudioManager = has.getBackgroundAudioManager();
```

## BackgroundAudioManager

背景音频管理器对象。

**起始版本：** 1.0.9

### 属性

| 属性名 | 类型 | 默认值 | 必填 | 只读 | 描述 |
| -------- | -------- | -------- | -------- | -------- | -------- |
| src | string | - | 是 | 否 | 音频源地址。当设置了新的 src 时，会自动开始播放。<br/>目前支持的格式有 m4a、aac、mp3、ogg、wav、flac、amr，支持网络音频链接和本地音频文件路径（internal://开头）。 |
| startTime | number | 0 | 否 | 否 | 音频开始播放的位置，单位为秒。 |
| title | string | 元服务名称 | 否 | 否 | 音频标题，用于系统音频播放器的标题，默认为元服务名称。 |
| epname | string | '' | 否 | 否 | 专辑名，用于系统音频播放器的副标题（歌手名为空时，才使用专辑名做副标题）。 |
| singer | string | '' | 否 | 否 | 歌手名，用于系统音频播放器的副标题。 |
| coverImgUrl | string | 元服务图标 | 否 | 否 | 封面图URL，用于系统音频播放器的背景图，默认为元服务图标。 |
| webUrl | string | '' | 否 | 否 | 页面链接。 |
| protocol | string | http | 否 | 否 | 音频协议。默认值为 http，设置HLS可以支持播放HLS协议的直播音频。 |
| playbackRate | number | 1 | 否 | 否 | 播放速度。支持的播放速度有：0.125、0.25、0.5、0.75、1、1.25、1.5、1.75、2。 |
| duration | number | - | 否 | 是 | 当前音频总时长，单位为秒。 |
| currentTime | number | - | 否 | 是 | 当前音频的播放位置，单位为秒。 |
| paused | boolean | - | 否 | 是 | 当前音频是否暂停或停止。 |
| buffered | number | - | 否 | 是 | 当前音频已缓冲的时长，单位为秒。 |

### BackgroundAudioManager.play

BackgroundAudioManager.play(): void

播放音乐。

**起始版本：** 1.0.9

**示例：**

```js
const backgroundAudioManager = has.getBackgroundAudioManager();
backgroundAudioManager.title = '标题';
backgroundAudioManager.src = 'https://www.example.com/test.mp3'; // 此处仅为样例，请开发者更换为可用的网址
backgroundAudioManager.play();
```

### BackgroundAudioManager.pause

BackgroundAudioManager.pause(): void

暂停音乐。

**起始版本：** 1.0.9

**示例：**

```js
const backgroundAudioManager = has.getBackgroundAudioManager();
backgroundAudioManager.title = '标题';
backgroundAudioManager.src = 'https://www.example.com/test.mp3'; // 此处仅为样例，请开发者更换为可用的网址
backgroundAudioManager.pause();
```

### BackgroundAudioManager.seek

BackgroundAudioManager.seek(number currentTime): void

跳转到指定位置。

**起始版本：** 1.0.9

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| currentTime | number | 是 | 跳转的位置，单位 s。精确到小数点后 3 位，支持 ms 级别精确度。 |

**示例：**

```js
const backgroundAudioManager = has.getBackgroundAudioManager();
backgroundAudioManager.title = '标题';
backgroundAudioManager.src = 'https://www.example.com/test.mp3'; // 此处仅为样例，请开发者更换为可用的网址
backgroundAudioManager.seek(10.5);
```

### BackgroundAudioManager.stop

BackgroundAudioManager.stop(): void

停止音乐。

**起始版本：** 1.0.9

**示例：**

```js
const backgroundAudioManager = has.getBackgroundAudioManager();
backgroundAudioManager.title = '标题';
backgroundAudioManager.src = 'https://www.example.com/test.mp3'; // 此处仅为样例，请开发者更换为可用的网址
backgroundAudioManager.stop();
```

### BackgroundAudioManager.onPlay

BackgroundAudioManager.onPlay(function callback)

监听背景音频播放事件。

**起始版本：** 1.0.9

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 背景音频播放事件的监听函数。 |

**示例：**

```js
const backgroundAudioManager = has.getBackgroundAudioManager();
backgroundAudioManager.onPlay(() => {
  console.info('BackgroundAudioManager onPlay callback triggered');
});
```

### BackgroundAudioManager.offPlay

BackgroundAudioManager.offPlay(function callback)

取消监听背景音频播放事件。

**起始版本：** 1.0.9

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | **BackgroundAudioManager.onPlay**传入的监听函数，不传此参数则移除所有监听函数。 |

**示例：**

```js
const backgroundAudioManager = has.getBackgroundAudioManager();
backgroundAudioManager.offPlay();
```

### BackgroundAudioManager.onPause

BackgroundAudioManager.onPause(function callback)

监听背景音频暂停事件。

**起始版本：** 1.0.9

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 背景音频暂停事件的监听函数。 |

**示例：**

```js
const backgroundAudioManager = has.getBackgroundAudioManager();
backgroundAudioManager.onPause(() => {
  console.info('BackgroundAudioManager onPause callback triggered');
});
```

### BackgroundAudioManager.offPause

BackgroundAudioManager.offPause(function callback)

取消监听背景音频暂停事件。

**起始版本：** 1.0.9

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | **BackgroundAudioManager.onPause**传入的监听函数，不传此参数则移除所有监听函数。 |

**示例：**

```js
const backgroundAudioManager = has.getBackgroundAudioManager();
backgroundAudioManager.offPause();
```

### BackgroundAudioManager.onSeeking

BackgroundAudioManager.onSeeking(function callback)

监听背景音频开始跳转操作事件。

**起始版本：** 1.0.9

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 背景音频开始跳转操作事件的监听函数。 |

**示例：**

```js
const backgroundAudioManager = has.getBackgroundAudioManager();
backgroundAudioManager.onSeeking(() => {
  console.info('BackgroundAudioManager onSeeking callback triggered');
});
```

### BackgroundAudioManager.offSeeking

BackgroundAudioManager.offSeeking(function callback)

取消监听背景音频开始跳转操作事件。

**起始版本：** 1.0.9

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | **BackgroundAudioManager.onSeeking**传入的监听函数，不传此参数则移除所有监听函数。 |

**示例：**

```js
const backgroundAudioManager = has.getBackgroundAudioManager();
backgroundAudioManager.offSeeking();
```

### BackgroundAudioManager.onSeeked

BackgroundAudioManager.onSeeked(function callback)

监听背景音频完成跳转操作事件。

**起始版本：** 1.0.9

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 背景音频完成跳转操作事件的监听函数。 |

**示例：**

```js
const backgroundAudioManager = has.getBackgroundAudioManager();
backgroundAudioManager.onSeeked(() => {
  console.info('BackgroundAudioManager onSeeked callback triggered');
});
```

### BackgroundAudioManager.offSeeked

BackgroundAudioManager.offSeeked(function callback)

取消监听背景音频完成跳转操作事件。

**起始版本：** 1.0.9

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | **BackgroundAudioManager.onSeeked**传入的监听函数，不传此参数则移除所有监听函数。 |

**示例：**

```js
const backgroundAudioManager = has.getBackgroundAudioManager();
backgroundAudioManager.offSeeked();
```

### BackgroundAudioManager.onEnded

BackgroundAudioManager.onEnded(function callback)

监听背景音频自然播放结束事件。

**起始版本：** 1.0.9

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 背景音频自然播放结束事件的监听函数。 |

**示例：**

```js
const backgroundAudioManager = has.getBackgroundAudioManager();
backgroundAudioManager.onEnded(() => {
  console.info('BackgroundAudioManager onEnded callback triggered');
});
```

### BackgroundAudioManager.offEnded

BackgroundAudioManager.offEnded(function callback)

取消监听背景音频自然播放结束事件。

**起始版本：** 1.0.9

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | **BackgroundAudioManager.onEnded**传入的监听函数，不传此参数则移除所有监听函数。 |

**示例：**

```js
const backgroundAudioManager = has.getBackgroundAudioManager();
backgroundAudioManager.offEnded();
```

### BackgroundAudioManager.onStop

BackgroundAudioManager.onStop(function callback)

监听背景音频停止事件。

**起始版本：** 1.0.9

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 背景音频停止事件的监听函数。 |

**示例：**

```js
const backgroundAudioManager = has.getBackgroundAudioManager();
backgroundAudioManager.onStop(() => {
  console.info('BackgroundAudioManager onStop callback triggered');
});
```

### BackgroundAudioManager.offStop

BackgroundAudioManager.offStop(function callback)

取消监听背景音频停止事件。

**起始版本：** 1.0.9

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | **BackgroundAudioManager.onStop**传入的监听函数，不传此参数则移除所有监听函数。 |

**示例：**

```js
const backgroundAudioManager = has.getBackgroundAudioManager();
backgroundAudioManager.offStop();
```

### BackgroundAudioManager.onTimeUpdate

BackgroundAudioManager.onTimeUpdate(function callback)

监听背景音频播放进度更新事件。

**起始版本：** 1.0.9

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 背景音频播放进度更新事件的监听函数。 |

**callback返回值：**

返回number，代表当前背景音频播放的位置，单位秒，精确到小数点后3位。

**示例：**

```js
const backgroundAudioManager = has.getBackgroundAudioManager();
backgroundAudioManager.onTimeUpdate((currentTime) => {
  console.info('BackgroundAudioManager onTimeUpdate callback triggered', currentTime);
});
```

### BackgroundAudioManager.offTimeUpdate

BackgroundAudioManager.offTimeUpdate(function callback)

取消监听背景音频播放进度更新事件。

**起始版本：** 1.0.9

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | **BackgroundAudioManager.onTimeUpdate**传入的监听函数，不传此参数则移除所有监听函数。 |

**示例：**

```js
const backgroundAudioManager = has.getBackgroundAudioManager();
backgroundAudioManager.offTimeUpdate();
```

### BackgroundAudioManager.onError

BackgroundAudioManager.onError(function callback)

监听背景音频播放错误事件。

**起始版本：** 1.0.9

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 背景音频播放错误事件的监听函数。 |

**callback返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| errCode | number | 错误码。 |
| errMsg | string | 错误信息。 |

**示例：**

```js
const backgroundAudioManager = has.getBackgroundAudioManager();
backgroundAudioManager.onError((err) => {
  console.error('BackgroundAudioManager onError callback triggered', err);
});
```

### BackgroundAudioManager.offError

BackgroundAudioManager.offError(function callback)

取消监听背景音频播放错误事件。

**起始版本：** 1.0.9

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | **BackgroundAudioManager.onError**传入的监听函数，不传此参数则移除所有监听函数。 |

**示例：**

```js
const backgroundAudioManager = has.getBackgroundAudioManager();
backgroundAudioManager.offError();
```

### BackgroundAudioManager.onCanplay

BackgroundAudioManager.onCanplay(function callback)

监听背景音频进入可播放状态事件。

**起始版本：** 1.0.9

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 背景音频进入可播放状态事件的监听函数。 |

**示例：**

```js
const backgroundAudioManager = has.getBackgroundAudioManager();
backgroundAudioManager.onCanplay(() => {
  console.info('BackgroundAudioManager onCanplay callback triggered');
});
```

### BackgroundAudioManager.offCanplay

BackgroundAudioManager.offCanplay(function callback)

取消监听背景音频进入可播放状态事件。

**起始版本：** 1.0.9

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | **BackgroundAudioManager.onCanplay**传入的监听函数，不传此参数则移除所有监听函数。 |

**示例：**

```js
const backgroundAudioManager = has.getBackgroundAudioManager();
backgroundAudioManager.offCanplay();
```

### BackgroundAudioManager.onPrev

BackgroundAudioManager.onPrev(function callback)

监听用户在系统音乐播放面板点击上一曲事件。

**起始版本：** 1.0.9

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 用户在系统音乐播放面板点击上一曲事件的监听函数。 |

**示例：**

```js
const backgroundAudioManager = has.getBackgroundAudioManager();
backgroundAudioManager.onPrev(() => {
  console.info('BackgroundAudioManager onPrev callback triggered');
});
```

### BackgroundAudioManager.offPrev

BackgroundAudioManager.offPrev(function callback)

取消监听用户在系统音乐播放面板点击上一曲事件。

**起始版本：** 1.0.9

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | **BackgroundAudioManager.onPrev**传入的监听函数，不传此参数则移除所有监听函数。 |

**示例：**

```js
const backgroundAudioManager = has.getBackgroundAudioManager();
backgroundAudioManager.offPrev();
```

### BackgroundAudioManager.onNext

BackgroundAudioManager.onNext(function callback)

监听用户在系统音乐播放面板点击下一曲事件。

**起始版本：** 1.0.9

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 用户在系统音乐播放面板点击下一曲事件的监听函数。 |

**示例：**

```js
const backgroundAudioManager = has.getBackgroundAudioManager();
backgroundAudioManager.onNext(() => {
  console.info('BackgroundAudioManager onNext callback triggered');
});
```

### BackgroundAudioManager.offNext

BackgroundAudioManager.offNext(function callback)

取消监听用户在系统音乐播放面板点击下一曲事件。

**起始版本：** 1.0.9

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | **BackgroundAudioManager.onNext**传入的监听函数，不传此参数则移除所有监听函数。 |

**示例：**

```js
const backgroundAudioManager = has.getBackgroundAudioManager();
backgroundAudioManager.offNext();
```
