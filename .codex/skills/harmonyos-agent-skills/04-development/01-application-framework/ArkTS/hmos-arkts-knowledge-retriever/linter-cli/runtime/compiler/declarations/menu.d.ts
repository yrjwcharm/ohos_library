/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
 * Defines the Menu Component.
 *
 * @interface MenuInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Defines the Menu Component.
 *
 * @interface MenuInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the Menu Component.
 *
 * @interface MenuInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 * @noninterop
 */
interface MenuInterface {
    /**
     * Creates the menu component.
     *
     * @returns { MenuAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Creates the menu component.
     *
     * @returns { MenuAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Creates the menu component.
     *
     * @returns { MenuAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @FaAndStageModel
     * @crossplatform
     * @atomicservice
     * @since 11 dynamic
     */
    (): MenuAttribute;
}

/**
 * Declare SubMenuExpandingMode
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare enum SubMenuExpandingMode {
    /**
     * Sub-menu will expand besides main menu
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    SIDE_EXPAND = 0,
    /**
     * Sub-menu will expand embedded in main menu
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    EMBEDDED_EXPAND = 1,
    /**
     * Sub-menu will expand over main menu
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    STACK_EXPAND = 2
}

/**
 * Defines the Menu component attribute functions.
 *
 * @extends CommonMethod<MenuAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Defines the Menu component attribute functions.
 *
 * @extends CommonMethod<MenuAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the Menu component attribute functions.
 *
 * @extends CommonMethod<MenuAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 * @noninterop
 */
declare class MenuAttribute extends CommonMethod<MenuAttribute> {
    /**
     * Sets the Menu text size.
     *
     * @param { Length } value - Indicates the font size of menu item.
     * @returns { MenuAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @FaAndStageModel
     * @since 9 dynamiconly
     * @deprecated since 10
     * @useinstead font
     */
    fontSize(value: Length): MenuAttribute;
    /**
     * Sets the font style.
     * Family and style are not supported currently and will be fixed in future.
     *
     * @param { Font } value - Indicates the font style of menu item.
     * @returns { MenuAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Sets the font style.
     * Family and style are not supported currently and will be fixed in future.
     *
     * @param { Font } value - Indicates the font style of menu item.
     * @returns { MenuAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11 dynamic
     */
    font(value: Font): MenuAttribute;
    /**
     * Sets the Menu font color.
     *
     * @param { ResourceColor } value - Indicates the font color of menu item.
     * @returns { MenuAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Sets the Menu font color.
     *
     * @param { ResourceColor } value - Indicates the font color of menu item.
     * @returns { MenuAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11 dynamic
     */
    fontColor(value: ResourceColor): MenuAttribute;
    /**
     * Sets the radius of the corner around the menu.
     * When the radius is more than the menu width, the default border radius is used.
     *
     * @param { Dimension | BorderRadiuses } value - the border radius.
     * @returns { MenuAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Sets the radius of the corner around the menu.
     * When the radius is more than the menu width, the default border radius is used.
     *
     * @param { Dimension | BorderRadiuses } value - the border radius.
     * @returns { MenuAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11 dynamic
     */
    radius(value: Dimension | BorderRadiuses): MenuAttribute;
    /**
     * Set the divider of menu item
     *
     * @param { DividerStyleOptions | undefined } options
     * @returns { MenuAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    menuItemDivider(options: DividerStyleOptions | undefined): MenuAttribute;
    /**
     * Set the divider of menu item group
     *
     * @param { DividerStyleOptions | undefined } options
     * @returns { MenuAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    menuItemGroupDivider(options: DividerStyleOptions | undefined): MenuAttribute;
    /**
     * Set the expanding mode of sub-menu
     *
     * @param { SubMenuExpandingMode } mode
     * @returns { MenuAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    subMenuExpandingMode(mode: SubMenuExpandingMode): MenuAttribute;
    /**
     * Set the expand symbol of sub-menu.
     *
     * @param { SymbolGlyphModifier } symbol
     * @returns { MenuAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 20 dynamic
     */
    /**
     * Set the expand symbol of sub-menu.
     *
     * @param { SymbolGlyphModifier } symbol
     * @returns { MenuAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 23 dynamic
     */
    subMenuExpandSymbol(symbol: SymbolGlyphModifier): MenuAttribute;
}

/**
 * Defines Menu Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Defines Menu Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines Menu Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 * @noninterop
 */
declare const Menu: MenuInterface;

/**
 * Defines Menu Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Defines Menu Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines Menu Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 * @noninterop
 */
declare const MenuInstance: MenuAttribute;
