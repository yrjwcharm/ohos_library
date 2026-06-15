# 模拟器实例选择器

自动选择非 Beta 版本的模拟器实例，避免命令行启动失败。

## 背景

### Beta 版本限制

**问题**：Beta 版本镜像无法通过命令行启动

**原因**：
- Beta 版本镜像存在已知问题
- 命令行工具对 Beta 版本支持不完整
- 需要通过 DevEco Studio 界面启动

**解决方案**：
- 优先使用 Release 版本镜像
- 自动选择非 Beta 版本实例
- 通过脚本检查并过滤 Beta 版本

---

## 检查 Beta 版本

### 方法1：使用 emulator -list -details

```bash
# 查看所有模拟器实例及其镜像版本
emulator -list -details

# 输出示例：
# {
#   "name": "Mate 80 Pro",
#   "osVersion": "HarmonyOS 6.0.31(23) Beta1",
#   "deviceType": "phone",
#   "state": "stopped"
# }
```

### 方法2：使用 jq 过滤（推荐）

```bash
# 查看所有实例
emulator -list -details | jq '.'

# 过滤非 Beta 版本实例
emulator -list -details | jq '.[] | select(.osVersion | contains("Beta") | not)'

# 只显示非 Beta 版本实例名称
emulator -list -details | jq -r '.[] | select(.osVersion | contains("Beta") | not) | .name'
```

### 方法3：使用 grep 过滤

```bash
# 查看所有实例
emulator -list -details

# 过滤非 Beta 版本实例（简单方法）
emulator -list -details | grep -v "Beta"
```

---

## 自动选择非 Beta 版本实例

### PowerShell 脚本（Windows）

```powershell
# 自动选择非 Beta 版本实例的 PowerShell 脚本

# 设置环境变量（优先级：环境变量 > config.json > 自动查找）
# 方法1：使用环境变量（推荐）
$env:EMULATOR_PATH = "$env:DEVECO_STUDIO_PATH\tools\emulator\emulator.exe"

# 方法2：使用 config.json 配置（自动读取）
# $config = Get-Content config.json | ConvertFrom-Json
# $env:EMULATOR_PATH = $config.emulatorPath

# 获取所有实例
$instances = & $env:EMULATOR_PATH -list -details | ConvertFrom-Json

# 过滤非 Beta 版本实例
$nonBetaInstances = $instances | Where-Object { $_.osVersion -notlike "*Beta*" }

# 选择第一个非 Beta 版本实例
if ($nonBetaInstances.Count -gt 0) {
    $selectedInstance = $nonBetaInstances[0].name
    Write-Host "选择非 Beta 版本实例: $selectedInstance"
    Write-Host "镜像版本: $($nonBetaInstances[0].osVersion)"
} else {
    Write-Host "错误: 没有找到非 Beta 版本实例"
    Write-Host "请创建一个使用 Release 版本镜像的模拟器实例"
    exit 1
}

# 启动选定的实例
Write-Host "启动模拟器: $selectedInstance"
powershell -Command "Start-Process -FilePath '$env:EMULATOR_PATH' -ArgumentList '-start','$selectedInstance'"
```

### Bash 脚本（macOS/Linux）

```bash
#!/bin/bash

# 自动选择非 Beta 版本实例的 Bash 脚本

# 设置环境变量
export EMULATOR_PATH="/Applications/DevEco-Studio.app/Contents/tools/emulator/emulator"

# 获取所有实例
instances_json=$($EMULATOR_PATH -list -details)

# 使用 jq 过滤非 Beta 版本实例
selected_instance=$(echo "$instances_json" | jq -r '.[] | select(.osVersion | contains("Beta") | not) | .name' | head -n 1)

if [ -z "$selected_instance" ]; then
    echo "错误: 没有找到非 Beta 版本实例"
    echo "请创建一个使用 Release 版本镜像的模拟器实例"
    exit 1
fi

echo "选择非 Beta 版本实例: $selected_instance"

# 启动选定的实例
echo "启动模拟器: $selected_instance"
nohup $EMULATOR_PATH -start "$selected_instance" > /dev/null 2>&1 &
```

---

## 完整的自动启动脚本

### PowerShell 脚本（Windows）

```powershell
# HarmonyOS 模拟器自动启动脚本（Windows）
# 自动选择非 Beta 版本实例并启动

# 配置
# 方法1：使用环境变量（推荐）
$EMULATOR_PATH = "$env:DEVECO_STUDIO_PATH\tools\emulator\emulator.exe"

# 方法2：使用 config.json 配置（自动读取）
$config = Get-Content config.json | ConvertFrom-Json
$EMULATOR_PATH = $config.emulatorPath

$LOG_FILE = "$env:TEMP\emulator_start.log"

# 日志函数
function Log {
    param([string]$message)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "[$timestamp] $message" | Out-File -Append -FilePath $LOG_FILE
    Write-Host "[$timestamp] $message"
}

# 检查模拟器实例
function Check-Instances {
    Log "检查模拟器实例..."
    
    try {
        $instances = & $EMULATOR_PATH -list -details | ConvertFrom-Json
        
        if ($instances.Count -eq 0) {
            Log "错误: 没有找到任何模拟器实例"
            return $null
        }
        
        Log "找到 $($instances.Count) 个模拟器实例"
        foreach ($instance in $instances) {
            Log "  - $($instance.name) ($($instance.osVersion))"
        }
        
        return $instances
    } catch {
        Log "错误: 无法获取模拟器实例列表"
        Log "错误信息: $_"
        return $null
    }
}

# 选择非 Beta 版本实例
function Select-NonBetaInstance {
    param([array]$instances)
    
    Log "选择非 Beta 版本实例..."
    
    $nonBetaInstances = $instances | Where-Object { $_.osVersion -notlike "*Beta*" }
    
    if ($nonBetaInstances.Count -eq 0) {
        Log "错误: 所有实例都是 Beta 版本"
        Log "请创建一个使用 Release 版本镜像的模拟器实例"
        return $null
    }
    
    $selectedInstance = $nonBetaInstances[0]
    Log "选择实例: $($selectedInstance.name)"
    Log "镜像版本: $($selectedInstance.osVersion)"
    
    return $selectedInstance
}

# 启动模拟器
function Start-Emulator {
    param([string]$instanceName)
    
    Log "启动模拟器: $instanceName"
    
    try {
        Start-Process -FilePath $EMULATOR_PATH -ArgumentList "-start",$instanceName
        Log "模拟器启动成功"
        return $true
    } catch {
        Log "错误: 模拟器启动失败"
        Log "错误信息: $_"
        return $false
    }
}

# 主函数
function Main {
    Log "HarmonyOS 模拟器自动启动脚本"
    Log "=================================="
    
    # 检查模拟器实例
    $instances = Check-Instances
    if ($null -eq $instances) {
        exit 1
    }
    
    # 选择非 Beta 版本实例
    $selectedInstance = Select-NonBetaInstance -instances $instances
    if ($null -eq $selectedInstance) {
        exit 1
    }
    
    # 启动模拟器
    if (Start-Emulator -instanceName $selectedInstance.name) {
        Log "模拟器启动成功，请等待30-60秒后通过 hdc 连接"
        exit 0
    } else {
        Log "模拟器启动失败，请检查日志: $LOG_FILE"
        exit 1
    }
}

# 执行主函数
Main
```

### Bash 脚本（macOS/Linux）

```bash
#!/bin/bash

# HarmonyOS 模拟器自动启动脚本（macOS/Linux）
# 自动选择非 Beta 版本实例并启动

# 配置
# 方法1：使用环境变量（推荐）
export EMULATOR_PATH="/Applications/DevEco-Studio.app/Contents/tools/emulator/emulator"

# 方法2：使用 config.json 配置（自动读取）
# config=$(cat config.json | jq -r '.emulatorPath')
# export EMULATOR_PATH="$config"

LOG_FILE="/tmp/emulator_start.log"

# 日志函数
log() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] $1" | tee -a "$LOG_FILE"
}

# 检查模拟器实例
check_instances() {
    log "检查模拟器实例..."
    
    instances_json=$($EMULATOR_PATH -list -details 2>&1)
    
    if [ $? -ne 0 ]; then
        log "错误: 无法获取模拟器实例列表"
        log "错误信息: $instances_json"
        return 1
    fi
    
    # 检查是否有实例
    instance_count=$(echo "$instances_json" | jq 'length')
    
    if [ "$instance_count" -eq 0 ]; then
        log "错误: 没有找到任何模拟器实例"
        return 1
    fi
    
    log "找到 $instance_count 个模拟器实例"
    echo "$instances_json" | jq -r '.[] | "  - \(.name) (\(.osVersion))"' | tee -a "$LOG_FILE"
    
    return 0
}

# 选择非 Beta 版本实例
select_non_beta_instance() {
    log "选择非 Beta 版本实例..."
    
    selected_instance=$(echo "$instances_json" | jq -r '.[] | select(.osVersion | contains("Beta") | not) | .name' | head -n 1)
    
    if [ -z "$selected_instance" ]; then
        log "错误: 所有实例都是 Beta 版本"
        log "请创建一个使用 Release 版本镜像的模拟器实例"
        return 1
    fi
    
    log "选择实例: $selected_instance"
    
    # 获取镜像版本
    os_version=$(echo "$instances_json" | jq -r ".[] | select(.name == \"$selected_instance\") | .osVersion")
    log "镜像版本: $os_version"
    
    return 0
}

# 启动模拟器
start_emulator() {
    local instance_name=$1
    
    log "启动模拟器: $instance_name"
    
    nohup $EMULATOR_PATH -start "$instance_name" > /dev/null 2>&1 &
    
    sleep 5
    
    if ps aux | grep -v grep | grep -q "$EMULATOR_PATH.*start.*$instance_name"; then
        log "模拟器启动成功"
        return 0
    else
        log "错误: 模拟器启动失败"
        return 1
    fi
}

# 主函数
main() {
    log "HarmonyOS 模拟器自动启动脚本"
    log "=================================="
    
    # 检查模拟器实例
    if ! check_instances; then
        exit 1
    fi
    
    # 选择非 Beta 版本实例
    if ! select_non_beta_instance; then
        exit 1
    fi
    
    # 启动模拟器
    if start_emulator "$selected_instance"; then
        log "模拟器启动成功，请等待30-60秒后通过 hdc 连接"
        exit 0
    else
        log "模拟器启动失败，请检查日志: $LOG_FILE"
        exit 1
    fi
}

# 执行主函数
main
```

---

## 使用方法

### Windows PowerShell

```powershell
# 1. 保存脚本
# 将上面的 PowerShell 脚本保存为 start-emulator.ps1

# 2. 运行脚本
.\start-emulator.ps1

# 3. 查看日志
Get-Content C:\Temp\emulator_start.log
```

### macOS/Linux Bash

```bash
# 1. 保存脚本
# 将上面的 Bash 脚本保存为 start-emulator.sh

# 2. 添加执行权限
chmod +x start-emulator.sh

# 3. 运行脚本
./start-emulator.sh

# 4. 查看日志
tail -f /tmp/emulator_start.log
```

---

## 常见问题

### Q1: 所有实例都是 Beta 版本怎么办？

**A**: 创建一个使用 Release 版本镜像的模拟器实例

```bash
# 1. 查看可用的 Release 版本镜像
emulator -imageList -downloaded true | grep -v "Beta"

# 2. 创建新的模拟器实例（使用 Release 版本）
emulator -create "MyPhoneRelease" -deviceType Phone -osVersion "HarmonyOS 6.0.2(22)"

# 3. 使用自动启动脚本
./start-emulator.sh
```

### Q2: 如何查看实例的镜像版本？

**A**: 使用 emulator -list -details 命令

```bash
# 查看所有实例及其镜像版本
emulator -list -details

# 使用 jq 格式化输出
emulator -list -details | jq '.[] | {name: .name, osVersion: .osVersion}'
```

### Q3: 如何强制启动 Beta 版本实例？

**A**: 通过 DevEco Studio 界面启动

**步骤**：
1. 打开 DevEco Studio
2. 点击 Device Manager
3. 找到 Beta 版本实例
4. 点击启动按钮

**注意**：Beta 版本实例无法通过命令行启动

### Q4: 脚本提示 "jq: command not found" 怎么办？

**A**: 安装 jq 工具

```bash
# macOS
brew install jq

# Linux (Ubuntu/Debian)
sudo apt-get install jq

# Linux (CentOS/RHEL)
sudo yum install jq
```

---

## 参考

- [Emulator命令行](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-emulator-command-line)
- [jq 手册](https://stedolan.github.io/jq/manual/)
