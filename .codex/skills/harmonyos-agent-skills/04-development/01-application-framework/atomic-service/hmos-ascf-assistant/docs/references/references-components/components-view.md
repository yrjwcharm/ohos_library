# view

视图容器，相当于 web 的 div 元素。

**起始版本：** 1.0.0

## 属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| hover-class | string | none | 否 | 指定按下去的样式类。当 hover-class="none" 时，没有点击态效果。 |
| hover-start-time | number | 50 | 否 | 按住后多久出现点击态，单位毫秒。 |
| hover-stay-time | number | 400 | 否 | 手指松开后点击态保留时间，单位毫秒。 |
| hover-stop-propagation | boolean | false | 否 | 指定是否阻止本节点的祖先节点出现点击态。 |

## 示例

```html
<view class="container">
  <view style="color: #0000ff">
    <view>这是一个在 view 元素中的标题。</view>
    <view>这是一个在 view 元素中的文本。</view>
  </view>
</view>
```
