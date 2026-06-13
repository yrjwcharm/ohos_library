import { request } from '@kit.BasicServicesKit';
import { DownloadManager } from '../downloadmanager/DownloadManager';
import { relationalStore, ValuesBucket } from '@kit.ArkData';
import { connection } from '@kit.NetworkKit';
import { promptAction } from '@kit.ArkUI';
import { SqliteHelper } from '../db/SqliteHelper';
import { DownloadStatus } from '../constants/DownloadStatus';
import { ENV } from './ENV';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { FileUtil } from './FileUtil';
import { FileDownloader } from '../model/FileDownloader';

let previousSeconds = 0;
export class DownloaderUtil {
  private static latestOperateAt: Map<string, number> = new Map();

  private static canOperate(downloadId: string): boolean {
    const currentSeconds = Date.now();
    const previous = DownloaderUtil.latestOperateAt.get(downloadId) ?? 0;
    if (currentSeconds - previous < 800) {
      ENV.__DEV__ && console.log('已经在下了...请勿频繁操作');
      return false;
    }
    DownloaderUtil.latestOperateAt.set(downloadId, currentSeconds);
    return true;
  }

  private static getDownloadUrl(url: string): string {
    try {
      return decodeURIComponent(url);
    } catch (e) {
      return url;
    }
  }

  private static getFileName(url: string, downloadId: string): string {
    let fileName = url.substring(url.lastIndexOf('/') + 1);
    const queryIndex = fileName.indexOf('?');
    if (queryIndex > -1) {
      fileName = fileName.substring(0, queryIndex);
    }
    return fileName.length > 0 ? fileName : downloadId;
  }

  private static async prepareBreakpointCache(downloadInfo: FileDownloader) {
    const begins = downloadInfo.begins ?? 0;
    if (begins <= 0) {
      return;
    }
    const url = DownloaderUtil.getDownloadUrl(downloadInfo.url);
    const fileName = downloadInfo.fileName && downloadInfo.fileName.length > 0 ? downloadInfo.fileName :
      DownloaderUtil.getFileName(url, downloadInfo.downloadId);
    const srcPath = FileUtil.joinPath(getContext().filesDir, downloadInfo.downloadId);
    const dstPath = FileUtil.joinPath(FileUtil.joinPath(getContext().filesDir, 'tmp'), downloadInfo.downloadId);
    const tmpFilePath = FileUtil.joinPath(dstPath, fileName);
    if (FileUtil.getFileSize(tmpFilePath) >= begins) {
      return;
    }
    FileUtil.writeTmpBytes(srcPath, dstPath, fileName, downloadInfo.exitFrequency, downloadInfo.status);
  }

  static deleteTask = async (downloadTask: request.agent.Task) => {
    try {
      downloadTask.off('progress');
      downloadTask.off('completed');
      downloadTask.off('pause');
      downloadTask.off('resume');
      downloadTask.off('failed');
      console.log('remove task', downloadTask.tid)
      await request.agent.remove(downloadTask.tid);

    } catch (err) {
      console.error(`deleteTask fail, err= ${JSON.stringify(err)}`);
    }
  }

  //退出应用程序后，由于task处于游离状态，此时使用request.agent.getTask()方法控制暂停与恢复是不会走响应回调的
  //所以App一般都是在应用退出前比如onDestroy做状态保留，但其实如果数据库包含异步操作的话，用async destroy()也不好使。比较可行的方法每次进来都处于暂停状态
  public static async persistActiveDownloads(): Promise<boolean> {
    let predicates = new relationalStore.RdbPredicates(SqliteHelper.tableName);
    predicates.equalTo('status', DownloadStatus.RUNNING)
    let list = await SqliteHelper.getInstance(getContext()).queryData(predicates)
    let promiseArr =list.map(item=>DownloaderUtil.pauseDownloadWithBreakpoint(item))
    const numbers = await Promise.all(promiseArr);
    return numbers.every(item=>item===1);
  }

  public static async resumeBackgroundPausedDownloads(userId?: string): Promise<void> {
    let predicates = new relationalStore.RdbPredicates(SqliteHelper.tableName);
    if (userId) {
      predicates.equalTo('userId', userId).and();
    }
    predicates.equalTo('status', DownloadStatus.PAUSE).and().equalTo('isBackgroundPause', 1);
    let list = await SqliteHelper.getInstance(getContext()).queryData(predicates);
    for (let i = 0; i < list.length; i++) {
      await DownloaderUtil.resume(list[i]);
    }
  }

  private static  async pauseDownloadWithBreakpoint(item:FileDownloader):Promise<number>{
    let predicates = new relationalStore.RdbPredicates(SqliteHelper.tableName);
    const netIsAvailable = await connection.hasDefaultNet();
    try {
      let task = await request.agent.getTask(getContext(), item.taskId);
      await DownloaderUtil.deleteTask(task);
    } catch (e) {
      ENV.__DEV__ && hilog.error(0x0000, "移除下载任务时出现异常", "%{public}s", e.message);
    } finally {
      const fileName = item.fileName && item.fileName.length > 0 ? item.fileName :
        DownloaderUtil.getFileName(DownloaderUtil.getDownloadUrl(item.url), item.downloadId);
      item.fileName = fileName;
      item.filePath = FileUtil.joinPath(getContext().filesDir, item.downloadId);
      let srcPath = FileUtil.joinPath(getContext().filesDir, item.downloadId);
      let dstPath = FileUtil.joinPath(FileUtil.joinPath(getContext().filesDir, "tmp"), item.downloadId);
      FileUtil.writeTmpBytes(srcPath, dstPath, fileName, item.exitFrequency,item.status)
      let breakpointSize = FileUtil.getFileSize(FileUtil.joinPath(dstPath, fileName));
      let exitFrequency: number;
      if (netIsAvailable) {
        exitFrequency = (item?.exitFrequency ?? 1) + 1;
      } else {
        exitFrequency = item?.exitFrequency ?? 1;
      }
      predicates.equalTo('userId', item.userId).and().equalTo('downloadId', item.downloadId);
      DownloaderUtil.sendEventEmitter(item,breakpointSize,exitFrequency);
      return await SqliteHelper.getInstance(getContext()).update({
        'status': DownloadStatus.PAUSE,
        'downloadSize': breakpointSize,
        'begins': breakpointSize,
        isBackgroundPause: 1,
        exitFrequency,
      }, predicates)
    }
  }
  private static sendEventEmitter(item:FileDownloader,begins:number, exitFrequency:number){
    DownloadManager.eventEmitter(DownloadManager.eventName,{
      userId: item.userId,
      url: item.url,
      downloadId:item.downloadId,
      taskId:item.taskId as string,
      downloadSize:begins,
      fileSize: item.fileSize as number,
      status:DownloadStatus.PAUSE,
      filePath:item.filePath as string,
      fileName:item.fileName as string,
      begins,
      isBackgroundPause: 1,
      exitFrequency,
    })
  }
  static async pause(taskId: string): Promise<void> {
    //暂停下载 调用Api触发暂停 更改数据库状态为0
    if (!taskId) {
      return;
    }
    try {
      const task = await request.agent.getTask(getContext(), taskId);
      await task.pause();
    } catch (e) {
      console.error(`deleteTask fail, err= ${JSON.stringify(e)}`);
    }
  }

  static async resume(downloadInfo: FileDownloader): Promise<void> {
    //恢复下载有两种情况 没有退出当前应用程序/ 退出应用程序杀死进程两种
    try {
      if (!downloadInfo.taskId) {
        await DownloaderUtil.prepareBreakpointCache(downloadInfo);
        await DownloaderUtil.downloadFile(downloadInfo);
        return;
      }
      const task = await request.agent.getTask(getContext(), downloadInfo.taskId);
      await task.resume();
    } catch (e) {
      //21900007 任务挂掉了/代表应用杀掉后重新进来的 ｜ https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-request#section21900007
      // aboutToAppear已经获取到要从哪开始下载的字节 begins 所以直接启动下载，和之前退出应用程序的那部分字节进行合并，
      // 统一放到一个文件中，这部分库中已经实现。无需手动处理
      if (e.code === 21900007) {
        await DownloaderUtil.prepareBreakpointCache(downloadInfo);
        await DownloaderUtil.downloadFile(downloadInfo);
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
         FileUtil.removePath(list[0].filePath??'');
         FileUtil.removePath(FileUtil.joinPath(FileUtil.joinPath(getContext().filesDir, 'tmp'), list[0].downloadId));
         if (FileUtil.getDirectorySize(FileUtil.joinPath(getContext().filesDir, 'tmp')) === 0) {
           FileUtil.removePath(FileUtil.joinPath(getContext().filesDir, 'tmp'));
         }
         if (list[0].status !== DownloadStatus.COMPLETED && list[0].taskId) {
           try {
             const task = await request.agent.getTask(getContext(), list[0].taskId);
             await DownloaderUtil.deleteTask(task);
           } catch (e) {
             ENV.__DEV__ && console.error(`deleteTask fail, err= ${JSON.stringify(e)}`);
           }
         }
       }
       let number = await SqliteHelper.getInstance(getContext()).delete(predicates);
       await DownloaderUtil.startNextWaiting(userId);
       resolve(number);
     } catch (e) {
       resolve(0)
     }
   })
  }
  //统一下载封装 //tips: 这里提供范型支持【没有用Model实体类，请注意，觉得用接口更容易描述】 强制约束类型为FileDownloader，建议提前转化数据结构使用 isBatchInsertQueue此参数只针对全部下载[目前暂时用不到，后续会完善全部下载等功能]-进行排队。非必穿默认false
  static async downloadFile<T extends FileDownloader>(data: T, isBatchInsertQueue?: boolean) {
    if (!data.userId || !data.downloadId || !data.url) {
      ENV.__DEV__ && console.error('下载参数缺失，至少需要 userId、downloadId、url');
      return;
    }
    if (!isBatchInsertQueue && !DownloaderUtil.canOperate(data.downloadId)) {
      return;
    }
    const netIsAvailable = await connection.hasDefaultNet();
    if (netIsAvailable) {
      let url = DownloaderUtil.getDownloadUrl(data.url)
      let downloadId = data.downloadId;
      let fileName = data.fileName && data.fileName.length > 0 ? data.fileName :
        DownloaderUtil.getFileName(url, downloadId);
      let filePath = FileUtil.joinPath(getContext().filesDir, downloadId)
      let savePath = FileUtil.joinPath(filePath, fileName)
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
          'filePath': filePath,
          'fileName': fileName,
          'downloadSize': data.downloadSize ?? data.begins ?? 0,
          "begins": data.begins ?? 0
        }
        valuesBuket.fileSize = data.fileSize ?? 0
        let predicates = new relationalStore.RdbPredicates(SqliteHelper.tableName);
        predicates.equalTo('userId', data.userId).and().equalTo('downloadId', data.downloadId)
        if (isBatchInsertQueue) {
          valuesBuket.status = DownloadStatus.WAITING;
          let list = await SqliteHelper.getInstance(getContext()).queryData(predicates);
          if (list.length === 0) {
            await SqliteHelper.getInstance(getContext())
              .insert(SqliteHelper.tableName, valuesBuket);
          } else {
            await SqliteHelper.getInstance(getContext()).update(valuesBuket, predicates);
          }
          DownloadManager.eventEmitter(DownloadManager.eventName, valuesBuket);
        } else {
          await DownloaderUtil.prepareBreakpointCache(data);
          let downloadTask = await request.agent.create(getContext(), downloadConfig);
          valuesBuket.taskId = downloadTask.tid;
          valuesBuket.status = DownloadStatus.RUNNING;
          const updateCount = await SqliteHelper.getInstance(getContext()).update(valuesBuket, predicates);
          if (updateCount === 0) {
            await SqliteHelper.getInstance(getContext()).insert(SqliteHelper.tableName, valuesBuket);
          }
          DownloadManager.eventEmitter(DownloadManager.eventName, valuesBuket);
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
        console.error(`异常信息——task  err, err  = ${JSON.stringify(err)}`);
      }
    } else {
      promptAction.showToast({
        message: '网络不给力～'
      })
    }
  }
  //批量插入数据
  static  matchInsert<T extends  FileDownloader>(data:T[]):Promise<number>{
    return new Promise(async (resolve)=>{
      try {
        if (data.length === 0) {
          resolve(0);
          return;
        }
        //基于双重保险
        const currentSeconds = Date.now();
        if (currentSeconds - previousSeconds < 2500) {
          ENV.__DEV__&&console.log('已经在下了...请勿频繁操作');
          resolve(0);
          return
        }
        previousSeconds = currentSeconds
        const userId = data[0].userId;
        let predicates = new relationalStore.RdbPredicates(SqliteHelper.tableName);
        predicates.equalTo('userId', userId)
          .and()
          .notEqualTo('status', DownloadStatus.COMPLETED)
          .and()
          .notEqualTo('status', DownloadStatus.RUNNING)
        let filterList = await SqliteHelper.getInstance(getContext()).queryData(predicates);
        let promiseArr = filterList.map((item): Promise<number> => DownloaderUtil.batchDelete(item));
        await Promise.all(promiseArr);
        let allDownload =
          data.filter(item => ![DownloadStatus.COMPLETED, DownloadStatus.RUNNING].includes(item.status ??
          DownloadStatus.WAITING));
        if (allDownload.length === 0) {
          resolve(1);
          return;
        }
        let list = allDownload.map(item => {
          const url = DownloaderUtil.getDownloadUrl(item.url);
          const fileName = item.fileName && item.fileName.length > 0 ? item.fileName :
            DownloaderUtil.getFileName(url, item.downloadId);
          return {
            userId: item.userId,
            url: url,
            status: DownloadStatus.WAITING,
            downloadId: item.downloadId,
            filePath: FileUtil.joinPath(getContext().filesDir, item.downloadId),
            fileName: fileName,
            fileSize: item.fileSize ?? 0,
            downloadSize: item.downloadSize ?? 0,
            begins: item.begins ?? 0,
          } as ValuesBucket;
        })
        for(let i =0;i<list.length;i++) {
          DownloadManager.eventEmitter(DownloadManager.eventName, list[i]);
        }
        SqliteHelper.getInstance(getContext()).batchInsert(SqliteHelper.tableName, list).then(async () => {
          await DownloaderUtil.startNextWaiting(userId);
          resolve(1);
        }).catch(() => {
          resolve(0);
        })
      }catch (e) {
        resolve(0);
      }
    })
  }
  private static  async  batchDelete(item:FileDownloader){
    let predicates = new relationalStore.RdbPredicates(SqliteHelper.tableName);
    predicates.equalTo('userId', item.userId).and().equalTo('downloadId',item.downloadId);
   return  await  SqliteHelper.getInstance(getContext()).delete(predicates);
  }

  public static async startNextWaiting(userId: string): Promise<void> {
    if (!userId) {
      return;
    }
    let runningPredicates = new relationalStore.RdbPredicates(SqliteHelper.tableName);
    runningPredicates.equalTo('userId', userId).and().equalTo('status', DownloadStatus.RUNNING);
    let runningList = await SqliteHelper.getInstance(getContext()).queryData(runningPredicates);
    if (runningList.length > 0) {
      return;
    }
    let waitingPredicates = new relationalStore.RdbPredicates(SqliteHelper.tableName);
    waitingPredicates.equalTo('userId', userId).and().equalTo('status', DownloadStatus.WAITING);
    let waitingList = await SqliteHelper.getInstance(getContext()).queryData(waitingPredicates);
    if (waitingList.length === 0) {
      return;
    }
    await DownloaderUtil.downloadFile(waitingList[0]);
  }
}
