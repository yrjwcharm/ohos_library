# 人脸活体检测

## has.startLivenessDetection

has.startLivenessDetection(Object object)

跳转拉起系统人脸活体检测页面。

**起始版本：** 1.0.17

**需要权限：**

1. 在module.json5文件中声明**ohos.permission.CAMERA**。
2. 使用[has.authorize()](apis-authorization.md#hasauthorize)中申请 **[scope.camera](../../guides/develop-authorization.md#scope-列表)** 权限。

**约束限制：**

- 平板仅支持竖屏检测，大折叠屏仅支持折叠时使用，小折叠屏仅支持展开时使用。
- 人脸活体检测服务暂不支持横屏、分屏进行检测。
- 该能力暂不支持模拟器使用。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| actionsNum | number | 3 | 否 | 表示动作活体检测的动作数量，数量范围3或4个。 |
| speechSwitch | boolean | true | 否 | 语音播报的开关。<br/>true：开启语音播报。<br/>false：关闭语音播报。 |
| isPrivacyMode | boolean | false | 否 | 是否设置隐私模式。<br/>true：设置隐私模式。<br/>false：不设置隐私模式。<br/>**说明：**<br/>当设置隐私模式时，需要申请ohos.permission.PRIVACY_WINDOW权限。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.startLivenessDetection({
  success: () => {
    console.info('startLivenessDetection success');
  },
  fail: (err) => {
    console.error('startLivenessDetection fail', err);
  },
  complete: (res) => {
    console.info('startLivenessDetection complete', res);
  }
});
```

## has.getInteractiveLivenessResult

has.getInteractiveLivenessResult(Object object)

获取人脸活体检测结果。

**起始版本：** 1.0.17

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

Object类型，包括以下字段。

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| livenessType | number | 当前检测的结果是否为活体。<br/>0表示结果是动作活体检测。<br/>2表示结果是非活体，跳转的是失败页面，不会返回错误信息。 |
| frameBuffer | ArrayBuffer | 缓冲区，检测成功后返回最具活体特征图片的像素数据写入到该内存区域。 |

**示例：**

```js
has.getInteractiveLivenessResult({
  success: (res) => {
    console.info('getInteractiveLivenessResult success', res);
  },
  fail: (err) => {
    console.error('getInteractiveLivenessResult fail', err);
  },
  complete: (res) => {
    console.info('getInteractiveLivenessResult complete', res);
  }
});
```
