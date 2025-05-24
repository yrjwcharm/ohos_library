### filedownlaod(API12)
___
#### 简介
**filedownload** 这是一款支持大文件断点下载的开源插件，退出应用程序进程杀掉以后或无网络情况下恢复网络后，可以在上次位置继续恢复下载等

***版本更新---请查看更新日志!!!***

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
***2、在应用主模块entry入口EntryAbility onWindowStageCreate生命周期里下面添加初始化数据库操作***

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
***3、在应用主模块entry入口Index.ts AboutToAppear()生命周期里添加如下代码***

```typescript
async aboutToAppear() {
  try {
    await DownloaderUtil.persistMergeFileStorage();
  }catch (e) {
  }
}
```

***4.首先确定服务器是否支持断点下载，否则通过request.agent.create无法实现断点下载***

```shell
 curl -I -H "Range: bytes=0-100" 下载路径
```
#### 出现206 Partial Content 就代表着服务器支持断点续传与下载 ---如下

```typescript
yanruifeng@bogon video % curl -I -H "Range: bytes=0-100" https://dal-video.wenzaizhibo.com/a6dac8c6371a54477a5692f46ea9698e/6825c7da/00-x-upload/video/205971345_ae77bc38ae8b689a5a534e51b3153c8b_Kg3W8sai.mp4

HTTP/1.1 206 Partial Content
```
#### 基本用法
```typescript
import { IFileDownloader } from '@ohos_lib/filedownload/src/main/ets/interface/IFileDownloader';
import {DownloaderUtil,DownloadManager, NetworkCallback, SqliteHelper,GTNetworkUtil} from '@ohos_lib/filedownload'
import { DownloadStatus } from '@ohos_lib/filedownload/src/main/ets/constants/DownloadStatus';
import { relationalStore } from '@kit.ArkData';
import { promptAction, router } from '@kit.ArkUI';
import { IResponseData } from '../interfaces/IResponseData';

@Entry
@ComponentV2
struct SingleFileDownload {
  @Local userId:string ='722134343434343434';//登录用户信息id 这里写四Mock
  private networkCallback:NetworkCallback={
    netAvailableCallback: (netHandle: ESObject) => {
      promptAction.showToast({
        message:'网络可用~'
      })
    },
    netLostCallback: (_: ESObject) => {
      promptAction.showToast({
        message:'网络连接已断开，请检查~'
      })
    }
  }
  @Local data: IResponseData[] = [];
  async aboutToAppear() {
    this.loadData();
    getContext().eventHub.on('reQuery',()=>{
      this.loadData();
    })
    DownloadManager.addListener(DownloadManager.eventName,(downloadInfo:IFileDownloader)=>{
      console.log('更新回调',downloadInfo.downloadSize)
      //进度监听更新回调
      let newData =  this.data?.map((item)=>{
        if(item.downloadId===downloadInfo.downloadId){
          item.taskId = downloadInfo.taskId;
          item.filePath = downloadInfo.filePath;
          item.fileName =downloadInfo.fileName;
          item.downloadSize = downloadInfo.downloadSize;
          item.fileSize = downloadInfo.fileSize;
          item.isBackgroundPause =downloadInfo.isBackgroundPause;
          item.exitFrequency = downloadInfo.exitFrequency;
          item.status = downloadInfo.status;
          item.begins = downloadInfo.begins;
          return item;
        }
        return item;
      })
      this.data =newData;
    })
    //完善在无网络情况下，下载任务暂停，并且恢复网络后继续下载
    GTNetworkUtil.register(this.networkCallback)
  }
  async loadData(){
    // TODO 假设从网络获取数据数据结构为: response=[{classNumber:'76432121445578293',className:'第一章 第一讲：At the Airport在机场'}]
    //转换数据结构 IFileDownloader至少包含三个字段userId ,downloadId,url userId登录用户的userId
    let result:IResponseData[] =[{classNumber:'76432121445578293',downloadId:'76432121445578293', className:'第一章 第一讲：At the Airport在机场',url: 'http://test-dal-video.wenzaizhibo.com/14329cce70aab43d901815fb69032101/682c414e/00-upload/video-test/1046576_c873b32c322da8f81a360159fbaddbc3_ec7A1Pwg.mp4',userId:this.userId}]
    //从数据库读取获取上次的下载进度
    let predicates =new relationalStore.RdbPredicates(SqliteHelper.tableName);
    predicates.equalTo('userId',this.userId);
    let queryList = await SqliteHelper.getInstance(getContext()).queryData(predicates);
    if(queryList.length>0){
      let newData = result.map((item:IResponseData)=>{
        let obj =queryList.find(el=>el.downloadId===item.downloadId);
        if(obj) {
          item.taskId = obj.taskId;
          item.filePath = obj.filePath;
          item.fileName =obj.fileName;
          item.downloadSize = obj.downloadSize;
          item.fileSize = obj.fileSize;
          item.isBackgroundPause =obj.isBackgroundPause;
          item.exitFrequency = obj.exitFrequency;
          item.status = obj.status;
          item.begins = obj.begins;
          return item;
        }
        return item;
      })
      this.data= newData;
    }else{
      this.data = result;
    }
  }
  aboutToDisappear(): void {
    GTNetworkUtil.unregister();
    DownloadManager.removeListener(DownloadManager.eventName)
    getContext().eventHub.off('reQuery');
  }
  getStatus(status:number|undefined){
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
  @Builder imageAnimator(item:IResponseData){
    ImageAnimator()
      .images([
        {
          src: $r('app.media.ic_downloading_1')
        },
        {
          src: $r('app.media.ic_downloading_2')
        },
        {
          src: $r('app.media.ic_downloading_3')
        },
        {
          src: $r('app.media.ic_downloading_4')
        },
        {
          src: $r('app.media.ic_downloading_5')
        }
      ])
      .duration(1000)
      .state(item.status===DownloadStatus.RUNNING?AnimationStatus.Running:AnimationStatus.Initial)
      .reverse(false)
      .fillMode(FillMode.None)
      .iterations(-1)
      .width(24)
      .height(24)
      .onStart(() => {
        console.info('Start')
      })
      .onPause(() => {
        console.info('Pause')
      })
      .onRepeat(() => {
        console.info('Repeat')
      })
      .onCancel(() => {
        console.info('Cancel')
      })
      .onFinish(() => {
        console.info('Finish')
      })
  }
  build() {
    Column() {
      Stack({alignContent:Alignment.TopStart}){
        ForEach(this.data,(item:IResponseData)=>{
          Flex({
            direction:FlexDirection.Row,
            alignItems:ItemAlign.Center,
            justifyContent:FlexAlign.SpaceBetween
          }) {
            Row(){
              Text(item?.className).fontSize(16).fontWeight(FontWeight.Bold)
            }.layoutWeight(1)
            if(item.status===DownloadStatus.COMPLETED){
              Image($r('app.media.ic_download_completed')).width(24).height(24)
            }else if(item.status===DownloadStatus.RUNNING) {
              this.imageAnimator(item);
            }else if(item.status===DownloadStatus.FAILED){
              Image($r('app.media.ic_download_fail')).width(24).height(24)
            }else if(item.status===DownloadStatus.PAUSE){
              Image($r('app.media.ic_download_start')).width(24).height(24)
            }
          }.width('100%')
            .height(44)
            .onClick(async ()=>{
              if (item?.status === DownloadStatus.RUNNING) { //下载中---->点击触发取消下载【删除下载】
                let number =  await DownloaderUtil.delete(item.userId,item.downloadId);
                if(number>0){
                  this.loadData();
                }
              } else if (item?.status === DownloadStatus.FAILED) { //下载失败----> 重新下载
                DownloaderUtil.downloadFile(item);
              } else if (item?.status === DownloadStatus.PAUSE) { //下载暂停----->代表要恢复下载
                await DownloaderUtil.resume(item);
              } else if(item.status===DownloadStatus.COMPLETED) { //下载完成 ---->去播放
                router.pushUrl({
                  url: 'pages/VideoPlayerPage',
                  params:{url:'file:///'+item.filePath+'/'+item.fileName,}
                })
              }else{ //未下载 -->去下载
                promptAction.showToast({
                  message:'开始下载',
                })
                DownloaderUtil.downloadFile(item);
              }
            })
            .padding({
              left: 16,
              right: 16
            })
            .margin({
              top: 32
            })
        })
      }.layoutWeight(1)
      Button('查看下载').type(ButtonType.Capsule).onClick(()=>{
        router.pushUrl({
          url:'pages/DownloadManagerPage',
          params:{
            data:this.data,
            userId:this.userId
          }
        })
      }).backgroundColor(Color.Red)
    }
    .height('100%')
      .width('100%')
  }
}
```
### 下载观看Demo演示效果
[点击下载视频](https://github.com/yrjwcharm/ohos_library/raw/refs/heads/feature/ohos/fileDownload/demo/demo_1.mp4)

#### 更多详情效果案例展示：https://github.com/yrjwcharm/ohos_library/tree/feature/ohos/fileDownload

### demo运行问题已经修复
#### *** todo tips:目前若中途无网络情况下，恢复网络无法继续下载，后续版本会支持，请耐心等待***