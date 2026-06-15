---
name: kits_accessibility
description: "HarmonyOS AccessibilityKit 无障碍能力集使用规范。包含 AccessibilityExtensionAbility、accessibility、AccessibilityElement 等无障碍服务开发能力。Use when: (1) 开发无障碍服务，(2) 屏幕阅读，(3) 无障碍事件监听，(4) 辅助功能开发。Triggers: 无障碍、accessibility、AccessibilityExtensionAbility、屏幕阅读、辅助功能、GesturePath、GesturePoint。"
user-invocable: false
---

# AccessibilityKit 无障碍能力集 (kits_accessibility)

本 skill 覆盖 HarmonyOS **AccessibilityKit** 无障碍能力集的使用规范。

## 能力列表

| 模块 | 导入方式 | 用途 |
|------|----------|------|
| AccessibilityExtensionAbility | @ohos.application.AccessibilityExtensionAbility | 无障碍扩展能力 |
| accessibility | @ohos.accessibility | 无障碍服务管理 |
| AccessibilityElement | @ohos.application.AccessibilityExtensionAbility | 无障碍元素 |
| GesturePath | @ohos.accessibility.GesturePath | 手势路径 |
| GesturePoint | @ohos.accessibility.GesturePoint | 手势点 |

## 快速索引

### AccessibilityExtensionAbility 生命周期

```typescript
import AccessibilityExtensionAbility, {
  AccessibilityElement,
  AccessibilityExtensionContext,
  ElementAttributeKeys,
  FocusDirection,
  FocusType
} from '@ohos.application.AccessibilityExtensionAbility';

export default class MyAccessibilityService extends AccessibilityExtensionAbility {
  // 服务创建时调用
  onConnect(): void {
    console.log('Accessibility service connected');
  }

  // 服务断开时调用
  onDisconnect(): void {
    console.log('Accessibility service disconnected');
  }

  // 无障碍事件回调
  onAccessibilityEvent(event: AccessibilityEvent): void {
    console.log('Accessibility event: ' + event.eventType);

    switch (event.eventType) {
      case 'viewClicked':
        this.handleViewClicked(event);
        break;
      case 'viewFocused':
        this.handleViewFocused(event);
        break;
      default:
        break;
    }
  }

  // 按键事件回调
  onKeyEvent(keyEvent: KeyEvent): boolean {
    console.log('Key event: ' + keyEvent.keyCode);
    return false; // 返回 true 表示消费事件
  }

  private handleViewClicked(event: AccessibilityEvent): void {
    // 处理视图点击事件
  }

  private handleViewFocused(event: AccessibilityEvent): void {
    // 处理视图焦点事件
  }
}
```

### AccessibilityExtensionContext 操作

```typescript
import { AccessibilityExtensionContext } from '@ohos.application.AccessibilityExtensionAbility';

let context: AccessibilityExtensionContext;

// 获取焦点元素
async function getFocusedElement(): Promise<AccessibilityElement | null> {
  let element = await context.getRootElement();
  let focused = await element.findFocusedElement(FocusType.FOCUS_TYPE_ACCESSIBILITY);
  return focused;
}

// 获取根元素
async function getRootElement(): Promise<AccessibilityElement> {
  return await context.getRootElement();
}

// 执行手势
async function performGesture(points: GesturePoint[]): Promise<void> {
  let path = new GesturePath(100); // 100ms 持续时间
  points.forEach(point => {
    path.points.push(point);
  });
  await context.injectGesture(path);
}
```

### AccessibilityElement 元素操作

```typescript
import { AccessibilityElement, ElementAttributeKeys } from '@ohos.application.AccessibilityExtensionAbility';

// 获取元素属性
async function getElementInfo(element: AccessibilityElement): Promise<void> {
  let attributes: ElementAttributeKeys[] = [
    'displayText',
    'contentDescription',
    'hintText',
    'accessibilityText',
    'packageName',
    'className',
    'text',
    'enabled',
    'clickable',
    'focusable',
    'scrollable',
    'checkable',
    'checked'
  ];

  let info = await element.getAttributeValue(attributes);
  console.log('Element info: ' + JSON.stringify(info));
}

// 查找子元素
async function findChildElements(element: AccessibilityElement): Promise<AccessibilityElement[]> {
  let children = await element.getChildElements();
  return children;
}

// 查找元素
async function findElementByContent(element: AccessibilityElement, text: string): Promise<AccessibilityElement | null> {
  let children = await element.getChildElements();
  for (let child of children) {
    let attr = await child.getAttributeValue(['displayText', 'contentDescription']);
    if (attr.displayText?.includes(text) || attr.contentDescription?.includes(text)) {
      return child;
    }
    let found = await findElementByContent(child, text);
    if (found) return found;
  }
  return null;
}

// 执行操作
async function performActions(element: AccessibilityElement): Promise<void> {
  // 点击
  await element.performAction('click');

  // 长按
  await element.performAction('longClick');

  // 获取焦点
  await element.performAction('focus');

  // 清除焦点
  await element.performAction('clearFocus');

  // 向前滚动
  await element.performAction('scrollForward');

  // 向后滚动
  await element.performAction('scrollBackward');
}
```

### FocusDirection 焦点方向

```typescript
import { FocusDirection } from '@ohos.application.AccessibilityExtensionAbility';

// 焦点方向
FocusDirection.UP      // 向上
FocusDirection.DOWN    // 向下
FocusDirection.LEFT    // 向左
FocusDirection.RIGHT   // 向右
FocusDirection.FORWARD // 向前
FocusDirection.BACKWARD // 向后

// 按方向查找下一个焦点元素
async function findNextFocus(element: AccessibilityElement, direction: FocusDirection): Promise<AccessibilityElement | null> {
  return await element.findNextFocusableElement(direction);
}
```

### GesturePath 手势路径

```typescript
import GesturePath from '@ohos.accessibility.GesturePath';
import GesturePoint from '@ohos.accessibility.GesturePoint';

// 创建手势点
let startPoint = new GesturePoint(100, 200);  // x: 100, y: 200
let midPoint = new GesturePoint(150, 250);
let endPoint = new GesturePoint(200, 200);

// 创建手势路径
let path = new GesturePath(1000); // 总持续时间 1秒
path.points.push(startPoint);
path.points.push(midPoint);
path.points.push(endPoint);

// 设置开始时间
path.startTime = 0;

// 创建多点手势路径
let path2 = new GesturePath(500);
path2.points.push(new GesturePoint(100, 300));
path2.points.push(new GesturePoint(200, 300));
path2.startTime = 500; // 延迟 500ms 开始
```

### GesturePoint 手势点

```typescript
import GesturePoint from '@ohos.accessibility.GesturePoint';

// 创建手势点
let point = new GesturePoint(100, 200);

// 获取坐标
console.log('X: ' + point.x);
console.log('Y: ' + point.y);
```

### accessibility 服务管理

```typescript
import accessibility from '@ohos.accessibility';

// 获取所有无障碍服务
let services = await accessibility.getAccessibilityExtensionList();
services.forEach(service => {
  console.log('Service: ' + service.name);
  console.log('Description: ' + service.description);
});

// 检查无障碍服务是否开启
let isEnabled = await accessibility.isOpenAccessibility();
console.log('Accessibility enabled: ' + isEnabled);

// 检查辅助触摸是否开启
let isTouchExplorationEnabled = await accessibility.isOpenTouchExploration();
console.log('Touch exploration enabled: ' + isTouchExplorationEnabled);

// 发送无障碍事件
accessibility.sendEvent({
  eventType: 'viewClicked',
  source: element,
  bundleName: 'com.example.myapp'
});
```

### AccessibilityEvent 事件类型

```typescript
// 常用事件类型
const EVENT_TYPES = [
  'viewClicked',           // 视图点击
  'viewLongClicked',       // 视图长按
  'viewFocused',           // 视图获得焦点
  'viewSelected',          // 视图选中
  'viewTextChanged',       // 文本变化
  'viewTextChanged',       // 文本变化
  'windowStateChanged',    // 窗口状态变化
  'windowContentChanged',  // 窗口内容变化
  'viewScrolled',          // 视图滚动
  'viewHoverEnter',        // 悬停进入
  'viewHoverExit'          // 悬停退出
];

interface AccessibilityEvent {
  eventType: string;        // 事件类型
  eventTime: number;        // 事件时间
  bundleName: string;       // 应用包名
  componentName: string;    // 组件名
  source?: AccessibilityElement; // 事件源元素
  text?: string[];          // 文本内容
  contentDescription?: string;   // 内容描述
  itemCount?: number;       // 条目数量
  currentIndex?: number;    // 当前索引
  fromIndex?: number;       // 来源索引
  toIndex?: number;         // 目标索引
  scrollX?: number;         // 滚动X
  scrollY?: number;         // 滚动Y
}
```

### 配置无障碍服务

```json5
// module.json5 配置
{
  "module": {
    "extensionAbilities": [
      {
        "name": "MyAccessibilityService",
        "srcEntry": "./ets/accessibility/MyAccessibilityService.ets",
        "type": "accessibility",
        "label": "$string:accessibility_service_name",
        "description": "$string:accessibility_service_desc",
        "metadata": [
          {
            "name": "ohos.accessibility",
            "resource": "$profile:accessibility_config"
          }
        ]
      }
    ]
  }
}
```

```json
// resources/base/profile/accessibility_config.json
{
  "accessibilityCapabilities": [
    "retrieve",
    "gesture",
    "keyEventObserver"
  ],
  "accessibilityEventTypes": [
    "viewClicked",
    "viewFocused",
    "viewTextChanged"
  ],
  "settingsActivity": "com.example.myapp.SettingsActivity"
}
```

### 屏幕阅读功能

```typescript
import { AccessibilityExtensionContext, AccessibilityElement } from '@ohos.application.AccessibilityExtensionAbility';

class ScreenReader {
  private context: AccessibilityExtensionContext;

  constructor(context: AccessibilityExtensionContext) {
    this.context = context;
  }

  // 朗读当前焦点元素
  async speakFocusedElement(): Promise<void> {
    let root = await this.context.getRootElement();
    let focused = await root.findFocusedElement(FocusType.FOCUS_TYPE_ACCESSIBILITY);

    if (focused) {
      let text = await this.getElementText(focused);
      // 使用 TTS 朗读文本
      this.speak(text);
    }
  }

  // 获取元素文本
  private async getElementText(element: AccessibilityElement): Promise<string> {
    let attrs = await element.getAttributeValue([
      'displayText',
      'contentDescription',
      'accessibilityText'
    ]);

    return attrs.displayText || attrs.contentDescription || attrs.accessibilityText || '';
  }

  // 模拟朗读（实际需要配合 TTS）
  private speak(text: string): void {
    console.log('Speaking: ' + text);
  }

  // 导航到下一个元素
  async navigateNext(): Promise<void> {
    let current = await this.getFocusedElement();
    if (current) {
      let next = await current.findNextFocusableElement(FocusDirection.FORWARD);
      if (next) {
        await next.performAction('focus');
        await this.speakFocusedElement();
      }
    }
  }

  // 导航到上一个元素
  async navigatePrevious(): Promise<void> {
    let current = await this.getFocusedElement();
    if (current) {
      let prev = await current.findNextFocusableElement(FocusDirection.BACKWARD);
      if (prev) {
        await prev.performAction('focus');
        await this.speakFocusedElement();
      }
    }
  }
}
```

## 无障碍属性设置

在应用 UI 中设置无障碍属性：

```typescript
@Entry
@Component
struct AccessibilityPage {
  @State count: number = 0;

  build() {
    Column({ space: 20 }) {
      // 设置无障碍文本
      Text('点击次数: ' + this.count)
        .accessibilityText('当前点击次数为' + this.count + '次')
        .accessibilityGroup(true)

      // 设置无障碍描述
      Button('增加')
        .accessibilityText('增加按钮')
        .accessibilityDescription('点击此按钮可以增加计数')
        .accessibilityLevel('important')
        .onClick(() => {
          this.count++;
        })

      // 设置无障碍组
      Column() {
        Text('用户名：')
        TextInput({ placeholder: '请输入用户名' })
          .accessibilityText('用户名输入框')
          .accessibilityDescription('请在此处输入您的用户名')
      }
      .accessibilityGroup(true)
      .accessibilityText('用户名输入区域')

      // 设置无障碍重要性
      Image($r('app.media.logo'))
        .width(100)
        .height(100)
        .accessibilityText('应用Logo')
        .accessibilityLevel('no-hide-descendants') // 不朗读子元素
    }
  }
}
```

## 无障碍属性解释

| 属性 | 说明 |
|------|------|
| accessibilityText | 无障碍朗读文本 |
| accessibilityDescription | 无障碍描述 |
| accessibilityLevel | 无障碍重要性 |
| accessibilityGroup | 是否作为无障碍组 |
| accessibilityChecked | 是否选中（用于复选框等） |
| accessibilitySelected | 是否选择 |
| accessibilityEnabled | 是否启用 |

accessibilityLevel 值：
- `auto`：根据组件类型自动判断
- `important`：重要元素
- `no-hide-descendants`：隐藏子元素的无障碍信息
- `yes`：是无障碍元素
- `no`：不是无障碍元素

## 最佳实践

1. **为所有交互元素提供无障碍文本**
2. **使用语义化的布局结构**
3. **避免仅靠颜色传达信息**
4. **确保触摸目标足够大（至少 48x48 dp）**
5. **支持键盘导航**

## 注意事项

1. **权限要求**：无障碍服务需要特殊权限
2. **用户授权**：用户需要在设置中手动开启
3. **隐私保护**：无障碍服务可能获取敏感信息
4. **性能影响**：频繁的事件监听可能影响性能