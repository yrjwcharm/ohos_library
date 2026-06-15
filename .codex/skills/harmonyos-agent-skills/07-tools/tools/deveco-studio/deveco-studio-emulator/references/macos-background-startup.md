# macOS/Linux 后台启动模拟器（高级方式）

本文档提供了在 macOS/Linux 上后台启动 HarmonyOS 模拟器的高级方式。

## 前置条件

### 1. 设置环境变量

```bash
# macOS
export EMULATOR_PATH="/Applications/DevEco-Studio.app/Contents/tools/emulator/emulator"

# Linux
export EMULATOR_PATH="/opt/Huawei/DevEco Studio/tools/emulator/emulator"
```

### 2. 检查模拟器实例

```bash
# 列出所有模拟器实例
$EMULATOR_PATH -list

# 列出详细信息
$EMULATOR_PATH -list -details
```

---

## 方法1：使用 screen（推荐）

### 优点
- ✅ 广泛支持，几乎所有系统都预装
- ✅ 可以重新连接到会话
- ✅ 可以查看模拟器输出
- ✅ 稳定可靠

### 缺点
- ⚠️ 功能相对简单
- ⚠️ 窗口分割功能较弱

### 基本用法

```bash
# 1. 检查 screen 是否安装
which screen

# 如果未安装，macOS 使用 Homebrew 安装
brew install screen

# Linux 使用包管理器安装
# Ubuntu/Debian
sudo apt-get install screen

# CentOS/RHEL
sudo yum install screen
```

### 启动模拟器

```bash
# 使用 screen 后台启动
screen -dmS emulator -c "$EMULATOR_PATH -start MyPhone"

# 查看会话列表
screen -ls

# 重新连接到会话
screen -r emulator

# 分离会话（模拟器继续运行）
# 按 Ctrl+A 然后 D 分离
```

### 高级用法

```bash
# 创建多个会话
screen -dmS emulator1 -c "$EMULATOR_PATH -start MyPhone1"
screen -dmS emulator2 -c "$EMULATOR_PATH -start MyPhone2"

# 查看所有会话
screen -ls

# 切换到指定会话
screen -r emulator1

# 终止指定会话
screen -XS emulator1 quit
```

### 常见问题

**问题1：screen 命令没有反应**

```bash
# 检查 screen 是否安装
which screen

# 如果未安装，先安装
brew install screen  # macOS
sudo apt-get install screen  # Linux
```

**问题2：无法连接到会话**

```bash
# 检查会话是否存在
screen -ls

# 如果会话不存在，重新创建
screen -dmS emulator -c "$EMULATOR_PATH -start MyPhone"
```

**问题3：模拟器启动失败**

```bash
# 检查模拟器路径是否正确
echo $EMULATOR_PATH

# 检查模拟器实例是否存在
$EMULATOR_PATH -list

# 手动启动模拟器（查看错误信息）
$EMULATOR_PATH -start MyPhone
```

---

## 方法2：使用 tmux（最推荐）

### 优点
- ✅ 现代化，功能强大
- ✅ 更好的窗口分割功能
- ✅ 更丰富的配置选项
- ✅ 更好的性能

### 缺点
- ⚠️ 可能需要手动安装
- ⚠️ 学习曲线稍陡

### 基本用法

```bash
# 1. 检查 tmux 是否安装
which tmux

# 如果未安装，macOS 使用 Homebrew 安装
brew install tmux

# Linux 使用包管理器安装
# Ubuntu/Debian
sudo apt-get install tmux

# CentOS/RHEL
sudo yum install tmux
```

### 启动模拟器

```bash
# 使用 tmux 后台启动
tmux new-session -d -s emulator "$EMULATOR_PATH -start MyPhone"

# 查看会话列表
tmux ls

# 重新连接
tmux attach -t emulator

# 分离会话（模拟器继续运行）
# 按 Ctrl+B 然后 D 分离
```

### 高级用法

```bash
# 创建多个会话
tmux new-session -d -s emulator1 "$EMULATOR_PATH -start MyPhone1"
tmux new-session -d -s emulator2 "$EMULATOR_PATH -start MyPhone2"

# 查看所有会话
tmux ls

# 切换到指定会话
tmux attach -t emulator1

# 终止指定会话
tmux kill-session -t emulator1
```

### 常见问题

**问题1：tmux not found**

```bash
# 检查 tmux 是否安装
which tmux

# 如果未安装，先安装
brew install tmux  # macOS
sudo apt-get install tmux  # Linux
```

**问题2：无法连接到会话**

```bash
# 检查会话是否存在
tmux ls

# 如果会话不存在，重新创建
tmux new-session -d -s emulator "$EMULATOR_PATH -start MyPhone"
```

**问题3：模拟器启动失败**

```bash
# 检查模拟器路径是否正确
echo $EMULATOR_PATH

# 检查模拟器实例是否存在
$EMULATOR_PATH -list

# 手动启动模拟器（查看错误信息）
$EMULATOR_PATH -start MyPhone
```

---

## 方法对比

| 方法 | 安装要求 | 功能 | 稳定性 | 推荐度 |
|------|----------|------|--------|--------|
| **nohup** | 无（系统自带） | 简单 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **screen** | 可能需要安装 | 中等 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **tmux** | 可能需要安装 | 强大 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## 推荐使用策略

### 首次使用

```bash
# 1. 先尝试 nohup（最简单）
export EMULATOR_PATH="/Applications/DevEco-Studio.app/Contents/tools/emulator/emulator"
nohup $EMULATOR_PATH -start MyPhone > /dev/null 2>&1 &

# 2. 如果成功，继续使用 nohup
# 3. 如果失败，尝试 screen 或 tmux（见下文）
```

### nohup 失败后的降级策略

```bash
#!/bin/bash

# 设置环境变量
export EMULATOR_PATH="/Applications/DevEco-Studio.app/Contents/tools/emulator/emulator"
export INSTANCE_NAME="MyPhone"

# 方法1：尝试 nohup
echo "尝试使用 nohup 启动..."
nohup $EMULATOR_PATH -start $INSTANCE_NAME > /dev/null 2>&1 &
NOHUP_PID=$!

# 等待 5 秒
sleep 5

# 检查进程是否还在运行
if ps -p $NOHUP_PID > /dev/null 2>&1; then
    echo "✓ nohup 启动成功"
    echo "进程ID: $NOHUP_PID"
else
    echo "✗ nohup 启动失败，尝试使用 screen..."
    
    # 方法2：尝试 screen
    if command -v screen > /dev/null 2>&1; then
        screen -dmS emulator -c "$EMULATOR_PATH -start $INSTANCE_NAME"
        echo "✓ screen 启动成功"
        echo "重新连接: screen -r emulator"
    else
        echo "✗ screen 未安装，尝试使用 tmux..."
        
        # 方法3：尝试 tmux
        if command -v tmux > /dev/null 2>&1; then
            tmux new-session -d -s emulator "$EMULATOR_PATH -start $INSTANCE_NAME"
            echo "✓ tmux 启动成功"
            echo "重新连接: tmux attach -t emulator"
        else
            echo "✗ 所有方法都失败，请手动启动模拟器"
            echo "手动命令: $EMULATOR_PATH -start $INSTANCE_NAME"
        fi
    fi
fi
```

---

## 完整脚本示例

### 自动选择最佳启动方式

```bash
#!/bin/bash

# HarmonyOS 模拟器自动启动脚本
# 自动选择 nohup、screen 或 tmux 启动模拟器

# 配置
EMULATOR_PATH="/Applications/DevEco-Studio.app/Contents/tools/emulator/emulator"
INSTANCE_NAME="MyPhone"
LOG_FILE="/tmp/emulator_start.log"

# 日志函数
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# 检查模拟器实例
check_instance() {
    log "检查模拟器实例..."
    $EMULATOR_PATH -list | tee -a "$LOG_FILE"
    
    if $EMULATOR_PATH -list | grep -q "$INSTANCE_NAME"; then
        log "✓ 找到模拟器实例: $INSTANCE_NAME"
        return 0
    else
        log "✗ 未找到模拟器实例: $INSTANCE_NAME"
        return 1
    fi
}

# 方法1：使用 nohup
start_with_nohup() {
    log "尝试使用 nohup 启动..."
    nohup $EMULATOR_PATH -start $INSTANCE_NAME > /dev/null 2>&1 &
    NOHUP_PID=$!
    
    sleep 5
    
    if ps -p $NOHUP_PID > /dev/null 2>&1; then
        log "✓ nohup 启动成功"
        log "进程ID: $NOHUP_PID"
        echo $NOHUP_PID > /tmp/emulator.pid
        return 0
    else
        log "✗ nohup 启动失败"
        return 1
    fi
}

# 方法2：使用 screen
start_with_screen() {
    log "尝试使用 screen 启动..."
    
    if ! command -v screen > /dev/null 2>&1; then
        log "✗ screen 未安装"
        return 1
    fi
    
    screen -dmS emulator -c "$EMULATOR_PATH -start $INSTANCE_NAME"
    
    sleep 5
    
    if screen -ls | grep -q "emulator"; then
        log "✓ screen 启动成功"
        log "重新连接: screen -r emulator"
        return 0
    else
        log "✗ screen 启动失败"
        return 1
    fi
}

# 方法3：使用 tmux
start_with_tmux() {
    log "尝试使用 tmux 启动..."
    
    if ! command -v tmux > /dev/null 2>&1; then
        log "✗ tmux 未安装"
        return 1
    fi
    
    tmux new-session -d -s emulator "$EMULATOR_PATH -start $INSTANCE_NAME"
    
    sleep 5
    
    if tmux ls | grep -q "emulator"; then
        log "✓ tmux 启动成功"
        log "重新连接: tmux attach -t emulator"
        return 0
    else
        log "✗ tmux 启动失败"
        return 1
    fi
}

# 主函数
main() {
    log "HarmonyOS 模拟器自动启动脚本"
    log "=================================="
    
    # 检查模拟器实例
    if ! check_instance; then
        log "请先创建模拟器实例"
        exit 1
    fi
    
    # 尝试启动模拟器
    if start_with_nohup; then
        log "模拟器启动成功（使用 nohup）"
        exit 0
    elif start_with_screen; then
        log "模拟器启动成功（使用 screen）"
        exit 0
    elif start_with_tmux; then
        log "模拟器启动成功（使用 tmux）"
        exit 0
    else
        log "所有启动方法都失败"
        log "请手动启动模拟器: $EMULATOR_PATH -start $INSTANCE_NAME"
        exit 1
    fi
}

# 执行主函数
main
```

### 使用方法

```bash
# 1. 保存脚本
cat > start_emulator.sh << 'EOF'
#!/bin/bash
# (粘贴上面的脚本内容）
EOF

# 2. 添加执行权限
chmod +x start_emulator.sh

# 3. 运行脚本
./start_emulator.sh

# 4. 查看日志
tail -f /tmp/emulator_start.log
```

---

## 常见问题解答

### Q1: 为什么 nohup 启动后看不到模拟器窗口？

**A**: nohup 会在后台启动模拟器，模拟器窗口应该在桌面上显示。如果看不到，可能是：
1. 模拟器启动失败，检查日志：`tail -f /tmp/emulator_start.log`
2. 模拟器窗口被其他窗口遮挡，检查任务栏或使用 `Cmd+Tab` 切换
3. 模拟器崩溃，检查崩溃日志

### Q2: screen 命令没有反应怎么办？

**A**: 检查以下几点：
1. screen 是否安装：`which screen`
2. 模拟器路径是否正确：`echo $EMULATOR_PATH`
3. 模拟器实例是否存在：`$EMULATOR_PATH -list`
4. 手动启动模拟器查看错误：`$EMULATOR_PATH -start MyPhone`

### Q3: tmux not found 怎么办？

**A**: 安装 tmux：
```bash
# macOS
brew install tmux

# Linux (Ubuntu/Debian)
sudo apt-get install tmux

# Linux (CentOS/RHEL)
sudo yum install tmux
```

### Q4: 如何停止后台运行的模拟器？

**A**: 根据启动方式选择停止方法：
```bash
# nohup 方式
kill $(cat /tmp/emulator.pid)

# screen 方式
screen -XS emulator quit

# tmux 方式
tmux kill-session -t emulator

# 或者直接杀掉所有 emulator 进程
pkill -f emulator
```

---

## 参考资源

- [Screen 官方文档](https://www.gnu.org/software/screen/manual/)
- [Tmux 官方文档](https://github.com/tmux/tmux/wiki)
- [nohup 手册](https://man7.org/linux/man-pages/man1/nohup.1.html)
