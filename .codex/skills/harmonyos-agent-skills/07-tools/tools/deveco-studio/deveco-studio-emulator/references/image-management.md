# 镜像管理

HarmonyOS模拟器镜像的下载、删除和查看。

## 下载和删除镜像

### 下载镜像

```bash
# 下载指定版本的镜像（强制覆盖已存在的镜像）
emulator -install -deviceType Phone -osVersion "HarmonyOS 5.1.1(19)" -force

# 下载镜像并指定镜像路径（强制覆盖已存在的镜像）
emulator -install -deviceType Phone -osVersion "HarmonyOS 5.1.1(19)" -imageRoot "D:\emulator\images" -force

# 下载镜像并配置网络代理（强制覆盖已存在的镜像）
emulator -install -deviceType Phone -osVersion "HarmonyOS 5.1.1(19)" -http_proxy "http://proxy.example.com:8080" -force
```

### 删除镜像

```bash
# 删除指定版本的镜像（强制删除）
emulator -uninstall -deviceType Phone -osVersion "HarmonyOS 5.1.1(19)" -force

# 删除镜像并指定镜像路径（强制删除）
emulator -uninstall -deviceType Phone -osVersion "HarmonyOS 5.1.1(19)" -imageRoot "D:\emulator\images" -force
```

## 查看镜像状态

### 列出所有镜像

```bash
# 列出所有可用镜像（包括已下载和未下载）
emulator -imageList

# 只列出已下载的镜像
emulator -imageList -downloaded true

# 只列出未下载的镜像
emulator -imageList -downloaded false

# 列出指定设备类型的镜像
emulator -imageList -deviceType Phone

# 列出指定设备类型的已下载镜像
emulator -imageList -deviceType Phone -downloaded true
```

## 参数说明

### install 命令参数

- `-deviceType`: 模拟器设备类型（必需）
  - 支持值：Phone, Foldable, WideFold, TripleFold, Tablet, 2in1, 2in1 Foldable, Wearable, TV
- `-osVersion`: HarmonyOS镜像版本（必需）
  - 格式：`HarmonyOS {version}({api_version}) [BetaX]`
  - 示例：`HarmonyOS 6.0.0(20)`, `HarmonyOS 6.0.1(21) Beta1`
- `-imageRoot`: 镜像根目录路径（可选）
- `-http_proxy`: 网络代理配置（可选）
- `-force`: 强制下载，覆盖已存在的镜像（可选）

### uninstall 命令参数

- `-deviceType`: 模拟器设备类型（必需）
- `-osVersion`: HarmonyOS镜像版本（必需）
- `-imageRoot`: 镜像根目录路径（可选）
- `-force`: 强制删除（可选，默认已添加）

### imageList 命令参数

- `-deviceType`: 过滤指定设备类型的镜像（可选）
- `-downloaded`: 过滤已下载/未下载的镜像（可选）
  - `true`: 只列出已下载的镜像
  - `false`: 只列出未下载的镜像
- `-http_proxy`: 网络代理配置（可选）

## 常见问题

### 下载失败

1. 检查网络连接
2. 检查代理配置（如需要）：`-http_proxy "http://proxy.example.com:8080"`
3. 检查磁盘空间
4. 检查镜像版本是否正确

### 删除失败

1. 检查镜像是否存在：`emulator -imageList -downloaded true`
2. 检查镜像路径是否正确
3. 检查文件权限

### 镜像版本格式错误

正确的镜像版本格式：
- `HarmonyOS 6.0.2(22)` - Release版本
- `HarmonyOS 6.0.1(21) Beta1` - Beta版本

错误的格式：
- `6.0.2(22)` - 缺少 "HarmonyOS" 前缀
- `HarmonyOS 6.0.2` - 缺少 API 版本号

## 实际示例

### Windows PowerShell

```powershell
# 设置 DevEco Studio 路径
$env:EMULATOR_PATH = "C:\Program Files\Huawei\DevEco Studio\tools\emulator\emulator.exe"

# 下载 HarmonyOS 5.1.1(19) Phone 镜像（强制覆盖已存在的镜像）
& $env:EMULATOR_PATH -install -deviceType Phone -osVersion "HarmonyOS 5.1.1(19)" -force

# 查看已下载的镜像
& $env:EMULATOR_PATH -imageList -downloaded true

# 删除 HarmonyOS 5.1.1(19) Phone 镜像（强制删除）
& $env:EMULATOR_PATH -uninstall -deviceType Phone -osVersion "HarmonyOS 5.1.1(19)" -force
```

### macOS/Linux

```bash
# 设置 DevEco Studio 路径
export EMULATOR_PATH="/Applications/DevEco-Studio.app/Contents/tools/emulator/emulator"

# 下载 HarmonyOS 5.1.1(19) Phone 镜像（强制覆盖已存在的镜像）
$EMULATOR_PATH -install -deviceType Phone -osVersion "HarmonyOS 5.1.1(19)" -force

# 查看已下载的镜像
$EMULATOR_PATH -imageList -downloaded true

# 删除 HarmonyOS 5.1.1(19) Phone 镜像（强制删除）
$EMULATOR_PATH -uninstall -deviceType Phone -osVersion "HarmonyOS 5.1.1(19)" -force
```

## 官方文档

- [镜像管理命令](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-emulator-command-line#section62671171252)
- [Emulator命令行](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-emulator-command-line)
