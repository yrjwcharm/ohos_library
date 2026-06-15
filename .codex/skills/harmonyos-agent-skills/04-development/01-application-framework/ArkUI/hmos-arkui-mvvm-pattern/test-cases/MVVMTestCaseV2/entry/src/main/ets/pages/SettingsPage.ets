import {
  HdsNavDestination, ScrollEffectType,
  HdsListItemCard, PrefixIcon,
  SuffixSwitch, SuffixArrow,
  IconSize, hdsMaterial
} from '@kit.UIDesignKit'
import { AppStorageV2 } from '@kit.ArkUI'
import { SafeAreaState } from './AppStorageV2Models'

@ComponentV2
struct SettingsPage {
  @Local isNotificationOn: boolean = true
  @Local isDarkModeOn: boolean = false
  @Local topOffset: number = 56
  @Local bottomOffset: number = 32
  @Local safeAreaState: SafeAreaState = AppStorageV2.connect(SafeAreaState, () => new SafeAreaState())!
  private scroller: Scroller = new Scroller()

  aboutToAppear(): void {
    this.topOffset = this.getUIContext().px2vp(this.safeAreaState.topAvoidHeight) + 56
    this.bottomOffset = this.getUIContext().px2vp(this.safeAreaState.bottomAvoidHeight) + 32
  }

  build() {
    HdsNavDestination() {
      List({ space: 0, scroller: this.scroller }) {
        // 标题栏占位
        ListItem() {
          Column().height(this.topOffset).width('100%')
        }

        // 用户头像区
        ListItem() {
          Row() {
            HdsListItemCard({
              prefixItem: new PrefixIcon({
                iconSize: IconSize.SYSTEM_ICON,
                iconValue: { symbol: $r('sys.symbol.star_circle_fill') },
              }),
              textItem: {
                primaryText: { text: '用户名' },
                secondaryText: { text: 'HarmonyOS 账号' },
              },
              suffixItem: new SuffixArrow(),
              cardPrefixMargin: 0,
              cardSuffixMargin: 0,
              cardBackgroundColor: $r('sys.color.ohos_id_color_background_transparent'),
            })
          }
          .width('100%')
          .height(72)
          .borderRadius(16)
          .padding({ left: 6, right: 6 })
          .backgroundColor($r('sys.color.comp_background_list_card'))
        }
        .margin({ top: 8 })

        // 通用设置标题
        ListItem() {
          Text('通用设置')
            .fontSize($r('sys.float.Caption_L'))
            .fontColor($r('sys.color.font_secondary'))
        }
        .padding({ left: 4 })
        .margin({ top: 24, bottom: 4 })

        // 通用设置组
        ListItemGroup() {
          ListItem() {
            Row() {
              HdsListItemCard({
                prefixItem: new PrefixIcon({
                  iconSize: IconSize.SYSTEM_ICON,
                  iconValue: { symbol: $r('sys.symbol.bell') },
                }),
                textItem: { primaryText: { text: '通知' } },
                suffixItem: new SuffixSwitch({
                  isCheck: this.isNotificationOn,
                  onChange: (isOn: boolean) => { this.isNotificationOn = isOn },
                }),
                cardPrefixMargin: 0,
                cardSuffixMargin: 0,
                cardBackgroundColor: $r('sys.color.ohos_id_color_background_transparent'),
              })
            }.width('100%').height(56)
          }

          ListItem() {
            Row() {
              HdsListItemCard({
                prefixItem: new PrefixIcon({
                  iconSize: IconSize.SYSTEM_ICON,
                  iconValue: { symbol: $r('sys.symbol.ohos_folder_badge_plus') },
                }),
                textItem: {
                  primaryText: { text: '存储管理' },
                  secondaryText: { text: '已用 12.3 GB' },
                },
                suffixItem: new SuffixArrow(),
                cardPrefixMargin: 0,
                cardSuffixMargin: 0,
                cardBackgroundColor: $r('sys.color.ohos_id_color_background_transparent'),
              })
            }.width('100%').height(64)
          }

          ListItem() {
            Row() {
              HdsListItemCard({
                prefixItem: new PrefixIcon({
                  iconSize: IconSize.SYSTEM_ICON,
                  iconValue: { symbol: $r('sys.symbol.paperplane') },
                }),
                textItem: {
                  primaryText: { text: '语言' },
                  secondaryText: { text: '简体中文' },
                },
                suffixItem: new SuffixArrow(),
                cardPrefixMargin: 0,
                cardSuffixMargin: 0,
                cardBackgroundColor: $r('sys.color.ohos_id_color_background_transparent'),
              })
            }.width('100%').height(64)
          }
        }
        .borderRadius(16)
        .padding({ left: 12, right: 12 })
        .backgroundColor($r('sys.color.comp_background_list_card'))
        .divider({
          strokeWidth: 1,
          startMargin: 40,
          endMargin: 6,
          color: $r('sys.color.comp_background_tertiary'),
        })

        // 显示设置标题
        ListItem() {
          Text('显示设置')
            .fontSize($r('sys.float.Caption_L'))
            .fontColor($r('sys.color.font_secondary'))
        }
        .padding({ left: 4 })
        .margin({ top: 24, bottom: 4 })

        // 显示设置组
        ListItemGroup() {
          ListItem() {
            Row() {
              HdsListItemCard({
                prefixItem: new PrefixIcon({
                  iconSize: IconSize.SYSTEM_ICON,
                  iconValue: { symbol: $r('sys.symbol.moon') },
                }),
                textItem: { primaryText: { text: '深色模式' } },
                suffixItem: new SuffixSwitch({
                  isCheck: this.isDarkModeOn,
                  onChange: (isOn: boolean) => { this.isDarkModeOn = isOn },
                }),
                cardPrefixMargin: 0,
                cardSuffixMargin: 0,
                cardBackgroundColor: $r('sys.color.ohos_id_color_background_transparent'),
              })
            }.width('100%').height(56)
          }

          ListItem() {
            Row() {
              HdsListItemCard({
                prefixItem: new PrefixIcon({
                  iconSize: IconSize.SYSTEM_ICON,
                  iconValue: { symbol: $r('sys.symbol.dot_grid_2x2') },
                }),
                textItem: {
                  primaryText: { text: '字体大小' },
                  secondaryText: { text: '标准' },
                },
                suffixItem: new SuffixArrow(),
                cardPrefixMargin: 0,
                cardSuffixMargin: 0,
                cardBackgroundColor: $r('sys.color.ohos_id_color_background_transparent'),
              })
            }.width('100%').height(64)
          }
        }
        .borderRadius(16)
        .padding({ left: 12, right: 12 })
        .backgroundColor($r('sys.color.comp_background_list_card'))
        .divider({
          strokeWidth: 1,
          startMargin: 40,
          endMargin: 6,
          color: $r('sys.color.comp_background_tertiary'),
        })

        // 关于标题
        ListItem() {
          Text('关于')
            .fontSize($r('sys.float.Caption_L'))
            .fontColor($r('sys.color.font_secondary'))
        }
        .padding({ left: 4 })
        .margin({ top: 24, bottom: 4 })

        // 关于组
        ListItemGroup() {
          ListItem() {
            Row() {
              HdsListItemCard({
                prefixItem: new PrefixIcon({
                  iconSize: IconSize.SYSTEM_ICON,
                  iconValue: { symbol: $r('sys.symbol.info_circle') },
                }),
                textItem: {
                  primaryText: { text: '版本信息' },
                  secondaryText: { text: 'v1.0.0' },
                },
                suffixItem: new SuffixArrow(),
                cardPrefixMargin: 0,
                cardSuffixMargin: 0,
                cardBackgroundColor: $r('sys.color.ohos_id_color_background_transparent'),
              })
            }.width('100%').height(64)
          }

          ListItem() {
            Row() {
              HdsListItemCard({
                prefixItem: new PrefixIcon({
                  iconSize: IconSize.SYSTEM_ICON,
                  iconValue: { symbol: $r('sys.symbol.checkmark_circle') },
                }),
                textItem: { primaryText: { text: '隐私政策' } },
                suffixItem: new SuffixArrow(),
                cardPrefixMargin: 0,
                cardSuffixMargin: 0,
                cardBackgroundColor: $r('sys.color.ohos_id_color_background_transparent'),
              })
            }.width('100%').height(56)
          }

          ListItem() {
            Row() {
              HdsListItemCard({
                prefixItem: new PrefixIcon({
                  iconSize: IconSize.SYSTEM_ICON,
                  iconValue: { symbol: $r('sys.symbol.doc_text') },
                }),
                textItem: { primaryText: { text: '用户协议' } },
                suffixItem: new SuffixArrow(),
                cardPrefixMargin: 0,
                cardSuffixMargin: 0,
                cardBackgroundColor: $r('sys.color.ohos_id_color_background_transparent'),
              })
            }.width('100%').height(56)
          }
        }
        .borderRadius(16)
        .padding({ left: 12, right: 12 })
        .backgroundColor($r('sys.color.comp_background_list_card'))
        .divider({
          strokeWidth: 1,
          startMargin: 40,
          endMargin: 6,
          color: $r('sys.color.comp_background_tertiary'),
        })
        // 底部间距
        ListItem() {
          Column().height(this.bottomOffset)
        }
      }
      .width('100%')
      .height('100%')
      .padding({ left: 16, right: 16 })
      .backgroundColor($r('sys.color.background_secondary'))
      .scrollBar(BarState.Off)
      .edgeEffect(EdgeEffect.Spring)
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
        title: { mainTitle: '设置' },
        backIcon: { label: '返回', isEnabled: true },
      }
    })
    .hideBackButton(false)
    .bindToScrollable([this.scroller])
    .ignoreLayoutSafeArea([LayoutSafeAreaType.SYSTEM], [LayoutSafeAreaEdge.TOP, LayoutSafeAreaEdge.BOTTOM])
  }
}

@Builder
export function SettingsPageBuilder() {
  SettingsPage()
}
