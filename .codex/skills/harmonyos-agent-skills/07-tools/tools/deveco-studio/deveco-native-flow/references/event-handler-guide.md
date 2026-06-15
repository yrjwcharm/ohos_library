# 事件系统 — Handler 声明与分发示例

## Handler 声明

其他 plugin 的 skill 在 SKILL.md frontmatter 中声明要监听的事件：

```yaml
---
name: harmony-project-setup
description: "HarmonyOS 项目初始化完成后自动配置工程"
on:
  event: "native-flow:pipeline:after-init"
  filter:
    platform: harmony
user-invocable: false
---
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `on.event` | 是 | 要监听的事件名，必须完全匹配 |
| `on.filter` | 否 | 按 payload 字段过滤。所有 filter 条件必须全部匹配才触发 |
| `user-invocable` | — | handler skill 通常设为 `false`，仅由事件触发 |

## 错误处理

| 场景 | 处理 |
|------|------|
| handler 执行失败 | 输出警告，**不阻塞**流水线继续执行 |
| 未找到匹配的 handler | 正常情况，静默跳过 |
| handler 执行超时 | 输出警告，跳过该 handler，继续下一个 |

## 示例：after-init 事件分发

假设 `setup.json` 中有 3 个模块（ios x 1, harmony x 2），分发过程：

```
模块 1: ios-feature-module (ios)
  → 触发 after-init { platform: "ios", module_name: "ios-feature-module", dir: "...", ... }
  → 搜索 handler → harmony-project-setup 的 filter 要求 platform=harmony → 不匹配 → 跳过
  → 无匹配 handler，继续

模块 2: harmony-feature-module (harmony)
  → 触发 after-init { platform: "harmony", module_name: "harmony-feature-module", dir: "...", ... }
  → 搜索 handler → harmony-project-setup 的 filter platform=harmony → 匹配 ✓
  → 调用 harmony-project-setup skill，传入 payload
  → handler 完成，继续

模块 3: harmony-core-module (harmony)
  → 触发 after-init { platform: "harmony", module_name: "harmony-core-module", dir: "...", ... }
  → harmony-project-setup 匹配 ✓ → 调用
  → handler 完成，继续

所有模块事件分发完毕 → 进入下一阶段
```