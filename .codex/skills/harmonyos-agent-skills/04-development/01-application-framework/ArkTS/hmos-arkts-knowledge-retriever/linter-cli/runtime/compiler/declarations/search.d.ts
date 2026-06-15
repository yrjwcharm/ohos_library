/*
 * Copyright (c) 2021-2025 Huawei Device Co., Ltd.
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
 * Provides the method of switching the cursor position.
 *
 * @extends TextContentControllerBase
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Provides the method of switching the cursor position.
 *
 * @extends TextContentControllerBase
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provides the method of switching the cursor position.
 *
 * @extends TextContentControllerBase
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare class SearchController extends TextContentControllerBase {
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
   * A constructor used to create a SearchController object.
   * 
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  constructor();

  /**
   * Called when the position of the insertion cursor is set.
   *
   * @param { number } value
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Called when the position of the insertion cursor is set.
   *
   * @param { number } value
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the position of the insertion cursor is set.
   *
   * @param { number } value - Length from the start of the character string to the position where the caret is located.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  caretPosition(value: number): void;

  /**
   * Exit edit state.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Exit edit state.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  stopEditing(): void;

  /**
   * Text selection is achieved by specifying the start and end positions of the text.
   * 
   * <p><strong>NOTE</strong>:
   * <br>If selectionStart or selectionEnd is set to undefined, the value 0 will be used.
   * <br>If <em>selectionMenuHidden</em> is set to <em>true</em> or a 2-in-1 device is used,
   * calling setTextSelection does not display the context menu even when options is set to <em>MenuPolicy.SHOW</em>.
   * <br>If the selected text contains an emoji, the emoji is selected when its start position is within the text selection range.
   * <br>Sets the text selection range and highlights the selected text when the component is focused.
   * <br>This API works only when the value of selectionStart is less than that of selectionEnd.
   * </p>
   * 
   * @param { number } selectionStart - The start position of the selected text.
   * The start position of text in the text box is 0.
   * A value less than 0 is handled as 0.
   * A value greater than the maximum text length is handled as the maximum text length.
   * @param { number } selectionEnd - The end position of the selected text.
   * A value less than 0 is handled as the value 0.
   * A value greater than the maximum text length is handled as the maximum text length.
   * @param { SelectionOptions } [options] - Indicates the options of the text selection.Default value is MenuPolicy.DEFAULT.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  setTextSelection(selectionStart: number, selectionEnd: number, options?: SelectionOptions): void;
}

/**
 * Enum for the style of cancel button
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Enum for the style of cancel button
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare enum CancelButtonStyle {
  /**
   * The value of button style constant
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * The value of button style constant
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  CONSTANT,

  /**
   * The value of button style invisible
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * The value of button style invisible
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  INVISIBLE,

  /**
   * The value of button style input
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * The value of button style input
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  INPUT
}

/**
 * Declare the type of search input box
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Declare the type of search input box
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare enum SearchType {
  /**
   * Basic input mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Basic input mode.
   * The value can contain digits, letters, underscores (_), spaces, and special characters.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  NORMAL = 0,

  /**
   * Pure digital input mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Pure digital input mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  NUMBER = 2,

  /**
   * Phone number entry mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Phone number entry mode.
   * In this mode, the following are allowed: digits, spaces, plus signs (+), hyphens (-), asterisks (*), and number signs (#);
   * the length is not limited.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  PHONE_NUMBER = 3,

  /**
   * E-mail address input mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * E-mail address input mode.
   * This mode accepts only digits, letters, underscores (_), dots (.),
   * and the following special characters: ! # $ % & ' * + - / = ? ^ ` { | } ~ @ (which can only appear once)
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  EMAIL = 5,

  /**
   * Number decimal entry mode.
   * The value can contain digits and one decimal point.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  NUMBER_DECIMAL = 12,
  
  /**
   * URL entry mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  URL = 13,

  /**
   * One time code mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 20 dynamic
   */
  ONE_TIME_CODE = 14,
}

/**
 * Options used to construct the search.
 *
 * Anonymous Object Rectification.
 * @typedef SearchOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
declare interface SearchOptions {
  /**
   * Text input in the search text box.
   *
   * @type { ?string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Text input in the search text box.
   *
   * @type { ?string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 11
   */
  /**
   * Text input in the search text box.
   *
   * Anonymous Object Rectification.
   * 
   * <p><strong>NOTE</strong>:
   * <br>Since API version 10, this parameter supports two-way binding through $$.
   * <br>Since API version 18, this parameter supports two-way binding through !!.
   * </p>
   * 
   * @type { ?string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 18
   */
  /**
   * Text input in the search text box.
   *
   * @type { ?ResourceStr }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  value?: ResourceStr;

  /**
   * Text displayed when there is no input.
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Text displayed when there is no input.
   *
   * @type { ?ResourceStr }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Text displayed when there is no input.
   *
   * @type { ?ResourceStr }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 11
   */
  /**
   * Text displayed when there is no input.
   *
   * Anonymous Object Rectification.
   *
   * @type { ?ResourceStr }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  placeholder?: ResourceStr;

  /**
   * Path to the search icon.
   *
   * @type { ?string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Path to the search icon.
   *
   * @type { ?string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 11
   */
  /**
   * Path to the search icon.
   *
   * Anonymous Object Rectification.
   * 
   * <p><strong>NOTE</strong>:
   * <br>The icon data source can be a local or online image.
   * <ul>
   * <li>The supported formats include PNG, JPG, BMP, SVG, GIF, pixelmap, and HEIF.</li>
   * <li>The Base64 string is supported in the following format:
   * data:image/[png|jpeg|bmp|webp|heif];base64,[base64 data], where [base64 data] is a Base64 string.</li>
   * </ul>
   * <br>If this attribute and the searchIcon attribute are both set, the searchIcon attribute takes precedence.
   * </p>
   * 
   * @type { ?string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  icon?: string;

  /**
   * Controller of the <Search> component.
   *
   * @type { ?SearchController }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Controller of the <Search> component.
   *
   * @type { ?SearchController }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 11
   */
  /**
   * Controller of the <Search> component.
   *
   * Anonymous Object Rectification.
   *
   * @type { ?SearchController }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  controller?: SearchController;
}

/**
 * The construct function of search
 *
 * @interface SearchInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * The construct function of search
 *
 * @interface SearchInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * The construct function of search
 *
 * @interface SearchInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
interface SearchInterface {
  /**
   * The options of SearchInterface
   *
   * @param { object } options
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * The options of SearchInterface
   *
   * @param { object } options
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * The options of SearchInterface
   *
   * @param { object } options
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * The options of SearchInterface.
   *
   * Anonymous Object Rectification.
   * @param { SearchOptions } [options] - Search options.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  (options?: SearchOptions): SearchAttribute;
}

/**
 * Defines the icon options
 *
 * @interface IconOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the icon options
 *
 * @interface IconOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
interface IconOptions {
  /**
   * Set the icon size
   *
   * @type { ?Length }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set the icon size
   * 
   * <p><strong>NOTE</strong>:
   * <br>It cannot be set in percentage.
   * </p>
   * 
   * @type { ?Length }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  size?: Length;

  /**
   * Set the icon color
   *
   * @type { ?ResourceColor }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set the icon color
   *
   * @type { ?ResourceColor }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  color?: ResourceColor;

  /**
   * Set the icon resource
   *
   * @type { ?ResourceStr }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set the icon resource
   *
   * @type { ?ResourceStr }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  src?: ResourceStr;
}

/**
 * Defines the SearchButton options
 *
 * @interface SearchButtonOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the SearchButton options
 *
 * @interface SearchButtonOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
interface SearchButtonOptions {
  /**
   * Set the SearchButton fontSize
   *
   * @type { ?Length }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set the SearchButton fontSize
   * 
   * <p><strong>NOTE</strong>:
   * <br>It cannot be set in percentage.
   * </p>
   * 
   * @type { ?Length }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  fontSize?: Length;

  /**
   * Set the SearchButton fontColor
   *
   * @type { ?ResourceColor }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set the SearchButton fontColor
   *
   * @type { ?ResourceColor }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  fontColor?: ResourceColor;

  /**
   * Automatically disables the search button before the user enters text
   * 
   * <p><strong>NOTE</strong>:
   * <br><em>true</em>: The search button is disabled when there is no text input.
   * <br><em>false</em>: The search button remains enabled regardless of the text input.
   * </p>
   * 
   * @type { ?Boolean }
   * @default false
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  autoDisable?: Boolean;
}

/**
 * Defines the CancelButton options
 *
 * @interface CancelButtonOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
interface CancelButtonOptions {
  /**
   * Set the CancelButton style
   * Display state of the Cancel button on the right.
   * 
   * @type { ?CancelButtonStyle }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  style?: CancelButtonStyle;

  /**
   * Set the CancelButton icon
   * Icon of the Cancel button on the right.
   * 
   * @type { ?IconOptions }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  icon?: IconOptions;
}

/**
 * Defines the CancelButton symbol options
 *
 * @interface CancelButtonSymbolOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12
 */
/**
 * Defines the CancelButton symbol options
 *
 * @interface CancelButtonSymbolOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20 dynamic
 * @noninterop
 */
interface CancelButtonSymbolOptions {
  /**
   * Set the CancelButton style.
   * Display state of the Cancel button on the right.
   * 
   * @type { ?CancelButtonStyle }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  style?: CancelButtonStyle;

  /**
   * Set the CancelButton symbol icon.
   * Symbol icon of the Cancel button on the right.
   * 
   * @type { ?SymbolGlyphModifier }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12
   */
  /**
   * Set the CancelButton symbol icon.
   * Symbol icon of the Cancel button on the right.
   * 
   * @type { ?SymbolGlyphModifier }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  icon?: SymbolGlyphModifier;
}

/**
 * Declare the event listener callback of the enter key.
 *
 * @typedef { function } SearchSubmitCallback
 * @param { string } searchContent - The submitted content of search.
 * @param { SubmitEvent } [event] - Provides the method of keeping Search editable state when submitted.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 14 dynamic
 */
declare type SearchSubmitCallback = (searchContent: string, event?: SubmitEvent) => void;

/**
 * The attribute function of search
 *
 * @extends CommonMethod<SearchAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * The attribute function of search
 *
 * @extends CommonMethod<SearchAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * The attribute function of search
 *
 * @extends CommonMethod<SearchAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare class SearchAttribute extends CommonMethod<SearchAttribute> {
  /**
   * Set the search button text
   *
   * @param { string } value - indicates the text of the search button.
   * @param { SearchButtonOption } option
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Set the search button text, fontSize and fontColor
   *
   * @param { string } value - indicates the text of the search button.
   * @param { SearchButtonOptions } option - indicates the fontSize and fontColor of the search button.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set the search button text, fontSize and fontColor
   * 
   * <p><strong>NOTE</strong>:
   * <br>Clicking the search button triggers both onSubmit and onClick callbacks.
   * <br>The default font size on wearable devices is 18 fp.
   * </p>
   * 
   * 
   * @param { string } value - indicates the text of the search button.
   * @param { SearchButtonOptions } option - indicates the fontSize and fontColor of the search button.
   *                                         Default value is { fontSize: '16fp', fontColor: '#ff3f97e9' }
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Set the search button text, fontSize and fontColor
   *
   * @param { ResourceStr } value - indicates the text of the search button.
   * @param { SearchButtonOptions } option - indicates the fontSize and fontColor of the search button.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  searchButton(value: ResourceStr, option?: SearchButtonOptions): SearchAttribute;

  /**
   * Set the text Color
   *
   * @param { ResourceColor } value - indicates the color of the text.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set the text Color
   * 
   * <p><strong>NOTE</strong>:
   * <br>Universal text attributes fontSize, fontStyle, fontWeight, and fontFamily are set in the textFont attribute.
   * </p>
   * 
   * @param { ResourceColor } value - indicates the color of the text.Default value is '#FF182431'.The default value on wearable devices is '#dbffffff'.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  fontColor(value: ResourceColor): SearchAttribute;

  /**
   * Set the search icon style
   *
   * @param { IconOptions } value - indicates the style of the search icon.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set the search icon style
   *
   * @param { IconOptions } value - indicates the style of the search icon.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Set the search icon style
   * 
   * <p><strong>NOTE</strong>:
   * <br>The default icon size on wearable devices is 16 vp.
   * <br>Default value in light mode:
   * <code>
   * {
   *    size: '16vp',
   *    color: '#99182431',
   *    src: ' '
   * }
   * </code>
   * <br>Default value in dark mode:
   * <code>
   * {
   *    size: '16vp',
   *    color: '#99ffffff',
   *    src: ' '
   * }
   * </code>
   * </p>
   * 
   * @param { IconOptions | SymbolGlyphModifier } value - indicates the style of the search icon.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  searchIcon(value: IconOptions | SymbolGlyphModifier): SearchAttribute;

  /**
   * Set the cancel button style
   *
   * @param { object } value - indicates the style of the cancel button.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set the cancel button style
   *
   * @param { object } value - indicates the style of the cancel button.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Set the cancel button style
   * 
   * <p><strong>NOTE</strong>:
   * <br>The default icon size on wearable devices is 18 vp.
   * <br>When style is set to CancelButtonStyle.CONSTANT, the Cancel button is always displayed.
   * <br>Default value:
   * <code>
   * {
   *    style: CancelButtonStyle.INPUT,
   *    icon: {
   *    size: '16vp',
   *    color: '#99ffffff',
   *    src: ' '
   *    }
   * }
   * </code>
   * </p>
   * 
   * @param { CancelButtonOptions | CancelButtonSymbolOptions } value - indicates the style of the cancel button.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  cancelButton(value: CancelButtonOptions | CancelButtonSymbolOptions): SearchAttribute;

  /**
   * Enable selected data detector.
   *
   * @param { boolean | undefined } enable - whether to enable the selected data detector.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 22 dynamic
   */
  enableSelectedDataDetector(enable: boolean | undefined): SearchAttribute

  /**
   * Specify the indentation of the first line in a text-block.
   *
   * @param { Dimension } value - The length of text indent.Default value is 0.
   * @returns { SearchAttribute } The attribute of the text.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  textIndent(value: Dimension): SearchAttribute;

  /**
   * Called when the inputFilter of text is set.
   * 
   * <p><strong>NOTE</strong>:
   * <br>Only inputs that comply with the regular expression can be displayed.
   * <br>Other inputs are filtered out.
   * <br>The specified regular expression can match single characters, but not strings.
   * <br>If inputFilter is set and the entered characters are not null,
   * the filtering effect attached to the text box type (specified through the type attribute) does not take effect.
   * </p>
   * 
   * @param { ResourceStr } value - Regular expression.
   * @param { Callback<string> } error - Filtered-out content to return when regular expression matching fails.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  inputFilter(value: ResourceStr, error?: Callback<string>): SearchAttribute;

  /**
   * Called when judging whether the text editing change finished.
   * The text box is in the editing state when it has the caret placed in it, and is in the non-editing state otherwise.
   * 
   * @param { Callback<boolean> } callback - Returns true if the component is in an editing state.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onEditChange(callback: Callback<boolean>): SearchAttribute;

  /**
   * Define the text selected background color of the text input.
   * 
   * <p><strong>NOTE</strong>:
   * <br>If the opacity is not set, a 20% opacity will be used.
   * </p>
   * 
   * @param { ResourceColor } value
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  selectedBackgroundColor(value: ResourceColor): SearchAttribute;

  /**
   * Set the cursor style
   *
   * @param { CaretStyle } value - indicates the style of the cursor.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set the cursor style
   * 
   * <p><strong>NOTE</strong>:
   * <br>Since API version 12, this API can be used to set the text handle color, which is the same as the caret color.
   * <br>Default value:
   * <code>
   * {
   *    width: '1.5vp',
   *    color: '#007DFF'
   * }
   * </code>
   * </p>
   * 
   * @param { CaretStyle } value - indicates the style of the cursor.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  caretStyle(value: CaretStyle): SearchAttribute;

  /**
   * Set the place hold text color
   *
   * @param { ResourceColor } value
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Set the place hold text color
   *
   * @param { ResourceColor } value
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set the place hold text color
   *
   * @param { ResourceColor } value - Default value is '#99182431'.The default value on wearable devices is '#99ffffff'.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  placeholderColor(value: ResourceColor): SearchAttribute;

  /**
   * Set the font used for place holder text
   *
   * @param { Font } value
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Set the font used for place holder text
   *
   * @param { Font } value
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set the font used for place holder text
   * 
   * <p><strong>NOTE</strong>:
   * <br>The 'HarmonyOS Sans' font and registered custom fonts are supported.
   * <br>The default font size on wearable devices is 18 px.
   * </p>
   * 
   * @param { Font } value
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  placeholderFont(value?: Font): SearchAttribute;

  /**
   * Set the font used for input text
   *
   * @param { Font } value
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Set the font used for input text
   *
   * @param { Font } value
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set the font used for input text
   * 
   * <p><strong>NOTE</strong>:
   * <br>Currently, only the default font family is supported.
   * <br>The default font size on wearable devices is 18 fp.
   * </p>
   * 
   * @param { Font } value
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  textFont(value?: Font): SearchAttribute;

  /**
   * Set enter key type of soft keyboard
   *
   * @param { EnterKeyType } value - Default value is EnterKeyType.Search.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  enterKeyType(value: EnterKeyType): SearchAttribute;

  /**
   * Call the function when clicked the search button
   *
   * @param { function } callback
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Call the function when clicked the search button
   *
   * @param { function } callback
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Call the function when clicked the search button
   *
   * @param { function } callback
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Call the function when clicked the search button.
   *
   * Anonymous Object Rectification.
   * @param { Callback<string> } callback - Search submission callback, which returns the text content currently in the search box.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onSubmit(callback: Callback<string>): SearchAttribute;
  /**
   * Call the function when clicked the search button.
   * The submission event provides a method to maintain the edit state of the Search component.
   * 
   * @param { SearchSubmitCallback } callback - callback of the listened event.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 14 dynamic
   */
  onSubmit(callback: SearchSubmitCallback): SearchAttribute;

  /**
   * Call the function when editing the input text
   *
   * @param { function } callback
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Call the function when editing the input text
   *
   * @param { function } callback
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Call the function when editing the input text
   *
   * @param { function } callback
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Call the function when editing the input text
   * 
   * <p><strong>NOTE</strong>:
   * <br>In this callback, if cursor operations are performed,
   * developers need to adjust the cursor logic based on the previewText parameter to ensure it works seamlessly within the preview display scenario.
   * </p>
   * 
   * @param { EditableTextOnChangeCallback } callback
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onChange(callback: EditableTextOnChangeCallback): SearchAttribute;

  /**
   * Called when the text selection changes.
   *
   * @param { function } callback - callback of the listened event.
   * @returns { SearchAttribute } returns the instance of the SearchAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the text selection changes.
   *
   * @param { function } callback - callback of the listened event.
   * @returns { SearchAttribute } returns the instance of the SearchAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Called when the text selection changes.
   *
   * Anonymous Object Rectification.
   * @param { OnTextSelectionChangeCallback } callback - Callback of the listened event.
   * @returns { SearchAttribute } Returns the instance of the SearchAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onTextSelectionChange(callback: OnTextSelectionChangeCallback): SearchAttribute;

  /**
   * Called when the content scrolls.
   *
   * @param { function } callback - callback of the listened event.
   * @returns { SearchAttribute } returns the instance of the SearchAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the content scrolls.
   *
   * @param { function } callback - callback of the listened event.
   * @returns { SearchAttribute } returns the instance of the SearchAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Called when the content scrolls.
   *
   * Anonymous Object Rectification.
   * @param { OnContentScrollCallback } callback - Callback of the listened event.
   * @returns { SearchAttribute } Returns the instance of the SearchAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onContentScroll(callback: OnContentScrollCallback): SearchAttribute;

  /**
   * Called when using the Clipboard menu
   *
   * @param { function } callback
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Called when using the Clipboard menu
   *
   * @param { function } callback
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when using the Clipboard menu
   *
   * @param { function } callback
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Called when using the Clipboard menu.
   *
   * Anonymous Object Rectification.
   * @param { Callback<string> } callback - Callback used to return the copied text content.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onCopy(callback: Callback<string>): SearchAttribute;

  /**
   * Called when using the Clipboard menu
   *
   * @param { function } callback
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Called when using the Clipboard menu
   *
   * @param { function } callback
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when using the Clipboard menu
   *
   * @param { function } callback
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Called when using the Clipboard menu.
   *
   * Anonymous Object Rectification.
   * @param { Callback<string> } callback - Callback used to return the cut text content.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onCut(callback: Callback<string>): SearchAttribute;

  /**
   * Called when using the Clipboard menu
   *
   * @param { function } callback
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Called when using the Clipboard menu
   *
   * @param { function } callback
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when using the Clipboard menu
   *
   * @param { function } callback
   *          Executed when a paste operation is performed.
   *          { string } value - The text content to be pasted.
   *          { PasteEvent } event - The user-defined paste event.
   * @returns { SearchAttribute } returns the instance of the SearchAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Called when using the Clipboard menu.
   *
   * Anonymous Object Rectification.
   * @param { OnPasteCallback } callback - Executed when a paste operation is performed.Callback used to return the pasted text content.
   * @returns { SearchAttribute } Returns the instance of the SearchAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onPaste(callback: OnPasteCallback): SearchAttribute;

  /**
   * Called when the copy option is set.
   *
   * @param { CopyOptions } value
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Called when the copy option is set.
   *
   * @param { CopyOptions } value
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the copy option is set.
   * 
   * <p><strong>NOTE</strong>:
   * <br>If this attribute is set to CopyOptions.None, the text can only be pasted;
   * all other actions, such as copying, cutting, and sharing, are disabled.
   * <br>Dragging is not allowed when CopyOptions.None is set.
   * </p>
   * 
   * @param { CopyOptions } value - Default value is CopyOptions.LocalDevice.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  copyOption(value: CopyOptions): SearchAttribute;

  /**
   * Called when the input of maximum text length is set.
   *
   * @param { number } value
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 11
   */
  /**
   * Called when the input of maximum text length is set.
   * 
   * <p><strong>NOTE</strong>:
   * <br>By default, there is no maximum number of characters.
   * <br>When the maximum number is reached, no more characters can be entered.
   * </p>
   * 
   * @param { number } value
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12
   */
  /**
   * Called when the input of maximum text length is set.
   * 
   * <p><strong>NOTE</strong>:
   * <br>By default, there is no maximum number of characters.
   * <br>When the maximum number is reached, no more characters can be entered.
   * </p>
   * 
   * @param { number } value
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  maxLength(value: number): SearchAttribute;

  /**
   * Called when the text align is set.
   *
   * @param { TextAlign } value
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Called when the text align is set.
   *
   * @param { TextAlign } value
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the text align is set.
   * 
   * <p><strong>NOTE</strong>:
   * <br>Currently, the following alignment modes are supported: Start, Center, and End.
   * </p>
   * 
   * @param { TextAlign } value - Default value is TextAlign.Start.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  textAlign(value: TextAlign): SearchAttribute;

  /**
   * Sets whether request keyboard or not when on focus.
   *
   * @param { boolean } value
   * @returns { SearchAttribute } Returns the instance of the SearchAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets whether request keyboard or not when on focus.
   * 
   * <p><strong>NOTE</strong>:
   * <br>Since API version 10, the Search component brings up the keyboard by default when it obtains focus.
   * </p>
   * 
   * @param { boolean } value - Default value is true.
   * @returns { SearchAttribute } Returns the instance of the SearchAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  enableKeyboardOnFocus(value: boolean): SearchAttribute;

  /**
   * Controls whether the selection menu pops up.
   *
   * @param { boolean } value
   * @returns { SearchAttribute } returns the instance of the SearchAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Controls whether the selection menu pops up.
   *
   * <p><strong>NOTE</strong>:
   * <br><em>true</em>: Tapping, long-pressing, double-tapping, triple-tapping,
   * or right-clicking the text box will not trigger the system text selection menu.
   * <br><em>false</em>: Tapping, long-pressing, double-tapping, triple-tapping,
   * or right-clicking the text box will trigger the system text selection menu.
   * </p>
   * 
   * @param { boolean } value - Default value is false.
   * @returns { SearchAttribute } returns the instance of the SearchAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  selectionMenuHidden(value: boolean): SearchAttribute;

  /**
   * Called when the minimum font size of the font is set.
   *
   * <p><strong>NOTE</strong>:
   * <br>For the string type, numeric string values with optional units, for example, "10" or "10fp", are supported.
   * <br>For the setting to take effect, this attribute must be used together with maxFontSize or layout constraint settings.
   * <br>When the adaptive font size is used, the fontSize settings do not take effect.
   * </p>
   * 
   * @param { number | string | Resource } value - The unit is fp.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  minFontSize(value: number | string | Resource): SearchAttribute;

  /**
   * Called when the maximum font size of the font is set.
   * 
   * <p><strong>NOTE</strong>:
   * <br>For the string type, numeric string values with optional units, for example, "10" or "10fp", are supported.
   * <br>For the setting to take effect, this attribute must be used together with minFontSize or layout constraint settings.
   * <br>When the adaptive font size is used, the fontSize settings do not take effect.
   * </p>
   * 
   * @param { number | string | Resource } value - The unit is fp.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  maxFontSize(value: number | string | Resource): SearchAttribute;

  /**
   * Called when the minimum font scale of the font is set.
   * Value range: [0, 1]
   * 
   * <p><strong>NOTE</strong>:
   * <br>The undefined type is supported.
   * <br>A value less than 0 is handled as 0.
   * <br>A value greater than 1 is handled as 1.
   * <br>Abnormal values are ineffective by default.
   * </p>
   * 
   * @param { Optional<number | Resource> } scale
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 18
   */
  /**
   * Called when the minimum font scale of the font is set.
   * Value range: [0, 1]
   * 
   * <p><strong>NOTE</strong>:
   * <br>The undefined type is supported.
   * <br>A value less than 0 is handled as 0.
   * <br>A value greater than 1 is handled as 1.
   * <br>Abnormal values are ineffective by default.
   * </p>
   * 
   * @param { Optional<number | Resource> } scale
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  minFontScale(scale: Optional<number | Resource>): SearchAttribute;

   /**
    * Called when the maximum font scale of the font is set.
    * Value range: [1, +∞)
    * 
    * <p><strong>NOTE</strong>:
    * <br>The undefined type is supported.
    * <br>A value less than 1 is handled as 1.
    * <br>Abnormal values are ineffective by default.
    * </p>
    * 
    * @param { Optional<number | Resource> } scale
    * @returns { SearchAttribute }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @atomicservice
    * @since 18
    */
   /**
    * Called when the maximum font scale of the font is set.
    * Value range: [1, +∞)
    * 
    * <p><strong>NOTE</strong>:
    * <br>The undefined type is supported.
    * <br>A value less than 1 is handled as 1.
    * <br>Abnormal values are ineffective by default.
    * </p>
    * 
    * @param { Optional<number | Resource> } scale
    * @returns { SearchAttribute }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 20 dynamic
    */
   maxFontScale(scale: Optional<number | Resource>): SearchAttribute;
   
  /**
   * Define custom keyboard.
   *
   * @param { CustomBuilder } value
   * @returns { SearchAttribute } returns the instance of the SearchAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Define custom keyboard.
   *
   * @param { CustomBuilder } value
   * @returns { SearchAttribute } returns the instance of the SearchAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Define custom keyboard.
   * 
   * <p><strong>NOTE</strong>:
   * <br>When a custom keyboard is set, activating the text box opens the specified custom component,
   * instead of the system input method.
   * <br>The custom keyboard's height can be set through the height attribute of the custom component's root node,
   * and its width is fixed at the default value.
   * <br>The custom keyboard is presented by overlaying the original screen.
   * <br>It is not compressed or lifted if avoid mode is not enabled or avoidance is not needed for the text box.
   * <br>The custom keyboard cannot obtain the focus, but it blocks gesture events.
   * <br>By default, the custom keyboard is closed when the input component loses the focus.
   * <br>You can also use the stopEditing API to close the keyboard.
   *  <br>When a custom keyboard is set, the text box does not support camera input, even when the device supports.
   * <br>When setting a custom keyboard, you can bind the onKeyPrelme event to prevent input from the physical keyboard.
   * </p>
   * 
   * @param { CustomBuilder } value - Set up a custom keyboard of Search
   * @param { KeyboardOptions } [options] - Indicates the custom keyboard options of Search
   * @returns { SearchAttribute } returns the instance of the SearchAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  /**
   * Define custom keyboard.
   *
   * <p><strong>NOTE</strong>:
   * <br>When a custom keyboard is set, activating the text box opens the specified custom component,
   * instead of the system input method.
   * <br>The custom keyboard's height can be set through the height attribute of the custom component's root node,
   * and its width is fixed at the default value.
   * <br>The custom keyboard is presented by overlaying the original screen.
   * <br>It is not compressed or lifted if avoid mode is not enabled or avoidance is not needed for the text box.
   * <br>The custom keyboard cannot obtain the focus, but it blocks gesture events.
   * <br>By default, the custom keyboard is closed when the input component loses the focus.
   * <br>You can also use the stopEditing API to close the keyboard.
   * <br>When a custom keyboard is set, the text box does not support camera input, even when the device supports.
   * <br>When setting a custom keyboard, you can bind the onKeyPrelme event to prevent input from the physical keyboard.
   * </p>
   * 
   * @param { CustomBuilder | ComponentContent | undefined } value - Set up a custom keyboard of Search
   * @param { KeyboardOptions } [options] - Indicates the custom keyboard options of Search
   * @returns { SearchAttribute } returns the instance of the SearchAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  customKeyboard(value: CustomBuilder | ComponentContent | undefined, options?: KeyboardOptions): SearchAttribute;

  /**
   * Called when the text decoration of the text is set.
   *
   * @param { TextDecorationOptions } value - Default value is { type: TextDecorationType.None, color: Color.Black, style: TextDecorationStyle.SOLID }.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  decoration(value: TextDecorationOptions): SearchAttribute;

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
   * @param { number | string | Resource } value - The unit is fp.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  letterSpacing(value: number | string | Resource): SearchAttribute;

  /**
   * Called when the line height of the font is set.
   * 
   * <p><strong>NOTE</strong>:
   * <br>If the value is less than or equal to 0, the line height is not limited and the font size is adaptive.
   * <br>If the value is of the number type, the unit fp is used.
   * </p>
   * 
   * @param { number | string | Resource } value
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  lineHeight(value: number | string | Resource): SearchAttribute;

  /**
   * Called when the search type is set.
   *
   * @param { SearchType } value
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Called when the search type is set.
   *
   * @param { SearchType } value - Default value is SearchType.Normal.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  type(value: SearchType): SearchAttribute;

  /**
   * Set font feature.
   *
   * @param { string } value - The fontFeature.
   * normal | <feature-tag-value>, 
   * where <feature-tag-value> = <string> [ <integer> | on | off ], like: "ss01" 0
   * the values of <feature-tag-value> reference to doc of search component
   * number of <feature-tag-value> can be single or multiple, and separated by comma ','.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  fontFeature(value: string): SearchAttribute;

  /**
   * Get text value information when about to input.
   * 
   * <p><strong>NOTE</strong>:
   * <br>It returns true if the text is inserted; returns false otherwise.
   * <br>This callback is not triggered for pre-edit or candidate word operations.
   * <br>It is available only for system input methods.
   * </p>
   * 
   * @param { Callback<InsertValue, boolean> } callback - The triggered function when text content is about to insert.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onWillInsert(callback: Callback<InsertValue, boolean>): SearchAttribute;

  /**
   * Get text value information when completed input.
   * 
   * <p><strong>NOTE</strong>:
   * <br>It is available only for system input methods.
   * </p>
   * 
   * @param { Callback<InsertValue> } callback - The triggered function when text content has been inserted.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onDidInsert(callback: Callback<InsertValue>): SearchAttribute;

  /**
   * Get text value information when about to delete.
   * 
   * <p><strong>NOTE</strong>:
   * <br>It returns true if the text is deleted; returns false otherwise.
   * <br>This callback is not invoked for text preview.
   * <br>It is available only for system input methods.
   * </p>
   * 
   * @param { Callback<DeleteValue, boolean> } callback - The triggered function when text content is about to delete.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onWillDelete(callback: Callback<DeleteValue, boolean>): SearchAttribute;

  /**
   * Get text value information when the deletion has been completed
   * 
   * <p><strong>NOTE</strong>:
   * <br>It is available only for system input methods.
   * </p>
   * 
   * @param { Callback<DeleteValue> } callback - The triggered function when text content has been deleted.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onDidDelete(callback: Callback<DeleteValue>): SearchAttribute;

  /**
   * Called before the search component attach the InputMethod.
   *
   * @param { Callback<IMEClient> } callback - The triggered function before attach the InputMethod.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  onWillAttachIME(callback: Callback<IMEClient>): SearchAttribute;

  /**
   * Set the custom text menu.
   * Sets the extended options of the custom context menu on selection,
   * including the text content, icon, and callback.
   * 
   * @param { EditMenuOptions } editMenu - Customize text menu options.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  editMenuOptions(editMenu: EditMenuOptions): SearchAttribute;

  /**
   * Define the preview text mode of the text input.
   * 
   * <p><strong>NOTE</strong>:
   * <br>Preview text is in a temporary state and does not support text interception.
   * <br>As such, it does not trigger onWillInsert, onDidInsert, onWillDelete, or onDidDelete callbacks.
   * </p>
   * 
   * @param { boolean } enable - Indicates the preview text mode.Default value is true.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  enablePreviewText(enable: boolean): SearchAttribute;

  /**
   * Enable or disable haptic feedback.
   * 
   * <p><strong>NOTE</strong>:
   * <br>To enable haptic feedback,
   * you must declare the ohos.permission.VIBRATE permission under requestPermissions in the module.json5 file of the project.
   * <code>
   * "requestPermissions": [
   *   {
   *       "name": "ohos.permission.VIBRATE",
   *   }
   * ]
   * </code> 
   * </p>
   * 
   * @param { boolean } isEnabled - Default value is true, set false to disable haptic feedback.
   * @returns { SearchAttribute } returns the instance of the SearchAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 13 dynamic
   */
  enableHapticFeedback(isEnabled: boolean): SearchAttribute;

  /**
   * Set text mode of automatic case mode switching.
   *
   * @param { AutoCapitalizationMode } mode - Automatic case mode switching.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  autoCapitalizationMode(mode: AutoCapitalizationMode): SearchAttribute;

  /**
   * Set the text with half leading.
   *
   * @param { Optional<boolean> } halfLeading - Default value is false.The value true means that half leading is enabled, and false means the opposite.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  halfLeading(halfLeading: Optional<boolean>): SearchAttribute;

  /**
   * Set whether stop backPressed callback event or not.
   *
   * @param { Optional<boolean> } isStopped - Default value is true, set false to trigger the latest callback event.
   * @returns { SearchAttribute } returns the instance of the SearchAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 15 dynamic
   */
  /**
   * Set whether stop backPressed callback event or not.
   *
   * @param { Optional<boolean> } isStopped - Default value is true, set false to trigger the latest callback event.
   * @returns { SearchAttribute } returns the instance of the SearchAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  stopBackPress(isStopped: Optional<boolean>): SearchAttribute;

  /**
   * Get text value information when about to change.
   * 
   * <p><strong>NOTE</strong>:
   * <br>This callback is triggered after onWillInsert and onWillDelete, but before onDidInsert and onDidDelete.
   * </p>
   * 
   * @param { Callback<EditableTextChangeValue, boolean> } callback - The triggered function when text content is about to change.
   * Returning true allows the change to proceed, while returning false cancels the change.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  onWillChange(callback: Callback<EditableTextChangeValue, boolean>): SearchAttribute;

  /**
   * Set the keyboard appearance.
   *
   * @param { Optional<KeyboardAppearance> } appearance - Default value is KeyboardAppearance.NONE_IMMERSIVE
   * @returns { SearchAttribute } returns the instance of the SearchAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 15 dynamic
   */
  keyboardAppearance(appearance: Optional<KeyboardAppearance>): SearchAttribute;

  /**
   * Set the stroke width.
   *
   * @param { Optional<LengthMetrics> } width - indicates the stroke width.
   * @returns { SearchAttribute } returns the instance of the SearchAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  strokeWidth(width: Optional<LengthMetrics>): SearchAttribute;

  /**
   * Set the stroke color.
   *
   * @param { Optional<ResourceColor> } color - indicates the stroke color.
   * @returns { SearchAttribute } returns the instance of the SearchAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  strokeColor(color: Optional<ResourceColor>): SearchAttribute;

  /**
   * Whether to enable automatic spacing between Chinese and Latin characters.
   *
   * @param { Optional<boolean> } enabled - The default value is false, indicates the flag whether to enable automatic spacing.
   * @returns { SearchAttribute } returns the instance of the SearchAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  enableAutoSpacing(enabled: Optional<boolean>): SearchAttribute;

  /**
   * Set the divider color.
   * 
   * @param { Optional<ColorMetrics> } color - Color of the divider.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  dividerColor(color: Optional<ColorMetrics>): SearchAttribute;

  /**
   * Determines whether the layout adds extra padding at the top and bottom to make space for characters.
   *
   * @param { Optional<boolean> } include - Whether enable the feature, the default value is false.
   * @returns { SearchAttribute } returns the instance of the SearchAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  includeFontPadding(include: Optional<boolean>): SearchAttribute;

  /**
   * Whether to include ascent/descent from fallback fonts to prevent overlapping lines.
   *
   * @param { Optional<boolean> } enabled - Whether enable the feature, the default value is false.
   *     True means enable the feature, false means disable the feature.
   * @returns { SearchAttribute } returns the instance of the SearchAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  fallbackLineSpacing(enabled: Optional<boolean>): SearchAttribute;

  /**
   * Whether to compress punctuation at the beginning of line.
   *
   * @param { Optional<boolean> } enabled - Whether to enable the feature, the default value is false.
   * @returns { SearchAttribute } - returns the instance of the SearchAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  compressLeadingPunctuation(enabled: Optional<boolean>): SearchAttribute;

  
  /**
   * Used to set the selected drag preview style.
   *
   * @param { SelectedDragPreviewStyle | undefined } value - Selected drag preview style.
   *     If set undefined will reset the style.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  selectedDragPreviewStyle(value: SelectedDragPreviewStyle | undefined): SearchAttribute;

  /**
   * Set the text direction.
   *
   * @param { TextDirection | undefined } direction - Indicates the text direction.
   *     When undefined is set, this property will be reset to TextDirection.DEFAULT.
   * @returns { SearchAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  textDirection(direction: TextDirection | undefined): SearchAttribute
}

/**
 * Defines Search Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines Search Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines Search Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare const Search: SearchInterface;

/**
 * Defines Search Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines Search Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines Search Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare const SearchInstance: SearchAttribute;
