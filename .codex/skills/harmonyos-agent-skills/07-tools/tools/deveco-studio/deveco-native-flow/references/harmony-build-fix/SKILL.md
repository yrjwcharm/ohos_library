---
name: harmony-build-fix
description: "Incrementally build and fix HarmonyOS project errors after code generation. Use when: (1) HarmonyOS ArkTS code was just generated and needs to compile, (2) user asks to build and fix HAR/HAP, run hvigorw and fix errors, (3) fix build errors in a HarmonyOS project. Triggers: build and fix, hvigorw assembleHar, assembleHap, fix build errors, 构建修复, 编译鸿蒙."
user-invocable: false
---

# HarmonyOS Build and Fix

通过 MCP 工具 `build_project`（后缀匹配，完整名称取决于 MCP server 注册名）增量构建并修复 HarmonyOS 项目的编译错误。

## 核心能力

### MCP 工具依赖

> **工具名称匹配规则**：下表中的工具名称为后缀标识，实际调用时需从可用工具列表中按后缀匹配完整名称。详见主 SKILL.md「MCP 前置条件」章节。

| 工具后缀 | 用途 | 状态 |
|---------|------|------|
| `init_project_path` | 初始化/更新项目根目录路径 | 必需（当传入 projectPath 时） |
| `build_project` | 项目构建 | 必需 |
| `check_ets_files` | ETS 文件静态语法检查 | 可选（优先使用） |
| `harmonyos_knowledge_search` | HarmonyOS 知识搜索 | 可选 |

### 错误诊断能力

```
harmony-build-fix (构建 + 诊断 + 修复)
       │
       ├─→ 构建失败
       │     │
       │     ├─→ MCP 可用 → check_ets_files
       │     │
       │     └─→ MCP 不可用 → 内置规则检查 (lang-syntax skill)
       │            │
       │            ├─→ 分析错误列表
       │            └─→ 执行修复
       │
       └─→ 修复错误 → 重新构建
```

### 构建目标

| 目标 | 说明 | 产物路径 |
|------|------|---------|
| `hap` | 生成单个 HAP 包（测试/调试） | `entry/build/default/outputs/default/entry-default-signed.hap` |
| `app` | 生成 APP 包（发布） | `build/outputs/default/{project-name}-default-signed.app` |

## 工作流程

### 流程图

```
开始
  │
  ├─→ 步骤0: 初始化项目路径（如果需要）
  │     └─→ 传入 projectPath → init_project_path
  │
  ├─→ 步骤1: 构建前预检查（可选，preCheck=true 时）
  │     ├─→ 执行静态检查（MCP 或内置规则）
  │     ├─→ 有错误 → 步骤2: 修复错误
  │     └─→ 无错误 → 步骤3: 构建项目
  │
  ├─→ 步骤2: 修复错误
  │     ├─→ 分析错误详情（从构建输出或静态检查结果）
  │     ├─→ 按优先级修复错误（P0 > P1 > P2）
  │     ├─→ 重新检查
  │     └─→ 返回步骤1 或步骤3
  │
  ├─→ 步骤3: 构建项目
  │     └─→ build_project
  │
  ├─→ 步骤4: 检查构建结果
  │     ├─→ 构建失败 → 分析错误 → 步骤5
  │     └─→ 构建成功 → 步骤6
  │
  ├─→ 步骤5: 处理构建错误
  │     ├─→ 编译错误 → 执行错误诊断 → 步骤2
  │     ├─→ 依赖问题 → 安装依赖 → 步骤3
  │     ├─→ 签名问题 → 提示手动修复 → 终止
  │     └─→ 其他错误 → 记录日志 → 终止
  │
  └─→ 步骤6: 输出构建产物
        └─→ 完成
```

### 详细步骤

#### 0. 初始化项目路径

如果传入了 `projectPath`，先调用 `init_project_path(project_path=projectPath)` 初始化项目路径。

#### 1. 构建前预检查（可选）

**触发条件**：`preCheck=true` 时执行

**操作步骤**：
1. 执行静态检查：
   - **MCP 可用**：调用 `check_ets_files`
   - **MCP 不可用**：使用内置规则检查（加载 `lang-syntax` skill）
2. 分析检查结果，获取错误列表
3. 如果存在错误，进入步骤2修复
4. 如果没有错误，直接进入步骤3构建

#### 2. 修复错误

**错误诊断流程**：

```
harmony-build-fix
       │
       ├─→ 执行错误诊断
       │     │
       │     ├─→ MCP 可用 → check_ets_files
       │     │
       │     └─→ 内置规则检查
       │           │
       │           ├─→ 加载 lang-syntax skill
       │           ├─→ 读取文件内容
       │           └─→ 按规则匹配检测
       │
       ├─→ 分析错误结果
       │     ├─→ 有错误 → 执行修复
       │     └─→ 无错误 → 继续
       │
       └─→ 修复后重新检查验证
```

**修复策略**：
- 按 P0 → P1 → P2 优先级修复
- 每次修复一个错误
- 修复后重新检查

#### 3. 构建项目

调用 MCP 工具构建项目：

```
build_project（按后缀从可用工具列表匹配）
参数:
  - build_intent: "LogVerification" (默认)
  - product: "default" (可选)
  - module: "entry@default" (可选)
  - clean: true/false (可选，是否清理构建)
```

#### 4. 检查构建结果

分析构建输出，判断是否成功。

#### 5. 处理构建错误

根据错误类型采取不同策略：

| 错误类型 | 检测特征 | 处理策略 |
|---------|---------|---------|
| **编译错误** | `ArkTS compiler error`、类型错误 | 执行错误诊断 → 步骤2 |
| **依赖问题** | `Cannot find module`、`ohpm` | 运行 `ohpm install` → 步骤3 |
| **资源问题** | `Resource not found` | 检查资源文件 → 手动修复提示 |
| **签名问题** | `Signing failed` | 提示手动配置签名 → 终止 |
| **配置问题** | `build-profile` 错误 | 提示检查配置 → 手动修复提示 |

**编译错误诊断方法**：

1. **MCP 模式**（优先）：
   ```
   check_ets_files（按后缀从可用工具列表匹配）
   参数: files - 相关 .ets 文件路径列表
   ```

2. **内置规则模式**（回退）：
   - 加载 `lang-syntax` skill 获取 ArkTS 规则
   - 使用 Read 工具读取相关文件
   - 按规则匹配检测违规项
   - 记录错误位置和修复建议

#### 6. 输出构建产物

构建成功后，输出产物路径。

## 循环修复机制

### 最大重试次数

为避免无限循环，设置最大重试次数为 5 次。

### 重试策略

1. **优先级修复**：每次循环按 P0 → P1 → P2 顺序修复
2. **增量修复**：每次只修复一个错误，避免引入新问题
3. **重新检查**：修复后重新执行错误诊断
4. **终止条件**：
   - 构建成功
   - 达到最大重试次数（5 次）
   - 遇到无法自动修复的错误（如签名问题、资源缺失）

## 输入参数

| 参数 | 类型 | 必选 | 默认值 | 说明 |
|------|------|------|--------|------|
| `buildTarget` | string | 否 | `"hap"` | 构建目标：`"hap"` 或 `"app"` |
| `buildMode` | string | 否 | `"debug"` | 构建模式：`"debug"` 或 `"release"` |
| `projectPath` | string | 否 | 当前目录 | 项目根目录路径。传入时会先调用 `init_project_path` 初始化 |
| `autoFix` | boolean | 否 | `true` | 是否自动修复错误 |
| `preCheck` | boolean | 否 | `false` | 是否在构建前进行静态检查 |
| `module` | string | 否 | `"entry@default"` | 构建模块 |
| `log_path` | string | 否 | - | 构建日志保存路径，指定后将所有构建日志保存到该路径下 |

## 常见构建错误

### ArkTS 类型错误

遵循 `lang-syntax` skill 规则：
- 禁止使用 `any` 或 `unknown` 类型
- 禁止使用 `Symbol()` API
- 禁止私有标识符 `#`，使用 `private` 关键字
- 禁止 `var`，使用 `let` 或 `const`
- 禁止 `Object` 或 `Record`，使用具体类型
- 禁止交叉类型，使用继承
- 禁止条件类型
- 禁止索引签名，使用 `Map` 或具体类型
- 禁止解构赋值
- 禁止 `in` 或 `delete` 操作符
- 禁止函数表达式，使用箭头函数或函数声明

### 模块导入错误

- 检查依赖是否在 `oh-package.json5` 中
- 如需要运行 `ohpm install`
- 验证导入路径正确性

### Hvigor 构建错误

- 检查 `hvigorfile.ts` 配置
- 验证 `build-profile.json5` 设置
- 确保 SDK 版本兼容性

## 使用示例

### 基本构建

```bash
# 构建 HAP 包
构建当前 HarmonyOS 项目的 HAP 包

# 构建 APP 包（发布）
构建 HarmonyOS 项目的 APP 包用于发布

# 构建指定模块
构建 entry 模块的 HAP 包
```

### 带预检查的构建

```bash
# 构建前先进行静态检查
构建项目，构建前先进行静态检查并修复错误
```

### 仅构建不修复

```bash
# 仅构建，不自动修复错误
构建项目但不要自动修复错误
```

### Release 模式构建

```bash
# Release 模式构建 APP 包
构建 APP 包，使用 release 模式
```

## 注意事项

1. **MCP 工具必需**：本 Skill 必须依赖 `build_project` 工具（按后缀匹配）
2. **错误诊断能力**：具备 MCP 检查和内置规则检查两种模式
3. **项目路径**：确保在正确的项目根目录执行构建
4. **代码提交**：构建前建议提交代码，以便回滚
5. **签名配置**：构建 APP 包需要提前配置签名证书
6. **重试上限**：最大重试 5 次，避免无限循环
7. **错误分类**：某些错误（签名、资源）无法自动修复，需手动处理

## 相关资源

- [lang-syntax Skill](../lang-syntax/SKILL.md) - ArkTS 语法规范和内置检查规则
- [DevEco MCP Server](https://github.com/open-deveco/deveco-toolbox)
- [HarmonyOS 构建指南](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-build-app)