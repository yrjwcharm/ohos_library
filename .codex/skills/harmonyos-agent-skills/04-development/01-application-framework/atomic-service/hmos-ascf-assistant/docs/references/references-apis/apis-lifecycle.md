# 生命周期

## has.getLaunchOptionsSync

has.getLaunchOptionsSync(): Object

获取元服务启动时的参数。与[App定义的回调参数](../references-framework/logical-layer-app.md)一致。

**起始版本：** 1.0.0

**返回值：**

返回Object对象，包括以下字段。

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
const launchOptions = has.getLaunchOptionsSync();
console.info(launchOptions.path);
```

## has.getEnterOptionsSync

has.getEnterOptionsSync(): Object

获取元服务启动时的参数。如果当前是冷启动，则返回值与[App](../references-framework/logical-layer-app.md).onLaunch的回调参数一致；如果当前是热启动，则返回值与[App](../references-framework/logical-layer-app.md).onShow一致。

**起始版本：** 1.0.4

**返回值：**

返回Object对象，包括以下字段。

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| path | string | 启动元服务页面的路径。 |
| scene | string | 场景值。 |
| query | Object | 启动元服务页面的参数。 |
| referrerInfo | Object | 来源信息。 |

**referrerInfo说明：**

| 参数 | 类型 | 描述 |
| -------- | -------- | -------- |
| packageName | string | 来源应用或元服务的包名。 |
| extraData | Object | 来源应用或元服务传过来的参数，该参数仅在调用[has.navigateToAtomicService](apis-navigate.md#hasnavigatetoatomicservice)和[has.navigateBackAtomicService](apis-navigate.md#hasnavigatebackatomicservice)接口时生效。 |

**示例：**

```js
const enterOptions = has.getEnterOptionsSync();
console.info(enterOptions.path);
```
