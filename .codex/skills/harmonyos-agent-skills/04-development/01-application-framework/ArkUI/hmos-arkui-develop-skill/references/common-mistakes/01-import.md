## 1. import 路径和模块错误

AI 最常犯的一类错误，出现频率极高。

| ❌ AI 常见错误 | ✅ 正确写法 | 规则章节 |
|--------------|-----------|---------|
| `import router from '@ohos.router'` | `import { router } from '@kit.ArkUI'` | 规则第20节 模块导入约束 |
| `import promptAction from '@ohos.promptAction'` | `import { PromptAction } from '@kit.ArkUI'` 或通过 UIContext | 规则第20节 模块导入约束 |
| `import { BusinessError } from '@ohos.base'` | `import { BusinessError } from '@kit.BasicServicesKit'` | 规则第20节 模块导入约束 |
| `import { hilog } from '@kit.ArkUI'` | `import { hilog } from '@kit.PerformanceAnalysisKit'` | 规则第20节 模块导入约束 |
| `import { image } from '@kit.ArkUI'` | `import { image } from '@kit.ImageKit'` | 规则第20节 模块导入约束 |
| `import { UIAbility } from '@kit.ArkUI'` | `import { UIAbility } from '@kit.AbilityKit'` | 规则第20节 模块导入约束 |
| 捏造不存在的 import 路径或符号 | 必须通过检索确认，不凭记忆编造 | 规则第20节 模块导入约束 |

**根因**：AI 训练数据中混有旧版 `@ohos.*` 导入，或凭记忆猜测 kit 归属。生成代码前必须检索确认 import 路径。
