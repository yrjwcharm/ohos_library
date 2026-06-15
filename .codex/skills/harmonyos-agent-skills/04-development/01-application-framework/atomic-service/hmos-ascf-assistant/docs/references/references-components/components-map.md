# Map

地图组件。

使用前，需参考[开发准备](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/map-config-agc)完成基本准备工作。

如果需要在地图上显示用户位置，需要申请位置权限或是使用位置控件，申请方式请参考[开启“我的位置”按钮 方式二](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/map-location#section550812311069)。

**起始版本：** 1.0.0

**关联文档：** [has.createMapContext](../references-apis/apis-map.md#hascreatemapcontext)

## 属性

| 名称 | 类型 | 默认值 | 必填 | 描述                                                           |
| -------- | -------- | -------- | -------- |--------------------------------------------------------------|
| latitude | number | 39.908692 | 是 | 中心纬度。默认为天安门的纬度。<br/>**说明：** 中国大陆及港澳地区，请使用gcj02，其他地区请使用wgs84。 |
| longitude | number | 116.397477 | 是 | 中心经度。默认为天安门的经度。<br/>**说明：** 中国大陆及港澳地区，请使用gcj02，其他地区请使用wgs84。 |
| scale | number | 16 | 否 | 缩放级别，取值范围为2-20。                                              |
| markers | Array&lt;marker&gt; | - | 否 | 标记点，详见[Marker说明](#marker说明)。                                 |
| circles | Array&lt;circle&gt; | - | 否 | 圆，详见[Circle说明](#circle说明)。                                   |
| polyline | Array&lt;polyline&gt; | - | 否 | 路线，详见[polyline说明](#polyline说明)。                              |
| show-location | boolean | false | 否 | 是否显示当前定位点。                                                   |
| show-compass | boolean | false | 否 | 是否显示指南针。<br/>**起始版本：** 1.0.18                                |
| enable-rotate | boolean | false | 否 | 是否支持旋转。<br/>**起始版本：** 1.0.18                                 |
| enable-scroll | boolean | true | 否 | 是否支持拖动。<br/>**起始版本：** 1.0.18                                 |
| enable-zoom | boolean | true | 否 | 是否支持缩放。<br/>**起始版本：** 1.0.18                                 |
| polygons | Array&lt;polygon&gt; | - | 否 | 多边形，详见[polygon说明](#polygon说明)。<br/>**起始版本：** 1.0.18          |
| enable-center-scale | boolean | false | 否 | 指定中心点缩放地图。true表示使用组件中心点。false表示使用手势中心点。<br/>**起始版本：** 1.0.19 |
| bindtap | event | - | 否 | 点击地图时触发。                                                     |
| bindmarkertap | event | - | 否 | 点击标记点时触发，e.detail = {markerId}。                              |
| bindupdated | event | - | 否 | 当地图渲染更新完成时触发。                                                |
| bindregionchange | event | - | 否 | 当视野发生变化时触发。<br/>**起始版本：** 1.0.8                              |
| bindcallouttap | event | - | 否 | 点击标记点对应的气泡时触发，e.detail = {markerId}。<br/>**起始版本：** 1.0.10    |

**bindregionchange返回值：**

| 名称 | 类型 | 说明 |
| -------- | -------- | -------- |
| type | string | 表示事件触发的类型。<br/>在视野变化开始时触发：begin<br/>在视野变化结束时触发：end |
| causedBy | string | 表示导致视野变化的原因。<br/>begin阶段返回causedBy：<br/> 1. 手势触发：gesture<br/>2. 调用接口：update<br/> end阶段返回causedBy：<br/>1. 拖动地图：drag<br/>2. 缩放：scale<br/>3. 调用接口：update |

### Marker说明

| 名称 | 类型 | 默认值   | 必填 | 描述                                                                       |
| -------- | -------- |-------| -------- |--------------------------------------------------------------------------|
| id | number | -     | 是 | 标记点 id。marker 点击事件回调会返回此 id。                                             |
| latitude | number | -     | 是 | 纬度，浮点数。范围 -90 ~ 90。<br/>**说明：** 中国大陆及港澳地区，请使用 gcj02，其他地区请使用 wgs84。       |
| longitude | number | -     | 是 | 经度，浮点数。范围 -180 ~ 180。<br/>**说明：** 中国大陆及港澳地区，请使用 gcj02，其他地区请使用 wgs84。     |
| title | string | -     | 否 | 标注点名，点击时显示。<br/>从1.0.10开始，支持callout属性，如果callout存在，title将被忽略。             |
| zIndex | number | -     | 否 | 显示层级。                                                                    |
| iconPath | string | -     | 是 | 支持网络路径、本地路径、代码包路径。                                                       |
| rotate | number | 0     | 否 | 顺时针旋转的角度。范围 0 ~ 360，默认为 0。                                               |
| alpha | number | 1     | 否 | 标注的透明度。默认 1，无透明，范围 0 ~ 1。                                                |
| anchor | Object | -     | 否 | 经纬度在标注图标的锚点。默认底边中点。{x, y}，x 表示横向(0-1)，y 表示竖向(0-1)。{x: 0.5, y: 1} 表示底边中点。 |
| clickable | boolean | true | 否 | 标记是否可以点击。默认值为true，异常值按默认值处理。true：可点击；false：不可点击。                        |
| callout | Object | -     | 否 | 标记点上方的气泡窗口。详见[callout说明](#marker上的callout说明)。<br/>**起始版本：** 1.0.10       |
| label | Array&lt;Object&gt; | -     | 否 | 在标记点旁边增加标签。详见[label说明](#marker上的label说明)。<br/>**起始版本：** 1.0.10           |
| customCallout | Object | - | 否 | 自定义气泡窗口。详见[customCallout说明](#marker上的自定义气泡customcallout说明)。<br/>**起始版本：** 1.0.22           |

### Marker上的callout说明

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| content | string | - | 否 | 文本。 |
| padding | number\|string | 0 | 否 | 文本边缘留白，支持传入单位（rpx/px），默认单位：px。 |
| bgColor | string | \#FFFFFF（白色） | 否 | 背景色。 |
| color | string | \#000000（黑色） | 否 | 文本颜色。 |
| fontSize | number\|string | 15 | 否 | 文字大小，支持传入单位（rpx/px），默认单位：px。 |
| weight | string | Normal | 否 | 文本的字体粗细。<br/>有效值：<br/>Lighter：字体较细。<br/>Normal：字体粗细正常。<br/>Regular：字体粗细正常。<br/>Medium：字体粗细适中。<br/>Bold：字体较粗。<br/>Bolder：字体非常粗。 |
| fontStyle | string | Normal | 否 | 定义标题字体样式。<br/>有效值：<br/>Normal：标准字体样式。<br/>Italic：斜体。 |
| textAlign | string | center | 否 | 文本对齐方式。<br/>有效值：<br/>Start：居左。<br/>End：居右。<br/>Center：居中。 |
| borderWidth | number\|string | 0 | 否 | 边框宽度，支持传入单位（rpx/px），默认单位：px。 |
| borderColor | string | \#FFFFFF（白色） | 否 | 边框颜色。 |
| borderRadius | number\|string | 0 | 否 | 边框圆角，支持传入单位（rpx/px），默认单位：px。 |

### Marker上的label说明

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| content | string | - | 是 | 文本。 |
| color | string | \#000000（黑色） | 否 | 标题字体颜色。 |
| fontSize | number\|string | 15 | 否 | 标题字体大小，支持传入单位（rpx/px），默认单位：px。 |
| strokeColor | string | \#FFFFFF（白色） | 否 | 标题描边颜色。 |
| strokeWidth | number\|string | 2 | 否 | 标题描边宽度，取值范围大于0，小于等于10，支持传入单位（rpx/px），默认单位：px 。 |
| fontStyle | string | REGULAR | 否 | 标题字体样式。<br/>有效值：<br/>REGULAR：普通。<br/>BOLD：粗体。<br/>ITALIC：斜体。<br/>BOLD_ITALIC：粗斜体。<br/>MEDIUM：中等粗。<br/>MEDIUM_ITALIC：中等粗斜体。 |

### Marker上的自定义气泡customCallout说明


| 名称 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| display | string | BYCLICK | 否 | 气泡显示状态。</br>有效值：</br>BYCLICK：点击显示。</br>ALWAYS：常显。 |
| anchorX | number | 0 | 否 | 横向偏移量，向右为正数。 |
| anchorY | number | 0 | 否 | 纵向偏移量，向下为正数。 |

使用方式如下，map组件下添加名为callout的slot节点，其内部的cover-view通过marker-id属性与marker绑定。当marker创建时，该cover-view显示的内容将作为callout显示在标记点上方。

```html
<map>
  <cover-view slot="callout">
    <cover-view marker-id="1"></cover-view>
    <cover-view marker-id="2"></cover-view>
  </cover-view>
</map>
```

**约束与限制**：
- customCallout存在时将忽略callout与title属性。
- 自定义气泡支持使用view、image、cover-view、cover-image定制。
- 自定义气泡数量建议不要超过50个。
- callout插槽内的节点绑定的[手势事件](../references-framework/logical-layer-event-category.md)不会生效（如bindtap、bindtouchstart等）。如需处理气泡点击事件，可通过地图组件的bindcallouttap属性实现。

### polygon说明

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| points | array | - | 是 | 经纬度数组[{latitude: 0, longitude: 0}]。 |
| strokeWidth | number\|string | 1 | 否 | 描边的宽度，支持传入单位（rpx/px），默认单位：vp 。<br/>**说明：** 当传入string类型不指定像素单位时，默认单位vp，如'10'，等同于10；传入number类型时，默认单位vp。 |
| strokeColor | string | \#0A59F7CC | 否 | 描边的颜色。 |
| fillColor | string | \#0A59F71A | 否 | 填充颜色。 |
| zIndex | number | - | 否 | 设置多边形 Z 轴数值。 |

### Circle说明

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| latitude | number | - | 是 | 纬度，浮点数，范围 -90 ~ 90。<br/>**说明：** 中国大陆及港澳地区，请使用 gcj02，其他地区请使用 wgs84。 |
| longitude | number | - | 是 | 经度，浮点数，范围 -180 ~ 180。<br/>**说明：** 中国大陆及港澳地区，请使用 gcj02，其他地区请使用 wgs84。 |
| color | string | \#000000ff | 否 | 描边的颜色。 |
| fillColor | string | \#00000000 | 否 | 填充颜色。 |
| radius | number | - | 是 | 圆的半径，单位 “米”。 |
| strokeWidth | number\|string | 1 | 否 | 描边的宽度，支持传入单位（rpx/px），默认单位：vp。<br/>**说明：** 当传入string类型不指定像素单位时，默认单位vp，如'10'，等同于10；传入number类型时，默认单位vp。 |
| zIndex | number | - | 否 | z轴排序，用于描述压盖关系。 |

### polyline说明

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| points | array | - | 是 | [{latitude: 0, longitude: 0}]经纬度数组。<br/>**说明：** 中国大陆及港澳地区，请使用 gcj02，其他地区请使用 wgs84。 |
| width | number\|string | 1 | 否 | 线的宽度，支持传入单位（rpx/px），默认单位：vp。<br/>**说明：** 当传入string类型不指定像素单位时，默认单位vp，如'10'，等同于10；传入number类型时，默认单位vp。 |
| color | string | "\#000000ff" | 否 | 线的颜色。 |
| dottedLine | boolean | false | 否 | 是否虚线 |
| zIndex | number | - | 否 | z轴坐标。 |

## 示例

**示例1（设置marker标记）：**

hxml文件：

```html
<view>
  <map
    id="map"
    style="width: 100%; height: 100vh"
    latitude="{{ latitude }}"
    longitude="{{ longitude }}"
    markers="{{ markers }}"
    scale="{{ scale }}"
    show-location="{{ showLocation }}"
    bindmarkertap="bindmarkertap"
    bindtap="bindtap"
    bindupdated="bindupdated"/>
</view>
```

js代码：

```js
Page({
  data: {
    showLocation: true,
    latitude: 23.106574,
    longitude: 113.324587,
    scale: 10,
    markers: [
      {
        id: 0,
        latitude: 23.13065, // 纬度
        longitude: 113.3274, // 经度
        title: '我是marker标记点', // 标注点名
        zIndex: 1,
        iconPath: 'xxx/xxx.png', // 显示的图标
        rotate: 10, // 旋转度数
        alpha: 1, // 透明度
        anchor: { x: 0.5, y: 1 },
        clickable: true
      }
    ]
  },
  bindmarkertap(e) {
    console.info('markertap标记=', e);
  },
  bindtap(e) {
    console.info('bindtap标记=', e);
  },
  bindupdated(e) {
    console.info('bindupdated标记=', e);
  }
});
```



**示例2（设置marker标记上的气泡callout）：**

hxml文件：

```html
<view>
  <map
    id="map"
    style="width: 100%; height: 100vh"
    latitude="{{ latitude }}"
    longitude="{{ longitude }}"
    scale="{{ scale }}"
    markers="{{ markers }}"
    bindcallouttap="bindcallouttap"/>
</view>
```

js代码：

```js
Page({
  data: {
    latitude: 23.106574,
    longitude: 113.324587,
    scale: 10,
    markers: [
      {
        id: 0,
        latitude: 23.13065, // 纬度
        longitude: 113.3274, // 经度
        zIndex: 1,
        iconPath: 'xxx/xxx.png', // 显示的图标
        clickable: true,
        callout: {
          content: 'callout标题',
          padding: 5,
          bgColor: '#FFFFFF',
          color: '#000000',
          fontSize: 15,
          weight: 'Normal',
          fontStyle: 'Normal',
          textAlign: 'Center',
          borderWidth: 2,
          borderColor: '#FF0000',
          borderRadius: 10
        }
      }
    ]
  },
  bindcallouttap(e) {
    console.info('bindcallouttap标记=', e);
  }
});
```



**示例3（设置marker标记旁边的标签label）：**

hxml文件：

```html
<view>
  <map
    id="map"
    style="width: 100%; height: 100vh"
    latitude="{{ latitude }}"
    longitude="{{ longitude }}"
    scale="{{ scale }}"
    markers="{{ markers }}"/>
</view>
```

js代码：

```js
Page({
  data: {
    latitude: 23.106574,
    longitude: 113.324587,
    scale: 10,
    markers: [
      {
        id: 0,
        latitude: 23.13065, // 纬度
        longitude: 113.3274, // 经度
        zIndex: 1,
        iconPath: 'xxx/xxx.png', // 显示的图标
        clickable: true,
        label: [
          {
            content: 'label标题',
            color: '#000000',
            fontSize: 15,
            strokeColor: '#FF0000',
            strokeWidth: 10,
            fontStyle: 'REGULAR',
          }
        ]
      }
    ]
  }
});
```



**示例4（设置circle）：**

hxml文件：

```html
<view>
  <map
    id="map"
    style="width: 100%; height: 100vh"
    latitude="{{ latitude }}"
    longitude="{{ longitude }}"
    scale="{{ scale }}"
    circles="{{ circles }}"/>
</view>
```

js代码：

```js
Page({
  data: {
    latitude: 23.106574,
    longitude: 113.324587,
    scale: 12,
    circles: [{
      latitude: 23.106574,
      longitude: 113.324587,
      color: '#000000ff',
      fillColor: '#ff0000',
      radius: 1000,
      strokeWidth: 10,
      zIndex: 1
    }]
  }
});
```



**示例5（设置多边形polygon）：**

hxml文件：

```html
<view>
  <map
    id="map"
    style="width: 100%; height: 100vh"
    latitude="{{ latitude }}"
    longitude="{{ longitude }}"
    scale="{{ scale }}"
    polygons="{{ polygons }}"/>
</view>
```

js代码：

```js
Page({
  data: {
    latitude: 23.106574,
    longitude: 113.324587,
    scale: 12,
    polygons: [{
      points: [
        { longitude: 113.314587, latitude: 23.116574 },
        { longitude: 113.314587, latitude: 23.096574 },
        { longitude: 113.334587, latitude: 23.096574 },
        { longitude: 113.334587, latitude: 23.116574 }
      ],
      strokeWidth: 10,
      strokeColor: '#000000',
      fillColor: '#FF0000',
      zIndex: 10
    }]
  }
});
```


**示例6（设置路线polyline）：**

hxml文件：

```html
<view>
  <map
    id="map"
    style="width: 100%; height: 100vh;"
    latitude="{{ latitude }}"
    longitude="{{ longitude }}"
    polyline="{{ polyline }}"
    scale="{{ scale }}"
    show-location='{{ showLocation }}'/>
</view>
```

js代码：

```js
Page({
  data: {
    showLocation: true,
    latitude: 30.490487597079223,
    longitude: 114.53563002817789,
    scale: 12,
    polyline: [{
      points: [
        { latitude: 30.490487597079223, longitude: 114.53563002817789 },
        { latitude: 30.490559597079223, longitude: 114.55880402817789 }
      ],
      color: '#FF0000',
      zIndex: 0
    }]
  }
});
```

**示例7（设置marker自定义气泡customCallout）：**

hxml文件：

```html
<view>
  <map
    id="map"
    style="width: 100%; height: 100vh"
    latitude="{{ latitude }}"
    longitude="{{ longitude }}"
    scale="{{ scale }}"
    markers="{{ markers }}"
    bindcallouttap="bindcallouttap">
    <cover-view slot="callout">
      <cover-view class="customCallout" marker-id="1">
        marker-1
      </cover-view>
    </cover-view>
  </map>
</view>
```

js代码：

```js
Page({
  data: {
    latitude: 23.106574,
    longitude: 113.324587,
    scale: 10,
    markers: [
      {
        id: 1,
        latitude: 23.095994,
        longitude: 113.325520,
        customCallout: {
          anchorY: 0,
          anchorX: 0,
          display: 'ALWAYS'
        }
      }
    ]
  },
  bindcallouttap(e) {
    console.info('点击标记点气泡，Marker ID:', e.detail.markerId);
  }
});
```

css代码：

```css
.customCallout {
    box-sizing: border-box;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 15px;
    width: 150px;
    height: 30px;
    display: inline-flex;
    padding: 5px 20px;
    justify-content: center;
    align-items: center;
}
```