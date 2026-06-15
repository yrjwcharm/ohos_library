# 平行视界（EasyGo）分栏适配指南

## 概述

平行视界（EasyGo）是 HarmonyOS 的系统级兼容方案，通过标准化配置文件让未适配分栏布局的应用在宽屏设备上自动实现分栏显示。左侧固定为主页，路由跳转只发生在右侧，两个页面共享同一个 UIAbility 窗口实例。

> 注意：平行视界（EasyGo 分栏）与应用内分屏（`startAbility` + `StartOptions` 启动另一个 UIAbility）是不同的多窗口方案，不要混淆。

### 平行视界与 Navigation 分栏的对比

| | 平行视界（EasyGo） | Navigation 分栏 |
|---|---|---|
| **接入方式** | 静态配置文件 `easy_go.json`，无需修改页面代码 | 在页面代码中使用 Navigation 组件，通过 `mode`/`navBarWidth` 等属性控制 |
| **接入成本** | 低，添加配置文件即可生效 | 较高，需要设计 NavDestination 路由、处理 Stack/Split 切换逻辑 |
| **灵活性** | 差，分栏行为由静态配置决定，运行时无法动态调整布局效果 | 高，可在运行时根据断点、业务状态动态修改 NavigationMode、导航栏宽度、侧边栏显隐等 |
| **页面控制** | 左侧固定为主页，路由跳转只发生在右侧，无法自定义左右页面比例 | 可自由控制导航栏与内容区的宽度比例、路由跳转、三栏布局等 |
| **适用场景** | 已有应用快速兼容宽屏设备，无需改动页面代码 | 需要精细控制分栏布局、多断点适配、复杂路由交互的场景 |

**选型建议**：优先使用 Navigation 分栏方案（参考[响应式布局指南](./responsive_layout.md) `RESP-02` 分栏布局），仅在需要低成本兼容已有应用时使用平行视界。

## 适用场景

- 邮件列表与邮件详情
- 商品列表与商品详情
- 新闻列表与新闻内容
- IM 会话列表与聊天窗口
- 其他"列表-详情"类应用

适用设备：折叠屏展开态、平板横屏等宽屏/大屏设备。

## 关键能力

### 1. 配置文件声明

在 entry 模块中创建 `easy_go.json` 配置文件并在 `module.json5` 中声明引用，是平行视界生效的前置条件。

- 创建配置文件 `resources/base/profile/easy_go.json`：

```json
{
  "common": {
    "displayModeOptions": {
      "wideWindowMode": "navigationSplit",
      "squareWindowMode": "navigationSplit",
      "navigationSplitOptions": {
        "homePage": "navBar",
        "relatedPage": "DetailPage"
      }
    }
  }
}
```

- 在 `module.json5` 中声明引用：

```json5
{
  "module": {
    "name": "entry",
    "type": "entry",
    "easyGo": "$profile:easy_go"
  }
}
```

### 2. 窗口模式覆盖

折叠屏展开态屏幕接近方形（如 1:1），仅配置 `wideWindowMode`（要求高/宽 <= 1.2）可能无法触发分栏，**必须同时配置 `squareWindowMode` 确保覆盖**。

```json
{
  "common": {
    "displayModeOptions": {
      "wideWindowMode": "navigationSplit",
      "squareWindowMode": "navigationSplit",
      "navigationSplitOptions": {
        "homePage": "navBar",
        "relatedPage": "DetailPage"
      }
    }
  }
}
```

### 3. 导航模式选型

根据应用的导航架构选择对应的 Split 类型，两种 SplitOptions 不能同时存在：

| 导航模式 | Split 类型 | 配置字段 |
|---------|-----------|---------|
| Navigation 导航 | `navigationSplit` | `navigationSplitOptions` |
| Router 导航 | `routerSplit` | `routerSplitOptions` |
| 关闭兼容运行行为 | `original` | — |

> **重要**：启用平行视界后，不要混用 Navigation 和 Router 两种路由框架，否则会导致部分行为异常。

> **`original`**：关闭窗口显示模式的所有兼容运行行为，即不启用平行视界分栏，应用以原始模式显示。适用于需要在特定设备类型上禁用分栏的场景（如仅在 tablet 上关闭分栏）。

### 4. 分栏后 UI 截断处理

分栏后页面宽度减半，元素仍按全宽布局会导致截断。处理优先级：

1. 优先使用系统组件的自适应布局能力/断点系统能力
2. 必要时开启虚拟容器（`enableReducedContainerSize: true`），让宽度按一半计算

```json
{
  "navigationSplitOptions": {
    "homePage": "navBar",
    "relatedPage": "DetailPage",
    "enableReducedContainerSize": true
  }
}
```

### 5. 分屏场景下保持分栏（enableInSplitScreen）

当应用同时使用平行视界分栏和分屏时，分屏后原窗口默认不会触发 EasyGo 分栏。**必须**在 `navigationSplitOptions` / `routerSplitOptions` 中配置 `enableInSplitScreen: true`，否则分屏后原窗口将丢失分栏效果，回退为 Stack 全屏导航。

> **强制要求**：除非目标 API 版本不支持该字段（API 26 以下）或用户明确要求不启用，否则所有 EasyGo 配置的 `navigationSplitOptions` / `routerSplitOptions` 中**都必须包含 `"enableInSplitScreen": true`**。

```json
{
  "navigationSplitOptions": {
    "homePage": "navBar",
    "relatedPage": "DetailPage",
    "enableReducedContainerSize": true,
    "enableInSplitScreen": true
  }
}
```

### 6. 分栏生效范围控制（homeNavigationId）

`easy_go.json` 是模块级配置，模块内所有 UIAbility 的窗口只要满足宽屏条件，EasyGo 都会尝试对其中的 Navigation 接管分栏。分栏的触发条件是窗口宽高比满足 `wideWindowMode` / `squareWindowMode` 的阈值，与 `relatedPage` 等页面名称无关——`relatedPage` 仅指定分栏启动时右侧默认展示的页面，不是分栏的触发条件。

当应用中存在多个 UIAbility（如主窗口 + 比价窗口），各窗口内含独立 Navigation 时，需要通过 `homeNavigationId` 将平行视界精确绑定到目标 Navigation，避免 EasyGo 对非预期窗口也产生分栏。

**不配置 `homeNavigationId` 的风险**：EasyGo 默认使用最外层 Navigation 进行分栏。如果模块内多个窗口各自拥有 Navigation，且窗口尺寸满足宽屏条件，EasyGo 可能对非预期窗口也触发分栏，导致布局异常。

**配置方式**：

1. 在 `easy_go.json` 的 `navigationSplitOptions` 中指定 `homeNavigationId`：

```json
{
  "navigationSplitOptions": {
    "homePage": "navBar",
    "relatedPage": "HotelDetail",
    "homeNavigationId": "MainNav",
    "enableReducedContainerSize": true,
    "enableInSplitScreen": true
  }
}
```

2. 在目标 Navigation 组件上设置对应的 `id`：

```typescript
// Index.ets — 主窗口，期望生效平行视界
Navigation(this.navPathStack) {
  // ...
}
.mode(NavigationMode.Stack)
.id('MainNav')  // 匹配 easy_go.json 中的 homeNavigationId
.navDestination(this.pageMap)
```

3. 其他窗口的 Navigation **不设置** 该 `id`，EasyGo 即不会对其生效：

```typescript
// ComparePage.ets — 比价窗口，不需要平行视界分栏
Navigation(this.navPathStack) {
  // ...
}
.mode(NavigationMode.Stack)
.hideTitleBar(true)
.navDestination(this.pageMap)  // 无 .id('MainNav')，EasyGo 不接管
```

> **最佳实践**：只要模块内存在多个 Navigation（常见于比价场景、多窗口场景），就**必须**通过 `homeNavigationId` + Navigation `.id()` 显式绑定，明确声明平行视界只对哪个 Navigation 生效，消除歧义。

### 页面名称字段的取值规则

`homePage`、`relatedPage`、`fullScreenPages`、`pagePairs`、`transPages` 这几个字段涉及页面标识，其取值格式取决于应用使用的路由框架：

| 字段 | Router 路由模式下的值 | Navigation 路由模式下的值 |
|------|---------------------|------------------------|
| `homePage` | 页面路由 URL，如 `"pages/Index"` | `"navBar"` 或 NavDestination 的 `name` 属性值 |
| `relatedPage` | 页面路由 URL，如 `"pages/DetailPage"` | NavDestination 的 `name` 属性值，如 `"DetailPage"` |
| `fullScreenPages` | 页面路由 URL 数组，如 `["pages/AlbumPage"]` | NavDestination `name` 属性值数组，如 `["AlbumPage"]` |
| `pagePairs` | `from`/`to` 为页面路由 URL | `from`/`to` 为 NavDestination `name` |
| `transPages` | 页面路由 URL 数组 | NavDestination `name` 属性值数组 |

> **`homePage` 取值说明**：Navigation 模式下，`homePage` 可以填 `"navBar"`（表示 Navigation 组件自身的导航栏区域作为左侧主页），也可以填某个 NavDestination 的 `name`（表示该 NavDestination 作为左侧主页）。其余涉及页面标识的字段（`relatedPage`、`fullScreenPages`、`pagePairs`、`transPages`）均使用 NavDestination 的 `name` 属性值。

**Router 模式示例**（使用 `routerSplit` + `routerSplitOptions`）：

```json
{
  "common": {
    "displayModeOptions": {
      "wideWindowMode": "routerSplit",
      "squareWindowMode": "routerSplit",
      "routerSplitOptions": {
        "homePage": "pages/Index",
        "relatedPage": "pages/DetailPage",
        "fullScreenPages": ["pages/AlbumPage", "pages/ProfilePage"],
        "mode": 1,
        "pagePairs": [
          { "from": "pages/Index", "to": "pages/DetailPage" }
        ],
        "transPages": ["pages/ProfilePage"]
      }
    }
  }
}
```

**Navigation 模式示例**（使用 `navigationSplit` + `navigationSplitOptions`）：

```json
{
  "common": {
    "displayModeOptions": {
      "wideWindowMode": "navigationSplit",
      "squareWindowMode": "navigationSplit",
      "navigationSplitOptions": {
        "homePage": "navBar",
        "relatedPage": "DetailPage",
        "fullScreenPages": ["AlbumPage", "ProfilePage"],
        "mode": 1,
        "pagePairs": [
          { "from": "Index", "to": "DetailPage" }
        ],
        "transPages": ["ProfilePage"]
      }
    }
  }
}
```

> **关键区别**：Router 模式下页面标识为 `main_pages.json` 中注册的完整路径（如 `"pages/Index"`）；Navigation 模式下页面标识为 NavDestination 组件上设置的 `name` 属性值（如 `"DetailPage"`），而非路由路径。

### 配置字段速查

| 字段                           | 说明                                                                                                                            | 类型 | 最低 API |
|------------------------------|-------------------------------------------------------------------------------------------------------------------------------|------|----------|
| `homePage`                   | 主页名称。Navigation 用 `"navBar"` 或 NavDestination name；Router 用页面路径（如 `"pages/Index"`）                                                                  | string | — |
| `relatedPage`                | 关联页名称，分栏启动时的默认分栏页面。Navigation 用 NavDestination name；Router 用页面路径（如 `"pages/DetailPage"`）                                              | string | — |
| `enableReducedContainerSize` | 开启虚拟容器，让宽度按一半计算，解决分栏截断（默认 false）                                                                                              | boolean | — |
| `fullScreenPages`            | 全屏页数组，跳转到这些页面时退出分栏。Navigation 用 NavDestination name 数组；Router 用页面路径数组                                                                                                            | string[] | — |
| `supportLandscapeFullscreen` | 应用请求横屏时是否全屏（默认 true）                                                                                                          | boolean | — |
| `homeNavigationId`           | 分栏 Navigation 的 id（组件通用属性），不配置时使用最外层 Navigation 进行分栏。推荐配置为做全局路由的 Navigation 的 id，配置为其他 Navigation 可能导致布局异常（仅 navigationSplit） | string | — |
| `disablePlaceholder`         | 是否隐藏占位页（默认 false，仅 navigationSplit）                                                                                           | boolean | — |
| `disableDivider`             | 是否隐藏分割线（默认 false，仅 navigationSplit）                                                                                           | boolean | — |
| `mode`                       | 分栏模式。`0`：购物模式（左右均支持路由跳转）；`1`：导航模式（左侧固定主页，右侧显示详情页）                                                                             | number | **API 26** |
| `wideSplit`                  | 控制 wideWindow 模式下左右分栏的宽度比例（仅 wideWindowMode 生效）。格式：`{ "ratio": "左比例 | 右比例" }`，**竖线前后必须各有一个空格**。如 `"2 \| 1"` 表示左右 2:1，`"1 \| 2"` 表示左右 1:2 | { "ratio": string } | **API 26** |
| `squareSplit`                | 控制 squareWindow 模式下左右分栏的宽度比例（仅 squareWindowMode 生效）。格式同 `wideSplit`，**竖线前后必须各有一个空格**                                                 | { "ratio": string } | **API 26** |
| `dialogSupportSplit`         | 平行视界分栏模式下是否支持弹窗分栏显示（默认 false，仅 navigationSplit）                                                                               | boolean | **API 26** |
| `splitDividerColor`          | 设置分割线颜色。`light` 为浅色模式下的颜色，`dark` 为深色模式下的颜色，值为十六进制字符串 `#AARRGGBB`（AA=透明度，RR=红，GG=绿，BB=蓝）                                       | { "light": string, "dark": string } | **API 26** |
| `pagePairs`                  | 导航模式（`mode` 为 1）下用来实现购物模式的页面对配置。`from` 为源页 name，`to` 为目标页 name，`"*"` 表示任意页面。匹配的页面对跳转时采用购物模式行为（原右侧迁移到左侧）。Navigation 用 NavDestination name；Router 用页面路径 | [{ "from": string, "to": string }] | **API 26** |
| `transPages`                 | 购物模式（`mode` 为 0）下用来实现导航模式的页面列表。匹配的页面跳转时采用导航模式行为（新页面直接替换原右侧页面）。Navigation 用 NavDestination name 数组；Router 用页面路径数组                                                              | [string] | **API 26** |
| `enableInSplitScreen`        | 分栏应用是否支持在分屏场景分栏（默认 false）                                                                                         | boolean | **API 26** |
| `drawableRectHook`           | 窗口 hook 时是否 hook drawableRect 中的窗口宽度（默认 false）                                                                          | boolean | **API 26** |

> **API 兼容说明**：标记为 **API 26** 的字段在低于 API 26 的设备上配置后不生效，出现这些字段系统会报错。

## 多设备差异化配置

不同设备可使用独立的配置段覆盖 `common` 中的默认值：

| 设备类型 | 说明 | 优先级 |
|---------|------|--------|
| `common` | 通用设备配置，为所有设备类型提供基础默认配置 | 最低（被具体设备类型覆盖） |
| `phone` | 手机类型设备上生效，配置后与 `common` 合并生效 | 高于 `common` |
| `tablet` | 平板类型设备上生效，配置后与 `common` 合并生效| 高于 `common` |
| `2in1` | 二合一设备上生效，配置后与 `common` 合并生效 | 高于 `common` |

```json
{
  "common": {
    "displayModeOptions": {
      "wideWindowMode": "navigationSplit",
      "squareWindowMode": "navigationSplit",
      "navigationSplitOptions": {
        "homePage": "navBar",
        "relatedPage": "DetailPage"
      }
    }
  },
  "tablet": {
    "displayModeOptions": {
      "wideWindowMode": "navigationSplit",
      "navigationSplitOptions": {
        "homePage": "navBar",
        "relatedPage": "DetailPage",
        "enableReducedContainerSize": true
      }
    }
  }
}
```

## 页面大小监听

分栏/全屏切换时动态调整 UI：

```typescript
// Navigation 模式
navPathStack.on('navDestinationUpdate', (info) => { /* NavDestination 状态变化 */ })
navPathStack.onNavDestinationSizeChange((info) => { /* 大小变化回调 */ })

// Router 模式
uiContext.getRouter().on('routerPageUpdate', (info) => { /* 页面状态变化 */ })
uiContext.getRouter().onRouterPageSizeChange((info) => { /* 大小变化回调 */ })
```

## 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| 折叠屏展开态不分栏 | `wideWindowMode` 要求高/宽 <= 1.2，折叠屏展开态接近方形可能超阈值 | 同时配置 `squareWindowMode` |
| 分栏后 UI 截断 | 页面宽度减半但元素按全宽布局 | 开启 `enableReducedContainerSize: true` 或自适应布局 |
| 左右页共享 UI 资源 | NodeContainer 复用机制 | 左右页面使用独立资源 |
| 横竖屏设置不生效 | 平行视界要求左右页面方向一致 | 使用 window 接口设置窗口策略 |
| EasyGo 分栏未生效 | `module.json5` 未声明 `easyGo` 引用，或 `easy_go.json` 配置缺失 | 在 module 级别添加 `"easyGo": "$profile:easy_go"`，并在 `resources/base/profile/` 下创建 `easy_go.json` |
| EasyGo 分栏与手写双栏布局冲突 | 代码中用 Row 手动实现左右分栏，与 EasyGo 的系统分栏机制冲突 | 使用 EasyGo 时应移除手写双栏逻辑，统一通过 Navigation push 路由，让 EasyGo 自动接管分栏 |
| EasyGo 分栏时 NavDestination param 为 null 崩溃 | 系统分栏场景下 param 可能为 null/undefined | pageMap 中访问 param 前须做空值保护：`param ? (param as Record<string, number>)['hotelId'] : 0` |
| 分屏后原窗口无分栏效果 | `enableInSplitScreen` 默认为 `false`，分屏场景下 EasyGo 分栏不触发 | 在 `navigationSplitOptions` / `routerSplitOptions` 中添加 `"enableInSplitScreen": true`（API 26+） |
| 多窗口场景下非预期窗口被分栏 | 未配置 `homeNavigationId`，EasyGo 默认接管最外层 Navigation，可能对其他窗口的 Navigation 也生效 | 在 `navigationSplitOptions` 中配置 `"homeNavigationId": "xxx"`，并在目标 Navigation 上设置 `.id('xxx')`，使 EasyGo 仅对该 Navigation 生效（详见[分栏生效范围控制](#6-分栏生效范围控制homenavigationid)） |
