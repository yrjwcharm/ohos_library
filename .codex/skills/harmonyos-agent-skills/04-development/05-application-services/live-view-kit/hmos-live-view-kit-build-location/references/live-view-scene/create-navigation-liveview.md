# 导航实况窗

## 基本概念

导航场景用于行车、步行、骑行等导航指引实时展示。

## 场景介绍

- 行车导航指引
- 步行/骑行导航
- 偏航重新规划
- 到达提醒

**支持创建、更新、结束操作**

## 业务基本流程

1. 开始导航 → 创建实况窗
2. 导航中 → 更新转向信息
3. 偏航重规划 → 更新路线
4. 到达目的地 → 结束实况窗

## 示例代码

```typescript
import { liveViewManager } from '@kit.LiveViewKit';
import { common, Want, wantAgent, WantAgent } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';

// todo 实况窗更新节点/阶段/状态，更新或者结束的时候可以调用此枚举对更新状态进行赋值
enum LiveViewStatus {
  NAVIGATION_START = 1, //navigation begins
  GUIDE_OME = 2, //guided one
  ROUTE_CHANGE = 3, //route change
  GUIDE_TWO = 4, //guided two
  NAVIGATION_END = 5, //navigation ends
}

export class NavigationLiveViewController {
  private static defaultView: liveViewManager.LiveView | undefined = undefined;
  private static contentColor: string = '#FF0A59F7';
  private static capsuleColor: string = '#FF308977';

  public async startLiveView(): Promise<void> {
    if (!await NavigationLiveViewController.isLiveViewEnabled()) {
      console.warn('startLiveView, live view is disabled.')
      return;
    }
    NavigationLiveViewController.defaultView = await NavigationLiveViewController.buildDefaultView();
    try {
      console.info('Request startLiveView req: ', JSON.stringify(NavigationLiveViewController.defaultView));
      const result = await liveViewManager.startLiveView(NavigationLiveViewController.defaultView);
      console.info('Request startLiveView result: ', JSON.stringify(result));
    } catch (e) {
      const err: BusinessError = e as BusinessError;
      console.error('Request startLiveView error: ', err.code, err.message);
    }
  }

  public async updateLiveView(sequenceNumber: LiveViewStatus): Promise<boolean> {
    console.info('updateLiveView start');
    try {
      if (!NavigationLiveViewController.defaultView) {
        console.warn('updateLiveView, live view is disabled.')
        return false;
      }
      console.info('updateLiveView, id: %{public}d', NavigationLiveViewController.defaultView.id);
      console.info('updateLiveView, get active live view succeed.');
      NavigationLiveViewController.defaultView.sequence = sequenceNumber;
      switch (NavigationLiveViewController.defaultView.sequence) {
        case LiveViewStatus.GUIDE_OME:
          NavigationLiveViewController.defaultView.liveViewData.primary.title = "300米后直行";
          NavigationLiveViewController.defaultView.liveViewData.primary.layoutData = {
            layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_NAVIGATION,
            currentNavigationIcon: "arrow_up.png",
            navigationIcons: ["arrow_left.png", "arrow_up.png", "arrow_up.png", "arrow_right.png"]
          }
          NavigationLiveViewController.defaultView.liveViewData.capsule = {
            type: liveViewManager.CapsuleType.CAPSULE_TYPE_TEXT,
            status: 1,
            icon: 'capsule_up.png',
            backgroundColor: NavigationLiveViewController.capsuleColor,
            title: "300 米",
          }
          break;
        case LiveViewStatus.ROUTE_CHANGE:
          NavigationLiveViewController.defaultView.liveViewData.primary.title = "500米后右转";
          NavigationLiveViewController.defaultView.liveViewData.primary.content = [
            { text: "重新规划路线 | 去往南京南路" }
          ];
          NavigationLiveViewController.defaultView.liveViewData.primary.layoutData = {
            layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_NAVIGATION,
            currentNavigationIcon: "arrow_right.png",
            navigationIcons: ["arrow_left.png", "arrow_up.png", "arrow_right.png"]
          }
          NavigationLiveViewController.defaultView.liveViewData.capsule = {
            type: liveViewManager.CapsuleType.CAPSULE_TYPE_TEXT,
            status: 1,
            icon: 'capsule_right.png',
            backgroundColor: NavigationLiveViewController.capsuleColor,
            title: "500 米",
          }
          break;
        case LiveViewStatus.NAVIGATION_END:
          await this.stopLiveView();
          return false;
        default:
          await this.stopLiveView();
          return false;
      }
      console.info(`Request updateLiveView req: ${JSON.stringify(NavigationLiveViewController.defaultView)}`);
      const result = await liveViewManager.updateLiveView(NavigationLiveViewController.defaultView);
      console.info(`Request updateLiveView result: ${JSON.stringify(result)}`);
      return true;
    } catch (e) {
      const err: BusinessError = e as BusinessError;
      console.error(`Request updateLiveView error: ${err.code} ${err.message}`);
      return false;
    }
  }

  public async stopLiveView(): Promise<void> {
    try {
      if (!await NavigationLiveViewController.isLiveViewEnabled() || !NavigationLiveViewController.defaultView) {
        console.warn('stopLiveView, live view is disabled.')
        return;
      }
      console.info('stopLiveView, get active live view succeed.');
      if (NavigationLiveViewController.defaultView.sequence) {
        NavigationLiveViewController.defaultView.sequence += 1;
      }
      NavigationLiveViewController.defaultView.liveViewData.primary.title = "导航结束";
      NavigationLiveViewController.defaultView.liveViewData.primary.content = [
        { text: "祝您一路顺风", }
      ]
      NavigationLiveViewController.defaultView.liveViewData.primary.layoutData = {
        layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_DEFAULT
      }
      console.info(`Request stopLiveView req: ${JSON.stringify(NavigationLiveViewController.defaultView)}`);
      const result = await liveViewManager.stopLiveView(NavigationLiveViewController.defaultView);
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

  private static async buildDefaultView(): Promise<liveViewManager.LiveView> {
    return {
      id: 5,
      event: "NAVIGATION",
      sequence: LiveViewStatus.NAVIGATION_START,
      isMute: false,
      liveViewData: {
        primary: {
          title: "178米后左转",
          content: [
            { text: "去往 " },
            { text: "南京东路", textColor: NavigationLiveViewController.contentColor }
          ],
          keepTime: 15,
          clickAction: await NavigationLiveViewController.buildWantAgent('Navigation'),
          layoutData: {
            layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_NAVIGATION,
            currentNavigationIcon: "arrow_left.png",
            navigationIcons: ["arrow_left.png", "arrow_up.png", "arrow_up.png", "arrow_right.png"]
          }
        },
        capsule: {
          type: liveViewManager.CapsuleType.CAPSULE_TYPE_TEXT,
          status: 1,
          icon: 'capsule_left.png',
          backgroundColor: NavigationLiveViewController.capsuleColor,
          title: "178 米",
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
          parameters: { page: page },
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
  public controller = new NavigationLiveViewController();
  aboutToAppear(): void {
    try {
      this.controller.startLiveView().then((result: void) => {
        console.info('Delivery live view started successfully');
      }).catch((e: BusinessError) => {
        console.error('Failed to start delivery live view: ', e.code, e.message);
      });
    } catch (e) {
      const err: BusinessError = e as BusinessError;
      console.error('Error: ', err.code, err.message);
    }
  }

  build(): void {
    Column() {
      Text("更新导航实况窗")
        .onClick(()=>{
          this.controller.updateLiveView(LiveViewStatus.ROUTE_CHANGE);
        })
      Text("结束导航实况窗")
        .onClick(()=>{
          this.controller.stopLiveView();
        })
    }
    .width('100%')
    .height('100%')
  }
}
```

## 适用场景

- 行车导航指引
- 步行/骑行导航
- 高速路况提醒
- 偏航重新规划
- 到达目的地提醒
