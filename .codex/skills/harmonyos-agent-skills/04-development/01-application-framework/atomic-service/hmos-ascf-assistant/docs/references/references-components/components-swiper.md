# swiper

滑块视图容器。其中只可放置swiper-item组件，否则会导致未定义的行为。

**起始版本：** 1.0.0

## 约束与限制

swiper高度可以通过设置swiper-item元素高度来控制，swiper-item的高度取决于第一个 swiper-item的高度。

## 属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| indicator-dots | boolean | false | 否 | 是否显示面板指示点。 |
| indicator-color | string | rgba(0, 0, 0, 0.3) | 否 | 指示点颜色。 |
| indicator-active-color | string | \#0A59F7 | 否 | 当前选中的指示点颜色。 |
| current | number | 0 | 否 | 当前所在滑块的index。<br/>**起始版本：** 1.0.3 |
| autoplay | boolean | false | 否 | 是否自动切换。 |
| interval | number | 5000 | 否 | 自动切换时间间隔。 |
| duration | number | 500 | 否 | 滑动动画时长。 |
| circular | boolean | false | 否 | 是否采用衔接滑动。 |
| vertical | boolean | false | 否 | 滑动方向是否为纵向。 |
| display-multiple-items | number | 1 | 否 | 同时显示的滑块数量。 |
| previous-margin | string | "0px" | 否 | 前边距，可用于露出前一项的一小部分，支持 px 和 rpx 值。 |
| next-margin | string | "0px" | 否 | 后边距，可用于露出后一项的一小部分，支持 px 和 rpx 值。 |
| disable-touch | boolean | false | 否 | 是否禁止用户touch操作。 |

## 事件

| 名称 | 参数 | 描述 |
| -------- | -------- | -------- |
| bindchange | event | current 改变时会触发change事件。 |
| bindtransition | event | swiper-item 的位置发生改变时会触发transition事件。 |
| bindanimationfinish | event | 动画结束时会触发animationfinish事件。 |

## 示例

hxml文件：

```html
<view class="container">
  <scroll-view class="myScroll" scroll-y="true" scroll-x="true">
    <view class="page-body">
      <view class="page-section">
        <view style="padding: 0 40rpx" class="page-section-title">动态设置</view>
        <swiper
          indicator-dots="{{indicatorDots}}"
          indicator-color="{{indicatorColor}}"
          indicator-active-color="{{indicatorActiveColor}}"
          current="{{current}}"
          autoplay="{{autoplay}}"
          interval="{{interval}}"
          duration="{{duration}}"
          circular="{{circular}}"
          vertical="{{vertical}}"
          display-multiple-items="{{displayMultipleItems}}"
          previous-margin="{{previousMargin}}"
          next-margin="{{nextMargin}}"
          disable-touch="{{disableTouch}}"
          bindchange="changeCurrentEvent"
          bindtransition="transitionEvent"
          bindanimationfinish="animationFinishEvent"
          animation="{{animation}}">
          <block has:for="{{background}}" has:key="*this">
            <swiper-item>
              <view class="swiper-item">拖动我滑动触发事件</view>
            </swiper-item>
          </block>
        </swiper>
        <view class="page-section-setting">
          <view class="page-section-title">set indicator-dots:是否显示面板指示点。</view>
          <switch checked="{{indicatorDots}}" bindchange="setIndicatorDots"></switch>
          <button type="primary" size="mini" bindtap="setIndicatorDotsABC">setIndicatorDots-"abc"</button>
        </view>
        <view class="page-section-setting">
          <view class="page-section-title">set autoplay:是否自动切换。</view>
          <switch checked="{{autoplay}}" bindchange="setAutoplay"></switch>
          <button type="primary" size="mini" bindtap="setAutoplay01">"abc"</button>
        </view>
        <view class="page-section-setting">
          <view class="page-section-title">set circular:是否采用衔接滑动。</view>
          <switch checked="{{circular}}" bindchange="setCircular"></switch>
          <button type="primary" size="mini" bindtap="setCircularABC">setCircular-"abc"</button>
        </view>
        <view class="page-section-setting">
          <view class="page-section-title">set vertical:滑动方向是否为纵向。</view>
          <switch checked="{{vertical}}" bindchange="setVertical"></switch>
          <button type="primary" size="mini" bindtap="setVerticalABC">setVertical-"abc"</button>
        </view>
        <view class="page-section-setting">
          <view class="page-section-title">set disable-touch:是否禁止用户 touch 操作。</view>
          <switch checked="{{disableTouch}}" bindchange="setDisableTouch"></switch>
        </view>
        <view class="page-section-setting">
          <view class="page-section-title">set current:当前所在滑块的index。</view>
          <view class="weui-cell weui-cell_input">
            <input type="text" value="{{current}}" bindblur="setCurrent"/>
          </view>
        </view>
        <view class="page-section-setting">
          <view class="page-section-title">set interval:自动切换时间间隔。</view>
          <view class="weui-cell weui-cell_input">
            <input class="weui-input" type="text" value="{{interval}}" bindblur="setInterval"/>
          </view>
        </view>
        <view class="page-section-setting">
          <view class="page-section-title">set duration:滑动动画时长。</view>
          <view class="weui-cell weui-cell_input">
            <input type="text" value="{{duration}}" bindblur="setDuration"/>
          </view>
        </view>
        <view class="page-section-setting">
          <view class="page-section-title">set display-multiple-items:同时显示的滑块数量。</view>
          <view class="weui-cell weui-cell_input">
            <input type="text" value="{{displayMultipleItems}}" bindblur="setDisplayMultipleItems"/>
          </view>
        </view>
        <view class="page-section-setting">
          <view class="page-section-title">set indicator-color:指示点颜色。</view>
          <view class="weui-cell weui-cell_input">
            <input type="text" value="{{indicatorColor}}" bindblur="setIndicatorColor"/>
          </view>
        </view>
        <view class="page-section-setting">
          <view class="page-section-title">set indicator-active-color:当前选中的指示点颜色。</view>
          <view class="weui-cell weui-cell_input">
            <input type="text" value="{{indicatorActiveColor}}" bindblur="setIndicatorActiveColor"/>
          </view>
        </view>
        <view class="page-section-setting">
          <view class="page-section-title">set previous-margin:前边距，可用于露出前一项的一小部分。</view>
          <view class="weui-cell weui-cell_input">
            <input type="text" value="{{previousMargin}}" bindblur="setPreviousMargin"/>
          </view>
        </view>
        <view class="page-section-setting">
          <view class="page-section-title">set next-margin:后边距，可用于露出后一项的一小部分。</view>
          <view class="weui-cell weui-cell_input">
            <input type="text" value="{{nextMargin}}" bindblur="setNextMargin"/>
          </view>
        </view>
      </view>
    </view>
  </scroll-view>
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
    'undefined': undefined
  };
  console.info('dataNormalize', baseObject[str]);
  return baseObject[str];
};

Page({
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3', 'demo-text-4', 'demo-text-5', 'demo-text-6'],
    indicatorDots: true,
    autoplay: false,
    circular: false,
    vertical: false,
    disableTouch: false,
    current: 0,
    interval: 5000,
    duration: 500,
    displayMultipleItems: 1,
    indicatorColor: 'rgba(0, 0, 0, .3)',
    indicatorActiveColor: '#0A59F7',
    previousMargin: '0px',
    nextMargin: '0px'
  },
  setIndicatorDots(event) {
    console.info('setIndicatorDots', event.detail.value);
    this.setData({
      indicatorDots: event.detail.value
    });
  },
  setIndicatorDotsABC(e) {
    console.info('setIndicatorDots', 'abc');
    this.setData({
      indicatorDots: 'abc'
    });
  },
  setAutoplay(event) {
    console.info('setAutoplay', event.detail.value);
    this.setData({
      autoplay: event.detail.value
    });
  },
  setAutoplay01() {
    console.info('setAutoplay: abc');
    this.setData({
      autoplay: 'abc'
    });
  },
  setCircular(event) {
    console.info('setCircular', event.detail.value);
    this.setData({
      circular: event.detail.value
    });
  },
  setCircularABC(event) {
    console.info('setCircular', 'abc');
    this.setData({
      circular: 'abc'
    });
  },
  setVertical(event) {
    console.info('setVertical', event.detail.value);
    this.setData({
      vertical: event.detail.value
    });
  },
  setVerticalABC(event) {
    console.info('setVertical', 'abc');
    this.setData({
      vertical: 'abc'
    });
  },
  setDisableTouch(event) {
    console.info('setDisableTouch', event.detail.value);
    this.setData({
      disableTouch: event.detail.value
    });
  },
  setCurrent(event) {
    console.info('setCurrent', event.detail.value);
    this.setData({
      current: dataNormalize(e.detail.value)
    });
  },
  setInterval(e) {
    console.info('setInterval', e.detail.value);
    this.setData({
      interval: dataNormalize(event.detail.value)
    });
  },
  setDuration(event) {
    console.info('setDuration', event.detail.value);
    this.setData({
      duration: dataNormalize(event.detail.value)
    });
  },
  setDisplayMultipleItems(event) {
    console.info('setDisplayMultipleItems', event.detail.value);
    this.setData({
      displayMultipleItems: dataNormalize(event.detail.value)
    });
  },
  setIndicatorColor(event) {
    console.info('setIndicatorColor', event.detail.value);
    this.setData({
      indicatorColor: dataNormalize(event.detail.value)
    });
  },
  setIndicatorActiveColor(event) {
    console.info('setIndicatorActiveColor', event.detail.value);
    this.setData({
      indicatorActiveColor: dataNormalize(event.detail.value)
    });
  },
  setPreviousMargin(event) {
    console.info('setPreviousMargin', event.detail.value);
    this.setData({
      previousMargin: dataNormalize(event.detail.value)
    });
  },
  setNextMargin(event) {
    console.info('setNextMargin', event.detail.value);
    this.setData({
      nextMargin: dataNormalize(event.detail.value)
    });
  },
  changeCurrentEvent(event) {
    // event.detail内容举例为：{"current":0,"currentItemId":"","source":""}
    console.info('swiper组件发生了changeCurrent事件，携带数据为：', event.detail);
  },
  transitionEvent(event) {
    // event.detail内容举例为：{"dx":0,"dy":0}
    console.info('swiper组件发生了transition事件，携带数据为：', event.detail);
  },
  animationFinishEvent(event) {
    // event.detail内容举例为：{"current":0,"currentItemId":"","source":""}
    console.info('swiper组件发生了animationFinish事件，携带数据为：', event.detail);
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

button, switch {
  margin-left: 40rpx;
}

.weui-cell_input {
  background-color: rgba(0, 0, 0, 0.047);
  color: #0A59F7;
  margin: 0 40rpx;
}

.swiper-item {
  background-color: rgba(0, 0, 0, 0.047);
  margin: 0 40rpx;
  display: block;
  height: 100%;
}
```
