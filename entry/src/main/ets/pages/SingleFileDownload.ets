import { IFileDownloader } from '@ohos_lib/filedownload/src/main/ets/interface/IFileDownloader';
import {DownloaderUtil, FileUtil} from '@ohos_lib/filedownload'
import { DownloadStatus } from '@ohos_lib/filedownload/src/main/ets/constants/DownloadStatus';

@Entry
@ComponentV2
struct SingleFileDownload {
  @Local data:IFileDownloader[] = [{
    userId: '644323434232343455',
    url: 'https://vdept3.bdstatic.com/mda-rc4ag6m8830yhx5n/sc/cae_h264/1741164658492310218/mda-rc4ag6m8830yhx5n.mp4?v_from_s=hkapp-haokan-hbf&auth_key=1747228401-0-0-a216926ad9f7da368f744b025e132252&bcevod_channel=searchbox_feed&pd=1&cr=2&cd=0&pt=3&logid=0801231943&vid=16967765031328999227&klogid=0801231943&abtest=',
    downloadId: '1',
    status:DownloadStatus.WAITING //可以给个初始值 待下载
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
    Stack({alignContent:Alignment.TopStart}){
      Row(){
        Progress({ value:this.data[0]?.downloadSize, total:this.data[0]?.fileSize, type: ProgressType.Linear })
          .style({ strokeWidth: 10, enableSmoothEffect: true, })
          .color(Color.Red)
          .width(160)
        Blank()
        Button(this.getStatusText(this.data[0]?.status)).type(ButtonType.Normal).width(80) .onClick(()=>{
          if(this.data[0]?.status===DownloadStatus.WAITING) {
            DownloaderUtil.downloadFile(this.data[0],
              (download:IFileDownloader) => {
              //   let newData = this.data?.map((item) => {
              //     if (item.downloadId === downloadId) {
              //       item.downloadSize = downloadSize;
              //       item.fileSize = fileSize;
              //       item.filePath = filePath;
              //       item.fileName = fileName;
              //       item.status = status;
              //     }
              //     return item;
              //   })
              //   this.data = [...newData];
              // })
          }
        })
      }.width('100%')
      .padding({
        left:16,
        right:16
      })
      .margin({
        top:32
      })
    }
    .height('100%')
    .width('100%')
  }
}