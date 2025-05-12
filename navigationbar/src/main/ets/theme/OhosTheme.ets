import { OhosColorStyle } from "./OhosColorStyle";
import { FONT_SIZE, OhosFontStyle } from "./OhosFontStyle";
import { OhosThemeUtil } from "./OhosThemeUtil";

export enum OhosColor{
  PRIMARY_COLOR = -1
};

export type OhosResourceColor = number | string ;

export interface OhosThemeStyle extends OhosColorStyle, OhosFontStyle {}

export class OhosTheme {
  static KEY = 'OHOS_THEME_KEY'
  static DEFAULT_PRIMARY_COLOR = "#FF552E"

  static init() {
    AppStorage.setOrCreate(OhosTheme.KEY, OhosTheme.getDefaultStyle())
  }

  static getDefaultStyle(): OhosThemeStyle {
    const data: OhosThemeStyle = {
      primary: OhosTheme.DEFAULT_PRIMARY_COLOR,
      primaryColorWithOpacity: (opacity: number) => OhosThemeUtil.colorWithOpacity(data.primary, opacity),
      fontSizeXs: FONT_SIZE.XS,
      fontSizeSm: FONT_SIZE.SM,
      fontSizeMd: FONT_SIZE.MD,
      fontSizeLg: FONT_SIZE.LG,
      fontSizeXl: FONT_SIZE.XL,
    }
    return data;
  }

  static setThemeStyle(styleData?: Partial<OhosThemeStyle>) {
    const newStyleData = OhosTheme.getDefaultStyle();
    if (typeof styleData === 'object' && styleData !== null) {
      Object.keys(styleData).forEach(item => {
        if ((newStyleData as object)[item]) {
          (newStyleData as object)[item] = (styleData as object)[item] ?? (newStyleData as object)[item]
        }
      })
    }
    AppStorage.setOrCreate(OhosTheme.KEY, newStyleData)
  }
}