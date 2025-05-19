import { IResponseData } from '../interfaces/IResponseData';
import { router } from '@kit.ArkUI';
import { DownloadManager } from '@ohos_lib/filedownload';
import { IFileDownloader } from '@ohos_lib/filedownload/src/main/ets/interface/IFileDownloader';

@Entry
@ComponentV2
struct DownloadManagerPage {
  @Local data:IResponseData[]=[];
  @Local downloadingData:IResponseData[]=[];//下载中（下载失败、暂停等）
  @Local downloadedData:IResponseData[]=[];//已下载
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
          item.downloadSize = downloadInfo.fileSize;
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
  }
  loadData(){
    this.downloadingData = this.data.filter(item=>item.status!==1);
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
                Column(){
                  Text(item?.className).fontSize(16).fontWeight(FontWeight.Bold)
                }.layoutWeight(1)
                Image($r('app.media.ic_download_completed')).width(24).height(24).onClick(()=>{
                  router.pushUrl({
                    url: 'pages/VideoPlayerPage',
                    params:{url:'file:///'+item.filePath+'/'+item.fileName,}
                  })
                })
              }.width('100%')
              .height(44)
              .onClick(async ()=>{

              })
              .padding({
                left: 16,
                right: 16
              })
              .margin({
                top: 32
              })
            })
          }.width('100%').height('100%').backgroundColor(Color.Pink)
        }.tabBar(SubTabBarStyle.of('已下载'))

        TabContent() {
          Column(){
            ForEach(this.downloadingData,(item:IResponseData)=>{
              Flex({
                direction:FlexDirection.Row,
                alignItems:ItemAlign.Center,
                justifyContent:FlexAlign.SpaceBetween
              }) {
                Column(){
                  Text(item?.className).fontSize(16).fontWeight(FontWeight.Bold)
                  Row(){
                    Row().width(item.fileSize??0>0?((item?.downloadSize??0)/(item?.fileSize??0))*200:0).height('100%').backgroundColor(Color.Red)
                      .borderRadius(10)
                  }.width(200).height(10).backgroundColor('#F6F7FC').borderRadius(10)
                  .margin({
                    top:6
                  })

                }.layoutWeight(1)
                Button('删除下载').backgroundColor(Color.Red).fontColor(Color.White)
              }.width('100%')
              .height(44)
              .onClick(async ()=>{

              })
              .padding({
                left: 16,
                right: 16
              })
              .margin({
                top: 32
              })
            })
          }.width('100%').height('100%').backgroundColor(Color.Green)
        }.tabBar(SubTabBarStyle.of('下载中'))

      }
      .height('60%')
      .backgroundColor(0xf1f3f5)
      .barMode(BarMode.Fixed)
    }
    .height('100%')
    .width('100%')
  }
}