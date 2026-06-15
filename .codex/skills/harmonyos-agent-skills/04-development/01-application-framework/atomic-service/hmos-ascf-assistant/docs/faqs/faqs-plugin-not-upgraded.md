# ASCF引擎没有自动升级到最新版本

**问题现象**

在手机上无法打开元服务。

**可能原因**

手机中的com.huawei.hms.ascfruntime的版本可能不是最新的，在打开元服务的时候，其依赖的ascf没有自动升级到最新版本。

**解决措施**

1. 使用命令“hdc shell bm dump-shared -n com.huawei.hms.ascfruntime”命令查看当前版本号。对照[ASCF运行时的版本说明](../release-note/release-note-ascf-runtime.md)，确认是否最新的版本号。

2. 如果不是最新版本，可以打开应用市场，把“我的 &gt; 设置 &gt; 自动更新应用”选项设置为“仅WLAN下”或者“WLAN和移动网络”，应用市场就会自动更新ascf引擎了。
