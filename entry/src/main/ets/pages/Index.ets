import { getRawFileJsonStringSync, LottieComponentV2 } from "@ohos_lib/lottie";

@Entry
@ComponentV2
export struct Index{
  @Local isLoading:boolean = true
   aboutToAppear(): void {
    this.fetchNetRequestData()
   }
  async fetchNetRequestData(){
    try {
      //进行网络请求
    }catch (e) {
    }finally {
      this.isLoading = false;
    }
  }
    build() {
      Column() {
        LottieComponentV2({
          animationId: 'sv_refresh_animated_id',
          animateName: 'sv_refresh_animate_name',
          Cw: 90,//lottie动画宽度
          Ch: 30,//lottie动画高度
          initialSegment: [28, Infinity], //动画分割 代表从动画那一逐帧开始播放
          loop: true,
          autoplay: false,
          animationData: JSON.parse(getRawFileJsonStringSync('loading_header.json')),
          onFinish: () => {
            //动画加载完成回调
          },
          onError:()=>{
            //动画加载失败回调
          }
        });
      }
    }
}