# input

输入框。

**起始版本：** 1.0.0

## 属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| value | string | - | 否 | 输入框的初始内容。 |
| focus | boolean | false | 否 | 获取焦点。 |
| type | string | text | 否 | input 的类型，有效值如下：<br/>text：文本输入键盘。<br/>number：数字输入键盘。 |
| confirm-type | string | done | 否 | 设置键盘右下角按钮的文字，confirm-type的类型，有效值如下：（仅在type='text'）时生效。<br/>send：右下角按钮为发送。<br/>search：右下角按钮为搜索样式。<br/>next：右下角按钮为下一步。<br/>go：右下角按钮为开始样式。<br/>done：右下角按钮为完成。 |
| password | boolean | false | 否 | 是否是密码类型。 |
| placeholder | string | - | 否 | 输入框为空时占位符。 |
| placeholder-style | string | - | 否 | 指定placeholder的样式。<br/>**起始版本：** 1.0.9 |
| disabled | boolean | false | 否 | 是否禁用。 |
| maxlength | number | 140 | 否 | 最大输入长度，设置为 -1 的时候不限制最大长度。 |
| bindinput | eventhandle | - | 否 | 键盘输入时触发。 |
| bindfocus | eventhandle | - | 否 | 输入框聚焦时触发。 |
| bindblur | eventhandle | - | 否 | 输入框失去焦点时触发。 |
| bindconfirm | eventhandle | - | 否 | 点击完成按钮时触发。 |
| placeholder-class | string | input-placeholder | 否 | 指定placeholder的样式类。<br/>**起始版本：** 1.0.9 |

## 示例

hxml文件

```html
<view class="page-section page-section-gap">
  <view class="ascf-cells__title">bindinput实时获取输入值：{{inputValue}}</view>
  <view class="ascf-cells ascf-cells_after-title">
    <view class="ascf-cell ascf-cell_input">
      <input class="ascf-input"  bindinput="bindInputEvent" placeholder="键盘输入时触发"/>
      <input class="ascf-input"  bindfocus="bindFocusEvent" placeholder="输入框聚焦时触发"/>
      <input class="ascf-input"  bindblur="bindBlurEvent" placeholder="输入框失去焦点时触发"/>
      <input class="ascf-input"  bindconfirm="bindConfirmEvent" placeholder="点击完成按钮时触发"/>
    </view>
  </view>
</view>
```

js文件：

```js
Page({
  data: {
    inputValue: "",
  },
  bindInputEvent(event) {
    // event.detail内容举例为：{"value":""}
    console.info('input组件键盘输入时触发，携带值为：', event.detail);
    this.setData({
      inputValue: event.detail,
    });
  },
  bindFocusEvent(event) {
    // event.detail内容举例为：{"value":""}
    console.info('input组件输入框聚焦时触发，携带值为：', event.detail);
  },
  bindBlurEvent(event) {
    // event.detail内容举例为：{"value":""}
    console.info('input组件输入框失去焦点时触发，携带值为：', event.detail);
  },
  bindConfirmEvent(event) {
    // event.detail内容举例为：{"value":""}
    console.info('input组件点击完成按钮时触发，携带值为：', event.detail);
  }
});
```
