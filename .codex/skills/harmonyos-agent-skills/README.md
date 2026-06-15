# HarmonyOS Agent Skills

## 📋 项目简介

**HarmonyOS Agent Skills** 是一个专为 HarmonyOS 应用开发设计的 Agent Skills 集合。本项目整合了 HarmonyOS 应用开发全生命周期的最佳实践，为 AI 助手提供结构化的技能支持，覆盖从设计、开发、测试到发布的完整流程。

### 🎯 核心特性

- **🤖 AI 驱动**：为 AI 助手提供专业的 HarmonyOS 开发技能
- **📚 知识体系化**：结构化的参考文档和最佳实践
- **✅ 质量保障**：完整的测试用例和验收标准
- **🔄 持续演进**：跟随 HarmonyOS 版本持续更新

### 🚀 快速开始

```bash
# 克隆仓库
git clone https://github.com/your-org/harmonyos-agent-skills.git

# 查看技能列表
ls -la */

# 使用特定技能
# 在 AI 助手中引用对应的 SKILL.md 文件
```

***

## 📁 目录结构

```
harmonyos-agent-skills/
│
├── .hmos-skill-reviewer/             # Skill 审查工具
│   ├── SKILL.md                      # Skill 审查技能
│   ├── references/                   # 审查规则文档
│   ├── scripts/                      # 自动化审查脚本
│   └── assets/                       # 审查案例
│
├── 01-overview-and-learn/            # 学习资源（规划中）
│   └── [HarmonyOS 基础教程和文档]
│
├── 02-design/                        # 设计阶段
│   └── mobile/                       # 移动端设计
│       └── hmos-design-visual-mobile/  # HarmonyOS 移动端页面视觉还原 ✅
│
├── 03-solutions/                     # 解决方案库
│   ├── architecture/                 # 架构设计（规划中）
│   ├── HMOS-technologies/            # HarmonyOS 核心技术
│   │   ├── multi-device/             # 多设备开发
│   │   │   ├── hmos-multidevice-scenario-entry/         # 多设备总场景入口 ✅
│   │   │   ├── hmos-multidevice-avoid-areas/            # 多设备避让适配开发技能 ✅
│   │   │   ├── hmos-multidevice-fold-state/             # 多设备折展适配开发技能 ✅
│   │   │   ├── hmos-multidevice-hardware-access/        # 多设备硬件调用开发技能 ✅
│   │   │   ├── hmos-multidevice-interaction-methods/    # 多设备交互适配开发技能 ✅
│   │   │   ├── hmos-multidevice-natural-orientation/    # 多设备旋转适配开发技能 ✅
│   │   │   └── hmos-multidevice-screen-window-size/     # 多设备屏幕窗口适配开发技能 ✅
│   │   └── hopping-solution/               # 跨设备协作（规划中）
│   ├── feature/                      # 功能特性
│   │   ├── device-solutions/         # 设备解决方案（规划中）
│   │   └── industry-solutions/       # 行业解决方案（规划中）
│   └── quality/                      # 质量保障
│       ├── performance/              # 性能优化
│       │   └── hmos-perf-analysis/   # 性能分析（规划中）
│       ├── stability/                # 稳定性
│       │   │── hmos-apifault-analysis/  # api故障日志分析 ✅
│       │   |── hmos-appfreeze-analysis/  # 应用冻屏故障日志分析 ✅
│       │   |── hmos-jscrash-analysis/  # js崩溃故障日志分析 ✅
│       │   |── hmos-cppcrash-analysis/  # cpp崩溃故障日志分析 ✅
│       │   |── hmos-jsleak-analysis/  # js泄漏故障日志分析 ✅
│       │   └── hmos-memleak-analysis/  # 内存泄漏分析 ✅
│       ├── privacy-and-security/     # 隐私安全（规划中）
│       └── user-experience/          # 用户体验（规划中）
│
├── 04-development/                   # 开发阶段
│   ├── 01-application-framework/     # 应用框架
│   │   ├── ArkUI/                    # UI 框架
│   │   │   ├── hmos-arkui-knowledge-retriever/  # ArkUI 知识检索 ✅
│   │   │   ├── hmos-arkui-develop-skill/        # ArkUI 开发技能 ✅
│   │   │   ├── hmos-arkui-longtake-transition/  # ArkUI 开发技能 ✅
│   │   │   ├── hmos-arkui-mvvm-pattern/         # MVVM 架构模式 ✅
│   │   │   └── hmos-arkui-statemgt-migration/   # 状态管理迁移 ✅
│   │   ├── ArkTS/                    # ArkTS 语言
│   │   │   ├── hmos-arkts-deprecated-interface-checker/  # 废弃接口检查 ✅
│   │   │   ├── hmos-arkts-knowledge-retriever/           # 知识检索 ✅
│   │   │   └── hmos-arkts-syntax-checker/                # 语法检查 ✅
│   │   ├── ArkData-and-file/         # 数据存储和文件（规划中）
│   │   ├── ability/                  # 程序框架（规划中）
│   │   │   └── hmos-ability-insight-intent-generator/  # 意图装饰器生成 ✅
│   │   ├── ArkWeb/                   # Web 组件（规划中）
│   │   ├── atomic-service/           # 元服务 ✅
│   │   ├── accessibility-and-localization/  # 无障碍和本地化（规划中）
│   │   ├── IME/                      # 输入法（规划中）
│   │   ├── application-package/      # 应用包管理（规划中）
│   │   └── NDK-development/          # NDK 开发（规划中）
│   ├── 03-media                      # 媒体
│   │   └── scan-kit/                 # Scan Kit
│   │       ├──hmos-scan-kit-defaultscan/    # Scan Kit 默认界面扫码✅
│   │       └──hmos-scan-kit-customscan/     # Scan Kit 自定义界面扫码✅
│   │
│   └── 05-application-service/       # 应用框架
│       ├── account-kit/              # Account Kit 
│       │   └── hmos-account-kit-quicklogin-client/     # Account Kit 一键登录✅
│       ├── live-view-kit/             # Live View Kit 
│       │   └── hmos-live-view-kit-build-location/  # HarmonyOS实况窗（LiveView）代码生成助手✅
│       └── push-kit/                  # Push Kit
│           └── hmos-push-kit/         # 华为Push Kit推送服务集成助手（Master Skill/大路由）✅
│               ├── hmos-push-kit-background/    # 推送后台消息✅
│               ├── hmos-push-kit-notification/  # 推送通知消息✅
│               ├── hmos-push-kit-token/         # 获取push token✅
│               └── hmos-push-kit-voip/          # 推送应用内通话消息（VOIP）✅
│
├── 05-test/                          # 测试阶段
│   ├── hmos-local-test/              # 本地测试 ✅
│   └── hmos-instrument-test/         # 仪器测试 ✅
│
├── 06-lanunch-and-distribute/        # 发布阶段（规划中）
│   └── [应用上架和分发指南]
│
├── 07-tools/                         # 工具集
│   └── tools/
│       └── deveco-studio/            # DevEco Studio 工具
│           ├── deveco-autobugfix/          # 自动 Bug 修复 ✅
│           ├── deveco-native-flow/         # 三端一致开发流水线 ✅
│           ├── deveco-studio-codelinter/   # 代码检查 ✅
│           ├── deveco-studio-emulator/     # 模拟器管理 ✅
│           ├── deveco-studio-hilog/        # 日志分析 ✅
│           ├── deveco-studio-hvigor/       # 构建工具 ✅
│           ├── deveco-studio-verify/       # 设备验证 ✅
│           └── deveco-requirement-development/  # 需求开发流程 ✅
│
├── README.md                         # 项目说明文档
└── harmonyos-agent-skills.code-workspace  # VS Code 工作区配置
```

### 📂 目录说明

| 目录                           | 状态      | 说明                            |
| ---------------------------- | ------- | ----------------------------- |
| `.hmos-skill-reviewer/`      | ✅ 可用    | Skill 审查工具集，用于验证 Skill 规范性和质量 |
| `01-overview-and-learn/`     | 📋 规划中  | HarmonyOS 学习资源和入门教程           |
| `02-design/`                 | 🔄 部分可用 | 应用架构设计和 UI/UX 设计规范，移动端页面视觉还原 |
| `03-solutions/`              | 🔄 部分可用 | 解决方案库，包含架构、技术方案、质量保障等         |
| `04-development/`            | 🔄 部分可用 | 开发阶段技能，涵盖应用框架、系统能力等           |
| `05-test/`                   | ✅ 可用    | 测试阶段技能，包含本地测试和仪器测试            |
| `06-lanunch-and-distribute/` | 📋 规划中  | 应用发布和分发相关技能                   |
| `07-tools/`                  | ✅ 可用    | 开发工具集，包含 DevEco Studio 相关工具   |

**状态说明**：

- ✅ 可用：已完成开发，可直接使用
- 🔄 部分可用：部分技能已完成，其他在开发中
- 📋 规划中：计划开发，欢迎贡献

***

## 🎯 技能索引

### 技能总览

| 技能名称                                        | 类别            | 描述                                                                      | 触发场景                                                                                                                 | 详细文档                                                                                                  |
| ------------------------------------------- |---------------|-------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------| ----------------------------------------------------------------------------------------------------- |
| **hmos-design-visual-mobile**               | 设计            | HarmonyOS 移动端页面视觉还原，基于设计规范与组件模板生成高保真 HTML 页面                            | 移动端页面设计还原、HarmonyOS 风格 HTML 页面生成、Code-to-Design 回推                                                                   | [SKILL.md](02-design/mobile/hmos-design-visual-mobile/SKILL.md)            |
| **hmos-apifault-analysis**                   | 质量保障          | 定位开发者问题，回答开发者疑问、分析定位故障日志                                                | 当用户输入错误码、错误信息、错误日志、执行失败或需要定位问题时使用                                                                                    | [SKILL.md](03-solutions/quality/stability/hmos-apifault-analysis/SKILL.md)                             |
| **hmos-appfreeze-analysis**                   | 质量保障          | 自动分析 HarmonyOS / OpenHarmony Freeze（冻屏/卡死）故障日志，定位根因并输出完整证据链。            | 用户故障日志分析（冻屏/卡死）                                                                                                      | [SKILL.md](03-solutions/quality/stability/hmos-appfreeze-analysis/SKILL.md)                             |
| **hmos-jscrash-analysis**                   | 质量保障          | 分析 HarmonyOS/OpenHarmony 应用的 JS Crash（ArkTS/JS 层闪退）faultlogger 日志       | 用户故障日志分析 JS Crash（ArkTS/JS 层闪退）                                                                                      | [SKILL.md](03-solutions/quality/stability/hmos-jscrash-analysis/SKILL.md)                             |
| **hmos-cppcrash-analysis**                   | 质量保障          | 分析 HarmonyOS/OpenHarmony 应用的 CppCrash（Native 层崩溃）故障日志，定位根因并给出修复建议。      | 用户分析cppcrash 日志、Native崩溃堆栈                                                                                           | [SKILL.md](03-solutions/quality/stability/hmos-cppcrash-analysis/SKILL.md)                             |
| **hmos-jsleak-analysis**                   | 质量保障          | 分析 rawheap / heapsnapshot 聚类后的内存对象数据，识别疑似内存泄漏                           | .rawheap 文件分析、.heapsnapshot 文件、堆内存聚类报告、heap_cluster.mjs等故障文件分析                                                       | [SKILL.md](03-solutions/quality/stability/hmos-jsleak-analysis/SKILL.md)                             |
| **hmos-memleak-analysis**                   | 质量保障          | 分析 HarmonyOS 源代码（ArkTS、JS、C/C++）以检测内存泄漏                                 | 静态代码分析、PR 审查、NAPI 桥接开发                                                                                               | [SKILL.md](03-solutions/quality/stability/hmos-memleak-analysis/SKILL.md)                             |
| **hmos-arkui-develop-skill**                | 开发框架          | ArkUI 代码开发助手，调用知识检索获取 API 证据后完成编码和验证                                    | 构建页面组件、实现状态管理、开发布局、添加动画手势、MVVM 架构设计                                                                                  | [SKILL.md](04-development/01-application-framework/ArkUI/hmos-arkui-develop-skill/SKILL.md)           |
| **hmos-arkui-knowledge-retriever**          | 开发框架          | ArkUI 知识检索层，提供基于本地知识库的精准检索，不涉及代码生成                                      | 查询 API 用法、验证接口参数、排查错误码、对比 V1/V2 状态管理                                                                                 | [SKILL.md](04-development/01-application-framework/ArkUI/hmos-arkui-knowledge-retriever/SKILL.md)     |
| **hmos-arkui-longtake-transition**          | 开发框架          | ArkUI 一镜到底转场效果开发 | 一镜到底、转场动画、页面跳转动画、Navigation转场、卡片展开动画等                                                                                | [SKILL.md](04-development/01-application-framework/ArkUI/hmos-arkui-longtake-transition/SKILL.md) |
| **hmos-arkui-mvvm-pattern**                 | 开发框架          | HarmonyOS ArkUI 的 MVVM 架构技能，指导项目分层设计与数据流规范                              | 项目分层设计、目录结构规划、组件职责规范、整改为 MVVM 模式                                                                                     | [SKILL.md](04-development/01-application-framework/ArkUI/hmos-arkui-mvvm-pattern/SKILL.md)            |
| **hmos-arkui-statemgt-migration**           | 开发框架          | 帮助开发者将 ArkUI 状态管理从 V1 迁移到 V2                                            | V1 项目升级、装饰器迁移、应用级状态迁移、渲染控制迁移                                                                                         | [SKILL.md](04-development/01-application-framework/ArkUI/hmos-arkui-statemgt-migration/SKILL.md)      |
| **hmos-arkts-deprecated-interface-checker** | 开发框架          | 检查 HarmonyOS 项目中的废弃 SDK 接口并提供修复建议                                       | API 版本升级、清理技术债务、代码审查                                                                                                 | [SKILL.md](04-development/01-application-framework/ArkTS/hmos-arkts-deprecated-interface-checker/SKILL.md) |
| **hmos-arkts-knowledge-retriever**          | 开发框架          | 检索 ArkTS 语言指南文档，为代码开发、审查和调试提供语法参考                                       | 查找语法规则、检索标准库、获取并发编程文档、验证语法正确性                                                                                        | [SKILL.md](04-development/01-application-framework/ArkTS/hmos-arkts-knowledge-retriever/SKILL.md)     |
| **hmos-atomicservice-assistant**          | 开发框架          | 为元服务开发提供指导和建议                                                           | 创建/开发元服务项目、接入元服务开放能力、元服务备案                                                                                           | [SKILL.md](04-development/01-application-framework/atomic-service/hmos-atomicservice-assistant/SKILL.md)     |
| **hmos-ascf-assistant**          | 开发框架          | 为ASCF元服务开发提供指导和建议                                                       | 创建/开发ASCF元服务项目、将小程序转换为 ASCF 元服务、开发ASCF元服务页面/组件/平台能力                                                                  | [SKILL.md](04-development/01-application-framework/atomic-service/hmos-ascf-assistant/SKILL.md)     |
| **hmos-ability-insight-intent-generator** | 开发框架 | HarmonyOS 意图装饰器代码生成器，根据用户需求自动选择装饰器并生成代码 | 意图集成、@InsightIntent、AI入口接入                                                                                           | [SKILL.md](04-development/01-application-framework/ability/hmos-ability-insight-intent-generator/SKILL.md) |
| **hmos-multidevice-scenario-entry**               | HMOS核心技术      | 鸿蒙多设备适配总场景入口                                                            | 多设备布局、折展状态、避让区、交互方式、自然方向、硬件能力差异                                                                                      | [SKILL.md](03-solutions/HMOS-technologies/multi-device/hmos-multidevice-scenario-entry/SKILL.md)          |
| **hmos-multidevice-avoid-areas**               | HMOS核心技术      | 为系统栏、挖孔区、软键盘和沉浸式布局提供统一避让策略                                              | safe area、状态栏和导航栏避让、挖孔区、软键盘、沉浸式布局                                                                                    | [SKILL.md](03-solutions/HMOS-technologies/multi-device/hmos-multidevice-avoid-areas/SKILL.md)          |
| **hmos-multidevice-fold-state**               | HMOS核心技术      | 为折叠屏多形态设备提供悬停适配、折痕避让、开合连续性的适配方案                                         | FoldStatus、悬停态、折痕避让、开合连续性、多段折叠形态映射（如 F/M/G）、内外屏比例差异适配、折展问题修复                                                         | [SKILL.md](03-solutions/HMOS-technologies/multi-device/hmos-multidevice-fold-state/SKILL.md)          |
| **hmos-multidevice-hardware-access**               | HMOS核心技术      | 为硬件能力检测、相机、传感器和外接设备提供统一接入与降级策略                                          | SysCap、canIUse、相机、传感器、GPS、NFC、蓝牙、外接设备、热插拔                                                                            | [SKILL.md](03-solutions/HMOS-technologies/multi-device/hmos-multidevice-hardware-access/SKILL.md)          |
| **hmos-multidevice-interaction-methods**               | HMOS核心技术      | 为触摸、鼠标、键盘、手写笔等多输入方式提供交互方案和统一交互策略                                        | 交互归一化、鼠标悬浮、右键菜单、焦点导航、键盘快捷键、手写笔输入                                                                                     | [SKILL.md](03-solutions/HMOS-technologies/multi-device/hmos-multidevice-interaction-methods/SKILL.md)          |
| **hmos-multidevice-natural-orientation**               | HMOS核心技术      | 为横竖屏和特殊折叠态提供统一方向判定与更新策略                                                 | 屏幕旋转(rotation)、屏幕方向(display orientation)、窗口方向(window orientation)、自然方向差异、传感器旋转检测、多设备方向映射、三折叠 G 态方向、视频横竖屏切换、短视频自适应旋转` | [SKILL.md](03-solutions/HMOS-technologies/multi-device/hmos-multidevice-natural-orientation/SKILL.md)          |
| **hmos-multidevice-screen-window-size**               | HMOS核心技术      | 为多设备布局提供断点策略、结构切换策略和窗口监听策略                                              | 断点体系、响应式布局、窗口变化监听、自适应布局、窗口模式                                                                                         | [SKILL.md](03-solutions/HMOS-technologies/multi-device/hmos-multidevice-screen-window-size/SKILL.md)          |
| **hmos-arkts-syntax-checker**               | 测试            | 检查并修复 HarmonyOS 项目的 ArkTS 语法错误，自动化构建项目                                  | 编译项目、修复语法错误、自动化构建、CI/CD 场景                                                                                           | [SKILL.md](04-development/01-application-framework/ArkTS/hmos-arkts-syntax-checker/SKILL.md)          |
| **hmos-local-test**                         | 测试            | 在 HarmonyOS 应用/服务开发中执行模块的 Local Test（ArkTS/JS 单元测试）                     | 运行单元测试、覆盖率统计、自动化测试流水线                                                                                                | [SKILL.md](05-test/hmos-local-test/SKILL.md)                                                          |
| **hmos-instrument-test**                    | 测试            | 在 HarmonyOS 应用/服务开发中执行模块的 Instrument Test（包括 ArkTS/JS 和 C++ 测试）         | 运行集成测试、覆盖率统计、ASan 检测、自动化测试流水线                                                                                        | [SKILL.md](05-test/hmos-instrument-test/SKILL.md)                                                     |
| **deveco-studio-codelinter**                | 工具            | 对 HarmonyOS 项目运行 DevEco Studio CodeLinter 静态代码检查，解读检查结果并提供修复建议          | 代码质量检查、性能优化审查、安全审计、API 兼容性检查、CI/CD 门禁                                                                                | [SKILL.md](07-tools/tools/deveco-studio/deveco-studio-codelinter/SKILL.md)                            |
| **deveco-studio-emulator**                  | 工具            | HarmonyOS 模拟器管理助手，专注于模拟器的创建、启动、停止、应用安装调试、场景化设备控制                        | 创建管理模拟器、安装调试应用、场景化设备控制（旋转、截屏、音量等）                                                                                    | [SKILL.md](07-tools/tools/deveco-studio/deveco-studio-emulator/SKILL.md)                              |
| **deveco-studio-hilog**                     | 工具            | HarmonyOS 日志分析助手，专注于 hilog 日志查看、崩溃日志分析、日志导出                             | hilog 日志查看、崩溃分析、日志导出、hidumper 堆栈转储                                                                                   | [SKILL.md](07-tools/tools/deveco-studio/deveco-studio-hilog/SKILL.md)                                |
| **deveco-studio-hvigor**                    | 工具            | HarmonyOS 应用构建工具助手，专注于使用 Hvigor 命令行工具构建 HarmonyOS 应用                    | 构建 HAP/App 包、清理构建产物、CI/CD 集成、构建问题排查                                                                                  | [SKILL.md](07-tools/tools/deveco-studio/deveco-studio-hvigor/SKILL.md)                                |
| **deveco-native-flow**                      | 工具            | 三端一致开发流水线（HarmonyOS/Android/iOS），支持 analyse → plan → coding → build → verify | 三端开发、跨端开发、技术方案、实施计划、编码实施                                                                                             | [SKILL.md](07-tools/tools/deveco-studio/deveco-native-flow/SKILL.md)                                |
| **deveco-studio-verify**                    | 工具            | HarmonyOS 设备验证工具，支持多设备类型验证、应用安装、UI 自动化操作、截图验证、日志收集                      | 多设备验证、UI 测试、Journey 测试、截图验证、日志收集                                                                                     | [SKILL.md](07-tools/tools/deveco-studio/deveco-studio-verify/SKILL.md)                                |
| **deveco-autobugfix**                       | 工具            | 自动执行鸿蒙应用 Bug 全流程修复，涵盖问题复现、根因分析、最小化代码修复、构建编译与运行验证（依赖 deveco-mcp）         | 自动修复 Bug、auto fix 触发词、批量 Bug 修复                                                                                      | [SKILL.md](07-tools/tools/deveco-studio/deveco-autobugfix/SKILL.md)                                   |
| **deveco-requirement-development**          | 工具            | 覆盖鸿蒙应用需求开发全链路（需求调研与 PRD、编码与联调、代码评审）                                     | 新功能/新页面/新模块、PRD、端到端需求开发、鸿蒙应用交付                                                                                       | [SKILL.md](07-tools/tools/deveco-studio/deveco-requirement-development/SKILL.md) |
| **hmos-skill-reviewer**                     | 审查            | 审查和验证 Agent Skills 是否符合 Claude Skills 规范                                | 评估 SKILL.md 文件、检查命名约定、验证内容结构、确保遵循最佳实践                                                                                | [SKILL.md](.skill-review/SKILL.md)                                                                    |
| **hmos-account-kit-quicklogin-client**      | HarmonyOS SDK |    基于 HarmonyOS Account Kit 提供华为账号一键登录客户端接入指引，实现获取匿名手机号接口与华为账号一键登录组件集成                   | 实现华为账号一键登录功能                                                                                                         |        [SKILL.md](04-development/05-application-services/account-kit/hmos-account-kit-quicklogin-client/SKILL.md)                                                             |
| **hmos-scan-kit-defaultscan**      | HarmonyOS SDK |    接入华为 Scan Kit 默认界面扫码能力                     | 接入默认界面扫码能力，在扫码界面不需要完全自定义相机界面、闪光灯控制、变焦、对焦等高级功能时优先使用                                                                   |        [SKILL.md](04-development/03-media/scan-kit/hmos-scan-kit-defaultscan/SKILL.md)                                                            |
| **hmos-scan-kit-customscan**      | HarmonyOS SDK |    帮助开发者快速接入华为 Scan Kit 自定义界面扫码能力                   | 接入自定义界面扫码能力，在扫码页面需要支持完全自定义相机预览流 UI 界面、闪光灯控制、变焦、对焦等功能的场景                                                              |        [SKILL.md](04-development/03-media/scan-kit/hmos-scan-kit-customscan/SKILL.md)                                                             |
| **hmos-live-view-kit-build-location**      | HarmonyOS SDK |    HarmonyOS实况窗（LiveView）代码生成助手                   | 接入实况窗能力，支持创建、更新、停止实况窗。用户输入创建/更新/结束/完整/补全实况窗代码时触发，覆盖即时配送、打车、排队、计时、航班、高铁、共享租赁、运动锻炼、导航九大场景                              |          [SKILL.md](04-development/05-application-services/live-view-kit/hmos-live-view-kit-build-location/SKILL.md)                                                           |
| **hmos-push-kit**      | HarmonyOS SDK |    华为Push Kit推送服务集成助手（Master Skill/大路由）                   | 帮助开发者快速集成HarmonyOS推送功能，获取Push Token，配置推送服务，开通场景化消息权益。支持发送通知消息、应用内通话消息、后台消息等场景。                                       |                       [SKILL.md](04-development/05-application-services/push-kit/hmos-push-kit/SKILL.md)                                         |
| **hmos-push-kit-background**      | HarmonyOS SDK |    推送后台消息助手                  | 实现后台消息接收、数据静默更新、或消息缓存功能                                                                                              |          [SKILL.md](04-development/05-application-services/push-kit/hmos-push-kit/hmos-push-kit-background/SKILL.md)                                               |
| **hmos-push-kit-notification**      | HarmonyOS SDK |    发送通知消息助手                  | 实现推送通知功能、发送消息提醒、配置通知样式或点击动作                                                                                          |          [SKILL.md](04-development/05-application-services/push-kit/hmos-push-kit/hmos-push-kit-notification/SKILL.md)                                                      |
| **hmos-push-kit-token**      | HarmonyOS SDK |    Push Token 获取助手                   | 实现集成华为推送服务时获取push token                                                                                              |          [SKILL.md](04-development/05-application-services/push-kit/hmos-push-kit/hmos-push-kit-token/SKILL.md)                                              |
| **hmos-push-kit-voip**      | HarmonyOS SDK |    推送应用内通话消息助手（VOIP）                   | 实现语音/视频来电通知、voip功能、或呼叫接听界面                                                                                           |          [SKILL.md](04-development/05-application-services/push-kit/hmos-push-kit/hmos-push-kit-voip/SKILL.md)                                              |

### 按类别分类

#### 设计类

- [hmos-design-visual-mobile](02-design/mobile/hmos-design-visual-mobile/SKILL.md) - HarmonyOS 移动端页面视觉还原

#### 质量保障类

- [hmos-apifault-analysis](03-solutions/quality/stability/hmos-apifault-analysis/SKILL.md) - api故障日志分析
- [hmos-appfreeze-analysis](03-solutions/quality/stability/hmos-appfreeze-analysis/SKILL.md) - （冻屏/卡死）故障日志分析
- [hmos-cppcrash-analysis](03-solutions/quality/stability/hmos-cppcrash-analysis/SKILL.md) - CppCrash（Native 层崩溃）故障日志分析
- [hmos-jscrash-analysis](03-solutions/quality/stability/hmos-jscrash-analysis/SKILL.md) - jsCrash故障日志分析
- [hmos-jsleak-analysis](03-solutions/quality/stability/hmos-jsleak-analysis/SKILL.md) - 针对内存对象数据进行内存泄漏分析
- [hmos-memleak-analysis](03-solutions/quality/stability/hmos-memleak-analysis/SKILL.md) - 内存泄漏分析

#### 开发框架类

- [hmos-arkui-develop-skill](04-development/01-application-framework/ArkUI/hmos-arkui-develop-skill/SKILL.md) - ArkUI 开发技能
- [hmos-arkui-knowledge-retriever](04-development/01-application-framework/ArkUI/hmos-arkui-knowledge-retriever/SKILL.md) - ArkUI 知识检索
- [hmos-arkui-longtake-transition](04-development/01-application-framework/ArkUI/hmos-arkui-longtake-transition/SKILL.md) - ArkUI 开发技能
- [hmos-arkui-mvvm-pattern](04-development/01-application-framework/ArkUI/hmos-arkui-mvvm-pattern/SKILL.md) - MVVM 架构模式
- [hmos-arkui-statemgt-migration](04-development/01-application-framework/ArkUI/hmos-arkui-statemgt-migration/SKILL.md) - 状态管理迁移
- [hmos-arkts-deprecated-interface-checker](04-development/01-application-framework/ArkTS/hmos-arkts-deprecated-interface-checker/SKILL.md) - 废弃接口检查
- [hmos-arkts-knowledge-retriever](04-development/01-application-framework/ArkTS/hmos-arkts-knowledge-retriever/SKILL.md) - 知识检索
- [hmos-arkts-syntax-checker](04-development/01-application-framework/ArkTS/hmos-arkts-syntax-checker/SKILL.md) - 语法检查
- [hmos-atomicservice-assistant](04-development/01-application-framework/atomic-service/hmos-atomicservice-assistant/SKILL.md) - 元服务 开发技能
- [hmos-ascf-assistant](04-development/01-application-framework/atomic-service/hmos-ascf-assistant/SKILL.md) - ASCF元服务 开发技能
- [hmos-ability-insight-intent-generator](04-development/01-application-framework/ability/hmos-ability-insight-intent-generator/SKILL.md) - 意图装饰器生成

#### HarmonyOS核心技术类

- [hmos-multidevice-scenario-entry](03-solutions/HMOS-technologies/multi-device/hmos-multidevice-scenario-entry/SKILL.md) - 多设备适配总场景入口
- [hmos-multi-device-avoid-areas](03-solutions/HMOS-technologies/multi-device/hmos-multidevice-avoid-areas/SKILL.md) - 多设备避让适配开发技能
- [hmos-multi-device-fold-state](03-solutions/HMOS-technologies/multi-device/hmos-multidevice-fold-state/SKILL.md) - 多设备折展适配开发技能
- [hmos-multi-device-hardware-access](03-solutions/HMOS-technologies/multi-device/hmos-multidevice-hardware-access/SKILL.md) - 多设备硬件调用开发技能
- [hmos-multi-device-interaction-methods](03-solutions/HMOS-technologies/multi-device/hmos-multidevice-interaction-methods/SKILL.md) - 多设备交互适配开发技能
- [hmos-multi-device-natural-orientation](03-solutions/HMOS-technologies/multi-device/hmos-multidevice-natural-orientation/SKILL.md) - 多设备旋转适配开发技能
- [hmos-multi-device-screen-window-size](03-solutions/HMOS-technologies/multi-device/hmos-multidevice-screen-window-size/SKILL.md) - 多设备屏幕窗口适配开发技能

#### 测试类

- [hmos-local-test](05-test/hmos-local-test/SKILL.md) - 本地测试
- [hmos-instrument-test](05-test/hmos-instrument-test/SKILL.md) - 仪器测试

#### 工具类

- [deveco-autobugfix](07-tools/tools/deveco-studio/deveco-autobugfix/SKILL.md) - 自动 Bug 修复
- [deveco-native-flow](07-tools/tools/deveco-studio/deveco-native-flow/SKILL.md) - 三端一致开发流水线
- [deveco-requirement-development](07-tools/tools/deveco-studio/deveco-requirement-development/SKILL.md) - 需求开发流程
- [deveco-studio-codelinter](07-tools/tools/deveco-studio/deveco-studio-codelinter/SKILL.md) - 代码检查
- [deveco-studio-emulator](07-tools/tools/deveco-studio/deveco-studio-emulator/SKILL.md) - 模拟器管理
- [deveco-studio-hilog](07-tools/tools/deveco-studio/deveco-studio-hilog/SKILL.md) - 日志分析
- [deveco-studio-hvigor](07-tools/tools/deveco-studio/deveco-studio-hvigor/SKILL.md) - 构建工具
- [deveco-studio-verify](07-tools/tools/deveco-studio/deveco-studio-verify/SKILL.md) - 设备验证

#### 审查类

- [hmos-skill-reviewer](.skill-review/SKILL.md) - Skill 审查

#### HarmonyOS SDK类
- [hmos-account-kit-quicklogin-client](04-development/05-application-services/account-kit/hmos-account-kit-quicklogin-client/SKILL.md) - 华为账号一键登录
- [hmos-scan-kit-defaultscan](04-development/03-media/scan-kit/hmos-scan-kit-defaultscan/SKILL.md) - 默认界面扫码
- [hmos-scan-kit-customscan](04-development/03-media/scan-kit/hmos-scan-kit-customscan/SKILL.md) - 自定义界面扫码
- [hmos-live-view-kit-build-location](04-development/05-application-services/live-view-kit/hmos-live-view-kit-build-location/SKILL.md) - HarmonyOS 实况窗 
- [hmos-push-kit](04-development/05-application-services/push-kit/hmos-push-kit/SKILL.md) - 集成华为推送服务
- [hmos-push-kit-background](04-development/05-application-services/push-kit/hmos-push-kit/hmos-push-kit-background/SKILL.md) - 推送后台消息
- [hmos-push-kit-notification](04-development/05-application-services/push-kit/hmos-push-kit/hmos-push-kit-notification/SKILL.md) - 发送通知消息
- [hmos-push-kit-token](04-development/05-application-services/push-kit/hmos-push-kit/hmos-push-kit-token/SKILL.md) - 获取push token
- [hmos-push-kit-voip](04-development/05-application-services/push-kit/hmos-push-kit/hmos-push-kit-voip/SKILL.md) - 推送应用内通话消息（VOIP）

***

## ✅ 测试验收

### Skill 测试流程

每个 Skill 在合入前必须通过以下测试流程：

```
┌─────────────────────────────────────────────────────────────┐
│                    Skill 测试验收流程                         │
└─────────────────────────────────────────────────────────────┘
1. 内容审查
   ├─> 使用 skill-reviewer 技能审查
   ├─> 检查内容职责（Skill vs 知识库）
   ├─> 验证工作流程完整性
   └─> 确认检查清单可操作

2. 功能测试
   ├─> 执行测试用例（test-cases/）
   ├─> 验证提示词效果（prompts/）
   ├─> 检查输出格式正确性
   └─> 确认错误处理机制

3. 集成测试
   ├─> 在实际项目中测试
   ├─> 验证与其他 Skill 的兼容性
   └─> 检查依赖工具可用性

4. 文档审查
   ├─> 检查参考文档完整性
   ├─> 验证链接有效性
   └─> 确认示例代码可运行
```

### 测试验收标准

| 维度       | 要求   | 验收标准                               |
| -------- | ---- | ---------------------------------- |
| **格式规范** | 必须通过 | 无 YAML 格式错误，命名符合规范                 |
| **内容职责** | 必须通过 | Skill 内容聚焦"如何做"，知识库内容在 references/ |
| **工作流程** | 必须通过 | 包含清晰的步骤和决策逻辑                       |
| **检查清单** | 强烈建议 | 提供可操作的检查项                          |
| **测试用例** | 必须提供 | 覆盖主要使用场景                           |
| **提示词**  | 必须提供 | 包含典型触发场景的提示词                       |
| **参考文档** | 强烈建议 | 详细内容在 references/ 中                |

### 测试方法

```bash
# 手动测试
# 在 AI 助手中加载 SKILL.md，使用测试提示词验证功能
```

***

## 📦 Skill 交付件清单

每个 Skill 合入前必须提供以下交付件：

### 必需交付件

| 交付件          | 路径                                        | 说明                         | 示例                                                                                            |
| ------------ | ----------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------- |
| **SKILL.md** | `<skill-name>/SKILL.md`                   | Skill 主文件，包含元数据、工作流程、检查清单等 | [示例](04-development/01-application-framework/ArkUI/hmos-arkui-develop-skill/SKILL.md)         |
| **测试用例**     | `<skill-name>/test-cases/`                | 覆盖主要使用场景的测试用例              | [示例](04-development/01-application-framework/ArkUI/hmos-arkui-statemgt-migration/test-cases/) |
| **测试提示词**    | `<skill-name>/test-cases/test-prompts.md` | 用于验证 Skill 功能的典型提示词        | 见下方模板                                                                                         |

### 推荐交付件

| 交付件      | 路径                         | 说明                   | 示例                                                                                       |
| -------- | -------------------------- | -------------------- | ---------------------------------------------------------------------------------------- |
| **参考文档** | `<skill-name>/references/` | 详细的技术文档、API 参考、最佳实践等 | [示例](04-development/01-application-framework/ArkUI/hmos-arkui-develop-skill/references/) |
| **脚本工具** | `<skill-name>/scripts/`    | 自动化脚本、辅助工具           | [示例](07-tools/tools/deveco-studio/deveco-studio-emulator/scripts/)                       |
| **资源文件** | `<skill-name>/assets/`     | 模板文件、示例代码、配置文件等      | [示例](04-development/01-application-framework/ArkUI/hmos-arkui-develop-skill/assets/)     |
| **使用指南** | `<skill-name>/README.md`   | 详细的使用说明和快速开始指南       | 可选                                                                                       |

### 测试提示词模板

每个 Skill 应在 `test-cases/test-prompts.md` 中提供以下内容：

```markdown
# 测试提示词

## 基础功能测试

### 测试场景 1：[场景名称]
**提示词**：
```

\[用户输入的提示词]

```

**预期输出**：
- [期望的行为或输出]

### 测试场景 2：[场景名称]
**提示词**：
```

\[用户输入的提示词]

```

**预期输出**：
- [期望的行为或输出]

## 边界条件测试

### 测试场景 3：[边界场景]
**提示词**：
```

\[用户输入的提示词]

```

**预期输出**：
- [期望的行为或输出]

## 错误处理测试

### 测试场景 4：[错误场景]
**提示词**：
```

\[用户输入的提示词]

```

**预期输出**：
- [期望的错误处理行为]
```

### Skill 目录结构模板

```
skill-name/
├── SKILL.md                    # 必需：Skill 主文件
├── test-cases/                 # 必需：测试用例目录
│   ├── test-prompts.md         # 必需：测试提示词
│   ├── test-case-1.md          # 测试用例 1
│   └── test-case-2.md          # 测试用例 2
├── references/                 # 推荐：参考文档目录
│   ├── concept.md              # 概念说明
│   ├── api-reference.md        # API 参考
│   └── best-practices.md       # 最佳实践
├── scripts/                    # 推荐：脚本工具目录
│   ├── main.py                 # 主脚本
│   └── helper.py               # 辅助脚本
└── assets/                     # 推荐：资源文件目录
    ├── templates/              # 模板文件
    └── examples/               # 示例代码
```

***

## 🤝 贡献指南

我们欢迎来自社区的贡献！

### 贡献流程

1. **Fork 本仓库**
   ```bash
   git clone https://github.com/your-username/harmonyos-agent-skills.git
   ```
2. **创建特性分支**
   ```bash
   git checkout -b feature/new-skill-name
   ```
3. **开发 Skill**
   - 参考 [Skill 目录结构模板](#skill-目录结构模板)
   - 确保包含所有必需交付件
   - 遵循 [格式规范](.skill-review/references/format-rules.md)
4. **测试验证**
   ```bash
   # 在agent运行格式检查
   .skill-review/scripts/check-skill-format.sh your-skill/SKILL.md
   # 在agent中执行测试用例
   # 在 AI 助手中使用测试提示词验证功能
   ```
5. **提交更改**
   ```bash
   git add .
   git commit -m "feat: add new skill for [功能描述]"
   ```
6. **推送分支**
   ```bash
   git push origin feature/new-skill-name
   ```
7. **开启 Pull Request**
   - 填写 PR 模板
   - 关联相关 Issue
   - 等待审查

