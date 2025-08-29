@ObservedV2
export class  FileDownloader{
  public userId: string='';//登录信息的userId
  public taskId?: string; //当前下载任务id 初始化时非必穿
  public url: string=''; //当前下载url
  public filePath?: string;//当前下载文件所处沙盒路径
  public fileName?: string; //当前下载文件文件名
  @Trace
  public fileSize?: number;//下载文件总子节数，初始化时非必穿 若有的话最好传上，注意是number类型，并且单位是bytes
  @Trace
  public downloadSize?: number;//当前下载文件已下载字节数
  @Trace
  public status?: number;//当前下载任务状态
  public downloadId: string=''; //下载信息id 通常是后端返回下载信息列表的主键id
  public begins?: number; //起始下载位置，用于断点续传
  public isBackgroundPause?: number; //当前下载任务后台标识，初始化非必穿
  public exitFrequency?: number; //下载过程中退出频次 初始化非必穿
}