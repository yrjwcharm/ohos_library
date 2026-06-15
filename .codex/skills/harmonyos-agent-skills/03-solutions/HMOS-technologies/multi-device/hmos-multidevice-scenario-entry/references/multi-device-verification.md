# 多设备验证指南

## 目录

1. [核心概念](#核心概念)
2. [验证操作](#验证操作)
3. [注意事项](#注意事项)

---

## 核心概念

### 什么是多设备验证

多设备验证关注**折叠屏**的布局适配验证，覆盖折叠态/展开态/三屏（如有）/悬停四种形态，确保 VAL 阶段的分辨率阶梯验证完整。

### 适用场景

- 多设备需要验证折叠态/展开态/三屏（如有）/悬停四种形态的布局适配
- VAL 阶段需要覆盖折叠设备多屏形态的分辨率阶梯验证

### 不适用场景

- 仅涉及直板机或平板设备验证（无折叠形态）

---

## 验证操作

### 1. 判定设备支持参数

确认目标设备支持 hidumper 调试模式。

```bash
HDC=${HDC:-hdc}
TARGET=<device_id>

$HDC -t "$TARGET" shell "hidumper -s DisplayManagerService -a '-h'"
$HDC -t "$TARGET" shell "param set dms.hidumper.supportdebug true"
$HDC -t "$TARGET" shell "param get dms.hidumper.supportdebug"
```

### 2. 切换屏幕状态

通过 hidumper 模拟不同折叠形态。**每个形态必须独立执行完整的"停止→切换→启动→确认→验证"流程，不得假定设备当前处于某个状态直接验证。**

```bash
HDC=${HDC:-hdc}
TARGET=<device_id>
BUNDLE=<bundleName>
ABILITY=<abilityName>

run_mode() {
  local CMD="$1"
  local LABEL="$2"

  echo "=== Switching to: $LABEL ==="

  # 1. 强制停止应用，确保以新窗口尺寸重新渲染
  $HDC -t "$TARGET" shell "aa force-stop $BUNDLE"
  sleep 1

  # 2. 切换折叠形态
  $HDC -t "$TARGET" shell "hidumper -s DisplayManagerService -a '$CMD'"
  sleep 3

  # 3. 重新启动应用
  $HDC -t "$TARGET" shell "aa start -a $ABILITY -b $BUNDLE"
  sleep 4

  # 4. 通过日志确认窗口尺寸已变化（关键步骤，不可省略）
  $HDC -t "$TARGET" shell "hilog -x" | grep "window size\|windowSize\|Initial window" | tail -3
}

run_mode -p   "folded"     # 折叠态
run_mode -z   "hover"      # 悬停态
run_mode -y   "expanded"   # 展开态
run_mode -yy  "triple"     # 三屏态
```

### 3. 屏幕状态命令速查

以 `-h` 输出为准：

| 命令 | 状态 | 说明 |
| --- | --- | --- |
| `-p` | 折叠态 | switch to fold status |
| `-z` | 悬停态 | switch to fold half status |
| `-y` | 展开态 | switch to expand status |
| `-yy` | 三屏态 | switch to both first and second axes expand status |

---

## 注意事项

- hidumper 命令需要先开启 `dms.hidumper.supportdebug` 调试开关
- 屏幕状态命令以 `-h` 实际输出为准，不同设备版本可能有差异
- 验证时需确保应用在前台运行，否则状态切换可能不触发布局刷新
- **不得假定设备当前处于某个折叠状态**，每次切换形态后必须通过 hilog 日志中的窗口尺寸确认状态已生效
- **必须先 `aa force-stop` 再启动**
