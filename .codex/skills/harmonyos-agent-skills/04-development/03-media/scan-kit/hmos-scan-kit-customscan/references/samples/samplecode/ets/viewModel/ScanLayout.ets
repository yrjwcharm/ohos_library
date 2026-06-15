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
import { BreakpointConstants } from '../constants/BreakpointConstants';
import { CommonConstants } from '../constants/CommonConstants';
import { DeviceService } from '../model/DeviceService';
import Logger from '../utils/Logger';
import { WindowService } from './WindowService';

const TAG: string = 'ScanLayout';
const TOP_BUTTON_HEIGHT = CommonConstants.TOP_BUTTON_HEIGHT;
const NUMBER_MARGIN_8: number = 8;
const NUMBER_MARGIN_16: number = 16;

@ObservedV2
export class ScanLayout {
  @Trace public widthBreakpoint: string = BreakpointConstants.BREAKPOINT_SM; // Width breakpoint.
  @Trace public heightBreakpoint: string = BreakpointConstants.BREAKPOINT_SM; // Height breakpoint.
  @Trace public closeButtonMarginTop: number = 0; // Height between the close button and the top.
  @Trace public titleMarginTop: number = 0; // Height between the title and the top.
  @Trace public titleHeight: number = CommonConstants.TITLE_MAIN_LINE_HEIGHT; // Height of the main title.
  @Trace public isFlashShow: boolean = true; // Whether to display the flashlight.
  public topAvoidHeight: number = 0; // Top avoid height.
  private static instance: ScanLayout | null = null;
  public isFullScreen: boolean = false; // Whether the screen is in full screen.
  public height: number = 0; // Window height.
  public marginD: number = 0;
  // Height between the top of the scanning screen and the bottom of the copy space.
  public titleBottomMarginTop: number = 0;

  static getInstance(): ScanLayout {
    ScanLayout.instance ||= new ScanLayout();
    return ScanLayout.instance;
  }

  /**
   * Page layout above the scanning line.
   * @param titleHeight
   */
  public setTopLayout(titleHeight: number = this.titleHeight): void {
    Logger.info(TAG, 'Start to set top layout.');
    this.titleHeight = titleHeight;
    this.topAvoidHeight = WindowService.getInstance().topAvoidHeight;
    const topButtonHeight = TOP_BUTTON_HEIGHT;

    // If the height is less than 480, the main title occupies the space of the close button.
    if (this.heightBreakpoint === BreakpointConstants.BREAKPOINT_SM ||
      this.heightBreakpoint === BreakpointConstants.BREAKPOINT_MD) {
      this.titleMarginTop = this.topAvoidHeight + NUMBER_MARGIN_16;
      if (this.titleMarginTop + titleHeight > this.topAvoidHeight + CommonConstants.TOP_BUTTON_HEIGHT) {
        this.titleBottomMarginTop = this.titleMarginTop + titleHeight;
      } else {
        this.titleBottomMarginTop = this.topAvoidHeight + CommonConstants.TOP_BUTTON_HEIGHT;
      }
    } else {
      this.titleMarginTop = this.topAvoidHeight + topButtonHeight + CommonConstants.TITLE_MARGIN_TOP;
      this.titleBottomMarginTop = this.titleMarginTop + titleHeight;
    }
    this.closeButtonMarginTop = this.topAvoidHeight + NUMBER_MARGIN_8;
  }

  /**
   * Layout of the page below the scanning line, flashlight, and gallery.
   */
  public setBottomLayout(): void {
    let isFlashShow: boolean = true;
    if (this.heightBreakpoint === BreakpointConstants.BREAKPOINT_SM) {
      isFlashShow = false;
    }
    this.isFlashShow = isFlashShow;
  }

  /**
   * Width breakpoints: 600 and 840.
   * BREAKPOINT_SM, BREAKPOINT_MD, BREAKPOINT_LG
   */
  public setWidthBreakpoint(width: number): void {
    if (width < BreakpointConstants.MIDDLE_DEVICE_WIDTH) {
      this.widthBreakpoint = BreakpointConstants.BREAKPOINT_SM;
    } else if (width < BreakpointConstants.LARGE_DEVICE_WIDTH) {
      this.widthBreakpoint = BreakpointConstants.BREAKPOINT_MD;
    } else {
      this.widthBreakpoint = BreakpointConstants.BREAKPOINT_LG;
    }
    Logger.info(TAG, `widthBreakpoint: ${this.widthBreakpoint}`);
  }

  /**
   * When the width is less than 600, the height breakpoints are: 300, 480.
   * BREAKPOINT_SM, BREAKPOINT_MD, BREAKPOINT_LG, or BREAKPOINT_XL
   * When the width is greater than or equal to 600, the height breakpoints are: 480, 600.
   * BREAKPOINT_SM or BREAKPOINT_MD, BREAKPOINT_LG, BREAKPOINT_XL
   */
  public setHeightBreakpoint(height: number): void {
    if (height < BreakpointConstants.MIDDLE_DEVICE_HEIGHT) {
      this.heightBreakpoint = BreakpointConstants.BREAKPOINT_SM;
    } else if (height < BreakpointConstants.LARGE_DEVICE_HEIGHT) {
      this.heightBreakpoint = BreakpointConstants.BREAKPOINT_MD;
    } else if (height < BreakpointConstants.EXTRA_LARGE_DEVICE_HEIGHT) {
      this.heightBreakpoint = BreakpointConstants.BREAKPOINT_LG;
    } else {
      this.heightBreakpoint = BreakpointConstants.BREAKPOINT_XL;
    }
    Logger.info(TAG, `heightBreakpoint: ${this.heightBreakpoint}`);
  }

  public setMarginD(width: number, height: number): void {
    if (this.widthBreakpoint === BreakpointConstants.BREAKPOINT_SM &&
      (this.heightBreakpoint === BreakpointConstants.BREAKPOINT_LG ||
        this.heightBreakpoint === BreakpointConstants.BREAKPOINT_XL) && this.isFullScreen) {
      // Height of the viewing area.
      let viewHeight: number = height - width * 16 / 9 - TOP_BUTTON_HEIGHT;
      // Height of the icon button area.
      let buttonHeight: number = width * 16 / 9 - width * 4 / 3;
      if (viewHeight >= 72) {
        this.marginD = (buttonHeight - 128) / 3;
      } else {
        this.marginD = (buttonHeight - 160) / 3;
      }
    } else {
      this.marginD = 0
    }
    Logger.info(TAG, `marginD: ${this.marginD}`);
  }

  public setIsFullScreen(width: number, height: number): void {
    if (width === DeviceService.width && height === DeviceService.height) {
      this.isFullScreen = true;
    } else {
      this.isFullScreen = false;
    }
    Logger.info(TAG, `isFullScreen: ${this.isFullScreen}`);
  }

  /**
   * Update the breakpoint and scanLayout when the window width and height change.
   * @param width
   * @param height
   */
  public refreshLayout(width: number, height: number): void {
    Logger.info(TAG, `Start to refresh layout. width: ${width}, height ${height}.`);
    this.refreshBreakpoint(width, height);
    this.refreshScanLayout(width, height);
  }

  /**
   * Update the breakpoint when the window width and height change.
   * @param width
   * @param height
   */
  public refreshBreakpoint(width: number, height: number): void {
    Logger.info(TAG, `Start to refresh breakpoint. width: ${width}, height ${height}.`);
    this.height = height;
    this.setWidthBreakpoint(width);
    this.setHeightBreakpoint(height);
  }

  /**
   * Update the layout when the window width and height change.
   * @param width
   * @param height
   */
  public refreshScanLayout(width: number, height: number): void {
    Logger.info(TAG, `Start to refresh scanLayout. width: ${width}, height ${height}.`);
    this.setIsFullScreen(width, height);
    this.setMarginD(width, height);
    this.setTopLayout();
    this.setBottomLayout();
  }
}