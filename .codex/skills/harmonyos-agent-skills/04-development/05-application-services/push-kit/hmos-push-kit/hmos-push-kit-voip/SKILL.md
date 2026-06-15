---
name: hmos-push-kit-voip
description: |
  推送应用内通话消息助手（VOIP）。当开发者需要实现语音/视频来电通知、voip功能、或呼叫接听界面时触发。

  ============================================================
  触发条件（只有满足以下意图时才触发）：
  ============================================================

  ✅ 正确触发场景：
  - "帮接入voip消息"
  - "实现语音来电通知"
  - "添加推送应用内通话消息功能"
  - "接入视频通话功能"
  - "应用内通话消息"
  - "voip呼叫接听界面"
  - "需要接入voip功能"

  ❌ 不触发场景：
  - 询问/概念："voip是什么"、"语音通话怎么实现"
  - 否定意图："不需要voip"
  - 仅输入关键词："voip"、"通话"
  - 测试/调试："voip测试"
  - 带引号输入："voip"、"语音通话"
  - 配置咨询："voip怎么配置"

  ⚠️ 重要提醒：
  - 只要需要接入 voip 功能，**必须加载本 skill**
  - 本 skill 提供完整的 voip 接入指导，包括 VoipCallService、CalleePage、CallComponent 等组件的创建
  - voip 接入涉及来电处理、呼叫界面、状态上报等完整流程，不能凭其他 skill 的通用说明（如"同一 ability 接收多种消息类型"）自行编写

  此 Skill 专注于帮助开发者实现应用内通话消息的推送功能。
---

# 推送应用内通话消息助手（voip）

本 Skill 帮助开发者实现华为推送应用内通话消息功能。

---

## ⚠️ AI 必做检查清单（强制检查）

> **AI 必须在开始开发前逐一确认以下所有项目，确保不遗漏任何关键步骤！**

### 接入 voip 消息必须完成的文件清单：

| 序号 | 必做项 | 文件路径 | 用途 |
|-----|-------|---------|-----|
| ☐ 1 | 创建 PushMessageAbility | `src/main/ets/entryability/PushMessageAbility.ets` | 处理应用内通话消息主流程 |
| ☐ 2 | 创建 VoipCallService | `src/main/ets/service/VoipCallService.ets` | 处理来电逻辑，上报通话状态 |
| ☐ 3 | 创建视频接听页面 | `src/main/ets/pages/CalleePage.ets` | **视频接听页面，用户接听时拉起** |
| ☐ 4 | 创建呼叫控制组件 | `src/main/ets/component/CallComponent.ets` | 接听/挂断按钮UI |
| ☐ 5 | 添加头像图片 | `src/main/resources/rawfile/example.png` | 来电时显示的用户头像 |
| ☐ 6 | 配置 main_pages.json | `src/main/resources/base/profile/main_pages.json` | 添加 CalleePage 页面 |
| ☐ 7 | 配置 module.json5 | `src/main/module.json5` | 添加 actions 配置 |
| ☐ 8 | 确认已开通推送服务 | AppGallery Connect | ⭐必须已开通 |
| ☐ 9 | 确认已申请 voip 权益 | AppGallery Connect | ⭐必须已申请 |

> **⚠️ 特别注意**：视频接听页面（CalleePage）是**必须**创建的，否则用户在解锁状态下点击视频接听时会找不到页面！即使只做语音通话，也建议创建该页面以备将来扩展。

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
| ✅ **已接入 Token** | 直接进入 voip 消息开发流程 |
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

**完成 Token 接入后**：继续执行 voip 消息开发流程

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
│  3. 接入完成后，自动继续 voip 消息开发                               │
│     - 创建 PushMessageAbility                                            │
│     - 创建 VoipCallService                                          │
│     - 配置视频接听页面等                                             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

> **说明**：AI 不再需要切换到 hmos-push-kit-token Skill，而是直接在本 Skill 中完成 Token 接入，然后再继续 voip 消息的开发。

---

## voip 开发步骤

按照华为官方文档，开发步骤如下：

### 步骤一：获取 Push Token（已在上面流程中完成）

如果 AI 检测到未接入 Token，已经在前面流程中完成了 Token 接入，请继续下一步。

### 步骤二：创建 PushMessageAbility

在您的工程内创建一个UIAbility类型的组件，如PushMessageAbility.ets（在项目工程的 `src/main/ets/entryability` 目录下），负责处理应用内通话消息的主流程，并完成 `onCreate()`、`onWindowStageCreate()`、`onDestroy()` 方法的覆写。

> **⚠️ 重要**：UIAbility.onCreate是同步接口，不支持异步回调，需要在onCreate生命周期的入口，完成 `pushService.receiveMessage()` 注册，并且保证在注册前没有等待异步方法执行的调用。

**文件位置**：`src/main/ets/entryability/PushMessageAbility.ets`

```typescript
import { UIAbility } from '@kit.AbilityKit';
import { pushService } from '@kit.PushKit';
import { window } from '@kit.ArkUI';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { VoipCallService } from '../service/VoipCallService';
import { BusinessError } from '@kit.BasicServicesKit';

export default class PushMessageAbility extends UIAbility {
  onCreate(): void {
    hilog.info(0x0000, 'testTag', `PushMessageAbility onCreate`);

    try {
      pushService.receiveMessage('VoIP', this, async (data) => {
        // process message，并建议对Callback进行try-catch
        try {
          await VoipCallService.processVoIPMainMsg(data.data, this.context);
        } catch (error) {
          hilog.error(0x0000, 'testTag', 'Failed to process VoIP message: %{public}d %{public}s',
            error.code,
            error.message);
        }
      });
    } catch (e) {
      hilog.error(0x0000, 'testTag',
        `Failed to register VOIP, error: ${e.code}, ${e.message}.`);
    }
  }

  onWindowStageCreate(windowStage: window.WindowStage): void {
    hilog.info(0x0000, 'testTag', `PushMessageAbility onWindowStageCreate`);

    windowStage.loadContent('pages/CalleePage').catch(
      (err: BusinessError) => {
        hilog.error(0x0000, 'testTag',
          `Failed to load content, error: ${err.code}, ${err.message}.`);
      });
  }

  onDestroy(): void {
    hilog.info(0x0000, 'testTag', 'PushMessageAbility onDestroy');
  }
}
```

### 步骤三：创建 VoipCallService

在项目工程 `src/main/ets/service` 目录下创建 `VoipCallService.ets`，处理应用内通话消息。

> **注意**：需要在项目工程的 `src/main/resources/rawfile` 目录下添加 `example.png`，表示来电时的用户头像。

**文件位置**：`src/main/ets/service/VoipCallService.ets`

```typescript
import { voipCall } from '@kit.CallServiceKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { common } from '@kit.AbilityKit';
import { image } from '@kit.ImageKit';
import { resourceManager } from '@kit.LocalizationKit';
import { BusinessError } from '@kit.BasicServicesKit';

export interface VoipScene {
  scene: string;
}

export interface Content {
  data: string;
  header: string;
  callId: string;
}

export class VoipCallService {
  private static callId: string | undefined;

  public static async processVoIPMainMsg(data: string,
    context: common.UIAbilityContext): Promise<void> {
    hilog.info(0x0000, 'testTag',
      `Process VoIP message: ${data}`);

    let content: Content = JSON.parse(data);
    let scene: VoipScene = JSON.parse(content.data);
    let callId: string = content.callId;
    if (!callId) {
      hilog.error(0x0000, 'testTag', `CallId is null`);
    }
    VoipCallService.callId = callId;

    try {
      // 注册voipCallUiEvent事件
      voipCall.on('voipCallUiEvent', async (event) => {
        hilog.info(0x0000, 'testTag',
          `Process voip call ui event: ${JSON.stringify(event)}.`);

        await VoipCallService.processVoipCallEvent(event.voipCallUiEvent);
      });
    } catch (err) {
      let e: BusinessError = err as BusinessError;
      hilog.error(0x0000, 'testTag', 'Failed to register event: %{public}d %{public}s', e.code, e.message);
    }

    const resourceMgr: resourceManager.ResourceManager = context.resourceManager;
    // example.png表示用户头像，取值为"/resources/rawfile"路径下的文件名
    let fileData: Uint8Array = new Uint8Array(0);
    try {
      fileData = await resourceMgr.getRawFileContent('example.png');
    } catch (e) {
      hilog.error(0x0000, 'testTag', 'Failed to get raw file: %{public}d %{public}s', e.code, e.message);
    }
    const buffer = fileData.buffer;
    const imageSource: image.ImageSource = image.createImageSource(buffer);
    const pixelMap: image.PixelMap = await imageSource.createPixelMap();
    if (pixelMap) {
      pixelMap.getImageInfo((err, imageInfo) => {
        if (imageInfo) {
          hilog.info(0x0000, 'testTag',
            `User profile imageInfo: ${imageInfo.size.width} * ${imageInfo.size.height}.`);
        }
      });
    }

    // 构造上报来电的参数。注意，voipCallType.scene为您自定义的场景类型字段，从云侧推送消息时，请注意与端侧取值保持一致
    let call: voipCall.VoipCallAttribute = {
      callId: callId,
      voipCallType: scene?.scene === 'video' ? voipCall.VoipCallType.VOIP_CALL_VIDEO :
      voipCall.VoipCallType.VOIP_CALL_VOICE,
      userName: 'push',
      userProfile: pixelMap,
      abilityName: 'PushMessageAbility', // 与调用pushService.receiveMessage('VoIP'...的文件名一致
      voipCallState: voipCall.VoipCallState.VOIP_CALL_STATE_RINGING
    };

    try {
      // 上报来电
      let error = await voipCall.reportIncomingCall(call);
      hilog.info(0x0000, 'testTag',
        `ReportIncomingCall result: ${error}.`);
    } catch (err) {
      let e: BusinessError = err as BusinessError;
      hilog.error(0x0000, 'testTag', 'Failed to report incoming call: %{public}d %{public}s', e.code, e.message);
    }

    // ...应用播放振动和铃声
  }

  public static async processVoipCallEvent(event: voipCall.VoipCallUiEvent) {
    try {
      switch (event) {
        case voipCall.VoipCallUiEvent.VOIP_CALL_EVENT_VOICE_ANSWER:
        case voipCall.VoipCallUiEvent.VOIP_CALL_EVENT_VIDEO_ANSWER:
          // 立即向Call Service Kit上报answered状态
          await voipCall.reportCallStateChange(VoipCallService.callId,
            voipCall.VoipCallState.VOIP_CALL_STATE_ANSWERED);

          // ...在应用内完成接听

          // 应用内接听后，向Call Service Kit上报active状态
          await voipCall.reportCallStateChange(VoipCallService.callId,
            voipCall.VoipCallState.VOIP_CALL_STATE_ACTIVE);
          break;
        case voipCall.VoipCallUiEvent.VOIP_CALL_EVENT_REJECT:
        case voipCall.VoipCallUiEvent.VOIP_CALL_EVENT_HANGUP:
          // ...应用内完成挂断

          // 向Call Service Kit上报通话状态
          await voipCall.reportCallStateChange(VoipCallService.callId,
            voipCall.VoipCallState.VOIP_CALL_STATE_DISCONNECTED);
          break;
        default: {
          break;
        }
      }
    } catch (err) {
      let e: BusinessError = err as BusinessError;
      hilog.error(0x0000, 'testTag', 'Failed to report call state change: %{public}d %{public}s', e.code, e.message);
    }
  }

  public static close(): void {
    hilog.info(0x0000, 'testTag', `Close VoIP`);

    VoipCallService.processVoipCallEvent(voipCall.VoipCallUiEvent.VOIP_CALL_EVENT_HANGUP);
    try {
      voipCall.off('voipCallUiEvent');
    } catch (err) {
      let e: BusinessError = err as BusinessError;
      hilog.error(0x0000, 'testTag', 'Failed to unregister event: %{public}d %{public}s', e.code, e.message);
    }
  }
}
```

**关键说明**：
1. 应用需要在10秒内调用 `voipCall.reportIncomingCall()` 接口上报通话来电状态
2. `voipCall.reportIncomingCall()` 接口入参中的callId需要使用 `receiveMessage()` 回调中的callId
3. 如果应用来电消息建立失败，需要调用 `voipCall.reportIncomingCallError()` 通知来电消息建立失败
4. 在接听状态回调中，应用在建立连接成功之后，需要调用 `voipCall.reportCallStateChange()` 接口上报通话激活状态
5. 在拒绝接听状态回调中，应用断开和服务器的连接之后，需要调用 `voipCall.reportCallStateChange()` 接口上报通话断开状态

### 步骤四：创建视频接听页面 CalleePage ⭐必做

> **⚠️ 强制要求**：此步骤**必须**完成！用户在解锁状态下点击视频接听时会拉起此页面，如果页面不存在会导致接听失败！

在项目工程的 `src/main/ets/pages` 目录添加：视频接听页面CalleePage.ets。

**文件位置**：`src/main/ets/pages/CalleePage.ets`

```typescript
import CallComponent from '../component/CallComponent';
import { hilog } from '@kit.PerformanceAnalysisKit';

@Entry
@Component
struct CalleePage {
  @StorageLink('close') @Watch('close') end: boolean | undefined = undefined;

  aboutToAppear() {
    hilog.info(0x0000, 'testTag', `CalleePage aboutToAppear`);

    this.end = false;
  }

  private close() {
    if (this.end) {
      hilog.info(0x0000, 'testTag', `CalleePage close`);

      this.getUIContext().getRouter().back();
    }
  }

  aboutToDisappear() {
    hilog.info(0x0000, 'testTag', `CalleePage aboutToDisappear`);
  }

  build() {
    Column() {
      CallComponent({})
    }
  }
}
```

### 步骤五：创建 CallComponent 呼叫控制组件

在项目工程的 `src/main/ets/component` 目录创建 CallComponent.ets。

**文件位置**：`src/main/ets/component/CallComponent.ets`

```typescript
import { VoipCallService } from '../service/VoipCallService';
import { voipCall } from '@kit.CallServiceKit';

@Component
export default struct CallComponent {
  @StorageLink('close') end: boolean | undefined = undefined;

  build() {
    Flex({ direction: FlexDirection.Column, justifyContent: FlexAlign.SpaceBetween }) {
      Row() {
      }
      .width('100%')
      .justifyContent(FlexAlign.Center)

      Row({ space: 30 }) {

        Column() {
          Button()
            .width(80)
            .height(80)
            .backgroundColor(Color.Green)
            .onClick(() => {
              VoipCallService.processVoipCallEvent(voipCall.VoipCallUiEvent.VOIP_CALL_EVENT_VIDEO_ANSWER);
            })

          Text('Answer').fontColor(Color.White).padding({ top: 5 })
        }

        Column() {
          Button()
            .width(80)
            .height(80)
            .backgroundColor(Color.Red)
            .onClick(() => {
              this.end = true;
              VoipCallService.close();
            })

          Text('Hang Up').fontColor(Color.White).padding({ top: 5 })
        }

      }
      .width('100%')
      .justifyContent(FlexAlign.Center)
    }
    .padding('30 10')
    .backgroundColor(Color.Black)
  }
}
```

### 步骤六：配置 main_pages.json ⭐必做

> **⚠️ 强制要求**：此步骤**必须**完成！必须在 main_pages.json 中添加 CalleePage 页面，否则页面无法被系统找到！

在项目工程的 `src/main/resources/base/profile/main_pages.json` 添加page目录：

```json
{
  "src": [
    "pages/Index",
    "pages/CalleePage"
  ]
}
```

### 步骤七：配置 module.json5

在项目工程的 `src/main/module.json5` 文件的 `abilities` 模块中配置PushMessageAbility的 `actions` 信息：

```json5
"abilities": [
  {
    "name": "PushMessageAbility",
    "srcEntry": "./ets/entryability/PushMessageAbility.ets",
    "launchType": "singleton",
    "startWindowIcon": "$media:startIcon",
    "startWindowBackground": "$color:start_window_background",
    "exported": false,
    "skills": [
      // 保持现有skill对象不变
      // 新增一个独立的skill对象，配置actions参数
      {
        "actions": ["action.ohos.push.listener"]
      }
    ]
  }
]
```

> **⚠️ 配置警告**：
> - **label 字段**：默认**不要添加**！如果需要添加，必须使用 `$string:xxx` 格式，并在 `src/main/resources/base/element/string.json` 中添加对应的资源名
> - **description 字段**：可以使用普通字符串，也可以不添加
> - **⭐ startWindowIcon 和 startWindowBackground 字段**：**必须填写**，不能遗漏！
>   - `startWindowIcon`：应用启动图标，如 `$media:startIcon`
>   - `startWindowBackground`：启动背景色，如 `$color:start_window_background`
>   - 如果遗漏会导致应用无法正常启动
>
> 正确示例（不添加 label）：
> ```json5
> {
>   "name": "PushMessageAbility",
>   "srcEntry": "./ets/entryability/PushMessageAbility.ets",
>   "launchType": "singleton",
>   "exported": false,
>   "skills": [{ "actions": ["action.ohos.push.listener"] }]
> }
> ```
> 
> 正确示例（添加 label）：
> ```json5
> // 1. 先在 string.json 中添加资源
> {
>   "string": [{ "name": "PushMessageAbility_label", "value": "VoIP来电" }]
> }
> 
> // 2. 然后在 module.json5 中使用
> {
>   "name": "PushMessageAbility",
>   "label": "$string:PushMessageAbility_label",
>   ...
> }
> ```
> 
> 错误示例（会编译报错）：
> ```json5
> {
>   "label": "PushMessageAbility"  // ❌ 错误！必须用 $string:xxx 格式
> }
> ```

> **说明**：actions内容为 `action.ohos.push.listener`，有且只能有一个ability定义该action，若同时添加uris参数，则uris内容需为空。

### 步骤八：服务端调用 REST API 发送 voip 消息

应用服务端调用REST API推送消息，请求示例如下：

```json
// Request URL
POST "https://push-api.cloud.huawei.com/v3/[projectId]/messages:send"

// Request Header
Content-Type: application/json
Authorization: Bearer eyJr*****OiIx---****.eyJh*****iJodHR--***.QRod*****4Gp---****
push-type: 10

// Request Body
{
  "pushOptions": {
    "ttl": 30
  },
  "payload": {
    "extraData": "{\"scene\": \"voice\"}"
  },
  "target": {
    "token": ["MAMzLg**********aZW"]
  }
}
```

**参数说明**：
- push-type：10表示应用内通话消息场景
- ttl：消息缓存时间，建议设置为30~60秒
- extraData：携带的额外数据，字符串类型。`scene` 字段为 `voice` 表示语音通话，为 `video` 表示视频通话

---

## 重要提醒

> **⚠️ 权益申请已在「权益申请提醒」章节中详细说明，请在开始开发前确认已完成申请！**

### callKit (Call Service Kit) 接入说明

本功能使用 **Call Service Kit**（`@kit.CallServiceKit`）的 `voipCall` 模块实现，**不是** callKit。

- 正确导入：`import { voipCall } from '@kit.CallServiceKit';`
- 主要接口：
  - `voipCall.on('voipCallUiEvent', callback)` - 注册通话状态监听
  - `voipCall.reportIncomingCall(call)` - 上报来电状态
  - `voipCall.reportCallStateChange(callId, state)` - 上报通话状态变化
  - `voipCall.reportIncomingCallError(callId, errorCode)` - 上报来电错误

> **参考**：华为官方文档 - [推送应用内通话消息](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/push-voip)

---

## ⚠️ 重要：多个场景化消息的配置

根据华为官方文档，一个项目中**有且只能有一个 ability** 配置 `action.ohos.push.listener`。

**这意味着**：
- 不要为每种消息类型创建单独的 Ability
- 所有的 `receiveMessage` 注册应该放在**同一个 Ability** 中
- module.json5 中只配置一个 ability 包含 `action.ohos.push.listener`

**⚠️ 特别提醒：接入通知消息或后台消息时，请加载对应的专门 Skill**

虽然同一个 Ability 中可以注册多种消息类型，但 **每种消息类型都有各自完整的开发流程和注意事项**，不能互相替代：

- **通知消息**：调用 `receiveMessage('DEFAULT', ...)`，配合 `requestEnableNotification()` 授权
- **voip 消息**：调用 `receiveMessage('VoIP', ...)`，还需要创建 VoipCallService、CalleePage 页面、注册 voipCallUiEvent 事件、上报来电状态等完整流程
- **后台消息**：调用 `receiveMessage('BACKGROUND', ...)`，还需要实现数据静默更新和缓存策略

因此：
- 接入**通知消息** → 请加载 **hmos-push-kit-notification** Skill
- 接入**后台消息** → 请加载 **hmos-push-kit-background** Skill
- **不要**仅凭本 skill 中关于"同一 ability 接收多种消息类型"的说明就自行编写通知消息或后台消息代码

**⚠️ 示例：不能这样做**

以下示例展示的是**错误做法**——仅凭 voip skill 的说明就自行添加其他消息类型的代码：

```typescript
// ❌ 错误示例：仅凭 voip skill 的说明就自行添加后台消息代码
pushService.receiveMessage('BACKGROUND', this, (payload) => {
  // 没有实现数据静默更新逻辑
  // 没有实现缓存策略
  // 后台消息有完整独立的开发流程，必须参考专门的 background skill
});
```

**正确做法**：请明确告诉我具体需要接入哪种消息类型，我会加载对应的专门 Skill，在本项目的同一个 PushMessageAbility 中添加相应逻辑。

---

## 常见问题排查

| 问题 | 可能原因 | 处理步骤 |
|-----|---------|---------|
| 收不到 voip 消息 | 未申请 voip 权益 | 在 AppGallery Connect 申请「推送应用内通话消息」权益 |
| 来电通知不显示 | 10秒内未调用reportIncomingCall | 确保在10秒内调用 |
| 设备不支持 voip | 设备不支持 voip 功能 | 检查设备是否支持 voip 功能 |

---

## 常见错误码

接入 VOIP 消息后，如遇到以下错误码，请参考：

| 错误码 | 可能原因 | 解决方法 |
|-------|---------|---------|
| 1000900010 | 推送服务未开通或 voip 权益未申请 | 在 AppGallery Connect 开通推送服务并申请 VOIP 权益 |
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

> **AI 必须在完成 voip 接入开发后，逐项确认以下所有内容：**

### 代码文件检查：
- [ ] `src/main/ets/entryability/PushMessageAbility.ets` 已创建
- [ ] `src/main/ets/service/VoipCallService.ets` 已创建
- [ ] `src/main/ets/pages/CalleePage.ets` 已创建 ⭐重点检查
- [ ] `src/main/ets/component/CallComponent.ets` 已创建

### 资源配置检查：
- [ ] `src/main/resources/rawfile/example.png` 已添加
- [ ] `src/main/resources/base/profile/main_pages.json` 已添加 `pages/CalleePage` ⭐重点检查
- [ ] `src/main/module.json5` 的 abilities 中已配置 `action.ohos.push.listener`

### 权益检查：
- [ ] 已在 AppGallery Connect 开通推送服务 ⭐
- [ ] 已在 AppGallery Connect 申请「应用内通话消息」权益并审核通过 ⭐

### 关键逻辑检查：
- [ ] `pushService.receiveMessage('VoIP', ...)` 已在 `onCreate()` 入口同步调用
- [ ] `voipCall.reportIncomingCall()` 在收到消息后 10 秒内调用
- [ ] `voipCall.on('voipCallUiEvent', ...)` 已注册通话状态监听
- [ ] 语音/视频场景判断逻辑正确（`scene === 'video'` 为视频）

### ⚠️ module.json5 配置检查：
- [ ] **label 字段**：默认不添加，如果添加必须用 `$string:xxx` 格式
- [ ] description 字段：可以使用普通字符串，也可以不添加
- [ ] 如果添加了 label，确认已在 `string.json` 中添加对应资源名

---

> **⚠️ 如果 AI 遗漏了上述任何一项，请立即补充！**

---

## ⚠️ 重要提醒汇总

> **⭐ 接入 voip 完成后，请务必逐项完成以下所有提醒事项！**

```
┌─────────────────────────────────────────────────────────────────────┐
│           ⭐ 重要：接入 voip 后必须完成的权益申请和Token上报          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  【权益申请 - 必须完成】⭐                                            │
│                                                                     │
│  1. 开通推送服务（必须）⭐                                            │
│     您必须前往 AppGallery Connect 开通推送服务，否则无法获取有效 Token │
│     参考文档：                                                       │
│     https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/push-config-setting  │
│                                                                     │
│  2. 申请应用内通话权益（必须）⭐                                      │
│     VoIP 消息需要额外的「应用内通话消息」权益才能正常使用              │
│     参考文档：                                                       │
│     https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/push-apply-right  │
│                                                                     │
│  ⚠️ 未申请权益的应用，默认推送的都是资讯营销类消息，                   │
│     会受到「每日每设备 2-5 条」的限制，且来电通知不会正常显示！        │
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
