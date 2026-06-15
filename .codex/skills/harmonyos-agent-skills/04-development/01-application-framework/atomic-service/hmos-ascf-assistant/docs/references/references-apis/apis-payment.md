# 支付

## has.requestPayment

has.requestPayment(Object object)

拉起华为支付或跳转三方支付。

**需要权限：** 开发前需要配置[支付业务规则](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/payment-common-pay-introduction#section3657513103713)，接入流程详见[接入支付服务](../../guides/develop-payment-access.md)。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| orderStr | string | 是 | 拉起华为支付收银台或者跳转三方支付传入的订单信息，[orderStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-model#section159202591414)是json字符串的格式。 |
| payload | string | 否 | 预留信息，在请求接口时，入参如果传递，接口响应中则会原样返回。<br/>**说明：**<br/>- 入参如果传递非空字符串代表跳转三方支付，拉起H5支付场景下需要固定传递“AP”。<br/>- 入参如果不传递代表拉起华为支付。<br/>- 入参如果传递空字符串，代表拉起混合支付收银台。<br/>**起始版本：** 1.0.9 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值**：

拉起华为支付success的返回值为空，跳转三方支付success的返回值包括以下字段。

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| selectedPaymentType | string | 用户选择的支付方式。<br/>- wechat_pay：微信支付<br/>- ali_pay：支付宝支付<br/>- 其他（其他为商户申请配置三方支付方式时所申请的三方支付相关配置） |
| clientToken | string | 客户端凭证。 |
| nextStep | string | 下一步支付流程。 |
| extraInfo | string | 保留字段，json string格式。 |
| payload | string | 预留信息，在请求接口时，入参如果传递，接口响应中则会原样返回。<br/>**说明：** 拉起H5支付场景下需要固定传递“AP”。 |

**示例（拉起华为支付）：**

```js
has.requestPayment({
  orderStr: '{"app_id":"***","merc_no":"***","prepay_id":"xxx","timestamp":"1680259863114","noncestr":"1487b8a60ed9f9ecc0ba759fbec23f4f","sign":"****","auth_id":"***"}',
  success: (res) => {
    console.info('requestPayment success', res);
  },
  fail: (err) => {
    console.error('requestPayment fail', err);
  },
  complete: (res) => {
    console.info('requestPayment complete', res);
  }
});
```

**示例（拉起混合支付）：**

```js
has.requestPayment({
  orderStr: '{"app_id":"***","merc_no":"***","prepay_id":"xxx","timestamp":"1680259863114","noncestr":"1487b8a60ed9f9ecc0ba759fbec23f4f","sign":"****","auth_id":"***"}',
  payload: '',
  success: (res) => {
    console.info('requestPayment success', res);
  },
  fail: (err) => {
    console.error('requestPayment fail', err);
  },
  complete: (res) => {
    console.info('requestPayment complete', res);
  }
});
```

**示例（跳转三方支付）：**

```js
has.requestPayment({
  orderStr: '{"nextAction":"L","linkUrl":"https://www.***.pay.com/h5pay?prepay_id=***&sign=***","scheme":"","clientToken":"***"}',
  payload: 'AP',
  success: (res) => {
    console.info('requestPayment success', res);
  },
  fail: (err) => {
    console.error('requestPayment fail', err);
  },
  complete: (res) => {
    console.info('requestPayment complete', res);
  }
});
```

## has.cashierPicker

has.cashierPicker(Object object)

拉起通用收银台。

**需要权限：** 开发前需要配置[支付业务规则](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/payment-common-pay-introduction#section3657513103713)，接入流程详见[接入支付服务](../../guides/develop-payment-access.md)。

**起始版本：** 1.0.9

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| tradeSummary | string | 否 | 订单的摘要信息。 |
| amount | number | 否 | 订单总金额（单位：分）。 |
| currency | string | 否 | 货币单位。<br/>**说明：**<br/>- 不传递则收银台不显示货币单位。<br/>- 传递后收银台可以转换成货币符号则显示货币符号（比如￥），转换不了则显示所传递的值。 |
| extraInfo | string | 否 | 保留字段。json string格式。若未填写，默认为空。<br/>**说明：**<br/>商户可以通过保留字段指定支付方式。指定收银台支付方式列表传递内容示例如下：<br/>{"selectPayType":"wechat_pay\|xxx"}|
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值**：

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| selectedPaymentType | string | 用户选择的支付方式。<br/>- wechat_pay：微信支付<br/>- ali_pay：支付宝支付<br/>- 其他（其他为商户申请配置三方支付方式时所申请的三方支付相关配置） |
| clientToken | string | 客户端凭证。 |

**示例：**

```js
has.cashierPicker({
  tradeSummary: '',
  amount: 100,
  currency: 'CNY',
  extraInfo: '',
  success: (res) => {
    console.info('cashierPicker success', res);
  },
  fail: (err) => {
    console.error('cashierPicker fail', err);
  },
  complete: (res) => {
    console.info('cashierPicker complete', res);
  }
});
```

## has.requestContract

has.requestContract(Object object)

调起华为支付签约服务。

**需要权限：** 开发前需要配置[支付业务规则](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/payment-common-pay-introduction#section3657513103713)，接入流程详见[支付并签约场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/payment-pay-and-sign)。

**起始版本：** 1.0.10

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| contractStr | string | 是 | 拉起签约收银台入参，[contractStr](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-model#section01944104716)是json字符串的格式。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.requestContract({
  contractStr: 'xxx',
  success: () => {
    console.info('requestContract success');
  },
  fail: (err) => {
    console.error('requestContract fail', err);
  },
  complete: (res) => {
    console.info('requestContract complete', res);
  }
});
```

## has.createThirdPayClient

has.createThirdPayClient(string payMethod, string thirdAppId)：[ThirdPayClient](#thirdpayclient)

构建支付请求客户端。

**需要权限：** 开发前需要配置[支付业务规则](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/payment-common-pay-introduction#section3657513103713)，接入流程详见[支付并签约场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/payment-pay-and-sign)。业务流程详见[混合支付场景基于接口方式拉起](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/payment-common-pay-mix)。

**起始版本：** 1.0.17

**参数：**

| 参数 | 类型 | 必填 | 描述                                                                                             |
| -------- | -------- | -------- |------------------------------------------------------------------------------------------------|
| payMethod | string | 是 | 支付方式（当前仅支持下述三种）。<br/>- wechat_pay：微信支付。<br/>- ali_pay：支付宝支付。<br/>- wechat_mini_program: 微信小程序。 |
| thirdAppId | string | 是 | 三方支付应用appID。<br/> 起始版本： 1.0.20                                                                 |

**返回值：**

返回[ThirdPayClient](#thirdpayclient)对象。

**示例：**

```js
// 示例代码传入字符串类型不会影响当前接口，但是开发中pay方法只支持上述三种方式
const thirdPayClient = has.createThirdPayClient('payMethod', 'third_appid_123456');
```

## ThirdPayClient

支付请求客户端。

**起始版本：** 1.0.17

### ThirdPayClient.pay

ThirdPayClient.pay()

拉起三方支付收银台的支付接口。

该方法提供拉起三方支付方式收银台等功能，调用方法前请确保网络已连接。调用该方法后会拉起三方支付收银台，完成后使用Promise异步返回。商户客户端根据接口[has.requestPayment](#hasrequestpayment)或者[has.cashierPicker](#hascashierpicker)返回结果，按照三方支付平台接入要求构建三方支付信息[payInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-model#section1240916334438)调用[ThirdPayClient.pay](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-third-payment-service#section5214134018367)接口拉起三方支付收银台。

**需要权限：** 开发前需要配置[支付业务规则](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/payment-common-pay-introduction#section3657513103713)，接入流程详见[支付并签约场景](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/payment-pay-and-sign)，业务流程详见[混合支付场景基于接口方式拉起](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/payment-common-pay-mix)。

**起始版本：** 1.0.17

**依赖关系：** HarmonyOS SDK版本≥6.0.0(20) 且ROM版本 ≥ 6.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| payInfo | string | 是 | 拉起收银台传入的订单信息，payInfo是json字符串的格式（具体参数根据三方支付方式拉起收银台要求传递，参考[payInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-model#section1240916334438)）。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
const thirdPayClient = has.createThirdPayClient('payMethod', 'third_appid_123456');
// 不同支付方式参数构建参考示例如下：
// wechat_pay：'{"appId":"***","partnerId":"***","prepayId":"***","packageValue":"***","nonceStr":"***","timeStamp":"***","sign":"***","extData":"***","token":"***"}'
// ali_pay：'{"orderInfo":"***", "token":"***"}'
// wechat_mini_program：'{"userName":"原始id", "path":"小程序启动路径", "miniProgramType":"小程序的类型，0-正式版 1-开发版 2-体验版 默认0", "extData":"***", "token":"***"}'
thirdPayClient.pay({
  payInfo: 'xxx',
  success: () => {
    console.info('thirdPayClient.pay success');
  },
  fail: (err) => {
    console.error('thirdPayClient.pay fail', err);
  },
  complete: (res) => {
    console.info('thirdPayClient.pay complete', res);
  }
});
```
