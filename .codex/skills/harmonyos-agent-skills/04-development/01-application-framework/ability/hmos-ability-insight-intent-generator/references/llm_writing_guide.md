# llmDescription 与 keywords 编写指南

本文档提供 llmDescription 和 keywords 字段的编写规范，帮助提高意图匹配准确率。

---

## llmDescription 编写指南

### 核心原则

| 原则 | 说明 | 示例 |
|------|------|------|
| 用户视角描述 | 描述用户说什么话可以触发意图 | "当用户说'播放歌曲XX'时..." |
| 参数说明清晰 | 明确每个参数的含义和必填性 | "songName参数必填，artistName可选" |
| 包含触发词 | 包含常见的用户表达方式 | "播放歌曲"、"我想听"、"放首歌" |
| 简洁准确 | 避免冗余，突出核心功能 | 控制在100字以内 |

### 编写模板

```
[功能描述]。用户可以通过[参数1]执行该功能[可选：同时指定参数2进行精确匹配]。当用户说"[触发词1]"、"[触发词2]"等表达时调用此意图。[参数1]参数必填，[参数2]可选。
```

### 示例对比

#### 好的示例

```typescript
llmDescription: '播放指定的音乐文件。用户可以通过歌曲名称播放音乐，也可以同时指定歌手名称进行精确匹配。当用户说"播放歌曲XX"、"我想听XX"、"放首歌XX"等表达时调用此意图。songName参数必填，artistName可选。'
```

**优点分析**：
- 功能描述清晰
- 包含多个触发词示例
- 参数必填性明确

#### 不好的示例

```typescript
llmDescription: '播放音乐'  // 过于简短
llmDescription: '这个意图是用来让用户可以播放他们想要听的音乐歌曲，用户只需要说出歌曲名字就可以播放了'  // 冗长、缺少触发词
```

### 常见功能 llmDescription 模板

| 功能类型 | llmDescription 模板 |
|----------|---------------------|
| 播放类 | 播放指定的[媒体类型]。用户可以通过[名称]播放[媒体]。当用户说"播放[媒体]XX"、"我想看/听XX"等表达时调用。[参数]必填。 |
| 查询类 | 查询[查询对象]信息。用户输入[参数]后返回[结果描述]。当用户说"查询XX"、"XX是多少"等表达时调用。 |
| 跳转类 | 跳转到[页面名称]。当用户说"打开XX"、"进入XX"、"去XX页面"等表达时调用。 |
| 设置类 | 修改[设置项]。用户可以[操作描述]。当用户说"设置XX"、"修改XX"、"把XX改成"等表达时调用。 |
| 分享类 | 分享[内容]到[平台]。当用户说"分享XX"、"把XX发到"等表达时调用。 |

---

## keywords 编写指南

### 选择策略

| 策略 | 说明 | 示例 |
|------|------|------|
| 动词+名词组合 | 核心动作词+目标词 | ["播放", "音乐", "歌曲", "听歌"] |
| 常见同义词 | 用户可能使用的替代词 | ["播放", "放歌", "听歌", "播歌"] |
| 英文关键词 | 英文场景触发 | ["PlayMusic", "Play"] |
| 用户常用表达 | 口语化表达 | ["放首歌", "我想听", "来首歌"] |

### 编写规则

1. **每个意图 3-8 个关键词**
2. **避免过于宽泛的词**：如"操作"、"功能"、"东西"
3. **关键词之间不要有包含关系**：如同时有"播放"和"播放音乐"
4. **优先选择高频词**：选择用户最可能使用的词

### 示例对比

#### 好的示例

```typescript
keywords: ['播放', '音乐', '歌曲', '听歌', '放歌', 'PlayMusic']
```

**优点分析**：
- 覆盖核心动词
- 包含同义词
- 包含英文关键词
- 数量适中

#### 不好的示例

```typescript
keywords: ['播放音乐功能']  // 过于具体，用户不会这么说
keywords: ['播放', '播放音乐', '播放歌曲', '音乐播放']  // 冗余，有包含关系
keywords: ['功能', '操作', '服务']  // 过于宽泛
```

### 常见功能 keywords 模板

| 功能类型 | keywords 模板 |
|----------|---------------|
| 音乐播放 | ['播放', '音乐', '歌曲', '听歌', '放歌'] |
| 视频播放 | ['播放', '视频', '看视频', '播放视频'] |
| 天气查询 | ['天气', '气温', '天气预报', '查询天气'] |
| 快递查询 | ['快递', '物流', '查快递', '包裹'] |
| 页面跳转 | ['打开', '进入', '跳转', '页面名'] |
| 设置修改 | ['设置', '修改', '更改', '配置'] |
| 分享转发 | ['分享', '转发', '发送', '共享'] |

---

## Domain 选择指南

### 常用 Domain 对照表

| Domain | 适用功能 | 示例意图 |
|--------|----------|----------|
| MusicDomain | 音乐播放、搜索 | PlayMusic, SearchSong |
| VideoDomain | 视频播放、搜索 | PlayVideo, SearchVideo |
| LifeDomain | 生活服务 | GetWeather, ViewLogistics |
| ShoppingDomain | 购物相关 | OpenProduct, ViewOrder |
| NavigationDomain | 导航相关 | NavigateToLocation |
| ToolsDomain | 通用工具 | Calculate, Translate |
| SystemSettingsDomain | 系统设置 | OpenSettings, ChangeTheme |
| SocialDomain | 社交相关 | ShareContent, SendMessage |
| FinanceDomain | 金融相关 | QueryBalance, Transfer |
| HealthDomain | 健康相关 | RecordExercise, QueryHealth |

### Domain 命名规范

- 格式：`[功能领域]Domain`
- 示例：`MusicDomain`, `VideoDomain`, `LifeDomain`
- 使用 PascalCase 驼峰命名
- 语义清晰，便于归类

---

## 完整示例

### 示例1：播放音乐意图

```typescript
@InsightIntentEntry({
  intentName: 'PlayMusic',
  domain: 'MusicDomain',
  intentVersion: '1.0.1',
  displayName: '播放歌曲',
  displayDescription: '播放指定的音乐，支持通过歌曲名称和歌手名称精确匹配',
  llmDescription: '播放指定的音乐文件。用户可以通过歌曲名称播放音乐，也可以同时指定歌手名称进行精确匹配。当用户说"播放歌曲XX"、"我想听XX"、"放首歌XX"等表达时调用此意图。songName参数必填，artistName可选。',
  keywords: ['播放', '音乐', '歌曲', '听歌', '放歌', 'PlayMusic'],
  // ... 其他配置
})
```

### 示例2：查询天气意图

```typescript
@InsightIntentEntry({
  intentName: 'QueryWeather',
  domain: 'LifeDomain',
  intentVersion: '1.0.1',
  displayName: '查询天气',
  displayDescription: '查询指定城市的天气信息',
  llmDescription: '查询指定城市的天气信息。用户输入城市名称后返回该城市的天气情况，包括温度、天气状况等。当用户说"查询天气"、"XX天气怎么样"、"今天天气"等表达时调用此意图。city参数必填。',
  keywords: ['天气', '气温', '天气预报', '查询天气', 'Weather'],
  // ... 其他配置
})
```

### 示例3：查看快递意图

```typescript
@InsightIntentEntry({
  intentName: 'ViewLogistics',
  schema: 'ViewLogistics',  // 标准意图
  domain: 'LifeDomain',
  intentVersion: '1.0.1',
  displayName: '查看快递',
  displayDescription: '查看快递物流状态',
  llmDescription: '查看快递物流状态。用户输入快递单号后返回快递的当前状态和物流轨迹。当用户说"查快递"、"快递到哪了"、"物流信息"等表达时调用此意图。trackingNo参数必填。',
  keywords: ['快递', '物流', '查快递', '包裹', 'ViewLogistics'],
  // ... 其他配置
})
```

---

## 检查清单

生成意图代码后，请对照以下清单验证：

- [ ] llmDescription 包含功能描述
- [ ] llmDescription 包含触发词示例
- [ ] llmDescription 说明参数必填性
- [ ] keywords 数量在 3-8 个
- [ ] keywords 不包含宽泛词
- [ ] keywords 无重复或包含关系
- [ ] domain 符合功能领域
- [ ] displayName 简洁明了

---

## 相关文档

- [@InsightIntentEntry装饰器使用规则](insight_intent_entry.md)