# 计时场景实况窗

## 基本概念

计时场景用于通话录音、传输进度等需要计时功能的状态展示。

## 场景介绍

- 通话计时
- 录音计时
- 传输进度

**支持创建、更新、结束操作**

## 业务基本流程

1. 开始计时 → 创建实况窗
2. 计时中 → 更新显示
3. 暂停/继续 → 更新状态
4. 计时结束 → 结束实况窗

## 示例代码

```typescript
import { liveViewManager } from '@kit.LiveViewKit';
import { common, Want, wantAgent, WantAgent } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';

export class TimerController {
  private static defaultView: liveViewManager.LiveView | undefined = undefined;
  private static capsuleColor: string = '#FF308977';
  private static pickUpColor: string = '#FF0A59F7';
  private static isCountdown: boolean = false;

  public async startLiveView(isCountdown: boolean = false): Promise<void> {
    if (!await TimerController.isLiveViewEnabled()) {
      console.warn('startLiveView, live view is disabled.');
      return;
    }
    TimerController.isCountdown = isCountdown;
    TimerController.defaultView = await TimerController.buildDefaultView(TimerController.isCountdown);
    try {
      const result = await liveViewManager.startLiveView(TimerController.defaultView);
      console.info(`Request startLiveView result: ${JSON.stringify(result)}`);
    } catch (e) {
      const err: BusinessError = e as BusinessError;
      console.error(`Request startLiveView error: ${err.code} ${err.message}`);
    }
  }

  public async pauseTimer(): Promise<void> {
    console.info('pauseTimer');
    try {
      if (!TimerController.defaultView) {
        return;
      }
      TimerController.defaultView.timer = {
        isPaused: true
      }
      TimerController.defaultView.liveViewData.primary.title = '已暂停'
      TimerController.defaultView.liveViewData.capsule = {
        type: liveViewManager.CapsuleType.CAPSULE_TYPE_TIMER,
        status: 1,
        isPaused: true,
      }
      if (TimerController.defaultView.sequence) {
        TimerController.defaultView.sequence += 1;
      }
      await liveViewManager.updateLiveView(TimerController.defaultView);
    } catch (e) {
      const err: BusinessError = e as BusinessError;
      console.error(`Request updateLiveView error: ${err.code} ${err.message}`);
    }
  }

  public async continueTimer(): Promise<void> {
    console.info('continueTimer');
    try {
      if (!TimerController.defaultView) {
        return;
      }
      TimerController.defaultView.timer = {
        isPaused: false
      }
      TimerController.defaultView.liveViewData.primary.title = '计时中'
      TimerController.defaultView.liveViewData.capsule = {
        type: liveViewManager.CapsuleType.CAPSULE_TYPE_TIMER,
        status: 1,
        isPaused: false,
      }
      if (TimerController.defaultView.sequence) {
        TimerController.defaultView.sequence += 1;
      }
      await liveViewManager.updateLiveView(TimerController.defaultView);
    } catch (e) {
      const err: BusinessError = e as BusinessError;
      console.error(`Request updateLiveView error: ${err.code} ${err.message}`);
    }
  }

  public async stopLiveView(): Promise<void> {
    try {
      if (!await TimerController.isLiveViewEnabled() || !TimerController.defaultView) {
        console.warn('stopLiveView, live view is disabled.')
        return;
      }
      console.info('stopLiveView, get active live view succeed.');
      if (TimerController.defaultView.sequence) {
        TimerController.defaultView.sequence += 1;
      }
      TimerController.defaultView.liveViewData.primary.title = '已结束'
      TimerController.defaultView.liveViewData.primary.layoutData = {
        layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_PICKUP,
        title: '计时时间',
        underlineColor: TimerController.pickUpColor,
        descPic: 'timer.png'
      };
      TimerController.defaultView.timer = {
        isPaused: true
      };
      TimerController.defaultView.liveViewData.capsule = {
        type: liveViewManager.CapsuleType.CAPSULE_TYPE_TEXT,
        status: 1,
        title: "比赛结束"
      }
      console.info(`Request stopLiveView req: ${JSON.stringify(TimerController.defaultView)}`);
      const result = await liveViewManager.stopLiveView(TimerController.defaultView);
      console.info(`Request stopLiveView result: ${JSON.stringify(result)}`);
    } catch (e) {
      const err: BusinessError = e as BusinessError;
      console.error(`Request stopLiveView error: ${err.code} ${err.message}`);
    }
  }

  private static async isLiveViewEnabled(): Promise<boolean> {
    let result: boolean = false;
    try {
      result = await liveViewManager.isLiveViewEnabled();
    } catch (e) {
      console.error(`Request isLiveViewEnabled error: ${e}`);
    }
    console.info(`Request isLiveViewEnabled result: ${result}`);
    return result;
  }

  private static async buildDefaultView(isCountdown: boolean = false): Promise<liveViewManager.LiveView> {
    return {
      id: 8,
      event: "TIMER",
      sequence: 1,
      isMute: false,
      timer: {
        time: isCountdown ? 5 * 60 * 1000 : 0,
        isCountdown: isCountdown,
        isPaused: false
      },
      liveViewData: {
        primary: {
          title: '计时中',
          content: [
            {
              text: '计时实况窗体验'
            }
          ],
          keepTime: 15,
          clickAction: await TimerController.buildWantAgent('Timer'),
          layoutData: {
            layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_PICKUP,
            title: '计时时间',
            content: '${placeholder.timer}',
            underlineColor: TimerController.pickUpColor,
            descPic: 'timer.png'
          },
          extensionData: {
            type: liveViewManager.ExtensionType.EXTENSION_TYPE_DEFAULT,
          }
        },
        capsule: {
          type: liveViewManager.CapsuleType.CAPSULE_TYPE_TIMER,
          status: 1,
          icon: 'capsule_timer.png',
          backgroundColor: TimerController.capsuleColor,
          time: isCountdown ? 5 * 60 * 1000 : 0,
          isCountdown: isCountdown,
          isPaused: false,
        }
      }
    }
  }

  private static async buildWantAgent(page: string): Promise<Want> {
    const wantAgentInfo: wantAgent.WantAgentInfo = {
      wants: [
        {
          //todo 此处应改为业务实际应用包名
          bundleName: 'com.xxx.app',
          //todo 此处应改为实际业务窗口名称
          abilityName: 'EntryAbility',
          parameters: {
            page: page,
          },
        } as Want
      ],
      actionType: wantAgent.OperationType.START_ABILITIES,
      requestCode: 0,
      actionFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
    };
    try {
      const agent: WantAgent = await wantAgent.getWantAgent(wantAgentInfo);
      console.log(`getWantAgent success! wantAgent: ${JSON.stringify(agent)}`);
      return agent;
    } catch (e) {
      const err: BusinessError = e as BusinessError;
      console.error(`getWantAgent failed! err: ${err.code}, ${err.message}`);
      throw e as Error;
    }
  }
}

@Entry
@Component
struct Delivery {
  public controller = new TimerController();
  aboutToAppear(): void {
    try {
      this.controller.startLiveView().then((result: void) => {
        console.info('Delivery live view started successfully');
      }).catch((e: BusinessError) => {
        console.error(`Failed to start delivery live view: ${e.code} ${e.message}`);
      });
    } catch (e) {
      const err: BusinessError = e as BusinessError;
      console.error(`Error: ${err.code} ${err.message}`);
    }
  }

  build(): void {
    Column() {
      Text("更新计时器实况窗")
        .onClick(()=>{
          this.controller.continueTimer();
        })
      Text("暂停计时器实况窗")
        .onClick(()=>{
          this.controller.pauseTimer();
        })
      Text("结束计时器实况窗")
        .onClick(()=>{
          this.controller.stopLiveView();
        })
    }
    .width('100%')
    .height('100%')
  }
}
```

## 计时场景类型

| 类型 | 配置 |
|------|------|
| 通话计时 | `timer.isCountdown: false` |
| 录音计时 | `timer.isPaused` 控制暂停/继续 |
| 传输进度 | 配合 timer 显示已用时间 |
