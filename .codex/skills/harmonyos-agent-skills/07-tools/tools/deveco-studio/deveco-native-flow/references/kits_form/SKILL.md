---
name: kits_form
description: "HarmonyOS FormKit 卡片能力集使用规范。包含 FormExtensionAbility、formProvider、formBindingData 等卡片开发核心能力。Use when: (1) 开发服务卡片，(2) 更新卡片数据，(3) 卡片生命周期管理，(4) 桌面小组件。Triggers: 卡片、FormExtensionAbility、formProvider、卡片服务、桌面小组件、Widget、formBindingData。"
user-invocable: false
---

# FormKit 卡片能力集 (kits_form)

本 skill 覆盖 HarmonyOS **FormKit** 卡片能力集的使用规范。

## 能力列表

| 模块 | 导入方式 | 用途 |
|------|----------|------|
| FormExtensionAbility | @ohos.app.form.FormExtensionAbility | 卡片扩展能力 |
| formProvider | @ohos.app.form.formProvider | 卡片提供方 |
| formBindingData | @ohos.app.form.formBindingData | 卡片数据绑定 |
| formInfo | @ohos.app.form.formInfo | 卡片信息 |
| formError | @ohos.application.formError | 卡片错误 |

## 快速索引

### FormExtensionAbility 生命周期

```typescript
import FormExtensionAbility from '@ohos.app.form.FormExtensionAbility';
import formBindingData from '@ohos.app.form.formBindingData';
import formProvider from '@ohos.app.form.formProvider';
import Want from '@ohos.app.ability.Want';

export default class CardFormAbility extends FormExtensionAbility {
  // 首次创建卡片时调用
  onAddForm(want: Want): formBindingData.FormBindingData {
    console.log('onAddForm');
    // 返回卡片初始数据
    let data: formBindingData.FormBindingData = formBindingData.createFormBindingData({
      title: '天气卡片',
      temperature: '26°C',
      city: '北京'
    });
    return data;
  }

  // 更新卡片时调用
  onUpdateForm(formId: string): formBindingData.FormBindingData {
    console.log('onUpdateForm: ' + formId);
    // 返回更新后的数据
    let data = formBindingData.createFormBindingData({
      title: '天气卡片',
      temperature: '28°C',
      city: '北京'
    });
    return data;
  }

  // 卡片提供方主动更新卡片数据
  onRequestForm(formId: string): void {
    console.log('onRequestForm: ' + formId);
  }

  // 删除卡片时调用
  onRemoveForm(formId: string): void {
    console.log('onRemoveForm: ' + formId);
  }

  // 卡片事件
  onFormEvent(formId: string, message: string): void {
    console.log('onFormEvent: ' + formId + ', ' + message);
  }
}
```

### 卡片页面开发

```typescript
// 卡片页面 (ets/widget/pages/WidgetCard.ets)
let storage = new LocalStorage();

@Entry(storage)
@Component
struct WidgetCard {
  @LocalStorageProp('title') title: string = '默认标题';
  @LocalStorageProp('temperature') temperature: string = '--';
  @LocalStorageProp('city') city: string = '未知';

  build() {
    Column() {
      Text(this.title)
        .fontSize(14)
        .fontWeight(FontWeight.Bold)

      Text(this.temperature)
        .fontSize(32)
        .margin({ top: 8 })

      Text(this.city)
        .fontSize(12)
        .fontColor('#999999')
    }
    .width('100%')
    .height('100%')
    .padding(12)
    .onClick(() => {
      // 点击卡片事件
      postCardAction(this, {
        action: 'router',
        abilityName: 'EntryAbility',
        params: {
          targetPage: 'pages/WeatherDetail'
        }
      });
    })
  }
}
```

### formProvider 主动更新卡片

```typescript
import formProvider from '@ohos.app.form.formProvider';
import formBindingData from '@ohos.app.form.formBindingData';
import formInfo from '@ohos.app.form.formInfo';

// 更新指定卡片
async function updateFormCard(formId: string, data: Record<string, Object>): Promise<void> {
  try {
    let bindingData = formBindingData.createFormBindingData(data);
    await formProvider.updateForm(formId, bindingData);
    console.log('Form updated successfully');
  } catch (error) {
    console.error('Failed to update form: ' + JSON.stringify(error));
  }
}

// 获取卡片信息
async function getFormInfo(formId: string): Promise<formInfo.FormInfo> {
  let info = await formProvider.getFormInfo(formId);
  console.log('Form info: ' + JSON.stringify(info));
  return info;
}

// 请求发布卡片
async function requestPublishForm(want: Want): Promise<string> {
  let formId = await formProvider.requestPublishForm(want);
  console.log('Published form id: ' + formId);
  return formId;
}

// 通知卡片可见
formProvider.notifyVisibleForms(['formId1', 'formId2']);

// 通知卡片不可见
formProvider.notifyInvisibleForms(['formId1', 'formId2']);
```

### formBindingData 数据绑定

```typescript
import formBindingData from '@ohos.app.form.formBindingData';

// 创建简单数据
let simpleData = formBindingData.createFormBindingData({
  title: '新闻卡片',
  content: '今日头条新闻内容',
  time: '10:30'
});

// 创建复杂数据
let complexData = formBindingData.createFormBindingData({
  title: '音乐卡片',
  songName: 'Nightingale',
  artist: 'Demi Lovato',
  duration: '3:45',
  isPlaying: true,
  progress: 0.6
});

// 创建带图片的数据
let imageData = formBindingData.createFormBindingData({
  title: '图片卡片',
  imagePath: '/data/local/tmp/image.jpg'
});
```

### 卡片配置

```json5
// module.json5 中配置
{
  "module": {
    "extensionAbilities": [
      {
        "name": "CardFormAbility",
        "srcEntry": "./ets/formability/CardFormAbility.ets",
        "type": "form",
        "label": "$string:widget_name",
        "description": "$string:widget_desc",
        "metadata": [
          {
            "name": "ohos.extension.form",
            "resource": "$profile:form_config"
          }
        ]
      }
    ]
  }
}
```

```json
// resources/base/profile/form_config.json
{
  "forms": [
    {
      "name": "WeatherCard",
      "displayName": "$string:weather_card_name",
      "description": "$string:weather_card_desc",
      "src": "./ets/widget/pages/WeatherCard.ets",
      "uiSyntax": "arkts",
      "window": {
        "designWidth": 720,
        "autoDesignWidth": true
      },
      "colorMode": "auto",
      "isDefault": true,
      "updateEnabled": true,
      "scheduledUpdateTime": "10:30",
      "updateDuration": 1,
      "defaultDimension": "2*2",
      "supportDimensions": ["2*2", "2*4", "4*4"]
    }
  ]
}
```

### 定时更新卡片

```typescript
import formProvider from '@ohos.app.form.formProvider';
import formBindingData from '@ohos.app.form.formBindingData';

// 通过 scheduledUpdateTime 配置定时更新
// form_config.json 中设置：
// "scheduledUpdateTime": "10:30",
// "updateDuration": 1  // 更新间隔（小时）

// 在 onAddForm 中返回初始数据
onAddForm(want: Want): formBindingData.FormBindingData {
  return formBindingData.createFormBindingData({
    updateTime: new Date().toLocaleTimeString()
  });
}

// 系统会在 scheduledUpdateTime 触发 onUpdateForm
onUpdateForm(formId: string): formBindingData.FormBindingData {
  return formBindingData.createFormBindingData({
    updateTime: new Date().toLocaleTimeString()
  });
}
```

### 卡片交互事件

```typescript
// 卡片页面中处理事件
@Entry
@Component
struct InteractiveCard {
  @LocalStorageProp('count') count: number = 0;

  build() {
    Column() {
      Text(`点击次数: ${this.count}`)
        .fontSize(16)

      Button('点击我')
        .onClick(() => {
          // 发送事件到 FormExtensionAbility
          postCardAction(this, {
            action: 'message',
            params: {
              method: 'increment',
              count: this.count
            }
          });
        })
    }
  }
}

// FormExtensionAbility 中处理事件
onFormEvent(formId: string, message: string): void {
  let data = JSON.parse(message);
  if (data.method === 'increment') {
    let newCount = (data.count || 0) + 1;
    // 更新卡片数据
    let bindingData = formBindingData.createFormBindingData({
      count: newCount
    });
    formProvider.updateForm(formId, bindingData);
  }
}
```

### 卡片尺寸

| 尺寸 | 网格 | 像素 (建议) |
|------|------|-------------|
| 小卡片 | 1×2 | 1×2 cards |
| 小卡片 | 2×2 | 2×2 cards |
| 中卡片 | 2×4 | 2×4 cards |
| 大卡片 | 4×4 | 4×4 cards |

```json
// 配置支持的卡片尺寸
"supportDimensions": ["2*2", "2*4", "4*4"]
```

## 最佳实践

### 1. 数据更新策略

```typescript
// 避免频繁更新，使用合适的更新间隔
// 对于实时性要求高的数据，使用主动推送
// 对于实时性要求低的数据，使用定时更新

// 批量更新
async function batchUpdate(forms: Array<{ formId: string, data: Record<string, Object> }>): Promise<void> {
  for (const form of forms) {
    let bindingData = formBindingData.createFormBindingData(form.data);
    await formProvider.updateForm(form.formId, bindingData);
  }
}
```

### 2. 内存管理

```typescript
// 卡片页面保持简洁
// 避免复杂的动画和计算
// 图片使用缩略图
// 避免大量数据绑定
```

### 3. 错误处理

```typescript
import formError from '@ohos.application.formError';

try {
  await formProvider.updateForm(formId, bindingData);
} catch (err) {
  let error = err as formError.FormError;
  console.error('Form error code: ' + error.code);
  console.error('Form error message: ' + error.message);
}
```

## 注意事项

1. **卡片限制**：
   - 不能使用自定义组件
   - 不能使用系统动画 API
   - 不能打开新页面（只能跳转主应用）

2. **性能优化**：
   - 卡片大小限制 60KB
   - 避免频繁刷新
   - 使用合适的更新间隔

3. **生命周期**：
   - onAddForm 返回初始数据
   - onUpdateForm 返回更新数据
   - onRemoveForm 清理资源