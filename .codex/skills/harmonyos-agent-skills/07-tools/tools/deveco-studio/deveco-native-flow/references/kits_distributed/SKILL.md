---
name: kits_distributed
description: "HarmonyOS DistributedServiceKit 分布式能力集使用规范。包含分布式设备管理、设备发现、跨设备协同、设备认证等功能。Use when: (1) 设备发现，(2) 跨设备协同，(3) 分布式数据同步，(4) 设备认证。Triggers: 分布式、跨设备、设备发现、协同、distributed、deviceManager、多设备。"
user-invocable: false
---

# DistributedServiceKit 分布式能力集 (kits_distributed)

本 skill 覆盖 HarmonyOS **DistributedServiceKit** 分布式能力集的使用规范。

## 能力列表

| 模块 | 导入方式 | 用途 |
|------|----------|------|
| distributedDeviceManager | @ohos.distributedDeviceManager | 分布式设备管理 |
| deviceManager | @ohos.distributedHardware.deviceManager | 设备管理(旧版) |

## 快速索引

### 设备管理器初始化

```typescript
import distributedDeviceManager from '@ohos.distributedDeviceManager';

// 创建设备管理器
let dmInstance = distributedDeviceManager.createDeviceManager('com.example.myapp');
console.log('Device manager created');
```

### 发现设备

```typescript
import distributedDeviceManager from '@ohos.distributedDeviceManager';

let dmInstance = distributedDeviceManager.createDeviceManager('com.example.myapp');

// 监听设备状态变化
dmInstance.on('deviceStateChange', (data: distributedDeviceManager.DeviceInfo) => {
  console.log(`Device state changed: ${data.deviceName}`);
  console.log(`Device ID: ${data.deviceId}`);
  console.log(`Device state: ${data.deviceState}`);
  // DeviceState: UNKNOWN(0), AVAILABLE(1), UNAVAILABLE(2)
});

// 发现设备
let discoveryInfo: distributedDeviceManager.DiscoverInfo = {
  subscribeId: 12345,
  mode: 'DISCOVER_MODE_ACTIVE',     // 主动发现
  medium: 'AUTO',                    // 自动选择媒介
  freq: 'MID'                        // 中频扫描
};

dmInstance.startDeviceDiscovery(discoveryInfo);

// 监听设备发现结果
dmInstance.on('discoverDevice', (data: distributedDeviceManager.DiscoverInfo) => {
  console.log('Discovered device');
  // data 包含发现的设备信息
});

// 停止发现
dmInstance.stopDeviceDiscovery({ subscribeId: 12345 });
```

### 获取设备列表

```typescript
import distributedDeviceManager from '@ohos.distributedDeviceManager';

let dmInstance = distributedDeviceManager.createDeviceManager('com.example.myapp');

// 获取可信设备列表
let trustedDevices = dmInstance.getAvailableDeviceList();
for (let device of trustedDevices) {
  console.log(`Device: ${device.deviceName}, ID: ${device.deviceId}`);
  console.log(`  Device type: ${device.deviceType}`);
  console.log(`  Network ID: ${device.networkId}`);
}

// 获取本地设备信息
let localDevice = dmInstance.getLocalDeviceNetworkId();
console.log('Local device network ID: ' + localDevice);

// 设备类型
enum DeviceType {
  UNKNOWN = 0,
  SPEAKER = 1,       // 音箱
  PHONE = 2,         // 手机
  TABLET = 3,        // 平板
  WATCH = 4,         // 手表
  CAR = 5,           // 车机
  TV = 6             // 电视
}
```

### 设备认证

```typescript
import distributedDeviceManager from '@ohos.distributedDeviceManager';

let dmInstance = distributedDeviceManager.createDeviceManager('com.example.myapp');

// 认证设备
let authParam: distributedDeviceManager.AuthParam = {
  authType: 1,  // 认证类型
  extraInfo: {}
};

let authParamInstance = {
  authType: distributedDeviceManager.AuthType.PIN_CODE,
  extraInfo: {}
};

// 监听认证状态
dmInstance.on('authResult', (data: distributedDeviceManager.AuthResult) => {
  console.log(`Auth result: ${data.authResult}`);
  // AuthResult: SUCCESS(0), FAIL(1), CANCEL(2)
  console.log(`Token: ${data.token}`);
});

// 发起认证
await dmInstance.authenticateDevice(deviceInfo, authParamInstance, (err, data) => {
  if (err) {
    console.error('Authentication failed: ' + err.message);
  } else {
    console.log('Authentication succeeded');
  }
});
```

### 绑定/解绑设备

```typescript
import distributedDeviceManager from '@ohos.distributedDeviceManager';

let dmInstance = distributedDeviceManager.createDeviceManager('com.example.myapp');

// 绑定设备
await dmInstance.bindTarget(deviceId, {
  bindType: distributedDeviceManager.BindType.BIND_JOOINED,
  targetPkgName: 'com.example.myapp',
  appOperating: distributedDeviceManager.AppOperating.START_ON_DEMAND
}, (err, data) => {
  if (!err) {
    console.log('Device bound successfully');
  }
});

// 解绑设备
await dmInstance.unbindTarget(deviceId, {
  bindType: distributedDeviceManager.BindType.BIND_JOOINED,
  targetPkgName: 'com.example.myapp'
});
```

## 使用示例

### 设备选择器组件

```typescript
import distributedDeviceManager from '@ohos.distributedDeviceManager';

interface DeviceInfo {
  deviceId: string;
  deviceName: string;
  deviceType: number;
  deviceState: number;
}

@Entry
@Component
struct DevicePickerPage {
  @State devices: DeviceInfo[] = [];
  @State selectedDevice: DeviceInfo | null = null;
  private dmInstance: distributedDeviceManager.DeviceManager | null = null;

  aboutToAppear(): void {
    this.dmInstance = distributedDeviceManager.createDeviceManager('com.example.myapp');
    this.loadDevices();

    // 监听设备变化
    this.dmInstance.on('deviceStateChange', (data) => {
      this.loadDevices();
    });
  }

  aboutToDisappear(): void {
    this.dmInstance?.off('deviceStateChange');
  }

  loadDevices(): void {
    if (this.dmInstance) {
      this.devices = this.dmInstance.getAvailableDeviceList();
    }
  }

  async startDiscovery(): Promise<void> {
    if (!this.dmInstance) return;

    let discoveryInfo: distributedDeviceManager.DiscoverInfo = {
      subscribeId: 12345,
      mode: 'DISCOVER_MODE_ACTIVE',
      medium: 'AUTO',
      freq: 'MID'
    };

    this.dmInstance.startDeviceDiscovery(discoveryInfo);

    // 10秒后停止发现
    setTimeout(() => {
      this.dmInstance?.stopDeviceDiscovery({ subscribeId: 12345 });
    }, 10000);
  }

  build() {
    Column({ space: 20 }) {
      Text('选择设备')
        .fontSize(24)
        .fontWeight(FontWeight.Bold)

      Button('扫描设备')
        .width('80%')
        .onClick(() => this.startDiscovery())

      List() {
        ForEach(this.devices, (device: DeviceInfo) => {
          ListItem() {
            Row() {
              Text(this.getDeviceIcon(device.deviceType))
                .fontSize(24)
              Column() {
                Text(device.deviceName)
                  .fontWeight(FontWeight.Bold)
                Text(`ID: ${device.deviceId.substring(0, 8)}...`)
                  .fontSize(12)
                  .fontColor('#666')
              }
              .layoutWeight(1)
              .margin({ left: 10 })

              if (this.selectedDevice?.deviceId === device.deviceId) {
                Text('✓')
                  .fontSize(20)
                  .fontColor('#007DFF')
              }
            }
            .padding(15)
            .onClick(() => { this.selectedDevice = device; })
          }
        })
      }
      .layoutWeight(1)
      .width('100%')

      Button('确定')
        .width('80%')
        .enabled(this.selectedDevice !== null)
        .onClick(() => {
          if (this.selectedDevice) {
            // 使用选中的设备进行操作
            console.log('Selected device: ' + this.selectedDevice.deviceName);
          }
        })
    }
    .width('100%')
    .height('100%')
    .padding(20)
  }

  private getDeviceIcon(type: number): string {
    switch (type) {
      case 2: return '📱';  // 手机
      case 3: return '📱';  // 平板
      case 4: return '⌚';  // 手表
      case 5: return '🚗';  // 车机
      case 6: return '📺';  // 电视
      default: return '📟';
    }
  }
}
```

### 跨设备数据协同

```typescript
import distributedDeviceManager from '@ohos.distributedDeviceManager';
import distributedKVStore from '@ohos.data.distributedKVStore';

class DistributedDataService {
  private dmInstance: distributedDeviceManager.DeviceManager | null = null;
  private kvStore: distributedKVStore.SingleKVStore | null = null;

  async init(): Promise<void> {
    // 初始化设备管理
    this.dmInstance = distributedDeviceManager.createDeviceManager('com.example.myapp');

    // 初始化分布式KV存储
    let kvManager = distributedKVStore.createKVManager({
      bundleName: 'com.example.myapp',
      userInfo: { userId: 'default' }
    });

    let options: distributedKVStore.Options = {
      createIfMissing: true,
      encrypt: false,
      backup: false,
      autoSync: true,
      kvStoreType: distributedKVStore.KVStoreType.SINGLE_VERSION,
      securityLevel: distributedKVStore.SecurityLevel.S0
    };

    this.kvStore = await kvManager.getKVStore('distributed_store', options);

    // 监听数据变化
    this.kvStore.on('dataChange', distributedKVStore.SubscribeType.SUBSCRIBE_TYPE_ALL, (data) => {
      console.log('Data changed from device: ' + data.deviceId);
      for (let entry of data.updateEntries) {
        console.log(`Key: ${entry.key}, Value: ${entry.value.value}`);
      }
    });
  }

  async syncData(key: string, value: string): Promise<void> {
    if (!this.kvStore) return;
    await this.kvStore.put(key, value);
  }

  async getData(key: string): Promise<string | undefined> {
    if (!this.kvStore) return undefined;
    let result = await this.kvStore.get(key);
    return result;
  }
}
```

## 权限配置

```json
{
  "module": {
    "requestPermissions": [
      { "name": "ohos.permission.DISTRIBUTED_DATASYNC" },
      { "name": "ohos.permission.DISTRIBUTED_SOFTBUS_CENTER" },
      { "name": "ohos.permission.ACCESS_SERVICE_DM" }
    ]
  }
}
```

## DeviceState 枚举

```typescript
enum DeviceState {
  UNKNOWN = 0,       // 未知
  AVAILABLE = 1,     // 可用
  UNAVAILABLE = 2    // 不可用
}
```

## AuthType 枚举

```typescript
enum AuthType {
  PIN_CODE = 1,      // PIN码
  QR_CODE = 2,       // 二维码
  NFC = 3,           // NFC
  NO_PIN = 4         // 无PIN
}
```

## 最佳实践

1. **设备发现后及时停止**：
```typescript
dmInstance.startDeviceDiscovery(discoveryInfo);
setTimeout(() => {
  dmInstance.stopDeviceDiscovery({ subscribeId: discoveryInfo.subscribeId });
}, 10000);
```

2. **监听器及时移除**：
```typescript
aboutToDisappear(): void {
  dmInstance.off('deviceStateChange');
  dmInstance.off('discoverDevice');
}
```

3. **分布式同步使用autoSync**：
```typescript
// 自动同步简化代码
let options = {
  autoSync: true,
  kvStoreType: distributedKVStore.KVStoreType.SINGLE_VERSION
};
```

## 注意事项

1. 分布式功能需要用户授权
2. 设备需要在同一局域网
3. 发现过程消耗电量，不宜长时间开启
4. 跨设备操作需要设备已认证绑定