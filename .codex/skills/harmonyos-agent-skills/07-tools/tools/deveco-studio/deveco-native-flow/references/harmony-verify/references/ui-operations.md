# UI 自动化操作详解

## 核心工具：uitest uiInput

所有 UI 自动化操作通过 `uitest uiInput` 命令实现。

### 前置条件

```bash
# 开启测试模式（首次使用需要执行）
hdc -t <device_id> shell param set persist.ace.testmode.enabled 1
```

---

## 点击操作

### 单击

```bash
hdc -t <device_id> shell uitest uiInput click <x> <y>
```

**参数：**
- `x`: 点击位置的 X 坐标（像素）
- `y`: 点击位置的 Y 坐标（像素）

**示例：**
```bash
# 点击屏幕中心（假设屏幕 1080x1920）
hdc -t 192.168.1.100:5555 shell uitest uiInput click 540 960
```

### 双击

```bash
# 方法：执行两次单击，间隔 100ms
hdc -t <device_id> shell uitest uiInput click <x> <y>
sleep 0.1
hdc -t <device_id> shell uitest uiInput click <x> <y>
```

### 长按

```bash
hdc -t <device_id> shell uitest uiInput longClick <x> <y>
```

---

## 滑动操作

### 基于坐标的滑动

```bash
hdc -t <device_id> shell uitest uiInput swipe <fromX> <fromY> <toX> <toY> [velocity]
```

**参数：**
- `fromX`, `fromY`: 起始坐标
- `toX`, `toY`: 结束坐标
- `velocity`: 滑动速度 (px/s)，范围 200-40000，默认 600

**示例：**
```bash
# 从 (540, 1500) 滑动到 (540, 500)，速度 600px/s
hdc -t 192.168.1.100:5555 shell uitest uiInput swipe 540 1500 540 500 600
```

### 方向滑动计算

根据屏幕尺寸计算滑动坐标：

```
屏幕尺寸: width × height (通过 hidumper 获取)
中心坐标: centerX = width/2, centerY = height/2
滑动距离: distance = min(width, height) * 0.4

向上滑动 (内容向下滚动):
  from: (centerX, centerY + distance/2)
  to:   (centerX, centerY - distance/2)

向下滑动 (内容向上滚动):
  from: (centerX, centerY - distance/2)
  to:   (centerX, centerY + distance/2)

向左滑动 (内容向右滚动):
  from: (centerX + distance/2, centerY)
  to:   (centerX - distance/2, centerY)

向右滑动 (内容向左滚动):
  from: (centerX - distance/2, centerY)
  to:   (centerX + distance/2, centerY)
```

**示例脚本：**
```bash
#!/bin/bash
# 假设屏幕 1080x1920
WIDTH=1080
HEIGHT=1920
CENTER_X=$((WIDTH / 2))
CENTER_Y=$((HEIGHT / 2))
DISTANCE=$((HEIGHT * 40 / 100))  # 40% of height

# 向下滑动
FROM_X=$CENTER_X
FROM_Y=$((CENTER_Y - DISTANCE / 2))
TO_X=$CENTER_X
TO_Y=$((CENTER_Y + DISTANCE / 2))

hdc shell uitest uiInput swipe $FROM_X $FROM_Y $TO_X $TO_Y 600
```

---

## 输入操作

### 文字输入

```bash
hdc -t <device_id> shell uitest uiInput inputText <x> <y> <text>
```

**重要说明：**
HarmonyOS 的文字输入必须指定输入框坐标 (x, y)。

**推荐流程：**
1. 使用 hidumper 获取输入框坐标
2. 点击输入框获取焦点
3. 输入文字

**示例：**
```bash
# 1. 点击输入框
hdc shell uitest uiInput click 540 800

# 2. 输入文字
hdc shell uitest uiInput inputText 540 800 "Hello HarmonyOS"
```

---

## 按键操作

```bash
hdc -t <device_id> shell uitest uiInput keyEvent <key>
```

### 支持的按键

| 按键名称 | 键值 | 说明 |
|---------|------|------|
| Back | Back | 返回键（符号名称） |
| Home | Home | 主页键（符号名称） |
| VOLUME_UP | 24 | 音量加（键码值） |
| VOLUME_DOWN | 25 | 音量减（键码值） |
| ENTER | 2054 | 回车键（键码值） |
| DEL | 2055 | 删除键（键码值） |
| DPAD_CENTER | 23 | 方向键中心确认 |
| DPAD_UP | 19 | 方向键上 |
| DPAD_DOWN | 20 | 方向键下 |
| DPAD_LEFT | 21 | 方向键左 |
| DPAD_RIGHT | 22 | 方向键右 |

**示例：**
```bash
# 返回键
hdc shell uitest uiInput keyEvent Back

# 主页键
hdc shell uitest uiInput keyEvent Home

# 音量加
hdc shell uitest uiInput keyEvent 24

# 回车键
hdc shell uitest uiInput keyEvent 2054
```

---

## 坐标获取方法

### 方法1：获取 UI 元素树

```bash
# 1. 获取窗口 ID
hdc shell hidumper -s WindowManagerService -a -a | grep "Highlighted"

# 2. 开启测试模式
hdc shell param set persist.ace.testmode.enabled 1

# 3. 获取元素树
hdc shell hidumper -s WindowManagerService -a "-w <windowId> -inspector"
```

**输出示例：**
```
|-- Component [id=1] [type=Button] [text=登录] [bounds=[100,200][300,250]]
```

### 方法2：屏幕比例计算

```bash
# 获取屏幕尺寸
hdc shell hidumper -s WindowManagerService -a -a

# 根据比例计算坐标
# 例如：点击屏幕中心
# centerX = width / 2
# centerY = height / 2
```

---

## 完整示例

### 登录流程自动化

```bash
#!/bin/bash
DEVICE="192.168.1.100:5555"

# 1. 点击用户名输入框 (假设坐标 540, 800)
hdc -t $DEVICE shell uitest uiInput click 540 800

# 2. 输入用户名
hdc -t $DEVICE shell uitest uiInput inputText 540 800 "testuser"

# 3. 点击密码输入框 (假设坐标 540, 1000)
hdc -t $DEVICE shell uitest uiInput click 540 1000

# 4. 输入密码
hdc -t $DEVICE shell uitest uiInput inputText 540 1000 "password123"

# 5. 点击登录按钮 (假设坐标 540, 1300)
hdc -t $DEVICE shell uitest uiInput click 540 1300

# 6. 等待并检查结果
sleep 2
hdc -t $DEVICE shell snapshot_display -f /data/local/tmp/result.jpeg
hdc -t $DEVICE file recv /data/local/tmp/result.jpeg ./result.jpeg
```

### 列表滑动

```bash
#!/bin/bash
DEVICE="192.168.1.100:5555"

# 向下滑动 5 次，每次间隔 500ms
for i in {1..5}; do
  hdc -t $DEVICE shell uitest uiInput swipe 540 1500 540 500 600
  sleep 0.5
done
```

---

## 错误处理

### uitest 命令失败

```bash
# 检查测试模式是否开启
hdc shell param get persist.ace.testmode.enabled

# 如果返回 0，重新开启
hdc shell param set persist.ace.testmode.enabled 1
```

### 点击无响应

1. 检查坐标是否正确
2. 检查元素是否可见
3. 尝试增加点击后的等待时间

### 滑动无效

1. 检查滑动距离是否足够
2. 调整滑动速度
3. 确认滑动方向正确