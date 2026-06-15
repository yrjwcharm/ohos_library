/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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
 * Describes the rectangle of the surface held by the XComponent.
 *
 * @interface SurfaceRect
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12
 */
/**
 * Surface Rectangle information.
 *
 * @interface SurfaceRect
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20 dynamic
 */
declare interface SurfaceRect {
  /**
   * X coordinate of the surface rectangle relative to the upper left corner of the XComponent.
   * Unit: px.
   * If offsetX is not set, the surface rectangle is centered along the x-axis relative to the upper left corner of the XComponent.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12
   */
  /**
   * The horizontal offset of the surface relative to XComponent.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */  
  offsetX?: number;

  /**
   * Y coordinate of the surface rectangle relative to the upper left corner of the XComponent.
   * Unit: px.
   * If offsetY is not set, the surface rectangle is centered along the y-axis relative to the upper left corner of the XComponent.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12
   */
  /**
   * The vertical offset of the surface relative to XComponent.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  offsetY?: number;

  /**
   * Width of the surface rectangle.
   * Unit: px.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12
   */
  /**
   * The width of the surface created by XComponent
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  surfaceWidth: number;

  /**
   * Height of the surface rectangle.
   * Unit: px.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12
   */
  /**
   * The height of the surface created by XComponent
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  surfaceHeight: number;
}

/**
 * Defines whether the orientation of the surface held by the current XComponent is locked when the screen rotates.
 *
 * @interface SurfaceRotationOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12
 */
/**
 * Surface rotation options.
 *
 * @interface SurfaceRotationOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20 dynamic
 */
declare interface SurfaceRotationOptions {
  /**
   * Whether the orientation of the surface is locked when the screen rotates.
   * If this parameter is not set, the default value false is used, indicating that the orientation is not locked.
   *
   * @type { ?boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12
   */
  /**
   * Lock property of the surface rotation.
   *
   * @type { ?boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  lock?: boolean;
}

/**
 * Surface config.
 *
 * @interface SurfaceConfig
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 22 dynamic
 */
declare interface SurfaceConfig {
  /**
   * Whether the surface held by XComponent needs to be considered opaque,
   * even if the surface has translucent pixel.
   * True means needing to be considered opaque, false otherwise.
   *
   * @type { ?boolean }
   * @default false
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 22 dynamic
   */
  isOpaque?: boolean;
}

/**
 * Defines the controller of the XComponent.
 * You can bind the controller to the XComponent to call the component APIs through the controller.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines the controller of the XComponent.
 * You can bind the controller to the XComponent to call the component APIs through the controller.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare class XComponentController {
  /**
   * A constructor used to create a XComponentController instance.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * A constructor used to create a XComponentController instance.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  constructor();

  /**
   * Obtains the ID of the surface held by the XComponent, which can then be used for @ohos APIs.
   * This API works only when type of the XComponent is set to SURFACE("surface") or TEXTURE.
   *
   * @returns { string } ID of the surface held by the XComponent.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9
   */
  /**
   * Obtains the ID of the surface held by the XComponent, which can then be used for @ohos APIs.
   * This API works only when type of the XComponent is set to SURFACE("surface") or TEXTURE.
   *
   * @returns { string } ID of the surface held by the XComponent.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  getXComponentSurfaceId(): string;

  /**
   * Obtains the context of an XComponent object.
   * This API works only when type of the XComponent is set to SURFACE("surface") or TEXTURE.
   *
   * @returns { Object } The context of native XComponent.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Obtains the context of an XComponent object.
   * This API works only when type of the XComponent is set to SURFACE("surface") or TEXTURE.
   *
   * @returns { Object } Context of the XComponent object.
   *                     The APIs contained in the context are defined by developers.
   *                     The context is passed in as the first parameter of the onLoad callback.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  getXComponentContext(): Object;

  /**
   * Sets the width and height of the surface held by the XComponent.
   * This API works only when type of the XComponent is set to SURFACE("surface") or TEXTURE.
   *
   * @param { object } value - Width and Height of the surface held by the XComponent.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 9 dynamiconly
   * @deprecated since 12
   * @useinstead setXComponentSurfaceRect
   */
  setXComponentSurfaceSize(value: {
    surfaceWidth: number;
    surfaceHeight: number;
  }): void;

  /**
   * Sets the rectangle for the surface held by the XComponent.
   * This API works only when type of the XComponent is set to SURFACE("surface") or TEXTURE.
   *
   * @param { SurfaceRect } rect - Rectangle of the surface held by the XComponent.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12
   */
  /**
   * Set the rectangle information of surface created by XComponent.
   *
   * @param { SurfaceRect } rect - The surface rectangle information.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  setXComponentSurfaceRect(rect: SurfaceRect): void;

  /**
   * Obtains the rectangle of the surface held by the XComponent.
   * This API works only when type of the XComponent is set to SURFACE("surface") or TEXTURE.
   *
   * @returns { SurfaceRect } Rectangle of the surface held by the XComponent.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12
   */
  /**
   * Get the rectangle information of surface created by XComponent.
   *
   * @returns { SurfaceRect } The surface rectangle information.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  getXComponentSurfaceRect(): SurfaceRect;

  /**
   * Sets whether to lock the orientation of the surface held by this XComponent when the screen rotates.
   * This API is effective only when the XComponent type is SURFACE ("surface").
   *
   * @param { SurfaceRotationOptions } rotationOptions - Whether to lock the orientation of the surface held by the current XComponent when the screen rotates.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12
   */
  /**
   * Set the rotation options of the Surface created by XComponent.
   *
   * @param { SurfaceRotationOptions } rotationOptions - The surface rotation options.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  setXComponentSurfaceRotation(rotationOptions: SurfaceRotationOptions): void;

  /**
   * Obtains whether the orientation of the surface held by this XComponent is locked when the screen rotates.
   * This API is effective only when the XComponent type is SURFACE ("surface").
   *
   * @returns { Required<SurfaceRotationOptions> } The surface rotation options result.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12
   */
  /**
   * Get the rotation options result of the Surface created by XComponent.
   *
   * @returns { Required<SurfaceRotationOptions> } The surface rotation options result.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  getXComponentSurfaceRotation(): Required<SurfaceRotationOptions>;

  /**
   * Triggered when the surface held by the XComponent is created.
   * This API works only when type of the XComponent is set to SURFACE("surface") or TEXTURE.
   *
   * @param { string } surfaceId - ID of the surface held by the XComponent.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12
   */
  /**
   * Called after the surface is first created.
   *
   * @param { string } surfaceId - The id of the surface created by XComponent.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  onSurfaceCreated(surfaceId: string): void;

  /**
   * Triggered when the surface held by the XComponent has its size changed (including the time when the XComponent is created with the specified size).
   * This API works only when type of the XComponent is set to SURFACE ("surface") or TEXTURE.
   *
   * @param { string } surfaceId - ID of the surface held by the XComponent.
   * @param { SurfaceRect } rect - Rectangle for displaying the surface held by the XComponent.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12
   */
  /**
   * Called after the surface rectangle information is changed.
   *
   * @param { string } surfaceId - The id of the surface created by XComponent.
   * @param { SurfaceRect } rect - The rectangle information of the surface created by XComponent.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  onSurfaceChanged(surfaceId: string, rect: SurfaceRect): void;

  /**
   * Triggered when the surface held by the XComponent is destroyed.
   * This API works only when type of the XComponent is set to SURFACE ("surface") or TEXTURE.
   *
   * @param { string } surfaceId - ID of the surface held by the XComponent.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12
   */
  /**
   * Called when the surface is about to be destroyed.
   *
   * @param { string } surfaceId - The id of the surface created by XComponent.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  onSurfaceDestroyed(surfaceId: string): void;

  /**
   * Starts AI image analysis in the given settings.
   * Before calling this API, make sure the AI image analyzer is enabled.
   * Because the image frame used for analysis is the one captured when this API is called, pay attention to the invoking time of this API.
   * If this API is repeatedly called before the execution is complete, an error callback is triggered.
   *
   * @param { ImageAnalyzerConfig } config - Settings of the AI image analyzer.
   * @returns { Promise<void> } Promise used to return the result.
   * @throws { BusinessError } 110001 - Image analysis feature is unsupported.
   * @throws { BusinessError } 110002 - Image analysis is currently being executed.
   * @throws { BusinessError } 110003 - Image analysis is stopped.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  startImageAnalyzer(config: ImageAnalyzerConfig): Promise<void>;

  /**
   * Stops AI image analysis.
   * The content displayed by the AI image analyzer will be destroyed.
   * 
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  stopImageAnalyzer(): void;

  /**
   * Get a Canvas for drawing into the surface created by XComponent.
   *
   * @returns { DrawingCanvas | null} Returns a Canvas for drawing into the surface created by XComponent.
   *    Returns null if the surface is not available.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 20 dynamic
   */
  lockCanvas(): DrawingCanvas | null;

  /**
   * Posts the new contents of the Canvas to the surface created by XComponent and releases the Canvas.
   *
   * @param { DrawingCanvas } canvas - The canvas previously obtained from lockCanvas.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 20 dynamic
   */
  unlockCanvasAndPost(canvas: DrawingCanvas):void;

  /**
   * Set the config of the surface created by the XComponent.
   *
   * @param { SurfaceConfig } config - surface config
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 22 dynamic
   */
  setXComponentSurfaceConfig(config: SurfaceConfig):void;
}

/**
 * Defines the options of the XComponent.
 *
 * @interface XComponentOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12
 */
/**
 * Defines the xcomponent options.
 *
 * @interface XComponentOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 20 dynamic
 */
declare interface XComponentOptions {
  /**
   * Type of the component.
   *
   * @type { XComponentType }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12
   */
  /**
   * The type of xcomponent
   *
   * @type { XComponentType }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  type: XComponentType;

  /**
   * Controller bound to the component, which can be used to invoke methods of the component.
   * This parameter is valid only when type is SURFACE or TEXTURE.
   *
   * @type { XComponentController }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12
   */
  /**
   * The controller of xcomponent.
   *
   * @type { XComponentController }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  controller: XComponentController;

  /**
   * AI image analysis options.
   * You can configure the analysis type or bind an analyzer controller through this parameter.
   *
   * @type { ?ImageAIOptions }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  imageAIOptions?: ImageAIOptions;

  /**
   * Identifier of a screen.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 17 dynamic
   */
  screenId?: number;
}

/**
 * Defines the native xcomponent parameters.
 *
 * @interface NativeXComponentParameters
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 19 dynamic
 */
declare interface NativeXComponentParameters {
  /**
   * The type of xcomponent
   *
   * @type { XComponentType }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 19 dynamic
   */
  type: XComponentType;

  /**
   * Image ai options.
   *
   * @type { ?ImageAIOptions }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 19 dynamic
   */
  imageAIOptions?: ImageAIOptions;
}

/**
 * Sets the HDR type of the XComponent.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @stagemodelonly
 * @atomicservice
 * @since 24 dynamic
 */
declare enum HdrType {
  /**
   * Default type.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @atomicservice
   * @since 24 dynamic
   */
  DEFAULT = 0,
  /**
   * AIHDR type.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @atomicservice
   * @since 24 dynamic
   */
  AIHDR = 1,
}

/**
 * Defines XComponent.
 *
 * @interface XComponentInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines XComponent.
 *
 * @interface XComponentInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
interface XComponentInterface {
  /**
   * Constructor parameters
   *
   * @param { object } value - Indicates the options of the xcomponent.
   * @returns { XComponentAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8 dynamiconly
   * @deprecated since 12
   * @useinstead (value: { id: string; type: XComponentType; libraryname?: string; controller?: XComponentController })
   */
  (value: { id: string; type: string; libraryname?: string; controller?: XComponentController }): XComponentAttribute;

  /**
   * Constructor parameters
   *
   * @param { object } value - Indicates the options of the xcomponent.
   * @returns { XComponentAttribute } The attribute of the xcomponent.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 10
   */
  /**
   * Constructor parameters
   *
   * @param { object } value - Indicates the options of the xcomponent.
   * @returns { XComponentAttribute } The attribute of the xcomponent.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  (value: { id: string; type: XComponentType; libraryname?: string; controller?: XComponentController }): XComponentAttribute;

  /**
   * Constructor parameters
   *
   * @param { XComponentOptions } options - Indicates the options of the xcomponent.
   * @returns { XComponentAttribute } The attribute of the xcomponent.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12
   */
  /**
   * Constructor parameters
   *
   * @param { XComponentOptions } options - Indicates the options of the xcomponent.
   * @returns { XComponentAttribute } The attribute of the xcomponent.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  (options: XComponentOptions): XComponentAttribute;

  /**
   * Constructor parameters
   *
   * @param { NativeXComponentParameters } params - Indicates the constructor parameters of the xcomponent for native developing.
   * @returns { XComponentAttribute } The attribute of the xcomponent.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 19 dynamic
   */
  (params: NativeXComponentParameters): XComponentAttribute;
}

/**
 * Triggered after the surface held by the XComponent is created.
 *
 * @typedef { function } OnNativeLoadCallback
 * @param { object } [event] - Context of the XComponent object.
 *                             The APIs contained in the context are defined at the native layer by developers.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
declare type OnNativeLoadCallback = (event?: object) => void;

/**
 * Defines XComponentAttribute.
 *
 * @extends CommonMethod<XComponentAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines XComponentAttribute.
 *
 * @extends CommonMethod<XComponentAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare class XComponentAttribute extends CommonMethod<XComponentAttribute> {
  /**
   * Triggered when the plug-in is loaded.
   *
   * @param { function } [callback] - Callback after the surface held by the XComponent is created.
   * @returns { XComponentAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Triggered when the plug-in is loaded.
   *
   * @param { function } [callback] - Callback after the surface held by the XComponent is created.
   * @returns { XComponentAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  /**
   * Triggered when the plug-in is loaded.
   * Anonymous Object Rectification.
   *
   * @param { OnNativeLoadCallback } callback - Callback after the surface held by the XComponent is created.
   * @returns { XComponentAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onLoad(callback: OnNativeLoadCallback): XComponentAttribute;

  /**
   * Triggered when the plug-in is destroyed.
   *
   * @param { function } event - Callback after the XComponent is destroyed.
   * @returns { XComponentAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @since 8
   */
  /**
   * Triggered when the plug-in is destroyed.
   *
   * @param { function } event - Callback after the XComponent is destroyed.
   * @returns { XComponentAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  /**
   * Triggered when the plug-in is destroyed.
   * Anonymous Object Rectification.
   *
   * @param { VoidCallback } event - Callback after the XComponent is destroyed.
   * @returns { XComponentAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onDestroy(event: VoidCallback): XComponentAttribute;

  /**
   * Sets whether to enable the AI image analyzer, which supports subject recognition, text recognition, and object lookup.
   * For the settings to take effect, this attribute must be used together with StartImageAnalyzer and StopImageAnalyzer of XComponentController.
   * This feature cannot be used together with the overlay attribute.
   * If both are set, the CustomBuilder attribute in overlay has no effect. This feature also depends on device capabilities.
   *
   * @param { boolean } enable - Whether to enable the AI image analyzer.
   * @returns { XComponentAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 12 dynamic
   */
  enableAnalyzer(enable: boolean): XComponentAttribute;

  /**
   * Sets whether to enable the secure surface to protect the content rendered within the component from being captured or recorded.
   *
   * @param { boolean } isSecure - Whether to enable the secure surface.
   * @returns { XComponentAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 13 dynamic
   */
  enableSecure(isSecure: boolean): XComponentAttribute;

  /**
   * Set hdrBrightness for XComponent.
   *
   * @param { number } brightness - control the brightness of HDR video
   * @returns { XComponentAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 14
   */
  /**
   * Set hdrBrightness for XComponent.
   *
   * @param { number } brightness - control the brightness of HDR video
   * @returns { XComponentAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @atomicservice
   * @since 20 dynamic
   */
  hdrBrightness(brightness: number): XComponentAttribute;

  /**
   * Set hdrBrightness for XComponent.
   *
   * @param { number } brightness - control the brightness of HDR video
   * @param { HdrType } type - the HDR type of the XComponent
   * @returns { XComponentAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @atomicservice
   * @since 24 dynamic
   */
  hdrBrightness(brightness: number, type?: HdrType): XComponentAttribute;
  
  /**
   * Enable transparent layer for XComponent.
   *
   * @param { boolean } enabled - whether to enable transparent layer for XComponent.
   * @returns { XComponentAttribute }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @since 18 dynamic
   */
  enableTransparentLayer(enabled: boolean): XComponentAttribute;
}

/**
 * Defines XComponent Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines XComponent Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare const XComponent: XComponentInterface;

/**
 * Defines XComponent Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines XComponent Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare const XComponentInstance: XComponentAttribute;
