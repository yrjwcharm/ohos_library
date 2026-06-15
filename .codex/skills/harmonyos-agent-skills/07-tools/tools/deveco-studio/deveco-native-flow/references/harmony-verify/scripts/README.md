# HarmonyOS 验证辅助脚本

本目录包含 HarmonyOS 设备验证的辅助脚本。

## hdc.sh - 设备验证脚本

一个便捷的命令行工具，封装了常用的 hdc 命令。

### 使用方法

```bash
chmod +x hdc.sh
./hdc.sh <command> [args...]
```

### 命令列表

#### 设备管理

```bash
# 列出已连接设备
./hdc.sh list

# 列出已安装模拟器
./hdc.sh emulators

# 获取设备信息
./hdc.sh info <device>
```

#### 应用管理

```bash
# 列出已安装应用
./hdc.sh apps <device>

# 安装应用
./hdc.sh install <device> <hap>

# 卸载应用
./hdc.sh uninstall <device> <bundle>

# 启动应用
./hdc.sh launch <device> <bundle>

# 停止应用
./hdc.sh stop <device> <bundle>
```

#### UI 操作

```bash
# 点击
./hdc.sh tap <device> <x> <y>

# 滑动 (up/down/left/right)
./hdc.sh swipe <device> up

# 输入文字
./hdc.sh input <device> <x> <y> "Hello"

# 按键 (Back/Home/24/25...)
./hdc.sh key <device> Back
```

#### 截图和日志

```bash
# 截图
./hdc.sh screenshot <device> [output]

# 获取页面元素
./hdc.sh elements <device>

# 获取日志
./hdc.sh logs <device> [bundle]

# 获取错误日志
./hdc.sh errors <device>
```

### 环境变量

- `HDC_DEVICE`: 默认设备 ID

```bash
export HDC_DEVICE="192.168.1.100:5555"
./hdc.sh screenshot
```

### 示例

```bash
# 列出设备
./hdc.sh list

# 截图
./hdc.sh screenshot 192.168.1.100:5555 ./test.jpeg

# 获取应用日志
./hdc.sh logs 192.168.1.100:5555 com.example.myapplication

# 点击屏幕中心
./hdc.sh tap 192.168.1.100:5555 540 960

# 向下滑动
./hdc.sh swipe 192.168.1.100:5555 down

# 按返回键
./hdc.sh key 192.168.1.100:5555 Back
```

## 其他脚本

### analyze_logs.py

分析 hilog 日志文件，提取关键信息。

```bash
python analyze_logs.py <log_file> [--level E] [--bundle com.example.app]
```

### compare_screenshots.py

对比两张截图，生成差异报告。

```bash
python compare_screenshots.py <before.png> <after.png> [--output diff.png]
```