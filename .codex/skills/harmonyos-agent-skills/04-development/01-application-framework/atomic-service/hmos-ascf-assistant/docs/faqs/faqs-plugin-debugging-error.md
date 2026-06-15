# 在DevEco Studio调试运行ASCF元服务的时候报错

**问题现象**

在DevEco Studio调试运行ASCF元服务不成功，报错如下：

Install Failed: error: failed to install bundle.

code:95683052

error: Failed to install the HAP or HSP because the dependent module does not exist.

**可能原因**

1. 插件版本不是最新的，且手机上未安装ASCF引擎，那么ASCF的HSP将不会自动安装。

   要检查手机上的引擎是否已正确安装，可使用命令“hdc shell bm dump-shared -n com.huawei.hms.ascfruntime”。

2. 插件在运行ASCF元服务前，自动安装ASCF引擎的HSP失败。

**解决措施**

1. 请确认DevEco Studio中安装的插件已更新至最新版本，若非最新版本，请依据“[获取ASCF插件](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/ascf-plugin)”章节的指引，完成最新版插件的安装。
2. 可于负一屏或应用市场搜索“元服务ASCF示例”，随后直接运行以自动安装ASCF引擎。
3. 使用命令“hdc shell bm dump-shared -n com.huawei.hms.ascfruntime”来核查手机上是否已正确安装引擎。
