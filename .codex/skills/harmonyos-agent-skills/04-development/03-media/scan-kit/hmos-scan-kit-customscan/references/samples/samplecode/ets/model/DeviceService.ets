/*
 * Copyright (c) 2026 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { display } from '@kit.ArkUI';
import { DisplayRotationAngle } from '../constants/CommonConstants';
import Logger from '../utils/Logger';
import { UIContextSelf } from './UIContextSelf';

const TAG: string = 'DeviceService';

export class DeviceService {
  public static width: number = 0; // Width of the device screen, in vp.
  public static height: number = 0; // Height of the device screen, in vp.
  public static widthPX: number = 0; // Width of the device screen, in px.
  public static heightPX: number = 0; // Height of the device screen, in px.
  public static densityPixels: number = 1; // Screen density of the device.
  public static rotation: number = DisplayRotationAngle.ROTATION_0; // Screen orientation of the app.
  public static portraitRatio: number = 9 / 16; // Portrait resolution of the camera preview stream.
  public static isFolding: boolean = false; // Whether the device is a foldable device.
  public static oldFoldStatus: display.FoldStatus = display.FoldStatus.FOLD_STATUS_UNKNOWN;
  public static newFoldStatus: display.FoldStatus = display.FoldStatus.FOLD_STATUS_UNKNOWN;

  // Update the latest display information and match the proper portrait resolution of the camera preview stream.
  public static refreshDisplayInfoAndSelectSuitableRatio() {
    let displayClass: display.Display | null = DeviceService.getDisplayInfoSync();
    DeviceService.setDisplayInfo(displayClass);
    DeviceService.selectSuitableRatio();
    DeviceService.setIsFolding();
  }

  public static getDisplayInfoSync(): display.Display | null {
    let displayClass: display.Display | null = null;
    try {
      displayClass = display.getDefaultDisplaySync();
      Logger.info(TAG, 'Succeeded in getting default display.');
    } catch (error) {
      Logger.error(TAG, `Failed to getDefaultDisplaySync. Code: ${error?.code}`);
    }
    return displayClass;
  }

  public static setDisplayInfo(displayClass: display.Display | null): void {
    if (displayClass !== null) {
      DeviceService.densityPixels = displayClass.densityPixels;
      DeviceService.widthPX = displayClass.width;
      DeviceService.heightPX = displayClass.height;
      DeviceService.width = UIContextSelf.uiContext.px2vp(displayClass.width);
      DeviceService.height = UIContextSelf.uiContext.px2vp(displayClass.height);
      DeviceService.rotation = displayClass.rotation;
      Logger.info(TAG,
        `setDisplayInfo, width: ${DeviceService.width}, height: ${DeviceService.height}, rotation: ${DeviceService.rotation}, densityPixels: ${DeviceService.densityPixels}`);
    }
  }

  // Match a proper portrait resolution based on the device width and height.
  public static selectSuitableRatio(): void {
    Logger.info(TAG, 'Start to select suitable portraitRatio.');
    let suitableRatio: number = 9 / 16;
    let portraitRatio: number;
    if (DeviceService.widthPX === 0 || DeviceService.heightPX === 0) {
      Logger.info(TAG,
        `The width or height of the display are abnormal. widthPX : ${DeviceService.widthPX}, heightPX : ${DeviceService.heightPX}`);
      return;
    }
    if (DeviceService.isLandscape()) {
      portraitRatio = DeviceService.heightPX / DeviceService.widthPX;
    } else {
      portraitRatio = DeviceService.widthPX / DeviceService.heightPX;
    }
    let smallestRatioDelta: number = Infinity;
    const cameraRatios: number[] = [9 / 16, 3 / 4, 1];
    for (const ratio of cameraRatios) {
      const ratioDelta: number = Math.abs(ratio - portraitRatio);
      if (ratioDelta < smallestRatioDelta) {
        smallestRatioDelta = ratioDelta;
        suitableRatio = ratio;
      }
    }
    DeviceService.portraitRatio = suitableRatio;
    Logger.info(TAG, `portraitRatio: ${DeviceService.portraitRatio}`);
  }

  // Check whether the device is in landscape mode.
  public static isLandscape(): boolean {
    return DeviceService.rotation === DisplayRotationAngle.ROTATION_90 ||
      DeviceService.rotation === DisplayRotationAngle.ROTATION_270;
  }

  public static getFoldStatusByDisplay(): display.FoldStatus {
    let foldStatus: display.FoldStatus = display.FoldStatus.FOLD_STATUS_UNKNOWN;
    try {
      foldStatus = display.getFoldStatus();
    } catch (error) {
      Logger.error(TAG, `Failed to getFoldStatusByDisplay. Code: ${error?.code}`);
    }
    return foldStatus;
  }

  public static setIsFolding(): void {
    try {
      DeviceService.isFolding = display.isFoldable();
    } catch (error) {
      Logger.error(`Failed to invoke an API of isFoldable. Code: ${error?.code}`);
    }
  }
}