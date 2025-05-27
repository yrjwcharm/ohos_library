## Geolocation插件
___
#### 简介
**Geolocation** 这是一款获取当前地理定位信息的开源插件，基于华为MapKit地图服务功能封装

#### 安装步骤

```ohpm
ohpm install @ohos_lib/geolocation
```
#### API

| 方法                            | 介绍                      |
|:------------------------------|:------------------------|
| isLocationEnabled             | 判断判断位置服务是否已经开启。         |
| getCurrentLocation            | 获取当前位置                  |
| onLocationChangeEasy          | 开启位置变化订阅，并发起定位请求。       |
| onLocationChange              | 开启位置变化订阅，并发起定位请求        |
| offLocationChange             | 关闭位置变化订阅，并删除对应的定位请求     |
| isGeocoderAvailable           | 判断地理编码与逆地理编码服务是否可用      |
| getAddressFromLocationName    | 地理编码,将地理描述转换为具体坐标       |
| getGeoAddressFromLocationName | 地理编码,将地理描述转换为具体坐标集合     |
| getAddressFromLocation        | 逆地理编码,将坐标转换为地理描述        |
| getGeoAddressFromLocation     | 逆地理编码,将坐标转换为地理描述集合      |
| getCountryCode                | 获取当前的国家码                |
| calculateDistance             | 计算这两个点间的直线距离，单位为米       |

#### 基本用法

#### 在Entry主模块 /entry/src/main/module.json5里添加如下权限声明

```typescript
"requestPermissions": [
      {
        "name": "ohos.permission.APPROXIMATELY_LOCATION",
        "reason": "$string:access_location",
        "usedScene": {
          "abilities": [
            "EntryAbility"
          ],
          "when": "always"
        }
      },
      {
        "name": "ohos.permission.LOCATION",
        "reason": "$string:access_location",
        "usedScene": {
          "abilities": [
            "EntryAbility"
          ],
          "when": "inuse"
        }
      }
    ]
```
### 基本用法
 ```typescript
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
 ```

###  获取周边sites列表-这个需要在华为应用后台开通地图服务-MapKit

***文档在线地址：https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/map-config-agc***

#### 更多详细用法及效果展示 https://github.com/yrjwcharm/ohos_library/tree/feature/ohos/Geolocation