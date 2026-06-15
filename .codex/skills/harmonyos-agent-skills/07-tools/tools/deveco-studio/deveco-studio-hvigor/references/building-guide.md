# Hvigor详细构建指南

本文档包含Hvigor构建的详细说明、配置文件示例和最佳实践。

---

## 项目配置文件

### hvigor-config.json5

Hvigor的配置文件，包含执行、日志、调试等配置：

```json
{
  "modelVersion": "6.0.2",
  "dependencies": {},
  "execution": {
    "analyze": "normal",
    "daemon": true,
    "incremental": true,
    "parallel": true,
    "typeCheck": false,
    "optimizationStrategy": "memory"
  },
  "logging": {
    "level": "info"
  },
  "debugging": {
    "stacktrace": false
  },
  "nodeOptions": {
    "maxOldSpaceSize": 8192,
    "exposeGC": true
  }
}
```

### build-profile.json5

构建配置文件，包含签名、产品、模块配置：

```json
{
  "app": {
    "signingConfigs": [
      {
        "name": "default",
        "type": "HarmonyOS",
        "material": {
          "certpath": "证书路径",
          "keyAlias": "密钥别名",
          "keyPassword": "密钥密码",
          "profile": "配置文件路径",
          "signAlg": "SHA256withECDSA",
          "storeFile": "密钥库文件路径",
          "storePassword": "密钥库密码"
        }
      }
    ],
    "products": [
      {
        "name": "default",
        "signingConfig": "default",
        "targetSdkVersion": "6.0.0(20)",
        "compatibleSdkVersion": "6.0.0(20)",
        "runtimeOS": "HarmonyOS"
      }
    ],
    "buildModeSet": [
      {
        "name": "debug"
      },
      {
        "name": "release"
      }
    ]
  }
}
```

---

## 构建产物位置

### 默认输出目录

构建产物默认保存在以下位置：

```
{ProjectRoot}/build/{productName}/{targetName}/output/{debug|release}
```

### 具体路径示例

```bash
# HAP产物
./build/default/entry/default/output/debug/entry-default-debug.hap

# APP产物
./build/default/default/output/release/app-release.app

# HAR产物
./build/default/entry/library/output/release/entry.har

# HSP产物
./build/default/entry/library/output/debug/entry.library-default-debug.hsp
```

### 查找构建产物

```bash
# Windows
dir build\default\entry\default\output\debug\*.hap

# Linux/macOS
ls build/default/entry/default/output/debug/*.hap
```

---

## 完整构建示例

### 开发调试构建

```bash
# 方式一：使用hvigorw（推荐）
hvigorw assembleHap --mode module -p debuggable=true

# 方式二：使用node命令
node node_modules/@ohos/hvigor/bin/harmony.js --mode module assembleHap
```

### Release正式包构建

```bash
# 构建Release模式的HAP
hvigorw assembleHap --mode module -p buildMode=release

# 构建APP分发包
hvigorw assembleApp --mode project
```

### CI/CD流水线常用命令

```bash
# 完整流水线构建命令
hvigorw assembleApp --mode project \
  --stacktrace \
  --parallel \
  --incremental \
  -p buildMode=release \
  -p product=default
```

### 查看任务信息

```bash
# 查看所有可用任务
hvigorw tasks

# 查看任务依赖树
hvigorw taskTree
```

---

## 构建参数详解

### 构建模式参数

| 参数 | 说明 |
|------|------|
| `-p buildMode=debug` | 采用debug模式进行编译构建 |
| `-p buildMode=release` | 采用release模式进行编译构建 |
| `-p debuggable=true` | 启用调试模式 |
| `-p debuggable=false` | 禁用调试模式 |

**默认值说明**：
- 构建HAP/HSP时默认为debug模式
- 构建APP时默认为release模式

### 产品和模块参数

| 参数 | 说明 |
|------|------|
| `-p product={ProductName}` | 指定product进行编译，编译product下配置的module target |
| `-p module={ModuleName}@{TargetName}` | 指定模块及target进行编译，可指定多个相同类型的模块以逗号分割；TargetName不指定时默认为default |

**使用示例**：

```bash
# 指定产品进行构建
hvigorw assembleHap -p product=default

# 指定模块进行构建
hvigorw assembleHap -p module=entry@default

# 组合使用
hvigorw assembleHap -p product=default -p module=entry@default
```

### 执行模式参数

| 参数 | 说明 |
|------|------|
| `--mode project` | 执行工程级别的构建任务（如assembleApp） |
| `--mode module` | 执行模块级别的构建任务（如assembleHap） |

**完整命令示例**：

```bash
# 模块级构建（最常用）
hvigorw --mode module assembleHap

# 工程级构建
hvigorw --mode project assembleApp
```

### 性能优化参数

| 参数 | 说明 |
|------|------|
| `--parallel` | 启用并行构建 |
| `--incremental` | 启用增量构建 |
| `--daemon` | 启用daemon模式（默认开启） |
| `--no-daemon` | 禁用daemon模式 |
| `--stop-daemon` | 关闭当前工程的daemon进程 |
| `--stop-daemon-all` | 关闭所有daemon进程 |

### 日志和调试参数

| 参数 | 说明 |
|------|------|
| `--info` | 设置hvigor的日志级别为info |
| `--debug` 或 `-d` | 设置hvigor的日志级别为debug |
| `--stacktrace` | 打印异常的堆栈信息（默认关闭） |
| `--no-stacktrace` | 关闭堆栈信息打印 |
| `--quiet` | 安静模式，减少日志输出 |

### 其他常用参数

| 参数 | 说明 |
|------|------|
| `-p ohos-test-coverage={true | false}` | 是否生成测试覆盖率报告 |
| `--enable-build-script-type-check` | 启用构建脚本类型检查 |
| `--sync` | 同步工程配置 |

---

## 构建模式说明

### Debug模式

**特点**：
- 调试签名，无需正式证书
- 包含调试信息，便于问题排查
- 构建速度相对较快
- 生成的HAP包可用于本地调试和安装

**命令**：

```bash
hvigorw assembleHap -p buildMode=debug
# 或
hvigorw assembleHap -p debuggable=true
```

### Release模式

**特点**：
- 需要正式发布签名证书
- 进行了代码优化和混淆
- 包体积更小
- 适用于应用市场上架

**命令**：

```bash
hvigorw assembleHap -p buildMode=release
# 或
hvigorw assembleApp
```

### 构建产物类型

| 产物类型 |命令 | 说明 |
|----------|------|------|
| HAP | `assembleHap` | Harmony Ability Package，应用安装包 |
| APP | `assembleApp` | 应用分发包，用于应用市场上架 |
| HSP | `assembleHsp` | Dynamic Shared Package，动态共享包 |
| HAR | `assembleHar` | Static Archive，静态共享包 |

---

## 清理构建产物

### 清理命令

```bash
# 清理当前目录的构建产物
hvigorw clean

# 清理工程级别的build文件夹
hvigorw clean -m project

# 清理指定模块的构建产物
hvigorw clean -m module
```

清理操作会删除项目中的build目录及其所有内容。

---

## 注意事项

1. **执行目录**：必须在鸿蒙工程根目录下执行hvigorw命令
2. **Node版本**：确保Node.js版本满足要求（v14.18.3+）
3. **签名配置**：Release构建需要预先配置签名信息
4. **缓存清理**：遇到构建问题时，可尝试先执行clean再重新构建
5. **Windows用户**：使用hvigorw.bat；Linux/macOS用户使用hvigorw
6. **并行构建**：大型项目建议启用并行构建以提高速度
7. **Daemon进程**：长时间构建后记得关闭daemon进程释放资源
