# 翻译操作 — 跨端代码翻译

将已有平台（Android/iOS）的功能翻译到目标平台（通常是 HarmonyOS）。核心思路：**把源端代码当作需求文档**，通过深度阅读源端实现来生成翻译规格，替代 native-analyse 的 brain-storm 式设计。

---

## 命令格式

```
/pipeline translate --source <platform> --target <platform> "需求描述"
/pipeline translate --source <platform> --target <platform> --bundles <bundles> "需求描述"
```

## 参数说明

| 参数 | 必需 | 说明 | 示例 |
|------|------|------|------|
| `--source` | 是 | 源端平台 | `android`, `ios` |
| `--target` | 是 | 目标平台 | `harmony` |
| `--bundles` | 否 | 指定源端和目标端模块（逗号分隔）。不指定则从项目配置自动匹配 | `ios-feature-module,harmony-feature-module` |
| 需求描述 | 是 | 要翻译的功能描述（引号包裹） | `"用户资料编辑页面"` |

## 与 import 的区别

| 维度 | import | translate |
|------|--------|-----------|
| 输入 | 已有的 tech-spec.md 文件 | 源端平台 + 目标平台 + 需求描述 |
| 核心动作 | 复制 tech-spec.md | 读源端代码，AI 生成 translation-spec |
| 需要 setup 源端？ | 否 | 是（需要读源端代码） |
| 产出 | tech-spec.md（用户提供） | tech-spec.md（AI 生成的翻译规格） |
| 完成后状态 | 等价于 analyse 完成 | 等价于 analyse 完成 |

---

## 执行流程

### Step 1: 参数解析与 Bundle 匹配

1. 解析 `--source` 和 `--target` 平台参数
2. 如果用户指定了 `--bundles`，直接使用
3. 否则从 repo-config.json 自动匹配：
   - 源端 Bundle：`platforms.{source}.repositories` 中的 Bundle
   - 目标端 Bundle：`platforms.{target}.repositories` 中的 Bundle
   - common 层（KMP/Rust）：`common.repositories` 中 platforms 包含 source 或 target 的 Bundle
4. 如果需求描述包含业务关键词，使用 `keywords` 配置缩小匹配范围

### Step 2: 用户确认

展示匹配结果，等待用户确认：

```markdown
翻译模式: {source} → {target}
需求: {需求描述}

源端 Bundle:
| # | Bundle | 角色 | 说明 |
|---|--------|------|------|
| 1 | {source_bundle} | main | {description} |

目标端 Bundle:
| # | Bundle | 角色 | 说明 |
|---|--------|------|------|
| 1 | {target_bundle} | main | {description} |

共享层:
| # | Bundle | 说明 |
|---|--------|------|
| 1 | {common_bundle} | {description} |

确认无误？
```

使用 AskUserQuestion，选项：确认 / 需要调整。

### Step 3: 创建需求 & 生成 locator-result.json

1. 从需求描述中提取 2-3 个关键词生成 `requirement_id`（kebab-case，加 `translate-` 前缀，如 `translate-trade-order`）
2. **用 Bash 创建目录**：`mkdir -p .bundle-flow/{requirement_id} .bundle-flow-workspace/{requirement_id}`
3. **用 Write 写入** `.bundle-flow/{requirement_id}/locator-result.json`：

```json
{
  "requirement_id": "{requirement_id}",
  "description": "{需求描述}",
  "mode": "translate",
  "source_platform": "{source}",
  "target_platform": "{target}",
  "created_at": "{ISO timestamp}",
  "selected_bundles": {
    "{source}": [
      {
        "name": "{source_bundle_name}",
        "repo": "{repo_url}",
        "role": "main",
        "desc": "{description}",
        "category": "{source}"
      }
    ],
    "{target}": [
      {
        "name": "{target_bundle_name}",
        "repo": "{repo_url}",
        "role": "main",
        "desc": "{description}",
        "category": "{target}"
      }
    ],
    "common": [...]
  },
  "platforms": ["{source}", "{target}"],
  "total_bundles": 3
}
```

### Step 4: 执行 setup

调用项目初始化，传入 requirement_id、模块列表和平台。

setup 会同时准备源端和目标端的代码仓库：
- 源端仓库：用于阅读源代码（只读参考）
- 目标端仓库：用于编写翻译后的代码
- common 仓库：共享层代码

产出：`.bundle-flow/{requirement_id}/setup.json`

**⚠️ 必须执行 — 事件分发（禁止跳过）**：

遍历 setup.json 中每个 bundle，逐个触发 `native-flow:pipeline:after-setup`。

### Step 5: 源端代码分析 → 生成 translation-spec.md

**这是翻译模式的核心步骤**，替代 native-analyse 的 brain-storm。

#### 5.1 读取源端代码结构

从 setup.json 获取源端 Bundle 路径，执行深度代码分析：

1. **文件树扫描**：列出源端 Bundle 中与需求相关的文件
2. **类/接口分析**：识别核心类、继承关系、接口定义
3. **入口识别**：找到页面入口（Activity/Fragment/VC）

#### 5.2 分层映射分析

**UI 层**：

| 源端（Android） | 源端（iOS） | 目标（ArkTS） |
|----------------|------------|--------------|
| Activity | UIViewController | @Entry @Component struct (Page) |
| Fragment | 子 VC / SwiftUI View | @Component struct |
| RecyclerView + Adapter | UITableView/UICollectionView | List + LazyForEach |
| ConstraintLayout | Auto Layout | RelativeContainer / Column+Row |
| ViewPager2 | UIPageViewController | Swiper |
| BottomSheetDialog | UISheetPresentationController | Sheet |
| EditText / TextField | UITextField | TextInput |
| ImageView | UIImageView | Image |
| RecyclerView.Adapter | UITableViewDataSource | @Builder + ForEach/LazyForEach |

**数据层**：

| 源端模式 | ArkTS 模式 | 说明 |
|---------|-----------|------|
| ViewModel + LiveData/StateFlow | @Observed class + @State | ViewModel 中的状态 → @Observed 类属性 |
| MutableStateFlow | @State | 可变状态 |
| SharedFlow | EventHub / emitter | 事件流 |
| SharedPreferences / UserDefaults | @ohos.data.preferences | 轻量 KV 存储 |
| Room / CoreData | @ohos.data.relationalStore | 关系型数据库 |
| Repository pattern | 保持 | 数据仓库模式可直接复用 |

**平台 API 映射**：

| 差异项 | Android | iOS | HarmonyOS |
|--------|---------|-----|-----------|
| 页面跳转 | Intent + Bundle | Segue / present | router.pushUrl + params / Navigation |
| 生命周期 | onCreate/onResume/onDestroy | viewDidLoad/viewWillAppear | aboutToAppear/aboutToDisappear |
| 权限申请 | ActivityCompat.requestPermissions | Info.plist + requestAuthorization | @ohos.abilityAccessCtrl |
| 网络请求 | Retrofit/OkHttp | URLSession/Alamofire | @ohos.net.http |
| 图片加载 | Glide/Coil | SDWebImage/Kingfisher | Image 组件 + @ohos.net.http |
| 日志 | Log.d/Log.e | NSLog/os_log | hilog |
| 线程切换 | Dispatchers/withContext | DispatchQueue | TaskPool/Worker |

#### 5.3 识别可复用部分

检查 common 层（KMP/Rust SDK）：
- 列出 KMP 共享层中与需求相关的接口/类
- 标记"可直接复用"（expect/actual 已有 HarmonyOS 实现）vs "需要补充 actual 实现"

#### 5.4 生成 translation-spec.md

将分析结果写入 `.bundle-flow/{requirement_id}/tech-spec.md`（使用 tech-spec.md 路径，让下游 plan/coding 自然兼容）：

```markdown
# 翻译规格: {功能描述}

<!-- DECISION_SUMMARY
需求: {一句话描述}
翻译方向: {source} → {target}
源端 Bundle: {source_bundle_names}
目标 Bundle: {target_bundle_names}
共享层: {common_bundle_names or "无"}
-->

> 源端: {source_platform} ({source_bundle_names})
> 目标: {target_platform} ({target_bundle_names})
> 共享层: {common_bundle_names or "无"}

## 一、源端代码结构

### 1.1 文件清单与翻译策略

| # | 源端文件 | 职责 | 翻译策略 | 目标文件 |
|---|---------|------|---------|---------|
| 1 | {src_file_1} | {职责} | 翻译 | {target_file_1} |
| 2 | {src_file_2} | {职责} | 复用KMP | — |
| 3 | {src_file_3} | {职责} | 翻译 | {target_file_3} |

翻译策略取值：
- **翻译**: 源端代码翻译为 ArkTS
- **复用KMP**: KMP 共享层已有实现，直接调用
- **跳过**: 平台特有逻辑，目标端不需要
- **替代**: 使用目标端原生 API 替代

### 1.2 UI 组件映射

| 源端组件 | ArkUI 组件 | 备注 |
|---------|-----------|------|
| {SourceComponent} | {ArkUIComponent} | {notes} |

### 1.3 数据流映射

| 源端模式 | ArkTS 模式 | 说明 |
|---------|-----------|------|
| {source_pattern} | {arkts_pattern} | {notes} |

## 二、可复用部分

### KMP 共享层
- {可直接复用的接口/类列表}
- {调用方式说明}

### 业务逻辑
- {不依赖平台 API 的纯业务逻辑}

## 三、平台差异点（需特殊处理）

| # | 差异项 | 源端实现 | 鸿蒙实现 | 说明 |
|---|--------|---------|---------|------|
| 1 | {差异点} | {source_impl} | {target_impl} | {notes} |

## 四、子任务拆分

按源端文件/功能模块拆分，每个子任务 = 一个翻译单元。

### 子任务 1: {名称}
- **源端参照**: {source_file_path}
- **目标文件**: {target_file_path}
- **依赖**: 无 / 子任务 N
- **翻译要点**: {关键注意事项}

### 子任务 2: {名称}
...
```

### Step 6: 用户确认翻译规格

展示生成的 translation-spec 摘要，等待用户确认：

```markdown
翻译规格已生成:

- 源端文件: {N} 个
- 翻译策略: {M} 个翻译, {K} 个复用KMP, {J} 个跳过
- 平台差异点: {P} 个
- 子任务: {T} 个

翻译规格详情见 .bundle-flow/{requirement_id}/tech-spec.md

确认进入 plan 阶段？
```

使用 AskUserQuestion，选项：确认 / 需要调整翻译规格。

### Step 7: 初始化状态

1. **用 Write 写入** `.bundle-flow/{requirement_id}/metadata.json`：

```json
{
  "mode": "translate",
  "source_platform": "{source}",
  "target_platform": "{target}",
  "tech_spec_status": "confirmed",
  "tech_spec_confirmed_at": "{ISO timestamp}",
  "created_at": "{ISO timestamp}"
}
```

2. **用 Read + Write 更新** `.bundle-flow/state.json`：

```json
{
  "active": "{requirement_id}",
  "requirements": {
    "{requirement_id}": {
      "description": "{需求描述}",
      "mode": "translate",
      "source_platform": "{source}",
      "target_platform": "{target}",
      "current_phase": "analyse",
      "completed_phases": ["locator", "setup", "analyse"],
      "invalidated_phases": [],
      "current_change_round": 1,
      "platforms": ["{source}", "{target}"],
      "created_at": "{ISO timestamp}"
    }
  }
}
```

> `completed_phases` 包含 `["locator", "setup", "analyse"]`，与 import 等价。
> 下游的 `/native-plan` 和 `/native-coding` 无法区分来源。

### Step 8: 完成提示

```markdown
翻译准备完成！

需求: {requirement_id}
翻译方向: {source} → {target}
已完成阶段: locator ✅ → setup ✅ → analyse ✅

下一步:
  /native-plan --platform {target} → 生成{target}端实施计划
```

---

## 下游阶段的行为

### /native-plan

读取 `.bundle-flow/{id}/tech-spec.md`（实际内容是 translation-spec），正常生成 plan。
plan 只为 target 平台生成（用户通常只需要 `--platform harmony`）。

翻译规格中的"子任务拆分"章节直接映射为 plan 的子任务，每个子任务带有源端参照文件路径。

### /native-coding

按 plan 子任务逐个编码。与正常 coding 的区别是：

- 每个子任务有明确的"源端参照"文件，AI 会先读源端代码再翻译
- 翻译确认替代 brain-storm：AI 展示"源端这样写，鸿蒙端我打算这样翻译"，而非开放式讨论
- 自动加载 harmony router skill 获取 ArkTS 语法约束

---

## 护栏规则

| 规则 | 说明 |
|------|------|
| 源端代码只读 | translate 模式下只修改目标端代码，源端仓库不做任何改动 |
| 翻译规格必须确认 | Step 6 用户确认后才更新 state.json |
| common 层优先复用 | 有 KMP 实现的功能不重新翻译，直接调用共享层 |
| 平台差异点必须标注 | 不能假设源端 API 在目标端有等价物，差异点必须在翻译规格中明确列出 |

---

## 与正常 pipeline 的等价性

translate 完成后，所有产出物和状态与正常走完 locator → setup → analyse 完全一致：

| 产出物 | 正常 pipeline | translate |
|--------|-------------|-----------|
| `state.json` | locator 阶段创建 | Step 7 创建，格式一致 |
| `locator-result.json` | 项目检测产出 | Step 3 生成，格式一致（多 `mode`/`source_platform`/`target_platform` 字段） |
| `setup.json` | 环境初始化产出 | Step 4 由项目初始化产出 |
| `tech-spec.md` | native-analyse 产出 | Step 5 AI 生成（内容是翻译规格） |
| `metadata.json` | native-analyse 创建 | Step 7 创建，格式一致（多 `mode`/`source_platform`/`target_platform` 字段） |

下游的 `/native-plan` 和 `/native-coding` 无法区分是正常 pipeline、import 还是 translate 产生的上下文。
