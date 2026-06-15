# 画布

## has.createCanvasContext

has.createCanvasContext(string canvasId, Object this)

创建 [canvas](../references-components/components-canvas.md) 的绘图上下文CanvasContext对象。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| canvasId | string | 是 | 要获取上下文的canvas组件的canvas-id属性。 |
| this | Object | 否 | 在自定义组件下，当前组件实例的this，以操作组件内canvas组件。<br/>**起始版本：** 1.0.13 |

**返回值：**

返回[CanvasContext](#canvascontext)对象。

**示例：**

```js
const ctx = has.createCanvasContext('firstCanvas');
```

## has.canvasPutImageData

has.canvasPutImageData(Object object, Object this)

将像素数据绘制到画布。

**起始版本：** 1.0.3

**参数**：

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| object | Object | 是 | 图像的像素数据。 |
| this | Object | 否 | 在自定义组件下，当前组件实例的this，以操作组件内canvas组件。<br/>**起始版本：** 1.0.13 |

**object参数说明：**

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| canvasId | string | - | 是 | 画布标识，传入canvas组件的canvas-id。 |
| data | Uint8ClampedArray | - | 是 | 图像像素点数据，一维数组，每四项表示一个像素点的rgba。 |
| x | number | - | 是 | 源图像数据在目标画布中的位置偏移量（x轴方向的偏移量） |
| y | number | - | 是 | 源图像数据在目标画布中的位置偏移量（y轴方向的偏移量） |
| width | number | - | 是 | 源图像数据矩形区域的宽度。 |
| height | number | - | 是 | 源图像数据矩形区域的高度。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
const data = new Uint8ClampedArray([255, 0, 0, 1]);
has.canvasPutImageData({
  canvasId: 'myCanvas',
  x: 0,
  y: 0,
  width: 1,
  height: 1,
  data: data,
  success: (res) => {
    console.info('canvasPutImageData success', res);
  },
  fail: (err) => {
    console.error('canvasPutImageData fail', err);
  },
  complete: (res) => {
    console.info('canvasPutImageData complete', res);
  }
});
```

## has.canvasGetImageData

has.canvasGetImageData(Object object, Object this)

获取canvas区域隐含的像素数据。

**起始版本：** 1.0.3

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| object | Object | 是 | 图像的像素数据。 |
| this | Object | 否 | 在自定义组件下，当前组件实例的this，以操作组件内canvas组件。<br/>**起始版本：** 1.0.13 |

**object参数说明：**

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| canvasId | string | - | 是 | 画布标识，传入canvas组件的canvas-id。 |
| x | number | - | 是 | 将要被提取的图像数据矩形区域的左上角横坐标。 |
| y | number | - | 是 | 将要被提取的图像数据矩形区域的左上角纵坐标。 |
| width | number | - | 是 | 将要被提取的图像数据矩形区域的宽度。 |
| height | number | - | 是 | 将要被提取的图像数据矩形区域的高度。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值**：
| 参数 | 类型 | 描述 |
| --- | --- | --- |
| width | number | 图像数据矩形的宽度。 |
| height | number | 图像数据矩形的高度。 |
| data | Unit8ClampedArray | 图像像素点数据，一维数组，每四项表示一个像素点的rgba。 |

**示例：**

```js
has.canvasGetImageData({
  canvasId: 'myCanvas',
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  success: (res) => {
    console.info(res.width);
    console.info(res.height);
    console.info(res.data instanceof Uint8ClampedArray);
    console.info(res.data.length);
  },
  fail: (err) => {
    console.error('canvasGetImageData fail', err);
  },
  complete: (res) => {
    console.info('canvasGetImageData complete', res);
  }
});
```

## has.canvasToTempFilePath

has.canvasToTempFilePath(Object object, Object this)

把当前画布指定区域的内容导出生成指定大小的图片。在draw()回调里调用该方法才能保证图片导出成功。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| object | Object | 是 | 需要指定的信息对象。 |
| this | Object | 否 | 在自定义组件下，当前组件实例的this，以操作组件内canvas组件。 |

**object参数说明：**

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| x | number | 0 | 否 | 指定的画布区域的左上角横坐标。 |
| y | number | 0 | 否 | 指定的画布区域的左上角纵坐标。 |
| width | number | canvas宽度-x | 否 | 指定的画布区域的宽度。 |
| height | number | canvas高度-y | 否 | 指定的画布区域的高度。 |
| destWidth | number | width\*屏幕像素密度 | 否 | 输出的图片的宽度。 |
| destHeight | number | height\*屏幕像素密度 | 否 | 输出的图片的高度。 |
| canvasId | string | - | 是 | 画布标识，传入canvas组件的canvas-id。 |
| fileType | string | png | 否 | 目标文件的类型。<br/>jpg：jpg图片<br/>png：png图片 |
| quality | number | - | 否 | 图片的质量，目前仅对 jpg 有效。取值范围为(0, 1]，不在范围内时当作1.0处理。 |
| success | function | - | - | 接口调用成功的回调函数。 |
| fail | function | - | - | 接口调用失败的回调函数。 |
| complete | function | - | - | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| tempFilePath | string | 生成文件的临时路径 (本地路径）。 |

**示例：**

```js
has.canvasToTempFilePath({
  x: 10,
  y: 20,
  width: 50,
  height: 50,
  destWidth: 80,
  destHeight: 80,
  canvasId: 'firstCanvas',
  success: (res) => {
    console.info('canvasToTempFilePath success', res);
  },
  fail: (err) => {
    console.error('canvasToTempFilePath fail', err);
  },
  complete: (res) => {
    console.info('canvasToTempFilePath complete', res);
  }
});
```

## CanvasContext

canvas 组件的绘图上下文。

### 属性

| 名称 | 类型 | 描述 |
| -------- | -------- | -------- |
| strokeStyle | string\|CanvasGradient | 边框颜色。<br/>用法同[CanvasContext.setStrokeStyle](#canvascontextsetstrokestyle)。<br/>**起始版本：** 1.0.15 |
| shadowOffsetX | number | 阴影相对于形状在水平方向的偏移。<br/>**起始版本：** 1.0.15 |
| shadowOffsetY | number | 阴影相对于形状在竖直方向的偏移。<br/>**起始版本：** 1.0.15 |
| shadowColor | string | 阴影的颜色。<br/>**起始版本：** 1.0.15 |
| shadowBlur | number | 阴影的模糊级别。<br/>**起始版本：** 1.0.15 |
| lineWidth | number | 线条的宽度。<br/>用法同[CanvasContext.setLineWidth](#canvascontextsetlinewidth)。<br/>**起始版本：** 1.0.15 |
| lineCap | string | 线条的端点样式。<br/>合法值：<br/>'butt'：向线条的每个末端添加平直的边缘。<br/>'round'：向线条的每个末端添加圆形线帽。<br/>'square'：向线条的每个末端添加正方形线帽。<br/>用法同[CanvasContext.setLineCap](#canvascontextsetlinecap)。<br/>**起始版本：** 1.0.15 |
| lineJoin | string | 线条的交点样式。<br/>合法值：<br/>'bevel'：斜角。<br/>'round'：圆角。<br/>'miter'：尖角。<br/>用法同[CanvasContext.setLineJoin](#canvascontextsetlinejoin)。<br/>**起始版本：** 1.0.15 |
| miterLimit | number | 最大斜接长度。<br/>用法同[CanvasContext.setMiterLimit](#canvascontextsetmiterlimit)。<br/>**起始版本：** 1.0.15 |
| lineDashOffset | number | 虚线偏移量，初始值为0。<br/>**起始版本：** 1.0.15 |
| globalCompositeOperation | string | 在绘制新形状时应用的合成操作的类型。目前支持的操作有如下：<br/>'source-over',<br/>'source-atop',<br/>'source-in',<br/>'source-out',<br/>'destination-over',<br/>'destination-atop',<br/>'destination-in',<br/>'destination-out',<br/>'lighter',<br/>'copy',<br/>'xor'。<br/>**起始版本：** 1.0.15 |
| globalAlpha | number | 全局画笔透明度。范围 0-1，0 表示完全透明，1 表示完全不透明。<br/>**起始版本：** 1.0.15 |

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.lineWidth = 10;
ctx.arc(100, 75, 50, 0, 2 * Math.PI);
ctx.draw();
```

### CanvasContext.arc

CanvasContext.arc(number x, number y, number r, number sAngle, number eAngle, boolean counterclockwise)

创建一条弧线。

- 创建一个圆可以指定起始弧度为0，终止弧度为2 \* Math.PI。
- 使用stroke方法在canvas中画弧线。
- 使用fill方法在canvas中填充一个圆形。
- 使用draw方法绘制结果。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| x | number | 是 | 圆心的x坐标。 |
| y | number | 是 | 圆心的y坐标。 |
| r | number | 是 | 圆的半径。 |
| sAngle | number | 是 | 起始弧度，单位弧度（在3点钟方向）。 |
| eAngle | number | 是 | 终止弧度。 |
| counterclockwise | boolean | 否 | 弧度的方向是否是逆时针。 |

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.arc(100, 75, 50, 0, 2 * Math.PI);
ctx.setFillStyle('#EEEEEE');
ctx.fill();
ctx.draw();
```

### CanvasContext.arcTo

CanvasContext.arcTo(number x1, number y1, number x2, number y2, number radius)

根据控制点和半径绘制圆弧路径。

- 使用moveTo方法将画笔移动到指定起始点

- 使用arcTo方法指定弧线的控制点和半径

- 使用stroke方法在canvas中画弧线。

- 使用draw方法绘制结果

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| x1 | number | 是 | 第一个控制点的x轴坐标。 |
| y1 | number | 是 | 第一个控制点的y轴坐标。 |
| x2 | number | 是 | 第二个控制点的x轴坐标。 |
| y2 | number | 是 | 第二个控制点的y轴坐标。 |
| radius | number | 是 | 圆弧的半径。 |

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.beginPath();
ctx.moveTo(20, 20);
ctx.lineTo(100, 20);
ctx.arcTo(150, 20, 150, 70, 50);
ctx.lineTo(150, 120);
ctx.stroke();
ctx.draw();
```

### CanvasContext.beginPath

CanvasContext.beginPath()

开始创建一个路径。需要调用调用[fill](#canvascontextfill)或者[stroke](#canvascontextstroke)才会使用路径进行填充或描边。

- 在最开始的时候相当于调用一次 beginPath。
- 同一个路径内的多次setFillStyle、setStrokeStyle、setLineWidth等设置，以最后一次设置为准。
- 使用draw方法绘制结果。

**起始版本：** 1.0.0

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.beginPath();
ctx.setStrokeStyle('#ff0000');
ctx.moveTo(0, 75);
ctx.lineTo(250, 75);
ctx.stroke();
ctx.beginPath();
ctx.setStrokeStyle('#0000ff');
ctx.moveTo(50, 0);
ctx.lineTo(150, 130);
ctx.draw();
```

### CanvasContext.bezierCurveTo

CanvasContext.bezierCurveTo(number cp1x, number cp1y, number cp2x, number cp2y, number x, number y)

创建三次方贝塞尔曲线路径。曲线的起始点为路径中前一个点。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| cp1x | number | 是 | 第一个贝塞尔控制点的x坐标。 |
| cp1y | number | 是 | 第一个贝塞尔控制点的y坐标。 |
| cp2x | number | 是 | 第二个贝塞尔控制点的x坐标。 |
| cp2y | number | 是 | 第二个贝塞尔控制点的y坐标。 |
| x | number | 是 | 结束点的x坐标。 |
| y | number | 是 | 结束点的y坐标。 |

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.beginPath();
ctx.moveTo(20, 20);
ctx.bezierCurveTo(20, 100, 200, 100, 200, 20);
ctx.stroke();
ctx.draw();
```

### CanvasContext.clip

CanvasContext.clip()

从原始画布中剪切任意形状和尺寸。

一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内（不能访问画布上的其他区域）。

可以在使用clip方法前通过使用save方法对当前画布区域进行保存，并在以后的任意时间通过restore方法对其进行恢复。

**起始版本：** 1.0.0

**示例：**

使用draw方法绘制结果。

切割图片：

```js
const ctx = has.createCanvasContext('myCanvas');
has.downloadFile({
  url: 'https://www.example.com/xxx.png', // 此处仅为样例，请开发者更换为可用图片资源地址
  success: (res) => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(50, 50, 25, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(res.tempFilePath, 25, 25);
    ctx.restore();
    ctx.draw();
  }
});
```

切割图形：

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.arc(50, 50, 25, 0, 2 * Math.PI);
ctx.clip();
ctx.fillRect(0, 0, 200, 200);
ctx.restore();
ctx.draw();
```

### CanvasContext.closePath

CanvasContext.closePath()

关闭一个路径。会连接起点和终点。如果关闭路径后没有调用fill或者stroke并开启了新的路径，那么之前的路径将不会被渲染。

**起始版本：** 1.0.0

**示例：**

使用draw方法绘制结果。

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.moveTo(10, 10);
ctx.lineTo(100, 10);
ctx.lineTo(100, 100);
ctx.closePath();
ctx.stroke();
ctx.draw();
```

### CanvasContext.createCircularGradient

CanvasContext.createCircularGradient(number x, number y, number r): CanvasGradient

创建一个圆形的渐变颜色。起点在圆心，终点在圆环。

返回的CanvasGradient对象需要使用[CanvasGradient.addColorStop()](#canvasgradientaddcolorstop)来指定渐变点，至少要两个。

**起始版本：** 1.0.4

**参数：**

> **说明：**
>
> 参数x、y支持传入空值，参数r必须填入。当x、y不传入时，样例参考：CanvasContext.createCircularGradient(undefined, undefined, 50)
> 
> 此时，传参效果等同于：
> CanvasContext.createCircularGradient(0, 0, 50)


| 参数 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| x | number | 0 | 否 | 圆心的x坐标。 |
| y | number | 0 | 否 | 圆心的y坐标。 |
| r | number | - | 是 | 圆的半径。 |

**返回值：**

返回[CanvasGradient](#canvasgradient)对象。

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
const grd = ctx.createCircularGradient(75, 50, 50);
grd.addColorStop(0, 'red');
grd.addColorStop(1, 'black');
ctx.setFillStyle(grd);
ctx.fillRect(10, 10, 150, 80);
ctx.draw();
```

### CanvasContext.createLinearGradient

CanvasContext.createLinearGradient(number x0, number y0, number x1, number y1): CanvasGradient

创建一个线性的渐变颜色。返回的CanvasGradient对象需要使用CanvasGradient.addColorStop()来指定渐变点，至少要两个。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| x0 | number | 0 | 否 | 起点的x坐标。 |
| y0 | number | 0 | 否 | 起点的y坐标。 |
| x1 | number | 0 | 否 | 终点的x坐标。 |
| y1 | number | 0 | 否 | 终点的y坐标。 |

**返回值：**

返回[CanvasGradient](#canvasgradient)对象。

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
const grd = ctx.createLinearGradient(0, 0, 200, 0);
grd.addColorStop(0, 'red');
grd.addColorStop(1, 'green');
ctx.setFillStyle(grd);
ctx.fillRect(10, 10, 150, 80);
ctx.draw();
```

### CanvasContext.draw

CanvasContext.draw(boolean reserve, function callback)

将之前在绘图上下文中的描述（路径、变形、样式）画到canvas中。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| reserve | boolean | false | 否 | 本次绘制是否接着上一次绘制。<br/>reserve参数为false，则在本次调用绘制之前native层会先清空画布再继续绘制。<br/>reserve参数为true，则保留当前画布上的内容，本次调用drawCanvas绘制的内容覆盖在上面。 |
| callback | function | - | 否 | 绘制完成后执行的回调函数。 |

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.moveTo(10, 10);
ctx.lineTo(100, 10);
ctx.lineTo(100, 100);
ctx.fill();
ctx.draw();
```

### CanvasContext.drawImage

CanvasContext.drawImage(string imageResource, number sx, number sy, number sWidth, number sHeight, number dx, number dy, number dWidth, number dHeight)

绘制图像到画布。

**起始版本：** 1.0.4

**参数：**

当前支持三种入参方式，请开发者根据实际情况选择。

- CanvasContext.drawImage(string imageResource, number dx, number dy)
- CanvasContext.drawImage(string imageResource, number dx, number dy, number dWidth, number dHeight)
- CanvasContext.drawImage(string imageResource, number sx, number sy, number sWidth, number sHeight, number dx, number dy, number dWidth, number dHeight)

| 参数 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| imageResource | string | 是 | 所要绘制的图片资源（网络图片要通过getImageInfo / downloadFile先下载）。 |
| sx | number | 否 | 需要绘制到画布中源图像的矩形选择框的左上角x坐标。 |
| sy | number | 否 | 需要绘制到画布中源图像的矩形选择框的左上角y坐标。 |
| sWidth | number | 否 | 需要绘制到画布中源图像的矩形选择框的宽度。 |
| sHeight | number | 否 | 需要绘制到画布中源图像的矩形选择框的高度。 |
| dx | number | 是 | 图像的左上角在目标canvas上x轴的位置。 |
| dy | number | 是 | 图像的左上角在目标canvas上y轴的位置。 |
| dWidth | number | 否 | 在目标画布上绘制图像的宽度，允许对绘制的图像进行缩放。 |
| dHeight | number | 否 | 在目标画布上绘制图像的高度，允许对绘制的图像进行缩放。 |

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
has.chooseImage({
  success: (res) => {
    ctx.drawImage(res.tempFilePaths[0], 0, 0, 150, 100);
    ctx.draw();
  }
});
```

### CanvasContext.fill

CanvasContext.fill()

对当前路径中的内容进行填充。默认的填充色为黑色。

**起始版本：** 1.0.0

**示例：**

使用draw方法绘制结果。

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.moveTo(10, 10);
ctx.lineTo(100, 10);
ctx.lineTo(100, 100);
ctx.fill();
ctx.draw();
```

### CanvasContext.fillRect

CanvasContext.fillRect(number x, number y, number width, number height)

填充一个矩形。用 setFillStyle 设置矩形的填充色，如果没有设置，默认是黑色。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| x | number | 是 | 矩形路径左上角的横坐标。 |
| y | number | 是 | 矩形路径左上角的纵坐标。 |
| width | number | 是 | 矩形路径的宽度。 |
| height | number | 是 | 矩形路径的高度。 |

**示例：**

使用draw方法绘制结果。

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.setFillStyle('blue');
ctx.fillRect(10, 10, 150, 75);
ctx.draw();
```

### CanvasContext.fillText

CanvasContext.fillText(string text, number x, number y, number maxWidth)

在画布上绘制被填充的文本。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| text | string | 是 | 在画布上输出的文本。 |
| x | number | 是 | 绘制文本的左上角x坐标位置。 |
| y | number | 是 | 绘制文本的左上角y坐标位置。 |
| maxWidth | number | 否 | 需要绘制的最大宽度。 |

**示例：**

使用draw方法绘制结果。

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.setFontSize(20);
ctx.fillText('Hello', 20, 20);
ctx.fillText('Webapp', 100, 100);
ctx.draw();
```

### CanvasContext.lineTo

CanvasContext.lineTo(number x, number y)

增加一个新点，然后创建一条从上次指定点到目标点的线。用 stroke方法来画线条。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| x | number | 是 | 目标位置的x坐标。 |
| y | number | 是 | 目标位置的y坐标。 |

**示例：**

使用draw方法绘制结果。

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.moveTo(10, 10);
ctx.lineTo(210, 60);
ctx.stroke();
ctx.draw();
```

### CanvasContext.measureText

CanvasContext.measureText(string text): number

测量文本尺寸信息。目前仅返回文本宽度。同步接口。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| text | string | 是 | 要测量的文本。 |

**返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| width | number | 文本的宽度。 |

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.setFontSize(20);
let metrics = ctx.measureText('hello world');
```

### CanvasContext.moveTo

CanvasContext.moveTo(number x, number y)

把路径移动到画布中的指定点，不创建线条。用 stroke方法来画线条。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| x | number | 是 | 目标位置的x坐标。 |
| y | number | 是 | 目标位置的y坐标。 |

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.moveTo(10, 10);
ctx.lineTo(100, 10);
ctx.moveTo(10, 50);
ctx.lineTo(100, 50);
ctx.stroke();
ctx.draw();
```

### CanvasContext.quadraticCurveTo

CanvasContext.quadraticCurveTo(number cpx, number cpy, number x, number y)

创建二次贝塞尔曲线路径。曲线的起始点为路径中前一个点。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| cpx | number | 是 | 贝塞尔控制点的x坐标。 |
| cpy | number | 是 | 贝塞尔控制点的y坐标。 |
| x | number | 是 | 结束点的x坐标。 |
| y | number | 是 | 结束点的y坐标。 |

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.beginPath();
ctx.moveTo(20, 20);
ctx.quadraticCurveTo(110, 100, 200, 20);
ctx.stroke();
ctx.draw();
```

### CanvasContext.rect

CanvasContext.rect(number x, number y, number width, number height)

创建一个矩形路径。需要用 [CanvasContext.fill](#canvascontextfill) 或者 [CanvasContext.stroke](#canvascontextstroke)方法将矩形真正的画到canvas中。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| x | number | 是 | 矩形路径左上角的横坐标。 |
| y | number | 是 | 矩形路径左上角的纵坐标。 |
| width | number | 是 | 矩形路径的宽度。 |
| height | number | 是 | 矩形路径的高度。 |

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.rect(10, 10, 150, 75);
ctx.setFillStyle('blue');
ctx.fill();
ctx.draw();
```

### CanvasContext.restore

CanvasContext.restore()

恢复之前保存的绘图上下文。

**起始版本：** 1.0.0

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.save();
ctx.setFillStyle('blue');
ctx.fillRect(10, 10, 150, 100);
ctx.restore();
ctx.fillRect(50, 50, 150, 100);
ctx.draw();
```

### CanvasContext.rotate

CanvasContext.rotate(number rotate)

以原点为中心顺时针旋转当前坐标轴。多次调用旋转的角度会叠加。原点可以用 [CanvasContext.translate](#canvascontexttranslate)方法修改。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| rotate | number | 是 | 旋转角度，以弧度计degrees \* Math.PI/180；degrees范围为0 ~ 360。 |

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.strokeRect(100, 10, 150, 100);
ctx.rotate(20 * Math.PI / 180);
ctx.strokeRect(100, 10, 150, 100);
ctx.rotate(20 * Math.PI / 180);
ctx.strokeRect(100, 10, 150, 100);
ctx.draw();
```

### CanvasContext.save

CanvasContext.save()

保存绘图上下文。

**起始版本：** 1.0.0

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.save();
ctx.setFillStyle('blue');
ctx.fillRect(10, 10, 150, 100);
ctx.restore();
ctx.fillRect(50, 50, 150, 100);
ctx.draw();
```

### CanvasContext.scale

CanvasContext.scale(number scaleWidth, number scaleHeight)

在调用后，之后创建的路径其横、纵坐标会被缩放。多次调用倍数会相乘。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| scaleWidth | number | 是 | 横坐标缩放的倍数 (1 = 100%，0.5 = 50%，2 = 200%)。 |
| scaleHeight | number | 是 | 纵坐标轴缩放的倍数 (1 = 100%，0.5 = 50%，2 = 200%)。 |

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.beginPath();
ctx.moveTo(20, 20);
ctx.lineTo(100, 20);
ctx.arcTo(150, 20, 150, 70, 50);
ctx.lineTo(150, 120);
ctx.stroke();
ctx.scale(2, 2);
ctx.stokeRect(20,20,30,15);
ctx.draw;
```

### CanvasContext.setFillStyle

CanvasContext.setFillStyle(string | CanvasGradient color)

设置填充色。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| color | string \| [CanvasGradient](#canvasgradient) | black | 否 | 填充的颜色。 |

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.setFillStyle('blue');
ctx.fillRect(10, 10, 150, 75);
ctx.draw();
```

### CanvasContext.setFontSize

CanvasContext.setFontSize(number fontSize)

设置字体的字号。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| fontSize | number | 是 | 字体的字号。 |

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.setFontSize(20);
ctx.fillText('20', 20, 20);
ctx.setFontSize(30);
ctx.fillText('30', 40, 40);
ctx.draw();
```

### CanvasContext.setGlobalAlpha

CanvasContext.setGlobalAlpha(number alpha)

设置全局画笔透明度。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| alpha | number | 是 | 透明度。范围 0 ~ 1。<br/>0：表示完全透明。<br/>1：表示完全不透明。 |

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.setFillStyle('blue');
ctx.fillRect(10, 10, 150, 100);
ctx.setGlobalAlpha(0.5);
ctx.setFillStyle('red');
ctx.fillRect(50, 50, 150, 100);
ctx.setFillStyle('red');
ctx.fillRect(100, 100, 150, 100);
ctx.draw();
```

### CanvasContext.setLineCap

CanvasContext.setLineCap(string lineCap)

设置线条的端点样式。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| lineCap | string | 是 | 线条的结束端点样式。<br/>butt：向线条的每个末端添加平直的边缘。<br/>round：向线条的每个末端添加圆形线帽。<br/>square：向线条的每个末端添加正方形线帽。 |

**示例：**

```js
const ctx = has.createCanvasContext('firstCanvas');
ctx.beginPath();
ctx.moveTo(10, 10);
ctx.lineTo(150, 10);
ctx.stroke();
ctx.beginPath();
ctx.setLineCap('square');
ctx.setLineWidth(10);
ctx.moveTo(10, 70);
ctx.lineTo(150, 70);
ctx.stroke();
ctx.beginPath();
ctx.setLineCap('round');
ctx.setLineWidth(10);
ctx.moveTo(10, 50);
ctx.lineTo(150, 50);
ctx.stroke();
ctx.beginPath();
ctx.setLineCap('butt');
ctx.setLineWidth(10);
ctx.moveTo(10, 30);
ctx.lineTo(150, 30);
ctx.stroke();
ctx.draw();
```

### CanvasContext.setLineDash

CanvasContext.setLineDash(Array&lt;number&gt; pattern, number offset)

设置虚线样式。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| pattern | Array&lt;number&gt; | - | 是 | 一组描述交替绘制线段和间距（坐标空间单位）长度的数字。 |
| offset | number | 0 | 否 | 虚线偏移量。 |

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.setLineDash([10, 20], 5);
ctx.beginPath();
ctx.moveTo(0,100);
ctx.lineTo(500, 100);
ctx.stroke();
ctx.draw();
```

### CanvasContext.setLineJoin

CanvasContext.setLineJoin(string lineJoin)

设置线条的交点样式。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| lineJoin | string | 是 | 线条的结束交点样式。<br/>bevel：斜角<br/>round：圆角<br/>miter：尖角 |

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.beginPath();
ctx.moveTo(10, 10);
ctx.lineTo(100, 50);
ctx.lineTo(10, 90);
ctx.stroke();
ctx.beginPath();
ctx.setLineJoin('bevel');
ctx.setLineWidth(10);
ctx.moveTo(50, 10);
ctx.lineTo(140, 50);
ctx.lineTo(50, 90);
ctx.stroke();
ctx.beginPath();
ctx.setLineJoin('round');
ctx.setLineWidth(10);
ctx.moveTo(90, 10);
ctx.lineTo(180, 50);
ctx.lineTo(90, 90);
ctx.stroke();
ctx.beginPath();
ctx.setLineJoin('miter');
ctx.setLineWidth(10);
ctx.moveTo(130, 10);
ctx.lineTo(220, 50);
ctx.lineTo(130, 90);
ctx.stroke();
ctx.draw();
```

### CanvasContext.setLineWidth

CanvasContext.setLineWidth(number lineWidth)

设置线条的宽度。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| lineWidth | number | 是 | 线条的宽度，单位px。 |

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.beginPath();
ctx.moveTo(10, 10);
ctx.lineTo(150, 10);
ctx.stroke();
ctx.beginPath();
ctx.setLineWidth(5);
ctx.moveTo(10, 30);
ctx.lineTo(150, 30);
ctx.stroke();
ctx.beginPath();
ctx.setLineWidth(10);
ctx.moveTo(10, 50);
ctx.lineTo(150, 50);
ctx.stroke();
ctx.draw();
```

### CanvasContext.setMiterLimit

CanvasContext.setMiterLimit(number miterLimit)

设置最大斜接长度。斜接长度指的是在两条线交汇处内角和外角之间的距离。

当[CanvasContext.setLineJoin](#canvascontextsetlinejoin)为miter时才有效。超过最大倾斜长度时，连接处将以lineJoin为bevel来显示。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| miterLimit | number | 是 | 最大斜接长度。 |

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.beginPath();
ctx.setLineWidth(10);
ctx.setLineJoin('miter');
ctx.setMiterLimit(1);
ctx.moveTo(10, 10);
ctx.lineTo(100, 50);
ctx.lineTo(10, 90);
ctx.stroke();
ctx.beginPath();
ctx.setLineWidth(10);
ctx.setLineJoin('miter');
ctx.setMiterLimit(2);
ctx.moveTo(50, 10);
ctx.lineTo(140, 50);
ctx.lineTo(50, 90);
ctx.stroke();
ctx.beginPath();
ctx.setLineWidth(10);
ctx.setLineJoin('miter');
ctx.setMiterLimit(3);
ctx.moveTo(90, 10);
ctx.lineTo(180, 50);
ctx.lineTo(90, 90);
ctx.stroke();
ctx.beginPath();
ctx.setLineWidth(10);
ctx.setLineJoin('miter');
ctx.setMiterLimit(4);
ctx.moveTo(130, 10);
ctx.lineTo(220, 50);
ctx.lineTo(130, 90);
ctx.stroke();
ctx.draw();
```

### CanvasContext.setShadow

CanvasContext.setShadow(number offsetX, number offsetY, number blur, string color)

设定阴影样式。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | ------ |
| offsetX | number | 是 | 阴影相对于形状在水平方向的偏移。 |
| offsetY | number | 是 | 阴影相对于形状在竖直方向的偏移。 |
| blur | number | 是 | 阴影的模糊级别，数值越大越模糊。范围0 ~ 100。 |
| color | string | 是 | 阴影的颜色。 |

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.setFillStyle('blue');
ctx.setShadow(10, 50, 50, 'blue');
ctx.fillRect(10, 10, 150, 75);
ctx.draw();
```

### CanvasContext.setStrokeStyle

CanvasContext.setStrokeStyle(string | CanvasGradient color)

设置描边颜色。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| color | string \| [CanvasGradient](#canvasgradient) | black | 否 | 描边的颜色。 |

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.setStrokeStyle('blue');
ctx.strokeRect(10, 10, 150, 75);
ctx.draw();
```

### CanvasContext.setTextAlign

CanvasContext.setTextAlign(string align)

设置文字的对齐方式。

- 使用setTextAlign方法设置文字竖直对齐样式，样式只能取值合法值。
- 使用draw方法绘制结果。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| align | string | 是 | 文字的对齐方式。 |

**align的合法值：**

| 值 | 描述 |
| -------- | -------- |
| left | 左对齐。 |
| center | 居中对齐。 |
| right | 右对齐。 |

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.moveTo(150, 20);
ctx.lineTo(150, 170);
ctx.stroke();
ctx.setFontSize(15);
ctx.setTextAlign('left');
ctx.fillText('textAlign=left', 150, 60);
ctx.setTextAlign('right');
ctx.fillText('textAlign=right', 150, 100);
ctx.setTextAlign('center');
ctx.fillText('textAlign=center', 150, 80);
ctx.draw();
```

### CanvasContext.setTransform

CanvasContext.setTransform(number scaleX, number skewX, number skewY, number scaleY, number translateX, number translateY)

使用矩阵重新设置（覆盖）当前变换的方法。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| scaleX | number | 是 | 水平缩放。 |
| skewX | number | 是 | 水平倾斜。 |
| skewY | number | 是 | 垂直倾斜。 |
| scaleY | number | 是 | 垂直缩放。 |
| translateX | number | 是 | 水平移动。 |
| translateY | number | 是 | 垂直移动。 |

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.fillStyle = '#FFFF00';
ctx.fillRect(0, 0, 250, 100);
ctx.setTransform(1, 0.5, -0.5, 1, 30, 10);
ctx.fillStyle = 'blue';
ctx.fillRect(0, 0, 250, 100);
ctx.setTransform(1, 0.5, -0.5, 1, 30, 10);
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, 250, 100);
ctx.draw();
```

### CanvasContext.stroke

CanvasContext.stroke()

画出当前路径的边框。默认颜色为黑色。

**起始版本：** 1.0.4

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.moveTo(10, 10);
ctx.lineTo(100, 10);
ctx.lineTo(100, 100);
ctx.stroke();
ctx.draw();
```

### CanvasContext.strokeRect

CanvasContext.strokeRect(number x, number y, number width, number height)

画一个矩形（非填充）。 用[CanvasContext.setStrokeStyle](#canvascontextsetstrokestyle)设置矩形线条的颜色，如果没设置默认是黑色。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| x | number | 是 | 矩形路径左上角的横坐标。 |
| y | number | 是 | 矩形路径左上角的纵坐标。 |
| width | number | 是 | 矩形路径的宽度。 |
| height | number | 是 | 矩形路径的高度。 |

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.setStrokeStyle('blue');
ctx.strokeRect(10, 10, 150, 75);
ctx.draw();
```

### CanvasContext.strokeText

CanvasContext.strokeText(string text, number x, number y, number maxWidth)

给定的(x, y)位置绘制文本描边的方法。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| text | string | 是 | 要绘制的文本。 |
| x | number | 是 | 文本起始点的x轴坐标。 |
| y | number | 是 | 文本起始点的y轴坐标。 |
| maxWidth | number | 否 | 需要绘制的最大宽度。 |

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.setFontSize(20);
ctx.strokeText('Hello Web!', 10, 50);
ctx.setFontSize(30);
let gradient = ctx.createLinearGradient(0, 0, 200, 0);
gradient.addColorStop('0', 'magenta');
gradient.addColorStop('0.5', 'blue');
gradient.addColorStop('1.0', 'black');
ctx.strokeStyle = gradient;
ctx.strokeText('atomicservice.com', 10, 90);
ctx.draw();
```

### CanvasContext.transform

CanvasContext.transform(number scaleX, number skewX, number skewY, number scaleY, number translateX, number translateY)

使用矩阵多次叠加当前变换的方法。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| scaleX | number | 是 | 水平缩放。 |
| skewX | number | 是 | 水平倾斜。 |
| skewY | number | 是 | 垂直倾斜。 |
| scaleY | number | 是 | 垂直缩放。 |
| translateX | number | 是 | 水平移动。 |
| translateY | number | 是 | 垂直移动。 |

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.fillStyle = '#FFFF00';
ctx.fillRect(0, 0, 250, 100);
ctx.transform(1, 0.5, -0.5, 1, 30, 10);
ctx.fillStyle = 'blue';
ctx.fillRect(0, 0, 250, 100);
ctx.transform(1, 0.5, -0.5, 1, 30, 10);
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, 250, 100);
ctx.draw();
```

### CanvasContext.translate

CanvasContext.translate(number x, number y)

对当前坐标系的原点 (0, 0) 进行变换。默认的坐标系原点为页面左上角。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| x | number | 是 | 水平坐标平移量。 |
| y | number | 是 | 竖直坐标平移量。 |

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.strokeRect(10, 10, 150, 100);
ctx.translate(20, 20);
ctx.strokeRect(10, 10, 150, 100);
ctx.translate(20, 20);
ctx.strokeRect(10, 10, 150, 100);
ctx.draw();
```

### CanvasContext.setTextBaseline

CanvasContext.setTextBaseline(string textBaseline)

设置文字的竖直对齐方式。

- 使用setTextBaseLine方法设置文字竖直对齐样式，样式只能取值合法值。
- 使用draw方法绘制结果。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| textBaseline | string | 是 | 文字的竖直对齐方式。<br/>top：顶部对齐。<br/>bottom：底部对齐。<br/>middle：居中对齐。<br/>normal：标准的字母基线对齐（默认对齐方式）。 |

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.moveTo(5, 75);
ctx.lineTo(295, 75);
ctx.stroke();
ctx.setFontSize(20);
ctx.setTextBaseline('normal');
ctx.fillText('normal', 200, 75);
ctx.setTextBaseline('top');
ctx.fillText('top', 5, 75);
ctx.setTextBaseline('middle');
ctx.fillText('middle', 50, 75);
ctx.setTextBaseline('bottom');
ctx.fillText('bottom', 120, 75);
ctx.draw();
```

### CanvasContext.clearRect

CanvasContext.clearRect(number x, number y, number width, number height)

清除画布上在该矩形区域内的内容。

**起始版本：** 1.0.3

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| x | number | 是 | 矩形路径左上角的横坐标。 |
| y | number | 是 | 矩形路径左上角的纵坐标。 |
| width | number | 是 | 矩形路径的宽度，单位vp。 |
| height | number | 是 | 矩形路径的高度，单位vp。 |

**示例：**

使用draw方法绘制结果。

```js
const ctx = has.createCanvasContext('myCanvas');
ctx.setFillStyle('red');
ctx.fillRect(0, 0, 150, 200);
ctx.setFillStyle('blue');
ctx.fillRect(150, 0, 150, 200);
ctx.clearRect(10, 10, 150, 75);
ctx.draw();
```

### CanvasContext.createPattern

CanvasContext.createPattern(string image, string repetition);

对指定的图像创建模式的方法，可在指定的方向上重复元图像。

**起始版本：** 1.0.3

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| image | string | 是 | 重复的图像源，支持代码包路径和本地临时路径（本地路径） |
| repetition | string | 是 | 如何重复图像。<br/>repeat：水平竖直方向都重复。<br/>repeat-x：水平方向重复。<br/>repeat-y：竖直方向重复。<br/>no-repeat：不重复。 |

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
const pattern = canvas.createPattern('internal://files/startIcon.png', 'repeat');
ctx.setFillStyle(pattern);
ctx.fillRect(10, 10, 100, 100);
ctx.draw();
```

## CanvasGradient

### CanvasGradient.addColorStop

CanvasGradient.addColorStop(number stop, string color)

添加颜色的渐变点。小于最小stop的部分会按最小stop的color来渲染，大于最大stop的部分会按最大stop的color来渲染。

- 使用addColorStop方法在渐变对象中添加颜色的渐变点。
- 使用setFillStyle方法将渐变对象设置为填充色。
- 使用draw方法绘制结果。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| stop | number | 是 | 表示渐变中开始与结束之间的位置，范围 0 ~ 1。 |
| color | string | 是 | 渐变点的颜色。 |

**示例：**

```js
const ctx = has.createCanvasContext('myCanvas');
// Create circular gradient
const grd = ctx.createLinearGradient(30, 10, 120, 10);
grd.addColorStop(0, 'red');
grd.addColorStop(0, 'white');
grd.addColorStop(0, 'blue');
grd.addColorStop(0, 'gray');
grd.addColorStop(0, 'green');
grd.addColorStop(0, 'black');
// Fill with gradient
ctx.setFillStyle(grd);
ctx.fillRect(10, 10, 150, 80);
ctx.draw();
```
