# 路由和生命周期

在ASCF框架中所有页面的路由全部由框架进行管理。

## 页面栈

框架以栈的形式进行页面管理。当发生路由切换的时候，对应页面栈的表现如下：

| 路由方式 | 页面栈表现 |
| -------- | -------- |
| 初始化 | 新页面入栈。 |
| 打开新页面 | 新页面入栈。 |
| 页面重定向 | 当前页面出栈，新页面入栈。 |
| 页面返回 | 页面不断出栈，直到目标返回页。 |
| Tab切换 | 页面全部出栈，只留下新的Tab页面。 |
| 重加载 | 页面全部出栈，只留下新的页面。 |

开发者可以使用[getCurrentPages()](logical-layer-page.md#getcurrentpages) 函数获取当前页面栈。

## 路由和页面生命周期

路由操作会引起页面状态的变化，触发对应的生命周期。不同路由方式导致的生命周期触发情形如下。

| 路由方式 | 触发时机 | 路由前页面 | 路由后页面 |
| -------- | -------- | -------- | -------- |
| 初始化 | ASCF框架打开的第一个页面。 | - | onLoad, onShow |
| 打开新页面 | 调用API：has.navigateTo。 | onHide | onLoad, onShow |
| 页面重定向 | 调用API：has.redirectTo。 | onUnload | onLoad, onShow |
| 页面返回 | 调用API：has.navigateBack 或使用组件&lt;navigator open-type="navigateBack"&gt; 或用户按左上角返回按钮。 | onUnload | onShow |
| Tab切换 | 调用API：has.switchTab或用户点击Tab。 | - | 详细内容参见[Tab切换对应生命周期说明](#tab切换对应生命周期)。 |
| 重加载 | 调用 API：has.reLaunch。 | onUnload | onLoad, onShow |

## Tab切换对应生命周期

以A、B页面为tabBar页面，C是从A页面打开的页面，D页面是从C页面打开的页面为例。

| 当前页面 | 路由后页面 | 触发的生命周期（按顺序） |
| -------- | -------- | -------- |
| A | A | Nothing happened |
| A | B | A.onHide(), B.onLoad(), B.onShow() |
| A | B（再次打开） | A.onHide(), B.onShow() |
| C | A | C.onUnload(), A.onShow() |
| C | B | C.onUnload(), B.onLoad(), B.onShow() |
| D | B | D.onUnload(), C.onUnload(), B.onLoad(), B.onShow() |
| D（从转发进入） | A | D.onUnload(), A.onLoad(), A.onShow() |
| D（从转发进入） | B | D.onUnload(), B.onLoad(), B.onShow() |

> **说明：**
>
> - navigateTo, redirectTo只能打开非tabBar页面。
> - switchTab只能打开tabBar页面。
> - reLaunch可以打开任意页面。
> - 页面底部的tabBar由配置决定，即只要是定义为tabBar的页面，底部都有tabBar。

调用页面路由携带的参数可以在目标页面的onLoad中获取。

相关接口如下：

| 接口 | 描述 |
| -------- | -------- |
| has.switchTab | 如果应用定义了多标签（tab），即客户端窗口的底部或顶部有可切换页面的标签（tab），那么可以通过此接口跳转到tabBar页面，同时关闭其他所有非tabBar页面。 |
| has.reLaunch | 关闭所有页面，打开应用内的某个页面。 |
| has.redirectTo | 关闭当前页面，跳转到应用内的某个页面，但是不允许跳转到tabBar页面。 |
| has.navigateTo | 保留当前页面，跳转到应用内的某个页面。但是不能跳转到tabBar页面。使用 has.navigateBack 可以返回到原页面。 |
| has.navigateBack | 关闭当前页面，返回上一页面或多级页面。 |

详细接口参数请参考对应的[API文档](../references-apis/apis-router.md)。
