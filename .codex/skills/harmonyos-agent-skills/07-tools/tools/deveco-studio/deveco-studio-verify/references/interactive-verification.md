# 交互式验证流程

本文档详细说明设备验证完成后的交互式提示流程。

---

## 目录

1. [设计理念](#设计理念)
2. [单设备验证流程](#单设备验证流程)
3. [多设备验证流程](#多设备验证流程)
4. [用户选择处理](#用户选择处理)
5. [验证报告生成](#验证报告生成)

---

## 设计理念

### 交互式验证的优势

**传统方式**：
- 强制验证所有设备
- 无法中途结束
- 资源和时间浪费

**交互式方式（推荐）**：
- ✅ 验证完一个设备后提示用户
- ✅ 用户可选择继续或结束
- ✅ 灵活应对时间和资源限制
- ✅ 提高效率和用户体验

---

## 单设备验证流程

### 验证步骤

**步骤1：启动设备**
```bash
# 启动模拟器
cmd.exe /c "scripts\start_emulator.bat"

# 等待连接
hdc list targets
```

**步骤2：安装应用**
```bash
hdc -t 127.0.0.1:5555 install -r entry/build/default/outputs/default/entry-default-unsigned.hap
```

**步骤3：执行测试场景**
```bash
# 启动应用
hdc -t 127.0.0.1:5555 shell aa start -a EntryAbility -b com.example.myapplication

# UI操作
hdc -t 127.0.0.1:5555 shell uitest uiInput click 540 800

# 截图验证
hdc -t 127.0.0.1:5555 shell snapshot_display -f /data/local/tmp/test.jpeg
hdc -t 127.0.0.1:5555 file recv /data/local/tmp/test.jpeg screenshots/

# 收集日志
hdc -t 127.0.0.1:5555 shell hilog -x -n 200 > logs/device1.log
```

**步骤4：验证完成提示**

```
========================================
✅ 设备验证完成：Pura 9022 (手机)
========================================

设备信息：
- 设备类型：Phone ✅
- 屏幕尺寸：1320x2856 ✅
- 安全区避让：137px ✅

验证结果：
- 应用启动：✅ PASS
- 基础布局：✅ PASS
- 核心功能：✅ PASS
- 截图采集：✅ PASS

文件保存：
- 截图：screenshots/pura9022_main.jpeg
- UI树：screenshots/pura9022_layout.txt
- 日志：logs/pura9022_hilog.txt

========================================
是否继续验证下一个设备？
========================================

可用设备列表：
1. Mate X7 (折叠屏) - 验证折叠适配
2. MatePad Pro (平板) - 验证大屏布局
3. 结束验证，生成报告

请选择：
- 输入 "1" 或 "yes" → 继续验证 Mate X7
- 输入 "2" 或 "skip" → 跳过 Mate X7，验证平板
- 输入 "no" 或 "n" → 结束验证，生成报告

您的选择：[等待用户输入]
```

---

## 多设备验证流程

### 推荐验证顺序

**顺序1：手机 + 折叠屏**
```
设备列表：
1. Pura 9022 (手机) → 必选
2. Mate X7 (折叠屏) → 推荐

验证流程：
[设备1] → 提示 → 用户选择 → [设备2] → 提示 → 用户选择 → 结束
```

**顺序2：手机 + 平板**
```
设备列表：
1. Pura 9022 (手机) → 必选
2. MatePad Pro (平板) → 推荐

验证流程：
[设备1] → 提示 → 用户选择 → [设备2] → 提示 → 用户选择 → 结束
```

**顺序3：手机 + 折叠屏 + 平板**
```
设备列表：
1. Pura 9022 (手机) → 必选
2. Mate X7 (折叠屏) → 推荐
3. MatePad Pro (平板) → 可选

验证流程：
[设备1] → 提示 → 用户选择 → [设备2] → 提示 → 用户选择 → [设备3] → 提示 → 结束
```

### 多设备验证步骤

**场景：验证手机 + 折叠屏**

---

#### 第一轮：手机设备验证

**步骤1.1：启动手机模拟器**
```bash
# PowerShell 创建批处理文件
$batPath1 = "$env:TEMP\start_pura9022.bat"
@"
@echo off
cd /d "C:\Program Files\Huawei\DevEco Studio\tools\emulator"
Emulator.exe -start "Pura 9022"
pause
"@ | Out-File -FilePath $batPath1 -Encoding ASCII

Start-Process -FilePath $batPath1 -WindowStyle Normal
Start-Sleep -Seconds 30

# 检查连接
& "C:\Program Files\Huawei\DevEco Studio\sdk\default\openharmony\toolchains\hdc.exe" list targets
# 输出: 127.0.0.1:5555
```

**步骤1.2：验证手机**
```bash
# 安装应用
hdc -t 127.0.0.1:5555 install -r entry-default-unsigned.hap

# 启动应用
hdc -t 127.0.0.1:5555 shell aa start -a EntryAbility -b com.example.myapplication

# 截图验证
hdc -t 127.0.0.1:5555 shell snapshot_display -f /data/local/tmp/phone.jpeg
hdc -t 127.0.0.1:5555 file recv /data/local/tmp/phone.jpeg screenshots/phone.jpeg

# 收集日志
hdc -t 127.0.0.1:5555 shell hilog -x -n 500 > logs/phone.log
```

**步骤1.3：验证完成提示**
```
========================================
✅ 手机设备验证完成：Pura 9022
========================================

验证结果：4/4 PASS (100%)

是否继续验证下一个设备？
- yes → 继续验证 Mate X7 (折叠屏)
- no  → 结束验证，生成报告
- skip → 跳过折叠屏，结束验证

您的选择：[等待输入]
```

---

#### 用户选择处理

**用户输入 "yes"**：

**步骤2.1：启动折叠屏模拟器**
```powershell
# 创建第二个批处理文件
$batPath2 = "$env:TEMP\start_matex7.bat"
@"
@echo off
cd /d "C:\Program Files\Huawei\DevEco Studio\tools\emulator"
Emulator.exe -start "Mate X7"
pause
"@ | Out-File -FilePath $batPath2 -Encoding ASCII

Start-Process -FilePath $batPath2 -WindowStyle Normal
Start-Sleep -Seconds 5  # 等待5秒避免冲突

# 等待30秒让模拟器启动
Start-Sleep -Seconds 30

# 检查多设备连接
& "C:\Program Files\Huawei\DevEco Studio\sdk\default\openharmony\toolchains\hdc.exe" list targets
# 输出:
# 127.0.0.1:5555  # 手机（已验证）
# 127.0.0.1:5557  # 折叠屏（待验证）
```

**步骤2.2：验证折叠屏**
```bash
# 安装应用到折叠屏
hdc -t 127.0.0.1:5557 install -r entry-default-unsigned.hap

# 启动应用
hdc -t 127.0.0.1:5557 shell aa start -a EntryAbility -b com.example.myapplication

# 截图验证（展开状态）
hdc -t 127.0.0.1:5557 shell snapshot_display -f /data/local/tmp/fold.jpeg
hdc -t 127.0.0.1:5557 file recv /data/local/tmp/fold.jpeg screenshots/fold.jpeg

# 收集日志
hdc -t 127.0.0.1:5557 shell hilog -x -n 500 > logs/fold.log
```

**步骤2.3：折叠屏验证完成提示**
```
========================================
✅ 折叠屏设备验证完成：Mate X7
========================================

验证结果：4/4 PASS (100%)

设备对比：
- 手机：1320x2856 (86KB 截图)
- 折叠屏：2210x2416 (113KB 截图)

是否继续验证下一个设备？
- yes → 继续验证平板（如果有）
- no  → 结束验证，生成报告

您的选择：[等待输入]
```

---

**用户输入 "no"**：

**步骤3：生成验证报告**
```bash
# 基于已验证设备生成报告
# 手机验证结果已保存
# 不再验证其他设备
```

---

**用户输入 "skip"**：

跳过当前设备（折叠屏），验证下一个设备（如果有）：
```bash
# 不验证折叠屏
# 直接跳到平板验证（如果有平板设备）
```

---

## 用户选择处理

### 选择类型

| 用户输入 | 含义 | 执行操作 |
|---------|------|---------|
| `yes` / `y` / `1` | 继续 | 验证下一个设备 |
| `no` / `n` | 结束 | 生成报告，结束验证 |
| `skip` / `s` / `2` | 跳过 | 跳过当前设备，验证下一个 |

### 处理逻辑

**Python 示例**：
```python
def handle_user_choice(current_device_index, device_list):
    """
    处理用户选择
    
    Args:
        current_device_index: 当前验证设备索引
        device_list: 设备列表
    
    Returns:
        next_action: 'continue', 'end', 'skip'
    """
    user_input = input("您的选择 [yes/no/skip]: ").strip().lower()
    
    if user_input in ['yes', 'y', '1']:
        # 继续验证下一个设备
        if current_device_index < len(device_list) - 1:
            return 'continue', current_device_index + 1
        else:
            print("已是最后一个设备，生成报告")
            return 'end', None
    
    elif user_input in ['no', 'n']:
        # 结束验证
        return 'end', None
    
    elif user_input in ['skip', 's', '2']:
        # 跳过当前设备
        if current_device_index < len(device_list) - 1:
            return 'skip', current_device_index + 1
        else:
            print("已是最后一个设备，无法跳过")
            return 'end', None
    
    else:
        print("无效输入，请重新选择")
        return handle_user_choice(current_device_index, device_list)
```

---

## 验证报告生成

### 单设备验证报告

```markdown
# 验证报告: MyApplication

## 测试日期: 2026-05-07

## 环境:
- 设备类型: Phone (手机)
- 使用设备: Pura 9022 (127.0.0.1:5555)
- 构建产物: entry-default-unsigned.hap

## 验证结果:

| 场景ID | 操作 | 预期结果 | 实际结果 | 状态 |
|--------|------|---------|---------|------|
| US-1 | 启动应用 | 应用打开 | ✅ | PASS |
| US-2 | 基础布局 | 组件正确显示 | ✅ | PASS |
| US-3 | 核心功能 | 功能正常 | ✅ | PASS |
| US-4 | 截图验证 | 截图成功 | ✅ | PASS |

## 汇总:
- 测试设备: 1 台
- 测试场景: 4 个
- 通过率: 100% (4/4)
- 失败: 0 个

## 文件:
- 截图: screenshots/pura9022_main.jpeg (86KB)
- UI树: screenshots/pura9022_layout.txt (30KB)
- 日志: logs/pura9022_hilog.txt (500行)
```

---

### 多设备验证报告

```markdown
# 验证报告: MyApplication

## 测试日期: 2026-05-07

## 环境:
- 设备类型: Phone + Foldable (手机 + 折叠屏)
- 使用设备: 
  - Pura 9022 (127.0.0.1:5555)
  - Mate X7 (127.0.0.1:5557)
- 构建产物: entry-default-unsigned.hap

## 验证结果:

### 设备1: Pura 9022 (手机)
| 场景ID | 操作 | 预期结果 | 实际结果 | 状态 |
|--------|------|---------|---------|------|
| US-1 | 启动应用 | 应用打开 | ✅ | PASS |
| US-2 | 基础布局 | 组件正确 | ✅ | PASS |
| US-3 | 核心功能 | 功能正常 | ✅ | PASS |
| US-4 | 截图验证 | 1320x2856 | ✅ | PASS |

### 设备2: Mate X7 (折叠屏)
| 场景ID | 操作 | 预期结果 | 实际结果 | 状态 |
|--------|------|---------|---------|------|
| US-1 | 启动应用 | 应用打开 | ✅ | PASS |
| US-2 | 折叠适配 | 布局正确 | ✅ | PASS |
| US-3 | 核心功能 | 功能正常 | ✅ | PASS |
| US-4 | 截图验证 | 2210x2416 | ✅ | PASS |

## 汇总:
- 测试设备: 2 台
- 测试场景: 8 个
- 通过率: 100% (8/8)
- 失败: 0 个

## 设备对比:
- 手机屏幕: 1320x2856 (86KB)
- 折叠屏屏幕: 2210x2416 (113KB)
- 布局适配: ✅ 通过

## 文件:
- 手机截图: screenshots/phone.jpeg
- 折叠屏截图: screenshots/fold.jpeg
- 手机日志: logs/phone.log
- 折叠屏日志: logs/fold.log
```

---

## 最佳实践

### 1. 验证顺序建议

- **先验证手机**：基础设备，验证核心功能
- **后验证大屏**：折叠屏/平板，验证适配

### 2. 用户选择时机

- 验证完一个设备后立即提示
- 不要等到所有设备都验证完才提示

### 3. 提示信息设计

- 显示已验证设备的结果汇总
- 显示待验证设备列表
- 提供清晰的选项说明

### 4. 结束条件

- 用户选择 "no"
- 已验证所有设备
- 验证失败超过阈值（可选）

---

## 快速参考

**验证流程**：
```
启动设备1 → 验证 → 提示 → 
  用户选择:
    yes → 启动设备2 → 验证 → 提示 → ...
    no  → 生成报告 → 结束
    skip → 跳过设备2 → 启动设备3 → ...
```

**提示格式**：
```
✅ 设备验证完成：[设备名称]
是否继续验证下一个设备？[yes/no/skip]
```

**用户选择**：
- yes/y/1 → 继续验证
- no/n → 结束验证
- skip/s/2 → 跳过设备

---

## 相关文档

- [verification-workflow.md](verification-workflow.md) - 详细验证流程
- [multi-device-startup.md](multi-device-startup.md) - 多设备启动方法
- [hdc-operations.md](hdc-operations.md) - hdc 命令参考