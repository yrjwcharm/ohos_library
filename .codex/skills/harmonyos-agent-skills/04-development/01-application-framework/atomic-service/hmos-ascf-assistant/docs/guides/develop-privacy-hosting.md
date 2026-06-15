# 隐私托管


为了统一用户体验并使上架审核过程更加高效和省心，元服务须接入平台的隐私托管服务，由平台统一向用户展示隐私协议弹窗。


> **注意**
> 
> - 元服务不允许开发者使用自行设计的隐私弹窗。
> - 元服务不允许同时弹出多个隐私弹框影响用户体验。


接入隐私托管后，开发者仅需要配置隐私协议内容，用户协议。接入方法请参考：[托管隐私声明](https://developer.huawei.com/consumer/cn/doc/app/agc-help-privacy-policy-atomic-0000002317135133)。


一般要求隐私协议被同意后才能进行权限申请和业务逻辑处理。可以参考如下方法监听隐私同意事件：


```js
Page({
  data: {
    isAgree: false,
  },
  onLoad: (options) => {
    // 监听隐私同意
    has.onPrivacyStateChanged(function(res) {
      this.handleAgree(res.resultType === 1);
    });
    // 查询已同意的设置
    has.getPrivacySetting({
      complete: (res) => {
        this.handleAgree(!res.needAuthorization);
      }
    });
  },
  handleAgree(isAgree) {
    this.setData({
      isAgree,
    });
    if (isAgree) {
      // 同意后处理业务逻辑
    }
  }
});
```
