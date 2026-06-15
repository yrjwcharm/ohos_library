---
name: kits_network
description: "HarmonyOS NetworkKit 网络能力集使用规范。包含 HTTP 请求、WebSocket、Socket 连接、网络状态检测、VPN 等网络相关能力。Use when: (1) 发送 HTTP 请求，(2) 实现 WebSocket 通信，(3) 检测网络状态，(4) 处理网络连接。Triggers: HTTP、fetch、axios、网络请求、WebSocket、Socket、网络状态、连接、VPN、@ohos.net.http。"
user-invocable: false
---

# NetworkKit 网络能力集 (kits_network)

本 skill 覆盖 HarmonyOS **NetworkKit** 网络能力集的使用规范。

## 能力列表

| 模块 | 导入方式 | 用途 |
|------|----------|------|
| http | @ohos.net.http | HTTP/HTTPS 请求 |
| webSocket | @ohos.net.webSocket | WebSocket 通信 |
| socket | @ohos.net.socket | TCP/UDP Socket |
| connection | @ohos.net.connection | 网络连接管理 |
| http (legacy) | @system.fetch | 简易 HTTP 请求 |

## 快速索引

### HTTP 请求

```typescript
import http from '@ohos.net.http';

// 创建 HTTP 请求
let httpRequest = http.createHttp();

// GET 请求
httpRequest.request('https://api.example.com/data', {
  method: http.RequestMethod.GET,
  header: {
    'Content-Type': 'application/json'
  }
}, (err, data) => {
  if (!err) {
    console.log('Response: ' + data.result);
  }
  httpRequest.destroy();  // 销毁请求
});

// POST 请求
httpRequest.request('https://api.example.com/post', {
  method: http.RequestMethod.POST,
  header: {
    'Content-Type': 'application/json'
  },
  extraData: {
    key: 'value'
  }
}, (err, data) => {
  // 处理响应
});
```

### @system.fetch（简易方式）

```typescript
import Fetch from '@system.fetch';

Fetch.fetch({
  url: 'https://api.example.com/data',
  method: 'GET',
  success: (response: FetchResponse) => {
    console.log('Success: ' + response.data);
  },
  fail: (error) => {
    console.log('Failed: ' + error);
  }
});
```

### WebSocket

```typescript
import webSocket from '@ohos.net.webSocket';

let ws = webSocket.createWebSocket();

// 连接
ws.connect('wss://example.com/ws', (err, value) => {
  if (!err) {
    console.log('Connected');
  }
});

// 发送消息
ws.send('Hello', (err) => {
  // 发送回调
});

// 接收消息
ws.on('message', (err, value) => {
  console.log('Received: ' + value);
});

// 关闭连接
ws.close();
```

### 网络状态检测

```typescript
import connection from '@ohos.net.connection';

// 获取网络状态
let netHandle = connection.getDefaultNet();

// 检查网络能力
connection.getNetCapabilities(netHandle).then((capabilities) => {
  console.log('Network capabilities: ' + JSON.stringify(capabilities));
});

// 监听网络变化
connection.on('netAvailable', (data) => {
  console.log('Network available: ' + JSON.stringify(data));
});

connection.on('netLost', (data) => {
  console.log('Network lost');
});
```

## HTTP 请求详解

### HttpRequestOptions

```typescript
interface HttpRequestOptions {
  method?: http.RequestMethod;      // 请求方法
  header?: Object;                  // 请求头
  extraData?: string | Object;      // 请求体
  expectDataType?: http.HttpDataType; // 响应数据类型
  connectTimeout?: number;          // 连接超时
  readTimeout?: number;             // 读取超时
}
```

**RequestMethod 枚举**：

| 值 | 说明 |
|----|------|
| GET | GET 请求 |
| POST | POST 请求 |
| PUT | PUT 请求 |
| DELETE | DELETE 请求 |
| HEAD | HEAD 请求 |
| OPTIONS | OPTIONS 请求 |
| TRACE | TRACE 请求 |
| CONNECT | CONNECT 请求 |

### HttpResponse

```typescript
interface HttpResponse {
  result: string | Object | ArrayBuffer;  // 响应数据
  responseCode: number;                   // HTTP 状态码
  header: Object;                         // 响应头
  cookies: string;                        // Cookies
}
```

## 权限配置

在 `module.json5` 中声明网络权限：

```json
{
  "module": {
    "requestPermissions": [
      {
        "name": "ohos.permission.INTERNET"
      }
    ]
  }
}
```

## 最佳实践

1. **封装 HTTP 工具类**：
```typescript
class HttpClient {
  private static instance: HttpClient;

  static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance;
  }

  async get<T>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
      let httpRequest = http.createHttp();
      httpRequest.request(url, {
        method: http.RequestMethod.GET,
        expectDataType: http.HttpDataType.OBJECT
      }, (err, data) => {
        httpRequest.destroy();
        if (err) {
          reject(err);
        } else {
          resolve(data.result as T);
        }
      });
    });
  }
}
```

2. **错误处理**：
```typescript
httpRequest.request(url, options, (err, data) => {
  httpRequest.destroy();  // 确保销毁请求

  if (err) {
    // 处理网络错误
    console.error('Network error: ' + err.message);
    return;
  }

  if (data.responseCode !== 200) {
    // 处理 HTTP 错误
    console.error('HTTP error: ' + data.responseCode);
    return;
  }

  // 处理成功响应
});
```

3. **设置超时**：
```typescript
httpRequest.request(url, {
  connectTimeout: 60000,  // 60秒连接超时
  readTimeout: 60000      // 60秒读取超时
});
```

## 注意事项

1. 网络请求需要在主线程或 TaskPool 中执行
2. 使用完毕后务必调用 `destroy()` 销毁请求对象
3. 注意处理网络异常和超时情况
4. HTTPS 请求需要正确的证书配置