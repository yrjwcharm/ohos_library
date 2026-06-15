# 音频

## has.stopVoice

has.stopVoice(Object object)

结束播放语音。

**起始版本：** 1.0.16

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.stopVoice({
  success: () => {
    console.info('stopVoice success');
  },
  fail: (err) => {
    console.error('stopVoice fail', err);
  },
  complete: (res) => {
    console.info('stopVoice complete', res);
  }
});
```

## has.playVoice

has.playVoice(Object object)

开始播放语音。同时只允许一个语音文件正在播放，如果前一个语音文件还没播放完，将中断前一个语音播放。

**起始版本：** 1.0.16

**参数：**

参数为Object对象，包括以下字段。

| 属性 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| filePath | string | - | 是 | 需要播放的语音文件的文件路径。 |
| duration | number | 60 | 否 | 指定播放时长，到达指定的播放时长后会自动停止播放，单位：秒。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.playVoice({
  filePath: 'internal://tmp/templete.mp3',
  success: () => {
    console.info('playVoice success');
  },
  fail: (err) => {
    console.error('playVoice fail', err);
  },
  complete: (res) => {
    console.info('playVoice complete', res);
  }
});
```

## has.pauseVoice

has.pauseVoice(Object object)

暂停正在播放的语音。再次调用 [has.playVoice](#hasplayvoice) 播放同一个文件时，会从暂停处开始播放。如果想从头开始播放，需要先调用 [has.stopVoice](#hasstopvoice)。

**起始版本：** 1.0.16

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.pauseVoice({
  success: () => {
    console.info('pauseVoice success');
  },
  fail: (err) => {
    console.error('pauseVoice fail', err);
  },
  complete: (res) => {
    console.info('pauseVoice complete', res);
  }
});
```

## has.createInnerAudioContext

has.createInnerAudioContext():InnerAudioContext

创建内部[audio](../references-components/components-audio.md)上下文[InnerAudioContext](#inneraudiocontext)对象。

**起始版本：** 1.0.14

**返回值：**

返回[InnerAudioContext](#inneraudiocontext)对象。

**示例：**

```js
const ctx = has.createInnerAudioContext();
```

## has.createAudioContext

has.createAudioContext(string id):AudioContext

创建内部[audio](../references-components/components-audio.md)上下文[AudioContext](#audiocontext)对象。

**起始版本：** 1.0.16

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| id | string | 是 | [audio](../references-components/components-audio.md)组件的id。 |

**返回值：**

返回[AudioContext](#audiocontext)对象。

**示例：**

```js
const audioContext = has.createAudioContext('myAudio');
```

## AudioContext

[AudioContext](#audiocontext)实例，可通过[has.createAudioContext](#hascreateaudiocontext)获取。

[AudioContext](#audiocontext)通过id跟一个[audio](../references-components/components-audio.md)组件绑定，操作对应的[audio](../references-components/components-audio.md)组件。

**起始版本：** 1.0.16

### AudioContext.setSrc()

AudioContext.setSrc(string src): void

设置音频地址。

**起始版本：** 1.0.16

**参数：**

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| src | string | - | 是 | 音频地址。 |

**示例：**

```js
const audioContext = has.createAudioContext('myAudio');
audioContext.setSrc('https://www.example.com/test.mp3'); // 此处仅为样例，请开发者更换为可用的网址
audioContext.play();
```

### AudioContext.play()

AudioContext.play(): void

播放音频。

**起始版本：** 1.0.16

**示例：**

```js
const audioContext = has.createAudioContext('myAudio');
audioContext.setSrc('https://www.example.com/test.mp3'); // 此处仅为样例，请开发者更换为可用的网址
audioContext.play();
```

### AudioContext.pause()

AudioContext.pause(): void

暂停播放音频。

**起始版本：** 1.0.16

**示例：**

```js
const audioContext = has.createAudioContext('myAudio');
audioContext.setSrc('https://www.example.com/test.mp3'); // 此处仅为样例，请开发者更换为可用的网址
audioContext.pause();
```

### AudioContext.seek()

AudioContext.seek(number position): void

跳转到指定位置。

**起始版本：** 1.0.16

**参数：**

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| position | number | - | 是 | 跳转位置，单位 s。 |

**示例：**

```js
const audioContext = has.createAudioContext('myAudio');
audioContext.setSrc('https://www.example.com/test.mp3'); // 此处仅为样例，请开发者更换为可用的网址
audioContext.seek(20);
```

## InnerAudioContext

InnerAudioContext 实例。可通过[has.createInnerAudioContext](#hascreateinneraudiocontext)接口获取实例。注意，音频播放过程中，可能被系统中断，可通过[has.onAudioInterruptionBegin](apis-app-event.md#hasonaudiointerruptionbegin)、[has.onAudioInterruptionEnd](apis-app-event.md#hasonaudiointerruptionend)事件来处理这种情况。

**起始版本：** 1.0.14

### 属性

| 属性名 | 类型 | 默认值 | 必填 | 只读 | 描述 |
| -------- | -------- | -------- | -------- | -------- | -------- |
| src | string | - | 是 | 否 | 音频资源的地址，用于直接播放。 |
| startTime | number | 0 | 否 | 否 | 开始播放的位置（单位：s）。 |
| autoplay | boolean | false | 否 | 否 | 是否自动开始播放。（只写） |
| loop | boolean | false | 否 | 否 | 是否循环播放。 |
| volume | number | 1 | 否 | 否 | 音量。范围 0~1。 |
| playbackRate | number | 1 | 否 | 否 | 播放速度。支持的播放速度有：0.125、0.25、0.5、0.75、1、1.25、1.5、1.75、2。 |
| duration | number | - | 否 | 是 | 当前音频的总时长（单位 s）。只有在当前有合法的 src 时返回。 |
| currentTime | number | - | 否 | 否 | 当前音频的播放位置（单位 s）。只有在当前有合法的 src 时返回。可读可写，改变 currentTime 值等同于调用 seek。 |
| paused | boolean | - | 否 | 是 | 当前是否暂停或停止状态。 |
| buffered | number | - | 否 | 是 | 音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲。 |

### InnerAudioContext.destroy

InnerAudioContext.destroy(): void

销毁当前实例。

**起始版本：** 1.0.14

**示例：**

```js
const ctx = has.createInnerAudioContext();
ctx.destroy();
```

### InnerAudioContext.play

InnerAudioContext.play(): void

播放音频。

**起始版本：** 1.0.14

**示例：**

```js
const ctx = has.createInnerAudioContext();
ctx.src = 'xxx'; // 开发时实际的音频资源地址
ctx.play();
```

### InnerAudioContext.pause

InnerAudioContext.pause(): void

暂停。暂停后的音频再播放会从暂停处开始播放。

**起始版本：** 1.0.14

**示例：**

```js
const ctx = has.createInnerAudioContext();
ctx.src = 'xxx'; // 开发时实际的音频资源地址
ctx.play();
ctx.pause();
ctx.play(); // 会从暂停处开始播放
```

### InnerAudioContext.seek

InnerAudioContext.seek(number position): void

跳转到指定位置。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| position | number | 是 | 跳转的时间（单位 s）。精确到小数点后 3 位，即支持 ms 级别精确度。 |

**示例：**

```js
const ctx = has.createInnerAudioContext();
ctx.src = 'xxx'; // 开发时实际的音频资源地址
ctx.play();
ctx.seek(10);
```

### InnerAudioContext.stop

InnerAudioContext.stop(): void

停止。停止后的音频再播放会从头开始播放。

**起始版本：** 1.0.14

**示例：**

```js
const ctx = has.createInnerAudioContext();
ctx.src = 'xxx'; // 开发时实际的音频资源地址
ctx.play();
ctx.stop();
ctx.play(); // 会从头开始播放
```

### InnerAudioContext.onCanplay

InnerAudioContext.onCanplay(function callback): void

监听音频进入可以播放状态的事件。但不保证后面可以流畅播放。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 音频进入可以播放状态的事件的监听函数。 |

**示例：**

```js
const ctx = has.createInnerAudioContext();
ctx.onCanplay(() => {
   // 监听函数
});
ctx.src = 'xxx'; // 开发时实际的音频资源地址
ctx.play();
```

### InnerAudioContext.offCanplay

InnerAudioContext.offCanplay(function callback): void

移除音频进入可以播放状态的事件的监听函数。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | InnerAudioContext.onCanplay传入的监听函数，不传此参数则移除所有监听函数。 |

**示例：**

```js
const ctx = has.createInnerAudioContext();
const callback = ()=>{
  // 监听函数
};
ctx.onCanplay(callback);
ctx.offCanplay(callback);
ctx.src = 'xxx'; // 开发时实际的音频资源地址
ctx.play();
```

### InnerAudioContext.onEnded

InnerAudioContext.onEnded(function callback): void

监听音频自然播放至结束的事件。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 音频自然播放至结束的事件的监听函数。 |

**示例：**

```js
const ctx = has.createInnerAudioContext();
ctx.onEnded(() => {
  // 监听函数
});
ctx.src = 'xxx'; // 开发时实际的音频资源地址
ctx.play();
```

### InnerAudioContext.offEnded

InnerAudioContext.offEnded(function callback): void

移除音频自然播放至结束的事件的监听函数。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | InnerAudioContext.onEnded传入的监听函数。不传此参数则移除所有监听函数。 |

**示例：**

```js
const ctx = has.createInnerAudioContext();
const callback = ()=>{
  // 监听函数
};
ctx.onEnded(callback);
ctx.offEnded(callback);
ctx.src = 'xxx'; // 开发时实际的音频资源地址
ctx.play();
```

### InnerAudioContext.onError

InnerAudioContext.onError(function callback(res: result)): void

监听音频播放错误事件。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 音频播放错误事件的监听函数 |

**result：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| errMsg | string | 错误信息 |
| errCode | number | 错误码 |

**示例：**

```js
const ctx = has.createInnerAudioContext();
ctx.onError((res) => {
  // 监听函数
  console.error(res.errMsg);
  console.error(res.errCode);
});
ctx.src = 'xxx'; // 开发时实际的音频资源地址
ctx.play();
```

### InnerAudioContext.offError

InnerAudioContext.offError(function callback): void

移除音频播放错误事件的监听函数。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | InnerAudioContext.onError 传入的监听函数。不传此参数则移除所有监听函数。 |

**示例：**

```js
const ctx = has.createInnerAudioContext();
const callback = (res)=>{
  // 监听函数
  console.error(res.errMsg);
  console.error(res.errCode);
};
ctx.onError(callback);
ctx.offError(callback);
ctx.src = 'xxx'; // 开发时实际的音频资源地址
ctx.play();
```

### InnerAudioContext.onPause

InnerAudioContext.onPause(function callback): void

监听音频暂停事件。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 音频暂停事件的监听函数。 |

**示例：**

```js
const ctx = has.createInnerAudioContext();
ctx.onPause(() => {
  // 监听函数
});
ctx.src = 'xxx'; // 开发时实际的音频资源地址
ctx.play();
ctx.pause();
```

### InnerAudioContext.offPause

InnerAudioContext.offPause(function callback): void

移除音频暂停事件的监听函数。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | InnerAudioContext.onPause 传入的监听函数。不传此参数则移除所有监听函数。 |

**示例：**

```js
const ctx = has.createInnerAudioContext();
const callback = ()=>{
  // 监听函数
};
ctx.onPause(callback);
ctx.offPause(callback);
ctx.src = 'xxx'; // 开发时实际的音频资源地址
ctx.play();
ctx.pause();
```

### InnerAudioContext.onPlay

InnerAudioContext.onPlay(function callback): void

监听音频播放事件。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 音频播放事件的监听函数。 |

**示例：**

```js
const ctx = has.createInnerAudioContext();
ctx.onPlay(() => {
  // 监听函数
});
ctx.src = 'xxx'; // 开发时实际的音频资源地址
ctx.play();
```

### InnerAudioContext.offPlay

InnerAudioContext.offPlay(function callback): void

移除音频播放事件的监听函数。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | InnerAudioContext.onPlay 传入的监听函数。不传此参数则移除所有监听函数。 |

**示例：**

```js
const ctx = has.createInnerAudioContext();
const callback = ()=>{
  // 监听函数
};
ctx.onPlay(callback);
ctx.offPlay(callback);
ctx.src = 'xxx'; // 开发时实际的音频资源地址
ctx.play();
```

### InnerAudioContext.onSeeked

InnerAudioContext.onSeeked(function callback): void

监听音频完成跳转操作的事件。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 音频完成跳转操作的事件的监听函数。 |

**示例：**

```js
const ctx = has.createInnerAudioContext();
ctx.onSeeked(() => {
  // 监听函数
});
ctx.src = 'xxx'; // 开发时实际的音频资源地址
ctx.play();
ctx.seek(10);
```

### InnerAudioContext.offSeeked

InnerAudioContext.offSeeked(function callback): void

移除音频完成跳转操作的事件的监听函数。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | InnerAudioContext.onSeeked 传入的监听函数。不传此参数则移除所有监听函数。 |

**示例：**

```js
const ctx = has.createInnerAudioContext();
const callback = ()=>{
  // 监听函数
};
ctx.onSeeked(callback);
ctx.offSeeked(callback);
ctx.src = 'xxx'; // 开发时实际的音频资源地址
ctx.play();
ctx.seek(10);
```

### InnerAudioContext.onSeeking

InnerAudioContext.onSeeking(function callback): void

监听音频进行跳转操作的事件。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 音频进行跳转操作的事件的监听函数。 |

**示例：**

```js
const ctx = has.createInnerAudioContext();
ctx.onSeeking(() => {
  // 监听函数
});
ctx.src = 'xxx'; // 开发时实际的音频资源地址
ctx.play();
ctx.seek(10);
```

### InnerAudioContext.offSeeking

InnerAudioContext.offSeeking(function callback): void

移除音频进行跳转操作的事件的监听函数。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | InnerAudioContext.onSeeking 传入的监听函数。不传此参数则移除所有监听函数。 |

**示例：**

```js
const ctx = has.createInnerAudioContext();
const callback = ()=>{
  // 监听函数
};
ctx.onSeeking(callback);
ctx.offSeeking(callback);
ctx.src = 'xxx'; // 开发时实际的音频资源地址
ctx.play();
ctx.seek(10);
```

### InnerAudioContext.onStop

InnerAudioContext.onStop(function callback): void

监听音频停止事件。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 音频停止事件的监听函数。 |

**示例：**

```js
const ctx = has.createInnerAudioContext();
ctx.onStop(() => {
  // 监听函数
});
ctx.src = 'xxx'; // 开发时实际的音频资源地址
ctx.play();
ctx.stop();
```

### InnerAudioContext.offStop

InnerAudioContext.offStop(function callback): void

移除音频停止事件的监听函数。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | InnerAudioContext.onStop 传入的监听函数。不传此参数则移除所有监听函数。 |

**示例：**

```js
const ctx = has.createInnerAudioContext();
const callback = ()=>{
  // 监听函数
};
ctx.onStop(callback);
ctx.offStop(callback);
ctx.src = 'xxx'; // 开发时实际的音频资源地址
ctx.play();
ctx.stop();
```

### InnerAudioContext.onTimeUpdate

InnerAudioContext.onTimeUpdate(function callback): void

监听音频播放进度更新事件。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 音频播放进度更新事件的监听函数。 |

**示例：**

```js
const ctx = has.createInnerAudioContext();
ctx.onTimeUpdate(() => {
  // 监听函数
});
ctx.src = 'xxx'; // 开发时实际的音频资源地址
ctx.play();
```

### InnerAudioContext.offTimeUpdate

InnerAudioContext.offTimeUpdate(function callback): void

移除音频播放进度更新事件的监听函数。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | InnerAudioContext.onTimeUpdate 传入的监听函数。不传此参数则移除所有监听函数。 |

**示例：**

```js
const ctx = has.createInnerAudioContext();
const callback = ()=>{
  // 监听函数
};
ctx.onTimeUpdate(callback);
ctx.offTimeUpdate(callback);
ctx.src = 'xxx'; // 开发时实际的音频资源地址
ctx.play();
```

### InnerAudioContext.onWaiting

InnerAudioContext.onWaiting(function callback): void

监听音频加载中事件。当音频因为数据不足，需要停下来加载时会触发。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 音频加载中事件的监听函数。 |

**示例：**

```js
const ctx = has.createInnerAudioContext();
ctx.onWaiting(() => {
  // 监听函数
});
ctx.src = 'xxx'; // 开发时实际的音频资源地址
ctx.play();
```

### InnerAudioContext.offWaiting

InnerAudioContext.offWaiting(function callback): void

移除音频加载中事件的监听函数。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | InnerAudioContext.onWaiting 传入的监听函数。不传此参数则移除所有监听函数。 |

**示例：**

```js
const ctx = has.createInnerAudioContext();
const callback = () => {
  // 监听函数
};
ctx.onWaiting(callback);
ctx.offWaiting(callback);
ctx.src = 'xxx'; // 开发时实际的音频资源地址
ctx.play();
```
