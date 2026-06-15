---
name: deveco-requirement-development
description: "覆盖鸿蒙/HarmonyOS/ArkTS 应用需求开发流程。在用户要落地新功能/新页面/新模块、PRD、端到端需求开发或鸿蒙应用开发时使用。不用于仅询问 API 语法用法、或未声明走完整链路的单文件 Bug 修复。用户意图模糊时先澄清是否需要端到端交付。"
---

# 鸿蒙需求开发工作流

本技能覆盖 **需求 → 编码/联调 → 评审** 全链路；各阶段细则在 `reference/` 对应文档中（`prd-gen`、`coding`、`review`）。通用规则统一收敛在 `reference/common.md`。按用户当前任务**只读取相关 reference**，做端到端需求时按下方总览顺序推进。
---

## 全流程总览

```
阶段一     调研与设计稿 → PRD 定稿     → 见 reference/prd-gen.md
    ↓
阶段二     编码、静态检查、编译、推包、联调验收   → 见 reference/coding.md
    ↓
阶段三     代码评审与经验沉淀                    → 见 reference/review.md
```
---

## 分阶段参考文件（按需读取）

详细说明均在 **`reference/`** 子目录中；从本 `SKILL.md` **直接读取**下表链接（一层引用，勿再嵌套跳转）。

| 阶段 | 参考文件 | 典型用户表述 |
|------|-----------|--------------|
| 通用规则 | [reference/common.md](reference/common.md) | 可选目录、复用策略、失败重试、沉淀策略 |
| PRD 与调研 | [reference/prd-gen.md](reference/prd-gen.md) | 需求文档、PRD、设计稿、调研 |
| PRD 质控与定稿阈关 | [reference/prd-quality-gate.md](reference/prd-quality-gate.md) | PRD 验收清单、技术校准、一致性审查、设计稿版本记录 |
| 编码与联调 | [reference/coding.md](reference/coding.md) | 编码、coding、实现、编译、构建、debug、联调、修复、验收 |
| 评审 | [reference/review.md](reference/review.md) | review、评审、CR、代码审查 |

**读取规则**：

- 默认先读 `reference/common.md`，再读与当前目标最相关的 **1 个**阶段参考文件。
- 以下场景**优先级高于"1 个"限制**，必须额外追加读取，不计入默认 1 个名额：
  - 进入 PRD 阶段三，或用户提到"验收清单/技术校准/一致性审查/设计稿版本记录"，**在进入阶段三时立即**追加读取 `reference/prd-quality-gate.md`，不得提前或延后。
  - 涉及 UI Pattern 刷新、复用判定或 Pattern 缺失降级，必须按 `reference/prd-gen.md` 阶段一-B 读取相关 Pattern 文档（执行时机：阶段一-A 用户确认后、阶段二写 PRD 前）。
  - 用户要求从需求端到端推进时，按大阶段增量读取下一参考文件，禁止一次性全量加载全部 reference。

---

## 按需入口（按任务选 reference）

- 用户只谈 **需求/设计稿** → `reference/prd-gen.md`
- 用户只谈 **写代码/编译（新功能/结构改动）** → `reference/coding.md`（进入前需确认 PRD 已定稿；若无 PRD，先回到 `reference/prd-gen.md`）。
- 用户只谈 **Bug/联调/快修（局部修复）** → `reference/coding.md`（可不经过完整 PRD，但需先确认 issue/复现步骤/预期行为）。
- 用户只谈 **Review** → `reference/review.md`。
- 用户**直接提供设计稿链接**（Figma / MasterGo / Sketch 等 URL），未给出粗略需求文字描述 → 仍需从 `reference/prd-gen.md` 阶段零开始，先向用户确认调研范围（Step 1），再解析设计稿；禁止跳过阶段零直接进入阶段一。
- 用户表述为 **功能升级 / 对已有 PRD 做改动** → 先查 `/docs/prd/README.md` 索引定位已有 PRD，评估变更范围后选择入口：局部调整走 `coding.md` 变更处理节；逻辑级以上变更需回到 `reference/prd-gen.md` 阶段一-A 重新论证，在原 PRD 文件上追加版本标注后继续。

用户明确要求**从需求一路做到上线**时：按总览顺序推进；上一阶段产出满足「进入下一阶段条件」后再打开下一参考文件。

---

## 用户越权请求处理

当用户请求**跳过当前未完成阶段直接进入下一阶段**时，不得静默执行，必须明确说明缺少的前置条件并引导补齐。以下为常见场景与标准回应：

| 越权场景 | 缺少的前置 | 标准引导话术 |
|---------|-----------|-------------|
| PRD 未定稿时要求开始编码 | PRD 阶段四前置阈关未通过 | "当前 PRD 尚未完成定稿阈关检查（§11/§11.5/§11.6/§12），进入编码存在返工风险。建议先完成质控，还是继续编码（并接受该风险）？" |
| 调研报告未确认时要求写 PRD | 阶段零 Step 4 用户确认 | "调研报告尚未经用户确认（阶段零 Step 4），直接写 PRD 可能遗漏模块边界问题。请先确认调研报告，或明确说明跳过风险。" |
| 编码阶段 §10 阻塞项未解决 | §10 中存在 [阻塞编码] 项 | "PRD §10 中存在 [阻塞编码] 未解决项（列出具体条目），建议先解决后再开始编码，否则可能需要大范围返工。" |
| 联调验收未完成时要求提 Review | coding.md 阶段八验收通过 | "功能验收（coding.md 阶段八）尚未完成，直接进入 Review 可能审出大量功能问题。建议先完成验收，再提 Review。" |

---

## 人工必须介入的检查点

> 本表为索引，**细则以对应 reference 文件为准，此处不重复定义**。

| 时机 | 所在 reference |
|------|---------------|
| 阶段零完成后（调研报告确认） | `prd-gen.md` 阶段零 Step 4 |
| 设计稿解析后、写 PRD 前（方案论证确认） | `prd-gen.md` 阶段一-A Step 5 |
| 进入编码前（PRD §10 阻塞项全部解决） | `prd-gen.md` 阶段四前置阈关 |
| 第一批骨架后（新增依赖/路由/服务注册工程同步） | `coding.md` 阶段一 §1.2 |
| 联调完成后（功能验收） | `coding.md` 阶段八 |
| 评审阶段（P0/P1 修复） | `review.md` 阶段二 |
| 评审完成后（经验沉淀） | `review.md` 阶段五 |
| 疑难定位后（修复计数超过5次强制挂起） | `coding.md` 阶段七 Step 5 |
