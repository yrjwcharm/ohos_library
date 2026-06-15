# 创建强调文本模板实况窗

## 概述

强调文本模板，通过突出显示关键信息（如取餐码、排队号码），帮助用户快速识别重要内容。

## 基础实况窗控制器

以下代码来自官方 Demo 示例，展示了取餐场景的强调文本模板实现：

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
      event: "PICK_UP", // 实况窗的应用场景。PICK_UP：取餐。
      liveViewData: {
        primary: {
          title: "餐品已备好",
          content: [
            { text: "请前往" },
            { text: " XXX店 ", textColor: "#FF0A59F7" },
            { text: "取餐" },
          ],
          keepTime: 15,
          clickAction: await LiveViewController.buildWantAgent(),
          layoutData: {
            layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_PICKUP,
            title: "取餐码",
            content: "72988",
            underlineColor: "#FF0A59F7",
            descPic: "coffee.png" // 扩展区右侧产品描述图，取值为"/resources/rawfile"路径下的文件名或image.PixelMap
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

强调文本模板的 `layoutData` 配置：

```typescript
layoutData: {
    layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_PICKUP,  // 取餐类型布局
    title: "取餐码",                                           // 标签标题
    content: "72988",                                          // 强调内容（取餐码）
    underlineColor: "#FF0A59F7",                               // 下划线颜色
    descPic: "coffee.png"                                      // 产品描述图
}
```

## 配置项说明

| 配置项 | 类型 | 说明 |
|--------|------|------|
| `layoutType` | `LayoutType` | 布局类型，设为 `LAYOUT_TYPE_PICKUP` 表示取餐模式 |
| `title` | `string` | 标签标题，如"取餐码"、"排队号" |
| `content` | `string` | 强调内容，通常是数字或编码 |
| `underlineColor` | `string` | 强调文字下划线颜色，如 `#FF0A59F7` |
| `descPic` | `string` | 扩展区右侧产品描述图，取值为 `/resources/rawfile` 路径下的文件名 |

## 文本内容配置

强调文本模板支持多文本片段组合，可通过 `textColor` 设置强调效果：

```typescript
content: [
    { text: "请前往" },                       // 默认黑色文本
    { text: " XXX店 ", textColor: "#FF0A59F7" },  // 强调色：店铺名称
    { text: "取餐" }                          // 默认黑色文本
]
```

> **注意：** 设置 `textColor` 字段时，所有拥有 `textColor` 字段的对象仅能设置 **同一种颜色**，不设置时默认展示 `#FF000000`。

## 事件类型说明

| 事件类型 | 场景说明 |
|----------|----------|
| `PICK_UP` | 取餐场景 |
| `QUEUE` | 排队场景 |
| `DELIVERY` | 即时配送（外卖、生鲜） |
| `TAXI` | 打车出行 |
| `FLIGHT` | 航班出行 |
| `TRAIN` | 高铁出行 |
| `FITNESS` | 健身场景 |

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
      event: "PICK_UP",
      liveViewData: {
        primary: {
          title: "",
          content: [],
          keepTime: 15,
          clickAction: await LiveViewController.buildWantAgent(),
          layoutData: {
            layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_PICKUP,
            title: "",
            content: "",
            underlineColor: "",
            descPic: ""
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
struct PickUpPage {
  aboutToAppear(): void {
    // 初始化页面
  }

  onPageShow(): void {
    // 启动实况窗（取餐提醒）
    try {
      const controller = new LiveViewController();
      controller.startLiveView();
    } catch (e) {
      const err: BusinessError = e as BusinessError;
      console.error(`Failed to start live view: ${err.code} ${err.message}`);
    }
  }

  build(): void {
    Column() {
      Text("取餐提醒")
    }
    .width('100%')
    .height('100%')
  }
}
```

### 动态内容更新

```typescript
// 根据实际数据更新实况窗
async function updatePickUpView(shopName: string, pickUpCode: string) {
    const view = {
        id: 0,
        event: "PICK_UP",
        liveViewData: {
            primary: {
                title: "餐品已备好",
                content: [
                    { text: "请前往" },
                    { text: ` ${shopName} `, textColor: "#FF0A59F7" },
                    { text: "取餐" }
                ],
                keepTime: 15,
                clickAction: await buildWantAgent(),
                layoutData: {
                    layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_PICKUP,
                    title: "取餐码",
                    content: pickUpCode,
                    underlineColor: "#FF0A59F7",
                    descPic: "coffee.png"
                }
            }
        }
    };

    await liveViewManager.updateLiveView(view);
}
```

---

*文档版本：1.0*  
*最后更新：2026-05-15*