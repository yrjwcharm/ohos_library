import { promptAction, router } from '@kit.ArkUI';
import { DownloaderUtil } from '@ohos_lib/filedownload';

@Entry
@ComponentV2
struct Index {
   async aboutToAppear() {
     try {
     await DownloaderUtil.persistActiveDownloads();
     }catch (e) {
     }
  }
  build() {
    Stack() {
      Column() {
        Button('单个文件下载').onClick(() => {
          router.pushUrl({
            url: 'pages/single/SingleFileDownload'
          })
        })
        Blank().height(32)
        Button('批量排队下载').onClick(() => {
          promptAction.showToast({
            message:'目前只实现基础功能,请耐心等待，后续版本会补充上'
          })
          // router.pushUrl({
          //   url:'pages/multi_queue/MultiFileDownload'
          // })
        })
      }
    }
    .height('100%')
    .width('100%')
  }
}