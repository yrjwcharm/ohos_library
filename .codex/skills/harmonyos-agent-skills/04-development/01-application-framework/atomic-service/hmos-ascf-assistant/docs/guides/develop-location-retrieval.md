# 获取位置信息


位置子系统使用多种定位技术提供服务，如GNSS定位、基站定位、WLAN/蓝牙定位（基站定位、WLAN/蓝牙定位后续统称“网络定位技术”）；通过这些定位技术，无论用户设备在室内或是户外，都可以准确地确定设备位置。


位置服务除了提供基础的定位服务之外，还提供了地理围栏、地理编码、逆地理编码、国家码等功能和接口。


- 坐标  

  系统以1984年世界大地坐标系统为参考，使用经度、纬度数据描述地球上的一个位置。

- GNSS定位
  
  基于全球导航卫星系统，包含：GPS、GLONASS、北斗、Galileo等，通过导航卫星、设备芯片提供的定位算法，来确定设备准确位置。定位过程具体使用哪些定位系统，取决于用户设备的硬件能力。

- 基站定位 
 
  根据设备当前驻网基站和相邻基站的位置，估算设备当前位置。此定位方式的定位结果精度相对较低，并且需要设备可以访问蜂窝网络。

- WLAN、蓝牙定位  

  根据设备可搜索到的周围WLAN、蓝牙设备位置，估算设备当前位置。此定位方式的定位结果精度依赖设备周围可见的固定WLAN、蓝牙设备的分布，密度较高时，精度也相较于基站定位方式更高，同时也需要设备可以访问网络。


## 运作机制

位置能力作为系统为应用提供的一种基础服务，需要应用在所使用的业务场景，向系统主动发起请求，并在业务场景结束时，主动结束此请求，在此过程中系统会将实时的定位结果上报给应用。


## 约束与限制

使用设备的位置能力，需要用户进行确认并主动开启位置开关。如果位置开关没有开启，系统不会向任何应用提供位置服务。

设备位置信息属于用户敏感数据，所以即使用户已经开启位置开关，应用在获取设备位置前仍需向用户申请位置访问权限。在用户确认允许后，系统才会向应用提供位置服务。


## 开发指导

应用在使用位置服务系统能力前，需要检查是否已经获取用户授权访问设备位置信息。如未获得授权，可以向用户申请需要的位置权限。

系统提供的定位权限有：

- ohos.permission.LOCATION：用于获取精准位置，精度在米级别。

- ohos.permission.APPROXIMATELY_LOCATION：用于获取模糊位置，精度为5公里。  

  访问设备的位置信息，需申请权限并获取用户授权。

  开发者可以在应用配置文件中声明所需要的权限，具体可参考[向用户申请授权](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/apis-authorization)。

  ```js
  has.authorize({
    scope: 'scope.userLocation',
    success: (res) => {
      has.getLocation({
        type: 'wgs84',
        success: (res) => {
          const latitude = res.latitude;
          const longitude = res.longitude;
          const speed = res.speed;
          const accuracy = res.accuracy;
          console.info('getLocation success', res);
        },
        fail: (err) => {
          console.error('getLocation fail', err);
        },
        complete: (res) => {
          console.info('getLocation complete', res);
        }
      });
      console.info('authorize success', res);
    },
    fail: (err) => {
      console.error('authorize fail', err);
    },
    complete: (res) => {
      console.info('authorize complete', res);
    }
  });
  ```
