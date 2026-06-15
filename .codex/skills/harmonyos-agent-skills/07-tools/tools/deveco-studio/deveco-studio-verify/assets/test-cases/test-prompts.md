# 测试提示词

本文档包含验证 deveco-studio-verify skill 功能的测试提示词，每个测试场景包含提示词和预期输出步骤。

---

## 一、设备管理测试

### 测试场景 1：列出已连接设备

**提示词**：
```
列出已连接设备
```

**预期输出**：
- 步骤1：执行 `hdc list targets`
- 步骤2：解析设备列表输出
- 步骤3：提取设备ID（如 127.0.0.1:5555）
- 步骤4：输出设备数量和列表
- 总结：列出所有已连接设备（如：127.0.0.1:5555, 127.0.0.1:5557）

---

### 测试场景 2：列出已安装模拟器

**提示词**：
```
列出已安装模拟器详细信息
```

**预期输出**：
- 步骤1：执行 `emulator -list`
- 步骤2：执行 `emulator -list -details`
- 步骤3：解析 JSON 格式输出
- 步骤4：提取每个模拟器的信息：
  - name: 模拟器名称
  - deviceType: 设备类型
  - osVersion: 系统版本
  - isRunning: 运行状态
- 总结：列出所有模拟器及其详细信息

---

### 测试场景 3：获取设备信息

**提示词**：
```
获取设备 127.0.0.1:5555 的详细信息
```

**预期输出**：
- 步骤1：执行 `hdc -t 127.0.0.1:5555 shell param get const.product.devicetype`
- 步骤2：执行 `hdc -t 127.0.0.1:5555 shell param get const.product.model`
- 步骤3：解析输出提取设备类型和型号
- 总结：设备类型：phone，型号：emulator

---

### 测试场景 4：检查设备连接状态

**提示词**：
```
检查设备是否连接成功
```

**预期输出**：
- 步骤1：执行 `hdc list targets`
- 步骤2：检查输出是否为 `[Empty]`
- 步骤3：如果为 Empty，提示启动模拟器
- 步骤4：如果不为 Empty，输出已连接设备列表
- 总结：设备连接状态（已连接/未连接）

---

## 二、模拟器管理测试

### 测试场景 5：使用批处理文件启动模拟器 ✅

**提示词**：
```
使用批处理文件启动 Pura 9022 模拟器
```

**预期输出**：
- 步骤1：创建临时批处理文件：
  ```powershell
  $batPath = "$env:TEMP\start_pura9022.bat"
  @"
  @echo off
  cd /d "C:\Program Files\Huawei\DevEco Studio\tools\emulator"
  Emulator.exe -start "Pura 9022"
  pause
  "@ | Out-File -FilePath $batPath -Encoding ASCII
  ```
- 步骤2：在新窗口启动批处理文件：
  ```powershell
  Start-Process -FilePath $batPath -WindowStyle Normal
  ```
- 步骤3：等待 30 秒让模拟器启动
- 步骤4：执行 `hdc list targets` 检查连接
- 步骤5：输出连接状态：127.0.0.1:5555
- 总结：模拟器启动成功，设备连接成功

---

### 测试场景 6：创建持久批处理文件启动模拟器

**提示词**：
```
创建持久批处理文件启动 Mate X7 模拟器
```

**预期输出**：
- 步骤1：创建批处理文件 `scripts\start_matex7.bat`：
  ```bat
  @echo off
  cd /d "C:\Program Files\Huawei\DevEco Studio\tools\emulator"
  Emulator.exe -start "Mate X7"
  pause
  ```
- 步骤2：执行批处理文件：
  ```bash
  cmd.exe /c "scripts\start_matex7.bat"
  ```
- 步骤3：等待 30 秒
- 步骤4：执行 `hdc list targets` 检查连接
- 总结：批处理文件创建成功，模拟器启动成功

---

### 测试场景 7：创建模拟器实例

**提示词**：
```
创建折叠屏模拟器实例 WideFold Test
```

**预期输出**：
- 步骤1：执行 `emulator -create "WideFold Test" -deviceType WideFold -osVersion "HarmonyOS 6.0.2(22)"`
- 步骤2：检查输出："Device create success"
- 步骤3：执行 `emulator -list` 验证创建结果
- 步骤4：确认模拟器在列表中
- 总结：模拟器创建成功

---

### 测试场景 8：删除模拟器实例

**提示词**：
```
删除模拟器实例 TestPhone
```

**预期输出**：
- 步骤1：检查模拟器是否运行（如果运行，先停止）
- 步骤2：执行 `emulator -delete "TestPhone"`
- 步骤3：执行 `emulator -list` 验证删除结果
- 步骤4：确认模拟器不在列表中
- 总结：模拟器删除成功

---

### 测试场景 9：检测Beta版本镜像

**提示词**：
```
检测模拟器是否为Beta版本
```

**预期输出**：
- 步骤1：执行 `emulator -list -details`
- 步骤2：检查 osVersion 字段
- 步骤3：识别是否包含 "Beta"
- 步骤4：Beta 版本提示需使用 DevEco Studio 界面启动
- 步骤5：Release 版本可命令行启动
- 总结：Beta版本检测完成（是Beta/非Beta）

---

### 测试场景 10：多设备顺序启动

**提示词**：
```
顺序启动手机和折叠屏模拟器
```

**预期输出**：
- 步骤1：启动第一个模拟器（手机）：
  ```powershell
  Start-Process -FilePath "$env:TEMP\start_phone.bat" -WindowStyle Normal
  ```
- 步骤2：等待 5 秒（避免启动冲突）
- 步骤3：启动第二个模拟器（折叠屏）：
  ```powershell
  Start-Process -FilePath "$env:TEMP\start_fold.bat" -WindowStyle Normal
  ```
- 步骤4：等待 30 秒
- 步骤5：执行 `hdc list targets` 检查连接
- 步骤6：输出：127.0.0.1:5555, 127.0.0.1:5557
- 总结：两个模拟器启动成功，连接正常

---

## 三、应用操作测试

### 测试场景 11：安装应用

**提示词**：
```
在设备 127.0.0.1:5555 安装应用 entry-default-unsigned.hap
```

**预期输出**：
- 步骤1：检查 HAP 文件路径
- 步骤2：执行 `hdc -t 127.0.0.1:5555 install -r entry/build/default/outputs/default/entry-default-unsigned.hap`
- 步骤3：检查安装输出："install bundle successfully"
- 步骤4：验证应用已安装
- 总结：应用安装成功

---

### 测试场景 12：启动应用

**提示词**：
```
在设备 127.0.0.1:5555 启动应用 EntryAbility
```

**预期输出**：
- 步骤1：获取应用 bundleName
- 步骤2：执行 `hdc -t 127.0.0.1:5555 shell aa start -a EntryAbility -b com.example.myapplication`
- 步骤3：检查启动输出："start ability successfully"
- 步骤4：验证应用已启动（UI 显示）
- 总结：应用启动成功

---

### 测试场景 13：验证应用信息

**提示词**：
```
验证应用 com.example.myapplication 的信息
```

**预期输出**：
- 步骤1：执行 `hdc shell bm dump -n com.example.myapplication`
- 步骤2：解析输出提取：
  - bundleName
  - mainAbility
  - versionName
- 步骤3：验证信息正确
- 总结：应用信息验证成功（bundleName: com.example.myapplication, mainAbility: EntryAbility）

---

### 测试场景 14：停止应用

**提示词**：
```
停止应用 com.example.myapplication
```

**预期输出**：
- 步骤1：执行 `hdc shell aa force-stop com.example.myapplication`
- 步骤2：检查应用已停止
- 步骤3：验证应用不在运行列表
- 总结：应用停止成功

---

## 四、UI验证测试

### 测试场景 15：截图验证

**提示词**：
```
截图验证设备 127.0.0.1:5555 的应用界面
```

**预期输出**：
- 步骤1：设备截图：
  ```bash
  hdc -t 127.0.0.1:5555 shell snapshot_display -f /data/local/tmp/test.jpeg
  ```
- 步骤2：检查输出：success: snapshot display 0, width: 1320, height: 2856
- 步骤3：传输到本地：
  ```bash
  hdc -t 127.0.0.1:5555 file recv /data/local/tmp/test.jpeg screenshots/test.jpeg
  ```
- 步骤4：检查文件大小：FileTransfer finish, Size:86KB
- 步骤5：验证截图尺寸和大小
- 总结：截图验证成功（1320x2856, 86KB）

---

### 测试场景 16：多设备截图对比

**提示词**：
```
对比手机和折叠屏的截图尺寸
```

**预期输出**：
- 步骤1：手机截图：1320x2856, 86KB
- 步骤2：折叠屏截图：2210x2416, 113KB
- 步骤3：对比尺寸差异：
  - 手机：1320x2856（小屏紧凑）
  - 折叠屏：2210x2416（大屏展开）
- 步骤4：对比文件大小：
  - 手机：86KB
  - 折叠屏：113KB（尺寸增加 52%）
- 总结：截图尺寸对比完成，布局适配正确

---

### 测试场景 17：获取UI元素树

**提示词**：
```
获取设备 127.0.0.1:5555 的UI元素树
```

**预期输出**：
- 步骤1：执行 `hdc -t 127.0.0.1:5555 shell uitest dumpLayout -p /data/local/tmp/layout.txt`
- 步骤2：检查输出："DumpLayout saved to:/data/local/tmp/layout.txt"
- 步骤3：传输到本地：
  ```bash
  hdc -t 127.0.0.1:5555 file recv /data/local/tmp/layout.txt screenshots/layout.txt
  ```
- 步骤4：读取 UI 树内容
- 步骤5：解析组件信息（bounds、text、type）
- 总结：UI树获取成功（30KB）

---

### 测试场景 18：定位UI元素

**提示词**：
```
从UI树中定位按钮元素并计算点击坐标
```

**预期输出**：
- 步骤1：读取 UI 树文件内容
- 步骤2：搜索 "Button" 或 "type": "Button"
- 步骤3：提取元素 bounds 坐标：[x1,y1][x2,y2]
- 步骤4：计算中心点坐标：
  - centerX = (x1 + x2) / 2
  - centerY = (y1 + y2) / 2
- 步骤5：输出点击坐标
- 总结：按钮定位成功，中心点坐标：(540, 800)

---

### 测试场景 19：执行点击操作

**提示词**：
```
在坐标 (540, 800) 执行点击操作
```

**预期输出**：
- 步骤1：执行 `hdc shell uitest uiInput click 540 800`
- 步骤2：等待 UI 响应（1-2秒）
- 步骤3：截图验证点击效果
- 步骤4：检查 UI 变化（按钮点击、页面跳转）
- 总结：点击操作执行成功，UI 响应正确

---

### 测试场景 20：执行滑动操作

**提示词**：
```
在屏幕上执行向上滑动操作
```

**预期输出**：
- 步骤1：计算滑动坐标：
  - 起始点：(centerX, centerY + 200)
  - 终止点：(centerX, centerY - 200)
- 步骤2：执行 `hdc shell uitest uiInput swipe <startX> <startY> <endX> <endY>`
- 步骤3：等待 UI 响应
- 步骤4：截图验证滑动效果
- 总结：滑动操作执行成功

---

### 测试场景 21：执行按键操作

**提示词**：
```
执行 Back 按键操作
```

**预期输出**：
- 步骤1：执行 `hdc shell uitest uiInput keyEvent Back`
- 步骤2：等待 UI 响应
- 步骤3：截图验证按键效果
- 步骤4：检查页面变化（返回上一页）
- 总结：按键操作执行成功，返回上一页

---

## 五、日志收集测试

### 测试场景 22：收集实时日志

**提示词**：
```
收集设备最近 200 行日志
```

**预期输出**：
- 步骤1：执行 `hdc shell hilog -x -n 200`
- 步骤2：解析日志输出格式：
  - 时间戳：05-07 16:02:06.544
  - 级别：I/W/E/F
  - 标签：EntryAbility
  - 内容：日志消息
- 步骤3：检查日志级别分布
- 步骤4：搜索关键日志（Error/Fatal）
- 总结：日志收集成功（200行），无Error/Fatal

---

### 测试场景 23：按应用过滤日志

**提示词**：
```
收集应用 com.example.myapplication 的日志
```

**预期输出**：
- 步骤1：获取应用 PID：
  ```bash
  hdc shell aa dump -a | grep com.example.myapplication
  ```
- 步骤2：执行 `hdc shell hilog -x -n 500 -P <pid>`
- 步骤3：或使用 bundle_name 过滤
- 步骤4：解析应用相关日志
- 步骤5：检查应用启动、运行日志
- 总结：应用日志收集成功

---

### 测试场景 24：导出日志文件

**提示词**：
```
导出设备日志文件到本地
```

**预期输出**：
- 步骤1：查找日志文件：
  ```bash
  hdc shell "ls -lt /data/log/hilog/*.gz | head -5"
  ```
- 步骤2：传输日志文件：
  ```bash
  hdc file recv /data/log/hilog/hilog.XXX.gz logs/
  ```
- 步骤3：解压日志文件（模拟器）：
  ```bash
  gunzip -k logs/*.gz
  ```
- 步骤4：读取日志内容
- 总结：日志文件导出成功（798KB）

---

### 测试场景 25：解析日志内容

**提示词**：
```
解析日志文件并检查是否有Error
```

**预期输出**：
- 步骤1：解压日志文件（如果需要）
- 步骤2：搜索 Error 级别日志：
  ```bash
  grep " E " logs/hilog.txt
  ```
- 步骤3：搜索 Fatal 级别日志：
  ```bash
  grep " F " logs/hilog.txt
  ```
- 步骤4：如果无 Error/Fatal，验证通过
- 步骤5：如果有 Error，记录问题
- 总结：日志解析完成，无Error/Fatal（验证通过）

---

## 六、交互式验证测试 ✅

### 测试场景 26：单设备验证完成提示

**提示词**：
```
验证设备 Pura 9022 完成后提示用户是否继续
```

**预期输出**：
- 步骤1：完成设备验证（安装、启动、截图、UI树、日志）
- 步骤2：汇总验证结果：
  - 设备信息：Pura 9022, 1320x2856
  - 验证结果：应用启动✅、截图✅、UI树✅、日志✅
  - 文件保存：phone_main.jpeg (86KB), phone_layout.txt (30KB)
- 步骤3：使用 Question 工具提示用户：
  ```
  ✅ 设备验证完成：Pura 9022
  
  是否继续验证下一个设备？
  - yes → 继续验证 Mate X7
  - no  → 结束验证，生成报告
  - skip → 跳过 Mate X7
  
  请选择：[yes/no/skip]
  ```
- 步骤4：等待用户输入
- 总结：验证完成提示显示成功

---

### 测试场景 27：用户选择继续验证

**提示词**：
```
用户选择 yes，继续验证下一个设备
```

**预期输出**：
- 步骤1：接收用户输入："yes" 或 "y"
- 步骤2：启动下一个设备（Mate X7）：
  ```powershell
  Start-Process -FilePath "$env:TEMP\start_matex7.bat"
  ```
- 步骤3：等待 5 秒（避免启动冲突）
- 步骤4：等待 30 秒让模拟器启动
- 步骤5：执行 `hdc list targets` 检查连接
- 步骤6：验证设备连接：127.0.0.1:5557
- 步骤7：继续验证设备2
- 总结：用户选择正确处理，继续验证 Mate X7

---

### 测试场景 28：用户选择结束验证

**提示词**：
```
用户选择 no，结束验证并生成报告
```

**预期输出**：
- 步骤1：接收用户输入："no" 或 "n"
- 步骤2：结束验证流程
- 步骤3：汇总已验证设备信息
- 步骤4：生成验证报告 Markdown 文件
- 步骤5：报告内容包括：
  - 设备信息汇总表
  - 验证结果对比表
  - 截图文件清单
  - 日志文件清单
  - 验证结论
- 步骤6：保存报告文件
- 总结：验证结束，报告生成成功

---

### 测试场景 29：用户选择跳过设备

**提示词**：
```
用户选择 skip，跳过当前设备验证下一个
```

**预期输出**：
- 步骤1：接收用户输入："skip" 或 "s"
- 步骤2：跳过当前设备（Mate X7）
- 步骤3：继续验证下一个设备（WideFold Test）
- 步骤4：启动 WideFold Test
- 步骤5：验证 WideFold Test
- 步骤6：验证完成后再次提示用户
- 总结：跳过 Mate X7，继续验证 WideFold Test

---

### 测试场景 30：完整交互式验证流程 ✅

**提示词**：
```
验证 MyApplication3 多设备，包含手机和折叠屏
```

**预期输出**：
- 步骤1：启动设备1（手机 Pura 9022）
- 步骤2：验证设备1：
  - 安装应用 ✅
  - 启动应用 ✅
  - 截图验证 ✅（1320x2856, 86KB）
  - UI树获取 ✅（30KB）
  - 日志收集 ✅（7.8MB）
- 步骤3：验证完成提示 → 用户选择 "yes"
- 步骤4：启动设备2（折叠屏 Mate X7）
- 步骤5：验证设备2：
  - 安装应用 ✅
  - 启动应用 ✅
  - 截图验证 ✅（2210x2416, 113KB）
  - UI树获取 ✅（33KB）
  - 日志收集 ✅（781KB）
- 步骤6：验证完成提示 → 用户选择 "no"
- 步骤7：生成多设备验证报告
- 总结：多设备验证完成（2台设备，通过率100%）

---

## 七、多设备验证测试

### 测试场景 31：三设备验证流程

**提示词**：
```
验证 MyApplication3 三设备（手机、折叠屏、阔折叠）
```

**预期输出**：
- 步骤1：启动并验证设备1（手机）
- 步骤2：验证完成提示 → 用户选择 "yes"
- 步骤3：启动并验证设备2（折叠屏）
- 步骤4：验证完成提示 → 用户选择 "创建WideFold并验证"
- 步骤5：创建 WideFold Test 模拟器
- 步骤6：启动并验证设备3（阔折叠）
- 步骤7：验证完成提示 → 用户选择 "结束验证"
- 步骤8：生成三设备验证报告
- 总结：三设备验证完成（手机1320x2856, 折叠屏2210x2416, 阑折叠1320x2120）

---

### 测试场景 32：四设备验证流程 ✅

**提示词**：
```
验证 MyApplication3 四设备，包含批处理+hdc验证方式
```

**预期输出**：
- 步骤1：使用 MCP 工具验证设备1（手机）
- 步骤2：使用 MCP 工具验证设备2（折叠屏 Mate X7）
- 步骤3：使用 MCP 工具验证设备3（阑折叠 WideFold Test）
- 步骤4：用户选择 "创建Foldable并验证（批处理+hdc）"
- 步骤5：创建 Foldable Test 模拟器（批处理文件）：
  ```bash
  scripts\create_foldable.bat
  ```
- 步骤6：启动 Foldable Test（批处理文件）：
  ```bash
  scripts\start_foldable_test.bat
  ```
- 步骤7：验证设备4（使用 hdc 命令，不使用 MCP）：
  - 安装应用：`hdc install -r app.hap` ✅
  - 启动应用：`hdc shell aa start` ✅
  - 截图验证：`hdc shell snapshot_display` + `hdc file recv` ✅
  - UI树获取：`hdc shell uitest dumpLayout` + `hdc file recv` ✅
  - 日志收集：`hdc shell hilog` ✅
- 步骤8：验证完成提示 → 用户选择 "结束验证"
- 步骤9：生成四设备验证报告
- 总结：四设备验证完成（包含批处理+hdc验证方式）

---

### 测试场景 33：多设备截图尺寸对比

**提示词**：
```
对比四设备截图尺寸和布局适配
```

**预期输出**：
- 步骤1：列出所有设备截图尺寸：
  - 手机：1320x2856, 86KB
  - 折叠屏：2210x2416, 113KB
  - 阑折叠：1320x2120, 67KB
  - 折叠屏：2224x2496, 117KB
- 步骤2：对比尺寸比例：
  - 手机 vs 折叠屏：尺寸增加 52%
  - 手机 vs 阑折叠：高度减少 26%
- 步骤3：对比文件大小：
  - 最小：67KB（阑折叠）
  - 最大：117KB（折叠屏）
- 步骤4：验证布局适配正确
- 总结：截图尺寸对比完成，布局适配正确

---

### 测试场景 34：多设备报告生成

**提示词**：
```
生成包含四设备信息的验证报告
```

**预期输出**：
- 步骤1：汇总四设备验证结果
- 步骤2：创建验证报告 Markdown 文件
- 步骤3：报告内容包括：
  - 项目信息（bundleName、构建产物）
  - 设备验证汇总表（4台设备）
  - 详细验证结果（每个设备的测试结果）
  - HarmonyOS 特有验证项（布局适配、折叠屏适配）
  - 截图尺寸对比分析
  - MCP工具 vs 批处理+hdc对比
  - 交互式验证流程验证
  - 验证结论和建议
- 步骤4：保存报告文件（505行, 17KB）
- 总结：验证报告生成成功

---

## 八、批处理+hdc验证测试 ✅

### 测试场景 35：批处理+hdc完整验证流程

**提示词**：
```
使用批处理文件和 hdc 命令完整验证折叠屏设备（不使用 MCP）
```

**预期输出**：
- 步骤1：创建模拟器（批处理文件）：
  ```bash
  # 创建批处理文件 scripts\create_foldable.bat
  @echo off
  cd /d "C:\Program Files\Huawei\DevEco Studio\tools\emulator"
  Emulator.exe -create "Foldable Test" -deviceType Foldable -osVersion "HarmonyOS 6.0.2(22)"
  pause
  
  # 执行批处理文件
  cmd.exe /c scripts\create_foldable.bat
  ```
- 步骤2：启动模拟器（批处理文件）：
  ```bash
  # 创建启动批处理文件 scripts\start_foldable_test.bat
  @echo off
  cd /d "C:\Program Files\Huawei\DevEco Studio\tools\emulator"
  Emulator.exe -start "Foldable Test"
  pause
  
  # 执行批处理文件
  cmd.exe /c scripts\start_foldable_test.bat &
  ```
- 步骤3：等待连接（30秒）
- 步骤4：检查设备连接：`hdc list targets` → 127.0.0.1:5561
- 步骤5：安装应用（hdc）：
  ```bash
  hdc -t 127.0.0.1:5561 install -r entry-default-unsigned.hap
  ```
- 步骤6：启动应用（hdc）：
  ```bash
  hdc -t 127.0.0.1:5561 shell aa start -a EntryAbility -b com.example.myapplication
  ```
- 步骤7：截图验证（hdc）：
  ```bash
  hdc -t 127.0.0.1:5561 shell snapshot_display -f /data/local/tmp/test.jpeg
  hdc -t 127.0.0.1:5561 file recv /data/local/tmp/test.jpeg screenshots/test.jpeg
  ```
- 步骤8：UI树获取（hdc）：
  ```bash
  hdc -t 127.0.0.1:5561 shell uitest dumpLayout -p /data/local/tmp/layout.txt
  hdc -t 127.0.0.1:5561 file recv /data/local/tmp/layout.txt screenshots/layout.txt
  ```
- 步骤9：日志收集（hdc）：
  ```bash
  hdc -t 127.0.0.1:5561 shell hilog -x -n 500 > logs/hilog.txt
  ```
- 步骤10：验证完成提示（Question 工具）
- 步骤11：用户选择结束
- 步骤12：生成验证报告
- 总结：批处理+hdc验证完成（全功能，不使用 MCP）

---

## 九、边界条件和错误处理测试

### 测试场景 36：设备未连接错误处理

**提示词**：
```
设备连接失败时的错误处理
```

**预期输出**：
- 步骤1：执行 `hdc list targets`
- 步骤2：检查输出为 `[Empty]`
- 步骤3：提示用户启动模拟器：
  ```
  未检测到已连接设备。请先启动模拟器：
  
  方式1：使用批处理文件启动
  方式2：使用 DevEco Studio 界面启动
  
  启动后将继续验证流程。
  ```
- 步骤4：等待用户启动设备
- 步骤5：再次检查连接
- 总结：设备未连接错误正确处理

---

### 测试场景 37：Beta版本启动失败

**提示词**：
```
Beta版本模拟器启动失败的错误处理
```

**预期输出**：
- 步骤1：尝试启动 Beta 版本模拟器
- 步骤2：检测启动失败错误
- 步骤3：提示用户：
  ```
  Beta版本镜像无法通过命令行启动。
  
  解决方案：
  1. 使用 DevEco Studio 界面启动 Beta 版本模拟器
  2. 创建 Release 版本模拟器（HarmonyOS 6.0.2(22)）
  
  请选择解决方案后继续验证。
  ```
- 步骤4：等待用户处理
- 总结：Beta版本错误正确处理

---

### 测试场景 38：截图黑屏错误处理

**提示词**：
```
截图黑屏时的错误处理
```

**预期输出**：
- 步骤1：执行截图命令
- 步骤2：检查截图是否黑屏
- 步骤3：如果黑屏，提示用户：
  ```
  截图显示为黑屏。可能原因：
  1. 应用禁用截图功能（银行/支付类应用）
  2. 应用未完全启动
  
  替代方案：使用 UI 元素树进行验证
  ```
- 步骤4：自动切换到 UI 树验证
- 步骤5：获取 UI 树替代截图
- 总结：截图黑屏错误正确处理，使用 UI 树替代

---

### 测试场景 39：日志乱码错误处理

**提示词**：
```
真机日志乱码的解析处理
```

**预期输出**：
- 步骤1：导出真机日志文件（.zip 格式）
- 步骤2：检查日志内容是否乱码
- 步骤3：如果乱码，提示用户：
  ```
  真机日志为加密格式（乱码）。
  
  解决方案：
  1. 使用 hilogtool 工具解析
  2. 配合字典文件解密
  
  模拟器日志为明文格式，可直接读取。
  ```
- 步骤4：使用 hilogtool 解析（如果可用）
- 总结：日志乱码错误正确处理

---

### 测试场景 40：无效用户输入处理

**提示词**：
```
用户输入无效选项时的错误处理
```

**预期输出**：
- 步骤1：用户输入无效选项（如 "abc"、"123"）
- 步骤2：提示用户输入无效：
  ```
  输入无效。请选择以下选项之一：
  - yes 或 y：继续验证下一个设备
  - no 或 n：结束验证，生成报告
  - skip 或 s：跳过当前设备
  
  请重新选择：
  ```
- 步骤3：重新提示用户选择
- 步骤4：循环直到输入有效
- 总结：无效输入正确处理，不会崩溃

---

## 十、完整验证流程测试

### 测试场景 41：单设备完整验证流程

**提示词**：
```
验证 MyApplication3 单设备（手机）完整流程
```

**预期输出**：
- 步骤1：启动模拟器（批处理文件）
- 步骤2：等待连接（30秒）
- 步骤3：安装应用（hdc install）
- 步骤4：启动应用（hdc shell aa start）
- 步骤5：截图验证（hdc snapshot_display + file recv）
- 步骤6：UI树获取（hdc uitest dumpLayout + file recv）
- 步骤7：日志收集（hdc shell hilog）
- 步骤8：验证完成提示（Question 工具）
- 步骤9：用户选择结束
- 步骤10：生成验证报告
- 总结：单设备完整验证流程完成

---

### 测试场景 42：多设备完整验证流程（综合测试） ✅

**提示词**：
```
验证 MyApplication3 四设备完整流程，包含交互式验证和批处理+hdc验证方式
```

**预期输出**：
- **阶段1：设备1验证（手机）**
  - 启动 Pura 9022
  - 安装应用 ✅
  - 启动应用 ✅
  - 截图验证：1320x2856, 86KB ✅
  - UI树获取：30KB ✅
  - 日志收集：7.8MB ✅
  - 验证完成提示 → 用户选择 "yes"

- **阶段2：设备2验证（折叠屏 Mate X7）**
  - 启动 Mate X7
  - 安装应用 ✅
  - 启动应用 ✅
  - 截图验证：2210x2416, 113KB ✅
  - UI树获取：33KB ✅
  - 日志收集：781KB ✅
  - 验证完成提示 → 用户选择 "创建WideFold并验证"

- **阶段3：设备3验证（阑折叠）**
  - 创建 WideFold Test 模拟器 ✅
  - 启动 WideFold Test
  - 安装应用 ✅
  - 启动应用 ✅
  - 截图验证：1320x2120, 67KB ✅
  - UI树获取：28KB ✅
  - 日志收集 ✅
  - 验证完成提示 → 用户选择 "创建Foldable并验证（批处理+hdc）"

- **阶段4：设备4验证（折叠屏 Foldable Test）** ✨批处理+hdc验证
  - 创建 Foldable Test（批处理文件）✅
  - 启动 Foldable Test（批处理文件）✅
  - 安装应用（hdc 命令）✅
  - 启动应用（hdc 命令）✅
  - 截图验证（hdc 命令）：2224x2496, 117KB ✅
  - UI树获取（hdc 命令）：60KB ✅
  - 日志收集（hdc 命令）：798KB ✅
  - 验证完成提示 → 用户选择 "结束验证"

- **阶段5：生成验证报告**
  - 汇总四设备验证结果 ✅
  - 生成验证报告（505行, 17KB）✅
  - 包含设备信息、验证结果、截图对比、验证结论 ✅

- 总结：四设备完整验证流程完成（包含MCP工具和批处理+hdc两种验证方式）

---

## 附录：测试执行记录模板

```markdown
# Test Execution Record

## Test Date: YYYY-MM-DD
## Test Scenario: [测试场景编号]
## Prompt: [提示词]

## Execution Steps:
- [ ] 步骤1：[描述]
- [ ] 步骤2：[描述]
- [ ] 步骤3：[描述]
...

## Actual Output:
- 步骤1输出：[实际输出]
- 步骤2输出：[实际输出]
- 步骤3输出：[实际输出]
...

## Expected Output:
- [预期输出描述]

## Result:
- ✅ PASS / ❌ FAIL

## Comments:
- [备注信息]
```

---

## 更新记录

| 版本 | 日期 | 说明 |
|------|------|------|
| v1.0 | 2026-05-07 | 基于 MyApplication3 多设备验证实战经验创建初始测试提示词 |

---

## 相关文档

- [test-scene-cases.md](./test-scene-cases.md) - 场景化命令测试用例
- [README.md](./README.md) - 测试用例说明
- [../../SKILL.md](../../SKILL.md) - deveco-studio-verify Skill 文档