# Image 组件使用规范

## 概述

Image 组件用于显示图片资源，支持多种图片格式和加载方式。

## 接口

```typescript
Image(src: string | PixelMap | Resource | DrawableDescriptor): ImageAttribute
```

**参数说明**：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| src | string \| PixelMap \| Resource \| DrawableDescriptor | 是 | 图片资源 |

**图片资源路径**：

| 方式 | 示例 | 说明 |
|------|------|------|
| 本地资源 | $r('app.media.icon') | 引用 resources/base/media 下的资源 |
| 原始文件 | $rawfile('icon.png') | 引用 resources/rawfile 下的资源 |
| 网络图片 | 'https://example.com/image.png' | 网络URL（需网络权限） |
| PixelMap | pixelMap | 像素图对象 |
| base64 | 'data:image/png;base64,...' | Base64编码图片 |

## 子组件

Image 不支持子组件。

## 属性

### 图片显示属性

| 属性 | 参数类型 | 说明 |
|------|----------|------|
| objectFit(value: ImageFit) | ImageFit | 图片缩放类型 |
| objectRepeat(value: ImageRepeat) | ImageRepeat | 图片重复方式 |
| interpolation(value: ImageInterpolation) | ImageInterpolation | 图片插值（缩放质量） |
| renderMode(value: ImageRenderMode) | ImageRenderMode | 渲染模式 |
| sourceSize(value: { width: number; height: number }) | object | 解码尺寸 |

**ImageFit 枚举**：

| 值 | 说明 |
|----|------|
| Contain | 保持宽高比缩放，完整显示 |
| Cover | 保持宽高比缩放，填满容器，可能裁剪 |
| Auto | 自适应 |
| Fill | 拉伸填满，不保持宽高比 |
| ScaleDown | 缩放但不放大小于原图 |
| None | 保持原始尺寸 |

**ImageInterpolation 枚举**：

| 值 | 说明 |
|----|------|
| None | 不使用插值 |
| Low | 低质量插值 |
| Medium | 中质量插值 |
| High | 高质量插值 |

**ImageRenderMode 枚举**：

| 值 | 说明 |
|----|------|
| Original | 按原图渲染 |
| Template | 渲染为模板图片（可着色） |

### 图片加载属性

| 属性 | 参数类型 | 说明 |
|------|----------|------|
| alt(value: string \| PixelMap \| Resource) | string \| PixelMap \| Resource | 加载失败时显示的占位图 |
| matchTextDirection(value: boolean) | boolean | 是否匹配文本方向 |
| fitOriginalSize(value: boolean) | boolean | 是否适应原图尺寸 |
| fillColor(value: ResourceColor) | ResourceColor | 填充颜色（仅 SVG/模板图片） |
| autoResize(value: boolean) | boolean | 是否自动调整大小 |

### 图片变换属性

| 属性 | 参数类型 | 说明 |
|------|----------|------|
| colorFilter(value: ColorFilter) | ColorFilter | 颜色滤镜 |
| drawableRect(value: { x: number; y: number; width: number; height: number }) | object | 绘制区域 |

## 事件

| 事件 | 参数 | 说明 |
|------|------|------|
| onComplete(callback: () => void) | - | 图片加载完成 |
| onError(callback: () => void) | - | 图片加载失败 |
| onFinish(callback: () => void) | - | 加载完成（成功或失败） |

## 使用示例

### 基础用法

```typescript
@Entry
@Component
struct ImageExample {
  build() {
    Column({ space: 10 }) {
      // 本地资源图片
      Image($r('app.media.icon'))
        .width(100)
        .height(100)

      // 网络图片
      Image('https://example.com/image.png')
        .width(100)
        .height(100)

      // 原始文件
      Image($rawfile('icon.png'))
        .width(100)
        .height(100)
    }
  }
}
```

### 图片缩放模式

```typescript
Column({ space: 10 }) {
  // Contain: 完整显示
  Image($r('app.media.photo'))
    .width(100)
    .height(80)
    .objectFit(ImageFit.Contain)
    .backgroundColor('#F0F0F0')

  // Cover: 填满容器
  Image($r('app.media.photo'))
    .width(100)
    .height(80)
    .objectFit(ImageFit.Cover)
    .backgroundColor('#F0F0F0')

  // Fill: 拉伸填满
  Image($r('app.media.photo'))
    .width(100)
    .height(80)
    .objectFit(ImageFit.Fill)
    .backgroundColor('#F0F0F0')
}
```

### 加载状态处理

```typescript
@Entry
@Component
struct ImageLoading {
  @State imageSrc: string = 'https://example.com/image.png'

  build() {
    Column() {
      Image(this.imageSrc)
        .width(200)
        .height(200)
        .objectFit(ImageFit.Cover)
        .alt($r('app.media.placeholder'))  // 加载失败占位图
        .onComplete(() => {
          console.log('图片加载完成')
        })
        .onError(() => {
          console.log('图片加载失败')
        })
    }
  }
}
```

### 图片插值（提升缩放质量）

```typescript
Row({ space: 20 }) {
  // 低质量
  Image($r('app.media.photo'))
    .width(100)
    .objectFit(ImageFit.Cover)
    .interpolation(ImageInterpolation.Low)

  // 高质量
  Image($r('app.media.photo'))
    .width(100)
    .objectFit(ImageFit.Cover)
    .interpolation(ImageInterpolation.High)
}
```

### 模板图片着色

```typescript
// SVG 图标着色
Image($r('app.media.icon'))
  .width(24)
  .height(24)
  .renderMode(ImageRenderMode.Template)
  .fillColor('#007DFF')  // 设置颜色
```

### 设置解码尺寸

```typescript
// 指定解码尺寸，优化内存
Image($r('app.media.large_photo'))
  .width(200)
  .height(200)
  .sourceSize({ width: 200, height: 200 })  // 按显示尺寸解码
```

### 圆角图片

```typescript
// 方式一：使用 borderRadius
Image($r('app.media.avatar'))
  .width(80)
  .height(80)
  .borderRadius(40)

// 方式二：使用 clip
Image($r('app.media.avatar'))
  .width(80)
  .height(80)
  .clip(new Circle({ width: 80, height: 80 }))
```

### 图片滤镜

```typescript
Image($r('app.media.photo'))
  .width(200)
  .height(200)
  .colorFilter(ColorFilter.createBlendColorFilter(
    colorfx::filter::BlendColorFilter(
      Color.BLACK,
      BlendMode.SRC_IN
    )
  ))
```

## 最佳实践

1. **根据场景选择 objectFit**：
   - 头像：`Cover` + 圆角
   - 横幅广告：`Cover`
   - 商品展示：`Contain`
   - 背景图：`Cover`

2. **性能优化**：
```typescript
// 根据显示尺寸设置解码尺寸
Image(largeImage)
  .width(100)
  .height(100)
  .sourceSize({ width: 100, height: 100 })  // 避免解码大图
```

3. **网络图片加载**：
```typescript
// 添加占位图和错误处理
Image(networkUrl)
  .alt($r('app.media.placeholder'))
  .onError(() => {
    // 记录错误或显示重试
  })
```

4. **SVG 图标**：
```typescript
// SVG 使用 Template 模式可动态着色
Image($r('app.media.icon'))
  .renderMode(ImageRenderMode.Template)
  .fillColor($r('app.color.primary'))
```

## 注意事项

1. 网络图片需要在 module.json5 中声明网络权限
2. 大图片应设置 sourceSize 优化内存
3. PNG 图片注意透明通道处理
4. SVG 图片推荐使用 Template 渲染模式以便着色
5. 加载网络图片时建议设置占位图