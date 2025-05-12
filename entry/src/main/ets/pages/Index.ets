import {Geolocation} from '@ohos_lib/geolocation'
import { geoLocationManager } from '@kit.LocationKit';
import { BusinessError } from '@kit.BasicServicesKit';

@Entry
@ComponentV2
struct Index {
  @Local message: string = 'Hello World';
  @Local addrInfo:geoLocationManager.Location|undefined = undefined;

  build() {
    Column() {
     Button('获取当前位置信息').onClick(()=>{
       Geolocation.getCurrentLocation().then(res=>{
         this.addrInfo = JSON.parse(res)
       }).catch((err:BusinessError)=>{

       })
     })
      Button('获取周边地址列表').onClick(()=>{
        Geolocation.getNearbySitesList({
          query: '',
          location:{
              longitude:this.addrInfo?.longitude!,
              latitude:this.addrInfo?.latitude!
          } ,
          radius: 500,
          language: "zh_CN",
          pageIndex: 1,
          pageSize: 20
        }).then(res=>{
        }).catch((err:BusinessError)=>{

        })
      })
    }
    .height('100%')
    .width('100%')
  }
}