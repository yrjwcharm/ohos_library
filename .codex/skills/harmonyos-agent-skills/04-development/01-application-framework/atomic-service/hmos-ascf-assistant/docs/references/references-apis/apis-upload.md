# 上传

## has.uploadFile

has.uploadFile(Object object): UploadTask

将本地资源上传到服务器。

从1.0.4版本开始，调用返回[UploadTask](#uploadtask)。

> **说明：**
>
> 开发者服务器接口地址，必须是https协议，并在AGC完成[服务器域名配置](https://developer.huawei.com/consumer/cn/doc/atomic-guides/agc-help-harmonyos-server-domain)。

**起始版本：** 1.0.0

**需要权限**：在module.json5中声明**ohos.permission.INTERNET**。

**注意事项**：在调用此接口前，需要先完成[配置服务器域名](https://developer.huawei.com/consumer/cn/doc/atomic-guides/agc-help-harmonyos-server-domain)。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| url | string | 是 | 开发者服务器地址。 |
| filePath | string | 是 | 要上传文件资源的路径（本地路径）。 |
| name | string | 是 | 文件对应的key，开发者在服务端可以通过这个key获取文件的二进制内容。 |
| header | Object | 否 | HTTP请求Header，Header中不能设置Referer。 |
| formData | Object | 否 | HTTP请求中其他额外的form data。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| data | string | 开发者服务器返回的数据。 |
| statusCode | number | 开发者服务器返回的HTTP状态码。 |

**返回值：**

返回[UploadTask](#uploadtask)对象，可用于监听上传/取消上传进度变化的事件。

**示例：**

```js
has.uploadFile({
  url: 'https://www.example.com', // 此处仅为样例，请开发者更换为可用接口地址
  filePath: 'internal://tmp/xxx.txt',
  name: 'data',
  success: (res) => {
    console.info('uploadFile success', res);
  },
  fail: (err) => {
    console.error('uploadFile fail', err);
  },
  complete: (res) => {
    console.info('uploadFile complete', res);
  }
});
```

## UploadTask

上传任务对象。

**起始版本：** 1.0.4

### UploadTask.abort

UploadTask.abort()

中断上传任务。

**起始版本：** 1.0.4

**示例：**

```js
const uploadTask = has.uploadFile({
  url: 'https://www.example.com', // 此处仅为样例，请开发者更换为可用接口地址
  filePath: 'internal://tmp/xxx.txt',
  name: 'data',
  success: (res) => {
    console.info('uploadFile success', res);
  },
  fail: (err) => {
    console.error('uploadFile fail', err);
  },
  complete: (res) => {
    console.info('uploadFile complete', res);
  }
});

uploadTask.abort();
```

### UploadTask.onProgressUpdate

UploadTask.onProgressUpdate(function callback)

监听上传进度变化事件。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 上传进度变化事件的回调函数。 |

**callback返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| progress | number | 上传进度百分比。 |
| totalBytesSent | number | 已经上传的数据长度，单位Bytes。 |
| totalBytesExpectedToSend | number | 预期需要上传的数据总长度，单位Bytes。 |

**示例：**

```js
const uploadTask = has.uploadFile({
  url: 'https://www.example.com', // 此处仅为样例，请开发者更换为可用接口地址
  filePath: 'internal://tmp/xxx.txt',
  name: 'data',
  success: (res) => {
    console.info('uploadFile success', res);
  },
  fail: (err) => {
    console.error('uploadFile fail', err);
  },
  complete: (res) => {
    console.info('uploadFile complete', res);
  }
});
const callback = (res) => {
  console.info('onProgressUpdate', res);
};
uploadTask.onProgressUpdate(callback);
```

### UploadTask.offProgressUpdate

UploadTask.offProgressUpdate(function callback)

取消监听上传进度变化事件。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | onProgressUpdate传入的监听函数。不传此参数则移除所有监听函数。 |

**示例：**

```js
const uploadTask = has.uploadFile({
  url: 'https://www.example.com', // 此处仅为样例，请开发者更换为可用接口地址
  filePath: 'internal://tmp/xxx.txt',
  name: 'data',
  success: (res) => {
    console.info('uploadFile success', res);
  },
  fail: (err) => {
    console.error('uploadFile fail', err);
  },
  complete: (res) => {
    console.info('uploadFile complete', res);
  }
});
const callback = (res) => {
  console.info('onProgressUpdate', res);
};
uploadTask.onProgressUpdate(callback);
uploadTask.offProgressUpdate(callback);
```

### UploadTask.onHeadersReceived

UploadTask.onHeadersReceived(function callback)

监听HTTP Response Header事件。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | HTTP Response Header事件的回调函数。 |

**callback返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| header | object | 开发者服务器返回的HTTP Response Header。 |

**示例：**

```js
const uploadTask = has.uploadFile({
  url: 'https://www.example.com', // 此处仅为样例，请开发者更换为可用接口地址
  filePath: 'internal://tmp/xxx.txt',
  name: 'data',
  success: (res) => {
    console.info('uploadFile success', res);
  },
  fail: (err) => {
    console.error('uploadFile fail', err);
  }
});
const callback = (res) => {
  console.info('onHeadersReceived', res);
};
uploadTask.onHeadersReceived(callback);
```

### UploadTask.offHeadersReceived

UploadTask.offHeadersReceived(function callback)

取消监听HTTP Response Header事件。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | onHeadersReceived传入的监听函数。不传此参数则移除所有监听函数。 |

**示例：**

```js
const uploadTask = has.uploadFile({
  url: 'https://www.example.com', // 此处仅为样例，请开发者更换为可用接口地址
  filePath: 'internal://tmp/xxx.txt',
  name: 'data',
  success: (res) => {
    console.info('uploadFile success', res);
  },
  fail: (err) => {
    console.error('uploadFile fail', err);
  }
});
const callback = (res) => {
  console.info('onHeadersReceived', res);
};
uploadTask.onHeadersReceived(callback);
uploadTask.offHeadersReceived(callback);
```
