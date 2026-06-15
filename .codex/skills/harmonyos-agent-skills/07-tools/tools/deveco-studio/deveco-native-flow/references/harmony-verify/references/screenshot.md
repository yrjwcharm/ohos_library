# 截图与元素获取

## 截图功能

### 截图流程

截图需要三个步骤：设备端截图、拉取到本地、清理临时文件。

```bash
# 步骤1：设备端截图
hdc -t <device_id> shell snapshot_display -f /data/local/tmp/screenshot.jpeg

# 步骤2：拉取到本地
hdc -t <device_id> file recv /data/local/tmp/screenshot.jpeg ./screenshot.jpeg

# 步骤3：清理设备端文件
hdc -t <device_id> shell rm /data/local/tmp/screenshot.jpeg
```

### 一键截图脚本

```bash
#!/bin/bash
DEVICE=$1
OUTPUT=${2:-"./screenshot_$(date +%Y%m%d_%H%M%S).jpeg"}
DEVICE_PATH="/data/local/tmp/screenshot_${RANDOM}.jpeg"

hdc -t $DEVICE shell snapshot_display -f $DEVICE_PATH
hdc -t $DEVICE file recv $DEVICE_PATH $OUTPUT
hdc -t $DEVICE shell rm $DEVICE_PATH

echo "Screenshot saved to: $OUTPUT"
```

**使用：**
```bash
./screenshot.sh 192.168.1.100:5555 ./my_screenshot.jpeg
```

---

## 截图限制说明

### 隐私保护机制

HarmonyOS 对部分应用有隐私保护，截图可能显示为黑屏：

**可能禁止截图的应用：**
- 银行类应用
- 支付类应用（支付宝、微信支付等）
- 安全类应用
- 含有敏感信息的页面

**替代方案：** 使用 UI 元素获取功能

---

## 获取屏幕尺寸

```bash
hdc -t <device_id> shell hidumper -s WindowManagerService -a -a
```

**解析输出：**

查找窗口矩形信息，格式：`[ x y w h ]`

```bash
# 示例输出片段
WindowName: EntryWindow [ 0 0 1080 1920 ]
```

**解析脚本：**
```bash
#!/bin/bash
DEVICE=$1

OUTPUT=$(hdc -t $DEVICE shell hidumper -s WindowManagerService -a -a)

# 提取最大宽高
MAX_WIDTH=0
MAX_HEIGHT=0

while read -r line; do
  if [[ $line =~ \[\ *([0-9]+)\ +([0-9]+)\ +([0-9]+)\ +([0-9]+)\ *\] ]]; then
    WIDTH=${BASH_REMATCH[3]}
    HEIGHT=${BASH_REMATCH[4]}
    if [ $WIDTH -gt $MAX_WIDTH ]; then MAX_WIDTH=$WIDTH; fi
    if [ $HEIGHT -gt $MAX_HEIGHT ]; then MAX_HEIGHT=$HEIGHT; fi
  fi
done <<< "$OUTPUT"

echo "Screen size: ${MAX_WIDTH}x${MAX_HEIGHT}"
```

---

## 元素获取

### 步骤1：获取高亮窗口 ID

```bash
hdc -t <device_id> shell hidumper -s WindowManagerService -a -a | grep "Highlighted"
```

**输出示例：**
```
Highlighted windows: 12
```

### 步骤2：开启测试模式

```bash
hdc -t <device_id> shell param set persist.ace.testmode.enabled 1
```

### 步骤3：获取 UI 元素树

```bash
hdc -t <device_id> shell hidumper -s WindowManagerService -a "-w <windowId> -inspector"
```

**输出示例：**
```
|-- Component [id=1] [type=Button] [text=登录] [bounds=[100,200][300,250]]
|-- Component [id=2] [type=Text] [text=用户名] [bounds=[100,300][300,350]]
|-- Component [id=3] [type=TextInput] [text=] [bounds=[100,360][500,410]]
```

### 一键获取元素脚本

```bash
#!/bin/bash
DEVICE=$1

# 开启测试模式
hdc -t $DEVICE shell param set persist.ace.testmode.enabled 1

# 获取窗口 ID
WINDOW_ID=$(hdc -t $DEVICE shell hidumper -s WindowManagerService -a -a | grep -oP 'Highlighted\s+windows:\s*\K\d+')

if [ -z "$WINDOW_ID" ]; then
  echo "Failed to get window ID"
  exit 1
fi

echo "Window ID: $WINDOW_ID"

# 获取元素树
hdc -t $DEVICE shell hidumper -s WindowManagerService -a "-w $WINDOW_ID -inspector"
```

---

## 屏幕方向

### 获取当前方向

```bash
hdc -t <device_id> shell settings get system user_rotation
```

**返回值：**
- `0`: 竖屏 (portrait)
- `1`: 横屏 (landscape)

### 设置屏幕方向

```bash
# 设置为竖屏
hdc -t <device_id> shell settings put system user_rotation 0

# 设置为横屏
hdc -t <device_id> shell settings put system user_rotation 1
```

---

## 屏幕录制

### 开始录制

```bash
# hdc shell screenrecord 命令（如果支持）
hdc -t <device_id> shell screenrecord --time-limit 60 /data/local/tmp/demo.mp4
```

**注意：** 屏幕录制功能取决于设备支持情况。

---

## 完整示例

### 自动化测试截图对比

```bash
#!/bin/bash
DEVICE="192.168.1.100:5555"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# 截图函数
take_screenshot() {
  local name=$1
  local device_path="/data/local/tmp/${name}.jpeg"
  local local_path="./${name}_${TIMESTAMP}.jpeg"
  
  hdc -t $DEVICE shell snapshot_display -f $device_path
  hdc -t $DEVICE file recv $device_path $local_path
  hdc -t $DEVICE shell rm $device_path
  
  echo "Saved: $local_path"
}

# 执行操作前截图
take_screenshot "before"

# 执行操作
hdc -t $DEVICE shell uitest uiInput click 540 960
sleep 1

# 执行操作后截图
take_screenshot "after"

echo "Compare the screenshots to verify the result."
```

### 获取元素并点击

```bash
#!/bin/bash
DEVICE="192.168.1.100:5555"

# 开启测试模式
hdc -t $DEVICE shell param set persist.ace.testmode.enabled 1

# 获取窗口 ID
WINDOW_ID=$(hdc -t $DEVICE shell hidumper -s WindowManagerService -a -a | grep -oP 'Highlighted\s+windows:\s*\K\d+')

# 获取元素树并查找按钮
ELEMENTS=$(hdc -t $DEVICE shell hidumper -s WindowManagerService -a "-w $WINDOW_ID -inspector")

# 查找包含 "登录" 文字的按钮
LOGIN_BTN=$(echo "$ELEMENTS" | grep "Button" | grep "登录" | grep -oP '\[\d+,\d+\]\[\d+,\d+\]' | head -1)

if [ -n "$LOGIN_BTN" ]; then
  # 解析坐标
  X=$(echo $LOGIN_BTN | grep -oP '\[\K\d+' | head -1)
  Y=$(echo $LOGIN_BTN | grep -oP '\d+,\K\d+' | head -1)
  
  # 计算中心点
  WIDTH=$(echo $LOGIN_BTN | grep -oP '\]\[\K\d+' | head -1)
  HEIGHT=$(echo $LOGIN_BTN | grep -oP '\d+,\K\d+' | tail -1)
  
  CENTER_X=$((X + WIDTH/2))
  CENTER_Y=$((Y + HEIGHT/2))
  
  echo "Clicking login button at ($CENTER_X, $CENTER_Y)"
  hdc -t $DEVICE shell uitest uiInput click $CENTER_X $CENTER_Y
else
  echo "Login button not found"
fi
```

---

## 最佳实践

### 截图验证流程

1. 执行操作前截图记录初始状态
2. 执行 UI 操作
3. 执行操作后截图验证结果
4. 对比前后截图确认变化

### 元素定位流程

1. 开启测试模式
2. 获取窗口 ID
3. 获取元素树
4. 解析元素坐标
5. 执行点击或输入操作

### 错误处理

- 截图失败：检查设备连接和权限
- 元素获取失败：确认测试模式已开启
- 黑屏问题：使用元素获取替代截图