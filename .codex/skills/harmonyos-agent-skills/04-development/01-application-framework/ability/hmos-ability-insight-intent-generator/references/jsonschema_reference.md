# JsonSchema 参数定义参考

## ⚠️ 重要：类型限制

**OpenHarmony 意图装饰器的 JSON Schema 只支持以下类型：**

| JSON Schema 类型 | ArkTS 对应类型 | 说明 |
|-----------------|---------------|------|
| `string` | string | 字符串 |
| `number` | number | 数字（**整数和浮点数都使用 number，不支持 integer**） |
| `boolean` | boolean | 布尔值 |
| `array` | Array | 数组 |
| `object` | Object | 对象 |

> **错误示例**：`'type': 'integer'` ❌ 编译会报错：`The field type of the class property does not match the JSON Schema`
> 
> **正确示例**：`'type': 'number'` ✅

## 基本类型

### 字符串 (string)

```typescript
{
  'type': 'string',
  'description': '歌曲名称',
  'minLength': 1,
  'maxLength': 100
}
```

### 数字 (number)

```typescript
{
  'type': 'number',
  'description': '音量大小',
  'minimum': 0,
  'maximum': 100
}
```

### 布尔值 (boolean)

```typescript
{
  'type': 'boolean',
  'description': '是否循环播放'
}
```

### 数组 (array)

```typescript
{
  'type': 'array',
  'description': '歌曲ID列表',
  'items': {
    'type': 'string'
  },
  'minItems': 1,
  'maxItems': 10
}
```

### 枚举 (enum)

```typescript
{
  'type': 'string',
  'description': '播放模式',
  'enum': ['auto', 'repeat', 'random']
}
```

## 对象类型

### 简单对象

```typescript
{
  'type': 'object',
  'description': '歌曲信息',
  'properties': {
    'id': {
      'type': 'number',
      'description': '歌曲ID'
    },
    'name': {
      'type': 'string',
      'description': '歌曲名称'
    },
    'artist': {
      'type': 'string',
      'description': '歌手'
    }
  },
  'required': ['id', 'name']
}
```

### 嵌套对象

```typescript
{
  'type': 'object',
  'properties': {
    'song': {
      'type': 'object',
      'description': '歌曲信息',
      'properties': {
        'name': { 'type': 'string' },
        'artist': {
          'type': 'object',
          'description': '歌手信息',
          'properties': {
            'name': { 'type': 'string' },
            'country': { 'type': 'string' }
          },
          'required': ['name']
        }
      },
      'required': ['name']
    }
  },
  'required': ['song']
}
```

## 参数定义模板

### 无参数

```typescript
// 不需要 parameters 字段
@InsightIntentEntry({
  intentName: 'PausePlayback',
  // ...
  // 不写 parameters
})
```

### 单参数

```typescript
parameters: {
  'type': 'object',
  'properties': {
    'query': {
      'type': 'string',
      'description': '搜索关键词',
      'minLength': 1
    }
  },
  'required': ['query']
}
```

### 多参数

```typescript
parameters: {
  'type': 'object',
  'properties': {
    'songName': {
      'type': 'string',
      'description': '歌曲名称',
      'minLength': 1
    },
    'artistName': {
      'type': 'string',
      'description': '歌手名称'
    },
    'album': {
      'type': 'string',
      'description': '专辑名称'
    }
  },
  'required': ['songName']
}
```

### 数组参数

```typescript
parameters: {
  'type': 'object',
  'properties': {
    'songIds': {
      'type': 'array',
      'description': '歌曲ID列表',
      'items': {
        'type': 'number'
      },
      'minItems': 1
    }
  },
  'required': ['songIds']
}
```

### 枚举参数

```typescript
parameters: {
  'type': 'object',
  'properties': {
    'playMode': {
      'type': 'string',
      'description': '播放模式',
      'enum': ['auto', 'repeat', 'random'],
      'default': 'auto'
    }
  }
}
```

## 返回值定义 (result)

```typescript
result: {
  'type': 'object',
  'properties': {
    'success': {
      'type': 'boolean',
      'description': '操作是否成功'
    },
    'message': {
      'type': 'string',
      'description': '结果消息'
    },
    'data': {
      'type': 'object',
      'description': '返回数据',
      'properties': {
        'songCount': { 'type': 'number' },
        'songs': {
          'type': 'array',
          'items': {
            'type': 'object',
            'properties': {
              'id': { 'type': 'number' },
              'name': { 'type': 'string' }
            }
          }
        }
      }
    }
  }
}
```

## 注意事项

1. **使用单引号**：JsonSchema 定义中使用单引号包裹属性名
2. **类型限制**：只支持 `string`、`number`、`boolean`、`array`、`object`，**不支持 `integer`、`null` 等类型**
3. **required 数组**：明确指定必填字段
4. **description**：每个字段都应包含描述，便于 LLM 理解
5. **default**：可选字段可以提供默认值