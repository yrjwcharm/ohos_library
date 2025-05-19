import {request } from '@kit.BasicServicesKit';
import { relationalStore, ValuesBucket } from '@kit.ArkData';
import { SqliteHelper } from '../db/SqliteHelper';
import { DownloadStatus } from '../constants/DownloadStatus';
import { promptAction } from '@kit.ArkUI';
import { DownloaderUtil } from '../utils/DownloaderUtil';
import { FileUtil } from '../utils/FileUtil';
import { IFileDownloader } from '../interface/IFileDownloader';
import { ENV } from '../utils/ENV';

export class DownloadManager {
  public  static readonly  eventName:string="GeneralDownloadListenerCallback"
  //进度监听
  public  static async progressCallback(valuesBuket: ValuesBucket, progress: request.agent.Progress,
    predicates: relationalStore.RdbPredicates,
  ) {
   ENV.__DEV__&& console.log('进度更新监听...',progress.sizes[0],progress.processed)
    if (progress.sizes[0] > -1) {
      valuesBuket.fileSize = progress.sizes[0] + (valuesBuket.begins as number);
      valuesBuket.downloadSize = progress.processed + (valuesBuket.begins as number);
      DownloadManager.eventEmitter(DownloadManager.eventName, valuesBuket);
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
        DownloadManager.eventEmitter(DownloadManager.eventName, valuesBuket);
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
      DownloadManager.eventEmitter(DownloadManager.eventName, valuesBuket);
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
      DownloadManager.eventEmitter(DownloadManager.eventName, valuesBuket);
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
      DownloadManager.eventEmitter(DownloadManager.eventName, valuesBuket);
      await SqliteHelper.getInstance(getContext()).update(valuesBuket, predicates)
      let task =await request.agent.getTask(getContext(),valuesBuket.taskId as string);
      DownloaderUtil.deleteTask(task);
    }catch (e) {
      ENV.__DEV__&& console.error("下载失败回调出现异常：", e.message);

    }
  }
  //因为数据库查询操作（从硬盘读取）本身就是比较耗时的，更何况频繁查询数据呢，这里进行了优化，把所有的监听统一回调统一放置于事件监听中，
  //事件监听基于发布订阅模式，我们直接从内存中读取，提升性能
  public static  addListener(eventName:string,callback:(download:IFileDownloader)=>void){
    getContext().eventHub.on(eventName,callback);
  }
  public static  removeListener(eventName:string,callback?:(download:IFileDownloader)=>void){
    getContext().eventHub.off(eventName,callback);
  }
  public  static eventEmitter(eventName:string,valuesBuket:ValuesBucket){
    try {
      getContext().eventHub.emit(eventName,{
        userId: valuesBuket.userId as string,
        url: valuesBuket.url as string,
        downloadId: valuesBuket.downloadId as string,
        taskId:valuesBuket.taskId as string,
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