import {
  HdsNavigation, HdsNavigationTitleMode, ScrollEffectType,
  HdsTabs, HdsTabsController, DividerMode, hdsMaterial
} from '@kit.UIDesignKit'
import { SettingsPageBuilder } from './SettingsPage'
import { ArticleDetailPageBuilder } from './ArticleDetailPage'
import { LoginPageBuilder } from './LoginPage'
import { promptAction } from '@kit.ArkUI'

@Entry
@Component
struct Index {
  navPathStack: NavPathStack = new NavPathStack()
  tabsController: HdsTabsController = new HdsTabsController()
  @State currentTab: number = 0
  @State topOffset: number = 56
  @State bottomOffset: number = 120

  private tabTitles: string[] = ['首页', '消息', '发现', '我的']

  aboutToAppear(): void {
    const topPx = AppStorage.get<number>('topAvoidHeight') ?? 0
    const bottomPx = AppStorage.get<number>('bottomAvoidHeight') ?? 0
    this.topOffset = this.getUIContext().px2vp(topPx) + 56
    this.bottomOffset = this.getUIContext().px2vp(bottomPx) + 84

    // 未登录则跳转登录页
    const isLoggedIn = AppStorage.get<boolean>('isLoggedIn') ?? false
    if (!isLoggedIn) {
      this.navPathStack.pushPath({ name: 'LoginPage' })
    }
  }

  build() {
    HdsNavigation(this.navPathStack) {
      HdsTabs({
        barPosition: BarPosition.End,
        controller: this.tabsController
      }) {
        TabContent() {
          HomeTab({ navPathStack: this.navPathStack, topOffset: this.topOffset, bottomOffset: this.bottomOffset })
        }.tabBar(this.TabBarBuilder(0, $r('sys.symbol.house'), '首页'))

        TabContent() {
          MessageTab({ topOffset: this.topOffset, bottomOffset: this.bottomOffset })
        }.tabBar(this.TabBarBuilder(1, $r('sys.symbol.bell'), '消息'))

        TabContent() {
          DiscoverTab({ topOffset: this.topOffset, bottomOffset: this.bottomOffset })
        }.tabBar(this.TabBarBuilder(2, $r('sys.symbol.compass'), '发现'))

        TabContent() {
          ProfileTab({ navPathStack: this.navPathStack, topOffset: this.topOffset, bottomOffset: this.bottomOffset })
        }.tabBar(this.TabBarBuilder(3, $r('sys.symbol.person'), '我的'))
      }
      .vertical(false)
      .scrollable(true)
      .animationDuration(300)
      .barOverlap(true)
      .barFloatingStyle({
        barWidth: { smallWidth: 228, mediumWidth: 320, largeWidth: 328 },
        barSideMargin: 16,
        barBottomMargin: 28,
        gradientMask: {},
        adaptToHandedness: true,
        systemMaterialEffect: {
          materialType: hdsMaterial.MaterialType.ADAPTIVE,
          materialLevel: hdsMaterial.MaterialLevel.ADAPTIVE
        }
      })
      .divider({ mode: DividerMode.FOLLOW_SCROLL })
      .onChange((index: number) => {
        this.currentTab = index
      })
    }
    .titleBar({
      enableComponentSafeArea: false,
      avoidLayoutSafeArea: false,
      style: {
        systemMaterialEffect: {
          materialType: hdsMaterial.MaterialType.ADAPTIVE,
          materialLevel: hdsMaterial.MaterialLevel.ADAPTIVE
        },
        scrollEffectOpts: {
          enableScrollEffect: false,
          scrollEffectType: ScrollEffectType.GRADIENT_BLUR
        }
      },
      content: {
        title: { mainTitle: this.tabTitles[this.currentTab] },
        menu: {
          value: [
            {
              content: {
                label: '设置',
                icon: $r('sys.symbol.gearshape'),
                isEnabled: true,
                action: () => { this.navPathStack.pushPath({ name: 'SettingsPage' }) }
              }
            }
          ]
        }
      }
    })
    .titleMode(HdsNavigationTitleMode.MINI)
    .hideBackButton(true)
    .navDestination(this.buildNavDestination)
    .mode(NavigationMode.Stack)
    .ignoreLayoutSafeArea([LayoutSafeAreaType.SYSTEM], [LayoutSafeAreaEdge.TOP, LayoutSafeAreaEdge.BOTTOM])
  }

  @Builder
  TabBarBuilder(index: number, icon: Resource, title: string) {
    Column() {
      SymbolGlyph(icon)
        .fontColor([this.currentTab === index
          ? $r('sys.color.ohos_id_color_emphasize')
          : $r('sys.color.ohos_id_color_text_secondary')])
        .fontSize(22)
      Text(title)
        .fontSize(10)
        .margin({ top: 2 })
        .fontColor(this.currentTab === index
          ? $r('sys.color.ohos_id_color_emphasize')
          : $r('sys.color.ohos_id_color_text_secondary'))
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
  }

  @Builder
  buildNavDestination(name: string, _param: object) {
    if (name === 'SettingsPage') {
      SettingsPageBuilder()
    } else if (name === 'ArticleDetailPage') {
      ArticleDetailPageBuilder()
    } else if (name === 'LoginPage') {
      LoginPageBuilder()
    }
  }
}

// ==================== 首页 Tab ====================
@ComponentV2
struct HomeTab {
  @Param navPathStack: NavPathStack = new NavPathStack()
  @Param topOffset: number = 56
  @Param bottomOffset: number = 120

  build() {
    List({ space: 12 }) {
      ListItem() { Column().height(this.topOffset) }

      // 搜索栏
      ListItem() {
        Search({ placeholder: '搜索内容' })
          .width('100%')
          .searchButton('搜索')
          .backgroundColor($r('sys.color.comp_background_list_card'))
      }
      .padding({ left: 16, right: 16 })

      // 功能入口
      ListItem() {
        Row() {
          this.FunctionEntry($r('sys.symbol.keyboard'), '设备', 'https://picsum.photos/seed/dev/96/96')
          this.FunctionEntry($r('sys.symbol.magnifyingglass'), '发现', 'https://picsum.photos/seed/disc/96/96')
          this.FunctionEntry($r('sys.symbol.paperplane'), '消息', 'https://picsum.photos/seed/msg/96/96')
          this.FunctionEntry($r('sys.symbol.gearshape'), '设置', 'https://picsum.photos/seed/set/96/96')
        }
        .width('100%')
        .justifyContent(FlexAlign.SpaceAround)
        .padding({ top: 16, bottom: 16 })
        .backgroundColor($r('sys.color.comp_background_list_card'))
        .borderRadius(16)
      }
      .padding({ left: 16, right: 16 })

      // 推荐卡片
      ListItem() {
        Column({ space: 12 }) {
          Text('推荐')
            .fontSize(18)
            .fontWeight(FontWeight.Medium)
            .fontColor($r('sys.color.ohos_id_color_text_primary'))
            .width('100%')

          ForEach(this.mockCards, (item: CardData) => {
            Row() {
              Image(item.cover)
                .width(56).height(56).borderRadius(12)
                .objectFit(ImageFit.Cover)
                .autoResize(true)
              Column() {
                Text(item.title)
                  .fontSize(16)
                  .fontWeight(FontWeight.Medium)
                  .fontColor($r('sys.color.ohos_id_color_text_primary'))
                  .textAlign(TextAlign.Start)
                  .width('100%')
                Text(item.desc)
                  .fontSize(14)
                  .maxLines(2)
                  .fontColor($r('sys.color.ohos_id_color_text_secondary'))
                  .textAlign(TextAlign.Start)
                  .width('100%')
                  .margin({ top: 4 })
              }.layoutWeight(1).margin({ left: 12 }).alignItems(HorizontalAlign.Start)
            }
            .width('100%')
            .padding(16)
            .backgroundColor($r('sys.color.comp_background_list_card'))
            .borderRadius(16)
            .alignItems(VerticalAlign.Center)
            .onClick(() => {
              const articleIdMap: Record<string, string> = {
                '1': 'a1', '2': 'a2', '3': 'a3', '4': 'a1', '5': 'a2'
              }
              this.navPathStack.pushPath({ name: 'ArticleDetailPage', param: articleIdMap[item.id] ?? 'a1' })
            })
          }, (item: CardData) => item.id)
        }
        .width('100%')
        .padding({ left: 16, right: 16 })
      }

      // 快讯横幅
      ListItem() {
        Row({ space: 12 }) {
          Column() {
            SymbolGlyph($r('sys.symbol.bell'))
              .fontSize(20)
              .fontColor([$r('sys.color.ohos_id_color_emphasize')])
          }
          .width(40).height(40).borderRadius(20)
          .justifyContent(FlexAlign.Center)
          .backgroundColor($r('sys.color.comp_background_tertiary'))
          Column() {
            Text('HarmonyOS NEXT 6.1 正式发布')
              .fontSize(14)
              .fontWeight(FontWeight.Medium)
              .fontColor($r('sys.color.ohos_id_color_text_primary'))
            Text('新增沉浸材质与浮动标签栏能力，点击了解详情')
              .fontSize(12)
              .maxLines(1)
              .fontColor($r('sys.color.ohos_id_color_text_secondary'))
              .margin({ top: 4 })
          }.layoutWeight(1).alignItems(HorizontalAlign.Start)
          SymbolGlyph($r('sys.symbol.chevron_right'))
            .fontSize(16)
            .fontColor([$r('sys.color.ohos_id_color_text_hint')])
        }
        .width('100%')
        .padding(16)
        .backgroundColor($r('sys.color.comp_background_list_card'))
        .borderRadius(16)
        .alignItems(VerticalAlign.Center)
        .onClick(() => {
          promptAction.showToast({ message: '详情即将上线，敬请期待' })
        })
      }
      .padding({ left: 16, right: 16 })
      ListItem() {
        Column({ space: 12 }) {
          Text('热门文章')
            .fontSize(18)
            .fontWeight(FontWeight.Medium)
            .fontColor($r('sys.color.ohos_id_color_text_primary'))
            .width('100%')

          ForEach(this.articles, (item: CardData) => {
            Row() {
              Column() {
                Text(item.title)
                  .fontSize(15)
                  .fontWeight(FontWeight.Medium)
                  .fontColor($r('sys.color.ohos_id_color_text_primary'))
                  .textAlign(TextAlign.Start)
                  .width('100%')
                Text(item.desc)
                  .fontSize(13)
                  .maxLines(2)
                  .fontColor($r('sys.color.ohos_id_color_text_secondary'))
                  .lineHeight(20)
                  .textAlign(TextAlign.Start)
                  .width('100%')
                  .margin({ top: 4 })
              }.layoutWeight(1).alignItems(HorizontalAlign.Start)
              Image(item.cover)
                .width(80).height(60).borderRadius(8)
                .objectFit(ImageFit.Cover)
                .margin({ left: 12 })
            }
            .width('100%')
            .padding(12)
            .borderRadius(12)
            .alignItems(VerticalAlign.Center)
            .onClick(() => {
              this.navPathStack.pushPath({ name: 'ArticleDetailPage', param: item.id })
            })
          }, (item: CardData) => item.id)
        }
        .width('100%')
        .padding(16)
        .backgroundColor($r('sys.color.comp_background_list_card'))
        .borderRadius(16)
      }
      .padding({ left: 16, right: 16 })

      // 学习路径
      ListItem() {
        Column({ space: 12 }) {
          Text('学习路径')
            .fontSize(18)
            .fontWeight(FontWeight.Medium)
            .fontColor($r('sys.color.ohos_id_color_text_primary'))
            .width('100%')

          ForEach(this.learnPaths, (item: LearnPathData) => {
            Row({ space: 12 }) {
              Column() {
                Text(item.step)
                  .fontSize(12)
                  .fontWeight(FontWeight.Bold)
                  .fontColor(Color.White)
              }
              .width(28).height(28).borderRadius(14)
              .backgroundColor($r('sys.color.ohos_id_color_emphasize'))
              .justifyContent(FlexAlign.Center)
              Column() {
                Text(item.title)
                  .fontSize(15)
                  .fontWeight(FontWeight.Medium)
                  .fontColor($r('sys.color.ohos_id_color_text_primary'))
                  .textAlign(TextAlign.Start)
                  .width('100%')
                Text(item.desc)
                  .fontSize(13)
                  .fontColor($r('sys.color.ohos_id_color_text_secondary'))
                  .margin({ top: 2 })
              }.layoutWeight(1).alignItems(HorizontalAlign.Start)
              SymbolGlyph($r('sys.symbol.chevron_right'))
                .fontSize(16)
                .fontColor([$r('sys.color.ohos_id_color_text_hint')])
            }
            .width('100%')
            .height(48)
            .padding({ left: 4, right: 4 })
            .alignItems(VerticalAlign.Center)
          }, (item: LearnPathData) => item.id)
        }
        .width('100%')
        .padding(16)
        .backgroundColor($r('sys.color.comp_background_list_card'))
        .borderRadius(16)
      }
      .padding({ left: 16, right: 16 })

      ListItem() { Column().height(this.bottomOffset) }
    }
    .width('100%')
    .height('100%')
    .scrollBar(BarState.Off)
    .edgeEffect(EdgeEffect.Spring)
    .backgroundColor($r('sys.color.comp_background_tertiary'))
  }

  @Builder
  FunctionEntry(icon: Resource, label: string, coverUrl: string) {
    Column({ space: 8 }) {
      Stack() {
        Image(coverUrl)
          .width(48).height(48).borderRadius(24)
          .objectFit(ImageFit.Cover)
          .autoResize(true)
        Column()
          .width(48).height(48).borderRadius(24)
          .backgroundColor($r('sys.color.ohos_id_color_emphasize'))
          .opacity(0.15)
        SymbolGlyph(icon)
          .fontSize(24)
          .fontColor([$r('sys.color.ohos_id_color_emphasize')])
      }
      .width(48).height(48)
      Text(label)
        .fontSize(12)
        .fontColor($r('sys.color.ohos_id_color_text_secondary'))
    }
    .width(64)
    .justifyContent(FlexAlign.Center)
    .alignItems(HorizontalAlign.Center)
  }

  private mockCards: CardData[] = [
    { id: '1', title: 'HarmonyOS 开发指南', desc: '学习 HarmonyOS 应用开发基础', cover: 'https://picsum.photos/seed/card1/112/112' },
    { id: '2', title: '设计规范速查', desc: 'HDS 组件 API 与视觉规格', cover: 'https://picsum.photos/seed/card2/112/112' },
    { id: '3', title: '最佳实践', desc: '官方推荐的 UX 设计模式', cover: 'https://picsum.photos/seed/card3/112/112' },
    { id: '4', title: '组件示例集', desc: '常用组件的完整代码示例', cover: 'https://picsum.photos/seed/card4/112/112' },
    { id: '5', title: '调试与性能', desc: 'DevEco Studio 高效调试技巧', cover: 'https://picsum.photos/seed/card5/112/112' }
  ]

  private articles: CardData[] = [
    { id: 'a1', title: '一文读懂 HarmonyOS 沉浸式材质', desc: '从 hdsMaterial 到 uiMaterial，全面解析系统材质体系', cover: 'https://picsum.photos/seed/art1/160/120' },
    { id: 'a2', title: 'HDS 组件迁移实战', desc: '从基础 Navigation/Tabs 平滑升级到 HDS 组件', cover: 'https://picsum.photos/seed/art2/160/120' },
    { id: 'a3', title: '浮动标签栏深度解析', desc: '响应式断点、渐变遮罩、迷你栏一网打尽', cover: 'https://picsum.photos/seed/art3/160/120' }
  ]

  private learnPaths: LearnPathData[] = [
    { id: 'p1', step: '1', title: 'ArkTS 语言基础', desc: '掌握 ArkTS 基本语法和声明式 UI' },
    { id: 'p2', step: '2', title: '基础组件与布局', desc: 'Column、Row、List、Grid 等核心容器' },
    { id: 'p3', step: '3', title: 'HDS 设计组件', desc: 'HdsNavigation、HdsTabs 等官方组件' },
    { id: 'p4', step: '4', title: '沉浸式体验', desc: '安全区域、模糊效果、沉浸材质' }
  ]
}

// ==================== 消息 Tab ====================
@ComponentV2
struct MessageTab {
  @Param topOffset: number = 56
  @Param bottomOffset: number = 120

  build() {
    List({ space: 0 }) {
      ListItem() { Column().height(this.topOffset) }

      ForEach(this.mockMessages, (item: MessageData) => {
        ListItem() {
          Row() {
            Image(item.avatar)
              .width(44).height(44).borderRadius(22)
              .objectFit(ImageFit.Cover)
              .autoResize(true)
            Column() {
              Text(item.name)
                .fontSize(16)
                .fontWeight(FontWeight.Medium)
                .fontColor($r('sys.color.ohos_id_color_text_primary'))
                .textAlign(TextAlign.Start)
                .width('100%')
              Text(item.content)
                .fontSize(14)
                .maxLines(1)
                .fontColor($r('sys.color.ohos_id_color_text_secondary'))
                .textAlign(TextAlign.Start)
                .width('100%')
                .margin({ top: 4 })
            }.layoutWeight(1).margin({ left: 12 }).alignItems(HorizontalAlign.Start)
            if (item.unread > 0) {
              Badge({ count: item.unread, position: BadgePosition.Right, style: { badgeSize: 16 } }) {
                Text(item.time)
                  .fontSize(12)
                  .fontColor($r('sys.color.ohos_id_color_text_hint'))
              }
            } else {
              Text(item.time)
                .fontSize(12)
                .fontColor($r('sys.color.ohos_id_color_text_hint'))
            }
          }
          .width('100%')
          .padding({ left: 16, right: 16, top: 12, bottom: 12 })
          .alignItems(VerticalAlign.Center)
        }
      }, (item: MessageData) => item.id)

      ListItem() { Column().height(this.bottomOffset) }
    }
    .width('100%')
    .height('100%')
    .scrollBar(BarState.Off)
    .edgeEffect(EdgeEffect.Spring)
    .backgroundColor($r('sys.color.comp_background_tertiary'))
  }

  private mockMessages: MessageData[] = [
    { id: '1', name: '系统通知', content: '您的应用已更新到最新版本', time: '刚刚', avatar: 'https://picsum.photos/seed/u1/88/88', unread: 2 },
    { id: '2', name: '开发助手', content: '代码审查已完成，请查看结果', time: '10:30', avatar: 'https://picsum.photos/seed/u2/88/88', unread: 1 },
    { id: '3', name: '设计团队', content: '新版设计稿已上传，请确认', time: '昨天', avatar: 'https://picsum.photos/seed/u3/88/88', unread: 0 },
    { id: '4', name: '项目组', content: '本周迭代任务已分配', time: '周一', avatar: 'https://picsum.photos/seed/u4/88/88', unread: 0 }
  ]
}

// ==================== 发现 Tab ====================
@ComponentV2
struct DiscoverTab {
  @Param topOffset: number = 56
  @Param bottomOffset: number = 120

  build() {
    List({ space: 12 }) {
      ListItem() { Column().height(this.topOffset) }

      // 分类入口
      ListItem() {
        Flex({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.Start }) {
          ForEach(this.categories, (cat: CategoryData) => {
            Column({ space: 8 }) {
              Stack() {
                Column()
                  .width(44).height(44).borderRadius(22)
                  .backgroundColor($r('sys.color.comp_background_tertiary'))
                SymbolGlyph(cat.icon)
                  .fontSize(22)
                  .fontColor([$r('sys.color.ohos_id_color_emphasize')])
              }
              Text(cat.name)
                .fontSize(12)
                .fontColor($r('sys.color.ohos_id_color_text_primary'))
            }
            .width('25%')
            .padding({ top: 12, bottom: 12 })
            .justifyContent(FlexAlign.Center)
            .alignItems(HorizontalAlign.Center)
          }, (cat: CategoryData) => cat.id)
        }
        .width('100%')
        .padding({ left: 8, right: 8 })
        .backgroundColor($r('sys.color.comp_background_list_card'))
        .borderRadius(16)
      }
      .padding({ left: 16, right: 16 })

      // 热门推荐
      ListItem() {
        Column({ space: 12 }) {
          Text('热门推荐')
            .fontSize(18)
            .fontWeight(FontWeight.Medium)
            .fontColor($r('sys.color.ohos_id_color_text_primary'))
            .width('100%')

          Grid() {
            ForEach(this.hotItems, (item: HotItemData) => {
              GridItem() {
                Column() {
                  Image(item.cover)
                    .width('100%').height(88)
                    .borderRadius({ topLeft: 12, topRight: 12 })
                    .objectFit(ImageFit.Cover)
                    .autoResize(true)
                  Column() {
                    Text(item.title)
                      .fontSize(14)
                      .fontWeight(FontWeight.Medium)
                      .fontColor($r('sys.color.ohos_id_color_text_primary'))
                      .margin({ top: 8 })
                    Text(item.tag)
                      .fontSize(12)
                      .margin({ top: 2 })
                      .fontColor($r('sys.color.ohos_id_color_emphasize'))
                  }
                  .padding({ left: 8, right: 8, bottom: 8 })
                  .alignItems(HorizontalAlign.Start)
                }
                .borderRadius(12)
                .backgroundColor($r('sys.color.comp_background_list_card'))
              }
            }, (item: HotItemData) => item.id)
          }
          .columnsTemplate('1fr 1fr')
          .rowsGap(12)
          .columnsGap(12)
        }
        .width('100%')
        .padding({ left: 16, right: 16 })
      }

      ListItem() { Column().height(this.bottomOffset) }
    }
    .width('100%')
    .height('100%')
    .scrollBar(BarState.Off)
    .edgeEffect(EdgeEffect.Spring)
    .backgroundColor($r('sys.color.comp_background_tertiary'))
  }

  private categories: CategoryData[] = [
    { id: '1', name: '教程', icon: $r('sys.symbol.book') },
    { id: '2', name: '工具', icon: $r('sys.symbol.wrench_and_screwdriver') },
    { id: '3', name: '组件', icon: $r('sys.symbol.square_grid_2x2') },
    { id: '4', name: '案例', icon: $r('sys.symbol.folder') },
    { id: '5', name: '视频', icon: $r('sys.symbol.play') },
    { id: '6', name: '文章', icon: $r('sys.symbol.doc_text') },
    { id: '7', name: '更新', icon: $r('sys.symbol.arrow_clockwise') },
    { id: '8', name: '更多', icon: $r('sys.symbol.ellipsis_circle') }
  ]

  private hotItems: HotItemData[] = [
    { id: '1', title: 'ArkUI 基础', tag: '入门推荐', cover: 'https://picsum.photos/seed/hot1/400/200' },
    { id: '2', title: 'HDS 组件库', tag: '热门', cover: 'https://picsum.photos/seed/hot2/400/200' },
    { id: '3', title: '性能优化', tag: '进阶', cover: 'https://picsum.photos/seed/hot3/400/200' },
    { id: '4', title: '设计规范', tag: '官方', cover: 'https://picsum.photos/seed/hot4/400/200' }
  ]
}

// ==================== 我的 Tab ====================
@Component
struct ProfileTab {
  navPathStack: NavPathStack = new NavPathStack()
  topOffset: number = 56
  bottomOffset: number = 120
  @StorageLink('isLoggedIn') isLoggedIn: boolean = false
  @StorageLink('userName') userName: string = ''

  build() {
    List({ space: 12 }) {
      ListItem() { Column().height(this.topOffset) }

      if (this.isLoggedIn) {
        // 已登录：用户信息卡片
        ListItem() {
          Row({ space: 16 }) {
            Image('https://picsum.photos/seed/avatar/112/112')
              .width(56).height(56).borderRadius(28)
              .objectFit(ImageFit.Cover)
              .autoResize(true)
            Column() {
              Text(this.userName || '开发者')
                .fontSize(20)
                .fontWeight(FontWeight.Bold)
                .fontColor($r('sys.color.ohos_id_color_text_primary'))
                .textAlign(TextAlign.Start)
              Text(`${this.userName}@example.com`)
                .fontSize(14)
                .margin({ top: 4 })
                .fontColor($r('sys.color.ohos_id_color_text_secondary'))
            }.layoutWeight(1).alignItems(HorizontalAlign.Start)
            SymbolGlyph($r('sys.symbol.qrcode'))
              .fontSize(22)
              .fontColor([$r('sys.color.ohos_id_color_text_hint')])
            SymbolGlyph($r('sys.symbol.chevron_right'))
              .fontSize(16)
              .fontColor([$r('sys.color.ohos_id_color_text_hint')])
          }
          .width('100%')
          .padding(16)
          .backgroundColor($r('sys.color.comp_background_list_card'))
          .borderRadius(16)
          .alignItems(VerticalAlign.Center)
        }
        .padding({ left: 16, right: 16 })

        // 功能列表
        ListItem() {
          Column() {
            this.MenuItemRow($r('sys.symbol.bell'), '消息通知', true, () => {
              promptAction.showToast({ message: '暂无新消息' })
            })
            Divider().color($r('sys.color.ohos_id_color_list_separator'))
            this.MenuItemRow($r('sys.symbol.star'), '我的收藏', false, () => {
              promptAction.showToast({ message: '收藏列表为空' })
            })
            Divider().color($r('sys.color.ohos_id_color_list_separator'))
            this.MenuItemRow($r('sys.symbol.clock'), '浏览记录', false, () => {
              promptAction.showToast({ message: '暂无浏览记录' })
            })
            Divider().color($r('sys.color.ohos_id_color_list_separator'))
            this.MenuItemRow($r('sys.symbol.gearshape'), '设置', false, () => {
              this.navPathStack.pushPath({ name: 'SettingsPage' })
            })
          }
          .borderRadius(16)
          .backgroundColor($r('sys.color.comp_background_list_card'))
          .padding({ left: 16, right: 16 })
        }
        .padding({ left: 16, right: 16 })

        // 退出登录
        ListItem() {
          Button('退出登录')
            .width('100%')
            .height(48)
            .fontSize(16)
            .fontColor($r('sys.color.ohos_id_color_emphasize'))
            .backgroundColor($r('sys.color.comp_background_list_card'))
            .borderRadius(16)
            .onClick(() => {
              this.getUIContext().showAlertDialog({
                title: '确认退出',
                message: '退出后需要重新登录，是否确认退出？',
                alignment: DialogAlignment.Center,
                primaryButton: {
                  value: '取消',
                  action: () => {}
                },
                secondaryButton: {
                  value: '确认退出',
                  action: () => {
                    this.isLoggedIn = false
                    this.userName = ''
                    this.navPathStack.pushPath({ name: 'LoginPage' })
                  }
                }
              })
            })
        }
        .padding({ left: 16, right: 16 })
      } else {
        // 未登录：登录引导
        ListItem() {
          Column({ space: 16 }) {
            Column() {
              SymbolGlyph($r('sys.symbol.person'))
                .fontSize(48)
                .fontColor([$r('sys.color.ohos_id_color_text_hint')])
            }
            .width(80).height(80).borderRadius(40)
            .justifyContent(FlexAlign.Center)
            .backgroundColor($r('sys.color.comp_background_tertiary'))

            Text('登录后查看更多内容')
              .fontSize(16)
              .fontColor($r('sys.color.ohos_id_color_text_secondary'))

            Button('立即登录')
              .height(40)
              .padding({ left: 32, right: 32 })
              .buttonStyle(ButtonStyleMode.EMPHASIZED)
              .onClick(() => {
                this.navPathStack.pushPath({ name: 'LoginPage' })
              })
          }
          .width('100%')
          .padding({ top: 48, bottom: 32 })
          .alignItems(HorizontalAlign.Center)
        }
        .padding({ left: 16, right: 16 })
      }

      ListItem() { Column().height(this.bottomOffset) }
    }
    .width('100%')
    .height('100%')
    .scrollBar(BarState.Off)
    .edgeEffect(EdgeEffect.Spring)
    .backgroundColor($r('sys.color.comp_background_tertiary'))
  }

  @Builder
  MenuItemRow(icon: Resource, title: string, showBadge: boolean, action: () => void) {
    Row() {
      SymbolGlyph(icon)
        .fontSize(22)
        .fontColor([$r('sys.color.ohos_id_color_emphasize')])
      Text(title)
        .fontSize(16)
        .margin({ left: 12 })
        .fontColor($r('sys.color.ohos_id_color_text_primary'))
        .layoutWeight(1)
      if (showBadge) {
        Badge({ count: 3, position: BadgePosition.Right, style: { badgeSize: 8 } }) {
          SymbolGlyph($r('sys.symbol.chevron_right'))
            .fontSize(16)
            .fontColor([$r('sys.color.ohos_id_color_text_hint')])
        }
      } else {
        SymbolGlyph($r('sys.symbol.chevron_right'))
          .fontSize(16)
          .fontColor([$r('sys.color.ohos_id_color_text_hint')])
      }
    }
    .width('100%')
    .height(48)
    .alignItems(VerticalAlign.Center)
    .onClick(() => { action() })
  }
}

// ==================== 数据类型 ====================
interface CardData {
  id: string
  title: string
  desc: string
  cover: string
}

interface MessageData {
  id: string
  name: string
  content: string
  time: string
  avatar: string
  unread: number
}

interface CategoryData {
  id: string
  name: string
  icon: Resource
}

interface HotItemData {
  id: string
  title: string
  tag: string
  cover: string
}

interface LearnPathData {
  id: string
  step: string
  title: string
  desc: string
}
