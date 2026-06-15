# ArkTS LSP MCP 配置指南

提供 LSP 驱动的代码导航能力（引用查找、定义跳转、类型信息），用于安全重构。

---

## macOS/Linux 配置

```json
{
  "mcpServers": {
    "mcp_arkts_lsp": {
      "command": "bash",
      "args": ["<arkts_lsp_path>/start.sh"],
      "env": {
        "DEVECO_PATH": "/Applications/DevEco-Studio.app",
        "PROJECT_PATH": "${workspaceFolder:-$(pwd)}"
      }
    }
  }
}
```

---

## Windows 配置

```json
{
  "mcpServers": {
    "mcp_arkts_lsp": {
      "command": "node",
      "args": ["<arkts_lsp_path>\\dist\\index.js"],
      "env": {
        "DEVECO_PATH": "C:\\Program Files\\Huawei\\DevEco Studio",
        "PROJECT_PATH": "${workspaceFolder}"
      }
    }
  }
}
```

---

## 使用说明

### 启用前准备

1. 安装 ArkTS LSP MCP 服务器：
   - 从官方渠道获取 arkts-lsp-mcp 包
   - 或从项目仓库下载

2. 确认 DevEco Studio 安装路径：
   - macOS：默认 `/Applications/DevEco-Studio.app`
   - Windows：默认 `C:\Program Files\Huawei\DevEco Studio`

3. 确认项目路径：
   - VSCode 会自动注入 `${workspaceFolder}`
   - 其他环境使用 `${workspaceFolder:-$(pwd)}` 自动检测

### 功能列表

| 功能 | 工具名称 | 说明 |
|------|----------|------|
| 定义跳转 | `goto_definition` | 跳转到符号定义位置 |
| 引用查找 | `find_references` | 查找符号的所有引用 |
| 类型信息 | `get_type_info` | 获取符号的类型信息 |
| 符号搜索 | `search_symbols` | 搜索项目中的符号 |

### 常见问题

**Q: LSP 服务器启动失败**
- 检查 DEVECO_PATH 是否正确
- 检查 PROJECT_PATH 是否指向有效的 HarmonyOS 项目
- 检查 Node.js 版本（Windows 需要 Node.js 运行环境）

**Q: 找不到定义位置**
- 确认文件已保存
- 等待 LSP 索引完成（首次启动需要时间）
- 检查符号是否在项目范围内

---

## 与 refactoring skill 配合使用

当启用 ArkTS LSP MCP 后，`refactoring` skill 会自动使用 LSP 工具进行：

1. **安全重命名**：查找所有引用，批量更新
2. **安全删除**：检查是否有引用，确认无使用后再删除
3. **代码移动**：跟踪依赖关系，确保移动后引用正确
4. **调用链分析**：分析函数调用关系，影响范围评估

---

## 性能优化建议

1. **减少项目体积**：避免在 LSP 路径中包含大量非源码文件
2. **使用 exclude 配置**：排除 `node_modules`、`build`、`.git` 等目录
3. **定期重启 LSP**：长时间运行后索引可能不准确
4. **增量更新**：修改后保存文件，让 LSP 自动更新索引