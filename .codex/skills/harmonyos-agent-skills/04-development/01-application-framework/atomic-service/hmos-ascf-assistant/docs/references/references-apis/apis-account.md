# 账号

## has.login

has.login(Object object)

调用接口获取登录凭证（code）。通过凭证进而获取用户登录状态信息，包括用户在当前程序的唯一标识（openid）、平台账号下的唯一标识（unionid）。用户数据的加解密通信需要依赖会话密钥完成。

开发准备

1. [配置签名和指纹](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-sign-fingerprints)。

2. [配置Client ID](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-client-id)。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 |类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值**：

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| code | string | 用户登录凭证（有效期五分钟）。 |
| idToken | string | JWT格式的字符串，包含用户信息。 |
| openID | string | 华为账号用户在不同类型的产品的身份ID，同一个用户不同应用，OpenID值不同。 |
| unionID | string | 华为账号用户在同一个开发者账号下产品的身份ID，同一个用户，同一个开发者账号下管理的不同应用，UnionID值相同。 |

**示例：**

```js
has.login({
  success: (res) => {
    console.info(`login success, res = ${JSON.stringify(res)}`);
  },
  fail: (err) => {
    console.error(`login fail, err = ${JSON.stringify(err)}`);
  },
  complete: (res) => {
    console.info(`login complete, res = ${JSON.stringify(res)}`);
  }
});
```

## has.getUserRiskLevel

has.getUserRiskLevel(Object object)

调用接口获取授权码（Authorization Code）。通过授权码进而获取用户账号风险等级。

开发准备

1. [配置签名和指纹](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-sign-fingerprints)。

2. [配置Client ID](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-client-id)。

3. 元服务在使用获取风险等级能力之前，需要完成对应的[scope权限申请](https://developer.huawei.com/consumer/cn/doc/atomic-guides/account-guide-atomic-get-risklevel#section5875154219491)。

**起始版本：** 1.0.20

**依赖关系：** HarmonyOS SDK版本≥6.0.2(22) 且ROM版本 ≥ 6.0.2

**参数：**

参数为Object对象，包括以下字段。

| 参数 |类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值**：

| 参数 | 类型 | 描述 |
| -------- | -------- |----|
| code | string | 授权码。可以使用code获取用户的风险等级信息，具体可参考[服务端开发](https://developer.huawei.com/consumer/cn/doc/atomic-guides/account-guide-atomic-get-risklevel#section15191194015326)。 |


**示例：**

```js
has.getUserRiskLevel({
  success: (res) => {
    console.info('getUserRiskLevel success, code = ', res.code);
  },
  fail: (err) => {
    console.error('getUserRiskLevel fail, errMsg = ', err.errMsg);
  },
  complete: (res) => {
    console.info('getUserRiskLevel complete, res = ', res);
  }
});
```