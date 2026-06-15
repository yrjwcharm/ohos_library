# textarea

多行文本输入框组件。

**起始版本：** 1.0.0

## 约束与限制

- 宽度未设置时，默认撑满最大宽度。

- 当输入的文本内容超过组件宽度时会自动换行显示。

- 高度未设置时，组件无默认高度，自动适应内容高度。


## 属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| value | string | - | 否 | 输入框的初始内容。 |
| confirm-type | string | return | 否 | 点击textarea拉起输入法后，输入法键盘右下角文字类型，有效值如下：<br/>send：输入法键盘的右下角文字为“发送”。<br/>search：输入法键盘的右下角文字为“搜索”。<br/>next：输入法键盘的右下角文字为“下一步”。<br/>go：输入法键盘的右下角文字为“开始”。<br/>done：输入法键盘的右下角文字为“完成”。<br/>return：输入法键盘的右下角文字为“换行”。 |
| placeholder | string | - | 否 | 输入框为空时占位符。 |
| focus | boolean | false | 否 | 获取焦点。<br/>**起始版本：** 1.0.5 |
| placeholder-style | string | - | 否 | 指定 placeholder 的样式，目前仅支持color,font-size和font-weight。 |
| disabled | boolean | false | 否 | 是否禁用。 |
| maxlength | number | 140 | 否 | 最大输入长度，设置为 -1 的时候不限制最大长度。 |
| auto-height | boolean | false | 否 | 是否自动增高，设置auto-height时，style.height不生效。 |
| bindinput | eventhandle | - | 否 | 键盘输入时触发。 |
| bindfocus | eventhandle | - | 否 | 输入框聚焦时触发。 |
| bindblur | eventhandle | - | 否 | 输入框失去焦点时触发。 |
| bindconfirm | eventhandle | - | 否 | 点击完成按钮时触发。 |

## 示例

hxml文件：

```html
<view class="page-section">
  <view class="textarea-wrp">
  <textarea
    bindblur="bindTextAreaBlur"
    bindinput="bindTextAreaInput"
    bindfocus="bindTextAreaFocus"
    bindconfirm="bindTextAreaConfirm"
    confirm-type="go"
    maxlength="{{140}}"
    auto-height="{{true}}"/>
  </view>
</view>
<view class="page-section">
  <view class="page-section-title">placeholder颜色是红色的</view>
  <view class="textarea-wrp">
  <textarea
    placeholder="placeholder颜色是红色的"
    placeholder-style="color:red;font-size:20;font-weight:200"/>
  </view>
</view>
```

js代码：

```js
Page({
  data: {},
  bindTextAreaBlur(event) {
    // event.detail内容举例为：{"value":""}
    console.info('textArea组件输入框失去焦点时触发，value为：', event.detail);
  },
  bindTextAreaInput(event) {
    // event.detail内容举例为：{"value":""}
    console.info('textarea组件键盘输入时触发，value为：', event.detail);
  },
  bindTextAreaFocus(event) {
    // event.detail内容举例为：{"value":""}
    console.info('textArea组件输入框聚焦时触发，value为：', event.detail);
  },
  bindTextAreaConfirm(event) {
    // event.detail内容举例为：{"value":""}
    console.info('textArea组件点击完成按钮时触发，value为：', event.detail);
  }
});
```
