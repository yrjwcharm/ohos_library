# 加密

## has.getRandomValues

has.getRandomValues(Object object)

获取密码学安全随机数。

**起始版本**：1.0.12

**参数**：

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| length | number | 是 | 整数，生成随机数的字节数，最大1048576。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| randomValues | ArrayBuffer | 随机数内容，长度为传入的字节数。 |

**示例：**

```js
has.getRandomValues({
  length: 6, // 生成6个字节长度的随机数
  success: (res) => {
    const randomValues = has.arrayBufferToBase64(res.randomValues); // 转换为base64字符串后打印
    console.info('getRandomValues success', randomValues);
  },
  fail: (err) => {
    console.error('getRandomValues fail', err);
  },
  complete: (res) => {
    console.info('getRandomValues complete', res);
  }
});
```
