## 20. 模块导入（import）约束

### 20.1 import 规则

| 规则 | 说明 |
|------|------|
| **禁止使用 `@ohos.*` 路径导入** | `@ohos.*` 为旧版导入路径，**必须使用 `@kit.*` 替代**。例如 `import router from '@ohos.router'` → `import { router } from '@kit.ArkUI'` |
| **禁止凭记忆编造 import** | 导入语句中的模块路径和导出符号必须来自检索结果，不得猜测 |
| **禁止遗漏必要的 import** | 代码中使用的所有外部类型/函数/枚举必须在文件顶部有对应的 import 声明 |
| **禁止 import 未使用的模块** | 导入了但在代码中未使用的模块必须删除 |
| **禁止从错误 kit 导入** | 每个 API 只属于一个 kit，不能从错误的 kit 导入（参考下方速查表） |

### 20.2 Kit 导入速查表

根据代码中使用的功能，按以下表格确定正确的 import 语句：

#### @kit.ArkUI（UI 开发核心 kit）

```ts
import {
  UIContext, window, BuilderNode, FrameNode, NodeController,
  ComponentContent, NodeContent, NodeRenderState,
  LengthMetrics, ColorMetrics, matrix4, curves,
  router, PromptAction, ImageModifier, KeyboardAvoidMode,
  Font, uiObserver, UIUtils,
  Theme, ThemeControl, CustomColors, CustomTheme,
  CircleShape, RectShape, EllipseShape, PathShape, Binding
} from '@kit.ArkUI';
```

| 使用场景 | 导入符号 |
|---------|---------|
| UI 上下文操作 | `UIContext` |
| 窗口管理 | `window` |
| 自定义节点 | `BuilderNode`, `FrameNode`, `NodeController` |
| 自定义内容 | `ComponentContent`, `NodeContent` |
| 节点渲染状态 | `NodeRenderState` |
| 尺寸/颜色度量 | `LengthMetrics`, `ColorMetrics` |
| 矩阵变换 | `matrix4` |
| 动画曲线 | `curves` |
| 页面路由 | `router` |
| 弹窗提示 | `PromptAction` |
| 图片属性修改器 | `ImageModifier` |
| 键盘避让模式 | `KeyboardAvoidMode` |
| 自定义字体 | `Font` |
| UI 观察者 | `uiObserver` |
| V1/V2 兼容工具 | `UIUtils` |
| 主题相关 | `Theme`, `ThemeControl`, `CustomColors`, `CustomTheme` |
| Shape 裁切 | `CircleShape`, `RectShape`, `EllipseShape`, `PathShape` |
| 数据绑定 | `Binding` |

#### @kit.AbilityKit（应用模型 kit）

```ts
import {
  UIAbility, AbilityConstant, Want,
  common, Configuration, ConfigurationConstant,
  bundleManager
} from '@kit.AbilityKit';
```

| 使用场景 | 导入符号 |
|---------|---------|
| Ability 生命周期 | `UIAbility`, `AbilityConstant` |
| Ability 间通信 | `Want` |
| 获取上下文类型 | `common`（如 `common.UIAbilityContext`） |
| 配置变更 | `Configuration`, `ConfigurationConstant` |
| 包管理 | `bundleManager` |

#### @kit.BasicServicesKit（基础服务 kit）

```ts
import { BusinessError, request, commonEventManager } from '@kit.BasicServicesKit';
```

| 使用场景 | 导入符号 |
|---------|---------|
| 错误类型捕获 | `BusinessError` |
| 网络下载 | `request` |
| 公共事件 | `commonEventManager` |

#### 其他 kit

| Kit | 导入符号 | 使用场景 |
|-----|---------|---------|
| `@kit.ArkData` | `unifiedDataChannel`, `uniformTypeDescriptor` | 拖拽数据传递（UTD） |
| `@kit.ImageKit` | `image` | 图片处理（编解码、缩放等） |
| `@kit.InputKit` | `pointer`, `IntentionCode` | 光标样式、输入设备 |
| `@kit.ArkGraphics2D` | `uiEffect` | 模糊效果等图形能力 |
| `@kit.CoreFileKit` | `fileIo` | 文件读写 |
| `@kit.ArkTS` | `buffer` | 二进制缓冲区 |
| `@kit.PerformanceAnalysisKit` | `hilog` | 日志输出 |

### 20.3 常见 import 错误对照

| ❌ 错误写法 | ✅ 正确写法 |
|-----------|-----------|
| `import router from '@ohos.router'` | `import { router } from '@kit.ArkUI'` |
| `import window from '@ohos.window'` | `import { window } from '@kit.ArkUI'` |
| `import promptAction from '@ohos.promptAction'` | `import { PromptAction } from '@kit.ArkUI'`（或通过 UIContext 获取） |
| `import { BusinessError } from '@ohos.base'` | `import { BusinessError } from '@kit.BasicServicesKit'` |
| `import { UIAbility } from '@kit.ArkUI'` | `import { UIAbility } from '@kit.AbilityKit'` |
| `import { hilog } from '@kit.ArkUI'` | `import { hilog } from '@kit.PerformanceAnalysisKit'` |
| `import { image } from '@kit.ArkUI'` | `import { image } from '@kit.ImageKit'` |

### 20.4 不需要 import 的内置能力

以下能力是 ArkTS 全局内置的，**不需要 import 即可使用**：

| 能力 | 示例 |
|------|------|
| 基础组件 | `Column`, `Row`, `Text`, `Button`, `Image`, `List`, `Grid`, `Scroll`, `Stack`, `Flex`, `Tabs`, `Navigation`, `NavDestination` 等 |
| 通用属性 | `.width()`, `.height()`, `.margin()`, `.padding()`, `.onClick()`, `.backgroundColor()` 等 |
| 基础枚举 | `Color`, `FontWeight`, `Curve`, `FlexAlign`, `HorizontalAlign`, `VerticalAlign` 等 |
| 装饰器 | `@Entry`, `@Component`, `@ComponentV2`, `@State`, `@Local`, `@Prop`, `@Param`, `@Builder`, `@Extend`, `@Styles` 等 |
| 全局 UI 方法 | `animateTo`, `vp2px`, `px2vp` 等（但建议通过 UIContext 调用） |
| 弹窗组件 | `AlertDialog`, `ActionSheet`, `DatePickerDialog`, `TimePickerDialog`, `TextPickerDialog`（但建议通过 UIContext 调用） |
| 状态类型 | `LocalStorage`, `PersistentStorage`, `AppStorage` |

## 常见错误

- **凭记忆编造 import 路径或导出符号**：AI 会"猜"模块名和符号名（如编造不存在的 kit 路径），导入语句必须来自检索结果，不得猜测
- **遗漏必要 import**：使用了外部类型/函数/枚举但文件顶部缺少对应 import 声明
- **import 了未使用的模块**：导入了但在代码中未使用，导致编译警告
- **根因**：AI 训练数据中 `@ohos.*` 旧版导入路径的示例仍大量存在，导致倾向使用已废弃的旧路径而非 `@kit.*`

---
