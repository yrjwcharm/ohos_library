# 元服务 API 使用规范

## @atomicservice 装饰器说明

元服务只能使用标注了 `@atomicservice` 装饰器的 ArkTS 接口。使用未标注的接口会导致编译失败或上架审核被拒。

### 如何判断接口是否支持

1. 查阅[元服务 API 集文档](https://developer.huawei.com/consumer/cn/doc/atomic-references/atomic-apis-intro)
2. 在 DevEco Studio 中，不支持的接口会有灰色提示或编译警告
3. 参考[正确使用元服务 API 集](https://developer.huawei.com/consumer/cn/blog/topic/03203167293087380)

## 常用支持 API 分类

### 网络请求
```typescript
// ✅ 支持：@ohos.net.http（标注了 @atomicservice）
import http from '@ohos.net.http';

const httpRequest = http.createHttp();
httpRequest.request('https://example.com/api', {
  method: http.RequestMethod.GET
}, (err, data) => {
  // 处理响应
});
```

### UI 组件
```typescript
// ✅ 支持：AtomicServiceEnhancedWeb（元服务专属 H5 容器）
AtomicServiceEnhancedWeb({
  src: 'https://example.com',
  controller: this.webController
})

// ❌ 禁止：ArkWeb
Web({ src: 'https://example.com', controller: this.controller }) // 不允许
```

### 账号（静默登录）
```typescript
// ✅ 支持：静默登录
import { authentication } from '@kit.AccountKit';
import { util } from '@kit.ArkTS';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { BusinessError } from '@kit.BasicServicesKit';

// 创建登录请求，并设置参数
const loginRequest = new authentication.HuaweiIDProvider().createLoginWithHuaweiIDRequest();
// false表示当用户未登录华为账号时，不会拉起华为账号登录界面；直接返回1001502001错误码
loginRequest.forceLogin = false;
// 用于防跨站点请求伪造
loginRequest.state = util.generateRandomUUID();
```

### 支付
```typescript
// ✅ 支持：鸿蒙支付服务
import { paymentService } from '@kit.PaymentKit';
// 参考官方文档接入支付流程
```

### 路由导航
```typescript
// ✅ 支持：Navigation + NavPushPathHelper
import { NavPushPathHelper } from '@kit.ArkUI'

pathStack: NavPathStack = new NavPathStack()
//以NavPathStack的实例为参数生成NavPushPathHelper实例
helper: NavPushPathHelper = new NavPushPathHelper(this.pathStack)

// 跳转到分包
this.helper.pushPath('product', { name: 'ProductList' }, false)
  .then(() => {
    console.error('[pushPath]success.');
  })
  .catch((error: BusinessError) => {
    console.error(`[pushPath]failed, error code = ${error.code}, error.message = ${error.message}.`);
  });
```

## 不支持的能力

| 能力 | 原因 | 替代方案 |
|------|------|----------|
| C++ / .so 库 | 元服务不支持原生库 | 使用纯 ArkTS 实现 |
| ArkWeb 组件 | 未标注 @atomicservice | 使用 AtomicServiceEnhancedWeb |
| 任意跳转普通应用 | 违反跳转规范 | 使用 openAtomicService 跳转元服务 |
| 自行收集敏感数据 | 违反隐私托管要求 | 接入隐私托管服务 |

### 隐私托管

参考[](./privacy.md)
> **注意**：元服务不允许自行弹出隐私弹窗，隐私协议由平台统一管理。违反此规定是上架审核被拒的高频原因。

## API 版本兼容性

- 元服务 API 集随 HarmonyOS 版本迭代。
