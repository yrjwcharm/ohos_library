/*
 * Copyright (c) 2025 Huawei Device Co., Ltd.
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
 * @file Defines toolbar attributes.
 * @kit ArkUI
 */

/**
 * Declare the placement of the toolbar item.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 20 dynamic
 */
declare enum ToolBarItemPlacement {
  /**
   * Place toolbar item at the leading of top bar.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 20 dynamic
   */
  TOP_BAR_LEADING = 0,

  /**
   * Place toolbar item at the trailing of top bar.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 20 dynamic
   */
  TOP_BAR_TRAILING = 1,
}

/**
 * ToolBarItem constructor options.
 *
 * @interface ToolBarItemOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 20 dynamic
 */
interface ToolBarItemOptions {
  /**
   * Vertical layout element spacing.
   *
   * @type { ?ToolBarItemPlacement }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 20 dynamic
   */
  placement?: ToolBarItemPlacement;
}

/**
 * Defines the ToolBarItem Component.
 *
 * @interface ToolBarItemInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 20 dynamic
 */
interface ToolBarItemInterface {
  /**
   * Set the options.
   *
   * @param { ToolBarItemOptions } [options] - column options
   * @returns { ToolBarItemAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 20 dynamic
   */
  (options?: ToolBarItemOptions): ToolBarItemAttribute;
}

/**
 * Defines the ToolBarItem component attribute functions.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 20 dynamic
 */
declare class ToolBarItemAttribute { }

/**
 * Defines ToolBarItem Component.
 *
 * @type { ToolBarItemInterface }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 20 dynamic
 */
declare const ToolBarItem: ToolBarItemInterface;

/**
 * Defines ToolBarItem Component instance.
 *
 * @type { ToolBarItemAttribute }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 20 dynamic
 */
declare const ToolBarItemInstance: ToolBarItemAttribute;