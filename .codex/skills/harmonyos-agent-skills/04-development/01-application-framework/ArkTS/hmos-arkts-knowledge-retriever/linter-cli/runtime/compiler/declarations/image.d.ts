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
 * Use the DrawableDescriptor class to get drawable image.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Use the DrawableDescriptor class to get drawable image.
 *
 * @typedef { import ('../../../api/@ohos.arkui.drawableDescriptor').DrawableDescriptor } DrawableDescriptor
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11 dynamic
 */
/**
 * Use the DrawableDescriptor class to get drawable image.
 *
 * @typedef { import ('../../../api/@ohos.arkui.drawableDescriptor').DrawableDescriptor } DrawableDescriptor
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 23 dynamic
 */
declare type DrawableDescriptor = import ('../../../api/@ohos.arkui.drawableDescriptor').DrawableDescriptor;

/**
 * Import the DrawingColorFilter type object for image color filter setting.
 *
 * @typedef { import('../../../api/@ohos.graphics.drawing').default.ColorFilter } DrawingColorFilter
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare type DrawingColorFilter = import('../../../api/@ohos.graphics.drawing').default.ColorFilter;

/**
 * Enumerates all the levels available for the image resolution quality.
 *
 * @typedef {import('../../../api/@ohos.multimedia.image').default.ResolutionQuality} ResolutionQuality
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @since 12 dynamic
 */
declare type ResolutionQuality = import('../../../api/@ohos.multimedia.image').default.ResolutionQuality;

/**
 * Lattice for dividing an image into grids.
 *
 * @typedef { import('../../../api/@ohos.graphics.drawing').default.Lattice } Lattice
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare type DrawingLattice = import('../../../api/@ohos.graphics.drawing').default.Lattice;

/**
 * Object matrix used for setting image transformations.
 *
 * @typedef { import('../../../api/@ohos.matrix4').default.Matrix4Transit } Matrix4Transit
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 15 dynamic
 */
declare type ImageMatrix = import ('../../../api/@ohos.matrix4').default.Matrix4Transit;

/**
  * Business error in onError callback.
  *
  * @typedef { import('../../../api/@ohos.base').BusinessError<T> } BusinessError<T>
  * @syscap SystemCapability.ArkUI.ArkUI.Full
  * @crossplatform
  * @form
  * @atomicservice
  * @since 20 dynamic
  */
declare type BusinessError<T = void> = import('../../../api/@ohos.base').BusinessError<T>;

/**
 * Download information of network images.
 * 
 * @typedef { import('../../../api/@ohos.request.cacheDownload').default.DownloadInfo } DownloadInfo
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 23 dynamic
 */
declare type RequestDownloadInfo = import('../../../api/@ohos.request.cacheDownload').default.DownloadInfo;

/**
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @since 7
 */
/**
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @form
 * @since 9
 */
/**
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare enum ImageRenderMode {
  /**
   * Render according to the original image, including colors.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7
   */
  /**
   * Render according to the original image, including colors.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Render according to the original image, including colors.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Render according to the original image, including colors.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  Original,

  /**
   * Render the image as a template image, ignoring the color information of the image.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7
   */
  /**
   * Render the image as a template image, ignoring the color information of the image.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Render the image as a template image, ignoring the color information of the image.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Render the image as a template image, ignoring the color information of the image.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  Template,
}

/**
 * Specify image's content.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 12 dynamic
 */
declare enum ImageContent {
  /**
   * Make image empty.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 12 dynamic
   */
  EMPTY = 0,
}

/**
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12 dynamic
 */
declare enum DynamicRangeMode {
  /**
   * Allow image content to use an unrestricted extended range.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  HIGH = 0,

  /**
   * Allow image content to use some extended range.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  CONSTRAINT = 1,

  /**
   * Restrict the image content dynamic range to the standard range.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  STANDARD = 2,
}

/**
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @since 7
 */
/**
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @form
 * @since 9
 */
/**
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare enum ImageInterpolation {
  /**
   * Nearest Neighbor Interpolation.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7
   */
  /**
   * Nearest Neighbor Interpolation.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Nearest Neighbor Interpolation.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Nearest Neighbor Interpolation.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  None,

  /**
   * Bilinear Interpolation.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7
   */
  /**
   * Bilinear Interpolation.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Bilinear Interpolation.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Bilinear Interpolation.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  Low,

  /**
   * MipMap Interpolation.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7
   */
  /**
   * MipMap Interpolation.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * MipMap Interpolation.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * MipMap Interpolation.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  Medium,

  /**
   * Cubic interpolation offers the highest interpolation quality, but may impact image rendering speed.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7
   */
  /**
   * Cubic interpolation offers the highest interpolation quality, but may impact image rendering speed.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Cubic interpolation offers the highest interpolation quality, but may impact image rendering speed.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Cubic interpolation offers the highest interpolation quality, but may impact image rendering speed.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  High,
}

/**
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 14 dynamic
 */
/**
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 23 dynamic
 */
declare enum ImageRotateOrientation {
  /**
   * Rotate according to the image rotation
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 14 dynamic
   */
  /**
   * Rotate according to the image rotation
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 23 dynamic
   */
  AUTO = 0,

  /**
   * Ignore the rotation of the image
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 14 dynamic
   */
  /**
   * Ignore the rotation of the image
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 23 dynamic
   */
  UP = 1,

  /**
   * Based on image rotation, rotate clockwise 90 degrees
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 14 dynamic
   */
  /**
   * Based on image rotation, rotate clockwise 90 degrees
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 23 dynamic
   */
  RIGHT = 2,

  /**
   * Based on image rotation, rotate clockwise 180 degrees
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 14 dynamic
   */
  /**
   * Based on image rotation, rotate clockwise 180 degrees
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 23 dynamic
   */
  DOWN = 3,

  /**
   * Based on image rotation, rotate clockwise 270 degrees
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 14 dynamic
   */
  /**
   * Based on image rotation, rotate clockwise 270 degrees
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 23 dynamic
   */
  LEFT = 4,

  /**
   * Flip the orignial image horizontally
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  /**
   * Flip the orignial image horizontally
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 23 dynamic
   */
  UP_MIRRORED = 5,

  /**
   * Flip the orignial image horizontally and rotate clockwise 90 degrees
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  /**
   * Flip the orignial image horizontally and rotate clockwise 90 degrees
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 23 dynamic
   */
  RIGHT_MIRRORED = 6,

  /**
   * Flip the orignial image vertically
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  /**
   * Flip the orignial image vertically
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 23 dynamic
   */
  DOWN_MIRRORED = 7,

  /**
   * Flip the orignial image horizontally and rotate clockwise 270 degrees
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  /**
   * Flip the orignial image horizontally and rotate clockwise 270 degrees
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 23 dynamic
   */
  LEFT_MIRRORED = 8,
}

/**
 * @interface ImageInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @since 7
 */
/**
 * @interface ImageInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @form
 * @since 9
 */
/**
 * @interface ImageInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * @interface ImageInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
interface ImageInterface {
  /**
   * Set src to obtain images.
   *
   * @param { PixelMap | ResourceStr | DrawableDescriptor } src
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7
   */
  /**
   * Set src to obtain images
   *
   * @param { PixelMap | ResourceStr | DrawableDescriptor } src
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Set src to obtain images
   *
   * @param { PixelMap | ResourceStr | DrawableDescriptor } src
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Set src to obtain images
   *
   * @param { PixelMap | ResourceStr | DrawableDescriptor } src
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  (src: PixelMap | ResourceStr | DrawableDescriptor): ImageAttribute;

  /**
   * Set src to obtain images
   *
   * @param { PixelMap | ResourceStr | DrawableDescriptor | ImageContent } src
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 12 dynamic
   */
  (src: PixelMap | ResourceStr | DrawableDescriptor | ImageContent): ImageAttribute;

  /**
   * Set src and ai options to obtain images
   *
   * @param { PixelMap | ResourceStr | DrawableDescriptor } src
   * @param { ImageAIOptions } imageAIOptions
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  (src: PixelMap | ResourceStr | DrawableDescriptor, imageAIOptions: ImageAIOptions): ImageAttribute;
}

/**
 * Defines source size of image.
 *
 * @interface ImageSourceSize
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 18 dynamic
 */

interface ImageSourceSize {
  /**
   * Image decode width. The unit of the number type is vp.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7
   */
  /**
   * Image decode width. The unit of the number type is vp.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Image decode width. The unit of the number type is vp.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Image decode width. The unit of the number type is vp.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
  /**
   * Image decode width. The unit of the number type is vp.
   * Anonymous Object Rectification.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 18 dynamic
   */
  width: number;

  /**
   * Image decode height. The unit of the number type is vp.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7
   */
  /**
   * Image decode height. The unit of the number type is vp.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Image decode height. The unit of the number type is vp.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Image decode height. The unit of the number type is vp.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
  /**
   * Image decode height. The unit of the number type is vp.
   * Anonymous Object Rectification.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 18 dynamic
   */
  height: number;
}

/**
 * Defines the ColorContent.
 * 
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 15 dynamic
 */
declare class ColorContent {
  /**
   * Indicates the ColorContent to original value.
   * 
   * @type { ColorContent }
   * @readonly
   * @static
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  static readonly ORIGIN: ColorContent;
}

/**
 * @extends CommonMethod<ImageAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @since 7
 */
/**
 * @extends CommonMethod<ImageAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @form
 * @since 9
 */
/**
 * @extends CommonMethod<ImageAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * @extends CommonMethod<ImageAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare class ImageAttribute extends CommonMethod<ImageAttribute> {
  /**
   * Placeholder displayed on load
   *
   * @param { string | Resource } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7
   */
  /**
   * Placeholder displayed on load
   *
   * @param { string | Resource } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Placeholder displayed on load
   *
   * @param { string | Resource } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Placeholder displayed on load
   *
   * @param { string | Resource } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
  /**
   * Sets the placeholder image displayed during loading.
   * 
   * <p><strong>NOTE</strong>:
   * <br>This attribute does not take effect when the parameter type of the component is AnimatedDrawableDescriptor.
   * </p>
   *
   * @param { string | Resource | PixelMap } value - Placeholder image displayed during loading, Default value is null.
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 12 dynamic
   */
  alt(value: string | Resource | PixelMap): ImageAttribute;

  /**
   * Sets the placeholder image displayed during loading.
   * 
   * <p><strong>NOTE</strong>:
   * <br>This attribute does not take effect when the parameter type of the component is AnimatedDrawableDescriptor.
   * </p>
   *
   * @param { ResourceStr | PixelMap | ImageAlt } src - Placeholder image displayed during loading.
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 22 dynamic
   */

  alt(src: ResourceStr | PixelMap | ImageAlt): ImageAttribute;
  /**
   * match Text Direction
   *
   * @param { boolean } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7
   */
  /**
   * match Text Direction
   *
   * @param { boolean } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * match Text Direction
   *
   * @param { boolean } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Specifies whether to display the image in the system language direction.
   *
   * <p><strong>NOTE</strong>:
   * <br>This attribute does not take effect when the parameter type of the component is AnimatedDrawableDescriptor.
   * </p>
   *
   * @param { boolean } value - Whether to display the image in the system language direction, Default value is false.
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  matchTextDirection(value: boolean): ImageAttribute;

  /**
   * Sets whether the display size of the image follows the source size.
   *
   * @param { boolean } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7
   */
  /**
   * Sets whether the display size of the image follows the source size.
   *
   * @param { boolean } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Sets whether the display size of the image follows the source size.
   *
   * @param { boolean } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets whether the display size of the image follows the source size.
   *
   * <p><strong>NOTE</strong>:
   * <br>This attribute does not take effect when the parameter type of the component is AnimatedDrawableDescriptor.
   * </p>
   *
   * @param { boolean } value - Whether to fit the image to the size of the image source, Default value is false.
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  fitOriginalSize(value: boolean): ImageAttribute;

  /**
   * fill Color
   *
   * @param { ResourceColor } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7
   */
  /**
   * fill Color
   *
   * @param { ResourceColor } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * fill Color
   *
   * @param { ResourceColor } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets the fill color to be superimposed on the image.
   * By default, no fill color is applied. If an invalid value is passed, the system uses the default theme color:
   * black in light mode and white in dark mode.
   *
   * <p><strong>NOTE</strong>:
   * <br>This attribute applies only to SVG images.
   * <br>This attribute does not take effect when the parameter type of the component is AnimatedDrawableDescriptor.
   * </p>
   *
   * @param { ResourceColor } value - Fill color to be superimposed on the image.
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  fillColor(value: ResourceColor): ImageAttribute;

  /**
   * Sets the fill color to be superimposed on the image.
   * By default, no fill color is applied. If an invalid value is passed, the system uses the default theme color:
   * black in light mode and white in dark mode.
   *
   * <p><strong>NOTE</strong>:
   * <br>This attribute applies only to SVG images.
   * <br>This attribute does not take effect when the parameter type of the component is AnimatedDrawableDescriptor.
   * </p>
   *
   * @param { ResourceColor | ColorContent } color - Fill color to be superimposed on the image.
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  fillColor(color: ResourceColor | ColorContent): ImageAttribute;

  /**
   * Sets the fill color to be superimposed on the image.
   * By default, no fill color is applied. If an invalid value is passed, the system uses the default theme color:
   * black in light mode and white in dark mode.
   *
   * <p><strong>NOTE</strong>:
   * <br>This attribute applies only to SVG images.
   * <br>This attribute does not take effect when the parameter type of the component is AnimatedDrawableDescriptor.
   * </p>
   *
   * @param { ResourceColor | ColorContent | ColorMetrics } color
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  fillColor(color: ResourceColor | ColorContent | ColorMetrics): ImageAttribute;

  /**
   * Sets the zoom type of an image.
   *
   * @param { ImageFit } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7
   */
  /**
   * Sets the zoom type of an image.
   *
   * @param { ImageFit } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Sets the zoom type of an image.
   *
   * @param { ImageFit } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets how the image is resized to fit its container.
   *
   * @param { ImageFit } value - How the image is resized to fit its container, Default value is ImageFit.Cover.
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  objectFit(value: ImageFit): ImageAttribute;

  /**
   * Sets the transformation matrix of the image.
   *
   * @param { ImageMatrix } matrix - Transformation matrix of the image.
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 15 dynamic
   */
  imageMatrix(matrix: ImageMatrix): ImageAttribute;

  /**
   * Set the repeat style of the picture
   *
   * @param { ImageRepeat } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7
   */
  /**
   * Set the repeat style of the picture
   *
   * @param { ImageRepeat } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Set the repeat style of the picture
   *
   * @param { ImageRepeat } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Set the repeat style of the picture
   *
   * <p><strong>NOTE</strong>:
   * <br>This attribute is not applicable to SVG images.
   * <br>This attribute does not take effect when the parameter type of the component is AnimatedDrawableDescriptor.
   * </p>
   *
   * @param { ImageRepeat } value - How the image is repeated, Default value is ImageRepeat.NoRepeat.
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  objectRepeat(value: ImageRepeat): ImageAttribute;

  /**
   * Set the auto style of the picture
   *
   * @param { boolean } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7
   */
  /**
   * Set the auto style of the picture
   *
   * @param { boolean } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Set the auto style of the picture
   *
   * @param { boolean } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Specifies whether to resize the image source based on the size of the display area during image decoding.
   *
   * <p><strong>NOTE</strong>:
   * <br>This attribute does not take effect when the parameter type of the component is AnimatedDrawableDescriptor
   * or SVG.
   * </p>
   *
   * @param { boolean } value - Whether to resize the image source based on the size of the display area
   * during image decoding, Default value is false.
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  autoResize(value: boolean): ImageAttribute;

  /**
   * Sets the image rendering mode.
   *
   * @param { ImageRenderMode } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7
   */
  /**
   * Sets the image rendering mode.
   *
   * @param { ImageRenderMode } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Sets the image rendering mode.
   *
   * @param { ImageRenderMode } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets the rendering mode of the image.
   *
   * <p><strong>NOTE</strong>:
   * <br>This attribute is not applicable to SVG images.
   * <br>When ColorFilter is set, this attribute is not effective.
   * <br>This attribute does not take effect when the parameter type of the component is AnimatedDrawableDescriptor.
   * </p>
   *
   * @param { ImageRenderMode } value - Rendering mode of the image, Default value is ImageRenderMode.Original.
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  renderMode(value: ImageRenderMode): ImageAttribute;

  /**
   * Sets the dynamic range of the image to be displayed.
   *
   * <p><strong>NOTE</strong>:
   * <br>This attribute is not applicable to SVG images.
   * </p>
   *
   * @param { DynamicRangeMode } value - Dynamic range of the image, Default value is DynamicRangeMode.Standard.
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  dynamicRangeMode(value: DynamicRangeMode): ImageAttribute;

  /**
   * Set hdrBrightness for Image.
  *
  * @param { number } brightness - Control the brightness of HDR Image, Default value is 1.0.
  * @returns { ImageAttribute }
  * @syscap SystemCapability.ArkUI.ArkUI.Full
  * @atomicservice
  * @since 19 dynamic
  */
 hdrBrightness(brightness: number): ImageAttribute;

  /**
   * Sets the interpolation effect of an image. The interpolation effect is only magnified for the image.
   *
   * @param { ImageInterpolation } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7
   */
  /**
   * Sets the interpolation effect of an image. The interpolation effect is only magnified for the image.
   *
   * @param { ImageInterpolation } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Sets the interpolation effect of an image. The interpolation effect is only magnified for the image.
   *
   * @param { ImageInterpolation } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets the interpolation effect of the image, which can alleviate aliasing that occurs when the image is zoomed.
   *
   * <p><strong>NOTE</strong>:
   * <br>This attribute is not applicable to SVG images.
   * <br>This attribute does not take effect when the parameter type of the component is AnimatedDrawableDescriptor.
   * </p>
   *
   * @param { ImageInterpolation } value - Interpolation effect of the image, Default value is ImageInterpolation.Low.
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  interpolation(value: ImageInterpolation): ImageAttribute;

  /**
   * Specifies the picture decoding size.
   * The original picture is decoded into a picture of a specified size.
   *
   * @param { object } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7
   */
  /**
   * Specifies the picture decoding size.
   * The original picture is decoded into a picture of a specified size.
   *
   * @param { object } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Specifies the picture decoding size.
   * The original picture is decoded into a picture of a specified size.
   *
   * @param { object } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Specifies the picture decoding size.
   * The original picture is decoded into a picture of a specified size.
   *
   * @param { object } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
  /**
   * Sets the decoding size of the image. 
   * The original picture is decoded into a picture of a specified size.
   * Anonymous Object Rectification.
   *
   * <p><strong>NOTE</strong>:
   * <br>This attribute works only when the target size is smaller than the source size.
   * <br>This attribute is not applicable to SVG images or PixelMap objects.
   * <br>This attribute does not take effect when the parameter type of the component is AnimatedDrawableDescriptor.
   * </p>
   *
   * @param { ImageSourceSize } value - Decoding size of the image.
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 18 dynamic
   */
  sourceSize(value: ImageSourceSize): ImageAttribute;

  /**
   * Sets the synchronous or asynchronous mode for image loading.
   * The default parameter type is bool, and the default value is false.
   *
   * @param { boolean } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 8
   */
  /**
   * Sets the synchronous or asynchronous mode for image loading.
   * The default parameter type is bool, and the default value is false.
   *
   * @param { boolean } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Sets the synchronous or asynchronous mode for image loading.
   * The default parameter type is bool, and the default value is false.
   *
   * @param { boolean } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Specifies whether to load the image synchronously.
   *
   * <p><strong>NOTE</strong>:
   * <br>This attribute does not take effect when the parameter type of the component is AnimatedDrawableDescriptor.
   * </p>
   *
   * @param { boolean } value - Whether to load the image synchronously, Default value is false.
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  syncLoad(value: boolean): ImageAttribute;

  /**
   * Sets the color filter effect on the image.
   *
   * @param { ColorFilter } value ColorFilter object.
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Sets the color filter effect on the image.
   *
   * @param { ColorFilter } value ColorFilter object.
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Sets the color filter effect on the image.
   *
   * @param { ColorFilter } value ColorFilter object.
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
  /**
   * Sets the color filter for the image.
   *
   * <p><strong>NOTE</strong>:
   * <br>When this attribute is set, renderMode is not effective.
   * </p>
   *
   * @param { ColorFilter | DrawingColorFilter } value -  Color filter of the image.
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 12 dynamic
   */
  colorFilter(value: ColorFilter | DrawingColorFilter): ImageAttribute;

  /**
   * Allow replication.
   *
   * @param { CopyOptions } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Allow replication.
   *
   * @param { CopyOptions } value
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Whether the image can be copied.
   * 
   * <strong>NOTE</strong>:
   * <br>SVG images cannot be copied.
   * <br>This attribute does not take effect when the parameter type of the component is AnimatedDrawableDescriptor.
   * </p>
   *
   * @param { CopyOptions } value - Specifies whether the image can be copied, Default value is CopyOptions.None.
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  copyOption(value: CopyOptions): ImageAttribute;

  /**
   * Enable image dragging.
   * Default value is false.
   *
   * @param { boolean } value - Whether the image is draggable, Default value is false.
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 9
   */
  /**
   * Enable image dragging.
   * Default value is true.
   *
   * @param { boolean } value - Whether the image is draggable, Default value is true.
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @atomicservice
   * @since 11
   */
  /**
   * Specifies whether the image is draggable. 
   *
   * @param { boolean } value - Whether the image is draggable, Default value is true.
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  draggable(value: boolean): ImageAttribute;

  /**
   * Defines the PointLight
   *
   * @param { PointLightStyle } value - The point light style.
   * @returns { ImageAttribute } The attribute of the image.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 11 dynamic
   */
  pointLight(value: PointLightStyle): ImageAttribute;

  /**
   * SVG anti-aliasing.
   * The range of the parameter values is (0.333, 1.333].
   * Default value is 0.0.
   *
   * @param { number } value - The degree of anti-aliasing.
   * @returns { ImageAttribute } The attribute of the image.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 11 dynamic
   */
  edgeAntialiasing(value: number): ImageAttribute;

  /**
   * This callback is triggered when an image is successfully loaded.
   * The size of the image source that is successfully loaded is returned, in pixels.
   *
   * @param { function } callback
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7
   */
  /**
   * This callback is triggered when an image is successfully loaded.
   * The size of the image source that is successfully loaded is returned, in pixels.
   *
   * @param { function } callback
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * This callback is triggered when an image is successfully loaded.
   * The size of the image source that is successfully loaded is returned, in pixels.
   *
   * @param { function } callback
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Triggered when an image is successfully loaded or decoded.
   * The size of the image source that is successfully loaded is returned, in pixels.
   *
   * <p><strong>NOTE</strong>:
   * <br>This event is not triggered if the parameter type of the component is AnimatedDrawableDescriptor.
   * </p>
   *
   * @param { function } callback
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  onComplete(
    callback: (event?: {
      /**
       * The width of the image source.
       *
       * @type { number }
       * @syscap SystemCapability.ArkUI.ArkUI.Full
       * @since 7
       */
      /**
       * The width of the image source.
       *
       * @type { number }
       * @syscap SystemCapability.ArkUI.ArkUI.Full
       * @since 9
       * @form
       */
      /**
       * The width of the image source.
       *
       * @type { number }
       * @syscap SystemCapability.ArkUI.ArkUI.Full
       * @crossplatform
       * @since 10
       * @form
       */
      /**
       * The width of the image source.
       *
       * @type { number }
       * @syscap SystemCapability.ArkUI.ArkUI.Full
       * @crossplatform
       * @atomicservice
       * @since 11
       * @form
       */
      width: number;
      /**
       * The height of the image source.
       *
       * @type { number }
       * @syscap SystemCapability.ArkUI.ArkUI.Full
       * @since 7
       */
      /**
       * The height of the image source.
       *
       * @type { number }
       * @syscap SystemCapability.ArkUI.ArkUI.Full
       * @since 9
       * @form
       */
      /**
       * The height of the image source.
       *
       * @type { number }
       * @syscap SystemCapability.ArkUI.ArkUI.Full
       * @crossplatform
       * @since 10
       * @form
       */
      /**
       * The height of the image source.
       *
       * @type { number }
       * @syscap SystemCapability.ArkUI.ArkUI.Full
       * @crossplatform
       * @atomicservice
       * @since 11
       * @form
       */
      height: number;
      /**
       * The width of the component source.
       *
       * @type { number }
       * @syscap SystemCapability.ArkUI.ArkUI.Full
       * @since 7
       */
      /**
       * The width of the component source.
       *
       * @type { number }
       * @syscap SystemCapability.ArkUI.ArkUI.Full
       * @since 9
       * @form
       */
      /**
       * The width of the component source.
       *
       * @type { number }
       * @syscap SystemCapability.ArkUI.ArkUI.Full
       * @crossplatform
       * @since 10
       * @form
       */
      /**
       * The width of the component source.
       *
       * @type { number }
       * @syscap SystemCapability.ArkUI.ArkUI.Full
       * @crossplatform
       * @atomicservice
       * @since 11
       * @form
       */
      componentWidth: number;
      /**
       * The height of the component source.
       *
       * @type { number }
       * @syscap SystemCapability.ArkUI.ArkUI.Full
       * @since 7
       */
      /**
       * The height of the component source.
       *
       * @type { number }
       * @syscap SystemCapability.ArkUI.ArkUI.Full
       * @since 9
       * @form
       */
      /**
       * The height of the component source.
       *
       * @type { number }
       * @syscap SystemCapability.ArkUI.ArkUI.Full
       * @crossplatform
       * @since 10
       * @form
       */
      /**
       * The height of the component source.
       *
       * @type { number }
       * @syscap SystemCapability.ArkUI.ArkUI.Full
       * @crossplatform
       * @atomicservice
       * @since 11
       * @form
       */
      componentHeight: number;
      /**
       * The value of the status of the image being loaded successfully.
       * If the returned status value is 0, the image data is successfully loaded.
       * If the returned status value is 1, the image is successfully decoded.
       *
       * @type { number }
       * @syscap SystemCapability.ArkUI.ArkUI.Full
       * @since 7
       */
      /**
       * The value of the status of the image being loaded successfully.
       * If the returned status value is 0, the image data is successfully loaded.
       * If the returned status value is 1, the image is successfully decoded.
       *
       * @type { number }
       * @syscap SystemCapability.ArkUI.ArkUI.Full
       * @since 9
       * @form
       */
      /**
       * The value of the status of the image being loaded successfully.
       * If the returned status value is 0, the image data is successfully loaded.
       * If the returned status value is 1, the image is successfully decoded.
       *
       * @type { number }
       * @syscap SystemCapability.ArkUI.ArkUI.Full
       * @crossplatform
       * @since 10
       * @form
       */
      /**
       * The value of the status of the image being loaded successfully.
       * If the returned status value is 0, the image data is successfully loaded.
       * If the returned status value is 1, the image is successfully decoded.
       *
       * @type { number }
       * @syscap SystemCapability.ArkUI.ArkUI.Full
       * @crossplatform
       * @atomicservice
       * @since 11
       * @form
       */
      loadingStatus: number;
      /**
       * The width of the picture that is actually drawn.
       *
       * @type { number }
       * @syscap SystemCapability.ArkUI.ArkUI.Full
       * @crossplatform
       * @since 10
       * @form
       */
      /**
       * The width of the picture that is actually drawn.
       *
       * @type { number }
       * @syscap SystemCapability.ArkUI.ArkUI.Full
       * @crossplatform
       * @atomicservice
       * @since 11
       * @form
       */
      contentWidth: number;
      /**
       * The height of the picture that is actually drawn.
       *
       * @type { number }
       * @syscap SystemCapability.ArkUI.ArkUI.Full
       * @crossplatform
       * @since 10
       * @form
       */
      /**
       * The height of the picture that is actually drawn.
       *
       * @type { number }
       * @syscap SystemCapability.ArkUI.ArkUI.Full
       * @crossplatform
       * @atomicservice
       * @since 11
       * @form
       */
      contentHeight: number;
      /**
       * The actual draw is offset from the x-axis of the component itself.
       *
       * @type { number }
       * @syscap SystemCapability.ArkUI.ArkUI.Full
       * @crossplatform
       * @since 10
       * @form
       */
      /**
       * The actual draw is offset from the x-axis of the component itself.
       *
       * @type { number }
       * @syscap SystemCapability.ArkUI.ArkUI.Full
       * @crossplatform
       * @atomicservice
       * @since 11
       * @form
       */
      contentOffsetX: number;
      /**
       * The actual draw is offset from the y-axis of the component itself.
       *
       * @type { number }
       * @syscap SystemCapability.ArkUI.ArkUI.Full
       * @crossplatform
       * @since 10
       * @form
       */
      /**
       * The actual draw is offset from the y-axis of the component itself.
       *
       * @type { number }
       * @syscap SystemCapability.ArkUI.ArkUI.Full
       * @crossplatform
       * @atomicservice
       * @since 11
       * @form
       */
      contentOffsetY: number;
    }) => void,
  ): ImageAttribute;

  /**
   * This callback is triggered when an exception occurs during image loading.
   * The field of "message" carries the detailed information of failed image loading.
   *
   * @param { function } callback
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * This callback is triggered when an exception occurs during image loading.
   * The field of "message" carries the detailed information of failed image loading.
   *
   * @param { function } callback
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Triggered when an error occurs during image loading.
   * The field of "message" carries the detailed information of failed image loading.
   * 
   * <p><strong>NOTE</strong>:
   * <br>This event is not triggered if the parameter type of the component is AnimatedDrawableDescriptor.
   * </p>
   *
   * @param { ImageErrorCallback } callback
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  onError(callback: ImageErrorCallback): ImageAttribute;

  /**
   * When the loaded source file is a svg image, this callback is triggered when the playback of the svg image is complete.
   * If the svg image is a wireless loop image, this callback is not triggered.
   *
   * @param { function } event
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7
   */
  /**
   * When the loaded source file is a svg image, this callback is triggered when the playback of the svg image is complete.
   * If the svg image is a wireless loop image, this callback is not triggered.
   *
   * @param { function } event
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * When the loaded source file is a svg image, this callback is triggered when the playback of the svg image is complete.
   * If the svg image is a wireless loop image, this callback is not triggered.
   *
   * @param { function } event
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * When the loaded source file is a svg image, this callback is triggered when the playback of the svg image is complete.
   * If the svg image is a wireless loop image, this callback is not triggered.
   *
   * <p><strong>NOTE</strong>:
   * <br>Only SVG images are supported.
   * <br>This event is not triggered if the parameter type of the component is AnimatedDrawableDescriptor.
   * </p>
   *
   * @param { function } event
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  onFinish(event: () => void): ImageAttribute;

  /**
   * Enable image analyzer.
   *
   * @param { boolean} enable
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 11
   */
  /**
   * Sets whether to enable the AI analyzer
   *
   * <p><strong>NOTE</strong>:
   * <br>This attribute cannot be used together with the overlay attribute. If they are set at the same time,
   * the CustomBuilder attribute in overlay has no effect. This attribute depends on device capabilities.
   * <br>Images to be analyzed must be static, non-vector images. That is, SVG and GIF images cannot be analyzed.
   * Pixel maps in RGBA_8888 format can be passed in for analysis.
   * <br>The placeholder images (specified by alt) cannot be analyzed. An image can be analyzed only when
   * objectRepeat is set to ImageRepeat.NoRepeat and obscured is disabled.
   * <br>Analysis is performed based on the complete original image. If the clip, margin, borderRadius,
   * position, or objectFit attribute is set, the image is not displayed completely.
   * If renderMode is used to apply a mask, analysis is still performed based on the complete original image.
   * The copyOption attribute does not affect the AI analyzer.
   * <br>This attribute does not take effect when the parameter type of the component is AnimatedDrawableDescriptor.
   * <br>The ohos.permission.INTERNET permission must be declared.
   * </p>
   *
   * @param { boolean} enable - Whether to enable the AI analyzer, Default value is false.
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  enableAnalyzer(enable: boolean): ImageAttribute;

  /**
   * Set image analyzer with config.
   *
   * @param { ImageAnalyzerConfig } config
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 11 dynamic
   */
  analyzerConfig(config: ImageAnalyzerConfig): ImageAttribute;

  /**
   * Set image resizable options.
   *
   * @param { ResizableOptions } value - Indicates the resizable options.
   * @returns { ImageAttribute } Returns the instance of the ImageAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Sets the resizable image options.
   *
   * <p><strong>NOTE</strong>:
   * <br>Resizing is effective for drag previews and placeholder images.
   * <br>When ResizableOptions is set to a valid value, the objectRepeat attribute does not take effect.
   * <br>When the sum of the values of top and bottom is greater than the source image height,
   * or the sum of the values of left and right is greater than the source image width,
   * the ResizableOptions attribute does not take effect.
   * <br>This attribute does not take effect when the parameter type of the component is AnimatedDrawableDescriptor
   * or SVG.
   * </p>
   *
   * @param { ResizableOptions } value - 	Resizable image options.
   * @returns { ImageAttribute } Returns the instance of the ImageAttribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  resizable(value: ResizableOptions): ImageAttribute;

  /**
   * Set the quality enhancement level of image.
   *
   * @param { ResolutionQuality } imageQuality
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 12 dynamic
   */
  enhancedImageQuality(imageQuality: ResolutionQuality): ImageAttribute;

  /**
   * Sets whether to secure sensitive information on widgets.
   *
   * <p><strong>NOTE</strong>:
   * <br>Obscuring requires widget framework support.
   * </p>
   *
   * @param { boolean } supported - Whether to secure sensitive information on widgets, Default value is false.
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @atomicservice
   * @since 12 dynamic
   */
  privacySensitive(supported: boolean): ImageAttribute;

  /**
   * Sets the display orientation of the image content.
   *
   * @param { ImageRotateOrientation } orientation - Display orientation of the image content, Default value
   * is ImageRotateOrientation.UP.
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 14 dynamic
   */
   /**
   * Sets the display orientation of the image content.
   *
   * @param { ImageRotateOrientation } orientation - Display orientation of the image content, Default value
   * is ImageRotateOrientation.UP.
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 23 dynamic
   */
  orientation(orientation: ImageRotateOrientation) : ImageAttribute;

  /**
   * Set the range of SVG parsing capabilities supported through enable switch.
   *
   * @param { boolean } enable - switch
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 21 dynamic
   */
  supportSvg2(enable: boolean) : ImageAttribute;

  /**
   * Animation effect when the image content changes.
   *
   * @param { ContentTransitionEffect } transition - Animation effect type
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 21 dynamic
   */
  contentTransition(transition: ContentTransitionEffect): ImageAttribute;

  /**
   * Anti-aliasing of image edges.
   *
   * @param { Optional<boolean> } isAntialiased
   * @returns { ImageAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  antialiased(isAntialiased: Optional<boolean>): ImageAttribute;
}

/**
 * Defines Image Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @since 7
 */
/**
 * Defines Image Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @form
 * @since 9
 */
/**
 * Defines Image Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Defines Image Component.
 *
 * <p>If flickering occurs during image loading, set <b>syncLoad</b> to <b>true</b>.
 * For details, see [Concurrency Optimization]{@link 
 * https://developer.huawei.com/consumer/en/doc/best-practices/bpta-click-to-click-response-optimization}</p>
 * 
 * <p>If white blocks persist during image loading, follow the steps in [Solution to White Image Blocks]{@link
 * https://developer.huawei.com/consumer/en/doc/best-practices/bpta-image-white-lump-solution}</p>
 * 
 * <p>If image loading takes a long time, follow the steps in [Reducing the Loading Time of Preset Images]{@link
 * https://developer.huawei.com/consumer/en/doc/best-practices/bpta-texture-compression-improve-performance}</p>
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare const Image: ImageInterface;

/**
 * Defines Image Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @since 7
 */
/**
 * Defines Image Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @form
 * @since 9
 */
/**
 * Defines Image Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * Defines Image Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare const ImageInstance: ImageAttribute;

/**
 * @type ImageErrorCallback
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @form
 * @since 9
 */
/**
 * @type ImageErrorCallback
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * @typedef { function } ImageErrorCallback
 * @param { ImageError } error
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
type ImageErrorCallback = (error: ImageError) => void;

/**
 * @interface ImageError
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @form
 * @since 9
 */
/**
 * @interface ImageError
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * @interface ImageError
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare interface ImageError {
  /**
   * Component width.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Component width.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Component width.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  componentWidth: number;

  /**
   * Component height.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Component height.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Component height.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  componentHeight: number;

  /**
   * Message.
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Message.
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  message: string;

  /**
   * Business Error.
   *
   * @type { ?BusinessError<void> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 20 dynamic
   */
  error?: BusinessError<void>;

  /**
   * Download information of network images.
   *
   * @type { ?RequestDownloadInfo }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 23 dynamic
   */
  downloadInfo?: RequestDownloadInfo; 
}

/**
 * Image resizable options
 *
 * @interface ResizableOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Image resizable options
 *
 * @interface ResizableOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface ResizableOptions {
  /**
   * Image slice widths.
   *
   * @type { ?EdgeWidths }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 11
   */
  /**
   * Image slice widths.
   *
   * @type { ?EdgeWidths }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  slice?: EdgeWidths;

  /**
   * Image lattice.
   *
   * @type { ?DrawingLattice }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  lattice?: DrawingLattice;
}
/**
 * Set the placeholder image.
 *
 * @interface ImageAlt
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 22 dynamic
 */
declare interface ImageAlt {
  /**
   * Set the placeholder image during the loading process.
   *
   * @type { ?(ResourceStr | PixelMap) }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 22 dynamic
   */
  placeholder?: ResourceStr | PixelMap;

  /**
   * Set the placeholder image when loading fails .
   *
   * @type { ?(ResourceStr | PixelMap) }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 22 dynamic
   */
  error?: ResourceStr | PixelMap;
}
