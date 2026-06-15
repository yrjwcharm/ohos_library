# form

表单。用于提交组件内的用户输入的[switch](components-switch.md)、[input](components-input.md)、[checkbox](components-checkbox.md)、[slider](components-slider.md)、[radio](components-radio.md)、[picker](components-picker.md)。

当点击form表单中，“form-type”为“submit”的button组件时，会将表单组件中的value值进行提交，需要在表单组件中加上name来作为key。

**起始版本：** 1.0.0

## 属性

| 名称 | 类型 | 默认值 | 必填 | 描述                  |
| -------- | -------- | -------- | -------- |---------------------|
| bindsubmit | eventhandle | - | 否 | 携带form中的数据触发submit事件。 |
| bindreset | eventhandle | - | 否 | 表单重置时会触发reset事件。    |

## 示例

hxml文件：

```html
<form bindsubmit="formSubmit" bindreset="formReset">
  <view class="page-section page-section-gap">
    <view class="page-section-title">switch</view>
    <switch name="switch" />
  </view>
  <view class="page-section page-section-gap">
    <view class="page-section-title">radio</view>
    <radio-group name="radio">
      <label>
        <radio value="radio1" />选项一
      </label>
      <label>
        <radio value="radio2" />选项二
      </label>
    </radio-group>
  </view>
  <view class="page-section page-section-gap">
    <view class="page-section-title">checkbox</view>
    <checkbox-group name="checkbox">
      <label>
        <checkbox value="checkbox1" />选项一
      </label>
      <label>
        <checkbox value="checkbox2" />选项二
      </label>
    </checkbox-group>
  </view>
  <view class="page-section page-section-gap">
    <view class="page-section-title">slider</view>
    <slider value="50" name="slider" show-value></slider>
  </view>
  <view class="page-section">
    <view class="page-section-title">input</view>
    <view class="ascf-cells">
      <view class="ascf-cell ascf-cell_input">
        <view class="ascf-cell__bd" style="margin: 30rpx 30rpx">
          <input class="ascf-input" name="input" placeholder="这是一个输入框" />
        </view>
      </view>
    </view>
  </view>
  <view class="btn-area">
    <button style="margin: 30rpx 0" type="primary" formType="submit">
      Submit
    </button>
    <button style="margin: 30rpx 0" formType="reset">Reset</button>
  </view>
</form>
```

js文件：

```js
Page({
  data: {
    formSubmitResult: '',
    formResetResult: ''
  },
  formSubmit(event) {
    // event.detail.value内容举例为：{"switch":false,"radio":"","checkbox":[],"slider":0,"input":""}
    console.info('form发生了submit事件，携带数据为：', event.detail.value);
    this.setData({
      formSubmitResult: event.detail.value
    });
  },
  formReset(event) {
    // event.detail内容举例为：{"target":{"tagName":"","id":"","offsetLeft":0,"offsetTop":0,"dataset":{}}}
    console.info('form发生了reset事件，携带数据为：', event.detail);
    this.setData({
      formResetResult: event.detail
    });
  }
});
```
