# 事件分类

ASCF框架渲染层中事件分为冒泡事件和非冒泡事件：

- 冒泡事件是指当一个组件上的事件被触发后，该事件会向父节点传递。
- 非冒泡事件是指当一个组件上的事件被触发后，该事件不会向父节点传递。

## 冒泡事件

> **说明：**
> 
> 其他事件如无特殊声明都是非冒泡事件，如 form的submit事件，input的input事件，scroll-view的scroll事件。

| 类型 | 触发事件 |
| -------- | -------- |
| touchstart | 手指触摸动作开始。 |
| touchmove | 手指触摸后移动。 |
| touchcancel | 手指触摸动作被打断，如来电提醒，弹窗。 |
| touchend | 手指触摸动作结束。 |
| tap | 手指触摸后马上离开。 |
| longpress | 手指触摸后，超过 350ms 再离开，如果指定了事件回调函数并触发了这个事件，tap 事件将不被触发。 |
| longtap | 手指触摸后，超过 350ms 再离开（推荐使用 longpress 事件代替）。 |
| transitionend | 会在 transition 或 has.createAnimation 动画结束后触发。 |
| animationstart | 会在一个 animation 动画开始时触发。 |
| animationiteration | 会在一个 animation 一次迭代结束时触发。 |
| animationend | 会在一个 animation 动画完成时触发。 |
