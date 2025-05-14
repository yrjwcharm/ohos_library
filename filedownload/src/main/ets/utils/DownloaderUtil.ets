import { request } from '@kit.BasicServicesKit';
import {DownloadManager } from '../downloadmanager/DownloadManager';
import { relationalStore, ValuesBucket } from '@kit.ArkData';
import { connection } from '@kit.NetworkKit';
import { promptAction } from '@kit.ArkUI';
import { SqliteHelper } from '../db/SqliteHelper';
import { DownloadStatus } from '../constants/DownloadStatus';
import { IFileDownloader } from '../interface/IFileDownloader';


export class DownloaderUtil {
  static deleteTask = (downloadTask: request.agent.Task) => {
    try {
      downloadTask.off('progress');
      downloadTask.off('completed');
      downloadTask.off('failed');
      console.log('remove task', downloadTask.tid)
      request.agent.remove(downloadTask.tid);

    } catch (err) {
      console.info(`deleteTask fail, err= ${JSON.stringify(err)}`);
    }
  }

  //统一下载封装 缓存课程与学习资料   如果是其他下载通用走学习资料即可 moduleType传2
  static async downloadFile(data: IFileDownloader,
    moduleType: number,
    isBatchInsertQueue: boolean,
    callback: (downloadSize: number, fileSize: number, status: number, downloadId: string, filePath?: string,fileName?: string,
      ) => void) {
    const netIsAvailable = await connection.hasDefaultNet();
    let maxSize: number = 0;
    if (netIsAvailable) {
        let url = decodeURIComponent(data.url as string)
        let downloadId = data.downloadId;
        let fileName = url.substring(url.lastIndexOf('/'))+1;
        let savePath =
          getContext().cacheDir + '/' + downloadId + '/' + fileName
        let downloadConfig: request.agent.Config = {
          action: request.agent.Action.DOWNLOAD,
          url: url as string,
          mode: request.agent.Mode.FOREGROUND,
          retry: true,
          network: request.agent.Network.ANY,
          saveas: savePath,
          // priority: i,
          overwrite: true,
          begins: data.begins ?? 0
        }
        try {
          let valuesBuket: ValuesBucket = {
            'userId': data.userId,
            'downloadId': downloadId, //必传
            'url': url as string, //必传
            'filePath': getContext().cacheDir + '/' + downloadId,
            'fileName': fileName,
            "begins": data.begins ?? 0
          }
          let predicates: relationalStore.RdbPredicates | undefined = undefined;
            valuesBuket.fileSize =data.fileSize??0
            valuesBuket.maxSize = maxSize; //接口返回的该课节下最大文件字节数
            predicates = new relationalStore.RdbPredicates('filedownloaderinfo');
            predicates.equalTo('userId', data.userId)
            predicates.equalTo('downloadId', data.downloadId)
          if (isBatchInsertQueue) {
            let list = await SqliteHelper.getInstance(getContext()).queryData(predicates);
            if (list.length === 0) {
                  await SqliteHelper.getInstance(getContext())
                    .insert('filedownloaderinfo', valuesBuket);
            }
          } else {
            let downloadTask = await request.agent.create(getContext(), downloadConfig);
            valuesBuket.taskId = downloadTask.tid;
            valuesBuket.status = DownloadStatus.RUNNING;
            let progressCallback = (progress: request.agent.Progress) => {
              DownloadManager
                .progressCallback(valuesBuket, progress, downloadTask,
                  predicates as relationalStore.RdbPredicates,
                  callback);
            }
            let completedCallback = (progress: request.agent.Progress) => {
              DownloadManager
                .completedCallback(valuesBuket, progress, downloadTask,
                  predicates as relationalStore.RdbPredicates,
                  callback);
            };
            let pauseCallback = (progress: request.agent.Progress) => {
              DownloadManager
                .pausedCallback(valuesBuket, progress, downloadTask,
                  predicates as relationalStore.RdbPredicates, callback);

            }
            let resumeCallback = (progress: request.agent.Progress) => {
              DownloadManager
                .resumeCallback(valuesBuket, progress, downloadTask,
                  predicates as relationalStore.RdbPredicates, callback);

            }
            let failedCallback = (progress: request.agent.Progress) => {
              DownloadManager
                .failedCallback(valuesBuket, progress, downloadTask,
                  predicates as relationalStore.RdbPredicates, callback);
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
