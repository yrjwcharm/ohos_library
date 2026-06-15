---
name: hmos-atomicservice-assistant
description: 辅助鸿蒙开发者构建元服务（Atomic Service / 免安装应用）。只要用户提到元服务、atomicService、免安装、atomic service，或遇到以下任意问题，都必须使用本 Skill：创建/改造元服务项目、@atomicservice API 报错、配置隐私托管、设置可信域名、静默登录/免密登录、接入鸿蒙支付、包大小超限、AtomicServiceEnhancedWeb vs ArkWeb、Navigation 分包路由、睫毛图标、ICP备案、上架审核被拒。提供规范说明、合规检查清单、代码示例和上架最佳实践。
license: MIT
metadata:
  author: atomicservice
  version: "1.2.0"
---

## 快速开始

鸿蒙元服务（Atomic Service）是免安装的轻量应用形态，与普通鸿蒙应用共享框架和工具链，但有一套独立的合规规范。本 Skill 指导 AI 助手帮助开发者完成元服务的开发、合规检查和上架全流程。

---

## Workflow

### 阶段 1: 需求识别

用户提到以下关键词时触发本 Skill：
- 「元服务」「atomicService」「免安装」「atomic service」「鸿蒙小程序」「AGC元服务」
- 具体问题：隐私托管、信任域名、可信域名、静默登录、免密登录、睫毛图、包大小超限、跳转规范、ICP备案、上架被拒、@atomicservice API、AtomicServiceEnhancedWeb

判断用户意图（见决策树），进入对应阶段。

### 阶段 2: 合规项确认

根据用户场景，逐项核对 [合规检查清单](#合规检查清单)：
- **新建元服务**：全量检查所有 Critical 项
- **改造现有应用**：重点检查 API 合规性、包大小、ArkWeb 禁用
- **上架被拒**：从拒绝原因反查对应 Critical 项，给出具体修复步骤

告知未完成项及优先级（Critical 项必须全部通过，Warning 项建议完成）。

### 阶段 3: 代码/配置指导

- 优先使用 [关键技术要点速查](#关键技术要点速查) 中的内容直接回答
- 需要完整代码示例时，读取 [references/api-guide.md](references/api-guide.md)
- 需要规格细节时，读取 [references/atomic-service-specs.md](references/atomic-service-specs.md)
- 需要官方链接时，读取 [references/official-docs.md](references/official-docs.md)
- 涉及 ArkTS/ArkUI/工具链时，委托对应 Skill（见决策树）

### 阶段 4: 交付

- 给出可直接复制使用的代码片段或配置
- 附上关键注意事项（尤其是上架审核常见拒绝原因）
- 如问题较复杂，给出完整的分步骤操作清单

---

## 决策树

```
用户意图？
├─ 新建元服务
│   └─ 执行完整 Workflow（阶段 1-4），重点检查全部 Critical 合规项
├─ 改造现有应用为元服务
│   └─ 重点检查：API 合规性(@atomicservice标注) + 包大小 + 禁用 ArkWeb
├─ 解决特定技术问题
│   ├─ ArkTS 语法/语言问题     → 委托 hmos-arkts-knowledge-retriever
│   ├─ ArkUI 组件/状态管理     → 委托 hmos-arkui-develop-skill
│   ├─ 构建/Hvigor 问题        → 委托 deveco-studio-hvigor
│   ├─ 静态代码检查            → 委托 deveco-studio-codelinter
│   └─ 模拟器/调试问题         → 委托 deveco-studio-emulator
└─ 上架审核失败
    └─ 逐项核对合规检查清单，重点排查 Critical 项，给出具体修复方案
```

> 如对应 Skill 未安装，提醒用户先安装再使用。

---

## 高频问题速答

以下问题可直接从本节回答，无需读取 references 文件：

**Q: 包大小超限怎么办？**
单分包 ≤ 2MB（硬限制），总包 ≤ 10MB（可申请至 20MB）。解决方案：拆分分包、使用懒加载、压缩资源、移除未用依赖。

**Q: H5 页面用什么组件？**
必须用 `AtomicServiceEnhancedWeb`，禁止使用 `ArkWeb`（未标注 @atomicservice）。

**Q: 怎么实现登录？**
使用静默登录 `getQuickLoginAuthCode`（`forceLogin = false`），账号关联场景才要求实现。详见 references/api-guide.md。

**Q: 网络请求被拦截？**
需在 AGC 后台「我的项目 → 服务端域名」配置可信域名白名单，HTTP 请求域名必须在白名单内。

**Q: 上架审核常见被拒原因？**
1. `bundleType` 未设为 `atomicService`
2. 使用了未标注 `@atomicservice` 的 API
3. 使用了 ArkWeb 或 C++/so 库
4. 未配置隐私托管
5. 包大小超限
6. 未完成 ICP 备案

---

## 合规检查清单

### Critical（上架必须，缺一不可）

- [ ] `AppScope/app.json5` 中 `bundleType=atomicService` 已配置
- [ ] 仅使用标注 `@atomicservice` 的 API，未使用 C++ 和 so 库
- [ ] 已配置信任域名（网络请求域名需在 AGC 后台白名单）
- [ ] 已集成隐私托管
- [ ] 已实现静默登录（账号关联场景）
- [ ] 单分包大小 ≤ 2MB，总包大小 ≤ 10MB（特殊场景可申请至 20MB）
- [ ] H5 场景使用 `AtomicServiceEnhancedWeb`，**禁止使用 ArkWeb**
- [ ] 跳转其他元服务遵循跳转规范（不可任意跳转普通应用）
- [ ] 使用 Navigation + NavPushPathHelper 实现分包路由

### Warning（发布建议）

- [ ] 已使用睫毛图工具生成规范图标（512×512 app_icon，216×216 上传 AGC）
- [ ] 已实现 Menubar 避让
- [ ] 已实现分享功能（如有分享需求）
- [ ] 已完成 ICP 备案（走元服务专属备案通道）

---

## 关键技术要点速查

| 场景 | 方案 | 参考文件 |
|------|------|------|
| 项目标识 | `bundleType=atomicService` | atomic-service-specs.md |
| API 使用 | 仅 `@atomicservice` 标注接口，禁用 C++/so | api-guide.md |
| H5 接入 | `AtomicServiceEnhancedWeb`（禁用 ArkWeb） | api-guide.md |
| 账号 | 静默登录（`getQuickLoginAuthCode`，`forceLogin=false`） | api-guide.md |
| 支付 | 鸿蒙支付服务（`@kit.PaymentKit`） | api-guide.md |
| 路由 | Navigation + NavPushPathHelper | api-guide.md |
| 图标 | 睫毛图工具，1024→512（app_icon）→216（AGC上传） | atomic-service-specs.md |
| 包大小 | 分包 ≤2MB，总包 ≤10MB（可申请20MB） | atomic-service-specs.md |
| 隐私托管 | 接入隐私托管服务，不得自行收集敏感数据 | api-guide.md |
| 可信域名 | AGC 后台「服务端域名」白名单配置 | official-docs.md |

---

## 参考文档

按需加载，不必全部读取：

- [references/atomic-service-specs.md](references/atomic-service-specs.md) — 元服务与普通应用主要差异、规格限制、开发前置流程
- [references/api-guide.md](references/api-guide.md) — @atomicservice API 代码示例（网络、账号、支付、路由、隐私托管）
- [references/official-docs.md](references/official-docs.md) — 所有官方文档链接汇总（开发入门/接入规范/H5/账号支付/UI导航/图标包大小/上架备案）
