# ASCF 元服务睫毛图标生成工具

元服务上架需要提交符合华为规范的睫毛图标。本工具基于 `@atomicservice/as-icon-generator` 实现，自动完成圆形裁切和睫毛边框渲染，生成符合规范的应用图标。

## 输出规格

| 文件 | 尺寸 | 用途 |
|------|------|------|
| 应用图标 | 512×512 PNG | 替换 `AppScope/resources/base/media/app_icon.png` |
| AGC 图标 | 216×216 PNG | AppGallery Connect 上传时使用 |

两种图标均为圆形裁切，自动提取源图主色调生成睫毛边框。

## 安装依赖

工具位于 skill 的 `scripts/cli/` 目录，首次使用需安装依赖（只需一次）：

```bash
cd <skill根目录>/scripts/cli
pnpm install   # 或 npm install
```

## 使用方法

### 同时生成应用图标和 AGC 图标（推荐）

```bash
node <skill根目录>/scripts/cli/cli.js generate-as-icon \
  -i image-1024x1024.png \
  -o AppScope/resources/base/media/app_icon.png \
  --agc app_icon_agc.png
```

### 仅生成应用图标

```bash
node <skill根目录>/scripts/cli/cli.js generate-as-icon \
  -i source.png \
  -o AppScope/resources/base/media/app_icon.png
```

### 覆盖已有文件

```bash
node <skill根目录>/scripts/cli/cli.js generate-as-icon \
  -i source.png \
  -o AppScope/resources/base/media/app_icon.png \
  --agc app_icon_agc.png \
  --force
```

## 参数说明

| 参数 | 必填 | 说明 |
|------|------|------|
| `-i, --input <path>` | 是 | 源图路径，推荐 1024×1024 PNG，分辨率越高效果越好 |
| `-o, --output <path>` | 是 | 输出 512×512 应用图标路径 |
| `--agc <path>` | 否 | 输出 216×216 AGC 图标路径 |
| `--force` | 否 | 覆盖已有输出文件（默认 false，已有文件时报错） |

## 上架替换路径

生成完成后：

1. 将 512×512 图标放到 `AppScope/resources/base/media/app_icon.png`
2. AGC 图标在 AppGallery Connect 控制台上传元服务时使用

## 常见错误

| 错误信息 | 原因 | 解决方案 |
|----------|------|----------|
| `Input file not found` | 源图路径不存在 | 检查 `-i` 参数路径是否正确 |
| `Output file already exists` | 输出文件已存在 | 加 `--force` 参数覆盖 |
| `Cannot find module '@napi-rs/canvas'` | 依赖未安装 | 在 `scripts/cli/` 目录运行 `pnpm install` |
