# navigator

页面链接，通过组件的方式进行页面跳转。

**起始版本：** 1.0.0

## 属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| target | string | self | 否 | 在哪个目标上发生跳转，默认当前元服务。<br/>- self：当前元服务 |
| url | string | - | 否 | 当前元服务内的跳转链接。 |
| open-type | string | navigate | 否 | 跳转方式，详细内容参见下方“open-type合法值说明”。 |
| delta | number | 1 | 否 | 当 open-type 为 'navigateBack' 时有效，表示回退的层数。 |
| hover-class | string | navigator-hover | 否 | 指定点击时的样式类。 |
| hover-stop-propagation | boolean | false | 否 | 指定是否阻止本节点的祖先节点出现点击态。 |
| hover-start-time | number | 50 | 否 | 按住后多久出现点击态，单位毫秒。 |
| hover-stay-time | number | 600 | 否 | 手指松开后点击态保留时间，单位毫秒。 |

**open-type合法值说明：**

| 值 | 描述                                                                      |
| -------- |-------------------------------------------------------------------------|
| navigate | 和[has.navigateTo](../references-apis/apis-router.md#hasnavigateto)接口实现效果相同。 |
| redirect | 和[has.redirectTo](../references-apis/apis-router.md#hasredirectto)接口实现效果相同。                                                |
| switchTab | 和[has.switchTab](../references-apis/apis-router.md#hasswitchtab)接口实现效果相同。                                                 |
| reLaunch | 和[has.reLaunch](../references-apis/apis-router.md#hasrelaunch)接口实现效果相同。                                                  |
| navigateBack | 和[has.navigateBack](../references-apis/apis-router.md#hasnavigateback)接口实现效果相同。                                              |

## 示例

hxml文件：

```html
<view class="container">
  <view class="index-bd">
    <view class="kind-list">
      <block has:for-items="{{list}}" has:key="{{item.id}}">
        <view class="kind-list-item">
          <view id="{{item.id}}" class="kind-list-item-hd {{item.open ? 'kind-list-item-hd-show' : ''}}"
                bindtap="kindToggle">
            <view class="kind-list-text">{{item.name}}</view>
          </view>
          <view class="kind-list-item-bd {{item.open ? 'kind-list-item-bd-show' : ''}}">
            <view class="navigator-box {{item.open ? 'navigator-box-show' : ''}}">
              <block has:if="{{item.case === 0}}">
                <navigator url="./arr" hover-class="navigator-hover" class="navigator">
                  <view class="navigator-text">默认hover状态</view>
                  <view class="navigator-arrow"></view>
                </navigator>
                <navigator
                  url="./"
                  hover-class="none"
                  open-type="navigate"
                  class="navigator">
                  <view class="navigator-text">hover-class="none"的navigator</view>
                  <view class="navigator-arrow"></view>
                </navigator>
                <navigator
                  url="./"
                  open-type="navigate"
                  hover-start-time="{{starttime}}"
                  hover-stay-time="{{stayTime}}"
                  hover-class="other-navigator-hover"
                  class="navigator">
                  <view class="navigator-text">自定义hover和停留时间</view>
                  <view class="navigator-arrow"></view>
                </navigator>
                <view class="viewclass" hover-class="ascf-btn__hover_list">
                  <navigator
                    url="./"
                    hover-class="other-navigator-hover"
                    hover-stop-propagation="{{isStop}}"
                    hover-start-time="{{starttime}}"
                    hover-stay-time="{{stayTime}}"
                    class="navigator">
                    <view class="navigator-text">阻止父级出现点击态</view>
                    <view class="navigator-arrow"></view>
                  </navigator>
                </view>
              </block>
              <view class="ascf-cell ascf-cell_switch">
                <view class="ascf-cell__bd">是否阻止本节点的祖先节点出现点击态</view>
                <view class="ascf-cell__ft">
                  <switch checked="{{isStop}}" bindchange="changeIsStop"/>
                </view>
              </view>
              <block has:if="{{item.case === 1}}">
                <navigator url="navigate/navigate" hover-class="navigator-hover" class="navigator">
                  <view class="navigator-text">相对路径</view>
                  <view class="navigator-arrow"></view>
                </navigator>
                <navigator
                  url="/page/component/pages/view/view"
                  hover-class="none"
                  open-type="navigate"
                  class="navigator">
                  <view class="navigator-text">绝对路径</view>
                  <view class="navigator-arrow"></view>
                </navigator>
                <navigator url="navigate/navigate?title=navigate&value=我是参数" open-type="navigate" class="navigator">
                  <view class="navigator-text">携带参数</view>
                  <view class="navigator-arrow"></view>
                </navigator>
              </block>
              <block has:if="{{item.case === 2}}">
                <navigator url="redirect/redirect" open-type="redirect" class="navigator">
                  <view class="navigator-text">相对路径</view>
                  <view class="navigator-arrow"></view>
                </navigator>
                <navigator url="/page/component/pages/view/view" open-type="redirect" class="navigator">
                  <view class="navigator-text">绝对路径</view>
                  <view class="navigator-arrow"></view>
                </navigator>
                <navigator url="redirect/redirect?title=redirect&value=我是参数" open-type="redirect" class="navigator">
                  <view class="navigator-text">携带参数</view>
                  <view class="navigator-arrow"></view>
                </navigator>
              </block>
              <block has:if="{{item.case === 3}}">
                <navigator url="/page/component/index" open-type="switchTab" class="navigator">
                  <view class="navigator-text">当前Tab</view>
                  <view class="navigator-arrow"></view>
                </navigator>
                <navigator url="/page/API/index" open-type="switchTab" class="navigator">
                  <view class="navigator-text">其他Tab</view>
                  <view class="navigator-arrow"></view>
                </navigator>
              </block>
              <block has:if="{{item.case === 4}}">
                <navigator url="reLaunch/reLaunch" open-type="reLaunch" class="navigator">
                  <view class="navigator-text">相对路径</view>
                  <view class="navigator-arrow"></view>
                </navigator>
                <navigator url="/page/component/pages/view/view" open-type="reLaunch" class="navigator">
                  <view class="navigator-text">绝对路径</view>
                  <view class="navigator-arrow"></view>
                </navigator>
                <navigator url="reLaunch/reLaunch?title=redirect&value=我是参数" open-type="reLaunch" class="navigator">
                  <view class="navigator-text">携带参数</view>
                  <view class="navigator-arrow"></view>
                </navigator>
              </block>
              <block has:if="{{item.case === 5}}">
                <navigator url="navigateBack1/navigateBack1?title=navigateBack1" class="navigator">
                  <view class="navigator-text">返回验证</view>
                  <view class="navigator-arrow"></view>
                </navigator>
              </block>
              <block has:if="{{item.case === 6}}">
                <navigator url="hoverclass/hoverclass" class="navigator">
                  <view class="navigator-text">点击态验证</view>
                  <view class="navigator-arrow"></view>
                </navigator>
              </block>
            </view>
          </view>
        </view>
      </block>
    </view>
  </view>
</view>
```

js文件：

```js
Page({
  onShareAppMessage() {
    return {
      title: '导航',
      path: 'page/component/pages/navigator/navigator'
    };
  },
  data: {
    list: [
      {
        id: 'navigate11',
        name: '测试hover参数和hover-stop-propagation',
        open: false,
        case: 0
      },
      {
        id: 'navigate',
        name: '跳转方式navigate-保留当前页面',
        open: false,
        case: 1
      },
      {
        id: 'redirect',
        name: '跳转方式redirect-关闭当前页面',
        open: false,
        case: 2
      },
      {
        id: 'switchTab',
        name: '跳转方式switchTab',
        open: false,
        case: 3
      },
      {
        id: 'reLaunch',
        name: '跳转方式reLaunch-关闭所有页面',
        open: false,
        case: 4
      },
      {
        id: 'navigateBack',
        name: '跳转方式navigateBack-返回',
        open: false,
        case: 5
      },
      {
        id: 'hover-class',
        name: '点击态',
        open: false,
        case: 6
      }
    ],
    isStop: true,
    starttime: 1000.6,
    stayTime: 2000.5
  },
  kindToggle(e) {
    const id = e.currentTarget.id;
    const list = this.data.list;
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open;
      } else {
        list[i].open = false;
      }
    }
    this.setData({
      list
    });
  },
  changeIsStop() {
    this.setData({
      isStop: !this.data.isStop
    });
  }
});
```

css文件：

```css
.ascf-agree__link {
  display: inline;
  color: #586c94;
}

.other-navigator-hover {
  opacity: 0.9;
  background: blue;
  color: red;
}

.viewclass {
  margin: 20px 0;
  width: 300px;
  height: 80px;
  background-color: gray;
}

.ascf-btn__hover_list {
  opacity: 0.8;
  background: #faf602;
}
```
