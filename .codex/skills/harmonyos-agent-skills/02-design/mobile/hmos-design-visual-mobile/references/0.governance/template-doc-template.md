# Template 责任田与模版架构 (Source of Truth: Executable Contract)

## 1. 文档定位
`references/4.template/*-tem.html` 是组件可执行契约真相源，负责描述：
- 组件最终 DOM 结构
- 组件状态层级结构（base/overlay/focus/indicator）
- 组件可替换变量入口（`{{variable}}`）
- 与 `reference` 严格一致的接口消费方式

`template` 不负责：
- 定义业务语义（由 reference 负责）
- 输出页面实验排版
- 承担 benchmark 的原样复制职责

## 2. 模板固定架构（强制）
每个模板必须遵循统一骨架：

1. Header Comment
- 组件名、来源、变量列表、可选值

2. Style Block
- 引用语义 token（推荐 `@import ../../../references/2.theme/harmony-tokens.css`）
- 仅定义该组件相关样式
- 不重复定义全局无关 token

3. Root Element
- 类名：`harmony-[component]` + 业务维度类（如 `{{variant}}/{{state}}/{{theme}}/{{device}}/{{status}}`）
- 必需属性：`data-component="[component]"`

4. Inner Structure
- 按 reference 的 slot 与状态层级拆分
- 不允许“万能容器 + 任意拼接”结构

## 3. 接口与占位变量规范
- `template` 中的 `{{variable}}` 必须全部在对应 reference 的 `Template Injection`（或 Public API Contract）中声明。
- 不允许出现 reference 未声明变量（如 `maskHidden`、`spinnerHidden` 这类隐式变量）。
- 默认值策略：
  - 布尔变量：通过属性显隐（`hidden`/`aria-*`）处理
  - 枚举变量：必须落在 reference 声明集合内

## 4. 统一约束
- 业务视觉值优先使用语义 token；允许少量结构性例外（如遮罩 alpha、兼容性 fallback）使用 `rgba(...)`。
- 不允许直接依赖 `http://localhost:*` 资源。
- 图标类元素必须有防拉伸约束（`background-size` 或内层几何映射策略）。
- 所有交互态类必须在模板可见，不得只在 benchmark 中实现。
- 若模板根元素或任一交互控件视觉上不是“原生按钮”，但实现上借用了 `<button>` 承载交互，则模板样式必须显式清除浏览器默认按钮外观：
  - 至少包含 `border: 0;`
  - 至少包含 `padding: 0;`
  - 至少包含 `appearance: none; -webkit-appearance: none;`
  - 其最终视觉外观必须完全由模板样式重建，不得泄露 UA 默认黑色描边、渐变底色或系统 bevel
- 上述约束同样适用于用 `<button>` 承载的 `switch`、segmented item、icon-only control、picker trigger、upload trigger 等“视觉不是按钮”的控件。

## 4.1 组件组合与 Overlay 约束（强制）
- 当模板用于全屏覆盖组件（如 `bindsheet`）时，必须支持 root overlay 挂载：
  - `position: absolute; inset: 0;`
  - 覆盖尺寸与画布一致（如 `360x792`）
- 遮罩必须使用独立节点（如 `.harmony-bindsheet-mask`），不得与 sheet 本体合并。
- 若与 `size` 组合，overlay 应通过独立插槽注入（如 `{{overlay}}`），而不是嵌入内容流槽位（如 `.harmony-size-content`）。

## 5. 与 reference 的关系
- reference 决定“接口语义和组合规则”
- template 决定“接口如何被可执行消费”
- 两者任何一方变化，另一方必须同步

## 6. 合规门禁
模板输出后必须通过质量审核，至少包含：
- 变量一致性审查（reference vs template）
- 状态覆盖审查（state matrix 对齐）
- token 合规审查
- trace 属性完整性审查