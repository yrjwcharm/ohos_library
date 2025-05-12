import { display } from '@kit.ArkUI';

let screenWidth = -1

export class ScreenUtils {
  static getScreenWidthSync(): number {
    if (screenWidth == -1) {
      screenWidth = ScreenUtils._getScreenWidthSync()
    }
    return screenWidth;
  }

  private static _getScreenWidthSync(): number {
    try {
      let displayClass = display.getDefaultDisplaySync();
      return px2vp(displayClass.width);
    } catch (exception) {
      console.error('Failed to obtain the default display object. Code: ' + JSON.stringify(exception));
    }
    return 0;
  }
}