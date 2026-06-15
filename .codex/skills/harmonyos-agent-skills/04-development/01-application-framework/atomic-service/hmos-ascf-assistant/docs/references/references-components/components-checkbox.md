# checkbox

多选项。

**起始版本：** 1.0.0

## 属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| value | string | - | 否 | 组件值，选中时触发checkbox-group的 change 事件，并携带checkbox的 value。 |
| disabled | boolean | false | 否 | 是否禁用。 |
| checked | boolean | false | 否 | 当前是否选中，可用来设置默认选中。 |
| color | string | \#0A59F7 | 否 | checkbox 的颜色，同 CSS 色值。 |

## 示例

hxml文件：

```html
<view class="page-body">
  <checkbox-group bindchange="checkboxChange">
  <label class="checkbox" has:for="{{ items }}">
    <checkbox
      value="{{ item.name }}"
      checked="{{ item.checked }}"
      disabled="{{ item.disabled }}"/>
    {{item.value}}
  </label>
  </checkbox-group>
</view>
```

js文件：

```js
Page({
  data: {
    items: [
      { name: 'angular', value: 'AngularJS' },
      { name: 'react', value: 'React' },
      { name: 'vue', value: 'Vue.js', checked: true },
      { name: 'node', value: 'nodejs' },
      { name: 'element', value: 'element-ui', disabled: true },
    ],
  },
  checkboxChange: function(e) {
    console.info('checkbox发生change事件，携带value值为：', e.detail.value);
  }
});
```
