# 实名

## has.startRealNameVerification

has.startRealNameVerification(Object object)

提供实名信息验证功能，调用该方法后会拉起实名信息验证授权组件。

**起始版本：** 1.0.10

**依赖关系**：HarmonyOS SDK版本≥5.1.1(19) 且 ROM版本 ≥ 5.1.1

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| preVerifyId | string | - | 是 | 预验证ID。获取方式请参考[实名信息预验证](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-api-common-verification-preverify)。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

返回string，代表实名信息验证ID，用于[实名信息验证结果查询](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-api-common-verification-result)。

**fail返回值：**

| 错误码 | 错误信息 |
| -------- | -------- |
| 102 | Param error |
| 401 | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types. |
| 1020100000 | The application does not have the required capability. |
| 1020100001 | The user did not accept the agreement. |
| 1020100002 | The user canceled the operation. |
| 1020100003 | The pre-verify ID is invalid. |
| 1020100004 | The network is unavailable. |
| 1020100005 | System internal error. |
| 1020100008 | The app ID does not match. |
| 1020100009 | The user ID does not match. |

**示例：**

```js
has.startRealNameVerification({
  preVerifyId: 'xxx',
  success: (res) => {
    console.info('startRealNameVerification success', res);
  },
  fail: (err) => {
    console.error('startRealNameVerification fail', err);
  },
  complete: (res) => {
    console.info('startRealNameVerification complete', res);
  }
});
```

## has.startRealNameAuth

has.startRealNameAuth(Object object)

提供实名信息授权功能，调用该方法后会拉起实名信息授权组件。

**起始版本：** 1.0.10

**依赖关系**：HarmonyOS SDK版本≥5.1.1(19) 且 ROM版本 ≥ 5.1.1

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

返回string，代表实名信息授权ID，用于[实名信息授权结果查询](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-api-common-auth-result)。

**fail返回值：**

| 错误码 | 错误信息 |
| -------- | -------- |
| 102 | Param error |
| 401 | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types. |
| 1020100000 | The application does not have the required capability. |
| 1020100001 | The user did not accept the agreement. |
| 1020100002 | The user canceled the operation. |
| 1020100004 | The network is unavailable. |
| 1020100005 | System internal error. |

**示例：**

```js
has.startRealNameAuth({
  success: (res) => {
    console.info('startRealNameAuth success', res);
  },
  fail: (err) => {
    console.error('startRealNameAuth fail', err);
  },
  complete: (res) => {
    console.info('startRealNameAuth complete', res);
  }
});
```

## has.startFaceVerification

has.startFaceVerification(Object object)

提供人脸核身实人验证功能，调用该方法后会拉起人脸核身实人验证组件。

**起始版本：** 1.0.10

**依赖关系**：HarmonyOS SDK版本≥5.1.1(19) 且 ROM版本 ≥ 5.1.1

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| preVerifyId | string | - | 是 | 预验证ID。获取方式请参考[人脸核身实人预验证](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-api-common-face-verifactaion-preverify)。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

返回string，代表验证结果ID，用于[人脸核身实人验证结果查询](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/payment-api-common-face-verifactaion-result)。

**fail返回值：**

| 错误码 | 错误信息 |
| -------- | -------- |
| 102 | Param error |
| 401 | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types. |
| 1020100000 | The application does not have the required capability. |
| 1020100001 | The user did not accept the agreement. |
| 1020100002 | The user canceled the operation. |
| 1020100003 | The pre-verify ID is invalid. |
| 1020100004 | The network is unavailable. |
| 1020100005 | System internal error. |
| 1020100006 | The camera permission is not granted. |
| 1020100007 | The liveness detection failed. |
| 1020100008 | The app ID does not match. |
| 1020100009 | The user ID does not match. |

**示例：**

```js
has.startFaceVerification({
  preVerifyId: 'xxx',
  success: (res) => {
    console.info('startFaceVerification success', res);
  },
  fail: (err) => {
    console.error('startFaceVerification fail', err);
  },
  complete: (res) => {
    console.info('startFaceVerification complete', res);
  }
});
```
