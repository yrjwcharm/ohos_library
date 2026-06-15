# 实况窗胶囊形态

## 基本概念

实况窗胶囊是小折叠屏外屏的简要信息展示。在 `liveViewManager.LiveView` 中添加 `capsule` 参数即可同步创建胶囊。

## 胶囊类型

| 类型 | 说明 | 适用场景 |
|------|------|----------|
| `CAPSULE_TYPE_TEXT` | 纯文本胶囊 | 航班、高铁状态 |
| `CAPSULE_TYPE_ICON` | 图标胶囊 | 配送服务 |
| `CAPSULE_TYPE_MIXED` | 混合胶囊 | 综合状态展示 |

## 示例代码

```typescript
capsule: {
  type: liveViewManager.CapsuleType.CAPSULE_TYPE_TEXT,
  status: 1,
  icon: 'capsule_train.png',
  backgroundColor: '#FF308977',
  title: '航班进行中'
}
```

## 配置项说明

| 配置项 | 类型 | 说明 |
|--------|------|------|
| `type` | CapsuleType | 胶囊类型 |
| `status` | number | 状态码，开发者自定义 |
| `icon` | string | 图标路径 |
| `backgroundColor` | string | 背景色，如 `#FF308977` |
| `title` | string | 显示标题 |

## 适用场景

- 航班状态展示
- 高铁状态展示
- 赛事直播状态
- 配送服务状态
