# 卡片一镜到底转场测试用例

## 场景描述

用户有一个基于 Navigation 路由的鸿蒙应用，包含卡片列表页和详情页。点击卡片后，期望以一镜到底动画形式展开到详情页。

## 前提条件

- 应用使用 Navigation + NavDestination 路由体系
- 详情页已适配沉浸式状态栏
- 详情页 NavDestination 配置 .hideTitleBar(true)

## 测试输入

**触发页代码（卡片列表页）**：

```arkui
@Entry
@Component
struct CardListPage {
  @State cardList: CardItem[] = [
    { id: '1', title: '新闻1', summary: '摘要1' },
    { id: '2', title: '新闻2', summary: '摘要2' },
  ];
  pathStack: NavPathStack = new NavPathStack();

  build() {
    NavDestination() {
      List() {
        ForEach(this.cardList, (item: CardItem) => {
          ListItem() {
            Column() {
              Text(item.title)
              Text(item.summary)
            }
            .width('100%')
            .height(200)
            .borderRadius(16)
            .backgroundColor(Color.White)
            .onClick(() => {
              this.pathStack.pushPath({ name: 'DetailPage', param: { 'itemId': item.id } });
            })
          }
        })
      }
    }
  }
}
```

**目标页代码（详情页）**：

```arkui
@Entry
@Component
struct DetailPage {
  pathStack: NavPathStack = new NavPathStack();

  build() {
    NavDestination() {
      Column() {
        Text('详情内容')
      }
      .width('100%')
      .height('100%')
      .backgroundColor(Color.White)
    }
    .hideTitleBar(true)
  }
}
```

## 期望输出要点

### 触发页修改
1. 卡片组件添加 `.id('card_${item.id}')`
2. 点击事件中调用 `ezCustomTransition.generateLongTakeParam(this.getUIContext(), snapShotComponentId, 16)`
3. 将 `LongTakeTransitionParam` 加入路由参数传递给目标页

### 目标页修改
1. 添加 `longTakeSession` 和 `longTakeTransitionParam` 状态变量
2. 在 `onReady` 中解析参数并初始化 `longTakeSession`
3. 用 `LongTakeTransitionDelegate` 包裹原内容
4. NavDestination 背景色改为 `this.longTakeSession.navDestinationBgColor`
5. 原背景色迁移到子组件 + `.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP])`
6. 添加 `.onSizeChange` 回调调用 `this.longTakeSession.setNewSize(newValue)`

### 全局修改
- EntryAbility.ets: `ezCustomTransition.init(windowStage)`
- AbilityStage.ets: `ezCustomTransition.onConfigurationChanged()`
- Navigation: `.customNavContentTransition` 回调 + `isEnabled` 状态