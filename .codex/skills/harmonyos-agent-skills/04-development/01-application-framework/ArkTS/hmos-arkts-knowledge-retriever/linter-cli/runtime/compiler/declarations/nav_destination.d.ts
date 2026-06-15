/*
 * Copyright (c) 2022-2024 Huawei Device Co., Ltd.
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
 * Import the Orientation type from @ohos.window.
 *
 * @typedef { import('../../../api/@ohos.window').default.Orientation } Orientation
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 19 dynamic
 */
declare type Orientation = import('../../../api/@ohos.window').default.Orientation;

/**
 * Defines the navigation destination common title.
 *
 * @interface NavDestinationCommonTitle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Defines the navigation destination common title.
 *
 * @interface NavDestinationCommonTitle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the navigation destination common title.
 *
 * @interface NavDestinationCommonTitle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare interface NavDestinationCommonTitle {
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
 * Defines the navigation destination custom title.
 *
 * @interface NavDestinationCustomTitle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Defines the navigation destination custom title.
 *
 * @interface NavDestinationCustomTitle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the navigation destination custom title.
 *
 * @interface NavDestinationCustomTitle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare interface NavDestinationCustomTitle {
  /**
   * Sets the custom title builder.
   *
   * @type { CustomBuilder }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Sets the custom title builder.
   *
   * @type { CustomBuilder }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the custom title builder.
   *
   * @type { CustomBuilder }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  builder: CustomBuilder;

  /**
   * Sets the custom title height.
   *
   * @type { TitleHeight | Length }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Sets the custom title height.
   *
   * @type { TitleHeight | Length }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the custom title height.
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
 * Types of system Transition.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 14 dynamic
 */
declare enum NavigationSystemTransitionType {
  /**
   * Default system transition animation.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 14 dynamic
   */
  DEFAULT = 0,
  /**
   * No system transition animation.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 14 dynamic
   */
  NONE = 1,
  /**
   * System transition animation of the title bar.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 14 dynamic
   */
  TITLE = 2,
  /**
   * System transition animation of the content area.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 14 dynamic
   */
  CONTENT = 3,
  /**
   * Fade-type system transition animation.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  FADE = 4,
  /**
   * Center-scale type system transition animation.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  EXPLODE = 5,
  /**
   * Right-slide type system transition animation.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  SLIDE_RIGHT = 6,
  /**
   * Bottom-slide type system transition animation.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  SLIDE_BOTTOM = 7,
}

/**
 * NavDestination mode.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * NavDestination mode.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare enum NavDestinationMode {
  /**
   * Standard mode is default mode of NavDestination.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Standard mode is default mode of NavDestination.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  STANDARD = 0,

  /**
   * Dialog mode, where the navigation destination is transparent by default, and adding or removing the navigation
   * destination from the navigation stack does not affect the lifecycle of the lower-layer navigation destinations.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Dialog mode, where the navigation destination is transparent by default, and adding or removing the navigation
   * destination from the navigation stack does not affect the lifecycle of the lower-layer navigation destinations.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  DIALOG = 1,
}

/**
 * Reason of navDestination be active or inactive.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 17 dynamic
 */
declare enum NavDestinationActiveReason {
  /**
   * The activation state changes through page navigation.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 17 dynamic
   */
  TRANSITION = 0,

  /**
   * The activation state changes due to the opening or closing of a modal page.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 17 dynamic
   */
  CONTENT_COVER = 1,

  /**
   * The activation state changes due to the opening or closing of a sheet.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 17 dynamic
   */
  SHEET = 2,

  /**
   * The activation state changes due to the opening or closing of a custom dialog.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 17 dynamic
   */
  DIALOG = 3,

  /**
   * The activation state changes due to the opening or closing of an overlay using **OverlayManager**.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 17 dynamic
   */
  OVERLAY = 4,

  /**
   * The activation state changes due to switching between foreground and background states of the application.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 17 dynamic
   */
  APP_STATE = 5,
}

/**
 * The reason of navDestination be shown or hidden.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 21 dynamic
 */
declare enum VisibilityChangeReason {
  /**
   * The visibility lifecycle changes through page navigation.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 21 dynamic
   */
  TRANSITION = 0,

  /**
   * The visibility lifecycle changes through bindContentCover.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 21 dynamic
   */
  CONTENT_COVER = 1,

  /**
   * The visibility lifecycle changes through the states of application (foreground or background).
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 21 dynamic
   */
  APP_STATE = 2,
}

/**
 * The construct function of NavDestination.
 *
 * @interface NavDestinationInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * The construct function of NavDestination.
 *
 * @interface NavDestinationInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * The construct function of NavDestination.
 *
 * @interface NavDestinationInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare interface NavDestinationInterface {
  /**
   * Constructor.
   *
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Constructor.
   *
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Constructor.
   *
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  (): NavDestinationAttribute;
}

/**
 * Indicates configuration info of destination.
 *
 * @interface RouteMapConfig
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface RouteMapConfig {
  /**
   * Navdestination name.
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  name: string;

  /**
   * Path of the navdestination in the current package.
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  pageSourceFile: string;

  /**
   * Custom data of the page.
   *
   * @type { Object }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  data: Object
}

/**
 * Indicates the context of NavDestination.
 *
 * @interface NavDestinationContext
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare interface NavDestinationContext {
  /**
   * Path information of the navigation destination page.
   *
   * @type { NavPathInfo }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  pathInfo: NavPathInfo;

  /**
   * Page stack where the current navigation destination page is located.
   *
   * @type { NavPathStack }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  pathStack: NavPathStack;

  /**
   * Unique ID of the current navigation destination page, which is automatically generated by the system
   * and is irrelevant to the universal attribute **id** of the component.
   *
   * @type { ?string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  navDestinationId?: string;

  /**
   * The mode of NavDestination.
   *
   * @type { ?NavDestinationMode }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  mode?: NavDestinationMode;

  /**
   * Get configuration of current Destination in module.json
   * 
   * @returns {RouteMapConfig | undefined} - Route map configuration of the current page.
   * **undefined**, returned when the page is not configured through the route table.
   * 
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  getConfigInRouteMap(): RouteMapConfig | undefined;
}

/**
 * Indicates the nested scrollable container components.
 *
 * @interface NestedScrollInfo
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 14 dynamic
 */
declare interface NestedScrollInfo {
  /**
   * Controller of the target scrollable container.
   *
   * @type { Scroller }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 14 dynamic
   */
  parent: Scroller;

  /**
   * Controller of the scrollable container nested within the target scrollable container.
   * This scrollable container is a child component of the target scrollable container.
   *
   * @type { Scroller }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 14 dynamic
   */
  child: Scroller;
}

/**
* NavDestination animation protocol.
*
* @interface NavDestinationTransition
* @syscap SystemCapability.ArkUI.ArkUI.Full
* @crossplatform
* @atomicservice
* @since 15 dynamic
*/
declare interface NavDestinationTransition {
  /**
   * Callback triggered when the transition animation ends.
   *
   * @type { ?Callback<void> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  onTransitionEnd?: Callback<void>;

  /**
   * Duration of the transition animation.
   * Default value: **1000** (in milliseconds).
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  duration?: number;

  /**
   * Curve type of the animation.
   * Default value: Curve.EaseInOut.
   *
   * @type { ?Curve }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  curve?: Curve;

  /**
   * Delay of the transition animation.
   * Default value: **0** (in milliseconds)
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  delay?: number;

  /**
   * Closure function specifying the transition animation.
   * The system generates the corresponding transition animation based on the modifications
   * to the component's UI state within the closure.
   *
   * @type { Callback<void> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  event: Callback<void>;
}

/**
 * The attribute function of NavDestination
 *
 * @extends CommonMethod<NavDestinationAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * The attribute function of NavDestination
 *
 * @extends CommonMethod<NavDestinationAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * The attribute function of NavDestination
 *
 * @extends CommonMethod<NavDestinationAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare class NavDestinationAttribute extends CommonMethod<NavDestinationAttribute> {
  /**
   * NavDestination title bar
   *
   * @param { string | CustomBuilder | NavDestinationCommonTitle | NavDestinationCustomTitle } value
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * NavDestination title bar
   *
   * @param { string | CustomBuilder | NavDestinationCommonTitle | NavDestinationCustomTitle } value
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * NavDestination title bar
   *
   * @param { string | CustomBuilder | NavDestinationCommonTitle | NavDestinationCustomTitle } value
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * NavDestination title bar
   *
   * @param { string | CustomBuilder | NavDestinationCommonTitle | NavDestinationCustomTitle } value
   * @param { NavigationTitleOptions } [options] - Indicates the options of titlebar.
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  /**
   * Sets the page title. When the NavigationCustomTitle type is used to set the height,
   * the titleMode attribute does not take effect.
   * When the title string is too long: (1) If no subtitle is set, the string is scaled down,
   * wrapped in two lines, and then clipped with an ellipsis (...); (2) If a subtitle is set,
   * the subtitle is scaled down and then clipped with an ellipsis (...).
   *
   * @param { string | CustomBuilder | NavDestinationCommonTitle | NavDestinationCustomTitle | Resource } value
   * @param { NavigationTitleOptions } [options] - Indicates the options of titlebar.
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 14 dynamic
   */
  title(value: string | CustomBuilder | NavDestinationCommonTitle | NavDestinationCustomTitle | Resource,
    options?: NavigationTitleOptions): NavDestinationAttribute;

  /**
   * Hide navDestination title bar
   *
   * @param { boolean } value
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Hide navDestination title bar
   *
   * @param { boolean } value
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Specifies whether to hide the title bar.
   *
   * @param { boolean } value
   * <br>Default value: **false**.
   * <br>**true**: Hide the title bar.
   * <br>**false**: Show the title bar.
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  hideTitleBar(value: boolean): NavDestinationAttribute;

  /**
   * Sets whether to hide the title bar and whether to animate the visibility change.
   *
   * @param { boolean } hide
   * <br>Default value: **false**.
   * <br>**true**: Hide the title bar.
   * <br>**false**: Show the title bar.
   * @param { boolean } animated
   * <br>Default value: **false**.
   * <br>**true**: Animate the visibility change.
   * <br>**false**: Do not animate the visibility change.
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 13 dynamic
   */
  hideTitleBar(hide: boolean, animated: boolean): NavDestinationAttribute;

  /**
   * Sets whether to hide the back button in the title bar.
   *
   * @param { Optional<boolean> } hide
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  hideBackButton(hide: Optional<boolean>): NavDestinationAttribute;

  /**
   * Called when the navigation destination page is displayed.
   *
   * @param { function } callback - Indicates callback when the navDestination page is displayed.
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the navigation destination page is displayed.
   *
   * @param { function } callback - Indicates callback when the navDestination page is displayed.
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Called when the navigation destination page is displayed.
   *
   * @param { Callback<VisibilityChangeReason> } callback - Indicates callback when the navDestination page is displayed.
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 21 dynamic
   */
  onShown(callback: Callback<VisibilityChangeReason>): NavDestinationAttribute;

  /**
   * Called when the navigation destination page is hidden.
   *
   * @param { function } callback - Indicates callback when the navDestination is hidden.
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the navigation destination page is hidden.
   *
   * @param { function } callback - Indicates callback when the navDestination is hidden.
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Called when the navigation destination page is hidden.
   *
   * @param { Callback<VisibilityChangeReason> } callback - Indicates callback when the navDestination is hidden.
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 21 dynamic
   */
  onHidden(callback: Callback<VisibilityChangeReason>): NavDestinationAttribute;

  /**
   * Called when the navigation destination is about
   * to be unmounted (or when the transition animation, if any, is about to start).
   *
   * @param { function } callback - Indicates callback when the backButton is pressed.
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the navigation destination is about
   * to be unmounted (or when the transition animation, if any, is about to start).
   *
   * @param { function } callback - Indicates callback when the backButton is pressed.
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  onBackPressed(callback: () => boolean): NavDestinationAttribute;

  /**
   * Triggered when popping back from other NavDestination.
   * 
   * @param {Optional<Callback<ESObject>>} callback - Indicates callback when pop to the navDestination with result.
   * @returns {NavDestinationAttribute}
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  onResult(callback: Optional<Callback<ESObject>>): NavDestinationAttribute;

  /**
   * Sets the mode of the **NavDestination** component. Dynamic modification is not supported.
   *
   * @param { NavDestinationMode } value - Mode of the **NavDestination** component.
   * <br>Default value: **NavDestinationMode.STANDARD**.
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Sets the mode of the **NavDestination** component. Dynamic modification is not supported.
   *
   * @param { NavDestinationMode } value - NavDestinationMode
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  mode(value: NavDestinationMode): NavDestinationAttribute;

  /**
   * Sets the icon of the back button on the title bar.
   *
   * @param { ResourceStr | PixelMap } value - Icon of the back button in the title bar.
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Sets the icon of the back button on the title bar.
   * 
   * <p>**NOTE**:
   * <br>The following are not allowed: modify the icon size through the **fontSize** attribute of the
   * **SymbolGlyphModifier** object, change the animation effects through the **effectStrategy** attribute,
   * or change the type of animation effects through the **symbolEffect** attribute.
   * </p>
   *
   * @param { ResourceStr | PixelMap | SymbolGlyphModifier } value - Icon of the back button in the title bar.
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  backButtonIcon(value: ResourceStr | PixelMap | SymbolGlyphModifier): NavDestinationAttribute;

  /**
   * Sets the icon and accessibility text for the back button on the title bar.
   *
   * <p>**NOTE**:
   * <br>The following are not allowed: modify the icon size through the **fontSize** attribute of the
   * **SymbolGlyphModifier** object, change the animation effects through the **effectStrategy** attribute,
   * or change the type of animation effects through the **symbolEffect** attribute.
   * </p>
   *
   * @param { ResourceStr | PixelMap | SymbolGlyphModifier } icon - Icon of the back button on the title bar.
   * @param { ResourceStr } [accessibilityText] - Accessibility text for the back button.
   * <br>Default value: **back** when the system language is English.
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  backButtonIcon(icon: ResourceStr | PixelMap | SymbolGlyphModifier, accessibilityText?: ResourceStr): NavDestinationAttribute;

  /**
   * Sets the menu items in the upper right corner of the page.
   * If this attribute is not set, no menu item is displayed.
   * When the value type is Array<NavigationMenuItem&gt;,
   * the menu shows a maximum of three icons in portrait mode and a maximum of five icons in landscape mode,
   * with excess icons (if any) placed under the automatically generated **More** icon.
   * 
   * <p>**NOTE**:
   * <br>he following are not allowed: modify the icon size through the **fontSize** attribute of
   * the **SymbolGlyphModifier** object, change the animation effects through the **effectStrategy** attribute,
   * or change the type of animation effects through the **symbolEffect** attribute.
   * </p>
   * @param { Array<NavigationMenuItem> | CustomBuilder } value - Menu items in the upper right corner of the NavDestination.
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  menus(value: Array<NavigationMenuItem> | CustomBuilder): NavDestinationAttribute;

  /**
   * NavDestination title bar's menus
   *
   * @param { Array<NavigationMenuItem> | CustomBuilder } items
   * @param { NavigationMenuOptions } [options] - Indicates the options of menu.
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  menus(items: Array<NavigationMenuItem> | CustomBuilder, options?: NavigationMenuOptions): NavDestinationAttribute;

  /**
    * Sets the content of the toolbar. If this API is not called, the toolbar remains hidden.
    *
    * @param { Array<ToolbarItem> | CustomBuilder } toolbarParam - Content of the toolbar.
    * <br>When configured with Array&lt;ToolbarItem&gt;,
    * the toolbar follows the rules below:<br>- Toolbar items are evenly distributed on the bottom toolbar,
    * with text and icons evenly spaced in each content area.<br>- If any item contains overlong text and
    * there are fewer than five items, the toolbar will: 1. Increase the item width to accommodate the text
    * until the toolbar spans the screen width; 2. Reduce the text size progressively; 3. Wrap the text over two lines;
    *  4. Clip the text with an ellipsis (...).<br>- In portrait mode, the toolbar shows a maximum of five icons,
    * with any additional icons placed under an automatically generated **More** icon. In landscape mode,
    * the behavior of the toolbar is determined by the display mode: (1) If the display mode is
    * Split, the toolbar follows the same rules as in portrait mode. (2) If the display mode is Stack,
    * the toolbar must be used together with Array&lt;NavigationMenuItem&gt; of the **menus** attribute;
    * in this configuration, the bottom toolbar is automatically hidden, and all items on the toolbar are relocated to
    * the menu in the upper right corner of the screen.<br>When configured with CustomBuilder, the toolbar does not
    * follow the above rules, except for evenly distributing items at the bottom of the toolbar.
    * 
    * @param { NavigationToolbarOptions } [options] - Indicates the options of toolbar.
    * @returns { NavDestinationAttribute }
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 13 dynamic
    */
  toolbarConfiguration(toolbarParam: Array<ToolbarItem> | CustomBuilder, options?: NavigationToolbarOptions): NavDestinationAttribute;

  /**
   * Sets whether to hide the toolbar and whether to animate the visibility change.
   *
   * @param { boolean } hide - Whether to hide the toolbar.
   * Default value: **false**.
   * **true**: Hide the toolbar.
   * **false**: Show the toolbar.
   * @param { boolean } [animated] - Whether to animate the visibility change.
   * Default value: **false**
   * **true**: Animate the visibility change.
   * **false**: Do not animate the visibility change.
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 13 dynamic
   */
  hideToolBar(hide: boolean, animated?: boolean): NavDestinationAttribute;

  /**
   * Called when the **NavDestination** component is about to build a child component.
   *
   * @param { import('../../../api/@ohos.base').Callback<NavDestinationContext> } callback
   * - Indicates callback that invoked before sub-components of NavDestination are created.
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  onReady(callback: import('../../../api/@ohos.base').Callback<NavDestinationContext>): NavDestinationAttribute;

  /**
   * Called when the navigation destination is about to be mounted.
   * You can change the navigation stack in this callback function, and the change takes effect in the current frame.
   *
   * @param { Callback<void> } callback - Indicates callback before the navDestination is appeared.
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onWillAppear(callback: Callback<void>): NavDestinationAttribute;

  /**
   * Called when the navigation destination is about to be unmounted (or when the transition animation,
   * if any, is about to start).
   *
   * @param { Callback<void> } callback - Indicates callback before the navDestination is disappeared.
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onWillDisappear(callback: Callback<void>): NavDestinationAttribute;

  /**
   * Called when the navigation destination is about to be displayed.
   *
   * @param { Callback<void> } callback - Indicates callback before the navDestination is displayed.
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onWillShow(callback: Callback<void>): NavDestinationAttribute;

  /**
   * Called when the navigation destination is about to be hidden.
   *
   * @param { Callback<void> } callback - Indicates callback before the navDestination is hidden.
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onWillHide(callback: Callback<void>): NavDestinationAttribute;

  /**
   * Ignores the layout safe area by allowing the component to extend into the non-safe areas of the screen.
   *
   * @param { Array<LayoutSafeAreaType> } [types] - ypes of non-safe areas to extend into.
   * Default value:<br>[LayoutSafeAreaType.SYSTEM].
   * @param { Array<LayoutSafeAreaEdge> } [edges] - Edges for expanding the safe area.
   * Default value:<br>[LayoutSafeAreaEdge.TOP, LayoutSafeAreaEdge.BOTTOM].
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  ignoreLayoutSafeArea(types?: Array<LayoutSafeAreaType>, edges?: Array<LayoutSafeAreaEdge>): NavDestinationAttribute;

  /**
   * Sets the style of the system status bar
   * when this **NavDestination** page is displayed in the **Navigation** component.
   *
   * <p>**NOTE**:
   * <br>1. The setting takes effect only when the **NavDestination** component is used
   * in conjunction with the **Navigation** component.
   * <br>2. For other usage restrictions, see the description of systemBarStylefor the **Navigation** component.
   * </p>
   * @param { Optional<SystemBarStyle> } style - Style of the system status bar.
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  systemBarStyle(style: Optional<SystemBarStyle>): NavDestinationAttribute;

  /**
   * Sets whether the **NavDestination** component is recoverable.
   * If set to recoverable, when the application process exits unexpectedly and restarts,
   * the **NavDestination** component will be automatically recreated. To use this feature,
   * ensure that the **recoverable** attribute is set for the **Navigation** component associated
   * with the **NavDestination** component.
   *
   * <p>**NOTE**:
   * <br>This API must be used together with
   * the recoverable API of **Navigation**.
   * </p>
   * @param { boolean } recoverable - Whether the **NavDestination** component is recoverable.
   * By default, it is not recoverable.
   * Default value: **false**.
   * **true**: The **NavDestination** component is recoverable.
   * **false**: The **NavDestination** component is not recoverable.
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 14 dynamic
   */
  recoverable(recoverable: Optional<boolean>): NavDestinationAttribute;

  /**
   * Sets the system transition animation of the **NavDestination** component.
   * System transition animations for the title bar and content area can be configured separately.
   *
   * @param { NavigationSystemTransitionType } type - Type of the system transition animation.
   * Default value: **NavigationSystemTransitionType.DEFAULT**.
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 14 dynamic
   */
  systemTransition(type: NavigationSystemTransitionType): NavDestinationAttribute;

  /**
   * Binds the **NavDestination** component with a scrollable container, which can be a List, Scroll,
   * or WaterFlow component. This way, scrolling in the scrollable container triggers
   * the display and hide animations of the title bar and toolbar of all **NavDestination** components that are bound
   * to it – scrolling up triggers the hide animation, and scrolling down triggers the show animation. 
   * A single **NavDestination** component can be bound to multiple scrollable containers,
   * and a single scrollable container can be bound to multiple **NavDestination** components.
   * 
   * <p>**NOTE**:
   * <br>The connection between the scrolling actions and the animations for showing or hiding the title bar
   * and toolbar of the **NavDestination** component takes effect only when the title bar or toolbar is visible.
   * If a **NavDestination** component is bound to multiple scrollable containers, scrolling in any of these containers
   * triggers the display or hiding animations of the title bar and toolbar. Specifically, when any scrollable
   * container reaches either the bottom or the top, the display animation for the title bar and
   * toolbar is triggered without delay. As such, to ensure the optimal user experience,
   * avoid triggering scroll events of multiple scrollable containers simultaneously.
   * </p>
   * 
   * @param { Array<Scroller> } scrollers - Controller of the target scrollable container.
   * @returns { NavDestinationAttribute } Returns the instance of the NavDestinationAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 14 dynamic
   */
  bindToScrollable(scrollers: Array<Scroller>): NavDestinationAttribute;

  /**
   * Binds the **NavDestination** component with a nested scrollable container,
   * which can be a List, Scroll, Grid, or WaterFlow component. This way, scrolling in the scrollable container 
   * triggers the display and hide animations of the title bar and toolbar of all **NavDestination** components that
   * are bound to it – scrolling up triggers the hide animation, and scrolling down triggers the show animation. 
   * A single **NavDestination** component can be bound to multiple nested scrollable containers, and a single nested
   * scrollable container can be bound to multiple **NavDestination** components.
   * 
   * <p>**NOTE**:
   * The connection between the scrolling actions and the animations for showing or hiding the title bar
   * <br>and toolbar of the **NavDestination** component takes effect only when the title bar or toolbar is visible.
   * If a **NavDestination** component is bound to multiple scrollable containers, scrolling in any of these containers
   * <br>triggers the display or hiding animations of the title bar and toolbar. Specifically, when any scrollable
   * <br>container reaches either the bottom or the top, the display animation for the title bar and
   * <br>toolbar is triggered without delay. As such, to ensure the optimal user experience,
   * <br>avoid triggering scroll events of multiple scrollable containers simultaneously.
   * </p>
   * 
   * @param { Array<NestedScrollInfo> } scrollInfos - Controller of the target nested scrollable containers.

   * @returns { NavDestinationAttribute } Returns the instance of the NavDestinationAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 14 dynamic
   */
  bindToNestedScrollable(scrollInfos: Array<NestedScrollInfo>): NavDestinationAttribute;

  /**
   * Triggered when the **NavDestination** component becomes active (on top of the stack and operable,
   * with no special components blocking it).
   *
   * @param { Optional<Callback<NavDestinationActiveReason>> } callback - Reason why the **NavDestination** component
   * switches from inactive to active.
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 17 dynamic
   */
  onActive(callback: Optional<Callback<NavDestinationActiveReason>>): NavDestinationAttribute;

  /**
   * Triggered when **NavDestination** component becomes inactive
   * (not on top of the stack and inoperable, or on top but blocked by special components).
   *
   * @param { Optional<Callback<NavDestinationActiveReason>> } callback - Reason why the **NavDestination** component
   * switches from active to inactive.
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 17 dynamic
   */
  onInactive(callback: Optional<Callback<NavDestinationActiveReason>>): NavDestinationAttribute;

  /**
   * Sets a custom transition animation for the **NavDestination** component.
   * 
   * <p>**NOTE**:
   * <br>If both this attribute and systemTransition are set, whichever is set later takes effect.
   * </p>
   * @param { NavDestinationTransitionDelegate } delegate - Delegate function for custom animations of
   * the **NavDestination** component.
   * @returns { NavDestinationAttribute } Returns the instance of the NavDestinationAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  customTransition(delegate: NavDestinationTransitionDelegate): NavDestinationAttribute;

  /**
   * Triggered when a **NavDestination** page that already exists in the stack is moved to the top using
   * launchMode.MOVE_TO_TOP_SINGLETON or launchMode.POP_TO_SINGLETON.
   * 
   * <p>**NOTE**:
   * <br>This callback is not triggered by replacePath or replaceDestination.
   * </p>
   * @param { Optional<Callback<ESObject>> } callback - Callback triggered by **onNewParam**, with the parameter
   * being the data passed to the target page during navigation.
   * @returns { NavDestinationAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  onNewParam(callback: Optional<Callback<ESObject>>): NavDestinationAttribute;

  /**
   * Sets the display orientation for the **NavDestination** component. After the transition to the NavDestination, 
   * the system also switches the application's main window to the specified display orientation.
   * 
   * <p>**NOTE**:
   * <br>This attribute is effective only if the following conditions are all met:
   * <br>1. The **NavDestination** component belongs to the application's main window page,
   * and the main window is a full-screen window.
   * <br>2. The size of the **Navigation** container to which the **NavDestination** component belongs occupies
   * the entire application page.
   * <br>3. The type of **NavDestination** is STANDARD.
   * The actual effect of setting the display orientation depends on the specific device support.
   * </p>
   * 
   * @param { Optional<Orientation> } orientation - Display orientation to set.
   * @returns { NavDestinationAttribute } Returns the instance of the NavDestinationAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  preferredOrientation(orientation: Optional<Orientation>): NavDestinationAttribute;

  /**
   * Sets whether to show or hide the system status bar when entering this **NavDestination** component.
   * 
   * <p>**NOTE**:
   * <br>This attribute is effective only if the following conditions are all met:
   * <br>1. The **NavDestination** component belongs to the application's main window page, and the main window is a
   * full-screen window.
   * <br>2. The size of the **Navigation** container to which the **NavDestination** component belongs
   * occupies the entire application page.
   * <br>3. The size of the **NavDestination** component occupies the entire **Navigation** container.
   * <br>4. The type of **NavDestination** is  STANDARD.
   * The actual effect of setting the system status bar depends on the specific device support.
   * </p>
   * @param { Optional<boolean> } enabled - Whether to show or hide the system status bar when entering the current
   * <br>**NavDestination** component.
   * @param { boolean } [animated] - Whether to use an animation to show or hide the system status bar.
   * <br>Default value: **false**.
   * <br>**true**: Hide/show the system status bar with animation.
   * <br>**false**: Hide/show the system status bar without animation.
   * @returns { NavDestinationAttribute } Returns the instance of the NavDestinationAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  enableStatusBar(enabled: Optional<boolean>, animated?: boolean): NavDestinationAttribute;

  /**
   * Sets whether to show or hide the system navigation bar when entering this **NavDestination** component.
   * 
   * <p>**NOTE**
   * This attribute is effective only if the following conditions are all met:
   * 1. The **NavDestination** component belongs to the application's main window page,
   * <br>and the main window is a full-screen window.
   * 2. The size of the **Navigation** container to which the **NavDestination** component
   * <br>belongs occupies the entire application page.
   * 3. The size of the **NavDestination** component occupies the entire **Navigation** container.
   * 4. The type of **NavDestination** is STANDARD.
   * The actual effect of setting the system navigation bar depends on the specific device support.
   * </p>
   * @param { Optional<boolean> } enabled - Whether to show or hide the system navigation bar
   * when entering the current **NavDestination** component.
   * @returns { NavDestinationAttribute } Returns the instance of the NavDestinationAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  enableNavigationIndicator(enabled: Optional<boolean>): NavDestinationAttribute;
}

/**
 * Defines NavDestination Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Defines NavDestination Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines NavDestination Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare const NavDestination: NavDestinationInterface;

/**
 * Defines NavDestination Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Defines NavDestination Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines NavDestination Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare const NavDestinationInstance: NavDestinationAttribute;

/**
 * Defines the delegate function for custom transition animations of the **NavDestination** component.
 *
 * @typedef { function } NavDestinationTransitionDelegate
 * @param { NavigationOperation } operation - Type of navigation operation for the current page transition.
 * @param { boolean } isEnter - Whether the current page is an entry page.
 * <br>**true**: The current page is an entry page.
 * <br>**false**: The current page is not an entry page.
 * @returns { Array<NavDestinationTransition> | undefined } Array of custom animations for the **NavDestination** page.
 * <br>If **undefined** is returned, the default system animation is used.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 15 dynamic
 */
declare type NavDestinationTransitionDelegate =
  (operation: NavigationOperation, isEnter: boolean) => Array<NavDestinationTransition> | undefined;