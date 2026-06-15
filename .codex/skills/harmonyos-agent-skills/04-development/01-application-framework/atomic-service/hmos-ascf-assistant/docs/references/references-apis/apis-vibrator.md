# 振动

## has.vibrateShort

has.vibrateShort(Object object)

使设备发生较短时间的振动（15 ms）。

**起始版本：** 1.0.0

**需要权限：** 在module.json5中声明**ohos.permission.VIBRATE**。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| type | string | - | 是 | 振动强度类型，有效值为：heavy、medium、light |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**fail返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| errMsg | string | 错误信息。 |

**示例：**

```js
has.vibrateShort({
  type: 'heavy',
  success: (res) => {
    console.info('vibrateShort success', res);
  },
  fail: (err) => {
    console.error('vibrateShort fail', err);
  },
  complete: (res) => {
    console.info('vibrateShort complete', res);
  }
});
```

## has.vibrateLong

has.vibrateLong(Object object)

使设备发生较长时间的振动（400 ms）。

**起始版本：** 1.0.0

**需要权限：** 在module.json5中声明**ohos.permission.VIBRATE**。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.vibrateLong({
  success: () => {
    console.info('vibrateLong success');
  },
  fail: (err) => {
    console.error('vibrateLong fail', err);
  },
  complete: (res) => {
    console.info('vibrateLong complete', res);
  }
});
```
