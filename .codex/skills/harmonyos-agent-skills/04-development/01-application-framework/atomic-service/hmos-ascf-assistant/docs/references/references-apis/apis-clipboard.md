# 剪贴板

## has.setClipboardData

has.setClipboardData(Object object)

设置系统剪贴板的内容。

调用成功后，会弹窗提示“内容已复制”，弹窗在界面上的显示将持续1.5秒。

**起始版本**：1.0.8

**参数**：

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| data | string | 是 | 剪贴板的内容。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.setClipboardData({
  data: 'data',
  success: () => {
    console.info('setClipboardData success');
  },
  fail: (err) => {
    console.error('setClipboardData fail', err);
  },
  complete: (res) => {
    console.info('setClipboardData complete', res);
  }
});
```

## has.getClipboardData

has.getClipboardData(Object object)

获取系统剪贴板的内容。

**需要权限**：

需要申请ohos.permission.READ_PASTEBOARD权限，权限申请步骤：

1. 查看[READ_PASTEBOARD](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/restricted-permissions#ohospermissionread_pasteboard)介绍，审视应用是否符合申请该权限的使用场景。

2. [在AGC侧申请Profile文件](https://developer.huawei.com/consumer/cn/doc/app/agc-help-add-releaseprofile-0000001914714796)，将用于后续的应用签名信息配置。

3. 在module.json5配置文件中[声明权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/declare-permissions)。

**起始版本**：1.0.21

**参数**：

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值**：

返回值为Object对象，包括以下字段。

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| data | string | 剪贴板的内容。 |

**示例：**

```js
has.getClipboardData({
  success: (res) => {
    console.info('getClipboardData success:', res.data);
  },
  fail: (err) => {
    console.error('getClipboardData fail:', err);
  },
  complete: (res) => {
    console.info('getClipboardData complete:', res);
  }
});
```