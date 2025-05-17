export interface  IFileDownloader{
  userId: string,//登录信息的userId
  taskId?: string, //当前下载任务id 初始化时非必穿
  url: string, //当前下载url
  filePath?: string,//当前下载文件所处沙盒路径
  fileName?: string, //当前下载文件文件名
  fileSize?: number,//下载文件总子节数，初始化时非必穿 若有的话最好传上，注意是number类型，并且单位是bytes
  downloadSize?: number,//当前下载文件已下载字节数
  status?: number,//当前下载任务状态
  downloadId: string, //下载信息id 通常是后端返回下载信息列表的主键id
  begins?: number, //起始下载位置，用于断点续传
  isBackgroundPause?: number, //当前下载任务后台标识，初始化非必穿
  exitFrequency?: number, //下载过程中退出频次 初始化非必穿
}