# canvas

画布组件，用于自定义绘制图形。

**起始版本：** 1.0.0

**关联文档：** [has.createCanvasContext](../references-apis/apis-canvas.md#hascreatecanvascontext)

## 约束与限制

1. canvas 标签默认宽度300px、高度150px。
2. 同一页面中的 canvas-id 不可重复，如果使用一个已经出现过的 canvas-id，该 canvas 标签对应的画布将被隐藏并不再正常工作。
3. Canvas 2D需要显式设置画布宽高，默认：300px\*150px，最大：1365px\*1365px。

## 属性

| 名称 | 类型 | 默认值 | 必填 | 描述                                           |
| -------- | -------- | -------- | -------- |----------------------------------------------|
| type | string | - | 否 | canvas类型，支持2d。                               |
| canvas-id | string | - | 否 | canvas 组件的唯一标识符。                             |
| disable-scroll | boolean | false | 否 | 禁止屏幕滚动以及下拉刷新。                                |
| bindtouchstart | eventhandle | - | 否 | 手指触摸动作开始。                                    |
| bindtouchmove | eventhandle | - | 否 | 手指触摸后移动。                                     |
| bindtouchend | eventhandle | - | 否 | 手指触摸动作结束。                                    |
| bindtouchcancel | eventhandle | - | 否 | 手指触摸动作被打断，如锁屏、切换应用、来电提醒。                     |
| bindlongtap | eventhandle | - | 否 | 手指长按350ms后触发长按事件，长按的时长超过500ms之后，移动不会触发屏幕的滚动。 |
| binderror | eventhandle | - | 否 | 当发生错误时触发error事件，detail.errMsg。               |

## 示例

hxml:

```html
<canvas
  canvas-id="canvas"
  disable-scroll="{{false}}"
  style="border: 3px solid blue">
</canvas>
<button bindtap="setFontSize">设置字体大小</button>
```

js:

```js
Page({
  setFontSize() {
    var ctx = has.createCanvasContext('canvas');
    ctx.setFontSize(20);
    ctx.fillText('20', 20, 20);
    ctx.draw();
  }
})
```
