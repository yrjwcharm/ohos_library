# 转换为ASCF框架后运行白屏或异常

**问题现象**

从小程序转换或是三方框架调用ASCF接口，出现运行异常或者白屏等问题。

**可能原因**

ASCF对比小程序有一些已知的不支持的接口，调用后运行会导致问题。

**解决措施**

- 方法1：根据transform.log日志或者代码中TODO提示的位置，将接口适配为平台支持的接口或者临时注释逻辑。

- 方法2：通过HiLog查看error日志，然后在app.js顶部将不支持的接口通过简单的函数mock掉，避免运行报错。具体mock实现，开发者可以根据业务场景和需要细化。等平台接口支持后再取消mock。
  
  - 通过HiLog快速查看error日志方法：

     1. 运行工程。
     
     2. 点击DevEco Studio底部的Log。

        ![打开Hilog-w800](figures/Hilog-start.png)

     3. 在搜索栏搜索JSVM，根据报错排查代码，比如根据Cannot read properties of undefined (reading 'height')排查height。

        ![Hilog排查error-w800](figures/Hilog-check-error.png)

  - mock具体参考示例代码如下：

     ```js
     const __wxConfig = {};
     const mockFn =
       (name, def = {}) =>
       () => {
         console.warn(`mocking has.${name}`);
         return def;
       };
     has.createAnimation = mockFn('createAnimation');
     has.nextTick = (fn) => setTimeout(fn, 0);
     has.openPrivacyContract = mockFn('openPrivacyContract');
     has.onNeedPrivacyAuthorization = mockFn('onNeedPrivacyAuthorization');
     has.setClipboardData = mockFn('setClipboardData');
     has.stopBeaconDiscovery = mockFn('stopBeaconDiscovery');
     has.onBeaconServiceChange = mockFn('onBeaconServiceChange');
     has.startBeaconDiscovery = mockFn('startBeaconDiscovery');
     has.onBeaconUpdate = mockFn('onBeaconUpdate');
     has.getUserProfile = mockFn('getUserProfile');
     has.navigateToMiniProgram = mockFn('navigateToMiniProgram', (opts) =>
       has.navigateToAtomicService(opts)
     );
     has.getUpdateManager = mockFn('getUpdateManager', () => ({
       onUpdateReady() {},
     }));
     has.getMenuButtonBoundingClientRect = mockFn(
       'getMenuButtonBoundingClientRect',() => ({
         width: 273,
         height: 122,
         top: 155,
         right: 1229,
         bottom: 277,
         left: 956,
         dpi: 540,
       })
     );
     has.getBackgroundAudioManager = mockFn('getBackgroundAudioManager', () => ({
       paused: true,
       currentTime: 0,
       onPlay() {},
       onStop() {},
       onPause() {},
       onTimeUpdate() {},
       stop() {},
       onEnded() {},
       onError() {},
       onNext() {},
       onPrev() {},
       play() {},
       pause() {},
       stop() {},
     }));
     has.hideToast = mockFn('hideToast');
     has.getUserInfo = mockFn('getUserInfo', (opts) => opts?.success?.({}));
     has.getAccountInfoSync = mockFn('getAccountInfoSync', () => ({
       miniProgram: { appId: 'xx' },
     }));
     ```
