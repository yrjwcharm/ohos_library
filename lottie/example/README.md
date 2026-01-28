## lottie
___
#### 简介
**lottie**简化@ohos/lottie动画库组件库的开发使用，增加复用性支持

#### 安装步骤

```ohpm
ohpm install @ohos_lib/lottie
```
#### 基本用法
```typescript
import { getRawFileJsonStringSync, LottieComponentV1, LottieComponentV2 } from "@ohos_lib/lottie";

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
      Stack() {
        LottieComponentV2({
          animationId: 'sv_refresh_animated_id',
          animateName: 'sv_refresh_animate_name',
          Cw: 90,//lottie动画宽度
          Ch: 30,//lottie动画高度
          initialSegment: [28, Infinity], //动画片段分割 指定从动画那一逐帧开始播放
          loop: false, //一旦指定initialSegment ,loop为true是不生效的 @ohos/lottie原库作者问题
          autoplay: false,
          animationData: JSON.parse(getRawFileJsonStringSync('loading_header.json')),
          onFinish: () => {
            //动画加载完成回调
          },
          onError:()=>{
            //动画加载失败回调

          }
        });
      }.width('100%')
      .height('100%')
      .backgroundColor(Color.Black)
    }
}
```

#### 完整示例 https://github.com/yrjwcharm/ohos_library/tree/feature/ohos/lottie