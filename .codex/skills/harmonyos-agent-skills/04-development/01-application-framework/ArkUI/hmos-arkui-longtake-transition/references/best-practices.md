# 一镜到底转场最佳实践

## 常见错误与排查

| 错误现象 | 最可能原因 | 修复方法 |
|---------|----------|---------|
| 点击后无动画，直接跳转 | 被点击组件未设 `.id()` | 在触发页组件添加 `.id('xxx')` |
| 转场动画开始时圆角不对 | `RADIUS` 参数与 `.borderRadius()` 不一致 | 确保两者值相同 |
| 目标页顶部有留白/背景色不覆盖状态栏 | 缺少 `expandSafeArea` | 子组件添加 `.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP])` |
| 转场期间背景色闪烁/异常 | NavDestination 上设了固定背景色 | 改用 `this.longTakeSession.navDestinationBgColor` |
| 转场中用户操作导致崩溃 | 缺少 `isEnabled` 禁用逻辑 | Navigation 上添加 `.enabled(this.isEnabled)` 并在转场回调中切换 |
| 配置变更（深色模式切换）后转场参数异常 | 缺少 AbilityStage 配置变更处理 | 添加 `ezCustomTransition.onConfigurationChanged()` |
| 返回动画对齐位置不对 | 未调用 `updateSnapshotComponentId` | 返回前调用 `this.longTakeSession.updateSnapshotComponentId(newId)` |

## 类型选择指南

| 场景 | 推荐类型 | 原因 |
|------|---------|------|
| 卡片→详情页 | `CardLongTake`（默认） | 手势返回逻辑适合卡片展开/收缩 |
| 图片→全屏大图 | `ImageLongTake` | 手势返回逻辑更适合图片查看（先缩放再退出） |
| 混合场景（不确定） | `CardLongTake` | 通用型，绝大多数场景可用 |

## 背景色处理规则

一镜到底转场期间，NavDestination 的背景色由 `LongTakeSession.navDestinationBgColor` 动态管理。原背景色必须迁移到子组件上：

```
NavDestination 背景色 → this.longTakeSession.navDestinationBgColor（有参数时）
                      → 原背景色（无参数时，如从其他入口进入）

子组件背景色   → Color.White / Color.Black 等（有参数时）
               → Color.Transparent（无参数时，避免重复背景色）
```

## 性能建议

1. 转场期间不要执行耗时操作（如大量数据加载），否则动画可能卡顿
2. 使用 `useSpringCurve: true` 可以获得更自然的动画效果，但弹簧动画计算量略大
3. 被截图的组件不宜过大或层级过深，否则截图耗时增加