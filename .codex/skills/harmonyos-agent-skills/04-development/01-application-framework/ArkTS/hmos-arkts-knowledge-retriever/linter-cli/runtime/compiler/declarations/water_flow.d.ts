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
 * function that returns item main size by index.
 * 
 * @typedef { function } GetItemMainSizeByIndex
 * @param { number } index - Index of the target water flow item.<br>Value range: [0, total number of child nodes - 1].
 * @returns { number } main size of the FlowItem at index
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare type GetItemMainSizeByIndex = (index: number) => number;

/**
 * Describes the configuration of the water flow item section.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
*/
declare class SectionOptions {
  /**
   * The number of FlowItems in this section.
   *
   * @type { number } itemsCount - Number of water flow items in the section. The value must be a positive integer.
   * If the <em>splice</em>, <em>push</em>, or <em>update</em> APIs receive a section
   * where the <em>itemsCount</em> value is less than 0, these APIs will not be executed.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  itemsCount: number;

  /**
   * The columns of this section in vertical layout, or rows in horizontal layout.
   *
   * @type { ?number } crossCount - Number of columns (in vertical layout) or rows (in horizontal layout).
   * <br> If the value is less than 1, the default value is used.
   * @default 1 one column in vertical layout, or one row in horizontal layout
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  crossCount?: number;

  /**
   * Callback used to obtain the main axis size,in vp, of the water flow item at a specified index during
   * the layout process of the WaterFlow component.
   * 
   * <p><strong>NOTE</strong>
   * <br>1. When both <em>onGetItemMainSizeByIndex</em> and the width or height attribute of the water flow item are used,
   * the main axis size is determined by the return value of <em>onGetItemMainSizeByIndex</em>,
   * which will override the main axis length of water flow item.
   * <br>2. Using <em>onGetItemMainSizeByIndex</em> can improve the efficiency of jumping to a specific position or index in the <em>WaterFlow</em> component.
   * Avoid mixing the use of <em>onGetItemMainSizeByIndex</em> with sections that do not have it set, as this can cause layout exceptions.
   * <br>3. If <em>onGetItemMainSizeByIndex</em> returns a negative number, the height of the water flow item is 0.
   * </p>
   *
   * @type { ?GetItemMainSizeByIndex } onGetItemMainSizeByIndex - function that returns item main size by index
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onGetItemMainSizeByIndex?: GetItemMainSizeByIndex;

  /**
   * Gap between columns. If this parameter is not set, the value of columnsGap for the water flow is used.
   * If this parameter is set to an invalid value, 0 vp is used.
   * 
   * @type { ?Dimension } columnsGap - column gap of this section
   * same with columnsGap of WaterFlow if not set
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  columnsGap?: Dimension;

  /**
   * Gap between rows. If this parameter is not set, the value of <em>rowsGap</em> for the water flow is used.
   * If this parameter is set to an invalid value, 0 vp is used.
   *
   * @type { ?Dimension } rowsGap - row gap of this section
   * same with rowsGap of WaterFlow if not set
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  rowsGap?: Dimension;

  /**
   * Padding of the section. A value of the Length type specifies the margin for all the four sides.
   *
   * @type { ?(Margin | Dimension) } margin - outer margin of this section
   * @default {top: 0, right: 0, bottom: 0, left: 0}
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  margin?: Margin | Dimension;
}

/**
 * Describes the water flow item sections.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare class WaterFlowSections {
  /**
   * A constructor used to create a <em>WaterFlowSections</em> object.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  constructor();

  /**
   * Changes sections by removing or replacing an existing section and/or adding a section.
   *
   * @param { number } start - Zero-based index at which the changing starts. The value is converted to an integer.
   * <br><em>NOTE</em>
   * <br>1. A negative index counts back from the end of the section list.
   * If -<em>WaterFlowSections.length()</em> <= <em>start</em> < <em>0</em>, <em>start</em> + <em>array.length</em> is used.
   * <br>2. If <em>start</em> < -<em>WaterFlowSections.length()</em>, <em>0</em> is used.
   * <br>3. If <em>start</em> >= <em>WaterFlowSections.length()</em>, a new section is added at the end.
   * @param { number } [deleteCount] - Number of sections to be deleted from the position specified by <em>start</em>.
   * <br><em>NOTE</em>
   * <br>1. If <em>deleteCount</em> is omitted, or if its value is greater than or equal to the number of sections from
   * the position specified by <em>start</em> to the end of the <em>WaterFlowSections</em>,
   * then all sections from the position specified by <em>start</em> to the end of the <em>WaterFlowSections</em> will be deleted.
   * <br>2. If <em>deleteCount</em> is <em>0</em> or a negative number, no sections are deleted.
   * @param { Array<SectionOptions> } [sections] - Sections to add to the section list, beginning from the position specified by <em>start</em>.
   * If no section is specified, <em>splice()</em> will only delete sections from the <em>WaterFlow</em> component.
   * @returns { boolean } Whether the splice was successful.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  splice(start: number, deleteCount?: number, sections?: Array<SectionOptions>): boolean;

  /**
   * Adds the specified sections to the end of the <em>WaterFlow</em> component.
   *
   * @param { SectionOptions } section - Sections to add to the end of the <em>WaterFlow</em> component.
   * @returns { boolean } Whether the push was successful.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  push(section: SectionOptions): boolean;

  /**
   * Updates the configuration of a specified water flow item section.
   *
   * @param { number } sectionIndex - Zero-based index of the water flow item section to update. The value is converted to an integer.
   * <br><em>NOTE</em>
   * <br>1. A negative index counts back from the end of the section list.
   * If -<em>WaterFlowSections.length()</em> <= <em>sectionIndex</em> < <em>0</em>, <em>sectionIndex</em> + <em>array.length</em> is used.
   * <br>2. If <em>sectionIndex</em> < -<em>WaterFlowSections.length()</em>, <em>0</em> is used.<br>
   * 3. If <em>sectionIndex</em> >= <em>WaterFlowSections.length()</em>, a new section is added at the end.
   * @param { SectionOptions } section - New section configuration.
   * @returns { boolean } Whether the update was successful.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  update(sectionIndex:number, section: SectionOptions): boolean;

  /**
   * Obtains the configuration of all sections in the <em>WaterFlow</em> component.
   *
   * @returns { Array<SectionOptions> } Returns all the section options in the WaterFlow.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  values(): Array<SectionOptions>;

  /**
   * Obtains the number of sections in the <em>WaterFlow</em> component.
   *
   * @returns { number } Returns section counts in the WaterFlow.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  length(): number;
}

/**
 * Declare layout modes of WaterFlow.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare enum WaterFlowLayoutMode {
  /**
   * Default layout mode where water flow items are arranged from top to bottom. Items in the viewport depend on the layout of all items above them.
   * As such, in cases of redirection or switching the number of columns, the layout of all items above the viewport must be recalculated.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  ALWAYS_TOP_DOWN = 0,

  /**
   * Sliding window mode. This mode only takes into account the layout in the viewport,
   * without depending on water flow items above the viewport.
   * 
   * <p><strong>NOTE</strong>
   * <br> 1. During a non-animated redirection to a distant location, water flow items are laid out forward or backward based on the target position.
   * If the user then swipes back to the position prior to the redirection, the layout of the content may not be consistent with its previous state.
   * This can lead to misalignment of the top nodes when the user swipes back to the top after the redirection.
   * To counteract this issue, in this layout mode, the layout will be automatically adjusted after reaching the top of
   * the viewport to ensure that the top is aligned.
   * If there are multiple sections, adjustments will be made to the sections within the viewport when scrolling ends.
   * <br> 2. The total offset returned by the currentOffset API of scroller is inaccurate after a redirection or data update.
   * This offset will be recalibrated when the user swipes back to the top.
   * <br> 3. If a jump action (for example, by calling scrollToIndex without animation or scrollEdge) and
   * an input offset (such as from a swipe gesture or a scrolling animation) are both initiated within the same frame, both will be executed.
   * <br> 4. If the scrollToIndex API is called without animation to jump to a distant position (beyond the range of visible water flow items in the window),
   * the total offset is calculated in the sliding window mode.
   * </p>
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  SLIDING_WINDOW = 1,
}

/**
 * Defines the water flow options.
 *
 * @interface WaterFlowOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Defines the water flow options.
 *
 * @interface WaterFlowOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provides parameters of the <em>WaterFlow</em> component.
 *
 * @interface WaterFlowOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare interface WaterFlowOptions {
  /**
   * Describes the water flow footer.
   *
   * @type { ?CustomBuilder }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Describes the water flow footer.
   *
   * @type { ?CustomBuilder }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Footer of the WaterFlow component.
   *
   * @type { ?CustomBuilder }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  footer?: CustomBuilder;

  /**
   * Footer of the WaterFlow component.
   *
   * @type { ?ComponentContent }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  footerContent?: ComponentContent;

  /**
   * Describes the water flow scroller.
   *
   * @type { ?Scroller }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Describes the water flow scroller.
   *
   * @type { ?Scroller }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Controller of the scrollable component, bound to the scrollable component.
   * 
   * <p><strong>NOTE</strong>
   * <br>The scroller cannot be bound to other scrollable components, such as ArcList, List, Grid, or Scroll.
   * </p>
   *
   * @type { ?Scroller }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  scroller?: Scroller;

  /**
   * Water flow item sections. Different sections can have different numbers of columns.
   * 
   * <p><strong>NOTE</strong>
   * <br>1. When <em>sections</em> is used, the <em>columnsTemplate</em> and <em>rowsTemplate</em> attributes are ignored.
   * <br>2. When <em>sections</em> is used, the footer cannot be set separately. The last section can function as the footer.
   * </p>
   *
   * @type { ?WaterFlowSections } sections - sections with different cross count
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  sections?: WaterFlowSections;

  /**
   * Layout mode of the <em>WaterFlow</em> component.
   *
   * @type { ?WaterFlowLayoutMode }
   * @default ALWAYS_TOP_DOWN
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  layoutMode?: WaterFlowLayoutMode;
}

/**
 * Defines a UIWaterFlowEvent which is used to set event to target component.
 *
 * @extends UIScrollableCommonEvent
 * @interface UIWaterFlowEvent
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 19 dynamic
 */
declare interface UIWaterFlowEvent extends UIScrollableCommonEvent {
  /**
   * Set or reset the callback which is triggered when the WaterFlow will scroll.
   *
   * @param { OnWillScrollCallback | undefined } callback - callback function, triggered when the WaterFlow will scroll.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  setOnWillScroll(callback: OnWillScrollCallback | undefined): void;

  /**
   * Set or reset the callback which is triggered when WaterFlow view did scroll.
   *
   * @param { OnScrollCallback | undefined } callback - callback function, triggered when the WaterFlow did scroll.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  setOnDidScroll(callback: OnScrollCallback | undefined): void;

  /**
   * Set or reset the callback which is triggered when the start and end positions of the display change.
   *
   * @param { OnWaterFlowScrollIndexCallback | undefined } callback - callback function, triggered when start or
   *     end positions of the display change.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  setOnScrollIndex(callback: OnWaterFlowScrollIndexCallback | undefined): void;
}

/**
 * Defines the callback type used in onScrollIndex.
 *
 * @typedef {function} OnWaterFlowScrollIndexCallback
 * @param {number} first - the first index in visible content.
 * @param {number} last - the last index in visible content.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 19 dynamic
 */
declare type OnWaterFlowScrollIndexCallback = (first: number, last: number) => void;

/**
 * Defines the water flow interface.
 *
 * @interface WaterFlowInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Defines the water flow interface.
 *
 * @interface WaterFlowInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the water flow interface.
 *
 * @interface WaterFlowInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 * @noninterop
 */
interface WaterFlowInterface {
  /**
   * WaterFlow is returned when the parameter is transferred. Only support api: scrollToIndex
   *
   * @param { WaterFlowOptions } options
   * @returns { WaterFlowAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * WaterFlow is returned when the parameter is transferred. Only support api: scrollToIndex
   *
   * @param { WaterFlowOptions } options
   * @returns { WaterFlowAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * WaterFlow is returned when the parameter is transferred. Only support api: scrollToIndex
   *
   * @param { WaterFlowOptions } options
   * @returns { WaterFlowAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  (options?: WaterFlowOptions): WaterFlowAttribute;
}

/**
 * Defines the water flow attribute.
 * 
 * @extends CommonMethod<WaterFlowAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Defines the water flow attribute.
 * 
 * @extends CommonMethod<WaterFlowAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the water flow attribute.
 * 
 * @extends ScrollableCommonMethod<WaterFlowAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 * @noninterop
 */
declare class WaterFlowAttribute extends ScrollableCommonMethod<WaterFlowAttribute> {
  /**
   * This parameter specifies the number of columns in the current waterflow.
   *
   * @param { string } value
   * @returns { WaterFlowAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * This parameter specifies the number of columns in the current waterflow.
   *
   * @param { string } value
   * @returns { WaterFlowAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the number of columns in the layout. If this attribute is not set, one column is used by default.
   *
   * @param { string } value - Number of columns in the layout.<br>Default value: <em>'1fr'</em>
   * @returns { WaterFlowAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  columnsTemplate(value: string): WaterFlowAttribute;
  
  /**
   * Sets the number of columns in the layout. If this attribute is not set, one column is used by default.
   *
   * @param { string | ItemFillPolicy } value - Number of columns in the layout.<br>Default value: <em>'1fr'</em>
   * @returns { WaterFlowAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  columnsTemplate(value: string | ItemFillPolicy): WaterFlowAttribute;

  /**
   * This parameter specifies the min or max size of each item.
   *
   * @param { ConstraintSizeOptions } value
   * @returns { WaterFlowAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * This parameter specifies the min or max size of each item.
   *
   * @param { ConstraintSizeOptions } value
   * @returns { WaterFlowAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the size constraints of the child components during layout.
   *
   * @param { ConstraintSizeOptions } value - Size constraints of the child components during layout.
   * If the value specified is less than 0, this parameter does not take effect.
   * @returns { WaterFlowAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  itemConstraintSize(value: ConstraintSizeOptions): WaterFlowAttribute;

  /**
   * Set the number of rows in the current waterflow.
   *
   * @param { string } value
   * @returns { WaterFlowAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Set the number of rows in the current waterflow.
   *
   * @param { string } value
   * @returns { WaterFlowAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the number of rows in the layout. If this attribute is not set, one row is used by default.
   *
   * @param { string } value - Number of rows in the layout.<br>Default value: <em>'1fr'</em>
   * @returns { WaterFlowAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  rowsTemplate(value: string): WaterFlowAttribute;

  /**
   * Set the spacing between columns.
   *
   * @param { Length } value
   * @returns { WaterFlowAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Set the spacing between columns.
   *
   * @param { Length } value
   * @returns { WaterFlowAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the gap between columns.
   *
   * @param { Length } value - Gap between columns.<br>Default value: <em>0</em>
   * <br>Value range: [0, +∞).
   * @returns { WaterFlowAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  columnsGap(value: Length): WaterFlowAttribute;

  /**
   * Set the spacing between rows.
   *
   * @param { Length } value
   * @returns { WaterFlowAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Set the spacing between rows.
   *
   * @param { Length } value
   * @returns { WaterFlowAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the gap between rows.
   *
   * @param { Length } value - Gap between rows.<br>Default value: <em>0</em>
   * @returns { WaterFlowAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  rowsGap(value: Length): WaterFlowAttribute;

  /**
   * Control layout direction of the WaterFlow.
   *
   * @param { FlexDirection } value
   * @returns { WaterFlowAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Control layout direction of the WaterFlow.
   *
   * @param { FlexDirection } value
   * @returns { WaterFlowAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the main axis direction of the layout.
   *
   * @param { FlexDirection } value -  Main axis direction of the layout.<br>Default value: <em>FlexDirection.Column</em>
   * @returns { WaterFlowAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  layoutDirection(value: FlexDirection): WaterFlowAttribute;

  /**
   * Called to setting the nested scroll options.
   *
   * @param { NestedScrollOptions } value - options for nested scrolling.
   * @returns { WaterFlowAttribute } the attribute of the water flow.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Sets the nested scrolling mode in the forward and backward directions to implement scrolling linkage with the parent component.
   *
   * @param { NestedScrollOptions } value - Nested scrolling options.
   * @returns { WaterFlowAttribute } the attribute of the water flow.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  nestedScroll(value: NestedScrollOptions): WaterFlowAttribute;

  /**
   * Called when setting whether to enable scroll by gesture or mouse.
   * @param { boolean } value
   * @returns { WaterFlowAttribute } The attribute of the waterflow
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets whether to support scroll gestures.
   * 
   * @param { boolean } value - Whether to support scroll gestures.<br>Default value: <em>true</em>
   * @returns { WaterFlowAttribute } The attribute of the waterflow
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  enableScrollInteraction(value: boolean): WaterFlowAttribute;

  /**
   * Called to setting the friction.
   * @param { number | Resource } value - options for scrolling friction.
   * @returns { WaterFlowAttribute } the attribute of the water flow.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Sets the friction coefficient. It applies only to gestures in the scrolling area,
   * and it affects only indirectly the scroll chaining during the inertial scrolling process.
   * 
   * @param { number | Resource } value - Friction coefficient.<br>Default value: <em>0.9</em> for wearable devices and <em>0.6</em> for non-wearable devices.
   * <br>Since API version 11, the default value for non-wearable devices is <em>0.7</em>.
   * <br>Since API version 12, the default value for non-wearable devices is <em>0.75</em>.
   * <br>Value range: (0, +∞).
   * <br>If the value is less than or equal to 0, the default value is used.
   * @returns { WaterFlowAttribute } the attribute of the water flow.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  friction(value: number | Resource): WaterFlowAttribute;

  /**
   * Called to set number of flow items to be preloaded (cached) in LazyForEach.
   * @param { number } value - number of flow items to be preloaded (cached).
   * @returns { WaterFlowAttribute } the attribute of the water flow.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Sets the number of items to be cached.
   *  
   * @param { number } value - Number of water flow items to be preloaded (cached).
   * <br>Default value: number of nodes visible on the screen, with the maximum value of 16
   * <br>Value range: [0, +∞).
   * <br>Values less than 0 are treated as <em>1</em>.
   * @returns { WaterFlowAttribute } the attribute of the water flow.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  cachedCount(value: number): WaterFlowAttribute;

  /**
   * Sets the number of water flow items to be cached (preloaded) and specifies whether to display the cached nodes.
   * 
   * @param { number } count - Number of water flow items to be preloaded (cached).
   * <br>Default value: number of nodes visible on the screen, with the maximum value of 16
   * <br>Value range: [0, +∞).
   * <br>Values less than 0 are treated as <em>1</em>.
   * @param { boolean } show - Whether to display the cached water flow items.
   * @returns { WaterFlowAttribute } the attribute of the water flow.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 14 dynamic
   */
  cachedCount(count: number, show: boolean): WaterFlowAttribute;

  /**
   * Set whether to synchronously load child nodes within one frame.
   *
   * @param { boolean } enable - Whether to synchronously load child nodes within one frame
   * @returns { WaterFlowAttribute } The attribute of the water flow.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  syncLoad(enable: boolean): WaterFlowAttribute;

  /**
   * Called when the water flow begins to arrive.
   *
   * @param { function } event
   * @returns { WaterFlowAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Called when the water flow begins to arrive.
   *
   * @param { function } event
   * @returns { WaterFlowAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Triggered when the component reaches the start.
   *
   * @param { function } event
   * @returns { WaterFlowAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  onReachStart(event: () => void): WaterFlowAttribute;

  /**
   * Called when the water flow reaches the end.
   *
   * @param { function } event
   * @returns { WaterFlowAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Called when the water flow reaches the end.
   *
   * @param { function } event
   * @returns { WaterFlowAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Triggered when the component reaches the end position.
   *
   * @param { function } event
   * @returns { WaterFlowAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  onReachEnd(event: () => void): WaterFlowAttribute;

  /**
   * Called when scrolling begin each frame.
   *
   * @param { function } event
   * @returns { WaterFlowAttribute } the attribute of the water flow.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Triggered when the component starts to scroll.
   *
   * @param { function } event
   * @returns { WaterFlowAttribute } the attribute of the water flow.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Called when scrolling begin each frame.
   * Anonymous Object Rectification.
   *
   * @param { OnScrollFrameBeginCallback } event - callback function, triggered when the scrolling begin each frame.
   * @returns { WaterFlowAttribute } the attribute of the water flow.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  onScrollFrameBegin(event: OnScrollFrameBeginCallback): WaterFlowAttribute;

  /**
   * Triggered when the first or last item displayed in the component changes.
   * It is triggered once when the component is initialized.
   *
   * @param { function } event - Callback function, triggered when the first or last item
   * displayed in the waterflow changes.
   * "first": the index of the first item displayed in the waterflow,
   * "last": the index of the last item displayed in the waterflow.
   * @returns { WaterFlowAttribute } the attribute of the water flow.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  onScrollIndex(event: (first: number, last: number) => void): WaterFlowAttribute;
}

/**
 * Defines WaterFlow Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Defines WaterFlow Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines WaterFlow Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
/**
 * Defines WaterFlow Component.
 * It is recommended to use LazyForEach or Repeat to generate child components.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @atomicservice
 * @since 20 dynamic
 * @noninterop
 */
declare const WaterFlow: WaterFlowInterface;

/**
 * Defines WaterFlow Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Defines WaterFlow Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines WaterFlow Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 * @noninterop
 */
declare const WaterFlowInstance: WaterFlowAttribute;
