# RCP API 参考手册

## 概述

RCP 模块提供 HTTP/HTTPS 网络请求能力，支持同步和异步请求、会话管理、缓存机制、代理配置、SSL/TLS 安全传输等功能。

**SysCap**: `SystemCapability.Collaboration.RemoteCommunication`  
**Kit**: `RemoteCommunicationKit`  
**源文件**: `@hms.collaboration.rcp.d.ts`

## Session 类

### Session.fetch(request)

执行 HTTP 请求。

**参数**:
- `request: Request` - HTTP 请求对象

**返回值**: `Promise<Response>` - 返回响应对象

**权限要求**: `ohos.permission.INTERNET`

**错误码**:
- `1007900401` - 参数错误
- `1007900990` - 内存不足
- `1007900992` - 请求已取消
- `1007900993` - 会话已关闭或无效
- `1007900994` - 会话数量已达上限
- `1007900999` - 内部错误

**源码路径**:
- 声明: `@hms.collaboration.rcp.d.ts`
- NAPI: `frameworks/js/napi/rcp/src/collaboration_rcp.cpp:309`
- 实现: `frameworks/native/rcp/src/session.cpp`

### Session.cancel(request?)

取消会话中的请求。

**参数**:
- `request?: Request` - 可选，指定要取消的请求。不指定则取消所有请求

**返回值**: `void`

**错误码**:
- `1007900993` - 会话已关闭或无效

**源码路径**:
- NAPI: `frameworks/js/napi/rcp/src/collaboration_rcp.cpp:544`
- 实现: `frameworks/native/rcp/src/session.cpp`

### Session.close()

关闭会话，释放资源。

**参数**: 无

**返回值**: `void`

**错误码**:
- `1007900993` - 会话已关闭

**源码路径**:
- NAPI: `frameworks/js/napi/rcp/src/collaboration_rcp.cpp:573`
- 实现: `frameworks/native/rcp/src/session.cpp`

## CookieRepository 类

### CookieRepository.create(identifier?)

创建 Cookie 仓库。

**参数**:
- `identifier?: string` - 可选，Cookie 仓库标识符。默认为 'default'

**返回值**: `CookieRepository` - Cookie 仓库对象

**错误码**:
- `1007900401` - 标识符错误

**源码路径**:
- NAPI: `frameworks/js/napi/rcp/src/collaboration_rcp.cpp`
- 实现: `frameworks/native/rcp/src/session.cpp`

### CookieRepository.setCookies(cookies)

存储 Cookie。

**参数**:
- `cookies: ResponseCookie | ResponseCookie[]` - Cookie 或 Cookie 数组

**返回值**: `Promise<void>`

**错误码**:
- `1007900401` - 参数错误（domain 或 expires 错误）
- `1007900999` - 内部错误

**源码路径**:
- NAPI: `frameworks/js/napi/rcp/src/collaboration_rcp.cpp:493`
- 实现: `frameworks/native/rcp/src/session.cpp`

### CookieRepository.getAllCookies()

获取所有 Cookie。

**参数**: 无

**返回值**: `Promise<ResponseCookie[]>` - 所有 Cookie 数组

**错误码**:
- `1007900999` - 内部错误

**源码路径**:
- NAPI: `frameworks/js/napi/rcp/src/collaboration_rcp.cpp:506`
- 实现: `frameworks/native/rcp/src/session.cpp`

### CookieRepository.getCookiesByUrl(url)

获取指定 URL 的 Cookie。

**参数**:
- `url: URL` - 指定的 URL

**返回值**: `Promise<ResponseCookie[]>` - 匹配的 Cookie 数组

**错误码**:
- `1007900999` - 内部错误

**源码路径**:
- NAPI: `frameworks/js/napi/rcp/src/collaboration_rcp.cpp`
- 实现: `frameworks/native/rcp/src/session.cpp`

### CookieRepository.deleteCookies(cookies?)

删除 Cookie。

**参数**:
- `cookies?: ResponseCookie | ResponseCookie[]` - 可选，用于标识的 Cookie。不指定则删除所有

**返回值**: `Promise<void>`

**错误码**:
- `1007900401` - 参数错误
- `1007900999` - 内部错误

**源码路径**:
- NAPI: `frameworks/js/napi/rcp/src/collaboration_rcp.cpp`
- 实现: `frameworks/native/rcp/src/session.cpp`

### CookieRepository.deleteCookiesByUrl(url)

删除指定 URL 的 Cookie。

**参数**:
- `url: URL` - 用于标识的 URL

**返回值**: `Promise<void>`

**错误码**:
- `1007900999` - 内部错误

**源码路径**:
- NAPI: `frameworks/js/napi/rcp/src/collaboration_rcp.cpp`
- 实现: `frameworks/native/rcp/src/session.cpp`

### CookieRepository.identifier

获取 Cookie 仓库标识符。

**返回值**: `string` - 标识符字符串

**源码路径**:
- NAPI: `frameworks/js/napi/rcp/src/collaboration_rcp.cpp`
- 实现: `frameworks/native/rcp/src/session.cpp`

## Request 类

### Request.cancel()

取消请求。

**参数**: 无

**返回值**: `void`

**错误码**:
- `1007900992` - 请求已取消

**源码路径**:
- NAPI: `frameworks/js/napi/rcp/src/collaboration_rcp.cpp:345`
- 实现: `frameworks/native/rcp/src/request.cpp`

## NetworkInputQueue 类

### NetworkInputQueue.write(buffer)

写入数据到输入队列。

**参数**:
- `buffer: string | ArrayBuffer` - 要写入的数据

**返回值**: `void`

**错误码**:
- `1007900990` - 内存不足

**源码路径**:
- NAPI: `frameworks/js/napi/rcp/src/napi_data_recorder.cpp`
- 实现: `frameworks/native/rcp/src/request_content.cpp`

### NetworkInputQueue.close()

结束传输。

**返回值**: `void`

**源码路径**:
- NAPI: `frameworks/js/napi/rcp/src/napi_data_recorder.cpp`

### NetworkInputQueue.getFreeSpace()

返回可用空间。

**返回值**: `long` - 可写入的字节数

**源码路径**:
- NAPI: `frameworks/js/napi/rcp/src/napi_data_recorder.cpp`

## NetworkOutputQueue 类

### NetworkOutputQueue.read(maxBytesToRead)

读取接收到的字节。

**参数**:
- `maxBytesToRead: long` - 最大读取字节数

**返回值**: `ArrayBuffer` - 读取的数据

**错误码**:
- `1007900990` - 内存不足

**源码路径**:
- NAPI: `frameworks/js/napi/rcp/src/napi_data_requester.cpp`
- 实现: `frameworks/native/rcp/src/response.cpp`

### NetworkOutputQueue.readInto(buffer)

读取数据到缓冲区。

**参数**:
- `buffer: ArrayBuffer` - 目标缓冲区

**返回值**: `long` - 已写入的字节数

**错误码**:
- `1007900990` - 内存不足

**源码路径**:
- NAPI: `frameworks/js/napi/rcp/src/napi_data_requester.cpp`

### NetworkOutputQueue.getStoredBytes()

返回队列中的字节数。

**返回值**: `long` - 已从网络接收的字节数

**源码路径**:
- NAPI: `frameworks/js/napi/rcp/src/napi_data_requester.cpp`

## 工具函数

### GenerateRequestId()

生成请求 ID。

**返回值**: `string` - 请求 ID

**源码路径**:
- NAPI: `frameworks/js/napi/rcp/src/collaboration_rcp.cpp:123`
- 实现: `frameworks/native/rcp/src/request.cpp:67`

### GenerateSessionId()

生成会话 ID。

**返回值**: `string` - 会话 ID

**源码路径**:
- NAPI: `frameworks/js/napi/rcp/src/collaboration_rcp.cpp:129`
- 实现: `frameworks/native/rcp/src/session.cpp:26`

### BindToNativeSession(configuration)

绑定到原生会话。

**参数**:
- `configuration: SessionConfiguration` - 会话配置

**返回值**: `Session` - 会话对象

**源码路径**:
- NAPI: `frameworks/js/napi/rcp/src/collaboration_rcp.cpp:135`
- 实现: `frameworks/native/rcp/src/session.cpp:50`

### HasPermission()

检查网络权限。

**返回值**: `boolean` - 是否有网络权限

**源码路径**:
- NAPI: `frameworks/js/napi/rcp/src/collaboration_rcp.cpp:88`
- 实现: `utils/src/rcp_native_common_utils.cpp`

### GetError(error)

获取错误对象。

**参数**:
- `error: number` - 错误码

**返回值**: `BusinessError` - 错误对象

**源码路径**:
- NAPI: `frameworks/js/napi/rcp/src/collaboration_rcp.cpp:655`
- 实现: `utils/src/rcp_error_utils.cpp:47`

### BoundaryLengthValid()

验证边界长度。

**返回值**: `long` - 最大边界长度

**源码路径**:
- NAPI: `frameworks/js/napi/rcp/src/collaboration_rcp.cpp:360`
- 实现: `frameworks/native/rcp/src/multipart_form.cpp`

### GetTlsRangeVersion(version)

获取 TLS 版本范围。

**参数**:
- `version: string` - TLS 版本字符串

**返回值**: `TlsVersion` - TLS 版本枚举

**源码路径**:
- NAPI: `frameworks/js/napi/rcp/src/collaboration_rcp.cpp:378`
- 实现: `frameworks/js/napi/rcp/src/napi_parser.cpp`

### GetNativeNoNetError()

获取无网络错误。

**返回值**: `number` - 无网络错误码

**源码路径**:
- NAPI: `frameworks/js/napi/rcp/src/collaboration_rcp.cpp:396`
- 实现: `utils/src/network_err_builder.cpp`

### ConvertSendable(response)

转换为 Sendable 对象。

**参数**:
- `response: Response` - 响应对象

**返回值**: `Sendable` - Sendable 对象

**源码路径**:
- NAPI: `frameworks/js/napi/rcp/src/collaboration_rcp.cpp:416`
- 实现: `frameworks/js/napi/rcp/src/sendable_parser.cpp`

### ParserAuthChallengeInfo(info)

解析挑战信息。

**参数**:
- `info: string` - 信息字符串

**返回值**: `AuthenticationChallengeInfo[]` - 挑战信息数组

**源码路径**:
- NAPI: `frameworks/js/napi/rcp/src/collaboration_rcp.cpp:584`
- 实现: `utils/src/rcp_native_common_utils.cpp`

### CreateParentDirectory(path)

创建父目录。

**参数**:
- `path: string` - 目录路径

**返回值**: `void`

**源码路径**:
- NAPI: `frameworks/js/napi/rcp/src/collaboration_rcp.cpp:603`
- 实现: `utils/src/rcp_native_common_utils.cpp`

### PathExists(path)

检查路径是否存在。

**参数**:
- `path: string` - 路径

**返回值**: `boolean` - 路径是否存在

**源码路径**:
- NAPI: `frameworks/js/napi/rcp/src/collaboration_rcp.cpp:621`
- 实现: `utils/src/rcp_native_common_utils.cpp`

### PathResolve(path)

解析路径。

**参数**:
- `path: string` - 路径

**返回值**: `string` - 解析后的路径

**源码路径**:
- NAPI: `frameworks/js/napi/rcp/src/collaboration_rcp.cpp:638`
- 实现: `utils/src/rcp_native_common_utils.cpp`

## C API 接口

### HMS_Rcp_CreateSession

创建会话。

**参数**:
- `config: const Rcp_SessionConfig*` - 会话配置

**返回值**: `Rcp_Session*` - 会话句柄

**错误码**:
- `1007900401` - 参数错误
- `1007900990` - 内存不足

**源码路径**:
- 声明: `interfaces/kits/c/rcp.h`
- 实现: `frameworks/c/rcp/rcp_session.c`

### HMS_Rcp_DestroySession

销毁会话。

**参数**:
- `session: Rcp_Session*` - 会话句柄

**返回值**: `int` - 错误码

**源码路径**:
- 声明: `interfaces/kits/c/rcp.h`
- 实现: `frameworks/c/rcp/rcp_session.c`

### HMS_Rcp_CreateRequest

创建请求。

**参数**:
- `method: const char*` - HTTP 方法
- `url: const char*` - URL

**返回值**: `Rcp_Request*` - 请求句柄

**源码路径**:
- 声明: `interfaces/kits/c/rcp.h`
- 实现: `frameworks/c/rcp/rcp_request.c`

### HMS_Rcp_ExecuteSync

同步执行请求。

**参数**:
- `session: Rcp_Session*` - 会话句柄
- `request: Rcp_Request*` - 请求句柄
- `response: Rcp_Response**` - 响应对象指针

**返回值**: `int` - 错误码

**源码路径**:
- 声明: `interfaces/kits/c/rcp.h`
- 实现: `frameworks/c/rcp/rcp_request.c`

### HMS_Rcp_ExecuteAsync

异步执行请求。

**参数**:
- `session: Rcp_Session*` - 会话句柄
- `request: Rcp_Request*` - 请求句柄
- `callback: Rcp_ResponseCallback` - 回调函数

**返回值**: `int` - 错误码

**源码路径**:
- 声明: `interfaces/kits/c/rcp.h`
- 实现: `frameworks/c/rcp/rcp_request.c`

## 类型定义

### HttpMethod

HTTP 请求方法类型。

```typescript
type HttpMethod = 'GET' | 'POST' | 'HEAD' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | String;
```

### ContentType

HTTP 内容类型。

```typescript
type ContentType = 'application/json' | 'text/plain' | 'multipart/form-data' | 
                  'application/octet-stream' | 'application/x-www-form-urlencoded' | String;
```

### RequestHeaders

HTTP 请求头。

```typescript
type RequestHeaders = Record<string, string | string[] | undefined>;
```

### ResponseHeaders

HTTP 响应头。

```typescript
type ResponseHeaders = Record<string, string | string[] | undefined>;
```

### Timeout

超时配置。

```typescript
interface Timeout {
  connectMs?: long;     // 连接超时，默认 60000ms
  transferMs?: long;    // 传输超时，默认 60000ms
  inactivityMs?: long;  // 非活动超时
}
```

### TransferConfiguration

传输配置。

```typescript
interface TransferConfiguration {
  autoRedirect?: boolean;              // 是否自动重定向，默认 true
  maxAutoRedirects?: long;             // 最大重定向次数，默认 50
  timeout?: Timeout;                   // 超时配置
  assumesHTTP3Capable?: boolean;       // 是否支持 HTTP/3
  pathPreference?: 'auto' | 'cellular'; // 路径偏好
  serviceType?: ServiceType;            // 服务类型
  pausePolicy?: PausePolicy;           // 暂停策略
  tcp?: TcpConfiguration;              // TCP 配置
  connectionReusePolicy?: ConnectionReusePolicy; // 连接复用策略
}
```

### SecurityConfiguration

安全配置。

```typescript
interface SecurityConfiguration {
  remoteValidation?: ValidationCallback;  // 远程验证回调
  certificate?: ClientCertificate;        // 客户端证书
  certificateAuthority?: CertificateAuthority; // CA 证书
  tlsRange?: TlsVersionRange;             // TLS 版本范围
}
```

## 主要源文件

- **API 声明**: `hmscore_sdk_js/api/@hms.collaboration.rcp.d.ts`
- **C API**: `interfaces/kits/c/rcp.h`
- **NAPI 实现**: `frameworks/js/napi/rcp/src/collaboration_rcp.cpp`
- **Session 实现**: `frameworks/native/rcp/src/session.cpp`
- **错误定义**: `interfaces/innerkits/include/rcp/error.h`
