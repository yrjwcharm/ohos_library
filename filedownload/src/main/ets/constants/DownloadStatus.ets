export enum DownloadStatus {
  COMPLETED = 1, //下载完成
  PAUSE = 0, //暂停
  FAILED = -1, //下载失败
  RUNNING = 2, //下载进行中
  QUEUEING = 3, //排队
}

