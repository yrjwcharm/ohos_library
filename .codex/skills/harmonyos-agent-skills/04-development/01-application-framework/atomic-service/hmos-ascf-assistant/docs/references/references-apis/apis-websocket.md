# WebSocket

## has.connectSocket

has.connectSocket(Object object): SocketTask

创建新的WebSocket连接。

> **说明：**
>
> - 开发者服务器接口地址，必须是wss协议，并在AGC完成[服务器域名配置](https://developer.huawei.com/consumer/cn/doc/atomic-guides/agc-help-harmonyos-server-domain)。
> - 如果没有全局实例的话，会生成一个对应的全局实例。可以通过 has.sendSocketMessage 进行消息发送。
> - 一个元服务内，最多同时存在5个全局实例。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 属性 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| url | string | 是 | 服务器wss接口地址。 |
| header | object | 否 | HTTP Header，header中不能设置Referer。 |
| protocols | Array&lt;string&gt; | 否 | 子协议组。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**返回值：**

返回[SocketTask](#sockettask)对象，可以通过socketTask实例来操作socket。

**示例：**

```js
has.connectSocket({
  url: 'ws://www.example.com', // 此处仅为样例，请开发者更换为可用接口地址
  header: {
    'content-type': 'application/json'
  },
  protocols: ['protocol1']
});
```

## has.sendSocketMessage

has.sendSocketMessage(Object object)

通过已连接成功的WebSocket连接发送数据。

需要先调用has.connectSocket，并在has.onSocketOpen接收到回调之后才能发送，否则会发送失败。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| data | string \| ArrayBuffer | 是 | 发送的内容。<br/>从1.0.3版本开始，支持发送ArrayBuffer类型数据。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.sendSocketMessage({
  data: 'Hello'
});
```

## has.onSocketOpen

has.onSocketOpen(function callback)

订阅WebSocket连接打开事件回调。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| callback | function | WebSocket连接打开事件的回调函数。 |

**callback返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| header | object | 连接成功的HTTP响应Header。 |

**示例：**

```js
has.onSocketOpen((res) => {
  console.info('onSocketOpen success', res);
})
```

## has.onSocketMessage

has.onSocketMessage(function callback)

订阅WebSocket接收到服务器的消息事件回调。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| callback | function | WebSocket接收到服务器的消息事件的回调函数。 |

**callback返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| data | string \| ArrayBuffer | 服务器返回的消息。<br/>从1.0.3版本开始，支持接收ArrayBuffer类型数据。 |

**示例：**

```js
has.onSocketMessage(res => {
  console.info('socket message', res);
});
```

## has.onSocketError

has.onSocketError(function callback)

订阅WebSocket错误事件回调。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| callback | function | WebSocket错误事件的回调函数。 |

**示例：**

```js
has.onSocketError(err => {
  console.error('socket error', err);
});
```

## has.onSocketClose

has.onSocketClose(function callback)

订阅WebSocket连接关闭事件回调。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| callback | function | WebSocket连接关闭事件的回调函数。 |

**示例：**

```js
has.onSocketClose(() => {
  console.info('onSocketClose success');
});
```

## has.closeSocket

has.closeSocket(Object object)

关闭WebSocket连接。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 属性 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| code | number | 1000（表示正常关闭连接） | 否 | 关闭连接的状态号。 |
| reason | string | - | 否 | 连接被关闭的原因。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.connectSocket({
  url: 'ws://www.example.com', // 此处仅为样例，请开发者更换为可用接口地址
});
has.onSocketOpen(() => {
  has.closeSocket();
});
has.onSocketClose((res) => {
  console.info('onSocketClose success');
});
```

## SocketTask

### SocketTask.send

SocketTask.send(Object object)

通过WebSocket连接发送数据。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| data | string \| ArrayBuffer | 是 | 需要发送的内容。<br/>从1.0.3版本开始，支持发送ArrayBuffer类型数据。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
let socketTask = has.connectSocket({
  url: 'ws://www.example.com', // 此处仅为样例，请开发者更换为可用接口地址
  header: {
    'content-type': 'application/json'
  },
  protocols: ['protocol1'],
  method: 'GET',
  success: () => {
    console.debug('on socketTask connect success callback receive');
  }
});
socketTask.send({
  data: 'this is a send message',
  success: (res) => {
    console.debug('socket send message success', res);
  },
  fail: (err) => {
    console.debug('socket send message error', err);
  },
  complete: (res) => {
    console.debug('socket send message complete', res);
  }
});
```

### SocketTask.close

SocketTask.close(Object object)

关闭WebSocket连接。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| code | number | 1000 | 否 | 关闭连接的状态码，用于标识连接被关闭的原因。<br/>- 1000：正常关闭连接。<br/>- 1006：webSocket发生错误，关闭连接。 |
| reason | string | - | 否 | 可读的字符串，表示连接被关闭的原因。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
let socketTask = has.connectSocket({
  url: 'ws://www.example.com', // 此处仅为样例，请开发者更换为可用接口地址
  header: {
    'content-type': 'application/json'
  },
  protocols: ['protocol1'],
  method: 'GET',
  success: () => {
    console.debug('on socketTask connect success callback receive');
  }
});
socketTask.close();
```

### SocketTask.onOpen

SocketTask.onOpen(function callback)

监听WebSocket连接打开事件。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| callback | function | WebSocket连接打开事件的回调函数。 |

**callback返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| header | object | 连接成功的HTTP响应Header。 |

**示例：**

```js
let socketTask = has.connectSocket({
  url: 'ws://www.example.com', // 此处仅为样例，请开发者更换为可用接口地址
  header: {
    'content-type': 'application/json'
  },
  protocols: ['protocol1'],
  method: 'GET',
  success: () => {
    console.debug('on socketTask connect success callback receive');
  }
});
socketTask.onOpen((res) => {
  console.debug('on socketTask open receive', res);
});
```

### SocketTask.onClose

SocketTask.onClose(function callback)

监听WebSocket连接关闭事件。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| callback | function | WebSocket连接关闭事件的回调函数。 |

**callback返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| code | number | 关闭连接的状态码，用于标识连接被关闭的原因。 |
| reason | string | 一个可读的字符串，表示连接被关闭的原因。 |

**示例：**

```js
let socketTask = has.connectSocket({
  url: 'ws://www.example.com', // 此处仅为样例，请开发者更换为可用接口地址
  header: {
    'content-type': 'application/json'
  },
  protocols: ['protocol1'],
  method: 'GET',
  success: () => {
    console.debug('on socketTask connect success callback receive');
  }
});
socketTask.onClose((res) => {
  console.debug('on socketTask close receive', res);
});
```

### SocketTask.onError

SocketTask.onError(function callback)

监听 WebSocket 错误事件。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| callback | function | WebSocket错误事件的回调函数。 |

**callback返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| errMsg | string | 错误信息。 |

**示例：**

```js
let socketTask = has.connectSocket({
  url: 'ws://www.example.com', // 此处仅为样例，请开发者更换为可用接口地址
  header: {
    'content-type': 'application/json'
  },
  protocols: ['protocol1'],
  method: 'GET',
  success: () => {
    console.debug('on socketTask connect success callback receive');
  }
});
socketTask.onError((res) => {
  console.error('on socketTask error receive', res);
});
```

### SocketTask.onMessage

SocketTask.onMessage(function callback)

监听WebSocket接收到服务器的消息事件。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| callback | function | WebSocket接收到服务器消息事件的回调函数。 |

**callback返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| data | string \| ArrayBuffer | 服务器返回的消息。<br/>从1.0.3版本开始，支持接收ArrayBuffer类型数据。 |

**示例：**

```js
let socketTask = has.connectSocket({
  url: 'ws://www.example.com', // 此处仅为样例，请开发者更换为可用接口地址
  header: {
    'content-type': 'application/json'
  },
  protocols: ['protocol1'],
  method: 'GET',
  success: () => {
    console.debug('on socketTask connect success callback receive');
  }
});
socketTask.onMessage((res) => {
  console.debug('on socketTask message receive', res);
});
```
