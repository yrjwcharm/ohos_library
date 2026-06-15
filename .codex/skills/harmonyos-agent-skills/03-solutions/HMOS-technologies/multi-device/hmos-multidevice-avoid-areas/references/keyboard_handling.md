# 软键盘避让完全指南

## 目录

1. [概述](#概述)
2. [API 参考](#api-参考)
3. [基本用法](#基本用法)
4. [常见问题](#常见问题)

---

## 概述

软键盘弹出时会占据屏幕部分区域，需要正确处理布局调整以避免输入框被遮挡。

### 键盘避让原则

1. **输入框可见**: 输入框不能被键盘遮挡
2. **布局合理**: 内容布局调整平滑自然
3. **用户体验**: 保持用户操作焦点

---

## API 参考

### KeyboardAvoidMode 枚举

| 模式 | 说明 | 适用场景 |
|-----|------|---------|
| RESIZE | 窗口压缩（页面高度减去键盘高度） | 通用场景，推荐 |
| OFFSET | 页面上抬（直到光标可见） | 输入框靠近底部时 |
| NONE | 不避让（页面被键盘遮盖） | 不推荐 |

---

## 基本用法

### 设置键盘避让模式

> **适用场景：** RESIZE（推荐）：大多数表单、评论、搜索等通用输入页面，键盘弹出时页面高度等比缩小。OFFSET：输入框靠近屏幕底部且页面内容不可压缩时（如地图搜索栏），页面上抬直到光标可见。必须在 `loadContent` 回调之后调用，否则设置不生效。

```typescript
import { KeyboardAvoidMode } from '@kit.ArkUI';

this.getUIContext().setKeyboardAvoidMode(KeyboardAvoidMode.RESIZE);
```

也可在 EntryAbility 中设置：

```typescript
import { KeyboardAvoidMode } from '@kit.ArkUI';
import hilog from '@ohos.hilog';

const DOMAIN = 0x0001;

export default class EntryAbility extends UIAbility {
  async onWindowStageCreate(windowStage: window.WindowStage) {
    windowStage.loadContent('pages/Index', (err) => {
      if (err.code) {
        hilog.error(DOMAIN, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err));
        return;
      }
      try {
        windowStage.getMainWindow((err: BusinessError, win: window.Window) => {
          win.getUIContext().setKeyboardAvoidMode(KeyboardAvoidMode.RESIZE);
        })
      } catch (error) {
        // TODO: Implement error handling.
      }
    });
  }
}
```

### 监听键盘变化

> **适用场景：** 需要在键盘上方显示附加 UI（如工具栏、表情面板、引用预览）的场景。键盘弹出时 `keyboardHeight > 0`，键盘收起时为 0，据此动态显示/隐藏附加 UI。评论页、聊天页、笔记编辑页等需要键盘联动交互的页面必须使用此方案。

通过 `avoidAreaChange` 监听键盘弹出和收起：

```typescript
import window from '@ohos.window';
import common from '@ohos.app.ability.common';

@Entry
@Component
struct KeyboardListenerExample {
  @State keyboardHeight: number = 0;
  @State isKeyboardVisible: boolean = false;
  private windowClass?: window.Window;

  async aboutToAppear() {
    try {
      this.windowClass = await window.getLastWindow(this.getUIContext().getHostContext() as common.UIAbilityContext);
      this.windowClass.on('avoidAreaChange', (data: window.AvoidAreaOptions) => {
        if (data.type === window.AvoidAreaType.TYPE_KEYBOARD) {
          this.keyboardHeight = this.getUIContext().px2vp(data.area.bottomRect.height);
          this.isKeyboardVisible = this.keyboardHeight > 0;
        }
      });
    } catch (error) {
      // TODO: Implement error handling.
    }
  }

  aboutToDisappear() {
    this.windowClass?.off('avoidAreaChange');
  }

  build() {
    Column() {
      Text(`键盘高度: ${this.keyboardHeight}vp`)
      Text(`键盘状态: ${this.isKeyboardVisible ? '显示' : '隐藏'}`)

      TextInput({ placeholder: '点击输入' })
        .width('100%')
        .height(48)
        .margin({ top: 16 })
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
    .padding(16)
  }
}
```

**注意事项：**
- 在 `aboutToDisappear()` 中调用 `windowClass.off('avoidAreaChange')` 取消监听
- 键盘高度通过 `px2vp()` 转换为 vp 单位

> **完整封装：** [KeyboardManager.ets](../assets/KeyboardManager.ets) — 单例管理器，封装了 avoidAreaChange 监听、AppStorage 同步、listener 回调模式及 destroy 清理，可直接集成到项目中使用。

### 输入框自动滚动

> **适用场景：** 长表单页面（注册页、设置页）中有多个输入框，键盘弹出后需要自动滚动到当前焦点输入框，确保焦点输入框始终在键盘上方可见。根据使用的滚动容器不同，有两种实现方式：

#### 使用 Scroll 组件

> Scroll 需要手动监听键盘状态并触发滚动。通过 `avoidAreaChange` 监听 `TYPE_KEYBOARD` 获取键盘高度，在输入框 `onFocus` 中判断键盘是否弹出，仅在键盘弹出时（`keyboardHeight > 0`）通过 `setTimeout(100ms)` + `scrollEdge(Edge.Bottom)` 滚动到焦点输入框。

> **布局要点：**
> - 标题栏固定在 Scroll 外部，不参与滚动
> - Scroll 使用 `layoutWeight(1)` 占满剩余空间
> - 底部按钮放入 Scroll 内部，键盘弹出后可滚动触达
> - 搭配 `KeyboardAvoidMode.RESIZE`，键盘弹出时页面高度自动压缩，Scroll 可视区域等比缩小
> - `aboutToAppear` 中注册 `avoidAreaChange` 监听 `TYPE_KEYBOARD`，获取键盘高度并判断是否弹出
> - `onFocus` 中记录当前焦点输入框 id，调用 `scrollToFocused()` 先判断 `keyboardHeight > 0` 再通过 `setTimeout(100ms)` + `scrollEdge(Edge.Bottom)` 滚动，确保仅在键盘弹出时滚动
> - `aboutToDisappear` 中调用 `windowClass.off('avoidAreaChange')` 取消监听，避免内存泄漏

> **完整示例：** [RegisterFormScrollExample.ets](../assets/RegisterFormScrollExample.ets) — 注册表单场景下，标题栏固定 + Scroll 包裹多输入框和底部按钮 + avoidAreaChange 监听键盘弹出状态 + onFocus 仅在键盘弹出时自动滚动到当前输入框的完整页面实现。

#### 使用 List 组件

> List 内置键盘避让能力，键盘弹出时会自动将焦点输入框滚动到可见区域，无需手动注册 `avoidAreaChange` 监听或调用 `scrollEdge`，比 Scroll 方案更简洁。

> **布局要点：**
> - 标题栏固定在 List 外部，不参与滚动
> - List 使用 `layoutWeight(1)` 占满剩余空间
> - 底部按钮放入最后一个 ListItem，键盘弹出后可自动滚达
> - 搭配 `KeyboardAvoidMode.RESIZE`，键盘弹出时页面高度自动压缩
> - 与 Scroll 方案的区别：**无需** `avoidAreaChange` 监听、**无需** `keyboardHeight` 判断、**无需** `setTimeout` 延迟滚动，List 组件自动处理所有键盘避让逻辑

> **完整示例：** [RegisterFormListExample.ets](../assets/RegisterFormListExample.ets) — 注册表单场景下，List 包裹多输入框和底部按钮 + List 内置键盘避让自动滚动到焦点输入框的完整页面实现。

### 使用 expandSafeArea 处理键盘区域

当背景色或图片需要延伸到键盘弹出区域时，可使用 `expandSafeArea` 配合 `SafeAreaType.KEYBOARD`：

```typescript
Column() {
  // 内容
  TextInput({ placeholder: '请输入' })
    .width('100%')
    .height(48)
}
.width('100%')
.height('100%')
.backgroundColor('#F5F5F5')
.expandSafeArea([SafeAreaType.KEYBOARD], [SafeAreaEdge.BOTTOM])
```

> `expandSafeArea` 的 `SafeAreaType.KEYBOARD` 适用于背景延伸场景。对于输入框可见性避让，推荐使用 `KeyboardAvoidMode`，详见 [safe_area_api.md](./safe_area_api.md)。

---

### 布局建议

将输入框放在底部，可滚动内容使用 `layoutWeight(1)` 撑满中间区域，确保键盘弹出时输入框始终可见：

```typescript
Column() {
  // 重要内容（不被遮挡）
  Text('标题')
    .padding({ top: 16 })

  // 可滚动内容
  List() {
    // 列表项
  }
  .layoutWeight(1)

  // 输入区域
  TextInput()
}
```

> **完整示例：** [KeyboardAvoidanceExample.ets](../assets/KeyboardAvoidanceExample.ets) — 评论列表+输入框场景下，监听键盘高度变化并动态调整底部 padding 的完整页面实现。

## 常见问题

### Q: 键盘弹出时布局错乱？
确保设置了正确的 `KeyboardAvoidMode`，并检查布局是否使用了 `layoutWeight`。

### Q: 输入框被键盘遮挡？
使用 `Scroll` 或 `List` 组件，并在 `onFocus` 时滚动到可见区域。


---
