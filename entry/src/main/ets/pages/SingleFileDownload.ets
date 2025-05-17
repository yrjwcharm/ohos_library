import { IFileDownloader } from '@ohos_lib/filedownload/src/main/ets/interface/IFileDownloader';
import {DownloaderUtil,DownloadManager, NetworkCallback, SqliteHelper,GTNetworkUtil} from '@ohos_lib/filedownload'
import { DownloadStatus } from '@ohos_lib/filedownload/src/main/ets/constants/DownloadStatus';
import {  request } from '@kit.BasicServicesKit';
import { relationalStore } from '@kit.ArkData';
import { promptAction } from '@kit.ArkUI';
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
       DownloadManager.persistMergeFileStorage().then(_=>{
         this.loadData();
       })

    }
  }
  @Local data:IFileDownloader[] = [{
    userId: '644323434232343455',
    url: "http://dal-video.wenzaizhibo.com/6fcfd45370d7692cc61c181385794da5/6826ef69/00-x-upload/video/209245033_3aaf16a38aff214594fffec92839d37e_n8kGbGC8.mp4",
    downloadId: '1',
  }]
  async aboutToAppear() {
     this.loadData();
     //因为数据库查询操作（从硬盘读取）本身就是比较耗时的，更何况频繁查询数据呢，这里进行了优化，把所有的监听统一回调统一放置于事件监听中，
    //事件监听基于发布订阅模式，我们直接从内存中读取，提升性能
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
        Row() {
            Progress({ value: this.data[0]?.downloadSize, total: this.data[0]?.fileSize, type: ProgressType.Linear })
              .style({ strokeWidth: 10, enableSmoothEffect: true, })
              .color(Color.Red)
              .width(160)
          Blank()
          Button(this.getStatus(this.data[0]?.status)).type(ButtonType.Normal).width(80).onClick(async () => {
            if (this.data[0]?.status === DownloadStatus.RUNNING) { //下载中---->点击触发暂停下载【暂停下载】
              //暂停下载 并调用Api触发暂停 更改数据库状态为0
              try {
                const task = await request.agent.getTask(getContext(), this.data[0]?.taskId);
                await task.pause();
              }catch (e) {}
            } else if (this.data[0]?.status === DownloadStatus.FAILED) { //下载失败----> 重新下载
              DownloaderUtil.downloadFile(this.data[0]);
            } else if (this.data[0]?.status === DownloadStatus.PAUSE) { //下载暂停----->代表要恢复下载
              //恢复下载有两种情况 没有退出当前应用程序/ 退出应用程序杀死进程两种
              try {
                const task = await request.agent.getTask(getContext(), this.data[0]?.taskId);
                await task.resume();
              }catch (e) {
                //21900007 任务挂掉了/代表应用杀掉后重新进来的 ｜ https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-request#section21900007
                // aboutToAppear已经获取到要从哪开始下载的字节 begins 所以直接启动下载，和之前退出应用程序的那部分字节进行合并，
                // 统一放到一个文件中，这部分库中已经实现。无需手动处理
                if(e.code===21900007){
                  DownloaderUtil.downloadFile(this.data[0]);
                }
              }
            } else { //未下载 ---->点击下载
              DownloaderUtil.downloadFile(this.data[0]);
            }
          })
        }.width('100%')
        .padding({
          left: 16,
          right: 16
        })
        .margin({
          top: 32
        })
      }
      if(this.data[0].status===1){
        //本地沙盒路径播放
        Column(){
          Video({
            src:'file:///'+this.data[0]?.filePath+'/'+this.data[0]?.fileName
          })
            .height(300)
            .width('100%')
        }.width('100%')
        .margin({
          top:32
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