## VMarqueeView
___
#### 简介
**VMarqueeView** 这是一款HarmonyNext实现无缝隙向上垂直滚动的开源插件

#### 安装步骤

```ohpm
ohpm install @ohos_lib/vmarquee
```
#### 基本用法
```typescript
import { VMarqueeView } from '@ohos_lib/vmarquee';
import { IMarquee } from '@ohos_lib/vmarquee/src/main/ets/interfaces/IMarquee';
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

  build() {
    Column() {
      VMarqueeView({
        originalList:this.data,
        marqueeBgColor:Color.Red,
        textStyle:{fontSize:20},
        itemHeight:30,
        marqueeW:'100%',
        itemClick:(item:IMarquee,index:number)=>{
        }

      })
    }
    .height('100%')
    .width('100%')
  }
}
```
### 进阶用法 自定义组件Slot插槽

```javascript
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
```

#### 完整示例 https://github.com/yrjwcharm/VMarqueeView