---
name: hmos-push-kit-background
description: |
  推送后台消息助手。当开发者需要实现后台消息接收、数据静默更新、或消息缓存功能时触发。

  ============================================================
  触发条件（只有满足以下意图时才触发）：
  ============================================================

  ✅ 正确触发场景：
  - "帮接入后台消息"
  - "实现数据静默更新"
  - "添加推送后台消息功能"
  - "推送后台消息"
  - "消息缓存到数据库"
  - "进程不在前台接收消息"
  - "需要接入后台消息功能"

  ❌ 不触发场景：
  - 询问/概念："后台消息是什么"
  - 否定意图："不需要后台消息"
  - 仅输入关键词："后台"、"消息"
  - 测试/调试："后台消息测试"
  - 带引号输入："后台消息"
  - 配置咨询："后台消息怎么配置"

  ⚠️ 重要提醒：
  - 只要需要接入后台消息功能，**必须加载本 skill**
  - 本 skill 提供完整的后台消息接入指导，包括消息接收、数据处理、缓存策略等
  - 后台消息接入涉及数据静默更新、缓存策略等完整流程，不能凭其他 skill 的通用说明（如"同一 ability 接收多种消息类型"）自行编写

  此 Skill 专注于帮助开发者实现推送后台消息的接收和配置。

  前置检查：
  - 在继续之前，会自动检查开发者是否已接入Push Token
  - 如果未接入Token，会引导开发者先使用 hmos-push-kit-token Skill
---

# 推送后台消息助手

本 Skill 帮助开发者实现华为推送后台消息功能。在开始后台消息开发之前，需要先确认 Push Token 的状态。

---

## ⚠️ AI 必做检查清单（强制检查）

> **AI 必须在开始开发前逐一确认以下所有项目，确保不遗漏任何关键步骤！**

### 接入后台消息必须完成的文件清单：

| 序号 | 必做项 | 文件路径 | 用途 |
|-----|-------|---------|-----|
| ☐ 0 | 在 EntryAbility 中初始化数据库 | `src/main/ets/entryability/EntryAbility.ets` | **应用启动时创建数据库** |
| ☐ 1 | 创建 PushMessageAbility | `src/main/ets/abilities/PushMessageAbility.ets` | **调用 receiveMessage() 接收后台消息** |
| ☐ 2 | 创建数据库 pushmessage.db | `src/main/ets/database/` 目录 | **存储后台消息数据** |
| ☐ 3 | 创建数据表 t_push_message | 数据库中创建 | 按官方格式创建表结构 |
| ☐ 4 | 创建 PushMessage.json | `src/main/resources/base/profile/PushMessage.json` | **配置数据表路径和类型** |
| ☐ 5 | 配置 proxyData | `src/main/module.json5` | **添加数据代理写入配置** |
| ☐ 6 | 配置 skills | `src/main/module.json5` | 添加 action.ohos.push.listener |
| ☐ 7 | 确认已开通推送服务 | AppGallery Connect | ⭐必须已开通 |

> **⚠️ 重要提醒**：WRITE_PRIVACY_PUSH_DATA 是 ACL 权限，**不需要**在 module.json5 的 requestPermissions 中配置！只需在 proxyData 中配置 requiredWritePermission 即可，权限申请由开发者在 AppGallery Connect 中完成。

> **⚠️ 默认配置说明**：本 Skill 默认配置 proxyData，将消息写入数据库。这是因为：
> - 应用进程不在前台时，消息如不写入数据库会被丢弃
> - 写入数据库后可等待应用启动时读取，确保消息不丢失
> - 如果不配置 proxyData，只能缓存最新一条消息，且应用必须主动上线才能获取
> - **因此，接入后台消息时，proxyData 是默认必须配置的**

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
| ✅ **已接入 Token** | 直接进入后台消息开发流程 |
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

**完成 Token 接入后**：继续执行后台消息开发流程

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
│  3. 接入完成后，自动继续后台消息开发                                  │
│     - 创建 PushMessageAbility                                       │
│     - 配置 proxyData 等                                             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

> **说明**：AI 不再需要切换到 hmos-push-kit-token Skill，而是直接在本 Skill 中完成 Token 接入，然后再继续后台消息的开发。

---

## 后台消息开发流程

当确认有有效 Token 后，按照以下流程开发后台消息：

```
┌─────────────────────────────────────────────────────────────────────┐
│                    后台消息开发流程                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Step 0: 在 EntryAbility 中初始化数据库 ⭐必做                      │
│     └── 在 EntryAbility.onCreate 中调用 initPushMessageDatabase() │
│     └── 验证数据库创建成功                                          │
│                                                                     │
│  Step 1: 创建消息接收 Ability ⭐必做                                 │
│     └── 创建 PushMessageAbility 处理后台消息                        │
│     └── 调用 pushService.receiveMessage('BACKGROUND', ...)         │
│                                                                     │
│  Step 2: 创建数据库 pushmessage.db ⭐必做                           │
│     └── 创建 RDB 数据库                                             │
│     └── 创建 t_push_message 数据表                                  │
│                                                                     │
│  Step 3: 创建 PushMessage.json ⭐必做                               │
│     └── 配置 path、type、scope                                      │
│                                                                     │
│  Step 4: 配置 proxyData ⭐必做                                      │
│     └── 在 module.json5 中添加 proxyData 配置                       │
│     └── 申请 WRITE_PRIVACY_PUSH_DATA 权限                           │
│                                                                     │
│  Step 5: 配置 Skills 标签 ⭐必做                                     │
│     └── 在 module.json5 中配置 skills 接收消息回调                   │
│                                                                     │
│  Step 6: 服务端调用 REST API 发送后台消息                            │
│     └── 使用获取的 Push Token 调用华为 Push API                     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Step 0: 在 EntryAbility 中初始化数据库 ⭐必做

### 修改 EntryAbility.ets

在 EntryAbility 的 onCreate 中调用数据库初始化方法，这样应用启动时会自动创建数据库，可以验证数据库是否创建成功。

**文件位置**：`src/main/ets/entryability/EntryAbility.ets`

```typescript
import { UIAbility, AbilityConstant, Want } from '@kit.AbilityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { getRdbStore } from '../database/PushMessageRdb';

const DOMAIN = 0x0001;

export default class EntryAbility extends UIAbility {
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    hilog.info(DOMAIN, 'testTag', 'EntryAbility onCreate');
    
    // 初始化后台消息数据库
    this.initPushMessageDatabase();
  }

  private async initPushMessageDatabase(): Promise<void> {
    try {
      await getRdbStore(this.context);
      hilog.info(DOMAIN, 'testTag', 'PushMessage database initialized successfully');
    } catch (err) {
      hilog.error(DOMAIN, 'testTag', 'PushMessage database initialization failed: %{public}s', (err as Error).message);
    }
  }
}
```

> **⚠️ 说明**：
> - 此步骤用于在应用启动时初始化数据库
> - 调用 `getRdbStore()` 会自动创建 `pushmessage.db` 数据库和 `t_push_message` 表
> - 初始化成功后，日志会显示 "PushMessage database initialized successfully"
> - 如初始化失败，会显示错误信息，便于排查问题
>
> **为什么需要这一步**：
> - 验证数据库能够正常创建
> - 确保在接收后台消息前数据库已就绪
> - 应用每次启动时都会自动初始化

---

## Step 1: 创建消息接收 Ability ⭐必做

### 创建 PushMessageAbility

**文件位置**：`src/main/ets/abilities/PushMessageAbility.ets`

```typescript
import { UIAbility } from '@kit.AbilityKit';
import { pushService, pushCommon } from '@kit.PushKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { BusinessError } from '@kit.BasicServicesKit';

/**
 * 此处以PushMessageAbility为例，接收后台消息内容
 */
export default class PushMessageAbility extends UIAbility {
  onCreate(): void {
    try {
      pushService.receiveMessage('BACKGROUND', this, (data: pushCommon.PushPayload) => {
        // process message，并建议对Callback进行try-catch
        try {
          hilog.info(0x0000, 'testTag', 'Receive background message');
        } catch (e) {
          let errRes: BusinessError = e as BusinessError;
          hilog.error(0x0000, 'testTag', 'Failed to process data: %{public}d %{public}s', errRes.code, errRes.message);
        }
      });
    } catch (err) {
      let e: BusinessError = err as BusinessError;
      hilog.error(0x0000, 'testTag', 'Failed to get background message: %{public}d %{public}s', e.code, e.message);
    }
  }
}
```

> **⚠️ 重要说明**：
> - **此代码用于处理「应用在前台」时的后台消息**
> - UIAbility.onCreate 是同步接口，不支持异步回调
> - `pushService.receiveMessage()` 必须在 onCreate 入口同步调用
> - 不能在注册前等待异步方法执行
>
> **数据库写入逻辑说明**（请勿在此处添加数据库操作）：
> - 当应用**不在前台**且 `proxyData` 为 `"ENABLE"` 时：Push Kit **自动**将消息写入数据库
> - 当应用**在前台**时：消息通过 callback 传递到此代码，由开发者自行处理（仅做日志记录即可）
> - **因此，此处 callback 不需要、也不应该添加数据库插入代码**
> - 数据库配置（Step 2-4）是用于 Push Kit 自动写入的，与此处的消息处理无关

> **参考**：华为官方文档 - [推送后台消息](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/push-background)

---

## Step 2: 创建数据库 pushmessage.db ⭐必做

### 创建数据库

> **⚠️ 默认配置**：本 Skill 默认配置 proxyData，因此需要创建数据库将消息写入数据库。

**文件位置**：`src/main/ets/database/PushMessageRdb.ets`

```typescript
import { relationalStore } from '@kit.ArkData';
import { common } from '@kit.AbilityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { BusinessError } from '@kit.BasicServicesKit';

const DB_NAME = 'pushmessage.db';
const TABLE_NAME = 't_push_message';

const STORE_CONFIG: relationalStore.StoreConfig = {
  name: DB_NAME,
  securityLevel: relationalStore.SecurityLevel.S1
};

const SQL_CREATE_TABLE =
  `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message_id TEXT,
    push_type TEXT,
    message_action INTEGER,
    message TEXT,
    field1 TEXT,
    field2 TEXT,
    field3 TEXT,
    field4 TEXT,
    field5 TEXT,
    create_time INTEGER
  )`;

let rdbStore: relationalStore.RdbStore | undefined = undefined;
let initError: string | undefined = undefined;

export async function getRdbStore(context: common.UIAbilityContext): Promise<relationalStore.RdbStore> {
  if (rdbStore) {
    return rdbStore;
  }

  if (initError) {
    hilog.error(0x0000, 'testTag', 'RdbStore initialization failed: %{public}s', initError);
    throw new Error(initError);
  }

  try {
    rdbStore = await relationalStore.getRdbStore(context, STORE_CONFIG);
    hilog.info(0x0000, 'testTag', 'Succeeded in getting RdbStore.');
  } catch (e) {
    const err = e as BusinessError;
    const errorMsg = `Failed to get RdbStore. Code:${err.code}, message:${err.message}`;
    hilog.error(0x0000, 'testTag', '%{public}s', errorMsg);
    initError = errorMsg;
    throw new Error(errorMsg);
  }

  try {
    await rdbStore.executeSql(SQL_CREATE_TABLE);
    hilog.info(0x0000, 'testTag', 'Succeeded in creating table.');
  } catch (e) {
    const err = e as BusinessError;
    const errorMsg = `Failed to create table. Code:${err.code}, message:${err.message}`;
    hilog.error(0x0000, 'testTag', '%{public}s', errorMsg);
    initError = errorMsg;
    throw new Error(errorMsg);
  }

  return rdbStore;
}

export async function insertMessage(message: relationalStore.ValuesBucket): Promise<number> {
  if (!rdbStore) {
    const errorMsg = 'RdbStore not initialized, please call getRdbStore first';
    hilog.error(0x0000, 'testTag', '%{public}s', errorMsg);
    throw new Error(errorMsg);
  }

  try {
    const rowId = await rdbStore.insert(TABLE_NAME, message);
    hilog.info(0x0000, 'testTag', 'Succeeded in inserting data. rowId:%{public}d', rowId);
    return rowId;
  } catch (e) {
    const err = e as BusinessError;
    hilog.error(0x0000, 'testTag', 'Failed to insert message. Code:%{public}d, message:%{public}s', err.code, err.message);
    throw new Error(`Failed to insert message: ${err.message}`);
  }
}

export async function queryAllMessages(): Promise<relationalStore.ResultSet> {
  if (!rdbStore) {
    const errorMsg = 'RdbStore not initialized, please call getRdbStore first';
    hilog.error(0x0000, 'testTag', '%{public}s', errorMsg);
    throw new Error(errorMsg);
  }

  try {
    const predicates = new relationalStore.RdbPredicates(TABLE_NAME);
    const resultSet = await rdbStore.query(predicates);
    return resultSet;
  } catch (e) {
    const err = e as BusinessError;
    hilog.error(0x0000, 'testTag', 'Failed to query messages. Code:%{public}d, message:%{public}s', err.code, err.message);
    throw new Error(`Failed to query messages: ${err.message}`);
  }
}

export async function deleteMessage(predicates: relationalStore.RdbPredicates): Promise<number> {
  if (!rdbStore) {
    const errorMsg = 'RdbStore not initialized, please call getRdbStore first';
    hilog.error(0x0000, 'testTag', '%{public}s', errorMsg);
    throw new Error(errorMsg);
  }

  try {
    const deletedCount = await rdbStore.delete(predicates);
    hilog.info(0x0000, 'testTag', 'Succeeded in deleting data. deletedCount:%{public}d', deletedCount);
    return deletedCount;
  } catch (e) {
    const err = e as BusinessError;
    hilog.error(0x0000, 'testTag', 'Failed to delete message. Code:%{public}d, message:%{public}s', err.code, err.message);
    throw new Error(`Failed to delete message: ${err.message}`);
  }
}

export function isRdbStoreInitialized(): boolean {
  return rdbStore !== undefined;
}

export function getInitError(): string | undefined {
  return initError;
}
```

### 数据库表结构说明

按照华为官方文档，表结构必须按以下格式创建：

| 字段名称 | 字段类型 | 说明 |
|---------|---------|------|
| id | INTEGER | 自增主键 |
| message_id | TEXT | 消息id |
| push_type | TEXT | 场景类型 |
| message_action | INTEGER | 消息动作 |
| message | TEXT | 消息内容 |
| field1 ~ field5 | TEXT | 扩展字段1-5 |
| create_time | INTEGER | 消息写入数据库的时间戳，单位毫秒（ms） |


---

## Step 3: 创建 PushMessage.json ⭐必做

### 创建数据库配置文件

> **⚠️ 默认配置**：本 Skill 默认配置 proxyData，因此必须创建此配置文件。

**文件位置**：`src/main/resources/base/profile/PushMessage.json`

```json
{
  "path": "pushmessage/t_push_message",
  "type": "rdb",
  "scope": "application"
}
```

**配置说明**：
- `path`：格式为 `[数据库名称]/[数据表名称]`，如 `pushmessage/t_push_message`
- `type`：固定值为 `rdb`，表示关系型数据库
- `scope`：`application`（应用级）或 `module`（hap模块级）

> **⚠️ 重要**：文件名必须为 `PushMessage`，不能更改！

---

## Step 4: 配置 proxyData ⭐必做

### 配置 module.json5 中的 proxyData

> **⚠️ 默认配置**：本 Skill 默认配置 proxyData，将消息写入数据库。这是**必须**完成的配置！

**文件位置**：`src/main/module.json5`

```json5
{
  "module": {
    "proxyData": [
      {
        "uri": "datashareproxy://{bundleName}/PushMessage",
        "requiredWritePermission": "ohos.permission.WRITE_PRIVACY_PUSH_DATA",
        "metadata": {
          "name": "dataProperties",
          "resource": "$profile:PushMessage"
        }
      }
    ]
  }
}
```

**配置说明**：
- `{bundleName}`：替换为您的应用 bundleName（如 `com.example.myapp`）
  - **获取方式**：在项目根目录下的 `build-profile.json5` 或 `AppScope/app.json5` 文件中的 `bundleName` 字段查找
- `requiredWritePermission`：固定值为 `ohos.permission.WRITE_PRIVACY_PUSH_DATA`
- `metadata.name`：固定值为 `dataProperties`
- `metadata.resource`：固定格式为 `$profile:文件名称`，文件名称固定为 `PushMessage`

> **⚠️ 重要**：使用 proxyData 需要申请 `ohos.permission.WRITE_PRIVACY_PUSH_DATA` 权限（ACL权限，需要向华为申请）
>
> **⚠️ AI 禁止操作**：不要在 module.json5 中配置 `requestPermissions`！
> - `ohos.permission.WRITE_PRIVACY_PUSH_DATA` 是 **ACL 权限**，需要开发者向华为申请
> - **不需要**、也**不应该**在 module.json5 的 `requestPermissions` 中配置此权限
> - AI 只需要配置 `proxyData` 即可，权限申请由开发者在 AppGallery Connect 中完成
> - 如AI自作聪明添加了 `requestPermissions` 配置，请立即删除！

---

## Step 5: 配置 Skills 标签 ⭐必做

### 配置 module.json5 中的 skills

需要在 abilities 中配置 skills，用于接收消息回调：

```json5
"abilities": [
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
]
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
- `launchType` 设置为 `singleton`，确保消息接收 Ability 是单例
- `actions` 设置为 `action.ohos.push.listener`，用于接收 Push Kit 消息回调
- **不要配置 uris**，否则消息会接收不到
- **label 字段**：默认不添加，如果添加必须用 `$string:xxx` 格式

> **⚠️ 重要**：actions 内容为 `action.ohos.push.listener`，有且只能有一个 ability 定义该 action，若同时添加 uris 参数，则 uris 内容需为空。

---

## 服务端推送示例

### 请求示例

```
// Request URL
POST "https://push-api.cloud.huawei.com/v3/[projectId]/messages:send"

// Request Header
"Content-Type": application/json
"Authorization: Bearer eyJr*****OiIx---****.eyJh*****iJodHR--***.QRod*****4Gp---****"
"push-type: 6"

// Request Body
{
  "payload": {
    "extraData": "{\"key\":\"value\"}",
    "proxyData": "ENABLE"
  },
  "target": {
    "token": ["MAMzLg**********lPW"]
  }
}
```

### 参数说明

| 参数 | 说明 |
|-----|------|
| push-type | 6 表示后台消息 |
| extraData | 携带的额外数据，字符串类型 |
| proxyData | 可选，"ENABLE" 开启数据代理写入 |

---

## ⚠️ 重要：多个场景化消息的配置

**如果您需要同时接入通知消息、voip、后台消息，必须注意以下事项**：

根据华为官方文档，一个项目中**有且只能有一个 ability** 配置 `action.ohos.push.listener`。

**这意味着**：
- 不要为每种消息类型创建单独的 Ability
- 所有的 `receiveMessage` 注册应该放在**同一个 Ability** 中
- module.json5 中只配置一个 ability 包含 `action.ohos.push.listener`

**⚠️ 特别提醒：接入通知消息或 voip 时，请加载对应的专门 Skill**

虽然同一个 Ability 中可以注册多种消息类型，但 **每种消息类型都有各自完整的开发流程和注意事项**，不能互相替代：

- **通知消息**：调用 `receiveMessage('DEFAULT', ...)`，配合 `requestEnableNotification()` 授权
- **voip 消息**：调用 `receiveMessage('VoIP', ...)`，还需要创建 VoipCallService、CalleePage 页面、注册 voipCallUiEvent 事件、上报来电状态等完整流程
- **后台消息**：调用 `receiveMessage('BACKGROUND', ...)`，还需要实现数据静默更新和缓存策略

因此：
- 接入**通知消息** → 请加载 **hmos-push-kit-notification** Skill
- 接入 **voip 消息**（语音/视频来电通知）→ 请加载 **hmos-push-kit-voip** Skill
- **不要**仅凭本 skill 中关于"同一 ability 接收多种消息类型"的说明就自行编写通知消息或 voip 代码

**⚠️ 示例：不能这样做**

以下示例展示的是**错误做法**——仅凭 background skill 的说明就自行添加其他消息类型的代码：

```typescript
// ❌ 错误示例：仅凭 background skill 的说明就自行添加 voip 代码
pushService.receiveMessage('VoIP', this, (payload) => {
  // 没有创建 VoipCallService
  // 没有创建 CalleePage 页面
  // voip 有完整独立的开发流程，必须参考专门的 voip skill
});
```

**正确做法**：请明确告诉我具体需要接入哪种消息类型，我会加载对应的专门 Skill，在本项目的同一个 PushMessageAbility 中添加相应逻辑。

---

## 代码生成规则

生成代码时必须遵循：
1. 使用正确的导入路径：`@kit.PushKit`、`@kit.AbilityKit`
2. 所有 ArkTS 类型注解必须正确
3. 使用正确的消息类型 `'BACKGROUND'`
4. skills 配置必须包含 `action.ohos.push.listener`
5. 生成的代码必须能够直接编译通过

---

## 常见问题排查

| 问题 | 可能原因 | 处理步骤 |
|-----|---------|---------|
| 收不到消息 | skills 未配置正确 | 检查 module.json5 中 skills 是否包含 `action.ohos.push.listener` |
| 收不到消息 | PushMessageAbility 未设置 singleton | 将 launchType 设为 "singleton" |
| 收不到消息 | 应用进程被关闭 | 确保应用进程存在（前台或后台） |
| 消息被丢弃 | 发送频率过高 | 降低发送频率，每小时不超过 2 条 |
| 缓存消息丢失 | 超过 7 天 | 在 7 天内启动应用接收消息 |
| 消息未写入数据库 | 未配置 proxyData 或权限 | 检查 proxyData 配置和权限申请 |
| 数据库写入失败 | PushMessage.json 配置错误 | 检查 path、type、scope 是否正确 |

---

## 常见错误码

接入后台消息后，如遇到以下错误码，请参考：

| 错误码 | 可能原因 | 解决方法 |
|-------|---------|---------|
| 1000900010 | 推送服务未开通 | 在 AppGallery Connect 开通推送服务 |
| 1000900011 | 应用签名不匹配 | 检查签名配置是否正确 |
| 1000900012 | 网络问题 | 检查网络连接 |
| 1000900013 | 请求超时 | 增加超时时间或检查网络 |
| 1000900014 | 权限不足（ACL） | 申请 WRITE_PRIVACY_PUSH_DATA 权限 |
| 1000900001 | 推送服务内部错误 | 重试或联系华为支持 |
| 1000900002 | 参数错误 | 检查请求参数是否正确 |
| 1000900003 | Token 无效 | 检查 Token 是否正确 |
| 1000900020 | proxyData 配置错误 | 检查 PushMessage.json 和 module.json5 配置 |
| 1000900021 | 数据库写入失败 | 检查数据库表结构和权限 |

> 完整错误码列表请参考 `references/push-error-codes.md`

---

## ✅ AI 开发完成后的自检清单

> **AI 必须在完成后台消息接入开发后，逐项确认以下所有内容：**

### 核心功能检查：
- [ ] `pushService.receiveMessage('BACKGROUND', ...)` 已在 onCreate() 入口同步调用 ⭐重点
- [ ] 消息类型参数正确使用 `'BACKGROUND'`

### 数据库配置检查（如果使用 proxyData）：
- [ ] `src/main/ets/database/PushMessageRdb.ets` 已创建
- [ ] 数据库名为 `pushmessage.db` ⭐重点
- [ ] 数据表名为 `t_push_message` ⭐重点
- [ ] 表结构字段与官方文档一致（id, message_id, push_type, message_action, message, field1-5, create_time）

### 配置文件检查（如果使用 proxyData）：
- [ ] `src/main/resources/base/profile/PushMessage.json` 已创建 ⭐重点
- [ ] path 配置为 `pushmessage/t_push_message` ⭐重点
- [ ] type 配置为 `rdb` ⭐重点
- [ ] scope 配置为 `application` 或 `module`

### module.json5 配置检查：
- [ ] proxyData 配置已添加 ⭐重点
- [ ] uri 格式正确：`datashareproxy://{bundleName}/PushMessage` ⭐重点
- [ ] requiredWritePermission 配置为 `ohos.permission.WRITE_PRIVACY_PUSH_DATA` ⭐重点
- [ ] metadata 配置正确：name 为 `dataProperties`，resource 为 `$profile:PushMessage` ⭐重点
- [ ] skills 配置包含 `action.ohos.push.listener`
- [ ] ability 的 launchType 设置为 `singleton`
- [ ] **label 字段**：默认不添加，如果添加必须用 `$string:xxx` 格式
- [ ] description 字段：可以使用普通字符串，也可以不添加

### 权限检查（如果使用 proxyData）：
- [ ] 已申请 `ohos.permission.WRITE_PRIVACY_PUSH_DATA` 权限

### 权益检查：
- [ ] 已在 AppGallery Connect 开通推送服务 ⭐

### 消息接收检查：
- [ ] 应用在前台时能直接接收消息
- [ ] 应用不在前台时消息能被缓存（未开启 proxyData）
- [ ] 应用不在前台时消息能写入数据库（已开启 proxyData）

---

> **⚠️ 如果 AI 遗漏了上述任何一项（特别是 ⭐重点 标记的项目），请立即补充！**

---

## ⚠️ 重要提醒汇总

> **⭐ 接入后台消息完成后，请务必逐项完成以下所有提醒事项！**

```
┌─────────────────────────────────────────────────────────────────────┐
│         ⭐ 重要：接入后台消息后必须完成的权益申请和Token上报          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  【权益申请 - 必须完成】⭐                                            │
│                                                                     │
│  开通推送服务（必须）⭐                                               │
│  您必须前往 AppGallery Connect 开通推送服务，否则无法获取有效 Token   │
│  参考文档：                                                          │
│  https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/push-config-setting  │
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
