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

import { curves, display, LengthMetrics, TipsDialog, window } from '@kit.ArkUI';
import { customScan, scanBarcode, scanCore } from '@kit.ScanKit';
import { bundleManager, abilityAccessCtrl, PermissionRequestResult, Permissions, common, Want } from '@kit.AbilityKit';
import { AsyncCallback, BusinessError } from '@kit.BasicServicesKit';
import { ScanBottom } from '../view/ScanBottom';
import { CodeLayout } from '../view/CommonCodeLayout';
import { ScanLayout } from '../viewModel/ScanLayout';
import { CommonConstants } from '../constants/CommonConstants';
import { BreakpointConstants } from '../constants/BreakpointConstants';
import { BreakpointType, BREAK_POINT_TYPE_MARGIN_VP } from '../model/BreakpointType';
import { ScanResults, ScanService, ScanStatus } from '../viewModel/ScanService';
import Logger from '../utils/Logger';
import { DeviceService } from '../model/DeviceService';
import { XComponentService } from '../viewModel/XComponentService';
import { UIContextSelf } from '../model/UIContextSelf';
import { WindowService } from '../viewModel/WindowService';

const TAG = 'ScanPage';

@Entry(UIContextSelf.getSharedLocalStorage())
@ComponentV2
struct Index {
  @Local xComponentService: XComponentService = XComponentService.getInstance();
  @Local windowService: WindowService = WindowService.getInstance();
  @Local scanLayout: ScanLayout = ScanLayout.getInstance();
  @Local scanService: ScanService = ScanService.getInstance();
  @Local scanResult: ScanResults = this.scanService.scanResult;
  @Local densityDPI: number = 0; // Pixel density.
  @Local viewControl: customScan.ViewControl = {
    width: this.xComponentService.width,
    height: this.xComponentService.height,
    surfaceId: this.xComponentService.surfaceId
  };
  @Local userGrant: boolean = false; // Check whether the camera permission is granted.
  options: scanBarcode.ScanOptions = {
    scanTypes: [scanCore.ScanType.ALL],
    enableMultiMode: true
  };
  dialogController: CustomDialogController = new CustomDialogController({
    builder: TipsDialog({
      title: $r('app.string.Scan_access_not_enabled'),
      content: $r('app.string.Scan_access_tips'),
      primaryButton: {
        value: $r('app.string.Scan_got_it'),
        action: () => {
          this.closeDialog();
        },
      },
      secondaryButton: {
        value: $r('app.string.Scan_settings'),
        action: () => {
          this.openPermissionsInSystemSettings();
        }
      },
    }),
    autoCancel: false,
    customStyle: false,
    alignment: DialogAlignment.Center
  });
  private mXComponentController: XComponentController = new XComponentController();
  customScanCallback: AsyncCallback<scanBarcode.ScanResult[]> =
    async (error: BusinessError, result: scanBarcode.ScanResult[]) => {
      if (this.scanService.retryOnCondition(error, this.options, this.viewControl, this.customScanCallback)) {
        return;
      }
      if (this.scanService.scanStatus === ScanStatus.PREVIEW_DECODING) {
        this.handleDecodeResult(error, result);
        if (this.scanResult.size > 0) {
          this.scanService.stopPreviewStream();
          Logger.info(TAG, `customScanCallback, scanStatus: ${this.scanService.scanStatus}`);
          this.scanService.updateScanStatus(ScanStatus.PREVIEW_DECODING_COMPLETED);
        }
      }
    }

  @Computed
  get isSMOrMDBreakpoint() {
    return this.scanLayout.heightBreakpoint === BreakpointConstants.BREAKPOINT_SM ||
      this.scanLayout.heightBreakpoint === BreakpointConstants.BREAKPOINT_MD;
  }

  aboutToAppear() {
    Logger.info(TAG, 'aboutToAppear.');
    if (DeviceService.isFolding) {
      DeviceService.newFoldStatus = DeviceService.getFoldStatusByDisplay();
      DeviceService.oldFoldStatus = DeviceService.newFoldStatus;
      // Foldable screen status listener.
      this.foldStatusSubscribe();
    }

    // Window size listener.
    this.onXComponentChange();

    // Pixel density listener.
    this.onDisplayChange();

    // Screen event listener.
    this.onScreenEvent();
  }

  async onPageShow(): Promise<void> {
    Logger.info(TAG, 'onPageShow.');
    if (this.scanService.scanStatus !== ScanStatus.PHOTO_DECODING) {
      await this.empowerment();
    }
  }

  onPageHide(): void {
    Logger.info(TAG, 'onPageHide.');
    if (this.scanService.scanStatus !== ScanStatus.PHOTO_DECODING) {
      this.scanService.stopPreviewStream();
      this.scanService.updateScanStatus(ScanStatus.FORBIDDEN);
      this.userGrant = false;
      this.dialogController.close();
    }
  }

  async aboutToDisappear(): Promise<void> {
    Logger.info(TAG, 'aboutToDisappear.');
    try {
      UIContextSelf.offEventHub(CommonConstants.X_COMPONENT_CHANGE);
      if (DeviceService.isFolding) {
        display.off('foldStatusChange');
      }
    } catch (error) {
      Logger.error(TAG, `listener off catch error. Code: ${error?.code}`);
    }
    this.offDisplayChange();
    this.offScreenEvent();
  }

  @Builder
  ScanXComponent() {
    XComponent({
      id: 'componentId',
      type: XComponentType.SURFACE,
      controller: this.mXComponentController
    })
      .onLoad(async () => {
        this.xComponentService.surfaceId = this.mXComponentController.getXComponentSurfaceId();
        Logger.info(TAG,
          `Succeeded in loading XComponent, getXComponentSurfaceId: ${this.xComponentService.surfaceId}.`);
        this.startCustomScan();
      })
      .onDestroy(() => {
        this.xComponentService.surfaceId = '';
        Logger.info(TAG, 'Succeeded in destroying XComponent.');
      })
      .height(this.xComponentService.height)
      .width(this.xComponentService.width)
      .position({ x: this.xComponentService.offsetX, y: this.xComponentService.offsetY })
      .clip(true)
  }

  @Builder
  BackgroundBuilder() {
    this.ScanXComponent();
  }

  @Builder
  ScanTitleBuilder() {
    // Scan title.
    Column() {
      Column() {
        Text(this.scanResult.size > 1 ? $r('app.string.Scan_barcode_tips_callback') : $r('app.string.Scan_barcode'))
          .textAlign(TextAlign.Center)
          .fontFamily('HarmonyHeiTi')
          .fontWeight(FontWeight.Regular)
          .fontColor($r('sys.color.ohos_id_color_primary_contrary'))
          .maxLines(2)
          .textOverflow({ overflow: TextOverflow.Ellipsis })
          .fontSize($r('sys.float.Subtitle_L'))
          .maxFontSize(CommonConstants.SCAN_FONT_SIZE_SCALE_LIMIT_TITLE_TEXT)
          .width(this.isSMOrMDBreakpoint ? `calc(100% - 80vp - 16vp)` : '100%')
          .constraintSize({
            maxWidth: this.isSMOrMDBreakpoint ? `calc(100% - 80vp - 16vp)` : 460
          })
      }
      .onSizeChange((oldValue: SizeOptions, newValue: SizeOptions) => {
        Logger.info(TAG,
          `title height has changed, oldTitleHeight: ${oldValue.height}, newTitleHeight: ${newValue.height}`);
        let titleHeight: number = Number(newValue.height);
        if (Math.abs(this.scanLayout.titleHeight - titleHeight) > 1) {
          this.scanLayout.setTopLayout(titleHeight);
        }
      })
      .id('scan_scan_title_v2')
      .alignItems(HorizontalAlign.Center)
      .margin({
        top: this.scanLayout.titleMarginTop
      })
      .padding({
        left: BREAK_POINT_TYPE_MARGIN_VP.getValue(this.scanLayout.widthBreakpoint),
        right: BREAK_POINT_TYPE_MARGIN_VP.getValue(this.scanLayout.widthBreakpoint)
      })
      .width('100%')
    }
  }

  @Builder
  ScanBottomBuilder() {
    // Flash light only
    ScanBottom()
  }

  @Builder
  MaskLayerBuilder() {
    // Radio button information in the single-code and multi-code scanning results.
    if (this.scanService.isDecodingCompleted()) {
      Column().width('100%')
        .height('100%')
        .backgroundColor('rgba(0,0,0,0.5)')
        .animation({
          duration: 350, // Animation duration.
          curve: curves.cubicBezierCurve(0.33, 0, 0.67, 1), // Animation curve.
          delay: 0,
          iterations: 1,
          playMode: PlayMode.Alternate,
        })
    }
  }

  @Builder
  CodeLayoutBuilder() {
    // Display the radio button for scanning a single barcode or multiple barcodes.
    if (this.scanService.isDecodingCompleted()) {
      Column() {
        CodeLayout({
          scanResults: this.scanResult,
          restartPreviewStream: (() => {
            Logger.info(TAG, 'Start to restartPreviewStream by dialog button.');
            this.restartPreviewStream();
          })
        })
      }
    }
  }

  @Builder
  CloseButtonBuilder() {
    Button({
      type: ButtonType.Circle,
      stateEffect: true
    }) {
      SymbolGlyph($r('sys.symbol.xmark'))
        .fontWeight(FontWeight.Regular)
        .fontColor([$r('sys.color.font_on_primary')])
        .fontSize('24vp')
    }
    .width(CommonConstants.CLOSE_IMAGE_SIZE)
    .height(CommonConstants.CLOSE_IMAGE_SIZE)
    .backgroundColor('rgba(255,255,255,0.15)')
    .id('scan_page_goBack_v2')
    .margin({
      top: LengthMetrics.vp(this.scanLayout.closeButtonMarginTop),
      start: LengthMetrics.vp(BREAK_POINT_TYPE_MARGIN_VP.getValue(this.scanLayout.widthBreakpoint))
    })
    .onClick(async () => {
      if (this.scanResult.size >= 1) {
        Logger.info(TAG, 'Start to restartPreviewStream by close button.');
        this.scanService.resetRetryScanTimes();
        this.restartPreviewStream();
      } else {
        Logger.info(TAG, 'close app');
        UIContextSelf.commonContext.terminateSelf()
          .then(() => {
            // 执行正常业务
            Logger.info(TAG, 'terminateSelf succeed.');
          }).catch((err: BusinessError) => {
          // 处理业务逻辑错误
          Logger.info(TAG, `terminateSelf failed, code is ${err.code}, message is ${err.message}`);
        });
      }
    })
  }

  build() {
    Stack({ alignContent: Alignment.TopStart }) {
      if (this.userGrant) {
        this.BackgroundBuilder()
      }

      this.ScanBottomBuilder()

      this.MaskLayerBuilder()

      this.ScanTitleBuilder()

      this.CodeLayoutBuilder()

      this.CloseButtonBuilder()
    }
    .width('100%')
    .height('100%')
    .backgroundColor(this.userGrant ? Color.Transparent : Color.Black)
    .gesture(
      GestureGroup(GestureMode.Exclusive, TapGesture({ count: 2 }).onAction((_: GestureEvent) => {
        this.scanService.tapGesture();
      }),
        PinchGesture({
          fingers: 2
        }).onActionStart((_: GestureEvent) => {
          this.scanService.pinchGestureStart();
        }).onActionUpdate((event: GestureEvent) => {
          if (event && event.scale) {
            this.scanService.pinchGestureUpdate(event.scale);
          }
        }).onActionEnd((_: GestureEvent) => {
          Logger.info(TAG, 'pinchGestureEnd');
        })
      )
    )
  }

  // Code recognition information processing.
  handleDecodeResult(error: BusinessError, result: scanBarcode.ScanResult[]): void {
    if (result) {
      this.scanResult.size = result.length;
      // Barcode image information recognized.
      if (this.scanResult.size > 0) {
        this.scanResult.code = (error && error.code) ? error.code : 0;
        this.scanResult.data = result;
      }
    }
  }

  onScreenEvent(): void {
    // Subscribe to COMMON_EVENT_SCREEN_CHANGE.
    UIContextSelf.onEventHub(CommonConstants.COMMON_EVENT_SCREEN_CHANGE, (screenStatus: string) => {
      Logger.info(TAG, 'screenEventChange enter');
      if (screenStatus === CommonConstants.EVENT_SCREEN_OFF) {
        this.onPageHide();
      } else if (screenStatus === CommonConstants.EVENT_SCREEN_ON) {
        this.onPageShow();
      }
    })
  }

  offScreenEvent(): void {
    UIContextSelf.offEventHub(CommonConstants.COMMON_EVENT_SCREEN_CHANGE);
  }

  async checkAccessToken(permission: Permissions): Promise<abilityAccessCtrl.GrantStatus> {
    const atManager = abilityAccessCtrl.createAtManager();
    let grantStatus: abilityAccessCtrl.GrantStatus = abilityAccessCtrl.GrantStatus.PERMISSION_DENIED;
    // Obtain accessTokenId of the app.
    let tokenId: number = 0;
    try {
      const bundleInfo: bundleManager.BundleInfo =
        await bundleManager.getBundleInfoForSelf(bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION);
      const appInfo: bundleManager.ApplicationInfo = bundleInfo.appInfo;
      tokenId = appInfo.accessTokenId;
    } catch (error) {
      Logger.error(TAG, `Failed to get bundle info for self. Code: ${error?.code}.`);
    }
    //  Check whether the app has the required permission.
    try {
      grantStatus = await atManager.checkAccessToken(tokenId, permission);
    } catch (error) {
      Logger.error(TAG, `Failed to check access token. Code: ${error?.code}.`);
    }
    return grantStatus;
  }

  async reqPermissionsFromUser(context: common.UIAbilityContext): Promise<number[]> {
    Logger.info(TAG, 'reqPermissionsFromUser start ');
    const atManager = abilityAccessCtrl.createAtManager();
    let grantStatus: PermissionRequestResult = { permissions: [], authResults: [] }
    try {
      grantStatus = await atManager.requestPermissionsFromUser(context, ['ohos.permission.CAMERA']);
    } catch (error) {
      Logger.error(TAG, `Failed to request permissions from user. Code: ${error?.code}.`);
    }
    return grantStatus.authResults;
  }

  async empowerment() {
    const permissions: Permissions[] = ['ohos.permission.CAMERA'];
    const grantStatus: abilityAccessCtrl.GrantStatus = await this.checkAccessToken(permissions[0]);
    if (grantStatus === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
      // If the user has granted the permission, the operation is allowed.
      this.userGrant = true;
      this.scanService.updateScanStatus(ScanStatus.NOT_STARTED);
      this.startCustomScan();
    } else {
      // Apply for the camera permission.
      this.requestCameraPermission();
    }
  }

  async requestCameraPermission() {
    const grantStatus: number[] = await this.reqPermissionsFromUser(UIContextSelf.commonContext);
    if (grantStatus[0] === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
      // The user has granted the permission.
      Logger.info(TAG, 'Succeeded in requesting permissions from user.');
      this.userGrant = true;
      this.scanService.updateScanStatus(ScanStatus.NOT_STARTED);
      this.dialogController.close();
      this.startCustomScan();
    } else {
      // If the user refuses to grant the permission, display a message indicating that user authorization is required,
      // and direct the user to set the permission in system settings.
      Logger.info(TAG, 'Failed to requesting permissions from user.');
      this.userGrant = false;
      this.dialogController.open();
    }
  }

  onDisplayChange(): void {
    display.on('change', () => {
      let newDisplay = DeviceService.getDisplayInfoSync();
      Logger.info(TAG,
        `onDisplayChange, pre_densityPixels: ${DeviceService.densityPixels}, new_densityPixels: ${newDisplay?.densityPixels}.pre_rotation: ${DeviceService.rotation}, new_rotation: ${newDisplay?.rotation}.`);
      if (newDisplay !== null) {
        // The device rotates.
        if (DeviceService.rotation !== newDisplay.rotation) {
          Logger.info(TAG,
            `onDisplayChange, pre_rotation: ${DeviceService.rotation}, new_rotation: ${newDisplay.rotation}.`);
          let rotationAngle: number = Math.abs(DeviceService.rotation - newDisplay.rotation);
          DeviceService.setDisplayInfo(newDisplay);

          // The device rotates and the screen density changes.
          if (DeviceService.densityPixels !== newDisplay.densityPixels) {
            this.windowService.refreshLayoutByDensityPixels(DeviceService.densityPixels);
          } else if (this.windowService.windowStatusType === window.WindowStatusType.FLOATING) {
            // 悬浮窗口尺寸不发生变化， XComponent的尺寸发生变化
            this.xComponentService.setScanXComponentSize();
          }

          // rotationAngle === 2 indicates that the rotation angle is 180 degrees. In this case, you do not need to
          // initialize the width and height of XComponent. Instead, you can directly use initScan.
          if (rotationAngle === 2) {
            this.startCustomScan();
          }

          // The device screen density changes.
        } else if (DeviceService.densityPixels !== newDisplay.densityPixels) {
          Logger.info(TAG,
            `onDisplayChange, pre_densityPixels: ${DeviceService.densityPixels}, new_densityPixels: ${newDisplay.densityPixels}.`);
          DeviceService.setDisplayInfo(newDisplay);
          this.windowService.refreshLayoutByDensityPixels(DeviceService.densityPixels);
        } else {
          DeviceService.setDisplayInfo(newDisplay);
        }
      }
    })
  }

  offDisplayChange(): void {
    try {
      display.off('change');
    } catch (error) {
      Logger.error(TAG, `offDensityDPI off catch error. Code: ${error?.code}`);
    }
  }

  refreshViewControl(): void {
    this.viewControl = {
      width: this.xComponentService.width,
      height: this.xComponentService.height,
      surfaceId: this.xComponentService.surfaceId
    };
  }

  startCustomScan(): void {
    this.refreshViewControl();
    if (this.xComponentService.surfaceId) {
      Logger.info(TAG, `startCustomScan, surfaceId: ${this.xComponentService.surfaceId}`);
      this.scanService.startPreviewStream(this.options, this.viewControl, this.customScanCallback);
    }
  }

  onXComponentChange(): void {
    // Respond to the window size change.
    UIContextSelf.onEventHub(CommonConstants.X_COMPONENT_CHANGE, async () => {
      Logger.info(TAG, `isXComponentSizeChanged: ${this.xComponentService.isXComponentSizeChanged}`);
      if (DeviceService.oldFoldStatus !== DeviceService.newFoldStatus) {
        DeviceService.oldFoldStatus = DeviceService.newFoldStatus;
        await this.scanService.stopPreviewStream();
        this.scanService.resetRetryScanTimes();
      }
      if (this.scanService.scanStatus === ScanStatus.PREVIEW_DECODING &&
        this.xComponentService.isXComponentSizeChanged) {
        this.refreshViewControl();
        this.scanService.resetRetryScanTimes();
        await this.scanService.stopAndStartPreviewStream(this.viewControl, this.customScanCallback);
      } else {
        this.startCustomScan();
      }
    });
  }

  foldStatusSubscribe(): void {
    try {
      display.on('foldStatusChange', async (foldStatus: display.FoldStatus) => {
        // change: FOLD_STATUS_FOLDED => FOLD_STATUS_HALF_FOLDED;
        // change: FOLD_STATUS_EXPANDED or FOLD_STATUS_HALF_FOLDED => FOLD_STATUS_FOLDED
        Logger.info(TAG,
          `foldStatus has changed, pre_foldStatus: ${DeviceService.newFoldStatus}, new_foldStatus: ${foldStatus}`);
        DeviceService.oldFoldStatus = DeviceService.newFoldStatus;
        DeviceService.newFoldStatus = foldStatus;
      });
    } catch (error) {
      Logger.error(TAG, `Failed to foldStatusListen. Code: ${error?.code}`);
    }
  }

  restartPreviewStream() {
    this.scanService.startPreviewStream(this.options, this.viewControl, this.customScanCallback);
  }

  closeDialog(): void {
    Logger.info(TAG, 'Start to close dialog.');
    if (this.dialogController) {
      this.dialogController.close();
      Logger.info(TAG, 'Succeeded in closing dialog.');
    }
  }

  openPermissionsInSystemSettings(): void {
    Logger.info(TAG, 'Start to open permissions in system settings.');
    let context = UIContextSelf.getHostContext() as common.UIAbilityContext;
    // Start the MainAbility of com.huawei.hmos.settings and match the URI of application_info_entry.
    const wantInfo: Want = {
      bundleName: 'com.huawei.hmos.settings',
      abilityName: 'com.huawei.hmos.settings.MainAbility',
      uri: 'application_info_entry',
      parameters: {
        settingsParamBundleName: 'com.example.scanSample'
      }
    };
    try {
      context.startAbility(wantInfo).then(() => {
        Logger.info(TAG, 'Succeeded in starting ability.');
      }).catch((error: BusinessError) => {
        Logger.error(TAG, `Failed to start ability by promise. Code: ${error.code}.`);
      })
    } catch (error) {
      Logger.error(TAG, `Failed to start ability by catch. Code: ${error?.code}.`);
    }
  }
}
