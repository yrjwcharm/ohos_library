---
name: hmos-arkui-longtake-transition
description: 为鸿蒙(HarmonyOS)应用添加一镜到底转场效果。当用户提到一镜到底、转场动画、页面跳转动画、Navigation转场、卡片展开动画、图片查看大图动画、ezcustomtransition、自定义NavContentTransition、longtake、连续转场、沉浸式转场等关键词时，务必使用此skill。也适用于用户想要在鸿蒙应用中实现类似iOS的卡片展开、图片预览等流畅过渡效果的场景，即使他们没有明确提到"一镜到底"这个术语。
---

# 鸿蒙一镜到底转场效果 Skill

本skill指导如何为鸿蒙应用添加一镜到底（LongTake）转场效果，使用 `@hmanimations/ezcustomtransition` 三方库实现从触发页组件到目标页的流畅过渡动画。

## 前提条件检查

在开始集成前，先确认用户的工程满足以下条件：

1. **使用 Navigation 路由** — 应用必须基于 Navigation + NavDestination 的路由体系，而非 Router
2. **目标页适配沉浸式状态栏** — 一镜到底目标页需要适配沉浸式状态栏效果
3. **目标页隐藏默认标题栏** — NavDestination 必须配置 `.hideTitleBar(true)`，标题栏内容由应用自己绘制

如果不满足，先提示用户调整工程结构，再继续集成。

## 集成步骤

集成一镜到底效果需要修改6个位置，按顺序执行。每个步骤都至关重要——遗漏任何一步都会导致转场动画无法正常工作。

详细API参考请阅读 `references/ezcustomtransition.md`，常见问题排查请阅读 `references/best-practices.md`。

### Step 1: 安装依赖

```bash
ohpm install @hmanimations/ezcustomtransition
```

### Step 2: 修改 EntryAbility.ets

在 `onWindowStageCreate` 中初始化转场框架：

```arkui
onWindowStageCreate(windowStage: window.WindowStage): void {
    // ...原有代码...
    ezCustomTransition.init(windowStage);
    // ...原有代码...
}
```

这一步注册了转场框架的全局初始化，缺少它则后续所有转场API都无法使用。

### Step 3: 修改 AbilityStage.ets

在 `onConfigurationUpdate` 中处理配置变更：

```arkui
onConfigurationUpdate(newConfig: Configuration): void {
    // ...原有代码...
    ezCustomTransition.onConfigurationChanged();
    // ...原有代码...
}
```

这一步确保深色模式切换、语言变更等场景下转场参数能正确更新。

### Step 4: 修改 Navigation 组件

在触发页和目标页的父 Navigation 组件中，实现 `customNavContentTransition` 回调。这是连接转场框架和 Navigation 的桥梁——没有它，Navigation 不会调用自定义转场逻辑。

```arkui
@State isEnabled: boolean = true;

build() {
    Navigation() { }
    .enabled(this.isEnabled)
    .customNavContentTransition((from: NavContentInfo, to: NavContentInfo, operation: NavigationOperation) => {
        return ezCustomTransition.customNavContentTransition(from, to, operation, {
            onTransitionStart: () => {
                this.isEnabled = false;
            },
            onTransitionEnd: () => {
                this.isEnabled = true;
            }
        });
    })
}
```

转场过程中禁用手势（`isEnabled = false`）很重要——如果用户在动画进行中还能操作页面，会出现布局错乱或动画中断等体验问题。

### Step 5: 修改触发页

触发页是用户点击进入目标页的那个页面。需要在点击事件中创建 `LongTakeTransitionParam` 并传递给目标页。

```arkui
let longTakeTransitionParam: LongTakeTransitionParam | undefined =
    ezCustomTransition.generateLongTakeParam(this.getUIContext(), snapShotComponentId, RADIUS);

if (longTakeTransitionParam) {
    param['longTakeTransitionParam'] = longTakeTransitionParam;
}
this.pageInfos.pushPath({ name: 'TargetPage', param: param })
```

关键参数说明：
- `snapShotComponentId`: 响应点击事件的组件的 id（通过 `.id('xxx')` 设置）
- `RADIUS`: 该组件的圆角值，动画从该圆角形态过渡到全屏
- `options.type`: 卡片场景用 `LongTakeTransitionType.CardLongTake`，图片查看大图场景用 `LongTakeTransitionType.ImageLongTake`——二者的手势返回逻辑不同，图片场景建议用 ImageLongTake

被点击组件必须设置了 `.id()`，否则 `generateLongTakeParam` 无法定位动画起点。

### Step 6: 修改目标页

目标页需要做5处修改（下面的Step编号对应参考文档中的编号）：

```arkui
@State longTakeSession: LongTakeSession = new LongTakeSession();
@State longTakeTransitionParam: LongTakeTransitionParam | undefined = undefined;

@Builder
ContentBuilder() {
    // Step5: 如果NavDestination原来有背景色，移到这里
    // 同时expandSafeArea扩展到状态栏区域
    .backgroundColor(this.longTakeTransitionParam ? Color.White : Color.Transparent)
    .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP])
}

NavDestination() {
    // Step3: 有参数时用 LongTakeTransitionDelegate 包裹原本内容
    if (this.longTakeTransitionParam) {
        LongTakeTransitionDelegate({
            longTakeSession: this.longTakeSession,
            contentBuilder: (): void => { this.ContentBuilder() }
        })
    } else {
        this.ContentBuilder()
    }
}
// Step4: 一镜到底场景下背景色由session控制
.backgroundColor(this.longTakeTransitionParam ? this.longTakeSession.navDestinationBgColor : Color.White)
.hideTitleBar(true)
// Step6: 尺寸变化时更新session
.onSizeChange((oldValue: SizeOptions, newValue: SizeOptions) => {
    this.longTakeSession.setNewSize(newValue);
})
.onReady((navDestContext: NavDestinationContext) => {
    // Step1: 解析上一页传来的参数
    let param = navDestContext.pathInfo?.param as Record<string, Object>;
    this.longTakeTransitionParam = param['longTakeTransitionParam'] as LongTakeTransitionParam;
    if (this.longTakeTransitionParam) {
        // Step2: 初始化session
        this.longTakeSession.init(navDestContext, this.longTakeTransitionParam, {
            pop: () => { this.pathStack.pop(); },
            alignTargetId: 'Target_Component_ID'
        });
    }
})
```

目标页5处修改的含义：
- **Step1**: 从路由参数中取出 `LongTakeTransitionParam`，这是动画的全部配置信息
- **Step2**: 用参数初始化 `LongTakeSession`，`pop` 回调用于手势返回时退出页面，`alignTargetId` 是目标页中对齐组件的id（可选，不设则整页做一镜到底）
- **Step3**: 用 `LongTakeTransitionDelegate` 包裹原本内容——这个组件处理了一镜到底动画期间的所有布局计算
- **Step4**: 一镜到底动画期间背景色由session动态管理，不能设固定值
- **Step5**: 原NavDestination的背景色要移到子组件上，并通过 `expandSafeArea` 扩展到状态栏——否则会出现背景色不覆盖状态栏的视觉问题
- **Step6**: 页面尺寸变化（如旋转屏幕）时通知session更新，否则动画计算会基于旧尺寸

## 高级场景

### 更新返回对齐位置

在九宫格图片等场景中，用户可能从第1张图进入大图后滑动到第2张，返回时期望回到第2张图位置。在返回前调用：

```arkui
this.longTakeSession.updateSnapshotComponentId(newSnapshotComponentId);
```

### 交互式返回

默认支持手势返回（`isGestureEnabled` 默认为 true）。如需禁用，在 `generateLongTakeParam` 的 options 中设 `isGestureEnabled: false`。

### 弹簧动画

在 `generateLongTakeParam` 的 options 中设 `useSpringCurve: true`，可使用弹簧曲线替代默认动画曲线，效果更自然。

## 工作流程

当用户请求添加一镜到底效果时，按以下流程工作：

1. **搜索工程结构** — 找到 EntryAbility.ets、AbilityStage.ets、Navigation 组件、触发页、目标页的位置
2. **检查前提条件** — 确认应用使用 Navigation 路由，目标页已适配沉浸式状态栏
3. **逐步修改** — 按上述6个Step顺序修改代码，每步都说明修改的目的
4. **验证** — 检查所有必要修改是否完整，特别关注：组件id设置、hideTitleBar、背景色迁移、expandSafeArea

完整示例代码请参考 `assets/examples/` 目录下的卡片一镜到底和图片九宫格一镜到底示例。

## 集成验证清单

集成完成后，逐一确认以下检查项：

| 检查项 | 说明 |
|--------|------|
| 触发页组件设置了 `.id()` | `generateLongTakeParam` 通过 id 定位动画起点 |
| `generateLongTakeParam` 的圆角值与组件 `.borderRadius()` 一致 | 圆角不一致会导致动画起始形态与视觉不匹配 |
| 目标页 NavDestination 配置了 `.hideTitleBar(true)` | 一镜到底目标页不能使用默认标题栏 |
| 目标页背景色从 NavDestination 迁移到子组件 | 动画期间背景色由 session 管理，不能在 NavDestination 上设固定值 |
| 子组件设置了 `.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP])` | 缺少则背景色不覆盖状态栏 |
| Navigation 配置了 `.customNavContentTransition` 回调 | 没有它 Navigation 不调用自定义转场逻辑 |
| Navigation 配置了 `.enabled(isEnabled)` 并在转场回调中切换 | 转场期间禁用交互防止布局错乱 |
| EntryAbility 中调用了 `ezCustomTransition.init(windowStage)` | 全局初始化，缺少则后续API无法使用 |
| AbilityStage 中调用了 `ezCustomTransition.onConfigurationChanged()` | 配置变更时更新转场参数 |
| 目标页 `onSizeChange` 中调用 `longTakeSession.setNewSize` | 旋转屏幕等场景下更新动画计算基准 |

## 参考资源

| 资源 | 路径 | 说明 |
|------|------|------|
| API参考 | `references/ezcustomtransition.md` | ezcustomtransition 库的完整API文档 |
| 最佳实践 | `references/best-practices.md` | 常见错误排查、类型选择指南、背景色处理规则 |
| 卡片一镜到底示例 | `assets/examples/card-longtake-example.ets` | 卡片列表→详情页的完整集成示例 |
| 图片九宫格示例 | `assets/examples/image-grid-longtake-example.ets` | 九宫格→全屏大图+返回对齐的完整集成示例 |
| 测试提示词 | `test-cases/test-prompts.md` | 用于验证 Skill 功能的典型提示词 |
| 卡片测试用例 | `test-cases/card-longtake-test-case.md` | 卡片一镜到底场景的完整测试用例 |
| 图片九宫格测试用例 | `test-cases/image-grid-longtake-test-case.md` | 图片九宫格场景的完整测试用例 |
