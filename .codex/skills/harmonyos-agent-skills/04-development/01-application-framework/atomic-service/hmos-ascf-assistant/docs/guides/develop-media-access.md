# 访问媒体文件


开发者可以使用[has.chooseImage](../references/references-apis/apis-image.md#haschooseimage)选择图片，从而访问媒体库资源。


```js
has.chooseImage({
  count: 1, // 默认9
  sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  success: (res) => {
    console.info('chooseImage success', res);
  }
});
```


开发者可以使用[has.chooseVideo](../references/references-apis/apis-video.md#haschoosevideo)选择视频，从而访问媒体库资源。
```js
has.chooseVideo({
  sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  maxDuration: 60, // 可以指定拍摄视频最长拍摄时间，默认为60s，仅在sourceType为camera时生效
  camera: 'back', // 可以指定前置或后置摄像头，默认为后置，仅在sourceType为camera时生效
  success: (res) => {
    console.info('chooseVideo success', res);
  }
});
```


开发者还可以使用[has.chooseMedia](../references/references-apis/apis-video.md#haschoosemedia)选择图片或视频，从而访问媒体库资源。


```js
has.chooseMedia({
  count: 2, // 默认9
  mediaType: ['image', 'video'], // 可以指定文件类型是图片还是视频，默认二者都有
  sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  maxDuration: 10, // 可以指定拍摄视频最长拍摄时间，默认为10s，仅在sourceType为camera时生效
  camera: 'back', // 可以指定前置或后置摄像头，默认为后置，仅在sourceType为camera时生效
  success: (res) => {
    console.info('chooseMedia success', res);
  }
});
```
