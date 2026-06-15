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
 * Provides a way to control the process.
 *
 * @since 8
 */
/**
 * Provides a way to control the process.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Provides a way to control the process.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare class TextTimerController {
  /**
   * constructor.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
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
   * A constructor used to create a TextTimerController object.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  constructor();

  /**
   * Provides a start event for timer.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Provides a start event for timer.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Starts the timer.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  start();

  /**
   * Provides a pause event for timer.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Provides a pause event for timer.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Pauses the timer.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  pause();

  /**
   * Provides an event to reset timer.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Provides an event to reset timer.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Resets the timer.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  reset();
}

/**
 * TextTimerConfiguration used by content modifier.
 *
 * @extends CommonConfiguration<TextTimerConfiguration>
 * @interface TextTimerConfiguration
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface TextTimerConfiguration extends CommonConfiguration<TextTimerConfiguration> {
  /**
   * Timer duration, in milliseconds.
   * It is effective only when isCountDown is true.
   * The maximum value is 86400000 ms (24 hours).
   *
   * <p><strong>NOTE</strong>:
   * <br>If the value is between 0 and 86,400,000, it is used as the initial countdown time.
   * <br>Otherwise, the default value is used as the initial countdown time.
   * </p>
   *
   * @type { number }
   * @default 60000
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  count: number;

  /**
   * Whether the timer is a countdown.
   * The value true means that the timer counts down,
   * and false means that the timer counts up.
   *
   * @type { boolean }
   * @default false
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  isCountDown: boolean;

  /**
   * Whether the timer has already started.
   *
   * @type { boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  started: boolean;
  
  /**
   * Elapsed time of the timer, in the minimum unit of the format.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  elapsedTime: number;
}

/**
 * Defines the options of TextTimer.
 *
 * @interface TextTimerOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines the options of TextTimer.
 *
 * @interface TextTimerOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Parameters of the TextTimer component.
 *
 * @interface TextTimerOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
interface TextTimerOptions {
  /**
   * Sets whether to countdown.The default value is false.
   *
   * @type { ?boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Sets whether to countdown.The default value is false.
   *
   * @type { ?boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Whether the timer is a countdown.
   * The value true means that the timer counts down,
   * and false means that the timer counts up.
   *
   * @type { ?boolean } - Default value: false
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  isCountDown?: boolean;

  /**
   * Specifies the timer range.
   * In the non-countDown scenario, a negative value indicates that the timer is not limited.
   * The unit is millisecond.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Specifies the timer range.
   * In the non-countDown scenario, a negative value indicates that the timer is not limited.
   * The unit is millisecond.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Timer duration, in milliseconds.
   * It is effective only when isCountDown is true.
   * The maximum value is 86400000 ms (24 hours).
   *
   * <p><strong>NOTE</strong>:
   * <br>If the value is between 0 and 86,400,000, it is used as the initial countdown time.
   * <br>Otherwise, the default value is used as the initial countdown time.
   * </p>
   *
   * @type { ?number } - Default value: 60000
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  count?: number;

  /**
   * Controller of Texttimer.
   *
   * @type { ?TextTimerController }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Controller of Texttimer.
   *
   * @type { ?TextTimerController }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * TextTimer controller.
   *
   * @type { ?TextTimerController }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  controller?: TextTimerController;
}

/**
 * Provides an interface for texttimer containers.
 *
 * @interface TextTimerInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Provides an interface for texttimer containers.
 *
 * @interface TextTimerInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Provides an interface for texttimer containers.
 *
 * @interface TextTimerInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
interface TextTimerInterface {
  /**
   * Defines the TextTimer constructor.
   *
   * @param { TextTimerOptions } options
   * @returns { TextTimerAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Defines the TextTimer constructor.
   *
   * @param { TextTimerOptions } options
   * @returns { TextTimerAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * A constructor used to create a TextTimerController object.
   *
   * @param { TextTimerOptions } options
   * @returns { TextTimerAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  (options?: TextTimerOptions): TextTimerAttribute;
}

/**
 * Defines the TextTimer attribute functions.
 *
 * @extends CommonMethod<TextTimerAttribute>
 * @since 8
 */
/**
 * Defines the TextTimer attribute functions.
 *
 * @extends CommonMethod<TextTimerAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Defines the TextTimer attribute functions.
 *
 * @extends CommonMethod<TextTimerAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare class TextTimerAttribute extends CommonMethod<TextTimerAttribute> {
  /**
   * Set the display time format, for example, now is hh/mm/ss/ms and current: hh-mm-ss-ms.
   * The time format string can be hh, mm, ss, or ms.
   *
   * @param { string } value
   * @returns { TextTimerAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Set the display time format, for example, now is hh/mm/ss/ms and current: hh-mm-ss-ms.
   * The time format string can be hh, mm, ss, or ms.
   *
   * @param { string } value
   * @returns { TextTimerAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets the custom format.
   * The value must contain at least one of the following keywords: HH, mm, ss, and SS.
   *
   * <p><strong>NOTE</strong>:
   * <br>If the specified date format is yy, MM, or dd, the default value is used instead.
   * </p>
   *
   * @param { string } value - Custom format.Default value: 'HH:mm:ss.SS'
   * @returns { TextTimerAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  format(value: string): TextTimerAttribute;

  /**
   * Called when the font color is set.
   *
   * @param { ResourceColor } value
   * @returns { TextTimerAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Called when the font color is set.
   *
   * @param { ResourceColor } value
   * @returns { TextTimerAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets the font color.
   *
   * @param { ResourceColor } value
   * @returns { TextTimerAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  fontColor(value: ResourceColor): TextTimerAttribute;

  /**
   * Called when the font size is set.
   *
   * @param { Length } value
   * @returns { TextTimerAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Called when the font size is set.
   *
   * @param { Length } value
   * @returns { TextTimerAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets the font size.
   *
   * @param { Length } value - Font size.The default font size is 16 fp.
   * <br>If fontSize is of the number type, the unit fp is used.
   * <br>The value cannot be a percentage.
   * @returns { TextTimerAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  fontSize(value: Length): TextTimerAttribute;

  /**
   * Called when the fontStyle is set
   *
   * @param { FontStyle } value
   * @returns { TextTimerAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Called when the fontStyle is set
   *
   * @param { FontStyle } value
   * @returns { TextTimerAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets the font style.
   *
   * @param { FontStyle } value - Font style.Default value: FontStyle.Normal
   * @returns { TextTimerAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  fontStyle(value: FontStyle): TextTimerAttribute;

  /**
   * Called when the fontWeight is set
   *
   * @param { number | FontWeight | string } value
   * @returns { TextTimerAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Called when the fontWeight is set
   *
   * @param { number | FontWeight | string } value
   * @returns { TextTimerAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when the fontWeight is set
   *
   * @param { number | FontWeight | string } value
   * @returns { TextTimerAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
  /**
   * Sets the font weight.
   *
   * <p><strong>NOTE</strong>:
   * <br>If the value is too large, the text may be clipped depending on the font.
   * </p>
   *
   * @param { number | FontWeight | ResourceStr } value - Font weight.
   * <br>For the number type, Value range: [100, 900], at an interval of 100.The default value is 400.
   * <br>A larger value indicates a heavier font weight.
   * <br>For the string type, only strings that represent a number.
   * @returns { TextTimerAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 20 dynamic
   */
  fontWeight(value: number | FontWeight | ResourceStr): TextTimerAttribute;

  /**
   * Called when the fontFamily is set
   *
   * @param { ResourceStr } value
   * @returns { TextTimerAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Called when the fontFamily is set
   *
   * @param { ResourceStr } value
   * @returns { TextTimerAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets the font family.
   *
   * @param { ResourceStr } value - Font family. Default font: 'HarmonyOS Sans'
   * @returns { TextTimerAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  fontFamily(value: ResourceStr): TextTimerAttribute;

  /**
   * Called when the timer value is returned.
   *
   * @param { function } event
   * @returns { TextTimerAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Called when the timer value is returned.
   *
   * @param { function } event
   * @returns { TextTimerAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Triggered when the time text changes.
   * This event is not triggered when the screen is locked or the application is running in the background.
   * When high-precision formats (such as SSS or SS) are used, the callback interval may vary.
   *
   * @param { function } event
   * @returns { TextTimerAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  onTimer(event: (utc: number, elapsedTime: number) => void): TextTimerAttribute;

  /**
   * Called when the text shadow is set.
   *
   * @param { ShadowOptions | Array<ShadowOptions> } value - The shadow options.
   * @returns { TextTimerAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Sets the text shadow.
   * It supports input parameters in an array to implement multiple text shadows.
   * This API does not work with the fill attribute or coloring strategy.
   *
   * @param { ShadowOptions | Array<ShadowOptions> } value - The shadow options.
   * @returns { TextTimerAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  textShadow(value: ShadowOptions | Array<ShadowOptions>): TextTimerAttribute;

  /**
   * Creates a content modifier.
   *
   * @param { ContentModifier<TextTimerConfiguration> } modifier - The content modifier of texttimer.
   * @returns { TextTimerAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  contentModifier(modifier: ContentModifier<TextTimerConfiguration>): TextTimerAttribute;
}

/**
 * Defines TextTimer Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines TextTimer Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Defines TextTimer Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare const TextTimer: TextTimerInterface;

/**
 * Defines TextTimer Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines TextTimer Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Defines TextTimer Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare const TextTimerInstance: TextTimerAttribute;
