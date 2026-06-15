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
 * Enumerates the layout direction of the icon and text.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Enumerates the layout direction of the icon and text.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11 dynamic
 */
declare enum SecurityComponentLayoutDirection {
  /**
   * Horizontal layout.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Horizontal layout.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 11 dynamic
   */
  HORIZONTAL = 0,

  /**
   * Vertical layout.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Vertical layout.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 11 dynamic
   */
  VERTICAL = 1
}

/**
 * Defines the method of a security component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Defines the method of a security component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11 dynamic
 */
declare class SecurityComponentMethod<T> {
  /**
   * Icon size.
   *
   * @param { Dimension } value - Indicates the size of the icon.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Icon size.
   *
   * @param { Dimension } value - Indicates the size of the icon.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 11 dynamic
   */
  iconSize(value: Dimension): T;

  /**
   * Layout direction of the icon and text.
   *
   * @param { SecurityComponentLayoutDirection } value - Indicates the layout direction of the icon and text.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Layout direction of the icon and text.
   *
   * @param { SecurityComponentLayoutDirection } value - Indicates the layout direction of the icon and text.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 11 dynamic
   */
  layoutDirection(value: SecurityComponentLayoutDirection): T;

  /**
   * Position of the security component.
   *
   * @param { Position } value - Indicates the position of the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Position of the security component.
   *
   * @param { Position } value - Indicates the position of the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 11 dynamic
   */
  position(value: Position): T;

  /**
   * Anchor of the security component for positioning. The top start edge of the component is used as
   * the reference point for offset.
   *
   * @param { Position } value - Indicates the anchor of the component when it is positioned.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Anchor of the security component for positioning. The top start edge of the component is used as
   * the reference point for offset.
   *
   * @param { Position } value - Indicates the anchor of the component when it is positioned.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 11 dynamic
   */
  markAnchor(value: Position): T;

  /**
   * Coordinate offset relative to the layout position.
   * Setting this attribute does not affect the layout of the parent container.
   * The position is adjusted only during drawing.
   *
   * @param { Position } value - Indicates the offset value.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Coordinate offset relative to the layout position.
   * Setting this attribute does not affect the layout of the parent container.
   * The position is adjusted only during drawing.
   *
   * @param { Position } value - Indicates the offset value.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 11
   */
  /**
   * Coordinate offset relative to the layout completion position.
   * Setting this attribute does not affect the layout of the parent container.
   * The position is adjusted only during drawing.
   *
   * @param { Position | Edges | LocalizedEdges } value
   * @returns { T }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  offset(value: Position | Edges | LocalizedEdges): T;

  /**
   * Font size of the inner text.
   *
   * @param { Dimension } value - Indicates the font size of the text in the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Font size of the inner text.
   *
   * @param { Dimension } value - Indicates the font size of the text in the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 11 dynamic
   */
  fontSize(value: Dimension): T;

  /**
   * Font style of the inner text.
   *
   * @param { FontStyle } value - Indicates the font style of the text in the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Font style of the inner text.
   *
   * @param { FontStyle } value - Indicates the font style of the text in the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 11 dynamic
   */
  fontStyle(value: FontStyle): T;

  /**
   * Font weight of the inner text.
   *
   * @param { number | FontWeight | string } value - Indicates the font weight of the text in the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Font weight of the inner text.
   *
   * @param { number | FontWeight | string } value - Indicates the font weight of the text in the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 11
   */
  /**
   * Font weight of the inner text.
   *
   * @param { number | FontWeight | string | Resource } value - Indicates the font weight of the text in the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 20 dynamic
   */
  fontWeight(value: number | FontWeight | string | Resource): T;

  /**
   * Font family of the inner text.
   *
   * @param { string | Resource } value - Indicates the font family of the text in the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Font family of the inner text.
   *
   * @param { string | Resource } value - Indicates the font family of the text in the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 11 dynamic
   */
  fontFamily(value: string | Resource): T;

  /**
   * Font color of the inner text.
   *
   * @param { ResourceColor } value - Indicates the font color of the text in the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Font color of the inner text.
   *
   * @param { ResourceColor } value - Indicates the font color of the text in the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 11 dynamic
   */
  fontColor(value: ResourceColor): T;

  /**
   * Color of the icon.
   *
   * @param { ResourceColor } value - Indicates the icon color in the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Color of the icon.
   *
   * @param { ResourceColor } value - Indicates the icon color in the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 11 dynamic
   */
  iconColor(value: ResourceColor): T;

  /**
   * Background color.
   *
   * @param { ResourceColor } value - Indicates the background color of the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Background color.
   *
   * @param { ResourceColor } value - Indicates the background color of the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 11 dynamic
   */
  backgroundColor(value: ResourceColor): T;

  /**
   * Style of the border.
   *
   * @param { BorderStyle } value - Indicates the border style of the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Style of the border.
   *
   * @param { BorderStyle } value - Indicates the border style of the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 11 dynamic
   */
  borderStyle(value: BorderStyle): T;

  /**
   * Width of the border.
   *
   * @param { Dimension } value - Indicates the border width of the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Width of the border.
   *
   * @param { Dimension } value - Indicates the border width of the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 11 dynamic
   */
  borderWidth(value: Dimension): T;

  /**
   * Color of the border.
   *
   * @param { ResourceColor } value - Indicates the border color of the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Color of the border.
   *
   * @param { ResourceColor } value - Indicates the border color of the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 11 dynamic
   */
  borderColor(value: ResourceColor): T;

  /**
   * Radius of the border.
   *
   * @param { Dimension } value - Indicates the border radius of the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Radius of the border.
   *
   * @param { Dimension } value - Indicates the border radius of the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 11 dynamic
   */
  borderRadius(value: Dimension): T;

  /**
   * Radius of the border.
   *
   * @param { Dimension | BorderRadiuses } radius - Indicates the border radius of the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 15 dynamic
   */
  borderRadius(radius: Dimension | BorderRadiuses): T;

  /**
   * Padding between the background border and icon/inner text.
   *
   * @param { Padding | Dimension } value - Indicates the padding of the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Padding between the background border and icon/inner text.
   *
   * @param { Padding | Dimension } value - Indicates the padding of the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 11 dynamic
   */
  padding(value: Padding | Dimension): T;

  /**
   * Space between the inner text and icon.
   *
   * @param { Dimension } value - Indicates the space between the inner text and icon.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Space between the inner text and icon.
   *
   * @param { Dimension } value - Indicates the space between the inner text and icon.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 11 dynamic
   */
  textIconSpace(value: Dimension): T;

  /**
   * Key. User can set an key to the component to identify it.
   *
   * @param { string } value - identify the key of the component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 10 dynamic
   * @test
   */
  key(value: string): T;

  /**
   * Sets the width of the component.
   *
   * @param { Length } value - Indicates the width of the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 11
   */
  /**
   * Sets the width of the component.
   *
   * @param { Length } value - Indicates the width of the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  width(value: Length): T;

  /**
   * Sets the height of the component.
   *
   * @param { Length } value - Indicates the height of the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 11
   */
  /**
   * Sets the height of the component.
   *
   * @param { Length } value - Indicates the height of the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  height(value: Length): T;

  /**
   * The size of the component.
   *
   * @param { SizeOptions } value - Indicates the size of the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 11
   */
  /**
   * The size of the component.
   *
   * @param { SizeOptions } value - Indicates the size of the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  size(value: SizeOptions): T;

  /**
   * constraint Size:
   * minWidth: minimum Width, maxWidth: maximum Width, minHeight: minimum Height, maxHeight: maximum Height.
   *
   * @param { ConstraintSizeOptions } value - Indicates the constraint size of the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 11
   */
  /**
   * constraint Size:
   * minWidth: minimum Width, maxWidth: maximum Width, minHeight: minimum Height, maxHeight: maximum Height.
   *
   * @param { ConstraintSizeOptions } value - Indicates the constraint size of the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  constraintSize(value: ConstraintSizeOptions): T;

  /**
   * align
   *
   * @param { Alignment } alignType - Indicates the align type of the security component.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 15 dynamic
   */
  align(alignType: Alignment): T;

  /**
   * Specifies the alignRules of relative container
   *
   * @param { AlignRuleOption } alignRule
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 15 dynamic
   */
  alignRules(alignRule: AlignRuleOption): T;

  /**
   * Specifies the localized alignRules of relative container
   *
   * @param { LocalizedAlignRuleOptions } alignRule
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 15 dynamic
   */
  alignRules(alignRule: LocalizedAlignRuleOptions): T;

  /**
   * Id. User can set an id to the component to identify it.
   *
   * @param { string } description
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 15 dynamic
   */
  id(description: string): T;

  /**
   * Specifies the direction and style of chain in relative container
   *
   * @param { Axis } direction - Indicates direction of the chain
   * @param { ChainStyle } style - Indicates style of the chain
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 15 dynamic
   */
  chainMode(direction: Axis, style: ChainStyle): T;
  
  /**
   * Sets the minimum font scale factor for text.
   *
   * @param { number | Resource } scale Minimum font scale factor to set.
   * @returns { T } Returns the attributes of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 18 dynamic
   */
  minFontScale(scale: number | Resource): T;

  /**
   * Sets the maximum font scale factor for text.
   *
   * @param { number | Resource  } scale Maximum font scale factor to set.
   * @returns { T } Returns the attributes of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 18 dynamic
   */
  maxFontScale(scale: number | Resource): T;

  /**
   * Called when the maximum number of lines of text is set.
   *
   * @param { number } line
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 18
   */
  /**
   * Called when the maximum number of lines of text is set.
   *
   * @param { number | Resource } line
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 20 dynamic
   */
  maxLines(line: number | Resource): T;

  /**
   * Called when the minimum font size of the font is set.
   *
   * @param { number | string | Resource } minSize
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 18 dynamic
   */
  minFontSize(minSize: number | string | Resource): T;

  /**
   * Called when the maximum font size of the font is set.
   *
   * @param { number | string | Resource } maxSize
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 18 dynamic
   */
  maxFontSize(maxSize: number | string | Resource): T;

  /**
   * Called when the height adaptive policy is set.
   *
   * @param { TextHeightAdaptivePolicy } policy - The height adaptive policy.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 18 dynamic
   */
  heightAdaptivePolicy(policy: TextHeightAdaptivePolicy): T;

  /**
   * If the value is true, the component is available and can respond to operations such as clicking.
   *  If it is set to false, click operations are not responded.
   *
   * @param { boolean } respond - Indicates whether the button is responded to.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 18 dynamic
   */
  enabled(respond: boolean): T;
  /**
   * Set the focusBox style.
   *
   * @param { FocusBoxStyle } style FocusBox style.
   * @returns { T } Returns the attribute of the security component.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 22 dynamic
   */
  focusBox(style:FocusBoxStyle):T;
}
