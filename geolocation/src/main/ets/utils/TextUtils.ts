export class TextUtils {
  /*
     * 判断字符串是否为空白符。true为空，否则false
     * @param str 字符串
     * */
  static isBlank(str: string | undefined): boolean {
    if (!str) {
      return true
    }
    if (str.length == 0) {
      return true
    }

    let rsValue = str.replace(RegExp(' '), '')
    if (rsValue.length == 0) {
      return true
    }
    return false
  }

  static isNotBlank(str: string): boolean {
    return !TextUtils.isBlank(str)
  }
}