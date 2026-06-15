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
 * Defines the options of Flex.
 * 
 * @interface FlexOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the options of Flex.
 *
 * @interface FlexOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @since 9
 */
/**
 * Defines the options of Flex.
 *
 * @interface FlexOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Describes the layout and alignment of child components within the Flex component.
 *
 * @interface FlexOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare interface FlexOptions {
  /**
   * Sets the horizontal layout of elements.
   *
   * @type { ?FlexDirection }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Sets the horizontal layout of elements.
   *
   * @type { ?FlexDirection }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Sets the horizontal layout of elements.
   *
   * @type { ?FlexDirection }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Direction in which child components are arranged in the Flex component.
   *
   * @type { ?FlexDirection }
   * @default FlexDirection.Row
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  direction?: FlexDirection;

  /**
   * Whether the Flex container is a single row/column arrangement or a multi-row/column arrangement.
   *
   * @type { ?FlexWrap }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Whether the Flex container is a single row/column arrangement or a multi-row/column arrangement.
   *
   * @type { ?FlexWrap }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Whether the Flex container is a single row/column arrangement or a multi-row/column arrangement.
   *
   * @type { ?FlexWrap }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Whether the Flex component has a single line or multiple lines.
   *
   * @type { ?FlexWrap }
   * @default FlexWrap.NoWrap
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  wrap?: FlexWrap;

  /**
   * The alignment format of the subassembly on the Flex container spindle.
   *
   * @type { ?FlexAlign }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * The alignment format of the subassembly on the Flex container spindle.
   *
   * @type { ?FlexAlign }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * The alignment format of the subassembly on the Flex container spindle.
   *
   * @type { ?FlexAlign }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Alignment mode of the child components in the Flex component along the main axis.
   *
   * @type { ?FlexAlign }
   * @default FlexAlign.Start
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  justifyContent?: FlexAlign;

  /**
   * Alignment Format for Subassembly on Flex Container Cross Axis.
   *
   * @type { ?ItemAlign }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Alignment Format for Subassembly on Flex Container Cross Axis.
   *
   * @type { ?ItemAlign }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Alignment Format for Subassembly on Flex Container Cross Axis.
   *
   * @type { ?ItemAlign }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Alignment mode of the child components in the Flex component along the cross axis.
   *
   * @type { ?ItemAlign }
   * @default ItemAlign.Start
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  alignItems?: ItemAlign;

  /**
   * The alignment of multiple lines of content when there is extra space in the cross axis.
   *
   * @type { ?FlexAlign }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * The alignment of multiple lines of content when there is extra space in the cross axis.
   *
   * @type { ?FlexAlign }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * The alignment of multiple lines of content when there is extra space in the cross axis.
   *
   * @type { ?FlexAlign }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Alignment mode of the child components in a multi-row Flex component along the cross axis.
   * This parameter is valid only when wrap is set to Wrap or WrapReverse.
   *
   * @type { ?FlexAlign }
   * @default FlexAlign.Start
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  alignContent?: FlexAlign;

  /**
   * Spacing between child components along the main axis or cross axis of the Flex component.
   *
   * @type { ?FlexSpaceOptions }
   * @default {main: LengthMetrics.px(0), cross: LengthMetrics.px(0)}
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  space?: FlexSpaceOptions;
}

/**
 * Defines the spacing between child components along the main axis or cross axis of the Flex component.
 *
 * @interface FlexSpaceOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */

declare interface FlexSpaceOptions {
  /**
   * Space on the main axis of the Flex component.
   *
   * @type { ?LengthMetrics }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  main?: LengthMetrics;

  /**
   * Space on the cross axis of the Flex component.
   *
   * @type { ?LengthMetrics }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  cross?: LengthMetrics;
}

/**
 * Provides a monthly view component to display information such as date, shift break, and schedule.
 *
 * @interface FlexInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Provides a monthly view component to display information such as date, shift break, and schedule.
 *
 * @interface FlexInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @since 9
 */
/**
 * Provides a monthly view component to display information such as date, shift break, and schedule.
 *
 * @interface FlexInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Provides a monthly view component to display information such as date, shift break, and schedule.
 *
 * @interface FlexInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
interface FlexInterface {
  /**
   * Defines the constructor of Flex.
   *
   * @param { FlexOptions } value
   * @returns { FlexAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Defines the constructor of Flex.
   *
   * @param { FlexOptions } value
   * @returns { FlexAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Defines the constructor of Flex.
   *
   * @param { FlexOptions } value
   * @returns { FlexAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Defines the constructor of Flex.
   *
   * @param { FlexOptions } value
   * @returns { FlexAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  (value?: FlexOptions): FlexAttribute;
}

/**
 * Defines the Flex attribute functions.
 *
 * @extends CommonMethod<FlexAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the Flex attribute functions.
 *
 * @extends CommonMethod<FlexAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @since 9
 */
/**
 * Defines the Flex attribute functions.
 *
 * @extends CommonMethod<FlexAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Defines the Flex attribute functions.
 *
 * @extends CommonMethod<FlexAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare class FlexAttribute extends CommonMethod<FlexAttribute> {
  /**
   * Defines the PointLight
   *
   * @param { PointLightStyle } value - The point light style.
   * @returns { FlexAttribute } The attribute of the flex.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 11 dynamic
   */
  pointLight(value: PointLightStyle): FlexAttribute;
}

/**
 * Defines Flex Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Flex Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @since 9
 */
/**
 * Defines Flex Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Defines Flex Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare const Flex: FlexInterface;

/**
 * Defines Flex Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Flex Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @since 9
 */
/**
 * Defines Flex Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Defines Flex Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare const FlexInstance: FlexAttribute;
