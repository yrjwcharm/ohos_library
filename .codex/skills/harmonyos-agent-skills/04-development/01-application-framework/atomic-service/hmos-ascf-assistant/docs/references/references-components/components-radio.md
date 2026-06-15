# radio

单选按钮。

**起始版本：** 1.0.0

## 属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| value | string | - | 否 | radio标识。当该radio选中时，radio-group的change事件会携带radio的 value。 |
| checked | boolean | false | 否 | 当前是否选中。 |
| disabled | boolean | false | 否 | 是否禁用。 |
| color | string | \#0A59F7 | 否 | radio的颜色，同css的color。 |

## 示例

hxml文件：

```html
<view>
  <view>默认样式</view>
  <label class="radio"> <radio value="r1" checked="{{true}}" />选中 </label>
  <label class="radio"> <radio value="r2" />未选中 </label>
</view>
```
