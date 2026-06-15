# 使用@InsightIntentForm装饰器创建卡片意图

使用该装饰器装饰 FormExtensionAbility 并配置 FormExtensionAbility 绑定的卡片名称，便于AI入口通过意图添加卡片。

---

## Quick Start

### 快速上手

```typescript
import { formBindingData, FormExtensionAbility, formInfo } from '@kit.FormKit';
import { Want, InsightIntentForm } from '@kit.AbilityKit';

@InsightIntentForm({
  intentName: 'PlayMusic',
  domain: 'MusicDomain',
  intentVersion: '1.0.1',
  displayName: '播放歌曲',
  displayDescription: '播放音乐意图',
  llmDescription: '添加音乐播放卡片到桌面',
  keywords: ['音乐播放', '卡片', 'widget'],
  formName: 'widget'
})
export default class MusicFormAbility extends FormExtensionAbility {
  onAddForm(want: Want) {
    let formData = {
      title: '音乐播放',
      songName: '未播放'
    };
    return formBindingData.createFormBindingData(formData);
  }
}
```

### 完整流程

1. **（可选）创建卡片配置**：在 `form_config.json` 中定义卡片
2. **（可选）创建 FormExtensionAbility**：继承 `FormExtensionAbility` 类
3. **添加装饰器**：使用 `@InsightIntentForm` 装饰器
4. **（可选）实现生命周期**：实现 `onAddForm` 等方法
5. **（可选）注册意图**：在 `insight_intent.json` 中添加文件路径

## 核心规则

### 适用场景

- ✅ 需要将应用卡片暴露给AI入口
- ✅ 允许用户通过语音或AI助手快速添加卡片到桌面
- ✅ 卡片需要支持意图参数定制（如播放指定歌曲的卡片）
- ❌ 不适用于非卡片相关的意图定义

### 代码输出要求

- ✅ 必须**继承** `FormExtensionAbility` 类
- ✅ 类必须使用 `export default` 导出
- ✅ `formName` 必须与 `form_config.json` 中定义的卡片名称一致
- ✅ 实现 `onAddForm` 方法返回 `FormBindingData`
- ✅ 新增文件时，在 `insight_intent.json` 的 `insightIntentsSrcEntry` 数组中添加文件路径
- ❌ 不允许装饰非 FormExtensionAbility 的类

### FormExtensionAbility 生命周期

```typescript
export default class MyFormAbility extends FormExtensionAbility {
  // 添加卡片时调用
  onAddForm(want: Want): formBindingData.FormBindingData {
    return formBindingData.createFormBindingData({});
  }

  // 卡片更新时调用
  onUpdateForm(formId: string): void {}

  // 删除卡片时调用
  onRemoveForm(formId: string): void {}

  // 卡片提供方收到通知调用
  onNotify(formId: string, message: string): void {}

  // 卡片事件消息接收
  onEvent(formId: string, message: string): void {}
}
```

## 快速参考

### @InsightIntentForm 必填字段

| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `intentName` | string | 英文PascalCase，动词-名词结构 | `"PlayMusic"`, `"AddWeatherWidget"` |
| `domain` | string | 域标识符，取值范围参见[各垂域的智慧分发特性列表](https://developer.huawei.com/consumer/cn/doc/service/intents-ai-distribution-characteristic-0000001901922213#section2656133582215) | `"MusicDomain"`, `"WeatherDomain"` |
| `intentVersion` | string | 语义化版本，匹配标准意图的条件之一，默认填写1.0.1 | `"1.0.1"` |
| `displayName` | string | 中文显示名称 | `"播放歌曲卡片"` |
| `formName` | string | FormExtensionAbility绑定的卡片名称 | `"widget"` |


### @InsightIntentForm 可选字段

| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `displayDescription` | string | 详细描述 | `"添加音乐播放卡片到桌面"` |
| `schema` | string | 标准意图schema | `"PlayMusic"` |
| `icon` | ResourceStr | 图标资源 | `$r('app.media.icon')` |
| `llmDescription` | string | LLM理解描述（自定义意图必填） | `"添加指定歌曲的播放卡片..."` |
| `keywords` | string[] | 搜索关键词（自定义意图必填） | `["卡片", "音乐", "widget"]` |
| `parameters` | Record<string, Object> | 意图参数的数据格式声明，用于意图调用时定义入参的数据格式。使用参考[jsonschema_reference.md](./jsonschema_reference.md) | 见下文 |
| `result` | Record<string, Object> | 意图调用返回结果的数据格式声明，用于定义意图调用返回结果的数据格式。使用参考[jsonschema_reference.md](./jsonschema_reference.md) | 见下文 |

### 卡片配置说明

卡片名称（formName）定义的要求参见[卡片配置](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-widget-configuration)。

## 示例详解

### 基础示例（简单卡片）

```typescript
import { formBindingData, FormExtensionAbility } from '@kit.FormKit';
import { Want, InsightIntentForm } from '@kit.AbilityKit';

@InsightIntentForm({
  intentName: 'AddClockWidget',
  domain: 'ToolsDomain',
  intentVersion: '1.0.1',
  displayName: '添加时钟卡片',
  llmDescription: '添加一个时钟显示卡片到桌面',
  keywords: ['时钟', '卡片', 'clock', 'widget'],
  formName: 'clockWidget'
})
export default class ClockFormAbility extends FormExtensionAbility {
  onAddForm(want: Want) {
    let formData = {
      time: new Date().toLocaleTimeString()
    };
    return formBindingData.createFormBindingData(formData);
  }
}
```

### 带参数的卡片示例

```typescript
import { formBindingData, FormExtensionAbility } from '@kit.FormKit';
import { Want, InsightIntentForm } from '@kit.AbilityKit';

@InsightIntentForm({
  intentName: 'PlayMusic',
  domain: 'MusicDomain',
  intentVersion: '1.0.1',
  displayName: '播放歌曲',
  displayDescription: '播放音乐意图',
  llmDescription: '添加指定歌曲的播放卡片',
  keywords: ['音乐播放', '播放歌曲', 'PlayMusic'],
  formName: 'widget',
  parameters: {
    'type': 'object',
    'properties': {
      'songName': {
        'type': 'string',
        'description': '歌曲名称',
        'minLength': 1
      },
      'artist': {
        'type': 'object',
        'description': '歌手信息',
        'properties': {
          'name': {
            'type': 'string',
            'description': '歌手姓名',
            'minLength': 1
          },
          'country': {
            'type': 'string',
            'description': '歌手国籍'
          }
        },
        'required': ['name']
      }
    },
    'required': ['songName']
  }
})
export default class MusicFormAbility extends FormExtensionAbility {
  songName: string = '';

  onAddForm(want: Want) {
    // 从 want.parameters 获取意图参数
    const params = want.parameters;
    if (params?.songName) {
      this.songName = params.songName as string;
    }

    let formData = {
      title: '正在播放',
      songName: this.songName || '未知歌曲',
      isPlaying: true
    };

    return formBindingData.createFormBindingData(formData);
  }

  onUpdateForm(formId: string) {
    // 更新卡片数据
    let formData = {
      updateTime: new Date().toLocaleTimeString()
    };
    formProvider.updateForm(formId, formBindingData.createFormBindingData(formData));
  }
}
```

### 天气卡片示例

```typescript
import { formBindingData, FormExtensionAbility, formProvider } from '@kit.FormKit';
import { Want, InsightIntentForm } from '@kit.AbilityKit';

@InsightIntentForm({
  intentName: 'AddWeatherWidget',
  domain: 'LifeDomain',
  intentVersion: '1.0.0',
  displayName: '添加天气卡片',
  displayDescription: '添加天气显示卡片',
  icon: $r('app.media.weather_icon'),
  llmDescription: '添加指定城市的天气显示卡片',
  keywords: ['天气', '卡片', 'weather', 'widget'],
  formName: 'weatherWidget',
  parameters: {
    'type': 'object',
    'properties': {
      'city': {
        'type': 'string',
        'description': '城市名称',
        'minLength': 1
      }
    },
    'required': ['city']
  }
})
export default class WeatherFormAbility extends FormExtensionAbility {
  city: string = '';

  onAddForm(want: Want) {
    // 获取城市参数
    if (want.parameters?.city) {
      this.city = want.parameters.city as string;
    }

    // 获取天气数据（实际应用中应调用天气API）
    let formData = {
      city: this.city || '北京',
      temperature: '24',
      condition: '晴天',
      humidity: '65%',
      updateTime: new Date().toLocaleTimeString()
    };

    return formBindingData.createFormBindingData(formData);
  }

  onUpdateForm(formId: string) {
    // 定时更新天气数据
    let formData = {
      temperature: '25',
      condition: '多云',
      updateTime: new Date().toLocaleTimeString()
    };
    formProvider.updateForm(formId, formBindingData.createFormBindingData(formData));
  }
}
```

### 多卡片场景示例

```typescript
import { formBindingData, FormExtensionAbility } from '@kit.FormKit';
import { Want, InsightIntentForm } from '@kit.AbilityKit';

// 音乐播放卡片意图
@InsightIntentForm({
  intentName: 'AddMusicPlayerWidget',
  domain: 'MusicDomain',
  intentVersion: '1.0.0',
  displayName: '音乐播放卡片',
  llmDescription: '添加音乐播放控制卡片',
  keywords: ['音乐', '播放器', 'widget'],
  formName: 'musicPlayer'
})
export default class MusicPlayerFormAbility extends FormExtensionAbility {
  onAddForm(want: Want) {
    let formData = {
      songName: '未播放',
      artist: '',
      isPlaying: false,
      progress: 0
    };
    return formBindingData.createFormBindingData(formData);
  }
}
```

## 与其他装饰器的区别

| 特性 | @InsightIntentForm | @InsightIntentEntry | @InsightIntentPage | @InsightIntentLink | @InsightIntentFunctionMethod |
|------|-------------------|---------------------|-------------------|-------------------|------------------------------|
| **用途** | 将卡片定义为意图 | 创建复杂意图执行器 | 将页面定义为意图 | 将URI链接定义为意图 | 将静态函数定义为意图 |
| **装饰对象** | FormExtensionAbility | 类（继承Executor） | struct 页面 | 类 | 静态方法 |
| **基类要求** | FormExtensionAbility | InsightIntentEntryExecutor | 无 | 无 | 无 |
| **UI交互** | 卡片展示 | 支持 | 支持 | 支持（跳转） | 不支持 |
| **核心字段** | formName | abilityName, executeMode | pagePath | uri | - |
| **导出方式** | `export default` | `export default` | struct定义 | `export` | `export` |

## 卡片配置文件示例

### form_config.json

```json
{
  "forms": [
    {
      "name": "widget",
      "displayName": "音乐播放",
      "description": "音乐播放控制卡片",
      "src": "./ets/widget/pages/MusicWidget.ets",
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
      "supportDimensions": ["2*2", "4*2"]
    },
    {
      "name": "weatherWidget",
      "displayName": "天气",
      "description": "天气显示卡片",
      "src": "./ets/widget/pages/WeatherWidget.ets",
      "uiSyntax": "arkts",
      "window": {
        "designWidth": 720,
        "autoDesignWidth": true
      },
      "colorMode": "auto",
      "isDefault": false,
      "updateEnabled": true,
      "scheduledUpdateTime": "07:00",
      "updateDuration": 0,
      "defaultDimension": "2*2",
      "supportDimensions": ["2*2"]
    }
  ]
}
```

### module.json5 配置

```json5
{
  "module": {
    "extensionAbilities": [
      {
        "name": "MusicFormAbility",
        "srcEntry": "./ets/formability/MusicFormAbility.ets",
        "type": "form",
        "label": "$string:form_label",
        "description": "$string:form_desc",
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

## 常见问题

### Q1: formName 与卡片配置的关系？

`formName` 必须与 `form_config.json` 中定义的卡片 `name` 字段完全一致：

```typescript
// form_config.json 中定义
{ "name": "widget", ... }

// 装饰器中使用
@InsightIntentForm({
  formName: 'widget',  // ⬅️ 必须一致
  ...
})
```

### Q2: 如何获取意图参数？

通过 `want.parameters` 获取：

```typescript
onAddForm(want: Want) {
  const songName = want.parameters?.songName as string;
  // 使用参数
}
```

### Q3: 卡片如何更新？

使用 `formProvider.updateForm()` 方法：

```typescript
import { formProvider, formBindingData } from '@kit.FormKit';

onUpdateForm(formId: string) {
  let formData = { ... };
  formProvider.updateForm(formId, formBindingData.createFormBindingData(formData));
}
```

### Q4: 如何注册意图？

在 `insight_intent.json` 中添加：

```json
{
  "insightIntentsSrcEntry": [
    {
      "srcEntry": "./ets/formability/MusicFormAbility.ets"
    }
  ]
}
```

### Q5: 卡片尺寸支持？

在 `form_config.json` 的 `supportDimensions` 中定义支持的尺寸：

- `"2*2"` - 小卡片
- `"2*4"` - 中卡片
- `"4*4"` - 大卡片

### Q6: 标准意图和自定义意图的区别？

- **标准意图**：配置 `schema`和"intentVersion"字段，系统会自动填充标准意图的定义
- **自定义意图**：需要配置 `llmDescription`、`keywords` 等字段

## 相关资源

- [InsightIntentForm API 参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-insightintentdecorator#insightintentform)
- [FormExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-form-formextensionability)
- [卡片配置](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-widget-configuration)
- [ArkTS卡片开发](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-widget-development)
- [formBindingData](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-form-formbindingdata)
