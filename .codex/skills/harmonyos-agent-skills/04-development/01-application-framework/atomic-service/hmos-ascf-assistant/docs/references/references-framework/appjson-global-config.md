# app.json全局配置

app.json用于描述整个工程的配置信息，基本配置示例如下：

```json
{
  "pages": ["page/index/index"],
  "window": {
    "navigationBarTitleText": "ascf",
    "navigationBarTextStyle": "black"
  }
}
```

app.json的完整属性如下：


|节点| 属性 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |----|
| - | entryPagePath | string | - | 否 | 默认启动首页，默认为pages中第一项。不支持带页面路径参数。 |
| - | pages | string[] | - | 是 | 页面路径列表。 |
| - | window | Object | - | 否 | 全局的默认窗口表现。 |
| - | tabBar | Object | - | 否 | 底部 tab 栏的表现。 |
| - | subpackages | Object[] | - | 否 | 分包结构配置。编译后保留pages字段，其他对齐。<br/>"subpackages": [{"resource": "packageMore","root": "packageMore""pages": ["more/more"]}] |
| - | usingComponents | Object | - | 否 | 全局自定义组件配置。 |
| - | [resolveAlias](#resolvealias) | Object | - | 否 | 自定义模块映射规则。<br/>**依赖关系**：ASCF Toolkit版本≥1.0.4 |
| - | [lazyCodeLoading](../../guides/on-demand-render-time-injection.md) | string | - | 否 | 配置自定义组件代码按需注入，目前仅支持"requiredComponents"。<br/>**起始版本：** 1.0.13<br/>**依赖关系**：ASCF Toolkit版本≥1.0.6 |
| - | requiredBackgroundModes | string[] | - | 否 | 声明需要后台运行的能力，类型为数组。目前支持以下项目：<br/>audio: 后台音乐播放 |
| window | navigationBarBackgroundColor | HexColor | \#ffffff | 否 | 导航栏背景颜色。 |
| window | navigationBarTextStyle | string | black | 否 | 导航栏标题颜色。<br/>当API version 12时，仅当navigationStyle = "custom"时，可设置black或white，其他情况仅支持black。<br/>当API version 13及以上时，可设置成black或white。 |
| window | navigationBarTitleText | string | - | 否 | 导航栏标题文字内容。 |
| window | navigationStyle | string | default | 否 | 导航栏样式，仅支持以下值：<br/>- default默认样式<br/>- custom自定义导航栏，只保留右上角胶囊按钮。 |
| window | backgroundColor | HexColor | \#ffffff | 否 | 窗口的背景色。 |
| window | backgroundTextStyle | string | dark | 否 | 下拉loading的样式，仅支持dark/light。 |
| window | onReachBottomDistance | number | 50 | 否 | 页面上拉触底事件触发时距页面底部距离，单位为px。 |
| window | enablePullDownRefresh | boolean | false | 否 | 是否开启全局的下拉刷新。 |
| tabBar | color | HexColor | \#ffffff | 是 | tab上的文字默认颜色，仅支持十六进制颜色。 |
| tabBar | selectedColor | HexColor | \#000000 | 是 | tab上的文字选中时的颜色，仅支持十六进制颜色。 |
| tabBar | backgroundColor | HexColor | \#ffffff | 是 | tab的背景色，仅支持十六进制颜色。 |
| tabBar | position | string | bottom | 否 | tabBar的位置，仅支持 bottom/top。 |
| tabBar | borderStyle | string | black | 否 | tabbar上边框的颜色， 仅支持black/white。 |
| tabBar | list | Array | - | 是 | tab的列表。 |
| tabBar | custom | boolean | false | 否 | 是否开启自定义tabBar功能。<br/>**起始版本：** 1.0.10 |
| tabBar.list | pagePath | string | - | 是 | 页面路径，必须在pages中先定义。 |
| tabBar.list | text | string | - | 是 | tab上按钮文字。 |
| tabBar.list | iconPath | string | - | 否 | 图片路径，icon大小限制为 40kb，建议尺寸为 81px \* 81px，不支持网络图片。 |
| tabBar.list | selectedIconPath | string | - | 否 | 选中时的图片路径，icon大小限制为 40kb，建议尺寸为 81px \* 81px，不支持网络图片。 |


## resolveAlias

resolveAlias配置项可用于自定义模块路径的映射规则。

配置完成后，它会对require中的模块路径按照所设定的映射规则进行匹配，进而转换为对应的配置路径。

倘若存在多条规则同时匹配，选取最长的规则映射。

```json
{
  "resolveAlias": {
    "~/*": "/*",
    "~/index/*": "index/*",
    "@utils/*": "utils/*",
    "subBView/*": "subpackageB/view/*"
  }
}
```

> **注意：**
>
> resolveAlias进行的是路径匹配，其中的key和value需以 /\* 结尾。

配置了上述路径映射规则，会做如下匹配并转换。

- ~/component.js -&gt; component.js

- ~/index/components.js -&gt; index/components.js

- \@utils/test.js -&gt; utils/test.js

- subBView/test.js -&gt; subpackageB/view/test.js
