/*
 * Copyright (c) 2025 Huawei Device Co., Ltd.
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
 * Provides a UnionEffectContainer Component that generates a component fusion effect for descendant components with
 * "useUnionEffect(true)" set inside it, when their distance is less than a certain threshold.
 *
 * @interface UnionEffectContainerInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @stagemodelonly
 * @since 23 dynamic
 */
declare interface UnionEffectContainerInterface {
    /**
     * Specify the construction options for the UnionEffectContainer to create the UnionEffectContainer component.
     *
     * @param { UnionEffectContainerOptions } [options] - UnionEffectContainer constructor options.
     * @returns { UnionEffectContainerAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @systemapi
     * @stagemodelonly
     * @since 23 dynamic
     */
    (options?: UnionEffectContainerOptions): UnionEffectContainerAttribute;
}

/**
 * Defines the constructor options for UnionEffectContainer.
 *
 * @interface UnionEffectContainerOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @stagemodelonly
 * @since 23 dynamic
 */
declare interface UnionEffectContainerOptions {
    /**
     * Spacing indicates the ease with which fusion occurs; it does not represent actual distance.
     * The larger the spacing, the easier it is for subcomponents to fuse, and the greater the degree of fusion.
     * Value constraint: Must be greater than or equal to 0.
     *
     * @type { ?number }
     * @default 0
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @systemapi
     * @stagemodelonly
     * @since 23 dynamic
     */
    spacing?: number;
}

/**
 * Defines the UnionEffectContainer attribute functions.
 *
 * @extends CommonMethod<UnionEffectContainerAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @stagemodelonly
 * @since 23 dynamic
 */
declare class UnionEffectContainerAttribute extends CommonMethod<UnionEffectContainerAttribute> {
    /**
     * Sets up point light source effects.
     *
     * @param { PointLightStyle } light - The point light style.
     * @returns { UnionEffectContainerAttribute } The attribute of the UnionEffectContainer.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @systemapi
     * @stagemodelonly
     * @since 23 dynamic
     */
    pointLight(light: PointLightStyle): UnionEffectContainerAttribute;
}

/**
 * Defines UnionEffectContainer Component.
 *
 * @type { UnionEffectContainerInterface }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @stagemodelonly
 * @since 23 dynamic
 */
declare const UnionEffectContainer: UnionEffectContainerInterface;

/**
 * Defines UnionEffectContainer Component instance.
 *
 * @type { UnionEffectContainerAttribute }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @stagemodelonly
 * @since 23 dynamic
 */
declare const UnionEffectContainerInstance: UnionEffectContainerAttribute;
  