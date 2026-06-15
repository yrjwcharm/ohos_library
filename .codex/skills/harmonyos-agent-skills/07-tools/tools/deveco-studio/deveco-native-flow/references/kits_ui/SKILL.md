---
name: kits_ui
description: "HarmonyOS ArkUI UI能力集使用规范。包含 Router、PromptAction、动画、媒体查询、组件快照、拖拽等 UI 相关能力。Use when: (1) 系统提示弹窗，(2) 动画效果，(3) 响应式布局，(4) 组件截图。Triggers: promptAction、Toast、Dialog、动画、curves、animator、媒体查询、mediaquery、组件截图、@ohos.arkui。"
user-invocable: false
---

# ArkUI UI能力集 (kits_ui)

本 skill 覆盖 HarmonyOS **ArkUI** UI能力集的使用规范。

## 能力列表

| 模块 | 导入方式 | 用途 |
|------|----------|------|
| promptAction | @ohos.promptAction | 系统提示 |
| router | @ohos.router | 页面路由 |
| curves | @ohos.curves | 动画曲线 |
| animator | @ohos.animator | 动画控制器 |
| mediaquery | @ohos.mediaquery | 媒体查询 |
| componentSnapshot | @ohos.arkui.componentSnapshot | 组件截图 |
| dragController | @ohos.arkui.dragController | 拖拽控制器 |

## 快速索引

### Toast 提示

```typescript
import promptAction from '@ohos.promptAction';

// 显示 Toast
promptAction.showToast({
  message: '操作成功',
  duration: 2000,
  bottom: 100
});
```

### Dialog 对话框

```typescript
import promptAction from '@ohos.promptAction';

// 警告对话框
promptAction.showDialog({
  title: '提示',
  message: '确定要删除吗？',
  buttons: [
    { text: '取消', color: '#999999' },
    { text: '确定', color: '#FF0000' }
  ]
}).then((result) => {
  if (result.index === 1) {
    console.log('点击了确定');
  }
});

// 操作菜单
promptAction.showActionMenu({
  title: '选择操作',
  buttons: [
    { text: '复制' },
    { text: '粘贴' },
    { text: '删除' }
  ]
}).then((result) => {
  console.log('选择了: ' + result.index);
});
```

### 动画曲线

```typescript
import curves from '@ohos.curves';

// 线性动画
let linearCurve = curves.linearCurve();

// 弹簧动画
let springCurve = curves.springCurve(0.8, 1.0, 0.2, 1.0);

// 在组件中使用
@Component
struct AnimationExample {
  @State scale: number = 1;

  build() {
    Column() {
      Image($r('app.media.icon'))
        .scale({ x: this.scale, y: this.scale })
        .animation({
          duration: 300,
          curve: curves.springCurve(0.8, 1.0, 0.2, 1.0)
        })
        .onClick(() => {
          this.scale = this.scale === 1 ? 1.2 : 1;
        })
    }
  }
}
```

### 媒体查询

```typescript
import mediaquery from '@ohos.mediaquery';

@Component
struct MediaQueryExample {
  @State isLandscape: boolean = false;
  private listener: mediaquery.MediaQueryListener | null = null;

  aboutToAppear(): void {
    // 监听屏幕方向变化
    this.listener = mediaquery.matchMediaSync('(orientation: landscape)');
    this.listener.on('change', (result: mediaquery.MediaQueryResult) => {
      this.isLandscape = result.matches;
      console.log('Is landscape: ' + this.isLandscape);
    });
  }

  aboutToDisappear(): void {
    // 移除监听
    this.listener?.off('change');
  }

  build() {
    Column() {
      if (this.isLandscape) {
        Text('横屏模式')
      } else {
        Text('竖屏模式')
      }
    }
  }
}
```

### 组件截图

```typescript
import componentSnapshot from '@ohos.arkui.componentSnapshot';

@Entry
@Component
struct SnapshotExample {
  @State imageUri: string = '';

  build() {
    Column() {
      // 要截图的组件
      Column() {
        Text('截图内容')
        Image($r('app.media.icon'))
          .width(100)
          .height(100)
      }
      .id('target_component')
      .backgroundColor('#F5F5F5')
      .padding(20)

      Button('截图')
        .onClick(async () => {
          // 获取组件快照
          let snapshot = await componentSnapshot.get('target_component');
          this.imageUri = snapshot;
        })

      // 显示截图
      if (this.imageUri) {
        Image(this.imageUri)
          .width(100)
          .height(100)
      }
    }
  }
}
```

## PromptAction 详解

### showToast 参数

```typescript
interface ShowToastOptions {
  message: string;      // 提示内容
  duration?: number;    // 显示时长（默认 1500ms）
  bottom?: string | number;  // 底部距离
  showMode?: ToastShowMode;  // 显示模式
}
```

### showDialog 参数

```typescript
interface ShowDialogOptions {
  title?: string;       // 对话框标题
  message?: string;     // 对话框内容
  buttons?: Array<ButtonInfo>;  // 按钮数组
  alignment?: DialogAlignment;  // 对齐方式
  offset?: { dx: number | string; dy: number | string };  // 偏移
  maskColor?: string | Resource;  // 遮罩颜色
}
```

## 动画曲线详解

### 内置曲线

| 曲线 | 函数 | 说明 |
|------|------|------|
| 线性 | curves.linearCurve() | 匀速动画 |
| 减速 | curves.decelerateCurve() | 快到慢 |
| 加速 | curves.accelerateCurve() | 慢到快 |
| 先加速后减速 | curves.accurateSpringCurve() | 自然弹簧 |
| 弹簧 | curves.springCurve() | 弹性效果 |
| 贝塞尔 | curves.cubicBezierCurve() | 自定义贝塞尔 |

### 弹簧曲线参数

```typescript
// springCurve(velocity, mass, stiffness, damping)
let spring = curves.springCurve(
  1.0,   // 初始速度
  1.0,   // 质量
  0.2,   // 刚度
  1.0    // 阻尼
);
```

## 响应式布局

### 媒体查询条件

```typescript
// 屏幕宽度
'(width <= 600)'                // 小屏
'(600 < width <= 840)'          // 中屏
'(width > 840)'                 // 大屏

// 屏幕方向
'(orientation: portrait)'       // 竖屏
'(orientation: landscape)'      // 横屏

// 设备类型
'(device-type: phone)'          // 手机
'(device-type: tablet)'         // 平板

// 像素密度
'(min-resolution: 2dppx)'       // 高分辨率
```

### 断点系统示例

```typescript
@Component
struct BreakpointExample {
  @State currentBreakpoint: string = 'sm';

  aboutToAppear(): void {
    // 监听断点变化
    let smListener = mediaquery.matchMediaSync('(width <= 600)');
    let mdListener = mediaquery.matchMediaSync('(600 < width <= 840)');
    let lgListener = mediaquery.matchMediaSync('(width > 840)');

    smListener.on('change', (result) => {
      if (result.matches) this.currentBreakpoint = 'sm';
    });
    mdListener.on('change', (result) => {
      if (result.matches) this.currentBreakpoint = 'md';
    });
    lgListener.on('change', (result) => {
      if (result.matches) this.currentBreakpoint = 'lg';
    });
  }

  build() {
    Column() {
      if (this.currentBreakpoint === 'sm') {
        // 小屏布局
        this.SmallLayout()
      } else if (this.currentBreakpoint === 'md') {
        // 中屏布局
        this.MediumLayout()
      } else {
        // 大屏布局
        this.LargeLayout()
      }
    }
  }

  @Builder
  SmallLayout() {
    Column() { Text('Small Layout') }
  }

  @Builder
  MediumLayout() {
    Row() { Text('Medium Layout') }
  }

  @Builder
  LargeLayout() {
    Row() { Text('Large Layout') }
  }
}
```

## 使用示例

### 加载对话框

```typescript
import promptAction from '@ohos.promptAction';

@Entry
@Component
struct LoadingPage {
  @State loading: boolean = false;

  build() {
    Column() {
      Button('加载数据')
        .onClick(async () => {
          this.loading = true;
          promptAction.showDialog({
            message: '加载中...',
            alignment: DialogAlignment.Center
          });

          // 模拟网络请求
          await this.fetchData();

          promptAction.closeDialog();
          this.loading = false;
        })
    }
  }

  private async fetchData(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  }
}
```

### 确认退出

```typescript
import promptAction from '@ohos.promptAction';

@Entry
@Component
struct ExitPage {
  build() {
    Column() {
      Button('退出')
        .onClick(() => {
          promptAction.showDialog({
            title: '退出确认',
            message: '确定要退出应用吗？',
            buttons: [
              { text: '取消', color: '#333333' },
              { text: '退出', color: '#FF0000' }
            ]
          }).then((result) => {
            if (result.index === 1) {
              // 退出应用
              let context = getContext(this) as common.UIAbilityContext;
              context.terminateSelf();
            }
          });
        })
    }
  }
}
```

## 最佳实践

1. **Toast 封装**：
```typescript
class ToastUtil {
  static show(message: string): void {
    promptAction.showToast({
      message: message,
      duration: 2000
    });
  }

  static showSuccess(message: string): void {
    // 可以添加图标
    promptAction.showToast({ message: '✓ ' + message });
  }

  static showError(message: string): void {
    promptAction.showToast({ message: '✗ ' + message });
  }
}
```

2. **动画统一管理**：
```typescript
class AnimationConfig {
  static readonly DURATION_SHORT = 200;
  static readonly DURATION_NORMAL = 300;
  static readonly DURATION_LONG = 500;

  static readonly SPRING = curves.springCurve(0.8, 1.0, 0.2, 1.0);
  static readonly EASE_IN = curves.cubicBezierCurve(0.4, 0, 1, 1);
  static readonly EASE_OUT = curves.cubicBezierCurve(0, 0, 0.2, 1);
}
```

## 注意事项

1. Toast 不应与 Dialog 同时显示
2. 媒体查询监听需要在页面销毁时移除
3. 组件截图需要组件已经渲染完成
4. 动画曲线影响用户体验，需要仔细调试