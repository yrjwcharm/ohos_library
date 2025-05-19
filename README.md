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
import { request } from '@kit.BasicServicesKit';
import {DownloadManager } from '../downloadmanager/DownloadManager';
import { relationalStore, ValuesBucket, ValueType } from '@kit.ArkData';
import { connection } from '@kit.NetworkKit';
import { promptAction } from '@kit.ArkUI';
import { SqliteHelper } from '../db/SqliteHelper';
import { DownloadStatus } from '../constants/DownloadStatus';
import { IFileDownloader } from '../interface/IFileDownloader';
import { ENV } from './ENV';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { FileUtil } from './FileUtil';
import { fileIo } from '@kit.CoreFileKit';


export class DownloaderUtil {
  static deleteTask = async (downloadTask: request.agent.Task) => {
    try {
      downloadTask.off('progress');
      downloadTask.off('completed');
      downloadTask.off('failed');
      console.log('remove task', downloadTask.tid)
      await request.agent.remove(downloadTask.tid);

    } catch (err) {
      console.error(`deleteTask fail, err= ${JSON.stringify(err)}`);
    }
  }
  //退出应用程序后，由于task处于游离状态，此时使用request.agent.getTask()方法控制暂停与恢复是不会走响应回调的
  //所以App一般都是在应用退出前比如onDestroy做状态保留，但其实如果数据库包含异步操作的话，用async destroy()也不好使。比较可行的方法每次进来都处于暂停状态
  public static async  persistMergeFileStorage():Promise<void> {
    const netIsAvailable = await connection.hasDefaultNet();
    let predicates = new relationalStore.RdbPredicates(SqliteHelper.tableName);
    predicates.equalTo('status', DownloadStatus.RUNNING)
    let list = await SqliteHelper.getInstance(getContext()).queryData(predicates)
    for (let i = 0; i < list.length; i++) {
      try {
        let task =await request.agent.getTask(getContext(),list[i].taskId);
        await DownloaderUtil.deleteTask(task);
      } catch (e) {
        ENV.__DEV__&&hilog.error(0x0000, "移除下载任务时出现异常", "%{public}s", e.message);
      } finally {
        let srcPath = getContext().cacheDir + "/" + list[i].downloadId;
        let dstPath = getContext().cacheDir + "/tmp/" + list[i].downloadId;
        FileUtil.writeTmpBytes(srcPath, dstPath, list[i]?.fileName??'', list[i].exitFrequency, list[i].status)
        let file = fileIo.openSync(dstPath + '/' + list[i].fileName,
          fileIo.OpenMode.READ_WRITE);
        let buf = new ArrayBuffer(fileIo.statSync(file.fd).size);
        fileIo.readSync(file.fd, buf);
        fileIo.closeSync(file);
        let exitFrequency: number;
        if (netIsAvailable) {
          exitFrequency = list[i]?.exitFrequency??1 + 1;
        } else {
          exitFrequency = list[i]?.exitFrequency??1;
        }
        predicates.and().equalTo('downloadId',list[i].downloadId);
        await SqliteHelper.getInstance(getContext()).update({
          'status': 0,
          'begins': buf.byteLength,
          isBackgroundPause: 1,
          exitFrequency,
        },predicates)
      }
    }
  }
  static async pause(taskId:string):Promise<void>{
    //暂停下载 调用Api触发暂停 更改数据库状态为0
    try {
      const task = await request.agent.getTask(getContext(),taskId);
      await task.pause();
    }catch (e) {
      console.error(`deleteTask fail, err= ${JSON.stringify(e)}`);
    }
  }
  static async resume(downloadInfo:IFileDownloader):Promise<void>{
    //恢复下载有两种情况 没有退出当前应用程序/ 退出应用程序杀死进程两种
    try {
      const task = await request.agent.getTask(getContext(),downloadInfo.taskId);
      await task.resume();
    }catch (e) {
      //21900007 任务挂掉了/代表应用杀掉后重新进来的 ｜ https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-request#section21900007
      // aboutToAppear已经获取到要从哪开始下载的字节 begins 所以直接启动下载，和之前退出应用程序的那部分字节进行合并，
      // 统一放到一个文件中，这部分库中已经实现。无需手动处理
      if(e.code===21900007){
        DownloaderUtil.downloadFile(downloadInfo);
      }
    }
  }
  //统一下载封装 //tips: 这里提供范型支持【没有用Model实体类，请注意，觉得用接口更容易描述】 强制约束类型为IFileDownloader，建议提前转化数据结构使用 isBatchInsertQueue此参数只针对全部下载[目前暂时用不到，后续会完善全部下载等功能]-进行排队。非必穿默认false
  static async downloadFile<T extends  IFileDownloader>(data: T, isBatchInsertQueue?: boolean) {
    const netIsAvailable = await connection.hasDefaultNet();
    if (netIsAvailable) {
      let url = decodeURIComponent(data.url)
      let downloadId = data.downloadId;
      let fileName = url.substring(url.lastIndexOf('/')+1);
      let savePath =
        getContext().cacheDir + '/' + downloadId + '/' + fileName
      let downloadConfig: request.agent.Config = {
        action: request.agent.Action.DOWNLOAD,
        url: url,
        mode: request.agent.Mode.FOREGROUND,
        retry: true,
        metered: false,
        roaming: true,
        redirect: true,
        network: request.agent.Network.ANY,
        saveas: savePath,
        overwrite: true,
        begins: data.begins ?? 0,
      }
      try {
        let valuesBuket: ValuesBucket = {
          'userId': data.userId,
          'downloadId': downloadId, //必传
          'url': url, //必传
          'filePath': getContext().cacheDir + '/' + downloadId,
          'fileName': fileName,
          "begins": data.begins ?? 0
        }
        valuesBuket.fileSize = data .fileSize??0
        let predicates = new relationalStore.RdbPredicates(SqliteHelper.tableName);
        predicates.equalTo('userId', data.userId).and().equalTo('downloadId', data.downloadId)
        if (isBatchInsertQueue) {
          let list = await SqliteHelper.getInstance(getContext()).queryData(predicates);
          if (list.length === 0) {
            await SqliteHelper.getInstance(getContext())
              .insert(SqliteHelper.tableName, valuesBuket);
          }
        } else {
          let downloadTask = await request.agent.create(getContext(), downloadConfig);
          valuesBuket.taskId = downloadTask.tid;
          valuesBuket.status = DownloadStatus.RUNNING;
          let progressCallback = (progress: request.agent.Progress) => {
            DownloadManager
              .progressCallback(valuesBuket, progress,
                predicates as relationalStore.RdbPredicates,
              );
          }
          let completedCallback = (progress: request.agent.Progress) => {
            DownloadManager
              .completedCallback(valuesBuket, progress, downloadTask,
                predicates as relationalStore.RdbPredicates);
          };
          let pauseCallback = (progress: request.agent.Progress) => {
            DownloadManager
              .pausedCallback(valuesBuket, progress,
                predicates as relationalStore.RdbPredicates);

          }
          let resumeCallback = (progress: request.agent.Progress) => {
            DownloadManager
              .resumeCallback(valuesBuket, progress,
                predicates as relationalStore.RdbPredicates);

          }
          let failedCallback = (progress: request.agent.Progress) => {
            DownloadManager
              .failedCallback(valuesBuket, progress,
                predicates as relationalStore.RdbPredicates);
          }
          //四种状态
          downloadTask.on('progress', progressCallback)
          downloadTask.on('completed', completedCallback);
          downloadTask.on('pause', pauseCallback);
          downloadTask.on('resume', resumeCallback);
          downloadTask.on('failed', failedCallback)
          await downloadTask.start();
        }
      } catch (err) {
        console.error(`task  err, err  = ${JSON.stringify(err)}`);
      }
    } else {
      promptAction.showToast({
        message: '网络不给力～'
      })
    }
  }
}
```
### 下载观看Demo演示效果
[点击下载视频](https://github.com/yrjwcharm/ohos_library/raw/refs/heads/feature/ohos/fileDownload/demo/demo_1.mp4)

#### 更多详情效果案例展示：https://github.com/yrjwcharm/ohos_library/tree/feature/ohos/fileDownload
