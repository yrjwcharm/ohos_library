# 多设备资源文件

> 来源：[多设备资源文件 - 多设备界面开发 - 一次开发，多端部署](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-multi-device-resource)

## 目录

1. [概述](#概述)
2. [应用资源](#应用资源)
3. [系统资源](#系统资源)
4. [开发实践](#开发实践)

---

## 概述

在页面开发过程中，经常需要用到颜色、字体、间距、图片等资源，在不同的设备或配置中，这些资源的值可能不同。有两种方式处理：

| 方式 | 说明 |
|------|------|
| **应用资源** | 借助资源文件能力，开发者在应用中自定义资源，自行管理这些资源在不同的设备或配置中的表现 |
| **系统资源** | 开发者直接使用系统预置的资源定义（即分层参数） |

---

## 应用资源

### 资源文件目录结构

应用开发中使用的各类自定义资源文件，需要统一存放于应用的 `resources` 目录下。目录结构如下：

```
└── entry/src/main/resources            // 资源区
   ├── base                             // 默认存在的目录
   │  ├── element
   │  │  ├── color.json                 // 颜色资源
   │  │  ├── float.json                 // 数字资源
   │  │  └── string.json                // 字符串资源
   │  ├── media                         // 媒体资源
   │  └── profile                       // 路由资源
   ├── en_US                            // 限定词目录示例，需要开发者自行创建
   ├── zh_CN                            // 限定词目录示例，需要开发者自行创建
   └── rawfile                          // 原始文件目录
```

### 资源匹配规则

1. **base 目录**：默认存在，存放默认资源值
2. **限定词目录**：需要开发者自行创建，名称由一个或多个表征应用场景或设备特征的限定词组合而成
3. **rawfile**：原始文件目录，不会根据设备状态匹配不同资源

**资源查找优先级**：

```
系统根据当前设备状态
  → 优先从匹配的限定词目录中查找
    → 找不到时回退到 base 目录
```

> **强烈建议**：对于所有应用自定义资源都在 base 目录中定义默认值，防止出现找不到资源值的异常场景。

### 资源组目录

| 资源组目录 | 目录说明 | 资源文件 |
|-----------|---------|---------|
| element | 元素资源，采用 JSON 文件表征：boolean、color、float、intarray、integer、pattern、plural、strarray、string | boolean.json、color.json、float.json、intarray.json、integer.json、pattern.json、plural.json、strarray.json、string.json |
| media | 媒体资源，包括图片、音频、视频等非文本格式文件 | 文件名可自定义，如 icon.png |

### 资源定义格式

在 element 目录中，以 "name-value" 形式定义资源：

```json
// color.json
{
    "color": [
        {
            "name": "color_red",
            "value": "#FFFF0000"
        },
        {
            "name": "color_blue",
            "value": "#FF0000FF"
        }
    ]
}
```

在 media 目录中，直接以文件名作为 name，放入即可，无需额外定义。

### 访问应用资源

在工程中，通过 `$r('app.type.name')` 的形式引用应用资源：

- `app`：应用内 resources 目录中定义的资源
- `type`：资源类型（color、float、string、plural、media）
- `name`：资源命名，由开发者添加资源时确定

### 完整示例

在 resources 目录下创建名为 `tablet` 的限定词子目录，分别在不同目录中定义差异化资源：

| 资源名称 | 资源类型 | base 目录中资源值 | 限定词目录（tablet）中资源值 |
|---------|---------|-----------------|---------------------------|
| my_string | string | default | tablet |
| my_color | color | #ff0000 | #0000ff |
| my_float | float | 60vp | 80vp |
| my_image | media | my_image.png（太阳图标） | my_image.png（月亮图标） |

代码中使用：

```typescript
@Entry
@Component
struct ResourceQualifier {
  build() {
    Column() {
      Text($r('app.string.my_string'))
        .fontSize(60)
        .fontColor($r('app.color.my_color'))
      Image($r('app.media.my_image'))
        .width(100)
        .height(100)
    }
    .height('100%')
    .width('100%')
    .alignItems(HorizontalAlign.Center)
    .justifyContent(FlexAlign.Center)
  }
}
```

同一资源在不同设备上自动取不同值，无需在代码中做设备判断。

---

## 系统资源

### 分层参数

除了自定义资源，开发者也可以使用系统中预定义的资源（即分层参数）。

**分层参数特点**：同一资源 ID 在设备类型、深浅色等不同配置下有不同的取值。

### 访问系统资源

通过 `$r('sys.type.resource_id')` 的形式引用系统资源：

- `sys`：系统资源
- `type`：资源类型（color、float、string、media）
- `resource_id`：资源 ID

### 使用建议

- 仅声明式开发范式支持使用分层参数，类 Web 开发范式不支持
- 系统资源可以保证不同团队开发出的应用有较为一致的视觉风格
- 对于系统预置应用，**强烈建议使用系统资源**
- 对于三方应用，可以根据需要选择使用系统资源或自定义应用资源

---

## 开发实践

### 多设备资源适配要点

1. **始终在 base 目录定义默认值**：确保任何设备都能找到资源，避免运行时异常
2. **按需创建限定词目录**：只对需要差异化处理的资源创建限定词目录
3. **优先使用系统资源**：系统资源自动适配深浅色和不同设备，减少自定义工作量
4. **资源类型规范命名**：element 目录下的文件名建议保持与标准文件名一致（color.json、float.json 等）

### 资源引用方式对照

| 引用方式 | 格式 | 适用场景 |
|---------|------|---------|
| 应用资源 | `$r('app.type.name')` | 自定义颜色、字体、间距、图片等 |
| 系统资源 | `$r('sys.type.resource_id')` | 使用系统预置样式，保证视觉一致性 |

### 限定词目录命名

限定词目录名称可由多个限定词组合而成，用于匹配设备状态（如屏幕尺寸、方向、深浅色等）。具体的限定词命名规则、创建流程和匹配规则请参考官方文档中的"限定词目录"章节。
