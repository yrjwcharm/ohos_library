# 装饰器选择指南

## 🚨 强制约束

只能使用以下 **6 种装饰器**，严禁根据语义自行创造任何其他装饰器名称（如 `@InsightIntentCustom`、`@IntentHandler` 等）。  
若用户需求无法由这 6 种装饰器实现，必须使用 `@InsightIntentEntry` 作为通用方案，并提示用户。

**可用装饰器列表**：
- `@InsightIntentEntry`
- `@InsightIntentLink`
- `@InsightIntentPage`
- `@InsightIntentFunctionMethod`
- `@InsightIntentForm`
- `@InsightIntentEntity`

## 选择优先级（从高到低）

### 1. 用户明确指定 → 直接使用
- 用户说了 `entry` / `func` / `page` / `link` / `form` 等 → 使用对应装饰器。
- 若技术上无法实现 → 提示并建议替代方案。

### 2. URI/Deep Link 跳转 → 优先 `@InsightIntentLink`
- 触发：用户要求通过链接（URI/URL/Deep Link）唤起应用或跳转。
- 处理流程：
  - 检查 `module.json5` 中是否已配置对应 URI。
  - ✅ 已配置 → 直接生成 Link 代码。
  - ❌ 未配置 → 停止，询问用户：“当前项目未配置 URI，我可以自动添加配置，是否同意？”
    - 同意 → 按“生成→预览→确认→写入”流程添加配置，再生成 Link 代码。
    - 拒绝 → 若能用 `@InsightIntentPage` 实现则降级使用 Page，否则提示手动配置。

### 3. 关键词快速匹配（需同时满足对应技术条件）

| 匹配类型           | 触发关键词                                                   | 必须满足的技术条件                                           | 不满足时处理                                                 |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **`Entry` (通用)** | `新增`、`删除`、`修改`、`播放`、`发送`、`开启`、`关闭` 等操作类动词 | 无特殊限制                                                   | 直接使用                                                     |
| **`Function`**     | `返回`、`查询`、`获取`、`列出`、`计算`、`转换` **且** 不含操作类动词 | 方法必须是静态；类必须用 `@InsightIntentFunction()`；方法用 `@InsightIntentFunctionMethod()` | 告知必须满足静态方法+返回值规范，若用户坚持带 UI 则降级为 Entry |
| **`Page`**         | `跳转到xxx页面`、`打开xxx页面`、`查看`+页面类名词 **且** 目标固定（非动态路由） | 目标页面为 `@Entry` 或 `NavDestination` 且已注册             | 动态路由→降级Entry；未注册→提示先注册                        |

### 4. 按场景自动匹配

| 场景                       | 适用条件                                  | 使用的装饰器                                                 | 降级/处理方式                                      |
| -------------------------- | ----------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------- |
| 页面跳转（打开应用内页面） | 核心动作是打开已有页面；无需复杂异步前置  | `@InsightIntentPage`                                         | 若无法确认页面存在或为 NavDestination → 降级 Entry |
| 服务卡片                   | 明确要求添加/更新/删除系统桌面/负一屏卡片 | `@InsightIntentForm`                                         | 无降级，不匹配则跳过                               |
| 轻量查询/操作（无界面）    | 无需打开页面；纯逻辑计算或 I/O            | `@InsightIntentFunction` (类) + `@InsightIntentFunctionMethod` (方法) | 若需要依赖 Ability 上下文 → 降级 Page 或 Entry     |
| **默认（以上均不满足）**   | 多步骤/动态路由/标准意图/需求模糊         | **`@InsightIntentEntry`**                                    | -                                                  |

## 降级路径速查

| 原计划       | 触发降级的条件                    | 降级方案                            |
| ------------ | --------------------------------- | ----------------------------------- |
| `Link`       | 项目无 URI 配置且用户拒绝添加     | `Page`（若可行）否则提示手动        |
| `Page`       | 目标页面不是 `@Entry` 或未注册    | `Entry`                             |
| `Function`   | 需要打开界面或依赖 Ability 上下文 | `Page` 或 `Entry`（根据是否需界面） |
| 用户指定类型 | 技术上无法实现                    | 提示并建议替代                      |

## 字段命名规范（最容易出错）

| 装饰器                | Ability名称字段 | 执行模式字段  | 说明                              |
| --------------------- | --------------- | ------------- | --------------------------------- |
| `@InsightIntentPage`  | `uiAbility`     | 无            | 通过指定 `uiAbility` 关联 Ability |
| `@InsightIntentEntry` | `abilityName`   | `executeMode` | `executeMode` 必须是数组          |

**常见错误**：
```typescript
// ❌ 错误：在 @InsightIntentPage 中使用 abilityName
@InsightIntentPage({ abilityName: 'EntryAbility' })

// ✅ 正确：使用 uiAbility
@InsightIntentPage({ uiAbility: 'EntryAbility' })
```

## 决策流程图

```text
用户需求
 → 明确指定装饰器？ → 是 → 技术可行？→ 生成 / 否→提示替代
 → 否 → URI/Link 跳转？ → 是 → 有配置？→ 生成 Link / 否→询问添加配置 → 同意则添加后生成 / 拒绝则降级 Page 或提示
 → 否 → 关键词匹配 Function/Page/Entry？ → 满足条件 → 生成对应类型 / 不满足→降级或提示
 → 否 → 按场景自动匹配 → 匹配则生成 / 否则默认 Entry
```