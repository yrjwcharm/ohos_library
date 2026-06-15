# cover-view

覆盖在原生组件之上的文本视图。

可支持在[map](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/components-map)、[video](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/components-video)、[canvas](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/components-canvas)、[camera](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/components-camera)组件上使用。

**重要提示**

cover-view是为兼容旧版小程序设计的组件，新开发项目请直接使用[view](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/components-view)组件。

自起始版本（1.0.22）后，map、video、canvas、camera组件内部嵌套的子内容默认正常显示；旧版本中，标签下的嵌套内容默认不展示。

**起始版本：** 1.0.22

## 属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| hover-class | string | none | 否 | 指定按下去的样式类。当 hover-class="none" 时，没有点击态效果。 |
| hover-start-time | number | 50 | 否 | 按住后多久出现点击态，单位毫秒。 |
| hover-stay-time | number | 400 | 否 | 手指松开后点击态保留时间，单位毫秒。 |
| hover-stop-propagation | boolean | false | 否 | 指定是否阻止本节点的祖先节点出现点击态。 |

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
  <cover-view class="cover-container">

    <cover-view
      class="cover-title"
      hover-class="title-hover"
      hover-start-time="100">
      cover-view
    </cover-view>

    <cover-view
      class="cover-stay"
      hover-class="stay-hover"
      hover-stay-time="1000"
      bindtap="onCoverTap">
      点击后效果保留1000ms
    </cover-view>

    <cover-view class="test-box" hover-class="parent-hover">
      <cover-view class="test-child" hover-class="child-hover">
        正常冒泡: 父子节点都会高亮
      </cover-view>
    </cover-view>

    <cover-view class="test-box" hover-class="parent-hover">
      <cover-view
        class="test-child"
        hover-class="child-hover"
        hover-stop-propagation="{{true}}">
        阻止冒泡: 父节点不会高亮
      </cover-view>
    </cover-view>

  </cover-view>
</map>
```

JS文件：

```JS
Page({
  data: {
    latitude: 39.908823,
    longitude: 116.397470
  },
  onCoverTap() {
    has.showToast({
      title: '按钮点击成功',
      icon: 'success'
    })
  }
})
```

CSS文件：

```CSS
.my-map-container {
  width: 100%;
  height: 100vh;
}

.cover-container {
  position: absolute;
  top: 30rpx;
  left: 30rpx;
  right: 30rpx;
  padding: 30rpx;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12rpx;
}

.cover-title {
  font-size: 34rpx;
  font-weight: bold;
  text-align: center;
  padding: 15rpx;
  margin-bottom: 25rpx;
}

.title-hover {
  background: #f5f5f5;
  color: #0066ff;
}

.cover-stay {
  background: #e8f3ff;
  padding: 20rpx;
  text-align: center;
  border-radius: 8rpx;
  margin-bottom: 25rpx;
}

.stay-hover {
  background: #409eff;
  color: #fff;
}

.test-box {
  padding: 25rpx;
  border: 2rpx solid #eee;
  margin-bottom: 20rpx;
  transition: all 0.2s;
  text-align: center;
}

.parent-hover {
  background: #fff5cc;
  border-color: #ff9500;
}

.test-child {
  padding: 20rpx;
  background: #f7f7f7;
  border-radius: 8rpx;
}

.child-hover {
  background: #409eff;
  color: #fff;
}
```