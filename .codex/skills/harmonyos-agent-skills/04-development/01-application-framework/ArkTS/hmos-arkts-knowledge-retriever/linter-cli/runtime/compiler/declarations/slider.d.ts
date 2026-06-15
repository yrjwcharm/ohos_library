/*
 * Copyright (c) 2021-2024 Huawei Device Co., Ltd.
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
 * Declare sliderstyle
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Declare sliderstyle
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @since 9
 */
/**
 * Declare sliderstyle
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Style of the slider thumb and track.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare enum SliderStyle {
    /**
     * The slider is on the slide rail.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * The slider is on the slide rail.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @form
     * @since 9
     */
    /**
     * The slider is on the slide rail.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @since 10
     */
    /**
     * The thumb is on the track.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @FaAndStageModel
     * @crossplatform
     * @form
     * @atomicservice
     * @since 11 dynamic
     */
    OutSet,
    /**
     * The slider is in the slide rail.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * The slider is in the slide rail.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @form
     * @since 9
     */
    /**
     * The slider is in the slide rail.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @since 10
     */
    /**
     * The thumb is in the track.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @FaAndStageModel
     * @crossplatform
     * @form
     * @atomicservice
     * @since 11 dynamic
     */
    InSet,
    /**
     * There is no thumb.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12 dynamic
     */
    NONE
}

/**
 * Declare SliderChangeMode
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Declare SliderChangeMode
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @since 9
 */
/**
 * Declare SliderChangeMode
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * State triggered by the event.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare enum SliderChangeMode {
    /**
     * Start dragging the slider.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Start dragging the slider.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @form
     * @since 9
     */
    /**
     * Start dragging the slider.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @since 10
     */
    /**
     * The user touches or clicks the thumb.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @FaAndStageModel
     * @crossplatform
     * @form
     * @atomicservice
     * @since 11 dynamic
     */
    Begin,
    /**
     * Drag the slider.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Drag the slider.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @form
     * @since 9
     */
    /**
     * Drag the slider.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @since 10
     */
    /**
     * The user is dragging the slider.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @FaAndStageModel
     * @crossplatform
     * @form
     * @atomicservice
     * @since 11 dynamic
     */
    Moving,
    /**
     * End dragging the slider.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * End dragging the slider.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @form
     * @since 9
     */
    /**
     * End dragging the slider.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @since 10
     */
    /**
     * The user stops dragging the slider by lifting their finger or releasing the mouse device.
     * <p><strong>NOTE</strong>:
     * <br>The trigger occurs when an invalid value is restored to the default value, that is, when the value is set to
     * less than min or greater than max.
     * </p>
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @FaAndStageModel
     * @crossplatform
     * @form
     * @atomicservice
     * @since 11 dynamic
     */
    End,
    /**
     * Click the slider.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Click the slider.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @form
     * @since 9
     */
    /**
     * Click the slider.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @since 10
     */
    /**
     * The user moves the thumb by touching or clicking the track.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @FaAndStageModel
     * @crossplatform
     * @form
     * @atomicservice
     * @since 11 dynamic
     */
    Click
}

/**
 * Interaction mode between the user and the slider.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare enum SliderInteraction {
    /**
     * Users can drag the slider or touch the track to move the slider. The slider moves as soon as the mouse or
     * finger is pressed.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    SLIDE_AND_CLICK = 0,
    /**
     * Users are not allowed to move the slider by touching the slider.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    SLIDE_ONLY = 1,
    /**
     * Users can drag the slider or touch the track to move the slider. The slider moves when the mouse is released or
     * finger is lifted, if the release/lift position coincides with the screen press position.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    SLIDE_AND_CLICK_UP = 2
}

/**
 * Defines the callback type used in SlideRange.
 * <p><strong>NOTE</strong>:
 * <br>Currently, this API takes effect only when MIN ≤ from ≤ to ≤ MAX (the values of MIN and MAX do not depend on
 * the values set, but on the actual values that take effect). You can set either from or to, or you can set both from
 * and to. When the API is effective, if the set from value is between the adjacent multiples of step, then from takes
 * the value of the left interval multiple of step or MIN as the corrected value. When the API is effective, if the set
 * to value is between the adjacent multiples of step, then to takes the value of the right interval multiple of step
 * or MAX as the corrected value. After from and to have taken their corrected values, when value is undefined or null,
 * it takes the same value as from; when value is a number type, and if value ≤ from, then it takes from;
 * if value > to, then it takes to.
 * </p>
 *
 * @interface SlideRange
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface SlideRange {
    /**
     * Start of the slide range.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    from?: number;
    /**
     * End of the slide range.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    to?: number;
}

/**
 * Defines the options of Slider.
 *
 * @interface SliderOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the options of Slider.
 *
 * @interface SliderOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @since 9
 */
/**
 * Defines the options of Slider.
 *
 * @interface SliderOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Parameters of the slider.
 *
 * @interface SliderOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare interface SliderOptions {
    /**
     * Current value of Slider.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Current value of Slider.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @form
     * @since 9
     */
    /**
     * Current value of Slider.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @since 10
     */
    /**
     * Current progress.
     *
     * @type { ?number }
     * @default same as the value of min
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @FaAndStageModel
     * @crossplatform
     * @form
     * @atomicservice
     * @since 11 dynamic
     */
    value?: number;
    /**
     * Sets the min value of Slider.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Sets the min value of Slider.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @form
     * @since 9
     */
    /**
     * Sets the min value of Slider.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @since 10
     */
    /**
     * Minimum value.
     *
     * @type { ?number }
     * @default 0
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @FaAndStageModel
     * @crossplatform
     * @form
     * @atomicservice
     * @since 11 dynamic
     */
    min?: number;
    /**
     * Sets the max value of Slider.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Sets the max value of Slider.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @form
     * @since 9
     */
    /**
     * Sets the max value of Slider.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @since 10
     */
    /**
     * Maximum value.
     * <p><strong>NOTE</strong>:
     * <br>If the value of min is greater than or equal to the value of max, the min value defaults to 0, and the max
     * value defaults to 100. If the value is not within the [min, max] range, the value of min or max is used, whichever
     * is closer.
     * </p>
     *
     * @type { ?number }
     * @default 100
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @FaAndStageModel
     * @crossplatform
     * @form
     * @atomicservice
     * @since 11 dynamic
     */
    max?: number;
    /**
     * Sets the step of each slide value.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Sets the step of each slide value.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @form
     * @since 9
     */
    /**
     * Sets the step of each slide value.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @since 10
     */
    /**
     * Step of the slider.
     * <p><strong>NOTE</strong>:
     * <br>If this parameter is set to a value less than 0 or greater than the value of max, the default value is used.
     * </p>
     *
     * @type { ?number }
     * @default 1 - Value range: [0.01, max - min]
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @FaAndStageModel
     * @crossplatform
     * @form
     * @atomicservice
     * @since 11 dynamic
     */
    step?: number;
    /**
     * Sets the slider style.
     *
     * @type { ?SliderStyle }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Sets the slider style.
     *
     * @type { ?SliderStyle }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @form
     * @since 9
     */
    /**
     * Sets the slider style.
     *
     * @type { ?SliderStyle }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @since 10
     */
    /**
     * Style of the slider thumb and track.
     *
     * @type { ?SliderStyle }
     * @default SliderStyle.OutSet
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @FaAndStageModel
     * @crossplatform
     * @form
     * @atomicservice
     * @since 11 dynamic
     */
    style?: SliderStyle;
    /**
     * Sets the slider direction style.
     *
     * @type { ?Axis }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Sets the slider direction style.
     *
     * @type { ?Axis }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @form
     * @since 9
     */
    /**
     * Sets the slider direction style.
     *
     * @type { ?Axis }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @since 10
     */
    /**
     * Whether the slider moves horizontally or vertically.
     *
     * @type { ?Axis }
     * @default Axis.Horizontal
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @FaAndStageModel
     * @crossplatform
     * @form
     * @atomicservice
     * @since 11 dynamic
     */
    direction?: Axis;
    /**
     * Set whether the direction of the slider needs to be reversed.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Set whether the direction of the slider needs to be reversed.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @form
     * @since 9
     */
    /**
     * Set whether the direction of the slider needs to be reversed.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @since 10
     */
    /**
     * Whether the slider values are reversed. By default, the values increase from left to right for a horizontal
     * slider and from top to bottom for a vertical slider.
     *
     * @type { ?boolean }
     * @default false
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @FaAndStageModel
     * @crossplatform
     * @form
     * @atomicservice
     * @since 11 dynamic
     */
    reverse?: boolean;
}

/**
 * Declare SliderBlockType
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Enumerates the types of the slider in the block direction.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare enum SliderBlockType {
    /**
     * Use the default block.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Round slider.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11 dynamic
     */
    DEFAULT = 0,
    /**
     * Use an image as the slider block.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Slider with an image background.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11 dynamic
     */
    IMAGE = 1,
    /**
     * Use a shape as the slider block.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Slider in a custom shape.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11 dynamic
     */
    SHAPE = 2
}

/**
 * Defines the style of slider block.
 *
 * @interface SliderBlockStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Describes the style of the slider in the block direction.
 *
 * @interface SliderBlockStyle
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare interface SliderBlockStyle {
    /**
     * Sets the type of slider block.
     *
     * @type { SliderBlockType }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Type of the slider in the block direction.
     *
     * @type { SliderBlockType }
     * @default SliderBlockType.DEFAULT - indicating the round slider.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11 dynamic
     */
    type: SliderBlockType;
    /**
     * Sets the image of slider block while the type is set to SliderBlockType.Image.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Image resource of the slider. The area size for displaying the image is subject to the blockSize attribute.
     * Be mindful of the image size when selecting an image.
     *
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11 dynamic
     */
    image?: ResourceStr;
    /**
     * Sets the shape of slider block while the type is set to SliderBlockType.Shape.
     *
     * @type { ?(CircleAttribute | EllipseAttribute | PathAttribute | RectAttribute) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Custom shape of the slider.
     *
     * @type { ?(CircleAttribute | EllipseAttribute | PathAttribute | RectAttribute) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11 dynamic
     */
    shape?: CircleAttribute | EllipseAttribute | PathAttribute | RectAttribute;
}

/**
 * Defines the callback type used in SliderConfiguration.
 *
 * @typedef {function} SliderTriggerChangeCallback 
 * @param { number } value - Current progress.
 * @param { SliderChangeMode } mode - State triggered by the event.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare type SliderTriggerChangeCallback = (value: number, mode: SliderChangeMode) => void;

/**
 * You need a custom class to implement the ContentModifier API.
 *
 * @extends CommonConfiguration<SliderConfiguration>
 * @interface SliderConfiguration
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface SliderConfiguration extends CommonConfiguration<SliderConfiguration> {
    /**
     * Current progress.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    value: number;
    /**
     * Minimum value.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    min: number;
    /**
     * Maximum value.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    max: number;
    /**
     * Step of the slider.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    step: number;
    /**
     * Triggers slider changes.
     *
     * @type { SliderTriggerChangeCallback }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    triggerChange: SliderTriggerChangeCallback;
}

/**
 * Provides an interface for the slide bar component.
 *
 * @interface SliderInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Provides an interface for the slide bar component.
 *
 * @interface SliderInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @since 9
 */
/**
 * Provides an interface for the slide bar component.
 *
 * @interface SliderInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Provides an interface for the slide bar component.
 *
 * @interface SliderInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 * @noninterop
 */
interface SliderInterface {
    /**
     * Called when the slider bar component is used.
     *
     * @param { SliderOptions } options
     * @returns { SliderAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the slider bar component is used.
     *
     * @param { SliderOptions } options
     * @returns { SliderAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @form
     * @since 9
     */
    /**
     * Called when the slider bar component is used.
     *
     * @param { SliderOptions } options
     * @returns { SliderAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @since 10
     */
    /**
     * Called when the slider bar component is used.
     *
     * @param { SliderOptions } options
     * @returns { SliderAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @FaAndStageModel
     * @crossplatform
     * @form
     * @atomicservice
     * @since 11 dynamic
     */
    (options?: SliderOptions): SliderAttribute;
}

/**
 * Defines the accessibility information of slider step point.
 *
 * @interface SliderStepItemAccessibility
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20 dynamic
 */
declare interface SliderStepItemAccessibility {
  /**
   * Set the accessibility of the slider step point.
   *
   * @type { ?ResourceStr }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  text?: ResourceStr;
}

/**
 * Defines the options of slider step point.
 *
 * @interface SliderShowStepOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20 dynamic
 */
declare interface SliderShowStepOptions {
  /**
   * Set the accessibility of the slider step points.
   *
   * @type { ?Map<number, SliderStepItemAccessibility> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  stepsAccessibility?: Map<number, SliderStepItemAccessibility>;
}

/**
 * Defines the options for customizing the accessibility of content within a slider.
 * These options can be used to enhance the user experience for assistive technologies.
 *
 * @interface SliderCustomContentOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20 dynamic
 */
interface SliderCustomContentOptions {
  /**
   * The text used for accessibility purposes. This text will be read by screen readers
   * to provide a more descriptive label for the slider content. 
   *
   * @type { ?ResourceStr }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  accessibilityText?: ResourceStr;

  /**
   * A more detailed description for accessibility. This can provide additional context
   * about the slider content for users relying on assistive technologies. 
   *
   * @type { ?ResourceStr }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  accessibilityDescription?: ResourceStr;
   
  /**
   * The accessibility level of the slider content. This could be used to indicate the importance
   * or priority of the content for assistive technologies. 
   *
   * @type { ?string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  accessibilityLevel?: string;
  
  /**
   * Indicates whether the slider content should be treated as an accessibility group.
   *
   * @type { ?boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  accessibilityGroup?: boolean;
}

/**
 * Options used for customizing the prefix part of the slider.
 * It extends the SliderCustomContentOptions to inherit accessibility customization options.
 *
 * @extends SliderCustomContentOptions
 * @interface SliderPrefixOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20 dynamic
 */
interface SliderPrefixOptions extends SliderCustomContentOptions {
}

/**
 * Options used for customizing the suffix part of the slider.
 * It extends the SliderCustomContentOptions to inherit accessibility customization options.
 *
 * @extends SliderCustomContentOptions
 * @interface SliderSuffixOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20 dynamic
 */
interface SliderSuffixOptions extends SliderCustomContentOptions {
}

/**
 * ColorMetricsStop type
 * 
 * @interface ColorMetricsStop
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @stagemodelonly
 * @crossplatform
 * @atomicservice
 * @since 23 dynamic
 */
declare interface ColorMetricsStop {
  /**
   * Color property.
   * 
   * @type { ColorMetrics }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  color: ColorMetrics;

  /**
   * the color offset. value range [0, 1].
   * 
   * **NOTE**
   * If the value specified is less than 0, the value **0** is used.
   * If the value specified is greater than 1, the value **1** is used.
   * 
   * @type { Length }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  offset: Length;
}

/**
 * ColorMetricsLinearGradient class
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @stagemodelonly
 * @crossplatform
 * @atomicservice
 * @since 23 dynamic
 */
declare class ColorMetricsLinearGradient {
    /**
     * Constructor.
     *
     * @param { ColorMetricsStop[] } colorStops - the LinearGradient constructor parameter.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @stagemodelonly
     * @crossplatform
     * @atomicservice
     * @since 23 dynamic
     */
    constructor(colorStops: ColorMetricsStop[]);
}

/**
 * Defines the attribute functions of Slider.
 *
 * @extends CommonMethod<SliderAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the attribute functions of Slider.
 *
 * @extends CommonMethod<SliderAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @since 9
 */
/**
 * Defines the attribute functions of Slider.
 *
 * @extends CommonMethod<SliderAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Defines the attribute functions of Slider.
 *
 * @extends CommonMethod<SliderAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 * @noninterop
 */
declare class SliderAttribute extends CommonMethod<SliderAttribute> {
  /**
   * Called when the slider color of the slider bar is set.
   *
   * @param { ResourceColor } value
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the slider color of the slider bar is set.
   *
   * @param { ResourceColor } value
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Called when the slider color of the slider bar is set.
   *
   * @param { ResourceColor } value
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when the slider color of the slider bar is set.
   *
   * @param { ResourceColor } value
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  blockColor(value: ResourceColor): SliderAttribute;
  /**
   * Set the color of the slider bar.
   *
   * @param { ResourceColor | LinearGradient } value
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 21 dynamic
   */
  blockColor(value: ResourceColor | LinearGradient): SliderAttribute;

  /**
   * Called when the track color of the slider is set.
   *
   * @param { ResourceColor } value
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the track color of the slider is set.
   *
   * @param { ResourceColor } value
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Called when the track color of the slider is set.
   *
   * @param { ResourceColor } value
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when the track color of the slider is set.
   *
   * @param { ResourceColor } value
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
  /**
   * Called when the track color of the slider is set.
   *
   * @param { ResourceColor | LinearGradient } value
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 12 dynamic
   */
  trackColor(value: ResourceColor | LinearGradient): SliderAttribute;

  /**
   * Called when the slider of the slider bar is set to slide over the area color.
   *
   * @param { ResourceColor } value
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the slider of the slider bar is set to slide over the area color.
   *
   * @param { ResourceColor } value
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Called when the slider of the slider bar is set to slide over the area color.
   *
   * @param { ResourceColor } value
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when the slider of the slider bar is set to slide over the area color.
   *
   * @param { ResourceColor } value
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  selectedColor(value: ResourceColor): SliderAttribute;
  /**
   * Called when the slider of the slider bar is set to slide over the area color.
   *
   * @param { ResourceColor | LinearGradient } selectedColor
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 18 dynamic
   */
  selectedColor(selectedColor: ResourceColor | LinearGradient): SliderAttribute;

  /**
   * Called when the minimum label is set.
   *
   * @param { string } value
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7 dynamiconly
   * @deprecated since 9
   * @useinstead min
   */
  minLabel(value: string): SliderAttribute;

  /**
   * Called when the maximum label is set.
   *
   * @param { string } value
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7 dynamiconly
   * @deprecated since 9
   * @useinstead max
   */
  maxLabel(value: string): SliderAttribute;

  /**
   * Called when setting whether to display step size.
   *
   * @param { boolean } value
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when setting whether to display step size.
   *
   * @param { boolean } value
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Called when setting whether to display step size.
   *
   * @param { boolean } value
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when setting whether to display step size.
   *
   * @param { boolean } value
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  showSteps(value: boolean): SliderAttribute;

  /**
   * Called when setting whether to display step size.
   *
   * @param { boolean } value
   * @param { SliderShowStepOptions } [options]
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 20 dynamic
   */
  showSteps(value: boolean, options?: SliderShowStepOptions): SliderAttribute;

  /**
   * Called when the percentage of bubble prompt is set when sliding.
   *
   * @param { boolean } value
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the percentage of bubble prompt is set when sliding.
   *
   * @param { boolean } value
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Called when the percentage of bubble prompt is set when sliding.
   *
   * @param { boolean } value - Whether to display the bubble.
   * @param { ResourceStr } content - Text content in the bubble. If the content is not specified, the current
   *                                  percentage is displayed by default.
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when the percentage of bubble prompt is set when sliding.
   *
   * @param { boolean } value - Whether to display the bubble.
   * @param { ResourceStr } content - Text content in the bubble. If the content is not specified, the current
   *                                  percentage is displayed by default.
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  showTips(value: boolean, content?: ResourceStr): SliderAttribute;

  /**
   * Called when the thickness of track is set.
   *
   * @param { Length } value
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Called when the thickness of track is set.
   *
   * @param { Length } value
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Called when the thickness of track is set.
   *
   * @param { Length } value
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Called when the thickness of track is set.
   *
   * @param { Length } value
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  trackThickness(value: Length): SliderAttribute;

  /**
   * Called when the selection value changes.
   *
   * @param { function } callback
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 7
   */
  /**
   * Called when the selection value changes.
   *
   * @param { function } callback
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Called when the selection value changes.
   *
   * @param { function } callback
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Triggered when the slider is dragged or clicked.
   * <p><strong>NOTE</strong>:
   * <br>The Begin and End states are triggered when the slider is clicked with a gesture. The Moving and Click states
   * are triggered when the value of value changes. If the coherent action is a drag action, the Click state will
   * not be triggered.
   * </p>
   *
   * @param { function } callback
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  onChange(callback: (value: number, mode: SliderChangeMode) => void): SliderAttribute;

  /**
   * Called when the border color of block is set.
   *
   * @param { ResourceColor } value - the border color of block.
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the border color of block is set.
   *
   * @param { ResourceColor } value - the border color of block.
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  blockBorderColor(value: ResourceColor): SliderAttribute;

  /**
   * Called when the border width of block is set.
   *
   * @param { Length } value - the border width of block.
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the border width of block is set.
   *
   * @param { Length } value - the border width of block.
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  blockBorderWidth(value: Length): SliderAttribute;

  /**
   * Called when the color of step is set.
   *
   * @param { ResourceColor } value - the color of step.
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the color of step is set.
   *
   * @param { ResourceColor } value - the color of step.
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  stepColor(value: ResourceColor): SliderAttribute;

  /**
   * Called when the radius of track border is set.
   *
   * @param { Length } value - the radius of track border.
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the radius of track border is set.
   *
   * @param { Length } value - the radius of track border.
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  trackBorderRadius(value: Length): SliderAttribute;

  /**
   * Called when the radius of selected part is set.
   *
   * @param { Dimension } value - the radius of selected part.
   * @returns { SliderAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
    selectedBorderRadius(value: Dimension): SliderAttribute;
    /**
     * Called when the size of block is set.
     *
     * @param { SizeOptions } value - the size of block.
     * @returns { SliderAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the size of block is set.
     *
     * @param { SizeOptions } value - the size of block.
     * @returns { SliderAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11 dynamic
     */
    blockSize(value: SizeOptions): SliderAttribute;
    /**
     * Called when the style of block is set.
     *
     * @param { SliderBlockStyle } value - the style of block.
     * @returns { SliderAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Sets the style of the slider in the block direction.
     *
     * @param { SliderBlockStyle } value - Style of the slider in the block direction.
     * <br>Default value is SliderBlockType.DEFAULT, indicating the round slider.
     * @returns { SliderAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11 dynamic
     */
    blockStyle(value: SliderBlockStyle): SliderAttribute;
    /**
     * Called when the diameter of step is set.
     *
     * @param { Length } value - the diameter of step.
     * @returns { SliderAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the diameter of step is set.
     *
     * @param { Length } value - the diameter of step.
     * @returns { SliderAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11 dynamic
     */
    stepSize(value: Length): SliderAttribute;
    /**
     * Sets the interaction mode between the user and the slider.
     *
     * @param { SliderInteraction } value - Interaction mode between the user and the slider.
     * <br>Default value is SliderInteraction.SLIDE_AND_CLICK.
     * @returns { SliderAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    sliderInteractionMode(value: SliderInteraction): SliderAttribute;
    /**
     * Sets the min value when Slider response to drag event.
     *
     * @param { number } value
     * @returns { SliderAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    minResponsiveDistance(value: number): SliderAttribute;
    /**
     * Creates a content modifier.
     *
     * @param { ContentModifier<SliderConfiguration> } modifier - Content modifier to apply to the slider.
     * modifier: content modifier. You need a custom class to implement the ContentModifier API.
     * @returns { SliderAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    contentModifier(modifier: ContentModifier<SliderConfiguration>): SliderAttribute;
    /**
     * Set the valid slidable range.
     *
     * @param { SlideRange } value
     * @returns { SliderAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12 dynamic
     */
    slideRange(value: SlideRange): SliderAttribute;
    /**
     * Set the sensitivity of rotating crown.
     *
     * @param { Optional<CrownSensitivity> } sensitivity - The sensitivity of rotating crown, default value is { MEDIUM }.
     * @returns { SliderAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 18 dynamic
     */
    digitalCrownSensitivity(sensitivity: Optional<CrownSensitivity>): SliderAttribute;
    /**
     * Enable or disable haptic feedback.
     *
     * @param { boolean } enabled - Default value is true, set false to disable haptic feedback.
     * @returns { SliderAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 18 dynamic
     */
    enableHapticFeedback(enabled: boolean): SliderAttribute;
    /**
     * Sets the prefix part of the slider.
     * The prefix is the content that appears before the main slider component.
     *
     * @param { ComponentContent } content - Custom components that will be displayed as the prefix.
     *                                       This can be any valid custom UI component structure.
     * @param { SliderPrefixOptions } [options] - Optional options for customizing the prefix.
     *                                            These options can include accessibility settings.
     * @returns { SliderAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20 dynamic
     */
    prefix(content: ComponentContent, options?: SliderPrefixOptions): SliderAttribute;
    /**
     * Sets the suffix part of the slider.
     * The suffix is the content that appears after the main slider component.
     *
     * @param { ComponentContent } content - Custom components that will be displayed as the suffix.
     *                                       This can be any valid custom UI component structure.
     * @param { SliderSuffixOptions } [options] - Optional options for customizing the suffix.
     *                                            These options can include accessibility settings.
     * @returns { SliderAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 20 dynamic
     */
    suffix(content: ComponentContent, options?: SliderSuffixOptions): SliderAttribute;

    /**
     * Set the track color of the slider.
     *
     * @param { ColorMetricsLinearGradient } color - The Track color of the slider
     * @returns { SliderAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @stagemodelonly
     * @crossplatform
     * @atomicservice
     * @since 23 dynamic
     */
    trackColorMetrics(color: ColorMetricsLinearGradient): SliderAttribute;
}

/**
 * Defines Slider Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Slider Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @since 9
 */
/**
 * Defines Slider Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Defines Slider Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 * @noninterop
 */
declare const Slider: SliderInterface;

/**
 * Defines Slider Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Slider Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @form
 * @since 9
 */
/**
 * Defines Slider Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Defines Slider Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 * @noninterop
 */
declare const SliderInstance: SliderAttribute;
