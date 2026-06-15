## 1. 内存泄漏案例

### 1. Window.on

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

窗口Window的生命周期存在大量的 **on/off** 类接口，`window.on`是用于监听窗口事件的接口，主要涉及窗口状态、尺寸、键盘及规避区等变化。

**所有的window.on接口，需要在 aboutToDisappear时主动调用 off 接口进行注销，否则出现内存泄漏**

 **.on**和 **.off**接口，开发者需要注意以下约束，否则会造成组件内存泄漏

**1. 开发者主动配对.on/.off使用，需要注意第一个参数key也要配对，**

**2. off时需要注意不要.off匿名函数，因为匿名函数函数名唯一，会造成与on不配对**

**3. off时第二个参数Callback非必填，当不传Callback时默认释放此类型下的全部Callback，防止泄漏**



**参考:**

[Window.on('windowSizeChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#onwindowsizechange7)

[Window.off('windowSizeChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#offwindowsizechange7)

[Window.on('avoidAreaChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#onavoidareachange9)

[Window.off('avoidAreaChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#offavoidareachange9)

[Window.on('keyboardHeightChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#onkeyboardheightchange7)

[Window.off('keyboardHeightChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#offkeyboardheightchange7)

[Window.on('keyboardWillShow')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#onkeyboardwillshow20)

[Window.off('keyboardWillShow')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#offkeyboardwillshow20)

[Window.on('keyboardWillHide')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#offkeyboardwillshow20)

[Window.off('keyboardWillHide')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#offkeyboardwillhide20)

[Window.on('keyboardDidShow')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#onkeyboarddidshow18)

[Window.off('keyboardDidShow')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#offkeyboarddidshow18)

[Window.on('keyboardDidHide')]()

[Window.off('keyboardDidHide')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#offkeyboarddidhide18)

[Window.on('touchOutside')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#ontouchoutside11)

[Window.off('touchOutside')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#offtouchoutside11)

[Window.on('screenshot')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#onscreenshot9)

[Window.off('screenshot')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#offscreenshot9)

[Window.on('screenshotAppEvent')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#onscreenshotappevent20)

[Window.off('screenshotAppEvent')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#offscreenshotappevent20)

[Window.on('dialogTargetTouch')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#ondialogtargettouch10)

[Window.off('dialogTargetTouch')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#offdialogtargettouch10)

...**窗口on/off接口众多，请开发者关注每一类的on/off配对情况**




### 2. WindowStage.on

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

WindowStage是窗口管理器。管理各个基本窗口单元，即[Window](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window)实例，窗口WindowStage的生命周期存在大量的 **on/off** 类接口。

**所有的WindowStage.on接口，需要在 aboutToDisappear时需要主动调用off 接口进行注销，否则出现内存泄漏。**

**参考:**

[WindowStage.on('windowStageEvent')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-windowstage#onwindowstageevent9)

[WindowStage.off('windowStageEvent')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-windowstage#offwindowstageevent9)

[WindowStage.on('windowStageLifecycleEvent')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-windowstage#onwindowstagelifecycleevent20)

[WindowStage.off('windowStageLifecycleEvent')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-windowstage#offwindowstagelifecycleevent20)

[WindowStage.on('windowStageClose')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-windowstage#onwindowstageclose14)

[WindowStage.off('windowStageClose')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-windowstage#offwindowstageclose14)







### 3. display.on

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

**@ohos.display**屏幕属性提供管理显示设备的一些基础能力，包括获取默认显示设备的信息，获取所有显示设备的信息以及监听显示设备的插拔行为

其中包含 **.on**和 **.off**接口，开发者需要注意以下约束，否则会造成组件内存泄漏

**1. 开发者主动配对.on/.off使用，需要注意第一个参数key也要配对，**

**2. off时需要注意不要.off匿名函数，因为匿名函数函数名唯一，会造成与on不配对**

**3. off时第二个参数Callback非必填，当不传Callback时默认释放此类型下的全部Callback，防止泄漏**



**参考:**

[display.on('add'|'remove'|'change')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#displayonaddremovechange)

[display.off('add'|'remove'|'change')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#displayoffaddremovechange)

[display.on('foldStatusChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#displayonfoldstatuschange10)

[display.off('foldStatusChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#displayofffoldstatuschange10)

[display.on('brightnessInfoChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#displayonbrightnessinfochange22)

[display.off('brightnessInfoChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#displayoffbrightnessinfochange22)

[display.on('foldAngleChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#displayonfoldanglechange12)

[display.off('foldAngleChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#displayofffoldanglechange12)

[display.on('captureStatusChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#displayoncapturestatuschange12)

[display.off('captureStatusChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#displayoffcapturestatuschange12)

[display.on('foldDisplayModeChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#displayonfolddisplaymodechange10)

[display.off('foldDisplayModeChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#displayofffolddisplaymodechange10)




### 4. display.Display.on

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

**display.Display** 为屏幕实例。描述Display对象的属性和方法。

其中包含 **.on**和 **.off**接口，开发者需要注意以下约束，否则会造成组件内存泄漏

**1. 开发者主动配对.on/.off使用，需要注意第一个参数key也要配对，**

**2. off时需要注意不要.off匿名函数，因为匿名函数函数名唯一，会造成与on不配对**

**3. off时第二个参数Callback非必填，当不传Callback时默认释放此类型下的全部Callback，防止泄漏**

**参考:**

[on('availableAreaChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#onavailableareachange12)

[off('availableAreaChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#offavailableareachange12)





### 5. rpc.MessageSequence.create

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

在RPC或IPC过程中，发送方可以使用MessageSequence提供`rpc.MessageSequence.create();`的方法，将待发送的数据以特定格式写入该对象。接收方可以使用MessageSequence提供的读方法从该对象中读取特定格式的数据. 在使用完毕后，需要主动调用 **reclaim **释放，否则导致内存泄漏,  应用做IPC开发时容易常犯此问题

**示例**：

```js
import { rpc } from '@kit.IPCKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { BusinessError } from '@kit.BasicServicesKit';

try {
  let data = rpc.MessageSequence.create();
  hilog.info(0x0000, 'testTag', 'data is ' + data);

  // 当MessageSequence对象不再使用，由业务主动调用reclaim方法去释放资源。
  data.reclaim();
} catch (error) {
  let e: BusinessError = error as BusinessError;
  hilog.error(0x0000, 'testTag', 'errorCode ' + e.code);
  hilog.error(0x0000, 'testTag', 'errorMessage ' + e.message);
}
```

**参考:**

[messagesequence API文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-rpc#create9)




### 6. commonEventManager.unsubscribe

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

`commonEventManager.unsubscribe(subscriber: CommonEventSubscriber, callback?: AsyncCallback<void>): void` 会取消订阅公共事件, **取消订阅后如果subscriber不再使用时需要将其置为undefined，避免内存泄漏**

```javascript
// 取消订阅公共事件
// 等待异步接口subscribe执行完毕，开发者根据实际业务选择是否需要添加setTimeout
setTimeout(() => {
  try {
    commonEventManager.unsubscribe(subscriber, (err: BusinessError) => {
      if (err) {
        console.error(`Failed to unsubscribe. Code is ${err.code}, message is ${err.message}`);
        return;
      }
      // subscriber不再使用时需要将其置为undefined，避免内存泄露
      subscriber = undefined;
      console.info(`Succeeded in unsubscribing.`);
    });
  } catch (error) {
    let err: BusinessError = error as BusinessError;
    console.error(`Failed to unsubscribe. Code is ${err.code}, message is ${err.message}`);
  }
}, 500);
```

**参考:**

[commonEventManager.unsubscribe](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-commoneventmanager#commoneventmanagerunsubscribe)





### 7. emitter.on
**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

@ohos.events.emitter (Emitter) 提供了在同一进程不同线程间或同一线程内发送和处理事件的能力，支持持续订阅事件、单次订阅事件、取消订阅事件及发送事件到事件队列，其中包含 **.on**和 **.off**接口，`emitter.on`接口会持续订阅指定的事件，并在接收到该事件时，执行对应的回调处理函数，开发者需要注意以下约束，否则会造成组件内存泄漏 

**1. 开发者主动配对.on/.off使用，需要注意第一个参数的eventId也要配对，当一个参数为InnerEvent时，InnerEvent的数据结构为{eventId：number, priority: EventPriority}**

**2. off时需要注意不要.off匿名函数，因为匿名函数函数名唯一，会造成与on不配对**

**3. off时第二个参数Callback非必填，当不传Callback时默认释放此类型下的全部Callback，防止泄漏**

不需要订阅某个事件时，**需要及时取消订阅避免造成内存泄漏，如aboutToDisappear时调用emitter.off取消订阅**

**参考:**

[emitter.off](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-emitter#emitteroff)

[使用Emitter进行线程间通信](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/itc-with-emitter)








### 8. BuilderNode

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

当BuilderNode对象调用dispose之后，会立即释放当前BuilderNode对象对[实体节点](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-user-defined-node#基本概念)的引用关系。若前端对象BuilderNode无法释放，容易导致内存泄漏。建议在不再需要对该BuilderNode对象进行操作时，开发者主动调用dispose释放后端节点，以减少引用关系的复杂性，降低内存泄漏的风险。

**参考**:

[BuilderNode dispose](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-buildernode#dispose12)

[自定义节点概述](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-user-defined-node#%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5)

[解除实体节点引用关系](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-user-defined-arktsnode-buildernode#%E8%A7%A3%E9%99%A4%E5%AE%9E%E4%BD%93%E8%8A%82%E7%82%B9%E5%BC%95%E7%94%A8%E5%85%B3%E7%B3%BB)

[BuilderNode前后端循环引用导致的内存泄漏问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-user-defined-node-faq#buildernode%E5%89%8D%E5%90%8E%E7%AB%AF%E5%BE%AA%E7%8E%AF%E5%BC%95%E7%94%A8%E5%AF%BC%E8%87%B4%E7%9A%84%E5%86%85%E5%AD%98%E6%B3%84%E6%BC%8F%E9%97%AE%E9%A2%98)




### 9. ComponentContent

**语言类型:**  ArkTS-API

**易错等级:** 低风险

**使用约束:** 

ComponentContent表示组件内容的实体封装，其对象支持在非UI组件中创建与传递，便于开发者对弹窗类组件进行解耦封装，其底层使用了BuilderNode。

当ComponentContent调用dispose后，会立即释放当前ComponentContent对象对[基本概念：实体节点](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-user-defined-node#基本概念)的引用关系。关于ComponentContent的解绑场景请参见[解除实体节点引用关系](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-user-defined-arktsnode-buildernode#解除实体节点引用关系)

若前端对象ComponentContent无法释放，容易导致内存泄漏。**建议在不再需要操作该ComponentContent对象时，开发者主动调用dispose释放后端节点，以减少引用关系的复杂性，降低内存泄漏的风险。**



**参考**:

[ComponentContent dispose](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-componentcontent#dispose)

[自定义节点概述](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-user-defined-node#%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5)

[解除实体节点引用关系](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-user-defined-arktsnode-buildernode#%E8%A7%A3%E9%99%A4%E5%AE%9E%E4%BD%93%E8%8A%82%E7%82%B9%E5%BC%95%E7%94%A8%E5%85%B3%E7%B3%BB)






### 10. Animator.create

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

动画操作中 **@ohos.animator** 的自定义组件中一般会持有一个[create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-animator#create18)接口返回的[AnimatorResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-animator#animatorresult)对象，以保证动画对象不在动画过程中析构，而这个对象也通过回调捕获了自定义组件对象。**则需要在自定义组件销毁时的[aboutToDisappear](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-custom-component-lifecycle#abouttodisappear)中释放动画对象，来避免因为循环依赖导致内存泄漏。**

```javascript
  aboutToDisappear() {
    // 自定义组件消失时调用finish使未完成的动画结束，避免动画继续运行。
    // 由于backAnimator在onframe中引用了this, this中保存了backAnimator，
    // 在自定义组件消失时应该将保存在组件中的backAnimator置空，避免内存泄漏
    this.backAnimator?.finish();
    this.backAnimator = undefined;
  }
```



**参考**:

[基于ArkTS扩展的声明式开发范式](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-animator#基于arkts扩展的声明式开发范式)

[Animator create API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-animator#create18)

[AnimatorResult finish API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-animator#finish)




### 11. CustomDialogController

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

**CustomDialogController**用于控制自定义弹窗。CustomDialogController仅在作为@CustomDialog和@Component struct成员变量时，需要在`aboutToDisappear` 生命周期结束后将**CustomDialogController**置空

```javascript
@Entry
@Component
struct CustomDialogUser {
  @State textValue: string = '';
  @State inputValue: string = 'click me';
  dialogController: CustomDialogController | null = new CustomDialogController({
    builder: CustomDialogExample({
      textValue: this.textValue,
      inputValue: this.inputValue
    }),
    onWillDismiss: (dismissDialogAction: DismissDialogAction)=> {
      console.info(`reason= ${dismissDialogAction.reason}`);
      console.info('dialog onWillDismiss');
      if (dismissDialogAction.reason == DismissReason.PRESS_BACK) {
        dismissDialogAction.dismiss();
      }
      if (dismissDialogAction.reason == DismissReason.TOUCH_OUTSIDE) {
        dismissDialogAction.dismiss();
      }
    },
  })

  // 在自定义组件即将析构销毁时将dialogController置空
  aboutToDisappear() {
    this.dialogController = null; // 将dialogController置空
  }
```



**参考**:

[自定义弹窗CustomDialogController指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-methods-custom-dialog-box#customdialogcontroller)




### 12. UIExtensionProxy.on（系统接口）

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

**UIExtensionProxy **用于在双方建立连接成功后，组件使用方向被拉起的Ability发送数据、订阅和取消订阅注册，是隶属在**UIExtensionComponent **下的常见操作。 其中包含 **.on**和 **.off**接口，开发者需要注意以下约束，否则会存在因未解除监听造成组件内存泄漏

**1. 开发者主动配对.on/.off使用，需要注意第一个参数key也要配对，**

**2. off时需要注意不要.off匿名函数，因为匿名函数函数名唯一，会造成与on不配对**

**3. off时第二个参数Callback非必填，当不传Callback时默认释放此类型下的全部Callback，防止泄漏**

建议开发者在aboutToDisappear阶段调用  **UIExtensionProxy.off** 接口取消订阅。

```javascript
  aboutToDisappear(): void {
    LogUtil.info(`${TAG} aboutToDisappear`);
    this.uiExtensionProxy?.off('asyncReceiverRegister');
    this.viewModel.destroyListening();
  }
```



**参考**:

[UIExtensionComponent](https://docs.openharmony.cn/pages/v6.0/zh-cn/application-dev/reference/apis-arkui/arkui-ts/ts-container-ui-extension-component-sys.md#uiextensionproxy)

[UIExtensionProxy.on](https://docs.openharmony.cn/pages/v6.0/zh-cn/application-dev/reference/apis-arkui/arkui-ts/ts-container-ui-extension-component-sys.md#onasyncreceiverregister11)

[UIExtensionProxy.off](https://docs.openharmony.cn/pages/v6.0/zh-cn/application-dev/reference/apis-arkui/arkui-ts/ts-container-ui-extension-component-sys.md#offasyncreceiverregister11)





### 13. media.createAVPlayer

**语言类型:**  ArkTS-API

**易错等级:** 低风险

**使用约束:** 

通过[createAVPlayer()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-media-f#mediacreateavplayer9)构建一个AVPlayer实例，需要在使用完成后主动调用**release**方法提前释放内存,避免持有过多AVPlayer实例导致内存消耗过大，否则在一定情况下可能导致系统终止应用。

**参考**:quit

[media.createAVPlayer API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-media-f#mediacreateavplayer9)

[avplayer release API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-media-avplayer#release9)




### 14. image.createImageSource

**语言类型:**  ArkTS-API

**易错等级:** 低风险

**使用约束:** 

通过createImageSource 创建ImageSource实例，建议应用在使用完成后主动调用**release**方法提前释放内存

**注意：ArkTS有内存回收机制，ImageSource对象不调用release方法，内存最终也会由系统统一释放。但图片使用的内存往往较大，为尽快释放内存，建议应用在使用完成后主动调用release方法提前释放内存。**

**参考**:

[imagesource release API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-imagesource#release)




### 15. PixelMap

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

使用`image.createPixelMap`  或者  `getEffectPixelMap`等媒体接口创建PixelMap，建议应用在使用完成后主动调用**release**方法提前释放内存

**ArkTS有内存回收机制，PixelMap对象不调用release方法，内存最终也会由系统统一释放。但图片使用的内存往往较大，为尽快释放内存，建议应用在使用完成后主动调用release方法提前释放内存。释放指的是ArkTS对象释放与之关联的native对象的管理权。仅当所有管理该native对象的ArkTS对象都被释放时，native对象占用的内存才会被回收。**

**注意：系统中创建PixelMap的API有很多需要关注每一个PixelMap的生命周期的最后的release调用。**

**参考**:

[createPixelMap API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-imagesource#createpixelmap7)

[getEffectPixelMap API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-effectkit#geteffectpixelmap11)

[pixelmap release API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-pixelmap#release7)




### 16. EventHub.on

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

EventHub是系统提供的基于发布-订阅模式实现的事件通信机制。通过事件名，实现了发送方和订阅方之间的解耦，支持不同业务模块间的高效数据传递和状态同步。主要用于[UIAbility组件与UI的数据通信](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/uiability-data-sync-with-ui)。其中包含 **.on**和 **.off**接口，开发者需要注意以下约束，否则会存在因EventHub监听造成组件内存泄漏

**1. 开发者主动配对.on/.off使用，需要注意第一个参数key也要配对，**

**2. off时需要注意不要.off匿名函数，因为匿名函数函数名唯一，会造成与on不配对**

**3. off时第二个参数Callback非必填，当不传Callback时默认释放此类型下的全部Callback，防止泄漏**

**参考**

[EventHub.on API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-eventhub#eventhubon)





### 17. observer.on

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

@ohos.telephony.observer (observer) 提供订阅管理功能，可以订阅/取消订阅的事件包括：网络状态变化、信号状态变化、通话状态变化、蜂窝数据链路连接状态、蜂窝数据业务的上下行数据流状态、SIM状态变化. 其中包含 **.on**和 **.off**接口，开发者需要注意以下约束，否则会存在因observer监听造成组件内存泄漏

**1. 开发者主动配对.on/.off使用，需要注意第一个参数key也要配对，**

**2. off时需要注意不要.off匿名函数，因为匿名函数函数名唯一，会造成与on不配对**

**3. off时第二个参数Callback非必填，当不传Callback时默认释放此类型下的全部Callback，防止泄漏**



**参考**

[observer.on(type: 'networkStateChange', callback: Callback<NetworkState>): void](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-observer#observeronnetworkstatechange)

[observer.off(type: 'networkStateChange', callback?: Callback<NetworkState>): void](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-observer#observeroffnetworkstatechange)




### 18. webSocket .on

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

@ohos.net.webSocket (WebSocket连接) 给第三方应用提供webSocket客户端和服务端服务器，实现客户端与服务端的双向连接。webSocket 包含多个 **.on**和 **.off**接口，开发者需要注意以下约束，否则会存在因observer监听造成组件内存泄漏

**1. 开发者主动配对.on/.off使用，需要注意第一个参数key也要配对，否则造成泄漏**

**2. off时需要注意不要.off匿名函数，因为匿名函数函数名唯一，会造成与on不配对，造成泄漏**

**3. off时第二个参数Callback非必填，当不传Callback时默认释放此类型下的全部Callback，可以防止泄漏**



**参考**

[webSocket.on(type: 'open', callback: AsyncCallback<Object>): void](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-websocket#onopen)

[webSocket.on(type: 'message', callback: AsyncCallback<string | ArrayBuffer>): void](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-websocket#onmessage)

[webSocket.on(type: 'close', callback: AsyncCallback<CloseResult>): void](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-websocket#onclose)





### 19. sensor.on

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

@ohos.sensor (传感器) 模块提供了获取传感器数据的能力，包括获取传感器属性列表，订阅传感器数据，以及一些通用的传感器算法。

sensor 包含 **.on**和 **.off**接口，开发者需要注意以下约束，否则会存在因sensor 监听造成组件内存泄漏

**1. 开发者主动配对.on/.off使用，需要注意第一个参数type也要配对，否则造成泄漏**

**2.调用off时需要注意不要.off匿名函数，因为匿名函数函数名唯一，会造成与on不配对，造成泄漏**

**3. off时第二个参数Callback非必填，当不传Callback时默认释放此类型下的全部Callback，可以防止泄漏**

**示例**：

```javascript
import { sensor } from '@kit.SensorServiceKit';
import { BusinessError } from '@kit.BasicServicesKit';

function callback1(data: object) {
  console.info('Succeeded in getting callback1 data: ' + JSON.stringify(data));
}

function callback2(data: object) {
  console.info('Succeeded in getting callback2 data: ' + JSON.stringify(data));
}

// 使用try catch对可能出现的异常进行捕获
try {
  sensor.on(sensor.SensorId.ACCELEROMETER, callback1);
  sensor.on(sensor.SensorId.ACCELEROMETER, callback2);
  // 仅取消callback1的注册
  sensor.off(sensor.SensorId.ACCELEROMETER, callback1);
  // 取消SensorId.ACCELEROMETER类型的所有回调
  sensor.off(sensor.SensorId.ACCELEROMETER);
} catch (error) {
  let e: BusinessError = error as BusinessError;
  console.error(`Failed to invoke off. Code: ${e.code}, message: ${e.message}`);
}
```

第一个type参数SensorID，包括以下几类

| 名称                        | 值   | 说明                                                         |
| :-------------------------- | :--- | :----------------------------------------------------------- |
| ACCELEROMETER               | 1    | 加速度传感器。**元服务API**：从API version 11开始，该接口支持在元服务中使用。 |
| GYROSCOPE                   | 2    | 陀螺仪传感器。**元服务API**：从API version 11开始，该接口支持在元服务中使用。 |
| AMBIENT_LIGHT               | 5    | 环境光传感器。                                               |
| MAGNETIC_FIELD              | 6    | 磁场传感器。                                                 |
| BAROMETER                   | 8    | 气压计传感器。                                               |
| HALL                        | 10   | 霍尔传感器。                                                 |
| PROXIMITY                   | 12   | 接近光传感器。                                               |
| HUMIDITY                    | 13   | 湿度传感器。                                                 |
| ORIENTATION                 | 256  | 方向传感器。**元服务API**：从API version 11开始，该接口在支持元服务中使用。 |
| GRAVITY                     | 257  | 重力传感器。                                                 |
| LINEAR_ACCELEROMETER        | 258  | 线性加速度传感器。                                           |
| ROTATION_VECTOR             | 259  | 旋转矢量传感器。                                             |
| AMBIENT_TEMPERATURE         | 260  | 环境温度传感器。                                             |
| MAGNETIC_FIELD_UNCALIBRATED | 261  | 未校准磁场传感器。                                           |
| GYROSCOPE_UNCALIBRATED      | 263  | 未校准陀螺仪传感器。                                         |
| SIGNIFICANT_MOTION          | 264  | 有效运动传感器。                                             |
| PEDOMETER_DETECTION         | 265  | 计步检测传感器。                                             |
| PEDOMETER                   | 266  | 计步传感器。                                                 |
| HEART_RATE                  | 278  | 心率传感器。                                                 |
| WEAR_DETECTION              | 280  | 佩戴检测传感器。                                             |
| ACCELEROMETER_UNCALIBRATED  | 281  | 未校准加速度计传感器。                                       |
| FUSION_PRESSURE             | 283  | 融合压力传感器。仅智能表有该传感器                           |



**参考**

[sensor.on(type: SensorId.ACCELEROMETER, callback: Callback<AccelerometerResponse>, options?: Options): void](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-sensor#sensoron)

[sensor.off(type: SensorId.ACCELEROMETER, callback?: Callback<AccelerometerResponse>): void](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-sensor#sensoroff)






### 20. vibrator.on

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

@ohos.vibrator (振动) 模块提供控制设备马达振动的能力。包括启动指定时长、预置效果、自定义文件等模式的振动；停止指定时长、预置效果或所有模式的振动。

vibrator 包含 **.on**和 **.off**接口，开发者需要注意以下约束，否则会存在因sensor 监听造成组件内存泄漏

**1. 开发者主动配对.on/.off使用，需要注意第一个参数type也要配对，否则造成泄漏**

**2.调用off时需要注意不要.off匿名函数，因为匿名函数函数名唯一，会造成与on不配对，造成泄漏**

**3. off时第二个参数Callback非必填，当不传Callback时默认释放此类型下的全部Callback，可以防止泄漏**

**示例**：

```javascript
import { vibrator } from '@kit.SensorServiceKit';
import { BusinessError } from '@kit.BasicServicesKit';

// 回调函数
const vibratorStateChangeCallback = (data: vibrator.VibratorStatusEvent) => {
  console.info('vibrator state callback info:', JSON.stringify(data));
}

// 使用try catch对可能出现的异常进行捕获
try {
  // 订阅 vibratorStateChange事件
  vibrator.on('vibratorStateChange', vibratorStateChangeCallback);
} catch (error) {
  let e: BusinessError = error as BusinessError;
  console.error(`An unexpected error occurred. Code: ${e.code}, message: ${e.message}`);
}

// 使用try catch对可能出现的异常进行捕获
try {
  // 取消订阅 vibratorStateChange事件
  vibrator.off('vibratorStateChange', vibratorStateChangeCallback);
  // 取消订阅所有 vibratorStateChange事件
  // vibrator.off('vibratorStateChange');
} catch (error) {
  let e: BusinessError = error as BusinessError;
  console.error(`An unexpected error occurred. Code: ${e.code}, message: ${e.message}`);
}
```

第一个type参数SensorID，包括以下几类



**参考**

[vibrator.on(type: 'vibratorStateChange', callback: Callback<VibratorStatusEvent>): void](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-vibrator#vibratoron19)

[vibrator.off(type: 'vibratorStateChange', callback?: Callback<VibratorStatusEvent>): void](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-vibrator#vibratoroff19)





### 21. setInterval

**语言类型:**  ArkTS-API

**易错等级:** 低风险

**使用约束:** 

通过 setInterval(handler: Function | string, delay: number, ...arguments: any[]):  number 重复调用一个函数，在每次调用之间具有固定的时间延迟。**需手动调用clearInterval接口, 否 则会存在内存泄漏。**

**参考**

[setInterval](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-timer#setinterval)





### 22. RxJS-Observable.subscribe

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

RxJS 是一个使用 Observables 进行响应式编程的库，旨在简化异步或基于回调的代码的组合.Observable实例对外提供了  `public subscribe(observerOrNext: Observer | Function, error: Function, complete: Function): ISubscription` 接口，此接口会调用 Observable 的执行并注册 Observer 的处理器以便于发出通知

**调用`subscribe`会返回 Subscription 对象。该Subscription 对象允许你调用 `unsubscribe`，该方法会停止 Observable 的工作并且清理 Observable 持有的资源，如未调用会产生内存泄漏**



```c++
const subscription = Rx.Observable.interval(1000).subscribe(
  num => console.log(num),
  undefined,
  () => console.log('completed!') // 即使当取消订阅时，也不会被调用
);


setTimeout(() => {
  subscription.unsubscribe();
  console.log('unsubscribed!');
}, 2500);

// Logs:
// 0 after 1s
// 1 after 2s
// "unsubscribed!" after 2,5s
```



**参考**

[RxJS subscribe](https://cn.rx.js.org/class/es6/Observable.js~Observable.html#instance-method-subscribe)



## API索引

### 按首字母排序

- Animator.create
- BuilderNode
- ComponentContent
- CustomDialogController
- EventHub.on
- PixelMap
- RxJS-Observable.subscribe
- UIExtensionProxy.on（系统接口）
- Window.on
- WindowStage.on
- commonEventManager.unsubscribe
- display.Display.on
- display.on
- emitter.on
- image.createImageSource
- media.createAVPlayer
- observer.on
- rpc.MessageSequence.create
- sensor.on
- setInterval
- vibrator.on
- webSocket .on