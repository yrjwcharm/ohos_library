# HarmonyOS 4及以下版本适配指南

> **说明：** 此为公测阶段功能，以快应用中心为容器，将 ASCF 元服务延展至 HarmonyOS 4 及以下设备。一套代码、一次开发、一次备案、一次上架，覆盖全量华为鸿蒙设备。
>
> 如有问题，联系：atomicservice@huawei.com

## 运行环境检测

```js
// 方式1：检测平台类型（推荐）
// platform === 'ohos' 表示 HarmonyOS 5.0+，否则为 HarmonyOS 4及以下
const isHOS5 = has.getDeviceInfo().platform === 'ohos'

// 方式2：检测接口是否可用
const supported = has.canIUse('has.hideShareMenu')

// 方式3：HTML 页面内通过 UserAgent 判断
// HarmonyOS 4及以下的 UA 不含 'HarmonyOS/5'
```

## Deeplink 格式（HarmonyOS 4及以下）

安装快应用中心后可使用：

```
hap://app/<bundleName>/[path][?key=value]
```

| 参数 | 必填 | 说明 |
|------|:----:|------|
| bundleName | 是 | 元服务包名 |
| path | 否 | 页面路径，默认首页 |
| key=value | 否 | 传递参数，可多个 |

**注意：**
- Deeplink 前后不能有空格
- 不支持在短信中直接点击唤起
- 不支持失败回调，需自行维护 H5 fallback

## 组件差异

| 组件 | HarmonyOS 5.0+ | HarmonyOS 4- | 差异说明 |
|------|:-:|:-:|------|
| input / textarea | ✓ | ✓ | 4- 收起输入法后输入框仍有焦点 |
| camera | ✓ | ✓ | 4- 加载页面为透明色 |
| map | ✓ | ✓ | 4- 定位图标、标记点、缩放图标、label 样式有差异 |
| video | ✓ | ✓ | 4- 不支持播控中心 |

> **渲染差异：** HarmonyOS 4及以下采用**堆叠渲染**，原生组件（map/video/canvas/camera）之上须用 `cover-view`/`cover-image` 覆盖内容，不支持普通 view 覆盖。

## 接口差异

### HarmonyOS 4及以下完全不支持的接口

| 接口 | 建议替代方案 |
|------|------|
| `has.hideShareMenu` / `has.showShareMenu` | 屏蔽功能 |
| `has.cashierPicker` | 屏蔽功能 |
| `has.requestContract` | 屏蔽功能 |
| `has.startRealNameVerification` / `has.startRealNameAuth` / `has.startFaceVerification` | 屏蔽功能 |
| `has.getAvatarInfo` | 屏蔽功能 |
| `has.getInvoiceTitle` / `has.chooseInvoiceTitle` | 屏蔽功能 |
| `has.getDeliveryAddress` / `has.chooseAddress` | 屏蔽功能 |
| `has.getServiceSubscription` | 屏蔽功能 |
| `has.onLazyLoadError` / `has.offLazyLoadError` | 屏蔽功能 |
| `has.createThirdPayClient` / `ThirdPayClient.pay` | 屏蔽功能 |
| `has.getAAID` / `has.deleteAAID` | 屏蔽功能 |
| `has.getPushToken` / `has.deletePushToken` | 屏蔽功能 |

### 有差异但可用的接口

| 接口 | 差异说明 |
|------|------|
| `has.scanCode` | `onlyFromCamera: true` 设置无效，仍可从相册选取 |
| `has.request` | `profile` 返回参数不一致 |
| `CanvasContext.measureText` | 4- 返回值自动取整，5+ 保留小数 |
| `CanvasContext.globalCompositeOperation` | 4- 部分模式绘图有差异 |
| `CanvasContext.setStrokeStyle` | 4- 非法渐变参数表现不一致 |
| `has.onSocketError` / `SocketTask.onError` | 异常场景错误码不一致（底层透传） |
| `BackgroundAudioManager` | 4- 播控中心无进度条，封面显示位置不同 |
| `has.playBackgroundAudio` | 4- 无控制后台播放能力 |
| `MapContext.toScreenLocation` | 坐标精度不一致 |

## 适配开发建议

```js
// 推荐写法：先检测再调用
function shareMenu(show) {
  if (has.getDeviceInfo().platform !== 'ohos') return // HOS 4- 不支持
  show ? has.showShareMenu() : has.hideShareMenu()
}

// cover-view 用法（HOS 4- 覆盖原生组件）
// hxml:
// <map>
//   <cover-view class="overlay">提示文字</cover-view>
// </map>
```

## 调试方法

使用 ASCF 命令行工具连接 HarmonyOS 4及以下手机调试：

```bash
# 连接设备后正常使用 ascf 命令即可，工具链自动适配
ascf build assembleAndInstallHap
ascf debugger start
```

参考 [使用ASCF命令行工具](../docs/quick-start/run-ascf-cli.md)。

## 申请分发到 HarmonyOS 4及以下设备

元服务在 AGC 发布上线后，发邮件申请（3个工作日内反馈）：

- **邮箱：** atomicservice@huawei.com
- **标题格式：** `[元服务上架/下架申请]-[元服务名称]-[APP ID]`
- **APP ID 获取：** 华为开发者联盟 → 开发与服务 → 找到对应项目 → 项目设置 → 常规 → 应用 → APP ID

## 适配检查清单

- [ ] 使用 `has.getDeviceInfo().platform === 'ohos'` 区分运行环境
- [ ] 调用不支持接口前先用 `has.canIUse()` 检测
- [ ] 原生组件（map/video/canvas/camera）上方的覆盖内容改用 `cover-view`/`cover-image`
- [ ] 屏蔽或替代不支持的接口（分享菜单、实名认证、地址、发票、推送 Token 等）
- [ ] HOS 4- 设备上完整测试核心功能路径
