/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
 * Import the WindowStatusType type object for onHoverStatusChange.
 *
 * @typedef {import('../../../api/@ohos.window').default.WindowStatusType} WindowStatusType
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12 dynamic
 */
declare type WindowStatusType = import('../../../api/@ohos.window').default.WindowStatusType;

/**
 * FolderStack constructor options.
 *
 * @interface FolderStackOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
interface FolderStackOptions {
  /**
   * Define the IDs of the sub component that will be moved to the upper half screen when hovering.
   *
   * @type { ?Array<string> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Define the IDs of the sub component that will be moved to the upper half screen when hovering.
   *
   * @type { ?Array<string> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  /**
   * Define the IDs of the sub component that will be moved to the upper half screen when hovering.
   *
   * Anonymous Object Rectification
   * @type { ?Array<string> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  upperItems?: Array<string>;
}

/**
 * Provides ports for stacking containers.
 *
 * @interface FolderStackInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Provides ports for stacking containers.
 *
 * @interface FolderStackInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */

interface FolderStackInterface {
  /**
   * Defines the constructor of folderStack.
   *
   * @param { object } value - id of children need to be show in upperItem
   * @returns { FolderStackAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Defines the constructor of folderStack.
   *
   * @param { object } value - id of children need to be show in upperItem
   * @returns { FolderStackAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  /**
   * Defines the constructor of folderStack.
   *
   * Anonymous Object Rectification
   * @param { FolderStackOptions } [options] - id of children need to be show in upperItem
   * @returns { FolderStackAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  (options?: FolderStackOptions): FolderStackAttribute;
}

/**
 * Information when onFolderStateChange.
 *
 * @interface OnFoldStatusChangeInfo
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
interface OnFoldStatusChangeInfo {
  /**
   * Folder state.
   *
   * @type { FoldStatus }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Folder state.
   *
   * @type { FoldStatus }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  /**
   * Folder state.
   *
   * Anonymous Object Rectification
   * @type { FoldStatus }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  foldStatus: FoldStatus
}

/**
 * Callback when onStateChangeCallback.
 * 
 * Anonymous Object Rectification
 * @typedef { function } OnFoldStatusChangeCallback
 * @param { OnFoldStatusChangeInfo } event - the folding information of the current device
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
declare type OnFoldStatusChangeCallback = (event: OnFoldStatusChangeInfo) => void;

/**
 * Callback when onHoverStatusChange.
 *
 * Anonymous Object Rectification
 * @typedef { function } OnHoverStatusChangeCallback
 * @param { HoverEventParam } param - hover event param
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 18 dynamic
 */
declare type OnHoverStatusChangeCallback = (param: HoverEventParam) => void;

/**
 * @extends CommonMethod<FolderStackAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * @extends CommonMethod<FolderStackAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare class FolderStackAttribute extends CommonMethod<FolderStackAttribute> {
  /**
   * Set the alignment of folderStack.
   *
   * @param { Alignment } value - align of children
   * @returns { FolderStackAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Set the alignment of folderStack.
   *
   * @param { Alignment } value - align of children
   * @returns { FolderStackAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  alignContent(value: Alignment): FolderStackAttribute;

  /**
   * Callback folderState when the folderState changes
   *
   * @param { function } callback - executed when folderStatus changed
   * @returns { FolderStackAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
   /**
   * Callback folderState when the folderState changes
   *
   * @param { function } callback - executed when folderStatus changed
   * @returns { FolderStackAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12
   */
   /**
   * Callback folderState when the folderState changes
   *
   * Anonymous Object Rectification
   * @param { OnFoldStatusChangeCallback } callback - executed when folderStatus changed
   * @returns { FolderStackAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onFolderStateChange(callback: OnFoldStatusChangeCallback): FolderStackAttribute;


  /**
   * Callback hoverStatus|folderStatus|rotation|windowMode when the hoverStatus changes
   *
   * @param { function } handler - executed when hoverStatus changed
   * @returns { FolderStackAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12
   */
  /**
   * Callback hoverStatus|folderStatus|rotation|windowMode when the hoverStatus changes
   *
   * Anonymous Object Rectification
   * @param { OnHoverStatusChangeCallback } handler - executed when hoverStatus changed
   * @returns { FolderStackAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 18 dynamic
   */
  onHoverStatusChange(handler: OnHoverStatusChangeCallback): FolderStackAttribute;

  /**
   * Enable the animation of folderStack.
   *
   * @param { boolean } value - enable the animation of folderStatus changed
   * @returns { FolderStackAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Enable the animation of folderStack.
   *
   * @param { boolean } value - enable the animation of folderStatus changed
   * @returns { FolderStackAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  enableAnimation(value: boolean): FolderStackAttribute;

  /**
   * Enable auto halfFolder when orientation.
   *
   * @param { boolean } value - enable auto halfFold
   * @returns { FolderStackAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Enable auto halfFolder when orientation.
   *
   * @param { boolean } value - enable auto halfFold
   * @returns { FolderStackAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  autoHalfFold(value: boolean): FolderStackAttribute;
}

/**
 * Defines the Embed Data info.
 *
 * @interface HoverEventParam
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12 dynamic
 */
declare interface HoverEventParam {
  /**
   * Folder state.
   *
   * @type { FoldStatus }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  foldStatus: FoldStatus

  /**
   * Is hover mode
   *
   * @type { boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  isHoverMode: boolean

  /**
   * App rotation
   *
   * @type { AppRotation }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  appRotation: AppRotation

  /**
   * Window status type
   *
   * @type { WindowStatusType }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  windowStatusType: WindowStatusType
}
/**
 * Defines FolderStack Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Defines FolderStack Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare const FolderStack: FolderStackInterface;

/**
 * Defines FolderStack Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Defines FolderStack Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare const FolderStackInstance: FolderStackAttribute;
