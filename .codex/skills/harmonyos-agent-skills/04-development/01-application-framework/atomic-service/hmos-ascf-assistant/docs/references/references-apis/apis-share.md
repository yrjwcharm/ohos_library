# 分享

## has.showShareMenu

has.showShareMenu(Object object)

显示当前页面的分享按钮（激活被 has.hideShareMenu 置灰的分享按钮）。

**起始版本：** 1.0.16

**依赖关系：** HarmonyOS SDK版本≥6.0.0(20) 且ROM版本 ≥ 6.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.showShareMenu({
  success: () => {
    console.info('showShareMenu success');
  },
  fail: (err) => {
    console.error('showShareMenu fail', err);
  },
  complete: (res) => {
    console.info('showShareMenu complete', res);
  }
});
```


## has.hideShareMenu

has.hideShareMenu(Object object)

禁用当前页面分享按钮。

**起始版本：** 1.0.16

**依赖关系：** HarmonyOS SDK版本≥6.0.0(20) 且ROM版本 ≥ 6.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.hideShareMenu({
  success: () => {
    console.info('hideShareMenu success');
  },
  fail: (err) => {
    console.error('hideShareMenu fail', err);
  },
  complete: (res) => {
    console.info('hideShareMenu complete', res);
  }
});
```
