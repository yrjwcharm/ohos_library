## VMarqueeView
___
#### 简介
**VMarqueeView** 是一款HarmonyNext实现无缝隙向上垂直滚动的开源插件

#### 安装步骤

```ohpm
ohpm install @ohos_lib/vmarquee
```

```extendtypescript
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
#### 完整示例 https://github.com/yrjwcharm/VMarqueeView