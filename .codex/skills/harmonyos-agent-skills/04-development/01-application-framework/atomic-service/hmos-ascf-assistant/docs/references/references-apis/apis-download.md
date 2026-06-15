# 下载

## has.downloadFile

has.downloadFile(Object object): DownloadTask

下载资源到本地。单次下载允许的最大文件为200MB。

从1.0.4版本开始，调用返回[DownloadTask](#downloadtask)。

> **说明：**
>
> 1. 开发者服务器接口地址，必须是https协议，并在AGC完成[服务器域名配置](https://developer.huawei.com/consumer/cn/doc/atomic-guides/agc-help-harmonyos-server-domain)。
> 
> 2. 请在服务端响应的header中指定合理的Content-Type字段，以保证客户端正确处理文件类型。
> 3. 对于不安全的加密套件，SSL校验失败、下载失败的情况下推荐使用[has.request](apis-request.md#hasrequest)接口。 
> 4. 判断文件类型的方式：
> 
>    若传入filePath，则根据filePath判断；
>
>    若未传入filePath，则从url的最后一个"/"后截取，根据提取的后缀名去判断；
> 
>    若以上两种方式都无法判断文件类型，则根据响应头中的Content-Type字段来判断。

**起始版本：** 1.0.0

**需要权限**：在module.json5中声明**ohos.permission.INTERNET**。

**注意事项**：在调用此接口前，需要先完成[配置服务器域名](https://developer.huawei.com/consumer/cn/doc/atomic-guides/agc-help-harmonyos-server-domain)。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| url | string | 是 | 下载资源的url。 |
| header | object | 否 | HTTP请求的Header。 |
| filePath | string | 否 | 指定文件下载后存储的路径（只支持internal://files/开头的本地用户文件路径）。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| tempFilePath | string | 临时文件路径（本地路径）。没传入filePath指定文件存储路径时会返回，下载后的文件会存储到一个临时文件。 |
| filePath | string | 用户文件路径（本地路径）。传入filePath时会返回，跟传入的filePath一致。 |
| statusCode | number | 开发者服务器返回的HTTP状态码。 |

**返回值：**

返回[DownloadTask](#downloadtask)对象，可用于监听下载/取消下载进度变化的事件。

**示例：**

```js
has.downloadFile({
  url: 'https://www.example.com/xxx.png', // 此处仅为样例，请开发者更换为可用接口地址
  success: (res) => {
    console.info('downloadFile success', res.tempFilePath);
  },
  fail: (err) => {
    console.error('downloadFile fail', err);
  },
  complete: (res) => {
    console.info('downloadFile complete', res);
  }
});
```

## DownloadTask

下载任务对象。

**起始版本：** 1.0.4

### DownloadTask.abort

DownloadTask.abort()

中断下载任务。

**起始版本：** 1.0.4

**示例：**

```js
const downloadTask = has.downloadFile({
  url: 'https://www.example.com/xxx.png', // 此处仅为样例，请开发者更换为可用图片资源地址
  success: (res) => {
    console.info('downloadFile success', res.tempFilePath);
  },
  fail: (err) => {
    console.error('downloadFile fail', err);
  },
  complete: (res) => {
    console.info('downloadFile complete', res);
  }
});
downloadTask.abort();
```

### DownloadTask.onProgressUpdate

DownloadTask.onProgressUpdate(function callback)

监听下载进度变化事件。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 下载进度变化事件的回调函数。 |

**callback返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| progress | number | 下载进度百分比。 |
| totalBytesWritten | number | 已经下载的数据长度，单位Bytes。 |
| totalBytesExpectedToWrite | number | 预期需要下载的数据总长度，单位Bytes。 |

**示例：**

```js
const downloadTask = has.downloadFile({
  url: 'https://www.example.com/xxx.png', // 此处仅为样例，请开发者更换为可用图片资源地址
  success: (res) => {
    console.info('downloadFile success', res.tempFilePath);
  },
  fail: (err) => {
    console.error('downloadFile fail', err);
  },
  complete: (res) => {
    console.info('downloadFile complete', res);
  }
});
const callback = function(res) {
  console.info('onProgressUpdate callback triggered', res);
};
downloadTask.onProgressUpdate(callback);
```

### DownloadTask.offProgressUpdate

DownloadTask.offProgressUpdate(function callback)

取消监听下载进度变化事件。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | [DownloadTask.onProgressUpdate](#downloadtaskonprogressupdate)传入的监听函数。不传此参数则移除所有监听函数。 |

**示例：**

```js
const downloadTask = has.downloadFile({
  url: 'https://www.example.com/xxx.png', // 此处仅为样例，请开发者更换为可用图片资源地址
  success: (res) => {
    console.info('downloadFile success', res.tempFilePath);
  },
  fail: (err) => {
    console.error('downloadFile fail', err);
  },
  complete: (res) => {
    console.info('downloadFile complete', res);
  }
});
const callback = function(res) {
  console.info('onProgressUpdate callback triggered', res);
}
downloadTask.onProgressUpdate(callback);
downloadTask.offProgressUpdate(callback);
```

### DownloadTask.onHeadersReceived

DownloadTask.onHeadersReceived(function callback)

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
const downloadTask = has.downloadFile({
  url: 'https://www.example.com/xxx.png', // 此处仅为样例，请开发者更换为可用图片资源地址
  success: (res) => {
    console.info('downloadFile success', res.tempFilePath);
  },
  fail: (err) => {
    console.error('downloadFile fail', err);
  },
  complete: (res) => {
    console.info('downloadFile complete', res);
  }
});
const callback = function(res) {
  console.info('onHeadersReceived callback triggered', res);
};
downloadTask.onHeadersReceived(callback);
```

### DownloadTask.offHeadersReceived

DownloadTask.offHeadersReceived(function callback)

取消监听HTTP Response Header事件。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | [DownloadTask.onHeadersReceived](#downloadtaskonheadersreceived)传入的监听函数。不传此参数则移除所有监听函数。 |

**示例：**

```js
const downloadTask = has.downloadFile({
  url: 'https://www.example.com/xxx.png', // 此处仅为样例，请开发者更换为可用图片资源地址
success: (res) => {
    console.info('downloadFile success', res.tempFilePath);
  },
  fail: (err) => {
    console.error('downloadFile fail', err);
  },
  complete: (res) => {
    console.info('downloadFile complete', res);
  }
});
const callback = function(res) {
  console.info('onHeadersReceived callback triggered', res);
};
downloadTask.onHeadersReceived(callback);
downloadTask.offHeadersReceived(callback);
```
