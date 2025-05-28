import { promptAction, router } from '@kit.ArkUI';
import { DownloaderUtil } from '@ohos_lib/filedownload';

@Entry
@ComponentV2
struct Index {
  @Local message: string = 'Hello World';
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
          // router.pushUrl({
          //   url: 'pages/MatchQueueDownload'
          // })
          promptAction.showToast({
            message:'目前暂不支持,请耐心等待，后续版本会补充上'
          })
        })
      }
    }
    .height('100%')
    .width('100%')
  }
}