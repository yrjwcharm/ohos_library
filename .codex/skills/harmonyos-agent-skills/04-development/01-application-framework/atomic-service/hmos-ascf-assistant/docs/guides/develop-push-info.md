# 向用户推送信息


开发者可以通过推送服务，向用户推送信息。


## 开发准备

使用消息服务之前需要先开启推送服务，请参考[元服务推送-开发准备](https://developer.huawei.com/consumer/cn/doc/atomic-guides/push-as-prepare)。


## 推送服务通知


### 发起基于账号的订阅请求

1. 开始开发前，请先确保已完成[元服务推送-开发准备](https://developer.huawei.com/consumer/cn/doc/atomic-guides/push-as-prepare)中的配置，同时[开通服务通知并选用订阅模板](https://developer.huawei.com/consumer/cn/doc/atomic-guides/push-as-service-noti)。

2. 元服务调用 has.requestSubscribeMessage 方法发起消息订阅。
  
   ```js
   has.requestSubscribeMessage({
     tmplIds: ['xxx'],
     success: (res) => {
       console.info('requestSubscribeMessage success', res);
     },
     fail: (err) => {
       console.error('requestSubscribeMessage fail', err);
     },
     complete: (res) => {
       console.info('requestSubscribeMessage complete', res);
     }
   });
   ```


### 推送基于账号的订阅消息

当用户同意订阅，元服务可基于账号推送消息，请参考：[推送基于账号的订阅消息](https://developer.huawei.com/consumer/cn/doc/atomic-guides/push-as-send-sub-noti)。

## 推送服务动态

服务动态消息是提供给开发者的B2C（Business-to-Customer）消息能力，通过服务动态消息开发者可以向用户推送关键节点的动态消息，及时提醒用户订单进度。

开发者可通过以下任一方式获取用于推送服务动态的唯一标识`code`：
- 当用户在元服务内调用华为支付收银台进行支付后，开发者可将支付订单号作为`code`向用户下发服务通知。
- 从基础库1.0.20起，支持[通过前端button获取code](#通过前端button获取code)。

具体开发步骤与ArkTS元服务中[推送基于账号的服务动态消息](https://developer.huawei.com/consumer/cn/doc/atomic-guides/push-as-timeline)基本一致。

### 通过前端button获取code

从基础库1.0.20起开始支持，使用前需先参考[申请权益](https://developer.huawei.com/consumer/cn/doc/atomic-guides/push-as-timeline#section592010820304)申请元服务服务动态消息权益。

开发者需要在前端将触发服务的`button`组件的`open-type`的值设置为`liveActivity`，并设置`activity-type`的值为对应的子场景ID（具体取值请参考[服务动态场景模板](https://developer.huawei.com/consumer/cn/doc/atomic-guides/push-as-timeline#section442012142311)）。当用户点击按钮后，若成功获取服务动态授权码，将通过`bindcreateliveactivity`回调返回`code`；若失败，错误信息将通过`binderror`回调返回。

该`code`在本次服务进程中唯一，后续开发者更新用户的服务状态均通过此`code`进行。

> **注意**
> 
> 平台会对相关button组件进行规范性使用的检测，包括是否存在诱导用户点击、通过与卡片无关的按钮获取code等行为，请合理使用组件。

**示例代码**

```html
<!--hxml文件-->
<button open-type="liveActivity" activity-type="100050001" bindcreateliveactivity="onLiveActivityCreate">获取服务动态授权码</button>
```

```js
// js文件
Page({
  onLiveActivityCreate(evt) {
    console.info(`Obtained service authorization code successfully: code=${evt.detail.code}`);
  }
});
```
