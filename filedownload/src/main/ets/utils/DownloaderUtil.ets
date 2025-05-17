import { request } from '@kit.BasicServicesKit';
import {DownloadManager } from '../downloadmanager/DownloadManager';
import { relationalStore, ValuesBucket } from '@kit.ArkData';
import { connection } from '@kit.NetworkKit';
import { promptAction } from '@kit.ArkUI';
import { SqliteHelper } from '../db/SqliteHelper';
import { DownloadStatus } from '../constants/DownloadStatus';
import { IFileDownloader } from '../interface/IFileDownloader';


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

  //统一下载封装  isBatchInsertQueue是否批量下载-排队 非必穿
  static async downloadFile(data: IFileDownloader, isBatchInsertQueue?: boolean) {
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
