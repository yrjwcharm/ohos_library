# picker-view

嵌入页面的滚动选择器。

**起始版本：** 1.0.0

## 约束与限制

其中只可放置picker-view-column组件，其他节点不会显示。

## 子组件

[picker-view-column](components-picker-view-column.md)

## 属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| value | Array&lt;number&gt; | - | 否 | 数组中的数字依次表示 picker-view 内的 picker-view-column 选择的第几项（下标从 0 开始），数字大于 picker-view-column 可选项长度时，选择最后一项。 |
| indicator-style | string | - | 否 | 设置选择器中间选中框的样式。 |
| bindchange | eventhandle | - | 否 | 滚动选择时触发change事件，event.detail = {value}；value为数组，表示 picker-view 内的 picker-view-column 当前选择的是第几项（下标从 0 开始）。 |
| bindpickstart | eventhandle | - | 否 | 当滚动选择开始时候触发事件。 |
| bindpickend | eventhandle | - | 否 | 当滚动选择结束时候触发事件。 |

## 示例

hxml文件：

```html
<view class="container">
  <template is="head" data="{{title: 'picker-view'}}"/>
  <view class="page-body">
    <view class="selected-date">{{year}}年{{month}}月{{day}}日{{isDaytime ? "白天" : "夜晚"}}</view>
    <picker-view indicator-style="height: 50px;" style="width: 100%; height: 300px;" value="{{value}}" bindchange="bindChange">
      <picker-view-column>
        <view has:for="{{years}}" has:key="{{years}}" style="line-height: 50px; text-align: center;">{{item}}年</view>
      </picker-view-column>
      <picker-view-column>
        <view has:for="{{months}}" has:key="{{months}}" style="line-height: 50px; text-align: center;">{{item}}月</view>
      </picker-view-column>
      <picker-view-column>
        <view has:for="{{days}}" has:key="{{days}}" style="line-height: 50px; text-align: center;">{{item}}日</view>
      </picker-view-column>
      <picker-view-column>
        <view class="icon-container">
          <image class="picker-icon" src="../lib/daytime.png" />
        </view>
        <view class="icon-container">
          <image class="picker-icon" src="../lib/night.png" />
        </view>
      </picker-view-column>
    </picker-view>
  </view>
  <template is="foot"/>
</view>
```

js文件：

```js
const date = new Date()
const years = []
const months = []
const days = []
for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}
for (let i = 1; i <= 12; i++) {
  months.push(i)
}
for (let i = 1; i <= 31; i++) {
  days.push(i)
}
Page({
  data: {
    years,
    year: date.getFullYear(),
    months,
    month: 2,
    days,
    day: 2,
    value: [9999, 1, 1],
    isDaytime: true,
  },
  bindChange(e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      isDaytime: !val[3]
    })
  }
})
```
