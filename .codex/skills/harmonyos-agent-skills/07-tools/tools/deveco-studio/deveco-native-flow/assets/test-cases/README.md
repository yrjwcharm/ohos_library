# HarmonyOS Native Flow 测试用例

本目录包含 `deveco-native-flow` 流水线的测试用例，用于验证从需求分析到应用验证的完整开发流程。

---

## 测试用例文件

### 1. test-scene-cases.md
**场景化命令测试用例集合**，包含：
- 每个场景的详细操作步骤
- 期望的执行结果
- 前置条件和依赖关系
- 按流水线阶段分组（初始化、Analyse、Plan、Coding、Build、Verify）

### 2. test-prompts.md
**提示词测试用例集合**，包含：
- 用户输入的提示词
- 预期的输出步骤（详细流程）
- 边界条件和错误处理场景
- 断点恢复测试

---

## 测试用例覆盖范围

### 按流水线阶段分组

| 阶段 | 用例数量 | 关键验证点 |
|------|---------|-----------|
| **初始化（Step 0）** | 6 个 | 项目检测、初始化脚本、状态管理 |
| **Analyse** | 14 个 | 需求澄清、技术方案、子任务拆分、持久化 |
| **Plan** | 6 个 | 端级架构、变更流程、实施计划、持久化 |
| **Coding** | 5 个 | 依赖分析、知识库加载、编码实施、进度恢复 |
| **Build** | 3 个 | hvigorw 构建、错误修复、产物验证 |
| **Verify** | 4 个 | 应用启动、UI 验证、操作验证、日志验证 |
| **综合场景** | 3 个 | 完整流水线、断点恢复、多需求切换 |
| **边界错误** | 3 个 | 缺失条件、构建循环、设备连接失败 |

**总计**：37 个场景化测试用例 + 36 个提示词测试场景

---

## 快速开始

### 方式 1：完整流水线测试

执行完整的图片压缩应用开发流程：

```bash
/deveco-native-flow "开发图片压缩应用"
```

**预期时间**：15-30 分钟（包含所有阶段）

---

### 方式 2：分阶段测试

由于完整流水线时间较长，推荐分阶段测试：

#### 阶段 1：初始化测试
```
# 测试场景 1：检测 HarmonyOS 项目类型
检测项目类型和平台

# 测试场景 2：初始化 deveco-flow
初始化 deveco-flow
```

#### 阶段 2：Analyse 测试
```
# 测试场景 4：需求澄清
开发图片压缩应用

# 测试场景 7：设计全景
继续

# 测试场景 10：持久化技术方案
ok
```

#### 阶段 3：Plan 测试
```
# 测试场景 12：进入 Plan 阶段
/harmony-plan

# 测试场景 17：持久化实施计划
ok
```

#### 阶段 4：Coding 测试
```
# 测试场景 18：进入 Coding 阶段
/harmony-coding

# 测试场景 21：批量编码
继续完成剩余编码步骤
```

#### 阶段 5：Build 测试
```
# 测试场景 22：构建 HAP
构建 HarmonyOS HAP 包
```

#### 阶段 6：Verify 测试
```
# 测试场景 25：启动应用
启动应用验证功能

# 测试场景 29：获取日志
获取应用日志验证 PhotoViewPicker 启动
```

---

## 关键验证点

### 1. AskUserQuestion 工具验证
所有脑暴式交互必须使用 AskUserQuestion 工具，禁止文本输出选项：

- ✅ 正确：使用 AskUserQuestion 展示选项
- ❌ 错误：直接输出 "请选择：1. xxx, 2. xxx" 然后自行继续

**验证位置**：
- test-scene-cases.md：用例 7, 8, 11, 13, 14
- test-prompts.md：测试场景 4, 8, 9, 10, 11

---

### 2. 状态持久化验证
每个阶段完成后检查状态文件：

```json
{
  "active": "image-compress-app",
  "requirements": {
    "image-compress-app": {
      "completed_phases": ["analyse", "plan", "coding", "build", "verify"]
    }
  }
}
```

**验证位置**：
- test-scene-cases.md：用例 5, 6, 13, 18, 26
- test-prompts.md：测试场景 10, 17, 21, 22, 30

---

### 3. 构建错误修复验证
编译错误需逐步修复，护栏机制需正确触发：

- 第 1 轮：修复部分错误
- 第 2 轮：修复部分错误
- 第 3 轮：错误数未减少 → 触发护栏暂停

**验证位置**：
- test-scene-cases.md：用例 25, 36
- test-prompts.md：测试场景 23, 24

---

### 4. MCP 工具验证
验证 MCP 工具的正确调用：

| 工具 | 验证点 |
|------|--------|
| start_app | 检测设备列表、指定设备启动 |
| get_app_ui_tree | UI dump 生成、元素解析 |
| perform_ui_action | 点击坐标计算、截图保存 |
| get_hilog_or_faultlog_recent | 日志获取、关键日志解析 |

**验证位置**：
- test-scene-cases.md：用例 27-30
- test-prompts.md：测试场景 25-29

---

### 5. 断点恢复验证
中断后可正确恢复：

| 阶段 | 恢复机制 |
|------|---------|
| Analyse | 检测 tech-spec.md 状态（draft/confirmed） |
| Plan | 检测 plan-harmony.md 状态 |
| Coding | 读取 coding-progress.json，跳过已完成步骤 |

**验证位置**：
- test-scene-cases.md：用例 32, 33
- test-prompts.md：测试场景 31, 32

---

## 基于实际经验的设计

这些测试用例基于我们刚刚完成的**图片压缩应用开发**实战经验：

### 实际执行步骤

1. ✅ **初始化**：执行 init.ps1，生成配置文件
2. ✅ **Analyse**：brain-storm 6 维度问询，生成 tech-spec.md
3. ✅ **Plan**：精简模式，生成 plan-harmony.md（16 个步骤）
4. ✅ **Coding**：编码 16 个步骤，修复 19 个编译错误
5. ✅ **Build**：hvigorw 构建，生成 HAP 文件
6. ✅ **Verify**：MCP 启动应用，UI 验证，日志验证

### 关键经验总结

**编译错误修复（实战）**：
- 错误 1-9：`any`/`unknown` 类型 → 使用 `BusinessError`
- 错误 10-14：导入方式错误 → 修正为默认导入
- 错误 15-17：API 路径错误 → 修正为 `@kit.ArkUI`
- 错误 18：Button 属性错误 → `disabled` → `enabled`

**构建环境配置（实战）**：
- DEVECO_SDK_HOME 必须正确设置
- hvigorw 路径需完整路径
- Windows 环境：使用 PowerShell 执行

**MCP 工具调用（实战）**：
- start_app：不指定 hvd → 列出设备 → 指定设备启动
- get_app_ui_tree：simple 模式 → 读取 UI dump → 解析元素
- perform_ui_action：截图 → 点击 → 再次截图
- get_hilog：bundle_name 过滤 → 解析关键日志

---

## 测试执行建议

### 推荐执行顺序

```
1. 单阶段测试（快速验证）：
   - 初始化测试（6 个用例）
   - Analyse 测试（选 2-3 个关键用例）
   - Build 测试（3 个用例）
   - Verify 测试（4 个用例）

2. 完整流水线测试（全面验证）：
   - 测试场景 33：完整流水线执行
   - 时间：15-30 分钟

3. 断点恢复测试（健壮性验证）：
   - 测试场景 31：Analyse 恢复
   - 测试场景 32：Coding 恢复
```

### 测试环境要求

- ✅ HarmonyOS 项目目录
- ✅ DevEco Studio SDK 路径正确
- ✅ hvigorw 工具可执行
- ✅ 模拟器已配置（如 Pura 90）
- ✅ MCP 工具可用

---

## 测试报告模板

建议按以下格式记录测试结果：

```markdown
# Test Report: deveco-native-flow

## Test Date: YYYY-MM-DD
## Test Environment:
- Project: [项目路径]
- SDK Path: [SDK 路径]
- Emulator: [模拟器名称]
- MCP Tools: Available/Not Available

## Test Results:

### Phase 1: Initialization
- ✅ 用例 1：项目检测
- ✅ 用例 2：初始化脚本
- ✅ 用例 3：状态管理

### Phase 2: Analyse
- ✅ 用例 7：需求澄清
- ✅ 用例 10：设计全景
- ✅ 用例 13：持久化技术方案

...

## Summary:
- Total Test Cases: 37
- Passed: XX
- Failed: XX
- Time Spent: XX minutes

## Key Findings:
- [发现的关键问题]
- [改进建议]
```

---

## 相关文档

- [test-scene-cases.md](./test-scene-cases.md) - 场景化命令测试用例
- [test-prompts.md](./test-prompts.md) - 提示词测试用例
- [../../SKILL.md](../../SKILL.md) - deveco-native-flow Skill 文档

---

## 更新记录

| 版本 | 日期 | 说明 |
|------|------|------|
| v1.0 | 2026-05-06 | 基于图片压缩应用实战经验创建初始测试用例 |

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
- [deveco-native-flow Skill 文档](../SKILL.md)
- [HarmonyOS 开发指南](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides)