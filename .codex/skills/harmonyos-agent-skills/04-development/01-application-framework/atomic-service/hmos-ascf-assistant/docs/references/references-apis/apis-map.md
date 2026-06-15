# 地图

## has.createMapContext

has.createMapContext(string mapId): MapContext

创建[map](../references-components/components-map.md)上下文MapContext对象。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| mapId | string | - | 是 | map组件的id。 |

**返回值：**

返回[MapContext](#mapcontext)对象。

**示例：**

```js
let mapContext = has.createMapContext('mapId');
```

## MapContext

### MapContext.getCenterLocation

MapContext.getCenterLocation(Object object)

获取当前地图中心的经纬度。返回的是gcj02坐标系坐标。

**起始版本：** 1.0.0

**注意事项**：在调用此接口时如果使用网络资源，需要先完成[配置服务器域名](https://developer.huawei.com/consumer/cn/doc/atomic-guides/agc-help-harmonyos-server-domain)。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| iconPath | string | - | 否 | 图标路径，支持网络路径、本地路径、代码包路径。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值**：

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| longitude | number | 经度。 |
| latitude | number | 纬度。 |

**示例：**

```js
let mapContext = has.createMapContext('mapId');
mapContext.getCenterLocation({
  iconPath: '/path/icon.png', // 此处仅为样例，请开发者更换为可用图片资源地址
  success: (res) => {
    console.info('getCenterLocation success, res:', res);
  },
  fail: (err) => {
    console.error('getCenterLocation fail, err:', err);
  },
  complete: (res) => {
    console.info('getCenterLocation complete, res:', res);
  }
});
```

### MapContext.getRegion

MapContext.getRegion(Object object)

获取当前地图的视野范围。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| southwest | Object | 西南角经纬度。 |
| northeast | Object | 东北角经纬度。 |

**southwest返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| longitude | number | 经度。 |
| latitude | number | 纬度。 |

**northeast返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| longitude | number | 经度。 |
| latitude | number | 纬度。 |

**示例：**

```js
let mapContext = has.createMapContext('mapId');
mapContext.getRegion({
  success: (res) => {
    console.info('getRegion success, res:', res);
  },
  fail: (err) => {
    console.error('getRegion fail, err:', err);
  },
  complete: (res) => {
    console.info('getRegion complete, res:', res);
  }
});
```

### MapContext.getRotate

MapContext.getRotate(Object object)

获取当前地图的旋转角。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| rotate | number | 旋转角。 |

**示例：**

```js
let mapContext = has.createMapContext('mapId');
mapContext.getRotate({
  success: (res) => {
    console.info('getRotate success, res:', res);
  },
  fail: (err) => {
    console.error('getRotate fail, err:', err);
  },
  complete: (res) => {
    console.info('getRotate complete, res:', res);
  }
});
```

### MapContext.getScale

MapContext.getScale(Object object)

获取当前地图的缩放级别。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| scale | number | 缩放值。 |

**示例：**

```js
let mapContext = has.createMapContext('mapId');
mapContext.getScale({
  success: (res) => {
    console.info('getScale success, res:', res);
  },
  fail: (err) => {
    console.error('getScale fail, err:', err);
  },
  complete: (res) => {
    console.info('getScale complete, res:', res);
  }
});
```

### MapContext.getSkew

MapContext.getSkew(Object object)

获取当前地图的倾斜角。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| skew | number | 倾斜角。 |

**示例：**

```js
let mapContext = has.createMapContext('mapId');
mapContext.getSkew({
  success: (res) => {
    console.info('getSkew success, res:', res);
  },
  fail: (err) => {
    console.error('getSkew fail, err:', err);
  },
  complete: (res) => {
    console.info('getSkew complete, res:', res);
  }
});
```

### MapContext.includePoints

MapContext.includePoints(Object object)

缩放视野使所有输入的坐标点都在可视范围内。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| points | Array&lt;Object&gt; | - | 是 | 要显示在可视区域内的坐标点列表。 |
| padding | Array&lt;number&gt; | - | 否 | 坐标点形成的矩形边缘到地图边缘的距离，单位像素。格式为[上,右,下,左]。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**points属性：**

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| longitude | number | - | 是 | 经度。 |
| latitude | number | - | 是 | 纬度。 |

**示例：**

```js
let mapContext = has.createMapContext('mapId');
mapContext.includePoints({
  points: [
    { latitude: 30.492150773775826, longitude: 114.5387855706236 },
    { latitude: 31.492150773775826, longitude: 113.5387855706236 }
  ],
  padding: [20, 20, 20, 20],
  success: () => {
    console.info('includePoints success');
  },
  fail: (err) => {
    console.error('includePoints fail, err:', err);
  },
  complete: (res) => {
    console.info('includePoints complete, res:', res);
  }
});
```

### MapContext.moveToLocation

MapContext.moveToLocation(Object object)

将地图中心移至当前定位点，此时需设置地图组件 show-location 为true。

**起始版本：** 1.0.0

**需要权限：**

1. 在module.json5中声明**ohos.permission.APPROXIMATELY_LOCATION**。

2. 使用[has.authorize()](apis-authorization.md#hasauthorize)申请[scope.userLocation](../../guides/develop-authorization.md#scope-列表)授权。

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| longitude | number | - | 否 | 经度。 |
| latitude | number | - | 否 | 纬度。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
let mapContext = has.createMapContext('mapId');
mapContext.moveToLocation({
  longitude: 114.2342423,
  latitude: 34.232424232,
  success: () => {
    console.info('moveToLocation success');
  },
  fail: (err) => {
    console.error('moveToLocation fail, err:', err);
  },
  complete: (res) => {
    console.info('moveToLocation complete, res:', res);
  }
});
```

### MapContext.translateMarker

MapContext.translateMarker(Object object)

平移marker，带动画。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| markerId | number | - | 是 | 指定 marker。 |
| destination | Object | - | 是 | 指定 marker 移动到的目标点。 |
| autoRotate | boolean | - | 是 | 移动过程中是否自动旋转 marker。 |
| rotate | number | 0 | 否 | marker 的旋转角度。 |
| duration | number | 1000 | 否 | 动画持续时长。 |
| animationEnd | function | - | 否 | 动画结束回调函数。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**destination属性：**

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| longitude | number | - | 是 | 经度。 |
| latitude | number | - | 是 | 纬度。 |

**示例：**

```js
let mapContext = has.createMapContext('mapId');
mapContext.translateMarker({
  markerId: 1000,
  destination: {
    longitude: 78.232323,
    latitude: 23.121212
  },
  autoRotate: true,
  rotate: 90,
  duration: 1000,
  animationEnd: () => {
    console.info('translateMarker animationEnd');
  },
  success: () => {
    console.info('translateMarker success');
  },
  fail: (err) => {
    console.error('translateMarker fail, err:', err);
  },
  complete: (res) => {
    console.info('translateMarker complete, res:', res);
  }
});
```

### MapContext.toScreenLocation

MapContext.toScreenLocation(Object object)

获取经纬度对应的屏幕坐标。坐标原点为地图左上角。

**起始版本：** 1.0.18

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| latitude | number | 是 | 纬度。 |
| longitude | number | 是 | 经度。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| x | number | 是 | x 坐标值。 |
| y | number | 是 | y 坐标值。 |

**示例：**

```js
let mapContext = has.createMapContext('mapId');
mapContext.toScreenLocation({
  longitude: 78.232323,
  latitude: 23.121212,
  success: (res) => {
    console.info('toScreenLocation success, res:', res);
  },
  fail: (err) => {
    console.error('toScreenLocation fail, err:', err);
  },
  complete: (res) => {
    console.info('toScreenLocation complete, res:', res);
  }
});
```

### MapContext.setLocMarkerIcon

MapContext.setLocMarkerIcon(Object object)

设置定位点图标。支持网络路径、本地路径、代码包路径。

**起始版本：** 1.0.18

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| iconPath | string | 是 | 图标路径，支持网络路径、本地路径、代码包路径。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
let mapContext = has.createMapContext('mapId');
mapContext.setLocMarkerIcon({
  iconPath: '/path/icon.png', // 此处仅为样例，请开发者更换为可用图片资源地址
  success: () => {
    console.info('setLocMarkerIcon success');
  },
  fail: (err) => {
    console.error('setLocMarkerIcon fail, err:', err);
  },
  complete: (res) => {
    console.info('setLocMarkerIcon complete, res:', res);
  }
});
```

### MapContext.moveAlong

MapContext.moveAlong(Object object)

沿指定路径移动marker。用于轨迹回放等场景。

**起始版本：** 1.0.18

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| markerId | number | - | 是 | 指定marker。 |
| path | Array | - | 是 | 移动路径的坐标串，坐标点格式 {longitude, latitude}。 |
| autoRotate | boolean | true | 否 | 根据路径方向自动改变 marker 的旋转角度。 |
| isMapMoving | boolean | - | 否 | 是否跟随动画移动。 |
| color | string | \#0A59F7CC | 否 | 轨迹颜色。 |
| width | number | 10 | 否 | 轨迹宽度。 |
| duration | number | - | 是 | 平滑移动的时间 ，单位为毫秒，最小值为100。当取值小于100时，则设值为5000。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
let mapContext = has.createMapContext('mapId');
let path = [];
path.push({ latitude: 31.99685233070878, longitude: 118.75846023442728 });
path.push({ latitude: 31.993617206525155, longitude: 118.76150529647698 });
mapContext.moveAlong({
  markerId: 1000,
  path: path , // 坐标数组
  autoRotate: true,
  isMapMoving: true,
  color: '#0A59F7CC',
  width: 10,
  duration: 3000,
  success: () => {
    console.info('moveAlong success');
  },
  fail: (err) => {
    console.error('moveAlong fail, err:', err);
  },
  complete: (res) => {
    console.info('moveAlong complete, res:', res);
  }
});
```

### MapContext.setCenterOffset

MapContext.setCenterOffset(Object object)

设置地图中心点偏移。向后向下为增长，屏幕比例范围(0.25~0.75)，默认偏移为[0.5, 0.5]。

**起始版本：** 1.0.18

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| offset | Array | - | 是 | 偏移量，两位数组。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
let mapContext = has.createMapContext('mapId');
mapContext.setCenterOffset({
  offset: [0.25, 0.25],
  success: () => {
    console.info('setCenterOffset success');
  },
  fail: (err) => {
    console.error('setCenterOffset fail, err:', err);
  },
  complete: (res) => {
    console.info('setCenterOffset complete, res:', res);
  }
});
```

### MapContext.addMarkers

MapContext.addMarkers(Object object)

添加marker。

**起始版本：** 1.0.18

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| markers | Array | - | 是 | 同传入map组件的marker属性。 |
| clear | boolean | false | 否 | 是否先清空地图上所有marker。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
let mapContext = has.createMapContext('mapId');
mapContext.addMarkers({
  markers: xxx, // marker数组
  success: () => {
    console.info('addMarkers success');
  },
  fail: (err) => {
    console.error('addMarkers fail, err:', err);
  },
  complete: (res) => {
    console.info('addMarkers complete, res:', res);
  }
});
```

### MapContext.removeMarkers

MapContext.removeMarkers(Object object)

移除 marker。

**起始版本：** 1.0.18

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| markerIds | Array | 是 | marker的id集合。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
let mapContext = has.createMapContext('mapId');
mapContext.removeMarkers({
  markerIds: [1000], // makerId数组
  success: () => {
    console.info('removeMarkers success');
  },
  fail: (err) => {
    console.error('removeMarkers fail, err:', err);
  },
  complete: (res) => {
    console.info('removeMarkers complete, res:', res);
  }
});
```
