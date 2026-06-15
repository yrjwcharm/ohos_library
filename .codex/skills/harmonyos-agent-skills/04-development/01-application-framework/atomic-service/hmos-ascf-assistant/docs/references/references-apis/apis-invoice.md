# 发票

## has.chooseInvoiceTitle

has.chooseInvoiceTitle(Object object)

选择用户的发票抬头。

**需要权限：** 开发前需要配置[Client ID](https://developer.huawei.com/consumer/cn/doc/atomic-guides/account-atomic-client-id)和[配置签名证书指纹](https://developer.huawei.com/consumer/cn/doc/app/agc-help-signature-info-0000001628566748#section5181019153511)。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| type | string | 抬头类型。<br/>合法值：0-单位，1-个人 |
| title | string | 抬头名称。 |
| taxNumber | string | 抬头税号。 |
| companyAddress | string | 单位地址。 |
| telephone | string | 手机号码。 |
| bankName | string | 银行名称。 |
| bankAccount | string | 银行账号。 |

**示例：**

```js
has.chooseInvoiceTitle({
  success: (res) => {
    console.info('chooseInvoiceTitle success', res);
  },
  fail: (err) => {
    console.error('chooseInvoiceTitle fail', err);
  },
  complete: (res) => {
    console.info('chooseInvoiceTitle complete', res);
  }
});
```
