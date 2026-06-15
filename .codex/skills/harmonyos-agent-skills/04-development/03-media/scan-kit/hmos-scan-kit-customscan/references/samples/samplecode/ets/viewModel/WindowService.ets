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

import { window } from '@kit.ArkUI';
import { BusinessError } from '@kit.BasicServicesKit';
import { CommonConstants } from '../constants/CommonConstants';
import { UIContextSelf } from '../model/UIContextSelf';
import Logger from '../utils/Logger';
import { ScanLayout } from './ScanLayout';
import { XComponentService } from './XComponentService';

const TAG: string = 'WindowService';

@ObservedV2
export class WindowService {
  public windowObj?: window.Window;
  private static instance?: WindowService;
  @Trace public topAvoidHeight: number = 0;
  public windowSizePX: window.Size = {
    width: 0,
    height: 0
  }; // Pixel density x Window width/height (vp) = Window width/height (px)
  @Trace public width: number = 0; // Window width, in vp.
  public windowStatusType: window.WindowStatusType = window.WindowStatusType.FULL_SCREEN;
  public height: number = 0; // Window height, in vp.

  static getInstance(): WindowService {
    WindowService.instance ||= new WindowService();
    return WindowService.instance;
  }

  refreshLayoutByDensityPixels(densityPixels: number): void {
    if (densityPixels > 0) {
      this.width = this.windowSizePX.width / densityPixels;
      this.height = this.windowSizePX.height / densityPixels;
      ScanLayout.getInstance().refreshLayout(this.width, this.height);
      XComponentService.getInstance().setScanXComponentSize();
      Logger.info(TAG, `refreshLayoutByDensityPixels, width: ${this.width}, height: ${this.height}.`);
    }
  }

  initWindowObj(window: window.Window): void {
    this.windowObj = window;
    this.setTopAvoidHeight();
    this.setWindowSize();
    this.onAvoidAreaChange();
    this.onWindowSizeChange();
    this.onStatusTypeChange();
    this.setWindowLayoutFullScreen();
  }

  cancelWindowSubscribe(): void {
    this.offAvoidAreaChange();
    this.offWindowSizeChange();
    this.offStatusTypeChange();
  }

  public onWindowSizeChange(): void {
    if (this.windowObj) {
      try {
        this.windowObj.on('windowSizeChange', (window: window.Size) => {
          Logger.info(TAG, 'windowSizeChange triggered.');
          this.refreshLayoutAndeXComponent(window);
        })
        Logger.info(TAG, 'Succeeded in on windowSizeChange by windowObj');
      } catch (error) {
        Logger.error(TAG, `Failed to on windowSizeChange by windowObj. Code: ${error?.code}`);
      }
    }
  }

  public onAvoidAreaChange(): void {
    if (this.windowObj) {
      try {
        this.windowObj.on('avoidAreaChange', (data) => {
          let topAvoidHeight: number = UIContextSelf.uiContext.px2vp(data.area.topRect.height + data.area.topRect.top);
          if (data.type === window.AvoidAreaType.TYPE_SYSTEM && topAvoidHeight !== this.topAvoidHeight) {
            Logger.info(TAG, `topAvoidHeight has changed, topAvoidHeight: ${topAvoidHeight}`);
            this.topAvoidHeight = topAvoidHeight;
            ScanLayout.getInstance().setTopLayout();
          }
        });
        Logger.info(TAG, 'Succeeded in on avoidAreaChange by windowObj');
      } catch (error) {
        Logger.error(TAG, `Failed to on avoidAreaChange by windowObj. Code: ${error?.code}`);
      }
    }
  }

  public offAvoidAreaChange(): void {
    if (this.windowObj) {
      try {
        this.windowObj.off('avoidAreaChange');
        Logger.info(TAG, 'Succeeded in off avoidAreaChange by windowObj');
      } catch (error) {
        Logger.error(TAG, `Failed to off avoidAreaChange by windowObj. Code: ${error?.code}`);
      }
    }
  }

  public offWindowSizeChange(): void {
    if (this.windowObj) {
      try {
        this.windowObj.off('windowSizeChange');
        Logger.info(TAG, 'Succeeded in off windowSizeChange by windowObj');
      } catch (error) {
        Logger.error(TAG, `Failed to off windowSizeChange by windowObj. Code: ${error?.code}`);
      }
    }
  }

  public setTopAvoidHeight(): void {
    if (this.windowObj) {
      try {
        let avoidArea: window.AvoidArea = this.windowObj.getWindowAvoidArea(window.AvoidAreaType.TYPE_SYSTEM);
        this.topAvoidHeight = UIContextSelf.uiContext.px2vp(avoidArea.topRect.height + avoidArea.topRect.top);
        Logger.info(TAG,
          `Succeeded in getting topAvoidHeight by windowObj. topAvoidHeight: ${this.topAvoidHeight}`);
      } catch (error) {
        // If the value fails to be obtained, use the default value of the top avoid area height.
        this.topAvoidHeight = CommonConstants.TOP_AVOID_HEIGHT_DEFAULT;
        Logger.error(TAG, `Failed to getWindowAvoidArea by windowObj. Code: ${error?.code}`);
      }
    }
  }

  public setWindowSize(): void {
    if (this.windowObj) {
      try {
        let windowRect: window.Rect = this.windowObj.getWindowProperties().windowRect;
        Logger.info(TAG,
          `Succeeded in getting windowRect by windowObj. width: ${windowRect.width}, height: ${windowRect.height}`);
        this.refreshLayoutAndeXComponent({
          width: windowRect.width,
          height: windowRect.height
        })
      } catch (error) {
        Logger.error(TAG, `Failed to windowRect by windowObj and set the default windowSize. Code: ${error?.code}`);
        this.refreshLayoutAndeXComponent({
          width: 1080,
          height: 1920
        })
      }
    }
  }

  public refreshLayoutAndeXComponent(window: window.Size): void {
    if (window && (window.width !== this.windowSizePX.width || window.height !== this.windowSizePX.height)) {
      // Update the window width and height.
      this.windowSizePX = window;
      this.width = UIContextSelf.uiContext.px2vp(window.width);
      this.height = UIContextSelf.uiContext.px2vp(window.height);
      ScanLayout.getInstance().refreshBreakpoint(this.width, this.height);
      if (window.height > 0 && window.width > 0) {
        ScanLayout.getInstance().refreshScanLayout(this.width, this.height);
        XComponentService.getInstance().setScanXComponentSize();
        // Send a notification if the dimensions change.
        Logger.info(TAG, `emitEventHub, width: ${this.width}, height: ${this.height}`);
      }
    }
  }

  public setWindowLayoutFullScreen(): void {
    if (this.windowObj) {
      try {
        this.windowObj.setWindowLayoutFullScreen(true).then(() => {
          Logger.info(TAG, `setWindowLayoutFullScreen end`);
        }).catch((error: BusinessError) => {
          Logger.error(TAG, `Failed to setWindowLayoutFullScreen. Code: ${error.code}`);
        })
      } catch (error) {
        Logger.error(TAG, `Failed to setWindowLayoutFullScreen. Code: ${error?.code}`);
      }
    }
  }

  public onStatusTypeChange(): void {
    if (this.windowObj) {
      try {
        this.windowObj.on('windowStatusChange', (statusType: window.WindowStatusType) => {
          this.windowStatusType = statusType;
          Logger.info(TAG, `onStatusTypeChange windowStatusType: ${statusType}`);
        });
      } catch (error) {
        Logger.error(TAG, `Failed to on windowStatusChange by windowObj. Code: ${error?.code}`);
      }
    }
  }

  public offStatusTypeChange(): void {
    if (this.windowObj) {
      try {
        this.windowObj.off('windowStatusChange');
      } catch (error) {
        Logger.error(TAG, `Failed to off windowStatusChange by windowObj. Code: ${error?.code}`);
      }
    }
  }
}