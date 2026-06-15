# 创建进度可视化模板实况窗

## 概述

进度可视化模板，能够实时展示服务进度，让用户直观地了解订单当前状态。


## 基础实况窗控制器

以下代码来自官方 Demo 示例，展示了完整的实况窗控制器实现：

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
      event: "DELIVERY", // 实况窗的应用场景。DELIVERY：即时配送（外卖、生鲜）
      liveViewData: {
        primary: {
          title: "骑手已接单",
          content: [
            { text: "距商家 " },
            { text: "300 ", textColor: "#FF0A59F7" },
            { text: "米 | " },
            { text: "3 ", textColor: "#FF0A59F7" },
            { text: "分钟到店" }
          ], // 设置textColor字段时，所有拥有textColor字段的对象仅能设置同一种颜色，不设置textColor时，默认展示#FF000000
          keepTime: 15,
          clickAction: await LiveViewController.buildWantAgent(),
          layoutData: {
            layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_PROGRESS,
            progress: 40,
            color: "#FF317AF7",
            backgroundColor: "#f7819ae0",
            indicatorType: liveViewManager.IndicatorType.INDICATOR_TYPE_UP,
            indicatorIcon: "indicator.png", // 进度条指示器图标，取值为"/resources/rawfile"路径下的文件名或image.PixelMap
            lineType: liveViewManager.LineType.LINE_TYPE_DOTTED_LINE,
            nodeIcons: ["icon_1.png", "icon_2.png", "icon_3.png"] // 进度条每个节点图标，取值为"/resources/rawfile"路径下的文件名或image.PixelMap
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

进度可视化模板的 `layoutData` 配置：

```typescript
layoutData: {
    layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_PROGRESS,  // 进度类型
    progress: 40,                                                  // 进度百分比 (0-100)
    color: "#FF317AF7",                                             // 进度条颜色
    backgroundColor: "#f7819ae0",                                   // 进度条背景色
    lineType: liveViewManager.LineType.LINE_TYPE_DOTTED_LINE,       // 连线样式：虚线
    indicatorType: liveViewManager.IndicatorType.INDICATOR_TYPE_UP, // 指示器类型：向上
    indicatorIcon: "indicator.png",                                 // 进度条指示器图标
    nodeIcons: ["icon_1.png", "icon_2.png", "icon_3.png"]          // 进度节点图标数组
}
```

## 配置项说明

| 配置项 | 类型 | 说明 |
|--------|------|------|
| `layoutType` | `LayoutType` | 布局类型，设为 `LAYOUT_TYPE_PROGRESS` 表示进度条模式 |
| `progress` | `number` | 当前进度值，范围 0-100 |
| `color` | `string` | 进度条颜色，如 `#FF317AF7` |
| `backgroundColor` | `string` | 进度条背景色，如 `#f7819ae0` |
| `lineType` | `LineType` | 连线样式：`LINE_TYPE_DOTTED_LINE`（虚线）或 `LINE_TYPE_SOLID_LINE`（实线） |
| `indicatorType` | `IndicatorType` | 指示器类型：`INDICATOR_TYPE_UP`（向上）或 `INDICATOR_TYPE_DOWN`（向下） |
| `indicatorIcon` | `string` | 进度条指示器图标，取值为 `/resources/rawfile` 路径下的文件名或 `image.PixelMap` |
| `nodeIcons` | `string[]` | 进度条每个节点图标数组，取值为 `/resources/rawfile` 路径下的文件名或 `image.PixelMap` |

## 内容文本配置

实况窗内容支持多文本片段组合，可通过 `textColor` 设置不同颜色：

```typescript
content: [
  { text: "距商家 " },                  // 默认黑色 #FF000000
  { text: "300 ", textColor: "#FF0A59F7" },  // 强调色
  { text: "米 | " },                   // 默认黑色
  { text: "3 ", textColor: "#FF0A59F7" },    // 强调色
  { text: "分钟到店" }                  // 默认黑色
]
```

> **注意：** 设置 `textColor` 字段时，所有拥有 `textColor` 字段的对象仅能设置 **同一种颜色**，不设置时默认展示 `#FF000000`。

## 点击行为配置

通过 `clickAction` 配置点击实况窗后跳转的目标页面：

```typescript
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
```

## 使用示例

### 页面初始化

```typescript
import { liveViewManager } from '@kit.LiveViewKit';
import { Want, wantAgent } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';

// 实况窗控制器
export class LiveViewController {
  public async startLiveView(): Promise<liveViewManager.LiveViewResult> {
    if (!await LiveViewController.isLiveViewEnabled()) {
      throw new Error("Live view is disabled.");
    }
    const defaultView = await LiveViewController.buildDefaultView();
    return await liveViewManager.startLiveView(defaultView);
  }

  private static async isLiveViewEnabled(): Promise<boolean> {
    return await liveViewManager.isLiveViewEnabled();
  }

  private static async buildDefaultView(): Promise<liveViewManager.LiveView> {
    return {
      id: 0,
      event: "DELIVERY",
      liveViewData: {
        primary: {
          title: "",
          content: [],
          keepTime: 15,
          clickAction: await LiveViewController.buildWantAgent(),
          layoutData: {
            layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_PROGRESS,
            progress: 0,
            color: "",
            backgroundColor: "",
            indicatorType: liveViewManager.IndicatorType.INDICATOR_TYPE_UP,
            indicatorIcon: "",
            lineType: liveViewManager.LineType.LINE_TYPE_NORMAL_SOLID_LINE,
            nodeIcons: []
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
struct DeliveryPage {
  aboutToAppear(): void {
    // 初始化页面
  }

  onPageShow(): void {
    // 启动实况窗
    try {
      const controller = new LiveViewController();
      controller.startLiveView();
    } catch (e) {
      const err: BusinessError = e as BusinessError;
      console.error('Failed to start live view: %{public}d %{public}s', err.code, err.message);
    }
  }

  build(): void {
    Column() {
      Text("配送实况窗")
    }
    .width('100%')
    .height('100%')
  }
}
```

---

*文档版本：1.   
*最后更新：2026-05-15*