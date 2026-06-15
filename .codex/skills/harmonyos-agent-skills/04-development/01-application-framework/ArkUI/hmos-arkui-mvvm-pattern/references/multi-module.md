# 多模块工程 MVVM 架构

适用于包含多个 HAR/HSP 的复杂工程，基于华为官方推荐三层架构。

## 官方三层架构

```
/application
├── common/                  # 公共能力层（可拆为多个 HAR/HSP）
│   ├── common-model/        # 数据实体 + Repository（通用的业务数据）
│   │   └── src/main/ets/
│   │       ├── model/       # 通用的UserModel、ProductModel、OrderModel
│   │       └── repository/  # 通用的UserRepository、ProductRepository
│   ├── common-base/         # 最底层基础设施
│   │   └── src/main/ets/
│   │       └── utils/       # 网络封装、存储封装、日志
│   ├── common-ui/           # 通用 UI 组件
│   │   └── src/main/ets/
│   │       └── components/  # Button、Dialog、Loading
│   └── common-util/         # 通用数据与常量
│       └── src/main/ets/
│           └── nertwork/   # 网络工具
│
├── features/                # 基础特性层（Feature）
│   ├── feature-auth/        # 登录/注册
│   │   └── src/main/ets/
│   │       ├── model/       # feature 独有 Model（如 LoginRequest）
│   │       ├── viewmodel/   # LoginViewModel
│   │       └── views/       # LoginPage
│   ├── feature-cart/        # 购物车
│   │   └── src/main/ets/
│   │       ├── model/       # feature 独有 Model（如 CartItem）
│   │       ├── viewmodel/   # CartViewModel
│   │       └── views/       # CartPage
│   ├── feature-order/       # 订单
│   │   └── src/main/ets/
│   │       ├── model/       # feature 独有 Model（如 OrderDetail）
│   │       ├── viewmodel/   # OrderViewModel
│   │       └── views/       # OrderPage
│   └── feature-shared/      # 跨 feature 业务逻辑
│       └── src/main/ets/
│           └── commonlogic/       # 价格计算、权限判断、筛选逻辑
│
└── products/                # 产品定制层（Product）
    ├── default/             # 默认设备（手机/平板）— Entry HAP
    │   └── src/main/ets/
    │       └── pages/
    └── wearable/            # 智能穿戴 — Entry HAP
        └── src/main/ets/
            └── pages/
```

### 各层职责

| 层 | 模块类型 | 职责 | 典型内容 |
|----|---------|------|---------|
| 产品定制层 | Entry HAP | 设备适配、页面入口、组装特性模块 | Index、MainAbility、设备专属布局 |
| 基础特性层 | HAR/HSP/Feature HAP | 独立业务功能，含 ViewModel + View | 登录模块、购物车模块、订单模块 |
| 公共特性 | HAR/HSP | 跨 feature 的业务逻辑（不含 Model） | 价格计算、权限判断、筛选逻辑 |
| 公共能力层 | HAR/HSP | 数据模型 + Repository + 基础设施 | UserModel、网络库、通用组件、常量 |

### Model 放哪里

```
这个 Model 被谁用？
├─ 只有一个 feature 用（如 CartItem、SearchFilter）
│   └─ 留在那个 feature/model/ 内
│
└─ 多个 feature 都会用到（如 UserModel、ProductModel）
    └─ 放 common-model/
```

**跨 feature 共享的 Model 统一放 common-model**，这是大厂普遍做法：

| 原因 | 说明 |
|------|------|
| 共享 Model 天然被复用 | UserModel 在首页、个人中心、购物车都要用 |
| 避免 feature 间依赖 | CartItem 引用 ProductModel，如果 ProductModel 在另一个 feature 里就产生循环依赖 |
| API 响应结构是全局的 | 后端一个接口的数据结构，前端不应每个 feature 各定义一份 |
| 大型项目验证 | Google Now in Android、主流大厂均采用 `core-model` 集中管理 |

**feature 独有的 Model 不上提**，避免 common-model 成为万能桶。

### common 拆分策略

common 层按职责拆为多个 HAR/HSP，各自独立演进：

| 子模块 | 职责 | 打包建议 |
|--------|------|---------|
| common-model | 数据实体 + Repository | HSP（跨 feature 共享同一实例，状态一致） |
| common-base | 最底层工具（网络、存储、日志） | HSP（被所有模块依赖，共享实例） |
| common-ui | 通用 UI 组件（Button、Dialog） | HAR（各 feature 独立编译，无状态共享需求） |
| common-data | 常量、类型定义、配置 | HAR（纯数据，无运行时状态） |

拆分原则：先放一个 common，随着体量增长再按职责拆分，避免过早拆分导致模块过多。

### feature-shared 的定位

feature-shared 只放**跨 feature 的业务逻辑**，不放 Model：

| 放 | 不放 |
|----|------|
| 价格计算逻辑 | UserModel |
| 权限判断逻辑 | ProductRepository |
| 通用筛选/排序逻辑 | API 响应结构 |
| 跨 feature 的业务规则 | 数据实体定义 |

### 依赖方向（严格单向）

```
products  →  features  →  common-model  ↘
                      →  common-ui     → common-base
                      →  common-data  ↗
                 ↕
         feature → feature-shared → common-model → common-base
```

| 规则 | 说明 |
|------|------|
| products 不可横向调用 | wearable 不能直接依赖 default |
| products 只依赖 features 和 common | 不跳层依赖 |
| features 之间禁止直接依赖 | feature-auth 不能依赖 feature-cart |
| feature-shared 不能反向依赖其他 feature | 否则循环依赖，编译失败 |
| features 可依赖 common | 引用 Model、使用公共工具和组件 |
| common 不依赖任何上层 | 纯被依赖 |

## HAR vs HSP 选择

| 维度 | HAR（静态共享库） | HSP（动态共享库） |
|------|-------------------|-------------------|
| 编译 | 编译到每个使用方，独立实例 | 运行时共享，单实例 |
| App Size | 多份拷贝，体积较大 | 共享一份，体积更小 |
| 加载速度 | 无运行时加载开销 | 首次加载有轻微开销 |
| 状态共享 | **不共享**，各 HAP 独立实例 | **共享**，同一进程同一实例 |
| 适用场景 | 独立特性模块、无状态共享需求 | 公共能力层、需要状态共享的场景 |

**注意**：如果同一个 HAR 同时被 HAP 和 HSP 引用，HAR 的单例会失效（分属不同加载上下文）。需要单例保证的场景应使用 HSP。

### 特性模块形态选择

```
这个 feature 怎么打包？
├─ 只有单一产品使用，且 App Size 不敏感
│   └─ HAR（编译隔离，独立实例）
│
├─ 多个产品都使用（手机版 + 穿戴版共用）
│   └─ HSP（共享实例，减小体积）
│
└─ 需要独立分发或按设备动态加载
    └─ Feature HAP（独立 ABU，动态安装）
```

## MVVM 在三层架构中的映射

```
                    MVVM 分层
产品定制层           ──  无（纯组装）
基础特性层           ──  ViewModel + View + feature 独有 Model
公共能力层           ──  共享 Model（数据实体 + Repository）+ 通用 View 组件
```

### ViewModel 归属

ViewModel **始终留在 feature 内部**，不放入 common 和 feature-shared：

```typescript
// ✓ 正确：feature 含 Model（独有）+ ViewModel + View
features/feature-cart/
├── model/
│   └── CartItem.ets            // feature 独有的 Model
├── viewmodel/
│   └── CartViewModel.ets       // 引用 common-model 的 ProductModel + 本地 CartItem
└── views/
    └── CartPage.ets

// common-model 放跨 feature 共享的数据实体和仓库
common/common-model/
├── model/
│   ├── UserModel.ets           // 多个 feature 共用
│   └── ProductModel.ets        // 购物车、订单、搜索都引用
└── repository/
    └── UserRepository.ets

// feature-shared 只放业务逻辑，不放 Model
features/feature-shared/
└── logic/
    └── PriceCalculator.ets     // 价格计算，引用 common-model 的 ProductModel
```

**原则**：跨 feature 共享的 Model 放 common-model → feature 独有的 Model 留在 feature 内 → 业务逻辑跨 feature 复用时放 feature-shared → ViewModel 和 View 留在各 feature 内。

## 跨模块数据共享

不同 feature 的 ViewModel 需要通信时（如登录状态影响购物车）：

### 方式一：AppStorageV2（V2 项目推荐）

全局状态类定义在 **feature-shared** 中（不含 common-model，因为 common-model 只放纯数据），各 feature 的 ViewModel 通过 `AppStorageV2.connect` 共享同一实例：

```typescript
// feature-shared/commonlogic/AuthState.ets — 全局状态定义（UI 状态，不是数据实体）
@ObservedV2
export class AuthState {
  @Trace isLoggedIn: boolean = false;
  @Trace userId: string = '';
}

// feature-auth 的 AuthViewModel 中修改
@ObservedV2
export class AuthViewModel {
  @Local authState: AuthState = AppStorageV2.connect(AuthState, 'auth', () => new AuthState())!;

  login(userId: string) {
    this.authState.isLoggedIn = true;
    this.authState.userId = userId;
  }
}

// feature-cart 的 CartViewModel 中读取同一实例
@ObservedV2
export class CartViewModel {
  @Local authState: AuthState = AppStorageV2.connect(AuthState, 'auth', () => new AuthState())!;

  loadCart() {
    if (this.authState.isLoggedIn) {
      this.loadUserCart(this.authState.userId);
    }
  }
}
```

### 方式二：App 层回调桥接（V1 项目）

products 层作为中间协调者，持有各 feature 的 ViewModel，通过回调桥接：

```typescript
// products/default/pages/Index.ets
@Entry
@Component
struct Index {
  @State authVM: AuthViewModel = new AuthViewModel();
  @State cartVM: CartViewModel = new CartViewModel();

  aboutToAppear() {
    this.authVM.onLoginSuccess = (userId: string) => {
      this.cartVM.loadCart(userId);
    };
    this.authVM.onLogout = () => {
      this.cartVM.clearCart();
    };
  }
}
```

## 跨模块导航

使用 `Navigation` + 路由表，各 feature 注册自己的路由，导航时不直接 import 目标页面：

```typescript
// products/default/pages/Index.ets
NavDestinationMap: Record<string, () => void> = {
  'AuthLogin': () => import('../../../features/feature-auth/views/LoginPage'),
  'CartDetail': () => import('../../../features/feature-cart/views/CartDetailPage'),
}
```

## 多设备部署

### 部署模型

| 模型 | 说明 | 适用场景 |
|------|------|---------|
| Model A | 同一 Entry HAP 部署到所有设备 | 设备差异小，UI 通过响应式布局适配 |
| Model B | 不同设备使用不同 Entry HAP | 设备差异大（手机 vs 手表），需要独立 UI |

```
Model A:  products/default/  →  手机 + 平板 + 2in1（一套 HAP）

Model B:  products/default/  →  手机 + 平板
          products/wearable/ →  智能穿戴
```

### 多设备工程结构示例

```
/application
├── common/                         # 公共能力，HSP
├── features/
│   ├── feature-auth/               # HAR，手机和穿戴共用逻辑
│   │   └── src/main/ets/
│   │       ├── viewmodel/          # 共享业务逻辑
│   │       └── views/
│   └── feature-health/             # 穿戴专属特性
│       └── src/main/ets/
│           ├── viewmodel/
│           └── views/
└── products/
    ├── default/                    # 手机/平板 Entry HAP
    │   └── src/main/
    │       ├── ets/pages/
    │       └── resources/
    │           ├── base/           # 默认资源
    │           └── tablet/         # 平板专属资源
    └── wearable/                   # 穿戴 Entry HAP
        └── src/main/
            ├── ets/pages/
            └── resources/
                └── wearable/      # 穿戴专属资源
```

### 多设备适配要点

| 维度 | 策略 | 说明 |
|------|------|------|
| 布局 | 响应式布局（BreakpointSystem） | 产品定制层通过断点切换布局 |
| 资源 | 限定词目录 `resources/{device}/` | 按设备类型提供不同图片、字符串 |
| 能力 | SysCap 能力集 | feature 中通过 `canIUse()` 检查设备是否支持 |
| 导航 | 产品定制层统一管理 | products 层持有 Navigation，各 feature 注册路由 |

### 共享逻辑，独立 UI

feature 内的 ViewModel 可跨设备复用，View 按设备独立：

```typescript
// feature-auth/viewmodel/LoginViewModel.ets — 手机和穿戴共用
@ObservedV2
export class LoginViewModel {
  @Trace username: string = '';
  @Trace password: string = '';
  @Trace isLoading: boolean = false;

  async login(): Promise<boolean> { /* 共用登录逻辑 */ }
}

// products/default/ets/views/LoginView.ets — 手机版 UI（完整表单）
@ComponentV2
struct LoginView {
  @Param viewModel: LoginViewModel = new LoginViewModel();
  build() {
    Column() {
      TextInput({ text: this.viewModel.username })
      TextInput({ text: this.viewModel.password })
      Button('登录').onClick(() => this.viewModel.login())
    }
  }
}

// products/wearable/ets/views/LoginView.ets — 穿戴版 UI（简化）
@ComponentV2
struct LoginView {
  @Param viewModel: LoginViewModel = new LoginViewModel();
  build() {
    Column() {
      TextInput({ text: this.viewModel.username })
      Button('登录').onClick(() => this.viewModel.login())
    }
  }
}
```

## 常见错误

| 错误 | 后果 | 正确做法 |
|------|------|---------|
| feature 之间直接依赖 | 循环依赖，编译失败 | 共享逻辑下移到 feature-shared，Model 放 common-model |
| feature-shared 反向依赖其他 feature | 循环依赖，编译失败 | feature-shared 只被依赖，不依赖其他 feature |
| feature-shared 中放 Model | Model 在 feature 和 common 中重复 | 共享 Model 放 common-model |
| 多个 feature 重复定义同一个 Model | 维护不一致，引用冲突 | 确认多处使用后上提到 common-model |
| products 层包含业务逻辑 | products 成为上帝模块 | products 只做组装和桥接 |
| HAR 单例期望跨 HAP/HSP | HAR 在不同加载上下文中产生独立实例 | 需要单例保证时使用 HSP |
| 穿戴产品直接依赖手机产品的页面 | 违反 products 不横向调用规则 | 共用的 View 下移到 features 或 common |
