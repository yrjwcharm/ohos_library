# 使用 @InsightIntentLink 装饰器创建 URI 链接意图

> ## 🚨 强制阅读声明
>
> **在生成任何 `@InsightIntentLink` 相关代码之前，你必须完整阅读本文档的全部内容，包括：**
>
> - 完整实现流程（步骤0-5）
> - 简化方案与完整方案的完整代码模板
> - 关键规则总结与完整检查清单
> - 常见问题排查及方案对比
>
> **禁止仅凭“快速上手”或部分章节就开始编写代码。**  
> 忽略任何细节都可能导致冷启动失败、连续意图失效、Tab 不刷新等严重问题。  
> 请逐章阅读，并严格按照“完整检查清单”验证你的实现。

使用该装饰器装饰当前应用的 uri 链接，可以将该 uri 链接定义为意图，便于 AI 入口通过意图快速跳转到当前应用。

---

## Quick Start

### 快速上手（官方示例）

```typescript
import { InsightIntentLink, LinkParamCategory } from '@kit.AbilityKit';

@InsightIntentLink({
  intentName: 'PlayMusic',
  domain: 'MusicDomain',
  intentVersion: '1.0.1',
  displayName: '播放歌曲',
  displayDescription: '播放音乐意图',
  llmDescription: '支持传递歌曲名称，播放音乐',
  keywords: ['音乐播放', '播放歌曲', 'PlayMusic'],
  uri: 'https://www.example.com/music/',
  paramMappings: [{
    paramName: 'songName',
    paramMappingName: 'music',
    paramCategory: LinkParamCategory.LINK
  }],
  parameters: {
    'type': 'object',
    'properties': {
      'songName': {
        'type': 'string',
        'description': '歌曲名称',
        'minLength': 1
      }
    },
    'required': ['songName']
  }
})
export class PlayMusicLink {
  // 类实现
}
```

### 完整流程

1. **定义 URI 链接**：确保 uri 格式符合[应用链接说明](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-uri-config)的要求。
2. **创建意图类**：使用 `@InsightIntentLink` 装饰器装饰类。
3. **配置参数映射**：通过 `paramMappings` 定义参数如何传递给应用。
4. **注册意图**：在 `insight_intent.json` 中添加文件路径。
5. **实现 EntryAbility 跳转逻辑**：解析 URI 并执行跳转。

------

## 完整实现流程（推荐）

本指南提供两种实现方案，**推荐使用简化方案**（混合路由架构），确保可靠性并降低维护成本。

| 方案                 | 适用场景                                         | 特点                                 |
| :------------------- | :----------------------------------------------- | :----------------------------------- |
| **简化方案（推荐）** | 混合路由架构（`loadContent` + `router.pushUrl`） | 逻辑简单、可靠性高、无需追踪当前页面 |
| **完整方案（备选）** | 纯 `loadContent` 架构（无 `router.pushUrl`）     | 性能稍优但复杂，仅推荐特殊场景       |

### 步骤 0：分析目标页面代码（⚠️ 必须执行）

**在编写任何意图代码之前，必须先分析目标页面！** 跳过此步骤会导致页面因缺少参数而白屏或闪退。

#### 分析清单

1. **读取目标页面的完整代码**（如 `TaskEditPage.ets`）。
2. **检查页面是否依赖路由参数**：
   - 搜索 `router.getParams()`、`GlobalContext.getContext().getObject()`、`LocalStorage` 等获取参数的代码。
   - 确认参数的期望格式（JSON 字符串、对象、基本类型）。
   - 记录参数结构和必需字段。
3. **确认页面组件类型**：
   - 是否包含 `Tabs` 组件 → 需要 Tab 切换处理。
   - 是否为 `NavDestination` → 需要 `navigationId` + `navDestinationName`。
   - 是否为普通 `@Entry` 页面 → 使用 `loadContent` + 参数传递。
4. **检查 `EntryAbility` 中是否已有类似 URI 的处理**，参考现有实现风格。

#### 根据分析结果确定参数传递方案

| 页面类型               | 参数接收方式                  | 意图传递参数的方式                                           |
| :--------------------- | :---------------------------- | :----------------------------------------------------------- |
| 普通 `@Entry` 页面     | `router.getParams()`          | **修改页面**支持从 `AppStorage` 读取，或在 `handleInsightIntent` 中通过 `LocalStorage` 传递 |
| `@Entry` + `Tabs` 组件 | 通过路由参数控制 `curr_index` | 使用 `AppStorage` + `@Watch` 传递 Tab 索引                   |
| `NavDestination` 页面  | 通过 `NavPathStack.push` 传参 | 使用 `AppStorage` 存储参数，在主页的 `@Watch` 中推送子页面   |
| 不依赖参数的页面       | 无参数需求                    | 直接跳转，无需额外处理                                       |

> **⚠️ 重要**：如果页面依赖 `router.getParams()` 且无法修改，必须在 `handleInsightIntent` 中构造完整参数并通过 `LocalStorage` 或 `Want` 传递。详见下方“独立页面参数传递”章节。

------

### 步骤 1：场景识别与跳转类型判断

根据目标页面代码，确认跳转类型：

| 跳转类型            | 典型特征                                              | 适用意图方式                                              |
| :------------------ | :---------------------------------------------------- | :-------------------------------------------------------- |
| Tab 页面切换        | `Tabs` + `TabContent`，通过 `curr_index` 控制         | `@InsightIntentLink` + `AppStorage` + `@Watch`            |
| 独立页面跳转        | `@Entry` 页面，通过 `router.pushUrl` 或 `loadContent` | `@InsightIntentLink` + `loadContent` + 参数传递           |
| NavDestination 跳转 | `Navigation` + `NavPathStack`                         | `@InsightIntentLink` + `AppStorage` + `NavPathStack.push` |
| 带参数跳转          | 页面需要接收参数（如编辑页面）                        | 见下方“参数传递方案”                                      |

------

### 步骤 2：EntryAbility 实现模板

#### 🔥 方案 A：简化方案（推荐，适用于混合路由架构）

```typescript
import { AbilityConstant, UIAbility, Want } from '@kit.AbilityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { window } from '@kit.ArkUI';

export default class EntryAbility extends UIAbility {
  private targetPage: string = 'pages/Index';
  private currentPage: string = '';
  private windowStage?: window.WindowStage;
  private needReloadPage: boolean = false;
  private targetTab: number = -1;
  private navDestinationName: string = '';
  private intentParams: Record<string, Object> = {};

  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onCreate');
    this.handleInsightIntent(want);
  }

  onNewWant(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onNewWant');
    this.handleInsightIntent(want);

    if (!this.needReloadPage) return;
    // ✅ Tab 切换场景：强制跳转到主页（无论当前在哪个页面）
    if (this.targetTab >= 0) {
      if (this.windowStage) {
        // 先清除旧信号
        AppStorage.setOrCreate('intentTargetTab', -1);

        this.windowStage.loadContent(this.targetPage).then(() => {
          // 页面加载完成后，写入正确的信号
          AppStorage.setOrCreate('intentTargetTab', this.targetTab);
          hilog.info(0x0000, 'testTag', 'Tab switch completed: targetTab=%{public}d', this.targetTab);
        }).catch((err: Error) => {
          hilog.error(0x0000, 'testTag', 'loadContent failed: %{public}s', err.message);
        });
        
        this.needReloadPage = false;
        this.currentPage = this.targetPage;
      }
      return;
    }
    // ✅ 非 Tab 切换场景：独立页面跳转
    if (this.windowStage) {
      // 先清除旧信号
      if (this.navDestinationName) {
        AppStorage.setOrCreate('intentNavDestination', '');
      }
      this.windowStage.loadContent(this.targetPage).then(() => {
        // 页面加载完成后，写入信号
        if (this.navDestinationName) {
          AppStorage.setOrCreate('intentNavDestination', this.navDestinationName);
        }
        if (Object.keys(this.intentParams).length > 0) {
          AppStorage.setOrCreate('intentParams', this.intentParams);
        }
        hilog.info(0x0000, 'testTag', 'Page navigation completed');
      }).catch((err: Error) => {
        hilog.error(0x0000, 'testTag', 'loadContent failed: %{public}s', err.message);
      });
      this.needReloadPage = false;
      this.currentPage = this.targetPage;
    }
  }

  onWindowStageCreate(windowStage: window.WindowStage): void {
    this.windowStage = windowStage;
    this.currentPage = this.targetPage;
    windowStage.loadContent(this.targetPage).catch((err: Error) => {
      hilog.error(0x0000, 'testTag', 'Failed to load content: %{public}s', err.message);
    });
  }

  onWindowStageDestroy(): void {
    this.windowStage = undefined;
  }

  // ⚠️ 核心方法：解析 URI 并设置跳转参数
  private handleInsightIntent(want: Want): void {
    // 场景 1：Tab 页面切换
    if (want.uri === 'app://mine') {
      this.targetPage = 'pages/Index';
      this.targetTab = 3;
      this.needReloadPage = true;
      // 立即写入信号（冷启动兼容）
      AppStorage.setOrCreate('intentTargetTab', 3);
      hilog.info(0x0000, 'testTag', 'Handle intent: open mine tab');
    }
    // 场景 2：独立页面跳转
    else if (want.uri === 'app://login') {
      this.targetPage = 'otherpages/login_page';
      this.targetTab = -1;
      this.needReloadPage = true;
      hilog.info(0x0000, 'testTag', 'Handle intent: open login page');
    }
    // 场景 3：NavDestination 跳转
    else if (want.uri === 'app://detail') {
      this.targetPage = 'pages/Index';
      this.navDestinationName = 'Detail';
      this.needReloadPage = true;
      AppStorage.setOrCreate('intentNavDestination', 'Detail');
      hilog.info(0x0000, 'testTag', 'Handle intent: open detail page');
    }
    // 场景 4：带参数跳转
    else if (want.uri === 'app://player') {
      this.targetPage = 'pages/Index';
      this.navDestinationName = 'Player';
      this.intentParams = { songId: '123', songName: '起风了' };
      this.needReloadPage = true;
      AppStorage.setOrCreate('intentNavDestination', 'Player');
      AppStorage.setOrCreate('intentParams', this.intentParams);
      hilog.info(0x0000, 'testTag', 'Handle intent: open player with params');
    }
  }
}
```

#### 简化方案的关键改进

- **移除了 `targetPage === currentPage` 判断** → 解决二级页面热启动失效。
- **Tab 切换无条件强制跳转主页** → 逻辑清晰，任何页面都能正确跳转。
- **参数传递统一使用 `AppStorage`** → 简单可靠，避免类型问题。

#### 独立页面参数传递详细说明

当目标页面使用 `router.getParams()` 获取参数时，有两种解决方案：

**方案 A（推荐）：修改目标页面，支持从 `AppStorage` 读取参数**

```typescript
// TaskEditPage.ets - 修改后的页面
@Entry
@Component
struct TaskEditPage {
  @State taskId: number = 0;
  @State mode: string = 'create';

  aboutToAppear() {
    // 优先从 AppStorage 获取意图传递的参数
    const params = AppStorage.get<Record<string, Object>>('intentParams');
    if (params) {
      this.taskId = (params.taskId as number) ?? 0;
      this.mode = (params.mode as string) ?? 'create';
      AppStorage.delete('intentParams'); // 使用后清除
    } else {
      // 兼容普通路由跳转
      const routerParams = router.getParams() as Record<string, Object>;
      if (routerParams) {
        this.taskId = routerParams.taskId as number ?? 0;
        this.mode = routerParams.mode as string ?? 'create';
      }
    }
  }
}
```

**方案 B：在 EntryAbility 中通过 LocalStorage 传递（不改页面）**

```typescript
// handleInsightIntent 中
if (want.uri === 'app://task/edit') {
  this.targetPage = 'pages/TaskEditPage';
  this.targetTab = -1;
  this.needReloadPage = true;
  this.intentParams = { taskId: 0, mode: 'create' };
}

// onNewWant 中修改 loadContent 调用
this.windowStage?.loadContent(this.targetPage, new LocalStorage(this.intentParams));
```

> **⚠️ 注意**：方案 B 要求目标页面使用 `@LocalStorageProp` 接收参数，且页面生命周期需适配。推荐使用方案 A，因为它更通用且不破坏原有逻辑。

### 🔧 方案 B：完整方案（仅适用于纯 loadContent 架构）

> ⚠️ **警告**：如果项目使用 `router.pushUrl` 跳转二级页面，请勿使用此方案。

```typescript
onNewWant(want: Want, launchParam: AbilityConstant.LaunchParam): void {
  this.handleInsightIntent(want);
  if (!this.needReloadPage) return;
  // ⚠️ 仅在纯 loadContent 架构下有效
  if (this.targetPage === this.currentPage && this.targetTab >= 0) {
    // 同一页面内切换 Tab，只发送信号
    AppStorage.setOrCreate('intentTargetTab', this.targetTab);
    this.needReloadPage = false;
    return;
  }
  // 不同页面，重新加载
  if (this.windowStage) {
    if (this.targetTab >= 0) {
      AppStorage.setOrCreate('intentTargetTab', -1);
    }
    this.windowStage.loadContent(this.targetPage).then(() => {
      if (this.targetTab >= 0) {
        AppStorage.setOrCreate('intentTargetTab', this.targetTab);
      }
    });
    this.needReloadPage = false;
    this.currentPage = this.targetPage;
  }
}
```

------

### 步骤 3：目标页面实现（Tab 页面示例）

```typescript
@Entry
@Component
struct MainPage {
  @State curr_index: number = 0;
  @StorageLink('intentTargetTab') @Watch('onIntentTargetTabChange') intentTargetTab: number = -1;
  private tabController: TabsController = new TabsController();

  // @Watch 监听（处理热启动、连续意图）
  onIntentTargetTabChange(): void {
    const targetTab = this.intentTargetTab;
    if (targetTab >= 0 && targetTab < 4) {
      // 立即清除信号，防止重复
      AppStorage.setOrCreate('intentTargetTab', -1);
      this.curr_index = targetTab;
      setTimeout(() => {
        this.tabController.changeIndex(targetTab);
        hilog.info(0x0000, 'testTag', 'Switch to tab %{public}d (from @Watch)', targetTab);
      }, 50);
    }
  }

  // Tabs 完全渲染后的回调（冷启动兜底）
  onTabsAppear(): void {
    const pendingTab = AppStorage.get<number>('intentTargetTab');
    if (pendingTab !== undefined && pendingTab >= 0 && pendingTab < 4) {
      AppStorage.setOrCreate('intentTargetTab', -1);
      this.curr_index = pendingTab;
      setTimeout(() => {
        this.tabController.changeIndex(pendingTab);
        hilog.info(0x0000, 'testTag', 'Switch to tab %{public}d (from onAppear)', pendingTab);
      }, 50);
    }
  }

  build() {
    Tabs({ controller: this.tabController }) {
      TabContent() { Text("首页") }.tabBar("首页")
      TabContent() { Text("发现") }.tabBar("发现")
      TabContent() { Text("我的") }.tabBar("我的")
    }
    .onAppear(() => this.onTabsAppear())
  }
}
```

### NavDestination 跳转示例（主页 Navigation 容器）

```typescript
@StorageLink('intentNavDestination') @Watch('onNavDestinationChange') navDest: string = '';
@StorageLink('intentParams') intentParams: Record<string, Object> = {};
private pageStack: NavPathStack = new NavPathStack();

onNavDestinationChange(): void {
  const dest = this.navDest;
  if (dest) {
    AppStorage.setOrCreate('intentNavDestination', '');
    const params = this.intentParams;
    AppStorage.setOrCreate('intentParams', {});
    if (dest === 'Detail') {
      this.pageStack.pushPathByName('DetailPage', params);
    }
  }
}
```

------

### 步骤 4：意图文件生成

```typescript
import { InsightIntentLink } from '@kit.AbilityKit';

@InsightIntentLink({
  intentName: 'OpenMine',
  domain: 'NavigationDomain',
  intentVersion: '1.0.0',
  displayName: '打开我的',
  uri: 'app://mine'
})
export class OpenMineLink { }
```

> 意图文件放置在 `entry/src/main/ets/insightintents/` 目录下。

------

### 步骤 5：配置文件修改

#### 5.1 module.json5（注册 URI）

```json5
{
  "module": {
    "abilities": [
      {
        "name": "EntryAbility",
        "skills": [
          {
            "entities": ["entity.system.home"],
            "actions": ["action.system.home"],
            "uris": [
              { "scheme": "app", "host": "mine" },
              { "scheme": "app", "host": "task", "path": "edit" }
            ]
          }
        ]
      }
    ]
  }
}
```

#### 5.2 insight_intent.json（注册意图文件）

```json
{
  "insightIntentsSrcEntry": [
    { "srcEntry": "./ets/insightintents/OpenMineLink.ets" },
    { "srcEntry": "./ets/insightintents/OpenTaskEditLink.ets" }
  ]
}
```

> 注意：必须使用对象数组格式，不能是字符串数组。

------

## 快速参考

### @InsightIntentLink 必填字段

| 字段            | 类型   | 说明                           | 示例                                       |
| :-------------- | :----- | :----------------------------- | :----------------------------------------- |
| `intentName`    | string | 英文 PascalCase，动词-名词结构 | `"PlayMusic"`, `"OpenProduct"`             |
| `domain`        | string | 域标识符                       | `"MusicDomain"`, `"ShoppingDomain"`        |
| `intentVersion` | string | 语义化版本，三位数格式         | `"1.0.1"`                                  |
| `displayName`   | string | 中文显示名称                   | `"播放音乐"`                               |
| `uri`           | string | 应用的 uri 链接                | `"app://mine"` 或 `"https://example.com/"` |

### @InsightIntentLink 可选字段

| 字段                 | 类型                     | 说明                           |
| :------------------- | :----------------------- | :----------------------------- |
| `displayDescription` | string                   | 详细描述                       |
| `schema`             | string                   | 标准意图 schema                |
| `icon`               | ResourceStr              | 图标资源                       |
| `llmDescription`     | string                   | LLM 理解描述（自定义意图必填） |
| `keywords`           | string[]                 | 搜索关键词（自定义意图必填）   |
| `parameters`         | Record<string, Object>   | 意图参数 JSON Schema           |
| `result`             | Record<string, Object>   | 返回结果 JSON Schema           |
| `paramMappings`      | LinkIntentParamMapping[] | 参数映射配置                   |

### 参数映射（paramMappings）

| 字段               | 类型              | 必填 | 说明                                            |
| :----------------- | :---------------- | :--- | :---------------------------------------------- |
| `paramName`        | string            | 是   | 意图参数的名称                                  |
| `paramMappingName` | string            | 否   | 映射到 URI 或 Want 中的名称                     |
| `paramCategory`    | LinkParamCategory | 否   | `LINK`（拼接到 URL）或 `WANT`（通过 Want 传递） |

**示例：**

```typescript
paramMappings: [
  { paramName: 'songName', paramMappingName: 'music', paramCategory: LinkParamCategory.LINK }
]
// URI 拼接结果: https://example.com/music/?music=歌曲名
```

### URI 配置完整说明

#### 配置位置

在 `entry/src/main/module.json5` 的 `abilities[].skills[].uris` 中配置。

#### URI 字段说明

| 字段            | 类型   | 必填 | 说明                                                         |
| :-------------- | :----- | :--- | :----------------------------------------------------------- |
| `scheme`        | string | 是   | 协议名，**只能包含小写英文字母（a-z）**，不能包含大写字母、数字、点号、下划线等。建议用一个简短的英文单词，如 `myapp`、`health`等（可以根据项目特点概括，但是必须满足前面的条件！）。 |
| `host`          | string | 否   | 域名或标识，强烈建议填写                                     |
| `port`          | number | 否   | 端口号                                                       |
| `path`          | string | 否   | 完整路径（**不加前导斜杠**）                                 |
| `pathStartWith` | string | 否   | 路径前缀（**不加前导斜杠**）                                 |
| `pathRegex`     | string | 否   | 路径正则                                                     |
| `linkFeature`   | string | 否   | 功能类型（Login, Pay, Share, Navigation 等）                 |

#### ✅ 推荐配置模板（避免 99% 的错误）

```json5
"uris": [
  {
    "scheme": "myapp",  // 纯小写英文字母，用一个简短英文单词，避免使用 "app"/"open" 等通用词
    "host": "mine"      // 必填，主机标识
  }
]
```

**说明**：

- 上述配置能匹配 `com.example.myapp://mine` 及 `com.example.myapp://mine/任意路径`。
- **绝大多数意图只需要这一条配置**，无需 `path` 字段。
- 如果确实需要区分不同子页面（例如 `com.example.myapp://video/play` 和 `com.example.myapp://video/stop`），才添加 `path`：

```json5
"uris": [
  { "scheme": "com.example.myapp", "host": "video", "path": "play" },
  { "scheme": "com.example.myapp", "host": "video", "path": "stop" }
]
```

#### 🚫 禁止事项（避免 16000001 错误或匹配失败）

| 错误写法                            | 原因                                                         | 正确写法                                                     |
| :---------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `"type": "text/plain"`              | `type` 不是 `uris` 允许的字段，会导致整个配置项被系统忽略    | **删除 `type` 字段**                                         |
| `"path": ""`                        | 空字符串路径匹配不稳定：部分版本会失败，部分虽能工作但不可靠 | **省略 `path` 字段**（不写）                                 |
| `"path": "/home"`                   | 路径带有前导斜杠，实际 URI 会变成 `app://host//home`（双斜杠） | 去掉斜杠：`"path": "home"`                                   |
| 同时使用 `path` 和 `pathStartWith`  | 两者关系未明确定义，可能导致非预期匹配（不是编译错误，但行为不确定） | **只使用其中一个**，优先使用 `path`                          |
| `scheme` 使用过于通用（如 `"app"`） | 容易与其他应用冲突，导致无法拉起你的应用                     | 使用 **bundleName** 或至少 `"myapp"` 级别的独特标识          |
| `linkFeature` 随意填写              | 虽然不破坏匹配，但语义错误会影响小艺建议等高级功能           | 不需要时省略；需要时仅使用 `Login`、`Pay`、`Share`、`Navigation` 等预定义值 |

> **核心原则**：**最小化配置 + 唯一标识** —— 只写必要的 `scheme` 和 `host`，不要画蛇添足。

#### 配置步骤（AI 执行清单）

1. **确定 `scheme`**：优先使用应用的 `bundleName`（如 `com.example.app`）。如果没有特殊要求，也可用 `myapp` 等唯一短标识。**禁止使用 `app`、`open`、`page` 等通用词**。

2. **确定 `host`**：根据功能取一个有意义的标识（如 `mine`、`video`、`settings`）。

3. **在 `module.json5` 中添加 `uris`**：找到目标 `ability` 的 `skills` 数组，在任一 `skill` 的 `uris` 中加入上述配置。若该 `ability` 没有 `skills`，先创建一个：

   ```json5
   "skills": [
     {
       "skills": [...],  // 已有的其他 skill 配置
       "uris": [{ "scheme": "com.example.myapp", "host": "mine" }]
     }
   ]
   ```

4. **在 `@InsightIntentLink` 中使用完整 URI**：`uri: 'com.example.myapp://mine'`

#### 不存在 URI 配置时的自动添加模板

如果项目尚未配置 URI，AI 应按以下模板自动添加（需用户确认）：

```json5
// 在 module.json5 对应 ability 的 skills[0].uris 中追加（若没有 skills 则创建）
"uris": [
  {
    "scheme": "myapp",   // 纯小写英文字母，用一个简短英文单词，避免使用 "app"/"open" 等通用词
    "host": "default"    // 可替换为功能名
  }
]
```

> ⚠️ **特别注意**：AI 在写入配置前必须先展示给用户确认，尤其要检查是否出现禁止项（如空 `path`、前导斜杠、`type` 字段等）。用户确认后再写入。

## ⚠️ 关键规则总结（必读）

1. **实现前必须先分析目标页面代码**（见步骤0），确认参数依赖和组件类型。
2. **`handleInsightIntent` 必须立即写入 `AppStorage`**（冷启动依赖）
   ✅ `AppStorage.setOrCreate('intentTargetTab', 3);`
   ❌ `setTimeout(() => ..., 100);`
3. **Tab 切换必须调用 `tabController.changeIndex()`**
   ✅ `setTimeout(() => this.tabController.changeIndex(targetTab), 50);`
   ❌ 只修改 `curr_index` 不会刷新内容。
4. **使用 `@StorageLink` + `@Watch`（不依赖页面生命周期）**
   ✅ `@StorageLink('intentTargetTab') @Watch('onChange') tab: number;`
   ❌ 在 `onPageShow` 中读取，连续意图失效。
5. **冷启动双重保障（`@Watch` + `onAppear`）**
   - `@Watch` 处理热启动和连续意图。
   - `Tabs().onAppear()` 处理冷启动时 Tabs 未完全渲染的兜底。
6. **不要使用 `hasHandledIntent` 标志**（导致连续意图失效）。
7. **参数传递统一使用 `AppStorage`**（`want.parameters` 类型不安全）。
8. **优先保证正确性，再考虑性能优化**。简化方案虽然会重新加载页面，但可靠性高。

------

## ✅ 完整检查清单

### 分析阶段（步骤0）

- ✅ 已读取目标页面完整代码
- ✅ 已确认页面是否依赖 `router.getParams()` 或其他参数获取方式
- ✅ 已记录参数结构和必需字段
- ✅ 已确定页面组件类型（Tabs / NavDestination / 普通页面）

### EntryAbility.ets

- ✅ 字段完整（`targetPage`, `currentPage`, `windowStage`, `needReloadPage`, `targetTab`, `navDestinationName`, `intentParams`）
- ✅ `handleInsightIntent` 中立即写入 `AppStorage`（Tab 切换场景）
- ✅ `onCreate` 调用 `handleInsightIntent`
- ✅ `onNewWant` 调用 `handleInsightIntent`
- ✅ `onNewWant` 先清除旧信号，再写入新信号
- ✅ `onWindowStageCreate` 保存 `windowStage` 引用并加载默认页面
- ✅ 对于需要参数的独立页面，已实现参数传递（方案A或方案B）

### 目标页面（Tab 页）

- ✅ 使用 `@StorageLink('intentTargetTab') + @Watch`
- ✅ 添加 `Tabs().onAppear()` 兜底
- ✅ 调用 `tabController.changeIndex()` 强制刷新内容
- ✅ 立即清除信号（设为 -1）

### 配置文件

- ✅ `module.json5` 中 `skills[0].uris` 正确配置
- ✅ `insight_intent.json` 使用对象数组格式注册意图文件

------

## 🚀 快速生成模板

### 模板 1：打开 Tab 页面（“我的” Tab，索引 3）

**意图文件**：

```typescript
@InsightIntentLink({ intentName: 'OpenMine', domain: 'NavigationDomain', intentVersion: '1.0.0', displayName: '打开我的', uri: 'app://mine' })
export class OpenMineLink { }
```

**EntryAbility 处理**：

```typescript
if (want.uri === 'app://mine') {
  this.targetPage = 'pages/Index';
  this.targetTab = 3;
  this.needReloadPage = true;
  AppStorage.setOrCreate('intentTargetTab', 3);
}
```

### 模板 2：打开独立页面（无参数）

```typescript
if (want.uri === 'app://settings') {
  this.targetPage = 'pages/Settings';
  this.targetTab = -1;
  this.needReloadPage = true;
}
```

### 模板 3：打开独立页面（需要参数，如编辑页面）

```typescript
if (want.uri === 'app://task/edit') {
  this.targetPage = 'pages/TaskEditPage';
  this.targetTab = -1;
  this.needReloadPage = true;
  this.intentParams = { taskId: 0, mode: 'create' };
  AppStorage.setOrCreate('intentParams', this.intentParams);
}
```

### 模板 4：打开 NavDestination

```typescript
if (want.uri === 'app://detail') {
  this.targetPage = 'pages/Index';
  this.navDestinationName = 'Detail';
  this.needReloadPage = true;
  AppStorage.setOrCreate('intentNavDestination', 'Detail');
}
```

------

## 🔧 常见问题排查

| 问题                     | 现象                             | 原因                                                         | 解决方案                                                     |
| :----------------------- | :------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| 冷启动 Tab 切换失败      | 冷启动打开意图显示首页，不切 Tab | `@Watch` 在 Tabs 完全渲染前触发                              | 添加 `Tabs().onAppear()` 兜底                                |
| 连续意图失效             | 第一次意图正常，第二次无响应     | 使用了 `hasHandledIntent` 标志                               | 删除标志，通过清除信号防重                                   |
| 二级页面热启动失败       | 在二级页面触发意图无响应         | 使用了完整方案，`currentPage` 判断错误                       | 改用简化方案                                                 |
| Tab 指示器变了但内容不变 | Tab 高亮切换，页面内容未变       | 只改了 `curr_index`，未调用 `changeIndex`                    | 调用 `tabController.changeIndex()`                           |
| 参数未传递               | 目标页面收不到参数               | `handleInsightIntent` 中未立即写入 `AppStorage`，或页面未适配 | 在解析 URI 时立即 `setOrCreate`，并修改页面从 `AppStorage` 读取 |
| 页面白屏/闪退            | 意图跳转后页面崩溃               | 目标页面依赖 `router.getParams()` 但未提供参数               | 按步骤0分析后，实现参数传递（方案A）                         |
| 16000001 错误            | 应用无法拉起                     | URI 配置错误，如含有 `type` 字段、`path` 为空或带斜杠        | 按“禁止事项”修改 `uris` 配置，确保只使用允许字段且 `path` 格式正确 |

------

## 📊 方案对比

| 特性       | 简化方案（推荐）                             | 完整方案（备选）           |
| :--------- | :------------------------------------------- | :------------------------- |
| 适用架构   | 混合路由（`loadContent` + `router.pushUrl`） | 纯 `loadContent`           |
| 逻辑复杂度 | 简单                                         | 复杂                       |
| 可靠性     | 高                                           | 中（依赖正确追踪当前页面） |
| 性能       | 稍低（Tab 切换重新加载）                     | 稍高（不重新加载）         |
| 维护成本   | 低                                           | 高                         |
| 推荐度     | ⭐⭐⭐⭐⭐                                        | ⭐⭐                         |

------

## 相关资源

- [@InsightIntentLink API 参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-insightintentdecorator#insightintentlink)
- [应用链接说明](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-uri-config)
- [标准意图接入规范](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/insight-intent-access-specifications)
- [各垂域意图 Schema](https://developer.huawei.com/consumer/cn/doc/service/intents-schema-0000001901962713)

