# Emulator命令行工具详细参考

## 完整启动命令格式

```bash
emulator -hvd {模拟器名称} -path {模拟器实例路径} -imageRoot {模拟器镜像路径} -hdcport {hdc端口号}
```

## 参数详细说明

| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `-hvd` | string | 是 | 华为虚拟设备名称 |
| `-path` | string | 否 | 模拟器实例存储路径，默认为用户目录下的`.Huawei/Emulator/deployed` |
| `-imageRoot` | string | 否 | 模拟器镜像根路径，默认为SDK安装目录 |
| `-hdcport` | number | 否 | HDC服务端口号，默认为5037 |

## 默认路径说明

### Windows
- 模拟器实例路径: `C:\Users\{用户名}\AppData\Local\Huawei\Emulator\deployed`
- 镜像路径: `C:\Users\{用户名}\AppData\Local\Huawei\Sdk`

### macOS
- 模拟器实例路径: `~/.Huawei/Emulator/deployed`
- 镜像路径: `~/Library/Huawei/Sdk`

## 常用命令

```bash
# 列出所有可用模拟器
emulator -list-avds

# 启动指定模拟器
emulator -hvd MyPhone

# 启动时指定端口
emulator -hvd MyPhone -hdcport 7035

# 查看帮助
emulator -h
```

## 模拟器实例管理

### 创建和查看实例

```bash
# 创建Phone类型模拟器
emulator -create {实例名称} -deviceType Phone -osVersion "HarmonyOS 6.0.2(22)"

# 创建时指定存储和内存
emulator -create {实例名称} -deviceType Phone -osVersion "HarmonyOS 6.0.2(22)" -storage 6 -memory 4

# 列出所有模拟器实例
emulator -list

# 列出详细信息（包含版本、状态、instancePath等）
emulator -list -details

# 列出可用镜像
emulator -imageList

# 删除模拟器实例（强制删除）
emulator -delete {实例名称} -force

# 接受许可证协议（首次使用）
emulator -license accept
```

**支持的设备类型**：Phone, Foldable, WideFold, TripleFold, Tablet, 2in1, 2in1 Foldable, Wearable, TV

---

### 创建模拟器前的检查

**重要**：DevEco Studio 安装后会自带几个模拟器实例，但这些实例可能没有下载对应的镜像，需要先下载镜像才能使用。

**检查步骤**：

1. **列出所有模拟器实例及其状态**
   ```bash
   emulator -list -details
   ```
   查看输出中的 `osVersion` 字段，如果没有版本信息或显示为空，说明镜像未下载。

2. **列出已下载的镜像**
   ```bash
   emulator -imageList -downloaded true
   ```

3. **如果镜像未下载，先下载镜像**
   ```bash
   emulator -install -deviceType Phone -osVersion "HarmonyOS 6.0.2(22)" -force
   ```
   **注意**：镜像版本需要与实例的 `osVersion` 一致。

4. **再启动模拟器实例**
   ```bash
   emulator -start {实例名称}
   ```

**说明**：模拟器实例依赖于已下载的镜像，如果镜像不存在，启动实例会失败。建议在启动实例前先确认镜像已下载。

---

## 环境变量配置

### Windows
1. 右键"此电脑" → 属性 → 高级系统设置 → 环境变量
2. 在系统或用户PATH中添加: `{DevEco Studio安装目录}\tools\emulator`
3. 重新打开命令行窗口

### macOS/Linux
编辑 `~/.bash_profile` 或 `~/.zshrc`:
```bash
export PATH=$PATH:/path/to/DevEco/Studio/tools/emulator
```

## 官方文档
https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-emulator-command-line
