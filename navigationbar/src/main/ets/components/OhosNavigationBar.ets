import { OhosTheme, OhosThemeStyle } from '../theme/OhosTheme'
import immersionBar from '../utils/ImmersionBar'

@Preview
@Component
export struct OhosNavigationBar {
  @StorageLink(OhosTheme.KEY)
  baseStyle: OhosThemeStyle = OhosTheme.getDefaultStyle()
  // 是否显示状态栏
  @Prop isShowStatusBar: boolean = false
  private statusBarHeight: number = 0
  // 背景颜色
  public bgColor?: ResourceColor = '#FFFFFF'
  // 标题
  public title?: ResourceStr
  // 标题字体大小
  public titleFontSize?: number | string | Resource
  // 标题字体粗细
  public titleFontWeight: number | FontWeight | string = FontWeight.Medium
  // 标题字体颜色
  public titleFontColor: ResourceColor = '#000000'
  // 标题是否保持居中
  public titleIsCenter?: boolean = true
  // 是否隐藏返回按钮
  public hideBackButton?: boolean = false
  // 返回图标
  public backButtonIcon?: ResourceStr = $r('app.media.back')
  // 返回图标的颜色
  public backButtonIconColor?: ResourceColor = '#000000'
  // 返回图标的大小
  public backButtonIconSize: number = 24
  // 返回图标左侧间距
  public backButtonIconLeftMargin: number = 10
  // 中间内容距离两侧的间距
  public contentHorizontalSpace: number = 10
  // 右侧功能按钮的图标大小
  public rightImageSize?: Length = 24
  // 右侧功能按钮事件点击区域宽度
  public rightMenuItemBoxWidth: number = 40
  // 右侧功能按钮右侧间距
  public rightMenuRightMargin: number = 10
  // 内容高度
  public contentHeight: number = 36
  // 导航栏高度
  public navHeight: number = 50
  // 返回按钮点击
  public backClick?: (event?: ClickEvent) => void
  // 搜索框的点击事件
  public searchClick?: (event?: ClickEvent) => void
  // 输入提交回调
  public onSubmit?: (enterKey?: EnterKeyType, event?: SubmitEvent) => void
  // 输入内容变化回调
  public onTextChange?: (value: string) => void
  // 输入状态变化回调
  public onEditChange?: (isEditing: boolean) => void
  // 自定义中间区域
  @BuilderParam
  public centerContent?: () => void
  // 右侧功能按钮
  public rightMenus?: OhosMenuItem[]
  private rightAreaWidth: number = 0
  private controller: TextInputController = new TextInputController()

  aboutToAppear() {
    this.calcRightAreaWidth()
    this.statusBarHeight = immersionBar.getStatusBarHeight()
  }

  build() {
    Column() {
      Column() {
        Row() {
          if (!this.hideBackButton) {
            this.backBuilder()
          }
           if (this.title || this.centerContent) {
            Stack() {
              if (this.centerContent) {
                this.centerContent()
              } else if (this.title) {
                this.titleBuilder()
              }
            }
            .alignContent(this.titleIsCenter ? Alignment.Center : Alignment.Start)
            .layoutWeight(1)
            .margin(this.getCenterContentMargin())
          } else {
            Blank()
          }
          // 右侧按钮
          if (this.rightMenus) {
            Row() {
              ForEach(this.rightMenus, (item: OhosMenuItem) => {
                this.rightMenuItemBuilder(item)
              })
            }.margin({ right: this.rightMenuRightMargin })
            .height(this.contentHeight)
          }
        }
        .width('100%')
        .height(this.navHeight)
      }
    }
    .justifyContent(FlexAlign.End)
    .backgroundColor(this.bgColor)
    .width('100%')
    .height(this.navHeight + (this.isShowStatusBar ? this.statusBarHeight : 0))
  }

  @Builder
  private backBuilder() {
    Image(this.backButtonIcon)
      .width(this.backButtonIconSize)
      .height(this.backButtonIconSize)
      .fillColor(this.backButtonIconColor)
      .margin({ left: this.backButtonIconLeftMargin })
      .onClick(this.backClick)
  }

  @Builder
  private titleBuilder() {
    Text(this.title)
      .fontSize(this.titleFontSize ?? this.baseStyle.fontSizeLg)
      .fontColor(this.titleFontColor)
      .fontWeight(this.titleFontWeight)
      .textOverflow({ overflow: TextOverflow.Ellipsis })
      .maxLines(1)
      .layoutWeight(1)
  }
  @Builder
  private rightMenuItemBuilder(item: OhosMenuItem) {
    Column() {
      Image(item.image)
        .objectFit(ImageFit.Contain)
        .width(this.rightImageSize)
        .height(this.rightImageSize)
    }
    .width(this.rightMenuItemBoxWidth)
    .height(this.contentHeight)
    .justifyContent(FlexAlign.Center)
    .onClick(item.action)
  }

  // 计算右侧功能区宽度
  private calcRightAreaWidth() {
    if (this.rightMenus?.length == 0) {
      return
    }
    this.rightAreaWidth = (this.rightMenus?.length ?? 0) == 0 ? 0 :
      (this.rightMenus?.length ?? 0) * this.rightMenuItemBoxWidth + this.rightMenuRightMargin
  }

  private getCenterContentMargin(): Margin {
    if (this.titleIsCenter) {
      const leftSpace = this.hideBackButton ? 0 : this.backButtonIconSize + this.backButtonIconLeftMargin
      const rightSpace = this.rightAreaWidth
      if (leftSpace > rightSpace) {
        return { left: this.contentHorizontalSpace, right: leftSpace + this.contentHorizontalSpace }
      } else {
        return { left: rightSpace + this.contentHorizontalSpace - leftSpace, right: this.contentHorizontalSpace }
      }
    }
    return { left: this.contentHorizontalSpace, right: this.contentHorizontalSpace }
  }
}

export interface OhosMenuItem {
  image?: string | ResourceStr
  action?: () => void;
}