# 创建实况窗左右文本模板

## 概述

左右文本模板，通过左右对比展示出发地和目的地的关键信息（如时间、地点），让用户快速了解行程概况。

## 基础实况窗控制器

以下代码来自官方 Demo 示例，展示了航班/高铁场景的左右文本模板实现：

```typescript

import { liveViewManager } from '@kit.LiveViewKit';
import { Want, wantAgent } from '@kit.AbilityKit';

export class LiveViewController {
  public async startLiveView(): Promise<liveViewManager.LiveViewResult> {
    // 校验实况窗开关是否打开
    if (!await LiveViewController.isLiveViewEnabled()) {
      throw new Error("Live view is disabled.");
    }
    // 创建实况窗
    const defaultView = await LiveViewController.buildDefaultView();
    return await liveViewManager.startLiveView(defaultView);
  }

  private static async buildDefaultView(): Promise<liveViewManager.LiveView> {
    return {
      // 构造实况窗请求体
      id: 0, // 实况窗ID，开发者生成。
      event: "TRAIN", // 实况窗的应用场景。TRAIN：高铁/火车。
      liveViewData: {
        primary: {
          title: "列车检票提醒",
          content: [
            { text: "检票口 " },
            { text: "6B ", textColor: "#FF0A59F7" },
            { text: "| 座位 " },
            { text: "03车 12F", textColor: "#FF0A59F7" }
          ], // 设置textColor字段时，所有拥有textColor字段的对象仅能设置同一种颜色，不设置textColor时，默认展示#FF000000
          keepTime: 15,
          clickAction: await LiveViewController.buildWantAgent(), // 点击实况窗默认动作。
          layoutData: {
            layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_FLIGHT,
            firstTitle: "09:00",
            firstContent: "上海虹桥",
            lastTitle: "14:20",
            lastContent: "汉口",
            spaceIcon: "icon.png", // 扩展区中间间隔图标，取值为“/resources/rawfile”路径下的文件名或image.PixelMap
            isHorizontalLineDisplayed: true,
            additionalText: "以上信息仅供参考" // 扩展区底部内容，仅可用于左右文本模板。
          }
        }
      }
    };
  }

  private static async isLiveViewEnabled(): Promise<boolean> {
    return await liveViewManager.isLiveViewEnabled();
  }

  private static async buildWantAgent(): Promise<Want> {
    const wantAgentInfo: wantAgent.WantAgentInfo = {
      wants: [
        {
          //todo 此处应改为业务实际应用包名
          bundleName: 'com.xxx.app',
          //todo 此处应改为实际业务窗口名称
          abilityName: 'EntryAbility'
        } as Want
      ],
      actionType: wantAgent.OperationType.START_ABILITIES,
      requestCode: 0,
      actionFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
    };
    const agent = await wantAgent.getWantAgent(wantAgentInfo);
    return agent;
  }
}

```

## 布局配置说明

左右文本模板的 `layoutData` 配置：

```typescript
layoutData: {
    layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_FLIGHT,  // 左右文本模板类型
    firstTitle: "08:00",                                        // 左侧标题（出发时间）
    firstContent: "北京首都",                                    // 左侧内容（出发地点）
    lastTitle: "10:30",                                          // 右侧标题（到达时间）
    lastContent: "上海浦东",                                      // 右侧内容（到达地点）
    spaceIcon: "icon_plane.png",                                 // 中间图标
    isHorizontalLineDisplayed: false,                            // 是否显示水平分割线
    additionalText: "扩展区底部内容"                              // 扩展区底部内容
}
```

## 配置项说明

| 配置项 | 类型 | 说明 |
|--------|------|------|
| `layoutType` | `LayoutType` | 布局类型，设为 `LAYOUT_TYPE_FLIGHT` 表示左右文本模式 |
| `firstTitle` | `string` | 左侧标题，通常是出发时间 |
| `firstContent` | `string` | 左侧内容，通常是出发地点 |
| `lastTitle` | `string` | 右侧标题，通常是到达时间 |
| `lastContent` | `string` | 右侧内容，通常是到达地点 |
| `spaceIcon` | `string` | 中间连接图标，如飞机或火车图标 |
| `isHorizontalLineDisplayed` | `boolean` | 是否显示水平分割线 |
| `additionalText` | `string` | 扩展区底部内容（仅用于左右文本模板） |

## 左右文本模板布局效果

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   08:00          ✈️          10:30                │
│  北京首都                    上海浦东               │
│                                                     │
│  ─────────────────────────────────────────────────  │
│  扩展区底部内容                                      │
│                                                     │
└─────────────────────────────────────────────────────┘
        firstTitle          spaceIcon    lastTitle
        firstContent                   lastContent
                        additionalText
```

## 高铁场景示例

```typescript
// 高铁场景的左右文本模板
layoutData: {
    layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_FLIGHT,
    firstTitle: TrainLiveViewController.trainStartTime,   // 发车时间
    firstContent: await TrainLiveViewController.resourceManager
        .getStringValue($r("app.string.Depart_layout_first_content")),  // 出发站
    lastTitle: TrainLiveViewController.trainStopTime,     // 到站时间
    lastContent: await TrainLiveViewController.resourceManager
        .getStringValue($r("app.string.Depart_layout_last_content")),   // 到达站
    spaceIcon: "capsule_train.png",                        // 火车图标
    isHorizontalLineDisplayed: false,
    additionalText: await TrainLiveViewController.resourceManager
        .getStringValue($r("app.string.Depart_layout_text"))  // 扩展区内容
}
```

## 使用示例

### 页面初始化

```typescript
import { liveViewManager } from '@kit.LiveViewKit';
import { Want, wantAgent } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';

// 航班实况窗控制器
export class FlightLiveViewController {
  private static defaultView: liveViewManager.LiveView | undefined = undefined;
  public static flightStartTime: string = "";
  public static flightStopTime: string = "";

  public static async init(resourceManager: resourceManager.ResourceManager): Promise<void> {
    // 初始化资源管理器
  }

  public static async startLiveView(): Promise<void> {
    if (!await this.isLiveViewEnabled()) {
      console.info('Live view is disabled');
      return;
    }
    const view = await this.buildLeftRightView();
    FlightLiveViewController.defaultView = view;
    await liveViewManager.startLiveView(view);
  }

  public static async updateLiveView(): Promise<void> {
    if (!FlightLiveViewController.defaultView) {
      return;
    }
    await liveViewManager.updateLiveView(FlightLiveViewController.defaultView);
  }

  public static async stopLiveView(): Promise<void> {
    if (!FlightLiveViewController.defaultView) {
      return;
    }
    await liveViewManager.stopLiveView(FlightLiveViewController.defaultView);
    FlightLiveViewController.defaultView = undefined;
  }

  private static async isLiveViewEnabled(): Promise<boolean> {
    return await liveViewManager.isLiveViewEnabled();
  }

  private static async buildLeftRightView(): Promise<liveViewManager.LiveView> {
    return {
      id: 0,
      event: "FLIGHT",
      liveViewData: {
        primary: {
          title: "",
          content: [],
          keepTime: 15,
          clickAction: await FlightLiveViewController.buildWantAgent(),
          layoutData: {
            layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_LEFT_RIGHT,
            title: "",
            firstTitle: "",
            lastTitle: "",
            lastContent: "",
            spaceIcon: "",
            isHorizontalLineDisplayed: true,
            additionalText: ""
          }
        },
        capsule: {
          type: liveViewManager.CapsuleType.CAPSULE_TYPE_TEXT,
          status: 0,
          icon: "",
          backgroundColor: "",
          title: ""
        }
      }
    };
  }

  private static async buildWantAgent(): Promise<Want> {
    const wantAgentInfo: wantAgent.WantAgentInfo = {
      wants: [
        {
          //todo 此处应改为业务实际应用包名
          bundleName: 'com.xxx.app',
          //todo 此处应改为实际业务窗口名称
          abilityName: 'EntryAbility'
        } as Want
      ],
      actionType: wantAgent.OperationType.START_ABILITIES,
      requestCode: 0,
      actionFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
    };
    const agent = await wantAgent.getWantAgent(wantAgentInfo);
    return agent;
  }
}

@Entry
@Component
struct FlightPage {
  aboutToAppear(): void {
    // 初始化实况窗控制器
    FlightLiveViewController.init(getContext(this).resourceManager);
  }

  onPageShow(): void {
    // 设置航班时间
    FlightLiveViewController.flightStartTime = "08:00";
    FlightLiveViewController.flightStopTime = "10:30";
    
    // 启动实况窗
    FlightLiveViewController.startLiveView();
  }

  build(): void {
    Column() {
      Text("航班出行实况窗")
    }
    .width('100%')
    .height('100%')
  }
}
```

---

*文档版本：1.0*  
*最后更新：2026-05-15*