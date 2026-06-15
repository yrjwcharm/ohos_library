# HDC Operations Reference

Complete reference for hdc command-line operations on HarmonyOS devices.
- **模拟器管理**：列出、启动模拟器
- **UI 结构获取**：获取应用页面元素树，定位 UI 控件坐标
- **UI 自动化操作**：点击、滑动、输入文字、按键事件
- **打开网址**：通过 URL Scheme 打开应用或网页
- **截图验证**：截取屏幕、获取屏幕尺寸
- **日志获取**：获取设备日志和应用日志（支持模拟器和真机）

## 前置条件

1. 已安装 DevEco Studio 并配置 SDK
2. hdc 工具已添加到 PATH 或设置 `DEVECO_PATH` 环境变量
3. 设备已开启开发者模式和 USB 调试

## 工具路径

```bash
# hdc 工具
macOS:   /Applications/DevEco-Studio.app/Contents/sdk/default/openharmony/toolchains/hdc
Windows: C:\Users\<用户名>\AppData\Local\Huawei\Sdk\default\openharmony\toolchains\hdc.exe

# hilogtool（真机日志解析）
macOS:   /Applications/DevEco-Studio.app/Contents/sdk/default/hms/toolchains/hilogtool
Windows: C:\Users\<用户名>\AppData\Local\Huawei\Sdk\default\hms\toolchains\hilogtool.exe

# emulator 工具
macOS:   /Applications/DevEco-Studio.app/Contents/tools/emulator/Emulator
Windows: C:\Program Files\Huawei\DevEco Studio\tools\emulator\Emulator.exe

# 添加到 PATH (macOS/Linux)
export PATH="$PATH:/Applications/DevEco-Studio.app/Contents/sdk/default/openharmony/toolchains"
export PATH="$PATH:/Applications/DevEco-Studio.app/Contents/tools/emulator"

# 添加到 PATH (Windows PowerShell)
$env:PATH += ";C:\Users\<用户名>\AppData\Local\Huawei\Sdk\default\openharmony\toolchains"
$env:PATH += ";C:\Program Files\Huawei\DevEco Studio\tools\emulator"
```

---

## 一、设备管理

### 1.1 列出已连接设备

```bash
hdc list targets
```

**输出示例：**
```
192.168.1.100:5555
EMULATOR_DEVICE_ID
```

### 1.2 列出已安装的模拟器

```bash
emulator -list
```

### 1.3 获取模拟器详情（JSON 格式）

```bash
emulator -list -details
```

**返回字段：**
- `name`: 模拟器名称
- `instancePath`: 实例路径
- `imageRoot`: SDK 路径
- `isRunning`: 运行状态

### 1.4 启动模拟器

```bash
# 从 emulator -list -details 获取信息后
emulator -hvd <模拟器名称> -path <实例路径父目录> -imageRoot <SDK路径>
```

**示例：**
```bash
emulator -hvd "Enjoy 90 Pro Max" -path ~/Huawei/emulator/deployed -imageRoot ~/Library/Huawei/Sdk
```

**注意：** Beta 版本镜像无法通过命令行启动，需通过 DevEco Studio 界面启动。

### 1.5 获取设备名称

```bash
# 模拟器
hdc -t <device_id> shell param get ohos.qemu.hvd.name

# 真机
hdc -t <device_id> shell param get const.product.name
```

### 1.6 获取系统版本

```bash
hdc -t <device_id> shell getprop hw_sc.build.platform.version
```

---

## 二、应用管理

### 2.1 列出已安装应用

```bash
hdc -t <device_id> shell bm dump -a
```

**解析输出：** 匹配以 tab 开头的包名行 `\t([a-zA-Z0-9_.]+)`

### 2.2 获取应用信息（含 mainAbility）

```bash
hdc -t <device_id> shell bm dump -n <bundleName>
```

**解析 mainAbility：** 匹配 `"mainAbility"\s*:\s*"([^"]+)"`

### 2.3 安装应用

```bash
hdc -t <device_id> install -r <hap路径>
```

**参数：**
- `-r`: 覆盖安装

### 2.4 卸载应用

```bash
hdc -t <device_id> uninstall <bundleName>
```

### 2.5 启动应用

```bash
# 方法1：通过 ability 启动（推荐）
hdc -t <device_id> shell aa start -a <abilityName> -b <bundleName>

# 方法2：自动获取 mainAbility 后启动
# 先执行 bm dump -n 获取 mainAbility，再执行 aa start
```

### 2.6 停止应用

```bash
hdc -t <device_id> shell aa force-stop <bundleName>
```

### 2.7 清除应用数据

```bash
hdc -t <device_id> shell bm clean -d -n <bundleName>  # 清除数据
hdc -t <device_id> shell bm clean -c -n <bundleName>  # 清除缓存
```

### 2.8 打开 URL

```bash
# 隐式启动
hdc -t <device_id> shell aa start -U '<url>' -A 'ohos.want.action.viewData' -e 'entity.system.browsable'

# 简化方式
hdc -t <device_id> shell aa start -U '<url>'
```

---

## 三、UI 自动化

**核心工具：** `uitest uiInput`

### 3.1 点击

```bash
hdc -t <device_id> shell uitest uiInput click <x> <y>
```

### 3.2 双击

```bash
# 执行两次点击，间隔 100ms
hdc -t <device_id> shell uitest uiInput click <x> <y>
sleep 0.1
hdc -t <device_id> shell uitest uiInput click <x> <y>
```

### 3.3 长按

```bash
hdc -t <device_id> shell uitest uiInput longClick <x> <y>
```

### 3.4 滑动

```bash
hdc -t <device_id> shell uitest uiInput swipe <fromX> <fromY> <toX> <toY> [velocity]
```

**参数：**
- `velocity`: 滑动速度 (px/s)，范围 200-40000，默认 600

**方向滑动计算：**
```
屏幕中心: centerX = width/2, centerY = height/2
滑动距离: distance = min(width, height) * 0.4

left:  from (centerX + distance/2, centerY) to (centerX - distance/2, centerY)
right: from (centerX - distance/2, centerY) to (centerX + distance/2, centerY)
up:    from (centerX, centerY + distance/2) to (centerX, centerY - distance/2)
down:  from (centerX, centerY - distance/2) to (centerX, centerY + distance/2)
```

### 3.5 输入文字

```bash
hdc -t <device_id> shell uitest uiInput inputText <x> <y> <text>
```

**注意：** HarmonyOS 需要指定输入框坐标 (x, y)，建议先点击输入框获取焦点。

### 3.6 按键事件

```bash
hdc -t <device_id> shell uitest uiInput keyEvent <key>
```

**支持的按键：**
| 按键名称 | 键值 | 说明 |
|---------|------|------|
| Back | Back | 返回键 |
| Home | Home | 主页键 |
| VOLUME_UP | 24 | 音量加 |
| VOLUME_DOWN | 25 | 音量减 |
| ENTER | 2054 | 回车键 |
| DEL | 2055 | 删除键 |
| DPAD_CENTER | 23 | 方向键中心 |
| DPAD_UP | 19 | 方向键上 |
| DPAD_DOWN | 20 | 方向键下 |
| DPAD_LEFT | 21 | 方向键左 |
| DPAD_RIGHT | 22 | 方向键右 |

---

## 四、屏幕操作

### 4.1 获取屏幕尺寸

```bash
hdc -t <device_id> shell hidumper -s WindowManagerService -a -a
```

**解析输出：** 匹配窗口矩形 `\[\s*(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s*\]`，取最大 w × h 作为屏幕分辨率。

### 4.2 截图

```bash
# 步骤1：设备端截图
hdc -t <device_id> shell snapshot_display -f /data/local/tmp/screenshot.jpeg

# 步骤2：拉取到本地
hdc -t <device_id> file recv /data/local/tmp/screenshot.jpeg <本地路径>

# 步骤3：清理设备端文件
hdc -t <device_id> shell rm /data/local/tmp/screenshot.jpeg
```

### 4.3 获取屏幕方向

```bash
hdc -t <device_id> shell settings get system user_rotation
```

**返回值：**
- `0`: 竖屏 (portrait)
- `1`: 横屏 (landscape)

### 4.4 设置屏幕方向

```bash
# 竖屏
hdc -t <device_id> shell settings put system user_rotation 0

# 横屏
hdc -t <device_id> shell settings put system user_rotation 1
```

---

## 五、元素获取

### 5.1 获取高亮窗口 ID

```bash
hdc -t <device_id> shell hidumper -s WindowManagerService -a -a
```

**解析：** 匹配 `Highlighted\s+windows:\s*(\d+)`

### 5.2 开启测试模式

```bash
hdc -t <device_id> shell param set persist.ace.testmode.enabled 1
```

### 5.3 获取 UI 元素树

```bash
hdc -t <device_id> shell hidumper -s WindowManagerService -a "-w <windowId> -inspector"
```

**用途：**
- 定位 UI 元素坐标
- 验证 UI 结构
- 替代截图（当应用禁止截图时）

---

## 六、日志获取

### 6.1 查看最新日志文件

**日志文件较多时，只需导出最新的几个文件即可。**

```bash
# 查看最新的 5 个日志文件
hdc -t <device_id> shell "ls -lt /data/log/hilog/*.gz | head -5"
```

### 6.2 模拟器日志解析（直接解压）

**模拟器日志文件解压后是明文格式，可直接读取。**

```bash
# 步骤1：查看最新日志文件
hdc -t <device_id> shell "ls -lt /data/log/hilog/*.gz | head -5"

# 步骤2：只导出最新的 3 个文件（避免导出全部浪费时间）
hdc -t <device_id> file recv /data/log/hilog/hilog.XXX.gz ./
hdc -t <device_id> file recv /data/log/hilog/hilog.YYY.gz ./
hdc -t <device_id> file recv /data/log/hilog/hilog.ZZZ.gz ./

# 步骤3：解压并搜索 (macOS/Linux)
gunzip -k *.gz
grep "关键字" hilog.*

# 步骤3：解压并搜索 (Windows PowerShell)
# 使用 hdc.ps1 辅助脚本：
#   .\hdc.ps1 export-logs <device_id> .\logs
#   .\hdc.ps1 search-log <device_id> "关键字"
```

### 6.3 真机日志解析（需要 hilogtool）

**真机日志文件是压缩编码格式，需要配合字典文件使用 hilogtool 解析。**

```bash
# 步骤1：查看最新日志文件和字典文件
hdc -t <device_id> shell "ls -lt /data/log/hilog/*.gz | head -5"
hdc -t <device_id> shell "ls /data/log/hilog/*.zip"

# 步骤2：只导出最新的 3 个日志文件 + 字典文件（避免导出全部浪费时间）
hdc -t <device_id> file recv /data/log/hilog/hilog.XXX.gz ./
hdc -t <device_id> file recv /data/log/hilog/hilog.YYY.gz ./
hdc -t <device_id> file recv /data/log/hilog/hilog.ZZZ.gz ./
hdc -t <device_id> file recv /data/log/hilog/hilog_dict.XXX.zip ./

# 步骤3：使用 hilogtool 解析（指定输入目录）
hilogtool parse -i ./ -o ./parsed -d hilog_dict.XXX.zip

# 步骤4：搜索解析后的 .txt 文件
grep "关键字" ./parsed/*.txt
```

**hilogtool 路径：**
```bash
macOS:   /Applications/DevEco-Studio.app/Contents/sdk/default/hms/toolchains/hilogtool
Windows: C:\Users\<用户名>\AppData\Local\Huawei\Sdk\default\hms\toolchains\hilogtool.exe
```

> **Windows 用户：** 可使用 `hdc.ps1` 辅助脚本简化操作，已集成日志导出、解压和搜索功能。

> 详细说明和完整脚本请参考 [device-logs.md](references/device-logs.md)

### 6.4 实时日志读取

```bash
# 清除缓冲区
hdc -t <device_id> shell hilog -r

# 读取最近 N 行
hdc -t <device_id> shell hilog -x -n 200

# 按进程 ID 过滤
hdc -t <device_id> shell hilog -x -n 200 -P <pid>

# 按日志级别过滤
hdc -t <device_id> shell hilog -x -n 200 -L E
```

**参数说明：**
| 参数 | 说明 |
|------|------|
| `-x` | 非阻塞模式，读完退出 |
| `-n <count>` | 读取行数上限 |
| `-P <pid>` | 按进程 ID 过滤 |
| `-L <level>` | 最低日志级别 (D/I/W/E/F) |
| `-r` | 清除缓冲区 |

**日志级别：**
| 级别 | 说明 |
|------|------|
| D | Debug |
| I | Info |
| W | Warning |
| E | Error |
| F | Fatal |

### 6.5 获取应用进程 ID

```bash
hdc -t <device_id> shell aa dump -a
```

**解析输出：**
```
AppRunningRecord ID #9
  process name [com.example.myapplication]
  pid #3820  uid #20020059
```

---

## 七、完整工作流程

### 7.1 设备验证流程

```bash
# 1. 列出设备
hdc list targets

# 2. 获取屏幕尺寸
hdc -t <device_id> shell hidumper -s WindowManagerService -a -a

# 3. 截图验证
hdc -t <device_id> shell snapshot_display -f /data/local/tmp/test.jpeg
hdc -t <device_id> file recv /data/local/tmp/test.jpeg ./test.jpeg
```

### 7.2 应用测试流程

```bash
# 1. 安装应用
hdc -t <device_id> install -r app.hap

# 2. 获取 mainAbility
hdc -t <device_id> shell bm dump -n com.example.app

# 3. 启动应用
hdc -t <device_id> shell aa start -a EntryAbility -b com.example.app

# 4. 获取应用进程 ID
hdc -t <device_id> shell aa dump -a

# 5. 查看应用日志
hdc -t <device_id> shell hilog -x -n 200 -P <pid>

# 6. 点击测试
hdc -t <device_id> shell uitest uiInput click 540 960

# 7. 停止应用
hdc -t <device_id> shell aa force-stop com.example.app
```

### 7.3 UI 自动化测试流程

```bash
# 1. 获取屏幕尺寸
hdc -t <device_id> shell hidumper -s WindowManagerService -a -a

# 2. 开启测试模式
hdc -t <device_id> shell param set persist.ace.testmode.enabled 1

# 3. 获取窗口 ID
hdc -t <device_id> shell hidumper -s WindowManagerService -a -a

# 4. 获取 UI 元素
hdc -t <device_id> shell hidumper -s WindowManagerService -a "-w <windowId> -inspector"

# 5. 执行点击
hdc -t <device_id> shell uitest uiInput click <x> <y>

# 6. 输入文字
hdc -t <device_id> shell uitest uiInput inputText <x> <y> "Hello"

# 7. 滑动
hdc -t <device_id> shell uitest uiInput swipe 540 1500 540 500 600

# 8. 按返回键
hdc -t <device_id> shell uitest uiInput keyEvent Back
```

---

## 八、常见问题

### hdc 无法连接设备

```bash
# 重启 hdc 服务
hdc kill
hdc start

# 检查设备连接
hdc list targets
```

### 模拟器启动失败

1. Beta 版本镜像需通过 DevEco Studio 启动
2. 检查许可证：`emulator -license accept`
3. 检查镜像：`emulator -imageList -downloaded true`

### 截图黑屏

部分应用（银行、支付类）因隐私保护禁止截图，使用 UI 元素获取替代：
```bash
hdc -t <device_id> shell hidumper -s WindowManagerService -a "-w <windowId> -inspector"
```

### uitest 命令失败

确保已开启测试模式：
```bash
hdc -t <device_id> shell param set persist.ace.testmode.enabled 1
```

### 真机日志乱码

真机日志需要使用 hilogtool 配合字典文件解析，参见 [6.3 真机日志解析](#63-真机日志解析需要-hilogtool)。

---

## 参考文档

- [hdc 命令行工具](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/hdc)
- [hilog 日志工具](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/hilog)
- [hilogtool 解析工具](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/hilog-tool)
- [uitest UI测试框架](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/uitest)
- [设备日志详细说明](references/device-logs.md)
- [截图操作详细说明](references/screenshot.md)
- [UI 操作详细说明](references/ui-operations.md)