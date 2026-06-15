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
 * Defines Marquee constructor options.
 *
 * Anonymous Object Rectification.
 * @interface MarqueeOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 18 dynamic
 */
interface MarqueeOptions {
  /**
   * Control whether the running lamp enters the playing state.
   *
   * @type { boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Control whether the running lamp enters the playing state.
   *
   * @type { boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Control whether the running lamp enters the playing state.
   *
   * @type { boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Control whether the running lamp enters the playing state.
   *
   * @type { boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
  /**
   * Control whether the running lamp enters the playing state.
   *
   * Anonymous Object Rectification.
   * 
   * <p><strong>NOTE</strong>:
   * <br><em>true</em>: Start scrolling.
   * <br><em>false</em>: Do not start scrolling.
   * <br>This parameter cannot be used to restart scrolling that has been completed.
   * </p>
   * 
   * @type { boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 18 dynamic
   */
  start: boolean;

  /**
   * Scroll animation text scroll step, when step is larger than the text width of Marquee, take the default value.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Scroll animation text scroll step, when step is larger than the text width of Marquee, take the default value.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Scroll animation text scroll step, when step is larger than the text width of Marquee, take the default value.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Scroll animation text scroll step, when step is larger than the text width of Marquee, take the default value.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
  /**
   * Scroll animation text scroll step, when step is larger than the text width of Marquee, take the default value.
   *
   * Anonymous Object Rectification.
   * 
   * <p><strong>NOTE</strong>:
   * <br>If the value is greater than the text width of the marquee, the default value is used.
   * </p>
   * 
   * @type { ?number } - The unit is vp.
   * @default 6
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 18 dynamic
   */
  step?: number;

  /**
   * Set the number of times the scroll is repeated, infinite loop if it is less than or equal to zero.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Set the number of times the scroll is repeated, infinite loop if it is less than or equal to zero.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Set the number of times the scroll is repeated, infinite loop if it is less than or equal to zero.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Set the number of times the scroll is repeated, infinite loop if it is less than or equal to zero.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
  /**
   * Set the number of times the scroll is repeated, infinite loop if it is less than or equal to zero.
   *
   * Anonymous Object Rectification.
   *
   * <p><strong>NOTE</strong>:
   * <br>If the value is less than or equal to 0, the marquee will scroll continuously.
   * <br>Regardless of the value, the marquee scrolls only once on an ArkTS widget.
   * </p>
   *
   * @type { ?number }
   * @default -1
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 18 dynamic
   */
  loop?: number;

  /**
   * Set text to scroll from the beginning or backward.
   *
   * @type { ?boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Set text to scroll from the beginning or backward.
   *
   * @type { ?boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Set text to scroll from the beginning or backward.
   *
   * @type { ?boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Set text to scroll from the beginning or backward.
   *
   * @type { ?boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
  /**
   * Set text to scroll from the beginning or backward.
   *
   * Anonymous Object Rectification.
   * @type { ?boolean }
   * @default true
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 18 dynamic
   */
  fromStart?: boolean;

  /**
   * Text that needs scrolling.
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Text that needs scrolling.
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Text that needs scrolling.
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Text that needs scrolling.
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
  /**
   * Text that needs scrolling.
   *
   * Anonymous Object Rectification.
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 18 dynamic
   */
  src: string;

  /**
   * The spacing between two rounds of marquee.
   *
   * Default value is marquee width.
   *
   * @type { ?LengthMetrics }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @form
   * @atomicservice
   * @since 23 dynamic
   */
  spacing?: LengthMetrics;

  /**
   * The waiting time between each round of the marquee.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @form
   * @atomicservice
   * @since 23 dynamic
   */
  delay?: number;
}

/**
 * Provides the interface for the marquee attributes.
 *
 * @interface MarqueeInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Provides the interface for the marquee attributes.
 *
 * @interface MarqueeInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @since 9
 */
/**
 * Provides the interface for the marquee attributes.
 *
 * @interface MarqueeInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Provides the interface for the marquee attributes.
 *
 * @interface MarqueeInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
interface MarqueeInterface {
  /**
   * Create marquee.
   *
   * @param { object } value
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Create marquee.
   *
   * @param { object } value
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Create marquee.
   *
   * @param { object } value
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Create marquee.
   *
   * @param { object } value
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
  /**
   * Create marquee.
   *
   * Anonymous Object Rectification.
   * @param { MarqueeOptions } options - Marquee options.
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 18 dynamic
   */
  (options: MarqueeOptions): MarqueeAttribute;
}

/**
 * Declares marquee properties.
 *
 * @extends CommonMethod<MarqueeAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Declares marquee properties.
 *
 * @extends CommonMethod<MarqueeAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @since 9
 */
/**
 * Declares marquee properties.
 *
 * @extends CommonMethod<MarqueeAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Declares marquee properties.
 *
 * @extends CommonMethod<MarqueeAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare class MarqueeAttribute extends CommonMethod<MarqueeAttribute> {
  /**
   * Set marquee font Color.
   *
   * @param { ResourceColor } value
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Set marquee font Color.
   *
   * @param { ResourceColor } value
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Set marquee font Color.
   *
   * @param { ResourceColor } value
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Set marquee font Color.
   *
   * @param { ResourceColor } value
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  fontColor(value: ResourceColor): MarqueeAttribute;

  /**
   * Set marquee font size.
   *
   * @param { Length } value
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Set marquee font size.
   *
   * @param { Length } value
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Set marquee font size.
   *
   * @param { Length } value
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Set marquee font size.
   *
   * <p><strong>NOTE</strong>:
   * <br>If fontSize is of the number type, the unit fp is used. The default font size is 16 fp.
   * <br>This parameter cannot be set in percentage.
   * </p>
   *
   * @param { Length } value
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  fontSize(value: Length): MarqueeAttribute;

  /**
   * Set marquee allow scale.
   *
   * @param { boolean } value
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Set marquee allow scale.
   *
   * @param { boolean } value
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Set marquee allow scale.
   *
   * @param { boolean } value
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Set marquee allow scale.
   *
   * <p><strong>NOTE</strong>:
   * <br>This parameter is effective only when fontSize is in fp units.
   * </p>
   *
   * @param { boolean } value - Default value is false.
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  allowScale(value: boolean): MarqueeAttribute;

  /**
   * Set marquee font weight.
   *
   * @param { number | FontWeight | string } value
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Set marquee font weight.
   *
   * @param { number | FontWeight | string } value
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Set marquee font weight.
   *
   * @param { number | FontWeight | string } value
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Set marquee font weight.
   *
   * <p><strong>NOTE</strong>:
   * <br>If the value is too large, the text may be clipped depending on the font.
   * <br>For the number type, the value range is [100, 900], at an interval of 100.
   * <br>The default value is 400.
   * <br>A larger value indicates a heavier font weight.
   * <br>For the string type, only strings that represent a number, for example, "400",
   * and the following enumerated values of FontWeight are supported: "bold", "bolder", "lighter", "regular", and "medium".
   * </p>
   *
   * @param { number | FontWeight | string } value - Default value is FontWeight.Normal.
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  fontWeight(value: number | FontWeight | string): MarqueeAttribute;

  /**
   * Set marquee font family.
   *
   * @param { string | Resource } value
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Set marquee font family.
   *
   * @param { string | Resource } value
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Set marquee font family.
   *
   * @param { string | Resource } value
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Set marquee font family.
   *
   * <p><strong>NOTE</strong>:
   * <br>Default font: 'HarmonyOS Sans'
   * <br>The 'HarmonyOS Sans' font and registered custom fonts are supported for applications.
   * <br>Only the 'HarmonyOS Sans' font is supported for widgets.
   * </p>
   *
   * @param { string | Resource } value
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  fontFamily(value: string | Resource): MarqueeAttribute;

  /**
   * Marquee scrolling strategy after text update.
   *
   * <p><strong>NOTE</strong>:
   * <br>This attribute takes effect when the marquee is in the playing state
   * and the text content width exceeds the width of the marquee component.
   * </p>
   *
   * @param { MarqueeUpdateStrategy } value - The scrolling strategy after text update.Default value is MarqueeUpdateStrategy.DEFAULT.
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  marqueeUpdateStrategy(value: MarqueeUpdateStrategy): MarqueeAttribute;

  /**
   * Called when scrolling starts.
   *
   * @param { function } event
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Called when scrolling starts.
   *
   * @param { function } event
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Called when scrolling starts.
   *
   * @param { function } event
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when scrolling starts.
   *
   * @param { function } event
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  onStart(event: () => void): MarqueeAttribute;

  /**
   * Called when scrolling to the bottom.
   *
   * @param { function } event
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Called when scrolling to the bottom.
   *
   * @param { function } event
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Called when scrolling to the bottom.
   *
   * @param { function } event
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when scrolling to the bottom.
   *
   * <p><strong>NOTE</strong>:
   * <br>This event will be triggered for multiple times if the loop attribute is not set to 1.
   * </p>
   *
   * @param { function } event
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  onBounce(event: () => void): MarqueeAttribute;

  /**
   * Called when scrolling is complete.
   *
   * @param { function } event
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Called when scrolling is complete.
   *
   * @param { function } event
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Called when scrolling is complete.
   *
   * @param { function } event
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when scrolling is complete.
   *
   * @param { function } event
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  onFinish(event: () => void): MarqueeAttribute;
  /**
   * Called when scrolling is stoped.
   *
   * <p><strong>NOTE</strong>:
   * <br>If event is set to undefined, the current event will be unbound.
   * </p>
   * 
   * @param { Callback<void> | undefined } event
   * @returns { MarqueeAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @form
   * @atomicservice
   * @since 26.0.0 dynamic
   */
  onStop(event: Callback<void> | undefined): MarqueeAttribute;
}

/**
 * Defines Marquee Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines Marquee Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @since 9
 */
/**
 * Defines Marquee Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Defines Marquee Component.
 * 
 * <p><strong>NOTE</strong>:
 * <br>To ensure that scrolling frame rates are not affected,
 * it is recommended that the number of Marquee components in a scroll container does not exceed four, or alternatively,
 * use the Text component's TextOverflow.MARQUEE as a substitute.
 * <br>The text is scrolled only when its width exceeds the width of the Marquee component.
 * </p>
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare const Marquee: MarqueeInterface;

/**
 * Defines Marquee Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines Marquee Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @since 9
 */
/**
 * Defines Marquee Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Defines Marquee Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare const MarqueeInstance: MarqueeAttribute;
