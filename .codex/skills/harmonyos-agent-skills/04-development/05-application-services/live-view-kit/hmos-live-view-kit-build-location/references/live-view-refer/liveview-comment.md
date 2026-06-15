# 实况窗注释规范

**【重要】所有字段必须添加注释，注释放在对应字段正上方**

## buildDefaultView 完整注释示例

```typescript
private static async buildDefaultView(): Promise<liveViewManager.LiveView> {
  return {
    // todo id字段内容需要替换为业务实际内容，实况窗唯一标识，由开发者生成
    id: 9,
    // todo event字段内容需要替换为业务实际内容，应用场景标识
    event: "WORKOUT",
    // todo sequence字段内容需要替换为业务实际内容，状态序列号
    sequence: LiveViewStatus.WORKOUT_START,
    // todo isMute字段内容需要替换为业务实际内容，是否静音
    isMute: false,
    // todo timer字段内容需要替换为业务实际内容，计时器配置
    timer: {
      // todo time字段内容需要替换为业务实际内容，计时时间
      time: 0,
      // todo isCountdown字段内容需要替换为业务实际内容，是否倒计时
      isCountdown: false,
      // todo isPaused字段内容需要替换为业务实际内容，是否暂停
      isPaused: false
    },
    // todo liveViewData字段内容需要替换为业务实际内容，实况窗数据
    liveViewData: {
      // todo primary字段内容需要替换为业务实际内容，主区域数据
      primary: {
        // todo title字段内容需要替换为业务实际内容，主区域标题
        title: "运动中",
        // todo content字段内容需要替换为业务实际内容，主区域内容数组
        content: [
          { text: "剩余距离" },
          { text: " 2km", textColor: WorkoutLiveViewController.processColor }
        ],
        // todo keepTime字段内容需要替换为业务实际内容，展示时间
        keepTime: 15,
        // todo clickAction字段内容需要替换为业务实际内容，点击跳转行为
        clickAction: await XxxLiveViewController.buildWantAgent('Workout'),
        // todo extensionData字段内容需要替换为业务实际内容，扩展区数据
        extensionData: { ... },
        // todo layoutData字段内容需要替换为业务实际内容，辅助区布局数据
        layoutData: { ... }
      },
      // todo capsule字段内容需要替换为业务实际内容，胶囊区域配置
      capsule: { ... }
    }
  };
}
```

## buildWantAgent 字段注释示例

```typescript
private static async buildWantAgent(page: string): Promise<Want> {
  const wantAgentInfo: wantAgent.WantAgentInfo = {
    wants: [
      {
        // todo 此处应改为业务实际应用包名
        bundleName: "com.xxx.app",
        // todo 需要将此字段更改为业务窗口名
        abilityName: 'EntryAbility',
        // todo 需要将此字段更改为业务具体需求字段
        parameters: { page: page },
      } as Want
    ],
    // todo actionType字段内容需要替换为业务实际内容，操作类型
    actionType: wantAgent.OperationType.START_ABILITIES,
    // todo requestCode字段内容需要替换为业务实际内容，请求码
    requestCode: 0,
    // todo actionFlags字段内容需要替换为业务实际内容，操作标志
    actionFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
  };
}
```

## enum LiveViewStatus 注释

枚举上方必须有 `// todo 实况窗更新节点/阶段/状态`

```typescript
// todo 实况窗更新节点/阶段/状态
enum LiveViewStatus {
  WORKOUT_START = 1, // start exercising
  WORKOUT_PROCESS_ONE = 2, // process one
  // ...
}
```

## 更新操作（updateLiveView）完整注释示例

```typescript
public async updateLiveView(): Promise<boolean> {
  // todo updateLiveView 方法用于更新实况窗内容，需要根据业务需求修改对应字段
  console.info('updateLiveView start');
  try {
    if (!WorkoutLiveViewController.defaultView) {
      console.warn('updateLiveView, live view is disabled.')
      return false;
    }
    console.info('updateLiveView, id: %{public}d', WorkoutLiveViewController.defaultView.id);
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
          { text: " 1.5 KM", textColor: WorkoutLiveViewController.processColor }
        ];
        break;
      // ...
    }
    const result = await liveViewManager.updateLiveView(WorkoutLiveViewController.defaultView);
    return true;
  } catch (e) {
    const err: BusinessError = e as BusinessError;
    console.error(`Request updateLiveView error: ${err.message}`);
    return false;
  }
}
```

## 结束操作（stopLiveView）完整注释示例

```typescript
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
    const result = await liveViewManager.stopLiveView(WorkoutLiveViewController.defaultView);
  } catch (e) {
    const err: BusinessError = e as BusinessError;
    console.error(`Request stopLiveView error: ${err.message}`);
  }
}
```

## 更新/结束方法注释规范

1. 方法开头必须添加 `// todo [方法名] 方法用于[功能描述]，需要根据业务需求修改对应字段`
2. 每个 case 分支内修改的字段必须添加注释：`// todo [字段名]字段内容需要替换为业务实际内容，[字段含义]`
3. switch 语句前的 sequence 递增处必须添加注释：`// todo sequence字段需要递增以触发更新`
4. 所有修改的字段（title、content、timer、capsule等）必须有对应注释
