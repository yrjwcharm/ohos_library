# editor

富文本编辑器组件，可以对图片、文字进行编辑。

编辑器导出内容支持带标签的html和纯文本的text，编辑器内部采用delta格式进行存储。通过setContents接口设置内容时，解析插入的html可能会由于一些非法标签导致解析错误，建议开发者在ASCF元服务内使用时，通过delta进行插入。

相关API：[EditorContext](../references-apis/apis-rich-text.md)

**起始版本：** 1.0.17

## 属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| read-only | boolean | false | 否 | 设置编辑器为只读 |
| placeholder | string | - | 否 | 编辑器内容为空时占位符。 |
| enable-formats | Array.&lt;string&gt; | 所有格式 | 否 | 编辑器允许的名单内的格式。<br/>例如enable-formats=['bold','italic']，只有这两种格式会生效。如果enable-formats属性不设置，所有支持的格式都生效。支持的格式：参考[EditorContext.format](../references-apis/apis-rich-text.md#editorcontextformat)支持的类型 |
| enterkeyhint | string | enter | 否 | 点击编辑器拉起输入法后，输入法键盘右下角文字类型，有效值如下（不同机型不同输入法对该属性支持程度不一致）：<br/>send：输入法键盘的右下角文字为“发送”。<br/>search：输入法键盘的右下角文字为“搜索”。<br/>next：输入法键盘的右下角文字为“下一步”。<br/>previous：输入法键盘的右下角文字为“上一步“。<br/>go：输入法键盘的右下角文字为“开始”。<br/>done：输入法键盘的右下角文字为“完成”。<br/>enter：输入法键盘的右下角文字为“换行”。 |
| confirm-hold | boolean | true | 否 | 点击键盘回车键时是否保持键盘不收起 |
| bindready | eventhandle | - | 否 | 编辑器初始化完成时触发。 |
| bindfocus | eventhandle | - | 否 | 编辑器聚焦时触发，event.detail = {html,text,delta}。 |
| bindblur | eventhandle | - | 否 | 编辑器失去焦点时触发，detail = {html,text,delta}。 |
| bindinput | eventhandle | - | 否 | 编辑器内容改变时触发，detail = {html,text,delta} |
| bindstatuschange | eventhandle | - | 否 | 通过Context方法改变编辑器内样式时触发，返回选区已设置的样式。 |

## 示例

hxml文件：

```html
<view class="page-section">
  <editor
    id="editor"
    read-only="{{readOnly}}"
    placeholder="{{placeholder}}"
    enable-formats="{{enableFormart}}"
    enterkeyhint="{{enterkeyhint}}"
    confirm-hold="{{confirmHold}}"
    bindinput="{{onInput}}"
    bindready="{{onReady}}"
    bindblur="{{onBlur}}"
    bindfocus="{{onFocus}}"
    bindstatuschange="{{onStatusChange}}" />
</view>
```

js代码：

```js
Page({
  data: {
    readOnly: false,
    placeholder: '请输入',
    enableFormart: ['bold'],
    enterkeyhint: 'enter',
    confirmHold: true,
  },
  onReady(e) {
    const info = e.detail;
  },
  onFocus(e) {
    const { html, text, delta } = e.detail;
  },
  onBlur(e) {
    const { html, text, delta } = e.detail;
  },
  onInput(e) {
    const { html, text, delta } = e.detail;
  },
  onStatusChange(e) {
    const info = e.detail;
  }
});
```
