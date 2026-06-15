# 航班场景实况窗

## 基本概念

航班场景用于航班值机、登机、飞行状态实时展示。

## 场景介绍

- 值机办理
- 登机口信息
- 航班延误/取消
- 行李提取提示

**仅支持创建操作**

## 业务基本流程

1. 值机办理 → 创建实况窗
2. 登机口变更 → 更新信息
3. 开始登机 → 更新状态
4. 起飞/到达 → 结束实况窗

## 示例代码

```typescript
import { liveViewManager } from '@kit.LiveViewKit';
import { common, Want, wantAgent, WantAgent } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';

// todo 实况窗更新节点/阶段/状态，更新或者结束的时候可以调用此枚举对更新状态进行赋值
enum LiveViewStatus {
  DEPART = 1, //plan to depart
  WAITING_FOR_CHECK_IN = 2, //waiting for check-in
  CHECKED_IN = 3, //checked in
  PASSED_SECURITY_CHECK = 4, //checked and inspected
  START_BOARDING = 5, //start boarding
  URGE_BOARDING = 6, //urge boarding
  BOARDED = 7, //boarded already
  END_BOARDING = 8, //end boarding
  ABOUT_TO_TAKE_OFF = 9, //about to take off
  TAKEN_OFF = 10, //already taken off
  ARRIVED = 11, //arrived
  LUGGAGE_PROMPT = 12, //reminder luggage carousel
  FLIGHT_TRAVEL_END = 13, //end reminder
  REFUND_TICKET = 14, //user ticket refund
  FLIGHT_CANCEL = 15, //flight cancellation
  FLIGHT_DELAY = 0, //flight delayed
  FLIGHT_RESCHEDUE = 0 //ticket changes
}

export class FlightLiveViewController {
  private static defaultView: liveViewManager.LiveView | undefined = undefined;
  private static contentColor: string = '#FF0A59F7';
  private static capsuleColor: string = '#FF308977';
  private static flightNumber: string = '';
  private static flightStartTime: string = '';
  private static flightStopTime: string = '';
  private static sequence: number = 1;

  public async startLiveView(): Promise<void> {
    if (!await FlightLiveViewController.isLiveViewEnabled()) {
      console.warn('startLiveView, live view is disabled.')
      return;
    }
    FlightLiveViewController.flightNumber = " | 班次 GH123";
    FlightLiveViewController.flightStartTime = "09:00";
    FlightLiveViewController.flightStopTime = "12:00";
    FlightLiveViewController.sequence = 1;
    FlightLiveViewController.defaultView = await FlightLiveViewController.buildDefaultView();
    try {
      console.info(`Request startLiveView req: ${JSON.stringify(FlightLiveViewController.defaultView)}`);
      const result = await liveViewManager.startLiveView(FlightLiveViewController.defaultView);
      console.info(`Request startLiveView result: ${JSON.stringify(result)}`);
    } catch (e) {
      const err: BusinessError = e as BusinessError;
      console.error(`Request startLiveView error: ${err.code}, ${err.message}`);
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
      id: 6,
      event: "FLIGHT",
      sequence: FlightLiveViewController.sequence,
      isMute: false,
      liveViewData: {
        primary: {
          title: "计划出发" + FlightLiveViewController.flightNumber,
          content: [
            {
              text: "登机口"
            },
            {
              text: " 32 ",
              textColor: FlightLiveViewController.contentColor
            },
            {
              text: "| 座位"
            },
            {
              text: " 17H",
              textColor: FlightLiveViewController.contentColor
            }
          ],
          keepTime: 15,
          clickAction: await FlightLiveViewController.buildWantAgent('FlightTravel'),
          layoutData: {
            layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_FLIGHT,
            firstTitle: FlightLiveViewController.flightStartTime,
            firstContent: "上海",
            lastTitle: FlightLiveViewController.flightStopTime,
            lastContent: "成都",
            spaceIcon: "icon_plane.png",
            isHorizontalLineDisplayed: false,
            additionalText: "飞机起飞前40分钟后禁止登机"
          },
          extensionData: {
            type: liveViewManager.ExtensionType.EXTENSION_TYPE_ICON,
            pic: 'flight.png',
            clickAction: await FlightLiveViewController.buildWantAgent('FlightTravel')
          },
        },
        capsule: {
          type: liveViewManager.CapsuleType.CAPSULE_TYPE_TEXT,
          status: 1,
          icon: 'flight.png',
          backgroundColor: FlightLiveViewController.capsuleColor,
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
  public controller = new FlightLiveViewController();
  aboutToAppear(): void {
    try {
      this.controller.startLiveView().then((result: void) => {
        console.info('Delivery live view started successfully');
      }).catch((e: BusinessError) => {
        console.error(`Failed to start delivery live view: ${e.code}, ${e.message}`);
      });
    } catch (e) {
      const err: BusinessError = e as BusinessError;
      console.error(`Error: ${err.code}, ${err.message}`);
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
