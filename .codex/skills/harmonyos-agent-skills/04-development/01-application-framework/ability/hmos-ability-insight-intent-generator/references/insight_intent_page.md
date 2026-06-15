# 使用 @InsightIntentPage 装饰器创建页面跳转意图

使用该装饰器装饰当前应用的页面，可以将页面定义为意图，便于 AI 入口通过意图快速跳转到指定页面。

---

## 🔴 核心规范（生成代码前必须遵守）

### 必填字段检查清单

| 字段                  | 状态             | 说明                                                                 |
| :-------------------- | :--------------- | :------------------------------------------------------------------- |
| `intentName`          | ✅ 必填           | 英文 PascalCase，动词-名词结构                                       |
| `domain`              | ✅ 必填           | 域标识符                                                             |
| `intentVersion`       | ✅ 必填           | 语义化版本，默认 `"1.0.1"`                                           |
| `displayName`         | ✅ 必填           | 中文显示名称                                                         |
| `pagePath`            | ✅ 必填           | 页面路径，格式：`./ets/pages/XXX`                                    |
| `uiAbility`           | ✅ 必填           | 从 `module.json5` 获取的 Ability 名称                                |
| `navigationId`        | ✅ 必填           | Navigation 组件的 `id`，热启动跳转的关键                             |
| `navDestinationName`  | ✅ 必填           | Navigation 子页面名称，热启动跳转的目标                              |
| `llmDescription`      | ⚠️ 自定义意图必填 | LLM 理解描述                                                         |
| `keywords`            | ⚠️ 自定义意图必填 | 搜索关键词数组                                                       |

### 装饰器组合规则

```typescript
// 必须按照以下顺序装饰
@Entry
@Component
@InsightIntentPage({...})  // 放在 @Component 之后
struct PageName {
  build() { ... }
}
```

### 🚨 强制：`navigationId` 和 `navDestinationName` 配置

**这是热启动正确跳转的唯一保障，缺少会导致热启动白屏或跳转失败。**

#### 运行机制原理

`@InsightIntentPage` 的意图执行有两种路径：

| 启动场景 | 跳转方式 | 是否需要 navigationId |
| :------- | :------- | :------------------ |
| 冷启动（应用未运行） | `startAbility` → 首页加载后 → 跳转到 `pagePath` 页面 | 不依赖（走 router） |
| 热启动（应用已运行） | 通过 Navigation 栈 push 目标页面 | **必须**，否则框架找不到 Navigation 实例 |

**热启动白屏根因**：没有 `navigationId` 时，意图框架在热启动下**无法定位 Navigation 组件实例**，无法通过 NavPathStack 做页面跳转。官方兜底机制是退化为 `pagePath` 的 router 跳转，但退化不一定总是成功，导致偶发白屏。

#### 配置规则

1. **`navigationId`**：必须与页面中 `Navigation` 组件的 `.id()` 值一致，用于框架定位 Navigation 实例。
2. **`navDestinationName`**：目标子页面的名称，框架通过此名称在 Navigation 栈中 push 对应的 NavDestination。

#### 两种页面场景的配置方式

**场景 A：页面本身就是 Navigation 根容器（主页/Index）**

```typescript
@Entry
@Component
@InsightIntentPage({
  intentName: 'OpenHomePage',
  domain: 'GameDomain',
  intentVersion: '1.0.1',
  displayName: '打开主页',
  llmDescription: '跳转到应用主页。当用户说"打开主页"时调用。',
  keywords: ['主页', '首页', 'OpenHome'],
  uiAbility: 'EntryAbility',
  pagePath: './ets/pages/Index',
  navigationId: '1',
  navDestinationName: 'PageOne'
})
struct Index {
  build() {
    Column() {
      Navigation() {
        // 页面内容
      }
      .id('1')  // 必须与 navigationId 一致
      .title("主页")
    }
  }
}
```

**场景 B：页面是 Navigation 的 NavDestination 子页面**

```typescript
// 主页 Navigation 需要有 .id('1')
// 子页面装饰器中 navigationId 与主页 Navigation 的 id 一致
// navDestinationName 与 NavDestination 的 name 一致

@InsightIntentPage({
  intentName: 'OpenSettings',
  domain: 'SystemSettingsDomain',
  intentVersion: '1.0.1',
  displayName: '打开设置',
  llmDescription: '跳转到设置页面。当用户说"打开设置"时调用。',
  keywords: ['设置', '配置'],
  uiAbility: 'EntryAbility',
  pagePath: './ets/pages/MainPage',
  navigationId: '1',          // 与主页 Navigation().id('1') 一致
  navDestinationName: 'SettingsPage'  // 与 NavDestination name 一致
})
```

### 🚨 强制：Navigation 页面防白屏机制（冷启动）

**冷启动时 Navigation 组件在布局测量完成前创建，高度可能计算为 0，导致白屏。必须实现延迟渲染。**

**标准模板（可直接复制）：**

```typescript
@Entry
@Component
@InsightIntentPage({...})
struct MyPage {
  @State renderNav: boolean = false;
  private firstLoad: boolean = true;

  aboutToAppear(): void {
    setTimeout(() => {
      this.renderNav = true;
      this.firstLoad = false;
    }, 0);
  }

  onPageShow(): void {
    if (!this.firstLoad) {
      this.renderNav = false;
      setTimeout(() => {
        this.renderNav = true;
      }, 50);
    }
  }

  build() {
    Column() {
      if (this.renderNav) {
        Navigation() {
          // 页面原有内容
        }
        .id('1')  // 与 navigationId 一致
        // Navigation 的其他属性
      } else {
        Blank()
      }
    }
  }
}
```

**防白屏要点**：
- `@State renderNav` **不要加 `private`**，否则状态观测失效
- `onPageShow` 中重建延迟用 `50`（不用 `0`），`setTimeout(0)` 太短可能被框架合并状态变更
- 条件只需 `!this.firstLoad`，无需额外判断 `renderNav`

### 严禁创建单独的意图类

`@InsightIntentPage` **必须直接装饰 `struct` 页面组件**，不能创建单独的类。

### 何时配置 `insight_intent.json`

| 操作场景                                           | 是否需要配置 |
| :------------------------------------------------- | :----------- |
| 修改现有页面文件，添加 `@InsightIntentPage` 装饰器 | ❌ 无需配置   |
| 新建独立的意图文件（`@InsightIntentEntry` 等）     | ✅ 需要配置   |

------

## 项目配置要求

使用 `@InsightIntentPage` 前，请确保项目满足以下配置：

- `build-profile.json5` 中已启用 `useNormalizedOHMUrl: true`
- `compileSdkVersion >= 20`

详细检查流程和配置示例请参阅 **[project_config_checks.md](project_config_checks.md/)**。

------

## Quick Start

### 最小示例（不使用 Navigation 的独立页面）

```typescript
import { InsightIntentPage } from '@kit.AbilityKit';

@Entry
@Component
@InsightIntentPage({
  intentName: 'OpenSettings',
  domain: 'SystemSettingsDomain',
  intentVersion: '1.0.1',
  displayName: '打开设置',
  llmDescription: '打开应用设置页面',
  keywords: ['设置', '配置'],
  uiAbility: 'EntryAbility',
  pagePath: './ets/pages/SettingsPage',
  navigationId: '1',
  navDestinationName: 'PageOne'
})
struct SettingsPage {
  build() {
    Column() {
      Text('设置页面').fontSize(24)
    }
    .width('100%')
    .height('100%')
  }
}
```

### 示例：Navigation 根容器页面（含防白屏 + navigationId）

```typescript
@Entry
@Component
@InsightIntentPage({
  intentName: 'OpenHomePage',
  domain: 'GameDomain',
  intentVersion: '1.0.1',
  displayName: '打开主页',
  llmDescription: '跳转到应用主页。当用户说"打开主页"、"进入游戏"时调用。',
  keywords: ['主页', '首页'],
  uiAbility: 'EntryAbility',
  pagePath: './ets/pages/Index',
  navigationId: '1',
  navDestinationName: 'PageOne'
})
struct Index {
  @State renderNav: boolean = false;
  private firstLoad: boolean = true;

  aboutToAppear(): void {
    setTimeout(() => { this.renderNav = true; this.firstLoad = false; }, 0);
  }

  onPageShow(): void {
    if (!this.firstLoad) {
      this.renderNav = false;
      setTimeout(() => { this.renderNav = true; }, 50);
    }
  }

  build() {
    Column() {
      if (this.renderNav) {
        Navigation() {
          // 主页内容（List、Grid 等）
        }
        .id('1')
        .title("应用主页")
      } else {
        Blank()
      }
    }
  }
}
```

### 接收意图参数

```typescript
@Entry
@Component
@InsightIntentPage({
  // ... 其他配置
  parameters: {
    keyword: { type: 'string', required: true }
  }
})
struct SearchPage {
  @State keyword: string = '';  // 自动注入
}
```

------

## 快速参考

### @InsightIntentPage 字段完整列表

| 字段                 | 类型   | 必选 | 说明                                                                 |
| :------------------- | :----- | :--- | :------------------------------------------------------------------- |
| `intentName`         | string | 是   | 英文 PascalCase，动词-名词结构，最大长度 64                          |
| `domain`             | string | 是   | 意图所属的功能垂域                                                   |
| `intentVersion`      | string | 是   | 语义化版本，**必须三位数格式**，默认 `"1.0.1"`                       |
| `displayName`        | string | 是   | 中文显示名称，最大长度 64                                            |
| `pagePath`           | string | 是   | Navigation 组件所在页面路径，格式 `./ets/pages/XXX`                  |
| `navigationId`       | string | 是   | Navigation 组件的 id，热启动跳转必需                                 |
| `navDestinationName` | string | 是   | Navigation 子页面名称，热启动跳转目标                                |
| `uiAbility`          | string | 否   | ⚠️ 字段名是 `uiAbility`，不是 `abilityName`，不传默认 EntryAbility   |
| `llmDescription`     | string | 否   | 意图描述，便于大模型理解并调用                                       |
| `keywords`           | array  | 否   | 搜索关键词数组                                                       |
| `parameters`         | object | 否   | 意图参数定义，JSON Schema 格式                                       |

### `pagePath` 路径格式

- 正确：`'./ets/pages/Index'`
- 错误：`'pages/Index'`（缺少 `./ets/`）或 `'./ets/pages/Index.ets'`（包含后缀）

### 字段命名规范

| 装饰器                | Ability 名称字段 |
| :-------------------- | :--------------- |
| `@InsightIntentPage`  | `uiAbility`      |
| `@InsightIntentEntry` | `abilityName`    |

------

## 常见问题

### Q1: 页面热启动白屏？

**原因**：缺少 `navigationId` 或 `navDestinationName`，意图框架在热启动时找不到 Navigation 实例，无法通过 NavPathStack 做页面跳转，退化到 router 方式也不一定成功。
**解决**：在 `@InsightIntentPage` 中配置 `navigationId`（与 Navigation 组件 `.id()` 一致）和 `navDestinationName`。

### Q2: 页面冷启动白屏？

**原因**：Navigation 组件在布局测量完成前创建，高度计算为 0。
**解决**：实现延迟渲染防白屏机制（见上文"强制：Navigation 页面防白屏机制"）。

### Q3: navigationId 和 navDestinationName 如何确定？

- `navigationId`：与页面中 `Navigation` 组件的 `.id()` 属性值一致
- `navDestinationName`：Navigation 子页面的名称
  - 如果页面本身就是 Navigation 根容器，设置一个合理的名称即可（如 `'PageOne'`）
  - 如果页面是 NavDestination 子页面，与 NavDestination 的 name 属性一致

### Q4: 能否在 Navigation 根容器内部使用 `router.pushUrl`？

**可以**，这是允许的混用方式。

### Q5: 项目配置检查？

请参阅 **[project_config_checks.md](project_config_checks.md/)**。

------

## 相关资源

- [@InsightIntentPage API 参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-insightintentdecorator#insightintentpage)
- [标准意图接入规范](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/insight-intent-access-specifications)
