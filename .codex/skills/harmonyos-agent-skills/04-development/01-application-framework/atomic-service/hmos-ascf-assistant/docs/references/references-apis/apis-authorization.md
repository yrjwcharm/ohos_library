# 授权

## has.authorize

has.authorize(Object object)

提前向用户发起授权请求。调用后会立刻弹窗询问用户是否同意授权元服务使用某项功能或获取用户的某些数据，但不会实际调用对应接口。如果用户之前已经同意授权，则不会出现弹窗，直接返回成功。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| scope | string | 是 | 需要获取权限的 scope，详见“[scope 列表](../../guides/develop-authorization.md#scope-列表)”。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

> **注意：**
> 
> 在申请权限时，需要在项目的配置文件中，逐个声明需要的权限，否则将无法获取授权。配置方式请参见[声明权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/declare-permissions)。

**示例：**

```js
has.authorize({
  scope: 'scope.userLocation',
  success: () => {
    console.info('authorize success');
  },
  fail: (err) => {
    console.error('authorize fail', err);
  },
  complete: (res) => {
    console.info('authorize complete', res);
  }
});
```
