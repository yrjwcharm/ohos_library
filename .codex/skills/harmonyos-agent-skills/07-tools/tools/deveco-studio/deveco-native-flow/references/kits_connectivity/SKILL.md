---
name: kits_connectivity
description: "HarmonyOS ConnectivityKit 连接能力集使用规范。包含蓝牙（BLE、A2DP、HFP等）、NFC、WiFi等连接能力。Use when: (1) 蓝牙通信，(2) BLE设备连接，(3) NFC读写，(4) WiFi管理。Triggers: 蓝牙、BLE、NFC、WiFi、连接、bluetooth、wifi、nfc、@ohos.bluetooth、@ohos.wifi。"
user-invocable: false
---

# ConnectivityKit 连接能力集 (kits_connectivity)

本 skill 覆盖 HarmonyOS **ConnectivityKit** 连接能力集的使用规范。

## 能力列表

| 模块 | 导入方式 | 用途 |
|------|----------|------|
| bluetooth | @ohos.bluetooth | 蓝牙基础能力 |
| ble | @ohos.bluetooth.ble | 低功耗蓝牙(BLE) |
| connection | @ohos.bluetooth.connection | 蓝牙连接管理 |
| a2dp | @ohos.bluetooth.a2dp | 蓝牙音频传输 |
| hfp | @ohos.bluetooth.hfp | 蓝牙免提 |
| hid | @ohos.bluetooth.hid | 蓝牙HID设备 |
| socket | @ohos.bluetooth.socket | 蓝牙Socket通信 |
| nfcController | @ohos.nfc.controller | NFC控制器 |
| tag | @ohos.nfc.tag | NFC标签读写 |
| cardEmulation | @ohos.nfc.cardEmulation | NFC卡模拟 |
| wifi | @ohos.wifi | WiFi基础功能 |
| wifiManager | @ohos.wifiManager | WiFi管理 |

## 快速索引

### 蓝牙基础

```typescript
import bluetooth from '@ohos.bluetooth.access';

// 开启蓝牙
bluetooth.enableBluetooth();

// 关闭蓝牙
bluetooth.disableBluetooth();

// 监听蓝牙状态变化
bluetooth.on('stateChange', (data: bluetooth.BluetoothState) => {
  console.log('Bluetooth state: ' + data);
});

// 获取蓝牙状态
let state = bluetooth.getState();
// BluetoothState: STATE_OFF(0), STATE_TURNING_ON(1), STATE_ON(2), STATE_TURNING_OFF(3)
```

### BLE 扫描与连接

```typescript
import ble from '@ohos.bluetooth.ble';
import connection from '@ohos.bluetooth.connection';

// 开始BLE扫描
ble.startBLEScan({
  deviceId: '',  // 可选，指定设备
  uuids: [],     // 可选，服务UUID过滤
});

// 监听BLE设备发现
ble.on('BLEDeviceFind', (data: Array<ble.ScanResult>) => {
  for (let device of data) {
    console.log(`Found device: ${device.deviceId}, RSSI: ${device.rssi}`);
  }
});

// 停止扫描
ble.stopBLEScan();

// 连接BLE设备
let gadget: ble.GattClientDevice = ble.createGattClientDevice(deviceId);
gadget.connect();

// 监听连接状态
gadget.on('connectionStateChange', (state: ble.BLEConnectionState) => {
  console.log('Connection state: ' + state);
  // BLEConnectionState: 0-断开, 1-连接中, 2-已连接, 3-断开中
});

// 发现服务
let services = await gadget.getServices();
for (let service of services) {
  console.log(`Service UUID: ${service.serviceUuid}`);
  for (let characteristic of service.characteristics) {
    console.log(`  Characteristic: ${characteristic.characteristicUuid}`);
  }
}

// 读写特征值
let characteristic = await gadget.readCharacteristicValue(serviceUuid, characteristicUuid);
await gadget.writeCharacteristicValue({
  serviceUuid: serviceUuid,
  characteristicUuid: characteristicUuid,
  value: dataBuffer
});

// 断开连接
gadget.disconnect();
```

### 蓝牙配对

```typescript
import connection from '@ohos.bluetooth.connection';

// 开始配对
connection.pairDevice(deviceId);

// 监听配对状态
connection.on('bondStateChange', (data: connection.BondStateParam) => {
  console.log(`Device: ${data.deviceId}, Bond state: ${data.state}`);
  // BondState: BOND_STATE_INVALID(0), BOND_STATE_BONDING(1), BOND_STATE_BONDED(2)
});

// 获取已配对设备
let pairedDevices = connection.getPairedDevices();

// 取消配对
connection.cancelPairedDevice(deviceId);
```

### NFC 标签读写

```typescript
import nfcController from '@ohos.nfc.controller';
import tag from '@ohos.nfc.tag';

// 检查NFC是否开启
let nfcEnabled = nfcController.isNfcAvailable();

// 开启NFC
nfcController.openNfc();

// 监听NFC标签发现
tag.on('readerMode', (tagInfo: tag.TagInfo) => {
  console.log('NFC tag discovered');
  console.log('Tag UID: ' + tagInfo.assignedTag);
  console.log('Tag type: ' + tagInfo.technology);

  // 根据标签类型读取
  if (tagInfo.technology.includes('Ndef')) {
    let ndefTag = tag.getNdef(tagInfo);
    let ndefMessage = ndefTag.getNdefMessage();
    // 处理NDEF消息
  }
});

// NDEF标签写入
let ndefMessage: tag.NdefMessage = {
  ndefRecords: [{
    tnf: tag.NdefRecord.TNF_WELL_KNOWN,
    rtdType: 'U',  // URL
    payload: new Uint8Array([...])  // URL数据
  }]
};
ndefTag.writeNdef(ndefMessage);
```

### NFC 卡模拟

```typescript
import cardEmulation from '@ohos.nfc.cardEmulation';

// 检查是否支持卡模拟
let isSupported = cardEmulation.isSupported(cardEmulation.FeatureType.HCE);

// 注册HCE服务
let elementName = {
  bundleName: 'com.example.app',
  abilityName: 'HceServiceAbility'
};
await cardEmulation.registerAbility(elementName, paymentService);

// 监听HCE APDU数据
cardEmulation.on('hceCmd', (apduData: cardEmulation.HceCmd) => {
  // 处理APDU命令并发送响应
  cardEmulation.transmitResponse(responseData);
});
```

### WiFi 管理

```typescript
import wifiManager from '@ohos.wifiManager';

// 开启WiFi
wifiManager.enableWifi();

// 扫描WiFi
wifiManager.scan();

// 获取扫描结果
let scanInfo = wifiManager.getScanInfoList();
for (let info of scanInfo) {
  console.log(`SSID: ${info.ssid}, BSSID: ${info.bssid}, Signal: ${info.rssi}`);
}

// 连接WiFi
let config: wifiManager.WifiDeviceConfig = {
  ssid: 'MyWiFi',
  bssid: '',
  preSharedKey: 'password123',
  securityType: wifiManager.WifiSecurityType.WIFI_SEC_TYPE_PSK
};
await wifiManager.connectToDevice(config);

// 监听WiFi连接状态
wifiManager.on('wifiConnectionChange', (state: wifiManager.WifiConnState) => {
  console.log('WiFi connection state: ' + state);
});

// 获取已连接WiFi信息
let linkedInfo = wifiManager.getLinkedInfo();
console.log(`Connected to: ${linkedInfo.ssid}`);

// 断开WiFi
wifiManager.disconnect();

// 关闭WiFi
wifiManager.disableWifi();
```

## 使用示例

### BLE 心率设备连接

```typescript
import ble from '@ohos.bluetooth.ble';

const HEART_RATE_SERVICE_UUID = '0000180D-0000-1000-8000-00805F9B34FB';
const HEART_RATE_MEASUREMENT_UUID = '00002A37-0000-1000-8000-00805F9B34FB';

@Entry
@Component
struct HeartRatePage {
  @State heartRate: number = 0;
  private gattClient: ble.GattClientDevice | null = null;

  async connectToDevice(deviceId: string): Promise<void> {
    this.gattClient = ble.createGattClientDevice(deviceId);

    this.gattClient.on('connectionStateChange', async (state) => {
      if (state === ble.BLEConnectionState.STATE_CONNECTED) {
        // 启用心率通知
        await this.gattClient?.setNotifyCharacteristicValue({
          serviceUuid: HEART_RATE_SERVICE_UUID,
          characteristicUuid: HEART_RATE_MEASUREMENT_UUID,
          serviceValue: true
        });

        // 监听心率数据
        this.gattClient?.on('BLECharacteristicChange', (data) => {
          if (data.characteristicUuid === HEART_RATE_MEASUREMENT_UUID) {
            this.heartRate = data.value[1];  // 心率值
          }
        });
      }
    });

    await this.gattClient.connect();
  }

  build() {
    Column() {
      Text(`心率: ${this.heartRate} BPM`)
        .fontSize(40)

      Button('扫描并连接')
        .onClick(async () => {
          ble.startBLEScan({});
          // 扫描逻辑...
        })
    }
  }
}
```

### WiFi 配网

```typescript
import wifiManager from '@ohos.wifiManager';

@Entry
@Component
struct WiFiConfigPage {
  @State ssid: string = '';
  @State password: string = '';
  @State scanResults: wifiManager.ScanResult[] = [];

  aboutToAppear(): void {
    wifiManager.enableWifi();
    wifiManager.scan();

    setTimeout(() => {
      this.scanResults = wifiManager.getScanInfoList();
    }, 3000);
  }

  async connect(): Promise<void> {
    try {
      let config: wifiManager.WifiDeviceConfig = {
        ssid: this.ssid,
        preSharedKey: this.password,
        securityType: wifiManager.WifiSecurityType.WIFI_SEC_TYPE_PSK
      };
      await wifiManager.connectToDevice(config);
      console.log('WiFi connected successfully');
    } catch (error) {
      console.error('WiFi connection failed: ' + error.message);
    }
  }

  build() {
    Column({ space: 20 }) {
      List() {
        ForEach(this.scanResults, (item: wifiManager.ScanResult) => {
          ListItem() {
            Text(item.ssid)
              .onClick(() => { this.ssid = item.ssid; })
          }
        })
      }

      TextInput({ placeholder: 'SSID', text: this.ssid })
        .onChange((value) => { this.ssid = value; })

      TextInput({ placeholder: '密码' })
        .type(InputType.Password)
        .onChange((value) => { this.password = value; })

      Button('连接')
        .onClick(() => this.connect())
    }
  }
}
```

## 权限配置

```json
{
  "module": {
    "requestPermissions": [
      { "name": "ohos.permission.USE_BLUETOOTH" },
      { "name": "ohos.permission.DISCOVER_BLUETOOTH" },
      { "name": "ohos.permission.MANAGE_BLUETOOTH" },
      { "name": "ohos.permission.LOCATION" },
      { "name": "ohos.permission.GET_WIFI_INFO" },
      { "name": "ohos.permission.SET_WIFI_INFO" },
      { "name": "ohos.permission.GET_WIFI_CONFIG" },
      { "name": "ohos.permission.NFC_CARD_EMULATION" },
      { "name": "ohos.permission.NFC_TAG" }
    ]
  }
}
```

## 最佳实践

1. **蓝牙操作前检查状态**：
```typescript
let state = bluetooth.getState();
if (state !== bluetooth.BluetoothState.STATE_ON) {
  bluetooth.enableBluetooth();
}
```

2. **BLE连接超时处理**：
```typescript
let timeout = setTimeout(() => {
  gattClient.disconnect();
}, 10000);

gattClient.on('connectionStateChange', (state) => {
  if (state === ble.BLEConnectionState.STATE_CONNECTED) {
    clearTimeout(timeout);
  }
});
```

3. **NFC使用后关闭监听**：
```typescript
aboutToAppear(): void {
  tag.on('readerMode', callback);
}

aboutToDisappear(): void {
  tag.off('readerMode', callback);
}
```

## 注意事项

1. BLE操作需要位置权限
2. 蓝牙和WiFi操作多为异步，注意使用await
3. NFC读取完成后及时关闭readerMode
4. 大数据传输建议分片处理