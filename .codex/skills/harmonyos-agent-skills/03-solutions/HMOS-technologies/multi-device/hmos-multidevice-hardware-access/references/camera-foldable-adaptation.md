# 适配不同折叠状态的摄像头变更技术方案

来源：[华为开发者文档 - 适配不同折叠状态的摄像头变更](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/camera-foldable-display)

## 概述

折叠设备形态各异，在相机应用的开发过程中需要统一的摄像头切换方案，以确保用户在拍照、录像过程中获得更好的体验。

一台可折叠设备在不同折叠状态下，可使用不同的相机。系统会标识所有摄像头，每个摄像头与一个折叠状态相对应，表示该摄像头可在对应的折叠状态下使用。应用可调用 `CameraManager.on('foldStatusChange')` 或 `display.on('foldStatusChange')` 监听设备的折叠状态变化，并调用 `CameraManager.getSupportedCameras` 获取当前状态下可用相机，完成相应适配，确保应用在折叠状态变更时的用户体验。

不同折叠设备在不同折叠状态下支持的摄像头数量不同。例如，折叠设备拥有三颗摄像头：后置摄像头A、前置摄像头B和前置摄像头C。在展开状态下，通过 `CameraManager.getSupportedCameras` 接口可获取到后置摄像头A和前置摄像头B；在折叠状态下，可获取到后置摄像头A和前置摄像头C。不同的折叠状态获取到的镜头不同，因此，在折叠状态变化时，需要重新获取镜头信息。

本方案覆盖以下核心目标：

- **设备选择**：在多设备（手机、折叠屏、平板、2in1）环境下，正确选择相机设备。
- **折叠屏适配**：监听折叠状态变化，在状态切换时重新选择相机设备并重建预览流。
- **半折叠态处理**：正确处理折叠/展开过程中的过渡状态，避免不必要的重建。
- **完整重建链路**：确保相机从释放到重建的每一步都稳妥执行。

## 概念速查

| 概念 | 说明 |
|------|------|
| `FoldStatus` | 设备折叠状态枚举：`FOLD_STATUS_UNKNOWN`（未知）/ `FOLD_STATUS_EXPANDED`（展开）/ `FOLD_STATUS_FOLDED`（折叠）/ `FOLD_STATUS_HALF_FOLDED`（半折叠） |
| `FoldStatusInfo` | `cameraManager.on('foldStatusChange')` 回调参数，含 `foldStatus` 和 `supportedCameras` |
| `CameraManager.on('foldStatusChange')` | **推荐方案**，回调含 `FoldStatusInfo`，可直接获取当前可用相机列表 |
| `display.on('foldStatusChange')` | 备选方案，回调仅含 `FoldStatus`，需自行调用 `getSupportedCameras()` |
| XComponent 双实例切换 | 通过 `reloadXComponentFlag` 布尔值控制两个 XComponent 实例交替渲染，避免旧相机画面残留 |
| 半折叠态过渡处理 | `HALF_FOLDED` 是展开/折叠过程的过渡态，与 `EXPANDED`/`FOLDED` 之间需跳过相机重建 |
| 相机回退策略 | 目标位置摄像头不存在时，回退到 `cameras[0]`（第一个可用相机），避免空指针 |
| `CameraPosition` | 摄像头位置：`CAMERA_POSITION_FRONT`（前置）/ `CAMERA_POSITION_BACK`（后置） |
| `ConnectionType` | 摄像头连接类型，默认 `CAMERA_CONNECTION_BUILT_IN`（内置摄像头） |

## 使用场景总览

| 场景 | 触发条件 | 推荐用法 | 为什么要判断 | 不判断的风险 |
| --- | --- | --- | --- | --- |
| 初始化相机 | 页面首次渲染 | `getSupportedCameras()` + `findIndex` + 回退策略 | 确保选择到正确位置的相机 | 使用默认相机可能不是用户期望的 |
| 折叠状态变化 | 用户折展设备 | `cameraManager.on('foldStatusChange')` + 完整重建链路 | 折叠后旧相机可能不可用 | 预览黑屏、会话异常 |
| 阔折叠外屏 | 切换到 PuraX 外屏 | `findIndex` 回退到 `cameras[0]` | 外屏仅有前置相机 | 后置查找失败导致崩溃 |
| 2in1设备 | 平板/笔记本形态 | 检查后置是否存在 | 大部分仅有前置 | 创建不存在的相机输入报错 |
| 半折叠与展开切换 | 悬停态 ↔ 展开态 | 判断两个状态间跳过重建 | 设备变化不显著时无需重建 | 不必要的重建导致闪烁 |
| 热启动恢复 | 从后台切回前台 | `onPageShow` + `photoSession` 判断 | 相机会话可能已被系统回收 | 黑屏 |
| 预览分辨率适配 | 折叠后屏幕比例变化 | 按新比例选择 PreviewProfile | 不同折叠态屏幕比例不同 | 画面拉伸 |

---

## 核心API

| API | 说明 | 来源模块 |
| --- | --- | --- |
| `camera.getCameraManager(context)` | 获取相机管理器 | `@kit.CameraKit` |
| `cameraManager.getSupportedCameras()` | 获取当前折叠状态下可用相机设备列表 | `@kit.CameraKit` |
| `cameraManager.createCameraInput(device)` | 创建相机输入流 | `@kit.CameraKit` |
| `cameraManager.on('foldStatusChange', callback)` | 监听折叠状态变化（**推荐**，回调包含 `FoldStatusInfo`，内含可用相机列表） | `@kit.CameraKit` |
| `cameraManager.getSupportedSceneModes(device)` | 获取相机支持的模式类型 | `@kit.CameraKit` |
| `cameraManager.getSupportedOutputCapability(device, sceneMode)` | 获取相机设备支持的输出流能力 | `@kit.CameraKit` |
| `cameraManager.createPreviewOutput(profile, surfaceId)` | 创建预览输出流 | `@kit.CameraKit` |
| `cameraManager.createSession(sceneMode)` | 创建相机会话 | `@kit.CameraKit` |
| `display.on('foldStatusChange', callback)` | 监听折叠状态变化（方式二，回调仅包含 `FoldStatus`） | `@kit.ArkUI` |
| `display.getFoldStatus()` | 获取当前折叠状态 | `@kit.ArkUI` |
| `display.on('foldDisplayModeChange', callback)` | 监听显示模式变化 | `@kit.ArkUI` |

### 关键数据结构

- **`FoldStatusInfo`**：包含 `foldStatus`（当前折叠状态）和 `supportedCameras`（当前可用相机列表）。
- **`CameraDevice`**：包含 `cameraId`、`cameraPosition`（前置/后置）、`cameraType`、`connectionType`。
- **`CameraPosition`**：
  - `CAMERA_POSITION_FRONT` — 前置摄像头
  - `CAMERA_POSITION_BACK` — 后置摄像头
- **`FoldStatus`**：
  - `FOLD_STATUS_UNKNOWN` — 未知
  - `FOLD_STATUS_EXPANDED` — 展开
  - `FOLD_STATUS_FOLDED` — 折叠
  - `FOLD_STATUS_HALF_FOLDED` — 半折叠（悬停态）

---

## 最佳实践

### 创建XComponent

使用两个XComponent分别展示折叠态和展开态的预览画面，防止切换折叠屏状态亮屏的时候上一个相机还未关闭，残留上一个相机的画面。

```typescript
@Entry
@Component
struct Index {
  @State reloadXComponentFlag: boolean = false;
  @StorageLink('foldStatus') @Watch('reloadXComponent') foldStatus: number = 0;
  private mXComponentController: XComponentController = new XComponentController();
  private mXComponentOptions: XComponentOptions = {
    type: XComponentType.SURFACE,
    controller: this.mXComponentController
  }

  reloadXComponent() {
    this.reloadXComponentFlag = !this.reloadXComponentFlag;
  }

  async loadXComponent() {
    // 初始化XComponent。
  }

  build() {
    Stack() {
      if (this.reloadXComponentFlag) {
        XComponent(this.mXComponentOptions)
          .onLoad(async () => {
            await this.loadXComponent();
          })
          .width(this.getUIContext().px2vp(1080))
          .height(this.getUIContext().px2vp(1920))
      } else {
        XComponent(this.mXComponentOptions)
          .onLoad(async () => {
            await this.loadXComponent();
          })
          .width(this.getUIContext().px2vp(1080))
          .height(this.getUIContext().px2vp(1920))
      }
    }
    .size({ width: '100%', height: '100%' })
    .backgroundColor(Color.Black)
  }
}
```

**机制说明**：通过 `reloadXComponentFlag` 布尔值切换两个XComponent实例，当折叠状态变化时，`@StorageLink('foldStatus')` 触发 `@Watch('reloadXComponent')`，翻转 `reloadXComponentFlag`，导致旧XComponent销毁、新XComponent创建，从而完成预览重建。

---

### 监听折叠屏状态变化

- 方案一：使用相机框架监听（推荐）

使用 `cameraManager.on('foldStatusChange')` 监听设备折叠态变化。此方案的 `FoldStatusInfo` 回调参数中包含 `supportedCameras`（当前可用相机列表），方便开发者直接获取当前状态下可用的相机设备。

```typescript
import { camera } from '@kit.CameraKit';
import { BusinessError } from '@kit.BasicServicesKit';

function registerFoldStatusChanged(err: BusinessError, foldStatusInfo: camera.FoldStatusInfo) {
  // foldStatus 变量用来控制显示XComponent组件。
  AppStorage.setOrCreate<number>('foldStatus', foldStatusInfo.foldStatus);
}

function onFoldStatusChange(cameraManager: camera.CameraManager) {
  cameraManager.on('foldStatusChange', registerFoldStatusChanged);
}

function offFoldStatusChange(cameraManager: camera.CameraManager) {
  cameraManager.off('foldStatusChange', registerFoldStatusChanged);
}
```

- 方案二：使用图形图像监听

使用 `display.on('foldStatusChange')` 监听设备折叠态变化。此方案回调仅包含 `FoldStatus`，需要在回调中自行调用 `getSupportedCameras()` 获取可用相机列表。

```typescript
import { display } from '@kit.ArkUI';

function getFoldStatus(): display.FoldStatus {
  let curFoldStatus: display.FoldStatus = display.FoldStatus.FOLD_STATUS_UNKNOWN;
  try {
    curFoldStatus = display.getFoldStatus();
  } catch (error) {
    console.error('getFoldStatus call failed');
  }
  return curFoldStatus;
}

let preFoldStatus: display.FoldStatus = getFoldStatus();
display.on('foldStatusChange', (foldStatus: display.FoldStatus) => {
  // 从半折叠态（FOLD_STATUS_HALF_FOLDED）到展开态（FOLD_STATUS_EXPANDED），相机框架返回所支持的相机是一致的，
  // 所以从半折叠态到展开态不需要重新配流，从展开态到半折叠态也是一样的。
  if ((preFoldStatus === display.FoldStatus.FOLD_STATUS_HALF_FOLDED &&
    foldStatus === display.FoldStatus.FOLD_STATUS_EXPANDED) ||
    (preFoldStatus === display.FoldStatus.FOLD_STATUS_EXPANDED &&
      foldStatus === display.FoldStatus.FOLD_STATUS_HALF_FOLDED)) {
    preFoldStatus = foldStatus;
    return;
  }
  preFoldStatus = foldStatus;
  // foldStatus 变量用来控制显示XComponent组件。
  AppStorage.setOrCreate<number>('foldStatus', foldStatus);
})
```

> **推荐**：方案一（`cameraManager.on`）能直接获取当前可用的相机列表，减少额外查询开销，是官方推荐方案。

---

### 判断是否存在对应位置摄像头

通过 `CameraManager.getSupportedCameras` 接口获取当前设备折叠状态下支持的所有镜头，遍历结果，通过 `CameraPosition` 和 `ConnectionType` 判断指定位置的镜头是否存在。

```typescript
import { camera } from '@kit.CameraKit';

// connectionType 默认为 camera.ConnectionType.CAMERA_CONNECTION_BUILT_IN，表示设备的内置镜头。
function hasCameraAt(cameraManager: camera.CameraManager, cameraPosition: camera.CameraPosition,
  connectionType: camera.ConnectionType = camera.ConnectionType.CAMERA_CONNECTION_BUILT_IN): boolean {
  let cameraArray: Array<camera.CameraDevice> = cameraManager.getSupportedCameras();
  if (cameraArray.length <= 0) {
    console.error('cameraManager.getSupportedCameras error');
    return false;
  }
  for (let index = 0; index < cameraArray.length; index++) {
    if (cameraArray[index].cameraPosition === cameraPosition &&
      cameraArray[index].connectionType === connectionType) {
      return true;
    }
  }
  return false;
}
```

#### 设备选择 — 带回退策略的 selectCamera

在实际开发中，需要在选择相机时同时匹配位置和连接类型，并提供回退策略。当目标位置摄像头不存在时，回退到第一个可用相机。

```typescript
import { camera } from '@kit.CameraKit';
import { display } from '@kit.ArkUI';

async function selectCamera(
  cameraManager: camera.CameraManager,
  cameraPosition: camera.CameraPosition,
  connectionType: camera.ConnectionType = camera.ConnectionType.CAMERA_CONNECTION_BUILT_IN
): Promise<camera.CameraDevice> {
  let cameraArray: Array<camera.CameraDevice> = cameraManager.getSupportedCameras();
  if (!cameraArray || cameraArray.length === 0) {
    throw new Error('No camera device available');
  }

  let deviceIndex = cameraArray.findIndex((cameraDevice: camera.CameraDevice) => {
    return cameraDevice.cameraPosition === cameraPosition &&
      cameraDevice.connectionType === connectionType;
  });

  // 没有找到对应位置的摄像头，回退到第一个可用相机。
  if (deviceIndex === -1) {
    console.warn(`Target camera (position=${cameraPosition}) not found, fallback to cameras[0]`);
    deviceIndex = 0;
  }

  return cameraArray[deviceIndex];
}
```

---

### 半折叠态（悬停态）处理策略

> **核心认知**：半折叠态 (`FOLD_STATUS_HALF_FOLDED`) 是折叠/展开过程中的过渡状态。即使用户不想进入悬停态，在折叠/展开过程中也会触发 `FOLD_STATUS_HALF_FOLDED`。

#### 默认策略：跳过重建

在 `foldStatusChange` 回调中，对于以下状态转换应**跳过相机重建**：

- 半折叠 ↔ 展开 (`HALF_FOLDED` ↔ `EXPANDED`)
- 半折叠 ↔ 折叠 (`HALF_FOLDED` ↔ `FOLDED`)

**原因**：

1. 半折叠态是过渡态，设备变化不显著，相机设备通常仍然可用。
2. 跳过重建可避免不必要的预览闪烁和性能开销。
3. 从半折叠态到展开态，相机框架返回的相机列表是一致的。

```typescript
display.on('foldStatusChange', (foldStatus: display.FoldStatus) => {
  if ((this.preFoldStatus === display.FoldStatus.FOLD_STATUS_HALF_FOLDED &&
    foldStatus === display.FoldStatus.FOLD_STATUS_EXPANDED) ||
    (this.preFoldStatus === display.FoldStatus.FOLD_STATUS_EXPANDED &&
      foldStatus === display.FoldStatus.FOLD_STATUS_HALF_FOLDED)) {
    this.preFoldStatus = foldStatus;
    return;
  }
  this.preFoldStatus = foldStatus;
  AppStorage.setOrCreate<number>('foldStatus', foldStatus);
});
```

#### 仅在以下情况处理半折叠态

应用明确需要悬停态相机页面适配（如 HW-02-hover 场景）时，才在半折叠态回调中执行布局调整和旋转策略更新，但仍跳过相机设备重建。

---

### 摄像头切换逻辑

在监听到折叠状态发生变化时，通过设置被 `@StorageLink` 修饰的 `foldStatus` 变量改变，触发 `reloadXComponent` 方法重新加载XComponent组件，从而实现相机的切换逻辑。

整体切换流程：

```
折叠状态变化 → foldStatusChange回调 → 半折叠态判断
    ├── 过渡态 (半折叠↔展开/折叠) → skip（跳过重建）
    └── 非过渡态 → AppStorage.setOrCreate('foldStatus')
                     → @StorageLink('foldStatus') 感知变化
                     → @Watch('reloadXComponent') 触发
                     → reloadXComponentFlag 翻转
                     → XComponent 双实例切换
                     → loadXComponent() → initCamera()
                                           ├── releaseCamera()   释放旧资源
                                           ├── getSupportedCameras() 获取可用相机
                                           ├── findIndex + 回退策略   选择相机
                                           ├── createCameraInput()    创建输入流
                                           ├── open()                 打开相机
                                           ├── createPreviewOutput()  创建预览输出
                                           ├── createSession()        创建会话
                                           ├── beginConfig()          开始配置
                                           ├── addInput() + addOutput()
                                           ├── commitConfig()         提交配置
                                           └── start()                启动会话
```



---

## 约束与最佳实践

1. **相机选择回退策略**：目标位置摄像头不存在时，必须回退到第一个可用摄像头（`cameras[0]`），避免空指针异常。
2. **完整重建流程**：折叠状态变化时的重建必须包含完整链路：释放旧会话 → 重新选择相机 → 创建 CameraInput → 创建 PreviewOutput → 创建 Session → commitConfig → start。
3. **XComponent 双实例切换**：通过 `reloadXComponentFlag` 控制双实例切换实现重建，避免旧相机画面残留。
4. **半折叠态过滤**：半折叠态是过渡状态，默认应忽略（跳过重建）；仅在明确需要悬停态适配的场景下处理布局调整，仍跳过相机设备重建。
5. **监听注册成对出现**：所有监听注册（`on`）必须与对应的注销（`off`）成对出现，页面离场时统一清理，防止内存泄漏。
6. **热启动恢复**：`onPageShow` 中需判断相机会话状态，如果会话已被系统回收，需要重新初始化。
7. **权限申请**：开发相机应用需要先申请 `ohos.permission.CAMERA` 权限。
8. **预览分辨率**：不同折叠状态下屏幕比例可能不同，应按新比例选择 `PreviewProfile`，避免画面拉伸。

---

## 决策规则

- **何时跳过重建**：半折叠 ↔ 展开 或 半折叠 ↔ 折叠 的转换中，相机框架返回的相机列表一致，跳过相机重建，避免预览闪烁和性能开销。
- **何时使用回退**：`findIndex === -1` 时（目标位置摄像头不存在），回退到 `cameras[0]`（第一个可用相机）。
- **何时使用 XComponent 双实例**：折叠状态变化导致需要切换相机时，通过 `reloadXComponentFlag` 翻转实现 XComponent 销毁与重建。
- **监听注册配对**：所有 `on` 注册必须有对应 `off` 注销，页面离场时统一清理，防止内存泄漏。
- **热启动恢复**：`onPageShow` 中判断相机会话状态，若会话已被系统回收则重新初始化。
- **预览分辨率跟随**：折叠状态变化后，按新屏幕比例重新选择 `PreviewProfile`，避免画面拉伸。
- **监听方案选择**：优先使用 `cameraManager.on('foldStatusChange')`，可直接获取 `supportedCameras`，减少额外查询。

---

## 验证清单

- 折叠 → 展开：预览正常无黑屏
- 展开 → 折叠：预览正常无黑屏
- 半折叠 ↔ 展开：布局和旋转正确（可跳过重建）
- 半折叠 ↔ 折叠：布局和旋转正确（可跳过重建）
- PuraX 外屏：后置相机不可用时自动回退前置
- 2in1 设备后置缺失：自动回退前置，不崩溃
- 热启动恢复：从后台切回前台预览正常
- 页面退出后监听已回收

---

## 完整示例代码

- [CameraFoldable.ets](assets/CameraFoldable.ets)

---

## 官方来源

- [适配不同折叠状态的摄像头变更（官方）](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/camera-foldable-display)
- [@ohos.multimedia.camera (相机管理)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-camera)
