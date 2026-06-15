# render_service 常见问题分析参考手册

---

## 一、OHOS::Rosen::RSTransactionData::~RSTransactionData()

### 前置

CPPCRASH 问题

### 规则

```
#00 pc 000000000037ed48 /system/lib64/librender_service_base.z.so(OHOS::Rosen::RSTransactionData::~RSTransactionData()+300)(f0ce3279ef108f905a74ba9b3b1407f0)
#01 pc 000000000037e6ac /system/lib64/librender_service_base.z.so(OHOS::Rosen::RSTransactionHandler::FlushImplicitTransaction(unsigned long, std::__h::basic_string<char, std::__h::char_traits<char>, std::__h::allocator<char>> const&, bool, unsigned long)+524)(f0ce3279ef108f905a74ba9b3b1407f0)
#02 pc 00000000002253d4 /system/lib64/librender_service_client.z.so(OHOS::Rosen::RSUIDirector::SendMessages()+140)(23c8700b58b2a5a7cfeff22d5d114dcb)
#03 pc 00000000011366bc /system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::NG::RosenWindow::FlushTasks(std::__h::function<void ()>)+116)(4eb29ccb928c06bb7f904fd388346b6c)
#04 pc 0000000000e6d10c /system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::NG::PipelineContext::FlushMessages(std::__h::function<void ()>)+388)(4eb29ccb928c06bb7f904fd388346b6c)
#05 pc 00000000018ef6d4 /system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::NG::PipelineContext::FlushVsync(unsigned long, unsigned long)+2136)(4eb29ccb928c06bb7f904fd388346b6c)
#06 pc 000000000133a190 /system/lib64/platformsdk/libace_compatible.z.so(4eb29ccb928c06bb7f904fd388346b6c)
#07 pc 000000000135097c /system/lib64/platformsdk/libace_compatible.z.so(4eb29ccb928c06bb7f904fd388346b6c)
#08 pc 0000000001112e2c /system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::NG::RosenWindow::ForceFlushVsync(unsigned long, unsigned long)+284)(4eb29ccb928c06bb7f904fd388346b6c)
#09 pc 0000000001112c54 /system/lib64/platformsdk/libace_compatible.z.so(4eb29ccb928c06bb7f904fd388346b6c)
```

栈顶挂在函数析构上，`~RSTransactionData()`

### 结论

栈顶挂在析构，大概率为应用踩内存，需要应用方进行排查

---

## 二、OHOS::Rosen::RSImage::~RSImage()

### 前置

CPPCRASH 问题

### 规则

```
#00 pc 00000000003a08c4 /system/lib64/librender_service_base.z.so(OHOS::Rosen::RSImage::~RSImage()+100)(f0ce3279ef108f905a74ba9b3b1407f0)
#01 pc 0000000000325920 /system/lib64/librender_service_base.z.so(OHOS::Rosen::RSExtendImageObject::~RSExtendImageObject()+648)(f0ce3279ef108f905a74ba9b3b1407f0)
#02 pc 00000000001bd118 /system/lib64/lib2d_graphics.z.so(OHOS::Rosen::Drawing::DrawCmdList::ClearOp()+508)(5e971287eceff6ebe056bc7e95a51289)
#03 pc 00000000001bc348 /system/lib64/lib2d_graphics.z.so(OHOS::Rosen::Drawing::DrawCmdList::~DrawCmdList()+56)(5e971287eceff6ebe056bc7e95a51289)
#04 pc 0000000000c9e8b8 /system/lib64/platformsdk/libace_compatible.z.so(OHOS::Rosen::RSProperty<std::__h::shared_ptr<OHOS::Rosen::Drawing::DrawCmdList>>::~RSProperty()+72)(4eb29ccb928c06bb7f904fd388346b6c)
#05 pc 000000000021241c /system/lib64/librender_service_client.z.so(23c8700b58b2a5a7cfeff22d5d114dcb)
#06 pc 00000000002123ec /system/lib64/librender_service_client.z.so(23c8700b58b2a5a7cfeff22d5d114dcb)
#07 pc 00000000002123ec /system/lib64/librender_service_client.z.so(23c8700b58b2a5a7cfeff22d5d114dcb)
#08 pc 00000000001d9de0 /system/lib64/librender_service_client.z.so(OHOS::Rosen::RSNode::ClearAllModifiers()+168)(23c8700b58b2a5a7cfeff22d5d114dcb)
#09 pc 00000000001d8df4 /system/lib64/librender_service_client.z.so(OHOS::Rosen::RSNode::~RSNode()+84)(23c8700b58b2a5a7cfeff22d5d114dcb)
#10 pc 00000000001d0e34 /system/lib64/librender_service_client.z.so(OHOS::Rosen::RSCanvasNode::~RSCanvasNode()+20)(23c8700b58b2a5a7cfeff22d5d114dcb)
#11 pc 0000000000c8c688 /system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::NG::RosenRenderContext::~RosenRenderContext()+3268)(4eb29ccb928c06bb7f904fd388346b6c)
#12 pc 0000000000b2d4cc /system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::NG::FrameNode::~FrameNode()+1876)(4eb29ccb928c06bb7f904fd388346b6c)
#13 pc 0000000000a50c3c /system/lib64/platformsdk/libace_compatible.z.so(virtual thunk to OHOS::Ace::NG::FrameNode::~FrameNode()+36)(4eb29ccb928c06bb7f904fd388346b6c)
#14 pc 0000000001261bf8 /system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::NG::ViewModel::DisposeNode(void*)+200)(4eb29ccb928c06bb7f904fd388346b6c)
```

栈顶挂在函数析构上，`~RSImage()`

### 结论

栈顶挂在析构，大概率为应用踩内存，需要应用方进行排查

---

## 三、OHOS::Rosen::RSTransactionHandler::AddCommand

### 前置

FREEZE 问题

### 规则

**规则一：** 先确认3s栈和6s栈是否一致，如果不一致，当前抓栈为瞬时栈，未卡住，结论为非问题

**规则二：** 问题线程出现类似以下堆栈

```
Tid:38737, Name:ss.hm.ugc.aweme
#00 pc 00000000003dc364 /system/lib64/librender_service_base.z.so(OHOS::Rosen::RSTransactionHandler::AddCommand(std::__h::unique_ptr<OHOS::Rosen::RSCommand, std::__h::default_delete<OHOS::Rosen::RSCommand>>&, bool, OHOS::Rosen::FollowType, unsigned long)+240)(f0ce3279ef108f905a74ba9b3b1407f0)
#01 pc 00000000001df494 /system/lib64/librender_service_client.z.so(OHOS::Rosen::RSNode::AddCommand(std::__h::unique_ptr<OHOS::Rosen::RSCommand, std::__h::default_delete<OHOS::Rosen::RSCommand>>&, bool, OHOS::Rosen::FollowType, unsigned long) const+160)(23c8700b58b2a5a7cfeff22d5d114dcb)
#02 pc 000000000021097c /system/lib64/librender_service_client.z.so(OHOS::Rosen::RSNode::AddModifier(std::__h::shared_ptr<OHOS::Rosen::ModifierNG::RSModifier>)+876)(23c8700b58b2a5a7cfeff22d5d114dcb)
#03 pc 00000000001ee500 /system/lib64/librender_service_client.z.so(23c8700b58b2a5a7cfeff22d5d114dcb)
#04 pc 00000000001ee310 /system/lib64/librender_service_client.z.so(OHOS::Rosen::RSNode::SetBorderStyle(unsigned int, unsigned int, unsigned int, unsigned int)+44)(23c8700b58b2a5a7cfeff22d5d114dcb)
#05 pc 0000000000ac6490 /system/lib64/platformsdk/libace_compatible.z.so(4eb29ccb928c06bb7f904fd388346b6c)
#06 pc 0000000002097004 /system/lib64/platformsdk/libace_compatible.z.so(OHOS::Ace::NG::ViewAbstract::SetBorderStyle(OHOS::Ace::NG::FrameNode*, OHOS::Ace::BorderStyle const&)+100)(4eb29ccb928c06bb7f904fd388346b6c)
#07 pc 0000000003312ae0 /system/lib64/platformsdk/libace_compatible.z.so(4eb29ccb928c06bb7f904fd388346b6c)
#08 pc 0000000000095be8 /system/lib64/libace_ndk.z.so(2cbf0c174bc34cd60ea9a3c357d90328)
#09 pc 00000000001327fc /data/storage/el1/bundle/libs/arm64/libimageknifepro.so(ImageKnifePro::ImageKnifeNodeInternal::RemoveBorder()+172)(07941fbe367b26e158c6262a644dafb89b853c1a)
#10 pc 0000000000131178 /data/storage/el1/bundle/libs/arm64/libimageknifepro.so(ImageKnifePro::ImageKnifeNodeInternal::Init(std::__n1::shared_ptr<ImageKnifePro::ImageKnifeOption>)+508)(07941fbe367b26e158c6262a644dafb89b853c1a)
#11 pc 0000000000130dc8 /data/storage/el1/bundle/libs/arm64/libimageknifepro.so(ImageKnifePro::ImageKnifeNodeInternal::ImageKnifeNodeInternal(std::__n1::shared_ptr<ImageKnifePro::ImageKnifeOption>, ArkUI_Node*, bool)+260)(07941fbe367b26e158c6262a644dafb89b853c1a)
#12 pc 0000000000137854 /data/storage/el1/bundle/libs/arm64/libimageknifepro.so(ImageKnifePro::ImageKnifeNodeImage::ImageKnifeNodeImage(std::__n1::shared_ptr<ImageKnifePro::ImageKnifeOption>)+140)(07941fbe367b26e158c6262a644dafb89b853c1a)
#13 pc 000000000012df3c /data/storage/el1/bundle/libs/arm64/libimageknifepro.so(07941fbe367b26e158c6262a644dafb89b853c1a)
#14 pc 000000000012dbac /data/storage/el1/bundle/libs/arm64/libimageknifepro.so(07941fbe367b26e158c6262a644dafb89b853c1a)
#15 pc 00000000000cdcb4 /data/storage/el1/bundle/libs/arm64/libimageknifepro.so(ImageKnifePro::ImageKnifeNapi::CreateNativeRoot(napi_env__*, napi_callback_info__*)+448)(07941fbe367b26e158c6262a644dafb89b853c1a)
#16 pc 0000000000056dac /system/lib64/platformsdk/libace_napi.z.so(panda::JSValueRef ArkNativeFunctionCallBack<true>(panda::JsiRuntimeCallInfo*)+220)(81bc799d25ec8f696af8dbd4be35ec2d)
#17 pc 0000000000e2aca0 /system/lib64/module/arkcompiler/stub.an(RTStub_PushCallRangeAndDispatchNative+140)
#18 pc 000000000045fef0 /system/lib64/module/arkcompiler/stub.an(BCStub_HandleCallthisrangeImm8Imm8V8StwCopy+360)
#19 at aboutToAppear (entry|@imagex/imagex_bdimageknifepro|1.0.13|src/main/ets/components/ImageKnifeComponent.ts:118:20)
#20 pc 00000000002b3848 /system/lib64/platformsdk/libark_jsruntime.so(1fbc7781e52c91f8ef788e22d5b6bd0d)
#21 pc 00000000006d8e94 /system/lib64/platformsdk/libark_jsruntime.so(panda::FunctionRef::Call(panda::ecmascript::EcmaVM const*, panda::Local<panda::JSValueRef>, panda::Local<panda::JSValueRef> const*, int)+516)(1fbc7781e52c91f8ef788e22d5b6bd0d)
```

栈顶在 `OHOS::Rosen::RSTransactionHandler::AddCommand`

### 结论

AddCommand 上已加锁保护，不存在多线程问题，需要上层排查是否有多线程问题

---

## 四、OHOS::Rosen::RSNode::ClearAllModifiers()

### 前置

CPPCRASH 问题

### 规则

```
#00 pc 00000000001d9ecc /system/lib64/librender_service_client.z.so(OHOS::Rosen::RSNode::ClearAllModifiers()+404)(23c8700b58b2a5a7cfeff22d5d114dcb)
#01 pc 00000000001d8df4 /system/lib64/librender_service_client.z.so(OHOS::Rosen::RSNode::~RSNode()+84)(23c8700b58b2a5a7cfeff22d5d114dcb)
#02 pc 00000000001d0e34 /system/lib64/librender_service_client.z.so(OHOS::Rosen::RSCanvasNode::~RSCanvasNode()+20)(23c8700b58b2a5a7cfeff22d5d114dcb)
```

栈顶为 `ClearAllModifiers()`

### 结论

大概率为应用踩内存，需要应用方进行排查

---

## 五、NativeWindowHandleOpt

### 前置

CPPCRASH 问题

### 规则

```
#00 pc 0000000000071218 /system/lib64/chipset-pub-sdk/libsurface.z.so(HandleNativeWindowGetFormat(NativeWindow*, std::__va_list)+40)(a2adf7d1455e710450fe921359434b45)
#01 pc 000000000007438c /system/lib64/chipset-pub-sdk/libsurface.z.so(std::__h::__function::__func<void (*)(NativeWindow*, std::__va_list), std::__h::allocator<void (*)(NativeWindow*, std::__va_list)>, void (NativeWindow*, std::__va_list)>::operator()(NativeWindow*&&, std::__va_list&&)+52)(a2adf7d1455e710450fe921359434b45)
#02 pc 0000000000071814 /system/lib64/chipset-pub-sdk/libsurface.z.so(NativeWindowHandleOpt+244)(a2adf7d1455e710450fe921359434b45)
```

栈顶 `libsurface.z.so` 且调用栈中有 `NativeWindowHandleOpt`

### 结论

应用使用 NativeWindow 野指针，需要应用排查

---

## 六、OH_NativeWindow_DestroyNativeWindowBuffer（重复释放）

### 前置

CPPCRASH 问题

### 规则

```
#00 pc 0000000000067764 /system/lib64/chipset-sdk-sp/libsurface.z.so(OH_NativeWindow_DestroyNativeWindowBuffer+4)(9cc47ffb022a19e8e466d6458576de76)
```

栈顶为 `OH_NativeWindow_DestroyNativeWindowBuffer`

### 结论

应用重复释放 NativeWindowBuffer，需要应用排查

---

## 七、OH_NativeWindow_NativeObjectReference（野指针）

### 前置

CPPCRASH 问题

### 规则

```
#00 pc 00000000000676bc /system/lib64/chipset-sdk-sp/libsurface.z.so(OH_NativeWindow_NativeObjectReference+28)(74816423c6ebd44a611cf1ba8438f349)
#01 pc 000000000034574c /vendor/lib64/passthrough/libhvgr_v200.so
#02 pc 00000000003449d0 /vendor/lib64/passthrough/libhvgr_v200.so
```

栈顶为 `OH_NativeWindow_NativeObjectReference`

### 结论

应用使用 nativewindow 或 nativewindowbuffer 野指针，可能存在提前释放或者并发释放问题，需要应用排查

---

## 八、OHOS::BufferQueue::RequestBufferLocked

### 前置

APPFREEZE 问题

### 规则

```
#00 pc 00000000001e3240 /system/lib/ld-musl-aarch64.so.1(__timedwait_cp+156)(21cb2a6fad27e9df5807071187b42702)
#01 pc 00000000001e5310 /system/lib/ld-musl-aarch64.so.1(pthread_cond_timedwait+172)(21cb2a6fad27e9df5807071187b42702)
#02 pc 000000000003e5b0 /system/lib64/chipset-sdk-sp/libsurface.z.so(OHOS::BufferQueue::RequestBufferLocked(OHOS::BufferRequestConfig const&, OHOS::sptr<OHOS::BufferExtraData>&, OHOS::IBufferProducer::RequestBufferReturnValue&, std::__h::unique_lock<std::__h::mutex>&)+1228)(bd78a814617aa2c901f34599e33432de)
#03 pc 000000000003f210 /system/lib64/chipset-sdk-sp/libsurface.z.so(OHOS::BufferQueue::RequestBuffer(OHOS::BufferRequestConfig const&, OHOS::sptr<OHOS::BufferExtraData>&, OHOS::IBufferProducer::RequestBufferReturnValue&)+284)(bd78a814617aa2c901f34599e33432de)
#04 pc 000000000006cdd0 /system/lib64/chipset-sdk-sp/libsurface.z.so(OHOS::ProducerSurface::RequestBufferLocked(OHOS::sptr<OHOS::SurfaceBuffer>&, OHOS::sptr<OHOS::SyncFence>&, OHOS::BufferRequestConfig&)+192)(bd78a814617aa2c901f34599e33432de)
#05 pc 000000000006dbf4 /system/lib64/chipset-sdk-sp/libsurface.z.so(OHOS::ProducerSurface::RequestBuffer(OHOS::sptr<OHOS::SurfaceBuffer>&, OHOS::sptr<OHOS::SyncFence>&, OHOS::BufferRequestConfig&)+124)(bd78a814617aa2c901f34599e33432de)
#06 pc 0000000000065598 /system/lib64/chipset-sdk-sp/libsurface.z.so(OH_NativeWindow_NativeWindowRequestBuffer+448)(bd78a814617aa2c901f34599e33432de)
```

卡住栈在 `RequestBufferLocked`

### 结论

无可用 buffer，应用排查下是否之前 requestbuffer 后未执行 flushbuffer，或者 fd 泄露

---

## 九、DDGR::Canvas::~Canvas()

### 前置

ADDR_SANITIZER

### 规则

```
#00 pc 00000000000ab82c /system/lib/ld-musl-aarch64.so.1(52299a28d60f0bb4073bd788bc023a3a)
#01 pc 00000000000abdd4 /system/lib/ld-musl-aarch64.so.1(save_debug_message+240)(52299a28d60f0bb4073bd788bc023a3a)
#02 pc 00000000000ac998 /system/lib/ld-musl-aarch64.so.1(je_tcache_bin_flush_small+132)(52299a28d60f0bb4073bd788bc023a3a)
#03 pc 00000000000f8c68 /system/lib/ld-musl-aarch64.so.1(tcache_event+404)(52299a28d60f0bb4073bd788bc023a3a)
#04 pc 00000000000fd650 /system/lib/ld-musl-aarch64.so.1(te_event_trigger+780)(52299a28d60f0bb4073bd788bc023a3a)
#05 pc 00000000000b77a8 /system/lib/ld-musl-aarch64.so.1(free_default+2376)(52299a28d60f0bb4073bd788bc023a3a)
#06 pc 0000000000268e0c /system/lib64/libddgr.z.so(DDGR::Canvas::~Canvas()+280)(1630f2088df6e31208716c0c17deb2d9)
```

栈顶为 `DDGR::Canvas::~Canvas()`

### 结论

应用踩内存

---

## 十、DDGR::BackendNoPixels::BackendNoPixels()

### 前置

ADDR_SANITIZER

### 规则

```
#00 pc 00000000000ab82c /system/lib/ld-musl-aarch64.so.1(52299a28d60f0bb4073bd788bc023a3a)
#01 pc 00000000000abdd4 /system/lib/ld-musl-aarch64.so.1(save_debug_message+240)(52299a28d60f0bb4073bd788bc023a3a)
#02 pc 00000000000ac998 /system/lib/ld-musl-aarch64.so.1(je_tcache_bin_flush_small+132)(52299a28d60f0bb4073bd788bc023a3a)
#03 pc 00000000000f8c68 /system/lib/ld-musl-aarch64.so.1(tcache_event+404)(52299a28d60f0bb4073bd788bc023a3a)
#04 pc 00000000000fd5ec /system/lib/ld-musl-aarch64.so.1(te_event_trigger+680)(52299a28d60f0bb4073bd788bc023a3a)
#05 pc 00000000000b0160 /system/lib/ld-musl-aarch64.so.1(malloc_default+1300)(52299a28d60f0bb4073bd788bc023a3a)
#06 pc 00000000000b31a0 /system/lib64/chipset-sdk-sp/libc++.so(operator new(unsigned long)+28)(4c257fafd66f57a4f1f873163a520100e191a256)
#07 pc 0000000000427850 /system/lib64/libddgr.z.so(DDGR::BackendNoPixels::BackendNoPixels()+332)(1630f2088df6e31208716c0c17deb2d9)
#08 pc 00000000004332ec /system/lib64/libddgr.z.so(DDGR::Canvas::Canvas()+80)(1630f2088df6e31208716c0c17deb2d9)
```

栈顶为 `DDGR::BackendNoPixels::BackendNoPixels()`

### 结论

应用踩内存

---

## 十一、DDGR::Backend::Context::Panic()

### 前置

CPP_CRASH

### 规则

```
#00 pc 00000000001b0a18 /system/lib/ld-musl-aarch64.so.1(raise+216)(4dcf1315ac91d1611e703e23ab16e8c7)
#01 pc 000000000015c998 /system/lib/ld-musl-aarch64.so.1(abort+24)(4dcf1315ac91d1611e703e23ab16e8c7)
#02 pc 00000000001f18cc /system/lib64/libddgr.z.so(DDGR::Backend::Context::Panic()+208)(49e3e5fec347fa0ecf66c28ef9cf6d52)
#03 pc 00000000001e6a70 /system/lib64/libddgr.z.so(DDGR::GrContextImpl::NormalFlushAndSubmit(bool)+16996)(49e3e5fec347fa0ecf66c28ef9cf6d52)
#04 pc 00000000001dfc60 /system/lib64/libddgr.z.so(DDGR::GrContextImpl::FlushAndSubmit(bool)+108)(49e3e5fec347fa0ecf66c28ef9cf6d52)
```

栈顶为 `DDGR::Backend::Context::Panic()`

### 结论

应用触发 GPU 异常，导致 device lost，需海思同事分析异常原因
