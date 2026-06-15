/*
 * Copyright (c) 2021-2024 Huawei Device Co., Ltd.
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
 * Declare the type of input box
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Declare the type of input box
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Declare the type of input box
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare enum InputType {
  /**
   * Basic input mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Basic input mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Basic input mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  Normal,

  /**
   * Pure digital input mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Pure digital input mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Pure digital input mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  Number,

  /**
   * Phone number entry mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Phone number entry mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Phone number entry mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  PhoneNumber,

  /**
   * E-mail address input mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * E-mail address input mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * E-mail address input mode.
   *
   * <p><strong>NOTE</strong>:
   * <br>This mode accepts only digits, letters, underscores (_), dots (.),
   * and the following special characters: ! # $ % & ' " * + - / = ? ^ ` { | } ~ @ (which can only appear once)
   * </p>
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  Email,

  /**
   * Password entry mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Password entry mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Password entry mode.
   *
   * <p><strong>NOTE</strong>:
   * <br>An eye icon is used to show or hide the password.
   * <br>By default, the entered characters are temporarily shown before being obscured by dots;
   * they are directly obscured by dots since API version 12 on certain devices.
   * <br>The password input mode does not support underlines.
   * <br>If Password Vault is enabled, autofill is available for the username and password.
   * </p>
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  Password,

  /**
   * Number Password entry mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Number Password entry mode.
   *
   * <p><strong>NOTE</strong>:
   * <br>An eye icon is used to show or hide the password.
   * <br>By default, the entered characters are temporarily shown before being obscured by dots;
   * they are directly obscured by dots since API version 12 on certain devices.
   * <br>The password input mode does not support underlines.
   * </p>
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  NUMBER_PASSWORD = 8,

  /**
   * Screen Lock Password entry mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 11 dynamic
   */
  SCREEN_LOCK_PASSWORD = 9,

  /**
   * UserName entry mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 11
   */
  /**
   * UserName entry mode.
   *
   * <p><strong>NOTE</strong>:
   * <br>If Password Vault is enabled, autofill is available for the username and password.
   * </p>
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  USER_NAME = 10,

  /**
   * NewPassword entry mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 11
   */
  /**
   * NewPassword entry mode.
   *
   * <p><strong>NOTE</strong>:
   * <br>An eye icon is used to show or hide the password.
   * <br>By default, the entered characters are temporarily shown before being obscured by dots;
   * they are directly obscured by dots since API version 12 on certain devices.
   * <br>If Password Vault is enabled, a new password can be automatically generated.
   * </p>
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  NEW_PASSWORD = 11,

  /**
   * Number decimal entry mode.
   *
   * <p><strong>NOTE</strong>:
   * <br>The value can contain digits and one decimal point.
   * </p>
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
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
 * Declare the type of input content
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12 dynamic
 */
declare enum ContentType {
  /**
   * User name content type.
   * Password Vault, when enabled, can automatically save and fill in usernames.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  USER_NAME = 0,

  /**
   * Password content type.
   * Password Vault, when enabled, can automatically save and fill in passwords.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  PASSWORD = 1,

  /**
   * New password content type.
   * Password Vault, when enabled, can automatically generate a new password.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  NEW_PASSWORD = 2,

  /**
   * Full street address content type.
   * The scenario-based autofill feature, when enabled,
   * can automatically save and fill in full street addresses.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  FULL_STREET_ADDRESS = 3,

  /**
   * House number content type.
   * The scenario-based autofill feature, when enabled,
   * can automatically save and fill in house numbers.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  HOUSE_NUMBER = 4,

  /**
   * District address content type.
   * The scenario-based autofill feature, when enabled,
   * can automatically save and fill in districts and counties.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  DISTRICT_ADDRESS = 5,

  /**
   * City address content type.
   * The scenario-based autofill feature, when enabled,
   * can automatically save and fill in cities.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  CITY_ADDRESS = 6,

  /**
   * Province address content type.
   * The scenario-based autofill feature, when enabled,
   * can automatically save and fill in provinces.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  PROVINCE_ADDRESS = 7,

  /**
   * Country address content type.
   * The scenario-based autofill feature, when enabled,
   * can automatically save and fill in countries.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  COUNTRY_ADDRESS = 8,

  /**
   * Person full name content type.
   * The scenario-based autofill feature, when enabled,
   * can automatically save and fill in full names.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  PERSON_FULL_NAME = 9,

  /**
   * Person last name content type.
   * The scenario-based autofill feature, when enabled,
   * can automatically save and fill in last names.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  PERSON_LAST_NAME = 10,

  /**
   * Person first name content type.
   * The scenario-based autofill feature, when enabled,
   * can automatically save and fill in first names.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  PERSON_FIRST_NAME = 11,

  /**
   * Phone number content type.
   * The scenario-based autofill feature, when enabled,
   * can automatically save and fill in phone numbers.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  PHONE_NUMBER = 12,

  /**
   * Phone country code content type.
   * The scenario-based autofill feature, when enabled,
   * can automatically save and fill in country codes.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  PHONE_COUNTRY_CODE = 13,

  /**
   * Full phone number content type.
   * The scenario-based autofill feature, when enabled,
   * can automatically save and fill in phone numbers with country codes.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  FULL_PHONE_NUMBER = 14,

  /**
   * Email address content type.
   * The scenario-based autofill feature, when enabled,
   * can automatically save and fill in email addresses.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  EMAIL_ADDRESS = 15,

  /**
   * Bank card number content type.
   * The scenario-based autofill feature, when enabled,
   * can automatically save and fill in bank card numbers.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  BANK_CARD_NUMBER = 16,

  /**
   * ID card number content type.
   * The scenario-based autofill feature, when enabled,
   * can automatically save and fill in ID card numbers.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  ID_CARD_NUMBER = 17,

  /**
   * Nickname content type.
   * The scenario-based autofill feature, when enabled,
   * can automatically save and fill in nicknames.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  NICKNAME = 23,

  /**
   * Detail info without street content type.
   * The scenario-based autofill feature, when enabled,
   * can automatically save and fill in address information without street addresses.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  DETAIL_INFO_WITHOUT_STREET = 24,

  /**
   * Format address content type.
   * The scenario-based autofill feature, when enabled,
   * can automatically save and fill in standard addresses.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  FORMAT_ADDRESS = 25,

  /**
   * Passport number content type.
   * The scenario-based autofill feature, when enabled,
   * can automatically save and fill in passport numbers.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 18 dynamic
   */
  PASSPORT_NUMBER = 26,

  /**
   * Passport validity content type.
   * The scenario-based autofill feature, when enabled,
   * can automatically save and fill in passport validity periods.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 18 dynamic
   */
  VALIDITY = 27,

  /**
   * Place of issue content type.
   * The scenario-based autofill feature, when enabled,
   * can automatically save and fill in the place of issue for passports.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 18 dynamic
   */
  ISSUE_AT = 28,

  /**
   * Invoice organization content type.
   * The scenario-based autofill feature, when enabled,
   * can automatically save and fill in invoice titles.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 18 dynamic
   */
  ORGANIZATION = 29,

  /**
   * Invoice tax id content type.
   * The scenario-based autofill feature, when enabled,
   * can automatically save and fill in tax IDs.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 18 dynamic
   */
  TAX_ID = 30,

  /**
   * Address city and state content type.
   * The scenario-based autofill feature, when enabled,
   * can automatically save and fill in locations.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 18 dynamic
   */
  ADDRESS_CITY_AND_STATE = 31,

  /**
   * Airline flight number content type.
   * Currently not supported for automatic saving and auto-filling.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 18 dynamic
   */
  FLIGHT_NUMBER = 32,

  /**
   * License number for drivers content type.
   * Currently not supported for automatic saving and auto-filling.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 18 dynamic
   */
  LICENSE_NUMBER = 33,

  /**
   * License file number for drivers content type.
   * Currently not supported for automatic saving and auto-filling.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 18 dynamic
   */
  LICENSE_FILE_NUMBER = 34,

  /**
   * License plate for vehicles content type.
   * The scenario-based autofill feature, when enabled,
   * can automatically save and fill in license plate numbers.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 18 dynamic
   */
  LICENSE_PLATE = 35,

  /**
   * Engine number for vehicles content type.
   * Currently not supported for automatic saving and auto-filling.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 18 dynamic
   */
  ENGINE_NUMBER = 36,

  /**
   * License chassis number for vehicles content type.
   * Currently not supported for automatic saving and auto-filling.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 18 dynamic
   */
  LICENSE_CHASSIS_NUMBER = 37
}

/**
 * Declare the type of soft keyboard.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Declare the type of soft keyboard.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Declare the type of soft keyboard.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare enum EnterKeyType {
  /**
   * Go.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Go.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Go.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  Go = 2,

  /**
   * Search.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Search.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Search.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  Search = 3,

  /**
   * Send.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Send.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Send.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  Send = 4,

  /**
   * Next.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Next.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Next.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  Next = 5,

  /**
   * Done.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Done.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Done.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  Done = 6,

  /**
   * Showed as 'previous' pattern.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Showed as 'previous' pattern.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  PREVIOUS = 7,

  /**
   * Showed as 'new line' pattern.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Showed as 'new line' pattern.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  NEW_LINE = 8,
}

/**
  * Defines the underline color width property.
  *
  * @interface UnderlineColor
  * @syscap SystemCapability.ArkUI.ArkUI.Full
  * @crossplatform
  * @atomicservice
  * @since 12 dynamic
  */
declare interface UnderlineColor {
  /**
    * Typing underline color width property.
    *
    * <p><strong>NOTE</strong>:
    * <br>If no value is specified or if the value specified is undefined,
    * null, or invalid, the default value is used.
    * </p>
    *
    * @type { ?(ResourceColor | undefined) }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12 dynamic
    */
  typing?: ResourceColor | undefined;
  /**
    * Normal underline color width property.
    *
    * <p><strong>NOTE</strong>:
    * <br>If no value is specified or if the value specified is undefined,
    * null, or invalid, the default value is used.
    * </p>
    *
    * @type { ?(ResourceColor | undefined) }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12 dynamic
    */
  normal?: ResourceColor | undefined;
  /**
    * Error underline color width property.
    *
    * <p><strong>NOTE</strong>:
    * <br>If no value is specified or if the value specified is undefined,
    * null, or invalid, the default value is used.
    * <br>This option changes the color used in the showCounter attribute
    * when the maximum number of characters is reached.
    * </p>
    *
    * @type { ?(ResourceColor | undefined) }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12 dynamic
    */
  error?: ResourceColor | undefined;
  /**
    * Disable underline color width property.
    *
    * <p><strong>NOTE</strong>:
    * <br>If no value is specified or if the value specified is undefined,
    * null, or invalid, the default value is used.
    * </p>
    *
    * @type { ?(ResourceColor | undefined) }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12 dynamic
    */
  disable?: ResourceColor | undefined;
} 

/**
 * Provides the method of keeping TextInput editable state when submitted.
 *
 * @interface SubmitEvent
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare interface SubmitEvent {
  /**
   * Keeps TextInput editable state when submitted
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  keepEditableState(): void;

  /**
   * Sets the current value of TextInput.
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  text: string;
}

/**
 * Provides the method of switching the cursor position.
 *
 * @extends TextContentControllerBase
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
declare class TextInputController extends TextContentControllerBase {
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
   * A constructor used to create a TextInputController object.
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
   * <p><strong>NOTE</strong>:
   * <br>If the value is less than 0, the value 0 is used.
   * <br>If the value exceeds the text length, the caret is placed at the end of the text.
   * </p>
   *
   * @param { number } value
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  caretPosition(value: number): void;

  /**
   * Text selection is achieved by specifying the start and end positions of the text.
   *
   * @param { number } selectionStart - The start position of the selected text.
   * @param { number } selectionEnd - The end position of the selected text.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Text selection is achieved by specifying the start and end positions of the text.
   *
   * @param { number } selectionStart - The start position of the selected text.
   * @param { number } selectionEnd - The end position of the selected text.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Text selection is achieved by specifying the start and end positions of the text.
   *
   * <p><strong>NOTE</strong>:
   * <br>If selectionStart or selectionEnd is set to undefined, the value 0 will be used.
   * <br>If selectionMenuHidden is set to true or a 2-in-1 device is used,
   * calling setTextSelection does not display the context menu even when options is set to MenuPolicy.SHOW.
   * <br>If the selected text contains an emoji,
   * the emoji is selected when its start position is within the text selection range.
   * </p>
   *
   * @param { number } selectionStart - The start position of the selected text.The start position of text in the text box is 0.
   * @param { number } selectionEnd - The end position of the selected text.
   * @param { SelectionOptions } [options] - Indicates the options of the text selection.Default value is MenuPolicy.DEFAULT.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  setTextSelection(selectionStart: number, selectionEnd: number, options?: SelectionOptions): void;

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
}

/**
 * Defines the options of TextInput.
 *
 * @interface TextInputOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the options of TextInput.
 *
 * @interface TextInputOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the options of TextInput.
 *
 * @interface TextInputOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare interface TextInputOptions {
  /**
   * The place holder text string.
   *
   * @type { ?ResourceStr }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * The place holder text string.
   *
   * @type { ?ResourceStr }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * The place holder text string.
   *
   * @type { ?ResourceStr }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  placeholder?: ResourceStr;

  /**
   * Sets the current value of TextInput.
   *
   * @type { ?ResourceStr }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Sets the current value of TextInput.
   *
   * @type { ?ResourceStr }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the current value of TextInput.
   *
   * <p><strong>NOTE</strong>:
   * <br>You are advised to bind the state variable to the text in real time through the onChange event,
   * so as to prevent display errors when the component is updated.
   * <br>Since API version 10, this parameter supports two-way binding through $$.
   * <br>Since API version 18, this parameter supports two-way binding through !!.
   * </p>
   *
   * @type { ?ResourceStr }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  text?: ResourceStr;

  /**
   * Called when the position of the insertion cursor is set.
   *
   * @type { ?TextInputController }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Called when the position of the insertion cursor is set.
   *
   * @type { ?TextInputController }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the position of the insertion cursor is set.
   *
   * @type { ?TextInputController }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  controller?: TextInputController;
}

/**
 * Text input style.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Text input style.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Text input style.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare enum TextInputStyle {
  /**
   * Text input default style.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Text input default style.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Text input default style.
   *
   * <p><strong>NOTE</strong>:
   * <br>The caret width is fixed at 1.5 vp,
   * and the caret height is subject to the background height and font size of the selected text.
   * </p>
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  Default,

  /**
   * Text input inline style.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Text input inline style.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Text input inline style.
   *
   * <p><strong>NOTE</strong>:
   * <br>The background height of the selected text is the same as the height of the text box.
   * <br>This style is used in scenarios where editing and non-editing states are obvious,
   * for example, renaming in the file list view.
   * <br>The showError attribute is not supported for this style.
   * <br>This style does not allow for text dragging and dropping.
   * </p>
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  Inline
}

/**
 * Provides a single-line text input component interface.
 *
 * @interface TextInputInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Provides a single-line text input component interface.
 *
 * @interface TextInputInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provides a single-line text input component interface.
 *
 * @interface TextInputInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
interface TextInputInterface {
  /**
   * Called when writing a single line of text.
   *
   * @param { TextInputOptions } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when writing a single line of text.
   *
   * @param { TextInputOptions } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when writing a single line of text.
   *
   * @param { TextInputOptions } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  (value?: TextInputOptions): TextInputAttribute;
}

/**
 * PasswordIcon object.
 *
 * @interface PasswordIcon
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * PasswordIcon object.
 *
 * @interface PasswordIcon
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
interface PasswordIcon {
  /**
   * Define the on icon source of PasswordIcon.
   *
   * @type { ?(string | Resource) }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Define the on icon source of PasswordIcon.
   *
   * <p><strong>NOTE</strong>:
   * <br>Icon that can be used to hide the password in password input mode.
   * <br>The string type can be used to load network images and local images.
   * </p>
   *
   * @type { ?(string | Resource) }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  onIconSrc?: string | Resource;

  /**
   * Define the off icon source of PasswordIcon.
   *
   * @type { ?(string | Resource) }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Define the off icon source of PasswordIcon.
   *
   * <p><strong>NOTE</strong>:
   * <br>Icon that can be used to show the password in password input mode.
   * <br>The string type can be used to load network images and local images.
   * </p>
   *
   * @type { ?(string | Resource) }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  offIconSrc?: string | Resource;
}

/**
 * Defines a TextInput callback when onSubmit.
 *
 * Anonymous Object Rectification.
 * @typedef { function } OnSubmitCallback
 * @param { EnterKeyType } enterKey - Input method Enter key type.
 * @param { SubmitEvent } event - The event submitted.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
declare type OnSubmitCallback = (enterKey: EnterKeyType, event: SubmitEvent) => void;

/**
 * Defines a TextInput callback when onTextSelectionChange.
 *
 * Anonymous Object Rectification.
 * @typedef { function } OnTextSelectionChangeCallback
 * @param { number } selectionStart - The starting position of the selected text, the starting position of the text is 0.
 * @param { number } selectionEnd - The end location of the selected text.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
declare type OnTextSelectionChangeCallback = (selectionStart: number, selectionEnd: number) => void;

/**
 * Defines a TextInput callback when onContentScroll.
 *
 * Anonymous Object Rectification.
 * @typedef { function } OnContentScrollCallback
 * @param { number } totalOffsetX - The text is offset in px on the horizontal axis of the content area.
 * @param { number } totalOffsetY - The text is offset in px on the vertical axis of the content area.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
declare type OnContentScrollCallback = (totalOffsetX: number, totalOffsetY: number) => void;


/**
 * Defines a TextInput callback when onPaste.
 *
 * Anonymous Object Rectification.
 * @typedef { function } OnPasteCallback
 * @param { string } content - The text content of the paste.
 * @param { PasteEvent } event - User-defined paste event.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
declare type OnPasteCallback = (content: string, event: PasteEvent) => void;

/**
 * Defines the TextInput attribute functions.
 *
 * @extends CommonMethod<TextInputAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the TextInput attribute functions.
 *
 * @extends CommonMethod<TextInputAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the TextInput attribute functions.
 *
 * @extends CommonMethod<TextInputAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare class TextInputAttribute extends CommonMethod<TextInputAttribute> {
  /**
   * Called when the input type is set.
   *
   * @param { InputType } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the input type is set.
   *
   * @param { InputType } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the input type is set.
   *
   * @param { InputType } value - Default value is InputType.Normal.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  type(value: InputType): TextInputAttribute;

  /**
   * Called when the content type is set.
   *
   * @param { ContentType } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  contentType(value: ContentType): TextInputAttribute;

  /**
   * Enable selected data detector.
   *
   * @param { boolean | undefined } enable - whether to enable the selected data detector.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 22 dynamic
   */
  enableSelectedDataDetector(enable: boolean | undefined): TextInputAttribute

  /**
   * Called when the color of the placeholder is set.
   *
   * @param { ResourceColor } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the color of the placeholder is set.
   *
   * @param { ResourceColor } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the color of the placeholder is set.
   *
   * @param { ResourceColor } value - Default value follows the theme.The default value on wearable devices is '#99ffffff'.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  placeholderColor(value: ResourceColor): TextInputAttribute;

  /**
   * Called when the overflow mode of the font is set.
   *
   * <p><strong>NOTE</strong>:
   * <br>This attribute is only available for the inline input style.
   * <br>Text is clipped at the transition between words.
   * <br>To clip text in the middle of a word, set wordBreak to WordBreak.BREAK_ALL.
   * <br>TextOverflow.None produces the same effect as TextOverflow.Clip.
   * <br>Default value in non-editing state in the inline input style: TextOverflow.Ellipsis.
   * <br>Default value in editing state in the inline input style: TextOverflow.Clip.
   * <br>The TextInput component does not support the TextOverflow.MARQUEE mode.
   * <br>If TextOverflow.MARQUEE is set, the component automatically switches to TextOverflow.Ellipsis
   * for the non-editing state in the inline input style and TextOverflow.Clip
   * for the non-inline input style and the editing state in the inline input style.
   * </p>
   *
   * @param { TextOverflow } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  textOverflow(value: TextOverflow): TextInputAttribute;

  /**
   * Specify the indentation of the first line in a text-block.
   *
   * @param { Dimension } value - The length of text indent.Default value is 0.
   * @returns { TextInputAttribute } The attribute of the text.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  textIndent(value: Dimension): TextInputAttribute;

  /**
   * Called when the font property of the placeholder is set.
   *
   * @param { Font } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the font property of the placeholder is set.
   *
   * @param { Font } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the font property of the placeholder is set.
   *
   * <p><strong>NOTE</strong>:
   * <br>The 'HarmonyOS Sans' font and registered custom fonts are supported.
   * <br>The default value on wearable devices is 18fp.
   * </p>
   *
   * @param { Font } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  placeholderFont(value?: Font): TextInputAttribute;

  /**
   * Called when the type of soft keyboard input button is set.
   *
   * @param { EnterKeyType } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the type of soft keyboard input button is set.
   *
   * @param { EnterKeyType } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the type of soft keyboard input button is set.
   *
   * @param { EnterKeyType } value - Default value is EnterKeyType.Done.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  enterKeyType(value: EnterKeyType): TextInputAttribute;

  /**
   * Called when the color of the insertion cursor is set.
   *
   * @param { ResourceColor } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the color of the insertion cursor is set.
   *
   * @param { ResourceColor } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the color of the insertion cursor is set.
   *
   * <p><strong>NOTE</strong>:
   * <br>Since API version 12, this API can be used to set the text handle color, which is the same as the caret color.
   * </p>
   *
   * @param { ResourceColor } value - Default value is '#007DFF'.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  caretColor(value: ResourceColor): TextInputAttribute;

  /**
   * Called when judging whether the text editing change finished.
   *
   * <p><strong>NOTE</strong>:
   * <br>This API is deprecated since API version 8.
   * <br>You are advised to use onEditChange instead.
   * </p>
   *
   * @param { function } callback - The value true indicates that the text box is in the editing state.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7 dynamiconly
   * @deprecated since 8
   * @useinstead onEditChange
   */
  onEditChanged(callback: (isEditing: boolean) => void): TextInputAttribute;

  /**
   * Called when judging whether the text editing change finished.
   *
   * @param { function } callback
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Called when judging whether the text editing change finished.
   *
   * @param { function } callback
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when judging whether the text editing change finished.
   *
   * @param { function } callback
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Called when judging whether the text editing change finished.
   *
   * Anonymous Object Rectification.
   *
   * <p><strong>NOTE</strong>:
   * <br>The text box is in the editing state when it has the caret placed in it,
   * and is in the non-editing state otherwise.
   * <br>It returns true if the input operation is currently in progress.
   * </p>
   *
   * @param { Callback<boolean> } callback
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onEditChange(callback: Callback<boolean>): TextInputAttribute;

  /**
   * Called when submitted.
   *
   * @param { function } callback
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when submitted.
   *
   * @param { function } callback
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when submitted.
   *
   * @param { function } callback - callback of the listened event.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Called when submitted.
   *
   * Anonymous Object Rectification.
   * @param { OnSubmitCallback } callback - Callback of the listened event.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onSubmit(callback: OnSubmitCallback): TextInputAttribute;

  /**
   * Called when the input of the input box changes.
   *
   * @param { function } callback
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the input of the input box changes.
   *
   * @param { function } callback
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the input of the input box changes.
   *
   * @param { function } callback
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Called when the input of the input box changes.
   *
   * <p><strong>NOTE</strong>:
   * <br>In this callback, if cursor operations are performed, you need to adjust the cursor logic
   * based on the previewText parameter to ensure it works seamlessly within the preview display scenario.
   * </p>
   *
   * @param { EditableTextOnChangeCallback } callback
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onChange(callback: EditableTextOnChangeCallback): TextInputAttribute;

  /**
   * Called when the text selection changes.
   *
   * @param { function } callback - callback of the listened event.
   * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the text selection changes.
   *
   * @param { function } callback - callback of the listened event.
   * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
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
   * @returns { TextInputAttribute } Returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onTextSelectionChange(callback: OnTextSelectionChangeCallback): TextInputAttribute;

  /**
   * Called when the content scrolls.
   *
   * @param { function } callback - callback of the listened event.
   * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the content scrolls.
   *
   * @param { function } callback - callback of the listened event.
   * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
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
   * @returns { TextInputAttribute } Returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onContentScroll(callback: OnContentScrollCallback): TextInputAttribute;

  /**
   * Called when the input of maximum text length is set.
   *
   * @param { number } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the input of maximum text length is set.
   *
   * @param { number } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the input of maximum text length is set.
   *
   * <p><strong>NOTE</strong>:
   * <br>If this attribute is not set or is set to an invalid value, the default value is used.
   * <br>If a decimal number is specified, the integer part is used.
   * </p>
   *
   * @param { number } value - Default value is Infinity, indicating that there is no upper limit on the number of characters that can be entered.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  maxLength(value: number): TextInputAttribute;

  /**
   * Called when the font color is set.
   *
   * @param { ResourceColor } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the font color is set.
   *
   * @param { ResourceColor } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the font color is set.
   *
   * @param { ResourceColor } value - The default value on wearable devices is '#dbffffff'.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  fontColor(value: ResourceColor): TextInputAttribute;

  /**
   * Called when the font size is set.
   *
   * @param { Length } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the font size is set.
   *
   * @param { Length } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the font size is set.
   *
   * <p><strong>NOTE</strong>:
   * <br>If fontSize is of the number type, the unit fp is used.
   * <br>The default font size is 16 fp.
   * <br>The value cannot be a percentage.
   * <br>The default value on wearable devices is 18fp.
   * </p>
   *
   * @param { Length } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  fontSize(value: Length): TextInputAttribute;

  /**
   * Called when the font style of a font is set.
   *
   * @param { FontStyle } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the font style of a font is set.
   *
   * @param { FontStyle } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the font style of a font is set.
   *
   * @param { FontStyle } value - Default value is FontStyle.Normal.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  fontStyle(value: FontStyle): TextInputAttribute;

  /**
   * Called when the font weight is set.
   *
   * @param { number | FontWeight | string } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the font weight is set.
   *
   * @param { number | FontWeight | string } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
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
   * @param { number | FontWeight | string } value - Default value is FontWeight.Normal.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
   /**
   * Called when the font weight is set.
   *
   * @param { number | FontWeight | ResourceStr } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  fontWeight(value: number | FontWeight | ResourceStr): TextInputAttribute;

  /**
   * Called when the font list of text is set.
   *
   * @param { ResourceStr } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the font list of text is set.
   *
   * @param { ResourceStr } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
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
   * @param { ResourceStr } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  fontFamily(value: ResourceStr): TextInputAttribute;

  /**
   * Called when the inputFilter of text is set.
   *
   * @param { ResourceStr } value
   * @param { function } error
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Called when the inputFilter of text is set.
   *
   * @param { ResourceStr } value
   * @param { function } error
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the inputFilter of text is set.
   *
   * @param { ResourceStr } value
   * @param { function } error
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Called when the inputFilter of text is set.
   *
   * Anonymous Object Rectification.
   *
   * <p><strong>NOTE</strong>:
   * <br>Only inputs that comply with the regular expression can be displayed.
   * <br>Other inputs are filtered out.
   * <br>The specified regular expression can match single characters, but not strings.
   * <br>Since API version 11, if inputFilter is set and the entered characters are not null,
   * the filtering effect attached to the text box type (specified through the type attribute) does not take effect.
   * </p>
   *
   * @param { ResourceStr } value
   * @param { Callback<string> } [error]
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  inputFilter(value: ResourceStr, error?: Callback<string>): TextInputAttribute;

  /**
   * Called when using the Clipboard menu
   *
   * @param { function } callback
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Called when using the Clipboard menu
   *
   * @param { function } callback
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when using the Clipboard menu
   *
   * @param { function } callback
   * @returns { TextInputAttribute }
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
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onCopy(callback: Callback<string>): TextInputAttribute;

  /**
   * Called when using the Clipboard menu
   *
   * @param { function } callback
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Called when using the Clipboard menu
   *
   * @param { function } callback
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when using the Clipboard menu
   *
   * @param { function } callback
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Called when using the Clipboard menu.
   *
   * Anonymous Object Rectification.
   * @param { Callback<string> } callback
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onCut(callback: Callback<string>): TextInputAttribute;

  /**
   * Called when using the Clipboard menu
   *
   * @param { function } callback
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Called when using the Clipboard menu
   *
   * @param { function } callback
   * @returns { TextInputAttribute }
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
   * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Called when using the Clipboard menu.
   *
   * Anonymous Object Rectification.
   * @param { OnPasteCallback } callback - Executed when a paste operation is performed.
   * @returns { TextInputAttribute } Returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onPaste(callback: OnPasteCallback): TextInputAttribute;

  /**
   * Called when the copy option is set.
   *
   * @param { CopyOptions } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Called when the copy option is set.
   *
   * @param { CopyOptions } value
   * @returns { TextInputAttribute }
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
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  copyOption(value: CopyOptions): TextInputAttribute;

  /**
   * Called when the password show/hide icon is set.
   *
   * @param { boolean } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Called when the password show/hide icon is set.
   *
   * @param { boolean } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the password show/hide icon is set.
   *
   * <p><strong>NOTE</strong>:
   * <br>This API has effect only when the input type is set to Password,
   * NEWPASSWORD, or NUMBERPASSWORD mode. It does not work in other modes.
   * <br>When in password mode, there may be inconsistency between the backend state of the text box
   * and the frontend application's state management variables.
   * <br>This can cause issues with the icon at the end of the password text box.
   * <br>To avoid such issues, use the onSecurityStateChange callback to sync the states.
   * </p>
   *
   * @param { boolean } value - Default value is true.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  showPasswordIcon(value: boolean): TextInputAttribute;

  /**
   * Called when the text align is set.
   *
   * @param { TextAlign } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Called when the text align is set.
   *
   * @param { TextAlign } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the text align is set.
   *
   * <p><strong>NOTE</strong>:
   * <br>Available options are TextAlign.Start, TextAlign.Center, and TextAlign.End.
   * <br>To set vertical alignment for the text, use the align attribute.
   * <br>The align attribute alone does not control the horizontal position of the text.
   * <br>In other words, Alignment.TopStart, Alignment.Top, and Alignment.TopEnd produce the same effect, top-aligning the text;
   * Alignment.Start, Alignment.Center, and Alignment.End produce the same effect, centered-aligning the text vertically;
   * Alignment.BottomStart, Alignment.Bottom, and Alignment.BottomEnd produce the same effect, bottom-aligning the text.
   * </p>
   *
   * @param { TextAlign } value - Default value is TextAlign.Start.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  textAlign(value: TextAlign): TextInputAttribute;

  /**
   * Text input style
   *
   * @param { TextInputStyle | TextContentStyle } value - Text input style
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Text input style
   *
   * @param { TextInputStyle | TextContentStyle } value - Text input style
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Text input style
   *
   * <p><strong>NOTE</strong>:
   * <br>The inline input style only supports InputType.Normal.
   * </p>
   *
   * @param { TextInputStyle | TextContentStyle } value - Text input style.Default value is TextInputStyle.Default.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  style(value: TextInputStyle | TextContentStyle): TextInputAttribute;

  /**
   * Define the caret style of the text input
   *
   * @param { CaretStyle } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Define the caret style of the text input
   *
   * @param { CaretStyle } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  caretStyle(value: CaretStyle): TextInputAttribute;

  /**
   * Define the text selected background color of the text input.
   *
   * @param { ResourceColor } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Define the text selected background color of the text input.
   *
   * <p><strong>NOTE</strong>:
   * <br>If the opacity is not set, a 20% opacity will be used.
   * </p>
   *
   * @param { ResourceColor } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  selectedBackgroundColor(value: ResourceColor): TextInputAttribute;

  /**
   * Define the caret position of the text input.
   *
   * @param { number } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Define the caret position of the text input.
   *
   * @param { number } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  caretPosition(value: number): TextInputAttribute;

  /**
   * Sets whether request keyboard or not when on focus.
   *
   * @param { boolean } value
   * @returns { TextInputAttribute } Returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets whether request keyboard or not when on focus.
   * Sets whether to enable the input method when the TextInput component obtains focus in a way other than clicking.
   *
   * <p><strong>NOTE</strong>:
   * <br>Since API version 10, the TextInput component brings up the keyboard by default when it obtains focus.
   * </p>
   *
   * @param { boolean } value - Default value is true.
   * @returns { TextInputAttribute } Returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  enableKeyboardOnFocus(value: boolean): TextInputAttribute;

  /**
   * Define the password icon of the text input.
   *
   * @param { PasswordIcon } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Define the password icon of the text input.
   *
   * <p><strong>NOTE</strong>:
   * <br>Images in JPG, PNG, BMP, HEIC, and WEBP formats are supported.
   * <br>By default, the system-provided icon is used.
   * <br>The icon size is fixed at 24 vp (or 28 vp on wearable devices), regardless of the source image size.
   * </p>
   *
   * @param { PasswordIcon } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  passwordIcon(value: PasswordIcon): TextInputAttribute;

  /**
   * Define the show error of the text input.
   *
   * @param { string | undefined } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Define the show error of the text input.
   *
   * @param { string | undefined } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Define the show error of the text input.
   *
   * <p><strong>NOTE</strong>:
   * <br>On wearable devices, the error message is displayed at a font size of 13 fp and center-aligned.
   * <br>If the data type is ResourceStr and the input content does not comply with specifications, the error message is displayed.
   * <br>If the error message does not fit in one line, an ellipsis (…) is displayed to represent clipped text.
   * <br>If the data type is undefined, no error message is displayed.
   * <br>By default, no error message is displayed.
   * </p>
   *
   * @param { ResourceStr | undefined } [value]
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  showError(value?: ResourceStr | undefined): TextInputAttribute;

  /**
   * Define the show unit of the text input.
   *
   * @param { CustomBuilder } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Define the show unit of the text input.
   *
   * <p><strong>NOTE</strong>:
   * <br>This attribute effective only when showUnderline is set to true.
   * </p>
   *
   * @param { CustomBuilder } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  showUnit(value: CustomBuilder): TextInputAttribute;

  /**
   * Define the show underline of the text input.
   *
   * @param { boolean } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Define the show underline of the text input.
   *
   * <p><strong>NOTE</strong>:
   * <br>By default, the underline comes in the color of '#33182431', thickness of 1 px, and text box size of 48 vp.
   * <br>The underline is only available for the InputType.Normal type.
   * </p>
   *
   * @param { boolean } value - Default value is false.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  showUnderline(value: boolean): TextInputAttribute;

  /**
   * Define the underline color of the text input.
   *
   * <p><strong>NOTE</strong>:
   * <br>The underline color changes with the underline mode.
   * <br>If the underline color is only set for the normal state, you can directly enter a value of the ResourceColor type.
   * <br>If the value specified is undefined, null, or invalid, all underlines are restored to the default value.
   * <br>Default value: underline color configured for the theme, which is #33182431 by default.
   * </p>
   *
   * @param { ResourceColor | UnderlineColor | undefined } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  underlineColor(value: ResourceColor | UnderlineColor | undefined): TextInputAttribute;

  /**
   * Controls whether the selection menu pops up.
   *
   * @param { boolean } value
   * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Controls whether the selection menu pops up.
   *
   * <p><strong>NOTE</strong>:
   * <br><em>true</em>:
   * <br>The system text selection menu does not appear under the following circumstances:
   * clicking the text box cursor, long-pressing the text box, double-tapping the text box,
   * triple-tapping the text box, or right-clicking the text box.
   * <br><em>false</em>:
   * <br>The system text selection menu appears under the following circumstances:
   * clicking the text box cursor, long-pressing the text box, double-tapping the text box,
   * triple-tapping the text box, or right-clicking the text box.
   * </p>
   *
   * @param { boolean } value - Default value is false.
   * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  selectionMenuHidden(value: boolean): TextInputAttribute;

  /**
   * Define bar state of the text input.
   *
   * @param { BarState } value
   * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Define bar state of the text input.
   *
   * @param { BarState } value - Default value is BarState.Auto.
   * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 11 dynamic
   */
  /**
   * Define bar state of the text input.
   *
   * @param { BarState } value - Default value is BarState.Auto.
   * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  barState(value: BarState): TextInputAttribute;

  /**
   * Define max lines of the text input.
   *
   * @param { number } value
   * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Define max lines of the text input.
   * Value range: (0, +∞)
   *
   * @param { number } value - Default value is 3.
   * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  maxLines(value: number): TextInputAttribute;

  /**
   * Set the text inline style word break type.
   *
   * <p><strong>NOTE</strong>:
   * <br>This attribute is effective for the inline input style,
   * but does not apply to the placeholder text.
   * <br>The component does not support the clip attribute.
   * <br>Therefore, setting this attribute does not affect text clipping.
   * </p>
   *
   * @param { WordBreak } value - The word break type.Default value is WordBreak.BREAK_WORD.
   * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  wordBreak(value: WordBreak): TextInputAttribute;

  /**
   * Set the text line break strategy type.
   *
   * <p><strong>NOTE</strong>:
   * <br>This attribute takes effect when wordBreak is not set to breakAll.
   * <br>Hyphens are not supported.
   * <br>This attribute does not take effect for the non-inline input style.
   * </p>
   *
   * @param { LineBreakStrategy } strategy - The text line break strategy type.Default value is LineBreakStrategy.GREEDY.
   * @returns { TextInputAttribute } The attribute of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  lineBreakStrategy(strategy: LineBreakStrategy): TextInputAttribute;

  /**
   * Define custom keyboard of the text input.
   *
   * @param { CustomBuilder } value
   * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Define custom keyboard of the text input.
   *
   * @param { CustomBuilder } value
   * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Define custom keyboard of the text input.
   *
   * <p><strong>NOTE</strong>:
   * <br>When a custom keyboard is set, activating the text box opens the specified custom component,
   * instead of the system input method.
   * <br>The custom keyboard's height can be set through the height attribute of the custom component's root node,
   * and its width is fixed at the default value.
   * <br>The custom keyboard is presented by overlaying the original screen,
   * which is not compressed or lifted if avoid mode is not enabled or avoidance is not needed for the text box.
   * <br>The custom keyboard cannot obtain the focus, but it blocks gesture events.
   * <br>By default, the custom keyboard is closed when the input component loses the focus.
   * <br>You can also use the TextInputController.stopEditing API to close the keyboard.
   * <br>When a custom keyboard is set, the text box does not support camera input, even when the device supports.
   * <br>When setting a custom keyboard, you can bind the onKeyPrelme event to prevent input from the physical keyboard.
   * </p>
   *
   * @param { CustomBuilder } value - Set up a custom keyboard of TextInput
   * @param { KeyboardOptions } [options] - Indicates the custom keyboard options of TextInput
   * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  /**
   * Define custom keyboard of the text input.
   *
   * <p><strong>NOTE</strong>:
   * <br>When a custom keyboard is set, activating the text box opens the specified custom component,
   * instead of the system input method.
   * <br>The custom keyboard's height can be set through the height attribute of the custom component's root node,
   * and its width is fixed at the default value.
   * <br>The custom keyboard is presented by overlaying the original screen,
   * which is not compressed or lifted if avoid mode is not enabled or avoidance is not needed for the text box.
   * <br>The custom keyboard cannot obtain the focus, but it blocks gesture events.
   * <br>By default, the custom keyboard is closed when the input component loses the focus.
   * <br>You can also use the TextInputController.stopEditing API to close the keyboard.
   * <br>When a custom keyboard is set, the text box does not support camera input, even when the device supports.
   * <br>When setting a custom keyboard, you can bind the onKeyPrelme event to prevent input from the physical keyboard.
   * </p>
   * 
   * @param { CustomBuilder | ComponentContent | undefined } value - Set up a custom keyboard of TextInput
   * @param { KeyboardOptions } [options] - Indicates the custom keyboard options of TextInput
   * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  customKeyboard(value: CustomBuilder | ComponentContent | undefined, options?: KeyboardOptions): TextInputAttribute;

  /**
   * Show the counter when the number of characters entered exceeds the threshold through InputCounterOptions.
   *
   * <p><strong>NOTE</strong>:
   * <br>options can be set only when value is set to true, in which case a character counter is displayed below the text box.
   * <br>This attribute must be used together with maxLength.
   * <br>The character counter is displayed in this format: Number of characters entered/Character limit.
   * <br>It is visible when the number of characters entered is greater than the character limit multiplied by the threshold percentage value.
   * <br>If options is not set, the text box border and character counter subscript turn red
   * when the number of characters entered exceeds the limit.
   * <br>If value is set to true and options is set, the text box border and character counter subscript turn red
   * and the text box shakes when the number of characters entered reaches the limit,
   * provided that the value of thresholdPercentage is valid.
   * <br>If highlightBorder is set to false, the text box border does not turn red.
   * <br>By default, highlightBorder is set to true.
   * <br>The character counter is not displayed for text boxes in inline or password input style.
   * </p>
   *
   * @param { boolean } value - Set showcounter of the text input.
   * @param { InputCounterOptions } options - Set the percentage of counter.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  showCounter(value: boolean, options?: InputCounterOptions): TextInputAttribute;

  /**
   * Set the cancel button style
   *
   * @param { object } value - indicates the style of the cancel button.
   * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Set the cancel button style
   *
   * @param { object } value - indicates the style of the cancel button.
   * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  /**
   * Set the cancel button style.
   *
   * Anonymous Object Rectification.
   *
   * <p><strong>NOTE</strong>:
   * <br>This attribute is not available for the inline input style.
   * <br>The default value is 28fp on wearable devices.
   * </p>
   *
   * @param { CancelButtonOptions } options - Indicates the style of the cancel button.Default value is { style: CancelButtonStyle.INPUT }.
   * @returns { TextInputAttribute } Returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  cancelButton(options: CancelButtonOptions): TextInputAttribute;

  /**
   * Set the cancel button style
   *
   * <p><strong>NOTE</strong>:
   * <br>This attribute is not available for the inline input style.
   * </p>
   *
   * @param { CancelButtonSymbolOptions } symbolOptions - indicates the style of the cancel button.Default value is { style: CancelButtonStyle.INPUT }.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 18 dynamic
   */
  /**
   * Set the cancel button style
   *
   * <p><strong>NOTE</strong>:
   * <br>This attribute is not available for the inline input style.
   * </p>
   *
   * @param { CancelButtonSymbolOptions } symbolOptions - indicates the style of the cancel button.Default value is { style: CancelButtonStyle.INPUT }.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  cancelButton(symbolOptions: CancelButtonSymbolOptions): TextInputAttribute;

  /**
   * Sets selection when on focus.
   *
   * @param { boolean } value - Sets selection or not.
   * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Sets selection when on focus.
   *
   * <p><strong>NOTE</strong>:
   * <br>This attribute is not available for the inline input style.
   * </p>
   *
   * @param { boolean } value - Sets selection or not.Default value is false.
   * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  selectAll(value: boolean): TextInputAttribute;

  /**
   * Called when the minimum font size of the font is set.
   *
   * <p><strong>NOTE</strong>:
   * <br>For the string type, numeric string values with optional units,
   * for example, "10" or "10fp", are supported.
   * <br>For the setting to take effect, this attribute must be used together with maxFontSize
   * and maxLines (when the component is in editing state in the inline input style), or layout constraint settings.
   * <br>When the adaptive font size is used, the fontSize settings do not take effect.
   * </p>
   *
   * @param { number | string | Resource } value -  The unit is fp.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  minFontSize(value: number | string | Resource): TextInputAttribute;

  /**
   * Called when the maximum font size of the font is set.
   *
   * <p><strong>NOTE</strong>:
   * <br>For the string type, numeric string values with optional units,
   * for example, "10" or "10fp", are supported.
   * <br>For the setting to take effect, this attribute must be used together with minFontSize
   * and maxLines (when the component is in editing state in the inline input style), or layout constraint settings.
   * <br>When the adaptive font size is used, the fontSize settings do not take effect.
   * </p>
   *
   * @param { number | string | Resource } value -  The unit is fp.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  maxFontSize(value: number | string | Resource): TextInputAttribute;

  /**
   * Called when the minimum font scale of the font is set.
   *
   * @param { Optional<number | Resource> } scale
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 18
   */
  /**
   * Called when the minimum font scale of the font is set.
   *
   * @param { Optional<number | Resource> } scale
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  minFontScale(scale: Optional<number | Resource>): TextInputAttribute;

  /**
   * Called when the maximum font scale of the font is set.
   *
   * @param { Optional<number | Resource> } scale
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 18
   */
  /**
   * Called when the maximum font scale of the font is set.
   *
   * @param { Optional<number | Resource> } scale
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  maxFontScale(scale: Optional<number | Resource>): TextInputAttribute;
  
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
   * <br>If the text can fit in one line with the minFontSize setting,
   * the text will enlarge to the largest possible font size between minFontSize and maxFontSize.</li>
   * <li>TextHeightAdaptivePolicy.LAYOUT_CONSTRAINT_FIRST produces the same effect as TextHeightAdaptivePolicy.MIN_FONT_SIZE_FIRST.</li>
   * </ul>
   * <br>When the component is in the non-inline input style, the three values of TextHeightAdaptivePolicy have the same effect,
   * that is, the text will shrink to a font size between minFontSize and maxFontSize to allow for more content to be shown.
   * <br>If the text box is in inline input style,
   * the font size in the editing state is different from that in the non-editing state.
   * </p>
   *
   * @param { TextHeightAdaptivePolicy } value - The height adaptive policy.Default value is TextHeightAdaptivePolicy.MAX_LINES_FIRST.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  heightAdaptivePolicy(value: TextHeightAdaptivePolicy): TextInputAttribute;

  /**
   * Sets whether enable auto fill or not.
   *
   * @param { boolean } value - Indicates the flag whether autofill is enabled.
   * @returns { TextInputAttribute } Returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 11
   */
  /**
   * Sets whether enable auto fill or not.
   *
   * @param { boolean } value - Indicates the flag whether autofill is enabled.Default value is true.true: enable, false: disable.
   * @returns { TextInputAttribute } Returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  enableAutoFill(value: boolean): TextInputAttribute;

  /**
   * Called when the text decoration of the text is set.
   *
   * <p><strong>NOTE</strong>:
   * <br>This attribute does not take effect for the password input mode.
   * </p>
   *
   * @param { TextDecorationOptions } value - Default value is { type: TextDecorationType.None, color: Color.Black, style: TextDecorationStyle.SOLID }.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  decoration(value: TextDecorationOptions): TextInputAttribute;

  /**
   * Called when the distance between text fonts is set.
   *
   * <p><strong>NOTE</strong>:
   * <br>If the value specified is a percentage or 0, the default value is used.
   * <br>For the string type, numeric string values with optional units,
   * for example, "10" or "10fp", are supported.
   * <br>If the value specified is a negative value, the text is compressed.
   * <br>A negative value too small may result in the text being compressed to 0
   * and no content being displayed.
   * </p>
   *
   * @param { number | string | Resource } value -  The unit is fp.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  letterSpacing(value: number | string | Resource): TextInputAttribute;

  /**
   * Called when the line height of the font is set.
   *
   * <p><strong>NOTE</strong>:
   * <br>If the value is less than or equal to 0, the line height is not limited and the font size is adaptive.
   * <br>If the value is of the number type, the unit fp is used.
   * <br>For the string type, numeric string values with optional units, for example, "10" or "10fp", are supported.
   * </p>
   *
   * @param { number | string | Resource } value
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  lineHeight(value: number | string | Resource): TextInputAttribute;

  /**
   * Define the password rules of the text input.
   *
   * @param { string } value - Indicates the password rules. 
   * @returns { TextInputAttribute } Returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 11
   */
  /**
   * Define the password rules of the text input.
   *
   * <p><strong>NOTE</strong>:
   * <br>When autofill is used, these rules are transparently transmitted to Password Vault for generating a new password.
   * </p>
   *
   * @param { string } value - Indicates the password rules. 
   * @returns { TextInputAttribute } Returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  passwordRules(value: string): TextInputAttribute;

  /**
   * Set font feature.
   *
   * <p><strong>NOTE</strong>:
   * <br>This attribute is not available when type is set to an enum value that indicates the password input mode,
   * such as Password, NEW_PASSWORD, or NUMBER_PASSWORD.
   * </p>
   *
   * @param { string } value - The fontFeature.
   * normal | <feature-tag-value>, 
   * where <feature-tag-value> = <string> [ <integer> | on | off ], like: "ss01" 0
   * the values of <feature-tag-value> reference to doc of TextInput component
   * number of <feature-tag-value> can be single or multiple, and separated by comma ','.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  fontFeature(value: string): TextInputAttribute;  

  /**
   * Define the password visible mode of the text input.
   *
   * <p><strong>NOTE</strong>:
   * <br>This API has effect only when the input type is set to Password, NEWPASSWORD, or NUMBERPASSWORD mode.
   * <br>It does not work in other modes.
   * <br>When in password mode, there may be inconsistency between the backend state of the text box
   * and the frontend application's state management variables.
   * <br>This can cause issues with the icon at the end of the password text box.
   * <br>To avoid such issues, use the onSecurityStateChange callback to sync the states.
   * </p>
   *
   * @param { boolean } visible - Indicates the password visible mode. Default value is false.
   * @returns { TextInputAttribute } Returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  showPassword(visible: boolean): TextInputAttribute;

  /**
   * Called when changing the password visible mode of the text input.
   *
   * @param { Callback<boolean> } callback - callback of the password visible mode change event.
   * @returns { TextInputAttribute } Returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onSecurityStateChange(callback: Callback<boolean>): TextInputAttribute;

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
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onWillInsert(callback: Callback<InsertValue, boolean>): TextInputAttribute;

  /**
   * Get text value information when completed input.
   *
   * <p><strong>NOTE</strong>:
   * <br>It is available only for system input methods.
   * </p>
   *
   * @param { Callback<InsertValue> } callback - The triggered function when text content has been inserted.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onDidInsert(callback: Callback<InsertValue>): TextInputAttribute;

  /**
   * Get text value information when about to delete.
   *
   * <p><strong>NOTE</strong>:
   * <br>It returns true if the text is deleted; returns false otherwise.
   * <br>This callback is not called for text preview.
   * <br>It is available only for system input methods.
   * </p>
   *
   * @param { Callback<DeleteValue, boolean> } callback - The triggered function when text content is about to delete.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onWillDelete(callback: Callback<DeleteValue, boolean>): TextInputAttribute;

  /**
   * Get text value information when the deletion has been completed
   *
   * <p><strong>NOTE</strong>:
   * <br>It is available only for system input methods.
   * </p>
   *
   * @param { Callback<DeleteValue> } callback - The triggered function when text content has been deleted.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onDidDelete(callback: Callback<DeleteValue>): TextInputAttribute;

  /**
   * Called before the text input component attach the InputMethod.
   *
   * @param { Callback<IMEClient> } callback - The triggered function before attach the InputMethod.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  onWillAttachIME(callback: Callback<IMEClient>): TextInputAttribute;

  /**
   * Set the custom text menu.
   * Sets the extended options of the custom context menu on selection,
   * including the text content, icon, and callback.
   *
   * @param { EditMenuOptions } editMenu - Customize text menu options.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  editMenuOptions(editMenu: EditMenuOptions): TextInputAttribute;

  /**
   * Define the preview text mode of the text input.
   *
   * <p><strong>NOTE</strong>:
   * <br>Preview text is in a temporary state and does not support text interception.
   * <br>As such, it does not trigger onWillInsert, onDidInsert, onWillDelete, or onDidDelete callbacks.
   * </p>
   *
   * @param { boolean } enable - Indicates the preview text mode.Default value is true.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  enablePreviewText(enable: boolean): TextInputAttribute;

  /**
   * Enable or disable haptic feedback.
   *
   * @param { boolean } isEnabled - Default value is true, set false to disable haptic feedback.
   * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 13 dynamic
   */
  enableHapticFeedback(isEnabled: boolean): TextInputAttribute;

  /**
   * Set text mode of automatic case mode switching.
   *
   * @param { AutoCapitalizationMode } mode - Automatic case mode switching.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  autoCapitalizationMode(mode: AutoCapitalizationMode): TextInputAttribute;

  /**
   * Set the text with half leading.
   *
   * @param { Optional<boolean> } halfLeading
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  halfLeading(halfLeading: Optional<boolean>): TextInputAttribute;

  /**
   * Set the ellipsis mode.
   *
   * @param { Optional<EllipsisMode> } mode - The ellipsis mode.
   * @returns { TextInputAttribute } The attribute of TextInput.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  ellipsisMode(mode: Optional<EllipsisMode>): TextInputAttribute;

  /**
   * Set whether stop backPressed callback event or not.
   *
   * @param { Optional<boolean> } isStopped - Default value is true, set false to trigger the latest callback event.
   * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 15 dynamic
   */
  /**
   * Set whether stop backPressed callback event or not.
   *
   * @param { Optional<boolean> } isStopped - Default value is true, set false to trigger the latest callback event.
   * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  stopBackPress(isStopped: Optional<boolean>): TextInputAttribute;

  /**
   * Get text value information when about to change.
   *
   * @param { Callback<EditableTextChangeValue, boolean> } callback - The triggered function when text content is about to change.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  onWillChange(callback: Callback<EditableTextChangeValue, boolean>): TextInputAttribute;

  /**
   * Set the keyboard appearance.
   *
   * @param { Optional<KeyboardAppearance> } appearance - Default value is KeyboardAppearance.NONE_IMMERSIVE
   * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 15 dynamic

   */
  keyboardAppearance(appearance: Optional<KeyboardAppearance>): TextInputAttribute;

  /**
   * Set the stroke width.
   *
   * @param { Optional<LengthMetrics> } width - indicates the stroke width.
   * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  strokeWidth(width: Optional<LengthMetrics>): TextInputAttribute;

  /**
   * Set the stroke color.
   *
   * @param { Optional<ResourceColor> } color - indicates the stroke color.
   * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  strokeColor(color: Optional<ResourceColor>): TextInputAttribute;

  /**
   * Sets whether enable auto fill animation effect or not.
   *
   * @param { Optional<boolean> } enabled - Indicates the flag whether auto fill animation effect is enabled.
   * @returns { TextInputAttribute } Returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 20 dynamic
   */
  enableAutoFillAnimation(enabled: Optional<boolean>): TextInputAttribute;

  /**
   * Whether to enable automatic spacing between Chinese and Latin characters.
   *
   * @param { Optional<boolean> } enabled - The default value is false, indicates the flag whether to enable automatic spacing.
   * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  enableAutoSpacing(enabled: Optional<boolean>): TextInputAttribute;

  /**
   * Determines whether the layout adds extra padding at the top and bottom to make space for characters.
   *
   * @param { Optional<boolean> } include - Whether enable the feature, the default value is false.
   * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  includeFontPadding(include: Optional<boolean>): TextInputAttribute;

  /**
   * Whether to include ascent/descent from fallback fonts to prevent overlapping lines.
   *
   * @param { Optional<boolean> } enabled - Whether enable the feature, the default value is false.
   * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  fallbackLineSpacing(enabled: Optional<boolean>): TextInputAttribute;

  /**
   * Whether to compress punctuation at the beginning of line.
   *
   * @param { Optional<boolean> } enabled - Whether to enable the feature, the default value is false.
   * @returns { TextInputAttribute } - returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  compressLeadingPunctuation(enabled: Optional<boolean>): TextInputAttribute;

  /**
   * Used to set the selected drag preview style.
   *
   * @param { SelectedDragPreviewStyle | undefined } value - Selected drag preview style.
   *     If set undefined will reset the style.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  selectedDragPreviewStyle(value: SelectedDragPreviewStyle | undefined): TextInputAttribute;

  /**
   * Set the text direction.
   *
   * @param { TextDirection | undefined } direction - Indicates the text direction.
   *     When undefined is set, this property will be reset to TextDirection.DEFAULT.
   * @returns { TextInputAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  textDirection(direction: TextDirection | undefined): TextInputAttribute;
  
  /**
   * Set voice button options.
   *
   * @param { Optional<VoiceButtonOptions> } options - Indicates the options of the voice button.
   * @returns { TextInputAttribute } returns the instance of the TextInputAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @stagemodelonly
   * @atomicservice
   * @since 23 dynamic
   */
  voiceButton(options: Optional<VoiceButtonOptions>): TextInputAttribute;
}

/**
 * Defines TextInput Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines TextInput Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines TextInput Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare const TextInput: TextInputInterface;

/**
 * Defines TextInput Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines TextInput Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines TextInput Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare const TextInputInstance: TextInputAttribute;
