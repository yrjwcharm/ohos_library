/*
 * Copyright (c) 2021-2023 Huawei Device Co., Ltd.
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
 * Defines the badge position property.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the badge position property.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @since 9
 */
/**
 * Defines the badge position property.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Defines the badge position property.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare enum BadgePosition {
  /**
   * The dot is displayed vertically centered on the right.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * The dot is displayed vertically centered on the right.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * The dot is displayed vertically centered on the right.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * The badge is displayed in the upper right corner of the parent component.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  RightTop,

  /**
   * Dots are displayed in the upper right corner.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Dots are displayed in the upper right corner.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Dots are displayed in the upper right corner.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * The badge is vertically centered on the right of the parent component.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  Right,

  /**
   * The dot is displayed in the left vertical center.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * The dot is displayed in the left vertical center.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * The dot is displayed in the left vertical center.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * The badge is vertically centered on the left of the parent component.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  Left,
}

/**
 * BadgeStyle object
 *
 * @interface BadgeStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * BadgeStyle object
 *
 * @interface BadgeStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @since 9
 */
/**
 * BadgeStyle object
 *
 * @interface BadgeStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * BadgeStyle object
 *
 * @interface BadgeStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare interface BadgeStyle {
  /**
   * Text Color
   *
   * @type { ?ResourceColor }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Text Color
   *
   * @type { ?ResourceColor }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Text Color
   *
   * @type { ?ResourceColor }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Font color.
   *
   * @type { ?ResourceColor }
   * @default Color.White
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  color?: ResourceColor;

  /**
   * Text size.
   *
   * @type { ?(number | string) }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Text size.
   *
   * @type { ?(number | string) }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Text size.
   *
   * @type { ?(number | string) }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Text size.
   *
   * @type { ?(number | string) }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
  /**
   * Font size.
   * For the string type, only numeric string values with optional units.
   * The value must be greater than or equal to 0. If the value is less than 0, the default value is used.
   * Unit: fp
   *
   * <p><strong>NOTE</strong>:
   * <br>This parameter cannot be set in percentage.
   * </p>
   *
   * @type { ?(number | ResourceStr) }
   * @default 10
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 20 dynamic
   */
  fontSize?: number | ResourceStr;

  /**
   * Size of a badge.
   *
   * @type { ?(number | string) }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Size of a badge.
   *
   * @type { ?(number | string) }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Size of a badge.
   *
   * @type { ?(number | string) }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Size of a badge.
   *
   * @type { ?(number | string) }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
  /**
   * Badge size.
   * For the string type, numeric string values with optional units.
   * The value must be greater than or equal to 0. If the value is less than 0, the default value is used.
   * Unit: vp
   *
   * <p><strong>NOTE</strong>:
   * <br>This parameter cannot be set in percentage.
   * <br>If it is set to an invalid value, the default value is used.
   * </p>
   *
   * @type { ?(number | ResourceStr) }
   * @default 16
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 20 dynamic
   */
  badgeSize?: number | ResourceStr;

  /**
   * Color of the badge.
   *
   * @type { ?ResourceColor }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Color of the badge.
   *
   * @type { ?ResourceColor }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Color of the badge.
   *
   * @type { ?ResourceColor }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Badge color.
   *
   * @type { ?ResourceColor }
   * @default Color.Red
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  badgeColor?: ResourceColor;

  /**
   * Define the border color of the badge.
   *
   * @type { ?ResourceColor }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Border color of the background.
   *
   * @type { ?ResourceColor }
   * @default Color.Red
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  borderColor?: ResourceColor;

  /**
   * Define the border width of the badge.
   *
   * @type { ?Length }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Border width of the background.
   * This parameter cannot be set in percentage.
   * Unit: vp
   *
   * @type { ?Length }
   * @default 1
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  borderWidth?: Length;

  /**
   * Define the font weight of the badge.
   *
   * @type { ?(number | FontWeight | string) }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Define the font weight of the badge.
   *
   * @type { ?(number | FontWeight | string) }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Font weight of the text.
   * For the number type, the value ranges from 100 to 900, at an interval of 100. Default value: 400
   * A larger value indicates a heavier font weight.
   * For the string type, only strings that represent a number. Default value: FontWeight.Normal
   * 
   * <p><strong>NOTE</strong>:
   * <br>This parameter cannot be set in percentage.
   * </p>
   *
   * @type { ?(number | FontWeight | ResourceStr) }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  fontWeight?: number | FontWeight | ResourceStr;

  /**
   * Outer border color of the background.
   *
   * @type { ?ResourceColor }
   * @default Color.White
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  outerBorderColor?: ResourceColor;

  /**
   * Outer border width of the background.
   * This parameter cannot be set in percentage.
   * Unit: vp
   *
   * @type { ?LengthMetrics }
   * @default 0
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  outerBorderWidth?: LengthMetrics;

  /**
   * Enable auto avoidance for text in badge.
   *
   * @type { ?boolean }
   * @default true
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  enableAutoAvoidance?: boolean;
}

/**
 * Defines the base param of badge.
 *
 * @interface BadgeParam
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the base param of badge.
 *
 * @interface BadgeParam
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @since 9
 */
/**
 * Defines the base param of badge.
 *
 * @interface BadgeParam
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Provides basic parameters for creating a badge.
 *
 * @interface BadgeParam
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare interface BadgeParam {
  /**
   * Set the display position of the prompt point.
   *
   * @type { ?(BadgePosition) }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Set the display position of the prompt point.
   *
   * @type { ?(BadgePosition) }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Set the display position of the prompt point.
   *
   * @type { ?(BadgePosition | Position) }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Position to display the badge relative to the parent component.
   *
   * <p><strong>NOTE</strong>:
   * <br>With the Position type, percentage values are not supported.
   * <br>If an invalid value is set, the default value (0,0),
   * which indicates the upper left corner of the component, will be used.
   * <br>With the BadgePosition type, the position is mirrored based on the Direction property.
   * </p>
   *
   * @type { ?(BadgePosition | Position) }
   * @default BadgePosition.RightTop
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  position?: BadgePosition | Position;

  /**
   * Defines the style of the Badge component, including the text color, size, dot color, and size.
   *
   * @type { BadgeStyle }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Defines the style of the Badge component, including the text color, size, dot color, and size.
   *
   * @type { BadgeStyle }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Defines the style of the Badge component, including the text color, size, dot color, and size.
   *
   * @type { BadgeStyle }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Style of the badge, including the font color, font size, badge color, and badge size.
   *
   * @type { BadgeStyle }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  style: BadgeStyle;
}

/**
 * Defines the badge param with count and maxCount.
 *
 * @extends BadgeParam
 * @interface BadgeParamWithNumber
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the badge param with count and maxCount.
 *
 * @extends BadgeParam
 * @interface BadgeParamWithNumber
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @since 9
 */
/**
 * Defines the badge param with count and maxCount.
 *
 * @extends BadgeParam
 * @interface BadgeParamWithNumber
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Inherits from BadgeParam and has all attributes of BadgeParam.
 *
 * @extends BadgeParam
 * @interface BadgeParamWithNumber
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare interface BadgeParamWithNumber extends BadgeParam {
  /**
   * Set the number of reminder messages.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Set the number of reminder messages.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Set the number of reminder messages.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Number of notifications.
   *
   * <p><strong>NOTE</strong>:
   * <br>If the value is less than or equal to 0 and less than the value of maxCount, no badge is displayed.
   * <br>Value range: [-2147483648, 2147483647]
   * <br>If the value is out of the range,
   * it will be adjusted by adding or subtracting 4294967296 to bring it back within the range.
   * <br>If the value is not an integer, it is rounded off to the nearest integer.
   * </p>
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  count: number;

  /**
   * Maximum number of messages. If the number of messages exceeds the maximum, only maxCount+ is displayed.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Maximum number of messages. If the number of messages exceeds the maximum, only maxCount+ is displayed.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Maximum number of messages. If the number of messages exceeds the maximum, only maxCount+ is displayed.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Maximum number of notifications. When the maximum number is reached, only maxCount+ is displayed.
   *
   * <p><strong>NOTE</strong>:
   * <br>Value range: [-2147483648, 2147483647]
   * <br>If the value is out of the range,
   * it will be adjusted by adding or subtracting 4294967296 to bring it back within the range.
   * <br>If the value is not an integer, it is rounded off to the nearest integer.
   * </p>
   *
   * @type { ?number }
   * @default 99
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  maxCount?: number;
}

/**
 * Defines the badge param with string value.
 *
 * @extends BadgeParam
 * @interface BadgeParamWithString
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the badge param with string value.
 *
 * @extends BadgeParam
 * @interface BadgeParamWithString
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @since 9
 */
/**
 * Defines the badge param with string value.
 *
 * @extends BadgeParam
 * @interface BadgeParamWithString
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Inherits from BadgeParam and has all attributes of BadgeParam.
 *
 * @extends BadgeParam
 * @interface BadgeParamWithString
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare interface BadgeParamWithString extends BadgeParam {
  /**
   * Text string of the prompt content.
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Text string of the prompt content.
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Text string of the prompt content.
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Text string of the prompt content.
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
  /**
   * Prompt content.
   *
   * @type { ResourceStr }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 20 dynamic
   */
  value: ResourceStr;
}

/**
 * Defines Badge Component.
 *
 * @interface BadgeInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Badge Component.
 *
 * @interface BadgeInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @since 9
 */
/**
 * Defines Badge Component.
 *
 * @interface BadgeInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Defines Badge Component.
 *
 * @interface BadgeInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
interface BadgeInterface {
  /**
   * position: Set the display position of the prompt point.
   * maxCount: Maximum number of messages. If the number of messages exceeds the maximum, only maxCount+ is displayed.
   * count: Set the number of reminder messages.
   * style: You can set the style of the Badge component, including the text color, size, dot color, and size.
   *
   * @param { BadgeParamWithNumber } value
   * @returns { BadgeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * position: Set the display position of the prompt point.
   * maxCount: Maximum number of messages. If the number of messages exceeds the maximum, only maxCount+ is displayed.
   * count: Set the number of reminder messages.
   * style: You can set the style of the Badge component, including the text color, size, dot color, and size.
   *
   * @param { BadgeParamWithNumber } value
   * @returns { BadgeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * position: Set the display position of the prompt point.
   * maxCount: Maximum number of messages. If the number of messages exceeds the maximum, only maxCount+ is displayed.
   * count: Set the number of reminder messages.
   * style: You can set the style of the Badge component, including the text color, size, dot color, and size.
   *
   * @param { BadgeParamWithNumber } value
   * @returns { BadgeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * position: Set the display position of the prompt point.
   * maxCount: Maximum number of messages. If the number of messages exceeds the maximum, only maxCount+ is displayed.
   * count: Set the number of reminder messages.
   * style: You can set the style of the Badge component, including the text color, size, dot color, and size.
   *
   * @param { BadgeParamWithNumber } value
   * @returns { BadgeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  (value: BadgeParamWithNumber): BadgeAttribute;

  /**
   * value: Text string of the prompt content.
   * position: Set the display position of the prompt point.
   * maxCount: Maximum number of messages. If the number of messages exceeds the maximum, only maxCount+ is displayed.
   * style: You can set the style of the Badge component, including the text color, size, dot color, and size.
   *
   * @param { BadgeParamWithString } value
   * @returns { BadgeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * value: Text string of the prompt content.
   * position: Set the display position of the prompt point.
   * maxCount: Maximum number of messages. If the number of messages exceeds the maximum, only maxCount+ is displayed.
   * style: You can set the style of the Badge component, including the text color, size, dot color, and size.
   *
   * @param { BadgeParamWithString } value
   * @returns { BadgeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * value: Text string of the prompt content.
   * position: Set the display position of the prompt point.
   * maxCount: Maximum number of messages. If the number of messages exceeds the maximum, only maxCount+ is displayed.
   * style: You can set the style of the Badge component, including the text color, size, dot color, and size.
   *
   * @param { BadgeParamWithString } value
   * @returns { BadgeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * value: Text string of the prompt content.
   * position: Set the display position of the prompt point.
   * maxCount: Maximum number of messages. If the number of messages exceeds the maximum, only maxCount+ is displayed.
   * style: You can set the style of the Badge component, including the text color, size, dot color, and size.
   *
   * @param { BadgeParamWithString } value
   * @returns { BadgeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  (value: BadgeParamWithString): BadgeAttribute;
}

/**
 * Defines Badge Component attribute.
 *
 * @extends CommonMethod<BadgeAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Badge Component attribute.
 *
 * @extends CommonMethod<BadgeAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @since 9
 */
/**
 * Defines Badge Component attribute.
 *
 * @extends CommonMethod<BadgeAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Defines Badge Component attribute.
 *
 * @extends CommonMethod<BadgeAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare class BadgeAttribute extends CommonMethod<BadgeAttribute> {}

/**
 * Defines Badge Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Badge Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @since 9
 */
/**
 * Defines Badge Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Defines Badge Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare const Badge: BadgeInterface;

/**
 * Defines Badge Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Badge Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @since 9
 */
/**
 * Defines Badge Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Defines Badge Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare const BadgeInstance: BadgeAttribute;