# Scripts目录说明

## setup.js
用于查找DevEco Studio安装路径并生成配置文件的辅助脚本。

### 功能
- 自动查找DevEco Studio安装路径（Windows/macOS/Linux）
- 获取emulator和hdc工具的完整路径
- 查找模拟器部署路径
- 自动生成 config.json 配置文件
- 列出可用的模拟器实例

### 使用方法
```bash
node scripts/setup.js
```

### 输出示例
```
HarmonyOS开发工具配置助手
==================================================
✓ 找到DevEco Studio: <你的DevEco Studio路径>
✓ Emulator路径: <你的DevEco Studio路径>\tools\emulator\emulator.exe
✓ HDC路径: <你的DevEco Studio路径>\sdk\default\openharmony\toolchains\hdc.exe

可用模拟器 (2):
  1. <你的实例名1>
  2. <你的实例名2>

提示：将以下路径添加到PATH环境变量可全局使用命令:
  - <你的DevEco Studio路径>\tools\emulator
  - <你的DevEco Studio路径>\sdk\default\openharmony\toolchains
```

---

## config.json

配置文件，包含以下路径信息：
- `devecoStudioPath`: DevEco Studio安装路径
- `emulatorPath`: Emulator可执行文件路径
- `hdcPath`: HDC可执行文件路径
- `emulatorDeployPath`: 模拟器部署目录

---

## 日志分析脚本（已迁移）

以下脚本已迁移到 **deveco-studio-hilog** skill：

- `extract_gz.js` - 解压.gz文件
- `analyze_crash_log.js` - 崩溃日志分析（JavaScript）
- `analyze-crash-log.ps1` - 崩溃日志分析（PowerShell）
- `analyze_manual_log.js` - 手动日志分析（JavaScript）
- `analyze-manual-log.ps1` - 手动日志分析（PowerShell）
- `README_MACOS.md` - macOS/Linux使用说明

**使用方式**：当需要日志分析功能时，请使用 deveco-studio-hilog skill。

---

## 常见问题

### PowerShell执行策略错误

如果遇到"无法加载文件，因为在此系统上禁止运行脚本"的错误，需要设置执行策略：

```powershell
# 查看当前执行策略
Get-ExecutionPolicy

# 设置执行策略为RemoteSigned（推荐）
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```