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
 * @file
 * @kit ArkUI
 */

/**
 * Defines the options of Picker.
 *
 * @interface UIPickerComponentOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @stagemodelonly
 * @crossplatform
 * @atomicservice
 * @since 22 dynamic
 */
declare interface UIPickerComponentOptions {
  /**
   * Current selected subscript.
   *
   * @type { ?number }
   * @default 0
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  selectedIndex?: number;
}

/**
 * UIPickerComponentInterface
 *
 * @interface UIPickerComponentInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @stagemodelonly
 * @crossplatform
 * @atomicservice
 * @since 22 dynamic
 */
interface UIPickerComponentInterface {
  /**
   * Defines the Picker constructor.
   *
   * @param { UIPickerComponentOptions } [options]
   * @returns { UIPickerComponentAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  (options?: UIPickerComponentOptions): UIPickerComponentAttribute;
}

/**
 * Callback of Picker item is selected event.
 *
 * @typedef {function} OnUIPickerComponentCallback
 * @param { number } selectedIndex - Index of the selected item.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @stagemodelonly
 * @crossplatform
 * @atomicservice
 * @since 22 dynamic
 */
declare type OnUIPickerComponentCallback = (selectedIndex: number) => void;

/**
 * PickerIndicatorType
 * 
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @stagemodelonly
 * @crossplatform
 * @atomicservice
 * @since 22 dynamic
 */
declare enum PickerIndicatorType {
  /**
   * Background marks the selected item.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  BACKGROUND = 0,

  /**
   * Divider marks the selected item.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  DIVIDER = 1,
}

/**
 * Defines the options of Indicator style.
 *
 * @interface PickerIndicatorStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @stagemodelonly
 * @crossplatform
 * @atomicservice
 * @since 22 dynamic
 */
declare interface PickerIndicatorStyle {
  /**
   * The type of indicator.
   *
   * @type { PickerIndicatorType } type
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  type: PickerIndicatorType;

  /**
   * The width of divider stroke.
   *
   * @type { ?LengthMetrics } strokeWidth
   * @default $r('sys.float.border_medium')
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  strokeWidth?: LengthMetrics;

  /**
   * The color of Divider.
   *
   * @type { ?ResourceColor } dividerColor
   * @default $r('sys.color.comp_divider')
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  dividerColor?: ResourceColor;

  /**
   * The startMargin of Divider.
   *
   * @type { ?LengthMetrics } startMargin
   * @default 0vp
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  startMargin?: LengthMetrics;

  /**
   * The endMargin of Divider.
   *
   * @type { ?LengthMetrics } endMargin
   * @default 0vp
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  endMargin?: LengthMetrics;

  /**
   * Define the background color of selected item.
   *
   * @type { ?ResourceColor } backgroundColor
   * @default $r('sys.color.comp_background_tertiary')
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  backgroundColor?: ResourceColor;

  /**
   * Defines the border radius of selected items.
   *
   * @type { ?(LengthMetrics | BorderRadiuses | LocalizedBorderRadiuses) } borderRadius
   * @default $r('sys.float.corner_radius_level6')
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  borderRadius?: LengthMetrics | BorderRadiuses | LocalizedBorderRadiuses;
}

/**
 * Style the picker.
 *
 * @extends CommonMethod<UIPickerComponentAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @stagemodelonly
 * @crossplatform
 * @atomicservice
 * @since 22 dynamic
 */
declare class UIPickerComponentAttribute extends CommonMethod<UIPickerComponentAttribute> {
  /**
   * This event is triggered when a Picker item is selected.
   *
   * @param { Optional<OnUIPickerComponentCallback> } callback - the callback of onChange.
   * @returns { UIPickerComponentAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */  
  onChange(callback: Optional<OnUIPickerComponentCallback>): UIPickerComponentAttribute;

  /**
   * This event is triggered when a Picker item is selected and scrolling has stopped.
   *
   * @param { Optional<OnUIPickerComponentCallback> } callback - the callback of onScrollStop.
   * @returns { UIPickerComponentAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  onScrollStop(callback: Optional<OnUIPickerComponentCallback>): UIPickerComponentAttribute;

  /**
   * Can scroll loop if true is set, on the contrary it can not.
   *
   * @param { Optional<boolean> } isLoop
   * @returns { UIPickerComponentAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  canLoop(isLoop: Optional<boolean>): UIPickerComponentAttribute;

  /**
   * Enable or disable haptic feedback.
   *
   * @param { Optional<boolean> } enable - Default value is true, set false to disable haptic feedback.
   * @returns { UIPickerComponentAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @atomicservice
   * @since 22 dynamic
   */
  enableHapticFeedback(enable: Optional<boolean>): UIPickerComponentAttribute;

  /**
   * Sets the indicator's type and style.
   *
   * @param { Optional<PickerIndicatorStyle> } style
   * @returns { UIPickerComponentAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  selectionIndicator(style: Optional<PickerIndicatorStyle>): UIPickerComponentAttribute;
}

/**
 * Defines Picker Component.
 *
 * @type { UIPickerComponentInterface } UIPickerComponent
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @stagemodelonly
 * @crossplatform
 * @atomicservice
 * @since 22 dynamic
 */
declare const UIPickerComponent: UIPickerComponentInterface;

/**
 * Defines Picker Component instance.
 *
 * @type { UIPickerComponentAttribute } UIPickerComponentInstance
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @stagemodelonly
 * @crossplatform
 * @atomicservice
 * @since 22 dynamic
 */
declare const UIPickerComponentInstance: UIPickerComponentAttribute;
