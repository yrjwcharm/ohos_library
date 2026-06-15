# 位置

## has.openLocation

has.openLocation(Object object)

使用引擎内置地图查看具体位置。

使用前，需参考[开发准备](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/map-config-agc)完成基本准备工作。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| latitude | number | 是 | 纬度，范围为-90 ~ 90，负数表示南纬。<br/>注：中国大陆、港澳地区，请使用 gcj02，其他地区请使用 wgs84。 |
| longitude | number | 是 | 经度，范围为-180 ~ 180，负数表示西经。根据type字段决定使用哪套坐标系。<br/>注：中国大陆、港澳地区，请使用 gcj02，其他地区请使用 wgs84。 |
| name | string | 是 | 位置名。 |
| address | string | 否 | 地址的详细说明。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.openLocation({
  longitude: 114.52845090013192,
  latitude: 30.497287768914163,
  name: 'name',
  address: 'address',
  success: () => {
    console.info('openLocation success');
  },
  fail: (err) => {
    console.error('openLocation fail', err);
  },
  complete: (res) => {
    console.info('openLocation complete', res);
  }
});
```

## has.getLocation

has.getLocation(Object object)

获取当前的地理位置、速度。开启高精度定位，接口耗时会增加，可指定 highAccuracyExpireTime 作为超时时间。

**起始版本：** 1.0.0

**需要权限：**

1. 在module.json5中声明**ohos.permission.LOCATION**和**ohos.permission.APPROXIMATELY_LOCATION**。

2. 使用[has.authorize()](apis-authorization.md#hasauthorize)申请[scope.userLocation](../../guides/develop-authorization.md#scope-列表)授权。

**参数：**

参数为Object对象，包括以下字段。

| 属性 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| type | string | wgs84 | 否 | - wgs84：返回 gps 坐标。<br/>- gcj02：返回国测局坐标。 |
| altitude | boolean | false | 否 | 传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度。 |
| isHighAccuracy | boolean | false | 否 | 开启高精度定位。 |
| highAccuracyExpireTime | number | - | 否 | 高精度定位超时时间(ms)，指定时间内返回最高精度，该值3000ms以上高精度定位才有效果。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 属性 | 类型 | 描述 |
| -------- | -------- | -------- |
| latitude | number | 纬度，范围为 -90~90，负数表示南纬，根据type参数确定使用坐标。 |
| longitude | number | 经度，范围为 -180~180，负数表示西经，根据type参数确定使用坐标。 |
| speed | number | 速度，单位 m/s。 |
| accuracy | number | 位置的精确度，反映与真实位置之间的接近程度，可以理解成：10，即与真实位置相差10m，越小越精确。 |
| altitude | number | 高度，单位 m。 |
| verticalAccuracy | number | 垂直精度，单位 m。 |

**示例：**

```js
has.authorize({
  scope: 'scope.userLocation',
  success: () => {
    has.getLocation({
      type: 'wgs84',
      success: (res) => {
        console.info('getLocation success', res);
      },
      fail: (err) => {
       console.error('getLocation fail', err);
      },
      complete: (res) => {
        console.info('getLocation complete', res);
      }
    });
  }
});
```

## has.getFuzzyLocation

has.getFuzzyLocation(Object object)

获取当前的模糊地理位置。

**起始版本：** 1.0.0

**需要权限：**

1. 在module.json5中声明**ohos.permission.APPROXIMATELY_LOCATION**。

2. 使用[has.authorize()](apis-authorization.md#hasauthorize)申请[scope.userFuzzyLocation](../../guides/develop-authorization.md#scope-列表)授权。

**参数：**

参数为Object对象，包括以下字段。

| 属性 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| type | string | wgs84 | 否 | wgs84 返回 gps 坐标，gcj02 返回国测局坐标。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 属性 | 类型 | 描述 |
| -------- | -------- | -------- |
| latitude | number | 纬度，范围为 -90~90，负数表示南纬，根据type参数确定使用坐标。 |
| longitude | number | 经度，范围为 -180~180，负数表示西经，根据type参数确定使用坐标。 |

**示例：**

```js
has.authorize({
  scope: 'scope.userFuzzyLocation',
  success: () => {
    has.getFuzzyLocation({
      type: 'wgs84',
      success: (res) => {
        console.info('getFuzzyLocation success', res);
      },
      fail: (err) => {
       console.error('getFuzzyLocation fail', err);
      },
      complete: (res) => {
        console.info('getFuzzyLocation complete', res);
      }
    })
  }
});
```

## has.chooseLocation

has.chooseLocation(Object object)

打开地图选择位置。

使用前，需参考[开发准备](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/map-config-agc)完成基本准备工作。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| latitude | number | 否 | 目标地纬度。<br/>注：中国大陆、港澳地区，请使用gcj02，其他地区请使用wgs84。 |
| longitude | number | 否 | 目标地经度。<br/>注：中国大陆、港澳地区，请使用gcj02，其他地区请使用wgs84。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| name | string | 位置名称。 |
| address | string | 详细地址。 |
| countryCode | string | 国家/地区码。 |
| countryName | string | 国家名。 |
| latitude | number | 纬度，浮点数，范围为-90 ~ 90，负数表示南纬。<br/>注：中国大陆、港澳地区，请使用 gcj02，其他地区请使用 wgs84。 |
| longitude | number | 经度，浮点数，范围为-180 ~ 180，负数表示西经。<br/>注：中国大陆、港澳地区，请使用 gcj02，其他地区请使用 wgs84。 |

**示例：**

```js
has.chooseLocation({
  longitude: 114.52845090013192,
  latitude: 30.497287768914163,
  success: (res) => {
    console.info('chooseLocation success', res);
  },
  fail: (err) => {
    console.error('chooseLocation fail', err);
  },
  complete: (res) => {
    console.info('chooseLocation complete', res);
  }
});
```

## has.startLocationUpdate

has.startLocationUpdate(Object object)

开启元服务进入前台时接收位置消息。

**起始版本：** 1.0.15

**需要权限：**

1. 在module.json5中声明**ohos.permission.APPROXIMATELY_LOCATION**。

2. 使用[has.authorize()](apis-authorization.md#hasauthorize)申请[scope.userFuzzyLocation](../../guides/develop-authorization.md#scope-列表)授权。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| type | string | gcj02 | 否 | wgs84 返回 gps 坐标，gcj02 返回可用于 [has.openLocation](#hasopenlocation) 的坐标。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.startLocationUpdate({
  success: () => {
    console.info('startLocationUpdate success');
  },
  fail: (err) => {
    console.error('startLocationUpdate fail', err);
  },
  complete: (res) => {
    console.info('startLocationUpdate complete', res);
  }
});
```

## has.startLocationUpdateBackground

has.startLocationUpdateBackground(Object object)

开启元服务在前后台时均可接收位置消息。

**起始版本：** 1.0.15

**需要权限：**

1. 在module.json5中声明**ohos.permission.APPROXIMATELY_LOCATION**。

2. 使用[has.authorize()](apis-authorization.md#hasauthorize)申请[scope.userFuzzyLocation](../../guides/develop-authorization.md#scope-列表)授权。

3. 开启后台定位，需要在module.json5中声明**backgroundModes**配置项：  

   ```json
   "module": {
     "abilities": [
       {
         "backgroundModes": [
           "location"
         ]
       }
     ]
   }
   ```

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| type | string | gcj02 | 否 | wgs84返回gps坐标，gcj02返回可用于[has.openLocation](#hasopenlocation)的坐标。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.startLocationUpdateBackground({
  success: () => {
    console.info('startLocationUpdateBackground success');
  },
  fail: (err) => {
    console.error('startLocationUpdateBackground fail', err);
  },
  complete: (res) => {
    console.info('startLocationUpdateBackground complete', res);
  }
});
```

## has.stopLocationUpdate

has.stopLocationUpdate(Object object)

关闭监听实时位置变化，前后台都停止消息接收。

**起始版本：** 1.0.15

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.stopLocationUpdate({
  success: () => {
    console.info('stopLocationUpdate success');
  },
  fail: (err) => {
    console.error('stopLocationUpdate fail', err);
  },
  complete: (res) => {
    console.info('stopLocationUpdate complete', res);
  }
});
```

## has.onLocationChange

has.onLocationChange(function callback)

监听实时地理位置变化事件，需结合[has.startLocationUpdateBackground](#hasstartlocationupdatebackground)、[has.startLocationUpdate](#hasstartlocationupdate)使用。

**起始版本：** 1.0.15

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 是 | 实时地理位置变化事件的监听函数。 |

**callback返回值：**

Object类型，包括以下字段。

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| latitude | number | 纬度，范围为 -90~90，负数表示南纬。使用gcj02国测局坐标系。 |
| longitude | number | 经度，范围为 -180~180，负数表示西经。使用gcj02国测局坐标系。 |
| speed | number | 速度，单位m/s。 |
| accuracy | number | 位置的精确度。 |
| altitude | number | 高度，单位m。 |
| verticalAccuracy | number | 垂直精度，单位m。 |
| horizontalAccuracy | number | 水平精度，单位m。 |

**示例：**

```js
const onLocationChangeFn = function(res) {
  console.info('onLocationChange callback triggered', res);
};
has.onLocationChange(onLocationChangeFn);
```

## has.offLocationChange

has.offLocationChange(function callback)

移除实时地理位置变化事件的监听函数。

**起始版本：** 1.0.15

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | [has.onLocationChange](#hasonlocationchange)传入的监听函数，不传此参数则移除所有监听函数。 |

**示例：**

```js
const onLocationChangeFn = function(res) {
  console.info('onLocationChange callback triggered', res);
};
has.onLocationChange(onLocationChangeFn);
has.offLocationChange(onLocationChangeFn);
```
