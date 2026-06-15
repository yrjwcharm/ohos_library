## 1. 内存泄漏案例

### 1. napi_create_reference 

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




### 2. OH_Drawing_CreateSharedFontCollection

**语言类型:**  C-API

**易错等级:** 高风险

**使用约束:** 
使用API `OH_Drawing_FontCollection* OH_Drawing_CreateSharedFontCollection(void)` 创建的字体集必须通过调用API  **void OH_Drawing_DestroyFontCollection(OH_Drawing_FontCollection* fontCollection)**释放，否则会造成内存泄漏

**参考:**

[OH_Drawing_CreateSharedFontCollection API ](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-font-collection-h#oh_drawing_createsharedfontcollection)
[OH_Drawing_DestroyFontCollection API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-font-collection-h#oh_drawing_destroyfontcollection)






### 3. OH_Drawing_CreateFontCollection 

**语言类型:**  C-API

**易错等级:** 高风险

**使用约束:** 
使用API `OH_Drawing_FontCollection* OH_Drawing_CreateFontCollection(void)` 创建的字体集必须通过调用API  **void OH_Drawing_DestroyFontCollection(OH_Drawing_FontCollection* fontCollection)**释放，否则会造成内存泄漏

**参考:**

[OH_Drawing_CreateFontCollection官方API ](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-font-collection-h#oh_drawing_createfontcollection)
[OH_Drawing_DestroyFontCollection官方API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-font-collection-h#oh_drawing_destroyfontcollection)





### 4. OH_NativeImage_Create 

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 
使用API `OH_NativeImage* OH_NativeImage_Create(uint32_t textureId, uint32_t textureTarget)`创建一个OH_NativeImage实例，该实例与OpenGL ES的纹理ID和纹理目标相关联。
本接口需要与**[OH_NativeImage_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-image-h#oh_nativeimage_destroy)**配合使用，否则会存在内存泄漏。

**参考:**

[OH_NativeImage_Create API ](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-image-h#oh_nativeimage_create)
[NativeImage开发指导 (C/C++)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/native-image-guidelines)




### 5. OH_ConsumerSurface_Create

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

`OH_NativeImage* OH_ConsumerSurface_Create(void)` 此接口回创建一个OH_NativeImage实例，作为surface的消费端, 注意本接口需要和**OH_NativeImage_Destroy**配合使用，否则会存在内存泄漏。

**参考:**

[OH_ConsumerSurface_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-image-h)





### 6. OH_NativeBuffer_Alloc

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 
使用API `OH_NativeBuffer* OH_NativeBuffer_Alloc(const OH_NativeBuffer_Config* config)`通过OH_NativeBuffer_Config创建OH_NativeBuffer实例，每次调用都会产生一个新的OH_NativeBuffer实例。
本接口需要与**[OH_NativeBuffer_Unreference](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-buffer-h#oh_nativebuffer_unreference)**接口配合使用，否则会存在内存泄漏

**参考:**

[OH_NativeBuffer_Alloc API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-buffer-h#oh_nativebuffer_alloc)




### 7. OH_NativeVSync_Create

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 
使用API `OH_NativeVSync* OH_NativeVSync_Create(const char* name, unsigned int length)`创建一个OH_NativeVSync实例，每次调用都会产生一个新的实例。本接口需要与[OH_NativeVSync_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-vsync-h#oh_nativevsync_destroy)接口配合使用，否则会存在内存泄漏。

**参考:**

[OH_NativeVSync_Create API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-vsync-h#oh_nativevsync_create)




### 8. OH_NativeBuffer_Map

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

此接口 `int32_t OH_NativeBuffer_Map(OH_NativeBuffer *buffer, void **virAddr)`，OH_NativeBuffer对应的ION内存映射到进程空间。本接口需要与[OH_NativeBuffer_Unmap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-buffer-h#oh_nativebuffer_unmap)接口配合使用。



**参考:**

[OH_NativeBuffer_Map](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-buffer-h#oh_nativebuffer_map)

[OH_NativeBuffer_Unmap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-buffer-h#oh_nativebuffer_unmap)





### 9. OH_NativeImage_AcquireNativeWindowBuffer

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

`int32_t OH_NativeImage_AcquireNativeWindowBuffer(OH_NativeImage* image,OHNativeWindowBuffer** nativeWindowBuffer, int* fenceFd)` 通过消费端的OH_NativeImage获取一个OHNativeWindowBuffer。本接口需要和**OH_NativeImage_ReleaseNativeWindowBuffer**配合使用，否则会存在内存泄漏

**参考:**

[OH_NativeImage_AcquireNativeWindowBuffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-image-h#oh_nativeimage_acquirenativewindowbuffer)
[OH_NativeImage_ReleaseNativeWindowBuffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-image-h#oh_nativeimage_releasenativewindowbuffer)




### 10. OH_NativeBuffer_Reference

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

[int32_t OH_NativeBuffer_Reference(OH_NativeBuffer *buffer)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-buffer-h#oh_nativebuffer_reference) 接口可以把 OH_NativeBuffer 对象的引用计数增加1。本接口需要与[OH_NativeBuffer_Unreference](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-buffer-h#oh_nativebuffer_unreference)接口配合使用，否则会存在内存泄漏

**参考:**

[OH_NativeBuffer_Reference](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-buffer-h#oh_nativebuffer_reference)

[OH_NativeBuffer_Unreference](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-buffer-h#oh_nativebuffer_unreference)




### 11. OH_Drawing_FontCreate

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

每个通过`OH_Drawing_Font* OH_Drawing_FontCreate(void)`创建的字型对象，在使用完毕后**必须调用OH_Drawing_FontDestroy函数销毁**，否则产生内存泄漏

**参考:**

[OH_Drawing_Font* OH_Drawing_FontCreate(void)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-font-h#oh_drawing_fontcreate)

[OH_Drawing_FontDestroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-font-h#oh_drawing_fontdestroy)




### 12. OH_Drawing_TextBlobBuilderCreate

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

通过`OH_Drawing_TextBlobBuilder* OH_Drawing_TextBlobBuilderCreate(void)`一个文本构造器对象，在使用完毕后**必须调用OH_Drawing_TextBlobBuilderDestroy函数销毁该对象占有的内存**，否则产生内存泄漏

**参考:**

[OH_Drawing_TextBlobBuilderCreate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-blob-h#oh_drawing_textblobbuildercreate)

[OH_Drawing_TextBlobBuilderDestroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-blob-h#oh_drawing_textblobbuilderdestroy)




### 13. OH_Drawing_TextBlobCreateFromText

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

每个通过`OH_Drawing_TextBlobCreateFromText` 使用文本创建一个文本对象，在使用完毕后**必须调用OH_Drawing_TextBlobDestroy函数销毁文本对象并回收该对象占有的内存**，否则产生内存泄漏

**参考:**

[OH_Drawing_TextBlobCreateFromText](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-blob-h#oh_drawing_textblobcreatefromtext)

[OH_Drawing_TextBlobDestroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-blob-h#oh_drawing_textblobdestroy)


### 14. OH_Drawing_TextBlobCreateFromPosText

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

通过`OH_Drawing_TextBlob* OH_Drawing_TextBlobCreateFromPosText(const void* text, size_t byteLength,OH_Drawing_Point2D* point2D, const OH_Drawing_Font* font, OH_Drawing_TextEncoding textEncoding)` 可以使用文本创建文本对象，在使用完毕后**必须调用OH_Drawing_TextBlobDestroy函数销毁文本对象并回收该对象占有的内存**，否则产生内存泄漏

**参考:**

[OH_Drawing_TextBlobCreateFromPosText](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-blob-h#oh_drawing_textblobcreatefrompostext)

[OH_Drawing_TextBlobDestroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-blob-h#oh_drawing_textblobdestroy)


### 15. OH_Drawing_TextBlobCreateFromString

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

每个通过`OH_Drawing_TextBlob* OH_Drawing_TextBlobCreateFromString(const char* str,const OH_Drawing_Font* font, OH_Drawing_TextEncoding textEncoding)`创建的文本对象，在使用完毕后**OH_Drawing_TextBlobDestroy**，否则产生内存泄漏

**参考:**

[OH_Drawing_TextBlobCreateFromString](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-blob-h#oh_drawing_textblobcreatefromstring)

[OH_Drawing_TextBlobDestroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-blob-h#oh_drawing_textblobdestroy)



### 16. OH_Drawing_TextBlobBuilderMake

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

调用本接口`OH_Drawing_TextBlob* OH_Drawing_TextBlobBuilderMake(OH_Drawing_TextBlobBuilder* textBlobBuilder)`可以从文本构造器中创建文本对象，在使用完毕后**OH_Drawing_TextBlobDestroy**，否则产生内存泄漏

**参考:**

[OH_Drawing_TextBlobBuilderMake](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-blob-h#oh_drawing_textblobbuildermake)

[OH_Drawing_TextBlobDestroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-blob-h#oh_drawing_textblobdestroy)




### 17. OH_Drawing_CanvasCreate

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

调用本接口`OH_Drawing_Canvas* OH_Drawing_CanvasCreate(void)`可以创建一个画布对象，在使用完毕后**OH_Drawing_CanvasDestroy**销毁画布对象并回收内存，否则产生内存泄漏

**参考:**

[OH_Drawing_CanvasCreate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-canvas-h#oh_drawing_canvascreate)

[OH_Drawing_CanvasDestroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-canvas-h#oh_drawing_canvasdestroy)




### 18. OH_Drawing_CanvasCreateWithPixelMap

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

调用本接口`OH_Drawing_Canvas* OH_Drawing_CanvasCreateWithPixelMap(OH_Drawing_PixelMap* pixelMap)`用于将一个像素图对象绑定到画布中，使得画布绘制的内容输出到像素图中（即CPU渲染）。绑定像素图对象后的画布为非录制类型画布，在使用完毕后**OH_Drawing_CanvasDestroy**销毁画布对象, 并且在销毁画布对象之后应**调用[OH_Drawing_PixelMapDissolve](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-pixel-map-h#oh_drawing_pixelmapdissolve)解除绑定**

**参考:**

[OH_Drawing_CanvasCreateWithPixelMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-canvas-h#oh_drawing_canvascreate)

[OH_Drawing_CanvasDestroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-canvas-h#oh_drawing_canvasdestroy)

[OH_Drawing_PixelMapDissolve](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-pixel-map-h#oh_drawing_pixelmapdissolve)





### 19. OH_Drawing_CreateTypographyStyle

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

该接口 `OH_Drawing_TypographyStyle* OH_Drawing_CreateTypographyStyle(void)` 创建指向OH_Drawing_TypographyStyle对象的指针。不再需要[OH_Drawing_TypographyStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-typographystyle)时，请使用[OH_Drawing_DestroyTypographyStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_destroytypographystyle)接口释放该对象的指针。

**参考**:

[OH_Drawing_CreateTypographyStyle API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_createtypographystyle)

[OH_Drawing_DestroyTypographyStyle API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_destroytypographystyle)




### 20. OH_Drawing_CreateTextStyle

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

该接口 `OH_Drawing_TextStyle* OH_Drawing_CreateTextStyle(void)` 创建指向OH_Drawing_TextStyle对象的指针。 **当不再需要时，开发者需要主动调用 释放OH_Drawing_DestroyTextStyle对象占据的内存进行销毁。**

**参考**:

[OH_Drawing_CreateTextStyle API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_createtextstyle)

[OH_Drawing_DestroyTextStyle API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_destroytextstyle)






### 21. OH_Drawing_CreateTypographyHandler

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

该接口 `OH_Drawing_TypographyCreate* OH_Drawing_CreateTypographyHandler(OH_Drawing_TypographyStyle* style,OH_Drawing_FontCollection* fontCollection)` 创建指向OH_Drawing_TypographyCreate对象的指针。不再需要[OH_Drawing_TypographyCreate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-typographycreate)时，请使用[OH_Drawing_DestroyTypographyHandler](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_destroytypographyhandler)接口释放该对象的指针

**参考**:

[OH_Drawing_CreateTypographyHandler API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_createtypographyhandler)




### 22. OH_Drawing_CreateTypography

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

该接口 `OH_Drawing_Typography* OH_Drawing_CreateTypography(OH_Drawing_TypographyCreate* handler)`创建指向OH_Drawing_Typography对象的指针。不再需要[OH_Drawing_Typography](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-drawing-typography)时，请使用[OH_Drawing_DestroyTypography](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_destroytypography)接口释放该对象的指针。

**参考**:

[OH_Drawing_CreateTypography API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_createtypography)




### 23. OH_Drawing_CreateFontDescriptor

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

该接口 `OH_Drawing_FontDescriptor* OH_Drawing_CreateFontDescriptor(void)`构造字体描述对象，用于描述系统字体详细信息。**当不再需要时需要调用 OH_Drawing_DestroyFontDescriptor 释放字体描述对象占用的内存.**

**参考**:

[OH_Drawing_CreateFontDescriptor API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_createfontdescriptor)




### 24. OH_Drawing_CreateFontParser

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

该接口 `OH_Drawing_FontParser* OH_Drawing_CreateFontParser(void)`构造字体解析对象，用于解析系统字体。**当不再需要时需要调用 OH_Drawing_DestroyFontParser 释放字体解析对象占用的内存.**

**参考**:

[OH_Drawing_CreateFontParser API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_createfontparser)



### 25. OH_Drawing_CreateTextShadow

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

该接口 `OH_Drawing_TextShadow* OH_Drawing_CreateTextShadow(void)`创建指向字体阴影对象的指针。**不再需要OH_Drawing_TextShadow时，请使用OH_Drawing_DestroyTextShadow接口释放该对象的指针.**

**参考**:

[OH_Drawing_CreateTextShadow API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_createtextshadow)



### 26. OH_Drawing_GetSystemFontConfigInfo

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

该接口 `OH_Drawing_FontConfigInfo* OH_Drawing_GetSystemFontConfigInfo(OH_Drawing_FontConfigInfoErrorCode* errorCode)`获取系统字体配置信息。**不再需要时，请使用OH_Drawing_DestroySystemFontConfigInfo释放该对象指针.**

**参考**:

[OH_Drawing_GetSystemFontConfigInfo API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_getsystemfontconfiginfo)



### 27. OH_Drawing_CreateTextTab

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

该接口 `OH_Drawing_TextTab* OH_Drawing_CreateTextTab(OH_Drawing_TextAlign alignment, float location)`创建文本制表符对象。**不再需要时，请使用OH_Drawing_DestroyTextTab释放该对象指针.**

**参考**:

[OH_Drawing_CreateTextTab API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-text-typography-h#oh_drawing_createtexttab)




### 28. OH_Filter_CreateEffect

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

该接口 `EffectErrorCode OH_Filter_CreateEffect(OH_PixelmapNative* pixelmap, OH_Filter** filter)` 会创建一个OH_Filter对象。**不再需要时，请使用OH_Filter_Release释放该对象指针.**

**参考**:

[OH_Filter_CreateEffect API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-effect-filter-h#oh_filter_createeffect)

[OH_Filter_Release API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-effect-filter-h#oh_filter_release)





### 29. OH_NativeWindow_ReadFromParcel 

**语言类型:**  C-API

**易错等级:** 高风险

**使用约束:** 

`int32_t OH_NativeWindow_ReadFromParcel(OHIPCParcel *parcel, OHNativeWindow 、**window)` 会创建一个OHNativeWindow ，当窗口对象使用完，开发者需与**void OH_NativeWindow_DestroyNativeWindow(OHNativeWindow\* window)** 接口配合使用，否则会存在内存泄漏

**参考:**

[OH_NativeWindow_ReadFromParcel API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-external-window-h#oh_nativewindow_readfromparcel)

[OH_NativeWindow_DestroyNativeWindow API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-external-window-h#oh_nativewindow_destroynativewindow)




### 30. OH_NativeWindow_CreateNativeWindowFromSurfaceId

**语言类型:**  C-API

**易错等级:** 高风险

**使用约束:** 
通过surfaceId创建对应的OHNativeWindow，`int32_t OH_NativeWindow_CreateNativeWindowFromSurfaceId(uint64_t surfaceId, OHNativeWindow **window)` 本接口需要与**OH_NativeWindow_DestroyNativeWindow**接口配合使用，否则会存在内存泄漏。

**参考:**

[OH_NativeWindow_CreateNativeWindowFromSurfaceId API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-external-window-h#oh_nativewindow_createnativewindowfromsurfaceid)




### 31. OH_NativeWindow_CreateNativeWindowBufferFromNativeBuffer

**语言类型:**  C-API

**易错等级:** 高风险

**使用约束:** 

`OHNativeWindowBuffer* OH_NativeWindow_CreateNativeWindowBufferFromNativeBuffer(OH_NativeBuffer* nativeBuffer)` 会新创建的OHNativeWindowBuffer，需要主动 **OH_NativeWindow_DestroyNativeWindowBuffer**进行内存释放，否则导致内存泄漏

**参考:**

[OH_NativeWindow_CreateNativeWindowBufferFromNativeBuffer API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-external-window-h#oh_nativewindow_createnativewindowbufferfromnativebuffer)




### 32. OH_NativeWindow_NativeObjectReference

**语言类型:**  C-API

**易错等级:** 高风险

**使用约束:** 

增加一个NativeObject的引用计数，`int32_t OH_NativeWindow_NativeObjectReference(void *obj)` 本接口需要与**OH_NativeWindow_NativeObjectUnreference**接口配合使用，否则会存在内存泄漏。

**参考:**

[OH_NativeWindow_NativeObjectReference API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-external-window-h#oh_nativewindow_nativeobjectreference)
[NativeWindow开发指导 (C/C++)](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/native-window-guidelines)




### 33. OH_NativeWindow_GetLastFlushedBuffer（API12废弃）

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

从OHNativeWindow获取上次送回到buffer队列中的OHNativeWindowBuffer，与OH_NativeWindow_GetLastFlushedBuffer的差异在于matrix不同。

本接口需要与 **[OH_NativeWindow_NativeObjectUnreference](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-external-window-h#oh_nativewindow_nativeobjectunreference)** 接口配合使用，否则会存在内存泄漏

**参考:**

[OH_NativeWindow_GetLastFlushedBufferV2 API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-external-window-h#oh_nativewindow_nativeobjectunreference)

[OH_NativeWindow_NativeObjectReference API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-external-window-h#oh_nativewindow_nativeobjectreference)




### 34. OH_NativeWindow_GetLastFlushedBufferV2

**语言类型:**  C-API

**易错等级:** 高风险

**使用约束:** 

从OHNativeWindow获取上次送回到buffer队列中的OHNativeWindowBuffer,与OH_NativeWindow_GetLastFlushedBuffer的差异在于matrix不同。

本接口需要与**[OH_NativeWindow_NativeObjectUnreference](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-external-window-h#oh_nativewindow_nativeobjectunreference)**接口配合使用，否则会存在内存泄漏

**参考:**

[OH_NativeWindow_GetLastFlushedBufferV2 API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-external-window-h#oh_nativewindow_nativeobjectunreference)

[OH_NativeWindow_NativeObjectReference API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-external-window-h#oh_nativewindow_nativeobjectreference)




### 35. OH_NativeWindow_NativeWindowRequestBuffer

**语言类型:**  C-API

**易错等级:** 高风险

**使用约束:** 

通过OHNativeWindow对象申请一块OHNativeWindowBuffer，用以内容生产。

在调用本接口前，需要通过[SET_BUFFER_GEOMETRY](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-external-window-h#nativewindowoperation) 对 OHNativeWindow 设置宽高。

本接口需要与[OH_NativeWindow_NativeWindowFlushBuffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-external-window-h#oh_nativewindow_nativewindowflushbuffer)接口配合使用，否则内存会耗尽。

**参考:**

[OH_NativeWindow_NativeWindowRequestBuffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-external-window-h#oh_nativewindow_nativewindowrequestbuffer)

[OH_NativeWindow_NativeWindowFlushBuffer](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-external-window-h#oh_nativewindow_nativewindowflushbuffer)




### 36. OH_IPCParcel_Create
**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

`OHIPCParcel* OH_IPCParcel_Create(void)` 会创建一个OHIPCParcel对象，此对象使用完毕后需要主动调用 **OH_IPCParcel_Destroy**去释放,否则会导致内存泄漏

**参考:**

[OH_IPCParcel_Create API文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ipc-cparcel-h#oh_ipcparcel_create)

[ipc cpi 开发指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ipc-capi-development-guideline)




### 37. OH_JSVM_CreateReference

**语言类型:**  C-API

**易错等级:** 高风险

**使用约束:** 

`JSVM_EXTERN JSVM_Status OH_JSVM_CreateReference(JSVM_Env env,JSVM_Value value,uint32_t initialRefcount,JSVM_Ref* result)`和 **OH_JSVM_DeleteReference ** 接口没有成对调用，如果没有主动Delete造成Reference内存泄漏。

**参考:**

[oh_jsvm_createreference API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-jsvm-h#oh_jsvm_createreference)

[JSVM-API 内存泄漏问题定位指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/jsvm-locate-memory-leak)




### 38. OH_JSVM_OpenEnvScope

**语言类型:**  C-API

**易错等级:** 高风险

**使用约束:** 

`JSVM_EXTERN JSVM_Status OH_JSVM_OpenEnvScope(JSVM_Env env,JSVM_EnvScope* result)`和 **OH_JSVM_CloseEnvScope** 接口没有成对调用，如果没有主动Delete造成Reference内存泄漏。

**参考:**

[oh_jsvm_createreference API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-jsvm-h#oh_jsvm_createreference)

[JSVM-API 内存泄漏问题定位指导](https://gitcode.com/openharmony/docs/blob/master/zh-cn/application-dev/napi/jsvm-guidelines.md)










### 39. OH_ArkUI_StyledString_Create

**语言类型:**  C-API

**易错等级:** 低

**使用约束:** 

通过 `ArkUI_StyledString* OH_ArkUI_StyledString_Create(OH_Drawing_TypographyStyle* style, OH_Drawing_FontCollection* collection)` 创建指向 `ArkUI_StyledString`对象的指针, 创建后的`ArkUI_StyledString` 需要显示调用 **OH_ArkUI_StyledString_Destroy** 进行释放，否则造成内存泄漏

**参考**:

[OH_ArkUI_StyledString_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-styled-string-h#oh_arkui_styledstring_create)

[Text组件的文本绘制与显示](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ndk-styled-string)




### 40. OH_ArkUI_NodeAdapter_Create

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

该接口 `ArkUI_NodeAdapterHandle OH_ArkUI_NodeAdapter_Create()` 会创建创建组件适配器对象，当对象生命周期结束时，需要主动调用 **void OH_ArkUI_NodeAdapter_Dispose(ArkUI_NodeAdapterHandle handle)** 进行销毁，否则造成内存泄漏

**参考**:

[OH_ArkUI_NodeAdapter_Create API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-node-h#oh_arkui_nodeadapter_create)

[NodeAdapter 实现懒加载适配器](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ndk-loading-long-list)





### 41. OH_ArkUI_SurfaceHolder_Create

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

该接口 `OH_ArkUI_SurfaceHolder* OH_ArkUI_SurfaceHolder_Create(ArkUI_NodeHandle node)` 创建XComponent组件的[OH_ArkUI_SurfaceHolder](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/component-native-xcomponent-oh-arkui-surfaceholder)对象。

**开发者需要主动调用` void OH_ArkUI_SurfaceHolder_Dispose(OH_ArkUI_SurfaceHolder* surfaceHolder)`销毁OH_ArkUI_SurfaceHolder对象**

**参考**:

[OH_ArkUI_SurfaceHolder_Create API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-interface-xcomponent-h#oh_arkui_surfaceholder_create)

[OH_ArkUI_SurfaceHolder_Dispose API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-interface-xcomponent-h#oh_arkui_surfaceholder_dispose)




### 42. OH_ArkUI_SurfaceCallback_Create

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

该接口 `OH_ArkUI_SurfaceCallback* OH_ArkUI_SurfaceCallback_Create()` 创建[OH_ArkUI_SurfaceCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/mponent-native-xcomponent-oh-arkui-surfacecallback)对象

**开发者需要主动调用` void OH_ArkUI_SurfaceCallback_Dispose(OH_ArkUI_SurfaceCallback* callback)`销毁[OH_ArkUI_SurfaceCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/mponent-native-xcomponent-oh-arkui-surfacecallback)对象**

**参考**:

[OH_ArkUI_SurfaceCallback_Create API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-interface-xcomponent-h#oh_arkui_surfacecallback_create)

[OH_ArkUI_SurfaceHolder_Dispose API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-interface-xcomponent-h#oh_arkui_surfaceholder_dispose)




### 43. OH_ArkUI_XComponent_Initialize

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

该接口 `int32_t OH_ArkUI_XComponent_Initialize(ArkUI_NodeHandle node)` 初始化XComponent组件持有的Surface

**开发者需要主动调用` int32_t OH_ArkUI_XComponent_Finalize(ArkUI_NodeHandle node)`销毁XComponent组件持有的Surface**

**参考**:

[OH_ArkUI_XComponent_Initialize API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-interface-xcomponent-h#oh_arkui_xcomponent_initialize)

[OH_ArkUI_XComponent_Finalize API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-interface-xcomponent-h#oh_arkui_xcomponent_finalize)








### 44. OH_PixelmapNative_CreatePixelmap

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

通过此接口可以`Image_ErrorCode OH_PixelmapNative_CreatePixelmap(uint8_t *data, size_t dataLength, OH_Pixelmap_InitializationOptions *options, OH_PixelmapNative **pixelmap)`创建PixelMap,**当OH_PixelmapNative不再需要时，需要主动调用OH_PixelmapNative_Destroy或者使用OH_PixelmapNative_Release进行释放, 推荐使用OH_PixelmapNative_Destroy**



**参考**:

[OH_PixelmapNative_CreatePixelmap API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapnative_createpixelmap)

[OH_PixelmapNative_Destroy API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapnative_destroy)

[OH_PixelmapNative_Release API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapnative_release)




### 45. OH_PixelmapImageInfo_Create

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

通过此接口可以`Image_ErrorCode OH_PixelmapImageInfo_Create(OH_Pixelmap_ImageInfo **info)`创建OH_Pixelmap_ImageInfo指针,**当OH_Pixelmap_ImageInfo 不再需要时，需要主动调用OH_PixelmapImageInfo_Release进行释放**



**参考**:

[OH_PixelmapImageInfo_Create API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapimageinfo_create)

[OH_PixelmapImageInfo_Release API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapimageinfo_release)




### 46. OH_PictureNative_CreatePicture

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

通过此接口可以`Image_ErrorCode OH_PictureNative_CreatePicture(OH_PixelmapNative *mainPixelmap, OH_PictureNative **picture)`创建OH_PictureNative 指针,**当OH_PictureNative 不再需要时，需要主动调用OH_PictureNative_Release 进行释放**



**参考**:

[OH_PictureNative_CreatePicture API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-picture-native-h#oh_picturenative_createpicture)

[OH_PictureNative_Release API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-picture-native-h#oh_picturenative_release)




### 47. OH_AuxiliaryPictureNative_Create

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

通过此接口可以`Image_ErrorCode OH_AuxiliaryPictureNative_Create(uint8_t *data, size_t dataLength, Image_Size *size,Image_AuxiliaryPictureType type, OH_AuxiliaryPictureNative **auxiliaryPicture)` OH_AuxiliaryPictureNative 指针,**OH_AuxiliaryPictureNative 不再需要时，需要主动调用OH_AuxiliaryPictureNative_Release 进行释放**



**参考**:

[OH_AuxiliaryPictureNative_Create API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-picture-native-h#oh_auxiliarypicturenative_create)

[OH_AuxiliaryPictureNative_Release API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-picture-native-h#oh_auxiliarypicturenative_release)




### 48. OH_AuxiliaryPictureInfo_Create

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

通过此接口`Image_ErrorCode OH_AuxiliaryPictureInfo_Create(OH_AuxiliaryPictureInfo **info)` OH_AuxiliaryPictureInfo  可以创建指针,**OH_AuxiliaryPictureInfo  不再需要时，需要主动调用 OH_AuxiliaryPictureInfo_Release 进行释放**


**参考**:

[OH_AuxiliaryPictureInfo_Create API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-picture-native-h#oh_auxiliarypictureinfo_create)

[OH_AuxiliaryPictureInfo_Release API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-picture-native-h#oh_auxiliarypictureinfo_release)




### 49. OH_PixelmapInitializationOptions_Create

**语言类型:**  C-API

**易错等级:** 低风险

**使用约束:** 

通过此接口`Image_ErrorCode OH_PixelmapInitializationOptions_Create(OH_Pixelmap_InitializationOptions **options)`  可以创建OH_Pixelmap_InitializationOptions 指针,  **当OH_Pixelmap_InitializationOptions不再需要时，需要主动调用OH_PixelmapInitializationOptions_Release进行释放**

**参考**:

[OH_PixelmapInitializationOptions_Create API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapinitializationoptions_create)

[OH_PixelmapInitializationOptions_Release API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-pixelmap-native-h#oh_pixelmapinitializationoptions_release)






### 50. OH_ArkWeb_CreateResponse

**语言类型:**  C-API

**易错等级:** 高风险

**使用约束:** 

通过`void OH_ArkWeb_CreateResponse(ArkWeb_Response** response)`会为被拦截的请求创建一个ArkWeb_Response对象。**当业务结束时需要主动调用`void OH_ArkWeb_DestroyResponse(ArkWeb_Response* response)`进行销毁。**

**参考**
[OH_ArkWeb_CreateResponse](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkweb-scheme-handler-h#oh_arkweb_createresponse)
[OH_ArkWeb_DestroyResponse](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkweb-scheme-handler-h#oh_arkweb_destroyresponse)







### 51. aki-PostTask 

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






## API索引

### 按首字母排序

- OH_ArkUI_NodeAdapter_Create
- OH_ArkUI_StyledString_Create
- OH_ArkUI_SurfaceCallback_Create
- OH_ArkUI_SurfaceHolder_Create
- OH_ArkUI_XComponent_Initialize
- OH_ArkWeb_CreateResponse
- OH_AuxiliaryPictureInfo_Create
- OH_AuxiliaryPictureNative_Create
- OH_ConsumerSurface_Create
- OH_Drawing_CanvasCreate
- OH_Drawing_CanvasCreateWithPixelMap
- OH_Drawing_CreateFontCollection 
- OH_Drawing_CreateFontDescriptor
- OH_Drawing_CreateFontParser
- OH_Drawing_CreateSharedFontCollection
- OH_Drawing_CreateTextShadow
- OH_Drawing_CreateTextStyle
- OH_Drawing_CreateTextTab
- OH_Drawing_CreateTypography
- OH_Drawing_CreateTypographyHandler
- OH_Drawing_CreateTypographyStyle
- OH_Drawing_FontCreate
- OH_Drawing_GetSystemFontConfigInfo
- OH_Drawing_TextBlobBuilderCreate
- OH_Drawing_TextBlobBuilderMake
- OH_Drawing_TextBlobCreateFromPosText
- OH_Drawing_TextBlobCreateFromString
- OH_Drawing_TextBlobCreateFromText
- OH_Filter_CreateEffect
- OH_IPCParcel_Create
- OH_JSVM_CreateReference
- OH_JSVM_OpenEnvScope
- OH_NativeBuffer_Alloc
- OH_NativeBuffer_Map
- OH_NativeBuffer_Reference
- OH_NativeImage_AcquireNativeWindowBuffer
- OH_NativeImage_Create 
- OH_NativeVSync_Create
- OH_NativeWindow_CreateNativeWindowBufferFromNativeBuffer
- OH_NativeWindow_CreateNativeWindowFromSurfaceId
- OH_NativeWindow_GetLastFlushedBufferV2
- OH_NativeWindow_GetLastFlushedBuffer（API12废弃）
- OH_NativeWindow_NativeObjectReference
- OH_NativeWindow_NativeWindowRequestBuffer
- OH_NativeWindow_ReadFromParcel 
- OH_PictureNative_CreatePicture
- OH_PixelmapImageInfo_Create
- OH_PixelmapInitializationOptions_Create
- OH_PixelmapNative_CreatePixelmap
- aki-PostTask 
- napi_create_reference 