# 文件

## has.openDocument

has.openDocument(Object object)

在新页面中打开文档。

**起始版本：** 1.0.8

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| filePath | string | 是 | 文件路径（本地路径），可通过[has.downloadFile](apis-download.md#hasdownloadfile)获取。 |
| fileType | string | 否 | 文件类型，指定文件类型打开文件。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**fileType的合法值：**

| 值 | 描述 |
| -------- | -------- |
| pdf | pdf格式。 |
| doc | doc格式。 |
| docx | docx格式。 |
| xls | xls格式。 |
| xlsx | xlsx格式。 |
| ppt | ppt格式。 |
| pptx | pptx格式。 |

**示例：**

```js
has.downloadFile({
  url: 'https://www.example.com/xxx.pdf', // 此处仅为样例，请开发者更换为可用接口地址
  success: (res) => {
    const filePath = res.tempFilePath;
    has.openDocument({
      filePath: filePath,
      success: (res) => {
        console.info('openDocument success', res);
      },
      fail: (err) => {
        console.error('openDocument fail', err);
      },
      complete: (res) => {
        console.info('openDocument complete', res);
      }
    });
  }
});
```

## has.getFileSystemManager

has.getFileSystemManager(): FileSystemManager

返回一个全局唯一的文件管理器。

**起始版本：** 1.0.4

**返回值：**

返回[FileSystemManager](#filesystemmanager)对象。

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
```

## FlagMode

[FileSystemManager.open](#filesystemmanageropen)和[FileSystemManager.openSync](#filesystemmanageropensync)方法flag参数的合法值。

**起始版本：** 1.0.16

| 值 | 描述 |
| -------- | -------- |
| a | 打开文件用于追加。如果文件不存在，则创建该文件。 |
| ax | 类似于 'a'，但如果路径存在，则失败。 |
| a+ | 打开文件用于读取和追加。如果文件不存在，则创建该文件。 |
| ax+ | 类似于 'a+'，但如果路径存在，则失败。 |
| as | 打开文件用于追加（在同步模式中）。如果文件不存在，则创建该文件。 |
| as+ | 打开文件用于读取和追加（在同步模式中）。如果文件不存在，则创建该文件。 |
| r | 打开文件用于读取。如果文件不存在，则会发生异常。 |
| r+ | 打开文件用于读取和写入。如果文件不存在，则会发生异常。 |
| w | 打开文件用于写入。如果文件不存在则创建文件，如果文件存在则截断文件。 |
| wx | 类似于 'w'，但如果路径存在，则失败。 |
| w+ | 打开文件用于读取和写入。如果文件不存在则创建文件，如果文件存在则截断文件 |
| wx+ | 类似于 'w+'，但如果路径存在，则失败。 |

## FileStats

每个FileStats对象包含path和Stats。

**起始版本：** 1.0.4

| 属性 | 类型 | 描述 |
| -------- | -------- | -------- |
| path | string | 文件/目录路径 |
| stats | [Stats](#stats) | Stats对象，即描述文件状态的对象 |

## FileSystemManager

文件管理器，可通过 [has.getFileSystemManager](#hasgetfilesystemmanager) 获取。

**起始版本：** 1.0.4

### FileSystemManager.open

FileSystemManager.open(Object object): void

打开文件，返回文件描述符。

**起始版本：** 1.0.16

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| filePath | string | - | 是 | 文件路径 (本地路径)，仅支持"internal://"协议类型。 |
| flag | string |  r | 否 | 文件系统标志，合法值见[FlagMode](#flagmode)。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success 回调函数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| fd | string | 文件描述符。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
fileSystemManager.open({
  filePath: 'internal://cache/test.txt',
  success: (res) => {
    console.info('open success', res);
  },
  fail: (err) => {
    console.error('open fail', err);
  },
  complete: (res) => {
    console.info('open complete', res);
  }
});
```

### FileSystemManager.openSync

FileSystemManager.openSync(Object object): string

同步打开文件，返回文件描述符。

**起始版本：** 1.0.16

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| filePath | string | - | 是 | 文件路径 (本地路径)，仅支持"internal://"协议类型。 |
| flag | string |  r | 否 | 文件系统标志，合法值见[FlagMode](#flagmode)。 |

**返回值**：

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| fd | string | 文件描述符。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
const fd = fileSystemManager.openSync({
  filePath: 'internal://cache/test.txt'
});
```

### FileSystemManager.close

FileSystemManager.close(Object object): void

关闭文件。

**起始版本：** 1.0.16

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| fd | string | 是 | 需要被关闭的文件描述符。fd通过[FileSystemManager.open](#filesystemmanageropen)或[FileSystemManager.openSync](#filesystemmanageropensync)接口获得。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
const fd = fileSystemManager.openSync({
  filePath: 'internal://cache/test.txt'
});
fileSystemManager.close({
  fd: fd,
  success: () => {
    console.info('close success');
  },
  fail: (err) => {
    console.error('close fail', err);
  },
  complete: (res) => {
    console.info('close complete', res);
  }
});
```

### FileSystemManager.closeSync

FileSystemManager.closeSync(Object object): void

同步关闭文件。

**起始版本：** 1.0.16

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| fd | string | 是 | 需要被关闭的文件描述符。fd通过[FileSystemManager.open](#filesystemmanageropen)或[FileSystemManager.openSync](#filesystemmanageropensync)接口获得。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
const fd = fileSystemManager.openSync({
  filePath: 'internal://cache/test.txt'
});
fileSystemManager.closeSync({
  fd: fd
});
```

### FileSystemManager.read

FileSystemManager.read(Object object): void

读文件。

**起始版本：** 1.0.16

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| fd | string | - | 是 | 文件描述符。fd通过[FileSystemManager.open](#filesystemmanageropen)或[FileSystemManager.openSync](#filesystemmanageropensync)接口获得。 |
| arrayBuffer | ArrayBuffer | - | 是 | 数据写入的缓冲区，必须是ArrayBuffer实例。 |
| offset | number | 0 | 否 | 缓冲区中的写入偏移量，默认0。 |
| length | number | 0 | 否 | 要从文件中读取的字节数，默认0。 |
| position | number | - | 否 | 文件读取的起始位置，如不传或传null，则会从当前文件指针的位置读取。如果position是大于等于0整数，则文件指针位置会保持不变并从position读取文件。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success 回调函数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| bytesRead | number | 实际读取的字节数。 |
| arrayBuffer | ArrayBuffer | 被写入的缓存区的对象，即接口入参的arrayBuffer。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
const fd = fileSystemManager.openSync({
  filePath: 'internal://cache/test.txt'
});
fileSystemManager.read({
  fd: fd,
  arrayBuffer: new ArrayBuffer(10),
  length: 10,
  success: (res) => {
    console.info('read success', res.bytesRead);
  },
  fail: (err) => {
    console.error('read fail', err);
  },
  complete: (res) => {
    console.info('read complete', res);
  }
});
```

### FileSystemManager.readSync

FileSystemManager.readSync(Object object): ReadResult

同步读文件。

**起始版本：** 1.0.16

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| fd | string | - | 是 | 文件描述符。fd通过[FileSystemManager.open](#filesystemmanageropen)或[FileSystemManager.openSync](#filesystemmanageropensync)接口获得。 |
| arrayBuffer | ArrayBuffer | - | 是 | 数据写入的缓冲区，必须是arrayBuffer类型实例。 |
| offset | number | 0 | 否 | 缓冲区中的写入偏移量（单位：字节）。<br/>推荐取值范围：[0, arrayBuffer的字节长度]。如取值小于0，则取0，如取值大于arrayBuffer的长度，则取arrayBuffer的长度。 |
| length | number | 0 | 否 | 要从文件中读取的字节数（单位：字节）。 |
| position | number | - | 否 | 文件读取的起始位置，如不传或传null，则会从当前文件指针的位置读取。如果position是大于等于0整数，则文件指针位置会保持不变并从position读取文件。 |

**返回值：**

ReadResult，文件读取结果，为Object对象，包括以下字段。

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| bytesRead | number | 实际读取的字节数。 |
| arrayBuffer | ArrayBuffer | 被写入的缓存区的对象，即接口入参的arrayBuffer。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
const fd = fileSystemManager.openSync({
  filePath: 'internal://cache/test.txt'
});
const readResult = fileSystemManager.readSync({
  fd: fd,
  arrayBuffer: new ArrayBuffer(10),
  length: 10
});
console.info('bytesRead', readResult.bytesRead);
console.info('arrayBuffer', readResult.arrayBuffer);
```

### FileSystemManager.fstat

FileSystemManager.fstat(Object object): void

获取文件的状态信息。

**起始版本：** 1.0.16

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| fd | string | 是 | 文件描述符。fd通过[FileSystemManager.open](#filesystemmanageropen)或[FileSystemManager.openSync](#filesystemmanageropensync)接口获得。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success 回调函数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| stats | [Stats](#stats) | Stats 对象，包含了文件的状态信息。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
const fd = fileSystemManager.openSync({
  filePath: 'internal://cache/test.txt'
});
fileSystemManager.fstat({
  fd: fd,
  success: (res) => {
    console.info('fstat success', res);
    console.info('fstat success', res.stats.isFile());
  },
  fail: (err) => {
    console.error('fstat fail', err);
  },
  complete: (res) => {
    console.info('fstat complete', res);
  }
});
```

### FileSystemManager.fstatSync

FileSystemManager.fstatSync(Object object): Stats

同步获取文件的状态信息。

**起始版本：** 1.0.16

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| fd | string | 是 | 文件描述符。fd通过[FileSystemManager.open](#filesystemmanageropen)或[FileSystemManager.openSync](#filesystemmanageropensync)接口获得。 |

**返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| stats | [Stats](#stats) | 文件的状态信息对象。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
try {
  const fd = fileSystemManager.openSync({
    filePath: 'internal://cache/test.txt'
  });
  const stats = fileSystemManager.fstatSync({
    fd: fd
  });
  console.info('fstatSync result', stats);
  console.info('fstatSync result', stats.isFile());
} catch (err) {
  console.error('fstatSync error', err);
}
```

### FileSystemManager.ftruncate

FileSystemManager.ftruncate(Object object): void

对文件内容进行截断操作。

**起始版本：** 1.0.16

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| fd | string | 是 | 文件描述符。fd通过[FileSystemManager.open](#filesystemmanageropen)或[FileSystemManager.openSync](#filesystemmanageropensync)接口获得。 |
| length | number | 是 | 截断位置。如果length小于文件长度（单位：字节），则只有前面length个字节会保留在文件中，其余内容会被删除；如果length大于文件长度，则会对其进行扩展，并且扩展部分将填充空字节（'\0'）。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
const fd = fileSystemManager.openSync({
  filePath: 'internal://cache/test.txt', // 文件需要写入权限
  flag: 'r+'
});
fileSystemManager.ftruncate({
  fd: fd,
  length: 0,
  success: () => {
    console.info('ftruncate success');
  },
  fail: (err) => {
    console.error('ftruncate fail', err);
  },
  complete: (res) => {
    console.info('ftruncate complete', res);
  }
});
```

### FileSystemManager.ftruncateSync

FileSystemManager.ftruncateSync(Object object): void

同步对文件内容进行截断操作。

**起始版本：** 1.0.16

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| fd | string | 是 | 文件描述符。fd通过[FileSystemManager.open](#filesystemmanageropen)或[FileSystemManager.openSync](#filesystemmanageropensync)接口获得。 |
| length | number | 是 | 截断位置。如果length小于文件长度（单位：字节），则只有前面length个字节会保留在文件中，其余内容会被删除；如果length大于文件长度，则会对其进行扩展，并且扩展部分将填充空字节（'\0'）。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
const fd = fileSystemManager.openSync({
  filePath: 'internal://cache/test.txt', // 文件需要写入权限
  flag: 'r+'
});
fileSystemManager.ftruncateSync({
  fd: fd,
  length: 0
});
```

### FileSystemManager.truncate

FileSystemManager.truncate(Object object): void

对文件内容进行截断操作。

**起始版本：** 1.0.16

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| filePath | string | - | 是 | 要截断的文件路径 (本地路径)，仅支持"internal://"协议类型。 |
| length | number | 0 | 否 | 截断位置。如果length小于文件长度（单位：字节），则只有前面length个字节会保留在文件中，其余内容会被删除；如果length大于文件长度，则会对其进行扩展，并且扩展部分将填充空字节（'\0'）。<br/>推荐取值范围：[0,文件长度]。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
fileSystemManager.truncate({
  filePath: 'internal://cache/test.txt',
  length: 0,
  success: () => {
    console.info('truncate success');
  },
  fail: (err) => {
    console.error('truncate fail', err);
  },
  complete: (res) => {
    console.info('truncate complete', res);
  }
});
```

### FileSystemManager.truncateSync

FileSystemManager.truncateSync(Object object): void

同步对文件内容进行截断操作。

**起始版本：** 1.0.16

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| filePath | string | - | 是 | 要截断的文件路径 (本地路径)。 |
| length | number | 0 | 否 | 截断位置。如果length小于文件长度（单位：字节），则只有前面length个字节会保留在文件中，其余内容会被删除；如果length大于文件长度，则会对其进行扩展，并且扩展部分将填充空字节（'\0'）。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
fileSystemManager.truncateSync({
  filePath: 'internal://cache/test.txt',
  length: 0
});
```

### FileSystemManager.write

FileSystemManager.write(Object object): void

写入文件。

**起始版本：** 1.0.16

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| fd | string | - | 是 | 文件描述符。fd通过[FileSystemManager.open](#filesystemmanageropen)或[FileSystemManager.openSync](#filesystemmanageropensync)接口获得。 |
| data | string \| arrayBuffer | - | 是 | 写入的内容，类型为string或arrayBuffer。 |
| offset | number | 0 | 否 | 只在data类型是arrayBuffer时有效，决定arrayBuffer中要被写入的部位，即arrayBuffer中的索引。 |
| length | number | 0 | 否 | 只在data类型是arrayBuffer时有效，指定要写入的字节数，默认为arrayBuffer从0开始偏移offset个字节后剩余的字节数。 |
| encoding | string | utf-8 | 否 | 只在data类型是string 时有效，指定写入文件的字符编码。当前仅支持utf-8。 |
| position | number | - | 否 | 指定文件开头的偏移量，即数据要被写入的位置。当position不传或者传入null时，数据会被写入当前指针所在位置。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success 回调函数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| bytesWritten | number | 实际被写入到文件中的字节数（注意，被写入的字节数不一定与被写入的字符串字符数相同）。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
const fd = fileSystemManager.openSync({
  filePath: 'internal://cache/test.txt',
  flag: 'r+'
});
fileSystemManager.write({
  fd: fd,
  data: 'some text',
  success: (res) => {
    console.info('write success', res.bytesWritten);
  },
  fail: (err) => {
    console.error('write fail', err);
  },
  complete: (res) => {
    console.info('write complete', res);
  }
});
```

### FileSystemManager.writeSync

FileSystemManager.writeSync(Object object): WriteResult

同步写入文件。

**起始版本：** 1.0.16

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| fd | string | - | 是 | 文件描述符。fd通过[FileSystemManager.open](#filesystemmanageropen)或[FileSystemManager.openSync](#filesystemmanageropensync)接口获得。 |
| data | string \| arrayBuffer | - | 是 | 写入的内容，类型为string或arrayBuffer。 |
| offset | number | 0 | 否 | 只在data类型是arrayBuffer时有效，决定arrayBuffer中要被写入的部位，即arrayBuffer中的索引。 |
| length | number | 0 | 否 | 只在data类型是arrayBuffer时有效，指定要写入的字节数，默认为arrayBuffer从0开始偏移offset个字节后剩余的字节数。 |
| encoding | string | utf-8 | 否 | 只在data类型是string时有效，指定写入文件的字符编码。当前仅支持utf-8。 |
| position | number | - | 否 | 指定文件开头的偏移量，即数据要被写入的位置。当position不传或者传入null时，数据会被写入当前指针所在位置。 |

**返回值：**

返回文件写入结果WriteResult，类型为Object对象。

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| bytesWritten | number | 实际被写入到文件中的字节数（注意，被写入的字节数不一定与被写入的字符串字符数相同）。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
const fd = fileSystemManager.openSync({
  filePath: 'internal://cache/test.txt',
  flag: 'r+'
})
const writeResult = fileSystemManager.writeSync({
  fd: fd,
  data: 'some text'
});
console.info('writeSync.bytesWritten ', writeResult.bytesWritten);
```

### FileSystemManager.access

FileSystemManager.access(Object object)

异步判断一个文件/目录是否存在。

**起始版本：** 1.0.4

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| path | string | 是 | 要判断是否存在的文件/目录路径，支持"internal://"协议类型，支持资源文件绝对路径。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**fail返回值：**

若不存在则返回：

```js
{errMsg: 'access:fail no such file or directory.'}
```

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
fileSystemManager.access({
  path: 'internal://cache/demo.png',
  success: () => {
    console.info('access success');
  },
  fail: (err) => {
    console.error('access fail', err);
  },
  complete: (res) => {
    console.info('access complete', res);
  }
});
```

### FileSystemManager.accessSync

FileSystemManager.accessSync(string path): void

同步判断一个文件/目录是否存在。存在则正常执行，不存在抛出异常。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| path | string | 是 | 要判断是否存在的文件/目录路径，支持"internal://"协议类型，支持资源文件绝对路径。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
try {
  fileSystemManager.accessSync('internal://cache/demo.png');
} catch (err) {
  console.error('accessSync error', err);
}
```

### FileSystemManager.appendFile

FileSystemManager.appendFile(Object object)

在文件结尾追加内容。

**起始版本：** 1.0.4

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| filePath | string | - | 是 | 需要追加的文件路径，仅支持"internal://"协议类型。 |
| data | string \| ArrayBuffer | - | 是 | 需要追加的文本或二进制数据。（ArrayBuffer类型支持情况依据框架是否支持决定） |
| encoding | string | utf-8 | 否 | 指定写入文件的字符编码，当前仅支持'utf-8'。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
fileSystemManager.appendFile({
  filePath: 'internal://cache/demo.png',
  data: '附件内容',
  success: () => {
    console.info('appendFile success');
  },
  fail: (err) => {
    console.error('appendFile fail', err);
  },
  complete: (res) => {
    console.info('appendFile complete', res);
  }
});
```

### FileSystemManager.appendFileSync

FileSystemManager.appendFileSync(string filePath, string|ArrayBuffer data, string encoding): void

在文件结尾追加内容。成功则正常执行，失败抛出异常。（ArrayBuffer类型支持情况依据框架是否支持决定）

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| filePath | string | - | 是 | 需要追加的文件路径，仅支持"internal://"协议类型。 |
| data | string \| ArrayBuffer | - | 是 | 需要追加的文本或二进制数据。 |
| encoding | string | utf-8 | 否 | 指定写入文件的字符编码，当前仅支持'utf-8'。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
try {
  fileSystemManager.appendFileSync('internal://cache/demo.png', '附件内容', 'utf-8');
} catch (err) {
  console.error('appendFileSync error', err);
}
```

### FileSystemManager.copyFile

FileSystemManager.copyFile(Object object)

异步复制文件接口。

**起始版本：** 1.0.4

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| srcPath | string | 是 | 源文件路径，支持以下两种类型的路径：<br/>- 支持"file://"协议路径，通常用于从文件选择器中选择的文件。<br/>- 支持"internal://"协议类型。 |
| destPath | string | 是 | 目标文件路径，仅支持"internal://files/"和"internal://cache/"类型。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**fail返回值：**

```js
{ errMsg: 'copyFile:fail  原因' }
```

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
fileSystemManager.copyFile({
  srcPath: 'internal://cache/demo.png',
  destPath: 'internal://cache/demo_copy.png',
  success: () => {
    console.info('copyFile success');
  },
  fail: (err) => {
    console.error('copyFile fail', err);
  },
  complete: (res) => {
    console.info('copyFile complete', res);
  }
});
```

### FileSystemManager.copyFileSync

FileSystemManager.copyFileSync(string srcPath, string destPath): void

同步复制文件接口。成功则正常执行，失败抛出异常。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| srcPath | string | 是 | 源文件路径，支持以下两种类型的路径：<br/>- 支持"file://"协议路径，通常用于从文件选择器中选择的文件。<br/>- 支持"internal://"协议类型。 |
| destPath | string | 是 | 目标文件路径，仅支持"internal://files/"和"internal://cache/"类型。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
try {
  fileSystemManager.copyFileSync('internal://cache/demo.png', 'internal://cache/demo_copy.png');
} catch (err) {
  console.error('copyFileSync error', err);
}
```

### FileSystemManager.getFileInfo

FileSystemManager.getFileInfo(Object object)

获取该元服务下的本地临时文件或本地缓存文件信息。

**起始版本：** 1.0.4

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| filePath | string | - | 是 | 要读取的文件路径，仅支持"internal://"协议类型。 |
| digestAlgorithm | string | md5 | 否 | 计算文件摘要的算法，可选项为md5\|sha1\|sha256。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

返回值为Object对象，包括以下字段。

| 属性 | 类型 | 描述 |
| -------- | -------- | -------- |
| size | number | 文件大小，以字节为单位。 |
| digest | string | 按照传入的digestAlgorithm计算得出的文件摘要。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
fileSystemManager.getFileInfo({
  filePath: 'internal://cache/demo.png',
  digestAlgorithm: 'sha256',
  success: (res) => {
    console.info('getFileInfo success', res);
  },
  fail: (err) => {
    console.error('getFileInfo fail', err);
  },
  complete: (res) => {
    console.info('getFileInfo complete', res);
  }
});
```

### FileSystemManager.getSavedFileList

FileSystemManager.getSavedFileList(Object object)

获取该元服务下的internal://files/store/下的文件列表。（保存缓存文件时，需写入到指定路径 "internal://files/store/" 下）

**起始版本：** 1.0.4

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

返回值为Object对象，包括以下字段。

| 属性 | 类型 | 描述 |
| -------- | -------- | -------- |
| fileList | Array&lt;object&gt; | 文件数组，每一项都是一个FileItem。 |

**fileList说明：**

| 属性 | 类型 | 描述 |
| -------- | -------- | -------- |
| filePath | string | 本地路径。 |
| size | number | 本地文件大小，以字节为单位。 |
| createTime | number | 文件保存时的时间戳，从1970/07/07 08:00:00到当前时间的秒数。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
fileSystemManager.getSavedFileList({
  success: (res) => {
    console.info('getSavedFileList success', res);
  },
  fail: (err) => {
    console.error('getSavedFileList fail', err);
  },
  complete: (res) => {
    console.info('getSavedFileList complete', res);
  }
});
```

### FileSystemManager.mkdir

FileSystemManager.mkdir(Object object)

创建目录。

**起始版本：** 1.0.4

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| dirPath | string | - | 是 | 创建的目录路径，仅支持"internal://files/"和"internal://cache/"类型。 |
| recursive | boolean | false | 否 | 是否在递归创建该目录的上级目录后再创建该目录。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
fileSystemManager.mkdir({
  dirPath: 'internal://files/example',
  recursive: false,
  success: () => {
    console.info('mkdir success');
  },
  fail: (err) => {
    console.error('mkdir fail', err);
  },
  complete: (res) => {
    console.info('mkdir complete', res);
  }
});
```

### FileSystemManager.mkdirSync

FileSystemManager.mkdirSync(string dirPath, boolean recursive): void

同步创建目录。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| dirPath | string | - | 是 | 创建的目录路径，仅支持"internal://files/"和"internal://cache/"类型。 |
| recursive | boolean | false | 否 | 是否在递归创建该目录的上级目录后再创建该目录。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
try {
  fileSystemManager.mkdirSync('internal://files/example', false);
} catch (err) {
  console.error('mkdirSync error', err);
}
```

### FileSystemManager.readdir

FileSystemManager.readdir(Object object)

读取目录内文件列表。

**起始版本：** 1.0.4

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| dirPath | string | 是 | 要读取的目录路径 (本地路径)。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

返回值为Object对象，包括以下字段。

| 属性 | 类型 | 描述 |
| -------- | -------- | -------- |
| files | Array&lt;string&gt; | 指定目录下的文件名数组。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
fileSystemManager.readdir({
  dirPath: 'internal://files/example',
  success: (res) => {
    console.info('readdir success', res);
  },
  fail: (err) => {
    console.error('readdir fail', err);
  },
  complete: (res) => {
    console.info('readdir complete', res);
  }
});
```

### FileSystemManager.readdirSync

FileSystemManager.readdirSync(string dirPath): Array&lt;string&gt;

同步读取目录内文件列表（本地路径）。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| dirPath | string | 是 | 要读取的目录路径（本地路径）。 |

**返回值：**

| 类型 | 描述 |
| -------- | -------- |
| Array&lt;string&gt; | 指定目录下的文件名数组。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
try {
  const res = fileSystemManager.readdirSync('internal://files/example');
  console.info('readdirSync success', res);
} catch (err) {
  console.error('readdirSync error', err);
}
```

### FileSystemManager.readFile

FileSystemManager.readFile(Object object)

读取本地文件内容。

**起始版本：** 1.0.4

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| filePath | string | 是 | 要读取的文件的路径（本地路径），仅支持"internal://"协议类型。 |
| encoding | string | 否 | 指定读取文件的字符编码，如果不传encoding，则以 ArrayBuffer 格式读取文件的二进制内容。当前仅支持'utf-8'。 |
| position | number | 否 | 从文件指定位置开始读，如果不指定，则从文件头开始读。读取的范围应该是左闭右开区间[position, position+length)。有效范围：[0, fileLength - 1]。单位：byte |
| length | number | 否 | 指定文件的长度，如果不指定，则读到文件末尾。有效范围：[1, fileLength]。单位：byte |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

返回值为Object对象，包括以下字段。

| 属性 | 类型 | 描述 |
| -------- | -------- | -------- |
| data | string \| ArrayBuffer | 文件内容 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
fileSystemManager.readFile({
  filePath: 'internal://files/hello.txt',
  encoding: 'utf-8',
  position: 0,
  success: (res) => {
    console.info('readFile success', res);
  },
  fail: (err) => {
    console.error('readFile fail', err);
  },
  complete: (res) => {
    console.info('readFile complete', res);
  }
});
```

### FileSystemManager.readFileSync

FileSystemManager.readFileSync(string filePath, string encoding, number position, number length): string|ArrayBuffer

同步读取本地文件内容。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| filePath | string | 是 | 要读取的文件的路径（本地路径），仅支持"internal://"协议类型。 |
| encoding | string | 否 | 指定读取文件的字符编码，如果不传encoding，则以ArrayBuffer格式读取文件的二进制内容。当前仅支持'utf-8'。 |
| position | number | 否 | 从文件指定位置开始读，如果不指定，则从文件头开始读。读取的范围应该是左闭右开区间 [position, position+length)。有效范围：[0, fileLength - 1]。单位：byte |
| length | number | 否 | 指定文件的长度，如果不指定，则读到文件末尾。有效范围：[1, fileLength]。单位：byte |

**返回值：**

| 属性 | 类型 | 描述 |
| -------- | -------- | -------- |
| data | string \| ArrayBuffer | 文件内容。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
try {
  const res = fileSystemManager.readFileSync('internal://files/hello.txt', 'utf-8', 0);
  console.info('readFileSync success', res);
} catch (err) {
  console.error('readFileSync error', err);
}
```

### FileSystemManager.removeSavedFile

FileSystemManager.removeSavedFile(Object object)

删除该元服务下已保存的本地缓存文件

**起始版本：** 1.0.4

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| filePath | string | 是 | 需要删除的文件路径（仅在internal://files/store/路径下操作）。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
fileSystemManager.removeSavedFile({
  filePath: 'internal://files/store/hello.txt',
  success: () => {
    console.info('removeSavedFile success');
  },
  fail: (err) => {
    console.error('removeSavedFile fail', err);
  },
  complete: (res) => {
    console.info('removeSavedFile complete', res);
  }
});
```

### FileSystemManager.rename

FileSystemManager.rename(Object object)

重命名文件。可以把文件从oldPath移动到newPath。

**起始版本：** 1.0.4

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| oldPath | string | 是 | 源文件路径，支持本地路径。 |
| newPath | string | 是 | 新文件路径，支持本地路径，仅支持"internal://files/"和"internal://cache/"类型。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
fileSystemManager.rename({
  oldPath: 'internal://files/hello.txt',
  newPath: 'internal://files/hello_new.txt',
  success: () => {
    console.info('rename success');
  },
  fail: (err) => {
    console.error('rename fail', err);
  },
  complete: (res) => {
    console.info('rename complete', res);
  }
});
```

### FileSystemManager.renameSync

FileSystemManager.renameSync(string oldPath, string newPath): void

同步重命名文件。可以把文件从oldPath移动到newPath。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| oldPath | string | 是 | 源文件路径，支持本地路径。 |
| newPath | string | 是 | 新文件路径，支持本地路径。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
try {
  fileSystemManager.renameSync('internal://files/hello.txt', 'internal://files/hello_new.txt');
} catch(err) {
  console.error('renameSync error', err);
}
```

### FileSystemManager.rmdir

FileSystemManager.rmdir(Object object)

删除目录。

**起始版本：** 1.0.4

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| dirPath | string | - | 是 | 要删除的目录路径，仅支持"internal://files/"和"internal://cache/"类型。 |
| recursive | boolean | false | 否 | 是否递归删除目录。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
fileSystemManager.rmdir({
  dirPath: 'internal://files/example',
  recursive: false,
  success: () => {
    console.info('rmdir success');
  },
  fail: (err) => {
    console.error('rmdir fail', err);
  },
  complete: (res) => {
    console.info('rmdir complete', res);
  }
});
```

### FileSystemManager.rmdirSync

FileSystemManager.rmdirSync(string dirPath, boolean recursive): void

同步删除目录。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| dirPath | string | - | 是 | 要删除的目录路径，仅支持"internal://files/"和"internal://cache/"类型。 |
| recursive | boolean | false | 否 | 是否递归删除目录。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
try {
  fileSystemManager.rmdirSync('internal://files/example', false);
} catch (err) {
  console.error('rmdirSync error', err);
}
```

### FileSystemManager.saveFile

FileSystemManager.saveFile(Object object)

保存临时文件到本地。此接口会移动临时文件，因此调用成功后（tempFilePath：internal://tmp/, filePath: internal://files/store/），tempFilePath 将不可用。

仅当tempFilePath传入temp目录下的文件路径（internal://tmp/）时，才允许filePath传入store目录下的文件路径（internal://files/store/）。

**起始版本：** 1.0.4

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| tempFilePath | string | 是 | 临时存储文件路径，仅支持"internal://"协议类型。 |
| filePath | string | 否 | 要存储的文件路径，仅支持"internal://files/"和"internal://cache/"类型。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

返回值为Object对象，包括以下字段。

| 属性 | 类型 | 描述 |
| -------- | -------- | -------- |
| savedFilePath | string | 存储后的文件路径（本地路径）。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
fileSystemManager.saveFile({
  tempFilePath: 'internal://tmp/templete.png',
  success: (res) => {
    console.info('saveFile success', res);
  },
  fail: (err) => {
    console.error('saveFile fail', err);
  },
  complete: (res) => {
    console.info('saveFile complete', res);
  }
});
```

### FileSystemManager.saveFileSync

FileSystemManager.saveFileSync(string tempFilePath, string filePath): string

同步保存临时文件到本地。

仅当tempFilePath传入temp目录下的文件路径（internal://tmp/）时，才允许filePath传入store目录下的文件路径（internal://files/store/）。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| tempFilePath | string | 是 | 临时存储文件路径，仅支持"internal://"协议类型。 |
| filePath | string | 否 | 要存储的文件路径，仅支持"internal://files/"和"internal://cache/"类型。 |

**返回值：**

| 属性 | 类型 | 描述 |
| -------- | -------- | -------- |
| savedFilePath | string | 存储后的文件路径（本地路径）。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
const savedFilePath = fileSystemManager.saveFileSync('internal://tmp/demo.png');
```

### FileSystemManager.stat

FileSystemManager.stat(Object object)

获取文件 Stats 对象。

**起始版本：** 1.0.4

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| path | string | - | 是 | 文件/目录路径，仅支持"internal://"协议类型。 |
| recursive | boolean | false | 否 | 是否递归获取目录下的每个文件的Stats信息。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

返回值为Object对象，包括以下字段。

| 属性 | 类型 | 描述 |
| -------- | -------- | -------- |
| stats | [Stats](#stats)\|Array&lt;[FileStats](#filestats)&gt; | 当recursive为false时，res.stats是一个Stats对象。<br/>当recursive为true且path是一个目录的路径时，res.stats是一个Array，数组的每一项是一个对象，每个对象包含path和stats。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
fileSystemManager.stat({
  path: 'internal://cache/demo.png',
  recursive: false,
  success: (res) => {
    console.info('stat success', res);
  },
  fail: (err) => {
    console.error('stat fail', err);
  },
  complete: (res) => {
    console.info('stat complete', res);
  }
});
```

### FileSystemManager.statSync

FileSystemManager.statSync(string path, boolean recursive): Object

同步获取文件 Stats 对象。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| path | string | - | 是 | 文件/目录路径，仅支持"internal://"协议类型。 |
| recursive | boolean | false | 否 | 是否递归获取目录下的每个文件的Stats信息。 |

**返回值：**

返回值为Object对象，包括以下字段。

| 属性 | 类型 | 描述 |
| -------- | -------- | -------- |
| stats | [Stats](#stats)\|Array&lt;[FileStats](#filestats)&gt; | 当recursive为false时，stats是一个Stats对象。<br/>当recursive为true且path是一个目录的路径时stats是一个Array，数组的每一项是一个对象，每个对象包含path和stats。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
try {
  const res = fileSystemManager.statSync('internal://cache/demo.png');
  console.info('statSync result', res);
} catch (err) {
  console.error('statSync error', err);
}
```

### FileSystemManager.unlink

FileSystemManager.unlink(Object object)

删除文件。

**起始版本：** 1.0.4

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| filePath | string | 是 | 要删除的文件路径，仅支持"internal://"协议类型。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
fileSystemManager.unlink({
  filePath: 'internal://cache/demo.png',
  success: () => {
    console.info('unlink success');
  },
  fail: (err) => {
    console.error('unlink fail', err);
  },
  complete: (res) => {
    console.info('unlink complete', res);
  }
});
```

### FileSystemManager.unlinkSync

FileSystemManager.unlinkSync(string filePath): void

同步删除文件。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| filePath | string | 是 | 要删除的文件路径，仅支持"internal://"协议类型。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
fileSystemManager.unlinkSync('internal://cache/demo.png');
```

### FileSystemManager.unzip

FileSystemManager.unzip(Object object)

解压文件。

**起始版本：** 1.0.4

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| zipFilePath | string | 是 | 源文件路径，仅支持"internal://"协议类型 (只可以是 zip 压缩文件)。 |
| targetPath | string | 是 | 目标目录路径，仅支持"internal://files/"和"internal://cache/"类型。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
fileSystemManager.unzip({
  zipFilePath: 'internal://cache/example.zip',
  targetPath: 'internal://cache/example',
  success: () => {
    console.info('unzip success');
  },
  fail: (err) => {
    console.error('unzip fail', err);
  },
  complete: (res) => {
    console.info('unzip complete', res);
  }
});
```

### FileSystemManager.writeFile

FileSystemManager.writeFile(Object object)

写文件。

**起始版本：** 1.0.4

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| filePath | string | - | 是 | 要写入的文件路径，仅支持"internal://files/"和"internal://cache/"类型。 |
| data | string \| ArrayBuffer | - | 是 | 要写入的文本或二进制数据。 |
| encoding | string | utf-8 | 否 | 指定写入文件的字符编码，当前仅支持'utf-8'。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
fileSystemManager.writeFile({
  filePath: 'internal://cache/demo.txt',
  data: '写入文本',
  encoding: 'utf-8',
  success: () => {
    console.info('writeFile success');
  },
  fail: (err) => {
    console.error('writeFile fail', err);
  },
  complete: (res) => {
    console.info('writeFile complete', res);
  }
});
```

### FileSystemManager.writeFileSync

FileSystemManager.writeFileSync(string filePath, string|ArrayBuffer data, string encoding): void

同步写文件。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| filePath | string | - | 是 | 要写入的文件路径，仅支持"internal://files/"和"internal://cache/"类型。 |
| data | string \| ArrayBuffer | - | 是 | 要写入的文本或二进制数据。 |
| encoding | string | utf-8 | 否 | 指定写入文件的字符编码，当前仅支持'utf-8'。 |

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
try {
  fileSystemManager.writeFileSync('internal://cache/demo.txt', '写入文本', 'utf-8');
} catch (err) {
  console.error('writeFileSync error', err);
}
```

## Stats

描述文件状态的对象。

### 属性

**起始版本：** 1.0.4

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| mode | number | 文件的类型和存取的权限。 |
| size | number | 文件大小，单位：字节。 |
| lastAccessedTime | number | 文件最近一次被存取或被执行的时间，unix时间戳。 |
| lastModifiedTime | number | 文件最后一次被修改的时间，unix时间戳。 |

### Stats.isDirectory

Stats.isDirectory(): boolean

判断当前文件是否一个目录。

**起始版本：** 1.0.4

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
const fd = fileSystemManager.openSync({
  filePath: 'internal://cache/test.txt'
});
const stats = fileSystemManager.fstatSync({
  fd: fd
});
console.info(stats.isDirectory());
```

### Stats.isFile

Stats.isFile(): boolean

判断当前文件是否一个普通文件。

**起始版本：** 1.0.4

**示例：**

```js
const fileSystemManager = has.getFileSystemManager();
const fd = fileSystemManager.openSync({
  filePath: 'internal://cache/test.txt'
});
const stats = fileSystemManager.fstatSync({
  fd: fd
});
console.info(stats.isFile());
```
