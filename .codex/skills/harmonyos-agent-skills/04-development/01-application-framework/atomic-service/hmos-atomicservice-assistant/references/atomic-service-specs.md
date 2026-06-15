# 元服务规格说明

## 什么是元服务

元服务（Atomic Service）是鸿蒙系统提供的一种免安装、轻量化的应用形态。用户无需下载安装即可直接使用，具备快速启动、即用即走的体验特点。

## 与普通鸿蒙应用的主要差异

### 1. 项目标识

```json
// AppScope/app.json5
{
  "app": {
    "bundleType": "atomicService"  // 必须设置
  }
}
```

### 2. API 限制

- 仅支持标注了 `@atomicservice` 装饰器的 ArkTS 接口
- **不支持** C++ 扩展和 `.so` 动态库
- 完整 API 列表见[元服务 API 集](https://developer.huawei.com/consumer/cn/doc/atomic-references/atomic-apis-intro)

### 3. 包大小限制

| 类型 | 限制 | 说明 |
|------|------|------|
| 单个分包 | ≤ 2MB | 硬性限制，无法突破 |
| 总包大小 | ≤ 10MB | 默认限制 |
| 总包大小（申请后） | ≤ 20MB | 需单独申请 |

### 4. 网络请求

- 必须在 AGC（AppGallery Connect）后台配置**信任域名白名单**
- 未配置的域名请求会被拦截

### 5. H5 场景

- 必须使用 `AtomicServiceEnhancedWeb` 组件
- **禁止**使用 `ArkWeb` 组件

### 6. 跳转规范

- 跳转其他元服务：使用 `openAtomicService` 接口
- 不允许任意跳转普通应用
- 接受其他元服务跳转时需配置路由

### 7. 图标规范（睫毛图）

- 原始图：1024×1024 px
- 使用**睫毛图工具**处理，生成：
  - `512×512`：作为 `app_icon`（项目内使用）
  - `216×216`：上传至 AGC 发布使用

### 8. 隐私托管

- 元服务不得自行收集和处理敏感用户数据
- 需接入鸿蒙隐私托管服务，由平台统一处理

### 9. 备案要求

- 元服务需单独完成 ICP 备案
- 与普通 App 备案流程不同，走元服务专属备案通道

## 开发前置流程

1. 在 AGC 后台注册元服务（获取 bundleName）
2. DevEco Studio 创建项目时选择 Atomic Service 模板
3. 配置 `app.json5` 中 `bundleType=atomicService`
4. 参考[元服务开发旅程](https://developer.huawei.com/consumer/cn/doc/atomic-guides/atomic-development-journey)
