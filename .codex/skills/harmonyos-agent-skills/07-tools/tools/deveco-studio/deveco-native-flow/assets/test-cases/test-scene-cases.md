# HarmonyOS Native Flow 场景化测试用例集合

本文档包含 deveco-native-flow 流水线的场景化测试用例，每个用例包含命令输入和期望的执行结果。

---

## 一、初始化阶段测试（Step 0）

### 1.1 项目检测测试

#### 用例1：检测 HarmonyOS 项目
**场景描述**：测试检测 HarmonyOS 项目类型和模块结构

**前置条件**：
- 项目目录存在 `build-profile.json5`
- 项目为 HarmonyOS 空白模板应用

**操作步骤**：
1. 读取项目根目录文件列表
2. 检查 `build-profile.json5` 是否存在
3. 读取 `build-profile.json5` 内容
4. 解析模块配置（modules 字段）
5. 确定平台类型为 HarmonyOS

**期望结果**：
- 正确识别为 HarmonyOS 项目
- 识别模块名称（如 entry）
- 识别产品配置（如 default）
- 记录项目路径和 SDK 版本信息

---

#### 用例2：检测多平台项目（Android/iOS/HarmonyOS）
**场景描述**：测试检测多平台项目类型

**前置条件**：
- 项目同时包含 HarmonyOS 和 Android 特征文件
- 项目为跨平台项目

**操作步骤**：
1. 检查 `build-profile.json5`（HarmonyOS）
2. 检查 `build.gradle.kts`（Android）
3. 检查 `Podfile`（iOS）
4. 识别所有存在的平台类型
5. 记录各平台的项目路径

**期望结果**：
- 正确识别多个平台
- 各平台路径正确记录
- 状态文件记录所有平台信息

---

### 1.2 初始化脚本执行测试

#### 用例3：Windows 环境初始化
**场景描述**：测试 Windows 环境下执行初始化脚本

**命令输入**：
```powershell
powershell -ExecutionPolicy Bypass -File "scripts/init.ps1" "C:\project\MyApp"
```

**期望结果**：
- 初始化脚本成功执行
- 生成 `.deveco-flow/rules.md` 配置文件
- 生成 `.claude/CLAUDE.md` Claude Code 配置
- 生成 `.cursor/rules/deveco-flow.mdc` Cursor 配置
- 生成 `.windsurfrules` Windsurf 配置
- 输出项目路径、Skill 路径、平台信息

---

#### 用例4：检测已有初始化配置
**场景描述**：测试检测已有初始化配置时的处理

**前置条件**：
- `.deveco-flow/rules.md` 已存在

**操作步骤**：
1. 检查 `.deveco-flow/rules.md` 是否存在
2. 存在则跳过初始化脚本执行
3. 继续执行后续流程

**期望结果**：
- 不重复执行初始化脚本
- 直接进入下一阶段
- 输出"初始化已完成，继续执行"

---

### 1.3 状态管理测试

#### 用例5：创建新需求
**场景描述**：测试创建新的需求并初始化状态

**命令输入**：
```
/deveco-native-flow "开发图片压缩应用"
```

**期望结果**：
- 创建 `.bundle-flow/image-compress-app/` 目录
- 生成 `state.json` 包含活跃需求 ID
- 需求状态为 "analyse"
- completed_phases 为空数组
- 记录项目根路径、平台列表、创建时间

---

#### 用例6：状态持久化验证
**场景描述**：测试状态文件的持久化和恢复

**操作步骤**：
1. 创建新需求并修改状态
2. 读取 `state.json` 验证内容
3. 模拟中断后重新读取
4. 验证状态可恢复

**期望结果**：
- state.json 正确写入磁盘
- 包含 active 字段指向活跃需求
- 包含 completed_phases 数组
- 重新读取可恢复完整状态

---

## 二、Analyse 阶段测试（需求分析）

### 2.1 需求澄清测试

#### 用例7：brain-storm 式迭代问询
**场景描述**：测试 brain-storm 式需求澄清流程

**操作步骤**：
1. 提示词："开发图片压缩应用"
2. 执行阶段 1 需求澄清：
   - 逐维度问询（核心目标、使用场景、交互方式、系统集成、异常处理、性能要求）
   - 每次只问一个问题
   - 优先使用选择题（AskUserQuestion 工具）
3. 用户回答后继续下一维度
4. 完成后输出需求摘要

**期望结果**：
- 逐个维度完成问询
- 使用 AskUserQuestion 工具展示选项
- 用户选择后继续下一问题
- 最终输出需求摘要（2-3句话）
- 包含成功标准和范围边界

---

#### 用例8：用户主动提供信息跳过问询
**场景描述**：测试用户已在描述中包含部分信息时的智能跳过

**操作步骤**：
1. 提示词："开发图片压缩应用，支持批量压缩，一键快速压缩"
2. 检测描述中已包含"批量压缩"和"一键快速压缩"
3. 跳过相应维度问询
4. 只问未覆盖的维度

**期望结果**：
- 智能跳过已覆盖的维度
- 不重复询问已有信息
- 减少问询轮次
- 输出需求摘要包含用户提供的信息

---

### 2.2 现有流程分析测试

#### 用例9：分析空白项目现有流程
**场景描述**：测试分析空白模板项目的现有流程

**前置条件**：
- 项目为 HarmonyOS 空白模板（Hello World）

**操作步骤**：
1. 执行阶段 2 现有流程分析
2. 读取项目代码文件：
   - `entry/src/main/ets/pages/Index.ets`
   - `entry/src/main/ets/entryability/EntryAbility.ets`
   - `entry/src/main/module.json5`
3. 梳理模块职责
4. 绘制现有流程图
5. 输出分析结果

**期望结果**：
- 正确识别现有模块（entry、EntryAbility、Index）
- 流程图显示空白应用流程
- 模块职责表格准确
- 标注"无业务数据流"

---

### 2.3 整体设计测试

#### 用例10：展示设计全景并等待确认
**场景描述**：测试整体设计的第一轮交互（设计全景）

**操作步骤**：
1. 执行阶段 3 整体设计第一阶段：
   - 优化目标（列出具体目标）
   - 目标架构图（绘制模块架构）
   - 目标交互图/流程图（绘制用户操作路径）
   - 数据流向（说明数据流转路径）
   - 前后台交互（如有）
2. 一次性展示所有内容
3. **停下来等待用户确认**

**期望结果**：
- 设计全景内容完整展示
- 包含架构图、流程图、数据流
- **停止并询问用户确认**
- 用户回复"ok"后继续下一轮

---

#### 用例11：技术选型逐个决策点
**场景描述**：测试整体设计的第二轮交互（技术选型）

**操作步骤**：
1. 用户确认设计全景后
2. 执行阶段 3 第二阶段（技术选型）：
   - 决策点1：压缩文件保存位置（新文件 vs 覆盖原图）
   - 使用 AskUserQuestion 展示选项 + 推荐
   - 等待用户选择
   - 决策点2：压缩质量控制（固定质量 vs 用户可调）
   - 等待用户选择
   - ... （所有决策点逐一展示）
3. 全部确认后输出技术选型汇总表

**期望结果**：
- 每个决策点单独展示
- 使用 AskUserQuestion 工具
- 等待用户选择后再进入下一个
- 最终输出技术选型汇总表

---

### 2.4 子任务拆分测试

#### 用例12：逐个子任务展示并确认
**场景描述**：测试子任务拆分的逐个展示流程

**操作步骤**：
1. 执行阶段 4 子任务拆分：
   - 子任务1：图片选择功能实现
   - 展示关联模块、交互图、数据流向、产出
   - **停下来等待用户确认**
   - 子任务2：图片压缩处理功能实现
   - 展示内容 + 等待确认
   - ... （逐个子任务）
2. 全部确认后展示依赖链总览

**期望结果**：
- 每个子任务单独展示
- 包含完整的子任务信息（模块、流程、产出）
- **每个子任务展示后停止等待确认**
- 用户回复"ok"后继续下一个
- 最终展示依赖链总览（DAG 图）

---

### 2.5 输出技术方案测试

#### 用例13：生成并持久化技术方案
**场景描述**：测试输出技术方案并持久化

**操作步骤**：
1. 完成阶段 1-5 后
2. 执行阶段 6 输出技术方案：
   - 生成计划 ID（kebab-case）
   - 输出完整技术方案到会话
   - 使用 AskUserQuestion 展示 4 个选项：
     - yes：方案无误，持久化
     - modify：部分内容需调整
     - supplement：缺少某些场景
     - no：方案方向有问题
3. 用户选择"yes"后持久化：
   - 写入 `tech-spec.md`
   - 写入 `metadata.json`（tech_spec_status: confirmed）
   - 更新 `state.json`（completed_phases 添加"analyse")

**期望结果**：
- tech-spec.md 正确写入磁盘
- metadata.json 包含正确状态
- state.json 更新完成阶段
- 使用 AskUserQuestion 工具（非文本输出选项）

---

#### 用例14：用户选择 modify 调整方案
**场景描述**：测试用户选择 modify 调整技术方案

**操作步骤**：
1. 用户选择"modify"
2. 用户描述需要调整的内容
3. 调整方案中相应章节
4. 重新输出完整方案
5. 再次使用 AskUserQuestion 展示 4 个选项

**期望结果**：
- 根据用户反馈调整方案
- 重新输出完整方案
- 再次等待确认

---

## 三、Plan 阶段测试（实施计划）

### 3.1 上下文恢复测试

#### 用例15：检测已有技术方案并进入精简模式
**场景描述**：测试检测已有技术方案时进入精简模式

**前置条件**：
- `tech-spec.md` 存在且 tech_spec_status: confirmed

**操作步骤**：
1. 执行 `/native-plan`
2. 读取 `state.json` 获取活跃需求 ID
3. 检查 `.bundle-flow/{id}/tech-spec.md` 是否存在
4. 检查 `metadata.json` 的 tech_spec_status
5. 确认 tech_spec_status 为"confirmed"
6. 进入精简模式

**期望结果**：
- 正确检测到技术方案
- 进入精简模式（引用 tech-spec，不重新分析）
- 输出"将基于技术方案进行端级细化（精简模式）"

---

### 3.2 端级架构设计测试

#### 用例16：细化 HarmonyOS 端内实现架构
**场景描述**：测试细化端内实现架构

**操作步骤**：
1. 加载 ArkTS 知识：
   - 读取 `references/lang-syntax/SKILL.md`
   - 根据需求涉及的 Kit 加载对应知识
2. 输出端内实现架构：
   - 模块架构图（文件树结构）
   - 数据流向（端内数据流）
   - 技术选型确认（引用 tech-spec）
3. 输出 ArkTS 规范约束清单

**期望结果**：
- 加载 ArkTS 核心约束
- 输出详细的文件树结构
- 包含具体的类/接口/方法定义
- 包含 ArkTS 规范约束检查清单

---

### 3.3 变更流程细化测试

#### 用例17：生成文件级变更清单
**场景描述**：测试从 tech-spec 子任务细化到文件级变更

**操作步骤**：
1. 读取 tech-spec 的子任务列表
2. 逐个子任务细化：
   - 子任务1 → 步骤 1.1, 1.2, 1.3
   - 展示每个步骤的：
     - 关联文件路径
     - 变更类型（新增/修改）
     - 变更内容（代码示例）
     - 依赖关系
     - 产出物
3. **每个步骤展示后等待用户确认**

**期望结果**：
- 子任务细化为多个步骤
- 每个步骤包含完整信息
- **逐个步骤展示并等待确认**
- 用户回复"ok"后继续下一个

---

### 3.4 输出实施计划测试

#### 用例18：生成并持久化实施计划
**场景描述**：测试输出实施计划并持久化

**操作步骤**：
1. 完成阶段 1-7 后
2. 执行阶段 8 输出实施计划：
   - 生成 `plan-harmony.md` 文件
   - 包含完整的实施计划内容
   - 使用 AskUserQuestion 展示 4 个选项
3. 用户选择"yes"后持久化：
   - 写入 `plan-harmony.md`
   - 更新 `metadata.json`（status: confirmed）
   - 更新 `state.json`（completed_phases 添加"plan")

**期望结果**：
- plan-harmony.md 正确写入
- 包含完整的变更清单、分阶段计划、风险评估
- metadata.json 更新状态
- state.json 更新完成阶段

---

## 四、Coding 阶段测试（编码实施）

### 4.1 依赖分析测试

#### 用例19：解析子任务 DAG 并拓扑排序
**场景描述**：测试解析子任务依赖关系并生成执行顺序

**前置条件**：
- plan-harmony.md 包含多个步骤
- 步骤间有依赖关系

**操作步骤**：
1. 执行 `/harmony-coding`
2. Phase 2 依赖分析：
   - 提取所有步骤的 ID、名称、依赖列表
   - 构建 DAG（有向无环图）
   - 拓扑排序生成执行顺序
   - 展示执行计划（标记已完成/待执行）

**期望结果**：
- 正确解析依赖关系
- 生成拓扑排序后的执行顺序
- 展示执行计划（包含步骤总数）
- 已完成的步骤标记为 ✅

---

### 4.2 知识库加载测试

#### 用例20：加载 ArkTS 知识和项目知识
**场景描述**：测试编码前加载所需知识

**操作步骤**：
1. Phase 3 知识库加载：
   - 读取 `lang-syntax/SKILL.md`（ArkTS 核心约束）
   - 根据需求涉及的功能加载 `kits_*` 知识
   - 采样项目现有代码风格（2-3 个文件）
2. 确认知识加载完成

**期望结果**：
- ArkTS 核心约束已加载
- 相关 Kit 知识已加载
- 现有代码风格已采样
- 后续编码遵循知识库规范

---

### 4.3 编码实施测试

#### 用例21：新增文件编码（Write 工具）
**场景描述**：测试新增文件的编码流程

**操作步骤**：
1. 执行步骤 1.1：创建 ImageCompressService.ets
2. Step A：读取上下文（plan 中的变更内容）
3. Step B：脑暴确认（展示设计方案）
4. Step C：编码（使用 Write 工具创建文件）
5. Step D：构建验证（调用 build-fix）
6. Step E：记录进度（更新 coding-progress.json）

**期望结果**：
- 文件成功创建
- 代码符合 ArkTS 规范（无 any/unknown、无解构赋值等）
- 构建验证通过（或记录失败）
- coding-progress.json 更新该步骤状态

---

#### 用例22：修改已有文件编码（Edit 工具）
**场景描述**：测试修改已有文件的编码流程

**前置条件**：
- Index.ets 文件已存在

**操作步骤**：
1. 执行步骤 1.2：重构主页面 UI
2. Step A：读取现有 Index.ets 内容
3. Step B：展示 diff 预览
4. Step C：编码（使用 Edit 工具修改文件）
5. Step D：构建验证
6. Step E：记录进度

**期望结果**：
- 文件成功修改
- Edit 工具先 Read 后 Edit
- 构建验证通过
- coding-progress.json 更新

---

### 4.4 编码进度恢复测试

#### 用例23：中断后恢复编码进度
**场景描述**：测试编码中断后的恢复机制

**前置条件**：
- coding-progress-harmony.json 存在
- 部分步骤已完成

**操作步骤**：
1. 执行 `/harmony-coding`
2. Phase 1 上下文恢复：
   - 读取 coding-progress-harmony.json
   - 检测已完成的步骤（status: completed）
   - 跳过已完成步骤
   - 从第一个 pending 步骤继续

**期望结果**：
- 正确检测已完成步骤
- 跳过已完成步骤
- 从断点继续执行
- 输出"从步骤 X 继续"

---

## 五、Build 阶段测试（构建验证）

### 5.1 编译构建测试

#### 用例24：使用 hvigorw 构建 HAP 包
**场景描述**：测试使用 hvigorw 构建 HarmonyOS HAP 包

**前置条件**：
- 项目代码已完成
- DEVECO_SDK_HOME 环境变量已设置

**命令输入**：
```bash
export DEVECO_SDK_HOME="C:/Program Files/Huawei/DevEco Studio/sdk"
node "C:/Program Files/Huawei/DevEco Studio/tools/node/node.exe" \
  "C:/Program Files/Huawei/DevEco Studio/tools/hvigor/bin/hvigorw.js" \
  --mode module -p module=entry@default assembleHap -p buildMode=debug --no-daemon
```

**期望结果**：
- hvigorw 成功执行
- ArkTS 编译通过（无错误）
- PackageHap 成功
- 输出"BUILD SUCCESSFUL"
- 生成 HAP 文件路径：`entry/build/default/outputs/default/entry-default-unsigned.hap`

---

#### 用例25：编译失败诊断和修复
**场景描述**：测试编译失败时的错误诊断和修复

**前置条件**：
- 编译输出包含 ArkTS 错误（如 any/unknown 类型）

**操作步骤**：
1. 解析编译错误输出
2. 按错误类型分组：
   - 类型错误（arkts-no-any-unknown）
   - API 错误（模块导入错误）
   - 属性错误（属性不存在）
3. 逐个修复：
   - Read 文件内容
   - Edit 修复错误
   - 重新构建验证
4. 重复直到通过

**期望结果**：
- 正确诊断错误类型
- 使用 Edit 工具修复
- 修复后重新构建
- 最终构建成功

---

### 5.2 构建产物验证测试

#### 用例26：验证 HAP 文件生成
**场景描述**：测试构建产物 HAP 文件的生成和验证

**操作步骤**：
1. 使用 Glob 查找生成的 HAP 文件：
   - `entry/build/**/*.hap`
2. 验证文件存在
3. 记录文件路径到 state.json

**期望结果**：
- 找到 HAP 文件
- 路径正确记录到 state.json
- 文件名为 entry-default-unsigned.hap

---

## 六、Verify 阶段测试（UI 验证）

### 6.1 应用启动测试

#### 用例27：使用 MCP 启动应用
**场景描述**：测试使用 MCP 工具启动应用

**前置条件**：
- 模拟器已运行（如 Pura 90）
- HAP 文件已生成

**操作步骤**：
1. 调用 codegenie-mcp_start_app 工具：
   - 不指定 hvd 参数，获取设备列表
   - 检测到"Pura 90"模拟器运行中
2. 使用指定设备启动：
   - hvd="Pura 90"
3. 等待应用安装和启动

**期望结果**：
- 检测到运行中的模拟器
- 应用成功安装
- 应用成功启动
- 输出"Application installed and started successfully"

---

### 6.2 UI 结构验证测试

#### 用例28：获取应用 UI 树
**场景描述**：测试获取应用 UI 结构

**操作步骤**：
1. 调用 codegenie-mcp_get_app_ui_tree 工具：
   - hvd="Pura 90"
   - mode="simple"
   - outputDirectory 指定保存路径
2. 读取生成的 UI dump 文件
3. 验证关键 UI 元素：
   - 标题 Text："图片压缩应用"
   - Button："选择图片"

**期望结果**：
- UI dump 文件成功生成
- 文件包含 UI 结构信息
- 检测到标题和按钮元素
- UINodeCount > 0

---

### 6.3 UI 操作验证测试

#### 用例29：点击按钮并截图验证
**场景描述**：测试点击 UI 元素并截图验证

**操作步骤**：
1. 截取初始界面：
   - 调用 codegenie-mcp_perform_ui_action：
   - actionType="screenshot"
   - localPath 指定保存路径
2. 点击"选择图片"按钮：
   - actionType="click"
   - x/y 坐标计算（基于 UI dump）
3. 等待 2 秒
4. 再次截图验证界面变化

**期望结果**：
- 截图成功保存到本地
- 点击操作成功执行
- 第二张截图文件大小变化（界面已变化）
- 日志中包含 picker 启动记录

---

### 6.4 日志验证测试

#### 用例30：获取应用日志验证功能
**场景描述**：测试获取应用日志验证功能执行

**操作步骤**：
1. 调用 codegenie-mcp_get_hilog_or_faultlog_recent 工具：
   - hvd="Pura 90"
   - bundle_name="com.example.myapplication3"
   - level="I"（Info 级别）
2. 解析日志内容：
   - 查找 Ability 生命周期日志
   - 查找 picker 启动日志
   - 查找功能执行日志

**期望结果**：
- 日志成功获取
- 包含应用启动日志
- 包含 PhotoViewPicker 启动日志：
  ```
  [picker] parse Photo SelectOption start
  [picker] modalPicker start
  ```

---

## 七、综合场景测试

### 7.1 完整流水线测试

#### 用例31：完整流水线执行（图片压缩应用）
**场景描述**：测试从初始化到验证的完整流水线

**前置条件**：
- 项目为 HarmonyOS 空白模板
- 模拟器已配置

**测试步骤**：
1. 初始化阶段：检测项目 + 执行 init.ps1
2. Analyse 阶段：需求澄清 → 技术方案 → 持久化
3. Plan 阶段：实施计划 → 持久化
4. Coding 阶段：编码 16 个步骤 → 构建验证
5. Build 阶段：构建 HAP 包 → 修复错误
6. Verify 阶段：启动应用 → UI 验证 → 日志验证

**期望结果**：
- 所有阶段顺序执行
- 每个阶段完成后更新 state.json
- 最终 state.json 包含 completed_phases: ["analyse", "plan", "coding", "build", "verify"]
- 应用成功运行在模拟器上

---

### 7.2 断点恢复测试

#### 用例32：Analyse 阶段中断后恢复
**场景描述**：测试 Analyse 阶段中断后的恢复

**前置条件**：
- tech-spec.md 存在但 status: draft
- metadata.json 存在

**操作步骤**：
1. 重新执行 `/native-analyse`
2. Phase 0 上下文恢复：
   - 检测 tech-spec.md 存在
   - 检测 tech_spec_status: draft
   - 提示用户选择：
     - continue：继续使用当前方案
     - discard：废弃并重新分析
     - modify：修改当前方案
3. 用户选择后执行相应操作

**期望结果**：
- 正确检测未完成方案
- 提示用户选择操作
- 根据选择执行相应流程

---

#### 用例33：Coding 阶段中断后恢复
**场景描述**：测试 Coding 阶段中断后的恢复

**前置条件**：
- coding-progress-harmony.json 存在
- 部分步骤已完成（如 1.1, 1.2）

**操作步骤**：
1. 重新执行 `/harmony-coding`
2. 读取 coding-progress-harmony.json
3. 检测已完成步骤（status: completed）
4. 从第一个 pending 步骤继续（如 1.3）

**期望结果**：
- 检测已完成步骤：1.1, 1.2
- 跳过已完成步骤
- 从步骤 1.3 继续
- 输出"从步骤 1.3 继续执行"

---

## 八、边界和错误测试

### 8.1 缺失条件测试

#### 用例34：缺少 state.json
**场景描述**：测试缺少 state.json 时的处理

**操作步骤**：
1. 检测 `.bundle-flow/state.json` 不存在
2. 提示用户先完成项目检测（Step 0）
3. 创建 state.json 并设置活跃需求
4. 然后继续执行

**期望结果**：
- 提示缺少 state.json
- 提示创建方法
- 建议先执行初始化

---

#### 用例35：缺少 tech-spec.md
**场景描述**：测试 Plan 阶段缺少 tech-spec.md 时的处理

**操作步骤**：
1. 执行 `/native-plan`
2. 检测 tech-spec.md 不存在
3. 进入完整模式（独立分析）
4. 按 plan 流程完整执行

**期望结果**：
- 提示缺少技术方案
- 进入完整模式
- 独立完成所有阶段

---

### 8.2 构建错误测试

#### 用例36：构建循环修复失败（护栏触发）
**场景描述**：测试连续 3 轮构建错误不减时的护栏机制

**操作步骤**：
1. 构建失败（如类型错误）
2. 修复错误重新构建
3. 错误数未减少
4. 再次修复重新构建
5. 错误数仍未减少
6. 触发护栏：暂停并请求用户介入

**期望结果**：
- 连续 3 轮错误不减后暂停
- 输出错误摘要
- 请求用户介入
- 不继续自动修复

---

### 8.3 设备连接失败测试

#### 用例37：模拟器未运行
**场景描述**：测试模拟器未运行时的处理

**操作步骤**：
1. 调用 codegenie-mcp_start_app
2. 未检测到运行中的模拟器
3. 提示用户启动模拟器
4. 或提示可用的未运行模拟器列表

**期望结果**：
- 提示未检测到运行中的模拟器
- 列出可用的模拟器实例（未运行）
- 建议用户启动模拟器

---

## 注意事项

1. **分阶段测试**：
   - 每个阶段可独立测试
   - 测试用例按阶段分组
   - 便于分步验证功能

2. **上下文依赖**：
   - Plan 阶段依赖 tech-spec.md
   - Coding 阶段依赖 plan-harmony.md
   - Verify 阶段依赖 HAP 文件

3. **交互验证**：
   - 所有 AskUserQuestion 调用需验证
   - 确认工具被正确使用（非文本输出选项）
   - 等待用户确认后再继续

4. **状态持久化**：
   - 每个阶段完成后验证 state.json 更新
   - metadata.json 状态正确
   - coding-progress.json 进度正确

5. **构建环境**：
   - DEVECO_SDK_HOME 必须正确设置
   - hvigorw 路径需完整路径
   - 编译错误需逐步修复

---

## 相关工具

- **MCP 工具**：codegenie-mcp_start_app, codegenie-mcp_build_project, codegenie-mcp_get_app_ui_tree, codegenie-mcp_perform_ui_action, codegenie-mcp_get_hilog_or_faultlog_recent
- **hvigorw**：HarmonyOS 构建工具
- **hdc**：设备连接和调试工具
- **AskUserQuestion**：用户交互工具（脑暴式问询）