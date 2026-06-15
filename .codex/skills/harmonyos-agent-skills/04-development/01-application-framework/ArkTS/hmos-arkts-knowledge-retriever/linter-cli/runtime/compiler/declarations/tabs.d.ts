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
 * CommonModifier
 *
 * @typedef { import('../../../api/arkui/CommonModifier').CommonModifier } CommonModifier
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 15 dynamic
 */
declare type CommonModifier = import('../../../api/arkui/CommonModifier').CommonModifier;

/**
 * Declare the graphic format of the bar chart.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Declare the graphic format of the bar chart.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Declare the graphic format of the bar chart.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare enum BarMode {
  /**
   * The actual layout width of the TabBar is used. If the width exceeds the total width, you can slide the tabbar.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * The actual layout width of the TabBar is used. If the width exceeds the total width, you can slide the tabbar.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * The width of each tab is determined by the actual layout. The tabs are scrollable in the following case:
   * In horizontal layout, the total width exceeds the tab bar width; in vertical layout,
   * the total height exceeds the tab bar height.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  Scrollable = 0,

  /**
   * The width of all TabBars is evenly allocated.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * The width of all TabBars is evenly allocated.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * The width of each tab is determined by equally dividing the number of tabs by the bar width
   * (or bar height in the vertical layout).
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  Fixed = 1
}

/**
 * Declare the animation mode of tab content.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare enum AnimationMode {
  /**
   * Load the content of the target page before starting the switching animation.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  CONTENT_FIRST = 0,

  /**
   * Start the switching animation before loading the content of the target page.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  ACTION_FIRST = 1,

  /**
   * Disable the default switching animation.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  NO_ANIMATION = 2,

  /**
   * Load the content of the target page first, then jump to the vicinity of the target page without animation,
   * and finally jump to the target page with animation.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  CONTENT_FIRST_WITH_JUMP = 3,

  /**
   * Jump to the vicinity of the target page without animation first, 
   * then jump to the target page with animation, and finally load the content of the target page.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  ACTION_FIRST_WITH_JUMP = 4,
}

/**
 * Declare the location of the bar chart.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Declare the location of the bar chart.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Declare the location of the bar chart.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare enum BarPosition {
  /**
   * When the vertical attribute method is set to true, the tab is on the left of the container. When the vertical property method is set to false, the tab is at the top of the container.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * When the vertical attribute method is set to true, the tab is on the left of the container. When the vertical property method is set to false, the tab is at the top of the container.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * When the vertical attribute method is set to true, the tab is on the left of the container. When the vertical property method is set to false, the tab is at the top of the container.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  Start,

  /**
   * When the vertical attribute method is set to true, the tab is located on the right of the container. When the vertical property method is set to false, the tab is at the bottom of the container.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * When the vertical attribute method is set to true, the tab is located on the right of the container. When the vertical property method is set to false, the tab is at the bottom of the container.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * When the vertical attribute method is set to true, the tab is located on the right of the container. When the vertical property method is set to false, the tab is at the bottom of the container.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  End,
}

/**
 * Declare the layout style of the tab bar items.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Declare the layout style of the tab bar items.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare enum LayoutStyle {
  /**
   * The tab bar items are laid in the center of the tab bar.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * If the tab content exceeds the tab bar width, the tabs are scrollable.
   * If not, the tabs are compactly centered on the tab bar and not scrollable.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  ALWAYS_CENTER = 0,
  /**
   * The tab bar items are laid in the tab bar by an average split.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * If the tab content exceeds the tab bar width, the tabs are scrollable.
   * If not, the tabs are not scrollable, and the width of the tab bar is evenly distributed among all tabs.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  ALWAYS_AVERAGE_SPLIT = 1,
  /**
   * The tab bar items are laid in the center of the bar when their total length is more than half of the tab bar.
   * Otherwise, they are laid in the center half of the tab bar with the same space between them. 
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * If the tab content exceeds the tab bar width, the tabs are scrollable. If the tab content exceeds
   * half the width of the tab bar but is still within the tab bar width, the tabs are compactly centered and
   * not scrollable.If the tab content does not exceed half the width of the tab bar, the tabs are centered within
   * half the width of the tab bar with even spacing between them and are not scrollable.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  SPACE_BETWEEN_OR_CENTER = 2
} 

/**
 * Declare the cache mode of the child components.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 19 dynamic
 */
declare enum TabsCacheMode {
  /**
   * Caches the child components on both sides of the current child components.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  CACHE_BOTH_SIDE = 0,

  /**
   * Caches the latest switched child components.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  CACHE_LATEST_SWITCHED = 1
}

/**
 * Tabs nested scroll nested mode
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @stagemodelonly
 * @crossplatform
 * @atomicservice
 * @since 24 dynamic
 */
declare enum TabsNestedScrollMode {
  /**
   * The scrolling is contained within the Tabs component, and no scroll chaining occurs, that is,
   * the parent container does not scroll when the component scrolling reaches the boundary.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 24 dynamic
   */
  SELF_ONLY = 0,
  /**
   * The Tabs component scrolls first, and when it hits the boundary, the parent container scrolls.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 24 dynamic
   */
  SELF_FIRST = 1,
}

/**
 * Provides methods for switching tabs.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Provides methods for switching tabs.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provides methods for switching tabs.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare class TabsController {
  /**
   * constructor.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * constructor.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * constructor.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  constructor();

  /**
   * Called when the tab is switched.
   *
   * @param { number } value
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the tab is switched.
   *
   * @param { number } value
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Switches to the specified tab.
   *
   * @param { number } value - Index of the tab. If this parameter is set to a value less than 0 
   * or greater than the maximum number, the default value 0 is used.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  changeIndex(value: number): void;

  /**
   * Called when need to preload specified tab content.
   *
   * @param { Optional<Array<number>> } indices - Indices of tab content to be preloaded, default to an empty array.
   * @returns { Promise<void> } The promise returned by the function.
   * @throws { BusinessError } 401 - Parameter invalid. Possible causes:
   * <br> 1. The parameter type is not Array<number>.
   * <br> 2. The parameter is an empty array.
   * <br> 3. The parameter contains an invalid index.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  preloadItems(indices: Optional<Array<number>>): Promise<void>;

  /**
   * Set tab bar translate.
   *
   * @param { TranslateOptions } translate - translate options
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 13 dynamic
   */
  setTabBarTranslate(translate: TranslateOptions): void;

  /**
   * Set tab bar opacity.
   *
   * @param { number } opacity - opacity, default to 1.0
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 13 dynamic
   */
  setTabBarOpacity(opacity: number): void;
}

/**
 * Options used to create Tabs.
 *
 * @typedef TabsOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 15 dynamic
 */
declare interface TabsOptions {
  /**
   * Set the tab location for Tabs.
   *
   * @type { ?BarPosition }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Set the tab location for Tabs.
   *
   * @type { ?BarPosition }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set the tab location for Tabs.
   *
   * @type { ?BarPosition }
   * @default BarPosition.Start
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  barPosition?: BarPosition;

  /**
   * Set the index of the currently displayed tab.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Set the index of the currently displayed tab.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set the index of the currently displayed tab.
   *
   * @type { ?number }
   * @default 0
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  index?: number;

  /**
   * Set the Tabs controller.
   *
   * @type { ?TabsController }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Set the Tabs controller.
   *
   * @type { ?TabsController }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set the Tabs controller.
   *
   * @type { ?TabsController }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  controller?: TabsController;

  /**
   * Set common attributes to tabbar.
   *
   * @type { ?CommonModifier }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  barModifier?: CommonModifier
}

/**
 * Provides an interface for switching views.
 *
 * @interface TabsInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Provides an interface for switching views.
 *
 * @interface TabsInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provides an interface for switching views.
 *
 * @interface TabsInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
interface TabsInterface {
  /**
   * Called when the view is switched.
   *
   * @param { object } value
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the view is switched.
   *
   * @param { object } value
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the view is switched.
   *
   * @param { object } value
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Called when the view is switched.
   *
   * @param { TabsOptions } [options] - Tabs options.
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  (options?: TabsOptions): TabsAttribute;
}

/**
 * Provides an interface for the style of an divider including stroke width, color, start margin
 * and end margin
 *
 * @interface DividerStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provides an interface for the style of an divider including stroke width, color, start margin
 * and end margin
 *
 * @interface DividerStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
interface DividerStyle {
  /**
   * Define the stroke width of the divider
   *
   * @type { Length }
   * @default 0
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Width of the divider. It cannot be set in percentage.
   *
   * @type { Length }
   * @default 0vp
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  strokeWidth: Length;

  /**
   * Define the color of the divider
   *
   * @type { ?ResourceColor }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Color of the divider.
   *
   * @type { ?ResourceColor }
   * @default #33182431
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  color?: ResourceColor;

  /**
   * Define the start margin of the divider
   *
   * @type { ?Length }
   * @default 0
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Distance between the divider and the top of the sidebar. It cannot be set in percentage.
   *
   * @type { ?Length }
   * @default 0vp
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  startMargin?: Length;

  /**
   * Define the end margin of the divider
   *
   * @type { ?Length }
   * @default 0
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Distance between the divider and the bottom of the sidebar. It cannot be set in percentage.
   *
   * @type { ?Length }
   * @default 0vp
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  endMargin?: Length;
}

/**
 * Provides an interface for tabs animation.
 *
 * @interface TabsAnimationEvent
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Provides an interface for tabs animation.
 *
 * @interface TabsAnimationEvent
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface TabsAnimationEvent {
  /**
   * Offset of the current page to the start position of the tabs main axis. The unit is vp.
   *
   * @type { number }
   * @default 0.0 vp
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Offset of the current page to the start position of the tabs main axis. The unit is vp.
   *
   * @type { number }
   * @default 0.0 vp
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  currentOffset: number;

  /**
   * Offset of the target page to the start position of the tabs main axis. The unit is vp.
   *
   * @type { number }
   * @default 0.0 vp
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Offset of the target page to the start position of the tabs main axis. The unit is vp.
   *
   * @type { number }
   * @default 0.0 vp
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  targetOffset: number;

  /**
   * Start speed of the page-turning animation. The unit is vp/s.
   *
   * @type { number }
   * @default 0.0 vp/s
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Start speed of the page-turning animation. The unit is vp/s.
   *
   * @type { number }
   * @default 0.0 vp/s
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  velocity: number;
}

/**
 * Provides an interface for the grid column options of an tab bar including sm, md, lg, margin and gutter.
 *
 * @interface BarGridColumnOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provides an interface for the grid column options of an tab bar including sm, md, lg, margin and gutter.
 *
 * @interface BarGridColumnOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
interface BarGridColumnOptions {
  /**
   * Define the occupied column number when the screen is of small size
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Number of columns occupied by a tab on a screen whose width is 
   * greater than or equal to 320 vp but less than 600 vp. The value must be a non-negative even number.
   *
   * @type { ?number }
   * @default -1
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  sm?: number;

  /**
   * Define the occupied column number when the screen is of middle size
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Number of columns occupied by a tab on a screen whose width is 
   * greater than or equal to 600 vp but less than 800 vp. The value must be a non-negative even number.
   *
   * @type { ?number }
   * @default -1
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  md?: number;

  /**
   * Define the occupied column number when the screen is of large size
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Number of columns occupied by a tab on a screen whose width is 
   * greater than or equal to 840 vp but less than 1024 vp. The value must be a non-negative even number.
   *
   * @type { ?number }
   * @default -1
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  lg?: number;

  /**
   * Define the margin size of the columns
   *
   * @type { ?Dimension }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Column margin in grid mode. It cannot be set in percentage.
   *
   * @type { ?Dimension }
   * @default 24vp
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  margin?: Dimension;

  /**
   * Define the gutter size of the columns
   *
   * @type { ?Dimension }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Column gutter (that is, gap between columns) in grid mode. It cannot be set in percentage.
   *
   * @type { ?Dimension }
   * @default 24vp
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  gutter?: Dimension;
}

/**
 * Provides an interface for the options for the scrollable bar mode including margin and nonScrollableLayoutStyle.
 *
 * @interface ScrollableBarModeOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provides an interface for the options for the scrollable bar mode including margin and nonScrollableLayoutStyle.
 *
 * @interface ScrollableBarModeOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
interface ScrollableBarModeOptions {
  /**
   * Define the margin size of the bar items when the tab bar is scrollable.
   *
   * @type { ?Dimension }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Left and right margin of the tab bar in scrollable mode. It cannot be set in percentage.
   *
   * @type { ?Dimension }
   * @default 0vp
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  margin?: Dimension;

  /**
   * Define the layout style of the bar items when the tab bar is not scrollable.
   *
   * @type { ?LayoutStyle }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Tab layout mode of the tab bar when not scrolling in scrollable mode.
   *
   * @type { ?LayoutStyle }
   * @default LayoutStyle.ALWAYS_CENTER
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  nonScrollableLayoutStyle?: LayoutStyle;
}

/**
 * Defines a tabs callback when onAnimationStart.
 *
 * @typedef { function } OnTabsAnimationStartCallback
 * @param { number } index - The index value of the tab that when animation start.
 * @param { number } targetIndex - The target index value of the tab that when animation start.
 * @param { TabsAnimationEvent } extraInfo - The extra callback info.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
declare type OnTabsAnimationStartCallback = (index: number, targetIndex: number, extraInfo: TabsAnimationEvent) => void;

/**
 * Defines a tabs callback when onAnimationEnd.
 *
 * @typedef { function } OnTabsAnimationEndCallback
 * @param { number } index - The index value of the tab that when animation end.
 * @param { TabsAnimationEvent } extraInfo - The extra callback info.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
declare type OnTabsAnimationEndCallback = (index: number, extraInfo: TabsAnimationEvent) => void;

/**
 * Defines a tabs callback when onGestureSwipe.
 *
 * @typedef { function } OnTabsGestureSwipeCallback
 * @param { number } index - The index value of the tab before gesture swipe.
 * @param { TabsAnimationEvent } extraInfo - The extra callback info.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
declare type OnTabsGestureSwipeCallback = (index: number, extraInfo: TabsAnimationEvent) => void;

/**
 * Defines a tabs callback when customContentTransition.
 *
 * @typedef { function } TabsCustomContentTransitionCallback
 * @param { number } from - The index value of the current tab when the animation begins.
 * @param { number } to - The index value of the target tab when the animation begins.
 * @returns { TabContentAnimatedTransition | undefined } Returns animated transition options of tab or undefined.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
declare type TabsCustomContentTransitionCallback = (from: number, to: number) => TabContentAnimatedTransition | undefined;

/**
 * Defines a tabs callback when onContentWillChange.
 *
 * @typedef { function } OnTabsContentWillChangeCallback
 * @param { number } currentIndex - The index value of the current tab.
 * @param { number } comingIndex - The index value of the tab that will change.
 * @returns { boolean }
 * Tabs can change from currentIndex to comingIndex if function return true.
 * Tabs can not change from currentIndex to comingIndex if function return false.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
declare type OnTabsContentWillChangeCallback = (currentIndex: number, comingIndex: number) => boolean;

/**
 * Defines a tabs callback when onContentDidScroll.
 *
 * @typedef { function } OnTabsContentDidScrollCallback
 * @param { number } selectedIndex - the index value of the Tabs content selected before animation start.
 * @param { number } index - the index value of the Tabs content.
 * @param { number } position - the moving ratio of the Tabs content from the start position of the Tabs main axis.
 * @param { number } mainAxisLength - the Tabs main axis length for calculating position.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 23 dynamic
 */
declare type OnTabsContentDidScrollCallback = (selectedIndex: number, index: number, position: number, mainAxisLength: number) => void;

/**
 * Defines the tabs attribute functions.
 *
 * @extends CommonMethod<TabsAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the tabs attribute functions.
 *
 * @extends CommonMethod<TabsAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the tabs attribute functions.
 *
 * @extends CommonMethod<TabsAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare class TabsAttribute extends CommonMethod<TabsAttribute> {
  /**
   * Called when determining whether the tab is vertical.
   *
   * @param { boolean } value
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when determining whether the tab is vertical.
   *
   * @param { boolean } value
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets whether to use vertical tabs.
   *
   * @param { boolean } value - Whether to use vertical tabs. Default value is false.
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  vertical(value: boolean): TabsAttribute;

  /**
   * Called when determining the location of the bar chart.
   *
   * @param { BarPosition } value
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Called when determining the location of the bar chart.
   *
   * @param { BarPosition } value
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the position of the Tabs component.
   *
   * @param { BarPosition } value - Position of the Tabs component. Default value is BarPosition.Start.
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  barPosition(value: BarPosition): TabsAttribute;

  /**
   * Called when judging whether page switching can be performed by sliding left and right.
   *
   * @param { boolean } value
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when judging whether page switching can be performed by sliding left and right.
   *
   * @param { boolean } value
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets whether the tabs are scrollable.
   *
   * @param { boolean } value - Whether the tabs are scrollable. Default value is true.
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  scrollable(value: boolean): TabsAttribute;

  /**
   * Called when the graphic format of the bar chart is selected as fixed mode.
   *
   * @param { BarMode.Fixed } value
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the tab bar layout mode to BarMode.Fixed.
   *
   * @param { BarMode.Fixed } value - The width of each tab is determined by equally dividing 
   * the number of tabs by the bar width (or bar height in the vertical layout).
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  barMode(value: BarMode.Fixed): TabsAttribute;

  /**
   * Called when the graphic format of the bar chart is selected as scrollable mode.
   *
   * @param { BarMode.Scrollable } value
   * @param { ScrollableBarModeOptions } [options] - options indicate the options for the scrollable bar mode
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the tab bar layout mode to BarMode.Scrollable.
   *
   * @param { BarMode.Scrollable } value - The width of each tab is determined by the actual layout. 
   * The tabs are scrollable in the following case: In horizontal layout, the total width exceeds the tab bar width;
   * in vertical layout, the total height exceeds the tab bar height.
   * @param { ScrollableBarModeOptions } [options] - Layout style of the tab bar in scrollable mode.
   * This parameter is effective only when the tab bar is in scrollable mode.
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  barMode(value: BarMode.Scrollable, options: ScrollableBarModeOptions): TabsAttribute;

  /**
   * Called when the graphic format of the bar chart is selected.
   *
   * @param { BarMode } value
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the graphic format of the bar chart is selected.
   *
   * @param { BarMode } value
   * @param { ScrollableBarModeOptions } [options] - options indicate the options for the scrollable bar mode
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the tab bar layout mode.
   *
   * @param { BarMode } value - Layout mode. Default value is BarMode.Fixed.
   * @param { ScrollableBarModeOptions } [options] - Layout style of the tab bar in scrollable mode.
   * This parameter is effective only when the tab bar is in horizontal scrollable mode.
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  barMode(value: BarMode, options?: ScrollableBarModeOptions): TabsAttribute;

  /**
   * Called when the width of the bar graph is set.
   * Notice: barWidth only supports Number type.
   *
   * @param { number } value
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the width of the bar graph is set.
   * Notice: barWidth only supports Number type on 7, supports Length type since 8.
   *
   * @param { Length } value
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Called when the width of the bar graph is set.
   * Notice: barWidth only supports Number type on 7, supports Length type since 8.
   *
   * @param { Length } value
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the width of the tab bar.
   * Notice: barWidth only supports Number type on 7, supports Length type since 8.
   *
   * @param { Length } value - Width of the tab bar. If the set value is less than 0 
   * or greater than the width of the Tabs component, the default value is used.
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  barWidth(value: Length): TabsAttribute;

  /**
   * Called when the height of the bar graph is set.
   * Notice: barHeight only supports Number type.
   *
   * @param { number } value
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the height of the bar graph is set.
   * Notice: barHeight only supports Number type on 7, supports Length type since 8.
   *
   * @param { Length } value
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Called when the height of the bar graph is set.
   * Notice: barHeight only supports Number type on 7, supports Length type since 8.
   *
   * @param { Length } value
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the height of the tab bar. 
   * Notice: barHeight only supports Number type on 7, supports Length type since 8.
   *
   * @param { Length } value - Height of the tab bar. If the set value is less than 0 or
   * greater than the height of the Tabs component, the default value is used.
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  barHeight(value: Length): TabsAttribute;

    /**
   * Called when the height of the bar graph is set.
   * Notice: barHeight only supports Number type on 7, supports Length type since 8.
   *
   * @param { Length } height - the height of the tabBar.
   * @param { boolean } noMinHeightLimit - indicates whether there is a minimum limit on the height of the tabBar
   * when height is set to auto, default value is false.
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
    barHeight(height: Length, noMinHeightLimit: boolean): TabsAttribute;

  /**
   * Sets the animation curve
   *
   * @param { Curve | ICurve } curve - animation curve for tabs switch animation,
   *     Curve is an enumeration type for common curves, ICurve is a curve object.
   * Default value:
   * When pages are turned by swiping in TabContent, the default value is
   * interpolatingSpring(-1, 1, 228, 30).
   * When pages are turned by tapping tabs or calling the changeIndex API of TabsController,
   * the default value is cubicBezierCurve(0.2, 0.0, 0.1, 1.0).
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
   animationCurve(curve: Curve | ICurve): TabsAttribute;

  /**
   * Called when the animation duration of the bar graph is set.
   *
   * @param { number } value
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the animation duration of the bar graph is set.
   *
   * @param { number } value - default value:
   *                           When this property is not set or set to null, the default value is 0.
   *                           When set to a value less than 0 or undefined, the default value is 300.
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the length of time required to complete the tab switching animation,
   * which is initiated by clicking a specific tab or by calling the changeIndex API of TabsController.
   *
   * @param { number } value - default value:
   *                           When this property is not set or set to null, the default value is 0.
   *                           When set to a value less than 0 or undefined, the default value is 300.
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  animationDuration(value: number): TabsAttribute;

  /**
   * Sets the animation mode for tab switching initiated by clicking a specific tab or
   * by calling the changeIndex API of TabsController.
   *
   * @param { Optional<AnimationMode> } mode - animation mode for tabs switch animation.
   * Default value is AnimationMode.CONTENT_FIRST.
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  animationMode(mode: Optional<AnimationMode>): TabsAttribute;

  /**
   * Sets the edge effect used when the boundary of the scrolling area is reached.
   *
   * @param { Optional<EdgeEffect> } edgeEffect - Effect used when the boundary of the scrolling area is reached.
   * Default value is EdgeEffect.Spring.
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  edgeEffect(edgeEffect: Optional<EdgeEffect>): TabsAttribute;

  /**
   * Called when the tab is switched.
   *
   * @param { function } event
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the tab is switched.
   *
   * @param { function } event
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the tab is switched.
   *
   * @param { function } event
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when a tab is switched.
   * Anonymous Object Rectification
   * 
   * <p><strong>NOTE</strong>:
   * <br>This event is triggered when any of the following conditions is met:
   * 1. The swiping animation is completed, followed by tab switching.
   * 2. The Controller API is called.
   * 3. The attribute value is updated using a state variable.
   * 4. A tab is clicked.
   * </p>
   *
   * @param { Callback<number> } event
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onChange(event: Callback<number>): TabsAttribute;

  /**
   * Called when a new tab becomes selected. Animation is not necessarily complete.
   *
   * @param { Callback<number> } event - callback to notify which index has been selected
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onSelected(event: Callback<number>): TabsAttribute;

  /**
   * Called when the tab is clicked.
   *
   * @param { function } event
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the tab is clicked.
   *
   * @param { function } event
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when a tab is clicked.
   * Anonymous Object Rectification
   *
   * @param { Callback<number> } event
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onTabBarClick(event: Callback<number>): TabsAttribute;

  /**
   * Called when a new tab becomes unselected. Animation is not necessarily complete.
   *
   * @param { Callback<number> } event - callback to notify which index has been unselected
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onUnselected(event: Callback<number>): TabsAttribute;

  /**
   * Called when the tab content flip animation start.
   *
   * @param { function } handler -
   * "index": the index value of the tab that when animation start.
   * "targetIndex": the target index value of the tab that when animation start.
   * "event": the animation event callback info.
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Called when the tab content flip animation start.
   *
   * @param { function } handler -
   * "index": the index value of the tab that when animation start.
   * "targetIndex": the target index value of the tab that when animation start.
   * "event": the animation event callback info.
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  /**
   * Triggered when the tab switching animation starts.
   * Anonymous Object Rectification
   *
   * @param { OnTabsAnimationStartCallback } handler
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onAnimationStart(handler: OnTabsAnimationStartCallback): TabsAttribute;

  /**
   * Called when the tab content flip animation end.
   *
   * @param { function } handler -
   * "index": the index value of the tab that when animation start.
   * "event": the animation event callback info.
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Called when the tab content flip animation end.
   *
   * @param { function } handler -
   * "index": the index value of the tab that when animation start.
   * "event": the animation event callback info.
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  /**
   * Triggered when the tab switching animation ends.
   * Anonymous Object Rectification
   *
   * @param { OnTabsAnimationEndCallback } handler
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onAnimationEnd(handler: OnTabsAnimationEndCallback): TabsAttribute;

  /**
   * Called when swiping the tab content with the gesture.
   *
   * @param { function } handler -
   * "index": the index value of the tab that when animation start.
   * "event": the animation event callback info.
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Called when swiping the tab content with the gesture.
   *
   * @param { function } handler -
   * "index": the index value of the tab that when animation start.
   * "event": the animation event callback info.
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  /**
   * Triggered on a frame-by-frame basis when the tab is switched by a swipe.
   * Anonymous Object Rectification
   *
   * @param { OnTabsGestureSwipeCallback } handler
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onGestureSwipe(handler: OnTabsGestureSwipeCallback): TabsAttribute;

  /**
   * Set whether the edges of tab bar are fading.
   *
   * @param { boolean } value - indicates whether the edges of tab bar are fading.
   * @returns { TabsAttribute } the attribute of the tabs
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets whether the tab fades out when it exceeds the container width.
   * 
   * <p><strong>NOTE</strong>:
   * <br>It is recommended that this attribute be used together with the barBackgroundColor attribute.
   * If the barBackgroundColor attribute is not defined, the tab fades out in white 
   * when it exceeds the container width by default.
   * </p>
   *
   * @param { boolean } value - Whether the tab fades out when it exceeds the container width. Default value is true.
   * @returns { TabsAttribute } the attribute of the tabs
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  fadingEdge(value: boolean): TabsAttribute;

  /**
   * Set the divider between tab bar and tab content.
   *
   * @param { DividerStyle | null } value - indicates the style of the indicator.
   * @returns { TabsAttribute } the attribute of the tabs
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set the divider between tab bar and tab content.
   *
   * @param { DividerStyle | null } value - indicates the style of the indicator. Default value is null.
   * @returns { TabsAttribute } the attribute of the tabs
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  divider(value: DividerStyle | null): TabsAttribute;

  /**
   * Set whether the tab bar overlaps with the tab content.
   *
   * @param { boolean } value - indicates whether the tab bar overlaps with the tab content.
   * @returns { TabsAttribute } the attribute of the tabs
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Sets whether the tab bar is superimposed on the TabContent component after having its background blurred.
   *
   * @param { boolean } value - indicates whether the tab bar overlaps with the tab content. Default value is false.
   * @returns { TabsAttribute } the attribute of the tabs
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  barOverlap(value: boolean): TabsAttribute;

  /**
   * Set the background color of the tab bar.
   *
   * @param { ResourceColor } value - indicates the background color of the tab bar.
   * @returns { TabsAttribute } the attribute of the tabs
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Set the background color of the tab bar.
   *
   * @param { ResourceColor } value - indicates the background color of the tab bar.
   * Default value is Color.Transparent.
   * @returns { TabsAttribute } the attribute of the tabs
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  barBackgroundColor(value: ResourceColor): TabsAttribute;

  /**
   * Set the grid alignment options of the tab bar.
   *
   * @param { BarGridColumnOptions } value - indicates the bar grid alignment options.
   * @returns { TabsAttribute } the attribute of the tabs
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the visible area of the tab bar in grid mode.
   * 
   * <p><strong>NOTE</strong>:
   * <br>This attribute is effective only in horizontal mode. It is not applicable to XS, XL, and XXL devices.
   * </p>
   *
   * @param { BarGridColumnOptions } value - indicates the bar grid alignment options.
   * @returns { TabsAttribute } the attribute of the tabs
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  barGridAlign(value: BarGridColumnOptions): TabsAttribute;

  /**
   * Custom tab content transition animation.
   * When undefined is set, this interface does not take effect.
   *
   * @param { function } delegate - custom content transition animation.
   * @returns { TabsAttribute } the attribute of the tabs
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 11
   */
  /**
   * Custom tab content transition animation.
   * When undefined is set, this interface does not take effect.
   *
   * @param { function } delegate - custom content transition animation.
   * @returns { TabsAttribute } the attribute of the tabs
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 12
   */
  /**
   * Custom tab content transition animation.
   * When undefined is set, this interface does not take effect.
   * Anonymous Object Rectification
   * 
   * <p><strong>NOTE</strong>:
   * <br>Instructions:
   * <br>1. When the custom tab switching animation is used, the default switching animation of
   * the Tabs component is disabled, and tabs cannot be switched through swiping.
   * <br>2. The value undefined means not to use the custom tab switching animation,
   * in which case the default switching animation is used.
   * <br>3. The custom tab switching animation cannot be interrupted.
   * <br>4. Currently, the custom tab switching animation can be triggered only by clicking a tab
   * or by calling the TabsController.changeIndex() API.
   * <br>5. When the custom tab switching animation is used,
   * the Tabs component supports all events except onGestureSwipe.
   * <br>6. Notes about the onChange and onAnimationEnd events: If the second custom animation is triggered
   * during the execution of the first custom animation, the onChange and onAnimationEnd events of 
   * the first custom animation will be triggered when the second custom animation starts.
   * <br>7. When the custom animation is used, the stack layout is used for pages involved in the animation.
   * If the zIndex attribute is not set for related pages, the zIndex values of all pages are the same.
   * In this case, the pages are rendered in the order in which they are added to
   * the component tree(that is, the sequence of page indexes). In light of this,
   * to control the rendering levels of pages, set the zIndex attribute of the pages.
   * </p>
   *
   * @param { TabsCustomContentTransitionCallback } delegate - Custom content transition animation.
   * @returns { TabsAttribute } The attribute of the tabs.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  customContentTransition(delegate: TabsCustomContentTransitionCallback): TabsAttribute;

  /**
   * Sets the background blur style of the tab bar.
   *
   * @param { BlurStyle } value - Background blur style of the tab bar. Default value is BlurStyle.NONE.
   * @returns { TabsAttribute } the attribute of the tabs
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  barBackgroundBlurStyle(value: BlurStyle): TabsAttribute;

  /**
   * Setting page flip mode on mouse wheel event.
   *
   * @param { Optional<PageFlipMode> } mode - page flip mode on mouse wheel event. The default value is PageFlipMode.CONTINUOUS.
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  pageFlipMode(mode: Optional<PageFlipMode>): TabsAttribute;

  /**
   * Set the BlurStyle of the tab bar.
   *
   * @param { BlurStyle } style - style indicate the blur style for the tab bar
   * @param { BackgroundBlurStyleOptions } options - options indicate the options for the tab bar
   * @returns { TabsAttribute } the attribute of the tabs
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  barBackgroundBlurStyle(style: BlurStyle, options: BackgroundBlurStyleOptions): TabsAttribute;

  /**
   * Set the BackgroundEffect of the tab bar.
   *
   * @param { BackgroundEffectOptions } options - options indicate the options for the tab bar
   * @returns { TabsAttribute } the attribute of the tabs
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  barBackgroundEffect(options: BackgroundEffectOptions): TabsAttribute;

  /**
   * Sets the maximum number of child components to be cached.
   *
   * @param { number } count - the maximum number of child components to be cached.
   * @param { TabsCacheMode } mode - the mode of caching child components.
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  cachedMaxCount(count: number, mode: TabsCacheMode): TabsAttribute;

  /**
   * Called when content will change.
   *
   * @param { function } handler
   * "currentIndex": the index value of the current tab.
   * "comingIndex": the index value of the tab that will change.
   * Tabs can change from currentIndex to comingIndex if function return true.
   * Tabs can not change from currentIndex to comingIndex if function return false.
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  /**
   * Triggered when a new page is about to be displayed.
   * Anonymous Object Rectification
   * 
   * <p><strong>NOTE</strong>:
   * <br>This event is triggered when any of the following conditions is met:
   * 1. When the user swipes on the TabContent component (provided that it supports swiping) to switch to a new page.
   * 2. When TabsController.changeIndex is called to switch to a new page.
   * 3. When the **index** attribute is changed to switch to a new page.
   * 4. When the user clicks a tab on the tab bar to switch to a new page.
   * 5. When the user presses the left or right arrow key on the keyboard to switch to a new page 
   * while the tab bar is focused.
   * </p>
   *
   * @param { OnTabsContentWillChangeCallback } handler
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onContentWillChange(handler: OnTabsContentWillChangeCallback): TabsAttribute;

  /**
   * Called when a new tab becomes selected. Animation is not necessarily complete.
   *
   * @param { Callback<number> } event - callback to notify which index has been selected
   * @returns { TabsAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onSelected(event: Callback<number>): TabsAttribute;

  /**
   * Triggered when scrolling content within the Tabs component.
   *
   * <p><strong>NOTE</strong>:
   * <br>During page scrolling, the OnTabContentDidScrollCallback callback is invoked for all pages in the viewport
   * on a frame-by-frame basis.
   * </p>
   *
   * @param { OnTabsContentDidScrollCallback | undefined } handler - callback of tabs,
   *     selectedIndex is the index value of the Tabs content selected before animation start.
   *     index is the index value of the Tabs content.
   *     position is the moving ratio of the Tabs content from the start position of the Tabs main axis.
   *     mainAxisLength is the Tabs main axis length for calculating position.
   *     undefined means unbinding callback.
   * @returns { TabsAttribute } - the attribute of the Tabs.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  onContentDidScroll(handler: OnTabsContentDidScrollCallback | undefined): TabsAttribute;

  /**
   * Sets the nested scrolling mode of the tabs component and its parent container.
   *
   * @param { TabsNestedScrollMode | undefined } value - mode for nested scrolling.
   * Default value is TabsNestedScrollMode.SELF_ONLY. Undefined means default value.
   * @returns { TabsAttribute } -the attribute of the tabs.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 24 dynamic
   */
  nestedScroll(value: TabsNestedScrollMode | undefined): TabsAttribute;
}

/**
 * Defines the Tab Content animated transition options.
 *
 * @interface TabContentAnimatedTransition
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 11
 */
/**
 * Defines the Tab Content animated transition options.
 *
 * @interface TabContentAnimatedTransition
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 12 dynamic
 */
declare interface TabContentAnimatedTransition {
  /**
   * Defines the timeout of custom content transition animation. The unit is ms.
   * If TabContentTransitionProxy.finishTransition() is not invoked, use the timeout as animation end time.
   *
   * @type { ?number }
   * @default 1000 ms
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 11
   */
  /**
   * Defines the timeout of custom content transition animation. The unit is ms.
   * If TabContentTransitionProxy.finishTransition() is not invoked, use the timeout as animation end time.
   *
   * @type { ?number }
   * @default 1000 ms
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 12 dynamic
   */
  timeout?: number;

  /**
   * Called when custom content transition animation start.
   *
   * @type { function }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 11
   */
  /**
   * Called when custom content transition animation start.
   *
   * @type { function }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 12
   */
  /**
   * Called when custom content transition animation start.
   * Anonymous Object Rectification
   *
   * @type { Callback<TabContentTransitionProxy> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 18 dynamic
   */
  transition: Callback<TabContentTransitionProxy>;
}

/**
 *  The proxy of TabContentAnimatedTransition.
 *
 * @interface TabContentTransitionProxy
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 11
 */
/**
 *  The proxy of TabContentAnimatedTransition.
 *
 * @interface TabContentTransitionProxy
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 12 dynamic
 */
declare interface TabContentTransitionProxy {
  /**
   * The index of current tab content.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 11
   */
  /**
   * The index of current tab content.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 12 dynamic
   */
  from: number;

  /**
   * The index of target tab content.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 11
   */
  /**
   * The index of target tab content.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 12 dynamic
   */
  to: number;

  /**
   * Notifies Tabs component the custom content transition animation is complete.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 11
   */
  /**
   * Notifies Tabs component the custom content transition animation is complete.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 12 dynamic
   */
  finishTransition(): void;
}

/**
 * Defines Tabs Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Tabs Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines Tabs Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare const Tabs: TabsInterface;

/**
 * Defines Tabs Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Tabs Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines Tabs Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare const TabsInstance: TabsAttribute;
