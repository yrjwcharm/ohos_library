# 使用hjs函数响应事件

使用hjs函数处理事件时，hjs函数接受2个参数，第一个是event对象，event除了有上述打印的event结构中基本的属性外，还具有一个instance属性；第二个参数是ownerInstance，和event.instance一样是一个ComponentDescriptor对象。

使用示例代码如下：

在hxml中绑定hjs函数。

```html
<hjs src="./test.hjs" module="test"/>
<button bindtap="{{ test.handleTap }}">button</button>
```

> **说明：**
>
> 绑定的 hjs 函数必须用{{}}括起来。

test.hjs文件实现 handleTap 函数。请参照“[调试运行ASCF源代码](../../quick-start/debug-ascf-code.md#调试运行ascf源代码)”章节查看打印结果。

```js
var handleTap = function(event, ownerInstance) {
  console.info('tap button', event);
};
module.exports = {
  handleTap: handleTap
};
```

ComponentDescriptor 对象拥有一些方法，可以设置组件的样式等，更多详细内容参见[hjs响应事件](hjs-responding-event.md)。
