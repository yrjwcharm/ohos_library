---
name: kits_device
description: "HarmonyOS 设备能力集使用规范。包含 SensorServiceKit（传感器、振动）、LocationKit（定位）、NotificationKit（通知）、BackgroundTasksKit（后台任务）等设备相关能力。Use when: (1) 使用传感器，(2) 获取位置信息，(3) 发送通知，(4) 后台任务。Triggers: 传感器、振动、定位、GPS、通知、后台任务、sensor、vibrator、geolocation、notification、background。"
user-invocable: false
---

# DeviceKit 设备能力集 (kits_device)

本 skill 覆盖 HarmonyOS **SensorServiceKit**、**LocationKit**、**NotificationKit**、**BackgroundTasksKit** 等设备能力集的使用规范。

## 能力列表

| 模块 | 导入方式 | 用途 |
|------|----------|------|
| sensor | @ohos.sensor | 传感器 |
| vibrator | @ohos.vibrator | 振动 |
| geoLocationManager | @ohos.geoLocationManager | 定位 |
| notificationManager | @ohos.notificationManager | 通知管理 |
| backgroundTaskManager | @ohos.resourceschedule.backgroundTaskManager | 后台任务 |
| reminderAgentManager | @ohos.reminderAgentManager | 提醒代理 |

## 快速索引

### 传感器

```typescript
import sensor from '@ohos.sensor';

// 加速度传感器
sensor.on(sensor.SensorType.ACCELEROMETER, (data: sensor.AccelerometerResponse) => {
  console.log(`X: ${data.x}, Y: ${data.y}, Z: ${data.z}`);
}, { interval: 100000000 });  // 采样间隔(纳秒)

// 陀螺仪
sensor.on(sensor.SensorType.GYROSCOPE, (data: sensor.GyroscopeResponse) => {
  console.log(`Angular velocity: x=${data.x}, y=${data.y}, z=${data.z}`);
});

// 光线传感器
sensor.on(sensor.SensorType.AMBIENT_LIGHT, (data: sensor.LightResponse) => {
  console.log('Light intensity: ' + data.intensity);
});

// 方向传感器
sensor.on(sensor.SensorType.ORIENTATION, (data: sensor.OrientationResponse) => {
  console.log(`Alpha: ${data.alpha}, Beta: ${data.beta}, Gamma: ${data.gamma}`);
});

// 接近传感器
sensor.on(sensor.SensorType.PROXIMITY, (data: sensor.ProximityResponse) => {
  console.log('Distance: ' + data.distance);
});

// 取消订阅
sensor.off(sensor.SensorType.ACCELEROMETER);
```

### 振动

```typescript
import vibrator from '@ohos.vibrator';

// 短振动
vibrator.startVibration({
  type: 'time',
  duration: 100
}, {
  usage: 'touch'  // 触觉反馈用途
});

// 预设振动效果
vibrator.startVibration({
  type: 'preset',
  effectId: 'haptic.clock.timer'
}, {
  usage: 'notification'
});

// 停止振动
vibrator.stopVibration();
vibrator.stopVibration('time');  // 停止特定类型
```

**振动用途类型**：

| 用途 | 说明 |
|------|------|
| alarm | 闹钟 |
| communication | 通信 |
| touch | 触觉反馈 |
| notification | 通知 |
| physicalEmulation | 物理模拟 |

### 定位

```typescript
import geoLocationManager from '@ohos.geoLocationManager';

// 获取当前位置
let location = await geoLocationManager.getCurrentLocation({
  priority: geoLocationManager.LocationRequestPriority.FIRST_FIX,
  scenario: geoLocationManager.LocationRequestScenario.UNSET,
  timeOut: 10000
});

console.log(`Latitude: ${location.latitude}`);
console.log(`Longitude: ${location.longitude}`);
console.log(`Altitude: ${location.altitude}`);
console.log(`Accuracy: ${location.accuracy}`);

// 持续监听位置变化
let locationChange = (location: geoLocationManager.Location) => {
  console.log(`Location updated: ${location.latitude}, ${location.longitude}`);
};

geoLocationManager.on('locationChange', locationChange);

// 取消监听
geoLocationManager.off('locationChange', locationChange);

// 检查定位开关
let locationEnabled = geoLocationManager.isLocationEnabled();
console.log('Location enabled: ' + locationEnabled);
```

**定位优先级**：

| 值 | 说明 |
|----|------|
| FIRST_FIX | 快速定位 |
| ACCURACY | 高精度 |
| LOW_POWER | 低功耗 |

**定位场景**：

| 值 | 说明 |
|----|------|
| UNSET | 未设置 |
| NAVIGATION | 导航 |
| TRAJECTORY_TRACKING | 轨迹追踪 |
| CAR_HAILING | 打车 |
| DAILY_LIFE_SERVICE | 生活服务 |
| SMART_HOME_SERVICE | 智能家居 |

### 通知

```typescript
import notificationManager from '@ohos.notificationManager';
import wantAgent from '@ohos.app.ability.wantAgent';

// 发布基本通知
let notificationRequest: notificationManager.NotificationRequest = {
  id: 1,
  content: {
    contentType: notificationManager.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
    normal: {
      title: '通知标题',
      text: '通知内容'
    }
  }
};

await notificationManager.publish(notificationRequest);

// 发布带图片的通知
let imageNotification: notificationManager.NotificationRequest = {
  id: 2,
  content: {
    contentType: notificationManager.ContentType.NOTIFICATION_CONTENT_PICTURE,
    picture: {
      title: '图片通知',
      text: '这是带图片的通知',
      expandedTitle: '展开标题',
      picture: imagePixelMap  // PixelMap 对象
    }
  }
};

await notificationManager.publish(imageNotification);

// 取消通知
await notificationManager.cancel(1);

// 取消所有通知
await notificationManager.cancelAll();
```

### 后台任务

```typescript
import backgroundTaskManager from '@ohos.resourceschedule.backgroundTaskManager';

// 申请长时任务（后台持续运行）
let bgMode: backgroundTaskManager.BackgroundMode = backgroundTaskManager.BackgroundMode.DATA_TRANSFER;

// 请求后台任务
let token = await backgroundTaskManager.requestSuspendDelay('app_name', () => {
  console.log('Background task expired');
});

// 检查后台任务是否有效
let isEffective = backgroundTaskManager.isSuspendDelayEnabled(token.requestId);

// 取消后台任务
backgroundTaskManager.cancelSuspendDelay(token.requestId);

// 后台模式类型
enum BackgroundMode {
  DATA_TRANSFER = 1,      // 数据传输
  AUDIO_PLAYBACK = 2,     // 音频播放
  AUDIO_RECORDING = 3,    // 录音
  LOCATION = 4,           // 定位
  BLUETOOTH_INTERACTION = 5, // 蓝牙交互
  MULTI_DEVICE_CONNECTION = 6, // 多设备连接
  WIFI_INTERACTION = 7,   // WiFi交互
  SCREEN_LOCK = 8,        // 锁屏显示
  INPUT_EVENT = 9,        // 输入事件
}
```

### 提醒代理（定时提醒）

```typescript
import reminderAgentManager from '@ohos.reminderAgentManager';

// 创建定时器提醒
let timerReminder: reminderAgentManager.ReminderRequestTimer = {
  reminderType: reminderAgentManager.ReminderType.REMINDER_TYPE_TIMER,
  triggerTimeInSeconds: 60,  // 60秒后触发
  title: '提醒标题',
  content: '提醒内容',
  wantAgent: wantAgentObj  // 点击提醒时的跳转
};

let reminderId = await reminderAgentManager.publishReminder(timerReminder);

// 取消提醒
await reminderAgentManager.cancelReminder(reminderId);

// 日历提醒
let calendarReminder: reminderAgentManager.ReminderRequestCalendar = {
  reminderType: reminderAgentManager.ReminderType.REMINDER_TYPE_CALENDAR,
  dateTime: {
    year: 2025,
    month: 3,
    day: 15,
    hour: 10,
    minute: 30
  },
  repeatMonths: [3, 6, 9, 12],  // 重复月份
  repeatDays: [1, 15],           // 重复日期
  title: '定期提醒',
  content: '每月定期提醒内容'
};
```

## 使用示例

### 计步器功能

```typescript
@Entry
@Component
struct PedometerPage {
  @State steps: number = 0;
  private subscriber: number | null = null;

  aboutToAppear(): void {
    // 订阅计步器
    sensor.on(sensor.SensorType.PEDOMETER, (data) => {
      this.steps = data.steps;
    });
  }

  aboutToDisappear(): void {
    sensor.off(sensor.SensorType.PEDOMETER);
  }

  build() {
    Column() {
      Text(`步数: ${this.steps}`)
        .fontSize(40)
        .fontWeight(FontWeight.Bold)

      Button('振动一下')
        .onClick(() => {
          vibrator.startVibration({
            type: 'time',
            duration: 50
          }, { usage: 'touch' });
        })
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
  }
}
```

### 地图定位

```typescript
import geoLocationManager from '@ohos.geoLocationManager';

@Entry
@Component
struct LocationPage {
  @State latitude: number = 0;
  @State longitude: number = 0;
  @State address: string = '';

  async getCurrentLocation(): Promise<void> {
    try {
      let location = await geoLocationManager.getCurrentLocation({
        priority: geoLocationManager.LocationRequestPriority.ACCURACY,
        timeOut: 10000
      });

      this.latitude = location.latitude;
      this.longitude = location.longitude;

      // 逆地理编码获取地址
      // ...
    } catch (error) {
      console.error('Get location failed: ' + error.message);
    }
  }

  build() {
    Column({ space: 20 }) {
      Text(`纬度: ${this.latitude}`)
      Text(`经度: ${this.longitude}`)
      Text(`地址: ${this.address}`)

      Button('获取位置')
        .onClick(() => this.getCurrentLocation())
    }
  }
}
```

### 后台音乐播放

```typescript
// 在 module.json5 中配置后台模式
{
  "module": {
    "abilities": [
      {
        "backgroundModes": ["audioPlayback"]
      }
    ]
  }
}

// 代码中申请后台任务
import backgroundTaskManager from '@ohos.resourceschedule.backgroundTaskManager';

async function startBackgroundPlayback(): Promise<void> {
  // 申请音频播放后台任务
  let token = await backgroundTaskManager.requestSuspendDelay(
    'MusicPlayer',
    () => {
      console.log('Background playback time expired');
      // 处理超时
    }
  );

  // 开始播放音乐
  // ...
}
```

## 权限配置

```json
{
  "module": {
    "requestPermissions": [
      {
        "name": "ohos.permission.ACCELEROMETER"
      },
      {
        "name": "ohos.permission.VIBRATE"
      },
      {
        "name": "ohos.permission.LOCATION"
      },
      {
        "name": "ohos.permission.APPROXIMATELY_LOCATION"
      },
      {
        "name": "ohos.permission.NOTIFICATION_CONTROLLER"
      }
    ]
  }
}
```

## 最佳实践

1. **传感器使用后取消订阅**：
```typescript
aboutToAppear() {
  sensor.on(sensor.SensorType.ACCELEROMETER, callback);
}

aboutToDisappear() {
  sensor.off(sensor.SensorType.ACCELEROMETER);  // 必须取消
}
```

2. **定位权限分级申请**：
```typescript
// 先申请粗略定位
// 再申请精确定位
```

3. **后台任务及时释放**：
```typescript
// 任务完成后立即取消
backgroundTaskManager.cancelSuspendDelay(requestId);
```

## 注意事项

1. 传感器和定位需要用户授权
2. 后台任务需要在配置文件中声明
3. 定位在室内可能不准确
4. 通知需要用户授权通知权限