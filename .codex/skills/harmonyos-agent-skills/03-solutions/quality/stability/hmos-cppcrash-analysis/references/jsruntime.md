# jsruntime 常见问题分析参考手册

---

## 一、3s栈和6s栈不一样

### 前置

app_freeze/sys_freeze 堆栈

### 规则

3s栈：
```
Catche stack trace start time: 2026-03-15 22:13:52.365
Failed to dump normal stacktrace for 41173
Reason:
normal stack:failed to fully dump due to timeout
Tid:41173, Name:ss.hm.ugc.aweme
state=S, utime=192062, stime=44004, priority=-14, nice=-10, clk=100
#00 pc 0000000000272950 /system/lib64/platformsdk/libark_jsruntime.so(3beab3d3995f1b1c11f542938d599a63)
#01 pc 000000000026673c /system/lib64/platformsdk/libark_jsruntime.so(3beab3d3995f1b1c11f542938d599a63)
#02 pc 0000000000264b2c /system/lib64/platformsdk/libark_jsruntime.so(3beab3d3995f1b1c11f542938d599a63)
#03 pc 00000000002641a4 /system/lib64/platformsdk/libark_jsruntime.so(3beab3d3995f1b1c11f542938d599a63)
#04 pc 0000000000502d30 /system/lib64/platformsdk/libark_jsruntime.so(3beab3d3995f1b1c11f542938d599a63)
#05 pc 0000000000e0d9ec /system/lib64/module/arkcompiler/stub.an(RTStub_PushCallArgsAndDispatchNative+40)
#06 pc 00000000004653d4 /system/lib64/module/arkcompiler/stub.an(BCStub_HandleCallthis3Imm8V8V8V8V8StwCopy+460)
```

6s栈：
```
Catche stack trace start time: 2026-03-15 22:13:56.193
Failed to dump normal stacktrace for 41173
Reason:
normal stack:in dump slow period and return kernel stack
Tid:41173, Name:ss.hm.ugc.aweme
state=R, utime=192952, stime=44217, priority=-14, nice=-10, clk=100
#00 pc 00000000001d4138 /system/lib/ld-musl-aarch64.so.1(73c8ccfd08a34c45800c16fb998a68cc)
```

1. 在日志中可以查找报错的Tid:41173，一般会有两个结果对应的是3s栈和6s栈，可以发现它们的pc地址和调用栈都不一样，满足3s 6s栈不一致现象

### 结论

由于3s和6s瞬时栈不一样，说明并非是栈顶卡住，此时看堆栈已经无意义，请应用自己结合trace进一步分析

---

## 二、运行任务数量过多问题

### 前置

app_freeze/sys_freeze 堆栈

### 规则

```
Total size of Immediate events : 2848
 High priority event queue information:
 Total size of High events : 13
 Low priority event queue information:
 Total size of Low events : 42
 Idle priority event queue information:
 Total size of Idle events : 8
 Total event size : 2913
Main handler dump end time: 2026-03-21 11:11:31.955
```

1. 在日志中搜索Total event size关键字，如果说标志是大于400，说明设备任务负载过高，会导致卡顿

### 结论

这类问题需要应用自己排查，在Total event size日志的上面，会打印是哪些任务过多，应用可以根据这些信息去排查

---

## 三、napi栈浅

### 前置

cppcrash 堆栈

### 规则

```
Reason:Signal:SIGSEGV(SEGV_MAPERR)@0x006b8bcb86ab7b1b 
Fault thread info:
Tid:25311, Name:ch.AlipayGwatch
#00 pc 0000000000071a58 /system/lib64/platformsdk/libace_napi.z.so(napi_get_reference_value+48)(6c2bb24db25e36618ac0e59887fd684a)
#01 pc 0000000000020b40 /system/lib64/platformsdk/libbt_napi_common.z.so(OHOS::Bluetooth::(anonymous namespace)::NapiCallFunction(napi_env__*, napi_ref__*, napi_value__**, unsigned long)+64)(e15bce1f11392119636fdc6a6a55fdd3)
#02 pc 0000000000021044 /system/lib64/platformsdk/libbt_napi_common.z.so(OHOS::Bluetooth::NapiCallback::CallFunction(std::__h::shared_ptr<OHOS::Bluetooth::NapiNativeObject> const&)+156)(e15bce1f11392119636fdc6a6a55fdd3)
```

1. 日志中栈顶的napi so，01帧是调用napi接口的业务方，这种情况很大原因是因为调用napi接口的so函数传参非法导致，需要跳过libark_jsruntime.so和libace_napi.z.so找下一帧so分析

### 结论

一般堆栈中napi的调用不超过3帧，这种情况很大原因是因为调用napi接口的那个so函数传参非法导致，需要跳过libark_jsruntime.so和libace_napi.z.so找下一帧so分析

---

## 四、栈顶大于等于3个musl帧

### 前置

cppcrash 堆栈

### 规则

```
Reason:Signal:SIGSEGV(SEGV_MAPERR)@0x0000005c763042a8 
Fault thread info:
Tid:53731, Name:ei.hmsapp.music
#00 pc 00000000000a90f0 /system/lib/ld-musl-aarch64.so.1(__find_sym+248)(8a5c9ab8c1168e5eba0b24ddb34e1090)
#01 pc 00000000000a8b14 /system/lib/ld-musl-aarch64.so.1(do_one_reloc+768)(8a5c9ab8c1168e5eba0b24ddb34e1090)
#02 pc 00000000000a7288 /system/lib/ld-musl-aarch64.so.1(do_relocs+188)(8a5c9ab8c1168e5eba0b24ddb34e1090)
#03 pc 000000000009b034 /system/lib/ld-musl-aarch64.so.1(reloc_all+232)(8a5c9ab8c1168e5eba0b24ddb34e1090)
#04 pc 00000000000a15d0 /system/lib/ld-musl-aarch64.so.1(dlopen_impl+4272)(8a5c9ab8c1168e5eba0b24ddb34e1090)
#05 pc 0000000000049f54 /system/lib64/platformsdk/libace_napi.z.so(c5a594377536296a13a4ed3139c2ab7c)
#06 pc 000000000004f600 /system/lib64/platformsdk/libace_napi.z.so(NativeModuleManager::FindNativeModuleByDisk(char const*, char const*, char const*, bool, bool, std::__h::basic_string<char, std::__h::char_traits<char>, std::__h::allocator<char>>&, char (*) [4096], NativeModule*)+992)(c5a594377536296a13a4ed3139c2ab7c)
```

1. 栈顶调用链musl帧超过3帧，此时不能跳过ld-musl-aarch64.so.1，首问是musl

### 结论

栈顶调用链musl帧超过3帧，此时不能跳过ld-musl-aarch64.so.1，首问是musl

---

## 五、Out of Memory 或 OOM

### 前置

cppcrash 堆栈

### 规则

```
Reason:Signal:SIGABRT(SI_TKILL)@0x01317b3600003b47 from:15175:20020022
LastFatalMessage:[gc] SharedHeap OOM
Fault thread info:
Tid:15283, Name:OS_GC_Thread
#00 pc 00000000001b16c4 /system/lib/ld-musl-aarch64.so.1(raise+216)(6dfe4ecea22714b3e8fc8be36e2d9484)
#01 pc 000000000015d718 /system/lib/ld-musl-aarch64.so.1(abort+24)(6dfe4ecea22714b3e8fc8be36e2d9484)
#02 pc 0000000000373624 /system/lib64/platformsdk/libark_jsruntime.so(common::HiLog<(LogLevel)7, (Component)1>::~HiLog()+120)(d1915651d59764e7eae92635aa40a1b2)
#03 pc 0000000000576484 /system/lib64/platformsdk/libark_jsruntime.so(panda::ecmascript::SharedHeap::CollectGarbageFinish(bool, panda::ecmascript::TriggerGCType)+772)(d1915651d59764e7eae92635aa40a1b2)
```

1. 崩溃栈日志最上方有LastFatalMessage:[gc] SharedHeap OOM字样的是OOM问题(内存泄漏)，OOM不看堆栈分析，需要拿到memory leak文件分析内存泄露情况

### 结论

OOM不看堆栈分析，需要拿到memory leak文件分析内存泄漏情况，应用开发者自己先分析，应用自排查


---

## 六、GC堆栈疑似跨线程访问env问题

### 前置

cppcrash 堆栈

### 规则

规则1：
```
Reason:Signal:SIGSEGV(SEGV_ACCERR)@0x0000002cc5800008 
Fault thread info:
Tid:32189, Name:OS_GC_Thread
#00 pc 000000000052bd58 /system/lib64/platformsdk/libark_jsruntime.so(3aad567d00fac9535fda40922d18ea9e)
#01 pc 000000000051f5dc /system/lib64/platformsdk/libark_jsruntime.so(3aad567d00fac9535fda40922d18ea9e)
#02 pc 0000000000527b18 /system/lib64/platformsdk/libark_jsruntime.so(panda::ecmascript::NonMovableMarker::ProcessMarkStack(unsigned int)+176)(3aad567d00fac9535fda40922d18ea9e)
#03 pc 00000000004f1048 /system/lib64/platformsdk/libark_jsruntime.so(panda::ecmascript::ConcurrentMarker::ProcessConcurrentMarkTask(unsigned int)+52)(3aad567d00fac9535fda40922d18ea9e)
#04 pc 000000000050c230 /system/lib64/platformsdk/libark_jsruntime.so(panda::ecmascript::Heap::ParallelGCTask::Run(unsigned int)+112)(3aad567d00fac9535fda40922d18ea9e)
#05 pc 000000000065ed8c /system/lib64/platformsdk/libark_jsruntime.so(panda::ecmascript::Runner::Run(unsigned int)+188)(3aad567d00fac9535fda40922d18ea9e)
#06 pc 000000000065ee5c /system/lib64/platformsdk/libark_jsruntime.so(3aad567d00fac9535fda40922d18ea9e)
#07 pc 00000000001bdcac /system/lib/ld-musl-aarch64.so.1(start+236)(f77c0346c0084ebbadf721ea319f5f77)
```

规则2：
```
Reason:Signal:SIGABRT(SI_TKILL)@0x01317b3e0000375a from:14170:20020030
LastFatalMessage:[ecmascript] this branch is unreachable, type: 167
Fault thread info:
Tid:14263, Name:OS_GC_Thread
#00 pc 00000000001b0784 /system/lib/ld-musl-aarch64.so.1(raise+216)(f83970fe414a8a0eaeb706794b1b2f7b)
#01 pc 000000000015c7d8 /system/lib/ld-musl-aarch64.so.1(abort+24)(f83970fe414a8a0eaeb706794b1b2f7b)
#02 pc 0000000000372c24 /system/lib64/platformsdk/libark_jsruntime.so(common::HiLog<(LogLevel)7, (Component)1>::~HiLog()+120)(7a9330d8d0cab080a6916701f498ea55)
#03 pc 000000000099b808 /system/lib64/platformsdk/libark_jsruntime.so(7a9330d8d0cab080a6916701f498ea55)
#04 pc 0000000000999fe8 /system/lib64/platformsdk/libark_jsruntime.so(panda::ecmascript::FullGCRunner::EvacuateObject(panda::ecmascript::ObjectSlot, panda::ecmascript::TaggedObject*, panda::ecmascript::MarkWord const&)+360)(7a9330d8d0cab080a6916701f498ea55)
#05 pc 0000000000999e4c /system/lib64/platformsdk/libark_jsruntime.so(panda::ecmascript::FullGCRunner::HandleMarkingSlotObject(panda::ecmascript::ObjectSlot, panda::ecmascript::TaggedObject*)+384)(7a9330d8d0cab080a6916701f498ea55)
#06 pc 00000000009cf154 /system/lib64/platformsdk/libark_jsruntime.so(panda::ecmascript::BaseObjectVisitor<panda::ecmascript::FullGCMarkObjectVisitor>::operator()(common::BaseObject*, unsigned long, unsigned long, panda::ecmascript::VisitObjectArea)+100)(7a9330d8d0cab080a6916701f498ea55)
#07 pc 00000000009c46f4 /system/lib64/platformsdk/libark_jsruntime.so(panda::ecmascript::CompressGCMarker::ProcessMarkStack(unsigned int)+252)(7a9330d8d0cab080a6916701f498ea55)
#08 pc 00000000005f53ec /system/lib64/platformsdk/libark_jsruntime.so(panda::ecmascript::Heap::ParallelGCTask::Run(unsigned int)+368)(7a9330d8d0cab080a6916701f498ea55)
#09 pc 00000000003ad6ac /system/lib64/platformsdk/libark_jsruntime.so(common::Runner::Run(unsigned int)+540)(7a9330d8d0cab080a6916701f498ea55)
#10 pc 00000000003ad444 /system/lib64/platformsdk/libark_jsruntime.so(7a9330d8d0cab080a6916701f498ea55)
#11 pc 00000000001d0858 /system/lib/ld-musl-aarch64.so.1(start+240)(f83970fe414a8a0eaeb706794b1b2f7b)
```

1. 规则1中的堆栈，挂在GC阶段的ProcessMarkStack函数中，这种问题有可能是跨线程访问env的使用导致某个线程访问了一个已经被GC掉的对象
2. 规则2中的堆栈和规则1的情况的类似的，也可能存在跨线程访问env的问题

### 结论

对于这类GC堆栈的跨线程访问env的问题，建议开启多线程检测查找到问题的第一现场后再根据对应的崩溃日志定位解决


---

## 七、多线程问题

### 前置

cppcrash 堆栈

### 规则

```
Reason:Signal:SIGABRT(SI_TKILL)@0x01317b3400000c75 from:3189:20020020
LastFatalMessage:[default] [CheckThread] Fatal: ecma_vm cannot run in multi-thread! thread:3189 currentThread:4252
Fault thread info:
Tid:4252, Name:WorkerThread_Sy
#00 pc 00000000001c68c0 /system/lib/ld-musl-aarch64.so.1(raise+216)(d0012f55c5b689c060d2cf0d0007b050)
#01 pc 000000000017242c /system/lib/ld-musl-aarch64.so.1(abort+24)(d0012f55c5b689c060d2cf0d0007b050)
#02 pc 00000000002e585c /system/lib64/platformsdk/libark_jsruntime.so(common::HiLog<(LogLevel)7, (Component)1>::~HiLog()+120)(f44b896daac2f4306295f47784024248)
#03 pc 000000000026bf2c /system/lib64/platformsdk/libark_jsruntime.so(panda::ecmascript::EcmaVM::CheckThread() const+528)(f44b896daac2f4306295f47784024248)
#04 pc 000000000099bb90 /system/lib64/platformsdk/libark_jsruntime.so(panda::JSNApi::GetHandleAddr(panda::ecmascript::EcmaVM const*, unsigned long)+448)(f44b896daac2f4306295f47784024248)
#05 pc 00000000000490d8 /system/lib64/platformsdk/libace_napi.z.so(ArkNativeReference::Get(NativeEngine*)+88)(2bb688074496ae6c793849fd371650b1)
#06 pc 000000000007fb90 /system/lib64/platformsdk/libace_napi.z.so(napi_get_reference_value+48)(2bb688074496ae6c793849fd371650b1)
#07 pc 00000000000078d4 /system/lib64/module/multimodalawareness/libmotion_napi.z.so(OHOS::Msdp::MotionEventNapi::InsertRef(std::__h::shared_ptr<OHOS::Msdp::MotionEventListener>, napi_value__* const&, int, napi_env__*)+168)(086fd31f43a81204b5df0ca69e51ff90)
#08 pc 000000000000bb94 /system/lib64/module/multimodalawareness/libmotion_napi.z.so(OHOS::Msdp::MotionNapi::SubscribeMotion(napi_env__*, napi_callback_info__*) (.cfi)+4084)(086fd31f43a81204b5df0ca69e51ff90)
```

1. 上述堆栈开头明确报了: `Fatal: ecma_vm cannot run in multi-thread!`，这是典型的多线程问题第一现场
2. 07帧的so调用了一个napi_get_reference_value接口导致了后续崩溃，这类问题是07帧so跨线程访问了env去操作对象，导致对象被改坏了从而引起crash

### 结论

对于这类napi堆栈的跨线程访问env的问题，建议开启多线程检测查找到问题的第一现场后再根据对应的崩溃日志定位解决
