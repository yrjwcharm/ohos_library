# 设备日志获取

## hilog 日志系统

HarmonyOS 使用 hilog 作为系统日志工具。

---

## 一、日志导出方式

### 1.1 查看最新日志文件

**日志文件较多时，只需导出最新的几个文件即可，避免导出全部浪费时间。**

```bash
# 查看最新的 5 个日志文件
hdc -t <device_id> shell "ls -lt /data/log/hilog/*.gz | head -5"
```

**输出示例：**
```
-rw-r--r-- 1 logd log  534854 2026-04-20 17:40 /data/log/hilog/hilog.138.20260420-173846.gz
-rw-r--r-- 1 logd log  763996 2026-04-20 17:38 /data/log/hilog/hilog.137.20260420-173843.gz
-rw-r--r-- 1 logd log  981679 2026-04-20 17:38 /data/log/hilog/hilog.136.20260420-173349.gz
...
```

### 1.2 只导出最新文件

```bash
# 导出最新的 3 个日志文件
hdc -t <device_id> file recv /data/log/hilog/hilog.138.20260420-173846.gz ./
hdc -t <device_id> file recv /data/log/hilog/hilog.137.20260420-173843.gz ./
hdc -t <device_id> file recv /data/log/hilog/hilog.136.20260420-173349.gz ./
```

---

## 二、模拟器日志解析

**模拟器日志文件解压后是明文格式，可直接读取。**

```bash
# 步骤1：查看最新日志文件
hdc -t <device_id> shell "ls -lt /data/log/hilog/*.gz | head -5"

# 步骤2：导出最新几个文件
hdc -t <device_id> file recv /data/log/hilog/hilog.XXX.gz ./

# 步骤3：解压并搜索
gunzip -k hilog.XXX.gz
grep "关键字" hilog.XXX
```

**完整脚本：**
```bash
#!/bin/bash
DEVICE=$1
KEYWORD=$2
COUNT=${3:-3}  # 默认导出最新 3 个文件

# 查看最新日志文件
echo "=== Latest $COUNT log files ==="
hdc -t $DEVICE shell "ls -lt /data/log/hilog/*.gz | head -$COUNT"

# 导出最新的 N 个文件
hdc -t $DEVICE shell "ls -lt /data/log/hilog/*.gz | head -$COUNT" | while read line; do
  file=$(echo $line | awk '{print $NF}')
  echo "Downloading: $file"
  hdc -t $DEVICE file recv "$file" ./
done

# 解压并搜索
for f in *.gz; do
  gunzip -k "$f" 2>/dev/null
  result=$(grep "$KEYWORD" "${f%.gz}" 2>/dev/null)
  if [ -n "$result" ]; then
    echo "=== Found in $f ==="
    echo "$result"
  fi
done
```

---

## 三、真机日志解析

**真机日志文件是压缩编码格式，需要配合字典文件使用 hilogtool 解析。**

### 3.1 hilogtool 工具路径

```bash
macOS:   /Applications/DevEco-Studio.app/Contents/sdk/default/hms/toolchains/hilogtool
Windows: C:\Users\<用户名>\AppData\Local\Huawei\Sdk\default\hms\toolchains\hilogtool.exe
```

### 3.2 解析步骤

```bash
# 步骤1：查看最新日志文件和字典文件
hdc -t <device_id> shell "ls -lt /data/log/hilog/*.gz | head -5"
hdc -t <device_id> shell "ls /data/log/hilog/*.zip"

# 步骤2：导出日志文件和字典文件
hdc -t <device_id> file recv /data/log/hilog/hilog.XXX.gz ./
hdc -t <device_id> file recv /data/log/hilog/hilog_dict.XXX.zip ./

# 步骤3：使用 hilogtool 解析
hilogtool parse -i ./ -o ./parsed -d hilog_dict.XXX.zip

# 步骤4：搜索解析后的 .txt 文件
grep "关键字" ./parsed/*.txt
```

### 3.3 hilogtool 命令说明

```bash
hilogtool parse -i <输入目录或文件> -o <输出目录> -d <字典文件>
```

**参数：**
| 参数 | 说明 |
|------|------|
| `-i, --input` | 输入的 hilog 目录或文件（.gz 格式） |
| `-o, --output` | 解析后的输出目录 |
| `-d, --dict` | 字典文件（.zip 或目录） |

**输出：**
- 解析后的文件为 `.txt` 格式，可直接读取和搜索

### 3.4 完整脚本

```bash
#!/bin/bash
DEVICE=$1
KEYWORD=$2
COUNT=${3:-3}  # 默认导出最新 3 个文件
OUTPUT_DIR="./hilog_$(date +%Y%m%d_%H%M%S)"
HILOGTOOL="/Applications/DevEco-Studio.app/Contents/sdk/default/hms/toolchains/hilogtool"

mkdir -p "$OUTPUT_DIR"
cd "$OUTPUT_DIR"

# 查看最新日志文件
echo "=== Latest $COUNT log files ==="
hdc -t $DEVICE shell "ls -lt /data/log/hilog/*.gz | head -$COUNT"

# 导出最新的 N 个日志文件
hdc -t $DEVICE shell "ls -lt /data/log/hilog/*.gz | head -$COUNT" | while read line; do
  file=$(echo $line | awk '{print $NF}')
  echo "Downloading: $file"
  hdc -t $DEVICE file recv "$file" ./
done

# 导出字典文件
DICT_FILE=$(hdc -t $DEVICE shell "ls /data/log/hilog/*.zip 2>/dev/null" | head -1)
if [ -n "$DICT_FILE" ]; then
  echo "Downloading dictionary: $DICT_FILE"
  hdc -t $DEVICE file recv "$DICT_FILE" ./
fi

# 解析日志
if [ -f *.zip ]; then
  # 真机：使用 hilogtool 解析
  echo "Parsing real device logs with hilogtool..."
  mkdir -p parsed
  $HILOGTOOL parse -i ./ -o ./parsed -d *.zip
  
  # 搜索
  if [ -n "$KEYWORD" ]; then
    grep -h "$KEYWORD" ./parsed/*.txt 2>/dev/null
  fi
else
  # 模拟器：直接解压
  echo "Extracting emulator logs..."
  for f in *.gz; do
    gunzip -k "$f" 2>/dev/null
  done
  
  # 搜索
  if [ -n "$KEYWORD" ]; then
    grep -h "$KEYWORD" hilog.* 2>/dev/null | grep -v ".gz"
  fi
fi
```

---

## 四、实时日志读取

### 4.1 基本命令

```bash
# 清除缓冲区
hdc -t <device_id> shell hilog -r

# 读取最近 N 行
hdc -t <device_id> shell hilog -x -n 200

# 持续监听
hdc -t <device_id> shell hilog
```

### 4.2 过滤选项

```bash
# 按进程 ID 过滤
hdc -t <device_id> shell hilog -x -n 200 -P <pid>

# 按日志级别过滤
hdc -t <device_id> shell hilog -x -n 200 -L E

# 按标签过滤
hdc -t <device_id> shell hilog -x -n 200 -T "MyTag"
```

**日志级别：**
| 级别 | 说明 |
|------|------|
| D | Debug |
| I | Info |
| W | Warning |
| E | Error |
| F | Fatal |

### 4.3 获取应用进程 ID

```bash
hdc -t <device_id> shell aa dump -a
```

**输出格式：**
```
AppRunningRecord ID #9
  process name [com.example.myapplication]
  pid #3820  uid #20020059
```

---

## 五、日志格式

hilog 日志格式：

```
{时间戳} {进程ID} {线程ID} {级别} {标签} {日志内容}
```

**示例：**
```
04-20 17:10:55.009 31003 31003 I A00000/EntryAbility: === CLAUDE_CODE_TEST_LOG: EntryAbility onCreate started ===
```

---

## 六、最佳实践

### 6.1 冷启动日志验证

```bash
# 1. 终止应用
hdc -t <device_id> shell aa force-stop com.example.app

# 2. 清空日志
hdc -t <device_id> shell hilog -r

# 3. 启动应用
hdc -t <device_id> shell aa start -a EntryAbility -b com.example.app

# 4. 等待启动
sleep 3

# 5. 获取日志
hdc -t <device_id> shell hilog -x -n 500 | grep "关键字"
```

### 6.2 自动化日志收集

```bash
#!/bin/bash
DEVICE=$1
TEST_NAME=$2

LOG_DIR="./logs/${TEST_NAME}_$(date +%Y%m%d_%H%M%S)"
mkdir -p $LOG_DIR

# 清除旧日志
hdc -t $DEVICE shell hilog -r

# 执行测试
echo "Running test: $TEST_NAME"
# ... 测试代码 ...

# 收集日志
hdc -t $DEVICE file recv /data/log/hilog/ "$LOG_DIR/"

# 解析（如果有字典文件）
DICT_FILE=$(ls $LOG_DIR/hilog/*.zip 2>/dev/null | head -1)
if [ -n "$DICT_FILE" ]; then
  hilogtool parse -i "$LOG_DIR/hilog" -o "$LOG_DIR/parsed" -d "$DICT_FILE"
fi

echo "Logs saved to: $LOG_DIR"
```

---

## 参考文档

- [hilog 日志工具](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/hilog)
- [hilogtool 解析工具](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/hilog-tool)