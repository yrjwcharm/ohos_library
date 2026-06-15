# 获取华为账号用户信息


华为账号登录是基于[OAuth 2.0协议标准](https://oauth.net/2/)和[OpenID Connect协议](https://openid.net/connect/)标准构建的OAuth2.0授权登录系统，元服务可以方便地获取华为账号用户的身份标识，快速建立用户体系。


用户打开元服务时，不需要用户点击登录/注册按钮，即可获取用户的身份标识UnionID/OpenID，完成静默登录。


如果您需要将用户与已注册账号关联，为用户同步历史数据资产，可以向用户申请[获取手机号](#获取手机号)。


## 获取openID

开发准备

1. [配置签名和指纹](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-sign-fingerprints)

2. [配置Client ID](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-client-id)

has.login后可以获取到openID。也可以通过将has.login接口返回的code传入服务器端接口[获取用户级凭证](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-obtain-user-token)，再通过[解析凭证](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-get-token-info)获取openID。has.login返回的code即是获取用户级凭证接口中需要的授权码（Authorization Code）。

```js
has.login({
  success: (res) => {
    console.info('login success', res);
  },
  fail: (err) => {
    console.error('login fail', err);
  },
  complete: (res) => {
    console.info('login complete', res);
  } 
});
```


## 获取手机号


### 开发准备

1. [配置签名和指纹](https://developer.huawei.com/consumer/cn/doc/atomic-guides/account-atomi-sign-fingerprints)

2. [配置Client ID](https://developer.huawei.com/consumer/cn/doc/atomic-guides/account-atomic-client-id)

3. [配置scope权限](https://developer.huawei.com/consumer/cn/doc/atomic-guides/account-guide-atomic-permissions)

当元服务需要获取用户手机号时，可通过调用Button组件 open-type="getPhoneNumber" 引导用户完成手机号授权。

元服务满足《[常见类型移动互联网应用程序必要个人信息范围规定](http://www.cac.gov.cn/2021-03/22/c_1617990997054277.htm)》（对第三方网站的内容，华为不承担任何责任）中使用手机号的必要业务场景。

使用方法：

1. 需要将[button](../references/references-components/components-button.md)组件open-type的值设置为getPhoneNumber，当用户点击并同意之后，通过 bindgetphonenumber事件获取回调信息。

2. 将bindgetphonenumber事件回调中的动态令牌code传到开发者后台，并在开发者后台调用服务器端接口消费该code来[获取用户级凭证](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-obtain-user-token)，再通过[获取用户信息](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-api-get-user-info-get-phone)接口，来获取用户手机号。每个code有效期为5分钟，且只能消费一次。bindgetphonenumber中的动态令牌code即是获取用户级凭证接口中需要的授权码（Authorization Code）。

> **说明**
> 
> getPhoneNumber 返回的 code 与 has.login 返回的 code 作用不同，不能混用。

**示例代码**

```html
<!--hxml文件-->
<button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber">"get phonenumber"</button>
```

```js
// js文件
Page({
  getPhoneNumber(e) {
    // 动态令牌
    console.info(e.detail.code);
    // 回调信息（成功失败都会返回）
    console.info(e.detail.errMsg);
    // 错误码（失败时返回）
    console.error(e.detail.errno);
  }
});
```


## 获取发票抬头

当元服务需要获取用户发票抬头时，可使用[has.chooseInvoiceTitle](../references/references-apis/apis-invoice.md#haschooseinvoicetitle)，帮助用户打开发票抬头选择页面进行选择或管理发票抬头。


## 获取收货地址

当元服务需要获取用户收货地址时，可使用[has.chooseAddress](../references/references-apis/apis-shipping-address.md#haschooseaddress)，引导用户添加或选择已有的收货地址，并最终获取用户的收货地址。

```js
has.chooseAddress({
  success: (res) => {
    console.info('chooseAddress success,res', res);
  },
  fail: (err) => {
    console.error('chooseAddress fail', err);
  },
  complete: (res) => {
    console.info('chooseAddress complete', res);
  }
});
```
