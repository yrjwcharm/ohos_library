从HBuilderX 4.34版本开始，uni-app支持**HarmonyOS元服务**平台应用开发。支持vue2，vue3版本。同时也支持cli和HBuilderX运行。

详情请参考uniapp官方文档：[概述 | uni-app官网](https://uniapp.dcloud.net.cn/tutorial/mp-harmony/intro.html)。

## 1. 环境搭建和准备

- 安装[DevEco Studio](https://developer.huawei.com/consumer/cn/download/)。
    
- 安装[HBuilderX](https://www.dcloud.io/hbuilderx.html)工具。
    
- [AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)（简称AGC）创建一个元服务项目，获取到AppId。
    
- 元服务上架需要提前做好备案，强烈建议注册元服务时候立刻开始备案流程，避免临上架才开始备案，耽误上架时间。参考[元服务备案-HarmonyOS元服务 - 华为HarmonyOS开发者](https://developer.huawei.com/consumer/cn/doc/atomic-guides/atomic-service-filing)。
    
- 如果你的元服务需要使用登录、支付权限，也立即开始着手准备申请相关权限，参考 [华为支付服务开发准备](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/payment-preparations?ha_source=Dcloud&ha_sourceId=89000448)。
    

## 2. HBuilderX开发ASCF元服务

### 2.1. 创建uniapp项目

![](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtybbs/908/161/966/0010086000908161966.20260107114835.01316971105465747704170380649549:50001231000000:2800:FFBDCEC22F0F7755209F8ADF1A72975ABDC9AAD31719C8C770C1FBF3BBEE0826.png)

### 2.2. 在uniapp的manifest.json配置元服务包名

项目运行需要配置元服务包名，打开项目根目录的mainefest.json填写HarmonyOS元服务 - 应用包名，结构类似com.atomicservice.[你的AppID]。

### 2.3. 配置**harmony-mp-configs**

HBuilderX工程文件重点关注harmony-mp-configs 这个文件夹，内部的文件在编译时候会自动同步到最终HarmonyOS工程中，如果没有需要新建对应文件。

1）创建签名后，将签名信息拷贝到harmony-mp-configs/build-profile.json5 的signingConfigs 中。

2）在harmony-mp-configs/entry/src/main/module.json5，可以设置权限、metadata、隐私协议托管等功能，完整配置文档可以参考[module.json5 配置文件。](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/module-configuration-file?ha_source=Dcloud&ha_sourceId=89000448)比如添加对应的权限，具体的HarmonyOS元服务权限列表可以参考[HarmonyOS对所有应用开放的权限清单](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/permissions-for-all-V5?ha_source=Dcloud&ha_sourceId=89000448)。

### 2.4 参考[**文档**](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/ascf-development-guide)适配修改不支持的接口

条件编译为：MP-HARMONY，具体参考[条件编译文档](https://uniapp.dcloud.net.cn/tutorial/platform.html)。

```js
// # ifdef WEB
console.log('这段代码只在WEB运行');
// # endif

// # ifdef MP-HARMONY
console.log('这段代码只在元服务ASCF框架上运行');
// # endif
```

### 2.5. 本地启动调试运行

![](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtybbs/908/161/966/0010086000908161966.20260107115058.25117069368505389080588442163925:50001231000000:2800:C48DBDC5368BE630F3C09BE0F2AD7657735B5BA477B093EFE9B41D464F5A90C3.png)

如果遇到需要debug或者白屏问题可以下面方案 [进行调试](https://uniapp.dcloud.net.cn/tutorial/mp-harmony/intro.html#how-to-debug)。

构建HarmonyOS工程的过程中可能需要访问npm公共仓库，如果遇到网络问题可以通过设置环境变量 NPM_CONFIG_REGISTRY 来指向特定的npm公共仓库。

### 2.6. 运行效果

![](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtybbs/908/161/966/0010086000908161966.20260107115152.59648350667463204656939813352629:50001231000000:2800:464AFC1E5A0229D64FBC1CF63092664B03981FA37E4D431014E0789CEB8EBD44.png)

### 2.7. 发布元服务

在HBuilderX中选择发行 - HarmonyOS元服务，进行元服务打包。打包成功后可以看到发布包，提交上架。

注意：提交发布之前请确保符合元服务上架审核规范要求，可以参考下面上架审核常见问题做检查，均满足要求后再提交。

## 3. 使用uniapp命令行方式开发ASCF元服务

### 3.1. 使用CLI创建元服务

#### 1）Vue3 CLI开发元服务

- 全新项目可使用npx degit dcloudio/uni-preset-vue#vite-alpha my-vue3-project创建项目。
    
- 在现有的cli项目中使用npx @dcloudio/uvm@latest alpha可以升级最新alpha依赖，修改package.json的scripts，添加：
    

```json
{
  "dev:mp-harmony": "uni -p mp-harmony",
  "build:mp-harmony": "uni build -p mp-harmony"
}
```

#### 2）通过Vue2 CLI开发元服务

```sh
yarn add @dcloudio/uni-mp-harmony@2.0.2-alpha-4050720250316001
yarn add @dcloudio/webpack-uni-pages-loader@2.0.2-alpha-4050720250316001 -D
```

修改package.json的scripts，添加：

```json
{
  "dev:mp-harmony": "cross-env NODE_ENV=development UNI_PLATFORM=mp-harmony vue-cli-service uni-build --watch",
  "build:mp-harmony": "cross-env NODE_ENV=production UNI_PLATFORM=mp-harmony vue-cli-service uni-build"
}
```

### 3.2. cli工程中打包运行

1）在uniapp的项目根目录，使用[ASCF插件](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/ascf-development-process)创建一个ascf-project的ASCF元服务项目，配置好签名信息。

![](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtybbs/908/161/966/0010086000908161966.20260107115312.67145354703102895217363172515502:50001231000000:2800:A682814B250C4E95860146C45742D2666CBFDBFAF0DA8910CF72D3872A09FE13.png)

2）新增编译构建脚本，实现自动编译构建运行。

```json
    "dev:mp-harmony": "set UNI_OUTPUT_DIR=ascf-project/ascf/ascf_src&&uni -p mp-harmony",
    "watch:ascf": "cd ./ascf-project && ascf compile . --serve --logging debug",
    "dev:ascf": "cd ./ascf-project && ascf compile . -c -m --logging debug",
    "run:ascf": "cd ./ascf-project && ascf build assembleAndInstallHap -r . --logging debug",
    "build:ascf": "cd ./ascf-project && ascf compile . -c",
```

3）使用pnpm run:ascf启动运行。参考HarmonyOS元服务ASCF项目[开发流程](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/ascf-development-process) 调试运行ascf-project项目。如果运行有异常，可以参考[调试指南](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/debug-ascf-code)解决。

![](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtybbs/908/161/966/0010086000908161966.20260107115336.22273300968718266018855991726032:50001231000000:2800:2285BDEC80C94FE5FAE4C10215FB142BE607589C3ABDB7A1972FF867797C9445.png)

## 4. 常见功能开发说明

### 4.1. 获取client_id

访问[AGC 后台](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html#/myProject?ha_source=Dcloud&ha_sourceId=89000448)，选择你的项目，在**项目设置 - 常规**页面中搜索Client ID，匹配到的结果是下面需要到client_id，这个参数会关联当前应用的相关权限，比如位置服务等。

### 4.2. 配置签名

初次运行元服务，需要配置好证书签名，参考[元服务开发准备-元服务开发指导-HarmonyOS元服务 - 华为HarmonyOS开发者](https://developer.huawei.com/consumer/cn/doc/atomic-guides/atomic-dev-preparation#section42841246144813) 。

开发调试期间的证书不可用于应用上架。元服务发布证书的申请流程和HarmonyOS应用开发类似，访问[HarmonyOS发布元服务文档](https://developer.huawei.com/consumer/cn/doc/app/agc-help-harmonyos-releaseservice-0000001946273965?ha_source=Dcloud&ha_sourceId=89000448)进行发布证书的获取。

修改build-profile.json5里的release证书签名。务必注意调试和发行证书是两套，不能混用。

签名文件总共需要四个配置文件（p12/csr/cer/p7b），和两个配置选项（alias/password）。

- p12/csr是本地生成的配置文件，这两个文件和HarmonyOS应用、HarmonyOS元服务无关，可兼容使用。
    
- cer文件区分调试证书、发行证书，这个文件和和HarmonyOS应用、HarmonyOS元服务无关，可兼容使用。
    
- p7b文件和具体应用、绑定设备、ACL权限有关，新增的设备必须重新下载。
    

访问[AGC 后台](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html?ha_source=Dcloud&ha_sourceId=89000448)的证书/APPID/Profile 页面中可以下载。

### 4.3. 修改元服务默认标题、图标、启动图等信息

在项目harmony-mp-configs/entry/src/main/resources/目录、修改zh-CN/element/string.json 和 base/element/string.json 中字段：

- EntryAbility_desc应用描述。
    
- EntryAbility_label应用标题。
    

应用图标，为使用[生成元服务图标](https://developer.huawei.com/consumer/cn/doc/atomic-guides-V5/atomic-service-icon-generation-V5?ha_source=Dcloud&ha_sourceId=89000448)生成的512x512图标，需要放置在 harmony-mp-configs/AppScope/resources/base/media/app_icon.png 路径内，否则会上架审核不通过）。

### 4.4. 绑定华为账号体现，实现静默登录功能满足上架要求

参考[HarmonyOS Account Kit 开发准备](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/account-config-permissions-V5#section132012717318?ha_source=Dcloud&ha_sourceId=89000448)设置相关权限，添加scope权限。

**易错点：**

- 签名证书不能是自动签名，设置的是agc上下载的调试证书。
    
- harmony-mp-configs/entry/src/main/modueljson5里有个metadata client_id 确保值正确。
    
- 访问[AGC开发与服务](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html#/myProject?ha_source=Dcloud&ha_sourceId=89000448)-我的项目，选择对应的项目和应用，打开常规-应用，配置指纹，确保添加了调试证书。
    

通过uni.login可以得到code，流程和其他小程序登录流程相似。参考[解析凭证](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/account-api-get-token-info-V5?ha_source=Dcloud&ha_sourceId=89000448)得到用户的UnionID，开发者在这一步骤自行判断是已绑定华为UnionID，如果未绑定，引导用户绑定现有账号体系。如果你没有code返回值，观察接口错误提示，一般是client_id设置错误。

#### **获取用户手机号**

申请过手机号敏感权限之后，可以通过button。

获取用户手机号。使用这种方式快速注册、绑定账号体系。

- 获取手机号权限。访问[开发者后台- API 服务 - 授权管理 - 敏感权限](https://developer.huawei.com/consumer/cn/console/api/scopeManage?ha_source=Dcloud&ha_sourceId=89000448)申请获取您的手机号权限。等待审核通过后继续下面操作。
    
- 页面中使用下面按钮获取手机号授权code。
    
- 参考[获取用户级凭证](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/account-api-obtain-user-token-V5?ha_source=Dcloud&ha_sourceId=89000448)通过上一步骤的 code 获取access_token。
    
- 参考[其他场景获取用户信息](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/account-api-otherscene-getuserinfo-V5?ha_source=Dcloud&ha_sourceId=89000448)接口通过access_token获取用户手机号。
    

如果手机号申请失败，一般是没有严格按照手机号申请的要求完整填写，确保包含三个部分，应用的分类、场景的具体操作步骤、请求频率。尤其是第二部分，参考描述详细步骤。

```xml
<button open-type="getPhoneNumber" @getphonenumber="getphonenumber">
  获取手机号
</button>
```

```js
getphonenumber(e){
  // 获取 code 数值：e.detai.code
  console.log(e.detail.code);
}
```

如果有返回值，说明配置项正确。可以让服务端解析数据。如果点击无反应，在HBuilderX 中打开展示原生日志，观察是否有类似Failed to check the fringerprint的告警，排查错误方案如下：

- 签名证书不能是自动签名，设置的是agc上下载的调试证书。
    
- 确保你联调的元服务已经申请得到了获取手机号权限，如果你在开发多个元服务可能会错误配置。
    
- 访问[AGC开发与服务](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html#/myProject?ha_source=Dcloud&ha_sourceId=89000448)-我的项目，选择对应的项目和应用，打开常规 -应用，配置指纹，确保添加了调试证书。
    
- mp-configs/entry/src/main/modueljson5里有个metadata client_id确保值正确，是应用的 ClientID，不是项目的 ClinetID。
    
- 如果修改过配置参数没有立刻生效，真机打开设置 - 应用与元服务，找到正在开发的应用选择移除，重新运行。
    

用户侧第一次使用会有系统控件弹窗申请，同意之后，后续会自动同意。如果撤回同意，或者测试控件效果，需要手机打开 设置-华为账号-账号安全-使用华为账号的应用-删除授权。

用户侧控件效果如下，默认展示手机系统登录的账号，也可以通过管理手机号，手动验证其他手机号。

### 4.5. 元服务如何开发服务卡片Widget

参考uniapp提供指导：[概述 | uni-app官网](https://uniapp.dcloud.net.cn/tutorial/mp-harmony/intro.html&E5%85%83%E6%9C%8D%E5%8A%A1%E5%A6%82%E4%BD%95%E5%BC%80%E5%8F%91%E6%9C%8D%E5%8A%A1%E5%8D%A1%E7%89%87-widget)。

### 4.6. 使用分包异步化能力

[分包异步化](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/asynchronous-subcontracting)能力默认是支持的。开发者使用不生效一般是下面错误原因：

- pages.json配置错误。
    
- 主包、分包引用时候没有设置componentPlaceholder属性。
    
- 配置componentPlaceholder名称和实际引用的组件名称不一致。
    

## 5. 常见问题

### 5.1. 元服务运行遇到白屏如何调试

元服务启动白屏原因可能有以下常见原因：

- DevEco 相关配置没有配置成功。自查方案：可尝试运行 HBuilderX 内置的空白模板可正常运行，规避环境配置问题
    
- 页面中使用了元服务尚未支持的api、使用了plus api导致页面启动报错。可观察**控制台是否有相关错误提示**。也可尝试缩小问题范围，注释页面相关逻辑，锁定出问题的页面、组件、逻辑。
    
- 请根据**运行日志**查看具体错误信息，修改后重新运行；具体日志查看方法请参考下一条说明。
    
- 如果页面已经运行起来了，可以通过[调试定位](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/debug-ascf-code)具体问题，通过使用 ascf debugger start 启动调试工具，断点调试解决问题；
    

### 5.2. 元服务的日志如何查看、分析

- 在DevEco在底部找到Log面板，筛选你正在开发的应用，过滤Warn级别，观察此时log是否有告警、错误爆红。或者hdc shell hilog --domain 0x006F,0x8BF2命令行查看日志。
    
- 用户侧打印的log建议临时通过固定前缀，在Info级别进行过滤，或者临时使用console.warn进行数据打印。
    

如果报错中包含xxx is not defined，可能是对应的api在元服务中还未实现，比如获取胶囊位置、获取激励视频等。此类问题需要使用条件编译进行规避。

如果报错中包含vendor.js中有报错，可能是三方组件库不兼容元服务，可以参考debug文档进行错误定位。

### 5.3. 常见编译构建问题

#### 1）发布报错**hvigor ERROR: Invalid storeFile value. Make sure it is not null or empty. The file must be included**.

如果发生在应用运行、发行阶段。可能是构建时候证书缺少或者配置不对。参考 [HarmonyOS发布元服务](https://developer.huawei.com/consumer/cn/doc/app/agc-help-harmonyos-releaseservice-0000001946273965?ha_source=Dcloud&ha_sourceId=89000448) 进行证书申请。

#### 2）发行报错**hvigor ERROR: Unable to find the product 'release'.**

如果是发生应用发行阶段，可能是未填写完整的发布证书，需要调整build-profile.json5。

#### 3）运行报错**failed to install bundle. code:9568296 error: install failed due to error bundle type**.

模拟器或者真机上已经安装了当前BundleName的应用。可能是证书复用导致的错误，重新确认当前证书是元服务证书，而不是Harmony OS App的证书。

#### 4）运行报错**hvigor ERROR: SDK component missing. Please verify the integrity of your SDK.**

你可能声明了不兼容的字段，需要在harmony-mp-configs/build-profile.json5里面去掉app.products.*.compileSdkVersion 属性。

#### 5）运行报错 **Failed to install the HAP or HSP because the dependent module does not exist.**

错误原因：表明当前环境缺少元服务运行所必须的基础依赖，通常出现在初次运行的错误提示。

解决方案：应用市场搜索 "**helloUniapp**"，随后直接运行以自动安装 ASCF 引擎。

如果无法定位到具体问题，可以在HBuilderX的安装根目录，创建.HX_LAUNCHER_DEBUG空文件后，重启运行。在HBuilderX菜单"帮助"》"查看运行日志"，查看具体错误信息。

如果还是无法定位到具体原因，可以将HBuilderX 的编译产物unpackage/dist/dev/.mp-harmony 内容放置到DevEco工程中ASCF项目的ascf_src目录下，使用ASCF工具链直接启动运行看具体错误信息。如果错误信息还是无法定位到问题，可以开启 hvigor/hvigor-config.json5中logging为debug后看日志。

### 5.4. 常见调试运行问题

#### 1）发送网络请求报错

需要在配置网络访问白名单：

- 临时方案。进入手机 - 设置 - 系统 - 开发者选项（如果未开启 关于手机 - 软件版本连续点击开启） - 开发中元服务豁免管控，选择开启后，可以自由调试。
    
- 稳定方案。整理web-view需要用到的相关域名，进入[华为 AppGallery Connect 后台](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html#/?ha_source=Dcloud&ha_sourceId=89000448) - 我的项目 - 开发管理 - 域名设置 - 服务器域名 - httpRequest 合法域名。按照提示进行填写。填写完成后打开 手机设置 - 应用与元服务，删掉正在开发的元服务，重新启动应用。
    

#### 2）组件web-view渲染空白，不能展示网页

同上，发送网络请求报错的解决方案。

#### 3）组件打开map地图无法展示、API位置相关使用报错

Map和相关定位需要 [华为 AppGallery Connect 后台](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html#/?ha_source=Dcloud&ha_sourceId=89000448) 进行权限申请。具体可以参考 [HarmonyOS Map Kit 开发准备](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/map-config-agc-V5?ha_source=Dcloud&ha_sourceId=89000448)，在 项目设置 - API 管理开启定位服务、位置服务、地图服务。

在harmony-mp-configs/entry/src/main/module.json5 在 requestPermissions字段里添加ohos.permission.LOCATION 和 ohos.permission.APPROXIMATELY_LOCATION 两条记录。

元服务不允许未经用户同意发起定位。在请求位置之前需要获取用户授权。伪代码如下：

```js
uni.authorize({
  scope: 'scope.userLocation',
  success: () => {
    uni.getLocation({});
  },
  fail: () => {
    uni.showToast({
      title: '未授权获取地理位置权限',
    });
  },
});
```

### 5.5. 常见提交审核常见报错

#### 1）请检查华为后台隐私政策中"设备权限调用"是否填写完整

检查代码中module.json5中的 requestPermissions和AGC。后台的隐私协议权限第二条设备权限调用要严格一致。

**注意：**

- 位置权限中，精准ohos.permission.LOCATION+模糊定位ohos.permission.APPROXIMATELY_LOCATION务必成对出现。
    
- 不要勾选ohos.permission.WRITE_IMAGEVIDEO和ohos.permission.READ_IMAGEVIDEO读取和写入，这是敏感权限，一般情况下使用 uni.chooseMedia 和 uni.saveFile 就可以
    
- 不要勾选剪切板ohos.permission.READ_PASTEBOARD权限，这是敏感权限需要华为申请下来才能使用，一般场景无法申请，设置剪切板功能uni.setClipboardData可正常使用。
    

#### 2）sumit version for review failed, additional msg is xxx

- xxx 为[[5]]，报错一般是代码中deviceType和uniapp后台里选择的不一致。元服务建议值勾选Phone手机。保持一致即可。
    
- xxx为AppGalleryConnectAppMetaInfoService version's privacyAgreementId is empty。这个一般是一些协议没有选择，错误通过了校验审核
    

#### 3）[amis]submit version for review faied, additional msg is [appAdapters devices can not own entry main packages]

- 代码内应用适配平台和HarmonyOS后台勾选的设备不匹配，也就是代码中设备清单和线上资料不一样。
    
- 代码工程中，需要在harmony-mp-configs/entry/src/main/module.json5中搜索deviceTypes，通常只设置phone值，表示兼容手机。
    
- 在AGC后台或者uni-app提审后台，也有适配设备选项，确保和代码中保持一致，通常勾选手机Phone值，表示兼容手机。
    

### 5.6. 常见上架驳回错误原因

- 元服务图标（最近任务列表图标）未使用平台提供的元服务图标生成工具生成，图标使用不规范。处理方案：参考[如何修改元服务默认标题、图标、启动图等信息？](https://uniapp.dcloud.net.cn/tutorial/mp-harmony/intro.html#how-to-change-icon)
    
- 您的元服务提交的图标为系统图标（安装后/最近任务列表）。修改建议：元服务图标不得为系统图标。处理方案：参考[如何修改元服务默认标题、图标、启动图等信息？](https://uniapp.dcloud.net.cn/tutorial/mp-harmony/intro.html#how-to-change-icon)
    
- 元服务存在自定构造的登录页面，不符合华为应用市场审核标准。处理方案：参考[API登录uni.login获取code报错、如何绑定现有用户体系？](https://uniapp.dcloud.net.cn/tutorial/mp-harmony/intro.html#how-to-design-user-login)
    
- 您提交的元服务（名称/图标与最近任务列表的元服务名称/元服务图标不一致）处理方案：参考[如何修改元服务默认标题、图标、启动图等信息？](https://uniapp.dcloud.net.cn/tutorial/mp-harmony/intro.html#how-to-change-icon)
    
- 您元服务内的隐私政策/在AppGallery Connect上提交的隐私政策网址内元服务名称与开发者提交的元服务名称信息不一致。处理方案：隐私协议是在华为后台自己填写表格构建的，观察表格里顶部的名称是否和appid对应的名称是否一致。
    
- 您元服务内用户协议展示的元服务名称与在AppGallery Connect上提交的元服务名称不一致。处理方案：用户协议网址一般是在华为后台自己添加的，观察填写的URL内容和当前的元服务名称是否一样，元服务名称华为后台appid对应的名称一致。
    
- 隐私政策、用户协议未体现HarmonyOS平台，处理方案，检查在Android iOS相关描述旁，应该有HarmonyOS，常见的问题是把安卓平台的隐私协议直接上传了，没有增加HarmonyOS字样，没有针对HarmonyOS平台做适配导致驳回。
    

### 5.7. 上架驳回理由：存在自行构造的登录页面，不符合华为应用市场审核标准

元服务的登录要求可以参考阅读 《[使用华为账号登录 静默登录](https://developer.huawei.com/consumer/cn/doc/design-guides/accounts-0000001967444380?ha_source=Dcloud&ha_sourceId=89000448)》、《[开发者可以使用自行设计的登录界面吗？](https://developer.huawei.com/consumer/cn/doc/atomic-faqs-V5/faqs-common-account-5-V5?ha_source=Dcloud&ha_sourceId=89000448)》。

如果需要账号登录，必须使用uni.login登录，不得绕过自行使用账号密码登录。建议申请获取用户手机号权限，然后关联自己的账号系统。在应用在应用合适的时机调用登录接口换取UnionID，先标识用户为华为用户，操作关键步骤时候接入现有账号，比如获取手机号关联现有账号。同时务必提供注销用户功能入口，用户自行取消注册，否则会被驳回。

实践中，某些分类下的应用无法申请一键获取手机号，申请会被驳回，这种情况下，建议在业务中完成静默登录，然后在某些操作时候关联其他平台用户，此时通过手机号和验证码完成相关关联平台账号逻辑。请参考上面常见功能开发说明第5点。

## 6. 参考资料

1、[ASCF框架概述-ASCF框架 - 华为HarmonyOS开发者](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/ascf-overview)

2、[概述 | uni-app官网](https://uniapp.dcloud.net.cn/tutorial/mp-harmony/intro.html)
