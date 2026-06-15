# movable-view

可移动的视图容器，在页面中可以拖拽滑动。

**起始版本：** 1.0.0

## 约束与限制

movable-view必须在[movable-area](components-movable-area.md)组件中，并且必须是直接子节点，否则不能移动。

## 属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| direction | string | none | 否 | movable-view的移动方向，属性值有all、vertical、horizontal、none。 |
| inertia | boolean | false | 否 | movable-view是否带有惯性。 |
| out-of-bounds | boolean | false | 否 | 超过可移动区域后，movable-view是否还可以移动。 |
| x | number | - | 否 | 定义x轴方向的偏移，如果x的值不在可移动范围内，会自动移动到可移动范围；改变x的值会触发动画。 |
| y | number | - | 否 | 定义y轴方向的偏移，如果y的值不在可移动范围内，会自动移动到可移动范围；改变y的值会触发动画。 |
| damping | number | 20 | 否 | 阻尼系数，用于控制x或y改变时的动画和过界回弹的动画，值越大移动越快。 |
| friction | number | 2 | 否 | 摩擦系数，用于控制惯性滑动的动画，值越大摩擦力越大，滑动越快停止；必须大于0，否则会被设置成默认值。 |
| disabled | boolean | false | 否 | 是否禁用。 |
| scale | boolean | false | 否 | 是否支持双指缩放，默认缩放手势生效区域是在movable-view内。 |
| scale-min | number | 0.1 | 否 | 定义缩放倍数最小值。<br/>**起始版本：** 1.0.3 |
| scale-max | number | 10 | 否 | 定义缩放倍数最大值。<br/>**起始版本：** 1.0.3 |
| scale-value | number | 1 | 否 | 定义缩放倍数，取值范围为 0.1 ~ 10。 |
| animation | boolean | true | 否 | 是否使用动画。 |
| bindchange | eventhandle | - | 否 | 拖动过程中触发的事件，event.detail = {x, y, source}。 |
| bindscale | eventhandle | - | 否 | 缩放过程中触发的事件，event.detail = {x, y, scale}。 |
| bindhtouchmove | eventhandle | - | 否 | 初次手指触摸后移动为横向的移动时触发，如果catch此事件，则意味着touchmove事件也被catch（暂不支持）。 |
| bindvtouchmove | eventhandle | - | 否 | 初次手指触摸后移动为纵向的移动时触发，如果catch此事件，则意味着touchmove事件也被catch（暂不支持）。 |

bindchange返回的source表示产生移动的原因，其取值如下表所示：

| 值 | 描述 |
| -------- | -------- |
| touch | 拖动。 |
| touch-out-of-bounds | 超出移动范围。 |
| out-of-bounds | 超出移动范围后的回弹。 |
| friction | 惯性。 |
| 空字符串 | 通过setData方法设置的原因。 |

## 示例

```html
<view class="container">
  <view class="page-body">
    <view class="page-section">
      <view class="page-section-title">可超出边界</view>
      <movable-area
        style="width: 200px; height: 200px; 
        background-color: green"
        scale-area="{{true}}"  >
        <movable-view
          direction="all"
          out-of-bounds
          style="width: 50px; height: 50px; background-color: red"
          damping  >
          text
        </movable-view>
      </movable-area>
    </view>
    <view class="page-section">
      <view class="page-section-title">可放缩</view>
      <movable-area
        scale-area
        style="width: 200px; height: 200px; background-color: green" >
        <movable-view
          direction="all"
          bindchange="onChange"
          bindscale="onScale"
          scale
          scale-value="{{scale}}"
          style="width: 50px; height: 50px; background-color: red">
          text
        </movable-view>
      </movable-area>
    </view>
    <view class="page-section">
      <view class="page-section-title">只可以纵向移动</view>
      <movable-area
        style="width: 200px; height: 200px; background-color: green">
        <movable-view
          direction="vertical"
          friction="1"
          style="width: 50px; height: 50px; background-color: red" >
          text
        </movable-view>
      </movable-area>
    </view>
  </view>
</view>
```
