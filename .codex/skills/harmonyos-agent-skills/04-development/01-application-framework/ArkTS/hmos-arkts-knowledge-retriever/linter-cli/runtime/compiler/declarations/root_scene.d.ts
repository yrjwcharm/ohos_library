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
 * Defines the session of RootScene.
 *
 * @interface RootSceneSession
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @since 10 dynamic
 */
interface RootSceneSession {
}

/**
 * Defines the interface of RootScene.
 *
 * @interface RootSceneInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @since 10 dynamic
 * @noninterop
 */
interface RootSceneInterface {
  /**
   * Called when the RootScene is used.
   *
   * @param { RootSceneSession } session - indicates the session of RootScene.
   * @returns { RootSceneAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 10 dynamic
   */
  (session: RootSceneSession): RootSceneAttribute;
}

/**
 * Defines the attribute functions of RootScene.
 *
 * @extends CommonMethod<RootSceneAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @since 10 dynamic
 * @noninterop
 */
declare class RootSceneAttribute extends CommonMethod<RootSceneAttribute> {
}

/**
 * Defines the RootScene component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @since 10 dynamic
 * @noninterop
 */
declare const RootScene: RootSceneInterface;

/**
 * Defines the RootScene instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @since 10 dynamic
 * @noninterop
 */
declare const RootSceneInstance: RootSceneAttribute;
