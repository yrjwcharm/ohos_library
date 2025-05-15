import { IFileDownloader } from '@ohos_lib/filedownload/src/main/ets/interface/IFileDownloader';
import {DownloaderUtil, FileUtil} from '@ohos_lib/filedownload'
import { DownloadStatus } from '@ohos_lib/filedownload/src/main/ets/constants/DownloadStatus';
import { router } from '@kit.ArkUI';

@Entry
@ComponentV2
struct SingleFileDownload {
  @Local data:IFileDownloader[] = [{
    userId: '644323434232343455',
    url: 'https://gitee.com/yrjwcharm/video/raw/master/video_one.mp4',
    downloadId: '1',
  }]
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