import { BusinessError, request } from '@kit.BasicServicesKit';
import { DownloadManager } from '../downloadmanager/DownloadManager';
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
  public static async persistMergeFileStorage(): Promise<void> {
    const netIsAvailable = await connection.hasDefaultNet();
    let predicates = new relationalStore.RdbPredicates(SqliteHelper.tableName);
    predicates.equalTo('status', DownloadStatus.RUNNING)
    let list = await SqliteHelper.getInstance(getContext()).queryData(predicates)
    for (let i = 0; i < list.length; i++) {
      try {
        let task = await request.agent.getTask(getContext(), list[i].taskId);
        await DownloaderUtil.deleteTask(task);
      } catch (e) {
        ENV.__DEV__ && hilog.error(0x0000, "移除下载任务时出现异常", "%{public}s", e.message);
      } finally {
        let srcPath = getContext().cacheDir + "/" + list[i].downloadId;
        let dstPath = getContext().cacheDir + "/tmp/" + list[i].downloadId;
        FileUtil.writeTmpBytes(srcPath, dstPath, list[i]?.fileName ?? '', list[i].exitFrequency, list[i].status)
        let file = fileIo.openSync(dstPath + '/' + list[i].fileName,
          fileIo.OpenMode.READ_WRITE);
        let buf = new ArrayBuffer(fileIo.statSync(file.fd).size);
        fileIo.readSync(file.fd, buf);
        fileIo.closeSync(file);
        let exitFrequency: number;
        if (netIsAvailable) {
          exitFrequency = list[i]?.exitFrequency ?? 1 + 1;
        } else {
          exitFrequency = list[i]?.exitFrequency ?? 1;
        }
        predicates.and().equalTo('downloadId', list[i].downloadId);
        await SqliteHelper.getInstance(getContext()).update({
          'status': 0,
          'begins': buf.byteLength,
          isBackgroundPause: 1,
          exitFrequency,
        }, predicates)
      }
    }
  }

  static async pause(taskId: string): Promise<void> {
    //暂停下载 调用Api触发暂停 更改数据库状态为0
    try {
      const task = await request.agent.getTask(getContext(), taskId);
      await task.pause();
    } catch (e) {
      console.error(`deleteTask fail, err= ${JSON.stringify(e)}`);
    }
  }

  static async resume(downloadInfo: IFileDownloader): Promise<void> {
    //恢复下载有两种情况 没有退出当前应用程序/ 退出应用程序杀死进程两种
    try {
      const task = await request.agent.getTask(getContext(), downloadInfo.taskId);
      await task.resume();
    } catch (e) {
      //21900007 任务挂掉了/代表应用杀掉后重新进来的 ｜ https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-request#section21900007
      // aboutToAppear已经获取到要从哪开始下载的字节 begins 所以直接启动下载，和之前退出应用程序的那部分字节进行合并，
      // 统一放到一个文件中，这部分库中已经实现。无需手动处理
      if (e.code === 21900007) {
        DownloaderUtil.downloadFile(downloadInfo);
      }
    }
  }

  //调用删除方法即取消下载 【删除数据库下载记录 ，并删除文件系统已下载字节数】
  static async delete(userId: string, downloadId: string):Promise<number> {
   return new Promise(async (resolve)=>{
     try {
       let predicates = new relationalStore.RdbPredicates(SqliteHelper.tableName);
       predicates.equalTo('userId', userId).and().equalTo('downloadId',downloadId)
       let list = await SqliteHelper.getInstance(getContext()).queryData(predicates);
       if (list.length > 0) {
         fileIo.accessSync(list[0].filePath) && fileIo.rmdirSync(list[0].filePath)
         if (fileIo.accessSync(getContext().cacheDir + '/tmp/' + list[0].downloadId)) {
           fileIo.rmdirSync(getContext().cacheDir + '/tmp/' + list[0].downloadId)
         }
       }
       const task = await request.agent.getTask(getContext(), list[0].taskId);
       list[0].status !== 1 && DownloaderUtil.deleteTask(task);
       let number = await SqliteHelper.getInstance(getContext()).delete(predicates);
       resolve(number);
     } catch (e) {
       resolve(0)
     }
   })
  }
  //统一下载封装 //tips: 这里提供范型支持【没有用Model实体类，请注意，觉得用接口更容易描述】 强制约束类型为IFileDownloader，建议提前转化数据结构使用 isBatchInsertQueue此参数只针对全部下载[目前暂时用不到，后续会完善全部下载等功能]-进行排队。非必穿默认false
  static async downloadFile<T extends IFileDownloader>(data: T, isBatchInsertQueue?: boolean) {
    const netIsAvailable = await connection.hasDefaultNet();
    if (netIsAvailable) {
      let url = decodeURIComponent(data.url)
      let downloadId = data.downloadId;
      let fileName = url.substring(url.lastIndexOf('/') + 1);
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
        valuesBuket.fileSize = data.fileSize ?? 0
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
