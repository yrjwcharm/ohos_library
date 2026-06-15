ASCF框架支持将Taro快速转换为元服务。下面以开源项目[themusecatcher/taro-vue](https://github.com/themusecatcher/taro-vue)为例，转换为ASCF元服务。

## 1. 环境搭建

- 安装[DevEco Studio](https://developer.huawei.com/consumer/cn/download/)。
    
- 安装[DevEco Studio ASCF Plugin](https://developer.huawei.com/consumer/cn/download/)，或者[ASCF VSCode插件](https://marketplace.visualstudio.com/items?itemName=atomicservice.ascf-plugin-vscode)，或者[ASCF Toolkit命令行工具](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/run-ascf-cli)（下面已VSCode插件工具演示为例）。
    
- HarmonyOS元服务ASCF项目[开发环境搭建指南](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/ascf-development-process)，确保已配置ASCF元服务开发环境。
    

## 2. 适配修改

- [AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)（简称AGC）创建一个元服务项目，获取到AppId。
    
- 在Taro的项目根目录，使用[ASCF插件](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/ascf-development-process)创建一个ascf-project的ASCF元服务项目，配置好签名信息。
    
- 修改Taro项目下config/index.{js,ts}配置文件，将 outputRoot: 'dist' 修改为 outputRoot: process.env.TARO_ENV === 'ascf' ? '**ascf-project/ascf/ascf_src**' : 'dist'
    
- 修改Taro项目 package.json 实现自动编译构建运行ASCF元服务：
    

```json
   "build:ascf": "taro build --type ascf",
   "watch:ascf": "cd ./ascf-project && ascf compile . --serve --logging debug",
   "dev:ascf": "cd ./ascf-project && ascf compile . -c -m --logging debug",
   "run:ascf": "cd ./ascf-project && ascf build assembleAndInstallHap -r . --logging debug",
   "release:ascf": "cd ./ascf-project && ascf compile . -c",
```

- 参考Taro的[多端编译构建](https://docs.taro.zone/docs/envs)指导以及[元服务的适配指南](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/ascf-development-guide)，适配ASCF平台，然后 pnpm build:ascf 编译为ASCF源码。
    
- 使用 pnpm run:ascf 启动运行。如果运行有异常，参考HarmonyOS元服务ASCF项目[开发流程](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/ascf-development-process) 调试运行，也可以参考[调试指南](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/debug-ascf-code)解决问题。
    

## 3. 常见问题说明

### 3.1. 适配问题（可选，涉及到才需要考虑）

ASCF的app.json配置还不支持theme变量，需要适配修改为具体的值：

```js
"window": {
   "backgroundColorTop": "@bgColorTop",
   "backgroundColorBottom": "@bgColorBottom",
   "backgroundTextStyle": "@bgTxtStyle",
   "navigationBarBackgroundColor": "@navBgColor",
   "navigationBarTitleText": "WeChat",
   "navigationBarTextStyle": "@navTxtStyle"
 },
```

修改为：

```js
const theme = require('./theme.json');
const $t = (key) => process.env.TARO_ENV === 'ascf' ? theme?.light?.[key.replace('@', '')] : key;

 window: {
   // backgroundColor: '@bgColor', // 窗口的背景色
   backgroundColorTop: $t('@bgColorTop'), // 顶部窗口的背景色，仅 iOS 支持，默认 # ffffff，即loading背景色
   backgroundColorBottom: $t('@bgColorBottom'), // 底部窗口的背景色，仅 iOS 支持，默认 # ffffff
   backgroundTextStyle: $t('@bgTxtStyle'), // 下拉 loading 的样式，仅支持 dark / light，默认 dark
   // navigationStyle: 'custom', // 全局导航栏样式，仅支持以下值：default 默认样式；custom 自定义导航栏，只保留右上角胶囊按钮
   navigationBarBackgroundColor: $t('@navBgColor'), // 导航栏背景颜色，默认 # 000000
   navigationBarTitleText: 'WeChat', // 导航栏标题文字内容
   navigationBarTextStyle: $t('@navTxtStyle') // 导航栏标题颜色，仅支持 black | white
 },
```

### 3.2. 编译构建问题

#### 1）ASCF当前编译Taro源码有点慢，可以开启swc提升构建速度

开启方法：在Taro源码目录中新增ascf.config.json配置 { "swc": true }

#### 2）热更新运行

手机连接到电脑后，可以开启热更新编译构建和运行。Taro通过watch模式编译后，启动 pnpm watch:ascf 实现热更新编译。

### 3.3. 调试问题

如果遇到问题可以开启调试，查看页面和逻辑层问题。

在ascf-project目录下，命令行使用：ascf debugger start。

使用vscode（安装好了ASCF插件后）打开ascf-project项目，执行Start Debugger命令后可以启动调试功能：

![](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtybbs/908/161/966/C9633C5BEA79D94CC3BB489FE0C40CA5:5C0B871D8EF9284944C6924D06F1C8CDE550CA1266150B20B8E1A0794310222E.20260122194909.50469598804893750870958235688023:50001231000000:2800:BC5E9174982FDAE09AE53F513652AE3B8B36E9568772E2ABE89C2E0A5F5B1581.png)

## 4. 参考

ASCF元服务开发指南：[开发指南-ASCF框架 - 华为HarmonyOS开发者](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/ascf-development-guide)。

Taro支持ASCF元服务指南：[安装及使用 | Taro 文档](https://docs.taro.zone/docs/GETTING-STARTED#ascf%E5%85%83%E6%9C%8D%E5%8A%A1)。

Taro框架支持ASCF文章： [https://mp.weixin.qq.com/s/Ej39Pm2CL_KnErDqumJ3PA](https://mp.weixin.qq.com/s/Ej39Pm2CL_KnErDqumJ3PA)。
