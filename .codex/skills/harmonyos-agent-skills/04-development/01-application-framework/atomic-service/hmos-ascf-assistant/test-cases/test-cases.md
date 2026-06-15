# hmos-ascf-assistant 测试用例

---

# 测试用例 1：创建 ASCF 元服务项目

## 场景描述
用户希望新建一个名为 ShopApp 的 ASCF 元服务项目，指定输出目录为 `/Users/developer/projects/ShopApp`，设备类型为手机。

## 前置条件
- 已全局安装 `@atomicservice/ascf-toolkit`（`npm i -g @atomicservice/ascf-toolkit`）
- 目标目录 `/Users/developer/projects/ShopApp` 为空目录或不存在
- Node.js 16.0.0 或更高版本已安装

## 执行步骤
1. AI 代理解析用户请求："帮我创建一个名为 ShopApp 的 ASCF 元服务项目，路径为 /Users/developer/projects/ShopApp"
2. AI 代理识别关键词"创建 ASCF 元服务项目"，确定需要调用 `ascf generate` 命令
3. AI 代理使用默认参数构造命令：
   ```bash
   ascf generate --tid HelloASCF --appId 111 --appName ShopApp --appNameEn ShopApp --appDesc 测试 --appDescEn Test --deviceTypes phone /Users/developer/projects/ShopApp
   ```
4. AI 代理提醒用户项目创建后需进入目录执行安装依赖：
   ```bash
   ascf build installDeps
   ```
5. AI 代理提示用户修改 `AppScope/app.json5` 中的 `bundleName` 以及 `build-profile.json5` 中 `app.signingConfigs` 的签名信息

## 预期结果
- AI 代理给出正确的 `ascf generate` 命令，包含所有必填参数（`--tid HelloASCF`、`--appId`、`--appName`、`--appNameEn`、`--appDesc`、`--appDescEn`、`--deviceTypes`）
- `--tid` 固定为 `HelloASCF`，不随用户输入改变
- `--appName` 和 `--appNameEn` 均为纯英文
- AI 代理主动提示后续需要执行 `ascf build installDeps` 安装依赖
- AI 代理提示修改签名配置和 bundleName

## 验证方法
- 检查 AI 代理给出的命令中 `--tid` 是否固定为 `HelloASCF`
- 确认 `--appName` 和 `--appNameEn` 均为纯英文，无中文字符
- 确认命令包含 `--appId`、`--appDesc`、`--appDescEn`、`--deviceTypes` 参数
- 确认 AI 代理给出了 `ascf build installDeps` 安装依赖的提示
- 确认 AI 代理提示了签名配置的修改要求

## 备注
- `--tid` 参数固定为 `HelloASCF`，不可更改，这是常见的错误点
- 若用户提供的 appName 含中文，AI 代理应自动转换或提示使用纯英文

---

# 测试用例 2：编译并运行 ASCF 元服务

## 场景描述
用户希望在 debug 模式下编译并运行已有的 ASCF 元服务项目，项目路径为 `/Users/developer/projects/ShopApp`。

## 前置条件
- ASCF 元服务项目已存在于 `/Users/developer/projects/ShopApp`
- `ascf-toolkit` 已安装
- 已连接调试设备或模拟器

## 执行步骤
1. AI 代理解析用户请求："帮我编译运行 /Users/developer/projects/ShopApp 这个项目"
2. AI 代理识别关键词"编译运行"，确定需要先编译后安装
3. AI 代理给出编译命令（debug 模式，加 `-m` 参数）：
   ```bash
   ascf compile -c -m /Users/developer/projects/ShopApp
   ```
4. 编译完成后，AI 代理给出打包安装命令：
   ```bash
   # 在 ascf 项目目录下执行
   ascf build assembleAndInstallHap
   ```
5. 安装后，AI 代理给出启动命令：
   ```bash
   ascf build start
   ```

## 预期结果
- AI 代理正确区分编译（`ascf compile`）和运行（`ascf build assembleAndInstallHap` + `ascf build start`）两个阶段
- debug 模式下 `ascf compile` 使用 `-m` 参数
- AI 代理按步骤顺序给出命令，不会颠倒顺序
- 对于热更新需求，AI 代理能说明可加 `--serve` 参数

## 验证方法
- 确认 `ascf compile` 命令包含 `-c` 和 `-m` 参数（debug 模式）
- 确认 AI 代理给出了安装和启动的完整流程
- 验证命令顺序：编译 → 安装 → 启动

## 备注
- release 编译不加 `-m` 参数，AI 代理需根据用户需求正确区分
- 热更新功能需加 `--serve` 参数

---

# 测试用例 3：调试、打包与卸载 ASCF 元服务

## 场景描述
用户依次需要：（1）开启调试器检查页面元素；（2）打包为 HAP 包上传测试；（3）卸载设备上的元服务。

## 前置条件
- ASCF 元服务项目已存在
- 当前工作目录为 ASCF 项目根目录
- `build-profile.json5` 中已配置签名信息（打包时必需）

## 执行步骤
1. **调试阶段**：AI 代理解析"调试页面"/"检查元素"关键词，给出启动调试器命令：
   ```bash
   ascf debugger start
   ```
   并说明：终端会打印逻辑层调试地址，视图层调试地址为 `chrome://inspect`

2. **若调试器报错**，AI 代理提示先停止再重启：
   ```bash
   ascf debugger stop
   # 然后重新执行
   ascf debugger start
   ```

3. **打包阶段**：AI 代理解析"打包成 HAP 包"关键词，先确认签名配置，再给出打包命令：
   ```bash
   ascf build assembleHap
   ```

4. **卸载阶段**：AI 代理解析"卸载"/"删除元服务"关键词，给出卸载命令：
   ```bash
   ascf build uninstall
   ```

## 预期结果
- AI 代理对"调试"关键词给出 `ascf debugger start` 命令，并说明调试地址
- AI 代理在打包前提示确认签名配置是否已完成
- AI 代理对"卸载"关键词给出 `ascf build uninstall` 命令
- AI 代理能区分打包 HAP（`assembleHap`）和打包 App（`assembleApp`）的不同场景

## 验证方法
- 确认"调试"相关请求触发 `ascf debugger start`
- 确认打包命令前有签名确认提示
- 确认"卸载"请求触发 `ascf build uninstall`
- 确认 AI 代理能说明逻辑层与视图层的调试地址区别

## 备注
- 调试器报错时，停止后重试是标准处理流程
- 打包 release 包时需加 `-m=release` 参数

---

# 测试用例 4：接入华为账号登录与支付能力

## 场景描述
用户正在开发一个电商类 ASCF 元服务，需要：（1）接入华为账号静默登录；（2）接入华为支付能力处理实物商品购买。

## 前置条件
- ASCF 元服务项目已创建
- 已在 AppGallery Connect 申请注册元服务
- 元服务含账号体系和支付流程

## 执行步骤
1. **账号登录**：AI 代理解析"接入华为账号登录"请求，给出以下指导：
   - 使用华为账号 API 进行静默登录，减少对用户的干扰
   - 元服务界面不允许出现"登录"等字样
   - 元服务自有账号可通过手机号与华为账号建立关联
   - 参考文档：[账号登录](https://developer.huawei.com/consumer/cn/doc/atomic-guides/account-atomic-silent-login)
   - 在 ASCF 框架中实现请参考：[获取华为账号用户信息](develop-huawei-id-retrieval.md)

2. **手机号授权**：AI 代理说明须在用户明确同意前提下申请手机号授权，不允许在用户未开始使用时即申请

3. **支付能力**：AI 代理解析"接入支付"请求，区分两种场景：
   - 实物商品：须使用 Payment Kit
   - 数字商品：须使用 IAP Kit
   - 参考文档：[接入支付服务](develop-payment-access.md)

## 预期结果
- AI 代理明确指出元服务须使用华为账号静默登录，不允许自行设计登录界面
- AI 代理区分实物商品（Payment Kit）和数字商品（IAP Kit）的支付方案
- AI 代理提示遵守规范：界面不出现"登录"字样、不在首次启动时强制申请权限
- AI 代理给出相关文档链接或参考资料

## 验证方法
- 确认 AI 代理给出华为账号静默登录的正确使用方式
- 确认 AI 代理区分了实物/数字商品的支付 Kit 选择
- 确认 AI 代理提到了设计规范要求（如不出现"登录"字样）
- 确认 AI 代理说明了手机号授权的合规要求

## 备注
- 账号和支付能力均有严格的平台规范要求，AI 代理需同时提供技术实现和合规说明
- 隐私托管是元服务的强制要求，AI 代理应一并提及

---

# 测试用例 5：将微信小程序转换为 ASCF 元服务

## 场景描述
用户有一个现有的微信小程序项目（位于 `/Users/developer/wechat-miniapp`），希望将其转换为 ASCF 元服务，输出到 `/Users/developer/ascf-output`。

## 前置条件
- 微信小程序项目已存在于 `/Users/developer/wechat-miniapp`
- 项目目录下有 `project.config.json` 文件（或有 `app.json` 可自动创建）
- `ascf-toolkit` 已安装
- 输出目录 `/Users/developer/ascf-output` 为空目录或不存在

## 执行步骤
1. AI 代理解析用户请求："将 /Users/developer/wechat-miniapp 转换为 ASCF 元服务，输出到 /Users/developer/ascf-output"

2. AI 代理检查输出目录是否存在：若不存在，先用 `ascf generate` 创建 ASCF 基础项目：
   ```bash
   ascf generate --tid HelloASCF --appId 111 --appName MiniApp --appNameEn MiniApp --appDesc 测试 --appDescEn Test --deviceTypes phone /Users/developer/ascf-output
   ```

3. AI 代理给出转换命令：
   ```bash
   ascf convert -i -c /Users/developer/wechat-miniapp -o /Users/developer/ascf-output
   ```

4. AI 代理说明自动转换规则：
   - `.wxml` → `.hxml`，`wx:` 属性替换为 `has:`
   - `.wxss` → `.css`
   - `.wxs` → `.hjs`
   - `.js` 中的 `wx.` 替换为 `has.`
   - `.json` 保持不变

5. AI 代理提示转换后需要处理的事项：
   - 查看 `ascf/ascf_src/transform.log` 了解不支持的接口
   - 用浏览器打开 `ascf/ascf_src/_ascfConvertReport/index.html` 查看转换报告
   - 替换小程序平台特有接口（登录、支付等）为华为元服务对应接口
   - 根据语法差异调整代码（let 作用域、变量定义、function/package 关键字等）
   - 修改非整型 px 单位值为整型（如 0.5px → 1px）

6. AI 代理提示若项目依赖了 vant-weapp 等 npm 库，需将 `node_modules` 中的小程序源码拷贝到源码目录

## 预期结果
- AI 代理在输出目录不存在时，先给出 `ascf generate` 命令创建基础项目
- AI 代理给出正确的 `ascf convert -i -c $InputPath -o $OutputPath` 命令
- AI 代理说明四类文件的转换对应关系（.wxml/.wxss/.wxs/.js）
- AI 代理提示查看转换日志和转换报告
- AI 代理提示转换后仍需手动适配平台特有接口

## 验证方法
- 确认转换命令包含 `-i -c` 参数和正确的输入/输出路径
- 确认 AI 代理提到了 `transform.log` 和转换报告 HTML 文件的位置
- 确认 AI 代理给出了文件类型转换规则说明
- 若输出目录不存在，确认 AI 代理给出了先执行 `ascf generate` 的提示

## 备注
- 若小程序项目目录下无 `project.config.json` 但有 `app.json`，可自动创建内容为 `{"miniprogramRoot": "./"}` 的 `project.config.json`
- 对含混淆代码的 js 文件，可加 `--notaddtodo` 参数避免代码错乱

---
