import { BusinessError, request } from '@kit.BasicServicesKit';
import { relationalStore, ValuesBucket } from '@kit.ArkData';
import { SqliteHelper } from '../db/SqliteHelper';
import { DownloadStatus } from '../constants/DownloadStatus';
import { promptAction } from '@kit.ArkUI';
import { DownloaderUtil } from '../utils/DownloaderUtil';
import { FileUtil } from '../utils/FileUtil';
import { fileIo, } from '@kit.CoreFileKit';
import { connection } from '@kit.NetworkKit';
import { IFileDownloader } from '../interface/IFileDownloader';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { ENV } from '../utils/ENV';

export class DownloadManager {
  public  static readonly  eventName:string="GeneralDownloadListenerCallback"
  //退出应用程序后，由于task处于游离状态，此时使用request.agent.getTask()方法控制暂停与恢复是不会走响应回调的
  //所以App一般都是在应用退出前比如onDestroy做状态保留，但其实如果数据库包含异步操作的话，用async destroy()也不好使。比较可行的方法每次进来都处于暂停状态
  public static async persistMergeFileStorage() {
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

  //进度监听
  public static async progressCallback(valuesBuket: ValuesBucket, progress: request.agent.Progress,
    predicates: relationalStore.RdbPredicates,
  ) {
    console.log('进度更新监听...',progress.sizes[0],progress.processed)
    if (progress.sizes[0] > -1) {
      valuesBuket.fileSize = progress.sizes[0] + (valuesBuket.begins as number);
      valuesBuket.downloadSize = progress.processed + (valuesBuket.begins as number);
      DownloadManager.eventEmitter(valuesBuket);
      //判断当前下载任务是否已经在数据库中
      let list = await SqliteHelper.getInstance(getContext()).queryData(predicates);
      try {
        if (list.length > 0) {
          await SqliteHelper.getInstance(getContext()).update(valuesBuket, predicates);
        } else {
          await SqliteHelper.getInstance(getContext())
            .insert(SqliteHelper.tableName, valuesBuket);
        }
      }catch (e) {
        ENV.__DEV__&&console.error("下载进度监听回调出现异常：", e.message);
      }
    }
  }

  public static async completedCallback(valuesBuket: ValuesBucket, progress: request.agent.Progress,
    downloadTask: request.agent.Task,
    predicates: relationalStore.RdbPredicates,
  ) {
    try {
      if (progress.sizes[0] > -1) {
        valuesBuket.fileSize = progress.sizes[0] + (valuesBuket.begins as number)
        valuesBuket.downloadSize = progress.processed + (valuesBuket.begins as number)
        valuesBuket.status = DownloadStatus.COMPLETED;
        valuesBuket.exitFrequency = 1;
        DownloadManager.eventEmitter(valuesBuket);
        await SqliteHelper.getInstance(getContext()).update(valuesBuket, predicates)
        promptAction.showToast({
          message: "下载完成"
        })
        FileUtil.deleteTmpFile(getContext(), valuesBuket.fileName as string, valuesBuket.downloadId as string);
        DownloaderUtil.deleteTask(downloadTask);
      }
    }catch (e) {
      ENV.__DEV__&&console.error("完成下载回调出现异常：", e.message);
    }
  }

  public static async pausedCallback(valuesBuket: ValuesBucket, progress: request.agent.Progress,
    predicates: relationalStore.RdbPredicates,
  ) {
    try{
    if (progress.sizes[0] > -1) {
      valuesBuket.fileSize = progress.sizes[0] + (valuesBuket.begins as number)
      valuesBuket.downloadSize = progress.processed + (valuesBuket.begins as number)
      valuesBuket.status = DownloadStatus.PAUSE;
      valuesBuket.isBackgroundPause = 0;
      valuesBuket.exitFrequency = 1;
      DownloadManager.eventEmitter(valuesBuket);
      await SqliteHelper.getInstance(getContext()).update(valuesBuket, predicates)
    }
    }catch (e) {
      ENV.__DEV__&&  console.error("暂停下载回调出现异常：", e.message);
    }
  }

  public static async resumeCallback(valuesBuket: ValuesBucket, progress: request.agent.Progress,
    predicates: relationalStore.RdbPredicates,
  ) {
    try{
    if (progress.sizes[0] > -1) {
      valuesBuket.fileSize = progress.sizes[0] + (valuesBuket.begins as number)
      valuesBuket.downloadSize = progress.processed + (valuesBuket.begins as number)
      valuesBuket.status = DownloadStatus.RUNNING;
      DownloadManager.eventEmitter(valuesBuket);
      await SqliteHelper.getInstance(getContext()).update(valuesBuket, predicates)
    }
    }catch (e) {
      ENV.__DEV__&& console.error("恢复下载回调出现异常：", e.message);
    }
  }

  public static async failedCallback(valuesBuket: ValuesBucket, progress: request.agent.Progress,
    predicates: relationalStore.RdbPredicates,
  ) {
    try {
      valuesBuket.downloadSize = progress.processed + (valuesBuket.begins as number);
      let list = await SqliteHelper.getInstance(getContext()).queryData(predicates);
      valuesBuket.fileSize = list[0]?.fileSize ?? 0;
      valuesBuket.status = DownloadStatus.FAILED;
      valuesBuket.begins = 0;
      DownloadManager.eventEmitter(valuesBuket);
      await SqliteHelper.getInstance(getContext()).update(valuesBuket, predicates)
      let task =await request.agent.getTask(getContext(),valuesBuket.taskId as string);
      DownloaderUtil.deleteTask(task);
    }catch (e) {
      ENV.__DEV__&& console.error("下载失败回调出现异常：", e.message);

    }
  }
  public static  addListener(eventName:string,callback:(download:IFileDownloader)=>void){
    getContext().eventHub.on(eventName,callback);
  }
  public static  removeListener(eventName:string,callback?:(download:IFileDownloader)=>void){
    getContext().eventHub.off(eventName,callback);
  }
  private static eventEmitter(valuesBuket:ValuesBucket){
    try {
      getContext().eventHub.emit(DownloadManager.eventName,{
        userId: valuesBuket.userId as string,
        url: valuesBuket.url as string,
        downloadId: valuesBuket.downloadId as string,
        taskId:valuesBuket.tid as string,
        downloadSize:valuesBuket.downloadSize,
        fileSize: valuesBuket.fileSize,
        status:valuesBuket.status as number,
        filePath:valuesBuket.filePath as string,
        fileName:valuesBuket.fileName as string
      })
    } catch (e) {
      ENV.__DEV__&& console.error("EventHub emit error：", e.message);
    }
  }
}