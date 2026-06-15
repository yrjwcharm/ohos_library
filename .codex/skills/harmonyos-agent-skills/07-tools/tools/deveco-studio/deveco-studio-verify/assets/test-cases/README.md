# HarmonyOS 设备验证测试用例

本目录包含 `deveco-studio-verify` skill 的测试用例，用于验证从设备选择到报告生成的完整验证流程。

---

## 测试用例文件

### 1. test-scene-cases.md
**场景化命令测试用例集合**，包含：
- 每个场景的详细操作步骤
- 期望的执行结果
- 前置条件和依赖关系
- 按验证阶段分组（设备管理、模拟器管理、应用操作、UI验证、日志收集、交互式验证）

### 2. test-prompts.md
**提示词测试用例集合**，包含：
- 用户输入的提示词
- 预期的输出步骤（详细流程）
- 边界条件和错误处理场景
- 多设备验证流程

---

## 测试用例覆盖范围

### 按验证阶段分组

| 阶段 | 用例数量 | 关键验证点 |
|------|---------|-----------|
| **设备管理** | 6 个 | 设备列表、设备连接、设备信息 |
| **模拟器管理** | 8 个 | 创建、启动、停止、删除、批处理文件 |
| **应用操作** | 4 个 | 安装、启动、停止、信息查询 |
| **UI验证** | 6 个 | 截图、UI树、UI操作、元素定位 |
| **日志收集** | 4 个 | 实时日志、日志文件、日志解析 |
| **交互式验证** | 5 个 | 验证完成提示、用户选择、继续验证 |
| **多设备验证** | 3 个 | 多设备启动、设备切换、报告生成 |
| **边界错误** | 4 个 | 设备未连接、Beta镜像、截图失败、日志乱码 |

**总计**：40 个场景化测试用例 + 35 个提示词测试场景

---

## 快速开始

### 方式 1：单设备验证测试（快速）

执行单设备（手机）验证流程：

```bash
验证 MyApplication3 单设备
```

**预期时间**：5-10 分钟

**验证内容**：
- ✅ 设备连接
- ✅ 应用安装
- ✅ 应用启动
- ✅ 截图验证
- ✅ UI树获取
- ✅ 日志收集
- ✅ 验证完成提示
- ✅ 用户选择继续验证或结束

---

### 方式 2：多设备验证测试（推荐）

执行完整的多设备验证流程：

```bash
验证 MyApplication3 多设备（手机 + 折叠屏）
```

**预期时间**：15-20 分钟

**验证内容**：
- ✅ 手机设备验证
- ✅ 验证完成提示（用户选择继续）
- ✅ 折叠屏设备验证
- ✅ 验证完成提示（用户选择结束）
- ✅ 生成多设备验证报告

---

### 方式 3：批处理+hdc验证测试（新功能）

使用批处理文件和 hdc 命令验证（不使用 MCP）：

```bash
使用批处理文件和 hdc 命令创建并验证折叠屏设备
```

**预期时间**：10-15 分钟

**验证内容**：
- ✅ 批处理文件创建模拟器
- ✅ 批处理文件启动模拟器
- ✅ hdc 安装应用
- ✅ hdc 启动应用
- ✅ hdc 截图验证
- ✅ hdc UI树获取
- ✅ hdc 日志收集
- ✅ 不使用 MCP 工具

---

### 方式 4：分阶段测试

推荐分阶段测试以快速验证关键功能：

#### 阶段 1：设备管理测试
```
列出已连接设备
列出已安装模拟器
获取设备类型和型号
```

#### 阶段 2：模拟器管理测试
```
创建折叠屏模拟器实例
使用批处理文件启动模拟器
验证模拟器连接状态
```

#### 阶段 3：应用操作测试
```
安装应用 HAP 文件
启动应用 EntryAbility
验证应用信息
```

#### 阶段 4：UI验证测试
```
截图验证应用界面
获取UI元素树
执行UI点击操作
```

#### 阶段 5：日志收集测试
```
收集实时日志
导出日志文件
解析日志内容
```

---

## 关键验证点

### 1. 交互式验证流程验证 ✅

所有设备验证完成后必须提示用户选择：

- ✅ 正确：使用 Question 工具提示用户选择继续或结束
- ❌ 错误：直接继续验证下一个设备

**验证位置**：
- test-scene-cases.md：用例 25-29
- test-prompts.md：测试场景 20-24

**提示格式**：
```
✅ 设备验证完成：[设备名称]

是否继续验证下一个设备？
- yes → 继续验证下一个设备
- no  → 结束验证，生成报告
- skip → 跳过当前设备

请选择：[yes/no/skip]
```

---

### 2. 批处理文件验证 ✅

Windows 上必须使用批处理文件启动模拟器：

**批处理文件格式**：
```bat
@echo off
cd /d "C:\Program Files\Huawei\DevEco Studio\tools\emulator"
Emulator.exe -start "Pura 9022"
pause
```

**验证位置**：
- test-scene-cases.md：用例 7-10
- test-prompts.md：测试场景 5-8

---

### 3. MCP 工具 vs hdc 命令对比验证

验证两种方式的差异：

| 工具 | 功能支持 | 使用场景 |
|------|---------|---------|
| **MCP工具** | 启动、安装、日志收集 | 快速验证 |
| **hdc命令** | 创建、启动、安装、截图、UI树、日志、文件传输 | 全功能验证 ✅ |

**验证位置**：
- test-scene-cases.md：用例 35-36
- test-prompts.md：测试场景 30-31

---

### 4. 多设备验证验证

验证多设备流程的正确性：

- 设备1验证完成 → 提示用户
- 用户选择 yes → 启动设备2
- 设备2验证完成 → 提示用户
- 用户选择 no → 生成报告

**验证位置**：
- test-scene-cases.md：用例 37-39
- test-prompts.md：测试场景 32-35

---

### 5. 验证报告生成验证

验证报告必须包含：

- ✅ 设备信息汇总
- ✅ 验证结果表格
- ✅ HarmonyOS 特有验证项
- ✅ 截图文件清单
- ✅ 日志文件清单
- ✅ 验证结论和建议

**验证位置**：
- test-scene-cases.md：用例 30
- test-prompts.md：测试场景 25

---

## 基于实际经验的设计

这些测试用例基于我们刚刚完成的**MyApplication3 多设备验证**实战经验：

### 实际执行步骤

1. ✅ **设备管理**：列出设备、启动模拟器
2. ✅ **应用安装**：安装 HAP 文件
3. ✅ **应用启动**：启动 EntryAbility
4. ✅ **截图验证**：1320x2856 (手机), 2210x2416 (折叠屏), 2224x2496 (折叠屏)
5. ✅ **UI树获取**：30KB (手机), 33KB (折叠屏), 60KB (折叠屏)
6. ✅ **日志收集**：7.8MB (手机), 798KB (折叠屏)
7. ✅ **交互式验证**：验证完每个设备后提示用户选择
8. ✅ **多设备验证**：验证 4 台设备（手机、2个折叠屏、阔折叠）
9. ✅ **批处理+hdc验证**：创建和验证折叠屏设备（不使用 MCP）

### 关键经验总结

**设备验证流程（实战）**：
- 步骤1：启动模拟器（批处理文件或 MCP）
- 步骤2：等待连接（30-60秒）
- 步骤3：安装应用（hdc install）
- 步骤4：启动应用（hdc shell aa start）
- 步骤5：截图验证（snapshot_display）
- 步骤6：UI树获取（uitest dumpLayout）
- 步骤7：日志收集（hilog）
- 步骤8：验证完成提示（Question 工具）
- 步骤9：用户选择继续或结束

**批处理文件验证（实战）**：
- 创建批处理文件：`scripts\create_foldable.bat`
- 执行批处理文件：`cmd.exe /c scripts\create_foldable.bat`
- 启动批处理文件：`scripts\start_foldable_test.bat`
- hdc命令验证：install、start、snapshot、dumpLayout、hilog

**多设备验证（实战）**：
- 设备1：Pura 9022 (手机) - 1320x2856, 86KB截图
- 设备2：Mate X7 (折叠屏) - 2210x2416, 113KB截图
- 设备3：WideFold Test (阔折叠) - 1320x2120, 67KB截图
- 设备4：Foldable Test (折叠屏) - 2224x2496, 117KB截图（批处理+hdc）

---

## 测试执行建议

### 推荐执行顺序

```
1. 单阶段测试（快速验证）：
   - 设备管理测试（6 个用例）
   - 模拟器管理测试（选 2-3 个关键用例）
   - UI验证测试（4 个用例）
   - 交互式验证测试（3 个用例）

2. 完整流程测试（全面验证）：
   - 测试场景 32：多设备验证流程
   - 时间：15-20 分钟

3. 新功能测试（批处理+hdc）：
   - 测试场景 30：批处理+hdc验证流程
   - 时间：10-15 分钟
```

### 测试环境要求

- ✅ HarmonyOS 应用项目
- ✅ DevEco Studio SDK 路径正确
- ✅ hdc 工具可执行
- ✅ emulator 工具可执行
- ✅ 模拟器已配置（至少一个 Phone 和一个 Foldable）
- ✅ MCP 工具可用（可选）
- ✅ 批处理脚本目录存在（可选）

---

## 测试报告模板

建议按以下格式记录测试结果：

```markdown
# Test Report: deveco-studio-verify

## Test Date: YYYY-MM-DD
## Test Environment:
- Project: [项目路径]
- Bundle Name: [应用包名]
- SDK Path: [SDK 路径]
- Emulators: [模拟器列表]
- MCP Tools: Available/Not Available
- hdc Tools: Available/Not Available

## Test Results:

### Phase 1: Device Management
- ✅ 用例 1：列出已连接设备
- ✅ 用例 2：列出已安装模拟器
- ✅ 用例 3：获取设备信息

### Phase 2: Emulator Management
- ✅ 用例 7：批处理文件启动模拟器
- ✅ 用例 8：验证模拟器连接

### Phase 3: Application Operation
- ✅ 用例 12：安装应用
- ✅ 用例 13：启动应用

### Phase 4: UI Verification
- ✅ 用例 15：截图验证
- ✅ 用例 16：UI树获取
- ✅ 用例 17：UI操作验证

### Phase 5: Interactive Verification
- ✅ 用例 25：验证完成提示
- ✅ 用例 26：用户选择处理

### Phase 6: Multi-Device Verification
- ✅ 用例 37：多设备验证流程
- ✅ 用例 38：设备切换验证
- ✅ 用例 39：报告生成

...

## Summary:
- Total Test Cases: 40
- Passed: XX
- Failed: XX
- Time Spent: XX minutes

## Key Findings:
- 批处理+hdc验证方式功能更全面
- 交互式验证流程用户体验良好
- 多设备验证支持动态添加设备

## Screenshots:
- phone_main.jpeg (86KB)
- fold_main.jpeg (113KB)
- widefold_main.jpeg (67KB)
- foldable_final.jpeg (117KB)

## Logs:
- phone_hilog.txt (7.8MB)
- fold_hilog.txt (781KB)
```

---

## 相关文档

- [test-scene-cases.md](./test-scene-cases.md) - 场景化命令测试用例
- [test-prompts.md](./test-prompts.md) - 提示词测试用例
- [../SKILL.md](../../SKILL.md) - deveco-studio-verify Skill 文档
- [../../references/interactive-verification.md](../../references/interactive-verification.md) - 交互式验证流程详细说明

---

## 更新记录

| 版本 | 日期 | 说明 |
|------|------|------|
| v1.0 | 2026-05-07 | 基于 MyApplication3 多设备验证实战经验创建初始测试用例 |

---

## 贡献指南

如需添加新的测试用例，请遵循以下规范：

1. **场景化用例格式**：
   - 场景描述
   - 前置条件
   - 操作步骤（编号列表）
   - 期望结果（具体验证点）

2. **提示词用例格式**：
   - 提示词（用户输入）
   - 预期输出（详细步骤）
   - 注意事项

3. **命名规范**：
   - 用例编号：`用例N`（场景化）
   - 测试场景：`测试场景 N`（提示词）

---

## 联系方式

如有问题或建议，请参考：
- [deveco-studio-verify Skill 文档](../../SKILL.md)
- [HarmonyOS 设备验证指南](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides)