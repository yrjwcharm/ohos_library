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
 * Defines the resource which can use ASTC.
 *
 * @interface ASTCResource
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @since 12 dynamic
 */
interface ASTCResource {
  /**
   * Array of ASTC uri resources, indicating the range of ASTC data to be obtained.
   * @type { Array<string> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 12 dynamic
   */
  sources: Array<string>;
  /**
   * Column size, indicating the number of ASTC resources to splice per row.
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 12 dynamic
   */
  column: number;
}

/**
 * @interface MediaCachedImageInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @since 12 dynamic
 * @noninterop
 */
interface MediaCachedImageInterface {
  /**
   * Image resource to be obtained.
   *
   * @param { PixelMap | ResourceStr | DrawableDescriptor | ASTCResource } src
   * @returns { MediaCachedImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 12 dynamic
   */
  (src: PixelMap | ResourceStr | DrawableDescriptor | ASTCResource): MediaCachedImageAttribute;
}

/**
 * Attributes of MediaCachedImage inherited from ImageAttribute.
 *
 * @extends ImageAttribute
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @since 12 dynamic
 * @noninterop
 */
declare class MediaCachedImageAttribute extends ImageAttribute {}

/**
 * MediaCachedImage component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @since 12 dynamic
 * @noninterop
 */
declare const MediaCachedImage: MediaCachedImageInterface;

/**
 * Instance of MediaCachedImage component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @since 12 dynamic
 * @noninterop
 */
declare const MediaCachedImageInstance: MediaCachedImageAttribute;
