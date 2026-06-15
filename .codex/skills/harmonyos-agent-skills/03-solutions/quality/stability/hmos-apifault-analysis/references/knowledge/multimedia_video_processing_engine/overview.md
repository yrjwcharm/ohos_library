# multimedia_video_processing_engine

## 模块职责

VPE (Video Processing Engine) 是系统的视频/图像处理引擎，提供细节增强 (Detail Enhancement)、对比度增强 (Contrast Enhancement)、AI HDR 增强、色彩空间转换 (Color Space Conversion)、HDR 图像合成/分解 (Composition/Decomposition)、动态元数据生成 (Metadata Generation)、视频可变帧率等基础算法能力。该模块为转码、分享、显示后处理等场景提供统一的底层算法支持，覆盖图像和视频两类处理管线。

模块提供三层 API：
- **JS/TS API** (`@ohos.multimedia.videoProcessingEngine`)：面向应用开发者，提供 ImageProcessor 接口，支持细节增强（同步/异步）。
- **C API**：分图像处理 (`libimage_processing.so`) 和视频处理 (`libvideo_processing.so`) 两套接口，提供色彩空间转换、元数据生成、合成/分解、细节增强等完整能力。
- **内部算法 API**：基于插件化框架（Extension Manager），算法通过 Extension 机制（如 Skia 插件）动态加载。

## 目录结构

```
multimedia_video_processing_engine/
├── framework/                         # 框架层实现
│   ├── algorithm/                     # 算法实现
│   │   ├── aihdr_enhancer/            # AI HDR 图像增强
│   │   ├── aihdr_enhancer_video/      # AI HDR 视频增强
│   │   ├── colorspace_converter/      # 图像色彩空间转换
│   │   ├── colorspace_converter_display/ # 显示色彩空间转换
│   │   ├── colorspace_converter_video/   # 视频色彩空间转换
│   │   ├── common/                    # 算法公共代码
│   │   ├── contrast_enhancer/         # 对比度增强
│   │   ├── detail_enhancer/           # 图像细节增强
│   │   ├── detail_enhancer_video/     # 视频细节增强
│   │   ├── extension_manager/         # 插件管理器
│   │   ├── extensions/                # 算法插件 (Skia 等)
│   │   ├── metadata_generator/        # 图像元数据生成
│   │   ├── metadata_generator_video/  # 视频元数据生成
│   │   └── video_variable_refresh_rate/ # 视频可变帧率
│   ├── capi/                          # C API 实现
│   │   ├── image_processing/          # 图像处理 CAPI
│   │   └── video_processing/          # 视频处理 CAPI
│   └── dfx/                           # DFX 诊断功能
├── interfaces/                        # 接口层
│   ├── inner_api/                     # 内部 API 头文件
│   └── kits/                          # 开发者 API
│       ├── c/                         # C API 声明
│       ├── js/                        # JS/TS NAPI 桥接
│       └── taihe/                     # ArkTS 绑定
├── services/                          # 服务层 (IPC client/server)
├── test/                              # 测试代码
└── error_doc/                         # 错误码文档
```

## 核心文件

- `interfaces/kits/c/image_processing.h` — 图像处理 C API 函数声明（OH_ImageProcessing_* 系列）
- `interfaces/kits/c/image_processing_types.h` — 图像处理错误码、类型定义、质量等级枚举
- `interfaces/kits/c/video_processing.h` — 视频处理 C API 函数声明（OH_VideoProcessing_* 系列）
- `interfaces/kits/c/video_processing_types.h` — 视频处理错误码、状态枚举、回调类型定义
- `interfaces/kits/js/native_module_ohos_imageprocessing.cpp` — NAPI 模块注册入口，模块名 multimedia.videoProcessingEngine
- `interfaces/kits/js/detail_enhance_napi_formal.h` — VpeNapi 类声明，定义 NAPI 桥接函数
- `interfaces/inner_api/algorithm_errors.h` — 内部算法错误码定义（VPE_ALGO_ERR_* 系列）
- `interfaces/inner_api/algorithm_common.h` — 内部算法公共接口
- `interfaces/inner_api/detail_enhancer_common.h` — 细节增强算法公共参数
- `interfaces/inner_api/contrast_enhancer_common.h` — 对比度增强算法公共参数
- `framework/capi/image_processing/image_processing.cpp` — 图像处理 CAPI 实现（环境初始化、创建/销毁、处理函数分发）
- `framework/capi/image_processing/image_processing_factory.cpp` — 图像处理工厂，按 type 创建对应 Native 实现
- `framework/capi/image_processing/image_processing_impl.cpp` — OH_ImageProcessing 类实现
- `framework/capi/image_processing/detail_enhancer/detail_enhancer_image_native.cpp` — 图像细节增强 Native 实现
- `framework/capi/image_processing/colorspace_converter/colorspace_converter_image_native.cpp` — 图像色彩空间转换 Native 实现
- `framework/capi/image_processing/metadata_generator/metadata_generator_image_native.cpp` — 图像元数据生成 Native 实现
- `framework/capi/video_processing/video_processing.cpp` — 视频处理 CAPI 实现
- `framework/capi/video_processing/video_processing_factory.cpp` — 视频处理工厂，按 type 创建对应 Native 实现
- `framework/capi/video_processing/video_processing_impl.cpp` — OH_VideoProcessing 类实现
- `framework/capi/video_processing/detail_enhancer/detail_enhancer_video_native.cpp` — 视频细节增强 Native 实现
- `framework/capi/video_processing/colorspace_converter/colorSpace_converter_video_native.cpp` — 视频色彩空间转换 Native 实现
- `framework/capi/video_processing/metadata_generator/metadata_generator_video_native.cpp` — 视频元数据生成 Native 实现
- `framework/capi/image_processing/detail_enhance_napi_formal.cpp` — NAPI 桥接层实现（VpeNapi 类）
- `error_doc/errorcode-videoprocessingengine.md` — 错误码详细文档（含可能原因和处理步骤）
