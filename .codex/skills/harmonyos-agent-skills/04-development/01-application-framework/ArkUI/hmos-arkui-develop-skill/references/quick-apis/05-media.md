## 5. 媒体与绘图组件

### Video

视频播放组件。

**构造：** `Video(value: VideoOptions)`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| src | string \| Resource | 是 | — | 视频源 |
| currentProgressRate | number \| PlaybackSpeed | 否 | 1 | 播放倍速 |
| previewUri | string \| Resource \| PixelMap | 否 | — | 预览图 |
| controller | VideoController | 否 | — | 控制器 |

**属性方法：**

| 方法 | 签名 | 默认值 | 说明 |
|------|------|--------|------|
| .muted | `.muted(value: boolean)` | false | 静音 |
| .autoPlay | `.autoPlay(value: boolean)` | false | 自动播放 |
| .controls | `.controls(value: boolean)` | true | 显示控制栏 |
| .loop | `.loop(value: boolean)` | false | 循环播放 |
| .objectFit | `.objectFit(value: ImageFit)` | Cover | 填充方式 |

**事件：**

| 事件 | 签名 | 说明 |
|------|------|------|
| .onStart | `.onStart(event: () => void)` | 播放开始 |
| .onPause | `.onPause(event: () => void)` | 暂停 |
| .onFinish | `.onFinish(event: () => void)` | 播放完成 |
| .onError | `.onError(event: () => void)` | 错误 |
| .onPrepared | `.onPrepared(callback: Callback<PreparedInfo>)` | 准备完成，PreparedInfo 有 `.duration` 属性（秒） |
| .onSeeking | `.onSeeking(callback: Callback<PlaybackInfo>)` | 拖动进度，PlaybackInfo 有 `.time` 属性（秒） |
| .onUpdate | `.onUpdate(callback: Callback<PlaybackInfo>)` | 播放进度更新，PlaybackInfo 有 `.time` 属性（秒） |

> 注意：onUpdate/onPrepared 回调参数是**对象**不是 number。不存在 onTimeUpdate。
> 官方示例写法：`.onUpdate((e?: TimeObject) => { if (e) { let t = e.time } })`

---

### Canvas / Shape 绘图速查

| 组件/接口 | 构造签名 | 核心方法/属性 |
|-----------|---------|-------------|
| **Canvas** | `Canvas(context?: CanvasRenderingContext2D)` | 子组件方式使用，context 提供 2D 绑定 |
| **CanvasRenderingContext2D** | `new CanvasRenderingContext2D(settings?)` | `fillRect/strokeRect/clearRect/drawImage/fillText/strokeText/arc/beginPath/closePath/moveTo/lineTo/bezierCurveTo/quadraticCurveTo/rotate/scale/translate/save/restore/clip/createLinearGradient/createRadialGradient` |
| **OffscreenCanvas** | `new OffscreenCanvas(width, height)` | 离屏渲染 |
| **Path2D** | `new Path2D()` | `addPath/arc/arcTo/bezierCurveTo/ellipse/lineTo/moveTo/quadraticCurveTo/rect` |
| **Shape** | `Shape(options?: {viewPort})` | `.fill()` `.stroke()` `.strokeWidth()` `.strokeDashArray()` `.strokeLineCap()` `.antiAlias()` |
| **Rect** | `Rect(options?)` | `.width()` `.height()` `.radiusWidth()` `.radiusHeight()` `.fill()` `.stroke()` |
| **Circle** | `Circle(options?)` | `.width()` `.height()` `.fill()` `.stroke()` |
| **Ellipse** | `Ellipse(options?)` | `.width()` `.height()` `.fill()` `.stroke()` |
| **Line** | `Line(options?)` | `.startPoint()` `.endPoint()` `.fill()` `.stroke()` `.strokeWidth()` |
| **Polyline** | `Polyline(options?)` | `.points(Array\<Point\>)` `.fill()` `.stroke()` |
| **Polygon** | `Polygon(options?)` | `.points(Array\<Point\>)` `.fill()` `.stroke()` |
| **Path** | `Path(options?)` | `.commands(string)` `.fill()` `.stroke()` |

---
