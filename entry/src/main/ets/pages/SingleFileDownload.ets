import { IFileDownloader } from '@ohos_lib/filedownload/src/main/ets/interface/IFileDownloader';

@Entry
@ComponentV2
struct SingleFileDownload {
  @Local data:IFileDownloader = {
    userId: '644323434232343455',
    url: 'https://vdept3.bdstatic.com/mda-rc4ag6m8830yhx5n/sc/cae_h264/1741164658492310218/mda-rc4ag6m8830yhx5n.mp4?v_from_s=hkapp-haokan-hbf&auth_key=1747228401-0-0-a216926ad9f7da368f744b025e132252&bcevod_channel=searchbox_feed&pd=1&cr=2&cd=0&pt=3&logid=0801231943&vid=16967765031328999227&klogid=0801231943&abtest=',
    downloadId: '1',
  }
  build() {
    Stack({alignContent:Alignment.TopStart}){
      Row(){
        Progress({ value:888, total:1000, type: ProgressType.Linear })
          .style({ strokeWidth: 10, enableSmoothEffect: true, })
          .color(Color.Red)
          .width(160)
        Blank()
        Button('下载').type(ButtonType.Normal).width(80) .onClick(()=>{

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