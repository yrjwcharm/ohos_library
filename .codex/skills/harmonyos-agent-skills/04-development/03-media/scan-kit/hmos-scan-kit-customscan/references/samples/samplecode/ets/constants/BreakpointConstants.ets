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
 * Breakpoint constants
 */
export class BreakpointConstants {
  /**
   * Small device
   */
  public static readonly BREAKPOINT_SM: string = 'sm';
  /**
   * Medium device
   */
  public static readonly BREAKPOINT_MD: string = 'md';
  /**
   * Breakpoints that represent large device types.
   */
  public static readonly BREAKPOINT_LG: string = 'lg';
  /**
   * Breakpoints that represent extra large device types.
   */
  public static readonly BREAKPOINT_XL: string = 'xl';
  /**
   * Medium device min. width
   */
  public static readonly MIDDLE_DEVICE_WIDTH: number = 600;
  /**
   * Large device min. width
   */
  public static readonly LARGE_DEVICE_WIDTH: number = 840;
  /**
   * Middle device height.
   */
  public static readonly MIDDLE_DEVICE_HEIGHT: number = 300;
  /**
   * Large device height.
   */
  public static readonly LARGE_DEVICE_HEIGHT: number = 480;
  /**
   * Extra large device height.
   */
  public static readonly EXTRA_LARGE_DEVICE_HEIGHT: number = 600;
  /**
   *  Loading Height SM
   */
  public static readonly LOADING_HEIGHT_SM: string = '60%';
  /**
   *  Loading Height MD
   */
  public static readonly LOADING_HEIGHT_MD: string = '60%';
  /**
   *  Loading Height LG
   */
  public static readonly LOADING_HEIGHT_LG: string = '50%';
  /**
   *  Container Margin SM
   */
  public static readonly CONTAINER_MARGIN_SM: number = 16;
  /**
   *  Container Margin MD
   */
  public static readonly CONTAINER_MARGIN_MD: number = 24;
  /**
   *  Container Margin LG
   */
  public static readonly CONTAINER_MARGIN_LG: number = 32;
}