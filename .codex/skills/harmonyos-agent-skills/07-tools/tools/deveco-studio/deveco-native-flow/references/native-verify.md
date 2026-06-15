# 多端集成验证（必选）

构建验证通过后，**必须**执行 UI + 日志集成验证。验证不可跳过，不可省略。

---

## 总体流程

```
构建验证通过
    ↓
逐平台执行验证（HarmonyOS → Android → iOS）
    ↓
每个平台：选择设备 → 安装构建产物 → 逐 UserStory 验证 → 汇总报告
    ↓
全部平台验证完成 → 生成集成验证报告
    ↓
存在失败？→ fix / ignore / retry
```

---

## 一、HarmonyOS 设备验证

### 1.1 验证设备矩阵

HarmonyOS 需要在不同形态的设备上验证，确保布局和交互适配正确：

| 顺序 | 设备类型 | 标识 | 验证重点 | 优先级 |
|------|---------|------|---------|--------|
| 1 | 手机 | phone | 基础布局、核心交互流程 | 必选 |
| 2 | 阔折叠 | widefold | 分栏布局、多窗适配 | 推荐 |
| 3 | 折叠屏 | fold | 折叠切换适配、布局重排 | 推荐 |
| 4 | 三折叠 | triplefold | 多折适配、超宽屏布局 | 可选 |
| 5 | 平板 | tablet | 平板布局适配、横屏模式 | 推荐 |

> **最低要求**：至少在手机设备上验证。推荐在手机 + 至少一种大屏设备上验证。

### 1.2 启动验证设备

使用 DevEco MCP 工具或 hdc 命令行操作设备：

#### 方式 A：使用 DevEco MCP 工具（推荐）

```
1. mobile_list_available_devices → 列出可用设备（含模拟器）
2. 如需启动未运行的模拟器：mobile_start_emulator → 启动指定模拟器
3. mobile_take_screenshot → 截图验证
4. mobile_list_elements_on_screen → 获取 UI 元素树
5. mobile_click_on_screen_at_coordinates / mobile_swipe_on_screen → UI 操作
6. mobile_get_device_logs → 获取设备日志
```

#### 方式 B：使用 hdc 命令行

```bash
# 列出已连接设备
hdc list targets

# 列出已安装模拟器
emulator -list -details

# 启动模拟器
emulator -hvd <模拟器名称> -path <实例路径父目录> -imageRoot <SDK路径>

# Windows 注意：路径使用反斜杠
# emulator -hvd "Enjoy 90 Pro Max" -path C:\Users\<用户名>\Huawei\emulator\deployed -imageRoot C:\Users\<用户名>\Library\Huawei\Sdk
```

> 详细的 hdc 操作指令参见 `references/harmony-verify/SKILL.md`。

### 1.3 安装构建产物

```bash
# macOS/Linux
hdc -t <device_id> install -r entry/build/default/outputs/default/entry-default-signed.hap

# Windows
hdc -t <device_id> install -r entry\build\default\outputs\default\entry-default-signed.hap

# 或使用 DevEco MCP
# start_app → 直接启动（自动安装）
```

### 1.4 逐设备类型 + 逐 UserStory 执行验证

对每个设备类型、每个 UserStory，执行以下验证步骤：

1. **启动应用**：`hdc -t <device_id> shell aa start -a <abilityName> -b <bundleName>`
2. **执行操作步骤**：按 UserStory 的操作步骤，使用 `uitest uiInput` 或 DevEco MCP 执行点击、滑动、输入等操作
3. **UI 预期结果验证**：
   - 截图 + 获取 UI 元素树
   - 验证 UI 是否符合预期（布局、文字、颜色、间距等）
4. **日志验证**：收集 hilog，验证关键业务路径的日志输出
5. **截图留痕**：在关键步骤截图保存证据

**截图保存目录**：`.bundle-flow/{requirement_id}/verification/{platform}/{device_type}/`

**日志验证要点**：
- 关键业务路径的日志输出是否符合预期
- 是否有 Error/Fatal 级别日志
- 性能相关日志（启动时间、页面加载时间等）

### 1.5 HarmonyOS 特有验证项

| 验证项 | 说明 | 适用设备 |
|--------|------|---------|
| 布局适配 | 组件在不同屏幕尺寸下是否正确显示 | 全部 |
| 折叠切换 | 折叠/展开时布局是否正确重排 | fold, widefold, triplefold |
| 分栏模式 | 大屏下是否正确展示分栏布局 | widefold, tablet |
| 安全区避让 | 状态栏、导航栏、刘海区域是否正确避让 | 全部 |
| 横竖屏切换 | 旋转屏幕后布局是否正确 | phone, tablet |
| 弹窗/Sheet | 弹窗和 Sheet 在不同屏幕尺寸下的展示 | 全部 |
| 列表滚动 | LazyForEach 列表在不同设备上的滚动性能 | 全部 |

---

## 二、Android 设备验证

### 2.1 验证设备矩阵

| 顺序 | 设备类型 | 验证重点 | 优先级 |
|------|---------|---------|--------|
| 1 | 手机（小屏） | 基础布局、核心交互 | 必选 |
| 2 | 手机（大屏） | 大屏适配 | 推荐 |
| 3 | 平板 | 平板布局、横屏模式 | 推荐 |
| 4 | 折叠屏 | 折叠切换适配 | 可选 |

> **最低要求**：至少在一种手机设备上验证。

### 2.2 启动验证设备

```bash
# 列出可用设备（真机 + 模拟器）
adb devices

# 启动模拟器（如未运行）
emulator -avd <avd_name>

# 或使用 Android Studio 的模拟器管理器启动
```

### 2.3 安装构建产物

```bash
# 安装 APK
adb -s <device_id> install -r app/build/outputs/apk/debug/app-debug.apk

# 启动应用
adb -s <device_id> shell am start -n <package>/<activity>
```

### 2.4 逐设备类型 + 逐 UserStory 执行验证

1. **启动应用**：`adb -s <device_id> shell am start -n <package>/<activity>`
2. **执行操作步骤**：使用 `adb shell input` 执行点击、滑动、输入等操作
3. **UI 预期结果验证**：截图 + UI Automator dump
4. **日志验证**：`adb -s <device_id> logcat -d -s <tag>` 收集应用日志
5. **截图留痕**：`adb -s <device_id> shell screencap -p /sdcard/screenshot.png` + `adb pull`

**截图保存目录**：`.bundle-flow/{requirement_id}/verification/android/{device_type}/`

### 2.5 Android 特有验证项

| 验证项 | 说明 |
|--------|------|
| 多分辨率适配 | 不同 dpi/屏幕尺寸下布局是否正确 |
| 返回键行为 | 系统返回键是否正确处理 |
| 生命周期 | 切换应用/锁屏/旋转屏幕后状态恢复 |
| 权限处理 | 运行时权限申请和拒绝处理 |
| 通知行为 | 通知展示和点击处理 |

---

## 三、iOS 设备验证

### 3.1 验证设备矩阵

| 顺序 | 设备类型 | 验证重点 | 优先级 |
|------|---------|---------|--------|
| 1 | iPhone（小屏） | 基础布局、核心交互 | 必选 |
| 2 | iPhone（大屏/Pro Max） | 大屏适配 | 推荐 |
| 3 | iPad | iPad 布局、分屏模式 | 推荐 |

> **最低要求**：至少在一种 iPhone 设备上验证。

### 3.2 启动验证设备

```bash
# 列出可用模拟器
xcrun simctl list devices

# 启动模拟器
xcrun simctl boot "<device_name>"

# 打开 Simulator.app
open -a Simulator
```

### 3.3 安装构建产物

```bash
# 安装 .app 到模拟器
xcrun simctl install <device_id> <path_to_app>

# 启动应用
xcrun simctl launch <device_id> <bundle_id>
```

### 3.4 逐设备类型 + 逐 UserStory 执行验证

1. **启动应用**：`xcrun simctl launch <device_id> <bundle_id>`
2. **执行操作步骤**：使用 `xcrun simctl io` 截图 + 手动操作或 XCUITest 自动化
3. **UI 预期结果验证**：截图比对
4. **日志验证**：`xcrun simctl spawn <device_id> log stream --predicate '<predicate>'`
5. **截图留痕**：`xcrun simctl io <device_id> screenshot <local_path>`

**截图保存目录**：`.bundle-flow/{requirement_id}/verification/ios/{device_type}/`

### 3.5 iOS 特有验证项

| 验证项 | 说明 |
|--------|------|
| Safe Area 适配 | 刘海/灵动岛区域是否正确避让 |
| 暗色模式 | Light/Dight 模式下 UI 是否正确 |
| 动态字体 | 辅助功能大字体下布局是否正常 |
| 分屏模式 | iPad 分屏下布局是否正确 |
| App 生命周期 | 切换应用/锁屏后状态恢复 |

---

## 四、验证报告

所有平台和设备类型验证完成后，汇总生成集成验证报告，保存到 `.bundle-flow/{requirement_id}/verification-report-{platform}.md`。

### 4.1 报告模板

```markdown
# 集成验证报告

> 平台: {HarmonyOS/Android/iOS}
> 验证设备: {设备类型列表}
> 验证时间: YYYY-MM-DDTHH:mm:ssZ
> 需求: {requirement_id}

## 验证结果总览

### 按设备类型

| 设备类型 | 通过/总数 | 通过率 | 备注 |
|----------|----------|--------|------|
| 手机 | M/N | xx% | |
| 平板 | M/N | xx% | |

### 按 UserStory

| UserStory | 标题 | 手机 | 平板 | 综合状态 |
|-----------|------|------|------|----------|
| US-1 | {标题} | ✅/❌ | ✅/❌ | ✅/❌/⚠️ |
| US-2 | {标题} | ✅/❌ | — | ✅/❌ |

## 详细验证结果

### US-1: {标题}

**设备**: 手机 ({device_id})

| 步骤 | 操作 | 预期结果 | 实际结果 | 状态 |
|------|------|---------|---------|------|
| 1 | 点击"编辑"按钮 | 进入编辑页面 | 进入编辑页面 | ✅ |
| 2 | 修改昵称为 "Test" | 输入框显示 "Test" | 输入框显示 "Test" | ✅ |

**日志验证**:
- TAG: `UserProfile` 包含 `save_profile success` → ✅

**截图**: `verification/{platform}/phone/us1_step1.png`

## 未通过问题汇总

| # | UserStory | 设备 | 问题描述 | 严重程度 | 建议处理 |
|---|-----------|------|---------|---------|---------|
| 1 | US-2 | 平板 | 列表项间距过大 | 低 | 后续修复 |
```

### 4.2 更新状态

验证完成后更新 `state.json`：

```json
{
  "completed_phases": ["locator", "setup", "analyse", "plan", "coding", "build", "verify"]
}
```

---

## 五、失败处理

- **全部通过** → 流程结束，输出验证报告路径
- **存在失败** → 输出验证报告，询问用户：

| 选项 | 说明 |
|------|------|
| **fix** | 回到编码阶段修复问题，修复后重新构建并重新验证 |
| **ignore** | 忽略失败项，标记为已知问题，流程结束 |
| **retry** | 不修改代码，重新执行失败的 UserStory |

---

## 六、MCP 工具快速参考

### HarmonyOS（DevEco MCP + mobile-mcp）

| 操作 | DevEco MCP 工具 | mobile-mcp 工具 |
|------|----------------|----------------|
| 列出设备 | — | mobile_list_available_devices |
| 启动模拟器 | — | mobile_start_emulator |
| 启动应用 | start_app | mobile_launch_app |
| 截图 | perform_ui_action(screenshot) | mobile_take_screenshot |
| 获取 UI 树 | get_app_ui_tree | mobile_list_elements_on_screen |
| 点击 | perform_ui_action(click) | mobile_click_on_screen_at_coordinates |
| 滑动 | perform_ui_action(directionalFling) | mobile_swipe_on_screen |
| 输入文字 | perform_ui_action(inputText) | mobile_type_keys |
| 获取日志 | — | mobile_get_device_logs |
| 按键 | perform_ui_action(keyEvent) | mobile_press_button |

### Android（mobile-mcp）

| 操作 | mobile-mcp 工具 |
|------|----------------|
| 列出设备 | mobile_list_available_devices |
| 启动应用 | mobile_launch_app |
| 截图 | mobile_take_screenshot |
| 获取 UI 树 | mobile_list_elements_on_screen |
| 点击 | mobile_click_on_screen_at_coordinates |
| 滑动 | mobile_swipe_on_screen |
| 输入文字 | mobile_type_keys |
| 获取日志 | mobile_get_device_logs |
| 按键 | mobile_press_button |

### iOS（mobile-mcp）

| 操作 | mobile-mcp 工具 |
|------|----------------|
| 列出设备 | mobile_list_available_devices |
| 启动应用 | mobile_launch_app |
| 截图 | mobile_take_screenshot |
| 获取 UI 树 | mobile_list_elements_on_screen |
| 点击 | mobile_click_on_screen_at_coordinates |
| 滑动 | mobile_swipe_on_screen |
| 输入文字 | mobile_type_keys |
| 获取日志 | mobile_get_device_logs |
| 按键 | mobile_press_button |

---

## 七、跨平台一致性校验

当需求涉及多端时，除各端独立验证外，还需进行跨端一致性校验：

| 校验项 | 说明 |
|--------|------|
| 功能一致性 | 同一 UserStory 在各端的核心功能是否一致 |
| 交互一致性 | 相同操作的交互方式是否一致（或符合平台规范） |
| 数据一致性 | 各端展示的数据是否一致 |
| 视觉一致性 | 品牌色、字体、间距等视觉规范是否一致 |

跨端一致性校验结果记录在各端验证报告的"跨端一致性"章节中。