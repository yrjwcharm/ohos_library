---
name: kits_graphics2d
description: "HarmonyOS ArkGraphics2D 2D图形能力集使用规范。包含 drawing 绑制、effectKit 特效、colorSpaceManager 色彩空间、displaySync 显示同步等2D图形绑制能力。Use when: (1) 自定义绑制，(2) Canvas绘图，(3) 图像特效，(4) 颜色管理。Triggers: drawing、Canvas、绑定、graphic、effectKit、颜色空间、colorSpace、displaySync、2D图形、自定义渲染。"
user-invocable: false
---

# ArkGraphics2D 2D图形能力集 (kits_graphics2d)

本 skill 覆盖 HarmonyOS **ArkGraphics2D** 2D图形能力集的使用规范。

## 能力列表

| 模块 | 导入方式 | 用途 |
|------|----------|------|
| drawing | @ohos.graphics.drawing | 2D绑制 |
| effectKit | @ohos.effectKit | 图像特效 |
| colorSpaceManager | @ohos.graphics.colorSpaceManager | 颜色空间管理 |
| displaySync | @ohos.graphics.displaySync | 显示同步 |
| common2D | @ohos.graphics.common2D | 2D公共定义 |

## 快速索引

### drawing 基础绑制

```typescript
import drawing from '@ohos.graphics.drawing';

// 创建画布
let canvas = new drawing.Canvas();

// 设置画笔
let pen = new drawing.Pen();
pen.setColor({ alpha: 255, red: 255, green: 0, blue: 0 }); // 红色
pen.setStrokeWidth(5); // 线宽

// 绑制线条
canvas.attachPen(pen);
canvas.drawLine(0, 0, 100, 100);

// 设置画刷（填充）
let brush = new drawing.Brush();
brush.setColor({ alpha: 255, red: 0, green: 255, blue: 0 }); // 绿色

// 绑制矩形
canvas.attachBrush(brush);
canvas.drawRect({ left: 50, top: 50, right: 200, bottom: 200 });

// 绑制圆形
canvas.drawCircle(300, 300, 50);

// 绑制椭圆
canvas.drawOval({ left: 400, top: 100, right: 600, bottom: 200 });

// 绑制圆角矩形
let roundRect = new drawing.RoundRect({ left: 100, top: 400, right: 300, bottom: 500 }, 20, 20);
canvas.drawRoundRect(roundRect);
```

### drawing 路径绑制

```typescript
import drawing from '@ohos.graphics.drawing';

// 创建路径
let path = new drawing.Path();

// 移动起点
path.moveTo(50, 50);

// 画线
path.lineTo(100, 100);
path.lineTo(150, 50);

// 画贝塞尔曲线
path.quadTo(200, 100, 250, 50); // 二次贝塞尔

// 画弧线
path.arcTo(300, 50, 400, 150, 0, 180); // 弧线

// 闭合路径
path.close();

// 绑制路径
let pen = new drawing.Pen();
pen.setColor({ alpha: 255, red: 0, green: 0, blue: 255 });
pen.setStrokeWidth(3);
canvas.attachPen(pen);
canvas.drawPath(path);
```

### drawing 文本绑制

```typescript
import drawing from '@ohos.graphics.drawing';

// 创建字体
let font = new drawing.Font();
font.setSize(24);

// 创建文本样式
let textStyle = new drawing.TextStyle();
textStyle.color = { alpha: 255, red: 0, green: 0, blue: 0 };

// 绑制简单文本
canvas.drawSimpleText('Hello HarmonyOS', 100, 100, font);

// 绑制带样式的文本
let textBlob = drawing.TextBlob.makeFromString('Hello World', font, drawing	TextEncoding.UTF8);
canvas.drawTextBlob(textBlob, 100, 200);
```

### drawing 图片绑制

```typescript
import drawing from '@ohos.graphics.drawing';

// 创建图片
let image = drawing.ImageMakeFromData(pixelMap);

// 绑制图片
canvas.drawImageRect(image,
  { left: 0, top: 0, right: imageWidth, bottom: imageHeight }, // 源区域
  { left: 100, top: 100, right: 300, bottom: 300 } // 目标区域
);

// 绑制缩放图片
canvas.drawImage(image, 100, 100);
```

### drawing 变换操作

```typescript
import drawing from '@ohos.graphics.drawing';

// 平移
canvas.translate(100, 100);

// 旋转
canvas.rotate(45, 200, 200); // 绕 (200, 200) 旋转 45 度

// 缩放
canvas.scale(2, 2); // 放大 2 倍

// 倾斜
canvas.skew(0.5, 0);

// 保存/恢复状态
canvas.save();
// ... 绑制操作
canvas.restore();
```

### drawing 画笔设置

```typescript
import drawing from '@ohos.graphics.drawing';

let pen = new drawing.Pen();

// 设置颜色
pen.setColor({ alpha: 255, red: 128, green: 64, blue: 255 });

// 设置线宽
pen.setStrokeWidth(5);

// 设置抗锯齿
pen.setAntiAlias(true);

// 设置线帽样式
pen.setStrokeCap(drawing.StrokeCap.ROUND_CAP); // 圆形线帽

// 设置连接样式
pen.setStrokeJoin(drawing.StrokeJoin.ROUND_JOIN);

// 设置虚线效果
let dashEffect = new drawing.DashPathEffect([10, 5, 10, 5], 0);
pen.setDashPathEffect(dashEffect);

// 设置滤镜
let filter = new drawing.Filter();
filter.setFilterQuality(drawing.FilterQuality.HIGH);
pen.setFilter(filter);
```

### drawing 渐变填充

```typescript
import drawing from '@ohos.graphics.drawing';

// 创建线性渐变
let linearShader = drawing.Shader.createLinearGradient(
  0, 0, 300, 300,
  [
    { alpha: 255, red: 255, green: 0, blue: 0 },
    { alpha: 255, red: 0, green: 0, blue: 255 }
  ],
  drawing.TileMode.CLAMP
);

let brush = new drawing.Brush();
brush.setShaderEffect(linearShader);
canvas.attachBrush(brush);
canvas.drawRect({ left: 0, top: 0, right: 300, bottom: 300 });

// 创建径向渐变
let radialShader = drawing.Shader.createRadialGradient(
  200, 200, 0, // 起点圆心、半径
  200, 200, 100, // 终点圆心、半径
  [
    { alpha: 255, red: 255, green: 255, blue: 0 },
    { alpha: 0, red: 255, green: 0, blue: 0 }
  ],
  drawing.TileMode.CLAMP
);

brush.setShaderEffect(radialShader);
canvas.drawCircle(200, 200, 100);
```

### effectKit 图像特效

```typescript
import effectKit from '@ohos.effectKit';

// 创建图像滤镜
let effectFilter = effectKit.createEffect(pixelMap);

// 调整亮度
effectFilter.brightness(0.2); // 增加亮度

// 调整对比度
effectFilter.contrast(1.5);

// 调整饱和度
effectFilter.saturation(1.2);

// 模糊效果
effectFilter.blur(5); // 模糊半径

// 锐化
effectFilter.sharpen(0.5);

// 反色
effectFilter.invert();

// 灰度化
effectFilter.grayscale();

// 棕褐色调
effectFilter.sepia();

// 色调调整
effectFilter.hueRotate(90); // 色调旋转 90 度

// 获取处理后的图像
let processedPixelMap = effectFilter.getEffectPixelMap();
```

### effectKit 滤镜组合

```typescript
import effectKit from '@ohos.effectKit';

let filter = effectKit.createEffect(pixelMap);

// 组合多个滤镜
filter
  .brightness(0.1)
  .contrast(1.2)
  .saturation(0.8)
  .blur(2);

// 应用所有效果
let result = filter.getEffectPixelMap();
```

### colorSpaceManager 颜色空间

```typescript
import colorSpaceManager from '@ohos.graphics.colorSpaceManager';

// 获取标准颜色空间
let srgb = colorSpaceManager.getExtendedSRGB();

// 从参数创建颜色空间
let colorSpace = colorSpaceManager.create(
  'MyColorSpace',
  {
    primaries: [0.64, 0.33, 0.30, 0.60, 0.15, 0.06],
    whitePoint: [0.3127, 0.3290],
    gamma: 2.2,
    range: {
      min: 0.0,
      max: 1.0
    }
  }
);

// 颜色空间列表
let spaces = colorSpaceManager.getAllColorSpaces();
spaces.forEach((space) => {
  console.log('Color space: ' + space.getName());
});
```

### displaySync 显示同步

```typescript
import displaySync from '@ohos.graphics.displaySync';

// 创建显示同步器
let sync = displaySync.create();
sync.setExpectedFrameRate(60); // 期望帧率 60fps

// 开始同步
sync.start();

// 监听帧回调
sync.on('frame', (timestamp: number) => {
  // 每帧执行绑制
  drawFrame(timestamp);
});

// 停止同步
sync.stop();

// 获取当前帧率
let frameRate = sync.getFrameRate();
console.log('Current frame rate: ' + frameRate);
```

### drawing 图层操作

```typescript
import drawing from '@ohos.graphics.drawing';

// 创建图层
let layer = new drawing.PictureRecorder();
let recorderCanvas = layer.beginRecording({ left: 0, top: 0, right: 500, bottom: 500 });

// 在图层上绑制
recorderCanvas.drawRect({ left: 0, top: 0, right: 500, bottom: 500 });
// ... 更多绑制

// 结束录制
let picture = layer.finishRecording();

// 绘制图层
canvas.drawPicture(picture);
```

### drawing 矩阵变换

```typescript
import drawing from '@ohos.graphics.drawing';

// 创建矩阵
let matrix = new drawing.Matrix();

// 设置单位矩阵
matrix.setIdentity();

// 设置平移
matrix.setPreTranslate(100, 100);

// 设置旋转
matrix.setPreRotate(45, 0, 0);

// 设置缩放
matrix.setPreScale(2, 2);

// 矩阵乘法
let matrix2 = new drawing.Matrix();
matrix2.setPreTranslate(50, 50);
matrix.multiply(matrix, matrix2);

// 应用矩阵到画布
canvas.setMatrix(matrix);
```

### drawing 裁剪操作

```typescript
import drawing from '@ohos.graphics.drawing';

// 矩形裁剪
canvas.clipRect({ left: 0, top: 0, right: 200, bottom: 200 }, drawing.ClipOp.INTERSECT);

// 路径裁剪
let clipPath = new drawing.Path();
clipPath.addCircle(150, 150, 100);
canvas.clipPath(clipPath, drawing.ClipOp.DIFFERENCE);

// ClipOp 操作
drawing.ClipOp.DIFFERENCE = 0  // 差集
drawing.ClipOp.INTERSECT = 1   // 交集
```

### drawing 混合模式

```typescript
import drawing from '@ohos.graphics.drawing';

// 设置混合模式
let brush = new drawing.Brush();
brush.setBlendMode(drawing.BlendMode.SRC_OVER); // 正常覆盖

// 常用混合模式
drawing.BlendMode.CLEAR        // 清除
drawing.BlendMode.SRC          // 源图像
drawing.BlendMode.DST          // 目标图像
drawing.BlendMode.SRC_OVER     // 源覆盖
drawing.BlendMode.DST_OVER     // 目标覆盖
drawing.BlendMode.SRC_IN       // 源内
drawing.BlendMode.DST_IN       // 目标内
drawing.BlendMode.MULTIPLY     // 正片叠底
drawing.BlendMode.SCREEN       // 滤色
drawing.BlendMode.OVERLAY      // 叠加
drawing.BlendMode.DARKEN       // 变暗
drawing.BlendMode.LIGHTEN      // 变亮
drawing.BlendMode.COLOR_DODGE  // 颜色减淡
drawing.BlendMode.COLOR_BURN   // 颜色加深
```

## 完整示例：自定义View

```typescript
import drawing from '@ohos.graphics.drawing';

@Entry
@Component
struct CustomDrawPage {
  private settings: RenderingContextSettings = new RenderingContextSettings(true);
  private context: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.settings);

  build() {
    Column() {
      Canvas(this.context)
        .width('100%')
        .height(400)
        .onReady(() => {
          this.drawCustomView();
        })
    }
  }

  private drawCustomView(): void {
    // 获取 drawing canvas
    let canvas = this.context.canvas;

    // 设置背景
    let bgBrush = new drawing.Brush();
    bgBrush.setColor({ alpha: 255, red: 240, green: 240, blue: 240 });
    canvas.attachBrush(bgBrush);
    canvas.drawRect({ left: 0, top: 0, right: this.context.width, bottom: this.context.height });

    // 绑制渐变圆形
    let shader = drawing.Shader.createRadialGradient(
      200, 200, 0,
      200, 200, 100,
      [
        { alpha: 255, red: 66, green: 133, blue: 244 },
        { alpha: 255, red: 234, green: 67, blue: 53 }
      ],
      drawing.TileMode.CLAMP
    );
    let circleBrush = new drawing.Brush();
    circleBrush.setShaderEffect(shader);
    canvas.attachBrush(circleBrush);
    canvas.drawCircle(200, 200, 100);

    // 绑制文字
    let font = new drawing.Font();
    font.setSize(32);
    canvas.drawSimpleText('HarmonyOS', 100, 350, font);
  }
}
```

## 最佳实践

### 性能优化

```typescript
// 使用离屏渲染缓存复杂图形
class DrawingCache {
  private cachedImage: drawing.Image | null = null;

  getCachedImage(width: number, height: number): drawing.Image {
    if (this.cachedImage) {
      return this.cachedImage;
    }

    // 创建离屏画布
    let recorder = new drawing.PictureRecorder();
    let canvas = recorder.beginRecording({ left: 0, top: 0, right: width, bottom: height });

    // 绑制复杂图形
    this.drawComplexGraphics(canvas);

    this.cachedImage = recorder.finishRecordingAsImage();
    return this.cachedImage;
  }

  invalidate(): void {
    this.cachedImage = null;
  }
}
```

## 注意事项

1. **内存管理**：及时释放不再使用的图像资源
2. **主线程绘图**：复杂绘图可能阻塞主线程，考虑使用 TaskPool
3. **抗锯齿**：启用抗锯齿会增加性能开销
4. **颜色空间**：注意不同颜色空间的转换
5. **帧率控制**：使用 displaySync 确保流畅动画