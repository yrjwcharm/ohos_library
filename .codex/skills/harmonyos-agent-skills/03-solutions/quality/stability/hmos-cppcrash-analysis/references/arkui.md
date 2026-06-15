# arkui 常见问题分析参考手册

---

## 一、libpromptaction.z.so 多线程调用导致ECMA VM崩溃

### 前置：典型cppcrash相关栈

**案例**

```
LastFatalMessage:[default] [CheckThread] Fatal: ecma_vm cannot run in multi-thread! thread:11747 currentThread:8562
Fault thread info:
#00 pc 00000000001b16c4 /system/lib/ld-musl-aarch64.so.1(raise+216)(6dfe4ecea22714b3e8fc8be36e2d9484)
#01 pc 000000000015d718 /system/lib/ld-musl-aarch64.so.1(abort+24)(6dfe4ecea22714b3e8fc8be36e2d9484)
#02 pc 000000000037355c /system/lib64/platformsdk/libark_jsruntime.so(common::HiLog<(LogLevel)7, (Component)1>::~HiLog()+120)(1fbc7781e52c91f8ef788e22d5b6bd0d)
#03 pc 000000000038682c /system/lib64/platformsdk/libark_jsruntime.so(panda::ecmascript::EcmaVM::CheckThread() const+528)(1fbc7781e52c91f8ef788e22d5b6bd0d)
#04 pc 00000000006c3894 /system/lib64/platformsdk/libark_jsruntime.so(panda::NumberRef::New(panda::ecmascript::EcmaVM const*, int)+456)(1fbc7781e52c91f8ef788e22d5b6bd0d)
#05 pc 000000000006d31c /system/lib64/platformsdk/libace_napi.z.so(napi_create_int32+60)(c9ea79c24f2d2830cec559f6b018bae9)
#06 pc 000000000002053c /system/lib64/module/libpromptaction.z.so(7273319eb8a5142379638da9b5ff5c50)
#07 pc 00000000026f27ec /system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::NG::OverlayManager::ShowToast(OHOS::Ace::NG::ToastInfo const&, std::__h::function<void (int)> const&)+1168)(e396829cf06b76ec87ccc92d7e45e3ed)
```

### 规则

1. LastFatalMessage符合特征 **ecma_vm cannot run in multi-thread! thread:xxx currentThread:yyy**
2. 跳过libark_jsruntime.so、libace_napi.z.so后下一帧是 **libpromptaction.z.so**

### 结论

**责任归属：应用(三方应用)问题**

需要应用排查使用 `import { promptAction } from '@kit.ArkUI'` 后直接使用的地方，建议整改成 **UIContext.getPromptAction()**。

### 原因

ECMA VM不支持多线程运行，应用在子线程调用了promptAction相关接口，导致线程不匹配触发崩溃。

---

## 二、libace_ndk.z.so 参数对象生命周期管理问题导致UAF Crash

### 前置：典型cppcrash相关栈

**案例**

```
Reason:Signal:SIGSEGV(SEGV_MAPERR)@0x006be9d6f7046c95 
#00 pc 000000000004ef7c /system/lib64/libace_ndk.z.so
#01 pc 0000000000bc5f00 /data/storage/el1/bundle/libs/arm64
```

### 规则

1. Reason行信号量为 **0x006b** 或者 **0x6b6b** 开头
2. 首栈为 **libace_ndk.z.so**，次栈为应用的栈

### 结论

**责任归属：应用(三方应用)问题**

libace_ndk.z.so是CAPI接口的桥接层，接口使用的都是C接口，存在大量裸指针使用情况，里面基本负责参数类型转化和调用实际的native接口。出现6b6b，基本是因为应用的入参包括this对象有可能已经被提前销毁，需要应用结合底下应用的so进行符号表解析后排查可能出现的 **use-after-free** 问题。

- 如果是调用的 **OH_NativeXComponent::XXX** 大概率是因为this对象已经释放
- 如果接口是无参数的，那大概率是this对象已经释放
- 如果接口传了ArkUI_Node，那大概率是这个node对象已经释放

### 原因

应用传入的this对象或参数对象在调用系统接口前已被提前销毁，导致访问已释放内存触发崩溃。

---

## 三、libace_compatible.z.so 尾部调用优化导致栈帧缺失

### 前置：典型cppcrash相关栈

**案例**

```
LastFatalMessage:[OnSurfaceCreated] crash occured on callback: 
#00 pc 00000000013dbc30 /system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::NG::XComponentPattern::OnSurfaceCreated()+612)(1b707a6d9e59cf48f4887c9571aa4b64)
```

### 规则

1. LastFatalMessage里面打印 **[函数名] crash occured on callback：**
2. LastFatalMessage最后会打印一个地址，需要通过这个地址，结合map表计算它实际落到哪个so，可以落到应用的某个so的代码段
3. 栈顶或者定界到栈顶是 **libace_compatible.z.so(OHOS::Ace::NG::XComponentPattern::函数名**

### 结论

因为应用so进行了 **尾部调用优化 (Tail Call Optimization, TCO)**，导致回栈时缺失了一帧应用的调用栈，需要根据LastFatalMessage里面的地址计算到的so的偏移量进行定界。

---

## 四、libace_compatible.z.so Paragraph对象生命周期管理问题导致UAF Crash

### 前置：典型cppcrash相关栈

**案例**

```
#01 pc 0000000000cfcaa0 /system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::NG::ParagraphUtil::ApplyIndent(OHOS::Ace::NG::ParagraphStyle&, OHOS::Ace::RefPtr<OHOS::Ace::NG::Paragraph> const&, double, OHOS::Ace::TextStyle const&, double)+152)(0e1cbde7053dfed9bab8e2aa476362fb)
#02 pc 0000000000cfb938 /system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::NG::TextLayoutAlgorithm::CreateParagraph(OHOS::Ace::TextStyle const&, std::__h::basic_string<char16_t, std::__h::char_traits<char16_t>, std::__h::allocator<char16_t>>, OHOS::Ace::NG::LayoutWrapper*, double)+3872)(0e1cbde7053dfed9bab8e2aa476362fb)
#03 pc 0000000000cf9394 /system/lib64/platformsdk/libace_compatible.z.so(0e1cbde7053dfed9bab8e2aa476362fb)
#04 pc 0000000000cf849c /system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::NG::TextLayoutAlgorithm::AddPropertiesAndAnimations(OHOS::Ace::TextStyle&, OHOS::Ace::RefPtr<OHOS::Ace::NG::TextLayoutProperty> const&, OHOS::Ace::NG::LayoutConstraintT<float> const&, OHOS::Ace::NG::LayoutWrapper*)+336)(0e1cbde7053dfed9bab8e2aa476362fb)
```

### 规则

1. 崩溃位置在 **Paragraph** 相关的逻辑里面

### 结论

**责任归属：应用(三方应用)问题**

大概率是因为应用使用了CAPI给text组件传了Paragraph，Paragraph的生命周期由应用管理，系统仅保存该对象的裸指针成员，如果应用对Paragraph生命周期管理不当，可能导致崩溃在系统侧的Paragraph使用过程。

如果可以反汇编，可以通过汇编查看是不是从TextPattern的GetExternalParagraph或者GetParagraph的获取到的externalParagraph_成员出了问题，来确认该问题。

**修复方案：**
通过 `OH_ArkUI_StyledString_CreateTypography` 创建的external paragraph，并且通过 `nodeAPI->setAttribute(text, NODE_TEXT_CONTENT_WITH_STYLED_STRING, externalparagraph)` 设置给了text节点之后，确保每一次调用 `OH_Drawing_DestroyTypography` 去销毁external paragraph之前，需要调用 `nodeAPI->resetAttribute(text, NODE_TEXT_CONTENT_WITH_STYLED_STRING, nullptr)` 把text节点里面的external paragraph置空。

### 原因

应用未正确管理Paragraph对象的生命周期，在系统侧使用该对象时已被应用侧销毁，导致访问已释放内存触发崩溃。

---

## 五、libace_compatible.z.so 非UI线程调用UI接口导致Crash

### 前置：典型cppcrash相关栈

**案例**

```
Reason:Signal:SIGSEGV(SEGV_MAPERR)@0x006b8ac89f0f72bf
Fault thread info:
Tid:39326, Name:OS_FFRT_2_12
#00 pc 000000000133c524 /system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::NG::PipelineContext::RemoveScheduleTask(unsigned int)+692)(e396829cf06b76ec87ccc92d7e45e3ed)
#01 pc 0000000000d2ed70 /system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::Scheduler::Stop()+104)(e396829cf06b76ec87ccc92d7e45e3ed)
#02 pc 000000000133538c /system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::Animator::Cancel()+484)(e396829cf06b76ec87ccc92d7e45e3ed)
#03 pc 0000000003306fec /system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::NG::ViewAnimate::AnimatorReset(ArkUIAnimator*, ArkUIAnimatorOption*)+120)(e396829cf06b76ec87ccc92d7e45e3ed)
#04 pc 0000000000070220 /system/lib64/libace_ndk.z.so(OH_ArkUI_Animator_ResetAnimatorOption+92)(7d9bc78d287ee170e1dadf72abbb422b)
#05 pc 00000000000b189c /data/storage/el1/bundle/libs/arm64/liblottie-turbo.so(LottieTurbo::Animator::UpdateFrameRateRange()+156)(944212797dc224e98c31426fe84193ab18465d1b)
#06 pc 00000000000a6fa0 /data/storage/el1/bundle/libs/arm64/liblottie-turbo.so(LottieTurbo::LottieHandler::InitHandleData()+124)(944212797dc224e98c31426fe84193ab18465d1b)
#07 pc 0000000000088d64 /data/storage/el1/bundle/libs/arm64/liblottie-turbo.so(944212797dc224e98c31426fe84193ab18465d1b)
```

### 规则

1. 崩溃线程**非UI线程**（大部分应用主线程就是UI线程）
2. 崩溃栈存在 **PipelineContext**、**UITaskScheduler**、**FrameNode**、**xxxPattern**、**Animator**、**Layout**、**Measure** 相关信息

### 结论

**责任归属：应用(三方应用)问题**

PipelineContext、UITaskScheduler为渲染管线相关资源，必须在UI线程使用，FrameNode、xxxPattern为UI节点相关资源，也必须在UI线程使用。Animator因为会触发布局（Layout、Measure），也必须在UI线程调用。

跳过libace_compatible.z.so、libace_ndk.z.so，找下一帧，如果是应用的so则是应用在子线程调用了UI接口，是应用问题，如果为系统栈，需要ArkUI定界。

### 原因

应用在子线程调用了UI线程专属接口，导致多线程安全问题触发崩溃。

---

## 六、libace_compatible.z.so UITaskScheduler多线程问题导致Crash

### 前置：典型cppcrash相关栈

**案例**

```
Reason:Signal:SIGSEGV(SEGV_MAPERR)@0x00000000000000d1  probably caused by NULL pointer dereference
Fault thread info:
Tid:6860, Name:.huajiao.huawei
#00 pc 00000000007e67f8 /system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::NG::UITaskScheduler::FlushLayoutTask(bool)+1020)(e83ee2a0e0cd62169014fd83f366cb46)
#01 pc 0000000000cd4fc0 /system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::NG::UITaskScheduler::FlushTask()+320)(e83ee2a0e0cd62169014fd83f366cb46)
#02 pc 00000000011e6890 /system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::NG::PipelineContext::FlushVsync(unsigned long, unsigned int)+604)(e83ee2a0e0cd62169014fd83f366cb46)
...
```

### 规则

1. 崩溃在 **UITaskScheduler::FlushLayoutTask**
2. 在子线程搜索是否存在 **FrameNode::MarkDirtyNode** 的调用栈

### 结论

**责任归属：应用(三方应用)问题**

这个UITaskScheduler对象只有通过PipelineContext（渲染管线）去使用，在不存在多线程问题的情况下不会发生崩溃，发生崩溃一定是因为多线程问题导致。

**下一步分析方向：**
- 如果存在FrameNode::MarkDirtyNode的调用栈：则是因为这个子线程调用的问题，跳过libace_compatible.z.so、libace_ndk.z.so，找下一帧，如果是应用的so则是应用在子线程调用了UI接口
- 如果不存在：提示应用排查给UI节点标脏逻辑是否在主线程执行

### 原因

应用在子线程执行了UI节点标脏操作，导致多线程安全问题触发崩溃。

---

## 七、libace_compatible.z.so 手势回调指针问题导致Crash

### 前置：典型cppcrash相关栈

**案例**

```
Reason:Signal:SIGSEGV(SEGV_ACCERR)@0x0000005af2393068 
Fault thread info:
#00 pc 00000000006d6068 [anon:native_heap:jemalloc]
#01 pc 0000000000065864 /system/lib64/libace_ndk.z.so(OHOS::Ace::NodeModel::HandleInnerEvent(ArkUINodeEvent*)+164)(2cbf0c174bc34cd60ea9a3c357d90328)
#02 pc 00000000033536d4 /system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::NG::SendGestureEvent(OHOS::Ace::GestureEvent&, int, void*)+208)(e396829cf06b76ec87ccc92d7e45e3ed)
#03 pc 0000000000f4dbc8 /system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::NG::PanRecognizer::SendCallbackMsg(std::__h::unique_ptr<std::__h::function<void (OHOS::Ace::GestureEvent&)>, std::__h::default_delete<std::__h::function<void (OHOS::Ace::GestureEvent&)>>> const&, OHOS::Ace::NG::GestureCallbackType)+512)(e396829cf06b76ec87ccc92d7e45e3ed)
#04 pc 000000000216979c /system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::NG::PanRecognizer::OnAccepted()+948)(e396829cf06b76ec87ccc92d7e45e3ed)
```

### 规则

1. 崩溃在 **OHOS::Ace::NodeModel::HandleInnerEvent**，需要关注#01也是这个函数的栈，大概率也是这个问题

### 结论

**责任归属：应用(三方应用)问题**

崩溃在调用一个应用注册给系统的回调指针，通过 `setGestureEventTarget` 方式设置的，注册完成后这个回调是存在recognizer->extraData中的。NodeModel::HandleInnerEvent里面会把recognizer->extraData取出来使用。而recognizer->extraData是应用控制删除的，只有在调用Dispose接口后会被释放，释放后由于原地址可能销毁/可能被其他对象占用导致后续调用时触发异常。

**下一步分析方向：** 应用排查setGestureEventTarget之后的recognizer，是否提前调用了Dispose接口。

### 原因

应用在系统回调使用期间提前释放了手势回调相关资源，导致访问已释放内存触发崩溃。

---

## 八、libace_compatible.z.so 踩内存导致ElementRegister Crash

### 前置：典型cppcrash相关栈

**案例**

```
#00 OHOS::Ace::ElementRegister::RemoveFrameNodeByInspectorId(std::__h::basic_string, std::__h::allocator> const&, int)+1136 at /system/lib64/platformsdk/libace_compatible.z.so(d223d348d5ddd26efd90b33df75bb7c9)
#01 OHOS::Ace::NG::UINode::~UINode()+1556 at /system/lib64/platformsdk/libace_compatible.z.so(d223d348d5ddd26efd90b33df75bb7c9)
#02 OHOS::Ace::NG::FrameNode::~FrameNode()+2948 at /system/lib64/platformsdk/libace_compatible.z.so(d223d348d5ddd26efd90b33df75bb7c9)
#03 virtual thunk to OHOS::Ace::NG::FrameNode::~FrameNode()+36 at /system/lib64/platformsdk/libace_compatible.z.so(d223d348d5ddd26efd90b33df75bb7c9)
#04 OHOS::Ace::NG::UINode::~UINode()+2248 at /system/lib64/platformsdk/libace_compatible.z.so(d223d348d5ddd26efd90b33df75bb7c9)
#05 OHOS::Ace::NG::FrameNode::~FrameNode()+2948 at /system/lib64/platformsdk/libace_compatible.z.so(d223d348d5ddd26efd90b33df75bb7c9)
```

### 规则

1. 栈顶在 **ElementRegister**

### 结论

这个ElementRegister是个threadlocal的单例对象，维护着所有UI节点，每个函数都是高强度、多场景运行的，不可能存在问题，一旦有问题将是大规模崩溃，崩溃在这里一定是因为发生了**踩内存**。

### 原因

应用侧发生了内存踩踏问题，破坏了ElementRegister内部的内存结构，导致在清理UI节点时触发崩溃。