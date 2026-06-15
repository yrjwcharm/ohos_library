---
name: deveco-studio-verify
description: HarmonyOS 设备验证工具 - 支持多设备类型验证（手机/折叠屏/平板）、应用安装、UI自动化操作、截图验证、日志收集和 Journey 测试框架。使用 hdc 命令行工具直接操作设备。适用于测试 HarmonyOS 应用在不同设备类型上的表现、验证 UI 在不同屏幕尺寸下的适配、执行 Journey 自动化测试、收集设备日志进行调试、构建产物发布前的完整验证。
license: MIT
metadata:
  author: harmonyos-dev-skills
  version: "1.4.0"
  created: "2026-05-07"
  keywords: ["harmonyos", "设备验证", "模拟器", "hdc", "测试", "UI测试", "journey", "自动化测试"]
---

# HarmonyOS 设备验证

使用 hdc 命令行工具对 HarmonyOS 应用进行完整的设备测试验证流程。支持 Journey（旅程）测试框架进行自动化测试。

---

## 工作流程 (Workflow)

### Input
- **用户需求**：验证 HarmonyOS 应用在不同设备上的表现
- **输入文件**：HAP 构建产物（entry-default-unsigned.hap）
- **输入参数**：设备类型、bundleName、abilityName

### Process
1. **设备选择**：识别设备类型（手机/折叠屏/平板）
2. **模拟器启动**：批处理文件方式启动（Windows）或后台启动（macOS/Linux）
3. **应用安装**：hdc install 安装 HAP 文件
4. **应用启动**：hdc shell aa start 启动 EntryAbility
5. **UI验证**：截图验证、UI树获取、UI操作测试
6. **日志收集**：实时日志收集、日志文件导出
7. **交互式验证**：每设备完成后提示用户选择（继续/结束/跳过）
8. **报告生成**：汇总多设备验证结果，生成 Markdown 报告

### Output
- **验证报告**：多设备验证报告（Markdown 格式）
- **截图文件**：JPEG 格式截图（phone_main.jpeg、fold_main.jpeg）
- **UI树文件**：TXT/JSON 格式 UI 元素树
- **日志文件**：TXT 格式系统日志

---

## 决策树 (Decision Tree)

**验证需求类型判断**：
```
验证需求类型？
├─ 单设备验证 → 执行单设备验证流程
│   ├─ 设备连接成功 → 安装应用 → 验证 → 生成报告
│   └─ 设备连接失败 → 重启hdc服务 → 重试连接
└─ 多设备验证 → 执行交互式多设备验证流程
    ├─ 设备1验证完成 → 提示用户选择
    │   ├─ 用户选择 "yes" → 启动设备2 → 验证 → 提示用户
    │   │   ├─ 用户选择 "yes" → 继续验证更多设备
    │   │   └─ 用户选择 "no" → 结束验证 → 生成多设备报告
    │   └─ 用户选择 "no" → 结束验证 → 生成单设备报告
    └─ 用户选择 "skip" → 跳过当前设备 → 验证下一个设备
```

**验证失败处理**：
```
验证失败类型？
├─ 设备连接失败 → 重启hdc服务 → 重试连接
│   └─ 重试3次失败 → 提示用户手动启动模拟器
├─ Beta镜像启动失败 → 使用 DevEco Studio 界面启动
│   └─ 或创建 Release 版本模拟器
├─ 截图黑屏 → 使用 UI 树替代验证
└─ 日志乱码 → 使用 hilogtool 工具解析
    └─ 模拟器日志为明文格式，可直接读取
```

**用户选择处理**：
```
用户选择？
├─ "yes" 或 "y" → 继续验证下一个设备
├─ "no" 或 "n" → 结束验证，生成报告
└─ "skip" 或 "s" → 跳过当前设备，验证下一个
```

---

## 核心功能

- **设备管理**：列出/启动设备/模拟器
- **应用操作**：安装/启动/停止应用
- **UI自动化**：点击/滑动/输入/按键
- **验证采集**：截图/UI树/日志收集
- **Journey测试**：XML格式的自动化测试框架

---

## 前置条件

1. 已安装 DevEco Studio 并配置 SDK
2. hdc 工具已添加到 PATH
3. 设备/模拟器已配置并可访问

**工具路径**：
```
Windows:
  hdc:     C:\Program Files\Huawei\DevEco Studio\sdk\default\openharmony\toolchains\hdc.exe
  emulator: C:\Program Files\Huawei\DevEco Studio\tools\emulator\Emulator.exe

macOS:
  hdc:     /Applications/DevEco-Studio.app/Contents/sdk/default/openharmony/toolchains/hdc
  emulator: /Applications/DevEco-Studio.app/Contents/tools/emulator/Emulator
```

---

## 验证流程

### 阶段 1: 设备选择

**设备矩阵**（需在不同形态设备上测试）：

| 优先级 | 设备类型 | 标识 | 验证重点 | 是否必选 |
|-------|---------|------|---------|----------|
| 1 | 手机 | `phone` | 基础布局、核心交互流程 | **必选** |
| 2 | 阔折叠 | `widefold` | 分栏布局、多窗适配 | 推荐 |
| 3 | 折叠屏 | `fold` | 折叠/展开适配、布局重排 | 推荐 |
| 4 | 三折叠 | `triplefold` | 多折适配、超宽屏布局 | 可选 |
| 5 | 平板 | `tablet` | 平板布局、横屏模式 | 推荐 |

**最低要求**：至少在手机设备上验证。推荐：手机 + 至少一种大屏设备。

> 详细设备规格见 [references/device-matrix.md](references/device-matrix.md)

---

### 阶段 2: 模拟器管理

#### 列出模拟器
```bash
emulator -list
emulator -list -details  # JSON格式详细信息
```

#### 创建模拟器
```bash
# 接受许可证（首次使用）
emulator -license accept

# 创建模拟器实例
emulator -create {实例名称} -deviceType Phone -osVersion "HarmonyOS 6.0.2(22)"

# 支持的设备类型：Phone, Foldable, WideFold, TripleFold, Tablet, Wearable, TV

# 删除模拟器
emulator -delete {实例名称}
```

> 详细模拟器管理见 [references/emulator-management.md](references/emulator-management.md)

#### 启动模拟器

**重要说明**：
- **Beta版本镜像无法通过命令行启动**，需通过 DevEco Studio 界面启动
- **推荐使用 HarmonyOS 6.0.2(22) Release版本镜像**（支持命令行启动）
- 模拟器启动需要 60-90 秒，请耐心等待

**Windows：使用批处理文件方式（推荐，最稳定）**

方法1：创建临时批处理文件
```powershell
# 创建批处理文件
$batPath = "$env:TEMP\start_emulator.bat"
@"
@echo off
cd /d "C:\Program Files\Huawei\DevEco Studio\tools\emulator"
Emulator.exe -start "Pura 9022"
pause
"@ | Out-File -FilePath $batPath -Encoding ASCII

# 在新窗口启动
Start-Process -FilePath $batPath -WindowStyle Normal

# 等待60秒后检查连接（推荐等待时间）
Start-Sleep -Seconds 60
# 如果未连接，可再等待30秒（总共90秒）
& "C:\Program Files\Huawei\DevEco Studio\sdk\default\openharmony\toolchains\hdc.exe" list targets
```

方法2：创建持久批处理文件
```bat
# scripts/start_emulator.bat
@echo off
cd /d "C:\Program Files\Huawei\DevEco Studio\tools\emulator"
Emulator.exe -start "Pura 9022"
pause
```

执行：`cmd.exe /c "scripts\start_emulator.bat"`

**macOS/Linux：后台启动**
```bash
# 使用 nohup 后台启动
export EMULATOR_PATH="/Applications/DevEco-Studio.app/Contents/tools/emulator/emulator"
nohup $EMULATOR_PATH -start MyPhone > /dev/null 2>&1 &

# 或使用 screen/tmux（推荐）
screen -dmS emulator $EMULATOR_PATH -start MyPhone

# 等待60秒后检查连接（推荐等待时间）
sleep 60
# 如果未连接，可再等待30秒（总共90秒）
hdc list targets
```

**验证连接**：
```bash
hdc list targets
# 输出: 127.0.0.1:5555
```

> 详细启动方法见 [references/emulator-management.md](references/emulator-management.md)

---

### 阶段 3: 应用安装

```bash
# 安装HAP
hdc -t <device_id> install -r <hap文件路径>

# 示例
hdc -t 127.0.0.1:5555 install -r entry/build/default/outputs/default/entry-default-unsigned.hap
```

---

### 阶段 4: 执行验证

#### 验证流程（交互式）

**重要说明**：验证采用交互式流程，每完成一个设备验证后，会提示用户是否继续验证下一个设备。

#### 1. 启动应用
```bash
hdc -t <device_id> shell aa start -a <ability名称> -b <bundle名称>
```

#### 2. UI操作
```bash
# 点击
hdc -t <id> shell uitest uiInput click <x> <y>

# 滑动
hdc -t <id> shell uitest uiInput swipe <起点X> <起点Y> <终点X> <终点Y>

# 输入文字
hdc -t <id> shell uitest uiInput inputText <x> <y> <文字>

# 按键事件
hdc -t <id> shell uitest uiInput keyEvent Back
```

#### 3. 截图验证
```bash
hdc -t <id> shell snapshot_display -f /data/local/tmp/验证.jpeg
hdc -t <id> file recv /data/local/tmp/验证.jpeg ./screenshots/
```

#### 4. 获取UI树
```bash
hdc -t <id> shell uitest dumpLayout -p /data/local/tmp/layout.txt
hdc -t <id> file recv /data/local/tmp/layout.txt ./
```

#### 5. 收集日志
```bash
hdc -t <id> shell hilog -x -n 200
```

#### 6. 验证完成提示

**单设备验证完成后**，会提示用户：
```
✅ 设备验证完成：[设备名称] (127.0.0.1:5555)

是否继续验证下一个设备？
- 输入 "yes" 或 "y" → 继续验证下一个设备
- 输入 "no" 或 "n" → 结束验证，生成报告
- 输入 "skip" → 跳过当前设备，验证下一个

请选择：[yes/no/skip]
```

**用户选择处理**：
- **yes**: 继续验证下一个设备（启动下一个模拟器或使用已连接设备）
- **no**: 结束验证流程，生成验证报告
- **skip**: 跳过当前设备，验证设备列表中的下一个设备

> 详细交互式验证流程见 [references/interactive-verification.md](references/interactive-verification.md)

---

### 阶段 5: Journey测试框架

Journey 是 XML 格式的自动化测试框架。

**示例**：
```xml
<journey name="登录流程测试">
   <description>测试用户登录的完整流程</description>
   <actions>
     <action>启动应用</action>
     <action>点击"登录"按钮</action>
     <action>在用户名输入框输入 "testuser"</action>
     <action>验证应用已进入主页</action>
   </actions>
</journey>
```

> 详细 Journey 指南见 [references/journeys.md](references/journeys.md)

---

### 阶段 6: 验证要点

**HarmonyOS 特有验证项**：

| 验证项 | 说明 | 适用设备 |
|--------|------|---------|
| 布局适配 | 不同屏幕尺寸下组件正确显示 | 全部 |
| 折叠/展开 | 折叠/展开时布局正确重排 | fold, widefold |
| 分栏模式 | 大屏下正确展示分栏布局 | widefold, tablet |
| 安全区避让 | 状态栏、导航栏正确避让 | 全部 |
| 横竖屏切换 | 旋转后布局正确 | phone, tablet |

---

### 阶段 7: 生成报告

验证报告模板：
```markdown
# 验证报告: <应用名称>

## 测试日期: YYYY-MM-DD
## 环境:
- 设备类型: [phone, tablet, widefold]
- 使用设备: [设备ID列表]
- 构建产物: <hap路径>

## 结果:
| 场景ID | 操作 | 预期结果 | 实际结果 | 状态 |
|--------|------|---------|---------|------|
| US-1 | 启动应用 | 应用打开 | ✅ | ✅ |
| US-2 | 点击按钮 | 跳转页面 | ✅ | ✅ |

## 汇总:
- 测试设备: X 台
- 测试场景: Y 个
- 通过: M/N (XX%)
```

> 详细流程见 [references/verification-workflow.md](references/verification-workflow.md)

---

## 多设备验证（交互式流程）

**最低要求**：至少手机设备已验证。

**推荐组合**：
- 手机 + 折叠屏（验证折叠适配）
- 手机 + 平板（验证大屏布局）

**交互式验证流程**：
1. 验证设备1 → 提示用户选择（yes/no/skip）
2. 用户选择 yes → 启动并验证设备2
3. 重复步骤直到用户选择 no → 生成多设备报告

**多设备启动**：每个模拟器间隔至少 5 秒启动，避免资源冲突。

> 详细交互式验证流程见 [references/interactive-verification.md](references/interactive-verification.md)
> 详细多设备启动方法见 [references/multi-device-startup.md](references/multi-device-startup.md)

---

## 常见问题

### hdc连接失败
```bash
hdc kill
hdc start
hdc list targets
```

### 模拟器无法启动
- 检查许可证：`emulator -license accept`
- Beta镜像：使用 DevEco Studio 界面启动
- 验证路径：`emulator -imageList -downloaded true`

### 截图黑屏
- 部分应用禁用截图（银行/支付类）
- 使用 UI 元素树替代

### uitest命令失败
- 开启测试模式：`hdc shell param set persist.ace.testmode.enabled 1`

### 真机日志乱码
- 使用 hilogtool 配合字典文件解析
- 见 [references/log-collection.md](references/log-collection.md)

---

## 快速参考

**常用命令**：
```bash
# 设备
hdc list targets
emulator -list -details

# 模拟器
emulator -create MyPhone -deviceType Phone -osVersion "HarmonyOS 6.0.2(22)"
emulator -delete MyPhone

# 应用
hdc -t <id> install -r <hap>
hdc -t <id> shell aa start -a <ability> -b <bundle>

# UI操作
hdc -t <id> shell uitest uiInput click <x> <y>
hdc -t <id> shell snapshot_display -f /data/local/tmp/s.jpeg
hdc -t <id> file recv /data/local/tmp/s.jpeg ./

# 日志
hdc -t <id> shell hilog -x -n 200
```

---

## 检查清单

- [ ] 至少手机设备已测试
- [ ] 构建产物安装成功
- [ ] 所有测试场景已执行
- [ ] 关键步骤已截图留痕
- [ ] 日志已收集并检查（无Error/Fatal）
- [ ] HarmonyOS特有验证项已完成
- [ ] 验证报告已生成

---

## 参考文档

- [device-matrix.md](references/device-matrix.md) - 设备规格和验证项
- [emulator-management.md](references/emulator-management.md) - 模拟器管理完整指南（含启动方法）
- [multi-device-startup.md](references/multi-device-startup.md) - 多设备启动详细方法
- **[interactive-verification.md](references/interactive-verification.md)** - 交互式验证流程详解
- [hdc-operations.md](references/hdc-operations.md) - hdc命令完整参考
- [verification-workflow.md](references/verification-workflow.md) - 详细验证流程
- [journeys.md](references/journeys.md) - Journey测试框架指南
- [log-collection.md](references/log-collection.md) - 日志解析指南

**相关Skills**：
- **deveco-studio-hilog** - 日志分析和崩溃日志解析
- **deveco-studio-hvigor** - 构建工具和命令参考

---

## 测试验证

完整的测试用例（87个）见 `assets/test-cases/` 目录，包含场景化命令测试和提示词测试。基于 MyApplication3 四设备验证实战经验创建。