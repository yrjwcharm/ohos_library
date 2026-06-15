# SysCap 系统能力机制

> 来源：HarmonyOS 官方文档「系统能力 SystemCapability 使用指南」，更新时间 2026-04-20
> 资源 ID：RSC_HW_01 | 关联场景：HW-01

---

## 1. 核心概念

| 概念 | 定义 |
|---|---|
| **SysCap** | 标识一组特定开放能力的 API 集合，每个 SysCap 代表 OS 中一个独立功能特性 |
| **层级** | SDK > Kit > SysCap > 具体 API（每个 SysCap 仅属于一个 Kit） |
| **canIUse** | 判断 SysCap 在目标设备类型上是否可调用，返回 `true`/`false`，**仅适用于多设备场景** |
| **能力查询接口** | `isXXXAvailable()` / `isXXXSupported()` / `canMakeXXX()`，判断同设备类型不同型号的能力差异，与 canIUse 是不同机制 |
| **多设备并集** | `deviceTypes` 配置多个设备类型时，DevEco Studio 识别的 SysCap 集合为这些设备类型的并集 |

### 1.1 SysCap 两项职责

1. **首要职责**：隔离不同设备类型之间的开放能力差异
2. **次要职责**：进行特性归类（每个 SysCap 标识的 API 集合逻辑上属于同一功能特性）

### 1.2 关键约束

- 同一设备类型下不同产品型号软硬件规格可能不一致，需 `canIUse` + 能力查询接口**双重判断**
- 例：部分手机不支持 POI → 先 `canIUse("SystemCapability.Location.Location.Core")` → 再 `geoLocationManager.isPoiServiceSupported()` → 全部通过后才可调用

---

## 2. 适配流程（4 步）

适用前提：同设备类型不同型号硬件差异 / 同设备型号硬件动态变更（如 USB 热插拔）

### 2.1 canIUse — 判断 SysCap 是否可调用

**仅多设备场景**。单设备场景跳过。

```typescript
if (canIUse("SystemCapability.Location.Location.Core")) {
  // SysCap 可用
} else {
  // SysCap 不可用 → 降级
}
```

### 2.2 能力查询接口 — 判断具体 API 是否可用

判断同设备类型不同型号间的能力差异。无能力查询接口时，改用 2.3 主动监听或 2.4 错误码兜底。

**完整调用链**：canIUse → 能力查询 → 业务调用

```typescript
import { geoLocationManager } from '@kit.LocationKit';
// 1. 多设备：canIUse 判断 SysCap（单设备跳过）
if (!canIUse("SystemCapability.Location.Location.Core")) { return; }
try {
  // 2. 能力查询接口判断具体服务
  if (geoLocationManager.isPoiServiceSupported()) {
    // 3. 全部通过后调用业务接口
    geoLocationManager.getPoiInfo().then(poiInfo => { /* ... */ });
  }
} catch (error) { /* ... */ }
```

### 2.3 主动监听 — 处理硬件动态变更

硬件热插拔导致能力变化时，通过系统 `on` 接口监听。

```typescript
import { camera } from '@kit.CameraKit';
// 监听相机设备动态变化
cameraManager.on('cameraStatus', (err, cameraStatusInfo) => {
  // cameraStatusInfo.camera.cameraId, cameraStatusInfo.status
});
```

### 2.4 错误码异常处理

| 接口类型 | 处理方式 | 必须 |
|---|---|---|
| 同步接口 | `try...catch`（error.code 801 = 能力不支持） | **必须**，否则崩溃 |
| 异步接口 | `.catch()` | 建议 |
| 全局兜底 | `errorManager.on('error')` | 可选 |

---

## 3. 场景决策

### 3.1 单设备（deviceTypes 仅 1 个）

跳过 canIUse → 能力查询接口 → 错误码异常处理

### 3.2 多设备（deviceTypes 多个）

canIUse（判断并集内交集外的 SysCap）→ 能力查询接口 → 错误码异常处理

**并集/交集规则**：当 SysCap 处于 deviceTypes 选择范围与 API 支持范围的**并集但不在交集内**时（如 deviceTypes 选 Phone/Tablet，而 API 仅支持 Phone/2in1），**必须**通过 canIUse 校验。

---

## 4. module.json5 配置

```json
{
  "module": {
    "deviceTypes": ["phone", "tablet"],
    "requestPermissions": [{ "name": "ohos.permission.XXX" }]
  }
}
```

规则：`deviceTypes` 多个值时 SysCap 集合为并集，需 canIUse 区分。

---

## 5. 传感器权限映射（摘要）

> 完整参考：[sensor-overview.md](./sensor-overview.md)（RSC_HW_07）

SysCap 是设备级别的，不细分到具体传感器类型：
- 振动器 → `SystemCapability.Sensors.MiscDevice`（覆盖所有振动器 API）
- 传感器 → `SystemCapability.Sensors.Sensor`（覆盖加速度/陀螺仪/重力等所有传感器 API）

| 传感器类别 | SysCap | 权限名 | 敏感级别 | 运行时需请求 |
|---|---|---|---|---|
| 振动器 | `Sensors.MiscDevice` | `ohos.permission.VIBRATE` | system_grant | 否 |
| 加速度/未校准加速度/线性加速度 | `Sensors.Sensor` | `ohos.permission.ACCELEROMETER` | system_grant | 否 |
| 陀螺仪/未校准陀螺仪 | `Sensors.Sensor` | `ohos.permission.GYROSCOPE` | system_grant | 否 |
| 计步器 | `Sensors.Sensor` | `ohos.permission.ACTIVITY_MOTION` | user_grant | **是** |
| 心率 | `Sensors.Sensor` | `ohos.permission.READ_HEALTH_DATA` | user_grant | **是** |
| 重力/方向/旋转矢量/环境光/接近光/气压/磁场/霍尔/湿度/温度等 | `Sensors.Sensor` | 无需权限 | — | 否 |
