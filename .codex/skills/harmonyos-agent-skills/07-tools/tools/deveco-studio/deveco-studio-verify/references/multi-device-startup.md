# 多设备启动详细指南

本文档提供多设备模拟器启动的详细方法和最佳实践。

---

## 重要提示

1. **确保所有模拟器实例使用 Release 版本镜像**（非 Beta）
2. **模拟器启动顺序建议**：先手机，后折叠屏/平板
3. **每个模拟器启动间隔至少等待 5 秒**（避免启动冲突）

---

## 单设备启动回顾

详细单设备启动方法见：
- **deveco-studio-emulator skill** - 完整启动方法和跨平台支持
- [emulator-management.md](emulator-management.md) - 模拟器管理完整指南

**Windows 批处理文件启动（核心方法）**：
```powershell
# 创建批处理文件
$batPath = "$env:TEMP\start_emulator.bat"
@"
@echo off
cd /d "C:\Program Files\Huawei\DevEco Studio\tools\emulator"
Emulator.exe -start "Pura 9022"
pause
"@ | Out-File -FilePath $batPath -Encoding ASCII

# 在新窗口启动
Start-Process -FilePath $batPath -WindowStyle Normal
```

---

## 多设备启动方法

### 方法1：使用 PowerShell 创建多个临时批处理文件（推荐）

**优点**：
- 无需创建持久文件
- 自动间隔等待
- 稳定性最高

**完整示例**：
```powershell
# 定义模拟器列表
$emulators = @(
    @{
        Name = "Pura 9022"
        Type = "Phone"
        Port = "5555"
    },
    @{
        Name = "Mate X7"
        Type = "Foldable"
        Port = "5557"
    }
)

# 循环启动每个模拟器
$devecoPath = "C:\Program Files\Huawei\DevEco Studio"
foreach ($emu in $emulators) {
    # 创建临时批处理文件
    $batPath = "$env:TEMP\start_$($emu.Name.Replace(' ', '_')).bat"
    @"
@echo off
cd /d "$devecoPath\tools\emulator"
Emulator.exe -start "$($emu.Name)"
pause
"@ | Out-File -FilePath $batPath -Encoding ASCII
    
    # 在新窗口启动
    Start-Process -FilePath $batPath -WindowStyle Normal
    
    # 等待 5 秒（避免启动冲突）
    Write-Host "已启动 $($emu.Name)，等待 5 秒..."
    Start-Sleep -Seconds 5
}

# 等待模拟器完全启动（30-60秒）
Write-Host "等待模拟器启动完成（30秒）..."
Start-Sleep -Seconds 30

# 检查多设备连接
$hdcPath = "$devecoPath\sdk\default\openharmony\toolchains\hdc.exe"
Write-Host "检查设备连接..."
& $hdcPath list targets

# 获取设备信息
foreach ($emu in $emulators) {
    $deviceId = $emu.Port
    Write-Host "设备 $($emu.Name) (127.0.0.1:$deviceId):"
    & $hdcPath -t "127.0.0.1:$deviceId" shell param get const.product.devicetype
}
```

---

### 方法2：创建持久批处理文件（每个设备一个）

**适用场景**：重复多设备测试、自动化测试脚本

**步骤**：

**1. 创建批处理文件**（每个设备一个）：

`scripts/start_pura9022.bat`:
```bat
@echo off
cd /d "C:\Program Files\Huawei\DevEco Studio\tools\emulator"
Emulator.exe -start "Pura 9022"
pause
```

`scripts/start_matex7.bat`:
```bat
@echo off
cd /d "C:\Program Files\Huawei\DevEco Studio\tools\emulator"
Emulator.exe -start "Mate X7"
pause
```

**2. 创建启动控制脚本**：

`scripts/start_multi_emulators.bat`:
```bat
@echo off
REM 多设备模拟器启动脚本

set DEVECO_PATH=C:\Program Files\Huawei\DevEco Studio
set HDC_TOOL=%DEVECO_PATH%\sdk\default\openharmony\toolchains\hdc.exe

echo 启动第一个模拟器: Pura 9022
call scripts\start_pura9022.bat

echo 等待 5 秒...
timeout /t 5 /nobreak

echo 启动第二个模拟器: Mate X7
call scripts\start_matex7.bat

echo 等待启动完成（30秒）...
timeout /t 30 /nobreak

echo 检查设备连接...
"%HDC_TOOL%" list targets

pause
```

**3. 执行控制脚本**：
```bash
scripts\start_multi_emulators.bat
```

---

### 方法3：使用 PowerShell 后台启动多个模拟器

**适用场景**：无需新窗口、后台启动

```powershell
# 定义模拟器列表
$emulators = @("Pura 9022", "Mate X7")

$devecoPath = "C:\Program Files\Huawei\DevEco Studio"
$emulatorPath = "$devecoPath\tools\emulator\Emulator.exe"

foreach ($emu in $emulators) {
    # 后台启动
    Start-Process -FilePath $emulatorPath -ArgumentList "-start", $emu -WindowStyle Hidden
    
    # 等待 5 秒
    Write-Host "已启动 $emu，等待 5 秒..."
    Start-Sleep -Seconds 5
}

# 等待启动完成
Start-Sleep -Seconds 30

# 检查连接
& "$devecoPath\sdk\default\openharmony\toolchains\hdc.exe" list targets
```

**注意**：后台启动可能不如批处理文件方式稳定。

---

## 多设备操作命令

### 指定设备截图

```bash
# 手机截图
hdc -t 127.0.0.1:5555 shell snapshot_display -f /data/local/tmp/phone.jpeg
hdc -t 127.0.0.1:5555 file recv /data/local/tmp/phone.jpeg ./screenshots/

# 折叠屏截图
hdc -t 127.0.0.1:5557 shell snapshot_display -f /data/local/tmp/fold.jpeg
hdc -t 127.0.0.1:5557 file recv /data/local/tmp/fold.jpeg ./screenshots/
```

### 多设备UI树对比

```bash
# 手机UI树
hdc -t 127.0.0.1:5555 shell uitest dumpLayout -p /data/local/tmp/layout_phone.txt
hdc -t 127.0.0.1:5555 file recv /data/local/tmp/layout_phone.txt ./screenshots/

# 折叠屏UI树
hdc -t 127.0.0.1:5557 shell uitest dumpLayout -p /data/local/tmp/layout_fold.txt
hdc -t 127.0.0.1:5557 file recv /data/local/tmp/layout_fold.txt ./screenshots/
```

### 多设备日志收集

```bash
# 手机日志
hdc -t 127.0.0.1:5555 shell hilog -x -n 500 > logs/phone_hilog.txt

# 折叠屏日志
hdc -t 127.0.0.1:5557 shell hilog -x -n 500 > logs/fold_hilog.txt
```

---

## 多设备验证要点

| 验证项 | 手机 | 折叠屏 | 验证方法 |
|--------|------|---------|----------|
| 屏幕尺寸 | 1320x2856 | 2210x2416 | 截图尺寸对比 |
| 居中对齐 | ✅ | ✅ | UI树 bounds分析 |
| 安全区避让 | 137px | 122px | 状态栏高度检查 |
| 文件大小 | 88KB | 115KB | 截图大小对比 |

---

## 推荐设备组合

### 组合1：手机 + 折叠屏（推荐）

**用途**：
- 验证折叠屏适配
- 测试分栏布局
- 检查折叠/展开状态

**设备列表**：
- Phone: Pura 9022 (1320x2856)
- Foldable: Mate X7 (2210x2416 展开状态)

**启动顺序**：先手机，后折叠屏

---

### 组合2：手机 + 平板（推荐）

**用途**：
- 验证大屏布局
- 测试多列布局
- 检查横屏模式

**设备列表**：
- Phone: Pura 9022 (1320x2856)
- Tablet: MatePad Pro (2560x1600)

**启动顺序**：先手机，后平板

---

### 组合3：三设备（可选）

**用途**：
- 全面多设备验证
- 覆盖更多设备形态

**设备列表**：
- Phone: Pura 9022
- Foldable: Mate X7
- Tablet: MatePad Pro

**启动顺序**：手机 → 折叠屏 → 平板（每个间隔 5 秒）

---

## 常见问题

### 1. 多设备同时启动失败

**错误**：部分模拟器未启动或连接失败

**解决方案**：
```powershell
# 增加启动间隔时间（改为 10 秒）
Start-Sleep -Seconds 10

# 或者逐个启动并验证
foreach ($emu in $emulators) {
    Start-Process -FilePath $batPath -WindowStyle Normal
    Start-Sleep -Seconds 30  # 每个等待 30 秒
    
    # 验证连接
    & $hdcPath list targets | Select-String $emu.Port
}
```

---

### 2. 设备ID不确定

**问题**：不知道每个模拟器的端口ID

**解决方案**：
```bash
# 查看所有连接
hdc list targets

# 输出格式：
# 127.0.0.1:5555  # 第一个模拟器
# 127.0.0.1:5557  # 第二个模拟器

# 查看模拟器详情（包含端口信息）
emulator -list -details | grep "hw.hdc.port"
```

---

### 3. 批处理文件冲突

**问题**：多个批处理文件同时执行冲突

**解决方案**：
```powershell
# 使用不同的临时文件名
$batPath1 = "$env:TEMP\start_emulator1.bat"
$batPath2 = "$env:TEMP\start_emulator2.bat"

# 或者使用时间戳
$timestamp = Get-Date -Format "yyyyMMddHHmmss"
$batPath = "$env:TEMP\start_emulator_$timestamp.bat"
```

---

## 最佳实践

### 1. 启动顺序建议

- **先启动手机**：基础设备，验证核心功能
- **后启动折叠屏/平板**：大屏设备，验证适配

### 2. 启动间隔

- **最小间隔**：5 秒（避免冲突）
- **推荐间隔**：10-15 秒（更稳定）

### 3. 验证连接

每启动一个设备后立即验证：
```powershell
foreach ($emu in $emulators) {
    # 启动模拟器
    Start-Process -FilePath $batPath -WindowStyle Normal
    Start-Sleep -Seconds 10
    
    # 验证连接
    $result = & $hdcPath list targets 2>&1
    if ($result -match "127.0.0.1:") {
        Write-Host "✅ $emu.Name 已连接"
    } else {
        Write-Host "⚠️ $emu.Name 连接失败，等待更多时间..."
        Start-Sleep -Seconds 20
    }
}
```

---

## 快速参考

**多设备启动命令**：
```powershell
# 方法1：临时批处理文件（推荐）
$emulators = @("Pura 9022", "Mate X7")
foreach ($emu in $emulators) {
    $batPath = "$env:TEMP\start_$emu.bat"
    # 创建批处理文件并启动...
}

# 方法2：持久批处理文件
scripts\start_multi_emulators.bat

# 检查连接
hdc list targets

# 多设备操作
hdc -t 127.0.0.1:5555 install -r <hap>
hdc -t 127.0.0.1:5557 install -r <hap>
```

---

## 相关文档

- **deveco-studio-emulator skill** - 单设备启动详细方法
- [emulator-management.md](emulator-management.md) - 模拟器管理完整指南
- [verification-workflow.md](verification-workflow.md) - 详细验证流程
- [device-matrix.md](device-matrix.md) - 设备规格和验证项