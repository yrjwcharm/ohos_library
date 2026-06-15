# 无目标文件时代码生成

## 适用场景

用户要求在业务代码中插入实况窗代码但未提供目标文件。

## 处理流程

### 1. 询问项目路径

### 2. 审查项目结构
- 分析目录结构
- 识别页面文件（*.ets）
- 确定实况窗代码最佳插入位置

### 3. 新建实况窗控制器文件

| 场景 | 建议文件名 |
|------|-----------|
| 即时配送 | DeliveryLiveView.ets |
| 打车出行 | TaxiLiveView.ets |
| 排队 | QueueLiveView.ets |
| 计时 | TimerLiveView.ets |
| 航班 | FlightLiveView.ets |
| 高铁 | TrainLiveView.ets |
| 共享租赁 | RentalLiveView.ets |
| 运动锻炼 | WorkoutLiveView.ets |
| 导航 | NavigationLiveView.ets |

### 4. 代码结构

```typescript
import { liveViewManager } from '@kit.LiveViewKit';
import { common, Want, wantAgent, WantAgent } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';

// todo 实况窗更新节点/阶段/状态
enum LiveViewStatus { ... }

export class XxxLiveViewController {
  private static defaultView: liveViewManager.LiveView | undefined = undefined;
  
  public async startLiveView(): Promise<void> { }
  private static async buildDefaultView(): Promise<liveViewManager.LiveView> { }
  private static async buildWantAgent(page: string): Promise<Want> { }
}

@Entry
@Component
struct XxxPage {
  public controller = new XxxLiveViewController();
  
  aboutToAppear(): void {
    // todo 调用 this.controller.startLiveView();
  }
  
  build(): void {
    Column() {
      // todo 更新按钮
      // todo 结束按钮
    }
  }
}
```

### 5. 调用说明

**创建**：
```typescript
aboutToAppear(): void {
  this.controller.startLiveView();
}
```

**更新**：
```typescript
onStatusChanged(status: LiveViewStatus): void {
  this.controller.updateLiveView(status);
}
```

**结束**：
```typescript
onCompleted(): void {
  this.controller.stopLiveView();
}
```
