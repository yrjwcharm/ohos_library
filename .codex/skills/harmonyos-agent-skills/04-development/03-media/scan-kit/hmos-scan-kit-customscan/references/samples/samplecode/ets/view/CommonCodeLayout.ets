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

import { curves } from '@kit.ArkUI';
import { scanBarcode } from '@kit.ScanKit';
import { ScanResults, ScanService, ScanStatus } from '../viewModel/ScanService';
import { XComponentService } from '../viewModel/XComponentService';
import Logger from '../utils/Logger';
import { DisplayRotationAngle } from '../constants/CommonConstants';
import { DeviceService } from '../model/DeviceService';
import { UIContextSelf } from '../model/UIContextSelf';
import { AlertDialog } from '@kit.ArkUI';

@Extend(Image)
function selected(scanState: boolean, x: number, y: number) {
  .width(40)
  .height(40)
  .position({ x: x, y: y })
  .markAnchor({ x: 20, y: 20 })
  .visibility(scanState ? Visibility.Visible : Visibility.Hidden)
  .draggable(false)
}

const TAG: string = 'CommonCodeLayoutV2';

@ComponentV2
export struct CodeLayout {
  @Local scanService: ScanService = ScanService.getInstance();
  @Local xComponentService: XComponentService = XComponentService.getInstance();
  @Local multiCodeScanLocation: Array<Array<number>> = []; // Display positions of multiple barcodes.
  @Local isMultiSelected: boolean = false; // Whether a barcode among multiple barcodes is selected.
  @Local multiSelectedIndex: number = 0; // Index of the selected barcode.
  @Local singleCodeX: number = 0; // X-axis position of a single barcode.
  @Local singleCodeY: number = 0; // Y-axis position of a single barcode.
  @Local multiCodeScale: number = 0.3; // Radio button zoom ratio of multiple barcodes.
  @Local multiCodeOpacity: number = 0; // Radio button transparency of multiple barcodes.
  @Local singleCodeScale: number = 0.3;
  @Local singleCodeOpacity: number = 0;
  @Local fadeOutScale: number = 1;
  @Local fadeOutOpacity: number = 1;
  @Local isShowCode: boolean = true;
  @Require @Param scanResults: ScanResults;
  @Event restartPreviewStream: () => void = () => {
  };
  dialogController: CustomDialogController = new CustomDialogController({
    builder: AlertDialog({
      content: $r('app.string.Scan_diaLog_not_found'),
      primaryButton: {
        value: $r('app.string.Scan_diaLog_got_it'),
        action: async () => {
          this.closeDialog();
          this.restartPreviewStream();
        }
      }
    }),
    autoCancel: false,
    customStyle: false,
    onWillDismiss: (dismissDialogAction: DismissDialogAction) => {
      if (dismissDialogAction.reason === DismissReason.PRESS_BACK) {
        Logger.info(TAG, 'dialogControllerCenter onPress restartPreviewStream');
        this.restartPreviewStream();
      }
    },
    alignment: DialogAlignment.Center
  });

  aboutToAppear() {
    if (this.scanService.scanStatus === ScanStatus.PHOTO_DECODING_COMPLETED) {
      // Not display the radio button for the gallery.
      if (this.scanResults.size === 0) {
        // No code value is recognized.
        this.dialogController.open();
      } else {
        this.isShowCode = false;
        this.funcDelayer(() => {
          this.terminateSelfPage();
        }, 200);
      }
    } else {
      // Display the radio button for real-time scanning.
      for (let i = 0; i < this.scanResults.size; i++) {
        // Scanning result.
        let scanResult: scanBarcode.ScanResult = this.scanResults.data[i];
        let scanCodeRect: scanBarcode.ScanCodeRect | undefined = scanResult.scanCodeRect;
        if (scanCodeRect) {
          this.multiCodeScanLocation.push(
            [scanCodeRect.left,
              scanCodeRect.top,
              scanCodeRect.right,
              scanCodeRect.bottom]
          );
        }
      }

      if (this.scanResults.size === 1) {
        // Single barcode result.
        this.multiSelectedIndex = 0;
        let location = this.multiCodeScanLocation[0];
        this.singleCodeX = this.getOffset('x', location);
        this.singleCodeY = this.getOffset('y', location);
      }
    }
  }

  aboutToDisappear() {
    this.closeDialog();
  }

  closeDialog(): void {
    Logger.info(TAG, 'Start to close dialog.');
    if (this.dialogController) {
      this.dialogController.close();
      Logger.info(TAG, 'Succeeded in closing dialog.');
    }
  }

  @Builder
  SingleCodeLayout() {
    Column() {
      Image($rawfile('scan_selected.svg')).selected(true, this.singleCodeX, this.singleCodeY)
        .scale({ x: this.singleCodeScale, y: this.singleCodeScale })
        .opacity(this.singleCodeOpacity)
        .onAppear(() => {
          // Non-gallery-based single barcode recognition.
          this.singleCodeBreathe();
        })
    }
    .position({ x: 0, y: 0 })
    .width('100%')
    .height('100%')
  }

  @Builder
  MultiCodeLayout(arr: Array<number>, index: number) {
    Row() {
      Image($rawfile('scan_selected2.svg'))
        .width(40)
        .height(40)
        .visibility((this.isMultiSelected && this.multiSelectedIndex !== index) ? Visibility.None : Visibility.Visible)
        .scale({ x: this.multiCodeScale, y: this.multiCodeScale })
        .opacity(this.multiCodeOpacity)
        .onAppear(() => {
          if (index === 0) {
            this.multiAppear();
          }
        })
        .onClick(() => {
          this.openMultiCode(arr, index);
        })
    }
    .position({
      x: this.getOffset('x', arr),
      y: this.getOffset('y', arr)
    })
    .width(40)
    .height(40)
    .markAnchor({ x: 20, y: 20 })
    .scale({ x: this.fadeOutScale, y: this.fadeOutScale })
    .opacity(this.fadeOutOpacity)
    .animation({
      duration: 200,
      curve: curves.cubicBezierCurve(0.33, 0, 0.67, 1),
      delay: 0,
      iterations: 1,
      playMode: PlayMode.Alternate,
    })
  }

  build() {
    Stack() {
      if (this.scanResults.size === 1 && this.isShowCode) {
        // Single barcode scanning.
        this.SingleCodeLayout();
      } else {
        ForEach(this.multiCodeScanLocation, (item: Array<number>, index: number) => {
          this.MultiCodeLayout(item, index)
        }, (item: number, _: number) => item.toString())
        Image($rawfile('scan_selected.svg'))
          .selected(true, this.singleCodeX, this.singleCodeY)
          .scale({ x: this.singleCodeScale, y: this.singleCodeScale })
          .opacity(this.singleCodeOpacity)
          .visibility(this.isMultiSelected ? Visibility.Visible : Visibility.None)
      }
    }
    .width('100%')
    .height('100%')
  }

  getOffset(coordinateAxis: string, location: Array<number>): number {
    if (coordinateAxis === 'x') {
      return this.setOffsetXByRotation(location);
    }
    return this.setOffsetYByRotation(location);
  }

  setOffsetXByRotation(location: Array<number>): number {
    let offset: number = 0;
    switch (DeviceService.rotation) {
      case DisplayRotationAngle.ROTATION_0:
        offset = (location[0] + location[2]) / 2 + this.xComponentService.offsetX;
        break;
      case DisplayRotationAngle.ROTATION_90:
        offset = this.xComponentService.width - (location[1] + location[3]) / 2 + this.xComponentService.offsetX;
        break;
      case DisplayRotationAngle.ROTATION_180:
        offset = this.xComponentService.width - (location[0] + location[2]) / 2 + this.xComponentService.offsetX;
        break;
      case DisplayRotationAngle.ROTATION_270:
        offset = (location[1] + location[3]) / 2 + this.xComponentService.offsetX;
        break;
      default:
        break;
    }
    return offset;
  }

  setOffsetYByRotation(location: Array<number>): number {
    let offset: number = 0;
    switch (DeviceService.rotation) {
      case DisplayRotationAngle.ROTATION_0:
        offset = (location[3] + location[1]) / 2 + this.xComponentService.offsetY;
        break;
      case DisplayRotationAngle.ROTATION_90:
        offset = (location[0] + location[2]) / 2 + this.xComponentService.offsetY;
        break;
      case DisplayRotationAngle.ROTATION_180:
        offset = this.xComponentService.height - (location[3] + location[1]) / 2 + this.xComponentService.offsetY;
        break;
      case DisplayRotationAngle.ROTATION_270:
        offset = this.xComponentService.height - (location[0] + location[2]) / 2 + this.xComponentService.offsetY;
        break;
      default:
        break;
    }
    return offset;
  }

  openMultiCode(arr: Array<number>, index: number): void {
    // Tap animation. Multi-barcode scanning is not supported based on the gallery currently.
    this.singleCodeX = this.getOffset('x', arr);
    this.singleCodeY = this.getOffset('y', arr);
    this.isMultiSelected = true;
    this.singleCodeScale = 0.3;
    this.singleCodeOpacity = 0;
    this.multiSelectedIndex = index || 0;
    // Button fade-out animation.
    this.fadeOutScale = 0.3;
    this.fadeOutOpacity = 0;
    animateToImmediately({
      duration: 0
    }, () => {
    })
    // Radio button animation.
    UIContextSelf.uiContext.animateTo({
      duration: 350,
      curve: curves.cubicBezierCurve(0.33, 0, 0.67, 1),
      delay: 100,
      iterations: 1,
      playMode: PlayMode.Alternate,
      onFinish: () => {
        this.toRedirectPage();
      }
    }, () => {
      this.singleCodeOpacity = 1;
      this.singleCodeScale = 1.1;
    });
  }

  terminateSelfPage(): void {
    if (this.scanResults && this.scanResults.size > 0) {
      UIContextSelf.showMessage(JSON.stringify(this.scanResults.data[this.multiSelectedIndex]))
      // TODO: 在此处添加扫码成功后的业务逻辑代码
      // ...
    }
    // 显示toast后1秒返回
    setTimeout(() => {
      this.getUIContext().getRouter().back();
    }, 1000);
  }

  singleCodeBreathe(): void {
    // Single-barcode scanning breathing effect.
    this.singleCodeOpacity = 0.3;
    this.singleCodeScale = 0.3;
    animateToImmediately({
      duration: 0
    }, () => {
    })
    UIContextSelf.uiContext.animateTo({
      duration: 300,
      curve: curves.cubicBezierCurve(0.33, 0, 0.67, 1), // Animation curve.
      delay: 0,
      iterations: 1,
      playMode: PlayMode.Alternate,
      onFinish: () => {
        this.terminateSelfPage();
      }
    }, () => {
      this.singleCodeOpacity = 1;
      this.singleCodeScale = 1;
    });

  }

  /*
   * Multi-code scanning result animation: 0 - 600ms stop(500ms)
   * breath: Loop-scale: 1-0.8-1(600ms)-0.8-1(600ms)-stop(400ms)
   * 0 - 350ms  opacity:0-1 scale: 0.3 - 1.1 multiAppear()
   * 350ms - 600ms scale: 1.1 - 1 multiAppearEnd()
   * */
  multiAppear(): void {
    this.multiCodeScale = 0.3;
    animateToImmediately({
      duration: 0
    }, () => {
    })
    UIContextSelf.uiContext.animateTo({
      duration: 350,
      curve: curves.cubicBezierCurve(0.33, 0, 0.67, 1), // Animation curve.
      delay: 0,
      iterations: 1,
      playMode: PlayMode.Alternate,
      onFinish: () => {
        this.multiAppearEnd();
      }
    }, () => {
      this.multiCodeScale = 1.1;
      this.multiCodeOpacity = 1;
    });
  }

  multiAppearEnd(): void {
    UIContextSelf.uiContext.animateTo({
      duration: 250,
      curve: curves.cubicBezierCurve(0.33, 0, 0.67, 1), // Animation curve.
      delay: 0,
      iterations: 1,
      playMode: PlayMode.Alternate,
      onFinish: () => {
        this.funcDelayer(() => {
          this.multiCodeBreathe();
        }, 500);
      }
    }, () => {
      this.multiCodeScale = 1;
    });
  }

  multiCodeBreathe(): void {
    // Multi-barcode scanning breathing effect.
    this.multiCodeScale = 1;
    animateToImmediately({
      duration: 0
    }, () => {
    })
    UIContextSelf.uiContext.animateTo({
      duration: 300,
      curve: curves.cubicBezierCurve(0.33, 0, 0.67, 1), // Animation curve.
      delay: 0,
      iterations: 4,
      playMode: PlayMode.Alternate,
      onFinish: () => {
        this.funcDelayer(() => {
          this.multiCodeBreathe();
        }, 400)
      }
    }, () => {
      this.multiCodeScale = 0.8;
    });
  }

  toRedirectPage(): void {
    UIContextSelf.uiContext.animateTo({
      duration: 250,
      curve: curves.cubicBezierCurve(0.33, 0, 0.67, 1), // Animation curve.
      delay: 0,
      iterations: 1,
      playMode: PlayMode.Alternate,
      onFinish: () => {
        this.terminateSelfPage();
      }
    }, () => {
      this.singleCodeScale = 1;
    });
  }

  funcDelayer(func: Function, time: number): void {
    let timerId = setTimeout(() => {
      try {
        func();
      } catch (error) {
        Logger.error(TAG, `Failed to execute func in timer. Code: ${error?.code}`);
      }
      clearTimeout(timerId);
    }, time);
  }
}