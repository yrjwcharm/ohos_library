# HarmonyOS 内存泄漏检测工具 (filter_on.py)

这个脚本用于扫描HarmonyOS应用中的JavaScript/TypeScript文件，检测可能存在内存泄漏的事件监听器（使用了`.on()`但没有对应的`.off()`取消注册）。

## 功能特点

1. **自动扫描**: 递归扫描指定目录下的所有JS/TS/ETS文件
2. **智能匹配**: 识别`.on()`事件注册并检查是否有对应的`.off()`取消注册
3. **白名单支持**: 内置白名单过滤已知的安全情况
4. **多种输出格式**: 支持控制台输出和JSON格式报告
5. **去重处理**: 自动去重相同位置的问题

## 使用方法

```bash
# 基本用法 - 扫描指定目录
python filter_on.py <目录路径>

# 生成JSON报告
python filter_on.py <目录路径> --json
```

### 示例

```bash
# 扫描src目录
python filter_on.py ./src

# 扫描并生成JSON报告
python filter_on.py ./src --json
```

## 检测规则

脚本会检测以下情况：

1. **未配对的.on()事件**: 使用了`.on()`但没有对应的`.off()`
2. **支持的事件类型**:
   - Window事件: windowSizeChange, keyboardHeightChange, touchOutside等
   - Display事件: brightnessInfoChange, foldStatusChange等
   - Sensor事件: 各种传感器事件
   - 其他自定义事件

3. **白名单**: 包含"netCon", "netConnection", "netConn"的对象会被跳过

## 输出格式

### 控制台输出
```
发现 4 个可能存在内存泄漏的事件监听:
================================================================================

文件: /path/to/file.ts
行号: 123
对象: this.windowStage
事件类型: windowSizeChange
代码: this.windowStage.on('windowSizeChange', (size) => {
----------------------------------------
```

### JSON输出
使用`--json`参数会生成`memleak_report.json`文件，包含结构化的结果数据，便于其他工具处理。

## 技术实现

1. **文件扫描**: 使用`os.walk()`递归遍历目录
2. **代码解析**: 逐行解析代码，识别事件监听器注册和取消
3. **匹配算法**: 对比.on()和.off()调用，找出未配对的情况
4. **结果聚合**: 去重并格式化输出结果

## 注意事项

1. 静态分析可能存在误报，建议结合代码审查使用
2. 某些复杂的事件处理逻辑可能需要人工判断
3. 建议在代码提交前运行此工具检查

## 建议修复方案

对于检测到的问题，建议：

1. 在组件的`aboutToDisappear()`生命周期方法中添加对应的`.off()`调用
2. 确保事件监听的配对使用
3. 注意匿名函数的取消注册问题

```typescript
// 示例修复
class MyComponent {
  private sizeChangeCallback = (size: any) => {
    console.log('Size changed');
  };
  
  aboutToAppear() {
    this.windowStage.on('windowSizeChange', this.sizeChangeCallback);
  }
  
  aboutToDisappear() {
    // 添加对应的off()调用
    this.windowStage.off('windowSizeChange', this.sizeChangeCallback);
  }
}
```