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
 * The challenge result based on input pattern for control pattern lock component.
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * The challenge result based on input pattern for control pattern lock component.
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare enum PatternLockChallengeResult {
  /**
   * The challenge result is correct.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * The challenge result is correct.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  CORRECT = 1,
  /**
   * The challenge result is wrong.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * The challenge result is wrong.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  WRONG = 2
}

/**
 * Defines the options of active circle style.
 *
 * @interface CircleStyleOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface CircleStyleOptions {
  /**
   * The circle color when cell is active state.
   *
   * @type { ?ResourceColor }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  color?: ResourceColor;

  /**
   * The circle radius when cell is active state.
   *
   * @type { ?LengthMetrics }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  radius?: LengthMetrics;

  /**
   * Enable the wave effect when cell is active.
   *
   * @type { ?boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  enableWaveEffect?: boolean;

  /**
   * Enable the activity circle style displayed in the foreground.
   *
   * @type { ?boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  enableForeground?: boolean;
}

/**
 * Provides methods for control pattern lock component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Provides methods for control pattern lock component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provides methods for control pattern lock component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare class PatternLockController {
  /**
   * constructor.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * constructor.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * A constructor used to create a PatternLockController instance.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  constructor();

  /**
   * Reset pattern lock.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Reset pattern lock.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Resets the component status.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  reset();

  /**
   * Set challenge result.
   * @param { PatternLockChallengeResult } result - The challenge result based on input pattern.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Sets the authentication challenge result for the pattern password.
   * @param { PatternLockChallengeResult } result - Authentication challenge result of the pattern password.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  setChallengeResult(result: PatternLockChallengeResult): void;
}

/**
 * Provides an interface for generating PatternLock.
 *
 * @interface PatternLockInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Provides an interface for generating PatternLock.
 *
 * @interface PatternLockInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provides an interface for generating PatternLock.
 *
 * @interface PatternLockInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
interface PatternLockInterface {
  /**
   * Constructor.
   *
   * @param { PatternLockController } [controller] - controller
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Constructor.
   *
   * @param { PatternLockController } [controller]  controller
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Constructor.
   *
   * @param { PatternLockController } [controller]  controller
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  (controller?: PatternLockController): PatternLockAttribute;
}

/**
 * Provides methods for attribute pattern lock component.
 *
 * @extends CommonMethod<PatternLockAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Provides methods for attribute pattern lock component.
 *
 * @extends CommonMethod<PatternLockAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provides methods for attribute pattern lock component.
 *
 * @extends CommonMethod<PatternLockAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare class PatternLockAttribute extends CommonMethod<PatternLockAttribute> {
  /**
   * The square side length of pattern lock component.
   *
   * @param { Length } value
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * The square side length of pattern lock component.
   *
   * @param { Length } value
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the width and height (same value) of the component.
   *
   * <p><strong>NOTE</strong>:
   * <br>If this attribute is set to 0 or a negative number, the component is not displayed.
   * </p>
   *
   * @param { Length } value - Width and height of the component, Default value is 288vp.
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  sideLength(value: Length): PatternLockAttribute;

  /**
   * Circle radius.
   *
   * @param { Length } value
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Circle radius.
   *
   * @param { Length } value
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the radius of the dots in a grid.
   *
   * <p><strong>NOTE</strong>:
   * <br>If this attribute is set to 0 or a negative value, the default value is used.
   * </p>
   *
   * @param { Length } value - Radius of the dots in a grid, Default value is 6vp.
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  circleRadius(value: Length): PatternLockAttribute;

  /**
   * The background color.
   *
   * @param { ResourceColor } value
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * The background color.
   *
   * @param { ResourceColor } value
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the background color.
   *
   * @param { ResourceColor } value - Background color.
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  backgroundColor(value: ResourceColor): PatternLockAttribute;

  /**
   * Regular color.
   *
   * @param { ResourceColor } value
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Regular color.
   *
   * @param { ResourceColor } value
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the fill color of the grid dot in the unselected state.
   *
   * @param { ResourceColor } value - Fill color of the grid dot in the unselected state, Default value is '#ff182431'.
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  regularColor(value: ResourceColor): PatternLockAttribute;

  /**
   * The color when cell is selected.
   *
   * @param { ResourceColor } value
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * The color when cell is selected.
   *
   * @param { ResourceColor } value
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the fill color of the grid dot in the selected state.
   *
   * @param { ResourceColor } value - Fill color of the grid dot in the selected state, Default value is '#ff182431'.
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  selectedColor(value: ResourceColor): PatternLockAttribute;

  /**
   * The color when cell is active state.
   *
   * @param { ResourceColor } value
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * The color when cell is active state.
   *
   * @param { ResourceColor } value
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the fill color of the grid dot in the activated state, which is when the dot is highlighted but not selected.
   *
   * @param { ResourceColor } value - Fill color of the grid dot in the activated state, Default value is '#ff182431'.
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  activeColor(value: ResourceColor): PatternLockAttribute;

  /**
   * The path line color.
   *
   * @param { ResourceColor } value
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * The path line color.
   *
   * @param { ResourceColor } value
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the path color.
   *
   * @param { ResourceColor } value - Path color, Default value is '#33182431'.
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  pathColor(value: ResourceColor): PatternLockAttribute;

  /**
   * The path line stroke width.
   *
   * @param { number | string } value
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * The path line stroke width.
   *
   * @param { number | string } value
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the width of the path stroke.
   *
   * <p><strong>NOTE</strong>:
   * <br>If this attribute is set to **0** or a negative value, the path stroke is not displayed.
   * </p>
   *
   * @param { number | string } value - Width of the path stroke, Default value is 12vp.
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  pathStrokeWidth(value: number | string): PatternLockAttribute;

  /**
   * Called when the pattern input completed.
   *
   * @param { function } callback
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Called when the pattern input completed.
   *
   * @param { function } callback
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Invoked when the pattern password input is complete.
   *
   * @param { function } callback
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onPatternComplete(callback: (input: Array<number>) => void): PatternLockAttribute;

  /**
   * Called when judging whether the input state can be reset by touch pattern lock.
   *
   * @param { boolean } value
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Called when judging whether the input state can be reset by touch pattern lock.
   *
   * @param { boolean } value
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets whether to allow the user to reset the component status (that is, clear the input) by touching the component
   * again after the input is complete.
   *
   * @param { boolean } value - Whether to allow the user to reset the component status (that is, clear the input) by
   * touching the component again after the input is complete, Default value is true.
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  autoReset(value: boolean): PatternLockAttribute;

  /**
   * Called when connecting to a grid dot.
   * @param { import('../../../api/@ohos.base').Callback<number> } callback - A callback instance used when connection to a grid dot.
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Invoked when a grid dot is connected during pattern password input.
   *
   * @param { import('../../../api/@ohos.base').Callback<number> } callback - A callback instance used when connection to a grid dot.
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onDotConnect(callback: import('../../../api/@ohos.base').Callback<number>): PatternLockAttribute;

  /**
   * Sets the background circle style for the dots in a grid when they are in the activated state.
   *
   * @param { Optional<CircleStyleOptions> } options - Background circle style of the dots in the activated state.
   * @returns { PatternLockAttribute } PatternLockAttribute
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  activateCircleStyle(options: Optional<CircleStyleOptions>): PatternLockAttribute;

  /**
   * Sets whether unselected dots in the grid are automatically selected when the password path passes over them.
   *
   * @param { boolean } skipped - Whether unselected dots in the grid are automatically selected when the password
   * path passes over them, Default value is false.
   * @returns { PatternLockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  skipUnselectedPoint(skipped: boolean): PatternLockAttribute;
}

/**
 * Defines PatternLock Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Defines PatternLock Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines PatternLock Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare const PatternLock: PatternLockInterface;

/**
 * Defines PatternLock Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Defines PatternLock Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines PatternLock Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare const PatternLockInstance: PatternLockAttribute;
