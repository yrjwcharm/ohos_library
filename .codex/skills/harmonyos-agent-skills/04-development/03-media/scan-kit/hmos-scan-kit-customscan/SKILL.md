---
name: hmos-scan-kit-customscan
description: 帮助开发者快速接入华为 Scan Kit 自定义界面扫码能力，仅在需要支持完全自定义相机预览流 UI 界面、闪光灯控制、变焦、对焦等功能的场景使用
---

# Scan Kit - 自定义界面扫码 Skill

## 功能定位

帮助开发者快速接入华为 Scan Kit 的**自定义界面扫码**能力，可完全自定义扫码界面样式，包括相机预览、扫码框、闪光灯控制、变焦控制等功能。

**注意**：
- 本技能基于 DevEco Studio 原生Agent插件 CodeGenie 开发，依赖其内置工具进行语法检查和代码编译校验。如果在其他 Agent 工具中使用本技能，可能出现无法自动进行代码验证和编译的情况。
- 本技能需要在项目中已有扫码入口的情况下才能正常工作，若当前项目中没有可用的扫码入口(如空项目)，则退出技能工作流程。

## 工作流程（5 阶段）

### 待办事项

在开始工作流程前，**必须** 先使用 todowrite 工具创建包含5项任务的待办事项，在完成每一个阶段之后标记为完成

- [ ] 阶段1: 项目准备
- [ ] 阶段2: 文件复制
- [ ] 阶段3: 页面实现
- [ ] 阶段4: 配置修改
- [ ] 阶段5: 代码验证

---

## 阶段 1: 项目准备

**目的**: 了解项目现状和用户需求

### 允许的操作（必须严格遵守）
- 读取 `module.json5` - 检查 CAMERA 权限是否已存在
- 读取 `resources/base/profile/main_pages.json` - 检查已有页面
- 读取 `entry/src/main/ets/` 下的现有页面 - 确定扫码入口位置
- 根据用户当前的输入确认需求，如果未明确提出则使用默认值 - 是否需要闪光灯等

### 严格禁止的操作（违反将导致技能失败）
- ❌ 禁止读取 `references/samples/samplecode/` 下的任何文件
- ❌ 禁止修改任何文件

### 检测项目状态和需求确认结果

| 检测项 | 内容 | 来源 |
|--------|------|------|
| CAMERA权限 | module.json5 是否已有 ohos.permission.CAMERA 权限声明 | 读取 module.json5 |
| 现有代码 | 项目中是否已有自定义扫码相关代码 | 读取 entry/src/main/ets/ |
| 页面结构 | 项目中有哪些页面可用于触发扫码 | 读取 main_pages.json |
| 多码识别 | 启用 / 禁用 | 用户确认（默认启用） |
| 支持码制 | 全部 / 指定码值 | 用户确认（默认全部 - scanTypes: [scanCore.ScanType.ALL]） |
| 闪光灯控制 | 启用 / 禁用 | 用户确认（默认启用） |
| 变焦控制 | 启用 / 禁用 | 用户确认（默认启用） |

### 输出
- 项目状态报告（权限、页面结构、现有代码）
- 扫码入口位置
- 用户确认的需求配置（多码识别、闪光灯、变焦）

---

## 阶段 2: 文件复制

**目的**: 将示例代码和资源文件复制到项目，或与项目已有的文件进行合并

### 2.1 工具类复制/合并（使用 subagent）

**严格约束**:
- 主 agent 必须调用 subagent 执行复制/合并，禁止自己读取示例文件
- subagent 必须使用 cp 命令复制文件，禁止使用 write 命令
- subagent 必须参考 `tool-create.md` 获取具体任务定义

查看 `tool-create.md` 获取 subagent 任务定义，包括 4 个 subagent (SA1-SA4) 和各自的复制/合并文件列表。

### 2.2 资源类复制/合并

1. 复制 `references/samples/samplecode/resources/rawfile/` 下的资源文件到 `{检测到的项目resources目录}/rawfile/`：

| 文件 | 用途 |
|------|------|
| `scan_selected.svg` | 单码选中图标 |
| `scan_selected2.svg` | 多码选中图标 |
| `scan_shadow.png` | 扫描线动画背景 |

2. 合并 `references/samples/samplecode/resources/base/element/` 下的配置文件到 `{检测到的项目resources目录}/base/element/`：
- `string.json` - 字符串资源
- `float.json` - 尺寸定义
- `color.json` - 颜色定义

**智能合并规则**: 
- 如果目标文件已存在，必须先读取源文件和目标文件，对比分析后在目标文件中 **追加新增内容，禁止删除原始内容**。
- 如果目标文件不存在，则直接写入。

### 输出
- 所有工具类文件复制完成确认（SUCCESS/FAILED/MERGED）
- 所有资源文件复制完成确认

---

## 阶段 3: 页面实现

**目的**: 实现扫码页面和入口集成

### 3.1 扫码页面实现

从示例复制页面代码：

| 源文件 | 目标路径 |
|--------|----------|
| `references/samples/samplecode/ets/pages/CustomScanPage.ets` | `{检测到的项目ets目录}/pages/CustomScanPage.ets` |

**严格约束**:
- 必须使用 cp 命令复制文件，禁止使用 write 命令，禁止自己"简化"或"重写"
- 只做必要的路径调整（import 路径匹配项目结构）
- 扫码结果默认在页面显示 Toast，1秒后自动返回

### 3.2 入口集成

在扫码入口页面添加跳转逻辑：

1. 在触发控件的点击事件中调用 `pushUrl()` 跳转到 `pages/CustomScanPage`
2. 跳转前必须检测设备能力：

```typescript
import { UIContextSelf } from '../model/UIContextSelf';

Button('扫码')
  .onClick(() => {
    const isScanBarCode = canIUse('SystemCapability.Multimedia.Scan.ScanBarcode');
    if (isScanBarCode) {
      this.getUIContext()
        .getRouter()
        .pushUrl({ url: 'pages/CustomScanPage' })
        .catch((err: ESObject) => {
        console.error(`pushUrl failed, code is ${(err as BusinessError).code}, message is ${(err as BusinessError).message}`);
      });
    } else {
      UIContextSelf.showMessage('当前设备不支持自定义扫码功能');
    }
  })
```

**注意**：禁止随意修改原始界面，要求尽量保留原始的 UI 布局，最小化修改实现扫码入口的集成

### 输出
- 扫码页面实现完成
- 入口集成完成

---

## 阶段 4: 配置修改

**目的**: 完成权限配置、路由注册和补充配置

### 4.1 权限配置

在 `module.json5` 中添加相机权限声明。如果已存在则跳过：

```json
"requestPermissions": [
{
  "name": "ohos.permission.CAMERA",
  "reason": "$string:permission_reason_camera",
  "usedScene": {
    "abilities": [
      "EntryAbility"
    ],
    "when": "always"
  }
},
]
```

### 4.2 路由配置

在 `resources/base/profile/main_pages.json` 中注册扫码页面：

```json
{
  "src": [
    "pages/Index",
    "pages/CustomScanPage"
  ]
}
```

### 输出
- 权限配置完成
- 路由配置完成

---

## 阶段 5: 代码验证

**目的**: 验证代码正确性

### 验证项
1. **EntryAbility 检查**: 验证 `entryability/EntryAbility.ets` 是否包含以下修改：
   - 导入了 `UIContextSelf`、`WindowService`、`DeviceService` 模块
   - 在 `onWindowStageCreate` 的 `windowStage.loadContent` 的回调中正确调用了初始化方法：`UIContextSelf.setUIContext`, 
    `DeviceService.refreshDisplayInfoAndSelectSuitableRatio`, `WindowService.getInstance().initWindowObj`
   - 在 `onWindowStageDestroy` 中调用了 `WindowService.getInstance().cancelWindowSubscribe()`
2. **语法检查**: 使用 `builtin_check_editor_errors` 工具检查所有修改/新增文件的语法
3. **编译验证**: 使用 `builtin_execute_build_command` 工具对项目进行完整编译

### 严格约束
- 必须等所有阶段完成后才能执行验证
- 发现错误首先定位出现的位置，然后对比参考示例代码中的对应代码，必须修改到通过为止

---

## 开发原则

| 原则 | 说明 |
|------|------|
| **示例优先** | 所有 Scan Kit API 调用必须直接从 references/ 目录的示例中复制，禁止自己"翻译"或"简化" |
| **必须申请CAMERA权限** | 自定义扫码必须申请 `ohos.permission.CAMERA` 权限，需要在 module.json5 中声明并在运行时请求用户授权 |
| **时序原则** | Scan Kit 内存在大量异步接口，必须正确处理时序：init → start → stop → release |
| **资源释放** | 页面隐藏时必须调用 stop 和 release 释放相机资源 |
| **资源引用** | 使用资源引用前必须确认资源文件存在于项目中，如果需要项目中不存在的资源，**必须**查找并将文件之间复制到项目内的 resources/rawfile 中，不能放在其子文件夹或其他地址中 |
| **多端部署兼容** | 在扫码入口触发前调用 `canIUse('SystemCapability.Multimedia.Scan.ScanBarcode')` 检测设备能力，不支持的设备上不能调用扫码 API，而应该返回错误信息 |

---

## 参考资料

| 类型 | 文件 |
|------|------|
| 开发指南 | `references/guides/scan-customscan.md` |
| API 参考 | `references/api/scan-customscan-api.md` |
| 核心类型 | `references/api/scan-scancore.md` |
| 错误码 | `references/api/scan-error-code.md` |
| 示例代码 | `references/samples/samplecode` 示例代码，包含页面、工具类、资源文件 |
| 工具类创建 | `tool-create.md` |

---

## 完成报告格式

开发完成后，输出：

| 内容 | 说明 |
|------|------|
| 修改摘要 | 新增/修改的文件列表 |
| 核心实现 | 扫码逻辑的关键代码位置 |
| 权限配置 | CAMERA权限的声明和申请方式 |
| 验证报告 | 语法和编译验证结果 |
| 已知限制 | 有何限制或已知问题 |
