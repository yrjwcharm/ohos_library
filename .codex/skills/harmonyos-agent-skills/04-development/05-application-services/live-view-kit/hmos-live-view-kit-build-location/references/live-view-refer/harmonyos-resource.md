# 调用 HarmonyOS Resource 资源

## 概述

HarmonyOS 应用资源统一存放在 `resources` 目录下，通过 `$r()` 语法可以在 ArkTS/ArkUI 代码中引用这些资源。资源分为多种类型：字符串资源、图片资源、颜色资源等。

## 资源目录结构

```
resources/
├── base/
│   ├── element/
│   │   ├── string.json     # 字符串资源
│   │   └── color.json      # 颜色资源
│   └── media/
│       ├── icon.png        # 图片资源
│       └── background.png   # 图片资源
├── en_US/
│   └── element/
│       └── string.json     # 英文国际化字符串
└── zh_CN/
    └── element/
        └── string.json     # 中文国际化字符串
```

## $r() 语法

`$r()` 是 HarmonyOS 中引用资源的专用语法，格式为：

```typescript
$r("app.资源类型.资源名称")
```

### 资源类型前缀

| 前缀 | 说明 | 示例 |
|------|------|------|
| `app.` | 应用资源 | `$r("app.string.xxx")` |
| `sys.` | 系统资源 | `$r("sys.color.ohos_id_color_warning")` |

## 字符串资源调用

### 在 ArkUI 组件中直接使用

```typescript
// 字符串资源直接作为组件属性值
Text($r("app.string.Delivery_submit"))
Button($r("app.string.Delivery_update"))
Image($r("app.media.delivery_4x"))
```

### 在 ArkTS 逻辑代码中异步获取

```typescript
import { resourceManager } from '@kit.LocalizationKit';

// 获取 ResourceManager 实例
const context = getContext(this);
const resourceMgr = context.resourceManager;

// 异步获取字符串
async function getString(): Promise<string> {
    const value = await resourceMgr.getStringValue($r("app.string.Delivery_title"));
    return value;
}

// 在类中使用
export class DeliveryController {
    private resourceManager: resourceManager.ResourceManager;

    constructor(context: Context) {
        this.resourceManager = context.resourceManager;
    }

    public async getTitle(): Promise<string> {
        return await this.resourceManager.getStringValue(
            $r("app.string.Delivery_default_primary_title")
        );
    }
}
```

### 多文本片段组合

实况窗内容支持带颜色的多文本片段：

```typescript
content: [
    { text: "距商家 " },                              // 默认黑色
    { text: "300 ", textColor: "#FF0A59F7" },        // 强调色
    { text: "米 | " },                               // 默认黑色
    { text: "3 ", textColor: "#FF0A59F7" },          // 强调色
    { text: "分钟到店" }                             // 默认黑色
]
```

## 图片资源调用

### 在 ArkUI 组件中使用

```typescript
// 普通图片
Image($r("app.media.icon"))

// 设置图片重复样式
Image($r("app.media.background"))
    .objectFit(ImageFit.Contain)
    .width('100%')
    .height('100%')

// 背景图片
.backgroundImage($r("app.media.taxi"), ImageRepeat.NoRepeat)
.backgroundImageSize(ImageSize.Contain)
```

### 注意事项

- 图片文件放在 `resources/base/media/` 目录下
- 引用时使用 `app.media.文件名`（不含扩展名）
- 同一目录下不应有重名文件（忽略扩展名后）

## 颜色资源调用

### 定义颜色资源

```json
// resources/base/element/color.json
{
    "color": [
        {
            "name": "primary_color",
            "value": "#FF0A59F7"
        },
        {
            "name": "capsule_color",
            "value": "#FF308977"
        }
    ]
}
```

### 使用颜色资源

```typescript
// 在样式中使用颜色资源
Text("标题")
    .fontColor($r("app.color.primary_color"))
    .backgroundColor($r("app.color.capsule_color"))

// 字符串中引用颜色值
.content = [
    { text: "300", textColor: $r("app.color.primary_color") }
]
```

## 资源文件示例

### string.json 示例

```json
// resources/base/element/string.json
{
    "string": [
        {
            "name": "module_desc",
            "value": "module description"
        },
        {
            "name": "EntryAbility_label",
            "value": "Live Notification Experience"
        },
        {
            "name": "Delivery_submit",
            "value": "Submitting an Order"
        },
        {
            "name": "Delivery_update",
            "value": "Update Progress"
        },
        {
            "name": "Delivery_stop",
            "value": "End Order"
        },
        {
            "name": "Delivery_default_primary_title",
            "value": "Pay now, expected delivery at 23:49"
        }
    ]
}
```

## 国际化资源

### 目录结构

```
resources/
├── base/
│   └── element/
│       └── string.json         # 默认语言（中文）
├── en_US/
│   └── element/
│       └── string.json         # 英文
└── zh_CN/
    └── element/
        └── string.json         # 中文
```

### 使用方式

国际化资源使用方式与默认资源完全相同：

```typescript
// 根据系统语言自动选择对应资源
Text($r("app.string.Delivery_title"))  // 自动匹配 zh_CN 或 en_US
```

## 完整示例：实况窗控制器

```typescript
import { liveViewManager } from '@kit.LiveViewKit';
import { resourceManager } from '@kit.LocalizationKit';

export class LiveViewController {
    private resourceManager: resourceManager.ResourceManager;

    constructor(context: Context) {
        this.resourceManager = context.resourceManager;
    }

    // 构建实况窗视图
    public async buildDefaultView(): Promise<liveViewManager.LiveView> {
        // 异步获取字符串资源
        const title = await this.resourceManager.getStringValue(
            $r("app.string.Delivery_default_primary_title")
        );
        const content1 = await this.resourceManager.getStringValue(
            $r("app.string.Delivery_default_primary_content1")
        );

        return {
            id: 0,
            event: "DELIVERY",
            liveViewData: {
                primary: {
                    title: title,
                    content: [
                        { text: content1 }
                    ],
                    keepTime: 15,
                    clickAction: await this.buildWantAgent(),
                    layoutData: {
                        layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_PROGRESS,
                        progress: 40,
                        color: "#FF317AF7",
                        indicatorType: liveViewManager.IndicatorType.INDICATOR_TYPE_UP,
                        indicatorIcon: "indicator.png",
                        lineType: liveViewManager.LineType.LINE_TYPE_DOTTED_LINE,
                        nodeIcons: ["icon_1.png", "icon_2.png", "icon_3.png"]
                    }
                },
                capsule: {
                    type: liveViewManager.CapsuleType.CAPSULE_TYPE_TEXT,
                    icon: "capsule_left.png",
                    backgroundColor: "#FF308977",
                    title: "Processing"
                }
            }
        };
    }
}
```

## 常见问题

| 问题 | 解决方案 |
|------|----------|
| 资源引用报错 | 检查资源文件是否在正确目录，名称是否匹配 |
| 国际化不生效 | 确认 `resources` 目录下有对应语言的文件夹（如 `en_US`） |
| 图片不显示 | 确认图片在 `resources/base/media/` 目录下，引用时不带扩展名 |
| 字符串资源获取失败 | 确保使用 `getContext(this).resourceManager` 获取正确的 ResourceManager |

## 最佳实践

1. **统一命名规范**：资源名称使用小写下划线格式（如 `delivery_submit`）
2. **按模块分组**：复杂应用按功能模块拆分 string.json 文件
3. **避免硬编码字符串**：UI 显示文本应统一使用资源引用
4. **考虑国际化**：所有用户可见文本都应在 string.json 中定义
5. **资源按需加载**：图片资源按使用场景放在不同目录

---

*文档版本：1.0*  
*最后更新：2026-05-15*