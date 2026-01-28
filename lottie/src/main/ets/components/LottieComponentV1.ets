import lottie, { AnimationConfigWithData, AnimationConfigWithPath, AnimationItem, AnimationSegment } from '@ohos/lottie'

@Component
export struct LottieComponentV1 {
  @Prop animationId: string = ''
  @Prop animateName: string = 'animation'
  @Prop contentMode: string = 'Contain'
  @Prop loop: boolean = false
  @Prop initialSegment: AnimationSegment = [0, Infinity];
  @Prop autoplay: boolean = false
  @Prop Cw: number = 220;
  @Prop Ch: number = 220;
  //这个一般用于自定义下拉刷新动画Header时使用，当你网络请求完成后 动画必须结束。重新下拉刷新保持从原来起始位置开始播放，如果没有这个标识的话，他再次下拉刷新会从上次位置继续播放。 若无自定义下拉刷新场景可自行忽略
  @Prop @Watch('watchIsPlayChange') isPlaying: boolean = true;
  @Prop @Require animationData: object;
  onFinish: () => void=()=>{}
  onError:()=>void=()=>{}
  private renderingSettings: RenderingContextSettings = new RenderingContextSettings(true);
  private canvasRenderingContext: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.renderingSettings);
  private animateItem: AnimationItem | null = null;

  loadAnimation() {
    let params:AnimationConfigWithPath | AnimationConfigWithData=  {
      container: this.canvasRenderingContext,
      renderer: 'canvas', // canvas 渲染模式
      loop: this.loop,
      autoplay: this.autoplay,
      name: this.animateName,
      contentMode: this.contentMode,
      animationData: this.animationData
    }
    !this.loop && (params.initialSegment = this.initialSegment)
    this.animateItem = lottie.loadAnimation(params)
    // 因为动画是异步加载，所以对animateItem的操作需要放在动画加载完成回调里操作
    this.animateItem?.addEventListener('DOMLoaded', (args: Object): void => {
      // this.animateItem.changeColor([225, 25, 100, 1]);
      this.animateItem?.play();
    });
    this.animateItem?.addEventListener('complete', () => {
      this.onFinish?.();
    })
    this.animateItem?.addEventListener('error',()=>{
      this.onError?.();
    })
  }

  watchIsPlayChange() {
    if (!this.isPlaying) {
      this.destroy();
    }
  }

  destroy() {
    this.animateItem?.removeEventListener('DOMLoaded');
    lottie.destroy(this.animateName);
    this.animateItem = null;
  }

  build() {
    Stack() {
      Canvas(this.canvasRenderingContext)
        .width(this.Cw)
        .height(this.Ch)
        // .backgroundColor(Color.Gray)
        .onReady(() => {
          // 加载动画
          if (this.animateItem != null) {
            // 可在此生命回调周期中加载动画，可以保证动画尺寸正确
            this.animateItem?.resize();
          } else {
            // 抗锯齿的设置
            this.canvasRenderingContext.imageSmoothingEnabled = true;
            this.canvasRenderingContext.imageSmoothingQuality = 'medium';
            this.loadAnimation();
          }
        })
    }
  }
}
