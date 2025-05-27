## UtilsHelper
___
#### 简介
**utils_helper** 这是一款致力于提升HarmonyNext开发效率的开源插件，包含了诸多常用开发工具类
***如：  `「设备信息、base64Util、应用沙盒文件FileUtil、GlobalContext全局内存、phoneUtil手机号正则、IdCardUtil身份证正则、键值型数据库KvUtil
日志工具LogUtil、字符串StrUtil、UrlHelper查询url参数、跳转系统设置WantUtil等
工具类」`***

### ***版本更新：请重点查看更新日志！！！***

#### 下载安装

`ohpm install @ohos_lib/utils_helper`

####  初始化使用
```typescript
onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
AppUtil.init(this.context);
}
```

### 📂API

| API工具类      | 工具类描述                        |
|:------------|:-----------------------------|
| AppUtil     | APP应用包名信息                    |
| WindowUtil  | 窗口沉浸式工具类                     |
| FileUtil    | 文件操作相关工具类                    |
| DeviceUtil  | 应用设备信息                       |
| PreviewUtil | 文件预览工具类                      |
| LogUtil     | 日志工具类                        |
| WantUtil    | Want工具类                      |
| KvUtil      | 键值型数据库工具类                    |
| PrefUtil    | PrefUtil（用户首选项）工具类           |
| JSONUtil    | JSON工具类                      |
| Base64Util  | Base64工具类                    |
| StrUtil     | 字符串工具类                       |
| IdCardUtil  | 身份证正则                        |
| PhoneUtil   | 手机号正则                        |
| debounce    | @装饰器   @debounce(300)  防抖工具类 |
| throttle    | @装饰器   @throttle(300)  节流工具类 |
| ToastUtil   | 吐司工具类（promptAction）          |

## 🌏开源协议

本项目基于 [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0.html) ，在拷贝和借鉴代码时，请大家务必注明出处。
