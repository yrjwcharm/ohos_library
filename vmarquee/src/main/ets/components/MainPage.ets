import { IMarquee, IMarqueeTextStyle } from "../interfaces/IMarquee";

@ComponentV2
export struct VMarqueeView {
  private timerID: number = -1; // 定时器ID
  private scrollIndex: number = 0; // 当前滚动索引
  @Param @Require originalList: IMarquee[]; //原始数据源
  @Param marqueeW:Length = '100%';//Marquee组件宽度
  @Param itemHeight: number = 30; // 每项高度
  @Param marqueeBgColor:ResourceColor=Color.Transparent //VMarquee背景颜色
  @Param textStyle:IMarqueeTextStyle= {fontSize:16,fontColor:'#333',fontWeight:FontWeight.Normal};//Marquee组件文本样式
  @Param interval:number =2000;//每隔多少毫秒开始滚动
  @Param animationDuration:number=300 //滚动动画执行时长
  @Local offsetY: number = 0; // 控制滚动偏移量
  @Local doubleList: IMarquee[] = [];  // 双倍数据用于无缝隙滚动
  @Event itemClick?:(item:IMarquee,index:number)=>void //点击每一行
  @Monitor('originalList','interval','animationDuration')
  watchOriginalListChange(){
   this.updateDataSource();
  }
  aboutToAppear() {
    this.updateDataSource();
  }
  updateDataSource(){
    this.stopScroll();
    if(this.originalList.length>0) {
      this.doubleList =[...this.originalList,...this.originalList];
      this.startScroll();
    }
  }


  aboutToDisappear() {
    this.stopScroll();
  }

  // 启动滚动
  startScroll() {
    this.timerID = setInterval(() => {
      this.scrollNext();
    }, this.interval);
  }

  // 停止滚动
  stopScroll() {
    if (this.timerID !== -1) {
      clearInterval(this.timerID);
      this.timerID = -1;
    }
  }

  // 执行滚动动画
  scrollNext() {
    const nextIndex = this.scrollIndex + 1;
    animateTo({
      duration: this.animationDuration,
      curve: Curve.Linear,
      onFinish:()=>{
        if (this.scrollIndex >= this.originalList.length) {
          // 立即无动画重置位置
          this.offsetY = 0;
          this.scrollIndex = 0;
        }
      }
    }, () => {
      // 执行滚动到下一个位置
      this.offsetY = nextIndex * this.itemHeight;
      this.scrollIndex = nextIndex;
    });
  }
  build() {
    Column() {
      // 滚动容器
      Stack({ alignContent: Alignment.TopStart }) {
        Column() {
          // 渲染双倍数据列表
          ForEach(this.doubleList, (item: IMarquee,index:number) => {
              Text(item?.content)
                .height(this.itemHeight)
                .lineHeight(this.itemHeight)
                .fontSize(this.textStyle?.fontSize)
                .fontColor(this.textStyle?.fontColor)
                .textAlign(TextAlign.Center)
                .onClick(()=>{
                  this.itemClick?.(item,index);
                })
                .textAlign(TextAlign.Center)
          })
        }
        .margin({ top: -this.offsetY }) // 通过margin控制滚动
      }
      .height(this.itemHeight) // 固定容器高度
      .width(this.marqueeW) // 宽度100%
      .backgroundColor(this.marqueeBgColor) // 黑色背景
      .clip(true) // 裁剪超出部分
    }
  }
}
