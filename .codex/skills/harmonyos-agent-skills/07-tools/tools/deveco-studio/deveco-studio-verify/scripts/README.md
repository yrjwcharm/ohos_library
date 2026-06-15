# Scripts 目录说明

本目录包含 HarmonyOS 设备验证和模拟器管理的辅助脚本。

---

## 批处理脚本（Windows）

### 1. create_and_start_emulator.bat

**用途**: 创建并启动新的模拟器实例

**使用方法**:
```bash
# 使用默认参数（TestPhone, Phone, HarmonyOS 6.0.2(22)）
create_and_start_emulator.bat

# 指定参数
create_and_start_emulator.bat MyFold Foldable "HarmonyOS 6.0.2(22)"

# 参数说明:
#   参数1: 实例名称（如 MyPhone, TestFold）
#   参数2: 设备类型（Phone, Foldable, Tablet 等）
#   参数3: 系统版本（如 HarmonyOS 6.0.2(22)）
```

**执行流程**:
1. 检查环境（Emulator.exe 和 hdc.exe）
2. 创建模拟器实例
3. 查看模拟器详情
4. 启动模拟器
5. 等待启动完成（30秒）
6. 检查设备连接
7. 获取设备信息

---

### 2. start_emulator_template.bat

**用途**: 快速启动已存在的模拟器实例

**使用方法**:
```bash
# 1. 编辑脚本文件，修改 EMULATOR_NAME 变量
#    set EMULATOR_NAME=你的模拟器名称

# 2. 执行脚本
start_emulator_template.bat
```

**适用场景**:
- 重复启动同一模拟器实例
- 集成到自动化测试脚本
- 快速启动测试环境

---

### 3. start_multi_emulators.bat

**用途**: 同时启动多个模拟器实例（顺序启动）

**使用方法**:
```bash
# 1. 编辑脚本文件，修改模拟器列表
#    set EMULATOR1=第一个模拟器名称
#    set EMULATOR2=第二个模拟器名称

# 2. 执行脚本
start_multi_emulators.bat
```

**执行流程**:
1. 启动第一个模拟器
2. 等待 5 秒（避免启动冲突）
3. 启动第二个模拟器
4. 等待启动完成（30秒）
5. 检查多设备连接

**适用场景**:
- 多设备验证测试
- 手机 + 折叠屏组合测试
- 手机 + 平板组合测试

---

## PowerShell 脚本（跨平台）

### hdc.ps1 / hdc.sh

**用途**: hdc 命令封装和辅助工具

**详细使用方法**见脚本文件内部注释。

---

## 快速开始

### 单设备测试

```bash
# 方法1: 创建新实例并启动
create_and_start_emulator.bat TestPhone Phone

# 方法2: 启动已有实例
# 编辑 start_emulator_template.bat 修改模拟器名称
start_emulator_template.bat
```

### 多设备测试

```bash
# 编辑 start_multi_emulators.bat 配置模拟器列表
start_multi_emulators.bat
```

---

## 注意事项

1. **Beta 版本镜像**: 无法通过命令行启动，需使用 DevEco Studio 界面
2. **启动时间**: 模拟器启动需要 30-60 秒，请耐心等待
3. **多设备启动**: 每个模拟器启动间隔至少等待 5 秒
4. **路径配置**: 如 DevEco Studio 安装路径不同，需修改脚本中的 DEVECO_PATH 变量

---

## 推荐工作流程

```bash
# 1. 首次使用
create_and_start_emulator.bat TestPhone Phone

# 2. 安装应用
hdc install -r entry/build/default/outputs/default/entry-default-unsigned.hap

# 3. 启动应用
hdc shell aa start -a EntryAbility -b com.example.myapplication

# 4. 执行测试和验证（使用 hdc 命令）

# 5. 多设备验证
# 编辑 start_multi_emulators.bat
start_multi_emulators.bat

# 6. 清理
emulator -delete TestPhone
```

---

## 常见问题

### Q: 脚本执行提示找不到 Emulator.exe

**A**: 检查 DevEco Studio 安装路径，修改脚本中的 DEVECO_PATH 变量

### Q: 模拟器启动后设备未连接

**A**: 
- 等待更长时间（60秒）
- 检查模拟器窗口是否已打开
- 重启 hdc 服务: `hdc kill && hdc start`

### Q: Beta 版本镜像启动失败

**A**: 
- 使用 Release 版本镜像（HarmonyOS 6.0.2(22)）
- 或通过 DevEco Studio 界面启动 Beta 版本

---

## 相关文档

- [emulator-management.md](../references/emulator-management.md) - 模拟器管理完整指南
- [hdc-operations.md](../references/hdc-operations.md) - hdc 命令完整参考
- [verification-workflow.md](../references/verification-workflow.md) - 详细验证流程