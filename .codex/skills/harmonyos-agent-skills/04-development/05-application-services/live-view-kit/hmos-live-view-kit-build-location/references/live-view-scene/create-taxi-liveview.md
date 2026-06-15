# 打车出行实况窗

## 基本概念

打车出行场景用于网约车订单状态实时展示。

## 场景介绍

- 叫车/等待接单
- 司机接单/赶往乘客
- 行程中导航
- 到达目的地
- 支付/完成行程

**支持创建、更新、结束操作**

## 业务基本流程

1. 用户叫车 → 创建实况窗
2. 司机接单 → 更新状态
3. 司机赶往 → 更新位置
4. 行程开始 → 更新导航
5. 到达目的地 → 更新状态
6. 支付完成 → 结束实况窗

## 示例代码

```typescript
import { liveViewManager } from '@kit.LiveViewKit';
import { common, Want, wantAgent, WantAgent } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';


// todo 实况窗更新节点/阶段/状态，更新或者结束的时候可以调用此枚举对更新状态进行赋值
enum LiveViewStatus {
  CALLING = 1, //呼叫车辆
  ABOUT_TO_BEGIN = 2, //商家已接单
  DRIVER_ON_THE_WAY = 3, //司机在路上
  DRIVER_ARRIVE = 4, //司机到达起始点
  HEADING_TO_DESTINATION = 5, //正在前往目的地
  COMPLETED = 6, //行程已结束
  WAIT_PAYMENT = 7, //正在付款
  ORDER_COMPLETED = 8 //订单已完成
}

export class TaxiLiveViewController {
  private static defaultView: liveViewManager.LiveView | undefined = undefined;
  private static contentColor: string = '#FF0A59F7';
  private static underLineColor: string = '#FF0A59F7';
  private static capsuleColor: string = '#FF308977';

  public async startLiveView(): Promise<void> {
    if (!await TaxiLiveViewController.isLiveViewEnabled()) {
      console.error('startLiveView, live view is disabled.');
      return;
    }
    TaxiLiveViewController.defaultView = await TaxiLiveViewController.buildDefaultView();
    try {
      const result = await liveViewManager.startLiveView(TaxiLiveViewController.defaultView);
      console.log(`Request startLiveView result: ${JSON.stringify(result)}`);
    } catch (e) {
      const err: BusinessError = e as BusinessError;
      console.error(`Request startLiveView error: ${err.code}, ${err.message}`);
    }
  }

  public async updateLiveView(): Promise<boolean> {
    console.log('updateLiveView start');
    try {
      if (!TaxiLiveViewController.defaultView) {
        console.error('updateLiveView, live view is disabled.')
        return false;
      }
      console.log('updateLiveView, id: %{public}d', TaxiLiveViewController.defaultView.id);
      console.log('updateLiveView, get active live view succeed.');
      if (TaxiLiveViewController.defaultView.sequence) {
        TaxiLiveViewController.defaultView.sequence += 1;
      }
      switch (TaxiLiveViewController.defaultView.sequence) {
        case LiveViewStatus.ABOUT_TO_BEGIN:
          TaxiLiveViewController.defaultView.isMute = false;
          TaxiLiveViewController.defaultView.liveViewData.primary.title = "行程即将开始";
          TaxiLiveViewController.defaultView.liveViewData.primary.content = [
            {
              text: "预计5分钟后到达指定地点 "
            }
          ];
          TaxiLiveViewController.defaultView.liveViewData.primary.layoutData = {
            layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_PICKUP,
            title: "车牌号",
            content: "苏AD88888",
            underlineColor: TaxiLiveViewController.underLineColor,
            descPic: 'aito_m5.png'
          };
          TaxiLiveViewController.defaultView.liveViewData.capsule = {
            type: liveViewManager.CapsuleType.CAPSULE_TYPE_TEXT,
            status: 1,
            icon: 'capsule_taxi.png',
            backgroundColor: TaxiLiveViewController.capsuleColor,
            title: "已接单"
          }
          break;
        case LiveViewStatus.DRIVER_ON_THE_WAY:
          TaxiLiveViewController.defaultView.liveViewData.primary.title = "司机正在赶来";
          TaxiLiveViewController.defaultView.liveViewData.capsule = {
            type: liveViewManager.CapsuleType.CAPSULE_TYPE_TEXT,
            status: 1,
            icon: 'capsule_gps.png',
            backgroundColor: TaxiLiveViewController.capsuleColor,
            title: "接驾中"
          }
          break;
        case LiveViewStatus.DRIVER_ARRIVE:
          TaxiLiveViewController.defaultView.liveViewData.primary.title = "司机已到达上车点";
          TaxiLiveViewController.defaultView.liveViewData.primary.content = [
            {
              text: "AITO M5新能源丨曾师父"
            }
          ];
          break;
        case LiveViewStatus.HEADING_TO_DESTINATION:
          TaxiLiveViewController.defaultView.isMute = true;
          TaxiLiveViewController.defaultView.liveViewData.primary.title = "正在去往目的地";
          TaxiLiveViewController.defaultView.liveViewData.primary.content = [
            {
              text: "预计达到目的地时间："
            },
            {
              text: "23:49",
              textColor: TaxiLiveViewController.contentColor
            }
          ];
          TaxiLiveViewController.defaultView.liveViewData.primary.layoutData = {
            layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_PROGRESS,
            progress: 0,
            lineType: liveViewManager.LineType.LINE_TYPE_DOTTED_LINE,
            indicatorType: liveViewManager.IndicatorType.INDICATOR_TYPE_UP,
            indicatorIcon: 'taxi-transport-icon.png',
            nodeIcons: [
              'icon_order.png',
              'icon_finish.png'
            ]
          };
          TaxiLiveViewController.defaultView.liveViewData.capsule = {
            type: liveViewManager.CapsuleType.CAPSULE_TYPE_TEXT,
            status: 1,
            icon: 'capsule_taxi.png',
            backgroundColor: TaxiLiveViewController.capsuleColor,
            title: "行程中"
          }
          break;
        case LiveViewStatus.COMPLETED:
          TaxiLiveViewController.defaultView.liveViewData.primary.title = "行程结束";
          TaxiLiveViewController.defaultView.liveViewData.primary.content = [
            {
              text: "乘客已送达"
            }
          ];
          TaxiLiveViewController.defaultView.liveViewData.primary.layoutData = {
            layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_PROGRESS,
            progress: 100,
            lineType: liveViewManager.LineType.LINE_TYPE_DOTTED_LINE,
            indicatorType: liveViewManager.IndicatorType.INDICATOR_TYPE_UP,
            indicatorIcon: 'taxi-transport-icon.png',
            nodeIcons: [
              'icon_order.png',
              'icon_finish.png'
            ]
          };
          TaxiLiveViewController.defaultView.liveViewData.capsule = {
            type: liveViewManager.CapsuleType.CAPSULE_TYPE_TEXT,
            status: 1,
            icon: 'capsule_taxi.png',
            backgroundColor: TaxiLiveViewController.capsuleColor,
            title: "行程结束"
          }
          break;
        case LiveViewStatus.WAIT_PAYMENT:
          TaxiLiveViewController.defaultView.liveViewData.primary.title = "待支付";
          TaxiLiveViewController.defaultView.liveViewData.primary.content = [
            {
              text: "已到达指定地点，待支付"
            }
          ];
          TaxiLiveViewController.defaultView.liveViewData.primary.layoutData = {
            layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_PICKUP,
            title: "待支付金额",
            content: "25.5元",
            underlineColor: TaxiLiveViewController.underLineColor,
            descPic: 'aito_m5.png'
          };
          TaxiLiveViewController.defaultView.liveViewData.capsule = {
            type: liveViewManager.CapsuleType.CAPSULE_TYPE_TEXT,
            status: 1,
            icon: 'capsule_store.png',
            backgroundColor: TaxiLiveViewController.capsuleColor,
            title: "待支付"
          }
          break;
        case LiveViewStatus.ORDER_COMPLETED:
          await this.stopLiveView();
          return false;
        default:
          await this.stopLiveView();
          return false;
      }
      console.log(`Request updateLiveView req: ${JSON.stringify(TaxiLiveViewController.defaultView)}`);
      const result = await liveViewManager.updateLiveView(TaxiLiveViewController.defaultView);
      console.log(`Request updateLiveView result: ${JSON.stringify(result)}`);
      return true;
    } catch (e) {
      const err: BusinessError = e as BusinessError;
      console.error(`Request updateLiveView error: ${err.code} ${err.message}`);
      return false;
    }
  }

  public async stopLiveView(): Promise<void> {
    try {
      if (!await TaxiLiveViewController.isLiveViewEnabled() || !TaxiLiveViewController.defaultView) {
        console.error('stopLiveView, live view is disabled.')
        return;
      }
      if (TaxiLiveViewController.defaultView.sequence) {
        TaxiLiveViewController.defaultView.sequence += 1;
      }
      console.log('stopLiveView, get active live view succeed.');
      TaxiLiveViewController.defaultView.sequence = LiveViewStatus.ORDER_COMPLETED;
      TaxiLiveViewController.defaultView.liveViewData.primary.title = "订单已完成";
      TaxiLiveViewController.defaultView.liveViewData.primary.content = [
        {
          text: "祝您有一个愉快的旅途"
        }
      ];
      TaxiLiveViewController.defaultView.liveViewData.primary.layoutData = {
        layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_PICKUP,
        title: "已完成",
        content: "订单已完成",
        underlineColor: TaxiLiveViewController.underLineColor,
        descPic: 'aito_m5.png'
      };
      console.log(`Request stopLiveView req: ${JSON.stringify(TaxiLiveViewController.defaultView)}`);
      const result = await liveViewManager.stopLiveView(TaxiLiveViewController.defaultView);
      console.log(`Request stopLiveView result: ${JSON.stringify(result)}`);
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
    console.log(`Request isLiveViewEnabled result: ${result}`);
    return result;
  }

  private static async buildDefaultView(): Promise<liveViewManager.LiveView> {
    return {
      id: 1,
      event: 'TAXI',
      sequence: LiveViewStatus.CALLING,
      liveViewData: {
        primary: {
          title: "呼叫车辆中",
          content: [
            {
              text: "正在召唤司机，预计三分钟内接单"
            }
          ],
          keepTime: 15,
          clickAction: await TaxiLiveViewController.buildWantAgent('TaxiHailing'),
          extensionData: {
            type: liveViewManager.ExtensionType.EXTENSION_TYPE_ICON,
            pic: 'icon_taxi.png',
            clickAction: await TaxiLiveViewController.buildWantAgent('TaxiHailing')
          },
          layoutData: {
            layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_DEFAULT
          }
        },
        capsule: {
          type: liveViewManager.CapsuleType.CAPSULE_TYPE_TEXT,
          status: 1,
          icon: 'capsule_gps.png',
          backgroundColor: TaxiLiveViewController.capsuleColor,
          title: "待接单"
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
  public controller = new TaxiLiveViewController();
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
      Text("更新打车出行实况窗")
        .onClick(()=>{
          this.controller.updateLiveView();
        })
      Text("结束打车出行实况窗")
        .onClick(()=>{
          this.controller.stopLiveView();
        })
    }
    .width('100%')
    .height('100%')
  }
}
```
