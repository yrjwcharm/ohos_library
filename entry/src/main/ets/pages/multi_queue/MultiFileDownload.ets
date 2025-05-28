import { IFileDownloader } from '@ohos_lib/filedownload/src/main/ets/interface/IFileDownloader';
import {DownloaderUtil,DownloadManager, NetworkCallback, SqliteHelper,GTNetworkUtil} from '@ohos_lib/filedownload'
import { DownloadStatus } from '@ohos_lib/filedownload/src/main/ets/constants/DownloadStatus';
import { relationalStore, ValuesBucket } from '@kit.ArkData';
import { promptAction, router } from '@kit.ArkUI';
import { IResponseData } from '../../interfaces/IResponseData';

@Entry
@ComponentV2
struct MultiFileDownload {
  @Local userId:string ='722134343434343434';//登录用户信息id 这里写死Mock
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
      //无网络情况下，恢复网络后继续保持在上次位置下载 --只需要调用如下一行代码即可
      // 本质逻辑内部还是发送了一个监听，统一在DownloadManager.addListener监听处理
      DownloaderUtil.persistActiveDownloads()
    }
  }
  @Local data: IResponseData[] = [];
  async aboutToAppear() {
    this.loadData();
    getContext().eventHub.on('reQuery',()=>{
      this.loadData();
    })
    DownloadManager.addListener(DownloadManager.eventName,(downloadInfo:IFileDownloader)=>{
      console.log('更新回调',downloadInfo.downloadId)
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
    })
    //完善在无网络情况下，下载任务暂停，并且恢复网络后继续下载
    GTNetworkUtil.register(this.networkCallback)
  }
  //TODO tips: 下载失败，首先检查url是否可以正常访问，或者浏览器是否可以正常在线下载
  async loadData(){
    // TODO 假设从网络获取数据数据结构为: response=[{classNumber:'76432121445578293',className:'第一章 第一讲：At the Airport在机场'}]
    //转换数据结构response时接口类型必须要继承 extends IFileDownloader IFileDownloader接口类型初始化至少包含三个字段userId ,downloadId,url userId登录用户的userId
    //因此extends IFileDownloader过的IResponseData接口类型 对应转换后的数据如下所示
    let result:IResponseData[] =[{classNumber:'76432121445578293',downloadId:'76432121445578293',
      className:'第一章 第一讲：At the Airport在机场',userId:this.userId,
      "url": "http://dal-video.wenzaizhibo.com/13c7d34a1181dddad67cfbe387977842/6836c525/00-x-upload/video/209245033_3aaf16a38aff214594fffec92839d37e_n8kGbGC8.mp4",
    },{classNumber:'76432121445578294',downloadId:'76432121445578294',
      className:'第二章 第一讲：Going Shopping购物',userId:this.userId,
      "url": "http://dal-video.wenzaizhibo.com/c865eaa63cca01ec5b46a2cfdbafb509/683701ea/00-x-upload/video/209161635_9e555849ed13cb67213190d27b2914c4_0JmviEcs.mp4"
    },{classNumber:'76432121445578295',downloadId:'76432121445578295',
      className:'第三章 第一讲：At a Restaurant点餐', userId:this.userId,
      "url": "http://dal-video.wenzaizhibo.com/f51e97a22529388785d7be76285abaf1/68370205/00-x-upload/video/209161636_2258f92f79476654a8d4a95ec3216e62_X8atyGfx.mp4"
    }]
    //从数据库读取获取上次的下载进度
    let predicates =new relationalStore.RdbPredicates(SqliteHelper.tableName);
    predicates.equalTo('userId',this.userId);
    let queryList = await SqliteHelper.getInstance(getContext()).queryData(predicates);
    if(queryList.length>0){
      let newData = result.map((item:IResponseData)=>{
        let obj =queryList.find(el=>el.downloadId===item.downloadId);
        if(obj) {
          item.taskId = obj.taskId;
          item.filePath = obj.filePath;
          item.fileName =obj.fileName;
          item.downloadSize = obj.downloadSize;
          item.fileSize = obj.fileSize;
          item.isBackgroundPause =obj.isBackgroundPause;
          item.exitFrequency = obj.exitFrequency;
          item.status = obj.status;
          item.begins = obj.begins;
          return item;
        }
        return item;
      })
      this.data= newData;
    }else{
      this.data = result;
    }
  }
  aboutToDisappear(): void {
    GTNetworkUtil.unregister();
    DownloadManager.removeListener(DownloadManager.eventName)
    getContext().eventHub.off('reQuery');
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
  @Builder imageAnimator(item:IResponseData){
    ImageAnimator()
      .images([
        {
          src: $r('app.media.ic_downloading_1')
        },
        {
          src: $r('app.media.ic_downloading_2')
        },
        {
          src: $r('app.media.ic_downloading_3')
        },
        {
          src: $r('app.media.ic_downloading_4')
        },
        {
          src: $r('app.media.ic_downloading_5')
        }
      ])
      .duration(1000)
      .state(item.status===DownloadStatus.RUNNING?AnimationStatus.Running:AnimationStatus.Initial)
      .reverse(false)
      .fillMode(FillMode.None)
      .iterations(-1)
      .width(24)
      .height(24)
      .onStart(() => {
        console.info('Start')
      })
      .onPause(() => {
        console.info('Pause')
      })
      .onRepeat(() => {
        console.info('Repeat')
      })
      .onCancel(() => {
        console.info('Cancel')
      })
      .onFinish(() => {
        console.info('Finish')
      })
  }
  build() {
    Column() {
      Column(){
        ForEach(this.data,(item:IResponseData)=>{
          Flex({
            direction:FlexDirection.Row,
            alignItems:ItemAlign.Center,
            justifyContent:FlexAlign.SpaceBetween
          }) {
            Row(){
              Text(item?.className).fontSize(16).fontWeight(FontWeight.Bold)
            }.layoutWeight(1)
            if(item.status===DownloadStatus.COMPLETED){
              Image($r('app.media.ic_download_completed')).width(24).height(24)
            }else if(item.status===DownloadStatus.RUNNING) {
              this.imageAnimator(item);
            }else if(item.status===DownloadStatus.FAILED){
              Image($r('app.media.ic_download_fail')).width(24).height(24)
            }else if([DownloadStatus.WAITING,DownloadStatus.PAUSE].includes(item.status!)){
              Image($r('app.media.ic_download_start')).width(24).height(24)
            }
          }.width('100%')
          .height(44)
          .onClick(async ()=>{
            if (item?.status === DownloadStatus.RUNNING) { //下载中---->点击触发取消下载【删除下载】
              let number =  await DownloaderUtil.delete(item.userId,item.downloadId);
              if(number>0){
                this.loadData();
              }
            } else if (item?.status === DownloadStatus.FAILED) { //下载失败----> 重新下载
              DownloaderUtil.downloadFile(item);
            } else if (item?.status === DownloadStatus.PAUSE) { //下载暂停----->代表要恢复下载
              await DownloaderUtil.resume(item);
            } else if(item.status===DownloadStatus.COMPLETED) { //下载完成 ---->去播放
              router.pushUrl({
                url: 'pages/VideoPlayerPage',
                params:{url:'file:///'+item.filePath+'/'+item.fileName,}
              })
            }else{ //未下载 -->去下载 判断当前是否已经有下载任务
              if(!this.data.find(item=>item.status===DownloadStatus.RUNNING)) {
                promptAction.showToast({
                  message: '开始下载',
                })
                DownloaderUtil.downloadFile(item);
              }
            }
          })
          .padding({
            left: 16,
            right: 16
          })
          .margin({
            top: 12
          })
        })
      }.layoutWeight(1)
      Flex({alignItems:ItemAlign.Center,justifyContent:FlexAlign.SpaceBetween}) {
        Button('全部下载').type(ButtonType.Capsule).onClick(async () => {
          DownloaderUtil.matchInsert(this.data).then(res=>{
            if(res>0){
              if(!this.data.find(item=>item.status===DownloadStatus.RUNNING)){

              }
            }
          })
        }).backgroundColor(Color.Red)
        Button('查看下载').type(ButtonType.Capsule).onClick(() => {
          // promptAction.showToast({
          //   message:'目前暂不支持,请耐心等待，后续版本会补充上'
          // })
          router.pushUrl({
            url: 'pages/multi_queue/MultiDownloadManagerPage',
            params: {
              data: this.data,
              userId: this.userId
            }
          })
        }).backgroundColor(Color.Red)
      }.padding({
        left:16,
        right:16,
      })
    }
    .height('100%')
    .width('100%')
  }
}