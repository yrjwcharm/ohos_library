# picker

滚动选择器。选择器包括一个或多个不同值的可滚动列表。

**起始版本：** 1.0.0

## 属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| mode | string | selector | 否 | 选择器类型。<br/>selector：普通选择器<br/>multiSelector：多列选择器<br/>time：时间选择器<br/>date：日期选择器<br/>region：省市区选择器 |
| disabled | boolean | false | 否 | 是否禁用。 |
| bindcancel | eventhandle | - | 否 | 取消选择时触发。 |

除了上述通用的属性，对于不同的mode，picker会有不同的属性。

### 普通选择器

当**mode = selector**时，表示普通选择器。

| 名称 | 类型 | 默认值 | 描述 |
| -------- | -------- | -------- | -------- |
| range | array/object array | [] | mode 为 selector 或 multiSelector 时，range 有效。 |
| range-key | string | - | 当 range 是一个 Object Array 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容。 |
| value | number | 0 | 表示选择了 range 中的第几个（下标从 0 开始）。 |
| bindchange | eventhandle | - | value 改变时触发 change 事件，event.detail = {value}。 |

### 多列选择器

当**mode = multiSelector**时，表示多列选择器。

| 名称 | 类型 | 默认值 | 描述 |
| -------- | -------- | -------- | -------- |
| range | array/object array | [] | mode 为 selector 或 multiSelector 时，range 有效。 |
| range-key | string | - | 当 range 是一个 Object Array 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容。 |
| value | array | [] | 表示选择了 range 中的第几个（下标从 0 开始）。 |
| bindchange | eventhandle | - | value 改变时触发 change 事件，event.detail = {value}。 |
| bindcolumnchange | eventhandle | - | 列改变时触发。 |

### 时间选择器

当**mode = time**时，表示时间选择器。

| 名称 | 类型 | 默认值 | 描述 |
| -------- | -------- | -------- | -------- |
| value | string | - | 表示选中的时间，格式为"hh:mm"。 |
| start | string | - | 表示有效时间范围的开始，字符串格式为"hh:mm"。 |
| end | string | - | 表示有效时间范围的结束，字符串格式为"hh:mm"。 |
| bindchange | eventhandle | - | value 改变时触发change事件。 |

### 日期选择器

当**mode = date**时，表示日期选择器。

| 名称 | 类型 | 默认值 | 描述 |
| -------- | -------- | -------- | -------- |
| value | string | 当天 | 表示选中的日期，格式为"YYYY-MM-DD"。 |
| start | string | - | 表示有效日期范围的开始，字符串格式为"YYYY-MM-DD"。 |
| end | string | - | 表示有效日期范围的结束，字符串格式为"YYYY-MM-DD"。 |
| bindchange | eventhandle | - | value 改变时触发 change 事件，event.detail = {value}。 |

### 省市区选择器

当**mode = region**时，表示省市区选择器。

| 名称 | 类型 | 默认值 | 描述 |
| -------- | -------- | -------- | -------- |
| value | array | [] | 表示选中的省市区，默认选中每一列的第一个值。 |
| bindchange | eventhandle | - | value 改变时触发 change 事件，event.detail = {value, code,}，其中字段 code 是统计用区划代码。 |

## 示例

hxml文件：

```html
<view class="page-body">
  <view class="page-section">
  <view class="contentTitle">普通选择器</view>
  <view class="contentBody">
    <view class="contentKey">当前选择</view>
    <view class="contentVal">
    <picker
      bindchange="bindPickerChange"
      value="{{index}}"
      range="{{array}}">
      <view>{{array[index]}}</view>
    </picker>
    </view>
  </view>
  <view class="contentTitle">时间选择器</view>
  <view class="contentBody">
    <view class="contentKey">当前选择</view>
    <view class="contentVal">
    <picker
      mode="time"
      value="{{time}}"
      start="09:01"
      end="21:01"
      bindchange="bindTimeChange">
      <view>{{time}}</view>
    </picker>
    </view>
  </view>
  <view class="page-body">
    <view class="page-section">
    <view class="page-section-spacing">
      <picker mode="multiSelector"
        value="{{multiIndex}}"
        range="{{multiArray}}"
        bindchange="bindPickerChange"
        bindcolumnchange="bindColumnChange">
      <view class="picker">多列选择器</view>
      </picker>
    </view>
    </view>
  </view>
  </view>
</view>
```

js文件：

```js
Page({
  data: {
    array: ['皮卡丘', '小火龙', '杰尼龟', '火恐龙'],
    index: 0,
    time: '12:01',
    multiIndex: [0, 0],
    // 多列选择器：
    multiArray: [['音频', '视频'], ['酷狗', '音乐']], // 二维数组，长度是多少是几列
  },
  bindPickerChange(event) {
    // event.detail内容举例为：{"value":""}
    console.info('picker组件的选择发生改变，携带值为', event.detail);
  },
  bindTimeChange(event) {
    // event.detail.value内容举例为：**:**
    console.info('picker组件mode为time时，选择发生改变，携带值为：', event.detail.value);
    this.setData({
      time: event.detail.value
    });
  },
  bindColumnChange(event) {
    // event.detail内容举例为：{"value":[],"column":""}
    console.info('picker组件列改变时触发，携带值为：', event.detail);
  }
});
```
