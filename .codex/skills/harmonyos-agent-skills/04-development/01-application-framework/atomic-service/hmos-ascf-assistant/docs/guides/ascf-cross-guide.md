# HarmonyOS 4及以下版本的元服务适配指南

> **说明**
> 
> 当前适配接入为公测阶段，如有任何问题，请联系atomicservice@huawei.com。

为了扩大您的元服务的用户覆盖范围，给您带来更多的流量，我们计划以快应用中心为容器，将ASCF框架开发的元服务延展至HarmonyOS 4及以下版本中运行。

ASCF框架开发的元服务，结合快应用中心，可实现一套代码、一次开发、一次备案、一次上架，即可覆盖全量华为鸿蒙设备。

> **注意：**
>
> 总体开发上架流程和HarmonyOS 5.0及以上系统一致。
> 因为运行的OS和渲染环境不同，HarmonyOS 4及以下OS版本仍存在部分场景需要适配，可通过以下方式进行判断。
> 1. 元服务内通过has.canIUse接口或has.getSystemInfo().SDKVersion判断运行环境。
> 2. 元服务内HTML页面通过UserAgent判断运行环境。


## 适配指南

### 使用 ASCF 工具链调试运行

请参考[使用ASCF命令行工具](../quick-start/run-ascf-cli.md)，连接HarmonyOS 4及以下的版本手机，开发调测元服务。

### 组件/接口适配

元服务在HarmonyOS 5.0及以上的运行环境与HarmonyOS 4及以下版本类似，即逻辑层的JavaScript代码运行在V8中，视图层是基于HarmonyOS原生的ArkWeb引擎来渲染。

运行机制、更新机制、组件框架等均保持一致，但因为不同平台的WebView内核和系统接口不同，在一些特性支持度上会有区别，大多是与组件/接口相关。


开发者可通过has.canIUse接口或者通过has.getDeviceInfo().platform === 'ohos'判断，对业务逻辑做必要的兼容。罗列出暂未支持的特性，对使用到未支持的特性需做好兼容。其中组件/接口具体的支持情况可跳转至对应文档查看。

> **注意：**
>
> 通过has.getDeviceInfo().platform判断运行平台，满足has.getDeviceInfo().platform === 'ohos'是HarmonyOS 5.0及以上运行环境，否则是HarmonyOS 4及以下运行环境。


## 容器化差异

### Deeplink 功能说明

元服务提供标准的Deeplink入口，可以实现点击web页面的链接启动元服务。

> **说明：**
>
> - Deeplink链接前后不能有空格。
> - Deeplink链接不能在短信中直接点击唤起元服务。
> - Deeplink跳转不支持失败回调，如果您是在网页中使用，请自己维护fallback，确保在未跳转的情况下，仍然有合适的H5页面为用户提供服务。

安装快应用中心后，即可使用Deeplink。


### 支持的格式

Deeplink格式：

```bash
hap://app/<package>/[path][?key=value]
```
  
| 参数 | 类型 | 必填 | 描述 |
| ---- | ---- | ---- | ---- |
| package | string | 是 | 元服务包名 |
| path | string | 否 | 元服务内页面的路径，默认为首页。 |
| key-value | string | 否 | 需要传给页面的参数，可以有多个。传递的参数值有可能被其他应用获取，建议不要传递安全敏感度较高的数据。 |

### 组件/接口的关键差异

**组件**

| 组件 | HarmonyOS 5.0及以上 | HarmonyOS 4及以下 | 差异说明 |
| ---- | ----- | ----- | ---- |
| input/text-area | √ | √ | HarmonyOS 4及以下input组件、text-area组件输入法拉起后焦点检查，点击输入法右上角收起输入法，输入框仍有焦点。 |
| camera | √ | √ | HarmonyOS 4及以下相机的加载页面为透明色。 |
| map | √ | √ | HarmonyOS 4及以下map组件的定位图标样式、标记点图标样式、缩放图标默认展示、Marker上的label展示有差异。 |
| video | √ | √ | HarmonyOS 4及以下不支持播控中心。 |

> **注意：**
>
> 元服务在HarmonyOS 4及以下系统中采用堆叠渲染，使用cover-view/cover-image显示覆盖在原生组件之上的文本/图片视图。可覆盖的原生组件包括map、video、canvas、camera。

**接口**

在HarmonyOS 4及以下系统中，接口效果跟HarmonyOS 5.0及以上存在差异，详情见下表。针对不支持的接口，开发者需要暂时屏蔽或者采取替代方案。

| 接口 | HarmonyOS 5.0及以上 | HarmonyOS 4及以下 | 差异说明 |
| ---- | ----- | ----- | ---- |
| has.hideShareMenu | √ | × | HarmonyOS 4及以下暂不支持。 |
| has.showShareMenu | √ | × | HarmonyOS 4及以下暂不支持。 |
| has.cashierPicker | √ | × | HarmonyOS 4及以下暂不支持。 |
| has.requestContract | √ | × | HarmonyOS 4及以下暂不支持。 |
| has.startRealNameVerification | √ | × | HarmonyOS 4及以下暂不支持。 |
| has.startRealNameAuth | √ | × | HarmonyOS 4及以下暂不支持。 |
| has.startFaceVerification | √ | × | HarmonyOS 4及以下暂不支持。 |
| has.getAvatarInfo | √ | × | HarmonyOS 4及以下暂不支持。 |
| has.getInvoiceTitle | √ | × | HarmonyOS 4及以下暂不支持。 |
| has.getDeliveryAddress | √ | × | HarmonyOS 4及以下暂不支持。 |
| has.getServiceSubscription | √ | × | HarmonyOS 4及以下暂不支持。 |
| has.onLazyLoadError | √ | × | HarmonyOS 4及以下暂不支持。 |
| has.offLazyLoadError | √ | × | HarmonyOS 4及以下暂不支持。 |
| has.createThirdPayClient | √ | × | HarmonyOS 4及以下暂不支持。 |
| ThirdPayClient.pay | √ | × | HarmonyOS 4及以下暂不支持。 |
| has.chooseAddress | √ | × | HarmonyOS 4及以下暂不支持。 |
| has.chooseInvoiceTitle | √ | × | HarmonyOS 4及以下暂不支持。 |
| has.getAAID | √ | × | HarmonyOS 4及以下暂不支持。 |
| has.deleteAAID | √ | × | HarmonyOS 4及以下暂不支持。 |
| has.getPushToken | √ | × | HarmonyOS 4及以下暂不支持。 |
| has.deletePushToken | √ | × | HarmonyOS 4及以下暂不支持。 |
| has.scanCode | √ | √ | HarmonyOS 4及以下，入参onlyFromCamera设置为true，仍能从相册选择照片。 |
| canvas | √ | √ | HarmonyOS 4及以下画布绘制的线条较粗。 |
| CanvasContext.measureText | √ | √ | HarmonyOS 4及以下width返回值会自动取整数，HarmonyOS 5.0及以上会保留小数。 |
| CanvasContext.globalCompositeOperation | √ | √ | HarmonyOS 4及以下destination-atop，source-in，destination-in绘图有差异。 |
| CanvasContext.setStrokeStyle | √ | √ | HarmonyOS 4及以下参数color传createLinearGradient(x0, y0, x1, y1)，其参数设置为不合法，与HarmonyOS 5.0及以上存在差异。 |
| has.onSocketError / SocketTask.onError | √ | √ | HarmonyOS 4及以下has.onSocketError/SocketTask.onError接口与HarmonyOS 5.0及以上在异常场景下错误码不一致，错误信息是底层网络框架层透传的。 |
| has.request | √ | √ | 由于底层网络框架差异，请求接口成功返回参数profile不一致。 |
| BackgroundAudioManager | √ | √ | HarmonyOS 4及以下播控中心界面展示有差异，不显示进度条、播放进度、音频总时长且音频封面展示在右边。 |
| has.playBackgroundAudio | √ | √ | HarmonyOS 4及以下背景音频播放时，没有控制后台播放的能力。 |
| MapContext.toScreenLocation | √ | √ | 由于依赖的地图SDK在不同平台的差异，获取经纬度对应的屏幕坐标精度不一致。 |

> **说明：**
>
> 在调用系统部分能力（如网络、地图，IAP等）部分异常场景下，框架会将底层错误发透传给元服务，存在错误码不一致的情况。
> 建议开发适配过程中，针对用户场景进行适配。

### 申请上架、下架

元服务在AG发布上线后，如需分发到系统版本HarmonyOS 4及以下的设备上，可以发送邮件申请，华为运营人员将在 3 个工作日内反馈处理结果。

- 反馈邮箱地址：atomicservice@huawei.com
  
- 邮件标题：[元服务上架/下架申请]-[元服务名称]-[APP ID]，APP ID等查询方法见下方基础信息。
  
- 邮件内容：说明需要使用的相关信息。


| 基础信息 | 描述 |
| ---- | ---- |
| 元服务名称 | 应用市场上架的元服务名称。 |
| APP ID | 登录[华为开发者联盟](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html#/)，在 "开发与服务" 找到对应项目，"项目设置 > 常规 > 应用 > APP ID" 中获取。 |