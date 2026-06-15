# 常用事件使用方式

在组件中绑定一个事件处理函数，如bindtap="handleTap"。

```html
<button bindtap="handleTap">test</button>
```

在相应的 Page 定义中编写事件处理函数，参数是事件对象 event。

```js
Page({
  handleTap: function(event) {
    console.info(event);
  }
});
// 打印的 event 结构如下：
{
    "type": "tap",
    "timeStamp": 6925,
    "target": {
        "tagName": "Q-BUTTON",
        "id": "",
        "offsetLeft": 0,
        "offsetTop": 0,
        "dataset": {

        }
    },
    "currentTarget": {
        "id": "",
        "offsetLeft": 0,
        "offsetTop": 0,
        "dataset": {

        }
    },
    "touches": [

    ],
    "changedTouches": [
        {
            "identifier": 0,
            "pageX": 95.00000762939453,
            "pageY": 21.10714340209961,
            "clientX": 95.00000762939453,
            "clientY": 21.10714340209961,
            "force": 0
        }
    ],
    "detail": {
        "x": 95.00000762939453,
        "y": 21.10714340209961
    },
    "_vts": 1760344353394,
    "syncModelOpt": {

    }
}
```
