### filedownlaod(API12)
### 📚简介
**filedownload** 这是一款支持大文件断点下载的开源插件，退出应用程序进程杀掉以后或无网络情况下恢复网络后，可以在上次位置继续恢复下载等

***版本更新---请查看更新日志!!!*** 修复已知bug,demo已经更新

### 📚下载安装

`ohpm install @ohos_lib/filedownload`

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
***2、在应用主模块entry入口EntryAbility onCreate生命周期里下面添加初始化数据库操作***

```typescript
 onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
  this.context.getApplicationContext().setColorMode(ConfigurationConstant.ColorMode.COLOR_MODE_NOT_SET);
  hilog.info(DOMAIN, 'testTag', '%{public}s', 'Ability onCreate');
  SqliteHelper.getInstance(this.context).initRDB();
}

```
***3、在应用主模块entry入口Index.ts AboutToAppear()生命周期里添加如下代码***

```typescript
 try {
  await DownloaderUtil.persistActiveDownloads();
}catch (e) {
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
## filedownload相关 API
| 方法                                                                                          | 介绍                                     |
|:--------------------------------------------------------------------------------------------|:---------------------------------------|
| persistActiveDownloads()                                                                    | 断点下载的主要方法「内置更改数据库状态，把断点前后字节数统一合并成一个文件」 |
| static async pause(taskId: string):Promise<void>                                            | 下载暂停方法「内置更改数据库状态」                      |
| static async resume(downloadInfo: IFileDownloader):Promise<void>                            | 下载恢复方法 「内置更改数据库状态」                     |
| static async delete(userId: string, downloadId: string):Promise<number>                     | 删除「取消下载」方法「删除数据库表记录，删除文件系统下载文件、」       |
| static async downloadFile<T extends IFileDownloader>(data: T, isBatchInsertQueue?: boolean) | 通用下载方法                                 |
| GTNetworkUtil                                                                               | 网络相关工具类 「监听有网、无网状态」                    |
| FileUtil                                                                                    | 文件操作相关工具类 「沙盒文件存储、删除等操作」               |
| SqliteHelper                                                                                | 数据库操作类、「增删改查」                          |
| static  addListener(eventName:string,callback:(download:IFileDownloader)=>void)             | 下载统一监听回调类「进度监听、失败、恢复、成功、暂停」            |

#### 基本用法
```typescript
import { FileDownloader } from '@ohos_lib/filedownload/src/main/ets/model/FileDownloader';
import {DownloaderUtil,DownloadManager, NetworkCallback, SqliteHelper,GTNetworkUtil} from '@ohos_lib/filedownload'
import { DownloadStatus } from '@ohos_lib/filedownload/src/main/ets/constants/DownloadStatus';
import { relationalStore } from '@kit.ArkData';
import { promptAction, router } from '@kit.ArkUI';
import { ResponseData } from '../../model/ResponseData';
import {plainToInstance} from 'class-transformer'
@Entry
@ComponentV2
struct SingleFileDownload {
  @Local userId:string ='722134343434343434';//登录用户信息id 这里目前mock一个UserId
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
      //无网络情况下，恢复网络后继续保持在上次位置下载 --只需要调用如下一行代码即可
      // 本质逻辑内部还是发送了一个监听，统一在DownloadManager.addListener监听处理
      DownloaderUtil.persistActiveDownloads()
    }
  }
  @Local data: ResponseData[] = [];
  async aboutToAppear() {
    this.loadData();
    getContext().eventHub.on('reQuery',()=>{
      this.loadData();
    })
    DownloadManager.addListener(DownloadManager.eventName,(downloadInfo:FileDownloader)=>{
      console.log('更新回调',downloadInfo.downloadSize)
      //进度监听更新回调 ,无需改变数组应用，直接更改新item 必要属性值，实现局部刷新
      this.data?.forEach((item)=>{
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
        }
      })
    })
    //完善在无网络情况下，下载任务暂停，并且恢复网络后继续下载
    GTNetworkUtil.register(this.networkCallback)
  }
  //TODO tips: 下载失败，首先检查fileUrl是否可以正常访问，或者浏览器是否可以正常在线下载
  async loadData(){
    try {
      // TODO 假设从网络获取JSON数据的格式为 "[{\"classNumber\":\"76432121445578293\",\"className\":\"第一章 第一讲：At the Airport在机场\",\"fileUrl\":\"http://dal-video.wenzaizhibo.com/ff5ba32d9239ba38487b70edf72f095c/68b1a884/00-x-upload/video/205971345_ae77bc38ae8b689a5a534e51b3153c8b_Kg3W8sai.mp4\"}]"
      //通过网络请求后返回的实际上是Json对象 - 要实现列表局部刷新-必先实例化
      let jsonArr:ResponseData[] =
        JSON.parse("[{\"classNumber\":\"76432121445578293\",\"className\":\"第一章 第一讲：At the Airport在机场\",\"fileUrl\":\"http://dal-video.wenzaizhibo.com/ff5ba32d9239ba38487b70edf72f095c/68b1a884/00-x-upload/video/205971345_ae77bc38ae8b689a5a534e51b3153c8b_Kg3W8sai.mp4\"}]");
      //转换数据结构response实体类时必须要继承extends FileDownloader实体类，初始化至少包含三个必要字段userId ,downloadId,url userId登录用户的userId
      //因此extends FileDownloader过的ResponseData接口类型 对应转换后的数据如下所示
      let result: ResponseData[] = jsonArr.map(item => {
        const response = plainToInstance(ResponseData, item);
        response.downloadId = '76432121445578293';
        response.userId = this.userId;
        response.url = item.fileUrl;
        return response;
      })
      //从数据库读取获取上次的下载进度
      let predicates = new relationalStore.RdbPredicates(SqliteHelper.tableName);
      predicates.equalTo('userId', this.userId);
      let queryList = await SqliteHelper.getInstance(getContext()).queryData(predicates);
      if (queryList.length > 0) {
        let newData = result.map((item: ResponseData) => {
          let obj = queryList.find(el => el.downloadId === item.downloadId);
          if (obj) {
            item.taskId = obj.taskId;
            item.filePath = obj.filePath;
            item.fileName = obj.fileName;
            item.downloadSize = obj.downloadSize;
            item.fileSize = obj.fileSize;
            item.isBackgroundPause = obj.isBackgroundPause;
            item.exitFrequency = obj.exitFrequency;
            item.status = obj.status;
            item.begins = obj.begins;
            return item;
          }
          return item;
        })
        this.data = newData;
      } else {
        this.data = result;
      }
    }catch (e) {
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
  @Builder imageAnimator(item:ResponseData){
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
        ForEach(this.data,(item:ResponseData)=>{
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
          url:'pages/single/DownloadManagerPage',
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
#### 运行Demo演示效果
* demo 运行 git clone https://github.com/yrjwcharm/ohos_library.git
* 切换分支 git checkout feature/ohos/fileDownload

#### 下载观看Demo演示效果--退出应用程序杀掉进程后恢复下载
[点击下载视频](https://github.com/yrjwcharm/ohos_library/raw/refs/heads/feature/ohos/fileDownload/demo/demo_1.mp4)

#### 下载观看Demo演示效果--无网络情况下恢复网络后继续保持下载
[点击下载视频](https://github.com/yrjwcharm/ohos_library/raw/refs/heads/feature/ohos/fileDownload/demo/demo_2.mp4)

#### 更多详细用法请查看 https://github.com/yrjwcharm/ohos_library/tree/feature/ohos/fileDownload

#### 鸿蒙技术交流QQ群：783867484

#### 开源不易，希望您可以动一动小手点点小⭐⭐

#### 👴希望大家如有好的需求踊跃提交,如有问题请前往github提交issue，空闲时间会扩充与修复优化

### 🌏开源协议

本项目基于 [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0.html) ，在拷贝和借鉴代码时，请大家务必注明出处。
