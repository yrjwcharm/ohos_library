/*
 * Copyright (c) 2021-2025 Huawei Device Co., Ltd.
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
 * Import the SystemBarStyle type for Navigation.
 *
 * @typedef { import('../../../api/@ohos.window').default.SystemBarStyle } SystemBarStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12 dynamic
 */
declare type SystemBarStyle = import('../../../api/@ohos.window').default.SystemBarStyle;

/**
 * Defines the navigation common title.
 *
 * @interface NavigationCommonTitle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Defines the navigation common title.
 *
 * @interface NavigationCommonTitle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the navigation common title.
 *
 * @interface NavigationCommonTitle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare interface NavigationCommonTitle {
  /**
   * Sets the main title.
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Sets the main title.
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the main title.
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Sets the main title.
   *
   * @type { string | Resource }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 14 dynamic
   */
  main: string | Resource;

  /**
   * Sets the sub title.
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Sets the sub title.
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the sub title.
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Sets the sub title.
   *
   * @type { string | Resource }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 14 dynamic
   */
  sub: string | Resource;
}

/**
 * Defines the navigation custom title.
 *
 * @interface NavigationCustomTitle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Defines the navigation custom title.
 *
 * @interface NavigationCustomTitle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the navigation custom title.
 *
 * @interface NavigationCustomTitle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare interface NavigationCustomTitle {
  /**
   * Custom content of the title bar.
   *
   * @type { CustomBuilder }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Custom content of the title bar.
   *
   * @type { CustomBuilder }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Custom content of the title bar.
   *
   * @type { CustomBuilder }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  builder: CustomBuilder;

  /**
   * Height of the title bar.
   *
   * @type { TitleHeight | Length }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Height of the title bar.
   *
   * @type { TitleHeight | Length }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Height of the title bar.
   *
   * @type { TitleHeight | Length }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  height: TitleHeight | Length;
}


/**
 * Navigation mode
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Navigation mode
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Navigation mode
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare enum NavigationMode {
  /**
   * The navigation bar and the content area are displayed in stack.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * The navigation bar and the content area are displayed in stack.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * The navigation bar and the content area are displayed in stack.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  Stack,

  /**
   * The navigation bar and the content area are displayed side by side.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * The navigation bar and the content area are displayed side by side.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * The navigation bar and the content area are displayed side by side.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  Split,

  /**
   * If the navigation width is greater than 520vp, the navigation component is displayed in split mode.
   * Otherwise it's displayed in stack mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * If the navigation width is greater than the sum of minNavBarWidth and minContentWidth,
   * the navigation component is displayed in split mode. Otherwise it's displayed in stack mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * If the navigation width is greater than the sum of minNavBarWidth and minContentWidth,
   * the navigation component is displayed in split mode. Otherwise it's displayed in stack mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  Auto,

  /**
   * If the navigation width is greater than the sum of minNavBarWidth and minContentWidth,
   * and the navigation component's aspect ratio (height to width) is less than or equal to 1.2,
   * the navigation component is displayed in split mode. Otherwise it's displayed in stack mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 24 dynamic
   */
  AUTO_WITH_ASPECT_RATIO,
}

/**
 * Navigation bar position
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Navigation bar position
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Navigation bar position
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare enum NavBarPosition {
  /**
   * In navigation split mode, the main column is at the start of the main axis.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * In navigation split mode, the main column is at the start of the main axis.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * In navigation split mode, the main column is at the start of the main axis.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  Start,

  /**
   * The navigation bar is on the End of the container
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * The navigation bar is on the End of the container
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * The navigation bar is on the End of the container
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  End,
}

/**
 * Navigation title mode.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Navigation title mode.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Navigation title mode.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare enum NavigationTitleMode {
  /**
   * When the content is more than one screen in a scrollable component, the
   * main title shrinks as the content scrolls down (the subtitle fades out
   * with its size remaining unchanged) and restores as the content scrolls
   * up to the top.
   * <br>**NOTE**
   * <br>The effect where the main title's size changes in response to content
   * scrolling is effective only when **title** is set to **ResourceStr** or
   * **NavigationCommonTitle**. If **title** is set to any other value type, the
   * main title changes in mere location when pulled down.
   * <br>For this effect to work when the content is less than one screen in a
   * scrollable component, set the **options** parameter of the scrollable
   * component's edgeEffect attribute to **true**. In the non-scrolling state, the
   * height of the title bar is the same as in **Full** mode; in the scrolling state,
   * the minimum height of the title bar is the same as in **Mini** mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * When the content is more than one screen in a scrollable component, the
   * main title shrinks as the content scrolls down (the subtitle fades out
   * with its size remaining unchanged) and restores as the content scrolls
   * up to the top.
   * <br>**NOTE**
   * <br>The effect where the main title's size changes in response to content
   * scrolling is effective only when **title** is set to **ResourceStr** or
   * **NavigationCommonTitle**. If **title** is set to any other value type, the
   * main title changes in mere location when pulled down.
   * <br>For this effect to work when the content is less than one screen in a
   * scrollable component, set the **options** parameter of the scrollable
   * component's edgeEffect attribute to **true**. In the non-scrolling state, the
   * height of the title bar is the same as in **Full** mode; in the scrolling state,
   * the minimum height of the title bar is the same as in **Mini** mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * When the content is more than one screen in a scrollable component, the
   * main title shrinks as the content scrolls down (the subtitle fades out
   * with its size remaining unchanged) and restores as the content scrolls
   * up to the top.
   * <br>**NOTE**
   * <br>The effect where the main title's size changes in response to content
   * scrolling is effective only when **title** is set to **ResourceStr** or
   * **NavigationCommonTitle**. If **title** is set to any other value type, the
   * main title changes in mere location when pulled down.
   * <br>For this effect to work when the content is less than one screen in a
   * scrollable component, set the **options** parameter of the scrollable
   * component's edgeEffect attribute to **true**. In the non-scrolling state, the
   * height of the title bar is the same as in **Full** mode; in the scrolling state,
   * the minimum height of the title bar is the same as in **Mini** mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  Free = 0,

  /**
   * The title is fixed at full mode.<br>Default value: If there is only a main
   * title, the title bar height is 112 vp; if there is both a main title and a
   * subtitle, the title bar height is 138 vp.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * The title is fixed at full mode.<br>Default value: If there is only a main
   * title, the title bar height is 112 vp; if there is both a main title and a
   * subtitle, the title bar height is 138 vp.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * The title is fixed at full mode.<br>Default value: If there is only a main
   * title, the title bar height is 112 vp; if there is both a main title and a
   * subtitle, the title bar height is 138 vp.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  Full,

  /**
   * The title is fixed at mini mode.
   * Default value:if there is only a main title, The title bar height is 56 vp.
   * If there are both a main title and a subtitle, the title bar height is 82 vp.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * The title is fixed at mini mode. Default value: In versions earlier than API version 12,
   * If there is only a main title, the title bar height is 56 vp; if there are both a main title and a subtitle,
   * The title bar height is 82 vp. Since API version 12, the title bar height is 56 vp.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * The title is fixed at mini mode. Default value: In versions earlier than API version 12,
   * If there is only a main title, the title bar height is 56 vp; if there are both a main title and a subtitle,
   * The title bar height is 82 vp. Since API version 12, the title bar height is 56 vp.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  Mini,
}

/**
 * Navigation menu item, include menu icon and menu info
 *
 * @interface NavigationMenuItem
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Navigation menu item, include menu icon and menu info
 *
 * @interface NavigationMenuItem
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Navigation menu item, include menu icon and menu info
 *
 * @interface NavigationMenuItem
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare interface NavigationMenuItem {
  /**
   * The value of navigation menu item.
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * The value of navigation menu item.
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * The value of navigation menu item.
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * The value of navigation menu item.
   *
   * @type { string | Resource }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 14 dynamic
   */
  value: string | Resource;

  /**
   * The icon of navigation menu item.
   *
   * @type { ?string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * The icon of navigation menu item.
   *
   * @type { ?string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * The icon of navigation menu item.
   *
   * @type { ?string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * The icon of navigation menu item.
   *
   * @type { ?(string | Resource) }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 14 dynamic
   */
  icon?: string | Resource;

  /**
   * The symbol of navigation menu item.
   *
   * @type { ?SymbolGlyphModifier }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12
   */
  /**
   * The symbol of navigation menu item.
   *
   * @type { ?SymbolGlyphModifier }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  symbolIcon?: SymbolGlyphModifier;

  /**
   * Whether to enable this menu item.
   *
   * @type { ?boolean }
   * @default true
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  isEnabled?: boolean;

  /**
   * Trigger by navigation menu item click.
   *
   * @type { ?(() => void) }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Trigger by navigation menu item click.
   *
   * @type { ?function }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Trigger by navigation menu item click.
   *
   * @type { ?function }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  action?: () => void;
}

/**
 * Indicates the information of the popped page.
 *
 * @interface PopInfo
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Indicates the information of the popped page.
 *
 * @interface PopInfo
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface PopInfo {
  /**
   * The info of the popped page.
   *
   * @type { NavPathInfo }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * The info of the popped page.
   *
   * @type { NavPathInfo }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  info: NavPathInfo;

  /**
   * The result of the popped page.
   *
   * @type { Object }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * The result of the popped page.
   *
   * @type { Object }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  result: Object;
}

/**
 * Indicates the information of NavDestination.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Indicates the information of NavDestination.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare class NavPathInfo {
  /**
   * Creates an instance of NavPathInfo.
   *
   * @param { string } name - The name of NavDestination.
   * @param { unknown } param - The detailed parameter of the NavDestination.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Creates an instance of NavPathInfo.
   *
   * @param { string } name - The name of NavDestination.
   * @param { unknown } param - The detailed parameter of the NavDestination.
   * @param { ?import('../../../api/@ohos.base').Callback<PopInfo> } onPop - The callback when next page returns.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Creates an instance of NavPathInfo.
   *
   * @param { string } name - The name of NavDestination.
   * @param { unknown } param - The detailed parameter of the NavDestination.
   * @param { ?import('../../../api/@ohos.base').Callback<PopInfo> } onPop - The callback when next page returns.
   * @param { ?boolean } isEntry - Indicates whether it is an entry destination.
   *                               Default value: **false**.
   *                               **true**: The navigation destination page is the entry page.
   *                               **false**: The navigation destination page is not the entry page.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  constructor(name: string, param: unknown, onPop?: import('../../../api/@ohos.base').Callback<PopInfo>, isEntry?: boolean);

  /**
   * Name of the navigation destination page.
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Name of the navigation destination page.
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  name: string;

  /**
   * Detailed parameters of the navigation destination page.
   *
   * @type { ?unknown }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Detailed parameters of the navigation destination page.
   *
   * @type { ?unknown }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  param?: unknown;

  /**
   * Callback returned when pop is called on the navigation destination page.
   * It is invoked only after the **result** parameter is set in pop.
   *
   * @type { ?import('../../../api/@ohos.base').Callback<PopInfo> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Callback returned when pop is called on the navigation destination page.
   * It is invoked only after the **result** parameter is set in pop.
   *
   * @type { ?import('../../../api/@ohos.base').Callback<PopInfo> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onPop?: import('../../../api/@ohos.base').Callback<PopInfo>;

  /**
   * Indicates whether it is an entry destination.
   *
   * @type { ?boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  isEntry?: boolean;

  /**
   * The unique id of NavDestination.
   *
   * @type { ?string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  navDestinationId?: string;
}

/**
 * Defines the mode of stack operation.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare enum LaunchMode {
  /**
   * Default navigation stack operation mode.<br>In this mode,
   * push operations add the specified **NavDestination**page to
   * the stack; replace operations replace the current top **NavDestination** page.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  STANDARD = 0,

  /**
   * When the NavDestination with a specified name exists, it will be moved to top of stack,
   * otherwise, the behavior will be consistent with the STANDARD mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  MOVE_TO_TOP_SINGLETON = 1,

  /**
   * When the NavDestination with a specified name exists, the stack will pop until that NavDestination,
   * otherwise, the behavior will be consistent with the STANDARD mode.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  POP_TO_SINGLETON = 2,
  
  /**
   * This mode creates an instance of **NavDestination**. Compared with
   * **STANDARD**, this mode does not reuse the instance with the same name in the stack.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  NEW_INSTANCE = 3,
}

/**
 * Indicates the options of stack operation.
 *
 * @interface NavigationOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface NavigationOptions {
  /**
   * Navigation stack operation mode.
   * <br>Default value: **LaunchMode.STANDARD**.
   *
   * @type { ?LaunchMode }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  launchMode?: LaunchMode;

  /**
   * Whether to support transition animation.
   * <br>Default value: **true**.
   * <br>**true**: The transition animation is supported.
   * <br>**false**: The transition animation is not supported.
   *
   * @type { ?boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  animated?: boolean;
}

/**
 * Indicates the information of NavDestinations. Providers methods for controlling destination page in the stack
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Indicates the information of NavDestinations. Providers methods for controlling destination page in the stack
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare class NavPathStack {
  /**
   * Creates an instance of NavPathStack.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Creates an instance of NavPathStack.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  constructor();

  /**
   * Pushes the navigation destination page specified by **info** onto the navigation stack.
   *
   * @param { NavPathInfo } info - Indicates the NavDestination to be pushed.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Pushes the navigation destination page specified by **info** onto the navigation stack.
   *
   * @param { NavPathInfo } info - Indicates the NavDestination to be pushed.
   * @param { boolean } [animated] - Whether to support the transition animation.
   * <br>Default value: **true**.
   * <br>**true**: The transition animation is supported. **false**: The transition animation is not supported.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  pushPath(info: NavPathInfo, animated?: boolean): void;

  /**
   * Pushes the navigation destination page specified by **info** onto the navigation stack.
   * Depending on the launchMode specified in the **options** parameter, different behaviors will be triggered.
   *
   * @param { NavPathInfo } info - Indicates the NavDestination to be pushed.
   * @param { NavigationOptions } [options] - Indicates options of stack operation.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  pushPath(info: NavPathInfo, options?: NavigationOptions): void;

  /**
   * Pushes the navigation destination page specified by **info** onto
   * the navigation stack. This API uses a promise to return the result.
   *
   * @param { NavPathInfo } info - Information about the navigation destination page.
   * @param { boolean } [animated] - Whether to support the transition animation.
   * <br>Default value: **true**.
   * <br>**true**: The transition animation is supported.
   * <br>**false**: The transition animation is not supported.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - Parameter error. Possible causes: 
   *     1. Mandatory parameters are left unspecified.
   *     2. Incorrect parameters types.
   *     3. Parameter verification failed.
   * @throws { BusinessError } 100001 - Internal error.
   * @throws { BusinessError } 100005 - Builder function not registered.
   * @throws { BusinessError } 100006 - NavDestination not found.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Pushes the navigation destination page specified by **info** onto
   * the navigation stack. This API uses a promise to return the result.
   *
   * @param { NavPathInfo } info - Information about the navigation destination page.
   * @param { boolean } [animated] - Whether to support the transition animation.
   * <br>Default value: **true**.
   * <br>**true**: The transition animation is supported.
   * <br>**false**: The transition animation is not supported.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - Parameter error. Possible causes: 
   *     1. Mandatory parameters are left unspecified.
   *     2. Incorrect parameters types.
   *     3. Parameter verification failed.
   * @throws { BusinessError } 100001 - Internal error.
   * @throws { BusinessError } 100005 - Builder function not registered.
   * @throws { BusinessError } 100006 - NavDestination not found.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  pushDestination(info: NavPathInfo, animated?: boolean): Promise<void>;

  /**
   * Pushes the navigation destination page specified by **info** onto the navigation stack.
   * This API uses a promise to return the result. Depending on the LaunchMode
   * specified in the **options** parameter, different behaviors will be triggered.
   *
   * @param { NavPathInfo } info - Information about the navigation destination page.
   * @param { NavigationOptions } [options] - Navigation options.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - Parameter error. Possible causes: 
   *     1. Mandatory parameters are left unspecified.
   *     2. Incorrect parameters types.
   *     3. Parameter verification failed.
   * @throws { BusinessError } 100001 - Internal error.
   * @throws { BusinessError } 100005 - Builder function not registered.
   * @throws { BusinessError } 100006 - NavDestination not found.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  pushDestination(info: NavPathInfo, options?: NavigationOptions): Promise<void>;

  /**
   * Pushes the specified NavDestination into the stack.
   *
   * @param { string } name - Indicates the name of the NavDestination to be pushed.
   * @param { unknown } param - Indicates the detailed parameter of the NavDestination to be pushed.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Pushes the specified NavDestination into the stack.
   *
   * @param { string } name - Indicates the name of the NavDestination to be pushed.
   * @param { unknown } param - Indicates the detailed parameter of the NavDestination to be pushed.
   * @param { boolean } [animated] - Indicates whether the transition is animated.
   * <br>Default value: **true**.
   * <br>**true**: The transition animation is supported. **false**: The transition animation is not supported.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  pushPathByName(name: string, param: unknown, animated?: boolean): void;

  /**
   * Pushes the specified NavDestination into the stack.
   *
   * @param { string } name - Indicates the name of the NavDestination to be pushed.
   * @param { Object } param - Indicates the detailed parameter of the NavDestination to be pushed.
   * @param { import('../../../api/@ohos.base').Callback<PopInfo> } onPop - The callback when next page returns.
   * @param { boolean } [animated] - Indicates whether the transition is animated.
   * <br>Default value: **true**.
   * <br>**true**: The transition animation is supported. **false**: The transition animation is not supported.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Pushes the specified NavDestination into the stack.
   *
   * @param { string } name - Indicates the name of the NavDestination to be pushed.
   * @param { Object } param - Indicates the detailed parameter of the NavDestination to be pushed.
   * @param { import('../../../api/@ohos.base').Callback<PopInfo> } onPop - The callback when next page returns.
   * @param { boolean } [animated] - Indicates whether the transition is animated.
   * <br>Default value: **true**.
   * <br>**true**: The transition animation is supported. **false**: The transition animation is not supported.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  pushPathByName(name: string, param: Object, onPop: import('../../../api/@ohos.base').Callback<PopInfo>, animated?: boolean): void;

  /**
   * Pushes the specified NavDestination into the stack.
   *
   * @param { string } name - Indicates the name of the NavDestination to be pushed.
   * @param { Object } param - Indicates the detailed parameter of the NavDestination to be pushed.
   * @param { boolean } [animated] - Indicates whether the transition is animated.
   * <br>Default value: **true**.
   * <br>**true**: The transition animation is supported. **false**: The transition animation is not supported.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - Parameter error. Possible causes: 
   *     1. Mandatory parameters are left unspecified.
   *     2. Incorrect parameters types.
   *     3. Parameter verification failed.
   * @throws { BusinessError } 100001 - Internal error.
   * @throws { BusinessError } 100005 - Builder function not registered.
   * @throws { BusinessError } 100006 - NavDestination not found.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Pushes the specified NavDestination into the stack.
   *
   * @param { string } name - Indicates the name of the NavDestination to be pushed.
   * @param { Object } param - Indicates the detailed parameter of the NavDestination to be pushed.
   * @param { boolean } [animated] - Indicates whether the transition is animated.
   * <br>Default value: **true**.
   * <br>**true**: The transition animation is supported. **false**: The transition animation is not supported.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - Parameter error. Possible causes: 
   *     1. Mandatory parameters are left unspecified.
   *     2. Incorrect parameters types.
   *     3. Parameter verification failed.
   * @throws { BusinessError } 100001 - Internal error.
   * @throws { BusinessError } 100005 - Builder function not registered.
   * @throws { BusinessError } 100006 - NavDestination not found.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  pushDestinationByName(name: string, param: Object, animated?: boolean): Promise<void>;

  /**
   * Pushes the specified NavDestination into the stack.
   *
   * @param { string } name - Indicates the name of the NavDestination to be pushed.
   * @param { Object } param - Indicates the detailed parameter of the NavDestination to be pushed.
   * @param { import('../../../api/@ohos.base').Callback<PopInfo> } onPop - The callback when next page returns.
   * @param { boolean } [animated] - Indicates whether the transition is animated.
   * <br>Default value: **true**.
   * <br>**true**: The transition animation is supported. **false**: The transition animation is not supported.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - Parameter error. Possible causes: 
   *     1. Mandatory parameters are left unspecified.
   *     2. Incorrect parameters types.
   *     3. Parameter verification failed.
   * @throws { BusinessError } 100001 - Internal error.
   * @throws { BusinessError } 100005 - Builder function not registered.
   * @throws { BusinessError } 100006 - NavDestination not found.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Pushes the specified NavDestination into the stack.
   *
   * @param { string } name - Indicates the name of the NavDestination to be pushed.
   * @param { Object } param - Indicates the detailed parameter of the NavDestination to be pushed.
   * @param { import('../../../api/@ohos.base').Callback<PopInfo> } onPop - The callback when next page returns.
   * @param { boolean } [animated] - Indicates whether the transition is animated.
   * <br>Default value: **true**.
   * <br>**true**: The transition animation is supported. **false**: The transition animation is not supported.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - Parameter error. Possible causes: 
   *     1. Mandatory parameters are left unspecified.
   *     2. Incorrect parameters types.
   *     3. Parameter verification failed.
   * @throws { BusinessError } 100001 - Internal error.
   * @throws { BusinessError } 100005 - Builder function not registered.
   * @throws { BusinessError } 100006 - NavDestination not found.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  pushDestinationByName(name: string, param: Object, onPop: import('../../../api/@ohos.base').Callback<PopInfo>, animated?: boolean): Promise<void>;

  /**
   * Replace the current NavDestination with the specific one.The current NavDestination will be destroyed.
   *
   * @param { NavPathInfo } info - Indicates the new NavDestination in top of the stack.
   * @param { boolean } [animated] - Indicates whether the transition is animated.
   * <br>Default value: **true**.
   * <br>**true**: The transition animation is supported.
   * <br>**false**: The transition animation is not supported.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Replace the current NavDestination with the specific one.The current NavDestination will be destroyed.
   *
   * @param { NavPathInfo } info - Indicates the new NavDestination in top of the stack.
   * @param { boolean } [animated] - Indicates whether the transition is animated.
   *                                 Default value: **true**.
   *                                 **true**: The transition animation is supported.
   *                                 **false**: The transition animation is not supported.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  replacePath(info: NavPathInfo, animated?: boolean): void;

  /**
   * Replace the current NavDestination with the specific one.The current NavDestination will be destroyed.
   *
   * @param { NavPathInfo } info - Indicates the new NavDestination in top of the stack.
   * @param { NavigationOptions } [options] - Indicates options of stack operation.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  replacePath(info: NavPathInfo, options?: NavigationOptions): void;

  /**
   * Replace the NavDestination into the stack.
   *
   * @param { NavPathInfo } info - Indicates the NavDestination to replace in stack.
   * @param { NavigationOptions } [options] - Indicates options of stack operation.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - Parameter error. Possible causes: 
   *     1. Mandatory parameters are left unspecified.
   *     2. Incorrect parameters types.
   *     3. Parameter verification failed.
   * @throws { BusinessError } 100001 - Internal error.
   * @throws { BusinessError } 100005 - Builder function not registered.
   * @throws { BusinessError } 100006 - NavDestination not found.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  replaceDestination(info: NavPathInfo, options?: NavigationOptions): Promise<void>;

  /**
   * Replace the current NavDestination with the specific one.The current NavDestination will be destroyed.
   *
   * @param { string } name - Indicates name of the new NavDestination in top of stack.
   * @param { Object } param - Indicates the detailed parameter of the new NavDestination in top of the stack.
   * @param { boolean } [animated] - Indicates whether the transition is animated.
   * <br>Default value: **true**.
   * <br>**true**: The transition animation is supported.<br>**false**: The transition animation is not supported.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Replace the current NavDestination with the specific one.The current NavDestination will be destroyed.
   *
   * @param { string } name - Indicates name of the new NavDestination in top of stack.
   * @param { Object } param - Indicates the detailed parameter of the new NavDestination in top of the stack.
   * @param { boolean } [animated] - Indicates whether the transition is animated.
   * <br>Default value: **true**.
   * <br>**true**: The transition animation is supported.<br>**false**: The transition animation is not supported.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  replacePathByName(name: string, param: Object, animated?: boolean): void;

  /**
   * Remove the specified NavDestinations by indexes.
   *
   * @param { Array<number> } indexes - Indicates the indexes of the NavDestinations to be removed.
   * @returns { number } Returns the number of removed pages. Invalid indexes will be ignored.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Remove the specified NavDestinations by indexes.
   *
   * @param { Array<number> } indexes - Indicates the indexes of the NavDestinations to be removed.
   * @returns { number } Returns the number of removed pages. Invalid indexes will be ignored.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  removeByIndexes(indexes: Array<number>): number;

  /**
   * Removes the navigation destination page specified by **name** from the navigation stack.
   *
   * @param { string } name - Indicates the name of the NavDestination to be removed.
   * @returns { number } Returns the number of removed NavDestinations.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Removes the navigation destination page specified by **name** from the navigation stack.
   *
   * @param { string } name - Indicates the name of the NavDestination to be removed.
   * @returns { number } Returns the number of removed NavDestinations.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  removeByName(name: string): number;

  /**
   * Removes the navigation destination page specified by **navDestinationId** from
   * the navigation stack. **navDestinationId** can be obtained from the onReady callback
   * of **NavDestination** or from NavDestinationInfo.
   *
   * @param { string } navDestinationId - Unique ID of the navigation destination page to remove.
   * @returns { boolean } Returns true if remove successfully, otherwise returns false.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  removeByNavDestinationId(navDestinationId: string): boolean;

  /**
   * Pops the top NavDestination out of the stack.
   *
   * @returns { NavPathInfo | undefined } Returns the top NavPathInfo if the stack is not empty, otherwise returns undefined.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Pops the top NavDestination out of the stack.
   *
   * @param { boolean } [animated] - Indicates whether the transition is animated.
   * <br>Default value: **true**.
   * <br>**true**: The transition animation is supported.<br>**false**: The transition animation is not supported.
   * @returns { NavPathInfo | undefined } Returns the top NavPathInfo if the stack is not empty, otherwise returns undefined.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  pop(animated?: boolean): NavPathInfo | undefined;

  /**
   * Pops the top NavDestination out of the stack. Invokes the **onPop** callback to pass the page processing result.
   *
   * @param { Object } result - The result of the NavDestination.
   * @param { boolean } [animated] - Indicates whether the transition is animated.
   * <br>Default value: **true**.
   * <br>**true**: The transition animation is supported.<br>**false**: The transition animation is not supported.
   * @returns { NavPathInfo | undefined } Returns the top NavPathInfo if the stack is not empty, otherwise returns undefined.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Pops the top NavDestination out of the stack. Invokes the **onPop** callback to pass the page processing result.
   *
   * @param { Object } result - The result of the NavDestination.
   * @param { boolean } [animated] - Indicates whether the transition is animated.
   * <br>Default value: **true**.
   * <br>**true**: The transition animation is supported.<br>**false**: The transition animation is not supported. 
   * @returns { NavPathInfo | undefined } Returns the top NavPathInfo if the stack is not empty, otherwise returns undefined.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  pop(result: Object, animated?: boolean): NavPathInfo | undefined;

  /**
   * Pops the specified NavDestination out of the stack.
   *
   * @param { string } name - Indicates the name of the NavDestination to be popped.
   * @returns { number } Returns the index of the NavDestination if it exists in the stack, otherwise returns -1;
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Pops the specified NavDestination out of the stack.
   *
   * @param { string } name - Indicates the name of the NavDestination to be popped.
   * @param { boolean } [animated] - Indicates whether the transition is animated.
   * <br>Default value: **true**.
   * <br>**true**: The transition animation is supported.<br>**false**: The transition animation is not supported.
   * @returns { number } Returns the index of the NavDestination if it exists in the stack, otherwise returns -1;
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  popToName(name: string, animated?: boolean): number;

  /**
   * Pops pages until the first navigation destination page.
   * That matches **name** from the bottom of the navigation stack is at the top of the stack.
   * This API uses the **onPop** callback to pass in the page processing result.
   *
   * @param { string } name - Indicates the name of the NavDestination to be popped.
   * @param { Object } result - The result of the NavDestination.
   * @param { boolean } [animated] - Indicates whether the transition is animated.
   * <br>Default value: **true**.
   * <br>**true**: The transition animation is supported.<br>**false**: The transition animation is not supported.
   * @returns { number } Returns the index of the NavDestination if it exists in the stack, otherwise returns -1;
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Pops pages until the first navigation destination page.
   * That matches **name** from the bottom of the navigation stack is at the top of the stack.
   * This API uses the **onPop** callback to pass in the page processing result.
   *
   * @param { string } name - Indicates the name of the NavDestination to be popped.
   * @param { Object } result - The result of the NavDestination.
   * @param { boolean } [animated] - Indicates whether the transition is animated.
   * <br>Default value: **true**.
   * <br>**true**: The transition animation is supported.<br>**false**: The transition animation is not supported.
   * @returns { number } Returns the index of the NavDestination if it exists in the stack, otherwise returns -1;
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  popToName(name: string, result: Object, animated?: boolean): number;

  /**
   * Pops the specified NavDestination out of the stack.
   *
   * @param { number } index - Indicates the index of the NavDestination to be popped.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Pops the specified NavDestination out of the stack.
   *
   * @param { number } index - Indicates the index of the NavDestination to be popped.
   * @param { boolean } [animated] - Indicates whether the transition is animated.
   * <br>Default value: **true**.
   * <br>**true**: The transition animation is supported.<br>**false**: The transition animation is not supported.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  popToIndex(index: number, animated?: boolean): void;

  /**
   * Pops the specified NavDestination out of the stack.
   *
   * @param { number } index - Indicates the index of the NavDestination to be popped.
   * @param { Object } result - The result of the NavDestination.
   * @param { boolean } [animated] - Indicates whether the transition is animated.
   * <br>Default value: **true**.
   * <br>**true**: The transition animation is supported.<br>**false**: The transition animation is not supported.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  popToIndex(index: number, result: Object, animated?: boolean): void;

  /**
   * Moves the first navigation destination page of this name to the top of stack.
   * That matches **name** from the bottom of the navigation stack to the top of the stack.
   *
   * @param { string } name - Indicates the name of the NavDestination to be moved to the top.
   * @returns { number } Returns the index of the NavDestination if it exists in the stack, otherwise returns -1;
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Moves the first navigation destination page of this name to the top of stack.
   * That matches **name** from the bottom of the navigation stack to the top of the stack.
   *
   * @param { string } name - Indicates the name of the NavDestination to be moved to the top.
   * @param { boolean } [animated] - Indicates whether the transition is animated.
   * <br>Default value: **true**.
   * <br>**true**: The transition animation is supported. **false**: The transition animation is not supported.
   * @returns { number } Returns the index of the NavDestination if it exists in the stack, otherwise returns -1;
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  moveToTop(name: string, animated?: boolean): number;

  /**
   * Moves to the top of the navigation stack the navigation destination page specified by **index**.
   *
   * @param { number } index - Index of the navigation destination page. The index is zero-based.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Moves to the top of the navigation stack the navigation destination page specified by **index**.
   *
   * @param { number } index - Index of the navigation destination page. The index is zero-based.
   * @param { boolean } [animated] - Whether to support the transition animation.
   * <br>Default value: **true**.
   * <br>**true**: The transition animation is supported.
   * <br>**false**: The transition animation is not supported.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  moveIndexToTop(index: number, animated?: boolean): void;

  /**
   * Clears the navigation stack.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Clears the navigation stack.
   *
   * @param { boolean } [animated] - Whether to support the transition animation.
   * <br>Default value: **true**.
   * <br>**true**: The transition animation is supported.
   * <br>**false**: The transition animation is not supported.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  clear(animated?: boolean): void;

  /**
   * Obtains the names of all navigation destination pages in the navigation stack.
   *
   * @returns { Array<string> } Returns all the NavDestination name in the stack;
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Obtains the names of all navigation destination pages in the navigation stack.
   *
   * @returns { Array<string> } Returns all the NavDestination name in the stack;
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  getAllPathName(): Array<string>;

  /**
   * Obtains the parameter information of the navigation destination page specified by **index**.
   *
   * @param { number } index - Index of the navigation destination page. The index is zero-based.
   * @returns { unknown | undefined } Returns the detailed parameter of the NavDestination.
   * <br>If it exists in the stack, otherwise returns undefined;
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Obtains the parameter information of the navigation destination page specified by **index**.
   *
   * @param { number } index - Index of the navigation destination page. The index is zero-based.
   * @returns { unknown | undefined } Returns the detailed parameter of the NavDestination.
   * <br>If it exists in the stack, otherwise returns undefined;
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  getParamByIndex(index: number): unknown | undefined;

  /**
   * Obtains the param of the specified NavDestination.
   *
   * @param { string } name - Indicates the name of the NavDestination.
   * @returns { Array<unknown> } Returns the detailed parameter of all the NavDestinations.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Obtains the param of the specified NavDestination.
   *
   * @param { string } name - Indicates the name of the NavDestination.
   * @returns { Array<unknown> } Returns the detailed parameter of all the NavDestinations.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  getParamByName(name: string): Array<unknown>;

  /**
   * Obtains the indexes of all the navigation destination pages that match **name**.
   *
   * @param { string } name - Indicates the name of the NavDestination.
   * @returns { Array<number> } Returns the index of all the NavDestinations.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Obtains the indexes of all the navigation destination pages that match **name**.
   *
   * @param { string } name - Indicates the name of the NavDestination.
   * @returns { Array<number> } Returns the index of all the NavDestinations.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  getIndexByName(name: string): Array<number>;

  /**
   * Obtains the parent navigation path stack.
   * When a **Navigation** component is nested (directly or indirectly) insider another **Navigation** component,
   * The internal one can obtain the navigation path stack of the external one.
   *
   * @returns { NavPathStack | null } Returns the parent of the current stack. If no parent, it returns null.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  getParent(): NavPathStack | null;

  /**
   * Obtains the stack size.
   *
   * @returns { number } Stack size.
   * <br>Value range: [0, +∞)
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Obtains the stack size.
   *
   * @returns { number } Stack size.
   * <br>Value range: [0, +∞)
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  size(): number;

  /**
   * Disables or enables the transition animation in the **Navigation** component.
   *
   * @param { boolean } value - Whether to disable the transition animation.
   * <br>Default value: **false**.
   * <br>**true**:The transition animation is disabled.
   * <br>**false**: The transition animation is not disabled.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Disables or enables the transition animation in the **Navigation** component.
   *
   * @param { boolean } value - Whether to disable the transition animation.
   * <br>Default value: **false**.
   * <br>**true**:The transition animation is disabled.
   * <br>**false**: The transition animation is not disabled.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  disableAnimation(value: boolean): void;

  /**
   * Sets the interception callback for navigation page redirection.
   *
   * @param { NavigationInterception } interception - Object to be intercepted during navigation redirection.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  setInterception(interception: NavigationInterception): void;

  /**
   * Get the NavPathInfo array.
   *
   * @returns { Array<NavPathInfo> } The NavPathInfo array.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  getPathStack(): Array<NavPathInfo>;

  /**
   * Set the NavPathInfo array.
   *
   * @param { Array<NavPathInfo> } pathStack - The NavPathInfo array.
   * @param { boolean } [animated] - Indicate whether the operation has animation.
   * <br>Default value: **true**.
   * <br>**true**: The transition animation is supported. **false**: The transition animation is not supported.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  setPathStack(pathStack: Array<NavPathInfo>, animated?: boolean): void;
}

/**
 * Defines the name of the navigation home page.
 *
 * @typedef { 'navBar' } NavBar
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare type NavBar = 'navBar'

/**
 * navigation interception callback using in willShow and didShow
 *
 * @typedef { function } InterceptionShowCallback
 * @param { NavDestinationContext | NavBar } from - Indicates the starting NavDestination or NavBar.
 * @param { NavDestinationContext | NavBar } to - Indicates the destination NavDestination or NavBar.
 * @param { NavigationOperation } operation - Indicates the type of stack operation.
 * @param { boolean } isAnimated - Indicates whether the transition is animated.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare type InterceptionShowCallback = (from: NavDestinationContext|NavBar, to: NavDestinationContext|NavBar, operation: NavigationOperation, isAnimated: boolean) => void;

/**
 * navigation interception callback.
 *
 * @typedef { function } InterceptionCallback
 * @param { NavPathInfo | NavBar } from - Indicates the info of NavDestination or NavBar.
 * @param { NavPathInfo | NavBar } to - Indicates the info of NavDestination or NavBar.
 * @param { NavPathStack } pathStack - The NavPathStack of current Navigation.
 * @param { NavigationOperation } operation - Indicates the type of navigation operation.
 * @param { boolean } isAnimated - Indicates whether the transition is animated.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 22 dynamic
 */
declare type InterceptionCallback = (from: NavPathInfo|NavBar, to: NavPathInfo|NavBar, pathStack: NavPathStack, operation: NavigationOperation, isAnimated: boolean) => void;

/**
 * navigation interception callback using in navigation mode change
 *
 * @typedef { function } InterceptionModeCallback
 * @param { NavigationMode } mode - Indicates the mode of Navigation.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare type InterceptionModeCallback = (mode: NavigationMode) => void;

/**
 * Provide navigation transition interception
 *
 * @interface NavigationInterception
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface NavigationInterception {
  /**
   * Interception before page redirection, allowing for stack operations.
   * The setting takes effect in the current redirection.
   *
   * @type { ?InterceptionShowCallback }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  willShow?: InterceptionShowCallback;

  /**
   * Called after destination transition.For details, see { @Link InterceptionShowCallback}.
   *
   * @type { ?InterceptionShowCallback }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  didShow?: InterceptionShowCallback;

  /**
   * Called when navigation mode changed.For details, see { @Link InterceptionModeCallback}.
   *
   * @type { ?InterceptionModeCallback }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  modeChange?: InterceptionModeCallback;

  /**
   * Called before destination is created.For details, see { @Link InterceptionCallback}.
   *
   * @type { ?InterceptionCallback }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  interception?: InterceptionCallback;
}

/**
 * Indicates the information of home destination.
 *
 * @interface HomePathInfo
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20 dynamic
 */
declare interface HomePathInfo {
  /**
   * Name of the home destination.
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  name: string;

  /**
   * Detailed parameters of the home destination.
   *
   * @type { ?Object }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  param?: Object;
}

/**
 * Provide navigation view interface
 *
 * @interface NavigationInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Provide navigation view interface
 *
 * @interface NavigationInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provide navigation view interface
 *
 * @interface NavigationInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
interface NavigationInterface {
  /**
   * Called when the navigation view interface is used.
   *
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Called when the navigation view interface is used.
   *
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the navigation view interface is used.
   *
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  (): NavigationAttribute;

  /**
   * Called when the navigation view interface is used, with route table provided.
   *
   * @param { NavPathStack } pathInfos - The stack of the route table.
   * @returns { NavigationAttribute } Returns the instance of the NavigationAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the navigation view interface is used, with route table provided.
   *
   * @param { NavPathStack } pathInfos - The stack of the route table.
   * @returns { NavigationAttribute } Returns the instance of the NavigationAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  (pathInfos: NavPathStack): NavigationAttribute;

  /**
   * Called when the navigation view interface is used, with route table and homeDestination are provided.
   *
   * @param { NavPathStack } pathInfos - The stack of the route table.
   * @param { HomePathInfo } homeDestination - The custom home destination info.
   * @returns { NavigationAttribute } Returns the instance of the NavigationAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  (pathInfos: NavPathStack, homeDestination: HomePathInfo): NavigationAttribute;
}

/**
 * Defines the status of toolbar item and it is used in the ToolbarItem interface.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Defines the status of toolbar item and it is used in the ToolbarItem interface.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare enum ToolbarItemStatus {
  /**
   * Normal state. In this state, the toolbar item takes on the default style and
   * can switch to another state-specific style by responding to the hover, press,
   * and focus events.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Normal state. In this state, the toolbar item takes on the default style and
   * can switch to another state-specific style by responding to the hover, press,
   * and focus events.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  NORMAL = 0,

  /**
   * Disable state of toolbar item.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Disable state of toolbar item.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  DISABLED = 1,

  /**
   * Active state. In this state, the toolbar item can update its icon
   * to the one specified by **activeIcon** by responding to a click event.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Active state. In this state, the toolbar item can update its icon
   * to the one specified by **activeIcon** by responding to a click event.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  ACTIVE = 2,
}

/**
 * Defines the operation of current navigation transition.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Defines the operation of current navigation transition.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare enum NavigationOperation {
  /**
   * Push operation of navigation transition.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Push operation of navigation transition.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  PUSH = 1,

  /**
   * Pop operation of navigation transition.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Pop operation of navigation transition.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  POP = 2,

  /**
   * The transition is page replacement.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * The transition is page replacement.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  REPLACE = 3,
}

/**
 * Defines configurable parameters for toolbar item.
 *
 * @interface ToolbarItem
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Defines configurable parameters for toolbar item.
 *
 * @interface ToolbarItem
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
/**
 * Defines configurable parameters for toolbar item.
 *
 * @interface ToolbarItem
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20 dynamic
 */
declare interface ToolbarItem {
  /**
   * The value of navigation toolbar item.
   *
   * @type { ResourceStr }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * The value of navigation toolbar item.
   *
   * @type { ResourceStr }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  value: ResourceStr;

  /**
   * The icon of navigation toolbar item.
   *
   * @type { ?ResourceStr }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * The icon of navigation toolbar item.
   *
   * @type { ?ResourceStr }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  icon?: ResourceStr;

  /**
   * The symbol of navigation toolbar item.
   *
   * @type { ?SymbolGlyphModifier }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12
   */
  /**
   * The symbol of navigation toolbar item.
   *
   * @type { ?SymbolGlyphModifier }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  symbolIcon?: SymbolGlyphModifier;

  /**
   * Trigger by navigation toolbar item click.
   *
   * @type { ?function }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Trigger by navigation toolbar item click.
   *
   * @type { ?function }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  action?: () => void;

  /**
   * The state of navigation toolbar item.
   *
   * @type { ?ToolbarItemStatus }
   * @default ToolbarItemStatus.NORMAL
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * The state of navigation toolbar item.
   *
   * @type { ?ToolbarItemStatus }
   * @default ToolbarItemStatus.NORMAL
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  status?: ToolbarItemStatus;

  /**
   * The icon of navigation toolbar item in active state.
   *
   * @type { ?ResourceStr }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * The icon of navigation toolbar item in active state.
   *
   * @type { ?ResourceStr }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  activeIcon?: ResourceStr;

  /**
   * The symbol of navigation toolbar item in active state.
   *
   * @type { ?SymbolGlyphModifier }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12
   */
  /**
   * The symbol of navigation toolbar item in active state.
   *
   * @type { ?SymbolGlyphModifier }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  activeSymbolIcon?: SymbolGlyphModifier;
}

/**
 * Indicates the options of Navigation's Titlebar.
 *
 * @interface NavigationTitleOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare interface NavigationTitleOptions {
  /**
   * Background color of the title bar. If this parameter is not set, the default color is used.
   *
   * @type { ?ResourceColor }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  backgroundColor?: ResourceColor;

  /**
   * Background blur style of the title bar. If this parameter is not set, the background
   * blur effect is disabled.
   *
   * @type { ?BlurStyle }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  backgroundBlurStyle?: BlurStyle;

  /**
   * Background blur style options.
   *
   * @type { ?BackgroundBlurStyleOptions }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  backgroundBlurStyleOptions?: BackgroundBlurStyleOptions;

  /**
   * Background effect options.
   *
   * @type { ?BackgroundEffectOptions }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  backgroundEffect?: BackgroundEffectOptions;

  /**
   * Layout style of the title bar.
   * <br>Default value: **BarStyle.STANDARD**.
   *
   * @type { ?BarStyle }
   * @default BarStyle.STANDARD
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  barStyle?: BarStyle;

  /**
   * Set title bar start padding.
   *
   * @type { ?LengthMetrics }
   * @default LengthMetrics.resource($r('sys.float.margin_left'))
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  paddingStart?: LengthMetrics;

  /**
   * Set title bar end padding.
   *
   * @type { ?LengthMetrics }
   * @default LengthMetrics.resource($r('sys.float.margin_right'))
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  paddingEnd?: LengthMetrics;

  /**
   * Text modifier for main title.
   *
   * @type { ?TextModifier }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 13 dynamic
   */
  mainTitleModifier?: TextModifier;

  /**
   * Text modifier for sub title.
   *
   * @type { ?TextModifier }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 13 dynamic
   */
  subTitleModifier?: TextModifier;
  
  /**
   * Defines whether to respond to the hover mode.
   *
   * @type { ?boolean }
   * @default false
   * <br>**true**: Enable hover effects.
   * <br>**false**: Disable hover effects.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 13 dynamic
   */
  enableHoverMode?: boolean;
}

/**
 * Declare BarStyle enum.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare enum BarStyle {
  /**
   * In this mode, the title bar or toolbar is laid out above the content area.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  STANDARD = 0,

  /**
   * In this mode, the title bar or toolbar is overlaid on top of the content area.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  STACK = 1,

  /**
   * SafeAreaPadding style means the bar height will be taken as content's safeAreaPadding.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 14 dynamic
   */
  SAFE_AREA_PADDING = 2,
}

/**
 * Indicates the options of Navigation's Toolbar.
 *
 * @interface NavigationToolbarOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare interface NavigationToolbarOptions {
  /**
   * Background color of the toolbar. If this parameter is not set, the default color is used.
   *
   * @type { ?ResourceColor }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  backgroundColor?: ResourceColor;

  /**
   * Background blur style of the toolbar. If this parameter is not set, the background blur
   * effect is disabled.
   *
   * @type { ?BlurStyle }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  backgroundBlurStyle?: BlurStyle;

  /**
   * Background blur style options.
   *
   * @type { ?BackgroundBlurStyleOptions }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  backgroundBlurStyleOptions?: BackgroundBlurStyleOptions;

  /**
   * Background effect options.
   *
   * @type { ?BackgroundEffectOptions }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  backgroundEffect?: BackgroundEffectOptions;

  /**
   * More button options.
   *
   * @type { ?MoreButtonOptions }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  moreButtonOptions?: MoreButtonOptions;

  /**
   * Set tool bar style.
   *
   * @type { ?BarStyle }
   * @default BarStyle.STANDARD
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 14 dynamic
   */
  barStyle?: BarStyle;

  /**
   * Set whether toolbar displays text.
   *
   * @type { ?boolean }
   * @default false
   * <br>**true**: Hide the toolbar text.
   * <br>**false**: Show the toolbar text.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  hideItemValue?: boolean
}

/**
 * Indicates the options of Navigation's Menu.
 *
 * @interface NavigationMenuOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 19 dynamic
 */
declare interface NavigationMenuOptions {
/**
 * More button options.
 *
 * @type { ?MoreButtonOptions }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 19 dynamic
 */
  moreButtonOptions?: MoreButtonOptions;
}

/**
 * The more button options of Navigation's menu or toolbar.
 *
 * @interface MoreButtonOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 19 dynamic
 */
declare interface MoreButtonOptions {
  /**
   * Background blur style.
   *
   * @type { ?BlurStyle }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  backgroundBlurStyle?: BlurStyle;
  
  /**
   * Background blur style options.
   *
   * @type { ?BackgroundBlurStyleOptions }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  backgroundBlurStyleOptions?: BackgroundBlurStyleOptions;

  /**
   * Background effect options.
   *
   * @type { ?BackgroundEffectOptions }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  backgroundEffect?: BackgroundEffectOptions;
}

/**
 * Declare Navigation view properties.
 *
 * @extends CommonMethod<NavigationAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Declare Navigation view properties.
 *
 * @extends CommonMethod<NavigationAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Declare Navigation view properties.
 *
 * @extends CommonMethod<NavigationAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare class NavigationAttribute extends CommonMethod<NavigationAttribute> {
  /**
   * Sets the width of the navigation bar.
   * This attribute takes effect only when the **Navigation** component is in split mode.
   *
   * @param { Length } value - Width of the navigation bar.
   * <br>Default value: **240**. Unit: vp.
   * <br>**undefined**: No action is taken, and the navigation bar width remains consistent with the default value.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Sets the width of the navigation bar.
   * This attribute takes effect only when the **Navigation** component is in split mode.
   *
   * @param { Length } value - Width of the navigation bar.
   * <br>Default value: **240**. Unit: vp.
   * <br>**undefined**: No action is taken, and the navigation bar width remains consistent with the default value.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the width of the navigation bar.
   * This attribute takes effect only when the **Navigation** component is in split mode.
   *
   * @param { Length } value - Width of the navigation bar.
   * <br>Default value: **240**. Unit: vp.
   * <br>**undefined**: No action is taken, and the navigation bar width remains consistent with the default value.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  navBarWidth(value: Length): NavigationAttribute;

  /**
   * Sets the position of the navigation bar. This attribute takes effect
   * only when the **Navigation** component is split.
   *
   * @param { NavBarPosition } value - Position of the navigation bar.
   * <br>Default value: **NavBarPosition.Start**.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Sets the position of the navigation bar. This attribute takes effect
   * only when the **Navigation** component is split.
   *
   * @param { NavBarPosition } value - Position of the navigation bar.
   * <br>Default value: **NavBarPosition.Start**.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the position of the navigation bar. This attribute takes effect
   * only when the **Navigation** component is split.
   *
   * @param { NavBarPosition } value - Position of the navigation bar.
   * <br>Default value: **NavBarPosition.Start**.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  navBarPosition(value: NavBarPosition): NavigationAttribute;

  /**
   * Sets the minimum and maximum widths of the navigation bar (effective in split mode).
   *
   * @param { [Dimension, Dimension] } value - Minimum and maximum widths of the navigation bar.
   * <br>Default value: 240 for the minimum value; 40% of the component width (not greater than 432)
   * for the maximum value; if either of the widths is not set, the default value is used for that width.
   * <br>Unit: vp.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the minimum and maximum widths of the navigation bar (effective in split mode).
   *
   * @param { [Dimension, Dimension] } value - Minimum and maximum widths of the navigation bar.
   * <br>Default value: 240 for the minimum value; 40% of the component width (not greater than 432)
   * for the maximum value; if either of the widths is not set, the default value is used for that width.
   * <br>Unit: vp.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  navBarWidthRange(value: [Dimension, Dimension]): NavigationAttribute;

  /**
   * Sets the minimum width of the navigation bar content area (effective in split mode).
   *
   * @param { Dimension } value - Minimum width of the navigation bar content area.
   * <br>Default value: **360**.
   * <br>Unit: vp.
   * <br>**undefined**: No action is taken, and the minimum width of the navigation bar remains
   * consistent with the default value.<br>Breakpoint calculation in Auto mode: default 600 vp =
   * minNavBarWidth (240 vp) + minContentWidth (360 vp).
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the minimum width of the navigation bar content area (effective in split mode).
   *
   * @param { Dimension } value - Minimum width of the navigation bar content area.
   * <br>Default value: **360**.
   * <br>Unit: vp.
   * <br>**undefined**: No action is taken, and the minimum width of the navigation bar remains
   * consistent with the default value.<br>Breakpoint calculation in Auto mode: default 600 vp =
   * minNavBarWidth (240 vp) + minContentWidth (360 vp).
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  minContentWidth(value: Dimension): NavigationAttribute;

  /**
   * Sets the mode of navigation.
   *
   * @param { NavigationMode } value - Display mode of the navigation.
   * <br>Default value: **NavigationMode.Auto**.
   * <br>At the default settings, the navigation adapts to stack or split mode based on the component width.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Sets the mode of navigation.
   *
   * @param { NavigationMode } value - Display mode of the navigation.
   * <br>Default value: **NavigationMode.Auto**.
   * <br>At the default settings, the navigation adapts to stack or split mode based on the component width.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the mode of navigation.
   *
   * @param { NavigationMode } value - Display mode of the navigation.
   * <br>Default value: **NavigationMode.Auto**.
   * <br>At the default settings, the navigation adapts to stack or split mode based on the component width.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  mode(value: NavigationMode): NavigationAttribute;

  /**
   * Sets the icon of the back button in the title bar.
   *
   * @param { string | PixelMap | Resource } value - Icon of the back button in the title bar.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Sets the icon of the back button in the title bar.
   *
   * @param { string | PixelMap | Resource } value - Icon of the back button in the title bar.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the icon of the back button in the title bar.
   *
   * @param { string | PixelMap | Resource } value - Icon of the back button in the title bar.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Sets the icon of the back button in the title bar.
   *
   * @param { string | PixelMap | Resource | SymbolGlyphModifier } value - Icon of the back button in the title bar.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  backButtonIcon(value: string | PixelMap | Resource | SymbolGlyphModifier): NavigationAttribute;

  /**
   * Sets the back button icon and accessibility broadcast content.
   *
   * @param { string | PixelMap | Resource | SymbolGlyphModifier } icon - Indicates icon of back button
   * @param { ResourceStr } [accessibilityText] - Indicates content needs to broadcast.
   *                                            Default value: **back** when the system language is English.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  backButtonIcon(icon: string | PixelMap | Resource | SymbolGlyphModifier, accessibilityText?: ResourceStr): NavigationAttribute;

  /**
   * Hide the NavBar, which includes title bar, the child of Navigation and tool bar. Supported in split mode.
   *
   * @param { boolean } value - Whether to hide the navigation bar.
   * <br>Default value: **false**. **true**: Hide the navigation bar. **false**: Show the navigation bar.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Hide the NavBar, which includes title bar, the child of Navigation and tool bar. Supported in split mode.
   *
   * @param { boolean } value - Whether to hide the navigation bar.
   * <br>Default value: **false**. **true**: Hide the navigation bar. **false**: Show the navigation bar.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Hide the NavBar, which includes title bar, the child of Navigation and tool bar. Supported in all mode. 
   * It will show top page in the NavPathStack directly or empty if there is no page in the NavPathStack.
   *
   * @param { boolean } value - Whether to hide the navigation bar.
   * <br>Default value: **false**. **true**: Hide the navigation bar. **false**: Show the navigation bar.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  hideNavBar(value: boolean): NavigationAttribute;

  /**
   * Navigation title
   *
   * @param { string | CustomBuilder } value
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Navigation title
   *
   * @param { string | CustomBuilder | NavigationCommonTitle | NavigationCustomTitle } value - Navigation title.
   * <br>When the NavigationCustomTitle type is used to set the height, titleMode does not take effect.
   * <br>When the title string is too long:
   * <br>If no subtitle is set, the string is scaled down, wrapped in two lines, and then clipped.
   * <br>If a subtitle is set, the subtitle is scaled down and then clipped.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Navigation title
   *
   * @param { ResourceStr | CustomBuilder | NavigationCommonTitle | NavigationCustomTitle } value - Navigation title.
   * <br>When the NavigationCustomTitle type is used to set the height, titleMode does not take effect.
   * <br>When the title string is too long:
   * <br>If no subtitle is set, the string is scaled down, wrapped in two lines, and then clipped.
   * <br>If a subtitle is set, the subtitle is scaled down and then clipped.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Navigation title
   *
   * @param { ResourceStr | CustomBuilder | NavigationCommonTitle | NavigationCustomTitle } value - Navigation title.
   * <br>When the NavigationCustomTitle type is used to set the height, titleMode does not take effect.
   * <br>When the title string is too long:
   * <br>If no subtitle is set, the string is scaled down, wrapped in two lines, and then clipped.
   * <br>If a subtitle is set, the subtitle is scaled down and then clipped.
   * @param { NavigationTitleOptions } [options] - Indicates the options of titlebar.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  title(value: ResourceStr | CustomBuilder | NavigationCommonTitle | NavigationCustomTitle, options?: NavigationTitleOptions): NavigationAttribute;

  /**
   * Sets the subtitle of the navigation.
   *
   * @param { string } value - Content of subtitle.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8 dynamiconly
   * @deprecated since 9
   * @useinstead title
   */
  subTitle(value: string): NavigationAttribute;

  /**
   * Hide navigation title bar
   *
   * @param { boolean } value - Whether to hide the title bar.
   * <br>Default value is **false**. **true**: Hide the title bar. **false**: Show the title bar.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Hide navigation title bar
   *
   * @param { boolean } value - Whether to hide the title bar.
   * <br>Default value is **false**. **true**: Hide the title bar. **false**: Show the title bar.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Hide navigation title bar
   *
   * @param { boolean } value - Whether to hide the title bar.
   * <br>Default value is **false**. **true**: Hide the title bar. **false**: Show the title bar.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  hideTitleBar(value: boolean): NavigationAttribute;

  /**
   * Sets whether to hide the title bar and whether to animate the visibility change.
   *
   * @param { boolean } hide - Whether to hide the title bar.
   * <br>Default value is **false**. **true**: Hide the title bar. **false**: Show the title bar.
   * @param { boolean } animated - Whether to animate the visibility change.
   * <br>Default value is **false**.
   * <br>**true**: Animate the visibility change. **false**: Do not animate the visibility change.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 13 dynamic
   */
  hideTitleBar(hide: boolean, animated: boolean): NavigationAttribute;

  /**
   * Sets whether to hide the back button in the title bar.
   * The back button is available only when titleMode is set to **NavigationTitleMode.Mini**.
   *
   * @param { boolean } value - Whether to hide the back button in the title bar.
   * <br>Default value: **false**. **true**: Hide the back button. **false**: Show the back button.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Sets whether to hide the back button in the title bar.
   * The back button is available only when titleMode is set to **NavigationTitleMode.Mini**.
   *
   * @param { boolean } value - Whether to hide the back button in the title bar.
   * <br>Default value: **false**. **true**: Hide the back button. **false**: Show the back button.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets whether to hide the back button in the title bar.
   * The back button is available only when titleMode is set to **NavigationTitleMode.Mini**.
   *
   * @param { boolean } value - Whether to hide the back button in the title bar.
   * <br>Default value: **false**. **true**: Hide the back button. **false**: Show the back button.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  hideBackButton(value: boolean): NavigationAttribute;

  /**
   * Sets the display mode of the navigation title mode.
   *
   * @param { NavigationTitleMode } value - Display mode of the page title bar.
   * <br>Default value: **NavigationTitleMode.Free**
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Sets the display mode of the navigation title mode.
   *
   * @param { NavigationTitleMode } value - Display mode of the page title bar.
   * <br>Default value: **NavigationTitleMode.Free**
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the display mode of the navigation title mode.
   *
   * @param { NavigationTitleMode } value - Display mode of the page title bar.
   * <br>Default value: **NavigationTitleMode.Free**
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  titleMode(value: NavigationTitleMode): NavigationAttribute;

  /**
   * Sets the menu items in the upper right corner of the navigation.
   * If this attribute is not set, no menu item is displayed. When the value type is NavigationMenuItem,
   * The menu shows a maximum of three icons in portrait mode and a maximum of five icons in landscape mode,
   * With excess icons (if any) placed under the automatically generated **More** icon.
   *
   * @param { Array<NavigationMenuItem> | CustomBuilder } value -
   * <br>Menu items in the upper right corner of the navigation.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Sets the menu items in the upper right corner of the navigation.
   * If this attribute is not set, no menu item is displayed. When the value type is NavigationMenuItem,
   * The menu shows a maximum of three icons in portrait mode and a maximum of five icons in landscape mode,
   * With excess icons (if any) placed under the automatically generated **More** icon.
   *
   * @param { Array<NavigationMenuItem> | CustomBuilder } value -
   * <br>Menu items in the upper right corner of the navigation.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the menu items in the upper right corner of the navigation.
   * If this attribute is not set, no menu item is displayed. When the value type is NavigationMenuItem,
   * The menu shows a maximum of three icons in portrait mode and a maximum of five icons in landscape mode,
   * With excess icons (if any) placed under the automatically generated **More** icon.
   *
   * @param { Array<NavigationMenuItem> | CustomBuilder } value -
   * <br>Menu items in the upper right corner of the navigation.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  menus(value: Array<NavigationMenuItem> | CustomBuilder): NavigationAttribute;

  /**
   * Navigation title bar's menus
   *
   * @param { Array<NavigationMenuItem> | CustomBuilder } items
   * @param { NavigationMenuOptions } [options] - Indicates the options of menu.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  menus(items: Array<NavigationMenuItem> | CustomBuilder, options?: NavigationMenuOptions): NavigationAttribute;

  /**
   * Sets the content of the toolbar. If this attribute is not set, no toolbar is displayed.
   * Toolbar items are evenly distributed on the bottom toolbar, with text and icons evenly
   * spaced in each content area. If any item contains overlong text and there are fewer than
   * five items, the toolbar will reduce the text size progressively, wrap the text over two
   * lines if necessary, and then clip the text to fit.
   *
   * @param { object | CustomBuilder } value - Content of the toolbar.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8 dynamiconly
   * @deprecated since 10
   * @useinstead navigation/NavigationAttribute#toolbarConfiguration
   */
  toolBar(value: object | CustomBuilder): NavigationAttribute;

  /**
    * Sets the content of the toolbar. If this attribute is not set, no toolbar is displayed.
    *
    * @param { Array<ToolbarItem> | CustomBuilder } value - Toolbar configuration parameters.
    * @returns { NavigationAttribute }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @since 10
    */
  /**
    * Sets the content of the toolbar. If this attribute is not set, no toolbar is displayed.
    *
    * @param { Array<ToolbarItem> | CustomBuilder } value - Toolbar configuration parameters.
    * @param { NavigationToolbarOptions } [options] - Indicates the options of toolbar.
    * @returns { NavigationAttribute }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 11 dynamic
    */
  toolbarConfiguration(value: Array<ToolbarItem> | CustomBuilder, options?: NavigationToolbarOptions): NavigationAttribute;

  /**
   * Hide tool bar
   *
   * @param { boolean } value - Whether to hide the toolbar.
   * <br>Default value: **false**. **true**: Hide the toolbar. **false**: Show the toolbar.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Hide tool bar
   *
   * @param { boolean } value - Whether to hide the toolbar.
   * <br>Default value: **false**. **true**: Hide the toolbar. **false**: Show the toolbar.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Hide tool bar
   *
   * @param { boolean } value - Whether to hide the toolbar.
   * <br>Default value: **false**. **true**: Hide the toolbar. **false**: Show the toolbar.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  hideToolBar(value: boolean): NavigationAttribute;

  /**
   * Sets whether to hide the toolbar and whether to animate the visibility change.
   *
   * @param { boolean } hide - Whether to hide the toolbar.
   * <br>Default value: **false**. **true**: Hide the toolbar. **false**: Show the toolbar.
   * @param { boolean } animated - Whether to animate the visibility change.
   * <br>Default value: **false**.
   * <br>**true**: Animate the visibility change. **false**: Do not animate the visibility change.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 13 dynamic
   */
  hideToolBar(hide: boolean, animated: boolean): NavigationAttribute;

  /**
   * Enable tool bar adaptation
   *
   * @param { Optional<boolean> } enable - Enable or disable tool bar adaptation.
   *                                       Default value: **true**.
   *                                       **true**: Enable toolbar adaptation.
   *                                       **false**: Disable toolbar adaptation.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  enableToolBarAdaptation(enable: Optional<boolean>): NavigationAttribute;

  /**
   * Triggered when titleMode is set to **NavigationTitleMode.Free**
   * and the title bar mode changes as content scrolls.
   *
   * @param { (titleMode: NavigationTitleMode) => void } callback
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Triggered when titleMode is set to **NavigationTitleMode.Free**
   * and the title bar mode changes as content scrolls.
   *
   * @param { function } callback
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Triggered when titleMode is set to **NavigationTitleMode.Free**
   * and the title bar mode changes as content scrolls.
   *
   * @param { function } callback
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  onTitleModeChange(callback: (titleMode: NavigationTitleMode) => void): NavigationAttribute;

  /**
   * Trigger callback when the visibility of navigation bar change.
   *
   * @param { (isVisible: boolean) => void } callback - Whether the navigation bar is visible.
   * <br>The value **true** means that the navigation bar is visible, and **false** means the opposite.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Trigger callback when the visibility of navigation bar change.
   *
   * @param { function } callback - Whether the navigation bar is visible.
   * <br>The value **true** means that the navigation bar is visible, and **false** means the opposite.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Trigger callback when the visibility of navigation bar change.
   *
   * @param { function } callback - Whether the navigation bar is visible.
   * <br>The value **true** means that the navigation bar is visible, and **false** means the opposite.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  onNavBarStateChange(callback: (isVisible: boolean) => void): NavigationAttribute;

  /**
   * Triggered when the **Navigation** component is displayed for the first time or
   * its display mode switches between Stack and Split.
   *
   * @param { function } callback
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  onNavigationModeChange(callback: (mode: NavigationMode) => void): NavigationAttribute;

  /**
   * Set builder for user-defined NavDestination component.
   *
   * @param { function } builder - The builder function of NavDestination component.
   * <br>**name**: name of the navigation destination page.
   * <br>**param**: detailed parameters of the navigation destination page.
   * @returns { NavigationAttribute } Returns the instance of the NavigationAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set builder for user-defined NavDestination component.
   *
   * @param { function } builder - The builder function of NavDestination component.
   * <br>**name**: name of the navigation destination page.
   * <br>**param**: detailed parameters of the navigation destination page.
   * @returns { NavigationAttribute } Returns the instance of the NavigationAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  navDestination(builder: (name: string, param: unknown) => void): NavigationAttribute;

  /**
   * Set custom navigation content transition animation.
   *
   * @param { function } delegate - Custom transition delegate.
   * @returns { NavigationAttribute } Returns the instance of the NavigationAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Set custom navigation content transition animation.
   *
   * @param { function } delegate - Custom transition delegate.
   * @returns { NavigationAttribute } Returns the instance of the NavigationAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  customNavContentTransition(delegate: (from: NavContentInfo, to: NavContentInfo, operation: NavigationOperation) => NavigationAnimatedTransition | undefined): NavigationAttribute;

  /**
   * Ignores the layout safe area by allowing the component to extend into the non-safe areas of the screen.
   *
   * @param { Array<LayoutSafeAreaType> } [types] - Types of non-safe areas to extend into.
   * <br>Default value:<br>[LayoutSafeAreaType.SYSTEM].
   * @param { Array<LayoutSafeAreaEdge> } [edges] - Edges for expanding the safe area.
   * <br> Default value:<br>[LayoutSafeAreaEdge.TOP, LayoutSafeAreaEdge.BOTTOM].
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  ignoreLayoutSafeArea(types?: Array<LayoutSafeAreaType>, edges?: Array<LayoutSafeAreaEdge>): NavigationAttribute;

  /**
   * Sets the style of the system status bar when the navbar of the **Navigation** component is displayed.
   *
   * @param { Optional<SystemBarStyle> } style - Style of the system status bar.
   * @returns { NavigationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  systemBarStyle(style: Optional<SystemBarStyle>): NavigationAttribute;
  
  /**
   * Set the Navigation can be restored after the application is terminated.
   * To enable this attribute, a navigation id must be set.
   * 
   * @param { boolean } recoverable - navigation can be recovered.
   *                                  Default value: **false**.
   *                                  **true**: The **Navigation** component is recoverable.
   *                                  **false**: The **Navigation** component is not recoverable.
   * @returns { NavigationAttribute } Returns the instance of the NavigationAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 14 dynamic
   */
  recoverable(recoverable: Optional<boolean>): NavigationAttribute;

  /**
   * Enable dragbar
   * 
   * @param { Optional<boolean> } isEnabled - enable dragbar or disable dragbar.
   *                                          Default value: **false**.
   *                                          **true**: Enable the drag bar.
   *                                          **false**: Disable the drag bar.
   * @returns { NavigationAttribute } Returns the instance of the NavigationAttribute.            
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 14 dynamic
   */
  enableDragBar(isEnabled: Optional<boolean>): NavigationAttribute;
  
  /**
   * Set the navigation divider style in split mode.
   *
   * @param { NavigationDividerStyle | null } style - navigation divider style in split mode.
   *      null indicates that the divider is hidden.
   * @returns { NavigationAttribute } Returns the instance of the NavigationAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  divider(style: NavigationDividerStyle | null): NavigationAttribute;

  /**
   * whether to enable modeChangeAnimation
   * 
   * @param { Optional<boolean> } isEnabled - enableModeChangeAnimation.
   *                                          Default value: **true**.
   *                                          **true**: Enable the animation for switching between stack and split mode.
   *                                          **false**: Disable the animation for switching between stack and split mode.
   * @returns { NavigationAttribute } Returns the instance of the NavigationAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  enableModeChangeAnimation(isEnabled: Optional<boolean>): NavigationAttribute;

  /**
   * Set placeholder in split mode.
   *
   * @param { ComponentContent } placeholder - Set placeholder in split mode.
   * @returns { NavigationAttribute } Returns the instance of the NavigationAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  splitPlaceholder(placeholder: ComponentContent): NavigationAttribute;

  /**
   * Whether to enable the show or hide lifecycle with bindContentCover.
   * The true means that bindContentCover can affect the show or hide lifecycle of Navigation, and the false not.
   *
   * @param { Optional<boolean> } isEnabled - enable the show or hide lifecycle with bindContentCover.
   *                                          Default value: **true**.
   *                                          **true**: The bindContentCover can affect the show or hide lifecycle of Navigation.
   *                                          **false**: The bindContentCover can not affect the show or hide lifecycle of Navigation.
   * @returns { NavigationAttribute } Returns the instance of the NavigationAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 21 dynamic
   */
  enableVisibilityLifecycleWithContentCover(isEnabled: Optional<boolean>): NavigationAttribute;
}

/**
* Navigation transition animation protocol.
*
* @interface NavigationAnimatedTransition
* @syscap SystemCapability.ArkUI.ArkUI.Full
* @crossplatform
* @since 11
*/
/**
* Navigation transition animation protocol.
*
* @interface NavigationAnimatedTransition
* @syscap SystemCapability.ArkUI.ArkUI.Full
* @crossplatform
* @atomicservice
* @since 12 dynamic
*/
declare interface NavigationAnimatedTransition {
  /**
   * This method is called after the transition ends to notify whether the transition was successful.
   *
   * @type { ?function }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * This method is called after the transition ends to notify whether the transition was successful.
   *
   * @type { ?function }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onTransitionEnd?: (success: boolean) => void

  /**
   * Define the limit duration of the transition animation.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Define the limit duration of the transition animation.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  timeout?: number;

  /**
   * Indicates whether it is an interactive transition.
   *
   * @type { ?boolean }
   * @default false
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  isInteractive?: boolean;

  /**
   * Configure the animations associated with custom transition.
   *
   * @type { function }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Configure the animations associated with custom transition.
   *
   * @type { function }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  transition: (transitionProxy: NavigationTransitionProxy) => void
}

/**
 * Navigation transition proxy.
 *
 * @interface NavigationTransitionProxy
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Navigation transition proxy.
 *
 * @interface NavigationTransitionProxy
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface NavigationTransitionProxy {
  /**
   * From navigation content info.
   *
   * @type { NavContentInfo }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * From navigation content info.
   *
   * @type { NavContentInfo }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  from: NavContentInfo;

  /**
   * To navigation content info.
   *
   * @type { NavContentInfo }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * To navigation content info.
   *
   * @type { NavContentInfo }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  to: NavContentInfo;

  /**
   * Indicates whether it is an interactive transition.
   *
   * @type { ?boolean }
   * @default false
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  isInteractive?: boolean;

  /**
   * Notification system transition animation completed.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Notification system transition animation completed.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  finishTransition(): void;

  /**
   * Cancels this interactive transition animation, restoring the navigation
   * stack to its state before page redirection. (Non-interactive transition
   * animations cannot be canceled.)
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  cancelTransition?(): void;

  /**
   * Updates the progress of this interactive transition animation. (Non-interactive
   * animations do not support setting the animation progress).
   *
   * @param { number } progress - The progress of transition animation.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  updateTransition?(progress: number): void;
}

/**
 * Navigation content info.
 *
 * @interface NavContentInfo
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Navigation content info.
 *
 * @interface NavContentInfo
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface NavContentInfo {
  /**
   * Navigation content name.
   *
   * @type { ?string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Navigation content name.
   *
   * @type { ?string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  name?: string;

  /**
   * Navigation content index.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Navigation content index.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  index: number;

  /**
   * Navigation content mode.
   *
   * @type { ?NavDestinationMode }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Navigation content mode.
   *
   * @type { ?NavDestinationMode }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  mode?: NavDestinationMode;

  /**
   * Navigation content param.
   *
   * @type { ?Object }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  param?: Object;

  /**
   * The unique id of NavDestination.
   *
   * @type { ?string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  navDestinationId?: string;
}

/**
* Define the style of the Navigation divider.
*
* @interface NavigationDividerStyle
* @syscap SystemCapability.ArkUI.ArkUI.Full
* @crossplatform
* @atomicservice
* @since 23 dynamic
*/
declare interface NavigationDividerStyle {
  /**
   * Define the color of the navigation divider.
   *
   * @type { ?ResourceColor }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  color?: ResourceColor;

  /**
   * Define the start margin of the navigation divider.
   *
   * @type { ?Length }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  startMargin?: Length;

  /**
   * Define the end margin of the navigation divider.
   *
   * @type { ?Length }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  endMargin?: Length;
}

/**
 * Defines Navigation Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines Navigation Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines Navigation Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare const Navigation: NavigationInterface;

/**
 * Defines Navigation Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines Navigation Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines Navigation Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare const NavigationInstance: NavigationAttribute;
