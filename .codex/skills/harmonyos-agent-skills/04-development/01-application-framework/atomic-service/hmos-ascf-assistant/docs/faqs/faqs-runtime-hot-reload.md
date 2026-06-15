# 使用热重载功能元服务无法启动

**问题现象**

使用热重载功能时，元服务无法启动，报错信息为：

msg:error: failed to install bundle. code:9568305 error: Failed to install the HAP or HSP because the dependent module does not exist.

**可能原因**

ASCF 运行时版本低于最低依赖版本要求。

**解决措施**

请将ASCF 运行时版本升级至1.0.10以上，方法请参考：[升级已有项目的ASCF运行时版本](../quick-start/ascf-plugin.md#升级已有项目的ascf运行时版本)。
