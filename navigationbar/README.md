## NavigationBar组件
___
#### 简介
**OhosNavigationBar** 是一款丰富的HarmonyNext自定义导航插件

#### 安装步骤

```ohpm
ohpm install @ohos_lib/navigation_bar
```
#### 参数

#### 基本用法

```typescript
 Column() {
  OhosNavigationBar({
    bgColor: Color.Red,
    hideBackButton: true,
    title: '标题',
    titleFontSize: 16
  })

  OhosNavigationBar({
    title: '标题',
    titleFontSize: 16,
    bgColor:Color.Green,
    titleFontColor:Color.White,
    backButtonIcon:$r('app.media.back'),
    backButtonIconColor:Color.White,
    rightMenus: [
      {
        image: $r('app.media.menu'),
        action: () => {
        }
      }
    ]
  })

  Blank().height(10)
  OhosNavigationBar({
    title: '标题',
    titleFontSize: 16,
    bgColor:Color.Orange,
    backClick: () => {
    },
    rightMenus: [
      {
        image: $r('app.media.menu'),
        action: () => {
        }
      },
      {
        image: $r('app.media.setting'),
        action: () => {
        }
      }
    ]
  })

  Blank().height(10)
  OhosNavigationBar({
    title: '标题居左',
    titleFontColor:Color.White,
    navHeight:60,
    bgColor:Color.Blue,
    titleIsCenter: false,
    titleFontSize: 16,
    backButtonIconColor:Color.White,
    backClick: () => {
    },
    rightMenus: [
      {
        image: $r('app.media.menu'),
        action: () => {
        }
      },
      {
        image:$r('app.media.setting'),
        action: () => {
        }
      },
      {
        image: $r('app.media.notice'),
        action: () => {
        }
      }
    ]
  })
  Blank().height(10)
  Text('有状态栏')
    .fontColor(Color.Gray)
    .fontSize(16)
    .alignSelf(ItemAlign.Start)
    .margin({ top: 25 })
    .padding({
      left: 15,
      right: 15,
      top: 10,
      bottom: 10
    })
  OhosNavigationBar({
    isShowStatusBar: true,
    bgColor: Color.Black,
    title: '标题居中',
    titleFontColor: '#FFFFFF',
    backButtonIconLeftMargin: 16,
    backButtonIcon: $r('app.media.back'),
    backButtonIconSize: 18,
    titleFontSize: 18,
  })
}
.height('100%')
  .width('100%')
```
#### 更多详情案例请查看  https://github.com/yrjwcharm/ohos_library/tree/feature/ohos/navigationbar