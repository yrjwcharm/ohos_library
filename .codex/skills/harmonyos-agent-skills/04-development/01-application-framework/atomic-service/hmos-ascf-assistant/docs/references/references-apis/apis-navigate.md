# 跳转
## has.restartAtomicService

has.restartAtomicService(Object object)

重启当前元服务。

> **说明：**
>
> - 开发者需要在应用处于获焦状态时使用该接口。
> - 该接口不支持频繁调用。

**起始版本：** 1.0.21

**参数：**

参数为Object对象，包括以下字段。

| 参数       | 类型       | 必填 | 描述 |
|----------|----------|----|------|
| path     | string   | 否  | 打开的页面路径，路径后可以带参数。参数与路径之间用?分隔，参数与键值用=相连，多个参数用&分隔。在元服务的[App.onLaunch](../references-framework/logical-layer-app.md)、[App.onShow](../references-framework/logical-layer-app.md)和[Page.onLoad](../references-framework/logical-layer-page.md#onload)的回调函数中可以获得参数query。<br/>支持格式：<br/>- path如果为空则打开首页；<br/>- path不为空，则之前的路径应为在app.json中定义的代码包路径。<br/>例如，在app.json中定义了页面: "page/path/path"，则有效应用内页面路径为："page/path/path?key1=value1&amp;key2=value2"。 |
| success  | function | 否  | 接口调用成功的回调函数。 |
| fail     | function | 否  | 接口调用失败的回调函数。 |
| complete | function | 否  | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.restartAtomicService({
  path: 'page/path/path?key1=value1&key2=value2',
  success: (res) => {
    console.info('restartAtomicService success:', res);
  },
  fail: (err) => {
    console.error('restartAtomicService fail:', err);
  },
  complete: (res) => {
    console.info('restartAtomicService complete:', res);
  }
});
```

## has.navigateToAtomicService

has.navigateToAtomicService(Object object)

打开另一个元服务。

**起始版本：** 1.0.4

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| appId | string | 是 | 需要打开的元服务的AppID。 |
| path | string | 否 | 仅ASCF框架开发的元服务使用，打开的页面路径，路径后可以带参数。参数与路径之间用?分隔，参数与键值用=相连，多个参数用&amp;分隔。在元服务的[App.onLaunch](../references-framework/logical-layer-app.md)、[App.onShow](../references-framework/logical-layer-app.md)和[Page.onLoad](../references-framework/logical-layer-page.md#onload)的回调函数中可以获得参数query。<br/>支持格式：<br/>- path如果为空则打开首页；<br/>- path不为空，则之前的路径应为在app.json中定义的代码包路径。<br/>例如，在app.json中定义了页面: "page/path/path"，则有效应用内页面路径为："page/path/path?key1=value1&amp;key2=value2"。 |
| extraData | Object | 否 | 仅ASCF框架开发的元服务使用，需要传递给目标元服务的数据。 |
| wantParam | Object | 否 | ArkTS侧启动参数。以下为系统保留字段，请勿使用：<br/>ascfPara，ASCF框架保留<br/>subPackageName，预加载子包参数，用于启动元服务子包时，一次完成主包和对应子包的安装 。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.navigateToAtomicService({
  appId: 'xxxx', // 目标元服务APPID
  path: 'pages/index/index',
  extraData: {
    data: 'extraData'
  },
  success: () => {
    console.info('navigateToAtomicService success!');
  },
  fail: (err) => {
    console.error('navigateToAtomicService fail:', err);
  },
  complete: (res) => {
    console.info('navigateToAtomicService complete:', res);
  }
});
```

## has.navigateBackAtomicService

has.navigateBackAtomicService(Object object)

返回到上一个元服务，只有在当前元服务是被其他元服务打开时可以调用成功。

**起始版本：** 1.0.4

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| extraData | Object | 否 | 返回上一个元服务时携带的数据。 |
| wantParam | Object | 否 | ArkTS侧启动参数。以下为系统保留字段，请勿使用：<br/>ascfPara，ASCF框架保留<br/>subPackageName，预加载子包参数，用于启动元服务子包时，一次完成主包和对应子包的安装 。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.navigateBackAtomicService({
  extraData: {
    data: 'extraData'
  },
  success: () => {
    console.info('navigateBackAtomicService success!');
  },
  fail: (err) => {
    console.error('navigateBackAtomicService fail:', err);
  },
  complete: (res) => {
    console.info('navigateBackAtomicService complete:', res);
  }
});
```

## has.terminateSelf

has.terminateSelf(Object object)

退出当前元服务。当本元服务是通过[open-embedded-atomicservice](../references-components/components-open-embedded-atomicservice.md)组件以半屏模式被拉起时，调用此方法退出，会返回结果给拉起方元服务。

**起始版本：** 1.0.18

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| resultCode | number | 否 | 返回给拉起方元服务的结果码。 |
| params | Object | 否 | 返回给拉起方元服务的数据。若params非空，则必须同时提供非空的resultCode，否则params将被忽略。 |
| success | function | 否 | 接口调用成功的回调函数。 |
| fail | function | 否 | 接口调用失败的回调函数。 |
| complete | function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行）。 |

**示例：**

```js
has.terminateSelf({
  resultCode: 100, // 自定义结果码
  params: {
    data: 'test' // 自定义要发送的参数
  },
  success: () => {
    console.info('terminateSelf success!');
  },
  fail: (err) => {
    console.error('terminateSelf fail:', err);
  },
  complete: (res) => {
    console.info('terminateSelf complete:', res);
  }
});
```
