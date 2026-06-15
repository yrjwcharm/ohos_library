# 写入文件确认指南

## 配置规则（重要）

### 何时需要配置 insight_intent.json

| 场景                                                         | 是否需要配置 | 说明               |
| ------------------------------------------------------------ | ------------ | ------------------ |
| 新建意图文件（@InsightIntentEntry、@InsightIntentFunctionMethod 等） | ✅ 需要       | 新文件需要注册路径 |
| 修改现有文件添加 @InsightIntentPage 装饰器                   | ❌ 无需       | 页面路由已注册     |
| 修改现有文件添加 @InsightIntentLink 装饰器                   | ❌ 无需       | URI 链接无需注册   |

**核心规则：只有新增文件时才需要配置 insight_intent.json，修改现有文件无需配置。**

## 🔴 配置格式关键提醒（仅新增文件时）

**写入 insight_intent.json 时，必须严格使用以下格式：**
```json
{
  "insightIntentsSrcEntry": [
    {
      "srcEntry": "./ets/insightintents/YourIntent.ets"
    }
  ]
}
```

| 格式       | 正确性 | 示例                          |
| :--------- | :----- | :---------------------------- |
| 对象格式   | ✅ 正确 | `{ "srcEntry": "./ets/..." }` |
| 字符串格式 | ❌ 错误 | `"./ets/..."`                 |

## 询问流程

**生成代码后，必须使用 AskUserQuestion 工具询问用户是否将代码写入文件。**

根据代码实现方式的不同，提供不同的询问选项：

### 场景一：代码实现在新增文件中

当意图代码需要创建新文件时，使用以下询问格式：

```text
标题: "是否将意图代码写入文件？"
选项:
  - "写入新文件并更新配置" - 在 entry/src/main/ets/insightintents/ 目录下创建新的 .ets 文件，并更新 insight_intent.json
  - "手动复制并更新配置" - 不写入文件，由用户手动复制代码并更新 insight_intent.json
  - "不写入"
```

**操作步骤（用户选择"写入新文件并更新配置"）：**

1. **创建意图文件**
   - 路径：`entry/src/main/ets/insightintents/{IntentName}Intent.ets`
   - 命名格式：`{IntentName}Intent.ets`（如 `StartRecordingIntent.ets`）
2. **更新 insight_intent.json**
   - 详细配置说明必须参考 [write_config_file.md](write_config_file.md)
3. **提示调测方式**
   - 文件写入完成后，输出调测提示："可通过意图调试工具https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/insight-intent-debug调测意图。

### 场景二：代码实现在原文件中

当意图代码需要修改现有文件时，使用以下询问格式：

```text
标题: "是否将意图代码写入文件？"
选项:
  - "修改现有文件" - 写入到已有的意图文件中
  - "手动复制" - 不写入文件，由用户手动复制代码
  - "不写入"
```

**操作步骤（用户选择"修改现有文件"）：**

1. 读取该文件并进行修改
2. **注意**：修改现有文件时无需更新 insight_intent.json
3. **提示调测方式**
   - 文件写入完成后，输出调测提示："可通过意图调试工具https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/insight-intent-debug调测意图。

## 注意事项

### insight_intent.json 配置（仅新增文件时需要）

详细配置说明、路径格式要求和常见错误请参考 [write_config_file.md](https://./write_config_file.md)

## 文件操作规范

### 文件存在性检查（⚠️ 必须执行）

**创建新文件前，必须先检查是否已存在同名文件：**

```typescript
// 使用 Glob 工具检查
// 例如：检查 GlobalContext 是否存在
Glob(pattern: '**/GlobalContext.*', path: 'entry/src/main/ets')
```

**检查结果处理：**

- **已存在**：直接使用现有文件，不要重复创建
- **不存在**：按照项目风格创建新文件

### 文件类型选择原则

| 文件类型 | 适用场景                     | 示例                                  |
| :------- | :--------------------------- | :------------------------------------ |
| `.ts`    | 工具类、数据模型、纯逻辑代码 | `GlobalContext.ts`、`DateTimeUtil.ts` |
| `.ets`   | UI 组件、页面、自定义对话框  | `Index.ets`、`CustomDialog.ets`       |

**⚠️ 关键规则：**

- `.ts` 文件**不能**导入 `.ets` 文件
- `.ets` 文件**可以**导入 `.ts` 文件
- 工具类优先使用 `.ts`，避免被 UI 文件导入时出错

### 导入路径规范

**使用相对路径，不要使用绝对路径：**

```typescript
// ✅ 正确：相对路径
import { GlobalContext } from './utils/GlobalContext';
import { DateTimeUtil } from '../utils/DateTimeUtil';

// ❌ 错误：绝对路径
import { GlobalContext } from '/entry/src/main/ets/pages/utils/GlobalContext';
```

**保持与项目现有导入风格一致：**

- 如果项目使用 `import { xxx } from '@kit.xxx'`，则保持一致
- 如果项目使用 `import xxx from '@ohos.xxx'`，则保持一致

### 修改现有文件前的预检查

修改已有页面或工具类前，必须执行以下预检查：

1. **变量初始化时序**：检查变量是否有合理的初始值（空字符串优于 `'-1'`）
2. **异步操作顺序**：确认生命周期钩子（如 `aboutToAppear`）与组件加载回调的顺序
3. **条件判断有效性**：避免将特殊值（如 `'-1'`、`'0'`）误判为有效状态

**示例：**

```typescript
// ❌ 危险：初始值为特殊字符串，条件判断会误判
private surfaceId: string = '-1';
if (this.surfaceId) { // 总是为 true，但值无效
  openCamera(this.surfaceId);
}

// ✅ 安全：使用空字符串，并显式检查
private surfaceId: string = '';
if (this.surfaceId && this.surfaceId !== '') {
  openCamera(this.surfaceId);
}
```