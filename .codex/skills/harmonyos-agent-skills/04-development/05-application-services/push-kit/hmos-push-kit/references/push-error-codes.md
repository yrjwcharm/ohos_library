# Push Kit 错误码速查

本文档汇总华为 Push Kit 推送服务常见的错误码，帮助开发者快速定位和解决问题。

## 目录

1. [客户端错误码（Token获取）](#客户端错误码token获取)
2. [服务端响应码](#服务端响应码)
3. [常见问题排查](#常见问题排查)

---

## 客户端错误码（Token获取）

### getToken 相关错误码

| 错误码 | 错误信息 | 可能原因 | 解决方法 |
|-------|---------|---------|---------|
| 1000900010 | 参数错误 | 推送服务未开通或签名配置错误 | 检查 AppGallery Connect 是否开通推送服务，检查签名配置 |
| 1000900011 | Token无效 | 应用签名不匹配 | 重新配置应用签名，确保与 AppGallery Connect 中的一致 |
| 1000900012 | 服务不可用 | 网络问题或服务异常 | 检查网络连接，稍后重试 |
| 1000900013 | 超时 | 请求超时 | 增加超时时间或检查网络状况 |
| 1000900014 | 权限不足 | 未配置必要权限 | 检查 module.json5 中的权限配置 |

### receiveMessage 相关错误码

| 错误码 | 错误信息 | 可能原因 | 解决方法 |
|-------|---------|---------|---------|
| 1000900020 | 消息类型不支持 | 使用了不支持的 pushType | 检查 pushType 参数是否正确 |
| 1000900021 | 未注册消息接收 | 未调用 receiveMessage | 确保已调用 receiveMessage 注册消息接收 |
| 1000900022 | 消息解析失败 | 消息格式错误 | 检查消息数据格式是否正确 |

---

## 服务端响应码

### HTTP 响应码

| HTTP响应码 | 描述 | 解决方法 |
|-----------|------|---------|
| 200 | 成功 | - |
| 400 | 参数错误 | 检查请求参数格式是否正确 |
| 401 | 鉴权失败 | 检查 Authorization 参数是否正确 |
| 404 | 找不到服务 | 检查请求 URI 是否正确 |
| 500 | 服务内部错误 | 通过在线提单提交问题 |
| 502 | 请求连接异常 | 建议稍后重试 |
| 503 | 流量控制 | 平均分配发送速度，不要集中发送 |

### 业务响应码

| 响应码 | 说明 | 可能原因 | 处理步骤 |
|-------|------|---------|---------|
| **80000000** | 成功 | - | 不涉及 |
| **80100000** | 部分Token发送成功 | 部分 Token 无效或无权限 | 检查响应中的 illegalTokens 字段 |
| **80100001** | 请求参数部分错误 | 请求参数格式错误 | 检查请求参数内容 |
| **80100003** | 消息结构体错误 | payload 格式错误 | 检查请求体结构 |
| **80100004** | 消息过期时间错误 | ttl 参数设置错误 | 检查 ttl 参数 |
| **80100022** | 图片未验签 | 图片风控验证失败 | 对图片进行风控校验 |
| **80200001** | 认证错误 | JWT Token 错误 | 检查 Authorization 参数 |
| **80200005** | JWT Token过期 | Token 有效期过期 | 重新生成 JWT Token |
| **80200006** | Token已被禁用 | 应用被处罚 | 检查应用是否有违规 |

### 80100000 详细说明

当返回 `80100000` 部分 Token 发送成功时，响应 msg 中会包含详细的失败原因：

| 子错误码 | 说明 | 处理步骤 |
|---------|------|---------|
| noPushTypeRight | 未申请对应场景权益 | 开通 push-type 对应场景的权益 |
| noRight | Token 不属于该项目 | 确认 projectId 与应用所属项目一致 |
| tokenFormatError | Token 格式错误 | 重新获取 Push Token |
| countryNotSupport | 国家不支持 | 通过在线提单提交问题 |
| disableSendHuaweiMsgBecauseOfPenalty | 应用被违规处罚 | 在 AppGallery Connect 检查并处理违规 |

---

## 常见问题排查

### 问题1：getToken 返回错误码 1000900010

**可能原因**：
1. 推送服务未开通
2. 应用签名不匹配
3. 调试设备未注册

**解决方法**：
1. 登录 AppGallery Connect，确认已开通推送服务
2. 检查应用签名配置，确保与AGC中的一致
3. 在 DevEco Studio 中注册调试设备

### 问题2：消息发送成功但设备未收到

**可能原因**：
1. Token 已过期
2. 应用签名变化导致 Token 失效
3. 设备网络异常
4. 被频控限制

**解决方法**：
1. 重新获取 Push Token
2. 检查设备网络状态
3. 确认消息未超过频控限制
4. 使用 testMessage: true 进行测试

### 问题3：收到 80200001 认证错误

**可能原因**：
1. JWT Token 与 projectId 不匹配
2. 未使用 v3 版本接口
3. Token 已过期或格式错误

**解决方法**：
1. 确认生成 JWT Token 的 projectId 与推送消息的 projectId 一致
2. 使用 v3 版本请求 URL：`https://push-api.cloud.huawei.com/v3/[projectId]/messages:send`
3. 重新生成 JWT Token

### 问题4：收到 80100000 部分成功

**可能原因**：
1. 部分 Token 格式错误
2. 部分 Token 对应的应用不在项目内
3. 部分 Token 未开通对应权益

**处理步骤**：
1. 解析响应 msg 中的 illegalTokens 字段
2. 根据具体原因逐个处理无效的 Token

---

## 快速诊断流程

```
                    遇到错误
                      │
                      ▼
         ┌────────────────────────┐
         │   是客户端错误吗？      │
         │   (getToken/receive)   │
         └────────────────────────┘
                │           │
               是           否
                │           │
                ▼           ▼
    ┌─────────────────┐  ┌────────────────────────┐
    │ 查看客户端错误码 │  │ 查看HTTP响应码          │
    │ 10009xxxxx      │  │ 200/400/401/500等      │
    └─────────────────┘  └────────────────────────┘
                │           │
                │           ▼
                │  ┌────────────────────────┐
                │  │ 查看业务响应码          │
                │  │ 80xxxxxx               │
                │  └────────────────────────┘
                │           │
                └──────┬────┘
                       ▼
              根据具体错误码
               进行问题排查
```

---

## 相关文档链接

| 文档 | 链接 |
|------|------|
| Push Kit 常见问题 | https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/push-faq |
| 消息推送接口 | https://developer.huawei.com/consumer/cn/doc/harmonyos-references/push-scenariozed-api-request-struct |
| 响应参数 | https://developer.huawei.com/consumer/cn/doc/harmonyos-references/push-scenariozed-api-response |
| JWT Token 生成 | https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/push-jwt-token |
