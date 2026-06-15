# 请求

## has.request

has.request(Object object): RequestTask

发起 HTTPS 网络请求。

从1.0.4版本开始，调用返回[RequestTask](#requesttask)。

> **说明：**
>
> 开发者服务器接口地址，必须是https协议，并在AGC完成[服务器域名配置](https://developer.huawei.com/consumer/cn/doc/atomic-guides/agc-help-harmonyos-server-domain)。

**起始版本：** 1.0.0

**需要权限：** 在module.json5中声明**ohos.permission.INTERNET**。

**注意事项**：在调用此接口前，需要先完成[配置服务器域名](https://developer.huawei.com/consumer/cn/doc/atomic-guides/agc-help-harmonyos-server-domain)。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| url | string | - | 是 | 开发者服务器接口地址。 |
| data | string/object/ArrayBuffer | - | 否 | 请求的参数。 |
| header | Object | - | 否 | 设置请求的 header，header 中不能设置Referer。<br/>content-type默认为application/json。 |
| timeout | number | - | 否 | 超时时间，单位为毫秒。默认值为60000。 |
| method | string | GET | 否 | HTTP请求方法。 |
| dataType | string | json | 否 | 返回的数据格式。 |
| responseType | string | text | 否 | 响应的数据类型。 |
| enableHttp2 | boolean | false | 否 | 开启http2。 |
| enableProfile | boolean | true | 否 | 是否开启profile，默认开启。开启后可在接口回调的res.profile中查看性能调试信息。 |
| enableCache | boolean | false | 否 | 开启Http缓存。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**method的合法值：**

| 值 | 描述 |
| -------- | -------- |
| OPTIONS | HTTP 请求 OPTIONS。 |
| GET | HTTP 请求 GET。 |
| HEAD | HTTP 请求 HEAD。 |
| POST | HTTP 请求 POST。 |
| PUT | HTTP 请求 PUT。 |
| DELETE | HTTP 请求 DELETE。 |
| TRACE | HTTP 请求 TRACE。 |
| CONNECT | HTTP 请求 CONNECT。 |

**responseType的合法值：**

| 值 | 描述 |
| -------- | -------- |
| text | 响应的数据为文本。 |
| arraybuffer | 响应的数据为 ArrayBuffer。 |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| data | string/object/arraybuffer | 服务器返回的数据。 |
| statusCode | number | 服务器返回的HTTP状态码。 |
| header | object | 服务器返回的HTTP Response Header。 |
| cookies | Array&lt;string&gt; | 开发者服务器返回的cookies，格式为字符串数组。 |
| profile | Object | 网络请求过程中一些调试信息。 |

**返回值：**

返回网络请求对象[RequestTask](#requesttask)。

**示例：**

```js
has.request({
  url: 'https://www.example.com', // 此处仅为样例，请开发者更换为可用接口地址
  data: {
    x: '',
    y: ''
  },
  header: {
    'content-type': 'application/json'
  },
  success: (res) => {
    console.info(res.data);
  }
});
```

## RequestTask

网络请求任务对象。

**起始版本：** 1.0.4

### RequestTask.abort

RequestTask.abort()

中断请求任务。

**起始版本：** 1.0.4

**示例：**

```js
const requestTask = has.request({
  url: 'https://www.example.com', // 此处仅为样例，请开发者更换为可用接口地址
  data: {
    x: '',
    y: ''
  },
  header: {
    'content-type': 'application/json'
  },
  success: (res) => {
    console.info(res.data);
  }
})
requestTask.abort(); // 中断网络请求
```

### RequestTask.onHeadersReceived

RequestTask.onHeadersReceived(function callback)

监听HTTP Response Header事件，会比请求完成事件更早。

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
const requestTask = has.request({
  url: 'https://www.example.com', // 此处仅为样例，请开发者更换为可用接口地址
  data: {
    x: '',
    y: ''
  },
  header: {
    'content-type': 'application/json'
  },
  success: (res) => {
    console.info(res.data);
  }
});
const callback = (res) => {
  console.info('Request onHeadersReceived', res);
};
requestTask.onHeadersReceived(callback);
```

### RequestTask.offHeadersReceived

RequestTask.offHeadersReceived(function callback)

移除HTTP Response Header事件的监听函数, 没传则移除所有监听。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | onHeadersReceived传入的回调函数。不传此参数则移除所有回调函数。 |

**示例：**

```js
const requestTask = has.request({
  url: 'https://www.example.com', // 此处仅为样例，请开发者更换为可用接口地址
  data: {
    x: '',
    y: ''
  },
  header: {
    'content-type': 'application/json'
  },
  success: (res) => {
    console.info(res.data);
  }
});
const callback = (res) => {
  console.info('Request onHeadersReceived', res.header);
};
requestTask.onHeadersReceived(callback);
requestTask.offHeadersReceived(callback);
```
