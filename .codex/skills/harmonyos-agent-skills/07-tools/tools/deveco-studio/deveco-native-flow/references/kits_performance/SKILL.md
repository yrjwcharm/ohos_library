---
name: kits_performance
description: "HarmonyOS PerformanceAnalysisKit 性能分析能力集使用规范。包含 hilog 日志、hiAppEvent 事件、hidebug 调试、FaultLogger 故障日志、bytrace/hiTraceMeter 性能追踪等能力。Use when: (1) 日志输出，(2) 性能分析，(3) 故障排查，(4) 事件打点。Triggers: hilog、日志、性能、调试、debug、trace、FaultLogger、hiAppEvent、性能分析、打点。"
user-invocable: false
---

# PerformanceAnalysisKit 性能分析能力集 (kits_performance)

本 skill 覆盖 HarmonyOS **PerformanceAnalysisKit** 性能分析能力集的使用规范。

## 能力列表

| 模块 | 导入方式 | 用途 |
|------|----------|------|
| hilog | @ohos.hilog | 日志输出 |
| hiAppEvent | @ohos.hiviewdfx.hiAppEvent | 应用事件打点 |
| hidebug | @ohos.hidebug | 调试信息 |
| FaultLogger | @ohos.faultLogger | 故障日志 |
| bytrace | @ohos.bytrace | 性能追踪（旧版） |
| hiTraceMeter | @ohos.hiTraceMeter | 性能追踪 |
| hiTraceChain | @ohos.hiTraceChain | 分布式追踪链 |
| hichecker | @ohos.hichecker | 约束检查 |

## 快速索引

### hilog 日志输出

```typescript
import hilog from '@ohos.hilog';

const TAG = 'MyApp';
const DOMAIN = 0xFF00; // 日志域，用户应用范围 0x0000-0xFFFF

// 基本日志输出
hilog.debug(DOMAIN, TAG, 'Debug message');
hilog.info(DOMAIN, TAG, 'Info message');
hilog.warn(DOMAIN, TAG, 'Warning message');
hilog.error(DOMAIN, TAG, 'Error message');
hilog.fatal(DOMAIN, TAG, 'Fatal message');

// 格式化日志
hilog.info(DOMAIN, TAG, 'User %{public}s logged in', '张三');
hilog.info(DOMAIN, TAG, 'Count: %{public}d, Price: %{public}f', 100, 99.5);

// 隐私保护
// %{public}s  - 公开信息，日志中显示原值
// %{private}s - 私有信息，日志中显示 <private>
hilog.info(DOMAIN, TAG, 'Public: %{public}s, Private: %{private}s', 'visible', 'hidden');

// 计算值
hilog.info(DOMAIN, TAG, 'Result: %{public}d', 1 + 2);
```

### hilog 日志级别

```typescript
// 日志级别常量
hilog.LogLevel.DEBUG = 3
hilog.LogLevel.INFO = 4
hilog.LogLevel.WARN = 5
hilog.LogLevel.ERROR = 6
hilog.LogLevel.FATAL = 7

// 设置日志级别
hilog.setLevel(DOMAIN, hilog.LogLevel.INFO);

// 判断日志级别是否可输出
if (hilog.isLoggable(DOMAIN, TAG, hilog.LogLevel.DEBUG)) {
  hilog.debug(DOMAIN, TAG, 'This will be logged');
}
```

### hiAppEvent 事件打点

```typescript
import hiAppEvent from '@ohos.hiviewdfx.hiAppEvent';

// 写入事件
hiAppEvent.write({
  domain: 'MyApp',
  name: 'USER_LOGIN',
  eventType: hiAppEvent.EventType.BEHAVIOR,
  params: {
    user_id: '12345',
    login_time: Date.now(),
    login_method: 'password'
  }
}).then(() => {
  console.log('Event written successfully');
}).catch((err: Error) => {
  console.error('Failed to write event: ' + err.message);
});

// 事件类型
hiAppEvent.EventType.FAULT     = 1  // 故障事件
hiAppEvent.EventType.STATISTIC = 2  // 统计事件
hiAppEvent.EventType.SECURITY  = 3  // 安全事件
hiAppEvent.EventType.BEHAVIOR  = 4  // 行为事件
```

### hiAppEvent 配置

```typescript
import hiAppEvent from '@ohos.hiviewdfx.hiAppEvent';

// 配置事件打点
hiAppEvent.configure({
  disable: false,           // 是否禁用
  maxStorage: '100M',       // 最大存储空间
  override: false           // 覆盖同名事件
});

// 设置事件监听器
hiAppEvent.addWatcher({
  name: 'MyWatcher',
  appEventFilters: [
    {
      domain: 'MyApp',
      eventTypes: [hiAppEvent.EventType.FAULT, hiAppEvent.EventType.BEHAVIOR]
    }
  ],
  onEvent: (events: hiAppEvent.AppEventInfo[]) => {
    events.forEach((event) => {
      console.log('Event: ' + event.name + ', Params: ' + JSON.stringify(event.params));
    });
  }
});
```

### hidebug 调试信息

```typescript
import hidebug from '@ohos.hidebug';

// 获取进程信息
let processInfo = hidebug.getProcessInfo();
console.log('Process name: ' + processInfo.processName);
console.log('Process ID: ' + processInfo.pid);
console.log('User ID: ' + processInfo.uid);

// 获取系统内存信息
let memoryInfo = hidebug.getSystemMemoryInfo();
console.log('Total memory: ' + memoryInfo.totalMemory);
console.log('Free memory: ' + memoryInfo.freeMemory);
console.log('Available memory: ' + memoryInfo.availableMemory);

// 获取应用内存信息
let appMemory = hidebug.getAppMemoryInfo();
console.log('App memory: ' + appMemory);

// 获取应用CPU信息
let cpuUsage = hidebug.getAppCpuUsage();
console.log('CPU usage: ' + cpuUsage);

// 获取本机设备信息
let deviceInfo = hidebug.getLocalStorageInfo();
console.log('Local storage: ' + JSON.stringify(deviceInfo));

// 获取线程信息
let threadInfo = hidebug.getThreadInfo();
console.log('Thread count: ' + threadInfo.threadCount);
```

### hidebug 性能打点

```typescript
import hidebug from '@ohos.hidebug';

// 开始性能追踪
let startCpu = hidebug.getAppCpuUsage();
let startMemory = hidebug.getAppMemoryInfo();
let startTime = Date.now();

// 执行需要测量的代码
doHeavyWork();

// 结束追踪并计算
let endCpu = hidebug.getAppCpuUsage();
let endMemory = hidebug.getAppMemoryInfo();
let endTime = Date.now();

console.log(`CPU usage: ${(endCpu - startCpu).toFixed(2)}%`);
console.log(`Memory change: ${endMemory - startMemory} KB`);
console.log(`Time elapsed: ${endTime - startTime} ms`);
```

### FaultLogger 故障日志

```typescript
import FaultLogger from '@ohos.faultLogger';

// 查询故障日志
let faultLogs = await FaultLogger.query(FaultLogger.FaultType.JS_CRASH);
faultLogs.forEach((log) => {
  console.log('Timestamp: ' + log.timestamp);
  console.log('Process name: ' + log.processName);
  console.log('Reason: ' + log.reason);
  console.log('Summary: ' + log.summary);
  console.log('Full log: ' + log.fullLog);
});

// 故障类型
FaultLogger.FaultType.JS_CRASH     = 0  // JS崩溃
FaultLogger.FaultType.APP_FREEZE   = 1  // 应用冻结
FaultLogger.FaultType.CPP_CRASH    = 2  // Native崩溃
FaultLogger.FaultType.NO_SPECIFIC  = 3  // 无特定类型
```

### hiTraceMeter 性能追踪

```typescript
import hiTraceMeter from '@ohos.hiTraceMeter';

// 开始追踪
hiTraceMeter.startTrace('MyOperation', 1);

// 执行操作
await performOperation();

// 结束追踪
hiTraceMeter.finishTrace('MyOperation', 1);

// 中间打点
hiTraceMeter.middleTrace('MyOperation', 1, 'step1');

// 带参数的追踪
hiTraceMeter.startTrace('NetworkRequest', 2, { url: 'https://api.example.com' });
// ... 网络请求
hiTraceMeter.finishTrace('NetworkRequest', 2);
```

### hiTraceChain 分布式追踪链

```typescript
import hiTraceChain from '@ohos.hiTraceChain';

// 开启追踪链
let traceId = hiTraceChain.begin('MyBusiness', hiTraceChain.TraceFlag.DEFAULT);

// 获取当前追踪ID
let currentId = hiTraceChain.getId();
console.log('Trace ID: ' + JSON.stringify(currentId));

// 传递追踪ID到其他进程或服务
let traceIdStr = JSON.stringify(currentId);

// 在其他进程恢复追踪链
let restoredId = JSON.parse(traceIdStr);
hiTraceChain.setId(restoredId);

// 结束追踪链
hiTraceChain.end(traceId);

// 追踪标志
hiTraceChain.TraceFlag.DEFAULT        = 0   // 默认
hiTraceChain.TraceFlag.BEFORE_INVALID = 1   // 无效前的追踪
hiTraceChain.TraceFlag.EXCLUDE_ASYNC  = 2   // 排除异步
hiTraceChain.TraceFlag.NO_BE_INFO     = 4   // 不包含开始/结束信息
```

### bytrace 性能追踪（旧版）

```typescript
import bytrace from '@ohos.bytrace';

// 开始追踪
bytrace.startTrace('MyTrace', 1);

// 执行操作
doWork();

// 结束追踪
bytrace.finishTrace('MyTrace', 1);

// 追踪与计数器
bytrace.traceByValue('MyCounter', 100);
```

### hichecker 约束检查

```typescript
import hichecker from '@ohos.hichecker';

// 添加检查规则
hichecker.addCheckRule(hichecker.CheckRule.RULE_THREAD_CHECK);

// 检查是否在主线程
try {
  hichecker.check(hichecker.CheckRule.RULE_THREAD_CHECK);
} catch (err) {
  console.error('Thread check failed: ' + JSON.stringify(err));
}

// 移除检查规则
hichecker.removeCheckRule(hichecker.CheckRule.RULE_THREAD_CHECK);

// 检查规则常量
hichecker.CheckRule.RULE_THREAD_CHECK      = 1  // 线程检查
hichecker.CheckRule.RULE_UI_THREAD_CHECK   = 2  // UI线程检查
hichecker.CheckRule.RULE_JSAPI_CHECK       = 4  // JS API检查
hichecker.CheckRule.RULE_UTILS_CHECK       = 8  // 工具检查
hichecker.CheckRule.RULE_ALL_CHECK         = 15 // 全部检查
```

## 日志格式化说明

| 占位符 | 说明 | 示例 |
|--------|------|------|
| %{public}d | 公开整数 | 100 |
| %{private}d | 私有整数 | \<private\> |
| %{public}s | 公开字符串 | "hello" |
| %{private}s | 私有字符串 | \<private\> |
| %{public}f | 公开浮点数 | 3.14 |
| %{private}f | 私有浮点数 | \<private\> |

## 最佳实践

### 封装日志工具类

```typescript
import hilog from '@ohos.hilog';

class LogUtil {
  private static DOMAIN = 0xFF00;
  private static TAG = 'MyApp';

  static d(tag: string, message: string, ...args: Object[]): void {
    hilog.debug(this.DOMAIN, tag, message, ...args);
  }

  static i(tag: string, message: string, ...args: Object[]): void {
    hilog.info(this.DOMAIN, tag, message, ...args);
  }

  static w(tag: string, message: string, ...args: Object[]): void {
    hilog.warn(this.DOMAIN, tag, message, ...args);
  }

  static e(tag: string, message: string, ...args: Object[]): void {
    hilog.error(this.DOMAIN, tag, message, ...args);
  }

  staticperformance(startMark: string): () => void {
    const start = Date.now();
    return () => {
      const end = Date.now();
      this.i('Performance', `${startMark} took ${end - start}ms`);
    };
  }
}

export default LogUtil;

// 使用
LogUtil.i('Login', 'User %{public}s logged in', '张三');

// 性能测量
const endPerf = LogUtil.performance('DataLoad');
await loadData();
endPerf();
```

### 性能监控类

```typescript
import hidebug from '@ohos.hidebug';
import hilog from '@ohos.hilog';

class PerformanceMonitor {
  private static DOMAIN = 0xFF00;
  private static TAG = 'Performance';

  static startMeasure(name: string): () => void {
    const startTime = Date.now();
    const startCpu = hidebug.getAppCpuUsage();

    return () => {
      const endTime = Date.now();
      const endCpu = hidebug.getAppCpuUsage();
      const memory = hidebug.getAppMemoryInfo();

      hilog.info(this.DOMAIN, this.TAG,
        '[%{public}s] Time: %{public}dms, CPU: %{public}f%%, Memory: %{public}dKB',
        name, endTime - startTime, endCpu - startCpu, memory);
    };
  }

  static getSystemStatus(): void {
    const sysMem = hidebug.getSystemMemoryInfo();
    const cpu = hidebug.getAppCpuUsage();

    hilog.info(this.DOMAIN, this.TAG,
      'System - Free Memory: %{public}dMB, App CPU: %{public}f%%',
      sysMem.freeMemory / 1024 / 1024, cpu);
  }
}

export default PerformanceMonitor;

// 使用
const endMeasure = PerformanceMonitor.startMeasure('PageRender');
renderPage();
endMeasure();
```

## 注意事项

1. **日志级别选择**：
   - DEBUG：开发调试信息
   - INFO：重要业务信息
   - WARN：警告信息
   - ERROR：错误信息
   - FATAL：致命错误

2. **隐私保护**：
   - 使用 %{private} 保护敏感信息
   - 生产环境应适当调高日志级别

3. **性能影响**：
   - 大量日志会影响性能
   - 使用 isLoggable 提前判断
   - 性能敏感场景使用 hiTraceMeter

4. **存储空间**：
   - 日志有存储上限
   - 定期清理或上传日志服务器