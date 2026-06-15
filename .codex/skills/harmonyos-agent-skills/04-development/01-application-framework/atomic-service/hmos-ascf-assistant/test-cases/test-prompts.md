# hmos-ascf-assistant 测试提示词

---

## 基础功能测试

### 测试场景 1：创建 ASCF 元服务项目（完整参数）
**提示词**：
```
帮我创建一个 ASCF 元服务项目，应用名称是 TravelApp，输出到 /Users/developer/projects/TravelApp
```

**预期输出**：
- 给出包含所有必填参数的 `ascf generate` 命令
- `--tid` 固定为 `HelloASCF`
- `--appName` 和 `--appNameEn` 均为纯英文（TravelApp）
- 包含 `--appId`、`--appDesc`、`--appDescEn`、`--deviceTypes phone` 参数
- 提示项目创建后需执行 `ascf build installDeps` 安装依赖
- 提示修改 `AppScope/app.json5` 中的 `bundleName` 和签名配置

---

### 测试场景 2：编译 ASCF 项目（debug 模式）
**提示词**：
```
编译运行我的 ASCF 项目，路径是 /Users/developer/projects/ShopApp
```

**预期输出**：
- 给出 `ascf compile -c -m /Users/developer/projects/ShopApp` 命令（debug 模式含 `-m` 参数）
- 说明 debug 模式和 release 模式的区别（release 不加 `-m`）
- 可选：提示热更新功能需加 `--serve` 参数

---

### 测试场景 3：打包 HAP 包
**提示词**：
```
帮我把当前 ASCF 项目打包成 HAP 包
```

**预期输出**：
- 在给出打包命令前，先提示确认 `build-profile.json5` 中签名配置是否已完成
- 给出 `ascf build assembleHap` 命令
- 说明 HAP 包和 App 包的区别（`assembleHap` vs `assembleApp`）

---

### 测试场景 4：安装依赖与使用 npm 包
**提示词**：
```
我的 ASCF 项目如何安装 npm 包？想用 dayjs 这个库
```

**预期输出**：
- 第一步：在 `ascf_src` 目录下执行 `npm install dayjs`
- 第二步：执行 `ascf buildNpm <projectRoot>` 构建 npm 依赖
- 说明必须先 npm install 再 buildNpm，顺序不可颠倒

---

## 平台能力测试

### 测试场景 5：接入华为账号登录
**提示词**：
```
我的 ASCF 元服务需要实现用户登录功能，该怎么做？
```

**预期输出**：
- 说明元服务须使用华为账号静默登录 API，不允许自行设计登录弹窗
- 明确指出元服务界面不允许出现"登录"等字样
- 说明自有账号可通过手机号与华为账号关联
- 给出参考文档链接或 API 名称
- 提示手机号授权需在用户明确同意前提下进行

---

### 测试场景 6：接入支付能力
**提示词**：
```
我的元服务要做购物支付功能，需要支持商品购买，如何接入支付？
```

**预期输出**：
- 区分实物商品（Payment Kit）和数字商品（IAP Kit）两种方案
- 给出对应的参考文档或实现指引
- 提示涉及支付的元服务须使用华为支付能力，不允许第三方支付替代

---

### 测试场景 7：接入定位能力
**提示词**：
```
我的 ASCF 元服务需要获取用户当前位置，如何实现？
```

**预期输出**：
- 说明使用 `has.getLocation` 获取精确位置，或 `has.getFuzzyLocation` 获取模糊位置
- 提示调用定位接口前需先进行用户授权
- 列出相关接口：`has.openLocation`、`has.getLocation`、`has.getFuzzyLocation`、`has.chooseLocation`
- 说明使用地图展示须使用华为 Map Kit

---

### 测试场景 8：使用 web-view 组件
**提示词**：
```
我想在 ASCF 元服务里嵌入一个网页，应该怎么做？
```

**预期输出**：
- 说明须使用 `web-view` 组件实现网页嵌入
- 给出 web-view 组件的基本用法或示例
- 参考指引：`develop-web-view.md`

---

## 小程序转换测试

### 测试场景 9：微信小程序转换为 ASCF
**提示词**：
```
我有一个微信小程序项目在 /Users/dev/wx-mini，想转成 ASCF 元服务，输出到 /Users/dev/ascf-shop
```

**预期输出**：
- 若输出目录不存在，先给出 `ascf generate` 创建基础项目的命令
- 给出 `ascf convert -i -c /Users/dev/wx-mini -o /Users/dev/ascf-shop` 命令
- 说明文件转换规则：`.wxml` → `.hxml`，`wx:` → `has:`，`.wxss` → `.css`，`.wxs` → `.hjs`，`.js` 中 `wx.` → `has.`
- 提示查看 `transform.log` 和 `_ascfConvertReport/index.html` 处理不兼容接口

---

### 测试场景 10：支付宝小程序转换为 ASCF
**提示词**：
```
我有一个支付宝小程序，想转换为 ASCF 元服务，需要注意什么？
```

**预期输出**：
- 给出 `ascf convert` 转换命令
- 特别说明支付宝小程序转换的注意事项：
  - 自定义组件默认无法直接使用页面样式，如需使用须声明 `options: {styleIsolation: 'isolated'}`
  - slot 定义处的 class 在 ASCF 中不生效，需单独处理
  - 暂不支持 `$page`、`$slots` 属性，需移除相关逻辑
- 提示转换后仍需适配登录、支付等平台特有接口

---

### 测试场景 11：小程序依赖 vant-weapp 等 npm 组件库的转换
**提示词**：
```
我的微信小程序用了 vant-weapp 组件库，转换 ASCF 时需要怎么处理？
```

**预期输出**：
- 说明需要将 `node_modules` 中的小程序源码拷贝到源码目录，便于转换工具处理
- 提示使用 ASCF 工具链提供的拷贝转换方法（参考 `buildNpm` 相关文档）
- 说明转换后还需执行 `ascf buildNpm` 构建 npm 依赖

---

## 跨框架适配测试

### 测试场景 12：uni-app 项目适配 ASCF
**提示词**：
```
我的 uni-app 项目如何编译为 ASCF 元服务？
```

**预期输出**：
- 说明使用 `MP-HARMONY` 条件编译隔离元服务平台代码
- 给出条件编译示例：`// #ifdef MP-HARMONY` 和 `// #endif`
- 说明编译产物 `dist/build/mp-harmony` 需拷贝到 `ascf/ascf_src` 目录
- 提示后续仍需适配华为平台功能（账号、支付、隐私托管等）

---

### 测试场景 13：Taro 项目适配 ASCF
**提示词**：
```
我用 Taro 开发了一个小程序，怎么把它适配成 ASCF 元服务？
```

**预期输出**：
- 说明 Taro >= 4.1.5 才支持 ASCF
- 给出条件编译示例：`process.env.TARO_ENV === 'ascf'`
- 说明编译产物放置到 ASCF 工程的 `ascf/ascf_src` 目录后参考 Hello ASCF 工程调试
- 提示平台功能适配（AGC 注册、华为账号、支付等）

---

## 边界条件测试

### 测试场景 14：appName 含中文
**提示词**：
```
帮我创建一个 ASCF 元服务项目，应用名叫"旅行助手"，输出到 /Users/dev/travel
```

**预期输出**：
- AI 代理识别到 `--appName` 不能含中文
- 提示用户 `appName` 和 `appNameEn` 必须为纯英文
- 建议用 TravelAssistant 或类似的英文名替代
- 不直接使用中文字符生成命令

---

### 测试场景 15：清除缓存
**提示词**：
```
我的 ASCF 项目编译有问题，想清掉 hvigor 和 ohpm 缓存重新来
```

**预期输出**：
- 给出 `ascf build clean` 命令
- 说明该命令在 ASCF 项目目录下执行
- 可选：建议清除缓存后重新执行编译命令

---

### 测试场景 16：调试器无法启动
**提示词**：
```
我运行 ascf debugger start 报错了，怎么解决？
```

**预期输出**：
- 给出标准处理流程：先停止再重启
  ```bash
  ascf debugger stop
  ascf debugger start
  ```
- 说明调试地址：终端打印的链接为逻辑层调试地址，视图层调试地址为 `chrome://inspect`

---

## 错误处理测试

### 测试场景 17：ascf 命令未安装
**提示词**：
```
我运行 ascf generate 提示命令不存在
```

**预期输出**：
- 给出安装命令：`npm i -g @atomicservice/ascf-toolkit`
- 说明国内网络可使用镜像：`npm config set registry https://registry.npmmirror.com`
- 提示安装后可运行 `ascf -h` 验证安装成功
- 说明环境要求：Node.js >= 16.0.0

---

### 测试场景 18：打包时未配置签名
**提示词**：
```
我执行 ascf build assembleHap 打包失败，提示签名相关错误
```

**预期输出**：
- 说明打包需要先配置 `build-profile.json5` 中 `app.signingConfigs` 的签名信息
- 提示在 DevEco Studio 或 AppGallery Connect 中配置证书和签名文件
- 提示环境变量 `DEVECO_SDK_HOME` 需正确配置

---

### 测试场景 19：转换目录不存在
**提示词**：
```
把 /Users/dev/wx-project 转换为 ASCF，但是输出目录 /Users/dev/new-ascf 还不存在
```

**预期输出**：
- AI 代理识别到输出目录不存在的情况
- 先给出 `ascf generate` 命令创建基础 ASCF 项目到目标目录
- 再给出 `ascf convert -i -c /Users/dev/wx-project -o /Users/dev/new-ascf` 转换命令
- 两个步骤的顺序不能颠倒

---

### 测试场景 20：小程序无 project.config.json 文件
**提示词**：
```
我的小程序目录下没有 project.config.json 文件，只有 app.json，转换会失败吗？
```

**预期输出**：
- 说明若目录下有 `app.json` 但无 `project.config.json`，可自动创建 `project.config.json`
- 给出文件内容：`{"miniprogramRoot": "./"}`
- 说明创建后即可正常执行转换命令
