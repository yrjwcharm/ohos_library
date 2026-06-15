---
name: kits_file
description: "HarmonyOS CoreFileKit 文件能力集使用规范。包含文件读写、文件选择器、文件管理、云同步等文件操作能力。Use when: (1) 读写文件，(2) 选择文件/保存文件，(3) 文件管理，(4) 获取存储信息。Triggers: 文件操作、读写文件、文件选择、picker、fs、fileIo、存储、@ohos.file。"
user-invocable: false
---

# CoreFileKit 文件能力集 (kits_file)

本 skill 覆盖 HarmonyOS **CoreFileKit** 文件能力集的使用规范。

## 能力列表

| 模块 | 导入方式 | 用途 |
|------|----------|------|
| fs | @ohos.file.fs | 文件读写操作 |
| picker | @ohos.file.picker | 文件选择器 |
| fileUri | @ohos.file.fileuri | URI 转换 |
| storageStatistics | @ohos.file.storageStatistics | 存储统计 |
| fileAccess | @ohos.file.fileAccess | 公共文件访问 |
| File (legacy) | @system.file | 简易文件操作 |

## 快速索引

### 文件读写（fs）

```typescript
import fs from '@ohos.file.fs';

// 读取文本文件
let file = fs.openSync('/data/temp/test.txt', fs.OpenMode.READ_ONLY);
let stat = fs.statSync('/data/temp/test.txt');
let buffer = new ArrayBuffer(stat.size);
fs.readSync(file.fd, buffer);
let content = String.fromCharCode(...new Uint8Array(buffer));
fs.closeSync(file);

// 写入文件
let file = fs.openSync('/data/temp/output.txt', fs.OpenMode.CREATE | fs.OpenMode.WRITE_ONLY);
fs.writeSync(file.fd, 'Hello World');
fs.closeSync(file);

// 追加写入
let file = fs.openSync('/data/temp/log.txt', fs.OpenMode.CREATE | fs.OpenMode.WRITE_ONLY | fs.OpenMode.APPEND);
fs.writeSync(file.fd, 'New log line\n');
fs.closeSync(file);

// 检查文件是否存在
let exists = fs.accessSync('/data/temp/test.txt');

// 创建目录
fs.mkdirSync('/data/temp/newdir');

// 删除文件
fs.unlinkSync('/data/temp/test.txt');

// 复制文件
fs.copyFileSync('/data/temp/src.txt', '/data/temp/dst.txt');

// 移动/重命名文件
fs.renameSync('/data/temp/old.txt', '/data/temp/new.txt');

// 列出目录内容
let files = fs.listFileSync('/data/temp/');
for (let file of files) {
  console.log(file);
}
```

### 文件选择器（Picker）

```typescript
import picker from '@ohos.file.picker';
import fs from '@ohos.file.fs';

// 选择图片
let photoSelectOptions = new picker.PhotoSelectOptions();
photoSelectOptions.MIMEType = picker.PhotoViewMIMETypes.IMAGE_TYPE;
photoSelectOptions.maxSelectNumber = 5;

let photoPicker = new picker.PhotoViewPicker();
let photoResult = await photoPicker.select(photoSelectOptions);

// photoResult.photoUris 包含选中的图片 URI
for (let uri of photoResult.photoUris) {
  console.log('Selected: ' + uri);
}

// 选择文档
let documentSelectOptions = new picker.DocumentSelectOptions();
documentSelectOptions.maxSelectNumber = 3;

let documentPicker = new picker.DocumentViewPicker();
let documentResult = await documentPicker.select(documentSelectOptions);

// documentResult.uriList 包含选中的文档 URI

// 保存文件
let documentSaveOptions = new picker.DocumentSaveOptions();
documentSaveOptions.newFileNames = ['output.txt'];

let saveResult = await documentPicker.save(documentSaveOptions);
// saveResult.uriList 包含保存的文件 URI
```

### 获取存储信息

```typescript
import storageStatistics from '@ohos.file.storageStatistics';

// 获取总存储空间
let totalSize = await storageStatistics.getTotalSizeOfVolume('volume_id');
console.log('Total size: ' + totalSize);

// 获取可用空间
let freeSize = await storageStatistics.getFreeSizeOfVolume('volume_id');
console.log('Free size: ' + freeSize);
```

### 应用私有目录

```typescript
import common from '@ohos.app.ability.common';

let context = getContext(this) as common.Context;

// 应用私有文件目录
let filesDir = context.filesDir;         // /data/app/el2/base/haps/entry/files
let cacheDir = context.cacheDir;         // 缓存目录
let tempDir = context.tempDir;           // 临时目录
let preferencesDir = context.preferencesDir;  // Preferences 目录
let distributedFilesDir = context.distributedFilesDir;  // 分布式文件目录
```

## 文件打开模式

```typescript
enum OpenMode {
  READ_ONLY = 0o0,        // 只读
  WRITE_ONLY = 0o1,       // 只写
  READ_WRITE = 0o2,       // 读写
  CREATE = 0o100,         // 创建文件
  TRUNC = 0o1000,         // 清空文件
  APPEND = 0o2000,        // 追加
  NONBLOCK = 0o4000,      // 非阻塞
  DIR = 0o200000,         // 目录
  NOFOLLOW = 0o400000,    // 不跟随符号链接
  SYNC = 0o1000000,       // 同步
}
```

## Picker 详细参数

### PhotoSelectOptions

```typescript
interface PhotoSelectOptions {
  MIMEType?: PhotoViewMIMETypes;   // 文件类型
  maxSelectNumber?: number;         // 最大选择数量
}

enum PhotoViewMIMETypes {
  IMAGE_TYPE = 'image/*',      // 图片
  VIDEO_TYPE = 'video/*',      // 视频
  IMAGE_VIDEO_TYPE = '*'       // 图片和视频
}
```

### DocumentSelectOptions

```typescript
interface DocumentSelectOptions {
  maxSelectNumber?: number;          // 最大选择数量
  fileSuffixFilters?: string[];      // 文件后缀过滤
  defaultFilePathUri?: string;       // 默认路径
}
```

## 使用示例

### 读取 JSON 配置文件

```typescript
import fs from '@ohos.file.fs';
import common from '@ohos.app.ability.common';

async function readConfig(): Promise<Record<string, Object>> {
  let context = getContext(this) as common.Context;
  let configPath = `${context.filesDir}/config.json`;

  // 检查文件是否存在
  if (!fs.accessSync(configPath)) {
    return {};
  }

  // 读取文件
  let file = fs.openSync(configPath, fs.OpenMode.READ_ONLY);
  let stat = fs.statSync(configPath);
  let buffer = new ArrayBuffer(stat.size);
  fs.readSync(file.fd, buffer);
  fs.closeSync(file);

  // 解析 JSON
  let content = String.fromCharCode(...new Uint8Array(buffer));
  return JSON.parse(content) as Record<string, Object>;
}
```

### 保存用户数据

```typescript
import fs from '@ohos.file.fs';
import common from '@ohos.app.ability.common';

async function saveUserData(data: Record<string, Object>): Promise<void> {
  let context = getContext(this) as common.Context;
  let filePath = `${context.filesDir}/user_data.json`;

  let file = fs.openSync(filePath, fs.OpenMode.CREATE | fs.OpenMode.WRITE_ONLY | fs.OpenMode.TRUNC);
  fs.writeSync(file.fd, JSON.stringify(data));
  fs.closeSync(file);
}
```

### 图片选择并显示

```typescript
import picker from '@ohos.file.picker';

@Entry
@Component
struct ImagePickerPage {
  @State imageUri: string = '';

  async selectImage(): Promise<void> {
    let photoSelectOptions = new picker.PhotoSelectOptions();
    photoSelectOptions.MIMEType = picker.PhotoViewMIMETypes.IMAGE_TYPE;
    photoSelectOptions.maxSelectNumber = 1;

    let photoPicker = new picker.PhotoViewPicker();
    let result = await photoPicker.select(photoSelectOptions);

    if (result.photoUris.length > 0) {
      this.imageUri = result.photoUris[0];
    }
  }

  build() {
    Column() {
      if (this.imageUri) {
        Image(this.imageUri)
          .width(200)
          .height(200)
          .objectFit(ImageFit.Cover)
      } else {
        Text('请选择图片')
      }

      Button('选择图片')
        .onClick(() => this.selectImage())
    }
  }
}
```

### 文件下载保存

```typescript
import fs from '@ohos.file.fs';
import http from '@ohos.net.http';
import picker from '@ohos.file.picker';

async function downloadAndSave(url: string): Promise<string> {
  // 下载文件
  let httpRequest = http.createHttp();
  let response = await httpRequest.request(url);
  let imageData = response.result as ArrayBuffer;

  // 选择保存位置
  let documentSaveOptions = new picker.DocumentSaveOptions();
  documentSaveOptions.newFileNames = ['downloaded_file.jpg'];

  let documentPicker = new picker.DocumentViewPicker();
  let saveResult = await documentPicker.save(documentSaveOptions);

  if (saveResult && saveResult.uriList.length > 0) {
    // 写入文件
    let file = fs.openSync(saveResult.uriList[0], fs.OpenMode.WRITE_ONLY);
    fs.writeSync(file.fd, imageData);
    fs.closeSync(file);
    return saveResult.uriList[0];
  }

  httpRequest.destroy();
  return '';
}
```

## 权限配置

在 `module.json5` 中声明权限：

```json
{
  "module": {
    "requestPermissions": [
      {
        "name": "ohos.permission.READ_MEDIA"
      },
      {
        "name": "ohos.permission.WRITE_MEDIA"
      }
    ]
  }
}
```

## 最佳实践

1. **文件操作错误处理**：
```typescript
try {
  let file = fs.openSync(path, fs.OpenMode.READ_ONLY);
  // ... 文件操作
  fs.closeSync(file);
} catch (error) {
  console.error('File operation failed: ' + error.message);
}
```

2. **使用 try-finally 确保关闭文件**：
```typescript
let file: fs.File | null = null;
try {
  file = fs.openSync(path, fs.OpenMode.READ_ONLY);
  // ... 操作
} finally {
  if (file) {
    fs.closeSync(file);
  }
}
```

3. **大文件分块读取**：
```typescript
let chunkSize = 1024 * 1024;  // 1MB
let buffer = new ArrayBuffer(chunkSize);
let offset = 0;

while (true) {
  let readLen = fs.readSync(file.fd, buffer, { offset: 0, length: chunkSize });
  if (readLen === 0) break;

  // 处理数据
  let chunk = new Uint8Array(buffer, 0, readLen);
  // ...

  offset += readLen;
}
```

## 注意事项

1. 应用私有目录不需要权限
2. 访问公共媒体文件需要 READ_MEDIA/WRITE_MEDIA 权限
3. 使用 Picker 选择文件不需要权限
4. 大文件操作建议使用异步 API
5. 记得及时关闭文件句柄