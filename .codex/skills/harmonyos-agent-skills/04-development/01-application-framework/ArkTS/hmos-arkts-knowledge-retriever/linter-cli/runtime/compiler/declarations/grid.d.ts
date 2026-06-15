/*
 * Copyright (c) 2021-2026 Huawei Device Co., Ltd.
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
 * Define start line info used in GridLayoutOptions.
 *
 * @interface StartLineInfo
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @stagemodelonly
 * @since 23 dynamic
 */
declare interface StartLineInfo {
  /**
   * Define the start index of the row where the target index or offset is located. 
   *
   * @type { int }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @stagemodelonly
   * @since 23 dynamic
   */
  startIndex: int;

  /**
   * Define the start row of the item with startIndex.
   *
   * @type { int }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @stagemodelonly
   * @since 23 dynamic
   */
  startLine: int;

  /**
   * Define the offset between the top of the item with startIndex and the top of the grid.
   *
   * @type { double }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @stagemodelonly
   * @since 23 dynamic
   */
  startOffset: double;

  /**
   * Define the offset between the top of the first item and the top of the grid.
   *
   * @type { double }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @stagemodelonly
   * @since 23 dynamic
   */
  totalOffset: double;
}

/**
 * Defines the callback type used in onGetStartIndexByOffset of GridLayoutOptions.
 *
 * @typedef { function } OnGetStartIndexByOffsetCallback
 * @param { double } totalOffset - The total offset to scroll to.
 * @returns { StartLineInfo }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @stagemodelonly
 * @since 23 dynamic
 */
declare type OnGetStartIndexByOffsetCallback = (totalOffset: double) => StartLineInfo;

/**
 * Defines the callback type used in onGetStartIndexByIndex of GridLayoutOptions.
 *
 * @typedef { function } OnGetStartIndexByIndexCallback
 * @param { int } targetIndex - The target index to scroll to.
 * @returns { StartLineInfo }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @stagemodelonly
 * @since 23 dynamic
 */
declare type OnGetStartIndexByIndexCallback = (targetIndex: int) => StartLineInfo;

/**
 * The options to help grid layout
 *
 * @interface GridLayoutOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * The options to help grid layout
 *
 * @interface GridLayoutOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare interface GridLayoutOptions {
  /**
   * The size of most grid items, in [rows, columns], generally [1, 1]
   *
   * @type { [number, number] } regularSize
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * The size of most grid items, in [rows, columns], generally [1, 1]
   *
   * @type { [number, number] } regularSize
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  regularSize: [number, number];

  /**
   * The indexes of grid items with irregular size.
   *
   * @type { ?number[] } irregularIndexes
   * @default number[] no irregular grid item
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * The indexes of grid items with irregular size.
   *
   * @type { ?number[] } irregularIndexes
   * @default number[] no irregular grid item
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  irregularIndexes?: number[];

  /**
   * Called to return the size of the irregular grid items with the specified index in [rows, columns].
   *
   * @type { ?function } onGetIrregularSizeByIndex, 
   * all irregular grid items will occupy an entire line if not set
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called to return the size of the irregular grid items with the specified index in [rows, columns].
   *
   * @type { ?function } onGetIrregularSizeByIndex, 
   * all irregular grid items will occupy an entire line if not set
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  onGetIrregularSizeByIndex?: (index: number) => [number, number]

  /**
   * Called to return the size of the grid items with the specified index in 
   * [rowStart, columnStart, rowSpan, columnSpan].
   *
   * @type { ?function } onGetRectByIndex
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Called to return the size of the grid items with the specified index in 
   * [rowStart, columnStart, rowSpan, columnSpan].
   *
   * @type { ?function } onGetRectByIndex
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onGetRectByIndex?: (index: number) => [number, number, number, number]

  /**
 	 * Called to return the StartLineInfo based on total offset for the fast or reverse sliding.
 	 *
 	 * @type { ?OnGetStartIndexByOffsetCallback } onGetStartIndexByOffset
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @stagemodelonly
   * @since 23 dynamic
   */
  onGetStartIndexByOffset?: OnGetStartIndexByOffsetCallback;
 	 
  /**
   * Called to return the StartLineInfo based on target index for the scrollToIndex operation.
   *
   * @type { ?OnGetStartIndexByIndexCallback } onGetStartIndexByIndex
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @stagemodelonly
   * @since 23 dynamic
   */
  onGetStartIndexByIndex?: OnGetStartIndexByIndexCallback;
}

/**
 * Defines the grid interface.
 *
 * @interface GridInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the grid interface.
 *
 * @interface GridInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the grid interface.
 *
 * @interface GridInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 * @noninterop
 */
interface GridInterface {
  /**
   * Grid is returned when the parameter is transferred.
   *
   * @param { Scroller } scroller
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Grid is returned when the parameter is transferred.
   *
   * @param { Scroller } scroller - Controller bound to the grid
   * @param { GridLayoutOptions } layoutOptions - The options to help grid layout
   * @returns { GridAttribute } The attribute of the grid
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Grid is returned when the parameter is transferred.
   *
   * @param { Scroller } scroller - Controller bound to the grid
   * @param { GridLayoutOptions } layoutOptions - The options to help grid layout
   * @returns { GridAttribute } The attribute of the grid
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  (scroller?: Scroller, layoutOptions?: GridLayoutOptions): GridAttribute;
}

/**
 * The enum of property layoutDirection
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * The enum of property layoutDirection
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * The enum of property layoutDirection
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare enum GridDirection {
  /**
   * The row direction.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * The row direction.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * The row direction.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  Row,

  /**
   * The column direction.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * The column direction.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * The column direction.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  Column,

  /**
   * The row reverse direction.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * The row reverse direction.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * The row reverse direction.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  RowReverse,

  /**
   * The column reverse direction.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * The column reverse direction.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * The column reverse direction.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  ColumnReverse,
}

/**
 * Declare grid item alignment status
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare enum GridItemAlignment {

  /**
   * Use the default alignment of the Grid.
   * 
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  DEFAULT = 0,

  /**
   * The height of the tallest grid item in the current line 
   * will be used as the height for the other items in the same line
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  STRETCH = 1,
}

/**
 * The attribute of scrollbar to compute scrollbar position and height.
 *
 * @interface ComputedBarAttribute
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * The attribute of scrollbar to compute scrollbar position and height.
 *
 * @interface ComputedBarAttribute
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare interface ComputedBarAttribute {
  /**
   * The offset of the grid.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * The offset of the grid.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  totalOffset: number;

  /**
   * The range of the grid.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * The range of the grid.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  totalLength: number;
}

/**
 * Defines a UIGridEvent which is used to set event to target component.
 *
 * @extends UIScrollableCommonEvent
 * @interface UIGridEvent
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 19 dynamic
 */
declare interface UIGridEvent extends UIScrollableCommonEvent {
  /**
   * Set or reset the callback which is triggered when the Grid will scroll.
   *
   * @param { OnWillScrollCallback | undefined } callback - callback function, triggered when the Grid will scroll.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  setOnWillScroll(callback: OnWillScrollCallback | undefined): void;

  /**
   * Set or reset the callback which is triggered when the Grid did scroll.
   *
   * @param { OnScrollCallback | undefined } callback - callback function, triggered when the Grid did scroll.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  setOnDidScroll(callback: OnScrollCallback | undefined): void;

  /**
   * Set or reset the callback which is triggered when the start and end positions of the display change.
   *
   * @param { OnGridScrollIndexCallback | undefined } callback - callback function, triggered when start or
   *     end positions of the display change.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  setOnScrollIndex(callback: OnGridScrollIndexCallback | undefined): void;
}

/**
 * Defines the callback type used in onScrollIndex.
 *
 * @typedef {function} OnGridScrollIndexCallback
 * @param {number} first - the first index in visible content.
 * @param {number} last - the last index in visible content.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 19 dynamic
 */
declare type OnGridScrollIndexCallback = (first: number, last: number) => void;

/**
 * Defines the grid attribute functions.
 *
 * @extends CommonMethod<GridAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the grid attribute functions.
 *
 * @extends CommonMethod<GridAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the grid attribute functions.
 *
 * @extends ScrollableCommonMethod<GridAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 * @noninterop
 */
declare class GridAttribute extends ScrollableCommonMethod<GridAttribute> {
  /**
   * This parameter specifies the number of columns in the current grid layout.
   *
   * @param { string } value
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * This parameter specifies the number of columns in the current grid layout.
   *
   * @param { string } value
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * This parameter specifies the number of columns in the current grid layout.
   *
   * @param { string } value
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  columnsTemplate(value: string): GridAttribute;

  /**
   * This parameter specifies the number of columns in the current grid layout.
   *
   * @param { string | ItemFillPolicy } value
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  columnsTemplate(value: string | ItemFillPolicy): GridAttribute;

  /**
   * Lets you set the number of rows in the current grid layout,
   *
   * @param { string } value
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Lets you set the number of rows in the current grid layout,
   *
   * @param { string } value
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Lets you set the number of rows in the current grid layout,
   *
   * @param { string } value
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  rowsTemplate(value: string): GridAttribute;

  /**
   * Allows you to set the spacing between columns.
   *
   * @param { Length } value - Spacing between columns.<br>Default value: <em>0</em> <br>Unit: vp
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Allows you to set the spacing between columns.
   *
   * @param { Length } value - Spacing between columns.<br>Default value: <em>0</em> <br>Unit: vp
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Allows you to set the spacing between columns.
   *
   * @param { Length } value - Spacing between columns.<br>Default value: <em>0</em> <br>Unit: vp
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  columnsGap(value: Length): GridAttribute;

  /**
   * Lets you set the spacing between rows.
   *
   * @param { Length } value - Spacing between rows.<br>Default value: <em>0</em> <br>Unit: vp
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Lets you set the spacing between rows.
   *
   * @param { Length } value - Spacing between rows.<br>Default value: <em>0</em> <br>Unit: vp
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Lets you set the spacing between rows.
   *
   * @param { Length } value - Spacing between rows.<br>Default value: <em>0</em> <br>Unit: vp
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  rowsGap(value: Length): GridAttribute;

  /**
   * This parameter specifies the width of the scroll bar.
   *
   * @param { number | string } value - Scrollbar width.<br>Default value: <em>4</em> <br>Unit: vp
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * This parameter specifies the width of the scroll bar.
   *
   * @param { number | string } value - Scrollbar width.<br>Default value: <em>4</em> <br>Unit: vp
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * This parameter specifies the width of the scroll bar.
   *
   * @param { number | string } value - Scrollbar width.<br>Default value: <em>4</em> <br>Unit: vp
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  scrollBarWidth(value: number | string): GridAttribute;

  /**
   * Set the color of the scroll bar.
   *
   * @param { Color | number | string } value - Scrollbar color.<br>Default value: '#182431'
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Set the color of the scroll bar.
   *
   * @param { Color | number | string } value - Scrollbar color.<br>Default value: '#182431'
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set the color of the scroll bar.
   *
   * @param { Color | number | string } value - Scrollbar color.<br>Default value: '#182431'
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  scrollBarColor(value: Color | number | string): GridAttribute;

  /**
   * Sets the scrollbar color.
   *
   * @param { Color | number | string | Resource } color - Scrollbar color.<br>Default value: <em>'\#182431'</em> (40% opacity)
   * <br>A number value indicates a HEX color in RGB or ARGB format, for example, <em>0xffffff</em>.
   * A string value indicates a color in RGB or ARGB format, for example, <em>'#ffffff'</em>.
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  scrollBarColor(color: Color | number | string | Resource): GridAttribute;

  /**
   * Let you set the scrollbar state.
   *
   * @param { BarState } value - Scrollbar state.<br>Default value: <em>BarState.Off</em>
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Let you set the scrollbar state.
   *
   * @param { BarState } value - Scrollbar state.<br>Default value: <em>BarState.Auto</em>
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Lets you set the scrollbar state.
   *
   * @param { BarState } value - Scrollbar state.<br>Default value: <em>BarState.Auto</em>
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  scrollBar(value: BarState): GridAttribute;

  /**
   * Set scrollbar position.
   *
   * @param { function } event - callback of grid scroll,
   * index is the current first displayed item, offset is the grid offset,
   * return ComputedBarAttribute to update scrollbar position and height.
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set scrollbar position.
   *
   * @param { function } event - callback of grid scroll,
   * index is the current first displayed item, offset is the grid offset,
   * return ComputedBarAttribute to update scrollbar position and height.
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  onScrollBarUpdate(event: (index: number, offset: number) => ComputedBarAttribute): GridAttribute;

  /**
   * Called when the first item displayed in the grid changes.
   *
   * @param { function } event - of grid scroll,
   * first is the index of the first item of the grid.
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the first or last item displayed in the grid changes.
   *
   * @param { function } event - of grid scroll,
   * first is the index of the first item displayed in the grid, 
   * last is the index of the last item displayed in the grid.
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the first or last item displayed in the grid changes.
   *
   * @param { function } event - of grid scroll,
   * first is the index of the first item displayed in the grid, 
   * last is the index of the last item displayed in the grid.
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  onScrollIndex(event: (first: number, last: number) => void): GridAttribute;

  /**
   * Set the number of rows of grid items to be cached (preloaded).
   *
   * @param { number } value - Number of rows of GridItems to be preloaded.<br>Default value: <em>1</em>
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Set the number of rows of grid items to be cached (preloaded).
   *
   * @param { number } value - Number of rows of GridItems to be preloaded.<br>Default value: <em>1</em>
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set the number of rows of grid items to be cached (preloaded).
   *
   * @param { number } value - Number of rows of GridItems to be preloaded.
   *     <br>Default value: number of nodes visible on the screen, with the maximum value of 16
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  cachedCount(value: number): GridAttribute;

  /**
   * Set number of rows of GridItems to be preloaded (cached) in LazyForEach / Repeat.
   *
   * @param { number } count - number of rows of GridItems to be preloaded (cached).
   *     <br>Default value: number of nodes visible on the screen, with the maximum value of 16
   *     <br>Value range: [0, +∞).
   *     <br>Values less than 0 are treated as <em>1</em>.
   * @param { boolean } show - if true, cached items are displayed when clip is disabled.
   *     <br>Default value: <em>false</em>
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 14 dynamic
   */
  cachedCount(count: number, show: boolean): GridAttribute;

  /**
   * Set whether to enable edit mode.
   *
   * @param { boolean } value - Whether to enable edit mode.<br>Default value: <em>false</em>
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Set whether to enable edit mode.
   *
   * @param { boolean } value - Whether to enable edit mode.<br>Default value: <em>false</em>
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set whether to enable edit mode.
   *
   * @param { boolean } value - Whether to enable edit mode.<br>Default value: <em>false</em>
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  editMode(value: boolean): GridAttribute;

  /**
   * Set whether to enable multi-select.
   *
   * @param { boolean } value - Whether to enable multiselect.
   *     <br><em>false</em> (default): Multiselect is disabled.
   *     <br><em>true</em>: Multiselect is enabled.
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Set whether to enable multi-select.
   *
   * @param { boolean } value - Whether to enable multiselect.
   *     <br><em>false</em> (default): Multiselect is disabled.
   *     <br><em>true</em>: Multiselect is enabled.
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set whether to enable multi-select.
   *
   * @param { boolean } value - Whether to enable multiselect.
   *     <br><em>false</em> (default): Multiselect is disabled.
   *     <br><em>true</em>: Multiselect is enabled.
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  multiSelectable(value: boolean): GridAttribute;

  /**
   * Set the maximum number of rows or columns to be displayed.
   *
   * @param { number } value - The maximum number of rows or columns to be displayed.
   *     <br>Default value: <em>Infinity</em>
   *     <br>Values less than 1 are treated as <em>Infinity</em>.
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Set the maximum number of rows or columns to be displayed.
   *
   * @param { number } value - The maximum number of rows or columns to be displayed.
   *     <br>Default value: <em>Infinity</em>
   *     <br>Values less than 0 are treated as <em>Infinity</em>.
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set the maximum number of rows or columns that can be displayed.
   *
   * @param { number } value - The maximum number of rows or columns to be displayed.
   *     <br>Default value: <em>Infinity</em>
   *     <br>Values less than 0 are treated as <em>Infinity</em>.
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  maxCount(value: number): GridAttribute;

  /**
   * Set the minimun number of rows or columns that can be displayed.
   *
   * @param { number } value - The minimun number of rows or columns that can be displayed. <br>Default value: <em>1</em>
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Set the minimun number of rows or columns that can be displayed.
   *
   * @param { number } value - The minimun number of rows or columns that can be displayed. <br>Default value: <em>1</em>
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set the minimun number of rows or columns that can be displayed.
   *
   * @param { number } value - The minimun number of rows or columns that can be displayed. <br>Default value: <em>1</em>
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  minCount(value: number): GridAttribute;

  /**
   * Set the height per row or width per column.
   *
   * @param { number } value - the height per row or width per column.
   *     <br>Default value: the size of the first element.
   *     <br>Unit: vp
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Set the height per row or width per column.
   *
   * @param { number } value - the height per row or width per column.
   *     <br>Default value: the size of the first element.
   *     <br>Unit: vp
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set the height per row or width per column.
   *
   * @param { number } value - the height per row or width per column.
   *     <br>Default value: the size of the first element.
   *     <br>Unit: vp
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  cellLength(value: number): GridAttribute;

  /**
   * Set the main axis layout direction of the grid.
   *
   * @param { GridDirection } value - main axis layout direction of the grid.<br>Default value: <em>GridDirection.Row</em>
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Set the main axis layout direction of the grid.
   *
   * @param { GridDirection } value - main axis layout direction of the grid.<br>Default value: <em>GridDirection.Row</em>
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set the main axis layout direction of the grid.
   *
   * @param { GridDirection } value - main axis layout direction of the grid.<br>Default value: <em>GridDirection.Row</em>
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  layoutDirection(value: GridDirection): GridAttribute;

  /**
   * Sets whether empty branches are supported in lazy loading.
   *
   * @param { boolean | undefined } supported - Indicates whether empty branches are supported in lazy loading.
   *     <br>Default value: false, passing undefined will restore the default value.
   *     <br>If set to false, LazyForEach or Repeat with virtualScroll does not allow empty branches.
   *     <br>If set to true, an empty branch of LazyForEach or Repeat with virtualScroll is treated as a node of
   *     zero size.
   * @returns { GridAttribute } the attribute of the Gird.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  supportEmptyBranchInLazyLoading(supported: boolean | undefined): GridAttribute;

  /**
   * Set whether to enable grid drag-and-drop animation.
   *
   * @param { boolean } value - Whether to enable drag-and-drop animation.
   *     <br><em>false</em> (default): drag-and-drop animation is disabled.
   *     <br><em>true</em>:  drag-and-drop animation is enabled.
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Set whether to enable grid drag-and-drop animation.
   *
   * @param { boolean } value - Whether to enable drag-and-drop animation.
   *     <br><em>false</em> (default): drag-and-drop animation is disabled.
   *     <br><em>true</em>:  drag-and-drop animation is enabled.
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set weather to enable grid drag-and-drop animation.
   *
   * @param { boolean } value - Whether to enable drag-and-drop animation.
   *     <br><em>false</em> (default): drag-and-drop animation is disabled.
   *     <br><em>true</em>:  drag-and-drop animation is enabled.
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  supportAnimation(value: boolean): GridAttribute;

  /**
   * After a listener is bound, the component can be dragged. After the drag occurs, a callback is triggered.
   * (To be triggered, press and hold for 170 milliseconds (ms))
   *
   * @param { function } event
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8 dynamic
   */
  /**
   * After a listener is bound, the component can be dragged. After the drag occurs, a callback is triggered.
   * (To be triggered, press and hold for 170 milliseconds (ms))
   *
   * @param { function } event
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10 dynamic
   */
  /**
   * After a listener is bound, the component can be dragged. After the drag occurs, a callback is triggered.
   * (To be triggered, press and hold for 170 milliseconds (ms))
   *
   * @param { function } event
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  /**
   * After a listener is bound, the component can be dragged. After the drag occurs, a callback is triggered.
   * (To be triggered, press and hold for 170 milliseconds (ms))
   * Anonymous Object Rectification.
   *
   * @param { function } event - callback function, triggered when a grid item starts to be dragged.
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  onItemDragStart(event: OnItemDragStartCallback): GridAttribute;

  /**
   * After binding, a callback is triggered when the component is dragged to the range of the component.
   *
   * @param { function } event
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * After binding, a callback is triggered when the component is dragged to the range of the component.
   *
   * @param { function } event
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * After binding, a callback is triggered when the component is dragged to the range of the component.
   *
   * @param { function } event
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  onItemDragEnter(event: (event: ItemDragInfo) => void): GridAttribute;

  /**
   * After binding, a callback is triggered when the drag moves within the range of a placeable component.
   *
   * @param { function } event
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * After binding, a callback is triggered when the drag moves within the range of a placeable component.
   *
   * @param { function } event
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * After binding, a callback is triggered when the drag moves within the range of a placeable component.
   *
   * @param { function } event
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  onItemDragMove(event: (event: ItemDragInfo, itemIndex: number, insertIndex: number) => void): GridAttribute;

  /**
   * After binding, a callback is triggered when the component is dragged out of the component range.
   *
   * @param { function } event
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * After binding, a callback is triggered when the component is dragged out of the component range.
   *
   * @param { function } event
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * After binding, a callback is triggered when the component is dragged out of the component range.
   *
   * @param { function } event
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  onItemDragLeave(event: (event: ItemDragInfo, itemIndex: number) => void): GridAttribute;

  /**
   * The component bound to this event can be used as the drag release target.
   * This callback is triggered when the drag behavior is stopped within the scope of the component.
   *
   * @param { function } event
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * The component bound to this event can be used as the drag release target.
   * This callback is triggered when the drag behavior is stopped within the scope of the component.
   *
   * @param { function } event
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * The component bound to this event can be used as the drag release target.
   * This callback is triggered when the drag behavior is stopped within the scope of the component.
   *
   * @param { function } event
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  onItemDrop(
    event: (event: ItemDragInfo, itemIndex: number, insertIndex: number, isSuccess: boolean) => void,
  ): GridAttribute;

  /**
   * Set the effect used when the scroll boundary is reached.
   *
   * @param { EdgeEffect } value - Scroll effect. For details, see EdgeEffect.
   *     <br>Default value: <em>EdgeEffect.None</em>
   * @returns { GridAttribute } The attribute of the grid
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set the effect used when the scroll boundary is reached.
   *
   * @param { EdgeEffect } value - Effect used when the scroll boundary is reached. The spring and shadow effects are supported.
   *     <br>Default value: <em>EdgeEffect.None</em>
   * @param { EdgeEffectOptions } options - Whether to enable the scroll effect when the component content is smaller than the component itself.
   *     The value <em>{ alwaysEnabled: true }</em> means to enable the scroll effect, and <em>{ alwaysEnabled: false }</em> means the opposite.
   *     <br>Default value: <em>{ alwaysEnabled: false }</em>
   * @returns { GridAttribute } The attribute of the grid
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  edgeEffect(value: EdgeEffect, options?: EdgeEffectOptions): GridAttribute;

  /**
   * Set the nested scrolling options. You can set the nested scrolling mode in the forward and backward directions
   * to implement scrolling linkage with the parent component.
   *
   * @param { NestedScrollOptions } value - options for nested scrolling.
   *     <br>Default value: <em>{ scrollForward: NestedScrollMode.SELF_ONLY, scrollBackward: NestedScrollMode.SELF_ONLY }</em>
   * @returns { GridAttribute } the attribute of the grid.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Set the nested scrolling options. You can set the nested scrolling mode in the forward and backward directions
   * to implement scrolling linkage with the parent component.
   *
   * @param { NestedScrollOptions } value - options for nested scrolling.
   *     <br>Default value: <em>{ scrollForward: NestedScrollMode.SELF_ONLY, scrollBackward: NestedScrollMode.SELF_ONLY }</em>
   * @returns { GridAttribute } the attribute of the grid.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  nestedScroll(value: NestedScrollOptions): GridAttribute;

  /**
   * Set whether to enable scroll by gesture or mouse.
   *
   * @param { boolean } value - Whether to support scroll gestures.<br>Default value: <em>true</em>
   * @returns { GridAttribute } The attribute of the grid
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set whether to enable scroll by gesture or mouse. When this attribute is set to <em>false</em>,
   * scrolling by finger or mouse is not supported, but the scroll controller API is not affected.
   *
   * @param { boolean } value - Whether to support scroll gestures.<br>Default value: <em>true</em>
   * @returns { GridAttribute } The attribute of the grid
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  enableScrollInteraction(value: boolean): GridAttribute;

  /**
   * Set the friction coefficient.
   *
   * @param { number | Resource } value - options for scrolling friction.
   * @returns { GridAttribute } the attribute of the grid.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set the friction coefficient. It applies only to gestures in the scrolling area,
   * and it affects only indirectly the scroll chaining during the inertial scrolling process.
   * A value less than or equal to 0 evaluates to the default value.
   *
   * @param { number | Resource } value - Friction coefficient.
   *     <br>Default value: <em>0.9</em> for wearable devices and <em>0.6</em> for non-wearable devices.
   *     <br>Since API version 11, the default value for non-wearable devices is <em>0.7</em>.
   *     <br>Since API version 12, the default value for non-wearable devices is <em>0.75</em>.
   * @returns { GridAttribute } the attribute of the grid.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  friction(value: number | Resource): GridAttribute;

  /**
   * Set the alignment of grid items.
   *
   * @param { Optional<GridItemAlignment> } alignment - Items alignment<br>Default value: <em>GridItemAlignment.DEFAULT</em>
   * @returns { GridAttribute } The attribute of the grid.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
    alignItems(alignment: Optional<GridItemAlignment>): GridAttribute;

  /**
     * Set the focus wrap mode of the grid.
     *
     * @param { Optional<FocusWrapMode> } mode - the focus wrap mode of the grid.
     * <br>Default value: **FocusWrapMode.DEFAULT**.
     * @returns { GridAttribute } the attribute of the grid.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20 dynamic
     */
    focusWrapMode(mode: Optional<FocusWrapMode>): GridAttribute;

  /**
   * Set whether to synchronously load child nodes within one frame.
   *
   * @param { boolean } enable - Whether to synchronously load child nodes within one frame.
   *     <br>Default value: <em>true<em/>
   * @returns { GridAttribute } The attribute of the grid.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  syncLoad(enable: boolean): GridAttribute;

  /**
   * Sets the edit mode options.
   *
   * @param { EditModeOptions } [options] - edit mode options.
   *     <br>Default value: <em>{ enableGatherSelectedItemsAnimation: false }</em>
   * @returns { GridAttribute } The attribute of the grid.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  editModeOptions(options?: EditModeOptions): GridAttribute;

  /**
   * Called When sliding the grid.
   *
   * @param { function } event - callback of grid scroll,
   * scrollOffset is offset per frame scrolling, ScrollState is current sliding state.
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called When sliding the grid.
   *
   * @param { function } event - callback of grid scroll,
   * scrollOffset is offset per frame scrolling, ScrollState is current sliding state.
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamiconly
   * @deprecated since 12
   * @useinstead common.ScrollableCommonMethod#onDidScroll
   */
  onScroll(event: (scrollOffset: number, scrollState: ScrollState) => void): GridAttribute;

  /**
   * Called when the grid begins to arrive.
   *
   * @param { function } event
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the grid begins to arrive.
   *
   * @param { function } event
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  onReachStart(event: () => void): GridAttribute;

  /**
   * Called when the grid reaches the end.
   *
   * @param { function } event
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the grid reaches the end.
   *
   * @param { function } event
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  onReachEnd(event: () => void): GridAttribute;

  /**
   * Called when the slider start.
   *
   * @param { function } event
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the slider start.
   *
   * @param { function } event
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  onScrollStart(event: () => void): GridAttribute;

  /**
   * Called when the slider stops.
   *
   * @param { function } event
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the slider stops.
   *
   * @param { function } event
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  onScrollStop(event: () => void): GridAttribute;

  /**
   * Called when scrolling begin each frame.
   *
   * @param { function } event - callback of grid scroll,
   * offset is the amount of sliding that is about to occur, state is current sliding state,
   * return number to actual sliding offset.
   * @returns { GridAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when scrolling begin each frame.
   *
   * @param { function } event - callback of grid scroll,
   * offset is the amount of sliding that is about to occur, state is current sliding state,
   * return number to actual sliding offset.
   * @returns { GridAttribute }
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
   * @returns { GridAttribute } Returns the instance of the GridAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  onScrollFrameBegin(event: OnScrollFrameBeginCallback): GridAttribute;
}

/**
 * Defines Grid Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Grid Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines Grid Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
/**
 * Defines Grid Component.
 * It is recommended to use LazyForEach or Repeat to generate child components.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @atomicservice
 * @since 20 dynamic
 * @noninterop
 */
declare const Grid: GridInterface;

/**
 * Defines Grid Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Grid Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines Grid Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 * @noninterop
 */
declare const GridInstance: GridAttribute;
