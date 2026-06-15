## 1. 总体要求

为了统一用户体验并使上架审核过程更加高效和省心，**元服务须接入平台的隐私托管服务，由平台统一向用户展示隐私协议弹窗**。开发者可以基于AGC（应用开发服务）提供的标准隐私声明模板生成自己的隐私声明。在提交上架申请时，只需勾选该隐私声明，**无需额外代码开发**。

注意

- 元服务不允许开发者使用自行设计的隐私弹窗。
    
- 元服务不允许同时弹出多个隐私弹框影响用户体验。
    
- 接入隐私托管后，开发者仅需要配置隐私协议内容，用户协议即可
    

## 2. 接入流程

**前提**：元服务开发及备案已完成。

参考：[托管隐私声明](https://developer.huawei.com/consumer/cn/doc/app/agc-help-privacy-policy-atomic-0000002317135133)。

### 2.1. 填写应用信息

登录AGC后选择对应的项目，填写相关应用信息后，点击下一步。

![](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtybbs/908/161/966/C9633C5BEA79D94CC3BB489FE0C40CA5:5C0B871D8EF9284944C6924D06F1C8CDE550CA1266150B20B8E1A0794310222E.20260122190031.20415905987949304536212893972096:50001231000000:2800:43009F8B42DE7899719642F6305B76924F90418DB1AEEF428E91FA8A2BB66AA1.png)

### 2.2. 关联隐私声明

上传软件包后，下拉页面，可以看到隐私声明入口。

若已填写隐私声明，可下拉菜单选择对应的隐私声明。

若未填写隐私声明，可点击 协议服务 填写，需按AGC提供的模板进行填写。

![](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtybbs/908/161/966/C9633C5BEA79D94CC3BB489FE0C40CA5:5C0B871D8EF9284944C6924D06F1C8CDE550CA1266150B20B8E1A0794310222E.20260122190119.45864219150661105585716131052211:50001231000000:2800:405566BA71A16D930E95220FC1B054CD1E366050D325F5014168A673292C62F2.png)

### 2.3. 填写隐私声明

在协议服务页面，点击新建协议：

![](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtybbs/908/161/966/C9633C5BEA79D94CC3BB489FE0C40CA5:5C0B871D8EF9284944C6924D06F1C8CDE550CA1266150B20B8E1A0794310222E.20260122190131.91491308677337525841098692183893:50001231000000:2800:3B9205A91B446295941C534DC62884E051B48F701EEE3D95127466D14DCD405A.png)

填写协议名称：

![](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtybbs/908/161/966/C9633C5BEA79D94CC3BB489FE0C40CA5:5C0B871D8EF9284944C6924D06F1C8CDE550CA1266150B20B8E1A0794310222E.20260122190140.52790839181021546269224083505364:50001231000000:2800:2CCDE8FE8E0D3C3265FE7C4FBC6521C36B724CAB5C159D7C1F36DCFB007DD8E8.png)

如实填写对应的信息即可：

![](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtybbs/908/161/966/C9633C5BEA79D94CC3BB489FE0C40CA5:5C0B871D8EF9284944C6924D06F1C8CDE550CA1266150B20B8E1A0794310222E.20260122190149.05183995196252005735611615118269:50001231000000:2800:D9317C11451FC770F993626F5250DA3680229A6FA76697BB0F4CB9B64B690BDE.png)

关于设备权限调用

勾选的权限类型需要和module.json5配置文件的[requestPermissions](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/module-configuration-file-V5#requestpermissions%E6%A0%87%E7%AD%BE)标签中声明权限一一对应。未在列表内但是在module.json5里面配置的可以忽略，如ohos.permission.INTERNET权限。

![](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtybbs/908/161/966/C9633C5BEA79D94CC3BB489FE0C40CA5:5C0B871D8EF9284944C6924D06F1C8CDE550CA1266150B20B8E1A0794310222E.20260122190237.81259610150451275483897656234422:50001231000000:2800:1AB0913899AA0C2F9D027E9CFEBD018EDB4474C639B7A8D7FCBB0B3F7D8ACAB7.png)

### 2.4. 提交审核

隐私协议及其他信息填写完成后，点击提交审核，将元服务提交上架审核。当元服务审核通过后，首次打开元服务则会自动弹出隐私弹框，若未同意隐私协议，则直接退出元服务。

当隐私协议变更时，会重新弹框引导用户授权同意。

![](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtybbs/908/161/966/C9633C5BEA79D94CC3BB489FE0C40CA5:5C0B871D8EF9284944C6924D06F1C8CDE550CA1266150B20B8E1A0794310222E.20260122190250.61199209971869930479878159392660:50001231000000:2800:C8BF0D063FBB7520960FF582FF71C6AB1DDBB7DB3DCAD6951DFFEA1874184324.png)

## 3. 开发及调测

### 3.1. 未上架应用市场的元服务调测隐私弹框功能

针对未上架应用市场的元服务接入隐私服务，可以通过手动预置隐私链接信息模拟接入隐私托管和隐私管理服务。预置隐私链接信息完成后，打开元服务会弹出统一隐私弹框。

若已在AGC上完成隐私声明的填写，在AGC上对应的项目下，点击协议服务，可查看隐私链接。

![](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtybbs/908/161/966/C9633C5BEA79D94CC3BB489FE0C40CA5:5C0B871D8EF9284944C6924D06F1C8CDE550CA1266150B20B8E1A0794310222E.20260122190314.18706631365944629844672036523610:50001231000000:2800:B5A23AF5EB4ABA88489BE72DD6951F1A9C48751D25A40CB01FB2A918E15CB7F7.png)

- 将应用工程构建模式修改为[debug模式](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-hvigor-compilation-options-customizing-sample#section390311716277)。
    
- 打开代码工程中type为entry类型的模块，修改其中的src/main/module.json5文件，添加module.metadata信息，其中包含三个字段，值均为字符串类型：
    

|**字段名称**|**字段解释**|**是否必填**|
|---|---|---|
|appgallery_privacy_hosted|是否启用隐私弹框，1表示启用，其他值均表示不启|是|
|appgallery_privacy_link_privacy_statement|隐私协议url（https），在隐私弹框中作为隐私协议的内容|是|
|appgallery_privacy_link_user_agreement|用户协议url（https），在隐私弹框中作为用户协议的内容|否|
|appgallery_privacy_link_user_agreements|多个用户协议url（https），在隐私弹框中作为多个用户协议的内容。该值直接引用一个json文件，json文件存放在module的type为entry模块的resources/rawfile文件夹下。有多个用户协议链接时，优先取appgallery_privacy_link_user_agreements字段，appgallery_privacy_link_user_agreement配置的单个用户协议链接无效。|否|

示例配置：

```TypeScript
// module.json5
{
 "module": {
   "name": "entry",
   "type": "entry",
   "description": "$string:module_desc",
   "metadata": [
     {
       "name": "appgallery_privacy_hosted",
       "value": "1"
     },
     {
       "name": "appgallery_privacy_link_privacy_statement",
       "value": "https://www.example.com/" // 必须是https网址
     },
     {
       "name": "appgallery_privacy_link_user_agreement",
       "value": "https://www.example.com/" // 必须是https网址
     },
     {
       "name": "appgallery_privacy_link_user_agreements",
       "value": "link_user_agreements.json" // 配置json文件名称，示例配置见下文
     }
   ],
   // 其他内容
 }
}
```

link_user_agreements.json 配置示例：

```TypeScript
{
 "user_agreement_Infos": [
   {
     "name": "用户协议1",       // 需要展示的用户协议名字1
     "url": "https://xxxx"     // 用户协议链接地址
   },
   {
     "name": "用户协议2",       // 需要展示的用户协议名字2
     "url": "https://xxxx"     // 用户协议链接地址
   }
 ]
}
```

### 3.2. 隐私协议监听及查询隐私签署状态

1）标准元服务

**可通过监听公共事件监听隐私协议**。

```TypeScript
// PrivacySubscribe.ets

import CommonEventManager from '@ohos.commonEventManager';
import { hilog } from '@kit.PerformanceAnalysisKit';

const TAG = 'PrivacySubscribe';

export class PrivacySubscribe {
 private subscriber: CommonEventManager.CommonEventSubscriber | undefined = undefined;
 private subscribeInfo: CommonEventManager.CommonEventSubscribeInfo = {
   events: ['usual.event.PRIVACY_STATE_CHANGED']
 };

 // 订阅隐私协议变化公共事件
 public subscribe(): void {
   CommonEventManager.createSubscriber(this.subscribeInfo, (err, commonEventSubscriber) => {
     if (err) {
       hilog.error(0, TAG, `subscribe failed, code is ${err?.code}, message is ${err?.message}`);
       return;
     } else {
       hilog.info(0, TAG, 'CreateSubscriber Success');
       this.subscriber = commonEventSubscriber;
     }
     if (this.subscriber != undefined) {
       // 订阅公共事件回调
       CommonEventManager.subscribe(this.subscriber, (err, data) => {
         if (err) {
           hilog.error(0, TAG,`SubscribeCallBack failed, code is ${err?.code}, message is ${err?.message}`);
           return;
         } else {
           hilog.info(0, TAG, `SubscribeCallBack Success, data is ${JSON.stringify(data)}`)
           // 事件携带数据ResultType:  1：同意完整模式； 0：未同意
           let result = JSON.parse(data?.data ?? '{}')?.resultType as number;
           this.handleEvent(result)
         }
       });
     }
   });
 }

 private handleEvent(data: number) {
   hilog.info(0, TAG, `handleEvent, data: ${data}`)
   if (data === 1) {
     hilog.info(0, TAG, '用户同意隐私协议');
     // 隐私同意处理
   } else {
     hilog.info(0, TAG, '用户未同意隐私协议');

     // 隐私未同意处理
   }
 }

 // 取消订阅隐私协议变化公共事件
 public unsubscribe(): void {
   if (this.subscriber) {
     CommonEventManager.unsubscribe(this.subscriber, (err) => {
       if (err) {
         hilog.error(0, TAG, `UnsubscribeCallBack failed, code is ${err?.code}, message is ${err?.message}`);
       } else {
         hilog.info(0, TAG, 'UnsubscribeCallBack Success');
         this.subscriber = undefined;
       }
     })
   }
 }
}

// entryability.ets

import { PrivacySubscribe } from '../utils/PrivacySubscribe';

export default class EntryAbility extends UIAbility {
 privacySubscribe: PrivacySubscribe = new PrivacySubscribe();
 onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
   hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onCreate');
   this.privacySubscribe.subscribe();
 }

 // ...

 onWindowStageDestroy(): void {
   hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageDestroy');
   this.privacySubscribe.unsubscribe();
 }
}
```

**查询隐私签署状态**。

```TypeScript
import { privacyManager } from '@kit.StoreKit';

@Entry
@Component
struct MainPage {
 @State privacySubscribeState: string = '';

 build() {
   Navigation() {
     Row() {
       Button('查询协议签署状态')
         .onClick(() => {
           this.privacySubscribeState = JSON.stringify(privacyManager.getAppPrivacyResult(), null, '  ')
         })
     }

     Text(this.privacySubscribeState)
   }
   .title('privacyManagerDemo')
   .hideBackButton(true)
   .titleMode(NavigationTitleMode.Mini)
   .mode(NavigationMode.Stack)
 }
}
```

### 3.3. 同意隐私协议前处理如何处理业务逻辑

从合规角度，必须同意隐私后才能发起网络请求调用，但是当前的实现逻辑是先进入页面的同时弹出隐私弹出框的，需要业务自行判断和处理。

1）延迟初始化，当用户同意时再初始化页面、请求等

```TypeScript
private handleEvent(data: number) {
 hilog.info(0, TAG, `handleEvent, data: ${data}`)
 if (data === 1) {
   hilog.info(0, TAG, '用户同意隐私协议');

   // 隐私同意处理
   setTimeout(() => {
     this.init()
   }, 200)

 } else {
   hilog.info(0, TAG, '用户未同意隐私协议');

   // 隐私未同意处理
 }
}
```

2）未同意隐私协议，不展示页面内容的场景，可通过添加蒙层，通过监听隐私弹框事件，依据返回结果决定蒙层显隐。

```TypeScript
// PrivacySubscribe.ets

import CommonEventManager from '@ohos.commonEventManager';
import { hilog } from '@kit.PerformanceAnalysisKit';

const TAG = 'PrivacySubscribe';

export class PrivacySubscribe {
 // ...

 blurStyle = BlurStyle.Thin
 private handleEvent(data: number) {
   hilog.info(0, TAG, `handleEvent, data: ${data}`)
   if (data === 1) {
     hilog.info(0, TAG, '用户同意隐私协议');
     // 隐私同意处理
     this.blurStyle = BlurStyle.NONE;
   } else {
     hilog.info(0, TAG, '用户未同意隐私协议');
     // 隐私未同意处理
     this.blurStyle = BlurStyle.Thin;
   }
 }

 // ...
}
```

```TypeScript
import { privacyManager } from '@kit.StoreKit';
import { PrivacySubscribe } from '../pages/PrivacySubscribe';

@Entry
@Component
struct Index {
 @State changeValue: string = '';
 @State submitValue: string = '';
 @State privacySubscribe: PrivacySubscribe = new PrivacySubscribe()
 controller: SearchController = new SearchController();

 onPageShow(): void {
   this.getPrivacyResults();
   this.privacySubscribe.subscribe();
 }

 // 获取隐私协议签署状态
 getPrivacyResults() {
   try {
     let appPrivacyResults: privacyManager.AppPrivacyResult[] = privacyManager.getAppPrivacyResult();
     // 1：同意完整模式； 0：未同意
     if (appPrivacyResults.length > 0 && appPrivacyResults[0].result === 1) {
       this.privacySubscribe.blurStyle = BlurStyle.NONE;
     } else {
       this.privacySubscribe.blurStyle = BlurStyle.Thin;
     }
   } catch (error) {
     console.error("GetAppPrivacyResultPublic exception code: " + error.code + ", exception message: " +
     error.message);
   }
 }

 build() {
   Column({ space: 10 }) {
     Search({ value: this.changeValue, placeholder: 'Type to search...', controller: this.controller })
       .searchButton('SEARCH')
       .width('95%')
       .height(40)
       .backgroundColor('# F5F5F5')
       .placeholderColor(Color.Grey)
       .placeholderFont({ size: 14, weight: 400 })
       .textFont({ size: 14, weight: 400 })
       .onSubmit((value: string) => {
         this.submitValue = value;
       })
       .onChange((value: string) => {
         this.changeValue = value;
       })
       .margin(20)

   }
   .height('100%')
   .width('100%')
   .foregroundBlurStyle(this.privacySubscribe.BlurStyle, {
     colorMode: ThemeColorMode.LIGHT,
     adaptiveColor: AdaptiveColor.DEFAULT,
     scale: 0.1
   })
 }
}
```
