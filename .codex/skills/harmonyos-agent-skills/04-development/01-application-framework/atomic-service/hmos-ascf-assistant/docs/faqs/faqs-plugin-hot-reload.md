# 在DevEco Studio无法开启热重载功能

**问题现象**

“选择运行/调试配置（Select Run/Debug Configuration）”菜单中选择 ![热重载配置logo](figures/reload-logo.png) 标志的entry，按钮数量没有变化（热重载模式只会保留启动![启动logo](figures/start-logo.png)和停止![停止logo](figures/stop-logo.png)按钮）。

**可能原因**

ASCF Plugin版本低于最低依赖版本要求。

**解决措施**

请将ASCF Plugin版本升级至1.0.4.200以上，方法请参考：[自动升级ASCF Plugin](../quick-start/ascf-plugin.md#自动升级ascf-plugin)。
