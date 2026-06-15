# 三方平台

## has.getExtConfig

has.getExtConfig(Object object)

获取ext配置信息。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 成功回调。 |
| fail | function | 否 | 失败回调。 |
| complete | function | 否 | 执行结束后的回调。 |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| extConfig | Object | 第三方平台自定义的数据。 |

**示例：**

```js
has.getExtConfig({
  success: (res) => {
    console.info('getExtConfig success', res);
  },
  fail: (err) => {
    console.error('getExtConfig fail', err);
  },
  complete: (res) => {
    console.info('getExtConfig complete', res);
  }
});
```

## has.getExtConfigSync

has.getExtConfigSync(): Object

获取ext配置信息同步方法。

**起始版本：** 1.0.0

**返回值：**

返回Object对象，第三方平台自定义的数据。

**示例：**

```js
let extConfig = has.getExtConfigSync();
console.info(extConfig);
```
