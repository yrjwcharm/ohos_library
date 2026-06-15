---
name: hmos-push-kit-token
description: |
  Push Token 获取助手。可作为单独接入能力使用。当开发者需要集成华为推送服务、首次获取 Push Token、或 Token 获取失败时触发。
  
  ============================================================
  触发条件（只有满足以下意图时才触发）：
  ============================================================
  
  ✅ 正确触发场景：
  - "帮我接入push token"
  - "获取push token"
  - "首次集成推送功能"
  - "getToken调用失败"
  - "token获取报错1000900010"
  - 需要在项目中添加getToken代码
  
  ❌ 不触发场景：
  - 询问/概念："token是什么"、"为什么需要token"
  - 对比问题："华为push和苹果push区别"
  - 仅输入关键词："token"、"push"
  - 否定意图："不想接入token"
  - 带引号输入："push token"
  - 配置咨询："token怎么配置"
  
  此 Skill 专注于帮助开发者正确实现 Push Token 的获取。
  
  重要说明：
  - 此 Skill 可作为单独接入能力使用
  - hmos-push-kit-notification 和 hmos-push-kit-voip 在接入前会先检查 Token 状态
  - 如果未接入 Token，会引导开发者先使用此 Skill
---

# Push Token 获取助手

本 Skill 帮助开发者完成 Push Token 的获取，这是所有华为推送服务的基础。无论是要发送通知消息、通话消息还是语音播报消息，都必须先正确获取 Push Token。

## ⚠️ 权益申请提醒

在获取 Push Token 之前，请确保已完成以下操作：

1. **开通推送服务（必须）**
   - 登录 [AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/)
   - 选择您的项目和应用
   - 进入「增长 > 推送服务」
   - 点击「立即开通」
   - **重要**：开通推送服务是获取 Token 的前提条件，未开通将导致 getToken() 调用失败

2. **配置应用签名（必须）**
   - 在 AppGallery Connect 中配置应用的签名证书指纹
   - 生成并下载包含推送权限的 Profile 文件
   - 在 DevEco Studio 中配置签名信息

**注意**：获取 Push Token **不需要**在 module.json5 中配置任何特殊权限，只需要开通推送服务并配置签名即可。

## 核心职责

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Push Token Skill 职责                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. 判断项目状态                                                     │
│     ├── 检查是否已开通推送服务                                        │
│     ├── 检查签名配置是否正确                                          │
│     └── 检查代码中是否已集成 getToken                                 │
│                                                                     │
│  2. 向开发者解释 Token                                               │
│     ├── Token 是什么                                                  │
│     ├── 为什么需要 Token                                              │
│     └── Token 的生命周期和变化场景                                     │
│                                                                     │
│  3. 引导开发者开发 Token 获取功能                                     │
│     ├── 生成完整的 getToken 代码                                      │
│     ├── 说明代码的作用和原理                                          │
│     └── 指导如何验证 Token 获取是否成功                               │
│                                                                     │
│  4. 帮助开发者获取已在使用的 Token                                    │
│     ├── 从日志中提取 Token                                            │
│     ├── 从项目中查找已有实现                                          │
│     └── 验证 Token 有效性                                            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 交互流程

### 触发条件

本 Skill 在以下情况被触发：
1. 其他 Push Skill（notification/voip/background）检测到项目未接入 Token
2. 开发者主动询问接入 Push Token 相关问题

### 核心原则

**当 AI 确定项目未接入 Push Token 时，直接执行接入，不再询问开发者是否需要接入。**

```
┌─────────────────────────────────────────────────────────────────────┐
│                        新的交互策略                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  旧策略（需要优化）：                                               │
│    AI: "请问您的项目是否已接入Push Token？"                         │
│    用户: "没有"                                                    │
│    AI: "那您需要接入吗？有没有开通推送服务？"                       │
│    → 多次询问，效率低                                              │
│                                                                     │
│  新策略（当前采用）：                                               │
│    AI (检测到未接入): "我来帮您接入 Push Token"                     │
│    → 直接开始接入流程                                              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 执行流程

#### 第一步：确认项目状态

当其他 Skill 调用本 Skill 时，已经确认项目未接入 Token。因此：

- **不再询问**："您的项目是否已接入 Token？"
- **不再询问**："您是否需要接入 Token？"
- **不再询问**："您是否开通了推送服务？"

直接认为需要接入 Token，开始以下流程。

#### 第二步：告知提醒事项并直接接入

告知开发者接入流程会包含的内容，然后直接开始生成代码，参考下面的代码生成部分。

---

## 补充说明：解释 Token 的意义

当开发者询问"为什么需要 Push Token"时，使用以下解释：

---

## Push Token 是什么？

**Push Token 是华为 Push 服务为每一台设备上的每一个应用生成的唯一识别码。**

### 类比理解

想象您去快递柜取快递：
- **设备** = 快递柜本身
- **应用** = 您的专属柜子
- **Push Token** = 这个柜子的密码

只有知道正确的密码，快递员（华为 Push 服务器）才能把您的快递（推送消息）正确放入您的柜子。

### 技术解释

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Push Token 工作原理                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   开发者应用                    华为 Push 服务器                     │
│        │                              │                            │
│        │    1. 调用 getToken()        │                            │
│        │ ─────────────────────────►   │                            │
│        │                              │                            │
│        │    2. 返回唯一 Token         │                            │
│        │ ◄─────────────────────────   │                            │
│        │                              │                            │
│        │    3. 将 Token 上传到         │                            │
│        │       开发者服务器            │                            │
│        │ ─────────────────────────►   │                            │
│        │                              │                            │
│        │                              │    4. 使用 Token           │
│        │                              │       推送消息              │
│        │ ◄─────────────────────────   │                            │
│        │                              │                            │
└─────────────────────────────────────────────────────────────────────┘
```

### 为什么必须有 Token？

1. **唯一识别**：华为服务器需要知道把消息发给哪台设备的哪个应用
2. **安全通道**：Token 是设备和服务器之间的安全凭证
3. **消息路由**：没有 Token，服务器就不知道把消息发给谁

### Token 的一些重要特性

| 特性 | 说明 |
|-----|------|
| 设备级唯一 | 每台设备的每个应用都有不同的 Token |
| 可能变化 | 卸载重装、应用数据清理、签名变化等情况下 Token 会变化 |
| 时效性 | Token 本身不会过期，但服务器端会更新它 |
| 不能伪造 | 只有真正运行在设备上的应用才能获取到有效 Token |

---

### 第三步：直接进入 Token 获取流程

**重要**：AI 已经确认项目中未接入 Push Token，因此**不再询问**开发者是否需要接入或是否已开通推送服务，直接开始接入流程。

#### 3.1 接入完成后的提醒事项

在开始接入之前，告知开发者接入流程会包含以下步骤：

```
我将帮您完成 Push Token 的接入，接入流程包括：

1. 在 EntryAbility 中添加 getToken() 代码
2. 生成完整的 Token 获取和上报逻辑
3. 说明代码的作用和验证方法

📌 接入完成后的提醒事项：
□ 获取 Token 后必须上报到您的服务器（服务器需要 Token 才能发送推送）
□ 建议在应用每次启动时获取最新 Token
□ Token 变化场景：卸载重装、清空数据、签名变化等
□ 推送服务开通：在 AppGallery Connect「增长 > 推送服务」中开通
□ 签名配置：确保已配置应用签名并下载包含推送权限的 Profile
```

> **说明**：AI 直接开始执行接入，不再询问"是否需要接入"这类问题。

#### 3.2 生成 Token 获取代码

直接生成代码，不再询问开发者是否准备好了：

```
好的，现在开始为您生成 Push Token 获取代码。

代码将实现以下功能：
1. 在应用启动时自动获取 Push Token
2. 错误处理和日志记录
3. Token 上报服务器的示例代码（需要您补充服务器接口）

以下是完整代码：
```

#### 3.3 代码生成后的验证指导

代码生成完成后，直接提供验证步骤：

```
代码已生成！请按以下步骤验证 Token 获取是否成功：

1. 使用调试证书重新签名并编译应用
2. 在设备上安装并启动应用
3. 打开 DevEco Studio 的 Log 窗口
4. 过滤日志标签 "testTag" 或 "PushToken"
5. 查看是否有类似以下日志：
   ✓ 成功："Succeeded in getting push token: AIbSy2Q6..."
   ✗ 失败："Failed to get push token: 1000900010..."

如遇到错误码，请参考以下常见错误码排查：

| 错误码 | 可能原因 | 解决方法 |
|-------|---------|---------|
| 1000900010 | 推送服务未开通或签名配置错误 | 检查 AppGallery Connect 是否开通推送服务，检查签名配置 |
| 1000900011 | 应用签名不匹配 | 重新配置应用签名，确保与 AGC 中的一致 |
| 1000900012 | 网络问题或服务异常 | 检查网络连接，稍后重试 |
| 1000900013 | 请求超时 | 增加超时时间或检查网络状况 |

> 完整错误码列表请参考 `references/push-error-codes.md`
```

---

### 第四步：生成代码

当开发者准备好后，生成完整的 Push Token 获取代码。根据华为官方文档，以下是获取 Push Token 的标准代码：

#### 4.1 在 EntryAbility 中添加 Token 获取

**代码位置**：`src/main/ets/entryability/EntryAbility.ets`

```typescript
import { pushService } from '@kit.PushKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { UIAbility, AbilityConstant, Want } from '@kit.AbilityKit';

export default class EntryAbility extends UIAbility {
  // 入参want与launchParam并未使用，为初始化项目时自带参数
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    // 获取Push Token
    pushService.getToken().then((token: string) => {
      hilog.info(0x0000, 'testTag', 'Succeeded in getting push token');
      
      // TODO: 将 Token 上报到您的服务器
      // 这是必需的步骤：服务器需要保存 Token 才能向设备发送推送
      this.reportTokenToServer(token);
      
    }).catch((err: BusinessError) => {
      hilog.error(0x0000, 'testTag', 'Failed to get push token: %{public}d %{public}s', err.code, err.message);
    });
  }

  /**
   * 将 Token 上报到开发者服务器
   * @param token 获取到的 Push Token
   */
  reportTokenToServer(token: string): void {
    hilog.info(0x0000, 'testTag', 'Reporting token to server');
    
    // 在这里实现上报 Token 到服务器的代码
  }
}
```

> **参考**：华为官方文档 - [获取Push Token](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/push-get-token)

#### 4.2 解释代码的作用

**逐段解释**：

| 代码段 | 作用 | 为什么需要 |
|-------|------|----------|
| `import { pushService }` | 导入华为推送服务模块 | 调用 getToken 的前提 |
| `import { hilog }` | 导入日志模块 | 用于调试和问题排查 |
| `import { BusinessError }` | 导入错误类型 | 处理调用失败的情况 |
| `pushService.getToken()` | 调用华为 API 获取 Token | 这是获取 Token 的唯一方式 |
| `.then((token) => {...})` | 成功回调 | Token 获取成功后执行 |
| `.catch((err) => {...})` | 失败回调 | 处理错误情况 |
| `reportTokenToServer()` | 上报 Token 到服务器 | 服务器需要 Token 才能发送推送 |
| `handleTokenError()` | 错误处理 | 针对性处理不同错误码 |

#### 4.3 提醒开发者必须完成的上报步骤

```
⚠️ 重要提醒：获取 Token 后必须上报到您的服务器！

Push Token 的用途是让您的服务器能够向设备发送推送消息。
如果您只获取了 Token 但没有上报给服务器，那么服务器无法向设备推送消息。

您需要：
1. 在服务器端创建存储 Token 的数据库或缓存
2. 在客户端获取 Token 后立即发送到服务器
3. 在 Token 变化时（重新安装、清空数据等）更新服务器端的 Token

常见的 Token 变化场景：
- 用户卸载重装应用
- 用户清空应用数据
- 应用签名发生变化
- 设备恢复出厂设置
```

---

### 第五步：验证功能

生成代码后，指导开发者验证功能是否正常。

#### 5.1 运行应用查看日志

```
请按以下步骤验证 Token 获取是否成功：

1. 使用调试证书重新签名并编译应用
2. 在设备上安装并启动应用
3. 打开 DevEco Studio 的 Log 窗口
4. 过滤日志标签 "PushToken"
5. 查看是否有类似以下日志：
   - "Succeeded in getting push token: AIbSy2Q6...（Token 值）"
   - "Get token failed, err: xxx ..."（如果失败）
```

#### 5.2 成功标志

**成功的日志示例**：
```
[PushToken] Succeeded in getting push token: AIbSy2Q6...
```

**常见错误及解决方案**：

| 错误日志 | 错误原因 | 解决方案 |
|---------|---------|----------|
| `Get token failed, err: 1000900010...` | 推送服务未开通或签名问题 | 检查 AppGallery Connect 中推送服务是否开通，重新生成 Profile |
| `Get token failed, err: 12010001...` | 应用配置错误 | 检查 AppGallery Connect 中的应用配置 |
| 没有任何日志 | 代码未执行或应用未重新编译 | 确认应用已重新编译并安装 |

---

## 进阶功能：当开发者已有 Token 时

### 场景一：从日志中提取 Token

如果开发者在日志中看到了 Token（但没有保存），指导他们如何从设备中获取：

```
在您的日志中应该可以看到类似以下的日志：
"Succeeded in getting push token: AIbSy2Q6..."

这个就是您的 Push Token。请告诉我：
1. 这是什么环境的 Token？（调试环境还是发布环境？）
2. 您打算怎么使用它？（发送测试推送？）

注意：调试环境和发布环境的 Token 是不同的！
```

### 场景二：从现有代码中查找

指导开发者如何在项目中找到已有的 Token 获取代码：

```
请在您的项目中搜索以下模式：

1. 全局搜索 "getToken"：
   - 在 IDE 中使用 Ctrl+Shift+F（或 Cmd+Shift+F）
   - 搜索 "pushService.getToken"

2. 查看 EntryAbility 或 MainAbility：
   - 应用的入口 Ability 通常在这里调用 getToken

3. 找到后，告诉我：
   - Token 获取后是如何处理的
   - 是否有上报到服务器的逻辑
   - 是否有错误处理
```

---

## 常见问题解答

### Q1: 为什么我调用 getToken() 总是失败？

**A**: 最常见的原因是：
1. **推送服务未开通**：必须在 AppGallery Connect 中开通推送服务
2. **签名配置问题**：Profile 文件需要包含推送服务权限
3. **Profile 未更新**：开通推送服务后需要重新生成 Profile

**解决方案**：
1. 确认推送服务已开通（增长 > 推送服务）
2. 重新生成 Profile 文件（确保包含推送权限）
3. 重新签名并编译应用

### Q2: Token 会过期吗？

**A**: Token 本身不会过期，但以下情况会导致 Token 变化：
- 应用卸载重装
- 应用数据被清除
- 应用签名发生变化
- 设备恢复出厂设置

**建议**：在应用启动时总是获取最新 Token，并及时更新到服务器。

### Q3: 多个设备会有多个 Token 吗？

**A**: 是的，每台设备的每个应用都有不同的 Token。

### Q4: 我需要把 Token 存在客户端吗？

**A**: 不建议。Token 应该由服务器存储和管理，客户端只需要在获取后立即上报给服务器。

---

## ⚠️ 重要：多个场景化消息的配置

**如果您计划后续还要接入其他消息类型（通知消息/voip/后台消息），请注意以下事项**：

根据华为官方文档，一个项目中**有且只能有一个 ability** 配置 `action.ohos.push.listener`。

**这意味着**：
- 不要为每种消息类型创建单独的 Ability
- 所有的 `receiveMessage` 注册应该放在**同一个 Ability** 中
- 建议提前规划，统一创建一个 `PushMessageAbility` 来处理所有消息接收

**建议的项目结构**：
```
src/main/ets/
├── entryability/
│   └── EntryAbility.ets        # 主 Ability，获取 Token
└── abilities/
    └── PushMessageAbility.ets  # 统一处理所有消息接收
```

**后续接入其他消息类型时**：
- 无需创建新的 Ability
- 直接在已有的 PushMessageAbility 中添加 receiveMessage 即可
- module.json5 中只需要配置一个 ability 包含 `action.ohos.push.listener`

---

## 代码生成规则

生成代码时必须遵循：
1. 使用正确的导入路径：`@kit.PushKit`、`@kit.BasicServicesKit`
2. 所有 ArkTS 类型注解必须正确
3. 使用 Promise 处理异步操作
4. 添加适当的错误处理和日志记录
5. 在关键步骤添加 TODO 注释提醒开发者补充业务逻辑
6. 生成的代码必须能够直接编译通过

---

## 错误码解释

当开发者在接入 Push Token 时遇到错误码，可以参考以下解释：

### 常见 Token 获取错误码

| 错误码 | 错误信息 | 可能原因 | 解决方法 |
|-------|---------|---------|---------|
| 1000900010 | 参数错误 | 推送服务未开通或签名配置错误 | 检查 AppGallery Connect 是否开通推送服务，检查签名配置 |
| 1000900011 | Token无效 | 应用签名不匹配 | 重新配置应用签名，确保与 AppGallery Connect 中的一致 |
| 1000900012 | 服务不可用 | 网络问题或服务异常 | 检查网络连接，稍后重试 |
| 1000900013 | 超时 | 请求超时 | 增加超时时间或检查网络状况 |
| 1000900014 | 权限不足 | 未配置必要权限 | 检查 module.json5 中的权限配置 |

### 快速诊断步骤

```
遇到 Token 获取错误时，请按以下步骤排查：

1. 检查推送服务是否开通
   - 登录 AppGallery Connect
   - 进入「增长 > 推送服务」
   - 确认已点击「立即开通」

2. 检查应用签名配置
   - 在 DevEco Studio 中检查签名配置
   - 确保与 AGC 中配置的签名证书一致

3. 检查调试设备是否注册
   - 在 DevEco Studio 中注册调试设备
   - 确保设备已连接并被识别

4. 检查网络连接
   - 确保设备已连接互联网
   - 尝试切换网络后重试
```

> **完整错误码列表**：请参考 `references/push-error-codes.md`