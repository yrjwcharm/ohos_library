/*
 * Copyright (c) 2021-2022 Huawei Device Co., Ltd.
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
 * @kit ArkWeb
 */

/**
 * Provides methods for controlling the web controller.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @since 9
 */
/**
 * Provides methods for controlling the web controller.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @since 10
 */
/**
 * Provides methods for controlling the web controller.
 *
 * @typedef { import('../../../api/@ohos.web.webview').default.WebviewController }
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare type WebviewController = import('../../../api/@ohos.web.webview').default.WebviewController;

/**
 * The callback of load committed.
 *
 * @typedef { function } OnNavigationEntryCommittedCallback
 * @param { LoadCommittedDetails } loadCommittedDetails - callback information of onNavigationEntryCommitted.
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11 dynamic
 */
type OnNavigationEntryCommittedCallback = (loadCommittedDetails: LoadCommittedDetails) => void;

/**
 * The callback of ssl error event.
 *
 * @typedef { function } OnSslErrorEventCallback
 * @param { SslErrorEvent } sslErrorEvent - callback information of onSslErrorEvent.
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12
 */
/**
 * The callback of ssl error event.
 *
 * @typedef { function } OnSslErrorEventCallback
 * @param { SslErrorEvent } sslErrorEvent - callback information of onSslErrorEvent.
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 23 dynamic
 */
type OnSslErrorEventCallback = (sslErrorEvent: SslErrorEvent) => void;

/**
 * The callback of verify pin.
 *
 * @typedef { function } OnVerifyPinCallback
 * @param { VerifyPinEvent } verifyPinEvent - The event of verify PIN.
 * @syscap SystemCapability.Web.Webview.Core
 * @since 22 dynamic
 */
type OnVerifyPinCallback = (verifyPinEvent: VerifyPinEvent) => void;

/**
 * The callback of onOverrideErrorPage.
 *
 * @typedef { function } OnOverrideErrorPageCallback
 * @param { OnErrorReceiveEvent } errorPageEvent - The information of error.
 * @returns { string } - Return an HTML text content encoded in Base64.
 * @syscap SystemCapability.Web.Webview.Core
 * @since 20 dynamic
 */
type OnOverrideErrorPageCallback = (errorPageEvent: OnErrorReceiveEvent) => string;

/**
 * The callback of largestContentfulPaint.
 *
 * @typedef { function } OnLargestContentfulPaintCallback
 * @param { LargestContentfulPaint } largestContentfulPaint - callback information of onLargestContentfulPaint.
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
type OnLargestContentfulPaintCallback = (largestContentfulPaint: LargestContentfulPaint) => void;

/**
 * The callback of firstMeaningfulPaint.
 *
 * @typedef { function } OnFirstMeaningfulPaintCallback
 * @param { FirstMeaningfulPaint } firstMeaningfulPaint - callback information of onFirstMeaningfulPaint.
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
type OnFirstMeaningfulPaintCallback = (firstMeaningfulPaint: FirstMeaningfulPaint) => void;

/**
 * The callback of onOverrideUrlLoading.
 * Should not call WebviewController.loadUrl with the request's URL and then return true.
 *
 * @typedef { function } OnOverrideUrlLoadingCallback
 * @param { WebResourceRequest } webResourceRequest - callback information of onOverrideUrlLoading.
 * @returns { boolean } - Returning true causes the current Web to abort loading the URL,
 *                        false causes the Web to continue loading the url as usual.
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12
 */
/**
 * The callback of onOverrideUrlLoading.
 * Should not call WebviewController.loadUrl with the request's URL and then return true.
 *
 * @typedef { function } OnOverrideUrlLoadingCallback
 * @param { WebResourceRequest } webResourceRequest - callback information of onOverrideUrlLoading.
 * @returns { boolean } - Returning true causes the current Web to abort loading the URL,
 *                        false causes the Web to continue loading the url as usual.
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 23 dynamic
 */
type OnOverrideUrlLoadingCallback = (webResourceRequest: WebResourceRequest) => boolean;

/**
 * The callback of Intelligent Tracking Prevention.
 *
 * @typedef { function } OnIntelligentTrackingPreventionCallback
 * @param { IntelligentTrackingPreventionDetails } details - callback information of onIntelligentTrackingPrevention.
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
type OnIntelligentTrackingPreventionCallback = (details: IntelligentTrackingPreventionDetails) => void;

/**
 * The callback of onNativeEmbedVisibilityChange.
 *
 * @typedef { function } OnNativeEmbedVisibilityChangeCallback
 * @param { NativeEmbedVisibilityInfo } nativeEmbedVisibilityInfo - callback information of onNativeEmbedVisibilityChange.
 * @syscap SystemCapability.Web.Webview.Core
 * @since 12 dynamic
 */
type OnNativeEmbedVisibilityChangeCallback = (nativeEmbedVisibilityInfo: NativeEmbedVisibilityInfo) => void;

/**
 * The callback when the param element which is a child item of the object element has changed.
 *
 * @typedef { function } OnNativeEmbedObjectParamChangeCallback
 * @param { NativeEmbedParamDataInfo } event - callback information of param element.
 * @syscap SystemCapability.Web.Webview.Core
 * @since 21 dynamic
 */
type OnNativeEmbedObjectParamChangeCallback = (event: NativeEmbedParamDataInfo) => void;

/**
 * Enum type supplied to {@link NativeEmbedParamItem} when onNativeEmbedObjectParamChange being called.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @since 21 dynamic
 */
declare enum NativeEmbedParamStatus {
  /**
   * The param element is created.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 21 dynamic
   */
  ADD = 0,

  /**
   * The param element is updated.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 21 dynamic
   */
  UPDATE = 1,

  /**
   *The param element is deleted.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 21 dynamic
   */
  DELETE = 2
}

/**
 * Defines the information of param element.
 *
 * @typedef NativeEmbedParamItem
 * @syscap SystemCapability.Web.Webview.Core
 * @since 21 dynamic
 */
declare interface NativeEmbedParamItem {
   /**
   * The status of the param.
   *
   * @type { NativeEmbedParamStatus }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 21 dynamic
   */
   status: NativeEmbedParamStatus;

   /**
   * The id attribute of the param element.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 21 dynamic
   */
   id: string;

   /**
   * The name attribute of the param element.
   *
   * @type { ?string }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 21 dynamic
   */
   name?: string;

   /**
   * The value attribute of the param element.
   *
   * @type { ?string }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 21 dynamic
   */
   value?: string;
}

/**
 * Defines the param data info.
 *
 * @typedef NativeEmbedParamDataInfo
 * @syscap SystemCapability.Web.Webview.Core
 * @since 21 dynamic
 */
declare interface NativeEmbedParamDataInfo {
  /**
   * The native embed id.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 21 dynamic
   */
  embedId: string;

  /**
   * The id attribute of the object element.
   *
   * @type { ?string }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 21 dynamic
   */
   objectAttributeId?: string;

  /**
   * The param element array
   *
   * @type { ?Array<NativeEmbedParamItem> }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 21 dynamic
   */
  paramItems?: Array<NativeEmbedParamItem>;
}

/**
 * Enum type supplied to {@link rotateRenderEffect} for setting the effect of rotation.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @since 22 dynamic
 */
declare enum WebRotateEffect {
  /**
   * The content area is drawn in top-left of the node.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  TOPLEFT_EFFECT = 0,

  /**
   * Scale the content area to cover the node.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  RESIZE_COVER_EFFECT = 1
}

/**
* Enum type supplied to {@link keyboardAppearance} for setting the web keyboard appearance mode.
*
* @enum { number }
* @syscap SystemCapability.Web.Webview.Core
* @stagemodelonly
* @since 26.0.0 dynamic
*/
declare enum WebKeyboardAppearanceMode {
  /**
  * Default skin mode, no immersive style.
  *
  * @syscap SystemCapability.Web.Webview.Core
  * @stagemodelonly
  * @since 26.0.0 dynamic
  */
  NONE_IMMERSIVE = 0,

  /**
  * No immersive style.
  *
  * @syscap SystemCapability.Web.Webview.Core
  * @stagemodelonly
  * @since 26.0.0 dynamic
  */
  IMMERSIVE = 1,

  /**
  * Light immersive style.
  *
  * @syscap SystemCapability.Web.Webview.Core
  * @stagemodelonly
  * @since 26.0.0 dynamic
  */
  LIGHT_IMMERSIVE = 2,

  /**
  * Dark immersive style.
  *
  * @syscap SystemCapability.Web.Webview.Core
  * @stagemodelonly
  * @since 26.0.0 dynamic
  */
  DARK_IMMERSIVE = 3
}

/**
 * The configuration of native media player.
 *
 * @typedef NativeMediaPlayerConfig
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
declare interface NativeMediaPlayerConfig {
  /**
   * Whether to enable the application to take over the webpage media playback function.
   *
   * @type { boolean }
   *    {@code true} means to enable the application to take over the web media playback function, {@code false} otherwise.
   *    Deflault value: false.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  enable: boolean;

  /**
   * Whether the video player's display overlays the web page content when the application takes over the web page's video player.
   *
   * @type { boolean }
   *    {@code true} means changing the height of the video layer to cover the content of the webpage, {@code false} otherwise.
   *    Deflault value: false.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  shouldOverlay: boolean;
}

/**
 * The callback of render process not responding.
 *
 * @typedef { function } OnRenderProcessNotRespondingCallback
 * @param { RenderProcessNotRespondingData } data - details of onRenderProcessNotResponding.
 * @syscap SystemCapability.Web.Webview.Core
 * @since 12 dynamic
 */
type OnRenderProcessNotRespondingCallback = (data : RenderProcessNotRespondingData) => void;

/**
 * The callback of render process responding.
 *
 * @typedef { function } OnRenderProcessRespondingCallback
 * @syscap SystemCapability.Web.Webview.Core
 * @since 12 dynamic
 */
type OnRenderProcessRespondingCallback = () => void;

/**
 * The callback of ViewportFit Changed.
 *
 * @typedef { function } OnViewportFitChangedCallback
 * @param { ViewportFit } viewportFit - details of OnViewportFitChangedCallback.
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
type OnViewportFitChangedCallback = (viewportFit: ViewportFit) => void;

/**
 * The callback of ads block
 *
 * @typedef { function } OnAdsBlockedCallback
 * @param { AdsBlockedDetails } details - details of OnAdsBlockedCallback.
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
type OnAdsBlockedCallback = (details: AdsBlockedDetails) => void;

/**
 * The callback when camera capturing state of current page has been changed.
 *
 * @typedef { function } OnCameraCaptureStateChangeCallback
 * @param { CameraCaptureStateChangeInfo } event - the camera capturing state event.
 * @syscap SystemCapability.Web.Webview.Core
 * @since 23 dynamic
 */
type OnCameraCaptureStateChangeCallback = (event: CameraCaptureStateChangeInfo) => void;

/**
 * The callback when microphone capturing state of current page has been changed.
 *
 * @typedef { function } OnMicrophoneCaptureStateChangeCallback
 * @param { MicrophoneCaptureStateChangeInfo } event - the microphone capturing state event.
 * @syscap SystemCapability.Web.Webview.Core
 * @since 23 dynamic
 */
type OnMicrophoneCaptureStateChangeCallback = (event: MicrophoneCaptureStateChangeInfo) => void;

/**
 * Defines the ads block details.
 *
 * @interface AdsBlockedDetails
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
declare interface AdsBlockedDetails {
  /**
   * The url of main frame.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  url: string;

  /**
   * the url of ads.
   *
   * @type { Array<string> }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  adsBlocked: Array<string>;
}

/**
 * Defines the web keyboard options when onInterceptKeyboardAttach event return.
 *
 * @interface WebKeyboardOptions
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
declare interface WebKeyboardOptions {
  /**
   * Whether the system keyboard is used.
   *
   * @type { boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  useSystemKeyboard: boolean;

  /**
   * Set the enter key type when the system keyboard is used, the "enter" key related to the {@link inputMethodEngine}.
   *
   * @type { ?number }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  enterKeyType?: number;

  /**
   * Set the custom keyboard builder when the custom keyboard is used.
   *
   * @type { ?CustomBuilder }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  customKeyboard?: CustomBuilder;
}

/**
 * Define the controller to interact with a custom keyboard, related to the {@link onInterceptKeyboardAttach} event.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
declare class WebKeyboardController {
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  constructor();

  /**
   * Insert characters in the Web input field.
   *
   * @param { string } text - text which will be inserted.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 12 dynamic
   */
  insertText(text: string): void;

  /**
   * Deletes the specified length of characters from the back to the front in the Web input field.
   *
   * @param { number } length - length of text, which will be deleted from back to front.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 12 dynamic
   */
  deleteForward(length: number): void;

  /**
   * Delete the specified length of characters in the Web input field from the beginning to the end.
   *
   * @param { number } length - length of text, which will be deleted from front to back.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 12 dynamic
   */
  deleteBackward(length: number): void;

  /**
   * Send the function of the key.
   *
   * @param { number } key - action indicates the "enter" key related to the {@link inputMethodEngine}
   * @syscap SystemCapability.Web.Webview.Core
   * @since 12 dynamic
   */
  sendFunctionKey(key: number): void;

  /**
   * Close the custom keyboard.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 12 dynamic
   */
  close(): void;
}

/**
 * Defines the web keyboard callback info related to the {@link onInterceptKeyboardAttach} event.
 *
 * @interface WebKeyboardCallbackInfo
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
declare interface WebKeyboardCallbackInfo {
  /**
   * The web keyboard controller.
   *
   * @type { WebKeyboardController }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  controller: WebKeyboardController;

  /**
   * The attributes of web input element.
   *
   * @type { Record<string, string> }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  attributes: Record<string, string>;
}

/**
 * The callback of onInterceptKeyboardAttach event.
 *
 * @typedef { function } WebKeyboardCallback
 * @param { WebKeyboardCallbackInfo } keyboardCallbackInfo - callback information of onInterceptKeyboardAttach.
 * @returns { WebKeyboardOptions } Return the web keyboard options of this web component.
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
type WebKeyboardCallback = (keyboardCallbackInfo: WebKeyboardCallbackInfo) => WebKeyboardOptions;

/**
 * Enum type supplied to {@link getMessageLevel} for receiving the console log level of JavaScript.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @since 8
 */
/**
 * Enum type supplied to {@link getMessageLevel} for receiving the console log level of JavaScript.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare enum MessageLevel {
  /**
   * Debug level.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Debug level.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  Debug,

  /**
   * Error level.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Error level.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  Error,

  /**
   * Info level.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Info level.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  Info,

  /**
   * Log level.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Log level.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  Log,

  /**
   * Warn level.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Warn level.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  Warn
}

/**
 * The source of console message.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @since 23 dynamic
 */
declare enum ConsoleMessageSource {
  /**
   * Logs generated by the browser's XML/HTML parser (such as HTML syntax errors, XML format exceptions), for example,
   * parsing warnings caused by unclosed HTML tags.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  XML = 0,

  /**
   * JavaScript execution error, such as syntax error or runtime exception.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  JAVASCRIPT = 1,

  /**
   * Web resource loading failure, such as JS/CSS/image 404.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  NETWORK = 2,

  /**
   * Console API usage, such as console.warn or console.error.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  CONSOLE_API = 3,

  /**
   * Logs from storage modules like LocalStorage, SessionStorage, IndexedDB, or Cookie.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  STORAGE = 4,

  /**
   * Logs from rendering engine (e.g., Blink), such as invalid CSS, layout issues, or rendering performance warnings.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  RENDERING = 5,

  /**
   * Security policy violations, such as HTTPS certificate error or mixed content.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  SECURITY = 6,

  /**
   * Other logs, such as those from extensions.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  OTHER = 7,

  /**
   * Usage of deprecated syntax, such as slider-vertical.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  DEPRECATION = 8,

  /**
   * Errors in service worker or shared worker, such as navigation preload being interrupted.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  WORKER = 9,

  /**
   * Rule violations, such as JavaScript execution exceeding 50ms.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  VIOLATION = 10,

  /**
   * Browser intervention due to potential user experience, security, or performance issues.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  INTERVENTION = 11,

  /**
   * Code practices that do not follow web security best practices, with improvement suggestions.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  RECOMMENDATION = 12
}

/**
 * The Web's behavior to load from HTTP or HTTPS. Defaults to MixedMode.None.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @since 8
 */
/**
 * The Web's behavior to load from HTTP or HTTPS. Defaults to MixedMode.None.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11
 */
/**
 * The Web's behavior to load from HTTP or HTTPS. Defaults to MixedMode.None.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
declare enum MixedMode {
  /**
   * Allows all sources.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Allows all sources.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Loose Mode: HTTP and HTTPS hybrid content can be loaded. This means that all insecure content can be loaded.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  All = 0,

  /**
   * Allows sources Compatibly.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Allows sources Compatibly.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Compatibility Modes: HTTP and HTTPS hybrid content can be loaded in compatibility mode. This means that some insecure content may be loaded.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  Compatible = 1,

  /**
   * Don't allow unsecure sources from a secure origin.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Don't allow unsecure sources from a secure origin.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Strict Mode: HTTP and HTTPS hybrid content cannot be loaded.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  None = 2
}

/**
 * The callback of safe browsing check.
 *
 * @typedef { function } OnSafeBrowsingCheckResultCallback
 * @param { ThreatType } threatType - callback information of onSafeBrowsingCheckResult.
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11 dynamic
 */
type OnSafeBrowsingCheckResultCallback = (threatType: ThreatType) => void;

/**
 * Enum type supplied to {@link getHitTest} for indicating the cursor node HitTest.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @since 8
 */
/**
 * Enum type supplied to {@link getHitTest} for indicating the cursor node HitTest.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11 dynamiconly
 * @deprecated since 21
 * @useinstead ohos.web.webview.webview.WebHitTestType
 */
declare enum HitTestType {
  /**
   * The edit text.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * The edit text.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamiconly
   * @deprecated since 21
   * @useinstead ohos.web.webview.webview.WebHitTestType#EditText
   */
  EditText = 0,

  /**
   * The email address.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * The email address.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamiconly
   * @deprecated since 21
   * @useinstead ohos.web.webview.webview.WebHitTestType#Email
   */
  Email = 1,

  /**
   * The HTML::a tag with src=http.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * The HTML::a tag with src=http.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamiconly
   * @deprecated since 21
   * @useinstead ohos.web.webview.webview.WebHitTestType#HttpAnchor
   */
  HttpAnchor = 2,

  /**
   * The HTML::a tag with src=http + HTML::img.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * The HTML::a tag with src=http + HTML::img.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamiconly
   * @deprecated since 21
   * @useinstead ohos.web.webview.webview.WebHitTestType#HttpAnchorImg
   */
  HttpAnchorImg = 3,

  /**
   * The HTML::img tag.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * The HTML::img tag.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamiconly
   * @deprecated since 21
   * @useinstead ohos.web.webview.webview.WebHitTestType#Img
   */
  Img = 4,

  /**
   * The map address.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * The map address.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamiconly
   * @deprecated since 21
   * @useinstead ohos.web.webview.webview.WebHitTestType#Map
   */
  Map = 5,

  /**
   * The phone number.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * The phone number.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamiconly
   * @deprecated since 21
   * @useinstead ohos.web.webview.webview.WebHitTestType#Phone
   */
  Phone = 6,

  /**
   * Other unknown HitTest.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Other unknown HitTest.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamiconly
   * @deprecated since 21
   * @useinstead ohos.web.webview.webview.WebHitTestType#Unknown
   */
  Unknown = 7
}

/**
 * Enum type supplied to {@link cacheMode} for setting the Web cache mode.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @since 8
 */
/**
 * Enum type supplied to {@link cacheMode} for setting the Web cache mode.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11
 */
/**
 * Enum type supplied to {@link cacheMode} for setting the Web cache mode.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
declare enum CacheMode {
  /**
   * load cache when they are available and not expired, otherwise load online.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * load cache when they are available and not expired, otherwise load online.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * load cache when they are available and not expired, otherwise load online.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  Default = 0,

  /**
   * load cache when they are available, otherwise load online.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * load cache when they are available, otherwise load online.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * load cache when they are available, otherwise load online.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  None = 1,

  /**
   * Load online and not cache.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Load online and not cache.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Load online and not cache.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  Online = 2,

  /**
   * load cache and not online.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * load cache and not online.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * load cache and not online.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  Only = 3
}

/**
 * Enum type supplied to {@link overScrollMode} for setting the web overScroll mode.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11 dynamic
 */
declare enum OverScrollMode {
  /**
   * Disable the web over-scroll mode.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  NEVER = 0,

  /**
   * Enable the web over-scroll mode.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  ALWAYS = 1
}

/**
 * Enum type supplied to {@link blurOnKeyboardHideMode} for setting the web blurOnKeyboardHide mode.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 14 dynamic
 */
declare enum BlurOnKeyboardHideMode {
  /**
   * The focused input elements on webview will not blur when soft keyboard is hidden manually.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 14 dynamic
   */
  SILENT = 0,

  /**
   * The focused input elements on webview will blur when soft keyboard is hidden manually.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 14 dynamic
   */
  BLUR = 1
}

/**
 * Enum type supplied to {@link darkMode} for setting the web dark mode.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @since 9
 */
/**
 * Enum type supplied to {@link darkMode} for setting the web dark mode.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11 dynamic
 */
declare enum WebDarkMode {
  /**
   * Disable the web dark mode.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Disable the web dark mode.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  Off = 0,

  /**
   * Enable the web dark mode.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Enable the web dark mode.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  On = 1,

  /**
   * Make web dark mode follow the system.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Make web dark mode follow the system.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  Auto = 2
}

/**
 * Enum type supplied to {@link captureMode} for setting the web capture mode.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @since 10
 */
/**
 * Enum type supplied to {@link captureMode} for setting the web capture mode.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11 dynamic
 */
declare enum WebCaptureMode {
  /**
   * The home screen.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 10
   */
  /**
   * Capture of the home screen.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  HOME_SCREEN = 0
}

/**
 * Enum type supplied to {@link threatType} for the website's threat type.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11 dynamic
 */
declare enum ThreatType {
  /**
   * Illegal websites.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  THREAT_ILLEGAL = 0,

  /**
   * Fraud websites.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  THREAT_FRAUD = 1,

  /**
   * Websites with security risks.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  THREAT_RISK = 2,

  /**
   * Websites suspected of containing unhealthy content.
   * ArkWeb will not intercept this type of website and apps could handle it themselves.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  THREAT_WARNING = 3,

  /**
   * Security check passed, no risks found.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 21 dynamic
   */
  THREAT_NONE = 4,

  /**
   * Security check not performed.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 21 dynamic
   */
  THREAT_UNPROCESSED = 5
}

/**
 * Defines the Media Options.
 *
 * @interface WebMediaOptions
 * @syscap SystemCapability.Web.Webview.Core
 * @since 10
 */
/**
 * Defines the Media Options.
 *
 * @interface WebMediaOptions
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11
 */
/**
 * Defines the Media Options.
 *
 * @typedef WebMediaOptions
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
declare interface WebMediaOptions {
  /**
   * The time interval for audio playback to resume.
   *
   * @type { ?number }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 10
   */
  /**
   * Validity period for automatically resuming a paused web audio, in seconds.
   * The maximum validity period is 60 seconds. Due to the approximate value,
   * the validity period may have a deviation of less than 1 second.
   *
   * @type { ?number }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  resumeInterval?: number;

  /**
   * Whether the audio of each web is exclusive.
   *
   * @type { ?boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 10
   */
  /**
   * Whether the audio of multiple Web instances in an application is exclusive.
   *
   * @type { ?boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  audioExclusive?: boolean;

  /**
   * The type for audio sessions.
   *
   * @type { ?AudioSessionType }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  audioSessionType?: AudioSessionType;
}

/**
 * Defines the screen capture configuration.
 *
 * @interface ScreenCaptureConfig
 * @syscap SystemCapability.Web.Webview.Core
 * @since 10
 */
/**
 * Defines the screen capture configuration.
 *
 * @interface ScreenCaptureConfig
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11
 */
/**
 * Defines the screen capture configuration.
 *
 * @typedef ScreenCaptureConfig
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
declare interface ScreenCaptureConfig {
  /**
   * The mode for selecting the recording area.
   *
   * @type { WebCaptureMode }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 10
   */
  /**
   * The mode for selecting the recording area.
   *
   * @type { WebCaptureMode }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  captureMode: WebCaptureMode;
}

/**
 * Define the handler to exit the full screen mode, related to the {@link onFullScreenEnter} event.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @since 9
 */
/**
 * Define the handler to exit the full screen mode, related to the {@link onFullScreenEnter} event.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11
 */
/**
 * Define the handler to exit the full screen mode, related to the {@link onFullScreenEnter} event.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
declare class FullScreenExitHandler {
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  constructor();

  /**
   * Exit the full screen mode.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Exit the full screen mode.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Called when the Web component exits full screen mode.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  exitFullScreen(): void;
}

/**
 * Defines the event details when the web component enter full screen mode.
 *
 * @typedef FullScreenEnterEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12
 */
/**
 * Defines the event details when the web component enter full screen mode.
 *
 * @typedef FullScreenEnterEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
declare interface FullScreenEnterEvent {
  /**
   * A function handle to exit full-screen mode.
   *
   * @type { FullScreenExitHandler }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * A function handle to exit full-screen mode.
   *
   * @type { FullScreenExitHandler }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  handler: FullScreenExitHandler;

  /**
   * The intrinsic width of the video if the fullscreen element contains video element, expressed in CSS pixels.
   *
   * @type { ?number }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * The intrinsic width of the video if the fullscreen element contains video element, expressed in CSS pixels.
   *
   * @type { ?number }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  videoWidth?: number;

  /**
   * The intrinsic height of the video if the fullscreen element contains video element, expressed in CSS pixels.
   *
   * @type { ?number }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * The intrinsic height of the video if the fullscreen element contains video element, expressed in CSS pixels.
   *
   * @type { ?number }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  videoHeight?: number;
}

/**
 * The callback when the web component enter full screen mode.
 *
 * @typedef { function } OnFullScreenEnterCallback
 * @param { FullScreenEnterEvent } event - callback information of onFullScreenEnter.
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12
 */
/**
 * The callback when the web component enter full screen mode.
 *
 * @typedef { function } OnFullScreenEnterCallback
 * @param { FullScreenEnterEvent } event - callback information of onFullScreenEnter.
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
type OnFullScreenEnterCallback = (event: FullScreenEnterEvent) => void;

/**
 * The callback when mouse event is triggered in native embed area
 *
 * @typedef { function } MouseInfoCallback
 * @param { NativeEmbedMouseInfo } event - callback information of mouse event in native embed area.
 * @syscap SystemCapability.Web.Webview.Core
 * @since 20 dynamic
 */
type MouseInfoCallback = (event: NativeEmbedMouseInfo) => void;

/**
 * Enum type supplied to {@link renderExitReason} when onRenderExited being called.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @since 9
 */
/**
 * Enum type supplied to {@link renderExitReason} when onRenderExited being called.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11 dynamic
 */
declare enum RenderExitReason {
  /**
   * Render process non-zero exit status.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Render process non-zero exit status.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  ProcessAbnormalTermination = 0,

  /**
   * SIGKILL or task manager kill.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * SIGKILL or task manager kill.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  ProcessWasKilled = 1,

  /**
   * Segmentation fault.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * The rendering process crashes and exits, such as a segment error.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  ProcessCrashed = 2,

  /**
   * Out of memory.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Out of memory.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  ProcessOom = 3,

  /**
   * Unknown reason.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Unknown reason.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  ProcessExitUnknown = 4
}

/**
 * The callback of custom hide of the context menu.
 *
 * @typedef { function } OnContextMenuHideCallback
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11 dynamic
 */
type OnContextMenuHideCallback = () => void;

/**
 * Enum type supplied to {@link error} when onSslErrorEventReceive being called.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @since 9
 */
/**
 * Enum type supplied to {@link error} when onSslErrorEventReceive being called.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11
 */
/**
 * Enum type supplied to {@link error} when onSslErrorEventReceive being called.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 23 dynamic
 */
declare enum SslError {
  /**
   * General error.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * General error.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  Invalid = 0,

  /**
   * Hostname mismatch.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Hostname mismatch.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Hostname mismatch.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  HostMismatch = 1,

  /**
   * The certificate date is invalid.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * The certificate date is invalid.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * The certificate date is invalid.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  DateInvalid = 2,

  /**
   * The certificate authority is not trusted.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * The certificate authority is not trusted.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * The certificate authority is not trusted.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  Untrusted = 3
}

/**
 * Enum type supplied to {@link FileSelectorParam} when onFileSelectorShow being called.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @since 9
 */
/**
 * Enum type supplied to {@link FileSelectorParam} when onFileSelectorShow being called.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare enum FileSelectorMode {
  /**
   * Allows single file to be selected.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Allows single file to be selected.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  FileOpenMode = 0,

  /**
   * Allows multiple files to be selected.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Allows multiple files to be selected.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  FileOpenMultipleMode = 1,

  /**
   * Allows file folders to be selected.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Allows file folders to be selected.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  FileOpenFolderMode = 2,

  /**
   * Allows select files to save.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Allows select files to save.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  FileSaveMode = 3
}

/**
 * Enum type supplied to {@link layoutMode} for setting the web layout mode.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11 dynamic
 */
declare enum WebLayoutMode {
  /**
   * Web layout follows the system.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  NONE = 0,

  /**
   * Adaptive web layout based on page size.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  FIT_CONTENT = 1
}

/**
 * Enum type supplied to {@link RenderProcessNotRespondingData} when onRenderProcessNotResponding is called.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @since 12 dynamic
 */
declare enum RenderProcessNotRespondingReason {
  /**
   * Timeout for input sent to render process.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 12 dynamic
   */
  INPUT_TIMEOUT = 0,

  /**
   * The new webpage loading navigation response timed out.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 12 dynamic
   */
  NAVIGATION_COMMIT_TIMEOUT = 1
}

/**
 * Encompassed message information as parameters to {@link onFileSelectorShow} method.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @since 9
 */
/**
 * Encompassed message information as parameters to {@link onFileSelectorShow} method.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare class FileSelectorParam {
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  constructor();

  /**
   * Gets the title of this file selector.
   * @returns { string } Return the title of this file selector.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Gets the title of this file selector.
   * @returns { string } Return the title of this file selector.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  getTitle(): string;

  /**
   * Gets the FileSelectorMode of this file selector.
   * @returns { FileSelectorMode } Return the FileSelectorMode of this file selector.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Gets the FileSelectorMode of this file selector.
   * @returns { FileSelectorMode } Return the FileSelectorMode of this file selector.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  getMode(): FileSelectorMode;

  /**
   * Gets an array of acceptable MIME type.
   * @returns { Array<string> } Return an array of acceptable MIME type.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Gets an array of acceptable MIME type.
   * @returns { Array<string> } Return an array of acceptable MIME type.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  getAcceptType(): Array<string>;

  /**
   * Gets whether this file selector use a live media captured value.
   *
   * @returns { boolean } Return {@code true} if captured media; return {@code false} otherwise.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Gets whether this file selector use a live media captured value.
   *
   * @returns { boolean } Return {@code true} if captured media; return {@code false} otherwise.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  isCapture(): boolean;

  /**
   * Gets an array of raw acceptable MIME type.
   * @returns { Array<string> } Return an array of raw acceptable MIME type.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 18 dynamic
   */
  getMimeTypes(): Array<string>;

  /**
   * Gets suggested file names.
   *
   * @returns { string } Return the suggested file names.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  getSuggestedName(): string;

  /**
   * Get the default path opened when pulling up the selector.
   *
   * @returns { string } Return to the default path opened when pulling up the selector.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  getDefaultPath(): string;

  /**
   * Gets a description array of file types.
   *
   * @returns { Array<string> } Return an array of description of the file type.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  getDescriptions(): Array<string>;

  /**
   * Gets whether to filter fully matching file types.
   *
   * @returns { boolean } Return whether to filter all matching file types.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  isAcceptAllOptionExcluded(): boolean;

  /**
   * Gets an array of selected types for web page files.
   *
   * @returns { Array<Array<AcceptableFileType>> } Return an array of selected types for web page files.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  getAcceptableFileTypes(): Array<Array<AcceptableFileType>>;
}

/**
 * Defines the js result.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @since 8
 */
/**
 * Defines the js result.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare class JsResult {
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  constructor();

  /**
   * Handle the user's JavaScript result if cancel the dialog.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Handle the user's JavaScript result if cancel the dialog.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  handleCancel(): void;

  /**
   * Handle the user's JavaScript result if confirm the dialog.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Handle the user's JavaScript result if confirm the dialog.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  handleConfirm(): void;

  /**
   * Handle the user's JavaScript result if confirm the prompt dialog.
   *
   * @param { string } result
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Handle the user's JavaScript result if confirm the prompt dialog.
   *
   * @param { string } result - The content of the dialog box entered by the user.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  handlePromptConfirm(result: string): void;
}

/**
 * Defines the file selector result, related to {@link onFileSelectorShow} method.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @since 9
 */
/**
 * Defines the file selector result, related to {@link onFileSelectorShow} method.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare class FileSelectorResult {
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  constructor();

  /**
   * select a list of files.
   *
   * @param { Array<string> } fileList
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * select a list of files.
   *
   * @param { Array<string> } fileList - List of files that need to be operated.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  handleFileList(fileList: Array<string>): void;
}

/**
 * Defines the http auth request result, related to {@link onHttpAuthRequest} method.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @since 9
 */
/**
 * Defines the http auth request result, related to {@link onHttpAuthRequest} method.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare class HttpAuthHandler {
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  constructor();

  /**
   * confirm.
   *
   * @param { string } userName
   * @param { string } password
   * @returns { boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * confirm.
   *
   * @param { string } userName
   * @param { string } password
   * @returns { boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  confirm(userName: string, password: string): boolean;

  /**
   * cancel.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * cancel.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  cancel(): void;

  /**
   * isHttpAuthInfoSaved.
   *
   * @returns { boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * isHttpAuthInfoSaved.
   *
   * @returns { boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  isHttpAuthInfoSaved(): boolean;
}

/**
 * Defines the ssl error request result, related to {@link onSslErrorEventReceive} method.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @since 9
 */
/**
 * Defines the ssl error request result, related to {@link onSslErrorEventReceive} method.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11
 */
/**
 * Defines the ssl error request result, related to {@link onSslErrorEventReceive} method.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 23 dynamic
 */
declare class SslErrorHandler {
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  constructor();

  /**
   * Confirm to use the SSL certificate.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Confirm to use the SSL certificate.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Confirm to use the SSL certificate.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  handleConfirm(): void;

  /**
   * Cancel this request.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Cancel this request.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Cancel this request.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  handleCancel(): void;

  /**
   * ArkWeb has encountered an SSL certificate error, and this interface indicates whether to terminate or
   * continue displaying the error to users.
   *
   * @param { boolean } abortLoading If abortLoading is true, the current request will be canceled and the
   *                                 user will remain on the current page. If it is false, the SSL error
   *                                 will not be ignored, and a blank page will be displayed. If a default
   *                                 error page is enabled, the default error page will be shown instead.
   *                                 The default value is false.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  handleCancel(abortLoading: boolean): void;
}

/**
 * Defines the client certificate request result, related to {@link onClientAuthenticationRequest} method.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @since 9
 */
/**
 * Defines the client certificate request result, related to {@link onClientAuthenticationRequest} method.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11 dynamic
 */
declare class ClientAuthenticationHandler {
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  constructor();

  /**
   * Confirm to use the specified private key and client certificate chain.
   *
   * @param { string } priKeyFile - The file that store private key.
   * @param { string } certChainFile - The file that store client certificate chain.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Confirm to use the specified private key and client certificate chain.
   *
   * @param { string } priKeyFile - The file that store private key.
   * @param { string } certChainFile - The file that store client certificate chain.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  confirm(priKeyFile: string, certChainFile: string): void;

  /**
   * Confirm to use the authUri.The authUri can be obtained from certificate management.
   *
   * @param { string } authUri is the key of credentials.The credentials contain sign info and client certificates info.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 10
   */
  /**
   * Confirm to use the authUri.The authUri can be obtained from certificate management.
   *
   * @param { string } authUri is the key of credentials.The credentials contain sign info and client certificates info.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  confirm(authUri: string): void;

  /**
   * Confirm to use the identify of the certificate. The identify can be obtained from certificate management.
   *
   * @param { string } identity - The identify of the credential.
   * @param { CredentialType | string } credentialTypeOrCertChainFile - The type of the credential or the file that store
   *     client certificate chain.
   * @throws { BusinessError } 801 - Capability not supported.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  confirm(identity: string, credentialTypeOrCertChainFile: CredentialType | string): void;

  /**
   * Cancel this certificate request.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Cancel this certificate request.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  cancel(): void;

  /**
   * Ignore this certificate request temporarily.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Ignore this certificate request temporarily.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  ignore(): void;
}

/**
 * Passes the PIN code verify result through VerifyPinHandler#confirm
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @since 22 dynamic
 */
declare class VerifyPinHandler {
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  constructor();
  /**
   * Passes the PIN code verify result.
   *
   * @param { PinVerifyResult } result The PIN code verify result.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  confirm(result: PinVerifyResult): void;
}

/**
 * Defines the accessible resource type, related to {@link onPermissionRequest} method.
 *
 * @enum { string }
 * @syscap SystemCapability.Web.Webview.Core
 * @since 9
 */
/**
 * Defines the accessible resource type, related to {@link onPermissionRequest} method.
 *
 * @enum { string }
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare enum ProtectedResourceType {
  /**
   * The MidiSysex resource.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * The MidiSysex resource. Currently, only permission events can be reported. MIDI devices are not yet supported.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  MidiSysex = 'TYPE_MIDI_SYSEX',

  /**
   * The video capture resource, such as camera.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 10
   */
  /**
   * The video capture resource, such as camera.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  VIDEO_CAPTURE = 'TYPE_VIDEO_CAPTURE',

  /**
   * The audio capture resource, such as microphone.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 10
   */
  /**
   * The audio capture resource, such as microphone.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  AUDIO_CAPTURE = 'TYPE_AUDIO_CAPTURE',

  /**
   * The sensor resource, such as accelerometer.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  SENSOR = 'TYPE_SENSOR'
}

/**
 * Defines the onPermissionRequest callback, related to {@link onPermissionRequest} method.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @since 9
 */
/**
 * Implements the PermissionRequest object, related to {@link onPermissionRequest} method.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare class PermissionRequest {
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  constructor();

  /**
   * Reject the request.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Reject the request.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  deny(): void;

  /**
   * Gets the source if the webpage that attempted to access the restricted resource.
   *
   * @returns { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Gets the source if the webpage that attempted to access the restricted resource.
   *
   * @returns { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  getOrigin(): string;

  /**
   * Gets the resource that the webpage is trying to access.
   *
   * @returns { Array<string> }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Obtains the list of accessible resources requested for the web page.
   *
   * @returns { Array<string> } List of accessible resources requested by the web page.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  getAccessibleResource(): Array<string>;

  /**
   * Grant origin access to a given resource.
   *
   * @param { Array<string> } resources
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Grant origin access to a given resource.
   *
   * @param { Array<string> } resources
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  grant(resources: Array<string>): void;
}

/**
 * Defines the onScreenCapture callback, related to {@link onScreenCapture} method.
 * @syscap SystemCapability.Web.Webview.Core
 * @since 10
 */
/**
 * Defines the onScreenCapture callback, related to {@link onScreenCapture} method.
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11 dynamic
 */
declare class ScreenCaptureHandler {
  /**
   * Constructor.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 10
   */
  /**
   * Constructor.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  constructor();

  /**
   * Gets the source of the webpage that attempted to access the restricted resource.
   *
   * @returns { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 10
   */
  /**
   * Obtains the origin of this web page.
   *
   * @returns { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  getOrigin(): string;

  /**
   * Grant origin access to a given resource.
   * @param { ScreenCaptureConfig } config The screen capture configuration.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 10
   */
  /**
   * Grants the screen capture permission.
   * @param { ScreenCaptureConfig } config The screen capture configuration.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  grant(config: ScreenCaptureConfig): void;

  /**
   * Reject the request.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 10
   */
  /**
   * Rejects this screen capture request.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  deny(): void;
}

/**
 * Defines the onDataResubmission callback, related to {@link onDataResubmission} method.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @since 9
 */
/**
 * Defines the onDataResubmission callback, related to {@link onDataResubmission} method.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11 dynamic
 */
declare class DataResubmissionHandler {
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  constructor();

  /**
   * Resend related form data.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Resend related form data.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  resend(): void;

  /**
   * Do not resend related form data.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Do not resend related form data.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  cancel(): void;
}

/**
 * Defines the onWindowNew callback, related to {@link onWindowNew} method.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @since 9
 */
/**
 * Defines the onWindowNew callback, related to {@link onWindowNew} method.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11 dynamic
 */
declare class ControllerHandler {
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  constructor();

  /**
   * Set WebController object.
   *
   * @param { WebviewController } controller
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Set to null if you don't need to open a new window.
   *
   * @param { WebviewController } controller
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  setWebController(controller: WebviewController): void;
}

/**
 * Defines the context menu source type, related to {@link onContextMenuShow} method.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @since 9
 */
/**
 * Defines the context menu source type, related to {@link onContextMenuShow} method.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11 dynamic
 */
declare enum ContextMenuSourceType {
  /**
   * Other source types.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Other source types.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  None = 0,

  /**
   * Mouse.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Mouse.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  Mouse = 1,

  /**
   * Long press.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Long press.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  LongPress = 2
}

/**
 * Defines the context menu media type, related to {@link onContextMenuShow} method.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @since 9
 */
/**
 * Defines the context menu media type, related to {@link onContextMenuShow} method.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11 dynamic
 */
declare enum ContextMenuMediaType {
  /**
   * Not a special node or other media types.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Not a special node or other media types.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  None = 0,

  /**
   * Image.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Image.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  Image = 1
}

/**
 * Defines the context menu media type, related to {@link onContextMenuShow} method.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @since 22 dynamic
 */
declare enum ContextMenuDataMediaType {
  /**
   * Not a special node or other media types.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  NONE = 0,

  /**
   * Image.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  IMAGE = 1,

  /**
   * Video.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  VIDEO = 2,

  /**
   * Audio.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  AUDIO = 3,

  /**
   * Canvas.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  CANVAS = 4
}

/**
 * Defines the context menu input field type, related to {@link onContextMenuShow} method.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @since 9
 */
/**
 * Defines the context menu input field type, related to {@link onContextMenuShow} method.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11 dynamic
 */
declare enum ContextMenuInputFieldType {
  /**
   * Not an input field.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Not an input field.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  None = 0,

  /**
   * The plain text type.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * The plain text type.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  PlainText = 1,

  /**
   * The password type.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * The password type.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  Password = 2,

  /**
   * The number type.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * The number type.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  Number = 3,

  /**
   * The telephone type.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * The telephone type.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  Telephone = 4,

  /**
   * Other types.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Other types.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  Other = 5
}

/**
 * Defines the lifecycle of the same-layer tag.
 * When the same-layer tag exists on the loaded page,
 * CREATE is triggered. When the same-layer tag is moved or is enlarged,
 * **UPDATE **is triggered. When the page exits, DESTROY is triggered.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11 dynamic
 */
declare enum NativeEmbedStatus {
  /**
   * The same-layer tag is created.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  CREATE = 0,

  /**
   * The same-layer tag is updated.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  UPDATE = 1,

  /**
   *The same-layer tag is destroyed.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  DESTROY = 2,

  /**
   * The same-layer tag enters the BFCache.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  ENTER_BFCACHE = 3,

  /**
   * The same-layer tag leaves the BFCache.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  LEAVE_BFCACHE = 4
}

/**
 * Defines the context menu supported event bit flags, related to {@link onContextMenuShow} method.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @since 9
 */
/**
 * Defines the context menu supported event bit flags, related to {@link onContextMenuShow} method.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11 dynamic
 */
declare enum ContextMenuEditStateFlags {
  /**
   * Not editable.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Not editable.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  NONE = 0,

  /**
   * Clipping is supported.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Clipping is supported.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  CAN_CUT = 1 << 0,

  /**
   * Copies are supported.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Copies are supported.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  CAN_COPY = 1 << 1,

  /**
   * Support for pasting.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Pasting is supported.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  CAN_PASTE = 1 << 2,

  /**
   * Select all is supported.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Select all is supported.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  CAN_SELECT_ALL = 1 << 3
}

/**
 * Enum type supplied to {@link navigationType} for the navigation's type.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11 dynamic
 */
declare enum WebNavigationType {
  /**
   * Unknown type.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  UNKNOWN = 0,

  /**
   * A new entry was created due to a navigation happened on the main frame.
   * Contains all situations that will generate a mainframe navigation entry,
   * which means that navigations to a hash on the same document or history.pushState
   * also belong to this type.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  MAIN_FRAME_NEW_ENTRY = 1,

  /**
   * Navigate to an existing entry due to a navigation on the main frame.
   * e.g.
   *   1. History navigations.
   *   2. Reloads (contains loading the same url).
   *   3. Same-document navigations(history.replaceState(), location.replace()).
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  MAIN_FRAME_EXISTING_ENTRY = 2,

  /**
   * A navigation happened on subframe which was triggered by user.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  NAVIGATION_TYPE_NEW_SUBFRAME = 4,

  /**
   * A navigation happened on the subframe automatically.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  NAVIGATION_TYPE_AUTO_SUBFRAME = 5
}

/**
 * Enumerates the rendering mode of Web components. By default, the asynchronous rendering mode is used.
 * The asynchronous rendering mode is recommended because it has better performance and lower power consumption.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
declare enum RenderMode {
  /**
   * The Web component is rendered asynchronously.
   * The ArkWeb component as a graphic surface node is displayed independently.
   * The maximum width of the Web component is 7,680 px (physical pixel).
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  ASYNC_RENDER = 0,

  /**
   * The Web component is rendered synchronously.
   * The ArkWeb component as a graphic canvas node is displayed together with the system component.
   * The maximum width of the Web component is 500,000 px (physical pixel).
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  SYNC_RENDER = 1
}

/**
 * Defines the viewport-fit type, related to {@link ViewportFit}.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
declare enum ViewportFit {
  /**
   * No effect - the whole web page is viewable(default)
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  AUTO = 0,

  /**
   * The initial layout viewport and the visual viewport are set to the
   * largest rectangle which is inscribe in the display of the device.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  CONTAINS = 1,

  /**
   * The initial layout viewport and the visual viewport are set to the
   * circumscribe rectangle of the physical screen of the device.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  COVER = 2
}

/**
 * Defines the context menu param, related to {@link WebContextMenuParam} method.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @since 9
 */
/**
 * Defines the context menu param, related to {@link WebContextMenuParam} method.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11 dynamic
 */
declare class WebContextMenuParam {
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  constructor();

  /**
   * Horizontal offset coordinates of the menu within the Web component.
   *
   * @returns { number } The context menu x coordinate.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Horizontal offset coordinates of the menu within the Web component.
   *
   * @returns { number } The context menu x coordinate.
   *                     Returns a non-negative integer if normal, otherwise returns -1.
   *                     Unit: vp.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  x(): number;

  /**
   * Vertical offset coordinates for the menu within the Web component.
   *
   * @returns { number } The context menu y coordinate.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Vertical offset coordinates for the menu within the Web component.
   *
   * @returns { number } The context menu y coordinate.
   *                     Returns a non-negative integer if normal, otherwise returns -1.
   *                     Unit: vp.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  y(): number;

  /**
   * If the long-press location is the link returns the link's security-checked URL.
   *
   * @returns { string } If relate to a link return link url, else return null.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * If the long-press location is the link returns the link's security-checked URL.
   *
   * @returns { string } If relate to a link return link url, else return null.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  getLinkUrl(): string;

  /**
   * If the long-press location is the link returns the link's original URL.
   *
   * @returns { string } If relate to a link return unfiltered link url, else return null.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * If the long-press location is the link returns the link's original URL.
   *
   * @returns { string } If relate to a link return unfiltered link url, else return null.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  getUnfilteredLinkUrl(): string;

  /**
   * Returns the SRC URL if the selected element has a SRC attribute.
   *
   * @returns { string } If this context menu is "src" attribute, return link url, else return null.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Returns the SRC URL if the selected element has a SRC attribute.
   *
   * @returns { string } If this context menu is "src" attribute, return link url, else return null.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  getSourceUrl(): string;

  /**
   * Long press menu location has image content.
   *
   * @returns { boolean } Return whether this context menu has image content.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Long press menu location has image content.
   *
   * @returns { boolean } Return whether this context menu has image content.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  existsImageContents(): boolean;

  /**
   * Returns the type of context node.
   *
   * @returns { ContextMenuMediaType } Returns the type of context node.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Returns the type of context node.
   *
   * @returns { ContextMenuMediaType } Returns the type of context node.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  getMediaType(): ContextMenuMediaType;

  /**
   * Returns the text of the selection.
   *
   * @returns { string } Returns the text of the selection.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Returns the text of the selection.
   *
   * @returns { string } Returns the text of the selection, or return null if no text is selected.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  getSelectionText(): string;

  /**
   * Returns the context menu source type.
   *
   * @returns { ContextMenuSourceType }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Returns the context menu source type.
   *
   * @returns { ContextMenuSourceType }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  getSourceType(): ContextMenuSourceType;

  /**
   * Returns input field type if the context menu was invoked on an input field.
   *
   * @returns { ContextMenuInputFieldType } Input field type if the context menu was invoked on an input field.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Returns input field type if the context menu was invoked on an input field.
   *
   * @returns { ContextMenuInputFieldType } Input field type if the context menu was invoked on an input field.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  getInputFieldType(): ContextMenuInputFieldType;

  /**
   * Returns whether the context is editable.
   *
   * @returns { boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Returns whether the context is editable.
   *
   * @returns { boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  isEditable(): boolean;

  /**
   * Returns the context editable flags {@link ContextMenuEditStateFlags}.
   *
   * @returns { number }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Returns the context editable flags {@link ContextMenuEditStateFlags}.
   *
   * @returns { number }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  getEditStateFlags(): number;

  /**
   * Returns the selection menu preview width.
   *
   * @returns { number } The preview menu width.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 13 dynamic
   */
  getPreviewWidth(): number;

  /**
   * Returns the selection menu preview height.
   *
   * @returns { number } The preview menu height.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 13 dynamic
   */
  getPreviewHeight(): number;

  /**
   * Returns the type of context node.
   *
   * @returns { ContextMenuDataMediaType } Returns the type of context node.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  getContextMenuMediaType(): ContextMenuDataMediaType;
}

/**
 * Defines the context menu result, related to {@link WebContextMenuResult} method.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @since 9
 */
/**
 * Defines the context menu result, related to {@link WebContextMenuResult} method.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11 dynamic
 */
declare class WebContextMenuResult {
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  constructor();

  /**
   * When close context menu without other call in WebContextMenuResult,
   * User should call this function to close menu
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * When close context menu without other call in WebContextMenuResult,
   * User should call this function to close menu
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  closeContextMenu(): void;

  /**
   * If WebContextMenuParam has image content, this function will copy image related to this context menu.
   * If WebContextMenuParam has no image content, this function will do nothing.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * If WebContextMenuParam has image content, this function will copy image related to this context menu.
   * If WebContextMenuParam has no image content, this function will do nothing.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  copyImage(): void;

  /**
   * Executes the copy operation related to this context menu.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Executes the copy operation related to this context menu.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  copy(): void;

  /**
   * Executes the paste operation related to this context menu.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Executes the paste operation related to this context menu.
   *
   * <p><strong>API Note</strong>:<br>
   * Permissions need to be configured: ohos.permission.READ_PASTEBOARD.
   * </p>
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  paste(): void;

  /**
   * Executes the cut operation related to this context menu.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Executes the cut operation related to this context menu.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  cut(): void;

  /**
   * Executes the selectAll operation related to this context menu.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Executes the selectAll operation related to this context menu.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  selectAll(): void;

  /**
   * Executes the redo operation related to this context menu.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  redo(): void;

  /**
   * Executes the undo operation related to this context menu.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  undo(): void;

  /**
   * Executes the paste and match style operation related to this context menu.
   *
   * <p><strong>API Note</strong>:<br>
   * Permissions need to be configured: ohos.permission.READ_PASTEBOARD.
   * </p>
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  pasteAndMatchStyle(): void;

  /**
   * Request to fill the password vault contents into the input field.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  requestPasswordAutoFill(): void;

  /**
   * Performing the "Save As Image" operation associated with this context menu will trigger the download process.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @stagemodelonly
   * @since 24 dynamic
   */
  saveImage(): void;
}

/**
 * Encompassed message information as parameters to {@link onConsole} method.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @since 8
 */
/**
 * Encompassed message information as parameters to {@link onConsole} method.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare class ConsoleMessage {
  /**
   * Constructor.
   *
   * @param { string } message - The console message.
   * @param { string } sourceId - The Web source file's path and name.
   * @param { number } lineNumber - The line number of the console message.
   * @param { MessageLevel } messageLevel - The console log level.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8 dynamiconly
   * @deprecated since 9
   * @useinstead ohos.web.ConsoleMessage#constructor
   */
  constructor(message: string, sourceId: string, lineNumber: number, messageLevel: MessageLevel);

  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  constructor();

  /**
   * Gets the message of a console message.
   *
   * @returns { string } Return the message of a console message.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Gets the message of a console message.
   *
   * @returns { string } Return the message of a console message.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  getMessage(): string;

  /**
   * Gets the Web source file's path and name of a console message.
   *
   * @returns { string } Return the Web source file's path and name of a console message.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Gets the Web source file's path and name of a console message.
   *
   * @returns { string } Return the Web source file's path and name of a console message.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Gets the Web source file's path and name of a console message.
   *
   * @returns { string } Return the Web source file's path and name of a console message.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  getSourceId(): string;

  /**
   * Gets the line number of a console message.
   *
   * @returns { number } Return the line number of a console message.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Gets the line number of a console message.
   *
   * @returns { number } Return the line number of a console message.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Gets the line number of a console message.
   *
   * @returns { number } Return the line number of a console message.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  getLineNumber(): number;

  /**
   * Gets the message level of a console message.
   *
   * @returns { MessageLevel } Return the message level of a console message, which can be {@link MessageLevel}.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Gets the message level of a console message.
   *
   * @returns { MessageLevel } Return the message level of a console message, which can be {@link MessageLevel}.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  getMessageLevel(): MessageLevel;
  /**
   * Gets the source of a console message.
   *
   * @returns { ConsoleMessageSource } Return the source of a console message.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  getSource(): ConsoleMessageSource;
}

/**
 * Encompassed message information as parameters to {@link onConsole} method.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @since 8
 */
/**
 * Defines the Web resource request.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @since 8
 */
/**
 * Defines the Web resource request.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @since 10
 */
/**
 * Defines the Web resource request.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare class WebResourceRequest {
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @since 10
   */
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  constructor();

  /**
   * Gets request headers.
   *
   * @returns { Array<Header> } Return the request headers
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Gets request headers.
   *
   * @returns { Array<Header> } Return the request headers
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Gets request headers.
   *
   * @returns { Array<Header> } Return the request headers
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  getRequestHeader(): Array<Header>;

  /**
   * Gets the request URL.
   *
   * @returns { string } Return the request URL.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Gets the request URL.
   *
   * @returns { string } Return the request URL.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @since 10
   */
  /**
   * Gets the request URL.
   *
   * @returns { string } Return the request URL.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  getRequestUrl(): string;

  /**
   * Check whether the request is associated with gesture.
   *
   * @returns { boolean } Return {@code true} if the request is associated with gesture;return {@code false} otherwise.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Check whether the request is associated with gesture.
   *
   * @returns { boolean } Return {@code true} if the request is associated with gesture;return {@code false} otherwise.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Check whether the request is associated with gesture.
   *
   * @returns { boolean } Return {@code true} if the request is associated with gesture;return {@code false} otherwise.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  isRequestGesture(): boolean;

  /**
   * Check whether the request is for getting the main frame.
   *
   * @returns { boolean } Return {@code true} if the request is associated with gesture for getting the main frame; return {@code false} otherwise.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Check whether the request is for getting the main frame.
   *
   * @returns { boolean } Return {@code true} if the request is associated with gesture for getting the main frame; return {@code false} otherwise.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Check whether the request is for getting the main frame.
   *
   * @returns { boolean } Return {@code true} if the request is associated with gesture for getting the main frame; return {@code false} otherwise.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  isMainFrame(): boolean;

  /**
   * Check whether the request redirects.
   *
   * @returns { boolean } Return {@code true} if the request redirects; return {@code false} otherwise.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Check whether the request redirects.
   *
   * @returns { boolean } Return {@code true} if the request redirects; return {@code false} otherwise.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Check whether the request redirects.
   *
   * @returns { boolean } Return {@code true} if the request redirects; return {@code false} otherwise.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  isRedirect(): boolean;

  /**
   * Get request method.
   *
   * @returns { string } Return the request method.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Get request method.
   *
   * @returns { string } Return the request method.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Get request method.
   *
   * @returns { string } Return the request method.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  getRequestMethod(): string;
}

/**
 * Defines the Web resource response.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @since 8
 */
/**
 * Defines the Web resource response.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare class WebResourceResponse {
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  constructor();

  /**
   * Gets the response data.
   *
   * @returns { string } Return the response data.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Gets the response data.
   *
   * @returns { string } Return the response data.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Gets the response data.
   *
   * @returns { string } Return the response data.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  getResponseData(): string;

  /**
   * Gets the response data.
   *
   * @returns { string | number | ArrayBuffer | Resource | undefined } Return the response data.
   *                                                                   string type indicate string in HTML format.
   *                                                                   number type indicate file handle.
   *                                                                   Resource type indicate $rawfile resource.
   *                                                                   ArrayBuffer type indicate binary data.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 13
   */
  /**
   * Gets the response data.
   *
   * @returns { string | number | ArrayBuffer | Resource | undefined } Return the response data.
   *                                                                   string type indicate string in HTML format.
   *                                                                   number type indicate file handle.
   *                                                                   Resource type indicate $rawfile resource.
   *                                                                   ArrayBuffer type indicate binary data.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @since 18 dynamic
   */
  getResponseDataEx(): string | number | ArrayBuffer | Resource | undefined;

  /**
   * Gets the response encoding.
   *
   * @returns { string } Return the response encoding.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Gets the response encoding.
   *
   * @returns { string } Return the response encoding.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  getResponseEncoding(): string;

  /**
   * Gets the response MIME type.
   *
   * @returns { string } Return the response MIME type.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Gets the response MIME type.
   *
   * @returns { string } Return the response MIME type.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  getResponseMimeType(): string;

  /**
   * Gets the reason message.
   *
   * @returns { string } Return the reason message.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Gets the reason message.
   *
   * @returns { string } Return the reason message.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Gets the reason message.
   *
   * @returns { string } Return the reason message.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  getReasonMessage(): string;

  /**
   * Gets the response headers.
   *
   * @returns { Array<Header> } Return the response headers.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Gets the response headers.
   *
   * @returns { Array<Header> } Return the response headers.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Gets the response headers.
   *
   * @returns { Array<Header> } Return the response headers.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  getResponseHeader(): Array<Header>;

  /**
   * Gets the response code.
   *
   * @returns { number } Return the response code.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Gets the response code.
   *
   * @returns { number } Return the response code.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  getResponseCode(): number;

  /**
   * Sets the response data.
   *
   * @param { string | number | Resource } data - the response data.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Sets the response data.
   *
   * @param { string | number | Resource } data - the response data.
   *                                              string type indicate strings in HTML format.
   *                                              number type indicate file handle.
   *                                              Resource type indicate $rawfile resource.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 10
   */
  /**
   * Sets the response data.
   *
   * @param { string | number | Resource | ArrayBuffer } data - the response data.
   *                                                            string type indicate strings in HTML format.
   *                                                            number type indicate file handle.
   *                                                            Resource type indicate $rawfile resource.
   *                                                            ArrayBuffer type indicate binary data.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Sets the response data.
   *
   * @param { string | number | Resource | ArrayBuffer } data - the response data.
   *                                                            string type indicate strings in HTML format.
   *                                                            number type indicate file handle.
   *                                                            Resource type indicate $rawfile resource.
   *                                                            ArrayBuffer type indicate binary data.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  setResponseData(data: string | number | Resource | ArrayBuffer): void;

  /**
   * Sets the response encoding.
   *
   * @param { string } encoding the response encoding.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Sets the response encoding.
   *
   * @param { string } encoding the response encoding.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Sets the response encoding.
   *
   * @param { string } encoding the response encoding.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * Sets the response encoding.
   *
   * @param { string } encoding the response encoding.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  setResponseEncoding(encoding: string): void;

  /**
   * Sets the response MIME type.
   *
   * @param { string } mimeType the response MIME type.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Sets the response MIME type.
   *
   * @param { string } mimeType the response MIME type.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Sets the response MIME type.
   *
   * @param { string } mimeType the response MIME type.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * Sets the response MIME type.
   *
   * @param { string } mimeType the response MIME type.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  setResponseMimeType(mimeType: string): void;

  /**
   * Sets the reason message.
   *
   * @param { string } reason the reason message.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Sets the reason message.
   *
   * @param { string } reason the reason message.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Sets the reason message.
   *
   * @param { string } reason the reason message.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * Sets the reason message.
   *
   * @param { string } reason the reason message.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  setReasonMessage(reason: string): void;

  /**
   * Sets the response headers.
   *
   * @param { Array<Header> } header the response headers.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Sets the response headers.
   *
   * @param { Array<Header> } header the response headers.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Sets the response headers.
   *
   * @param { Array<Header> } header the response headers.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * Sets the response headers.
   *
   * @param { Array<Header> } header the response headers.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  setResponseHeader(header: Array<Header>): void;

  /**
   * Sets the response code.
   *
   * @param { number } code the response code.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Sets the response code.
   *
   * @param { number } code the response code.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Sets the response code.
   *
   * @param { number } code the response code.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * Sets the response code.
   *
   * @param { number } code the response code.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  setResponseCode(code: number): void;

  /**
   * Sets the response is ready or not.
   *
   * @param { boolean } IsReady whether the response is ready.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Sets the response is ready or not.
   *
   * @param { boolean } IsReady whether the response is ready.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Sets the response is ready or not.
   *
   * @param { boolean } IsReady whether the response is ready.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * Sets the response is ready or not.
   *
   * @param { boolean } IsReady whether the response is ready.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  setResponseIsReady(IsReady: boolean): void;

  /**
   * Gets whether the response is ready.
   *
   * @returns { boolean } True indicates the response data is ready and false is not ready.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 13
   */
  /**
   * Gets whether the response is ready.
   *
   * @returns { boolean } True indicates the response data is ready and false is not ready.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @since 18 dynamic
   */
  getResponseIsReady(): boolean;
}

/**
 * Defines the Web's request/response header.
 *
 * @interface Header
 * @syscap SystemCapability.Web.Webview.Core
 * @since 8
 */
/**
 * Defines the Web's request/response header.
 *
 * @interface Header
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11
 */
/**
 * Defines the Web's request/response header.
 *
 * @typedef Header
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12
 */
/**
 * Defines the Web's request/response header.
 *
 * @typedef Header
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
declare interface Header {
  /**
   * Gets the key of the request/response header.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Gets the key of the request/response header.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Gets the key of the request/response header.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  headerKey: string;

  /**
   * Gets the value of the request/response header.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Gets the value of the request/response header.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Gets the value of the request/response header.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  headerValue: string;
}

/**
 * Defines the Web resource error.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @since 8
 */
/**
 * Defines the Web resource error.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @since 10
 */
/**
 * Defines the Web resource error.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare class WebResourceError {
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @since 10
   */
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  constructor();

  /**
   * Gets the info of the Web resource error.
   *
   * @returns { string } Return the info of the Web resource error.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Gets the info of the Web resource error.
   *
   * @returns { string } Return the info of the Web resource error.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @since 10
   */
  /**
   * Gets the info of the Web resource error.
   *
   * @returns { string } Return the info of the Web resource error.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  getErrorInfo(): string;

  /**
   * Gets the code of the Web resource error.
   *
   * @returns { number } Return the code of the Web resource error.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Gets the code of the Web resource error.
   *
   * @returns { number } Return the code of the Web resource error.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @since 10
   */
  /**
   * Gets the code of the Web resource error.
   *
   * @returns { number } Return the code of the Web resource error.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  getErrorCode(): number;
}

/**
 * Defines the js geolocation request.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @since 8
 */
/**
 * Defines the js geolocation request.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare class JsGeolocation {
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  constructor();

  /**
   * Report the geolocation permission status from users.
   *
   * @param { string } origin - The origin that ask for the geolocation permission.
   * @param { boolean } allow - The geolocation permission status.
   * @param { boolean } retain - Whether to allow the geolocation permission status to be saved to the system.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Sets the geolocation permission status of a web page.
   *
   * @param { string } origin - Index of the origin.
   * @param { boolean } allow - Geolocation permission status. {@code true} means to allow geolocation permission;
   *                            {@code false} means to disallow geolocation permission.
   * @param { boolean } retain - Whether the geolocation permission status can be saved to the system.
   *                             {@code true} means to allow the geolocation permission status to be saved to
   *                             the system; {@code false} means to disallow the geolocation permission status to
   *                             be saved to the system. You can manage the geolocation permissions saved
   *                             to the system through {@link GeolocationPermissions}.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  invoke(origin: string, allow: boolean, retain: boolean): void;
}

/**
 * Defines the Web cookie.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @since 8
 */
/**
 * Defines the Web cookie.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11 dynamiconly
 * @deprecated since 23
 * @useinstead ohos.web.webview.webview.WebCookieManager
 */
declare class WebCookie {
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamiconly
   * @deprecated since 23
   * @useinstead ohos.web.webview.webview.WebCookieManager
   */
  constructor();

  /**
   * Sets the cookie.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8 dynamiconly
   * @deprecated since 9
   * @useinstead ohos.web.webview.webview.WebCookieManager#setCookie
   */
  setCookie();

  /**
   * Saves the cookies.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8 dynamiconly
   * @deprecated since 9
   * @useinstead ohos.web.webview.webview.WebCookieManager#saveCookieAsync
   */
  saveCookie();
}

/**
 * Represents the event consumption result sent to the Web component.
 * For details about the supported events, see TouchEvent/MouseEvent.
 * If the application does not consume the event, set this parameter to false,
 * and the event will be consumed by the Web component. If the application has consumed the event,
 * set this parameter to true, and the event will not be consumed by the Web component.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
declare class EventResult {
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  constructor();

  /**
   * Sets the gesture event consumption result.
   *
   * @param { boolean } result -  Whether to consume the gesture event.
   *    {@code true} Indicates the consumption of the gesture event.
   *    {@code false} Indicates the non-consumption of the gesture event.
   *    Default value: true.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  setGestureEventResult(result: boolean): void;

  /**
   * Sets the gesture event consumption result.
   *
   * @param { boolean } result -  Whether to consume the gesture event.
   *    {@code true} Indicates the consumption of the gesture event.
   *    {@code false} Indicates the non-consumption of the gesture event.
   *    Default value: true.
   * @param { boolean } stopPropagation - Whether to stop propagation.
   *    This parameter is valid only when result is set to true.
   *    {@code true} Indicates stops the propagation of events farther along.
   *    {@code false} Indicates the propagation of events farther along.
   *    Default value: true.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 14 dynamic
   */
  setGestureEventResult(result: boolean, stopPropagation: boolean): void;

  /**
   * Sets the mouse event consumption result.
   *
   * @param { boolean } result -  Whether to consume the mouse event.
   *    {@code true} Indicates the consumption of the mouse event.
   *    {@code false} Indicates the non-consumption of the mouse event.
   *    Default value: true.
   * @param { boolean } stopPropagation - Whether to stop propagation.
   *    This parameter is valid only when result is set to true.
   *    {@code true} Indicates stops the propagation of events farther along.
   *    {@code false} Indicates the propagation of events farther along.
   *    Default value: true.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  setMouseEventResult(result: boolean, stopPropagation?: boolean): void;
}

/**
 * Defines the Web controller.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @since 8 dynamiconly
 * @deprecated since 9
 * @useinstead ohos.web.webview.webview.WebviewController
 */
declare class WebController {
  /**
   * Constructor.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8 dynamiconly
   * @deprecated since 9
   * @useinstead ohos.web.webview.webview.WebviewController#constructor
   */
  constructor();

  /**
   * Let the Web inactive.
   * It is no longer maintained since API version 9, and it is recommended to use {@link onInactive} instead.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8 dynamiconly
   * @deprecated since 9
   * @useinstead ohos.web.webview.webview.WebviewController#onInactive
   */
  onInactive(): void;

  /**
   * Let the Web active.
   * It is no longer maintained since API version 9, and it is recommended to use {@link onActive} instead.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8 dynamiconly
   * @deprecated since 9
   * @useinstead ohos.web.webview.webview.WebviewController#onActive
   */
  onActive(): void;

  /**
   * Let the Web zoom by.
   *
   * @param { number } factor The zoom factor.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8 dynamiconly
   * @deprecated since 9
   * @useinstead ohos.web.webview.webview.WebviewController#zoom
   */
  zoom(factor: number): void;

  /**
   * Clears the history in the Web.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8 dynamiconly
   * @deprecated since 9
   * @useinstead ohos.web.webview.webview.WebviewController#clearHistory
   */
  clearHistory(): void;

  /**
   * Asynchronously execute JavaScript in the context of the currently displayed page.
   * The result of the script execution will be returned through an asynchronous callback.
   * This method must be used on the UI thread, and the callback will also be invoked on the UI thread.
   * <p><strong>API Note</strong>:<br>
   * The state of JavaScript is no longer persisted across navigations like loadUrl.
   * For example, global variables and functions defined before calling loadUrl will not exist in the loaded page.
   * It is recommended that applications use registerJavaScriptProxy to ensure that the JavaScript state can be persisted across page navigations.
   * <p>
   *
   * @param { object } options The options with a piece of code and a callback.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8 dynamiconly
   * @deprecated since 9
   * @useinstead ohos.web.webview.webview.WebviewController#runJavaScript
   */
  runJavaScript(options: { script: string, callback?: (result: string) => void });

  /**
   * Loads the data or URL.
   *
   * @param { object } options The options with the data or URL and other information.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8 dynamiconly
   * @deprecated since 9
   * @useinstead ohos.web.webview.webview.WebviewController#loadData
   */
  loadData(options: { data: string, mimeType: string, encoding: string, baseUrl?: string, historyUrl?: string });

  /**
   * Loads the given URL.
   *
   * @param { object } options The options with the URL and other information.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8 dynamiconly
   * @deprecated since 9
   * @useinstead ohos.web.webview.webview.WebviewController#loadUrl
   */
  loadUrl(options: { url: string | Resource, headers?: Array<Header> });

  /**
   * refreshes the current URL.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8 dynamiconly
   * @deprecated since 9
   * @useinstead ohos.web.webview.webview.WebviewController#refresh
   */
  refresh();

  /**
   * Stops the current load.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8 dynamiconly
   * @deprecated since 9
   * @useinstead ohos.web.webview.webview.WebviewController#stop
   */
  stop();

  /**
   * Registers the JavaScript object and method list.
   *
   * @param { object } options - The option with the JavaScript object and method list.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8 dynamiconly
   * @deprecated since 9
   * @useinstead ohos.web.webview.webview.WebviewController#registerJavaScriptProxy
   */
  registerJavaScriptProxy(options: { object: object, name: string, methodList: Array<string> });

  /**
   * Deletes a registered JavaScript object with given name.
   *
   * @param { string } name - The name of a registered JavaScript object to be deleted.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8 dynamiconly
   * @deprecated since 9
   * @useinstead ohos.web.webview.webview.WebviewController#deleteJavaScriptRegister
   */
  deleteJavaScriptRegister(name: string);

  /**
   * Gets the type of HitTest.
   *
   * @returns { HitTestType } The type of HitTest.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8 dynamiconly
   * @deprecated since 9
   * @useinstead ohos.web.webview.webview.WebviewController#getHitTest
   */
  getHitTest(): HitTestType;

  /**
   * Gets the request focus.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8 dynamiconly
   * @deprecated since 9
   * @useinstead ohos.web.webview.webview.WebviewController#requestFocus
   */
  requestFocus();

  /**
   * Checks whether the web page can go back.
   *
   * @returns { boolean } Whether the web page can go back.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8 dynamiconly
   * @deprecated since 9
   * @useinstead ohos.web.webview.webview.WebviewController#accessBackward
   */
  accessBackward(): boolean;

  /**
   * Checks whether the web page can go forward.
   *
   * @returns { boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8 dynamiconly
   * @deprecated since 9
   * @useinstead ohos.web.webview.webview.WebviewController#accessForward
   */
  accessForward(): boolean;

  /**
   * Checks whether the web page can go back or forward the given number of steps.
   *
   * @param { number } step The number of steps.
   * @returns { boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8 dynamiconly
   * @deprecated since 9
   * @useinstead ohos.web.webview.webview.WebviewController#accessStep
   */
  accessStep(step: number): boolean;

  /**
   * Goes back in the history of the web page.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8 dynamiconly
   * @deprecated since 9
   * @useinstead ohos.web.webview.webview.WebviewController#backward
   */
  backward();

  /**
   * Goes forward in the history of the web page.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8 dynamiconly
   * @deprecated since 9
   * @useinstead ohos.web.webview.webview.WebviewController#forward
   */
  forward();

  /**
   * Gets network cookie manager
   *
   * @returns { WebCookie }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9 dynamiconly
   * @deprecated since 9
   * @useinstead ohos.web.webview.WebCookieManager
   */
  getCookieManager(): WebCookie;
}

/**
 * Defines the Web options.
 *
 * @interface WebOptions
 * @syscap SystemCapability.Web.Webview.Core
 * @since 8
 */
/**
 * Defines the Web options.
 *
 * @interface WebOptions
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @since 10
 */
/**
 * Defines the Web options.
 *
 * @interface WebOptions
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 11
 */
/**
 * Defines the Web options.
 *
 * @typedef WebOptions
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface WebOptions {
  /**
   * Sets the address of the web page to be displayed.
   *
   * @type { string | Resource }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Sets the address of the web page to be displayed.
   *
   * @type { string | Resource }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @since 10
   */
  /**
   * Web resource address. If accessing local resource files, please use $rawfile or resource protocol.
   * If you load a local resource file that applies the sandbox path outside the package (files support html and txt types),
   * please use the file:// sandbox file path.
   * Src cannot dynamically change the address through state variables (for example: @State).
   * If you need to change it, please reload it through {@link loadUrl}.
   *
   * @type { string | Resource }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  src: string | Resource;

  /**
   * Sets the controller of the Web.
   *
   * @type { WebController | WebviewController }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Sets the controller of the Web.
   *
   * @type { WebController | WebviewController }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Sets the controller of the Web.
   *
   * @type { WebController | WebviewController }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @since 10
   */
  /**
   * Controller, through which you can control various behaviors of Web components
   * (including page navigation, declaring cycle state, JavaScript interaction and other behaviors).
   * Since API Version 9, WebController is no longer maintained, so it is recommended to use WebviewController instead.
   * @type { WebController | WebviewController }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  controller: WebController | WebviewController;

  /**
   * 	Rendering mode.
   * 	RenderMode.ASYNC_RENDER (default, cannot be dynamically adjusted): The Web component is rendered asynchronously.
   * 	RenderMode.SYNC_RENDER: The Web component is rendered synchronously within the current execution context.
   *
   * @type { ?RenderMode }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  renderMode? : RenderMode;

  /**
   * Sets the incognito mode of the Web, the parameter is optional and default value is false.
   * When the Web is in incognito mode, cookies, records of websites, geolocation permissions
   * will not save in persistent files.
   *
   * @type { ?boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Sets the incognito mode of the Web, the parameter is optional and default value is false.
   * When the Web is in incognito mode, cookies, records of websites, geolocation permissions
   * will not save in persistent files.
   *
   * @type { ?boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  incognitoMode? : boolean;

  /**
   * A token indicating that the current Web component specifies a shared rendering process.
   * In the multi-rendering process mode, Web components with the same token will preferentially try to reuse
   * the rendering process bound to the token.
   * The binding of token to the rendering process occurs in the initialization stage of the rendering process.
   * When the rendering process has no associated Web component, its binding relationship with token will be removed.
   *
   * @type { ?string }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 12 dynamic
   */
  sharedRenderProcessToken? : string;

  /**
   * Sets whether mouse event will be transferred to touch event.
   * @type { ?boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  emulateTouchFromMouseEvent? : boolean;
}

/**
 * Defines the regular expression rule.
 *
 * @typedef UrlRegexRule
 * @syscap SystemCapability.Web.Webview.Core
 * @stagemodelonly
 * @since 23 dynamic
*/
declare interface UrlRegexRule {
  /**
   * Exact match of the second-level domain. For example, the second-level domain of https://www.example.com
   * is example.com, and the second-level domain of https://www.example.com.cn is example.com.cn. If the URL
   * is an IP address, the full IP is matched against the secondLevelDomain.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @stagemodelonly
   * @since 23 dynamic
   */
  secondLevelDomain: string;
  /**
   * Full URL regular expression.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @stagemodelonly
   * @since 23 dynamic
   */
  rule: string;
}

/**
 * Defines the contents of the JavaScript to be injected.
 *
 * @interface ScriptItem
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11
 */
/**
 * Defines the contents of the JavaScript to be injected.
 *
 * @typedef ScriptItem
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
declare interface ScriptItem {
  /**
   * Sets the JavaScript to be injected.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  script: string;

  /**
   * Sets the rules of the JavaScript.
   *
   * @type { Array<string> }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  scriptRules: Array<string>;

  /**
   * Set the regular expression rule that allows execution of this JavaScript.
   *
   * @type { ?Array<UrlRegexRule> }
   * @syscap SystemCapability.Web.Webview.Core
   * @stagemodelonly
   * @since 23 dynamic
   */
  urlRegexRules?: Array<UrlRegexRule>;
}

/**
 * Defines the load committed details.
 *
 * @interface LoadCommittedDetails
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11
 */
/**
 * Defines the load committed details.
 *
 * @typedef LoadCommittedDetails
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
declare interface LoadCommittedDetails {
  /**
   * Check whether the request is for getting the main frame.
   *
   * @type { boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  isMainFrame: boolean;

  /**
   * Whether the navigation happened without changing document. Examples of
   * same document navigations are:
   *   1. reference fragment navigations.
   *   2. pushState/replaceState.
   *   3. same page history navigation
   *
   * @type { boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  isSameDocument: boolean;

  /**
   * True if the committed entry has replaced the existing one. Note that in
   * case of subframes, the NavigationEntry and FrameNavigationEntry objects
   * don't actually get replaced - they're reused, but with updated attributes.
   *
   * @type { boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  didReplaceEntry: boolean;

  /**
   * The type of the navigation.
   *
   * @type { WebNavigationType }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  navigationType: WebNavigationType;

  /**
   * The url to navigate.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  url: string;
}

/**
 * Defines the Intelligent Tracking Prevention details.
 *
 * @typedef IntelligentTrackingPreventionDetails
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
declare interface IntelligentTrackingPreventionDetails {
  /**
   * The host of website url.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  host: string;

  /**
   * The host of tracker url.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  trackerHost: string;
}

/**
 * Defines the Web interface.
 *
 * @interface WebInterface
 * @syscap SystemCapability.Web.Webview.Core
 * @since 8
 */
/**
 * Defines the Web interface.
 *
 * @interface WebInterface
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @since 10
 */
/**
 * Defines the Web interface.
 *
 * @interface WebInterface
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 11
 */
/**
 * Defines the Web interface.
 *
 * @typedef WebInterface
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
interface WebInterface {
  /**
   * Sets Value.
   *
   * @param { WebOptions } value
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Sets Value.
   *
   * @param { WebOptions } value
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @since 10
   */
  /**
   * Sets Value.
   *
   * @param { WebOptions } value
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  (value: WebOptions): WebAttribute;
}

/**
 * Defines the embed info.
 *
 * @interface NativeEmbedInfo
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11
 */
/**
 * Defines the embed info.
 *
 * @typedef NativeEmbedInfo
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
declare interface NativeEmbedInfo {
  /**
   * The embed id.
   *
   * @type { ?string }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  id?: string;

  /**
   * Type of the same-layer tag. The value is in lowercase.
   *
   * @type { ?string }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  type?: string;

  /**
   * The embed tag src.
   *
   * @type { ?string }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  src?: string;

  /**
   * Position of the same-layer tag relative to the Web component in the screen coordinate system,
   * which is different from the standard Position. The unit is px.
   *
   * @type { ?Position }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  position?: Position;

  /**
   * The embed tag width, in px.
   *
   * @type { ?number }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  width?: number;

  /**
   * The embed tag height, in px.
   *
   * @type { ?number }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  height?: number;

  /**
   * The embed tag url.
   *
   * @type { ?string }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  url?: string;

  /**
   * The embed tag name, which is in uppercase.
   *
   * @type { ?string }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  tag?: string;

  /**
   * List of key-value pairs contained in the object tag that form a map of the Object type.
   * Use the methods provided by the Object type, such as embed.info?.param?.["name"] to operate the map object.
   *
   * @type { ?Map<string, string> }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  params?: Map<string, string>;
}

/**
 * Defines the Embed Data info.
 *
 * @interface NativeEmbedDataInfo
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11
 */
/**
 * Provides detailed information about the changes of the same-layer tag lifecycle.
 *
 * @typedef NativeEmbedDataInfo
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
declare interface NativeEmbedDataInfo {
  /**
   * Lifecycle status of the same-layer tag.
   *
   * @type { ?NativeEmbedStatus }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  status?: NativeEmbedStatus;

  /**
   * Psurfaceid of the NativeImage.
   *
   * @type { ?string }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  surfaceId?: string;

  /**
   * Unique id of the same-layer tag.
   *
   * @type { ?string }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  embedId?: string;

  /**
   * Detailed information about the same-layer tag.
   *
   * @type { ?NativeEmbedInfo }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  info?: NativeEmbedInfo;
}

/**
 * Provides visibility information about the same-layer tag.
 *
 * @typedef NativeEmbedVisibilityInfo
 * @syscap SystemCapability.Web.Webview.Core
 * @since 12 dynamic
 */
declare interface NativeEmbedVisibilityInfo {
  /**
   * Whether the same-layer tag is visible.
   * The value true indicates that the same-layer tag is visible, and false indicates the opposite.
   *
   * @type { boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 12 dynamic
   */
  visibility: boolean;

  /**
   * ID of the same-layer rendered tag.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 12 dynamic
   */
  embedId: string;
}

/**
 * Defines the user touch info.
 *
 * @interface NativeEmbedTouchInfo
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11
 */
/**
 * Provides touch information of the same-layer tag.
 *
 * @typedef NativeEmbedTouchInfo
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
declare interface NativeEmbedTouchInfo {
  /**
   * The native embed id.
   *
   * @type { ?string }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  embedId?: string;

  /**
   * Touch action information.
   *
   * @type { ?TouchEvent }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  touchEvent?: TouchEvent;

  /**
   * Gesture event consumption result.
   *
   * @type { ?EventResult }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  result?: EventResult;
}

/**
 * Defines the user mouse info on embed layer.
 *
 * @typedef NativeEmbedMouseInfo
 * @syscap SystemCapability.Web.Webview.Core
 * @since 20 dynamic
 */
declare interface NativeEmbedMouseInfo {
  /**
   * The native embed id.
   *
   * @type { ?string }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  embedId?: string;

  /**
   * An event sent when the state of contacts with a mouse-sensitive surface changes.
   *
   * @type { ?MouseEvent }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  mouseEvent?: MouseEvent;

  /**
   * Handle the user's mouse result.
   *
   * @type { ?EventResult }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  result?: EventResult;
}

/**
 * Provides detailed information about the first meaningful paint.
 *
 * @typedef FirstMeaningfulPaint
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
declare interface FirstMeaningfulPaint {
  /**
   * Start time of navigation, in microseconds.
   *
   * @type { ?number }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  navigationStartTime?: number;

  /**
   * Paint time of first meaningful content, in milliseconds.
   *
   * @type { ?number }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  firstMeaningfulPaintTime?: number;
}

/**
 * Defines the largest content paint rendering of web page.
 *
 * @typedef LargestContentfulPaint
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
declare interface LargestContentfulPaint {
  /**
   * Start time of navigation, in microseconds.
   *
   * @type { ?number }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  navigationStartTime?: number;

  /**
   * Paint time of largest image, in milliseconds.
   *
   * @type { ?number }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  largestImagePaintTime?: number;

  /**
   * Paint time of largest text, in milliseconds.
   *
   * @type { ?number }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  largestTextPaintTime?: number;

  /**
   * Bits per pixel of maximum image.
   *
   * @type { ?number }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  imageBPP?: number;

  /**
   * Load start time of largest image, in milliseconds.
   *
   * @type { ?number }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  largestImageLoadStartTime?: number;

  /**
   * Load end time of largest image, in milliseconds.
   *
   * @type { ?number }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  largestImageLoadEndTime?: number;
}

/**
 * Defines the render process not responding info.
 *
 * @interface RenderProcessNotRespondingData
 * @syscap SystemCapability.Web.Webview.Core
 * @since 12 dynamic
 */
declare interface RenderProcessNotRespondingData {
  /**
   * JavaScript stack info of the webpage when render process not responding.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 12 dynamic
   */
  jsStack: string;

  /**
   * Process id of render process not responding.
   *
   * @type { number }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 12 dynamic
   */
  pid: number;

  /**
   * Reason for the render process not responding.
   *
   * @type { RenderProcessNotRespondingReason }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 12 dynamic
   */
  reason: RenderProcessNotRespondingReason;
}

/**
 * Defines the triggered function at the end of web page loading.
 *
 * @typedef OnPageEndEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface OnPageEndEvent {
  /**
   * The url of page.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  url: string;
}

/**
 * Defines the triggered function at the begin of web page loading.
 *
 * @typedef OnPageBeginEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface OnPageBeginEvent {
  /**
   * The url of page.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  url: string;
}

/**
 * Defines the triggered function at the begin of web page loading.
 *
 * @typedef OnLoadStartedEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @since 20 dynamic
 */
declare interface OnLoadStartedEvent {
  /**
   * The url to be loaded.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  url: string;
}

/**
 * Defines the triggered function at the end of web page loading.
 *
 * @typedef OnLoadFinishedEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @since 20 dynamic
 */
declare interface OnLoadFinishedEvent {
  /**
   * The url to be loaded.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  url: string;
}

/**
 * Defines the triggered function when the page loading progress changes.
 *
 * @typedef OnProgressChangeEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface OnProgressChangeEvent {
  /**
   * The new progress of the page.
   *
   * @type { number }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  newProgress: number;
}

/**
 * Defines the triggered function when the title of the main application document changes.
 *
 * @typedef OnTitleReceiveEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface OnTitleReceiveEvent {
  /**
   * The title of the page.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  title: string;

  /**
   * Mark the source of the title. If it is true, the title is derived from the H5 title element;
   * If it is false, it is calculated from the URL. By default, it is calculated from the URL.
   *
   * @type { ?boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  isRealTitle?: boolean;
}

/**
 * Defines the triggered function when requesting to show the geolocation permission.
 *
 * @typedef OnGeolocationShowEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface OnGeolocationShowEvent {
  /**
   * Origin of the page.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  origin: string;

  /**
   * Defines the js geolocation request.
   *
   * @type { JsGeolocation }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  geolocation: JsGeolocation;
}

/**
 * Defines the triggered function when the web page wants to display a JavaScript alert() dialog.
 *
 * @typedef OnAlertEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface OnAlertEvent {
  /**
   * The url of the page.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  url: string;

  /**
   * The message of alert dialog.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  message: string;

  /**
   *  Handle the user's JavaScript result.
   *
   * @type { JsResult }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  result: JsResult;
}

/**
 * Defines the triggered function when the web page wants to confirm navigation from JavaScript onbeforeunload.
 *
 * @typedef OnBeforeUnloadEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12
 */
/**
 * Defines the triggered function when the web page wants to confirm navigation from JavaScript onbeforeunload.
 *
 * @typedef OnBeforeUnloadEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
declare interface OnBeforeUnloadEvent {
  /**
   * The url of the page.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * The url of the page.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  url: string;

  /**
   * The message of confirm dialog.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * The message of confirm dialog.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  message: string;

  /**
   *  Handle the user's JavaScript result.
   *
   * @type { JsResult }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   *  Handle the user's JavaScript result.
   *
   * @type { JsResult }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  result: JsResult;

  /**
   * The isReload parameter is set to true when the page is refreshed;
   * otherwise, it remains false. Default is false.
   *
   * @type { ?boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  isReload?: boolean;
}

/**
 * Defines callback triggered when confirm() is invoked by the web page.
 *
 * @typedef OnConfirmEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface OnConfirmEvent {
  /**
   * The url of the page.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  url: string;

  /**
   * The message of confirm dialog.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  message: string;

  /**
   *  Handle the user's JavaScript result.
   *
   * @type { JsResult }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  result: JsResult;
}

/**
 * Defines the triggered function when the web page wants to display a JavaScript prompt() dialog.
 *
 * @typedef OnPromptEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface OnPromptEvent {
  /**
   * The url of the page.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  url: string;

  /**
   * The message of prompt dialog.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  message: string;

  /**
   * The value of prompt dialog.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  value: string;

  /**
   *  Handle the user's JavaScript result.
   *
   * @type { JsResult }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  result: JsResult;
}

/**
 * Defines the triggered function when the web page receives a JavaScript console message.
 *
 * @typedef OnConsoleEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface OnConsoleEvent {
  /**
   * Console message information of the event.
   *
   * @type { ConsoleMessage }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  message: ConsoleMessage;
}

/**
 * Defines the triggered function when the web page receives a web resource loading error.
 *
 * @typedef OnErrorReceiveEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface OnErrorReceiveEvent {
  /**
   * The information of request.
   *
   * @type { WebResourceRequest }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  request: WebResourceRequest;

  /**
   * The information of error.
   *
   * @type { WebResourceError }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  error: WebResourceError;
}

/**
 * Defines the triggered function when the web page receives a web resource loading HTTP error.
 *
 * @typedef OnHttpErrorReceiveEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface OnHttpErrorReceiveEvent {
  /**
   * The information of request.
   *
   * @type { WebResourceRequest }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  request: WebResourceRequest;

  /**
   *  Web resource response of event.
   *
   * @type { WebResourceResponse }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  response: WebResourceResponse;
}

/**
 * Defines the triggered function when starting to download.
 *
 * @typedef OnDownloadStartEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface OnDownloadStartEvent {
  /**
   * The URL of page.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  url: string;

  /**
   * The userAgent of page.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  userAgent: string;

  /**
   * The contentDisposition of page.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * The contentDisposition of page.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  contentDisposition: string;

  /**
   * The mimetype of page.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  mimetype: string;

  /**
   * The contentLength of page.
   *
   * @type { number }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  contentLength: number;
}

/**
 * Defines the triggered callback when the Web page refreshes accessed history.
 *
 * @typedef OnRefreshAccessedHistoryEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12
 */
/**
 * Defines the triggered callback when the Web page refreshes accessed history.
 *
 * @typedef OnRefreshAccessedHistoryEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
declare interface OnRefreshAccessedHistoryEvent {
  /**
   * URL of the visit.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * URL of the visit.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  url: string;

  /**
   * If true, the page is being reloaded, otherwise,  means that the page is newly loaded.
   *
   * @type { boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * If true, the page is being reloaded, otherwise,  means that the page is newly loaded.
   *
   * @type { boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  isRefreshed: boolean;

  /**
   * Whether is triggered by main frame.
   *
   * @type { ?boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  isMainFrame?: boolean;
}

/**
 * Defines the triggered when the render process exits.
 *
 * @typedef OnRenderExitedEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
declare interface OnRenderExitedEvent {
  /**
   * The specific reason why the rendering process exits abnormally.
   *
   * @type { RenderExitReason }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  renderExitReason: RenderExitReason;
}

/**
 * Defines the triggered when the file selector shows.
 *
 * @typedef OnShowFileSelectorEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface OnShowFileSelectorEvent {
  /**
   * Defines the file selector result.
   *
   * @type { FileSelectorResult }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  result: FileSelectorResult;

  /**
   * Encompassed message information as parameters to fileSelector.
   *
   * @type { FileSelectorParam }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  fileSelector: FileSelectorParam;
}

/**
 * Defines the triggered when the url loading.
 *
 * @typedef OnResourceLoadEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
declare interface OnResourceLoadEvent {
  /**
   * The URL of the loaded resource file.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  url: string;
}

/**
 * Defines the triggered when the scale of WebView changed.
 *
 * @typedef OnScaleChangeEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface OnScaleChangeEvent {
  /**
   * Old scale of the page.
   *
   * @type { number }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  oldScale: number;

  /**
   * New scale of the page.
   *
   * @type { number }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  newScale: number;
}

/**
 * Defines the triggered when the browser needs credentials from the user.
 *
 * @typedef OnHttpAuthRequestEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface OnHttpAuthRequestEvent {
  /**
   * Defines the http auth request result.
   *
   * @type { HttpAuthHandler }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  handler: HttpAuthHandler;

  /**
   * Host of the page.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  host: string;

  /**
   * realm of the page.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  realm: string;
}

/**
 * Defines the triggered callback when the resources loading is intercepted.
 *
 * @typedef OnInterceptRequestEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12
 */
/**
 * Defines the triggered callback when the resources loading is intercepted.
 *
 * @typedef OnInterceptRequestEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 23 dynamic
 */
declare interface OnInterceptRequestEvent {
  /**
   * The information of request.
   *
   * @type { WebResourceRequest }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * The information of request.
   *
   * @type { WebResourceRequest }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  request: WebResourceRequest;
}

/**
 * Defines the triggered callback when the host application that web content from the specified origin is
 *     attempting to access the resources.
 *
 * @typedef OnPermissionRequestEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface OnPermissionRequestEvent {
  /**
   * Defines the onPermissionRequest callback.
   *
   * @type { PermissionRequest }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  request: PermissionRequest;
}

/**
 * Defines the triggered callback when the host application that web content from the specified origin is
 *     requesting to capture screen.
 *
 * @typedef OnScreenCaptureRequestEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
declare interface OnScreenCaptureRequestEvent {
  /**
   * Notifies the user of the operation behavior of the web component.
   *
   * @type { ScreenCaptureHandler }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  handler: ScreenCaptureHandler;
}

/**
 * Defines the triggered callback when called to allow custom display of the context menu.
 *
 * @typedef OnContextMenuShowEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
declare interface OnContextMenuShowEvent {
  /**
   * The menu-related parameters.
   *
   * @type { WebContextMenuParam }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  param: WebContextMenuParam;

  /**
   * The menu corresponding event is passed to the kernel.
   *
   * @type { WebContextMenuResult }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  result: WebContextMenuResult;
}

/**
 * Defines function Triggered when the host application call searchAllAsync.
 *
 * @typedef OnSearchResultReceiveEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
declare interface OnSearchResultReceiveEvent {
  /**
   * The ordinal number of the currently matched lookup item (starting from 0).
   *
   * @type { number }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  activeMatchOrdinal: number;

  /**
   * The number of all matched keywords.
   *
   * @type { number }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  numberOfMatches: number;

  /**
   * Indicates whether the current in-page search operation is complete. The method may be called back multiple times until isDoneCounting is true.
   *
   * @type { boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  isDoneCounting: boolean;
}

/**
 * Defines function Triggered when the scroll bar slides to the specified position.
 *
 * @typedef OnScrollEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface OnScrollEvent {
  /**
   * The X offset of the scroll. Unit: vp.
   *
   * @type { number }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  xOffset: number;

  /**
   * The Y offset of the scroll. Unit: vp.
   *
   * @type { number }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  yOffset: number;
}

/**
 * Defines the triggered callback when the Web page receives an ssl Error.
 *
 * @typedef OnSslErrorEventReceiveEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12
 */
/**
 * Defines the triggered callback when the Web page receives an ssl Error.
 *
 * @typedef OnSslErrorEventReceiveEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 23 dynamic
 */
declare interface OnSslErrorEventReceiveEvent {
  /**
   * Notifies the user of the operation behavior of the web component.
   *
   * @type { SslErrorHandler }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * Notifies the user of the operation behavior of the web component.
   *
   * @type { SslErrorHandler }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  handler: SslErrorHandler;

  /**
   * Error codes.
   *
   * @type { SslError }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * Error codes.
   *
   * @type { SslError }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  error: SslError;

  /**
   * Certificate chain data in DER format.
   *
   * @type { ?Array<Uint8Array> }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 15
   */
  /**
   * Certificate chain data in DER format.
   *
   * @type { ?Array<Uint8Array> }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @since 23 dynamic
   */
  certChainData?: Array<Uint8Array>;
}

/**
 * Defines the triggered callback when needs ssl client certificate from the user.
 *
 * @typedef OnClientAuthenticationEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
declare interface OnClientAuthenticationEvent {
  /**
   * Notifies the user of the operation behavior of the web component.
   *
   * @type { ClientAuthenticationHandler }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  handler : ClientAuthenticationHandler;

  /**
   * The hostname of the requesting certificate server.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  host : string;

  /**
   * The port number of the request certificate server.
   *
   * @type { number }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  port : number;

  /**
   * Acceptable asymmetric key types.
   *
   * @type { Array<string> }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  keyTypes : Array<string>;

  /**
   * Certificates that match the private key are acceptable to the issuer.
   *
   * @type { Array<string> }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  issuers : Array<string>;
}

/**
 * Defines the triggered callback when web page requires the user to create a window.
 *
 * @typedef OnWindowNewEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
declare interface OnWindowNewEvent {
  /**
   * true indicates the request to create a dialog and false indicates a new tab.
   *
   * @type { boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  isAlert: boolean;

  /**
   * true indicates that it is triggered by the user, and false indicates that it is triggered by a non-user.
   *
   * @type { boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  isUserTrigger: boolean;

  /**
   * Destination URL.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  targetUrl: string;

  /**
   * Lets you set the WebviewController instance for creating a new window.
   *
   * @type { ControllerHandler }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  handler: ControllerHandler;
}

/**
 * Enum type for navigationPolicy in OnWindowNewExtEvent.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @since 23 dynamic
 */
declare enum NavigationPolicy {
  /**
   * NEW POPUP window.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  NEW_POPUP = 0,

  /**
   * Shift key when clicking.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  NEW_WINDOW = 1,

  /**
   * Middle mouse button or meta/ctrl key when clicking.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  NEW_BACKGROUND_TAB = 2,

  /**
   * Shift key + Middle mouse button or meta/ctrl key when clicking.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  NEW_FOREGROUND_TAB = 3,
}

/**
 * Defines the window features info for window.open.
 *
 * @interface WindowFeatures
 * @syscap SystemCapability.Web.Webview.Core
 * @since 23 dynamic
 */
declare interface WindowFeatures {
  /**
   * The requested height of the containing window.
   *
   * @type { number }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  height: number;

  /**
   * The requested width of the containing window.
   *
   * @type { number }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  width: number;

  /**
   * The requested x-coordinate of the containing window.
   *
   * @type { number }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  x: number;

  /**
   * The requested y-coordinate of the containing window.
   *
   * @type { number }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  y: number;
}

/**
 * Defines the triggered callback when web page requires the user to create a window.
 *
 * @typedef OnWindowNewExtEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 23 dynamic
 */
declare interface OnWindowNewExtEvent {
  /**
   * true indicates the request to create a dialog and false indicates a new tab.
   *
   * @type { boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 23 dynamic
   */
  isAlert: boolean;

  /**
   * true indicates that it is triggered by the user, and false indicates that it is triggered by a non-user.
   *
   * @type { boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 23 dynamic
   */
  isUserTrigger: boolean;

  /**
   * Destination URL.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 23 dynamic
   */
  targetUrl: string;

  /**
   * Lets you set the WebviewController instance for creating a new window.
   *
   * @type { ControllerHandler }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 23 dynamic
   */
  handler: ControllerHandler;

  /**
   * Contains the attributes that a webpage requests from its containing web view, the parameters
   * of window.open.
   *
   * @type { WindowFeatures }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 23 dynamic
   */
  windowFeatures: WindowFeatures;

  /**
   * The navigation policy causing the new web view to be created.
   *
   * @type { NavigationPolicy }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 23 dynamic
   */
  navigationPolicy: NavigationPolicy;
}

/**
 * Defines the triggered callback when the application receive an new url of an apple-touch-icon.
 *
 * @typedef OnTouchIconUrlReceivedEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
declare interface OnTouchIconUrlReceivedEvent {
  /**
   * The apple-touch-icon URL address received.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  url: string;

  /**
   * Corresponding to whether apple-touch-icon is precomposited.
   *
   * @type { boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  precomposed: boolean;
}

/**
 * Defines the triggered callback when the application receive a new favicon for the current web page.
 *
 * @typedef OnFaviconReceivedEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
declare interface OnFaviconReceivedEvent {
  /**
   * Received the Favicon icon for the PixelMap object.
   *
   * @type { PixelMap }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  favicon: PixelMap;
}

/**
 * Defines the triggered callback when previous page will no longer be drawn and next page begin to draw.
 *
 * @typedef OnPageVisibleEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface OnPageVisibleEvent {
  /**
   * The URL of page.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  url: string;
}

/**
 * Defines the triggered callback to decision whether resend form data or not.
 *
 * @typedef OnDataResubmittedEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
declare interface OnDataResubmittedEvent {
  /**
   * Form data resubmission handle.
   *
   * @type { DataResubmissionHandler }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  handler: DataResubmissionHandler;
}

/**
 * Defines the playing state of audio on web page.
 *
 * @typedef OnAudioStateChangedEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
declare interface OnAudioStateChangedEvent {
  /**
   * The audio playback status of the current page, true if playing true otherwise false.
   *
   * @type { boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  playing: boolean;
}

/**
 * Defines triggered when the first content rendering of web page.
 *
 * @typedef OnFirstContentfulPaintEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
declare interface OnFirstContentfulPaintEvent {
  /**
   * The time at which navigation begins, expressed in microseconds.
   *
   * @type { number }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  navigationStartTick: number;

  /**
   * The time it takes to draw content for the first time from navigation, expressed in milliseconds.
   *
   * @type { number }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  firstContentfulPaintMs: number;
}

/**
 * Defines the triggered callback when the resources loading is intercepted.
 *
 * @typedef OnLoadInterceptEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface OnLoadInterceptEvent {
  /**
   * The information of request.
   *
   * @type { WebResourceRequest }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  data: WebResourceRequest;
}

/**
 * Defines the function Triggered when the over scrolling.
 *
 * @typedef OnOverScrollEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
declare interface OnOverScrollEvent {
  /**
   * Based on the leftmost part of the page, the horizontal scroll offset is over.
   * Unit: vp.
   *
   * @type { number }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  xOffset: number;

  /**
   * Based on the top of the page, the vertical scroll offset is over.
   * Unit: vp.
   *
   * @type { number }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  yOffset: number;
}

/**
 * Defines the function Triggered when the PDF page scrolling.
 *
 * @typedef OnPdfScrollEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @since 20 dynamic
 */
declare interface OnPdfScrollEvent {

  /**
   * PDF page url.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  url:string;
}

/**
 * Defines the function Triggered when the PDF load.
 *
 * @typedef OnPdfLoadEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @since 20 dynamic
 */
declare interface OnPdfLoadEvent {
  /**
   * The PDF page load result.
   *
   * @type { PdfLoadResult }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  result: PdfLoadResult;

  /**
   * The PDF page url.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  url: string;
}

/**
 * Defines the JavaScript object to be injected.
 *
 * @typedef JavaScriptProxy
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12
 */
/**
 * Defines the JavaScript object to be injected.
 *
 * @typedef JavaScriptProxy
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 20 dynamic
 */
declare interface JavaScriptProxy {
  /**
   * Objects participating in registration.
   *
   * @type { object }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * Objects participating in registration.
   *
   * @type { object }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  object: object;

  /**
   * The name of the registered object, which is consistent with the
   *                          object name called in the window.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * The name of the registered object, which is consistent with the
   *                          object name called in the window.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  name: string;

  /**
   * The method of the application side JavaScript object participating
   *                                       in the registration.
   *
   * @type { Array<string> }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * The method of the application side JavaScript object participating
   *                                       in the registration.
   *
   * @type { Array<string> }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  methodList: Array<string>;

  /**
   * Controller.
   *
   * @type { WebController | WebviewController }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * Controller.
   *
   * @type { WebController | WebviewController }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  controller: WebController | WebviewController;

  /**
   * The async method of the application side JavaScript object participating in the registration.
   *
   * @type { ?Array<string> }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * The async method of the application side JavaScript object participating in the registration.
   *
   * @type { ?Array<string> }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  asyncMethodList?: Array<string>;

  /**
   * permission configuration defining web page URLs that can access JavaScriptProxy methods.
   * The configuration can be defined at two levels, object level and method level.
   *
   * @type { ?string }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  permission?: string;
}

/**
 * Enum type supplied to {@link keyboardAvoidMode} for setting the web keyboard avoid mode.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamic
 */
declare enum WebKeyboardAvoidMode {
  /**
   * When the soft keyboard avoids, only the size of the visual viewport is adjusted, not the size of the layout viewport.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  RESIZE_VISUAL = 0,

  /**
   * By default, when the soft keyboard avoids,
   * the sizes of the visual viewport and the layout viewport are adjusted at the same time.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  RESIZE_CONTENT = 1,

  /**
   * Without adjusting any viewport size, soft keyboard avoidance will not be triggered.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  OVERLAYS_CONTENT = 2,

  /**
   * When the soft keyboard avoid, follow the avoid result of UIContext.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  RETURN_TO_UICONTEXT = 3
}

/**
 * Defines Web Elements type.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @since 13 dynamic
 */
declare enum WebElementType {
  /**
   * Image,corresponding HTML image type.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 13 dynamic
   */
  IMAGE = 1,

  /**
   * Link,corresponding link type.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  LINK = 2,

  /**
   * Text,corresponding textSpan type.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 21 dynamic
   */
  TEXT = 3
}

/**
 * ResponseType for contextMenu
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @since 13 dynamic
 */
declare enum WebResponseType {
  /**
   * Long press.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 13 dynamic
   */
  LONG_PRESS = 1,

  /**
   * Right click.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 21 dynamic
   */
  RIGHT_CLICK = 2
}

/**
 * Arkweb audio session Type
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @since 20 dynamic
 */
declare enum AudioSessionType {
  /**
   * Ambient audio, which is mixable with other types of audio.
   * This is useful in some special cases such as when the user wants to mix audios from multiple pages.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  AMBIENT=3
}

/**
 * PDF page load result
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @since 20 dynamic
 */
declare enum PdfLoadResult {

  /**
   * The PDF page load success.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  LOAD_SUCCESS = 0,

  /**
   * The error code for web load PDF file failed.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  PARSE_ERROR_FILE = 1,

  /**
   * The error code for the PDF format is not support.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  PARSE_ERROR_FORMAT = 2,

  /**
   * The error code for the PDF password is wrong.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  PARSE_ERROR_PASSWORD = 3,

  /**
   * The error code for the  PDF handler process failed.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  PARSE_ERROR_HANDLER = 4
}

/**
 * Enum type supplied to {@link bypassVsyncCondition} for setting the bypass vsync condition.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @since 20 dynamic
 */
declare enum WebBypassVsyncCondition {
  /**
   * Not bypass vsync.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  NONE = 0,

  /**
   * bypass vsync.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  SCROLLBY_FROM_ZERO_OFFSET = 1
}

/**
 * Defines the options of preview menu
 *
 * @interface PreviewMenuOptions
 * @syscap SystemCapability.Web.Webview.Core
 * @since 20 dynamiconly
 */
declare interface PreviewMenuOptions {
  /**
   * Defines the haptic feedback mode of preview menu.
   * To enable haptic feedback, you must declare the ohos.permission.VIBRATE permission.
   *
   * @type { ?HapticFeedbackMode }
   * @default HapticFeedbackMode.DISABLED
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamiconly
   */
  hapticFeedbackMode?: HapticFeedbackMode;
}

/**
 * Defines the selection menu options.
 *
 * @typedef SelectionMenuOptionsExt
 * @syscap SystemCapability.Web.Webview.Core
 * @since 13 dynamic
 */
declare interface SelectionMenuOptionsExt {
  /**
   * Callback function when the selection menu appears.
   *
   * @type { ?Callback<void> }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 13 dynamic
   */
  onAppear?: Callback<void>;

  /**
   * Callback function when the selection menu disappears.
   *
   * @type { ?Callback<void> }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 13 dynamic
   */
  onDisappear?: Callback<void>;

  /**
   * The preview content of selection menu.
   *
   * @type { ?CustomBuilder }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 13 dynamic
   */
  preview?: CustomBuilder;

  /**
   * Menu type, default value is MenuType.SELECTION_MENU.
   *
   * @type { ?MenuType }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 13 dynamic
   */
  menuType?: MenuType;

  /**
   * Defines the options of preview menu.
   *
   * @type { ?PreviewMenuOptions }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  previewMenuOptions?: PreviewMenuOptions;

  /**
   * Callback function when the selection is displayed.
   *
   * @type { ?Callback<void> }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 21 dynamic
   */
  onMenuShow?: Callback<void>;

  /**
   * Callback function when the selection menu is hidden.
   *
   * @type { ?Callback<void> }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 21 dynamic
   */
  onMenuHide?: Callback<void>;
}

/**
 * The details of this blank screen detection result.
 *
 * @typedef BlankScreenDetails
 * @syscap SystemCapability.Web.Webview.Core
 * @since 22 dynamic
 */
declare interface BlankScreenDetails {
  /**
   * The count of detected contentful nodes. This value only exists when developers configure a threshold.
   *
   * @type { ?number }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  detectedContentfulNodesCount?: number;
}

/**
 * Enum type supplied to {@link BlankScreenDetectionEventInfo} when onDetectedBlankScreen being called.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @since 22 dynamic
 */
declare enum DetectedBlankScreenReason {
  /**
   * None of any contentful nodes have been detected.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  NO_CONTENTFUL_NODES = 0,
  /**
   * Web has detected a few of contentful nodes but below the threshold.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  SUB_THRESHOLD_CONTENTFUL_NODES = 1
}

/**
 * Defines the blank screen detection event info.
 *
 * @typedef BlankScreenDetectionEventInfo
 * @syscap SystemCapability.Web.Webview.Core
 * @since 22 dynamic
 */
declare interface BlankScreenDetectionEventInfo {
  /**
   * The url of detected blank screen page.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  url: string;

  /**
   * The reason why we consider this page is blank.
   *
   * @type { DetectedBlankScreenReason }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  blankScreenReason: DetectedBlankScreenReason;

  /**
   * The details of this detection result.
   *
   * @type { ?BlankScreenDetails }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  blankScreenDetails?: BlankScreenDetails;
}

/**
 * The callback when web engine detects current page is blank or nearly blank.
 *
 * @typedef { function } DetectBlankScreenCallback
 * @param { BlankScreenDetectionEventInfo } event - the detection event info.
 * @syscap SystemCapability.Web.Webview.Core
 * @since 22 dynamic
 */
type OnDetectBlankScreenCallback = (event: BlankScreenDetectionEventInfo) => void;

/**
 * Callback with the selected text after the text selection content changes.
 *
 * @typedef { function } TextSelectionChangeCallback
 * @param { string } selectionText - the selected text after the text selection content changes.
 * @syscap SystemCapability.Web.Webview.Core
 * @since 23 dynamic
 */
type TextSelectionChangeCallback = (selectionText: string) => void;

/**
 * The methods can be chosen to detect if current page is blank or nearly blank.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @since 22 dynamic
 */
declare enum BlankScreenDetectionMethod {
  /**
   * This detection method is used to probe whether there are rendered contentful nodes
   * at 17 coordinates distributed around the center of the page.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  DETECTION_CONTENTFUL_NODES_SEVENTEEN = 0
}

/**
 * The strategy of blank screen detection.
 *
 * @typedef BlankScreenDetectionConfig
 * @syscap SystemCapability.Web.Webview.Core
 * @since 22 dynamic
 */
declare interface BlankScreenDetectionConfig {
  /**
   * Enable blank screen detection or not.
   *
   * @type { boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  enable: boolean;

  /**
   * The settings of the timing when web try to detect current page is blank or not.
   * The timing is the duration after web navigation.
   *
   * @type { ?number[] }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  detectionTiming?: number[];
  /**
   * The combination of blank screen detection methods.
   *
   * @type { ?BlankScreenDetectionMethod[] }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  detectionMethods?: BlankScreenDetectionMethod[];
  /**
   * When using the specific detection method of detecting contentful nodes, the threshold is used
   * to determine how close the detection is to being blank screen page.
   *
   * @type { ?number }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  contentfulNodesCountThreshold?: number;
}

/**
 * Defines the first screen paint info.
 *
 * @typedef FirstScreenPaint
 * @syscap SystemCapability.Web.Webview.Core
 * @since 23 dynamic
 */
declare interface FirstScreenPaint {
  /**
   * The url of first screen paint info.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  url: string;

  /**
   * The navigation start time of the url.
   *
   * @type { number }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  navigationStartTime: number;

  /**
   * The first screen paint time of the url.
   *
   * @type { number }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  firstScreenPaintTime: number;
}

/**
 * The callback reports the time required for the first screen painting of the current web page.
 *
 * @typedef { function } OnFirstScreenPaintCallback
 * @param { FirstScreenPaint } firstScreenPaint - the first screen paint info.
 * @syscap SystemCapability.Web.Webview.Core
 * @since 23 dynamic
 */
type OnFirstScreenPaintCallback = (firstScreenPaint: FirstScreenPaint) => void;

/**
 * Defines the Web attribute functions.
 *
 * @extends CommonMethod<WebAttribute>
 * @syscap SystemCapability.Web.Webview.Core
 * @since 8
 */
/**
 * Defines the Web attribute functions.
 *
 * @extends CommonMethod<WebAttribute>
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @since 10
 */
/**
 * Defines the Web attribute functions.
 *
 * @extends CommonMethod<WebAttribute>
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare class WebAttribute extends CommonMethod<WebAttribute> {
  /**
   * Sets whether the Web allows JavaScript scripts to execute.
   *
   * @param { boolean } javaScriptAccess - {@code true} means the Web can allows JavaScript scripts to execute; {@code false} otherwise.
   *    The default value is true.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Sets whether the Web allows JavaScript scripts to execute.
   *
   * @param { boolean } javaScriptAccess - {@code true} means the Web can allows JavaScript scripts to execute; {@code false} otherwise.
   *    The default value is true.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @since 10
   */
  /**
   * Sets whether the Web allows JavaScript scripts to execute.
   *
   * @param { boolean } javaScriptAccess - {@code true} means the Web can allows JavaScript scripts to execute; {@code false} otherwise.
   *    The default value is true.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  javaScriptAccess(javaScriptAccess: boolean): WebAttribute;

  /**
   * Sets whether enable local file system access in web.
   *
   * @param { boolean } fileAccess - {@code true} means enable local file system access in Web; {@code false} otherwise.
   *     The default value is true.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Sets whether enable local file system access in web.
   *
   * @param { boolean } fileAccess - {@code true} means enable local file system access in Web; {@code false} otherwise.
   *     The default value is true.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Sets whether to enable Access to the file system in the application.
   * This setting dose not affect the access to the files specified though $rawfile(filepath/filename).
   * <p><strong>API Note</strong>:<br>
   * fileAccess is disabled by default since API version 12.
   * When fileAccess is set to false, files in the read-only /data/storage/el1/bundle/entry/resources/resfile<br>
   * directory can still be accessed through the file protocol.
   * </p>
   *
   * @param { boolean } fileAccess - {@code true} means enable local file system access in Web; {@code false} otherwise.
   *     The default value is false.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * Sets whether to enable access to the file system in the application.
   * This setting dose not affect the access to the files specified though $rawfile(filepath/filename).
   * <p><strong>API Note</strong>:<br>
   * fileAccess is disabled by default since API version 12.
   * When fileAccess is set to false, files in the read-only /data/storage/el1/bundle/entry/resources/resfile<br>
   * directory can still be accessed through the file protocol.
   * </p>
   *
   * @param { boolean } fileAccess - {@code true} means enable local file system access in Web; {@code false} otherwise.
   *     The default value is false.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  fileAccess(fileAccess: boolean): WebAttribute;

  /**
   * Sets whether to allow image resources to be loaded from the network.
   *
   * @param { boolean } onlineImageAccess - {@code true} means the Web can allow image resources to be loaded from the network;
   *    The default value is true.
   * {@code false} otherwise.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Sets whether to enable access to online images through HTTP and HTTPS.
   *
   * @param { boolean } onlineImageAccess - Sets whether to enable access to online images.
   *    {@code true} means means setting to allow loading image resources from the network, {@code false} otherwise.
   *    Default value: true.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Sets whether to enable access to online images through HTTP and HTTPS.
   *
   * @param { boolean } onlineImageAccess - Sets whether to enable access to online images.
   *    {@code true} means means setting to allow loading image resources from the network, {@code false} otherwise.
   *    Default value: true.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onlineImageAccess(onlineImageAccess: boolean): WebAttribute;

  /**
   * Sets whether to enable the DOM Storage API permission.
   *
   * @param { boolean } domStorageAccess - {@code true} means enable the DOM Storage API permission in Web; {@code false} otherwise.
   *    The default value is false.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Sets whether to enable the DOM Storage API permission.
   *
   * @param { boolean } domStorageAccess - {@code true} means enable the DOM Storage API permission in Web; {@code false} otherwise.
   *    The default value is false.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Sets whether to enable the DOM Storage API. By default, this feature is disabled.
   * @param { boolean } domStorageAccess - Whether to enable the DOM Storage API. {@code true} means to enable
   *                                       the DOM Storage API; {@code false} means to disable the DOM Storage API.
   *                                       The default value is false.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  domStorageAccess(domStorageAccess: boolean): WebAttribute;

  /**
   * Sets whether the Web can automatically load image resources.
   *
   * @param { boolean } imageAccess - {@code true} means the Web can automatically load image resources; {@code false} otherwise.
   *    The default value is true.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Sets whether the Web can automatically load image resources.
   *
   * @param { boolean } imageAccess - {@code true} means the Web can automatically load image resources; {@code false} otherwise.
   *    The default value is true.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Sets whether to enable automatic image loading.
   *
   * @param { boolean } imageAccess - Sets whether to enable automatic image loading.
   *    {@code true} means the Web can automatically load image resources, {@code false} otherwise.
   *    Default value: true.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  imageAccess(imageAccess: boolean): WebAttribute;

  /**
   * Sets how to load HTTP and HTTPS content.
   *
   * @param { MixedMode } mixedMode - The mixed mode, which can be {@link MixedMode}.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Sets how to load HTTP and HTTPS content.
   *
   * @param { MixedMode } mixedMode - The mixed mode, which can be {@link MixedMode}.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
  * Sets the behavior when a secure origin attempts to load a resource from an insecure origin.
  * The default is MixedMode.None, meaning not allow a secure origin to load content from an insecure origin.
  *
  * @param { MixedMode } mixedMode - The mixed mode, which can be {@link MixedMode}.
  *    Default value: MixedMode.None, which means that secure origin is not allowed to load content from insecure origin.
  * @returns { WebAttribute }
  * @syscap SystemCapability.Web.Webview.Core
  * @crossplatform
  * @atomicservice
  * @since 18 dynamic
  */
  mixedMode(mixedMode: MixedMode): WebAttribute;

  /**
   * Sets whether the Web supports zooming using gestures.
   *
   * @param { boolean } zoomAccess {@code true} means the Web supports zooming using gestures; {@code false} otherwise.
   *    The default value is true.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Sets whether the Web supports zooming using gestures.
   *
   * @param { boolean } zoomAccess {@code true} means the Web supports zooming using gestures; {@code false} otherwise.
   *    The default value is true.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @since 10
   */
  /**
   * Sets whether the Web supports zooming using gestures.
   *
   * @param { boolean } zoomAccess {@code true} means the Web supports zooming using gestures; {@code false} otherwise.
   *    The default value is true.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  zoomAccess(zoomAccess: boolean): WebAttribute;

  /**
   * Sets whether to allow access to geographical locations.
   *
   * @param { boolean } geolocationAccess - {@code true} means the Web allows access to geographical locations; {@code false} otherwise.
   *    The default value is true.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Set whether to enable geolocation access. By default, this feature is enabled.
   * For details, see Managing Location Permissions.
   *
   * @param { boolean } geolocationAccess - Whether to enable geolocation access. {@code true} means the Web
   *                                        allows access to geographical locations; {@code false} means the
   *                                        Web disallows access to geographical locations. The default value is true.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  geolocationAccess(geolocationAccess: boolean): WebAttribute;

  /**
   * Injects the JavaScript object into window and invoke the function in window.
   *
   * @param { object } javaScriptProxy - The JavaScript object to be injected.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Injects the JavaScript object into window and invoke the function in window.
   *
   * @param { object } javaScriptProxy - The JavaScript object to be injected.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Injects the JavaScript object into window and invoke the function in window.
   *
   * @param { object } javaScriptProxy - The JavaScript object to be injected.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Registers the supplied ArkTS object in javaScriptProxy into this Web component.
   * The object is registered into all frames of the web page, including all frames, using the specified name in javaScriptProxy.
   * This allows the methods of the ArkTS object in javaScriptProxy to be accessed from JavaScript.
   *
   * <p><strong>API Note</strong>:
   * <strong>Performance Note</strong>:
   * <p>For details about the arkweb rendering framework adaptation solution,
   * see [ArkWeb Rendering Framework Adaptation]{@link https://developer.huawei.com/consumer/en/doc/best-practices/bpta-arkweb_rendering_framework}
   * </p>
   *
   * @param { JavaScriptProxy } javaScriptProxy - The ArkTS object in javaScriptProxy will be registered into this Web component,
   * and the methods within the methodList of the injected ArkTS object declared in javaScriptProxy can be accessed by JavaScript.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * Registers the supplied ArkTS object in javaScriptProxy into this Web component.
   * The object is registered into all frames of the web page, including all frames, using the specified name in javaScriptProxy.
   * This allows the methods of the ArkTS object in javaScriptProxy to be accessed from JavaScript.
   *
   * <p><strong>API Note</strong>:
   * <strong>Performance Note</strong>:
   * <p>For details about how to arkWeb rendering framework adaptation solution,
   * see [ArkWeb Rendering Framework Adaptation]
   * {@link https://developer.huawei.com/consumer/en/doc/best-practices/bpta-arkweb_rendering_framework}
   * </p>
   *
   * @param { JavaScriptProxy } javaScriptProxy - The ArkTS object in javaScriptProxy will be registered into this Web component,
   * and the methods within the methodList of the injected ArkTS object declared in javaScriptProxy can be accessed by JavaScript.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  javaScriptProxy(javaScriptProxy: JavaScriptProxy): WebAttribute;

  /**
   * Sets whether the Web should save the password.
   *
   * @param { boolean } password - {@code true} means the Web can save the password; {@code false} otherwise.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8 dynamiconly
   * @deprecated since 10
   * @useinstead ohos.web.WebAttribute#enableAutofill
   */
  password(password: boolean): WebAttribute;

  /**
   * Sets the mode of cache in Web.
   *
   * @param { CacheMode } cacheMode - The cache mode, which can be {@link CacheMode}.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Sets the mode of cache in Web.
   *
   * @param { CacheMode } cacheMode - The cache mode, which can be {@link CacheMode}.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Sets the mode of cache in Web.
   *
   * @param { CacheMode } cacheMode - The cache mode, which can be {@link CacheMode}.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  cacheMode(cacheMode: CacheMode): WebAttribute;

  /**
   * Sets the dark mode of Web.
   *
   * @param { WebDarkMode } mode - The dark mode, which can be {@link WebDarkMode}.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Sets the web dark mode. By default, web dark mode is disabled. When it is enabled,
   * the Web component enables the dark theme defined for web pages
   * if the theme has been defined in prefers-color-scheme of a media query,
   * and remains unchanged otherwise. To enable the forcible dark mode, use this API with forceDarkAccess.
   *
   * @param { WebDarkMode } mode - Web dark mode to set.
   *     Default value: WebDarkMode.Off.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  darkMode(mode: WebDarkMode): WebAttribute;

  /**
   * Sets whether to enable forced dark algorithm when the web is in dark mode
   *
   * @param { boolean } access {@code true} means enable the force dark algorithm; {@code false} otherwise.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Sets whether to enable forcible dark mode for the web page.
   * This API is applicable only when dark mode is enabled in {@link darkMode}.
   *
   * @param { boolean } access Sets whether to enable forcible dark mode for the web page.
   *    {@code true} means enable forcible dark mode for the web page. ;
   *    {@code false} means not enable forcible dark mode for the web page.
   *    The default value is false.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  forceDarkAccess(access: boolean): WebAttribute;

  /**
   * Sets the media options.
   *
   * @param { WebMediaOptions } options The media options, which can be {@link WebMediaOptions}.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 10
   */
  /**
   * Sets the web-based media playback policy, including the validity period for automatically resuming a paused web audio,
   * and whether the audio of multiple Web instances in an application is exclusive.
   * <p><strong>API Note</strong>:<br>
   * Audios in the same Web instance are considered as the same audio.
   * The media playback policy controls videos with an audio track.
   * After the parameter settings are updated, the playback must be started again for the settings to take effect.
   * It is recommended that you set the same audioExclusive value for all Web components.
   * Audio and video interruption takes effect within an app and between apps, and playback resumption takes effect only between apps.
   * </p>
   *
   * @param { WebMediaOptions } options Set the media policy for the web.
   * After updating the attribute parameters, the audio needs to be replayed for it to take effect.
   *    Default value: {resumeInterval: 0, audioExclusive: true}
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  mediaOptions(options: WebMediaOptions): WebAttribute;

  /**
   * Sets whether the Web should save the table data.
   *
   * @param { boolean } tableData {@code true} means the Web can save the table data; {@code false} otherwise.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8 dynamiconly
   * @deprecated since 10
   * @useinstead ohos.web.WebAttribute#enableAutofill
   */
  tableData(tableData: boolean): WebAttribute;

  /**
   * Sets whether the Web access meta 'viewport' in HTML.
   *
   * @param { boolean } wideViewModeAccess {@code true} means the Web access meta 'viewport' in HTML; {@code false} otherwise.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8 dynamiconly
   * @deprecated since 10
   * @useinstead ohos.web.WebAttribute#metaViewport
   */
  wideViewModeAccess(wideViewModeAccess: boolean): WebAttribute;

  /**
   * Sets whether the Web access overview mode.
   *
   * @param { boolean } overviewModeAccess {@code true} means the Web access overview mode; {@code false} otherwise.
   *    The default value is true.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Sets whether to load web pages by using the overview mode, which means reducing the content to fit the screen width.
   * Currently, only mobile devices are supported.
   *
   * @param { boolean } overviewModeAccess Whether to load web pages by using the overview mode.
   *    {@code true} means the Web access overview mode;
   *    {@code false} means the Web not access overview mode.
   *    Default value: true.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  overviewModeAccess(overviewModeAccess: boolean): WebAttribute;

  /**
   * Sets the over-scroll mode for web
   * When the scrolling mode is enabled, when the user slides to the edge on the web root page, the web will bounce back
   * the interface through elastic animation, and the internal pages on the root page will not trigger the bounce back.
   *
   * @param { OverScrollMode } mode - The over-scroll mode, which can be {@link OverScrollMode}.
   *    The default value is OverScrollMode.NEVER.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  overScrollMode(mode: OverScrollMode): WebAttribute;

  /**
   * Sets the blur on for elements on webview when soft keyboard is hidden manually.
   *
   * @param { BlurOnKeyboardHideMode } mode - Default value is SILENT. Set BLUR to enable the blur on keyboard hide mode, which can be {@link BlurOnKeyboardHideMode}.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 14 dynamic
   */
  blurOnKeyboardHideMode(mode: BlurOnKeyboardHideMode): WebAttribute;

  /**
   * Sets the ratio of the text zoom.
   *
   * @param { number } textZoomAtio The ratio of the text zoom.  The default value is 100, ranging from 1 to +∞.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8 dynamiconly
   * @deprecated since 9
   * @useinstead ohos.web.WebAttribute#textZoomRatio
   */
  textZoomAtio(textZoomAtio: number): WebAttribute;

  /**
   * Sets the ratio of the text zoom.
   *
   * @param { number } textZoomRatio The ratio of the text zoom.  The default value is 100, ranging from 1 to +∞.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Sets the ratio of the text zoom.
   *
   * @param { number } textZoomRatio The ratio of the text zoom.  The default value is 100, ranging from 1 to +∞.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Sets the ratio of the text zoom.
   *
   * @param { number } textZoomRatio Text zoom ratio to set. The value is an integer. The value range is (0, 2147483647].
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  textZoomRatio(textZoomRatio: number): WebAttribute;

  /**
   * Sets whether the Web access the database.
   *
   * @param { boolean } databaseAccess {@code true} means the Web access the database; {@code false} otherwise.
   *    The default value is false.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Sets whether to enable database access. By default, this feature is disabled.
   *
   *
   * @param { boolean } databaseAccess - Whether to enable database access. {@code true} means to enable
   *                                     database access; {@code false} means to disable database access.
   *                                     The default value is false.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  databaseAccess(databaseAccess: boolean): WebAttribute;

  /**
   * Sets the initial scale for the Web.
   *
   * @param { number } percent the initial scale for the Web.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Sets the initial scale for the Web.
   *
   * @param { number } percent the initial scale for the Web.
   *                           Value range: (0, 1000].
   *                           Default value: 100.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  initialScale(percent: number): WebAttribute;

  /**
   * Sets the Web's user agent.
   *
   * @param { string } userAgent The Web's user agent.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8 dynamiconly
   * @deprecated since 10
   * @useinstead ohos.web.webview.webview.WebviewController#setCustomUserAgent
   */
  userAgent(userAgent: string): WebAttribute;

  /**
   * Sets whether the viewport property of the meta tag is enabled.
   *
   * <p><strong>API Note</strong>:<br>
   * If the device is 2-in-1, the viewport property is not supported. This means that,
   * regardless of whether this parameter is set to true or false,
   * the viewport property will not be parsed and a default layout will be used.<br>
   * If the device is a tablet, the viewport-fit property of the meta tag is parsed regardless of
   * whether this parameter is set to true or false. When viewport-fit is set to cover,
   * the size of the safe area can be obtained through the CSS attribute.<br>
   * The viewport parameter of the meta tag on the frontend HTML page is enabled or
   * disabled based on whether User-Agent contains the Mobile field.
   * If a User-Agent does not contain the Mobile field, the viewport property in the meta tag is disabled by default.
   * In this case, you can explicitly set the metaViewport property to true to overwrite the disabled state.
   * </p>
   *
   * @param { boolean } enabled Whether the viewport property of the meta tag is enabled.
   *    {@code true} means support the viewport attribute of the meta tag is enabled and parsed,
   *    and the layout is performed based on the viewport attribute.
   *    {@code false} means not support the viewport attribute of the meta tag is disabled and not parsed,
   *    and the default layout is used.
   *    Default value: true.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  metaViewport(enabled: boolean): WebAttribute;

  /**
   * Triggered at the end of web page loading.
   * This callback is only invoked for the main frame and not for subframes.
   *
   * @param { function } callback The triggered function at the end of web page loading.
   * @returns { WebAttribute } The WebAttribute object representing the attributes of the web page.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Triggered at the end of web page loading.
   * This callback is only invoked for the main frame and not for subframes.
   *
   * @param { function } callback The triggered function at the end of web page loading.
   * @returns { WebAttribute } The WebAttribute object representing the attributes of the web page.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @since 10
   */
  /**
   * Triggered at the end of web page loading.
   * This callback is only invoked for the main frame and not for subframes.
   *
   * @param { function } callback The triggered function at the end of web page loading.
   * @returns { WebAttribute } The WebAttribute object representing the attributes of the web page.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered at the end of web page loading.
   * This callback is only invoked for the main frame and not for subframes.
   *
   * @param { Callback<OnPageEndEvent> } callback The triggered function at the end of web page loading.
   * @returns { WebAttribute } The WebAttribute object representing the attributes of the web page.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onPageEnd(callback: Callback<OnPageEndEvent>): WebAttribute;

  /**
   * Triggered at the begin of web page loading.
   *
   * @param { function } callback The triggered function at the begin of web page loading.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Triggered at the begin of web page loading.
   *
   * @param { function } callback The triggered function at the begin of web page loading.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @since 10
   */
  /**
   * Triggered at the begin of web page loading.
   *
   * @param { function } callback The triggered function at the begin of web page loading.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Called when the web page starts to be loaded.
   * This API is called only for the main frame, and not for the iframe or frameset content.
   *
   * @param { Callback<OnPageBeginEvent> } callback The triggered function at the begin of web page loading.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onPageBegin(callback: Callback<OnPageBeginEvent>): WebAttribute;

  /**
   * Triggered at the begin of web page loading. This method is called once for each main frame load.  Embedded frame
   * changes, i.e. clicking a link whose target is an iframe and fragment navigations (navigations to #fragment_id)
   * will not trigger this callback.
   *
   * <p><strong>API Note</strong>:<br>
   * When the document of a pop-up window has been modified by JavaScript before it is loaded, it will simulate the
   * triggering of onLoadStarted with the URL set to empty because displaying the URL that is currently loading maybe
   * unsafe. onPageBegin will not be simulated.
   * </p>
   *
   * @param { Callback<OnLoadStartedEvent> } callback The triggered function at the begin of web page loading.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  onLoadStarted(callback: Callback<OnLoadStartedEvent>): WebAttribute;

  /**
   * Notify the host application that a page has finished loading. This method is called only for main frame.
   *
   * <p><strong>API Note</strong>:<br>
   * 1. Fragment navigation also triggers onLoadFinished, but onPageEnd will not be triggered.
   * 2. onLoadFinished is triggered only once if the mainframe is automatically redirected before the page is
   *    completely loaded. onPageEnd is triggered every navigation on mainframe.
   * 3. When the document of a pop-up window has been modified by JavaScript before it is loaded , it will simulate the
   *    triggering of onLoadStarted with the URL set to empty because displaying the URL that is currently
   *    loading may be unsafe. onPageBegin will not be simulated.
   * </p>
   *
   * @param { Callback<OnLoadFinishedEvent> } callback The triggered function at the end of web page loading.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  onLoadFinished(callback: Callback<OnLoadFinishedEvent>): WebAttribute;

  /**
   * Triggered when the page loading progress changes.
   *
   * @param { function } callback The triggered function when the page loading progress changes.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Triggered when the page loading progress changes.
   *
   * @param { function } callback The triggered function when the page loading progress changes.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when the page loading progress changes.
   *
   * @param { Callback<OnProgressChangeEvent> } callback The triggered function when the page loading progress changes.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onProgressChange(callback: Callback<OnProgressChangeEvent>): WebAttribute;

  /**
   * Triggered when the title of the main application document changes.
   *
   * @param { function } callback The triggered function when the title of the main application document changes.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Triggered when the title of the main application document changes.
   *
   * @param { function } callback The triggered function when the title of the main application document changes.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Notifies the application that the title has changed.
   * If the page being loaded does not specify a title via the <title> element,
   * ArkWeb will generate a title baseed on the URL and return it to the application.
   *
   * @param { Callback<OnTitleReceiveEvent> } callback The triggered function when the title of the main application document changes.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onTitleReceive(callback: Callback<OnTitleReceiveEvent>): WebAttribute;

  /**
   * Triggered when requesting to hide the geolocation.
   *
   * @param { function } callback The triggered function when requesting to hide the geolocation permission.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Called to notify the user that the request for obtaining the geolocation information received
   * when {@link onGeolocationShow} is called has been canceled.
   *
   * @param { function } callback Callback invoked when the request for obtaining geolocation information has been canceled.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  onGeolocationHide(callback: () => void): WebAttribute;

  /**
   * Triggered when requesting to show the geolocation permission.
   *
   * @param { function } callback The triggered function when requesting to show the geolocation permission.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Triggered when requesting to show the geolocation permission.
   *
   * @param { function } callback The triggered function when requesting to show the geolocation permission.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Called when a request to obtain the geolocation information is received.
   * @param { Callback<OnGeolocationShowEvent> } callback - Callback invoked when a request to obtain the geolocation
   *                                                        information is received.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onGeolocationShow(callback: Callback<OnGeolocationShowEvent>): WebAttribute;

  /**
   * Triggered when the Web gets the focus.
   *
   * @param { function } callback The triggered function when the Web gets the focus.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Triggered when the Web gets the focus.
   *
   * @param { function } callback The triggered function when the Web gets the focus.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  onRequestSelected(callback: () => void): WebAttribute;

  /**
   * Triggered when alert() is invoked to display an alert dialog box on the web page.
   *
   * @param { function } callback Callback used when alert() is invoked to display an alert dialog box on the web page.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Triggered when alert() is invoked to display an alert dialog box on the web page.
   *
   * @param { function } callback Callback used when alert() is invoked to display an alert dialog box on the web page.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when alert() is invoked to display an alert dialog box on the web page.
   *
   * @param {  Callback<OnAlertEvent, boolean> } callback Callback used when alert() is invoked to display an alert dialog box on the web page.
   *     {@code true} means the application can invoke custom pop-up dialog capabilities (with confirmation and cancellation buttons).
   *                  Developers need to use the JsResult interface to notify the web component whether to leave the current page
   *                  according to the user's choice.
   *     {@code false} means the pop-up processing result is considered as cancelled.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onAlert(callback: Callback<OnAlertEvent, boolean>): WebAttribute;

  /**
   * Triggered when the Web wants to confirm navigation from JavaScript onbeforeunload.
   *
   * @param { function } callback The triggered function when the web page wants to confirm navigation from JavaScript onbeforeunload.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Triggered when the Web wants to confirm navigation from JavaScript onbeforeunload.
   *
   * @param { function } callback The triggered function when the web page wants to confirm navigation from JavaScript onbeforeunload.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when the Web wants to confirm navigation from JavaScript onbeforeunload.
   *
   * @param { Callback<OnBeforeUnloadEvent, boolean> } callback The triggered function when the web page wants to confirm navigation from JavaScript onbeforeunload.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * Triggered when the Web wants to confirm navigation from JavaScript onbeforeunload.
   *
   * @param { Callback<OnBeforeUnloadEvent, boolean> } callback The triggered function when the web page wants to confirm navigation from JavaScript onbeforeunload.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onBeforeUnload(callback: Callback<OnBeforeUnloadEvent, boolean>): WebAttribute;

  /**
   * Triggered when confirm() is invoked by the web page.
   *
   * @param { function } callback Callback triggered when confirm() is invoked by the web page.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Triggered when confirm() is invoked by the web page.
   *
   * @param { function } callback Callback triggered when confirm() is invoked by the web page.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when confirm() is invoked by the web page.
   *
   * @param { Callback<OnConfirmEvent, boolean> } callback Callback triggered when confirm() is invoked by the web page.
   *     {@code true} means the application can call the custom pop-up capability (including confirmation and cancellation), and needs to call JsResult
   *                  to notify the Web component whether to leave the current page based on the user's confirmation or cancellation operation.
   *     {@code false} means the custom pop-up drawn in the function is invalid.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onConfirm(callback: Callback<OnConfirmEvent, boolean>): WebAttribute;

  /**
   * Triggered when prompt() is invoked by the web page.
   *
   * @param { function } callback Callback used when prompt() is invoked by the web page.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Triggered when prompt() is invoked by the web page.
   *
   * @param { function } callback Callback used when prompt() is invoked by the web page.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when prompt() is invoked by the web page.
   *
   * @param { Callback<OnPromptEvent, boolean> } callback Callback used when prompt() is invoked by the web page.
   *     {@code true} means the application can call the custom pop-up window capability (including confirmation, cancellation, and input),and needs to
   *                   call JsResult to notify the Web component of the final processing result based on the user's confirmation or cancellation operation.
   *     {@code false} means the pop-up window processing result is considered as a cancellation.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onPrompt(callback: Callback<OnPromptEvent, boolean>): WebAttribute;

  /**
   * Triggered when the web page receives a JavaScript console message.
   *
   * @param { function } callback The triggered function when the web page receives a JavaScript console message.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Triggered when the web page receives a JavaScript console message.
   *
   * @param { function } callback The triggered function when the web page receives a JavaScript console message.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when the web page receives a JavaScript console message.
   *
   * @param {  Callback<OnConsoleEvent, boolean> } callback The triggered function when the web page receives a JavaScript console message.
   *     {@code true} means the message will no longer be printed to the console.
   *     {@code false} means it will still be printed to the console.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onConsole(callback: Callback<OnConsoleEvent, boolean>): WebAttribute;

  /**
   * Triggered when the web page receives a web resource loading error.
   *
   * @param { function } callback The triggered function when the web page receives a web resource loading error.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Triggered when the web page receives a web resource loading error.
   *
   * @param { function } callback The triggered function when the web page receives a web resource loading error.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @since 10
   */
  /**
   * Triggered when the web page receives a web resource loading error.
   *
   * @param { function } callback The triggered function when the web page receives a web resource loading error.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when the web page receives a web resource loading error.
   *
   * @param { Callback<OnErrorReceiveEvent> } callback The triggered function when the web page receives a web resource loading error.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onErrorReceive(callback: Callback<OnErrorReceiveEvent>): WebAttribute;

  /**
   * Triggered when the web page receives a web resource loading HTTP error.
   *
   * @param { function } callback The triggered function when the web page receives a web resource loading HTTP error.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Triggered when the web page receives a web resource loading HTTP error.
   *
   * @param { function } callback The triggered function when the web page receives a web resource loading HTTP error.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when the web page receives a web resource loading HTTP error.
   *
   * @param { Callback<OnHttpErrorReceiveEvent> } callback The triggered function when the web page receives a web resource loading HTTP error.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onHttpErrorReceive(callback: Callback<OnHttpErrorReceiveEvent>): WebAttribute;

  /**
   * Triggered when starting to download.
   *
   * @param { function } callback The triggered function when starting to download.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Triggered when starting to download.
   *
   * @param { function } callback The triggered function when starting to download.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when starting to download.
   *
   * @param { Callback<OnDownloadStartEvent> } callback The triggered function when starting to download.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onDownloadStart(callback: Callback<OnDownloadStartEvent>): WebAttribute;

  /**
   * Triggered when the Web page refreshes accessed history.
   *
   * @param { function } callback The triggered callback when the Web page refreshes accessed history.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8
   */
  /**
   * Triggered when the Web page refreshes accessed history.
   *
   * @param { function } callback The triggered callback when the Web page refreshes accessed history.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when the Web page refreshes accessed history.
   *
   * @param { Callback<OnRefreshAccessedHistoryEvent> } callback The triggered callback when the Web page refreshes accessed history.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * Triggered when the Web page refreshes accessed history.
   *
   * @param { Callback<OnRefreshAccessedHistoryEvent> } callback The triggered callback when the Web page refreshes accessed history.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onRefreshAccessedHistory(callback: Callback<OnRefreshAccessedHistoryEvent>): WebAttribute;

  /**
   * Triggered when the URL loading is intercepted.
   *
   * @param { function } callback The triggered callback when the URL loading is intercepted.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8 dynamiconly
   * @deprecated since 10
   * @useinstead ohos.web.WebAttribute#onLoadIntercept
   */
  onUrlLoadIntercept(callback: (event?: { data: string | WebResourceRequest }) => boolean): WebAttribute;

  /**
   * Triggered when the Web page receives an ssl Error.
   *
   * @param { function } callback The triggered callback when the Web page receives an ssl Error.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8 dynamiconly
   * @deprecated since 9
   * @useinstead ohos.web.WebAttribute#onSslErrorEventReceive
   */
  onSslErrorReceive(callback: (event?: { handler: Function, error: object }) => void): WebAttribute;

  /**
   * Triggered when the render process exits.
   *
   * @param { function } callback The triggered when the render process exits.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Triggered when the render process exits.
   *
   * @param { function } callback The triggered when the render process exits.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when the render process exits.
   * Multiple Web components may share a single rendering process, and each affected Web component will trigger the callback.
   * When the application handles this callback, it can call the related interface of the bound webviewController to
   * restore the page. Such as {@link refresh}, {@link loadUrl}, etc.
   * For details of component lifecycle callback, please refer to the lifecycle of Web components.
   * @param { Callback<OnRenderExitedEvent> } callback The triggered when the render process exits.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  onRenderExited(callback: Callback<OnRenderExitedEvent>): WebAttribute;

  /**
   * Triggered when the file selector shows.
   *
   * @param { function } callback The triggered when the file selector shows.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Triggered when the file selector shows.
   *
   * @param { function } callback The triggered when the file selector shows.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when the file selector shows.
   * Call this function to handle HTML forms with a "file" input type. If this function is not called or returns false,
   * the web component provides the default "select file" handling interface. If it returns true, the application can customize
   * the "select file" response behavior.
   *
   * @param { Callback<OnShowFileSelectorEvent, boolean> } callback The triggered when the file selector shows.
   *     {@code true} means the user can call the system-provided pop-up window capability.
   *     {@code false} means the custom pop-up window drawn in the function is invalid.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onShowFileSelector(callback: Callback<OnShowFileSelectorEvent, boolean>): WebAttribute;

  /**
   * Triggered when the render process exits.
   *
   * @param { function } callback The triggered when the render process exits.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8 dynamiconly
   * @deprecated since 9
   * @useinstead ohos.web.WebAttribute#onRenderExited
   */
  onRenderExited(callback: (event?: { detail: object }) => boolean): WebAttribute;

  /**
   * Triggered when the file selector shows.
   *
   * @param { function } callback The triggered when the file selector shows.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 8 dynamiconly
   * @deprecated since 9
   * @useinstead ohos.web.WebAttribute#onShowFileSelector
   */
  onFileSelectorShow(callback: (event?: { callback: Function, fileSelector: object }) => void): WebAttribute;

  /**
   * Triggered when the url loading.
   *
   * @param { function } callback The triggered when the url loading.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Triggered when the url loading.
   *
   * @param { function } callback The triggered when the url loading.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when the url loading.
   *
   * @param { Callback<OnResourceLoadEvent> } callback The triggered when the url loading.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  onResourceLoad(callback: Callback<OnResourceLoadEvent>): WebAttribute;

  /**
   * Triggered when the web component exit the full screen mode.
   *
   * @param { function } callback The triggered function when the web component exit the full screen mode.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Triggered when the web component exit the full screen mode.
   *
   * @param { function } callback The triggered function when the web component exit the full screen mode.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when the web component exit the full screen mode.
   *
   * @param { function } callback The triggered function when the web component exit the full screen mode.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onFullScreenExit(callback: () => void): WebAttribute;

  /**
   * Triggered when the web component enter the full screen mode.
   *
   * @param { function } callback The triggered function when the web component enter the full screen mode.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Triggered when the web component enter the full screen mode.
   *
   * @param { function } callback The triggered function when the web component enter the full screen mode.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when the web component enter the full screen mode.
   *
   * @param { OnFullScreenEnterCallback } callback - The triggered function when the web component enter the full screen mode.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * Triggered when the web component enter the full screen mode.
   *
   * @param { OnFullScreenEnterCallback } callback - The triggered function when the web component enter the full screen mode.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  onFullScreenEnter(callback: OnFullScreenEnterCallback): WebAttribute;

  /**
   * Triggered when the scale of WebView changed.
   *
   * @param { function } callback The triggered when the scale of WebView changed.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Triggered when the scale of WebView changed.
   *
   * @param { function } callback The triggered when the scale of WebView changed.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when the scale of WebView changed.
   *
   * @param { Callback<OnScaleChangeEvent> } callback The triggered when the scale of WebView changed.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onScaleChange(callback: Callback<OnScaleChangeEvent>): WebAttribute;

  /**
   * Triggered when the browser needs credentials from the user.
   *
   * @param { function } callback The triggered when the browser needs credentials from the user.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Triggered when the browser needs credentials from the user.
   *
   * @param { function } callback The triggered when the browser needs credentials from the user.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when the browser needs credentials from the user.
   *
   * @param { Callback<OnHttpAuthRequestEvent, boolean> } callback The triggered when the browser needs credentials from the user.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onHttpAuthRequest(callback: Callback<OnHttpAuthRequestEvent, boolean>): WebAttribute;

  /**
   * Triggered when the resources loading is intercepted.
   *
   * @param { function } callback The triggered callback when the resources loading is intercepted.
   * @returns { WebAttribute } If the response value is null, the Web will continue to load the resources. Otherwise, the response value will be used
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Triggered when the resources loading is intercepted.
   *
   * @param { function } callback The triggered callback when the resources loading is intercepted.
   * @returns { WebAttribute } If the response value is null, the Web will continue to load the resources. Otherwise, the response value will be used
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when the resources loading is intercepted.
   *
   * @param { Callback<OnInterceptRequestEvent, WebResourceResponse> } callback The triggered callback when the resources loading is intercepted.
   * @returns { WebAttribute } If the response value is null, the Web will continue to load the resources. Otherwise, the response value will be used
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * Triggered when the resources loading is intercepted.
   *
   * @param { Callback<OnInterceptRequestEvent, WebResourceResponse> } callback The triggered callback when the resources loading is intercepted.
   * @returns { WebAttribute } If the response value is null, the Web will continue to load the resources. Otherwise, the response value will be used
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  onInterceptRequest(callback: Callback<OnInterceptRequestEvent, WebResourceResponse>): WebAttribute;

  /**
   * Triggered when the host application that web content from the specified origin is attempting to access the resources.
   *
   * @param { function } callback The triggered callback when the host application that web content from the specified origin is
   *     attempting to access the resources.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Triggered when the host application that web content from the specified origin is attempting to access the resources.
   *
   * @param { function } callback The triggered callback when the host application that web content from the specified origin is
   *     attempting to access the resources.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Called when a permission request is received. To call this API, you need to declare the ohos.permission.CAMERA and ohos.permission.MICROPHONE permissions.
   *
   * @param { Callback<OnPermissionRequestEvent> } callback Callback invoked when a permission request is received.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onPermissionRequest(callback: Callback<OnPermissionRequestEvent>): WebAttribute;

  /**
   * Triggered when the host application that web content from the specified origin is requesting to capture screen.
   * @param { function } callback The triggered callback when the host application that web content from the specified origin is
   *     requesting to capture screen.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 10
   */
  /**
   * Triggered when the host application that web content from the specified origin is requesting to capture screen.
   * @param { function } callback The triggered callback when the host application that web content from the specified origin is
   *     requesting to capture screen.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Called when a screen capture request is received.
   *
   * @param { Callback<OnScreenCaptureRequestEvent> } callback Called when a screen capture request is received.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  onScreenCaptureRequest(callback: Callback<OnScreenCaptureRequestEvent>): WebAttribute;

  /**
   * Triggered when called to allow custom display of the context menu.
   *
   * @param { function } callback The triggered callback when called to allow custom display of the context menu.
   * @returns { WebAttribute } If custom display return true.Otherwise, default display return false.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Triggered when called to allow custom display of the context menu.
   *
   * @param { function } callback The triggered callback when called to allow custom display of the context menu.
   * @returns { WebAttribute } If custom display return true.Otherwise, default display return false.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when called to allow custom display of the context menu.
   *
   * @param { Callback<OnContextMenuShowEvent, boolean> } callback The triggered callback when called to allow custom display of the context menu.
   *     {@code true} means the custom menu is triggered.
   *     {@code false} means the custom menu is invalid.
   * @returns { WebAttribute } If custom display return true.Otherwise, default display return false.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  onContextMenuShow(callback: Callback<OnContextMenuShowEvent, boolean>): WebAttribute;

  /**
   * Triggered when called to allow custom hide of the context menu.
   *
   * @param { OnContextMenuHideCallback } callback The triggered function when called to allow custom hide of the context menu.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  onContextMenuHide(callback: OnContextMenuHideCallback): WebAttribute;

  /**
   * Set whether media playback needs to be triggered by user gestures.
   *
   * @param { boolean } access True if it needs to be triggered manually by the user else false.
   *    The default value is true.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Set whether to manually play audio-only videos. The playback of muted videos is not controlled by this interface.
   *
   * @param { boolean } access Set whether to manually play audio-only videos.
   *  {@code true}True means setting up automatic playback of audio videos requires users to manually click, {@code false} otherwise.
   *    Default value: true.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  mediaPlayGestureAccess(access: boolean): WebAttribute;

  /**
   * Notify search result to host application through onSearchResultReceive.
   *
   * @param { function } callback Function Triggered when the host application call searchAllAsync.
   * or searchNext api on WebController and the request is valid.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Notify search result to host application through onSearchResultReceive.
   *
   * @param { function } callback Function Triggered when the host application call searchAllAsync.
   * or searchNext api on WebController and the request is valid.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Notify search result to host application through onSearchResultReceive.
   *
   * @param { Callback<OnSearchResultReceiveEvent> } callback Function Triggered when the host application call searchAllAsync.
   * or searchNext api on WebController and the request is valid.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  onSearchResultReceive(callback: Callback<OnSearchResultReceiveEvent>): WebAttribute;

  /**
   * Notify the global scroll position of the web page
   *
   * Description:
   *
   * What is notified is the global scroll position of the page.
   * Changes in the local scroll position cannot trigger this callback.
   *
   * Determine whether the page is globally scrolled and print window.pagYOffset
   * or window.pagXOffset before and after scrolling.
   *
   * If it is global scrolling, the value of window.pagYOffset
   * or window.pagXOffset will change before and after scrolling, and vice versa.
   *
   * @param { function } callback Function triggered when the web page scroll to the specified position.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Notify the global scroll position of the web page
   *
   * Description:
   *
   * What is notified is the global scroll position of the page.
   * Changes in the local scroll position cannot trigger this callback.
   *
   * Determine whether the page is globally scrolled and print window.pagYOffset
   * or window.pagXOffset before and after scrolling.
   *
   * If it is global scrolling, the value of window.pagYOffset
   * or window.pagXOffset will change before and after scrolling, and vice versa.
   *
   * @param { function } callback Function triggered when the web page scroll to the specified position.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Notify the global scroll position of the web page
   *
   * Description:
   *
   * What is notified is the global scroll position of the page.
   * Changes in the local scroll position cannot trigger this callback.
   *
   * Determine whether the page is globally scrolled and print window.pagYOffset
   * or window.pagXOffset before and after scrolling.
   *
   * If it is global scrolling, the value of window.pagYOffset
   * or window.pagXOffset will change before and after scrolling, and vice versa.
   *
   * @param { Callback<OnScrollEvent> } callback Function triggered when the web page scroll to the specified position.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onScroll(callback: Callback<OnScrollEvent>): WebAttribute;

  /**
   * Triggered when the Web page receives an ssl Error.
   *
   * @param { function } callback The triggered callback when the Web page receives an ssl Error.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Triggered when the Web page receives an ssl Error.
   *
   * @param { function } callback The triggered callback when the Web page receives an ssl Error.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when the Web page receives an ssl Error.
   *
   * @param { Callback<OnSslErrorEventReceiveEvent> } callback The triggered callback
   *     when the Web page receives an ssl Error.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * Called to notify users when an SSL error occurs with a request for the main frame.
   * To include errors with requests for subframes, use the OnSslErrorEvent API.
   *
   * @param { Callback<OnSslErrorEventReceiveEvent> } callback The triggered callback
   *     when the Web page receives an ssl Error.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  onSslErrorEventReceive(callback: Callback<OnSslErrorEventReceiveEvent>): WebAttribute;

  /**
   * Triggered when the Web page receives an ssl Error.
   *
   * @param { OnSslErrorEventCallback } callback The triggered callback when the Web page receives an ssl Error.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * Called to notify users when an SSL error occurs during the loading of resources (for the main frame and subframes).
   * To handle SSL errors for requests for the main frame, use the isMainFrame field to distinguish.
   *
   * @param { OnSslErrorEventCallback } callback The triggered callback when the Web page receives an ssl Error.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  onSslErrorEvent(callback: OnSslErrorEventCallback): WebAttribute;

  /**
   * Triggered when the Web page needs ssl client certificate from the user.
   *
   * @param { function } callback The triggered callback when needs ssl client certificate from the user.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Triggered when the Web page needs ssl client certificate from the user.
   *
   * @param { function } callback The triggered callback when needs ssl client certificate from the user.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when the Web page needs ssl client certificate from the user.
   *
   * @param { Callback<OnClientAuthenticationEvent> } callback The triggered callback when needs ssl client certificate from the user.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  onClientAuthenticationRequest(callback: Callback<OnClientAuthenticationEvent>): WebAttribute;

  /**
   * Triggered when the Web page needs verify pin from the user.
   *
   * @param { OnVerifyPinCallback } callback The triggered callback when needs verify pin from the user.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  onVerifyPin(callback: OnVerifyPinCallback): WebAttribute;

  /**
   * Triggered when web page requires the user to create a window.
   *
   * @param { function } callback The triggered callback when web page requires the user to create a window.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Triggered when web page requires the user to create a window.
   *
   * @param { function } callback The triggered callback when web page requires the user to create a window.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when web page requires the user to create a window.
   * If the {@link setWebController} interface is not called, the render process will be blocked.
   * If no new window is created, it is set to null when calling the {@link setWebController} interface,
   * informing the Web that no new window is created.
   * The new window should avoid being directly overlaid on the original Web component,
   * and its URL (such as address bar) should be clearly displayed in the same form as the main page to
   * prevent users from being confused. If credible URL visualization management cannot be achieved,
   * it is necessary to consider prohibiting the creation of new windows. It should be noted that the source of
   * the new window request cannot be traced reliably, and it may be initiated by a third party iframe.
   * The application needs to take defensive measures such as sandbox isolation and permission restriction
   * by default to ensure security.
   * @param {  Callback<OnWindowNewEvent> } callback The triggered callback when web page requires the user to create a window.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  onWindowNew(callback: Callback<OnWindowNewEvent>): WebAttribute;

  /**
   * Triggered when web page requires to create a new window.
   * If the {@link setWebController} interface is not called, the render process will be blocked.
   * If no new window is created, it is set to null when calling the {@link setWebController} interface,
   * informing the Web that no new window is created.
   * New windows must not be placed to directly cover the original Web component. Additionally,
   * their URLs—specifically the content shown in the address bar—should follow the same display
   * format as the main page, ensuring clarity for users and avoiding confusion. In cases where
   * reliable visual management of URLs is not feasible, restricting the creation of new windows
   * should be considered. It is also important to note that the origin of new window requests
   * cannot be tracked with certainty; such requests may even be triggered by third-party iframes.
   * For this reason, applications must implement default defensive measures like sandbox isolation
   * and permission controls to safeguard security.
   * @param {  Callback<OnWindowNewExtEvent> } callback The triggered callback when web page requires the user
   *     to create a window.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 23 dynamic
   */
  onWindowNewExt(callback: Callback<OnWindowNewExtEvent>): WebAttribute;

  /**
   * Triggered when web page requires the user to close a window.
   *
   * @param { function } callback The triggered callback when web page requires the user to close a window.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Notifies the user of the window closing request.
   * Like {@link onWindowNew}, from a security perspective, applications should ensure that users can know that
   * the page they interact with is closed.
   * @param { function } callback The triggered callback when web page requires the user to close a window.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  onWindowExit(callback: () => void): WebAttribute;

  /**
   * Set whether multiple windows are supported.
   *
   * @param { boolean } multiWindow True if it needs to be triggered manually by the user else false.
   *    The default value is false.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Set whether multiple windows are supported.
   * When multiple windows permissions are enabled, the {@link onWindowNew} event needs to be implemented.
   * @param { boolean } multiWindow True if it needs to be triggered manually by the user else false.
   *    The default value is false.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  multiWindowAccess(multiWindow: boolean): WebAttribute;

  /**
   * Key events notify the application before the WebView consumes them.
   *
   * @param { function } callback Key event info.
   * @returns { WebAttribute } True if the application consumes key events else false.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Key events notify the application before the WebView consumes them.
   *
   * @param { function } callback Key event info.
   * @returns { WebAttribute } True if the application consumes key events else false.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  onInterceptKeyEvent(callback: (event: KeyEvent) => boolean): WebAttribute;

  /**
   * Set the font of webview standard font library. The default font is "sans serif".
   *
   * @param { string } family Standard font set series.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Sets the standard font family for the web page.
   *
   * @param { string } family Sets the standard font family for the web page.
   *    Default value: sans-serif.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  webStandardFont(family: string): WebAttribute;

  /**
   * Set the font of webview serif font library. The default font is "serif".
   *
   * @param { string } family Serif font set series.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Sets a serif font family for the web page.
   *
   * @param { string } family Serif font family to set.
   *    Default value: serif.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  webSerifFont(family: string): WebAttribute;

  /**
   * Set the font of webview sans serif font library. The default font is "sans-serif".
   *
   * @param { string } family Sans serif font set series.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Sets the sans serif font family for the web page.
   *
   * @param { string } family Sets the sans serif font family for the web page.
   *    Default value: sans-serif.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  webSansSerifFont(family: string): WebAttribute;

  /**
   * Set the font of webview fixed font library. The default font is "monospace".
   *
   * @param { string } family Fixed font set series.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Sets the fixed font family for the web page.
   *
   * @param { string } family Sets the fixed font family for the web page.
   *    Default value: monospace.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  webFixedFont(family: string): WebAttribute;

  /**
   * Set the font of webview fantasy font library. The default font is "fantasy".
   *
   * @param { string } family fantasy font set series.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Sets the fantasy font family for the web page.
   *
   * @param { string } family Sets the fantasy font family for the web page.
   *    Default value: fantasy.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  webFantasyFont(family: string): WebAttribute;

  /**
   * Set the font of webview cursive font library. The default font is "cursive".
   *
   * @param { string } family Cursive font set series.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Sets the cursive font family for the web page.
   *
   * @param { string } family Sets the cursive font family for the web page.
   *    Default value: cursive.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  webCursiveFont(family: string): WebAttribute;

  /**
   * Set the default fixed font value of webview. The default value is 13, ranging from 1 to 72.
   *
   * @param { number } size Font size.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Sets the default font size for the web page.
   *
   * @param { number } size Default fixed font size to set, in px.
   *    The value ranges from -2^31 to 2^31-1. In actual rendering,
   *    values greater than 72 are handled as 72, and values less than 1 are handled as 1.
   *    Default value: 13.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  defaultFixedFontSize(size: number): WebAttribute;

  /**
   * Set the default font value of webview. The default value is 16, ranging from 1 to 72.
   *
   * @param { number } size Font size.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Sets the default font size for the web page.
   *
   * @param { number } size Default font size to set, in px.
   *    The value ranges from -2^31 to 2^31-1. In actual rendering, values greater than 72 are handled as 72,
   *    and values less than 1 are handled as 1. Default value: 16.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  defaultFontSize(size: number): WebAttribute;

  /**
   * Set the minimum value of webview font. The default value is 8, ranging from 1 to 72.
   *
   * @param { number } size Font size.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Sets the minimum font size for the web page.
   *
   * @param { number } size Minimum font size to set, in px.
   *    The value ranges from -2^31 to 2^31-1. In actual rendering,
   *    values greater than 72 are handled as 72, and values less than 1 are handled as 1.
   *    Default value: 8
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  minFontSize(size: number): WebAttribute;

  /**
   * Set the logical minimum value of webview font. The default value is 8, ranging from 1 to 72.
   *
   * @param { number } size Font size.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Sets the minimum logical font size for the web page.
   *
   * @param { number } size Minimum logical font size to set, in px.
   *    The value ranges from -2^31 to 2^31-1. In actual rendering,
   *    values greater than 72 are handled as 72, and values less than 1 are handled as 1.
   *    Default value: 8
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  minLogicalFontSize(size: number): WebAttribute;

  /**
   * Set the default text encodingFormat value of webview. The default value is UTF-8.
   *
   * @param { string } textEncodingFormat text encodingFormat.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  defaultTextEncodingFormat(textEncodingFormat: string): WebAttribute;

  /**
   * Set whether the scroll bar is permanent. In the resident state,
   * when the page size exceeds one page, the scroll bar appears and does not disappear.
   *
   * Scroll bar resident is not supported in full expansion mode,
   * that is, when layoutMode is WebLayoutMode.FIT_CONTENT mode, the parameter enabled is false.
   *
   * @param { boolean } enabled {@code true} means show; {@code false} otherwise. default is false.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 14 dynamic
   */
  forceDisplayScrollBar(enabled: boolean): WebAttribute;

  /**
   * Whether web component can load resource from network.
   *
   * @param { boolean } block {@code true} means it can't load resource from network; {@code false} otherwise.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Whether web component can load resource from network.
   *
   * @param { boolean } block {@code true} means it can't load resource from network; {@code false} otherwise.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Whether web component can load resource from network.
   *
   * @param { boolean } block {@code true} means it can't load resource from network; {@code false} otherwise.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  blockNetwork(block: boolean): WebAttribute;

  /**
   * Set whether paint horizontal scroll bar.
   *
   * @param { boolean } horizontalScrollBar True if it needs to paint horizontal scroll bar.
   *    The default value is true.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Set whether paint horizontal scroll bar.
   *
   * <p><strong>API Note</strong>:<br>
   * After controlling the horizontal scrollbar's visibility through the @State variable, you need to call controller.refresh() to take effect.<br>
   * When frequently changing the @State variable dynamically, it is recommended to match the toggle variable with the Web component one-to-one.
   * </p>
   *
   * @param { boolean } horizontalScrollBar True if it needs to paint horizontal scroll bar.
   *    The default value is true.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  horizontalScrollBarAccess(horizontalScrollBar: boolean): WebAttribute;

  /**
   * Set whether paint vertical scroll bar.
   *
   * @param { boolean } verticalScrollBar True if it needs to paint vertical scroll bar.
   *    The default value is true.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Set whether paint vertical scroll bar, including the system default scrollbar and user-defined scrollbar.
   *
   * <p><strong>API Note</strong>:<br>
   * After controlling the vertical scrollbar's visibility through the @State variable, you need to call controller.refresh() to take effect.<br>
   * When frequently changing the @State variable dynamically, it is recommended to match the toggle variable with the Web component one-to-one.
   * </p>
   *
   * @param { boolean } verticalScrollBar True if it needs to paint vertical scroll bar.
   *    The default value is true.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  verticalScrollBarAccess(verticalScrollBar: boolean): WebAttribute;

  /**
   * Triggered when the application receive the url of an apple-touch-icon.
   *
   * @param { function } callback The triggered callback when the application receive an new url of an
   * apple-touch-icon.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Triggered when the application receive the url of an apple-touch-icon.
   *
   * @param { function } callback The triggered callback when the application receive an new url of an
   * apple-touch-icon.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when the application receive the url of an apple-touch-icon.
   *
   * @param { Callback<OnTouchIconUrlReceivedEvent> } callback The triggered callback when the application receive an new url of an
   * apple-touch-icon.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  onTouchIconUrlReceived(callback: Callback<OnTouchIconUrlReceivedEvent>): WebAttribute;

  /**
   * Triggered when the application receive a new favicon for the current web page.
   *
   * @param { function } callback The triggered callback when the application receive a new favicon for the
   * current web page.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Triggered when the application receive a new favicon for the current web page.
   *
   * @param { function } callback The triggered callback when the application receive a new favicon for the
   * current web page.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when the application receive a new favicon for the current web page.
   *
   * @param { Callback<OnFaviconReceivedEvent> } callback The triggered callback when the application receive a new favicon for the
   * current web page.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  onFaviconReceived(callback: Callback<OnFaviconReceivedEvent>): WebAttribute;

  /**
   * Triggered when previous page will no longer be drawn and next page begin to draw.
   *
   * @param { function } callback The triggered callback when previous page will no longer be drawn and next
   * page begin to draw.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Triggered when previous page will no longer be drawn and next page begin to draw.
   *
   * @param { function } callback The triggered callback when previous page will no longer be drawn and next
   * page begin to draw.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when previous page will no longer be drawn and next page begin to draw.
   *
   * @param {  Callback<OnPageVisibleEvent> } callback The triggered callback when previous page will no longer be drawn and next
   * page begin to draw.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onPageVisible(callback: Callback<OnPageVisibleEvent>): WebAttribute;

  /**
   * Triggered when the form could be resubmitted.
   *
   * @param { function } callback The triggered callback to decision whether resend form data or not.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Triggered when the form could be resubmitted.
   *
   * @param { function } callback The triggered callback to decision whether resend form data or not.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when the form could be resubmitted.
   *
   * @param { Callback<OnDataResubmittedEvent> } callback The triggered callback to decision whether resend form data or not.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  onDataResubmitted(callback: Callback<OnDataResubmittedEvent>): WebAttribute;

  /**
   * Set whether enable pinch smooth mode.
   *
   * @param { boolean } isEnabled True if it needs to enable smooth mode.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 9
   */
  /**
   * Sets whether to enable smooth pinch mode for the web page.
   *
   * @param { boolean } isEnabled Whether to enable smooth pinch mode for the web page.
   *    {@code true} means to enable smooth pinch mode for the web page;
   *    {@code false} means not to enable smooth pinch mode for the web page.
   *    The default value is false.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  pinchSmooth(isEnabled: boolean): WebAttribute;

  /**
   * Whether the window can be open automatically through JavaScript.
   *
   * @param { boolean } flag If it is true, the window can be opened automatically through JavaScript.
   * If it is false and user behavior, the window can be opened automatically through JavaScript.
   * Otherwise, the window cannot be opened.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 10
   */
  /**
   * Whether the window can be open automatically through JavaScript.
   * <p><strong>API Note</strong>:<br>
   * This API takes effect only when {@link JavaScript} is enabled.
   * This API opens a new window when {@link multiWindowAccess} is enabled and opens a local window
   * when {@link multiWindowAccess} is disabled.
   * The default value of **flag** is subject to the settings of the **persist.web.allowWindowOpenMethod.enabled** system attribute.
   * If this attribute is not set, the default value of **flag** is **false**.
   * To check the settings of **persist.web.allowWindowOpenMethod.enabled**,
   * run the **hdc shell param get persist.web.allowWindowOpenMethod.enabled** command.
   * If the attribute value is 1, it means the system attribute is enabled;
   * If the attribute value is 0 or does not exist, it means that the system attribute has not been enabled.
   * you can run the **hdc shell param set persist.web.allowWindowOpenMethod.enabled 1** command to enable it.
   * </p>
   *
   * @param { boolean } flag If it is true, the window can be opened automatically through JavaScript.
   * If it is false and user behavior, the window can be opened automatically through JavaScript.
   * Otherwise, the window cannot be opened.
   * The user behavior here refers to the behavior of requesting to open a new window (window. open) within 5 seconds after
   * the user clicks or performs other operations on the web component.
   * The default value is associated with system properties.
   * When the system property **persist.web.allowWindowOpenMethod.enabled** is set to true, the default value is true.
   * If the system property is not set, the default value is false.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  allowWindowOpenMethod(flag: boolean): WebAttribute;

  /**
   * Triggered when the playing state of audio on web page changed.
   *
   * @param { function } callback The playing state of audio on web page.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 10
   */
  /**
   * Triggered when the playing state of audio on web page changed.
   *
   * @param { function } callback The playing state of audio on web page.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Set the callback function when the audio playback status on the webpage changes.
   *
   * @param { Callback<OnAudioStateChangedEvent> } callback Callback invoked when the audio playback status on the webpage changes.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  onAudioStateChanged(callback: Callback<OnAudioStateChangedEvent>): WebAttribute;

  /**
   * Triggered when the first content rendering of web page.
   *
   * @param { function } callback
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 10
   */
  /**
   * Triggered when the first content rendering of web page.
   *
   * @param { function } callback
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when the first content rendering of web page.
   *
   * @param { Callback<OnFirstContentfulPaintEvent> } callback
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  onFirstContentfulPaint(callback: Callback<OnFirstContentfulPaintEvent>): WebAttribute;

  /**
   * Triggered when the first meaningful paint occurs on the web page.
   *
   * @param { OnFirstMeaningfulPaintCallback } callback - Callback invoked when the first meaningful paint occurs on the web page.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  onFirstMeaningfulPaint(callback: OnFirstMeaningfulPaintCallback): WebAttribute;

  /**
   * Triggered when the largest content paint occurs on the web page.
   *
   * @param { OnLargestContentfulPaintCallback } callback Callback invoked when the largest content paint occurs on the web page.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  onLargestContentfulPaint(callback: OnLargestContentfulPaintCallback): WebAttribute;

  /**
   * Triggered when the resources loading is intercepted.
   *
   * @param { function } callback The triggered callback when the resources loading is intercepted.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 10
   */
  /**
   * Triggered when the resources loading is intercepted.
   *
   * @param { function } callback The triggered callback when the resources loading is intercepted.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when the resources loading is intercepted.
   *
   * @param { Callback<OnLoadInterceptEvent, boolean> } callback The triggered callback when the resources loading is intercepted.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  onLoadIntercept(callback: Callback<OnLoadInterceptEvent, boolean>): WebAttribute;

  /**
   * Triggered when The controller is bound to the web component, this controller must be a WebviewController.
   * This callback can not use the interface about manipulating web pages.
   * @param { function } callback The triggered callback when web controller initialization success.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 10
   */
  /**
   * The callback is triggered when the Controller is successfully bound to the Web component,
   * and the Controller must be a WebviewController, and it is forbidden to call the interface related to
   * the Web component before the event callback, otherwise a js-error exception will be thrown.
   * Because the webpage has not been loaded when the callback is called, it is impossible to use interfaces related to
   * operating webpages in the callback, such as {@link zoomIn} and {@link zoomOut}, and you can use interfaces unrelated to
   * operating webpages such as {@link loadUrl} and {@link getWebId}.
   * @param { function } callback The triggered callback when web controller initialization success.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  onControllerAttached(callback: () => void): WebAttribute;

  /**
   * Triggered when the overscroll occurs.
   * @param { function } callback Function triggered when the overscroll occurs.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 10
   */
  /**
   * Triggered when the overscroll occurs.
   * @param { function } callback Function triggered when the overscroll occurs.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Triggered when the overscroll occurs.
   * @param { Callback<OnOverScrollEvent> } callback Function triggered when the overscroll occurs.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  onOverScroll(callback: Callback<OnOverScrollEvent>): WebAttribute;

  /**
   * Triggered when the PDF in web page scrolling at bottom with pdf scroll event.
   * @param { Callback<OnPdfScrollEvent> } callback Function Triggered when the scrolling to bottom.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  onPdfScrollAtBottom(callback: Callback<OnPdfScrollEvent>): WebAttribute;

  /**
   * Triggered when the PDF page load finish.
   * @param { Callback<OnPdfLoadEvent> } callback
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  onPdfLoadEvent(callback: Callback<OnPdfLoadEvent>): WebAttribute;

  /**
   * Called when received website security risk check result.
   *
   * @param { OnSafeBrowsingCheckResultCallback } callback - Function triggered when received website security risk check result.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  onSafeBrowsingCheckResult(callback: OnSafeBrowsingCheckResultCallback): WebAttribute;

  /**
   * Triggered when the website security risk check is completed.
   * <p><strong>API Note</strong>:<br>
   * Unlike onSafeBrowsingCheckResult, which is only triggered when a URL has security risks, onSafeBrowsingCheckFinish
   * is also triggered when the website security risk check is not performed or no risks are found.
   *
   * @param { OnSafeBrowsingCheckResultCallback } callback - Triggered when received website security risk check result.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 21 dynamic
   */
  onSafeBrowsingCheckFinish(callback: OnSafeBrowsingCheckResultCallback): WebAttribute;

  /**
   * Called when the load committed.
   *
   * @param { OnNavigationEntryCommittedCallback } callback Function Triggered when a load committed.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  onNavigationEntryCommitted(callback: OnNavigationEntryCommittedCallback): WebAttribute;

  /**
   * Called when tracker's cookie is prevented.
   *
   * @param { OnIntelligentTrackingPreventionCallback } callback - Callback triggered when tracker's cookie is prevented.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  onIntelligentTrackingPreventionResult(callback: OnIntelligentTrackingPreventionCallback): WebAttribute;

  /**
   * Injects the JavaScripts script into the Web component.
   * When the specified page or document starts to be loaded, the script is executed on any page whose source matches scriptRules.
   * <p><strong>API Note</strong>:<br>
   * The script runs before any JavaScript code of the page, when the DOM tree may not have been loaded or rendered.
   * The script is executed in the lexicographic order, not array order.
   * If the array order is required, you are advised to use the runJavaScriptOnDocumentStart interface.
   * You are not advised to use this API together with runJavaScriptOnDocumentStart.
   * When scripts with identical content are injected multiple times,
   * silent deduplication will be performed: repeated scripts will neither be displayed nor prompted,
   * and the scriptRules used during the first injection will be adopted.
   * </p>
   *
   * @param { Array<ScriptItem> } scripts - The array of the JavaScripts to be injected.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  javaScriptOnDocumentStart(scripts: Array<ScriptItem>): WebAttribute;

  /**
   * Injects the JavaScripts script into the Web component.
   * When the specified page or document has been loaded, the script is executed on any page whose source matches scriptRules.
   * <p><strong>API NOTE</strong>:<br>
   * The script runs after any JavaScript code of the page, when the DOM tree has been loaded and rendered.
   * The script is excuted in the lexicographic order, not array order.
   * If the array order is required, you are advised to use the runJavaScriptOnDocumentEnd interface.
   * You are not advised to use this API together with runJavaScriptOnDocumentEnd.
   * When scripts with identical content are injected multiple times,
   * silent deduplication will be performed: repeated scripts will neither be displayed nor prompted,
   * and the scriptRules used during the first injection will be adopted.
   * <p>
   *
   * @param { Array<ScriptItem> } scripts - The array of the JavaScripts to be injected.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  javaScriptOnDocumentEnd(scripts: Array<ScriptItem>): WebAttribute;

  /**
   * Sets the web layout mode.
   *
   * <p><strong>API Note</strong>:<br>
   * Currently, only two web layout modes are supported: WebLayoutMode.NONE and WebLayoutMode.FIT_CONTENT.
   * The following restrictions apply with the usage of WebLayoutMode.FIT_CONTENT:
   * - If the Web component is wider or longer than 7680 px, specify the RenderMode.SYNC_RENDER mode
   *   when creating the Web component; otherwise, the screen may be blank.
   * - After the Web component is created, dynamic switching of the layoutMode is not supported.
   * - The width and height of a Web component cannot exceed 500,000 px when the RenderMode.SYNC_RENDER mode is specified,
   *   and cannot exceed 7680 px when the RenderMode.ASYNC_RENDER mode is specified.
   * - Frequent changes to the page width and height will trigger a re-layout of the Web component,
   *   which can affect the user experience.
   * - Waterfall web pages are not supported (drop down to the bottom to load more).
   * - Only height adaptation is supported. Width adaptation is not supported.
   * - Because the height is adaptive to the web page height,
   *   the component height cannot be changed by modifying the component height attribute.
   * </p>
   *
   * @param { WebLayoutMode } mode - The web layout mode, follow the system or adaptive layout.
   *    The default value is WebLayoutMode.NONE.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  layoutMode(mode: WebLayoutMode): WebAttribute;

  /**
   * Called to setting the nested scroll options.
   *
   * @param { NestedScrollOptions } value - options for nested scrolling.
   * @returns { WebAttribute } the attribute of the scroll.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11
   */
  /**
   * Called to setting the nested scroll options.
   *
   * <p><strong>API Note</strong>:<br>
   * You can set four directions: up, down, left, and right, or set nested scrolling modes for forward and backward directions
   * to achieve scrolling linkage with the parent component.<br>
   * When value is of type NestedScrollOptionsExt (four directions: up, down, left, and right), the default scrolling options
   * for scrollUp, scrollDown, scrollLeft, and scrollRight are NestedScrollMode.SELF_FIRST.<br>
   * When value is of type NestedScrollOptions (two directions: forward and backward), the default scrolling options for scrollForward
   * and scrollBackward are NestedScrollMode.SELF_FIRST.<br>
   * Supported nested scrolling containers: Grid, List, Scroll, Swiper, Tabs, WaterFlow, Refresh, bindSheet.<br>
   * Supported nested scrolling input events: gestures, mouse, and trackpad.<br>
   * In nested scrolling scenarios, since web scrolling to the edge will prioritize triggering the overscroll bounce effect,
   * it is recommended to set overScrollMode to OverScrollMode.NEVER to avoid affecting the user experience in this scenario.
   * </p>
   *
   * @param { NestedScrollOptions | NestedScrollOptionsExt } value - options for
   *     nested scrolling.
   * @returns { WebAttribute } the attribute of the scroll.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 14
   */
  /**
   * Called to setting the nested scroll options.
   *
   * <p><strong>API Note</strong>:<br>
   * You can set four directions: up, down, left, and right, or set nested scrolling modes for forward and backward directions
   * to achieve scrolling linkage with the parent component.<br>
   * When value is of type NestedScrollOptionsExt (four directions: up, down, left, and right), the default scrolling options
   * for scrollUp, scrollDown, scrollLeft, and scrollRight are NestedScrollMode.SELF_FIRST.<br>
   * When value is of type NestedScrollOptions (two directions: forward and backward), the default scrolling options for scrollForward
   * and scrollBackward are NestedScrollMode.SELF_FIRST.<br>
   * Supported nested scrolling containers: Grid, List, Scroll, Swiper, Tabs, WaterFlow, Refresh, bindSheet.<br>
   * Supported nested scrolling input events: gestures, mouse, and trackpad.<br>
   * In nested scrolling scenarios, since web scrolling to the edge will prioritize triggering the overscroll bounce effect,
   * it is recommended to set overScrollMode to OverScrollMode.NEVER to avoid affecting the user experience in this scenario.
   * </p>
   *
   * @param { NestedScrollOptions | NestedScrollOptionsExt } value - options for
   *     nested scrolling.
   * @returns { WebAttribute } the attribute of the scroll.
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  nestedScroll(value: NestedScrollOptions | NestedScrollOptionsExt): WebAttribute;

  /**
   * Sets whether to enable the same-layer rendering feature.
   *
   * <p><strong>API Note</strong>:
   * <strong>Performance Note</strong>:
   * <p>For details about how to rendering native components on the Web using same-layer rendering,
   * see [Rendering Native Components on the Web Using Same-Layer Rendering]{@link https://developer.huawei.com/consumer/en/doc/best-practices/bpta-render-web-using-same-layer-render}
   * </p>
   *
   * @param { boolean } enabled - Whether to enable the same-layer rendering feature.
   *    The value true means to enable the same-layer rendering feature, and false means the opposite.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  enableNativeEmbedMode(enabled: boolean): WebAttribute;

  /**
   * Registers the HTML tag name and type for same-layer rendering.
   * The tag name only supports object and embed.
   * The tag type only supports visible ASCII characters.<br>
   * If the specified type is the same as the W3C standard object or embed type,
   * the ArkWeb kernel identifies the type as a non-same-layer tag.<br>
   * This API is also controlled by the enableNativeEmbedMode API and
   * does not take effect if same-layer rendering is not enabled. When this API is not used,
   * the ArkWeb kernel recognizes the embed tags with the "native/" prefix as same-layer tags.
   *
   * @param { string } tag - Tag name.
   * @param { string } type - Type of the tag, The kernel matches this parameter with a prefix.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  registerNativeEmbedRule(tag: string, type:string): WebAttribute;

  /**
   * Triggered when embed lifecycle changes.
   *
   * <p><strong>API Note</strong>:
   * <strong>Performance Note</strong>:
   * <p>For details about how to rendering native components on the Web using same-layer rendering,
   * see [Rendering Native Components on the Web Using Same-Layer Rendering]{@link https://developer.huawei.com/consumer/en/doc/best-practices/bpta-render-web-using-same-layer-render}
   * </p>
   *
   * @param { function } callback - Function Triggered when embed lifecycle changes.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  onNativeEmbedLifecycleChange(callback: (event: NativeEmbedDataInfo) => void): WebAttribute;

  /**
   * Called when the visibility of a same-layer tag (such as an embed tag or an object tag) on a web page changes in the viewport.
   * By default, the same-layer tag is invisible. If the rendering tag is visible when you access the page for the first time,
   * the callback is triggered; otherwise, it is not triggered. That is, if the same-layer tag changes from a non-zero value to 0 x 0,
   * the callback is triggered. If the rendering tag size changes from 0 x 0 to a non-zero value, the callback is not triggered.
   * If all the same-layer tags are invisible, they are reported as invisible. If all the same-layer rendering tags or part of them are visible,
   * they are reported as invisible.
   *
   * @param { OnNativeEmbedVisibilityChangeCallback } callback - Callback invoked when the visibility of a same-layer tag changes.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 12 dynamic
   */
  onNativeEmbedVisibilityChange(callback: OnNativeEmbedVisibilityChangeCallback): WebAttribute;

  /**
   * Triggered when gesture effect on embed tag.
   *
   * <p><strong>API Note</strong>:
   * <strong>Performance Note</strong>:
   * <p>For details about how to rendering native components on the Web using same-layer rendering,
   * see [Rendering Native Components on the Web Using Same-Layer Rendering]{@link https://developer.huawei.com/consumer/en/doc/best-practices/bpta-render-web-using-same-layer-render}
   * </p>
   *
   * @param { function } callback - Function Triggered when gesture effect on embed tag.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  onNativeEmbedGestureEvent(callback: (event: NativeEmbedTouchInfo) => void): WebAttribute;

  /**
   * Triggered when mouse effect on embed tag.
   *
   * @param { MouseInfoCallback } callback - callback triggered when mouse effect on embed tag.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  onNativeEmbedMouseEvent(callback: MouseInfoCallback): WebAttribute;

  /**
   * Called to set copy option
   *
   * @param { CopyOptions } value - copy option.The default value is CopyOptions.LocalDevice.
   * @returns { WebAttribute } the attribute of the scroll.
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 11 dynamic
   */
  copyOptions(value: CopyOptions): WebAttribute;

  /**
   * When the URL is about to be loaded into the current Web, it gives the application the opportunity to take control.
   * This will not called for POST requests, may be called for subframes and with non-HTTP(S) schemes.
   *
   * @param { OnOverrideUrlLoadingCallback } callback - The callback for onOverrideUrlLoading.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * When the URL is about to be loaded into the current Web, it gives the application the opportunity to take control.
   * This will not called for POST requests, may be called for subframes and with non-HTTP(S) schemes.
   *
   * @param { OnOverrideUrlLoadingCallback } callback - The callback for onOverrideUrlLoading.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  onOverrideUrlLoading(callback: OnOverrideUrlLoadingCallback): WebAttribute;

  /**
   * Triggered when the web page's document resource error.
   * <p><strong>API Note</strong>:<br>
   * This only triggered for main frame.
   * </p>
   *
   * @param { OnOverrideErrorPageCallback } callback The triggered function when the
   *                                        web page's document resource error.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  onOverrideErrorPage(callback: OnOverrideErrorPageCallback): WebAttribute;

  /**
   * Sets whether automatic text resizing is enabled.
   * After the automatic text font size adjustment takes effect,
   * the font size will be automatically increased to 16px~32px
   * for text with too small font size to avoid the readability problem of
   * small fonts due to the lack of mobile adaptation for devices with small screens (default viewport width < 980px).
   *
   * <p><strong>API Note</strong>:<br>
   * Prerequisites for the automatic adjustment of text font size to take effect:
   * 1.The device forms are: Phone, Tablet, Wearable, TV.
   * 2.Web component viewport width < 980px.
   * 3.The page text is large, and the font size * number of characters of the page text is ≥ 3920.
   * 4.There is no metaViewport setting on the frontend, or no "width" and "initial-scale" attributes in the metaViewport setting.
   *
   * @param { boolean } textAutosizing - Whether automatic text resizing is enabled.
   *    {@code true} means enable text autosizing;
   *    {@code false} means disable text autosizing.
   *    Default value: true.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  textAutosizing(textAutosizing: boolean): WebAttribute;

  /**
   * Enable the application takeover of web media playback feature.
   *
   * @param { NativeMediaPlayerConfig } config - The configuration of native media player.
   *    enable: whether to enable the feature, shouldOverlay: whether the image of the video player
   *    taken over by the application will overlay the web page content, if this feature is enabled.
   *    Default value: {enable: false, shouldOverlay: false}.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  enableNativeMediaPlayer(config: NativeMediaPlayerConfig): WebAttribute;

  /**
   * Triggered when render process not responding.
   * If the Web component can't handle the input event, or can't navigate to the new URL within a reasonable time range,
   * the Web page process is considered unresponsive and the callback will be triggered.
   * As long as the web process has been unresponsive, this callback may continue to trigger until
   * the web process responds again, at which time {@link onRenderProcessResponding} will trigger.
   * Applications can terminate the associated rendering process through the WebviewController interface {@link terminateRenderProcess},
   * which may affect other Web components in the same rendering process.
   * @param { OnRenderProcessNotRespondingCallback } callback The triggered function when render process not responding.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 12 dynamic
   */
  onRenderProcessNotResponding(callback: OnRenderProcessNotRespondingCallback): WebAttribute;

  /**
   * This callback function is triggered when the rendering process changes from unresponsive state to normal operation state,
   * which indicates that the webpage is not really stuck.
   *
   * @param { OnRenderProcessRespondingCallback } callback The triggered function when the unresponsive render process becomes responsive.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 12 dynamic
   */
  onRenderProcessResponding(callback: OnRenderProcessRespondingCallback): WebAttribute;

  /**
   * Set the custom text menu.
   * The Web component custom menu extension item interface allows users to set the extension item's text content, icon, and callback method.
   *
   * <p><strong>API Note</strong>:<br>
   * This interface only supports selecting plain text. When the selected content contains images and other non-text content,
   * garbled characters will be displayed in the action information.
   * </p>
   *
   * @param { Array<ExpandedMenuItemOptions> } expandedMenuOptions - Customize text menu options.
   *                                                                 The number of menu items, the content size of the menu, and the startIcon
   *                                                                 icon size are consistent with the ArkUI Menu component.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 12 dynamiconly
   * @deprecated since 20
   * @useinstead ohos.web.WebAttribute#editMenuOptions
   */
  selectionMenuOptions(expandedMenuOptions: Array<ExpandedMenuItemOptions>): WebAttribute;

  /**
   * Called when the viewport-fit configuration in the web page's <meta> tag changes.
   * The application can adapt its layout to the viewport within this callback.
   *
   * @param { OnViewportFitChangedCallback } callback - Callback invoked when the viewport-fit configuration in the web page's <meta> tag changes.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  onViewportFitChanged(callback: OnViewportFitChangedCallback): WebAttribute;

  /**
   * Editable elements (such as input labels) in web pages will call back to this interface before pulling up
   * the soft keyboard. Applications can use this interface to intercept the pop-up of the system soft keyboard
   * and configure the application-customized soft keyboard (according to this interface,
   * the application can decide to use the system default soft keyboard/the system soft keyboard with
   * the enter key customized/all the soft keyboards customized by the application).
   *
   * @param { WebKeyboardCallback } callback - The callback for onInterceptKeyboardAttach.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  onInterceptKeyboardAttach(callback: WebKeyboardCallback): WebAttribute;

  /**
   * Called when received Ads blocked results.
   * If blocked results exist at the end of page loading, the first call will be triggered.
   * To avoid performance issues, subsequent results will be periodically reported through this api.
   *
   * @param { OnAdsBlockedCallback } callback - The callback for OnAdsBlockedCallback.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  onAdsBlocked(callback: OnAdsBlockedCallback): WebAttribute;

  /**
   * When the keyboard avoidance mode set by UIContext is {@link KeyboardAvoidMode.RESIZE} mode,
   * the interface function will not take effect.
   * @param { WebKeyboardAvoidMode } mode - The web keyboard avoid mode, which can be {@link WebKeyboardAvoidMode}.
   *                                        Web soft keyboard avoidance is not recommended in nested scrolling scenes,
   *                                        including RESIZE_VISUAL and RESIZE_CONTENT.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  keyboardAvoidMode(mode: WebKeyboardAvoidMode): WebAttribute;

  /**
   * Set the custom text menu.
   *
   * <p><strong>API Note</strong>:<br>
   * The onCreateMenu interface is used to modify, add, and delete menu options.If you want to hide the text menu,
   * you need to return an empty array.<br>
   * The onMenuItemClick interface allows you to define the callback function for menu options.This function is
   * triggered when a menu option is clicked, and it determines whether to execute the system's default callback
   * based on the return value. Returning true prevents the system callback from executing, while returning false
   * continues with the system callback.<br>
   * The editMenuOptions interface makes the selectionMenuOptions (deprecated) not work when used at the same time.
   * </p>
   *
   * @param { EditMenuOptions } editMenu - Customize text menu options.
   *                                       The number of menu items, as well as the content size and icon size of the menu,
   *                                       should be consistent with the ArkUI Menu component.
   *                                       The system-provided id enumeration values (TextMenuItemId) in the menu are only
   *                                       supported for CUT, COPY, PASTE, SELECT_ALL, TRANSLATE, SEARCH and some AI menu in the web.
   *                                       The textRange parameter in the onMenuItemClick function is meaningless in the web,
   *                                       and the input value is -1.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 12 dynamic
   */
  editMenuOptions(editMenu: EditMenuOptions): WebAttribute;

  /**
   * Enable or disable haptic feedback.
   *
   * <p><strong>API Note</strong>:<br>
   * Permissions need to be configured: ohos.permission.VIBRATE.
   * </p>
   *
   * @param { boolean } enabled - Default value is true, set false to disable haptic feedback.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 13 dynamic
   */
  enableHapticFeedback(enabled: boolean): WebAttribute;

  /**
   * Bind to the selection menu.
   *
   * @param { WebElementType } elementType - Indicates the type of selection menu.
   * @param { CustomBuilder } content - Indicates the content of selection menu.
   * @param { WebResponseType } responseType - Indicates response type of selection menu.
   * @param { SelectionMenuOptionsExt } [options] - Indicates the options of selection menu.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 13 dynamic
   */
  bindSelectionMenu(elementType: WebElementType, content: CustomBuilder, responseType: WebResponseType,
      options?: SelectionMenuOptionsExt): WebAttribute;

  /**
   * Sets whether to follow the system font weight.
   *
   * @param { boolean } follow The value true means to follow the system font weight, and false means the opposite.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 18 dynamic
   */
  enableFollowSystemFontWeight(follow: boolean): WebAttribute;

  /**
   * Sets whether to enable AVSession for web pages.
   *
   * @param { boolean } enabled Whether to enable AVSession. The value true means to enable AVSession, and false means the opposite.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 18 dynamic
   */
  enableWebAVSession(enabled: boolean): WebAttribute;

  /**
   * Sets whether to optimize parser budget to reduce FCP time
   *
   * @param { boolean} optimizeParserBudget Default value is false, set true to enable optimize parser budget.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 15 dynamic
   */
  optimizeParserBudget(optimizeParserBudget: boolean): WebAttribute;

  /**
   * Injects the JavaScripts that will be run just after document object has been created.
   *
   * @param { Array<ScriptItem> } scripts - The JavaScripts executed in array order.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 15 dynamic
   */
  runJavaScriptOnDocumentStart(scripts: Array<ScriptItem>): WebAttribute;

  /**
   * Injects the JavaScripts that will be run after document has been parsed finished.
   *
   * @param { Array<ScriptItem> } scripts - The JavaScripts executed in array order.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 15 dynamic
   */
  runJavaScriptOnDocumentEnd(scripts: Array<ScriptItem>): WebAttribute;

  /**
   * Injects the JavaScripts that will be run after head element has been parsed finished.
   *
   * @param { Array<ScriptItem> } scripts - The JavaScripts executed in array order.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 15 dynamic
   */
  runJavaScriptOnHeadEnd(scripts: Array<ScriptItem>): WebAttribute;

  /**
   * Sets the embed options, only valid when enableNativeEmbedMode is true.
   *
   * @param { EmbedOptions } options The embed options, which can be {@link EmbedOptions}.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 16 dynamic
   */
  nativeEmbedOptions(options?: EmbedOptions): WebAttribute;

  /**
   * Enable data detector.
   *
   * @param { boolean } enable - {@code true} means enable data detector in Web;{@code false} otherwise.
   *    The default value is false.
   * @returns { WebAttribute } The attribute of the web.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  enableDataDetector(enable: boolean): WebAttribute;

  /**
   * Data detector with config.
   *
   * @param { TextDataDetectorConfig } config - The config of text data detector.
   * @returns { WebAttribute } The attribute of the web.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  dataDetectorConfig(config: TextDataDetectorConfig): WebAttribute;

  /**
   * Triggered when the web page is activated for window.open called by other web component.
   *
   * @param { Callback<void> } callback the triggered function when the web page is activated for window.open called by other web component.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  onActivateContent(callback: Callback<void>): WebAttribute;

  /**
   * Set up a condition that bypass vsync
   * If the condition is matched, the drawing schedule does not reply on Vsync scheduling
   * and directly rendering and drawing
   *
   * @param { WebBypassVsyncCondition } condition - The condition to bypass render vsync.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  bypassVsyncCondition(condition: WebBypassVsyncCondition): WebAttribute;

  /**
   * Set the gesture focus acquisition mode.
   * When users interact with the web using different gestures,
   * this determines whether and when focus is acquired based on the configured mode.
   * Default value: DEFAULT, where all gestures acquire focus on touch down.
   *
   * @param { GestureFocusMode } mode - The gesture focus mode, which can be {@link GestureFocusMode}.
   *    The default value is FocusMode.DEFAULT.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  gestureFocusMode(mode: GestureFocusMode): WebAttribute;

  /**
   * Set whether to comply with the zoom restrictions set by the<meta name="viewport">tag in the webpage.
   *
   * @param { boolean } enable {@code true} means the Web will not comply with the zoom restrictions
   *     set by the<meta name="viewport">tag on the webpage; {@code false} otherwise.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 21 dynamic
   */
  forceEnableZoom(enable: boolean): WebAttribute;

  /**
   * Triggered when the param element which is a child item of the object element has changed.
   *
   * @param { OnNativeEmbedObjectParamChangeCallback } callback - callback Triggered when the param element has changed.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 21 dynamic
   */
  onNativeEmbedObjectParamChange(callback: OnNativeEmbedObjectParamChangeCallback): WebAttribute;

  /**
   * Set up the effect of web rotation
   *
   * @param { WebRotateEffect } effect - The effect of rotation.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  rotateRenderEffect(effect: WebRotateEffect): WebAttribute;

  /**
   * Sets whether the Web supports zooming using Ctrl.
   *
   * @param { boolean } zoomControlAccess - {@code true} means the Web supports zooming using Ctrl,
   *    {@code false} otherwise.
   *    The default value is true.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  zoomControlAccess(zoomControlAccess: boolean): WebAttribute;

  /**
   * Triggered when web engine detects the current page is blank screen or nearly blank.
   *
   * @param { OnDetectBlankScreenCallback } callback - callback triggered when web engine detects
   *     current page is blank or nearly blank.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  onDetectedBlankScreen(callback: OnDetectBlankScreenCallback): WebAttribute;

  /**
   * The options for blank screen detection.
   *
   * @param { BlankScreenDetectionConfig } detectConfig - the strategy config for detection.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  blankScreenDetectionConfig(detectConfig: BlankScreenDetectionConfig): WebAttribute;

  /**
   * Set whether to enable the back-to-top feature for web component when the status bar is touched.
   *
   * @param { boolean } backToTop {@code true} means enable the back-to-top feature,
   *     when the status bar is touched. {@code false} otherwise. The default value is true.
   *     True when passing in undefined and null.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  backToTop(backToTop: boolean): WebAttribute;

  /**
   * Enable selected data detector.
   *
   * @param { boolean } enable - whether to enable the selected data detector.
   *     {@code true} means enable all select data detector in Web;{@code false} otherwise.
   *     The default value is true.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  enableSelectedDataDetector(enable: boolean): WebAttribute

  /**
   * Triggered after the first screen of the web page has been painted.
   * The first screen contains the images, videos and texts in the viewport of the current navigation.
   * The callback will not be triggered immediately when the first screen has been painted,
   * but in a few seconds according to the current network condition.
   * However, if the user scrolls or inputs before the first screen has been painted,
   * the callback will be triggered immediately.
   *
   * @param { OnFirstScreenPaintCallback } callback - callback triggered to
   *     report the info for the first screen painting of the current web page.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  onFirstScreenPaint(callback: OnFirstScreenPaintCallback): WebAttribute

  /**
   * Sets whether enable auto fill or not.
   *
   * @param { boolean } value - Indicates the flag whether autofill is enabled.
   *      Default value is true.true: enable, false: disable.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  enableAutoFill(value: boolean): WebAttribute;

  /**
   * Called when the text selection changes.
   *
   * @param { TextSelectionChangeCallback } callback - when the text selection changes.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  onTextSelectionChange(callback: TextSelectionChangeCallback): WebAttribute;

  /**
   * Set up web component to support AI image recognition capability.
   *
   * @param { boolean } enable - {@code true} means the Web AI image recognition capability,
   *    {@code false} otherwise.
   *    The default value is true.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  enableImageAnalyzer(enable: boolean): WebAttribute;

  /**
   *  Triggered after camera capture state changed.
   *
   * @param { OnCameraCaptureStateChangeCallback } callback -  Callback triggered to
   *    report current page camera capture state changing event.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  onCameraCaptureStateChange(callback: OnCameraCaptureStateChangeCallback): WebAttribute;

  /**
   *  Triggered after microphone capture state changed.
   *
   * @param { OnMicrophoneCaptureStateChangeCallback } callback -  callback triggered to
   *    report current page microphone capture state changing event.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  onMicrophoneCaptureStateChange(callback: OnMicrophoneCaptureStateChangeCallback): WebAttribute;

  /**
   * Set whether to enable the default right-click context menu.
   *
   * @param { boolean } enable - {@code true} means the Web enable the default right-click context menu,
   *    {@code false} otherwise.
   *    The default value is false.
   * @returns { WebAttribute }
   * @syscap SystemCapability.Web.Webview.Core
   * @stagemodelonly
   * @since 24 dynamic
   */
  enableDefaultContextMenu(enable: boolean): WebAttribute;

  /**
  * Set the WebKeyboardAppearanceMode to determine the immersive mode for the soft keyboard.
  *
  * @param { WebKeyboardAppearanceMode } mode - The WebKeyboardAppearanceMode of this web
  * @returns { WebAttribute }
  * @syscap SystemCapability.Web.Webview.Core
  * @stagemodelonly
  * @since 26.0.0 dynamic
  */
  keyboardAppearance(mode: WebKeyboardAppearanceMode): WebAttribute;
}

/**
 * Defines Web Component.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 8
 */
/**
 * Defines Web Component.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @since 10
 */
/**
 * Defines Web Component.
 *
 * <p><strong>API Note</strong>:
 *
 * <strong>Performance Note</strong>:
 * <p>For details about how to optimize the compilation, resource loading, and JSBridge performance,
 * see [Optimizing Web Page Loading]{@link https://developer.huawei.com/consumer/en/doc/best-practices/bpta-web-develop-optimization}
 * <p>When the white screen duration is long due to complex web page parsing,
 * you can enable [optimizeParserBudget]{@link WebAttribute.optimizeParserBudget} to reduce the first frame rendering content.</p>
 * </p>
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare const Web: WebInterface;

/**
 * Defines Web Component instance.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @since 8
 */
/**
 * Defines Web Component instance.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 11 dynamic
 */
declare const WebInstance: WebAttribute;

/**
 * Defines the ssl error event.
 *
 * @typedef SslErrorEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12
 */
/**
 * Defines the ssl error event.
 *
 * @typedef SslErrorEvent
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @atomicservice
 * @since 23 dynamic
 */
declare interface SslErrorEvent {
  /**
   * Notifies the user of the operation behavior of the web component.
   *
   * @type { SslErrorHandler }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * Notifies the user of the operation behavior of the web component.
   *
   * @type { SslErrorHandler }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  handler: SslErrorHandler;

  /**
   * Error codes.
   *
   * @type { SslError }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * Error codes.
   *
   * @type { SslError }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  error: SslError;

  /**
   * Request url.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * Request url.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  url: string;

  /**
   * Original url.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * Original url.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  originalUrl: string;

  /**
   * Referrer.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * Referrer.
   *
   * @type { string }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  referrer: string;

  /**
   * Whether the error is fatal.
   *
   * @type { boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamic
   */
  isFatalError: boolean;

  /**
   * Whether the request is main frame.
   *
   * @type { boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12
   */
  /**
   * Whether the request is main frame.
   *
   * @type { boolean }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @atomicservice
   * @since 23 dynamic
   */
  isMainFrame: boolean;

  /**
   * Certificate chain data in DER format.
   *
   * @type { ?Array<Uint8Array> }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20
   */
  /**
   * Certificate chain data in DER format.
   *
   * @type { ?Array<Uint8Array> }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @since 23 dynamic
   */
  certChainData?: Array<Uint8Array>;
}

/**
 * Defines the event for PIN verification.
 *
 * @syscap SystemCapability.Web.Webview.Core
 * @since 22 dynamic
 */
declare interface VerifyPinEvent {
  /**
   * Handle the result of PIN verification.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  handler: VerifyPinHandler;
  /**
   * The identity of the Credential.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  identity: string;
}

/**
 * Defines the menu item option.
 *
 * @interface ExpandedMenuItemOptions
 * @syscap SystemCapability.Web.Webview.Core
 * @atomicservice
 * @since 12 dynamiconly
 * @deprecated since 20
 * @useinstead EditMenuOptions
 */
declare interface ExpandedMenuItemOptions {
  /**
   * Customize what the menu displays.
   *
   * @type { ResourceStr }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamiconly
   * @deprecated since 20
   * @useinstead EditMenuOptions
   */
  content: ResourceStr;

  /**
   * Customize the icon before the menu displays content.
   *
   * @type { ?ResourceStr }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamiconly
   * @deprecated since 20
   * @useinstead EditMenuOptions
   */
  startIcon?: ResourceStr;

  /**
   * Get the selected text information.
   *
   * @type { function }
   * @syscap SystemCapability.Web.Webview.Core
   * @atomicservice
   * @since 12 dynamiconly
   * @deprecated since 20
   * @useinstead EditMenuOptions
   */
  action: (selectedText: {plainText: string}) => void;
}

/**
 * Define nested scroll options
 *
 * @interface NestedScrollOptionsExt
 * @syscap SystemCapability.Web.Webview.Core
 * @since 14
 */
/**
 * Define nested scroll options
 *
 * @interface NestedScrollOptionsExt
 * @syscap SystemCapability.Web.Webview.Core
 * @crossplatform
 * @since 23 dynamic
 */
declare interface NestedScrollOptionsExt {
  /**
   * Set NestedScrollMode when the scrollable component scrolls up
   *
   * @type { ?NestedScrollMode }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 14
   */
  /**
   * Set NestedScrollMode when the scrollable component scrolls up
   *
   * @type { ?NestedScrollMode }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @since 23 dynamic
   */
  scrollUp?: NestedScrollMode;

  /**
   * Set NestedScrollMode when the scrollable component scrolls down
   *
   * @type { ?NestedScrollMode }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 14
   */
  /**
   * Set NestedScrollMode when the scrollable component scrolls down
   *
   * @type { ?NestedScrollMode }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @since 23 dynamic
   */
  scrollDown?: NestedScrollMode;

  /**
   * Set NestedScrollMode when the scrollable component scrolls right
   *
   * @type { ?NestedScrollMode }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 14
   */
  /**
   * Set NestedScrollMode when the scrollable component scrolls right
   *
   * @type { ?NestedScrollMode }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @since 23 dynamic
   */
  scrollRight?: NestedScrollMode;

  /**
   * Set NestedScrollMode when the scrollable component scrolls left
   *
   * @type { ?NestedScrollMode }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 14
   */
  /**
   * Set NestedScrollMode when the scrollable component scrolls left
   *
   * @type { ?NestedScrollMode }
   * @syscap SystemCapability.Web.Webview.Core
   * @crossplatform
   * @since 23 dynamic
   */
  scrollLeft?: NestedScrollMode;
}

/**
 * Defines the Embed Options.
 *
 * @typedef EmbedOptions
 * @syscap SystemCapability.Web.Webview.Core
 * @since 16 dynamic
 */
declare interface EmbedOptions {
  /**
   * Whether the embed element support the default intrinsic size of 300 * 150, expressed in CSS pixels.
   * <br>When CSS size is set, the embed element size is CSS size, otherwise it is intrinsic size.
   * <br>If true, then the intrinsic size is 300 * 150.
   * <br>If false, the embed element will not be rendered when the CSS size is not set.
   *
   * @type { ?boolean }
   * @default false
   * @syscap SystemCapability.Web.Webview.Core
   * @since 16 dynamic
   */
  supportDefaultIntrinsicSize?: boolean;

  /**
   * Whether the {@link onNativeEmbedVisibilityChange} event supports display-related attributes
   * of the embed element.
   * <br>Default value is false. If true, the changes of the display-related attributes of the
   * embed element will be reported through the {@link onNativeEmbedVisibilityChange} event.
   *
   * @type { ?boolean }
   * @default false
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  supportCssDisplayChange?: boolean;
}

/**
 * Enum type supplied to {@link gestureFocusMode} for setting the web gesture focus mode.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @since 20 dynamic
 */
declare enum GestureFocusMode {
  /**
   * Any action on a web component, such as tapping, long-pressing, scrolling, zooming, etc.,
   * will cause the web component to acquire focus on touch down.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  DEFAULT = 0,

  /**
   * Tap and long-press gestures will cause the web component to acquire focus after touch up,
   * while gestures such as scrolling, zooming, etc., do not request focus.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 20 dynamic
   */
  GESTURE_TAP_AND_LONG_PRESS = 1
}

/**
* Define file selection type.
*
* @typedef AcceptableFileType
* @syscap SystemCapability.Web.Webview.Core
* @since 23 dynamic
*/
declare interface AcceptableFileType {
  /**
    * A annotated file type identifier used to describe the format and content type of a file.
    *
    * @type { string }
    * @syscap SystemCapability.Web.Webview.Core
    * @since 23 dynamic
    */
  mimeType: string;

  /**
    * Array of file types accepted by web pages.
    *
    * @type { Array<string> }
    * @syscap SystemCapability.Web.Webview.Core
    * @since 23 dynamic
    */
  acceptableType: Array<string>;
}

/**
 * Enum type supplied to {@link PinVerifyResult} when VerifyPinHandler#confirm being called.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @since 22 dynamic
 */
declare enum PinVerifyResult {
  /**
   * SUCCESS.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  PIN_VERIFICATION_SUCCESS = 0,
  /**
   * FAILED.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  PIN_VERIFICATION_FAILED = 1
}

/**
 * Enum type supplied to {@link CredentialType} when ClientAuthenticationHandler#confirm being called.
 *
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @since 22 dynamic
 */
declare enum CredentialType {
  /**
   * User credential.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  CREDENTIAL_USER = 2,
  /**
   * Application-specific credential.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  CREDENTIAL_APP = 3,
  /**
   * Hardware security key credential.
   *
   * @syscap SystemCapability.Web.Webview.Core
   * @since 22 dynamic
   */
  CREDENTIAL_UKEY = 4,
}
/**
 * Defines the camera capture state change info.
 *
 * @typedef CameraCaptureStateChangeInfo
 * @syscap SystemCapability.Web.Webview.Core
 * @since 23 dynamic
 */
declare interface CameraCaptureStateChangeInfo {
  /**
   * The original camera capture state.
   *
   * @type { CameraCaptureState }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  originalState: CameraCaptureState;

  /**
   * The new camera capture state.
   *
   * @type { CameraCaptureState }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  newState: CameraCaptureState;
}

/**
 * Indicates current camera capture state of current web page.
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @since 23 dynamic
 */
declare enum CameraCaptureState {
  /**
   * None of any cameras are in use.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  NONE = 0,
  /**
   * This web page is not actively using camera capturing.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  PAUSED = 1,
  /**
   * This web page is actively using camera capturing.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  ACTIVE = 2,
}

/**
 * Defines the microphone capture state change info.
 *
 * @typedef MicrophoneCaptureStateChangeInfo
 * @syscap SystemCapability.Web.Webview.Core
 * @since 23 dynamic
 */
declare interface MicrophoneCaptureStateChangeInfo {
  /**
   * the original microphone capture state.
   * @type { MicrophoneCaptureState}
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  originalState: MicrophoneCaptureState;

  /**
   * the new microphone capture state.
   *
   * @type { MicrophoneCaptureState }
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  newState: MicrophoneCaptureState;
}

/**
 * Indicates current microphone capture state of current web page.
 * @enum { number }
 * @syscap SystemCapability.Web.Webview.Core
 * @since 23 dynamic
 */
declare enum MicrophoneCaptureState {
  /**
   * None of any microphone are in use.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  NONE = 0,
  /**
   * This web page is not actively using microphone capturing.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  PAUSED = 1,
  /**
   * This web page is actively using microphone capturing.
   * @syscap SystemCapability.Web.Webview.Core
   * @since 23 dynamic
   */
  ACTIVE = 2,
}