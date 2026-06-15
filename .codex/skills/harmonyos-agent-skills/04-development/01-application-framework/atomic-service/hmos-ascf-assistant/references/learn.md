## 学习路径

### 初学者

1. 了解项目结构：`references-framework/file-structure.md`
2. 学习全局配置：`references-framework/appjson-global-config.md`
3. 掌握视图层：`view-layer-hxml.md` + `view-layer-css.md`
4. 理解页面逻辑：`logical-layer-page.md` + `logical-layer-route-lifecycle.md`
5. 使用基础 API：`apis-router.md`（导航）+ `apis-data-storage.md`（存储）

### 中级开发者

1. 掌握自定义组件：从 `custom-components-creation.md` 到 `custom-components-communication.md`
2. 学习事件系统：`logical-layer-events.md` 及相关文件
3. 集成网络 API：`apis-request.md`、`apis-download.md`、`apis-upload.md`
4. 接入开放能力：`apis-account.md`（登录）、`apis-authorization.md`（授权）、`apis-payment.md`（支付）

### 高级开发者

1. 跨服务导航：`apis-navigate.md`（navigateToAtomicService、EventChannel）
2. 原生桥接：`ascf-nativeBridge.md`（与 ArkTS 通信）
3. 性能优化：`apis-data-storage.md`（后台拉取）、分包加载
4. 设备 API：蓝牙（`apis-bluetooth.md`、`apis-ble.md`）、传感器、画布

## 文档查找提示

- 所有 API 文件命名规则：`apis-{域名}.md`
- 所有组件文件命名规则：`components-{组件名}.md`
- 框架文件按层分组：`view-layer-*`、`logical-layer-*`、`custom-components-*`
- 每个子目录的 `Readme-CN.md` 是该目录的目录索引
- 各 API 的版本要求标注为"**起始版本：**"
- 需要权限的 API 会标注所需权限（如 `ohos.permission.INTERNET`）
