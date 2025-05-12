import { geoLocationManager } from "@kit.LocationKit";
import { BusinessError } from "@kit.BasicServicesKit";
import { PermissionUtil } from "./utils/PermissionUtil";
import { map, mapCommon, site } from '@kit.MapKit';

export  class  Geolocation{
   private static getCurrentLocationCallback = (successCallback: (location: geoLocationManager.Location) => void, failCallback: () => void) => {
    let requestInfo: geoLocationManager.CurrentLocationRequest =
      { 'priority': geoLocationManager.LocationRequestPriority.FIRST_FIX, 'timeoutMs': 10000 };
    let locationChange = (err: BusinessError, location: geoLocationManager.Location): void => {
      if (err) {
        console.error('getCurrentLocation: err=' + JSON.stringify(err));
        failCallback?.();
      }
      if (location) {
        console.log('getCurrentLocation: location=' + JSON.stringify(location));
        successCallback?.(location);
      }
    };
    try {
      geoLocationManager.getCurrentLocation(requestInfo, locationChange);
    } catch (err) {
      console.error("errCode:" + (err as BusinessError).code + ",errMessage:" +
      (err as BusinessError).message);
      failCallback?.();
    }
  }
  static getCurrentLocation(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      let userGrant = (await PermissionUtil.checkRequestPermissions('ohos.permission.LOCATION'))
      if (userGrant) {
        Geolocation.getCurrentAddrInfo((addr) => {
          resolve(addr);
        }, () => {
          reject();
        })
      } else {
        let userGrant = await PermissionUtil.requestPermissionsEasy(['ohos.permission.LOCATION',
          'ohos.permission.APPROXIMATELY_LOCATION']);
        if (userGrant) {
          Geolocation.getCurrentAddrInfo((addr) => {
            resolve(addr);
          }, () => {
            reject();
          })
        }
      }
    });
  }


  // 查询geoCoder服务是否可用 ---用于逆地理编码---就是把当前定位的经纬度--解析成实际地址
  private static  isGeocoderAvailable(): boolean {
    try {
      let isAvailable = geoLocationManager.isGeocoderAvailable();
      return isAvailable
    } catch (err) {
      return false
    }
  }

 private static  getCurrentAddrInfo = (successCallback: (addr: string) => void, failCallback: () => void) => {
    Geolocation.getCurrentLocationCallback((location) => {
      if (!Geolocation.isGeocoderAvailable()) {
        return;
      }
      let reverseGeocodeRequest: geoLocationManager.ReverseGeoCodeRequest = location;
      try {
        geoLocationManager.getAddressesFromLocation(reverseGeocodeRequest).then((data) => {
          successCallback(JSON.stringify(data));
        })
          .catch((error: number) => {
            failCallback();
            console.error('promise, getAddressesFromLocation: error=' + JSON.stringify(error));
          });
      } catch (err) {
        console.error("errCode:");
        failCallback();
      }
    }, () => {
      failCallback();
    })
  }
  //通过用户传入自己的位置，可以返回poi周边地点列表。您可以通过提供关键字或指定要搜索的地点的类型来优化搜索结果。使用Promise异步回调。
  static getNearbySitesList(params:site.NearbySearchParams): Promise<string> {
    return new Promise(async(resolve: Function, reject: Function) => {
      try {
          let wgs84Position: mapCommon.LatLng = {
            latitude: params?.location?.latitude,
            longitude: params?.location?.longitude
          };
          //为了精确定位，需要把WGS84坐标系 转化GCJ02坐标系 否则定位不准
          let gcj02Position: mapCommon.LatLng =
            map.convertCoordinateSync(mapCommon.CoordinateType.WGS84, mapCommon.CoordinateType.GCJ02, wgs84Position);
           params.location = gcj02Position;
          if (canIUse('SystemCapability.Map.Core')) {
            const result = await site.nearbySearch(getContext(),params);
            resolve(JSON.stringify(result?.sites));
          } else {
            reject();
          }
      } catch (e) {
        reject();
      }
    })
  }

}