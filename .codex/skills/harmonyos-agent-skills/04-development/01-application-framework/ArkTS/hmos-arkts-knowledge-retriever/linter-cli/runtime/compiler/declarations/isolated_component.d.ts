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
 * @file Defines the isolated component
 * @kit ArkUI
 */

/**
 * Indicates restricted worker for run abc.
 *
 * @typedef { import('../../../api/@ohos.worker').default.RestrictedWorker } RestrictedWorker
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @since 12 dynamiconly
 */
declare type RestrictedWorker = import('../../../api/@ohos.worker').default.RestrictedWorker;

/**
 * Indicates error callback.
 *
 * @typedef { import('../../../api/@ohos.base').ErrorCallback } ErrorCallback
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @since 12 dynamiconly
 */
declare type ErrorCallback = import('../../../api/@ohos.base').ErrorCallback;

/**
 * Indicates want.
 *
 * @typedef { import('../../../api/@ohos.app.ability.Want').default } Want
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @since 12 dynamiconly
 */
declare type Want = import('../../../api/@ohos.app.ability.Want').default;

/**
 * This interface is used to set the options for IsolatedComponentAttribute during construction
 *
 * @interface IsolatedOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @since 12 dynamiconly
 */
declare interface IsolatedOptions {
  /**
   * Indicates want of the IsolatedOptions.
   * @type { Want }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 12 dynamiconly
   */
  want: Want;
  /**
   * Indicates restricted worker for run abc.
   * @type { RestrictedWorker } worker - worker which run abc
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 12 dynamiconly
   */
  worker: RestrictedWorker;
}

/**
 * Provide an interface for the IsolatedComponent, which is used to render UI of other ABC
 *
 * @typedef { function } IsolatedComponentInterface
 * @param { IsolatedOptions } options - Construction configuration of IsolatedComponentAttribute
 * @returns { IsolatedComponentAttribute } Attribute of IsolatedComponent
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @since 12 dynamiconly
 * @noninterop
 */
declare type IsolatedComponentInterface = (options: IsolatedOptions) => IsolatedComponentAttribute;

/**
 * Define the attribute functions of IsolatedComponent.
 *
 * @extends CommonMethod<IsolatedComponentAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @since 12 dynamiconly
 * @noninterop
 */
declare class IsolatedComponentAttribute extends CommonMethod<IsolatedComponentAttribute> {
  /**
   * @param { ErrorCallback } callback
   * - called when some error occurred except disconnected from IsolatedAbility.
   * @returns { IsolatedComponentAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 12 dynamiconly
   */
  onError(
    callback: ErrorCallback
  ): IsolatedComponentAttribute;
}

/**
 * Defines IsolatedComponent Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @since 12 dynamiconly
 * @noninterop
 */
declare const IsolatedComponent: IsolatedComponentInterface;

/**
 * Defines IsolatedComponent Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @since 12 dynamiconly
 * @noninterop
 */
declare const IsolatedComponentInstance: IsolatedComponentAttribute;
