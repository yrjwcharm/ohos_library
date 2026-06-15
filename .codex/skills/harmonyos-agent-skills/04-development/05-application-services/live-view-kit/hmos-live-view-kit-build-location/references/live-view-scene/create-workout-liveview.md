# 运动锻炼实况窗

## 基本概念

运动锻炼场景用于跑步、健身等运动数据实时展示。

## 场景介绍

- 跑步/骑行数据
- 健身训练计时
- 运动目标进度

**支持创建、更新、结束操作**

## 业务基本流程

1. 开始运动 → 创建实况窗
2. 运动中 → 更新数据/计时
3. 暂停/继续 → 更新状态
4. 运动结束 → 结束实况窗

## 示例代码

```typescript
import { liveViewManager } from '@kit.LiveViewKit';
import { common, Want, wantAgent, WantAgent } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';

// todo 实况窗更新节点/阶段/状态，更新或者结束的时候可以调用此枚举对更新状态进行赋值
enum LiveViewStatus {
  WORKOUT_START = 1, //start exercising
  WORKOUT_PROCESS_ONE = 2, //process one
  WORKOUT_PROCESS_TWO = 3, //process two
  WORKOUT_PROCESS_THREE = 4, //process three
  WORKOUT_END = 5, //end of exercise
}

export class WorkoutLiveViewController {
  private static defaultView: liveViewManager.LiveView | undefined = undefined;
  private static processColor: string = '#ff10c1f7';
  private static capsuleColor: string = '#FF308977';
  private static underLineColor: string = '#FF0A59F7';
  private static sequence: number = 1;

  public async startLiveView(): Promise<void> {
    if (!await WorkoutLiveViewController.isLiveViewEnabled()) {
      console.warn('startLiveView, live view is disabled.')
      return;
    }
    WorkoutLiveViewController.sequence = 1;
    WorkoutLiveViewController.defaultView = await WorkoutLiveViewController.buildDefaultView();
    try {
      console.info(`Request startLiveView req: ${JSON.stringify(WorkoutLiveViewController.defaultView)}`);
      const result = await liveViewManager.startLiveView(WorkoutLiveViewController.defaultView);
      console.info(`Request startLiveView result: ${JSON.stringify(result)}`);
    } catch (e) {
      const err: BusinessError = e as BusinessError;
      console.error(`Request startLiveView error: ${err.message}`);
    }
  }

  public async updateLiveView(): Promise<boolean> {
    // todo updateLiveView 方法用于更新实况窗内容，需要根据业务需求修改对应字段
    console.info('updateLiveView start');
    try {
      if (!WorkoutLiveViewController.defaultView) {
        console.warn('updateLiveView, live view is disabled.')
        return false;
      }
      console.info(`updateLiveView, id: ${WorkoutLiveViewController.defaultView.id}`);
      console.info('updateLiveView, get active live view succeed.');
      if (WorkoutLiveViewController.defaultView.sequence) {
        // todo sequence字段需要递增以触发更新
        WorkoutLiveViewController.defaultView.sequence += 1;
        WorkoutLiveViewController.sequence += 1;
      }
      switch (WorkoutLiveViewController.sequence) {
        case LiveViewStatus.WORKOUT_START:
          // todo 所有需要更新的字段需要手动更改添加，这里只是示例用法
          // todo title字段内容需要替换为业务实际内容，主区域标题
          WorkoutLiveViewController.defaultView.liveViewData.primary.title = "运动中";
          // todo content字段内容需要替换为业务实际内容，主区域内容数组
          WorkoutLiveViewController.defaultView.liveViewData.primary.content = [
            { text: "剩余距离" },
            { text: " 2km", textColor: WorkoutLiveViewController.processColor },
            { text: ' | ' },
            { text: "运动目标" },
            { text: " 2km", textColor: WorkoutLiveViewController.processColor }
          ];
          // todo timer字段内容需要替换为业务实际内容，计时器配置
          WorkoutLiveViewController.defaultView.timer = { isPaused: false };
          // todo capsule字段内容需要替换为业务实际内容，胶囊区域配置
          WorkoutLiveViewController.defaultView.liveViewData.capsule = {
            type: liveViewManager.CapsuleType.CAPSULE_TYPE_TIMER,
            status: 1,
            isPaused: false,
          }
          break;
        case LiveViewStatus.WORKOUT_PROCESS_ONE:
          // todo 所有需要更新的字段需要手动更改添加，这里只是示例用法
          // todo content字段内容需要替换为业务实际内容，主区域内容数组
          WorkoutLiveViewController.defaultView.liveViewData.primary.content = [
            { text: "剩余距离" },
            { text: " 1.5km", textColor: WorkoutLiveViewController.processColor },
            { text: ' | ' },
            { text: "运动目标" },
            { text: " 2km", textColor: WorkoutLiveViewController.processColor }
          ];
          break;
        case LiveViewStatus.WORKOUT_PROCESS_TWO:
          // todo 所有需要更新的字段需要手动更改添加，这里只是示例用法
          // todo content字段内容需要替换为业务实际内容，主区域内容数组
          WorkoutLiveViewController.defaultView.liveViewData.primary.content = [
            { text: "剩余距离" },
            { text: " 1km", textColor: WorkoutLiveViewController.processColor },
            { text: ' | ' },
            { text: "运动目标" },
            { text: " 2km", textColor: WorkoutLiveViewController.processColor }
          ];
          break;
        case LiveViewStatus.WORKOUT_PROCESS_THREE:
          // todo 所有需要更新的字段需要手动更改添加，这里只是示例用法
          // todo content字段内容需要替换为业务实际内容，主区域内容数组
          WorkoutLiveViewController.defaultView.liveViewData.primary.content = [
            { text: "剩余距离" },
            { text: " 0.5km", textColor: WorkoutLiveViewController.processColor },
            { text: ' | ' },
            { text: "运动目标" },
            { text: " 2km", textColor: WorkoutLiveViewController.processColor }
          ];
          break;
        case LiveViewStatus.WORKOUT_END:
          await this.stopLiveView();
          return false;
        default:
          await this.stopLiveView();
          return false;
      }
      console.info(`Request updateLiveView req: ${JSON.stringify(WorkoutLiveViewController.defaultView)}`);
      const result = await liveViewManager.updateLiveView(WorkoutLiveViewController.defaultView);
      console.info(`Request updateLiveView result: ${JSON.stringify(result)}`);
      return true;
    } catch (e) {
      const err: BusinessError = e as BusinessError;
      console.error(`Request updateLiveView error: ${err.message}`);
      return false;
    }
  }

  public async stopLiveView(): Promise<void> {
    // todo stopLiveView 方法用于结束实况窗，需要根据业务需求修改对应字段
    try {
      if (!await WorkoutLiveViewController.isLiveViewEnabled() || !WorkoutLiveViewController.defaultView) {
        console.warn('stopLiveView, live view is disabled.')
        return;
      }
      console.info('stopLiveView, get active live view succeed.');
      if (WorkoutLiveViewController.defaultView.sequence) {
        // todo sequence字段需要递增以触发更新
        WorkoutLiveViewController.defaultView.sequence += 1;
      }
      // todo title字段内容需要替换为业务实际内容，主区域标题
      WorkoutLiveViewController.defaultView.liveViewData.primary.title = "运动结束";
      // todo content字段内容需要替换为业务实际内容，主区域内容数组
      WorkoutLiveViewController.defaultView.liveViewData.primary.content = [
        { text: "已完成目标" },
        { text: " 2km", textColor: WorkoutLiveViewController.processColor }
      ];
      // todo timer字段内容需要替换为业务实际内容，计时器配置
      WorkoutLiveViewController.defaultView.timer = { isPaused: true };
      // todo capsule字段内容需要替换为业务实际内容，胶囊区域配置
      WorkoutLiveViewController.defaultView.liveViewData.capsule = {
        type: liveViewManager.CapsuleType.CAPSULE_TYPE_TIMER,
        status: 1,
        isPaused: true,
      }
      console.info(`Request stopLiveView req: ${JSON.stringify(WorkoutLiveViewController.defaultView)}`);
      const result = await liveViewManager.stopLiveView(WorkoutLiveViewController.defaultView);
      console.info(`Request stopLiveView result: ${JSON.stringify(result)}`);
    } catch (e) {
      const err: BusinessError = e as BusinessError;
      console.error(`Request stopLiveView error: ${err.message}`);
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
      id: 9,
      event: "WORKOUT",
      sequence: LiveViewStatus.WORKOUT_START,
      isMute: false,
      timer: {
        time: 0,
        isCountdown: false,
        isPaused: false
      },
      liveViewData: {
        primary: {
          title: "运动中",
          content: [
            { text: "剩余距离" },
            { text: " 2km", textColor: WorkoutLiveViewController.processColor },
            { text: ' | ' },
            { text: "运动目标" },
            { text: " 2km", textColor: WorkoutLiveViewController.processColor }
          ],
          keepTime: 15,
          clickAction: await WorkoutLiveViewController.buildWantAgent('Workout'),
          extensionData: {
            type: liveViewManager.ExtensionType.EXTENSION_TYPE_ICON,
            pic: 'sport_extension.png',
            clickAction: await WorkoutLiveViewController.buildWantAgent('Workout')
          },
          layoutData: {
            layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_PICKUP,
            title: "运动时长",
            content: "${placeholder.timer}",
            underlineColor: WorkoutLiveViewController.underLineColor,
            descPic: 'workout.png'
          }
        },
        capsule: {
          type: liveViewManager.CapsuleType.CAPSULE_TYPE_TIMER,
          status: 1,
          icon: 'workout.png',
          backgroundColor: WorkoutLiveViewController.capsuleColor,
          time: 0,
          isCountdown: false,
          isPaused: false,
        },
        // todo externalData字段内容需要替换为业务实际内容，扩展数据
        external: {
          // todo title字段内容需要替换为业务实际内容，外屏标题
          title: "外屏标题",
          // todo content字段内容需要替换为业务实际内容，外屏内容数组（必须为数组类型）
          content: [],
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
  public controller = new WorkoutLiveViewController();
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
      Text("更新运动健康实况窗")
        .onClick(()=>{
          this.controller.updateLiveView();
        })
      Text("结束运动健康实况窗")
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

- 跑步/骑行实时数据
- 健身房训练计数
- 游泳计时
- 瑜伽/普拉提课程
- 运动间歇提醒
- 训练目标完成
