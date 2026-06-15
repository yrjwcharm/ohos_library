# ASCF 开发指南索引

## 快速入门

- [ASCF 框架概述](../docs/quick-start/ascf-overview.md)
- [获取 ASCF 插件](../docs/quick-start/ascf-plugin.md)
- 开发流程
  - [全新创建 ASCF 项目](../docs/quick-start/create-ascf-project.md)
  - [导入小程序资源](../docs/quick-start/convert-atomic-service-resources.md)
  - [编译元服务](../docs/quick-start/compile-atomic-service.md)
  - [基于三方框架编译为 ASCF 范式](../docs/quick-start/compile-ascf-paradigm.md)
  - [构建元服务](../docs/quick-start/create-atomic-service.md)
- [开发兼容模式元服务](../docs/quick-start/ascf-cross-atomicservice.md)
- [使用 ASCF 命令行工具](./ascf-toolkit-cli.md)
- [使用 ASCF 助手开发](../docs/quick-start/ascf-assistant.md)
- [代码编辑](../docs/quick-start/code-editing.md)
- [签名配置](../docs/quick-start/configuring-signature.md)
- [运行调试元服务](../docs/quick-start/debug-ascf-code.md)
- [发布元服务](../docs/quick-start/release-atomic-service.md)

## 开发指南

- [开发指南总览](../docs/guides/ascf-development-guide.md)
- 基础能力
  - [访问网络](../docs/guides/develop-network-access.md)
  - [存储数据](../docs/guides/develop-data-storage.md)
  - [访问媒体文件](../docs/guides/develop-media-access.md)
  - [获取页面节点信息](../docs/guides/develop-page-node-retrieval.md)
  - [画布](../docs/guides/develop-canvas.md)
  - [授权](../docs/guides/develop-authorization.md)
  - [开发沉浸式页面](../docs/guides/develop-immersive-pages.md)
  - [自定义 tabBar](../docs/guides/develop-custom-tabbar.md)
  - [按需注入和用时注入](../docs/guides/on-demand-render-time-injection.md)
  - [阻断式更新](../docs/guides/develop-blocked-update.md)
  - [数据预拉取](../docs/guides/develop-data-preloading.md)
  - [want 参数解析](../docs/guides/develop-want-parameter-parsing.md)
  - [内容风控服务](../docs/guides/content-moderation-service.md)
- 分包加载
  - [分包加载](../docs/guides/develop-subpackage-loading.md)
  - [分包](../docs/guides/develop-subpackages.md)
  - [预加载](../docs/guides/develop-preloading.md)
  - [分包异步化](../docs/guides/asynchronous-subcontracting.md)
  - [IDE 本地运行时配置](../docs/guides/develop-ide-runtime-configuration.md)
- 开放能力
  - [开放能力总览](../docs/guides/develop-open-capabilities.md)
  - [获取华为账号用户信息](../docs/guides/develop-huawei-id-retrieval.md)
  - [获取位置信息](../docs/guides/develop-location-retrieval.md)
  - [向用户推送信息](../docs/guides/develop-push-info.md)
  - [接入支付服务](../docs/guides/develop-payment-access.md)
  - [开发 web-view 组件](../docs/guides/develop-web-view.md)
  - [跳转其他元服务](../docs/guides/develop-navigate-other-atomicservices.md)
  - [获取元服务链接](../docs/guides/ascf-applinking.md)
  - [隐私托管](../docs/guides/develop-privacy-hosting.md)
  - [打开半屏元服务](../docs/guides/develop-open-embedded-atomicservice.md)
- [开发服务卡片](../docs/guides/develop-widget.md)
  - [元服务与卡片共享存储数据](../docs/guides/atomic-service-form-share-storage-data.md)
- [HarmonyOS 4 及以下版本适配指南](../docs/guides/ascf-cross-guide.md)

## ASCF 框架 API 文档

- [框架功能](../docs/references/references-framework/Readme-CN.md)（文件结构、配置、视图层、逻辑层、自定义组件、hjs）
- [组件功能](../docs/references/references-components/Readme-CN.md)（视图容器、表单、导航、媒体、地图、画布、web-view）
- [接口功能](../docs/references/references-apis/Readme-CN.md)（基础、路由、界面、网络、存储、媒体、位置、开放接口）

### has.* 接口分类速查

| 分类 | 关键接口 | 参考文件 |
|------|----------|----------|
| **基础** | `has.canIUse`, `has.getSystemInfo`, `has.onAppShow/Hide`, `has.getUpdateManager` | apis-caniuse, apis-system-info, apis-lifecycle, apis-app-event, apis-timer, apis-debug, apis-service-info, apis-format-conversion, apis-updatemanager |
| **路由** | `has.navigateTo`, `has.redirectTo`, `has.navigateBack`, `has.switchTab`, `has.reLaunch` | apis-router, apis-navigate |
| **跨服务导航** | `has.navigateToAtomicService`, `has.navigateBackAtomicService`, `has.terminateSelf` | apis-navigate |
| **界面** | `has.showToast`, `has.showModal`, `has.showLoading`, `has.createAnimation` | apis-interaction, apis-navigation, apis-tab-bar, apis-font, apis-pull-down-refresh, apis-scroll, apis-animation, apis-menu, apis-custom-components, apis-window |
| **网络** | `has.request`, `has.downloadFile`, `has.uploadFile`, `has.connectSocket` | apis-request, apis-download, apis-upload, apis-websocket |
| **存储** | `has.setStorage/Sync`, `has.getStorage/Sync`, `has.batchSetStorage/Sync` | apis-data-storage |
| **媒体** | `has.chooseImage`, `has.chooseVideo`, `has.createInnerAudioContext`, `has.createCameraContext` | apis-image, apis-video, apis-audio, apis-background-audio, apis-camera, apis-record, apis-rich-text, apis-map |
| **文件** | `has.saveFile`, `has.getFileInfo`, `has.getSavedFileList` | apis-file |
| **位置** | `has.getLocation`, `has.openLocation`, `has.chooseLocation` | apis-location |
| **画布** | `has.createCanvasContext`, `has.canvasToTempFilePath` | apis-canvas |
| **开放接口** | `has.login`, `has.authorize`, `has.requestPayment`, `has.createIap`, `has.getUserInfo` | apis-account, apis-authorization, apis-setting, apis-payment, apis-privacy, apis-iap, apis-share, apis-user-info, apis-message-subscription, apis-shipping-address, apis-invoice, apis-realname |
| **设备** | `has.scanCode`, `has.vibrate`, `has.getNetworkType`, `has.getBatteryInfo`, `has.getClipboardData` | apis-scan, apis-vibrator, apis-network-type, apis-battery-info, apis-bluetooth, apis-ble, apis-wifi, apis-contact, apis-telephony, apis-screen, apis-accelerometer, apis-compass, apis-gyroscope, apis-device-orientation, apis-keyboard, apis-clipboard, apis-crypto, apis-memory, apis-calendar |
| **其他** | `has.getExtConfig`, `has.createPush`, `has.startLivenessDetection` | apis-third-party-platform, apis-push-service, apis-nativeBridge, apis-hxml, apis-ai-face-liveness-detection |

### 组件分类速查

| 分类 | 组件 |
|------|------|
| **视图容器** | view, scroll-view, swiper, swiper-item, movable-area, movable-view, cover-view, cover-image |
| **基础内容** | text, icon, progress, rich-text |
| **表单** | button, input, textarea, checkbox, checkbox-group, radio, radio-group, switch, slider, picker, picker-view, picker-view-column, form, label, editor |
| **导航** | navigator |
| **媒体** | image, video, camera, audio |
| **地图** | map |
| **画布** | canvas |
| **Web** | web-view |
| **开放能力** | open-embedded-atomicservice |

### 框架文档分类速查

| 主题 | 说明 | 参考文件 |
|------|------|----------|
| **文件结构** | 项目布局、文件类型、URI 方案、资源访问规则 | file-structure |
| **配置** | app.json 全局配置、页面配置、项目配置 | appjson-global-config, page-json-config, project-json-config |
| **视图层** | hxml 模板语法（数据绑定、条件、循环）、CSS 样式 | view-layer-hxml, view-layer-css |
| **逻辑层** | App/Page 对象、生命周期、路由规则 | logical-layer-js, logical-layer-app, logical-layer-page, logical-layer-route-lifecycle |
| **事件系统** | 事件绑定、冒泡、捕获、双向绑定 | logical-layer-events, event-usage, event-category, event-binding-bubbling, event-capture, event-object, event-bidirectional-binding, event-responding-hjs |
| **自定义组件** | 创建、使用、模板、生命周期、通信、数据监听、样式隔离、插槽 | custom-components-creation/usage/template/component/lifecycle/communication/observers/style-isolation/hxml-slot, component-placeholder |
| **HJS** | 视图层脚本模块 | hjs, hjs-responding-event |
| **原生桥接** | ASCF 与 ArkTS 通信 | ascf-nativeBridge |
| **安全** | 防盗链能力 | ascf-referer |

## 平台能力接入决策树

当用户需要接入华为平台能力时，按以下决策查阅对应文档：

```
需要接入什么？
├─ 华为账号静默登录 / 获取 openID
│   └─ 参考 docs/guides/develop-huawei-id-retrieval.md
│   └─ 关键：配置签名指纹 → 配置 Client ID → has.login()
├─ 获取用户手机号
│   └─ 参考 docs/guides/develop-huawei-id-retrieval.md
│   └─ 关键：button open-type="getPhoneNumber" → bindgetphonenumber → 服务端换取手机号
├─ 授权（位置/摄像头/蓝牙/日历/麦克风）
│   └─ 参考 docs/guides/develop-authorization.md
│   └─ 关键：module.json5 声明权限 → has.authorize({ scope }) → 调用受保护 API
├─ 支付（实物商品）
│   └─ 参考 docs/guides/develop-payment-access.md
│   └─ 关键：has.requestPayment({ orderStr })
├─ 支付（虚拟商品 IAP）
│   └─ 参考 docs/guides/develop-payment-access.md
│   └─ 关键：has.createIap({ productId, productType })
├─ 隐私托管
│   └─ 参考 docs/guides/develop-privacy-hosting.md
│   └─ 关键：平台统一弹出隐私弹窗，不允许自行设计
├─ 分享
│   └─ 在 Page 中实现 onShareAppMessage()
│   └─ return { title, path, imageUrl }
├─ web-view 内嵌网页
│   └─ 参考 docs/guides/develop-web-view.md
│   └─ 前置：配置业务域名 → npm install @atomicservice/ascf-web-sdk
├─ 获取位置信息 / 地图
│   └─ 参考 docs/guides/develop-location-retrieval.md
│   └─ 前置：module.json5 声明 ohos.permission.LOCATION + has.authorize scope.userLocation
├─ 网络请求
│   └─ 参考 docs/guides/develop-network-access.md
│   └─ 注意：需在 AGC 后台配置 httpRequest 合法域名
├─ 数据存储
│   └─ 参考 docs/guides/develop-data-storage.md
├─ 媒体文件访问
│   └─ 参考 docs/guides/develop-media-access.md
├─ 预加载分包
│   └─ 参考 docs/guides/develop-preloading.md
├─ 跳转其他元服务
│   └─ 参考 docs/guides/develop-navigate-other-atomicservices.md
├─ 消息订阅 / 推送
│   └─ 参考 docs/guides/develop-push-info.md
└─ 发票抬头 / 收货地址
    └─ has.chooseInvoiceTitle() / has.chooseAddress()
```

## 三方平台开发

三方平台支持 ASCF 元服务，详情请参考 [HarmonyOS 开发服务商开发指南](https://developer.huawei.com/consumer/cn/doc/SPPartnerCenter-develop-Guides/ht-overview-0000002372776697?preview=1)。

开发者在 `AppScope/ext.json` 配置信息，三方平台打包时自动替换并生成 `ascf/ascf_src/extConfig.json`。通过 `has.getExtConfigSync()` 或 `has.getExtConfig()` 获取配置。

## 发布上架

1. 检查元服务名称
  * 在 AppScope/resources/base/element/string.json 中 修改app_name.value 
  * 在 entry/src/main/resources/base/element/string.json 中修改EntryAbility_label应用标题和EntryAbility_desc应用描述
2. 检查元服务图标，可以使用睫毛图工具生成后替换AppScope/resources/base/media/app_icon.png图片。
3. 完成元服务备案

## 元服务睫毛图工具

详细用法见 [睫毛图标生成参考](./ascf-icon-generator.md)。

```bash
# 首次使用：在 scripts/cli 目录安装依赖
pnpm install

# 生成图标
node scripts/cli/cli.js generate-as-icon \
  -i image-1024x1024.png \
  -o AppScope/resources/base/media/app_icon.png \
  --agc app_icon_agc.png
```
