# 图片

## has.saveImageToPhotosAlbum

has.saveImageToPhotosAlbum(Object object)

保存图片到系统相册。调用该接口会触发弹窗，用户确认后保存。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| filePath | string | 是 | 图片文件路径，可以是临时文件路径或永久文件路径 (本地路径) ，不支持网络路径。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.saveImageToPhotosAlbum({
  filePath: 'internal://tmp/xxx.png', // 此处仅为样例，请开发者更换为可用图片资源地址。
  success: () => {
    console.info('saveImageToPhotosAlbum success');
  },
  fail: (err) => {
    console.error('saveImageToPhotosAlbum fail', err);
  },
  complete: (res) => {
    console.info('saveImageToPhotosAlbum complete', res);
  }
});
```

## has.previewImage

has.previewImage(Object object)

在新页面中预览图片，预览的过程中用户可以进行保存图片等操作。

**注意事项**：在调用此接口时如果需要支持保存网络资源，需要先完成[配置服务器域名](https://developer.huawei.com/consumer/cn/doc/atomic-guides/agc-help-harmonyos-server-domain)。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| urls | Array&lt;string&gt; | - | 是 | 需要预览的图片列表（支持网络图片和本地图片，本地图片路径以internal://开头）。 |
| showmenu | boolean | true | 否 | 是否显示长按菜单。 |
| current | string | urls的第一个元素（即第一张图片url） | 否 | 当前显示的图片的链接。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.previewImage({
  current: 'https://www.example.com/xxx.jpeg', // 此处仅为样例，请开发者更换为可用图片资源地址
  urls: ['https://www.example.com/xxx.jpeg',
    'https://www.example.com/xxxx.png',
    'https://www.example.com/xxxxx.jpeg@h_1280'],
  showmenu: true,
  success: () => {
    console.info('previewImage success');
  },
  fail: (err) => {
    console.error('previewImage fail', err);
  },
  complete: (res) => {
    console.info('previewImage complete', res);
  }
});
```

## has.getImageInfo

has.getImageInfo(Object object)

获取图片的信息。

**起始版本：** 1.0.0

**注意事项**：在调用此接口时如果使用网络资源，需要先完成[配置服务器域名](https://developer.huawei.com/consumer/cn/doc/atomic-guides/agc-help-harmonyos-server-domain)。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| src | string | - | 是 | 图片的路径，支持网络路径、本地路径、代码包路径。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| width | number | 图片原始宽度，单位px。不考虑旋转。 |
| height | number | 图片原始高度，单位px。不考虑旋转。 |
| path | string | 图片的本地路径。 |
| type | string | 图片格式 |
| orientation | string | [拍照时设备方向](http://sylvana.net/jpegcrop/exif_orientation.html)。<br/>up：默认方向（手机横持拍照），对应Exif中的1。或无orientation信息。<br/>up-mirrored：默认方向（手机横持拍照）、镜像翻转，对应Exif中的2。<br/>down：旋转180度，对应Exif中的3。<br/>down-mirrored：旋转180度、镜像翻转，对应Exif中的4。<br/>left-mirrored：逆时针旋转90度、镜像翻转，对应Exif中的5。<br/>right：顺时针旋转90度，对应Exif中的6。<br/>right-mirrored：顺时针旋转90度、镜像翻转，对应Exif中的7。<br/>left：逆时针旋转90度，对应Exif中的8。<br/>**起始版本：** 1.0.13<br/>**依赖关系：** HarmonyOS版本 ≥ 5.0.1 |

**示例：**

```js
has.getImageInfo({
  src: 'https://www.example.com/xxx.png', // 此处仅为样例，请开发者更换为可用图片资源地址
  success: (res) => {
    console.info('getImageInfo success', res);
  },
  fail: (err) => {
    console.error('getImageInfo fail', err);
  },
  complete: (res) => {
    console.info('getImageInfo complete', res);
  }
});
```

## has.chooseImage

has.chooseImage(Object object)

从本地相册选择图片或使用相机拍照。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| count | number | 9 | 否 | 最多可以选择的图片张数。默认值为9，最大不能超过20。 |
| sizeType | Array&lt;string&gt; | ['original', 'compressed'] | 否 | 所选的图片的尺寸。<br/>original：原图。<br/>compressed：压缩图。 |
| sourceType | Array&lt;string&gt; | ['album', 'camera'] | 否 | 选择图片的来源。<br/>album：从相册选图。<br/>camera：使用相机拍摄。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型                  | 描述 |
| -------- |---------------------| -------- |
| tempFilePaths | Array&lt;string&gt; | 图片的本地临时文件路径列表 (本地路径)。 |
| tempFiles | Array&lt;Object&gt; | 图片的本地临时文件列表。 |

**tempFiles：**

| 属性 | 类型 | 描述            |
| -------- | -------- |---------------|
| path | string | 所选图片的临时路径。    |
| size | number | 所选图片的大小，单位：B。 |

**示例：**

```js
has.chooseImage({
  sourceType: ['album', 'camera'],
  count: 9,
  success: (res) => {
    const tempFiles = res.tempFiles;
    console.info('chooseImage success', tempFiles);
  },
  fail: (err) => {
    console.error('chooseImage fail', err);
  },
  complete: (res) => {
    console.info('chooseImage complete', res);
  }
});
```

## has.chooseFile

has.chooseFile(Object object)

打开文件选择器选择文件。

**起始版本：** 1.0.20

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| count | number | 是 | 最多可以选择的文件个数（1-100）。 |
| type | string | 是 | 所选文件的类型。<br/>- file：文档文件<br/>- audio：音频文件<br/>- image：图片文件<br/>- video：视频文件 |
| extension | Array&lt;string&gt; | 否 | 根据文件扩展名过滤，仅在type = 'file'时有效，数组中不允许包含空字符串。默认不过滤。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型                  | 描述 |
| -------- |---------------------| -------- |
| tempFiles | Array&lt;Object&gt; | 返回所选文件对象的数组。 |

**tempFiles：**

| 属性 | 类型 | 描述 |
| -------- | -------- | -------- |
| path | string | 所选文件的文件路径。<br/> **注意：** <br/>此路径为系统媒体库原始路径，应用无法直接读写，如需操作文件，请先调用[FileSystemManager.copyFile](./apis-file.md#filesystemmanagercopyfile)或[FileSystemManager.copyFileSync](./apis-file.md#filesystemmanagercopyfilesync)接口将文件拷贝到沙箱再进行使用。 |
| name | string | 所选文件的文件名称。 |
| size | number | 所选文件的文件大小，单位：B。 |

**示例：**

```js
has.chooseFile({
  type: 'image',
  count: 5,
  success: (res) => {
    const tempFiles = res.tempFiles;
    console.info('chooseFile success', tempFiles);
  },
  fail: (err) => {
    console.error('chooseFile fail', err);
  },
  complete: (res) => {
    console.info('chooseFile complete', res);
  }
});
```
