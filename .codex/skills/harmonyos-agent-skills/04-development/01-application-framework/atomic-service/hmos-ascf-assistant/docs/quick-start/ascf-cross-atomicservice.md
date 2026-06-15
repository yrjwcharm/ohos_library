# 开发兼容模式元服务


元服务兼容模式，是ASCF框架基于容器化方式运行提供的能力，支持在“即享”App或负一屏中运行元服务的兼容模式，使元服务运行在任意版本的HarmonyOS系统上。


> **说明**
> 
> - 由于兼容模式下的元服务采用独立spk（Service package）包格式，所以需要使用1.0.6版本及以上的[安装命令行工具](run-ascf-cli.md#安装命令行工具)，或者[通过ASCF开发助手进行开发](#通过ascf开发助手进行开发)、编译、构建和打包。
> - 当前仅支持服务商通过三方管理平台接入开发。详细指导参考[服务商开发元服务兼容模式](https://developer.huawei.com/consumer/cn/doc/SPPartnerCenter-develop-Guides/ht-guide-0000002372887705)。
> - 由于在部分系统版本中仅支持ES6语法，暂不支持ES2020语法，如果在开发兼容模式元服务中使用了不支持的语法，可能会导致在EMUI10及以下版本无法打开。


## 通过ASCF开发助手进行开发

为了方便使用VSCode的开发者，ASCF团队开发并维护了VSCode插件——[ASCF开发助手](https://marketplace.visualstudio.com/items?itemName=atomicservice.ascf-plugin-vscode)，提供了一键式项目创建、快速转换及调试功能，帮助开发者进行元服务开发。推荐使用此插件开发兼容模式的元服务。

![zh-cn_image_0000002405304161-w800](figures/zh-cn_image_0000002405304161.png)


## 本地安装使用

![zh-cn_image_0000002371784522-w800](figures/zh-cn_image_0000002371784522.png)

在VSCode中，如上图路径所示，点击“设置选项 &gt; 在选项卡中选择扩展选项 &gt; 在扩展Tab页中点击更多 &gt; 选择从VSIX安装... &gt; 安装ASCF开发助手插件vsix包”。

当左侧工具栏出现如下图的元服务按钮，则说明安装成功。

![zh-cn_image_0000002406748521](figures/zh-cn_image_0000002406748521.png)


## 新建/导入项目


### 新建项目

1. 点击新建项目按钮，打开新建项目页。

   ![zh-cn_image_0000002371624654](figures/zh-cn_image_0000002371624654.png)

2. 按提示配置项目信息并创建项目。

   ![zh-cn_image_0000002405184313-w800](figures/zh-cn_image_0000002405184313.png)

   | 项目信息 | 描述 |
   | -------- | -------- |
   | App ID | 可通过在[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)上，可以通过“我的元服务”选择对应元服务，在“应用信息”可查询元服务的appid。 |
   | 项目名 | 创建的该项目的项目名。 |
   | 项目路径 | 创建的项目保存的路径，请确保选择的路径文件夹为空。 |
   | 设备类型 | 可选择元服务可运行的设备类型，当前支持运行在手机/平板上。 |
   | 元服务兼容模板 | 选择是否创建兼容模式元服务，取消勾选则开发的元服务仅支持运行在Harmony OS 5.0及以上系统中。 |


### 工程文件结构

兼容模式元服务项目与普通ASCF项目文件结构类似，如下所示。

- AppScope/app.json5：元服务的全局配置信息。

- AppScope/ext.json：元服务三方平台配置文件。

- entry：HarmonyOS工程模块，最终编译成元服务HAP文件。

- entry/src/main/resources/rawfile/：ascf主包编译后的资源会在此目录生成，**请勿占用。** 

- ascf/ascf_src：ascf框架源码目录。

- ascf/ascf_build：ascf源码编译过程目录，会生成元服务的子包和编译文件，**请勿占用。** 

可参考[ASCF框架代码结构](../references/references-framework/file-structure.md#ascf框架代码结构)进行配置，具体配置参数请参考：[ASCF参数配置](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/config)。


### 导入ASCF项目

1. 点击打开ASCF项目按钮。

   ![zh-cn_image_0000002405304197](figures/zh-cn_image_0000002405304197.png)

2. 选择需要打开的ASCF项目。


## 转换小程序项目为ASCF项目

1. 打开新建的ASCF项目，删除其中的ascf/ascf_src目录。

2. 点击转换按钮，选择小程序项目。

   ![zh-cn_image_0000002371784558](figures/zh-cn_image_0000002371784558.png)

   点击进行转换，可通过右下角打开转换报告查看转换信息。

   ![zh-cn_image_0000002371624694](figures/zh-cn_image_0000002371624694.png)

   ![zh-cn_image_0000002405184329-w800](figures/zh-cn_image_0000002405184329.png)


## 开发指导

元服务兼容版功能与ASCF的功能基本一致，请参考[ASCF框架开发指南](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/ascf-development-guide)。差异点请参考接口能力差异做适配。

在开发过程中，ASCF开发助手支持以下特性，能够帮助开发者更便捷、高效地开发元服务。

- ASCF开发助手支持一键创建页面、组件。

  通过在目录文件下右键，选择一键创建页面，即可快速生成页面所需的文件。

  ![一键创建_v2-w800](figures/一键创建_v2.gif)


- 智能联想，接口补全。

  ![zh-cn_image_0000002406932129-w400](figures/zh-cn_image_0000002406932129.png)


- 代码高亮，组件属性自动补全。

  ![一键补全_v2-w800](figures/一键补全_v2.gif)


## 配置签名

元服务兼容模式支持采用公私钥和P12方式签名两种模式，提交发布或运行均会验证签名，ASCF开发助手会对签名配置进行提醒，请按照提示正确完成签名配置。以[手动方式](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-signing#section297715173233)完成签名。详情请参见[服务签名](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-signing)。


### 使用ASCF开发助手自动创建公私钥

![zh-cn_image_0000002405184333-w800](figures/zh-cn_image_0000002405184333.png)

在右下角弹窗中，选择公私钥或P12签名进行创建。


### ASCF Toolkit命令行创建公私钥

使用以下命令进行当前项目的公私钥创建

```shell
ascf signtools generate-keypair -r path/to/ascf-project
```


## 开启开发兼容模式元服务

ASCF开发助手支持切换当前开发的元服务模式。


### 在设置中修改

在vscode的“设置”中搜索ascf-plugin。![zh-cn_image_0000002405304209](figures/zh-cn_image_0000002405304209.png)勾选Ascf-plugin: Support Legacy Hos选项，开启元服务兼容模式开发。

![zh-cn_image_0000002371784570](figures/zh-cn_image_0000002371784570.png)


### 快速切换开发模式

ASCF开发助手支持在底部栏中，点选“元服务兼容模式”即可快速切换。

![zh-cn_image_0000002371624702](figures/zh-cn_image_0000002371624702.png)

![zh-cn_image_0000002405184337](figures/zh-cn_image_0000002405184337.png)


## 本地运行

元服务兼容模式，在HarmonyOS 5.0及以上版本系统，需要在“即享”App中运行，需要先安装好“即享”App，然后运行元服务。

> **说明**
> 
> - “即享”App可以在应用市场中下载安装。
> 
> - 请确保当前为开发元服务兼容模式。


### ASCF开发助手一键式启动运行

ASCF开发助手会检测设备是否已连接，此时已连接的设备会显示在底部的设备选择框中。

![zh-cn_image_0000002405304213](figures/zh-cn_image_0000002405304213.png)

点击设备选择框，可以选择使用的设备。

![zh-cn_image_0000002371784574](figures/zh-cn_image_0000002371784574.png)

在设备正常连接后，点击下方的启动按钮，即可一键运行项目。

![zh-cn_image_0000002371624706](figures/zh-cn_image_0000002371624706.png)

ASCF开发助手支持热更新功能，您可以通过点击底部的“热加载：关”开关来开启热加载模式。

![zh-cn_image_0000002405184341](figures/zh-cn_image_0000002405184341.png)

开启热加载模式并运行项目后，您可以在修改代码后直接在设备上查看更新后的元服务效果。

![热加载-w800](figures/热加载.gif)

> **注意**
> 
> 热加载功能需要依赖设备开启了元服务豁免管控功能，启用本地热更新地址才可生效。可在[开发者选项](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-developer-mode#section530763213432)中开启。


### ASCF Toolkit命令行编译运行项目

使用以下命令将项目编译为兼容模式元服务包。

```shell
ascf compile path/to/ascf-project --targets crossAtomicService
```

编译完成后，若要在系统版本为HarmonyOS 5.0及以上的设备中运行查看，请使用以下命令在本地启动兼容模式元服务（请将最后的包名参数替换为正确的包名）。

```shell
hdc shell aa start -a MpEntryAbility -b com.enjoy.now.hmos --ps ascfPackageName com.atomicservice.xxx
```


## 本地调试

元服务兼容模式，调试运行方法与ASCF一致，支持以命令行方式进行调试。同时也支持在VSCode开发助手中一键开启调试。

> **说明**
> 
> 为了便于本地开发调试，本地开发调试阶段，需要在ascf/ascf_src/app.json配置 package, versionCode, versionName, icon 等字段，用于调试阶段在最近使用打开运行。


### 在ASCF开发助手中一键启动调试

在项目成功运行后，单击底部的开启调试，一键式开启web-view+V8调试。

![zh-cn_image_0000002371784578](figures/zh-cn_image_0000002371784578.png)

在右下角弹出的提示框中，点击“复制链接”按钮，打开浏览器，将链接粘贴并打开。

![zh-cn_image_0000002371624710](figures/zh-cn_image_0000002371624710.png)

![zh-cn_image_0000002405184361](figures/zh-cn_image_0000002405184361.png)


### ASCF Toolkit命令行启动调试

参考命令：

```shell
ascf debugger start
```

更多命令参考：[命令行指令选项](./run-ascf-cli.md#命令行指令选项)。


## 查看日志

ASCF开发助手支持直接查看Hilog日志。

1. 点击底部“打开日志”按钮。

   ![zh-cn_image_0000002405304233](figures/zh-cn_image_0000002405304233.png)

2. 在弹出框中选择Hilog日志打印的最低级别。

   ![zh-cn_image_0000002371784590](figures/zh-cn_image_0000002371784590.png)

   随后在输出标签页中可查看Hilog日志。

   ![zh-cn_image_0000002371624722-w800](figures/zh-cn_image_0000002371624722.png)


## 打包

ASCF开发助手支持选择调试/编译模式编译构建打包。正式发布要求使用发布模式构建。构建后文件在build/dist目录下。

> **说明**
> 
> 请确保在配置签名时已设置release证书，并在name处改为release。将编译环境切换为“发布”模式。

![zh-cn_image_0000002405184369](figures/zh-cn_image_0000002405184369.png)

通过点击底部**切换编译环境**按钮可切换模式。

![zh-cn_image_0000002405304237](figures/zh-cn_image_0000002405304237.png)

在弹出选择窗中选择编译环境。


## 发布

兼容模式元服务当前仅支持[元服务服务商（通过模板代开发）](https://developer.huawei.com/consumer/cn/doc/FASP-by-Template-develop-References/meta-service-management-0000001486892152?preview=1)，并且能力需要提交申请接入。在接入完成后，可以通过三方平台完成发布。

> **须知：**
> 
> 在正式上架发布以前，需要完成元服务备案，提交备案信息并通过审核才允许正式上架，具体请参考[元服务备案指导](https://developer.huawei.com/consumer/cn/doc/atomic-guides/atomic-service-filing)。


## 与ASCF元服务的差异说明

1. 元服务兼容模式需单独申请一个appId，所有开放能力均基于此appId接入。

2. 元服务兼容模式需单独提交上架，并单独配置域名、隐私托管等功能。

3. 元服务兼容模式目前不支持applinking，平台统一提供deeplink以供外部访问。

4. 预计元服务兼容模式将在2025/10/30后支持HarmonyOS 5.0之前的版本。


### 接口能力差异说明

| 功能点 | 标准元服务 | ASCF元服务 | 兼容模式（HarmonyOS 5.0及以上） | 兼容模式（HarmonyOS 3.1/4.0） |
| -------- | -------- | -------- | -------- | -------- |
| 静默登录 | √ | √ | √ | √ |
| 快速校验手机号 | √ | √ | √ | √ |
| 头像昵称 | √ | √ | √ | √ |
| 服务动态 | √ | √ | √ | √ |
| AppLinking | √ | √ | √ | × |
| DeepLink | × | √ | √ | √ |
| 地图、定位 | √ | √ | √ | √ |
| 华为支付cashierPicker | √ | √ | × | × |
| 通知 | √ | √ | × | × |
| 卡片 | √ | √ | × | × |
| 嵌入式 | √ | √ | × | × |
| 收货地址 | √ | √ | √ | 暂不支持 |
| 发票抬头 | √ | √ | √ | 暂不支持 |
| 深色模式 | 暂不支持 | × | × | × |
| 打开文档 | √ | √ | √ | 暂不支持 |
| 运动健康 | 暂不支持 | × | × | × |
| 广告 | 暂不支持 | × | × | × |
| 多语言 | 暂不支持 | × | × | × |
| IAP支付 | √ | √ | × | × |
| Webview登录、支付 | √ | √ | √ | 暂不支持 |
| 分享 | × | × | × | × |
| 富文本编辑器 | × | √ | √ | 暂不支持 |
