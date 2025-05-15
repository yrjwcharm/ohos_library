@Entry
@Component
struct DownloadManager {
  @State message: string = 'Hello World';
  aboutToAppear(): void {

  }
  build() {
    RelativeContainer() {

      Row(){

      }.width('100%')

    }
    .height('100%')
    .width('100%')
  }
}