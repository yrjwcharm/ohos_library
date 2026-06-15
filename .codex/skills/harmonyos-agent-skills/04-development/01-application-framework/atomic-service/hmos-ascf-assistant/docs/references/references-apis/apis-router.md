# 路由

## has.switchTab

has.switchTab(Object object)

如果应用定义了多标签（tab），即客户端窗口的底部或顶部有可切换页面的标签（tab），那么可以通过此接口跳转到tabBar页面，同时关闭其他所有非tabBar页面。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| url | string | 是 | 需要跳转的tabBar页面路径（需要在app.json的tabbar字段定义的页面），路径后不能带参数。<br/>支持格式：（假设app.json的tabbar字段定义了页面: "page/tab1/tab1"）<br/>1. 以"/"开头，加上tabbar字段定义的页面路径；例如："/page/tab1/tab1"。<br/>2. 其他路径，例如：tab1、./tab1、../tab1。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

app.json中定义tabbar：

```json
"tabBar": {
    "list": [
        {
        "pagePath": "page/tabbar1/tabbar1",
        "text": "tabbar1",
        "iconPath": "image/icon_tabbar1.png",
        "selectedIconPath": "image/icon_tabbar1_HL.png"
        },
        {
        "pagePath": "page/tabbar2/tabbar2",
        "iconPath": "image/icon_tabbar2.png",
        "selectedIconPath": "image/icon_tabbar1_HL.png",
        "text": "tabbar2"
        }
    ]
}
```

调用接口：

```js
has.switchTab({
  url: '/page/tabbar1/tabbar1',
  success: (res) => {
    console.info('switchTab success', res);
  },
  fail: (err) => {
    console.error('switchTab fail', err);
  },
  complete: (res) => {
    console.info('switchTab complete', res);
  }
});
```

## has.reLaunch

has.reLaunch(Object object)

关闭所有页面，打开应用内的某个页面。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| url | string | 是 | 需要跳转的应用内页面路径（在app.json中定义的代码包路径），页面路径后可以带参数。参数与路径之间用?分隔，参数与键值用=相连，多个参数用&amp;分隔。<br/>支持格式：（假设app.json中定义了页面: "page/path/path"）<br/>1. 以"/"开头，是全局路径。<br/>2. 其他路径，例如：a.png、./a.png、../a.png。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

调用接口：

```js
has.reLaunch({
  url: '/page/path/path?key=1',
  success: (res) => {
    console.info('reLaunch success', res);
  },
  fail: (err) => {
    console.error('reLaunch fail', err);
  },
  complete: (res) => {
    console.info('reLaunch complete', res);
  }
});
```

/page/path页面，options内含有路径后携带参数：

```js
Page({
  onLoad: (options) => {
    console.info(options);
  }
})
```

## has.redirectTo

has.redirectTo(Object object)

关闭当前页面，跳转到应用内的某个页面，但是不允许跳转到tabBar页面。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| url | string | 是 | 需要跳转的应用内非tabBar的页面路径（在app.json中定义的代码包路径），路径后可以带参数。参数与路径之间用?分隔，参数与键值用=相连，多个参数用&amp;分隔。<br/>支持格式：（假设app.json中定义了页面: "page/path/path"）<br/>1. 以"/"开头，是全局路径。<br/>2. 其他路径，例如：a.png、./a.png、../a.png。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.redirectTo({
  url: '/page/path/path?key=1',
  success: (res) => {
    console.info('redirectTo success', res);
  },
  fail: (err) => {
    console.error('redirectTo fail', err);
  },
  complete: (res) => {
    console.info('redirectTo complete', res);
  }
});
```

## has.navigateTo

has.navigateTo(Object object)

保留当前页面，跳转到应用内的某个页面。但是不能跳转到 tabBar 页面。使用 has.navigateBack 可以返回到原页面。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| url | string | 是 | 需要跳转的应用内非tabBar的页面路径（在app.json中定义的代码包路径），路径后可以带参数。参数与路径之间用?分隔，参数与键值用=相连，多个参数用&amp;分隔。<br/>支持格式：（假设app.json中定义了页面: "page/path/path"）<br/>1. 以"/"开头，是全局路径。<br/>2. 其他路径，例如：a.png、./a.png、../a.png。 |
| events| Object | 否 | 页面间通信接口，用于监听被打开页面发送到当前页面的数据。<br/>**起始版本：**  1.0.21 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**success返回值：**

| 参数 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| eventChannel | [EventChannel](#eventchannel) | 是 | 和被打开页面进行通信。<br/>**起始版本：**  1.0.21  |

**示例：**

```js
// A页面
Page({
    navigateToEvent() {
      has.navigateTo({
        url: 'xxx', // 请输入正确路径
        events: {
          // 为指定事件添加一个监听器，获取被打开页面(B)回传到当前页面的数据
          acceptDataFromOpenedPage: (data) => {
            // 获取被打开页面(B)回传到当前页面的数据
            console.info('acceptDataFromOpenedPage message', data); 
          },
          // 监听B页面emit的someEvent事件
          someEvent: (data) => {
            // 收到被打开页面(B)的另一条消息
            console.info('someEvent message', data); 
          }
        },
        success: (res) => {
          console.info('navigateTo success', res);
          // 通过eventChannel向被打开页面(B)传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' });
        },
        fail: (err) => {
          console.error('navigateTo fail', err);
        },
        complete: (res) => {
          console.info('navigateTo complete', res);
        }
      });
    }
  });

// B页面
Page({
    onLoad: () => {
      const eventChannel = this.getOpenerEventChannel();
      // 向上一个页面(A)传送数据
      eventChannel.emit('acceptDataFromOpenedPage', {data: 'test'});
      eventChannel.emit('someEvent', {data: 'test'});
      // 监听acceptDataFromOpenerPage事件，获取上一页面(A)通过eventChannel传送到当前页面(B)的数据
      eventChannel.on('acceptDataFromOpenerPage', (data) => {
        console.info('eventChannel.on', data);
      });
    },
    onUnload: () => {
      const eventChannel = this.getOpenerEventChannel();
      eventChannel.off('acceptDataFromOpenerPage');
    }
  });
```

## EventChannel

页面事件通信通道。

**起始版本：**  1.0.21 

### EventChannel.emit

EventChannel.emit(string eventName, Object|Array|string args)

触发一个事件。

**起始版本：** 1.0.21

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- | 
| eventName | string | 是 | 事件名称 |
| args | Object &#0124; Array &#0124; string | 否 | 事件参数 |

### EventChannel.on

EventChannel.on(string eventName, function fn)

持续监听一个事件。

**起始版本：** 1.0.21

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- | 
| eventName | string | 是 | 事件名称 |
| fn | function | 是 | 事件监听函数 | 

### EventChannel.once

EventChannel.once(string eventName, function fn)

监听一个事件一次，触发后失效。

**起始版本：** 1.0.21

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- | 
| eventName | string | 是 | 事件名称 |
| fn | function | 是 | 事件监听函数 | 

### EventChannel.off

EventChannel.off(string eventName, function fn)

取消监听一个事件。给出第二个参数时，只取消给出的监听函数，否则取消所有监听函数。

**起始版本：** 1.0.21

**参数：**

| 参数 | 类型 | 必填 | 描述 | 
| --- | --- | --- | --- | 
| eventName | string | 是 | 事件名称 | 
| fn | function | 否 | 事件监听函数 | 

## has.navigateBack

has.navigateBack(Object object)

关闭当前页面，返回上一页面或多级页面。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| delta | number | 1 | 否 | 返回的页面数，如果 delta 大于现有页面数，则返回到首页。 |
| success | function | - | 否 | 接口调用成功的回调函数。 |
| fail | function | - | 否 | 接口调用失败的回调函数。 |
| complete | function | - | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

【示例1】返回上一层页面：pathA页面跳转到pathB页面，在pathB页面调用has.navigateBack，返回pathA页面。

```js
// pathA页面接口
has.navigateTo({
  url: "/page/pathB",
});
// pathB页面接口,返回pathA页面
has.navigateBack({});
```

【示例2】返回多级页面：pathA页面跳转到pathB页面，pathB页面跳转到pathC，在pathC页面可调用has.navigateBack，设置delta为2，返回pathA页面。

```js
// pathA页面接口
has.navigateTo({
  url: "/page/pathB",
});
// pathB页面接口
has.navigateTo({
  url: "/page/pathC",
});
// pathC页面接口,返回pathA页面
has.navigateBack({
  delta: 2,
});
```
