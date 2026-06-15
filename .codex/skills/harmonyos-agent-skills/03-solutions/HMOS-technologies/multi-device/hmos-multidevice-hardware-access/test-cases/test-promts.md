# Hardware Access Test Prompts

用于验证 `hardware-access` 的三层测试能力（smoke / scene-functional / real-world），覆盖 SKILL.md 中 HW-01、HW-02-fold、HW-02-stride、HW-02-rotation 共 4 个有效场景。

> **对应文件结构**：
> - `smoke/smoke-hardware-access.json` — 11 个冒烟测试用例
> - `scene-functional/scene-functional-hardware-access.json` — 4 个场景功能测试用例
> - `real-world/real-world-hardware-access.json` — 7 个真实场景修复用例（全部来自 `camera-bug-fix-cases.md`）

---

## 1. Smoke Prompts（11 个 — 路由验证）

> Smoke 测试目的：验证 SKILL 路由引擎能否通过 intent_signals 正确命中所有 4 个场景及 phase，覆盖全部 11 个实际测试用例。

### HW-01 DEV 路由 — 能力检测与降级

应用需要根据设备是否支持蓝牙外设和摄像头能力做差异化接入，并在能力不足时提供降级路径。使用 canIUse 检测 camera/vibrator/sensor 能力并做降级。

**预期命中**：`HW-01` → `DEV`
**覆盖用例**：`HW-SMOKE-001` → `HW-FUNC-001`

### HW-02-fold DEV 路由 — 折叠屏相机选择与重建

开发折叠屏设备上根据折叠状态选择相机设备并重建相机会话的代码。

**预期命中**：`HW-02-fold` → `DEV`
**覆盖用例**：`HW-SMOKE-002` → `HW-FUNC-002`

### HW-02-stride DEV 路由 — stride 比对与无效像素去除

开发 ImageReceiver 预览帧 stride 处理代码，运行时获取 rowStride 并对比 width，去除无效填充像素防止花屏。

**预期命中**：`HW-02-stride` → `DEV`
**覆盖用例**：`HW-SMOKE-003` → `HW-FUNC-003`

### HW-02-rotation DEV 路由 — 相机预览与拍照旋转角度适配

开发相机预览旋转角度的完整适配代码，包含 Surface 锁定、重力传感器拍照旋转计算、录像方向设置。

**预期命中**：`HW-02-rotation` → `DEV`
**覆盖用例**：`HW-SMOKE-004` → `HW-FUNC-004`

### HW-02-fold FIX 路由 — 折叠态切换后黑屏修复（触发 keyword_triggered 加载 fold）

修复折叠屏设备折叠/展开后相机黑屏问题：检查 foldStatusChange 监听是否完整注册、onPageShow 是否恢复相机、折叠变化时是否完整重建会话。

**预期命中**：`HW-02-bugfix` → `FIX`，关键词匹配 `'折叠'+'foldStatus'` → 加载 `[HW-02-fold]`
**覆盖用例**：`HW-SMOKE-005` → `HW-REAL-001`（camera-bug-fix-cases.md#场景1）

### HW-02-fold FIX 路由 — 开合后相机设备未切换修复（触发 keyword_triggered 加载 fold）

修复折叠屏折叠/展开后相机仍使用旧设备的问题：折叠变化时完整执行 releaseCamera 而非仅更新 PreviewOutput，相机选择时 findIndex 未找到回退 cameras[0]。

**预期命中**：`HW-02-bugfix` → `FIX`，关键词匹配 `'折叠'+'releaseCamera'` → 加载 `[HW-02-fold]`
**覆盖用例**：`HW-SMOKE-006` → `HW-REAL-002`（camera-bug-fix-cases.md#场景2）

### HW-02-rotation FIX 路由 — 拍照后画面旋转修复（触发 keyword_triggered 加载 rotation）

修复拍照后照片方向与持握不一致问题：capture 前 sensor.once(GRAVITY) 获取角度，区分前后置映射（前置减法、后置加法），传入 PhotoCaptureSetting(rotation, mirror)。

**预期命中**：`HW-02-bugfix` → `FIX`，关键词匹配 `'rotation'+'拍照'` → 加载 `[HW-02-rotation]`
**覆盖用例**：`HW-SMOKE-007` → `HW-REAL-003`（camera-bug-fix-cases.md#场景3）

### HW-02-rotation FIX 路由 — 预览画面旋转拉伸修复（触发 keyword_triggered 加载 rotation）

修复预览画面旋转拉伸：XComponent onLoad 中 setXComponentSurfaceRotation({lock:true})，display.on('change') 回调重新计算 Surface 宽高比和预览旋转角度。

**预期命中**：`HW-02-bugfix` → `FIX`，关键词匹配 `'旋转'+'Surface宽高比'` → 加载 `[HW-02-rotation]`
**覆盖用例**：`HW-SMOKE-008` → `HW-REAL-004`（camera-bug-fix-cases.md#场景4）

### HW-02-rotation FIX 路由 — 录像方向错误修复（触发 keyword_triggered 加载 rotation）

修复录像方向错误：startVideo 前 sensor.once(GRAVITY) 获取角度，区分前后置映射后设置 AVMetadata.videoOrientation 为合理值（0/90/180/270）。

**预期命中**：`HW-02-bugfix` → `FIX`，关键词匹配 `'录像'+'方向'` → 加载 `[HW-02-rotation]`
**覆盖用例**：`HW-SMOKE-009` → `HW-REAL-005`（camera-bug-fix-cases.md#场景5）

### HW-02-stride FIX 路由 — 预览花屏/堆叠修复（触发 keyword_triggered 加载 stride）

修复预览花屏：运行时通过 component.rowStride 获取 stride 值，stride ≠ width 时去除无效像素（缓冲拷贝或 cropSync 两种方案）后再创建 PixelMap。

**预期命中**：`HW-02-bugfix` → `FIX`，关键词匹配 `'花屏'+'stride'` → 加载 `[HW-02-stride]`
**覆盖用例**：`HW-SMOKE-010` → `HW-REAL-006`（camera-bug-fix-cases.md#场景6）

### HW-02-fold FIX 路由 — 2in1/阔折叠后置相机不可用修复（触发 keyword_triggered 加载 fold）

修复 2in1 设备或阔折叠外屏后置相机不可用：相机选择 findIndex 查找目标位置，未找到（deviceIndex === -1）回退 cameras[0]，前后切换时目标不存在保持当前相机。

**预期命中**：`HW-02-bugfix` → `FIX`，关键词匹配 `'2in1'+'外屏'` → 加载 `[HW-02-fold]`
**覆盖用例**：`HW-SMOKE-011` → `HW-REAL-007`（camera-bug-fix-cases.md#场景7）

---

## 2. Scene-Functional Prompts（4 个 — 场景功能验证）

> Scene-Functional 测试目的：验证每个场景的正向功能（DEV）的开发方案可落地，输出符合 solution_contract + execution_contract 的工程代码。
> 所有 4 个用例均为 DEV 阶段。

### HW-FUNC-001 能力检测 canIUse 入口调用与降级

遵循 SKILL.md HW-01 能力检测机制实现。在 2in1 设备上使用 canIUse 查询 camera/vibrator/sensor 能力，对不支持的能力进行优雅降级（禁用按钮、显示提示），支持的正常启用，参照 RSC_HW_01 syscap_mechanism.md 规范完成代码。

**预期命中**：`HW-01` → `DEV`
**资源引用**：`RSC_HW_01`
**参考文件**：`scene-functional/scene-functional-hardware-access.json`

### HW-FUNC-002 折叠屏设备相机选择与折叠态重建

参照 SKILL.md HW-02-fold 场景及 RSC_HW_02 camera-foldable-adaptation.md 规范，开发折叠屏设备上根据折叠状态选择相机设备并完整重建相机会话的代码。确保折叠/展开切换时释放旧会话、重新选择相机、重建 Session。

**预期命中**：`HW-02-fold` → `DEV`
**资源引用**：`RSC_HW_02`
**参考文件**：`scene-functional/scene-functional-hardware-access.json`

### HW-FUNC-003 预览流 stride 比对与无效像素去除

参照 SKILL.md HW-02-stride 场景及 RSC_HW_04 camera-stride-handling.md 规范，开发预览帧数据 stride 处理代码。通过 ImageReceiver 获取预览帧后，对比 rowStride 与 width，stride 不等时去除无效填充像素再创建 PixelMap，确保不出现花屏。

**预期命中**：`HW-02-stride` → `DEV`
**资源引用**：`RSC_HW_04`
**参考文件**：`scene-functional/scene-functional-hardware-access.json`

### HW-FUNC-004 相机预览与拍照旋转角度适配

参照 SKILL.md HW-02-rotation 场景及 RSC_HW_05 camera-rotation-adaptation.md、RSC_HW_06 camera-rotation-terms.md 规范，开发相机预览旋转角度适配代码。包含 XComponent onLoad 中 setXComponentSurfaceRotation({lock:true})、setupRotationListener 监听 display.on('change') 并重新计算 Surface 宽高比、拍照前通过 sensor.once(GRAVITY) 获取重力数据计算旋转角度、区分前后置相机旋转映射、录像时设置 AVMetadata.videoOrientation。

**预期命中**：`HW-02-rotation` → `DEV`
**资源引用**：`RSC_HW_05`、`RSC_HW_06`
**参考文件**：`scene-functional/scene-functional-hardware-access.json`

---

## 3. Real-World Prompts（7 个 — 真实场景修复）

> Real-World 测试目的：模拟 camera-bug-fix-cases.md 中的 7 个线上真实 Bug，验证 SKILL 能否输出可落地的修复方案。
> 全部 7 个用例均为 FIX 阶段，必须输出 `solution_contract` + `execution_contract` + `problem_profile` + `regression_watchlist`。

### HW-REAL-001 折叠态切换后黑屏（场景1）

根据 camera-bug-fix-cases.md 场景1，排查并修复折叠屏设备在折叠/展开切换后相机预览页面出现黑屏的问题。原因是折叠前选择的相机设备在折叠后不再可用，但未监听 foldStatusChange 事件或监听后未完整重建相机会话。还需要覆盖热启动 onPageShow 恢复相机的场景。

**根因**：未监听 foldStatusChange 或监听后未完整重建相机 + 缺少 onPageShow 热启动恢复
**修复策略**：aboutToAppear 中注册 foldStatusChange 监听 + onPageShow 中判断 photoSession 存在则重新 initCamera + 折叠变化时完整执行 releaseCamera→initCamera
**资源引用**：`RSC_HW_03`、`RSC_HW_02`
**参考文件**：`real-world/real-world-hardware-access.json`

### HW-REAL-002 开合后相机设备未切换（场景2）

根据 camera-bug-fix-cases.md 场景2，排查并修复折叠屏折叠/展开后相机仍使用旧设备的问题。反例中监听了 foldStatusChange 但回调中仅更新了 PreviewOutput，未释放旧的 CameraInput 和 Session。阔折叠外屏仅前置相机时查找后置失败。

**根因**：折叠变化时仅更新 PreviewOutput 未重建 CameraInput + 相机选择未处理目标位置不存在的情况
**修复策略**：折叠变化时完整执行 releaseCamera→initCamera + 选择相机时 findIndex 查找，未找到回退 cameras[0]
**资源引用**：`RSC_HW_03`、`RSC_HW_02`
**参考文件**：`real-world/real-world-hardware-access.json`

### HW-REAL-003 拍照后画面旋转方向错误（场景3）

根据 camera-bug-fix-cases.md 场景3，排查并修复拍照后照片方向与设备持握方向不一致的问题。反例中直接调用 capture() 未传入 PhotoCaptureSetting，未通过重力传感器获取旋转角度，前后置旋转映射混淆。

**根因**：capture() 未传入 PhotoCaptureSetting.rotation + 未通过重力传感器获取设备方向 + 前后置旋转映射混淆
**修复策略**：capture 前 sensor.once(GRAVITY) 获取重力数据 → getCalDegree 计算角度 → 区分前后置映射 → capture(setting) 传入 rotation+mirror
**资源引用**：`RSC_HW_03`、`RSC_HW_05`、`RSC_HW_06`
**参考文件**：`real-world/real-world-hardware-access.json`

### HW-REAL-004 预览画面旋转拉伸变形（场景4）

根据 camera-bug-fix-cases.md 场景4，排查并修复相机预览画面旋转/拉伸/变形的问题。反例中 XComponent onLoad 未调用 setXComponentSurfaceRotation({lock:true}) 解锁 Surface 旋转，setupRotationListener 中仅打印日志未重新计算预览旋转和 Surface 宽高比。

**根因**：XComponent onLoad 未 setXComponentSurfaceRotation({lock:true}) + display.on('change') 回调未重新计算 Surface 宽高比和预览旋转角度
**修复策略**：onLoad 中 setXComponentSurfaceRotation({lock:true}) + commitConfig 后 getPreviewRotation + setPreviewRotation + 窗口变化时重新计算 Surface 尺寸（0°/180° 时比例取倒数，90°/270° 时保持一致）
**资源引用**：`RSC_HW_03`、`RSC_HW_05`、`RSC_HW_06`
**参考文件**：`real-world/real-world-hardware-access.json`

### HW-REAL-005 录像画面方向错误（场景5）

根据 camera-bug-fix-cases.md 场景5，排查并修复录像开始后画面方向与设备持握方向不一致的问题。反例中 prepareVideo 未获取重力传感器旋转角度，AVMetadata.videoOrientation 设为 0 导致录像方向固定为竖屏。

**根因**：录像开始时未通过 sensor.once(GRAVITY) 获取旋转角度 + AVMetadata.videoOrientation 未设置
**修复策略**：startVideo 前 sensor.once(GRAVITY) 获取重力数据 → getCalDegree 计算角度 → 区分前后置映射 → AVMetadata.videoOrientation 设置为合理值（0/90/180/270）
**资源引用**：`RSC_HW_03`、`RSC_HW_05`、`RSC_HW_06`
**参考文件**：`real-world/real-world-hardware-access.json`

### HW-REAL-006 预览画面花屏/堆叠/行偏移（场景6）

根据 camera-bug-fix-cases.md 场景6，排查并修复通过 ImageReceiver 获取预览帧后送显出现花屏堆叠的问题。反例中直接用 component.byteBuffer 创建 PixelMap 未检查 rowStride 是否与 width 一致，stride ≠ width 时无效填充字节被当作有效像素。

**根因**：stride ≠ width 时直接用 component.byteBuffer 按 width×height 创建 PixelMap，无效填充字节被当作有效像素
**修复策略**：运行时通过 component.rowStride 获取 stride → stride===width 直接创建 → stride≠width 时逐行拷贝有效像素到新 buffer 或 cropSync 裁剪
**资源引用**：`RSC_HW_03`、`RSC_HW_04`
**参考文件**：`real-world/real-world-hardware-access.json`

### HW-REAL-007 2in1/阔折叠设备后置相机不可用（场景7）

根据 camera-bug-fix-cases.md 场景7，排查并修复 2in1 设备或阔折叠外屏上选择后置相机失败、相机初始化异常或预览黑屏的问题。2in1 大部分仅有前置内置相机，阔折叠外屏仅前置，相机选择逻辑未处理目标不存在的情况。

**根因**：2in1 仅前置内置相机 + 阔折叠外屏仅前置相机 + 相机选择逻辑未处理目标位置不存在的情况
**修复策略**：选择相机时 findIndex 查找目标位置 → deviceIndex===-1 回退 cameras[0] → 前后切换时目标不存在则保持当前相机
**资源引用**：`RSC_HW_03`、`RSC_HW_02`
**参考文件**：`real-world/real-world-hardware-access.json`

---

## 典型验证点

### 能力检测（HW-01 — 1 smoke + 1 scene-functional）

- 是否命中 `HW-01`
- 是否使用 `canIUse` 查询 camera/vibrator/sensor 能力
- 不支持的能力是否禁用 UI 并显示提示
- 是否参照 `RSC_HW_01` syscap_mechanism.md 规范
- `smoke/smoke-hardware-access.json` 对应 `HW-SMOKE-001`
- `scene-functional/scene-functional-hardware-access.json` 对应 `HW-FUNC-001`

### 折叠屏相机适配（HW-02-fold — 1 smoke DEV + 4 smoke FIX + 1 scene-functional + 3 real-world）

- DEV 用例（`HW-SMOKE-002`）直接命中 `HW-02-fold`
- FIX 用例（`HW-SMOKE-005/006/011`）命中 `HW-02-bugfix`，关键词匹配 `折叠/foldStatus` → 加载 `[HW-02-fold]`
- 是否监听 foldStatusChange 事件并完整重建会话（releaseCamera→initCamera）
- 相机选择是否 findIndex 查找目标位置，未找到回退 cameras[0]
- 半折叠（悬停态）切换是否可跳过重建
- 是否覆盖 onPageShow 热启动恢复相机逻辑
- 是否参照 `RSC_HW_02` camera-foldable-adaptation.md 规范
- real-world 用例是否来自 `camera-bug-fix-cases.md` 场景1/2/7
- `smoke/smoke-hardware-access.json` 对应 `HW-SMOKE-002`、`HW-SMOKE-005`、`HW-SMOKE-006`、`HW-SMOKE-011`
- `scene-functional/scene-functional-hardware-access.json` 对应 `HW-FUNC-002`
- `real-world/real-world-hardware-access.json` 对应 `HW-REAL-001`、`HW-REAL-002`、`HW-REAL-007`

### stride 内存对齐（HW-02-stride — 1 smoke DEV + 1 smoke FIX + 1 scene-functional + 1 real-world）

- DEV 用例（`HW-SMOKE-003`）直接命中 `HW-02-stride`
- FIX 用例（`HW-SMOKE-010`）命中 `HW-02-bugfix`，关键词匹配 `花屏/stride` → 加载 `[HW-02-stride]`
- 是否通过 component.rowStride 运行时获取 stride 值（不可硬编码）
- stride === width 是否直接创建 PixelMap
- stride ≠ width 是否去除无效像素（缓冲拷贝或 cropSync）
- 是否参照 `RSC_HW_04` camera-stride-handling.md 规范
- real-world 用例是否来自 `camera-bug-fix-cases.md` 场景6
- `smoke/smoke-hardware-access.json` 对应 `HW-SMOKE-003`、`HW-SMOKE-010`
- `scene-functional/scene-functional-hardware-access.json` 对应 `HW-FUNC-003`
- `real-world/real-world-hardware-access.json` 对应 `HW-REAL-006`

### 旋转角度适配（HW-02-rotation — 1 smoke DEV + 3 smoke FIX + 1 scene-functional + 3 real-world）

- DEV 用例（`HW-SMOKE-004`）直接命中 `HW-02-rotation`
- FIX 用例（`HW-SMOKE-007/008/009`）命中 `HW-02-bugfix`，关键词匹配 `旋转/方向` → 加载 `[HW-02-rotation]`
- XComponent onLoad 是否调用 setXComponentSurfaceRotation({lock:true})
- display.on('change') 回调是否重新计算 Surface 宽高比和预览旋转角度
- 拍照前是否 sensor.once(GRAVITY) 获取重力数据，区分前后置映射（前置减法、后置加法）
- 拍照是否 photoOutput.capture(setting) 传入 PhotoCaptureSetting(rotation, mirror)
- 录像是否设置 AVMetadata.videoOrientation 为合理旋转值
- Surface 宽高比 0°/180° 取倒数、90°/270° 保持一致
- 是否参照 `RSC_HW_05` camera-rotation-adaptation.md 和 `RSC_HW_06` camera-rotation-terms.md
- real-world 用例是否来自 `camera-bug-fix-cases.md` 场景3/4/5
- `smoke/smoke-hardware-access.json` 对应 `HW-SMOKE-004`、`HW-SMOKE-007`、`HW-SMOKE-008`、`HW-SMOKE-009`
- `scene-functional/scene-functional-hardware-access.json` 对应 `HW-FUNC-004`
- `real-world/real-world-hardware-access.json` 对应 `HW-REAL-003`、`HW-REAL-004`、`HW-REAL-005`

### 三层验证要求

- `smoke`：验证 intent_signals 路由完整性——DEV 阶段直接命中 HW-01 / HW-02-fold / HW-02-stride / HW-02-rotation；FIX 阶段全部命中 `HW-02-bugfix`，根据根因关键词（折叠→fold、花屏→stride、旋转→rotation）触发单场景协同加载，共 11 个用例
- `scene-functional`：验证每个场景的正向功能（DEV）的工程方案可落地，输出 `solution_contract` + `execution_contract`，共 4 个用例
- `real-world`：验证 camera-bug-fix-cases.md 中 7 个线上真实 Bug 修复方案的可编译性和可验证性——必须输出 `solution_contract` + `execution_contract` + `problem_profile` + `regression_watchlist`。FIX 阶段路由命中 `HW-02-bugfix` 并按根因关键词条件加载对应子场景资源
- 所有 JSON 测试用例文件位于 `test-cases/` 目录下，通过自动化校验确保格式正确
- 资源映射关系：`RSC_HW_01`→syscap_mechanism.md、`RSC_HW_02`→camera-foldable-adaptation.md、`RSC_HW_03`→camera-bug-fix-cases.md、`RSC_HW_04`→camera-stride-handling.md、`RSC_HW_05`→camera-rotation-adaptation.md、`RSC_HW_06`→camera-rotation-terms.md
- **keyword_triggered 验证**：FIX 阶段 smoke 用例须验证 `secondary_scenes` 仅包含根因关键词匹配到的子场景（非全部三个），`resources_loaded` 仅包含对应场景资源，`co_load_verified` 为 true，`co_load_match` 字段记录匹配关键词与加载原因
