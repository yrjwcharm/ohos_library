import { AbilityConstant, UIAbility, Want } from '@kit.AbilityKit';
import { window } from '@kit.ArkUI';
import Logger from '../utils/Logger';
import { UIContextSelf } from '../model/UIContextSelf';
import { WindowService } from '../viewModel/WindowService';
import { DeviceService } from '../model/DeviceService';

const TAG = 'Scan SampleCode EntryAbility';

export default class EntryAbility extends UIAbility {
  onCreate(_: Want, __: AbilityConstant.LaunchParam): void {
    Logger.info(TAG, 'Ability onCreate');
  }

  onDestroy(): void {
    Logger.info(TAG, 'Ability onDestroy');
  }

  onWindowStageCreate(windowStage: window.WindowStage): void {
    // The window has been created. Configure the main UI for the function.
    Logger.info(TAG, 'Ability onWindowStageCreate');
    try {
      windowStage.getMainWindow().then((windowObj: window.Window) => {
        Logger.info(TAG, 'Succeeded in getMainWindow.');
        try {
          windowStage.loadContent('pages/Index').then(() => {
            Logger.info(TAG, 'Succeeded in loading the content.');
            // 初始化自定义扫码页面 UI 和窗口适配
            UIContextSelf.setUIContext(windowObj, this.context);
            DeviceService.refreshDisplayInfoAndSelectSuitableRatio();
            WindowService.getInstance().initWindowObj(windowObj);
          }).catch((error: BusinessError) => {
            Logger.error(TAG, `Failed to load the content. Code: ${error.code}.`);
          })
        } catch (error) {
          Logger.error(TAG, `Failed to load the content. Code: ${error?.code}.`);
        }
      }).catch((error: BusinessError) => {
        Logger.error(TAG, `Failed to get getMainWindow by windowStage. Code: ${error.code}.`);
      });
    } catch (error) {
      Logger.error(TAG, `Failed to get getMainWindow by windowStage. Code: ${error?.code}.`);
    }
  }

  onWindowStageDestroy(): void {
    // Main window is destroyed, release UI related resources
    Logger.info(TAG, 'Ability onWindowStageDestroy');
    WindowService.getInstance().cancelWindowSubscribe();

  }

  onForeground(): void {
    // Ability has brought to foreground
    Logger.info(TAG, 'Ability onForeground');
  }

  onBackground(): void {
    // Ability has back to background
    Logger.info(TAG, 'Ability onBackground');
  }
}