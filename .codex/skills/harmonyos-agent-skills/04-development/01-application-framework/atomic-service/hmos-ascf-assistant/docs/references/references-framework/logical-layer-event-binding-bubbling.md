# 事件绑定和冒泡

事件绑定的写法和组件的属性相同。

- key以bind或catch开头，后面拼接事件的类型，如bindtap、catchtouchstart。bind和catch后也可以紧跟一个冒号，如bind:tap、catch:touchstart，作用一致。
- value 是一个字符串，需要在对应的 Page 中定义同名的函数，否则触发事件的时候会报错。
- bind与catch的区别：bind事件绑定不会阻止冒泡事件向上冒泡，而catch则会。

**示例：**

```html
<view id="view1" bindtap="handleTap1">
  view1
  <view id="view2" catchtap="handleTap2">
    view2
    <view id="view3" bindtap="handleTap3">
      view3
    </view>
  </view>
</view>
```

**执行效果：**

- 点击view3会先后调用handleTap3和handleTap2（这是因为tap事件会冒泡到view2，而view2阻止了tap事件冒泡，不再向父节点view1传递）。
- 点击view2只触发handleTap2。
- 点击view1只触发handleTap1。
