# 导航栏

## has.setNavigationBarTitle

has.setNavigationBarTitle(Object object)

动态设置当前页面的标题文本。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| title | string | 是 | 动态设置的页面标题文本。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.setNavigationBarTitle({
  title: '当前页面',
  success: () => {
    console.info('setNavigationBarTitle success');
  },
  fail: (err) => {
    console.error('setNavigationBarTitle fail', err);
  },
  complete: (res) => {
    console.info('setNavigationBarTitle complete', res);
  }
});
```

## has.setNavigationBarColor

has.setNavigationBarColor(Object object)

动态设置当前页面的导航条颜色。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| frontColor | string | 是 | 前景颜色值，包括按钮、标题、状态栏的颜色。<br/>当HarmonyOS API版本为12时，仅当window配置navigationStyle = "custom"时，可设置\#000000或\#FFFFFF，其他情况仅支持\#000000。<br/>当HarmonyOS API版本为13及以上时，可设置\#000000 或\#FFFFFF。 |
| backgroundColor | string | 是 | 背景颜色值，有效值为十六进制颜色。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.setNavigationBarColor({
  frontColor: '#000000',
  backgroundColor: '#ff0000',
  success: () => {
    console.info('setNavigationBarColor success');
  },
  fail: (err) => {
    console.error('setNavigationBarColor fail', err);
  },
  complete: (res) => {
    console.info('setNavigationBarColor complete', res);
  }
});
```
