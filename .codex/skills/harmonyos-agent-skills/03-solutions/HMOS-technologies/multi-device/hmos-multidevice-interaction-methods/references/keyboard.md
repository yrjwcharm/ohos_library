# 键盘适配指南

## 目录

1. [焦点导航](#焦点导航)
2. [键盘快捷键](#键盘快捷键) : 包含快捷键监听方式以及常用键码

---

## 焦点导航

焦点导航是使用键盘、智慧屏遥控器或或表冠等非指向性输入设备与应用程序进行间接交互的关键机制。

自定义组件无获焦能力，当设置focusable、enabled等属性为false，或者设置visibility属性为Hidden、None时，也不影响其子组件的获焦。

### Tab导航

#### 基本Tab导航

```typescript
@Entry
@Component
struct TabNavExample {
  build() {
    Column() {
      // 按 tabIndex 顺序导航
      TextInput({ placeholder: '姓名' })
        .tabIndex(1)

      TextInput({ placeholder: '邮箱' })
        .tabIndex(2)

      Row() {
        Button('取消')
          .tabIndex(4)

        Button('提交')
          .tabIndex(3)
      }
    }
  }
}
```

#### tabIndex 规则

- **正数**: 按 1, 2, 3... 顺序导航
- **0**: 默认值，按DOM顺序
- **-1**: 可通过程序获焦，但不在Tab序列中

#### 焦点属性

```typescript
// 可获焦
.focusable(true)

// Tab顺序
.tabIndex(1)

// 默认焦点（页面加载时）
.defaultFocus(true)

// 组内默认焦点
.groupDefaultFocus(true)

// Tab键是否停留
.tabStop(true)
```
---

### 方向键导航

#### 使用 nextFocus

```typescript
@Entry
@Component
struct ArrowNavExample {
  build() {
    Column() {
      Row() {
        Button('左上')
          .id('topLeft')
          .nextFocus({ right: 'topRight', down: 'bottomLeft' })

        Button('右上')
          .id('topRight')
          .nextFocus({ left: 'topLeft', down: 'bottomRight' })
      }

      Row() {
        Button('左下')
          .id('bottomLeft')
          .nextFocus({ up: 'topLeft', right: 'bottomRight' })

        Button('右下')
          .id('bottomRight')
          .nextFocus({ up: 'topRight', left: 'bottomLeft' })
      }
    }
  }
}
```

#### nextFocus 参数

| 参数 | 值 | 说明 |
|-----|---|------|
| forward | 组件id | tab键走焦目标 |
| backward | 组件id | shift+tab键走焦目标 |
| up | 组件id | 方向键上键走焦目标 |
| down | 组件id | 方向键下键走焦目标 |
| left | 组件id | 方向键左键走焦目标 |
| right | 组件id | 方向键右键走焦目标 |


#### 网格导航示例

```typescript
@Entry
@Component
struct GridNavExample {
  private items: string[] = [];

  aboutToAppear() {
    for (let i = 0; i < 9; i++) {
      this.items.push(`项目${i + 1}`);
    }
  }

  build() {
    Grid() {
      ForEach(this.items, (item: string, index: number) => {
        GridItem() {
          Text(item)
            .width('100%')
            .height('100%')
            .textAlign(TextAlign.Center)
            .id(`item_${index + 1}`)
            .backgroundColor(Color.Blue)
            .focusable(true)
            .nextFocus({
              forward: `item_${(index + 2) % 9}`,
              backward: `item_${(index) % 9}`,
              up: `item_${(index - 2) % 9}`,
              down: `item_${(index + 4) % 9}`,
              left: `item_${index % 9}`,
              right: `item_${(index + 2) % 9}`
            })
        }
      })
    }
    .columnsTemplate('1fr 1fr 1fr')
    .rowsTemplate('1fr 1fr 1fr')
    .width(300)
    .height(300)
  }
}
```

---

### 焦点样式

焦点样式是组件在获焦时表现的UI样式。

#### 通过系统属性focusBox设置焦点框

```typescript
Button("small black focus box")
        .focusBox({
          margin: new LengthMetrics(0),
          strokeColor: ColorMetrics.rgba(0, 0, 0),
        })
```

```typescript
Button("large red focus box")
        .focusBox({
          margin: LengthMetrics.px(20),
          strokeColor: ColorMetrics.rgba(255, 0, 0),
          strokeWidth: LengthMetrics.px(10)
        })
```

#### 自定义其他焦点样式，如背景色，字体颜色，大小等

通过焦点事件onFocus和onBlur，来监听获焦状态，更改状态变量改变UI

```typescript
@Entry
@Component
struct FocusEventsExample {
  @State isFocused: boolean = false;

  build() {
    Column() {
      Text(this.isFocused ? '已获焦' : '未获焦')
        .focusable(true)
        .onFocus(() => {
          this.isFocused = true;
          console.log('获焦');
        })
        .onBlur(() => {
          this.isFocused = false;
          console.log('失焦');
        })

      Text('其他焦点组件')
        .focusable(true)
    }
    .width(200)
    .height(100)
    .backgroundColor(this.isFocused ? '#E3F2FD' : '#F5F5F5')
    .border({
      width: this.isFocused ? 2 : 1,
      color: this.isFocused ? '#007AFF' : '#E8E8E8'
    })
  }
}
```

#### 自定义焦点样式示例

```typescript
@Entry
@Component
struct FocusableCard {
  @State isFocused: boolean = false;

  build() {
    Column() {
      Text('卡片内容')
        .focusable(true)
        .shadow(this.isFocused ? { radius: 4, color: '#007AFF33', offsetX: 0, offsetY: 0 } : { radius: 0 })
        .onFocus(() => this.isFocused = true)
        .onBlur(() => this.isFocused = false)

      Text('其它焦点组件')
        .focusable(true)
    }
    .width(200)
    .height(100)
    
  }
}
```

在多个组件都可获焦时，使用布尔值作为焦点样式的状态变量显然不合适，需要使用数值或者其他数据类型进行驱动。
参考[焦点导航示例](../assets/FocusNavigationExample.ets)
---

## 键盘快捷键

- 开发者可以设置组件的自定义组合键，每个组件可以设置多个组合键。

- 即使组件未获焦或是在所在页面未展示，只要已经挂载到获焦窗口的组件树上就会响应自定义组合键。

### 使用keyboardShortcut定义组合键

keyboardShortcut(value: string | FunctionKey, keys: Array<ModifierKey>, action?: () => void): T

- 开发者在设置组合键的同时可以设置自定义事件，组合键按下时，触发该自定义事件，若没有设置自定义事件，则组合键行为与click行为一致。

- 快捷键是对系统按键的响应，优先于普通的按键事件OnKeyEvent

- 组合键要求：控制键Ctrl、Shift、Alt及它们的组合加上热键的单个字符（可以通过键盘输入的字符）

1.单个FunctionKey，没有ModifierKey，可以绑定为快捷键

```typescript
Button('button1')
  .keyboardShortcut(FunctionKey.F2,[],()=>{
    // 快捷键事件
  })
```
> FunctionKey只包含F1-F12，ESC，TAB以及方向键（DPAD_UP, DPAD_DOWN, DPAD_LEFT, DPAD_RIGHT）

2.组合键示例

单个ModifierKey示例：Ctrl + A:
```typescript
Button('button1')
  .keyboardShortcut('A', [ModifierKey.CTRL], ()=>{
    // 快捷键事件
  })
```

多个单个ModifierKey示例：Ctrl + Shift + B:
```typescript
Button('button1')
  .keyboardShortcut('B', [ModifierKey.CTRL, ModifierKey.SHIFT], ()=>{
    // 快捷键事件
  })
```

3. 解除快捷键

keyboardShortcut的入参value为空即为取消绑定的快捷键。绑定了多个快捷键的不能解除绑定快捷键

```typescript
@Entry
@Component
struct Index {
  @State message: string = 'disable'
  @State shortCutEnable: boolean = false
  @State keyValue: string = ''

  build() {
    Row() {
      Column({ space: 5 }) {
        Text('Ctrl+A is ' + this.message)
        Button("Test short cut").onClick((event: ClickEvent) => {
          this.message = "I clicked Button";
          console.info("I clicked");
        }).keyboardShortcut(this.keyValue, [ModifierKey.CTRL])
        Button(this.message + 'shortCut').onClick((event: ClickEvent) => {
          this.shortCutEnable = !this.shortCutEnable;
          this.message = this.shortCutEnable ? 'enable' : 'disable';
          this.keyValue = this.shortCutEnable ? 'a' : '';
        })
        Button('multi-shortcut').onClick((event: ClickEvent) => {
          console.info('Trigger keyboard shortcut success.')
        }).keyboardShortcut('q', [ModifierKey.CTRL])
          .keyboardShortcut('w', [ModifierKey.CTRL])
          .keyboardShortcut('', []) // 不生效，绑定了多个快捷键的组件不能解除绑定快捷键
      }
      .width('100%')
    }
    .height('100%')
  }
}
```

---

### 常用快捷键示例

```typescript
import { KeyCode } from '@kit.InputKit';

@Entry
@Component
struct ShortcutsExample {
  @State text: string = '';


  build() {
    Column() {
      Text(this.text)
        .fontSize(24)

      TextInput({ placeholder: '输入' })
    }
    .width('100%')
    .height('100%')
    // Ctrl + S 保存
    .keyboardShortcut('S', [ModifierKey.CTRL], () => {
      this.save();
    })
    // Escape 取消
    .keyboardShortcut(FunctionKey.ESC, [], () => {
      this.cancel();
    })
    .onKeyEvent((event: KeyEvent) => {
      if (event.type === KeyType.Down) {
        // Enter 确认
        if (event.keyCode === KeyCode.KEYCODE_ENTER) {
          this.confirm();
          event.stopPropagation();
        }
      }
    })
  }

  save() {
    console.log('保存');
  }

  cancel() {
    console.log('取消');
  }

  confirm() {
    console.log('确认');
  }
}
```