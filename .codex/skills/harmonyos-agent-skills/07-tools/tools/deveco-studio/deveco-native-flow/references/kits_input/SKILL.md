---
name: kits_input
description: "HarmonyOS InputKit 多模态输入能力集使用规范。包含 KeyEvent 按键事件、MouseEvent 鼠标事件、TouchEvent 触摸事件、inputDevice 输入设备管理等能力。Use when: (1) 处理键盘事件，(2) 处理鼠标事件，(3) 处理触摸事件，(4) 输入设备管理。Triggers: KeyEvent、MouseEvent、TouchEvent、键盘、鼠标、触摸、inputDevice、onKeyEvent、按键事件、手势识别。"
user-invocable: false
---

# InputKit 多模态输入能力集 (kits_input)

本 skill 覆盖 HarmonyOS **InputKit** 多模态输入能力集的使用规范。

## 能力列表

| 模块 | 导入方式 | 用途 |
|------|----------|------|
| KeyEvent | @ohos.multimodalInput.keyEvent | 按键事件 |
| MouseEvent | @ohos.multimodalInput.mouseEvent | 鼠标事件 |
| TouchEvent | @ohos.multimodalInput.touchEvent | 触摸事件 |
| inputDevice | @ohos.multimodalInput.inputDevice | 输入设备 |
| inputDeviceCooperate | @ohos.multimodalInput.inputDeviceCooperate | 设备协同 |
| pointer | @ohos.multimodalInput.pointer | 指针管理 |
| gestureEvent | @ohos.multimodalInput.gestureEvent | 手势事件 |
| keyCode | @ohos.multimodalInput.keyCode | 键码常量 |

## 快速索引

### 键盘事件处理

```typescript
import { KeyEvent, KeyCode } from '@ohos.multimodalInput.keyEvent';

@Entry
@Component
struct KeyEventPage {
  @State keyText: string = '按下任意键';

  build() {
    Column() {
      Text(this.keyText)
        .fontSize(24)

      Button('获取焦点后按键盘')
        .onKeyEvent((event: KeyEvent) => {
          if (event.type === KeyAction.DOWN) {
            this.keyText = `按键按下: ${event.keyCode}`;
            console.log('Key down: ' + event.keyCode);
            console.log('Key text: ' + event.keyText);
          } else if (event.type === KeyAction.UP) {
            console.log('Key up: ' + event.keyCode);
          }

          // 消费事件
          return true;
        })
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
  }
}
```

### KeyCode 键码常量

```typescript
import { KeyCode } from '@ohos.multimodalInput.keyCode';

// 常用键码
KeyCode.KEYCODE_0 = 2000          // 数字 0
KeyCode.KEYCODE_1 = 2001          // 数字 1
KeyCode.KEYCODE_A = 2014          // 字母 A
KeyCode.KEYCODE_B = 2015          // 字母 B
KeyCode.KEYCODE_ENTER = 2052      // 回车
KeyCode.KEYCODE_ESCAPE = 2073     // ESC
KeyCode.KEYCODE_SPACE = 2062      // 空格
KeyCode.KEYCODE_BACK = 2073       // 返回
KeyCode.KEYCODE_DPAD_UP = 2016    // 方向键上
KeyCode.KEYCODE_DPAD_DOWN = 2017  // 方向键下
KeyCode.KEYCODE_DPAD_LEFT = 2018  // 方向键左
KeyCode.KEYCODE_DPAD_RIGHT = 2019 // 方向键右
KeyCode.KEYCODE_VOLUME_UP = 2064  // 音量增大
KeyCode.KEYCODE_VOLUME_DOWN = 2065// 音量减小
KeyCode.KEYCODE_POWER = 2071      // 电源键
KeyCode.KEYCODE_CAMERA = 2088     // 相机键
KeyCode.KEYCODE_HOME = 2072       // Home键

// 检查特定按键
function isNavigationKey(keyCode: KeyCode): boolean {
  return keyCode === KeyCode.KEYCODE_DPAD_UP ||
         keyCode === KeyCode.KEYCODE_DPAD_DOWN ||
         keyCode === KeyCode.KEYCODE_DPAD_LEFT ||
         keyCode === KeyCode.KEYCODE_DPAD_RIGHT;
}
```

### KeyEvent 属性

```typescript
interface KeyEvent {
  type: KeyAction;          // 按键动作
  keyCode: KeyCode;         // 键码
  keyText: string;          // 按键文本
  keySource: string;        // 按键来源
  deviceId: number;         // 设备ID
  metaKey: boolean;         // Meta键状态
  ctrlKey: boolean;         // Ctrl键状态
  altKey: boolean;          // Alt键状态
  shiftKey: boolean;        // Shift键状态
  capsLock: boolean;        // 大写锁定状态
  numLock: boolean;         // 数字锁定状态
}

// KeyAction
KeyAction.DOWN = 0  // 按下
KeyAction.UP = 1    // 抬起

// 检测组合键
function isCtrlC(event: KeyEvent): boolean {
  return event.ctrlKey && event.keyCode === KeyCode.KEYCODE_C;
}
```

### 鼠标事件处理

```typescript
import { MouseEvent, Button } from '@ohos.multimodalInput.mouseEvent';

@Entry
@Component
struct MouseEventPage {
  @State mouseAction: string = '移动鼠标';
  @State mouseX: number = 0;
  @State mouseY: number = 0;

  build() {
    Column() {
      Text(`${this.mouseAction}`)
        .fontSize(20)
      Text(`坐标: (${this.mouseX}, ${this.mouseY})`)
        .fontSize(16)

      // 鼠标事件区域
      Column()
        .width(300)
        .height(300)
        .backgroundColor('#E0E0E0')
        .borderRadius(10)
        .onMouse((event: MouseEvent) => {
          this.mouseX = event.x;
          this.mouseY = event.y;

          switch (event.action) {
            case MouseAction.PRESS:
              this.mouseAction = '鼠标按下';
              break;
            case MouseAction.RELEASE:
              this.mouseAction = '鼠标释放';
              break;
            case MouseAction.MOVE:
              this.mouseAction = '鼠标移动';
              break;
            case MouseAction.ENTER:
              this.mouseAction = '鼠标进入';
              break;
            case MouseAction.LEAVE:
              this.mouseAction = '鼠标离开';
              break;
          }
        })
    }
  }
}
```

### MouseEvent 属性

```typescript
interface MouseEvent {
  action: MouseAction;      // 鼠标动作
  button: Button;           // 按下的按钮
  pressedButtons: Button[]; // 当前按下的按钮组合
  x: number;                // X坐标
  y: number;                // Y坐标
  screenWidth: number;      // 屏幕宽度
  screenHeight: number;     // 屏幕高度
  device: number;           // 设备ID
  targetWindowId: number;   // 目标窗口ID
}

// MouseAction
MouseAction.NONE = 0       // 无动作
MouseAction.PRESS = 1      // 按下
MouseAction.RELEASE = 2    // 释放
MouseAction.MOVE = 3       // 移动
MouseAction.ENTER = 4      // 进入
MouseAction.LEAVE = 5      // 离开
MouseAction.SCROLL = 6     // 滚动

// Button 按钮常量
Button.NONE = 0            // 无按钮
Button.LEFT = 1            // 左键
Button.RIGHT = 2           // 右键
Button.MIDDLE = 4          // 中键
Button.BACK = 8            // 后退键
Button.FORWARD = 16        // 前进键
```

### 鼠标滚轮处理

```typescript
import { MouseEvent, MouseAction, Axis, AxisValue } from '@ohos.multimodalInput.mouseEvent';

Column()
  .onMouse((event: MouseEvent) => {
    if (event.action === MouseAction.SCROLL) {
      let axisValue = event.axisValue;
      // 垂直滚动
      let verticalScroll = axisValue[Axis.VERTICAL_SCROLL];
      // 水平滚动
      let horizontalScroll = axisValue[Axis.HORIZONTAL_SCROLL];

      if (verticalScroll > 0) {
        console.log('向上滚动');
      } else if (verticalScroll < 0) {
        console.log('向下滚动');
      }
    }
  })
```

### 触摸事件处理

```typescript
import { TouchEvent, Touch, TouchAction } from '@ohos.multimodalInput.touchEvent';

@Entry
@Component
struct TouchEventPage {
  @State touchCount: number = 0;
  @State touchPoints: string = '';

  build() {
    Column() {
      Text(`触摸点数量: ${this.touchCount}`)
        .fontSize(20)
      Text(this.touchPoints)
        .fontSize(14)

      Column()
        .width(300)
        .height(300)
        .backgroundColor('#E0E0E0')
        .borderRadius(10)
        .onTouch((event: TouchEvent) => {
          this.touchCount = event.touches.length;

          switch (event.type) {
            case TouchAction.DOWN:
              console.log('触摸按下');
              break;
            case TouchAction.UP:
              console.log('触摸抬起');
              break;
            case TouchAction.MOVE:
              console.log('触摸移动');
              break;
            case TouchAction.CANCEL:
              console.log('触摸取消');
              break;
          }

          // 显示所有触摸点
          this.touchPoints = event.touches.map((t: Touch) =>
            `(${t.x.toFixed(0)}, ${t.y.toFixed(0)})`
          ).join(', ');
        })
    }
  }
}
```

### Touch 触摸点属性

```typescript
interface Touch {
  id: number;              // 触摸点ID
  x: number;               // X坐标
  y: number;               // Y坐标
  screenWidth: number;     // 屏幕宽度
  screenHeight: number;    // 屏幕高度
  pressure: number;        // 压力值
  sourceType: SourceType;  // 来源类型
  toolType: ToolType;      // 工具类型
}

// TouchAction
TouchAction.DOWN = 0    // 按下
TouchAction.UP = 1      // 抬起
TouchAction.MOVE = 2    // 移动
TouchAction.CANCEL = 3  // 取消

// SourceType 来源类型
SourceType.KEYBOARD = 'keyboard'
SourceType.FINGER = 'finger'
SourceType.MOUSE = 'mouse'
SourceType.TOUCHPAD = 'touchpad'

// ToolType 工具类型
ToolType.FINGER = 0     // 手指
ToolType.PEN = 1        // 触控笔
ToolType.RUBBER = 2     // 橡皮擦
ToolType.PALM = 3       // 手掌
ToolType.UNKNOWN = 4    // 未知
```

### 手势事件

```typescript
import {
  Pinch, Rotate,
  ThreeFingersSwipe, ThreeFingersTap,
  FourFingersSwipe
} from '@ohos.multimodalInput.gestureEvent';

// 三指滑动
Column()
  .onGestureEvent((event: ThreeFingersSwipe) => {
    console.log('三指滑动');
    console.log('方向: ' + event.direction);
  })

// 三指点击
Column()
  .onGestureEvent((event: ThreeFingersTap) => {
    console.log('三指点击');
  })

// 四指滑动
Column()
  .onGestureEvent((event: FourFingersSwipe) => {
    console.log('四指滑动');
  })

// 捏合手势
Column()
  .onGestureEvent((event: Pinch) => {
    console.log('捏合手势');
    console.log('缩放比例: ' + event.scale);
  })

// 旋转手势
Column()
  .onGestureEvent((event: Rotate) => {
    console.log('旋转手势');
    console.log('旋转角度: ' + event.angle);
  })
```

### 输入设备管理

```typescript
import inputDevice from '@ohos.multimodalInput.inputDevice';

// 获取所有输入设备
let devices = await inputDevice.getDeviceList();
console.log('Input devices: ' + JSON.stringify(devices));

// 获取设备详情
let deviceInfo = await inputDevice.getDeviceInfo(devices[0]);
console.log('Device name: ' + deviceInfo.name);
console.log('Device id: ' + deviceInfo.id);
console.log('Device sources: ' + JSON.stringify(deviceInfo.sources));

// 支持的输入源类型
interface InputDeviceSource {
  keyboard: boolean;      // 键盘
  pointingStick: boolean; // 指点杆
  mouse: boolean;         // 鼠标
  touchpad: boolean;      // 触控板
  touchscreen: boolean;   // 触摸屏
  joystick: boolean;      // 操纵杆
  gamepad: boolean;       // 游戏手柄
}

// 监听设备变化
inputDevice.on('change', (data: inputDevice.DeviceListener) => {
  if (data.type === 'add') {
    console.log('Device added: ' + data.deviceId);
  } else if (data.type === 'remove') {
    console.log('Device removed: ' + data.deviceId);
  }
});

// 移除监听
inputDevice.off('change');
```

### 指针管理

```typescript
import pointer from '@ohos.multimodalInput.pointer';

// 检查指针是否可见
let isVisible = await pointer.isPointerVisible();
console.log('Pointer visible: ' + isVisible);

// 设置指针可见性
await pointer.setPointerVisible(true);

// 获取鼠标样式
let style = await pointer.getPointerStyle(windowId);
console.log('Pointer style: ' + style);

// 设置鼠标样式
await pointer.setPointerStyle(windowId, PointerStyle.DEFAULT);

// 鼠标样式常量
PointerStyle.DEFAULT = 0           // 默认
PointerStyle.CROSS = 1             // 十字
PointerStyle.POINTER = 2           // 手型
PointerStyle.MOVE = 3              // 移动
PointerStyle.RESIZE_LEFT = 4       // 左调整
PointerStyle.RESIZE_RIGHT = 5      // 右调整
PointerStyle.RESIZE_UP = 6         // 上调整
PointerStyle.RESIZE_DOWN = 7       // 下调整
PointerStyle.NOT_ALLOWED = 20      // 禁止
```

### 输入设备协同

```typescript
import inputDeviceCooperate from '@ohos.multimodalInput.inputDeviceCooperate';

// 检查是否支持跨设备协同
let isCooperating = await inputDeviceCooperate.isCooperateEnabled();
console.log('Cooperate enabled: ' + isCooperating);

// 开启协同
await inputDeviceCooperate.enableCooperate(true);

// 开始协同（跨设备使用输入设备）
await inputDeviceCooperate.startCooperate('network_id', 0);

// 停止协同
await inputDeviceCooperate.stopCooperate(false);

// 监听协同状态
inputDeviceCooperate.on('cooperate', (data: inputDeviceCooperate.CooperationMessage) => {
  console.log('Cooperate message: ' + JSON.stringify(data));
});
```

### 组合快捷键处理

```typescript
import { KeyEvent, KeyCode, KeyAction } from '@ohos.multimodalInput.keyEvent';

// 保存按键状态
let pressedKeys: Set<KeyCode> = new Set();

Column()
  .onKeyEvent((event: KeyEvent) => {
    if (event.type === KeyAction.DOWN) {
      pressedKeys.add(event.keyCode);

      // 检测 Ctrl+S
      if (event.ctrlKey && event.keyCode === KeyCode.KEYCODE_S) {
        console.log('保存快捷键');
        // 执行保存
      }

      // 检测 Ctrl+Z
      if (event.ctrlKey && event.keyCode === KeyCode.KEYCODE_Z) {
        console.log('撤销快捷键');
      }

      // 检测 Ctrl+Shift+S
      if (event.ctrlKey && event.shiftKey && event.keyCode === KeyCode.KEYCODE_S) {
        console.log('另存为快捷键');
      }

    } else if (event.type === KeyAction.UP) {
      pressedKeys.delete(event.keyCode);
    }
  })
```

## 最佳实践

### 全局按键监听

```typescript
import UIAbility from '@ohos.app.ability.UIAbility';
import { KeyEvent, KeyCode } from '@ohos.multimodalInput.keyEvent';

export default class EntryAbility extends UIAbility {
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    // 全局按键监听
    globalThis.keyEventCallback = (event: KeyEvent) => {
      if (event.keyCode === KeyCode.KEYCODE_VOLUME_UP) {
        console.log('音量增大');
        return true;
      }
      return false;
    };
  }
}
```

### 手势识别工具类

```typescript
import { TouchEvent, Touch, TouchAction } from '@ohos.multimodalInput.touchEvent';

class GestureRecognizer {
  private startX: number = 0;
  private startY: number = 0;
  private startTime: number = 0;
  private static SWIPE_THRESHOLD = 50; // 滑动阈值

  onTouch(event: TouchEvent): void {
    let touch = event.touches[0];

    if (event.type === TouchAction.DOWN) {
      this.startX = touch.x;
      this.startY = touch.y;
      this.startTime = Date.now();
    } else if (event.type === TouchAction.UP) {
      let duration = Date.now() - this.startTime;
      let dx = touch.x - this.startX;
      let dy = touch.y - this.startY;

      // 判断滑动方向
      if (Math.abs(dx) > GestureRecognizer.SWIPE_THRESHOLD) {
        if (dx > 0) {
          console.log('向右滑动');
        } else {
          console.log('向左滑动');
        }
      } else if (Math.abs(dy) > GestureRecognizer.SWIPE_THRESHOLD) {
        if (dy > 0) {
          console.log('向下滑动');
        } else {
          console.log('向上滑动');
        }
      } else if (duration < 200) {
        console.log('点击');
      }
    }
  }
}

export default new GestureRecognizer();
```

## 注意事项

1. **事件消费**：返回 true 表示消费事件，阻止继续传递
2. **多点触控**：通过 touches 数组获取所有触摸点
3. **性能考虑**：频繁的 touchMove 可能影响性能
4. **冲突处理**：注意手势冲突，优先级高的手势会消费事件