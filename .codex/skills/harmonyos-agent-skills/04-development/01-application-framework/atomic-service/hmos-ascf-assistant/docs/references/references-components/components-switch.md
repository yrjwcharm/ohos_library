# switch

开关选择器。

**起始版本：** 1.0.0

## 属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| checked | boolean | false | 否 | 是否选中。 |
| disabled | boolean | false | 否 | 是否禁用。 |
| type | string | switch | 否 | 样式，有效值：switch，checkbox。 |
| color | string | \#0A59F7 | 否 | switch 的颜色，同css的color。 |
| bindchange | eventhandle | - | 否 | 点击导致checked改变时会触发change事件，event.detail={value}。 |

## 示例

hxml文件：

```html
<view class="page-body">
  <view class="page-section page-section-gap">
    <view class="page-section-title">默认样式</view>
    <view class="body-view">
      <view class="page-section-title">开启状态</view>
      <switch checked bindchange="switch1Change" />
      <view class="page-section-title">关闭状态</view>
      <switch bindchange="switch2Change" />
      <view class="page-section-title">关闭状态下禁用状态</view>
      <switch disabled></switch>
      <view class="page-section-title">开启状态下禁用状态</view>
      <switch checked disabled></switch>
    </view>
  </view>
  <view class="page-section">
    <view class="page-section-title">推荐展示样式</view>
    <view class="ascf-cells">
      <view class="ascf-cell ascf-cell_switch">
        <view class="ascf-cell__bd">开启中</view>
        <view class="ascf-cell__ft">
          <switch checked />
        </view>
      </view>
      <view class="ascf-cell ascf-cell_switch">
        <view class="ascf-cell__bd">关闭</view>
        <view class="ascf-cell__ft">
          <switch />
        </view>
      </view>
      <view class="ascf-cell ascf-cell_switch">
        <view class="ascf-cell__bd">开启中</view>
        <view class="ascf-cell__ft">
          <switch type="checkbox" checked />
        </view>
      </view>
      <view class="ascf-cell ascf-cell_switch">
        <view class="ascf-cell__bd">关闭</view>
        <view class="ascf-cell__ft">
          <switch type="checkbox" />
        </view>
      </view>
    </view>
  </view>
  <view class="page-section">
    <view class="page-section-title">动态设置</view>
    <view class="ascf-cells">
      <view class="ascf-cell ascf-cell_switch">
        <view class="ascf-cell__bd">{{isChecked?'开启中':'关闭'}}</view>
        <view class="ascf-cell__ft">
          <switch
            checked="{{isChecked}}"
            disabled="{{isDisabled}}"
            type="{{setType}}"
            color="{{setColor}}"
            bindchange="bindchange"/>
        </view>
      </view>
    </view>
  </view>
  <view style="margin-left: 30rpx; margin-top: 30rpx"
    >bindchange事件触发：{{switchData}}</view>
  <view style="flex-direction: row">
    <button
      size="mini"
      type="primary"
      style="margin-left: 30rpx"
      bindtap="changeChecked">
      {{isChecked?'开启中':'关闭'}}
    </button>
    <button
      size="mini"
      type="primary"
      style="margin-left: 30rpx"
      bindtap="changeDisabled">
      {{isDisabled?'启用':'禁用'}}
    </button>
    <button
      size="mini"
      type="primary"
      style="margin-left: 30rpx"
      bindtap="changeType">
      {{isType?'switch':'checkbox'}}样式
    </button>
    <button
      size="mini"
      type="primary"
      style="margin-left: 30rpx"
      bindtap="changeColor">
      {{!isColor?'设置':'取消'}}颜色
    </button>
  </view>
</view>
```

js文件：

```js
Page({
  data: {
    switchData: '',
    isChecked: true,
    isDisabled: false,
    isType: true,
    setType: 'switch',
    isColor: false,
    setColor: '#04BE02'
  },
  switch1Change(e) {
    console.info('switch1 发生 change 事件，携带值为', e.detail.value);
  },
  switch2Change(e) {
    console.info('switch2 发生 change 事件，携带值为', e.detail.value);
  },
  switch3Change(e) {
    console.info('switch3 发生 change 事件，携带值为', e.detail.value);
  },
  switch4Change(e) {
    console.info('switch4 发生 change 事件，携带值为', e.detail.value);
  },
  bindchange(e) {
    this.setData({
      switchData: e.detail.value
    });
  },
  changeChecked() {
    this.setData({
      isChecked: !this.data.isChecked
    });
  },
  changeDisabled() {
    this.setData({
      isDisabled: !this.data.isDisabled
    });
  },
  changeType() {
    this.setData({
      setType: !this.data.isType ? 'switch' : 'checkbox',
      isType: !this.data.isType
    });
  },
  changeColor() {
    this.setData({
      setColor: this.data.isColor ? '#04BE02' : 'red',
      isColor: !this.data.isColor
    });
  }
});
```
