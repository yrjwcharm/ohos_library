# 导入 liveViewManager

## 概述

在项目中导入 `liveViewManager`，并新建实况窗控制类（例如 `LiveViewController`），构造 `isLiveViewEnabled()` 方法，用于校验实况窗开关（设置 > 应用和元服务 > 应用名 > 实况窗）是否打开。

> **重要提示：** 打开实况窗开关是创建实况窗的前提条件。

## 导入 liveViewManager

```typescript
import { liveViewManager } from '@kit.LiveViewKit';
```

## 实况窗控制器类

```typescript
import { liveViewManager } from '@kit.LiveViewKit';
import { BusinessError } from '@kit.BasicServicesKit';

export class LiveViewController {
    // 检测实况窗开关是否打开
    public async isLiveViewEnabled(): Promise<boolean> {
        let result: boolean = false;
        try {
            result = await liveViewManager.isLiveViewEnabled();
        } catch (e) {
            const err: BusinessError = e as BusinessError;
            console.error(`Request isLiveViewEnabled error: ${err.code}, ${err.message}`);
        }
        console.info(`Request isLiveViewEnabled result: ${result}`);
        return result;
    }
}
```

## 使用场景

在创建实况窗之前，必须先调用 `isLiveViewEnabled()` 方法检查开关状态：

```typescript
public async startLiveView(): Promise<void> {
    // ❌ 前置检查：必须确保实况窗开关已打开
    if (!await this.isLiveViewEnabled()) {
        Logger.warn('startLiveView, live view is disabled.');
        return;
    }
    
    // ✅ 开关已打开，继续创建实况窗
    const view = await this.buildDefaultView();
    try {
        await liveViewManager.startLiveView(view);
        console.info('Live view started successfully');
    } catch (e) {
        const err: BusinessError = e as BusinessError;
        console.error(`Failed to start live view: ${err.code}, ${err.message}`);
    }
}
```

## 用户设置路径

用户需在系统设置中手动开启实况窗开关：

```
设置
└── 应用和元服务
    └── 应用名（如：实况窗Demo）
        └── 实况窗
            └── [打开/关闭]  ← 需确保此开关为打开状态
```

## 注意事项

| 事项 | 说明 |
|------|------|
| 前置检查 | 创建实况窗前必须调用 `isLiveViewEnabled()` 确认开关状态 |
| 开关位置 | 设置 > 应用和元服务 > 应用名 > 实况窗 |
| 用户引导 | 如果开关未打开，可提示用户前往设置开启 |
| 异常处理 | 建议捕获异常并记录日志 |

---

*文档版本：1.0*  
*最后更新：2026-05-14*