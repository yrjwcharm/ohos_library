# 页面json配置

每一个ASCF框架页面也可以使用 .json 文件来对本页面的窗口表现进行配置。页面中配置项在当前页面会覆盖 app.json 的 window 中相同的配置项。文件内容为一个 JSON 对象，包含如下属性。

在app.json中配置如下属性将在所有页面生效，如果仅需个别页面生效，请在页面对应的.json文件中配置。

| 属性 | 类型 | 默认值 | 必填 | 描述 |
| -------- | -------- | -------- | -------- | -------- |
| navigationBarBackgroundColor | HexColor | \#ffffff | 否 | 导航栏背景颜色，如 \#ffffff。 |
| navigationBarTextStyle | string | black | 否 | 导航栏标题颜色。<br/>当API version 12时，仅当navigationStyle = "custom"时，可设置black或white，其他情况仅支持black。<br/>当API version 13及以上时，可设置成black或white。 |
| navigationBarTitleText | string | - | 否 | 导航栏标题文字内容。 |
| navigationStyle | string | default | 否 | 导航栏样式，仅支持以下值：<br/>- default：默认样式。<br/>- custom：自定义导航栏，只保留右上角胶囊按钮。 |
| backgroundColor | HexColor | \#ffffff | 否 | 窗口的背景色。 |
| enablePullDownRefresh | boolean | false | 否 | 是否开启当前页面下拉刷新。 |
| backgroundTextStyle | string | dark | 否 | 下拉loading的样式，仅支持dark/light。 |
| onReachBottomDistance | number | 50 | 否 | 页面上拉触底事件触发时距页面底部距离，单位为px。 |
| disableScroll | boolean | false | 否 | 设置为true则页面整体不能上下滚动。<br/>只在页面配置中有效，无法在app.json中设置。 |
| usingComponents | Object | - | 否 | 页面自定义组件配置。 |
