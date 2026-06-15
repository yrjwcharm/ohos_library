# progress

进度条。

**起始版本：** 1.0.0

## 属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| percent | number | 0 | 否 | 百分比0~100。 |
| show-info | boolean | false | 否 | 在进度条右侧显示百分比。 |
| border-radius | number\|string | 0 | 否 | 圆角大小。 |
| font-size | number\|string | 16 | 否 | 右侧百分比字体大小。 |
| stroke-width | number\|string | 4 | 否 | 进度条线的宽度。 |
| color | string | \#0A59F7 | 否 | 进度条进行中颜色，同activeColor。 |
| activeColor | string | \#0A59F7 | 否 | 已选择的进度条的颜色。 |
| backgroundColor | string | rgba(0,0,0,0.098) | 否 | 未选择的进度条的颜色。 |
| active | boolean | false | 否 | 进度条从左往右的动画。 |
| active-mode | string | backwards | 否 | - backwards: 动画从头播放。<br/>- forwards：动画从上次结束的位置开始接续播放。<br/>**起始版本：** 1.0.3 |
| duration | number | 30 | 否 | 进度增加1%所需毫秒数。 |
| bindactiveend | eventhandle | - | 否 | 动画完成事件。 |

## 示例

hxml文件：

```html
<view class="container">
  <view class="page-body">
    <view class="page-section">
      <view style="padding: 0 40rpx" class="page-section-title">动态设置</view>
      <view class="page-section-spacing">
        <progress
          percent="{{percent}}"
          show-info="{{showInfo}}"
          border-radius="{{borderRadius}}"
          font-size="{{fontSize}}"
          stroke-width="{{strokeWidth}}"
          color="{{color}}"
          activeColor="{{activeColor}}"
          backgroundColor="{{backgroundColor}}"
          active="{{active}}"
          active-mode="{{activeMode}}"
          bindactiveend="activeEndEvent"
          duration="{{duration}}"/>
      </view>

      <view class="page-section-setting">
        <view class="page-section-title">set active-mode:动画播放方式。</view>
        <view class="weui-cell weui-cell_input">
          <input value="{{activeMode}}" bindchange="setActiveMode" placeholder="backwards/forwards"/>
        </view>
      </view>

      <view class="page-section-setting">
        <view class="page-section-title">set show-info :显示百分比。</view>
        <view class="weui-cell weui-cell_input">
          <input value="{{showInfo}}" bindchange="setShowInfo" placeholder="true/false"/>
        </view>
      </view>

      <view class="page-section-setting">
        <view class="page-section-title">set active:进度条从左往右的动画。</view>
        <view class="weui-cell weui-cell_input">
          <input value="{{active}}" bindchange="setActive" placeholder="true/false"/>
        </view>
      </view>

      <view class="page-section-setting">
        <view class="page-section-title">set percent:百分比0~100。</view>
        <view class="weui-cell weui-cell_input">
          <input class="weui-input" value="{{percent}}" bindblur="setPercent"/>
        </view>
      </view>

      <view class="page-section-setting">
        <view class="page-section-title">set border-radius:圆角大小。</view>
        <view class="weui-cell weui-cell_input">
          <input type="text" value="{{borderRadius}}" bindblur="setBorderRadius"/>
        </view>
      </view>

      <view class="page-section-setting">
        <view class="page-section-title">set font-size:右侧百分比字体大小。</view>
        <view class="weui-cell weui-cell_input">
          <input type="text" value="{{fontSize}}" bindblur="setFontSize"/>
        </view>
      </view>

      <view class="page-section-setting">
        <view class="page-section-title">set stroke-width:进度条线的宽度。</view>
        <view class="weui-cell weui-cell_input">
          <input class="weui-input" value="{{strokeWidth}}" bindblur="setStrokeWidth"/>
        </view>
      </view>

      <view class="page-section-setting">
        <view class="page-section-title">set duration:进度增加1%所需毫秒数。</view>
        <view class="weui-cell weui-cell_input">
          <input class="weui-input" value="{{duration}}" bindblur="setDuration"/>
        </view>
      </view>

      <view class="page-section-setting">
        <view class="page-section-title">set color:进度条进行中颜色。</view>
        <view class="weui-cell weui-cell_input">
          <input type="text" value="{{color}}" bindblur="setColor"/>
        </view>
      </view>

      <view class="page-section-setting">
        <view class="page-section-title">set activeColor:已选择的进度条的颜色。</view>
        <view class="weui-cell weui-cell_input">
          <input type="text" value="{{activeColor}}" bindblur="setActiveColor"/>
        </view>
      </view>

      <view class="page-section-setting">
        <view class="page-section-title">set backgroundColor:未选择的进度条的颜色。</view>
        <view class="weui-cell weui-cell_input">
          <input type="text" value="{{backgroundColor}}" bindblur="setBackgroundColor"/>
        </view>
      </view>
    </view>
  </view>
</view>
```

js文件：

```js
const dataNormalize = (str) => {
  let json;
  try {
    json = JSON.parse(str);
  } catch {
    console.error('dataNormalize error');
  }
  const baseObject = {
    [str]: json ? json : str,
    'object': {},
    'null': null,
    'undefined': undefined,
    'false': false
  };
  return baseObject[str];
};

Page({
  data: {
    showInfo: false,
    active: true,
    activeMode: 'backwards',
    percent: 100,
    borderRadius: 0,
    fontSize: 16,
    strokeWidth: 4,
    duration: 30,
    color: '#0A59F7',
    activeColor: '#0A59F7',
    backgroundColor: '#00000019'
  },
  setActiveMode(event) {
    console.info('setActiveMode', event.detail.value);
    this.setData({
      activeMode: dataNormalize(event.detail.value)
    });
  },
  setShowInfo(event) {
    console.info('setShowInfo', event.detail.value);
    this.setData({
      showInfo: dataNormalize(event.detail.value)
    });
  },
  setActive(event) {
    console.info('setActive', event.detail.value);
    this.setData({
      active: dataNormalize(event.detail.value)
    });
  },
  setPercent(event) {
    console.info('setPercent', event.detail.value);
    this.setData({
      percent: dataNormalize(event.detail.value)
    });
  },
  setBorderRadius(event) {
    console.info('setBorderRadius', event.detail.value);
    this.setData({
      borderRadius: dataNormalize(event.detail.value)
    });
  },
  setFontSize(event) {
    console.info('setFontSize', event.detail.value);
    this.setData({
      fontSize: dataNormalize(event.detail.value)
    });
  },
  setStrokeWidth(event) {
    console.info('setStrokeWidth', e.detail.value);
    this.setData({
      strokeWidth: dataNormalize(event.detail.value)
    });
  },
  setDuration(event) {
    console.info('setDuration', event.detail.value);
    this.setData({
      duration: dataNormalize(event.detail.value)
    });
  },
  setColor(event) {
    console.info('setColor', event.detail.value);
    this.setData({
      color: dataNormalize(event.detail.value)
    });
  },
  setActiveColor(event) {
    console.info('setActiveColor', event.detail.value);
    this.setData({
      activeColor: dataNormalize(event.detail.value)
    });
  },
  setBackgroundColor(event) {
    console.info('setBackgroundColor', event.detail.value);
    this.setData({
      backgroundColor: dataNormalize(event.detail.value)
    });
  },
  activeEndEvent(event) {
    // event.detail内容举例为：{"curPercent":0}
    console.info('progress组件发生了activeEnd事件，携带数据为：', event.detail);
  }
});
```

css文件：

```css
.page-section {
  width: 100%;
  margin-bottom: 60rpx;
}

.page-section-setting {
  border-radius: 40rpx;
  border: 1px solid #ccc;
  margin: 20rpx 10rpx;
  padding: 20rpx 0;
}

.page-section-title {
  font-size: 32rpx;
  margin-bottom: 10rpx;
  padding: 20rpx;
  font-weight: 800;
  color: #0A59F7;
}

.swiper-item {
  display: block;
  height: 100%;
}

.view-example {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400rpx;
  height: 300rpx;
  margin: 0 auto;
  padding: 20rpx;
  border: 1px solid #ccc;
}

.bg-red {
  background-color: red;
}

.bg-blue {
  background-color: blue;
}

.bg-green {
  background-color: green;
}

button {
  margin-left: 40rpx;
}

switch {
  margin-left: 40rpx;
}

.weui-cell_input {
  background-color: rgba(0, 0, 0, 0.047);
  margin: 0 40rpx;
}
```