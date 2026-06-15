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
 
import { customScan, scanBarcode, scanCore } from '@kit.ScanKit';
import { AsyncCallback, BusinessError } from '@kit.BasicServicesKit';
import Logger from '../utils/Logger';
import { CommonConstants } from '../constants/CommonConstants';

const TAG = 'ScanService';

@ObservedV2
export class ScanResults {
  public code: number;
  @Trace public data: Array<scanBarcode.ScanResult>;
  @Trace public size: number;

  constructor() {
    this.code = 0;
    this.data = [];
    this.size = 0;
  }
}

export enum ScanStatus {
  FORBIDDEN = 'FORBIDDEN', // Barcode scanning forbidden.
  NOT_STARTED = 'NOT_STARTED', // Preview stream not enabled.
  PREVIEW_DECODING = 'PREVIEW_DECODING', // Decoding the preview stream.
  PREVIEW_STOP = 'PREVIEW_STOP', // stopping the preview stream.
  PHOTO_DECODING = 'PHOTO_DECODING', // Decoding the gallery.
  NO_PHOTO_SELECT = 'NO_PHOTO_SELECT', // No image selected.
  PREVIEW_DECODING_COMPLETED = 'PREVIEW_DECODING_COMPLETED', // Preview stream decoding finished.
  PHOTO_DECODING_COMPLETED = 'PHOTO_DECODING_COMPLETED' // Gallery decoding finished.
}

@ObservedV2
export class ScanService {
  @Trace public scanStatus: ScanStatus = ScanStatus.FORBIDDEN;
  @Trace public isAlbumLoading: boolean = false;
  @Trace public isFlashlight: boolean = false; // Whether the flash light is turned on.
  // Determine whether the condition for displaying the flashing icon is met based on lightningFlash.
  @Trace public isSensorLight: boolean = false;
  public baseZoom: number = 1;
  public zoomRatio: number = 1;
  public scanResult: ScanResults = new ScanResults();
  public retryScanTimes: number = 0;
  private static instance: ScanService | null = null;

  public static getInstance(): ScanService {
    if (ScanService.instance === null) {
      ScanService.instance = new ScanService();
    }
    return ScanService.instance;
  }

  public updateScanStatus(scanStatus: ScanStatus) {
    this.scanStatus = scanStatus;
    Logger.info(TAG, `updateScanStatus, scanStatus: ${this.scanStatus}`);
  }

  public isDecodingCompleted(): boolean {
    return this.scanStatus === ScanStatus.PREVIEW_DECODING_COMPLETED ||
      this.scanStatus === ScanStatus.PHOTO_DECODING_COMPLETED
  }

  public startPreviewStream(options: scanBarcode.ScanOptions, viewControl: customScan.ViewControl,
    callback: AsyncCallback<Array<scanBarcode.ScanResult>>) {
    Logger.info(TAG,
      `Start Preview Stream. Width: ${viewControl.width}, height: ${viewControl.height}, scanStatus: ${this.scanStatus}`)
    if (this.scanStatus === ScanStatus.NOT_STARTED || this.scanStatus === ScanStatus.PREVIEW_DECODING_COMPLETED ||
      this.scanStatus === ScanStatus.PHOTO_DECODING_COMPLETED || this.scanStatus === ScanStatus.NO_PHOTO_SELECT) {
      this.updateScanStatus(ScanStatus.PREVIEW_DECODING);
      this.resetScanResult();
      this.initCustomScan(options);
      this.startCustomScan(viewControl, callback);
      this.initLightFlash();
      this.onLightingFlash();
      Logger.info(TAG, 'Start Preview Stream end.');
    }
  }

  public async stopPreviewStream(): Promise<void> {
    Logger.info(TAG, 'Stop Preview Stream start.');
    if (this.scanStatus === ScanStatus.PREVIEW_DECODING) {
      this.closeFlashLight();
      this.offLightingFlash();
      this.updateScanStatus(ScanStatus.NOT_STARTED);
      await this.stopCustomScan();
      await this.releaseCustomScan();
      Logger.info(TAG, 'Stop Preview Stream end.');
    }
  }

  public changeFlashlight(): void {
    if (this.getFlashLightStatus()) {
      this.closeFlashLight();
    } else {
      this.openFlashLight();
    }
  }

  public getZoom(): number {
    let zoom = 1;
    try {
      zoom = customScan.getZoom();
      Logger.info(TAG, `getZoom end, zoom: ${zoom}`);
    } catch (error) {
      Logger.error(TAG, `Failed to getZoom. Code: ${error?.code}, message: ${error?.message}`);
    }
    return zoom;
  }

  public setZoom(zoomRatio: number): void {
    try {
      customScan.setZoom(zoomRatio);
      Logger.info(TAG, `setZoom end, zoomRatio: ${zoomRatio}`);
    } catch (error) {
      Logger.error(TAG, `Failed to setZoom. Code: ${error?.code}, message: ${error?.message}`);
    }
  }

  public tapGesture(): void {
    this.baseZoom = this.getZoom();
    Logger.info(TAG, `tapGesture. baseZoom: ${this.baseZoom}`);
    if (this.baseZoom === CommonConstants.MIN_ZOOM_RATIO) {
      this.setZoom(CommonConstants.MAX_ZOOM_RATIO);
    } else {
      this.setZoom(CommonConstants.MIN_ZOOM_RATIO);
    }
  }

  public pinchGestureStart(): void {
    this.baseZoom = this.getZoom();
    this.zoomRatio = this.baseZoom;
    Logger.info(TAG, `pinchGestureStart. baseZoom: ${this.baseZoom}`);
  }

  public pinchGestureUpdate(scale: number): void {
    Logger.info(TAG, `pinchGestureUpdate. scale: ${scale}`);
    let tmpZoom: number = scale * this.baseZoom;
    if (scale > 1) {
      if (tmpZoom <= CommonConstants.MAX_ZOOM_RATIO) {
        this.updateZoom(tmpZoom);
      }
    } else {
      if (tmpZoom < CommonConstants.MIN_ZOOM_RATIO) {
        tmpZoom = CommonConstants.MIN_ZOOM_RATIO;
      }
      this.updateZoom(tmpZoom);
    }
  }

  public updateZoom(tmpZoom: number): void {
    if (Math.abs(tmpZoom - this.zoomRatio) > 0.01) {
      Logger.info(TAG, `updateZoom. tmpZoom: ${tmpZoom}`);
      this.zoomRatio = tmpZoom;
      this.setZoom(this.zoomRatio);
    }
  }

  // start callback of customScan, which determines whether to retry based on the error information.
  public retryOnCondition(error: BusinessError, options: scanBarcode.ScanOptions, viewControl: customScan.ViewControl,
    callback: AsyncCallback<Array<scanBarcode.ScanResult>>): boolean {
    if (error) {
      Logger.error(TAG,
        `An error is returned during customScanCallback. Code: ${error.code}, message: ${error.message}`);
      if (this.retryScanTimes < CommonConstants.MAX_RETRY_SCAN_TIMES &&
        error.code === scanCore.ScanErrorCode.INTERNAL_ERROR) {
        this.retryScanTimes++;
        let timeId = setTimeout(async () => {
          Logger.info(TAG, `Retry preview stream by customScanCallback. Times: ${this.retryScanTimes}.`);
          await this.stopPreviewStream();
          this.startPreviewStream(options, viewControl, callback);
          Logger.info(TAG, 'Retry preview stream end.');
          clearTimeout(timeId);
        }, CommonConstants.DELAY_RETRY_SCAN_TIME)
        return true; // Retry.
      }
    }
    return false; // No retry.
  }

  private initCustomScan(options: scanBarcode.ScanOptions) {
    try {
      Logger.info(TAG, 'Init customScan start.');
      customScan.init(options);
      Logger.info(TAG, 'Init customScan end.');
    } catch (error) {
      Logger.error(TAG, `Failed to init customScan. Code: ${error?.code}, message: ${error?.message}.`);
    }
  }

  private startCustomScan(viewControl: customScan.ViewControl,
    callback: AsyncCallback<Array<scanBarcode.ScanResult>>): void {
    try {
      Logger.info(TAG, 'Start customScan start.');
      customScan.start(viewControl, callback);
      Logger.info(TAG, 'Start customScan end.');
    } catch (error) {
      Logger.error(TAG, `Failed to start customScan. Code: ${error?.code}, message: ${error?.message}.`);
    }
  }

  private async stopCustomScan(): Promise<void> {
    try {
      Logger.info(TAG, 'stop customScan start.');
      await customScan.stop().catch((error: BusinessError) => {
        Logger.error(TAG, `Failed to stop customScan by promising. Code: ${error.code}, message: ${error.message}.`);
      });
      Logger.info(TAG, 'stop customScan end.');
    } catch (error) {
      Logger.error(TAG, `Failed to stop customScan by catching. Code: ${error?.code}, message: ${error?.message}.`);
    }
  }

  private async releaseCustomScan(): Promise<void> {
    try {
      Logger.info(TAG, 'release customScan start.');
      await customScan.release().catch((error: BusinessError) => {
        Logger.error(TAG, `Failed to release customScan by promising. Code: ${error.code}, message: ${error.message}.`);
      });
      Logger.info(TAG, 'release customScan end.');
    } catch (error) {
      Logger.error(TAG, `Failed to release customScan by catching. Code: ${error?.code}, message: ${error?.message}.`);
    }
  }

  private resetScanResult(): void {
    Logger.info(TAG, 'resetScanResult');
    this.scanResult.code = 0;
    this.scanResult.data = [];
    this.scanResult.size = 0;
  }

  private initLightFlash(): void {
    this.isSensorLight = false;
    this.isFlashlight = false;
  }

  private offLightingFlash(): void {
    try {
      customScan.off('lightingFlash');
    } catch (error) {
      Logger.error(TAG, `Catch: off lightingFlash. Code: ${error?.code}, message: ${error?.message}`);
    }
  }

  private onLightingFlash() {
    try {
      customScan.on('lightingFlash', (error, isLightingFlash) => {
        if (error) {
          Logger.error(TAG,
            `lightingFlash callback error. Code: ${error.code}, message: ${error?.message}`);
          return;
        }
        this.isSensorLight = isLightingFlash;
        Logger.info(TAG, `isSensorLight: ${this.isSensorLight}`);
      });
    } catch (error) {
      Logger.error(TAG,
        `lightingFlash callback error by catching. Code: ${error?.code}, message: ${error?.message}`);
    }
  }

  private getFlashLightStatus(): boolean {
    Logger.info(TAG, 'Start to getFlashLightStatus.');
    let isFlashlight: boolean = false;
    try {
      isFlashlight = customScan.getFlashLightStatus();
    } catch (error) {
      Logger.error(TAG, `Failed to getFlashLightStatus. Code: ${error?.code}, message: ${error?.message}.`);
    }
    this.isFlashlight = isFlashlight;
    return isFlashlight;
  }

  private closeFlashLight(): void {
    Logger.info(TAG, 'Start to close flashlight.');
    try {
      if (this.isFlashlight) {
        customScan.closeFlashLight();
        this.isFlashlight = false;
      }
    } catch (error) {
      Logger.error(TAG, `Failed to closeFlashLight. Code: ${error?.code}, message: ${error?.message}.`);
    }
  }

  private openFlashLight() {
    Logger.info(TAG, 'Start to open flashlight.');
    try {
      customScan.openFlashLight();
      this.isFlashlight = true;
    } catch (error) {
      Logger.error(TAG, `Failed to openFlashLight. Code: ${error?.code}, message: ${error?.message}.`);
    }
  }

  public resetRetryScanTimes(): void {
    Logger.info(TAG, 'Reset retry scan times.');
    this.retryScanTimes = 0;
  }

  // 悬浮窗预览流特殊处理
  public async stopAndStartPreviewStream(viewControl: customScan.ViewControl,
    callback: AsyncCallback<Array<scanBarcode.ScanResult>>): Promise<void> {
    Logger.info(TAG,
      `stopAndStartPreviewStream start. viewControl, width: ${viewControl.width}, height: ${viewControl.height}.`);
    // 关闭闪光灯相关操作
    this.closeFlashLight();
    this.offLightingFlash();

    this.updateScanStatus(ScanStatus.PREVIEW_STOP);
    await this.stopCustomScan();
    this.updateScanStatus(ScanStatus.PREVIEW_DECODING);
    this.startCustomScan(viewControl, callback);

    // 初始化和开启闪光灯
    this.initLightFlash();
    this.onLightingFlash();
    Logger.info(TAG, 'stopAndStartPreviewStream end.');
  }
}