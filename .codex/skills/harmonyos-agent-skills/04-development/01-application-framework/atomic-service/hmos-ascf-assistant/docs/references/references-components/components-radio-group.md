# radio-group

单项选择器，内部由多个radio组成。

**起始版本：** 1.0.0

## 属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| bindchange | eventhandle | - | 否 | 点击导致radio-group中选中项发生改变时触发change事件，detail = {value}。 |

## 示例

hxml文件：

```html
<view>
  <view>推荐展示样式</view>
  <view>
    <radio-group bindchange="radioChange">
      <label has:for="{{items}}" has:key="{{item.value}}">
        <view>
          <radio value="{{item.value}}" checked="true" />
        </view>
        <view>{{item.name}}</view>
      </label>
    </radio-group>
  </view>
</view>
```

js文件：

```js
Page({
  data: {
    items: [
      { value: 'USA', name: '美国' },
      { value: 'CHN', name: '中国', checked: 'true' },
      { value: 'BRA', name: '巴西' },
      { value: 'JPN', name: '日本' },
      { value: 'ENG', name: '英国' },
      { value: 'FRA', name: '法国' },
    ],
  },
  radioChange(e) {
    console.info('radio发生change事件，携带value值为：', e.detail.value);
    const items = this.data.items;
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value;
    };
    this.setData({
      items
    });
  }
});
```
