import {Geolocation} from '@ohos_lib/geolocation'
@Entry
@ComponentV2
struct Index {
  @Local message: string = 'Hello World';

  build() {
    Column() {
     Button('获取当前位置信息').onClick(()=>{
       Geolocation.getCurrentLocation().then(res=>{
       })
     })
    }
    .height('100%')
    .width('100%')
  }
}