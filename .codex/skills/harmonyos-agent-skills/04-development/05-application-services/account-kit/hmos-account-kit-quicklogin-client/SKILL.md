---
name: hmos-account-kit-quicklogin-client
description: 基于 HarmonyOS Account Kit 提供华为账号一键登录客户端接入指引，实现获取匿名手机号接口与华为账号一键登录组件集成。支持获取匿名手机号后一键登录页面跳转、失败Toast提示等。在用户提及"华为账号一键登录"、"接入华为账号一键登录"、"Account Kit一键登录"或要求实现华为账号一键登录功能时使用（当前仅支持原生ArkTS框架）
---

# 华为Account Kit一键登录·客户端开发助手

## 全局规范
1. **最小改动原则**：原有工程代码中，仅修改华为账号一键登录页面跳转相关逻辑，`oh-package.json5`文件无需修改，华为账号一键登录相关接口不需要添加依赖，禁止删除工程内的已有依赖；禁止删除工程内已存在的import语句；
2. **代码生成规范**：华为账号一键登录页面需要严格按照`assets/QuickLoginPage.ets`实现，**禁止更改任何UI样式、属性**。特别注意：`WebPage`页面**必须使用this.getUIContext().getRouter().pushUrl()跳转方式，严禁改为NavDestination跳转**，只需要根据用户要求实现华为账号一键登录页面的跳转逻辑；
3. **语法严格约束**：所有需要被其他文件引用的 `@Component` 组件和 `@CustomDialog` 组件，必须添加 `export` 关键字；
4. **页面跳转规则**：使用`this.getUIContext().getRouter().pushUrl()`方法跳转的页面需要添加到`main_pages.json`文件，且必须与 `main_pages.json` 中的配置**完全一致**，不使用`this.getUIContext().getRouter().pushUrl()`跳转的页面禁止添加；违反此规则会导致页面跳转失败，属于严重BUG。**（特别注意）WebPage协议页面必须使用this.getUIContext().getRouter().pushUrl()跳转方式，严禁改为NavDestination跳转，只有QuickLoginPage可以按工程跳转方式处理**；
5. **华为账号一键登录按钮UI样式**：如提及按钮样式、颜色以及文字样式，请必须参考API接口文档`references/api/account-api-component-manager.md`，以便进行使用正确的接口进行实现；
6. **交付检查与编译报错处理（重要）**：交付前，务必使用`build_project`MCP工具对工程进行编译；如果有编译报错，请使用`check_ets_files`MCP工具对ets文件进行语法检查并修复，直至编译通过；

## 自定义规则
根据输入提取关键信息，如果没有提供，全部使用默认值，如果经过思考，确实有必要询问，则一次提出一个问题，并且尽量是选择题形式

- 华为账号一键登录按钮颜色？
当指定按钮颜色为红、白、黑时，可以使用Style的枚举值，当指定了其它颜色时，params中的style需要使用loginComponentManager.Style.BUTTON_CUSTOM，并且新增customButtonParams，具体API参考见`references/api/account-api-component-manager.md`。若未指定，则默认使用BUTTON_RED。

- 华为账号一键登录页面跳转规则？
若输入未提供，在显性位置（如首页、应用主页靠前位置）添加跳转华为账号一键登录的按钮，点击按钮后，触发获取匿名手机号流程

- 服务端域名地址？
若输入中未提供，保持 `QuickLoginPage.ets` 中的默认值 `http://localhost:8080/huawei/quickLogin/getPhoneNumber` 不变


## 执行流程

### Step 1: 工程项目感知

#### 前置检测步骤：检测是否已接入华为账号一键登录或不支持接入

**检测方法**：
1. 检测工程是否支持接入一键登录 - 使用 `grep` 搜索`AppScope/app.json5`中`bundleType`字段是否为`atomicService`
2. 检测是否已配置一键登录权限 - 使用 `grep` 搜索代码中是否包含 `quickLoginAnonymousPhone` 字符串
3. 检测是否已存在一键登录相关文件 - 使用 `glob` 搜索是否存在 `quicklogin` 目录、`QuickLoginPage.ets`、`WebPage.ets`

**检测判定规则**：如果满足以下**任意一个条件**，判定为已接入或不支持接入：
- ✅ 在`app.json5`找到`bundleType`字段为`atomicService`，提示元服务不支持接入
- ✅ 在工程代码中找到 `quickLoginAnonymousPhone` 相关配置
- ✅ 已存在 `quicklogin` 目录且包含 `QuickLoginPage.ets` 文件

**检测结果处理**：
- **如果检测到已接入**：检测第一步、第二步是否完成，若已完成，立即停止执行流程，输出提示信息；未完成或有缺失，则执行第一步、第二步后，停止执行流程，输出提示信息；
- **如果未检测到已接入**：继续执行后续步骤

### Step 2: 功能开发

#### 第一步：配置网络权限
在 `module.json5` 文件中添加网络访问权限，**禁止添加其他权限**
```json
{
  "requestPermissions": [
    { "name": "ohos.permission.INTERNET" },
    { "name": "ohos.permission.GET_NETWORK_INFO" }
  ],
}
```

#### 第二步：配置代码混淆白名单
若应用开启了代码混淆，应用工程代码中获取到的quickLoginAnonymousPhone（匿名手机号）属性需要配置混淆白名单防止编译release包时被混淆，否则无法获取到匿名手机号。在调用获取匿名手机号方法工程模块的混淆文件obfuscation-rules.txt中添加：
```bash
-enable-property-obfuscation
-keep-property-name
quickLoginAnonymousPhone
```

#### 第三步：新增一键登录页面相关文件
新增`quicklogin`文件夹，优先建立在`entry/src/main/ets/pages`目录下，若工程不存在`entry/src/main/ets/pages`目录，则存放在`entry/src/main/ets`目录下；然后
直接使用`copy`命令将`assets`目录下的`WebPage.ets`、`QuickLoginPage.ets`两个文件全部拷贝至`quicklogin`文件夹下。注意**不要删除代码中的任何注释内容**

#### 第四步：修改华为账号一键登录页面图标资源
修改`QuickLoginPage.ets`页中华为账号一键登录页面中的应用图标资源，更改为输入语句中的资源。若未提供，使用在`entry`模块下的`startIcon.png`文件或其他的合适的资源文件作为华为账号一键登录页面的展示图标，路径如`src/main/resources/base/media/icon.png/startIcon.png`
```ArkTS
Image($r('app.media.startIcon'))
```

#### 第五步：修改华为账号一键登录按钮的颜色及UI样式
当开发者选择华为账号一键登录按钮颜色为红、白、黑时，可以使用loginComponentManager.Style中的枚举值，若未提供，则默认使用BUTTON_RED，无需修改。当用户指定其它颜色时，params中的style需要使用loginComponentManager.Style.BUTTON_CUSTOM，并且新增customButtonParams参数，按照如下方式进行实现：
```ArkTS
LoginWithHuaweiIDButton({
    params: {
    style: loginComponentManager.Style.BUTTON_CUSTOM,
    customButtonParams: {
    backgroundColor: '#9C27B0',
    fontColor: loginComponentManager.FontColor.WHITE,
    },
    extraStyle: {
    buttonStyle: new loginComponentManager.ButtonStyle().loadingStyle({
        show: true
        })
    },
    borderRadius: 24,
    loginType: loginComponentManager.LoginType.QUICK_LOGIN,
    supportDarkMode: true
    },
    controller: this.controller
    })
}
```
如涉及文字等其他样式修改，务必先读取API接口文档`references/api/account-api-component-manager.md`，以确保找到正确的实现方式

#### 第六步：修改华为账号一键登录页面中服务端域名
如果用户在必要输入中提供了服务端域名地址，需要在`QuickLoginPage.ets`文件中替换服务端域名。默认服务端域名为：`http://localhost:8080/huawei/quickLogin/getPhoneNumber`
替换规则：
- 找到 `const baseUrl = 'http://localhost:8080/huawei/quickLogin/getPhoneNumber';` 这一行
- 将默认域名替换为用户提供的服务端域名地址
- 保持路径 `/huawei/quickLogin/getPhoneNumber` 不变，只替换域名部分

**（重要）如果用户未提供服务端域名，则保持默认值不变，不进行任何修改**

#### 第七步：修改华为账号一键登录页面中协议跳转url
修改`QuickLoginPage.ets`文件中`jumpToPrivacyWebView`方法中的协议页url，将占位字符串"替换为main_pages.json中的WebPage页面的实际路径"替换为与`main_pages.json`文件中`WebPage`一致的页面路径。**（严重警告）WebPage协议页面必须使用this.getUIContext().getRouter().pushUrl()跳转方式，严禁改为NavDestination跳转或任何其他跳转方式，违反此规则将导致协议页面无法正常打开**

#### 第八步：实现跳转一键登录页面前点击事件处理（获取匿名手机号）

根据必要输入中提供的触发方式，实现点击事件处理逻辑。核心流程：
1. **在点击事件中调用获取匿名手机号接口**
2. **获取成功后跳转一键登录页面，并传递匿名手机号参数**
3. **获取失败后弹出Toast提示**

##### 实现要点

**1. 导入必要的模块**
```ArkTS
import { authentication } from '@kit.AccountKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { util } from '@kit.ArkTS';
```

**2. 实现获取匿名手机号函数**
```ArkTS
// 获取匿名手机号（预取号）
  async getQuickLoginAnonymousPhone(): Promise<void> {
    // 创建授权请求，并设置参数
    const authRequest = new authentication.HuaweiIDProvider().createAuthorizationWithHuaweiIDRequest();
    // 获取匿名手机号需传quickLoginAnonymousPhone这个scope，传参之前需要先申请"华为账号一键登录"权限，否则会返回1001502014错误码
    authRequest.scopes = ['quickLoginAnonymousPhone'];
    // 用于防跨站点请求伪造
    authRequest.state = util.generateRandomUUID();
    // 一键登录场景该参数必须设置为false
    authRequest.forceAuthorization = false;
    const controller = new authentication.AuthenticationController();
    try {
      controller.executeRequest(authRequest).then((response: authentication.AuthorizationWithHuaweiIDResponse) => {
        // 获取到匿名手机号
        const anonymousPhone = response.data?.extraInfo?.quickLoginAnonymousPhone as string;
        if (anonymousPhone) {
          hilog.info(0x0000, 'testTag', 'Succeeded in authentication.');
          this.navigateToQuickLogin(anonymousPhone);
          return;
        }
        hilog.info(0x0000, 'testTag', 'Succeeded in authentication. AnonymousPhone is empty.');
        // 未获取到匿名手机号，应用需要跳转到其他方式登录页面
      }).catch((error: BusinessError) => {
        this.dealAllError(error);
      })
    } catch (error) {
      this.dealAllError(error as BusinessError);
    }
  }

  // 错误处理
  dealAllError(error: BusinessError): void {
    hilog.error(0x0000, 'testTag',
      `Failed to get quickLoginAnonymousPhone, errorCode is ${error.code}, errorMessage is ${error.message}`);
    // 在应用登录涉及UI交互场景下，建议按照如下错误码指导提示用户
    if (error.code === ErrorCode.ERROR_CODE_LOGIN_OUT) {
      // 华为账号未登录，应用需要展示其他登录方式
      this.showToast("华为账号未登录，请重试");
    } else if (error.code === ErrorCode.ERROR_CODE_NETWORK_ERROR) {
      // 网络异常，请检查当前网络状态并重试或展示其他登录方式
      this.showToast('服务或网络异常，请稍后重试');
    } else if (error.code === ErrorCode.ERROR_CODE_INTERNAL_ERROR) {
      // 登录失败，应用需要展示其他登录方式
      this.showToast("登录失败，应用需要展示其他登录方式");
    } else if (error.code === ErrorCode.ERROR_CODE_SYSTEM_SERVICE) {
      // 系统服务异常，应用需要展示其他登录方式
      this.showToast("系统服务异常，应用需要展示其他登录方式");
    } else if (error.code === ErrorCode.ERROR_CODE_REQUEST_REFUSE) {
      // 重复请求，应用无需处理
      hilog.info(0x0000, 'testTag', '重复请求，应用无需处理.');
    } else if (error.code === ErrorCode.ERROR_CODE_CLIENTID_ERROR) {
      // clientId或者profile证书设置不正确
      this.showToast("clientId或者profile证书设置不正确");
    } else {
      // 应用登录失败，应用需要展示其他登录方式
      this.showToast("系统服务异常，应用需要展示其他登录方式");
    }
  }

// Toast提示
  showToast(resource: string) {
    try {
      this.getUIContext().getPromptAction().showToast({
        message: resource,
        duration: 2000
      });
    } catch (error) {
      const message = (error as BusinessError).message
      const code = (error as BusinessError).code
      hilog.error(0x0000, 'testTag', `showToast args  errCode is ${code}, errMessage is ${message}`);
    }
  }
```

**3. 实现页面跳转函数**
```ArkTS
navigateToQuickLogin(anonymousPhone: string): void {
    // 根据工程跳转方式实现跳转逻辑，具体实现参考第九步
}
```

**4. 在点击事件中调用**
```ArkTS
// 示例：按钮点击事件
Button('一键登录')
  .onClick(() => {
    this.getQuickLoginAnonymousPhone();
  })

// 示例：头像点击事件
Image($r('app.media.avatar'))
  .onClick(() => {
    this.getQuickLoginAnonymousPhone();
  })

// 示例：昵称点击事件
Text('用户昵称')
  .onClick(() => {
    this.getQuickLoginAnonymousPhone();
  })
```

#### 第九步：实现华为账号一键登录页面的跳转逻辑

**（重要约束）本步骤只处理华为账号一键登录页面QuickLoginPage的跳转逻辑，WebPage协议页面必须保持使用this.getUIContext().getRouter().pushUrl()跳转方式，严禁对WebPage进行任何跳转方式修改**

根据工程实际使用的跳转方式，实现华为账号一键登录页面`QuickLoginPage`的跳转，需要将
第八步中获取到的匿名手机号，传递给`QuickLoginPage`进行展示

##### 确定跳转方式

使用 `hmos-arkui-develop-skill` 学习页面路由跳转规则，并分析当前工程的页面跳转方式，确定是使用 router 模式还是 NavDestination 模式。

##### Router模式实现

如果工程使用 router 模式：
- QuickLoginPage 需要添加 `@Entry` 装饰器
- 需要在 main_pages.json 中配置页面路径
- 使用 `this.getUIContext().getRouter().pushUrl()` 进行跳转
- `QuickLoginPage`中需要接收匿名手机号参数anonymousPhone
```ArkTS
// 接收匿名手机号参数anonymousPhone
@State anonymousPhone: string = (this.getUIContext().getRouter().getParams() as Record<string, string>)?.['anonymousPhone'] ?? '';
```

##### NavDestination模式实现

- NavPathStack不需要import

- @Consume与@Provider需要配套使用，需要结合实际工程

- 可以参考工程其他组件使用NavPathStack的方式

- **必须创建 QuickLoginRoot 根组件**
```ArkTS
// 创建 QuickLoginRoot 根组件
import { QuickLoginPage } from '../QuickLoginPage';

@Component
export struct QuickLoginRoot {
  // 根据实际需要传递页面栈
  params?: Record<string, string>;
  
  build() {
    NavDestination() {
      QuickLoginPage({ anonymousPhone: this?.params?.anonymousPhone ?? '' })
    }
    .hideTitleBar(true)
    .onBackPressed(() => {
      this.appPathStack.pop();
      return true;
    })
  }
}
```
- 跳转统一使用：`navPathStack.pushPathByName('目标页名', { 参数对象 })`。
```ArkTS
// 在 getAnonymousPhoneNumber 成功后调用使用该方法进行页面跳转
  navigateToQuickLogin(anonymousPhone: string): void {
    this.appPathStack.pushPathByName('QuickLoginRoot', { "anonymousPhone": anonymousPhone } as Record<string, string>, null);
  }
```
- 路由映射Navigation绑定.navDestination(this.PageMap)后，PageMap方法会接收来自this.appPathStack.pushPathByName()中的`{ "anonymousPhone": anonymousPhone } as Record<string, string>`参数，因跳转`QuickLoginRoot`页面需要传递匿名手机号参数，因此PageMap需要携带参数，例如：
```ArkTS
@Builder
export function PageMap(name: string, params: Record<string, string>) {
  if (name === '页面1') {
    // 页面1
    PageOne()
  }
  else if (name === 'QuickLoginRoot') {
    // QuickLoginRoot页面
    QuickLoginRoot({params: params})
  }
  else {
    // 页面3
    PageThree({params: params})
  }
}
```

- 在`QuickLoginPage`中需要接收`QuickLoginRoot`中传来的匿名手机号参数`anonymousPhone`，注意aboutToAppear方法中严禁
```ArkTS
// 接收匿名手机号参数anonymousPhone
@State anonymousPhone: string = '';
```

- 使用NavDestination模式时，禁止在`main_pages.json5`中添加`QuickLoginPage`页面路径，此场景下`QuickLoginPage`页面也无需添加@Entry装饰器

### Step 3: 代码审查
- 协议页跳转检查，检查`QuickLoginPage.ets`文件中`jumpToPrivacyWebView`方法中的url有无替换为`WebPage.ets`基于`entry/src/main/ets`的相对路径，且该路径应该与`main_pages.json`保持一致，如不一致，请按照该规则进行修改。
- 一键登录页面跳转检查，若一键登录页面使用NavDestation模式跳转，则应该检查页面栈的传递是否正确，如使用了@Consume或@Provider，则需要配套使用，否则直接传递页面栈变量即可。如不确定，请参考参考工程其他组件使用NavPathStack的方式。

### Step 4: 项目编译
必须使用`deveco-mcp`的`build_project`MCP工具对工程进行编译；如果有编译报错，请使用`check_ets_files`MCP工具对ets文件进行语法检查并修复，修复后仍需使用`build_project`MCP工具对工程进行编译，直至编译通过，修复过程中如果对鸿蒙相关知识不理解，可以使用`harmonyos_knowledge_search`MCP工具进行查询
| tool_name  | 主要功能  |
|---|---|
|`harmonyos_knowledge_search`|查询鸿蒙云端知识库|
|`check_ets_files`|对ets文件进行语法检查|
|`build_project`|进行项目构建|

## 输出模板

### 情况1：检测到已接入华为账号一键登录

```markdown
### 结论
您的工程已接入华为账号一键登录，无需重复实现。

### 检测结果
- 已检测到一键登录相关配置/文件/代码

### 建议
- 如需更新或修复一键登录功能，请说明具体需求
```

### 情况2：未检测到接入，且接入流程执行完毕

```markdown
### 结论
[一句话说明当前是否可接入/可发布/已定位问题]

### 执行清单
- 已完成：
  - [item]
- 待完成：
  - [item]

### 风险与阻塞
- [风险或阻塞项]

### 配置信息
- APP图标资源：[用户提供的资源路径或默认值]
- 触发方式：[用户提供的触发方式或默认值]
- 服务端域名：[用户提供的域名或默认值]

## 注意事项
- 请确保已经完成配置应用签名、包名（与开发者联盟注册信息一致），若未配置签名和指纹，将报错1001500001 应用指纹证书校验失败。
- 请确保已经已完成申请一键登录权限，并通过审批，若未申请"华为账号一键登录"权限，将报错1001502014 应用未申请scopes或permissions权限。

### 下一步
1. 编译运行应用，验证华为账号一键登录页面功能与页面跳转逻辑
2. 修改服务端地址（QuickLoginPage.ets中的baseUrl），用于换取明文手机号
3. 补充登录成功后的业务逻辑（QuickLoginPage.ets中调用this.getPhoneNumber换取明文手机号之后）
4. 应用完成开发后，可参照以下标准检查集成华为账号一键登录后的用户体验是否符合预期：https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-phone-unionid-login#开发后验证
```

## 常见问题与反例

### 反例1：页面跳转后显示空白页面（严重BUG）

**问题描述**：
在NavDestination模式下，点击登录按钮后成功跳转，但目标页面显示为空白，华为账号一键登录页面内容无法正常显示。

**错误原因**：
跳转时使用的页面名称与PageMap中注册的页面名称不一致，导致路由匹配失败。

**错误代码示例**：
```ArkTS
// PrepareLoginPage.ets - 错误的跳转代码
private jumpLoginPage(quickLoginAnonymousPhone: string) {
  const params: Record<string, Object> = { 'anonymousPhone': quickLoginAnonymousPhone };
  this.pageInfos?.pushPathByName('QuickLoginPage', params, true); // ❌ 错误：使用了错误的页面名
}

// HomePage.ets - PageMap注册
@Builder
PageMap(name: string, params: Record<string, Object>) {
  if (name === 'QuickLoginRoot') { // ✅ 正确：注册的页面名是'QuickLoginRoot'
    QuickLoginRoot({
      pageInfos: this.pageInfos,
      params: params as Record<string, string>
    });
  }
}
```

**问题分析**：
1. 跳转时使用`'QuickLoginPage'`作为页面名
2. PageMap中只注册了`'QuickLoginRoot'`，没有`'QuickLoginPage'`的映射
3. 路由系统找不到匹配的页面，导致页面无法渲染，显示空白

**正确修复方案**：
```ArkTS
// PrepareLoginPage.ets - 正确的跳转代码
private jumpLoginPage(quickLoginAnonymousPhone: string) {
  const params: Record<string, Object> = { 'anonymousPhone': quickLoginAnonymousPhone };
  this.pageInfos?.pushPathByName('QuickLoginRoot', params, true); // ✅ 修复：使用正确的页面名'QuickLoginRoot'
}
```

**预防措施**：
1. 在NavDestination模式下，必须使用`QuickLoginRoot`作为跳转目标页面名
2. `QuickLoginPage`是内部组件，不应直接作为路由目标
3. PageMap中注册的页面名必须与跳转时使用的页面名完全一致（区分大小写）
4. 每次修改跳转逻辑后，务必检查页面名称的一致性
5. NavDestination模式下跳转页面名必须与PageMap注册的页面名完全一致，否则会导致页面空白

**检查清单**：
- [ ] 跳转语句中的页面名是否与PageMap注册的页面名一致
- [ ] 是否使用`'QuickLoginRoot'`作为NavDestination模式下的跳转目标
- [ ] 参数传递对象是否正确构造
- [ ] 是否已编译并测试页面跳转功能

## 华为账号一键登录常见错误码及处理建议

|错误码|错误描述|处理建议|
|---|---|---|
|1001502001|用户未登录华为账号|提示用户先登录华为系统账号，或提供其他登录方式|
|1001500001|应用指纹证书校验失败|检查应用签名、包名与华为开发者联盟配置一致|
|1001502005|网络异常|提示用户检查网络状态，重试登录|
|1001500003|不支持该权限（如海外账号）|提示用户该账号不支持一键登录，提供其他登录方式|
|1001502012|用户取消|提示用户取消了一键登录流程，无需特别处理|
|1001502003|参数错误|clientId或者profile证书设置不正确|

- 错误码处理：可根据实际业务需求，对不同错误码（如用户取消授权、网络异常等）做个性化提示
- 若因权限等问题调用预取号接口报错，无法返回匿名手机号，则一键登录页面无法展示，若调试阶段想先预览下一键登录页面效果，则可先将预取号接口返回值写为固定值，如188******88

## 附加资源
### 页面模板
- **`assets/QuickLoginPage.ets`** — 华为账号一键登录页面组件模板
- **`assets/WebPage.ets`** — 协议页面组件模板

### 参考文档
- **`references/api/account-api-component-manager.md`** — 华为账号一键登录组件 API 接口文档

### 扩展资料
- 官网接入入口：`https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-kit-guide`