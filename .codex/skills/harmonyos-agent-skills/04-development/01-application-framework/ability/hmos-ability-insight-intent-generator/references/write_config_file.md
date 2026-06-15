# insight_intent.json 配置指南

## 配置文件位置

在模块目录的 `src/main/resources/base/profile/insight_intent.json` 中添加意图文件路径。

## 配置格式

**🔴 关键规则：装饰器模式必须使用 insightIntentsSrcEntry 配置格式！**

本 skill 生成的是使用 `@InsightIntentEntry` 装饰器的意图执行器，**必须**使用以下配置格式：

```json
{
  "insightIntentsSrcEntry": [
    {
      "srcEntry": "./ets/insightintents/StartRecordingIntent.ets"
    }
  ]
}
```

### 配置说明

| 字段 | 说明 |
|------|------|
| `insightIntentsSrcEntry` | 装饰器模式意图配置数组 |
| `srcEntry` | 意图执行器文件的相对路径，从 `ets` 目录开始 |

**路径格式要求：**
- 使用相对路径，以 `./ets/` 开头

## 路径格式对照表

| 格式 | 正确性 | 示例 |
|------|--------|------|
| 相对路径（推荐） | ✅ 正确 | `"./ets/insightintents/StartRecordingIntent.ets"` |
| 绝对路径 | ❌ 错误 | `"entry/src/main/ets/insightintents/StartRecordingIntent.ets"` |


## 配置步骤

### 场景一：文件不存在

直接创建新文件：

```json
{
  "insightIntentsSrcEntry": [
    {
      "srcEntry": "./ets/insightintents/{IntentName}Intent.ets"
    }
  ]
}
```

### 场景二：文件已存在

1. 读取现有配置文件
2. 在 `insightIntentsSrcEntry` 数组中追加新配置
3. **注意**：检查是否已存在相同路径，避免重复添加

```json
{
  "insightIntentsSrcEntry": [
    {
      "srcEntry": "./ets/insightintents/ExistingIntent.ets"
    },
    {
      "srcEntry": "./ets/insightintents/NewIntent.ets"
    }
  ]
}
```

## 常见错误

### 错误1：使用错误的数组格式

```json
// ❌ 错误：装饰器意图使用了 insightIntents 数组格式
{
  "insightIntents": [
    {
      "intentName": "MoveAppIcon",
      "domain": "DesktopDomain",
      "srcEntry": "./ets/intents/executor/MoveAppIconIntentExecutor.ets",
      "uiAbility": { ... }
    }
  ]
}

// ✅ 正确：装饰器意图必须使用 insightIntentsSrcEntry 数组
{
  "insightIntentsSrcEntry": [
    {
      "srcEntry": "./ets/insightintents/StartRecordingIntent.ets"
    }
  ]
}
```

### 错误2：路径格式错误

```json
// ❌ 错误：使用了绝对路径
{
  "insightIntentsSrcEntry": [
    {
      "srcEntry": "entry/src/main/ets/insightintents/StartRecordingIntent.ets"
    }
  ]
}

// ✅ 正确：使用相对路径
{
  "insightIntentsSrcEntry": [
    {
      "srcEntry": "./ets/insightintents/StartRecordingIntent.ets"
    }
  ]
}
```