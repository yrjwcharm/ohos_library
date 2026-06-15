# label

用来改进表单组件的可用性。

**起始版本：** 1.0.0

## 属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| for | string | - | 否 | 绑定控件的id。<br/>- 使用for属性找到对应的id，或者将控件放在该标签下，当点击时，就会触发对应的控件。<br/>- for优先级高于内部控件，内部有多个控件的时候默认触发第一个控件。<br/>- 目前可以绑定的控件有：[button](components-button.md)、[checkbox](components-checkbox.md)、[radio](components-radio.md)、[switch](components-switch.md)。<br/>传递非法值时依据实际效果而定。 |

## 示例

```html
<label for="radio1">
  <text>选择radio</text>
  <radio id="radio1"></radio>
</label>
```
