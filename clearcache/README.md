## ClearCache插件
___
#### 简介
**ClearCache** 这是一款获取当前应用缓存大小，并清除应用缓存的开源插件

#### 安装步骤

```ohpm
ohpm install @ohos_lib/clearcache
```
#### 参数

#### 基本用法
```typescript
mport {CacheHelper} from '@ohos_lib/clearcache'
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
```
