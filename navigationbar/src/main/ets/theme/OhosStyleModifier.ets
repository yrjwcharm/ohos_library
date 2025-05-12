import { OhosThemeStyle } from "./OhosTheme"

export class PrimaryColorModifier implements AttributeModifier<CommonAttribute> {
  baseStyle: OhosThemeStyle

  constructor(baseStyle: OhosThemeStyle) {
    this.baseStyle = baseStyle
  }

  applyNormalAttribute(instance: ButtonAttribute): void {
    instance.backgroundColor(this.baseStyle.primary)
  }
}

export class TitleTextModifier implements AttributeModifier<CommonAttribute> {
  baseStyle: OhosThemeStyle

  constructor(baseStyle: OhosThemeStyle) {
    this.baseStyle = baseStyle
  }

  applyNormalAttribute(instance: ButtonAttribute): void {
    instance.fontWeight(FontWeight.Bolder)
    instance.fontSize(this.baseStyle.fontSizeXl)
  }
}

export class SubTitleTextModifier implements AttributeModifier<CommonAttribute> {
  baseStyle: OhosThemeStyle

  constructor(baseStyle: OhosThemeStyle) {
    this.baseStyle = baseStyle
  }

  applyNormalAttribute(instance: ButtonAttribute): void {
    instance.fontWeight(FontWeight.Bold)
    instance.fontSize(this.baseStyle.fontSizeLg)
  }
}

export class ContentTextModifier implements AttributeModifier<CommonAttribute> {
  baseStyle: OhosThemeStyle

  constructor(baseStyle: OhosThemeStyle) {
    this.baseStyle = baseStyle
  }

  applyNormalAttribute(instance: ButtonAttribute): void {
    instance.fontWeight(FontWeight.Medium)
    instance.fontSize(this.baseStyle.fontSizeMd)
  }
}