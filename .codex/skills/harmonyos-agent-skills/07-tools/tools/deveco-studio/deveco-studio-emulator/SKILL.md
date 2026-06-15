---
name: deveco-studio-emulator
description: HarmonyOS模拟器管理助手。**首次使用必须先运行 `node scripts/setup.js --force` 配置路径**，然后才能执行模拟器启动、应用安装调试等操作。包含完整的场景化设备控制命令（旋转、电源、截屏、音量、摇一摇、折叠）。支持Windows/macOS/Linux。触发词：模拟器、emulator、hdc、推包、安装应用、启动模拟器、构建推包。
license: MIT
metadata:
  author: HarmonyOS Agent Skills Team
  version: "1.0.0"
compatibility: Designed for DevEco Studio. Requires Node.js 14+.
---

# HarmonyOS模拟器管理助手

专注于DevEco Studio模拟器的创建、启动、停止、应用安装调试。包含完整的场景化设备控制命令。

> **日志分析功能**：hilog日志查看、崩溃日志分析、日志导出等功能已拆分到 `deveco-studio-hilog` skill，请在需要日志分析时使用该 skill。

---

## 快速导航

| 功能模块 | 说明 | 参考文档 |
|---------|------|---------|
| **环境配置** | DevEco Studio路径配置、环境变量设置 | 本页 "环境配置" 章节、[CONFIGURATION.md](references/CONFIGURATION.md) |
| **场景化命令** | 旋转、电源、截屏、音量、摇一摇、折叠控制 | [scene-commands.md](references/scene-commands.md) |
| **模拟器启动** | Windows/macOS/Linux启动方法、Beta版本限制 | [windows-batch-startup.md](references/windows-batch-startup.md)、[macos-background-startup.md](references/macos-background-startup.md)、[instance-selector.md](references/instance-selector.md) |
| **实例管理** | 创建、查看、删除模拟器实例 | [emulator.md](references/emulator.md) |
| **应用调试** | hdc命令安装、启动、调试应用 | [hdc.md](references/hdc.md) |
| **镜像管理** | 下载、删除、查看模拟器镜像 | [image-management.md](references/image-management.md) |
| **远程管理** | TLS加密远程管理、会话管理、远程操作模拟器 | [remote-service.md](references/remote-service.md) |
| **日志分析** | hilog日志查看、崩溃分析、日志导出 | **已拆分到 deveco-studio-hilog skill** |

---

## 🚀 快速开始

### 场景化设备控制命令

**包含以下控制模拟器设备场景：**

- 旋转屏幕
- 屏幕息屏、亮屏
- 截取屏幕
- 调节音量
- 触发摇一摇传感器
- 控制折叠设备状态

**详细说明**：参见 `references/scene-commands.md` 获取完整的场景化命令参考

### 远程管理服务

**通过 TLS 加密连接远程管理模拟器，支持会话管理和远程操作：**

- 创建/删除远程会话
- 查看会话列表及详细信息
- 远程启动/关闭模拟器
- 远程截屏、旋转、音量控制
- 远程触发摇一摇、折叠设备控制

**基本工作流**：
```bash
# 1. 创建会话（只需一次）
emulator-rpc-service -session MySession -ip 192.168.1.100 -port 8555 --no-auth

# 2. 重复使用会话执行多个操作
emulator-rpc-service -session MySession shell "-start 'MyPhone'"
emulator-rpc-service -session MySession shell "-instance 'MyPhone' -rotation left"
emulator-rpc-service -session MySession shell "-instance 'MyPhone' -screenshot"

# 3. 删除会话
emulator-rpc-service -session MySession -delete
```

**详细说明**：参见 `references/remote-service.md` 获取完整的远程管理命令参考

## ⚠️ 环境配置（必做）

**在执行任何模拟器操作前，必须确保 `scripts/config.json` 存在且有效。**

### 自动检测逻辑

**每次执行模拟器操作时，应遵循以下流程：**

1. 检查 `scripts/config.json` 是否存在
2. 如果不存在 → 运行 `node scripts/setup.js --force`
3. 如果存在但路径无效 → 运行 `node scripts/setup.js --force`

### 配置命令（首次使用必须执行）

```bash
# 强制重新配置（推荐首次使用）
node scripts/setup.js --force

# 指定 DevEco Studio 路径（常用路径示例）
node scripts/setup.js --deveco-path "C:\Program Files\Huawei\DevEco Studio"

# macOS/Linux
node scripts/setup.js --deveco-path "/Applications/DevEco-Studio.app/Contents"
```

**如果跳过此步骤，所有 emulator/hdc 命令将无法找到正确路径。**

### 自动配置说明

setup.js 脚本会：
- 自动查找DevEco Studio安装路径（Windows/macOS/Linux）
- 获取emulator和hdc工具的完整路径
- 查找模拟器部署路径
- 自动生成 `scripts/config.json` 配置文件
- 列出可用的模拟器实例
- **支持配置持久化**：首次配置后，后续运行自动使用现有配置

> **Node.js 运行环境**：DevEco Studio 自带 Node.js 运行时，位于 `{DevEco Studio}\tools\node` 目录下。找到 DevEco Studio 安装路径后，即可使用其自带的 Node.js 运行 setup.js：
> ```bash
> # Windows 示例
> "{DevEco Studio}\tools\node\node.exe" scripts/setup.js --force
> ```

### 配置优先级

所有脚本按以下优先级读取配置：

1. **环境变量**（最高优先级）
2. **scripts/config.json 配置文件**
3. **自动查找**（最低优先级）

### 手动配置路径

如果自动查找失败，可以手动设置环境变量或编辑 config.json：

**方法1：使用 setup.js 指定路径（推荐）**

```bash
# 指定 DevEco Studio 路径
node scripts/setup.js --deveco-path "C:\Program Files\Huawei\DevEco Studio"

# macOS/Linux
node scripts/setup.js --deveco-path "/Applications/DevEco-Studio.app/Contents"
```

**方法2：设置环境变量**

**Windows:**
```powershell
# 设置 DevEco Studio 路径
$env:DEVECO_STUDIO_PATH = "C:\Program Files\Huawei\DevEco Studio"

# 设置模拟器实例路径（用于崩溃日志分析）
$env:EMULATOR_INSTANCE_PATH = "C:\Users\YourName\AppData\Local\Huawei\Emulator\deployed\MyPhone"
```

**macOS/Linux:**
```bash
# 设置 DevEco Studio 路径
export DEVECO_STUDIO_PATH="/Applications/DevEco-Studio.app/Contents"

# 设置模拟器实例路径
export EMULATOR_INSTANCE_PATH="$HOME/Huawei/emulator/deployed/MyPhone"
```

**方法3：编辑 config.json**

复制 `scripts/config.example.json` 为 `scripts/config.json`，然后填写实际路径：

```json
{
  "devecoStudioPath": "C:\\Program Files\\Huawei\\DevEco Studio",
  "emulatorInstancePath": "C:\\Users\\YourName\\AppData\\Local\\Huawei\\Emulator\\deployed\\MyPhone"
}
```

---

## 模拟器启动（推荐方法）

### Beta版本限制

**重要说明**：
- **Beta版本镜像无法通过命令行启动**
- 需要通过 DevEco Studio 界面启动 Beta 版本模拟器
- **最优先使用 HarmonyOS 6.0.2(22) 镜像**（Release版本，稳定且支持命令行启动）

**检查方法**：
```bash
# 查看所有模拟器实例及其镜像版本
emulator -list -details

# 检查是否为 Beta 版本（osVersion 包含 "Beta"）
# 如果是 Beta 版本，需要通过 DevEco Studio 界面启动
```

**自动选择非 Beta 版本**：参见 `references/instance-selector.md` 获取自动选择非 Beta 版本实例的详细说明

### 启动模拟器

---

#### Windows

> ⚠️ **AI 必须先使用 Node.js 脚本方式启动！**

**✅ 首选方式：Node.js 脚本（强烈推荐）**

```powershell
# 1️⃣ AI 调用命令（必须使用此方式！）
node "D:\AI\harmonyos-agent-skills\07-tools\tools\deveco-studio\deveco-studio-emulator\scripts\start-emulator.js" "MyPhone"

# 2️⃣ 等待模拟器启动（30-60秒）
Start-Sleep -Seconds 30

# 3️⃣ 检查设备连接状态
& "$env:DEVECO_STUDIO_PATH\sdk\default\openharmony\toolchains\hdc.exe" list targets
```

**说明**：
- 将 `"MyPhone"` 替换为实际的模拟器实例名称
- 首次使用前需执行：`& "$env:DEVECO_STUDIO_PATH\tools\emulator\emulator.exe" -license accept`

**Node.js 方式优势**：
- ✅ 自动处理路径空格和引号转义
- ✅ 进程完全独立，不会因启动脚本退出而关闭
- ✅ 内置错误处理和状态反馈
- ✅ 跨平台兼容（Windows/macOS/Linux）

---

**备选方式：PowerShell 直接启动**

```powershell
# 启动模拟器（进程独立）
Start-Process -FilePath "$env:DEVECO_STUDIO_PATH\tools\emulator\Emulator.exe" `
              -ArgumentList "-start MyPhone" `
              -WindowStyle Normal

# 等待启动并检查连接
Start-Sleep -Seconds 30
& "$env:DEVECO_STUDIO_PATH\sdk\default\openharmony\toolchains\hdc.exe" list targets
```

---

**macOS/Linux:**

```bash
# 步骤1：接受许可证协议（首次使用必须执行）
"$DEVECO_STUDIO_PATH/tools/emulator/emulator" -license accept

# 步骤2：使用 Node.js 脚本启动（推荐）
cd "/path/to/deveco-studio-emulator"
node scripts/start-emulator.js "MyPhone"

# 步骤3：等待启动并检查连接
sleep 30
"$DEVECO_STUDIO_PATH/sdk/default/openharmony/toolchains/hdc" list targets
```

**详细说明**：参见 `references/macos-background-startup.md`

**重要提示**：
- 首次使用必须先执行 `emulator -license accept` 接受许可证协议
- 模拟器启动需要30-60秒，请耐心等待
- **强烈推荐使用 Node.js 脚本方式**，避免引号转义问题


## hdc命令行工具

### 基础命令

```bash
hdc -v                      # 查看版本
hdc list targets            # 查看已连接设备
hdc start                   # 启动hdc服务
hdc kill                    # 停止hdc服务
```

### 应用管理

```bash
hdc shell bm dump -a        # 查看已安装应用
hdc install {hap包路径}     # 安装应用
hdc uninstall {bundleName}  # 卸载应用
hdc shell aa start -a {abilityName} -b {bundleName}  # 启动应用
hdc shell aa force-stop {bundleName}  # 停止应用
hdc shell bm clean -d -n {bundleName}  # 清除应用数据
```

### 文件传输

```bash
hdc file send {本地文件} {设备路径}  # 推送文件到设备
hdc file recv {设备文件} {本地路径}  # 从设备拉取文件
```

### Shell命令执行

```bash
hdc shell {命令}            # 执行单条命令
hdc shell                   # 进入交互式shell
```

---

## 完整工作流程

### 创建并启动模拟器

```bash
# 1. 运行setup.js自动配置
node scripts/setup.js

# 2. 接受许可证协议（首次使用必须执行）
emulator -license accept

# 3. 创建模拟器实例
emulator -create "MyPhone" -deviceType Phone -osVersion "HarmonyOS 6.0.2(22)"

# 4. Windows: 使用批处理文件启动（推荐）
powershell -Command "$batPath = `"$env:TEMP\start_emulator.bat`"; `\"@echo off`ncd /d `\"$env:DEVECO_STUDIO_PATH\tools\emulator`\"`nEmulator.exe -start `\"MyPhone`\"`npause`\" | Out-File -FilePath $batPath -Encoding ASCII; Start-Process -FilePath $batPath -WindowStyle Normal"

# 5. 等待模拟器启动（30-60秒）
ping -n 30 127.0.0.1 > nul

# 6. 检查设备连接状态
hdc list targets
```

### 应用安装和调试

```bash
hdc install app.hap                         # 安装应用
hdc shell aa start -a EntryAbility -b com.example.app  # 启动应用
hdc shell aa dump -a                        # 查看运行中的应用，获取进程ID
hdc shell aa force-stop com.example.app    # 停止应用
```

---

## 检查清单

### Critical (必须完成)

- [ ] 运行 `node scripts/setup.js --force` 配置路径
- [ ] `scripts/config.json` 文件存在且路径有效
- [ ] DevEco Studio 已正确安装（Windows/macOS/Linux）
- [ ] 已接受许可证协议 (`emulator -license accept`)
- [ ] 模拟器实例已创建且镜像为 Release 版本（推荐 6.0.2(22)）

### Warning (建议完成)

- [ ] hdc 工具可正常连接设备 (`hdc list targets`)
- [ ] 模拟器启动后等待30-60秒再执行操作
- [ ] 使用非 Beta 版本镜像（Beta版本无法通过命令行启动）

### Info (可选改进)

- [ ] 检查模拟器实例状态 (`emulator -list -details`)
- [ ] 验证应用已正确安装 (`hdc shell bm dump -a`)
- [ ] 清理临时批处理文件（Windows: `$env:TEMP\start_emulator.bat`）

---

## 决策树

### 环境配置决策树

用户首次使用？
├─ 是 → 运行 `node scripts/setup.js --force`
│   ├─ 成功 → 生成 config.json，继续
│   └─ 失败 → 提示手动配置路径（参见 references/CONFIGURATION.md）
└─ 否 → 检查 `scripts/config.json` 是否存在
    ├─ 存在 → 验证路径有效性
    │   ├─ 有效 → 继续
    │   └─ 无效 → 重新运行 `setup.js --force`
    └─ 不存在 → 运行 `setup.js --force`

### 模拟器启动决策树

镜像版本类型？
├─ Beta版本（osVersion包含"Beta"）
│   └─ 提示：Beta版本无法通过命令行启动
│       └─ 行动：通过 DevEco Studio 界面手动启动
│           └─ 等待用户启动完成后继续
└─ Release版本
    └─ 使用命令行启动
        ├─ 启动成功 → `hdc list targets` 显示设备连接
        │   └─ 继续：安装应用或调试
        └─ 启动失败 → 检查以下项
            ├─ 许可证未接受 → 执行 `emulator -license accept`
            ├─ 实例不存在 → 执行 `emulator -create`
            ├─ 镜像未下载 → 执行 `emulator -install`
            └─ 路径无效 → 重新运行 `setup.js`

### 应用调试决策树

应用安装状态？
├─ 未安装 → 执行 `hdc install {hap路径}`
│   ├─ 安装成功 → 继续启动应用
│   └─ 安装失败 → 检查hap包路径、签名、设备连接
└─ 已安装 → 检查应用运行状态
    ├─ 未运行 → 执行 `hdc shell aa start`
    │   ├─ 启动成功 → 获取进程ID (`hdc shell aa dump -a`)
    │   └─ 启动失败 → 检查 abilityName、bundleName 是否正确
    └─ 运行中 → 执行调试或日志分析
        └─ 需要日志分析 → 使用 `deveco-studio-hilog` skill

---

## 日志分析（已拆分）

以下功能已拆分到 **deveco-studio-hilog** skill：

- **hilog日志查看**：应用日志查看、进程过滤、错误日志
- **崩溃日志分析**：自动解压分析崩溃日志
- **日志导出**：使用 -logZip 导出完整日志包
- **手动日志分析**：手动保存日志分析
- **hidumper工具**：堆栈转储分析

**使用方式**：
```
当用户需要查看应用日志、分析崩溃、导出日志等功能时，请使用 deveco-studio-hilog skill。
```

---

## 参考文档
### 官方文档

- [Emulator命令行](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-emulator-command-line)
- [hdc命令](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/hdc)
- [镜像管理命令](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-emulator-command-line#section62671171252)

---

## 常见问题

### 模拟器启动失败

1. 检查许可证：`emulator -license accept`
2. 检查镜像：`emulator -imageList -downloaded true`
3. 检查实例：`emulator -list`
4. Beta版本镜像无法通过命令行启动

### hdc无法连接设备

1. 等待时间不足：模拟器启动需要30-60秒
2. 重启hdc服务：`hdc kill && hdc start`
3. 检查设备状态：`hdc list targets`

### 找不到DevEco Studio路径

1. 使用setup.js自动查找：`node scripts/setup.js`
2. 手动设置环境变量
3. 检查常见安装位置