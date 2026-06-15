## 19. UIContext 替换全局接口约束

在 Stage 模型中，一个 ArkTS 引擎可运行多个 ArkUI 实例，全局接口通过分析调用链中的上下文信息确定当前 UI 上下文，异步接口和非 UI 接口可能导致 UI 上下文跟踪失败。**禁止直接使用以下全局接口，必须通过 `UIContext` 获取对应的替代接口。**

> 获取 UIContext 的方式：`this.getUIContext()`（自定义组件内）或 `windowClass.getUIContext()`（通过窗口对象）

### 禁止直接使用的全局接口及 UIContext 替代方案

| 禁止直接使用的全局接口 | UIContext 替代接口 | 说明 |
|---|---|---|
| `@ohos.animator` | `uiContext.createAnimator()` | 自定义动画控制器 |
| `@ohos.arkui.componentSnapshot` | `uiContext.getComponentSnapshot()` | 组件截图 |
| `@ohos.arkui.componentUtils` | `uiContext.getComponentUtils()` | 组件工具类 |
| `@ohos.arkui.dragController` | `uiContext.getDragController()` | 拖拽控制器 |
| `@ohos.arkui.inspector` | `uiContext.getUIInspector()` | 组件布局回调 |
| `@ohos.arkui.observer` | `uiContext.getUIObserver()` | 无感监听 |
| `@ohos.font` | `uiContext.getFont()` | 自定义字体 |
| `@ohos.measure` | `uiContext.getMeasureUtil()` | 文本计算 |
| `@ohos.mediaquery` | `uiContext.getMediaQuery()` | 媒体查询 |
| `@ohos.promptAction` | `uiContext.getPromptAction()` | 弹窗 |
| `@ohos.router` | `uiContext.getRouter()` | 页面路由 |
| `AlertDialog` | `uiContext.showAlertDialog()` | 警告弹窗 |
| `ActionSheet` | `uiContext.showActionSheet()` | 列表选择弹窗 |
| `DatePickerDialog` | `uiContext.showDatePickerDialog()` | 日期滑动选择弹窗 |
| `TimePickerDialog` | `uiContext.showTimePickerDialog()` | 时间滑动选择器弹窗 |
| `TextPickerDialog` | `uiContext.showTextPickerDialog()` | 文本滑动选择器弹窗 |
| `ContextMenu` | `uiContext.getContextMenuController()` | 菜单控制 |
| `vp2px` / `px2vp` / `fp2px` / `px2fp` / `lpx2px` / `px2lpx` | `uiContext.vp2px()` 等 | 像素单位转换 |
| `focusControl` | `uiContext.getFocusController()` | 焦点控制 |
| `cursorControl` | `uiContext.getCursorControl()` | 光标控制 |
| `getContext` | `uiContext.getHostContext()` | 获取当前 Ability 的 Context |
| `LocalStorage.getShared` | `uiContext.getSharedLocalStorage()` | 获取 Ability 传递的 Storage |
| `animateTo` | `uiContext.animateTo()` | 显式动画 |
| `CalendarPickerDialog` | `uiContext.runScopedTask(() => CalendarPickerDialog.show())` | 日历选择器弹窗（无直接替代，需用 runScopedTask 包裹） |
| `animateToImmediately` | 不支持 | 显式立即动画（UIContext 无替代方案） |

### 正确用法示例

```ts
// ✅ 正确：通过 UIContext 获取接口
this.getUIContext().getPromptAction().showToast({ message: 'Hello' });
this.getUIContext().getRouter().pushUrl({ url: 'pages/Second' });
this.getUIContext().showAlertDialog({ title: '提示', message: '内容' });
let px = this.getUIContext().vp2px(20);

// ❌ 错误：直接使用全局接口（UI 上下文不明确，可能导致多实例场景异常）
import promptAction from '@ohos.promptAction';
promptAction.showToast({ message: 'Hello' });

import router from '@ohos.router';
router.pushUrl({ url: 'pages/Second' });

AlertDialog.show({ title: '提示', message: '内容' });
let px = vp2px(20);
```

## 常见错误

- **直接使用全局接口**：AI 倾向直接调用 `AlertDialog.show()`、`router.pushUrl()`、`promptAction.showToast()`、`vp2px()`、`animateTo()` 等全局接口，语法上不报错但在多实例场景会出问题
- **根因**：AI 训练数据中直接调用全局接口的示例很多，且直接调用语法上不报错，但异步接口和非 UI 接口可能导致 UI 上下文跟踪失败

---
