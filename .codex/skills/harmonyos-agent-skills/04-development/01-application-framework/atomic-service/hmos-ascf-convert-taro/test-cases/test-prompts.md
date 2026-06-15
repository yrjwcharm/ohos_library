# hmos-ascf-convert-taro Skill 测试提示词

---

## 基础功能测试

### 测试场景 1：查询环境搭建所需工具
**提示词**：
```
我想把 Taro 项目适配成 ASCF 元服务，需要先安装哪些工具？有没有安装顺序要求？
```

**预期输出**：
- 列出 DevEco Studio、ASCF 插件、ASCF Toolkit CLI 三个必要工具
- 给出推荐的安装顺序（DevEco Studio → ASCF 插件 → ASCF Toolkit）
- 说明 Taro 版本要求（v3.6.38+ 或 v4.1.2+）
- 提供验证安装成功的命令（如 `ascf --version`）

---

### 测试场景 2：查询完整的 Taro 转 ASCF 适配流程
**提示词**：
```
请给我一份从零开始把 Taro 项目适配为 ASCF 元服务的完整步骤，我的 Taro 版本是 4.1.5。
```

**预期输出**：
- 给出分阶段的完整流程（环境搭建 → AGC 创建项目 → ASCF 项目初始化 → 插件安装与配置 → 代码适配 → 迁移检查）
- 因用户指定了 Taro v4.1.5，所有插件安装命令和配置示例应适配 v4 语法
- 提及 `@tarojs/plugin-platform-ascf` 插件的安装与注册
- 提及 `outputRoot` 的配置方式

---

## 项目配置测试

### 测试场景 3：配置 outputRoot 指向 ASCF 项目
**提示词**：
```
我已经用 DevEco Studio 创建了 ASCF 项目，路径是 /Users/developer/my-ascf-app，我的 Taro 项目在 /Users/developer/my-taro-app，怎么配置 outputRoot？
```

**预期输出**：
- 给出 `config/index.ts` 中 `outputRoot` 的修改示例，路径指向 ASCF 项目内的 `entry/src/main/resources/rawfile/dist` 子目录
- 说明该路径是相对路径还是绝对路径，建议使用相对路径提升可移植性
- 提醒修改后需要重新执行 `npm run build:ascf` 才能生效

---

### 测试场景 4：安装并注册 ASCF 平台插件
**提示词**：
```
怎么在 Taro 项目里安装 ASCF 插件并配置 build:ascf 构建命令？
```

**预期输出**：
- 给出 `npm install @tarojs/plugin-platform-ascf --save-dev` 安装命令
- 给出 `config/index.ts` 中 `plugins` 数组注册插件的示例代码
- 给出 `package.json` 中添加 `"build:ascf": "taro build --type ascf"` 和 `"dev:ascf": "taro build --type ascf --watch"` 脚本的示例
- 说明 `--watch` 模式适用于开发阶段

---

## 代码适配测试

### 测试场景 5：行内条件编译处理平台差异逻辑
**提示词**：
```
我有一段代码在 H5 上调用了 window.location.href，但 ASCF 平台没有 window 对象，怎么用条件编译处理这个差异？
```

**预期输出**：
- 给出使用 `process.env.TARO_ENV === 'ascf'` 进行条件判断的代码示例
- 示例中 H5 分支使用 `window.location.href`，ASCF 分支使用 ASCF 平台的路由 API（或提示用户替换为 ASCF 对应方案）
- 说明 `TARO_ENV` 的值在构建时确定，不支持运行时动态修改

---

### 测试场景 6：文件级条件编译替换整个组件
**提示词**：
```
我有一个 VideoPlayer 组件在 ASCF 平台需要完全不同的实现，听说可以用文件级条件编译，具体怎么做？
```

**预期输出**：
- 说明文件命名规范：创建 `VideoPlayer.ascf.tsx` 文件，Taro 在 ASCF 平台构建时会优先使用该文件
- 说明原文件 `VideoPlayer.tsx` 保留作为其他平台的实现，不需要修改
- 给出两个文件并存的目录结构示例
- 说明文件级条件编译适合整组件替换的场景，行内条件编译适合少量逻辑差异的场景

---

### 测试场景 7：全局配置中的平台差异处理
**提示词**：
```
我的 app.config.ts 里设置了 window 的 backgroundTextStyle，ASCF 平台支持吗？如果不支持怎么处理？
```

**预期输出**：
- 说明 ASCF 平台对 `app.config.ts` 中部分全局配置的支持情况（如 `backgroundTextStyle` 在 ASCF 上可能不生效）
- 给出使用条件编译在 `app.config.ts` 中区分平台配置的示例代码
- 建议用户参考 ASCF 官方文档确认各配置项的平台支持情况

---

## 常见问题测试

### 测试场景 8：app.json theme 变量不支持问题
**提示词**：
```
我运行 npm run build:ascf 报错：app.json 中的 @theme 变量无法解析，怎么解决？
```

**预期输出**：
- 正确识别这是 ASCF 平台不支持 theme 变量替换的已知问题
- 给出在 `app.config.ts` 中使用条件编译排除 `themeLocation` 配置的修复方案
- 示例代码中 `process.env.TARO_ENV !== 'ascf'` 条件正确
- 解释问题根本原因（ASCF 运行在 HarmonyOS ArkUI 引擎，不支持小程序 theme 变量机制）

---

### 测试场景 9：编译速度优化
**提示词**：
```
我的项目用 build:ascf 编译一次要 5 分钟，太慢了，有什么加速方法？
```

**预期输出**：
- 推荐启用 SWC 编译器替换默认的 Babel
- 给出 `npm install @tarojs/plugin-swc --save-dev` 安装命令
- 给出在 `config/index.ts` 的 `plugins` 中注册 `@tarojs/plugin-swc` 的配置示例
- 提醒 SWC 与自定义 Babel 配置可能存在不兼容问题，切换前需检查
- 补充建议：开发阶段使用 `dev:ascf`（`--watch` 模式）避免全量重编译

---

### 测试场景 10：Monorepo 编译找不到内部包
**提示词**：
```
我的项目是 pnpm monorepo，build:ascf 报错 Cannot find module '@myapp/shared'，但这个包在 packages/shared 下，怎么处理？
```

**预期输出**：
- 正确识别这是 Monorepo 结构下的模块解析问题
- 给出在 `config/index.ts` 中配置 `resolve.alias` 或 `transpileDependencies` 的修复方案
- 或者建议检查 `packages/shared/package.json` 中 `main`/`exports` 字段是否正确配置
- 说明需要确保 `pnpm install` 后 symlink 正确建立
- 不建议用户放弃 Monorepo 结构

---

## 边界条件测试

### 测试场景 11：Taro 版本不满足要求
**提示词**：
```
我的 Taro 版本是 3.5.12，能不能用 ASCF 插件？
```

**预期输出**：
- 明确告知 Taro v3.5.12 不满足 `@tarojs/plugin-platform-ascf` 的最低版本要求（需 v3.6.38+ 或 v4.1.2+）
- 给出升级 Taro 的建议（升级到 v3.6.38+ 或 v4.1.2+）
- 说明升级 Taro 的基本步骤或提供官方升级文档链接
- 不应建议用户使用不兼容的旧版本强行适配

---

### 测试场景 12：同时适配多个平台
**提示词**：
```
我的 Taro 项目需要同时支持微信小程序、H5 和 ASCF，条件编译会不会影响其他平台的构建？
```

**预期输出**：
- 说明 Taro 的条件编译（`process.env.TARO_ENV`）是构建时替换，不同平台构建时 `TARO_ENV` 值不同（`weapp`/`h5`/`ascf`），互不影响
- 说明 `.ascf.tsx` 文件只在 ASCF 平台构建时生效，不影响微信小程序和 H5 的构建
- 建议用户通过 `npm run build:weapp`、`npm run build:h5`、`npm run build:ascf` 分别验证各平台构建是否正常
- 提示：修改条件编译逻辑后，建议三个平台都重新构建一次进行验证

---

## 错误处理测试

### 测试场景 13：提供不完整的项目信息
**提示词**：
```
我的项目报错了，怎么解决？
```

**预期输出**：
- AI 代理不应直接给出无根据的修复方案
- 应主动追问关键信息：报错信息是什么、Taro 版本、当前执行的命令
- 至少询问用户提供完整的报错日志或错误截图
- 引导用户提供足够的上下文信息后再给出针对性方案

---

### 测试场景 14：用户提供错误的 plugin-platform-ascf 版本
**提示词**：
```
我安装了 @tarojs/plugin-platform-ascf@1.0.0，但 build:ascf 报错说找不到 ascf 平台，这个版本有问题吗？
```

**预期输出**：
- 指出 `@tarojs/plugin-platform-ascf@1.0.0` 可能不是正确的版本号，建议安装最新稳定版
- 给出查询最新版本的命令：`npm view @tarojs/plugin-platform-ascf versions`
- 给出重新安装最新版本的命令
- 建议用户检查 `config/index.ts` 中插件是否已正确注册（常见遗漏）
- 说明即使安装了正确版本，也必须在 `config/index.ts` 的 `plugins` 数组中注册才能生效

---

### 测试场景 15：用户询问调试方法
**提示词**：
```
我的 ASCF 元服务在 DevEco Studio 里无法断点调试，build:ascf 构建出来的代码看不懂，怎么办？
```

**预期输出**：
- 说明需要在 `config/index.ts` 中开启 source map 配置（`sourceMap: true` 或对应的 Taro 配置）
- 说明 DevEco Studio 调试 ASCF 元服务需要安装 ASCF 调试插件并配置调试入口
- 提示使用 `dev:ascf`（`--watch` 模式）配合 DevEco Studio 的热重载进行调试
- 说明 ASCF 调试与小程序调试的主要差异（运行在 HarmonyOS 模拟器或真机，不是浏览器环境）
