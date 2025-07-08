import { Marquee, VMarqueeView } from '@ohos_lib/vmarquee';
interface  IResultData{
  classNumber:string,
  title:string
}
@Entry
@ComponentV2
struct Index {
  @Local message: string = 'Hello World';
  @Local data:Marquee[] = [];
  aboutToAppear(): void {
    //假设 responseData 数据从网络获取 结构为 result 可以这么处理
    let result:IResultData[] = [{classNumber:'111',title:'标题121111234343434343434'},{classNumber:'222',title:'标题2222234343'},{classNumber:'333',title:'标题2222223'}];
     this.data = result.map((item)=>{
       const marquee =new Marquee();
       marquee.id = item.classNumber;
       marquee.content = item.title;
       marquee.icon = $r('app.media.startIcon')
       return marquee;
     })
  }
  @Builder
  customBuilder(item:Marquee,index:number){
    Row(){
      Image($r('app.media.startIcon')).width(24)
        .height(24)
      Text(item.content)
        .margin({
          left:6
        })
    }.height(30).backgroundColor(Color.Orange)
    .padding({
      left:16
    })
    .width('100%')
  }
  build() {
    Column() {
      VMarqueeView({
        originalList:this.data,
        marqueeBgColor:Color.Red,
        textStyle:{fontSize:20},
        itemHeight:30,
        marqueeW:'100%',
        builder: this.customBuilder,
        itemClick:(item:Marquee,index:number)=>{
        }

      })
    }
    .height('100%')
    .width('100%')
  }
}