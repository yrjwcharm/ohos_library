# 格式转换

## has.base64ToArrayBuffer

has.base64ToArrayBuffer(string base64Str): ArrayBuffer

将 Base64 字符串转成 ArrayBuffer 对象。

**起始版本：** 1.0.12

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| base64Str | string | 是 | 要转换成ArrayBuffer对象的Base64字符串 。 |

**返回值：**

| 返回值 | 类型 | 描述 |
| -------- | -------- | -------- |
| arrayBuffer | ArrayBuffer | Base64字符串转换成的ArrayBuffer对象。 |

**示例：**

```js
const base64Str = 'CxYh';
const arrayBuffer = has.base64ToArrayBuffer(base64Str);
```

## has.arrayBufferToBase64

has.arrayBufferToBase64(ArrayBuffer arrayBuffer): string

将 ArrayBuffer 对象转成 Base64 字符串。

**起始版本：** 1.0.12

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| arrayBuffer | ArrayBuffer | 是 | 要转换成Base64字符串的ArrayBuffer对象。 |

**返回值：**

| 返回值 | 类型 | 描述 |
| -------- | -------- | -------- |
| base64Str | string | ArrayBuffer对象转换成的Base64字符串。 |

**示例：**

```js
const arrayBuffer = new Uint8Array([11, 22, 33]);
const base64 = has.arrayBufferToBase64(arrayBuffer.buffer);
```
