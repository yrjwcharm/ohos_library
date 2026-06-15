# 使用鸿蒙电脑版DevEco Studio ASCF助手开发

ASCF开发助手推出了适配鸿蒙电脑版DevEco Studio的版本，旨在为元服务（HarmonyOS元服务）开发者提供高效、便捷的一站式开发体验。该助手集成了项目创建、代码转换、热更新，调试等核心功能。

## 环境要求

为保证功能正常运行，PC系统及ASCF版本要求如下：

- 鸿蒙PC系统版本：HarmonyOS 6及以上。
- ASCF Toolkit：1.0.16及以上。
- ASCF助手：1.0.9及以上。

## 安装使用

1. 下载鸿蒙电脑版DevEco Studio版本[ASCF助手](https://h5hosting-drcn.dbankcdn.cn/cch5/wallet/ascf-cn/ascf-plugin-bitfun/ascf-plugin-bitfun.bfx)。

2. 点击左侧面板中的插件面板，点击“+”号选择插件，选择下载的ASCF助手进行添加。

3. 在侧边栏出现元服务图标![w40](./figures/ascf-icon.png)即安装成功。

   ![w300](./figures/harmony-install.png)

   ![](./figures/harmony-select.png)

## 新建/导入项目

### 新建项目

1. 点击新建项目按钮，打开新建项目页。

   ![w300](./figures/harmony-create.png)

2. 按提示配置项目信息并创建项目。

   参考[ASCF助手配置项目信息](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/ascf-assistant#%E6%96%B0%E5%BB%BA%E9%A1%B9%E7%9B%AE)。

3. 签名。

   构建元服务需要先配置好签名，可以使用自动签名或手动方式完成签名，详情请参见[服务签名](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-signing)。

   ![](./figures/harmony-sign1.png)

   ![](./figures/harmony-sign2.png)

### 导入ASCF项目

参考[导入ASCF项目](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/ascf-assistant#%E5%AF%BC%E5%85%A5ascf%E9%A1%B9%E7%9B%AE)。


## 转换小程序项目为ASCF项目

1. 打开新建的ASCF项目，删除其中的ascf/ascf_src目录。

2. 点击转换按钮，选择小程序项目。

   ![w300](./figures/harmony-convert1.png)

   ![](./figures/harmony-convert2.png)


## 开发指导

在开发过程中，ASCF开发助手支持以下特性，能够帮助开发者更便捷、高效地开发元服务。

- ASCF开发助手支持一键创建页面、组件。

  通过在目录文件下右键，选择一键创建页面，即可快速生成页面所需的文件。

- 一键生成元服务图标。

  详细请参考[元服务图标生成工具](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/ascf-assistant#%E5%85%83%E6%9C%8D%E5%8A%A1%E5%9B%BE%E6%A0%87%E7%94%9F%E6%88%90%E5%B7%A5%E5%85%B7)。

## 编译元服务

### 预览器

鸿蒙电脑版DevEco Studio支持在PC上运行元服务，无需额外的设备链接。需要先在系统设置中打开无线调试，然后重启ide。

![w300](./figures/harmony-wireless.png)

![](./figures/harmony-devices.png)

可以点击鸿蒙电脑版DevEco Studio下方运行按钮，编译元服务。

![](./figures/harmony-start.png)

## 功能按钮介绍

同[功能按钮介绍](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/ascf-assistant#%E5%8A%9F%E8%83%BD%E6%8C%89%E9%92%AE%E4%BB%8B%E7%BB%8D)。

## 元服务图标生成工具

同[元服务图标生成工具](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/ascf-assistant#%E5%85%83%E6%9C%8D%E5%8A%A1%E5%9B%BE%E6%A0%87%E7%94%9F%E6%88%90%E5%B7%A5%E5%85%B7)。


## 开发者主页

同[开发者主页](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/ascf-assistant#%E5%BC%80%E5%8F%91%E8%80%85%E4%B8%BB%E9%A1%B5)。

## 鸿蒙电脑版DevEco Studio顶部搜索框命令

按下快捷鍵Ctrl + Shift + A如图所示，可以执行ASCF相关的命令。

![](./figures/harmony-command.png)

### 插件内置命令

同[ASCF插件内置命令](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/ascf-assistant#%E6%8F%92%E4%BB%B6%E5%86%85%E7%BD%AE%E5%91%BD%E4%BB%A4)。

## 插件配置

可通过点击左上角图标![w40](./figures/ide-icon.png)选择“设置” -> 在搜索设置中输入ascf，可设置ASCF助手插件的行为。插件配置同[ASCF插件配置](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/ascf-assistant#%E6%8F%92%E4%BB%B6%E9%85%8D%E7%BD%AE)。

![](./figures/harmony-setting.jpeg)

## 功能限制说明

在鸿蒙电脑版 DevEco Studio上，存在以下限制：

- 暂不支持视图层调试（webview调试）。

- 暂不支持swc编译。

- 暂不支持全局安装ASCF命令行。

- 暂不支持中英文切换。

- 暂不支持ASCF接口、组件语法提示和代码补全。

- 暂不支持缓存。