import {CacheHelper} from '@ohos_lib/clearcache'
import { BusinessError } from '@kit.BasicServicesKit';

@Entry
@ComponentV2
struct Index {
  @Local message: string = 'Hello World';
  build() {
    Column() {
     Button('获取当前应用缓存大小').onClick(()=>{
       CacheHelper.getCacheSize().then(res=>{

       }).catch((err:BusinessError)=>{

       })
     })
      Button('清除app缓存').onClick(()=>{
         CacheHelper.cleanAppCache(getContext()).then((res)=>{

         }).catch((err:BusinessError)=>{

         })
      })
    }
    .height('100%')
    .width('100%')
  }
}