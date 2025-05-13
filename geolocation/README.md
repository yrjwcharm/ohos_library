## Geolocation插件
___
#### 简介
**Geolocation** 这是一款获取当前地理定位信息的开源插件，基于华为MapKit地图服务功能封装

#### 安装步骤

```ohpm
ohpm install @ohos_lib/geolocation
```
#### 参数

#### 基本用法

#### 在Entry主模块 /entry/src/main/module.json5里添加如下权限声明

```json
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
<pre style="background:#f4f5f6">
<code style="color:green">
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
</code>
</pre>
###  获取周边sites列表-这个需要在华为应用后台开通地图服务-MapKit

***文档在线地址：https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/map-config-agc***

