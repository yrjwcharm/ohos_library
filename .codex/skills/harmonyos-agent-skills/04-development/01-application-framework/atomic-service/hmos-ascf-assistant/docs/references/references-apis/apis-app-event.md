# 应用级事件

## has.onAppShow

has.onAppShow(function callback)

监听元服务切前台事件。该事件与[App](../references-framework/logical-layer-app.md).onShow的回调时机一致。以callback形式返回结果。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | 元服务切前台事件的回调函数。 |

**callback返回值：**

Object类型，包括以下字段。

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| path | string | 启动元服务页面的路径。 |
| scene | string | 场景值。 |
| query | object | 启动元服务页面的参数。 |
| referrerInfo | object | 来源信息。 |

**referrerInfo说明：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| packageName | string | 来源应用或元服务的包名。 |
| extraData | Object | 来源应用或元服务传过来的参数，该参数仅在调用[has.navigateToAtomicService](apis-navigate.md#hasnavigatetoatomicservice)和[has.navigateBackAtomicService](apis-navigate.md#hasnavigatebackatomicservice)接口时生效。 |

**示例：**

```js
has.onAppShow((res) =>{
  console.info('onAppShow callback triggered', res);
});
```

## has.onAppHide

has.onAppHide(function callback)

监听元服务切后台事件。该事件与[App](../references-framework/logical-layer-app.md).onHide的回调时机一致。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | 元服务切后台事件的回调函数。 |

**示例：**

```js
has.onAppHide(() => {
  console.info('onAppHide callback triggered');
});
```

## has.onPageNotFound

has.onPageNotFound(function callback)

监听元服务需要打开的页面不存在事件。该事件与[App](../references-framework/logical-layer-app.md).onPageNotFound的回调时机一致。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | 元服务需要打开的页面不存在事件的回调函数。 |

**callback返回值：**

Object类型，包括以下字段。

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| path | string | 不存在页面的路径 （代码包路径）。 |
| isEntryPage | boolean | 是否是本次启动的首个页面（例如从分享的入口进来，首个页面是开发者配置的分享页面）。 |

**示例：**

```js
has.onPageNotFound((res) => {
  console.info('onPageNotFound callback triggered', res);
});
```

## has.onError

has.onError(function callback)

监听元服务错误事件。如脚本错误或 API 调用报错等。该事件与[App](../references-framework/logical-layer-app.md).onError的回调时机与参数一致。

**起始版本：** 1.0.0

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | 元服务错误事件的回调函数。 |

**示例：**

```js
const callback = (err) => {
  console.error('onError callback triggered', err);
};

has.onError(callback);
```

## has.onLazyLoadError

has.onLazyLoadError(function callback)

监听元服务异步组件加载失败事件。

> **说明：**
>
> - 加载异步组件通常需要下载分包，若分包下载超时，则会触发errMsg为 "loadSubpackage: timeout" 的回调，默认超时等待时间为5秒。
> - 分包确认下载失败时，会再次触发errMsg为 "loadSubpackage: fail" 的回调。
> - 若在页面中使用该接口进行监听，请确保在必要时手动调用 offLazyLoadError 取消监听，以避免非预期的内存泄漏。

**起始版本：** 1.0.8

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | 元服务异步组件加载失败事件的监听函数。 |

**callback返回值：**

Object类型，包括以下字段。

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| type | string | 失败类型，当前仅支持'subpackage'。 |
| subpackage | string | 分包异步组件所属的分包。 |
| errMsg | string | 详细信息。 |

**errMsg中的task status枚举：**

| 名称 | 值 | 说明 |
| -------- | -------- | -------- |
| CREATE_TASK_FAILED | -4 | 创建下载任务失败。 |
| HIGHER_VERSION_INSTALLED | -3 | 本地存在相同或者更高版本。 |
| TASK_ALREADY_EXISTS | -2 | 下载任务已存在。 |
| TASK_UNFOUND | -1 | 下载任务不存在。 |
| DOWNLOAD_PAUSING | 2 | 下载任务被暂停。 |
| DOWNLOAD_FAILED | 5 | 下载失败。 |
| DOWNLOAD_WAIT_WIFI | 6 | 用户设置仅在Wi-Fi环境下载，当前使用的是流量，需等待Wi-Fi。 |
| INSTALL_FAILED | 23 | 安装失败。 |

**errMsg中的error code枚举：**

| 名称 | 值 | 说明 |
| -------- | -------- | -------- |
| MODULE_ALREADY_EXISTS | -8 | 模块已存在。 |
| MODULE_UNAVAILABLE | -7 | 要下载的模块不存在或者模块不适配该设备。 |
| INVALID_REQUEST | -6 | 该请求无效，请求中包含的信息不准确。 |
| NETWORK_ERROR | -5 | 网络异常，请求失败。 |
| INVOKER_VERIFICATION_FAILED | -4 | 调用者信息异常。 |
| FOREGROUND_REQUIRED | -3 | 仅允许前台时请求按需加载。 |
| ACTIVE_SESSION_LIMIT_EXCEEDED | -2 | 请求遭到拒绝，因为当前至少有一个请求正在下载。 |
| FAILURE | -1 | 失败。 |
| DOWNLOAD_WAIT_WIFI | 1 | 用户设置仅在Wi-Fi环境下载，当前使用的是流量，需等待Wi-Fi。 |

**示例：**

```js
const callback = (err) => {
  console.error('onLazyLoadError callback triggered', err);
};

has.onLazyLoadError(callback);
```

## has.offPageNotFound

has.offPageNotFound(function callback)

移除元服务要打开的页面不存在事件的监听函数。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | [has.onPageNotFound](#hasonpagenotfound)传入的监听函数。不传此参数则移除所有监听函数。 |

**示例：**

```js
const callback = (res) => {
  console.info('onPageNotFound callback triggered', res);
};
has.onPageNotFound(callback);
has.offPageNotFound(callback);
```

## has.offError

has.offError(function callback)

取消监听元服务错误事件。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | [has.onError](#hasonerror)传入的监听函数。不传此参数则移除所有监听函数。 |

**示例：**

```js
const callback = (err) => {
  console.error('onError callback triggered', err);
};

has.onError(callback);
has.offError(callback);
```

## has.offAppShow

has.offAppShow(function callback)

取消监听元服务展示事件。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | [has.onAppShow](#hasonappshow)传入的监听函数。不传此参数则移除所有监听函数。 |

**示例：**

```js
const callback = (res) => {
  console.info('onAppShow callback triggered', res);
};
has.onAppShow(callback);
has.offAppShow(callback);
```

## has.offAppHide

has.offAppHide(function callback)

取消监听元服务隐藏事件。

**起始版本：** 1.0.4

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | [has.onAppHide](#hasonapphide)传入的监听函数。不传此参数则移除所有监听函数。 |

**示例：**

```js
const callback = () => {
  console.info('onAppHide callback triggered');
};
has.onAppHide(callback);
has.offAppHide(callback);
```

## has.offLazyLoadError

has.offLazyLoadError(function callback)

移除元服务异步组件加载失败事件的监听函数。

**起始版本：** 1.0.8

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | [has.onLazyLoadError](#hasonlazyloaderror)传入的监听函数。不传此参数则移除所有监听函数。 |

**示例：**

```js
const callback = (err) => {
  console.error('onLazyLoadError callback triggered', err);
};

has.onLazyLoadError(callback);
has.offLazyLoadError(callback);
```

## has.onAudioInterruptionBegin

has.onAudioInterruptionBegin (function callback)

监听音频因系统占用而中断，以下场景将触发此事件：闹钟、电话。

此事件触发后，元服务内所有音频将暂停。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | 音频因系统占用而中断开始事件的监听函数。 |

**示例：**

```js
has.onAudioInterruptionBegin(() => { 
  console.info('onAudioInterruptionBegin callback triggered'); 
});
```

## has.onAudioInterruptionEnd

has.onAudioInterruptionEnd (function callback)

监听音频中断结束事件，在收到onAudioInterruptionBegin事件之后，元服务内所有音频会暂停，收到此事件之后才可再次成功播放。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | 音频中断结束事件的监听函数。 |

**示例：**

```js
has.onAudioInterruptionEnd (() => { 
  console.info('onAudioInterruptionEnd callback triggered'); 
});
```

## has.offAudioInterruptionBegin

has.offAudioInterruptionBegin (function callback)

移除音频因为受到系统占用而被中断开始事件的监听函数。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | [has.onAudioInterruptionBegin](#hasonaudiointerruptionbegin)传入的监听函数。不传此参数则移除所有监听函数。 |

**示例：**

```js
const callback = () => { 
  console.info('onAudioInterruptionBegin callback triggered'); 
}; 
has.onAudioInterruptionBegin(callback); 
has.offAudioInterruptionBegin(callback);
```

## has.offAudioInterruptionEnd

has.offAudioInterruptionEnd(function callback)

移除音频中断结束事件的监听函数。

**起始版本：** 1.0.14

**参数：**

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| callback | function | 否 | [has.onAudioInterruptionEnd](#hasonaudiointerruptionend)传入的监听函数。不传此参数则移除所有监听函数。 |

**示例：**

```js
const callback = () => { 
  console.info('onAudioInterruptionEnd callback triggered'); 
}; 
has.onAudioInterruptionEnd(callback); 
has.offAudioInterruptionEnd(callback);
```
