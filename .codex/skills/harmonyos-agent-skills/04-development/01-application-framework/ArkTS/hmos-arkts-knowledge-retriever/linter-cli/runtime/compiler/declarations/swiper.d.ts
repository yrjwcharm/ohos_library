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
 * Provides methods for switching components.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Provides methods for switching components.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Provides methods for switching components.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare class SwiperController {
  /**
   * constructor.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * constructor.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * constructor.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  constructor();

  /**
   * Called when the next child component is displayed.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the next child component is displayed.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when the next child component is displayed.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  showNext();

  /**
   * Called when the previous subcomponent is displayed.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the previous subcomponent is displayed.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when the previous subcomponent is displayed.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  showPrevious();

  /**
   * Controlling Swiper to change to the specified subcomponent.
   *
   * @param { number } index - the index of item to be redirected.
   * @param { boolean } useAnimation - If true, swipe to index item with animation. If false, swipe to index item without animation. 
   *      The default value is false.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 12 dynamic
   */
  changeIndex(index: number, useAnimation?: boolean);

  /**
   * Controlling Swiper to change to the specified subcomponent.
   *
   * @param { number } index - the index of item to be redirected.
   * @param { SwiperAnimationMode | boolean } [animationMode] - animation mode for changeIndex,
   * true is equivalent to SwiperAnimationMode.DEFAULT_ANIMATION, false is equivalent to SwiperAnimationMode.NO_ANIMATION
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 15 dynamic
   */
  changeIndex(index: number, animationMode?: SwiperAnimationMode | boolean);

  /**
   * Called when need to stop the swiper animation.
   *
   * @param { function } callback
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when need to stop the swiper animation.
   *
   * @param { function } callback
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when need to stop the swiper animation.
   *
   * @param { function } callback
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
  /**
   * Called when need to stop the swiper animation.
   * Anonymous Object Rectification
   *
   * @param { ?VoidCallback } callback
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 18 dynamic
   */
  finishAnimation(callback?: VoidCallback);

  /**
   * Called when need to preload specified child.
   *
   * @param { Optional<Array<number>> } indices - Indices of swiper child to be preloaded.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - Parameter invalid. Possible causes:
   * <br> 1. The parameter type is not Array<number>.
   * <br> 2. The parameter is an empty array.
   * <br> 3. The parameter contains an invalid index.
   * @throws { BusinessError } 100004 - Controller not bound to component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 18 dynamic
   */
  preloadItems(indices: Optional<Array<number>>): Promise<void>;

  /**
   * Start a fake drag.
   * Call 'fakeDragBy' to simulate the drag motion. Call 'stopFakeDrag' to complete the fake drag.
   * A fake drag can be interrupted by a real drag. If you need to ignore touch events and other
   *     user input during a fake drag, use 'disableSwipe(true)'.
   *
   * @returns { boolean } If the fake drag started successfully, return true.
   *     If the Swiper is not ready to start the fake drag, or a real or fake drag is already in progress, return false.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @form
   * @atomicservice
   * @since 23 dynamic
   */
  startFakeDrag(): boolean;

  /**
   * Fake drag by an offset.
   * The 'startFakeDrag' must be called first.
   *
   * @param { number } offset - Indicate the offset that needs to be scrolled. The unit is vp.
   * @returns { boolean } If not in a fake drag progress, or no offset is consumed, return false.
   *     If any offset is consumed, return true.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @form
   * @atomicservice
   * @since 23 dynamic
   */
  fakeDragBy(offset: number): boolean;

  /**
   * Stop a fake drag.
   *
   * @returns { boolean } If the fake drag stopped successfully, return true.
   *     If the Swiper is not ready to stop a fake drag, or no fake drag is in progress, return false.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @form
   * @atomicservice
   * @since 23 dynamic
   */
  stopFakeDrag(): boolean;

  /**
   * Get the fake drag state.
   *
   * @returns { boolean } If a fake drag is in progress return true, otherwise return false.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @form
   * @atomicservice
   * @since 23 dynamic
   */
  isFakeDragging(): boolean;
}

/**
 * Defines the indicator class.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Defines the indicator class.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare class Indicator<T> {
  /**
   * Set the indicator to the left.
   *
   * @param { Length } value - the indicator to the left.
   * @returns { T }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets the position of the navigation indicator relative to the left edge of the Swiper component.
   *
   * @param { Length } value - the indicator to the left.
   * @returns { T }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  left(value: Length): T;

  /**
   * Set the indicator to the top.
   *
   * @param { Length } value - the indicator to the top.
   * @returns { T }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets the position of the navigation indicator relative to the top edge of the Swiper component.
   *
   * @param { Length } value - the indicator to the top.
   * @returns { T }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  top(value: Length): T;

  /**
   * Set the indicator to the right.
   *
   * @param { Length } value - the indicator to the right.
   * @returns { T }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets the position of the navigation indicator relative to the right edge of the Swiper component.
   *
   * @param { Length } value - Position of the navigation indicator relative to the right edge of 
   * the Swiper component.
   * @returns { T }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  right(value: Length): T;

  /**
   * Set the indicator to the bottom.
   *
   * @param { Length } value - the indicator to the bottom.
   * @returns { T }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets the position of the navigation indicator relative to the bottom edge of the Swiper component.
   *
   * @param { Length } value - Position of the navigation indicator relative to the bottom edge of 
   * the Swiper component.
   * @returns { T }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  bottom(value: Length): T;

  /**
   * Sets the position of the navigation indicator relative to the bottom edge of the Swiper component.
   * You can also choose to ignore the size of the navigation indicator using the ignoreSize property.
   *
   * @param { LengthMetrics | Length } bottom - the offset of indicator to the bottom.
   * @param { boolean } ignoreSize - ignore the size of the indicator.Default value: false.
   * @returns { T }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 19 dynamic
   */
  bottom(bottom: LengthMetrics | Length, ignoreSize: boolean): T;

  /**
   * Sets the distance between the navigation indicator and the right edge (in right-to-left scripts) 
   * or the left edge (in left-to-right scripts) of the Swiper component.
   *
   * @param { LengthMetrics } value - the indicator to the right in LTR, indicator to the left in RTL.
   * Default value: 0.Unit: vp.
   * @returns { T }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 12 dynamic
   */
  start(value: LengthMetrics): T;

  /**
   * Sets the distance between the navigation indicator and the left edge (in right-to-left scripts)
   * or the right edge (in left-to-right scripts) of the Swiper component.
   *
   * @param { LengthMetrics } value - the indicator to the left in RTL, Set the indicator to the right in LTR.
   * Default value: 0.Unit: vp.
   * @returns { T }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 12 dynamic
   */
  end(value: LengthMetrics): T;   

  /**
   * DotIndicator class object.
   *
   * @returns { DotIndicator }
   * @static
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * DotIndicator class object.
   *
   * @returns { DotIndicator }
   * @static
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  static dot(): DotIndicator;

  /**
   * DigitIndicator class object.
   *
   * @returns { DigitIndicator }
   * @static
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * DigitIndicator class object.
   *
   * @returns { DigitIndicator }
   * @static
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  static digit(): DigitIndicator;
}

/**
 * Define DotIndicator, the indicator type is dot.
 *
 * @extends Indicator<DotIndicator>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Define DotIndicator, the indicator type is dot.
 *
 * @extends Indicator<DotIndicator>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare class DotIndicator extends Indicator<DotIndicator> {
  /**
   * Constructor.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Constructor.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  constructor();

  /**
   * Set the indicator item width.
   *
   * @param { Length } value - the indicator item width.
   * @returns { DotIndicator }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets the width of the dot-style navigation indicator.
   *
   * @param { Length } value - Width of the dot-style navigation indicator. Default value is 6vp.
   * This parameter cannot be set in percentage.
   * @returns { DotIndicator }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  itemWidth(value: Length): DotIndicator;

  /**
   * Set the indicator item height.
   *
   * @param { Length } value - the indicator item height.
   * @returns { DotIndicator }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets the height of the dot-style navigation indicator.
   *
   * @param { Length } value - Height of the dot-style navigation indicator. Default value is 6vp.
   * This parameter cannot be set in percentage.
   * @returns { DotIndicator }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  itemHeight(value: Length): DotIndicator;

  /**
   * Set the indicator item width when selected.
   *
   * @param { Length } value - the indicator item width when selected.
   * @returns { DotIndicator }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets the width of the selected dot in the dot-style navigation indicator.
   *
   * @param { Length } value - Width of the selected dot in the dot-style navigation indicator.
   * Default value is 6vp. This parameter cannot be set in percentage.
   * @returns { DotIndicator }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  selectedItemWidth(value: Length): DotIndicator;

  /**
   * Set the indicator item height when selected.
   *
   * @param { Length } value - the indicator item height when selected.
   * @returns { DotIndicator }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets the height of the selected dot in the dot-style navigation indicator.
   *
   * @param { Length } value - Height of the selected dot in the dot-style navigation indicator. 
   * Default value is 6vp. This parameter cannot be set in percentage.
   * @returns { DotIndicator }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  selectedItemHeight(value: Length): DotIndicator;

  /**
   * Setting indicator style mask.
   *
   * @param { boolean } value - the indicator item mask.
   * @returns { DotIndicator }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets whether to enable the mask for the dot-style navigation indicator.
   *
   * @param { boolean } value - Whether to enable the mask for the dot-style navigation indicator.
   * Default value is false.
   * @returns { DotIndicator }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  mask(value: boolean): DotIndicator;

  /**
   * Set the indicator color.
   *
   * @param { ResourceColor } value - the indicator item color.
   * @returns { DotIndicator }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets the color of the dot-style navigation indicator.
   *
   * @param { ResourceColor } value - Color of the dot-style navigation indicator.
   * Default value is #182431(10% opacity).
   * @returns { DotIndicator }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  color(value: ResourceColor): DotIndicator;

  /**
   * Set the navigation point color.
   *
   * @param { ResourceColor } value - the indicator item when selected.
   * @returns { DotIndicator }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets the color of the selected dot in the dot-style navigation indicator.
   *
   * @param { ResourceColor } value - Color of the selected dot in the dot-style navigation indicator.
   * Default value is #007DFF.
   * @returns { DotIndicator }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  selectedColor(value: ResourceColor): DotIndicator;

  /**
   * Sets the maximum number of navigation dots in the dot-style navigation indicator.
   *
   * @param { number } maxDisplayCount - Maximum number of navigation dots in the dot-style navigation indicator.
   * Value range: [6, 9].
   * @returns { DotIndicator } return the DotIndicator
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  maxDisplayCount(maxDisplayCount: number): DotIndicator;

  /**
   * Set the space between dots. 
   *
   * @param { LengthMetrics } space - the space between dots.Default value: 8.Unit: vp.
   * @returns { DotIndicator }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 19 dynamic
   */
  space(space: LengthMetrics): DotIndicator;
}

/**
 * Set Swiper column count adaptation.
 *
 * @typedef { object } SwiperAutoFill
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @since 10
 */
/**
 * Set Swiper column count adaptation.
 *
 * @typedef { object } SwiperAutoFill
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11
 */
/**
 * Set Swiper column count adaptation.
 *
 * @typedef SwiperAutoFill
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 18 dynamic
 */
declare interface SwiperAutoFill {
  /**
   * Set minSize size.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   * @form
   */
  /**
   * Set minSize size.
   *
   * @type { VP } - Minimum width of the element.Default value: 0.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 11 dynamic
   * @crossplatform
   * @form
   */
  minSize: VP;
}

/**
 * Define DigitIndicator, the indicator type is digit.
 *
 * @extends Indicator<DigitIndicator>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Define DigitIndicator, the indicator type is digit.
 *
 * @extends Indicator<DigitIndicator>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare class DigitIndicator extends Indicator<DigitIndicator> {
  /**
   * Constructor.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Constructor.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  constructor();

  /**
   * Set font color of the digital indicator.
   *
   * @param { ResourceColor } value - the indicator font color.
   * @returns { DigitIndicator }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets the font color of the digit-style navigation indicator.
   *
   * @param { ResourceColor } value - Font color of the digit-style navigation indicator. Default value is #ff182431.
   * @returns { DigitIndicator }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  fontColor(value: ResourceColor): DigitIndicator;

  /**
   * Set font color of the digital indicator when selected.
   *
   * @param { ResourceColor } value - the indicator font color when selected.
   * @returns { DigitIndicator }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets the font color of the selected digit in the digit-style navigation indicator.
   *
   * @param { ResourceColor } value - Font color of the selected digit in the digit-style navigation indicator.
   * Default value is #ff182431.
   * @returns { DigitIndicator }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  selectedFontColor(value: ResourceColor): DigitIndicator;

  /**
   * Set the digital indicator font (just support font size and weight).
   *
   * @param { Font } value - the indicator font size and weight.
   * @returns { DigitIndicator }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets the font style of the digit-style navigation indicator.
   * 
   * <p><strong>NOTE</strong>:
   * <br>Only the size and weight parameters in Font are adjustable.
   * <brSetting family and style has no effect.
   * </p>
   *
   * @param { Font } value - Font style of the digit-style navigation indicator.
   * Default value is { size: 14, weight: FontWeight.Normal }.
   * @returns { DigitIndicator }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  digitFont(value: Font): DigitIndicator;

  /**
   * Set the digital indicator font (just support font size and weight).
   *
   * @param { Font } value - the indicator font size and weight when selected.
   * @returns { DigitIndicator }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets the font style of the selected digit in the digit-style navigation indicator.
   *
   * @param { Font } value - Font style of the selected digit in the digit-style navigation indicator.
   * Default value is { size: 14, weight: FontWeight.Normal }.
   * @returns { DigitIndicator }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  selectedDigitFont(value: Font): DigitIndicator;
}

/**
 * Arrow object.
 *
 * @interface ArrowStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Arrow object.
 *
 * @interface ArrowStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare interface ArrowStyle {
  /**
   * Is show the arrow background or not.
   *
   * @type { ?boolean }
   * @default false
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Is show the arrow background or not.
   *
   * @type { ?boolean }
   * @default false
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  showBackground?: boolean;

  /**
   * When the indicator show, set the arrow position is side of the indicator or in the middle of content area.
   * The arrow is displayed on side of the indicator, if the value is false.
   *
   * @type { ?boolean }
   * @default false
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * When the indicator show, set the arrow position is side of the indicator or in the middle of content area.
   * The arrow is displayed on side of the indicator, if the value is false.
   *
   * @type { ?boolean }
   * @default false
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  isSidebarMiddle?: boolean;

  /**
   * The arrow background size.
   * The size of the arrow is three-quarters of the background size, when the background is displayed.
   *
   * @type { ?Length }
   * @default When isSidebarMiddle is false, the default value is 24vp, Otherwise,the default value is 32vp
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * The arrow background size.
   * The size of the arrow is three-quarters of the background size, when the background is displayed.
   *
   * @type { ?Length }
   * @default When isSidebarMiddle is false, the default value is 24vp, Otherwise,the default value is 32vp
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  backgroundSize?: Length;

  /**
   * The arrow background background color.
   *
   * @type { ?ResourceColor }
   * @default When isSidebarMiddle is false, the default value is #00000000, Otherwise,the default value is #19182431
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * The arrow background background color.
   *
   * @type { ?ResourceColor }
   * @default When isSidebarMiddle is false, the default value is #00000000, Otherwise, the default value is #19182431
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  backgroundColor?: ResourceColor;

  /**
   * The arrow size.
   * The arrow size can be set, when the background is not displayed.
   * The size of the arrow is three-quarters of the background size, when the background is displayed.
   *
   * @type { ?Length }
   * @default When isSidebarMiddle is false, the default value is 18vp, Otherwise, the default value is 24vp
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * The arrow size.
   * The arrow size can be set, when the background is not displayed.
   * The size of the arrow is three-quarters of the background size, when the background is displayed.
   *
   * @type { ?Length }
   * @default When isSidebarMiddle is false, the default value is 18vp, Otherwise, the default value is 24vp
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  arrowSize?: Length;

  /**
   * The arrow color.
   *
   * @type { ?ResourceColor }
   * @default #182431
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * The arrow color.
   *
   * @type { ?ResourceColor }
   * @default #182431
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  arrowColor?: ResourceColor;
}

/**
 * Declare the size of the swiper on the spindle.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Declare the size of the swiper on the spindle.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Declare the size of the swiper on the spindle.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare enum SwiperDisplayMode {
  /**
   * Carousel map extension.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 7 dynamiconly
   * @deprecated since 10
   * @useinstead SwiperDisplayMode#STRETCH
   */
  Stretch,

  /**
   * The rotation chart is self linear.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 7 dynamiconly
   * @deprecated since 10
   * @useinstead SwiperDisplayMode#AUTO_LINEAR
   */
  AutoLinear,

  /**
   * Carousel map extension.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Carousel map extension.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  STRETCH,

  /**
   * The rotation chart is self linear.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * The rotation chart is self linear.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamiconly
   * @deprecated since 12
   * @useinstead Scroller#scrollTo
   */
  AUTO_LINEAR,
}

/**
 * Provides an interface for sliding containers.
 *
 * @interface SwiperInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Provides an interface for sliding containers.
 *
 * @interface SwiperInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Provides an interface for sliding containers.
 *
 * @interface SwiperInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
interface SwiperInterface {
  /**
   * Called when a sliding container is set.
   *
   * @param { SwiperController } controller
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when a sliding container is set.
   *
   * @param { SwiperController } controller
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when a sliding container is set.
   *
   * @param { SwiperController } controller
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  (controller?: SwiperController): SwiperAttribute;
}

/**
 * Setting indicator style navigation.
 *
 * @interface IndicatorStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8 dynamiconly
 * @deprecated since 10
 * @useinstead DotIndicator
 */
declare interface IndicatorStyle {
  /**
   * Set the indicator to the left.
   *
   * @type { ?Length }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8 dynamiconly
   * @deprecated since 10
   * @useinstead DotIndicator#left
   */
  left?: Length;

  /**
   * Set the indicator to the top.
   *
   * @type { ?Length }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8 dynamiconly
   * @deprecated since 10
   * @useinstead DotIndicator#top
   */
  top?: Length;

  /**
   * Set the indicator to the right.
   *
   * @type { ?Length }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8 dynamiconly
   * @deprecated since 10
   * @useinstead DotIndicator#right
   */
  right?: Length;

  /**
   * Set the indicator to the bottom.
   *
   * @type { ?Length }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8 dynamiconly
   * @deprecated since 10
   * @useinstead DotIndicator#bottom
   */
  bottom?: Length;

  /**
   * Set the indicator size.
   *
   * @type { ?Length }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8 dynamiconly
   * @deprecated since 10
   * @useinstead DotIndicator
   */
  size?: Length;

  /**
   * Setting indicator style mask.
   *
   * @type { ?boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8 dynamiconly
   * @deprecated since 10
   * @useinstead DotIndicator#mask
   */
  mask?: boolean;

  /**
   * Set the indicator color.
   *
   * @type { ?ResourceColor }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8 dynamiconly
   * @deprecated since 10
   * @useinstead DotIndicator#color
   */
  color?: ResourceColor;

  /**
   * Set the navigation point color.
   *
   * @type { ?ResourceColor }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8 dynamiconly
   * @deprecated since 10
   * @useinstead DotIndicator#selectColor
   */
  selectedColor?: ResourceColor;
}

/**
 * Provides an interface for swiper animation.
 *
 * @interface SwiperAnimationEvent
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provides an interface for swiper animation.
 *
 * @interface SwiperAnimationEvent
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare interface SwiperAnimationEvent {
  /**
   * Offset of the current page to the start position of the swiper main axis. The unit is vp.
   *
   * @type { number }
   * @default 0.0 vp
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Offset of the current page to the start position of the swiper main axis. The unit is vp.
   *
   * @type { number }
   * @default 0.0 vp
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  currentOffset: number;

  /**
   * Offset of the target page to the start position of the swiper main axis. The unit is vp.
   *
   * @type { number }
   * @default 0.0 vp
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Offset of the target page to the start position of the swiper main axis. The unit is vp.
   *
   * @type { number }
   * @default 0.0 vp
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  targetOffset: number;

  /**
   * Start speed of the page-turning animation. The unit is vp/s.
   *
   * @type { number }
   * @default 0.0 vp/s
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Start speed of the page-turning animation. The unit is vp/s.
   *
   * @type { number }
   * @default 0.0 vp/s
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  velocity: number;
}

/**
 * Defines the properties for controlling the autoplay behavior.
 *
 * @interface AutoPlayOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 18 dynamic
 */
declare interface AutoPlayOptions {
  /**
   * Whether the autoplay stops immediately when the component is touched.
   *
   * @type { boolean }
   * @default true
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 18 dynamic
   */
  stopWhenTouched: boolean;
}

/**
 * Defines the properties for controlling the cached count behavior.
 *
 * @interface CachedCountOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @stagemodelonly
 * @crossplatform
 * @form
 * @atomicservice
 * @since 24 dynamic
 */
declare interface CachedCountOptions {
  /**
   * Whether the cached nodes within the range rendered without being added to the render tree.
   *
   * @type { ?boolean }
   * @default false
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @form
   * @atomicservice
   * @since 24 dynamic
   */
  isShown?: boolean;
  /**
   * Whether cachedCount is independent of group calculation.
   *
   * <p><strong>NOTE</strong>:
   * <br>When set to true, cachedCount is calculated by actual child component count,
   * independent of displayCount group calculation.
   * <br>When swipeByGroup is enabled and this is false, cachedCount is calculated by group.
   * </p>
   *
   * @type { ?boolean }
   * @default false
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @form
   * @atomicservice
   * @since 24 dynamic
   */
  independent?: boolean;
}

/**
 * Swiper nested scroll nested mode

 * @enum { number } SwiperNestedScrollMode
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare enum SwiperNestedScrollMode {
  /**
   * The scrolling is contained within the Swiper component, and no scroll chaining occurs, that is,
   * the parent container does not scroll when the component scrolling reaches the boundary.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  SELF_ONLY = 0,

  /**
   * The Swiper component scrolls first, and when it hits the boundary, the parent container scrolls.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  SELF_FIRST = 1,
}

/**
 * Declare the animation mode of SwiperController's changeIndex method.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 15 dynamic
 */
declare enum SwiperAnimationMode {
  /**
   * Jump to target index without animation.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 15 dynamic
   */
  NO_ANIMATION = 0,

  /**
   * Scroll to target index with animation.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 15 dynamic
   */
  DEFAULT_ANIMATION = 1,

  /**
   * Jump to some index near the target index without animation,
   * then scroll to target index with animation.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 15 dynamic
   */
  FAST_ANIMATION = 2,
}

/**
 * Defines a swiper callback when onAnimationStart.
 *
 * @typedef { function } OnSwiperAnimationStartCallback
 * @param { number } index - The index value of the swiper page that when animation start.
 * @param { number } targetIndex - The target index value of the swiper page that when animation start.
 * @param { SwiperAnimationEvent } extraInfo - The extra callback info.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 18 dynamic
 */
declare type OnSwiperAnimationStartCallback = (index: number, targetIndex: number, extraInfo: SwiperAnimationEvent) => void;

/**
 * Defines a swiper callback when onAnimationEnd.
 *
 * @typedef { function } OnSwiperAnimationEndCallback
 * @param { number } index - The index value of the swiper page that when animation end.
 * @param { SwiperAnimationEvent } extraInfo - The extra callback info.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 18 dynamic
 */
declare type OnSwiperAnimationEndCallback = (index: number, extraInfo: SwiperAnimationEvent) => void;

/**
 * Defines a swiper callback when onGestureSwipe.
 *
 * @typedef { function } OnSwiperGestureSwipeCallback
 * @param { number } index - The index value of the swiper page before gesture swipe.
 * @param { SwiperAnimationEvent } extraInfo - The extra callback info.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
declare type OnSwiperGestureSwipeCallback = (index: number, extraInfo: SwiperAnimationEvent) => void;

/**
 * Defines the swiper attribute functions.
 *
 * @extends CommonMethod<SwiperAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the swiper attribute functions.
 *
 * @extends CommonMethod<SwiperAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Defines the swiper attribute functions.
 *
 * @extends CommonMethod<SwiperAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare class SwiperAttribute extends CommonMethod<SwiperAttribute> {
  /**
   * Called when the index value of the displayed subcomponent is set in the container.
   *
   * @param { number } value
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the index value of the displayed subcomponent is set in the container.
   *
   * @param { number } value
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets the index of the child component currently displayed in the container.
   *
   * @param { number } value - Index of the child component currently displayed in the container. Default value is 0.
   * If the value is less than 0 or greater than or equal to the number of child components,
   * the default value 0 is used.
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  index(value: number): SwiperAttribute;

  /**
   * Called when setting whether the subcomponent plays automatically.
   *
   * @param { boolean } value
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when setting whether the subcomponent plays automatically.
   *
   * @param { boolean } value
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets whether to enable automatic playback for child component switching.
   * 
   * <p><strong>NOTE</strong>:
   * <br>If loop is set to false, the playback stops when the last page is reached.
   * <br>The playback continues when the page is not the last page after a swipe gesture. 
   * <br>If the Swiper component becomes invisible, the playback stops.
   * </p>
   *
   * @param { boolean } value - Whether to enable automatic playback for child component switching.
   * Default value is false.
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  autoPlay(value: boolean): SwiperAttribute;

  /**
   * Sets whether child components automatically play when the screen is pressed by fingers, a mouse device,
   * or other input devices.
   * 
   * <p><strong>NOTE</strong>:
   * <br>If loop is set to false, the playback stops when the last page is reached.
   * <br>The playback continues when the page is not the last page after a swipe gesture. 
   * <br>If the Swiper component becomes invisible, the playback stops.
   * </p>
   *
   * @param { boolean } autoPlay - Whether to enable automatic playback for child component switching.
   * Default value is false.
   * @param { AutoPlayOptions } options - Whether child components stop autoplay when the screen is pressed by fingers,
   * a mouse device, or other input devices. Default value is { stopWhenTouched: true }.
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 18 dynamic
   */
  autoPlay(autoPlay: boolean, options: AutoPlayOptions): SwiperAttribute;

  /**
   * Called when the time interval for automatic playback is set.
   *
   * @param { number } value
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the time interval for automatic playback is set.
   *
   * @param { number } value
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets the interval for automatic playback.
   *
   * @param { number } value - Interval for automatic playback. Default value is 3000, the unit is ms.
   * Minimum value is 0ms. If a value less than 0 is set, the default value is used.
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  interval(value: number): SwiperAttribute;

  /**
   * Called when you set whether the navigation point indicator is enabled.
   *
   * @param { boolean } value - show indicator of the swiper indicator.
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Set indicator is enabled, or set type style.
   *
   * @param { DotIndicator | DigitIndicator | boolean } value - the style value or show indicator of the swiper indicator.
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets the style of the navigation indicator.
   *
   * @param { DotIndicator | DigitIndicator | boolean } value - Style of the navigation indicator.
   * Default value is true, default style is DotIndicator.
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  indicator(value: DotIndicator | DigitIndicator | boolean): SwiperAttribute;

  /**
   * Sets the navigation indicator for the component.
   *
   * @param { IndicatorComponentController | DotIndicator | DigitIndicator | boolean } indicator -
   * Style of the navigation indicator. Default value is true, default style is DotIndicator.
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 15 dynamic
   */
  indicator(indicator: IndicatorComponentController | DotIndicator | DigitIndicator | boolean): SwiperAttribute;

  /**
   * Set arrow is enabled, or set the arrow style.
   *
   * @param { ArrowStyle | boolean } value - arrow is displayed or set the arrow style.
   * @param { boolean } isHoverShow - arrow is display when mouse hover in indicator hotspot.
   * @returns { SwiperAttribute } return the component attribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Sets the arrow style of the navigation indicator.
   *
   * @param { ArrowStyle | boolean } value - arrow is displayed or set the arrow style. Default value is false.
   * @param { boolean } isHoverShow - Whether to show the arrow only when the mouse pointer hovers 
   * over the navigation indicator. Default value is false.
   * @returns { SwiperAttribute } return the component attribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  displayArrow(value: ArrowStyle | boolean, isHoverShow?: boolean): SwiperAttribute;

  /**
   * Called when setting whether to turn on cyclic sliding.
   *
   * @param { boolean } value
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when setting whether to turn on cyclic sliding.
   *
   * @param { boolean } value
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets whether to enable loop playback.
   *
   * @param { boolean } value - Whether to enable loop playback. Default value is true.
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  loop(value: boolean): SwiperAttribute;

  /**
   * Called when the animation duration of the switch is set.
   *
   * @param { number } value
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the animation duration of the switch is set.
   *
   * @param { number } value
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the duration of the animation for child component switching.
   *
   * @param { number } value - Duration of the autoplay for child component switching. Default value is 400,
   * the unit is ms. Minimum value is 0ms. If a value less than 0 is set, the default value is used.
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  duration(value: number): SwiperAttribute;

  /**
   * Called when setting whether to slide vertically.
   *
   * @param { boolean } value
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when setting whether to slide vertically.
   *
   * @param { boolean } value
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets whether vertical swiping is used.
   *
   * @param { boolean } value - Whether vertical swiping is used. Default value is false.
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  vertical(value: boolean): SwiperAttribute;

  /**
   * Sets the space between child components.
   *
   * @param { number | string } value
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Sets the space between child components.
   *
   * @param { number | string } value
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets the space between child components.
   * 
   * <p><strong>NOTE</strong>:
   * <br>If the type is number, the default unit is vp. 
   * <br>If the type is string, the pixel unit must be explicitly specified, for example, '10px'; 
   * if the unit is not specified, for example, '10', the default unit vp is used.
   * </p>
   *
   * @param { number | string } value - Space between child components. Default value is 0,
   * Minimum value is 0. If a value less than 0 is set, the default value is used.
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  itemSpace(value: number | string): SwiperAttribute;

  /**
   * Called when setting the size of the swiper container on the spindle.
   *
   * @param { SwiperDisplayMode } value
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when setting the size of the swiper container on the spindle.
   *
   * @param { SwiperDisplayMode } value
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets the mode in which elements are displayed along the main axis.
   * This API takes effect only when displayCount is not set.
   *
   * @param { SwiperDisplayMode } value - Mode in which elements are displayed along the main axis.
   * Default value is SwiperDisplayMode.STRETCH.
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  displayMode(value: SwiperDisplayMode): SwiperAttribute;

  /**
   * Sets the number of child components to be preloaded(cached).
   *
   * @param { number } value
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Sets the number of child components to be preloaded(cached).
   *
   * @param { number } value
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets the number of child components to be preloaded(cached).
   * 
   * <p><strong>NOTE</strong>:
   * <br>Which are needed for the specific number of pages immediately before and after the current page.
   * <br>If swipeByGroup in displayCount is set to true, child components are cached by group.
   * </p>
   *
   * @param { number } value - Number of child components to be preloaded (cached). Default value is 1. 
   * Minimum value is 0. If a value less than 0 is set, the default value is used.
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  cachedCount(value: number): SwiperAttribute;

  /**
   * Sets the number of child components to be preloaded(cached).
   *
   * @param { number } count - Number of child components to be preloaded (cached).Default value is 1.
   * Minimum value is 0. If a value less than 0 is set, the default value is used.
   * @param { boolean } isShown - Whether the cached nodes within the range rendered 
   * without being added to the render tree. Default value is false.
   * @returns { SwiperAttribute } the attribute of the swiper.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 15 dynamic
   */
  cachedCount(count: number, isShown: boolean): SwiperAttribute;

  /**
   * Sets the number of child components to be preloaded(cached).
   *
   * <p><strong>NOTE</strong>:
   * <br>When options.independent is set to true, cachedCount is calculated by actual child component count,
   * independent of displayCount group calculation.
   * </p>
   *
   * @param { number } count - Number of child components to be preloaded (cached).
   *     <br>Value range:[0,+∞)
   *     <br>The default value is 1.
   * @param { CachedCountOptions } options - Options for controlling cached count behavior.
   * @returns { SwiperAttribute } the attribute of the swiper.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @form
   * @atomicservice
   * @since 24 dynamic
   */
  cachedCount(count: number, options: CachedCountOptions): SwiperAttribute;

  /**
   * Sets the number of elements to display per page.
   *
   * @param { number | string } value
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Sets the number of elements to display per page.
   *
   * @param { number | string | SwiperAutoFill } value
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets the number of elements to display per page.
   *
   * If swipeByGroup is set to true:
   * 1、All sub-items are grouped from index 0.
   * 2、The number of sub-items in each group is the value of displayCount.
   * 3、If the number of sub-items in the last group is less than displayCount, placeholder items are added to supplement the number of last group.
   * 4、Placeholder items do not display any content and are only used as placeholders.
   * 5、When turning pages, turn pages by group.
   *
   * @param { number | string | SwiperAutoFill } value - Number of elements to display per page. Default value is 1.
   * @param { boolean } [swipeByGroup] - Whether to turn pages by group. Default value is false.
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  displayCount(value: number | string | SwiperAutoFill, swipeByGroup?: boolean): SwiperAttribute;

  /**
   * Sets the number of elements to display per page.
   *
   * If swipeByGroup is set to true:
   * 1、All sub-items are grouped from index 0.
   * 2、The number of sub-items in each group is the value of displayCount.
   * 3、If the number of sub-items in the last group is less than displayCount, placeholder items are added to supplement
   * the number of last group.
   * 4、Placeholder items do not display any content and are only used as placeholders.
   * 5、When turning pages, turn pages by group.
   *
   * @param { number | string | SwiperAutoFill | ItemFillPolicy } value
   * @param { boolean } [swipeByGroup] - if swipe by group.
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 22 dynamic
   */
  displayCount(value: number | string | SwiperAutoFill | ItemFillPolicy, swipeByGroup?: boolean): SwiperAttribute;

  /**
   * Invoked when setting the sliding effect
   *
   * @param { EdgeEffect } value
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Invoked when setting the sliding effect
   *
   * @param { EdgeEffect } value
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets the effect used when the component is at one of the edges.
   * 
   * <p><strong>NOTE</strong>:
   * <br>This attribute takes effect when loop is set to false.
   * </p>
   *
   * @param { EdgeEffect } value - Effect used when the component is at one of the edges.
   * Default value is EdgeEffect.Spring.
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  effectMode(value: EdgeEffect): SwiperAttribute;

  /**
   * Sets whether to disable the swipe feature
   *
   * @param { boolean } value
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Sets whether to disable the swipe feature
   *
   * @param { boolean } value
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets whether to disable the swipe feature.
   *
   * @param { boolean } value - Whether to disable the swipe feature. Default value is false.
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  disableSwipe(value: boolean): SwiperAttribute;

  /**
   * Sets the animation curve
   *
   * @param { Curve | string } value
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Sets the animation curve
   * Curve is an enumeration type for common curves
   * ICurve is a curve object
   *
   * @param { Curve | string | ICurve } value
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets the animation curve.
   * Curve is an enumeration type for common curves
   * ICurve is a curve object
   *
   * @param { Curve | string | ICurve } value - Animation curve.
   * Default value is interpolatingSpring(-1, 1, 328, 34).
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  curve(value: Curve | string | ICurve): SwiperAttribute;

  /**
   * Called when the index value changes.
   *
   * @param { function } event
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the index value changes.
   *
   * @param { function } event
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when the index value changes.
   *
   * @param { function } event
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when the index of the currently displayed child component changes.
   * Anonymous Object Rectification
   *
   * @param { Callback<number> } event
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 18 dynamic
   */
  onChange(event: Callback<number>): SwiperAttribute;

  /**
   * Called when a new index becomes selected. Animation is not necessarily complete.
   *
   * @param { Callback<number> } event - callback to notify which index has been selected
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 18 dynamic
   */
  onSelected(event: Callback<number>): SwiperAttribute;

  /**
   * Setting indicator style navigation.
   *
   * @param { IndicatorStyle } value
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8 dynamiconly
   * @deprecated since 10
   * @useinstead indicator
   */
  indicatorStyle(value?: IndicatorStyle): SwiperAttribute;

  /**
   * The previous margin which can be used to expose a small portion of the previous item.
   *
   * @param { Length } value - The length of previous margin.
   * @returns { SwiperAttribute } The attribute of the swiper.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * The previous margin which can be used to expose a small portion of the previous item.
   *
   * @param { Length } value - The length of previous margin.
   * @returns { SwiperAttribute } The attribute of the swiper.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Sets the previous margin, used to reveal a small part of the previous item.
   * When the previous item is empty, do not display blank space.
   * 
   * <p><strong>NOTE</strong>:
   * <br>This attribute is effective only when the layout mode of the child components in Swiper is set to stretch,
   * which mainly includes two scenarios: 1. displayMode is set to SwiperDisplayMode.STRETCH;
   * 2. displayCount is assigned a numeric value.
   * <br>When the main axis runs horizontally and either the next margin or previous margin is greater than
   * the measured width of the child component, neither the next margin nor previous margin is displayed.
   * <br>When the main axis runs vertically and either the next margin or previous margin is greater than
   * the measured height of the child component, neither the next margin nor previous margin is displayed.
   * </p>
   *
   * @param { Length } value - The length of previous margin.This attribute cannot be set in percentage.
   * Default value is 0.
   * @param { boolean } [ignoreBlank] - Whether to hide(ignore) the previous margin on the first page in non-loop scenarios.
   * Default value is false.
   * @returns { SwiperAttribute } The attribute of the swiper.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  prevMargin(value: Length, ignoreBlank?: boolean): SwiperAttribute;

  /**
   * The next margin which can be used to expose a small portion of the latter item.
   *
   * @param { Length } value - The length of next margin.
   * @returns { SwiperAttribute } The attribute of the swiper.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * The next margin which can be used to expose a small portion of the latter item.
   *
   * @param { Length } value - The length of next margin.
   * @returns { SwiperAttribute } The attribute of the swiper.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Sets the next margin, used to reveal a small part of the next item.
   * When the next item is empty, do not display blank space.
   * 
   * <p><strong>NOTE</strong>:
   * <br>This attribute is effective only when the layout mode of the child components in Swiper is set to stretch,
   * which mainly includes two scenarios: 1. displayMode is set to SwiperDisplayMode.STRETCH; 
   * 2. displayCount is assigned a numeric value.
   * <br>When the main axis runs horizontally and either the next margin or previous margin is greater than 
   * the measured width of the child component, neither the next margin nor previous margin is displayed.
   * <br>When the main axis runs vertically and either the next margin or previous margin is greater than
   * the measured height of the child component, neither the next margin nor previous margin is displayed.
   * </p>
   *
   * @param { Length } value - The length of next margin. This attribute cannot be set in percentage.
   * Default value is 0.
   * @param { boolean } [ignoreBlank] - Whether to hide(ignore) the next margin on the last page in non-loop scenarios.
   * Default value is false.
   * @returns { SwiperAttribute } The attribute of the swiper.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  nextMargin(value: Length, ignoreBlank?: boolean): SwiperAttribute;

  /**
   * Called when a new index becomes unselected. Animation is not necessarily complete.
   *
   * @param { Callback<number> } event - callback to notify which index has been unselected
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 18 dynamic
   */
  onUnselected(event: Callback<number>): SwiperAttribute;

  /**
   * Called when the scroll state of the swiper changed.
   *
   * @param { Callback<ScrollState> } event - callback to notify the change of the scroll state.
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 20 dynamic
   */
  onScrollStateChanged(event: Callback<ScrollState>): SwiperAttribute

  /**
   * Called when the swiper animation start.
   *
   * @param { function } event - the index value of the swiper page that when animation start.
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Called when the swiper animation start.
   *
   * @param { function } event
   * "index": the index value of the swiper page that when animation start.
   * "targetIndex": the target index value of the swiper page that when animation start.
   * "extraInfo": the extra callback info.
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when the swiper animation start.
   *
   * @param { function } event
   * "index": the index value of the swiper page that when animation start.
   * "targetIndex": the target index value of the swiper page that when animation start.
   * "extraInfo": the extra callback info.
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when the switching animation starts.
   * Anonymous Object Rectification
   *
   * @param { OnSwiperAnimationStartCallback } event
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 18 dynamic
   */
  onAnimationStart(event: OnSwiperAnimationStartCallback): SwiperAttribute;

  /**
   * Called when the swiper animation end.
   *
   * @param { function } event - the index value of the swiper page that when animation end.
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Called when the swiper animation end.
   *
   * @param { function } event
   * "index": the index value of the swiper page that when animation end.
   * "extraInfo": the extra callback info.
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when the swiper animation end.
   *
   * @param { function } event
   * "index": the index value of the swiper page that when animation end.
   * "extraInfo": the extra callback info.
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when the switching animation ends.
   * Anonymous Object Rectification
   *
   * @param { OnSwiperAnimationEndCallback } event
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 18 dynamic
   */
  onAnimationEnd(event: OnSwiperAnimationEndCallback): SwiperAttribute;

  /**
   * Called when the swiper swipe with the gesture.
   *
   * @param { function } event
   * "index": the index value of the swiper page before gesture swipe.
   * "extraInfo": the extra callback info.
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the swiper swipe with the gesture.
   *
   * @param { function } event
   * "index": the index value of the swiper page before gesture swipe.
   * "extraInfo": the extra callback info.
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered on a frame-by-frame basis when the page is turned by a swipe.
   * Anonymous Object Rectification
   *
   * @param { OnSwiperGestureSwipeCallback } event
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onGestureSwipe(event: OnSwiperGestureSwipeCallback): SwiperAttribute;

  /**
   * Sets the nested scrolling mode of the Swiper component and its parent container. 
   * 
   * <p><strong>NOTE</strong>:
   * <br>When loop is set to true, the Swiper component has no edge effect and does not trigger 
   * nested scrolling of its parent container.
   * </p>
   * 
   *
   * @param { SwiperNestedScrollMode } value - mode for nested scrolling.
   * Default value is SwiperNestedScrollMode.SELF_ONLY.
   * @returns { SwiperAttribute } the attribute of the swiper.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  nestedScroll(value: SwiperNestedScrollMode): SwiperAttribute;

  /**
   * Defines a custom switching animation.
   * 
   * <p><strong>NOTE</strong>:
   * <br>1. This API does not work when prevMargin and nextMargin are set in such a way that
   * the Swiper frontend and backend display the same page during loop playback.
   * <br>2. During page scrolling, the ContentDidScrollCallback callback is invoked for all pages in the viewport
   * on a frame-by-frame basis. 
   * <br>3. When the swipeByGroup parameter of the displayCount attribute is set to true, 
   * the callback is invoked for all pages in a group if any page in the group is within the viewport.
   * </p>
   *
   * @param { SwiperContentAnimatedTransition } transition - custom content transition animation.
   * @returns { SwiperAttribute } the attribute of the swiper.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  customContentTransition(transition: SwiperContentAnimatedTransition): SwiperAttribute;

  /**
   * Triggered when content in the Swiper component scrolls.
   * 
   * <p><strong>NOTE</strong>:
   * <br>1. This API does not work when prevMargin and nextMargin are set in such a way that
   * the Swiper frontend and backend display the same page during loop playback.
   * <br>2. During page scrolling, the ContentDidScrollCallback callback is invoked for all pages in the viewport
   * on a frame-by-frame basis. 
   * <br>3. When the swipeByGroup parameter of the displayCount** attribute is set to true, 
   * the callback is invoked for all pages in a group if any page in the group is within the viewport.
   * </p>
   *
   * @param { ContentDidScrollCallback } handler - callback of scroll,
   * selectedIndex is the index value of the swiper content selected before animation start.
   * index is the index value of the swiper content.
   * position is the moving ratio of the swiper content from the start position of the swiper main axis.
   * mainAxisLength is the swiper main axis length for calculating position.
   * @returns { SwiperAttribute } the attribute of the swiper.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onContentDidScroll(handler: ContentDidScrollCallback): SwiperAttribute;

  /**
   * Sets whether the navigation indicator is interactive.
   *
   * @param { boolean } value - Whether the navigation indicator is interactive. Default value is true.
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  indicatorInteractive(value: boolean): SwiperAttribute;

  /**
   * Setting page flip mode on mouse wheel event.
   *
   * @param { Optional<PageFlipMode> } mode - page flip mode on mouse wheel event. The default value is PageFlipMode.CONTINUOUS.
   * @returns { SwiperAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 15 dynamic
   */
  pageFlipMode(mode: Optional<PageFlipMode>): SwiperAttribute;

  /**
   * Called when the swiper content will scroll.
   *
   * @param { ContentWillScrollCallback } handler - callback of will scroll.
   * @returns { SwiperAttribute } the attribute of the swiper.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 15 dynamic
   */
  onContentWillScroll(handler: ContentWillScrollCallback): SwiperAttribute;

  /**
   * Set maintain visible content position.
   *
   * @param { boolean } enabled - maintain visible content position.
   * Default value is false.
   * @returns { SwiperAttribute } the attribute of swiper.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 20 dynamic
   */
  maintainVisibleContentPosition(enabled: boolean): SwiperAttribute;
}

/**
 * Defines the swiper content animated transition options.
 *
 * @interface SwiperContentAnimatedTransition
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface SwiperContentAnimatedTransition {
  /**
   * Defines the timeout of custom content transition animation after the page is moved out of the swiper. The unit is ms.
   * If SwiperContentTransitionProxy.finishTransition() is not invoked, use the timeout as animation end time.
   *
   * @type { ?number }
   * @default 0 ms
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  timeout?: number;

  /**
   * Called when custom content transition animation start.
   *
   * @type { Callback<SwiperContentTransitionProxy> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  transition: Callback<SwiperContentTransitionProxy>;
}

/**
 * The proxy of SwiperContentAnimatedTransition.
 *
 * @interface SwiperContentTransitionProxy
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface SwiperContentTransitionProxy {
  /**
   * the index value of the swiper content selected before animation start.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  selectedIndex: number;

  /**
   * The index value of the swiper content.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  index: number;

  /**
   * the moving ratio of the swiper content from the start position of the swiper main axis.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  position: number;

  /**
   * the swiper main axis length for calculating position.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  mainAxisLength: number;

  /**
   * Notifies Swiper page the custom content transition animation is complete.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  finishTransition(): void;
}

/**
 * The result of swiper ContentWillScrollCallback.
 *
 * @interface SwiperContentWillScrollResult
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 15 dynamic
 */
declare interface SwiperContentWillScrollResult {
  /**
   * the index value of the current child page.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 15 dynamic
   */
  currentIndex: number;

  /**
   * the index value of the child page that will display.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 15 dynamic
   */
  comingIndex: number;

  /**
   * the sliding offset of each frame. Positive numbers indicating slide backward(e.g. from index=1 to index=0),
   * negative numbers indicating slide forward(e.g. from index=0 to index=1).
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 15 dynamic
   */
  offset: number;
}

/**
 * The callback of onContentDidScroll.
 * 
 * @typedef { function } ContentDidScrollCallback
 * @param { number } selectedIndex - the index value of the swiper content selected before animation start.
 * @param { number } index - the index value of the swiper content.
 * @param { number } position - the moving ratio of the swiper content from the start position of the swiper main axis.
 * @param { number } mainAxisLength - the swiper main axis length for calculating position.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare type ContentDidScrollCallback = (selectedIndex: number, index: number, position: number, mainAxisLength: number) => void;

/**
 * The callback of onContentWillScroll.
 *
 * @typedef { function } ContentWillScrollCallback
 * @param { SwiperContentWillScrollResult } result - the result of swiper ContentWillScrollCallback.
 * @returns { boolean } whether to allow scroll, true indicating can scroll and false indicating can not scroll.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 15 dynamic
 */
declare type ContentWillScrollCallback = (result: SwiperContentWillScrollResult) => boolean;

/**
 * Defines Swiper Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Swiper Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Defines Swiper Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare const Swiper: SwiperInterface;

/**
 * Defines Swiper Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Swiper Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Defines Swiper Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare const SwiperInstance: SwiperAttribute;
