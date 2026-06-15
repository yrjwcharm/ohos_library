---
name: hmos-ascf-assistant
description: 辅助开发者使用 ASCF 工具链开发 HarmonyOS 元服务。触发场景：(1) 任何提到 ASCF 的问题；(2) 检测到项目包含 ascf/ascf_src 目录（即 ASCF 项目）；(3) 需要生成元服务睫毛图；(4) 将小程序转换为 ASCF 元服务；(5) 开发ASCF元服务页面/组件/平台能力（华为账号登录、隐私托管、授权、支付、分享、web-view、定位等）；(6) 将 Taro/uni-app 项目适配为 ASCF 元服务；(7) HarmonyOS 4及以下版本元服务适配与发布。
compatibility: Requires Deveco Studio with DEVECO_SDK_HOME configured and Node.js with npm for ascf-toolkit installation.
license: MIT
metadata:
  version: "1.4.0"
  author: ascf
---

## Workflow

### 步骤 1：环境检查与项目识别

**ASCF 项目自动识别：**
- 若当前目录存在 `ascf/ascf_src/` 目录，则自动判定为 ASCF 元服务项目，直接进入步骤 2
- 若用户消息中包含 `ASCF`、`ascf`、`ascf-toolkit`、`ascf compile`、`ascf build`、`ascf generate`、`ascf convert`、`睫毛图`、`元服务图标`、`HarmonyOS 4` 等关键词，直接触发本 skill

**必须满足以下前置条件（编译/打包时）：**
- [ ] 已安装 Deveco Studio / command-line-tools，且 `DEVECO_SDK_HOME` 环境变量已永久配置
  - 未配置时提示用户安装 [Deveco Studio](https://developer.huawei.com/consumer/cn/download/)
- [ ] ascf CLI 已安装
  - 检查：`ascf --version`
  - 未安装：`npm i -g @atomicservice/ascf-toolkit`
- [ ] Node.js >= 16，Java >= 17（打包时必需）

### 步骤 2：任务判断

```
用户任务类型？
├─ A. 创建 ASCF 元服务项目 → 【创建项目】
├─ B. 编译/运行/调试/打包/卸载/清缓存 → 【CLI 操作速查】
├─ C. 开发 ASCF 页面/组件/样式 → 【ASCF 元服务开发】
├─ D. 接入平台能力（登录/授权/支付/分享/web-view/定位等）→ 【平台能力接入】
├─ E. 原生小程序（微信/支付宝）转换为 ASCF → 【小程序转换】
├─ F. Taro 项目适配 ASCF → 加载 hmos-ascf-convert-taro skill
├─ G. uni-app 项目适配 ASCF → 加载 hmos-ascf-convert-uniapp skill
├─ H. 生成睫毛图标/元服务图标/AGC 图标 → 【睫毛图标生成】
├─ I. HarmonyOS 4及以下版本适配 → 参考 [跨版本适配指南](./references/ascf-cross-compat.md)
└─ J. 发布上架元服务 → 参考 [发布上架指南](./references/ascf-release.md)
```

### 步骤 3：执行任务

---

## 创建 ASCF 元服务项目

```bash
ascf generate --tid HelloASCF --appId 111 --appName AscfApp --appNameEn AscfApp --appDesc 测试 --appDescEn Test --deviceTypes phone ./
```

**参数说明：**
- `tid` 固定为 `HelloASCF`，不可更改
- `appName`、`appNameEn` 必须是纯英文
- 所有参数（tid/appId/appName/appNameEn/appDesc/appDescEn/deviceTypes）必填，无特别说明使用默认值

**创建后必做：**
1. 修改 `AppScope/app.json5` 中的 `bundleName`
2. 修改 `build-profile.json5` 中 `app.signingConfigs` 的签名信息
3. 在项目目录下运行 `ascf build installDeps` 安装依赖
4. 建议在 `ascf/ascf_src/` 下创建或复用 `ascf.config.json` 开启 SWC 加速：`{"swc": true}`

**项目源码结构**（开发时通常只修改 `ascf/ascf_src` 目录）：

```
ascf/ascf_src/
├── app.js                 # App 入口 — onLaunch, onShow, onHide, globalData
├── app.json               # 全局配置 — pages, window, tabBar, subpackages
├── app.css                # 全局样式 (rpx 单位)
├── ascf.config.json       # 编译配置文件
├── pages/
│   └── index/
│       ├── index.js       # 页面逻辑 — Page({}) with lifecycle
│       ├── index.hxml     # 页面模板 — data binding, has:if, has:for
│       ├── index.css      # 页面样式 (scoped)
│       └── index.json     # 页面配置 — navigationBarTitleText, usingComponents
├── components/            # 自定义组件
├── utils/                 # 工具函数
└── assets/                # 静态资源
```

---

## CLI 操作速查

| 操作 | 命令 | 说明 |
|------|------|------|
| 编译（debug） | `ascf compile -c -m <path>` | 不加 `-m` = release；加 `--serve` 开启热更新 |
| 打包 Hap | `ascf build assembleHap` | 可加 `-m` 指定 debug/release |
| 打包 App | `ascf build assembleApp` | 可加 `-m` 指定 debug/release |
| 安装并运行 | `ascf build assembleAndInstallHap` | 需 `hdc` 已连接设备 |
| 重启元服务 | `ascf build start` | 需已安装 |
| 卸载 | `ascf build uninstall` | — |
| 清缓存 | `ascf build clean` | 清除 hvigor/ohpm 缓存 |
| 分析包大小 | `ascf compile . -c -m --analyzeBundle` | 浏览器查看报告 |
| 调试 | `ascf debugger start` | 视图层：chrome://inspect |
| 停止调试 | `ascf debugger stop` | 调试报错时先停再启 |
| 安装 npm 包 | `npm install <pkg>`（在 ascf_src 下） | 然后 `ascf buildNpm <projectRoot>` |

详细命令参数见 [CLI 参考](./references/ascf-toolkit-cli.md)。

---

## ASCF 元服务开发

### API 调用约定

所有 ASCF API 统一使用 `has` 作为全局对象（如 `has.request()`、`has.showToast()`），**不是** `wx.*`。

API 分为两种调用模式：

1. **异步（回调式）**：传入 Object，包含 `success`、`fail`、`complete` 回调
   ```js
   has.request({ url: '...', success(res) {}, fail(err) {} })
   ```
2. **同步**：方法名以 `Sync` 结尾，直接返回结果
   ```js
   const value = has.getStorageSync('key')
   ```

### 文件类型

| 扩展名 | 用途 |
|--------|------|
| `.hxml` | 页面/组件模板（类似 HTML，属性前缀用 `has:`） |
| `.js` | 页面/组件逻辑 |
| `.json` | 页面/组件配置 |
| `.css` | 页面/组件样式（单位用 `rpx`） |
| `.hjs` | 视图层脚本模块（可在 hxml 中通过 `<hjs>` 标签引用） |

### 存储限制

- 单个 key 最大 **1MB**，总存储上限 **10MB**
- 数据持久化，直到用户主动删除

### 开发参考

参考 [开发示例](./references/examples.md) 快速了解 ASCF 框架的用法（生命周期/数据绑定/事件/路由/存储/网络请求/登录/动画/传感器/音频/自定义组件）。

如果要开发具体功能，参考 [开发指南索引](./references/guide.md) 查找对应文档（含 API 分类速查表、组件速查表、学习路径）。

---

## 平台能力接入

当用户需要接入华为账号登录、隐私托管、授权、支付、分享、web-view、定位等能力时，参考 [开发指南索引 - 平台能力接入决策树](./references/guide.md#平台能力接入决策树) 查找对应文档。

**常见能力快速索引：**

| 能力 | 关键 API / 步骤 |
|------|-----------------|
| 华为账号静默登录 | 配置签名指纹 → Client ID → `has.login()` |
| 获取手机号 | `button open-type="getPhoneNumber"` → 服务端换取 |
| 隐私托管 | 平台统一弹窗，禁止自行设计隐私弹窗 |
| 授权 | module.json5 声明权限 → `has.authorize({ scope })` |
| 支付（实物） | `has.requestPayment({ orderStr })` |
| 支付（虚拟） | `has.createIap({ productId, productType })` |
| 分享 | Page 中实现 `onShareAppMessage()` |
| web-view | 配置业务域名 → `npm install @atomicservice/ascf-web-sdk` |
| 位置/地图 | module.json5 声明权限 → `has.authorize` → `has.getLocation()` |

---

## 睫毛图标生成

使用内置 `scripts/cli` 工具生成符合规范的睫毛图标（512×512）和 AGC 图标（216×216）。完整用法见 [睫毛图标生成参考](./references/ascf-icon-generator.md)。

```bash
# 首次使用：在 scripts/cli 目录安装依赖
pnpm install

# 生成图标（推荐同时生成两种）
node scripts/cli/cli generate-as-icon \
  -i image-1024x1024.png \
  -o AppScope/resources/base/media/app_icon.png \
  --agc app_icon_agc.png
```

---

## 小程序转换（原生）

```bash
ascf convert -i <inputPath> -o <outputPath> [-c]
```

> `inputPath`为小程序项目路径， `outputPath`为输出的ASCF元服务路径。如果`outputPath`目录不存在，需先使用`ascf generate` 先创建一个ASCF项目,并且这个项目的根目录作为`outputPath`，再追加-c命令转换。
> `outputPath`不能是`inputPath`的子目录，可以改为`inputPath`的上级目录。

**转换后适配流程：**

1. 查看转换报告：`ascf/ascf_src/_ascfConvertReport/index.html` + `transform.log`
2. 验证文件格式替换（.hxml/.css/.hjs、`has:` / `has.`）
3. 修复语法问题（let 作用域、关键字冲突、非整型 px、`<toast>` → `has.showToast`）
4. 支付宝小程序额外适配（styleIsolation、slot、$page/$slots）
5. npm 依赖处理（vant-weapp 等需拷贝到源码目录或 `ascf buildNpm`）
6. AGC 注册配置（域名、权限）
7. 平台能力适配（隐私托管、华为账号登录、支付替换）→ 参考【平台能力接入】
8. 编译验证：`ascf compile -c -m .` → `ascf build assembleAndInstallHap`

详细差异和规则见 [转换参考](./references/ascf-convert.md)。

**已知框架差异：**
- 分包：单包 ≤ 2MB，总包 ≤ 10MB，tabBar 页面必须在主包
- image 组件不能显示本地图片，须使用网络图片
- hjs 中数组 constructor 返回函数而非字符串
- API version 12 时 `navigationBarTextStyle: "white"` 不生效，需用 `navigationStyle: "custom"`
- 自定义组件不支持 `getPageId` 方法
- 一个组件的 hxml 可有多个 slot，无需声明 `multipleSlots: true`

---

## 开发约束检查清单

### Critical（必须满足）

- [ ] **所有 API 调用来自参考文档，不得凭空捏造**
- [ ] 使用 `has.*` 而非 `wx.*`
- [ ] 模板使用 `.hxml`，属性前缀 `has:`（非 `wx:`）
- [ ] 样式文件使用 `.css`（非 `.wxss`）
- [ ] image 组件不能显示本地图片，需使用网络图片
- [ ] 先阅读 `references/ascf-toolkit-cli.md`，不调用文档里没有的 ascf 命令

### HarmonyOS 4及以下兼容（跨版本开发时）

- [ ] 使用 `has.getDeviceInfo().platform === 'ohos'` 区分 HOS 5+ / HOS 4-
- [ ] 调用不支持接口前先用 `has.canIUse()` 检测
- [ ] 原生组件上的覆盖内容改用 `cover-view`/`cover-image`
- [ ] 屏蔽或替代 HOS 4- 不支持的接口（分享菜单、实名认证、地址、发票等）

详细兼容列表见 [跨版本适配指南](./references/ascf-cross-compat.md)。

### Warning（建议满足）

- [ ] setData 批量合并，避免频繁调用
- [ ] 网络请求有 timeout 和错误处理
- [ ] 非整型 px 值改为整型（如 `0.5px` → `1px`）

---

## 平台合规要求检查清单

上架元服务前必须满足以下要求：

**隐私与账号**
- [ ] 接入平台隐私托管，不使用自行设计的隐私弹窗
- [ ] 有账号体系时使用 `has.login()` 静默登录，界面不出现"登录"字样
- [ ] 手机号授权仅在用户开始使用后、明确需要时发起

**支付（如涉及）**
- [ ] 实物商品使用 Payment Kit（`has.requestPayment`）
- [ ] 虚拟商品使用 IAP Kit（`has.createIap`）

**设计规范**
- [ ] 使用符合规范的睫毛图标（512×512）— 可用【睫毛图标生成】章节的工具自动生成
- [ ] 无开屏界面、无扑脸广告
- [ ] 一级页面支持边缘滑动手势退出，无弹框拦截
- [ ] 头部/底部导航栏沉浸式设计，避让元服务胶囊（Menubar）
- [ ] 禁止诱导跳转 App

**包大小**
- [ ] 单个分包不超过 2MB，总包不超过 10MB
- [ ] tabBar 页面必须在主包

完整发布前检查清单见 [发布上架指南](./references/ascf-release.md#发布前检查清单)。

---

## 问题排查

如果根据报错信息、异常 error、hilog 日志等信息无法解决，查阅 [FAQ](./docs/faqs/Readme-CN.md)。

---

## 资源引用

- [ASCF Toolkit CLI 参考](references/ascf-toolkit-cli.md) — 全部命令和配置详解
- [小程序转换参考](references/ascf-convert.md) — 差异对照和适配流程
- [开发指南索引](references/guide.md) — 快速入门、基础能力、开放能力、三方框架
- [开发示例](references/examples.md) — 生命周期/网络/登录/组件代码示例
- [跨版本适配指南](references/ascf-cross-compat.md) — HarmonyOS 4及以下兼容差异、Deeplink、分发申请
- [发布上架指南](references/ascf-release.md) — 签名、图标、包优化、完整发布流程和检查清单
- [ASCF 框架 API](docs/references/references-framework/Readme-CN.md) — 框架/视图层/逻辑层/自定义组件
- [ASCF 组件 API](docs/references/references-components/Readme-CN.md) — 所有支持的组件
- [ASCF 接口 API](docs/references/references-apis/Readme-CN.md) — 所有支持的 has.* 接口
- [常见问题 FAQ](docs/faqs/Readme-CN.md) — 按类别的问题解答
