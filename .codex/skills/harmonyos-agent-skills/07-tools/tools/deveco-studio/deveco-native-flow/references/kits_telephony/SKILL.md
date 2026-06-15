---
name: kits_telephony
description: "HarmonyOS TelephonyKit 电话能力集使用规范。包含电话拨打、短信发送、SIM卡管理、网络状态监听等功能。Use when: (1) 拨打电话，(2) 发送短信，(3) 读取SIM卡信息，(4) 监听通话状态。Triggers: 电话、拨打、短信、SMS、SIM卡、通话、telephony、call、sms、sim、@ohos.telephony。"
user-invocable: false
---

# TelephonyKit 电话能力集 (kits_telephony)

本 skill 覆盖 HarmonyOS **TelephonyKit** 电话能力集的使用规范。

## 能力列表

| 模块 | 导入方式 | 用途 |
|------|----------|------|
| call | @ohos.telephony.call | 电话拨打 |
| sms | @ohos.telephony.sms | 短信发送 |
| sim | @ohos.telephony.sim | SIM卡信息 |
| radio | @ohos.telephony.radio | 无线通信状态 |
| observer | @ohos.telephony.observer | 状态监听 |
| data | @ohos.telephony.data | 数据业务 |
| vcard | @ohos.telephony.vcard | 名片解析 |

## 快速索引

### 拨打电话

```typescript
import call from '@ohos.telephony.call';

// 拨打电话（需要系统权限或用户确认）
await call.dial('13800138000');

// 带参数拨打
await call.dial('13800138000', {
  accountId: 0,  // SIM卡槽ID
  videoState: 0  // 0-语音, 1-视频
});

// 判断是否支持通话
let isSupported = call.hasVoiceCapability();
console.log('Voice capability: ' + isSupported);

// 监听通话状态
call.on('callStateChange', (data: call.CallStateChange) => {
  console.log(`Call state: ${data.state}, Number: ${data.accountId}`);
  // CallState: CALL_STATE_UNKNOWN(0), CALL_STATE_IDLE(1), CALL_STATE_RINGING(2), CALL_STATE_OFFHOOK(3)
});
```

### 发送短信

```typescript
import sms from '@ohos.telephony.sms';

// 发送短信
let options: sms.SendMessageOptions = {
  slotId: 0,                    // SIM卡槽ID
  destinationHost: '13800138000',
  content: 'Hello from HarmonyOS',
  deliveryCallback: (err, data) => {
    if (err) {
      console.error('SMS delivery failed: ' + err.message);
    } else {
      console.log('SMS delivered successfully');
    }
  },
  sendCallback: (err, data) => {
    if (err) {
      console.error('SMS send failed: ' + err.message);
    } else {
      console.log('SMS sent successfully');
    }
  }
};

await sms.sendMessage(options);

// 发送长短信（自动分片）
let longMessage = '这是一段很长的短信内容...'.repeat(100);
await sms.sendMessage({
  slotId: 0,
  destinationHost: '13800138000',
  content: longMessage
});

// 创建短信消息
let message: sms.ShortMessage = {
  hasReplyPath: false,
  isReplaceMessage: false,
  messageClass: sms.ShortMessageClass.CLASS_UNKNOWN,
  protocolId: 0,
  status: 0,
  visibleMessageBody: '短信内容',
  visibleRawAddress: '13800138000'
};
```

### SIM卡信息

```typescript
import sim from '@ohos.telephony.sim';

// 检查SIM卡状态
let hasSim = sim.hasSimCard(0);  // 0-SIM1, 1-SIM2
console.log('Has SIM: ' + hasSim);

// 获取SIM卡状态
let simState = sim.getSimState(0);
// SimState: SIM_STATE_UNKNOWN(0), SIM_STATE_ABSENT(1), SIM_STATE_PRESENT(2), SIM_STATE_LOCKED(3)

// 获取SIM卡运营商
let operatorName = sim.getSimOperatorName(0);
console.log('Operator: ' + operatorName);

// 获取SIM卡号码
let phoneNumber = sim.getSimTelephoneNumber(0);
console.log('Phone number: ' + phoneNumber);

// 获取SIM卡SPN
let spn = sim.getSimSpn(0);
console.log('SPN: ' + spn);

// 获取SIM卡ICC ID
let iccId = sim.getSimIccId(0);
console.log('ICC ID: ' + iccId);

// 获取ISO国家代码
let isoCode = sim.getIsoCountryCodeForSim(0);
console.log('ISO: ' + isoCode);
```

### 网络状态监听

```typescript
import observer from '@ohos.telephony.observer';

// 监听网络状态变化
observer.on('networkStateChange', (data: observer.NetworkState) => {
  console.log(`Network state: ${data.regState}`);
  console.log(`Signal strength: ${data.signalStrength}`);
  console.log(`Data connection: ${data.dataConnectionState}`);
});

// 监听信号强度变化
observer.on('signalInfoChange', (data: observer.SignalInformation[]) => {
  for (let info of data) {
    console.log(`Signal type: ${info.signalType}, Level: ${info.signalLevel}`);
  }
});

// 监听SIM卡状态变化
observer.on('simStateChange', (data: observer.SimStateInfo) => {
  console.log(`SIM state changed: ${data.simState}`);
});

// 监听通话状态变化
observer.on('callStateChange', (data: observer.CallStateInfo) => {
  console.log(`Call state: ${data.callState}`);
  // CallState: CALL_STATUS_UNKNOWN(0), CALL_STATUS_IDLE(1), CALL_STATUS_RINGING(2), CALL_STATUS_OFFHOOK(3)
});
```

### 数据业务

```typescript
import data from '@ohos.telephony.data';

// 检查数据业务是否启用
let isDataEnabled = data.isCellularDataEnabled();
console.log('Cellular data enabled: ' + isDataEnabled);

// 检查数据漫游是否启用
let isRoaming = data.isCellularDataRoamingEnabled(0);
console.log('Data roaming: ' + isRoaming);

// 获取默认数据SIM卡
let defaultSlot = data.getDefaultCellularDataSlotId();
console.log('Default data slot: ' + defaultSlot);

// 监听数据连接状态
data.on('cellularDataChange', (dataInfo: data.CellularDataState) => {
  console.log('Cellular data state: ' + dataInfo);
});
```

### 名片(vCard)解析

```typescript
import vcard from '@ohos.telephony.vcard';

// 解析vCard字符串
let vcardString = `BEGIN:VCARD
VERSION:3.0
FN:张三
TEL:13800138000
EMAIL:test@example.com
END:VCARD`;

let result = await vcard.parseVCard(vcardString);
console.log('Name: ' + result.fullName);
console.log('Phone: ' + result.phoneNumbers);
```

## 使用示例

### 一键拨号

```typescript
import call from '@ohos.telephony.call';

@Entry
@Component
struct CallPage {
  @State phoneNumber: string = '';

  async makeCall(): Promise<void> {
    try {
      // 检查是否支持通话
      if (!call.hasVoiceCapability()) {
        promptAction.showToast({ message: '设备不支持通话功能' });
        return;
      }

      // 拨打电话
      await call.dial(this.phoneNumber);
    } catch (error) {
      console.error('Call failed: ' + error.message);
    }
  }

  build() {
    Column({ space: 20 }) {
      TextInput({ placeholder: '输入电话号码', text: this.phoneNumber })
        .type(InputType.PhoneNumber)
        .width('80%')
        .onChange((value) => { this.phoneNumber = value; })

      Button('拨打')
        .width('80%')
        .onClick(() => this.makeCall())
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
  }
}
```

### 短信发送

```typescript
import sms from '@ohos.telephony.sms';

@Entry
@Component
struct SmsPage {
  @State phoneNumbers: string = '';
  @State message: string = '';
  @State sendStatus: string = '';

  async sendSms(): Promise<void> {
    let numbers = this.phoneNumbers.split(',').map(s => s.trim());

    for (let number of numbers) {
      try {
        await sms.sendMessage({
          slotId: 0,
          destinationHost: number,
          content: this.message,
          sendCallback: (err, data) => {
            if (err) {
              this.sendStatus = `发送失败: ${number}`;
            } else {
              this.statusText = `发送成功: ${number}`;
            }
          }
        });
      } catch (error) {
        console.error('Send SMS failed: ' + error.message);
      }
    }
  }

  build() {
    Column({ space: 20 }) {
      TextInput({ placeholder: '收件人（多个用逗号分隔）', text: this.phoneNumbers })
        .width('90%')

      TextArea({ placeholder: '短信内容', text: this.message })
        .width('90%')
        .height(150)
        .onChange((value) => { this.message = value; })

      Text(this.sendStatus)
        .fontColor('#666')

      Button('发送短信')
        .width('90%')
        .onClick(() => this.sendSms())
    }
    .width('100%')
    .height('100%')
    .padding(20)
  }
}
```

### SIM卡信息展示

```typescript
import sim from '@ohos.telephony.sim';
import observer from '@ohos.telephony.observer';

@Entry
@Component
struct SimInfoPage {
  @State sim1Info: string = '读取中...';
  @State sim2Info: string = '读取中...';

  aboutToAppear(): void {
    this.loadSimInfo(0);
    this.loadSimInfo(1);
  }

  async loadSimInfo(slotId: number): Promise<void> {
    try {
      if (!sim.hasSimCard(slotId)) {
        if (slotId === 0) this.sim1Info = '未插入SIM卡';
        else this.sim2Info = '未插入SIM卡';
        return;
      }

      let operator = sim.getSimOperatorName(slotId);
      let state = sim.getSimState(slotId);
      let iso = sim.getIsoCountryCodeForSim(slotId);

      let info = `运营商: ${operator}\n状态: ${state}\n国家: ${iso}`;

      if (slotId === 0) this.sim1Info = info;
      else this.sim2Info = info;
    } catch (error) {
      console.error('Load SIM info failed: ' + error.message);
    }
  }

  build() {
    Column({ space: 20 }) {
      Text('SIM卡信息')
        .fontSize(24)
        .fontWeight(FontWeight.Bold)

      Row({ space: 20 }) {
        Column() {
          Text('SIM卡 1')
            .fontWeight(FontWeight.Bold)
          Text(this.sim1Info)
            .fontSize(12)
        }
        .layoutWeight(1)
        .padding(10)
        .border({ width: 1, color: '#ddd', radius: 8 })

        Column() {
          Text('SIM卡 2')
            .fontWeight(FontWeight.Bold)
          Text(this.sim2Info)
            .fontSize(12)
        }
        .layoutWeight(1)
        .padding(10)
        .border({ width: 1, color: '#ddd', radius: 8 })
      }
    }
    .width('100%')
    .padding(20)
  }
}
```

### 通话状态监听

```typescript
import call from '@ohos.telephony.call';

@Entry
@Component
struct CallMonitorPage {
  @State callState: string = '空闲';
  @State callHistory: string[] = [];
  private callStateCallback = (data: call.CallStateChange) => {
    this.updateCallState(data);
  };

  aboutToAppear(): void {
    call.on('callStateChange', this.callStateCallback);
  }

  aboutToDisappear(): void {
    call.off('callStateChange', this.callStateCallback);
  }

  private updateCallState(data: call.CallStateChange): void {
    switch (data.state) {
      case call.CallState.CALL_STATE_IDLE:
        this.callState = '空闲';
        break;
      case call.CallState.CALL_STATE_RINGING:
        this.callState = `来电响铃: ${data.accountId}`;
        this.callHistory.push(`来电: ${new Date().toLocaleString()}`);
        break;
      case call.CallState.CALL_STATE_OFFHOOK:
        this.callState = '通话中';
        break;
      default:
        this.callState = '未知状态';
    }
  }

  build() {
    Column({ space: 20 }) {
      Text('通话状态: ' + this.callState)
        .fontSize(20)

      Text('通话记录')
        .fontSize(16)

      List() {
        ForEach(this.callHistory, (item: string, index: number) => {
          ListItem() {
            Text(item)
          }
        })
      }
      .layoutWeight(1)
      .width('100%')
    }
    .width('100%')
    .padding(20)
  }
}
```

## 权限配置

```json
{
  "module": {
    "requestPermissions": [
      { "name": "ohos.permission.MAKE_CALL" },
      { "name": "ohos.permission.SEND_MESSAGES" },
      { "name": "ohos.permission.RECEIVE_SMS" },
      { "name": "ohos.permission.READ_CONTACTS" },
      { "name": "ohos.permission.GET_NETWORK_INFO" }
    ]
  }
}
```

## CallState 枚举

```typescript
enum CallState {
  CALL_STATE_UNKNOWN = 0,   // 未知
  CALL_STATE_IDLE = 1,      // 空闲
  CALL_STATE_RINGING = 2,   // 来电响铃
  CALL_STATE_OFFHOOK = 3    // 通话中
}
```

## SimState 枚举

```typescript
enum SimState {
  SIM_STATE_UNKNOWN = 0,    // 未知
  SIM_STATE_ABSENT = 1,     // 无SIM卡
  SIM_STATE_PRESENT = 2,    // SIM卡正常
  SIM_STATE_LOCKED = 3      // SIM卡锁定
}
```

## 最佳实践

1. **拨打电话前检查权限**：
```typescript
// 先请求权限
let permission = await requestPermissions(['ohos.permission.MAKE_CALL']);
if (permission) {
  await call.dial(phoneNumber);
}
```

2. **短信发送失败处理**：
```typescript
await sms.sendMessage({
  slotId: 0,
  destinationHost: phoneNumber,
  content: message,
  sendCallback: (err, data) => {
    if (err) {
      // 重试或记录失败
      console.error('Send failed, will retry...');
    }
  }
});
```

3. **双卡槽处理**：
```typescript
// 获取默认SIM卡槽
let defaultSlot = data.getDefaultCellularDataSlotId();
// 或让用户选择
```

## 注意事项

1. 拨打电话和发送短信需要用户授权
2. 部分API需要系统应用权限
3. 双卡设备需要指定slotId
4. 监听器要及时取消注册避免内存泄漏