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
 * Provide an interface for the EmbeddedComponent, which is used
 * <br/>to render UI asynchronously
 *
 * @interface EmbeddedComponentInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12 dynamic
 */
interface EmbeddedComponentInterface {
  /**
   * Construct the EmbeddedComponent.<br/>
   * Called when the EmbeddedComponent is used.
   *
   * @param { import('../../../api/@ohos.app.ability.Want').default } loader - indicates initialization parameter
   * @param { EmbeddedType } type - indicates type of the EmbeddedComponent
   * @returns { EmbeddedComponentAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  (
    loader: import('../../../api/@ohos.app.ability.Want').default,
    type: EmbeddedType
  ): EmbeddedComponentAttribute;
}

/**
 * Indicates the information when the provider of the embedded UI is terminated.
 *
 * @interface TerminationInfo
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12 dynamic
 */
declare interface TerminationInfo {
  /**
   * Defines the termination code.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
   code: number;

  /**
   * Defines the additional termination information.
   *
   * @type { ?import('../../../api/@ohos.app.ability.Want').default }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
   want?: import('../../../api/@ohos.app.ability.Want').default;
}

/**
 * Define the attribute functions of EmbeddedComponent.
 *
 * @extends CommonMethod<EmbeddedComponentAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12 dynamic
 */
declare class EmbeddedComponentAttribute extends CommonMethod<EmbeddedComponentAttribute> {
  /**
   * Called when the provider of the embedded UI is terminated.
   *
   * @param { import('../../../api/@ohos.base').Callback<TerminationInfo> } callback
   * @returns { EmbeddedComponentAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  onTerminated(callback: import('../../../api/@ohos.base').Callback<TerminationInfo>): EmbeddedComponentAttribute;

  /**
   * Called when some error occurred.
   *
   * @param { import('../../../api/@ohos.base').ErrorCallback } callback
   * @returns { EmbeddedComponentAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  onError(callback: import('../../../api/@ohos.base').ErrorCallback): EmbeddedComponentAttribute;
}

/**
 * Defines EmbeddedComponent Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12 dynamic
 */
declare const EmbeddedComponent: EmbeddedComponentInterface;

/**
 * Defines EmbeddedComponent Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12 dynamic
 */
declare const EmbeddedComponentInstance: EmbeddedComponentAttribute;
