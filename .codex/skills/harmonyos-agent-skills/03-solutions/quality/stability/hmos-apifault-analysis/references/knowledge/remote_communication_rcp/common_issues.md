# RCP 模块常见问题模式

## 1. 错误处理问题

### 1.1 错误码不统一
**问题描述**：不同层级的错误码使用不一致，容易混淆
- JavaScript 层使用 `BusinessError` 包装错误码
- C API 层使用 `RcpErrorCode` 枚举
- C++ 内部使用 `Error` 枚举（基于 1007900000 基础值）

**影响范围**：
- 框架层错误转换：`frameworks/js/napi/rcp/src/collaboration_rcp.cpp:655` (GetError)
- 错误工具函数：`utils/src/rcp_error_utils.cpp:24` (errorMap)
- C API 错误码：`frameworks/c/rcp/rcp_inner_types.h:26` (RcpErrorCode)

**建议**：
- 统一错误码定义，使用基础值 1007900000
- 在错误转换时保持错误信息一致性
- 文档中明确说明各层错误码的对应关系

### 1.2 错误信息不完整
**问题描述**：某些错误返回的信息不够详细，不利于问题定位
- 网络错误只返回错误码，缺少详细上下文
- 内部错误信息过于简单，如 "Internal Error"

**影响范围**：
- 错误字符串映射：`utils/src/rcp_error_utils.cpp:24` (errorMap)
- DFX 日志记录：`utils/src/rcp_dfx.cpp:34` (RESPONSE_ERROR_CODE)

**建议**：
- 扩展错误信息，包含更多上下文
- 使用 DFX 机制记录详细错误信息
- 在 `ExtendResponseInfo` 中提供扩展错误信息

### 1.3 错误传播丢失
**问题描述**：错误在多层调用链中可能被吞掉或转换后丢失原始信息
- Curl 错误转换为 RCP 错误时可能丢失细节
- 异步回调中的错误可能被忽略

**影响范围**：
- Curl 错误转换：`frameworks/native/rcp/src/curl/curl_error_convertor.cpp`
- Promise 回调：`frameworks/js/napi/rcp/src/collaboration_rcp.cpp:236` (MakePromiseCallbackInner)

**建议**：
- 在错误转换时保留原始错误信息
- 使用 `extendInfo` 字段传递额外错误详情
- 确保异步回调中的错误能正确传播

## 2. 参数验证问题

### 2.1 参数验证不完整
**问题描述**：某些 API 的参数验证不够严格，可能导致运行时错误
- URL 验证不够严格
- 文件路径验证不完整
- 空指针检查遗漏

**影响范围**：
- NAPI 参数解析：`frameworks/js/napi/rcp/src/napi_parser.cpp`
- C API 参数验证：`frameworks/c/rcp/rcp_inner_types.h:88` (HMS_Rcp_ValidateSession)

**建议**：
- 在入口处进行参数验证
- 对 URL、文件路径等关键参数进行格式验证
- 添加空指针和边界检查

### 2.2 参数类型检查不一致
**问题描述**：JavaScript 和 C++ 层的参数类型检查标准不一致
- JavaScript 层使用 NAPI 类型检查
- C++ 层假设参数已验证

**影响范围**：
- NAPI 工具函数：`utils/src/napi_utils.cpp`
- 参数解析器：`frameworks/js/napi/rcp/src/napi_parser.cpp`

**建议**：
- 统一参数类型检查标准
- 在 NAPI 层进行严格类型检查
- C++ 层假设参数已验证，但添加断言保护

### 2.3 可选参数处理不当
**问题描述**：可选参数的默认值设置和处理逻辑不够清晰
- 配置对象的可选字段处理不一致
- 某些可选参数未设置默认值

**影响范围**：
- 配置解析：`frameworks/js/napi/rcp/src/napi_parser.cpp` (ConfigurationNapiParser)
- 会话配置：`frameworks/native/rcp/src/configuration.cpp`

**建议**：
- 明确定义所有可选参数的默认值
- 在配置解析时统一处理可选参数
- 文档中说明可选参数的默认行为

## 3. 内存管理问题

### 3.1 内存泄漏风险
**问题描述**：异步操作和回调中可能存在内存泄漏
- NAPI 引用未释放
- 回调未清理
- 循环引用导致无法释放

**影响范围**：
- NAPI 管理：`frameworks/js/napi/rcp/src/napi_manager.cpp`
- 上下文管理：`frameworks/js/napi/rcp/src/session_context.cpp`, `fetch_context.cpp`

**建议**：
- 确保所有 NAPI 引用在适当时候释放
- 使用智能指针管理 C++ 对象生命周期
- 避免循环引用，使用弱引用打破循环

### 3.2 大对象内存占用
**问题描述**：处理大文件或大数据时内存占用过高
- 响应体全部加载到内存
- 上传文件未使用流式处理

**影响范围**：
- 响应处理：`frameworks/native/rcp/src/response.cpp`
- 请求内容：`frameworks/native/rcp/src/request_content.cpp`

**建议**：
- 支持流式处理大文件
- 使用 `NetworkInputQueue` 和 `NetworkOutputQueue` 进行流式传输
- 限制单次请求的最大内存占用

### 3.3 缓存内存管理
**问题描述**：缓存机制可能导致内存占用过高
- 缓存大小限制不明确
- 缓存清理策略不完善

**影响范围**：
- 缓存实现：`frameworks/native/rcp/src/cache/persistent/cache.cpp`
- 响应缓存：`frameworks/native/rcp/src/cache/response/response_cache.cpp`

**建议**：
- 明确定义缓存大小限制
- 实现完善的缓存清理策略（LRU 等）
- 提供手动清理缓存的接口

## 4. 线程安全问题

### 4.1 并发访问问题
**问题描述**：多线程访问共享资源时可能存在竞争条件
- 会话工厂的默认会话访问
- NAPI 管理器的状态管理
- Cookie 仓库的并发访问

**影响范围**：
- 会话工厂：`frameworks/native/rcp/src/session.cpp:32` (GetDefaultSessionRef)
- NAPI 管理：`frameworks/js/napi/rcp/src/napi_manager.cpp`
- Cookie 管理：`frameworks/native/rcp/src/cookie_manager.cpp`

**建议**：
- 使用互斥锁保护共享资源
- 使用原子操作处理简单状态
- 避免在锁内执行耗时操作

### 4.2 线程安全回调
**问题描述**：异步回调在不同线程间传递时可能不安全
- NAPI 线程安全函数使用不当
- 回调执行顺序不确定

**影响范围**：
- 线程安全回调：`frameworks/js/napi/rcp/src/collaboration_rcp.cpp:284` (MakePromiseCallback)
- NAPI 工具：`utils/src/napi_utils.cpp` (NapiCallThreadsafeFunction)

**建议**：
- 正确使用 `napi_threadsafe_function` 确保线程安全
- 明确回调执行的线程上下文
- 避免在回调中执行耗时操作

### 4.3 会话生命周期管理
**问题描述**：会话的创建和销毁在多线程环境下可能不安全
- 会话关闭后仍有请求在执行
- 会话引用计数管理不当

**影响范围**：
- 会话管理：`frameworks/native/rcp/src/session.cpp`
- NAPI 会话上下文：`frameworks/js/napi/rcp/src/session_context.cpp`

**建议**：
- 使用引用计数管理会话生命周期
- 会话关闭时取消所有进行中的请求
- 确保会话销毁前所有资源已释放

## 5. 网络处理问题

### 5.1 网络状态变化处理
**问题描述**：网络状态变化时请求处理不当
- 网络切换时请求失败
- 网络恢复后请求未自动重试

**影响范围**：
- 网络监听：`frameworks/native/rcp/src/default_network_listener.cpp`
- 蜂窝网络：`frameworks/native/rcp/src/cellular_connection_callback.cpp`
- VPN 监听：`frameworks/native/rcp/src/vpn_network_listener.cpp`

**建议**：
- 实现完善的网络状态监听机制
- 网络恢复时自动重试失败的请求
- 提供网络状态变化的回调接口

### 5.2 超时处理不当
**问题描述**：各种超时配置不够合理或处理不当
- 连接超时和传输超时设置不合理
- 超时后资源未正确释放

**影响范围**：
- 超时配置：`frameworks/native/rcp/src/http_options.cpp`
- Curl 配置：`frameworks/native/rcp/src/curl/curl_configuration.cpp`

**建议**：
- 提供合理的默认超时值
- 超时后确保资源正确释放
- 支持自定义超时策略

### 5.3 代理配置问题
**问题描述**：代理配置和切换处理不当
- 系统代理获取失败
- 代理切换时请求未正确处理

**影响范围**：
- 系统代理：`frameworks/native/rcp/src/system_proxy.cpp`
- 代理处理：`frameworks/native/rcp/src/curl/curl_request_proxy.cpp`

**建议**：
- 完善系统代理获取逻辑
- 代理切换时重新建立连接
- 提供代理状态变化的回调

## 6. 安全问题

### 6.1 SSL/TLS 配置不当
**问题描述**：SSL/TLS 配置可能存在安全漏洞
- 证书验证不严格
- 密码套件配置不安全
- 明文传输未正确禁止

**影响范围**：
- SSL 工具：`frameworks/native/rcp/src/ssl_utils.cpp`
- 配置管理：`frameworks/native/rcp/src/configuration.cpp`

**建议**：
- 严格验证服务器证书
- 使用安全的密码套件
- 禁止不安全的协议版本
- 正确处理明文传输限制

### 6.2 敏感信息泄露
**问题描述**：日志或错误信息可能泄露敏感信息
- 日志中包含完整 URL

**影响范围**：
- DFX 日志：`utils/src/rcp_dfx.cpp`
- 错误处理：`utils/src/rcp_error_utils.cpp`

**建议**：
- 日志中脱敏敏感信息
- 提供日志级别控制

### 6.3 文件路径安全
**问题描述**：文件操作可能存在路径遍历等安全风险
- 文件路径验证不严格
- 临时文件处理不当

**影响范围**：
- 文件操作：`frameworks/native/rcp/src/request_content.cpp`
- 路径处理：`utils/src/rcp_native_common_utils.cpp` (PathResolve)

**建议**：
- 严格验证文件路径
- 防止路径遍历攻击
- 安全处理临时文件

## 7. 性能问题

### 7.1 连接复用不当
**问题描述**：HTTP 连接复用策略不够优化
- 连接复用率低
- 连接池管理不当

**影响范围**：
- 连接管理：`frameworks/native/rcp/src/http_session.cpp`
- Curl 配置：`frameworks/native/rcp/src/curl/curl_configuration.cpp`

**建议**：
- 优化连接复用策略
- 实现合理的连接池管理
- 提供连接复用策略配置

### 7.2 缓存命中率低
**问题描述**：缓存策略不够优化，命中率低
- 缓存键计算不准确
- 缓存过期策略不合理

**影响范围**：
- 缓存实现：`frameworks/native/rcp/src/cache/persistent/cache.cpp`
- 响应缓存：`frameworks/native/rcp/src/cache/response/response_cache.cpp`

**建议**：
- 优化缓存键计算策略
- 实现合理的缓存过期策略
- 提供缓存统计信息

### 7.3 阻塞操作
**问题描述**：某些操作可能阻塞主线程
- 同步 DNS 解析
- 阻塞的文件操作

**影响范围**：
- DNS 解析：`frameworks/native/rcp/src/curl/curl_request_parser.cpp`
- 文件操作：`frameworks/native/rcp/src/request_content.cpp`

**建议**：
- 使用异步 API 避免阻塞
- 将耗时操作放到后台线程
- 提供进度回调接口

## 8. 兼容性问题

### 8.1 版本兼容性
**问题描述**：不同版本的 API 行为不一致
- deprecated API 未明确标记
- 新旧 API 行为差异

**影响范围**：
- API 声明：`@hms.collaboration.rcp.d.ts`
- 版本管理：`frameworks/js/napi/rcp/src/collaboration_rcp.cpp`

**建议**：
- 明确标记 deprecated API
- 提供迁移指南
- 保持新版本向后兼容

### 8.2 平台差异
**问题描述**：不同平台的行为差异未充分处理
- Windows 和 Linux 平台差异
- 不同设备能力的差异

**影响范围**：
- 平台适配：`frameworks/native/rcp/src/curl/curl_request_parser.cpp`
- 能力检测：`frameworks/js/napi/rcp/src/collaboration_rcp.cpp`

**建议**：
- 充分测试不同平台
- 提供平台特定配置
- 文档说明平台差异

## 总结

RCP 模块作为核心网络通信组件，在设计和实现中需要特别注意：

1. **错误处理**：统一错误码，提供详细错误信息
2. **参数验证**：严格验证所有输入参数
3. **内存管理**：避免内存泄漏，合理使用内存
4. **线程安全**：正确处理并发访问
5. **网络处理**：完善网络状态和超时处理
6. **安全防护**：确保 SSL/TLS 和文件操作安全
7. **性能优化**：优化连接复用和缓存策略
8. **兼容性**：保持 API 稳定和平台兼容

建议在后续开发中重点关注这些问题，提高模块的稳定性和可靠性。
