---
name: hmos-push-kit-notification
description: |
  发送通知消息助手。当开发者需要实现推送通知功能、发送消息提醒、配置通知样式或点击动作时触发。
  
  ============================================================
  触发条件（只有满足以下意图时才触发）：
  ============================================================
  
  ✅ 正确触发场景：
  - "帮我在项目中接入推送通知"
  - "实现推送消息功能"
  - "添加推送消息功能"
  - "接入通知消息"
  - "发送通知消息"
  - "配置推送前台接收"
  
  ❌ 不触发场景：
  - 询问/概念："通知消息是什么"、"推送有啥优点"
  - 否定意图："不需要通知消息"
  - 仅输入关键词："通知"、"推送消息"
  - 测试/调试："测试推送通知"
  - 问题排查："推送失败"、"通知异常"
  - 带引号输入："推送通知"
  - 配置咨询："通知怎么配置"

  此 Skill 专注于帮助开发者实现通知消息的发送和配置。
  
  前置检查：
  - 在继续之前，会自动检查开发者是否已接入Push Token
  - 如果未接入Token，会引导开发者先使用 hmos-push-kit-token Skill
---

# 发送通知消息助手

本 Skill 帮助开发者实现华为推送通知功能。在开始发送通知消息开发之前，需要先确认 Push Token 的状态。

---

## ⚠️ AI 必做检查清单（强制检查）

> **AI 必须在开始开发前逐一确认以下所有项目，确保不遗漏任何关键步骤！**

### 接入通知消息必须完成的文件清单：

| 序号 | 必做项 | 文件路径 | 用途 |
|-----|-------|---------|-----|
| ☐ 1 | 请求通知授权 | EntryAbility.ets 中调用 `requestEnableNotification()` | **用户点击"允许"后才能收到通知** ⭐ |
| ☐ 2 | 配置 skills（点击首页） | `src/main/module.json5` | 配置 entity.system.home + ohos.want.action.home |
| ☐ 3 | 配置 action.ohos.push.listener | `src/main/module.json5` | **用于接收前台通知消息** ⭐ |
| ☐ 4 | 创建 PushMessageAbility | `src/main/ets/abilities/PushMessageAbility.ets` | **调用 receiveMessage('DEFAULT', ...) 接收前台消息** ⭐ |
| ☐ 5 | 确认已开通推送服务 | AppGallery Connect | ⭐必须已开通 |
| ☐ 6 | 申请消息自分类权益（如需） | AppGallery Connect | 申请 IM/VOIP/TRAVEL/HEALTH/WORK 分类 |

> **⚠️ 默认配置说明**：接入通知消息时，前台消息接收是**默认必须**配置的。原因是：
> - 应用在前台时，如果设置 `foregroundShow: true`，通知会在通知栏显示，可能影响用户体验
> - 通过配置 `action.ohos.push.listener` 并设置 `foregroundShow: false`，可以在前台静默接收消息
> - **因此，接入通知消息时，前台接收功能是默认必须配置的**
>
> **特别注意**：
> - `requestEnableNotification()` **必须**放在 `onWindowStageCreate()` 的 `loadContent` 回调中调用，不能放在 `onCreate()` 中！

---

## Token 接入检测与处理流程

### 第一步：AI 自动检测（默认执行）

AI 首先自动检查项目中是否已经接入了 Push Token：

**检测内容**：
1. 搜索项目中是否引入了 `@kit.PushKit`
2. 搜索是否调用了 `pushService.getToken()`
3. 检查是否在 `onCreate()` 生命周期中获取 Token
4. 检查是否有将 Token 上报到服务器的逻辑

### 第二步：根据检测结果处理

| 检测结果 | 处理方式 |
|---------|---------|
| ✅ **已接入 Token** | 直接进入通知消息开发流程 |
| ❌ **未接入 Token** | **参考 token skill 代码，直接帮开发者接入** |

### 第三步：未接入 Token 时直接接入（参考 hmos-push-kit-token Skill 的代码）

**当 AI 确定项目未接入 Token 时，参考 token skill 的标准代码帮开发者接入**：

**参考以下代码模板，将相关 import 和方法添加到 EntryAbility.ets 中**：

```typescript
import { pushService } from '@kit.PushKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { BusinessError } from '@kit.BasicServicesKit';
// 其他 import 如果已有则不需要重复添加

export default class EntryAbility extends UIAbility {
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    // 将 getToken 调用添加到现有 onCreate 逻辑中
    pushService.getToken().then((token: string) => {
      hilog.info(0x0000, 'testTag', 'Succeeded in getting push token');
      this.reportTokenToServer(token);
    }).catch((err: BusinessError) => {
      hilog.error(0x0000, 'testTag', 'Failed to get push token: %{public}d %{public}s', err.code, err.message);
    });
  }

  // 如果已有此方法，需要合并 Token 上报逻辑
  reportTokenToServer(token: string): void {
    hilog.info(0x0000, 'testTag', 'Reporting token to server');
    // TODO: 将 Token 上报到您的服务器（必需步骤）
  }
}
```

**⚠️ 重要**：
- 保持原有代码不变，只添加 Token 相关逻辑
- 合并到现有 onCreate 和 reportTokenToServer 中

**说明提醒事项**：
- 告知开发者必须将 Token 上报到服务器
- 服务器需要保存 Token 才能向设备发送推送

**完成 Token 接入后**：继续执行通知消息开发流程

```
┌─────────────────────────────────────────────────────────────────────┐
│            未接入 Token 时的处理流程                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. AI 自动检测到项目未接入 Token                                    │
│                                                                     │
│  2. ⭐ 参考 hmos-push-kit-token Skill 的代码                        │
│     - 添加缺失的 import                                            │
│     - 将 getToken 调用合并到现有 onCreate 中                        │
│     - 合并或添加 reportTokenToServer() 方法                         │
│                                                                     │
│  3. 接入完成后，自动继续通知消息开发                                  │
│     - 配置 requestEnableNotification                                │
│     - 创建 PushMessageAbility                                       │
│     - 配置 skills 等                                                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

> **说明**：AI 不再需要切换到 hmos-push-kit-token Skill，而是直接在本 Skill 中完成 Token 接入，然后再继续通知消息的开发。

---

## 通知消息开发步骤

当确认有有效 Token 后，按照以下步骤开发通知消息：

```
┌─────────────────────────────────────────────────────────────────────┐
│                    通知消息开发流程                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Step 1: 请求用户通知授权 ⭐必做                                      │
│     └── 在 EntryAbility 的 onWindowStageCreate() 中调用             │
│     └── requestEnableNotification() 在 loadContent 回调中          │
│                                                                     │
│  Step 2: 配置 skills 点击首页 ⭐必做                                 │
│     └── 配置 entity.system.home + ohos.want.action.home            │
│                                                                     │
│  Step 3: 配置 action.ohos.push.listener ⭐必做                      │
│     └── 在 module.json5 中添加该 action                             │
│     └── 用于前台静默接收通知消息                                      │
│                                                                     │
│  Step 4: 创建 PushMessageAbility ⭐必做                             │
│     └── 调用 pushService.receiveMessage('DEFAULT', ...)            │
│     └── 在 onCreate() 中同步调用接收消息                             │
│                                                                     │
│  Step 5: 开通推送服务和申请权益                                       │
│     └── 在 AppGallery Connect 完成                                  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Step 1: 请求用户通知授权 ⭐必做

### 为什么要请求通知授权？

根据 HarmonyOS 规范，应用在发送通知前需要获得用户的明确同意。这是系统级别的安全要求。

```
⚠️ 重要提示：
- 应用在发送任何通知之前必须先获取用户授权
- 如果未获取授权，通知消息将无法正常显示
- 建议在应用首次启动时请求授权，并保存授权状态
```

### 生成请求通知授权代码

> **⚠️ 重要：`requestEnableNotification()` 必须放在 `onWindowStageCreate()` 中调用！**

**原因**：
- 必须等页面加载完成后再弹出权限授权对话框
- 如果在 `onCreate()` 中调用，页面还未加载，用户体验不好
- 系统要求在页面渲染完成后再请求通知权限

**代码位置**：`src/main/ets/entryability/EntryAbility.ets`

```typescript
import { BusinessError } from '@kit.BasicServicesKit';
import { UIAbility } from '@kit.AbilityKit';
import { window } from '@kit.ArkUI';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { notificationManager } from '@kit.NotificationKit';

export default class EntryAbility extends UIAbility {
  onWindowStageCreate(windowStage: window.WindowStage): void {
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageCreate');
    windowStage.loadContent('pages/Index', (err, data) => {
      if (err.code) {
        hilog.error(0x0000, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
        return;
      }
      hilog.info(0x0000, 'testTag', 'Succeeded in loading the content. Data: %{public}s', JSON.stringify(data) ?? '');
      
      // ✅ 重要：必须在页面加载完成后再请求通知权限
      // 放在 loadContent 的回调中，确保页面渲染完成后再弹出授权对话框
      notificationManager.requestEnableNotification(this.context).then(() => {
        hilog.info(0x0000, 'testTag', `[ANS] requestEnableNotification success`);
      }).catch((err: BusinessError) => {
        hilog.error(0x0000, 'testTag',
          `[ANS] requestEnableNotification failed, code is ${err.code}, message is ${err.message}`);
      });
    });
  }
}
```

> **参考**：华为官方文档 - [发送通知消息](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/push-send-alert)

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ⚠️ 放置位置注意                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ❌ 不要放在 onCreate() 中                                         │
│  ✅ 必须放在 onWindowStageCreate() 中，且在 loadContent 回调中调用 │
│                                                                     │
│  原因：                                                              │
│  1. onCreate() 时页面尚未加载完成                                    │
│  2. 用户看到空白页面突然弹出授权对话框，体验极差                      │
│  3. 系统要求页面渲染完成后再请求权限                                  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Step 2: 配置 Skills - 点击通知进入应用首页 ⭐必做

### 为什么要配置 Skills？

Skills 标签定义了应用能够处理的消息类型和跳转路径。当用户点击通知消息时，系统需要知道：
1. 点击后应该打开哪个页面
2. 页面应该显示什么内容

根据华为官方文档，点击通知消息有两种跳转场景，需要配置不同的 skills：

---

### 场景一：点击通知进入应用首页

**服务端设置**：`actionType: 0`

**module.json5 配置**：
```json5
{
  "module": {
    // ...
    "abilities": [
      {
        "name": "TestAbility",
        "srcEntry": "./ets/abilities/TestAbility.ets",
        "exported": false,
        "startWindowIcon": "$media:startIcon",
        "startWindowBackground": "$color:start_window_background",
        "skills": [
          // 该skill标识应用首页，不要配置uris
          {
            "entities": [
              "entity.system.home"
            ],
            "actions": [
              // "action.system.home"为API19以下版本配置，已废弃
              "ohos.want.action.home"
            ]
          },
          // 其他skill配置
          {}
        ]
      }
    ]
  }
}
```

**关键点**：
- `entities` 设置为 `entity.system.home`
- `actions` 设置为 `ohos.want.action.home`
- **不要配置 uris**，否则消息会接收不到

---

## Step 3: 配置 Skills - 点击通知进入应用内页（可选）

### 场景二：点击通知进入应用内页

**服务端设置**：`actionType: 1`

有两种配置方式：

**方式一：配置 actions 参数（推荐）**

```json5
{
  "name": "TestAbility",
  "srcEntry": "./ets/abilities/TestAbility.ets",
  "exported": false,
  "startWindowIcon": "$media:startIcon",
  "startWindowBackground": "$color:start_window_background",
  "skills": [
    // 保持现有skill对象不变
    {
      "actions": [
        "com.app.action"
      ]
    },
    // 新增一个独立的skill对象，配置actions参数
    {
      "actions": [
        "com.test.action"
      ]
    }
  ]
}
```

**方式二：配置 uris 参数**

```json5
{
  "name": "TestAbility",
  "srcEntry": "./ets/abilities/TestAbility.ets",
  "exported": false,
  "startWindowIcon": "$media:startIcon",
  "startWindowBackground": "$color:start_window_background",
  "skills": [
    // 保持现有skill对象不变
    {
      "actions": [
        "com.app.action"
      ]
    },
    // 新增一个独立的skill对象，配置uris参数，且必须同时配置actions参数，actions参数为空字符串
    {
      "actions": [""],
      "uris": [
        {
          "scheme": "https",
          "host": "www.xxx.com",
          "port": "8080",
          "path": "push/test"
        }
      ]
    }
  ]
}
```

> **参考**：华为官方文档 - [点击消息动作](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/push-send-alert#点击消息动作)

---

## Step 4: 配置 action.ohos.push.listener ⭐必做

### 前台消息处理说明

> **⚠️ 默认配置**：本 Skill 默认配置前台消息接收。需要在服务端设置 `foregroundShow` 为 `false`，这样应用在前台时可以静默接收消息而不展示通知栏。

**服务端设置**：

```json
{
  "payload": {
    "notification": {
      "category": "IM",
      "title": "您有新消息",
      "body": "来自朋友的消息",
      "foregroundShow": false
    }
  },
  "target": {
    "token": ["MAMzLg**********lPW"]
  }
}
```

**参数说明**：
- `foregroundShow: true`（默认）：前后台都展示通知
- `foregroundShow: false`：仅在后台展示通知，前台不展示但可接收消息

---

## Step 5: 创建 PushMessageAbility 接收前台消息 ⭐必做

### 配置 module.json5

需要在 abilities 中配置 skills，用于接收前台通知消息：

```json5
{
  "name": "PushMessageAbility",
  "srcEntry": "./ets/abilities/PushMessageAbility.ets",
  "launchType": "singleton",
  "startWindowIcon": "$media:startIcon",
  "startWindowBackground": "$color:start_window_background",
  "exported": false,
  "skills": [
    // 保持现有skill对象不变
    {
      "actions": [
        "com.app.action"
      ]
    },
    // 新增一个独立的skill对象，配置actions参数
    {
      "actions": [
        "action.ohos.push.listener"
      ]
    }
  ]
}
```

> **⚠️ 配置警告**：
> - **label 字段**：默认**不要添加**！如果需要添加，必须使用 `$string:xxx` 格式，并在 `string.json` 中添加资源名
> - **description 字段**：可以使用普通字符串，也可以不添加
> - **⭐ startWindowIcon 和 startWindowBackground 字段**：**必须填写**，不能遗漏！
>   - `startWindowIcon`：应用启动图标，如 `$media:startIcon`
>   - `startWindowBackground`：启动背景色，如 `$color:start_window_background`
>   - 如果遗漏会导致应用无法正常启动
>
> 错误示例（会编译报错）：
> ```json5
> {
>   "label": "PushMessageAbility"  // ❌ 错误！必须用 $string:xxx 格式
> }
> ```

**关键点**：
- `actions` 设置为 `action.ohos.push.listener`
- `launchType` 设置为 `singleton`
- **项目中只能有一个 ability 定义该 action**
- **label 字段**：默认不添加，如果添加必须用 `$string:xxx` 格式
- **description 字段**：可以使用普通字符串，也可以不添加

### 创建消息接收 Ability

**文件位置**：`src/main/ets/abilities/PushMessageAbility.ets`

```typescript
import { UIAbility } from '@kit.AbilityKit';
import { pushService } from '@kit.PushKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { hilog } from '@kit.PerformanceAnalysisKit';

/**
 * 此处以PushMessageAbility为例，用于应用在前台时接收通知消息
 */
export default class PushMessageAbility extends UIAbility {
  onCreate(): void {
    try {
      // receiveMessage中的参数固定为DEFAULT
      pushService.receiveMessage('DEFAULT', this, (payload) => {
        try {
          // 获取服务端传递的数据
          const data: string = payload.data;
          // TODO：业务自行处理
          hilog.info(0x0000, 'testTag', 'Succeeded in getting notification,data=%{public}s',
            JSON.stringify(JSON.parse(data)?.notification));
        } catch (e) {
          let errRes: BusinessError = e as BusinessError;
          hilog.error(0x0000, 'testTag', 'Failed to process data: %{public}d %{public}s',
            errRes.code, errRes.message);
        }
      });
    } catch (err) {
      let e: BusinessError = err as BusinessError;
      hilog.error(0x0000, 'testTag', 'Failed to get message: %{public}d %{public}s', e.code,
        e.message);
    }
  }
}
```

**代码说明**：

| 代码段 | 作用 |
|-------|------|
| `pushService.receiveMessage('DEFAULT', ...)` | 注册接收通知消息 |
| `'DEFAULT'` | 固定值，表示通知消息类型 |
| `payload.data` | 包含通知消息内容的 JSON 字符串 |

> **⚠️ 重要**：
> - UIAbility.onCreate 是同步接口，不支持异步回调
> - `pushService.receiveMessage()` 必须在 onCreate 入口同步调用
> - 不能在注册前等待异步方法执行

> **参考**：华为官方文档 - [应用在前台时处理通知消息](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/push-send-alert#应用在前台时处理通知消息)

---

## 服务端推送示例

### 请求示例

```json
// Request URL
POST "https://push-api.cloud.huawei.com/v3/[projectId]/messages:send"

// Request Header
"Content-Type": application/json"
"Authorization: Bearer eyJr*****OiIx---****.eyJh*****iJodHR--***.QRod*****4Gp---****"
"push-type: 0"

// Request Body
{
  "payload": {
    "notification": {
      "category": "IM",
      "title": "通知标题",
      "body": "通知内容",
      "clickAction": {
        "actionType": 0
      },
      "foregroundShow": true,
      "notifyId": 12345
    }
  },
  "target": {
    "token": ["MAMzLg**********lPW"]
  },
  "pushOptions": {
    "testMessage": true,
    "ttl": 86400
  }
}
```

### 参数说明

| 参数 | 说明 |
|-----|------|
| push-type | 0 表示通知消息 |
| category | 消息分类：IM/VOIP/TRAVEL/HEALTH/WORK/MARKETING |
| foregroundShow | 应用在前台时是否展示通知 |
| notifyId | 消息ID，用于消息撤回 |
| testMessage | 测试消息标识，绕过频控 |

---

## ⚠️ 重要：多个场景化消息的配置

**如果您需要同时接入通知消息、voip、后台消息，必须注意以下事项**：

根据华为官方文档，一个项目中**有且只能有一个 ability** 配置 `action.ohos.push.listener`。

**这意味着**：
- 不要为每种消息类型创建单独的 Ability
- 所有的 `receiveMessage` 注册应该放在**同一个 Ability** 中
- module.json5 中只配置一个 ability 包含 `action.ohos.push.listener`

**⚠️ 特别提醒：接入 voip 或后台消息时，请加载对应的专门 Skill**

虽然同一个 Ability 中可以注册多种消息类型，但 **每种消息类型都有各自完整的开发流程和注意事项**，不能互相替代：

- **通知消息**：调用 `receiveMessage('DEFAULT', ...)`，配合 `requestEnableNotification()` 授权
- **voip 消息**：调用 `receiveMessage('VoIP', ...)`，还需要创建 VoipCallService、CalleePage 页面、注册 voipCallUiEvent 事件、上报来电状态等完整流程
- **后台消息**：调用 `receiveMessage('BACKGROUND', ...)`，还需要实现数据静默更新和缓存策略

因此：
- 接入 **voip 消息** → 请加载 **hmos-push-kit-voip** Skill
- 接入**后台消息** → 请加载 **hmos-push-kit-background** Skill
- **不要**仅凭本 skill 中关于"同一 ability 接收多种消息类型"的说明就自行编写 voip 或后台消息代码

**⚠️ 示例：不能这样做**

以下示例展示的是**错误做法**——仅凭 notification skill 的说明就自行添加 voip 代码：

```typescript
// ❌ 错误示例：仅凭 notification skill 的说明就自行添加 voip 代码
pushService.receiveMessage('VoIP', this, (payload) => {
  // 没有创建 VoipCallService
  // 没有创建 CalleePage 页面
  // 没有注册 voipCallUiEvent 事件监听
  // 没有上报来电状态
  // voip 有完整独立的开发流程，必须参考专门的 voip skill
});
```

**正确做法**：请明确告诉我"需要接入 voip 消息"，我会加载 voip skill，在本项目的同一个 PushMessageAbility 中添加 voip 接收逻辑。

---

## 代码生成规则

生成代码时必须遵循：
1. 使用正确的导入路径：`@kit.NotificationKit`、`@kit.BasicServicesKit`
2. 所有 ArkTS 类型注解必须正确
3. 添加适当的错误处理和日志记录
4. 生成的代码必须能够直接编译通过
5. 遵守 HarmonyOS 应用开发规范

---

## 常见问题排查

| 问题 | 可能原因 | 解决方案 |
|-----|---------|---------|
| 通知不显示 | 未调用 requestEnableNotification() | 在 onWindowStageCreate() 的 loadContent 回调中调用 |
| 前台收不到消息 | foregroundShow 未设置为 false | 服务端设置 `foregroundShow: false` |
| 前台收不到消息 | skills 未配置正确 | 检查 module.json5 中 skills 是否包含 `action.ohos.push.listener` |
| 收到多条消息 | 多个 ability 都配置了相同 action | 确保只有一个 ability 配置该 action |
| 消息数据为空 | 未正确解析 JSON | 检查 payload.data 的解析方式 |
| 每天只能发2-5条 | 未申请消息自分类权益 | 在 AppGallery Connect 申请 IM/VOIP/TRAVEL/HEALTH/WORK 分类 |

---

## 常见错误码

接入通知消息后，如遇到以下错误码，请参考：

| 错误码 | 可能原因 | 解决方法 |
|-------|---------|---------|
| 1000900010 | 推送服务未开通 | 在 AppGallery Connect 开通推送服务 |
| 1000900011 | 应用签名不匹配 | 检查签名配置是否正确 |
| 1000900012 | 网络问题 | 检查网络连接 |
| 1000900013 | 请求超时 | 增加超时时间或检查网络 |
| 1000900014 | 权限不足 | 检查 module.json5 权限配置 |
| 1000900001 | 推送服务内部错误 | 重试或联系华为支持 |
| 1000900002 | 参数错误 | 检查请求参数是否正确 |
| 1000900003 | Token 无效 | 检查 Token 是否正确 |

> 完整错误码列表请参考 `references/push-error-codes.md`

---

## ✅ AI 开发完成后的自检清单

> **AI 必须在完成通知消息接入开发后，逐项确认以下所有内容：**

### 通知授权检查：
- [ ] EntryAbility.ets 中已调用 `requestEnableNotification()` ⭐重点
- [ ] 调用位置在 `onWindowStageCreate()` 的 `loadContent` 回调中 ⭐重点
- [ ] **不是**在 `onCreate()` 中调用

### Skills 配置检查：
- [ ] 点击首页：skills 配置包含 `entity.system.home` + `ohos.want.action.home` ⭐重点
- [ ] 前台接收：skills 配置包含 `action.ohos.push.listener` ⭐重点

### PushMessageAbility 检查：
- [ ] `src/main/ets/abilities/PushMessageAbility.ets` 已创建 ⭐重点
- [ ] `pushService.receiveMessage('DEFAULT', ...)` 已在 onCreate() 中同步调用 ⭐重点
- [ ] ability 的 launchType 设置为 `singleton`

### 权益检查：
- [ ] 已在 AppGallery Connect 开通推送服务 ⭐
- [ ] 已申请通知消息自分类权益（如需要发送 IM/VOIP/TRAVEL/HEALTH/WORK 类）

### 服务端参数检查：
- [ ] category 参数正确设置
- [ ] foregroundShow 参数设置为 false（前台静默接收）⭐重点
- [ ] actionType 参数正确设置（0=首页，1=内页）

### module.json5 配置检查：
- [ ] skills 配置正确（首页/内页/前台接收）
- [ ] **label 字段**：默认不添加，如果添加必须用 `$string:xxx` 格式
- [ ] description 字段：可以使用普通字符串，也可以不添加
- [ ] 如果添加了 label，确认已在 `string.json` 中添加对应资源名

---

> **⚠️ 如果 AI 遗漏了上述任何一项（特别是 ⭐重点 标记的项目），请立即补充！**

---

## ⚠️ 重要提醒汇总

> **⭐ 接入通知消息完成后，请务必逐项完成以下所有提醒事项！**

```
┌─────────────────────────────────────────────────────────────────────┐
│       ⭐ 重要：接入通知消息后必须完成的权益申请和Token上报            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  【权益申请 - 必须完成】⭐                                            │
│                                                                     │
│  1. 开通推送服务（必须）⭐                                            │
│     您必须前往 AppGallery Connect 开通推送服务，否则无法获取有效 Token │
│     参考文档：                                                       │
│     https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/push-config-setting  │
│                                                                     │
│  2. 申请消息自分类权益（如需发送 IM/VOIP/TRAVEL/HEALTH/WORK）⭐       │
│     未申请时默认为「资讯营销类」消息，会受到「每日每设备 2-5 条」限制  │
│     参考文档：                                                       │
│     https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/push-apply-right  │
│                                                                     │
│  ───────────────────────────────────────────────────────────────    │
│                                                                     │
│  【Token 上报 - 必须完成】⭐                                          │
│                                                                     │
│  ⚠️ 如果本次接入过程中，因项目未接入Token而自动帮您接入了Token，       │
│     您必须完成以下工作：                                              │
│                                                                     │
│  在本次接入过程中，AI 已自动将 `getToken()` 调用添加到您的项目中。    │
│  但是 `reportTokenToServer()` 方法中的上报逻辑尚未完成！              │
│                                                                     │
│  您必须实现 Token 上报到服务器的逻辑：                                │
│                                                                     │
│  ```typescript                                                      │
│  reportTokenToServer(token: string): void {                         │
│    hilog.info(0x0000, 'testTag', 'Reporting token to server: %{public}s', token);    │
│    // TODO: 将 Token 上报到您的服务器（必需步骤）                      │
│  }                                                                   │
│  ```                                                                 │
│                                                                     │
│  ⚠️ 重要提示：完成 Token 上报后，您的推送功能才能真正工作！            │
│                                                                     │
│  ───────────────────────────────────────────────────────────────    │
│                                                                     │
│  【频控规则】                                                        │
│  • 调测阶段：每个项目每日全网最多可推送1000条测试消息，                 │
│    发送测试消息需设置testMessage为true                                │
│  • 正式发布阶段：单设备单应用下每日推送消息总条数受设备消息频控限制     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

> **⚠️ 请务必完成上述所有提醒事项，遗漏任何一项都可能导致推送功能无法正常工作！**
