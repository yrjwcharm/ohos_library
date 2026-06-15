---
name: knowledge_search
description: "HarmonyOS 知识搜索能力。通过 MCP 工具 harmonyos_knowledge_search（按后缀匹配）搜索鸿蒙官方文档和知识库。Use when: (1) 用户对鸿蒙问题进行提问，(2) 现有知识不足以支撑 HarmonyOS 功能开发，(3) 需要查询最新的 API 文档或最佳实践，(4) 遇到未知错误或问题需要查找解决方案。Triggers: 搜索、查询、文档、API文档、官方文档、不知道、不了解、怎么用、如何实现、帮助文档。"
user-invocable: false
---

# HarmonyOS 知识搜索 (knowledge_search)

HarmonyOS 官方知识库搜索 Skill，通过 MCP 工具搜索文档，补充和验证开发知识。

## 职责

1. **知识搜索**：调用 `harmonyos_knowledge_search`（按后缀从可用工具列表匹配）搜索官方文档
2. **知识补充**：为其他 skill 提供知识补充支持
3. **问题排查**：帮助查找错误原因和解决方案
4. **API 验证**：验证 API 用法、参数、版本兼容性

## 核心能力

### MCP 工具依赖

| 工具名称 | 用途 | 状态 |
|---------|------|------|
| `harmonyos_knowledge_search`（后缀匹配） | 搜索 HarmonyOS 官方文档和知识库 | 必需 |

### 知识搜索流程

```
knowledge_search (搜索 + 补充)
       │
       ├─→ 用户提问
       │     │
       │     ├─→ 分析问题类型
       │     │     ├─→ API 查询 → 精确搜索
       │     │     ├─→ 错误排查 → 错误信息搜索
       │     │     └─→ 概念问题 → 场景搜索
       │     │
       │     ├─→ 构建搜索查询
       │     │
       │     └─→ 调用 MCP 工具
       │            │
       │            ├─→ 解析搜索结果
       │            └─→ 提取关键信息
       │
       └─→ 返回知识 → 验证/补充 → 回答用户
```

### 搜索类型分类

| 类型 | 场景 | 查询构建策略 |
|------|------|-------------|
| **API 查询** | 查询具体 API 用法 | 使用完整 API 名称：`@ohos.net.http` |
| **错误排查** | 编译/运行时错误 | 使用完整错误信息 |
| **概念搜索** | 功能实现、最佳实践 | 场景 + 组件 + 关键词 |
| **版本查询** | API 版本兼容性 | API + 版本号 |
| **示例搜索** | 需要代码示例 | 功能 + 示例/sample |

## 工作流程

### 流程图

```
开始
  │
  ├─→ 步骤0: 检查 MCP 工具可用性
  │     ├─→ harmonyos_knowledge_search 可用 → 继续
  │     └─→ 工具不可用 → 提示手动查阅文档 → 终止
  │
  ├─→ 步骤1: 分析问题类型
  │     ├─→ API 查询 → 步骤2A
  │     ├─→ 错误排查 → 步骤2B
  │     ├─→ 概念搜索 → 步骤2C
  │     └─→ 综合问题 → 步骤2D
  │
  ├─→ 步骤2: 构建搜索查询
  │     ├─→ 2A: API 查询 → 提取 API 名称、模块名
  │     ├─→ 2B: 错误排查 → 提取错误码、错误信息
  │     ├─→ 2C: 概念搜索 → 提取关键词、场景描述
  │     └─→ 2D: 综合问题 → 拆分为多个子查询
  │
  ├─→ 步骤3: 执行搜索
  │     └─→ 调用 harmonyos_knowledge_search
  │
  ├─→ 步骤4: 解析搜索结果
  │     ├─→ 提取文档链接
  │     ├─→ 提取 API 参考
  │     ├─→ 提取示例代码
  │     └─→ 提取最佳实践
  │
  ├─→ 步骤5: 验证结果
  │     ├─→ 结果相关 → 步骤6
  │     └─→ 结果不相关 → 调整查询 → 步骤3
  │
  └─→ 步骤6: 输出知识
        └─→ 完成
```

### 详细步骤

#### 0. 检查 MCP 工具可用性

**验证方法**：尝试调用 `harmonyos_knowledge_search`（按后缀从可用工具列表匹配）检查工具是否可用。

**如果工具不可用**，提示用户：

```
❌ MCP 知识搜索工具未安装或不可用

本 Skill 需要 DevEco MCP Server 的知识搜索工具才能正常工作。

📚 请手动查阅官方文档：
- HarmonyOS 开发文档: https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/
- ArkTS API 参考: https://developer.huawei.com/consumer/cn/doc/harmonyos-references/

📦 安装方式：

在 MCP 配置文件中添加：
{
  "mcpServers": {
    "deveco-mcp": {
      "command": "npx",
      "args": ["-y", "deveco-mcp-server"],
      "env": {
        "PROJECT_PATH": "${workspaceFolder}",
        "DEVECO_PATH": "path to deveco studio"
      }
    }
  }
}
```

#### 1. 分析问题类型

根据用户问题判断搜索类型：

| 问题特征 | 问题类型 | 处理方式 |
|---------|---------|---------|
| 包含 `@ohos.`、具体 API 名 | API 查询 | 提取完整 API 路径 |
| 包含 `ERROR`、`Cannot`、`Failed` | 错误排查 | 提取错误信息 |
| 包含 `怎么`、`如何`、`实现` | 概念搜索 | 提取场景关键词 |
| 包含 `版本`、`兼容`、`deprecated` | 版本查询 | 提取 API + 版本号 |
| 多个问题混合 | 综合问题 | 拆分子查询 |

#### 2. 构建搜索查询

**2A. API 查询**

```
原始问题: @ohos.router 怎么传参？

查询构建:
1. 提取 API: @ohos.router
2. 提取功能: 参数传递
3. 组合查询: "@ohos.router pushUrl parameters params"
```

**2B. 错误排查**

```
原始问题: 编译报错 "Cannot find name 'http'"

查询构建:
1. 提取错误类型: Cannot find name
2. 提取错误对象: http
3. 添加上下文: import @ohos.net.http
4. 组合查询: "ArkTS Cannot find name http import @ohos.net.http"
```

**2C. 概念搜索**

```
原始问题: List 列表性能优化怎么做？

查询构建:
1. 提取组件: List
2. 提取场景: 性能优化
3. 添加关键词: 懒加载、最佳实践
4. 组合查询: "ArkUI List 懒加载 性能优化 最佳实践"
```

**2D. 综合问题**

```
原始问题: 如何实现带下拉刷新的列表，并且支持分页加载？

查询拆分:
1. 子查询1: "ArkUI List 下拉刷新 Refresh"
2. 子查询2: "ArkUI List 分页加载 懒加载"
3. 合并结果
```

#### 3. 执行搜索

调用 MCP 工具：

```
harmonyos_knowledge_search（按后缀从可用工具列表匹配）
参数:
  - query: 构建的搜索查询字符串
```

#### 4. 解析搜索结果

从搜索结果中提取：

| 信息类型 | 用途 |
|---------|------|
| 官方文档链接 | 深入阅读 |
| API 参考 | 参数、返回值、版本 |
| 示例代码 | 实现参考 |
| 最佳实践 | 推荐做法 |
| 注意事项 | 避坑指南 |

#### 5. 验证结果

判断搜索结果是否相关：

1. **API 名称匹配**：结果中的 API 是否与查询一致
2. **版本兼容**：API 版本是否符合项目要求
3. **场景匹配**：示例场景是否与问题场景一致

**如果结果不相关**：
- 调整查询关键词
- 增加或减少限定词
- 重新搜索

#### 6. 输出知识

整合搜索结果，输出结构化知识：

```markdown
## 搜索结果

### 官方文档
- [文档标题](链接)

### API 参考
| 参数 | 类型 | 说明 |
|------|------|------|
| ... | ... | ... |

### 示例代码
```typescript
// 示例代码
```

### 最佳实践
1. ...
2. ...

### 注意事项
- ...
```

## 查询构建最佳实践

### 精确查询优先

```
✅ 推荐                          ❌ 不推荐
"@ohos.router.pushUrl"          "页面跳转"
"ArkTS ERROR Cannot find name"  "找不到"
"List LazyForEach 懒加载"       "列表优化"
```

### 查询结构模板

| 场景 | 查询模板 | 示例 |
|------|---------|------|
| API 用法 | `{API路径} {功能关键词}` | `@ohos.net.http request POST` |
| 错误排查 | `ArkTS {错误类型} {错误对象} {上下文}` | `ArkTS Cannot find name http import` |
| 组件用法 | `ArkUI {组件名} {功能} {场景}` | `ArkUI List 懒加载 大数据` |
| 最佳实践 | `{功能} 最佳实践 {版本}` | `网络请求 最佳实践 API 12` |
| 版本兼容 | `{API} version {版本号}` | `@ohos.router version 12` |

### 多轮搜索策略

当单次搜索结果不理想时：

```
第1轮: 精确查询 → "@ohos.router.pushUrl"
       ↓ 结果不足
第2轮: 扩展查询 → "@ohos.router 页面路由 参数传递"
       ↓ 结果不足
第3轮: 场景查询 → "HarmonyOS 页面跳转传参 示例"
```

## 输入

| 名称 | 类型 | 必选 | 默认值 | 说明 |
|------|------|------|--------|------|
| `query` | string | 是 | - | 搜索关键词或问题 |
| `context` | string | 否 | - | 额外上下文（项目版本、已尝试方案等） |
| `searchType` | string | 否 | `auto` | 搜索类型：`api`、`error`、`concept`、`auto` |

## 输出

### 成功

```markdown
## 知识搜索结果

### 搜索信息
- 查询: "@ohos.router pushUrl parameters"
- 类型: API 查询
- 结果数: 5

### 相关文档
1. [页面路由 - Router](https://developer.huawei.com/...)
2. [Router 参数传递指南](https://developer.huawei.com/...)

### API 参考

**pushUrl(options: RouterOptions): void**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| url | string | 是 | 目标页面路径 |
| params | Object | 否 | 传递的参数 |

### 示例代码
```typescript
import router from '@ohos.router';

router.pushUrl({
  url: 'pages/Detail',
  params: {
    id: 123,
    name: 'example'
  }
});
```

### 注意事项
- params 参数在目标页面通过 `router.getParams()` 获取
- 参数大小限制为 4KB
```

### 无结果

```markdown
## 知识搜索结果

### 搜索信息
- 查询: "xxx"
- 类型: API 查询
- 结果数: 0

### 建议
1. 尝试使用更精确的关键词
2. 检查 API 名称是否正确
3. 查阅官方文档: https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/
```

## 与 Router 的协作

本 skill 作为 **L-1 知识补充层**，与其他 skill 协作：

```
用户问题
    │
    ▼
知识路由（识别层级）
    │
    ├─→ L0/L1: 加载对应知识
    │         │
    │         ├─→ 知识足够 → 直接回答
    │         │
    │         └─→ 知识不足 → knowledge_search 补充
    │                         │
    │                         ├─→ 搜索官方文档
    │                         ├─→ 验证知识
    │                         └─→ 返回补充知识
    │
    └─→ 无法识别 → knowledge_search 搜索
```

### 协作示例

```
用户: List 组件怎么实现懒加载？

知识路由:
1. 识别层级: L1 组件用法
2. 加载知识: 读取 references/component_container/SKILL.md
3. 检查知识: 懒加载知识不完整
4. 补充知识: knowledge_search
   - query: "ArkUI List LazyForEach 懒加载"
   - 获取官方文档和示例
5. 整合回答
```

## 使用示例

### 示例1：API 用法查询

```
用户: @ohos.net.http 怎么发送 POST 请求？

knowledge_search:
1. 分析问题类型: API 查询
2. 构建查询: "@ohos.net.http POST request"
3. 执行搜索
4. 返回: API 参考 + 示例代码 + 最佳实践
```

### 示例2：错误排查

```
用户: 编译报错 "ArkTS:ERROR Cannot find name 'router'"

knowledge_search:
1. 分析问题类型: 错误排查
2. 构建查询: "ArkTS Cannot find name router import @ohos.router"
3. 执行搜索
4. 返回: 导入方式 + 配置说明
```

### 示例3：最佳实践查询

```
用户: HarmonyOS 网络请求有什么最佳实践？

knowledge_search:
1. 分析问题类型: 概念搜索
2. 构建查询: "HarmonyOS 网络请求 最佳实践 HTTP"
3. 执行搜索
4. 返回: 官方推荐方案 + 封装示例
```

### 示例4：版本兼容查询

```
用户: @ohos.router 在 API 12 有什么变化？

knowledge_search:
1. 分析问题类型: 版本查询
2. 构建查询: "@ohos.router API 12 version changelog"
3. 执行搜索
4. 返回: 版本变更说明 + 迁移指南
```

## 注意事项

1. **搜索前先查 skill**：优先使用已有的 skill 知识，搜索作为补充
2. **精确关键词**：使用精确的关键词提高搜索效率
3. **结果验证**：搜索结果需要结合实际项目验证
4. **版本注意**：注意文档对应的 API 版本，避免使用已废弃的 API
5. **多轮搜索**：单次结果不理想时，调整关键词重新搜索
6. **工具可用性**：如果 MCP 工具不可用，提示用户手动查阅官方文档
7. **知识整合**：搜索结果需要与已有 skill 知识整合，避免冲突

## 相关资源

- [HarmonyOS 开发文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/)
- [ArkTS API 参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/)
- [DevEco Studio 使用指南](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-overview)
- [HarmonyOS 版本说明](https://developer.huawei.com/consumer/cn/doc/harmonyos-releases/)
- [DevEco MCP Server](https://github.com/open-deveco/deveco-toolbox)