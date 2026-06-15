---
name: kits_ipc
description: "HarmonyOS IPCKit 进程间通信能力集使用规范。包含 RPC 远程过程调用、IPC 进程间通信、序列化反序列化等核心能力。Use when: (1) 跨进程通信，(2) IPC 数据传递，(3) 远程服务调用，(4) 进程间数据序列化。Triggers: IPC、RPC、跨进程、rpc、MessageSequence、RemoteObject、进程通信、Parcelable。"
user-invocable: false
---

# IPCKit 进程间通信能力集 (kits_ipc)

本 skill 覆盖 HarmonyOS **IPCKit** 进程间通信能力集的使用规范。

## 能力列表

| 模块 | 导入方式 | 用途 |
|------|----------|------|
| rpc | @ohos.rpc | RPC 远程过程调用 |

rpc 模块包含以下核心接口：

| 接口 | 用途 |
|------|------|
| MessageSequence | 消息序列化/反序列化 |
| MessageOption | 消息选项（同步/异步） |
| RemoteObject | 远程对象基类 |
| IRemoteBroker | 远程代理获取器 |
| IRemoteObject | 远程对象接口 |

## 快速索引

### 服务端 - 创建 RemoteObject

```typescript
import rpc from '@ohos.rpc';

// 定义接口常量
const REQUEST_CODE = 1;

// 创建远程对象
class MyRemoteObject extends rpc.RemoteObject {
  constructor(name: string) {
    super(name);
  }

  // 处理远程请求
  onRemoteRequest(code: number, data: rpc.MessageSequence, reply: rpc.MessageSequence, option: rpc.MessageOption): boolean {
    console.log('onRemoteRequest code: ' + code);

    if (code === REQUEST_CODE) {
      // 读取请求数据
      let message = data.readString();
      console.log('Received: ' + message);

      // 写入响应数据
      reply.writeString('Response: ' + message);
      return true;
    }

    return false;
  }
}

export default MyRemoteObject;
```

### 服务端 - 绑定服务

```typescript
import ServiceExtensionAbility from '@ohos.app.ability.ServiceExtensionAbility';
import rpc from '@ohos.rpc';

export default class MyService extends ServiceExtensionAbility {
  onCreate(): void {
    console.log('Service onCreate');
  }

  // 绑定服务时返回 RemoteObject
  onConnect(want: Want): rpc.RemoteObject {
    console.log('Service onConnect');
    return new MyRemoteObject('MyService');
  }

  onDisconnect(want: Want): void {
    console.log('Service onDisconnect');
  }

  onDestroy(): void {
    console.log('Service onDestroy');
  }
}
```

### 客户端 - 连接服务

```typescript
import common from '@ohos.app.ability.common';
import Want from '@ohos.app.ability.Want';
import rpc from '@ohos.rpc';

let remoteObject: rpc.RemoteObject | null = null;

// 连接服务
async function connectService(context: common.UIAbilityContext): Promise<void> {
  let want: Want = {
    bundleName: 'com.example.myservice',
    abilityName: 'MyService'
  };

  let connection = {
    onConnect: (elementName: string, remote: rpc.RemoteObject): void => {
      console.log('Connected to service');
      remoteObject = remote;
    },
    onDisconnect: (elementName: string): void => {
      console.log('Disconnected from service');
      remoteObject = null;
    },
    onFailed: (elementName: string): void => {
      console.error('Failed to connect to service');
    }
  };

  context.connectServiceExtensionAbility(want, connection);
}
```

### 客户端 - 发送请求

```typescript
const REQUEST_CODE = 1;

// 发送同步请求
async function sendSyncRequest(message: string): Promise<string> {
  if (!remoteObject) {
    throw new Error('Not connected');
  }

  // 创建请求数据
  let data = rpc.MessageSequence.create();
  data.writeString(message);

  // 创建响应数据容器
  let reply = rpc.MessageSequence.create();

  // 同步调用选项
  let option = new rpc.MessageOption(rpc.MessageOption.TF_SYNC);

  // 发送请求
  await remoteObject.sendMessageRequest(REQUEST_CODE, data, reply, option);

  // 读取响应
  let response = reply.readString();
  return response;
}

// 发送异步请求
async function sendAsyncRequest(message: string): Promise<string> {
  if (!remoteObject) {
    throw new Error('Not connected');
  }

  let data = rpc.MessageSequence.create();
  data.writeString(message);

  let reply = rpc.MessageSequence.create();

  // 异步调用选项
  let option = new rpc.MessageOption(rpc.MessageOption.TF_ASYNC);

  // 发送请求
  let result = await remoteObject.sendMessageRequest(REQUEST_CODE, data, reply, option);

  // 读取响应
  let response = reply.readString();
  return response;
}
```

### MessageSequence 序列化

```typescript
import rpc from '@ohos.rpc';

// 写入数据
let data = rpc.MessageSequence.create();

// 基础类型
data.writeInt(100);
data.writeLong(9999999999n);
data.writeFloat(3.14);
data.writeDouble(3.14159265359);
data.writeString('Hello');
data.writeBoolean(true);

// 数组
data.writeIntArray([1, 2, 3, 4, 5]);
data.writeStringArray(['a', 'b', 'c']);

// 读取数据
let value = data.readInt();
let bigValue = data.readLong();
let floatValue = data.readFloat();
let doubleValue = data.readDouble();
let strValue = data.readString();
let boolValue = data.readBoolean();

let intArray = data.readIntArray();
let stringArray = data.readStringArray();
```

### 传递复杂对象

```typescript
import rpc from '@ohos.rpc';

// 定义 Parcelable 对象
interface UserInfo {
  id: number;
  name: string;
  email: string;
}

// 序列化对象
function writeUserInfo(data: rpc.MessageSequence, user: UserInfo): void {
  data.writeInt(user.id);
  data.writeString(user.name);
  data.writeString(user.email);
}

// 反序列化对象
function readUserInfo(data: rpc.MessageSequence): UserInfo {
  return {
    id: data.readInt(),
    name: data.readString(),
    email: data.readString()
  };
}

// 使用
let data = rpc.MessageSequence.create();
let user: UserInfo = { id: 1, name: '张三', email: 'zhangsan@example.com' };
writeUserInfo(data, user);

// 读取
let receivedUser = readUserInfo(data);
console.log('User: ' + JSON.stringify(receivedUser));
```

### MessageOption 选项

```typescript
import rpc from '@ohos.rpc';

// 同步调用
let syncOption = new rpc.MessageOption(rpc.MessageOption.TF_SYNC);

// 异步调用
let asyncOption = new rpc.MessageOption(rpc.MessageOption.TF_ASYNC);

// 带超时的异步调用
let timeoutOption = new rpc.MessageOption(
  rpc.MessageOption.TF_ASYNC,
  5000 // 5秒超时
);
// 以上为演示，实际 MessageOption 构造参数为 (flags, waitTime)
```

### 服务配置

```json5
// module.json5 配置 ServiceExtensionAbility
{
  "module": {
    "extensionAbilities": [
      {
        "name": "MyService",
        "srcEntry": "./ets/service/MyService.ets",
        "type": "service",
        "exported": true
      }
    ]
  }
}
```

### 跨应用调用

```typescript
import Want from '@ohos.app.ability.Want';

// 跨应用连接服务
let want: Want = {
  deviceId: '',  // 空表示本设备
  bundleName: 'com.example.targetapp',
  abilityName: 'TargetService',
  action: 'com.example.targetapp.SERVICE_ACTION'
};

context.connectServiceExtensionAbility(want, connection);
```

### 断开连接

```typescript
// 断开服务连接
function disconnectService(context: common.UIAbilityContext, connection: number): void {
  context.disconnectServiceExtensionAbility(connection).then(() => {
    console.log('Disconnected successfully');
    remoteObject = null;
  }).catch((err: Error) => {
    console.error('Disconnect failed: ' + err.message);
  });
}
```

## 完整示例

### 服务端完整代码

```typescript
import ServiceExtensionAbility from '@ohos.app.ability.ServiceExtensionAbility';
import Want from '@ohos.app.ability.Want';
import rpc from '@ohos.rpc';

const CODE_ADD = 1;
const CODE_SUB = 2;

class CalculatorRemoteObject extends rpc.RemoteObject {
  constructor() {
    super('CalculatorService');
  }

  onRemoteRequest(code: number, data: rpc.MessageSequence, reply: rpc.MessageSequence, option: rpc.MessageOption): boolean {
    let a = data.readInt();
    let b = data.readInt();
    let result: number;

    switch (code) {
      case CODE_ADD:
        result = a + b;
        reply.writeInt(result);
        return true;

      case CODE_SUB:
        result = a - b;
        reply.writeInt(result);
        return true;

      default:
        return false;
    }
  }
}

export default class CalculatorService extends ServiceExtensionAbility {
  onCreate(): void {
    console.log('CalculatorService onCreate');
  }

  onConnect(want: Want): rpc.RemoteObject {
    console.log('CalculatorService onConnect');
    return new CalculatorRemoteObject();
  }

  onDisconnect(want: Want): void {
    console.log('CalculatorService onDisconnect');
  }

  onDestroy(): void {
    console.log('CalculatorService onDestroy');
  }
}
```

### 客户端完整代码

```typescript
import common from '@ohos.app.ability.common';
import Want from '@ohos.app.ability.Want';
import rpc from '@ohos.rpc';

const CODE_ADD = 1;
const CODE_SUB = 2;

class CalculatorProxy {
  private remote: rpc.RemoteObject;

  constructor(remote: rpc.RemoteObject) {
    this.remote = remote;
  }

  async add(a: number, b: number): Promise<number> {
    let data = rpc.MessageSequence.create();
    data.writeInt(a);
    data.writeInt(b);

    let reply = rpc.MessageSequence.create();
    let option = new rpc.MessageOption();

    await this.remote.sendMessageRequest(CODE_ADD, data, reply, option);
    return reply.readInt();
  }

  async sub(a: number, b: number): Promise<number> {
    let data = rpc.MessageSequence.create();
    data.writeInt(a);
    data.writeInt(b);

    let reply = rpc.MessageSequence.create();
    let option = new rpc.MessageOption();

    await this.remote.sendMessageRequest(CODE_SUB, data, reply, option);
    return reply.readInt();
  }
}

@Entry
@Component
struct CalculatorPage {
  @State result: number = 0;
  private proxy: CalculatorProxy | null = null;

  build() {
    Column({ space: 20 }) {
      Text('Result: ' + this.result)
        .fontSize(24)

      Button('Add 5 + 3')
        .onClick(async () => {
          if (this.proxy) {
            this.result = await this.proxy.add(5, 3);
          }
        })

      Button('Sub 10 - 4')
        .onClick(async () => {
          if (this.proxy) {
            this.result = await this.proxy.sub(10, 4);
          }
        })
    }
  }
}
```

## 最佳实践

### 1. 错误处理

```typescript
import rpc from '@ohos.rpc';

async function safeRequest(remote: rpc.RemoteObject, code: number, data: rpc.MessageSequence): Promise<rpc.MessageSequence> {
  try {
    let reply = rpc.MessageSequence.create();
    let result = await remote.sendMessageRequest(code, data, reply, new rpc.MessageOption());

    if (result.errCode !== 0) {
      throw new Error('IPC request failed: ' + result.errCode);
    }

    return reply;
  } catch (error) {
    console.error('IPC error: ' + JSON.stringify(error));
    throw error;
  }
}
```

### 2. 连接管理

```typescript
// 使用单例管理连接
class ServiceManager {
  private static instance: ServiceManager;
  private remote: rpc.RemoteObject | null = null;
  private connectionId: number = -1;

  static getInstance(): ServiceManager {
    if (!ServiceManager.instance) {
      ServiceManager.instance = new ServiceManager();
    }
    return ServiceManager.instance;
  }

  isConnected(): boolean {
    return this.remote !== null;
  }
}
```

## 注意事项

1. **线程安全**：MessageSequence 不是线程安全的，不要跨线程共享

2. **数据大小**：IPC 数据有大小限制，避免传递大对象

3. **连接管理**：及时断开不需要的连接，避免资源泄漏

4. **权限**：跨应用调用需要配置相应权限