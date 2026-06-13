import { ResponseData } from '../../model/ResponseData';
import { promptAction, router } from '@kit.ArkUI';
import {
  DownloaderUtil,
  DownloadManager,
  GTNetworkUtil,
  NetworkCallback,
  FileDownloader,
  DownloadStatus,
  SqliteHelper
} from '@ohos_lib/filedownload';
import { relationalStore } from '@kit.ArkData';

@Entry
@ComponentV2
struct DownloadManagerPage {
  @Local data:ResponseData[]=[];
  @Local downloadingData:ResponseData[]=[];//下载中（下载失败、暂停等）
  @Local downloadedData:ResponseData[]=[];//已下载
  private userId: string = '';
  private downloadListener = (downloadInfo: FileDownloader) => {
    //进度监听更新回调
    this.data?.forEach((item)=>{
      if(item.downloadId===downloadInfo.downloadId){
        item.taskId = downloadInfo.taskId;
        item.filePath = downloadInfo.filePath;
        item.fileName =downloadInfo.fileName;
        item.downloadSize = downloadInfo.downloadSize;
        item.fileSize = downloadInfo.fileSize;
        item.isBackgroundPause =downloadInfo.isBackgroundPause;
        item.exitFrequency = downloadInfo.exitFrequency;
        item.status = downloadInfo.status;
        item.begins = downloadInfo.begins;
      }
    })
    this.loadData();
  }
  private networkCallback:NetworkCallback={
    netAvailableCallback: (netHandle: ESObject) => {
      promptAction.showToast({
        message:'网络可用~'
      })
      DownloaderUtil.resumeBackgroundPausedDownloads(this.userId);
    },
    netLostCallback: (_: ESObject) => {
      promptAction.showToast({
        message:'网络连接已断开，请检查~'
      })
       //无网络情况下，恢复网络后继续保持在上次位置下载 --只需要调用如下一行代码即可
      // 本质逻辑内部还是发送了一个监听，统一在DownloadManager.addListener监听处理
      DownloaderUtil.persistActiveDownloads()
    }
  }
  formatFileSize(fileS: number=0): string {
  if (fileS === 0) {
    return "0B";
  } else if (fileS < 1024) {
    return `${fileS}B`;
  } else if (fileS < 1048576) {
    const sizeInKB = fileS / 1024;
    return `${sizeInKB.toFixed(1)}KB`;
  } else if (fileS < 1073741824) {
    const sizeInMB = fileS / 1048576;
    return `${sizeInMB.toFixed(1)}MB`;
  } else {
    const sizeInGB = fileS / 1073741824;
    return `${sizeInGB.toFixed(1)}GB`;
  }
}
  progressWidth(item: ResponseData): number {
    const fileSize = item.fileSize ?? 0;
    if (fileSize <= 0) {
      return 0;
    }
    const downloadSize = item.downloadSize ?? 0;
    return Math.min(downloadSize / fileSize, 1) * 180;
  }
  async aboutToAppear() {
    const params = router.getParams() as Record<string,Object>;
    let data = params['data'] as ResponseData[];
    this.userId = (params['userId'] as string) ?? '';
    this.data=data ?? [];
    await this.syncDownloadRecords();
    this.loadData();
    DownloadManager.addListener(DownloadManager.eventName,this.downloadListener)
    //完善在无网络情况下，下载任务暂停，并且恢复网络后继续下载
    GTNetworkUtil.register(this.networkCallback)
  }
  loadData(){
    //这里item.status为undefined代表数据库没有记录，就不用显示课程名称
    this.downloadingData = this.data.filter(item=>![undefined,DownloadStatus.COMPLETED].includes(item.status));
    this.downloadedData = this.data.filter(item=>item.status===DownloadStatus.COMPLETED);
  }
  async syncDownloadRecords() {
    if (!this.userId) {
      return;
    }
    let predicates = new relationalStore.RdbPredicates(SqliteHelper.tableName);
    predicates.equalTo('userId', this.userId);
    let queryList = await SqliteHelper.getInstance(getContext()).queryData(predicates);
    this.data = this.data.map((item: ResponseData) => {
      let obj = queryList.find(el => el.downloadId === item.downloadId);
      if (obj) {
        item.taskId = obj.taskId;
        item.filePath = obj.filePath;
        item.fileName = obj.fileName;
        item.downloadSize = obj.downloadSize;
        item.fileSize = obj.fileSize;
        item.isBackgroundPause = obj.isBackgroundPause;
        item.exitFrequency = obj.exitFrequency;
        item.status = obj.status;
        item.begins = obj.begins;
      }
      return item;
    })
  }
  aboutToDisappear(): void {
    GTNetworkUtil.unregister();
    DownloadManager.removeListener(DownloadManager.eventName,this.downloadListener)
  }
  build() {
    Column() {
      Tabs() {
        TabContent() {
          Column(){
            ForEach(this.downloadedData,(item:ResponseData)=>{
              Flex({
                direction:FlexDirection.Row,
                alignItems:ItemAlign.Center,
                justifyContent:FlexAlign.SpaceBetween
              }) {
                Row(){
                  Text(item?.className).fontSize(16).fontWeight(FontWeight.Bold)
                }.layoutWeight(1)
                Image($r('app.media.ic_download_completed')).width(24).height(24)
              }.width('100%')
              .height(44)
              .onClick(()=>{
                router.pushUrl({
                  url: 'pages/VideoPlayerPage',
                  params:{url:'file:///'+item.filePath+'/'+item.fileName,}
                })
              })
              .padding({
                left: 16,
                right: 16
              })
              .margin({
                top: 32
              })
            }, (item: ResponseData) => item.downloadId)
          }.width('100%').height('100%')
        }.tabBar(SubTabBarStyle.of('已下载'))

        TabContent() {
          Column(){
            ForEach(this.downloadingData,(item:ResponseData,index:number)=>{
              Flex({
                direction:FlexDirection.Row,
                alignItems:ItemAlign.Center,
                justifyContent:FlexAlign.SpaceBetween
              }) {
                Column(){
                  Text(item?.className).fontSize(16).fontWeight(FontWeight.Bold).layoutWeight(1)
                  Flex({alignItems:ItemAlign.Center}){
                    if(item.status===DownloadStatus.RUNNING) {
                      Text(this.formatFileSize(item.downloadSize)+'/'+this.formatFileSize(item.fileSize)).fontColor('#2C2E40').fontSize(12)
                      Row() {
                        Row()
                          .width(this.progressWidth(item))
                          .height('100%')
                          .backgroundColor(Color.Red)
                          .borderRadius(10)
                      }
                      .width(180)
                      .height(10)
                      .backgroundColor('#F6F7FC')
                      .borderRadius(10)
                      .margin({
                        left: 12
                      })
                    }else if(item.status===DownloadStatus.PAUSE){
                      Text('已暂停').fontSize(12).fontColor('#9698A1')
                    }else if(item.status===DownloadStatus.FAILED){
                      Text('下载失败').fontSize(12).fontColor(Color.Red)
                    }
                  }
                  .margin({
                    top:6
                  })

                }.layoutWeight(1)
                .alignItems(HorizontalAlign.Start)
                Image($r('app.media.delete')).width(24).height(24).onClick(async ()=>{
                  let number =  await DownloaderUtil.delete(item.userId,item.downloadId);
                  if(number>0){
                    this.downloadingData.splice(index,1);
                    getContext().eventHub.emit('reQuery');
                  }else{
                    promptAction.showToast({
                      message:'删除失败了!!!'
                    })
                  }
                })
              }.width('100%')
              .height(44)
              .onClick(async ()=>{
                if (item?.status === DownloadStatus.RUNNING) { //下载中---->点击触发暂停下载
                  await DownloaderUtil.pause(item.taskId!);
                } else if (item?.status === DownloadStatus.FAILED) { //下载失败----> 重新下载
                  DownloaderUtil.downloadFile(item);
                } else if (item?.status === DownloadStatus.PAUSE) { //下载暂停----->代表要恢复下载
                  await DownloaderUtil.resume(item);
                }
              })
              .padding({
                left: 16,
                right: 16
              })
              .margin({
                top: 32
              })
            }, (item: ResponseData) => item.downloadId)
          }.width('100%').height('100%')
        }.tabBar(SubTabBarStyle.of('下载中'))

      }
      .height('100%')
      .barMode(BarMode.Fixed)
    }
    .height('100%')
    .width('100%')
  }
}
