/*
 * Copyright (c) 2021-2023 Huawei Device Co., Ltd.
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
 * Content scroll direction.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Content scroll direction.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Enumerates the scrolling directions.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare enum ScrollDirection {
  /**
   * Vertical scrolling is supported.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Vertical scrolling is supported.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Only vertical scrolling is supported.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  Vertical,

  /**
   * Horizontal scrolling is supported.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Horizontal scrolling is supported.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Only horizontal scrolling is supported.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  Horizontal,

  /**
   * Vertical or horizontal scrolling is supported.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7 dynamiconly
   * @deprecated since 9
   * @useinstead ScrollDirection#FREE
   */
  Free,

  /**
   * Non-scrollable.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Non-scrollable.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Scrolling is disabled.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  None,

  /**
   * Free scrolling is supported.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  FREE = 4,
}

/**
 * ScrollAlign.
 *
 * @enum { number } ScrollAlign
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Enumerates alignment modes.
 *
 * @enum { number } ScrollAlign
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare enum ScrollAlign {
  /**
   * Start position alignment.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * The start edge of the list item is flush with the start edge of the list.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  START,

  /**
   * Center alignment.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * The list item is centered along the main axis of the list.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  CENTER,

  /**
   * End position alignment.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * The end edge of the list item is flush with the end edge of the list.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  END,

  /**
   * Scroll the minimum distance to fully display the specified item.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * The list item is automatically aligned.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  AUTO,
}

/**
 * Represents the offset values resulting from a scroll operation.
 *
 * @interface OffsetResult
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare interface OffsetResult {
  /**
   * Horizontal scrolling offset.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  xOffset: number;

  /**
   * Vertical scrolling offset.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  yOffset: number;
}

/**
 * Provides parameters for scrolling to the edge of a scrollable container.
 *
 * @interface ScrollEdgeOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface ScrollEdgeOptions {
  /**
   * Fixed velocity for scrolling to the edge of the container.
   * If the value specified is less than or equal to 0, the parameter will not take effect.
   *
   * @type { ?number }
   * @default 0vp/s
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  velocity?: number;
}

/**
 * Provides parameters for scrolling to a specific index.
 *
 * @interface ScrollToIndexOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface ScrollToIndexOptions {
  /**
   * Extra offset for scrolling to a specified index.
   *
   * @type { ?LengthMetrics }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  extraOffset?: LengthMetrics;
}

/**
 * Provides parameters for customizing scroll animations.
 *
 * @interface ScrollAnimationOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface ScrollAnimationOptions {
  /**
   * Scrolling duration.
   * 
   * <p><strong>NOTE</strong>
   * <br>A value less than 0 evaluates to the default value.
   * </p>
   *
   * @type { ?number }
   * @default 1000
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  duration?: number;

  /**
   * Scrolling curve.
   *
   * @type { ?(Curve | ICurve) }
   * @default Curve.Ease
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  curve?: Curve | ICurve;

  /**
   * Whether to enable overscroll.
   * 
   * <p><strong>NOTE</strong>
   * <br> Scrolling can exceed the boundary and initiate a bounce animation when this parameter is set to <em>true</em>,
   * and the component's <em>edgeEffect</em> attribute is set to EdgeEffect.Spring.
   * </p>
   *
   * @type { ?boolean }
   * @default false
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  canOverScroll?: boolean;
}

/**
 * Provides parameters for setting the initial scrolling offset.
 *
 * @interface OffsetOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface OffsetOptions {
  /**
   * Horizontal scrolling offset.
   *
   * @type { ?Dimension }
   * @default 0
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  xOffset?: Dimension;

  /**
   * Vertical scrolling offset.
   *
   * @type { ?Dimension }
   * @default 0
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  yOffset?: Dimension;
}

/**
 * Defines a UIScrollableCommonEvent which is used to set different common event to target component.
 *
 * @extends UIScrollableCommonEvent
 * @interface UIScrollEvent
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 19 dynamic
 */
declare interface UIScrollEvent extends UIScrollableCommonEvent {
  /**
   * Set or reset the callback which is triggered when the Scroll will scroll.
   *
   * @param { ScrollOnWillScrollCallback | undefined } callback - callback function, triggered when
   *     the Scroll will scroll.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  setOnWillScroll(callback: ScrollOnWillScrollCallback | undefined): void;

  /**
   * Set or reset the callback which is triggered when the Scroll did scroll.
   *
   * @param { ScrollOnScrollCallback | undefined } callback - callback function, triggered when the Scroll did scroll.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  setOnDidScroll(callback: ScrollOnScrollCallback | undefined): void;
}

/**
 * Scroller
 * 
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Scroller
 * 
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines a controller for scrollable container components.
 * 
 * <p><strong>NOTE</strong>
 * <br>1. The binding of a <em>Scroller</em> instance to a scrollable container component occurs during the component creation phase.
 * <br>2. <em>Scroller</em> APIs can only be effectively called after the <em>Scroller</em> instance is bound to a scrollable container component.
 * Otherwise, depending on the API called, it may have no effect or throw an exception.
 * <br>3. For example, with aboutToAppear, this callback is executed after a new instance of a custom component is
 * created and before its <em>build()</em> method is called.
 * Therefore, if a scrollable component is defined within the <em>build</em> method of a custom component,
 * the internal scrollable component has not yet been created during the <em>aboutToAppear</em> callback
 * of that custom component, and therefore the <em>Scroller</em> APIs cannot be called effectively.
 * </p>
 * 
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare class Scroller {
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
   * A constructor used to create a <em>Scroller</em> object.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  constructor();

  /**
   * Called when the setting slides to the specified position.
   *
   * @param { object } value
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the setting slides to the specified position.
   *
   * @param { object } value
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the setting slides to the specified position.
   *
   * @param { object } value
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Scrolls to the specified position.
   * Anonymous Object Rectification.
   *
   * @param { ScrollOptions } options - Parameters for scrolling to the specified position.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  scrollTo(options: ScrollOptions);


  /**
   * Called when scrolling to the edge of the container.
   *
   * @param { Edge } value
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when scrolling to the edge of the container.
   *
   * @param { Edge } value
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when scrolling to the edge of the container.
   *
   * @param { Edge } value
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Scrolls to the edge of the container, regardless of the scroll axis direction.
   *
   * @param { Edge } value - Edge position to scroll to.
   * <br><em>Atomic service API</em>: This API can be used in atomic services since API version 11.
   * @param { ScrollEdgeOptions } [options] - Mode of scrolling to the edge position.
   * <br><em>Atomic service API</em>: This API can be used in atomic services since API version 12.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  scrollEdge(value: Edge, options?: ScrollEdgeOptions);
  

  /**
   * Performs inertial scrolling based on the initial velocity passed in.
   *
   * @param { number } velocity - Initial velocity of inertial scrolling. Unit: vp/s
   * <br><em>NOTE</em>
   * <br>If the value specified is 0, it is considered as invalid, and the scrolling for this instance will not take effect.
   * A positive value indicates scrolling towards the top, while a negative value indicates scrolling towards the bottom.
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   * <br> 1. Mandatory parameters are left unspecified.
   * <br> 2. Incorrect parameters types.
   * <br> 3. Parameter verification failed.
   * @throws { BusinessError } 100004 - Controller not bound to a component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  fling(velocity: number): void;

  /**
   * Called when page turning mode is set.
   *
   * @param { object } value
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Called when page turning mode is set.
   *
   * @param { object } value
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when page turning mode is set.
   *
   * @param { object } value
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Scrolls to the next or previous page.
   *
   * @param { ScrollPageOptions } value - Page turning mode.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 14 dynamic
   */
  scrollPage(value: ScrollPageOptions);

  /**
   * Scrolls to the next or previous page.
   *
   * @param { boolean } next - Whether to turn to the next page.
   * The value <em>true</em> means to scroll to the next page, and <em>false</em> means to scroll to the previous page.
   * @param { Axis } direction - Scrolling direction: horizontal or vertical.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7 dynamiconly
   * @deprecated since 9
   * @useinstead Scroller#scrollPage
   */
  scrollPage(value: { next: boolean; direction?: Axis });

  /**
   * Called when viewing the scroll offset.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when viewing the scroll offset.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Obtains the current scrolling offset.
   *
   * @returns { OffsetResult } Returns the current scrolling offset. If the scroller not bound to a component, the return value is void.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  currentOffset() : OffsetResult;

  /**
   * Obtains the current scrolling offset.
   *
   * @returns { OffsetResult | undefined } Returns the current scrolling offset.
   *     If the scroller not bound to a component, the return value is undefined.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  offset() : OffsetResult | undefined;

  /**
   * Called when sliding to the specified index.
   *
   * @param { number } value
   * @param { boolean } smooth
   * @param { ScrollAlign } align
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when sliding to the specified index.
   *
   * @param { number } value - Index to jump to.
   * @param { boolean } smooth - If true, scroll to index item with animation. If false, scroll to index item without animation.
   * @param { ScrollAlign } align - Sets the alignment mode of a specified index.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when sliding to the specified index.
   *
   * @param { number } value - Index to jump to.
   * @param { boolean } smooth - If true, scroll to index item with animation. If false, scroll to index item without animation.
   * @param { ScrollAlign } align - Sets the alignment mode of a specified index.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Scrolls to a specified index, with support for setting an extra offset for the scroll.
   * 
   * <p><strong>NOTE</strong>
   * <br>This API only works for the <em>ArcList</em>, <em>Grid</em>, <em>List</em>, and <em>WaterFlow</em> components.
   * </p>
   *
   * @param { number } value - Index of the item to be scrolled to in the container.
   * <br><em>NOTE</em>
   * <br>If the value set is a negative value or greater than the maximum index of the items in the container,
   * the value is deemed abnormal, and no scrolling will be performed.
   * @param { boolean } [smooth] - Whether to enable the smooth animation for scrolling to the item with the specified index.
   * The value <em>true</em> means to enable that the smooth animation, and <em>false</em> means the opposite.<br>Default value: <em>false</em>
   * @param { ScrollAlign } [align] - How the list item to scroll to is aligned with the container.
   * <br> Default value when the container is <em>List</em>: <em>ScrollAlign.START</em>
   * <br> Default value when the container is <em>Grid</em>: <em>ScrollAlign.AUTO</em>
   * <br> Default value when the container is <em>WaterFlow</em>: <em>ScrollAlign.START</em>
   * <br><em>NOTE</em>
   * <br>This parameter is only available for the <em>List</em>, <em>Grid</em>, and <em>WaterFlow</em> components.
   * @param { ScrollToIndexOptions } [options] - Options for scrolling to a specified index,
   * for example, an extra offset for the scroll.<br>Default value: <em>0</em>, in vp
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  scrollToIndex(value: number, smooth?: boolean, align?: ScrollAlign, options?: ScrollToIndexOptions);

  /**
   * Called when the setting slides by offset.
   *
   * @param { Length } dx
   * @param { Length } dy
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Called when the setting slides by offset.
   *
   * @param { Length } dx
   * @param { Length } dy
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Scrolls by the specified amount.
   * 
   * <p><strong>NOTE</strong>
   * <br>This API is available for the <em>ArcList</em>, <em>Scroll</em>, <em>List</em>, <em>Grid</em>, and <em>WaterFlow</em> components.
   * </p>
   *
   * @param { Length } dx - Amount to scroll by in the horizontal direction. The percentage format is not supported.
   * @param { Length } dy - Amount to scroll by in the vertical direction. The percentage format is not supported.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  scrollBy(dx: Length, dy: Length);

  /**
   * Indicates whether the component scrolls to the end position.
   *
   * @returns { boolean } Returns whether the component scrolls to the end position.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Checks whether the component has scrolled to the bottom.
   * 
   * <p><strong>NOTE</strong>
   * <br>This API is available for the <em>ArcList</em>, <em>Scroll</em>, <em>List</em>, <em>Grid</em>, and <em>WaterFlow</em> components.
   * </p>
   *
   * @returns { boolean } Returns whether the component scrolls to the end position.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  isAtEnd(): boolean;

  /**
   * Get child item size and position.
   *
   * @param { number } index - Index of the item.
   * @returns { RectResult } Returns the size and position.
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   * <br> 1. Mandatory parameters are left unspecified.
   * <br> 2. Incorrect parameters types.
   * <br> 3. Parameter verification failed.
   * @throws { BusinessError } 100004 - Controller not bound to a component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Obtains the size and position of a child component relative to its container.
   * 
   * <p><strong>NOTE</strong>
   * <br>- The value of <em>index</em> must be the index of a child component visible in the display area.
   * Otherwise, the value is considered invalid.
   * <br>- The value of <em>index</em> must be the index of a child component visible in the display area. Otherwise,
   * the value is considered invalid.
   * </p>
   *
   * @param { number } index - Index of the target child component.
   * @returns { RectResult } Returns the size and position.
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   * <br> 1. Mandatory parameters are left unspecified.
   * <br> 2. Incorrect parameters types.
   * <br> 3. Parameter verification failed.
   * @throws { BusinessError } 100004 - Controller not bound to a component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  getItemRect(index: number): RectResult;

  /**
   * Obtains the index of a child component based on coordinates.
   * 
   * <p><strong>NOTE</strong>
   * <br>The returned index is <em>-1</em> for invalid coordinates.
   * </p>
   *
   * @param { number } x - X-coordinate, in vp.
   * @param { number } y - Y-coordinate, in vp.
   * @returns { number } Index of the item.
   * @throws { BusinessError } 401 - Parameter error. Possible causes:
   * <br> 1. Mandatory parameters are left unspecified.
   * <br> 2. Incorrect parameters types.
   * <br> 3. Parameter verification failed.
   * @throws { BusinessError } 100004 - Controller not bound to a component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 14 dynamic
   */
  getItemIndex(x: number, y: number): number;

  /**
   * Obtains the content size.
   *
   * @returns { SizeResult } Returns the content size.
   * @throws { BusinessError } 100004 - Controller not bound to a component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  contentSize() : SizeResult;
}

/**
 * Provides parameters for scrolling to a specific position in a scrollable container.
 *
 * @interface ScrollOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
declare interface ScrollOptions {
  /**
   * The X-axis offset.
   *
   * @type { number | string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * The X-axis offset.
   *
   * @type { number | string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Horizontal scrolling offset.
   * Anonymous Object Rectification.
   * 
   * <p><strong>NOTE</strong>
   * <br>This parameter cannot be set in percentage.
   * <br>If the value is less than 0, the offset will be 0 for non-animated scrolling.
   * Animated scrolling stops at the starting position by default.
   * By setting the <em>animation</em> parameter, you can enable a bounce effect when the scrolling goes beyond the boundary.
   * <br>This parameter takes effect only when the scroll axis is the x-axis.
   * </p>
   *
   * @type { number | string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  xOffset: number | string;

  /**
   * The Y-axis offset.
   *
   * @type { number | string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * The Y-axis offset.
   *
   * @type { number | string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Vertical scrolling offset.
   * Anonymous Object Rectification.
   * 
   * <p><strong>NOTE</strong>
   * <br>This parameter cannot be set in percentage.
   * <br>If the value is less than 0, the offset will be 0 for non-animated scrolling.
   * Animated scrolling stops at the starting position by default.
   * By setting the <em>animation</em> parameter, you can enable a bounce effect when the scrolling goes beyond the boundary.
   * <br>This parameter takes effect only when the scroll axis is the y-axis.
   * </p>
   *
   * @type { number | string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  yOffset: number | string;

  /**
   * Descriptive animation.
   *
   * @type { ?({ duration?: number; curve?: Curve | ICurve } | boolean) } The object type provides custom animation parameters
   * and the boolean type enables default spring animation.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Descriptive animation.
   *
   * @type { ?({ duration?: number; curve?: Curve | ICurve } | boolean) } The object type provides custom animation parameters
   * and the boolean type enables default spring animation.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Descriptive animation.
   *
   * @type { ?( ScrollAnimationOptions | boolean) } The ScrollAnimationOptions type provides custom animation parameters
   * and the boolean type enables default spring animation.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  /**
   * Animation configuration
   * Anonymous Object Rectification.
   * 
   * <p><strong>NOTE</strong>
   * <br>Currently, the <em>List</em>, <em>Scroll</em>, <em>Grid</em>, and <em>WaterFlow</em> support the <em>Boolean</em> type and <em>ICurve</em>.
   * </p>
   *
   * @type { ?( ScrollAnimationOptions | boolean) } The ScrollAnimationOptions type provides custom animation parameters
   * and the boolean type enables default spring animation.
   * @default ScrollAnimationOptions: { duration: 1000, curve: Curve.Ease, canOverScroll: false }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  animation?: ScrollAnimationOptions | boolean;

  /**
   * Set whether the scroll target position can over the boundary.
   *
   * @type { ?boolean } whether the scroll target position can over the boundary.
   * @default false
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  canOverScroll?: boolean;
}

/**
 * Provides parameters for page scrolling behavior.
 *
 * @interface ScrollPageOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 14 dynamic
 */
declare interface ScrollPageOptions {
  /**
   * Whether to turn to the next page.The value true means to scroll to the next page,
   * and false means to scroll to the previous page.
   *
   * @type { boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 14 dynamic
   */
  next: boolean;

  /**
   * Whether to enable the page-turning animation.The value true means to enable the page-turning animation,
   * and false means the opposite.
   *
   * @type { ?boolean }
   * @default false
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 14 dynamic
   */
  animation?: boolean;
}

/**
 * Define scroll snap options
 * 
 * @interface ScrollSnapOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Defines a scroll snapping mode object.
 * 
 * @interface ScrollSnapOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare interface ScrollSnapOptions {
  /**
   * Set scroll snap alignment.
   *
   * @type { ScrollSnapAlign }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Alignment mode for the scroll snap position.
   *
   * @type { ScrollSnapAlign }
   * @default ScrollSnapAlign.NONE
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  snapAlign: ScrollSnapAlign;

  /**
   * Set snap positions. When the type of snapPositions is Dimension, Scroll content is paginated by an integer
   * multiple of snapPositions. When the type of snapPositions is Array<number>, Scroll content is paginated based
   * on the array of snapPositions.
   *
   * @type { ?(Dimension | Array<Dimension>) }
   * @default 100%
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Pagination points for scroll snapping.
   *
   * <p><strong>NOTE</strong>
   * <br>1. If the value is of the Dimension type, it indicates the size of each page, and the system will paginate based on this size.
   * <br>2. If the value is of the Array\<Dimension\> type, each <em>Dimension</em> represents a pagination point,
   * and the system will paginate accordingly. Each <em>Dimension</em> value must be within the [0, scrollable distance] range.
   * <br>3. If this parameter is not set or <em>Dimension</em> is set to a value less than or equal to 0, the value is regarded as an invalid value.
   * In this case, there is no scroll snapping. When the value is of the Array\<Dimension\> type, the items in the array must be monotonically increasing.
   * <br>4. When the value is a percentage, the actual size is the product of the viewport of the <em>Scroll</em> component and the percentage value.
   * </p>
   *
   * @type { ?(Dimension | Array<Dimension>) }
   * @default 100%
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  snapPagination?: Dimension | Array<Dimension>;

  /**
   * Set whether the beginning of the Scroll content counts an a snap.
   *
   * @type { ?boolean }
   * @default true
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Whether to enable the snap to start feature. When scroll snapping is defined for the <em>Scroll</em> component,
   * setting this parameter to <em>false</em> enables the component to scroll between the start and the first page.
   * 
   * <p><strong>NOTE</strong>
   * <br>2. This attribute takes effect only when <em>snapPagination</em> is set to a value of the <em>Array\<Dimension\></em> type;
   * it does not work with values of the <em>Dimension</em> type.
   * </p>
   *
   * @type { ?boolean }
   * @default true
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  enableSnapToStart?: boolean;

  /**
   * Set whether the end of the Scroll content counts an a snap.
   *
   * @type { ?boolean }
   * @default true
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Whether to enable the snap to end feature. When scroll snapping is defined for the <em>Scroll</em> component,
   * setting this parameter to <em>false</em> enables the component to scroll between the end and the last page.
   *
   * <p><strong>NOTE</strong>
   * <br>2. This attribute takes effect only when <em>snapPagination</em> is set to a value of the <em>Array\<Dimension\></em> type;
   * it does not work with values of the <em>Dimension</em> type.
   * </p>
   *
   * @type { ?boolean }
   * @default true
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  enableSnapToEnd?: boolean;
}

/**
 * Provides interfaces for scrollable containers.
 *
 * @interface ScrollInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Provides interfaces for scrollable containers.
 *
 * @interface ScrollInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provides interfaces for scrollable containers.
 *
 * @interface ScrollInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 * @noninterop
 */
interface ScrollInterface {
  /**
   * Called when a scrollable container is set.
   *
   * @param { Scroller } scroller
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when a scrollable container is set.
   *
   * @param { Scroller } scroller
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when a scrollable container is set.
   *
   * @param { Scroller } scroller
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  (scroller?: Scroller): ScrollAttribute;
}

/**
 * Represents the callback triggered when scrolling reaches an edge.
 *
 * @typedef { function } OnScrollEdgeCallback
 * @param { Edge } side - Edge position to scroll to.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
declare type OnScrollEdgeCallback = (side: Edge) => void;

/**
 * The data returned by the event handler when onScrollFrameBegin.
 *
 * @interface OnScrollFrameBeginHandlerResult
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
interface OnScrollFrameBeginHandlerResult {
  /**
   * Actual sliding amount, unit vp.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Actual sliding amount, unit vp.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Actual sliding amount, unit vp.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Actual scroll offset.
   * Anonymous Object Rectification.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  offsetRemain: number;
}

/**
 * Represents the callback triggered before each frame scrolling starts.
 *
 * @typedef { function } OnScrollFrameBeginCallback
 * @param { number } offset - Amount to scroll by, in vp.
 * @param { ScrollState } state - Current scroll state.
 * @returns { OnScrollFrameBeginHandlerResult } data - the scroll data return by handler
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
declare type OnScrollFrameBeginCallback = (offset: number, state: ScrollState) => OnScrollFrameBeginHandlerResult;

/**
 * Defines the scroll attribute functions.
 *
 * @extends CommonMethod<ScrollAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the scroll attribute functions.
 *
 * @extends CommonMethod<ScrollAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the scroll attribute functions.
 *
 * @extends ScrollableCommonMethod<ScrollAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 * @noninterop
 */
declare class ScrollAttribute extends ScrollableCommonMethod<ScrollAttribute> {
  /**
   * Called when the scroll method is slid.
   *
   * @param { ScrollDirection } value
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the scroll method is slid.
   *
   * @param { ScrollDirection } value
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the scrolling direction.
   *
   * @param { ScrollDirection } value - Scrolling direction.<br>Default value: <em>ScrollDirection.Vertical</em>
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  scrollable(value: ScrollDirection): ScrollAttribute;

  /**
   * Set maximum zoom scale.
   *
   * @param { number } scale - Set maximum zoom scale.
   * <br>Default value: 1.
   * <br>Value range: (0, +∞). If this parameter is set to a value less than or equal to 0, the default value is used.
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  maxZoomScale(scale: number): ScrollAttribute;

  /**
   * Set minimum zoom scale.
   *
   * @param { number } scale - Set minimum zoom scale.
   * <br>Default value: 1.
   * <br>Value range: (0, maxZoomScale].
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  minZoomScale(scale: number): ScrollAttribute;

  /**
   * Current zoom scale.
   * This parameter supports !! for two-way binding of variables.
   *
   * @param { number } scale - Current zoom scale.
   * <br>Default value: 1.
   * <br>Value range: (0, +∞).
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  zoomScale(scale: number): ScrollAttribute;

  /**
   * Enable bounces zoom scale.
   *
   * @param { boolean } enable - Enable bounces zoom scale.
   * <br>Default value: true.
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  enableBouncesZoom(enable: boolean): ScrollAttribute;

  /**
   * Called when the setting slides to the specified position.
   *
   * @param { function } event
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the setting slides to the specified position.
   *
   * @param { function } event
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Triggered to return the horizontal and vertical offsets, in vp, during scrolling when the specified scroll event occurs.
   * 
   * <p><strong>NOTE</strong>
   * <br>1. This event is triggered when scrolling is started by the <em>Scroll</em> component or other input settings,
   * such as keyboard and mouse operations.
   * <br>2. This event is triggered when the controller API is called.
   * <br>3. This event supports the out-of-bounds bounce effect.
   * </p>
   *
   * @param { function } event
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamiconly
   * @deprecated since 12
   * @useinstead scroll/Scroll#onWillScroll
   * 
   */
  onScroll(event: (xOffset: number, yOffset: number) => void): ScrollAttribute;

  /**
   * Triggered before scrolling.
   * 
   * <p><strong>NOTE</strong>
   * <br>1. This event is triggered when scrolling is started by the <em>Scroll</em> component or other input settings,
   * such as keyboard and mouse operations.
   * <br>2. This event is triggered when the controller API is called.
   * <br>3. This event supports the out-of-bounds bounce effect.
   * </p>
   *
   * @param { ScrollOnWillScrollCallback } handler - Callback triggered before scrolling.
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onWillScroll(handler: ScrollOnWillScrollCallback): ScrollAttribute;

  /**
   * Triggered when the Scroll component scrolls.
   * 
   * <p><strong>NOTE</strong>
   * <br>1. This event is triggered when scrolling is started by the <em>Scroll</em> component or other input settings,
   * such as keyboard and mouse operations.
   * <br>2. This event is triggered when the controller API is called.
   * <br>3. This event supports the out-of-bounds bounce effect.
   * </p>
   *
   * @param { ScrollOnScrollCallback } handler - Callback triggered when the <em>Scroll</em> component scrolls.
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onDidScroll(handler: ScrollOnScrollCallback): ScrollAttribute;

  /**
   * Called when scrolling to the edge of the container.
   *
   * @param { function } event
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when scrolling to the edge of the container.
   *
   * @param { function } event
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when scrolling to the edge of the container.
   *
   * @param { function } event
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when scrolling reaches the edge.
   * Anonymous Object Rectification.
   * 
   * <p><strong>NOTE</strong>
   * <br>1. This event is triggered when scrolling reaches the edge after being started by the <em>Scroll</em> component or other input settings, 
   * such as keyboard and mouse operations.
   * <br>2. This event is triggered when the controller API is called.
   * <br>3. This event supports the out-of-bounds bounce effect.
   * </p>
   *
   * @param { OnScrollEdgeCallback } event - Edge position to scroll to.
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onScrollEdge(event: OnScrollEdgeCallback): ScrollAttribute;

  /**
   * Called when scrolling start.
   *
   * @param { function } event
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Called when scrolling start.
   *
   * @param { function } event
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when scrolling start.
   *
   * @param { function } event
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Called when scrolling start.
   * Anonymous Object Rectification.
   * 
   * <p><strong>NOTE</strong>
   * <br>1. This event is triggered when scrolling is started by the <em>Scroll</em> component or other input settings, such as keyboard and mouse operations.
   * <br>2. This event is triggered when the controller API is called, accompanied by a transition animation.
   * </p>
   *
   * @param { VoidCallback } event - Callback triggered when scrolling starts.
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onScrollStart(event: VoidCallback): ScrollAttribute;

  /**
   * Triggered when scrolling stops.
   * 
   * <p><strong>NOTE</strong>
   * <br>1. This event is triggered when scrolling is stopped by the <em>Scroll</em> component or other input settings, such as keyboard and mouse operations.
   * <br>2. This event is triggered when the controller API is called, accompanied by a transition animation.
   * </p>
   *
   * @param { function } event
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7 dynamiconly
   * @deprecated since 9
   * @useinstead scroll/Scroll#onScrollStop
   */
  onScrollEnd(event: () => void): ScrollAttribute;

  /**
   * Called when scrolling has stopped.
   *
   * @param { function } event
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Called when scrolling has stopped.
   *
   * @param { function } event
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when scrolling has stopped.
   *
   * @param { function } event
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Called when scrolling has stopped.
   * Anonymous Object Rectification.
   * 
   * <p><strong>NOTE</strong>
   * <br>1. This event is triggered when scrolling is stopped by the <em>Scroll</em> component or other input settings, such as keyboard and mouse operations.
   * <br>2. This event is triggered when the controller API is called, accompanied by a transition animation.
   * </p>
   *
   * @param { VoidCallback } event - Callback triggered when scrolling stops.
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onScrollStop(event: VoidCallback): ScrollAttribute;

  /**
   * Called when the Scroll did zoom.
   *
   * @param { ScrollOnDidZoomCallback } event - callback of zoom.
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  onDidZoom(event: ScrollOnDidZoomCallback): ScrollAttribute;

  /**
   * Called when zooming has stated.
   *
   * @param { VoidCallback } event - Zoom start callback.
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  onZoomStart(event: VoidCallback): ScrollAttribute;

  /**
   * Called when zooming has stopped.
   *
   * @param { VoidCallback } event - Zoom stop callback.
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  onZoomStop(event: VoidCallback): ScrollAttribute;

  /**
   * Called when the status of the scroll bar is set.
   *
   * @param { BarState } barState
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the status of the scroll bar is set.
   *
   * @param { BarState } barState
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the scrollbar state.
   *
   * @param { BarState } barState - Scrollbar state.<br>Default value: <em>BarState.Auto</em>
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  scrollBar(barState: BarState): ScrollAttribute;

  /**
   * Called when the color of the scroll bar is set.
   *
   * @param { Color | number | string } color
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the color of the scroll bar is set.
   *
   * @param { Color | number | string } color
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the scrollbar color.
   *
   * @param { Color | number | string } color - Scrollbar color.<br>Default value: <em>'\#182431'</em> (40% opacity)
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  scrollBarColor(color: Color | number | string): ScrollAttribute;

  /**
   * Sets the scrollbar color.
   *
   * @param { Color | number | string | Resource } color - Scrollbar color.<br>Default value: <em>'\#182431'</em> (40% opacity)
   * <br>A number value indicates a HEX color in RGB or ARGB format, for example, <em>0xffffff</em>.
   * A string value indicates a color in RGB or ARGB format, for example, <em>'#ffffff'</em>.
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  scrollBarColor(color: Color | number | string | Resource): ScrollAttribute;

  /**
   * Called when the width of the scroll bar is set.
   *
   * @param { number | string } value
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the width of the scroll bar is set.
   *
   * @param { number | string } value
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the scrollbar width.
   *
   * @param { number | string } value - Scrollbar width.<br>Default value: <em>4</em> <br>Unit: vp
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  scrollBarWidth(value: number | string): ScrollAttribute;

  /**
   * Called when the sliding effect is set.
   *
   * @param { EdgeEffect } edgeEffect
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the sliding effect is set.
   *
   * @param { EdgeEffect } edgeEffect
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the effect used when the scroll boundary is reached.
   *
   * @param { EdgeEffect } edgeEffect - Effect used when the scroll boundary is reached. The spring and shadow effects are supported.
   * <br>Default value: <em>EdgeEffect.None</em>
   * @param { EdgeEffectOptions } options - Whether to enable the scroll effect when the component content is smaller than the component itself.
   * The value <em>{ alwaysEnabled: true }</em> means to enable the scroll effect, and <em>{ alwaysEnabled: false }</em> means the opposite.
   * <br>Default value: <em>{ alwaysEnabled: true }</em>
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  edgeEffect(edgeEffect: EdgeEffect, options?: EdgeEffectOptions): ScrollAttribute;

  /**
   * Called when scrolling begin each frame.
   *
   * @param { function } event
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Called when scrolling begin each frame.
   *
   * @param { function } event
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when scrolling begin each frame.
   *
   * @param { function } event
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when each frame scrolling starts.
   * Anonymous Object Rectification.
   *
   * @param { OnScrollFrameBeginCallback } event - Callback triggered when each frame scrolling starts.
   * @returns { ScrollAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onScrollFrameBegin(event: OnScrollFrameBeginCallback): ScrollAttribute;

  /**
   * Called to setting the nested scroll options.
   *
   * @param { NestedScrollOptions } value - options for nested scrolling.
   * @returns { ScrollAttribute } the attribute of the scroll.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Sets the nested scrolling options. You can set the nested scrolling mode in the forward and backward directions
   * to implement scrolling linkage with the parent component.
   *
   * @param { NestedScrollOptions } value - Nested scrolling options.
   * <br>Default value: <em>{ scrollForward: NestedScrollMode.SELF_ONLY, scrollBackward: NestedScrollMode.SELF_ONLY }</em>
   * @returns { ScrollAttribute } the attribute of the scroll.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  nestedScroll(value: NestedScrollOptions): ScrollAttribute;

  /**
   * Called when setting whether to enable scroll by gesture or mouse.
   *
   * @param { boolean } value
   * @returns { ScrollAttribute } The attribute of the scroll
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets whether to support scroll gestures. When this attribute is set to <em>false</em>,
   * scrolling by finger or mouse is not supported, but the scroll controller API is not affected.
   *
   * @param { boolean } value - Whether to support scroll gestures.<br>Default value: <em>true</em>
   * @returns { ScrollAttribute } The attribute of the scroll
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  enableScrollInteraction(value: boolean): ScrollAttribute;

  /**
   * Called to setting the friction.
   *
   * @param { number | Resource } value - options for scrolling friction.
   * @returns { ScrollAttribute } the attribute of the scroll.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the friction coefficient. It applies only to gestures in the scrolling area, and
   * it affects only indirectly the scroll chaining during the inertial scrolling process.
   * If this attribute is set to a value less than or equal to 0, the default value is used.
   *
   * @param { number | Resource } value - Friction coefficient.
   * <br>Default value: <em>0.9</em> for wearable devices and <em>0.6</em> for non-wearable devices
   * <br>Since API version 11, the default value for non-wearable devices is <em>0.7</em>.
   * <br>Since API version 12, the default value for non-wearable devices is <em>0.75</em>.
   * @returns { ScrollAttribute } the attribute of the scroll.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  friction(value: number | Resource): ScrollAttribute;

  /**
   * Called to setting the scroll snap options.
   *
   * @param { ScrollSnapOptions } value - options for scroll snap.
   * @returns { ScrollAttribute } the attribute of the scroll.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Sets the scroll snapping mode.
   *
   * @param { ScrollSnapOptions } value - Scroll snapping mode.
   * @returns { ScrollAttribute } the attribute of the scroll.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  scrollSnap(value: ScrollSnapOptions): ScrollAttribute;

  /**
   * Determines whether the scroll view stops on multiples of the content size when the user scrolls.
   *
   * @param { boolean } value - A boolean value determines whether paging is enabled for scroll.
   * @returns { ScrollAttribute } the attribute of the scroll.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Sets whether to enable the swipe-to-turn-pages feature.
   *
   * @param { boolean } value - Whether to enable the swipe-to-turn-pages feature. Default value: false.
   * The value <em>true</em> means to enable the swipe-to-turn-pages feature, and <em>false</em> means the opposite.
   * @returns { ScrollAttribute } the attribute of the scroll.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  enablePaging(value: boolean): ScrollAttribute;
  
  /**
   * Sets the initial scrolling offset.
   *
   * @param { OffsetOptions } value - Initial scrolling offset. When the value specified is a percentage,
   * the initial scrolling offset is calculated as the product of the <em>Scroll</em> component's size
   * in the main axis direction and the percentage value.
   * @returns { ScrollAttribute } the attribute of the scroll.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  initialOffset(value: OffsetOptions): ScrollAttribute;
}

/**
 * Represents the callback triggered when the <em>Scroll</em> component scrolls.
 * 
 * <p><strong>NOTE</strong>
 * <br>If the <em>onScrollFrameBegin</em> event and <em>scrollBy</em> method are used to implement nested scrolling,
 * set the <em>edgeEffect</em> attribute of the scrollable child component to <em>None</em>. For example,
 * if a <em>List</em> is nested in the <em>Scroll</em> component, <em>edgeEffect</em> of the <em>List</em> must be set to <em>EdgeEffect.None</em>.
 * </p>
 * 
 * @typedef { function } ScrollOnScrollCallback
 * @param { number } xOffset - Horizontal offset per frame during scrolling. A positive offset indicates scrolling to the left,
 * and a negative offset indicates scrolling to the right.
 * <br>Unit: vp
 * @param { number } yOffset - Vertical offset per frame during scrolling.
 * A positive offset indicates scrolling upward, and a negative offset indicates scrolling downward.
 * <br>Unit: vp
 * @param { ScrollState } scrollState - Current scrolling state.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare type ScrollOnScrollCallback = (xOffset: number, yOffset: number, scrollState: ScrollState) => void;

/**
  * Called before scroll to allow developer to control real offset the Scroll can scroll.
  *
  * @typedef { function } ScrollOnWillScrollCallback
  * @param { number } xOffset - Horizontal offset per frame during scrolling.
  * A positive offset indicates scrolling to the left, and a negative offset indicates scrolling to the right.
  * <br>Unit: vp
  * @param { number } yOffset - offset per frame during scrolling.
  * A positive offset indicates scrolling upward, and a negative offset indicates scrolling downward.
  * <br>Unit: vp
  * @param { ScrollState } scrollState - Current scrolling state.
  * @param { ScrollSource } scrollSource - Source of the current scrolling operation.
  * @returns { void | OffsetResult } the remain offset for the Scroll,
  *     same as (xOffset, yOffset) when no OffsetResult is returned.
  * @syscap SystemCapability.ArkUI.ArkUI.Full
  * @crossplatform
  * @atomicservice
  * @since 12 dynamic
  */
declare type ScrollOnWillScrollCallback =
 (xOffset: number, yOffset: number, scrollState: ScrollState, scrollSource: ScrollSource) => void | OffsetResult;


/**
 * callback of Scroll, using in onDidZoom.
 *
 * @typedef { function } ScrollOnDidZoomCallback
 * @param { number } scale - current zoom scale.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20 dynamic
 */
declare type ScrollOnDidZoomCallback = (scale: number) => void;

/**
 * Defines Scroll Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Scroll Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines Scroll Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 * @noninterop
 */
declare const Scroll: ScrollInterface;

/**
 * Defines Scroll Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Scroll Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines Scroll Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 * @noninterop
 */
declare const ScrollInstance: ScrollAttribute;
