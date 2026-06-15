# button

按钮。

**起始版本：** 1.0.0

## 属性

| 名称                             | 类型 | 默认值 | 必填 | 描述   |
|--------------------------------| -------- | -------- | -------- |------|
| size                           | string | default | 否 | 按钮的大小。有效值如下：<br/>default：默认大小<br/>mini：小尺寸|
| type                           | string | default | 否 | 按钮的样式类型。有效值如下：<br/>primary：蓝色<br/>default：白色<br/>warn：红色|
| plain                          | boolean | false | 否 | 是否镂空。|
| disabled                       | boolean | false | 否 | 是否禁用。|
| loading                        | boolean | false | 否 | 文字前是否带 loading 图标。 |
| form-type                      | string | - | 否 | 用于 [form](components-form.md) 组件，点击分别会触发组件的 submit/reset 事件<br/>- submit：表单提交<br/>- reset：重置表单 |
| open-type                      | string | - | 否 | 元服务开放的能力，有效值详见[open-type属性合法值](#open-type属性合法值)。 |
| hover-class                    | string | button-hover | 否 | 指定按钮按下去的样式类。当 hover-class="none" 时，没有点击态效果。 |
| hover-stop-propagation         | boolean | false | 否 | 是否阻止本节点的祖先节点出现点击态。 |
| hover-start-time               | number | 20 | 否 | 按住后多久出现点击态，单位毫秒。 |
| hover-stay-time                | number | 70 | 否 | 手指松开后点击态保留时间，单位毫秒。 |
| app-bundle-name                | string | - | 否 | open-type=launchApp时有效，表示待启动Ability所在的应用Bundle名称。<br/>**起始版本：** 1.0.6 |
| app-module-name                | string | - | 否 | open-type=launchApp时有效，表示待启动Ability所属的模块名称。<br/>**起始版本：** 1.0.6 |
| app-ability-name               | string | - | 否 | open-type=launchApp时有效，表示待启动Ability名称。<br/>**起始版本：** 1.0.6 |
| app-parameters                 | Object | - | 否 | open-type=launchApp时有效，表示启动Ability时的自定义参数。<br/>**起始版本：** 1.0.6 |
| activity-type                  | string | - | 否 | open-type=liveActivity时有效，表示子场景ID，当open-type=liveActivity时，该参数必填。取值参考[服务动态场景模板](https://developer.huawei.com/consumer/cn/doc/atomic-guides/push-as-timeline#section442012142311)。<br/>**起始版本：** 1.0.20 |
| bindgetphonenumber             | eventhandle | - | 否 | 获取用户手机号的回调，open-type="getPhoneNumber"时有效。 |
| bindopensetting                | eventhandle | - | 否 | 打开授权设置页面后的回调，open-type="openSetting"时有效，回调数据与[has.openSetting](../references-apis/apis-setting.md#hasopensetting)返回的一致。|
| bindlaunchapp                  | eventhandle | - | 否 | 打开应用成功时的回调，open-type="launchApp"时有效。<br/>**起始版本：** 1.0.6 |
| bindcreateliveactivity         | eventhandle | - | 否 | 获取服务动态授权码的回调，open-type="liveActivity"时有效，event.detail = { code }。<br/>**起始版本：** 1.0.20 |
| bindgetphonenumberandrisklevel | eventhandle | - | 否 | 获取手机号和风险等级的回调，open-type="getPhoneNumberAndRiskLevel"时有效，event.detail = { code }。<br/>**起始版本：** 1.0.20 |
| binderror                      | eventhandle | - | 否 | 当使用开放能力发生错误时的回调，仅在opent-type为launchApp、liveActivity或getPhoneNumberAndRiskLevel时有效，event.detail = { errCode, errMsg }。<br/>**起始版本：** 1.0.6 |

### open-type属性合法值

| 合法值 | 说明 |
| -------- | -------- |
| getPhoneNumber | 获取用户手机号码，当open-type等于该值时，为保障用户隐私，button组件采用同层渲染ArkUI原生functionalButton组件的方式实现。|
| openSetting    | 打开授权设置页面。|
| launchApp      | 打开应用，可以通过app-bundle-name，app-module-name，app-ability-name，app-parameters属性打开指定应用。当前只支持打开系统应用，或者在元服务跳转三方应用的场景下只能打开同系列开发者的应用，否则会遭到系统生态管控拦截，提示应用无法打开。<br/>**起始版本：** 1.0.6 |
| share          | 触发用户分享，用户点击按钮后触发Page.onShareAppMessage事件，只支持分享首页。<br/>**起始版本：** 1.0.16 <br/>**依赖关系：** HarmonyOS SDK版本≥6.0.0(20) 且ROM版本 ≥ 6.0.0。|
| liveActivity   | 获取服务动态授权码，用于[推送服务动态](../../guides/develop-push-info.md#推送服务动态)。当open-type等于该值时，必须同时指定activity-type属性。<br/>**起始版本：** 1.0.20 <br/>**依赖关系：** HarmonyOS SDK版本≥6.0.0(20) 且ROM版本 ≥ 6.0.0。|
| getPhoneNumberAndRiskLevel | 获取手机号和风险等级。<br/>**起始版本：** 1.0.20 <br/>**依赖关系：** HarmonyOS SDK版本≥6.0.2(22) 且ROM版本 ≥ 6.0.2。|

> **说明：**
> 
> button存在max-width默认样式，值为448px，若button组件宽度需要超过448px，可设置max-width为none或把值设足够大覆盖默认样式。详见[button组件width和实际不一致问题](../../faqs/faqs-button-width-problem.md)

### 错误码信息

错误码是通过binderror回调获取到的错误信息，可通过event.detail.errCode字段获取。

| 错误码 | 说明 |
| -------- | -------- |
| 126   | 当前能力不支持。|
| 20001 | 获取服务动态授权码失败。该错误仅在open-type="liveActivity"的按钮触发时发生。|
| 20002 | 获取手机号和风险等级失败。该错误仅在open-type="getPhoneNumberAndRiskLevel"的按钮触发时发生。|

## 示例

hxml文件：

```html
<view class="container">
  <scroll-view class="myScoll" scroll-y="true" scroll-x="true">
    <button type="{{setType}}" size="{{setSize}}" loading="{{loading}}" plain="{{plain}}" disabled="{{disabled}}" bindtap="showToast" hover-class="{{hover}}"> 按钮样式 </button>
    <view class="ascf-cell ascf-cell_switch">
      <view class="ascf-cell__bd">镂空</view>
      <view class="ascf-cell__ft">
        <switch checked="{{plain}}" bindchange="changePlain"/>
      </view>
    </view>
    <view class="ascf-cell ascf-cell_switch">
      <view class="ascf-cell__bd">禁用</view>
      <view class="ascf-cell__ft">
        <switch checked="{{disabled}}" bindchange="changeDisabled"/>
      </view>
    </view>
    <view class="ascf-cell ascf-cell_switch">
      <view class="ascf-cell__bd">loading图标</view>
      <view class="ascf-cell__ft">
        <switch checked="{{loading}}" bindchange="changeLoading"/>
      </view>
    </view>
    <view style="margin-left: 30rpx;">按钮大小设置</view>
    <view style="flex-direction:row;">
      <button size="mini" type="primary" style="margin-left: 30rpx;" bindtap="setMini">mini</button>
      <button size="mini" type="primary" style="margin-left: 30rpx;" bindtap="setDefault">default</button>
    </view>
    <view style="margin-left: 30rpx;">按钮样式设置</view>
    <view style="flex-direction:row;">
      <button size="mini" type="primary" style="margin-left: 30rpx;" bindtap="setDefault1">default</button>
      <button size="mini" type="primary" style="margin-left: 30rpx;" bindtap="setPrimary">primary</button>
      <button size="mini" type="primary" style="margin-left: 30rpx;" bindtap="setWarn">warn</button>
    </view>
    <view style="margin-left: 30rpx;">点击态验证</view>
    <view style="flex-direction:row;">
      <button size="mini" style="margin-left: 30rpx;" bindtap="setNone" hover-class="none">none</button>
      <button size="mini" style="margin-left: 30rpx;" bindtap="setHover" hover-class="button-hover">button-hover</button>
      <button size="mini" style="margin-left: 30rpx;" bindtap="setOther" hover-class="other-button-hover">自定义</button>
    </view>
    <view class="viewclass" hover-class="wsui-btn__hover_list">
      <button bindtap="showToast" hover-class="click_hover" hover-stop-propagation="{{isstop}}" hover-start-time="{{starttime}}" hover-stay-time="{{staytime}}"> 点击态 </button>
    </view>
    <view class="ascf-cell ascf-cell_switch">
      <view class="ascf-cell__bd">是否阻止本节点的祖先节点出现点击态</view>
      <view class="ascf-cell__ft">
        <switch checked="{{isstop}}" bindchange="changeisstop"/>
      </view>
    </view>
    <view class="page-section-title">
      <text>hover-start-time(ms)</text>
      <text class="info">{{starttime}}</text>
    </view>
    <slider bindchange="starttimeChange" value="{{starttime}}" min="0" max="1000"/>
    <view class="page-section-title">
      <text>hover-stay-time(ms)</text>
      <text class="info">{{staytime}}</text>
    </view>
    <slider bindchange="staytimeChange" value="{{staytime}}" min="0" max="1000"/>
    <button type="primary" open-type="launchApp" bindlaunchapp="handleLaunchAppSuccess" binderror="handleLaunchAppError" app-bundle-name="com.huawei.hmos.calendar" app-ability-name="MainAbility">打开日历</button>
    <view class="page-body">
      <view class="btn-area" id="buttonContainer">
        <button type="primary">页面主操作 Normal</button>
        <button type="primary" loading="true">页面主操作 Loading</button>
        <button type="primary" disabled="true">页面主操作 Disabled</button>
        <button type="default">页面次要操作 Normal</button>
        <button type="default" disabled="true">页面次要操作 Disabled</button>
        <button type="warn">警告类操作 Normal</button>
        <button type="warn" disabled="true">警告类操作 Disabled</button>
        <view class="button-sp-area">
          <button type="primary" plain="true">按钮</button>
          <button type="primary" disabled="true" plain="true">不可点击的按钮</button>
          <button type="default" plain="true">按钮</button>
          <button type="default" disabled="true" plain="true">按钮</button>
          <button class="mini-btn" type="primary" size="mini">按钮</button>
          <button class="mini-btn" type="default" size="mini">按钮</button>
          <button class="mini-btn" type="warn" size="mini">按钮</button>
        </view>
      </view>
    </view>
  </scroll-view>
</view>
```

js文件：

```js
const types = ['default', 'primary', 'warn'];
const pageObject = {
  data: {
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    setSize: 'default',
    setType: 'default',
    hover: 'button-hover',
    isstop: true,
    starttime: 20,
    staytime: 70
  },
  showToast() {
    has.showToast({
      title: '点击按钮',
    })
  },
  setPlain() {
    this.setData({
      plain: !this.data.plain
    })
  },
  setLoading() {
    this.setData({
      loading: !this.data.loading
    })
  },
  setMini() {
    this.setData({
      setSize: 'mini'
    })
  },
  setDefault() {
    this.setData({
      setSize: 'default'
    })
  },
  setDefault1() {
    this.setData({
      setType: 'default',
    })
  },
  setPrimary() {
    this.setData({
      setType: 'primary',
    })
  },
  setWarn() {
    this.setData({
      setType: 'warn',
    })
  },
  changePlain() {
    this.setData({
      plain: !this.data.plain
    })
  },
  changeDisabled() {
    this.setData({
      disabled: !this.data.disabled
    })
  },
  changeLoading() {
    this.setData({
      loading: !this.data.loading
    })
  },
  setNone() {
    this.setData({
      hover: 'none'
    })
    has.showToast({
      title: 'none',
    })
  },
  setHover() {
    this.setData({
      hover: 'button-hover'
    })
    has.showToast({
      title: 'button-hover',
    })
  },
  setOther() {
    this.setData({
      hover: 'other-button-hover'
    })
    has.showToast({
      title: '点击按钮变蓝',
    })
  },
  changeisstop() {
    this.setData({
      isstop: !this.data.isstop
    })
  },
  starttimeChange(e) {
    this.setData({
      starttime: e.detail.value
    })
  },
  staytimeChange(e) {
    this.setData({
      staytime: e.detail.value
    })
  },
  handleLaunchAppSuccess: function (t) {
    console.info('handleLaunchAppSuccess');
  },
  handleLaunchAppError: function (t) {
    console.info('handleLaunchAppError');
  }
};
for (let i = 0; i < types.length; ++i) {
  (function(type){
    pageObject[type] = function () {
      const key = type + 'Size'
      const changedData = {}
      changedData[key] =
        this.data[key] === 'default' ? 'mini' : 'default'
      this.setData(changedData)
    }
  }(types[i]))
};
Page(pageObject);
```

css文件:

```css
button{
  margin-top: 30rpx;
  margin-bottom: 30rpx;
}
.button-sp-area{
  margin: 0 auto;
  width: 60%;
}
.mini-btn{
  margin-right: 10rpx;
}
/** 添加自定义button点击态样式类**/
.other-button-hover {
  opacity: 0.9;
  background: blue;
}
.page-section-title{
  margin-top: 60rpx;
  position: relative;
}
.info{
  position: absolute;
  right: 0;
  color: #353535;
  font-size: 30rpx;
}
.viewclass{
  margin: 10px;
  width: 300px;
  height:60px;
  background-color: gray;
}
.wsui-btn__hover_list {
    opacity: 0.8;
    background: #faf602;
}
.click_hover{
  opacity: 0.9;
  background: pink;
}
.myScoll {
  width: 100%;
  background-color: #F0F4F3;
  height: 1300rpx;
  white-space: nowrap;
}
```
