# Windows 批处理文件启动模拟器

## 为什么需要特殊启动方式？

在 Windows 上通过命令行启动 DevEco Studio 模拟器时，直接使用 PowerShell 或 cmd 可能会遇到以下问题：

1. **进程立即退出**：模拟器主进程启动后立即退出，导致命令行工具认为启动失败
2. **父进程退出影响子进程**：当启动脚本的 PowerShell 会话结束时，子进程可能被终止（约120秒后）
3. **参数传递问题**：多层嵌套的引号和转义导致参数解析错误

## 解决方案：使用 VBScript 创建独立进程

### 方法1：VBScript 启动（推荐）

```powershell
# 创建 VBScript 确保模拟器进程完全独立
$vbsPath = "$env:TEMP\start_emulator.vbs"
$vbsContent = @"
Set WshShell = CreateObject("WScript.Shell")
WshShell.Run """C:\Program Files\Huawei\DevEco Studio\tools\emulator\Emulator.exe"" -start ""Mate 80 Pro1""", 1, False
"@
$vbsContent | Out-File -FilePath $vbsPath -Encoding ASCII

# 执行 VBScript 启动模拟器（完全独立进程）
cscript.exe //nologo $vbsPath

# 等待模拟器启动（30-60秒）
Start-Sleep -Seconds 30

# 检查设备连接
& "C:\Program Files\Huawei\DevEco Studio\sdk\default\openharmony\toolchains\hdc.exe" list targets
```

**优点**：
- **稳定性最高**：进程完全独立，不受父进程影响
- **解决120秒超时问题**：模拟器不会因启动脚本退出而被终止
- **适合自动化脚本**：无需人工干预

### 方法2：永久批处理文件

```powershell
# 创建永久批处理文件
$batContent = @"
@echo off
cd /d "C:\Program Files\Huawei\DevEco Studio\tools\emulator"
Emulator.exe -start "Mate 80 Pro1"
pause
"@
$batContent | Out-File -FilePath "C:\path\to\start_emulator.bat" -Encoding ASCII

# 启动批处理文件
Start-Process -FilePath "C:\path\to\start_emulator.bat" -WindowStyle Normal
```

**优点**：
- 可重复使用
- 方便手动执行
- 可以修改参数

### 方法3：直接 cmd 执行（适合手动操作）

```powershell
# 直接在当前窗口执行（会阻塞）
cmd /c "cd /d \"C:\Program Files\Huawei\DevEco Studio\tools\emulator\" && Emulator.exe -start \"Mate 80 Pro1\""
```

**注意**：
- 会阻塞当前窗口
- 适合手动操作，不适合自动化

## 批处理文件详解

### 关键命令说明

```batch
@echo off
cd /d "C:\Program Files\Huawei\DevEco Studio\tools\emulator"
Emulator.exe -start "Mate 80 Pro1"
pause
```

- `@echo off`：关闭命令回显，使输出更清晰
- `cd /d`：切换驱动器和目录（`/d` 参数支持跨驱动器切换）
- `Emulator.exe -start "Mate 80 Pro1"`：启动模拟器实例
- `pause`：暂停执行，等待用户按键（防止窗口立即关闭）

### 为什么需要 pause？

1. **保持窗口打开**：模拟器启动后，批处理文件会继续执行，`pause` 会等待用户输入
2. **查看输出**：可以看到模拟器的启动日志和错误信息
3. **防止误关闭**：用户需要主动关闭窗口，避免意外终止

### 可选：移除 pause

如果不需要窗口保持打开，可以移除 `pause` 命令：

```batch
@echo off
cd /d "C:\Program Files\Huawei\DevEco Studio\tools\emulator"
Emulator.exe -start "Mate 80 Pro1"
```

## 自动化脚本示例

### 完整的启动和检测脚本

```powershell
# 配置
$devecoPath = "C:\Program Files\Huawei\DevEco Studio"
$instanceName = "Mate 80 Pro1"
$emulatorPath = "$devecoPath\tools\emulator\Emulator.exe"
$hdcPath = "$devecoPath\sdk\default\openharmony\toolchains\hdc.exe"

# 创建批处理文件
$batPath = "$env:TEMP\start_emulator.bat"
$batContent = @"
@echo off
cd /d "$devecoPath\tools\emulator"
Emulator.exe -start "$instanceName"
pause
"@
$batContent | Out-File -FilePath $batPath -Encoding ASCII

# 启动模拟器
Write-Host "启动模拟器: $instanceName"
Start-Process -FilePath $batPath -WindowStyle Normal

# 等待模拟器启动
Write-Host "等待模拟器启动..."
$maxWait = 60
$waited = 0
while ($waited -lt $maxWait) {
    $devices = & $hdcPath list targets
    if ($devices -match "127\.0\.0\.1:\d+") {
        Write-Host "模拟器已连接: $devices"
        break
    }
    Start-Sleep -Seconds 1
    $waited++
    Write-Host "等待中... ($waited/$maxWait)"
}

if ($waited -ge $maxWait) {
    Write-Host "错误：模拟器启动超时"
    exit 1
}

# 模拟器已成功启动
Write-Host "模拟器启动成功！"
```

### 使用函数封装

```powershell
function Start-DevEcoEmulator {
    param(
        [string]$InstanceName = "Mate 80 Pro1",
        [string]$DevecoPath = "C:\Program Files\Huawei\DevEco Studio",
        [int]$MaxWaitSeconds = 60
    )

    # 配置路径
    $emulatorPath = "$DevecoPath\tools\emulator\Emulator.exe"
    $hdcPath = "$DevecoPath\sdk\default\openharmony\toolchains\hdc.exe"

    # 创建批处理文件
    $batPath = "$env:TEMP\start_emulator_$InstanceName.bat"
    $batContent = @"
@echo off
cd /d "$DevecoPath\tools\emulator"
Emulator.exe -start "$InstanceName"
pause
"@
    $batContent | Out-File -FilePath $batPath -Encoding ASCII

    # 启动模拟器
    Write-Host "启动模拟器: $InstanceName"
    Start-Process -FilePath $batPath -WindowStyle Normal

    # 等待连接
    Write-Host "等待模拟器启动..."
    $waited = 0
    while ($waited -lt $MaxWaitSeconds) {
        $devices = & $hdcPath list targets 2>$null
        if ($devices -match "127\.0\.0\.1:\d+") {
            Write-Host "✓ 模拟器已连接: $devices"
            return $true
        }
        Start-Sleep -Seconds 1
        $waited++
        Write-Progress -Activity "等待模拟器" -Status "$waited/$MaxWaitSeconds 秒" -PercentComplete ($waited * 100 / $MaxWaitSeconds)
    }

    Write-Host "✗ 错误：模拟器启动超时"
    return $false
}

# 使用函数
$success = Start-DevEcoEmulator -InstanceName "Mate 80 Pro1"
if ($success) {
    Write-Host "可以继续后续操作..."
}
```

## 常见问题

### Q1: 批处理文件执行后立即关闭

**原因**：缺少 `pause` 命令或批处理文件执行出错

**解决**：
1. 添加 `pause` 命令
2. 检查路径是否正确
3. 查看错误信息

### Q2: 找不到 Emulator.exe

**原因**：路径不正确或 DevEco Studio 未安装

**解决**：
1. 检查 DevEco Studio 安装路径
2. 确认 `emulator.exe` 文件存在
3. 使用完整路径

### Q3: hdc 无法连接设备

**原因**：模拟器启动时间不足

**解决**：
1. 增加等待时间（30-60秒）
2. 检查模拟器是否真的启动成功
3. 重启 hdc 服务：`hdc kill && hdc start`

### Q4: 批处理文件编码问题

**原因**：文件编码不是 ASCII

**解决**：
```powershell
# 使用 ASCII 编码
$batContent | Out-File -FilePath $batPath -Encoding ASCII
```

## 总结

**推荐方法**：使用 VBScript 创建独立进程

```powershell
$vbsPath = "$env:TEMP\start_emulator.vbs"
$vbsContent = @"
Set WshShell = CreateObject("WScript.Shell")
WshShell.Run """C:\Program Files\Huawei\DevEco Studio\tools\emulator\Emulator.exe"" -start ""Mate 80 Pro1""", 1, False
"@
$vbsContent | Out-File -FilePath $vbsPath -Encoding ASCII
cscript.exe //nologo $vbsPath
```

**优点**：
- **稳定性最高**：进程完全独立，不受父进程退出影响
- **解决120秒超时问题**：模拟器不会被意外终止
- **适合自动化**：无需人工干预
- **跨会话持久**：即使启动脚本退出，模拟器仍保持运行
