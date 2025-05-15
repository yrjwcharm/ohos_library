import { IFileDownloader } from '@ohos_lib/filedownload/src/main/ets/interface/IFileDownloader';
import {DownloaderUtil, FileUtil} from '@ohos_lib/filedownload'
import { DownloadStatus } from '@ohos_lib/filedownload/src/main/ets/constants/DownloadStatus';
import { router } from '@kit.ArkUI';

@Entry
@ComponentV2
struct SingleFileDownload {
  @Local data:IFileDownloader[] = [{
    userId: '644323434232343455',
    url: 'http://dal-video.wenzaizhibo.com/66caa30ee146927904d06834d33546b1/6825c70d/00-x-upload/video/209245033_3aaf16a38aff214594fffec92839d37e_n8kGbGC8.mp4',
    downloadId: '1',
  }]
  // url:'http://dal-video.wenzaizhibo.com/efa6fb8de84820fe3eeb7d2db0ddbcc6/6825c788/00-x-upload/video/209161638_f7fbdb7733e6043fc21f6108b3051a60_TbZKvyV4.mp4',
  // http://dal-video.wenzaizhibo.com/f8dc54e57d741dcf3187ce5510682664/6825c79d/00-x-upload/video/207061211_657d04a328b5b737c6e3d86f4e87fcf3_fIFy8txO.mp4
  // http://dal-video.wenzaizhibo.com/a6dac8c6371a54477a5692f46ea9698e/6825c7da/00-x-upload/video/205971345_ae77bc38ae8b689a5a534e51b3153c8b_Kg3W8sai.mp4
  getStatusText(status:number|undefined){
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
          Button(this.getStatusText(this.data[0]?.status)).type(ButtonType.Normal).width(80).onClick(() => {
            if (this.data[0]?.status === DownloadStatus.RUNNING) { //下载中---->点击会触发取消下载[删除下载]
              //取消下载首先更改数据库状态为未下载，并清除文件系统已下载内容
            } else if (this.data[0]?.status === DownloadStatus.FAILED) { //下载失败----> 重新下载

            } else if (this.data[0]?.status === DownloadStatus.PAUSE) { //下载暂停----->代表要恢复下载
              //恢复下载有两种情况 没有退出应用程序/ 退出应用程序两种
            } else { //未下载 ---->点击下载
                DownloaderUtil.downloadFile(this.data[0],
                  (downloadInfo: IFileDownloader) => {
                    let newData = this.data?.map((item) => {
                      if (item.downloadId === downloadInfo.downloadId) {
                        item = downloadInfo;
                      }
                      return item;
                    })
                    this.data = [...newData];
                  })
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
      }.layoutWeight(1)
      Button('查看下载').type(ButtonType.Normal).onClick(()=>{
          router.pushUrl({
            url:'pages/DownloadManager'
          })
      }).backgroundColor(Color.Red)
    }
    .height('100%')
    .width('100%')
  }
}