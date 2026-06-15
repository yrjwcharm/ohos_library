# cover-image

覆盖在原生组件之上的图片。

可支持在[map](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/components-map)、[video](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/components-video)、[canvas](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/components-canvas)、[camera](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/components-camera)组件上使用。

**重要提示**

cover-image是为兼容旧版小程序设计的组件，新开发项目请直接使用[image](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/components-image)组件。

自起始版本（1.0.22）后，map、video、canvas、camera组件内部嵌套的子内容默认正常显示；旧版本中，标签下的嵌套内容默认不展示。

**起始版本：** 1.0.22

## 约束与限制

cover-image组件默认宽度320px，高度240px。

## 属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| src | string | - | 是 | 图片资源地址。支持线上资源和本地资源，支持png，jpg，jpeg，gif，svg，bmp，webp。 |
| mode | string | scaleToFill | 否 | 图片裁剪、缩放的模式。详细内容参见“mode合法值说明”。 |
| binderror | eventhandle | - | 否 | 当错误发生时触发，event.detail = {errMsg}。 |
| bindload | eventhandle | - | 否 | 当图片载入完毕时触发，event.detail = {height, width}。 |


**mode合法值说明**：

| 值 | 描述 |
| -------- | -------- |
| scaleToFill | 缩放模式，不保持纵横比缩放图片，使图片的宽高完全拉伸至填满image元素。 |
| aspectFit | 缩放模式，保持纵横比缩放图片，使图片的长边能完全显示出来。即：可以完整地将图片显示出来。 |
| aspectFill | 缩放模式，保持纵横比缩放图片，只保证图片的短边能完全显示出来。即：非正方形图片只在水平或垂直方向是完整的，另一个方向将会发生截取。 |
| widthFix | 缩放模式，宽度不变，高度自动变化，保持原图宽高比不变。 |
| heightFix | 缩放模式，高度不变，宽度自动变化，保持原图宽高比不变。 |
| top | 裁剪模式，不缩放图片，只显示图片的顶部区域。 |
| bottom | 裁剪模式，不缩放图片，只显示图片的底部区域。 |
| center | 裁剪模式，不缩放图片，只显示图片的中间区域。 |
| left | 裁剪模式，不缩放图片，只显示图片的左边区域。 |
| right | 裁剪模式，不缩放图片，只显示图片的右边区域。 |
| top left | 裁剪模式，不缩放图片，只显示图片的左上边区域。 |
| top right | 裁剪模式，不缩放图片，只显示图片的右上边区域。 |
| bottom left | 裁剪模式，不缩放图片，只显示图片的左下边区域。 |
| bottom right | 裁剪模式，不缩放图片，只显示图片的右下边区域。 |

## 示例

HXML文件：

```html
<map
  id="myMap"
  class="my-map-container"
  latitude="{{ latitude }}"
  longitude="{{ longitude }}"
  scale="16"
  show-location>
  <scroll-view class="comp-container" scroll-y="true">
    <cover-view class="info-card" has:for="{{ modeArray }}" has:for-item="item">
      <cover-view class="card-title">
          {{ item.text }}
      </cover-view>
      <cover-image class="card-image" src="{{ src }}" mode="{{ item.mode }}" bindload="imageLoad"></cover-image>
      <cover-view class="card-btn" bindtap="onBtnClick" data-mode="{{ item.mode }}">
          点击按钮
      </cover-view>
    </cover-view>
  </scroll-view>
</map>
```

JS文件：

```js
Page({
  data: {
    latitude: 39.908823,
    longitude: 116.397470,

    modeArray: [
      { mode: 'scaleToFill', text: 'scaleToFill：不保持纵横比缩放图片，使图片完全适应' },
      { mode: 'aspectFit', text: 'aspectFit：保持纵横比缩放图片，使图片的长边能完全显示出来' },
      { mode: 'aspectFill', text: 'aspectFill：保持纵横比缩放图片，只保证图片的短边能完全显示出来' },
      { mode: 'widthFix', text: 'widthFix：宽度不变，高度自动变化，保持原图宽高比不变' },
      { mode: 'top', text: 'top：不缩放图片，只显示图片的顶部区域' },
      { mode: 'bottom', text: 'bottom：不缩放图片，只显示图片的底部区域' },
      { mode: 'center', text: 'center：不缩放图片，只显示图片的中间区域' },
      { mode: 'left', text: 'left：不缩放图片，只显示图片的左边区域' },
      { mode: 'right', text: 'right：不缩放图片，只显示图片的右边区域' },
      { mode: 'top left', text: 'top left：不缩放图片，只显示图片的左上边区域' },
      { mode: 'top right', text: 'top right：不缩放图片，只显示图片的右上边区域' },
      { mode: 'bottom left', text: 'bottom left：不缩放图片，只显示图片的左下边区域' },
      { mode: 'bottom right', text: 'bottom right：不缩放图片，只显示图片的右下边区域' },
    ],

    src: 'https://consumer.huawei.com/content/dam/huawei-cbg-site/cn/mkt/pdp/phones/mate80-pro-max/img/kv/kv-2x.webp', // 此处仅为样例，请开发者更换为可用图片资源地址
  },

  onBtnClick(e) {
    has.showToast({
      title: `当前 mode：${e.currentTarget.dataset.mode}`,
      icon: 'success'
    })
  },

  imageLoadError(e) {
    console.info('加载失败', e.detail)
  },

  imageLoad(e) {
    console.info('加载完成', e.detail)
  },
});
```

CSS文件：

```CSS
.my-map-container {
  width: 100%;
  height: 100vh;
}

.comp-container {
  position: relative;
  width: 100vw;
  height: 40vh;
}

.info-card {
  background: rgba(255,255,255,0.5);
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15);
  margin-bottom: 20rpx;
}

.card-title {
  font-size: 30rpx;
  font-weight: 500;
  color: #333;
  margin-bottom: 20rpx;
}

.card-image {
  width: 100%;
  height: 320rpx;
  border-radius: 12rpx;
  object-fit: cover;
  margin-bottom: 24rpx;
  border: 3rpx solid #0A59F7;
  box-sizing: border-box;
}

.card-btn {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  background-color: #0A59F7;
  color: #fff;
  text-align: center;
  border-radius: 500rpx;
  font-size: 32rpx;
}
```