# 模拟器场景化命令参考

## emulator场景化命令

模拟器场景化命令用于控制模拟器设备，包括旋转、电源、截屏、音量、摇一摇和折叠设备操作。

## 基础参数

### 必选参数

| 参数 | 说明 |
|------|------|
| `-instance {实例名}` | 模拟器实例名称 |

## 设备控制命令

### 旋转设备

```bash
# 旋转到左屏
emulator -instance MyPhone -rotation left

# 旋转到右屏
emulator -instance MyPhone -rotation right
```

**注意**：必选参数 `-rotation left` 或 `-rotation right`

---

### 电源控制

```bash
# 关闭/开启屏幕电源
emulator -instance MyPhone -power
```

---

### 截屏

```bash
# 截屏并保存到指定路径
emulator -instance MyPhone -screenshot "D:\screenshots\screenshot.png"

# 截屏并保存到默认路径（模拟器默认截图路径）
emulator -instance MyPhone -screenshot
```

---

### 音量控制

```bash
# 增加音量
emulator -instance MyPhone -volume up

# 降低音量
emulator -instance MyPhone -volume down
```

**注意**：必选参数 `-volume up` 或 `-volume down`

---

### 摇一摇

```bash
# 触发摇一摇动作
emulator -instance MyPhone -shake
```

---

## 折叠设备命令

### 三折叠设备

```bash
# 单屏
emulator -instance MyTripleFold -foldedState single

# 双屏
emulator -instance MyTripleFold -foldedState double

# 三屏
emulator -instance MyTripleFold -foldedState triple

# 左折叠右半折
emulator -instance MyTripleFold -foldedState left-folded-right-half-folded

# 左半折右展开
emulator -instance MyTripleFold -foldedState left-half-folded-right-expanded

# 左展开右折叠
emulator -instance MyTripleFold -foldedState left-expanded-right-folded

# 左半折右折叠
emulator -instance MyTripleFold -foldedState left-half-folded-right-folded

# 左展开右半折
emulator -instance MyTripleFold -foldedState left-expanded-right-half-folded

# 左半折右半折
emulator -instance MyTripleFold -foldedState left-half-folded-right-half-folded
```

---

### 双折叠/阔折叠设备

```bash
# 展开
emulator -instance MyFold -foldedState open

# 折叠
emulator -instance MyFold -foldedState close

# 半折
emulator -instance MyFold -foldedState half-open
```

---

### 折叠PC设备

```bash
# 横展（展开）
emulator -instance MyFoldPC -foldedState open

# 磁吸（悬停）
emulator -instance MyFoldPC -foldedState vertical-open

# 半折
emulator -instance MyFoldPC -foldedState half-open

# 竖展（竖向展开）
emulator -instance MyFoldPC -foldedState close
```

**注意**：根据设备类型选择对应的 `-foldedState` 参数

---

## 完整工作流程示例

### 场景1：旋转并截屏

```bash
# 旋转到右屏
emulator -instance MyPhone -rotation right

# 截屏
emulator -instance MyPhone -screenshot
```

---

### 场景2：音量和摇一摇

```bash
# 增加音量
emulator -instance MyPhone -volume up

# 触发摇一摇
emulator -instance MyPhone -shake
```

---

### 场景3：折叠设备展开

```bash
# 三折叠设备展开到三屏
emulator -instance MyTripleFold -foldedState triple

# 双折叠设备展开
emulator -instance MyFold -foldedState open

# 折叠PC横展
emulator -instance MyFoldPC -foldedState open
```
---

## 注意事项

1. **必选参数**：
   - 所有命令都必须包含 `-instance {实例名}` 参数
   - 旋转命令必须指定 `-rotation left` 或 `-rotation right`
   - 音量命令必须指定 `-volume up` 或 `-volume down`
   - 折叠命令必须根据设备类型指定正确的 `-foldedState` 参数

2. **设备兼容性**：
   - 折叠命令仅支持折叠屏设备类型（Foldable, WideFold, TripleFold）
   - 三折叠、双折叠、折叠PC的参数不同，请根据实际设备类型选择

3. **命令格式**：
   - 多个参数用空格分隔
   - 命令区分大小写
   - 所有命令需要设备处于运行状态

4. **实时性**：
   - 所有命令立即生效

---

## 相关工具

- **hdc 命令**：用于应用安装、日志查看等
- **hilog 工具**：查看系统日志
- **hidumper 工具**：堆栈转储分析
