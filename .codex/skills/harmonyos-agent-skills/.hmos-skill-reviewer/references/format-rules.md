# Skill 格式规范性审查详细规则

本文档定义了格式审查的所有详细规则和检查项，供 AI 在执行审查时参考。

---

## 一、name 字段审查规则

### 1.1 字符合法性检查

**允许的字符合集:**
- ✅ 小写字母：a-z
- ✅ 数字：0-9
- ✅ 连字符：- (只能在中间)

**正则表达式验证:**
```regex
^[a-z0-9-]+$
```

**违规示例:**
```yaml
❌ Skill-Name        # 包含大写字母
❌ skill_name        # 使用下划线
❌ skill.name        # 包含点号
❌ skill name        # 包含空格
```

**修复方法:**
```yaml
# 改为全小写 + 连字符
skill-name
```

---

### 1.2 长度限制

**规范要求:**
- 最小长度：1 字符
- 最大长度：64 字符
- 推荐长度：10-40 字符

**计算示例:**
```yaml
✅ code-review       # 11 字符
✅ pdf-processing    # 15 字符
⚠️ my-super-amazing-tool-for-processing-pdf-files-with-advanced-features  # 63 字符 (太长)
```

---

### 1.3 格式约束

**禁止的模式:**
```yaml
❌ -skill            # 以连字符开头
❌ skill-            # 以连字符结尾
❌ skill--name       # 连续连字符
❌ skill---test      # 多个连续连字符
```

**正确的模式:**
```yaml
✅ skill-name
✅ skill-name-v2     # 虽然有 v2 但不推荐
✅ my-skill-123
```

---

### 1.4 命名一致性

**必须与目录名一致:**
```bash
# 目录结构
skills/code-review/
└── SKILL.md        # ✅ name: code-review

skills/pdf-helper/
└── SKILL.md        # ❌ name: PDF-Helper (不一致)
```

**常见错误:**
- 目录名：`code-review`
- name 字段：`Code-Review` (大小写不一致)
- name 字段：`code_review` (使用了下划线)

---

### 1.5 版本信息处理

**不推荐包含版本号:**
```yaml
❌ name: my-skill-v2
❌ name: pdf-tool-1.0
❌ name: code-review-v2-final
```

**原因:**
- Skill 应该持续改进，不需要版本标记
- 版本信息应该在 metadata.version 中
- 避免混淆 (v2 可能比 v1 旧)

**正确做法:**
```yaml
name: my-skill
metadata:
  version: "2.0.0"  # 在这里标记版本
```

---

## 二、description 字段审查规则

### 2.1 内容要求

**必须包含三个要素:**
1. **What** - 做什么 (功能描述)
2. **When** - 何时使用 (触发场景)
3. **How** - 如何做 (核心能力，可选但推荐)

**优秀模板:**
```markdown
[动词 ing 形式] [目标对象] for [目的]. 
Use when [场景 1], [场景 2], or [场景 3]. 
Provides [具体能力 1], [具体能力 2], and [具体能力 3].
```

**实际应用:**
```yaml
✅ Extract text and tables from PDF files, fill forms, merge documents. 
   Use when working with PDF documents or when the user mentions PDFs, 
   forms, or document extraction. Provides structured output in JSON or 
   Markdown format.
```

---

### 2.2 人称规范

**必须使用第三人称:**
```yaml
❌ I can help you process PDF files...          # 第一人称
❌ You can use this skill to review code...     # 第二人称
❌ My skill provides...                         # 第一人称

✅ Processes PDF files and extracts data...    # 第三人称
✅ Reviews code for quality issues...           # 第三人称
✅ Provides actionable feedback on...           # 第三人称
```

**为什么:**
- Skill 是工具，不是人
- 保持专业性和客观性
- 符合 Agent Skills开放标准

---

### 2.3 触发场景关键词

**推荐包含的触发词:**
```
Use when...
For...
When...
To...
```

**示例对比:**
```yaml
# ❌ 缺少触发场景
description: A tool for code review.

# ✅ 包含触发场景
description: Review code for quality, security, and maintainability. 
Use when reviewing pull requests, examining code changes, or when the 
user asks for a code review.
```

---

### 2.4 动作词使用

**推荐的动作词:**
```
review, check, validate, verify, analyze,
generate, create, build, produce, extract,
process, convert, transform, migrate,
optimize, improve, enhance, fix, debug
```

**示例:**
```yaml
✅ Validates ArkTS code for type safety
✅ Generates API documentation from source code
✅ Migrates TypeScript projects to ArkTS
✅ Optimizes performance bottlenecks
```

**避免的模糊词汇:**
```
help, assist, support, provide (单独使用)
```

---

### 2.5 长度控制

**推荐长度:**
- 最小：50 字符 (确保清晰)
- 最大：1024 字符 (规范限制)
- 理想：150-400 字符

**过短的问题:**
```yaml
# ❌ 太简单 (15 字符)
description: Helps with PDFs.

# 应该扩展为 (286 字符)
description: Extract text and tables from PDF files, fill forms, 
merge documents. Use when working with PDF documents or when the 
user mentions PDFs, forms, or document extraction. Supports batch 
processing and automated workflows.
```

---

## 三、可选字段审查规则

### 3.1 license 字段

**推荐格式:**
```yaml
# 简短许可证名称
license: MIT
license: Apache-2.0
license: GPL-3.0

# 或指向文件
license: See LICENSE file
```

**不建议:**
```yaml
# ❌ 太长 (>200 字符)
license: This software is provided under a very complex license that 
says you can use it freely but you cannot sell it or modify it without 
permission and there are many other restrictions...
```

---

### 3.2 metadata 字段

**推荐字段:**
```yaml
metadata:
  author: your-github-username
  version: "1.0.0"           # 语义化版本
  created: "2026-03-17"
  updated: "2026-03-17"
  homepage: https://github.com/...
  keywords: ["pdf", "document", "extraction"]
```

**version 格式规范:**
```yaml
✅ version: "1.0.0"          # 语义化版本 (主版本。次版本。修订号)
✅ version: "2.1.3-beta"     # 预发布版本
❌ version: 1.0              # 缺少修订号
❌ version: v1.0.0           # 不应该有'v'前缀
```

---

### 3.3 compatibility 字段

**适用场景:**
- 需要特定系统包
- 需要网络访问
- 仅适用于特定产品
- 有特殊运行环境要求

**示例:**
```yaml
✅ compatibility: Designed for Claude Code. Requires Python 3.8+ for scripts.
✅ compatibility: Requires git, docker, jq, and access to the internet
✅ compatibility: Only works with HarmonyOS SDK version 10+
```

**长度限制:**
- 最大：500 字符
- 推荐：100-300 字符

---

### 3.4 allowed-tools 字段 (实验性)

**用途:**
指定技能可以使用的预批准工具列表。

**示例:**
```yaml
allowed-tools: Bash(git:*) Bash(jq:*) Read Write
```

**注意:**
- 这是实验性功能
- 不是所有 Agent 都支持
- 谨慎使用，避免过度限制

---

## 四、文件大小审查规则

### 4.1 SKILL.md行数限制

**标准:**
```
✅ 优秀：< 500 行
⚠️ 警告：500-800 行
❌ 过大：> 800 行
```

**为什么限制:**
- 上下文窗口有限且宝贵
- 便于快速理解和维护
- 促进渐进式披露

**超过 800 行的处理:**
1. 识别可以移至 references/的内容
2. 删除冗余和重复
3. 简化示例代码
4. 压缩理论解释

---

### 4.2 内容分布建议

**理想的 SKILL.md 内容比例:**
```
工作流程        40%  ← 核心指令
检查清单        25%  ← 可操作部分
决策树          15%  ← 判断逻辑
快速参考        10%  ← 速查表
引用链接        10%  ← 指向 references/
```

**不应该在 SKILL.md 的内容:**
- ❌ 长篇理论知识 (>200 行)
- ❌ 完整的 API 文档
- ❌ 大量的代码示例 (>10 个)
- ❌ 历史背景和演进
- ❌ 详细的概念解释

**应该移至 references/:**
- ✅ 语言规范详情
- ✅ API 参数说明
- ✅ 完整示例集合
- ✅ 理论背景知识
- ✅ 扩展阅读材料

---

## 五、其他格式检查项

### 5.1 YAML frontmatter 格式

**必须遵守:**
```yaml
---                    # 必须以 --- 开头
name: skill-name
description: ...
license: ...
---                    # 必须以 --- 结束 (空行)

# 正文开始
# Skill 内容...
```

**常见错误:**
```yaml
# ❌ 缺少结束的 ---
---
name: test
description: ...
# 直接开始正文

# ❌ 前后有空格
 ---
name: test
--- 

# ❌ 缩进错误
---
  name: test
  description: ...
---
```

---

### 5.2 Markdown 标题层级

**推荐的标题结构:**
```markdown
# Skill Name         # H1 - 只有一个
## Section           # H2 - 主要章节
### Subsection       # H3 - 子章节
#### Details         # H4 - 详细信息
```

**避免:**
- 跳过层级 (H1 直接到 H3)
- 过多层级 (>4 层)
- 标题过长 (>80 字符)

---

### 5.3 代码块格式

**推荐:**
````markdown
```yaml
# 标注语言类型
name: example
```

# 添加注释说明
This code demonstrates...
````

**避免:**
````markdown
# ❌ 未标注语言
```
code here
```

# ❌ 没有说明的大段代码
[100 行代码没有解释]
````

---

## 六、自动化检查脚本集成

### 6.1 Bash 脚本检查项

对应关系:
| 检查项 | 脚本实现 |
|--------|---------|
| name 格式 | `grep "^name:"` + 正则验证 |
| name 长度 | `${#name} -gt 64` |
| description 存在 | `grep "^description:"` |
| 文件大小 | `wc -l < SKILL.md` |
| 工作流程 | `grep -i "workflow\|流程"` |
| 检查清单 | `grep "\- \[ \]"` |

### 6.2 Python 脚本检查项

使用 PyYAML 库深度验证:
```python
import yaml

with open('SKILL.md', 'r') as f:
    frontmatter = yaml.safe_load(f)

# 验证 name
validate_name(frontmatter['name'])

# 验证 description  
validate_description(frontmatter['description'])

# 验证 metadata
validate_metadata(frontmatter.get('metadata', {}))
```

---

## 七、常见问题 FAQ

### Q1: name 可以使用驼峰命名吗？
**A:** ❌ 不可以。只能使用小写字母、数字和连字符。

### Q2: description 可以多长？
**A:** 最多 1024 字符，但推荐 150-400 字符。

### Q3: 必须添加 license 吗？
**A:** 不强制，但强烈建议添加。

### Q4: metadata 是必需的吗？
**A:** 不必需，但推荐包含 author 和 version。

### Q5: 如何判断 SKILL.md 是否过大？
**A:** 超过 500 行就应该考虑拆分，超过 800 行必须优化。

---

## 八、检查清单模板

审查时使用的完整清单:

```markdown
### name 字段检查
- [ ] 只包含小写字母、数字、连字符
- [ ] 不以连字符开头或结尾
- [ ] 无连续连字符
- [ ] 长度 ≤ 64 字符
- [ ] 与目录名一致
- [ ] 不包含版本号

### description 字段检查
- [ ] 使用第三人称
- [ ] 包含 what(做什么)
- [ ] 包含 when(何时使用)
- [ ] 长度 50-1024 字符
- [ ] 包含具体动作词
- [ ] 非空且有实际内容

### 可选字段检查
- [ ] license 简短明确 (如有)
- [ ] metadata 格式正确 (如有)
- [ ] compatibility ≤ 500 字符 (如有)

### 文件大小检查
- [ ] SKILL.md < 500 行
- [ ] 无超长代码块
- [ ] 无冗余内容
```

---

**最后更新**: 2026-03-17  
**版本**: 1.0.0  
**维护者**: skill-reviewer team
