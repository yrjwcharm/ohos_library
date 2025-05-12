## NavigationBar组件
___
#### 简介
**Geolocation** 这是一款获取当前地理定位信息的开源插件

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
```typescript
 Geolocation.getCurrentLocation().then(res=>{
  // [{"latitude":40.043000893077036,"longitude":116.27772983844173,"locale":"zh","placeName":"北京市海淀区中电金信大厦","countryCode":"CN","countryName":"中国","administrativeArea":"北京市","subAdministrativeArea":"北京市","locality":"北京市","subLocality":"海淀区","roadName":"","subRoadName":"","premises":"","postalCode":"","phoneNumber":"","addressUrl":"","descriptions":["010","110108020"],"descriptionsSize":2}]
})
```