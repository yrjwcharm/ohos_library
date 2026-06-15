# 分包异步化


在元服务中，不同的分包对应不同的下载单元。因此，当分包之间共享引用了某个自定义组件或 **[require](#引用通用分包的-js)** 某个JS模块，最终这些组件和JS模块都会被打进**主包**，这样才能保证分包加载后功能都可以正常使用，但是这样处理**会增加主包的体积，从而影响启动性能。**


分包异步化特性将允许通过一些配置和新的接口，使部分跨分包的内容可以等待下载后异步使用，从而一定程度上减少主包的体积，提高启动性能。


分包异步化的使用具体是通过配置**通用分包**实现，一个分包配置通用分包后，将允许被跨包引用，如：


- 主包引用通用分包资源。

- 普通分包引用通用分包资源。

- 通用分包引用通用分包资源。


> **说明**
> 
> 开启[预加载](develop-preloading.md)可能会影响通用分包的加载时长，**建议使用分包异步化时不配置[预加载](develop-preloading.md)** 。


## 通用分包介绍

通用分包是元服务中一种特殊类型的分包，**不可以独立运行。** 配置了通用分包后，通过提供的异步引用方式，该包内所有资源类型可以被其他分包所引用。

**使用建议**：用于共享可以被复用的能力单元。开发者可以按需将“**通用且非启动时强依赖**”的能力放到通用分包中；可以通过异步引用方式使用通用分包的资源（**仅提供支持 JS, 自定义组件异步使用方式**），通用分包可以有效解决主包过大的问题。一个元服务中可以有多个通用分包（为避免多次下载包影响运行性能，建议放到一个通用分包中）。

**与普通分包差异：**

通用分包可以被其他分包引用。

**配置示例**：

假设支持通用分包的元服务，目录结构如下：

```js
├── app.css
├── app.js
├── app.json
├── packageA
│   └── pages
│       ├── pageOne
│       └── pageTwo
├── packageB
│   └── components
│       ├── component1
│       └── component2
├── pages
│   ├── index
│   └── logs
└── utils
```

开发者通过在app.json的**subpackages**字段对应的分包配置项中定义**common**字段为**true**，声明对应分包为通用分包 。

配置**packageB**为通用分包示例：

```json
{
  "pages": ["pages/index", "pages/logs"],
  "subpackages": [
    {
       "root": "packageA",
       "pages": ["pages/pageOne", "pages/pageTwo"] 
    }, 
    { 
       "root": "packageB",
       "pages": [], 
       "common": true 
     } 
    ]
}
```

**使用限制**：

通用分包仍然属于分包，因此普通分包的所有限制都对通用分包有效。通用分包中自定义组件的处理方式同普通分包。此外，使用通用分包时要注意：

- 通用分包中的资源只能通过异步引用方式被引用，目前仅支持自定义组件（结合占位组件使用）、JS 文件。

- 不支持 template、css、hjs、图片资源的异步引用。

- 单个分包大小不能超过 2M。


## 引用通用分包的自定义组件

一个分包使用其他分包的自定义组件时，由于其他分包还未下载或注入，其他分包的组件处于不可用的状态。通过为其他分包的自定义组件设置**占位组件**，我们可以先渲染占位组件作为替代，在页面主要内容渲染完成后下载分包并替换。

例如：主包/分包内引用通用分包自定义组件：

```json
{
  "usingComponents": {
    "custom-button": "/packageB/components/component1/component1" 
  },
  "componentPlaceholder": {
    "custom-button": "view" 
  }
}
```

在这个配置中，custom-button 自定义组件是跨分包引用组件， custom-button 在渲染时会使用内置组件 view 作为替代；在页面主要元素渲染完成后会下载 packageB 分包，占位组件就会被替换为对应的跨分包组件。

可以使用[has.onLazyLoadError](../references/references-apis/apis-app-event.md#hasonlazyloaderror)监听加载事件。


## 引用通用分包的 JS

一个分包中的代码引用其它分包的代码时，为了防止下载过程阻碍代码的执行，需要异步获取引用的结果。


### require

引入模块。返回模块通过**module.exports**或**exports**暴露的接口。需要引入其他分包的模块的时候，可以通过配置callback回调函数来异步获取指定模块。异步获取失败的时候，将会触发error回调函数。或者通过require.async方式调用，返回值为Promise。

**语法：**

```js
require(path, callback, error);
```

**参数：**

| 名称 | 类型 | 必填 | 描述 | 最低支持版本 |
| -------- | -------- | -------- | -------- | -------- |
| path | string | 是 | 需要引入模块文件相对于当前文件的路径，默认不支持绝对路径。 | 1.0.0 |
| callback | function | 否 | 异步加载成功回调函数，该回调函数参数为成功加载的模块。<br/>使用异步require能力时该参数必填。不写表示同步引用。 | 1.0.8 |
| error | function | 否 | 异步加载失败回调函数，该回调函数参数为错误信息和模块名。 | 1.0.8 |

**返回值：**

- 同步调用require返回值为执行结果。

- 异步方式调用没有返回值，通过callback返回。

**error 返回值：**

| 名称 | 类型 | 描述 | 最低支持版本 |
| -------- | -------- | -------- | -------- |
| mod | string | 传入的路径。 | 1.0.8 |
| errMsg | string | 错误详情。 | 1.0.8 |

**示例：**

```js
// packageB下的b.js
function sayHello(name) {
  console.info(`Hello ${name} !`);
}

module.exports = {
  sayHello: sayHello
};
```

```js
// 在packageA里面引用b.js
require('../../../packageB/js/b.js', (mod) => {
  mod.sayHello('ASCF');
  console.info('加载成功');
}, (error) => {
  console.error('加载失败', error);
});
```


### require.async链式调用

通过require.async链式调用的方式使用。

**语法：**

```js
require.async(path);
```

**参数：**

| 属性名 | 类型 | 必填 | 描述 | 最低支持版本 |
| -------- | -------- | -------- | -------- | -------- |
| path | string | 是 | 需要引入模块文件相对于当前文件的相对路径，默认不支持绝对路径。 | 1.0.8 |

**返回值：**

Promise&lt;Object&gt;，完成时返回require的执行结果。

**error 返回值：**

| 属性名 | 类型 | 描述 | 最低支持版本 |
| -------- | -------- | -------- | -------- |
| mod | string | 传入的路径信息。 | 1.0.8 |
| errMsg | string | 错误详情。 | 1.0.8 |

**示例：**

```js
// 在packageA里面引用b.js
require.async('../../../packageB/js/b.js').then((mod) => {
  mod.sayHello('ASCF');
  console.info('加载成功');
}).catch((error) => {
  console.error('加载失败', error);
});
```

errMsg中的Task Status枚举：

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

errMsg中的Error Code枚举：

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
