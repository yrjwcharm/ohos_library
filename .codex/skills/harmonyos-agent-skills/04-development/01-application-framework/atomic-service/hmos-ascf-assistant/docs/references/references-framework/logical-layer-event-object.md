# 事件对象

当组件触发事件时，逻辑层绑定的处理函数会收到一个事件对象。对象中包含以下字段：

| 属性 | 类型 | 描述 |
| -------- | -------- | -------- |
| type | string | 事件类型。 |
| timeStamp | integer | 事件生成时的时间戳。 |
| [target](#target) | object | 触发事件的组件的属性值集合。 |
| [currentTarget](#currenttarget) | object | 当前组件的属性值集合。 |
| [detail](#detail) | object | 自定义事件对象额外的信息。 |
| [touches](#touches) | array | 触摸事件，当前停留在屏幕中的触摸点信息的数组。 |
| [changedTouches](#changedtouches) | array | 触摸事件，当前变化的触摸点信息的数组。 |


## target

触发事件的源组件。

| 属性 | 类型 | 描述 |
| -------- | -------- | -------- |
| id | string | 触发事件的组件id。 |
| [dataset](#dataset) | object | 触发事件的组件上由data-开头的自定义属性组成的集合。 |


## currentTarget

事件绑定的当前组件。

| 属性 | 类型 | 描述 |
| -------- | -------- | -------- |
| id | string | 触发事件的组件id。 |
| [dataset](#dataset) | object | 触发事件的组件上由data-开头的自定义属性组成的集合。 |

> **说明：**
> 
> target和currentTarget可以参考上例示例中，点击view3时，handleTap3收到的事件对象target和currentTarget都是view3，而handleTap2收到的事件对象target就是view3，currentTarget就是view2。


## dataset

在组件节点中可以定义一些自定义数据，触发事件时会传入回调中处理。

在hxml中，这些自定义数据以data-或data开头，多个单词由连字符“-”连接。这种写法中，连字符写法会转换成驼峰写法，而大写字符会自动转成小写字符。如：

- data-custom-value ，最终会呈现为event.currentTarget.dataset.customValue。
- data-customValue ，最终会呈现为event.currentTarget.dataset.customvalue。
- dataCustom-value，最终会呈现为event.currentTarget.dataset.customValue。

## touches

touches是一个数组，每个元素为一个Touch对象。表示当前停留在屏幕上的触摸点。

### Touch

| 属性 | 类型 | 描述 |
| -------- | -------- | -------- |
| identifier | number | 触摸点的标识符。 |
| pageX, pageY | number | 距离文档左上角的距离，文档的左上角为原点 ，横向为 X 轴，纵向为 Y 轴。 |
| clientX, clientY | number | 距离页面可显示区域（屏幕除去导航条）左上角距离，横向为 X 轴，纵向为 Y 轴。 |

## changedTouches

changedTouches数据格式同[touches](#touches)。 表示有变化的触摸点，如从无变有（touchstart），位置变化（touchmove），从有变无（touchend、touchcancel）。

## detail

自定义事件数据，详见组件定义中各个事件的定义。

点击事件的detail带有的x, y同pageX, pageY代表距离文档左上角的距离。
