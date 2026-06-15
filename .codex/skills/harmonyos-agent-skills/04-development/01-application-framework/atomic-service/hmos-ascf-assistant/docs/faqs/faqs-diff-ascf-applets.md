# ASCF框架与小程序的差异

## 框架差异

ASCF框架是基于HarmonyOS的元服务开发框架，基于元服务工程，依赖ASCF运行时加载ASCF源码编译后的资源文件运行。

ASCF的接口全局对象定义为has，全称为harmony atomic service。

**ASCF源码的文件类型为：**

- 布局文件：.hxml

- 样式文件：.css

- 脚本文件：.js

- 内联脚本：.hjs

**框架能力差异：**

- 支持[分包](../guides/develop-subpackages.md)能力，单个包不超过2MB，总包不超过10MB，总包如果有更大诉求可以申请更大包大小。不过tabbar页面必须在主包，因此需要从小程序转换过来需要按需适配修改分包逻辑。
- 元服务在平板上面默认是居中显示，并且无法设置强制竖屏。后续已有更优规划。
- hjs中数组的constructor的返回值不是字符串而是一个函数，建议做特殊处理。
- 当API version 12时，导航栏标题设置globalStyle 设置"navigationBarTextStyle": "white"，实际显示黑色。因为系统导航栏不支持设置为白色，可以在app.json文件中修改navigationStyle字段为custom，启用自定义导航栏。
- 自定义组件暂时不支持getPageId方法。

## 组件差异

- 不支持依赖于插件能力的 functional-page-navigator、channel-live、channel-video、live-player、live-pusher、voip-room等组件。
- 一个组件的hxml中可以有多个slot，不需要在组件js中声明 "multipleSlots: true"。

## 接口差异

**总体原则**：

- 不支持小程序平台已经废弃的接口。

- 如果有小程序接口未支持ASCF框架，可以将诉求反馈给我们，华为运营人员将在1-3个工作日内为你答复。

反馈邮箱地址：atomicservice\@huawei.com

邮件标题：[ASCF框架接口诉求]-[元服务名称]-[APP ID]-[Developer ID]，APP ID等查询方法见下方信息。

邮件内容：说明需要使用的相关的信息。

| 基础信息 | 描述 |
| -------- | -------- |
| 元服务名称 | 应用市场上架的元服务名称。 |
| APP ID | 登录[华为开发者联盟](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html#/)，在“我的项目 &gt; 项目设置 &gt; 常规 &gt; 应用-APP ID”中获取。 |
| Developer ID | 开发者用于调试的华为账号；登录[华为开发者联盟](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html#/)，在“我的项目 &gt; 项目设置 &gt; 常规 &gt; 开发者 &gt; Developer ID"中获取。 |

**关键接口差异**：

| 接口 | 建议 |
| -------- | -------- |
| has.getAccountInfoSync | appId可以从AppScope/app.json5的bundleName中获取到。 |
| has.getClipboardData | 系统对剪切板权限管控比较严格，暂不支持。 |

## 权限差异
- has.addPhoneContact接口不需要scope.addPhoneContact权限，接口调用时不用申请该权限。
- has.saveImageToPhotosAlbum和has.saveVideoToPhotosAlbum接口不需要scope.writePhotosAlbum权限，接口调用时不用申请该权限。

