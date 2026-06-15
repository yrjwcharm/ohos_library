# 测试提示词

本文档包含验证 deveco-native-flow skill 功能的测试提示词，每个测试场景包含提示词和预期输出步骤。

---

## 一、初始化阶段测试

### 测试场景 1：检测 HarmonyOS 项目类型

**提示词**：
```
检测项目类型和平台
```

**预期输出**：
- 步骤1：读取项目根目录文件列表
- 步骤2：检查 build-profile.json5 是否存在
- 步骤3：读取 build-profile.json5 内容
- 步骤4：解析模块配置（modules 字段）
- 步骤5：识别平台类型为 HarmonyOS
- 步骤6：检查 .deveco-flow/rules.md 是否存在
- 步骤7：如果不存在，执行初始化脚本 init.ps1
- 步骤8：记录项目路径、模块名称、SDK 版本
- 总结：输出项目类型（HarmonyOS）、模块列表、平台信息

---

### 测试场景 2：Windows 环境初始化

**提示词**：
```
初始化 deveco-flow
```

**预期输出**：
- 步骤1：检查 .deveco-flow/rules.md 是否存在
- 步骤2：如果不存在，执行初始化脚本：
  - Windows: powershell -ExecutionPolicy Bypass -File scripts/init.ps1 {project-root}
- 步骤3：等待脚本执行完成
- 步骤4：验证生成的配置文件：
  - .deveco-flow/rules.md
  - .claude/CLAUDE.md
  - .cursor/rules/deveco-flow.mdc
  - .windsurfrules
- 步骤5：输出初始化结果：
  - 项目路径
  - Skill 路径
  - 平台列表
- 总结：初始化完成，配置文件已生成

---

### 测试场景 3：创建新需求

**提示词**：
```
/deveco-native-flow "开发图片压缩应用"
```

**预期输出**：
- 步骤1：检查初始化状态（.deveco-flow/rules.md）
- 步骤2：创建需求目录：.bundle-flow/image-compress-app/
- 步骤3：生成 state.json：
  - active: "image-compress-app"
  - requirements.image-compress-app.description: "开发图片压缩应用"
  - current_phase: "analyse"
  - completed_phases: []
- 步骤4：输出需求创建成功
- 步骤5：进入 Analyse 阶段执行

---

## 二、Analyse 阶段测试

### 测试场景 4：需求澄清（brain-storm 式）

**提示词**：
```
开发图片压缩应用
```

**预期输出**：
- 步骤1：读取需求描述
- 步骤2：执行 brain-storm 式需求澄清：
  - 维度1：核心目标（使用 AskUserQuestion 展示选项）
    - 节省存储空间 / 分享优化 / 批量处理 / 专业编辑
    - 等待用户选择
  - 维度2：使用场景
    - 拍照后即时压缩 / 手动选择压缩 / 自动扫描压缩
    - 等待用户选择
  - 维度3：交互方式
    - 多步骤交互式 / 一键快速压缩 / 后台自动处理
    - 等待用户选择
  - 维度4：系统集成
    - 独立应用 / 集成相机 / 集成相册
    - 等待用户选择
  - 维度5：异常处理
    - 提示并重试 / 自动降级 / 跳过继续
    - 等待用户选择
  - 维度6：性能要求
    - 速度优先 / 质量优先 / 智能平衡
    - 等待用户选择
- 步骤3：输出需求摘要（2-3句话）
- 步骤4：输出成功标准（可量化、可验证）
- 步骤5：输出范围边界（包含/不包含）
- 总结：需求澄清完成，进入现有流程分析

---

### 测试场景 5：用户主动提供部分信息

**提示词**：
```
开发图片压缩应用，支持批量压缩，一键快速压缩，质量优先
```

**预期输出**：
- 步骤1：读取需求描述
- 步骤2：检测描述中已包含的信息：
  - "批量压缩" → 批量处理能力
  - "一键快速压缩" → 交互方式：一键快速压缩
  - "质量优先" → 性能要求：质量优先
- 步骤3：智能跳过已覆盖的维度：
  - 跳过维度2（使用场景）
  - 跳过维度3（交互方式）
  - 跳过维度6（性能要求）
- 步骤4：只问未覆盖的维度：
  - 维度1：核心目标
  - 维度4：系统集成
  - 维度5：异常处理
- 步骤5：输出需求摘要（包含用户提供的信息）
- 总结：智能跳过已完成，减少问询轮次

---

### 测试场景 6：现有流程分析（空白项目）

**提示词**：
```
分析项目现有流程
```

**预期输出**：
- 步骤1：读取项目代码文件：
  - entry/src/main/ets/pages/Index.ets
  - entry/src/main/ets/entryability/EntryAbility.ets
  - entry/src/main/module.json5
- 步骤2：梳理模块职责：
  - entry：应用入口模块
  - EntryAbility：应用生命周期管理
  - Index：主页面（空白 Hello World）
- 步骤3：绘制现有流程图：
  ```
  [应用启动] → [空白主页面显示] → [流程结束]
  ```
- 步骤4：输出"无业务数据流"
- 步骤5：输出模块职责表格
- 总结：现有流程分析完成，项目为空白模板

---

### 测试场景 7：整体设计 - 设计全景展示

**提示词**：
```
继续（需求澄清完成后）
```

**预期输出**：
- 步骤1：执行阶段 3 第一阶段（设计全景）：
  - 3.1 优化目标：
    - 提供一键式图片压缩体验
    - 集成相册快速访问
    - 速度优先的压缩策略
    - 友好的错误处理机制
    - 清晰的压缩结果展示
  - 3.2 目标架构图：
    - UI Layer（Index.ets）
    - Business Logic Layer（ImageCompressService）
    - HarmonyOS Kit Layer（ImageKit, FileKit, UI Kit）
  - 3.3 目标交互图/流程图：
    - 用户操作路径（选择→压缩→保存→展示）
  - 3.4 数据流向：
    - URI → ImageSource → PixelMap → ImagePacker → ArrayBuffer → 文件
  - 3.5 前后台交互：
    - 本地应用，无后台交互
- 步骤2：**停下来询问用户**：
  - "设计全景是否 OK？如有需要调整的部分，请告知。"
- 步骤3：等待用户回复
- 总结：设计全景已展示，等待用户确认

---

### 测试场景 8：整体设计 - 技术选型逐个决策

**提示词**：
```
ok（用户确认设计全景）
```

**预期输出**：
- 步骤1：执行阶段 3 第二阶段（技术选型）：
  - 决策点1：压缩文件保存位置
    - 使用 AskUserQuestion 展示：
      - A：保存为新文件（推荐）
      - B：覆盖原图
    - 等待用户选择
  - 决策点2：压缩质量控制
    - 使用 AskUserQuestion 展示：
      - A：固定质量参数（推荐）
      - B：用户可调整质量
      - C：智能动态调整
    - 等待用户选择
  - 决策点3：图片尺寸缩放策略
    - 使用 AskUserQuestion 展示：
      - A：保持原尺寸（推荐）
      - B：自动缩放
      - C：用户可选缩放
    - 等待用户选择
  - 决策点4：是否支持批量压缩
    - 使用 AskUserQuestion 展示：
      - A：支持批量压缩（推荐）
      - B：仅支持单张压缩
    - 等待用户选择
  - 决策点5：压缩失败后的处理方式
    - 使用 AskUserQuestion 展示：
      - A：弹窗提示 + 返回选择步骤（推荐）
      - B：自动跳过 + 继续流程
      - C：记录失败 + 批量汇报
    - 等待用户选择
- 步骤2：全部确认后输出技术选型汇总表
- 总结：技术选型完成，进入子任务拆分

---

### 测试场景 9：子任务拆分逐个展示

**提示词**：
```
继续（技术选型完成后）
```

**预期输出**：
- 步骤1：执行阶段 4 子任务拆分：
  - 子任务1：图片选择功能实现
    - 展示关联模块：Index.ets（UI层）
    - 展示交互流程图
    - 展示数据流向
    - 展示跨端通用契约
    - 展示各端差异提示
    - 展示产出物
    - **停下来询问**："这个子任务 OK 吗？需要调整/拆分/合并吗？"
    - 等待用户回复
  - 子任务2：图片压缩处理功能实现
    - 展示关联模块：ImageCompressService.ets
    - 展示前置输入：子任务1 的产出
    - 展示完整信息
    - **停下来询问**
    - 等待用户回复
  - 子任务3：压缩文件保存功能实现
    - 展示完整信息
    - **停下来询问**
    - 等待用户回复
  - 子任务4：压缩结果展示与错误处理功能实现
    - 展示完整信息
    - **停下来询问**
    - 等待用户回复
- 步骤2：全部确认后展示依赖链总览：
  ```
  子任务1 → 子任务2 → 子任务3 → 子任务4 → 完成
  ```
- 步骤3：询问用户确认整个依赖链
- 总结：子任务拆分完成，等待用户确认依赖链

---

### 测试场景 10：生成并持久化技术方案

**提示词**：
```
ok（用户确认子任务依赖链）
```

**预期输出**：
- 步骤1：执行阶段 6 输出技术方案：
  - 生成计划 ID：image-compress-app
  - 输出完整技术方案内容到会话（包含背景、现有流程、整体设计、子任务拆分、三板斧）
- 步骤2：使用 AskUserQuestion 展示 4 个选项：
  - yes：方案无误，持久化并进入下一步
  - modify：部分内容需调整
  - supplement：缺少某些场景或约束
  - no：方案方向有问题
- 步骤3：等待用户选择
- 步骤4：用户选择"yes"后：
  - 写入 tech-spec.md（完整技术方案）
  - 读取 metadata.json（如不存在则初始化）
  - 更新 metadata.json（tech_spec_status: confirmed）
  - 更新 state.json（completed_phases 添加"analyse")
- 总结：技术方案已持久化，提示执行 Plan 阶段

---

### 测试场景 11：用户选择 modify 调整方案

**提示词**：
```
modify，压缩质量控制部分需要调整
```

**预期输出**：
- 步骤1：接收用户反馈（"压缩质量控制部分需要调整"）
- 步骤2：brain-storm 式澄清调整内容：
  - 使用 AskUserQuestion 询问具体调整需求
- 步骤3：调整技术方案中相应章节（技术选型部分）
- 步骤4：重新输出完整技术方案
- 步骤5：再次使用 AskUserQuestion 展示 4 个选项
- 总结：方案已调整，等待用户再次确认

---

## 三、Plan 阶段测试

### 测试场景 12：进入 Plan 阶段

**提示词**：
```
/harmony-plan
```

**预期输出**：
- 步骤1：Phase 0 上下文恢复：
  - 读取 state.json 获取活跃需求 ID
  - 检测项目结构（扫描特征文件）
  - 检查 tech-spec.md 是否存在
  - 检查 metadata.json 的 tech_spec_status
- 步骤2：检测 tech-spec.md 存在且已确认（tech_spec_status: confirmed）
- 步骤3：输出"将基于技术方案进行端级细化（精简模式）"
- 步骤4：加载 HarmonyOS 知识：
  - 读取 lang-syntax/SKILL.md（ArkTS 核心约束）
  - 根据需求涉及的功能加载 kits_* 知识
- 步骤5：进入精简模式执行

---

### 测试场景 13：Plan 精简模式 - 需求重述

**提示词**：
```
继续（Plan 阶段开始）
```

**预期输出**：
- 步骤1：Phase 1 需求重述（精简模式）：
  - 引用 tech-spec 的"一.背景"章节
  - 补充 HarmonyOS 端级上下文：
    - 使用 PhotoViewPicker 集成系统相册
    - 使用 ImageKit（ImageSource、PixelMap、ImagePacker）
    - 使用 FileKit（fs）进行文件读写
    - 压缩文件保存到应用缓存目录（cacheDir）
- 步骤2：输出需求重述内容
- 总结：需求重述完成（精简模式），进入影响分析

---

### 测试场景 14：Plan 精简模式 - 影响分析

**提示词**：
```
继续（需求重述后）
```

**预期输出**：
- 步骤1：Phase 2 影响分析（精简模式，聚焦端级）：
  - 现有模块列表：
    - entry：应用入口模块
    - EntryAbility：应用生命周期管理
    - Index.ets：主页面（空白）
  - 新增模块/文件：
    - entry/src/main/ets/common/ImageCompressService.ets
  - 修改模块/文件：
    - entry/src/main/ets/pages/Index.ets（重构）
  - 影响范围表格
- 步骤2：输出影响分析内容
- 总结：影响分析完成，进入架构设计

---

### 测试场景 15：Plan 精简模式 - 端内架构设计

**提示词**：
```
继续（影响分析后）
```

**预期输出**：
- 步骤1：Phase 3 架构设计（端内实现架构）：
  - 3.1 模块架构图：
    - 文件树结构（Index.ets + ImageCompressService.ets）
    - 类/接口/方法定义
  - 3.2 数据流向：
    - URI → ImageSource → PixelMap → ImagePacker → ArrayBuffer → cacheDir
  - 3.3 技术选型确认（引用 tech-spec）
  - 3.4 ArkTS 规范约束：
    - 禁止 any/unknown，使用显式类型
    - 禁止解构赋值
    - 禁止私有标识符 #，使用 private
    - 所有 UI 组件使用 @Component + struct
    - 状态使用 @State 装饰器
- 步骤2：输出端内架构设计
- 总结：架构设计完成，进入变更流程

---

### 测试场景 16：Plan - 变更流程（文件级变更清单）

**提示词**：
```
继续（架构设计后）
```

**预期输出**：
- 步骤1：Phase 4 变更流程：
  - 步骤 1.1：创建 ImageCompressService 类框架
    - 展示关联文件路径
    - 展示变更类型（新增）
    - 展示变更内容（代码示例）
    - 展示依赖（无）
    - 展示产出（类框架）
    - **停下来询问**："这个子任务 OK 吗？"
    - 等待用户回复
  - 步骤 1.2：实现主页面 UI 框架
    - 展示完整信息
    - 展示依赖（步骤 1.1）
    - **停下来询问**
    - 等待用户回复
  - 步骤 1.3：实现图片选择逻辑
    - 展示完整信息
    - 展示依赖（步骤 1.2）
    - **停下来询问**
    - 等待用户回复
  - ... （逐个步骤展示，共 16 个步骤）
- 步骤2：全部步骤确认后展示分阶段实施计划：
  - 阶段1：基础框架搭建（步骤 1.1-1.3）
  - 阶段2：核心压缩功能（步骤 2.1-2.3）
  - 阶段3：文件保存与集成（步骤 2.4-3.3）
  - 阶段4：UI完善与错误处理（步骤 4.1-4.4）
- 总结：变更流程完成，等待用户确认整个计划

---

### 测试场景 17：Plan - 生成并持久化实施计划

**提示词**：
```
ok（用户确认实施计划）
```

**预期输出**：
- 步骤1：Phase 8 输出实施计划：
  - 生成 plan-harmony.md 文件
  - 包含完整内容（需求重述、影响分析、架构设计、变更流程、分阶段计划、风险评估、集成测试）
- 步骤2：使用 AskUserQuestion 展示 4 个选项：
  - yes：计划无误，开始编码实施
  - modify：部分步骤或架构需调整
  - supplement：某些风险或测试场景未覆盖
  - no：计划方向有问题
- 步骤3：等待用户选择
- 步骤4：用户选择"yes"后：
  - 写入 plan-harmony.md
  - 更新 metadata.json（status: confirmed）
  - 更新 state.json（completed_phases 添加"plan")
- 总结：实施计划已持久化，提示开始编码实施

---

## 四、Coding 阶段测试

### 测试场景 18：进入 Coding 阶段

**提示词**：
```
/harmony-coding
```

**预期输出**：
- 步骤1：Phase 1 上下文恢复：
  - 读取 state.json 获取活跃需求 ID
  - 读取 tech-spec.md
  - 读取 plan-harmony.md
  - 检测 coding-progress-harmony.json 是否存在
- 步骤2：检测无编码进度 → 全新开始
- 步骤3：Phase 2 依赖分析：
  - 提取 plan-harmony.md 中的所有步骤（16 个）
  - 构建 DAG（依赖图）
  - 拓扑排序生成执行顺序
  - 输出执行计划：
    ```
    编码执行顺序：
    1. ⬜ 步骤 1.1: 创建 ImageCompressService 类框架
    2. ⬜ 步骤 1.2: 实现主页面 UI 框架（依赖: 1.1）
    ...
    共 16 个子任务
    ```
- 步骤4：Phase 3 知识库加载：
  - 读取 lang-syntax/SKILL.md
  - 读取 kits_media/SKILL.md（图片处理）
  - 读取 kits_file/SKILL.md（文件操作）
  - 采样项目现有代码风格
- 总结：编码准备完成，开始逐步执行

---

### 测试场景 19：编码步骤执行 - 新增文件

**提示词**：
```
继续（Coding 阶段开始）
```

**预期输出**：
- 步骤1：执行步骤 1.1：创建 ImageCompressService 类框架
- 步骤2：Step A 读取上下文：
  - 读取 plan-harmony.md 中的步骤 1.1 变更内容
- 步骤3：Step B 脑暴确认：
  - 设计方案已在 plan 中明确，无需额外确认
- 步骤4：Step C 编码：
  - 创建目录：entry/src/main/ets/common/
  - 使用 Write 工具创建 ImageCompressService.ets
  - 写入类框架代码（接口定义 + 方法声明）
- 步骤5：Step D 构建验证：
  - 调用 hvigorw assembleHap 构建
  - 验证编译通过
- 步骤6：Step E 记录进度：
  - 创建 coding-progress-harmony.json
  - 标记步骤 1.1 为 completed
  - 记录 files_changed、build_status
- 总结：步骤 1.1 完成，进入步骤 1.2

---

### 测试场景 20：编码步骤执行 - 修改已有文件

**提示词**：
```
继续（步骤 1.1 完成后）
```

**预期输出**：
- 步骤1：执行步骤 1.2：实现主页面 UI 框架
- 步骤2：Step A 读取上下文：
  - 读取 plan-harmony.md 中的步骤 1.2 变更内容
  - 读取现有 Index.ets 内容
- 步骤3：Step B 脑暴确认：
  - 展示 diff 预览（重构 Hello World → 压缩应用主界面）
  - 使用 AskUserQuestion 确认方案
- 步骤4：Step C 编码：
  - 使用 Read 工具读取 Index.ets
  - 使用 Edit 工具修改文件（重构完整内容）
- 步骤5：Step D 构建验证：
  - 调用 hvigorw assembleHap 构建
  - 验证编译通过
- 步骤6：Step E 记录进度：
  - 更新 coding-progress-harmony.json
  - 标记步骤 1.2 为 completed
- 总结：步骤 1.2 完成，继续执行后续步骤

---

### 测试场景 21：批量编码剩余步骤

**提示词**：
```
继续完成剩余编码步骤
```

**预期输出**：
- 步骤1：快速执行步骤 1.3-4.3：
  - 步骤 1.3：补充图片选择逻辑方法
  - 步骤 2.1-2.3：实现 ImageCompressService.compress 方法
  - 步骤 3.1-3.3：实现 save 和 saveToAlbum 方法
  - 步骤 2.4-2.6：补充主页面调用逻辑
  - 步骤 4.1-4.3：补充错误处理和结果展示逻辑
- 步骤2：每个步骤执行：
  - Read 上下文
  - Edit 修改文件
  - 构建验证（可跳过，最后统一验证）
  - 更新进度
- 步骤3：最终统一构建验证：
  - 调用 hvigorw assembleHap
  - 验证所有代码编译通过
- 步骤4：更新 coding-progress-harmony.json（status: completed）
- 步骤5：更新 state.json（completed_phases 添加"coding")
- 总结：所有编码步骤完成，代码已通过编译

---

## 五、Build 阶段测试

### 测试场景 22：使用 hvigorw 构建 HAP

**提示词**：
```
构建 HarmonyOS HAP 包
```

**预期输出**：
- 步骤1：设置环境变量：
  - DEVECO_SDK_HOME="C:/Program Files/Huawei/DevEco Studio/sdk"
- 步骤2：执行构建命令：
  - node "C:/Program Files/Huawei/DevEco Studio/tools/node/node.exe" \
    "C:/Program Files/Huawei/DevEco Studio/tools/hvigor/bin/hvigorw.js" \
    --mode module -p module=entry@default assembleHap -p buildMode=debug --no-daemon
- 步骤3：解析构建输出：
  - CompileArkTS 状态
  - PackageHap 状态
  - SignHap 状态
- 步骤4：检查构建结果：
  - "BUILD SUCCESSFUL" → 构建成功
  - "BUILD FAILED" → 进入错误修复流程
- 步骤5：验证 HAP 文件生成：
  - Glob 查找：entry/build/**/*.hap
  - 记录文件路径
- 步骤6：更新 state.json（completed_phases 添加"build")
- 总结：构建成功，HAP 文件已生成

---

### 测试场景 23：构建失败 - 编译错误修复

**提示词**：
```
构建失败，修复编译错误
```

**预期输出**：
- 步骤1：解析编译错误输出：
  - 错误类型1：arkts-no-any-unknown（禁止 any/unknown）
  - 错误类型2：模块导入错误
  - 错误类型3：属性不存在错误
- 步骤2：按优先级修复错误：
  - P0：类型错误（Read → Edit → 修复）
  - P1：导入错误（修正导入方式）
  - P2：属性错误（修正 API 调用）
- 步骤3：修复示例：
  - 错误：`catch(err)` → 修复：`catch(err: BusinessError)`
  - 错误：`{ picker }` → 修复：`picker`（默认导入）
  - 错误：`@ohos.arkui` → 修复：`@kit.ArkUI`
- 步骤4：重新构建验证
- 步骤5：重复直到构建成功
- 步骤6：输出修复总结：
  - 修复数量
  - 剩余错误
  - 构建状态
- 总结：所有错误已修复，构建成功

---

### 测试场景 24：构建失败 - 循环修复失败（护栏触发）

**提示词**：
```
构建失败，连续 3 轮错误不减
```

**预期输出**：
- 步骤1：检测连续 3 轮构建错误数未减少
- 步骤2：触发护栏机制：暂停自动修复
- 步骤3：输出错误摘要：
  - 当前错误列表
  - 已尝试修复次数
  - 建议手动介入
- 步骤4：请求用户介入：
  - "连续 3 轮构建错误未减少，请手动检查代码或提供更多上下文"
- 总结：护栏机制触发，等待用户介入

---

## 六、Verify 阶段测试

### 测试场景 25：启动应用（使用 MCP）

**提示词**：
```
启动应用验证功能
```

**预期输出**：
- 步骤1：调用 codegenie-mcp_start_app 工具：
  - 不指定 hvd 参数
- 步骤2：获取可用设备列表：
  - 运行中的模拟器：Pura 90
- 步骤3：使用指定设备启动：
  - hvd="Pura 90"
  - 等待应用安装和启动
- 步骤4：解析启动结果：
  - "Application installed and started successfully on emulator"
  - Install Output: install bundle successfully
  - Start Output: start ability successfully
- 总结：应用已成功启动

---

### 测试场景 26：获取 UI 结构

**提示词**：
```
获取应用 UI 结构
```

**预期输出**：
- 步骤1：调用 codegenie-mcp_get_app_ui_tree 工具：
  - hvd="Pura 90"
  - mode="simple"
  - outputDirectory 指定保存路径
- 步骤2：等待 UI dump 生成
- 步骤3：读取生成的 UI dump 文件
- 步骤4：解析 UI 元素：
  - Text：图片压缩应用
  - Button：选择图片
  - clickable: 1
- 步骤5：验证 UI 结构正确：
  - UINodeCount > 0
  - 包含预期的 UI 元素
- 总结：UI 结构已获取，关键元素存在

---

### 测试场景 27：截图验证初始界面

**提示词**：
```
截图验证初始界面
```

**预期输出**：
- 步骤1：调用 codegenie-mcp_perform_ui_action 工具：
  - actionType="screenshot"
  - hvd="Pura 90"
  - localPath 指定保存路径
- 步骤2：等待截图完成
- 步骤3：验证截图文件：
  - 文件存在
  - 文件大小 > 100KB
- 步骤4：记录截图路径
- 总结：初始界面截图已保存

---

### 测试场景 28：点击按钮触发功能

**提示词**：
```
点击"选择图片"按钮
```

**预期输出**：
- 步骤1：计算点击坐标：
  - 基于 UI dump 中的 Button 位置
  - x: center of button width
  - y: center of button height
- 步骤2：调用 codegenie-mcp_perform_ui_action 工具：
  - actionType="click"
  - hvd="Pura 90"
  - x/y 坐标
- 步骤3：等待 2 秒（PhotoViewPicker 加载）
- 步骤4：再次截图验证界面变化
- 步骤5：验证文件大小变化（界面已变化）
- 总结：按钮点击成功，界面已变化

---

### 测试场景 29：获取应用日志验证功能

**提示词**：
```
获取应用日志验证 PhotoViewPicker 启动
```

**预期输出**：
- 步骤1：调用 codegenie-mcp_get_hilog_or_faultlog_recent 工具：
  - hvd="Pura 90"
  - bundle_name="com.example.myapplication3"
  - level="I"（Info 级别）
- 步骤2：获取应用日志内容
- 步骤3：解析关键日志：
  - Ability onCreate
  - Succeeded in loading the content
  - [picker] parse Photo SelectOption start
  - [picker] modalPicker start
- 步骤4：验证功能执行：
  - PhotoViewPicker 已成功启动（日志确认）
- 总结：日志已获取，功能执行正确

---

### 测试场景 30：更新状态完成验证

**提示词**：
```
验证完成，更新状态
```

**预期输出**：
- 步骤1：更新 state.json：
  - completed_phases 添加"verify"
  - current_phase: null（流水线完成）
- 步骤2：输出验证总结：
  - 应用启动成功
  - UI 结构正确
  - 功能触发成功（日志验证）
  - 截图已保存
- 步骤3：输出完整流水线总结：
  - 已完成阶段：analyse, plan, coding, build, verify
  - 变更文件清单
  - 构建状态
  - 验证结果
- 总结：图片压缩应用开发完成

---

## 七、断点恢复测试

### 测试场景 31：Analyse 阶段中断恢复

**提示词**：
```
恢复上次未完成的技术方案分析
```

**预期输出**：
- 步骤1：读取 state.json 获取活跃需求 ID
- 步骤2：检测 tech-spec.md 存在
- 步骤3：读取 metadata.json 检查 tech_spec_status：
  - draft：技术方案已生成但未确认
- 步骤4：输出恢复摘要：
  ```
  发现已有技术方案: 图片压缩应用
  - 技术方案状态: draft
  - 涉及平台: HarmonyOS
  
  选择操作:
  1. 继续使用当前技术方案 (continue)
  2. 废弃并重新分析 (discard)
  3. 修改当前技术方案 (modify)
  ```
- 步骤5：使用 AskUserQuestion 展示选项
- 步骤6：根据用户选择执行相应操作
- 总结：技术方案恢复成功

---

### 测试场景 32：Coding 阶段中断恢复

**提示词**：
```
恢复上次未完成的编码进度
```

**预期输出**：
- 步骤1：读取 coding-progress-harmony.json
- 步骤2：解析已完成的步骤：
  - 步骤 1.1, 1.2: status: completed
  - 步骤 1.3-4.4: status: pending
- 步骤3：跳过已完成步骤
- 步骤4：从第一个 pending 步骤继续：
  - 从步骤 1.3 开始执行
- 步骤5：输出恢复信息：
  ```
  检测到已完成的编码进度：
  - 已完成: 步骤 1.1, 1.2
  - 从步骤 1.3 继续执行
  ```
- 步骤6：继续执行编码流程
- 总结：编码进度恢复成功，继续执行

---

## 八、综合场景测试

### 测试场景 33：完整流水线执行（图片压缩应用）

**提示词**：
```
/deveco-native-flow "开发图片压缩应用"
```

**预期输出**：
- 初始化阶段：
  - 检测 HarmonyOS 项目
  - 执行 init.ps1
  - 创建需求目录和 state.json
- Analyse 阶段：
  - brain-storm 需求澄清（6 个维度）
  - 现有流程分析
  - 整体设计（设计全景 + 技术选型）
  - 子任务拆分（逐个展示）
  - 输出 tech-spec.md
- Plan 阶段：
  - 读取 tech-spec 进入精简模式
  - 端内架构设计
  - 变更流程细化（16 个步骤）
  - 输出 plan-harmony.md
- Coding 阶段：
  - 依赖分析和拓扑排序
  - 逐个步骤编码（Read → Edit → 构建）
  - 更新 coding-progress-harmony.json
- Build 阶段：
  - hvigorw assembleHap 构建
  - 错误修复（如有）
  - 生成 HAP 文件
- Verify 阶段：
  - MCP 启动应用
  - UI 结构验证
  - 点击按钮测试
  - 日志验证
  - 更新 state.json 完成
- 总结：完整流水线执行成功，应用已运行在模拟器上

---

### 测试场景 34：多需求切换

**提示词**：
```
切换到另一个需求：开发图片滤镜应用
```

**预期输出**：
- 步骤1：创建新需求目录：.bundle-flow/image-filter-app/
- 步骤2：更新 state.json：
  - active: "image-filter-app"
  - 添加新需求到 requirements
- 步骤3：输出切换成功
- 步骤4：提示用户可随时切换回旧需求
- 总结：需求切换成功，进入新需求流程

---

## 九、错误处理测试

### 测试场景 35：缺少 state.json

**提示词**：
```
执行 Analyse 阶段
```

**前置条件**：
- state.json 不存在

**预期输出**：
- 步骤1：检测 state.json 不存在
- 步骤2：报错提示：
  ```
  错误：缺少 state.json
  
  请先完成项目检测（Step 0）：
  - 创建需求目录：.bundle-flow/{requirement_id}/
  - 创建 state.json 并设置活跃需求 ID
  
  或使用命令创建新需求：
  /deveco-native-flow "需求描述"
  ```
- 步骤3：停止执行
- 总结：缺失条件检测成功，提示用户补充

---

### 测试场景 36：构建环境配置错误

**提示词**：
```
构建失败：DEVECO_SDK_HOME 配置错误
```

**预期输出**：
- 步骤1：解析构建错误：
  ```
  ERROR: 00303217 Configuration Error
  Error Message: Invalid value of 'DEVECO_SDK_HOME'
  ```
- 步骤2：识别环境变量问题
- 步骤3：检查 SDK 路径：
  - 检查 "C:/Program Files/Huawei/DevEco Studio/sdk" 是否存在
- 步骤4：重新设置环境变量：
  - export DEVECO_SDK_HOME="正确路径"
- 步骤5：重新构建
- 总结：环境变量问题已解决

---

## 注意事项

1. **分阶段测试**：
   - 每个测试场景可独立运行
   - 便于分步验证功能
   - 避免完整流水线执行时间长

2. **AskUserQuestion 工具验证**：
   - 所有脑暴式问询必须使用 AskUserQuestion 工具
   - 禁止直接在文本中输出选项后自行继续
   - 等待用户选择后再执行下一步

3. **状态持久化验证**：
   - 每个阶段完成后检查 state.json 更新
   - metadata.json 状态正确
   - coding-progress.json 进度正确

4. **构建验证**：
   - 编译错误需逐步修复
   - 连续 3 轮错误不减触发护栏
   - 最终确保构建成功

5. **MCP 工具验证**：
   - start_app：启动应用
   - get_app_ui_tree：获取 UI 结构
   - perform_ui_action：UI 操作和截图
   - get_hilog_or_faultlog_recent：日志获取

6. **断点恢复**：
   - 各阶段中断后可恢复
   - coding-progress.json 记录详细进度
   - 已完成步骤自动跳过

---

## 相关工具

- **MCP 工具**：codegenie-mcp_start_app, codegenie-mcp_build_project, codegenie-mcp_get_app_ui_tree, codegenie-mcp_perform_ui_action, codegenie-mcp_get_hilog_or_faultlog_recent
- **AskUserQuestion**：脑暴式交互工具
- **hvigorw**：HarmonyOS 构建工具
- **Write/Edit**：文件写入和修改工具
- **Glob/Read**：文件查找和读取工具