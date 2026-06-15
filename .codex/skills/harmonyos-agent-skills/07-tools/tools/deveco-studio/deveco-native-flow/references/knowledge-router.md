# HarmonyOS 知识路由详细说明

> 本文档是从 SKILL.md 移出的详细知识路由说明，用于 HarmonyOS 开发时按需加载知识。

---

## 意图识别

| 意图 | 典型场景 | 路由目标 |
|------|----------|----------|
| **Learn** | 询问鸿蒙新特性、API 对比、最佳实践 | 加载 kits_* + harmony-learner |
| **Verify** | 在设备上验证、截图、查看日志 | harmony-verify + MCP 设备工具 |
| **Refactor** | 重命名、移动代码、安全删除 | refactoring（LSP 驱动） |
| **Plan/Code** | 开发新功能、修 bug、写页面 | 完整路由（含 knowledge_search 兜底） |

---

## 认知层级路由

```
L3: 领域约束 (WHY)     → 业务规则、领域逻辑（待收集）
L2: 设计模式 (WHAT)    → 架构、状态、数据、交互等（待收集）
L1: 组件用法 (HOW)     → component_*、kits_*（API、props、事件、使用方式）✅
L0: 框架机制 (FOUNDATION) → lang-syntax（ArkTS 语法、声明式UI、约束）✅
L-1: 知识补充 (SEARCH) → knowledge_search（MCP 知识搜索，补充不足）✅
```

---

## 组件 → Skill 路由表

| 查询/组件类型 | 读取 |
|---------------|------|
| 基础组件（Text、Button、Image、Toggle、Slider、Progress 等） | `references/component_basic_ui/SKILL.md` |
| 容器组件（Column、Row、List、Grid、Scroll、Refresh 等） | `references/component_container/SKILL.md` |

---

## Kit → Skill 路由表

| 查询/能力类型 | 读取 |
|---------------|------|
| 并发、TaskPool、Worker、工具函数 | `references/kits_arkts/SKILL.md` |
| 服务卡片、FormExtensionAbility | `references/kits_form/SKILL.md` |
| 进程间通信、IPC、RPC | `references/kits_ipc/SKILL.md` |
| 国际化、多语言、资源管理 | `references/kits_localization/SKILL.md` |
| 日志、性能分析、hilog | `references/kits_performance/SKILL.md` |
| 页面路由、Ability、生命周期 | `references/kits_ability/SKILL.md` |
| 系统提示、Toast、动画 | `references/kits_ui/SKILL.md` |
| 文件读写、文件选择器 | `references/kits_file/SKILL.md` |
| 音视频、图片编解码、相机 | `references/kits_media/SKILL.md` |
| 传感器、振动、定位、通知 | `references/kits_device/SKILL.md` |
| 蓝牙、BLE、NFC、WiFi | `references/kits_connectivity/SKILL.md` |
| 网络请求、HTTP、WebSocket | `references/kits_network/SKILL.md` |
| 数据存储、Preferences、数据库 | `references/kits_data/SKILL.md` |
| 加密解密、用户认证、密钥管理 | `references/kits_security/SKILL.md` |
| WebView、JS 桥接 | `references/kits_web/SKILL.md` |
| 剪贴板、下载上传、打印 | `references/kits_basic_services/SKILL.md` |
| 电话、短信、SIM卡 | `references/kits_telephony/SKILL.md` |
| 分布式设备管理、跨设备协同 | `references/kits_distributed/SKILL.md` |
| 无障碍、屏幕阅读 | `references/kits_accessibility/SKILL.md` |
| 媒体会话、AVSession | `references/kits_avsession/SKILL.md` |
| 键盘事件、鼠标事件、触摸事件 | `references/kits_input/SKILL.md` |
| 输入法、软键盘 | `references/kits_ime/SKILL.md` |
| 2D图形、Canvas、特效 | `references/kits_graphics2d/SKILL.md` |
| UI测试、自动化测试 | `references/kits_test/SKILL.md` |

---

## 路由规则

1. **Verify** → 读取 `references/harmony-verify/SKILL.md`，使用 MCP 设备工具
2. **Refactor** → 读取 `references/refactoring/SKILL.md`
3. **Learn** → 加载本地知识 skill（**不触发 knowledge_search 兜底**），然后读取 `references/harmony-learner/SKILL.md`
4. **Plan/Code** → 完整路由（含 knowledge_search 兜底）
5. **意图模糊** → 默认走 Plan/Code 路径
6. **多意图混合** → 拆分处理，分别路由

---

## Fallback：云端知识库搜索

当本地 skill 无法覆盖用户问题时，且当前环境中存在后缀为 `harmonyos_knowledge_search` 的 MCP 工具，则调用该工具进行云端文档搜索作为兜底。

---

## 使用方式

模型应按以下步骤使用知识路由：

1. **识别意图**：根据用户输入判断意图类型（Learn/Verify/Refactor/Plan/Code）
2. **选择路由路径**：根据意图选择对应的路由规则
3. **加载知识**：按路由表读取对应的 SKILL.md 文件
4. **执行任务**：基于加载的知识完成用户任务
5. **兜底搜索**：如果本地知识不足以完成任务，调用 knowledge_search MCP 工具搜索云端文档

---

## 参考

- **主文档**：`../SKILL.md`（精简版本，快速索引）
- **语法知识**：`references/lang-syntax/SKILL.md`
- **知识搜索**：`references/knowledge_search/SKILL.md`