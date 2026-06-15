import {
  HdsNavDestination, ScrollEffectType, hdsMaterial
} from '@kit.UIDesignKit'
import { AppStorageV2, LengthMetrics, promptAction } from '@kit.ArkUI'
import { SafeAreaState } from './AppStorageV2Models'

interface ArticleData {
  id: string
  title: string
  author: string
  authorAvatar: string
  date: string
  category: string
  readTime: string
  summary: string
  content: string[]
  tags: string[]
  cover: string
}

@ComponentV2
struct ArticleDetailPage {
  @Local articleId: string = ''
  @Local topOffset: number = 56
  @Local bottomOffset: number = 32
  @Local showShareSheet: boolean = false
  @Local showBookmarkPopup: boolean = false
  @Local safeAreaState: SafeAreaState = AppStorageV2.connect(SafeAreaState, () => new SafeAreaState())!
  private scroller: Scroller = new Scroller()

  private articleMap: Record<string, ArticleData> = {
    'a1': {
      id: 'a1', title: '一文读懂 HarmonyOS 沉浸式材质',
      author: 'HarmonyOS 技术团队', authorAvatar: 'https://picsum.photos/seed/author1/100/100',
      date: '2025-05-20', category: '技术深度',
      readTime: '12 分钟', summary: '从 hdsMaterial 到 uiMaterial，全面解析系统材质体系的设计理念和使用方法',
      cover: 'https://picsum.photos/seed/tech-material/800/400',
      content: [
        'HarmonyOS 的沉浸式材质体系是系统设计语言的核心组成部分。它通过半透明模糊、高光反射和动态响应，让界面元素呈现出真实世界的质感。',
        '## 两层材质架构\n\nHarmonyOS 提供了两层材质 API：HDS 层的 hdsMaterial 和基础层的 uiMaterial。hdsMaterial 专注于 HDS 组件（HdsNavigation、HdsTabs）的标题栏和标签栏，通过组件属性内部的嵌套参数配置。uiMaterial 则是通用层，可以应用到任意组件的 .systemMaterial() 属性上。',
        '## MaterialType 与设备能力\n\nMaterialType 分为三种：NONE（无材质）、ADAPTIVE（自适应系统材质）、IMMERSIVE（沉浸式材质，视觉效果更丰富）。不同设备的 GPU 能力不同，高/中档设备支持完整的滤镜+高光效果，低档设备则降级为背景色+边框+阴影。推荐使用 MaterialLevel.ADAPTIVE 让系统自动平衡。',
        '## 实际应用场景\n\n沉浸材质最常见的应用场景是标题栏和浮动标签栏。标题栏配合 GRADIENT_BLUR 滚动效果，当用户滚动内容时，标题栏的模糊效果会动态变化，营造出层次感。浮动标签栏则通过 barFloatingStyle 中的 systemMaterialEffect 获得半透明的磨砂质感。',
        '## 注意事项\n\n沉浸材质仅在真机上可见，模拟器上静默无效果。在 6.0.0 设备上调用 getSystemMaterialTypes() 会失败，需要 try-catch 保护。建议始终使用设备能力检测模式，先查询支持的材质类型再决定使用哪种效果。'
      ],
      tags: ['沉浸材质', 'hdsMaterial', 'uiMaterial', '设计系统']
    },
    'a2': {
      id: 'a2', title: 'HDS 组件迁移实战',
      author: '开发者关系团队', authorAvatar: 'https://picsum.photos/seed/author2/100/100',
      date: '2025-05-18', category: '开发指南',
      readTime: '15 分钟', summary: '从基础 Navigation/Tabs/SideBarContainer 平滑升级到 HDS 组件的完整方案',
      cover: 'https://picsum.photos/seed/dev-migration/800/400',
      content: [
        'HDS（HarmonyOS Design System）组件库是 HarmonyOS 6.0.0+ 的官方设计组件，提供了系统级的视觉风格和交互模式。从基础组件迁移到 HDS 组件，可以获得自动模糊标题栏、浮动标签栏、系统级操作栏等能力。',
        '## Navigation → HdsNavigation\n\nHdsNavigation 封装了标题栏模糊、大标题折叠、沉浸材质等能力。迁移时需要将 Navigation 替换为 HdsNavigation，将 NavDestination 替换为 HdsNavDestination。标题栏配置从直接属性改为 .titleBar() 的嵌套结构。',
        '## Tabs → HdsTabs\n\nHdsTabs 最大的增强是浮动标签栏。通过 barOverlap(true) + barFloatingStyle() 配置，标签栏悬浮在内容区上方，配合渐变遮罩实现自然的视觉融合。基础 Tabs 没有这个能力。',
        '## SideBarContainer → HdsSideBar\n\nHdsSideBar + HdsSideMenu 提供了系统级侧边栏导航风格，包括选中态、分割线、自适应折叠等。HdsSideMenu 的主菜单项上限为 5 个，超出不可见。',
        '## ListItem → HdsListItem\n\nHdsListItem 提供了系统级滑动操作、按压反馈和分割线。基础实现需要手搓 SwipeAction + stateStyles，HdsListItem 开箱即用。'
      ],
      tags: ['迁移指南', 'HDS', '组件库', '最佳实践']
    },
    'a3': {
      id: 'a3', title: '浮动标签栏深度解析',
      author: 'UX 设计团队', authorAvatar: 'https://picsum.photos/seed/author3/100/100',
      date: '2025-05-15', category: '设计解析',
      readTime: '10 分钟', summary: '响应式断点、渐变遮罩、迷你栏、降级策略一网打尽',
      cover: 'https://picsum.photos/seed/ux-tabs/800/400',
      content: [
        '浮动标签栏是 HarmonyOS 官方推荐的底部页签首选风格。它悬浮在内容区上方，配合渐变遮罩让标签栏与内容自然融合，特别适合内容导向的应用。',
        '## 前置条件\n\n浮动标签栏必须同时满足三个条件：barOverlap(true)、barPosition(BarPosition.End)、vertical(false)。三者缺一不可，缺少任何一个都不会生效。',
        '## 响应式宽度断点\n\n浮动标签栏的宽度根据设备屏幕自动调整。小屏（< 440vp）宽度 228vp，中屏（440-600vp）320vp，大屏（> 840vp）最大 328vp。侧边距也随屏幕变化：小屏 16vp，中屏 24vp，大屏 32vp。',
        '## 渐变遮罩\n\ngradientMask 是 HdsTabsBackgroundStyle 对象类型，不是布尔值。默认浅色蒙层 #CCF1F3F5，深色 #99000000。使用 gradientMask: {} 即可启用默认值。',
        '## 降级策略\n\n目标设备低于 6.1.0(23) 时，浮动标签栏不可用。推荐写法是用 deviceApi 判断：高版本用 barOverlap(true) + barFloatingStyle()，低版本降级为固定标签栏 barOverlap(false) + barBackgroundColor + barBackgroundBlurStyle。'
      ],
      tags: ['浮动标签栏', 'HdsTabs', '响应式', '设计规范']
    }
  }

  aboutToAppear(): void {
    this.topOffset = this.getUIContext().px2vp(this.safeAreaState.topAvoidHeight) + 56
    this.bottomOffset = this.getUIContext().px2vp(this.safeAreaState.bottomAvoidHeight) + 32
  }

  build() {
    HdsNavDestination() {
      Column() {
        Scroll(this.scroller) {
          Column() {
            Column().height(this.topOffset)

            // 头图区域
            Stack() {
              Image(this.article?.cover ?? '')
                .width('100%')
                .height(220)
                .objectFit(ImageFit.Cover)
              Column() {
                Row({ space: 6 }) {
                  Text(this.article?.category ?? '')
                    .fontSize(12)
                    .fontColor(Color.White)
                    .backgroundColor($r('sys.color.ohos_id_color_emphasize'))
                    .borderRadius(4)
                    .padding({ left: 8, right: 8, top: 2, bottom: 2 })
                  Text(this.article?.readTime ?? '')
                    .fontSize(12)
                    .fontColor(Color.White)
                    .opacity(0.9)
                }
                Text(this.article?.title ?? '')
                  .fontSize(24)
                  .fontWeight(FontWeight.Bold)
                  .fontColor(Color.White)
                  .maxLines(2)
                  .margin({ top: 12 })
                  .textShadow({ radius: 4, color: '#40000000', offsetX: 0, offsetY: 2 })
              }
              .width('100%')
              .padding({ left: 20, right: 20, bottom: 16 })
              .alignItems(HorizontalAlign.Start)
              .align(Alignment.BottomStart)
            }
            .width('100%')
            .height(220)

            // 作者信息
            Row({ space: 12 }) {
              Image(this.article?.authorAvatar ?? '')
                .width(40).height(40).borderRadius(20)
                .objectFit(ImageFit.Cover)
              Column() {
                Text(this.article?.author ?? '')
                  .fontSize(14)
                  .fontWeight(FontWeight.Medium)
                  .fontColor($r('sys.color.ohos_id_color_text_primary'))
                Text(this.article?.date ?? '')
                  .fontSize(12)
                  .fontColor($r('sys.color.ohos_id_color_text_hint'))
                  .margin({ top: 2 })
              }.alignItems(HorizontalAlign.Start).layoutWeight(1)
              Row() {
                SymbolGlyph($r('sys.symbol.share'))
                  .fontSize(20)
                  .fontColor([$r('sys.color.ohos_id_color_text_secondary')])
              }
              .width(36).height(36).borderRadius(18)
              .justifyContent(FlexAlign.Center)
              .backgroundColor($r('sys.color.comp_background_tertiary'))
              .onClick(() => { this.showShareSheet = true })
              Row() {
                SymbolGlyph($r('sys.symbol.bookmark'))
                  .fontSize(20)
                  .fontColor([$r('sys.color.ohos_id_color_text_secondary')])
              }
              .width(36).height(36).borderRadius(18)
              .justifyContent(FlexAlign.Center)
              .backgroundColor($r('sys.color.comp_background_tertiary'))
              .bindPopup(this.showBookmarkPopup, {
                message: '已添加到收藏',
                placement: Placement.Top,
                showInSubWindow: false,
              })
              .onClick(() => {
                this.showBookmarkPopup = !this.showBookmarkPopup
              })
            }
            .width('100%')
            .padding({ left: 20, right: 20, top: 16, bottom: 16 })
            .alignItems(VerticalAlign.Center)

            // 摘要
            Column() {
              Row({ space: 8 }) {
                SymbolGlyph($r('sys.symbol.doc_text'))
                  .fontSize(16)
                  .fontColor([$r('sys.color.ohos_id_color_emphasize')])
                Text('摘要')
                  .fontSize(14)
                  .fontWeight(FontWeight.Medium)
                  .fontColor($r('sys.color.ohos_id_color_emphasize'))
              }
              Text(this.article?.summary ?? '')
                .fontSize(14)
                .fontColor($r('sys.color.ohos_id_color_text_secondary'))
                .lineHeight(22)
                .margin({ top: 8 })
                .textAlign(TextAlign.Start)
            }
            .width('100%')
            .padding({ left: 20, right: 20, top: 4, bottom: 16 })
            .alignItems(HorizontalAlign.Start)

            // 正文内容
            Column() {
              ForEach(this.article?.content ?? [], (paragraph: string) => {
                Text(paragraph)
                  .fontSize(15)
                  .fontColor($r('sys.color.ohos_id_color_text_primary'))
                  .lineHeight(24)
                  .margin({ top: 16 })
                  .textAlign(TextAlign.Start)
                  .width('100%')
              }, (_: string, index: number) => `${index}`)
            }
            .width('100%')
            .padding({ left: 20, right: 20, top: 4, bottom: 16 })
            .alignItems(HorizontalAlign.Start)

            // 标签区
            Column() {
              Text('相关标签')
                .fontSize(14)
                .fontWeight(FontWeight.Medium)
                .fontColor($r('sys.color.ohos_id_color_text_primary'))
                .width('100%')
              Flex({ wrap: FlexWrap.Wrap, space: { cross: LengthMetrics.vp(8), main: LengthMetrics.vp(8) } }) {
                ForEach(this.article?.tags ?? [], (tag: string) => {
                  Row() {
                    SymbolGlyph($r('sys.symbol.hash'))
                      .fontSize(12)
                      .fontColor([$r('sys.color.ohos_id_color_emphasize')])
                    Text(tag)
                      .fontSize(12)
                      .fontColor($r('sys.color.ohos_id_color_emphasize'))
                      .margin({ left: 4 })
                  }
                  .padding({ left: 12, right: 12, top: 6, bottom: 6 })
                  .borderRadius(16)
                  .backgroundColor($r('sys.color.comp_background_tertiary'))
                }, (tag: string) => tag)
              }.margin({ top: 12 })
            }
            .width('100%')
            .padding({ left: 20, right: 20, top: 8, bottom: 16 })
            .alignItems(HorizontalAlign.Start)

            // 相关推荐
            Column() {
              Row() {
                SymbolGlyph($r('sys.symbol.list_bullet'))
                  .fontSize(18)
                  .fontColor([$r('sys.color.ohos_id_color_text_primary')])
                Text('相关推荐')
                  .fontSize(16)
                  .fontWeight(FontWeight.Medium)
                  .fontColor($r('sys.color.ohos_id_color_text_primary'))
                  .margin({ left: 6 })
              }.margin({ bottom: 12 })

              ForEach(this.relatedArticles, (item: ArticleData) => {
                Row() {
                  Image(item.cover)
                    .width(88).height(60).borderRadius(8)
                    .objectFit(ImageFit.Cover)
                  Column() {
                    Text(item.title)
                      .fontSize(14)
                      .fontWeight(FontWeight.Medium)
                      .fontColor($r('sys.color.ohos_id_color_text_primary'))
                      .maxLines(1)
                      .textAlign(TextAlign.Start)
                    Text(item.summary)
                      .fontSize(12)
                      .fontColor($r('sys.color.ohos_id_color_text_secondary'))
                      .maxLines(1)
                      .margin({ top: 4 })
                      .textAlign(TextAlign.Start)
                  }.layoutWeight(1).margin({ left: 12 }).alignItems(HorizontalAlign.Start)
                }
                .width('100%')
                .padding(12)
                .borderRadius(12)
                .backgroundColor($r('sys.color.comp_background_tertiary'))
                .alignItems(VerticalAlign.Center)
              }, (item: ArticleData) => item.id)
            }
            .width('100%')
            .padding({ left: 20, right: 20, top: 4, bottom: 16 })
            .alignItems(HorizontalAlign.Start)

            Column().height(this.bottomOffset)
          }
        }
        .layoutWeight(1)
        .scrollBar(BarState.Off)
        .edgeEffect(EdgeEffect.Spring)
        .backgroundColor($r('sys.color.ohos_id_color_background'))
      }
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
          enableScrollEffect: true,
          scrollEffectType: ScrollEffectType.GRADIENT_BLUR,
        }
      },
      content: {
        title: { mainTitle: this.article?.category ?? '文章详情' },
        backIcon: { label: '返回', isEnabled: true }
      }
    })
    .hideBackButton(false)
    .onReady((context: NavDestinationContext) => {
      this.articleId = (context.pathInfo.param as string) ?? 'a1'
    })
    .bindToScrollable([this.scroller])
    .dynamicHideTitleBar({ hideTitleArea: true })
    .ignoreLayoutSafeArea([LayoutSafeAreaType.SYSTEM], [LayoutSafeAreaEdge.TOP, LayoutSafeAreaEdge.BOTTOM])
    .bindSheet(this.showShareSheet!!, this.ShareSheetBuilder(), {
      height: SheetSize.FIT_CONTENT,
      showClose: false,
      dragBar: true,
      backgroundColor: $r('sys.color.comp_background_list_card'),
    })
  }

  @Builder
  ShareSheetBuilder() {
    Column() {
      Text('分享到')
        .fontSize(16)
        .fontWeight(FontWeight.Medium)
        .fontColor($r('sys.color.ohos_id_color_text_primary'))
        .width('100%')
        .textAlign(TextAlign.Center)
        .margin({ top: 8, bottom: 20 })

      Grid() {
        ForEach(this.shareChannels, (channel: ShareChannelData) => {
          GridItem() {
            Column({ space: 8 }) {
              Column() {
                SymbolGlyph(channel.icon)
                  .fontSize(24)
                  .fontColor([channel.color])
              }
              .width(48).height(48).borderRadius(24)
              .justifyContent(FlexAlign.Center)
              .backgroundColor($r('sys.color.comp_background_tertiary'))
              Text(channel.name)
                .fontSize(12)
                .fontColor($r('sys.color.ohos_id_color_text_primary'))
            }
            .justifyContent(FlexAlign.Center)
            .alignItems(HorizontalAlign.Center)
          }
          .onClick(() => {
            this.showShareSheet = false
            promptAction.showToast({ message: `已分享到${channel.name}` })
          })
        }, (channel: ShareChannelData) => channel.name)
      }
      .columnsTemplate('1fr 1fr 1fr 1fr')
      .rowsGap(16)
      .width('100%')

      Button('取消')
        .width('100%')
        .height(40)
        .margin({ top: 24, bottom: 16 })
        .buttonStyle(ButtonStyleMode.NORMAL)
        .onClick(() => { this.showShareSheet = false })
    }
    .width('100%')
    .padding({ left: 24, right: 24 })
  }

  private get article(): ArticleData | undefined {
    return this.articleMap[this.articleId]
  }

  private get relatedArticles(): ArticleData[] {
    const ids = Object.keys(this.articleMap).filter(id => id !== this.articleId)
    return ids.map(id => this.articleMap[id])
  }

  private shareChannels: ShareChannelData[] = [
    { name: '华为分享', icon: $r('sys.symbol.share'), color: $r('sys.color.ohos_id_color_emphasize') },
    { name: '微信', icon: $r('sys.symbol.message'), color: $r('sys.color.ohos_id_color_emphasize') },
    { name: '复制链接', icon: $r('sys.symbol.link'), color: $r('sys.color.ohos_id_color_emphasize') },
    { name: '保存', icon: $r('sys.symbol.arrow_down_circle'), color: $r('sys.color.ohos_id_color_emphasize') },
  ]
}

interface ShareChannelData {
  name: string
  icon: Resource
  color: Resource
}

@Builder
export function ArticleDetailPageBuilder() {
  ArticleDetailPage()
}
