/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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
 * Defines the StyledStringMarshallingValue Type.
 *
 * @typedef { UserDataSpan } StyledStringMarshallingValue
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @since 19 dynamic
 */
declare type StyledStringMarshallingValue = UserDataSpan;


/**
 * Defines the callback type used in marshalling.
 *
 * @typedef { function } StyledStringMarshallCallback
 * @param { StyledStringMarshallingValue } marshallableVal - value that will be serialized to array buffer
 * @returns { ArrayBuffer } Array buffer from the serialized marshalling value
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @since 19 dynamic
 */
declare type StyledStringMarshallCallback = (marshallableVal: StyledStringMarshallingValue) => ArrayBuffer;

/**
 * Defines the callback type used in unmarshalling.
 *
 * @typedef { function } StyledStringUnmarshallCallback
 * @param { ArrayBuffer } buf - The buffer that will be deserialized to a StyledStringMarshallingValue.
 * @returns { StyledStringMarshallingValue } Marshalling value from the deserialized ArrayBuffer.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @since 19 dynamic
 */
declare type StyledStringUnmarshallCallback = (buf: ArrayBuffer) => StyledStringMarshallingValue;

/**
 * StyledString
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare class StyledString {
    /**
     * constructor.
     *
     * @param { string | ImageAttachment | CustomSpan } value - indicates the current object value of the StyledString.
     * @param { Array<StyleOptions> } [styles] - indicates the SpanStyle objects.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    constructor(value: string | ImageAttachment | CustomSpan, styles?: Array<StyleOptions>);

    /**
     * Get the length of the StyledString's characters.
     *
     * @type { number } - the length of the StyledString's characters.
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    readonly length: number;

    /**
    * Get the literal content of the StyledString.
    *
    * @returns { string } - the literal content of the StyledString
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12 dynamic
    */
    getString(): string;

    /**
     * Get the attribute objects of the subStyledString.
     *
     * @param { number } start - the start position of the subStyledString.
     * @param { number } length - the length of the subStyledString's characters.
     * @param { StyledStringKey } [styledKey] - the specified type.
     * @returns { Array<SpanStyle> }
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    getStyles(start: number, length: number, styledKey?: StyledStringKey): Array<SpanStyle>;

    /**
     * Judge if two attribute strings are equal.
     *
     * @param { StyledString } other - another StyledString.
     * @returns { boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    equals(other: StyledString): boolean;

    /**
     * Get the substring of the StyledString.
     *
     * @param { number } start - the start position of the subStyledString.
     * @param { number } [length] - the length of the subStyledString's characters.
     * @returns { StyledString }
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    subStyledString(start: number, length?: number): StyledString;

    /**
     * Returns StyledString from the provided HTML string.
     *
     * @param { string } html - the html text will be converted to a StyledString.
     * @returns { Promise<StyledString> }
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 170001 - Convert Error.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12 dynamic
     */
    /**
     * Returns StyledString from the provided HTML string.
     *
     * @param { string } html - the html text will be converted to a StyledString.
     * @returns { Promise<StyledString> }
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 170001 - Convert Error.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 23 dynamic
     */
    static fromHtml(html: string): Promise<StyledString>;

    /**
     * Returns HTML string from the provided StyledString.
     *
     * @param { StyledString } styledString - the StyledString will be converted to a HTML string.
     * @returns { string } Returns the HTML string converted from the provided StyledString.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 14 dynamic
     */
    static toHtml(styledString: StyledString): string;

    /**
     * Returns ArrayBuffer from the serialized styled string.
     *
     * @param { StyledString } styledString - StyledString parameter.
     * @param { function } callback - When marshalling StyledStringMarshingValue, will trigger this callback to get ArrayBuffer
     * @returns { ArrayBuffer }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @systemapi
     * @since 19 dynamic
     */
    static marshalling(styledString: StyledString, callback: StyledStringMarshallCallback): ArrayBuffer;

    /**
     * Returns StyledString from the deserialized ArrayBuffer.
     *
     * @param { ArrayBuffer } buffer - The buffer will be deserialized to a StyledString.
     * @param { function } callback - When unmarshalling ArrayBuffer, will trigger this callback to get StyledStringMarshingValue
     * @returns { Promise<StyledString> }
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 170002 - Styled string decode error.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @systemapi
     * @since 19 dynamic
     */
    static unmarshalling(buffer: ArrayBuffer, callback: StyledStringUnmarshallCallback): Promise<StyledString>;

    /**
     * Returns ArrayBuffer from the serialized styled string.
     *
     * @param { StyledString } styledString - StyledString parameter.
     * @returns { ArrayBuffer }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @systemapi
     * @since 13 dynamic
     */
    static marshalling(styledString: StyledString): ArrayBuffer;

    /**
     * Returns StyledString from the deserialized ArrayBuffer.
     *
     * @param { ArrayBuffer } buffer - The buffer will be deserialized to a StyledString.
     * @returns { Promise<StyledString> }
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 170002 - Styled string decode error.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @systemapi
     * @since 13 dynamic
     */
    static unmarshalling(buffer: ArrayBuffer): Promise<StyledString>;
}

/**
 * StyleOptions
 *
 * @interface StyleOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface StyleOptions {
    /**
     * The start position of the StyleOptions.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    start?: number;

    /**
     * The length of the modifiedStyledString's characters.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    length?: number;

    /**
     * The attribute key of the StyleOptions.
     *
     * @type { StyledStringKey }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    styledKey: StyledStringKey;

    /**
     * The attribute value of the StyleOptions.
     *
     * @type { StyledStringValue }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    styledValue: StyledStringValue;
}

/**
 * SpanStyle
 *
 * @interface SpanStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface SpanStyle {
    /**
     * The start position of the SpanStyle.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    start: number;

    /**
     * The length of the modifiedStyledString's characters.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    length: number;

    /**
     * The attribute key of the SpanStyle.
     *
     * @type { StyledStringKey }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    styledKey: StyledStringKey;

    /**
     * The attribute value of the SpanStyle.
     *
     * @type { StyledStringValue }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    styledValue: StyledStringValue;
}

/**
 * Defines TextStyle.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare class TextStyle {

    /**
     * constructor.
     *
     * @param { TextStyleInterface } [value] - font property object.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    constructor(value?: TextStyleInterface);

    /**
     * Get the fontColor of the StyledString.
     *
     * @type { ?ResourceColor } - the set fontColor of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    readonly fontColor?: ResourceColor;

    /**
     * Get the fontFamily of the StyledString.
     *
     * @type { ?string } - the fontFamily of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    readonly fontFamily?: string;

    /**
     * Get the fontSize of the StyledString.
     * If not undefined, the unit is vp.
     *
     * @type { ?number } - the fontSize of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    readonly fontSize?: number;

    /**
     * Get the fontWeight of the StyledString.
     *
     * @type { ?number } - the fontWeight of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    readonly fontWeight?: number;

    /**
     * Get the fontStyle of the StyledString.
     *
     * @type { ?FontStyle  } - the fontStyle of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    readonly fontStyle?: FontStyle;

    /**
     * Get the stroke width of the StyledString with the unit 'vp'.
     *
     * @type { ?number } - the stroke width of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20 dynamic
     */
    readonly strokeWidth?: number;

    /**
     * Get the stroke color of the StyledString.
     *
     * @type { ?ResourceColor } - the stroke color of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20 dynamic
     */
    readonly strokeColor?: ResourceColor;

    /**
     * Get the superscript style of the StyledString.
     *
     * @type { ?SuperscriptStyle } - the set superscriptStyle of the StyledString
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20 dynamic
     */
    readonly superscript?: SuperscriptStyle;

    /**
     * Get the fontConfigs of the StyledString.
     *
     * @type { ?FontConfigs } - the fontConfigs of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @stagemodelonly
     * @crossplatform
     * @atomicservice
     * @since 24 dynamic
     */
    readonly fontConfigs?: FontConfigs;
}

/**
 * TextStyleInterface
 *
 * @interface TextStyleInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface TextStyleInterface {
    /**
     * The fontColor value of the font property object.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    fontColor?: ResourceColor;

    /**
     * The fontFamily value of the font property object.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    fontFamily?: ResourceStr;

    /**
     * The fontSize value of the font property object.
     *
     * @type { ?LengthMetrics }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    fontSize?: LengthMetrics;

    /**
     * The fontWeight value of the font property object.
     *
     * @type { ?(number | FontWeight | string) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    fontWeight?: number | FontWeight | string;

    /**
     * The fontStyle value of the font property object.
     *
     * @type { ?FontStyle }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    fontStyle?: FontStyle;

    /**
     * The stroke width of the text.
     *
     * @type { ?LengthMetrics }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20 dynamic
     */
    strokeWidth?: LengthMetrics;

    /**
     * The stroke color of the text.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20 dynamic
     */
    strokeColor?: ResourceColor;

    /**
     * The superscript value of the font property object.
     *
     * @type { ?SuperscriptStyle }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20 dynamic
     */
    superscript?: SuperscriptStyle;

    /**
     * The fontConfigs value of the text.
     *
     * @type { ?FontConfigs }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @stagemodelonly
     * @crossplatform
     * @atomicservice
     * @since 24 dynamic
     */
    fontConfigs?: FontConfigs;
}

/**
 * Defines DecorationOptions for Decoration.
 *
 * @interface DecorationOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20 dynamic
 */
declare interface DecorationOptions {
    /**
     * Enable to show multi TextDecorationType at a time.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20 dynamic
     */
    enableMultiType?: boolean;
}

/**
 * Defines DecorationStyle.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare class DecorationStyle {

    /**
     * constructor.
     *
     * @param { DecorationStyleInterface } value - text decoration value.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    constructor(value: DecorationStyleInterface);

    /**
     * constructor.
     *
     * @param { DecorationStyleInterface } value - text decoration value.
     * @param { DecorationOptions } [options] - decoration options.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20 dynamic
     */
    constructor(value: DecorationStyleInterface, options?: DecorationOptions);

    /**
     * Get the text decoration type of the StyledString.
     *
     * @type { TextDecorationType } - the decoration type of the StyledString
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    readonly type: TextDecorationType;

    /**
     * Get the decorationColor of the StyledString.
     *
     * @type { ?ResourceColor } - the decorationColor of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    readonly color?: ResourceColor;

    /**
     * Get the decorationStyle of the StyledString.
     *
     * @type { ?TextDecorationStyle } - the decorationStyle of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    readonly style?: TextDecorationStyle;

    /**
     * Get the thickness scale of the StyledString.
     *
     * @type { ?number } - the thickness scale of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20 dynamic
     */
    readonly thicknessScale?: number;

    /**
     * Get the DecorationOptions of the StyledString.
     *
     * @type { ?DecorationOptions } - the decorationOptions of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20 dynamic
     */
    readonly options?: DecorationOptions;
}

/**
 * DecorationStyleInterface
 *
 * @interface DecorationStyleInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface DecorationStyleInterface {
    /**
     * The type value of the decoration property object.
     *
     * @type { TextDecorationType }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    type: TextDecorationType;

    /**
     * The color value of the decoration property object.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    color?: ResourceColor;

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
     * The thickness scale of the decoration
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
 * Defines BaselineOffsetStyle.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare class BaselineOffsetStyle {
    
    /**
     * constructor.
     *
     * @param { LengthMetrics } value - baseline offset value.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    constructor(value: LengthMetrics);

    /**
     * Get the baselineOffset value of the StyledString.
     * The unit is vp.
     *
     * @type { number } - the baselineOffset value of the StyledString
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    readonly baselineOffset: number;
}

/**
 * Defines LetterSpacingStyle.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare class LetterSpacingStyle {
   
    /**
     * constructor.
     *
     * @param { LengthMetrics } value - letter space value.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    constructor(value: LengthMetrics);

    /**
     * Get the letterSpacing value of the StyledString.
     * The unit is vp.
     * 
     * @type { number } - the letterSpacing value of the StyledString
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    readonly letterSpacing: number;
}

/**
 * Defines TextShadowStyle.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare class TextShadowStyle {
   
    /**
     * constructor.
     *
     * @param { ShadowOptions | Array<ShadowOptions> } value - text shadow value.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    constructor(value: ShadowOptions | Array<ShadowOptions>);

    /**
     * Get the textShadow value of the StyledString.
     *
     * @type { Array<ShadowOptions> } - the textShadow value of the StyledString
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    readonly textShadow: Array<ShadowOptions>;
}

/**
 * Defines Sets the property string background color.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 14 dynamic
 */
declare class BackgroundColorStyle {

    /**
     * constructor.
     *
     * @param { TextBackgroundStyle } textBackgroundStyle - textBackgroundStyle value.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 14 dynamic
     */
    constructor(textBackgroundStyle: TextBackgroundStyle);

    /**
     * Get the textBackgroundStyle value of the StyledString.
     *
     * @type { TextBackgroundStyle } - the textBackgroundStyle value of the StyledString
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 14 dynamic
     */
    readonly textBackgroundStyle: TextBackgroundStyle;
}

/**
 * Defines GestureStyle.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare class GestureStyle {

    /**
     * constructor.
     *
     * @param { GestureStyleInterface } [value] - gesture event object.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    constructor(value?: GestureStyleInterface);
}

/**
 * Defines the Gesture Events.
 *
 * @interface GestureStyleInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface GestureStyleInterface {
    /**
     * Trigger a click event when a click is clicked.
     *
     * @type { ?Callback<ClickEvent> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    onClick?: Callback<ClickEvent>;

    /**
     * Trigger a gesture event when long press event is complete.
     *
     * @type { ?Callback<GestureEvent> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    onLongPress?: Callback<GestureEvent>;

    /**
     * Trigger a touch event when touched.
     *
     * @type { ?Callback<TouchEvent> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20 dynamic
     */
    onTouch?: Callback<TouchEvent>;
}

/**
 * Defines ParagraphStyle.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare class ParagraphStyle {

    /**
     * constructor.
     *
     * @param { ParagraphStyleInterface } [value] - paragraph property object.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    constructor(value?: ParagraphStyleInterface);

    /**
     * Get the text alignment of the StyledString.
     *
     * @type { ?TextAlign } - the text alignment of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    readonly textAlign?: TextAlign;

    /**
     * Get the text vertical alignment of the StyledString.
     *
     * @type { ?TextVerticalAlign } - the text vertical alignment of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20 dynamic
     */
    readonly textVerticalAlign?: TextVerticalAlign;

    /**
     * Get the first line indentation of the StyledString.
     * The unit is vp.
     *
     * @type { ?number } - the first line indentation of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    readonly textIndent?: number;

    /**
     * Get the maximum number of lines of the StyledString.
     *
     * @type { ?number } - the maximum number of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    readonly maxLines?: number;

    /**
     * Get the overflow mode of the StyledString.
     *
     * @type { ?TextOverflow } - the overflow mode of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    readonly overflow?: TextOverflow;

    /**
     * Get the wordBreak mode of the StyledString.
     *
     * @type { ?WordBreak } - the wordBreak mode of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    readonly wordBreak?: WordBreak;

    /**
     * Get the leading margin of the StyledString.
     *
     * @type { ?(number | LeadingMarginPlaceholder) } - the leading margin of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    readonly leadingMargin?: number | LeadingMarginPlaceholder;

    /**
     * Get the paragraph spacing of the StyledString.
     * The unit is vp.
     *
     * @type { ?number }
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 19 dynamic
     */
    readonly paragraphSpacing?: number;

    /**
     * Get the leading margin span of the StyledString.
     *
     * @type { ?LeadingMarginSpan } - the leading margin span of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 22 dynamic
     */
    readonly leadingMarginSpan?: LeadingMarginSpan;

    /**
     * Get the text direction of the StyledString.
     *
     * @type { ?TextDirection } - the text direction of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 23 dynamic
     */
    readonly textDirection?: TextDirection;
}

/**
 * ParagraphStyleInterface
 *
 * @interface ParagraphStyleInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface ParagraphStyleInterface {
    /**
     * Alignment of text.
     *
     * @type { ?TextAlign }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    textAlign?: TextAlign;

    /**
     * Vertical alignment of text.
     *
     * @type { ?TextVerticalAlign }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20 dynamic
     */
    textVerticalAlign?: TextVerticalAlign;

    /**
     * Set the first line indentation.
     *
     * @type { ?LengthMetrics }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    textIndent?: LengthMetrics;

    /**
     * The maximum number of lines of content.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    maxLines?: number;

    /**
     * The overflow mode of the content.
     *
     * @type { ?TextOverflow }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    overflow?: TextOverflow;

    /**
     * Set word break type.
     *
     * @type { ?WordBreak }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    wordBreak?: WordBreak;

    /**
     * Leading margin.
     *
     * @type { ?(LengthMetrics | LeadingMarginPlaceholder) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    leadingMargin?: LengthMetrics | LeadingMarginPlaceholder;

    /**
     * Set the paragraph spacing of the StyledString.
     *
     * @type { ?LengthMetrics }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 19 dynamic
     */
    paragraphSpacing?: LengthMetrics;

    /**
     * Leading margin span.
     *
     * @type { ?LeadingMarginSpan }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 22 dynamic
     */
    leadingMarginSpan?: LeadingMarginSpan;

    /**
     * Set the text direction of the StyledString.
     *
     * @type { ?TextDirection }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 23 dynamic
     */
    textDirection?: TextDirection;
}

/**
 * Defines LineHeightStyle.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare class LineHeightStyle {
   
    /**
     * constructor.
     *
     * @param { LengthMetrics } lineHeight - line height value.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    constructor(lineHeight: LengthMetrics);

    /**
     * Get the lineHeight value of the StyledString.
     * The unit is vp.
     * 
     * @type { number } - the lineHeight value of the StyledString
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    readonly lineHeight: number;
}

/**
 * Defines the URLStyle hyperlink that allows setting a URL string. When clicking on the text to
 * which the span is attached, the URLStyle will try to open the URL.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 14 dynamic
 */
declare class UrlStyle {

    /**
     * Constructor.
     *
     * @param { string } url - URL value.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 14 dynamic
     */
    constructor(url: string);

    /**
     * Get the URL value of the StyledString.
     *
     * @type { string } - the URL value of the StyledString
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 14 dynamic
     */
    readonly url: string;
}

/**
 * Defines the Span Type.
 *
 * @typedef { TextStyle | DecorationStyle | BaselineOffsetStyle | LetterSpacingStyle | TextShadowStyle |
 * GestureStyle | ImageAttachment | ParagraphStyle | LineHeightStyle | CustomSpan |
 * UserDataSpan } StyledStringValue
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @stagemodelonly
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */

/**
 * Defines the Span Type.
 *
 * @typedef { TextStyle | DecorationStyle | BaselineOffsetStyle | LetterSpacingStyle | TextShadowStyle |
 * GestureStyle | ImageAttachment | ParagraphStyle | LineHeightStyle | UrlStyle | CustomSpan |
 * UserDataSpan | BackgroundColorStyle } StyledStringValue
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @stagemodelonly
 * @crossplatform
 * @atomicservice
 * @since 14 dynamic
 */
declare type StyledStringValue = TextStyle | DecorationStyle | BaselineOffsetStyle | LetterSpacingStyle |
TextShadowStyle | GestureStyle | ImageAttachment | ParagraphStyle | LineHeightStyle | UrlStyle | CustomSpan |
UserDataSpan | BackgroundColorStyle;

/**
 * MutableStyledString
 *
 * @extends StyledString
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare class MutableStyledString extends StyledString {
    /**
     * Replace the string of the specified range.
     *
     * @param { number } start - the start position of the replacedString.
     * @param { number } length - the length of the replacedString's characters.
     * @param { string } other - must be unicode string.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    replaceString(start: number, length: number, other: string): void;

    /**
    * Insert the string at the specified location.
    *
    * @param { number } start - the start position of the insertedString.
    * @param { string } other - must be unicode string.
    * @throws { BusinessError } 401 - Parameter error. Possible causes: 
    * <br> 1. Mandatory parameters are left unspecified.
    * <br> 2. Incorrect parameters types.
    * <br> 3. Parameter verification failed.
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12 dynamic
    */
    insertString(start: number, other: string): void;

    /**
    * Remove the string of the specified range.
    *
    * @param { number } start - the start position of the removedString.
    * @param { number } length - the length of the removedString's characters.
    * @throws { BusinessError } 401 - Parameter error. Possible causes: 
    * <br> 1. Mandatory parameters are left unspecified.
    * <br> 2. Incorrect parameters types.
    * <br> 3. Parameter verification failed.
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12 dynamic
    */
    removeString(start: number, length: number): void;

    /**
     * Replace the specified range string attribute.
     *
     * @param { SpanStyle } spanStyle - the SpanStyle Object.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    replaceStyle(spanStyle: SpanStyle): void;

    /**
     * Add attributes to the specified range string.
     *
     * @param { SpanStyle } spanStyle - the SpanStyle Object.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    setStyle(spanStyle: SpanStyle): void;

    /**
     * Delete the specified type attributes for the specified range string.
     *
     * @param { number } start - the start position of the removedAttributeStyledString.
     * @param { number } length - the length of the removedAttributeStyledString's characters.
     * @param { StyledStringKey } styledKey - the specified attribute type's key.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    removeStyle(start: number, length: number, styledKey: StyledStringKey): void;

    /**
     * Delete all attributes for the specified range styledString.
     *
     * @param { number } start - the start position of the attributeRemovedStyledString's characters.
     * @param { number } length - the length of the attributeRemovedStyledString's characters.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    removeStyles(start: number, length: number): void;

    /**
     * Delete all attributes.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    clearStyles(): void;

    /**
     * Replace the StyledString of the specified range.
     *
     * @param { number } start - the start position of the replacedStyledString.
     * @param { number } length - the length of the replacedStyledString's characters.
     * @param { StyledString } other - new StyledString.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    replaceStyledString(start: number, length: number, other: StyledString): void;

    /**
     * Insert new StyledString at the specified location.
     *
     * @param { number } start - the start position of the insertedStyledString.
     * @param { StyledString } other - new StyledString.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    insertStyledString(start: number, other: StyledString): void;

    /**
     * Append new StyledString at the end.
     *
     * @param { StyledString } other - new StyledString.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    appendStyledString(other: StyledString): void;
}


/**
 * the attribute type of the StyledString
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare enum StyledStringKey {
    /**
     * The key of TextStyle.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    FONT = 0,

    /**
     * The key of DecorationStyle.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    DECORATION = 1,
    /**
     * The key of BaselineOffsetStyle.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    BASELINE_OFFSET = 2,
    /**
     * The key of LetterSpacingStyle.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    LETTER_SPACING = 3,
    /**
     * The key of TextShadowStyle.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    TEXT_SHADOW = 4,
    /**
     * The key of LineHeightStyle.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    LINE_HEIGHT = 5,
    /**
     * The key of BackgroundColorStyle.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 14 dynamic
     */
    BACKGROUND_COLOR = 6,
    /**
     * The key of UrlStyle.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 14 dynamic
     */
    URL = 7,
    /**
     * The key of GestureStyle.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    GESTURE = 100,

    /**
     * The key of ParagraphStyle.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    PARAGRAPH_STYLE = 200,

    /**
     * The key of ImageAttachment.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    IMAGE = 300,

    /**
     * The key of CustomSpan.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    CUSTOM_SPAN = 400,

    /**
     * The key of UserDataSpan.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    USER_DATA = 500
}

/**
 * Defines ImageAttachment.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare class ImageAttachment {

    /**
     * constructor.
     *
     * @param { ImageAttachmentInterface } value - image attachment object.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    constructor(value: ImageAttachmentInterface);

    /**
     * constructor supported by AttachmentType.
     *
     * @param { Optional<AttachmentType> } attachment - image attachment object.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 15 dynamic
     */
    constructor(attachment: Optional<AttachmentType>);
    /**
     * Get the image content of the StyledString.
     *
     * @type { PixelMap } - the image content of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    readonly value: PixelMap;

    /**
     * Get the imageSize of the StyledString.
     *
     * @type { ?SizeOptions } - the imageSize of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    readonly size?: SizeOptions;

    /**
     * Get the imageSize of the StyledString.
     *
     * @type { ?SizeOptions } - the imageSize of the StyledString in vp unit or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 21 dynamic
     */
    readonly sizeInVp?: SizeOptions;

    /**
     * Get the ImageSpanAlignment of the StyledString.
     *
     * @type { ?ImageSpanAlignment } - the ImageSpanAlignment of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    readonly verticalAlign?: ImageSpanAlignment;

    /**
     * Get the imageFit of the StyledString.
     *
     * @type { ?ImageFit } - the imageFit of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    readonly objectFit?: ImageFit;

    /**
     * Get the imageAttachmentLayoutStyle of the StyledString.
     *
     * @type { ?ImageAttachmentLayoutStyle } - the imageAttachmentLayoutStyle of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    readonly layoutStyle?: ImageAttachmentLayoutStyle;

    /**
     * Get the imageAttachment colorFilter of the StyledString.
     *
     * @type { ?ColorFilterType } - the imageAttachment colorFilter of the StyledString or undefined
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 15 dynamic
     */
    readonly colorFilter?: ColorFilterType;

    /**
     * Gets the svg support state.
     *
     * @type { ?boolean } - If color filter support svg.
     * @readonly
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 22 dynamic
     */
    readonly supportSvg2?: boolean;
}

/**
 * Defines the ResourceImageAttachmentOptions.
 *
 * @interface ResourceImageAttachmentOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 15 dynamic
 */
declare interface ResourceImageAttachmentOptions {
    /**
     * The content of the ResourceImageAttachment.
     *
     * @type { Optional<ResourceStr> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 15 dynamic
     */
    resourceValue: Optional<ResourceStr>;

    /**
     * size of the ResourceImage.
     *
     * @type { ?SizeOptions }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 15 dynamic
     */
    size?: SizeOptions;

    /**
     * Image vertical align.
     *
     * @type { ?ImageSpanAlignment }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 15 dynamic
     */
    verticalAlign?: ImageSpanAlignment;

    /**
     * Sets the zoom type of the ImageAttachment.
     *
     * @type { ?ImageFit }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 15 dynamic
     */
    objectFit?: ImageFit;

    /**
     * The Image Layout Style of the Resource Image.
     *
     * @type { ?ImageAttachmentLayoutStyle }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 15 dynamic
     */
    layoutStyle?: ImageAttachmentLayoutStyle;

    /**
     * Sets the color filter effect on the image attachment.
     *
     * @type { ?ColorFilterType } filter ColorFilter object.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 15 dynamic
     */
    colorFilter?: ColorFilterType;

    /**
     * Sets the synchronous or asynchronous mode for image loading.
     * The default parameter type is bool, and the default value is false.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 15 dynamic
     */
    syncLoad?: boolean;

    /**
     * Sets the range of SVG parsing capabilities supported through enable switch.
     * The default value is false.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 22 dynamic
     */
    supportSvg2?: boolean;
}

/**
 * Defines the ImageAttachmentInterface.
 *
 * @interface ImageAttachmentInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface ImageAttachmentInterface {
    /**
     * The content of the ImageAttachment.
     *
     * @type { PixelMap }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    value: PixelMap;

    /**
     * Image size.
     *
     * @type { ?SizeOptions }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    size?: SizeOptions;

    /**
     * Image vertical align.
     *
     * @type { ?ImageSpanAlignment }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    verticalAlign?: ImageSpanAlignment;

    /**
     * Image fit.
     *
     * @type { ?ImageFit }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    objectFit?: ImageFit;

    /**
     * The Image Layout Style.
     *
     * @type { ?ImageAttachmentLayoutStyle }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    layoutStyle?: ImageAttachmentLayoutStyle;

    /**
     * Sets the color filter effect on the image attachment.
     *
     * @type { ?ColorFilterType } filter ColorFilter object.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 15 dynamic
     */
    colorFilter?: ColorFilterType;
}

/**
 * Defines the Attachment Type.
 *
 * @typedef { ImageAttachmentInterface | ResourceImageAttachmentOptions } AttachmentType
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 15 dynamic
 */
declare type AttachmentType = ImageAttachmentInterface | ResourceImageAttachmentOptions;

/**
 * Defines the ColorFilter Type.
 *
 * @typedef { ColorFilter | DrawingColorFilter } ColorFilterType
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 15 dynamic
 */
declare type ColorFilterType = ColorFilter | DrawingColorFilter;

/**
 * Defines the  ImageAttachment Layout Style.
 *
 * @interface ImageAttachmentLayoutStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface ImageAttachmentLayoutStyle {
    /**
     * Outer Margin.
     *
     * @type { ?(LengthMetrics | Margin) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    margin?: LengthMetrics | Margin;

    /**
     * Inner margin.
     *
     * @type { ?(LengthMetrics | Padding) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    padding?: LengthMetrics | Padding;

    /**
     * Border radius.
     *
     * @type { ?(LengthMetrics | BorderRadiuses) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    borderRadius?: LengthMetrics | BorderRadiuses;
}

/**
 * Defines the CustomSpanMetrics interface.
 *
 * @interface CustomSpanMetrics
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface CustomSpanMetrics {
    /**
     * CustomSpan Width.
     * The unit is vp.
     *
     * @type { number }
     * @default 0
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    width: number;

    /**
     * CustomSpan Height.
     * The unit is vp.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    height?: number;
}

/**
 * Defines the CustomSpanDrawInfo interface.
 *
 * @interface CustomSpanDrawInfo
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface CustomSpanDrawInfo {
    /**
     * CustomSpan's offset relative to the parent component.
     * The unit is px.
     * 
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    x: number;

    /**
     * The top position of the line where customSpan is located.
     * The unit is px.
     * 
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    lineTop: number;

    /**
     * The bottom position of the line where customSpan is located.
     * The unit is px.
     * 
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    lineBottom: number;

    /**
     * The baseline offset of the line where customSpan is located.
     * The unit is px.
     * 
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    baseline: number;
}

/**
 * Defines the CustomSpanMeasureInfo interface.
 *
 * @interface CustomSpanMeasureInfo
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface CustomSpanMeasureInfo {
    /**
     * Current component's fontSize value.
     * The unit is fp.
     * 
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    fontSize: number;
}

/**
 * Defines the LeadingMarginSpanDrawInfo interface.
 *
 * @interface LeadingMarginSpanDrawInfo
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 22 dynamic
 */
declare interface LeadingMarginSpanDrawInfo {
    /**
     * The x offset of the line.
     * The unit is px.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 22 dynamic
     */
    x: number;

    /**
     * The top position of the line.
     * The unit is px.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 22 dynamic
     */
    top: number;

    /**
     * The bottom position of the line.
     * The unit is px.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 22 dynamic
     */
    bottom: number;

    /**
     * The baseline offset of the line.
     * The unit is px.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 22 dynamic
     */
    baseline: number;

    /**
     * The direction of text. The default value is TextDirection.DEFAULT.
     *
     * @type { TextDirection }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 22 dynamic
     */
    direction: TextDirection;

    /**
     * The start index of the first character in the current line relative to the component text content.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 22 dynamic
     */
    start: number;

    /**
     * The end index of the first character in the current line relative to the component text content.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 22 dynamic
     */
    end: number;

    /**
     * Whether current line is first line of a paragraph.
     *
     * @type { boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 22 dynamic
     */
    first: boolean;
}

/**
 * Defines CustomSpan.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare abstract class CustomSpan {
    /**
     * Measure the size of custom span.
     *
     * @param { CustomSpanMeasureInfo } measureInfo
     * @returns { CustomSpanMetrics } - CustomSpan Size
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    abstract onMeasure(measureInfo: CustomSpanMeasureInfo) : CustomSpanMetrics;

    /**
     * Draw the custom span.
     *
     * @param { DrawContext } context
     * @param { CustomSpanDrawInfo } drawInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    abstract onDraw(context: DrawContext, drawInfo: CustomSpanDrawInfo): void;

    /**
     * Invalidate all components that use the object, which will cause a re-render of all components.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 13 dynamic
     */
    invalidate(): void;
}

/**
 * Defines UserDataSpan. Used to store and obtain user data.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare abstract class UserDataSpan {}

/**
 * Defines LeadingMarginSpan.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 22 dynamic
 */
declare abstract class LeadingMarginSpan {
    /**
     * Draw the leading margin span.
     *
     * @param { DrawContext } context
     * @param { LeadingMarginSpanDrawInfo } drawInfo
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 22 dynamic
     */
    abstract onDraw(context: DrawContext, drawInfo: LeadingMarginSpanDrawInfo): void;
    /**
     * Get the amount by which to adjust the leading margin.
     *
     * @returns { LengthMetrics } - the literal content of the StyledString
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 22 dynamic
     */
    abstract getLeadingMargin(): LengthMetrics;
}