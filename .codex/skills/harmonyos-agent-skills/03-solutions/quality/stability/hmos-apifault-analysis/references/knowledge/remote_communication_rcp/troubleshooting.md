# RCP 故障排查指南

## 概述

本文档提供 RCP 模块常见错误场景的排查思路和解决方案。

## 错误码总览

### 错误码范围

- **基础值**: 1007900000
- **参数错误**: 1007900401
- **运行时错误**: 1007900985-1007900999

### 通用错误码

| 错误码 | 名称 | 描述 | 源文件 |
|--------|------|------|--------|
| 0 | NoErr | 操作成功 | `interfaces/innerkits/include/rcp/error.h` |
| 201 | PermissionDenied | 权限被拒绝 | `interfaces/innerkits/include/rcp/error.h` |
| 401 | Parameter | 参数错误 | `interfaces/innerkits/include/rcp/error.h` |
| 1007900401 | InvalidParameter | 无效参数 | `interfaces/innerkits/include/rcp/error.h` |
| 1007900027 | RCP_CODE_NO_MEMORY | 内存不足 | `frameworks/c/rcp/rcp_inner_types.h` |
| 1007900990 | OutOfMemory | 内存不足 | `interfaces/innerkits/include/rcp/error.h` |
| 1007900992 | RequestIsCanceled | 请求已取消 | `interfaces/innerkits/include/rcp/error.h` |
| 1007900993 | SessionClosed | 会话已关闭 | `interfaces/innerkits/include/rcp/error.h` |
| 1007900994 | SessionComesMaxSize | 会话数量已达上限 | `interfaces/innerkits/include/rcp/error.h` |
| 1007900991 | InvalidResponse | 响应无效 | `interfaces/innerkits/include/rcp/error.h` |
| 1007900999 | Internal | 内部错误 | `interfaces/innerkits/include/rcp/error.h` |

## 常见错误场景

### 1. 权限错误 (201 - PermissionDenied)

#### 错误描述
应用缺少 INTERNET 权限，导致无法发起网络请求。

#### 触发场景
- 未在 `module.json5` 中声明 `ohos.permission.INTERNET` 权限
- 权限申请被用户拒绝

#### 排查步骤
1. 检查 `module.json5` 文件中是否声明权限：
```json
{
  "requestPermissions": [
    {
      "name": "ohos.permission.INTERNET",
      "reason": "$string:internet_permission_reason",
      "usedScene": {
        "abilities": ["EntryAbility"],
        "when": "always"
      }
    }
  ]
}
```

2. 使用 `HasPermission()` 函数检查权限状态：
```typescript
import rcp from '@hms.collaboration.rcp';

const hasPermission = rcp.HasPermission();
if (!hasPermission) {
  console.error('缺少 INTERNET 权限');
}
```

#### 解决方案
1. 在 `module.json5` 中正确声明权限
2. 引导用户在系统设置中授予权限
3. 使用 `HasPermission()` 进行权限检查

#### 源文件
- 权限检查: `frameworks/js/napi/rcp/src/collaboration_rcp.cpp:88`
- 实现: `utils/src/rcp_native_common_utils.cpp`

### 2. 参数错误 (401 / 1007900401)

#### 错误描述
传入的参数无效或为空。

#### 触发场景
- URL 为空或格式错误
- Request 对象缺少必需字段
- Cookie 标识符格式错误
- 文件路径不存在

#### 排查步骤
1. 验证 URL 格式：
```typescript
import url from '@ohos.url';

try {
  const urlObj = url.URL.parse(urlString);
  if (!urlObj.protocol || !urlObj.hostname) {
    throw new Error('URL 格式错误');
  }
} catch (e) {
  console.error('URL 解析失败:', e);
}
```

2. 检查 Request 对象完整性：
```typescript
if (!request.method || !request.url) {
  throw new Error('Request 对象缺少必需字段');
}
```

3. 检查文件路径：
```typescript
import fs from '@ohos.file.fs';

try {
  fs.accessSync(filePath);
} catch (e) {
  console.error('文件路径不存在:', filePath);
}
```

#### 解决方案
1. 使用 `url.URL.parse()` 验证 URL
2. 确保 Request 对象包含必需字段
3. 使用 `fs.accessSync()` 检查文件路径
4. 使用 `PathExists()` 检查路径是否存在

#### 源文件
- 参数验证: `frameworks/js/napi/rcp/src/napi_parser.cpp`
- 路径检查: `frameworks/js/napi/rcp/src/collaboration_rcp.cpp:621`

### 3. 内存不足 (1007900027 / 1007900990)

#### 错误描述
系统内存不足，无法分配所需内存。

#### 触发场景
- 请求或响应体过大
- 并发请求过多
- 文件下载超过内存限制

#### 排查步骤
1. 检查请求体大小：
```typescript
const MAX_REQUEST_SIZE = 10 * 1024 * 1024; // 10MB

if (request.body && request.body.size > MAX_REQUEST_SIZE) {
  console.error('请求体过大');
}
```

2. 检查并发请求数量：
```typescript
const MAX_CONCURRENT_REQUESTS = 10;

if (activeRequests.length >= MAX_CONCURRENT_REQUESTS) {
  console.error('并发请求数过多');
}
```

3. 使用流式处理大文件：
```typescript
// 使用 NetworkInputQueue 处理大文件上传
const inputQueue = new rcp.NetworkInputQueue(1024 * 1024); // 1MB 缓冲区
```

#### 解决方案
1. 减小请求体大小
2. 限制并发请求数量
3. 使用流式处理大文件
4. 使用文件下载而非内存缓存

#### 源文件
- 内存管理: `frameworks/native/rcp/src/request_content.cpp`
- 缓冲区管理: `frameworks/js/napi/rcp/src/napi_data_recorder.cpp`

### 4. 请求已取消 (1007900992)

#### 错误描述
请求被主动取消。

#### 触发场景
- 调用 `Session.cancel()` 或 `Request.cancel()`
- 会话被关闭
- 超时自动取消

#### 排查步骤
1. 检查是否显式取消：
```typescript
// 检查取消调用
request.cancel();

// 检查会话取消
session.cancel();
```

2. 检查超时配置：
```typescript
const config: rcp.TransferConfiguration = {
  timeout: {
    connectMs: 30000,    // 30s 连接超时
    transferMs: 60000,   // 60s 传输超时
    inactivityMs: 30000  // 30s 非活动超时
  }
};
```

3. 检查会话状态：
```typescript
if (session.closed) {
  console.error('会话已关闭');
}
```

#### 解决方案
1. 避免不必要的取消操作
2. 调整超时配置
3. 在使用前检查会话状态
4. 使用 `onCanceled` 回调处理取消事件

#### 源文件
- 取消实现: `frameworks/native/rcp/src/request.cpp`
- 会话管理: `frameworks/native/rcp/src/session.cpp`

### 5. 会话已关闭 (1007900993)

#### 错误描述
尝试使用已关闭的会话。

#### 触发场景
- 调用 `Session.close()` 后继续使用
- 会话因错误自动关闭
- 会话被系统回收

#### 排查步骤
1. 检查会话状态：
```typescript
// 使用前检查会话状态
if (session.closed) {
  console.error('会话已关闭，请重新创建');
}
```

2. 检查错误处理：
```typescript
try {
  await session.fetch(request);
} catch (e) {
  if (e.code === 1007900993) {
    console.error('会话已关闭，需要重新创建');
    // 重新创建会话
    session = await createSession();
  }
}
```

#### 解决方案
1. 在使用前检查会话状态
2. 捕获错误并重新创建会话
3. 使用会话池管理会话生命周期
4. 避免在错误后继续使用会话

#### 源文件
- 会话关闭: `frameworks/native/rcp/src/session.cpp:128`
- 状态检查: `frameworks/js/napi/rcp/src/napi_manager.cpp`

### 6. 会话数量已达上限 (1007900994)

#### 错误描述
创建的会话数量超过系统限制。

#### 触发场景
- 创建过多会话未关闭
- 会话泄漏
- 系统资源限制

#### 排查步骤
1. 检查会话数量：
```typescript
const MAX_SESSIONS = 100;

if (activeSessions.length >= MAX_SESSIONS) {
  console.error('会话数量已达上限');
}
```

2. 检查会话泄漏：
```typescript
// 确保会话正确关闭
session.close();
```

3. 使用会话复用：
```typescript
// 复用默认会话
const defaultSession = rcp.getDefaultSession();
```

#### 解决方案
1. 及时关闭不再使用的会话
2. 使用会话复用机制
3. 限制并发会话数量
4. 使用会话池管理

#### 源文件
- 会话管理: `frameworks/native/rcp/src/session.cpp`
- 默认会话: `frameworks/native/rcp/src/session.cpp:142`

### 7. 响应无效 (1007900991)

#### 错误描述
服务器返回的响应无效或无法解析。

#### 触发场景
- 响应头格式错误
- 响应体损坏
- 编码不匹配

#### 排查步骤
1. 检查响应状态码：
```typescript
const response = await session.fetch(request);
if (response.status < 200 || response.status >= 300) {
  console.error('HTTP 状态码异常:', response.status);
}
```

2. 检查响应头：
```typescript
console.log('响应头:', response.headers);
```

3. 检查响应体：
```typescript
const body = await response.body.arrayBuffer();
console.log('响应体大小:', body.byteLength);
```

#### 解决方案
1. 验证服务器响应格式
2. 检查 Content-Type 是否匹配
3. 使用适当的字符编码
4. 添加错误处理和重试机制

#### 源文件
- 响应解析: `frameworks/native/rcp/src/curl/curl_response_parser.cpp`
- 错误处理: `frameworks/native/rcp/src/response.cpp`

### 8. 内部错误 (1007900999)

#### 错误描述
模块内部发生未知错误。

#### 触发场景
- 空指针错误
- 系统调用失败
- 资源竞争

#### 排查步骤
1. 获取详细错误信息：
```typescript
try {
  await session.fetch(request);
} catch (e) {
  const errorInfo = rcp.GetError(e.code);
  console.error('错误详情:', errorInfo);
}
```

2. 检查日志：
```typescript
// 启用详细日志
const config: rcp.TracingConfiguration = {
  verbose: true
};
```

3. 检查系统资源：
```typescript
// 检查网络状态
import network from '@ohos.net.connection';

const netManager = network.createNetworkManager();
const netType = netManager.getNetworkType();
console.log('网络类型:', netType);
```

#### 解决方案
1. 启用详细日志记录
2. 检查系统资源状态
3. 使用 `GetError()` 获取详细错误信息
4. 重启应用或系统

#### 源文件
- 错误处理: `interfaces/innerkits/include/rcp/error.h`
- 错误工具: `utils/src/rcp_error_utils.cpp:47`

## 网络相关错误

### 无网络连接

#### 错误描述
设备无网络连接。

#### 触发场景
- 设备离线
- 网络开关关闭
- 飞行模式

#### 排查步骤
1. 检查网络状态：
```typescript
import network from '@ohos.net.connection';

const netManager = network.createNetworkManager();
const isConnected = netManager.hasNetwork();
if (!isConnected) {
  console.error('无网络连接');
}
```

2. 使用 `GetNativeNoNetError()` 获取无网络错误码：
```typescript
const noNetError = rcp.GetNativeNoNetError();
console.log('无网络错误码:', noNetError);
```

#### 解决方案
1. 检查网络连接状态
2. 引导用户开启网络
3. 使用网络状态监听器
4. 添加离线缓存机制

#### 源文件
- 网络监听: `frameworks/native/rcp/src/default_network_listener.cpp`
- 错误构建: `utils/src/network_err_builder.cpp`

### DNS 解析失败

#### 错误描述
无法解析域名。

#### 触发场景
- DNS 服务器不可用
- 域名不存在
- DNS 配置错误

#### 排查步骤
1. 检查 DNS 配置：
```typescript
const config: rcp.DnsConfiguration = {
  dnsRules: [
    { ip: '8.8.8.8', port: 53 },
    { ip: '8.8.4.4', port: 53 }
  ]
};
```

2. 使用静态 DNS 规则：
```typescript
const staticRules: rcp.StaticDnsRule = {
  host: 'example.com',
  port: 443,
  ipAddresses: ['192.168.1.1']
};
```

#### 解决方案
1. 配置可靠的 DNS 服务器
2. 使用静态 DNS 规则
3. 启用 DNS over HTTPS
4. 使用 IP 地址而非域名

#### 源文件
- DNS 解析: `frameworks/native/rcp/src/curl/curl_dns_rule.cpp`
- DNS 配置: `frameworks/native/rcp/src/configuration.cpp`

### 代理连接失败

#### 错误描述
无法通过代理连接服务器。

#### 触发场景
- 代理服务器不可用
- 代理配置错误
- 代理失败

#### 排查步骤
1. 检查代理配置：
```typescript
const proxyConfig: rcp.WebProxy = {
  host: 'proxy.example.com',
  port: 8080,
  exclusionList: ['localhost', '127.0.0.1']
};
```

2. 使用系统代理：
```typescript
const config: rcp.SessionConfiguration = {
  proxy: 'system'
};
```

#### 解决方案
1. 验证代理服务器配置
2. 使用系统代理
3. 配置代理排除列表
4. 添加代理信息

#### 源文件
- 代理管理: `frameworks/native/rcp/src/system_proxy.cpp`
- 代理配置: `frameworks/native/rcp/src/configuration.cpp`

## SSL/TLS 相关错误

### 证书验证失败

#### 错误描述
服务器证书验证失败。

#### 触发场景
- 证书过期
- 证书不受信任
- 域名不匹配

#### 排查步骤
1. 检查证书配置：
```typescript
const securityConfig: rcp.SecurityConfiguration = {
  certificateAuthority: {
    content: '-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----'
  }
};
```

2. 使用自定义验证：
```typescript
const validationCallback: rcp.ValidationCallback = (context) => {
  // 自定义证书验证逻辑
  return true;
};

const config: rcp.SecurityConfiguration = {
  remoteValidation: validationCallback
};
```

#### 解决方案
1. 更新服务器证书
2. 添加受信任的 CA 证书
3. 使用自定义验证回调
4. 配置正确的 TLS 版本

#### 源文件
- SSL 工具: `frameworks/native/rcp/src/ssl_utils.cpp`
- 验证回调: `frameworks/ets/ani/rcp/src/validation_callback_notifier.cpp`

### TLS 版本不匹配

#### 错误描述
客户端和服务器 TLS 版本不匹配。

#### 触发场景
- 服务器不支持客户端的 TLS 版本
- TLS 版本配置错误

#### 排查步骤
1. 检查 TLS 版本配置：
```typescript
const tlsRange: rcp.TlsVersionRange = {
  min: rcp.TlsVersion.TLS_V1_2,
  max: rcp.TlsVersion.TLS_V1_3
};

const config: rcp.SecurityConfiguration = {
  tlsRange: tlsRange
};
```

2. 获取 TLS 版本范围：
```typescript
const tlsVersion = rcp.GetTlsRangeVersion('1.2');
console.log('TLS 版本:', tlsVersion);
```

#### 解决方案
1. 配置合适的 TLS 版本范围
2. 使用服务器支持的 TLS 版本
3. 更新客户端 TLS 支持

#### 源文件
- TLS 配置: `frameworks/js/napi/rcp/src/napi_parser.cpp`
- SSL 工具: `frameworks/native/rcp/src/ssl_utils.cpp`

## 文件相关错误

### 无法打开文件 (1007900988)

#### 错误描述
无法打开指定文件。

#### 触发场景
- 文件不存在
- 权限不足
- 文件被占用

#### 排查步骤
1. 检查文件是否存在：
```typescript
const exists = rcp.PathExists(filePath);
if (!exists) {
  console.error('文件不存在:', filePath);
}
```

2. 检查文件权限：
```typescript
import fs from '@ohos.file.fs';

try {
  fs.accessSync(filePath, fs.AccessMode.READ);
} catch (e) {
  console.error('文件访问权限不足');
}
```

#### 解决方案
1. 确保文件路径正确
2. 检查文件权限
3. 使用 `CreateParentDirectory()` 创建父目录
4. 检查文件是否被占用

#### 源文件
- 路径工具: `frameworks/js/napi/rcp/src/collaboration_rcp.cpp:603`
- 文件系统: `frameworks/native/rcp/src/cache/persistent/file_system.cpp`

### 无法创建目录 (1007900987)

#### 错误描述
无法创建目录。

#### 触发场景
- 父目录不存在
- 权限不足
- 磁盘空间不足

#### 排查步骤
1. 使用 `CreateParentDirectory()` 创建父目录：
```typescript
try {
  rcp.CreateParentDirectory(filePath);
} catch (e) {
  console.error('创建目录失败:', e);
}
```

2. 检查磁盘空间：
```typescript
import fs from '@ohos.file.fs';

const stats = fs.statSync('/data');
console.log('可用空间:', stats.freeSize);
```

#### 解决方案
1. 使用 `CreateParentDirectory()` 创建目录
2. 检查磁盘空间
3. 确保有创建目录的权限
4. 使用系统路径

#### 源文件
- 目录创建: `frameworks/js/napi/rcp/src/collaboration_rcp.cpp:603`
- 实现: `utils/src/rcp_native_common_utils.cpp`

### 文件系统错误 (1007900985)

#### 错误描述
文件系统 IO 错误。

#### 触发场景
- 磁盘损坏
- 文件系统只读
- IO 超时

#### 排查步骤
1. 检查文件系统状态：
```typescript
import fs from '@ohos.file.fs';

try {
  fs.accessSync('/data', fs.AccessMode.WRITE);
} catch (e) {
  console.error('文件系统只读或损坏');
}
```

2. 检查 IO 超时：
```typescript
const config: rcp.TransferConfiguration = {
  timeout: {
    transferMs: 60000
  }
};
```

#### 解决方案
1. 检查文件系统状态
2. 增加超时时间
3. 使用重试机制
4. 检查磁盘健康状况

#### 源文件
- 文件系统: `frameworks/native/rcp/src/cache/persistent/file_system.cpp`
- IO 处理: `frameworks/native/rcp/src/request_content.cpp`

## 蜂窝网络错误

### 无法建立蜂窝连接 (1007900986)

#### 错误描述
无法建立蜂窝数据连接。

#### 触发场景
- 蜂窝网络未开启
- SIM 卡未插入
- 信号弱

#### 排查步骤
1. 检查蜂窝网络状态：
```typescript
import telephony from '@ohos.telephony';

const state = telephony.getDataConnectState();
console.log('蜂窝网络状态:', state);
```

2. 检查路径偏好配置：
```typescript
const config: rcp.TransferConfiguration = {
  pathPreference: 'cellular',
  throwErrorWhenEnableCellularFailed: true
};
```

#### 解决方案
1. 开启蜂窝网络
2. 检查 SIM 卡状态
3. 使用自动路径选择
4. 检查信号强度

#### 源文件
- 蜂窝连接: `frameworks/native/rcp/src/cellular_connection_callback.cpp`
- 路径选择: `frameworks/native/rcp/src/configuration.cpp`

## 调试技巧

### 启用详细日志

```typescript
const config: rcp.TracingConfiguration = {
  verbose: true,
  infoToCollect: {
    textual: true,
    incomingHeader: true,
    outgoingHeader: true,
    incomingData: true,
    outgoingData: true
  },
  collectTimeInfo: true
};
```

### 使用调试信息

```typescript
const response = await session.fetch(request);
console.log('调试信息:', response.debugInfo);
```

### 网络状态监听

```typescript
import network from '@ohos.net.connection';

const netManager = network.createNetworkManager();
netManager.on('networkAvailable', (netType) => {
  console.log('网络可用:', netType);
});

netManager.on('networkUnavailable', () => {
  console.log('网络不可用');
});
```

### 性能分析

```typescript
const config: rcp.TracingConfiguration = {
  collectTimeInfo: true
};

const response = await session.fetch(request);
console.log('时间信息:', response.timeInfo);
```

## 常见问题 FAQ

### Q: 如何处理大文件上传？

A: 使用 `NetworkInputQueue` 进行流式上传：
```typescript
const inputQueue = new rcp.NetworkInputQueue(1024 * 1024);
inputQueue.write(chunk1);
inputQueue.write(chunk2);
inputQueue.close();
```

### Q: 如何处理大文件下载？

A: 使用下载到文件或流：
```typescript
const request: rcp.Request = {
  url: 'https://example.com/large-file.zip',
  destination: {
    kind: 'file',
    file: '/data/local/file.zip'
  }
};
```

### Q: 如何实现请求重试？

A: 使用 try-catch 和重试逻辑：
```typescript
const MAX_RETRIES = 3;
let retryCount = 0;

while (retryCount < MAX_RETRIES) {
  try {
    const response = await session.fetch(request);
    return response;
  } catch (e) {
    retryCount++;
    if (retryCount >= MAX_RETRIES) {
      throw e;
    }
    await delay(1000 * retryCount);
  }
}
```

### Q: 如何监控网络状态？

A: 使用网络状态监听器：
```typescript
import network from '@ohos.net.connection';

const netManager = network.createNetworkManager();
netManager.on('networkAvailable', (netType) => {
  console.log('网络可用:', netType);
});
```

## 主要源文件

- **错误定义**: `interfaces/innerkits/include/rcp/error.h`
- **错误工具**: `utils/src/rcp_error_utils.cpp:47`
- **网络错误**: `utils/src/network_err_builder.cpp`
- **会话管理**: `frameworks/native/rcp/src/session.cpp`
- **请求处理**: `frameworks/native/rcp/src/request.cpp`
- **响应处理**: `frameworks/native/rcp/src/response.cpp`
- **SSL 工具**: `frameworks/native/rcp/src/ssl_utils.cpp`
- **文件系统**: `frameworks/native/rcp/src/cache/persistent/file_system.cpp`
- **网络监听**: `frameworks/native/rcp/src/default_network_listener.cpp`
- **蜂窝连接**: `frameworks/native/rcp/src/cellular_connection_callback.cpp`
