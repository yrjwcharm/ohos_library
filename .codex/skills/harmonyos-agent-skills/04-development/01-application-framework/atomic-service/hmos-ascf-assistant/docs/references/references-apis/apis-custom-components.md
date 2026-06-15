# 自定义组件

## has.nextTick

has.nextTick(function callback)

延迟一部分操作到下一个时间片再执行。

功能与[setTimeout](apis-timer.md#settimeout)类似。

> **说明：**
> 
> - 因为自定义组件中的[setData](../references-framework/logical-layer-event-bidirectional-binding.md)等接口本身是同步操作，当这些接口被连续调用时，都是在一个同步流程中执行的，因此如果逻辑不当可能会导致错误。
> 
> - 极端案例说明：当父组件的setData引发了子组件的triggerEvent，进而导致父组件再次执行setData，在此过程中通过has:if语句卸载了子组件，可能会引发奇怪的错误。因此，对于不需要在同一个同步流程中完成的逻辑，可以使用此接口延迟到下一个时间片执行。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 延迟执行的函数。 |

**示例：**

```js
this.setData({ number: 1 }); // 直接在当前同步流程中执行。
has.nextTick(() => {
  this.setData({ number: 3 }); // 在当前同步流程结束后，下一个时间片执行。
});
this.setData({ number: 2 }); // 直接在当前同步流程中执行。
```
