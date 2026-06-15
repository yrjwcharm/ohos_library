# ezcustomtransition

## 1 简介

ezcustomtransition是一个易于集成的自定义转场三方库，用于在Navigation转场过程中，添加自定义的转场动效。内置实现了一镜到底转场效果及可交互转场效果等。使用该库实现一镜到底转场效果的一些前提条件为：

1 应用使用了Navigtion路由

2 如果需要实现一镜到底转场，则一镜到底目标页需要适配沉浸式状态栏效果

3 一镜到底目标页的NavDestination需要配置.hideTitleBar(true)，不能使用默认的titleBar，标题栏内容由应用自己来画

## 2 下载安装

```bash
ohpm install @hmanimations/ezcustomtransition
```

## 3 实现一镜到底动效

以下是一镜到底集成步骤，有对应的[完整代码示例及效果]()供参考。

### 3.1 EntryAbility.ets文件修改

在EntryAbility.ets的onWindowStageCreate函数中添加如下调用：

```arkui
  onWindowStageCreate(windowStage: window.WindowStage): void {
    ...
    ezCustomTransition.init(windowStage);
    ...
  }
```

### 3.2 AbilityStage.ets文件修改

在项目实现的AbilityStage类的onConfigurationUpdate函数中添加如下调用：

```arkui
  onConfigurationUpdate(newConfig: Configuration): void {
    ...
    ezCustomTransition.onConfigurationChanged();
    ...
  }
```

### 3.3 Navigation组件修改

在要添加一镜到底转场的页面的父Navigation组件中，实现customNavContentTransition函数：

```arkui
  @State isEnabled: boolean = true;

  build() {
    Navigation() { }
    // 转场过程中不响应手势事件
    .enabled(this.isEnabled)
    .customNavContentTransition((from: NavContentInfo, to: NavContentInfo, operation: NavigationOperation) => {
      return ezCustomTransition.customNavContentTransition(from, to, operation, {
        // 自定义转场过程中禁用手势，避免出现体验问题
        onTransitionStart: () => {
          this.isEnabled = false;
        },
        onTransitionEnd: () => {
          this.isEnabled = true;
        }
      });
    })
  }
```

### 3.4 触发页的修改

通常场景是点击触发页的某个组件，以一镜到底动画形式跳转至目标页，需要在触发页的点击事件中添加逻辑，主要修改内容是在点击后，创建一个LongTakeTransitionParam对象，并将该对象传递给目标页（传递对象的代码需要开发者根据实际封装的路由进行实现，确保传给下一页即可）：

```arkui
  // 在点击触发页的组件后，通过generateLongTakeParam接口创建LongTakeTransitionParam对象
  let longTakeTransitionParam: LongTakeTransitionParam | undefined =
    ezCustomTransition.generateLongTakeParam(this.getUIContext(), snapShotComponentId, RADIUS);

  /**
   * 如果上面的对象创建成功，则将该对象传递至目标页
   * 此处的实现开发者应跟随应用实际封装的路由函数来进行修改
   * 只需确保将LongTakeTransitionParam对象传递给下一页即可
   */
  if (longTakeTransitionParam) {
    param['longTakeTransitionParam'] = longTakeTransitionParam;
  }
  this.pageInfos.pushPath({ name: 'CardLongTakePageTwo', param: param })
```

其中，generateLongTakeParam的参数为：

| 参数名          | 类型                        | 必填 | 说明                              |
| ------------ | ------------------------- | -- | ------------------------------- |
| uiContext    | UIContext                 | 是  | 上下文信息                           |
| cardId       | string                    | 是  | 触发页需要做一镜到底的组件的id，通常为响应点击事件的组件id |
| cornerRadius | number                    | 是  | 触发页需要做一镜到底的组件的圆角值               |
| options      | LongTakeTransitionOptions | 否  | 自定义转场的可选参数                      |

LongTakeTransitionOptions的类型定义如下：

| 参数名                    | 类型                     | 必填 | 说明                                            |
| ---------------------- | ---------------------- | -- | --------------------------------------------- |
| type                   | LongTakeTransitionType | 否  | 一镜到底类型，默认为LongTakeTransitionType.CardLongTake |
| useSpringCurve         | boolean                | 否  | 是否使用弹簧动画，默认为false                             |
| isGestureEnabled       | boolean                | 否  | 是否支持交互式返回，默认为true                             |
| onEnterTransitionStart | () => void             | 否  | 开始进行跳转目标页转场动画的回调函数                            |
| onEnterTransitionEnd   | () => void             | 否  | 跳转目标页转场动画结束时的回调函数                             |
| onBackTransitionStart  | () => void             | 否  | 开始进行返回触发页的转场动画的回调函数                           |
| onBackTransitionEnd    | () => void             | 否  | 返回触发页转场动画结束时的回调函数                             |

LongTakeTransitionType的枚举值定义如下：

| 名称            | 描述              |
| ------------- | --------------- |
| CardLongTake  | 此次一镜到底为卡片打开一镜到底 |
| ImageLongTake | 此次一镜到底为图片打开一镜到底 |

卡片一镜到底及图片一镜到底的效果样式，主要区别在于手势返回的逻辑，针对点击查看大图场景建议传入LongTakeTransitionType.ImageLongTake，二者的详细效果可以参考如下链接的示例效果：

[https://gitee.com/civilong/ezcustomtransition\_demo]()

### 3.5 目标页的修改

目标页需要在NavDestination的onReady函数中，解析出从触发页传来的LongTakeTransitionParam对象，并用该对象初始化一镜到底动画控制参数（LongTakeSession），并将LongTakeSession传递给一镜到底动画组件（LongTakeTransitionDelegate）：

```arkui
  @State longTakeSession: LongTakeSession = new LongTakeSession();

  @State longTakeTransitionParam: LongTakeTransitionParam | undefined = undefined;

  // 目标页原本内容
  @Builder
  ContentBuilder() {
    ...
      // Step5: 原本在NavDestination如果有背景色，需要改为添加到子组件上
      // 同时需要设置expandSafeArea将背景色扩展到状态栏
      .backgroundColor(this.longTakeTransitionParam ? Color.White : Color.Transparent)
      .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP])
  }

  NavDestination() {
      // Step3：如果有LongTakeTransitionParam对象，说明需要做一镜到底转场
      // 需要将页面原本内容传递给LongTakeTransitionDelegate，里面实现了一镜到底动效需要的布局
      if (this.longTakeTransitionParam) {
        LongTakeTransitionDelegate({
          longTakeSession: this.longTakeSession,
          contentBuilder: (): void => {
            this.ContentBuilder()
          }
        })
      } else {
        // ContentBuilder为目标页原本的内容
        this.ContentBuilder()
      }
    }
    // Step4：如果是一镜到底转场场景，则需要修改navDestination的背景颜色为session中的navDestinationBgColor。如果navDestination原先有背景色，需要参照Step5移到子组件上
    .backgroundColor(this.longTakeTransitionParam ? this.longTakeSession.navDestinationBgColor : Color.White)
    .hideTitleBar(true)
    // Step6：NavDestination的onSizeChange回调里，调用session的setNewSize函数更新组件宽高
    .onSizeChange((oldValue: SizeOptions, newValue: SizeOptions) => {
      this.longTakeSession.setNewSize(newValue);
    })
    .onReady((navDestContext: NavDestinationContext) => {
      // Step1：解析出触发页传来的LongTakeTransitionParam对象
      // 解析的方法也需要根据应用实际的路由方法进行实现，只需做到解析出上一页传递的LongTakeTransitionParam对象即可
      let param = navDestContext.pathInfo?.param as Record<string, Object>;
      this.longTakeTransitionParam = param['longTakeTransitionParam'] as LongTakeTransitionParam;
      if (this.longTakeTransitionParam) {
        // Step2: 调用longTakeSession的init函数初始化session
        this.longTakeSession.init(navDestContext, this.longTakeTransitionParam, {
          pop: () => { this.pathStack.pop(); },
          alignTargetId: 'Post_Page_ID'
        });
      }
    })
```

其中，LongTakeSession的init函数参数为：

| 参数名     | 类型                      | 必填 | 说明                                   |
| ------- | ----------------------- | -- | ------------------------------------ |
| context | NavDestinationContext   | 是  | onReady回调中传来的NavDestinationContext对象 |
| param   | LongTakeTransitionParam | 是  | 上一页传来的LongTakeTransitionParam对象      |
| options | LongTakeSessionOptions  | 是  | session初始化的额外参数                      |

LongTakeSessionOptions的类型定义如下：

| 参数名                   | 类型         | 必填 | 说明                                         |
| --------------------- | ---------- | -- | ------------------------------------------ |
| pop                   | () => void | 是  | 返回上一页的逻辑，如：() => { this.pathStack.pop(); } |
| alignTargetId         | string     | 否  | 目标页中需要做一镜到底的组件的id，为空则默认做从被点击组件到目标页的一镜到底动画  |
| onBackGestureStart    | () => void | 否  | 开始进行手势返回交互时的回调                             |
| onRecoverStart        | () => void | 否  | 手势交互未达到返回上一页的条件时，需要恢复成全屏时的回调               |
| onRecoverEnd          | () => void | 否  | 手势交互未达到返回上一页的条件时，恢复成全屏后的回调                 |
| contentSizeUsePercent | boolean    | 否  | 目标页内容区是否使用100%形式的宽高值。默认值为false             |

## 4 其他场景

### 4.1 更新返回时对齐的组件id

例：在图片九宫格场景中，点击第一张图片一镜到底查看大图后，滑到第二张大图，之后返回，此时期望回到九宫格中第二张图的对应位置。

此时可以在返回前，调用LongTakeSession的updateSnapshotComponentId(newSnapshotComponentId: string)函数，将九宫格中第二张图的id传入， 即可实现更新返回时回到的位置。
