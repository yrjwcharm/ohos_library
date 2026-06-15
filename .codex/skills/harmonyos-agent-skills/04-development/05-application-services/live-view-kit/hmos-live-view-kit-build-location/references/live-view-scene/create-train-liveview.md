# 高铁场景实况窗

## 基本概念

高铁场景用于车票购买、检票进站、行程状态展示。

## 场景介绍

- 车票购买成功
- 检票进站提醒
- 列车晚点提示
- 到站提醒

**仅支持创建操作**

## 业务基本流程

1. 购票成功 → 创建实况窗
2. 检票进站 → 更新状态
3. 列车出发 → 更新信息
4. 到达目的地 → 结束实况窗

## 示例代码

```typescript
import { liveViewManager } from '@kit.LiveViewKit';
import { common, Want, wantAgent, WantAgent } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';

// todo 实况窗更新节点/阶段/状态，更新或者结束的时候可以调用此枚举对更新状态进行赋值
enum LiveViewStatus {
  DEPART = 1, //plan to depart
  PASSED_SECURITY_CHECK = 2, //checked and inspected
  TICKET_CHECK = 3, //ticket checking reminder
  CHECKED = 4, //ticket checked
  CHECK_IN_CLOSED = 5, //stop ticket checking
  SET_OFF = 6, //already departed
  SET_OFF_CONTINUE = 7, //train departure
  ARRIVED = 8, //arrived
  TRAIN_DELAY = 0, //train delay
  RESCHEDUE = 0, //user rescheduling
  TRAIN_CANCEL = 9, //train shutdown
  REFUND_TICKET = 10, //refund ticket
}

export class TrainLiveViewController {
  private static defaultView: liveViewManager.LiveView | undefined = undefined;
  private static contentColor: string = '#FF0A59F7';
  private static capsuleColor: string = '#FF308977';
  private static trainNumber: string = '';
  private static trainStartTime: string = '';
  private static trainStopTime: string = '';
  private static sequence: number = 1;

  public async startLiveView(): Promise<void> {
    if (!await TrainLiveViewController.isLiveViewEnabled()) {
      console.warn('startLiveView, live view is disabled.')
      return;
    }
    TrainLiveViewController.trainNumber = " | 车次 G1";
    TrainLiveViewController.trainStartTime = "09:00";
    TrainLiveViewController.trainStopTime = "14:20";
    TrainLiveViewController.sequence = 1;
    TrainLiveViewController.defaultView = await TrainLiveViewController.buildDefaultView();
    try {
      console.info(`Request startLiveView req: ${JSON.stringify(TrainLiveViewController.defaultView)}`);
      const result = await liveViewManager.startLiveView(TrainLiveViewController.defaultView);
      console.info(`Request startLiveView result: ${JSON.stringify(result)}`);
    } catch (e) {
      const err: BusinessError = e as BusinessError;
      console.error(`Request startLiveView error: ${err.code} ${err.message}`);
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
      id: 2,
      event: "TRAIN",
      sequence: TrainLiveViewController.sequence,
      isMute: false,
      liveViewData: {
        primary: {
          title: "计划出发" + TrainLiveViewController.trainNumber,
          content: [
            { text: "检票口 " },
            {
              text: "6B ",
              textColor: TrainLiveViewController.contentColor
            },
            { text: "| 座位 " },
            {
              text: "03车 12F",
              textColor: TrainLiveViewController.contentColor
            }
          ],
          keepTime: 15,
          clickAction: await TrainLiveViewController.buildWantAgent('TrainDeparture'),
          layoutData: {
            layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_FLIGHT,
            firstTitle: TrainLiveViewController.trainStartTime,
            firstContent: "上海虹桥",
            lastTitle: TrainLiveViewController.trainStopTime,
            lastContent: "汉口",
            spaceIcon: "capsule_train.png",
            isHorizontalLineDisplayed: false,
            additionalText: "列车出发前5分钟停止检票"
          },
          extensionData: {
            type: liveViewManager.ExtensionType.EXTENSION_TYPE_ICON,
            pic: 'icon_rail.png',
            clickAction: await TrainLiveViewController.buildWantAgent('TrainDeparture')
          },
        },
        capsule: {
          type: liveViewManager.CapsuleType.CAPSULE_TYPE_TEXT,
          status: 1,
          icon: 'capsule_train.png',
          backgroundColor: TrainLiveViewController.capsuleColor,
          title: "计划出发",
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
  public controller = new TrainLiveViewController();
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
