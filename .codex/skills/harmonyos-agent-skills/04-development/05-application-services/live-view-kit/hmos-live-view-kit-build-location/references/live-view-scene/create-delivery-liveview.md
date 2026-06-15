# 即时配送实况窗

## 基本概念

即时配送场景用于外卖、快递等配送服务实时状态展示。

## 场景介绍

- 配送订单状态跟踪
- 骑手位置/状态展示
- 预计送达时间显示

## 业务基本流程

1. 用户下单 → 创建实况窗
2. 商家接单 → 更新状态
3. 骑手取餐 → 更新状态
4. 配送中 → 更新进度
5. 送达 → 结束实况窗

**仅支持创建操作**

## 示例代码

```typescript
import { liveViewManager } from '@kit.LiveViewKit';
import { common, Want, wantAgent, WantAgent } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';

// todo 实况窗更新节点/阶段/状态，更新或者结束的时候可以调用此枚举对更新状态进行赋值
enum LiveViewStatus {
  WAITING_PAYMENT = 1, // 等待用户付款
  WAITING_MERCHANT = 2, // 等待商店接收订单
  WAITING_RIDER = 3, // 召唤骑手
  RIDER_GET_ORDER = 4, // 骑手前往取商品中
  RIDER_TO_STORE = 5, // 骑手到达商店
  PRODUCT_DELIVERING = 6, // 骑手派送中
  PRODUCT_TO_CABINET = 7, // 商品已送达
  PRODUCT_DELIVERED = 8 // 商品已被取走，订单已完成
}

export class DeliveryLiveViewController {
  private static defaultView: liveViewManager.LiveView | undefined = undefined;
  private static contentColor: string = '#FF0A59F7';
  private static underLineColor: string = '#FF0A59F7';
  private static capsuleColor: string = '#FF308977';

  public async startLiveView(): Promise<void> {
    if (!await DeliveryLiveViewController.isLiveViewEnabled()) {
      console.warn('startLiveView, live view is disabled.')
      return;
    }
    DeliveryLiveViewController.defaultView = await DeliveryLiveViewController.buildDefaultView();
    try {
      console.info(`Request startLiveView req: ${JSON.stringify(DeliveryLiveViewController.defaultView)}`);
      const result = await liveViewManager.startLiveView(DeliveryLiveViewController.defaultView);
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
      // todo id字段内容需要替换为业务实际内容，实况窗唯一标识，由开发者生成
      id: 0,
      // todo event字段内容需要替换为业务实际内容，应用场景标识
      event: "DELIVERY",
      // todo sequence字段内容需要替换为业务实际内容，状态序列号
      sequence: LiveViewStatus.WAITING_PAYMENT,
      // todo isMute字段内容需要替换为业务实际内容，是否静音
      isMute: true,
      // todo liveViewData字段内容需要替换为业务实际内容，实况窗数据
      liveViewData: {
        // todo primary字段内容需要替换为业务实际内容，主区域数据
        primary: {
          // todo title字段内容需要替换为业务实际内容，主区域标题
          title: "现在支付，预计23:49送达",
          // todo content字段内容需要替换为业务实际内容，主区域内容数组
          content: [
            {
              // todo text字段内容需要替换为业务实际内容，文本内容
              text: "咖啡",
              // todo textColor字段内容需要替换为业务实际内容，文本颜色
              textColor: DeliveryLiveViewController.contentColor
            },
            {
              // todo text字段内容需要替换为业务实际内容，文本内容
              text: ' ' + '等2件商品'
            }
          ],
          // todo keepTime字段内容需要替换为业务实际内容，展示时间
          keepTime: 15,
          // todo clickAction字段内容需要替换为业务实际内容，点击跳转行为
          clickAction: await DeliveryLiveViewController.buildWantAgent('InstantDelivery'),
          // todo extensionData字段内容需要替换为业务实际内容，扩展区数据
          extensionData: {
            // todo type字段内容需要替换为业务实际内容，扩展类型
            type: liveViewManager.ExtensionType.EXTENSION_TYPE_ICON,
            // todo pic字段内容需要替换为业务实际内容，图片
            pic: 'icon_merchant.png',
            // todo clickAction字段内容需要替换为业务实际内容，点击跳转行为
            clickAction: await DeliveryLiveViewController.buildWantAgent('InstantDelivery')
          },
          // todo layoutData字段内容需要替换为业务实际内容，布局数据
          layoutData: {
            // todo layoutType字段内容需要替换为业务实际内容，布局类型
            layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_PICKUP,
            // todo title字段内容需要替换为业务实际内容，标题
            title: "待支付金额",
            // todo content字段内容需要替换为业务实际内容，内容
            content: "25.5元",
            // todo underlineColor字段内容需要替换为业务实际内容，下划线颜色
            underlineColor: DeliveryLiveViewController.underLineColor,
            // todo descPic字段内容需要替换为业务实际内容，描述图片
            descPic: 'coffee.png'
          }
        },
        // todo capsule字段内容需要替换为业务实际内容，胶囊区域配置
        capsule: {
          // todo type字段内容需要替换为业务实际内容，胶囊类型
          type: liveViewManager.CapsuleType.CAPSULE_TYPE_TEXT,
          // todo status字段内容需要替换为业务实际内容，状态
          status: 1,
          // todo icon字段内容需要替换为业务实际内容，图标
          icon: 'capsule_store.png',
          // todo backgroundColor字段内容需要替换为业务实际内容，背景颜色
          backgroundColor: DeliveryLiveViewController.capsuleColor,
          // todo title字段内容需要替换为业务实际内容，标题
          title: "待支付"
        }
      }
    };
  }

  private static async buildWantAgent(page: string): Promise<Want> {
    const wantAgentInfo: wantAgent.WantAgentInfo = {
      // todo wants字段内容需要替换为业务实际内容，意图目标列表
      wants: [
        {
          //todo 此处应改为业务实际应用包名
          bundleName: 'com.xxx.app',
          //todo 此处应改为实际业务窗口名称
          abilityName: 'EntryAbility',
          // todo parameters字段内容需要替换为业务实际内容，参数
          parameters: {
            page: page,
          },
        } as Want
      ],
      // todo actionType字段内容需要替换为业务实际内容，操作类型
      actionType: wantAgent.OperationType.START_ABILITIES,
      // todo requestCode字段内容需要替换为业务实际内容，请求码
      requestCode: 0,
      // todo actionFlags字段内容需要替换为业务实际内容，操作标志
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
struct Index {
  // todo 实况窗控制器实例
  private controller = new DeliveryLiveViewController();

  aboutToAppear(): void {
    // todo 在此处调用实况窗启动方法
    this.controller.startLiveView();
  }

  build(): void {
    Column() {
      Text("启动实况窗")
        .onClick(() => {
          this.controller.startLiveView();
        })
    }
    .width('100%')
    .height('100%')
  }
}
```
