# 小折叠外屏实况窗

## 基本概念

外屏实况窗适用于小折叠屏外屏显示简要信息。在 `liveViewManager.LiveView` 中携带 `liveViewData.external` 参数。

## 外屏类型

| 类型 | 说明 | 适用场景 |
|------|------|----------|
| `BACKGROUND_PICTURE` | 图片背景 | 航班、高铁 |
| `BACKGROUND_COLOR` | 纯色背景 | 通用场景 |
| `BACKGROUND_BLUR` | 模糊背景 | 赛事等 |

## 示例代码

```typescript
external: {
  title: "已值机",
  content: [
    { text: '登机口' },
    { text: '27\n', textColor: '#FFFF9C4F' },
    { text: '17:45', textColor: '#FFFF9C4F' },
    { text: '开始登机' }
  ],
  type: liveViewManager.ExternalType.BACKGROUND_PICTURE,
  backgroundPicture: 'airplane.png'
}
```

## 配置项说明

| 配置项 | 类型 | 说明 |
|--------|------|------|
| `title` | string | 外屏标题 |
| `content` | Array | 外屏内容，支持多行文本和颜色 |
| `type` | ExternalType | 背景样式类型 |
| `backgroundPicture` | string | 背景图片路径 |

## 布局效果

```
┌─────────────────────┐
│   已值机            │
│   登机口            │
│   27                │
│   17:45             │
│   开始登机          │
└─────────────────────┘
   小折叠外屏展示
```
