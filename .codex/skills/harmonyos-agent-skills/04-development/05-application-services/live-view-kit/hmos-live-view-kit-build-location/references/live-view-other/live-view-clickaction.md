# 实况窗点击动作

## 基本概念

实况窗支持点击动作，用户点击卡片或辅助区可跳转指定页面。

- **卡片点击**：`liveViewData.primary.clickAction`
- **辅助区点击**：`liveViewData.primary.extensionData.clickAction`

## 示例代码

```typescript
primary: {
  title: "航班动态",
  content: [{ text: "正在飞行中" }],
  keepTime: 15,
  clickAction: await LiveViewController.buildWantAgent()
}
```

## 构建 WantAgent

```typescript
private static async buildWantAgent(): Promise<Want> {
  const wantAgentInfo: wantAgent.WantAgentInfo = {
    wants: [
      {
        bundleName: 'com.example.app',
        abilityName: 'EntryAbility'
      } as Want
    ],
    actionType: wantAgent.OperationType.START_ABILITIES,
    requestCode: 0,
    actionFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
  };
  return await wantAgent.getWantAgent(wantAgentInfo);
}
```

## WantAgent 配置项

| 配置项 | 类型 | 说明 |
|--------|------|------|
| `wants` | Array\<Want\> | 跳转目标 Ability 列表 |
| `actionType` | OperationType | 操作类型，通常为 START_ABILITIES |
| `requestCode` | number | 请求码 |
| `actionFlags` | Array | 操作标志位 |

## 布局效果

```
┌─────────────────────────────────────┐
│   等位中                            │
│   当前等待 32桌                     │
│   ┌─────────────────────────────┐   │
│   │ [取餐提醒] ← 点击辅助区跳转  │   │
│   └─────────────────────────────┘   │
└─────────────────────────────────────┘
     ↑                    ↑
clickAction      extensionData.clickAction
```
