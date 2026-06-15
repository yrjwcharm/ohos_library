---
name: hmos-arkui-develop-skill
description: ArkUI 代码开发助手，面向 HarmonyOS UI 开发，提供基于知识库的UI开发能力。内部调用 hmos-arkui-knowledge-retriever 的检索能力获取 API 证据。包含编码约束规则和最佳实践参考。触发场景：(1) 用户要求生成 ArkUI 页面或组件 (2) 用户在现有 .ets 工程上要求增删改功能 (3) 用户提供报错/截图要求修复 ArkUI 代码 (4) 用户提到 HarmonyOS/ArkUI/ArkTS/.ets (5) 用户提到状态管理、组件、布局等界面相关的开发任务，并且期望得到可运行代码。
---

# ArkUI Develop Skill

## 使用场景

| 场景 | 用户输入特征 | 执行模式 | 示例 |
|------|------------|---------|------|
| 从零创建页面/组件 | 无工程上下文，纯需求描述 | 0→1 新建生成 | "用ArkUI写一个商品列表页"、"实现一个带表单校验的注册页" |
| 增量功能开发 | 提供文件路径或代码片段 | 1→n 增量改动 | "在这个页面加个搜索功能"、提供 .ets 文件路径要求修改 |
| 错误修复 | 提供报错信息或异常截图 | 诊断修复 | "这段代码报错怎么修"、粘贴编译错误或运行时异常 |

不确定归属哪个场景时，先问清楚再动手。

## 核心原则

1. **证据优先**：关键结论来自知识库，不编造 API
2. **可运行优先**：输出代码必须能通过语法检查
3. **API 签名查表优先**：写代码前先查 `references/quick-apis/` 确认参数，不凭记忆写

## 工作流程

整体遵循 **先设计方案 → 识别不确定点 → 调用知识检索 → 完善方案** → **开发实现**的迭代模型。

### Step 1: 需求澄清

以下情况先澄清后再动手：

- 生成目标不明确（仅"做个首页"但无结构约束）
- 增量改动的影响范围不确定

进入**增量改动**时的 ArkUI 约束：

- 先读取用户指定的 .ets 文件，理解现有代码结构、状态管理范式（V1/V2）、导航架构后再进入方案设计。不读取现有文件不得开始设计
- 未经同意不替换状态管理范式（V1/V2）、不覆盖已有业务逻辑、不因"更优"改写无关模块

进入**错误修复**时，走独立流程：

1. **复现/理解错误**：读取报错信息或分析异常截图，提取错误码和上下文
2. **定位根因**：根据错误码速查 `references/quick-rules/18-error-code.md`，或对照 `references/quick-rules/` 中对应章节的「常见错误」部分匹配
3. **修复代码**：只修改导致错误的代码，不改无关模块
4. **验证修复**：用 `deveco-mcp_check_ets_files` 检查变更文件，确认错误已消除且无回归

### Step 2: 设计方案 → 识别不确定点 → 调用检索验证 → 完善方案

> 核心时序：**先想清楚怎么做，再查不确定的，最后完善方案**。
> 不要在设计之前检索——你不知道要查什么。

#### 2.1 设计初始方案

先完成方案设计，遵循以下原则：

- 组件选择：纯 UI 片段优先 `@Builder`，有状态/生命周期时才用 `@Component`
- 状态管理决策：会不会变？会不会驱动 UI？只读/不变的不加装饰器；业务数据分离到 ViewModel
- 布局策略：嵌套尽量 ≤ 3 层，复杂布局优先 `RelativeContainer` / `Grid`
- 导航架构：单 Page 应用，`Navigation` + `NavDestination` + `navPathStack`
- 生命周期与异步：`aboutToAppear` 中禁止网络请求/大计算/IO，耗时走 `TaskPool` / `Worker`
- 代码组织：根据项目复杂度决定是否采用 MVVM，不强制

按复杂度控制深度：中等复杂度确定核心组件名即可；完整复杂度列出完整组件树和数据流。

#### 2.2 从方案中识别不确定点

方案设计完成后，逐项检查方案中用到的 API/用法，标注不确定的点。

**判定规则**：读取 `references/search-strategy.md`，按两级策略处理（基础查速查表 / 复杂调检索）。

**验证优先级**：

1. 先查 `references/quick-apis/` 下对应分类文件（如 `01-layout.md`、`02-basic-components.md`），找到目标组件的 API 卡片确认构造签名和参数表
2. quick-apis 表中找到完整卡片 → 直接使用，无需检索
3. quick-apis 表中找不到或信息不足 → 进入 2.3 调检索

最终产出一份**待检索清单**（仅需检索的项目）。

#### 2.3 调用知识检索

通过 `hmos-arkui-knowledge-retriever` 的检索脚本对待检索清单中的项目执行检索，不要盲目全量搜索。

```bash
# 针对单个不确定点检索（默认 compact 模式，自动提取代码块+接口签名）
python {hmos-arkui-knowledge-retriever}/scripts/run.py query "LazyForEach IDataSource" --top-k 3 --include-code --format json

# 需要更多上下文
python {hmos-arkui-knowledge-retriever}/scripts/run.py query "Navigation 页面跳转" --top-k 5 --max-content-chars 2000 --max-total-chars 16000 --include-code --format json

# 按分类精确过滤
python {hmos-arkui-knowledge-retriever}/scripts/run.py query "@Local 装饰器" --category 02-state-management --include-code --format json

# 需要完整文档（关闭 compact 和去重）
python {hmos-arkui-knowledge-retriever}/scripts/run.py query "Navigation 页面跳转" --full-content --no-compact --no-dedup --include-code --format json
```

> `{hmos-arkui-knowledge-retriever}` 指向 `hmos-arkui-knowledge-retriever` skill 的根目录路径。

**补充：DevEco MCP 官方文档查询**。当 `hmos-arkui-knowledge-retriever` 不可用或返回结果不确定时，使用 DevEco MCP 工具查询官方文档：

```
harmonyos_knowledge_search(keywords: ['Video onUpdate callback', 'VideoAttribute 事件'])
→ 返回准确的官方 API 签名和示例代码
```

适用场景：
- quick-apis 表中信息与编译结果冲突时（以官方文档为准）
- 知识检索器未覆盖的新 API 或不确定的组件
- 枚举值不确定时，查官方文档确认实际值

检索策略：优先检索不确定的 API 用法 → 再检索最佳实践 → 最后检索已知限制和坑。

#### 2.4 方案检查点

进入编码前确认：

1. 每个关键 API 要么有检索证据支撑，要么在 quick-apis 表中确认了签名，要么是确信掌握的基础用法（search-strategy.md 🟢列表）
2. 方案与现有工程范式一致（V1/V2、导航、目录）
3. 仍有不确定的 API 已标注"待确认"，不强行使用

### Step 3: 生成代码

**生成策略**：新建生成输出完整可运行代码；增量改动只输出变更补丁，不改无关模块。

#### 3.1 API 参数查表

**禁止凭记忆写 API 参数。** 写代码前，对方案中用到的每个组件/属性/事件：

1. 在 `references/quick-apis/` 下找到对应分类文件（布局容器→`01-layout.md`、基础组件→`02-basic-components.md` 等，完整列表见 `_index.md`）
2. 在该文件中找到目标组件的 API 卡片，提取构造签名、参数名、参数类型、默认值
3. quick-apis 表中找不到的组件或参数 → 回到 Step 2.3 补充检索

#### 3.2 错误预防扫描

代码生成前，快速扫视 `references/quick-rules/` 中对应章节的高频错误（每个文件末尾的「常见错误」章节）：

- **20-import** → 确认全部用 `@kit.*`，符号名和 kit 归属正确
- **19-uicontext** → 确认全局接口（router、promptAction、AlertDialog、animateTo、vp2px）通过 `this.getUIContext()` 调用
- **05-v1v2-mix** → 确认不跨版本混用装饰器
- **22-attribute-params** → 确认不捏造属性名、不混淆枚举值、不借用其他框架写法、回调参数类型正确
- **17-resources (sys.symbol)** → 使用图标时只从已验证列表中选名字，不凭直觉猜

这是一次快速检查，不是完整阅读。

#### 3.3 代码生成

**ArkUI 编码约束**：

1. **API 参数严格照搬 quick-apis 表或检索结果**
   - 参数名、类型、顺序必须原样使用，不得凭记忆改写
   - 生成过程中不确定的参数 → 停下来检索，不猜
2. **ArkUI 特定规则**
   - 优先 `Navigation + NavDestination`，通过 `navPathStack` 管理
   - ForEach / LazyForEach 必须有第三个参数作为 key，且用业务 ID 不用索引
   - 长列表策略：`List` + `LazyForEach` + `cachedCount`，keyGenerator 用业务 ID，列表项加 `@Reusable`
   - 动画策略：出现/消失用 `transition`，高频显隐用 `visibility`，低频用 `if`
   - 每个状态变量必须声明类型，不允许省略类型注解
   - 不替换现有工程的状态管理范式和导航架构
3. **代码风格**
   - 遵循 `references/style-guide.md`（命名规范、组件结构顺序、链式调用格式、类型注解）

### Step 4: 验证与修复

**原则：工具检查 → 有错就修 → 修完再查 → 通过即交付。**

**适用范围**：

| 验证项 | 0→1 新建生成 | 1→n 增量改动 |
|--------|-------------|-------------|
| 语法编译检查 | 建议执行 | **必须执行** |
| 核心路径验证 | 给出验证步骤 | **至少1条回归路径** |
| 回归影响检查 | 不强制 | 相邻模块影响面检查 |

**验证修复流程**：

1. 用 `deveco-mcp_check_ets_files` 检查所有变更的 .ets 文件
2. 有错误 → 根据诊断信息定位问题，修复代码
3. 修复后重新检查，重复直到通过（最多 3 轮）
4. 3 轮仍未通过 → 输出剩余问题清单和根因分析，交给用户

**MCP 工具不可用时**：

调用 `deveco-mcp_check_ets_files` 失败（工具不存在或无响应）时，读取 `references/checklist.md` 执行人工走查。

完成后说明：
> 本次为人工走查，建议安装 DevEco MCP 后在 DevEco Studio 中验证编译是否通过。

