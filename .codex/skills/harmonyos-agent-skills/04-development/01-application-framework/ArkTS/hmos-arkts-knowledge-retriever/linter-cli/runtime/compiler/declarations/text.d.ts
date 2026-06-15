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
 * Text overflow options.
 *
 * Anonymous Object Rectification.
 * @interface TextOverflowOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 18 dynamic
 */
declare interface TextOverflowOptions {
  /**
   * Text overflow option.
   *
   * @type { TextOverflow }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Text overflow option.
   *
   * @type { TextOverflow }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Text overflow option.
   *
   * @type { TextOverflow }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Text overflow option.
   *
   * @type { TextOverflow }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
  /**
   * Text overflow option.
   *
   * Anonymous Object Rectification.
   * @type { TextOverflow }
   * @default TextOverflow.Clip
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 18 dynamic
   */
  overflow: TextOverflow;
}

/**
 * Provides an interface for writing texts.
 *
 * @interface TextInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Provides an interface for writing texts.
 *
 * @interface TextInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @since 9
 */
/**
 * Provides an interface for writing texts.
 *
 * @interface TextInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Provides an interface for writing texts.
 *
 * @interface TextInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
interface TextInterface {
  /**
   * Called when writing text.
   *
   * @param { string | Resource } content
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when writing text.
   *
   * @param { string | Resource } content
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Called when writing text.
   *
   * @param { string | Resource } content
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when writing text.
   *
   * @param { string | Resource } content
   * This parameter does not take effect if the component contains a Span child component and does not have any styled string configured.
   * In this case, the span content is displayed, and the style of the component does not take effect.
   * Default value: ' '
   * @param { TextOptions } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  (content?: string | Resource, value?: TextOptions): TextAttribute;
  }

/**
 * @extends CommonMethod<TextAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * @extends CommonMethod<TextAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @since 9
 */
/**
 * @extends CommonMethod<TextAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * @extends CommonMethod<TextAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare class TextAttribute extends CommonMethod<TextAttribute> {
  /**
   * Called when the font is set.
   *
   * @param { Font } value - the text font size and weight and family and style.
   * @returns { TextAttribute } The attribute of the text.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Called when the font is set.
   * Sets the text style, covering the font size, font width, font family, and font style.
   *
   * @param { Font } value - the text font size and weight and family and style.
   * @returns { TextAttribute } The attribute of the text.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  font(value: Font): TextAttribute;

  /**
   * Called when the font is set.
   *
   * <p><strong>NOTE</strong>:
   * <br>It is only effective for the Text component, not for its child components.
   * </p>
   *
   * @param { Font } fontValue - the text font size and weight and family and style.
   * @param { FontSettingOptions } options - font setting options.
   * @returns { TextAttribute } The attribute of the text.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 12 dynamic
   */
  font(fontValue: Font, options?: FontSettingOptions): TextAttribute;

  /**
   * Called when the font color is set.
   *
   * @param { ResourceColor } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the font color is set.
   *
   * @param { ResourceColor } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Called when the font color is set.
   *
   * @param { ResourceColor } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when the font color is set.
   *
   * @param { ResourceColor } value - Default value is '#e6182431'.The default value on wearable devices is '#c5ffffff'.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  fontColor(value: ResourceColor): TextAttribute;

  /**
   * Called when the font size is set.
   *
   * @param { number | string | Resource } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the font size is set.
   *
   * @param { number | string | Resource } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Called when the font size is set.
   *
   * @param { number | string | Resource } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when the font size is set.
   *
   * <p><strong>NOTE</strong>:
   * <br>If fontSize is of the number type, the unit fp is used.
   * </p>
   *
   * @param { number | string | Resource } value - Default value is 16fp.The default value on wearable devices is 15fp.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  fontSize(value: number | string | Resource): TextAttribute;

  /**
   * Called when the minimum font size of the font is set.
   *
   * @param { number | string | Resource } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the minimum font size of the font is set.
   *
   * @param { number | string | Resource } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Called when the minimum font size of the font is set.
   *
   * @param { number | string | Resource } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when the minimum font size of the font is set.
   *
   * <p><strong>NOTE</strong>:
   * <br>For the string type, numeric string values with optional units, for example, "10" or "10fp", are supported.
   * <br>For the setting to take effect, this attribute must be used together with maxFontSize and maxLines,
   * or layout constraint settings.
   * <br>When the adaptive font size is used, the fontSize settings do not take effect.
   * <br>If the value of minFontSize is less than or equal to 0, font size adaptation does not take effect.
   * <br>In this case, the actual font size is determined by the value of fontSize.
   * <br>If fontSize is not specified, the default value is used.
   * <br>Since API version 18, this attribute takes effect on child components and styled strings,
   * and the adaptive font size is applied to parts where the font size is not set.
   * </p>
   *
   * @param { number | string | Resource } value - The unit is fp.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  minFontSize(value: number | string | Resource): TextAttribute;

  /**
   * Called when the maximum font size of the font is set.
   *
   * @param { number | string | Resource } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the maximum font size of the font is set.
   *
   * @param { number | string | Resource } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Called when the maximum font size of the font is set.
   *
   * @param { number | string | Resource } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when the maximum font size of the font is set.
   *
   * <p><strong>NOTE</strong>:
   * <br>For the string type, numeric string values with optional units, for example, "10" or "10fp", are supported.
   * <br>For the setting to take effect, this attribute must be used together with minFontSize and maxLines,
   * or layout constraint settings.
   * <br>When the adaptive font size is used, the fontSize settings do not take effect.
   * <br>If the value of maxFontSize is less than or equal to 0, font size adaptation does not take effect.
   * <br>In this case, the actual font size is determined by the value of fontSize.
   * <br>If fontSize is not specified, the default value is used.
   * <br>Since API version 18, this attribute takes effect on child components and styled strings,
   * and the adaptive font size is applied to parts where the font size is not set.
   * </p>
   *
   * @param { number | string | Resource } value - The unit is fp.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  maxFontSize(value: number | string | Resource): TextAttribute;

  /**
   * Called when the minimum font scale of the font is set.
   * Value range: [0, 1]
   *
   * <p><strong>NOTE</strong>:
   * <br>A value less than 0 is handled as 0.
   * <br>A value greater than 1 is handled as 1.
   * <br>Abnormal values are ineffective by default.
   * </p>
   *
   * @param { number | Resource } scale
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12
   */
  /**
   * Called when the minimum font scale of the font is set.
   * Value range: [0, 1]
   *
   * <p><strong>NOTE</strong>:
   * <br>A value less than 0 is handled as 0.
   * <br>A value greater than 1 is handled as 1.
   * <br>Abnormal values are ineffective by default.
   * </p>
   *
   * @param { number | Resource } scale
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  minFontScale(scale: number | Resource): TextAttribute;

  /**
   * Called when the maximum font scale of the font is set.
   * Value range: [1, +∞)
   *
   * <p><strong>NOTE</strong>:
   * <br>A value less than 1 is handled as 1.
   * <br>Abnormal values are ineffective by default.
   * </p>
   *
   * @param { number | Resource  } scale
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12
   */
  /**
   * Called when the maximum font scale of the font is set.
   * Value range: [1, +∞)
   *
   * <p><strong>NOTE</strong>:
   * <br>A value less than 1 is handled as 1.
   * <br>Abnormal values are ineffective by default.
   * </p>
   *
   * @param { number | Resource  } scale
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  maxFontScale(scale: number | Resource): TextAttribute;

  /**
   * Called when the font style of a font is set.
   *
   * @param { FontStyle } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the font style of a font is set.
   *
   * @param { FontStyle } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Called when the font style of a font is set.
   *
   * @param { FontStyle } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when the font style of a font is set.
   *
   * @param { FontStyle } value - Default value is FontStyle.Normal.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  fontStyle(value: FontStyle): TextAttribute;

  /**
   * Called when the font weight is set.
   *
   * @param { number | FontWeight | string } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the font weight is set.
   *
   * @param { number | FontWeight | string } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Called when the font weight is set.
   *
   * @param { number | FontWeight | string } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when the font weight is set.
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
   * @param { number | FontWeight | string } value - Default value is FontWeight.Normal.The default value on wearable devices is FontWeight.Regular.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
   /**
   * Called when the font weight is set.
   *
   * @param { number | FontWeight | ResourceStr } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 20 dynamic
   */
  fontWeight(value: number | FontWeight | ResourceStr): TextAttribute;

  /**
   * Called when the font weight is set.
   *
   * <p><strong>NOTE</strong>:
   * <br>It is only effective for the Text component, not for its child components.
   * <br>For the number type, the value ranges from 100 to 900, at an interval of 100.
   * <br>A larger value indicates a heavier font weight.
   * <br>The default value is 400.
   * <br>For the string type, only strings that represent a number, for example, "400",
   * and the following enumerated values of FontWeight are supported: "bold", "bolder", "lighter", "regular", and "medium".
   * </p>
   *
   * @param { number | FontWeight | string } weight
   * @param { FontSettingOptions } options - font setting options.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 12
   */
  /**
   * Called when the font weight is set.
   *
   * @param { number | FontWeight | ResourceStr } weight
   * @param { FontSettingOptions } options - font setting options.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 20 dynamic
   */
  fontWeight(weight: number | FontWeight | ResourceStr, options?: FontSettingOptions): TextAttribute;

  /**
   * Set font line spacing.
   *
   * <p><strong>NOTE</strong>:
   * <br>If the value specified is less than or equal to 0, the default value 0 is used.
   * </p>
   *
   * @param { LengthMetrics } value - Default value is 0.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  lineSpacing(value: LengthMetrics): TextAttribute;

  /**
   * Set the minimum line height
   *
   * <p><strong>NOTE</strong>:
   * <br>If the value is set to undefined, this property does not limit the text line height.
   * </p>
   *
   * @param { LengthMetrics | undefined } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 22 dynamic
   */
  minLineHeight(value: LengthMetrics | undefined): TextAttribute;

  /**
   * Set the maximum line height
   *
   * <p><strong>NOTE</strong>:
   * <br>If the value is set to undefined, this property does not limit the text line height.
   * </p>
   *
   * @param { LengthMetrics | undefined } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 22 dynamic
   */
  maxLineHeight(value: LengthMetrics | undefined): TextAttribute;

  /**
   * Set the line height multiple value of text.
   *
   * <p><strong>NOTE</strong>:
   * <br>If the value is set to undefined, this property is set to 0 and has no effect.
   * </p>
   *
   * @param { number | undefined } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 22 dynamic
   */
  lineHeightMultiple(value: number | undefined): TextAttribute;

  /**
   * Set font line spacing with options.
   *
   * @param { LengthMetrics } value
   * @param { LineSpacingOptions } options
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  lineSpacing(value: LengthMetrics, options?: LineSpacingOptions): TextAttribute;

  /**
   * Called when the horizontal center mode of the font is set.
   *
   * @param { TextAlign } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the horizontal center mode of the font is set.
   *
   * @param { TextAlign } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Called when the horizontal center mode of the font is set.
   *
   * @param { TextAlign } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when the horizontal center mode of the font is set.
   *
   * <p><strong>NOTE</strong>:
   * <br>The text takes up the full width of the Text component.
   * <br>To set vertical alignment for the text, use the align attribute.
   * <br>The align attribute alone does not control the horizontal position of the text.
   * <br>In other words, Alignment.TopStart, Alignment.Top, and Alignment.TopEnd produce the same effect,
   * top-aligning the text; Alignment.Start, Alignment.Center, and Alignment.End produce the same effect,
   * centered-aligning the text vertically; Alignment.BottomStart, Alignment.Bottom,
   * and Alignment.BottomEnd produce the same effect, bottom-aligning the text.
   * <br>When textAlign is set to TextAlign.JUSTIFY, you must set the wordBreak attribute,
   * and the text in the last line is horizontally aligned with the start edge.
   * </p>
   *
   * @param { TextAlign } value - Default value is TextAlign.Start.The default value on wearable devices is TextAlign.Center.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  textAlign(value: TextAlign): TextAttribute;

  /**
   * Set the vertical align of the text.
   *
   * @param { Optional<TextVerticalAlign> } textVerticalAlign - The default value is BASELINE.
   * @returns { TextAttribute } returns the instance of the TextAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  textVerticalAlign(textVerticalAlign: Optional<TextVerticalAlign>): TextAttribute;


  /**
   * Set the vertical align of the whole text content.
   *
   * @param { Optional<TextContentAlign> } textContentAlign - The default value is CENTER.
   * @returns { TextAttribute } returns the instance of the TextAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 21 dynamic
   */
  textContentAlign(textContentAlign: Optional<TextContentAlign>): TextAttribute;

  /**
   * Called when the vertical center mode of the font is set.
   *
   * @param { number | string | Resource } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the vertical center mode of the font is set.
   *
   * @param { number | string | Resource } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Called when the vertical center mode of the font is set.
   *
   * @param { number | string | Resource } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when the vertical center mode of the font is set.
   *
   * <p><strong>NOTE</strong>:
   * <br>If the value is less than or equal to 0, the line height is not limited and the font size is adaptive.
   * <br>If the value is of the number type, the unit fp is used.
   * <br>For the string type, numeric string values with optional units, for example, "10" or "10fp", are supported.
   * </p>
   *
   * @param { number | string | Resource } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  lineHeight(value: number | string | Resource): TextAttribute;

  /**
   * Called when the overflow mode of the font is set.
   *
   * @param { object } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the overflow mode of the font is set.
   *
   * @param { object } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Called when the overflow mode of the font is set.
   *
   * @param { object } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when the overflow mode of the font is set.
   *
   * @param { object } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
  /**
   * Called when the overflow mode of the font is set.
   *
   * Anonymous Object Rectification.
   *
   * <p><strong>NOTE</strong>:
   * <br>Text is clipped at the transition between words.
   * <br>To clip text in the middle of a word, add \u200B between characters.
   * <br>Since API version 11, preferably set the wordBreak attribute to WordBreak.BREAK_ALL to achieve the same purpose.
   * <br>If overflow is set to TextOverflow.None, TextOverflow.Clip, or TextOverflow.Ellipsis,
   * this attribute must be used with maxLines for the settings to take effect.
   * <br>TextOverflow.None produces the same effect as TextOverflow.Clip.
   * <br>If overflow is set to TextOverflow.MARQUEE, the text scrolls in a line, and neither maxLines nor copyOption takes effect.
   * <br>The textAlign attribute takes effect only when the text is not scrollable.
   * <br>With overflow set to TextOverflow.MARQUEE, the clip attribute is set to true by default.
   * <br>TextOverflow.MARQUEE is not available for CustomSpan of the styled string.
   * <br>Since API version 12, TextOverflow.MARQUEE is available for the ImageSpan component,
   * where the text and images are displayed in scrolling mode in a line.
   * </p>
   *
   * @param { TextOverflowOptions } options - Text overflow options.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 18 dynamic
   */
  textOverflow(options: TextOverflowOptions): TextAttribute;

  /**
   * Called when the font list of text is set.
   *
   * @param { string | Resource } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the font list of text is set.
   *
   * @param { string | Resource } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Called when the font list of text is set.
   *
   * @param { string | Resource } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when the font list of text is set.
   *
   * <p><strong>NOTE</strong>:
   * <br>Default font: 'HarmonyOS Sans'
   * <br>The 'HarmonyOS Sans' font and registered custom fonts are supported for applications.
   * <br>Only the 'HarmonyOS Sans' font is supported for widgets.
   * </p>
   *
   * @param { string | Resource } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  fontFamily(value: string | Resource): TextAttribute;

  /**
   * Called when the maximum number of lines of text is set.
   *
   * @param { number } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the maximum number of lines of text is set.
   *
   * @param { number } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Called when the maximum number of lines of text is set.
   *
   * @param { number } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when the maximum number of lines of text is set.
   *
   * <p><strong>NOTE</strong>:
   * <br>By default, text is automatically folded.
   * <br>If this attribute is specified, the text will not exceed the specified number of lines.
   * <br>If there is extra text, you can use textOverflow to specify how it is displayed.
   * </p>
   *
   * @param { number } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  maxLines(value: number): TextAttribute;
  /**
   * Called when the minimum number of lines of text is set.
   *
   * @param { Optional<number> } minLines - Set the minimum lines of text.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 22 dynamic
   */
  minLines(minLines: Optional<number>): TextAttribute;

  /**
   * Called when the text decoration of the text is set.
   *
   * @param { object } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the text decoration of the text is set.
   *
   * @param { object } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Called when the text decoration of the text is set.
   *
   * @param { object } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when the text decoration of the text is set.
   *
   * @param { object } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
  /**
   * Called when the text decoration of the text is set.
   *
   * <p><strong>NOTE</strong>:
   * <br>The style parameter cannot be used in widgets.
   * </p>
   *
   * @param { DecorationStyleInterface } value - Default value is { type: TextDecorationType.None, color: Color.Black, style: TextDecorationStyle.SOLID }.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 12 dynamic
   */
  decoration(value: DecorationStyleInterface): TextAttribute;

  /**
   * Called when the distance between text fonts is set.
   *
   * @param { number | string } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the distance between text fonts is set.
   *
   * @param { number | string } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Called when the distance between text fonts is set.
   *
   * @param { number | string } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when the distance between text fonts is set.
   *
   * <p><strong>NOTE</strong>:
   * <br>If the value specified is a percentage or 0, the default value is used.
   * <br>For the string type, numeric string values with optional units, for example, "10" or "10fp", are supported.
   * <br>If the value specified is a negative value, the text is compressed.
   * <br>A negative value too small may result in the text being compressed to 0 and no content being displayed.
   * </p>
   *
   * @param { number | string } value - The unit is fp.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
   /**
   * Called when the distance between text fonts is set.
   *
   * @param { number | ResourceStr } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 20 dynamic
   */
  letterSpacing(value: number | ResourceStr): TextAttribute;

  /**
   * Called when the type of letter in the text font is set.
   *
   * @param { TextCase } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the type of letter in the text font is set.
   *
   * @param { TextCase } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Called when the type of letter in the text font is set.
   *
   * @param { TextCase } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when the type of letter in the text font is set.
   *
   * @param { TextCase } value - Default value is TextCase.Normal.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  textCase(value: TextCase): TextAttribute;

  /**
   * Called when the baseline offset is set.
   *
   * @param { number | string } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the baseline offset is set.
   *
   * @param { number | string } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Called when the baseline offset is set.
   *
   * @param { number | string } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when the baseline offset is set.
   *
   * <p><strong>NOTE</strong>:
   * <br>If the value specified is a percentage, the default value is used.
   * <br>Positive values shift the content upwards, while negative values shift it downwards.
   * </p>
   *
   * @param { number | string } value - Default value is 0.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
   /**
   * Called when the baseline offset is set.
   *
   * @param { number | ResourceStr } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 20 dynamic
   */
  baselineOffset(value: number | ResourceStr): TextAttribute;

  /**
   * Allow replication.
   *
   * @param { CopyOptions } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Allow replication.
   *
   * @param { CopyOptions } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Allow replication.
   *
   * <p><strong>NOTE</strong>:
   * <br>If this attribute is set to CopyOptions.InApp or CopyOptions.LocalDevice,
   * a long press on the text will display a context menu that offers the copy and select-all options.
   * <br>Because widgets do not have the long press event, the context menu will not be displayed when users long press text.
   * </p>
   *
   * @param { CopyOptions } value - Default value is CopyOptions.None.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  copyOption(value: CopyOptions): TextAttribute;

  /**
   * Enable the selectable area can be dragged.
   *
   * @param { boolean } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Enable the selectable area can be dragged.
   *
   * @param { boolean } value
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 11
   */
  /**
   * Enable the selectable area can be dragged.
   *
   * <p><strong>NOTE</strong>:
   * <br>This attribute cannot be used together with the onDragStart event.
   * <br>It must be used together with CopyOptions.
   * <br>When it is set to true and copyOptions is set to CopyOptions.InApp or CopyOptions.LocalDevice,
   * the selected text can be dragged and copied to the text box.
   * </p>
   *
   * @param { boolean } value - Default value is false.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  draggable(value: boolean): TextAttribute;

  /**
   * Called when the text shadow is set.
   *
   * @param { ShadowOptions } value - The shadow options.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when the text shadow is set.
   *
   * <p><strong>NOTE</strong>:
   * <br>This API does not work with the fill attribute or coloring strategy.
   * </p>
   *
   * @param { ShadowOptions | Array<ShadowOptions> } value - The shadow options.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  textShadow(value: ShadowOptions | Array<ShadowOptions>): TextAttribute;

  /**
   * Called when the height adaptive policy is set.
   *
   * @param { TextHeightAdaptivePolicy } value - The height adaptive policy.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the height adaptive policy is set.
   *
   * <p><strong>NOTE</strong>:
   * <ul>
   * <li>When this attribute is set to TextHeightAdaptivePolicy.MAX_LINES_FIRST,
   * the maxLines attribute takes precedence for adjusting the text height.
   * <br>If the maxLines setting results in a layout beyond the layout constraints,
   * the text will shrink to a font size between minFontSize and maxFontSize to allow for more content to be shown.</li>
   * <li>If this attribute is set to TextHeightAdaptivePolicy.MIN_FONT_SIZE_FIRST,
   * the minFontSize attribute takes precedence for adjusting the text height.
   * <br>If the text fits on one line at minFontSize,the system attempts to increase the font size within the range of minFontSize
   * and maxFontSize to display the text as large as possible on one line.
   * <br>If the text cannot fit into a single line even at minFontSize, it sticks with minFontSize.</li>
   * <li>If this attribute is set to TextHeightAdaptivePolicy.LAYOUT_CONSTRAINT_FIRST,
   * the layout constraints take precedence for adjusting the text height.
   * <br>If the resultant layout is beyond the layout constraints,
   * the text will shrink to a font size between minFontSize and maxFontSize to respect the layout constraints.
   * <br>If the text still extends beyond the layout constraints after shrinking to minFontSize,
   * the lines that exceed the constraints are deleted.</li>
   * </ul>
   * </p>
   *
   * @param { TextHeightAdaptivePolicy } value - The height adaptive policy.Default value is TextHeightAdaptivePolicy.MAX_LINES_FIRST.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  heightAdaptivePolicy(value: TextHeightAdaptivePolicy): TextAttribute;

  /**
   * Specify the indentation of the first line in a text-block.
   *
   * @param { Length } value - The length of text indent.
   * @returns { TextAttribute } The attribute of the text.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Specify the indentation of the first line in a text-block.
   *
   * @param { Length } value - The length of text indent.Default value is 0.
   * @returns { TextAttribute } The attribute of the text.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  textIndent(value: Length): TextAttribute;

  /**
   * Set the word break type.
   *
   * <p><strong>NOTE</strong>:
   * <br>When used with {overflow: TextOverflow.Ellipsis} and maxLines, WordBreak.BREAK_ALL can insert line breaks
   * between letters when overflow occurs and display excess content with an ellipsis (...).
   * </p>
   *
   * @param { WordBreak } value - The word break type.Default value is WordBreak.BREAK_WORD.
   * @returns { TextAttribute } The attribute of the text.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  wordBreak(value: WordBreak): TextAttribute;

  /**
   * Set the text line break strategy type.
   *
   * <p><strong>NOTE</strong>:
   * <br>This attribute takes effect when wordBreak is not set to breakAll.
   * <br>Hyphens are not supported.
   * </p>
   *
   * @param { LineBreakStrategy } strategy - The text line break strategy type.Default value is LineBreakStrategy.GREEDY.
   * @returns { TextAttribute } The attribute of the text.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  lineBreakStrategy(strategy: LineBreakStrategy): TextAttribute;

  /**
   * Called when using the Clipboard menu
   * Currently, only text can be copied.
   *
   * @param { function } callback - callback of the listened event.
   * @returns { TextAttribute } The attribute of the text.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  onCopy(callback: (value: string) => void): TextAttribute;

  /**
   * Text selection is achieved by specifying the start and end positions of the text.
   *
   * <p><strong>NOTE</strong>:
   * <br>The selected text is highlighted, and a selection handle is displayed together with a menu of available actions.
   * <br>When copyOption is set to CopyOptions.None, the selection attribute is not effective.
   * <br>When overflow is set to TextOverflow.MARQUEE, the selection attribute is not effective.
   * <br>If the value of selectionStart is greater than or equal to that of selectionEnd, no text will be selected.
   * <br>The value range is [0, textSize], where textSize indicates the maximum number of characters in the text content.
   * <br>If the value is less than 0, the value 0 will be used.
   * <br>If the value is greater than textSize, textSize will be used.
   * <br>If the value of selectionStart or selectionEnd falls within the invisible area, no text will be selected.
   * <br>If clipping is disabled, the text selection outside of the parent component takes effect.
   * </p>
   *
   * @param { number } selectionStart - The start position of the selected text.Default value is -1.
   * @param { number } selectionEnd - The end position of the selected text.Default value is -1.
   * @returns { TextAttribute } The attribute of the text.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  selection(selectionStart: number, selectionEnd: number): TextAttribute;

  /**
   * Set the caret color for the selected text.
   *
   * @param { ResourceColor } color - The color of the selected text caret.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 14 dynamic
   */
  caretColor(color: ResourceColor): TextAttribute;

  /**
   * Set the selected background color of the text.
   *
   * @param { ResourceColor } color - The color of the selected text background.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 14 dynamic
   */
  selectedBackgroundColor(color: ResourceColor): TextAttribute;

  /**
   * Set the shader style of the text, such as lineargradient or radialgradient.
   *
   * @param { ShaderStyle } shader - The shader style of the text.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  shaderStyle(shader: ShaderStyle): TextAttribute;

  /**
   * Set the ellipsis mode.
   *
   * @param { EllipsisMode } value - The ellipsis mode.
   * @returns { TextAttribute } The attribute of the text.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Set the ellipsis mode.
   *
   * <p><strong>NOTE</strong>:
   * <br>For the settings to work, overflow must be set to TextOverflow.Ellipsis and maxLines must be specified.
   * <br>Setting ellipsisMode alone does not take effect.
   * <br>EllipsisMode.START and EllipsisMode.CENTER take effect only when text overflows in a single line.
   * </p>
   *
   * @param { EllipsisMode } value - The ellipsis mode.Default value is EllipsisMode.END.
   * @returns { TextAttribute } The attribute of the text.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  ellipsisMode(value: EllipsisMode): TextAttribute;

  /**
   * Enable data detector.
   *
   * @param { boolean } enable - Enable data detector.
   * @returns { TextAttribute } The attribute of the text.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 11
   */
  /**
   * Enable data detector.
   *
   * <p><strong>NOTE</strong>:
   * <br>This API only works on devices that provide text recognition.
   * <br>When enableDataDetector is set to true, and the dataDetectorConfig attribute is not set,
   * all types of entities are recognized by default,
   * and the color and decoration of the recognized entities will be changed to the following styles:
   * <code>
   *   color: '#ff007dff',
   *   decoration:{
   *      type: TextDecorationType.Underline,
   *      color: '#ff007dff',
   *      style: TextDecorationStyle.SOLID
   *   }
   * </code>
   * <br>Touching and right-clicking an entity with the mouse will pop up the corresponding entity operation menu based on the type of entity,
   * while left-clicking an entity with the mouse will directly respond to the first option of the menu.
   * <br>This API does not work when overflow is set to TextOverflow.MARQUEE.
   * <br>When copyOption is set to CopyOptions.None, the menu displayed after an entity is clicked does not provide the text selection,
   * copy, translation, or sharing functionality.
   * <br>When copyOption is not set to CopyOptions.None, and textSelectable is set to TextSelectableMode.UNSELECTABLE,
   * the entity still has the copy functionality but does not have the text selection feature.
   * </p>
   *
   * @param { boolean } enable - Enable data detector.Default value is false.
   * @returns { TextAttribute } The attribute of the text.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  enableDataDetector(enable: boolean): TextAttribute;

  /**
   * Data detector with config.
   *
   * @param { TextDataDetectorConfig } config - The config of text data detector.
   * @returns { TextAttribute } The attribute of the text.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 11
   */
  /**
   * Data detector with config.
   *
   * <p><strong>NOTE</strong>:
   * <br>This API must be used together with enableDataDetector.
   * <br>It takes effect only when enableDataDetector is set to true.
   * <br>When entities A and B overlap, the following rules are followed:
   * <ol>
   * <li>If A is a subset of B (A ⊂ B), then B is retained; otherwise, A is retained.</li>
   * <li>If A is not a subset of B (A ⊄ B) and B is not a subset of A (B ⊄ A),
   * and if the starting point of A is earlier than that of B (A.start < B.start),
   * then A is retained; otherwise, B is retained.</li>
   * </ol>
   * </p>
   *
   * @param { TextDataDetectorConfig } config - The config of text data detector.
   * @returns { TextAttribute } The attribute of the text.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  dataDetectorConfig(config: TextDataDetectorConfig): TextAttribute;

  /**
   * Enable selected data detector.
   *
   * @param { boolean | undefined } enable - Whether to enable the selected data detector.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 22 dynamic
   */
  enableSelectedDataDetector(enable: boolean | undefined): TextAttribute

  /**
   * Bind to the selection menu.
   *
   * @param { TextSpanType } spanType - Indicates the type of selection menu.
   * @param { CustomBuilder } content - Indicates the content of selection menu.
   * @param { TextResponseType } responseType - Indicates response type of selection menu.
   * @param { SelectionMenuOptions } [options] - Indicates the options of selection menu.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Bind to the selection menu.
   *
   * <p><strong>NOTE</strong>:
   * <br>The duration required for a long-press gesture is 600 ms for bindSelectionMenu and 800 ms for bindContextMenu.
   * <br>When both bindSelectionMenu and bindContextMenu are set and both are configured to be triggered by a long-press gesture,
   * bindSelectionMenu is triggered first.
   * <br>If the custom menu is too long, embed a Scroll component to prevent the keyboard from being blocked.
   * </p>
   *
   * @param { TextSpanType } spanType - Indicates the type of selection menu.Default value is TextSpanType.TEXT.
   * @param { CustomBuilder } content - Indicates the content of selection menu.
   * @param { TextResponseType } responseType - Indicates response type of selection menu.Default value is TextResponseType.LONG_PRESS.
   * @param { SelectionMenuOptions } [options] - Indicates the options of selection menu.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  bindSelectionMenu(spanType: TextSpanType, content: CustomBuilder, responseType: TextResponseType,
    options?: SelectionMenuOptions): TextAttribute;

  /**
   * Called when the text selection changes.
   *
   * @param { function } callback - callback of the listened event.
   * @returns { TextAttribute } returns the instance of the TextAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Called when the text selection changes.
   *
   * @param { function } callback - callback of the listened event.
   * @returns { TextAttribute } returns the instance of the TextAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onTextSelectionChange(callback: (selectionStart: number, selectionEnd: number) => void): TextAttribute;

  /**
   * Set font feature.
   *
   * @param { string } value - The fontFeature.
   * normal | <feature-tag-value>, 
   * where <feature-tag-value> = <string> [ <integer> | on | off ], like: "ss01" 0
   * the values of <feature-tag-value> reference to doc of text component
   * number of <feature-tag-value> can be single or multiple, and separated by comma ','.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 12 dynamic
   */
  fontFeature(value: string): TextAttribute;
  
  /**
   * Set the marquee options.
   *
   * @param { Optional<TextMarqueeOptions> } options
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  marqueeOptions(options: Optional<TextMarqueeOptions>): TextAttribute;

  /**
   * Called when the text marquee state changes.
   *
   * @param { Callback<MarqueeState> } callback - callback of the marquee state change event.
   * @returns { TextAttribute } returns the instance of the TextAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onMarqueeStateChange(callback: Callback<MarqueeState>): TextAttribute;

  /**
   * Whether to support sensitive privacy information
   *
   * <p><strong>NOTE</strong>:
   * <br>The value true means to enable privacy mode, in which case text is obscured as hyphens (-).
   * <br>If this parameter is set to null, privacy mode is disabled.
   * <br>Enabling privacy mode requires widget framework support.
   * </p>
   *
   * @param { boolean } supported - Whether to support sensitive privacy information.Default value is false.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @atomicservice
   * @since 12 dynamic
   */
  privacySensitive(supported: boolean): TextAttribute;

  /**
   * set text selectable and focusable
   *
   * @param { TextSelectableMode } mode - Default value is TextSelectableMode.SELECTABLE_UNFOCUSABLE.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  textSelectable(mode: TextSelectableMode): TextAttribute;

  /**
   * Set the custom text menu.
   * Sets the extended options of the custom context menu on selection,
   * including the text content, icon, and callback.
   *
   * @param { EditMenuOptions } editMenu - Customize text menu options.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  editMenuOptions(editMenu: EditMenuOptions): TextAttribute;

  /**
   * Set the text with half leading.
   *
   * <p><strong>NOTE</strong>:
   * <br>The halfLeading settings configured within the component take precedence over those in module.json5.
   * <br>The value true means that half leading is enabled, and false means the opposite.
   * </p>
   *
   * @param { boolean } halfLeading - Default value is false.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  halfLeading(halfLeading: boolean): TextAttribute;

  /**
   * Enable or disable haptic feedback.
   *
   * @param { boolean } isEnabled - Default value is true, set false to disable haptic feedback.
   * @returns { TextAttribute } returns the instance of the TextAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 13 dynamic
   */
  enableHapticFeedback(isEnabled: boolean): TextAttribute;

  /**
   * Set whether to optimize the trailing spaces at the end of each line during text layout.
   *
   * @param { Optional<boolean> } optimize - Default value is false, set true to optimize the trailing spaces at the end of each line.
   * @returns { TextAttribute } returns the instance of the TextAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  optimizeTrailingSpace(optimize: Optional<boolean>): TextAttribute;

  /**
   * Whether to enable automatic spacing between Chinese and Latin characters.
   *
   * @param { Optional<boolean> } enabled - The default value is false, indicates the flag whether to enable automatic spacing.
   * @returns { TextAttribute } returns the instance of the TextAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  enableAutoSpacing(enabled: Optional<boolean>): TextAttribute;

  /**
   * Set text transition.
   *
   * @param { Optional<ContentTransition> } transition - The transition of text.
   * @returns { TextAttribute } returns the instance of the TextAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 20 dynamic
   */
  /**
   * Set text transition.
   *
   * @param { Optional<ContentTransition> } transition - The transition of text.
   * @returns { TextAttribute } returns the instance of the TextAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  contentTransition(transition: Optional<ContentTransition>): TextAttribute;

  /**
   * Determines whether the layout adds extra padding at the top and bottom to make space for characters.
   *
   * @param { Optional<boolean> } include - Whether enable the feature, the default value is false.
   * @returns { TextAttribute } returns the instance of the TextAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  includeFontPadding(include: Optional<boolean>): TextAttribute;

  /**
   * Whether to include ascent/descent from fallback fonts to prevent overlapping lines.
   *
   * @param { Optional<boolean> } enabled - Whether enable the feature, the default value is false.
   * @returns { TextAttribute } returns the instance of the TextAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  fallbackLineSpacing(enabled: Optional<boolean>): TextAttribute;

  /**
   * Whether to compress punctuation at the beginning of line.
   *
   * @param { Optional<boolean> } enabled - Whether to enable the feature, the default value is false.
   * @returns { TextAttribute } - returns the instance of the TextAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  compressLeadingPunctuation(enabled: Optional<boolean>): TextAttribute;

  /**
   * Used to set the selected drag preview style.
   *
   * @param { SelectedDragPreviewStyle | undefined } value - Selected drag preview style.
   *     If set undefined will reset the style.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  selectedDragPreviewStyle(value: SelectedDragPreviewStyle | undefined): TextAttribute;

  /**
   * Set the text direction.
   *
   * @param { TextDirection | undefined } direction - Indicates the text direction.
   *     When undefined is set, this property will be reset to TextDirection.DEFAULT.
   * @returns { TextAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  textDirection(direction: TextDirection | undefined): TextAttribute;
}

/**
 * Defines Text Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Text Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @since 9
 */
/**
 * Defines Text Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Defines Text Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare const TextInstance: TextAttribute;

/**
 * Defines Text Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Text Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @since 9
 */
/**
 * Defines Text Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Defines Text Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare const Text: TextInterface;

/**
 * Defines span type.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Defines span type.
 *
 * <p><strong>NOTE</strong>:
 * <br>The order for menu type matching is as follows.
 * <br>When the user interacts with text, the system follows this order to decides which type of menu to display.
 * <ol>
 * <li>Check whether a menu is registered for TextSpanType.TEXT and TextResponseType.LONG_PRESS.</li>
 * <li>Check whether a menu is registered for TextSpanType.TEXT and TextResponseType.DEFAULT.</li>
 * <li>Check whether a menu is registered for TextSpanType.DEFAULT and TextResponseType.LONG_PRESS.</li>
 * <li>Check whether a menu is registered for TextSpanType.DEFAULT and TextResponseType.DEFAULT.</li>
 * </ol>
 * </p>
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare enum TextSpanType {
  /**
   * Only contains text.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Only contains text.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  TEXT = 0,

  /**
   * Only contains image.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Only contains image.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  IMAGE = 1,

  /**
   * Contains both text and image.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Contains both text and image.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  MIXED = 2,

  /**
   * When no other types are explicitly specified, this type will be matched.
   * When this type is registered but TEXT, IMAGE, or MIXED types are not registered,
   * this type will be triggered and displayed for those registered types.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  DEFAULT = 3,
}

/**
 * ResponseType for contextMenu
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * ResponseType for contextMenu
 *
 * <p><strong>NOTE</strong>:
 * <br>The order for menu type matching is as follows. When the user interacts with text,
 * the system follows this order to decides which type of menu to display.
 * <ol>
 * <li>Check whether a menu is registered for TextSpanType.TEXT and TextResponseType.LONG_PRESS.</li>
 * <li>Check whether a menu is registered for TextSpanType.TEXT and TextResponseType.DEFAULT.</li>
 * <li>Check whether a menu is registered for TextSpanType.DEFAULT and TextResponseType.LONG_PRESS.</li>
 * <li>Check whether a menu is registered for TextSpanType.DEFAULT and TextResponseType.DEFAULT.</li>
 * </ol>
 * </p>
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare enum TextResponseType {
  /**
   * Right click.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Right click.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  RIGHT_CLICK = 0,

  /**
   * Long press.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Long press.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  LONG_PRESS = 1,

  /**
   * Selected by mouse.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Selected by mouse.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  SELECT = 2,

  /**
   * When no other types are explicitly specified, this type will be matched.
   * When this type is registered but RIGHT_CLICK, LONG_PRESS, or SELECT types are not registered,
   * this type will be triggered and displayed for right-click, long press, and mouse selection actions.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  DEFAULT = 3,
}

/**
 * Defines marquee state.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
declare enum MarqueeState {
  /**
   * The marquee started.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  START = 0,

  /**
   * The marquee a round finished and start next round.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  BOUNCE = 1,

  /**
   * The marquee all finished.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  FINISH = 2,

  /**
   * The marquee is stoped.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 26.0.0 dynamic
   */
  STOP = 3,
}

/**
 * Defines marquee start policy.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
declare enum MarqueeStartPolicy {
  /**
   * Start marquee in any case. This is the default policy.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  DEFAULT = 0,

  /**
   * Start marquee only when get focus.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  ON_FOCUS = 1,
}

/**
 * Marquee scrolling policy after text update.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 23 dynamic
 */
declare enum MarqueeUpdatePolicy {
  /**
   * Reset scroll position and restart scroll.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  DEFAULT = 0,

  /**
   * Preserve scroll position, just change to new text.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  PRESERVE_POSITION = 1
}

/**
 * Defines the options of Text.
 *
 * @interface TextOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Defines the options of Text.
 *
 * @interface TextOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface TextOptions {
  /**
   * Text controller.
   *
   * @type { TextController }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Text controller.
   *
   * @type { TextController }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  controller: TextController;
}

/**
 * Defines the marquee options.
 *
 * @interface TextMarqueeOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
declare interface TextMarqueeOptions {
  /**
   * Is need start marquee.
   *
   * @type { boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  start: boolean;

  /**
   * The step size of the marquee.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  step?: number;

  /**
   * The spacing between two rounds of marquee.
   *
   * <p><strong>NOTE</strong>:
   * <br>Default value is 48vp.
   * </p>
   *
   * @type { ?LengthMetrics }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  spacing?: LengthMetrics;

  /**
   * The rounds of the marquee.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  loop?: number;

  /**
   * The running direction of the marquee.
   *
   * @type { ?boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  fromStart?: boolean;

  /**
   * The waiting time between each round of the marquee.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  delay?: number;

  /**
   * Set whether the text is faded out.
   * 
   * @type { ?boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  fadeout?: boolean;

  /**
   * The start policy for marquee.
   * 
   * @type { ?MarqueeStartPolicy }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  marqueeStartPolicy?: MarqueeStartPolicy;

  /**
   * Marquee scrolling policy after text update.
   *
   * <p><strong>NOTE</strong>:
   * <br>This attribute takes effect when the marquee is in the playing state
   *     and the text content width exceeds the width of the marquee component.
   *     Default value is MarqueeUpdatePolicy.DEFAULT.
   * </p>
   *
   * @type { ?MarqueeUpdatePolicy }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  marqueeUpdatePolicy?: MarqueeUpdatePolicy;
}

/**
 * Defines the controller of Text.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Defines the controller of Text.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare class TextController {
  /**
   * Close the select menu when menu is on.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Close the select menu when menu is on.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  closeSelectionMenu(): void;

  /**
   * Update the styles of StyledString by setStyledString.
   *
   * <p><strong>NOTE</strong>:
   * <br>The child class MutableStyledString of StyledString can also serve as the argument.
   * </p>
   *
   * @param { StyledString } value
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  setStyledString(value: StyledString): void;

  /**
   * Get LayoutManager.
   *
   * @returns { LayoutManager } - Return the LayoutManager.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  getLayoutManager(): LayoutManager;

  /**
   * Text selection is achieved by specifying the start and end positions of the text.
   *
   * <p><strong>NOTE</strong>:
   * <br>If selectionStart or selectionEnd is set to undefined, the value 0 will be used.
   * <br>If a 2-in-1 device is used,
   *     calling setTextSelection does not display the context menu even when options is set to MenuPolicy.SHOW.
   * <br>If the selected text contains an emoji,
   * the emoji is selected when its start position is within the text selection range.
   * </p>
   *
   * @param { number | undefined } selectionStart - The start position of the selected text.
   * @param { number | undefined } selectionEnd - The end position of the selected text.
   * @param { SelectionOptions } [options] - Indicates the options of the text selection.
   *     Default value is MenuPolicy.DEFAULT.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  setTextSelection(selectionStart: number | undefined, selectionEnd: number | undefined,
    options?: SelectionOptions): void;
}
