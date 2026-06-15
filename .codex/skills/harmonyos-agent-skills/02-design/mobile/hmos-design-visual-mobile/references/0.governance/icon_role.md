# Icon Role 规范 (Asset Layer Contract)

## 1. 目标
统一组件中的图标/插画资源来源与引用方式，避免资源漂移与不可复现实现。

注意：
- 本文件只约束图标与插画资源，不覆盖彩色 emoji。
- 若页面涉及 emoji，请额外读取 `references/0.governance/emoji_role.md` 与 `references/0.governance/hmos-emoji-map.json`。

配套字典：
- `references/0.governance/hmsymbol-map.json`
- 来源：HarmonyOS Symbol 官方名字典 JSON
- 当前本地版本：`2.1`

当页面、组件或 benchmark 渲染涉及图标时，必须同时读取本文件与 `hmsymbol-map.json`。

## 2. 图标优先级（强制）
当组件涉及图标资源时，必须按以下优先级选择：

1. `HMSymbol`（最高优先级）
- 可由 `HMSymbol` 覆盖的图标，优先使用符号字体方案。
- 需保证语义命名与可维护性（例如：`icon-back`、`icon-close`、`icon-chevron-right`）。
- 不允许在已存在 `HMSymbol` 条目的前提下，直接手绘 inline SVG 作为默认实现。
- 页面渲染默认只使用线性图标（outline / line）。若同一语义同时存在线性与面性版本，必须优先选择线性版本。
- 非设计明确要求时，禁止在线性页面中混用 `*_fill`、实心圆底、实心面性 icon。

2. Pixso 原始设计资源导出为本地 SVG
- 若 `HMSymbol` 无对应图标，使用 Pixso 原始设计资源导出为 SVG。
- SVG 必须落库到本地仓，并使用稳定相对路径引用。
- 必须优先复用“仓库内已有 SVG 资源”；严禁 agent 临时手绘新的 inline SVG 图标替代资源治理。

3. 插画或复杂多色资源
- 优先本地 SVG；必要时可使用本地 PNG/WebP。
- 不允许把截图切片当作组件主结构。

## 3. 资源落库规则
- 资源必须存放于仓库内可追踪目录（建议 `assets/icons/`、`assets/illustrations/`）。
- 命名使用稳定语义格式：`[component]-[role]-[state].svg`
- 不允许临时路径、随机哈希命名直接进入模板主引用。
- `HMSymbol` 映射以 `references/0.governance/hmsymbol-map.json` 为本地单一事实源（single source of truth）。
- 若需要补充或更新图标映射，优先更新本地字典，而不是把 glyph 直接散落进页面文件。

## 4. HMSymbol 使用流程（强制）
1. 根据页面语义先确定图标角色名，例如：`back`、`share`、`chevron-right`、`walk`、`calendar`
2. 在 `hmsymbol-map.json` 中检索最接近的官方 `name` / `name_cn`
3. 若命中：
- 优先记录 `semantic role -> HMSymbol name -> unicode` 的映射
- 页面实现使用本地 `HMSymbol` 字体，而不是临时 SVG
4. 若未命中：
- 才允许退回本地已有 SVG
- 并在页面日志、复盘文档或 reference gap 中注明“`HMSymbol` 无对应条目”
- 不允许 agent 自行绘制新的 inline SVG 图标；若仓库内也无现成 SVG，应先记录缺口，再等待资源补齐或明确授权新增本地资源。

补充约束：
- `hmsymbol-map.json` 中的字段含义如下：
  - `name`：官方英文图标名，优先作为 agent 检索键
  - `unicode`：十六进制 codepoint，不带 `0x`
  - `char`：可直接写入 HTML 的字符形式
  - `module`：官方来源模块（如时钟、电子邮件），可用于判断语义贴合度
  - `categories`：官方分类，可用于按主题筛选
  - `primary_categories`：主分类，辅助缩小检索范围

推荐检索顺序：
- 先按 `name` 精确匹配
- 再按 `module` / `categories` 语义匹配
- 最后按 `primary_categories` 辅助筛选

线性优先附加规则：
- 若存在同语义的 `calendar` 与 `calendar_fill`，默认必须选择 `calendar`
- 若存在同语义的 `clock` 与 `clock_fill`，默认必须选择 `clock`
- 若存在同语义的 `xmark_circle` 与 `xmark_circle_fill`，默认必须选择线性版本
- 检索命中多个候选时，默认过滤名称中带 `fill`、`_fill`、`filled` 的条目，除非设计稿明确要求面性
## 5. 引用规则（强制）
- 禁止 `http://localhost:*`、`https://localhost:*`、临时 dev server 地址。
- 禁止依赖外部临时导出资源服务。
- 模板中图标路径必须为仓库内相对路径。
- 若使用 `HMSymbol`，字体文件必须来自仓库内本地路径，禁止运行时依赖外部字体地址。
- 若页面使用 glyph 直写字符，必须能在本地字典中回查到对应 `name` 与 `unicode`。
- 严禁 agent 自己手绘 inline SVG 图标；仅允许使用 `HMSymbol` 或仓库内已有 SVG 资源。

## 6. 审核门禁
以下情况直接判定不通过：
- 本可使用 `HMSymbol` 却使用切图/截图资源。
- 图标资源未落库，仅引用 Pixso 或 localhost 临时地址。
- 组件主视觉依赖图片切片拼装而无语义结构。
- 页面中直接出现无法回查来源的私有区 glyph 字符。
- 未读取 `hmsymbol-map.json` 就直接拍脑袋选择 iconfont glyph 或 SVG。
- agent 自行绘制 inline SVG 图标，且该图标既不是 `HMSymbol`，也不是仓库内已有 SVG 资源。
- 在线性风格页面中，无设计理由地混用线性与面性图标。
