# 排队实况窗

## 基本概念

排队场景用于餐厅、银行等场所叫号排队状态展示。

## 场景介绍

- 取号等待
- 排队叫号
- 即将到达提示

**仅支持创建操作**

## 业务基本流程

1. 用户取号 → 创建实况窗
2. 排队等待 → 显示等待时间
3. 即将到达 → 更新提醒
4. 被叫号 → 结束实况窗

## 示例代码

```typescript
import { liveViewManager } from '@kit.LiveViewKit';
import { common, Want, wantAgent, WantAgent } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';

// todo 实况窗更新节点/阶段/状态，更新或者结束的时候可以调用此枚举对更新状态进行赋值
enum LiveViewStatus {
  WAITING_CALL = 1, //pick up the number
  WAITING_CALL_SECOND = 2, //waiting
  UPCOMING_CALL = 3, //coming soon
  CALLING_IN = 4, //calling in
  QUENE_END = 5, //queue completed
}

export class QueueLiveViewController {
  private static defaultView: liveViewManager.LiveView | undefined = undefined;
  private static processColor: string = '#ff10c1f7';
  private static capsuleColor: string = '#FF308977';
  private static underLineColor: string = '#FF0A59F7';

  public async startLiveView(): Promise<void> {
    if (!await QueueLiveViewController.isLiveViewEnabled()) {
      console.error('startLiveView, live view is disabled.');
      return;
    }
    QueueLiveViewController.defaultView = await QueueLiveViewController.buildDefaultView();
    try {
      console.info(`Request startLiveView req: ${JSON.stringify(QueueLiveViewController.defaultView)}`);
      const result = await liveViewManager.startLiveView(QueueLiveViewController.defaultView);
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
      id: 3,
      event: "QUEUE",
      sequence: 1,
      timer: {
        time: 0,
        isCountdown: false,
        isPaused: false
      },
      liveViewData: {
        primary: {
          title: "大桌4人等位  32桌",
          content: [
            {
              text: "已等待 "
            },
            { text: "${placeholder.timer}", textColor: QueueLiveViewController.processColor },
            { text: " | 预计还需>30分钟 " }
          ],
          keepTime: 15,
          clickAction: await QueueLiveViewController.buildWantAgent('QueueingUp'),
          extensionData: {
            type: liveViewManager.ExtensionType.EXTENSION_TYPE_ICON,
            pic: 'icon_merchant.png',
            clickAction: await QueueLiveViewController.buildWantAgent('QueueingUp')
          },
          layoutData: {
            layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_PICKUP,
            title: "排队号码",
            content: "B33",
            underlineColor: QueueLiveViewController.underLineColor,
            descPic: 'icon_store.png'
          }
        },
        capsule: {
          type: liveViewManager.CapsuleType.CAPSULE_TYPE_TEXT,
          status: 1,
          icon: 'capsule_store.png',
          backgroundColor: QueueLiveViewController.capsuleColor,
          title: "排队中",
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
  public controller = new QueueLiveViewController();
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
