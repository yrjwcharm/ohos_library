## filedownlaod
___
#### 简介
**filedownload** 这是一款支持断点续传的开源插件

#### 安装步骤

```ohpm
ohpm install @ohos_lib/file_download
```
***1、添加权限在应用主模块entry/src/main/ets/module.json5下***
```typescript
"requestPermissions": [
      {
        "name" : "ohos.permission.INTERNET"
      },
      {
        "name" : "ohos.permission.GET_NETWORK_INFO"
      },
    ]
```
***2、在应用主模块entry入口EntryAbility下面添加初始化数据库操作***

```typescript
async  onWindowStageCreate(windowStage: window.WindowStage) {
    // Main window is created, set main page for this ability
    await SqliteHelper.getInstance(this.context).initRDB();
    hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onWindowStageCreate');

    windowStage.loadContent('pages/Index', (err) => {
      if (err.code) {
        hilog.error(DOMAIN, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err));
        return;
      }
      hilog.info(DOMAIN, 'testTag', 'Succeeded in loading the content.');
    });
  }
```
***2、在应用主模块entry入口Index.ts AboutToAppear()生命周期里添加如下代码***

```typescript
    aboutToAppear() {
    DownloadManager.pauseWithPersistBreakpoint(getContext());
}
```

***3.首先确定服务器是否支持断点下载，否则通过request.agent.create无法实现断点下载***

```shell
 curl -I -H "Range: bytes=0-100" 下载路径
```
#### 出现206 Partial Content 就代表着服务器支持断点续传与下载 ---如下

```sh
yanruifeng@bogon video % curl -I -H "Range: bytes=0-100" https://dal-video.wenzaizhibo.com/a6dac8c6371a54477a5692f46ea9698e/6825c7da/00-x-upload/video/205971345_ae77bc38ae8b689a5a534e51b3153c8b_Kg3W8sai.mp4
HTTP/1.1 200 Connection established

HTTP/1.1 206 Partial Content
Server: Tengine
Date: Thu, 15 May 2025 05:30:38 GMT
Content-Type: video/mp4
Content-Length: 101
Connection: keep-alive
x-oss-request-id: 68257BFE34D5B23030216070
x-oss-cdn-auth: success
Accept-Ranges: bytes
ETag: "AE77BC38AE8B689A5A534E51B3153C8B"
Last-Modified: Fri, 21 Oct 2022 11:20:36 GMT
x-oss-object-type: Normal
x-oss-hash-crc64ecma: 1310237839552952721
x-oss-storage-class: Archive
x-oss-server-time: 56
Via: cache1.l2nu20-3[190,190,206-0,M], cache24.l2nu20-3[191,0], ens-cache9.cn7681[228,228,206-0,M], ens-cache17.cn7681[234,0]
Ali-Swift-Global-Savetime: 1747287038
X-Cache: MISS TCP_MISS dirn:-2:-2 mlen:524288
X-Swift-SaveTime: Thu, 15 May 2025 05:30:38 GMT
X-Swift-CacheTime: 31104000
Content-Range: bytes 0-100/11115092
Access-Control-Allow-Origin: *
Timing-Allow-Origin: *
EagleId: 679795a517472870384254041e
```
#### 基本用法
```typescript
import { promptAction, router } from '@kit.ArkUI';
import { DownloadManager } from '@ohos_lib/file_download';

@Entry
@ComponentV2
struct Index {
  @Local message: string = 'Hello World';
  aboutToAppear() {
    DownloadManager.pauseWithPersistBreakpoint(getContext());
  }
  build() {
    Stack() {
      Column() {
        Button('单个文件下载').onClick(() => {
          router.pushUrl({
            url: 'pages/SingleFileDownload'
          })
        })
        Blank().height(32)
        Button('批量排队下载').onClick(() => {
          // router.pushUrl({
          //   url: 'pages/MatchQueueDownload'
          // })
          promptAction.showToast({
            message:'目前暂不支持,请耐新等待，后续版本V2会补充上'
          })
        })
      }
    }
    .height('100%')
      .width('100%')
  }
}
```

#### 详细完整实例请查看 https://github.com/yrjwcharm/ohos_library/tree/feature/ohos/fileDownload
