# App

每个ASCF框架元服务都需要在 app.js 中调用App方法注册ASCF框架（并且仅能调用一次），并绑定生命周期回调函数、添加错误监听函数等。在Object参数中可以定义生命周期回调、全局数据、全局方法等。

**Object参数说明**

| 属性 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| onLaunch | function | 否 | 监听ASCF框架加载。ASCF框架初始化完成时触发，全局只触发一次。 |
| onShow | function | 否 | 监听ASCF框架显示，首次加载或切换到前台时触发。ASCF框架加载完后，或从后台切换到前台显示时触发。也可以使用has.onAppShow添加监听。参数：与has.onAppShow一致。 |
| onHide | function | 否 | 监听ASCF框架隐藏，切后台时触发。也可以使用has.onAppHide添加监听。 |
| onError | function | 否 | 监听未处理的报错。也可以使用has.onError绑定监听。参数：与has.onError一致。 |
| onPageNotFound | function | 否 | 页面不存在的监听函数。 |
| onLazyLoadError | function | 否 | 监听异步组件加载失败事件。<br/>**起始版本：** 1.0.8 |
| 其他 | any | 否 | 开发者可以添加任意的函数或数据变量到Object参数中，可以使用this访问。 |

示例代码如下：
```js
// app.js
App({
  onLaunch(options) {
    // ascf加载完时触发
  },
  onShow(options) {
    // 显示时触发
  },
  onHide() {
    // 隐藏时触发
  },
  onError(msg) {
    console.error(msg);
  },
  globalData: 'global data'
});
```

整个ASCF框架共享同一个App实例，开发者可以通过getApp方法获取全局唯一的App实例。

```js
// xxx.js
const app = getApp();
console.info(app.globalData); // global data
```
