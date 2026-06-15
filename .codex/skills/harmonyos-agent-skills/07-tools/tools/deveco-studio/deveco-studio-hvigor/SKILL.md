---
name: deveco-studio-hvigor
description: HarmonyOS应用构建工具助手，专注于使用Hvigor命令行工具构建HarmonyOS应用。包含完整的构建命令、参数说明、清理操作和CI/CD集成指南。触发词：hvigor、构建、编译、assembleHap、clean、build。
license: MIT
metadata:
  author: HarmonyOS Agent Skills Team
  version: "1.1.0"
compatibility: Designed for DevEco Studio. Requires Node.js 14.18.3+. Depends on deveco-studio-emulator skill for DevEco Studio path configuration.
---

# HarmonyOS应用构建工具助手

专注于使用Hvigor命令行工具构建HarmonyOS应用。包含完整的构建命令、参数说明、清理操作和CI/CD集成指南。

## 快速导航

| 功能模块 | 说明 | 参考文档 |
|---------|------|---------|
| **环境配置** | DevEco Studio路径配置（依赖emulator skill） | 本页 "环境配置" 章节 |
| **构建命令** | HAP/APP/HSP/HAR构建命令 | 本页 "基本构建命令" 章节 |
| **参数说明** | 构建参数详解 | 本页 "构建参数详解" 章节 |
| **清理操作** | clean、stop-daemon | 本页 "清理操作" 章节 |
| **常见问题** | 构建失败解决方案 | 本页 "常见问题" 章节 |

---

## 环境配置（必做）

### 配置依赖说明

本skill的路径配置**优先依赖** `deveco-studio-emulator` skill的配置：

1. **优先级1**：读取 `../deveco-studio-emulator/scripts/config.json`
2. **优先级2**：如果配置不存在，运行 `node ../deveco-studio-emulator/scripts/setup.js`
3. **优先级3**：环境变量 `DEVECO_STUDIO_PATH`

### 关键路径说明

**重要**：hvigorw 工具不在项目根目录，而是在 DevEco Studio 的 tools 目录下：

| 路径 | 说明 | 示例 |
|------|------|------|
| **DevEco Studio 路径** | DevEco Studio 安装目录 | Windows: `C:\Program Files\Huawei\DevEco Studio`<br>macOS: `/Applications/DevEco-Studio.app/Contents` |
| **hvigorw.js 路径** | Hvigor wrapper 脚本 | `<DevEco Studio>/tools/hvigor/bin/hvigorw.js` |
| **hvigorw.bat 路径** | Windows 批处理脚本 | `<DevEco Studio>/tools/hvigor/bin/hvigorw.bat` |
| **Node.js 路径** | Node 可执行文件 | `<DevEco Studio>/tools/node/node.exe` |
| **JRE 路径** | Java运行环境 | `<DevEco Studio>/jbr` |
| **Harmony SDK 路径** | HarmonyOS SDK | `<DevEco Studio>/sdk/default/openharmony` |

---

## 快速开始

### 方式1：使用 node 执行 hvigorw.js（推荐）

**Windows:**
```bash
# 进入项目根目录
cd <项目路径>

# 构建HAP包（Debug模式）
node "C:\Program Files\Huawei\DevEco Studio\tools\hvigor\bin\hvigorw.js" assembleHap --mode module -p module=entry@default -p buildMode=debug --no-daemon

# 构建HAP包（Release模式）
node "C:\Program Files\Huawei\DevEco Studio\tools\hvigor\bin\hvigorw.js" assembleHap --mode module -p module=entry@default -p buildMode=release --no-daemon

# 构建APP分发包
node "C:\Program Files\Huawei\DevEco Studio\tools\hvigor\bin\hvigorw.js" assembleApp --mode project -p product=default --no-daemon
```

**macOS:**
```bash
# 进入项目根目录
cd <项目路径>

# 构建HAP包（Debug模式）
node "/Applications/DevEco-Studio.app/Contents/tools/hvigor/bin/hvigorw.js" assembleHap --mode module -p module=entry@default -p buildMode=debug --daemon

# 构建HAP包（Release模式）
node "/Applications/DevEco-Studio.app/Contents/tools/hvigor/bin/hvigorw.js" assembleHap --mode module -p module=entry@default -p buildMode=release --daemon

# 构建APP分发包
node "/Applications/DevEco-Studio.app/Contents/tools/hvigor/bin/hvigorw.js" assembleApp --mode project -p product=default --daemon
```

### 方式2：使用 hvigorw.bat（Windows）

```powershell
# 进入项目根目录
cd <项目路径>

# 构建HAP包（Debug模式）
& "C:\Program Files\Huawei\DevEco Studio\tools\hvigor\bin\hvigorw.bat" assembleHap --mode module -p module=entry@default -p buildMode=debug --no-daemon

# 构建HAP包（Release模式）
& "C:\Program Files\Huawei\DevEco Studio\tools\hvigor\bin\hvigorw.bat" assembleHap --mode module -p module=entry@default -p buildMode=release --no-daemon

# 构建APP分发包
& "C:\Program Files\Huawei\DevEco Studio\tools\hvigor\bin\hvigorw.bat" assembleApp --mode project -p product=default --no-daemon
```

---

## 环境要求

### 必需环境

- **操作系统**：Windows 10/11 或 macOS 10.15+（推荐）
- **Node.js**：v14.18.3及以上版本（必需）
- **DevEco Studio**：鸿蒙官方IDE（必需，提供 hvigorw 工具）

### 可选环境

- **Python**：3.8+（部分插件依赖）
- **Java**：JRE 11+（部分构建任务依赖）

### 检查环境

#### ✅ 必做：设置环境变量（构建前必须完成！）

```powershell
# ========== Windows PowerShell ==========
# 设置 DevEco Studio 路径
$env:DEVECO_STUDIO_PATH = "D:\AI\DevEco Studio"

# ⚠️ 关键：设置 DEVECO_SDK_HOME（构建前必须设置！）
$env:DEVECO_SDK_HOME = "$env:DEVECO_STUDIO_PATH\sdk"

# 可选：设置 JAVA_HOME（部分构建任务需要）
$env:JAVA_HOME = "$env:DEVECO_STUDIO_PATH\jbr"

# 验证设置
Write-Host "DEVECO_STUDIO_PATH: $env:DEVECO_STUDIO_PATH"
Write-Host "DEVECO_SDK_HOME: $env:DEVECO_SDK_HOME"
```

```bash
# ========== macOS/Linux ==========
# 设置 DevEco Studio 路径
export DEVECO_STUDIO_PATH="/Applications/DevEco-Studio.app/Contents"

# ⚠️ 关键：设置 DEVECO_SDK_HOME（构建前必须设置！）
export DEVECO_SDK_HOME="$DEVECO_STUDIO_PATH/sdk"

# 可选：设置 JAVA_HOME（部分构建任务需要）
export JAVA_HOME="$DEVECO_STUDIO_PATH/jbr"

# 验证设置
echo "DEVECO_STUDIO_PATH: $DEVECO_STUDIO_PATH"
echo "DEVECO_SDK_HOME: $DEVECO_SDK_HOME"
```

#### 检查工具版本

```bash
# 检查Node.js版本
node -v

# 检查Hvigor版本（Windows）
node "$env:DEVECO_STUDIO_PATH/tools/hvigor/bin/hvigorw.js" --version

# 检查Hvigor版本（macOS/Linux）
node "$DEVECO_STUDIO_PATH/tools/hvigor/bin/hvigorw.js" --version

# 检查DevEco Studio路径配置
node ../deveco-studio-emulator/scripts/setup.js --use-existing
```

---

## 项目配置文件

Hvigor项目包含以下关键配置文件：

| 文件 | 说明 | 位置 |
|------|------|------|
| `hvigorfile.ts` | 构建任务配置文件 | 项目根目录、模块目录 |
| `hvigor/hvigor-config.json5` | Hvigor配置文件 | 项目根目录 |
| `build-profile.json5` | 构建配置文件（签名、产品、模块） | 项目根目录、模块目录 |
| `oh-package.json5` | OpenHarmony包配置 | 项目根目录、模块目录 |

---

## 基本构建命令

### 构建任务命令

| 命令 | 说明 | 参数示例 |
|------|------|---------|
| `assembleHap` | 构建HAP应用包（鸿蒙应用安装包） | `--mode module -p module=entry@default` |
| `assembleApp` | 构建APP应用包（上架分发包） | `--mode project -p product=default` |
| `assembleHsp` | 构建HSP包（动态共享包） | `--mode module -p module=shared@default` |
| `assembleHar` | 构建HAR包（静态共享包） | `--mode module -p module=lib@default` |
| `clean` | 清理构建产物 | 无额外参数 |
| `tasks` | 打印工程各模块包含的任务信息 | 无额外参数 |
| `taskTree` | 打印工程各模块的任务依赖关系信息 | 无额外参数 |

### 查询命令

| 命令 | 说明 |
|------|------|
| `-h` 或 `--help` | 打印hvigor的命令帮助信息 |
| `-v` 或 `--version` | 打印hvigor版本信息 |

---

## 构建参数详解

### 构建模式 (--mode)

| 参数值 | 说明 | 使用场景 |
|--------|------|---------|
| `module` | 构建特定模块 | 构建单个模块的HAP/HSP/HAR |
| `project` | 构建整个项目 | 构建APP分发包 |

### 模块参数 (-p module)

格式：`模块名@Target名`

示例：
```bash
# 构建entry模块的default target
-p module=entry@default

# 构建entry模块的所有target
-p module=entry

# 构建多个模块（用逗号分隔）
-p module=entry@default,shared@default
```

### 产品参数 (-p product)

仅在构建整个项目时有效：

```bash
# 构建default产品
-p product=default

# 构建自定义产品（在build-profile.json5中定义）
-p product=release
```

### 构建模式参数 (-p buildMode)

| 参数值 | 说明 |
|--------|------|
| `debug` | Debug模式（调试构建） |
| `release` | Release模式（发布构建） |

### Daemon参数

| 参数 | 说明 | 推荐 |
|------|------|------|
| `--no-daemon` | 不使用daemon进程 | Windows推荐（避免进程残留） |
| `--daemon` | 使用daemon进程 | macOS推荐（加速构建） |

### 其他参数

| 参数 | 说明 |
|------|------|
| `-p debugLine=true` | 启用调试行号（用于Inspector源码跳转） |
| `--sync` | 同步项目（下载依赖） |
| `--analyze=normal` | 分析模式 |
| `--parallel` | 并行构建 |
| `--incremental` | 增量构建 |

---

## 清理操作

### 清理构建产物

```bash
# 清理构建产物
node "<DevEco Studio>/tools/hvigor/bin/hvigorw.js" clean --no-daemon
```

### 停止daemon进程

```bash
# 停止daemon进程
node "<DevEco Studio>/tools/hvigor/bin/hvigorw.js" --stop-daemon
```

---

## 完整工作流程

### 构建HAP包流程

```bash
# 1. 进入项目根目录
cd <项目路径>

# 2. 清理构建产物（可选）
node "<DevEco Studio>/tools/hvigor/bin/hvigorw.js" clean --no-daemon

# 3. 构建HAP包（Debug模式）
node "<DevEco Studio>/tools/hvigor/bin/hvigorw.js" assembleHap --mode module -p module=entry@default -p buildMode=debug --no-daemon

# 4. 查看构建产物
ls entry/build/default/outputs/default/
```

### 构建APP分发包流程

```bash
# 1. 进入项目根目录
cd <项目路径>

# 2. 构建APP包
node "<DevEco Studio>/tools/hvigor/bin/hvigorw.js" assembleApp --mode project -p product=default -p buildMode=release --no-daemon

# 3. 查看构建产物
ls build/outputs/default/
```

---

## 检查清单

### Critical (必须完成)

- [ ] DevEco Studio 已正确安装（Windows/macOS/Linux）
- [ ] hvigorw.js 路径正确：
  - Windows: `C:\Program Files\Huawei\DevEco Studio\tools\hvigor\bin\hvigorw.js`
  - macOS: `/Applications/DevEco-Studio.app/Contents/tools/hvigor/bin/hvigorw.js`
- [ ] Node.js 已安装（v14.18.3+）
- [ ] 项目根目录包含 `build-profile.json5` 和 `hvigorfile.ts`
- [ ] 使用正确的执行方式：`node hvigorw.js` 或 `hvigorw.bat`

### Warning (建议完成)

- [ ] 设置环境变量 `DEVECO_SDK_HOME`（指向 Harmony SDK）
- [ ] 设置环境变量 `JAVA_HOME`（指向 JRE）
- [ ] 在项目根目录执行命令
- [ ] Windows 使用 `--no-daemon` 参数
- [ ] macOS 使用 `--daemon` 参数

### Info (可选改进)

- [ ] 检查构建产物路径：`entry/build/default/outputs/default/`
- [ ] 查看可用任务：`hvigorw tasks`
- [ ] 检查签名配置（`build-profile.json5`）

---

## 决策树

### 构建方式决策树

操作系统？
├─ Windows → 使用 `node hvigorw.js` 或 `hvigorw.bat`
│   ├─ 推荐：`node "<DevEco Studio>/tools/hvigor/bin/hvigorw.js"`
│   └─ 参数：添加 `--no-daemon`
└─ macOS/Linux → 使用 `node hvigorw.js`
    ├─ 推荐：`node "<DevEco Studio>/tools/hvigor/bin/hvigorw.js"`
    └─ 参数：添加 `--daemon`（加速构建）

### 构建目标决策树

构建目标？
├─ 构建HAP包 → 使用 `assembleHap` 任务
│   ├─ 单个模块：`--mode module -p module=entry@default`
│   └─ 多个模块：`--mode module -p module=entry@default,shared@default`
├─ 构建APP包 → 使用 `assembleApp` 任务
│   └─ 整个项目：`--mode project -p product=default`
├─ 构建HSP包 → 使用 `assembleHsp` 任务
│   └─ 共享模块：`--mode module -p module=shared@default`
└─ 构建HAR包 → 使用 `assembleHar` 任务
    └─ 静态库：`--mode module -p module=lib@default`

### 构建失败决策树

失败原因？
├─ 找不到hvigorw命令 → 检查路径配置
│   ├─ 检查 DevEco Studio 路径
│   ├─ 使用 `<DevEco Studio>/tools/hvigor/bin/hvigorw.js`
│   └─ 使用 node 执行：`node hvigorw.js`
├─ Node.js版本不兼容 → 升级 Node.js
│   ├─ 检查版本：`node -v`
│   └─ 升级到 v14.18.3+
├─ 签名配置错误 → 检查签名配置
│   ├─ 检查 `build-profile.json5` 中的 `signingConfigs`
│   └─ 清空签名配置生成未签名HAP
└─ 构建产物找不到 → 检查构建产物路径
    ├─ HAP路径：`entry/build/default/outputs/default/`
    └─ APP路径：`build/outputs/default/`

---

## 常见问题

### 1. 找不到hvigorw命令

**错误信息**：
```
'hvigorw' is not recognized as an internal or external command
```

**解决方案**：
```bash
# 使用正确的路径
node "<DevEco Studio>/tools/hvigor/bin/hvigorw.js" assembleHap --no-daemon

# 或使用批处理脚本（Windows）
& "<DevEco Studio>/tools/hvigor/bin/hvigorw.bat" assembleHap --no-daemon
```

### 2. Node.js版本不兼容

**解决方案**：
```bash
# 检查Node.js版本
node -v

# 如果版本过低，升级到v14.18.3+
nvm install 14.18.3
nvm use 14.18.3
```

### 3. 版本兼容性问题

**错误信息**：
```
ERROR: Unsupported modelVersion of Hvigor 6.1.0.
The supported Hvigor modelVersion is 6.0.2.
```

**解决方案**：
- 统一 `hvigor/hvigor-config.json5` 和 `oh-package.json5` 中的 `modelVersion`
- 统一 `build-profile.json5` 中的 `targetSdkVersion` 和 `compatibleSdkVersion`

### 4. 签名配置错误

**错误信息**：
```
ERROR: Init keystore failed
Error Message: parseAlgParameters failed
```

**解决方案**：
- 检查 `build-profile.json5` 中的签名配置
- 确保证书文件路径正确
- 确保证书密码正确
- 生成未签名HAP进行调试（清空 `signingConfigs`）

### 5. 构建产物找不到

**解决方案**：
- HAP路径：`entry/build/default/outputs/default/entry-default-signed.hap`
- APP路径：`build/outputs/default/{project}-default-unsigned.app`
- 使用 `hvigorw tasks` 查看可用任务

### 6. 增量构建失败

**解决方案**：
```bash
# 清理构建产物
node "<DevEco Studio>/tools/hvigor/bin/hvigorw.js" clean --no-daemon

# 关闭daemon进程
node "<DevEco Studio>/tools/hvigor/bin/hvigorw.js" --stop-daemon

# 重新构建
node "<DevEco Studio>/tools/hvigor/bin/hvigorw.js" assembleHap --mode module -p module=entry@default --no-daemon
```

---

## 参考文档

### 官方文档

- [Hvigor命令行构建应用](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-command-line-building-app)
- [DevEco Studio构建配置](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-build-profile)
- [HarmonyOS应用签名](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-signing)

### 相关skill

- **deveco-studio-emulator**: DevEco Studio路径配置、模拟器管理
- **deveco-studio-hilog**: 应用日志查看、崩溃分析
- **deveco-studio-codelinter**: 代码静态检查