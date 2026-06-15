# 使用ASCF命令行工具


ASCF为开发者提供了命令行工具，可用于控制ASCF工具的调试功能以及转换和编译行为。


## 安装命令行工具

通过以下指令，可以安装命令行工具：

```shell
npm install @atomicservice/ascf-toolkit -g
```

并通过“-h”获取使用帮助：

```shell
ascf -h
```


## 转换小程序代码为ASCF框架

通过以下指令，获取ASCF工具转换行为使用帮助：

```shell
ascf convert -h
```

通过“-i”填入小程序的文件目录，以及通过“-o”填入转换后的文件输出目录。转换后请参考[开发指南](../guides/ascf-development-guide.md#适配平台功能和要求)适配平台相关功能和规范要求。

```shell
ascf convert -i .\path\to\miniprogram -o .path\to\atomicservice-project
```


## 编译ASCF源代码

通过以下指令，获取ASCF工具编译行为使用帮助：

```shell
ascf compile -h
```

以下为编译的示例指令：

```shell
ascf compile .\path\to\atomicservice-project
```


## 开启热重载

通过以下指令，启动热重载功能：

```shell
ascf compile .\path\to\atomicservice-project --serve
```

使用热重载功能前，请确保设备已开启“开发中元服务豁免管控”选项（可在[开发者选项](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-developer-mode#section530763213432)中开启）。


## 创建元服务模板项目

通过以下指令，获取ASCF工具创建元服务模板项目行为使用帮助：

```shell
ascf generate -h
```

以下为创建元服务模板项目的示例指令：

```shell
ascf generate .\path\to\atomicservice-project
```

## 命令行指令选项

### 全局参数

| 参数 | 默认值 | 说明 |
| ---- | ---- | ---- |
| -h | - | 获取命令行帮助指南 |
| -c | - | 清理转换输出目录 | 
| --logging=[level] | debug、info（默认）、warn、error | 控制日志打印最低级别 | 

### convert 转换命令

| 参数 | 说明 |
| --- | --- |
| convert | 转换命令 |
| --notaddtodo | 对于不支持的接口不在源码中添加TODO行提示，减少对源码的污染 |

### compile 编译命令

| 参数 |  默认值 | 说明 |
| ---- | ---- | ---- |
| compile | - | 编译命令 |
| -m | - | 开启debug编译 |
| -p | - | 显示当前编译进度 | 
| --swc | - | 使用swc编译js代码，提升编译效率 |
| --devtool=[type] | eval-cheap-source-map | 自定义source map的生成行为 | 
| --templateHoist | - | 将模板提到页面域，减少重复的编译代码，减少包体积 <br/>对于使用Taro框架转换的元服务，需要配置此参数 |
| --skipApiValidator | - | 跳过接口与组件的支持性校验，提升编译性能 |
| --serve | - | 开启热重载功能。<br/>**依赖关系**：<br/>ASCF运行时版本≥1.0.10<br/>ASCF Toolkit版本≥1.0.4<br/>**说明：**<br/>建议在开启热重载功能时，同时使用swc编译，以提升热重载效率。 |
| --disableSubpackages | - | 在debug编译的情况下，将分包合并到主包以提升构建性能。<br/>**依赖关系：**<br/>ASCF Toolkit版本≥1.0.4<br/> **说明：**<br/>可以指定该参数为false关闭此功能，此时在debug编译时，不会将分包合并到主包。|
| -ct<br/> --connectorType | hdc（默认）、adb |设备调试工具类型  在HarmonyOS 4及以下设备上开启热重载功能时，需要指定为adb |

### build 构建命令

| 子命令 | 参数 |  默认值 | 说明 |
| ---- | ---- | ---- | ---- |
| installDeps | -r, --projectRoot | 项目根目录 | 用于安装oh-package.json5文件中所有的依赖 |
| clean | -r, --projectRoot | 项目根目录 | 清理工程下ohpm安装产物y以及清理项目构建产物build目录 |
| assembleHap |-r, --projectRoot<br/> -m, --buildMode | -r默认项目根目录<br/>-m可选值为debug(默认)和release  | 构建Hap、Hsp包 |
| assembleApp | -r, --projectRoot<br/> -m, --buildMode | -r默认项目根目录<br/>-m可选值为debug(默认)和release | 构建App包 |
| assembleAndInstallHap | -r, --projectRoot<br/> -m, --buildMode | r默认项目根目录<br/>-m可选值为debug(默认)和release | 构建Hap、Hsp包并自动安装启动 | 
| installHap | -r, --projectRoot | 项目根目录 | 安装项目已经构建的Hap,Hsp包 |
| uninstall | -r, --projectRoot | 项目根目录 | 卸载项目bundleName的元服务 |
| start | -r, --projectRoot | 项目根目录。| 启动项目bundleName的元服务 |

### generate 创建元服务模板项目

| 参数 | 支持的值 | 说明 |
| ---- | ---- | ---- |
| generate | - | 创建元服务模板项目命令 | 
| --tid | HelloASCF、ASCFDemos | 模板id | 
| --appId | - | 元服务appId |
| --appName | - | 元服务名称 | 
| --appDesc | - | 元服务描述 | 
| --appNameEn | - | 元服务英文名称 | 
| --appDescEn | - | 元服务英文描述 | 
| --deviceTypes | phone、tablet、phone,tablet | 设备类型 | 

## 使用npm包

1. 安装npm包。  

   在package.json所在的ascf_src目录中执行命令安装npm包：

   ```shell
   npm install
   ```

2. 构建 npm。 
 
   通过以下命令构建：

   ```shell
   ascf buildNpm <projectRoot>
   ```

   如果使用DevEco Studio开发ASCF工程， 可以直接使用下面命令构建：

   ```shell
   hvigorw buildNpm
   ```
