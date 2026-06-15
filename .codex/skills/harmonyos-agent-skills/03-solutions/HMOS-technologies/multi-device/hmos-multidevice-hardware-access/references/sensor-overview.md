# 传感器开发参考

> 来源：HarmonyOS 官方文档「传感器开发概述」（2026-03-19）+「传感器开发步骤」
> 资源 ID：RSC_HW_07 | 关联场景：HW-01 | 交叉引用：[syscap_mechanism.md](./syscap_mechanism.md)（RSC_HW_01）

---

## 1. 权限映射（主要参考）

传感器 API 调用前须：① `canIUse()` 检测 SysCap → ② `module.json5` 声明权限 → ③ 运行时请求授权（仅 user_grant）

### 1.1 需权限传感器

| 传感器 | SensorId | 权限名 | 级别 | 运行时请求 |
|---|---|---|---|---|
| 加速度 | `ACCELEROMETER` | `ohos.permission.ACCELEROMETER` | system_grant | 否 |
| 未校准加速度 | `ACCELEROMETER_UNCALIBRATED` | `ohos.permission.ACCELEROMETER` | system_grant | 否 |
| 线性加速度 | `LINEAR_ACCELEROMETER` | `ohos.permission.ACCELEROMETER` | system_grant | 否 |
| 陀螺仪 | `GYROSCOPE` | `ohos.permission.GYROSCOPE` | system_grant | 否 |
| 未校准陀螺仪 | `GYROSCOPE_UNCALIBRATED` | `ohos.permission.GYROSCOPE` | system_grant | 否 |
| 计步器 | `PEDOMETER` | `ohos.permission.ACTIVITY_MOTION` | **user_grant** | **是** |
| 心率 | `HEART_RATE` | `ohos.permission.READ_HEALTH_DATA` | **user_grant** | **是** |

### 1.2 无需权限传感器

`GRAVITY` / `ORIENTATION` / `ROTATION_VECTOR` / `AMBIENT_LIGHT` / `PROXIMITY` / `BAROMETER` / `MAGNETIC_FIELD` / `MAGNETIC_FIELD_UNCALIBRATED` / `HALL` / `HUMIDITY` / `AMBIENT_TEMPERATURE` / `PEDOMETER_DETECTION` / `SIGNIFICANT_MOTION` / `WEAR_DETECTION`

### 1.3 敏感级别

| 级别 | 行为 |
|---|---|
| `system_grant` | 安装时自动授权，仅需 `requestPermissions` 声明 |
| `user_grant` | 声明后仍需运行时调用 `requestPermissionsFromUser()` |

---

## 2. SensorId 枚举速查（次要参考）

| SensorId | 值 | 单位 | 用途 |
|---|---|---|---|
| `ACCELEROMETER` | 1 | m/s² | 检测运动状态 |
| `ACCELEROMETER_UNCALIBRATED` | 281 | m/s² | 加速度偏差估值 |
| `LINEAR_ACCELEROMETER` | 258 | m/s² | 单轴线性加速度 |
| `GRAVITY` | 257 | m/s² | 测量重力 |
| `GYROSCOPE` | 2 | rad/s | 旋转角速度 |
| `GYROSCOPE_UNCALIBRATED` | 263 | rad/s | 角速度偏差估值 |
| `ORIENTATION` | 256 | rad | 屏幕旋转角度 |
| `ROTATION_VECTOR` | 259 | — | 东北天坐标系方向 |
| `MAGNETIC_FIELD` | 6 | μT | 指南针 |
| `MAGNETIC_FIELD_UNCALIBRATED` | 261 | μT | 地磁偏差估值 |
| `AMBIENT_LIGHT` | 5 | lux | 屏幕亮度调节 |
| `PROXIMITY` | 12 | — | 通话距离检测 |
| `BAROMETER` | 8 | hPa | 气压测量 |
| `HALL` | 10 | — | 皮套模式 |
| `HUMIDITY` | 13 | % | 湿度监测 |
| `AMBIENT_TEMPERATURE` | 260 | °C | 环境温度 |
| `SIGNIFICANT_MOTION` | 264 | — | 大幅度运动检测 |
| `PEDOMETER_DETECTION` | 265 | — | 计步动作检测 |
| `PEDOMETER` | 266 | — | 行走步数统计 |
| `HEART_RATE` | 278 | — | 心率数据 |
| `WEAR_DETECTION` | 280 | — | 佩戴检测 |

---

## 3. API 接口速查（主要参考）

### 3.1 数据订阅

| 接口 | 用途 |
|---|---|
| `sensor.on(sensorId, callback, options?)` | 持续监听 |
| `sensor.once(sensorId, callback)` | 一次性监听 |
| `sensor.off(sensorId, callback?)` | 取消监听 |

### 3.2 设备查询

| 接口 | 用途 |
|---|---|
| `sensor.getSensorList(callback)` | 获取所有传感器 |
| `sensor.getSensorListByDeviceSync(deviceId?)` | 按设备 ID 同步查询 |
| `sensor.getSingleSensor(sensorId, callback)` | 获取指定传感器属性 |
| `sensor.getSingleSensorSync(sensorId)` | 同步获取指定传感器属性 |
| `sensor.getSingleSensorByDeviceSync(sensorId, deviceId?)` | 按设备 ID + 类型同步查询 |

### 3.3 动态上下线

| 接口 | 用途 |
|---|---|
| `sensor.on('sensorStatusChange', callback)` | 监听传感器上下线 |
| `sensor.off('sensorStatusChange')` | 取消上下线监听 |

### 3.4 SensorInfoParam（多设备场景）

```typescript
{ deviceId: number, sensorIndex: number } // deviceId: -1 = 本地设备
```

---

## 4. 开发步骤（主要参考）

对应 syscap_mechanism.md 适配流程：canIUse → 能力查询 → 订阅 → 取消

### 4.1 配置权限

```json
"requestPermissions": [{ "name": "ohos.permission.ACCELEROMETER" }]
```

### 4.2 查询传感器是否存在（能力查询接口）

```typescript
import { sensor } from '@kit.SensorServiceKit';
// 同步查询 — 不存在则抛异常 → 走降级
try {
  const info = sensor.getSingleSensorSync(sensor.SensorId.ACCELEROMETER);
} catch (error) {
  // 传感器不可用 → 降级处理
}
```

### 4.3 订阅数据

```typescript
sensor.on(sensor.SensorId.ACCELEROMETER, (data: sensor.AccelerometerResponse) => {
  // data.x, data.y, data.z
}, { interval: 100000000 }); // 纳秒
```

### 4.4 取消订阅

```typescript
sensor.off(sensor.SensorId.ACCELEROMETER);
```

---

## 5. 动态上下线监听（主要参考）

> 对应 syscap_mechanism.md 第 2.3 步：主动监听 — 处理硬件动态变更

传感器下线时**必须主动 off**，否则异常。

```typescript
sensor.on('sensorStatusChange', (data: sensor.SensorStatusEvent) => {
  if (!data.isSensorOnline) {
    sensor.off(data.sensorId as sensor.SensorId); // 下线 → 主动关闭
  }
});
```

SensorStatusEvent 属性：`timestamp` / `sensorId` / `sensorIndex` / `isSensorOnline` / `deviceId` / `deviceName`

---

## 6. 采样周期约束（次要参考）

- `interval` 单位**纳秒**，越小越频繁，功耗越大
- 须在传感器 min/max 范围内：超出取边界值
- 通过 `getSingleSensorSync()` 获取 `minSamplingInterval` / `maxSamplingInterval`

---

## 7. 坐标系（次要参考）

直板手机竖直持握、屏幕正对使用者：
- X：屏幕短边，左→右
- Y：屏幕长边，下→上
- Z：垂直屏幕，向外

> 开发者需结合设备自然方向和屏幕方向解释传感器数据。方向传感器建议先调用 Display 接口获取屏幕方向。

---

## 8. 约束与限制

1. 订阅/取消**必须成对调用**
2. 需权限传感器必须 `module.json5` 声明 + `canIUse()` 检测
3. `user_grant` 权限需运行时动态请求
4. 方向传感器建议先获取屏幕方向
