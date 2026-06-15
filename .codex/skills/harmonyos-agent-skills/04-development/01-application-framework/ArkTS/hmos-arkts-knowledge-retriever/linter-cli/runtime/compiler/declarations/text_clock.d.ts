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
 * Provides a way to control the textclock status.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Provides a way to control the textclock status.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provides a way to control the textclock status.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare class TextClockController {
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
   * Provides a start event for textclock.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Provides a start event for textclock.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Provides a start event for textclock.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  start();
  /**
   * Provides a stop event for textclock.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Provides a stop event for textclock.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Provides a stop event for textclock.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  stop();
}

/**
 * TextClockConfiguration used by text clock content modifier
 *
 * @extends CommonConfiguration<TextClockConfiguration>
 * @interface TextClockConfiguration
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface TextClockConfiguration extends CommonConfiguration<TextClockConfiguration> {
  /**
   * Specifies the current time zone.
   * The valid value is an integer ranging from - 14 to 12,
   * Where a negative value indicates the eastern time zone, for example, -8.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  timeZoneOffset: number;

  /**
   * TextClock is started or not.
   *
   * @type { boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  started: boolean;

  /**
   * The time of the TextClock.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  timeValue: number;
}

/**
 * Options to construct TextClock component.
 *
 * @interface TextClockOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 18 dynamic
 */
declare interface TextClockOptions {
  /**
   * Time zone offset.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Time zone offset.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Time zone offset.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
  /**
   * Time zone offset.
   * Anonymous Object Rectification.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 18 dynamic
   */
  timeZoneOffset?: number;

  /**
   * TextClock controller.
   *
   * @type { ?TextClockController }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * TextClock controller.
   *
   * @type { ?TextClockController }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * TextClock controller.
   *
   * @type { ?TextClockController }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
  /**
   * TextClock controller.
   * Anonymous Object Rectification.
   *
   * @type { ?TextClockController }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 18 dynamic
   */
  controller?: TextClockController
}

/**
 * TextClock component, which provides the text clock capability.
 *
 * @interface TextClockInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * TextClock component, which provides the text clock capability.
 *
 * @interface TextClockInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * TextClock component, which provides the text clock capability.
 *
 * @interface TextClockInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
interface TextClockInterface {
  /**
   * Construct the text clock component.
   * Specifies the current time zone.
   * The valid value is an integer ranging from - 14 to 12,
   * Where a negative value indicates the eastern time zone, for example, -8.
   *
   * @param { object } options
   * @returns { TextClockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Construct the text clock component.
   * Specifies the current time zone.
   * The valid value is an integer ranging from - 14 to 12,
   * Where a negative value indicates the eastern time zone, for example, -8.
   *
   * @param { object } options
   * @returns { TextClockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Construct the text clock component.
   * Specifies the current time zone.
   * The valid value is an integer ranging from - 14 to 12,
   * Where a negative value indicates the eastern time zone, for example, -8.
   *
   * @param { object } options
   * @returns { TextClockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
  /**
   * Construct the text clock component.
   * Specifies the current time zone.
   * The valid value is an integer ranging from - 14 to 12,
   * Where a negative value indicates the eastern time zone, for example, -8.
   * Anonymous Object Rectification.
   *
   * @param { TextClockOptions } [options] - TextClock options.
   * @returns { TextClockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 18 dynamic
   */
  (options?: TextClockOptions): TextClockAttribute;
}

/**
 * Provides attribute for TextClock.
 *
 * @extends CommonMethod<TextClockAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Provides attribute for TextClock.
 *
 * @extends CommonMethod<TextClockAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provides attribute for TextClock.
 *
 * @extends CommonMethod<TextClockAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare class TextClockAttribute extends CommonMethod<TextClockAttribute> {
  /**
   * set display time format,such as "yyyy/MM/dd","yyyy-MM-dd".
   * support time format：yyyy,MM,MMM(English month abbreviation),MMMM(Full name of the month in English),
   * dd,ddd(English Week abbreviation),dddd(Full name of the week in English),
   * HH/hh(24-hour clock/12-hour clock),mm(minute),ss(second).
   *
   * @param { string } value
   * @returns { TextClockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * set display time format,such as "yyyy/MM/dd","yyyy-MM-dd".
   * support time format：yyyy,MM,MMM(English month abbreviation),MMMM(Full name of the month in English),
   * dd,ddd(English Week abbreviation),dddd(Full name of the week in English),
   * HH/hh(24-hour clock/12-hour clock),mm(minute),ss(second).
   *
   * @param { string } value
   * @returns { TextClockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * set display time format,such as "yyyy/MM/dd","yyyy-MM-dd".
   * support time format：yyyy,MM,MMM(English month abbreviation),MMMM(Full name of the month in English),
   * dd,ddd(English Week abbreviation),dddd(Full name of the week in English),
   * HH/hh(24-hour clock/12-hour clock),mm(minute),ss(second).
   * The default value is "hh:mm:ss" when TextClock is not in a form.
   * The default value is "hh:mm" when TextClock is in a form.
   * If the value has second or millisecond, the value will be set to the default value.
   *
   * @param { string } value
   * @returns { TextClockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
  /**
   * set display time format,such as "yyyy/MM/dd","yyyy-MM-dd".
   * support time format：yyyy,MM,MMM(English month abbreviation),MMMM(Full name of the month in English),
   * dd,ddd(English Week abbreviation),dddd(Full name of the week in English),
   * HH/hh(24-hour clock/12-hour clock),mm(minute),ss(second).
   * The default value is "hh:mm:ss" when TextClock is not in a form.
   * The default value is "hh:mm" when TextClock is in a form.
   * If the value has second or millisecond, the value will be set to the default value.
   *
   * @param { ResourceStr } value
   * @returns { TextClockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 20 dynamic
   */
  format(value: ResourceStr): TextClockAttribute;

  /**
   * Provides a date change callback.
   * The callback parameter is Unix Time Stamp,
   * The number of milliseconds that have elapsed since January 1, 1970 (UTC).
   * The minimum callback interval for this event is seconds.
   * You can listen to this callback,
   * Use the format attribute method to customize data display in the callback.
   *
   * @param { function } event - Listening date event callback.
   * @returns { TextClockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Provides a date change callback.
   * The callback parameter is Unix Time Stamp,
   * The number of milliseconds that have elapsed since January 1, 1970 (UTC).
   * The minimum callback interval for this event is seconds.
   * You can listen to this callback,
   * Use the format attribute method to customize data display in the callback.
   *
   * @param { function } event - Listening date event callback.
   * @returns { TextClockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Provides a date change callback.
   * The callback parameter is Unix Time Stamp,
   * The number of milliseconds that have elapsed since January 1, 1970 (UTC).
   * The minimum callback interval for this event default is seconds when TextClock is not in a form.
   * The minimum callback interval for this event is minutes when TextClock is in a form.
   * If visibility is Hidden the callback be disabled when TextClock is in a form.
   * You can listen to this callback,
   * Use the format attribute method to customize data display in the callback.
   *
   * @param { function } event - Listening date event callback.
   * @returns { TextClockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  onDateChange(event: (value: number) => void): TextClockAttribute;

  /**
   * Called when the value of TextClock fontColor is set
   *
   * @param { ResourceColor } value
   * @returns { TextClockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Called when the value of TextClock fontColor is set
   *
   * @param { ResourceColor } value
   * @returns { TextClockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the value of TextClock fontColor is set
   *
   * @param { ResourceColor } value
   * @returns { TextClockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  fontColor(value: ResourceColor): TextClockAttribute;

  /**
   * Called when the value of TextClock fontSize is set
   *
   * @param { Length } value
   * @returns { TextClockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Called when the value of TextClock fontSize is set
   *
   * @param { Length } value
   * @returns { TextClockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the value of TextClock fontSize is set
   *
   * @param { Length } value
   * @returns { TextClockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  fontSize(value: Length): TextClockAttribute;

  /**
   * Called when the value of TextClock fontStyle is set
   *
   * @param { FontStyle } value
   * @returns { TextClockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Called when the value of TextClock fontStyle is set
   *
   * @param { FontStyle } value
   * @returns { TextClockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the value of TextClock fontStyle is set
   *
   * @param { FontStyle } value
   * @returns { TextClockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  fontStyle(value: FontStyle): TextClockAttribute;

  /**
   * Called when the value of TextClock fontWeight is set
   *
   * @param { number | FontWeight | string } value
   * @returns { TextClockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Called when the value of TextClock fontWeight is set
   *
   * @param { number | FontWeight | string } value
   * @returns { TextClockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the value of TextClock fontWeight is set
   *
   * @param { number | FontWeight | string } value
   * @returns { TextClockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  fontWeight(value: number | FontWeight | string): TextClockAttribute;

  /**
   * Called when the value of TextClock fontFamily is set
   *
   * @param { ResourceStr } value
   * @returns { TextClockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Called when the value of TextClock fontFamily is set
   *
   * @param { ResourceStr } value
   * @returns { TextClockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the value of TextClock fontFamily is set
   *
   * @param { ResourceStr } value
   * @returns { TextClockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  fontFamily(value: ResourceStr): TextClockAttribute;

  /**
   * Called when the text shadow is set.
   *
   * @param { ShadowOptions | Array<ShadowOptions> } value - The shadow options.
   * @returns { TextClockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 11
   */
  /**
   * Called when the text shadow is set.
   *
   * @param { ShadowOptions | Array<ShadowOptions> } value - The shadow options.
   * @returns { TextClockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 12 dynamic
   */
  textShadow(value: ShadowOptions | Array<ShadowOptions>): TextClockAttribute;

  /**
   * Called when the text fontFeature is set.
   *
   * @param { string } value - The fontFeature.
   * normal | <feature-tag-value>, 
   * where <feature-tag-value> = <string> [ <integer> | on | off ], like: "ss01" 0
   * number of <feature-tag-value> can be single or multiple, and separated by comma ','.
   * @returns { TextClockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 11
   */
  /**
   * Called when the text fontFeature is set.
   *
   * @param { string } value - The fontFeature.
   * normal | <feature-tag-value>, 
   * where <feature-tag-value> = <string> [ <integer> | on | off ], like: "ss01" 0
   * number of <feature-tag-value> can be single or multiple, and separated by comma ','.
   * @returns { TextClockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 12 dynamic
   */
  fontFeature(value: string): TextClockAttribute;

  /**
   * Set the content modifier of textclock.
   *
   * @param { ContentModifier<TextClockConfiguration> } modifier - The content modifier of textclock.
   * @returns { TextClockAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  contentModifier(modifier: ContentModifier<TextClockConfiguration>): TextClockAttribute;

  /**
   * Set hour format
   *
   * @param { Optional<DateTimeOptions> } dateTimeOptions - Indicates whether a leading 0 is required for the hour.
   * @returns { TextClockAttribute } the attribute of the text clock
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 12 dynamic
   */
  dateTimeOptions(dateTimeOptions: Optional<DateTimeOptions>): TextClockAttribute;
}

/**
 * Defines TextClock Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines TextClock Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines TextClock Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare const TextClock: TextClockInterface;

/**
 * Defines TextClock Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines TextClock Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines TextClock Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare const TextClockInstance: TextClockAttribute;
