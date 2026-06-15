# slider

滑动选择器。

**起始版本：** 1.0.0

## 属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| min | number | 0 | 否 | 最小值。 |
| max | number | 100 | 否 | 最大值。 |
| step | number | 1 | 否 | 步长，取值必须大于 0，并且可被(max - min)整除。 |
| disabled | boolean | false | 否 | 是否禁用。 |
| value | number | 0 | 否 | 当前取值。 |
| activeColor | color | \#0A59F7 | 否 | 已选择的颜色。 |
| backgroundColor | color | rgba(0, 0, 0, 0.098) | 否 | 背景条的颜色。 |
| block-size | number | 16 | 否 | 滑块的大小，取值范围为 12 - 28。 |
| block-color | color | \#ffffff | 否 | 滑块的颜色。 |
| show-value | boolean | false | 否 | 是否显示当前 value。 |
| bindchange | eventhandle | - | 否 | 完成一次拖动后触发的事件，event.detail = {value}。 |
| bindchanging | eventhandle | - | 否 | 拖动过程中触发的事件，event.detail = {value}。 |

## 示例

hxml文件：

```html
<view class="page-body">
  <view class="page-section page-section-gap">
    <view class="page-section-title">设置step：5</view>
    <view class="body-view">
      <slider value="60" bindchange="slider2change" step="5" show-value />
    </view>
  </view>
  <view class="page-section page-section-gap">
    <view class="page-section-title">显示当前value</view>
    <view class="body-view">
      <slider value="50" bindchange="slider3change" show-value />
    </view>
  </view>
  <view class="page-section page-section-gap">
    <view class="page-section-title">不显示当前value</view>
    <view class="body-view">
      <slider value="50" bindchange="slider4change" />
    </view>
  </view>
  <view class="page-section page-section-gap">
    <view class="page-section-title">设置最小50/最大值200</view>
    <view class="body-view">
      <slider
        value="100"
        bindchange="slider5change"
        min="50"
        max="200"
        show-value="{{showValue}}"/>
    </view>
  </view>
  <view class="page-section page-section-gap">
    <view class="page-section-title">设置颜色</view>
    <view class="body-view">
      <slider
        value="30"
        bindchange="slider6change"
        activeColor="#de01fc"
        backgroundColor="gray"
        min="0"
        max="100"
        show-value/>
    </view>
  </view>
  <view class="page-section page-section-gap">
    <view class="page-section-title">滑块设置</view>
    <view class="body-view">
      <slider
        value="0"
        bindchange="slider7change"
        block-color="orange"
        block-size="18"
        min="0"
        max="100"
        show-value/>
    </view>
  </view>
</view>
<view class="page-section page-section-gap">
  <view class="page-section-title">滑块大小</view>
  <view class="body-view">
    <slider block-size="{{20}}" />
  </view>
</view>
<view class="page-section page-section-gap">
  <view class="page-section-title">滑块颜色</view>
  <view class="body-view">
    <slider block-color="#FF0000" />
  </view>
</view>
<view class="page-section page-section-gap">
  <view class="page-section-title">动态设置</view>
  <view class="body-view">
    <slider
      value="{{currentValue}}"
      step="{{setStep}}"
      bindchange="sliderchange"
      bindchanging="bindchanging"
      activeColor="{{setActiveColor}}"
      backgroundColor="{{setBackgroundColor}}"
      min="0"
      max="100"
      show-value="{{isShowValue}}"
      block-size="{{setBlockSize}}"
      block-color="{{setBlockColor}}"/>
  </view>
</view>
<view style="margin-left: 30rpx; margin-top: 30rpx"
  >bindchange事件触发：{{currentValue}}</view>
<view style="margin-left: 30rpx; margin-top: 30rpx"
  >bindchanging事件触发：{{changingValue}}</view>
<view class="ascf-cell ascf-cell_switch">
  <view class="ascf-cell__bd">显示当前 value</view>
  <view class="ascf-cell__ft">
    <switch checked="{{isShowValue}}" bindchange="changeShowValue" />
  </view>
</view>
<view class="ascf-cell ascf-cell_switch">
  <view class="ascf-cell__bd">设置step=1或5</view>
  <view class="ascf-cell__ft">
    <switch checked="{{isSetStep}}" bindchange="changeStep" />
  </view>
</view>
<view class="ascf-cell ascf-cell_switch">
  <view class="ascf-cell__bd">设置已选择的颜色</view>
  <view class="-cell__ft">
    <switch checked="{{isSetActiveColor}}" bindchange="changeActiveColor" />
  </view>
</view>
```

js文件：

```js
const pageData={
  data: {
    isShowValue: true,
    currentValue: 30,
    changingValue: '',
    setStep: 1,
    isSetStep: false,
    isSetActiveColor: false,
    isSetBackgroundColor: false,
    setActiveColor: '#1aad19',
    setBackgroundColor: '#e9e9e9',
    setBlockSize: '28',
    isSetBlockSize: false,
    setBlockColor: '#ffffff',
    isSetBlockColor: false,
    showValue: true,
  },
  sliderchange(e) {
    this.setData({
      currentValue: e.detail.value,
    });
  },
  bindchanging(e) {
    this.setData({
      changingValue: e.detail.value,
    });
  },
  changeShowValue() {
    this.setData({
      isShowValue: !this.data.isShowValue,
    });
  },
  changeStep() {
    this.setData({
      setStep: !this.data.isSetStep ? 5 : 1,
      isSetStep: !this.data.isSetStep,
    });
  },
  changeActiveColor() {
    this.setData({
      setActiveColor: !this.data.isSetActiveColor ? '#de01fc' : '#1aad19',
      isSetActiveColor: !this.data.isSetActiveColor,
    });
  },
  changeBackgroundColor() {
    this.setData({
      setBackgroundColor: !this.data.isSetBackgroundColor ? 'gray' : '#e9e9e9',
      isSetBackgroundColor: !this.data.isSetBackgroundColor,
    });
  },
  changeBlockSize() {
    this.setData({
      setBlockSize: !this.data.isSetBlockSize ? '10' : '28',
      isSetBlockSize: !this.data.isSetBlockSize,
    });
  },
  changeBlockColor() {
    this.setData({
      setBlockColor: !this.data.isSetBlockColor
        ? 'rgb(238, 3, 247)'
        : '#ffffff',
      isSetBlockColor: !this.data.isSetBlockColor,
    });
  },
}
for (var i = 1; i < 8; ++i) {
  (function(index) {
    pageData[`slider${index}change`] = function(e) {
      console.info(`slider${index}发生change事件，携带值为`, e.detail.value);
    };
  })(i);
}
Page(pageData);
```
