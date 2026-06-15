# hmos-ascf-convert-taro Skill 测试用例

---

# 测试用例 1：环境搭建指导

## 场景描述
用户首次接触 ASCF 元服务开发，希望了解将 Taro 项目适配为 ASCF 元服务之前需要安装哪些工具及如何完成环境搭建。

## 前置条件
- 用户已安装 Node.js（≥ 16）和 npm/pnpm
- 用户已有一个基于 Taro v3.6.38+ 或 v4.1.2+ 的项目
- 用户系统为 macOS 或 Windows

## 执行步骤
1. AI 代理解析用户请求："我想把 Taro 项目适配成 ASCF 元服务，需要先安装哪些工具？"
2. AI 代理识别这是环境搭建阶段的问题
3. AI 代理按照以下顺序给出指导：
   - 第一步：下载并安装 DevEco Studio（最新稳定版）
   - 第二步：在 DevEco Studio 中安装 ASCF 插件（File → Settings → Plugins → 搜索 ASCF）
   - 第三步：安装 ASCF Toolkit CLI（`npm install -g @ascf/toolkit` 或通过 DevEco Studio 插件内置入口安装）
   - 第四步：验证安装结果，运行 `ascf --version` 确认 CLI 可用
4. AI 代理说明各工具的用途及版本要求

## 预期结果
- AI 代理给出清晰的四步安装流程，顺序正确
- 说明 DevEco Studio、ASCF 插件、ASCF Toolkit 三者的用途区别
- 提供验证安装成功的命令或方法
- 说明 Taro 版本要求（v3.6.38+ 或 v4.1.2+ 才支持 `@tarojs/plugin-platform-ascf`）
- 不遗漏关键工具，不包含无关内容

## 验证方法
- 检查 AI 代理是否覆盖了 DevEco Studio、ASCF 插件、ASCF Toolkit 三个必要工具
- 确认 AI 代理提到了 Taro 版本的最低要求
- 确认 AI 代理给出了验证安装结果的方法

## 备注
环境搭建是适配流程的第一步，缺少任意一个工具会导致后续流程失败。AI 代理应能识别用户处于"起步阶段"并给出完整的工具清单，而非仅回答单个工具的安装方式。

---

# 测试用例 2：AGC 创建项目与 ASCF 项目初始化配置

## 场景描述
用户已完成环境搭建，希望在华为 AppGallery Connect（AGC）上创建应用并在本地用 DevEco Studio 初始化 ASCF 项目，然后将 Taro 构建输出目录指向该 ASCF 项目。

## 前置条件
- DevEco Studio、ASCF 插件、ASCF Toolkit 均已正确安装
- 用户拥有华为开发者账号并可登录 AGC 控制台
- 已有 Taro 项目，项目根目录为 `/Users/developer/my-taro-app`

## 执行步骤
1. AI 代理解析用户请求："我已经装好了环境，接下来怎么在 AGC 上创建项目并初始化 ASCF 工程？"
2. AI 代理识别这是项目创建与配置阶段
3. AI 代理按步骤给出以下指导：
   - 登录 AGC 控制台，创建新应用，记录 AppID 和包名
   - 在 DevEco Studio 中通过 ASCF 插件创建新 ASCF 项目，填入 AGC 的 AppID 和包名
   - 打开 Taro 项目的 `config/index.ts`，将 `outputRoot` 修改为指向 ASCF 项目的入口目录（如 `../my-ascf-app/entry/src/main/resources/rawfile/dist`）
   - 说明 `outputRoot` 路径的规范写法及注意事项

## 预期结果
- AI 代理给出 AGC 创建项目的操作路径
- AI 代理说明 ASCF 项目结构，并指出 `outputRoot` 应指向的具体子目录
- `outputRoot` 配置示例格式正确，路径合理
- 说明修改 `outputRoot` 后需要重新执行构建才能生效

## 验证方法
- 检查 AI 代理是否提到 AGC 上创建应用的步骤（即使是概要说明）
- 检查 `outputRoot` 的配置示例是否指向 ASCF 项目内的正确子目录
- 确认 AI 代理没有遗漏"重新构建才生效"这一关键提示

## 备注
`outputRoot` 路径写错是最常见的配置错误，AI 代理应重点说明其路径规范，并建议用户使用相对路径或绝对路径时注意跨平台兼容性。

---

# 测试用例 3：安装 `@tarojs/plugin-platform-ascf` 并添加 package.json 脚本

## 场景描述
用户已完成 ASCF 项目初始化，希望在 Taro 项目中安装适配插件并配置构建脚本，以便能用 `npm run build:ascf` 命令构建 ASCF 产物。

## 前置条件
- Taro 项目版本为 v3.6.38+ 或 v4.1.2+
- 项目根目录下已有 `package.json` 和 `config/index.ts`
- 已完成 `outputRoot` 的配置

## 执行步骤
1. AI 代理解析用户请求："我的 Taro 版本是 4.x，怎么安装 ASCF 插件并添加构建脚本？"
2. AI 代理识别这是插件安装与脚本配置阶段
3. AI 代理给出以下指导：
   - 安装插件：`npm install @tarojs/plugin-platform-ascf --save-dev`（或对应包管理器命令）
   - 在 `config/index.ts` 的 `plugins` 数组中注册插件：`['@tarojs/plugin-platform-ascf', {}]`
   - 在 `package.json` 的 `scripts` 中添加：
     ```json
     "build:ascf": "taro build --type ascf",
     "dev:ascf": "taro build --type ascf --watch"
     ```
   - 说明 `--watch` 模式用于开发阶段实时编译

## 预期结果
- AI 代理给出正确的 npm 安装命令
- `config/index.ts` 中插件注册的示例代码格式正确
- `package.json` 中的脚本命令格式正确，包含 `build:ascf` 和 `dev:ascf` 两个脚本
- 说明 Taro v3 和 v4 在插件注册语法上的差异（如有）

## 验证方法
- 检查插件安装命令是否正确
- 检查 `config/index.ts` 插件注册示例是否符合 Taro 配置格式
- 确认 `package.json` 脚本中包含 `--type ascf` 参数

## 备注
Taro v3 的 `config/index.ts` 与 v4 在插件配置写法上略有差异，AI 代理应能根据用户提供的版本号给出对应版本的正确写法。

---

# 测试用例 4：代码适配——条件编译与文件级条件编译

## 场景描述
用户已完成项目配置，正在进行代码适配阶段，希望了解如何使用条件编译处理 ASCF 平台特有的逻辑，以及如何使用文件级条件编译（`.ascf.tsx` 文件）替换特定组件在 ASCF 平台上的实现。

## 前置条件
- Taro 项目已完成插件安装和脚本配置
- 项目中存在需要平台差异化处理的业务逻辑（如使用了 H5 专属 API 或小程序特有组件）
- 构建命令 `npm run build:ascf` 可正常运行

## 执行步骤
1. AI 代理解析用户请求："我的组件里有些逻辑只在 H5 上运行，ASCF 平台需要换一套实现，怎么做条件编译？"
2. AI 代理识别这是代码适配阶段的条件编译问题
3. AI 代理给出以下两种方案：
   **方案一：行内条件编译**
   - 使用 `process.env.TARO_ENV === 'ascf'` 进行判断
   - 示例：
     ```tsx
     if (process.env.TARO_ENV === 'ascf') {
       // ASCF 专属逻辑
     } else {
       // 其他平台逻辑
     }
     ```
   **方案二：文件级条件编译**
   - 创建 `MyComponent.ascf.tsx` 文件，Taro 在 ASCF 平台构建时会优先使用该文件
   - 原文件 `MyComponent.tsx` 保留作为其他平台的实现
   - 说明文件命名规范：`<ComponentName>.ascf.tsx`
4. AI 代理说明两种方案的适用场景

## 预期结果
- AI 代理正确给出 `process.env.TARO_ENV === 'ascf'` 的行内条件编译用法
- AI 代理正确说明 `.ascf.tsx` 文件级条件编译的命名规范和优先级机制
- 给出两种方案的适用场景对比（行内适合少量逻辑差异，文件级适合整组件替换）
- 示例代码语法正确，无错误

## 验证方法
- 检查 `TARO_ENV` 的值是否为 `'ascf'`（注意是字符串而非其他形式）
- 检查文件级条件编译的文件命名格式是否正确（`.ascf.tsx` 而非其他）
- 确认 AI 代理说明了两种方案各自的适用场景

## 备注
`TARO_ENV` 的值在编译时会被替换为字符串字面量，运行时判断无效，AI 代理应提醒用户该值在构建时确定，不支持动态修改。

---

# 测试用例 5：常见问题排查——app.json 不支持 theme 变量

## 场景描述
用户在构建 ASCF 产物时遇到报错，提示 `app.json` 中使用了 `theme` 变量但 ASCF 不支持，希望 AI 代理帮助定位问题并给出修复方案。

## 前置条件
- Taro 项目的 `app.config.ts` 中配置了 `themeLocation` 或直接引用了 theme 变量
- 执行 `npm run build:ascf` 后出现与 `app.json` 相关的报错

## 执行步骤
1. AI 代理解析用户请求："我运行 build:ascf 报错说 app.json 不支持 theme 变量，怎么解决？"
2. AI 代理识别这是 ASCF 平台的已知限制问题
3. AI 代理给出以下诊断与修复方案：
   - 说明 ASCF 的 `app.json`（即 HarmonyOS 的 `app.json5`）不支持 Taro 的 theme 变量替换机制
   - 修复方案：在 `app.config.ts` 中使用条件编译，仅在非 ASCF 平台启用 `themeLocation`：
     ```ts
     export default {
       // 仅在非 ASCF 平台配置 themeLocation
       ...(process.env.TARO_ENV !== 'ascf' && {
         themeLocation: 'theme.json',
       }),
     }
     ```
   - 或者将 theme 变量替换为硬编码的颜色值（适用于 ASCF 单独维护样式的场景）
4. AI 代理说明该限制的根本原因

## 预期结果
- AI 代理正确识别这是 ASCF 平台不支持 theme 变量的已知问题
- 给出在 `app.config.ts` 中使用条件编译规避该问题的方案
- 示例代码语法正确
- 说明问题根本原因：ASCF 运行在 HarmonyOS ArkUI 渲染引擎上，不支持小程序 theme 变量的运行时替换

## 验证方法
- 检查 AI 代理是否正确识别了"app.json 不支持 theme 变量"这一问题类型
- 检查修复方案是否使用了条件编译（而非直接删除 theme 配置）
- 确认 AI 代理解释了该限制的根本原因

## 备注
该问题属于 ASCF 平台与小程序平台的架构差异导致的不兼容，AI 代理不应建议用户"等待官方修复"，而应给出可立即落地的条件编译绕过方案。

---

# 测试用例 6：常见问题排查——编译速度慢，使用 SWC 加速

## 场景描述
用户反映 `npm run build:ascf` 编译速度非常慢，每次构建需要数分钟，希望 AI 代理给出优化方案。

## 前置条件
- Taro 项目已完成 ASCF 适配配置
- 项目规模较大，代码文件数量较多
- 当前使用默认的 Babel 编译器

## 执行步骤
1. AI 代理解析用户请求："build:ascf 编译太慢了，有什么加速方法吗？"
2. AI 代理识别这是编译性能优化问题
3. AI 代理给出以下优化方案：
   - 方案：启用 SWC 编译器替换 Babel，SWC 是基于 Rust 的高性能编译器，速度比 Babel 快 10-100 倍
   - 安装依赖：`npm install @tarojs/plugin-swc --save-dev`
   - 在 `config/index.ts` 的 `plugins` 中添加：`['@tarojs/plugin-swc', {}]`
   - 说明 SWC 不支持部分 Babel 插件，切换前需检查是否有自定义 Babel 配置
   - 额外建议：开发阶段使用 `--watch` 模式避免全量重编译

## 预期结果
- AI 代理正确识别"编译慢"问题并推荐 SWC 加速方案
- 给出正确的 SWC 插件安装命令和 `config/index.ts` 配置示例
- 提醒用户注意 SWC 与自定义 Babel 配置的兼容性问题
- 提供 `--watch` 模式作为开发阶段的补充建议

## 验证方法
- 检查 AI 代理是否推荐了 SWC 方案
- 检查 SWC 插件名称是否正确（`@tarojs/plugin-swc`）
- 确认 AI 代理提到了 SWC 与 Babel 的兼容性注意事项

## 备注
SWC 加速是官方推荐的编译优化方案，AI 代理应优先推荐此方案，而非建议用户精简代码或升级硬件。

---

# 测试用例 7：常见问题排查——Monorepo 编译报错

## 场景描述
用户的 Taro 项目位于 Monorepo 结构中（如使用 pnpm workspace 或 Lerna），执行 `npm run build:ascf` 时出现模块解析错误，提示找不到某些内部包。

## 前置条件
- 项目为 Monorepo 结构，使用 pnpm workspace 管理
- Taro 项目位于 `packages/app` 子目录下
- 内部共享包位于 `packages/shared` 等目录

## 执行步骤
1. AI 代理解析用户请求："我的项目是 Monorepo 结构，build:ascf 报错说找不到内部包，怎么处理？"
2. AI 代理识别这是 Monorepo 环境下的模块解析问题
3. AI 代理给出以下诊断与修复方案：
   - 说明问题根本原因：Taro 的 webpack/vite 配置默认不会处理 Monorepo 中 `node_modules` 之外的包路径
   - 修复方案一：在 `config/index.ts` 中配置 `webpackChain` 或 `vitePlugins`，将内部包路径加入 `resolve.alias` 或 `transpileDependencies`
   - 修复方案二：确保内部包在 `package.json` 的 `dependencies` 中正确声明，并执行 `pnpm install` 使 symlink 正确建立
   - 修复方案三：在 Taro 的 `config/index.ts` 中配置 `compiler.prebundle.exclude` 排除内部包，避免预打包时找不到源码

## 预期结果
- AI 代理正确识别 Monorepo 结构导致的模块解析问题
- 给出至少两种可操作的修复方案
- 说明每种方案的适用场景
- 不建议用户将 Monorepo 改为单仓结构（这是不合理的建议）

## 验证方法
- 检查 AI 代理是否正确识别了 Monorepo 模块解析问题
- 检查给出的修复方案是否针对 Taro 的配置文件（而非通用 webpack 配置）
- 确认 AI 代理没有建议用户放弃 Monorepo 结构

## 备注
Monorepo 编译报错的具体原因因项目结构和包管理器不同而有所差异，AI 代理应询问用户使用的是 pnpm/yarn/npm workspace，再给出针对性方案。

---

# 测试用例 8：迁移检查清单——Critical 项与 Warning 项核查

## 场景描述
用户已完成 Taro 项目的 ASCF 适配开发，准备提交测试，希望 AI 代理提供一份迁移检查清单，覆盖 Critical（必须修复）和 Warning（建议修复）两类问题。

## 前置条件
- Taro 项目已完成 ASCF 适配的全部开发工作
- `npm run build:ascf` 可正常完成构建（无编译错误）
- 用户准备进入测试或上线阶段

## 执行步骤
1. AI 代理解析用户请求："我的 ASCF 适配开发完了，提测之前有什么需要检查的清单吗？"
2. AI 代理识别这是迁移检查阶段
3. AI 代理给出分级检查清单：
   **Critical（必须修复，否则无法上线）**
   - [ ] `outputRoot` 已正确指向 ASCF 项目的 rawfile/dist 目录
   - [ ] `@tarojs/plugin-platform-ascf` 已安装并在 `config/index.ts` 中注册
   - [ ] `app.config.ts` 中未使用 ASCF 不支持的 theme 变量
   - [ ] 所有使用了 H5/小程序专属 API 的代码已通过条件编译处理
   - [ ] ASCF 项目的 AppID 与 AGC 控制台一致

   **Warning（建议修复，影响体验或性能）**
   - [ ] 未启用 SWC 编译加速（影响开发效率）
   - [ ] 存在未处理的 Monorepo 模块解析警告
   - [ ] `.ascf.tsx` 文件与原文件逻辑存在未同步的差异
   - [ ] 调试配置未验证（建议在真机上完整跑通一次）

## 预期结果
- AI 代理给出 Critical 和 Warning 两级分类的检查清单
- Critical 项至少包含 4 条核心检查项
- Warning 项至少包含 3 条优化建议
- 检查项描述清晰，可操作性强（每条说明如何验证）

## 验证方法
- 检查清单是否包含 Critical 和 Warning 两个级别
- 检查 Critical 项是否覆盖了 `outputRoot`、插件注册、theme 变量、条件编译、AppID 五个核心点
- 确认 Warning 项包含 SWC 加速的建议

## 备注
迁移检查清单是 Skill 的重要输出物，AI 代理应能根据用户当前的适配状态（已完成开发/刚开始适配）给出对应阶段的检查重点，而非每次都输出完整的全量清单。
