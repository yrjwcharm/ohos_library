---
name: hmos-scan-kit-defaultscan
description: 帮助开发者快速接入华为 Scan Kit 默认界面扫码能力，在不需要完全自定义相机界面、闪光灯控制、变焦、对焦等高级功能时优先使用
---

# Scan Kit - 默认扫码 Skill

## 功能定位

帮助开发者快速接入华为 Scan Kit 的**默认界面扫码**功能，无需申请相机权限，一行代码即可实现扫码。

**注意**：
- 本技能基于 DevEco Studio 原生Agent插件 CodeGenie 开发，依赖其内置工具进行语法检查和代码编译校验。如果在其他 Agent 工具中使用本技能，可能出现无法自动进行代码验证和编译的情况。
- 本技能需要在项目中已有扫码入口的情况下才能正常工作，若当前项目中没有可用的扫码入口(如空项目)，则退出技能工作流程。

## 核心能力

| 能力 | 说明 |
|------|------|
| 系统级扫码 UI | 统一的系统扫码界面，体验一致 |
| 相机预授权 | 无需申请 CAMERA 权限 |
| 相册扫码 | 支持从相册选择图片扫码，可禁用 |
| 多码识别 | 支持同时识别多个码，可禁用 |
| 多种码制 | 支持 QR 码、条形码等 13 种码制，可自由组合 |

## 工作流程（5 步）

### 0. 待办事项

使用 todowrite 工具创建包含5项任务的待办事项，在完成每一个步骤之后标记为完成

- [ ] 项目状态检测
- [ ] 扫码入口判断
- [ ] 提取需求信息
- [ ] 代码开发
- [ ] 代码验证

---

### 1. 项目状态检测

自动检测当前项目状态：

| 检测项 | 内容 |
|--------|------|
| 现有代码 | 项目中是否已有扫码相关代码 |
| 页面结构 | 项目中有哪些页面可用于触发扫码 |

> **注意**：默认扫码**不需要**申请 CAMERA 权限（系统预授权），无需检测权限配置。

### 2. 扫码入口判断

根据项目状态和用户输入，自动判断扫码入口。若无法判断扫码入口位置或相关组件，则退出工作流程。

**需要判断的信息：**

| 信息项 | 说明 |
|--------|------|
| 触发页面 | 在哪个页面添加扫码按钮，或者是否需要新建扫码页 |
| 触发方式 | 按钮点击、图片点击等 |

**判断准则：**
- 页面判断：用户指定页面 → 使用用户指定的页面；用户未指定 → 推荐新建扫码页面（因为涉及XComponent全屏相机预览）
- 触发方式：页面上已有扫码相关UI组件（如扫一扫按钮）→ 使用现有组件；否则 → 自行添加按钮

**注意：**若根据项目状态和用户输入，无法判断扫码入口位置或相关组件，则退出工作流程，并提醒用户：本技能需要在已有扫码入口的情况下才能正常工作。

### 3. 提取需求信息

从用户输入中提取需求信息，未明确提到的使用默认值：

| 信息项 | 默认值 | 说明 |
|--------|--------|------|
| 多码识别 | 启用 | enableMultiMode: true |
| 相册扫码 | 启用 | enableAlbum: true |
| 支持码制 | 全部 | scanTypes: [scanCore.ScanType.ALL] |

示例：用户说"帮我加个扫码功能" → 所有配置使用默认值

### 4. 代码开发

根据前面提取的需求信息，直接进行代码开发：

**扫码后处理**：
- 扫码成功后统一使用 `promptAction.showToast({ message: result.originalValue })` 显示扫码结果

**开发步骤：**

1. 在目标页面集成扫码功能（@kit.ScanKit 是系统级 Kit，无需添加依赖），并在扫码成功后处理部分的注释中标注 `TODO: 在此处添加扫码成功后的业务逻辑代码`
   - 参考：references/guides/scan-scanbarcode.md
   - 示例：references/samples/defaultScan/DefaultScan.ets
   - 需要用到：**触发页面**、**触发方式**

   **重要**：必须在调用扫码 API 之前检测设备兼容性，防止在不支持扫码的设备（PC、手表等）上调用扫码 API：
   ```typescript
    import { scanBarcode, scanCore } from '@kit.ScanKit';
    import { BusinessError } from '@kit.BasicServicesKit';
    import { PromptAction, UIContext } from '@kit.ArkUI';

    @Entry
    @Component
    struct Index {
      // 获取当前组件的UIContext
      private uiContext: UIContext = this.getUIContext();
      // 通过UIContext获取PromptAction对象
      private promptAction: PromptAction = this.uiContext.getPromptAction();

      build() {
        // ...
        Button('扫码') // 或其他触发控件
          .onClick(() => {
            // 调用扫码 API 前检测设备能力
            const isScanBarCode = canIUse('SystemCapability.Multimedia.Scan.ScanBarcode');
            if (isScanBarCode) {
              scanBarcode.startScanForResult(this.uiContext.getHostContext()).then((result) => {
                // 扫码成功后显示 Toast
                this.promptAction.openToast({
                  message: result.originalValue,
                  duration: 2000,
                }).catch((error: BusinessError) => {
                  console.error(`openToast error code is ${error.code}, message is ${error.message}`);
                })
                // TODO: 在此处添加扫码成功后的业务逻辑代码
                // ...
              }).catch((error: BusinessError) => {
                // 处理错误
                this.promptAction.openToast({
                  message: '扫码失败: ' + error.message,
                  duration: 2000,
                }).catch((error: BusinessError) => {
                  console.error(`openToast error code is ${error.code}, message is ${error.message}`);
                })
              });
            } else {
              this.promptAction.openToast({
                message: '当前设备不支持默认扫码功能',
                duration: 2000,
              }).catch((error: BusinessError) => {
                console.error(`openToast error code is ${error.code}, message is ${error.message}`);
              })
            }
          })
      }
    }
   ```

2. 实现结果处理逻辑
   - 参考：references/api/scan-scanbarcode-api.md
   - 类型定义：references/api/scan-scancore.md
   - 错误码：references/api/scan-error-code.md
   - 取消处理：references/guides/scan-faq-12.md
   - 扫码成功后显示 Toast：`promptAction.showToast({ message: result.originalValue })`

**开发原则：**

| 原则 | 说明 |
|------|------|
| **示例优先** | 因为 Scan Kit 接口对参数格式和调用时序要求严格，建议直接复制示例代码的写法，这样可以避免常见错误。如果示例代码明显不适用于当前场景，可以根据接口定义做合理调整。 |
| 最小改动 | 尽量少修改原有代码 |
| 错误处理 | 因为用户取消扫码是常见场景，建议处理用户取消扫码的回调，避免出现黑屏或无响应的情况。 |
| 多端部署兼容 | 在扫码入口触发前调用 `canIUse('SystemCapability.Multimedia.Scan.ScanBarcode')` 检测设备能力，不支持的设备上不能调用扫码 API，而应该返回错误信息 |

### 5. 代码验证

验证新增代码的正确性，并在最终的报告中输出验证结果：

1. 使用 builtin_check_editor_errors 工具检查所有修改或新增的代码文件的语法，如果出现错误，则需要修改直到无语法错误。
2. 使用 builtin_execute_build_command 工具对项目进行完整编译，如果出现错误，则需要修改直到编译通过。

---

## 参考资料

| 类型 | 文件 | 用途 |
|------|------|------|
| 开发指南 | `references/guides/scan-scanbarcode.md` | 详细开发步骤 |
| API 参考 | `references/api/scan-scanbarcode-api.md` | 接口定义 |
| 核心类型 | `references/api/scan-scancore.md` | ScanType、ScanResult 等类型 |
| 错误码 | `references/api/scan-error-code.md` | 错误码说明 |
| 示例代码 | `references/samples/defaultScan/DefaultScan.ets` | 完整示例 |
| 元服务 | `references/atomicservice/atomic-scan-default-mode.md` | 元服务开发 |
| 简介 | `references/guides/scan-introduction.md` | Scan Kit 概述和能力介绍 |
| 体验设计 | `references/guides/scan-faq-16.md` | 扫码按钮置灰等体验设计 |
| 错误处理 | `references/guides/scan-faq-12.md` | 取消扫码后如何感知 |
| 数据安全 | `references/guides/scan-personal-data.md` | 个人数据处理说明 |

---

## 完成报告格式

开发完成后，输出：

| 内容 | 说明 |
|------|------|
| 修改摘要 | 新增/修改的文件列表 |
| 核心实现 | 扫码逻辑的关键代码位置和扫码后处理的业务逻辑代码添加位置(`TODO`) |
| 验证方式 | 如何测试功能 |
| 已知限制 | 有何限制或已知问题 |
