# jsvm常见问题分析参考手册

---

## 一、libv8_shared.so JSVM环境销毁后仍调用API导致Crash

### 前置：典型faultlog相关栈

**案例**

示例堆栈1：
```
#00 pc 00000000022765c/system/lib64/libv8_shared.so(Builtins_InterpreterEntryTrampoline+284)
#01 pc 000000000224ff0/system/lib64/libv8_shared.so(Builtins_JSEntryTrampoline+176)
#02 pc 000000000224c38/system/lib64/libv8_shared.so(Builtins_JSEntry+184)
#03 pc 00000000059775c/system/lib64/libv8_shared.so(v8::internal::(anonymous namespace)::Invoke(v8::iternal::Isolate*,v8::internal::(anonymous namespace)::InvokeParams const&)+792)
#04 pc 00000000059740c/system/lib64/libv8_shared.so(v8::internal::Execution::Call(v8::internal::isolate*,v8::internal::Handle<v8::internal::Object>,v8::internal::Handle<v8::internal::Object>,int,v8::internal::Handle<v8::internal::Object>*)+120)
```

示例堆栈2：
```
#00 pc 00000000068f670/system/lib64/libv8_shared.so(v8::internal::PagedSpaceBase::RelinkFreeListCategories(v8::internal::PageMetadata*)+80)
#01 pc 0000000006608bc/system/lib64/libv8_shared.so(v8::internal::MarkCompactCollector::StartSweepSpace(v8::internal::PageSpace*)+132)
#02 pc 000000000649de8/system/lib64/libv8_shared.so(v8::internal::MarkCompactCollector::Sweep()+576)
#03 pc 000000000647344/system/lib64/libv8_shared.so(v8::internal::MarkCompactCollector::CollectGarbage()+212)
#04 pc 00000000062bc1c/system/lib64/libv8_shared.so(v8::internal::Heap::MarkCompact()+396)
```

### 规则

1. 栈顶前几帧包含 **Builtins_InterpreterEntryTrampoline** / **Builtins_JSEntryTrampoline** / **Builtins_JSEntry** 符号
2. 包含 **v8::internal::Invoke** 符号

### 结论

**责任归属：应用(三方应用)问题**

此Faultlog报错栈帧即应用侧执行 **OH_JSVM_DestroyEnv()**（释放JSVM环境）后，仍在执行业务逻辑，尝试调用JSVM-API，触发报错。

**可能场景：**
- 回调函数中含有对JSVM-API的调用，在被触发时应用侧已经执行完 `OH_JSVM_DestroyEnv()`，此时直接在回调函数内尝试调用JSVM-API，则可能会导致该错误。开发者应当保证所有JSVM-C-API在同一个js线程上调用，并在此线程上为每个JSVM实例添加对应标记(thread_local_flag)，在执行 `OH_JSVM_DestroyEnv()`后将对应thread_local_flag置为true。回调函数中调用JSVM-API时，应当先判断当前是否在上述js线程上，若是，则直接根据thread_local_flag判断是否能够调用API，若不是，则把该任务抛到上述js线程上再进行判断和执行。
- 在跨线程调用场景中，可能出现在当前线程已经执行完 `OH_JSVM_DestroyEnv()` 后，其他线程仍在尝试调用JSVM-API的情况，此时也可能会导致该错误。
- 若使用任务队列来进行js任务执行，出现了先抛出destroy env的任务，后抛出普通js任务的情况，此时也可能导致该报错。针对这个情况，可以为JSVM实例添加thread_local_flag，若任务取出时thread_local_flag为true，则队列中剩余的任务需要全部跳过。

### 原因

应用在JSVM环境销毁后仍然尝试调用JSVM-API，导致触发V8引擎内部检查失败而崩溃。

---

## 二、libv8_shared.so HandleScope未正确处理导致Crash

### 前置：典型faultlog相关栈

**案例**

```
#00 pc 0000000001328fd0 /system/lib64/libv8_shared.so(v8::base::OS::Abort()+64)(6e56d6ca0f2f9ac7201183b0a6919309782a12c9)
#01 pc 00000000004860c8 /system/lib64/libv8_shared.so(v8::Utils::ReportApiFailure(char const*, char const*)+140)(6e56d6ca0f2f9ac7201183b0a6919309782a12c9)
#02 pc 00000000004860c8 /system/lib64/libv8_shared.so(v8::Utils::ReportApiFailure(char const*, char const*)+140)(6e56d6ca0f2f9ac7201183b0a6919309782a12c9)
#03 pc 00000000005d4064 /system/lib64/libv8_shared.so(v8::internal::HandleScope::Extend(v8::internal::Isolate*)+372)(6e56d6ca0f2f9ac7201183b0a6919309782a12c9)
#04 pc 00000000004866a4 /system/lib64/libv8_shared.so(v8::HandleScope::CreateHandle(v8::internal::Isolate*, unsigned long)+72)(6e56d6ca0f2f9ac7201183b0a6919309782a12c9)
#05 pc 0000000000051714 /system/lib64/ndk/libjsvm.so(v8impl::FinalizerTracker::CallFinalizer()+112)
#06 pc 00000000000517b0 /system/lib64/ndk/libjsvm.so(v8impl::FinalizerTracker::Finalize()+20)
#07 pc 000000000005123c /system/lib64/ndk/libjsvm.so(v8impl::RefTracker::FinalizeAll(v8impl::RefTracker*)+36)
#08 pc 0000000000050d88 /system/lib64/ndk/libjsvm.so(JSVM_Env__::DeleteMe()+28)
#09 pc 0000000000035358 /system/lib64/ndk/libjsvm.so(OH_JSVM_DestroyEnv+40)
```

### 规则

1. 栈顶前几帧包含 **HandleScope::Extend** / **HandleScope::CreateHandle** / **DestroyEnv** 符号
2. 包含 **HandleScope** 符号

### 结论

**责任归属：应用(三方应用)问题**

此Faultlog报错栈帧即应用侧即将执行 **OH_JSVM_DestroyEnv()** 释放JSVM环境时，业务逻辑中存在未处理的 **Exception** 对象，而此时HandleScope已关闭，导致在进行Handle Exception处理过程中，触发HandleScope Check失败。

### 原因

应用在销毁JSVM环境时，未正确处理业务逻辑中的Exception对象，导致在HandleScope已关闭的情况下尝试创建Handle，触发V8引擎内部检查失败而崩溃。