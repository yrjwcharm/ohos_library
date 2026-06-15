/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
 * AppStorage singleton is sub-class of see LocalStorage for
 * UI state of app-wide access and same life cycle as the app.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @since 7
 */
/**
 * AppStorage singleton is sub-class of see LocalStorage for
 * UI state of app-wide access and same life cycle as the app.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @since 10
 */
/**
 * AppStorage singleton is sub-class of see LocalStorage for
 * UI state of app-wide access and same life cycle as the app.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare class AppStorage {
  /**
   * Obtain a handler or an alias to AppStorage property with given name.
   *
   * @param { string } propName AppStorage property name
   * @returns { AbstractProperty<T> | undefined } AbstractProperty object if property with given name exists
   * return undefined otherwise
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  static ref<T>(propName: string): AbstractProperty<T> | undefined;

  /**
   * Obtain a handler or an alias to AppStorage property with given name.
   *
   * If property does not exist in AppStorage, create it with given default value.
   *
   * @param { string } propName AppStorage property name
   * @param { T } defaultValue If property does not exist in AppStorage,
   *        create it with given default value.
   * @returns { AbstractProperty<T> } AbstractProperty object
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  static setAndRef<T>(propName: string, defaultValue: T): AbstractProperty<T>;

  /**
   * Called when a link is set.
   * Create and return a two-way sync ("link") to named property
   *
   * @param { string } propName
   * @returns { any }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7 dynamiconly
   * @deprecated since 10
   * @useinstead AppStorage#link
   */
  static Link(propName: string): any;

  /**
   * Create and return a two-way sync ("link") to named property
   * Same as @see LocalStorage.link()
   *
   * @param { string } propName - name of source property in AppStorage
   * @returns { SubscribedAbstractProperty<T> } instance of SubscribedAbstractProperty<T>
   *           return 'undefined' if named property does not already exist in AppStorage
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Create and return a two-way sync ("link") to named property
   * Same as @see LocalStorage.link()
   *
   * @param { string } propName - name of source property in AppStorage
   * @returns { SubscribedAbstractProperty<T> } instance of SubscribedAbstractProperty<T>
   *           return 'undefined' if named property does not already exist in AppStorage
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  static link<T>(propName: string): SubscribedAbstractProperty<T>;

  /**
   * Like see @Link(), but will create and initialize a new source property in AppStorage if missing
   * Same as see LocalStorage.setAndLink()
   *
   * @param { string } propName
   * @param { T } defaultValue
   * @returns { SubscribedAbstractProperty<T> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7 dynamiconly
   * @deprecated since 10
   * @useinstead AppStorage#setAndLink
   * @see setAndLink
   */
  static SetAndLink<T>(propName: string, defaultValue: T): SubscribedAbstractProperty<T>;

  /**
   * Like see @link(), but will create and initialize a new source property in AppStorage if missing
   * Same as see LocalStorage.setAndLink()
   *
   * @param { string } propName - name of source property in AppStorage
   * @param { T } defaultValue - value to be used for initializing if new creating new property in AppStorage
   *        default value must be of type T, must not be 'undefined' or 'null'.
   * @returns { SubscribedAbstractProperty<T> } instance of  SubscribedAbstractProperty<T>
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Like see @link(), but will create and initialize a new source property in AppStorage if missing
   * Same as see LocalStorage.setAndLink()
   *
   * @param { string } propName - name of source property in AppStorage
   * @param { T } defaultValue - value to be used for initializing if new creating new property in AppStorage
   *        default value must be of type T, must not be 'undefined' or 'null'.
   * @returns { SubscribedAbstractProperty<T> } instance of  SubscribedAbstractProperty<T>
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Like see @link(), but will create and initialize a new source property in AppStorage if missing
   * Same as see LocalStorage.setAndLink()
   *
   * @param { string } propName - name of source property in AppStorage
   * @param { T } defaultValue - value to be used for initializing new property in AppStorage
   *        default value must be of type T, can be undefined or null.
   * @returns { SubscribedAbstractProperty<T> } instance of  SubscribedAbstractProperty<T>
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  static setAndLink<T>(propName: string, defaultValue: T): SubscribedAbstractProperty<T>;

  /**
   * Called when a property is set.
   * Create and return a one-way sync ('prop') to named property
   *
   * @param { string } propName
   * @returns { any }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7 dynamiconly
   * @deprecated since 10
   * @useinstead AppStorage#prop
   * @see prop
   */
  static Prop(propName: string): any;

  /**
   * Create and return a one-way sync ('prop') to named property
   * Same as @see LocalStorage.prop()
   *
   * @param { string } propName - name of source property in AppStorage
   * @returns { SubscribedAbstractProperty<T> } instance of  SubscribedAbstractProperty<T>
   *           return undefined if named property does not already exist in AppStorage.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Create and return a one-way sync ('prop') to named property
   * Same as @see LocalStorage.prop()
   *
   * @param { string } propName - name of source property in AppStorage
   * @returns { SubscribedAbstractProperty<T> } instance of  SubscribedAbstractProperty<T>
   *           return undefined if named property does not already exist in AppStorage.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  static prop<T>(propName: string): SubscribedAbstractProperty<T>;

  /**
   * Like see Prop(), will create and initialize a new source property in AppStorage if missing
   * Same as see LocalStorage.setAndProp()
   *
   * @param { string } propName
   * @param { S } defaultValue
   * @returns { SubscribedAbstractProperty<S> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7 dynamiconly
   * @deprecated since 10
   * @useinstead AppStorage#setAndProp
   * @see setAndProp
   */
  static SetAndProp<S>(propName: string, defaultValue: S): SubscribedAbstractProperty<S>;

  /**
   *
   * Like @see prop(), will create and initialize a new source property in AppStorage if missing
   * Same as see LocalStorage.setAndProp()
   *
   * @param { string } propName - name of source property in AppStorage
   * @param { T } defaultValue - value to be used for initializing if new creating new property in AppStorage.
   *        default value must be of type T, must not be undefined or null.
   * @returns { SubscribedAbstractProperty<T> } instance of  SubscribedAbstractProperty<T>
   *           return undefined if named property does not already exist in AppStorage.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   *
   * Like @see prop(), will create and initialize a new source property in AppStorage if missing
   * Same as see LocalStorage.setAndProp()
   *
   * @param { string } propName - name of source property in AppStorage
   * @param { T } defaultValue - value to be used for initializing if new creating new property in AppStorage.
   *        default value must be of type T, must not be undefined or null.
   * @returns { SubscribedAbstractProperty<T> } instance of  SubscribedAbstractProperty<T>
   *           return undefined if named property does not already exist in AppStorage.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   *
   * Like @see prop(), will create and initialize a new source property in AppStorage if missing
   * Same as see LocalStorage.setAndProp()
   *
   * @param { string } propName - name of source property in AppStorage
   * @param { T } defaultValue - value to be used for initializing new property in AppStorage.
   *        default value must be of type T, can be undefined or null.
   * @returns { SubscribedAbstractProperty<T> } instance of  SubscribedAbstractProperty<T>
   *           return undefined if named property does not exist in AppStorage.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  static setAndProp<T>(propName: string, defaultValue: T): SubscribedAbstractProperty<T>;

  /**
   * Checks if AppStorage has a property with given name
   * returns true if property with given name exists
   * same as ES6 Map.prototype.has()
   * Same as see LocalStorage.has()
   *
   * @param { string } propName
   * @returns { boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7 dynamiconly
   * @deprecated since 10
   * @useinstead AppStorage#has
   * @see has
   */
  static Has(propName: string): boolean;

  /**
   * Checks if AppStorage has a property with given name
   * returns true if property with given name exists
   * same as ES6 Map.prototype.has()
   * Same as see LocalStorage.has()
   *
   * @param { string } propName - searched property
   * @returns { boolean } true if property with such name exists in AppStorage
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Checks if AppStorage has a property with given name
   * returns true if property with given name exists
   * same as ES6 Map.prototype.has()
   * Same as see LocalStorage.has()
   *
   * @param { string } propName - searched property
   * @returns { boolean } true if property with such name exists in AppStorage
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  static has(propName: string): boolean;

  /**
   * Same as see LocalStorage.get()
   * Obtain the value of property with given name, returns undefined if the property does not exist in AppStorage.
   *
   * @param { string } propName
   * @returns { T | undefined }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7 dynamiconly
   * @deprecated since 10
   * @useinstead AppStorage#get
   * @see get
   */
  static Get<T>(propName: string): T | undefined;

  /**
   * Same as see LocalStorage.get()
   * Obtain the value of property with given name, returns undefined if the property does not exist in AppStorage.
   *
   * @param { string } propName
   * @returns { T | undefined } property value of type T if found or undefined
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Same as see LocalStorage.get()
   * Obtain the value of property with given name, returns undefined if the property does not exist in AppStorage.
   *
   * @param { string } propName
   * @returns { T | undefined } property value of type T if found or undefined
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  static get<T>(propName: string): T | undefined;

  /**
   * Set value of given property in AppStorage
   * Method sets nothing and returns false if property with this name does not exist
   * or if newValue is `undefined` or `null`.
   * Same as see LocalStorage.set()
   *
   * @param { string } propName
   * @param { T } newValue
   * @returns { boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7 dynamiconly
   * @deprecated since 10
   * @useinstead AppStorage#set
   * @see set
   */
  static Set<T>(propName: string, newValue: T): boolean;

  /**
   * Set value of given property in AppStorage
   * Method sets nothing and returns false if property with this name does not exist
   * or if newValue is `undefined` or `null`.
   * Same as see LocalStorage.set()
   *
   * @param { string } propName
   * @param { T } newValue - must be of type T and must not be undefined or null
   * @returns { boolean } true on success, i.e. when above conditions are satisfied, otherwise false
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set value of given property in AppStorage
   * Method sets nothing and returns false if property with this name does not exist
   * or if newValue is `undefined` or `null`.
   * Same as see LocalStorage.set()
   *
   * @param { string } propName
   * @param { T } newValue - must be of type T and must not be undefined or null
   * @returns { boolean } true on success, i.e. when above conditions are satisfied, otherwise false
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Set value of given property in AppStorage
   * Method sets nothing and returns false if property with this name does not exist in AppStorage
   * newValue can be undefined or null from API 12.
   * Same as see LocalStorage.set()
   *
   * @param { string } propName
   * @param { T } newValue - must be of type T, can be undefined or null
   * @returns { boolean } true on success, i.e. when above conditions are satisfied, otherwise false
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  static set<T>(propName: string, newValue: T): boolean;

  /**
   * Set value of given property, if it exists, see set() .
   * Add property if no property with given name in AppStorage,. yet, and initialize with given value.
   * Do nothing if newValue is undefined or null
   * see LocalStorage.setOrCreate()
   *
   * @param { string } propName
   * @param { T } newValue
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7 dynamiconly
   * @deprecated since 10
   * @useinstead AppStorage#setOrCreate
   * @see setOrCreate
   */
  static SetOrCreate<T>(propName: string, newValue: T): void;

  /**
   * Set value of given property, if it exists, see set() .
   * Add property if no property with given name in AppStorage,. yet, and initialize with given value.
   * Do nothing if newValue is undefined or null
   * see LocalStorage.setOrCreate()
   *
   * @param { string } propName
   * @param { T } newValue - must be of type T and must not be undefined or null
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set value of given property, if it exists, see set() .
   * Add property if no property with given name in AppStorage,. yet, and initialize with given value.
   * Do nothing if newValue is undefined or null
   * see LocalStorage.setOrCreate()
   *
   * @param { string } propName
   * @param { T } newValue - must be of type T and must not be undefined or null
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Set value of given property, if it exists, see set() .
   * Add property if no property with given name in AppStorage, and initialize with given value.
   * newValue can be undefined or null from API 12
   * see LocalStorage.setOrCreate()
   *
   * @param { string } propName
   * @param { T } newValue - must be of type T, can be undefined or null
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  static setOrCreate<T>(propName: string, newValue: T): void;

  /**
   * Delete property with given name from AppStorage
   * Use with caution:
   * Before deleting a prop from AppStorage all its subscribers need to
   * unsubscribe from the property.
   * This method fails and returns false if given property still has subscribers
   * Another reason for failing is unknown property name.
   * Developer advise:
   * Subscribers to a property in AppStorage are created with see link(), see prop()
   * and also via @StorageLink and @StorageProp state variable decorators.
   * That means as long as their is a @Component instance that uses such decorated variable
   * or a sync relationship with a SubscribedAbstractProperty variable the property can not
   * (and also should not!) be deleted from AppStorage.
   * Same as see LocalStorage.delete()
   *
   * @param { string } propName
   * @returns { boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7 dynamiconly
   * @deprecated since 10
   * @useinstead AppStorage#delete
   * @see delete
   */
  static Delete(propName: string): boolean;

  /**
   * Delete property with given name from AppStorage
   * Use with caution:
   * Before deleting a prop from AppStorage all its subscribers need to
   * unsubscribe from the property.
   * This method fails and returns false if given property still has subscribers
   * Another reason for failing is unknown property name.
   * Developer advise:
   * Subscribers to a property in AppStorage are created with see link(), see prop()
   * and also via @StorageLink and @StorageProp state variable decorators.
   * That means as long as their is a @Component instance that uses such decorated variable
   * or a sync relationship with a SubscribedAbstractProperty variable the property can not
   * (and also should not!) be deleted from AppStorage.
   * Same as see LocalStorage.delete()
   *
   * @param { string } propName
   * @returns { boolean } false if method failed
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Delete property with given name from AppStorage
   * Use with caution:
   * Before deleting a prop from AppStorage all its subscribers need to
   * unsubscribe from the property.
   * This method fails and returns false if given property still has subscribers
   * Another reason for failing is unknown property name.
   * Developer advise:
   * Subscribers to a property in AppStorage are created with see link(), see prop()
   * and also via @StorageLink and @StorageProp state variable decorators.
   * That means as long as their is a @Component instance that uses such decorated variable
   * or a sync relationship with a SubscribedAbstractProperty variable the property can not
   * (and also should not!) be deleted from AppStorage.
   * Same as see LocalStorage.delete()
   *
   * @param { string } propName
   * @returns { boolean } false if method failed
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  static delete(propName: string): boolean;

  /**
   * Provide names of all properties in AppStorage
   * same as ES6 Map.prototype.keys()
   * Same as see LocalStorage.keys()
   *
   * @returns { IterableIterator<string> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7 dynamiconly
   * @deprecated since 10
   * @useinstead AppStorage#keys
   * @see keys
   */
  static Keys(): IterableIterator<string>;

  /**
   * Provide names of all properties in AppStorage
   * same as ES6 Map.prototype.keys()
   * Same as see LocalStorage.keys()
   *
   * @returns { IterableIterator<string> } return a Map Iterator
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Provide names of all properties in AppStorage
   * same as ES6 Map.prototype.keys()
   * Same as see LocalStorage.keys()
   *
   * @returns { IterableIterator<string> } return a Map Iterator
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  static keys(): IterableIterator<string>;

  /**
   * Called when a cleanup occurs.
   *
   * @returns { boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7 dynamiconly
   * @deprecated since 9
   * @useinstead AppStorage.Clear
   */
  static staticClear(): boolean;

  /**
   * Delete all properties from the AppStorage.
   * Precondition is that there are no subscribers, see Delete().
   *
   * @returns { boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 9 dynamiconly
   * @deprecated since 10
   * @useinstead AppStorage#clear
   * @see clear
   */
  static Clear(): boolean;

  /**
   * Delete all properties from the AppStorage.
   * Precondition is that there are no subscribers, see Delete().
   *
   * @returns { boolean } false and deletes no properties if there is any property
   * that still has subscribers.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Delete all properties from the AppStorage.
   * Precondition is that there are no subscribers, see Delete().
   *
   * @returns { boolean } false and deletes no properties if there is any property
   * that still has subscribers.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  static clear(): boolean;

  /**
   * Called when the data can be changed.
   *
   * @param { string } propName
   * @returns { boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7 dynamiconly
   * @deprecated since 10
   */
  static IsMutable(propName: string): boolean;

  /**
   * Method returns the number of properties currently in AppStorage
   *
   * @returns { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7 dynamiconly
   * @deprecated since 10
   * @useinstead AppStorage#size
   * @see size
   */
  static Size(): number;

  /**
   * Method returns the number of properties currently in AppStorage
   *
   * @returns { number } Returns the number of properties currently in AppStorage
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Method returns the number of properties currently in AppStorage
   *
   * @returns { number } Returns the number of properties currently in AppStorage
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  static size(): number;
}

/**
 *
 *  AbstractProperty can be understood as a handler or an alias
 *  to a property inside LocalStorage / AppStorage singleton
 *  allows to read the value with @see get and to change the
 *  value with @see set.
 *
 * Functions
 *   reads the referenced AppStorage/LocalStorage property value with given name @see get()
 *   write a new value to the AppStorage/LocalStorage property value @see set()
 *   returns the referenced AppStorage/LocalStorage property name @see info()
 *
 * Use ref or setAndRef to obtain a AbstractProperty.
 *
 * @interface AbstractProperty<T>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface AbstractProperty<T> {
  /**
  * reads value of the referenced AppStorage/LocalStorage property.
  *
  * @returns { T } value of the referenced AppStorage/LocalStorage property.
  * @syscap SystemCapability.ArkUI.ArkUI.Full
  * @crossplatform
  * @atomicservice
  * @since 12 dynamic
  */
  get(): T;

  /**
   * Set new value, must be of type T, can be 'undefined' or 'null'.
   * Updates the value of the referenced AppStorage/LocalStorage property.
   *
   * @param { T } newValue new value set to AppStorage/LocalStorage
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  set(newValue: T): void;

  /**
   * returns the name of the referenced property
   *
   * @returns { string } name of the referenced property
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  info(): string;
}

/**
 * Defines the subscribed abstract property.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @FaAndStageModel
 * @since 7
 */
/**
 * SubscribedAbstractProperty<T> is the return value of
 * - AppStorage static functions Link(), Prop(), SetAndLink(), and SetAndProp()
 * - LocalStorage member methods link(), prop(), setAndLink(), and setAndProp()
 * 'T' can be boolean, string, number or custom class.
 * Main functions
 * see get() reads the linked AppStorage/LocalStorage property value,
 * see set(newValue) write a new value to the synched AppStorage/LocalStorage property
 * see aboutToBeDeleted() ends the sync relationship with the AppStorage/LocalStorage property
 * The app must call this function before the SubscribedAbstractProperty<T> object
 * goes out of scope.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @form
 * @since 9
 */
/**
 *   SubscribedAbstractProperty<T> is the return value of
 *   - AppStorage static functions Link(), Prop(), SetAndLink(), and SetAndProp()
 *   - LocalStorage member methods link(), prop(), setAndLink(), and setAndProp()
 *   'T' can be boolean, string, number or custom class.
 * Main functions
 *   see get() reads the linked AppStorage/LocalStorage property value,
 *   see set(newValue) write a new value to the synched AppStorage/LocalStorage property
 *   see aboutToBeDeleted() ends the sync relationship with the AppStorage/LocalStorage property
 *        The app must call this function before the SubscribedAbstractProperty<T> object
 *        goes out of scope.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @form
 * @since 10
 */
/**
 *   SubscribedAbstractProperty<T> is the return value of
 *   - AppStorage static functions Link(), Prop(), SetAndLink(), and SetAndProp()
 *   - LocalStorage member methods link(), prop(), setAndLink(), and setAndProp()
 *   'T' can be boolean, string, number or custom class.
 * Main functions
 *   see get() reads the linked AppStorage/LocalStorage property value,
 *   see set(newValue) write a new value to the synched AppStorage/LocalStorage property
 *   see aboutToBeDeleted() ends the sync relationship with the AppStorage/LocalStorage property
 *        The app must call this function before the SubscribedAbstractProperty<T> object
 *        goes out of scope.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare abstract class SubscribedAbstractProperty<T> {
  /**
   * Setting Subscribers.
   *
   * @type { Set<number> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  protected subscribers_: Set<number>;

  /**
   * Private user ID.
   *
   * @type { any }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  private id_;

  /**
   * Private user information.
   *
   * @type { ?any }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  private info_?;

  /**
   * @param { IPropertySubscriber } subscribeMe
   * @param { string } info
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  constructor(
    /**
     * Subscriber IPropertySubscriber.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @systemapi
     * @since 7
     *
     */
    subscribeMe?: IPropertySubscriber,
    /**
     * Subscriber info.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @systemapi
     * @since 7
     *
     */
    info?: string,
  );

  /**
   * Called when the subscriber ID is entered.
   *
   * @returns { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  id(): number;

  /**
   * Returns the property name,
   * e.g. let link = AppStorage.Link("foo") then link.info() == "foo"
   *
   * @returns { string } the property name if set or undefined
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Returns the property name,
   * e.g. let link = AppStorage.Link("foo") then link.info() == "foo"
   *
   * @returns { string } the property name if set or undefined
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  info(): string;

  /**
   * Reads value of the sync'ed AppStorage/LocalStorage property.
   * `let link : SubscribedAbstractProperty<string> =AppStorage.Link<string>("foo")`
   * then `link.get()` returns the value of "foo" property in AppStorage.
   *
   * @returns { T } the value of the sync'ed AppStorage/LocalStorage property.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Reads value of the sync'ed AppStorage/LocalStorage property.
   * `let link : SubscribedAbstractProperty<string> =AppStorage.Link<string>("foo")`
   * then `link.get()` returns the value of "foo" property in AppStorage.
   *
   * @returns { T } the value of the sync'ed AppStorage/LocalStorage property.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Reads value of the sync'ed AppStorage/LocalStorage property.
   * `let link : SubscribedAbstractProperty<string> =AppStorage.Link<string>("foo")`
   * then `link.get()` returns the value of "foo" property in AppStorage.
   *
   * @returns { T } the value of the sync'ed AppStorage/LocalStorage property.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  abstract get(): T;

  /**
   * Updates the value of value of the sync'ed AppStorage/LocalStorage property.
   * Sets new value, must be of type T, and must not be 'undefined' or 'null'.
   * `let link : SubscribedAbstractProperty<string> =AppStorage.Link<string>("foo")`
   * then `link.set("Hello")` will set the value of "foo" property in AppStorage.
   *
   * @param { T } newValue
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Updates the value of value of the sync'ed AppStorage/LocalStorage property.
   * Sets new value, must be of type T, and must not be 'undefined' or 'null'.
   * `let link : SubscribedAbstractProperty<string> =AppStorage.Link<string>("foo")`
   * then `link.set("Hello")` will set the value of "foo" property in AppStorage.
   *
   * @param { T } newValue
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Updates the value of value of the sync'ed AppStorage/LocalStorage property.
   * Sets new value, must be of type T, and must not be 'undefined' or 'null'.
   * `let link : SubscribedAbstractProperty<string> =AppStorage.Link<string>("foo")`
   * then `link.set("Hello")` will set the value of "foo" property in AppStorage.
   *
   * @param { T } newValue
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
  /**
   * Updates the value of value of the sync'ed AppStorage/LocalStorage property.
   * Sets new value, must be of type T, can be undefined or null.
   * `let link : SubscribedAbstractProperty<string> =AppStorage.Link<string>("foo")`
   * then `link.set("Hello")` will set the value of "foo" property in AppStorage.
   *
   * @param { T } newValue
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 12 dynamic
   */
  abstract set(newValue: T): void;

  /**
   * Called when a two-way synchronization is created.
   *
   * @param { IPropertySubscriber } subscribeMe
   * @param { string } info
   * @returns { SyncedPropertyTwoWay<T> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  createTwoWaySync(subscribeMe?: IPropertySubscriber, info?: string): SyncedPropertyTwoWay<T>;

  /**
   * Called when a one-way synchronization is created.
   *
   * @param { IPropertySubscriber } subscribeMe
   * @param { string } info
   * @returns { SyncedPropertyOneWay<T> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  createOneWaySync(subscribeMe?: IPropertySubscriber, info?: string): SyncedPropertyOneWay<T>;

  /**
   * Called when the subscriber is unlinked.
   *
   * @param { number } subscriberId
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  unlinkSuscriber(subscriberId: number): void;

  /**
   * Called when the notification has changed.
   *
   * @param { T } newValue
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  protected notifyHasChanged(newValue: T): void;

  /**
   * Called when the notification property is read.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  protected notifyPropertyRead(): void;

  /**
   * Called when the number of users is queried.
   *
   * @returns { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  numberOfSubscrbers(): number;

  /**
   * An app needs to call this function before the instance of SubscribedAbstractProperty
   * goes out of scope / is subject to garbage collection. Its purpose is to unregister the
   * variable from the two-way/one-way sync relationship that AppStorage/LocalStorage.link()/prop()
   * and related functions create.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * An app needs to call this function before the instance of SubscribedAbstractProperty
   * goes out of scope / is subject to garbage collection. Its purpose is to unregister the
   * variable from the two-way/one-way sync relationship that AppStorage/LocalStorage.link()/prop()
   * and related functions create.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  abstract aboutToBeDeleted(): void;
}

/**
 * Provides an interface for attribute subscribers.
 *
 * @interface IPropertySubscriber
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @FaAndStageModel
 * @since 7 dynamic
 */
interface IPropertySubscriber {
  /**
   * Called when the ID of the property subscriber is queried.
   *
   * @returns { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  id(): number;

  /**
   * Provides a single attribute change user interface.
   *
   * @param { IPropertySubscriber } owningView
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  aboutToBeDeleted(owningView?: IPropertySubscriber): void;
}

/**
 * Defines the state value.
 *
 * @extends SubscribedAbstractProperty<T>
 * @implements ISinglePropertyChangeSubscriber<T>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @FaAndStageModel
 * @since 7 dynamic
 */
declare class SyncedPropertyTwoWay<T>
  extends SubscribedAbstractProperty<T>
  implements ISinglePropertyChangeSubscriber<T>
{
  /**
   * Sources of synchronization attributes bidirectionally.
   *
   * @type { any }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  private source_;

  /**
   * constructor parameters.
   *
   * @param { SubscribedAbstractProperty<T> } source
   * @param { IPropertySubscriber } subscribeMe
   * @param { string } info
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  constructor(source: SubscribedAbstractProperty<T>, subscribeMe?: IPropertySubscriber, info?: string);

  /**
   * Called when processing information about to be deleted.
   *
   * @param { IPropertySubscriber } unsubscribeMe
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  aboutToBeDeleted(unsubscribeMe?: IPropertySubscriber): void;

  /**
   * Information Changed.
   *
   * @param { T } newValue
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  hasChanged(newValue: T): void;

  /**
   * Called when data is obtained.
   *
   * @returns { T }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  get(): T;

  /**
   * Called when data is created.
   *
   * @param { T } newValue
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  set(newValue: T): void;
}

/**
 * Defines the prop state value.
 *
 * @extends SubscribedAbstractProperty<T>
 * @implements ISinglePropertyChangeSubscriber<T>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @FaAndStageModel
 * @since 7 dynamic
 */
declare class SyncedPropertyOneWay<T>
  extends SubscribedAbstractProperty<T>
  implements ISinglePropertyChangeSubscriber<T>
{
  /**
   * Pack value for single-item binding.
   *
   * @type { any }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  private wrappedValue_;

  /**
   * Sources of synchronization attributes bidirectionally.
   *
   * @type { any }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  private source_;

  /**
   * Constructor parameters.
   *
   * @param { SubscribedAbstractProperty<T> } source
   * @param { IPropertySubscriber } subscribeMe
   * @param { string } info
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  constructor(source: SubscribedAbstractProperty<T>, subscribeMe?: IPropertySubscriber, info?: string);

  /**
   * Called when processing information about to be deleted.
   *
   * @param { IPropertySubscriber } unsubscribeMe
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  aboutToBeDeleted(unsubscribeMe?: IPropertySubscriber): void;

  /**
   * Information Changed.
   *
   * @param { T } newValue
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  hasChanged(newValue: T): void;

  /**
   * Called when data is obtained.
   *
   * @returns { T }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  get(): T;

  /**
   * Called when data is created.
   *
   * @param { T } newValue
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  set(newValue: T): void;
}

/**
 * Defines the subscriber.
 *
 * @extends IPropertySubscriber
 * @interface ISinglePropertyChangeSubscriber
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @FaAndStageModel
 * @since 7 dynamic
 */
interface ISinglePropertyChangeSubscriber<T> extends IPropertySubscriber {
  /**
   * Provides a single attribute change user interface.
   *
   * @param { T } newValue
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  hasChanged(newValue: T): void;
}

/**
 * Defines the Subscribale base class.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @FaAndStageModel
 * @since 7 dynamic
 */
declare abstract class SubscribaleAbstract {
  /**
   * Returns the ownership attribute set by the.
   *
   * @type { Set<number> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  private owningProperties_: Set<number>;

  /**
   * Constructor.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  constructor();

  /**
   * Called when the notification property has changed.
   *
   * @param { string } propName
   * @param { any } newValue
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  protected notifyPropertyHasChanged(propName: string, newValue: any): void;

  /**
   * Called when adding an already owned property.
   *
   * @param { IPropertySubscriber } subscriber
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  public addOwningProperty(subscriber: IPropertySubscriber): void;

  /**
   * Called when an already owned property is deleted.
   *
   * @param { IPropertySubscriber } property
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  public removeOwningProperty(property: IPropertySubscriber): void;

  /**
   * Called when an already owned property is deleted by ID
   *
   * @param { number } subscriberId
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  public removeOwningPropertyById(subscriberId: number): void;
}

/**
 * EnvProps object
 *
 * @interface EnvPropsOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * EnvProps object
 *
 * @interface EnvPropsOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare interface EnvPropsOptions {
  /**
   * Property name of Environment variable
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Property name of Environment variable
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  key: string;

  /**
   * DefaultValue is the default value if cannot get the environment property value
   *
   * @type { number | string | boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * DefaultValue is the default value if cannot get the environment property value
   *
   * @type { number | string | boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  defaultValue: number | string | boolean;
}

/**
 * Defines the Environment interface.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @since 7
 */
/**
 * Defines the Environment interface.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @since 10
 */
/**
 * Defines the Environment interface.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare class Environment {
  /**
   * Constructor.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  constructor();

  /**
   * Called when a property value is added to Environment.
   *
   * @param { string } key
   * @param { S } value
   * @returns { boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7 dynamiconly
   * @deprecated since 10
   * @useinstead Environment#envProp
   */
  static EnvProp<S>(key: string, value: S): boolean;

  /**
   * Creates a new property in AppStorage. The UI framework implementation takes care of updating
   * its value whenever the named device environment property changes. Recommended use is at app startup.
   * The function call fails and returns false if a property with given name exists in AppStorage already.
   * It is wrong API use to access a property with given name in AppStorage before calling Environment.envProp.
   *
   * @param { string } key - environment property
   * @param { S } value - is the default value if cannot get the environment property value
   * @returns { boolean } false if method failed
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Creates a new property in AppStorage. The UI framework implementation takes care of updating
   * its value whenever the named device environment property changes. Recommended use is at app startup.
   * The function call fails and returns false if a property with given name exists in AppStorage already.
   * It is wrong API use to access a property with given name in AppStorage before calling Environment.envProp.
   *
   * @param { string } key - environment property
   * @param { S } value - is the default value if cannot get the environment property value
   * @returns { boolean } false if method failed
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  static envProp<S>(key: string, value: S): boolean;

  /**
   * Called when multiple property values are added to Environment.
   *
   * @param { {key: string;defaultValue: any;}[] } props
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7 dynamiconly
   * @deprecated since 10
   * @useinstead Environment#envProps
   */
  static EnvProps(
    props: {
      key: string;
      defaultValue: any;
    }[],
  ): void;

  /**
   * Called when multiple property values are added to Environment.
   *
   * @param { EnvPropsOptions[] } props
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Called when multiple property values are added to Environment.
   *
   * @param { EnvPropsOptions[] } props
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  static envProps(props: EnvPropsOptions[]): void;

  /**
   * returns an Array<string> of all environment property keys
   *
   * @returns { Array<string> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7 dynamiconly
   * @deprecated since 10
   * @useinstead Environment#keys
   */
  static Keys(): Array<string>;

  /**
   * returns an Array<string> of all environment property keys
   *
   * @returns { Array<string> } all environment property keys
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * returns an Array<string> of all environment property keys
   *
   * @returns { Array<string> } all environment property keys
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  static keys(): Array<string>;
}

/**
 * PersistProps object
 *
 * @interface PersistPropsOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * PersistProps object
 *
 * @interface PersistPropsOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare interface PersistPropsOptions {
  /**
   * Property name
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Property name
   *
   * @type { string }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  key: string;

  /**
   * If AppStorage does not include this property it will be initialized with this value
   *
   * @type { number | string | boolean | Object }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * If AppStorage does not include this property it will be initialized with this value
   *
   * @type { number | string | boolean | Object }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  defaultValue: number | string | boolean | Object;
}

/**
 * Defines the PersistentStorage interface.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @since 7
 */
/**
 * Defines the PersistentStorage interface.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @since 10
 */
/**
 * Defines the PersistentStorage interface.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare class PersistentStorage {
  /**
   * Constructor parameters.
   *
   * @param { AppStorage } appStorage
   * @param { Storage } storage
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @systemapi
   * @FaAndStageModel
   * @since 7 dynamic
   */
  constructor(appStorage: AppStorage, storage: Storage);

  /**
   * Called when a persistence property is stored.
   *
   * @param { string } key
   * @param { T } defaultValue
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7 dynamiconly
   * @deprecated since 10
   * @useinstead PersistentStorage#persistProp
   */
  static PersistProp<T>(key: string, defaultValue: T): void;

  /**
   * Add property 'key' to AppStorage properties whose current value will be
   * persistent.
   * If AppStorage does not include this property it will be added and initializes
   * with given value
   *
   * @param { string } key - property name
   * @param { T } defaultValue - If AppStorage does not include this property it will be initialized with this value
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Add property 'key' to AppStorage properties whose current value will be
   * persistent.
   * If AppStorage does not include this property it will be added and initializes
   * with given value
   *
   * @param { string } key - property name
   * @param { T } defaultValue - If AppStorage does not include this property it will be initialized with this value
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  static persistProp<T>(key: string, defaultValue: T): void;

  /**
   * Called when a property is deleted.
   *
   * @param { string } key
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7 dynamiconly
   * @deprecated since 10
   * @useinstead PersistentStorage#deleteProp
   */
  static DeleteProp(key: string): void;

  /**
   * Reverse of @see persistProp
   *
   * @param { string } key - no longer persist the property named key
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Reverse of @see persistProp
   *
   * @param { string } key - no longer persist the property named key
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  static deleteProp(key: string): void;

  /**
   * Called when multiple persistence properties are stored.
   *
   * @param { {key: string;defaultValue: any;}[] } properties
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7 dynamiconly
   * @deprecated since 10
   * @useinstead PersistentStorage#PersistProps
   */
  static PersistProps(
    properties: {
      key: string;
      defaultValue: any;
    }[],
  ): void;

  /**
   * Persist given AppStorage properties with given names.
   * If a property does not exist in AppStorage, add it and initialize it with given value
   * works as @see persistProp for multiple properties.
   *
   * @param { PersistPropsOptions[] } props
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Persist given AppStorage properties with given names.
   * If a property does not exist in AppStorage, add it and initialize it with given value
   * works as @see persistProp for multiple properties.
   *
   * @param { PersistPropsOptions[] } props
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  static persistProps(props: PersistPropsOptions[]): void;

  /**
   * Inform persisted AppStorage property names
   * returns an Array<string> of persisted AppStorage property names
   *
   * @returns { Array<string> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @since 7 dynamiconly
   * @deprecated since 10
   * @useinstead PersistentStorage#keys
   */
  static Keys(): Array<string>;

  /**
   * Inform persisted AppStorage property names
   * returns an Array<string> of persisted AppStorage property names
   *
   * @returns { Array<string> } array of AppStorage keys
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Inform persisted AppStorage property names
   *
   * @returns { Array<string> } array of AppStorage keys
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  static keys(): Array<string>;
}

/**
 * Used for ide.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @systemapi
 * @FaAndStageModel
 * @since 7 dynamic
 */
declare const appStorage: AppStorage;

/**
 * LocalStorage
 * Class implements a Map of ObservableObjectBase UI state variables.
 * Instances can be created to manage UI state within a limited "local"
 * access, and life cycle as defined by the app.
 * AppStorage singleton is sub-class of LocalStorage for
 * UI state of app-wide access and same life cycle as the app.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @form
 * @since 9
 */
/**
 * LocalStorage
 * Class implements a Map of ObservableObjectBase UI state variables.
 * Instances can be created to manage UI state within a limited "local"
 * access, and life cycle as defined by the app.
 * AppStorage singleton is sub-class of LocalStorage for
 * UI state of app-wide access and same life cycle as the app.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @form
 * @since 10
 */
/**
 * LocalStorage
 * Class implements a Map of ObservableObjectBase UI state variables.
 * Instances can be created to manage UI state within a limited "local"
 * access, and life cycle as defined by the app.
 * AppStorage singleton is sub-class of LocalStorage for
 * UI state of app-wide access and same life cycle as the app.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @FaAndStageModel
 * @crossplatform
 * @form
 * @atomicservice
 * @since 11 dynamic
 */
declare class LocalStorage {
  /**
   * Construct new instance of LocalStorage
   * initialize with all properties and their values that Object.keys(params) returns
   * Property values must not be undefined.
   *
   * @param { Object } [initializingProperties] - Object containing keys and values. see set() for valid values
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Construct new instance of LocalStorage
   * initialize with all properties and their values that Object.keys(params) returns
   * Property values must not be undefined.
   *
   * @param { Object } [initializingProperties] - Object containing keys and values. see set() for valid values
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Construct new instance of LocalStorage
   * initialize with all properties and their values that Object.keys(params) returns
   * Property values must not be undefined.
   *
   * @param { Object } [initializingProperties] - Object containing keys and values. see set() for valid values
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  constructor(initializingProperties?: Object);

  /**
   * Get current LocalStorage shared from stage.
   *
   * @returns { LocalStorage }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @StageModelOnly
   * @form
   * @since 9 dynamiconly
   * @deprecated since 10
   * @useinstead LocalStorage#getShared
   */
  static GetShared(): LocalStorage;

  /**
   * Get current LocalStorage shared from stage.
   *
   * @returns { LocalStorage } instance
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @StageModelOnly
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Get current LocalStorage shared from stage.
   *
   * @returns { LocalStorage } instance
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @StageModelOnly
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamiconly
   * @deprecated since 18
   * @useinstead ohos.arkui.UIContext.UIContext#getSharedLocalStorage
   */
  static getShared(): LocalStorage;

   /**
   * Obtain a handler or an alias to LocalStorage property with given name.
   *
   * @param { string } propName LocalStorage property name
   * @returns { AbstractProperty<T> | undefined } AbstractProperty object if property with given name exists
   * return undefined otherwise.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
   public ref<T>(propName: string): AbstractProperty<T> | undefined;

   /**
    * Obtain a handler or an alias to LocalStorage property with given name.
    *
    * If property does not exist in LocalStorage, create it with given default value.
    *
    * @param { string } propName LocalStorage property name
    * @param { T } defaultValue If property does not exist in LocalStorage,
    *        create it with given default value.
    * @returns { AbstractProperty<T> } AbstractProperty object
    * @syscap SystemCapability.ArkUI.ArkUI.Full
    * @crossplatform
    * @atomicservice
    * @since 12 dynamic
    */
   public setAndRef<T>(propName: string, defaultValue: T): AbstractProperty<T>;

  /**
   * Check if LocalStorage has a property with given name
   * return true if property with given name exists
   * same as ES6 Map.prototype.has()
   *
   * @param { string } propName - searched property
   * @returns { boolean } true if property with such name exists in LocalStorage
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Check if LocalStorage has a property with given name
   * return true if property with given name exists
   * same as ES6 Map.prototype.has()
   *
   * @param { string } propName - searched property
   * @returns { boolean } true if property with such name exists in LocalStorage
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Check if LocalStorage has a property with given name
   * return true if property with given name exists
   * same as ES6 Map.prototype.has()
   *
   * @param { string } propName - searched property
   * @returns { boolean } true if property with such name exists in LocalStorage
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  has(propName: string): boolean;

  /**
   * Provide names of all properties in LocalStorage
   * same as ES6 Map.prototype.keys()
   *
   * @returns { IterableIterator<string> } return a Map Iterator
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Provide names of all properties in LocalStorage
   * same as ES6 Map.prototype.keys()
   *
   * @returns { IterableIterator<string> } return a Map Iterator
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Provide names of all properties in LocalStorage
   * same as ES6 Map.prototype.keys()
   *
   * @returns { IterableIterator<string> } return a Map Iterator
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  keys(): IterableIterator<string>;

  /**
   * Returns number of properties in LocalStorage
   * same as Map.prototype.size()
   *
   * @returns { number } return number of properties
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Returns number of properties in LocalStorage
   * same as Map.prototype.size()
   *
   * @returns { number } return number of properties
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Returns number of properties in LocalStorage
   * same as Map.prototype.size()
   *
   * @returns { number } return number of properties
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  size(): number;

  /**
   * Returns value of given property
   * return undefined if no property with this name
   *
   * @param { string } propName
   * @returns { T | undefined } property value if found or undefined
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Returns value of given property
   * return undefined if no property with this name
   *
   * @param { string } propName
   * @returns { T | undefined } property value if found or undefined
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Returns value of given property
   * return undefined if no property with this name
   *
   * @param { string } propName
   * @returns { T | undefined } property value if found or undefined
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  get<T>(propName: string): T | undefined;

  /**
   * Set value of given property in LocalStorage
   * Method sets nothing and returns false if property with this name does not exist
   * or if newValue is `undefined` or `null` (`undefined`, `null` value are not allowed for state variables).
   *
   * @param { string } propName
   * @param { T } newValue - must be of type T and must not be undefined or null
   * @returns { boolean } true on success, i.e. when above conditions are satisfied, otherwise false
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Set value of given property in LocalStorage
   * Method sets nothing and returns false if property with this name does not exist
   * or if newValue is `undefined` or `null` (`undefined`, `null` value are not allowed for state variables).
   *
   * @param { string } propName
   * @param { T } newValue - must be of type T and must not be undefined or null
   * @returns { boolean } true on success, i.e. when above conditions are satisfied, otherwise false
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Set value of given property in LocalStorage
   * Method sets nothing and returns false if property with this name does not exist
   * or if newValue is `undefined` or `null` (`undefined`, `null` value are not allowed for state variables).
   *
   * @param { string } propName
   * @param { T } newValue - must be of type T and must not be undefined or null
   * @returns { boolean } true on success, i.e. when above conditions are satisfied, otherwise false
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
  /**
   * Set value of given property in LocalStorage
   * Method sets nothing and returns false if property with this name does not exist in LocalStorage
   * newValue can be undefined or null from API 12.
   *
   * @param { string } propName
   * @param { T } newValue - must be of type T, can be undefined or null
   * @returns { boolean } true on success, i.e. when above conditions are satisfied, otherwise false
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 12 dynamic
   */
  set<T>(propName: string, newValue: T): boolean;

  /**
   * Set value of given property, if it exists, see set() .
   * Add property if no property with given name and initialize with given value.
   * Do nothing and return false if newValue is undefined or null
   * (undefined, null value is not allowed for state variables)
   *
   * @param { string } propName
   * @param { T } newValue - must be of type T and must not be undefined or null
   * @returns { boolean } true on success, i.e. when above conditions are satisfied, otherwise false
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Set value of given property, if it exists, see set() .
   * Add property if no property with given name and initialize with given value.
   * Do nothing and return false if newValue is undefined or null
   * (undefined, null value is not allowed for state variables)
   *
   * @param { string } propName
   * @param { T } newValue - must be of type T and must not be undefined or null
   * @returns { boolean } true on success, i.e. when above conditions are satisfied, otherwise false
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Set value of given property, if it exists, see set() .
   * Add property if no property with given name and initialize with given value.
   * Do nothing and return false if newValue is undefined or null
   * (undefined, null value is not allowed for state variables)
   *
   * @param { string } propName
   * @param { T } newValue - must be of type T and must not be undefined or null
   * @returns { boolean } true on success, i.e. when above conditions are satisfied, otherwise false
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
  /**
   * Set value of given property, if it exists, see set() .
   * Add property if no property with given name and initialize with given value.
   * newValue can be undefined or null from API 12
   *
   * @param { string } propName
   * @param { T } newValue - must be of type T, can be undefined or null
   * @returns { boolean } true on success, i.e. when above conditions are satisfied, otherwise false
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 12 dynamic
   */
  setOrCreate<T>(propName: string, newValue: T): boolean;

  /**
   * Create and return a two-way sync "(link") to named property
   *
   * @param { string } propName - name of source property in LocalStorage
   * @returns { SubscribedAbstractProperty<T> } instance of  SubscribedAbstractProperty<T>
   *           return undefined if named property does not already exist in LocalStorage
   *           Apps can use SDK functions of base class SubscribedPropertyAbstract<T>
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Create and return a two-way sync "(link") to named property
   *
   * @param { string } propName - name of source property in LocalStorage
   * @returns { SubscribedAbstractProperty<T> } instance of  SubscribedAbstractProperty<T>
   *           return undefined if named property does not already exist in LocalStorage
   *           Apps can use SDK functions of base class SubscribedPropertyAbstract<T>
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Create and return a two-way sync "(link") to named property
   *
   * @param { string } propName - name of source property in LocalStorage
   * @returns { SubscribedAbstractProperty<T> } instance of  SubscribedAbstractProperty<T>
   *           return undefined if named property does not already exist in LocalStorage
   *           Apps can use SDK functions of base class SubscribedPropertyAbstract<T>
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  link<T>(propName: string): SubscribedAbstractProperty<T>;

  /**
   * Like see link(), but will create and initialize a new source property in LocalStorage if missing
   *
   * @param { string } propName - name of source property in LocalStorage
   * @param { T } defaultValue - value to be used for initializing if new creating new property in LocalStorage
   *        default value must be of type T, must not be undefined or null.
   * @returns { SubscribedAbstractProperty<T> } instance of  SubscribedAbstractProperty<T>
   *          Apps can use SDK functions of base class SubscribedAbstractProperty<T>
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Like see link(), but will create and initialize a new source property in LocalStorage if missing
   *
   * @param { string } propName - name of source property in LocalStorage
   * @param { T } defaultValue - value to be used for initializing if new creating new property in LocalStorage
   *        default value must be of type T, must not be undefined or null.
   * @returns { SubscribedAbstractProperty<T> } instance of  SubscribedAbstractProperty<T>
   *          Apps can use SDK functions of base class SubscribedAbstractProperty<T>
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Like see link(), but will create and initialize a new source property in LocalStorage if missing
   *
   * @param { string } propName - name of source property in LocalStorage
   * @param { T } defaultValue - value to be used for initializing if new creating new property in LocalStorage
   *        default value must be of type T, must not be undefined or null.
   * @returns { SubscribedAbstractProperty<T> } instance of  SubscribedAbstractProperty<T>
   *          Apps can use SDK functions of base class SubscribedAbstractProperty<T>
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
  /**
   * Like see link(), but will create and initialize a new source property in LocalStorage if missing
   *
   * @param { string } propName - name of source property in LocalStorage
   * @param { T } defaultValue - value to be used for initializing new property in LocalStorage
   *        default value must be of type T, can be undefined or null.
   * @returns { SubscribedAbstractProperty<T> } instance of  SubscribedAbstractProperty<T>
   *          Apps can use SDK functions of base class SubscribedAbstractProperty<T>
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 12 dynamic
   */
  setAndLink<T>(propName: string, defaultValue: T): SubscribedAbstractProperty<T>;

  /**
   * Create and return a one-way sync ('prop') to named property
   *
   * @param { string } propName - name of source property in LocalStorage
   * @returns { SubscribedAbstractProperty<S> } instance of  SubscribedAbstractProperty<S>
   *           return undefined if named property does not already exist in LocalStorage
   *           Apps can use SDK functions of base class SubscribedAbstractProperty<S>
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Create and return a one-way sync ('prop') to named property
   *
   * @param { string } propName - name of source property in LocalStorage
   * @returns { SubscribedAbstractProperty<S> } instance of  SubscribedAbstractProperty<S>
   *           return undefined if named property does not already exist in LocalStorage
   *           Apps can use SDK functions of base class SubscribedAbstractProperty<S>
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Create and return a one-way sync ('prop') to named property
   *
   * @param { string } propName - name of source property in LocalStorage
   * @returns { SubscribedAbstractProperty<S> } instance of  SubscribedAbstractProperty<S>
   *           return undefined if named property does not already exist in LocalStorage
   *           Apps can use SDK functions of base class SubscribedAbstractProperty<S>
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  prop<S>(propName: string): SubscribedAbstractProperty<S>;

  /**
   * Like see prop(), will create and initialize a new source property in LocalStorage if missing
   *
   * @param { string } propName - name of source property in LocalStorage
   * @param { S } defaultValue - value to be used for initializing if new creating new property in LocalStorage.
   *         Default value must be of type T, must not be undefined or null.
   * @returns { SubscribedAbstractProperty<S> } instance of  SubscribedAbstractProperty<S>
   *           Apps can use SDK functions of base class SubscribedAbstractProperty<S>
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @form
   * @since 9
   */
  /**
   * Like see prop(), will create and initialize a new source property in LocalStorage if missing
   *
   * @param { string } propName - name of source property in LocalStorage
   * @param { S } defaultValue - value to be used for initializing if new creating new property in LocalStorage.
   *         Default value must be of type T, must not be undefined or null.
   * @returns { SubscribedAbstractProperty<S> } instance of  SubscribedAbstractProperty<S>
   *           Apps can use SDK functions of base class SubscribedAbstractProperty<S>
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Like see prop(), will create and initialize a new source property in LocalStorage if missing
   *
   * @param { string } propName - name of source property in LocalStorage
   * @param { S } defaultValue - value to be used for initializing if new creating new property in LocalStorage.
   *         Default value must be of type T, must not be undefined or null.
   * @returns { SubscribedAbstractProperty<S> } instance of  SubscribedAbstractProperty<S>
   *           Apps can use SDK functions of base class SubscribedAbstractProperty<S>
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11
   */
  /**
   * Like see prop(), will create and initialize a new source property in LocalStorage if missing
   *
   * @param { string } propName - name of source property in LocalStorage
   * @param { S } defaultValue - value to be used for initializing new property in LocalStorage.
   *         Default value must be of type T, can be undefined or null.
   * @returns { SubscribedAbstractProperty<S> } instance of  SubscribedAbstractProperty<S>
   *           Apps can use SDK functions of base class SubscribedAbstractProperty<S>
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 12 dynamic
   */
  setAndProp<S>(propName: string, defaultValue: S): SubscribedAbstractProperty<S>;

  /**
   * Delete property from StorageBase
   * Use with caution:
   * Before deleting a prop from LocalStorage all its subscribers need to
   * unsubscribe from the property.
   * This method fails and returns false if given property still has subscribers
   * Another reason for failing is unknown property.
   * Developer advise:
   * Subscribers are created with see link(), see prop()
   * and also via @LocalStorageLink and @LocalStorageProp state variable decorators.
   * That means as long as their is a @Component instance that uses such decorated variable
   * or a sync relationship with a SubscribedAbstractProperty variable the property can nit
   * (and also should not!) be deleted from LocalStorage.
   *
   * @param { string } propName
   * @returns { boolean } false if method failed
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Delete property from StorageBase
   * Use with caution:
   * Before deleting a prop from LocalStorage all its subscribers need to
   * unsubscribe from the property.
   * This method fails and returns false if given property still has subscribers
   * Another reason for failing is unknown property.
   * Developer advise:
   * Subscribers are created with see link(), see prop()
   * and also via @LocalStorageLink and @LocalStorageProp state variable decorators.
   * That means as long as their is a @Component instance that uses such decorated variable
   * or a sync relationship with a SubscribedAbstractProperty variable the property can nit
   * (and also should not!) be deleted from LocalStorage.
   *
   * @param { string } propName
   * @returns { boolean } false if method failed
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Delete property from StorageBase
   * Use with caution:
   * Before deleting a prop from LocalStorage all its subscribers need to
   * unsubscribe from the property.
   * This method fails and returns false if given property still has subscribers
   * Another reason for failing is unknown property.
   * Developer advise:
   * Subscribers are created with see link(), see prop()
   * and also via @LocalStorageLink and @LocalStorageProp state variable decorators.
   * That means as long as their is a @Component instance that uses such decorated variable
   * or a sync relationship with a SubscribedAbstractProperty variable the property can nit
   * (and also should not!) be deleted from LocalStorage.
   *
   * @param { string } propName
   * @returns { boolean } false if method failed
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  delete(propName: string): boolean;

  /**
   * Delete all properties from the LocalStorage instance
   * Precondition is that there are no subscribers.
   * method returns false and deletes no properties if there is any property
   * that still has subscribers
   *
   * @returns { boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @form
   * @since 9
   */
  /**
   * Delete all properties from the LocalStorage instance
   * Precondition is that there are no subscribers.
   * method returns false and deletes no properties if there is any property
   * that still has subscribers
   *
   * @returns { boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @since 10
   */
  /**
   * Delete all properties from the LocalStorage instance
   * Precondition is that there are no subscribers.
   * method returns false and deletes no properties if there is any property
   * that still has subscribers
   *
   * @returns { boolean }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @FaAndStageModel
   * @crossplatform
   * @form
   * @atomicservice
   * @since 11 dynamic
   */
  clear(): boolean;
}
