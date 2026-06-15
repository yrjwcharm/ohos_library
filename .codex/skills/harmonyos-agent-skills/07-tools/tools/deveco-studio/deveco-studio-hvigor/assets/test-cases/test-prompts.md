# 测试提示词

本文档包含验证 deveco-studio-hvigor skill 功能的测试提示词。

---

## 一、基础功能测试

### 测试场景 1：构建HAP包（Debug模式）

**提示词**：
```
构建HAP包，项目路径是 C:\Users\99562\DevEcoStudioProjects\MyApplication9
```

**预期输出**：
- 检查 scripts/config.json 是否存在（依赖 emulator skill）
- 如果不存在，运行 node ../deveco-studio-emulator/scripts/setup.js
- 获取 DevEco Studio 路径
- 进入项目根目录
- 执行构建命令：node "<DevEco Studio>/tools/hvigor/bin/hvigorw.js" assembleHap --mode module -p module=entry@default -p buildMode=debug --no-daemon
- 等待构建完成（显示 "BUILD SUCCESSFUL"）
- 报告构建产物路径：entry/build/default/outputs/default/entry-default-unsigned.hap
- 提示签名警告（如果未配置签名）

---

### 测试场景 2：构建HAP包（Release模式）

**提示词**：
```
构建 Release 版本的 HAP 包
```

**预期输出**：
- 进入项目根目录
- 执行构建命令：node "<DevEco Studio>/tools/hvigor/bin/hvigorw.js" assembleHap --mode module -p module=entry@default -p buildMode=release --no-daemon
- 等待构建完成
- 报告构建产物路径
- 提示需要签名配置才能生成签名版本

---

### 测试场景 3：构建APP分发包

**提示词**：
```
构建APP分发包
```

**预期输出**：
- 进入项目根目录
- 执行构建命令：node "<DevEco Studio>/tools/hvigor/bin/hvigorw.js" assembleApp --mode project -p product=default --no-daemon
- 等待构建完成
- 报告构建产物路径：build/outputs/default/{project}-default-unsigned.app
- 说明APP包用于上架应用市场

---

### 测试场景 4：清理构建产物

**提示词**：
```
清理构建产物
```

**预期输出**：
- 进入项目根目录
- 执行清理命令：node "<DevEco Studio>/tools/hvigor/bin/hvigorw.js" clean --no-daemon
- 删除 build 目录
- 显示 "BUILD SUCCESSFUL"
- 报告清理完成

---

### 测试场景 5：查看Hvigor版本

**提示词**：
```
查看Hvigor版本
```

**预期输出**：
- 获取 DevEco Studio 路径（从 config.json）
- 执行版本查询命令：node "<DevEco Studio>/tools/hvigor/bin/hvigorw.js" --version
- 显示版本号（如 6.23.2）
- 报告版本信息

---

### 测试场景 6：查看构建任务列表

**提示词**：
```
查看项目可用的构建任务
```

**预期输出**：
- 进入项目根目录
- 执行任务查询命令：node "<DevEco Studio>/tools/hvigor/bin/hvigorw.js" tasks --no-daemon
- 显示所有可用任务（assembleHap、assembleApp、assembleHsp、assembleHar、clean等）
- 说明各任务的用途

---

## 二、边界条件测试

### 测试场景 7：构建指定模块的HAP包

**提示词**：
```
构建 shared 模块的HSP包
```

**预期输出**：
- 进入项目根目录
- 执行构建命令：node "<DevEco Studio>/tools/hvigor/bin/hvigorw.js" assembleHsp --mode module -p module=shared@default --no-daemon
- 等待构建完成
- 报告构建产物路径
- 说明HSP是动态共享包

---

### 测试场景 8：构建HAR静态共享包

**提示词**：
```
构建 lib 模块的HAR包
```

**预期输出**：
- 进入项目根目录
- 执行构建命令：node "<DevEco Studio>/tools/hvigor/bin/hvigorw.js" assembleHar --mode module -p module=lib@default --no-daemon
- 等待构建完成
- 报告构建产物路径
- 说明HAR是静态共享包

---

### 测试场景 9：构建指定产品的APP包

**提示词**：
```
构建 release 产品的APP包
```

**预期输出**：
- 进入项目根目录
- 执行构建命令：node "<DevEco Studio>/tools/hvigor/bin/hvigorw.js" assembleApp --mode project -p product=release --no-daemon
- 等待构建完成
- 报告构建产物路径
- 说明不同产品的配置差异

---

### 测试场景 10：构建启用调试行号的HAP包

**提示词**：
```
构建带调试行号的HAP包，用于Inspector源码跳转
```

**预期输出**：
- 进入项目根目录
- 执行构建命令：node "<DevEco Studio>/tools/hvigor/bin/hvigorw.js" assembleHap --mode module -p module=entry@default -p buildMode=debug -p debugLine=true --no-daemon
- 等待构建完成
- 报告构建产物路径
- 说明调试行号的作用（支持 ArkUI Inspector 源码跳转）

---

### 测试场景 11：停止daemon进程

**提示词**：
```
停止Hvigor daemon进程
```

**预期输出**：
- 进入项目根目录
- 执行停止命令：node "<DevEco Studio>/tools/hvigor/bin/hvigorw.js" --stop-daemon
- 显示 daemon 进程已停止
- 说明 daemon 进程的作用和为什么要停止

---

### 测试场景 12：清理并重新构建

**提示词**：
```
清理构建产物后重新构建HAP包
```

**预期输出**：
- 步骤1：执行清理命令（clean --no-daemon）
- 步骤2：停止daemon进程（--stop-daemon）
- 步骤3：重新构建HAP包（assembleHap --no-daemon）
- 步骤4：验证构建产物
- 总结：报告清理并重新构建的结果

---

## 三、错误处理测试

### 测试场景 13：找不到hvigorw.js文件

**提示词**：
```
构建失败，提示找不到 hvigorw.js 文件
```

**预期输出**：
- 识别错误类型：路径配置问题
- 检查 config.json 是否存在
- 建议：运行 node ../deveco-studio-emulator/scripts/setup.js
- 提供正确的路径示例：
  - Windows: C:\Program Files\Huawei\DevEco Studio\tools\hvigor\bin\hvigorw.js
  - macOS: /Applications/DevEco-Studio.app/Contents/tools/hvigor/bin/hvigorw.js
- 提供手动设置环境变量的方法

---

### 测试场景 14：Node.js版本不兼容

**提示词**：
```
构建失败，提示 Node.js 版本不兼容
```

**预期输出**：
- 识别错误类型：Node.js版本问题
- 检查当前Node.js版本：node -v
- 提示最低版本要求：v14.18.3+
- 提供升级方法：
  - 使用 nvm 安装：nvm install 14.18.3
  - 使用 nvm 切换：nvm use 14.18.3
- 重新尝试构建

---

### 测试场景 15：modelVersion版本不匹配

**提示词**：
```
构建失败，提示 modelVersion 不匹配
```

**预期输出**：
- 识别错误信息：Unsupported modelVersion of Hvigor 6.1.0
- 检查 hvigor-config.json5 和 oh-package.json5 中的版本号
- 提供修复方法：
  - 步骤1：查看当前Hvigor版本（hvigorw --version）
  - 步骤2：修改 hvigor-config.json5 的 modelVersion
  - 步骤3：修改 oh-package.json5 的 modelVersion
  - 步骤4：统一版本号
- 重新尝试构建

---

### 测试场景 16：签名配置错误

**提示词**：
```
构建失败，提示签名配置错误
```

**预期输出**：
- 识别错误类型：签名问题
- 检查 build-profile.json5 中的 signingConfigs
- 提供解决方案：
  - 方案1：清空签名配置，生成未签名HAP
  - 方案2：重新生成签名证书（通过DevEco Studio）
  - 方案3：检查证书文件路径和密码
- 提供未签名构建示例命令

---

### 测试场景 17：构建产物找不到

**提示词**：
```
构建成功了但找不到生成的HAP文件
```

**预期输出**：
- 检查构建产物路径：
  - HAP: entry/build/default/outputs/default/
  - APP: build/outputs/default/
- 使用命令查找：dir /s /b *.hap
- 检查模块名和产品名是否正确
- 使用 hvigorw tasks 查看构建任务
- 报告正确的产物路径

---

### 测试场景 18：增量构建失败

**提示词**：
```
修改代码后构建没有更新
```

**预期输出**：
- 识别问题：增量构建缓存问题
- 提供解决方案：
  - 步骤1：清理构建产物（clean --no-daemon）
  - 步骤2：停止daemon进程（--stop-daemon）
  - 步骤3：禁用增量构建（--no-incremental）
  - 步骤4：重新构建
- 说明增量构建的原理和缓存位置

---

### 测试场景 19：构建超时或卡死

**提示词**：
```
构建过程卡死，长时间没有输出
```

**预期输出**：
- 识别问题：daemon进程卡死或构建任务挂起
- 提供解决方案：
  - 步骤1：强制停止daemon进程（--stop-daemon）
  - 步骤2：清理构建缓存（clean）
  - 步骤3：使用 --no-daemon 参数重新构建
- 说明 daemon 进程可能导致的问题
- 建议使用 --no-daemon 避免 Windows 下的进程残留

---

## 四、多平台测试

### 测试场景 20：Windows平台构建

**提示词**：
```
在 Windows 平台构建HAP包，DevEco Studio 在 C:\Program Files\Huawei\DevEco Studio
```

**预期输出**：
- 使用 Windows 路径格式
- 执行命令：node "C:\Program Files\Huawei\DevEco Studio\tools\hvigor\bin\hvigorw.js" assembleHap --mode module -p module=entry@default --no-daemon
- 添加 --no-daemon 参数（Windows推荐）
- 等待构建完成
- 报告构建结果

---

### 测试场景 21：macOS平台构建

**提示词**：
```
在 macOS 平台构建HAP包，DevEco Studio 在 /Applications/DevEco-Studio.app
```

**预期输出**：
- 使用 macOS 路径格式
- 执行命令：node "/Applications/DevEco-Studio.app/Contents/tools/hvigor/bin/hvigorw.js" assembleHap --mode module -p module=entry@default --daemon
- 添加 --daemon 参数（macOS推荐，加速构建）
- 等待构建完成
- 报告构建结果

---

### 测试场景 22：使用hvigorw.bat构建（Windows）

**提示词**：
```
使用 hvigorw.bat 构建 HAP 包
```

**预期输出**：
- 进入项目根目录
- 执行批处理命令：& "C:\Program Files\Huawei\DevEco Studio\tools\hvigor\bin\hvigorw.bat" assembleHap --mode module -p module=entry@default --no-daemon
- 等待构建完成
- 报告构建结果
- 说明两种方式的区别（node hvigorw.js vs hvigorw.bat）

---

## 五、CI/CD集成测试

### 测试场景 23：CI/CD流水线构建命令

**提示词**：
```
提供CI/CD流水线构建命令，包含完整参数
```

**预期输出**：
- 提供完整的构建命令：
  node "<DevEco Studio>/tools/hvigor/bin/hvigorw.js" assembleApp --mode project --stacktrace --parallel --no-daemon -p buildMode=release -p product=default
- 参数说明：
  - --stacktrace: 打印详细堆栈信息
  - --parallel: 启用并行构建
  - --no-daemon: 不使用daemon进程（CI环境推荐）
  - -p buildMode=release: Release模式
  - -p product=default: 指定产品
- 说明CI/CD环境要求：
  - Node.js 14.18.3+
  - DevEco Studio SDK
  - 环境变量配置

---

### 测试场景 24：构建产物验证

**提示词**：
```
验证构建产物是否正确生成
```

**预期输出**：
- 步骤1：查找HAP文件（dir /s /b *.hap）
- 步骤2：检查文件大小（应大于0）
- 步骤3：验证文件名格式（{module}-{product}-{mode}.hap）
- 步骤4：检查构建日志中的 "BUILD SUCCESSFUL"
- 步骤5：验证产物路径
- 总结：报告验证结果

---

### 测试场景 25：构建性能分析

**提示词**：
```
启用构建分析，查看构建性能
```

**预期输出**：
- 执行分析命令：node "<DevEco Studio>/tools/hvigor/bin/hvigorw.js" assembleHap --analyze=normal --no-daemon
- 显示构建分析报告
- 识别耗时任务
- 提供优化建议：
  - 启用并行构建（--parallel）
  - 启用增量构建（--incremental）
  - 增加Node.js内存限制（maxOldSpaceSize）
- 报告分析结果

---

## 六、配置文件测试

### 测试场景 26：检查项目配置文件

**提示词**：
```
检查项目配置文件是否正确
```

**预期输出**：
- 检查必需文件：
  - build-profile.json5（构建配置）
  - hvigorfile.ts（构建脚本）
  - hvigor/hvigor-config.json5（Hvigor配置）
  - oh-package.json5（包配置）
- 验证文件存在性
- 检查关键字段：
  - modelVersion 一致性
  - targetSdkVersion
  - signingConfigs
- 报告配置检查结果

---

### 测试场景 27：修改构建配置

**提示词**：
```
将 buildMode 从 debug 改为 release
```

**预期输出**：
- 读取 build-profile.json5
- 修改 buildMode 字段
- 或使用命令行参数：-p buildMode=release
- 重新构建验证
- 报告修改结果

---

### 测试场景 28：配置签名信息

**提示词**：
```
配置应用签名信息，用于Release构建
```

**预期输出**：
- 说明签名配置位置（build-profile.json5）
- 提供签名配置示例
- 字段说明：
  - certpath: 证书路径
  - keyAlias: 密钥别名
  - storeFile: 密钥库文件
- 提示通过DevEco Studio生成签名
- 提供手动配置方法

---

## 七、完整工作流测试

### 测试场景 29：完整构建流程（Debug）

**提示词**：
```
执行完整的Debug构建流程：清理 → 构建 → 验证
```

**预期输出**：
- 步骤1：清理构建产物（clean --no-daemon）
- 步骤2：停止daemon进程（--stop-daemon）
- 步骤3：构建HAP包（assembleHap --mode module -p module=entry@default -p buildMode=debug --no-daemon）
- 步骤4：验证构建产物（检查HAP文件）
- 步骤5：报告构建结果
- 总结：报告完整流程执行结果

---

### 测试场景 30：完整构建流程（Release）

**提示词**：
```
执行完整的Release构建流程：清理 → 构建 → 验证 → 打包APP
```

**预期输出**：
- 步骤1：清理构建产物
- 步骤2：构建HAP包（Release模式）
- 步骤3：验证HAP产物
- 步骤4：构建APP包
- 步骤5：验证APP产物
- 总结：报告完整流程执行结果，提供产物路径

---