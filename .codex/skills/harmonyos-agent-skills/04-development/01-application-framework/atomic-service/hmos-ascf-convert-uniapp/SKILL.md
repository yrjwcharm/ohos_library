---
name: hmos-ascf-convert-uniapp
description: 辅助开发者将 uni-app 项目适配(转换)为 ASCF 元服务。当需要使用 uni-app（HBuilderX 或 CLI）开发 HarmonyOS 元服务（MP-HARMONY），或将现有 uni-app 项目迁移(转换)到 ASCF 时使用此技能。提供完整的环境搭建、HBuilderX 开发流程、CLI 配置、常见问题排查和上架审核指引。
license: MIT
metadata:
  version: "1.0.1"
  author: ascf
---

## Workflow

### 步骤 1：环境搭建与准备

1. 安装 [DevEco Studio](https://developer.huawei.com/consumer/cn/download/)
2. 安装 [HBuilderX](https://www.dcloud.io/hbuilderx.html)（4.34 及以上版本）(可选)
3. 在 [AppGallery Connect（AGC）](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html) 创建元服务项目，获取 AppId
4. **提前备案**（上架前必须）：参考[元服务备案文档](https://developer.huawei.com/consumer/cn/doc/atomic-guides/atomic-service-filing)
5. 如需登录/支付权限，立即开始申请

---

## 方式一：HBuilderX 开发（推荐新手）

### 1. 创建 uni-app 项目

在 HBuilderX 中新建项目，选择 uni-app 模板。

### 2. 配置元服务包名

打开 `manifest.json`，填写 **HarmonyOS元服务 - 应用包名**，格式：`com.atomicservice.[你的AppID]`

### 3. 配置 harmony-mp-configs

`harmony-mp-configs/` 目录下的文件在编译时自动同步到 HarmonyOS 工程：

**签名配置**（`harmony-mp-configs/build-profile.json5`）：
```json5
{
  "app": {
    "signingConfigs": [/* 签名信息 */]
  }
}
```

**权限配置**（`harmony-mp-configs/entry/src/main/module.json5`）：
```json5
{
  "module": {
    "requestPermissions": [
      // 按需添加，完整列表参考 HarmonyOS 权限清单
    ],
    "metadata": [
      { "name": "client_id", "value": "你的ClientID" }  // 华为账号登录必须
    ]
  }
}
```

### 4. 适配不支持的接口

条件编译标识：`MP-HARMONY`，完整平台标识见下方速查表。

```js
// #ifdef MP-HARMONY
console.log('只在 ASCF 元服务运行')
has.login({ success(res) { console.log(res.code) } })
// #endif

// #ifdef H5
window.location.href = '/login'
// #endif
```

**模板中条件编译：**

```vue
<!-- #ifdef MP-HARMONY -->
<button open-type="contact">ASCF 专属按钮</button>
<!-- #endif -->

<!-- #ifndef MP-HARMONY -->
<view>非 ASCF 平台内容</view>
<!-- #endif -->
```

**样式中条件编译：**

```scss
/* #ifdef MP-HARMONY */
.ascf-only { color: #07C160; }
/* #endif */
```

### 5. 本地调试运行

在 HBuilderX 中点击运行 → HarmonyOS 元服务。遇到白屏或调试问题参考[调试指南](https://uniapp.dcloud.net.cn/tutorial/mp-harmony/intro.html#how-to-debug)。

### 6. 发布

HBuilderX → 发行 → HarmonyOS元服务，打包后提交 AGC 上架。

---

## 方式二：CLI 开发（推荐）

### 工作流

- Step 1：判断是创建一个新的uni-app项目还是使用已有的uni-app项目。如果是创建新的项目，参考Step 2。如果不是参考Step 3。
- Step 2：使用Vue3 CLI或Vue2 CLI创建uni-app项目。然后执行Step 4。
- Step 3：判断是Vue3 CLI还是Vue2 CLI，修改 package.json，添加脚本。然后执行Step 4。
- Step 4：使用 hmos-ascf-assistant SKILL 或 在当前项目下新建一个目录,`mkdir -p ascf-project && cd ascf-project && ascf generate --tid HelloASCF --appId 111 --appName AscfApp --appNameEn AscfApp --appDesc 测试 --appDescEn Test  --deviceTypes phone ./`(--tid HelloASCF不可更改) 在当前目录下创建一个新的ASCF项目。然后执行Step 5。
- Step 5：删除Step 5创建的项目里ascf/ascf_src/* 的文件。并且将 ascf-project/ascf/*, ascf-project/entry/src/main/resources/rawfile 添加到 .gitignore 中，不需要提交提交。然后执行Step 6。
- Step 6: 然后配置联合构建脚本

### Vue3 CLI

```bash
# 新建项目（可选）
npx degit dcloudio/uni-preset-vue#vite-alpha my-project
cd my-project
npm install
```

### 修改 package.json，添加脚本

```bash
"dev:mp-harmony": "uni -p mp-harmony",
"build:mp-harmony": "uni build -p mp-harmony"
```

### Vue2 CLI

```bash
npm i @dcloudio/uni-mp-harmony
npm i @dcloudio/webpack-uni-pages-loader -D
```

### 修改 package.json，添加脚本

```json
"dev:mp-harmony": "cross-env NODE_ENV=development UNI_PLATFORM=mp-harmony vue-cli-service uni-build --watch",
"build:mp-harmony": "cross-env NODE_ENV=production UNI_PLATFORM=mp-harmony vue-cli-service uni-build"
```

**注意**：npm需要根据项目中使用的packageManager来选择，也可以是pnpm/yarn等。uniapp从v2.0.2-4050720250324001 和 v3.0.0-4050720250324001开始支持ASCF插件@dcloudio/uni-mp-harmony。先确保项目中依赖的uniapp版本（v2和v3版本分别需要根据完整版本号对比，需要高于支持的版本才行）满足后再使用。否则需要先将依赖的版本升级上来。尽量选择与uniapp相同版本的插件版本。

### CLI 项目打包运行

在 uni-app 项目根目录使用 hmos-ascf-assistant SKILL 创建项目。或使用 ASCF 插件创建 `ascf-project`，配置好签名信息。新创建项目清空 ascf/ascf_src/* 模板内容。并且将 ascf-project/ascf/*, ascf-project/entry/src/main/resources/rawfile 添加到 .gitignore 中，不需要提交提交。

然后配置联合构建脚本：

```json
{
  "dev:mp-harmony": "set UNI_OUTPUT_DIR=ascf-project/ascf/ascf_src&&uni -p mp-harmony",
  "watch:ascf": "cd ./ascf-project && ascf compile . --serve --logging debug",
  "dev:ascf": "cd ./ascf-project && ascf compile . -c -m --logging debug",
  "run:ascf": "cd ./ascf-project && ascf build assembleAndInstallHap -r . --logging debug",
  "build:ascf": "cd ./ascf-project && ascf compile . -c"
}
```

**注意**：如果是linux/osx系统，需要将set改为export。

```bash
pnpm run:ascf   # 编译并安装到设备
```

---

## uni-app 开发速查

需要参考 [](./references/uniapp-framework.md)

---

## 常见问题

### 白屏问题

```
白屏原因排查顺序：
1. DevEco 环境配置问题 → 尝试运行 HBuilderX 内置空白模板验证
2. 使用了不支持的 API / plus API → 查看控制台错误，用条件编译隔离
3. 查看运行日志 → DevEco Log 面板，筛选应用，过滤 Warn 级别
4. 断点调试 → ascf debugger start
```

### 日志查看

```bash
hdc shell hilog --domain 0x006F,0x8BF2
```

### 网络请求报错

- **临时方案**：手机 → 设置 → 系统 → 开发者选项 → 开发中元服务豁免管控 → 开启
- **稳定方案**：AGC 后台 → 开发管理 → 域名设置 → httpRequest 合法域名

### 地图/定位报错

AGC 后台 → 项目设置 → API 管理 → 开启定位/位置/地图服务，并在 `module.json5` 添加权限：

```json5
"requestPermissions": [
  { "name": "ohos.permission.LOCATION" },
  { "name": "ohos.permission.APPROXIMATELY_LOCATION" }
]
```

### 华为账号登录（静默登录）

```js
uni.login({
  provider: 'huawei',
  success: (res) => {
    // 用 res.code 换取 UnionID，关联自有账号体系
    console.log(res.code)
  }
})
```

**易错点：**
- 签名必须是 AGC 下载的调试证书（非自动签名）
- `module.json5` 中 `metadata` 的 `client_id` 值为**应用 ClientID**（非项目 ClientID）
- AGC 后台需添加调试证书指纹

### 获取手机号

```xml
<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
  获取手机号
</button>
```

```js
getPhoneNumber(e) {
  console.log(e.detail.code)  // 服务端用此 code 获取手机号
}
```

### 分包异步化不生效

- 检查 `pages.json` 配置
- 确认设置了 `componentPlaceholder` 属性
- 确认 `componentPlaceholder` 名称与引用组件名一致

---

## 常见编译报错

| 报错 | 原因 | 解决 |
|------|------|------|
| `Invalid storeFile value` | 证书缺失或配置错误 | 参考[发布元服务文档](https://developer.huawei.com/consumer/cn/doc/app/agc-help-harmonyos-releaseservice-0000001946273965)申请证书 |
| `Unable to find the product 'release'` | 未填写完整发布证书 | 调整 `build-profile.json5` |
| `install failed due to error bundle type` | 设备上已安装同 BundleName 的 App 证书包 | 确认使用元服务证书而非 HarmonyOS App 证书 |
| `SDK component missing` | 声明了不兼容字段 | 删除 `build-profile.json5` 中的 `compileSdkVersion` |
| `dependent module does not exist` | 缺少 ASCF 引擎 | 应用市场搜索 "helloUniapp" 安装 ASCF 引擎 |

---

## 上架审核常见驳回

| 驳回原因 | 解决方案 |
|---------|---------|
| 元服务图标不规范 | 使用[元服务图标生成工具](https://developer.huawei.com/consumer/cn/doc/atomic-guides-V5/atomic-service-icon-generation-V5)生成 512×512 图标，放至 `harmony-mp-configs/AppScope/resources/base/media/app_icon.png` |
| 存在自行构造的登录页面 | 必须使用 `uni.login`，不得使用账号密码登录；必须提供注销入口 |
| 隐私政策未体现 HarmonyOS 平台 | 隐私协议中需包含 HarmonyOS 平台相关说明 |
| 设备类型不匹配 | `module.json5` 中 `deviceTypes` 与 AGC 后台勾选设备保持一致（通常只选 `phone`） |
| 权限填写不完整 | `module.json5` 中 `requestPermissions` 与 AGC 后台隐私协议"设备权限调用"严格一致 |

---

## 迁移检查清单

### Critical
- [ ] `pnpm build:mp-harmony` 或 HBuilderX 编译无报错
- [ ] `manifest.json` 中元服务包名已配置（`com.atomicservice.[AppID]`）
- [ ] 签名信息已配置（调试证书来自 AGC，非自动签名）
- [ ] `module.json5` 中 `client_id` 值正确

### Warning
- [ ] ASCF 专属逻辑已用 `#ifdef MP-HARMONY` 包裹
- [ ] 网络域名已在 AGC 后台配置白名单
- [ ] 已提前完成元服务备案
- [ ] 主要页面在真机正常运行

---

## 参考资料

- [uni-app 开发 HarmonyOS 元服务官方文档](https://uniapp.dcloud.net.cn/tutorial/mp-harmony/intro.html)
- [ASCF 框架概述](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/ascf-overview)
- [ASCF 调试指南](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/debug-ascf-code)
- 详细适配案例：[references/adapter2ascf.md](references/adapter2ascf.md)
