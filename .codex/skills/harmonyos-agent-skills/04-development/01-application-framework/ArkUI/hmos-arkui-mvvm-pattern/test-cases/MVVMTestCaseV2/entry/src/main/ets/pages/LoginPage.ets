import {
  HdsNavDestination, ScrollEffectType, hdsMaterial
} from '@kit.UIDesignKit'
import { AppStorageV2 } from '@kit.ArkUI'
import { LoginState, SafeAreaState } from './AppStorageV2Models'

@ComponentV2
struct LoginPage {
  @Local username: string = ''
  @Local password: string = ''
  @Local isLoading: boolean = false
  @Local topOffset: number = 56
  @Local loginState: LoginState = AppStorageV2.connect(LoginState, () => new LoginState())!
  @Local safeAreaState: SafeAreaState = AppStorageV2.connect(SafeAreaState, () => new SafeAreaState())!
  private pathStack: NavPathStack | null = null

  aboutToAppear(): void {
    this.topOffset = this.getUIContext().px2vp(this.safeAreaState.topAvoidHeight) + 56
  }

  build() {
    HdsNavDestination() {
      Column() {
        Column().height(this.topOffset)

        // Logo
        Column({ space: 8 }) {
          Column() {
            SymbolGlyph($r('sys.symbol.phone'))
              .fontSize(36)
              .fontColor([$r('sys.color.ohos_id_color_emphasize')])
          }
          .width(72).height(72).borderRadius(36)
          .justifyContent(FlexAlign.Center)
          .backgroundColor($r('sys.color.comp_background_tertiary'))
          Text('HarmonyOS App')
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .fontColor($r('sys.color.ohos_id_color_text_primary'))
          Text('登录以获取完整体验')
            .fontSize(14)
            .fontColor($r('sys.color.ohos_id_color_text_secondary'))
        }
        .margin({ top: 32, bottom: 40 })

        // 输入区
        Column({ space: 16 }) {
          TextInput({ placeholder: '请输入账号', text: this.username!! })
            .width('100%')
            .height(48)
            .borderRadius(24)
            .backgroundColor($r('sys.color.comp_background_tertiary'))
            .padding({ left: 20, right: 20 })

          TextInput({ placeholder: '请输入密码', text: this.password!! })
            .width('100%')
            .height(48)
            .borderRadius(24)
            .backgroundColor($r('sys.color.comp_background_tertiary'))
            .padding({ left: 20, right: 20 })
            .type(InputType.Password)
        }
        .width('100%')
        .padding({ left: 40, right: 40 })

        // 登录按钮
        Column() {
          Button() {
            if (this.isLoading) {
              LoadingProgress()
                .width(24).height(24)
                .color($r('sys.color.font_on_primary'))
            } else {
              Text('登录')
                .fontSize(16)
                .fontWeight(FontWeight.Medium)
                .fontColor($r('sys.color.font_on_primary'))
            }
          }
          .width('100%')
          .height(48)
          .borderRadius(24)
          .buttonStyle(ButtonStyleMode.EMPHASIZED)
          .enabled(!this.isLoading && this.username.length > 0 && this.password.length > 0)
          .stateEffect(true)
          .onClick(() => { this.doLogin() })
        }
        .width('100%')
        .padding({ left: 40, right: 40 })
        .margin({ top: 32 })

        // 其他登录方式
        Column({ space: 16 }) {
          Row() {
            Divider().layoutWeight(1).color($r('sys.color.ohos_id_color_list_separator'))
            Text('其他登录方式')
              .fontSize(12)
              .fontColor($r('sys.color.ohos_id_color_text_hint'))
              .padding({ left: 12, right: 12 })
            Divider().layoutWeight(1).color($r('sys.color.ohos_id_color_list_separator'))
          }
          .width('100%')
          .alignItems(VerticalAlign.Center)

          Row({ space: 40 }) {
            Column({ space: 6 }) {
              SymbolGlyph($r('sys.symbol.person'))
                .fontSize(24)
                .fontColor([$r('sys.color.ohos_id_color_text_secondary')])
              Text('人脸')
                .fontSize(12)
                .fontColor($r('sys.color.ohos_id_color_text_secondary'))
            }
            Column({ space: 6 }) {
              SymbolGlyph($r('sys.symbol.lock'))
                .fontSize(24)
                .fontColor([$r('sys.color.ohos_id_color_text_secondary')])
              Text('指纹')
                .fontSize(12)
                .fontColor($r('sys.color.ohos_id_color_text_secondary'))
            }
            Column({ space: 6 }) {
              SymbolGlyph($r('sys.symbol.qrcode'))
                .fontSize(24)
                .fontColor([$r('sys.color.ohos_id_color_text_secondary')])
              Text('扫码')
                .fontSize(12)
                .fontColor($r('sys.color.ohos_id_color_text_secondary'))
            }
          }
        }
        .width('100%')
        .padding({ left: 40, right: 40 })
        .margin({ top: 40 })

        Blank()

        // 底部协议
        Row() {
          Text('登录即表示同意')
            .fontSize(12)
            .fontColor($r('sys.color.ohos_id_color_text_hint'))
          Text('《用户协议》')
            .fontSize(12)
            .fontColor($r('sys.color.ohos_id_color_emphasize'))
          Text('和')
            .fontSize(12)
            .fontColor($r('sys.color.ohos_id_color_text_hint'))
          Text('《隐私政策》')
            .fontSize(12)
            .fontColor($r('sys.color.ohos_id_color_emphasize'))
        }
        .margin({ bottom: 32 })
      }
      .width('100%')
      .height('100%')
      .backgroundColor($r('sys.color.ohos_id_color_background'))
      .alignItems(HorizontalAlign.Center)
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
        title: { mainTitle: '登录' },
        backIcon: { label: '返回', isEnabled: true }
      }
    })
    .hideBackButton(false)
    .onReady((context: NavDestinationContext) => {
      this.pathStack = context.pathStack
    })
    .ignoreLayoutSafeArea([LayoutSafeAreaType.SYSTEM], [LayoutSafeAreaEdge.TOP, LayoutSafeAreaEdge.BOTTOM])
  }

  private doLogin() {
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
      this.loginState.isLoggedIn = true
      this.loginState.userName = this.username
      if (this.pathStack) {
        this.pathStack.pop()
      }
    }, 1500)
  }
}

@Builder
export function LoginPageBuilder() {
  LoginPage()
}
