import { OhosNavigationBar } from '@ohos_lib/navigation_bar';

@Entry
@ComponentV2
struct Index {
  @Local message: string = 'Hello World';

  build() {
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
      Text('样式五：标题 + 返回，有状态栏')
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
        bgColor: '#00BFFF',
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
  }
}