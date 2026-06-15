# 创建实况窗导航文本模板

## 概述

导航文本模板，通过展示导航指示图标（如方向箭头），帮助用户在行车过程中快速识别导航方向变化。

## 快速创建：LiveViewCapsule 工具类

> **推荐做法**：使用 `LiveViewCapsule` 工具类获取导航场景胶囊配置，参考 `create-capsule-liveview.md` 文档。

```typescript
import { LiveViewCapsule } from '../components/LiveViewCapsule';

// 获取导航胶囊配置
const capsule = LiveViewCapsule.getNavigationCapsule('left'); // 左转
const capsule = LiveViewCapsule.getNavigationCapsule('straight'); // 直行
const capsule = LiveViewCapsule.getNavigationCapsule('right'); // 右转
```

## 基础实况窗控制器

以下代码来自官方 Demo 示例，展示了导航场景的导航文本模板实现：

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
      event: "NAVIGATION", // 实况窗的应用场景。NAVIGATION：导航。
      liveViewData: {
        primary: {
          title: "178米后左转",
          content: [
            { text: "去往"},
            { text: " 南京东路", textColor: "#FF0A59F7" }
          ],
          keepTime: 15,
          clickAction: await LiveViewController.buildWantAgent(),
          layoutData: {
            layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_NAVIGATION,
            currentNavigationIcon: "navigation.png", // 当前导航方向，取值为"/resources/rawfile"路径下的文件名或image.PixelMap
            navigationIcons: ["left.png","straight.png","straight.png","right.png"] // 导航方向的箭头集合图片，每个元素取值为"/resources/rawfile"路径下的文件名或image.PixelMap
          }
        }
      }
    };
  },

  private static async isLiveViewEnabled(): Promise<boolean> {
    return await liveViewManager.isLiveViewEnabled();
  },

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
      actionFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG],
    };
    const agent = await wantAgent.getWantAgent(wantAgentInfo);
    return agent;
  }
}
```

## 布局配置说明

导航文本模板的 `layoutData` 配置：

```typescript
layoutData: {
    layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_NAVIGATION,  // 导航模板类型
    currentNavigationIcon: "arrow_left.png",                        // 当前导航图标
    navigationIcons: [
        "arrow_left.png",    // 路线节点1
        "arrow_up.png",      // 路线节点2
        "arrow_up.png",      // 路线节点3
        "arrow_right.png"    // 路线节点4
    ]                        // 导航图标数组
}
```

## 配置项说明

| 配置项 | 类型 | 说明 |
|--------|------|------|
| `layoutType` | `LayoutType` | 布局类型，设为 `LAYOUT_TYPE_NAVIGATION` 表示导航模式 |
| `currentNavigationIcon` | `string` | 当前导航图标，指示用户当前应前进的方向 |
| `navigationIcons` | `string[]` | 导航图标数组，展示完整路线的转向节点 |

## 导航图标说明

| 图标 | 说明 | 使用场景 |
|------|------|----------|
| `arrow_left.png` | 向左箭头 | 左转提示 |
| `arrow_up.png` | 向上箭头 | 直行提示 |
| `arrow_right.png` | 向右箭头 | 右转提示 |
| `arrow_down.png` | 向下箭头 | 掉头提示 |

## 导航状态说明

| 状态 | 枚举值 | 说明 |
|------|--------|------|
| 导航开始 | `NAVIGATION_START = 1` | 开始导航时的状态 |
| 导航引导1 | `GUIDE_OME = 2` | 第一个导航引导点 |
| 路线变化 | `ROUTE_CHANGE = 3` | 路线重新规划时 |
| 导航引导2 | `GUIDE_TWO = 4` | 第二个导航引导点 |
| 导航结束 | `NAVIGATION_END = 5` | 导航结束时 |

## 导航胶囊说明

导航场景推荐使用 `LiveViewCapsule.getNavigationCapsule()` 方法获取胶囊配置：

| 方向 | 胶囊标题 | 图标文件 | 胶囊背景色 |
|------|----------|----------|------------|
| `left` | 向左转 | `capsule_left.png` | `#FF308977` |
| `straight` | 直行 | `capsule_up.png` | `#FF308977` |
| `right` | 向右转 | `capsule_right.png` | `#FF308977` |

## 导航模板布局效果

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   路线规划                                          │
│                                                     │
│  ←────── ↑ ────── ↑ ────── →                       │
│   arrow   arrow   arrow    arrow                    │
│   _left   _up     _up     _right                    │
│                                                     │
│  ┌─────────────────────────────────────┐           │
│  │  ◀ 导航中                           │           │
│  └─────────────────────────────────────┘           │
│                                                     │
└─────────────────────────────────────────────────────┘
  navigationIcons[]
```

## 使用示例

### 页面初始化

```typescript
import { liveViewManager } from '@kit.LiveViewKit';
import { Want, wantAgent } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';

// 导航实况窗控制器
export class NavigationLiveViewController {
  private static defaultView: liveViewManager.LiveView | undefined = undefined;

  public static async startLiveView(): Promise<void> {
    if (!await this.isLiveViewEnabled()) {
      console.info('Live view is disabled');
      return;
    }
    const view = await this.buildNavigationView();
    NavigationLiveViewController.defaultView = view;
    await liveViewManager.startLiveView(view);
  }

  public static async updateLiveView(): Promise<void> {
    if (!NavigationLiveViewController.defaultView) {
      return;
    }
    await liveViewManager.updateLiveView(NavigationLiveViewController.defaultView);
  }

  public static async stopLiveView(): Promise<void> {
    if (!NavigationLiveViewController.defaultView) {
      return;
    }
    await liveViewManager.stopLiveView(NavigationLiveViewController.defaultView);
    NavigationLiveViewController.defaultView = undefined;
  }

  private static async isLiveViewEnabled(): Promise<boolean> {
    return await liveViewManager.isLiveViewEnabled();
  }

  private static async buildNavigationView(): Promise<liveViewManager.LiveView> {
    return {
      id: 0,
      event: "NAVIGATION",
      liveViewData: {
        primary: {
          title: "",
          content: [],
          keepTime: 15,
          clickAction: await NavigationLiveViewController.buildWantAgent(),
          layoutData: {
            layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_NAVIGATION,
            title: "",
            navigationIcons: []
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
struct NavigationPage {
  aboutToAppear(): void {
    // 初始化页面
  }

  onPageShow(): void {
    // 启动导航实况窗
    NavigationLiveViewController.startLiveView();
  }

  onPageHide(): void {
    // 页面隐藏时结束导航
    NavigationLiveViewController.stopLiveView();
  }

  build(): void {
    Column() {
      Text("导航实况窗")
    }
    .width('100%')
    .height('100%')
  }
}
```

### 模拟导航状态更新

```typescript
// 模拟导航状态更新
private simulateNavigation() {
    // 导航开始
    NavigationLiveViewController.startLiveView();
    
    // 模拟引导点1
    setTimeout(() => {
        NavigationLiveViewController.updateLiveView();
    }, 5000);
    
    // 模拟路线变化
    setTimeout(() => {
        NavigationLiveViewController.updateLiveView();
    }, 10000);
    
    // 模拟导航结束
    setTimeout(() => {
        NavigationLiveViewController.stopLiveView();
    }, 15000);
}
```

---

*文档版本：1.0*  
*最后更新：2026-05-15*