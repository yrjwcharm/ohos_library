## NavigationBar组件
___
#### 简介
**OhosNavigationBar** 是一款丰富的HarmonyNext自定义导航插件

#### 安装步骤

```ohpm
ohpm install @ohos_lib/ohos_navigation_bar
```
#### 参数

#### 基本用法

```html
Text('样式一：仅标题').fontColor(Color.Gray).fontSize(16)
  .alignSelf(ItemAlign.Start)
  .padding({
    left: 15,
    right: 15,
    top: 10,
    bottom: 10
  })
OhosNavigationBar({
  bgColor: Color.White,
  hideBackButton: true,
  title: '标题居中',
  titleFontSize: '18vp'
})

Text('样式二：标题 + 返回 + 右侧按钮')
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
  title: '标题居中',
  titleFontSize: '18vp',
  rightMenus: [
    {
      image: 'https://pic6.58cdn.com.cn/nowater/frs/n_v3b4f2c5f26ceb4c01998907afeaedb34d.webp',
      action: () => {
        Toast.showText({ msg: '点击按钮1' })
      }
    }
  ]
})

Blank().height(10)
OhosNavigationBar({
  title: '标题居中',
  titleFontSize: '18vp',
  backClick: () => {
  },
  rightMenus: [
    {
      image: 'https://pic4.58cdn.com.cn/nowater/frs/n_v3ba2b2c34ade04bfcba4ae805e1769cbb.webp',
      action: () => {
        Toast.showText({ msg: '点击按钮1' })
      }
    },
    {
      image: 'https://pic6.58cdn.com.cn/nowater/frs/n_v3b4f2c5f26ceb4c01998907afeaedb34d.webp',
      action: () => {
        Toast.showText({ msg: '点击按钮2' })
      }
    }
  ]
})

Blank().height(10)
OhosNavigationBar({
  title: '标题居左',
  titleIsCenter: false,
  titleFontSize: '18vp',
  backClick: () => {
  },
  rightMenus: [
    {
      image: 'https://pic6.58cdn.com.cn/nowater/frs/n_v35691dfb4777f4fed9455fdc35f301210.webp',
      action: () => {
        Toast.showText({ msg: '点击按钮1' })
      }
    },
    {
      image: 'https://pic4.58cdn.com.cn/nowater/frs/n_v3ba2b2c34ade04bfcba4ae805e1769cbb.webp',
      action: () => {
        Toast.showText({ msg: '点击按钮2' })
      }
    },
    {
      image: 'https://pic6.58cdn.com.cn/nowater/frs/n_v3b4f2c5f26ceb4c01998907afeaedb34d.webp',
      action: () => {
        Toast.showText({ msg: '点击按钮3' })
      }
    }
  ]
})

Text('样式三：搜索框')
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
  hideBackButton: true,
  searchPlaceholder: '搜索',
  searchClick: () => {
    console.log('点击搜索框')
  },
})

Text('样式四：搜索框 + 返回 + 右侧按钮')
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
  searchPlaceholder: '搜索',
  searchClick: () => {
    console.log('搜索框')
  },
  backClick: () => {
  },
  rightMenus: [
    {
      image: 'https://pic6.58cdn.com.cn/nowater/frs/n_v3b4f2c5f26ceb4c01998907afeaedb34d.webp',
      action: () => {
        Toast.showText({ msg: '点击按钮1' })
      }
    }
  ]
})

Blank().height(10)
OhosNavigationBar({
  searchPlaceholder: '搜索',
  searchClick: () => {
    console.log('搜索框')
  },
  backClick: () => {
  },
  rightMenus: [
    {
      image: 'https://pic4.58cdn.com.cn/nowater/frs/n_v3ba2b2c34ade04bfcba4ae805e1769cbb.webp',
      action: () => {
        Toast.showText({ msg: '点击按钮1' })
      }
    },
    {
      image: 'https://pic6.58cdn.com.cn/nowater/frs/n_v3b4f2c5f26ceb4c01998907afeaedb34d.webp',
      action: () => {
        Toast.showText({ msg: '点击按钮2' })
      }
    }
  ]
})

Blank().height(10)
OhosNavigationBar({
  searchPlaceholder: '搜索',
  searchClick: () => {
    console.log('搜索框')
  },
  backClick: () => {
  },
  rightMenus: [
    {
      image: 'https://pic6.58cdn.com.cn/nowater/frs/n_v35691dfb4777f4fed9455fdc35f301210.webp',
      action: () => {
        Toast.showText({ msg: '点击按钮1' })
      }
    },
    {
      image: 'https://pic4.58cdn.com.cn/nowater/frs/n_v3ba2b2c34ade04bfcba4ae805e1769cbb.webp',
      action: () => {
        Toast.showText({ msg: '点击按钮2' })
      }
    },
    {
      image: 'https://pic6.58cdn.com.cn/nowater/frs/n_v3b4f2c5f26ceb4c01998907afeaedb34d.webp',
      action: () => {
        Toast.showText({ msg: '点击按钮3' })
      }
    }
  ]
})

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
  backButtonIcon: $r('app.media.ic_back_white'),
  backButtonIconSize: 18,
  titleFontSize: 18,
})
```