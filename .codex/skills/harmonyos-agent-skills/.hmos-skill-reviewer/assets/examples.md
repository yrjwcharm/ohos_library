# Skill 审查示例

本文档提供真实的 Skill 审查案例，展示如何使用 `skill-reviewer` 进行审查。

---

## 示例 1: 优秀的 Skill - code-review

### 待审查 Skill

```yaml
---
name: code-review
description: Review code for quality, security, and maintainability following team standards. Use when reviewing pull requests, examining code changes, or when the user asks for a code review. Provides actionable feedback on bugs, performance issues, and style violations.
license: MIT
metadata:
  author: team-lead
  version: "1.0.0"
---

# Code Review Expert

## Workflow

### Step 1: Quick Scan
Check for obvious issues:
- [ ] Syntax errors
- [ ] Missing type annotations
- [ ] Console.log statements

### Step 2: Deep Analysis
Review each function for:
1. Correctness
2. Performance
3. Security
4. Maintainability

### Step 3: Provide Feedback
For each issue:
- Location (file:line)
- Severity (Critical/Warning/Info)
- Suggestion with code example
```

### 审查报告

```markdown
# Skill 审查报告

## 基本信息
- **Skill 名称**: code-review
- **审查时间**: 2026-03-17
- **总体评分**: 5/5 ⭐⭐⭐⭐⭐

## 问题汇总
- Critical: 0 个
- Warning: 0 个
- Info: 0 个

## 维度评分
| 维度 | 得分 | 说明 |
|------|------|------|
| 格式规范性 | 5/5 | 完全符合规范 |
| 内容职责 | 5/5 | 纯任务导向 |
| 可操作性 | 5/5 | 完整工作流程 |
| 组织结构 | 5/5 | 结构清晰 |
| **综合评分** | **5/5** | 优秀 |

## 详细评价

### ✅ 优点

1. **元数据完美**
   - name 格式正确：全小写、连字符分隔
   - description 清晰：包含 what + when + how
   - 包含 license 和 metadata

2. **内容职责明确**
   - 完全是"如何做"的指令
   - 没有知识库型内容
   - 聚焦代码审查任务

3. **可操作性强**
   - 清晰的三步工作流程
   - 具体的检查清单
   - 明确的输出格式

4. **组织合理**
   - SKILL.md 精简 (<200 行)
   - 无冗余内容
   - 层次清晰

### 💡 建议

无重大问题，保持当前设计即可。

## 审查结论

✅ **通过** - 可以直接合并

这是一个优秀的 Skill 范例，推荐作为模板参考。
```

---

## 示例 2: 有问题的 Skill - arkts-knowledge

### 待审查 Skill

```yaml
---
name: ArkTS-Knowledge
description: A comprehensive guide about ArkTS programming language.
---

# ArkTS Language Guide

## What is ArkTS

ArkTS is an application development language for HarmonyOS. 
It maintains the basic TypeScript syntax style while introducing 
static types... (500 words of theory)

## History of ArkTS

ArkTS was born in 2023 as part of Huawei's HarmonyOS ecosystem...
(300 words of history)

## Type System

The type system of ArkTS includes the following categories:

1. Number types: byte, short, int, long, float, double, number, bigint
2. Boolean type: boolean
3. String type: string
... (detailed API documentation)

## Examples

Here are some code examples:

```typescript
let x: number = 10;
const str: string = "hello";
// ... 50 more examples
```
```

### 审查报告

```markdown
# Skill 审查报告

## 基本信息
- **Skill 名称**: ArkTS-Knowledge
- **审查时间**: 2026-03-17
- **总体评分**: 1.5/5 ⭐

## 问题汇总
- **Critical**: 5 个 (必须修复)
- **Warning**: 4 个 (建议修复)
- **Info**: 2 个 (可选改进)

## 维度评分
| 维度 | 得分 | 说明 |
|------|------|------|
| 格式规范性 | 2/5 | 多处违反规范 |
| 内容职责 | 1/5 | ❌ 纯知识库，不是 Skill |
| 可操作性 | 1/5 | 无工作流程 |
| 组织结构 | 2/5 | 结构混乱 |
| **综合评分** | **1.5/5** | 需要重大重构 |

## Critical 问题 (必须修复)

### 1. name 字段违规
- **位置**: YAML frontmatter
- **违反规则**: 只能包含小写字母、数字、连字符
- **问题描述**: 'ArkTS-Knowledge' 包含大写字母
- **修复建议**: 
  ```yaml
  # 当前
  name: ArkTS-Knowledge
  
  # 应该改为
  name: arkts-knowledge
  ```

### 2. description 过于简单
- **位置**: YAML frontmatter
- **违反规则**: description 应该说明做什么 + 何时使用
- **问题描述**: 只有 48 字符，缺少触发场景
- **修复建议**: 
  ```yaml
  # 当前
  description: A comprehensive guide about ArkTS programming language.
  
  # 应该改为 (>100 字符)
  description: Validate ArkTS code for static type compliance and 
  syntax correctness. Use when reviewing .ets files, checking 
  TypeScript migration, or ensuring ArkTS best practices.
  ```

### 3. ❌ 纯知识库，不是 Skill
- **位置**: SKILL.md 全文
- **违反规则**: Skill 应该是"如何做",不是"是什么"
- **问题描述**: 
  - 500 字理论介绍"什么是 ArkTS"
  - 300 字历史背景
  - 完整的类型系统 API 文档
  - 50+ 代码示例堆砌
  - 没有任何工作流程或操作指令
- **修复建议**: 
  ```
  严重问题：这不是 Skill，是知识库
  
  方案 A: 重构为真正的 Skill
  - 删除理论知识
  - 添加代码审查工作流程
  - 提供检查清单和决策树
  
  方案 B: 改名为知识库
  - 重命名为 arkts-reference
  - 放在 docs/目录而非 skills/目录
  ```

### 4. 缺少工作流程
- **位置**: SKILL.md 正文
- **违反规则**: Skill 必须包含可操作流程
- **问题描述**: 完全没有"第一步做什么、第二步做什么"的说明
- **修复建议**: 添加类似以下的工作流程:
  ```markdown
  ## Code Review Workflow
  
  ### Step 1: Scan for Type Errors
  Check all variable declarations:
  - [ ] Has explicit type annotation
  - [ ] Not using any/unknown
  - [ ] Type matches inferred value
  
  ### Step 2: Check Decorators
  Verify @State/@Prop/@Link usage:
  - If internal state → @State (must be private)
  - If parent→child → @Prop
  - If two-way binding → @Link
  
  ### Step 3: Provide Fixes
  For each issue:
  1. Note location (file:line)
  2. Explain violated rule
  3. Show fixed code
  ```

### 5. 缺少检查清单
- **位置**: SKILL.md 正文
- **违反规则**: 复杂 Skill 应该有检查清单
- **问题描述**: 没有任何 checklists
- **修复建议**: 添加分级检查清单

## Warning 问题 (建议修复)

### 1. description 使用第一人称
- **问题**: 应该用第三人称描述技能能力
- **建议**: 改为 "Validates..." 而非 "I can help validate..."

### 2. SKILL.md 过大
- **当前**: 约 800 行
- **建议**: 将理论知识移至 references/types-theory.md
- **目标**: SKILL.md < 500 行

### 3. 没有 references/目录
- **问题**: 大量详细内容直接在 SKILL.md
- **建议**: 创建 references/目录存储:
  - references/type-system.md
  - references/api-reference.md
  - references/examples.md

### 4. 没有决策树
- **问题**: AI 不知道如何处理不同场景
- **建议**: 添加决策树，如:
  ```
  发现问题类型？
  ├─ 类型错误 → Critical
  ├─ 性能问题 → Warning
  └─ 风格问题 → Info
  ```

## Info 问题 (可选改进)

### 1. 未指定 license
- **建议**: 添加开源许可证

### 2. 未指定 metadata
- **建议**: 添加 author 和 version

## 整体评价

这是一个典型的"知识库伪装成 Skill"的案例。

**主要问题**:
- ❌ 完全没有可操作性
- ❌ 全是理论知识
- ❌ 没有工作流程
- ❌ 元数据多处违规

**优点**:
- ✅ 内容本身有价值 (作为知识库)
- ✅ 代码示例丰富

**建议**:
这个文件不应该作为 Skill，而应该:
1. 改名为 `arkts-reference`
2. 放在 `docs/` 或 `references/` 目录
3. 创建一个新的 `arkts-code-reviewer` Skill 来使用这些知识

## 审查结论

❌ **拒绝** - 需要重大重构后重新审查

### 重构路径

**选项 A: 改造为真正的 Skill**
1. 删除所有理论知识 (90% 内容)
2. 保留核心检查规则
3. 添加完整工作流程
4. 创建检查清单和决策树
5. 详细内容移至 references/

**选项 B: 作为知识库保留**
1. 重命名为 `arkts-language-reference`
2. 移到 `docs/arkts/` 目录
3. 创建新的 Skill 来引用此知识库

### 学习要点

通过这个案例，我们学习到:

1. **Skill ≠ 知识库**
   - Skill 教 AI"做事"
   - 知识库教 AI"知识"

2. **描述很重要**
   - 必须包含 what + when
   - 使用第三人称
   - 长度适中 (100-500 字符)

3. **可操作性是核心**
   - 必须有工作流程
   - 必须有检查清单
   - 复杂技能要有决策树

4. **渐进式披露**
   - SKILL.md 保持精简
   - 详细内容放 references/
   - 按需加载
```

---

## 示例 3: 混合型 Skill - pdf-helper

### 待审查 Skill

```yaml
---
name: pdf-helper
description: I can help you process PDF files including text extraction, form filling, and merging documents.
---

# PDF Helper

## What I Do

I'm a helpful assistant for all PDF-related tasks. I have extensive 
knowledge about PDF processing libraries, best practices, and common 
pitfalls...

## My Capabilities

1. Text extraction from PDFs
2. Form filling
3. Merging multiple PDFs
4. Splitting PDFs
5. Adding watermarks
... (详细描述每个能力)

## How to Use Me

Just ask me to help with any PDF task!
```

### 审查报告

```markdown
# Skill 审查报告

## 基本信息
- **Skill 名称**: pdf-helper
- **审查时间**: 2026-03-17
- **总体评分**: 2.5/5 ⭐⭐

## 问题汇总
- **Critical**: 2 个
- **Warning**: 3 个
- **Info**: 1 个

## 维度评分
| 维度 | 得分 | 说明 |
|------|------|------|
| 格式规范性 | 3/5 | name 可以，description 有问题 |
| 内容职责 | 2/5 | 混合型，部分知识部分操作 |
| 可操作性 | 2/5 | 缺少具体流程 |
| 组织结构 | 3/5 | 基本清晰但可改进 |
| **综合评分** | **2.5/5** | 需要较多改进 |

## Critical 问题

### 1. description 使用第一人称
- **位置**: YAML frontmatter
- **问题**: "I can help you..." - 使用了第一人称
- **影响**: 不符合 Agent Skills 规范
- **修复建议**: 
  ```yaml
  # 当前
  description: I can help you process PDF files...
  
  # 应该改为
  description: Extract text and tables from PDF files, fill forms, 
  merge documents. Use when working with PDFs or when the user 
  mentions PDF processing tasks.
  ```

### 2. 缺少明确的工作流程
- **位置**: SKILL.md 正文
- **问题**: "How to Use Me"部分只说"Just ask me",没有具体步骤
- **修复建议**: 添加详细的操作流程:
  ```markdown
  ## PDF Processing Workflow
  
  ### Task 1: Text Extraction
  
  Input: PDF file path
  Process:
  1. Validate file exists
  2. Check file is valid PDF
  3. Use pdfplumber for extraction
  4. Handle errors gracefully
  Output: Extracted text in Markdown format
  
  ### Task 2: Form Filling
  
  Input: PDF form + data dictionary
  Process:
  1. Load PDF form
  2. Map data to form fields
  3. Fill each field
  4. Save filled form
  Output: Completed PDF file
  ```

## Warning 问题

### 1. 包含"什么是"的知识库内容
- **问题**: "What I Do"部分介绍了大量背景知识
- **建议**: 移至 references/pdf-concepts.md

### 2. 能力描述过于笼统
- **问题**: "My Capabilities"只是罗列，没有说明如何做
- **建议**: 为每个能力添加:
  - 输入要求
  - 处理步骤
  - 输出格式
  - 常见错误处理

### 3. 没有检查清单
- **问题**: 无法验证是否正确执行
- **建议**: 添加任务检查清单:
  ```markdown
  ## Pre-flight Checklist
  
  Before processing PDF:
  - [ ] File exists and is readable
  - [ ] File has .pdf extension
  - [ ] File is not corrupted
  - [ ] Required libraries installed
  ```

## Info 问题

### 1. 未指定 license 和 metadata
- **建议**: 添加完整元数据

## 整体评价

这是一个"混合型"Skill - 既有知识也有指令，但都不够完善。

**主要问题**:
- ❌ description 不规范
- ❌ 工作流程太简略
- ❌ 包含了不必要的知识介绍
- ❌ 缺少检查清单

**优点**:
- ✅ name 格式正确
- ✅ 能力范围清晰
- ✅ 有一定可操作性

**改进方向**:
1. 重写 description (第三人称 + what/when)
2. 扩展工作流程 (详细步骤)
3. 删除知识介绍 (或移至 references/)
4. 添加检查清单和错误处理

## 审查结论

⚠️ **有条件通过** - 修复 Critical 问题后可合并

### 必须完成 (Before Merge)
- [ ] 修复 description 第一人称问题
- [ ] 添加详细的工作流程
- [ ] 为每个任务提供输入/输出说明

### 建议完成 (Recommended)
- [ ] 移除"What I Do"知识介绍
- [ ] 添加任务前检查清单
- [ ] 补充错误处理流程
- [ ] 创建 references/目录

### 修改后复核

修复上述问题后重新审查，预期评分可达 4/5。
```

---

## 总结：三类典型问题

通过以上三个案例，我们看到三种典型情况:

### 1. 优秀型 (5 分)
- ✅ 元数据规范
- ✅ 纯任务导向
- ✅ 完整工作流程
- ✅ 清晰检查清单
- ✅ 合理组织结构

**行动**: 直接通过，作为模板

### 2. 知识库型 (1-2 分)
- ❌ 纯知识罗列
- ❌ 无可操作性
- ❌ 缺少工作流程
- ❌ 元数据可能违规

**行动**: 拒绝，建议重构为 Skill 或改作知识库

### 3. 混合型 (2-3 分)
- ⚠️ 知识和指令混合
- ⚠️ 流程不够详细
- ⚠️ 元数据有小问题
- ✅ 有一定可操作性

**行动**: 有条件通过，修复关键问题

---

## 练习：审查这个 Skill

请尝试审查以下 Skill:

```yaml
---
name: ts-migration
description: Help migrate TypeScript code to ArkTS.
---

# TypeScript to ArkTS Migration

## Migration Steps

1. Remove any types
2. Add type annotations
3. Replace var with let
4. Fix decorator usage

## Common Changes

- `var x = 10` → `let x: number = 10`
- `let x: any` → `let x: SpecificType`
- Destructuring → Explicit assignment
```

**思考题**:
1. 这个 Skill 的 description 有什么问题？
2. 工作流程是否足够详细？
3. 缺少什么重要元素？
4. 你会给出什么评分和建议？

(答案见下一节)

---

## 练习答案

```markdown
# 练习审查报告

## 问题识别

### Critical
1. **description 太简单** - 只有 48 字符，缺少 when 说明
2. **工作流程不完整** - 只有 4 步，缺少错误处理、验证等

### Warning  
1. **缺少检查清单** - 没有验证步骤
2. **没有决策树** - 遇到问题怎么办？
3. **缺少 references** - 详细规则在哪里？

### Info
1. 未指定 license
2. 未指定 metadata

## 评分
- 格式规范性：3/5
- 内容职责：3/5
- 可操作性：2/5
- 组织结构：2/5
- 综合评分：2.5/5

## 结论
⚠️ 有条件通过 - 需要补充详细流程和检查清单
```

---

通过这些真实案例，希望你能掌握 Skill 审查的核心要点！
