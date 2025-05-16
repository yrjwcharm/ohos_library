export interface  IFileDownloader{
  userId: string,
  taskId?: string,
  url: string,
  filePath?: string,
  fileName?: string,
  fileSize?: number,
  downloadSize?: number,
  status?: number,
  downloadId: string,
  begins?: number,
  isBackgroundPause?: number,
  exitFrequency?: number,
}