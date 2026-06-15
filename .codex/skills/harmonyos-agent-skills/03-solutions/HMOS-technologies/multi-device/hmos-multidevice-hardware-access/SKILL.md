---
name: hmos-multidevice-hardware-access
description: Handle HarmonyOS hardware-capability adaptation through a declarative scene and resource index. Use when the task involves camera selection, camera rotation/stride/foldable adaptation, canIUse or SysCap checks, hardware fallback strategy, or multi-device hardware behavior differences.
metadata:
  version: 1.0.1
  keywords:
    - 硬件调用适配
    - 硬件能力检测
    - SysCap
    - canIUse
    - module.json5
    - 相机选择
    - camera selection
    - 相机枚举
    - 相机旋转
    - 预览旋转
    - 拍照旋转
    - stride花屏
    - 硬件降级
    - 能力降级
    - 多设备硬件差异
---

# 硬件调用适配

## 技能定义

| 字段                 | 内容                                                                                       |
| ------------------ | ---------------------------------------------------------------------------------------- |
| `skill_id`         | `hardware-access`                                                                        |
| `skill_name`       | `硬件调用适配`                                                                                 |
| `one_line_purpose` | 为硬件能力检测与相机适配提供统一接入与降级策略。                                                        |
| `device_scope`     | `phone / tablet / 2in1 / wearable / tv`                                      |
| `problem_scope`    | `SysCap、canIUse、相机枚举、折叠态相机重建、预览旋转、拍照旋转、stride花屏`                 |
| `not_in_scope`     | `与硬件无关的纯 UI 布局问题、无能力差异的普通业务逻辑、视频编解码与流媒体、第三方相机库`                                          |
| `primary_outputs`  | `primary_scene`、`device_constraints`、`code_touchpoints`、`fix_plan`、`verification_matrix` |

## 核心约束

### 通用硬件约束

1. 先做能力检测，再调用相关 API。
2. 涉及系统能力时，必须同时检查 `canIUse()` 和 `module.json5` 声明。
3. **SysCap 粒度约束**：SysCap 是设备级别的能力标识，不细分到具体传感器类型。canIUse 传入的字符串必须与 SDK `device-define/*.json` 中定义的完全一致，禁止自行拼接细粒度后缀。常见正确/错误对照：

   | 正确 SysCap | 错误写法（不存在） |
   |---|---|
   | `SystemCapability.Sensors.MiscDevice` | ~~`SystemCapability.Sensors.MiscDevice.Vibrator`~~ |
   | `SystemCapability.Sensors.Sensor` | ~~`SystemCapability.Sensors.Sensor.Accelerometer`~~ / ~~`SystemCapability.Sensors.Sensor.Gravity`~~ |
   | `SystemCapability.Multimedia.Camera.Core` | ~~`SystemCapability.Multimedia.Camera.Core.Front`~~ |

   不确定 SysCap 字符串时，须查阅 SDK `device-define/phone.json` 等文件确认。
4. 涉及相机时优先枚举设备，不要硬编码相机 ID。
5. 输出方案必须包含"不支持时怎么降级、隐藏、替代或提示"。
6. **VAL 阶段路由强制要求**：当验证涉及折叠设备多形态验证、hidumper 模拟、分辨率阶梯验证时，**不得在本 SKILL 内自行执行验证操作**（如直接调用 hdc 截屏、尝试悬浮窗等），必须按以下步骤路由：
- 读取 `../hmos-multidevice-scenario-entry/references/multi-device-verification.md`
- 按文档中的标准流程执行验证

### 相机专用约束

1. **折叠态切换必须重建相机**：监听 `foldStatusChange`，重新枚举设备、重建 XComponent 与预览流。半折叠态（悬停态）为过渡状态，正常场景跳过，仅 HW-02-hover 场景处理。
2. **stride 必须比对 width**：ImageReceiver 取帧时 `rowStride ≠ width` 须去除无效像素防花屏，stride 不可硬编码。
3. **Surface 宽高比匹配旋转后比例**：`display.rotation` 0°/180° 时宽高比取倒数，90°/270° 时相同。拉伸/压缩归本约束，花屏堆叠归约束 2。
4. **预览旋转 = 安装角 + 屏幕旋转**：推荐 `getPreviewRotation()`，后摄 90° + `Display.rotation×90°`，前摄 270° + `Display.rotation×90°`。
5. **拍照旋转依赖重力传感器**：后摄 `90° + 重力方向`，前摄 `270° - 重力方向`；`capture()` 须设置 `rotation`。
6. **阔折叠外屏仅前置**：外屏切换时须处理后置不可用回退。
7. **旋转策略按断点区分**：sm 不旋转，md/lg 支持旋转（窗口最小维度 ≥ 600vp）。
8. **2in1 相机**：大部分仅前置内置，外接摄像头不在此范围。

## 阶段标签

| 标签    | 阶段     | 当前模块关注点                                   |
| ----- | ------ | ----------------------------------------- |
| `REQ` | 需求分析设计 | 能力边界、设备差异、降级策略、相机能力与折叠态适配范围               |
| `DEV` | 开发     | 检测入口、枚举逻辑、生命周期绑定、折叠态相机重建、stride 处理、旋转角度计算 |
| `FIX` | 问题修复   | 无能力崩溃、相机选择错误、预览花屏、旋转异常        |
| `VAL` | 功能验证   | canIUse 结果、设备枚举结果、降级行为、连接切换证据、相机功能全设备验证   |

## 输出规范

进行场景路由时，输出路由阶段字段。各场景按 `phase_tags` 继承对应阶段的交付物字段。`deliverables: standard` 时输出以下全部字段。

| 阶段 | 字段 | 说明 |
| --- | --- | --- |
| 路由 | `primary_phase` | 当前主要聚焦阶段，决定输出主线方向 |
| 路由 | `primary_scene` | 命中的主场景 ID（如 HW-01、HW-02-stride 等） |
| 路由 | `secondary_scenes` | 关联的协同分析场景 ID |
| 路由 | `resources_used` | 实际加载的参考文档资源 ID 列表 |
| `REQ` | `device_constraints` | 硬件能力差异约束：哪些设备具备目标硬件、检测前置条件、降级/隐藏/替代策略；相机场景含 stride 值与折叠态限制 |
| `REQ` | `capability_boundary` | 当前方案支持与不支持的硬件能力组合，需枚举或声明校验的能力清单 |
| `REQ` | `acceptance_focus` | 需求验收时须确认的能力检测结果、降级路径与设备切换行为 |
| `DEV` | `code_touchpoints` | 需修改或新增的代码位置及文件路径（调用入口、枚举逻辑、生命周期绑定、module.json5 声明等） |
| `DEV` | `reuse_resources` | 可直接复用或稍作扩展的现有代码、配置、工具函数 |
| `DEV` | `implementation_notes` | API 调用顺序、线程安全、生命周期依赖等实现注意点 |
| `DEV` | `integration_risks` | 改动可能引发的跨模块联动影响（如影响其他页面相机生命周期） |
| `FIX` | `problem_profile` | 缺陷完整画像：症状、复现步骤、影响设备和版本、是否必现 |
| `FIX` | `root_cause_hypothesis` | 基于日志/堆栈/代码审查的最可能根因 |
| `FIX` | `fix_plan` | 修复步骤与代码变更清单（含 module.json5 声明修改） |
| `FIX` | `regression_watchlist` | 修复后须重点回归的功能点与设备组合 |
| `VAL` | `verification_matrix` | 覆盖多设备类型与多场景的测试用例矩阵 |
| `VAL` | `evidence_requirements` | 需采集的证据（canIUse 截图、枚举日志、预览效果、折叠切换日志等） |
| `VAL` | `pass_criteria` | 可验证的验收基准（如"所有设备预览无花屏""折叠切换无崩溃"） |
| `VAL` | `residual_risks` | 验证后仍存在的已知限制（如部分设备未覆盖） |


## 决策树

```yaml
decision_tree:
  entry_point: root
  matching_mode: depth_first_then_halt
  disambiguation: declaration_order

  nodes:
    root:
      branches:
        - condition: {type: keywords_any, values: [canIUse, SystemCapability, SysCap, module.json5, 不支持, 能力检测, 功能降级, 硬件能力, 功能入口], intent: 判断设备是否支持某硬件能力、不支持时功能入口展示/隐藏}
          action: {invoke_scene: HW-01}

        - condition: {type: keywords_any, values: [相机, 拍照, 预览, 摄像头, 前置, 后置, 折叠, 旋转, stride, 花屏, 枚举, 黑屏, 拍照旋转, 录像, 折叠屏, foldStatus, rowStride, getPreviewRotation, capture, 拉伸, ImageReceiver], intent: 相机选择、预览、旋转、折叠态切换或 stride 处理}
          action: {invoke_scene: HW-02, description: 命中后由 HW-02 子路由规则进一步分发}

        - condition: {type: fallback}
          action: {prompt_user: "无法自动判定，请确认：能力检测(HW-01) / 相机适配(HW-02) / 超出范围"}

  fallback_rules:
    - 场景不存在时回退至上一级节点重新匹配
    - root 回退耗尽时提示用户明确场景类型
```

## 场景索引

#### `HW-01` 能力检测与功能降级

```yaml
scene_id: HW-01
scene_name: 能力检测与功能降级
phase_tags: [REQ, DEV, FIX, VAL]
intent_signals:
  - canIUse
  - SystemCapability
  - SysCap
  - module.json5
  - 不支持
applies_when:
  - 需要判断设备是否支持某硬件能力
  - 当前问题表现为不支持设备上仍显示功能入口或直接调用崩溃
not_applies_when:
  - 当前功能不依赖任何设备硬件差异
decisions:
  REQ:
    - 确认当前功能依赖哪些 SysCap，列出 must-have 与 nice-to-have 清单
    - 评估不支持设备上的降级路径（隐藏/置灰/替代/提示）的合理性与完整性
    - 检查 module.json5 声明与 canIUse() 调用点是否一一对应，杜绝无声明调用
  DEV:
    - 参考 syscap_mechanism.md 示例代码实现能力检测入口，遵循 canIUse() 调用时机规范
    - 在可能崩溃的调用路径之前完成检测，避免检测后置
    - 复用现有降级组件或工具函数，避免各页面重复实现不支持逻辑
  FIX:
    - 定位无能力崩溃的调用栈，反向追溯缺失的能力检测点
    - 比照正反例确认修复方案覆盖所有同类调用入口
    - 检查 module.json5 声明是否遗漏，补齐后再验证
  VAL:
    - 在声明的 device_scope 设备上验证 canIUse 结果与预期一致
    - 确认不支持设备上功能入口已按预期隐藏/置灰/替代/提示
    - 验证降级后其他功能路径无链式崩溃
deliverables: standard
resource_refs:
  - RSC_HW_01
  - RSC_HW_07
```

#### `HW-02` 相机选择、预览与形态切换

```yaml
scene_id: HW-02
scene_name: 相机选择、预览与形态切换
phase_tags: [REQ, DEV, FIX, VAL]
intent_signals:
  - 相机枚举
  - 前置相机
  - 后置相机
  - 预览旋转
  - 折叠屏相机
  - 花屏
  - stride
  - 拍照旋转
  - 录像角度
applies_when:
  - 需要拍照、预览、切前后摄或适配不同设备形态下的相机行为
  - 当前问题表现为默认相机错误、预览角度不对或设备切换后相机失效
  - 折叠状态变化导致相机设备不可用、黑屏
  - 预览流花屏、堆叠状偏移
  - 预览/拍照/录像旋转角度异常
not_applies_when:
  - 当前功能不使用相机
decisions:
  REQ:
    - 梳理目标设备类型（phone/tablet/2in1/foldable）的相机硬件差异
    - 评估相机枚举策略在全场景下的覆盖度（前/后摄、折叠切换、外屏）
    - 确认相机约束文档的技术边界是否与当前需求对齐
  DEV:
    - 参考 camera-foldable-adaptation.md 实现相机枚举和设备重建逻辑
    - 遵循 stride 处理、旋转角度计算的 API 调用规范和最佳实践
    - 确保 XComponent 和预览流的生命周期与折叠态变化事件正确绑定
  FIX:
    - 通过日志/堆栈定位相机选择错误或切换崩溃的具体调用链
    - 参考正反例代码片段区分根因类别（折叠态/stride/旋转/枚举错误）
    - 确认修复不引入新的折叠态感知或方向感知问题
  VAL:
    - 在所有目标设备类型上验证相机枚举结果正确
    - 确认折叠切换后相机无黑屏、预览无花屏、旋转角度准确
    - 验证阔折叠外屏/2in1 回退策略按预期生效
sub_scenes:
  - HW-02-bugfix: 相机问题修复（含正反例代码片段）
  - HW-02-fold: 折叠屏相机设备选择与重建
  - HW-02-stride: 预览流 stride 处理防花屏
  - HW-02-rotation: 预览/拍照/录像旋转角度适配
deliverables: standard
resource_refs:
  - RSC_HW_02
  - RSC_HW_03
  - RSC_HW_04
  - RSC_HW_05
  - RSC_HW_06
```

##### HW-02 子场景说明

| 子场景            | 说明                                                | 关键验收点                        |
| -------------- | ------------------------------------------------- | ---------------------------- |
| HW-02-bugfix   | 完整问题修复场景（含正反例代码片段）。命中时根据根因关键词（折叠/花屏/旋转）按需触发对应子场景协同加载。无匹配时不加载 | 问题是否解决 + 匹配到的关联场景无回归 |
| HW-02-fold     | 折叠状态变化时相机设备选择与重建。覆盖阔折叠外屏仅前置、2in1 内置相机等特殊场景        | 折叠态切换无黑屏、相机设备正确重建            |
| HW-02-stride   | 通过 ImageReceiver 获取预览流每帧数据做二次处理时，正确处理 stride 内存对齐 | stride ≠ width 时像素处理正确，无花屏堆叠 |
| HW-02-rotation | 预览/拍照/录像旋转角度获取与设置、Surface 宽高比计算                   | 预览方向正确、无拉伸                   |

##### HW-02 路由规则

```yaml
routing_rules:
  - keywords: [相机, 问题, 修复]
    sub_scene: HW-02-bugfix
    auto_load_concepts: [RSC_HW_03]
    co_load_scenes:
      - scene_id: HW-02-fold
        trigger_keywords: [折叠, 折叠屏, foldStatus, 相机切换, 外屏, 2in1]
      - scene_id: HW-02-stride
        trigger_keywords: [花屏, stride, 堆叠状, 内存对齐, rowStride, PixelMap]
      - scene_id: HW-02-rotation
        trigger_keywords: [旋转, 方向, 角度, 预览拉伸, 拍照方向, Surface宽高比, 录像方向]
    co_load_strategy: keyword_triggered
    co_load_error_handling: partial_graceful
  - keywords: [折叠, 折叠屏, foldStatus, 相机切换, PuraX, 外屏, 折叠后相机不可用]
    sub_scene: HW-02-fold
    auto_load_concepts: [RSC_HW_02]
  - keywords: [花屏, stride, 堆叠状, 内存对齐, rowStride, PixelMap, 预览花屏]
    sub_scene: HW-02-stride
    auto_load_concepts: [RSC_HW_04]
  - keywords: [旋转, 方向, 角度, getPreviewRotation, setPreviewRotation, capture(rotation), 预览拉伸, Surface宽高比, 预览画面压缩, 相机旋转]
    sub_scene: HW-02-rotation
    auto_load_concepts: [RSC_HW_05, RSC_HW_06]
```

###### `HW-02-bugfix` 相机问题修复

```yaml
scene_id: HW-02-bugfix
scene_name: 相机问题修复
phase_tags: [DEV, FIX, VAL]
intent_signals:
  - 问题修复
  - bug
  - 正例
  - 反例
  - 崩溃
  - 异常
  - 黑屏
  - 花屏
  - 旋转异常
applies_when:
  - 相机相关功能出现 bug 需要定位修复
  - 需要参考正反例代码片段
  - 需要区分根因、问题场景和解决方案
not_applies_when:
  - 仅做需求分析阶段
  - 不涉及相机
co_load_scenes:
  - scene_id: HW-02-fold
    trigger_keywords: [折叠, 折叠屏, foldStatus, 相机切换, 外屏, 2in1]
    reason: 根因涉及折叠态切换，需加载折叠屏适配场景确认无黑屏/设备未切换/回退策略回归
    on_failure: warn_continue
  - scene_id: HW-02-stride
    trigger_keywords: [花屏, stride, 堆叠状, 内存对齐, rowStride, PixelMap]
    reason: 根因涉及 stride 内存对齐，需加载 stride 处理场景确认无花屏/行偏移回归
    on_failure: warn_continue
  - scene_id: HW-02-rotation
    trigger_keywords: [旋转, 方向, 角度, 预览拉伸, 拍照方向, Surface宽高比, 录像方向]
    reason: 根因涉及旋转角度适配，需加载旋转场景确认无方向错误/画面拉伸回归
    on_failure: warn_continue
co_load_strategy: keyword_triggered
co_load_match_rule: 根据用户提示词中的关键词与各子场景 trigger_keywords 做交集匹配，匹配即加载；无匹配时不加载任何协同场景
co_load_error_strategy: partial_graceful
co_load_error_message_template: "[HW-02-bugfix] 协同加载子场景 {scene_id} 失败: {reason}。已加载 {loaded_count}/{total_count} 个子场景，可继续修复但建议单独验证 {failed_scenes}。"
decisions:
  DEV:
    - 参考 camera-bug-fix-cases.md 中的正例代码实现修复，避免反例模式
    - 遵循相机核心约束中的 API 调用规范，确保修复不破坏现有设备兼容性
    - 对照最佳实践检查修复代码与现有架构的一致性
  FIX:
    - 归类问题根因（折叠态重建/stride 内存对齐/旋转角度/枚举错误）
    - 比照正反例代码片段选择对应修复策略
    - 排查同类问题是否在项目其他调用路径上存在
    - 触发修复时根据根因关键词匹配对应的协同加载子场景（撑→HW-02-fold / 花屏→HW-02-stride / 旋转→HW-02-rotation），执行匹配到的子场景 FIX 阶段 decisions 检查项作为回归验证基线
  VAL:
    - 在 bug 报告的设备型号和系统版本上验证修复生效
    - 回归验证关联子场景（折叠切换/旋转/stride）无新增问题
    - 确认正反例文档中列出的所有问题模式已覆盖验证
deliverables: standard
resource_refs:
  - RSC_HW_03
```

###### `HW-02-fold` 折叠屏相机设备选择与重建

```yaml
scene_id: HW-02-fold
scene_name: 折叠屏相机设备选择与重建
phase_tags: [REQ, DEV, FIX, VAL]
intent_signals:
  - 折叠
  - 折叠屏
  - foldStatus
  - 相机切换
  - PuraX
  - 外屏
  - 折叠后相机不可用
  - 2in1
applies_when:
  - 折叠状态变化导致相机设备不可用、黑屏
  - 阔折叠外屏（如 PuraX）仅有前置相机
  - 2in1 设备相机适配
  - 热启动相机恢复
not_applies_when:
  - 当前功能不使用相机
  - 设备不支持折叠
decisions:
  REQ:
    - 梳理目标折叠设备（阔折叠/普通折叠/2in1）的相机硬件配置差异
    - 评估折叠态变化（展开→折叠→半折叠）时的相机设备切换方案可行性
    - 确认阔折叠外屏仅前置、2in1 内置相机等特殊约束边界
  DEV:
    - 参考 camera-foldable-adaptation.md 实现 foldStatusChange 监听与相机重建
    - 遵循半折叠态过渡处理规范，正常场景跳过、仅 HW-02-hover 场景处理
    - 实现阔折叠外屏后置不可用时的前置回退逻辑
  FIX:
    - 定位折叠切换后黑屏/不可用的具体触发路径
    - 区分根因：未监听 foldStatus / 重建时机错误 / 相机 ID 硬编码
    - 确认修复后热启动恢复功能正常
  VAL:
    - 在阔折叠和普通折叠设备上验证展开/折叠/半折叠全路径
    - 确认折叠切换后相机设备正确重建、预览无黑屏
    - 验证外屏仅前置场景的回退策略按预期生效
deliverables: standard
resource_refs:
  - RSC_HW_02
```

###### `HW-02-stride` 预览流 stride 处理防花屏

```yaml
scene_id: HW-02-stride
scene_name: 预览流 stride 处理防花屏
phase_tags: [DEV, FIX, VAL]
intent_signals:
  - 花屏
  - stride
  - 堆叠状
  - 内存对齐
  - rowStride
  - PixelMap
  - 预览花屏
applies_when:
  - 通过 ImageReceiver 获取预览帧数据做二次处理
  - stride 与 width 不一致导致花屏堆叠
not_applies_when:
  - 不涉及 ImageReceiver 帧数据处理
  - 画面拉伸/压缩（归旋转约束）
decisions:
  DEV:
    - 参考 camera-stride-handling.md 实现 rowStride 与 width 比对逻辑
    - 遵循无效像素去除的最佳实践，避免硬编码 stride 值
    - 确保处理逻辑适配不同平台的 stride 差异
  FIX:
    - 定位花屏（堆叠状偏移）对应的 stride 处理缺失点
    - 区分根因：stride 硬编码 / 未比对 width / 未去除无效像素
    - 确认修复覆盖所有 ImageReceiver 帧数据处理入口
  VAL:
    - 在多设备上验证 stride ≠ width 时无花屏堆叠
    - 确认去除无效像素后图像质量符合预期
    - 验证 stride == width 时不引入额外处理开销
deliverables: standard
resource_refs:
  - RSC_HW_04
```

###### `HW-02-rotation` 相机旋转角度适配

```yaml
scene_id: HW-02-rotation
scene_name: 相机旋转角度适配
phase_tags: [REQ, DEV, FIX, VAL]
intent_signals:
  - 旋转
  - 方向
  - 角度
  - getPreviewRotation
  - setPreviewRotation
  - capture(rotation)
  - 预览拉伸
  - Surface宽高比
  - 预览画面压缩
  - 相机旋转
  - 拍照旋转
  - 录像角度
applies_when:
  - 预览/拍照/录像旋转角度异常
  - Surface 宽高比不匹配导致画面拉伸
  - 拍照方向错误
not_applies_when:
  - 当前功能不使用相机
decisions:
  REQ:
    - 梳理预览旋转/拍照旋转/录像旋转三个层次的各自需求与依赖关系
    - 评估 Surface 宽高比与旋转角度的数学关系在不同设备上的适用性
    - 确认 sm/md/lg 断点旋转策略差异的约束边界
  DEV:
    - 参考 camera-rotation-adaptation.md 实现 getPreviewRotation/setPreviewRotation 调用
    - 遵循拍照旋转依赖重力传感器的计算规范，确保 capture() 时设置正确 rotation
    - 实现 Surface 宽高比随 display.rotation 动态调整逻辑
  FIX:
    - 定位旋转异常的具体表现：预览方向错误/拍照角度错误/画面拉伸
    - 区分根因：旋转角度计算错误/宽高比不匹配/capture 未传 rotation
    - 确认修复后预览、拍照、录像三个路径旋转一致
  VAL:
    - 在 0°/90°/180°/270° 四个方向上验证预览和拍照角度准确
    - 确认 Surface 宽高比随旋转动态调整，无画面拉伸或压缩
    - 验证 sm 断点设备不旋转行为符合预期
deliverables: standard
resource_refs:
  - RSC_HW_05
  - RSC_HW_06
```

## 资源索引

### 通用硬件资源

#### `RSC_HW_01` 能力检测参考

```yaml
resource_id: RSC_HW_01
path: ./references/syscap_mechanism.md
used_for:
  - 定义 SysCap 和 canIUse 的检测边界
  - 设计功能展示、降级和异常提示策略
load_when:
  - 命中 HW-01
avoid_when:
  - 当前功能不依赖硬件差异
```

#### `RSC_HW_07` 传感器权限与类型映射参考

```yaml
resource_id: RSC_HW_07
path: ./references/sensor-overview.md
used_for:
  - 传感器类型与权限名映射（ACCELEROMETER/GYROSCOPE/PEDOMETER/HEART_RATE 等）
  - 敏感级别判断（system_grant vs user_grant）决定运行时是否需动态请求权限
  - SensorId 枚举值速查，确保 sensor.on() 第一个参数使用正确枚举
  - 传感器坐标系与运作机制参考
  - API 接口速查（on/once/off/getSensorList/getSingleSensorSync 等）
  - 传感器动态上下线监听（sensorStatusChange），对应 syscap_mechanism.md 第 3 步
  - SensorInfoParam 多设备场景参数（deviceId/sensorIndex）
  - 采样周期 interval 约束与功耗关系
  - 完整开发步骤代码示例（权限配置→导入→查询→订阅→取消）
load_when:
  - 命中 HW-01 且涉及传感器能力检测
  - 涉及 sensor API 调用需确认权限声明
avoid_when:
  - 当前不涉及传感器
```

### 相机资源

#### `RSC_HW_02` 适配不同折叠状态的摄像头变更技术方案参考

```yaml
resource_id: RSC_HW_02
path: ./references/camera-foldable-adaptation.md
used_for:
  - 设计相机枚举、默认选择和预览行为
  - 多设备环境下的相机设备选择逻辑
  - 阔折叠外屏/2in1 设备相机回退策略
  - 热启动相机恢复
load_when:
  - 命中 HW-02-fold
avoid_when:
  - 当前不涉及相机
```

#### `RSC_HW_03` 相机问题修复场景库

```yaml
resource_id: RSC_HW_03
path: ./references/camera-bug-fix-cases.md
used_for:
  - 相机问题定位与修复
  - 正反例代码片段参考
  - 区分根因、问题场景和解决方案
load_when:
  - 命中 HW-02-bugfix
avoid_when:
  - 当前不涉及相机
```

#### `RSC_HW_04` 预览流 stride 处理参考

```yaml
resource_id: RSC_HW_04
path: ./references/camera-stride-handling.md
used_for:
  - 处理预览流 stride 内存对齐导致的相机花屏
  - ImageReceiver 二次处理场景
load_when:
  - 命中 HW-02-stride
avoid_when:
  - 不涉及 ImageReceiver 帧数据处理
```

#### `RSC_HW_05` 相机旋转角度适配参考

```yaml
resource_id: RSC_HW_05
path: ./references/camera-rotation-adaptation.md
used_for:
  - 预览旋转角度获取与设置
  - Surface 宽高比计算
  - 拍照旋转角度计算
  - 录像旋转角度设置
load_when:
  - 命中 HW-02-rotation
  - 出现预览拉伸、拍照方向异常
avoid_when:
  - 不涉及旋转角度问题
```

#### `RSC_HW_06` 相机旋转角度术语参考

```yaml
resource_id: RSC_HW_06
path: ./references/camera-rotation-terms.md
used_for:
  - 理解相机旋转相关角度概念和术语
  - 作为角度适配的概念基线
  - 角度概念混淆排查
load_when:
  - 命中 HW-02-rotation
  - 需求分析阶段涉及相机旋转
avoid_when:
  - 仅需实现代码，不涉及角度问题
```
