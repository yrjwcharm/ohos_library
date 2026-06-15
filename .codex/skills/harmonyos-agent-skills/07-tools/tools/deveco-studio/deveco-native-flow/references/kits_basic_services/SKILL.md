---
name: kits_basic_services
description: "HarmonyOS BasicServicesKit 基础服务能力集使用规范。包含账号管理、剪贴板、电源管理、打印、下载上传、系统设置、日期时间、USB、壁纸、压缩等。Use when: (1) 剪贴板操作，(2) 下载上传文件，(3) 系统设置，(4) 电源管理。Triggers: 剪贴板、粘贴板、下载、上传、打印、电源、USB、壁纸、压缩、pasteboard、request、print、power、settings、usb、zlib。"
user-invocable: false
---

# BasicServicesKit 基础服务能力集 (kits_basic_services)

本 skill 覆盖 HarmonyOS **BasicServicesKit** 基础服务能力集的使用规范。

## 能力列表

| 模块 | 导入方式 | 用途 |
|------|----------|------|
| pasteboard | @ohos.pasteboard | 剪贴板 |
| request | @ohos.request | 下载上传 |
| print | @ohos.print | 打印服务 |
| power | @ohos.power | 电源管理 |
| batteryInfo | @ohos.batteryInfo | 电池信息 |
| settings | @ohos.settings | 系统设置 |
| systemDateTime | @ohos.systemDateTime | 系统日期时间 |
| usb | @ohos.usb | USB设备 |
| wallpaper | @ohos.wallpaper | 壁纸管理 |
| zlib | @ohos.zlib | 压缩解压 |
| emitter | @ohos.events.emitter | 事件发射器 |
| commonEventManager | @ohos.commonEventManager | 公共事件管理 |

## 快速索引

### 剪贴板

```typescript
import pasteboard from '@ohos.pasteboard';

// 获取剪贴板对象
let pasteboardData = pasteboard.createData(pasteboard.MIMETYPE_TEXT_PLAIN, 'Hello World');

// 复制文本到剪贴板
let systemPasteboard = pasteboard.getSystemPasteboard();
await systemPasteboard.setData(pasteboardData);

// 从剪贴板粘贴
let pasteData = await systemPasteboard.getData();
if (pasteData.hasType(pasteboard.MIMETYPE_TEXT_PLAIN)) {
  let text = pasteData.getPrimaryText();
  console.log('Pasted text: ' + text);
}

// 复制图片
let imagePixelMap = ...; // PixelMap 对象
let imagePasteData = pasteboard.createData(pasteboard.MIMETYPE_PIXELMAP, imagePixelMap);
await systemPasteboard.setData(imagePasteData);

// 监听剪贴板变化
systemPasteboard.on('contentChange', () => {
  console.log('Clipboard content changed');
});
```

### 下载文件

```typescript
import request from '@ohos.request';

// 创建下载任务
let downloadConfig: request.DownloadConfig = {
  url: 'https://example.com/file.zip',
  filePath: '/data/storage/el2/base/files/download/',  // 保存路径
  enableMetered: true,   // 允许计费网络下载
  enableRoaming: true,   // 允许漫游
  description: '下载文件',
  networkType: request.NETWORK_MOBILE | request.NETWORK_WIFI,
  title: '文件下载'
};

let downloadTask = await request.downloadFile(getContext(this), downloadConfig);

// 监听下载进度
downloadTask.on('progress', (receivedSize: number, totalSize: number) => {
  console.log(`Progress: ${receivedSize}/${totalSize} (${Math.floor(receivedSize / totalSize * 100)}%)`);
});

// 监听下载完成
downloadTask.on('complete', () => {
  console.log('Download completed');
});

// 监听下载失败
downloadTask.on('fail', (err: number) => {
  console.error('Download failed: ' + err);
});

// 暂停下载
downloadTask.pause();

// 恢复下载
downloadTask.resume();

// 查询下载状态
let queryInfo = await downloadTask.query();
console.log('Download status: ' + queryInfo.status);
```

### 上传文件

```typescript
import request from '@ohos.request';

// 创建上传任务
let uploadConfig: request.UploadConfig = {
  url: 'https://example.com/upload',
  header: {
    'Content-Type': 'multipart/form-data'
  },
  method: 'POST',
  files: [
    {
      filename: 'test.jpg',
      name: 'file',
      uri: 'internal://cache/test.jpg',
      type: 'image/jpeg'
    }
  ],
  data: [
    { name: 'userId', value: '12345' }
  ]
};

let uploadTask = await request.uploadFile(getContext(this), uploadConfig);

// 监听上传进度
uploadTask.on('progress', (uploadedSize: number, totalSize: number) => {
  console.log(`Upload progress: ${uploadedSize}/${totalSize}`);
});

// 监听上传完成
uploadTask.on('complete', (taskStates: request.TaskState[]) => {
  console.log('Upload completed');
  for (let state of taskStates) {
    console.log(`File: ${state.path}, Response: ${state.responseCode}`);
  }
});

// 取消上传
uploadTask.abort();
```

### 打印服务

```typescript
import print from '@ohos.print';

// 获取打印管理器
let printManager = print.getPrintManager(getContext(this));

// 检查打印服务是否可用
let isAvailable = await printManager.isAvailable();

// 启动打印任务
let printJob: print.PrintJob = {
  documentName: 'My Document',
  printerId: 'selected_printer_id',
  printAttributes: {
    copyNumber: 1,
    pageRange: { startPage: 1, endPage: 5 },
    pageSize: { id: 'A4' },
    colorMode: print.COLOR_MODE_MONOCHROME,
    duplexMode: print.DUPLEX_MODE_NONE
  }
};

let jobId = await printManager.startPrintJob(printJob);

// 监听打印状态
printManager.on('printJobStateChange', (state: print.PrintJobState) => {
  console.log('Print job state: ' + state);
});
```

### 电源管理

```typescript
import power from '@ohos.power';
import runningLock from '@ohos.runningLock';

// 获取电池信息
let batteryLevel = power.getBatteryLevel();
let batteryStatus = power.getBatteryStatus();
let isCharging = power.isCharging();

console.log(`Battery: ${batteryLevel}%, Charging: ${isCharging}`);

// 监听电量变化
power.on('batteryLevelChange', (level: number) => {
  console.log('Battery level: ' + level);
});

// 监听充电状态变化
power.on('chargeChange', (isCharging: boolean) => {
  console.log('Charging: ' + isCharging);
});

// 创建运行锁（防止系统休眠）
let lock = runningLock.createRunningLock('MyLock', runningLock.RunningLockType.BACKGROUND);
let isHolding = runningLock.isHolding(lock);
runningLock.lock(lock, 60000);  // 锁定60秒
runningLock.unlock(lock);       // 解锁

// 休眠设备
power.suspend();     // 进入休眠
power.wakeup('app'); // 唤醒设备

// 关机
power.shutdown('user request');
```

### 电池信息

```typescript
import batteryInfo from '@ohos.batteryInfo';

// 获取电池信息
let level = batteryInfo.batterySOC;           // 电量百分比
let status = batteryInfo.chargingStatus;      // 充电状态
let healthState = batteryInfo.healthState;    // 健康状态
let temperature = batteryInfo.technology;     // 温度
let pluggedType = batteryInfo.pluggedType;    // 充电类型

// 充电状态枚举
enum BatteryChargeState {
  NONE = 0,        // 未充电
  ENABLE = 1,      // 充电中
  DISABLE = 2,     // 禁止充电
  FULL = 3         // 充满
}
```

### 系统设置

```typescript
import settings from '@ohos.settings';

// 获取屏幕亮度
let brightness = settings.getValue(getContext(this), settings.ScreenBrightness.SCREEN_BRIGHTNESS_STATUS);

// 设置屏幕亮度
settings.setValue(getContext(this), settings.ScreenBrightness.SCREEN_BRIGHTNESS_STATUS, '150');

// 获取屏幕超时时间
let timeout = settings.getValue(getContext(this), settings.Display.DISPLAY_SCREEN_TIMEOUT);

// 设置屏幕超时
settings.setValue(getContext(this), settings.Display.DISPLAY_SCREEN_TIMEOUT, '30000');

// 常量
// Display: DISPLAY_SCREEN_TIMEOUT, DISPLAY_AUTO_BRIGHTNESS
// ScreenBrightness: SCREEN_BRIGHTNESS_STATUS
// Sound: SOUND_VIBRATE_STATUS, SOUND_RINGER_MODE
```

### 系统日期时间

```typescript
import systemDateTime from '@ohos.systemDateTime';

// 获取当前时间（毫秒）
let time = await systemDateTime.getTime();
let date = new Date(time);
console.log('Current time: ' + date.toString());

// 获取时区
let timezone = await systemDateTime.getTimeZone();
console.log('Timezone: ' + timezone);

// 设置时间（需要系统权限）
await systemDateTime.setTime(timeInMillis);

// 设置时区
await systemDateTime.setTimeZone('Asia/Shanghai');
```

### USB 设备

```typescript
import usb from '@ohos.usb';
import usbManager from '@ohos.usbManager';

// 获取USB设备列表
let devices = usbManager.getDevices();
for (let device of devices) {
  console.log(`USB Device: ${device.name}, Vendor: ${device.vendorId}, Product: ${device.productId}`);
}

// 打开USB设备
let device = devices[0];
let devicePipe = usbManager.connectDevice(device);

// 申请USB权限
await usbManager.requestRight(device.name);

// USB读写
let buffer = new ArrayBuffer(1024);
let bytesRead = await usbManager.transferRead(devicePipe, device.configs[0].interfaces[0].endpoints[0], buffer);
```

### 壁纸管理

```typescript
import wallpaper from '@ohos.wallpaper';

// 获取壁纸管理器
let wallpaperManager = wallpaper.getSystemWallpaperManager();

// 获取当前壁纸
let currentWallpaper = await wallpaperManager.getWallpaper(wallpaper.WallpaperType.WALLPAPER_SYSTEM);

// 设置壁纸
let imageSource = ...; // ImageSource
await wallpaperManager.setWallpaper(imageSource, wallpaper.WallpaperType.WALLPAPER_SYSTEM);

// 获取壁纸信息
let info = await wallpaperManager.getWallpaperInfo(wallpaper.WallpaperType.WALLPAPER_SYSTEM);

// 监听壁纸变化
wallpaperManager.on('colorChange', (wallpaperType: wallpaper.WallpaperType, color: wallpaper.RgbColor) => {
  console.log(`Wallpaper color changed for type ${wallpaperType}`);
});
```

### 压缩解压

```typescript
import zlib from '@ohos.zlib';

// 压缩文件
let compressedFile = await zlib.compressFile(
  '/data/storage/el2/base/files/source.txt',
  '/data/storage/el2/base/files/compressed.zip',
  { level: zlib.CompressLevel.COMPRESS_LEVEL_DEFAULT_COMPRESSION }
);

// 解压文件
let result = await zlib.decompressFile(
  '/data/storage/el2/base/files/compressed.zip',
  '/data/storage/el2/base/files/output/',
  { level: zlib.CompressLevel.COMPRESS_LEVEL_DEFAULT_COMPRESSION }
);

// 压缩级别
enum CompressLevel {
  COMPRESS_LEVEL_NO_COMPRESSION = 0,
  COMPRESS_LEVEL_BEST_SPEED = 1,
  COMPRESS_LEVEL_DEFAULT_COMPRESSION = 6,
  COMPRESS_LEVEL_BEST_COMPRESSION = 9
}
```

### 事件发射器

```typescript
import emitter from '@ohos.events.emitter';

// 定义事件
interface CustomEvent {
  eventId: number;
  data?: { [key: string]: any };
}

const EVENT_ID = 1001;

// 注册事件监听
emitter.on({ eventId: EVENT_ID }, (eventData: emitter.EventData) => {
  console.log('Event received: ' + JSON.stringify(eventData.data));
});

// 发送事件
let eventData: emitter.EventData = {
  eventId: EVENT_ID,
  data: { message: 'Hello from emitter' }
};
emitter.emit(eventData);

// 取消监听
emitter.off(EVENT_ID);
```

## 使用示例

### 下载并显示图片

```typescript
import request from '@ohos.request';
import image from '@ohos.multimedia.image';

@Entry
@Component
struct DownloadPage {
  @State progress: number = 0;
  @State imageUri: string = '';

  async downloadImage(): Promise<void> {
    let config: request.DownloadConfig = {
      url: 'https://example.com/image.jpg',
      filePath: getContext(this).cacheDir + '/image.jpg'
    };

    let downloadTask = await request.downloadFile(getContext(this), config);

    downloadTask.on('progress', (received, total) => {
      this.progress = Math.floor(received / total * 100);
    });

    downloadTask.on('complete', () => {
      this.imageUri = 'file://' + config.filePath;
    });
  }

  build() {
    Column({ space: 20 }) {
      if (this.imageUri) {
        Image(this.imageUri)
          .width(200)
          .height(200)
      }

      Progress({ value: this.progress, total: 100 })
        .width('80%')

      Button('下载图片')
        .onClick(() => this.downloadImage())
    }
  }
}
```

### 剪贴板分享

```typescript
import pasteboard from '@ohos.pasteboard';

async function shareText(text: string): Promise<void> {
  let systemPasteboard = pasteboard.getSystemPasteboard();
  let pasteData = pasteboard.createData(pasteboard.MIMETYPE_TEXT_PLAIN, text);
  await systemPasteboard.setData(pasteData);
  console.log('Text copied to clipboard');
}

async function getSharedText(): Promise<string | null> {
  let systemPasteboard = pasteboard.getSystemPasteboard();
  let pasteData = await systemPasteboard.getData();

  if (pasteData.hasType(pasteboard.MIMETYPE_TEXT_PLAIN)) {
    return pasteData.getPrimaryText();
  }
  return null;
}
```

## 权限配置

```json
{
  "module": {
    "requestPermissions": [
      { "name": "ohos.permission.INTERNET" },
      { "name": "ohos.permission.GET_NETWORK_INFO" },
      { "name": "ohos.permission.READ_WRITE_DOWNLOAD_DIRECTORY" },
      { "name": "ohos.permission.CHANGE_WIFI_STATE" },
      { "name": "ohos.permission.SET_WALLPAPER" },
      { "ohos.name": "ohos.permission.MANAGE_USB_CONFIG" }
    ]
  }
}
```

## 最佳实践

1. **下载任务管理**：
```typescript
// 保存下载任务引用，页面销毁时取消
aboutToDisappear(): void {
  downloadTask?.abort();
}
```

2. **剪贴板隐私**：
```typescript
// 访问剪贴板前检查是否有数据
let pasteData = await systemPasteboard.getData();
if (pasteData.getRecordCount() === 0) {
  console.log('Clipboard is empty');
  return;
}
```

3. **电源管理**：
```typescript
// 长时间运行锁要及时释放
try {
  runningLock.lock(lock, timeout);
  // 执行任务
} finally {
  runningLock.unlock(lock);
}
```

## 注意事项

1. 下载文件需要INTERNET权限
2. 剪贴板读写不需要权限但涉及隐私
3. 系统设置修改需要系统级权限
4. 压缩解压操作要注意文件路径正确