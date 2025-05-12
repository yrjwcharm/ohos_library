import { OhosResourceColor } from "./OhosTheme";

export class OhosThemeUtil {
  /**
   * Adjusts the opacity of a given color.
   * @param color - The color value (number or string).
   * @param opacity - The opacity level (0 to 1).
   * @returns A color with the specified opacity applied.
   */
  static colorWithOpacity(color: OhosResourceColor, opacity: number): OhosResourceColor {
    if (typeof color === "number") {
      // Handle numeric color (ARGB format)
      const alpha = Math.round(opacity * 255); // Convert opacity to 0-255 range
      const rgb = color & 0x00ffffff; // Extract the RGB part
      return (alpha << 24) | rgb; // Combine alpha and RGB
    } else if (typeof color === "string") {
      // Handle string color
      if (color.startsWith("#")) {
        // Check if the string has 9 characters (#AARRGGBB)
        if (color.length === 9) {
          color = `#${color.slice(3)}`; // Strip the `AA` part
        }
        // Convert #RRGGBB to rgba
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
      } else if (color.startsWith("rgba")) {
        // Update opacity in existing rgba
        return color.replace(/rgba\(([^,]+),([^,]+),([^,]+),[^)]+\)/, (_, r: string, g: string, b: string) => {
          return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        });
      }
    }
    throw new Error("Unsupported color format");
  }
}