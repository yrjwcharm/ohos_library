import { IFileDownloader } from '@ohos_lib/filedownload/src/main/ets/interface/IFileDownloader';
import {DownloaderUtil,DownloadManager, NetworkCallback, SqliteHelper,GTNetworkUtil} from '@ohos_lib/filedownload'
import { DownloadStatus } from '@ohos_lib/filedownload/src/main/ets/constants/DownloadStatus';
import { relationalStore } from '@kit.ArkData';
import { promptAction, router } from '@kit.ArkUI';
@Entry
@ComponentV2
struct SingleFileDownload {

  //todo tips: 测试url 若显示下载失败 看url是否可以正常访问与下载
  // "url": "http://dal-video.wenzaizhibo.com/6fcfd45370d7692cc61c181385794da5/6826ef69/00-x-upload/video/209245033_3aaf16a38aff214594fffec92839d37e_n8kGbGC8.mp4"
  // url:'http://dal-video.wenzaizhibo.com/a6dac8c6371a54477a5692f46ea9698e/6825c7da/00-x-upload/video/205971345_ae77bc38ae8b689a5a534e51b3153c8b_Kg3W8sai.mp4',
  // "url": "http://dal-video.wenzaizhibo.com/b9e99d64eb88639e5e324673521483ac/6825cd30/00-x-upload/video/209161637_025ef13fccffb5fab1fd357e691fb220_ot55SHt9.mp4"
  // "url": "http://dal-video.wenzaizhibo.com/08729e242e59be6ebb7cbb1e98919ad8/6825ccfd/00-x-upload/video/209161638_f7fbdb7733e6043fc21f6108b3051a60_TbZKvyV4.mp4"
  private networkCallback:NetworkCallback={
    netAvailableCallback: (netHandle: ESObject) => {
      promptAction.showToast({
        message:'网络可用~'
      })
    },
    //网络不可用
    netLostCallback: (_: ESObject) => {
      promptAction.showToast({
        message:'网络连接已断开，请检查~'
      })
       DownloaderUtil.persistMergeFileStorage().then(_=>{
         this.loadData();
       })

    }
  }
  @Local data:IFileDownloader[] = [{
    userId: '644323434232343455',
    "url": "http://dal-video.wenzaizhibo.com/0976c2dca41f0cd6cb48a78215c780d3/682add4c/00-x-upload/video/209245033_3aaf16a38aff214594fffec92839d37e_n8kGbGC8.mp4",
    downloadId: '1',
  }]
  async aboutToAppear() {
     this.loadData();
     DownloadManager.addListener(DownloadManager.eventName,(downloadInfo:IFileDownloader)=>{
      let newData =  this.data?.map((item)=>{
         if(item.downloadId===downloadInfo.downloadId){
          item = downloadInfo;
         }
         return item;
       })
       this.data =newData;
     })
    //完善在无网络情况下，下载任务暂停，并且恢复网络后继续下载
    GTNetworkUtil.register(this.networkCallback)
  }
  async loadData(){
    //从数据库读取获取上次的下载进度
    let predicates =new relationalStore.RdbPredicates(SqliteHelper.tableName);
    predicates.equalTo('userId',this.data[0]?.userId);
    let queryList = await SqliteHelper.getInstance(getContext()).queryData(predicates);
    if(queryList.length>0){
      this.data = queryList;
    }
  }
  aboutToDisappear(): void {
    GTNetworkUtil.unregister();
    DownloadManager.removeListener(DownloadManager.eventName)
  }
   getStatus(status:number|undefined){
    switch (status){
      case DownloadStatus.COMPLETED:
        return '下载完成'
      case DownloadStatus.PAUSE:
        return '暂停'
      case DownloadStatus.FAILED:
        return '下载失败'
      case DownloadStatus.RUNNING:
        return '下载中'
     default :
       return '下载'
    }
  }

  build() {
    Column() {
      Stack({alignContent:Alignment.TopStart}){
       ForEach(this.data,(item:IFileDownloader)=>{
         Flex({
           direction:FlexDirection.Row,
           alignItems:ItemAlign.Center,
           justifyContent:FlexAlign.SpaceBetween
         }) {
             Row(){
              Row().width(item.fileSize??0>0?((item?.downloadSize??0)/(item?.fileSize??0))*200:0).height('100%').backgroundColor(Color.Red)
                .borderRadius(10)
             }.width(200).height(10).backgroundColor('#F6F7FC').borderRadius(10)
           Button(this.getStatus(item?.status)).type(ButtonType.Normal).width(80).onClick(async () => {
             if (item?.status === DownloadStatus.RUNNING) { //下载中---->点击触发暂停下载【暂停下载】
               await DownloaderUtil.pause(item?.taskId!)
             } else if (item?.status === DownloadStatus.FAILED) { //下载失败----> 重新下载
               DownloaderUtil.downloadFile(item);
             } else if (item?.status === DownloadStatus.PAUSE) { //下载暂停----->代表要恢复下载
               await DownloaderUtil.resume(item);
             } else { //未下载 ---->点击下载
               DownloaderUtil.downloadFile(item);
             }
           })
         }.width('100%')
         .height(44)
         .onClick(()=>{
           if(item.status===1) {
             router.pushUrl({
               url: 'pages/VideoPlayerPage',
               params:{url:'file:///'+item.filePath+'/'+item.fileName,}
             })
           }else{
             promptAction.showToast({
               message:'尚未下载完成!!!'
             })
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
      }
      // Button('查看下载').type(ButtonType.Normal).onClick(()=>{
      //     router.pushUrl({
      //       url:'pages/DownloadManager'
      //     })
      // }).backgroundColor(Color.Red)
    }
    .height('100%')
    .width('100%')
  }
}