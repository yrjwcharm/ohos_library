# ArkTS 内存泄漏故障模式库

本库定义了 ArkTS / OpenHarmony 堆内存泄漏的标准二级根因分类。**每一个被识别为泄漏嫌疑的对象都必须从本库中匹配一个故障模式编号**，并在报告中标注。

定位入口：将内存对象按 Retained Size 从大到小排序，**查看其引用根节点（distance=1 的节点）类型**，根据根节点类型匹配下表。

---

## FM-01 · ROOT_VM 持有 (ArkTS 侧根节点持有)

**全称**: 对象被 ROOT_VM 类型的根节点持有
**含义**: ArkTS 对象被 ArkTS 侧根节点对象持有

**定位方法**:
1. 将内存对象按 Retained size 从大到小排序
2. 查看对象的引用根节点 (distance=1) 是否是 ROOT_VM 类型
3. 若引用根节点是 `Source_Text_Module_Record` (SourceTextModule) 对象或 `global_env` 对象，可确认为 ROOT_VM 类型

**典型 distance=1 节点名**:
- `SourceTextModule` / `Source_Text_Module_Record`
- `global_env`
- `GlobalEnv`

**含义解读**:
- `SourceTextModule` 持有 → 对象被某个 ts/ets 模块的 export 引用，模块卸载之前不会释放
- `global_env` 持有 → 对象挂在全局环境上，相当于 `globalThis.xxx = obj`

**修复方向**:
- 检查模块顶层是否定义了大对象 / 累积容器
- 在合适生命周期点 (页面销毁、模块卸载) 主动置空
- 避免在模块顶层 import 时初始化大数据


---

## FM-02 · ROOT_FRAME 持有 (ArkTS 侧根节点持有)

**全称**: 对象被 ROOT_FRAME 类型的根节点持有
**含义**: ArkTS 对象被 ArkTS 侧栈帧根节点持有

**定位方法**:
1. 将内存对象按 Retained size 从大到小排序
2. 查看对象的引用根节点 (distance=1) 是否是 ROOT_FRAME 类型

**含义解读**:
- 对象被某个尚未返回的函数栈帧的局部变量引用
- 通常意味着有"卡住的调用栈"或"长期不退出的协程/异步任务"

**修复方向**:
- 检查长生命周期的 async 函数 / Promise 链
- 确认事件循环回调没有捕获大对象
- 检查 generator / for-await-of 是否长期暂停


---

## FM-03 · ROOT_LOCAL_HANDLE 持有 (Native 侧 LocalHandle)

**全称**: 对象被 ROOT_HANDLE 根节点持有，子类型为局部引用 LocalHandle
**含义**: ArkTS 对象被 Native 侧根节点引用持有 (局部句柄)

**定位方法**:
1. 将内存对象按 Retained size 从大到小排序
2. 查看对象的引用根节点 (distance=1) 是否是 ROOT_LOCAL_HANDLE 类型

**创建 LocalHandle 引用的常见 napi 接口**:
| 类别 | 接口 |
|------|------|
| 对象创建 | `napi_create_object` / `napi_create_int32` / `napi_create_string_utf8` |
| 属性访问 | `napi_get_property` |
| 方法调用 | `napi_call_function` |
| 异步任务 | `napi_create_async_work` |

**含义解读**:
- LocalHandle 本应在 Native 函数返回时随 HandleScope 释放
- 如果还活着，通常意味着 HandleScope 没有正确弹栈，或 LocalHandle 被错误地长期保存

**修复方向**:
- 检查 napi 调用是否正确使用 `napi_open_handle_scope` / `napi_close_handle_scope`
- 长生命周期的 Native 持有应改用 Reference (GlobalHandle) + 显式释放
- 检查异步任务回调是否泄漏 HandleScope


---

## FM-04 · ROOT_GLOBAL_HANDLE 持有 (Native 侧 GlobalHandle)

**全称**: 对象被 ROOT_HANDLE 根节点持有，子类型为全局引用 GlobalHandle
**含义**: ArkTS 对象被 Native 侧根节点引用持有 (全局句柄)

**定位方法**:
1. 将内存对象按 Retained size 从大到小排序
2. 查看对象的引用根节点 (distance=1) 是否是 ROOT_GLOBAL_HANDLE 类型

**创建 GlobalHandle 引用的常见 napi 接口**:
| 接口 | 说明 |
|------|------|
| `napi_create_reference` | 显式创建引用计数句柄 |
| `napi_wrap` (强引用) | 将 Native 对象与 JS 对象强绑定 |
| `napi_acquire_threadsafe_function` | 跨线程函数引用 |
| `napi_create_promise` | Promise 创建时的内部引用 |

**含义解读**:
- GlobalHandle 必须由 Native 代码显式调用 `napi_delete_reference` / `napi_release_threadsafe_function` 释放
- 这是 Native 侧最常见的内存泄漏来源之一 — Native 模块忘了释放引用，JS 对象就活着

**修复方向**:
- 检查所有 `napi_create_reference` 是否有配对的 `napi_delete_reference`
- 检查 `napi_wrap` 是否注册了 finalizer 在 JS 对象回收时释放 Native 资源
- 检查 `napi_acquire_threadsafe_function` 是否有配对的 release
- 检查 Promise 是否被正确 resolve/reject (未完成的 Promise 会持有引用)


---

## 故障模式速查表

| 编号 | 名称 | distance=1 节点特征 | 责任侧 | 优先级 |
|------|------|---------------------|--------|--------|
| FM-01 | ROOT_VM | `SourceTextModule` / `global_env` | ArkTS | 高 |
| FM-02 | ROOT_FRAME | (栈帧节点，待标签支持) | ArkTS | 中 |
| FM-03 | ROOT_LOCAL_HANDLE | (LocalHandle 节点，待标签支持) | Native | 高 |
| FM-04 | ROOT_GLOBAL_HANDLE | (GlobalHandle 节点，待标签支持) | Native | 高 |

---

## 匹配规则 (供分析使用)

对每个泄漏嫌疑对象，按以下顺序匹配：

1. **看 distance=1 节点名**:
   - `SourceTextModule` / `Source_Text_Module_Record` / `global_env` / `GlobalEnv` → **FM-01**
   - 含 `LocalHandle` 字样 → **FM-03**
   - 含 `GlobalHandle` / `Reference` / `napi_ref` 字样 → **FM-04**
   - 栈帧相关 (Frame / StackFrame) → **FM-02**

2. **若 distance=1 节点信息不足**：
   - 看完整引用链中是否出现上述特征节点
   - 若仍无法匹配，标注为 **FM-Unknown** 并说明原因 (通常是当前快照不支持 ROOT 标签)

3. **报告中必须出现的字段**:
   - `故障模式: FM-XX (名称)`
   - `责任侧: ArkTS / Native`
   - `根节点类型: <distance=1 节点名>`
