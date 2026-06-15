---
name: hmos-ascf-convert-taro
description: 辅助开发者将 Taro 项目适配（转换）为 ASCF 元服务。当需要在 Taro（React/Vue）项目中支持 ASCF 元服务平台，或将现有 Taro 项目迁移到 ASCF 时使用此技能。提供完整的环境搭建、项目配置、package.json 脚本、常见问题排查和发布流程。
license: MIT
metadata:
  version: "1.0.1"
  author: ascf
---

## Workflow

### 步骤 1：环境搭建

1. 安装 [DevEco Studio](https://developer.huawei.com/consumer/cn/download/)
2. 安装以下之一：
   - [DevEco Studio ASCF Plugin](https://developer.huawei.com/consumer/cn/download/)
   - [ASCF VSCode 插件](https://marketplace.visualstudio.com/items?itemName=atomicservice.ascf-plugin-vscode)
   - [ASCF Toolkit 命令行工具](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/run-ascf-cli)
3. 参考[开发环境搭建指南](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/ascf-development-process)完成 ASCF 开发环境配置

### 步骤 2：项目适配（转换）配置

**1. 在 AGC 创建元服务项目，获取 AppId**

可选。可以手动指定 bundleName。

**2. 在 Taro 项目根目录创建 ASCF 元服务项目**

使用 hmos-ascf-assistant SKILL 创建项目。或 在当前项目下新建一个目录,`mkdir -p ascf-project && cd ascf-project && ascf generate --tid HelloASCF --appId 111 --appName AscfApp --appNameEn AscfApp --appDesc 测试 --appDescEn Test  --deviceTypes phone ./`，配置好签名信息。新创建项目清空 ascf/ascf_src/* 模板内容。并且将 ascf-project/ascf/*, ascf-project/entry/src/main/resources/rawfile 添加到 .gitignore 中，不需要提交提交。

**3. 修改 `config/index.{js,ts}`，将输出目录指向 ASCF 项目：**

```ts
outputRoot: process.env.TARO_ENV === 'ascf' ? 'ascf-project/ascf/ascf_src' : 'dist'
```

**4. 修改 `package.json`，添加 ASCF 构建脚本：**

```json
{
  "build:ascf": "taro build --type ascf",
  "watch:ascf": "cd ./ascf-project && ascf compile . --serve --logging debug",
  "dev:ascf": "cd ./ascf-project && ascf compile . -c -m --logging debug",
  "run:ascf": "cd ./ascf-project && ascf build assembleAndInstallHap -r . --logging debug",
  "release:ascf": "cd ./ascf-project && ascf compile . -c"
}
```

Taro框架从 v3.6.38 和 v4.1.2 开始支持 @tarojs/plugin-platform-ascf 插件。需要先确保项目中依赖的Taro版本升级到这个版本之上，然后增加dependencies。尽量选择与Taro相同版本的插件版本。

### 步骤 3：代码适配

参考 [Taro 多端编译构建文档](https://docs.taro.zone/docs/envs) 和 [元服务适配指南](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/ascf-development-guide) 进行适配。

**条件编译（隔离 ASCF 专属代码）：**

```tsx
if (process.env.TARO_ENV === 'ascf') {
  // ASCF 元服务专用逻辑
  has.login()
} else if (process.env.TARO_ENV === 'h5') {
  window.location.href = '/login'
}
```

**文件级条件编译：**

```
src/pages/index/
├── index.tsx           # 通用
├── index.ascf.tsx      # ASCF 专用（优先级更高）
├── index.h5.tsx        # H5 专用
├── index.scss          # 通用样式
└── index.ascf.scss     # ASCF 专用样式
```

**全局配置（`src/app.config.ts`）：**

```ts
export default defineAppConfig({
  pages: ['pages/index/index', 'pages/mine/mine'],
  subPackages: [{ root: 'packageA', pages: ['pages/goods/goods'] }],
  window: {
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'App',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    list: [
      { pagePath: 'pages/index/index', text: '首页' },
      { pagePath: 'pages/mine/mine', text: '我的' }
    ]
  }
})
```

---

## Taro 开发速查

需要参考 [](./references/taro-framework.md)

---

## 常见问题

### 适配（转换）问题

**app.json 不支持 theme 变量**

ASCF 的 `app.json` 配置不支持 `@bgColorTop` 等 theme 变量，需改为具体值：

```js
// config/index.ts
const theme = require('./theme.json')
const $t = (key) => process.env.TARO_ENV === 'ascf'
  ? theme?.light?.[key.replace('@', '')]
  : key

window: {
  backgroundColorTop: $t('@bgColorTop'),
  backgroundColorBottom: $t('@bgColorBottom'),
  backgroundTextStyle: $t('@bgTxtStyle'),
  navigationBarBackgroundColor: $t('@navBgColor'),
  navigationBarTitleText: 'App名称',
  navigationBarTextStyle: $t('@navTxtStyle')
}
```

### 编译构建问题

**编译速度慢**

在 Taro 源码目录新增 `ascf.config.json`，开启 swc 加速：

```json
{ "swc": true }
```

**Monorepo 项目编译报错 `Module parse failed`**

```ts
// config/index.ts
mini: {
  compile: {
    include: [
      path.resolve(__dirname, '../../shared/src'),  // 共享包路径
    ],
  },
},
```

同时安装缺失的 Babel 预设：

```bash
pnpm add -D @babel/preset-react @babel/preset-env @babel/preset-typescript
```

### 调试问题

**命令行调试：**

```bash
cd ascf-project
ascf debugger start
```

**VSCode 调试：**

安装 ASCF 插件后，用 VSCode 打开 `ascf-project`，执行 `Start Debugger` 命令。

---

## 决策树

```
遇到问题？
├─ app.json theme 变量报错
│   └─ 用 $t() 函数替换，读取 theme.json 具体值
├─ 编译速度慢
│   └─ ascf.config.json 中添加 { "swc": true }
├─ Monorepo "Module parse failed"
│   └─ 添加 compile.include + 安装 Babel 预设
├─ 导航跳转报错
│   ├─ 非 tabBar 页面误用 switchTab → 改为 navigateTo
│   └─ URL 与 app.config.ts pages 路径不一致
├─ 组件报错
│   └─ 确认从 @tarojs/components 导入（View/Text/Button/Image）
└─ 白屏/运行异常
    └─ 参考开发流程文档调试，或运行 ascf debugger start
```

---

## 迁移检查清单

### Critical
- [ ] `pnpm build:ascf` 编译无报错
- [ ] `outputRoot` 已指向 `ascf-project/ascf/ascf_src`
- [ ] ASCF 专属代码已用 `process.env.TARO_ENV === 'ascf'` 隔离
- [ ] app.json 中无 theme 变量（已替换为具体值）

### Warning
- [ ] Monorepo 共享包已配置 `compile.include`
- [ ] Babel 预设已安装
- [ ] 主要页面在 ASCF 真机/模拟器正常运行

---

## 参考资料

- [ASCF 元服务开发指南](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/ascf-development-guide)
- [Taro 支持 ASCF 元服务指南](https://docs.taro.zone/docs/GETTING-STARTED#ascf%E5%85%83%E6%9C%8D%E5%8A%A1)
- [ASCF 调试指南](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/debug-ascf-code)
- 详细适配（转换）案例：[references/adapter2ascf.md](references/adapter2ascf.md)
