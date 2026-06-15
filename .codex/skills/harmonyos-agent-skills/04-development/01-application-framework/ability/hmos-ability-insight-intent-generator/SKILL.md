---
name: hmos-ability-insight-intent-generator
description: |
  Generates OpenHarmony intent decorator code from user requirements with automatic decorator selection.
  Use when the user mentions "intent", "@InsightIntent", or needs to integrate app functionality with AI entry points.
  Provides decorator selection decision tree, parameter validation, build config checking, and compilation verification with auto-fix.
license: MIT
---

# OpenHarmony 意图装饰器代码生成器

你是一个辅助 OpenHarmony 应用生成意图的专家。通过分析用户需求，结合现有代码，生成正确的意图代码（装饰器 + 功能实现）。

## 🚨 底线（必须无条件遵守）

1. **禁止编造**：所有字段名、类型、导入语句必须严格遵循官方 API，不得自创。
2. **禁止省略检查**：每次生成前必须执行下文列出的所有强制检查步骤。

3. **按需阅读子文档（高效策略）**：
   - **先速读结构**：打开子文档后，快速浏览标题（`#`、`##`、`###`）、表格、代码块标题，了解文档包含哪些章节。
   - **再精读需要部分**：根据当前任务，优先精读最相关的 1-2 个章节（如“代码模板”“核心规则”“自检清单”）。如果信息不足，再继续阅读其他必要章节。
   - **禁止逐字通读**：不要从头到尾朗读整个文档，除非文档极短（<50 行）或需要理解完整上下文。
   - **每个步骤只阅读该步骤实际需要的文档**，采用“速读+精读”方式。


---

## 装饰器选择决策树（简版）

> 详细决策流程请参阅 [`decorator_selection.md`](references/decorator_selection.md)

```text
用户需求
  │
  ├─ 用户明确指定装饰器类型？
  │    ├─ 是 → 检查技术可行性 → 可行则生成 / 不可行则提示降级方案
  │    └─ 否 ↓
  │
  ├─ URI/Deep Link 跳转？
  │    ├─ 是 → 优先 @InsightIntentLink（需配置 URI）
  │    └─ 否 ↓
  │
  ├─ 关键词匹配（返回/查询/计算等纯函数）?
  │    ├─ 是 → @InsightIntentFunctionMethod（需静态方法）
  │    └─ 否 ↓
  │
  ├─ 关键词匹配（打开/跳转固定页面）?
  │    ├─ 是 → @InsightIntentPage（需确认页面已注册）
  │    └─ 否 ↓
  │
  └─ 其他（操作/动态路由/无明确匹配） → @InsightIntentEntry（通用）
```

------

## 关键约束检查清单（必须逐项确认）

### 🔴 Critical（违反即编译失败）

- **装饰器类型**：仅使用 `@InsightIntentEntry` / `@InsightIntentLink` / `@InsightIntentPage` / `@InsightIntentFunctionMethod` / `@InsightIntentForm` / `@InsightIntentEntity`，禁止自创。
- **导入语句**：必须包含装饰器、基类、命名空间（如 `insightIntent`）且均来自 `@kit.AbilityKit`。
- **`build-profile.json5`**：`useNormalizedOHMUrl: true`，`compileSdkVersion >= 20` 且格式与 `compatibleSdkVersion` 完全一致。
- **`insight_intent.json`**：使用对象数组格式 `[{ "srcEntry": "./ets/..." }]`，不能是字符串数组。
- **ArkTS 严格模式**：无解构赋值、无索引访问 `obj['prop']`、无 `any`/`unknown`、无不带接口的对象字面量返回。
- **类属性初始化**：所有属性必须有初始值（如 `name: string = ''`），禁止 `| undefined` 联合类型。
- **`@InsightIntentEntry.parameters`**：必须为 `{ type: 'object', properties: {...} }`，不支持 `integer` 类型。
- **`@InsightIntentEntry` 返回值**：必须为 `Promise<insightIntent.IntentResult<T>>`，且 `result` 字段中包含 `resultDesc`。
- **`@InsightIntentFunctionMethod` 组合**：必须同时使用 `@InsightIntentFunction()` 装饰类，且方法为 `static`，括号不可省略。
- **`@InsightIntentPage` 使用位置**：必须直接装饰页面 `struct`，不可创建单独意图类。
- **`@InsightIntentPage` 的 `navigationId` 和 `navDestinationName`**：**必填**。缺少会导致热启动白屏——意图框架无法定位 Navigation 实例做 NavPathStack 跳转。`navigationId` 必须与 Navigation 组件 `.id()` 一致。

### 🟡 Warning（强烈建议，否则可能导致运行时错误或体验问题）

- **错误处理**：`catch` 块中 `throw new Error(...)`，不直接 `throw error`。
- **可选属性访问**：使用 `??` 或 `||` 提供默认值（如 `params.date ?? ''`）。
- **路由参数获取**：使用 `try-catch` 包裹，并定义接口类型。
- **`executeMode` 字段**：必须是数组，如 `[insightIntent.ExecuteMode.UI_ABILITY_FOREGROUND]`。
- **`abilityName` vs `uiAbility`**：`@InsightIntentEntry` 用 `abilityName`，`@InsightIntentPage` 用 `uiAbility`。
- **参数传递（Navigation）**：使用 `LocalStorage` 而非 `AppStorage`。
- **冷启动 Tab 切换**：同时使用 `@Watch` 和 `Tabs().onAppear()` 兜底。
- **Navigation 页面冷启动防白屏**：页面含 Navigation 组件时必须实现延迟渲染（详见 [insight_intent_page.md](references/insight_intent_page.md)）。要点：`@State renderNav` 不加 `private`；`onPageShow` 重建延迟用 50ms；条件只需 `!this.firstLoad`。

### 🟢 Info（优化建议，提升代码质量）

- **`llmDescription`**：包含功能描述、触发词、参数必填性，100 字以内。
- **`keywords`**：3-8 个，包含同义词和英文，避免宽泛词。
- **日志记录**：使用 `hilog` 记录关键步骤，便于调试。
- **性能**：避免在意图中执行耗时同步操作；异步操作使用 `async/await`。
- **复用**：优先使用项目已有的常量、数据模型、工具类，不重复造轮子。

------

## 整体流程（必须按顺序执行）

### 1. 项目配置检查（强制）

👉 必须阅读：[project_config_checks.md](references/project_config_checks.md)

- 读取 `build-profile.json5`，检查 `useNormalizedOHMUrl` 和 `compileSdkVersion`。
- 确保格式一致（字符串/数字与 `compatibleSdkVersion` 相同）。
- 不满足则提示用户修改，并等待确认。

### 2. 分析应用架构&探索现有代码（强制）

👉 必须阅读：[architecture_checks.md](references/architecture_checks.md)和[code_exploration.md](references/code_exploration.md)

- 扫描 `/ets/pages/`, `/ets/common/constants/`, `/ets/database/` 等目录。
- 复用已有的常量、数据模型、存储方法。
- **禁止**凭空创造键名或重复实现已有工具类。

### 3. 分析用户需求 & 选择装饰器

👉 必须阅读：[decorator_selection.md](references/decorator_selection.md)

- 根据需求匹配 6 种装饰器之一，按上方决策树快速判断。
- 若用户指定类型但技术上不可行，按降级路径处理。

### 4. 阅读对应装饰器的详细规则

根据选中的装饰器，阅读 `references/` 下的对应文件：

> - [`insight_intent_entry.md`](references/insight_intent_entry.md) - `@InsightIntentEntry` 完整规范
> - [`insight_intent_link.md`](references/insight_intent_link.md) - `@InsightIntentLink` 完整规范
> - [`insight_intent_page.md`](references/insight_intent_page.md) - `@InsightIntentPage` 完整规范
> - [`insight_intent_function.md`](references/insight_intent_function.md) - `@InsightIntentFunctionMethod` 完整规范
> - [`insight_intent_form.md`](references/insight_intent_form.md) - `@InsightIntentForm` 完整规范
> - [`insight_intent_entity.md`](references/insight_intent_entity.md) - `@InsightIntentEntity` 完整规范

### 5. 生成代码（严格遵守 ArkTS 规范）
   👉 必须阅读：[arkts_strict_rules.md](references/arkts_strict_rules.md) 
   👉 自定义意图的 `llmDescription` 和 `keywords` 编写规范请阅读：[llm_writing_guide.md](references/llm_writing_guide.md)

   - 所有对象字面量必须有显式接口。
   - 禁止解构赋值、禁止 `any` / `unknown`。
   - 类属性必须初始化，禁止 `| undefined` 联合类型。
   - 返回值必须符合对应装饰器的类型要求。
   - 如果生成的是 `@InsightIntentPage` 且页面包含 `Navigation`，必须插入防白屏代码模板（详见 [insight_intent_page.md](references/insight_intent_page.md)）。

### 6. 写入文件 & 配置

👉 必须阅读：[write_file_guide.md](references/write_file_guide.md)

- **新增文件**：在 `entry/src/main/ets/insightintents/` 下创建 `.ets` 文件，并更新 `insight_intent.json`（对象数组格式）。
- **修改现有文件**（如添加 `@InsightIntentPage`）：直接编辑，**无需**更新 `insight_intent.json`。
- 写入前使用 `AskUserQuestion` 工具征求用户同意。

### 7. 代码逻辑自检

- 逐项对照 [troubleshooting.md](references/troubleshooting.md) 中的所有检查点
- 结合 [arkts_strict_rules.md](references/arkts_strict_rules.md) 和对应装饰器文档，验证生成的代码
- 确保没有遗留任何已知的编译或运行时错误

------

## 常见问题
- 意图未生效 → 检查 `insight_intent.json` 配置及文件路径。
- 编译错误 `Schema validate failed` → `compileSdkVersion` 格式与 `compatibleSdkVersion` 不一致。
- 运行时 16000001 → `abilityName` 与 `module.json5` 中的 Ability 名称不匹配。
- 更多错误参考 [troubleshooting.md](references/troubleshooting.md)。

------

## 子文档索引

| 文档                                                         | 内容                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [project_config_checks.md](references/project_config_checks.md) | `build-profile.json5` 完整检查流程、格式一致性               |
| [architecture_checks.md](references/architecture_checks.md)  | Navigation vs Router 识别、参数传递方案                      |
| [code_exploration.md](references/code_exploration.md)        | 扫描项目、复用现有代码的规范                                 |
| [decorator_selection.md](references/decorator_selection.md)  | 装饰器选择决策树、场景匹配、降级路径（完整版）               |
| [arkts_strict_rules.md](references/arkts_strict_rules.md)    | ArkTS 严格模式所有规则及示例                                 |
| [write_file_guide.md](references/write_file_guide.md)        | 文件写入流程、`insight_intent.json` 配置                     |
| [write_config_file.md](references/write_config_file.md)      | `insight_intent.json` 配置格式详细说明                       |
| [jsonschema_reference.md](references/jsonschema_reference.md) | JSON Schema 参数定义参考（类型限制、示例）                   |
| [troubleshooting.md](references/troubleshooting.md)          | 编译错误、运行时错误解决方案                                 |
| [llm_writing_guide.md](references/llm_writing_guide.md)      | `llmDescription` 和 `keywords` 编写规范                      |
| [insight_intent_*.md](references/)                           | 各装饰器详细规范（entry, link, page, function, form, entity） |

## 相关资源

### 官方文档

- [意图调试工具](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/insight-intent-debug)
- [通过小艺触发意图调试](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/intents-skill-all-rec-dp-self-validation-decorator)

### 调试技巧

1. **启用详细日志**：

```typescript
const LOG_TAG: string = 'MyIntent';
hilog.debug(0x0000, LOG_TAG, 'Debug info: %{public}s', data);
```

2. **使用 DevEco Studio 调试器**：在 `onExecute()` 等方法中设置断点，查看执行器实例的属性值。
3. **检查意图注册**：查看 `insight_intent.json` 配置，确认文件路径正确。
4. **测试意图调用**：使用[意图调试工具](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/insight-intent-debug)测试，检查日志输出，验证返回结果。