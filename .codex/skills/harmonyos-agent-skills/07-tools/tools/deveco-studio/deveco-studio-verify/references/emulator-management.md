# 模拟器管理完整指南

本文档提供 HarmonyOS 模拟器的创建、启动、停止和管理的完整参考。

---

## 目录

1. [准备工作](#准备工作)
2. [创建模拟器实例](#创建模拟器实例)
3. [启动模拟器](#启动模拟器)
4. [停止模拟器](#停止模拟器)
5. [镜像管理](#镜像管理)
6. [配置和调优](#配置和调优)
7. [常见问题](#常见问题)

---

## 准备工作

### 接受许可证

首次使用模拟器需接受许可证协议：

```bash
emulator -license accept
```

### 检查环境

验证工具路径和配置：

```bash
# 检查 emulator 工具
emulator -v

# 查看已下载镜像
emulator -imageList -downloaded true

# 查看已有模拟器实例
emulator -list -details
```

### 推荐镜像版本

**重要提示**：
- **优先使用 HarmonyOS 6.0.2(22) Release 版本镜像**
- **Beta 版本镜像无法通过命令行启动**，需使用 DevEco Studio 界面启动

检查镜像是否为 Beta 版本：
```bash
emulator -list -details | grep "osVersion"
# 如果 osVersion 包含 "Beta"，需使用 DevEco Studio 界面启动
```

---

## 创建模拟器实例

### 基础创建命令

```bash
# 创建 Phone 类型模拟器（默认配置）
emulator -create "MyPhone" -deviceType Phone -osVersion "HarmonyOS 6.0.2(22)"

# 创建 Foldable 类型模拟器
emulator -create "MyFold" -deviceType Foldable -osVersion "HarmonyOS 6.0.2(22)"

# 创建 Tablet 类型模拟器
emulator -create "MyTablet" -deviceType Tablet -osVersion "HarmonyOS 6.0.2(22)"
```

### 指定配置参数

```bash
# 创建时指定存储和内存
emulator -create "MyPhone" -deviceType Phone -osVersion "HarmonyOS 6.0.2(22)" -storage 8 -memory 6

# 指定 CPU 核心数
emulator -create "MyPhone" -deviceType Phone -osVersion "HarmonyOS 6.0.2(22)" -cpuCores 4

# 指定分辨率
emulator -create "MyPhone" -deviceType Phone -osVersion "HarmonyOS 6.0.2(22)" -resolution 1080x2340
```

### 支持的设备类型

| 设备类型 | 标识 | 说明 | 推荐用途 |
|---------|------|------|---------|
| 手机 | `Phone` | 标准手机设备 | 基础功能测试（必选） |
| 折叠屏 | `Foldable` | 双折设备 | 折叠适配测试 |
| 阔折叠 | `WideFold` | 大屏折叠设备 | 分栏布局测试 |
| 三折叠 | `TripleFold` | 三折设备 | 超宽屏布局测试 |
| 平板 | `Tablet` | 平板设备 | 大屏布局测试 |
| 二合一 | `2in1` | 二合一设备 | 多模式测试 |
| 二合一折叠 | `2in1 Foldable` | 可折叠二合一设备 | 高级测试 |
| 穿戴设备 | `Wearable` | 手表等穿戴设备 | 穿戴应用测试 |
| 电视 | `TV` | 智能电视设备 | TV 应用测试 |

### 完整创建流程

```bash
# 1. 接受许可证
emulator -license accept

# 2. 查看可用镜像
emulator -imageList

# 3. 创建模拟器实例
emulator -create "TestPhone" -deviceType Phone -osVersion "HarmonyOS 6.0.2(22)" -storage 6 -memory 4

# 4. 查看创建结果
emulator -list -details

# 5. 启动模拟器
# 使用批处理文件方式启动（见下一节）
```

---

## 启动模拟器

### 方法1：使用批处理文件启动（推荐 - Windows）

**创建临时批处理文件并启动**：
```powershell
# PowerShell 方式
$batPath = "$env:TEMP\start_emulator.bat"
@"
@echo off
cd /d "C:\Program Files\Huawei\DevEco Studio\tools\emulator"
Emulator.exe -start "MyPhone"
pause
"@ | Out-File -FilePath $batPath -Encoding ASCII

Start-Process -FilePath $batPath -WindowStyle Normal

# 等待启动（30-60秒）
Start-Sleep -Seconds 30

# 检查设备连接
& "C:\Program Files\Huawei\DevEco Studio\sdk\default\openharmony\toolchains\hdc.exe" list targets
```

**创建持久批处理文件**：
```bat
# scripts/start_myphone.bat
@echo off
cd /d "C:\Program Files\Huawei\DevEco Studio\tools\emulator"
Emulator.exe -start "MyPhone"
pause
```

执行批处理文件：
```bash
cmd.exe /c "scripts\start_myphone.bat"
```

### 方法2：使用 cmd 直接启动（Windows）

```bash
cmd /c "cd /d `"C:\Program Files\Huawei\DevEco Studio\tools\emulator`" && Emulator.exe -start `"MyPhone`""
```

### 方法3：使用 PowerShell 后台启动（Windows）

```powershell
$emulatorPath = "C:\Program Files\Huawei\DevEco Studio\tools\emulator\Emulator.exe"
Start-Process -FilePath $emulatorPath -ArgumentList "-start", "MyPhone" -WindowStyle Normal
```

### macOS/Linux 启动方法

**方法1：使用 nohup 后台启动**
```bash
# 设置环境变量
export EMULATOR_PATH="/Applications/DevEco-Studio.app/Contents/tools/emulator/emulator"

# 后台启动
nohup $EMULATOR_PATH -start MyPhone > /dev/null 2>&1 &

# 获取进程ID
echo $!

# 等待30秒后检查连接
sleep 30
hdc list targets
```

**方法2：使用 screen/tmux（推荐，更稳定）**
```bash
# 使用 screen（推荐）
screen -dmS emulator $EMULATOR_PATH -start MyPhone

# 使用 tmux
tmux new-session -d -s emulator "$EMULATOR_PATH -start MyPhone"

# 查看会话
screen -ls  # 或 tmux ls

# 重新连接到会话
screen -r emulator  # 或 tmux attach -t emulator

# 等待30秒后检查连接
sleep 30
hdc list targets
```

**方法3：使用脚本启动**
```bash
# 创建启动脚本 start_emulator.sh
#!/bin/bash
EMULATOR_PATH="/Applications/DevEco-Studio.app/Contents/tools/emulator/emulator"
nohup $EMULATOR_PATH -start MyPhone > /dev/null 2>&1 &
echo "模拟器启动命令已执行，等待30秒..."
sleep 30
hdc list targets

# 执行脚本
chmod +x start_emulator.sh
./start_emulator.sh
```

**macOS/Linux 工具路径**：
```
emulator: /Applications/DevEco-Studio.app/Contents/tools/emulator/emulator
hdc:      /Applications/DevEco-Studio.app/Contents/sdk/default/openharmony/toolchains/hdc
```

### 启动验证

```bash
# 等待 30-60 秒后检查连接
hdc list targets

# 验证成功输出
127.0.0.1:5555

# 获取设备信息
hdc shell param get const.product.devicetype
hdc shell param get const.product.model
```

---

## 停止模拟器

### 方法1：使用 DevEco Studio 界面停止

在 DevEco Studio 中点击模拟器窗口的关闭按钮。

### 方法2：通过 hdc 命令停止应用（不影响模拟器）

```bash
# 停止应用
hdc shell aa force-stop <bundleName>

# 卸载应用
hdc uninstall <bundleName>
```

### 方法3：强制关闭模拟器进程

**Windows**：
```powershell
# 查找进程
Get-Process | Where-Object {$_.ProcessName -like "*emulator*"}

# 强制关闭
Stop-Process -Name "Emulator" -Force
```

**macOS/Linux**：
```bash
# 查找进程
ps aux | grep emulator

# 强制关闭
pkill -9 emulator
```

---

## 镜像管理

### 查看镜像列表

```bash
# 查看所有可用镜像
emulator -imageList

# 只查看已下载的镜像
emulator -imageList -downloaded true

# 查看镜像详细信息
emulator -imageList -details
```

### 下载镜像

```bash
# 下载指定版本镜像
emulator -imageDownload -osVersion "HarmonyOS 6.0.2(22)"

# 下载指定设备类型镜像
emulator -imageDownload -deviceType Phone -osVersion "HarmonyOS 6.0.2(22)"
```

### 删除镜像

```bash
# 删除指定镜像
emulator -imageDelete -osVersion "HarmonyOS 5.0.0(15)"

# 删除未使用的镜像
emulator -imageDelete -unused
```

### 镜像版本说明

| 镜像版本 | 状态 | 命令行启动 | 推荐度 |
|---------|------|-----------|--------|
| HarmonyOS 6.0.2(22) | Release | ✅ 支持 | ⭐⭐⭐ 推荐 |
| HarmonyOS 6.0.2(22) Beta | Beta | ❌ 不支持 | ⭐ 需界面启动 |
| HarmonyOS 5.0.0(15) | Release | ✅ 支持 | ⭐⭐ 可用 |

---

## 配置和调优

### 查看模拟器配置

```bash
# 查看实例详细信息
emulator -list -details

# 查看 JSON 格式配置（包含路径、CPU、内存等）
emulator -list -details | jq
```

### 性能调优

**Windows Hyper-V 加速**：
```powershell
# 检查 Hyper-V 状态
Get-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V

# 启用 Hyper-V（需管理员权限）
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
```

**内存和 CPU 配置建议**：

| 设备类型 | 推荐内存 | 推荐CPU | 推荐存储 |
|---------|---------|---------|---------|
| Phone | 4GB | 4核 | 6GB |
| Foldable | 6GB | 4核 | 8GB |
| Tablet | 8GB | 4核 | 10GB |
| 2in1 | 8GB | 4核 | 12GB |

---

## 常见问题

### 1. 模拟器创建失败

**错误**: `Failed to create emulator`

**解决方案**:
```bash
# 1. 检查许可证
emulator -license accept

# 2. 检查镜像是否已下载
emulator -imageList -downloaded true

# 3. 下载所需镜像
emulator -imageDownload -deviceType Phone -osVersion "HarmonyOS 6.0.2(22)"

# 4. 再次创建
emulator -create "MyPhone" -deviceType Phone -osVersion "HarmonyOS 6.0.2(22)"
```

### 2. Beta 版本镜像启动失败

**错误**: `Failed to start emulator: this is a Beta version`

**解决方案**:
- **方案1**: 使用 Release 版本镜像（推荐）
- **方案2**: 通过 DevEco Studio 界面启动 Beta 版本模拟器
- **方案3**: 创建新的非 Beta 版本实例

```bash
# 查看是否为 Beta 版本
emulator -list -details | grep "osVersion"

# 创建非 Beta 版本实例
emulator -create "MyPhone" -deviceType Phone -osVersion "HarmonyOS 6.0.2(22)"
```

### 3. 模拟器启动后无法连接

**错误**: `hdc list targets` 返回 `[Empty]`

**解决方案**:
```bash
# 1. 等待更长时间（30-60秒）
Start-Sleep -Seconds 60

# 2. 重启 hdc 服务
hdc kill
hdc start

# 3. 再次检查连接
hdc list targets

# 4. 检查模拟器是否正常运行
emulator -list -details | grep "isRunning"
```

### 4. 模拟器启动冲突

**错误**: `Failed to start emulator: this emulator instance is already running`

**解决方案**:
- 模拟器已运行，可继续使用
- 如需重启，先关闭再启动

```bash
# 检查是否已运行
emulator -list -details | grep "MyPhone"

# 如果已运行，直接连接
hdc list targets
```

### 5. 批处理文件启动失败

**错误**: 批处理文件执行后模拟器未启动

**解决方案**:
```powershell
# 1. 检查批处理文件路径
$batPath = "$env:TEMP\start_emulator.bat"
Get-Content $batPath

# 2. 确认 DevEco Studio 路径正确
Test-Path "C:\Program Files\Huawei\DevEco Studio\tools\emulator\Emulator.exe"

# 3. 手动执行批处理文件
cmd.exe /c $batPath
```

### 6. 多个模拟器同时启动冲突

**错误**: 多个模拟器同时启动时部分失败

**解决方案**:
- 每个模拟器启动间隔至少等待 5 秒
- 使用顺序启动而非并行启动

```powershell
# 顺序启动多个模拟器（推荐）
$emulators = @("Phone1", "Fold1")
foreach ($emu in $emulators) {
    Start-Process -FilePath $emulatorPath -ArgumentList "-start", $emu
    Start-Sleep -Seconds 5  # 间隔 5 秒
}
```

---

## 最佳实践

### 1. 模拟器命名规范

建议使用有意义的名称：
```
TestPhone-Default      # 默认测试手机
TestPhone-HighMem      # 高内存配置手机
TestFold-Expanded      # 展开状态折叠屏
TestTablet-Landscape   # 横屏平板
```

### 2. 定期清理

```bash
# 删除未使用的实例
emulator -delete "OldInstance"

# 删除未使用的镜像
emulator -imageDelete -unused

# 清理临时文件
rm -rf $env:TEMP\start_emulator*.bat
```

### 3. 使用配置文件管理

创建配置文件记录模拟器信息：
```json
{
  "emulators": [
    {
      "name": "TestPhone",
      "deviceType": "Phone",
      "osVersion": "HarmonyOS 6.0.2(22)",
      "storage": "6GB",
      "memory": "4GB",
      "port": "5555"
    },
    {
      "name": "TestFold",
      "deviceType": "Foldable",
      "osVersion": "HarmonyOS 6.0.2(22)",
      "storage": "8GB",
      "memory": "6GB",
      "port": "5557"
    }
  ]
}
```

---

## 快速参考

```bash
# 创建
emulator -create MyPhone -deviceType Phone -osVersion "HarmonyOS 6.0.2(22)"

# 启动（批处理文件方式）
powershell: $batPath = "$env:TEMP\start.bat"; "@echo off\ncd /d ...\nEmulator.exe -start MyPhone\npause" | Out-File $batPath -Encoding ASCII; Start-Process $batPath

# 检查连接
hdc list targets

# 删除
emulator -delete MyPhone

# 查看列表
emulator -list -details
```

---

## 官方文档参考

- [Emulator 命令行工具](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-emulator-command-line)
- [镜像管理命令](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-emulator-command-line#section62671171252)
- [hdc 命令](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/hdc)