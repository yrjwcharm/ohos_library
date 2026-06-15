# Page

ASCF框架中，可以[使用page注册页面](#使用page注册页面)，也可以[使用Component注册页面](#使用component注册页面)。

## Page

Page(Object object)

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 属性 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| data | object | 否 | 页面的初始数据。 |
| options | object | 否 | 页面的组件选项，同[Component](custom-components-component.md)中的options。 |
| onLoad | function | 否 | 生命周期回调（监听页面加载）。 |
| onShow | function | 否 | 生命周期回调（监听页面显示）。 |
| onReady | function | 否 | 生命周期回调（监听页面初次渲染完成）。 |
| onHide | function | 否 | 生命周期回调（监听页面隐藏）。 |
| onUnload | function | 否 | 生命周期回调（监听页面卸载）。 |
| onPullDownRefresh | function | 否 | 监听用户下拉动作。 |
| onReachBottom | function | 否 | 页面上拉触底事件的处理函数。 |
| onPageScroll | function | 否 | 页面滚动触发事件的处理函数。 |
| onTabItemTap | function | 否 | 当前是 tab 页时，点击 tab 时触发。 |
| getTabBar | function | 否 | 获取自定义tabBar实例。<br/>**起始版本：** 1.0.10 |
| [onShareAppMessage](#onshareappmessage) | function | 否 | 用户点击右上角menubar。<br/>**起始版本：** 1.0.16 |
| 其他 | any | 否 | 开发者可以添加任意的函数或数据到 Object 参数中，在页面的函数中用 this 访问。 |

### onLoad

onLoad(Object query)

页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数。

**起始版本：** 1.0.0

**参数：**

| 名称 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| query | Object | 否 | query 来源于 has.navigateTo 和 has.redirectTo 等接口 url 字段的参数部分（例如：path?key1=value1&amp;key2=value2）。<br/>基础库会将该部分字符串内容解析为 Object。 |

### onPageScroll

onPageScroll(Object object)

监听用户滑动页面事件。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 属性 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| scrollTop | Number | 否 | 页面在垂直方向已滚动的距离（单位px）。 |

### onTabItemTap

onTabItemTap(Object item)

点击 tab 时触发。

**起始版本：** 1.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| index | String | 否 | 被点击tabItem的序号，从0开始。 |
| pagePath | String | 否 | 被点击tabItem的页面路径。 |
| text | String | 否 | 被点击tabItem的按钮文字。 |

**示例：**

```js
Page({
  onTabItemTap(item) {
    console.info(item.index);
    console.info(item.pagePath);
    console.info(item.text);
  }
});
```

### getTabBar

getTabBar()

获取自定义 tabBar 实例。

**起始版本：** 1.0.10

示例：

```js
Page({
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 });
    }
  }
});
```

### onShareAppMessage

onShareAppMessage(Object object)

监听用户点击页面内转发按钮（button 组件 open-type="share"）或右上角menubar的行为，并自定义转发内容。

**起始版本：** 1.0.16

**注意事项：** 不支持在onShareAppMessage里面调用系统同步接口。

**依赖关系：** HarmonyOS SDK版本≥6.0.0(20) 且 ROM版本 ≥ 6.0.0

**参数：**

参数为Object对象，包括以下字段。

| 参数 | 类型 | 必填 | 描述 |
| -------- | -------- | -------- | -------- |
| webViewUrl | String | 否 | 页面中包含web-view组件时，返回当前web-view的url。 |

**返回值**：

返回系统信息的Object对象，包括以下字段。

| 名称 | 类型 | 默认值 | 描述 |
| -------- | -------- | -------- | -------- |
| title | string | 默认值为当前元服务名称。 | 转发标题 |
| path | string | 当前页面path ，必须是以 / 开头的完整路径。 | 转发路径 |

**示例：**

```js
Page({
  onShareAppMessage() {
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  }
});
```

### 使用page注册页面

```js
// index.js
Page({
  data: {
    text: 'This is page data.'
  },
  onLoad: function(options) {
    // 页面创建时执行
  },
  onShow: function() {
    // 页面显示时执行
  },
  onReady: function() {
    // 页面首次渲染完成时执行
  },
  onHide: function() {
    // 页面隐藏时执行
  },
  onUnload: function() {
    // 页面销毁时执行
  },
  onPullDownRefresh: function() {
    // 下拉刷新时执行
  },
  onReachBottom: function() {
    // 页面到达底部时执行
  },
  onPageScroll: function() {
    // 页面滚动时执行
  },
  onTabItemTap(item) {
    // tabBar 点击切换时执行
  },
  // 事件回调
  handleTap: function() {
    this.setData(
      {
        text: 'new text'
      },
      function() {
        // setData 更新完界面后触发
      }
    );
  },
  // 其他自定义数据
  extraData: {
    hi: 'extra data'
  }
});
```

### 使用Component注册页面

使用 Component 构造页面，可以使用 Component 更多的特性，如 behaviors 等。

> **说明：**
> 
> 自定义方法和页面生命周期需要在methods中定义。

```js
Component({
  data: {
    text: 'page data'
  },
  methods: {
    onLoad: function(options) {
      // 页面创建时执行
    },
    onPullDownRefresh: function() {
      // 下拉刷新时执行
    },
    // 事件响应函数
    handleTap: function() {
      // ...
    }
  }
});
```

## getCurrentPages

getCurrentPages()

获取当前页面栈。数组最后一个元素为当前显示页面。

> **注意：**
> 
> - 请勿尝试修改页面栈，否则会导致页面路由混乱。
> - 请勿在 App.onLaunch 和第一次 App.onShow 前调用 getCurrentPages()，此时页面栈还没有生成。

**起始版本：** 1.0.0
