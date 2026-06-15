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

/**
 * Common constants of all function
 */
export class CommonConstants {
  /**
   *  Height of the close button area
   */
  static readonly TOP_BUTTON_HEIGHT: number = 56;

  /**
   *  Top title margin
   */
  static readonly TITLE_MARGIN_TOP: number = 8;
  /**
   *  Title row height
   */
  static readonly TITLE_MAIN_LINE_HEIGHT: number = 24;

  /**
   *  Flash light height
   */
  static readonly FLASH_HEIGHT: number = 52;
  /**
   *  Flash light bottom margin
   */
  static readonly FLASH_MARGIN_BOTTOM: number = 12;
  /**
   *  Scanning area height
   */
  static readonly PLACEHOLDER_HEIGHT: number = 56;
  /**
   *  TabBar height
   */
  static readonly TAB_BAR_HEIGHT: number = 32;
  /**
   *  Ai Bottom Bar height
   */
  static readonly AI_BOTTOM_BAR_HEIGHT: number = 40;
  /**
   *  Close icon size
   */
  static readonly CLOSE_IMAGE_SIZE: number = 40;
  /**
   *  SM device padding
   */
  static readonly PADDING_SM: number = 16;
  /**
   *  MD device padding
   */
  static readonly PADDING_MD: number = 24;
  /**
   *  LG device padding
   */
  static readonly PADDING_LG: number = 32;
  /**
   *  SCAN_FONT_SIZE_SCALE_LIMIT
   */
  static readonly SCAN_FONT_SIZE_SCALE_LIMIT_SYMBOL_TEXT: number = 1.45;
  static readonly SCAN_FONT_SIZE_SCALE_LIMIT_TITLE_TEXT: number = 1.75;

  static readonly TOP_AVOID_HEIGHT_DEFAULT: number = 39;

  static readonly MAX_RETRY_SCAN_TIMES: number = 3;
  static readonly DELAY_RETRY_SCAN_TIME: number = 100;
  static readonly MIN_ZOOM_RATIO: number = 1;
  static readonly MAX_ZOOM_RATIO: number = 4;
  static readonly BUNDLE_NAME: string = 'com.example.customscanphone';
  /**
   *  Screen status change listener ID
   */
  static readonly COMMON_EVENT_SCREEN_CHANGE: string = 'screen_change';
  static readonly EVENT_SCREEN_OFF: string = 'screen_off';
  static readonly EVENT_SCREEN_ON: string = 'screen_on';

  static readonly X_COMPONENT_CHANGE: string = 'xComponent_change';
}
export enum DisplayRotationAngle {
  ROTATION_0 = 0,
  ROTATION_90 = 1,
  ROTATION_180 = 2,
  ROTATION_270 = 3
};

