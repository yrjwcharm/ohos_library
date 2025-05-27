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


  /**
   * 判断位置服务是否已经使能(定位是否开启)。
   * @returns
   */
  static isLocationEnabled(): boolean {
    return geoLocationManager.isLocationEnabled();
  }


  /**
   * 申请定位权限
   * @returns
   */
  private static async requestLocationPermissions(): Promise<boolean> {
    let grant = await PermissionUtil.requestPermissions(['ohos.permission.LOCATION', 'ohos.permission.APPROXIMATELY_LOCATION']);
    if (!grant) {
      grant = await PermissionUtil.requestPermissionOnSetting(['ohos.permission.LOCATION', 'ohos.permission.APPROXIMATELY_LOCATION']);
    }
    return grant;
  }

  /**
   * 开启位置变化订阅，并发起定位请求。
   * @param callBack
   * @returns 失败返回错误码，成功返回0。
   */
  static onLocationChangeEasy(callBack: Callback<geoLocationManager.Location>): number {
    try {
      let locationRequest: geoLocationManager.LocationRequest = {
        'priority': geoLocationManager.LocationRequestPriority.FIRST_FIX, //表示快速获取位置优先，如果应用希望快速拿到一个位置，可以将优先级设置为该字段。
        'scenario': geoLocationManager.LocationRequestScenario.UNSET, //表示未设置优先级，表示LocationRequestPriority无效。
        'timeInterval': 10, //表示上报位置信息的时间间隔，单位是秒。默认值为1，取值范围为大于等于0。10秒钟获取一下位置
        'distanceInterval': 0, //表示上报位置信息的距离间隔。单位是米，默认值为0，取值范围为大于等于0。
        'maxAccuracy': 0 //表示精度信息，单位是米。
      }; //开启位置变化订阅，默认Request参数
      geoLocationManager.on('locationChange', locationRequest, callBack);
      return 0; //成功返回-0
    } catch (err) {
      let error = err as BusinessError;
      return error.code; //失败返回-错误码
    }
  }


  /**
   * 开启位置变化订阅，并发起定位请求。
   * @param request
   * @param callBack
   * @returns 失败返回错误码，成功返回0。
   */
  static onLocationChange(request: geoLocationManager.LocationRequest | geoLocationManager.ContinuousLocationRequest,
    callBack: Callback<geoLocationManager.Location>): number {
    try {
      geoLocationManager.on('locationChange', request, callBack);
      return 0; //成功返回-0
    } catch (err) {
      let error = err as BusinessError;
      return error.code; //失败返回-错误码
    }
  }


  /**
   * 关闭位置变化订阅，并删除对应的定位请求。
   * @param callback 不传，取消当前类型的所有订阅。
   * @returns 失败返回错误码，成功返回0。
   */
  static offLocationChange(callback?: Callback<geoLocationManager.Location>): number {
    try {
      if (callback) {
        geoLocationManager.off('locationChange', callback);
      } else {
        geoLocationManager.off('locationChange'); //callback:需要取消订阅的回调函数。若无此参数，则取消当前类型的所有订阅。
      }
      return 0; //成功返回-0
    } catch (err) {
      let error = err as BusinessError;
      return error.code; //失败返回-错误码
    }
  }

  /**
   * 地理编码,将地理描述转换为具体坐标集合（无需申请定位权限）
   * @param locationName  地理位置中文描述
   * @param maxItems 表示返回位置信息的最大个数。
   * @returns
   * @returns 编码后集合
   */
  static async getGeoAddressFromLocationName(locationName: string, maxItems: number = 1): Promise<Array<geoLocationManager.GeoAddress>> {
    const geocodeRequest: geoLocationManager.GeoCodeRequest = {
      description: locationName, //表示位置描述信息的语言，“zh”代表中文，“en”代表英文。
      maxItems: maxItems, //表示返回位置信息的最大个数。取值范围为大于等于0，推荐该值小于10。
      locale: 'zh' //表示位置信息描述，如“上海市浦东新区xx路xx号”。
    };
    let result = await geoLocationManager.getAddressesFromLocationName(geocodeRequest);
    if (result && result.length > 0) {
      return result;
    } else {
      return [];
    }
  }

  /**
   * 地理编码,将地理描述转换为具体坐标（无需申请定位权限）
   * @param locationName  地理位置中文描述
   * @returns 编码后location对象
   */
  static async getAddressFromLocationName(locationName: string): Promise<geoLocationManager.GeoAddress> {
    let geoAddress = await Geolocation.getGeoAddressFromLocationName(locationName, 1);
    if (geoAddress != null && geoAddress.length >= 1) {
      return geoAddress[0];
    }
    return {};
  }


  /**
   * 逆地理编码,将坐标转换为地理描述集合（无需申请定位权限）
   * @param latitude 纬度
   * @param longitude 经度
   * @returns 逆编码后集合
   */
  static async getGeoAddressFromLocation(latitude: number, longitude: number,
    maxItems: number = 1): Promise<Array<geoLocationManager.GeoAddress>> {
    const reverseGeocodeRequest: geoLocationManager.ReverseGeoCodeRequest = {
      latitude: latitude,
      longitude: longitude,
      maxItems: maxItems,
      locale: 'zh'
    };
    let result = await geoLocationManager.getAddressesFromLocation(reverseGeocodeRequest);
    if (result && result.length > 0) {
      return result;
    } else {
      return [];
    }
  }

  /**
   * 逆地理编码,将坐标转换为地理描述（无需申请定位权限）
   * @param latitude 纬度
   * @param longitude 经度
   * @returns 逆编码后对象
   */
  static async getAddressFromLocation(latitude: number, longitude: number): Promise<geoLocationManager.GeoAddress> {
    let geoAddress = await Geolocation.getGeoAddressFromLocation(latitude, longitude, 1);
    if (geoAddress != null && geoAddress.length >= 1) {
      return geoAddress[0];
    }
    return {};
  }


  /**
   * 获取当前的国家码（无需申请定位权限）
   * @returns 返回当前位置中文描述
   */
  static async getCountryCode(): Promise<string> {
    let result = await geoLocationManager.getCountryCode(); //获取当前的国家码
    if (result.country) {
      return result.country;
    }
    return "";
  }


  /**
   * 获取错误msg
   * @param code
   * @param defaultMsg
   */
  static getErrorMsg(code: number, defaultMsg: string) {
    if (201 == code) {
      return '权限校验失败！'
    } else if (202 == code) {
      return '系统API权限校验失败！'
    } else if (401 == code) {
      return '参数检查失败！'
    } else if (801 == code) {
      return '该设备不支持此API！'
    } else if (3301000 == code) {
      return '位置服务不可用！'
    } else if (3301100 == code) {
      return '请开启位置功能开关！'
    } else if (3301200 == code) {
      return '定位失败，未获取到定位结果！'
    } else if (3301300 == code) {
      return '逆地理编码查询失败！'
    } else if (3301400 == code) {
      return '地理编码查询失败！'
    } else if (3301500 == code) {
      return '区域信息（包含国家码）查询失败！'
    } else if (3301600 == code) {
      return '地理围栏操作失败！'
    } else {
      return defaultMsg
    }
  }


  /**
   * 根据指定的两个经纬度坐标点，计算这两个点间的直线距离，单位为米。
   * @returns
   */
  static calculateDistance(from: mapCommon.LatLng, to: mapCommon.LatLng): number {
    return map.calculateDistance(from, to);
  }


  /**
   * 根据指定的两个经纬度坐标点，计算这两个点间的直线距离，单位为米。
   * @returns
   */
  static calculateDistanceEasy(fromLat: number, fromLng: number, toLat: number, toLng: number): number {
    let fromLatLng: mapCommon.LatLng = { latitude: fromLat, longitude: fromLng };
    let toLatLng: mapCommon.LatLng = { latitude: toLat, longitude: toLng };
    return map.calculateDistance(fromLatLng, toLatLng);
  }
}