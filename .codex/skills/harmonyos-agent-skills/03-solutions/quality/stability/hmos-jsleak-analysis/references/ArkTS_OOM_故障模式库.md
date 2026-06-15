# ArkTS 内存 OOM 故障模式库

> 一级根因唯一：**ArkTS OOM**。其下统一并列全部二级根因，每个二级根因再下钻到三级根因。

## 目录
1. [根因分级模型](#1-根因分级模型)
2. [一级根因](#2-一级根因)
3. [二级根因总览](#3-二级根因总览)
4. [二级与三级根因详述](#4-二级与三级根因详述)
5. [故障检测机制](#5-故障检测机制)
6. [定位方法总结](#6-定位方法总结)

---

## 1. 根因分级模型

| 分级 | 含义 | 定位手段 |
|------|------|---------|
| 一级根因 | 判定故障大类，即是否为 ArkTS OOM | 订阅故障事件、解析 Faultlog 中的 OOM 关键字 |
| 二级根因 | 确定泄漏对象的持有方（根节点类型） | 按 Retained size 排序，查看 distance=1 的根节点类型 |
| 三级根因 | 定位到具体的代码/业务泄漏场景 | 结合扫描工具调用栈、对象属性名与文件名分析 |

---

## 2. 一级根因

全库只设一个一级根因：**ArkTS OOM**。所有二级根因统一挂接在该一级根因之下。

| 一级根因 | 检测关键词 |
|---------|-----------|
| ArkTS OOM | `Out Of Memory` / `js_heap` / `AllocateObject failed` / `AllocateNonMovableObject failed` / `Cannot allocate Promise` |

---

## 3. 二级根因总览

| 编号 | 二级根因（根节点持有类型） |
|------|---------------------------|
| S1 | VMRoot 类型根节点持有 |
| S2 | FrameRoot 类型根节点持有 |
| S3 | HandleRoot — LocalHandle 类型根节点持有 |
| S4 | HandleRoot — GlobalHandle 类型根节点持有 |
| S5 | 对象被 ArkTS-Sta 对象持有 |
| S6 | 一次性分配超大对象导致 OOM |
| S7 | hclass 不断创建导致 NonMovableSpace OOM |
| S8 | ROOT_THREAD 线程根节点持有 |
| S9 | ROOT_FRAME 栈帧根节点持有 |
| S10 | ROOT_CLASS 类定义根节点持有 |
| S11 | ROOT_CLASS_LINKER 根节点持有 |
| S12 | ROOT_NATIVE_LOCAL Native 局部引用根节点 |
| S13 | ROOT_NATIVE_GLOBAL Native 全局引用根节点 |
| S14 | ROOT_VM 根节点持有 |
| S15 | ROOT_VM RootProvider 根节点持有 |
| S16 | ROOT_TENURED 根节点持有 |
| S17 | ROOT_AOT_STRING_SLOT 根节点持有 |

---

## 4. 二级与三级根因详述

### S1. VMRoot 类型根节点持有

#### S1.1 泄漏对象被模块级变量持有
| 属性 | 值 |
|-----|-----|
| 定位层级 | 三级 |
| 根因描述 | export 对象会被 sourceTextModule 系统对象持有而无法释放，其间接持有的对象也无法释放，需手动断开引用关系 |
| 检测方法 | 按 Retained size 排序，查看引用根节点（distance=1）是否被 Source_Text_Module_Record 持有 |
| 修复建议 | 检查缓存策略是否有大小限制与清理机制；检查模块持有的对象是否有清理逻辑 |

#### S1.2 泄漏对象被全局变量持有
| 属性 | 值 |
|-----|-----|
| 定位层级 | 三级 |
| 根因描述 | 全局变量挂在 globalEnv 的 globalObject 中，被 globalThis 长期持有 |
| 检测方法 | 按 Retained size 排序，查看引用根节点（distance=1）是否被 global_env 持有 |
| 修复建议 | 避免在全局对象中存储大对象，定期清理全局引用 |

#### S1.3 泄漏对象被闭包持有，闭包被虚拟机持有
| 属性 | 值 |
|-----|-----|
| 定位层级 | 三级 |
| 根因描述 | 闭包允许函数访问外部变量，但会使这些变量长期驻留内存，避免被 GC 回收 |
| 检测方法 | ① 按 Retained size 排序，查看引用根节点（distance=1）是否被 lexical_env[] 闭包变量持有；② 查看该 lexical_env[] 闭包对象的引用根节点（distance=1）是否带 VMRoot 标签 |
| 修复建议 | 手动断开闭包中不需要的引用，避免在闭包中持有大型对象 |

---

### S2. FrameRoot 类型根节点持有

#### S2.1 泄漏对象在栈上被创建或被栈上相关对象引用
| 属性 | 值 |
|-----|-----|
| 定位层级 | 二级（等同二级根因） |
| 根因描述 | 调用某函数且未退出其作用域时，局部变量与函数入参对象被认定为 FrameRoot 类型根节点 |
| 检测方法 | 同二级根因定位方法 |
| 修复建议 | 伴随退栈内存即可释放，开发者一般无需关注 |

---

### S3. HandleRoot — LocalHandle 类型根节点持有

**创建 LocalHandle 的常见途径：**
- 对象创建：`napi_create_object`、`napi_create_int32`、`napi_create_string_utf8`
- 属性访问：`napi_get_property`
- 方法调用：`napi_call_function`
- 异步任务：`napi_create_async_work`

**通用检测方法（S3 各三级根因共用）：** ① 打开快照文件，按 Retained size 排序；② 观察泄漏对象引用根节点（distance=1）是否被 LocalHandleRoot 持有；③ 通过对象名、属性名、文件名找到相关业务逻辑；④ 用 DevEcoStudio 的 LocalHandle 扫描工具关联调用栈。


| 编号 | 三级根因 | 根因描述 | 修复建议 |
|------|---------|---------|---------|
| S3.1 | napi_value 未使用 scope 管理 | 开发者创建的 napi_value 未使用 napi_open_handle_scope / napi_close_handle_scope 管理 | 使用 handle scope 成对管理 napi_value |
| S3.2 | 使用 scope 但未关闭 | 使用了 napi_open_handle_scope 但未调用 napi_close_handle_scope | 确保 scope 成对关闭 |
| S3.3 | 框架 napi_value 未用 scope | 使用 ArkUI 等系统组件时直接或间接调用框架层代码触发 | 框架层问题，反馈给框架层团队分析 |
| S3.4 | 框架 scope 未关闭 | 系统框架创建的 napi_value 使用 scope 但未关闭 | 框架层问题，反馈给框架层团队分析 |
| S3.5 | 异步函数致 scope 失效 | 创建对象代码用 scope 包裹，但中间有异步函数导致 scope 范围失效 | 异步调用前关闭 scope，或在异步回调中正确管理 scope |

---

### S4. HandleRoot — GlobalHandle 类型根节点持有

**创建 GlobalHandle 的常见途径：**
- `napi_create_reference`
- `napi_wrap` 进行强引用绑定
- `napi_acquire_threadsafe_function`
- `napi_create_promise`

**通用检测方法（S4 各三级根因共用）：** ① 打开快照文件，按 Retained size 排序；② 观察泄漏对象引用根节点（distance=1）是否被 GlobalHandleRoot 持有；③ 若引用链中包含 lexical_env[] 闭包变量则归类为闭包；④ 用 DevEcoStudio 的 GlobalHandle 扫描工具获取调用栈。


| 编号 | 三级根因 | 根因描述 | 修复建议 |
|------|---------|---------|---------|
| S4.1 | reference 未删除 | napi_create_reference 创建的引用未调用 napi_delete_reference 删除 | 及时调用 napi_delete_reference |
| S4.2 | napi_wrap 未解绑 | napi_wrap 绑定了强引用但未调用 napi_remove_wrap 解绑 | 调用 napi_remove_wrap 解绑强引用 |
| S4.3 | threadsafe 计数未清零 | napi_acquire_threadsafe_function 增加引用计数后未释放 | 调用 napi_release_threadsafe_function 清零引用计数 |
| S4.4 | promise 未闭环 | napi_create_promise 的全局引用未调用 resolve/reject 闭环 | 适时调用 napi_resolve_deferred 或 napi_reject_deferred |
| S4.5 | 闭包被 GlobalHandle 持有 | 闭包持有泄漏对象，闭包本身被 GlobalHandle 对象持有 | 断开闭包中不必要的全局引用 |
| S4.6 | setInterval 未清理 | setInterval 持有泄漏对象未 clearInterval，且定时器被底层全局引用持有 | 组件生命周期结束时调用 clearInterval |

---

### S5. 对象被 ArkTS-Sta 对象持有
| 属性 | 值 |
|-----|-----|
| 定位层级 | 二级 |
| 根因描述 | 对象被 ArkTS-Sta 类型对象持有导致泄漏 |
| 检测方法 | 按 Retained size 排序，查看引用根节点（distance=1）是否为 ArkTS-Sta 类型对象 |

---

### S6. 一次性分配超大对象导致 OOM
| 属性 | 值 |
|-----|-----|
| 定位层级 | 三级（等同二级） |
| 根因描述 | 一次性分配超大对象导致 OOM |
| 检测特征 | `OutOfMemory when trying to allocate [bytes] bytes function name: SharedHeap::AllocateHugeObject` |
| 修复建议 | 避免一次性分配超大内存，合理分批处理大数据 |

---

### S7. hclass 不断创建导致 NonMovableSpace OOM
| 属性 | 值 |
|-----|-----|
| 定位层级 | 二级 |
| 根因描述 | 对象频繁变动或不停创建布局不同的对象，导致 hclass 不断创建，进而 NonMovableSpace OOM |
| 检测特征 | `OutOfMemory when nonmovable live obj size: [bytes] bytes function name: Heap::CheckNonMovableSpaceOOM` |
| 修复建议 | 减少对象类型的动态变化，复用相同布局的对象 |

---

### S8. ROOT_THREAD 线程根节点持有

| 编号 | 三级根因 | 持有对象 | 说明 | 定位层级 |
|------|---------|---------|------|---------|
| S8.1 | localObjects_ | 线程本地对象 | 通过 localObjectHandle 添加到线程 root 集 | 一级 |
| S8.2 | taggedHandleScopes_ | 线程本地 TaggedType handle scope | For JS TaggedType | 一级 |
| S8.3 | taggedGlobalHandleScopes_ | 线程全局 TaggedType handle scope | For Global JS TaggedType | 一级 |
| S8.4 | objectHeaderHandleScopes_ | 线程本地 objectheader handle scope | For objectHeader | 一级 |
| S8.5 | flattenedStringCache_ | 扁平化字符串缓存 | 字符串 flatten 或拼接的结果缓存 | 一级 |

---

### S9. ROOT_FRAME 栈帧根节点持有
| 属性 | 值 |
|-----|-----|
| 三级根因 | ets 方法 vreg：iframe/cframe 的 vreg 中保存的对象引用 |
| 说明 | ets 方法执行过程中的存活对象保存在 frame 的 vreg 中，方法入参、局部变量作为 root 集 |
| 可能原因 | 深的 ets 方法递归调用；局部变量个数太多 |
| 定位方法 | 对每个线程使用 StackWalker 遍历 frame，观察对象是否被 vreg 持有 |
| 定位层级 | 一级 |

---

### S10. ROOT_CLASS 类定义根节点持有
| 属性 | 值 |
|-----|-----|
| 三级根因 | classLinker 加载的类对象及静态字段中的对象引用 |
| 定位方法 | 遍历 `classLinker->GetExtension()->EnumerateClasses()` |
| 定位层级 | 一级 |

---

### S11. ROOT_CLASS_LINKER 根节点持有
| 属性 | 值 |
|-----|-----|
| 三级根因 | ClassLinkerContext 持有的对象 |
| 定位方法 | 遍历 `classLinker->GetExtension()->EnumerateContexts()` |
| 定位层级 | 一级 |

---

### S12. ROOT_NATIVE_LOCAL Native 局部引用根节点

**持有对象：** 线程默认 LocalScope 中创建的 localRef，位于 frame0 中，生命周期跟随线程。
**持有位置：** `coroutine->GetEtsNapiEnv()->GetEtsReferenceStrage()`

| 编号 | 三级根因 | 说明 | 定位层级 |
|------|---------|------|---------|
| S12.1 | 在线程默认 LocalScope 中创建新 localRef | 生命周期跟随线程，无法释放 | 一级 |
| S12.2 | scope 管理不当导致泄漏 | CreateLocalScope / DestroyLocalScope 未正确成对使用 | 一级 |

---

### S13. ROOT_NATIVE_GLOBAL Native 全局引用根节点

**持有位置：** `GetGlobalObjectStorage()->VisitObjects()`

| 属性 | 值 |
|-----|-----|
| 三级根因 | GolbalReference_Create 创建的引用未删除 |
| 说明 | GolbalReference_Create 创建引用关联但未调用 GolbalReference_Destroy 删除 |
| 定位层级 | 一级 |

---

### S14. ROOT_VM 根节点持有

| 编号 | 三级根因 | 持有对象 | 说明 | 定位层级 |
|------|---------|---------|------|---------|
| S14.1 | VM 的 doubleToStringCache_ | 字符串操作缓存的对象 | 缓存在 VM 结构体中 | 一级 |
| S14.2 | VM 的 floatToStringCache_ | 同上 | 同上 | 一级 |
| S14.3 | VM 的 longToStringCache_ | 同上 | 同上 | 一级 |

---

### S15. ROOT_VM RootProvider 根节点持有

**持有位置：** `PandaEtsVm 的 rootProviders_`

| 属性 | 值 |
|-----|-----|
| 三级根因 | Interop 被 SharedReferenceStorage 持有 |
| 说明 | 对象通过 Interop 被 SharedReferenceStorage 持有，存在交叉引用，1.2 对象被 1.1 对象持有 |
| 定位层级 | 一级 |

---

### S16. ROOT_TENURED 根节点持有
| 属性 | 值 |
|-----|-----|
| 三级根因 | 跨代引用记录 |
| 说明 | 记录老年代对年轻代的跨代引用，在分代 GC 中作为 Root 以节约 GC 时间 |
| 定位层级 | 一级 |

---

### S17. ROOT_AOT_STRING_SLOT 根节点持有
| 属性 | 值 |
|-----|-----|
| 三级根因 | AOT 编译的字符串常量池 |
| 说明 | AOT 编译的字符串常量池 |
| 定位层级 | 一级 |

---

## 5. 故障检测机制

### 5.1 OOM 触发条件 — 按虚拟机堆大小

| Heap 类型 | 主线程限制 | 子线程限制（worker/taskpool） |
|----------|-----------|-------------------------------|
| Local Heap | 448M（抖音 512M） | 768M |
| Shared Heap | 778M | — |
| Total Heap | 1.5G | — |

### 5.2 OOM 触发条件 — 按堆内部 Space 大小

| Heap | Space | 约束 |
|------|-------|------|
| Local Heap | 主线程 old space + huge space | 约 350MB |
| Local Heap | 子线程 old space + huge space | 约 687MB |
| Local Heap | NonMovableSpace | 约 64MB |
| Shared Heap | shared old space | 约 350MB |
| Shared Heap | shared huge space | 约 350MB |
| Shared Heap | NonMovableSpace | 约 64MB |

### 5.3 OOM 触发条件 — 堆/Frame/协程上限

| 类别 | 具体触发 |
|------|---------|
| 堆大小超过上限 512M | AllocateObject 超限；AllocateNonMovableObject 超限；创建 EtsPromise 超限；AllocateArray 异常 |
| Frame 空间超限 | InvokeInterpretedCode / InvokeContext / EnterNativeMethodFrame 创建 frame 失败 |
| 创建协程失败 | ThreadedCoroutineManager 创建协程失败 |

### 5.4 故障事件订阅

| 事件 | 判定方式 |
|------|---------|
| JS Error / CPPCrash 崩溃事件 | 解析 Faultlog 是否含 “Out Of Memory” 关键字；`resource_type` 字段为 `js_heap` 表示发生 OOM |
| 资源泄漏事件 | 事件类型 `hiAppEvent.event.RESOURCE_OVERLIMIT`；`resource_type` 为 `js_heap`；`external_log` 可获取 OOM 快照日志（依赖配置） |

---

## 6. 定位方法总结

- **一级：** 通过订阅故障事件并解析 Faultlog 的 OOM 关键字，判定是否为 ArkTS OOM。
- **二级：** 将内存对象按 Retained size 排序，查看引用根节点（distance=1）的根节点类型（VMRoot、FrameRoot、LocalHandleRoot、GlobalHandleRoot、ArkTS-Sta、各 ROOT_* 类型等）。
- **三级：** 根据二级根因类型选择对应分析方法，使用 DevEcoStudio 扫描工具获取调用栈，结合泄漏对象的属性名、文件名定位业务场景。

---

