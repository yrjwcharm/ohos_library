# 用户信息

## has.getUserProfile

has.getUserProfile(Object object)

获取用户信息。返回userInfo。

**起始版本：** 1.0.17

**依赖关系：** HarmonyOS SDK版本≥6.0.0(20) 且ROM版本 ≥ 6.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数 |
| fail | function | 否 | 接口调用失败的回调函数 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行） |

**success返回值**：

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| userInfo | [UserInfo](#userinfo) | 用户信息对象。 |

**示例：**

```js
has.getUserProfile({
  success: (res) => {
    console.info('getUserProfile success', res);
  },
  fail: (err) => {
    console.error('getUserProfile fail', err);
  },
  complete: (res) => {
    console.info('getUserProfile complete', res);
  }
});
```

## UserInfo

用户信息对象。

**起始版本：** 1.0.17

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| nickName | string | 用户昵称。 |
| avatarUrl | string | 用户头像图片的URL，若用户没有头像返回参数为undefined。 |
