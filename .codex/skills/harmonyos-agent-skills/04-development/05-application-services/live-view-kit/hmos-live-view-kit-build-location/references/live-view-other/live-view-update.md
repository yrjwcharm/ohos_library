# 本地更新和结束实况窗

## 基本概念

实况窗创建后，通过 `updateLiveView` 更新内容，或 `stopLiveView` 结束实况窗。

## 业务基本流程

1. 开关检查 → `isLiveViewEnabled()`
2. 构建请求体 → 准备最新数据
3. 执行操作 → `updateLiveView()` 或 `stopLiveView()`

## 示例代码

```typescript
import { liveViewManager } from '@kit.LiveViewKit';
import { Want, wantAgent } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';

export class LiveViewController {
  public async updateLiveView(): Promise<boolean> {
    // todo updateLiveView 方法用于更新实况窗内容，需要根据业务需求修改对应字段
    try {
      if (!await LiveViewController.isLiveViewEnabled()) {
        console.warn('updateLiveView, live view is disabled.')
        return false;
      }
      if (!LiveViewController.defaultView) {
        console.warn('updateLiveView, live view is disabled.')
        return false;
      }
      if (LiveViewController.defaultView.sequence) {
        // todo sequence字段需要递增以触发更新
        LiveViewController.defaultView.sequence += 1;
      }
      // todo title字段内容需要替换为业务实际内容，主区域标题
      LiveViewController.defaultView.liveViewData.primary.title = "预计23:49送达";
      // todo content字段内容需要替换为业务实际内容，主区域内容数组
      LiveViewController.defaultView.liveViewData.primary.content = [
        { text: "等待商家接单， " },
        { text: "03:20", textColor: "#FFFF9C4F" },
        { text: " 未接单自动取消" }
      ];
      // todo layoutData字段内容需要替换为业务实际内容，布局数据
      LiveViewController.defaultView.liveViewData.primary.layoutData = {
        layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_PROGRESS,
        progress: 50,
        color: "",
        backgroundColor: "",
        indicatorType: liveViewManager.IndicatorType.INDICATOR_TYPE_UP,
        indicatorIcon: "",
        lineType: liveViewManager.LineType.LINE_TYPE_NORMAL_SOLID_LINE,
        nodeIcons: []
      };
      const result = await liveViewManager.updateLiveView(LiveViewController.defaultView);
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
      if (!await LiveViewController.isLiveViewEnabled()) {
        console.warn('stopLiveView, live view is disabled.')
        return;
      }
      if (!LiveViewController.defaultView) {
        console.warn('stopLiveView, live view is disabled.')
        return;
      }
      console.info('stopLiveView, get active live view succeed.');
      if (LiveViewController.defaultView.sequence) {
        // todo sequence字段需要递增以触发更新
        LiveViewController.defaultView.sequence += 1;
      }
      // todo title字段内容需要替换为业务实际内容，主区域标题
      LiveViewController.defaultView.liveViewData.primary.title = '商品已送达';
      // todo content字段内容需要替换为业务实际内容，主区域内容数组
      LiveViewController.defaultView.liveViewData.primary.content = [
        { text: '感谢您的认可，' },
        { text: '期待下一次光临' }
      ];
      // todo layoutData字段内容需要替换为业务实际内容，布局数据
      LiveViewController.defaultView.liveViewData.primary.layoutData = {
        layoutType: liveViewManager.LayoutType.LAYOUT_TYPE_PROGRESS,
        progress: 100,
        color: "",
        backgroundColor: "",
        indicatorType: liveViewManager.IndicatorType.INDICATOR_TYPE_UP,
        indicatorIcon: "",
        lineType: liveViewManager.LineType.LINE_TYPE_NORMAL_SOLID_LINE,
        nodeIcons: []
      };
      const result = await liveViewManager.stopLiveView(LiveViewController.defaultView);
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
      // todo id字段内容需要替换为业务实际内容，实况窗唯一标识，由开发者生成
      id: 0,
      // todo event字段内容需要替换为业务实际内容，应用场景标识
      event: "DELIVERY",
      // todo liveViewData字段内容需要替换为业务实际内容，实况窗数据
      liveViewData: {
        // todo primary字段内容需要替换为业务实际内容，主区域数据
        primary: {
          // todo title字段内容需要替换为业务实际内容，主区域标题
          title: "",
          // todo content字段内容需要替换为业务实际内容，主区域内容数组
          content: [],
          // todo keepTime字段内容需要替换为业务实际内容，展示时间
          keepTime: 15,
          // todo clickAction字段内容需要替换为业务实际内容，点击跳转行为
          clickAction: await LiveViewController.buildWantAgent(),
          // todo layoutData字段内容需要替换为业务实际内容，布局数据
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
        // todo capsule字段内容需要替换为业务实际内容，胶囊区域配置
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
      // todo 需要将此字段更改为业务具体需求字段
      wants: [
        {
          // todo bundleName字段内容需要替换为业务实际内容，应用的包名
          bundleName: 'xxx.xxx.xxx',
          // todo abilityName字段内容需要替换为业务实际内容，ability名称
          abilityName: 'EntryAbility'
        } as Want
      ],
      // todo actionType字段内容需要替换为业务实际内容，操作类型
      actionType: wantAgent.OperationType.START_ABILITIES,
      // todo requestCode字段内容需要替换为业务实际内容，请求码
      requestCode: 0,
      // todo actionFlags字段内容需要替换为业务实际内容，操作标志
      actionFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
    };
    const agent = await wantAgent.getWantAgent(wantAgentInfo);
    return agent;
  }
}
```

## 更新/结束方法注释规范

1. **方法开头注释**：`// todo [方法名] 方法用于[功能描述]，需要根据业务需求修改对应字段`
2. **sequence递增注释**：`// todo sequence字段需要递增以触发更新`（在 sequence 修改前添加）
3. **字段修改注释**：每个修改的字段前添加 `// todo [字段名]字段内容需要替换为业务实际内容，[字段含义]`
4. **switch case注释**：每个case分支内的修改字段都需要添加注释，格式为 `// todo 所有需要更新的字段需要手动更改添加，这里只是示例用法`
