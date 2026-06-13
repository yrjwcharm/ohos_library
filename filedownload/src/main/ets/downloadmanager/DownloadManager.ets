import {request } from '@kit.BasicServicesKit';
import { relationalStore, ValuesBucket } from '@kit.ArkData';
import { SqliteHelper } from '../db/SqliteHelper';
import { DownloadStatus } from '../constants/DownloadStatus';
import { promptAction } from '@kit.ArkUI';
import { DownloaderUtil } from '../utils/DownloaderUtil';
import { FileUtil } from '../utils/FileUtil';
import { ENV } from '../utils/ENV';
import { FileDownloader } from '../model/FileDownloader';

export class DownloadManager {
  public  static readonly  eventName:string="GeneralDownloadListenerCallback"

  private static getBegin(valuesBuket: ValuesBucket): number {
    return (valuesBuket.begins as number) ?? 0;
  }

  private static applyProgress(valuesBuket: ValuesBucket, progress: request.agent.Progress) {
    const begins = DownloadManager.getBegin(valuesBuket);
    const downloadSize = begins + progress.processed;
    const knownFileSize = (valuesBuket.fileSize as number) ?? 0;
    valuesBuket.downloadSize = downloadSize;
    if (knownFileSize > 0) {
      valuesBuket.fileSize = knownFileSize;
    } else if (progress.sizes[0] > -1) {
      valuesBuket.fileSize = progress.sizes[0] + begins;
    }
  }

  private static async upsert(valuesBuket: ValuesBucket, predicates: relationalStore.RdbPredicates) {
    const updateCount = await SqliteHelper.getInstance(getContext()).update(valuesBuket, predicates);
    if (updateCount === 0) {
      await SqliteHelper.getInstance(getContext()).insert(SqliteHelper.tableName, valuesBuket);
    }
  }

  //进度监听
  public  static async progressCallback(valuesBuket: ValuesBucket, progress: request.agent.Progress,
    predicates: relationalStore.RdbPredicates,
  ) {
   ENV.__DEV__&& console.log('进度更新监听...',progress.sizes[0],progress.processed)
    if (progress.sizes[0] > -1 || ((valuesBuket.fileSize as number) ?? 0) > 0) {
      DownloadManager.applyProgress(valuesBuket, progress);
      DownloadManager.eventEmitter(DownloadManager.eventName, valuesBuket);
      try {
        await DownloadManager.upsert(valuesBuket, predicates);
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
      if (progress.sizes[0] > -1 || ((valuesBuket.fileSize as number) ?? 0) > 0) {
        DownloadManager.applyProgress(valuesBuket, progress);
        valuesBuket.status = DownloadStatus.COMPLETED;
        valuesBuket.exitFrequency = 1;
        valuesBuket.begins = 0;
        if (((valuesBuket.fileSize as number) ?? 0) > 0) {
          valuesBuket.downloadSize = valuesBuket.fileSize;
        }
        DownloadManager.eventEmitter(DownloadManager.eventName, valuesBuket);
        await DownloadManager.upsert(valuesBuket, predicates)
        promptAction.showToast({
          message: "下载完成"
        })
        FileUtil.deleteTmpFile(getContext(), valuesBuket.fileName as string, valuesBuket.downloadId as string);
        await DownloaderUtil.deleteTask(downloadTask);
        await DownloaderUtil.startNextWaiting(valuesBuket.userId as string);
      }
    }catch (e) {
      ENV.__DEV__&&console.error("完成下载回调出现异常：", e.message);
    }
  }

  public static async pausedCallback(valuesBuket: ValuesBucket, progress: request.agent.Progress,
    predicates: relationalStore.RdbPredicates,
  ) {
    try{
    if (progress.sizes[0] > -1 || ((valuesBuket.fileSize as number) ?? 0) > 0) {
      DownloadManager.applyProgress(valuesBuket, progress);
      let pausedValuesBuket: ValuesBucket = {
        userId: valuesBuket.userId,
        url: valuesBuket.url,
        downloadId: valuesBuket.downloadId,
        taskId: valuesBuket.taskId,
        filePath: valuesBuket.filePath,
        fileName: valuesBuket.fileName,
        fileSize: valuesBuket.fileSize,
        downloadSize: valuesBuket.downloadSize,
        begins: valuesBuket.downloadSize,
        status: DownloadStatus.PAUSE,
        isBackgroundPause: 0,
        exitFrequency: 1,
      }
      DownloadManager.eventEmitter(DownloadManager.eventName, pausedValuesBuket);
      await DownloadManager.upsert(pausedValuesBuket, predicates)
    }
    }catch (e) {
      ENV.__DEV__&&  console.error("暂停下载回调出现异常：", e.message);
    }
  }

  public static async resumeCallback(valuesBuket: ValuesBucket, progress: request.agent.Progress,
    predicates: relationalStore.RdbPredicates,
  ) {
    try{
    if (progress.sizes[0] > -1 || ((valuesBuket.fileSize as number) ?? 0) > 0) {
      DownloadManager.applyProgress(valuesBuket, progress);
      valuesBuket.status = DownloadStatus.RUNNING;
      DownloadManager.eventEmitter(DownloadManager.eventName, valuesBuket);
      await DownloadManager.upsert(valuesBuket, predicates)
    }
    }catch (e) {
      ENV.__DEV__&& console.error("恢复下载回调出现异常：", e.message);
    }
  }

  public static async failedCallback(valuesBuket: ValuesBucket, progress: request.agent.Progress,
    predicates: relationalStore.RdbPredicates,
  ) {
    try {
      DownloadManager.applyProgress(valuesBuket, progress);
      let list = await SqliteHelper.getInstance(getContext()).queryData(predicates);
      valuesBuket.fileSize = list[0]?.fileSize ?? valuesBuket.fileSize ?? 0;
      valuesBuket.status = DownloadStatus.FAILED;
      valuesBuket.begins = valuesBuket.downloadSize;
      DownloadManager.eventEmitter(DownloadManager.eventName, valuesBuket);
      await DownloadManager.upsert(valuesBuket, predicates)
      try {
        let task =await request.agent.getTask(getContext(),valuesBuket.taskId as string);
        await DownloaderUtil.deleteTask(task);
      } catch (e) {
        ENV.__DEV__&& console.error("移除失败下载任务出现异常：", e.message);
      }
      await DownloaderUtil.startNextWaiting(valuesBuket.userId as string);
    }catch (e) {
      ENV.__DEV__&& console.error("下载失败回调出现异常：", e.message);

    }
  }
  //因为数据库查询操作（从硬盘读取）本身就是比较耗时的，更何况频繁查询数据呢，这里进行了优化，把所有的监听统一回调统一放置于事件监听中，
  //事件监听基于发布订阅模式，我们直接从内存中读取，提升性能
  public static  addListener(eventName:string,callback:(download:FileDownloader)=>void){
    getContext().eventHub.on(eventName,callback);
  }
  public static  removeListener(eventName:string,callback?:(download:FileDownloader)=>void){
    getContext().eventHub.off(eventName,callback);
  }
  public  static eventEmitter(eventName:string,valuesBuket:ValuesBucket){
    try {
      getContext().eventHub.emit(eventName,{
        userId: valuesBuket.userId,
        url: valuesBuket.url,
        downloadId: valuesBuket.downloadId,
        taskId:valuesBuket.taskId,
        downloadSize:valuesBuket.downloadSize??0,
        fileSize: valuesBuket.fileSize??0,
        status:valuesBuket.status,
        filePath:valuesBuket.filePath??'',
        fileName:valuesBuket.fileName ??'',
        begins:valuesBuket.begins ??0,
        isBackgroundPause:valuesBuket.isBackgroundPause??1,
        exitFrequency :valuesBuket.exitFrequency??1
      })
    } catch (e) {
      ENV.__DEV__&& console.error("EventHub emit error：", e.message);
    }
  }
}
