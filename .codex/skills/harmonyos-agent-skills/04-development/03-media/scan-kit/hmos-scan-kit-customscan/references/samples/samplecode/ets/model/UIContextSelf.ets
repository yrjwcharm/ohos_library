/*
 * Copyright (c) 2026 Huawei Device Co., Ltd.
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

import lazy { PromptAction, window } from '@kit.ArkUI';
import Logger from '../utils/Logger';
import { common } from '@kit.AbilityKit';

const TAG: string = 'UIContextSelf';

export class UIContextSelf {
  public static uiContext: UIContext;
  public static commonContext: common.UIAbilityContext;

  public static setUIContext(windowObj: window.Window, context: common.UIAbilityContext): void {
    if (context) {
      UIContextSelf.commonContext = context;
    }
    if (windowObj) {
      try {
        UIContextSelf.uiContext = windowObj.getUIContext();
        Logger.info(TAG, 'Succeeded in getting getUIContext.');
      } catch (error) {
        Logger.error(TAG, `Failed to get getUIContext by windowObj. Code: ${error?.code}.`);
      }
    } else {
      Logger.error(TAG, 'windowObj is invalid.');
    }
  }

  public static getPromptAction(): PromptAction {
    if (!UIContextSelf.uiContext) {
      throw new Error('UIContext has not been set.');
    }
    return UIContextSelf.uiContext.getPromptAction();
  }

  public static getHostContext(): Context | undefined {
    if (!UIContextSelf.uiContext) {
      throw new Error('UIContext has not been set.');
    }
    return UIContextSelf.uiContext.getHostContext();
  }

  public static getSharedLocalStorage(): LocalStorage | undefined {
    if (!UIContextSelf.uiContext) {
      throw new Error('UIContext has not been set.');
    }
    return UIContextSelf.uiContext.getSharedLocalStorage();
  }

  public static showMessage(message: string): void {
    try {
      UIContextSelf.uiContext.getPromptAction().showToast({
        message: message,
        duration: 2000
      });
    } catch (error) {
      Logger.error(TAG, `Catch: showMessage showToast. Code: ${error?.code}.`);
    }
  }

  // Notification
  public static emitEventHub(event: string, ...args: Object[]): void {
    try {
      Logger.info(TAG, `emitEventHub emit, event: ${event}`);
      UIContextSelf.commonContext.eventHub.emit(event, ...args);
    } catch (error) {
      Logger.error(TAG, `Failed to emitEventHub. Code: ${error.code}, message: ${error.message}.`);
    }
  };

  // Subscription
  public static onEventHub(event: string, callback: Function): void {
    try {
      UIContextSelf.commonContext.eventHub.on(event, callback);
      Logger.info(TAG, `onEventHub, event: ${event}`);
    } catch (error) {
      Logger.error(TAG, `Failed to onEventHub. Code: ${error.code}, message: ${error.message}.`);
    }
  };

  // Unsubscription
  public static offEventHub(event: string): void {
    try {
      UIContextSelf.commonContext.eventHub.off(event);
      Logger.info(TAG, `offEventHub, event: ${event}`);
    } catch (error) {
      Logger.error(TAG, `Failed to offEventHub. Code: ${error.code}, message: ${error.message}.`);
    }
  };
}