# ASCF Toolkit CLI 参考

## 安装

```bash
# 国内网络可先配置镜像：npm config set registry https://registry.npmmirror.com
npm i -g @atomicservice/ascf-toolkit
```

验证安装：`ascf --version`

## 环境要求

| 依赖 | 版本要求 | 说明 |
|------|---------|------|
| Node.js | >= 16.0.0 | 运行时环境 |
| Java | >= 17 | 打包 HAP/App 时必需 |
| DevEco Studio / command-line-tools | — | 须配置 `DEVECO_SDK_HOME` 环境变量（永久生效，确保子进程可用） |

## 命令总览

```
ascf [options] [command]

Options:
  -V, --version              输出版本号
  --logging [level]          日志级别：debug, info, warn, error, fatal（默认 info）
  -d, --debug                启用调试日志
  -h, --help                 显示帮助

Commands:
  generate <projectRoot>     创建 ASCF 项目
  compile <projectRoot>      编译 ASCF 项目
  convert                    转换小程序为 ASCF 项目
  buildNpm <projectRoot>     构建 npm 依赖到 miniprogram_npm
  build                      构建/安装/运行/卸载/清缓存
  debugger                   启动/停止调试器
```

## 命令详解

### generate — 创建项目

```bash
ascf generate --tid HelloASCF --appId 111 --appName AscfApp --appNameEn AscfApp --appDesc 测试 --appDescEn Test --deviceTypes phone <projectRoot>
```

| 参数 | 必填 | 说明 |
|------|------|------|
| `--tid` | 是 | 固定为 `HelloASCF`，不可更改 |
| `--appId` | 是 | 应用 ID |
| `--appName` | 是 | 应用名称（**纯英文**） |
| `--appNameEn` | 是 | 英文应用名称（**纯英文**） |
| `--appDesc` | 是 | 应用描述 |
| `--appDescEn` | 是 | 英文应用描述 |
| `--deviceTypes` | 是 | 设备类型，如 `phone` |
| `<projectRoot>` | 是 | 项目生成目录（须为空目录） |

**创建后必做：**
1. 修改 `AppScope/app.json5` 中的 `bundleName`
2. 修改 `build-profile.json5` 中 `app.signingConfigs` 的签名信息
3. 运行 `ascf build installDeps` 安装项目依赖
4. 在 `ascf/ascf_src/` 下创建 `ascf.config.json`，建议开启 SWC 加速：`{"swc": true}`

说明：如果ascf工具没有安装，也可以基于../scripts/templates/HelloASCF拷贝创建项目。

### compile — 编译项目

```bash
ascf compile [options] <projectRoot>
```

| 选项 | 说明 |
|------|------|
| `-c` | 清除缓存后编译 |
| `-m` | debug 模式编译（默认）；不加 `-m` 为 release |
| `--serve` | 开启热更新 |

示例：
```bash
ascf compile -c -m .          # debug 编译当前目录
ascf compile -c .             # release 编译当前目录
ascf compile -c -m --serve .  # debug 编译 + 热更新
```

### convert — 转换小程序

```bash
ascf convert -i <inputPath> -o <outputPath> [-c]
```

> `inputPath`为小程序项目路径， `outputPath`为输出的ASCF元服务路径。如果`outputPath`目录不存在，需先使用`ascf generate` 先创建一个ASCF项目,并且这个项目的根目录作为`outputPath`，再追加-c命令转换。
> `outputPath`不能是`inputPath`的子目录，可以改为`inputPath`的上级目录。

| 选项 | 说明 |
|------|------|
| `-i` | 小程序项目路径 |
| `-o` | 输出的 ASCF 项目路径 |
| `-c` | 自动清理 `ascf/ascf_src` 中的内容（谨慎使用） |
| `--notaddtodo` | 不修改 js 文件（用于混淆文件的转换） |

> 如果 `outputPath` 目录不存在，需先用 `ascf generate` 创建 ASCF 项目，再执行转换。
> 如果 `inputPath` 下无 `project.config.json` 但有 `app.json`，可自动创建 `project.config.json`（内容为 `{"miniprogramRoot": "./"}`）。

### build — 构建/安装/运行

```bash
ascf build <subcommand> [-m debug|release]
```

| 子命令 | 说明 |
|--------|------|
| `installDeps` | 安装项目依赖（创建项目后必需） |
| `assembleHap` | 打包 HAP 包（需已配置签名） |
| `assembleApp` | 打包 App 包（需已配置签名） |
| `assembleAndInstallHap` | 打包并安装到设备（需 `hdc` 已连接设备） |
| `start` | 重启已安装的元服务（需 `hdc` 已连接设备） |
| `uninstall` | 卸载元服务（需 `hdc` 已连接设备） |
| `clean` | 清除 hvigor/ohpm 缓存 |

> 打包前须确认 `build-profile.json5` 中 `app.signingConfigs` 已配置签名信息。
> 设备操作（assembleAndInstallHap/start/uninstall）需确保 `hdc` 可用且 `hdc list targets` 已连接设备。

### buildNpm — 构建 npm 依赖

```bash
ascf buildNpm <projectRoot>
```

在 `ascf/ascf_src` 目录下 `npm install <包名>` 安装 npm 包后，运行此命令构建到 `miniprogram_npm`。

### debugger — 调试

```bash
ascf debugger start   # 启动调试，终端输出逻辑层调试地址
ascf debugger stop    # 停止调试（报错时先 stop 再 start）
```

- 逻辑层：终端输出的 debug server url
- 视图层：`chrome://inspect`
- 前置条件：`hdc` 可用且已连接设备

## ascf.config.json 配置

位于 `ascf/ascf_src/ascf.config.json`，用于自定义编译和构建行为。

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `swc` | Boolean | `false` | 使用 SWC 替代 Babel，显著提升构建速度 |
| `templateHoist` | Boolean | `false` | 优化 Taro 等框架的构建 |
| `disableSubpackages` | Boolean | `false` | debug 模式下合并分包，便于调试 |
| `skipApiValidator` | Boolean | `false` | 跳过 API/组件校验（不建议发布前使用） |
| `logging` | String | `"info"` | 最低日志级别：debug/info/warn/error |
| `devtool` | String | `"eval-cheap-source-map"` | Source Map 模式 |
| `cache` | Boolean/Object | `true` | 构建缓存开关 |
| `ascfDebugger` | String | `""` | 设为 `"brk"` 在首行断点 |
| `compileMode` | String | `"ascf"` | `ascf`（ASCF 项目）或 `wx`（小程序直接编译） |
| `packOptions.ignore` | Array | `[]` | 打包忽略规则（type: file/folder/suffix/prefix/regexp/glob + value） |
| `externalSwcHelpers` | Boolean | `false` | SWC helpers 外部化引用 |
| `emptyJsonpName` | Array | `[]` | Taro 框架的 jsonpFunction 名称列表 |
| `experimental.cacheBaseHxml` | Boolean | `false` | 启用 base.hxml 缓存加速 |

**常用配置示例：**

```json
// 推荐：开启 SWC 加速
{ "swc": true }

// Taro 项目优化
{ "swc": true, "templateHoist": true }

// 调试模式
{ "disableSubpackages": true, "ascfDebugger": "brk", "logging": "debug" }

// 打包忽略测试文件
{ "packOptions": { "ignore": [{ "type": "suffix", "value": ".test.js" }, { "type": "folder", "value": "__tests__" }] } }
```
