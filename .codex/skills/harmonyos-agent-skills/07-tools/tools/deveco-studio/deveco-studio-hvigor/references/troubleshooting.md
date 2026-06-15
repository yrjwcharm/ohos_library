# Hvigor构建故障排除指南

基于实际编译经验整理的常见问题和解决方案。

---

## 版本兼容性问题

### 问题：modelVersion不匹配

**错误信息**：
```
ERROR: 00303028 Configuration Error
Error Message: Unsupported modelVersion of Hvigor 6.1.0.
The supported Hvigor modelVersion is 6.0.2.
```

**原因**：
- `hvigor-config.json5` 中的 `modelVersion` 与 Hvigor 工具版本不匹配
- `oh-package.json5` 中的 `modelVersion` 与 Hvigor 工具版本不匹配

**解决方案**：

1. 检查当前Hvigor支持的版本：
```bash
hvigorw -v
```

2. 同步配置文件中的版本号：
```bash
# 修改 hvigor-config.json5
{
  "modelVersion": "6.0.2",  # 修改为支持的版本
  ...
}

# 修改 oh-package.json5
{
  "modelVersion": "6.0.2",  # 修改为支持的版本
  ...
}
```

3. 重新构建：
```bash
hvigorw assembleHap
```

---

## SDK版本问题

### 问题：targetSdkVersion不存在

**错误信息**：
```
ERROR: 00303082 Configuration Error
Error Message: Unable to find the targetSdkVersion 6.1.0(23) in SDK Manager.
```

**原因**：
- `build-profile.json5` 中配置的 `targetSdkVersion` 在SDK Manager中不存在
- 通常是因为SDK版本过高，当前环境未安装

**解决方案**：

1. 检查可用的SDK版本：
```bash
# 在DevEco Studio中查看已安装的SDK
# 或查看 SDK Manager
```

2. 修改 `build-profile.json5` 中的SDK版本：
```json
{
  "app": {
    "products": [
      {
        "name": "default",
        "targetSdkVersion": "6.0.0(20)",        // 修改为已安装的版本
        "compatibleSdkVersion": "6.0.0(20)",      // 保持一致
        ...
      }
    ]
  }
}
```

3. 重新构建

---

## 签名配置问题

### 问题：签名失败

**错误信息**：
```
ERROR: Failed :entry:default@SignHap...
ERROR: Tools execution failed.
ERROR: 11014003 Init keystore failed
Error Message: parseAlgParameters failed: ObjectIdentifier() -- data isn't an object ID (tag = 48)
```

**原因**：
- 签名文件损坏或格式不正确
- 签名文件由较新版本的JDK创建，当前JDK版本不兼容
- 签名文件路径错误或不存在

**解决方案**：

**方案1：使用未签名构建（开发调试）**

修改 `build-profile.json5`，移除签名配置：
```json
{
  "app": {
    "signingConfigs": [],  // 清空签名配置
    "products": [
      {
        "name": "default",
        // 移除 "signingConfig": "default"
        ...
      }
    ]
  }
}
```

构建时会生成未签名的HAP包：
```
entry-default-unsigned.hap
```

**方案2：重新生成签名文件**

1. 在DevEco Studio中：
   - File → Project Structure → Signing Configs
   - 删除现有签名配置
   - 重新生成签名证书

2. 确保使用正确的JDK版本（推荐JDK 11或17）

**方案3：检查签名文件**

```bash
# 检查签名文件是否存在
dir C:\Users\{username}\.ohos\config\*.p12
dir C:\Users\{username}\.ohos\config\*.cer
dir C:\Users\{username}\.ohos\config\*.p7b

# 检查文件权限
# 确保当前用户有读取权限
```

---

## Daemon进程问题

### 问题：Daemon进程卡死或版本不匹配

**错误信息**：
```
The argument passed to Node.js or hvigor version have changed and a new daemon will be created
```

**解决方案**：

1. 停止当前daemon进程：
```bash
hvigorw --stop-daemon
```

2. 如果仍有问题，停止所有daemon进程：
```bash
hvigorw --stop-daemon-all
```

3. 重新构建：
```bash
hvigorw assembleHap
```

---

## 增量构建失败

### 问题：增量构建缓存损坏

**症状**：
- 修改代码后，构建没有重新编译
- 构建产物不是最新的
- 出现奇怪的编译错误

**解决方案**：

1. 清理构建产物：
```bash
hvigorw clean
```

2. 停止daemon进程：
```bash
hvigorw --stop-daemon
```

3. 禁用增量构建（临时）：
```bash
hvigorw assembleHap --no-incremental
```

4. 重新构建：
```bash
hvigorw assembleHap
```

---

## 内存不足问题

### 问题：构建时内存溢出

**错误信息**：
```
JavaScript heap out of memory
FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory
```

**解决方案**：

1. 增加Node.js内存限制：
```bash
# 在 hvigor-config.json5 中配置
{
  "nodeOptions": {
    "maxOldSpaceSize": 16384  // 增加到16GB
  }
}
```

2. 使用命令行参数：
```bash
node --max-old-space-size=16384 node_modules/@ohos/hvigor/bin/harmony.js assembleHap
```

3. 关闭其他占用内存的应用

---

## 依赖安装问题

### 问题：npm依赖安装失败

**错误信息**：
```
npm ERR! code ENOENT
npm ERR! syscall open
npm ERR! path /path/to/node_modules/@ohos/hvigor
```

**解决方案**：

1. 清理npm缓存：
```bash
npm cache clean --force
```

2. 删除node_modules并重新安装：
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

3. 使用国内镜像源：
```bash
npm config set registry https://registry.npmmirror.com
```

---

## 编译错误

### 问题：ArkTS编译错误

**错误信息**：
```
ERROR: Failed :entry:default@CompileArkTS...
Type 'xxx' is not assignable to type 'yyy'
```

**解决方案**：

1. 查看详细错误信息：
```bash
hvigorw assembleHap --stacktrace
```

2. 检查类型定义：
   - 确保导入的类型正确
   - 检查接口定义是否匹配

3. 使用类型检查：
```bash
hvigorw assembleHap --type-check
```

---

## 实用调试命令

### 查看详细日志

```bash
# 启用debug日志
hvigorw assembleHap --debug

# 打印堆栈信息
hvigorw assembleHap --stacktrace

# 组合使用
hvigorw assembleHap --debug --stacktrace
```

### 查看任务信息

```bash
# 查看所有可用任务
hvigorw tasks

# 查看任务依赖树
hvigorw taskTree
```

### 性能分析

```bash
# 启用构建分析
hvigorw assembleHap --analyze=normal

# 高级分析
hvigorw assembleHap --analyze=advanced
```

---

## 最佳实践

1. **版本管理**：确保所有配置文件的版本号一致
2. **清理构建**：遇到问题时，先clean再构建
3. **Daemon管理**：长时间构建后记得停止daemon
4. **内存配置**：大型项目适当增加内存限制
5. **日志记录**：保存构建日志以便分析问题
6. **环境隔离**：不同项目使用不同的Node.js版本（nvm）

---

## 获取帮助

```bash
# 查看完整帮助信息
hvigorw --help

# 查看特定任务的帮助
hvigorw help assembleHap
```
