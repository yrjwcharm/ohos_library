
export class CharUtil {

  /**
   * 是否空白符 空白符包括空格、制表符、全角空格和不间断空格
   * @param c
   * @returns
   */
  static isBlankChar(c: number): boolean {
    return CharUtil.isWhitespace(c)
    || CharUtil.isSpaceChar(c)
    || c == 0xFEFF
    || c == 0x202A
    || c == 0x0000;
  }

  /**
   * 检查字符是否位于ASCII范围内（0~127）
   * @param ch 被检查的字符
   * @returns `true`表示为ASCII字符，否则为`false`
   */
  static isAscii(ch: string): boolean {
    // 确保输入的是单个字符
    if (ch.length !== 1) throw new Error("Input must be a single character");
    return ch.charCodeAt(0) < 128;
  }

  /**
   * 判断是否为emoji表情符
   *
   * @param c 字符
   * @returns 是否为emoji
   */
  static isEmoji(c: number): boolean {
    // 判断码点是否在 Emoji 的主要 Unicode 范围内
    return (
      // 表情符号
      (c >= 0x1F600 && c <= 0x1F64F) ||
        // 交通和地图符号
        (c >= 0x1F680 && c <= 0x1F6FF) ||
        // 补充符号和图形
        (c >= 0x1F700 && c <= 0x1F77F) ||
        // 几何形状扩展
        (c >= 0x1F780 && c <= 0x1F7FF) ||
        // 补充符号
        (c >= 0x1F800 && c <= 0x1F8FF) ||
        // 补充符号和图形
        (c >= 0x1F900 && c <= 0x1F9FF) ||
        // 补充符号和图形
        (c >= 0x1FA00 && c <= 0x1FA6F) ||
        // 补充符号
        (c >= 0x1FA70 && c <= 0x1FAFF) ||
        // 其他 Emoji 区域
        (c >= 0x2300 && c <= 0x23FF) || // 技术符号
        (c >= 0x2700 && c <= 0x27BF) || // 装饰性符号
        (c >= 0x2B50 && c <= 0x2B50)   // 星星
    );
  }

  private  static isWhitespace(codePoint: number): boolean {
    const whitespaceRegex = /^\s$/;
    const character = String.fromCodePoint(codePoint);
    return whitespaceRegex.test(character);
  }

  private static isSpaceChar(codePoint: number): boolean {
    const spaceCategories = [
      "Zs", // Space separator
      "Zl", // Line separator
      "Zp" // Paragraph separator
    ];

    const character = String.fromCodePoint(codePoint);
    const category = character.charCodeAt(0).toString(16);
    return spaceCategories.includes(category);
  }
}