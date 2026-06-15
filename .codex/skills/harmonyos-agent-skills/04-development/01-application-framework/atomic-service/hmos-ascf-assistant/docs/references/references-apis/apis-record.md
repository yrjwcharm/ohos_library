# 录音

## has.stopRecord

has.stopRecord(Object object)

停止录音。

**起始版本：** 1.0.14

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.stopRecord({
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

## has.startRecord

has.startRecord(Object object)

开始录音。当主动调用[has.stopRecord](#hasstoprecord)，或者录音超过1分钟时自动结束录音。

当用户离开元服务时，此接口无法调用。

**起始版本：** 1.0.14

**需要权限：**

1. 在module.json5中声明**ohos.permission.MICROPHONE**。

2. 在has.authorize中申请 [scope.record](../../guides/develop-authorization.md#scope-列表) 授权。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

Object类型，包括以下字段。

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| tempFilePath | string | 录音文件的临时路径 (本地路径)。 |

**示例：**

```js
has.startRecord({
  success: (res) => {
    console.info('startRecord success', res);
  },
  fail: (err) => {
    console.error('startRecord fail', err);
  },
  complete: (res) => {
    console.info('startRecord complete', res);
  }
});
```

## has.getRecorderManager

has.getRecorderManager(): RecorderManager

获取全局唯一的录音管理器[RecorderManager](#recordermanager)。

**起始版本：** 1.0.14

**返回值：**

返回[RecorderManager](#recordermanager)对象。

**示例：**

```js
const recorderManager = has.getRecorderManager();
```

## RecorderManager

全局唯一的录音管理器。

**起始版本：** 1.0.14

### RecorderManager.onError

RecorderManager.onError(function callback)

监听录音错误事件。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 录音错误事件的监听函数。 |

**callback参数：**

类型为Object对象，包括：

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| errMsg | string | 错误信息。 |

**示例：**

```js
const recordManager = has.getRecorderManager();
recordManager.onError((res) => {
  console.error('Recording onError res', res);
});
```

### RecorderManager.offError

RecorderManager.offError(function callback)

移除监听录音错误事件。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | RecorderManager.onError传入的监听函数，不传此参数则移除所有监听函数。 |

**示例：**

```js
const recordManager = has.getRecorderManager();
const callback = (res) => {
  console.info('Recording onError res', res);
}
recordManager.onError(callback);
recordManager.offError(callback);
```

### RecorderManager.onPause

RecorderManager.onPause(function callback)

监听录音暂停事件。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 录音暂停事件的监听函数。 |

**示例：**

```js
const recordManager = has.getRecorderManager();
recordManager.onPause((res) => {
  console.info('Recording onPause res', res);
});
```

### RecorderManager.offPause

RecorderManager.offPause(function callback)

移除录音暂停事件的监听函数。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | RecorderManager.onPause传入的监听函数，不传此参数则移除所有监听函数。 |

**示例：**

```js
const recordManager = has.getRecorderManager();
const callback = (res) => {
  console.info('Recording onPause res', res);
}
recordManager.onPause(callback);
recordManager.offPause(callback);
```

### RecorderManager.onResume

RecorderManager.onResume(function callback)

监听录音继续事件。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 录音继续事件的监听函数。 |

**示例：**

```js
const recordManager = has.getRecorderManager();
recordManager.onResume((res) => {
  console.info('Recording onResume res', res);
});
```

### RecorderManager.offResume

RecorderManager.offResume(function callback)

移除监听录音继续事件。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | RecorderManager.onResume传入的监听函数，不传此参数则移除所有监听函数。 |

**示例：**

```js
const recordManager = has.getRecorderManager();
const callback = (res) => {
  console.info('Recording onResume res', res);
}
recordManager.onResume(callback);
recordManager.offResume(callback);
```

### RecorderManager.onStart

RecorderManager.onStart(function callback)

监听录音开始事件。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 录音开始事件的监听函数。 |

**示例：**

```js
const recordManager = has.getRecorderManager();
recordManager.onStart((res) => {
  console.info('Recording onStart res', res);
});
```

### RecorderManager.offStart

RecorderManager.offStart(function callback)

移除监听录音开始事件。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | RecorderManager.onStart传入的监听函数，不传此参数则移除所有监听函数。 |

**示例：**

```js
const recordManager = has.getRecorderManager();
const callback = (res) => {
  console.info('Recording onStart res', res);
}
recordManager.onStart(callback);
recordManager.offStart(callback);
```

### RecorderManager.onStop

RecorderManager.onStop(function callback)

监听录音结束事件。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 录音结束事件的监听函数。 |

**callback参数：**

类型为Object对象，包括：

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| tempFilePath | string | 录音文件的临时路径 (本地路径)。 |
| duration | number | 录音总时长，单位：ms。 |
| fileSize | number | 录音文件大小，单位：byte。 |

**示例：**

```js
const recordManager = has.getRecorderManager();
recordManager.onStop((res) => {
  console.info('Recording onStop res', res);
  console.info(res.tempFilePath);
  console.info(res.duration);
  console.info(res.fileSize);
});
```

### RecorderManager.offStop

RecorderManager.offStop(function callback)

移除监听录音结束事件。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | RecorderManager.onStop传入的监听函数，不传此参数则移除所有监听函数。 |

**示例：**

```js
const recordManager = has.getRecorderManager();
const callback = (res) => {
  console.info('Recording onStop res', res);
  console.info(res.tempFilePath);
  console.info(res.duration);
  console.info(res.fileSize);
};
recordManager.onStop(callback);
recordManager.offStop(callback);
```

### RecorderManager.start

RecorderManager.start(Object object): void

开始录音。

**起始版本：** 1.0.14

**需要权限：**

1. 在module.json5中声明**ohos.permission.MICROPHONE**。

2. 在has.authorize中申请 [scope.record](../../guides/develop-authorization.md#scope-列表) 授权。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 默认值 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| duration | number | 否 | 60000 | 录音的时长，单位 ms，最大值 600000（10 分钟）。 |
| sampleRate | number | 否 | 8000 | 采样率，有效值见下表 采样率有效值。 |
| numberOfChannels | number | 否 | 2 | 录音通道数。有效值：<br/>1 ：1个通道<br/>2 ：2个通道 |
| encodeBitRate | number | 否 | 48000 | 编码码率，有效值见下表。 |
| format | string | 否 | aac | 音频格式。有效值：<br/>mp3<br/>aac<br/>wav |
| audioSource | string | 否 | atuo | 指定录音的音频输入源。有效值如下：<br/>auto：自动设置，默认使用手机麦克风。<br/>mic：麦克风。<br/>camcorder：相机录像的音频源。<br/>voiceCommunication：语音通话场景的音频源。<br/>voiceRecognition：语音识别场景的音频源。 |

**表1** 采样率有效值

| 编码格式 | 封装格式 | 采样率 | 比特率 | 声道数 |
| -------- | -------- | -------- | -------- | -------- |
| AUDIO_AAC | M4A | [8000, 11025, 12000, 16000, 22050, 24000, 32000, 44100, 48000, 64000, 88200, 96000] | [32000-500000] | [1-2] |
| AUDIO_MP3 | MP3 | [8000, 11025, 12000, 16000, 22050, 24000, 32000, 44100, 48000] | [8000, 16000, 32000, 40000, 48000, 56000, 64000, 80000, 96000, 112000, 128000, 160000, 192000, 224000, 256000, 320000]<br/>采样率使用16000以下时，对应比特率范围为[8000 - 64000]。<br/>采样率使用16000~32000时对应的比特率范围为[8000 - 160000]。<br/>采样率使用32000以上时对应的比特率范围为[32000 - 320000]。 | [1-2] |
| AUDIO_G711MU | WAV | [8000] | [64000] | [1] |

**示例：**

```js
const recordManager = has.getRecorderManager();
this.recordManager.start({
  duration: 60000,
  sampleRate: 8000,
  numberOfChannels: 2,
  encodeBitRate: 48000,
  format: 'aac',
});
```

### RecorderManager.pause

RecorderManager.pause()

暂停录音。

**起始版本：** 1.0.14

**需要权限：**

1. 在module.json5中声明**ohos.permission.MICROPHONE**。

2. 在has.authorize中申请 [scope.record](../../guides/develop-authorization.md#scope-列表) 授权。

**示例：**

```js
const recordManager = has.getRecorderManager();
recordManager.start({
  duration: 60000,
  sampleRate: 8000,
  numberOfChannels: 2,
  encodeBitRate: 48000,
  format: 'aac',
});
recordManager.pause();
```

### RecorderManager.resume

RecorderManager.resume()

继续录音。

**起始版本：** 1.0.14

**需要权限：**

1. 在module.json5中声明**ohos.permission.MICROPHONE**。

2. 在has.authorize中申请 [scope.record](../../guides/develop-authorization.md#scope-列表) 授权。

**示例：**

```js
const recordManager = has.getRecorderManager();
recordManager.start({
  duration: 60000,
  sampleRate: 8000,
  numberOfChannels: 2,
  encodeBitRate: 48000,
  format: 'aac',
});
recordManager.pause();
recordManager.resume();
```

### RecorderManager.stop

RecorderManager.stop()

停止录音。

**起始版本：** 1.0.14

**需要权限：**

1. 在module.json5中声明**ohos.permission.MICROPHONE**。

2. 在has.authorize中申请 [scope.record](../../guides/develop-authorization.md#scope-列表) 授权。

**示例：**

```js
const recordManager = has.getRecorderManager();
recordManager.start({
  duration: 60000,
  sampleRate: 8000,
  numberOfChannels: 2,
  encodeBitRate: 48000,
  format: 'aac',
});
recordManager.stop();
```
