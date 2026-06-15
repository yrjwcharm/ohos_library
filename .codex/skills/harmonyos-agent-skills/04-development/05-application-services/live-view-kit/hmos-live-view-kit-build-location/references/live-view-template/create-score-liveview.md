# 创建实况窗赛事比分文本模板

## 概述

赛事比分模板，通过左右对比展示两支队伍/选手的实时比分数据，让用户快速了解赛事进展。

## 基础实况窗控制器

以下代码来自官方 Demo 示例，展示了赛事比分场景的实现：

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
      event: "SCORE", // 实况窗的应用场景。SCORE：赛事比分。
      liveViewData: {
        primary: {
          title: "第四节比赛中",
          content: [
            { text: "XX", textColor:"#FF0A59F7" },
            { text: " VS " },
            { text: "XX", textColor:"#FF0A59F7" },
            { text: " | " },
            { text: "小组赛 第五场", textColor:"#FF0A59F7" }
          ],
          keepTime: 1,
          clickAction: await LiveViewController.buildWantAgent(),
          layoutData: {
            layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_SCORE,
            hostName: "队名A",
            hostIcon: "host.png", // 扩展区左侧图标，取值为"/resources/rawfile"路径下的文件名或image.PixelMap
            hostScore: "110",
            guestName: "队名B",
            guestIcon: "guest.png", // 扩展区右侧图标，取值为"/resources/rawfile"路径下的文件名或image.PixelMap
            guestScore: "102",
            competitionDesc: [
              { text: "●", textColor: "#FFFF0000" },
              { text: "Q4" }
            ],
            competitionTime: "02:16",
            isHorizontalLineDisplayed: true
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

赛事比分模板的 `layoutData` 配置：

```typescript
layoutData: {
    layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_SCORE,  // 赛事比分模板类型
    hostName: "队名A",                                        // 主队名称
    hostIcon: "host.png",                                      // 主队图标
    hostScore: "110",                                          // 主队得分
    guestName: "队名B",                                        // 客队名称
    guestIcon: "guest.png",                                    // 客队图标
    guestScore: "102",                                         // 客队得分
    competitionDesc: [                                         // 比赛描述（节次/半场等）
        { text: "●", textColor: "#FFFF0000" },
        { text: "Q4" }
    ],
    competitionTime: "02:16",                                  // 比赛时间
    isHorizontalLineDisplayed: true                             // 是否显示水平分割线
}
```

## 配置项说明

| 配置项 | 类型 | 说明 |
|--------|------|------|
| `layoutType` | `LayoutType` | 布局类型，设为 `LAYOUT_TYPE_SCORE` 表示赛事比分模式 |
| `hostName` | `string` | 主队/主队名称 |
| `hostIcon` | `string` | 主队图标，取值为 `/resources/rawfile` 路径下的文件名或 `image.PixelMap` |
| `hostScore` | `string` | 主队当前得分 |
| `guestName` | `string` | 客队/对手名称 |
| `guestIcon` | `string` | 客队图标，取值为 `/resources/rawfile` 路径下的文件名或 `image.PixelMap` |
| `guestScore` | `string` | 客队当前得分 |
| `competitionDesc` | `Array` | 比赛描述，如节次、半场信息 |
| `competitionTime` | `string` | 比赛时间 |
| `isHorizontalLineDisplayed` | `boolean` | 是否显示水平分割线 |

## 赛事比分模板布局效果

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   队名A (host.png)    110    ● Q4    102    队名B (guest.png)   │
│                                                     │
│                       02:16                          │
│                                                     │
│  ─────────────────────────────────────────────────  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 使用示例

### 页面初始化

构建 `LiveViewController` 后，请在代码中初始化 `LiveViewController` 并调用 `LiveViewController.startLiveView()` 方法。

```typescript
import { LiveViewController } from '../utils/LiveViewController';

@Entry
@Component
struct ScorePage {
    onPageShow(): void {
        // 启动赛事比分实况窗
        LiveViewController.startLiveView();
    }
}
```

## 扩展示例：篮球比赛

```typescript
// 篮球比赛场景的赛事比分模板
layoutData: {
    layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_SCORE,
    hostName: "湖人队",
    hostIcon: "lakers.png",
    hostScore: "98",
    guestName: "勇士队",
    guestIcon: "warriors.png",
    guestScore: "95",
    competitionDesc: [
        { text: "●", textColor: "#FFFF0000" },
        { text: "Q4" }
    ],
    competitionTime: "05:32",
    isHorizontalLineDisplayed: true
}
```

---

*文档版本：1.0*  
*最后更新：2026-05-14*