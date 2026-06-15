# 构建本地实况窗

## 基本概念

`liveViewManager` 模块用于构建本地实况窗，完成创建、更新、结束整个生命周期。

**限制**：
- 仅应用前台运行且用户产生服务合约时可创建
- 本地更新/结束依赖应用进程，推荐使用 Push Kit 远程操作

## 生命周期

```
创建 startLiveView() → 更新 updateLiveView() → 结束 stopLiveView()
```

## 开发准备

1. 开通实况窗权益
2. 设备端打开实况窗开关
3. 调用 `liveViewManager.isLiveViewEnabled()` 检查权限

## 示例代码

```typescript
import { liveViewManager } from '@kit.LiveViewKit';

public async startLiveView(): Promise<void> {
    if (!await liveViewManager.isLiveViewEnabled()) {
        console.warn('live view is disabled.');
        return;
    }
    const view = await this.buildDefaultView();
    try {
        const result = await liveViewManager.startLiveView(view);
        console.info(`startLiveView result: , ${JSON.stringify(result)}`);
    } catch (e) {
        const err: BusinessError = e as BusinessError;
        console.error(`Error: ${err.code}, ${err.message}`);
    }
}
```

## 状态枚举

```typescript
export enum LiveViewStatus {
    WAITING_PAYMENT = 1,
    WAITING_MERCHANT = 2,
    WAITING_RIDER = 3,
    RIDER_GET_ORDER = 4,
    RIDER_TO_STORE = 5,
    PRODUCT_DELIVERING = 6,
    PRODUCT_TO_CABINET = 7,
    PRODUCT_DELIVERED = 8
}
```
