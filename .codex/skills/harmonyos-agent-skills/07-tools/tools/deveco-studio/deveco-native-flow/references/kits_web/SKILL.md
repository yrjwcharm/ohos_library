---
name: kits_web
description: "HarmonyOS ArkWeb Web组件能力集使用规范。包含 Web 组件、WebView 控制器、网页加载、JavaScript交互、Cookie管理等功能。Use when: (1) 加载网页，(2) WebView交互，(3) JS桥接，(4) 网页调试。Triggers: 网页、WebView、浏览器、HTML、JavaScript、Web组件、webview、@ohos.web.webview。"
user-invocable: false
---

# ArkWeb 网页能力集 (kits_web)

本 skill 覆盖 HarmonyOS **ArkWeb** 网页能力集的使用规范。

## 能力列表

| 模块 | 导入方式 | 用途 |
|------|----------|------|
| webview | @ohos.web.webview | WebView控制 |
| Web组件 | arkui内置组件 | 网页显示 |

## 快速索引

### 基础Web组件

```typescript
import webview from '@ohos.web.webview';

@Entry
@Component
struct WebPage {
  controller: webview.WebviewController = new webview.WebviewController();

  build() {
    Column() {
      Web({ src: 'https://www.example.com', controller: this.controller })
        .width('100%')
        .height('100%')
        .javaScriptAccess(true)           // 启用JS
        .domStorageAccess(true)           // 启用DOM存储
        .fileAccess(true)                 // 允许文件访问
        .imageAccess(true)                // 允许图片自动加载
        .mixedMode(MixedMode.All)         // 允许混合内容
        .cacheMode(CacheMode.Default)     // 缓存模式
        .userAgent('MyApp/1.0')           // 自定义UA
        .zoomAccess(true)                 // 允许缩放
        .geolocationAccess(true)          // 允许地理位置
        .onPageBegin((event) => {
          console.log('Page begin: ' + event?.url);
        })
        .onPageEnd((event) => {
          console.log('Page end: ' + event?.url);
        })
        .onProgressChange((event) => {
          console.log('Loading: ' + event?.newProgress + '%');
        })
        .onErrorReceive((event) => {
          console.error('Error: ' + event?.error.getErrorInfo());
        })
    }
  }
}
```

### 加载本地HTML

```typescript
Web({ src: $rawfile('index.html'), controller: this.controller })
  .width('100%')
  .height('100%')

// 或加载资源
let htmlData = '<html><body><h1>Hello</h1></body></html>';
this.controller.loadData(htmlData, 'text/html', 'UTF-8');
```

### 页面控制

```typescript
// 导航控制
this.controller.forward();           // 前进
this.controller.backward();          // 后退
this.controller.refresh();           // 刷新
this.controller.stop();              // 停止加载

// 页面信息
let url = await this.controller.getUrl();
let title = await this.controller.getTitle();
let historyList = await this.controller.getHistoryList();

// 清除历史
this.controller.clearHistory();

// 页面缩放
this.controller.zoomIn();
this.controller.zoomOut();
let scale = await this.controller.getPageZoomRatio();
```

### JavaScript 交互

```typescript
// 注入JS代码
this.controller.runJavaScript('document.body.style.backgroundColor = "red"');

// 执行JS并获取返回值
this.controller.runJavaScript('document.title', (result: string) => {
  console.log('Page title: ' + result);
});

// 注册JS端可调用的对象
class WebBridge {
  @WebCallable
  showToast(message: string): void {
    console.log('JS called: ' + message);
  }

  @WebCallable
  getUserInfo(): string {
    return JSON.stringify({ id: 123, name: 'User' });
  }
}

// Web组件配置
Web({ src: '...', controller: this.controller })
  .javaScriptProxy({
    object: new WebBridge(),
    name: 'nativeBridge',
    methodList: ['showToast', 'getUserInfo']
  })

// HTML中的调用
// <script>
//   window.nativeBridge.showToast('Hello from JS');
//   var user = window.nativeBridge.getUserInfo();
// </script>
```

### 网页消息通信

```typescript
// 发送消息到网页
this.controller.postMessage('Hello Web');

// 接收网页消息
Web({ src: '...', controller: this.controller })
  .onMessage((event) => {
    console.log('Message from web: ' + event?.data);
  })

// 网页端发送消息
// <script>
//   window.postMessage('Hello Native');
// </script>
```

### Cookie 管理

```typescript
import webview from '@ohos.web.webview';

// 获取Cookie管理器
let cookieManager = webview.WebCookieManager;

// 设置Cookie
cookieManager.saveCookie('https://example.com', 'session=abc123');

// 获取Cookie
let cookies = await cookieManager.getCookie('https://example.com');

// 清除所有Cookie
cookieManager.clearAllCookie();

// 清除特定网站的Cookie
cookieManager.clearCookie('https://example.com');

// 允许第三方Cookie
cookieManager.setAcceptThirdPartyCookie('https://example.com', true);
```

### 网页弹窗处理

```typescript
Web({ src: '...', controller: this.controller })
  // JavaScript alert
  .onAlert((event) => {
    console.log('Alert: ' + event?.message);
    event?.handle.cancel();  // 取消弹窗
    // event?.handle.confirm();  // 确认
    return true;  // 返回true表示已处理
  })
  // JavaScript confirm
  .onConfirm((event) => {
    console.log('Confirm: ' + event?.message);
    event?.handle.confirm();  // 或 event?.handle.cancel()
    return true;
  })
  // JavaScript prompt
  .onPrompt((event) => {
    console.log('Prompt: ' + event?.message);
    event?.handle.handlePromptConfirm('user input');
    return true;
  })
  // 文件选择
  .onFileSelectorShow((event) => {
    // 处理文件选择
    let fileList = ['/path/to/file'];
    event?.result.handleFileList(fileList);
    return true;
  })
  // 网页全屏请求
  .onFullScreenEnter((event) => {
    console.log('Enter fullscreen');
    event?.handler.enterFullScreen();
  })
  .onFullScreenExit(() => {
    console.log('Exit fullscreen');
  })
```

### 下载处理

```typescript
Web({ src: '...', controller: this.controller })
  .onDownloadStart((event) => {
    console.log('Download URL: ' + event?.url);
    console.log('User agent: ' + event?.userAgent);
    console.log('Content disposition: ' + event?.contentDisposition);
    console.log('Mimetype: ' + event?.mimetype);
    console.log('Content length: ' + event?.contentLength);

    // 可以在这里启动下载任务
  })
```

### 新窗口处理

```typescript
Web({ src: '...', controller: this.controller })
  .onUrlLoadIntercept((event) => {
    console.log('URL intercept: ' + event?.data.getUrl());

    // 返回true阻止加载，false允许加载
    return false;
  })
  .onWindowNew((event) => {
    console.log('New window: ' + event?.targetUrl);

    // 可以打开新页面
    // router.pushUrl({ url: 'pages/WebPage', params: { url: event.targetUrl } });

    event?.handler.setWebController(newController);
  })
```

### 网页调试

```typescript
// 开启调试模式（开发时使用）
webview.WebviewController.setWebDebuggingAccess(true);

// 获取网页内容
let html = await this.controller.getPageText();
let source = await this.controller.getPageSource();

// 性能监控
Web({ src: '...', controller: this.controller })
  .onResourceLoad((event) => {
    console.log('Resource loaded: ' + event?.url);
  })
```

### UserAgent 管理

```typescript
// 获取默认UA
let defaultUA = await this.controller.getUserAgent();

// 自定义UA
Web({ src: '...', controller: this.controller })
  .userAgent('Mozilla/5.0 (Linux; Android 10; ...) AppleWebKit/537.36')

// 追加UA
let customUA = defaultUA + ' MyApp/1.0';
```

## 使用示例

### 完整浏览器组件

```typescript
import webview from '@ohos.web.webview';
import promptAction from '@ohos.promptAction';

@Entry
@Component
struct BrowserPage {
  controller: webview.WebviewController = new webview.WebviewController();
  @State url: string = 'https://www.example.com';
  @State inputUrl: string = '';
  @State progress: number = 0;
  @State canGoBack: boolean = false;
  @State canGoForward: boolean = false;

  aboutToAppear(): void {
    webview.WebviewController.setWebDebuggingAccess(true);
  }

  build() {
    Column() {
      // 地址栏
      Row() {
        TextInput({ text: this.inputUrl, placeholder: '输入网址' })
          .layoutWeight(1)
          .onChange((value) => { this.inputUrl = value; })
          .onSubmit(() => {
            this.url = this.inputUrl.startsWith('http') ? this.inputUrl : 'https://' + this.inputUrl;
          })

        Button('Go')
          .onClick(() => {
            this.url = this.inputUrl.startsWith('http') ? this.inputUrl : 'https://' + this.inputUrl;
          })
      }
      .width('100%')
      .padding(10)

      // 进度条
      if (this.progress > 0 && this.progress < 100) {
        Progress({ value: this.progress, total: 100 })
          .width('100%')
          .height(3)
          .color('#007DFF')
      }

      // Web组件
      Web({ src: this.url, controller: this.controller })
        .layoutWeight(1)
        .width('100%')
        .javaScriptAccess(true)
        .domStorageAccess(true)
        .onProgressChange((event) => {
          this.progress = event?.newProgress || 0;
        })
        .onPageEnd(async () => {
          this.canGoBack = this.controller.accessBackward();
          this.canGoForward = this.controller.accessForward();
          this.inputUrl = await this.controller.getUrl();
        })
        .onErrorReceive((event) => {
          promptAction.showToast({ message: '加载失败: ' + event?.error.getErrorInfo() });
        })

      // 底部工具栏
      Row({ space: 30 }) {
        Button('←')
          .enabled(this.canGoBack)
          .onClick(() => this.controller.backward())

        Button('→')
          .enabled(this.canGoForward)
          .onClick(() => this.controller.forward())

        Button('⟳')
          .onClick(() => this.controller.refresh())

        Button('⌂')
          .onClick(() => { this.url = 'https://www.example.com'; })
      }
      .width('100%')
      .height(50)
      .justifyContent(FlexAlign.Center)
    }
  }
}
```

### JS桥接示例

```typescript
import webview from '@ohos.web.webview';

// 定义桥接类
class AppBridge {
  private context: Context;

  constructor(context: Context) {
    this.context = context;
  }

  @WebCallable
  openNewPage(url: string): void {
    // 打开新页面
    router.pushUrl({ url: url });
  }

  @WebCallable
  getToken(): string {
    // 获取存储的token
    return preferences.getString('token', '');
  }

  @WebCallable
  saveData(key: string, value: string): void {
    // 保存数据
    preferences.putString(key, value);
  }

  @WebCallable
  takePhoto(): void {
    // 调用相机
    // ...
  }

  @WebCallable
  getLocation(): string {
    // 获取位置
    return JSON.stringify({ latitude: 39.9, longitude: 116.4 });
  }
}

@Entry
@Component
struct HybridPage {
  controller: webview.WebviewController = new webview.WebviewController();
  private bridge: AppBridge = new AppBridge(getContext(this));

  build() {
    Column() {
      Web({ src: $rawfile('index.html'), controller: this.controller })
        .width('100%')
        .height('100%')
        .javaScriptAccess(true)
        .javaScriptProxy({
          object: this.bridge,
          name: 'appBridge',
          methodList: ['openNewPage', 'getToken', 'saveData', 'takePhoto', 'getLocation']
        })
        .onPageBegin(() => {
          // 页面加载开始，可以注入初始化代码
          this.controller.runJavaScript(`
            window.appVersion = '1.0.0';
          `);
        })
    }
  }
}
```

## 权限配置

```json
{
  "module": {
    "requestPermissions": [
      { "name": "ohos.permission.INTERNET" },
      { "name": "ohos.permission.GET_NETWORK_INFO" },
      { "name": "ohos.permission.GEOLOCATION" }
    ]
  }
}
```

## Web组件常用属性

| 属性 | 说明 | 默认值 |
|------|------|--------|
| javaScriptAccess | 启用JavaScript | true |
| domStorageAccess | 启用DOM存储 | false |
| fileAccess | 允许文件访问 | true |
| imageAccess | 允许图片自动加载 | true |
| mixedMode | 混合内容模式 | MixedMode.None |
| cacheMode | 缓存模式 | CacheMode.Default |
| zoomAccess | 允许缩放 | true |
| geolocationAccess | 允许地理位置 | false |
| mediaPlayGestureAccess | 媒体手势要求 | false |
| multiWindowAccess | 多窗口支持 | false |

## CacheMode 枚举

```typescript
enum CacheMode {
  Default = 0,    // 使用默认缓存策略
  None = 1,       // 不使用缓存
  Online = 2,     // 优先使用网络
  Only = 3        // 仅使用缓存
}
```

## 最佳实践

1. **WebView内存管理**：
```typescript
aboutToDisappear(): void {
  // 清理WebView资源
  this.controller.stop();
  webview.WebCookieManager.clearAllCookie();
}
```

2. **网络异常处理**：
```typescript
.onErrorReceive((event) => {
  // 加载错误页面
  this.controller.loadData(
    '<html><body><h1>加载失败</h1><button onclick="location.reload()">重试</button></body></html>',
    'text/html',
    'UTF-8'
  );
})
```

3. **安全配置**：
```typescript
Web({ src: '...', controller: this.controller })
  .mixedMode(MixedMode.None)          // 禁止混合内容
  .fileAccess(false)                  // 禁止本地文件访问
  .javaScriptAccess(true)
  .onSslErrorReceive((event) => {
    event?.handler.cancel();          // 拒绝SSL错误
  })
```

## 注意事项

1. 加载https混合内容需要配置mixedMode
2. JS桥接方法需要在Web组件初始化时注册
3. Cookie是全局共享的
4. 调试模式仅在开发阶段开启
5. 网页中的alert/confirm/prompt需要手动处理