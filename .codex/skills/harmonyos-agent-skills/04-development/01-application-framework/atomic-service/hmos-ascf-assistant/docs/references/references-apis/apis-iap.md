# IAP

## has.queryIapEnvStatus

has.queryIapEnvStatus(Object object)

查询用户登录的账号服务地是否在IAP Kit支持结算的国家/地区中。当前只支持中国大陆。

**需要权限：** 开发前需要配置[Client ID](https://developer.huawei.com/consumer/cn/doc/atomic-guides/account-atomic-client-id)、[配置签名证书指纹](https://developer.huawei.com/consumer/cn/doc/app/agc-help-signature-info-0000001628566748#section5181019153511)、[开通商户服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/iap-enable-merchant-service)、[开启和激活应用内购买服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/iap-enable-in-app-purchases)。

**起始版本：** 1.0.5

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**fail返回值：**

| 错误码 | 错误信息 |
| -------- | -------- |
| 401 | Parameter error. |
| 1001860000 | The operation was canceled by the user. |
| 1001860001 | System internal error. |
| 1001860004 | Too frequent API calls. |
| 1001860005 | Network connection error. |
| 1001860050 | The HUAWEI ID is not signed in. |
| 1001860054 | The country or region of the signed-in HUAWEI ID does not support IAP. |

**示例：**

```js
has.queryIapEnvStatus({
  success: () => {
    console.info('queryIapEnvStatus success');
  },
  fail: (err) => {
    console.error('queryIapEnvStatus fail', err);
  },
  complete: (res) => {
    console.info('queryIapEnvStatus complete', res);
  }
});
```

## has.createIap

has.createIap(Object object)

发起购买，支持消耗型商品、非消耗型商品和自动续期订阅商品。在[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)创建商品后，使用此接口拉起华为应用内支付收银台，显示商品名称、价格等信息。

**需要权限：** 开发前需要配置[Client ID](https://developer.huawei.com/consumer/cn/doc/atomic-guides/account-atomic-client-id)、[配置签名证书指纹](https://developer.huawei.com/consumer/cn/doc/app/agc-help-signature-info-0000001628566748#section5181019153511)、[开通商户服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/iap-enable-merchant-service)、[开启和激活应用内购买服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/iap-enable-in-app-purchases)。

**起始版本：** 1.0.5

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| productId | string | 是 | 待支付的商品ID。商品ID来源于开发者在[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)中配置商品信息时设置的“商品ID”，具体请参见[配置商品信息](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/iap-config-product)。 |
| productType | number | 是 | 需要查询的商品类型。<br/> 0：消耗型商品<br/> 1：非消耗型商品<br/> 2：自动续期订阅商品<br/> 3：非续期订阅商品（**起始版本：** 1.0.10） |
| developerPayload | string | 否 | 商户侧保留信息。<br/>若该字段有值，在支付成功后的回调结果中会原样返回给应用。<br/>**说明：** 该参数长度限制为[0, 256]。 |
| reservedInfo | string | 否 | 要求JSON String格式，商户可以将额外需要传入的字段以key-value的形式设置在JSON String中，并通过该参数传入。<br/>例如：let reservedInfo = "{\\"key1\\":\\"value1\\",\\"key2\\":\\"value2\\"}";<br/>**说明：** 该字段为预留字段，可选传入，开发者暂时无需关注。 |
| promotionalOfferId | string | 否 | 优惠ID。优惠ID来源于开发者在[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)中配置商品信息时设置的促销优惠标识符，具体请参见[设置促销价格](https://developer.huawei.com/consumer/cn/doc/app/promotion-non-subscription-0000001931836332#section1429175616582)。传递该字段且要生效，需传递jwsRepresentation字段包含促销优惠信息。 |
| applicationUserName | string | 否 | 用户账户相关联的混淆字符串，唯一标识用户。传递优惠ID场景，可以传递该字段。 |
| jwsRepresentation | string | 否 | 包含购买参数信息的JWS格式签名数据。购买参数，如促销优惠等。详细说明见[生成订阅优惠签名购买参数](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-server-subscribe-offer-sign)。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| purchaseData | string | 包含支付结果的JSON字符串，包含的参数请参见[PurchaseData](#purchasedata)。 |

**fail返回值：**

| 错误码 | 错误信息 |
| -------- | -------- |
| 102 | Param error |
| 401 | Parameter error. |
| 1001860000 | The operation was canceled by the user. |
| 1001860001 | System internal error. |
| 1001860002 | The application is not authorized. |
| 1001860003 | Invalid product information. |
| 1001860004 | Too frequent API calls. |
| 1001860005 | Network connection error. |
| 1001860007 | The app to which the product belongs is not released in a specified location. |
| 1001860051 | Failed to purchase a product because the user already owns the product. |
| 1001860054 | The country or region of the signed-in HUAWEI ID does not support IAP. |
| 1001860056 | The user is not allowed to make purchase. |
| 1001860059 | Invalid promotional offer id. |
| 1001860060 | Invalid purchase signature. |

**示例：**

```js
has.createIap({
  // 替换为实际的商品id
  productId: 'product_id',
  productType: 0,
  developerPayload: '',
  reservedInfo: JSON.stringify({ key1: 'value1' }),
  promotionalOfferId: '',
  applicationUserName: '',
  jwsRepresentation: '',
  success: (res) => {
    console.info('createIap success', res);
  },
  fail: (err) => {
    console.error('createIap fail', err);
  },
  complete: (res) => {
    console.info('createIap complete', res);
  }
});
```

## has.finishIap

has.finishIap(Object object)

应用完成已购商品的发货后，调用此接口确认发货，指明此次购买流程结束。

**需要权限：** 开发前需要配置[Client ID](https://developer.huawei.com/consumer/cn/doc/atomic-guides/account-atomic-client-id)、[配置签名证书指纹](https://developer.huawei.com/consumer/cn/doc/app/agc-help-signature-info-0000001628566748#section5181019153511)、[开通商户服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/iap-enable-merchant-service)、[开启和激活应用内购买服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/iap-enable-in-app-purchases)。

**起始版本：** 1.0.5

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| productType | number | 是 | 需要查询的商品类型。<br/>0：消耗型商品<br/>1：非消耗型商品<br/>2：自动续期订阅商品<br/>3：非续期订阅商品（**起始版本：** 1.0.10） |
| purchaseToken | string | 是 | 购买订单中返回的购买token。<br/>单次购买中与具体购买订单一一对应；订阅购买中与订阅Id一一对应。<br/>对应请求[createIap](#hascreateiap)或[queryIap](#hasqueryiap)接口返回。 |
| purchaseOrderId | string | 是 | 购买订单中返回的购买订单ID。<br/>对应[createIap](#hascreateiap)或[queryIap](#hasqueryiap)接口返回。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**fail返回值：**

| 错误码 | 错误信息 |
| -------- | -------- |
| 102 | Param error |
| 401 | Parameter error. |
| 1001860001 | System internal error. |
| 1001860002 | The application is not authorized. |
| 1001860004 | Too frequent API calls. |
| 1001860005 | Network connection error. |
| 1001860050 | The HUAWEI ID is not signed in. |
| 1001860052 | The purchase cannot be finished because the user has not paid for it. |
| 1001860053 | The purchase has been finished and cannot be finished again. |
| 1001860054 | The country or region of the signed-in HUAWEI ID does not support IAP. |

**示例：**

```js
has.finishIap({
  productType: 0,
  // 替换为实际的purchaseToken
  purchaseToken: '***',
  // 替换为实际的purchaseOrderId
  purchaseOrderId: '***',
  success: () => {
    console.info('finishIap success');
  },
  fail: (err) => {
    console.error('finishIap fail', err);
  },
  complete: (res) => {
    console.info('finishIap complete', res);
  }
});
```

## has.queryIap

has.queryIap(Object object)

查询用户已订购商品的购买数据，包括消耗型商品和非消耗型商品，一次请求只能查询一种类型的商品。

- 若查询消耗型商品，IAP仅返回用户已购未消耗的购买数据。若有购买数据返回，说明可能存在因某些异常而导致未进行发货的情况，需要应用判断是否已发货，未发货则需要进行补发货处理。
- 若查询非消耗型商品，IAP返回用户所有已订购商品的购买数据。

**需要权限：** 开发前需要配置[Client ID](https://developer.huawei.com/consumer/cn/doc/atomic-guides/account-atomic-client-id)、[配置签名证书指纹](https://developer.huawei.com/consumer/cn/doc/app/agc-help-signature-info-0000001628566748#section5181019153511)、[开通商户服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/iap-enable-merchant-service)、[开启和激活应用内购买服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/iap-enable-in-app-purchases)。

**起始版本：** 1.0.5

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| productType | number | - | 是 | 需要查询的商品类型。<br/>0：消耗型商品<br/>1：非消耗型商品<br/>2：自动续期订阅商品<br/>3：非续期订阅商品（**起始版本：** 1.0.10） |
| continuationToken | string | - | 否 | 支持分页查询的数据定位标志。<br/>第1次查询时可以不传该参数。如果用户拥有的商品数量非常大，当响应中存在continuationToken时，应用必须对当前方法发起另一个调用，并传入本次接收到的continuationToken。如果商品仍未查完，仍需要继续发起调用，直到不再返回continuationToken，表示已经返回全部商品。 |
| queryType | number | 1 | 否 | 查询类型。默认值为1。<br/>0：消耗型商品、非消耗型商品或自动续期订阅商品的所有购买记录。<br/>1：已购买但未交付的消耗型商品、非消耗型商品或自动续期订阅商品。<br/>2：购买的非消耗型商品或当前有效的自动续期订阅商品。<br/>在沙盒环境下：<br/>productType为1时，只返回已购买未确认发货的非消耗型商品。<br/>productType为2时，只返回当前生效的自动续期订阅商品。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| purchaseDataList | string[] | [PurchaseData](#purchasedata)字符串的数组。 |
| continuationToken | string | 支持分页查询的数据定位标志。<br/>如果用户拥有的商品数量非常大，当响应中存在continuationToken时，应用必须对当前方法发起另一个调用，并传入本次接收到的continuationToken。如果商品仍未查完，仍需要继续发起调用，直到不再返回continuationToken，表示已经返回全部商品。 |

**fail返回值：**

| 错误码 | 错误信息 |
| -------- | -------- |
| 102 | Param error |
| 401 | Parameter error. |
| 1001860001 | System internal error. |
| 1001860002 | The application is not authorized. |
| 1001860004 | Too frequent API calls. |
| 1001860005 | Network connection error. |
| 1001860050 | The HUAWEI ID is not signed in. |
| 1001860054 | The country or region of the signed-in HUAWEI ID does not support IAP. |

**示例：**

```js
has.queryIap({
  productType: 0,
  queryType: 1,
  success: (res) => {
    console.info('queryIap success', res);
  },
  fail: (err) => {
    console.error('queryIap fail', err);
  },
  complete: (res) => {
    console.info('queryIap complete', res);
  }
});
```

## has.queryIapProducts

has.queryIapProducts(Object object)

获取在[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html#/)上配置的商品的详情信息。

**需要权限：** 开发前需要配置[Client ID](https://developer.huawei.com/consumer/cn/doc/atomic-guides/account-atomic-client-id)、[配置签名证书指纹](https://developer.huawei.com/consumer/cn/doc/app/agc-help-signature-info-0000001628566748#section5181019153511)、[开通商户服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/iap-enable-merchant-service)、[开启和激活应用内购买服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/iap-enable-in-app-purchases)。

**起始版本：** 1.0.10

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| productType | number | 是 | 需要查询的商品类型。<br/> 0：消耗型商品<br/> 1：非消耗型商品<br/> 2：自动续期订阅商品<br/> 3：非续期订阅商品 |
| productIds | string[] | 是 | 待查询商品ID列表。<br/>商品ID必须已经在当前应用中创建且唯一。<br/>商品ID来源于开发者在[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)中配置商品信息时设置的商品ID，请参见[配置商品信息](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/iap-config-product)。<br/>**说明：** 一次查询最多支持200个商品，商品数量较多时建议分批查询。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

返回[Product](#product)数组。

**fail返回值：**

| 错误码 | 错误信息 |
| -------- | -------- |
| 102 | Param error |
| 401 | Parameter error. |
| 1001860001 | System internal error. |
| 1001860002 | The application is not authorized. |
| 1001860003 | Invalid product information. |
| 1001860004 | Too frequent API calls. |
| 1001860005 | Network connection error. |
| 1001860007 | The app to which the product belongs is not released in a specified location. |
| 1001860050 | The HUAWEI ID is not signed in. |
| 1001860054 | The country or region of the signed-in HUAWEI ID does not support IAP. |

**示例：**

```js
has.queryIapProducts({
  productType: 0,
  productIds: ['xxx-1', 'xxx-2'],
  success: (res) => {
    console.info('queryIapProducts success', res);
  },
  fail: (err) => {
    console.error('queryIapProducts fail', err);
  },
  complete: (res) => {
    console.info('queryIapProducts complete', res);
  }
});
```

## has.isIapSandboxActivated

has.isIapSandboxActivated(Object object)

检查沙盒测试能力是否生效。

**需要权限：** 开发前需要配置[Client ID](https://developer.huawei.com/consumer/cn/doc/atomic-guides/account-atomic-client-id)、[配置签名证书指纹](https://developer.huawei.com/consumer/cn/doc/app/agc-help-signature-info-0000001628566748#section5181019153511)、[开通商户服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/iap-enable-merchant-service)、[开启和激活应用内购买服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/iap-enable-in-app-purchases)。

**起始版本：** 1.0.10

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

返回boolean，代表沙盒测试能力是否生效。

**fail返回值：**

| 错误码 | 错误信息 |
| -------- | -------- |
| 401 | Parameter error. |
| 1001860001 | System internal error. |
| 1001860002 | The application is not authorized. |
| 1001860004 | Too frequent API calls. |
| 1001860005 | Network connection error. |
| 1001860050 | The HUAWEI ID is not signed in. |
| 1001860054 | The country or region of the signed-in HUAWEI ID does not support IAP. |
| 1001860057 | The app provision type is not debug. |
| 1001860058 | The HUAWEI ID is not test account. |

**示例：**

```js
has.isIapSandboxActivated({
  success: (res) => {
    console.info('isIapSandboxActivated success', res);
  },
  fail: (err) => {
    console.error('isIapSandboxActivated fail', err);
  },
  complete: (res) => {
    console.info('isIapSandboxActivated complete', res);
  }
});
```

## has.showIapManagedSubscriptions

has.showIapManagedSubscriptions(Object object)

跳转到订阅页或订阅详情页。

**需要权限：** 开发前需要配置[Client ID](https://developer.huawei.com/consumer/cn/doc/atomic-guides/account-atomic-client-id)、[配置签名证书指纹](https://developer.huawei.com/consumer/cn/doc/app/agc-help-signature-info-0000001628566748#section5181019153511)、[开通商户服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/iap-enable-merchant-service)、[开启和激活应用内购买服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/iap-enable-in-app-purchases)。

**起始版本：** 1.0.10

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| uiParameter | [UIWindowParameter](#uiwindowparameter) | 是 | 包含界面窗口模式的[UIWindowParameter](#uiwindowparameter)对象。 |
| groupId | string | 否 | 订阅组ID，来源于开发者在[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)中配置管理的订阅组，请参见[新增订阅组](https://developer.huawei.com/consumer/cn/doc/app/non-subscription-0000001958955109#section37862471018)。<br/>**说明：**<br/> - 传递groupId，跳转到订阅详情页。<br/> - 不传递groupId，跳转到订阅页。如果用户在应用只有一条订阅数据，此时会跳转到此条订阅的订阅详情页。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**fail返回值：**

| 错误码 | 错误信息 |
| -------- | -------- |
| 102 | Param error |
| 401 | Parameter error. |
| 1001860001 | System internal error. |
| 1001860002 | The application is not authorized. |
| 1001860004 | Too frequent API calls. |
| 1001860005 | Network connection error. |
| 1001860050 | The HUAWEI ID is not signed in. |
| 1001860054 | The country or region of the signed-in HUAWEI ID does not support IAP. |

**示例：**

```js
has.showIapManagedSubscriptions({
  uiParameter: {
    windowScreenMode: 1
  },
  groupId: 'xxx',
  success: () => {
    console.info('showIapManagedSubscriptions success');
  },
  fail: (err) => {
    console.error('showIapManagedSubscriptions fail', err);
  },
  complete: (res) => {
    console.info('showIapManagedSubscriptions complete', res);
  }
});
```

## PurchaseData

包含jws格式的订单信息、订阅状态信息。

**起始版本：** 1.0.5

| 名称 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| type | number | 是 | 商品类型。<br/>0：消耗型商品<br/>1：非消耗型商品<br/>2：自动续期订阅商品<br/>3：非续期订阅商品（**起始版本：** 1.0.10） |
| jwsPurchaseOrder | string | 否 | 包含订单信息的JWS格式数据。可参见[对返回结果验签](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-verifying-signature)解码验签获取相关购买数据的JSON字符串，其包含的参数请参见[PurchaseOrderPayload](#purchaseorderpayload)。 |
| jwsSubscriptionStatus | string | 否 | 包含订阅状态信息的JWS格式数据。可参见[对返回结果验签](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/iap-verifying-signature)解码验签获取相关订阅状态信息的JSON字符串 |

## PurchaseOrderPayload

订单信息模型，支持消耗型商品、非消耗型商品和自动续期订阅商品。

**起始版本：** 1.0.5

| 名称 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| environment | string | 是 | 环境类型。<br/>NORMAL：生产环境<br/>SANDBOX：沙盒环境 |
| purchaseOrderId | string | 是 | 具体一笔订单中对应的购买订单号ID。 |
| purchaseToken | string | 是 | 购买token，在购买消耗型/非消耗型商品场景中与具体购买订单一一对应，在自动续期订阅商品场景中与订阅ID一一对应。 |
| applicationId | string | 是 | 应用ID。 |
| productId | string | 是 | 商品ID。 |
| productType | string | 是 | 商品类型。具体取值如下：<br/> 0：消耗型商品<br/> 1：非消耗型商品<br/> 2：自动续期订阅商品<br/> 3：非续期订阅商品（**起始版本：** 1.0.10） |
| purchaseTime | number | 是 | 购买时间，UTC时间戳，以毫秒为单位。<br/>如果没有完成购买，则没有值。 |
| finishStatus | string | 否 | 发货状态。具体取值如下：<br/> 1：已发货<br/> 2：未发货 |
| needFinish | boolean | 否 | 是否需要确认发货，完成购买。具体取值如下：<br/> true：必须确认发货，完成购买<br/> false：可选确认发货，完成购买 |
| price | number | 是 | 价格，单位：分。 |
| currency | string | 是 | 币种，请参见[ISO 4217](https://www.iso.org/iso-4217-currency-codes.html)标准。例如CNY、USD、MYR。 |
| developerPayload | string | 否 | 商户侧保留信息，由开发者在调用支付接口时传入。 |
| purchaseOrderRevocationReasonCode | string | 否 | 购买订单撤销原因。<br/> 0：其他<br/> 1：用户遇到问题退款 |
| revocationTime | number | 否 | 购买订单撤销时间，UTC时间戳，以毫秒为单位。 |
| offerTypeCode | string | 否 | 优惠类型。<br/> 1：推介促销<br/> 2：优惠促销 |
| offerId | string | 否 | 优惠ID。 |
| countryCode | string | 是 | 国家/地区码，用于区分国家/地区信息，请参见[ISO 3166](https://www.iso.org/iso-3166-country-codes.html)标准。 |
| signedTime | number | 是 | 签名时间，UTC时间戳，以毫秒为单位。 |

## SubGroupStatusPayload

订阅组相关的订阅状态信息。

**起始版本：** 1.0.5

| 名称 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| environment | string | 是 | 环境类型。<br/>NORMAL：生产环境<br/>SANDBOX：沙盒环境 |
| applicationId | string | 是 | 应用ID。 |
| packageName | string | 是 | 应用包名。 |
| subGroupId | string | 是 | 订阅组ID。 |
| lastSubscriptionStatus | object | 否 | 订阅组中最后生效的订阅状态[SubscriptionStatus](#subscriptionstatus)，比如A切换B，B切换C，此处是C的订阅状态。 |
| historySubscriptionStatusList | object[] | 否 | 订阅组最近生效的历史订阅状态[SubscriptionStatus](#subscriptionstatus)的列表，比如A切换B，B切换C，这里包含C，B，A三个订阅状态信息。 |

## SubscriptionStatus

订阅状态信息。

**起始版本：** 1.0.5

| 名称 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| subGroupGenerationId | string | 是 | 订阅组的代ID。<br/>- 用户切换订阅商品时，此ID不会改变。<br/>- 订阅失效且超出[保留期](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/iap-subscription-functions#section1656191811315)后，用户重新购买商品时，此ID会改变。 |
| subscriptionId | string | 是 | 商品的订阅ID。以下场景，此ID会发生改变：<br/>- 用户切换订阅商品时。<br/>- 订阅失效且超出[保留期](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/iap-subscription-functions#section1656191811315)后，用户重新购买商品时。 |
| purchaseToken | string | 是 | 购买token，在购买消耗型/非消耗型商品场景中与具体购买订单一一对应，在订阅型商品场景中与订阅ID一一对应。 |
| status | string | 是 | 订阅状态。<br/> 1：生效中<br/> 2：已到期<br/> 3：尝试扣费<br/> 5：撤销 |
| expiresTime | number | 是 | 自动续期订阅商品的过期时间，UTC时间戳，以毫秒为单位。 |
| lastPurchaseOrder | object | 否 | 当前订阅最新的一笔购买订单。购买订单包含的参数请参见[PurchaseOrderPayload](#purchaseorderpayload)。 |
| recentPurchaseOrderList | object[] | 否 | 当前订阅最新的购买订单列表，包含续期、折算等产生的购买订单。购买订单包含的参数请参见[PurchaseOrderPayload](#purchaseorderpayload)。 |
| renewalInfo | object | 否 | 当前订阅最新的未来扣费计划，包含的参数请参见[SubRenewalInfo](#subrenewalinfo)。 |

## SubRenewalInfo

订阅的扣费计划信息。

**起始版本：** 1.0.5

| 名称 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| environment | string | 是 | 环境类型。<br/>NORMAL：生产环境<br/>SANDBOX：沙盒环境 |
| subGroupGenerationId | string | 是 | 订阅组的代ID。<br/>- 用户切换订阅商品时，此ID不会改变。<br/>- 订阅失效且超出[保留期](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/iap-subscription-functions#section1656191811315)后，用户重新购买商品时，此ID会改变。 |
| nextRenewPeriodProductId | string | 否 | 下一个计费周期续订的商品ID。 |
| productId | string | 是 | 当前生效的商品ID。 |
| autoRenewStatusCode | string | 是 | 自动续期状态。<br/> 0：关闭<br/> 1：打开 |
| hasInBillingRetryPeriod | boolean | 是 | 系统是否还在尝试扣费。<br/> true：是<br/> false：否 |
| priceIncreaseStatusCode | string | 否 | 目前涨价状态码。<br/> 1：用户暂未同意涨价<br/> 2：用户已同意涨价 |
| offerTypeCode | string | 否 | 优惠类型。<br/> 1：推介促销<br/> 2：优惠促销 |
| offerId | string | 否 | 优惠ID。 |
| renewalPrice | number | 否 | 下期续费价格，取消订阅场景下不返回，单位：分。 |
| currency | string | 否 | 币种，请参见[ISO 4217](https://www.iso.org/iso-4217-currency-codes.html)标准。例如CNY、USD、MYR。 |
| renewalTime | number | 否 | 续期时间，UTC时间戳，以毫秒为单位。 |
| expirationIntent | string | 否 | 订阅续期失败的原因。<br/> 1：用户取消<br/> 2：商品无效<br/> 3：签约无效<br/> 4：扣费异常<br/> 5：用户不同意涨价<br/> 6：未知 |

## UIWindowParameter

界面窗口参数。

**起始版本：** 1.0.10

| 名称 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| windowScreenMode | number | 是 | 界面窗口模式。<br/> 1：界面窗口弹窗模式<br/> 2：界面窗口全屏模式 |

## Product

包含单个商品详细信息。

**起始版本：** 1.0.10

| 名称 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| id | string | 是 | 商品ID。 |
| type | number | 是 | 商品类型。<br/> 0：消耗型商品<br/> 1：非消耗型商品<br/> 2：自动续期订阅商品<br/> 3：非续期订阅商品 |
| name | string | 是 | 商品名称，为配置商品信息时配置的名称。<br/>用于显示在应用内支付收银台。 |
| description | string | 是 | 商品描述，即配置商品信息时配置的描述信息。 |
| price | string | 是 | 商品的展示价格，包含商品币种和价格，格式为“币种+商品价格”，例如 EUR 0.15。<br/>部分国家/地区会返回“货币符号+商品价格”，例如中国大陆返回“￥0.15”。<br/>此价格含税。<br/>- 当商品为消耗型/非消耗型商品时，若[设置促销价格](https://developer.huawei.com/consumer/cn/doc/app/promotion-non-subscription-0000001931836332#section1429175616582)，该字段为商品的促销价格，未设置则为商品原价。<br/>- 当商品为自动续期订阅商品时，该字段为商品的原价。<br/>**说明：** 该字段已废弃，建议使用localPrice替代。 |
| localPrice | string | 否 | 商品的展示价格，包含商品币种和价格，格式为“币种+商品价格”，例如 EUR 0.15。<br/>部分国家/地区会返回“货币符号+商品价格”，例如中国大陆返回“￥0.15”。<br/>此价格含税。<br/>- 当商品为消耗型/非消耗型商品时，若[设置促销价格](https://developer.huawei.com/consumer/cn/doc/app/promotion-non-subscription-0000001931836332#section1429175616582)，该字段为商品的促销价格，未设置则为商品原价。<br/>- 当商品为自动续期订阅商品时，该字段为商品的原价。 |
| microPrice | number | 是 | 商品实际价格乘以1,000,000后的微单位价格。<br/>例如某个商品实际价格是1.99美元，则该商品对应的微单位价格为：1.99\*1000000=1990000。<br/>- 当商品为消耗型/非消耗型商品或者非续期订阅商品，若[设置促销价格](https://developer.huawei.com/consumer/cn/doc/app/promotion-non-subscription-0000001931836332#section1429175616582)，该字段为商品微单位促销价格，未设置则为商品微单位原价。<br/>- 当商品为自动续期订阅商品时，该字段为商品微单位原价。 |
| originalLocalPrice | string | 是 | 商品的原价，包含商品币种和价格，格式为“币种+商品价格”，例如 EUR 0.15。<br/>部分国家/地区会返回“货币符号+商品价格”，例如中国大陆返回“￥0.15”。<br/>此价格含税。<br/>- 当商品为消耗型/非消耗型商品或者非续期订阅商品，无论是否[设置促销价格](https://developer.huawei.com/consumer/cn/doc/app/promotion-non-subscription-0000001931836332#section1429175616582)，该字段均为商品原价。<br/>- 当商品为自动续期订阅商品时，无此字段返回，开发者无需关注。 |
| originalMicroPrice | number | 是 | 商品原价的微单位价格。<br/>商品原价乘以1,000,000后的微单位价格。<br/>例如某个商品原价是1.99美元，则该商品对应的微单位价格为：1.99\*1000000=1990000。<br/>- 当商品为消耗型/非消耗型商品或者非续期订阅商品，无论是否[设置促销价格](https://developer.huawei.com/consumer/cn/doc/app/promotion-non-subscription-0000001931836332#section1429175616582)，该字段均为商品微单位原价。<br/>- 当商品为自动续期订阅商品时，无此字段返回，开发者无需关注。 |
| currency | string | 是 | 用于支付该商品的币种，例如CNY。 |
| status | number | 否 | 商品状态。<br/> 0：有效状态<br/> 1：取消状态，即删除。此状态的商品不可续订，也不可订阅<br/> 3：下线状态，不能订阅，但老用户仍可续订 |
| subscriptionInfo | [SubscriptionInfo](#subscriptioninfo) | 否 | 自动续期订阅商品相关的信息。 |
| promotionalOffers | [PromotionalOffer](#promotionaloffer)[] | 否 | 订阅商品支持的优惠信息列表。 |
| jsonRepresentation | string | 否 | 商品详细信息的原始JSON字符串。 |

## SubscriptionInfo

订阅信息。

**起始版本：** 1.0.10

| 名称 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| periodUnit | number | 是 | 订阅周期单位。<br/> 0：天<br/> 1：周<br/> 2：月<br/> 3：年<br/> 4：分（预留参数，暂未支持） |
| periodCount | number | 是 | 订阅周期数量。 |
| groupId | string | 是 | 订阅组ID。 |
| groupLevel | number | 是 | 商品等级。 |
| hasEligibilityForIntroOffer | boolean | 否 | 用户是否享受过同组订阅的促销。取值如下：<br/> true：已享受过<br/> false：未享受过<br/>其他：未获取到状态 |
| introductoryOffer | [SubscriptionOffer](#subscriptionoffer) | 否 | 促销信息 |

## SubscriptionOffer

促销信息。

**起始版本：** 1.0.10

| 名称 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| paymentMode | number | 是 | 促销的付费方式。<br/> 1：免费试用<br/> 2：随用随付<br/> 3：提前支付 |
| periodUnit | number | 是 | 订阅周期单位。<br/> 0：天<br/> 1：周<br/> 2：月<br/> 3：年<br/> 4：分（预留参数，暂未支持） |
| periodCount | number | 是 | 促销期数。 |
| localPrice | string | 是 | 促销价格，包含商品币种和价格，格式为“币种+商品价格”，例如 EUR 0.15。<br/>部分国家/地区会返回“货币符号+商品价格”，例如中国大陆返回“￥0.15”。 |
| microPrice | number | 是 | 促销价格的微单位价格。<br/>促销价格乘以1,000,000后的微单位价格。 |
| offerType | number | 是 | 促销类型。<br/> 0：推介促销<br/> 1：优惠促销 |

## PromotionalOffer

订阅商品支持的自定义优惠信息。

**起始版本：** 1.0.10

| 名称 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| offerId | string | 是 | 优惠ID。 |
| paymentMode | number | 是 | 促销的付费方式。<br/> 1：免费试用<br/> 2：随用随付<br/> 3：提前支付 |
| periodUnit | number | 否 | 订阅周期单位。<br/> 0：天<br/> 1：周<br/> 2：月<br/> 3：年<br/> 4：分（预留参数，暂未支持） |
| periodCount | number | 否 | 订阅周期数量。 |
| localPrice | string | 是 | 显示的优惠商品价格，包含商品币种和价格，格式为“币种+商品价格”，例如 EUR 0.15。<br/>部分国家/地区会返回“货币符号+商品价格”，例如中国大陆返回“￥0.15”。 |
| microPrice | number | 是 | 显示的优惠商品实际价格乘以1,000,000后的微单位价格。例如某个商品实际价格是1.99美元，则该商品对应的微单位价格为：1.99\*1000000=1990000。 |
