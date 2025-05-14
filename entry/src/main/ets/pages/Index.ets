import { router } from '@kit.ArkUI';

@Entry
@ComponentV2
struct Index {
  @Local message: string = 'Hello World';
  build() {
    Column() {
      Button('单个文件下载').onClick(()=>{
        router.pushUrl({
          url:'/pages/SingleFileDownload'
        })
      })
      Button('批量排队下载').onClick(()=>{
        router.pushUrl({
          url:'/pages/MatchQueueDownload'
        })
      })
    }
    .height('100%')
    .width('100%')
  }
}