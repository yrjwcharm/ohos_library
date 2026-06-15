# 项目json配置

通过项目配置文件可以配置编译行为，方便开发者使用编译工具。

> **注意：**
> 
> 当开发者使用hvigor插件参数或者命令行参数控制编译行为与项目配置文件相冲突时，将会按照参数优先级覆写。
> 
> 参数优先级为：用户自定义(hvigor插件参数或者命令行参数) &gt; 个人配置文件(ascf.private.config.json) &gt; 配置文件(ascf.config.json) &gt; ascf系统默认。

**依赖关系**：ASCF Toolkit版本≥1.0.4

1. 可以在项目根目录下新建ascf.config.json和ascf.private.config.json文件对项目进行配置。

2. 可以在asc.config.json 文件中配置公共的配置，在ascf.private.config.json配置个人的配置，可以将ascf.private.config.json写到.gitignore避免版本管理的冲突。

| 属性 | 类型 | 描述 |
| -------- | -------- | -------- |
| packOptions | Object | 打包配置选项。 |
| swc | boolean | 默认使用babel编译，开启后使用swc编译，提升编译构建性能。<br/>**依赖关系**：ASCF Toolkit版本≥1.0.9 |
| templateHoist | boolean | 类Taro框架（采用了base.hxml模板技术）情况下设置为true，可减少重复的编译代码，减少包体积。<br/>**依赖关系**：ASCF Toolkit版本≥1.0.9 |
| disableSubpackages | boolean | 在debug编译的情况下，将分包合并到主包以提升构建性能。<br/>**依赖关系**：ASCF Toolkit版本≥1.0.9 |
| skipApiValidator | boolean | 跳过接口与组件的支持性校验，提升编译性能。<br/>**依赖关系**：ASCF Toolkit版本≥1.0.9 |
| logging | string | 控制日志打印最低级别，level从低到高为：<br/>- debug：调试<br/>- info：信息<br/>- warn：警告<br/>- error：错误<br/>**默认值**：info。<br/>**依赖关系**：ASCF Toolkit版本≥1.0.9 |
| devtool | string | 自定义Source Map的生成行为。type取值为Source Map的生成方式。<br/>**默认值**：eval-cheap-source-map<br/>**依赖关系**：ASCF Toolkit版本≥1.0.9 |
| cache | boolean \| Object | 支持false关闭，默认开启。参考webpack的cache配置。<br/>**依赖关系**：ASCF Toolkit版本≥1.0.9 |
| ascfDebugger | string | 配置为brk，会开启首行断点。<br/>**依赖关系**：ASCF Toolkit版本≥1.0.9 |
| externalSwcHelpers | boolean | \@swc/helpers的external模式纠错构建路径。仅swc功能异常情况下配置false关闭。<br/>**依赖关系**：ASCF Toolkit版本≥1.0.9 |
| compileMode | string | 配置编译运行的项目类型。可选值 ascf、wx，默认值ascf。<br/>**依赖关系**：ASCF Toolkit版本≥1.0.16 |
| emptyJsonpName| Array | 当存在多个Taro包并开启热更新时需要配置为对应Taro包中Webpack配置的output.jsonpFunction。 <br/>**依赖关系**：ASCF Toolkit版本≥1.0.16 |
| enableDevtools| boolean | 是否开启ASCF Console调试工具，可根据项目实际情况，控制在不同环境下是否开启。默认关闭 <br/>**依赖关系**：ASCF Toolkit版本≥1.0.17 |
| [launchOptions](#launchOptions) | Object | 元服务启动参数。仅ascf.private.config.json配置有效。<br/>**依赖关系**：ASCF Toolkit版本≥1.0.17 |
| [experimental](#experimental) | Object | 实验性功能配置。<br/>**依赖关系**：ASCF Toolkit版本≥1.0.9 |

## packOptions

可以使用packOptions.ignore字段，对指定的文件或者文件夹跳过编译打包，这些文件或文件夹将不会出现在编译产物中。

| 属性 | 类型 | 描述 |
| -------- | -------- | -------- |
| value | string | 路径或排除规则。 |
| type | string | 排除的类型，可选值有：<br/>- folder：文件夹<br/>- file：文件<br/>- suffix：后缀<br/>- prefix：前缀<br/>- regexp：正则表达式<br/>- glob：Glob规则 |

**示例：**

```json
{
  "packOptions": {
    "ignore": [
      {
        "type": "file",
        "value": "test/test.js"
      },
      {
        "type": "folder",
        "value": "test"
      },
      {
        "type": "suffix",
        "value": ".png"
      },
      {
        "type": "prefix",
        "value": "sub-"
      },
      {
        "type": "glob",
        "value": "test/*.js"
      },
      {
        "type": "regexp",
        "value": "^sub.*\\.js$"
      }
    ]
  }
}
```

> **说明：**
> 
> 为了确保运行正常，packOptions.ignore字段对app.json中配置的页面以及使用到的组件不生效。

## launchOptions

元服务启动参数。

| 属性 | 类型 | 描述 |
| -------- | -------- | -------- |
| path | string | 启动元服务页面的路径 (代码包路径) |
| query | object | 启动参数，如：{\"name\": \"vendor\"} |

## experimental

实验性特性。可以通过配置实验性特性，允许开发者开启和尝试实验性功能。

> **注意：**
> 
> ASCF Toolkit可能会对实验性功能做一些调整，并在更新日志中对这些变动进行详细的说明。因此，如果你使用了实验性特性，请留意 ASCF Toolkit 版本的更新日志。

| 属性 | 类型 | 描述 |
| -------- | -------- | -------- |
| cacheBaseHxml | boolean | 对于templateHoist为true情况下会默认开启base.hxml构建缓存。异常情况下可以配置false关闭缓存。 |
