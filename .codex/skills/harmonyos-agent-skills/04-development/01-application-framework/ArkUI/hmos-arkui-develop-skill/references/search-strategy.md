# 检索决策策略

## 核心原则

> **先设计方案，再查不确定的。** 不在设计之前检索——你不知道要查什么。

方案设计完成后，对方案中用到的每个 API，按以下两级策略处理：

## 基础 → 查速查表

**条件**：`references/quick-apis/` 中有该组件的完整卡片（覆盖 178+ 组件，17 个分类）。

**动作**：读对应分类文件（布局→`01-layout.md`、基础组件→`02-basic-components.md` 等，完整列表见 `_index.md`），找到组件卡片，直接使用其中的构造签名、参数表、属性和事件。

**不需要额外检索的场景**：
- quick-apis 卡片中包含所需参数和签名
- 基础布局（Column/Row/Stack/Flex/Scroll）
- 基础组件（Text/Button/Image/List/Grid）
- V1 基础状态装饰器（@State/@Prop/@Link）
- 已验证的 sys.symbol / sys.color 名称

## 复杂 → 调检索工具

**条件**（任一命中即走此路径）：

| 场景 | 说明 |
|------|------|
| quick-apis 中无该组件 | 表未覆盖的组件 |
| 卡片信息不足 | 缺少所需参数、事件、版本信息 |
| V2 装饰器 | @Local/@Param/@Provider/@Consumer/@Monitor/@Computed/@ObservedV2/@Trace |
| V2 组件机制 | @ComponentV2、@ReusableV2、V2 生命周期 |
| 导航架构 | Navigation、NavDestination、NavPathStack |
| 懒加载 | LazyForEach、IDataSource、Repeat |
| 复杂交互 | bindSheet、CustomDialog、手势组合、transition |
| 废弃 API 替换 | 必须查文档确认替代方案 |
| 回调参数类型不确定 | AI 容易猜错（如 Video.onUpdate 参数是 PlaybackInfo 对象） |
| 版本兼容性 | 需要确认 API 最低版本 |

**动作**：调用 `harmonyos_knowledge_search` MCP 查询官方文档。

```
harmonyos_knowledge_search(keywords: ['组件名 具体问题'])
→ 返回准确的官方 API 签名和示例代码
```

检索结果可信度判断：
1. 文档标注了 "从 API version X 开始支持" → 高可信
2. 文档标注了 "从 API version X 开始废弃" → 必须遵循
3. 无版本标注 → 视为不确定，额外确认
