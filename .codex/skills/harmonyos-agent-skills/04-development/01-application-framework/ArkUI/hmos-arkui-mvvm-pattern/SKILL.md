---
name: "hmos-arkui-mvvm-pattern"
description: "HarmonyOS ArkUI 的 MVVM 架构技能。适用于：(1) 项目分层设计 Model/ViewModel/View (2) 目录结构规划 (3) 组件职责与数据流规范 (4) 视图架构检视以及整改项目为MVVM模式等场景"
---

# ArkUI MVVM架构模式

## 使用时机

当用户请求如下操作时，使用此技能：

- 在ArkUI中添加或重构功能，并要求保持架构简洁。
- 创建或改进视图模型，并将逻辑从视图中移出。
- 修复状态管理混乱的问题。
- 提升可测试性，通过拆分关注点来减少"庞大的视图模型"。
- 将已有项目整改为 MVVM 架构。

## 核心规则

1. **维持当前项目版本**：除非开发者明确表示迁移至V2，默认维持当前状态管理的版本，避免V1与V2混用
2. **单向数据流 (UDF)**：数据向下流动 Model → ViewModel → View，事件向上传递 View → ViewModel → Model
3. **单一数据源 (SSOT)**：数据修改只发生在数据层，ViewModel 是 UI 状态的唯一来源
4. **View 禁止直接访问 Model**：必须通过 ViewModel 间接访问
5. **减少 AppStorage使用**：不到万不得已不使用 AppStorage/AppStorageV2，ViewModel 应直接持有状态
6. **V1 @Observed + @Track 与 getter 不能共存**：V1 的 `@Observed` 类中，如果使用了 `@Track` 装饰属性，则不能在该类中定义 `get` 访问器（getter），否则运行时会闪退。getter 在 V1 `@Observed` 中必须与无 `@Track` 的类配合使用
7. **View 通过 ViewModel 类型访问数据**：View/Page 层禁止 import Model 类型。每种列表项都应有对应的 `@Observed` ViewModel 类（如 `CardViewModel`、`MessageItemViewModel`），在 ViewModel 层完成 Model → ViewModel 的转换。View 的 ForEach 回调中只能出现 ViewModel 类型，不出现 Model 接口类型

### 保持当前项目版本

接手一个项目时，先判断它用的是 V1 还是 V2，再决定后续操作：

**快速检测**：搜索项目中任意一个 `.ets` 文件，看 `@Component` 还是 `@ComponentV2`。如果项目中两者都有，说明已经混用，需要确定以哪个为主再统一。

### 状态变量原则

新建和整改都遵循。业界通称**状态提升**（State Hoisting）：状态就近持有，按需上提。

遇到一个状态变量时，按以下顺序判断归属：

```
这个值能从已有属性计算出来吗？
├─ 能 → 不存储，用 @Computed（V2）或 getter（V1）
│        例：canSubmit = inputContent.length === 11 && password.length > 0
│
└─ 不能，是独立数据源
    ├─ 只有一个组件关心？
    │   └─ 视图私有 → @Local（V2）/ @State（V1）
    │        例：Sheet 显示/隐藏、动画进度、输入框光标位置
    │
    ├─ 多个组件需要，但只涉及 UI 展示逻辑？
    │   └─ 提升到最近公共祖先 → 通过 @Param（V2）/ @Prop（V1）向下传递
    │        例：当前 Tab 索引（TabBar 和内容区都需要）、折叠/展开状态
    │
    └─ 涉及业务逻辑或数据访问？
        └─ ViewModel 属性 → @Trace（V2）/ @Track（V1）
             例：isLogin、isLoading、表单输入、列表数据
```

| 原则           | 说明                                                         | 反例（避免）                                         |
| -------------- | ------------------------------------------------------------ | ---------------------------------------------------- |
| 派生不存储     | 能从已有状态计算出的值，用 @Computed 或 getter，不存为独立字段 | 存 `allowClick: boolean` 再手动同步                  |
| 就近持有       | 状态放在最小的使用范围内，不提前上提                         | 只有一个组件用的 `isShowSheet` 放进 ViewModel       |
| 单一来源       | 同一份数据只在一个地方被管理，其他地方通过引用或 getter 获取 | `inputContent` 同时在 Page 和 ViewModel 各存一份    |
| 提升到公共祖先 | 多组件共享的状态放在它们最近公共祖先中，而非直接跳到 ViewModel | 兄弟组件共用的 `selectedIndex` 直接放进 ViewModel    |

### 代码文件原则

遇到"这段代码放哪个目录"时，依次回答：

```
1. 有业务数据实体吗？（用户、商品、订单）
   → 有 → Model（实体类 + Repository）

2. 有 UI 状态需要驱动渲染吗？
   → 有 → ViewModel（@Observed/@ObservedV2 属性）

3. 都没有，只是纯逻辑或系统能力封装？
   → 是 → Utility（common/ 或 util/）
```

| 误判 | 正确归属 | 原因 |
|------|---------|------|
| 网络监听封装放 model/ | **util/** | 没有对应业务数据实体，是系统能力封装 |
| 表单验证逻辑放 model/ | **ViewModel** | 验证的是 UI 输入，不是业务数据规则 |
| API 响应解析放 viewmodel/ | **Model Repository** | 数据转换属于数据层 |
| 全局常量放 model/ | **common/** | 无业务含义，纯配置 |
| 密码加密放 viewmodel/ | **util/** | 纯算法，无 UI 状态 |

### 目录结构推荐

```
ets/
├── model/           # 数据模型 + Repository
│   ├── TaskModel.ets
│   └── TaskRepository.ets
├── viewmodel/       # 视图模型
│   └── TaskListViewModel.ets
├── views/           # 业务组件
│   ├── TaskItem.ets
│   └── TaskListView.ets
├── pages/           # 页面入口
│   └── TaskPage.ets
├── utils/           # 工具类（纯逻辑、系统能力封装）
│   └── NetworkUtil.ets
└── common/          # 通用常量、通用组件
    └── Constants.ets
```

| 目录 | 判断依据 | 典型内容 |
|------|---------|---------|
| model/ | 有业务数据实体 | UserModel、OrderRepository |
| viewmodel/ | 有 UI 状态驱动渲染 | LoginViewModel、AuthViewModel |
| views/ | 可复用业务组件 | TaskListView、AddressPicker |
| pages/ | 页面入口，只做组装 | Index、Login |
| utils/ | 无状态、纯逻辑 | NetworkMonitor、DateHelper |
| common/ | 通用常量 | CommonConstants |

## 实现工作流：新建功能

适用于从零开始构建新页面或新模块。

### 0. 识别状态分类

按照 [状态变量原则](#状态变量原则) 的决策树判断每个变量的归属。

### 1. 定义 Model

根据 [代码文件原则](#代码文件原则) 判断每段代码的归属。Model 只含纯数据结构和数据访问逻辑。

注意：这里的model不能有`@Observed`等装饰以及使用任何状态管理相关的内容，应该都是通用的纯业务逻辑。

```
model/
├── UserModel.ets          实体类：纯数据结构，无装饰器
├── TaskModel.ets          实体类：interface 或 class
└── UserRepository.ets     仓库类：封装数据源访问
    ├── fetchUser()        网络请求
    ├── saveLocal()        本地存储
    └── parseResponse()    数据转换
```

### 2. 创建 ViewModel

**每个 ViewModel 对应一个 UI 关注点**，不是每个页面一个，也不是一个管全部：

```
viewmodel/
├── LoginViewModel.ets     登录表单状态 + 验证逻辑
├── AuthViewModel.ets      全局认证状态（单例，跨页面共享）
└── CartViewModel.ets      购物车状态 + 操作逻辑
```

| 划分原则 | 示例 |
|----------|------|
| 一个页面有一个主 ViewModel | LoginPage → LoginViewModel |
| 跨页面共享的状态独立为单例 ViewModel | 登录状态 → AuthViewModel |
| 复杂组件可有自己的 ViewModel | 地址选择器 → AddressPickerViewModel |
| 不要把所有逻辑塞进一个"上帝 ViewModel" | ✗ AppViewModel 管一切 |

**ViewModel 包含什么**：

```
├── UI 状态属性（驱动渲染）     isChecked、loadState、taskList
├── UI 逻辑方法（输入验证）     validate()、updateInput()
├── 协调方法（调 Model，更新状态） loadTasks()、login()
└── 不包含                     UI 组件引用、系统 API 直接调用
```

**异步数据状态**用 `LoadState` 枚举 + 独立数据字段：

```typescript
// ✓ loadState 枚举保证阶段互斥，数据字段独立持有保持 @Trace 粒度
export enum LoadState {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

@Trace loadState: LoadState = LoadState.Idle
@Trace taskList: TaskModel[] = []
@Trace errorMessage: string = ''
```

原因：`@Trace` 按属性独立追踪，独立字段比单对象嵌套渲染粒度更细。

| 步骤 | V2 | V1 |
|------|----|----|
| 类装饰器 | `@ObservedV2` | `@Observed` |
| 属性观测 | `@Trace` | 无（第一层自动）/ `@Track`（精确） |
| 状态监听 | `@Monitor` | `@Watch` |
| 计算属性 | `@Computed` | 无（手动实现 getter） |

### 3. 实现 View

| 步骤 | V2 | V1 |
|------|----|----|
| 组件装饰器 | `@ComponentV2` | `@Component` |
| 接收数据 | `@Param` | `@Prop`（单向）/ `@Link`（双向） |
| 输出事件 | `@Event` | `@Link` 或回调 |

View 只依赖 ViewModel，保持精简。

### 4. 组装 Page

Page 作为入口，创建 ViewModel 实例并传递给 View。Page 不含业务逻辑。

### 5. 编译验证

编写完成后必须执行编译，排查引入的错误：

1. 调用 `check_ets_files` 对修改过的 `.ets` 文件进行静态检查
2. 如有报错，修复后重新检查，直到全部通过
3. 必要时调用 `build_project` 做完整构建验证

## 整改工作流：已有项目重构为 MVVM

适用于已有代码需要整改为 MVVM 架构。**逐页面推进，每改完一个 Page 就验证功能不变。**

### 0. 确定整改顺序

按风险由低到高排序：

```
1. 纯展示页面（只读，无交互）→ 最安全
2. 简单表单页（有提交，无复杂状态）
3. 列表页（有增删改，状态较复杂）
4. 多 Tab / 嵌套导航页（跨组件状态共享）
```

### 1. 扫描现状

识别目标页面中违反 MVVM 的问题：

| 检查项 | 排查方式 |
|--------|---------|
| Page 中包含业务逻辑 | Page struct 内有数据处理、API 调用、状态计算 |
| View 直接访问 Model | View 文件 import 了 model/ 目录 |
| 状态管理混乱 | 同一份数据在多处被 `@State` 管理 |
| 组件职责不清 | 一个 struct 同时承担数据获取、业务计算和 UI 渲染 |

参考 [anti-patterns.md](references/anti-patterns.md) 逐项对照。

### 2. 提取 ViewModel

从 Page/View 中剥离状态和逻辑，创建 ViewModel 类：

```
原始 Page 中的代码：
├─ @State xxx → 移入 ViewModel，加观测装饰器
├─ 业务方法（数据处理、计算）→ 移入 ViewModel
├─ API / 数据库调用 → 移入 Repository（Model 层）
└─ 纯 UI 状态（如选中标签）→ 保留在 Page/View 中
```

**操作顺序**：
1. 新建 ViewModel 文件，声明类和属性（不加装饰器）
2. 将 Page 中的 `@State` 变量和业务方法搬迁过来
3. 给 ViewModel 属性加上观测装饰器（`@Trace`/`@Observed`）
4. Page 中改为持有 ViewModel 实例，通过方法调用

### 3. 分离 Model

根据 [代码文件原则](#代码文件原则) 逐项判断 ViewModel/View 中的代码归属：

```
ViewModel 中的代码：
├─ http.createHttp().request(...) → 移入 Repository
├─ preferences.get(...)          → 移入 Repository
├─ 数据结构定义（interface/class）→ 移入 Model 文件
├─ 纯算法、系统能力封装           → 移入 util/
└─ 纯业务逻辑（过滤、排序、计算）→ 保留在 ViewModel
```

### 4. 重组 View

将 Page 瘦身为纯组装角色：

```
整改后的 Page：
├─ 创建 ViewModel 实例（@Local/@State）
├─ aboutToAppear 中调用 ViewModel 初始化方法
└─ build() 中只做布局和子组件组装

整改后的 View：
├─ 通过 @Param/@Prop 接收 ViewModel 数据
├─ 通过 @Event/回调 向上传递用户操作
└─ 不直接 import Model 文件
```

### 5. 逐页验证

每完成一个页面的整改，立即验证：

1. 调用 `check_ets_files` 对修改过的 `.ets` 文件进行静态检查，修复报错直到通过
2. 必要时调用 `build_project` 做完整构建验证
3. 逐项检查数据流合规性：

| 验证项 | 方式 |
|--------|------|
| 功能不变 | 手动测试页面所有交互 |
| 数据流合规 | View 不直接访问 Model，事件通过 ViewModel 传递 |
| 装饰器配套 | V1/V2 未混用 |
| 无冗余状态 | 同一份数据只在一处管理 |

验证通过后再推进下一个页面。

## 参考文件

根据当前任务选择加载：

| 文件 | 内容 | 何时读取 |
|------|------|----------|
| [references/anti-patterns.md](references/anti-patterns.md) | 架构反模式（4项）+ 快速扫描清单 | 整改工作流步骤1扫描现状时 |
| [references/v1-nested-observation.md](references/v1-nested-observation.md) | V1 嵌套类观测 @Observed + @ObjectLink 四种场景 | V1 项目遇到嵌套对象/数组观测问题时 |
| [references/v1-v2-mapping.md](references/v1-v2-mapping.md) | V1/V2 数组更新行为差异 + 装饰器配套规则 | 处理 V1 数组 push/splice 不触发更新、检查混用时 |
| [references/v2-advanced.md](references/v2-advanced.md) | AppStorageV2/PersistenceV2 API 签名与选择 | V2 项目使用全局状态时 |
| [references/multi-module.md](references/multi-module.md) | 三层架构 + 多模块 + 多设备 MVVM | 多模块工程、跨模块数据共享、多设备部署时 |
| [templates/V1MVVM/](templates/V1MVVM/) | V1 MVVM 完整代码模板（@Component + @Observed） | 项目使用 V1，编写代码时作为参考 |
| [templates/V2MVVM/](templates/V2MVVM/) | V2 MVVM 完整代码模板（@ComponentV2 + @ObservedV2） | 项目使用 V2，编写代码时作为参考 |
