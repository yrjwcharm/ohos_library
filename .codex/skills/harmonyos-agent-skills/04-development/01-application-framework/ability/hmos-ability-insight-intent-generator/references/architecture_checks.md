# 应用架构检查

在生成意图代码前，必须识别项目的页面路由架构，以便正确实现跳转和参数传递。

## 检查清单

1. **搜索以下文件/代码**：
   - `route_map.json` 或 `NavPathStack` → Navigation 架构
   - `router.pushUrl` 或 `router.push` → Router 架构
   - **同时存在** → 混用架构（允许，但需分别处理）

2. **确定参数传递方式**：
   - Navigation 架构：使用 `windowStage.loadContent` + `LocalStorage` 传递参数
   - Router 架构：使用 `router.pushUrl` + `params` 传递参数
   - **混用时的跳转规则**：
     - 主容器/根页面使用 Navigation
     - 子页面跳转可使用 `router.pushUrl`（目标页面为独立的 `@Entry` 页面）
     - 意图页面如果是 Navigation 根容器，**必须实现防白屏机制**（见下文）

## 代码模板

### Navigation 架构（推荐）

```typescript
// 在意图执行器的 onExecute 中
let storage = new LocalStorage();
storage.setOrCreate('intentTargetTab', 3);

if (this.executeMode == insightIntent.ExecuteMode.UI_ABILITY_FOREGROUND) {
  this.windowStage?.loadContent('pages/Index', storage);
}
```

### Router 架构

```typescript
// 在意图执行器的 onExecute 中
await router.pushUrl({
  url: 'pages/TargetPage',
  params: { targetTab: 3 }
});
```

### Navigation 根容器页面的防白屏机制（强制）

如果意图页面（使用 `@InsightIntentPage` 装饰）内部使用了 `Navigation` 组件作为根容器，**必须**在页面中添加以下代码：

```typescript
@State private renderNav: boolean = false;
private firstLoad: boolean = true;

aboutToAppear(): void {
  setTimeout(() => {
    this.renderNav = true;
    this.firstLoad = false;
  }, 0);
}

onPageShow(): void {
  if (!this.firstLoad && this.renderNav) {
    this.renderNav = false;
    setTimeout(() => {
      this.renderNav = true;
    }, 0);
  }
}

build() {
  Column() {
    if (this.renderNav) {
      Navigation() {
        // 页面原有内容
      }
      // Navigation 的其他属性
    } else {
      Blank()  // 占位，用户无感知
    }
  }
}
```

**原因**：部分鸿蒙版本上，`Navigation` 组件若在根容器布局测量完成前创建，会导致高度计算为 0，页面白屏。延迟一帧创建可解决。

## 常见错误

- Navigation 架构中误用 `router.pushUrl` → 应使用 `windowStage.loadContent`
- 用 `AppStorage` 传递参数（Navigation 应使用 `LocalStorage`）
- 页面加载时未处理异步完成后的参数写入（需要使用 `then` 回调）
- **Navigation 根容器页面未实现防白屏机制** → 冷启动白屏（需添加延迟渲染代码）