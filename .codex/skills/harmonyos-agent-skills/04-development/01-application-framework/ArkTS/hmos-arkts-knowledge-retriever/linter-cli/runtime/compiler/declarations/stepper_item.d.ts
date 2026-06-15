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
 * ItemState
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * ItemState
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * ItemState
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamiconly
 * @deprecated since 22
 * @useinstead Swiper
 */
declare enum ItemState {
  /**
   * Default State
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Default State
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Default State
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamiconly
   * @deprecated since 22
   * @useinstead Swiper.SwiperAttribute#index
   */
  Normal,

  /**
   * Disabled State
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Disabled State
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Disabled State
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamiconly
   * @deprecated since 22
   * @useinstead Swiper.SwiperAttribute#indicatorInteractive
   */
  Disabled,

  /**
   * Waiting State
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Waiting State
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Waiting State
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamiconly
   * @deprecated since 22
   * @useinstead Swiper
   */
  Waiting,

  /**
   * Skip State
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Skip State
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Skip State
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamiconly
   * @deprecated since 22
   * @useinstead Swiper.SwiperAttribute#index
   */
  Skip,
}

/**
 * Provides an interface for switching the stepperItem view on stepper container.
 *
 * @interface StepperItemInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Provides an interface for switching the stepperItem view on stepper container.
 *
 * @interface StepperItemInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provides an interface for switching the stepperItem view on stepper container.
 *
 * @interface StepperItemInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamiconly
 * @deprecated since 22
 * @useinstead Swiper#SwiperInterface
 */
interface StepperItemInterface {
  /**
   * Called when the stepperItem component is used.
   *
   * @returns { StepperItemAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Called when the stepperItem component is used.
   *
   * @returns { StepperItemAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the stepperItem component is used.
   *
   * @returns { StepperItemAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamiconly
   * @deprecated since 22
   * @useinstead Swiper#SwiperAttribute
   */
  (): StepperItemAttribute;
}

/**
 * Defines the stepper item attribute functions.
 *
 * @extends CommonMethod<StepperItemAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines the stepper item attribute functions.
 *
 * @extends CommonMethod<StepperItemAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the stepper item attribute functions.
 *
 * @extends CommonMethod<StepperItemAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamiconly
 * @deprecated since 22
 * @useinstead Swiper#SwiperAttribute
 */
declare class StepperItemAttribute extends CommonMethod<StepperItemAttribute> {
  /**
   * Called when the value of stepperItem prevLabel is set
   *
   * @param { string } value
   * @returns { StepperItemAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Called when the value of stepperItem prevLabel is set
   *
   * @param { string } value
   * @returns { StepperItemAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the value of stepperItem prevLabel is set
   *
   * @param { string } value
   * @returns { StepperItemAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamiconly
   * @deprecated since 22
   * @useinstead Swiper.SwiperController#showPrevious
   */
  prevLabel(value: string): StepperItemAttribute;

  /**
   * Called when the value of stepperItem nextLabel is set
   *
   * @param { string } value
   * @returns { StepperItemAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Called when the value of stepperItem nextLabel is set
   *
   * @param { string } value
   * @returns { StepperItemAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the value of stepperItem nextLabel is set
   *
   * @param { string } value
   * @returns { StepperItemAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamiconly
   * @deprecated since 22
   * @useinstead Swiper.SwiperController#showNext
   */
  nextLabel(value: string): StepperItemAttribute;

  /**
   * Called when the value of stepperItem status is set
   *
   * @param { ItemState } value
   * @returns { StepperItemAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Called when the value of stepperItem status is set
   *
   * @param { ItemState } value
   * @returns { StepperItemAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when the value of stepperItem status is set
   *
   * @param { ItemState } value
   * @returns { StepperItemAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamiconly
   * @deprecated since 22
   * @useinstead Swiper.SwiperAttribute#indicatorInteractive
   */
  status(value?: ItemState): StepperItemAttribute;
}

/**
 * Defines StepperItem Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines StepperItem Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines StepperItem Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamiconly
 * @deprecated since 22
 * @useinstead Swiper
 */
declare const StepperItemInstance: StepperItemAttribute;

/**
 * Defines StepperItem Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines StepperItem Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines StepperItem Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamiconly
 * @deprecated since 22
 * @useinstead Swiper
 */
declare const StepperItem: StepperItemInterface;
