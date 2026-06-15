# 动画

## has.createAnimation

has.createAnimation(Object object): Animation

创建一个动画实例[Animation](#animation)。调用实例的方法来描述动画。最后通过动画实例的[Animation.export](#animationexport)方法导出动画数据传递给组件的animation属性。

**起始版本：** 1.0.10

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| duration | number | 400 | 否 | 动画持续时间，单位ms。 |
| timingFunction | string | 'linear' | 否 | 动画的效果，支持以下合法值：<br/>- 'linear'：动画从头到尾的速度相同。<br/>- 'ease'：动画以低速开始，然后加快，在结束前变慢。<br/>- 'ease-in'：动画以低速开始。<br/>- 'ease-in-out'：动画以低速开始和结束。<br/>- 'ease-out'：动画以低速结束。<br/>- 'step-start'：动画第一帧就跳至结束状态直到结束。<br/>- 'step-end'：动画一直保持开始状态，最后一帧跳到结束状态。 |
| delay | number | 0 | 否 | 动画延迟时间，单位ms。 |
| transformOrigin | string | '50% 50% 0' | 否 | 动画的参考原点。 |

**返回值：**

返回[Animation](#animation)对象。

**示例：**

hxml文件：

```html
<view class="animation-view" animation="{{animationData}}">test view</view>
```

js文件：

```js
// 需要在页面的data中声明animationData: {}
this.animationData = has.createAnimation({
  duration: 2000,
  timingFunction: 'linear',
  transformOrigin: '50% 50% 0',
  delay: 400
});
```

## Animation

动画对象。

### Animation.backgroundColor

Animation.backgroundColor(string value): Animation

为动画对象设置背景色。

**起始版本：** 1.0.10

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| value | string | 否 | 设置的颜色值，不传则将该属性还原为组件css样式默认值。 |

**返回值：**

返回[Animation](#animation)对象。

**示例：**

hxml文件：

```html
<view class="animation-view" animation="{{animationData}}">test view</view>
```

js文件：

```js
// 需要在页面的data中声明animationData: {}
this.animationData = has.createAnimation({
  duration: 2000,
  timingFunction: 'linear',
  transformOrigin: '50% 50% 0',
  delay: 400
});
this.animationData.backgroundColor('#ff0000').step();
this.setData({
  animationData: this.animationData.export()
});
```

### Animation.bottom

Animation.bottom(number|string value): Animation

为动画对象设置bottom值，即底部距离。

**起始版本：** 1.0.10

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| value | number\|string | 否 | 长度数值，如果传入 number 则默认使用 px，可传入其他自定义单位的长度值。不传则将该属性还原为组件css样式默认值。 |

**返回值：**

返回[Animation](#animation)对象。

**示例：**

hxml文件：

```html
<view class="animation-view" animation="{{animationData}}">test view</view>
```

js文件：

```js
// 需要在页面的data中声明animationData: {}
this.animationData = has.createAnimation({
  duration: 2000,
  timingFunction: 'linear',
  transformOrigin: '50% 50% 0',
  delay: 400
});
this.animationData.bottom(100).step();
this.setData({
  animationData: this.animationData.export()
});
```

### Animation.export

Animation.export(): Object

导出动画队列并清除掉之前的动画操作。

**起始版本：** 1.0.10

**返回值：**

返回导出的包含动画操作队列的列表对象。

**示例：**

hxml文件：

```html
<view class="animation-view" animation="{{animationData}}">test view</view>
```

js文件：

```js
// 需要在页面的data中声明animationData: {}
this.animationData = has.createAnimation({
  duration: 2000,
  timingFunction: 'linear',
  transformOrigin: '50% 50% 0',
  delay: 400
});
this.animationData.width(100).step();
this.setData({
  animationData: this.animationData.export()
});
```

### Animation.height

Animation.height(number|string value): Animation

为动画对象设置高度。

**起始版本：** 1.0.10

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| value | number\|string | 否 | 长度数值，如果传入 number 则默认使用 px，可传入其他自定义单位的长度值。不传则将该属性还原为组件css样式默认值。 |

**返回值：**

返回[Animation](#animation)对象。

**示例：**

hxml文件：

```html
<view class="animation-view" animation="{{animationData}}">test view</view>
```

js文件：

```js
// 需要在页面的data中声明animationData: {}
this.animationData = has.createAnimation({
  duration: 2000,
  timingFunction: 'linear',
  transformOrigin: '50% 50% 0',
  delay: 400
});
this.animationData.height(100).step();
this.setData({
  animationData: this.animationData.export()
});
```

### Animation.left

Animation.left(number|string value): Animation

为动画对象设置left值，即左侧距离。

**起始版本：** 1.0.10

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| value | number\|string | 否 | 长度数值，如果传入 number 则默认使用 px，可传入其他自定义单位的长度值。不传则将该属性还原为组件css样式默认值。 |

**返回值：**

返回[Animation](#animation)对象。

**示例：**

hxml文件：

```html
<view class="animation-view" animation="{{animationData}}">test view</view>
```

js文件：

```js
// 需要在页面的data中声明animationData: {}
this.animationData = has.createAnimation({
  duration: 2000,
  timingFunction: 'linear',
  transformOrigin: '50% 50% 0',
  delay: 400
});
this.animationData.left(100).step();
this.setData({
  animationData: this.animationData.export()
});
```

### Animation.matrix

Animation.matrix(number a, number b, number c, number d, number tx, number ty): Animation

对动画对象进行矩阵变化（matrix），可参考[MDN标准](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix)。

**起始版本：** 1.0.10

**参数：**

各参数在matrix3d的4×4变化矩阵中的位置如图所示。

![Animation-matrix](figures/Animation-matrix.png)

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| a | number | 1 | 否 | 变换矩阵第一行第一列的参数。 |
| b | number | 0 | 否 | 变换矩阵第二行第一列的参数。 |
| c | number | 0 | 否 | 变换矩阵第一行第二列的参数。 |
| d | number | 1 | 否 | 变换矩阵第二行第二列的参数。 |
| tx | number | 1 | 否 | 变换矩阵第一行第四列的参数。 |
| ty | number | 1 | 否 | 变换矩阵第二行第四列的参数。 |

**返回值：**

返回[Animation](#animation)对象。

**示例：**

hxml文件：

```html
<view class="animation-view" animation="{{animationData}}">test view</view>
```

js文件：

```js
// 需要在页面的data中声明animationData: {}
this.animationData = has.createAnimation({
  duration: 2000,
  timingFunction: 'linear',
  transformOrigin: '50% 50% 0',
  delay: 400
});
this.animationData.matrix(1.2, 0.2, -1, 0.9, 0, 20).step();
this.setData({
  animationData: this.animationData.export()
});
```

### Animation.matrix3d

Animation.matrix3d(number a1, number b1, number c1, number d1, number a2, number b2, number c2, number d2, number a3, number b3, number c3, number d3, number a4, number b4, number c4, number d4): Animation

对动画对象进行矩阵变化（matrix3d），可参考[MDN标准](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix3d)。

**起始版本：** 1.0.10

**参数：**

各参数在matrix3d的4×4变化矩阵中的位置如图所示。

![Animation-matrix3d](figures/Animation-matrix3d.png)

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| a1 | number | 1 | 否 | 变换矩阵第一行第一列的参数。 |
| a2 | number | 0 | 否 | 变换矩阵第一行第二列的参数。 |
| a3 | number | 0 | 否 | 变换矩阵第一行第三列的参数。 |
| a4 | number | 0 | 否 | 变换矩阵第一行第四列的参数。 |
| b1 | number | 0 | 否 | 变换矩阵第二行第一列的参数。 |
| b2 | number | 1 | 否 | 变换矩阵第二行第二列的参数。 |
| b3 | number | 0 | 否 | 变换矩阵第二行第三列的参数。 |
| b4 | number | 0 | 否 | 变换矩阵第二行第四列的参数。 |
| c1 | number | 0 | 否 | 变换矩阵第三行第一列的参数。 |
| c2 | number | 0 | 否 | 变换矩阵第三行第二列的参数。 |
| c3 | number | 1 | 否 | 变换矩阵第三行第三列的参数。 |
| c4 | number | 0 | 否 | 变换矩阵第三行第四列的参数。 |
| d1 | number | 0 | 否 | 变换矩阵第四行第一列的参数。 |
| d2 | number | 0 | 否 | 变换矩阵第四行第二列的参数。 |
| d3 | number | 0 | 否 | 变换矩阵第四行第三列的参数。 |
| d4 | number | 1 | 否 | 变换矩阵第四行第四列的参数。 |

**返回值：**

返回[Animation](#animation)对象。

**示例：**

hxml文件：

```html
<view class="animation-view" animation="{{animationData}}">test view</view>
```

js文件：

```js
// 需要在页面的data中声明animationData: {}
this.animationData = has.createAnimation({
  duration: 2000,
  timingFunction: 'linear',
  transformOrigin: '50% 50% 0',
  delay: 400
});
this.animationData.matrix3d(
  0.5, 0, -0.866025, 0,
  0.595877, 1.2, -1.03209, 0,
  0.866025, 0, 0.5, 0,
  25.9808, 0, 15, 1
).step();
this.setData({
  animationData: this.animationData.export()
});
```

### Animation.opacity

Animation.opacity(number value): Animation

为动画对象设置透明度。

**起始版本：** 1.0.10

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| value | number | 否 | 透明度值，合法范围[0, 1]，0表示完全透明，1表示不透明。不传则将该属性还原为组件css样式默认值。 |

**返回值：**

返回[Animation](#animation)对象。

**示例：**

hxml文件：

```html
<view class="animation-view" animation="{{animationData}}">test view</view>
```

js文件：

```js
// 需要在页面的data中声明animationData: {}
this.animationData = has.createAnimation({
  duration: 2000,
  timingFunction: 'linear',
  transformOrigin: '50% 50% 0',
  delay: 400
});
this.animationData.opacity(0.5).step();
this.setData({
  animationData: this.animationData.export()
});
```

### Animation.right

Animation.right(number|string value): Animation

为动画对象设置right值，即右侧距离。

**起始版本：** 1.0.10

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| value | number\|string | 否 | 长度数值，如果传入 number 则默认使用 px，可传入其他自定义单位的长度值。不传则将该属性还原为组件css样式默认值。 |

**返回值：**

返回[Animation](#animation)对象。

**示例：**

hxml文件：

```html
<view class="animation-view" animation="{{animationData}}">test view</view>
```

js文件：

```js
// 需要在页面的data中声明animationData: {}
this.animationData = has.createAnimation({
  duration: 2000,
  timingFunction: 'linear',
  transformOrigin: '50% 50% 0',
  delay: 400
});
this.animationData.right(100).step();
this.setData({
  animationData: this.animationData.export()
});
```

### Animation.rotate

Animation.rotate(number angle): Animation

将动画对象顺时针旋转指定角度。

**起始版本：** 1.0.10

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| angle | number | 否 | 旋转的角度，正数表示顺时针旋转。不传则将该属性还原为组件css样式默认值。 |

**返回值：**

返回[Animation](#animation)对象。

**示例：**

hxml文件：

```html
<view class="animation-view" animation="{{animationData}}">test view</view>
```

js文件：

```js
// 需要在页面的data中声明animationData: {}
this.animationData = has.createAnimation({
  duration: 2000,
  timingFunction: 'linear',
  transformOrigin: '50% 50% 0',
  delay: 400
});
this.animationData.rotate(45).step();
this.setData({
  animationData: this.animationData.export()
});
```

### Animation.rotate3d

Animation.rotate3d(number x, number y, number z, number angle): Animation

将动画对象绕旋转轴顺时针旋转指定角度。

**起始版本：** 1.0.10

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| x | number | 否 | 旋转轴x坐标，默认值为0。 |
| y | number | 否 | 旋转轴y坐标，默认值为0。 |
| z | number | 否 | 旋转轴z坐标，默认值为0。 |
| angle | number | 否 | 旋转的角度，正数表示顺时针旋转。不传则将该属性还原为组件css样式默认值。 |

**返回值：**

返回[Animation](#animation)对象。

**示例：**

hxml文件：

```html
<view class="animation-view" animation="{{animationData}}">test view</view>
```

js文件：

```js
// 需要在页面的data中声明animationData: {}
this.animationData = has.createAnimation({
  duration: 2000,
  timingFunction: 'linear',
  transformOrigin: '50% 50% 0',
  delay: 400
});
this.animationData.rotate3d(1, 1, 1, 45).step();
this.setData({
  animationData: this.animationData.export()
});
```

### Animation.rotateX

Animation.rotateX(number angle): Animation

将动画对象绕X轴顺时针旋转指定角度。

**起始版本：** 1.0.10

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| angle | number | 否 | 旋转的角度，正数表示顺时针旋转。不传则将该属性还原为组件css样式默认值。 |

**返回值：**

返回[Animation](#animation)对象。

**示例：**

hxml文件：

```html
<view class="animation-view" animation="{{animationData}}">test view</view>
```

js文件：

```js
// 需要在页面的data中声明animationData: {}
this.animationData = has.createAnimation({
  duration: 2000,
  timingFunction: 'linear',
  transformOrigin: '50% 50% 0',
  delay: 400
});
this.animationData.rotateX(45).step();
this.setData({
  animationData: this.animationData.export()
});
```

### Animation.rotateY

Animation.rotateY(number angle): Animation

将动画对象绕Y轴顺时针旋转指定角度。

**起始版本：** 1.0.10

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| angle | number | 否 | 旋转的角度，正数表示顺时针旋转。不传则将该属性还原为组件css样式默认值。 |

**返回值：**

返回[Animation](#animation)对象。

**示例：**

hxml文件：

```html
<view class="animation-view" animation="{{animationData}}">test view</view>
```

js文件：

```js
// 需要在页面的data中声明animationData: {}
this.animationData = has.createAnimation({
  duration: 2000,
  timingFunction: 'linear',
  transformOrigin: '50% 50% 0',
  delay: 400
});
this.animationData.rotateY(45).step();
this.setData({
  animationData: this.animationData.export()
});
```

### Animation.rotateZ

Animation.rotateZ(number angle): Animation

将动画对象绕Z轴顺时针旋转指定角度。

**起始版本：** 1.0.10

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| angle | number | 否 | 旋转的角度，正数表示顺时针旋转。不传则将该属性还原为组件css样式默认值。 |

**返回值：**

返回[Animation](#animation)对象。

**示例：**

hxml文件：

```html
<view class="animation-view" animation="{{animationData}}">test view</view>
```

js文件：

```js
// 需要在页面的data中声明animationData: {}
this.animationData = has.createAnimation({
  duration: 2000,
  timingFunction: 'linear',
  transformOrigin: '50% 50% 0',
  delay: 400
});
this.animationData.rotateZ(45).step();
this.setData({
  animationData: this.animationData.export()
});
```

### Animation.scale

Animation.scale(number sx, number sy): Animation

对动画对象进行X轴和Y轴的缩放。

**起始版本：** 1.0.10

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| sx | number | 否 | X轴缩放倍数。当仅有sx参数时，X轴Y轴均缩放sx倍。不传则将该属性还原为组件css样式默认值。 |
| sy | number | 否 | Y轴缩放倍数。不传则将该属性还原为组件css样式默认值。 |

**返回值：**

返回[Animation](#animation)对象。

**示例：**

hxml文件：

```html
<view class="animation-view" animation="{{animationData}}">test view</view>
```

js文件：

```js
// 需要在页面的data中声明animationData: {}
this.animationData = has.createAnimation({
  duration: 2000,
  timingFunction: 'linear',
  transformOrigin: '50% 50% 0',
  delay: 400
});
this.animationData.scale(2, 2).step();
this.setData({
  animationData: this.animationData.export()
});
```

### Animation.scale3d

Animation.scale3d(number sx, number sy, number sz): Animation

对动画对象进行X轴、Y轴和Z轴的缩放。

**起始版本：** 1.0.10

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| sx | number | 否 | X轴缩放倍数。不传则将该属性还原为组件css样式默认值。 |
| sy | number | 否 | Y轴缩放倍数。不传则将该属性还原为组件css样式默认值。 |
| sz | number | 否 | Z轴缩放倍数。不传则将该属性还原为组件css样式默认值。 |

**返回值：**

返回[Animation](#animation)对象。

**示例：**

hxml文件：

```html
<view class="animation-view" animation="{{animationData}}">test view</view>
```

js文件：

```js
// 需要在页面的data中声明animationData: {}
this.animationData = has.createAnimation({
  duration: 2000,
  timingFunction: 'linear',
  transformOrigin: '50% 50% 0',
  delay: 400
});
this.animationData.scale3d(2, 2, 2).step();
this.setData({
  animationData: this.animationData.export()
});
```

### Animation.scaleX

Animation.scaleX(number scale): Animation

缩放动画对象的X轴。

**起始版本：** 1.0.10

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| scale | number | 否 | X轴缩放的倍数。不传则将该属性还原为组件css样式默认值。 |

**返回值：**

返回[Animation](#animation)对象。

**示例：**

hxml文件：

```html
<view class="animation-view" animation="{{animationData}}">test view</view>
```

js文件：

```js
// 需要在页面的data中声明animationData: {}
this.animationData = has.createAnimation({
  duration: 2000,
  timingFunction: 'linear',
  transformOrigin: '50% 50% 0',
  delay: 400
});
this.animationData.scaleX(2).step();
this.setData({
  animationData: this.animationData.export()
});
```

### Animation.scaleY

Animation.scaleY(number scale): Animation

缩放动画对象的Y轴。

**起始版本：** 1.0.10

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| scale | number | 否 | Y轴缩放的倍数。不传则将该属性还原为组件css样式默认值。 |

**返回值：**

返回[Animation](#animation)对象。

**示例：**

hxml文件：

```html
<view class="animation-view" animation="{{animationData}}">test view</view>
```

js文件：

```js
// 需要在页面的data中声明animationData: {}
this.animationData = has.createAnimation({
  duration: 2000,
  timingFunction: 'linear',
  transformOrigin: '50% 50% 0',
  delay: 400
});
this.animationData.scaleY(2).step();
this.setData({
  animationData: this.animationData.export()
});
```

### Animation.scaleZ

Animation.scaleZ(number scale): Animation

缩放动画对象的Z轴。

**起始版本：** 1.0.10

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| scale | number | 否 | Z轴缩放的倍数。不传则将该属性还原为组件css样式默认值。 |

**返回值：**

返回[Animation](#animation)对象。

**示例：**

hxml文件：

```html
<view class="animation-view" animation="{{animationData}}">test view</view>
```

js文件：

```js
// 需要在页面的data中声明animationData: {}
this.animationData = has.createAnimation({
  duration: 2000,
  timingFunction: 'linear',
  transformOrigin: '50% 50% 0',
  delay: 400
});
this.animationData.scaleZ(2).step();
this.setData({
  animationData: this.animationData.export()
});
```

### Animation.skew

Animation.skew(number ax, number ay): Animation

对动画对象的X、Y轴进行倾斜。

**起始版本：** 1.0.10

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| ax | number | 否 | X轴倾斜的角度，传入正数时向右侧倾斜。不传则将该属性还原为组件css样式默认值。 |
| ay | number | 否 | Y轴倾斜的角度，传入正数时向下侧倾斜。不传则将该属性还原为组件css样式默认值。 |

**返回值：**

返回[Animation](#animation)对象。

**示例：**

hxml文件：

```html
<view class="animation-view" animation="{{animationData}}">test view</view>
```

js文件：

```js
// 需要在页面的data中声明animationData: {}
this.animationData = has.createAnimation({
  duration: 2000,
  timingFunction: 'linear',
  transformOrigin: '50% 50% 0',
  delay: 400
});
this.animationData.skew(45, 45).step();
this.setData({
  animationData: this.animationData.export()
});
```

### Animation.skewX

Animation.skewX(number angle): Animation

对动画对象的X轴进行倾斜。

**起始版本：** 1.0.10

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| angle | number | 否 | 倾斜的角度，传入正数时向右侧倾斜。不传则将该属性还原为组件css样式默认值。 |

**返回值：**

返回[Animation](#animation)对象。

**示例：**

hxml文件：

```html
<view class="animation-view" animation="{{animationData}}">test view</view>
```

js文件：

```js
// 需要在页面的data中声明animationData: {}
this.animationData = has.createAnimation({
  duration: 2000,
  timingFunction: 'linear',
  transformOrigin: '50% 50% 0',
  delay: 400
});
this.animationData.skewX(45).step();
this.setData({
  animationData: this.animationData.export()
});
```

### Animation.skewY

Animation.skewY(number angle): Animation

对动画对象的Y轴进行倾斜。

**起始版本：** 1.0.10

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| angle | number | 否 | 倾斜的角度，传入正数时向下侧倾斜。不传则将该属性还原为组件css样式默认值。 |

**返回值：**

返回[Animation](#animation)对象。

**示例：**

hxml文件：

```html
<view class="animation-view" animation="{{animationData}}">test view</view>
```

js文件：

```js
// 需要在页面的data中声明animationData: {}
this.animationData = has.createAnimation({
  duration: 2000,
  timingFunction: 'linear',
  transformOrigin: '50% 50% 0',
  delay: 400
});
this.animationData.skewY(45).step();
this.setData({
  animationData: this.animationData.export()
});
```

### Animation.step

Animation.step(Object object): Animation

表示一组动画完成。可以在一组动画中调用任意多个动画方法，一组动画中的所有动画会同时开始，一组动画完成后才会进行下一组动画。

**起始版本：** 1.0.10

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| duration | number | 400 | 否 | 动画持续时间，单位ms。 |
| timingFunction | string | 'linear' | 否 | 动画的效果，支持以下合法值<br/>- 'linear'：动画从头到尾的速度是相同的；<br/>- 'ease'：动画以低速开始，然后加快，在结束前变慢；<br/>- 'ease-in'：动画以低速开始；<br/>- 'ease-in-out'：动画以低速开始和结束；<br/>- 'ease-out'：动画以低速结束；<br/>- 'step-start'：动画第一帧就跳至结束状态直到结束；<br/>- 'step-end'：动画一直保持开始状态，最后一帧跳到结束状态。 |
| delay | number | 0 | 否 | 动画延迟时间，单位ms。 |
| transformOrigin | string | '50% 50% 0' | 否 | 动画的参考原点。 |

**返回值：**

返回[Animation](#animation)对象。

**示例：**

hxml文件：

```html
<view class="animation-view" animation="{{animationData}}">test view</view>
```

js文件：

```js
// 需要在页面的data中声明animationData: {}
this.animationData = has.createAnimation({
  duration: 2000,
  timingFunction: 'linear',
  transformOrigin: '50% 50% 0',
  delay: 400
});
this.animationData.skewY(45).step();
this.setData({
  animationData: this.animationData.export()
});
```

### Animation.top

Animation.top(number|string value): Animation

为动画对象设置top值，即顶部距离。

**起始版本：** 1.0.10

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| value | number\|string | 否 | 长度数值，如果传入number则默认使用px，可传入其他自定义单位的长度值。不传则将该属性还原为组件css样式默认值。 |

**返回值：**

返回[Animation](#animation)对象。

**示例：**

hxml文件：

```html
<view class="animation-view" animation="{{animationData}}">test view</view>
```

js文件：

```js
// 需要在页面的data中声明animationData: {}
this.animationData = has.createAnimation({
  duration: 2000,
  timingFunction: 'linear',
  transformOrigin: '50% 50% 0',
  delay: 400
});
this.animationData.top(100).step();
this.setData({
  animationData: this.animationData.export()
});
```

### Animation.translate

Animation.translate(number tx, number ty): Animation

让动画对象在X、Y轴平移变换。

**起始版本：** 1.0.10

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| tx | number | 否 | X轴平移距离，单位px。不传则将该属性还原为组件css样式默认值。 |
| ty | number | 否 | Y轴平移距离，单位px。不传则将该属性还原为组件css样式默认值。 |

**返回值：**

返回[Animation](#animation)对象。

**示例：**

hxml文件：

```html
<view class="animation-view" animation="{{animationData}}">test view</view>
```

js文件：

```js
// 需要在页面的data中声明animationData: {}
this.animationData = has.createAnimation({
  duration: 2000,
  timingFunction: 'linear',
  transformOrigin: '50% 50% 0',
  delay: 400
});
this.animationData.translate(100, 100).step();
this.setData({
  animationData: this.animationData.export()
});
```

### Animation.translate3d

Animation.translate3d(number tx, number ty, number tz): Animation

让动画对象在X、Y、Z轴平移变换。

**起始版本：** 1.0.10

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| tx | number | 否 | X轴平移距离，单位px。不传则将该属性还原为组件css样式默认值。 |
| ty | number | 否 | Y轴平移距离，单位px。不传则将该属性还原为组件css样式默认值。 |
| tz | number | 否 | Z轴平移距离，单位px。不传则将该属性还原为组件css样式默认值。 |

**返回值：**

返回[Animation](#animation)对象。

**示例：**

hxml文件：

```html
<view class="animation-view" animation="{{animationData}}">test view</view>
```

js文件：

```js
// 需要在页面的data中声明animationData: {}
this.animationData = has.createAnimation({
  duration: 2000,
  timingFunction: 'linear',
  transformOrigin: '50% 50% 0',
  delay: 400
});
this.animationData.translate3d(100, 100, 100).step();
this.setData({
  animationData: this.animationData.export()
});
```

### Animation.translateX

Animation.translateX(number translation): Animation

让动画对象在X轴进行平移。

**起始版本：** 1.0.10

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| translation | number | 否 | X轴平移距离，单位px。不传则将该属性还原为组件css样式默认值。 |

**返回值：**

返回[Animation](#animation)对象。

**示例：**

hxml文件：

```html
<view class="animation-view" animation="{{animationData}}">test view</view>
```

js文件：

```js
// 需要在页面的data中声明animationData: {}
this.animationData = has.createAnimation({
  duration: 2000,
  timingFunction: 'linear',
  transformOrigin: '50% 50% 0',
  delay: 400
});
this.animationData.translateX(100).step();
this.setData({
  animationData: this.animationData.export()
});
```

### Animation.translateY

Animation.translateY(number translation): Animation

让动画对象在Y轴进行平移。

**起始版本：** 1.0.10

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| translation | number | 否 | Y轴平移距离，单位px。不传则将该属性还原为组件css样式默认值。 |

**返回值：**

返回[Animation](#animation)对象。

**示例：**

hxml文件：

```html
<view class="animation-view" animation="{{animationData}}">test view</view>
```

js文件：

```js
// 需要在页面的data中声明animationData: {}
this.animationData = has.createAnimation({
  duration: 2000,
  timingFunction: 'linear',
  transformOrigin: '50% 50% 0',
  delay: 400
});
this.animationData.translateY(100).step();
this.setData({
  animationData: this.animationData.export()
});
```

### Animation.translateZ

Animation.translateZ(number translation): Animation

让动画对象在Z轴进行平移。

**起始版本：** 1.0.10

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| translation | number | 否 | Z轴平移距离，单位px。不传则将该属性还原为组件css样式默认值。 |

**返回值：**

返回[Animation](#animation)对象。

**示例：**

hxml文件：

```html
<view class="animation-view" animation="{{animationData}}">test view</view>
```

js文件：

```js
// 需要在页面的data中声明animationData: {}
this.animationData = has.createAnimation({
  duration: 2000,
  timingFunction: 'linear',
  transformOrigin: '50% 50% 0',
  delay: 400
});
this.animationData.translateZ(100).step();
this.setData({
  animationData: this.animationData.export()
});
```

### Animation.width

Animation.width(number|string value): Animation

为动画对象设置宽度。

**起始版本：** 1.0.10

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| value | number\|string | 否 | 长度数值，如果传入number则默认使用px，可传入其他自定义单位的长度值。不传则将该属性还原为组件css样式默认值。 |

**返回值：**

返回[Animation](#animation)对象。

**示例：**

hxml文件：

```html
<view class="animation-view" animation="{{animationData}}">test view</view>
```

js文件：

```js
// 需要在页面的data中声明animationData: {}
this.animationData = has.createAnimation({
  duration: 2000,
  timingFunction: 'linear',
  transformOrigin: '50% 50% 0',
  delay: 400
});
this.animationData.width(100).step();
this.setData({
  animationData: this.animationData.export()
});
```
