# 共享租赁实况窗

## 基本概念

共享租赁场景用于共享单车、充电宝、雨伞等设备租用状态展示。

## 场景介绍

- 设备租用中
- 租赁计时
- 归还提醒

**仅支持创建操作**

## 业务基本流程

1. 用户借取 → 创建实况窗
2. 使用中 → 显示计时
3. 归还设备 → 结束实况窗

## 示例代码

```typescript
import { liveViewManager } from '@kit.LiveViewKit';
import { common, Want, wantAgent, WantAgent } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';


// todo 实况窗更新节点/阶段/状态，更新或者结束的时候可以调用此枚举对更新状态进行赋值
enum LiveViewStatus {
  RENT_START = 1, //start renting
  RENT_END = 2, //end renting
  WAIT_PAYMENT = 3, //pending payment
  RENT_COMPLETE = 4, //order completed
  RENT_SUSPEND = 0, //lease suspension
}

export class RentLiveViewController {
  private static defaultView: liveViewManager.LiveView | undefined = undefined;
  private static processColor: string = '#ff10c1f7';
  private static capsuleColor: string = '#FF308977';
  private static underLineColor: string = '#FF0A59F7';
  private static sequence: number = 1;

  public async startLiveView(): Promise<void> {
    if (!await RentLiveViewController.isLiveViewEnabled()) {
      console.warn('startLiveView, live view is disabled.');
      return;
    }
    RentLiveViewController.sequence = 1;
    RentLiveViewController.defaultView = await RentLiveViewController.buildDefaultView();
    try {
      console.info(`Request startLiveView req: ${JSON.stringify(RentLiveViewController.defaultView)}`);
      const result = await liveViewManager.startLiveView(RentLiveViewController.defaultView);
      console.info(`Request startLiveView result: ${JSON.stringify(result)}`);
    } catch (e) {
      const err: BusinessError = e as BusinessError;
      console.error(`Request startLiveView error: ${err.message}`);
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

  private static async buildDefaultView(): Promise<liveViewManager.LiveView> {
    return {
      id: 7,
      event: "RENT",
      sequence: LiveViewStatus.RENT_START,
      timer: {
        time: 0,
        isCountdown: false,
        isPaused: false
      },
      liveViewData: {
        primary: {
          title: "租赁中",
          content: [
            {
              text: "感谢您使用本次租赁"
            }
          ],
          keepTime: 15,
          clickAction: await RentLiveViewController.buildWantAgent('RentShare'),
          extensionData: {
            type: liveViewManager.ExtensionType.EXTENSION_TYPE_ICON,
            pic: 'icon_rent.png',
            clickAction: await RentLiveViewController.buildWantAgent('RentShare')
          },
          layoutData: {
            layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_PICKUP,
            title: "租赁计时",
            content: "${placeholder.timer}",
            underlineColor: RentLiveViewController.underLineColor,
            descPic: 'aito_m5.png'
          }
        },
        capsule: {
          type: liveViewManager.CapsuleType.CAPSULE_TYPE_TIMER,
          status: 1,
          icon: 'share.png',
          backgroundColor: RentLiveViewController.capsuleColor,
          time: 0,
          isCountdown: false,
          isPaused: false,
        }
      }
    };
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
  public controller = new RentLiveViewController();
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

    }
    .width('100%')
    .height('100%')
  }
}
```
