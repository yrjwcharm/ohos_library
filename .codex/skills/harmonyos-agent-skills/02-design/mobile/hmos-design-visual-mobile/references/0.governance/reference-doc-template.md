# Reference 责任田定义 (Source of Truth: Semantic Contract)

## 1. 文档定位
`references/3.component/*.md` 是组件语义契约真相源，负责描述：
- 组件是什么（语义与用途）
- 组件接受什么输入（接口/状态/插槽）
- 组件在不同状态下应如何表现（视觉与几何约束）
- 页面组合时必须满足哪些规则（对齐、防拉伸、可追溯）

`reference` 不负责：
- 给出最终 CSS 细节实现
- 书写页面级绝对定位方案
- 用 benchmark 代码片段代替接口契约

## 2. 必须包含的章节（强制，项目现行）
每个组件 reference 必须包含以下固定章节（与 `references/3.component/*.md` 现行写法一致）：

1. `Metadata`
- Component 名
- Template Source
- Benchmark Source
- MCP Source

2. `## 1. Content Presentation (内容呈现格式)`
- Base Structure
- Icon/Text/Action Snippet（可为示例槽位）

3. `## 2. Interaction States (交互状态)`
- 至少描述 variant/state/value 中实际使用的维度

4. `## 3. Dynamic Response (动态响应)`
- 至少包含溢出、几何稳定、防拉伸或占位保持中的 2 项

5. `## 4. Template Injection (模版注入)`
- 声明 template 消费变量（`{{variable}}`）
- 推荐包含 Numeric Baseline（如有）

6. `## 5. Audit Checklist`
- 至少包含：状态命名一致、几何防拉伸、模板变量契约一致

## 3. 增强章节（可选）
以下章节用于“严格契约模式”，可按组件成熟度逐步补齐，不作为当前强制门槛：
- Public API Contract
- Slot Contract
- State Matrix
- Geometry & Anti-Stretch Contract
- Token Mapping
- Trace Contract
- Validation Checklist

## 4. 命名与状态规范
- 组件命名：`harmony-[component]`
- 变体：`[variant]`（如 `emphasized|normal|warning|text`）
- 状态：`[state]`（如 `enabled|hover|pressed|focus|disabled`）
- 值态：`[value]`（如 `checked|unchecked`、`on|off`）

说明：
- 变体、状态、值态必须分维表达，不得混在同一个字段里。
- `reference` 中出现的每个 `{{variable}}` 必须在对应 template 中出现并可被消费。

## 5. 变更规则
- 修改接口字段时，必须同步修改对应 template 与审核规则。
- 新增状态时，必须补齐状态矩阵和回归用例。
- 未通过质量审核不得合入 `reference` 主干内容。

## 6. 变量一致性规则（强制）
- `Template Injection` 中声明的变量，必须能在对应 template 中被消费。
- `Base Structure` / `Snippet` 中允许出现示例变量（如 `{{icon}}/{{label}}/{{action}}`），但应在文档中标注“示例槽位”语义，避免误判为强制输入契约。