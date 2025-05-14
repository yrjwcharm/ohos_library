import { request } from '@kit.BasicServicesKit';
import { relationalStore, ValuesBucket } from '@kit.ArkData';
import { SqliteHelper } from '../db/SqliteHelper';
import { DownloadStatus } from '../constants/DownloadStatus';
import { promptAction } from '@kit.ArkUI';
import { DownloaderUtil } from '../utils/DownloaderUtil';
import { FileUtil } from '../utils/FileUtil';
import { fileIo, } from '@kit.CoreFileKit';
import { connection } from '@kit.NetworkKit';

export class DownloadManager {
  //暂停所有缓存课程
  public static async exitPauseAll() {
    const netIsAvailable = await connection.hasDefaultNet();
    let predicates = new relationalStore.RdbPredicates('filedownloaderinfo');
    predicates.equalTo('status', 2).or().equalTo('status', 3).or().equalTo('status', 0)
    let list = await SqliteHelper.getInstance(getContext()).queryData(predicates)
    let newPredicate: relationalStore.RdbPredicates | undefined = undefined;
    for (let i = 0; i < list.length; i++) {
      try {
        newPredicate = new relationalStore.RdbPredicates('filedownloaderinfo');
        newPredicate.equalTo('downloadId', list[i].downloadId)
        newPredicate.equalTo('fileName', list[i].fileName);
        await request.agent.remove(list[i].taskId);
      } catch (e) {

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
        await SqliteHelper.getInstance(getContext()).update({
          'status': 0,
          'begins': buf.byteLength,
          isBackgroundPause: 1,
          exitFrequency,
        }, newPredicate as relationalStore.RdbPredicates)

      }
    }
  }

  //进度监听
  public static async progressCallback(valuesBuket: ValuesBucket, progress: request.agent.Progress,
    downloadTask: request.agent.Task,
    predicates: relationalStore.RdbPredicates,
    callback: (proceed: number, fileSize: number, status: number, downloadId: string,filePath?: string, fileName?: string) => void
  ) {
    if (progress.sizes[0] > -1) {
      valuesBuket.fileSize = progress.sizes[0] + (valuesBuket.begins as number);
      valuesBuket.downloadSize = progress.processed + (valuesBuket.begins as number);
      //判断当前下载任务是否已经在数据库中
      let list = await SqliteHelper.getInstance(getContext()).queryData(predicates);
      try {
        if (list.length > 0) {
          await SqliteHelper.getInstance(getContext()).update(valuesBuket, predicates);
        } else {
          await SqliteHelper.getInstance(getContext())
            .insert('filedownloaderinfo', valuesBuket);
        }
      } finally {
        callback(valuesBuket.downloadSize, valuesBuket.fileSize, valuesBuket.status as number,
          valuesBuket.downloadId as string, valuesBuket.filePath as string, valuesBuket.fileName as string, )
      }
    }
  }

  public static async completedCallback(valuesBuket: ValuesBucket, progress: request.agent.Progress,
    downloadTask: request.agent.Task,
    predicates: relationalStore.RdbPredicates,
    callback: (proceed: number, fileSize: number, status: number, downloadId: string, filePath?: string,fileName?: string,
      ) => void) {
    if (progress.sizes[0] > -1) {
      valuesBuket.fileSize = progress.sizes[0] + (valuesBuket.begins as number)
      valuesBuket.downloadSize = progress.processed + (valuesBuket.begins as number)
      valuesBuket.status = DownloadStatus.COMPLETED;
      valuesBuket.exitFrequency = 1;
      await SqliteHelper.getInstance(getContext()).update(valuesBuket, predicates)
      promptAction.showToast({
        message: "下载完成"
      })
      callback(valuesBuket.downloadSize, valuesBuket.fileSize, valuesBuket.status,
        valuesBuket.downloadId as string, valuesBuket.filePath as string,valuesBuket.fileName as string)
      FileUtil.deleteTmpFile(getContext(), valuesBuket.fileName as string, valuesBuket.downloadId as string);
      DownloaderUtil.deleteTask(downloadTask);
    }
  }

  public static async pausedCallback(valuesBuket: ValuesBucket, progress: request.agent.Progress,
    downloadTask: request.agent.Task,
    predicates: relationalStore.RdbPredicates,
    callback: (proceed: number, fileSize: number, status: number, downloadId: string,filePath?:string, fileName?: string,) => void,) {
    if (progress.sizes[0] > -1) {
      valuesBuket.fileSize = progress.sizes[0] + (valuesBuket.begins as number)
      valuesBuket.downloadSize = progress.processed + (valuesBuket.begins as number)
      valuesBuket.status = DownloadStatus.PAUSE;
      valuesBuket.isBackgroundPause = 0;
      valuesBuket.exitFrequency = 1;
      await SqliteHelper.getInstance(getContext()).update(valuesBuket, predicates)
      callback(valuesBuket.downloadSize, valuesBuket.fileSize, valuesBuket.status,
        valuesBuket.downloadId as string,
        valuesBuket.filePath as string, valuesBuket.fileName as string,)

    }
  }

  public static async resumeCallback(valuesBuket: ValuesBucket, progress: request.agent.Progress,
    downloadTask: request.agent.Task,
    predicates: relationalStore.RdbPredicates,
    callback: (proceed: number, fileSize: number, status: number, downloadId: string,
      filePath?: string,fileName?: string) => void,) {
    if (progress.sizes[0] > -1) {
      valuesBuket.fileSize = progress.sizes[0] + (valuesBuket.begins as number)
      valuesBuket.downloadSize = progress.processed + (valuesBuket.begins as number)
      valuesBuket.status = DownloadStatus.RUNNING;
      await SqliteHelper.getInstance(getContext()).update(valuesBuket, predicates)
      callback(valuesBuket.downloadSize, valuesBuket.fileSize, valuesBuket.status,
        valuesBuket.downloadId as string,valuesBuket.filePath as string,valuesBuket.fileName as string, )
    }
  }

  public static async failedCallback(valuesBuket: ValuesBucket, progress: request.agent.Progress,
    downloadTask: request.agent.Task,
    predicates: relationalStore.RdbPredicates,
    callback: (proceed: number, fileSize: number, status: number, downloadId: string,
      filePath?: string,fileName?:string) => void,
  ) {
    valuesBuket.downloadSize = progress.processed + (valuesBuket.begins as number);
    let list = await SqliteHelper.getInstance(getContext()).queryData(predicates);
    valuesBuket.fileSize = list[0].fileSize??0;
    valuesBuket.status = DownloadStatus.FAILED;
    valuesBuket.begins = 0;
    await SqliteHelper.getInstance(getContext()).update(valuesBuket, predicates)
    DownloaderUtil.deleteTask(downloadTask);
    callback(valuesBuket.downloadSize, valuesBuket.fileSize, valuesBuket.status,
      valuesBuket.downloadId as string, valuesBuket.filePath as string,valuesBuket.fileName as string,)
  }
}