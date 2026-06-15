/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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
 * @file Defines Repeat component.
 * @kit ArkUI
 */

/**
 * Construct a new type for each item.
 *
 * @interface RepeatItem
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 12 dynamic
 */
interface RepeatItem<T> {
  /**
   * The origin data.
   *
   * @type { T }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 12 dynamic
   */
  item: T,
  /**
   * index of each item.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 12 dynamic
   */
  index: number
}

/**
 * Define the options of repeat virtualScroll to implement reuse and lazy loading.
 *
 * @interface VirtualScrollOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
interface VirtualScrollOptions {
  /**
   * Total data count.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  totalCount?: number;

  /**
   * Reuse or not.
   *
   * @type { ?boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  reusable?: boolean;

  /**
   * Data lazy loading
   *
   * @param { number } index
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  onLazyLoading?(index: number): void;

  /**
   * The function of total data count.
   *
   * @returns { number } Returns the total data count.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 19 dynamic
   */
  onTotalCount?(): number;
}

/**
 * Define a builder template option parameter.
 *
 * @interface TemplateOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
interface TemplateOptions {
  /**
   * The cached number of each template.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  cachedCount?: number
}

/**
 * Function that return typed string to render one template.
 *
 * @typedef {function} TemplateTypedFunc<T>
 * @param { T } item - data item.
 * @param {number} index - data index number in array.
 * @returns { string } template type.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare type TemplateTypedFunc<T> = (item: T, index: number) => string;

/**
 * Define builder function to render one template type.
 *
 * @typedef {function} RepeatItemBuilder<T>
 * @param { RepeatItem<T> } repeatItem - the repeat item builder function.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare type RepeatItemBuilder<T> = (repeatItem: RepeatItem<T>) => void;

/**
 * Defines the Repeat component attribute functions.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 12
 */
/**
 * Defines the Repeat component attribute functions.
 *
 * @extends DynamicNode<RepeatAttribute<T>>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 19 dynamic
 */
declare class RepeatAttribute<T> extends DynamicNode<RepeatAttribute<T>> {
  /**
   * Executes itemGenerator of each item.
   *
   * @param { function } itemGenerator
   * @returns { RepeatAttribute<T> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 12 dynamic
   */
  each(itemGenerator: (repeatItem: RepeatItem<T>) => void): RepeatAttribute<T>;
  /**
   * Obtains key of each item.
   *
   * @param { function } keyGenerator
   * @returns { RepeatAttribute<T> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @form
   * @atomicservice
   * @since 12 dynamic
   */
  key(keyGenerator: (item: T, index: number) => string): RepeatAttribute<T>;
  /**
   * Enable UI lazy loading when scroll up or down.
   *
   * @param { VirtualScrollOptions } virtualScrollOptions that defines the options of repeat virtual scroll to implement reuse and lazy loading.
   * @returns { RepeatAttribute<T> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  virtualScroll(virtualScrollOptions?: VirtualScrollOptions): RepeatAttribute<T>;
  /**
   * Type builder function to render specific type of data item.
   *
   * @param { string } type that defines the template id.
   * @param { RepeatItemBuilder<T> } itemBuilder that defines UI builder function.
   * @param { TemplateOptions } templateOptions that defines a builder template option parameter.
   * @returns { RepeatAttribute<T> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  template(type: string, itemBuilder: RepeatItemBuilder<T>, templateOptions?: TemplateOptions): RepeatAttribute<T>;
  /**
   * Typed function to render specific type of data item.
   *
   * @param { TemplateTypedFunc<T> } typedFunc that define template typed function.
   * @returns { RepeatAttribute<T> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  templateId(typedFunc: TemplateTypedFunc<T>): RepeatAttribute<T>;
}

/**
 * Indicates the type of Repeat's Data Source.
 *
 * @typedef { Array<T> | ReadonlyArray<T> | Readonly<Array<T>> }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 18 dynamic
 */
declare type RepeatArray<T> = Array<T> | ReadonlyArray<T> | Readonly<Array<T>>;

/**
 * Indicates the type of Repeat.
 *
 * @typedef { function } RepeatInterface
 * @param { RepeatArray<T> } arr - The Data Source
 * @returns { RepeatAttribute<T> }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 18 dynamic
 */
declare type RepeatInterface = <T>(arr: RepeatArray<T>) => RepeatAttribute<T>;

/**
 * Defines Repeat Component.
 *
 * @type { <T>(arr: Array<T>) => RepeatAttribute<T> }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 12
 */
/**
 * Defines Repeat Component, and Add More Array Type.
 *
 * @type { RepeatInterface }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @form
 * @atomicservice
 * @since 18 dynamic
 */
declare const Repeat: RepeatInterface;
