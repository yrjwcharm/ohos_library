import { OhosResourceColor } from "./OhosTheme";

export interface OhosColorStyle {
  primary: OhosResourceColor
  primaryColorWithOpacity: (opacity: number) => OhosResourceColor;
}