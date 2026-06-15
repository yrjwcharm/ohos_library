---
name: native-build-fix
description: |
  原生多平台构建错误修复专家 - 增量修复 Android/iOS/HarmonyOS/KMP 项目的编译错误

  工作流程：
  1. 检测构建系统：根据平台参数或特征文件自动识别
  2. 执行构建并捕获错误：运行平台对应的构建命令
  3. 解析和分组错误：按 bundle → 文件路径 → 依赖层次排序
  4. 逐个修复：Read → Diagnose → Fix → Re-build → Next 循环
  5. 护栏机制：满足停止条件时暂停并报告
  6. 输出摘要：修复数、剩余错误、恢复建议

  使用场景：
  - 编码完成后构建失败，需要逐个修复编译错误
  - 依赖升级后出现类型不兼容或 API 变更
  - 跨平台共享层修改引发多平台编译失败

  <example>
  user: "/native-build-fix android"
  assistant: "检测到 Gradle 构建系统，执行 compileDebugKotlin，发现 3 个错误，开始逐个修复..."
  </example>

enabled: true
user-invocable: true
---

# Native Build Fix

增量修复原生多平台项目的构建错误，每次只修一个错误，确保安全可控。

## 核心职责

- 检测并适配多平台构建体系（Gradle / Xcode / hvigor / KMP）
- 解析构建错误输出，按优先级排序
- 逐个修复，每次修复后验证
- 区分平台特有错误和跨平台共享层错误
- 联动 `.bundle-flow/state.json` 辅助上下文定位（若存在）

## 阶段 1：检测构建系统

根据用户传入的平台参数或工作目录特征文件自动识别：

| 特征文件 | 平台 | 构建系统 |
|---------|------|---------|
| `build.gradle.kts` / `build.gradle` | Android | Gradle |
| `*.xcodeproj` / `Podfile` | iOS | Xcode |
| `build-profile.json5` / `oh-package.json5` | HarmonyOS | hvigor |
| `build.gradle.kts` + KMP 标志（`kotlin("multiplatform")`） | KMP | Gradle (KMP) |

### 操作清单

- [ ] 读取用户传入的平台参数
- [ ] 若未指定平台，扫描当前目录及父目录的特征文件
- [ ] 确认构建系统类型，输出检测结果
- [ ] 若无法识别，停止并提示用户手动指定平台

### 自动检测逻辑

```
1. 检查当前目录是否存在 build-profile.json5 或 oh-package.json5 → HarmonyOS
2. 检查当前目录是否存在 *.xcodeproj 或 Podfile → iOS
3. 检查当前目录是否存在 build.gradle.kts 或 build.gradle：
   a. 读取文件内容，若包含 kotlin("multiplatform") 或 KotlinMultiplatform → KMP
   b. 否则 → Android
4. 向上递归搜索父目录（最多 3 层），重复上述检测
5. 若仍未识别 → 提示用户手动指定
```

## 阶段 2：执行构建并捕获错误

根据检测到的平台执行对应构建命令：

| 平台 | 构建命令 | 说明 |
|------|---------|------|
| Android | `./gradlew compileDebugKotlin 2>&1` | 编译 Debug 变体的 Kotlin 代码 |
| iOS | `xcodebuild build -scheme <scheme> -destination 'generic/platform=iOS' 2>&1` | 构建 iOS 目标（scheme 解析见下方 iOS 特殊处理） |
| HarmonyOS | 先 `check_ets_files` lint 循环，再 `build_project` 构建循环（见下方 HarmonyOS 特殊处理） | lint + 构建均通过 DevEco MCP 工具执行，错误由 main agent 修复 |
| KMP | `./gradlew :<module>:compileKotlinIosArm64 :<module>:compileKotlinAndroid 2>&1` | 编译 KMP 共享层多平台目标（module 解析见下方 KMP 特殊处理） |

### HarmonyOS 特殊处理

当检测到 HarmonyOS 平台时，**不直接执行构建命令**，而是分两阶段处理：先通过 `check_ets_files` MCP 工具消除静态检查错误，再通过 `build_project` MCP 工具执行构建。**代码修复始终由 main agent（native-build-fix）自行完成**。

#### projectPath 确定

从项目根目录或 `.bundle-flow/state.json` 中的 `project_root` 获取项目路径：

```
1. 若存在 .bundle-flow/state.json 且包含 project_root 字段 → 使用该路径
2. 否则使用当前工作目录作为项目路径
```

> 确保路径指向包含 `build-profile.json5` 或 `oh-package.json5` 的项目根目录。

#### 阶段 A：Lint 检查-修复循环

使用 DevEco MCP 工具 `check_ets_files` 进行静态检查，在构建前消除 ArkTS 语法和类型约束问题：

```
1. 收集项目路径下的 .ets 文件列表
2. 调用 MCP 工具 check_ets_files，传入 files 参数（.ets 文件路径列表）
3. 若无错误 → 进入阶段 B（构建）
4. 若有错误 → check_ets_files 返回诊断信息
   a. main agent 逐个修复 lint 错误（阶段 4 的修复流程）
   b. 修复完成后，再次调用 check_ets_files 检查
   c. 重复直到无 lint 错误或触发护栏条件（阶段 5）
```

> **注意**：`check_ets_files` 仅收集错误不修改代码。修复由 main agent 完成。

#### 阶段 B：构建-修复循环

lint 通过后，使用 DevEco MCP 工具 `build_project` 执行构建：

调用 `build_project` MCP 工具，参数：
- `project_path`（通过 `init_project_path` 初始化）：项目根目录的绝对路径
- 可选 `module`：指定构建模块（如 `entry@default`），不传则构建整个 APP
- 可选 `build_intent`：构建意图，默认 `LogVerification`

> 在调用 `build_project` 前，需先调用 `init_project_path` MCP 工具初始化工程根目录路径。

```
1. 调用 init_project_path(project_path=项目根目录绝对路径)
2. 调用 build_project() 执行构建
3. 若构建成功 → 进入阶段 6 输出摘要
4. 若构建失败 → 从构建输出中解析错误列表
   a. main agent 解析错误（阶段 3）
   b. main agent 逐个修复（阶段 4）
   c. 修复完成后，再次调用 build_project 重新构建
   d. 重复直到构建成功或触发护栏条件（阶段 5）
```

#### 完整 HarmonyOS 流程图

```
HarmonyOS 构建修复
  │
  ├─→ 阶段 A: Lint 循环
  │     ├─→ check_ets_files(files=[...]) → 收集 lint 错误
  │     ├─→ main agent 修复 lint 错误
  │     ├─→ 再次 check_ets_files 验证
  │     └─→ lint 通过 ↓
  │
  ├─→ 阶段 B: 构建循环
  │     ├─→ init_project_path → build_project → 收集构建错误
  │     ├─→ main agent 修复构建错误
  │     ├─→ 再次 build_project 验证
  │     └─→ 构建通过 → 阶段 6 输出摘要
  │
  └─→ 任一阶段触发护栏 → 阶段 5 停止并报告
```

#### 降级方案

若 DevEco MCP 工具不可用（工具未注册 / 调用异常），降级处理：

1. 回退到直接执行 `hvigorw assembleHap --no-daemon 2>&1`
2. 按常规流程进入阶段 3 → 4 → 5

### iOS 特殊处理

- [ ] 通过 `xcodebuild -list` 获取可用的 scheme 列表
- [ ] 优先使用与当前目录名匹配的 scheme
- [ ] 若存在多个 scheme，选择非 Test/UI 后缀的主 scheme

### KMP 特殊处理

- [ ] 搜索项目中包含 `kotlin("multiplatform")` 或 `KotlinMultiplatform` 的 `build.gradle.kts` 文件
- [ ] 从该文件路径提取模块名（如 `shared/build.gradle.kts` → 模块名为 `shared`）
- [ ] 若存在多个 KMP 模块，优先选择包含 `commonMain` sourceSet 的模块

### 操作清单

- [ ] 定位项目根目录（构建命令需要在项目根目录执行）
- [ ] **HarmonyOS 平台**：从项目根目录或 `.bundle-flow/state.json` 的 `project_root` 获取项目路径。先调用 `check_ets_files` MCP 工具消除 lint 错误，再调用 `build_project` MCP 工具执行构建；若 MCP 工具不可用，降级到 `hvigorw assembleHap --no-daemon 2>&1`
- [ ] **其他平台**：执行构建命令，捕获完整的 stdout + stderr 输出
- [ ] 若构建成功（无错误），输出成功信息并结束
- [ ] 若构建失败，进入阶段 3

## 阶段 3：解析和分组错误

将构建错误输出解析为结构化列表，并按修复优先级排序。

### 排序规则

1. **按文件路径分组**：同一文件的错误放在一起
2. **按依赖层次排序**：先修复底层依赖（import/type 定义），再修复上层逻辑
3. **按错误严重度排序**：语法错误 > 类型错误 > 警告

### 操作清单

- [ ] 从构建输出中提取所有错误信息（文件路径、行号、错误描述）
- [ ] 按上述规则排序
- [ ] 统计错误总数，用于进度追踪
- [ ] 输出错误概览（文件数、错误数、错误类型分布）

## 阶段 4：逐个修复

对每个错误执行 Read → Diagnose → Fix → Re-build → Next 循环。

### 修复循环

对每个错误：

1. **Read**：使用 Read 工具查看错误上下文（错误行前后各 10 行）
2. **Diagnose**：结合平台常见错误表诊断根因
3. **Fix**：使用 Edit 工具进行最小化修改（只改必要的部分，不重构）
4. **Re-build**：重新执行构建命令验证修复效果
5. **Next**：若修复成功（该错误消失且未引入新错误），继续下一个

### 平台常见错误修复表

#### Android (Gradle / Kotlin)

| 错误类型 | 典型信息 | 修复方式 |
|---------|---------|---------|
| `Unresolved reference` | `Unresolved reference: xxx` | 检查 import 语句 / 添加 dependency |
| `Type mismatch` | `Type mismatch: inferred type is X but Y was expected` | 类型转换或修正泛型约束 |
| `Overload resolution ambiguity` | `Overload resolution ambiguity...` | 添加显式类型标注消除歧义 |
| `Cannot access 'X'` | `Cannot access 'X': it is internal in 'Y'` | 检查可见性修饰符 / 使用公开 API |

#### iOS (Xcode / Swift)

| 错误类型 | 典型信息 | 修复方式 |
|---------|---------|---------|
| `Cannot find type` | `Cannot find type 'X' in scope` | 检查 import / target membership |
| `No member` | `Value of type 'X' has no member 'Y'` | 检查 API 版本 / 拼写 |
| `Missing return` | `Missing return in a function expected to return 'X'` | 添加 return 语句 |
| `Cannot convert` | `Cannot convert value of type 'X' to expected argument type 'Y'` | 添加类型转换 |

#### HarmonyOS (hvigor / ArkTS)

> 详细 ArkTS 语法规则参考 harmony 插件的 `lang-syntax` skill。

| 错误类型 | 典型信息 | 修复方式 |
|---------|---------|---------|
| `Property does not exist` | `Property 'X' does not exist on type 'Y'` | 检查 ArkTS 类型定义 |
| `Cannot find module` | `Cannot find module '@ohos/xxx'` | 运行 `ohpm install` / 检查 oh-package.json5 |
| `ArkTS type error` | `No any/unknown types allowed` | 替换为具体类型声明 |
| `Import error` | `Cannot find name 'X'` | 添加缺失的 import 语句 |

#### KMP (Kotlin Multiplatform)

| 错误类型 | 典型信息 | 修复方式 |
|---------|---------|---------|
| `Expected/actual mismatch` | `Actual function 'X' has no corresponding expected declaration` | 同步 expect/actual 签名 |
| `Unresolved reference` | `Unresolved reference: xxx` | 检查 sourceSet 依赖配置 |
| `Platform-specific error` | `This declaration is only available on ...` | 添加平台条件编译 / 移至正确的 sourceSet |
| `Missing actual` | `Expected class 'X' has no actual declaration in module ...` | 在目标平台创建 actual 实现 |

### 操作清单

- [ ] 按排序顺序取出第一个错误
- [ ] Read：读取错误所在文件的上下文
- [ ] Diagnose：结合错误信息和上下文判断根因
- [ ] Fix：使用 Edit 工具做最小化修改
- [ ] Re-build：重新执行构建命令
- [ ] 检查修复效果：该错误是否消失？是否引入新错误？
- [ ] 若修复成功，继续下一个错误
- [ ] 若触发护栏条件，进入阶段 5

## 阶段 5：护栏机制

满足以下任一条件时，**立即停止修复并向用户报告**：

### 通用停止规则（复用原版）

1. **修复引入更多错误**：一次修复导致新增错误数 > 修复的错误数
2. **同一错误持续 3 次未解决**：可能是更深层次的问题
3. **需要架构变更**：修复超出了 "构建错误修复" 的范畴
4. **缺少新依赖**：错误需要在 manifest 文件（build.gradle / Podfile / oh-package.json5）中添加新依赖项时停止。若依赖已声明但未安装，直接运行对应安装命令（`ohpm install` / `pod install` 等）后继续

### 原生平台特有停止规则

5. **Native API 不兼容**：错误涉及 minSdk / deployment target / API Level 不满足，需要升级平台最低版本
6. **第三方 SDK 版本冲突**：多个依赖要求不同版本的同一 SDK，需要协调版本策略

### 停止时的输出

停止时向用户报告：
- 已修复的错误数和文件列表
- 触发停止的原因
- 建议的后续操作（如升级 minSdk、协调 SDK 版本、手动排查等）

## 阶段 6：输出摘要

修复完成后输出结构化摘要：

```markdown
## 构建修复摘要

### 修复结果
- 平台：<platform>
- 构建系统：<build-system>
- 初始错误数：<initial-count>
- 已修复：<fixed-count>
- 剩余错误：<remaining-count>
- 新引入错误：<new-count>（应为 0）

### 修复详情
| # | 文件 | 错误 | 修复方式 |
|---|------|------|---------|
| 1 | path/to/file.kt | Unresolved reference: xxx | 添加 import 语句 |
| ... | ... | ... | ... |

### 剩余错误（如有）
| # | 文件 | 错误 | 建议 |
|---|------|------|------|
| 1 | path/to/file.kt | ... | ... |

### 恢复建议
<根据平台输出对应的恢复策略>
```

## 平台特化的恢复策略

当自动修复无法解决问题时，建议用户尝试以下恢复策略：

| 场景 | Android | iOS | HarmonyOS |
|------|---------|-----|-----------|
| 清理缓存 | `./gradlew clean` | `xcodebuild clean` | `hvigorw clean` |
| 重装依赖 | `./gradlew --refresh-dependencies` | `pod install --repo-update` | `ohpm install` |
| 重置构建 | 删除 `build/` 目录 | 删除 `DerivedData` | 删除 `.preview/` |
| 重建索引 | Invalidate Caches (IDE) | Clean Build Folder (Xcode) | 重新 Sync (DevEco) |

## 与 `.bundle-flow/` 的联动

若当前项目存在 `.bundle-flow/` 目录：

- [ ] 读取 `.bundle-flow/state.json` 获取项目上下文信息（如 `project_root` 等路径信息）
- [ ] 若存在 `requirement_id`，读取 `.bundle-flow/{requirement_id}/plan-{platform}.md` 下的实施计划，了解当前阶段和预期变更
- [ ] 修复完成后不修改 `.bundle-flow/` 状态（由 flow 统一管理）

> 若 `.bundle-flow/` 不存在，直接在当前项目目录下工作，无需额外状态依赖。

## 核心原则

1. **只修复构建错误**：不重构、不加功能、不优化代码风格
2. **最小化修改**：每次修复只改必要的代码，保持 diff 最小
3. **逐个验证**：每修复一个错误就重新构建验证，确保不引入新问题
4. **安全优先**：遇到不确定的修复方案时停止并询问用户
5. **平台感知**：根据不同平台采用对应的修复策略和恢复手段

## 成功标准

- [ ] 正确检测到项目的构建系统和平台
- [ ] 构建命令执行成功，错误输出被完整捕获
- [ ] 错误按优先级排序且分组合理
- [ ] 每个错误修复后都通过重新构建验证
- [ ] 护栏机制在需要时正确触发
- [ ] 输出摘要清晰完整，包含修复详情和恢复建议