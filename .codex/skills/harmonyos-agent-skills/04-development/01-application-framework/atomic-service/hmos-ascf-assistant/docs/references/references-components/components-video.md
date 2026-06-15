# video

用于播放视频文件并控制其播放状态的组件。

**起始版本：** 1.0.0

**关联文档：** [has.createVideoContext](../references-apis/apis-video.md#hascreatevideocontext)

**重要提示：** 当HarmonyOS SDK版本≥6.1.0(23) 且ROM版本 ≥ 6.1.0时，video组件全屏状态下menubar会隐藏。
<br/>**起始版本：** 1.0.22

## 属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| src | string | - | 是 | 视频的数据源。<br/>支持的格式有mp4，从1.0.16开始，增加支持mpeg-ts、mkv。<br/>支持网络视频地址和本地视频地址（internal://开头）。<br/>从1.0.20版本开始，支持代码包内视频地址。 |
| duration | number | - | 否 | 指定视频时长，单位s。<br/>**起始版本：** 1.0.16 |
| controls | boolean | true | 否 | 是否显示默认播放控件。<br/>包括播放/暂停按钮、播放进度、时间、静音按钮、全屏按钮，1.0.16版本增加支持投屏按钮。 |
| autoplay | boolean | false | 否 | 是否自动播放。<br/>在1.0.15及之前的版本中，需要同步开启静音播放，不支持在非静音状态下自动播放。<br/>从1.0.16版本开始，不再有上述限制。 |
| loop | boolean | false | 否 | 是否循环播放。 |
| muted | boolean | false | 否 | 是否静音播放。 |
| initial-time | number | 0 | 否 | 指定视频初始播放位置，单位s。<br/>**起始版本：** 1.0.16 |
| object-fit | string | contain | 否 | 当视频大小与 video 容器大小不一致时，视频的表现形式。<br/>contain：保持宽高比进行缩小或者放大，使得视频完全显示在显示边界内。<br/>cover：保持宽高比进行缩小或者放大，使得视频两边都大于或等于显示边界。<br/>fill：不保持宽高比进行放大缩小，使得视频充满显示边界。<br/>**起始版本：** 1.0.3 |
| poster | string | - | 否 | 视频未播放时的预览图片路径，默认显示视频第一帧，支持网络图片。<br/>poster值加载错误时：<br/>在1.0.15及之前的版本，视频封面黑屏处理。<br/>从1.0.16开始，默认显示视频第一帧。 |
| direction | number | - | 否 | 设置全屏时视频的方向，不指定则根据宽高比自动判断。<br/>0：正常竖向。<br/>90：屏幕逆时针90度。<br/>-90：屏幕顺时针90度。<br/>**起始版本：** 1.0.16 |
| show-casting-button | boolean | false | 否 | 显示投屏按钮。开始播放后才显示，只支持网络视频投屏。<br/>**需要权限：** 开启投屏播放，需要如下配置：<br/>在module.json5中声明**ohos.permission.KEEP_BACKGROUND_RUNNING**权限。<br/>在module.json5中声明**backgroundModes**配置项。<br/>"module": {"abilities": [{"backgroundModes": ["audioPlayback"]}]}<br/>在[app.json](../references-framework/appjson-global-config.md)中配置**requiredBackgroundModes**属性。&nbsp;&nbsp;<br/>&nbsp;&nbsp;<br/>"requiredBackgroundModes": ["audio"]<br/><br/>**起始版本：** 1.0.16 |
| show-fullscreen-btn | boolean | true | 否 | 是否显示全屏按钮。<br/>**起始版本：** 1.0.16 |
| show-play-btn | boolean | true | 否 | 是否显示视频底部控制栏的播放按钮。<br/>**起始版本：** 1.0.16 |
| play-btn-position | string | bottom | 否 | 播放按钮的位置。<br/>bottom：底部控制栏上。<br/>center：视频中间。<br/>**起始版本：** 1.0.16 |
| title | string | - | 否 | 视频的标题，全屏时在顶部展示。<br/>**起始版本：** 1.0.16 |
| show-screen-lock-button | boolean | false | 否 | 是否显示锁屏按钮，仅在全屏时显示。<br/>**起始版本：** 1.0.16 |
| enable-auto-rotation | boolean | false | 否 | 是否开启手机横屏时自动全屏，当系统设置开启自动旋转时生效。<br/>**起始版本：** 1.0.16 |
| enable-progress-gesture | boolean | true | 否 | 是否开启控制进度的手势。<br/>**起始版本：** 1.0.16 |
| vslide-gesture-in-fullscreen | boolean | true | 否 | 在全屏模式下，是否开启亮度与音量调节手势。<br/>**起始版本：** 1.0.16 |
| vslide-gesture | boolean | false | 否 | 在非全屏模式下，是否开启亮度与音量调节手势。<br/>**起始版本：** 1.0.16 |
| show-mute-btn | boolean | false | 否 | 是否显示静音按钮。<br/>**起始版本：** 1.0.16 |
| enable-play-gesture | boolean | false | 否 | 是否开启播放手势，即双击切换播放/暂停。<br/>**起始版本：** 1.0.16 |
| bindplay | eventhandle | - | 否 | 当开始/继续播放时触发play事件。 |
| bindpause | eventhandle | - | 否 | 当暂停播放时触发 pause 事件。 |
| bindended | eventhandle | - | 否 | 当播放到末尾时触发 ended 事件。 |
| bindtimeupdate | eventhandle | - | 否 | 播放进度变化时触发，event.detail = {currentTime, duration} ，currentTime单位秒，duration单位秒。触发频率 200ms 一次。<br/>**起始版本：** 1.0.16 |
| bindfullscreenchange | eventhandle | - | 否 | 视频进入和退出全屏时触发，event.detail = {fullScreen, direction}，direction 有效值为 vertical 或 horizontal。<br/>**起始版本：** 1.0.16 |
| bindwaiting | eventhandle | - | 否 | 视频出现缓冲时触发。<br/>**起始版本：** 1.0.16 |
| binderror | eventhandle | - | 否 | 视频播放出错时触发。<br/>**起始版本：** 1.0.16 |
| bindprogress | eventhandle | - | 否 | 加载进度变化时触发，只支持一段加载。event.detail = {buffered}，buffered为百分比。<br/>**起始版本：** 1.0.16 |
| bindloadedmetadata | eventhandle | - | 否 | 视频元数据加载完成时触发。event.detail = {width, height, duration}，duration单位秒。<br/>**起始版本：** 1.0.16 |
| bindcontrolstoggle | eventhandle | - | 否 | 切换 controls 显示隐藏时触发。event.detail = {show}。<br/>**起始版本：** 1.0.16 |
| bindseekcomplete | eventhandle | - | 否 | seek 完成时触发。event.detail = {position}，position单位秒。<br/>**起始版本：** 1.0.16 |
| bindcastinguserselect | eventhandle | - | 否 | 用户选择投屏设备时触发 detail = { state: "success"/"fail" }。<br/>**起始版本：** 1.0.16 |
| bindcastingstatechange | eventhandle | - | 否 | 投屏成功/失败时触发 detail = { type, state: "success"/"fail" }，type值固定为connect。<br/>**起始版本：** 1.0.16 |
| bindcastinginterrupt | eventhandle | - | 否 | 投屏被中断时触发。<br/>**起始版本：** 1.0.16 |


## 投屏限制

- 视频投屏时，src只支持网络视频地址，不支持本地视频地址（internal://开头）。

- 部分投屏设备不支持设置静音，开启投屏后，视频播控界面不显示静音按钮。

- 部分投屏设备不支持全量的播放倍速（0.125、0.25、0.5、0.75、1、1.25、1.5、1.75、2），开启投屏后，调用VideoContext.playbackRate()接口，传入不支持的播放倍速，调用无效。

## 示例

hxml文件：

```html
<video
  src="{{ videoSrc }}"
  controls="{{ controls }}"
  autoplay="{{ autoplay }}"
  loop="{{ loop }}"
  muted="{{ muted }}"
  object-fit="{{ objectFit }}"
  poster="{{ posterSrc }}"
  bindplay="onPlay"
  bindpause="onPause"
  bindended="onEnded"
  binderror="onError"
/>
```

js文件：

```js
Page({
  data: {
    videoSrc: 'https://www.example.com/example.mp4', // 此处仅为样例，请开发者更换为可用视频资源地址
    posterSrc: 'https://www.example.com/example.jpg', // 此处仅为样例，请开发者更换为可用图片资源地址
    controls: true,
    autoplay: true,
    loop: true,
    muted: true,
    objectFit: 'fill',
  },
  onPlay(e) {
    console.info('video start play', e);
  },
  onPause(e) {
    console.info('video pause', e);
  },
  onEnded(e) {
    console.info('video end', e);
  },
  onError(e) {
    console.error('video error', e.detail);
  }
});
```
