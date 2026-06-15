# 响应事件

在页面上频繁交互时，为了减少逻辑层和视图层的通信次数，使用hjs函数用来直接响应页面事件。响应事件代码可以编写在hxml文件中的&lt;hjs&gt;标签内，也可以单独写在.hjs文件内。

## getComputedStyle

getComputedStyle(Array&lt;string&gt; attrs): Object

通过指定样式名获取元素对应的样式。

**起始版本：** 1.0.8

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| attrs | Array&lt;string&gt; | 是 | 元素样式名称，如：[ 'width', 'height', 'backgroundColor' ]。 |

**返回值：**

返回Object对象，将返回指定样式的值，如：{ 'width':'100px', 'height': '100px', 'backgroundColor':'颜色值' }。

**示例：**

```js
var computedStyle = function(event, ownerInstance) {
  if (ownerInstance.getComputedStyle) {
    // 使用前需要判空
    var result = ownerInstance.getComputedStyle(['width', 'height', 'backgroundColor']);
    console.info('getComputedStyle result:', result);
  }
};
module.exports = {
  getComputedStyle: computedStyle
};
```

## setTimeout

setTimeout(function callback, number delay, any rest): number

创建定时器。

**起始版本：** 1.0.8

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 回调函数。 |
| delay | number | 否 | 延迟的时间，函数的调用会在该延迟之后发生，单位ms。<br/>兼容数字的字符串，不传、传入非数字的字符串或其他类型，默认按0处理。 |
| rest | any | 否 | param1, param2, ...等附加参数，它们会作为参数传递给回调函数。 |

**返回值：**

返回number类型的值，定时器ID，可传递给[clearTimeout](#cleartimeout)来取消该定时器。

**示例：**

```js
var timeout = function(event, ownerInstance) {
  if (ownerInstance.setTimeout) {
    // 使用前需要判空
    var id = ownerInstance.setTimeout(function() {
      console.info('The timer is executed');
    }, 1000);
    console.info(`The timer id is: ${id}`);
  }
};
module.exports = {
  setTimeout: timeout
};
```

## clearTimeout

clearTimeout(number id): void

清除定时器。

**起始版本：** 1.0.8

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| id | number | 是 | 要清除的定时器的ID。 |

**示例：**

```js
var clearTimeout = function(event, ownerInstance) {
  if (ownerInstance.clearTimeout) {
    // 使用前需要判空
    var id = ownerInstance.setTimeout(function() {
      console.info('The timer is executed');
    }, 1000);
    console.info(`The timer id is: ${id}`);
    ownerInstance.clearTimeout(id);
  }
};
module.exports = {
  clearTimeout: clearTimeout
};
```

## getBoundingClientRect

getBoundingClientRect(): Object

获取页面或者组件位置和尺寸信息。

**起始版本：** 1.0.8

**返回值：**

返回系统信息的Object对象，包括以下字段。

| 属性 | 类型 | 描述 |
| -------- | -------- | -------- |
| x | number | 元素的左上角相对于视图的水平坐标。 |
| y | number | 元素的左上角相对于视图的垂直坐标。 |
| width | number | 元素的宽度（单位为像素）。 |
| height | number | 元素的高度（单位为像素）。 |
| left | number | 元素左边距离视图左边的距离（单位为像素）。 |
| top | number | 元素顶部距离视图顶部的距离（单位为像素）。 |
| right | number | 元素右边距离视图左边的距离（单位为像素）。 |
| bottom | number | 元素底部距离视图顶部的距离（单位为像素）。 |

**示例：**

```js
var boundingClientRect = function(event, ownerInstance) {
  if (ownerInstance.getBoundingClientRect) {
    // 使用前需要判空
    var result = ownerInstance.getBoundingClientRect();
    console.info('getBoundingClientRect result:', result);
  }
};
module.exports = {
  getBoundingClientRect: boundingClientRect
};
```
