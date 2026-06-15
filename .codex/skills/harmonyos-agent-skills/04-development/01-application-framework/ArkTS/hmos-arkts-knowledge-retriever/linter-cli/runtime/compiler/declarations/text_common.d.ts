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
 * Defines the text data detector type.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 11
 */
/**
 * Defines the text data detector type.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12 dynamic
 */
declare enum TextDataDetectorType {
  /**
   * Detector type phone number.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 11
   */  
  /**
   * Detector type phone number.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */   
  PHONE_NUMBER = 0,

  /**
   * Detector type URL.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 11
   */ 
  /**
   * Detector type URL.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  URL = 1,

  /**
   * Detector type email.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 11
   */ 
  /**
   * Detector type email.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */ 
  EMAIL = 2,

  /**
   * Detector type address.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 11
   */
  /**
   * Detector type address.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  ADDRESS = 3,

  /**
   * Detector type datetime.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  DATE_TIME = 4,
}
  
/**
 * Text data detector config.
 *
 * @interface TextDataDetectorConfig
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 11
 */
/**
 * Text data detector config.
 *
 * @interface TextDataDetectorConfig
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12 dynamic
 */
declare interface TextDataDetectorConfig {
  /**
   * Text data detector types.
   *
   * @type { TextDataDetectorType[] }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 11
   */
  /**
   * Text data detector types.
   *
   * @type { TextDataDetectorType[] }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  types: TextDataDetectorType[]

  /**
   * Text data detect result callback.
   *
   * @type { ?function }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 11
   */
  /**
   * Text data detect result callback.
   *
   * @type { ?Callback<string> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  onDetectResultUpdate?: Callback<string>
  /**
   * The color of AI entity.
   *
   * @type { ?ResourceColor }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  color?: ResourceColor,

  /**
   * The decoration of AI entity.
   *
   * @type { ?DecorationStyleInterface }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  decoration?: DecorationStyleInterface;

  /**
   * Used to set whether the preview window will be displayed when long-presses and selects a word.
   *
   * @type { ?boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 20 dynamic
   */
  enablePreviewMenu?: boolean;
}

/**
 * Defines range of text type component.
 *
 * @interface TextRange
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface TextRange {
  /**
   * Start offset.
   *
   * @type { ?number }
   * @default 0
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  start?: number;

  /**
   * End offset.
   *
   * @type { ?number }
   * @default text length
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  end?: number;
}

/**
 * Defines the inserted text value info.
 *
 * @interface InsertValue
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface InsertValue {
  /**
   * The location info where the value will be inserted.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  insertOffset: number;

  /**
   * The inserted value.
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  insertValue: string;
}

/**
 * Defines delete text direction.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare enum TextDeleteDirection {
  /**
   * Delete backward.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  BACKWARD = 0,

  /**
   * Delete forward.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  FORWARD = 1,
}

/**
 * Defines the superscript style.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20 dynamic
 */
declare enum SuperscriptStyle {
  /**
   * normal font style.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  NORMAL = 0,

  /**
   * Superscript font style.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  SUPERSCRIPT = 1,

  /**
   * Subscript font style.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  SUBSCRIPT = 2,
}

/**
 * Defines menu type.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 13 dynamic
 */
declare enum MenuType {
  /**
   * Selection menu.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 13 dynamic
   */
  SELECTION_MENU = 0,

  /**
   * Preview menu, only for image.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 13 dynamic
   */
  PREVIEW_MENU = 1,
}

/**
 * Declare the type of automatic case mode switching.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20 dynamic
 */
declare enum AutoCapitalizationMode {
  /**
   * The default status is invalid.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  NONE = 0,

  /**
   * Automatic case by words.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  WORDS = 1,

  /**
   * Automatic case by sentences.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  SENTENCES = 2,

  /**
   * Automatic case by full characters.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  ALL_CHARACTERS = 3,
}

/**
 * Provides an interface for deleting value from text.
 *
 * @interface DeleteValue
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface DeleteValue {
  /**
   * The location info where the value will be deleted.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  deleteOffset: number;

  /**
   * The deleted direction.
   *
   * @type { TextDeleteDirection }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  direction: TextDeleteDirection;

  /**
   * The deleted value.
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  deleteValue: string;
}

/**
 * Callback after content changed.
 * 
 * @typedef { function } OnDidChangeCallback
 * @param { TextRange } rangeBefore - Range of content that had been replaced.
 * @param { TextRange } rangeAfter - Range of content that newly added.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare type OnDidChangeCallback = (rangeBefore: TextRange, rangeAfter: TextRange) => void;

/**
 * Callback when input sometimes has info of previewText.
 *
 * @typedef { function } EditableTextOnChangeCallback
 * @param { string } value - Value of body text, without previewText value.
 * @param { PreviewText } [previewText] - info of previewText, contains previewText value and start index.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
/**
 * Callback when input sometimes has info of previewText.
 *
 * @typedef { function } EditableTextOnChangeCallback
 * @param { string } value - Value of body text, without previewText value.
 * @param { PreviewText } [previewText] - info of previewText, contains previewText value and start index.
 * @param { TextChangeOptions } [options] - contains the selection range before and after the change, as well as the old content.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 15 dynamic
 */
declare type EditableTextOnChangeCallback = (value: string, previewText?: PreviewText, options?: TextChangeOptions) => void;

/**
 * Define the text selection controller.
 *
 * @interface TextBaseController
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface TextBaseController {
  /**
   * Set selection to select a range of content.
   *
   * @param { number } selectionStart - The start position of the selected text.
   * @param { number } selectionEnd - The end position of the selected text.
   * @param { SelectionOptions } [options] - Indicates the options of selection.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  setSelection(selectionStart: number, selectionEnd: number, options?: SelectionOptions): void;

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
   * Get LayoutManager.
   *
   * @returns { LayoutManager } - Return the LayoutManager.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  getLayoutManager(): LayoutManager;
}

/**
 * Define the text extended editing controller.
 *
 * @extends TextBaseController
 * @interface TextEditControllerEx
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface TextEditControllerEx extends TextBaseController {
  /**
   * Judge whether is in editing state
   * 
   * @returns { boolean } - true means that the component is in editing state, false means is non in editing status
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  isEditing(): boolean;

  /**
   * Stop editing state.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  stopEditing(): void;

  /**
   * Set caret offset.
   *
   * @param { number } offset - caret offset.
   * @returns { boolean } - Return true if the caret offset was successfully set, false otherwise.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  setCaretOffset(offset: number): boolean;

  /**
   * Get caret offset from controller.
   *
   * @returns { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  getCaretOffset(): number;

  /**
   * Get PreviewText.
   *
   * @returns { PreviewText } - Return the PreviewText.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  getPreviewText?(): PreviewText;
}

/**
 * The previewText.
 * @interface PreviewText
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface PreviewText {
  /**
   * Start offset of the previewText
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  offset: number;

  /**
   * Value of the previewText.
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  value: string;
}

/**
 * Define the StyledString controller.
 *
 * @interface StyledStringController
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface StyledStringController {
  /**
   * Set the StyledString of the component.
   *
   * @param { StyledString } styledString - StyledString.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  setStyledString(styledString: StyledString): void;

  /**
   * Get the StyledString of the component.
   *
   * @returns { MutableStyledString }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  getStyledString(): MutableStyledString;
}

/**
 * Define the StyledString changed listener.
 *
 * @interface StyledStringChangedListener
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface StyledStringChangedListener {
  /**
   * Called before text changed.
   *
   * @type { ?Callback<StyledStringChangeValue, boolean> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onWillChange?: Callback<StyledStringChangeValue, boolean>;

  /**
   * Called after text changed.
   *
   * @type { ?OnDidChangeCallback }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onDidChange?: OnDidChangeCallback;
}

/**
 * Define the StyledString changed value.
 *
 * @interface StyledStringChangeValue
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
interface StyledStringChangeValue {
  /**
   * Range of the content to be replaced.
   *
   * @type { TextRange }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  range: TextRange;

  /**
   * StyledString to replace.
   *
   * @type { StyledString }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  replacementString: StyledString;

  /**
   * Preview StyledString
   *
   * @type { ?StyledString }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  previewText?: StyledString;
}

/**
 * Define the LayoutManager for querying layout information.
 *
 * @interface LayoutManager
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface LayoutManager {
  /**
   * Get the line count.
   * 
   * @returns { number } The line count value returned to the caller.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  getLineCount(): number;

  /**
   * Get the glyph position at coordinate.
   * 
   * @param { number } x - the positionX of typography.
   * @param { number } y - the positionY of typography.
   * @returns { PositionWithAffinity } TextBlob object.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  getGlyphPositionAtCoordinate(x: number, y: number): PositionWithAffinity;

  /**
   * Get the character position at coordinate.
   *
   * @param { number } x - the positionX of typography.
   * @param { number } y - the positionY of typography.
   * @returns { PositionWithAffinity | undefined } Position and affinity.
   *     Returning undefined indicates that the function call failed.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 24 dynamic
   */
  getCharacterPositionAtCoordinate(x: number, y: number): PositionWithAffinity | undefined;

  /**
   * Get the glyph range produced by the specified range of characters.
   *
   * @param { TextRange } charRange - The character range.
   * @returns { Array<TextRange> | undefined } The range infos, first item is the range of glyphs generated
   *     by charRange. The second item, if present, specifies the actual character range that fully defines
   *     the returned glyph range, which may match or slightly exceed the requested range.
   *     Returning undefined indicates that the function call failed.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 24 dynamic
   */
  getGlyphRangeForCharacterRange(charRange: TextRange): Array<TextRange> | undefined;

  /**
   * Get the character range that maps to the glyphs in the given glyph range.
   * 
   * @param { TextRange } glyphRange - The glyph range.
   * @returns { Array<TextRange> | undefined } The range infos, first item is the range of characters generated
   *     by glyphRange. The second item, if present, specifies the full glyph range generated by the returned
   *     character range, which may match or slightly exceed the requested glyph range.
   *     Returning undefined indicates that the function call failed.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 24 dynamic
   */
  getCharacterRangeForGlyphRange(glyphRange: TextRange): Array<TextRange> | undefined;

  /**
   * Get LineMetrics.
   * 
   * @param { number } lineNumber - the number of line.
   * @returns { LineMetrics } The line Metrics.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  getLineMetrics(lineNumber: number): LineMetrics;

  /**
   * Get the rects for range.
   * @param { TextRange } range - The range to set.
   * @param { RectWidthStyle } widthStyle - Width style to set.
   * @param { RectHeightStyle } heightStyle - Height style to set.
   * @returns { Array<TextBox> } The rects for range.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 14 dynamic
   */
  getRectsForRange(range: TextRange, widthStyle: RectWidthStyle, heightStyle: RectHeightStyle): Array<TextBox>;
}

/**
 * Position and affinity.
 * 
 * @typedef PositionWithAffinity
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
interface PositionWithAffinity {
  /**
   * Position of text.
   * 
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  position: number;

  /**
   * Affinity of text.
   * 
   * @type { Affinity }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  affinity: Affinity;
}

/**
 * Define the Affinity type.
 * 
 * @typedef { import('../../../api/@ohos.graphics.text').default.Affinity } Affinity
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare type Affinity = import('../../../api/@ohos.graphics.text').default.Affinity;

/**
 * Define the LineMetrics type.
 * 
 * @typedef { import('../../../api/@ohos.graphics.text').default.LineMetrics } LineMetrics
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare type LineMetrics = import('../../../api/@ohos.graphics.text').default.LineMetrics; 

/**
 * Define the RectWidthStyle type.
 * 
 * @typedef { import('../../../api/@ohos.graphics.text').default.RectWidthStyle } RectWidthStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 14 dynamic
 */
declare type RectWidthStyle = import('../../../api/@ohos.graphics.text').default.RectWidthStyle;

/**
 * Define the RectHeightStyle type.
 * 
 * @typedef { import('../../../api/@ohos.graphics.text').default.RectHeightStyle } RectHeightStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 14 dynamic
 */
declare type RectHeightStyle = import('../../../api/@ohos.graphics.text').default.RectHeightStyle;

/**
 * Define the TextBox type.
 * 
 * @typedef { import('../../../api/@ohos.graphics.text').default.TextBox } TextBox
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 14 dynamic
 */
declare type TextBox = import('../../../api/@ohos.graphics.text').default.TextBox;

/**
 * The Paragraph type provide detailed information about a paragraph,
 * including properties such as line count, line height and other relevant metrics.
 * 
 * @typedef { import('../../../api/@ohos.graphics.text').default.Paragraph } Paragraph
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 20 dynamic
 */
declare type Paragraph = import('../../../api/@ohos.graphics.text').default.Paragraph;

/**
 * The type for input method extra config, see the detailed description in InputMethodExtraConfig.
 *
 * @typedef { import('../../../api/@ohos.inputMethod.ExtraConfig').InputMethodExtraConfig } InputMethodExtraConfig
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 22 dynamic
 */
declare type InputMethodExtraConfig = import('../../../api/@ohos.inputMethod.ExtraConfig').InputMethodExtraConfig;

/**
 * Defines the cursor style
 *
 * @interface CaretStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the cursor style
 *
 * @interface CaretStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
interface CaretStyle {
  /**
   * Set the cursor width
   *
   * @type { ?Length }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set the cursor width
   *
   * @type { ?Length }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  width?: Length,

  /**
   * Set the cursor color
   *
   * @type { ?ResourceColor }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set the cursor color
   *
   * @type { ?ResourceColor }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  color?: ResourceColor,
}

/**
 * Defines the TextMenuItemId.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare class TextMenuItemId {
  /**
   * Init a TextMenuItemId with id.
   *
   * @param { ResourceStr } id - The id of the TextMenuItemId.
   * @returns { TextMenuItemId } - Returns the TextMenuItemId object.
   * @static
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  static of(id: ResourceStr): TextMenuItemId;
 
  /**
   * Judge if two TextMenuItemId are equal.
   *
   * @param { TextMenuItemId } id - id TextMenuItemId.
   * @returns { boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  equals(id: TextMenuItemId): boolean;
 
  /**
   * Indicates the TextMenuItemId to copy and delete the currently selected text.
   *
   * @type { TextMenuItemId }
   * @readonly
   * @static
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  static readonly CUT: TextMenuItemId;
 
  /**
   * Indicates the TextMenuItemId to copy the currently selected text to the clipboard.
   *
   * @type { TextMenuItemId }
   * @readonly
   * @static
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  static readonly COPY: TextMenuItemId;
 
  /**
   * Indicates the TextMenuItemId to copy the current contents of the clipboard into the text view.
   *
   * @type { TextMenuItemId }
   * @readonly
   * @static
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  static readonly PASTE: TextMenuItemId;
 
  /**
   * Indicates the TextMenuItemId to select all text in a text view.
   * 
   * @type { TextMenuItemId }
   * @readonly
   * @static
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  static readonly SELECT_ALL: TextMenuItemId;
 
  /**
   * Indicates the TextMenuItemId for collaboration service menu items.
   *
   * @type { TextMenuItemId }
   * @readonly
   * @static
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  static readonly COLLABORATION_SERVICE: TextMenuItemId;
 
  /**
   * Indicates the TextMenuItemId to recognize the text in the picture and input it into the text view.
   *
   * @type { TextMenuItemId }
   * @readonly
   * @static
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  static readonly CAMERA_INPUT: TextMenuItemId;

  /**
   * Indicates the TextMenuItemId to help with text creation by invoking large models.
   *
   * @type { TextMenuItemId }
   * @readonly
   * @static
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 13 dynamic
   */
  static readonly AI_WRITER: TextMenuItemId;

  /**
   * Indicates the TextMenuItemId to translate the selected content.
   *
   * @type { TextMenuItemId }
   * @readonly
   * @static
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 15 dynamic
   */
  static readonly TRANSLATE: TextMenuItemId;

  /**
   * Indicates the TextMenuItemId to search the selected content.
   *
   * @type { TextMenuItemId }
   * @readonly
   * @static
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 18 dynamic
   */
  static readonly SEARCH: TextMenuItemId;

  /**
   * Indicates the TextMenuItemId to share the selected content.
   *
   * @type { TextMenuItemId }
   * @readonly
   * @static
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 18 dynamic
   */
  static readonly SHARE: TextMenuItemId;

  /**
   * Indicates the TextMenuItemId to open url.
   *
   * @type { TextMenuItemId }
   * @readonly
   * @static
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 20 dynamic
   */
  static readonly url: TextMenuItemId;

  /**
   * Indicates the TextMenuItemId to open email.
   *
   * @type { TextMenuItemId }
   * @readonly
   * @static
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 20 dynamic
   */
  static readonly email: TextMenuItemId;

  /**
   * Indicates the TextMenuItemId to call the phone number.
   *
   * @type { TextMenuItemId }
   * @readonly
   * @static
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 20 dynamic
   */
  static readonly phoneNumber: TextMenuItemId;

  /**
   * Indicates the TextMenuItemId to open map.
   *
   * @type { TextMenuItemId }
   * @readonly
   * @static
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 20 dynamic
   */
  static readonly address: TextMenuItemId;

  /**
   * Indicates the TextMenuItemId to open calendar.
   *
   * @type { TextMenuItemId }
   * @readonly
   * @static
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 20 dynamic
   */
  static readonly dateTime: TextMenuItemId;


  /**
   * Indicates the TextMenuItemId for asking AI.
   *
   * @type { TextMenuItemId }
   * @readonly
   * @static
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 20 dynamic
   */
  static readonly askAI: TextMenuItemId;

  /**
   * Indicates the TextMenuItemId to auto fill.
   *
   * @type { TextMenuItemId }
   * @readonly
   * @static
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 23 dynamic
   */
  static readonly autoFill: TextMenuItemId;
 
  /**
   * Indicates the TextMenuItemId for password vault.
   *
   * @type { TextMenuItemId }
   * @readonly
   * @static
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @atomicservice
   * @since 23 dynamic
   */
  static readonly passwordVault: TextMenuItemId;
}
 
/**
 * TextMenuItem
 *
 * @interface TextMenuItem
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface TextMenuItem {
  /**
   * Customize what the menu displays.
   *
   * @type { ResourceStr }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  content: ResourceStr;
  /**
   * Customize the icon before the menu displays content.
   *
   * @type { ?ResourceStr }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  icon?: ResourceStr;
  /**
   * Distinguish clicked menu content by Id.
   *
   * @type { TextMenuItemId }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  id: TextMenuItemId;
  /**
   * Customize what the menu item shortcut displays.
   *
   * @type { ?ResourceStr }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  labelInfo?: ResourceStr;
}
 
/**
 * Callback before displaying the menu when the selection range changes.
 *
 * @typedef { function } OnPrepareMenuCallback
 * @param { Array<TextMenuItem> } menuItems - currently displayed menu items.
 * @returns { Array<TextMenuItem> } Return the menu items will displayed after operations.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20 dynamic
 */
type OnPrepareMenuCallback = (menuItems: Array<TextMenuItem>) => Array<TextMenuItem>;

/**
 * EditMenuOptions
 *
 * @interface EditMenuOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface EditMenuOptions {
  /**
   * Passes the default menu, invokes before every display to generate a menu for triggering click events.
   *
   * @param { Array<TextMenuItem> } menuItems - current default menu array.
   * @returns { Array<TextMenuItem> } - Return the menu after operations.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onCreateMenu(menuItems: Array<TextMenuItem>): Array<TextMenuItem>;
  /**
   * Invoke upon clicking an item, capable of intercepting the default system menu execution behavior.
   *
   * @param { TextMenuItem } menuItem - current default menu.
   * @param { TextRange } range - current selected range.
   * @returns { boolean } - Return True, the event is consumed, false otherwise.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onMenuItemClick(menuItem: TextMenuItem, range: TextRange): boolean;
  /**
   * Callback before displaying the menu when the selection range changes.
   *
   * @type { ?OnPrepareMenuCallback }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  onPrepareMenu?: OnPrepareMenuCallback;
}

/**
 * Defines the font decoration result.
 *
 * @interface DecorationStyleResult
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
interface DecorationStyleResult {
  /**
   * Font decoration type.
   *
   * @type { TextDecorationType }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  type: TextDecorationType;

  /**
   * Font decoration color.
   *
   * @type { ResourceColor }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  color: ResourceColor;

  /**
   * The style value of the decoration property object.
   *
   * @type { ?TextDecorationStyle }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  style?: TextDecorationStyle;

  /**
   * The thicknessScale value of the decoration property object.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  thicknessScale?: number;
}

/**
 * Defines the options of font.
 *
 * @interface FontSettingOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 12 dynamic
 */
declare interface FontSettingOptions {
  /**
    * Define whether VariableFontWeight is supported.
    *
    * @type { ?boolean }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @form
    * @atomicservice
    * @since 12 dynamic
    */
  enableVariableFontWeight?: boolean;
 }

 /**
 * The TextChangeOptions.
 * @interface TextChangeOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 15 dynamic
 */
declare interface TextChangeOptions {
  /**
   * The selected area before the change.
   *
   * @type { TextRange }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  rangeBefore: TextRange;

  /**
   * The selected area after the change.
   *
   * @type { TextRange }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  rangeAfter: TextRange;

  /**
   * The content before the change.
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  oldContent: string;

  /**
   * The info of PreviewText before the change.
   *
   * @type { PreviewText }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  oldPreviewText: PreviewText;
}

/**
 * Define the editableText Component changed value.
 *
 * @interface EditableTextChangeValue
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 15 dynamic
 */
interface EditableTextChangeValue {
  /**
   * Value of body text, without previewText value.
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  content: string;

  /**
   * Info of previewText, contains previewText value and start index.
   *
   * @type { ?PreviewText }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  previewText?: PreviewText;

  /**
   * The TextChangeOptions.
   *
   * @type { TextChangeOptions }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  options?: TextChangeOptions;
}

 /**
  * Defines text menu show mode.
  *
  * @enum { number }
  * @syscap SystemCapability.ArkUI.ArkUI.Full
  * @crossplatform
  * @atomicservice
  * @since 16 dynamic
  */
declare enum TextMenuShowMode {
  /**
   * Display the text selection menu in the current window.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 16 dynamic
   */
  DEFAULT = 0,

  /**
   * Prefer to display the text selection menu in a separate window
   * and continue to display it within the current window if a separate window is not supported
   * 
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 16 dynamic
   */
  PREFER_WINDOW = 1,
}

 /**
  * Defines text menu options.
  *
  * @interface TextMenuOptions
  * @syscap SystemCapability.ArkUI.ArkUI.Full
  * @crossplatform
  * @atomicservice
  * @since 16 dynamic
  */
declare interface TextMenuOptions {
  /**
   * Text menu show mode.
   *
   * @type { ?TextMenuShowMode }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 16 dynamic
   */
  showMode?: TextMenuShowMode;
}
/**
 * Defines keyboard appearance.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 15 dynamic
 */
declare enum KeyboardAppearance {
  /**
   * Default appearance mode, don't adopt immersive styles
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 15 dynamic
   */
  NONE_IMMERSIVE = 0,

  /**
   * Immersive mode
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 15 dynamic
   */
  IMMERSIVE = 1,

  /**
   * Light immersive style
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 15 dynamic
   */
  LIGHT_IMMERSIVE = 2,

  /**
   * Dark immersive style
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 15 dynamic
   */
  DARK_IMMERSIVE = 3,
}

/**
 * Defines shader style class.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20 dynamic
 */
declare class ShaderStyle {
}

/**
 * Defines linear gradient class.
 *
 * @extends ShaderStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20 dynamic
 */
declare class LinearGradientStyle extends ShaderStyle {
  /**
   * The constructor.
   *
   * @param { LinearGradientOptions } options - The options of the gradient.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  constructor(options: LinearGradientOptions);
  
  /**
   * The options of the gradient.
   * angle: Angle of linear gradient.
   * direction: Direction of Linear Gradient.
   * colors: Color description for gradients.
   * repeating: if the gradient colors with repeated coloring.
   *
   * @type { LinearGradientOptions }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  options: LinearGradientOptions;
}

/**
 * Defines radial gradient class.
 *
 * @extends ShaderStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20 dynamic
 */
declare class RadialGradientStyle extends ShaderStyle {
  /**
   * The constructor.
   *
   * @param { RadialGradientOptions } options - The options of the gradient.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  constructor(options: RadialGradientOptions);
  
  /**
   * The options of the gradient.
   * center: Center point of radial gradient
   * radius: Radius of Radial Gradient. value range [0, +∞)
   * colors: Color description for gradients
   * repeating: Refill. The default value is false
   *
   * @type { RadialGradientOptions }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  options: RadialGradientOptions;
}

/**
 * Defines a shader with single color.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20 dynamic
 */
declare class ColorShaderStyle extends ShaderStyle {
  /**
   * The constructor.
   *
   * @param { ResourceColor } color - The color used by shader.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  constructor(color: ResourceColor);
  
  /**
   * The color of the shader.
   *
   * @type { RadialGradientOptions }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  color: ResourceColor;
}

/**
 * Defines the text content transition class.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20 dynamic
 */
declare class ContentTransition {}

/**
 * Defines the numeric text content transition class.
 *
 * @extends ContentTransition
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 20 dynamic
 */
/**
 * Defines the numeric text content transition class.
 *
 * @extends ContentTransition
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 23 dynamic
 */
declare class NumericTextTransition extends ContentTransition {
  /**
   * constructor.
   *
   * @param { NumericTextTransitionOptions } [options] -  The options of numeric text transition.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 20 dynamic
   */
  /**
   * constructor.
   *
   * @param { NumericTextTransitionOptions } [options] -  The options of numeric text transition.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  constructor(options?: NumericTextTransitionOptions);

  /**
   * The flip direction of numeric text transition.
   *
   * @type { ?FlipDirection }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  flipDirection?: FlipDirection;

  /**
   * Define whether enable blur effect.
   *
   * @type { ?boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  enableBlur?: boolean;
}

/**
 * The options of numeric text transition.
 *
 * @interface NumericTextTransitionOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20 dynamic
 */
declare interface NumericTextTransitionOptions {
  /**
   * Define the flip direction of numeric text transition.
   *
   * @type { ?FlipDirection }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  flipDirection?: FlipDirection;

  /**
   * Define whether enable blur effect.
   *
   * @type { ?boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  enableBlur?: boolean;
}

/**
 * Defines the flip direction of numeric text transition.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20 dynamic
 */
declare enum FlipDirection {
  /**
   * The flip direction is down.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  DOWN = 0,

  /**
   * The flip direction is up.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  UP = 1,
}

/**
 * Defines the line spacing options.
 * @interface LineSpacingOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20 dynamic
 */
declare interface LineSpacingOptions {
  /**
   * Used to set whether it will only take effect between lines. 
   *
   * @type { ?boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  onlyBetweenLines?: boolean;
}

/**
 * Defines the options of max lines.
 * @interface MaxLinesOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20 dynamic
 */
declare interface MaxLinesOptions {
  /**
   * The mode of max lines.
   *
   * @type { ?MaxLinesMode }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  overflowMode?: MaxLinesMode;
}

/**
 * Defines maxlines mode.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20 dynamic
 */
declare enum MaxLinesMode {
  /**
   * Default maxlines mode
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  CLIP = 0,

  /**
   * Scroll mode of max lines
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  SCROLL = 1,
}

/**
 * Defines the reason for text changes.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @since 20 dynamic
 */
declare enum TextChangeReason {
  /**
   * Default value.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 20 dynamic
   */
  UNKNOWN = 0,

  /**
   * Reason for input from input method.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 20 dynamic
   */
  INPUT = 1,

  /**
   * Reason for paste.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 20 dynamic
   */
  PASTE = 2,

  /**
   * Reason for cut.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 20 dynamic
   */
  CUT = 3,

  /**
   * Reason for drag.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 20 dynamic
   */
  DRAG = 4,

  /**
   * Reason for auto fill.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 20 dynamic
   */
  AUTO_FILL = 5,

  /**
   * Reason for ai write.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 20 dynamic
   */
  AI_WRITE = 6,

  /**
   * Reason for redo.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 20 dynamic
   */
  REDO = 7,

  /**
   * Reason for undo.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 20 dynamic
   */
  UNDO = 8,

  /**
   * Reason for controller methods.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 20 dynamic
   */
  CONTROLLER = 9,

  /**
   * Reason for accessibilty methods.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 20 dynamic
   */
  ACCESSIBILITY = 10,

  /**
   * Reason for collarboration input.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 20 dynamic
   */
  COLLABORATION = 11,

  /**
   * Reason for stylus input.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 20 dynamic
   */
  STYLUS = 12
}

/**
 * Keyboard Gradient mode.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @since 20 dynamic
 */
declare enum KeyboardGradientMode {
  /**
   * Disable gradient mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 20 dynamic
   */
  NONE = 0,

  /**
   * Linear gradient mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 20 dynamic
   */
  LINEAR_GRADIENT = 1,
}

/**
 * Keyboard fluid light mode.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @since 20 dynamic
 */
declare enum KeyboardFluidLightMode {
  /**
   * Disable fluid light mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 20 dynamic
   */
  NONE = 0,

  /**
   * Background fluid light mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 20 dynamic
   */
  BACKGROUND_FLUID_LIGHT = 1,
}

/**
 * Defines text direction.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 22 dynamic
 */
declare enum TextDirection {
  /**
   * Left to right.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  LTR = 0,
  /**
   * Right to left.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  RTL = 1,
  /**
   * The text direction follows the component layout.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  DEFAULT = 2,
  /**
   * The text direction follows the actual text.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  AUTO = 3
}

/**
 * Defines the keyboard appearance config.
 *
 * @interface KeyboardAppearanceConfig
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @since 20 dynamic
 */
declare interface KeyboardAppearanceConfig {
  /**
   * Used to set keyboard gradient mode.
   *
   * @type { ?KeyboardGradientMode }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 20 dynamic
   */
  gradientMode?: KeyboardGradientMode;

  /**
   * Used to set keyboard fluid light mode..
   *
   * @type { ?KeyboardFluidLightMode }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 20 dynamic
   */
  fluidLightMode?: KeyboardFluidLightMode;
}

/**
 * Defines the input method client.
 *
 * @interface IMEClient
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20 dynamic
 */
declare interface IMEClient {
  /**
   * The unique ID of this input component node.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  nodeId: number;

  /**
   * Called when the extra config is set.
   *
   * @param { InputMethodExtraConfig } config - The extra config object.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 22 dynamic
   */
  setExtraConfig(config: InputMethodExtraConfig): void;
}

/**
 * Vertical Alignment of text.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20 dynamic
 */
declare enum TextVerticalAlign {
  /**
   * Baseline alignment, the default value.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  BASELINE = 0,

  /**
   * Bottom alignment.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  BOTTOM = 1,

  /**
   * Center alignment.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  CENTER = 2,

  /**
   * Top alignment.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  TOP = 3,
}

/**
 * Alignment of text.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 21 dynamic
 */
declare enum TextContentAlign {
  /**
   * Top the text.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 21 dynamic
   */
  TOP = 0,

  /**
   * Center alignment.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 21 dynamic
   */
  CENTER = 1,

  /**
   * Bottom alignment.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 21 dynamic
   */
  BOTTOM = 2
}

/**
 * Defines text layout options. Use this to set constraints for measure text.
 *
 * @interface TextLayoutOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 20 dynamic
 */
declare interface TextLayoutOptions {
  /**
   * Text display area of width.
   *
   * @type { ?LengthMetrics } constraintWidth
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 20 dynamic
   */
  constraintWidth?: LengthMetrics;
}

/**
 * Configuration for Accessibility .
 *
 * @interface AccessibilitySpanOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @stagemodelonly
 * @crossplatform
 * @atomicservice
 * @since 23 dynamic
 */
declare interface AccessibilitySpanOptions {
  /**
   * Indicates the accessibility text of component.
   *
   * @type { ?ResourceStr } - accessibility text, Default value is "".
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  accessibilityText?: ResourceStr;
  /**
   * Indicates more detailed description text of component,
   *     which is used to further describe the component.
   *
   * @type { ?ResourceStr } - accessibility description, Default value is "".
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  accessibilityDescription?: ResourceStr;
  /**
   * Set accessibility level.
   *
   * @type { ?string } - The accessibility level for component. The options are as follows:<br/>
   *     "auto":The value is converted to "yes" or "no" based on the component.
   *     "yes": the current component is selectable for the accessibility service.
   *     "no": The current component is not selectable for the accessibility service.
   * @default "auto".
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  accessibilityLevel?:string;
}

/**
 * Selected drag preview style configuration.
 *
 * @interface SelectedDragPreviewStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 23 dynamic
 */
declare interface SelectedDragPreviewStyle {
    /**
     * The color of background.
     *
     * @type { ?ResourceColor } - Default value is '#ffffff' (100% opacity).
     *                            Default value in dark mode is '#202224' (95% opacity).
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 23 dynamic
     */
    color?: ResourceColor;
}

/**
 * Defines the voice button options.
 *
 * @interface VoiceButtonOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @stagemodelonly
 * @atomicservice
 * @since 23 dynamic
 */
interface VoiceButtonOptions {
    /**
     * Enable or disable voice button.
     * True means enable voice button, false means disable voice button.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @systemapi
     * @stagemodelonly
     * @atomicservice
     * @since 23 dynamic
     */
    enabled?: boolean;
}

/**
 * Defines the configuration of font.
 *
 * @interface FontConfigs
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @stagemodelonly
 * @crossplatform
 * @atomicservice
 * @since 24 dynamic
 */
declare interface FontConfigs {
    /**
     * Defines font weight configurations.
     *
     * @type { ?FontWeightConfigs }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @stagemodelonly
     * @crossplatform
     * @atomicservice
     * @since 24 dynamic
     */
    fontWeightConfigs?: FontWeightConfigs;
}

/**
 * Defines the configuration of font weight.
 *
 * @interface FontWeightConfigs
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @stagemodelonly
 * @crossplatform
 * @atomicservice
 * @since 24 dynamic
 */
declare interface FontWeightConfigs {
    /**
     * Defines whether VariableFontWeight is supported. The default value is false.
     *     True means enable VariableFontWeight, false means disable VariableFontWeight.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @stagemodelonly
     * @crossplatform
     * @atomicservice
     * @since 24 dynamic
     */
    enableVariableFontWeight?: boolean;
    /**
     * Defines whether font weight will be automatically updated when the device's font weight category changes.
     * The default value is true.
     * True means font weight will be automatically updated when the device's font weight category changes.
     * False means font weight will not be automatically updated when the device's font weight category changes.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @stagemodelonly
     * @crossplatform
     * @atomicservice
     * @since 24 dynamic
     */
    enableDeviceFontWeightCategory?: boolean;
}
