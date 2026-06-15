# 故障模式库（Freeze Root Cause Library）

> 适用故障类型：`APPFREEZE` / `THREAD_BLOCK_6S`  
> SysEvent: `name_: APP_FREEZE / REASON: THREAD_BLOCK_6S`  
> AppEvent: `name: APP_FREEZE / exception: name: THREAD_BLOCK_6S`

---

## 一级：主线程卡死超时

### 二级：主线程阻塞
> 判定特征：3s、6s 的栈顶完全在**相同的栈**上（去除基础栈后查看前三层）

| 三级根因 | 判定规则 |
|----------|----------|
| **等锁** | 1. 主线程调用栈位于 `pthread_mutex`；2. 通过 mutex 上下的业务栈找到对应锁位置；3. 通过应用其他线程查找持锁线程，或主线程自身死锁 |
| **同步 Binder 接口调用阻塞** | 1. 主线程调用栈位于 `OHOS::BinderInvoker::WaitForCompletion`；2. 通过 BinderCatcher 找到对应 `pid:tid`（tid == pid）的对端进程 PID |
| **对端 Binder 满** | 1. 主线程调用栈位于 `OHOS::BinderInvoker::WaitForCompletion`；2. 通过 BinderCatcher 找到对应 `pid:tid` 调用栈；3. BinderCatcher 显示等待对端未分配出 tid 号 |
| **阻塞 IO 操作** | 主线程调用栈位于 IO 操作：C 库 `ld-musl`：`open` / `read` / `write` / `close` |
| **长时 GC 操作** | 栈顶(#00 #01)在pthread_condition_wait上的紧接(#02)着libark_jsruntime.so，可以认为虚拟机在GC；主线程调用栈位于 `panda::ecmascript::FullGC`（系统问题）；hilog 中存在 warning 级别 GC 进入前后的日志 |
| **长时 Dump 操作** | 主线程调用栈位于 `DumpHeapSnapshot` |
| **执行耗时操作** | 未匹配上述任何模式时，默认根因为执行耗时操作 |

---

### 二级：主线程繁忙
> 判定特征：3s、6s 的栈顶**不完全相同**（栈顶存在差异）

| 三级根因 | 判定规则 |
|----------|----------|
| **Binder 调用繁忙** | 1. 主线程调用栈位于 `OHOS::BinderInvoker::WaitForCompletion`；2. 采样栈同样位于该函数；3. 采样栈占比 **> 30%** |
| **IO 操作繁忙** | 1. 采样栈主线程调用栈位于 IO 操作（`open` / `read` / `write` / `close`）；2. 采样栈占比 **> 30%** |
| **UI 操作繁忙** | 1. 采样栈位于 ArkUI 某组件操作（关键字：`libace_compatible.z.so` / `OHOS::Ace::NG::`）；2. 采样栈占比 **> 30%** |
| **业务繁忙** | 1. 采样栈位于某一业务栈；2. 占比 **> 30%**（多个匹配取占比最多；占比一致取层级最高）|
| **频繁等锁** | 1. 采样栈位于等锁操作；2. 采样栈占比 **> 30%** |
| **执行耗时操作（多任务混合）** | 未匹配上述模式；分析思路：① 检查采样栈是否位于某一业务栈；② 多份日志采样栈统一聚类 |

---

### 二级：系统高负载
> 判定特征：日志中包含 `system's low memory and thermal throttling`（内存 RAB < 500M 或热档位 ThermalLevel > 5）
| 三级根因 | 判定规则 |
|----------|----------|
| **系统高负载** | 日志包含 `system's low memory and thermal throttling`；内存 RAB < 500M 或热档位 ThermalLevel > 5（系统问题） |

---

## 一级：用户输入处理超时
> 适用故障类型：`APP_INPUT_BLOCK`
> SysEvent: `name_: APP_FREEZE / REASON: APP_INPUT_BLOCK`
> AppEvent: `name: APP_FREEZE / exception: name: APP_INPUT_BLOCK`
> 故障描述：用户输入处理超时，导致应用卡死

### 二级：主线程阻塞
> 判定特征：主线程调用栈或采样栈有一次不是 `OHOS::AppExecFwk::EventQueue::WaitUntilLocked`；或 3s、Input 的栈顶在**相同的栈**上

| 三级根因 | 判定规则 |
|----------|----------|
| **等锁** | 主线程调用栈位于 `pthread_mutex` |
| **对端 Binder 满** | 1. 主线程调用栈位于 Binder 调用：`OHOS::BinderInvoker::WaitForCompletion`；2. 通过 BinderCatcher 找到对应 `pid:tid` 的调用栈；3. BinderCatcher 信息显示等待对端未分配出 tid 号 |
| **阻塞 IO 操作** | 主线程调用栈位于 IO 操作 |
| **长时 GC 操作** | 主线程调用栈位于 `panda::ecmascript::FullGC`（系统问题）；hilog 补充 warning 级别的 GC 进入前后的日志 |
| **长时 Dump 操作** | 主线程调用栈位于 heapdump：`DumpHeapSnapshot` |
| **执行耗时操作** | 未匹配上述故障时，默认根因为执行耗时操作：① 仅包含主线程栈的场景，根据多份日志聚合主线程调用栈；② 包含采样栈的场景，根据多份采样栈聚合 |

---

### 二级：主线程繁忙
> 判定特征：3s、Input 的栈顶**不完全相同**（栈顶存在差异）

| 三级根因 | 判定规则 |
|----------|----------|
| **Binder 调用繁忙** | 1. 主线程调用栈位于 Binder 调用：`OHOS::BinderInvoker::WaitForCompletion`；2. 检查采样栈是否位于 `OHOS::BinderInvoker::WaitForCompletion`；3. 采样栈占比 **> 30%** |
| **IO 操作繁忙** | 1. 采样栈主线程调用栈位于 IO 操作（`open` / `read` / `write` / `close`）；2. 采样栈占比 **> 30%** |
| **UI 操作繁忙** | 1. 采样栈位于 ArkUI 某组件操作（UI 关键字：`libace_compatible.z.so` / `OHOS::Ace::NG::`）；2. 采样栈占比 **> 30%** |
| **业务繁忙** | 1. 采样栈位于某一业务栈；2. 采样栈占比 **> 30%**（多个匹配取占比最多的函数；占比一致取层级最高的作为根因） |
| **频繁等锁** | 1. 采样栈位于等锁操作；2. 采样栈占比 **> 30%** |
| **执行耗时操作（多任务混合）** | 未匹配上述模式，根因为多任务混合执行；分析思路：① 检查采样栈是否位于某一业务栈；② 多份日志采样栈统一聚类 |

---

### 二级：系统高负载
> 判定特征：日志中包含 `system's low memory and thermal throttling`

| 三级根因 | 判定规则 |
|----------|----------|
| **整机高负载** | 日志中包含 `system's low memory and thermal throttling`（系统问题） |
