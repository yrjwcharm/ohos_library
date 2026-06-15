# 预览流 stride 处理指南

来源：[华为开发者文档 - 相机预览花屏解决方案](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-deal-stride-solution)

## 概念速查

| 概念 | 说明 |
| --- | --- |
| stride | 图像一行数据在内存中实际占用的字节数。出于内存对齐和读取效率考虑，通常大于图像 width。 |
| rowStride | 通过 `image.Component.rowStride` 获取的实际 stride 值。不同平台底层上报的值不同，不可硬编码。 |
| 花屏原因 | 按 `width × height` 解析图像时，使用了每行末尾 `stride − width` 个无效填充字节，导致像素错位、画面堆叠。 |
| ImageReceiver | 通过 `imageArrival` 事件监听预览流每帧数据的组件，用于获取帧数据做二维码识别、人脸识别等二次处理。 |
| PixelMap | 图像像素映射对象，通过 `image.createPixelMap()` 从 buffer 创建，用于 Image 组件送显。 |
| NV21 | 一种 YUV 格式：先存储 Y 分量（`height` 行），再交错存储 VU 分量（`height/2` 行），总字节数为 `width × height × 1.5`。 |

---

## 问题背景

开发者使用相机服务时，若仅用于预览流展示，通常使用 XComponent 组件实现。若需获取每帧图像做二次处理（如二维码识别或人脸识别），可通过 `ImageReceiver` 的 `imageArrival` 事件监听预览流每帧数据并解析图像内容。

在解析图像内容时，如果未考虑 stride，直接使用 `width × height` 读取图像内容去解析，会导致相机预览异常，出现**花屏堆叠**现象。

> **排查提示**：当预览流图像 buffer 获取后出现花屏堆叠状，需排查 stride 与 width 是否不一致，并对 stride 进行无效像素的去除处理。

---

## stride 内存布局

在计算机图形学和图像处理中，stride 指图像一行数据在内存中实际占用的字节数。出于内存对齐和提高读取效率的考虑，stride 通常大于图像的 width。

以 width=3, height=3, stride=4 的图像为例：

- 实际分配内存：`stride × height` = 4 × 3 = 12 字节
- 开发者预期的内存：`width × height` = 3 × 3 = 9 字节

每行末尾有 `stride − width`（此处为 1）个无效填充字节。如果按 width 读取，会将这些无效字节错误地当作像素数据，导致花屏。

**获取方式**：通过预览流帧数据的返回值 `image.Component.rowStride` 获取 stride。

---

## 使用场景

| 场景 | 触发条件 | 推荐用法 | 不处理的后果 |
| --- | --- | --- | --- |
| ImageReceiver 二次处理 | 获取每帧做二维码识别或人脸识别 | 运行时获取 `rowStride`，判断是否等于 `width` | 预览流花屏堆叠 |
| 跨平台适配 | 不同设备/平台 stride 值不同 | 不硬编码 width，运行时动态获取 stride | 某些平台花屏，某些正常 |
| PixelMap 创建送显 | 从帧数据创建 PixelMap 传给 Image 组件 | 先处理 stride 再创建 PixelMap | 图像错位或创建异常 |

---

## 官方 API

| API | 说明 |
| --- | --- |
| `component.rowStride` | 获取图像每行的实际 stride 值 |
| `component.byteBuffer` | 获取帧数据的原始 byteBuffer |
| `image.createPixelMap(buffer, options)` | 从 buffer 创建 PixelMap |
| `pixelMap.cropSync({ size, x, y })` | 同步裁剪 PixelMap 到指定区域 |
| `pixelMap.release()` | 释放 PixelMap 资源 |
| `nextImage.release()` | 释放 Image 帧资源（每次 readNextImage 后必须调用） |
| `image.ImageReceiver.on('imageArrival', callback)` | 监听帧数据到达事件 |

---

## 处理方案

以 1080 × 1080 分辨率、stride = 1088 的典型场景为例。

### 反例：未处理 stride

直接按 width 创建 PixelMap，未处理 stride，使用了无效像素数据。

```typescript
import { image } from '@kit.ImageKit';
import { BusinessError } from '@kit.BasicServicesKit';

function onImageArrival(receiver: image.ImageReceiver): void {
  receiver.on('imageArrival', () => {
    receiver.readNextImage((err: BusinessError, nextImage: image.Image) => {
      if (err || nextImage === undefined) {
        console.error(`readNextImage failed! error: ${err.code}`);
        return;
      }
      if (nextImage) {
        nextImage.getComponent(image.ComponentType.JPEG, async (_err, component: image.Component) => {
          let width: number = 1080;
          let height: number = 1080;
          let pixelMap: image.PixelMap | undefined = await image.createPixelMap(component.byteBuffer, {
            size: { height: height, width: width },
            srcPixelFormat: image.PixelMapFormat.NV21
          });
          AppStorage.setOrCreate('stridePixel', pixelMap);
          nextImage.release();
        });
      }
    });
  });
}
```

### 正例一：buffer 拷贝去除 stride

核心思路：逐行从 `component.byteBuffer` 中拷贝有效像素（每行前 width 字节）到新的 dstArr，然后按 `width × height` 创建 PixelMap。NV21 格式需处理 `height × 1.5` 行（前 height 行为 Y 分量，后 height/2 行为 VU 交错分量）。

```typescript
import { image } from '@kit.ImageKit';
import { BusinessError } from '@kit.BasicServicesKit';

function onImageArrival(receiver: image.ImageReceiver): void {
  receiver.on('imageArrival', () => {
    receiver.readNextImage((err: BusinessError, nextImage: image.Image) => {
      if (err || nextImage === undefined) {
        console.error(`readNextImage failed! error: ${err.code}`);
        return;
      }
      if (nextImage) {
        nextImage.getComponent(image.ComponentType.JPEG, async (_err, component: image.Component) => {
          let width: number = 1080;
          let height: number = 1080;
          let stride: number = component.rowStride;

          if (stride === width) {
            let pixelMap: image.PixelMap | undefined = await image.createPixelMap(component.byteBuffer, {
              size: { height: height, width: width },
              srcPixelFormat: image.PixelMapFormat.NV21
            });
            AppStorage.setOrCreate('stridePixel', pixelMap);
          } else {
            const dstBufferSize: number = width * height * 1.5;
            const dstArr: Uint8Array = new Uint8Array(dstBufferSize);
            for (let j = 0; j < height * 1.5; j++) {
              const srcBuf: Uint8Array = new Uint8Array(component.byteBuffer, j * stride, width);
              dstArr.set(srcBuf, j * width);
            }
            let pixelMap: image.PixelMap | undefined = await image.createPixelMap(dstArr.buffer, {
              size: { height: height, width: width },
              srcPixelFormat: image.PixelMapFormat.NV21
            });
            AppStorage.setOrCreate('stridePixel', pixelMap);
          }
          nextImage.release();
        });
      }
    });
  });
}
```

### 正例二：cropSync 裁剪去除 stride

核心思路：先按 `stride × height` 创建 PixelMap（包含填充字节），再调用 `cropSync()` 裁剪出 `width × height` 的有效区域。

```typescript
import { image } from '@kit.ImageKit';
import { BusinessError } from '@kit.BasicServicesKit';

function onImageArrival(receiver: image.ImageReceiver): void {
  receiver.on('imageArrival', () => {
    receiver.readNextImage((err: BusinessError, nextImage: image.Image) => {
      if (err || nextImage === undefined) {
        console.error(`readNextImage failed! error: ${err.code}`);
        return;
      }
      if (nextImage) {
        nextImage.getComponent(image.ComponentType.JPEG, async (_err, component: image.Component) => {
          let width: number = 1080;
          let height: number = 1080;
          let stride: number = component.rowStride;

          if (stride === width) {
            let pixelMap: image.PixelMap | undefined = await image.createPixelMap(component.byteBuffer, {
              size: { height: height, width: width },
              srcPixelFormat: image.PixelMapFormat.NV21
            });
            AppStorage.setOrCreate('stridePixel', pixelMap);
          } else {
            let pixelMap: image.PixelMap | undefined = await image.createPixelMap(component.byteBuffer, {
              size: { height: height, width: stride },
              srcPixelFormat: 8
            });
            try {
              pixelMap.cropSync({
                size: { width: width, height: height },
                x: 0,
                y: 0
              });
              let pixelBefore: image.PixelMap | undefined = AppStorage.get('stridePixel');
              await pixelBefore?.release();
              AppStorage.setOrCreate('stridePixel', pixelMap);
            } catch (error) {
              let err: BusinessError = error as BusinessError;
              console.warn(`cropSync failed, code=${err.code}, message=${err.message}`);
            }
          }
          nextImage.release();
        });
      }
    });
  });
}
```

---

## 方案对比

| 对比维度 | 正例一 (buffer 拷贝) | 正例二 (cropSync) |
| --- | --- | --- |
| 核心操作 | 逐行拷贝有效像素到新 buffer，再创建 PixelMap | 按 stride 创建 PixelMap 后调用 cropSync 裁剪 |
| 内存开销 | 额外分配 `width × height × 1.5` 的 dstArr | 初始 PixelMap 按 `stride × height` 分配，裁剪后释放 |
| 代码复杂度 | 需要编写逐行拷贝循环，理解 NV21 的 `height × 1.5` 行结构 | 调用系统 API，代码更简洁 |
| 依赖 | 无额外 API 依赖 | 依赖 `pixelMap.cropSync()` 方法 |
| 适用场景 | 需要精确控制像素数据，或需对像素做二次加工 | 快速修复、直接送显的场景 |

---

## 约束

- stride 值因平台而异，**不可硬编码**，必须运行时通过 `component.rowStride` 获取。
- 当 `stride === width` 时可跳过处理，直接使用 `component.byteBuffer` 创建 PixelMap。
- NV21 格式下总字节数为 `width × height × 1.5`，拷贝循环需处理 `height × 1.5` 行。
- 每次 `readNextImage` 获取帧数据后，必须调用 `nextImage.release()` 释放资源。
- cropSync 可能抛异常，需要用 `try...catch` 捕获 `BusinessError`。

---

## 常见问题

### 如何获取相机预览流帧数据？

通过 `image.ImageReceiver` 的 `imageArrival` 事件监听获取底层返回的图像数据。详见双路预览（ArkTS）文档。

### 如何获取预览流图像的 stride 值？

通过预览流帧数据的返回值 `image.Component.rowStride` 获取。

---

## 验证清单

- [ ] `stride === width` 时：直接创建 PixelMap 正常。
- [ ] `stride ≠ width` 时：正例一（buffer 拷贝）能正确去除无效像素。
- [ ] `stride ≠ width` 时：正例二（cropSync）能正确裁剪出有效区域。
- [ ] 每次 `readNextImage` 后调用了 `nextImage.release()`。
- [ ] 不同平台 stride 值已记录并验证。
- [ ] 花屏现象消除，图像行对齐正确。
