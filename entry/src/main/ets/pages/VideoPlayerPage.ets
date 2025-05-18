import { router } from '@kit.ArkUI';

@Entry
@Component
struct VideoPlayerPage {
  @State message: string = 'Hello World';
  @State params:Record<string,Object> =router.getParams() as Record<string,Object>;
  build() {
    RelativeContainer() {
      Video({
        src:this.params['url'] as string
      }).width('100%')
        .height(320)
    }.padding({
      left:16,
      right:16,
    })
    .height('100%')
    .width('100%')
  }
}