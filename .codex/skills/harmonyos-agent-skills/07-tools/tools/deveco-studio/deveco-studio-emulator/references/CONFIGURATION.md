# 配置说明

## 配置优先级

所有脚本按以下优先级读取配置：

1. **环境变量**（最高优先级）
2. **config config.json 配置文件**
3. **自动查找**（最低优先级）

## 配置方式

### 方式1：自动配置（推荐）

使用 `setup.js` 脚本自动查找并生成配置文件：

```bash
node scripts/setup.js
```

这个脚本会：
- 自动查找 DevEco Studio 安装路径（Windows/macOS/Linux）
- 获取 emulator 和 hdc 工具的完整路径
- 查找模拟器部署路径
- 自动生成 `config.json` 配置文件
- 列出可用的模拟器实例

### 方式2：编辑 config.json

复制 `config.example.json` 为 `config.json`，然后填写实际路径：

```json
{
  "devecoStudioPath": "C:\\Program Files\\Huawei\\DevEco Studio",
  "emulatorPath": "C:\\Program Files\\Huawei\\DevEco Studio\\tools\\emulator\\emulator.exe",
  "hdcPath": "C:\\Program Files\\Huawei\\DevEco Studio\\sdk\\default\\openharmony\\toolchains\\hdc.exe",
  "emulatorInstancePath": "C:\\Users\\YourName\\Huawei\\emulator\\deployed\\MyPhone",
  "emulatorDeployPath": "C:\\Users\\YourName\\Huawei\\emulator\\deployed",
  "tempPath": "C:\\Temp"
}
```

### 方式3：设置环境变量

**Windows:**
```powershell
# 设置 DevEco Studio 路径
$env:DEVECO_STUDIO_PATH = "C:\Program Files\Huawei\DevEco Studio"

# 设置模拟器实例路径
$env:EMULATOR_INSTANCE_PATH = "C:\Users\YourName\Huawei\emulator\deployed\MyPhone"
```

**macOS/Linux:**
```bash
# 设置 DevEco Studio 路径
export DEVECO_STUDIO_PATH="/Applications/DevEco-Studio.app/Contents"

# 设置模拟器实例路径
export EMULATOR_INSTANCE_PATH="$HOME/Huawei/emulator/deployed/MyPhone"
```

## 配置项说明

### DEVECO_STUDIO_PATH

指定 DevEco Studio 的安装路径。

**常见安装路径：**

**Windows:**
- `C:\Program Files\Huawei\DevEco Studio`
- `C:\Program Files (x86)\Huawei\DevEco Studio`
- `%LOCALAPPDATA%\Programs\Huawei\DevEco Studio`

**macOS:**
- `/Applications/DevEco-Studio.app/Contents`

**Linux:**
- `/opt/Huawei/DevEco Studio`
- `~/Huawei/DevEco Studio`

### EMULATOR_INSTANCE_PATH

指定模拟器实例的路径（用于崩溃日志分析）。

**常见部署路径：**

**Windows:**
- `%LOCALAPPDATA%\Huawei\emulator\deployed\{实例名}`
- `%USERPROFILE%\Huawei\emulator\deployed\{实例名}`

**macOS/Linux:**
- `~/Library/Huawei/emulator/deployed/{实例名}`
- `~/.Huawei/emulator/deployed/{实例名}`

### EMULATOR_DEPLOY_PATH

指定模拟器部署目录（自动查找多个实例）。

**常见路径：**

**Windows:**
- `%LOCALAPPDATA%\Huawei\emulator\deployed`
- `%USERPROFILE%\Huawei\emulator\deployed`

**macOS/Linux:**
- `~/Library/Huawei/emulator/deployed`
- `~/.Huawei/emulator/deployed`

### TEMP_PATH

指定临时文件目录（用于日志解压）。

**默认值：**
- Windows: `%TEMP%` 或 `%TMP%`
- macOS/Linux: `/tmp`

## 配置验证

### 验证 DevEco Studio 路径

```powershell
# Windows - 验证环境变量
Test-Path $env:DEVECO_STUDIO_PATH

# Windows - 验证配置文件
$config = Get-Content config.json | ConvertFrom-Json
Test-Path $config.devecoStudioPath
```

```bash
# macOS/Linux - 验证环境变量
test -d "$DEVECO_STUDIO_PATH"

# macOS/Linux - 验证配置文件
test -d "$(jq -r '.devecoStudioPath' config.json)"
```

### 验证模拟器实例路径

```powershell
# Windows - 验证环境变量
Test-Path $env:EMULATOR_INSTANCE_PATH

# Windows - 验证配置文件
$config = Get-Content config.json | ConvertFrom-Json
Test-Path $config.emulatorInstancePath
```

```bash
# macOS/Linux - 验证环境变量
test -d "$EMULATOR_INSTANCE_PATH"

# macOS/Linux - 验证配置文件
test -d "$(jq -r '.emulatorInstancePath' config.json)"
```

## 配置示例

### 示例1：Windows 用户自定义路径

```powershell
# 方法1：：使用环境变量
$env:DEVECO_STUDIO_PATH = "D:\Programs\Huawei\DevEco Studio"
$env:EMULATOR_INSTANCE_PATH = "D:\Huawei\emulator\deployed\MyPhone"

# 方法2：：编辑 config.json
$config = @{
    devecoStudioPath = "D:\Programs\Huawei\DevEco Studio"
    emulatorInstancePath = "D:\Huawei\emulator\deployed\MyPhone"
}
$config | ConvertTo-Json -Depth 10 | Out-File config.json -Encoding UTF8

# 验证配置
Test-Path $env:DEVECO_STUDIO_PATH
Test-Path $env:EMULATOR_INSTANCE_PATH

# 使用脚本
.\scripts\analyze-crash-log.ps1 -AutoFind
```

### 示例2：macOS 默认路径

```bash
# 方法1：：使用环境变量
export DEVECO_STUDIO_PATH="/Applications/DevEco-Studio.app/Contents"
export EMULATOR_INSTANCE_PATH="$HOME/Library/Huawei/emulator/deployed/MyPhone"

# 方法2：：编辑 config.json
cat > config.json << EOF
{
  "devecoStudioPath": "/Applications/DevEco-Studio.app/Contents",
  "emulatorInstancePath": "$HOME/Library/Huawei/emulator/deployed/MyPhone"
}
EOF

# 验证配置
test -d "$DEVECO_STUDIO_PATH"
test -d "$EMULATOR_INSTANCE_PATH"

# 使用脚本
./scripts/analyze-crash-log.ps1 -AutoFind
```

### 示例3：使用自动配置

```bash
# 运行自动配置脚本
node scripts/setup.js

# 脚本会自动生成 config.json
# 后续脚本会自动读取配置文件
```

## 常见问题

### 找不到 DevEco Studio 路径

1. **使用自动配置脚本**：
   ```bash
   node scripts/setup.js
   ```

2. **手动设置环境变量**：
   ```powershell
   $env:DEVECO_STUDIO_PATH = "<你的DevEco Studio路径>"
   ```

3. **编辑 config.json**：
   ```json
   {
     "devecoStudioPath": "C:\\Program Files\\Huawei\\DevEco Studio"
   }
   ```

4. **检查常见安装位置**：
   - Windows: `C:\Program Files\Huawei\DevEco Studio`
   - macOS: `/Applications/DevEco-Studio.app/Contents`
   - Linux: `/opt/Huawei/DevEco Studio`

### 找不到模拟器实例路径

1. **使用自动查找功能**：
   ```powershell
   .\scripts\analyze-crash-log.ps1 -AutoFind
   ```

2. **手动设置环境变量**：
   ```powershell
   $env:EMULATOR_INSTANCE_PATH = "<你的实例路径>"
   ```

3. **编辑 config.json**：
   ```json
   {
     "emulatorInstancePath": "C:\\Users\\YourName\\Huawei\\emulator\\deployed\\MyPhone"
   }
   ```

4. **使用 emulator 命令查找**：
   ```bash
   emulator -list -details
   ```

### 路径包含空格

确保路径中的空格用引号包裹：

```powershell
# 正确
$env:DEVECO_STUDIO_PATH = "C:\Program Files\Huawei\DevEco Studio"

# 错误
$env:DEVECO_STUDIO_PATH = C:\Program Files\Huawei\DevEco Studio
```

## 永久化配置

### Windows

**临时配置（当前会话）：**
```powershell
$env:DEVECO_STUDIO_PATH = "C:\Program Files\Huawei\DevEco Studio"
```

**永久配置（用户环境变量）：**
```powershell
[System.Environment]::SetEnvironmentVariable('DEVECO_STUDIO_PATH', 'C:\Program Files\Huawei\DevEco Studio', 'User')
```

**永久配置（系统环境变量）：**
1. 打开"系统属性" → "高级" → "环境变量"
2. 添加新的系统环境变量：
   - 变量名：`DEVECO_STUDIO_PATH`
   - 变量值：`C:\Program Files\Huawei\DevEco Studio`

### macOS/Linux

**临时配置（当前会话）：**
```bash
export DEVECO_STUDIO_PATH="/Applications/DevEco-Studio.app/Contents"
```

**永久配置（添加到 ~/.bashrc 或 ~/.zshrc）：**
```bash
echo 'export DEVECO_STUDIO_PATH="/Applications/DevEco-Studio.app/Contents"' >> ~/.bashrc
source ~/.bashrc
```

## 配置检查清单

在使用 skill 之前，请确保：

- [ ] DevEco Studio 已正确安装
- [ ] 已运行 `node scripts/setup.js` 或手动配置
- [ ] config.json 文件存在且配置正确（或环境变量已设置）
- [ ] 模拟器实例已创建
- [ ] Python 已安装（用于解压 .gz 文件）
- [ ] 路径中的空格已用引号包裹
- [ ] 有足够的磁盘空间用于解压日志

## 配置验证命令

```powershell
# 验证环境变量
Write-Host "DevEco Studio 路径: $env:DEVECO_STUDIO_PATH"
Test-Path $env:DEVECO_STUDIO_PATH

Write-Host "模拟器实例路径: $env:EMULATOR_INSTANCE_PATH"
Test-Path $env:EMULATOR_INSTANCE_PATH

# 验证配置文件
if (Test-Path config.json) {
    $config = Get-Content config.json | ConvertFrom-Json
    Write-Host "配置文件中的 DevEco Studio 路径: $($config.devecoStudioPath)"
    Test-Path $config.devecoStudioPath
}

# 验证 Python 安装
python --version

# 列出所有相关环境变量
Get-ChildItem Env: | Where-Object { $_.Name -like "*DEVECO*" -or $_.Name -like "*EMULATOR*" }
```
