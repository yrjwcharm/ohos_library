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
 * Defines the interface of WindowScene.
 *
 * @interface WindowSceneInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @since 10 dynamic
 * @noninterop
 */
interface WindowSceneInterface {
  /**
   * Called when the WindowScene is used.
   *
   * @param { number } persistentId - indicates the persistent identifier of WindowScene.
   * @returns { WindowSceneAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 10 dynamic
   */
  (persistentId: number): WindowSceneAttribute;
}

/**
 * Defines the attribute functions of WindowScene.
 *
 * @extends CommonMethod<WindowSceneAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @since 10 dynamic
 * @noninterop
 */
declare class WindowSceneAttribute extends CommonMethod<WindowSceneAttribute> {
  /**
   * Set the attraction deformation effect of WindowScene.
   * The window produces nonlinear deformation effect under the action of attraction point.
   *
   * @param { Position } destination - The position of the attraction target point in the component coordinate system.
   * @param { number } fraction - The fraction of attraction deformation. The range of value is [0, 1].
   * <br> 0 means not attracted to the target point, 1 means attracted to the target point completely.
   * @returns { WindowSceneAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 14 dynamic
   */
  attractionEffect(destination: Position, fraction: number): WindowSceneAttribute;
}

/**
 * Defines the WindowScene component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @since 10 dynamic
 * @noninterop
 */
declare const WindowScene: WindowSceneInterface;

/**
 * Defines the WindowScene instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @since 10 dynamic
 * @noninterop
 */
declare const WindowSceneInstance: WindowSceneAttribute;
