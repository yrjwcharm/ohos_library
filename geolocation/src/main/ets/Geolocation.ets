import { geoLocationManager } from "@kit.LocationKit";
import { BusinessError } from "@kit.BasicServicesKit";
import { PermissionUtil } from "./utils/PermissionUtil";

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
}