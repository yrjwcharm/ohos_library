

## 鸿蒙应用开发中常见的API误用导致的内存泄漏及开发规范约束（2026/02/09）

目前鸿蒙开发中有很多的开发约束，稍有不慎就会导致内存泄漏，这里开一个帖子整理场景的内存泄漏的API误用代码、场景，及一些内存泄漏的代码分析手段。

也希望大家在评论区分享自己应用开发中内存泄漏的一些案例，或者指正其中问题， 欢迎大家收藏，此贴持续更新

@Author daichao2@huawei.com/gaoxi785@huawei.com

## 目录
[TOC] 



## 1. 内存泄漏案例

以下整理列举鸿蒙应用开发中可能导致的应用内存泄漏相关的API和注意事项，方便开发者在源码中提前识别内存泄漏风险。

**语言类型**： 标识这是一个C-API 还是 ArkTS-API

**易错等级**： **高风险标识存在已知应用在此API使用不当造成内存泄漏，需要开发者重点关注**

**使用约束&参考**: 标识关于使用此API的内存泄漏相关参考

 

## 1.1 Node-API相关

Node-API这块生命周期比较复杂，很容易导致内存泄漏，希望大家重点关注

### 1.1.1 napi_create_reference 

**语言类型:**  C-API

**易错等级:** 高风险

**使用约束:** 

```
NAPI_EXTERN napi_status napi_create_reference(napi_env env,
                                              napi_value value,
                                              uint32_t initial_refcount,
                                              napi_ref* result); 
```

为Object创建一个napi_ref,调用者需要自己管理napi_ref生命周期，在使用完毕后需要主动调用 **napi_status napi_delete_reference(napi_env env, napi_ref ref);** 解除引用， `napi_create_reference`与 `napi_delete_reference` 必须成对调用，否则造成内存泄漏

**参考:**

[使用Node-API接口进行生命周期相关开发](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/use-napi-life-cycle)

[NAPI 内存泄漏相关问题汇总](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/napi-faq-about-memory-leak)



### 1.1.2 napi_open_handle_scope

**语言类型**: C-API

**易错等级:** 高风险

**使用约束**：

框架层的通过scope管理napi_value的生命周期，当在JS线程上执行回调时，需要主动添加napi_handle_scope来管理napi_value的生命周期， 该问题常见于直接使用 **int uv_queue_work(uv_loop_t* loop, uv_work_t* req, uv_work_cb work_cb, uv_after_work_cb after_work_cb)** 的 **after_work_cb** 场景中

1. **napi_value 未包裹在独立handle_scope**，导致napi_value的生命周期管理不当，造成napi_value内存泄漏 

2. napi_open_handle_scope 需要使用 **napi_close_handle_scope** 关闭

**参考:**

[NODE-API 原生scope管理说明 ](https://nodejs.org/api/n-api.html#napi_open_handle_scope)

[使用Node-API接口进行生命周期相关开发](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/use-napi-life-cycle)

[NAPI 内存泄漏相关问题汇总](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/napi-faq-about-memory-leak)

[napi开发过程中遇见内存泄漏问题要怎么定位解决](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/napi-faq-about-memory-leak#napi%E5%BC%80%E5%8F%91%E8%BF%87%E7%A8%8B%E4%B8%AD%E9%81%87%E8%A7%81%E5%86%85%E5%AD%98%E6%B3%84%E6%BC%8F%E9%97%AE%E9%A2%98%E8%A6%81%E6%80%8E%E4%B9%88%E5%AE%9A%E4%BD%8D%E8%A7%A3%E5%86%B3)



### 1.1.3 napi_wrap

**语言类型**: C-API

**易错等级:** 高风险

**使用约束**：

`napi_wrap(napi_env env, napi_value js_object, void* native_object, napi_finalize finalize_cb, void* finalize_hint, napi_ref* result)` 接口用于把ArkTS object上绑定一个native对象实例。

 napi_wrap接口使用注意事项：

**当最后一个参数为nullptr时，为弱引用模式，系统自动创建`napi_ref`，由虚拟机统一管理生命周期，无需手动释放，除非需主动控制Native对象生命周期，否则建议传 `nullptr` 由系统管理**

**如果最后一个参数result传递不为nullptr，需要开发者在合适的时机调用napi_remove_wrap函数主动删除创建的napi_ref**

```cpp
// Usage 1: Napi_wrap does not need to receive the created napi_ref, and the last parameter is passed as nullptr. The created napi_ref is a weak reference, managed by the system, and does not require manual release by the user
napi_wrap(env, jsobject, nativeObject, cb, nullptr, nullptr);

// Usage 2: napi_wrap needs to receive the created napi_ref, the last parameter is not null ptr, and the returned napi_ref is a strong reference that needs to be manually released by the user, otherwise it will cause memory leakage
napi_ref result;
napi_wrap(env, jsobject, nativeObject, cb, nullptr, &result);
// When jsobject and result are no longer used in the future, promptly call napi_remove_wrap to release result
void** result1;
napi_remove_wrap(env, jsobject, result1);
```

**参考:**

[napi_wrap API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/napi#napi_wrap)

[如何在Native侧释放ArkTS对象](https://developer.huawei.com/consumer/cn/doc/harmonyos-faqs/faqs-ndk-82)



### 1.1.4 napi_create_promise

**语言类型**: C-API

**易错等级:** 低风险

**使用约束**：

此 API `napi_status napi_create_promise(napi_env env, napi_deferred* deferred, napi_value* promise)` 此 API 创建一个延迟对象和一个 JavaScript promise,  **返回的deferred 必须经过napi_resolve_deferred 或者 napi_reject_deferred处理，否则造成内存泄露**

**参考:**

[使用Node-API接口进行异步任务开发](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/use-napi-about-promise#napi_create_promise)

[napi_create_promise](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/use-napi-about-promise#napi_create_promise)

[napi_resolve_deferred & napi_reject_deferred](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/use-napi-about-promise#napi_resolve_deferred--napi_reject_deferred)



### 1.1.5 napi_create_async_work

**语言类型**: C-API

**易错等级:** 低风险

**使用约束**：

```c
napi_status napi_create_async_work(napi_env env,
                                   napi_value async_resource,
                                   napi_value async_resource_name,
                                   napi_async_execute_callback execute,
                                   napi_async_complete_callback complete,
                                   void* data,
                                   napi_async_work* result); 
```

此 API 分配用于异步执行逻辑的工作对象。一旦不再需要该工作，应使用**napi_delete_async_work**将其释放, 建议在complete回调执行时或执行后，通过napi_delete_async_work完成释放



**参考:**

[napi_create_async_work API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/napi#napi_create_async_work)

[napi_delete_async_work API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/napi#napi_delete_async_work)

[使用Node-API接口进行异步任务开发](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/use-napi-asynchronous-task)



## 1.2 图形相关

### 1.2.1 OH_Drawing_CreateSharedFontCollection

**语言类型:**  C-API

**易错等级:** 高风险

**使用约束:** 
使用API `OH_Drawing_FontCollection* OH_Drawing_CreateSharedFontCollection(void)` 创建的字体集必须通过调用API  **void OH_Drawing_DestroyFontCollection(OH_Drawing_FontCollection* fontCollection)**释放，否则会造成内存泄漏

**参考:**

[OH_Drawing_CreateSharedFontCollection API ](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-font-collection-h#oh_drawing_createsharedfontcollection)
[OH_Drawing_DestroyFontCollection API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-font-collection-h#oh_drawing_destroyfontcollection)





### 1.2.2 OH_Drawing_CreateFontCollection 

**语言类型:**  C-API

**易错等级:** 高风险

**使用约束:** 
使用API `OH_Drawing_FontCollection* OH_Drawing_CreateFontCollection(void)` 创建的字体集必须通过调用API  **void OH_Drawing_DestroyFontCollection(OH_Drawing_FontCollection* fontCollection)**释放，否则会造成内存泄漏

**参考:**

[OH_Drawing_CreateFontCollection官方API ](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-font-collection-h#oh_drawing_createfontcollection)
[OH_Drawing_DestroyFontCollection官方API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-font-collection-h#oh_drawing_destroyfontcollection)




### 1.2.3 OH_NativeImage_Create 

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 
使用API `OH_NativeImage* OH_NativeImage_Create(uint32_t textureId, uint32_t textureTarget)`创建一个OH_NativeImage实例，该实例与OpenGL ES的纹理ID和纹理目标相关联。
本接口需要与**[OH_NativeImage_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-image-h#oh_nativeimage_destroy)**配合使用，否则会存在内存泄漏。

**参考:**

[OH_NativeImage_Create API ](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-image-h#oh_nativeimage_create)
[NativeImage开发指导 (C/C++)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/native-image-guidelines)



### 1.2.4 OH_ConsumerSurface_Create

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

`OH_NativeImage* OH_ConsumerSurface_Create(void)` 此接口回创建一个OH_NativeImage实例，作为surface的消费端, 注意本接口需要和**OH_NativeImage_Destroy**配合使用，否则会存在内存泄漏。

**参考:**

[OH_ConsumerSurface_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-image-h)




### 1.2.5 OH_NativeBuffer_Alloc

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 
使用API `OH_NativeBuffer* OH_NativeBuffer_Alloc(const OH_NativeBuffer_Config* config)`通过OH_NativeBuffer_Config创建OH_NativeBuffer实例，每次调用都会产生一个新的OH_NativeBuffer实例。
本接口需要与**[OH_NativeBuffer_Unreference](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-buffer-h#oh_nativebuffer_unreference)**接口配合使用，否则会存在内存泄漏

**参考:**

[OH_NativeBuffer_Alloc API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-buffer-h#oh_nativebuffer_alloc)



### 1.2.6 OH_NativeVSync_Create

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 
使用API `OH_NativeVSync* OH_NativeVSync_Create(const char* name, unsigned int length)`创建一个OH_NativeVSync实例，每次调用都会产生一个新的实例。本接口需要与[OH_NativeVSync_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-vsync-h#oh_nativevsync_destroy)接口配合使用，否则会存在内存泄漏。

**参考:**

[OH_NativeVSync_Create API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-vsync-h#oh_nativevsync_create)



### 1.2.7 OH_NativeBuffer_Map

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

此接口 `int32_t OH_NativeBuffer_Map(OH_NativeBuffer *buffer, void **virAddr)`，OH_NativeBuffer对应的ION内存映射到进程空间。本接口需要与[OH_NativeBuffer_Unmap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-buffer-h#oh_nativebuffer_unmap)接口配合使用。



**参考:**

[OH_NativeBuffer_Map](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-buffer-h#oh_nativebuffer_map)

[OH_NativeBuffer_Unmap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-buffer-h#oh_nativebuffer_unmap)




### 1.2.8 OH_NativeImage_AcquireNativeWindowBuffer

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

`int32_t OH_NativeImage_AcquireNativeWindowBuffer(OH_NativeImage* image,OHNativeWindowBuffer** nativeWindowBuffer, int* fenceFd)` 通过消费端的OH_NativeImage获取一个OHNativeWindowBuffer。本接口需要和**OH_NativeImage_ReleaseNativeWindowBuffer**配合使用，否则会存在内存泄漏

**参考:**

[OH_NativeImage_AcquireNativeWindowBuffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-image-h#oh_nativeimage_acquirenativewindowbuffer)
[OH_NativeImage_ReleaseNativeWindowBuffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-image-h#oh_nativeimage_releasenativewindowbuffer)



### 1.2.9 OH_NativeBuffer_Reference

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

[int32_t OH_NativeBuffer_Reference(OH_NativeBuffer *buffer)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-buffer-h#oh_nativebuffer_reference) 接口可以把 OH_NativeBuffer 对象的引用计数增加1。本接口需要与[OH_NativeBuffer_Unreference](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-buffer-h#oh_nativebuffer_unreference)接口配合使用，否则会存在内存泄漏

**参考:**

[OH_NativeBuffer_Reference](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-buffer-h#oh_nativebuffer_reference)

[OH_NativeBuffer_Unreference](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-buffer-h#oh_nativebuffer_unreference)



### 1.2.10 OH_Drawing_FontCreate

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

每个通过`OH_Drawing_Font* OH_Drawing_FontCreate(void)`创建的字型对象，在使用完毕后**必须调用OH_Drawing_FontDestroy函数销毁**，否则产生内存泄漏

**参考:**

[OH_Drawing_Font* OH_Drawing_FontCreate(void)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-font-h#oh_drawing_fontcreate)

[OH_Drawing_FontDestroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-font-h#oh_drawing_fontdestroy)



### 1.2.11 OH_Drawing_TextBlobBuilderCreate

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

通过`OH_Drawing_TextBlobBuilder* OH_Drawing_TextBlobBuilderCreate(void)`一个文本构造器对象，在使用完毕后**必须调用OH_Drawing_TextBlobBuilderDestroy函数销毁该对象占有的内存**，否则产生内存泄漏

**参考:**

[OH_Drawing_TextBlobBuilderCreate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-blob-h#oh_drawing_textblobbuildercreate)

[OH_Drawing_TextBlobBuilderDestroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-blob-h#oh_drawing_textblobbuilderdestroy)



### 1.2.12 OH_Drawing_TextBlobCreateFromText

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

每个通过`OH_Drawing_TextBlobCreateFromText` 使用文本创建一个文本对象，在使用完毕后**必须调用OH_Drawing_TextBlobDestroy函数销毁文本对象并回收该对象占有的内存**，否则产生内存泄漏

**参考:**

[OH_Drawing_TextBlobCreateFromText](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-blob-h#oh_drawing_textblobcreatefromtext)

[OH_Drawing_TextBlobDestroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-blob-h#oh_drawing_textblobdestroy)

### 1.2.13 OH_Drawing_TextBlobCreateFromPosText

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

通过`OH_Drawing_TextBlob* OH_Drawing_TextBlobCreateFromPosText(const void* text, size_t byteLength,OH_Drawing_Point2D* point2D, const OH_Drawing_Font* font, OH_Drawing_TextEncoding textEncoding)` 可以使用文本创建文本对象，在使用完毕后**必须调用OH_Drawing_TextBlobDestroy函数销毁文本对象并回收该对象占有的内存**，否则产生内存泄漏

**参考:**

[OH_Drawing_TextBlobCreateFromPosText](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-blob-h#oh_drawing_textblobcreatefrompostext)

[OH_Drawing_TextBlobDestroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-blob-h#oh_drawing_textblobdestroy)

### 1.2.14 OH_Drawing_TextBlobCreateFromString

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

每个通过`OH_Drawing_TextBlob* OH_Drawing_TextBlobCreateFromString(const char* str,const OH_Drawing_Font* font, OH_Drawing_TextEncoding textEncoding)`创建的文本对象，在使用完毕后**OH_Drawing_TextBlobDestroy**，否则产生内存泄漏

**参考:**

[OH_Drawing_TextBlobCreateFromString](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-blob-h#oh_drawing_textblobcreatefromstring)

[OH_Drawing_TextBlobDestroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-blob-h#oh_drawing_textblobdestroy)


### 1.2.15 OH_Drawing_TextBlobBuilderMake

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

调用本接口`OH_Drawing_TextBlob* OH_Drawing_TextBlobBuilderMake(OH_Drawing_TextBlobBuilder* textBlobBuilder)`可以从文本构造器中创建文本对象，在使用完毕后**OH_Drawing_TextBlobDestroy**，否则产生内存泄漏

**参考:**

[OH_Drawing_TextBlobBuilderMake](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-blob-h#oh_drawing_textblobbuildermake)

[OH_Drawing_TextBlobDestroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-blob-h#oh_drawing_textblobdestroy)



### 1.2.16 OH_Drawing_CanvasCreate

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

调用本接口`OH_Drawing_Canvas* OH_Drawing_CanvasCreate(void)`可以创建一个画布对象，在使用完毕后**OH_Drawing_CanvasDestroy**销毁画布对象并回收内存，否则产生内存泄漏

**参考:**

[OH_Drawing_CanvasCreate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-canvas-h#oh_drawing_canvascreate)

[OH_Drawing_CanvasDestroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-canvas-h#oh_drawing_canvasdestroy)



### 1.2.17 OH_Drawing_CanvasCreateWithPixelMap

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

调用本接口`OH_Drawing_Canvas* OH_Drawing_CanvasCreateWithPixelMap(OH_Drawing_PixelMap* pixelMap)`用于将一个像素图对象绑定到画布中，使得画布绘制的内容输出到像素图中（即CPU渲染）。绑定像素图对象后的画布为非录制类型画布，在使用完毕后**OH_Drawing_CanvasDestroy**销毁画布对象, 并且在销毁画布对象之后应**调用[OH_Drawing_PixelMapDissolve](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-pixel-map-h#oh_drawing_pixelmapdissolve)解除绑定**

**参考:**

[OH_Drawing_CanvasCreateWithPixelMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-canvas-h#oh_drawing_canvascreate)

[OH_Drawing_CanvasDestroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-canvas-h#oh_drawing_canvasdestroy)

[OH_Drawing_PixelMapDissolve](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-pixel-map-h#oh_drawing_pixelmapdissolve)




### 1.2.18 OH_Drawing_CreateTypographyStyle

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

该接口 `OH_Drawing_TypographyStyle* OH_Drawing_CreateTypographyStyle(void)` 创建指向OH_Drawing_TypographyStyle对象的指针。不再需要[OH_Drawing_TypographyStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-typographystyle)时，请使用[OH_Drawing_DestroyTypographyStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_destroytypographystyle)接口释放该对象的指针。

**参考**:

[OH_Drawing_CreateTypographyStyle API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_createtypographystyle)

[OH_Drawing_DestroyTypographyStyle API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_destroytypographystyle)



### 1.2.19 OH_Drawing_CreateTextStyle

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

该接口 `OH_Drawing_TextStyle* OH_Drawing_CreateTextStyle(void)` 创建指向OH_Drawing_TextStyle对象的指针。 **当不再需要时，开发者需要主动调用 释放OH_Drawing_DestroyTextStyle对象占据的内存进行销毁。**

**参考**:

[OH_Drawing_CreateTextStyle API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_createtextstyle)

[OH_Drawing_DestroyTextStyle API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_destroytextstyle)





### 1.2.20 OH_Drawing_CreateTypographyHandler

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

该接口 `OH_Drawing_TypographyCreate* OH_Drawing_CreateTypographyHandler(OH_Drawing_TypographyStyle* style,OH_Drawing_FontCollection* fontCollection)` 创建指向OH_Drawing_TypographyCreate对象的指针。不再需要[OH_Drawing_TypographyCreate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-typographycreate)时，请使用[OH_Drawing_DestroyTypographyHandler](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_destroytypographyhandler)接口释放该对象的指针

**参考**:

[OH_Drawing_CreateTypographyHandler API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_createtypographyhandler)



### 1.2.21 OH_Drawing_CreateTypography

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

该接口 `OH_Drawing_Typography* OH_Drawing_CreateTypography(OH_Drawing_TypographyCreate* handler)`创建指向OH_Drawing_Typography对象的指针。不再需要[OH_Drawing_Typography](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-typography)时，请使用[OH_Drawing_DestroyTypography](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_destroytypography)接口释放该对象的指针。

**参考**:

[OH_Drawing_CreateTypography API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_createtypography)



### 1.2.22 OH_Drawing_CreateFontDescriptor

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

该接口 `OH_Drawing_FontDescriptor* OH_Drawing_CreateFontDescriptor(void)`构造字体描述对象，用于描述系统字体详细信息。**当不再需要时需要调用 OH_Drawing_DestroyFontDescriptor 释放字体描述对象占用的内存.**

**参考**:

[OH_Drawing_CreateFontDescriptor API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_createfontdescriptor)



### 1.2.23 OH_Drawing_CreateFontParser

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

该接口 `OH_Drawing_FontParser* OH_Drawing_CreateFontParser(void)`构造字体解析对象，用于解析系统字体。**当不再需要时需要调用 OH_Drawing_DestroyFontParser 释放字体解析对象占用的内存.**

**参考**:

[OH_Drawing_CreateFontParser API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_createfontparser)


### 1.2.24 OH_Drawing_CreateTextShadow

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

该接口 `OH_Drawing_TextShadow* OH_Drawing_CreateTextShadow(void)`创建指向字体阴影对象的指针。**不再需要OH_Drawing_TextShadow时，请使用OH_Drawing_DestroyTextShadow接口释放该对象的指针.**

**参考**:

[OH_Drawing_CreateTextShadow API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_createtextshadow)


### 1.2.25 OH_Drawing_GetSystemFontConfigInfo

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

该接口 `OH_Drawing_FontConfigInfo* OH_Drawing_GetSystemFontConfigInfo(OH_Drawing_FontConfigInfoErrorCode* errorCode)`获取系统字体配置信息。**不再需要时，请使用OH_Drawing_DestroySystemFontConfigInfo释放该对象指针.**

**参考**:

[OH_Drawing_GetSystemFontConfigInfo API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_getsystemfontconfiginfo)


### 1.2.26 OH_Drawing_CreateTextTab

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

该接口 `OH_Drawing_TextTab* OH_Drawing_CreateTextTab(OH_Drawing_TextAlign alignment, float location)`创建文本制表符对象。**不再需要时，请使用OH_Drawing_DestroyTextTab释放该对象指针.**

**参考**:

[OH_Drawing_CreateTextTab API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_createtexttab)



### 1.2.27 OH_Filter_CreateEffect

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

该接口 `EffectErrorCode OH_Filter_CreateEffect(OH_PixelmapNative* pixelmap, OH_Filter** filter)` 会创建一个OH_Filter对象。**不再需要时，请使用OH_Filter_Release释放该对象指针.**

**参考**:

[OH_Filter_CreateEffect API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-effect-filter-h#oh_filter_createeffect)

[OH_Filter_Release API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-effect-filter-h#oh_filter_release)



## 1.3 窗口相关

### 1.3.1 OH_NativeWindow_ReadFromParcel 

**语言类型:**  C-API

**易错等级:** 高风险

**使用约束:** 

`int32_t OH_NativeWindow_ReadFromParcel(OHIPCParcel *parcel, OHNativeWindow 、**window)` 会创建一个OHNativeWindow ，当窗口对象使用完，开发者需与**void OH_NativeWindow_DestroyNativeWindow(OHNativeWindow\* window)** 接口配合使用，否则会存在内存泄漏

**参考:**

[OH_NativeWindow_ReadFromParcel API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-external-window-h#oh_nativewindow_readfromparcel)

[OH_NativeWindow_DestroyNativeWindow API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-external-window-h#oh_nativewindow_destroynativewindow)



### 1.3.2 OH_NativeWindow_CreateNativeWindowFromSurfaceId

**语言类型:**  C-API

**易错等级:** 高风险

**使用约束:** 
通过surfaceId创建对应的OHNativeWindow，`int32_t OH_NativeWindow_CreateNativeWindowFromSurfaceId(uint64_t surfaceId, OHNativeWindow **window)` 本接口需要与**OH_NativeWindow_DestroyNativeWindow**接口配合使用，否则会存在内存泄漏。

**参考:**

[OH_NativeWindow_CreateNativeWindowFromSurfaceId API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-external-window-h#oh_nativewindow_createnativewindowfromsurfaceid)



### 1.3.3 OH_NativeWindow_CreateNativeWindowBufferFromNativeBuffer

**语言类型:**  C-API

**易错等级:** 高风险

**使用约束:** 

`OHNativeWindowBuffer* OH_NativeWindow_CreateNativeWindowBufferFromNativeBuffer(OH_NativeBuffer* nativeBuffer)` 会新创建的OHNativeWindowBuffer，需要主动 **OH_NativeWindow_DestroyNativeWindowBuffer**进行内存释放，否则导致内存泄漏

**参考:**

[OH_NativeWindow_CreateNativeWindowBufferFromNativeBuffer API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-external-window-h#oh_nativewindow_createnativewindowbufferfromnativebuffer)



### 1.3.4 OH_NativeWindow_NativeObjectReference

**语言类型:**  C-API

**易错等级:** 高风险

**使用约束:** 

增加一个NativeObject的引用计数，`int32_t OH_NativeWindow_NativeObjectReference(void *obj)` 本接口需要与**OH_NativeWindow_NativeObjectUnreference**接口配合使用，否则会存在内存泄漏。

**参考:**

[OH_NativeWindow_NativeObjectReference API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-external-window-h#oh_nativewindow_nativeobjectreference)
[NativeWindow开发指导 (C/C++)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/native-window-guidelines)



### 1.3.5 OH_NativeWindow_GetLastFlushedBuffer（API12废弃）

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

从OHNativeWindow获取上次送回到buffer队列中的OHNativeWindowBuffer，与OH_NativeWindow_GetLastFlushedBuffer的差异在于matrix不同。

本接口需要与 **[OH_NativeWindow_NativeObjectUnreference](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-external-window-h#oh_nativewindow_nativeobjectunreference)** 接口配合使用，否则会存在内存泄漏

**参考:**

[OH_NativeWindow_GetLastFlushedBufferV2 API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-external-window-h#oh_nativewindow_nativeobjectunreference)

[OH_NativeWindow_NativeObjectReference API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-external-window-h#oh_nativewindow_nativeobjectreference)



### 1.3.6 OH_NativeWindow_GetLastFlushedBufferV2

**语言类型:**  C-API

**易错等级:** 高风险

**使用约束:** 

从OHNativeWindow获取上次送回到buffer队列中的OHNativeWindowBuffer,与OH_NativeWindow_GetLastFlushedBuffer的差异在于matrix不同。

本接口需要与**[OH_NativeWindow_NativeObjectUnreference](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-external-window-h#oh_nativewindow_nativeobjectunreference)**接口配合使用，否则会存在内存泄漏

**参考:**

[OH_NativeWindow_GetLastFlushedBufferV2 API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-external-window-h#oh_nativewindow_nativeobjectunreference)

[OH_NativeWindow_NativeObjectReference API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-external-window-h#oh_nativewindow_nativeobjectreference)



### 1.3.7 OH_NativeWindow_NativeWindowRequestBuffer

**语言类型:**  C-API

**易错等级:** 高风险

**使用约束:** 

通过OHNativeWindow对象申请一块OHNativeWindowBuffer，用以内容生产。

在调用本接口前，需要通过[SET_BUFFER_GEOMETRY](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-external-window-h#nativewindowoperation) 对 OHNativeWindow 设置宽高。

本接口需要与[OH_NativeWindow_NativeWindowFlushBuffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-external-window-h#oh_nativewindow_nativewindowflushbuffer)接口配合使用，否则内存会耗尽。

**参考:**

[OH_NativeWindow_NativeWindowRequestBuffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-external-window-h#oh_nativewindow_nativewindowrequestbuffer)

[OH_NativeWindow_NativeWindowFlushBuffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-external-window-h#oh_nativewindow_nativewindowflushbuffer)



### 1.3.8 Window.on

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

窗口Window的生命周期存在大量的 **on/off** 类接口，`window.on`是用于监听窗口事件的接口，主要涉及窗口状态、尺寸、键盘及规避区等变化。

**所有的window.on接口，需要在 aboutToDisappear时主动调用 off 接口进行注销，否则出现内存泄漏**

 **.on**和 **.off**接口，开发者需要注意以下约束，否则会造成组件内存泄漏

**1. 开发者主动配对.on/.off使用，需要注意第一个参数key也要配对，**

**2. off时需要注意不要.off匿名函数，因为匿名函数函数名唯一，会造成与on不配对**

**3. off时第二个参数Callback非必填，当不传Callback时默认释放此类型下的全部Callback，防止泄漏**



**参考:**

[Window.on('windowSizeChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#onwindowsizechange7)

[Window.off('windowSizeChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#offwindowsizechange7)

[Window.on('avoidAreaChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#onavoidareachange9)

[Window.off('avoidAreaChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#offavoidareachange9)

[Window.on('keyboardHeightChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#onkeyboardheightchange7)

[Window.off('keyboardHeightChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#offkeyboardheightchange7)

[Window.on('keyboardWillShow')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#onkeyboardwillshow20)

[Window.off('keyboardWillShow')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#offkeyboardwillshow20)

[Window.on('keyboardWillHide')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#offkeyboardwillshow20)

[Window.off('keyboardWillHide')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#offkeyboardwillhide20)

[Window.on('keyboardDidShow')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#onkeyboarddidshow18)

[Window.off('keyboardDidShow')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#offkeyboarddidshow18)

[Window.on('keyboardDidHide')]()

[Window.off('keyboardDidHide')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#offkeyboarddidhide18)

[Window.on('touchOutside')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#ontouchoutside11)

[Window.off('touchOutside')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#offtouchoutside11)

[Window.on('screenshot')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#onscreenshot9)

[Window.off('screenshot')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#offscreenshot9)

[Window.on('screenshotAppEvent')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#onscreenshotappevent20)

[Window.off('screenshotAppEvent')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#offscreenshotappevent20)

[Window.on('dialogTargetTouch')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#ondialogtargettouch10)

[Window.off('dialogTargetTouch')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window#offdialogtargettouch10)

...**窗口on/off接口众多，请开发者关注每一类的on/off配对情况**



### 1.3.9 WindowStage.on

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

WindowStage是窗口管理器。管理各个基本窗口单元，即[Window](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-window)实例，窗口WindowStage的生命周期存在大量的 **on/off** 类接口。

**所有的WindowStage.on接口，需要在 aboutToDisappear时需要主动调用off 接口进行注销，否则出现内存泄漏。**

**参考:**

[WindowStage.on('windowStageEvent')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-windowstage#onwindowstageevent9)

[WindowStage.off('windowStageEvent')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-windowstage#offwindowstageevent9)

[WindowStage.on('windowStageLifecycleEvent')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-windowstage#onwindowstagelifecycleevent20)

[WindowStage.off('windowStageLifecycleEvent')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-windowstage#offwindowstagelifecycleevent20)

[WindowStage.on('windowStageClose')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-windowstage#onwindowstageclose14)

[WindowStage.off('windowStageClose')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-window-windowstage#offwindowstageclose14)





## 1.4 屏幕管理相关

### 1.4.1 display.on

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

**@ohos.display**屏幕属性提供管理显示设备的一些基础能力，包括获取默认显示设备的信息，获取所有显示设备的信息以及监听显示设备的插拔行为

其中包含 **.on**和 **.off**接口，开发者需要注意以下约束，否则会造成组件内存泄漏

**1. 开发者主动配对.on/.off使用，需要注意第一个参数key也要配对，**

**2. off时需要注意不要.off匿名函数，因为匿名函数函数名唯一，会造成与on不配对**

**3. off时第二个参数Callback非必填，当不传Callback时默认释放此类型下的全部Callback，防止泄漏**



**参考:**

[display.on('add'|'remove'|'change')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#displayonaddremovechange)

[display.off('add'|'remove'|'change')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#displayoffaddremovechange)

[display.on('foldStatusChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#displayonfoldstatuschange10)

[display.off('foldStatusChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#displayofffoldstatuschange10)

[display.on('brightnessInfoChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#displayonbrightnessinfochange22)

[display.off('brightnessInfoChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#displayoffbrightnessinfochange22)

[display.on('foldAngleChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#displayonfoldanglechange12)

[display.off('foldAngleChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#displayofffoldanglechange12)

[display.on('captureStatusChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#displayoncapturestatuschange12)

[display.off('captureStatusChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#displayoffcapturestatuschange12)

[display.on('foldDisplayModeChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#displayonfolddisplaymodechange10)

[display.off('foldDisplayModeChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#displayofffolddisplaymodechange10)



### 1.4.2 display.Display.on

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

**display.Display** 为屏幕实例。描述Display对象的属性和方法。

其中包含 **.on**和 **.off**接口，开发者需要注意以下约束，否则会造成组件内存泄漏

**1. 开发者主动配对.on/.off使用，需要注意第一个参数key也要配对，**

**2. off时需要注意不要.off匿名函数，因为匿名函数函数名唯一，会造成与on不配对**

**3. off时第二个参数Callback非必填，当不传Callback时默认释放此类型下的全部Callback，防止泄漏**

**参考:**

[on('availableAreaChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#onavailableareachange12)

[off('availableAreaChange')](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-display#offavailableareachange12)



## 1.5 进程间通信相关

### 1.5.1 OH_IPCParcel_Create
**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

`OHIPCParcel* OH_IPCParcel_Create(void)` 会创建一个OHIPCParcel对象，此对象使用完毕后需要主动调用 **OH_IPCParcel_Destroy**去释放,否则会导致内存泄漏

**参考:**

[OH_IPCParcel_Create API文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ipc-cparcel-h#oh_ipcparcel_create)

[ipc cpi 开发指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ipc-capi-development-guideline)



### 1.5.2 rpc.MessageSequence.create

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

在RPC或IPC过程中，发送方可以使用MessageSequence提供`rpc.MessageSequence.create();`的方法，将待发送的数据以特定格式写入该对象。接收方可以使用MessageSequence提供的读方法从该对象中读取特定格式的数据. 在使用完毕后，需要主动调用 **reclaim **释放，否则导致内存泄漏,  应用做IPC开发时容易常犯此问题

**示例**：

```js
import { rpc } from '@kit.IPCKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { BusinessError } from '@kit.BasicServicesKit';

try {
  let data = rpc.MessageSequence.create();
  hilog.info(0x0000, 'testTag', 'data is ' + data);

  // 当MessageSequence对象不再使用，由业务主动调用reclaim方法去释放资源。
  data.reclaim();
} catch (error) {
  let e: BusinessError = error as BusinessError;
  hilog.error(0x0000, 'testTag', 'errorCode ' + e.code);
  hilog.error(0x0000, 'testTag', 'errorMessage ' + e.message);
}
```

**参考:**

[messagesequence API文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-rpc#create9)



### 1.5.2 commonEventManager.unsubscribe

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

`commonEventManager.unsubscribe(subscriber: CommonEventSubscriber, callback?: AsyncCallback<void>): void` 会取消订阅公共事件, **取消订阅后如果subscriber不再使用时需要将其置为undefined，避免内存泄漏**

```javascript
// 取消订阅公共事件
// 等待异步接口subscribe执行完毕，开发者根据实际业务选择是否需要添加setTimeout
setTimeout(() => {
  try {
    commonEventManager.unsubscribe(subscriber, (err: BusinessError) => {
      if (err) {
        console.error(`Failed to unsubscribe. Code is ${err.code}, message is ${err.message}`);
        return;
      }
      // subscriber不再使用时需要将其置为undefined，避免内存泄露
      subscriber = undefined;
      console.info(`Succeeded in unsubscribing.`);
    });
  } catch (error) {
    let err: BusinessError = error as BusinessError;
    console.error(`Failed to unsubscribe. Code is ${err.code}, message is ${err.message}`);
  }
}, 500);
```

**参考:**

[commonEventManager.unsubscribe](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-commoneventmanager#commoneventmanagerunsubscribe)




### 1.5.2 emitter.on
**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

@ohos.events.emitter (Emitter) 提供了在同一进程不同线程间或同一线程内发送和处理事件的能力，支持持续订阅事件、单次订阅事件、取消订阅事件及发送事件到事件队列，其中包含 **.on**和 **.off**接口，`emitter.on`接口会持续订阅指定的事件，并在接收到该事件时，执行对应的回调处理函数，开发者需要注意以下约束，否则会造成组件内存泄漏 

**1. 开发者主动配对.on/.off使用，需要注意第一个参数的eventId也要配对，当一个参数为InnerEvent时，InnerEvent的数据结构为{eventId：number, priority: EventPriority}**

**2. off时需要注意不要.off匿名函数，因为匿名函数函数名唯一，会造成与on不配对**

**3. off时第二个参数Callback非必填，当不传Callback时默认释放此类型下的全部Callback，防止泄漏**

不需要订阅某个事件时，**需要及时取消订阅避免造成内存泄漏，如aboutToDisappear时调用emitter.off取消订阅**

**参考:**

[emitter.off](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-emitter#emitteroff)

[使用Emitter进行线程间通信](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/itc-with-emitter)






## 1.6 JSVM相关

### 1.6.1 OH_JSVM_CreateReference

**语言类型:**  C-API

**易错等级:** 高风险

**使用约束:** 

`JSVM_EXTERN JSVM_Status OH_JSVM_CreateReference(JSVM_Env env,JSVM_Value value,uint32_t initialRefcount,JSVM_Ref* result)`和 **OH_JSVM_DeleteReference ** 接口没有成对调用，如果没有主动Delete造成Reference内存泄漏。

**参考:**

[oh_jsvm_createreference API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-jsvm-h#oh_jsvm_createreference)

[JSVM-API 内存泄漏问题定位指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/jsvm-locate-memory-leak)



### 1.6.2 OH_JSVM_OpenEnvScope

**语言类型:**  C-API

**易错等级:** 高风险

**使用约束:** 

`JSVM_EXTERN JSVM_Status OH_JSVM_OpenEnvScope(JSVM_Env env,JSVM_EnvScope* result)`和 **OH_JSVM_CloseEnvScope** 接口没有成对调用，如果没有主动Delete造成Reference内存泄漏。

**参考:**

[oh_jsvm_createreference API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-jsvm-h#oh_jsvm_createreference)

[JSVM-API 内存泄漏问题定位指导](https://gitcode.com/openharmony/docs/blob/master/zh-cn/application-dev/napi/jsvm-guidelines.md)







## 1.7  ArkUI组件相关


### 1.7.1 BuilderNode

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

当BuilderNode对象调用dispose之后，会立即释放当前BuilderNode对象对[实体节点](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-user-defined-node#基本概念)的引用关系。若前端对象BuilderNode无法释放，容易导致内存泄漏。建议在不再需要对该BuilderNode对象进行操作时，开发者主动调用dispose释放后端节点，以减少引用关系的复杂性，降低内存泄漏的风险。

**参考**:

[BuilderNode dispose](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-buildernode#dispose12)

[自定义节点概述](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-user-defined-node#%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5)

[解除实体节点引用关系](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-user-defined-arktsnode-buildernode#%E8%A7%A3%E9%99%A4%E5%AE%9E%E4%BD%93%E8%8A%82%E7%82%B9%E5%BC%95%E7%94%A8%E5%85%B3%E7%B3%BB)

[BuilderNode前后端循环引用导致的内存泄漏问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-user-defined-node-faq#buildernode%E5%89%8D%E5%90%8E%E7%AB%AF%E5%BE%AA%E7%8E%AF%E5%BC%95%E7%94%A8%E5%AF%BC%E8%87%B4%E7%9A%84%E5%86%85%E5%AD%98%E6%B3%84%E6%BC%8F%E9%97%AE%E9%A2%98)



### 1.7.2 ComponentContent

**语言类型:**  ArkTS-API

**易错等级:** 低风险

**使用约束:** 

ComponentContent表示组件内容的实体封装，其对象支持在非UI组件中创建与传递，便于开发者对弹窗类组件进行解耦封装，其底层使用了BuilderNode。

当ComponentContent调用dispose后，会立即释放当前ComponentContent对象对[基本概念：实体节点](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-user-defined-node#基本概念)的引用关系。关于ComponentContent的解绑场景请参见[解除实体节点引用关系](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-user-defined-arktsnode-buildernode#解除实体节点引用关系)

若前端对象ComponentContent无法释放，容易导致内存泄漏。**建议在不再需要操作该ComponentContent对象时，开发者主动调用dispose释放后端节点，以减少引用关系的复杂性，降低内存泄漏的风险。**



**参考**:

[ComponentContent dispose](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-componentcontent#dispose)

[自定义节点概述](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-user-defined-node#%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5)

[解除实体节点引用关系](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-user-defined-arktsnode-buildernode#%E8%A7%A3%E9%99%A4%E5%AE%9E%E4%BD%93%E8%8A%82%E7%82%B9%E5%BC%95%E7%94%A8%E5%85%B3%E7%B3%BB)





### 1.7.3 Animator.create

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

动画操作中 **@ohos.animator** 的自定义组件中一般会持有一个[create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-animator#create18)接口返回的[AnimatorResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-animator#animatorresult)对象，以保证动画对象不在动画过程中析构，而这个对象也通过回调捕获了自定义组件对象。**则需要在自定义组件销毁时的[aboutToDisappear](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-custom-component-lifecycle#abouttodisappear)中释放动画对象，来避免因为循环依赖导致内存泄漏。**

```javascript
  aboutToDisappear() {
    // 自定义组件消失时调用finish使未完成的动画结束，避免动画继续运行。
    // 由于backAnimator在onframe中引用了this, this中保存了backAnimator，
    // 在自定义组件消失时应该将保存在组件中的backAnimator置空，避免内存泄漏
    this.backAnimator?.finish();
    this.backAnimator = undefined;
  }
```



**参考**:

[基于ArkTS扩展的声明式开发范式](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-animator#基于arkts扩展的声明式开发范式)

[Animator create API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-animator#create18)

[AnimatorResult finish API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-animator#finish)



### 1.7.4 CustomDialogController

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

**CustomDialogController**用于控制自定义弹窗。CustomDialogController仅在作为@CustomDialog和@Component struct成员变量时，需要在`aboutToDisappear` 生命周期结束后将**CustomDialogController**置空

```javascript
@Entry
@Component
struct CustomDialogUser {
  @State textValue: string = '';
  @State inputValue: string = 'click me';
  dialogController: CustomDialogController | null = new CustomDialogController({
    builder: CustomDialogExample({
      textValue: this.textValue,
      inputValue: this.inputValue
    }),
    onWillDismiss: (dismissDialogAction: DismissDialogAction)=> {
      console.info(`reason= ${dismissDialogAction.reason}`);
      console.info('dialog onWillDismiss');
      if (dismissDialogAction.reason == DismissReason.PRESS_BACK) {
        dismissDialogAction.dismiss();
      }
      if (dismissDialogAction.reason == DismissReason.TOUCH_OUTSIDE) {
        dismissDialogAction.dismiss();
      }
    },
  })

  // 在自定义组件即将析构销毁时将dialogController置空
  aboutToDisappear() {
    this.dialogController = null; // 将dialogController置空
  }
```



**参考**:

[自定义弹窗CustomDialogController指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-methods-custom-dialog-box#customdialogcontroller)



### 1.7.5 UIExtensionProxy.on（系统接口）

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

**UIExtensionProxy **用于在双方建立连接成功后，组件使用方向被拉起的Ability发送数据、订阅和取消订阅注册，是隶属在**UIExtensionComponent **下的常见操作。 其中包含 **.on**和 **.off**接口，开发者需要注意以下约束，否则会存在因未解除监听造成组件内存泄漏

**1. 开发者主动配对.on/.off使用，需要注意第一个参数key也要配对，**

**2. off时需要注意不要.off匿名函数，因为匿名函数函数名唯一，会造成与on不配对**

**3. off时第二个参数Callback非必填，当不传Callback时默认释放此类型下的全部Callback，防止泄漏**

建议开发者在aboutToDisappear阶段调用  **UIExtensionProxy.off** 接口取消订阅。

```javascript
  aboutToDisappear(): void {
    LogUtil.info(`${TAG} aboutToDisappear`);
    this.uiExtensionProxy?.off('asyncReceiverRegister');
    this.viewModel.destroyListening();
  }
```



**参考**:

[UIExtensionComponent](https://docs.openharmony.cn/pages/v6.0/zh-cn/application-dev/reference/apis-arkui/arkui-ts/ts-container-ui-extension-component-sys.md#uiextensionproxy)

[UIExtensionProxy.on](https://docs.openharmony.cn/pages/v6.0/zh-cn/application-dev/reference/apis-arkui/arkui-ts/ts-container-ui-extension-component-sys.md#onasyncreceiverregister11)

[UIExtensionProxy.off](https://docs.openharmony.cn/pages/v6.0/zh-cn/application-dev/reference/apis-arkui/arkui-ts/ts-container-ui-extension-component-sys.md#offasyncreceiverregister11)




### 1.7.6 OH_ArkUI_StyledString_Create

**语言类型:**  C-API

**易错等级:** 低

**使用约束:** 

通过 `ArkUI_StyledString* OH_ArkUI_StyledString_Create(OH_Drawing_TypographyStyle* style, OH_Drawing_FontCollection* collection)` 创建指向 `ArkUI_StyledString`对象的指针, 创建后的`ArkUI_StyledString` 需要显示调用 **OH_ArkUI_StyledString_Destroy** 进行释放，否则造成内存泄漏

**参考**:

[OH_ArkUI_StyledString_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_create)

[Text组件的文本绘制与显示](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ndk-styled-string)



### 1.7.7 OH_ArkUI_NodeAdapter_Create

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

该接口 `ArkUI_NodeAdapterHandle OH_ArkUI_NodeAdapter_Create()` 会创建创建组件适配器对象，当对象生命周期结束时，需要主动调用 **void OH_ArkUI_NodeAdapter_Dispose(ArkUI_NodeAdapterHandle handle)** 进行销毁，否则造成内存泄漏

**参考**:

[OH_ArkUI_NodeAdapter_Create API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-node-h#oh_arkui_nodeadapter_create)

[NodeAdapter 实现懒加载适配器](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ndk-loading-long-list)




### 1.7.8 OH_ArkUI_SurfaceHolder_Create

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

该接口 `OH_ArkUI_SurfaceHolder* OH_ArkUI_SurfaceHolder_Create(ArkUI_NodeHandle node)` 创建XComponent组件的[OH_ArkUI_SurfaceHolder](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/component-native-xcomponent-oh-arkui-surfaceholder)对象。

**开发者需要主动调用` void OH_ArkUI_SurfaceHolder_Dispose(OH_ArkUI_SurfaceHolder* surfaceHolder)`销毁OH_ArkUI_SurfaceHolder对象**

**参考**:

[OH_ArkUI_SurfaceHolder_Create API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-interface-xcomponent-h#oh_arkui_surfaceholder_create)

[OH_ArkUI_SurfaceHolder_Dispose API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-interface-xcomponent-h#oh_arkui_surfaceholder_dispose)



### 1.7.9 OH_ArkUI_SurfaceCallback_Create

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

该接口 `OH_ArkUI_SurfaceCallback* OH_ArkUI_SurfaceCallback_Create()` 创建[OH_ArkUI_SurfaceCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/mponent-native-xcomponent-oh-arkui-surfacecallback)对象

**开发者需要主动调用` void OH_ArkUI_SurfaceCallback_Dispose(OH_ArkUI_SurfaceCallback* callback)`销毁[OH_ArkUI_SurfaceCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/mponent-native-xcomponent-oh-arkui-surfacecallback)对象**

**参考**:

[OH_ArkUI_SurfaceCallback_Create API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-interface-xcomponent-h#oh_arkui_surfacecallback_create)

[OH_ArkUI_SurfaceHolder_Dispose API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-interface-xcomponent-h#oh_arkui_surfaceholder_dispose)



### 1.7.10 OH_ArkUI_XComponent_Initialize

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

该接口 `int32_t OH_ArkUI_XComponent_Initialize(ArkUI_NodeHandle node)` 初始化XComponent组件持有的Surface

**开发者需要主动调用` int32_t OH_ArkUI_XComponent_Finalize(ArkUI_NodeHandle node)`销毁XComponent组件持有的Surface**

**参考**:

[OH_ArkUI_XComponent_Initialize API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-interface-xcomponent-h#oh_arkui_xcomponent_initialize)

[OH_ArkUI_XComponent_Finalize API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-interface-xcomponent-h#oh_arkui_xcomponent_finalize)






## 1.8 媒体相关

### 1.8.1 media.createAVPlayer

**语言类型:**  ArkTS-API

**易错等级:** 低风险

**使用约束:** 

通过[createAVPlayer()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-media-f#mediacreateavplayer9)构建一个AVPlayer实例，需要在使用完成后主动调用**release**方法提前释放内存,避免持有过多AVPlayer实例导致内存消耗过大，否则在一定情况下可能导致系统终止应用。

**参考**:quit

[media.createAVPlayer API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-media-f#mediacreateavplayer9)

[avplayer release API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-media-avplayer#release9)



### 1.8.2 image.createImageSource

**语言类型:**  ArkTS-API

**易错等级:** 低风险

**使用约束:** 

通过createImageSource 创建ImageSource实例，建议应用在使用完成后主动调用**release**方法提前释放内存

**注意：ArkTS有内存回收机制，ImageSource对象不调用release方法，内存最终也会由系统统一释放。但图片使用的内存往往较大，为尽快释放内存，建议应用在使用完成后主动调用release方法提前释放内存。**

**参考**:

[imagesource release API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-imagesource#release)



### 1.8.3 PixelMap

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

使用`image.createPixelMap`  或者  `getEffectPixelMap`等媒体接口创建PixelMap，建议应用在使用完成后主动调用**release**方法提前释放内存

**ArkTS有内存回收机制，PixelMap对象不调用release方法，内存最终也会由系统统一释放。但图片使用的内存往往较大，为尽快释放内存，建议应用在使用完成后主动调用release方法提前释放内存。释放指的是ArkTS对象释放与之关联的native对象的管理权。仅当所有管理该native对象的ArkTS对象都被释放时，native对象占用的内存才会被回收。**

**注意：系统中创建PixelMap的API有很多需要关注每一个PixelMap的生命周期的最后的release调用。**

**参考**:

[createPixelMap API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-imagesource#createpixelmap7)

[getEffectPixelMap API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-effectkit#geteffectpixelmap11)

[pixelmap release API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-pixelmap#release7)



### 1.8.4 OH_PixelmapNative_CreatePixelmap

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

通过此接口可以`Image_ErrorCode OH_PixelmapNative_CreatePixelmap(uint8_t *data, size_t dataLength, OH_Pixelmap_InitializationOptions *options, OH_PixelmapNative **pixelmap)`创建PixelMap,**当OH_PixelmapNative不再需要时，需要主动调用OH_PixelmapNative_Destroy或者使用OH_PixelmapNative_Release进行释放, 推荐使用OH_PixelmapNative_Destroy**



**参考**:

[OH_PixelmapNative_CreatePixelmap API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapnative_createpixelmap)

[OH_PixelmapNative_Destroy API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapnative_destroy)

[OH_PixelmapNative_Release API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapnative_release)



### 1.8.5 OH_PixelmapImageInfo_Create

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

通过此接口可以`Image_ErrorCode OH_PixelmapImageInfo_Create(OH_Pixelmap_ImageInfo **info)`创建OH_Pixelmap_ImageInfo指针,**当OH_Pixelmap_ImageInfo 不再需要时，需要主动调用OH_PixelmapImageInfo_Release进行释放**



**参考**:

[OH_PixelmapImageInfo_Create API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapimageinfo_create)

[OH_PixelmapImageInfo_Release API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapimageinfo_release)



### 1.8.6 OH_PictureNative_CreatePicture

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

通过此接口可以`Image_ErrorCode OH_PictureNative_CreatePicture(OH_PixelmapNative *mainPixelmap, OH_PictureNative **picture)`创建OH_PictureNative 指针,**当OH_PictureNative 不再需要时，需要主动调用OH_PictureNative_Release 进行释放**



**参考**:

[OH_PictureNative_CreatePicture API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-picture-native-h#oh_picturenative_createpicture)

[OH_PictureNative_Release API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-picture-native-h#oh_picturenative_release)



### 1.8.7 OH_AuxiliaryPictureNative_Create

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

通过此接口可以`Image_ErrorCode OH_AuxiliaryPictureNative_Create(uint8_t *data, size_t dataLength, Image_Size *size,Image_AuxiliaryPictureType type, OH_AuxiliaryPictureNative **auxiliaryPicture)` OH_AuxiliaryPictureNative 指针,**OH_AuxiliaryPictureNative 不再需要时，需要主动调用OH_AuxiliaryPictureNative_Release 进行释放**



**参考**:

[OH_AuxiliaryPictureNative_Create API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-picture-native-h#oh_auxiliarypicturenative_create)

[OH_AuxiliaryPictureNative_Release API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-picture-native-h#oh_auxiliarypicturenative_release)



### 1.8.8 OH_AuxiliaryPictureInfo_Create

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

通过此接口`Image_ErrorCode OH_AuxiliaryPictureInfo_Create(OH_AuxiliaryPictureInfo **info)` OH_AuxiliaryPictureInfo  可以创建指针,**OH_AuxiliaryPictureInfo  不再需要时，需要主动调用 OH_AuxiliaryPictureInfo_Release 进行释放**


**参考**:

[OH_AuxiliaryPictureInfo_Create API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-picture-native-h#oh_auxiliarypictureinfo_create)

[OH_AuxiliaryPictureInfo_Release API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-picture-native-h#oh_auxiliarypictureinfo_release)



### 1.8.9 OH_PixelmapInitializationOptions_Create

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

通过此接口`Image_ErrorCode OH_PixelmapInitializationOptions_Create(OH_Pixelmap_InitializationOptions **options)`  可以创建OH_Pixelmap_InitializationOptions 指针,  **当OH_Pixelmap_InitializationOptions不再需要时，需要主动调用OH_PixelmapInitializationOptions_Release进行释放**

**参考**:

[OH_PixelmapInitializationOptions_Create API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapinitializationoptions_create)

[OH_PixelmapInitializationOptions_Release API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapinitializationoptions_release)




## 1.9 ArkWEB相关

### 1.9.1 OH_ArkWeb_CreateResponse

**语言类型:**  C-API

**易错等级:** 高风险

**使用约束:** 

通过`void OH_ArkWeb_CreateResponse(ArkWeb_Response** response)`会为被拦截的请求创建一个ArkWeb_Response对象。**当业务结束时需要主动调用`void OH_ArkWeb_DestroyResponse(ArkWeb_Response* response)`进行销毁。**

**参考**
[OH_ArkWeb_CreateResponse](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkweb-scheme-handler-h#oh_arkweb_createresponse)
[OH_ArkWeb_DestroyResponse](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkweb-scheme-handler-h#oh_arkweb_destroyresponse)





## 1.10 Ability程序框架相关

### 1.10.1 EventHub.on

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

EventHub是系统提供的基于发布-订阅模式实现的事件通信机制。通过事件名，实现了发送方和订阅方之间的解耦，支持不同业务模块间的高效数据传递和状态同步。主要用于[UIAbility组件与UI的数据通信](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/uiability-data-sync-with-ui)。其中包含 **.on**和 **.off**接口，开发者需要注意以下约束，否则会存在因EventHub监听造成组件内存泄漏

**1. 开发者主动配对.on/.off使用，需要注意第一个参数key也要配对，**

**2. off时需要注意不要.off匿名函数，因为匿名函数函数名唯一，会造成与on不配对**

**3. off时第二个参数Callback非必填，当不传Callback时默认释放此类型下的全部Callback，防止泄漏**

**参考**

[EventHub.on API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-eventhub#eventhubon)



## 1.11 网络相关

### 1.11.1 observer.on

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

@ohos.telephony.observer (observer) 提供订阅管理功能，可以订阅/取消订阅的事件包括：网络状态变化、信号状态变化、通话状态变化、蜂窝数据链路连接状态、蜂窝数据业务的上下行数据流状态、SIM状态变化. 其中包含 **.on**和 **.off**接口，开发者需要注意以下约束，否则会存在因observer监听造成组件内存泄漏

**1. 开发者主动配对.on/.off使用，需要注意第一个参数key也要配对，**

**2. off时需要注意不要.off匿名函数，因为匿名函数函数名唯一，会造成与on不配对**

**3. off时第二个参数Callback非必填，当不传Callback时默认释放此类型下的全部Callback，防止泄漏**



**参考**

[observer.on(type: 'networkStateChange', callback: Callback<NetworkState>): void](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-observer#observeronnetworkstatechange)

[observer.off(type: 'networkStateChange', callback?: Callback<NetworkState>): void](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-observer#observeroffnetworkstatechange)



### 1.11.2 webSocket .on

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

@ohos.net.webSocket (WebSocket连接) 给第三方应用提供webSocket客户端和服务端服务器，实现客户端与服务端的双向连接。webSocket 包含多个 **.on**和 **.off**接口，开发者需要注意以下约束，否则会存在因observer监听造成组件内存泄漏

**1. 开发者主动配对.on/.off使用，需要注意第一个参数key也要配对，否则造成泄漏**

**2. off时需要注意不要.off匿名函数，因为匿名函数函数名唯一，会造成与on不配对，造成泄漏**

**3. off时第二个参数Callback非必填，当不传Callback时默认释放此类型下的全部Callback，可以防止泄漏**



**参考**

[webSocket.on(type: 'open', callback: AsyncCallback<Object>): void](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-websocket#onopen)

[webSocket.on(type: 'message', callback: AsyncCallback<string | ArrayBuffer>): void](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-websocket#onmessage)

[webSocket.on(type: 'close', callback: AsyncCallback<CloseResult>): void](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-websocket#onclose)



## 1.12 硬件相关

### 1.12.1 sensor.on

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

@ohos.sensor (传感器) 模块提供了获取传感器数据的能力，包括获取传感器属性列表，订阅传感器数据，以及一些通用的传感器算法。

sensor 包含 **.on**和 **.off**接口，开发者需要注意以下约束，否则会存在因sensor 监听造成组件内存泄漏

**1. 开发者主动配对.on/.off使用，需要注意第一个参数type也要配对，否则造成泄漏**

**2.调用off时需要注意不要.off匿名函数，因为匿名函数函数名唯一，会造成与on不配对，造成泄漏**

**3. off时第二个参数Callback非必填，当不传Callback时默认释放此类型下的全部Callback，可以防止泄漏**

**示例**：

```javascript
import { sensor } from '@kit.SensorServiceKit';
import { BusinessError } from '@kit.BasicServicesKit';

function callback1(data: object) {
  console.info('Succeeded in getting callback1 data: ' + JSON.stringify(data));
}

function callback2(data: object) {
  console.info('Succeeded in getting callback2 data: ' + JSON.stringify(data));
}

// 使用try catch对可能出现的异常进行捕获
try {
  sensor.on(sensor.SensorId.ACCELEROMETER, callback1);
  sensor.on(sensor.SensorId.ACCELEROMETER, callback2);
  // 仅取消callback1的注册
  sensor.off(sensor.SensorId.ACCELEROMETER, callback1);
  // 取消SensorId.ACCELEROMETER类型的所有回调
  sensor.off(sensor.SensorId.ACCELEROMETER);
} catch (error) {
  let e: BusinessError = error as BusinessError;
  console.error(`Failed to invoke off. Code: ${e.code}, message: ${e.message}`);
}
```

第一个type参数SensorID，包括以下几类

| 名称                        | 值   | 说明                                                         |
| :-------------------------- | :--- | :----------------------------------------------------------- |
| ACCELEROMETER               | 1    | 加速度传感器。**元服务API**：从API version 11开始，该接口支持在元服务中使用。 |
| GYROSCOPE                   | 2    | 陀螺仪传感器。**元服务API**：从API version 11开始，该接口支持在元服务中使用。 |
| AMBIENT_LIGHT               | 5    | 环境光传感器。                                               |
| MAGNETIC_FIELD              | 6    | 磁场传感器。                                                 |
| BAROMETER                   | 8    | 气压计传感器。                                               |
| HALL                        | 10   | 霍尔传感器。                                                 |
| PROXIMITY                   | 12   | 接近光传感器。                                               |
| HUMIDITY                    | 13   | 湿度传感器。                                                 |
| ORIENTATION                 | 256  | 方向传感器。**元服务API**：从API version 11开始，该接口在支持元服务中使用。 |
| GRAVITY                     | 257  | 重力传感器。                                                 |
| LINEAR_ACCELEROMETER        | 258  | 线性加速度传感器。                                           |
| ROTATION_VECTOR             | 259  | 旋转矢量传感器。                                             |
| AMBIENT_TEMPERATURE         | 260  | 环境温度传感器。                                             |
| MAGNETIC_FIELD_UNCALIBRATED | 261  | 未校准磁场传感器。                                           |
| GYROSCOPE_UNCALIBRATED      | 263  | 未校准陀螺仪传感器。                                         |
| SIGNIFICANT_MOTION          | 264  | 有效运动传感器。                                             |
| PEDOMETER_DETECTION         | 265  | 计步检测传感器。                                             |
| PEDOMETER                   | 266  | 计步传感器。                                                 |
| HEART_RATE                  | 278  | 心率传感器。                                                 |
| WEAR_DETECTION              | 280  | 佩戴检测传感器。                                             |
| ACCELEROMETER_UNCALIBRATED  | 281  | 未校准加速度计传感器。                                       |
| FUSION_PRESSURE             | 283  | 融合压力传感器。仅智能表有该传感器                           |



**参考**

[sensor.on(type: SensorId.ACCELEROMETER, callback: Callback<AccelerometerResponse>, options?: Options): void](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-sensor#sensoron)

[sensor.off(type: SensorId.ACCELEROMETER, callback?: Callback<AccelerometerResponse>): void](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-sensor#sensoroff)





### 1.12.2 vibrator.on

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

@ohos.vibrator (振动) 模块提供控制设备马达振动的能力。包括启动指定时长、预置效果、自定义文件等模式的振动；停止指定时长、预置效果或所有模式的振动。

vibrator 包含 **.on**和 **.off**接口，开发者需要注意以下约束，否则会存在因sensor 监听造成组件内存泄漏

**1. 开发者主动配对.on/.off使用，需要注意第一个参数type也要配对，否则造成泄漏**

**2.调用off时需要注意不要.off匿名函数，因为匿名函数函数名唯一，会造成与on不配对，造成泄漏**

**3. off时第二个参数Callback非必填，当不传Callback时默认释放此类型下的全部Callback，可以防止泄漏**

**示例**：

```javascript
import { vibrator } from '@kit.SensorServiceKit';
import { BusinessError } from '@kit.BasicServicesKit';

// 回调函数
const vibratorStateChangeCallback = (data: vibrator.VibratorStatusEvent) => {
  console.info('vibrator state callback info:', JSON.stringify(data));
}

// 使用try catch对可能出现的异常进行捕获
try {
  // 订阅 vibratorStateChange事件
  vibrator.on('vibratorStateChange', vibratorStateChangeCallback);
} catch (error) {
  let e: BusinessError = error as BusinessError;
  console.error(`An unexpected error occurred. Code: ${e.code}, message: ${e.message}`);
}

// 使用try catch对可能出现的异常进行捕获
try {
  // 取消订阅 vibratorStateChange事件
  vibrator.off('vibratorStateChange', vibratorStateChangeCallback);
  // 取消订阅所有 vibratorStateChange事件
  // vibrator.off('vibratorStateChange');
} catch (error) {
  let e: BusinessError = error as BusinessError;
  console.error(`An unexpected error occurred. Code: ${e.code}, message: ${e.message}`);
}
```

第一个type参数SensorID，包括以下几类



**参考**

[vibrator.on(type: 'vibratorStateChange', callback: Callback<VibratorStatusEvent>): void](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-vibrator#vibratoron19)

[vibrator.off(type: 'vibratorStateChange', callback?: Callback<VibratorStatusEvent>): void](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-vibrator#vibratoroff19)



## 1.13 公共基础能力相关

### 1.13.1 setInterval

**语言类型:**  ArkTS-API

**易错等级:** 低风险

**使用约束:** 

通过 setInterval(handler: Function | string, delay: number, ...arguments: any[]):  number 重复调用一个函数，在每次调用之间具有固定的时间延迟。**需手动调用clearInterval接口, 否 则会存在内存泄漏。**

**参考**

[setInterval](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-timer#setinterval)



## 1.14 三方库相关

### 1.14.1 aki-PostTask 

**语言类型:**  C-API

**易错等级:** 高风险

**使用约束:** 

**`AKI (Alpha Kernel Interacting)` 是一款边界性编程体验友好的ArkTs FFI开发框架，针对OpenHarmony Native开发提供JS与C/C++跨语言访问场景解决方案。支持极简语法糖使用方式，一行代码完成JS与C/C++的无障碍跨语言互调，所键即所得。**

AKI提供了 `static void PostTask (  const std::string& runnerName, Closure task);`接口用于将任务`task`抛回到JS线程中运行，**在JS线程运行期间构造的JS对象是不会被系统GC的，需要使用者自己通过napi_handle_scaope等方式管理这些JS对象的生命周期。如果使用者不对使用对象的生命周期进行管理。容易造成内存泄露问题**

```c++
void foo ()
{
    aki::TaskRunner::PostTask("main", [] () {
      // 在 JS 线程执行
      napi_handle_scope scope;
      napi_env env = Binding::GetScopedEnv();
      napi_open_handle_scope(env, &scope);
      // do something
      napi_close_handle_scope(env, scope);
    });
}
```



**参考**

[AKI 项目](https://gitcode.com/openharmony-sig/aki)

[AKI posttask](https://gitcode.com/openharmony-sig/aki#-posttask-)





### 1.14.2 RxJS-Observable.subscribe

**语言类型:**  ArkTS-API

**易错等级:** 高风险

**使用约束:** 

RxJS 是一个使用 Observables 进行响应式编程的库，旨在简化异步或基于回调的代码的组合.Observable实例对外提供了  `public subscribe(observerOrNext: Observer | Function, error: Function, complete: Function): ISubscription` 接口，此接口会调用 Observable 的执行并注册 Observer 的处理器以便于发出通知

**调用`subscribe`会返回 Subscription 对象。该Subscription 对象允许你调用 `unsubscribe`，该方法会停止 Observable 的工作并且清理 Observable 持有的资源，如未调用会产生内存泄漏**



```c++
const subscription = Rx.Observable.interval(1000).subscribe(
  num => console.log(num),
  undefined,
  () => console.log('completed!') // 即使当取消订阅时，也不会被调用
);


setTimeout(() => {
  subscription.unsubscribe();
  console.log('unsubscribed!');
}, 2500);

// Logs:
// 0 after 1s
// 1 after 2s
// "unsubscribed!" after 2,5s
```



**参考**

[RxJS subscribe](https://cn.rx.js.org/class/es6/Observable.js~Observable.html#instance-method-subscribe)

