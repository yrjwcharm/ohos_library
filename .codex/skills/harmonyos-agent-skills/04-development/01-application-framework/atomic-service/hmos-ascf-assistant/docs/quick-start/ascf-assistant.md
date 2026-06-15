# 使用ASCF助手开发


为了方便使用VSCode的开发者，ASCF团队开发并维护了VSCode插件——[ASCF开发助手](https://marketplace.visualstudio.com/items?itemName=atomicservice.ascf-plugin-vscode)，提供了一键式项目创建快速转换及调试功能，帮助开发者开发元服务。


> **说明**
> 
> 在使用VSCode插件前，需要先安装DevEco Studio并配置好环境变量。


![4789ADDB-0063-4D44-9BE1-497268E29CB0-w800](figures/4789ADDB-0063-4D44-9BE1-497268E29CB0.png)


## 安装使用

在VSCode中，点击“扩展”在应用商店搜索“ASCF Assistant”并选择安装，在侧边栏出现元服务图标![zh-cn_image_0000002537000147](figures/zh-cn_image_0000002537000147.png)即安装成功。

![2331CA91-4AF4-4471-D8E6-DFF51EC353F4](figures/2331CA91-4AF4-4471-D8E6-DFF51EC353F4.png)

点击元服务图标![zh-cn_image_0000002536880171](figures/zh-cn_image_0000002536880171.png)即可使用ASCF助手开发。

> **说明：**
> 
> ASCF助手1.0.7版本新增开发者主页功能，点击元服务图标点击元服务图标![zh-cn_image_0000002537000169-w20](figures/zh-cn_image_0000002537000169.png)可打开开发者主页，方便开发者开发元服务。详细请参考[开发者主页](#开发者主页)。


## 新建/导入项目


### 新建项目

1. 点击新建项目按钮，打开新建项目页。  

   ![zh-cn_image_0000002536880189](figures/zh-cn_image_0000002536880189.png)

2. 按提示配置项目信息并创建项目。  

   ![vscode创建项目.png](figures/vscode创建项目.png)

3. 可以通过切换左侧的模板类型为行业模板，自行选择对应的行业模板进行体验开发。当前已提供教育、电商、新闻、阅读和外卖模板。
   ![行业模板.png](figures/行业模板.png)

4. 填写项目配置相关信息，点击完成。

   ![zh-cn_image_0000002505280228-w800](figures/zh-cn_image_0000002505280228.png)

   | 项目信息 | 描述 |
   | -------- | -------- |
   | App ID | 可通过在[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)上，可以通过“我的元服务”选择对应元服务，在“应用信息”可查询元服务的appid。 |
   | 项目名 | 创建的该项目的项目名。 |
   | 项目路径 | 创建的项目保存的路径，请确保选择的路径文件夹为空。 |
   | 设备类型 | 可选择元服务可运行的设备类型，当前支持运行在手机/平板上。 |

   > **说明**
   > 
   > App ID可以通过[AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)查询，但是vscode插件目前不支持元服务生成签名，需要开发者将对应App ID的签名配置到新建项目根路径下的build-profile.json5文件signingConfigs字段中。其中签名配置可以使用DevEco Studio项目自动生成或者已有的签名。
   > 
   > 例如：
   > 
   > ![4012df87d3d94fd090efdd71fbd4d82a-w800](figures/4012df87d3d94fd090efdd71fbd4d82a.gif)


### 导入ASCF项目

1. 点击打开ASCF项目按钮。  

   ![zh-cn_image_0000002505120398](figures/zh-cn_image_0000002505120398.png)

2. 通过历史记录右键点击导入ASCF项目。 

   ![zh-cn_image_0000002505120438](figures/zh-cn_image_0000002505120438.png)


## 转换小程序项目为ASCF项目

1. 打开新建的ASCF项目，删除其中的ascf/ascf_src目录。

2. 点击转换按钮，选择小程序项目(微信小程序/支付宝小程序)。

   ![zh-cn_image_0000002505280232](figures/zh-cn_image_0000002505280232.png)

   转换成功后，可通过右下角打开转换报告查看转换信息。

   ![6D5E364C-0BBB-4562-ED4D-F27AA29A6481](figures/6D5E364C-0BBB-4562-ED4D-F27AA29A6481.png)

   ![zh-cn_image_0000002505120422-w800](figures/zh-cn_image_0000002505120422.png)


## 开发指导

在开发过程中，ASCF开发助手支持以下特性，能够帮助开发者更便捷、高效地开发元服务。

- ASCF开发助手支持一键创建页面、组件。

  通过在目录文件下右键，选择一键创建页面，即可快速生成页面所需的文件。

  ![一键创建_v2-w800](figures/一键创建_v2.gif)

- 智能联想，接口补全。

  ![zh-cn_image_0000002536880205-w400](figures/zh-cn_image_0000002536880205.png)

- 代码高亮，组件属性自动补全。

  ![一键补全_v2-w800](figures/一键补全_v2.gif)

- 一键生成元服务图标。

  ![zh-cn_image_0000002505120430](figures/zh-cn_image_0000002505120430.png)

  详细请参考[元服务图标生成工具](#元服务图标生成工具)。


## 编译元服务

可以点击VSCode下方运行按钮，编译元服务。如果已连接设备，会自动在已选择设备上运行元服务。

![zh-cn_image_0000002536880173-w800](figures/zh-cn_image_0000002536880173.png)

启动构建后，会自动打开ASCF Assistant运行日志面板，可以点击旁边齿轮按钮进行日志级别查看。

![zh-cn_image_0000002536880169-w800](figures/zh-cn_image_0000002536880169.png)

> **说明**
> 
> ASCF助手1.0.8及以上版本，支持HarmonyOS 4及以下设备上投屏功能，启动运行阶段自动开启投屏显示。<br/>
> 1、Mac OSX系统暂不支持投屏。<br/>
> 2、需要关闭运行时启动投屏功能，可以在setting > Ascf-plugin: Run And Start Screen Casting配置取消勾选即可。

## 功能按钮介绍

除了编译运行按钮之外，ASCF助手还提供了常用的功能按钮。

![zh-cn_image_0000002536880179-w800](figures/zh-cn_image_0000002536880179.png)


### 选择设备

开发者可以点击“选择设备”（[功能按钮介绍](#功能按钮介绍)图中的标注①），选择已连接在电脑的设备。如果连接设备发生变化，需要重新选择。开发者可以点击“选择设备”（[功能按钮介绍](#功能按钮介绍)图中的标注①），选择已连接在电脑的设备。如果连接设备发生变化，需要重新选择。支持HarmonyOS 4及以下设备、HarmonyOS 5.0及以上设备上调试运行。在设备选择列表会展示设备名称和系统版本，选择对应的设备进行调试运行。

![zh-cn_image_0000002536880167-w800](figures/zh-cn_image_0000002536880167.png)

> **注意**
> 
> 切换连接设备后，需要在运行之前点击“选择设备”按钮切换设备。

### 切换编译环境

开发者可以点击“编译环境”（[功能按钮介绍](#功能按钮介绍)图中的标注②），切换编译环境。

支持调试/发布编译环境。

- 调试环境下使用调试编译，默认不分包，有sourceMap，支持调试。

- 发布环境下使用发布编译环境，将会对代码进行压缩混淆打包。

![zh-cn_image_0000002505280258-w800](figures/zh-cn_image_0000002505280258.png)

选择HarmonyOS 4及以下设备，元服务有以下产物：

- 选择编译环境：调试，不分包，产物为entry\build\default\outputs\default\entry-default-signed.hap；

- 选择编译环境：调试，分包，在ascf\ascf_src目录添加ascf.config.json文件并配置{ "disableSubpackages": false }，产物为ascf\build\name-default.zip；

- 选择编译环境：发布，产物为build\outputs\default\name-default-signed.app。

在HarmonyOS 4及以下系统设备上，需要[下载安装快应用加载器](../faqs/faqs-quickapp-loader-manual-installation.md)调试运行元服务，可使用adb命令在快应用加载器上运行上述产物。

通过服务器的方式：在上述产物目录下启动服务器，\${appid}替换为自己的appid，${app}替换为产物名。

```bash
http-server -p 3000
adb reverse tcp:3000 tcp:3000
adb shell am start -a android.intent.action.VIEW -d hap://app/com.atomicservice.${appid} -p com.huawei.fastapp.dev --es pkgUrl http://127.0.0.1:3000/${app}
```

通过本地推包的方式：path/to/app替换为上述产物的路径，\${appid}替换为自己的appid，${app}替换为产物名。
```bash
adb push path/to/app /data/local/tmp/
adb shell am start -a android.intent.action.VIEW -d hap://app/com.atomicservice.${appid} -p com.huawei.fastapp.dev --es pkgUrl file:///data/local/tmp/${app}
```


### 热加载开关

开发者可以点击“热加载”（[功能按钮介绍](#功能按钮介绍)图中的标注③），选择是否开启热加载编译运行。点击运行按钮，即可启动热加载编译运行。

![zh-cn_image_0000002537000145-w800](figures/zh-cn_image_0000002537000145.png)

> **注意**
> 
> HarmonyOS 4及以下设备暂不支持热加载。


### 打开日志

开发者可以点击“打开日志”（[功能按钮介绍](#功能按钮介绍)图中的标注④），开发者可通过日志级别和搜索关键词来筛选日志信息，还可以使用日志导出、折行显示、清空窗口日志等功能。设备连接电脑后可以点击![zh-cn_image_0000002536880177](figures/zh-cn_image_0000002536880177.png)启动日志功能。

![zh-cn_image_0000002536880185-w800](figures/zh-cn_image_0000002536880185.png)

设备连接电脑，启动了ASCF元服务后，可以启动HiLog日志功能，查看对应级别日志。


HiLog日志窗口各个按钮的作用为：


![zh-cn_image_0000002536880207](figures/zh-cn_image_0000002536880207.png)单击该按钮可开启日志进程。


![zh-cn_image_0000002505280242](figures/zh-cn_image_0000002505280242.png)单击该按钮可暂停日志输出。


![zh-cn_image_0000002505280262](figures/zh-cn_image_0000002505280262.png)单击该按钮可恢复日志输出。


![zh-cn_image_0000002537000167](figures/zh-cn_image_0000002537000167.png)单击该按钮可以保存日志缓存到指定文件。


![zh-cn_image_0000002505280234](figures/zh-cn_image_0000002505280234.png)单击该按钮可以日志自动换行显示，否则日志按行显示。


![zh-cn_image_0000002537000163](figures/zh-cn_image_0000002537000163.png)单击该按钮可退出日志进程。


### 按运行中的元服务包名过滤日志

HarmonyOS 5.0及以上设备默认会根据项目的bundleName查询运行中的元服务的进程，查看该进程的日志。如果没有匹配到进程，自动选择“不限制”。如果需要查看启动日志需要先根据“不限制”启动日志，然后再运行元服务。

![zh-cn_image_0000002505120416-w800](figures/zh-cn_image_0000002505120416.png)

HarmonyOS 4及以下设备默认会查询运行中的元服务的进程，查看该进程的日志。如果没有匹配到进程，自动选择“不限制”。如果需要查看启动日志需要先根据“不限制”启动日志，然后再运行兼容版元服务。

![zh-cn_image_202602101020.jpg-w800](figures/zh-cn_image_202602101020.jpg)


### 按关键字过滤日志

支持输入关键字过滤日志。

![zh-cn_image_0000002537000159-w800](figures/zh-cn_image_0000002537000159.png)


### 按日志级别过滤日志

支持下拉筛选查看不同级别的日志。

![zh-cn_image_0000002537000155-w800](figures/zh-cn_image_0000002537000155.png)


### 按domain过滤日志

支持按domain查看日志。默认为0x006F（表示开发者元服务打印的业务日志）。配置空打印所有日志。支持多个逗号分隔（如：0x006F,0x8BF2）。

![zh-cn_image_0000002505280246-w800](figures/zh-cn_image_0000002505280246.png)


### 缓存最大日志数量

默认内存缓存日志最大数量为5000。可以按需配置为更大值。

> **注意：**
> 
> - 较多日志数量可能会影响性能，请勿配置太大的值。
> 
> - 修改完之后需要重启日志进程才可生效。

![zh-cn_image_0000002505120426-w800](figures/zh-cn_image_0000002505120426.png)


### debug调试


开发者可以点击![zh-cn_image_0000002505120400](figures/zh-cn_image_0000002505120400.png)，选择是否开启调试。点击调试按钮，即可启动debug调试。


![zh-cn_image_0000002537000175-w800](figures/zh-cn_image_0000002537000175.png)


详细请参考[ASCF助手调试](debug-ascf-code.md#ascf助手调试)。


## 元服务图标生成工具

元服务图标生成工具分为两部分：IDE工具和SDK。

**IDE工具**

和DevEco Studio中[生成元服务图标](https://developer.huawei.com/consumer/cn/doc/atomic-guides/atomic-service-icon-generation)的方式类似，在ASCF助手中开发也可以直接生成元服务图标。

> **说明：**
> 
> ASCF助手1.0.5及以上版本支持使用元服务图标生成工具。

1. 在安装ASCF助手并打开ASCF项目之后，在项目中右键任意文件夹，点击“生成元服务图标”即可打开元服务图标生成工具，如下图所示。

   ![zh-cn_image_0000002537000181-w800](figures/zh-cn_image_0000002537000181.png)

2. 打开元服务图标生成工具之后，按照提示，点击选择一张图片。图片具体格式参考：[元服务图标设计规范](https://developer.huawei.com/consumer/cn/doc/design-guides/ux-guidelines-overview-0000001900384976)。

   ![zh-cn_image_0000002537000157-w800](figures/zh-cn_image_0000002537000157.png)

3. 选择外圈颜色，点击按钮即可生成元服务图标。

**SDK**

为了满足服务商使用场景，ASCF提供了SDK版本，帮助服务商集成元服务图标生成能力。

1. 在前端项目中安装SDK。  

   ```shell
   npm install @atomicservice/as-icon-generator
   ```

2. 使用SDK。  

   ```js
   import { AsIconGenerator } from '@atomicservice/as-icon-generator';
   // 注意：srcImg既可以是url也可以为image对象
   const img = new Image();
   img.src = 'src/assets/test.jpg';
   const asIconGenerator = new AsIconGenerator({ srcImg: img });
   // 获取颜色
   const colors = await asIconGenerator.getColors();
   // 注意：需要界面中展示出来所有可选的颜色，方便用户能够根据颜色来选择合适的颜色
   asIconGenerator.setColor(colors[0]);
   // 生成图片， agc: true 表示同时生成agc中使用的图标
   const result = await asIconGenerator.generate({ agc: true });
   // result.outputImage
   // result.agcImage
   ```

> **说明**
> 
> 如果选择的图片存在跨域的问题，由源图片的服务器配置支持跨域。


## 开发者主页

开发者主页在ASCF项目中的默认效果如下图所示：

![zh-cn_image_0000002537000179-w800](figures/zh-cn_image_0000002537000179.png)

当未打开ASCF项目时，点击元服务图标，如下图所示。点击图标可以新建、导入ASCF项目或者将小程序项目转换为ASCF项目。

![zh-cn_image_0000002505280224-w800](figures/zh-cn_image_0000002505280224.png)


**元服务基础信息**


元服务基础信息模块有：元服务图标、AppName、AppID、签名配置、运行时版本五个部分。


![zh-cn_image_0000002505120402-w800](figures/zh-cn_image_0000002505120402.png)


1. 元服务图标  

   开发者主页左上角图标即为当前元服务项目的图标，点击开发者主页左上角的图标，即可打开[元服务图标生成工具](#元服务图标生成工具)。点击元服务图标生成工具界面以外的地方或者点击工具界面下方的“关闭”按钮，可以关闭该工具。

   ![zh-cn_image_0000002505280264-w800](figures/zh-cn_image_0000002505280264.png)

2. 元服务名称  

   AppName即为当前元服务项目的名称，点击“编辑名称”按钮，在弹出的对话框中可以修改元服务名称，之后点击保存即可修改元服务名称。

   ![zh-cn_image_0000002505120428-w800](figures/zh-cn_image_0000002505120428.png)

3. AppID  

   当前元服务项目的AppID。

4. 元服务签名配置  

   显示当前元服务项目是否配置debug或者release签名。

   > **说明**
   > 
   > 根据元服务项目根路径下的build-profile.json5的signingConfigs字段来显示签名是否配置，不支持开发者自定义的targets签名配置。

   点击“参考”，即可打开签名配置参考文档。点击“配置”，会打开build-profile.json5文件，开发者修改signingConfigs字段保存之后，开发者主页会自动刷新签名配置状态。

   ![zh-cn_image_0000002536880175-w800](figures/zh-cn_image_0000002536880175.png)

5. 运行时版本  

   显示当前项目运行时版本。


**快捷操作**


1. 权限配置  

   点击“权限配置”，即可打开权限配置窗口。

   > **说明**
   > 
   > 修改、申请权限弹窗中的申请原因和调用时机都不是必填项，具体使用参考：[声明权限-申请应用权限-应用权限管控-程序访问控制-安全-系统 - 华为HarmonyOS开发者](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/declare-permissions)

   ![zh-cn_image_0000002537000165-w800](figures/zh-cn_image_0000002537000165.png)

   勾选下方“未获取权限”列表中的权限，然后点击“申请权限”按钮，在弹出的界面中输入申请原因和调用时机，点击“保存”按钮后即可添加权限申请配置。

   ![zh-cn_image_0000002505280230-w800](figures/zh-cn_image_0000002505280230.png)

   勾选上方“已获取权限”列表中的权限，然后点击“修改权限”按钮，在弹出的界面中修改申请原因和调用时机，点击“保存”按钮后即可修改权限申请配置。

   ![zh-cn_image_0000002505120414-w800](figures/zh-cn_image_0000002505120414.png)

   在勾选权限之后，点击“删除权限”，可以删除不要的权限配置信息

   ![zh-cn_image_0000002536880191-w800](figures/zh-cn_image_0000002536880191.png)

2. 分析包大小 
 
   > **说明**
   > 
   > 使用分析包大小功能之前，请确保项目是可以正常编译的。

   点击“分析包大小”按钮，即可开始对当前项目的包进行多种维度的分析。

   ![zh-cn_image_0000002505280266-w800](figures/zh-cn_image_0000002505280266.png)

   点击“关闭服务”，即可关闭包大小分析。

   ![zh-cn_image_0000002505280248-w800](figures/zh-cn_image_0000002505280248.png)


**基础配置**


1. 元服务域名管理  

   点击“编辑域名”按钮，会在浏览器跳转打开华为开发者官网[配置服务器域名](https://developer.huawei.com/consumer/cn/doc/atomic-guides/agc-help-harmonyos-server-domain)指南页面，方便查看配置指南文档。

2. 开发能力  

   点击“前往配置”按钮，会在浏览器跳转打开华为开发者官网[为HarmonyOS应用开启华为开放能力](https://developer.huawei.com/consumer/cn/doc/app/agc-help-create-app-0000002247955506#section1817619495251)指南页面，方便查看配置指南文档。


**资源中心**


点击“开发者文档”、“接口文档”、“服务商文档”、“鸿蒙小助手”、“元服务社区”这几个按钮，将在浏览器打开华为开发者官网相应的指导文档，方便查看相应的指导文档。


## VSCode顶部搜索框命令

如图所示，可以执行ASCF相关的命令。

![zh-cn_image_0000002537000187-w800](figures/zh-cn_image_0000002537000187.png)


### 插件内置命令

| ID | 标题 | 描述 |
| -------- | -------- | -------- |
| ascf-plugin.addProject | Create ASCF Project | 创建ASCF项目 |
| ascf-plugin.ascfBuild | Build ASCF | 构建ASCF |
| ascf-plugin.ascfBuild.clean | Clean | 清除 |
| ascf-plugin.ascfBuild.install | Install dependencies | 安装依赖 |
| ascf-plugin.ascfBuild.stop | Stop build ASCF | 停止构建 |
| ascf-plugin.ascfBuild.sync | Sync | 同步 |
| ascf-plugin.ascfBuildAndDebug | Build and debug ASCF | 构建并调试ASCF |
| ascf-plugin.ascfBuildAndDebug.stop | Stop build ASCF | 停止构建 |
| ascf-plugin.ascfBuildApp | Build ASCF App | 构建ASCF App |
| ascf-plugin.ascfDebugger.start | Start Debugger | 启动调试 |
| ascf-plugin.ascfDebugger.stop | Stop Debugger | 关闭调试 |
| ascf-plugin.chooseDevice | Choose device | 选择设备 |
| ascf-plugin.createAscfComponent | New ASCF Component | 创建ASCF组件 |
| ascf-plugin.createAscfPage | New ASCF Page | 创建ASCF页面 |
| ascf-plugin.createServiceWidget | New ASCF Service Widget | 创建ASCF服务卡片 |
| ascf-plugin.deleteRecentProject | Remove recent ASCF project | 移除最近的ASCF项目 |
| ascf-plugin.hilog | Hilog | Hilog |
| ascf-plugin.hilog.stop | Stop Hilog | 停止Hilog |
| ascf-plugin.importProject | Import miniprogram | 转换小程序资源 |
| ascf-plugin.initTypings | Init typings | 初始化typings |
| ascf-plugin.openProject | Open ASCF project | 导入ASCF项目 |
| ascf-plugin.openSelectProject | Open ASCF project | 导入ASCF项目 |
| ascf-plugin.showConvertReport | Show convert report | 显示转换报告 |
| ascf-plugin.startAbility | Start ability | 启动 |
| ascf-plugin.startScreenCast| Start ScreenCast | 启动投屏 |


## 插件配置

ASCF助手插件支持设置运行配置，可通过VSCode左下角齿轮按钮![zh-cn_image_0000002537000185](figures/zh-cn_image_0000002537000185.png)打开“管理”菜单 -&gt; 选择“设置” -&gt; 在搜索设置中输入ascf-plugin，可设置ASCF助手插件的行为。

| ID | 描述 | 默认值 |
| -------- | -------- | -------- |
| ascf-plugin.devecoSdkHome | DEVECO SDK位置 | “” |
| ascf-plugin.forceNewWindow | 以新窗口打开新建项目 | false |
| ascf-plugin.hilogDomains | Hilog关键字 | "0x006F" |

如何配置插件请参考：

![787ee3426c094d6e87e3bbab97f8abc4-w800](figures/787ee3426c094d6e87e3bbab97f8abc4.gif)
