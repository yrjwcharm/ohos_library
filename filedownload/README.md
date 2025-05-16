### filedownlaod(API12)
___
#### 简介
**filedownload** 这是一款支持断点下载的开源插件，退出应用程序进程杀掉以后或无网络情况下恢复网络后，可以在上次位置继续恢复下载等

***版本更新 请查看更新日志***

#### 安装步骤

```ohpm
ohpm install @ohos_lib/filedownload
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
import { IFileDownloader } from '@ohos_lib/filedownload/src/main/ets/interface/IFileDownloader';
import {DownloaderUtil,DownloadManager, NetworkCallback, SqliteHelper,GTNetworkUtil} from '@ohos_lib/filedownload'
import { DownloadStatus } from '@ohos_lib/filedownload/src/main/ets/constants/DownloadStatus';
import {  request } from '@kit.BasicServicesKit';
import { relationalStore } from '@kit.ArkData';
import { promptAction } from '@kit.ArkUI';
let before = Date.now();
@Entry
@ComponentV2
struct SingleFileDownload {

  //todo tips: 测试url 若显示下载失败 看url是否可以正常访问与下载
  // "url": "http://dal-video.wenzaizhibo.com/6fcfd45370d7692cc61c181385794da5/6826ef69/00-x-upload/video/209245033_3aaf16a38aff214594fffec92839d37e_n8kGbGC8.mp4"
  // url:'http://dal-video.wenzaizhibo.com/a6dac8c6371a54477a5692f46ea9698e/6825c7da/00-x-upload/video/205971345_ae77bc38ae8b689a5a534e51b3153c8b_Kg3W8sai.mp4',
  // "url": "http://dal-video.wenzaizhibo.com/b9e99d64eb88639e5e324673521483ac/6825cd30/00-x-upload/video/209161637_025ef13fccffb5fab1fd357e691fb220_ot55SHt9.mp4"
  // "url": "http://dal-video.wenzaizhibo.com/08729e242e59be6ebb7cbb1e98919ad8/6825ccfd/00-x-upload/video/209161638_f7fbdb7733e6043fc21f6108b3051a60_TbZKvyV4.mp4"
  private networkCallback:NetworkCallback={
    netAvailableCallback: (netHandle: ESObject) => {
      promptAction.showToast({
        message:'网络可用~'
      })
    },
    //网络不可用
    netLostCallback: (netHandle: ESObject) => {
      promptAction.showToast({
        message:'网络连接已断开，请检查~'
      })
      DownloadManager.pauseWithPersistBreakpoint(getContext()).then(_=>{
        this.loadData();
      })

    }
  }
  @Local data:IFileDownloader[] = [{
    userId: '644323434232343455',
    url: "http://dal-video.wenzaizhibo.com/6fcfd45370d7692cc61c181385794da5/6826ef69/00-x-upload/video/209245033_3aaf16a38aff214594fffec92839d37e_n8kGbGC8.mp4",
    downloadId: '1',
  }]
  async aboutToAppear() {
    this.loadData();
    this.intervalExecute();
    //完善在无网络情况下，下载任务暂停，并且恢复网络后继续下载
    GTNetworkUtil.register(this.networkCallback)
  }
  intervalExecute=()=>{
    const now = Date.now();
    if (now - before >= 1000) {
      before = now;
      this.loadData();
    }
    setTimeout(this.intervalExecute, 1000);
  }
  async loadData(){
    //从数据库读取获取上次的下载进度
    let predicates =new relationalStore.RdbPredicates(SqliteHelper.tableName);
    predicates.equalTo('userId',this.data[0]?.userId);
    let queryList = await SqliteHelper.getInstance(getContext()).queryData(predicates);
    if(queryList.length>0){
      this.data = queryList;
    }
  }
  getStatusText(status:number|undefined){
    switch (status){
      case DownloadStatus.COMPLETED:
        return '下载完成'
      case DownloadStatus.PAUSE:
        return '暂停'
      case DownloadStatus.FAILED:
        return '下载失败'
      case DownloadStatus.RUNNING:
        return '下载中'
      default :
        return '下载'
    }
  }
  //下载文件
  downloadFile(){
    DownloaderUtil.downloadFile(this.data[0],
      (downloadInfo: IFileDownloader) => {
        let newData = this.data?.map((item) => {
          if (item.downloadId === downloadInfo.downloadId) {
            item = downloadInfo;
          }
          return item;
        })
        this.data = [...newData];
      })
  }
  build() {
    Column() {
      Stack({alignContent:Alignment.TopStart}){
        Row() {
          Progress({ value: this.data[0]?.downloadSize, total: this.data[0]?.fileSize, type: ProgressType.Linear })
            .style({ strokeWidth: 10, enableSmoothEffect: true, })
            .color(Color.Red)
            .width(160)
          Blank()
          Button(this.getStatusText(this.data[0]?.status)).type(ButtonType.Normal).width(80).onClick(async () => {
            if (this.data[0]?.status === DownloadStatus.RUNNING) { //下载中---->点击触发暂停下载【暂停下载】
              //暂停下载 并调用Api触发暂停 更改数据库状态为0
              try {
                const task = await request.agent.getTask(getContext(), this.data[0]?.taskId);
                await task.pause();
              }catch (e) {}
            } else if (this.data[0]?.status === DownloadStatus.FAILED) { //下载失败----> 重新下载
              this.downloadFile();
            } else if (this.data[0]?.status === DownloadStatus.PAUSE) { //下载暂停----->代表要恢复下载
              //恢复下载有两种情况 没有退出当前应用程序/ 退出应用程序杀死进程两种
              try {
                const task = await request.agent.getTask(getContext(), this.data[0]?.taskId);
                await task.resume();
              }catch (e) {
                //21900007 任务挂掉了/代表应用杀掉后重新进来的 ｜ https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-request#section21900007
                // aboutToAppear已经获取到要从哪开始下载的字节 begins 所以直接启动下载，和之前退出应用程序的那部分字节进行合并，
                // 统一放到一个文件中，这部分库中已经实现。无需手动处理
                if(e.code===21900007){
                  this.downloadFile();
                }
              }
            } else { //未下载 ---->点击下载
              this.downloadFile();
            }
          })
        }.width('100%')
          .padding({
            left: 16,
            right: 16
          })
          .margin({
            top: 32
          })
      }
      if(this.data[0].status===1){
        //本地沙盒路径播放
        Column(){
          Video({
            src:'file:///'+this.data[0]?.filePath+'/'+this.data[0]?.fileName
          })
            .height(300)
            .width('100%')
        }.width('100%')
          .margin({
            top:32
          })
      }
      // Button('查看下载').type(ButtonType.Normal).onClick(()=>{
      //     router.pushUrl({
      //       url:'pages/DownloadManager'
      //     })
      // }).backgroundColor(Color.Red)
    }
    .height('100%')
      .width('100%')
  }
}
```
### 下载观看Demo演示效果
[点击下载视频](https://github.com/yrjwcharm/ohos_library/raw/refs/heads/feature/ohos/fileDownload/demo/demo_1.mp4)

#### 更多详情效果案例展示：https://github.com/yrjwcharm/ohos_library/tree/feature/ohos/fileDownload