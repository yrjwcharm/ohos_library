---
name: refactoring
description: "Safe ArkTS code refactoring using LSP-powered reference finding. Use when: (1) renaming a function/class/variable, (2) moving code between files, (3) deleting code and verifying no remaining usage, (4) analyzing call graphs, (5) understanding symbol type info. Triggers: refactor, rename, find references, find usages, move function, safe delete, call hierarchy, impact analysis, 重构, 重命名, 引用查找, 调用链"
user-invocable: true
mcpServers:
  - mcp_arkts_lsp
---

# ArkTS Safe Refactoring

通过 LSP language server 精确分析代码引用关系，确保重构安全。

## 可用工具

| 工具 | 用途 |
|------|------|
| `mcp_arkts_lsp-find_references(file, line, column)` | 找到符号的所有引用位置 |
| `mcp_arkts_lsp-go_to_definition(file, line, column)` | 跳转到符号定义 |
| `mcp_arkts_lsp-get_hover(file, line, column)` | 获取符号类型和文档信息 |
| `mcp_arkts_lsp-list_symbols(file)` | 列出文件中所有符号 |
| `mcp_arkts_lsp-find_call_hierarchy(file, line, column, direction)` | 分析调用链（incoming/outgoing） |

**注意**：line 和 column 参数都是 1-based（与编辑器显示一致）。

## 重构工作流

### 1. 重命名符号

```
1. get_hover(file, line, column)        → 确认符号类型
2. go_to_definition(file, line, column) → 找到定义位置
3. find_references(file, line, column)  → 找到所有引用
4. 检查引用列表，确认范围
5. 逐个修改所有引用位置
6. 再次 find_references 验证无遗漏
7. 构建验证
```

### 2. 移动/提取代码

```
1. list_symbols(file)                    → 了解文件结构
2. find_references(file, line, column)   → 找到要移动符号的所有使用方
3. find_call_hierarchy(file, line, col, 'incoming')  → 谁调用了它
4. find_call_hierarchy(file, line, col, 'outgoing')  → 它调用了谁
5. 基于以上信息决定移动方案
6. 执行移动，更新所有 import 路径
7. 构建验证
```

### 3. 安全删除

```
1. find_references(file, line, column)  → 确认没有其他使用方
2. 如果引用数 == 1（仅定义自身），可安全删除
3. 如果有其他引用，报告给用户决策
```

## 关键原则

- **永远先 find_references 再修改**，不要依赖文本搜索
- **修改后再次 find_references 验证**，确保没有遗漏
- **注意 re-export**：如果符号被 re-export，需要追踪 re-export 链
- **注意 import 路径**：移动文件后所有 import 都需要更新
