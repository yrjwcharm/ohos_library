---
name: kits_ime
description: "HarmonyOS IMEKit 输入法能力集使用规范。包含 InputMethodExtensionAbility、inputMethod、inputMethodEngine 等输入法开发和调用能力。Use when: (1) 开发输入法应用，(2) 管理系统输入法，(3) 输入法设置，(4) 自定义键盘。Triggers: 输入法、InputMethod、IME、键盘、inputMethod、InputMethodExtensionAbility、软键盘、输入法切换。"
user-invocable: false
---

# IMEKit 输入法能力集 (kits_ime)

本 skill 覆盖 HarmonyOS **IMEKit** 输入法能力集的使用规范。

## 能力列表

| 模块 | 导入方式 | 用途 |
|------|----------|------|
| InputMethodExtensionAbility | @ohos.InputMethodExtensionAbility | 输入法扩展能力 |
| InputMethodExtensionContext | @ohos.InputMethodExtensionContext | 输入法上下文 |
| inputMethod | @ohos.inputMethod | 输入法服务 |
| inputMethodEngine | @ohos.inputMethodEngine | 输入法引擎 |
| InputMethodSubtype | @ohos.InputMethodSubtype | 输入法子类型 |
| Panel | @ohos.inputMethod.Panel | 输入法面板 |

## 快速索引

### InputMethodExtensionAbility 生命周期

```typescript
import InputMethodExtensionAbility from '@ohos.InputMethodExtensionAbility';
import InputMethodExtensionContext from '@ohos.InputMethodExtensionContext';
import Want from '@ohos.app.ability.Want';

export default class MyInputMethod extends InputMethodExtensionAbility {
  private context: InputMethodExtensionContext | null = null;

  // 输入法创建
  onCreate(want: Want): void {
    console.log('InputMethod onCreate');
    this.context = this.context;
  }

  // 输入法销毁
  onDestroy(): void {
    console.log('InputMethod onDestroy');
  }
}
```

### inputMethodEngine 输入法引擎

```typescript
import inputMethodEngine from '@ohos.inputMethodEngine';

// 获取输入法控制器
let imController = inputMethodEngine.getInputMethodEngine();

// 获取键盘委托
let keyboardDelegate = inputMethodEngine.createKeyboardDelegate();

// 监听绑定事件
keyboardDelegate.on('insertText', (text: string) => {
  console.log('Insert text: ' + text);
});

// 监听删除事件
keyboardDelegate.on('deleteLeft', (length: number) => {
  console.log('Delete left: ' + length);
});

// 监听发送键
keyboardDelegate.on('sendFunctionKey', (keyEvent: KeyEvent) => {
  console.log('Send key: ' + keyEvent.keyCode);
});
```

### 输入法面板管理

```typescript
import { Panel, PanelType, PanelFlag } from '@ohos.inputMethod.Panel';

let panel: Panel;

// 创建面板
async function createPanel(context: Context): Promise<void> {
  let panelInfo: PanelInfo = {
    type: PanelType.SOFT_KEYBOARD,
    flag: PanelFlag.FLG_FIXED
  };

  panel = await inputMethodEngine.createPanel(context, panelInfo);

  // 设置面板UI
  panel.setUIContent('pages/KeyboardPage');

  // 显示面板
  await panel.show();

  // 隐藏面板
  await panel.hide();
}

// 面板类型
PanelType.SOFT_KEYBOARD = 0   // 软键盘
PanelType.STATUS_BAR = 1      // 状态栏

// 面板标志
PanelFlag.FLG_FIXED = 0       // 固定
PanelFlag.FLG_FLOATING = 1    // 浮动
```

### 文本输入控制

```typescript
import inputMethodEngine from '@ohos.inputMethodEngine';

// 获取文本输入客户端
let textInputClient = inputMethodEngine.getInputMethodAbility().getTextInputClient();

// 插入文本
async function insertText(text: string): Promise<void> {
  await textInputClient.insertText(text);
}

// 删除文本
async function deleteText(length: number): Promise<void> {
  await textInputClient.deleteLeftText(length);
}

// 获取编辑框内容
async function getTextContent(): Promise<string> {
  let textInfo = await textInputClient.getTextContent();
  return textInfo.text;
}

// 获取光标位置
async function getCursorPosition(): Promise<number> {
  let cursor = await textInputClient.getCursor();
  return cursor;
}

// 设置光标位置
async function setCursorPosition(position: number): Promise<void> {
  await textInputClient.setCursor(position);
}

// 获取选中范围
async function getSelection(): Promise<{ start: number, end: number }> {
  let selection = await textInputClient.getSelection();
  return selection;
}

// 选择文本
async function selectText(start: number, end: number): Promise<void> {
  await textInputClient.setSelection(start, end);
}
```

### 输入法服务管理

```typescript
import inputMethod from '@ohos.inputMethod';

// 获取输入法控制器
let imCtrl = inputMethod.getController();

// 显示输入法
await imCtrl.showSoftKeyboard();

// 隐藏输入法
await imCtrl.hideSoftKeyboard();

// 切换输入法
await imCtrl.switchCurrentInputMethodSubtype({
  id: 'com.example.keyboard',
  label: '中文拼音',
  name: 'pinyin',
  language: 'zh-CN',
  mode: 'lower'
});

// 获取当前输入法
let currentMethod = await inputMethod.getCurrentInputMethod();
console.log('Current method: ' + currentMethod.name);

// 获取当前输入法子类型
let currentSubtype = await inputMethod.getCurrentInputMethodSubtype();
console.log('Current subtype: ' + currentSubtype.name);
```

### 输入法列表管理

```typescript
import inputMethod from '@ohos.inputMethod';

// 获取所有输入法
let inputMethods = await inputMethod.getInputMethods();
inputMethods.forEach((method) => {
  console.log('Method: ' + method.name);
  console.log('Label: ' + method.label);
  console.log('Id: ' + method.id);
});

// 获取输入法子类型列表
let subtypes = await inputMethod.listInputMethodSubtype('com.example.keyboard');
subtypes.forEach((subtype) => {
  console.log('Subtype: ' + subtype.name);
  console.log('Language: ' + subtype.language);
});

// 设置默认输入法
await inputMethod.setDefaultInputMethod('com.example.keyboard');
```

### 输入法子类型

```typescript
import InputMethodSubtype from '@ohos.InputMethodSubtype';

let subtype: InputMethodSubtype = {
  id: 'com.example.keyboard',
  label: '中文拼音',
  name: 'pinyin',
  language: 'zh-CN',
  mode: 'lower',  // lower, upper, symbol
  locale: 'zh-Hans-CN',
  icon: '/resources/base/media/icon.png',
  iconId: 12345
};
```

### 键盘页面开发

```typescript
import inputMethodEngine from '@ohos.inputMethodEngine';

@Entry
@Component
struct KeyboardPage {
  private keyboardDelegate = inputMethodEngine.createKeyboardDelegate();
  private textInputClient = inputMethodEngine.getInputMethodAbility().getTextInputClient();

  @State isUpperCase: boolean = false;
  @State isSymbolMode: boolean = false;

  build() {
    Column() {
      // 符号行
      if (this.isSymbolMode) {
        this.SymbolRow()
      } else {
        // 字母行
        this.LetterRows()
      }

      // 底部功能行
      this.FunctionRow()
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F5F5')
  }

  @Builder
  LetterRows() {
    Column() {
      Row() {
        this.KeyButton('Q')
        this.KeyButton('W')
        this.KeyButton('E')
        this.KeyButton('R')
        this.KeyButton('T')
        this.KeyButton('Y')
        this.KeyButton('U')
        this.KeyButton('I')
        this.KeyButton('O')
        this.KeyButton('P')
      }

      Row() {
        this.KeyButton('A')
        this.KeyButton('S')
        this.KeyButton('D')
        this.KeyButton('F')
        this.KeyButton('G')
        this.KeyButton('H')
        this.KeyButton('J')
        this.KeyButton('K')
        this.KeyButton('L')
      }

      Row() {
        this.ShiftKey()
        this.KeyButton('Z')
        this.KeyButton('X')
        this.KeyButton('C')
        this.KeyButton('V')
        this.KeyButton('B')
        this.KeyButton('N')
        this.KeyButton('M')
        this.DeleteKey()
      }
    }
  }

  @Builder
  KeyButton(key: string) {
    Button(this.isUpperCase ? key : key.toLowerCase())
      .width(32)
      .height(44)
      .margin(2)
      .onClick(() => {
        let text = this.isUpperCase ? key : key.toLowerCase();
        this.textInputClient.insertText(text);
      })
  }

  @Builder
  ShiftKey() {
    Button('⇧')
      .width(44)
      .height(44)
      .margin(2)
      .backgroundColor(this.isUpperCase ? '#2196F3' : '#FFFFFF')
      .onClick(() => {
        this.isUpperCase = !this.isUpperCase;
      })
  }

  @Builder
  DeleteKey() {
    Button('⌫')
      .width(44)
      .height(44)
      .margin(2)
      .onClick(() => {
        this.textInputClient.deleteLeftText(1);
      })
  }

  @Builder
  SymbolRow() {
    Row() {
      ForEach(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
               '-', '/', ':', ';', '(', ')', '$', '&', '@', '"'],
        (symbol: string) => {
          Button(symbol)
            .width(28)
            .height(44)
            .margin(1)
            .onClick(() => {
              this.textInputClient.insertText(symbol);
            })
        }
      )
    }
  }

  @Builder
  FunctionRow() {
    Row() {
      Button('123')
        .width(60)
        .height(44)
        .onClick(() => {
          this.isSymbolMode = !this.isSymbolMode;
        })

      Button('中文')
        .width(60)
        .height(44)

      Blank()

      Button('空格')
        .width(160)
        .height(44)
        .onClick(() => {
          this.textInputClient.insertText(' ');
        })

      Blank()

      Button('换行')
        .width(60)
        .height(44)
        .onClick(() => {
          this.textInputClient.insertText('\n');
        })
    }
    .width('100%')
    .padding(4)
  }
}
```

### 监听输入法状态

```typescript
import inputMethod from '@ohos.inputMethod';

let imCtrl = inputMethod.getController();

// 监听输入法显示/隐藏
imCtrl.on('imeShow', () => {
  console.log('IME shown');
});

imCtrl.on('imeHide', () => {
  console.log('IME hidden');
});

// 移除监听
imCtrl.off('imeShow');
imCtrl.off('imeHide');
```

### 配置输入法应用

```json5
// module.json5
{
  "module": {
    "extensionAbilities": [
      {
        "name": "MyInputMethod",
        "srcEntry": "./ets/inputmethod/MyInputMethod.ets",
        "type": "inputMethod",
        "label": "$string:ime_name",
        "description": "$string:ime_desc",
        "metadata": [
          {
            "name": "ohos.input_method",
            "resource": "$profile:input_method_config"
          }
        ]
      }
    ]
  }
}
```

```json
// resources/base/profile/input_method_config.json
{
  "inputMethodSubtypes": [
    {
      "name": "pinyin",
      "label": "中文拼音",
      "language": "zh-CN",
      "mode": "lower"
    },
    {
      "name": "english",
      "label": "English",
      "language": "en-US",
      "mode": "lower"
    }
  ]
}
```

### 输入法列表对话框

```typescript
import { InputMethodListDialog } from '@ohos.inputMethodList';

// 显示输入法选择对话框
let dialog = new InputMethodListDialog();
dialog.show();
```

## 最佳实践

### 输入法管理器封装

```typescript
import inputMethod from '@ohos.inputMethod';

class InputMethodManager {
  private static instance: InputMethodManager;
  private controller = inputMethod.getController();

  static getInstance(): InputMethodManager {
    if (!InputMethodManager.instance) {
      InputMethodManager.instance = new InputMethodManager();
    }
    return InputMethodManager.instance;
  }

  async show(): Promise<void> {
    await this.controller.showSoftKeyboard();
  }

  async hide(): Promise<void> {
    await this.controller.hideSoftKeyboard();
  }

  async getCurrentMethod(): Promise<inputMethod.InputMethodProperty> {
    return await inputMethod.getCurrentInputMethod();
  }

  async getSubtypes(imeId: string): Promise<inputMethod.InputMethodSubtype[]> {
    return await inputMethod.listInputMethodSubtype(imeId);
  }
}

export default InputMethodManager.getInstance();
```

## 注意事项

1. **权限声明**：输入法需要特殊权限
2. **用户设置**：用户需在设置中启用输入法
3. **隐私保护**：输入法可能获取敏感信息
4. **性能优化**：键盘响应需要快速流畅
5. **多种模式**：支持字母、数字、符号等多种输入模式