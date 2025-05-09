import { VMarqueeView } from '@ohos_lib/vmarquee';
import { IMarquee } from '@ohos_lib/vmarquee/src/main/ets/interfaces/IMarquee';
interface  IResultData{
  classNumber:string,
  title:string
}
@Entry
@ComponentV2
struct Index {
  @Local message: string = 'Hello World';
  @Local data:IMarquee[] = [
    { id:1,content:'111111111111111111111111'},
    { id:2,content:'222222222222222222222222'},
    { id:3,content:'333333333333333333333333'},
    { id:4,content:'444444444444444444444444'},
    { id:5,content:'555555555555555555555555'},
    { id:6,content:'666666666666666666666666'},
    { id:7,content:'777777777777777777777777'},
    { id:8,content:'888888888888888888888888'},
    { id:9,content:'999999999999999999999999'},
  ];
  // aboutToAppear(): void {
  //   //假设 responseData 数据从网络获取 结构为 result 可以这么处理
  //   let result:IResultData[] = [{classNumber:'111',title:'标题1'},{classNumber:'222',title:'标题2'},{classNumber:'333',title:'标题3'}];
  //    this .data  = result.map((item,index)=>{
  //     return {id:item.classNumber,content:item.title} satisfies IMarquee //或者 as IMarquee 这两个有区别 建议多用satisfies
  //   })
  // }
  @Builder
  customBuilder(item:IMarquee,index:number){
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
        itemClick:(item:IMarquee,index:number)=>{
        }

      })
    }
    .height('100%')
    .width('100%')
  }
}