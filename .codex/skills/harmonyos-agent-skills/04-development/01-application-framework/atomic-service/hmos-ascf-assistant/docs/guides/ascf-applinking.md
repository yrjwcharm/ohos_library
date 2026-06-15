# 获取元服务链接


可以使用AppLinking生成短链，通过短链生成二维码，然后扫码打开元服务并进入指定页面，详细配置请参考：[使用App Linking跳转到元服务](https://developer.huawei.com/consumer/cn/doc/atomic-guides/atomic-applinking)。


> **注意**
> 
> 在AGC上创建元服务链接，使用[自定义参数跳转指定页面](https://developer.huawei.com/consumer/cn/doc/atomic-guides/atomic-applinking#section125451919568)时，请在**自定义参数**中填入**经过URL编码**之后的key-value对。
> 
> 如下方法：
> 
> 1. 如果要跳转到指定页面，需要在自定义参数中填写页面路径。  
>    例如：需要跳转到menu页面，那么需要填写ascfPara={"path":"/pages/menu"}。这里的ascfPara为key，value为{"path":"/pages/menu"}。
> 
> 2. 因为暂不支持在自定义参数中使用object类型，所以需要将value进行URL编码。
> 
> 3. 编码之后的key-value对即为实际上要填写进自定义参数中的字段。  
>    例如：ascfPara=%7B%22path%22%3A%22%2Fpages%2Fmenu%22%7D。(value为{"path":"/pages/menu"}的utf-8格式的URL编码。)
> 
> 4. 将编码之后的key-value对填入AGC创建元服务链接中的自定义参数中。


**示例**onLaunch、onShow生命周期中获取参数：


```js
App({
  onLaunch(options) {
    // 监听ASCF框架加载。ASCF框架初始化完成时触发，全局只触发一次。同 has.getLaunchOptionsSync() 为 { path, scene, query, referrerInfo }
  },
  onShow(options) {
    // 监听ASCF框架显示，首次加载或切换到前台时触发。同 has.getEnterOptionsSync() 为 { path, scene, query, referrerInfo }
  }
});
```

