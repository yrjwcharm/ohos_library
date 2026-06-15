# 数据预拉取


预拉取能够在ASCF元服务框架启动的时候提前向第三方服务器拉取业务数据，当元服务代码包加载完时可以更快地渲染页面，减少用户等待时间，从而提升元服务的打开速度。


## 使用流程


### 添加配置


数据预拉取支持通过以下两种方式配置：


- 在元服务根目录创建preload.json文件，填写预加载配置。

- 在三方平台配置文件ext.json文件的ext属性中填写预加载配置。


> **注意**
> 
> 1. 相同fetchType类型只支持配置一个预加载数据。
> 2. 如果同时在ext.json和preload.json中配置预加载，会优先读取ext.json的配置，如果ext.json没有配置，则读取preload.json的配置。


**配置示例**：


在preload.json中配置


```js
[
  {
    "fetchType": "pre",
    "url": "https://www.example.com",
    "method": "POST", 
    "data": {
      "x": ""
    },
    "headers": {
      "content-type": "application/json"
    },
    "dataType": "json"
  }
]
```


在ext.json中配置


```js
{
  "ext": {
    "preload": [
      {
        "fetchType": "pre",
        "url": "https://www.example.com",
        "method": "POST",
        "data": {
          "x": ""
        },
        "headers": {
          "content-type": "application/json"
        },
        "dataType": "json"
      }
    ]
  }
}
```


配置参数说明


| 节点 | 属性 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| / | fetchType | string | 是 | 数据预拉取类型，当前仅支持pre。 |
| / | params | Object | 是 | 预拉取网络请求http配置。 |
| params | url | string | 是 | 请求URL。 |
| params | method | string | 是 | HTTP请求方法。支持GET、POST。 |
| params | data | Object | 否 | 请求的参数。 |
| params | headers | Object | 否 | 自定义请求头。 |
| params | dataType | string | 否 | 期望返回的数据格式。仅支持json。 |


### 设置TOKEN

用户登录元服务后，可通过[has.setBackgroundFetchToken](../references/references-apis/apis-data-storage.md#hassetbackgroundfetchtoken)设置一个自定义TOKEN字符串，更新后的TOKEN会在下一次预拉取向开发者服务器发起请求时带上，用于服务器校验请求合法性。

> **说明**
> 
> has.setBackgroundFetchToken是可选接口，非必须调用。

**使用示例：** 
```js
App({
  onLaunch(options) {
    has.setBackgroundFetchToken({
      token: 'test_token',
      success: () => {
        console.info('setBackgroundFetchToken success');
      }
    });
  }
});
```


### 数据拉取

用户打开元服务时，框架会按照配置发起一个HTTP请求，请求成功时会将请求结果缓存供下一步获取。


### 获取数据

用户启动元服务时，可调用[has.getBackgroundFetchData](../references/references-apis/apis-data-storage.md#hasgetbackgroundfetchdata)或[has.onBackgroundFetchData](../references/references-apis/apis-data-storage.md#hasonbackgroundfetchdata)获取已缓存到本地的数据。

使用示例：

```js
App({
  onLaunch(options) {
    has.getBackgroundFetchData({
      fetchType: 'pre',
      success: (res) => {
        console.info('getBackgroundFetchData success', res.fetchedData); // 缓存数据
      }
    });
    has.onBackgroundFetchData((res) => {
      console.info('onBackgroundFetchData listen success', res.fetchType); // 预拉取类型
      console.info('onBackgroundFetchData listen success', res.fetchedData); // 缓存数据
    });
  }
});
```
