import { IResponseData } from '../interfaces/IResponseData';
import { promptAction, router } from '@kit.ArkUI';
import { DownloaderUtil, DownloadManager, GTNetworkUtil, NetworkCallback } from '@ohos_lib/filedownload';
import { IFileDownloader } from '@ohos_lib/filedownload/src/main/ets/interface/IFileDownloader';
import { DownloadStatus } from '@ohos_lib/filedownload/src/main/ets/constants/DownloadStatus';

@Entry
@ComponentV2
struct DownloadManagerPage {
  @Local data:IResponseData[]=[];
  @Local downloadingData:IResponseData[]=[];//下载中（下载失败、暂停等）
  @Local downloadedData:IResponseData[]=[];//已下载
  private networkCallback:NetworkCallback={
    netAvailableCallback: (netHandle: ESObject) => {
      promptAction.showToast({
        message:'网络可用~'
      })
    },
    netLostCallback: (_: ESObject) => {
      promptAction.showToast({
        message:'网络连接已断开，请检查~'
      })
      //无网络情况下，恢复网络后继续保持在上次位置下载只需要调用如下代码即可  此代码新版本V1.1.3 已经内置处理逻辑、无需手动处理
      DownloaderUtil.persistActiveDownloads()
    }
  }
  formatFileSize(fileS: number=0): string {
  const wrongSize = "0MB";
  if (fileS === 0) {
    return wrongSize;
  } else if (fileS < 1024) {
    return wrongSize;
  } else if (fileS < 1048576) {
    return wrongSize;
  } else if (fileS < 1073741824) {
    const sizeInMB = fileS / 1048576;
    return `${sizeInMB.toFixed(1)}MB`;
  } else {
    const sizeInGB = fileS / 1073741824;
    return `${sizeInGB.toFixed(1)}GB`;
  }
}
  aboutToAppear(): void {
    let data = (router.getParams() as Record<string,Object>)['data'] as IResponseData[];
    this.data=data;
    this.loadData();
    DownloadManager.addListener(DownloadManager.eventName,(downloadInfo:IFileDownloader)=>{
      //进度监听更新回调
      let newData =  this.data?.map((item)=>{
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
          return item;
        }
        return item;
      })
      this.data =newData;
      this.loadData();
    })
    //完善在无网络情况下，下载任务暂停，并且恢复网络后继续下载
    GTNetworkUtil.register(this.networkCallback)
  }
  loadData(){
    //这里item.status为undefined代表数据库没有记录，就不用显示课程名称
    this.downloadingData = this.data.filter(item=>![undefined,1].includes(item.status));
    this.downloadedData = this.data.filter(item=>item.status===1);
  }
  build() {
    Column() {
      Tabs() {
        TabContent() {
          Column(){
            ForEach(this.downloadedData,(item:IResponseData)=>{
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
            })
          }.width('100%').height('100%')
        }.tabBar(SubTabBarStyle.of('已下载'))

        TabContent() {
          Column(){
            ForEach(this.downloadingData,(item:IResponseData,index:number)=>{
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
                          .width(item.fileSize ?? 0 > 0 ? ((item?.downloadSize ?? 0) / (item?.fileSize ?? 0)) * 180 : 0)
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
            })
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