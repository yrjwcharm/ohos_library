# Text常见问题分析参考手册

---

## 一、librosen_text.z.so FontCollection对象生命周期管理问题导致UAF Crash

### 前置：典型cppcrash相关栈

**案例**

```
Reason:Signal:SIGSEGV(SEGV_MAPERR)@0x006bb08461f2f927
Fault thread info:
Tid:51029, Name:OS_FFRT_2_13
#00 pc 0000000000057afc /system/lib64/librosen_text.z.so(OHOS::Rosen::AdapterTxt::TypographyCreate::TypographyCreate(OHOS::Rosen::TypographyStyle const&, std::__h::shared_ptr<OHOS::Rosen::FontCollection>)+536)(94012bc387c276632cc94a01fa2c9901)
#01 pc 000000000005786c /system/lib64/librosen_text.z.so(OHOS::Rosen::TypographyCreate::Create(OHOS::Rosen::TypographyStyle const&, std::__h::shared_ptr<OHOS::Rosen::FontCollection>)+108)(94012bc387c276632cc94a01fa2c9901)
#02 pc 00000000000548ac /system/lib64/libnative_drawing_ndk.z.so(OH_Drawing_CreateTypographyHandler.cfi+284)(0e089cbec07fafd304de65350cab8ca9)
#03 pc 0000000000064de8 /system/lib64/libace_ndk.z.so(OH_ArkUI_StyledString_Create+72)(09034f01ea7d526dbbeb194081953e0a)
#04 pc 00000000004688f0 blink::mt::CreateTextData(blink::LayoutBox*, blink::LayoutUnit) /Users/jenkins/workspace/workspace/123460277/23066/s/repo/repos/_meituan_msc_renderer/Source/msc/text_measure_harmony.cpp:467:56
```

### 规则

1. Reason中信号为 **SIGSEGV(SEGV_MAPERR)** 且问题地址高位为 **6b6b** 或 **006b** 标志。
2. 崩溃栈中存在 **TypographyCreate**、**FontCollection** 等信息。

### 结论

**责任归属：应用(三方应用)问题**

使用 `OH_Drawing_CreateFontCollection()` 创建的 `OH_Drawing_FontCollection` 对象具有独占性，其生命周期与单个 `OH_Drawing_TypographyCreate` 实例强绑定。通过接口 `OH_Drawing_CreateTypographyHandler` 创建 `OH_Drawing_TypographyCreate` 后，关联的非共享型 FontCollection 也会被同步销毁。

**风险说明：** 若应用尝试复用已被释放的 FontCollection 对象，将导致 **UAF (Use-After-Free)** 内存错误，触发程序崩溃。

**优化建议：** 推荐使用 `OH_Drawing_CreateSharedFontCollection()` 创建共享型对象，以支持多对象复用并提升内存安全性。

### 原因

应用侧错误地复用了已被销毁的 FontCollection 对象，导致在访问已释放的内存时触发 SEGV_MAPERR 错误。

---

