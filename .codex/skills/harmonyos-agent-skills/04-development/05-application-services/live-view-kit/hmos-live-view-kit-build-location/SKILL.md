---
name: hmos-live-view-kit-build-location
description: HarmonyOS实况窗（LiveView）代码生成助手，支持创建、更新、停止实况窗。用户输入创建/更新/结束/完整/补全实况窗代码时触发，覆盖即时配送、打车、排队、计时、航班、高铁、共享租赁、运动锻炼、导航九大场景。
version: "1.0.0"
metadata:
  category: task-coding
---

# HarmonyOS 实况窗开发助手

## 概述

实况窗（LiveView）是 HarmonyOS 实时状况显示卡片，支持本地和云端推送。LiveViewKit 提供创建、更新、结束卡片能力。

## 场景白名单

仅支持以下场景：
- 即时配送、打车出行、排队、计时、航班、高铁、共享租赁、运动锻炼、导航

**取餐场景（店铺内取餐，如肯德基、麦当劳）不在白名单内，不支持端侧开发**
**打卡场景（如办公打卡）不在白名单内，不支持端侧开发**
**快递场景（如顺丰速运，美团快递等）不在白名单内，不支持端侧开发**

## 执行流程

```
触发判断 → 场景识别 → event值严格检查 → 操作类型确认 → 场景-操作校验 → 前置检查 → 代码生成 → TODO注释检查 → ArkTS语法检查 → 输出
```

---

### 步骤1：触发判断

**触发关键词**：`创建`、`更新`、`结束`、`完整`、`补全`

- 用户输入包含上述关键词之一 → 进入步骤2
- 否则 → 询问用户想要执行五种操作中的什么操作（创建/更新/结束/完整/补全 等五种操作中选一种）

---

### 步骤2：场景识别

#### 情况A：用户明确提及场景
直接使用用户提及的场景，进入步骤3

#### 情况B：用户没有明确提及场景

**如果是"补全"操作**：
1. 读取用户指定的文件
2. 搜索实况窗相关关键词：`liveViewManager`、`LiveView`、`startLiveView`、`LiveViewController`
3. 根据 event 字段或控制器名称识别实际场景
4. 进入步骤3

**如果不是"补全"操作**：
1. 询问用户选择场景："请选择实况窗场景：即时配送、打车出行、排队、计时、航班、高铁、共享租赁、运动锻炼、导航"
2. 用户选择后，进入步骤3

---

### 步骤3：event值严格检查（强制步骤）

**【强制】此步骤必须严格执行，不通过检查则任务结束**

1. 加载 event 详细规范文档 `references/live-view-other/live-view-event.md`
2. 根据用户选择的场景，从文档中获取正确的 event 值
3. **第一层校验：场景白名单校验**
   - 用户场景不在白名单内 → 回答"该场景不在 HarmonyOS 实况窗支持范围内，仅支持：即时配送、打车出行、排队、计时、航班、高铁、共享租赁、运动锻炼、导航"，**任务结束**
4. **第二层校验：用户自定义event值校验**
   - 如果代码/用户输入中使用了非表内 event 值 → 必须根据场景对照表替换为正确值
   - 错误值示例：`CHECKIN`、`PICKUP`、`FOOD`、`RIDE`、`MY_CUSTOM` 等都不是合法的 event 值
5. **第三层校验：场景与event匹配校验**
   - 根据 `references/live-view-other/live-view-event.md` 中的"场景与 event 值速查表"进行匹配
   - 不匹配则纠正并说明原因
6. 检查通过后，进入下一步骤4

**【重要】event 值大小写敏感，必须使用大写形式，如 `DELIVERY` 不能写成 `delivery`**

---

### 步骤4：操作类型确认

#### 如果用户已明确选择操作类型（通过触发关键词）
直接使用用户选择的操作类型

#### 如果用户未明确选择操作类型
询问用户想要的操作类型：
- **创建**：生成 startLiveView + buildDefaultView
- **更新**：生成 updateLiveView 方法
- **结束**：生成 stopLiveView 方法
- **完整**：生成创建+更新+结束所有方法
- **补全**：补全用户提供的代码片段
用户回答之后进入步骤5核对该场景是否支持端侧创建，更新和结束，如果有不符按照规则反馈用户。
---

### 步骤5：场景-操作校验

**白名单场景及其支持的操作**：

| 场景 | 支持的操作 |
|------|-----------|
| 即时配送 | 仅创建 |
| 打车出行 | 创建、更新、结束 |
| 排队 | 仅创建 |
| 计时 | 创建、更新、结束 |
| 航班 | 仅创建 |
| 高铁 | 仅创建 |
| 共享租赁 | 仅创建 |
| 运动锻炼 | 创建、更新、结束 |
| 导航 | 创建、更新、结束 |

**校验规则**：
- 用户选择的操作不被当前场景支持 → 回答"该场景不支持【操作类型】操作，仅支持：【支持的操作列表】"，**任务结束**

---

### 步骤6：前置检查（仅更新/结束操作）

**仅当用户选择「更新」或「结束」时执行**：

1. 检查用户指定文件中是否存在**创建**代码：
   - `startLiveView` 方法
   - `buildDefaultView` 方法
   - 对应场景的 LiveViewController（如 `WorkoutLiveViewController`）

2. **不存在创建代码** → 回答"请先创建实况窗"，**任务结束**

3. **存在创建代码** → 继续执行代码生成

---

### 步骤7：代码生成

1. 加载场景参考代码 `references/live-view-scene/create-{scene}-liveview.md`
2. 加载 ArkTS 规范 `references/live-view-refer/Arkts.md`
3. 加载构建原理 `references/live-view-refer/build-local-liveview.md`
4. 加载布局规范 `references/live-view-refer/liveview-layout.md`
5. 加载注释规范 `references/live-view-refer/liveview-comment.md`
6. 加载 external 规范 `references/live-view-refer/liveview-externaldata.md`
7. **【重要】生成代码时必须在 `liveViewData` 层级下添加 `external` 参数**
8. **【强制】event 字段值必须严格按场景对照表填写，不得随意填写**
9. **【强制】external 外屏参数必须按以下模板添加：**
   ```typescript
   // todo externalData字段内容需要替换为业务实际内容，扩展数据
   external: {
     // todo title字段内容需要替换为业务实际内容，外屏标题
     title: "外屏标题",
     // todo content字段内容需要替换为业务实际内容，外屏内容数组（必须为数组类型）
     content: [{text:"填实际业务内容"}],
     // todo type字段内容需要替换为业务实际内容，外屏背景类型
     type: ExternalType.BACKGROUND_COLOR,
     // todo backgroundColor字段内容需要替换为业务实际内容，外屏背景色
     backgroundColor: "#000000",
     // todo backgroundPicture字段内容需要替换为业务实际内容，外屏背景图片
     backgroundPicture: "external.png",
   }
   ```
10. 生成代码并检查语法是否合规（不合规需要改进），注释是否完整添加（未添加需要添加）

---

### 步骤8：TODO注释检查

**【强制】所有生成的代码必须包含完整的TODO类注释**

1. 加载注释规范 `references/live-view-refer/liveview-comment.md`
2. 按规范检查并添加注释，必须包含：
   - **LiveViewStatus 枚举** - 枚举上方添加 `// todo 实况窗更新节点/阶段/状态`
   - **buildDefaultView 字段注释** - 每个字段上方添加 `// todo xxx字段内容需要替换为业务实际内容...`
   - **buildWantAgent 字段注释** - 每个字段上方添加 `// todo xxx字段内容需要替换为业务实际内容...`
   - **updateLiveView 方法注释** - 方法开头添加 `// todo updateLiveView 方法用于...`
   - **stopLiveView 方法注释** - 方法开头添加 `// todo stopLiveView 方法用于...`
3. **检查规则**：
   - 实况窗核心字段（id、event、sequence、isMute、timer、liveViewData）必须有TODO注释
   - liveViewData 下的 primary、capsule 必须有TODO注释
   - **external 外屏参数必须包含完整字段**：title、content（数组类型）、type、backgroundColor、backgroundPicture
   - buildWantAgent 的 bundleName、abilityName、parameters 等必须有TODO注释
4. 若缺少注释，补充后重新检查，直到所有必须字段都有注释

---

### 步骤9：ArkTS 语法检查

**【强制】代码生成完成后必须严格进行 ArkTS 语法检查**

1. 加载 ArkTS 规范 `references/live-view-refer/Arkts.md`
2. 按规范逐项检查：
   - **导入检查** - 所有使用的类型是否已导入
   - **类型检查** - 禁止使用 any、unknown
   - **语法检查** - 禁止对象展开、解构、嵌套函数
   - **build() 方法** - @Entry/@Component 装饰器的 Struct 必须包含 build(): void
   - **Button 组件** - Button 内无子组件时不生成空大括号 `{}`
   - **console 日志** - 所有 console.log/info/warn/error 内容必须使用 `${}` 模板字符串格式，禁止使用字符串拼接
3. 若检查不通过，修正代码后重新检查，直到通过

---

### 步骤10：输出

1. 将最终代码写入用户指定的文件路径
2. 提示开发准备注意事项

---

## 代码输出范围约束

| 操作类型 | 必须包含 | 禁止生成 |
|---------|---------|----------|
| 创建 | startLiveView、buildDefaultView、buildWantAgent、isLiveViewEnabled | updateLiveView、stopLiveView |
| 更新 | updateLiveView | startLiveView、stopLiveView、buildDefaultView |
| 结束 | stopLiveView | startLiveView、updateLiveView、buildDefaultView |
| 完整 | startLiveView、updateLiveView、stopLiveView、buildDefaultView、buildWantAgent、isLiveViewEnabled | 无 |

---

## 开发准备检查

### 一、ArkTS 语法检查
1. 导入检查 - 所有使用的类型是否已导入
2. 类型检查 - 禁止使用 any、unknown
3. 语法检查 - 禁止对象展开、解构、嵌套函数
4. build() 方法 - @Entry/@Component 装饰器的 Struct 必须包含 build(): void

### 二、@Entry 页面组件要求

**【强制】生成的代码必须包含 @Entry 入口页面组件**

```typescript
@Entry
@Component
struct Index {
  // todo 实况窗控制器实例
  private controller = new XxxLiveViewController();

  aboutToAppear(): void {
    // todo 在此处调用实况窗启动方法
    this.controller.startLiveView();
  }

  build(): void {
    Column() {
      Text("启动实况窗")
        .onClick(() => {
          this.controller.startLiveView();
        })
      Text("更新实况窗")
        .onClick(() => {
          this.controller.updateLiveView();
        })
      Text("停止实况窗")
        .onClick(() => {
          this.controller.stopLiveView();
        })
    }
    .width('100%')
    .height('100%')
  }
}
```

### 三、开发准备提示
代码生成后必须提示：
```
代码已生成完毕。使用前请确保：
1. 如果没有权益，请先前往：https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/liveview-rights 开通实况窗权益
2. 设备端需要打开实况窗开关
```

---

## 意图识别与参数配置

### 参数配置意图关键词
"参数需要..."、"参数配置..."、"修改参数..."、"data字段..."、"liveViewData字段..."、"胶囊配置..."、"主区域配置..."、"配置成..."、"设置成..."

### 有参数配置意图时
1. 解析用户配置要求（参数名称、期望值、字段路径）
2. 索引相关资源文件
3. 若用户要求使用 resource 资源，查阅 `references/live-view-refer/harmonyos-resource.md` 并查找资源文件
4. 执行代码生成并填补参数数据
5. 语法合规性检查循环直到通过
6. 代码注释检查是否添加，直到添加完整为止

---

## 资源索引

### 参考文档
- **`references/live-view-scene/create-{scene}-liveview.md`** - 各场景创建代码
- **`references/live-view-other/live-view-update.md`** - 更新/停止实况窗代码
- **`references/live-view-other/live-view-event.md`** - event 参数值详细规范（含场景对照表、速查表、常见错误）
- **`references/live-view-refer/liveview-dev-preparation.md`** - 开发准备检查清单
- **`references/live-view-refer/harmonyos-resource.md`** - HarmonyOS resource 资源配置规则

### 规范文档
- **`references/live-view-refer/Arkts.md`** - ArkTS 编码规范
- **`references/live-view-refer/build-local-liveview.md`** - 实况窗构建代码原理
- **`references/live-view-refer/liveview-layout.md`** - 卡片布局规范
- **`references/live-view-refer/liveview-externaldata.md`** - externalData 参数规范
- **`references/live-view-refer/liveview-comment.md`** - 注释规范
