import { router } from '@kit.ArkUI';

@Entry
@ComponentV2
struct Index {
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
          router.pushUrl({
            url:'pages/multi_queue/MultiFileDownload'
          })
        })
      }
    }
    .height('100%')
    .width('100%')
  }
}
