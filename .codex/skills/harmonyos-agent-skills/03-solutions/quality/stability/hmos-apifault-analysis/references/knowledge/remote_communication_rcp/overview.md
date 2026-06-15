# RCP (Remote Communication Protocol) 模块概览

## 模块信息

**模块名称**: `remote_communication_rcp`

**SysCap**: `SystemCapability.Collaboration.RemoteCommunication`

**Kit**: RemoteCommunicationKit

**版本**: 4.1.0(11) dynamic, 6.1.0(23) static

## 模块描述

RCP (Remote Communication Protocol) 模块是远程通信组件，提供基于 HTTP/HTTPS 协议的网络请求能力。该模块支持同步和异步请求、会话管理、缓存机制、代理配置、SSL/TLS 安全传输、网络状态监听等功能，并提供了完整的 NAPI 桥接层和 C API 接口，适用于 ArkTS 和 C/C++ 开发场景。

## 核心功能

### 1. HTTP/HTTPS 请求
- 支持 GET、POST、HEAD、PUT、DELETE、PATCH、OPTIONS 等标准 HTTP 方法
- 支持自定义 HTTP 方法
- 支持请求头和响应头管理
- 支持请求体和响应体处理（ArrayBuffer、字符串、流、文件等多种形式）

### 2. 会话管理
- 支持创建和管理多个会话
- 支持默认会话
- 支持会话配置（超时、代理、SSL/TLS 等）
- 支持会话复用策略

### 3. 缓存机制
- 支持响应缓存
- 支持缓存策略配置
- 支持缓存读取和删除

### 4. 安全传输
- 支持 SSL/TLS 安全传输
- 支持客户端证书
- 支持服务器
- 支持密码套件配置

### 5. 代理支持
- 支持系统代理配置
- 支持自定义 HTTP/HTTPS 代理
- 支持 SOCKS 代理

### 6. 网络状态管理
- 支持网络状态监听
- 支持网络切换处理
- 支持蜂窝网络连接管理
- 支持 VPN 网络监听

### 7. Cookie 管理
- 支持 Cookie 存储和检索
- 支持多个 Cookie 仓库
- 支持 Cookie 过期管理

### 8. 拦截器
- 支持请求拦截器
- 支持响应拦截器
- 支持挑战处理

### 9. 调试和追踪
- 支持请求/响应调试信息收集
- 支持性能分析
- 支持请求追踪
- 支持 DFX 日志记录

## 架构层次

### 1. 接口层 (interfaces/)
- **kits/c/** - C API 对外接口
- **innerkits/** - 内部接口定义

### 2. 框架层 (frameworks/)
- **c/rcp/** - C API 框架实现
- **native/rcp/** - Native C++ 核心实现
  - **curl/** - 基于 libcurl 的网络实现
  - **cache/** - 缓存实现
- **js/napi/rcp/** - NAPI 桥接层
- **ets/ani/rcp/** - ANI (Ark Native Interface) 层

### 3. 工具层 (utils/)
- **src/** - 工具函数实现
- **include/** - 工具函数头文件

### 4. 测试层 (test/)
- **test_samples/** - 测试示例
- **functional_testing_app/** - 功能测试
- **unittest/** - 单元测试

## 主要类和接口

### JavaScript API
- `Session` - 会话管理
- `Request` - 请求对象
- `Response` - 响应对象
- `CookieRepository` - Cookie 仓库
- `NetworkInputQueue` - 网络输入队列
- `NetworkOutputQueue` - 网络输出队列

### C API
- `Rcp_Session` - 会话句柄
- `Rcp_Request` - 请求句柄
- `Rcp_Response` - 响应句柄
- `Rcp_Headers` - 请求头/响应头
- `Rcp_Form` - 表单数据
- `Rcp_MultipartForm` - 多部分表单数据

### C++ 内部类
- `Session` - 会话管理类
- `Request` - 请求类
- `Response` - 响应类
- `SessionFactory` - 会话工厂
- `RequestContent` - 请求内容处理
- `HttpClient` - HTTP 客户端
- `CurlRequestParser` - Curl 请求解析器
- `CurlResponseParser` - Curl 响应解析器

## 关键配置

### 超时配置
- `connectMs` - 连接超时（默认 60000ms）
- `transferMs` - 传输超时（默认 60000ms）
- `inactivityMs` - 非活动超时

### TCP 配置
- `keepIdleSec` - TCP keepalive 空闲时间（默认 7200s）
- `keepCnt` - TCP keepalive 探测次数（默认 9）
- `keepIntervalSec` - TCP keepalive 探测间隔（默认 75s）
- `userTimeoutMs` - TCP 用户超时

### 网络配置
- `pathPreference` - 网络路径偏好（auto/cellular）
- `serviceType` - 网络服务类型
- `connectionReusePolicy` - 连接复用策略

## 错误码范围

RCP 模块使用 1007900xxx 范围的错误码：
- `1007900401` - 参数错误
- `1007900990` - 内存不足
- `1007900992` - 请求已取消
- `1007900993` - 会话已关闭或无效
- `1007900986` - 无法建立蜂窝连接
- `1007900999` - 内部错误
- `201` - 权限拒绝
- `401` - 参数错误

## 构建产物

- `librcp.z.so` - NAPI 模块
- `librcp_native.z.so` - Native C++ 模块
- `librcp_c.so` - C API 库

## 依赖组件

- `libcurl` - HTTP 客户端库
- `netmanager_ext` - 网络管理扩展
- `cert_manager` - 证书管理
- `huks` - 密钥管理服务
