---
name: kits_media
description: "HarmonyOS MediaKit、AudioKit、ImageKit、CameraKit 媒体能力集使用规范。包含音视频播放录制、图片处理、相机等功能。Use when: (1) 播放音视频，(2) 录制音视频，(3) 图片编解码，(4) 相机功能。Triggers: 音频、视频、播放器、录制、相机、图片处理、audio、media、camera、image、@ohos.multimedia。"
user-invocable: false
---

# MediaKit 媒体能力集 (kits_media)

本 skill 覆盖 HarmonyOS **MediaKit**、**AudioKit**、**ImageKit**、**CameraKit** 媒体能力集的使用规范。

## 能力列表

| 模块 | 导入方式 | 用途 |
|------|----------|------|
| media | @ohos.multimedia.media | 音视频播放/录制 |
| audio | @ohos.multimedia.audio | 音频管理 |
| image | @ohos.multimedia.image | 图片编解码 |
| camera | @ohos.multimedia.camera | 相机功能 |
| cameraPicker | @ohos.multimedia.cameraPicker | 相机选择器 |

## 快速索引

### 音频播放

```typescript
import media from '@ohos.multimedia.media';

// 创建音频播放器
let audioPlayer = await media.createAVPlayer();

// 设置播放源
audioPlayer.url = '/data/audio/test.mp3';

// 设置状态变化回调
audioPlayer.on('stateChange', (state: string) => {
  console.log('Player state: ' + state);
  if (state === 'prepared') {
    audioPlayer.play();  // 准备好后开始播放
  }
});

// 准备播放
await audioPlayer.prepare();

// 播放控制
audioPlayer.play();      // 播放
audioPlayer.pause();     // 暂停
audioPlayer.stop();      // 停止
audioPlayer.reset();     // 重置
audioPlayer.release();   // 释放资源

// 进度控制
audioPlayer.on('timeUpdate', (time: number) => {
  console.log('Current time: ' + time);
});
audioPlayer.seek(10000);  // 跳转到 10 秒位置

// 设置音量
audioPlayer.setVolume(0.5);  // 0.0 - 1.0
```

### 视频播放

```typescript
import media from '@ohos.multimedia.media';

// 创建视频播放器
let videoPlayer = await media.createAVPlayer();

// 设置显示surface
videoPlayer.surfaceId = surfaceId;  // 从XComponent获取

// 设置视频源
videoPlayer.url = '/data/video/test.mp4';

// 状态监听
videoPlayer.on('stateChange', async (state: string) => {
  if (state === 'prepared') {
    await videoPlayer.play();
  }
});

await videoPlayer.prepare();

// 视频尺寸变化
videoPlayer.on('videoSizeChange', (width: number, height: number) => {
  console.log(`Video size: ${width}x${height}`);
});
```

### 音频录制

```typescript
import media from '@ohos.multimedia.media';

// 创建音频录制器
let audioRecorder = await media.createAVRecorder();

// 配置录制参数
let config: media.AVRecorderConfig = {
  audioSourceType: media.AudioSourceType.AUDIO_SOURCE_TYPE_MIC,
  profile: {
    audioBitrate: 48000,
    audioChannels: 2,
    audioCodec: media.CodecMimeType.AUDIO_AAC,
    audioSampleRate: 48000,
    fileFormat: media.ContainerFormatType.CFT_MPEG_4A
  },
  url: 'fd://35'  // 文件描述符
};

await audioRecorder.prepare(config);
await audioRecorder.start();

// 录制一段时间后停止
setTimeout(async () => {
  await audioRecorder.stop();
  await audioRecorder.release();
}, 10000);
```

### 图片编解码

```typescript
import image from '@ohos.multimedia.image';

// 创建图片源
let imageSource = image.createImageSource('/data/image/test.jpg');

// 解码为 PixelMap
let pixelMap = await imageSource.createPixelMap();
console.log('Image size: ' + pixelMap.getImageInfo().size.width + 'x' + pixelMap.getImageInfo().size.height);

// 缩放图片
await pixelMap.scale(0.5, 0.5);

// 裁剪图片
await pixelMap.crop({ x: 0, y: 0, size: { width: 100, height: 100 } });

// 旋转图片
await pixelMap.rotate(90);

// 翻转图片
await pixelMap.flip(true, false);  // 水平翻转

// 创建图片编码器
let imagePackerApi = image.createImagePacker();
let packOpts: image.PackingOption = {
  format: 'image/jpeg',
  quality: 90
};

// 编码为 ArrayBuffer
let data = await imagePackerApi.packing(pixelMap, packOpts);

// 释放资源
pixelMap.release();
imagePackerApi.release();
```

### 批量创建缩略图

```typescript
import image from '@ohos.multimedia.image';

async function createThumbnail(
  imagePath: string,
  thumbnailWidth: number,
  thumbnailHeight: number
): Promise<image.PixelMap> {
  let imageSource = image.createImageSource(imagePath);

  // 解码选项 - 缩放
  let decodingOptions: image.DecodingOptions = {
    desiredSize: { width: thumbnailWidth, height: thumbnailHeight },
    editable: true
  };

  let pixelMap = await imageSource.createPixelMap(decodingOptions);
  return pixelMap;
}
```

### 相机拍照

```typescript
import camera from '@ohos.multimedia.camera';
import image from '@ohos.multimedia.image';

// 获取相机管理器
let cameraManager = camera.getCameraManager(getContext(this) as common.Context);

// 获取相机列表
let cameras = cameraManager.getSupportedCameras();
let cameraInput = cameraManager.createCameraInput(cameras[0]);

// 创建预览输出
let surfaceId = 'xxx';  // 从XComponent获取
let previewOutput = cameraManager.createPreviewOutput(
  previewProfiles[0],
  surfaceId
);

// 创建拍照输出
let photoOutput = cameraManager.createPhotoOutput(photoProfiles[0]);

// 创建会话
let captureSession = cameraManager.createSession();
captureSession.beginConfig();
captureSession.addInput(cameraInput);
captureSession.addOutput(previewOutput);
captureSession.addOutput(photoOutput);
await captureSession.commitConfig();
await captureSession.start();

// 拍照
let photoCaptureSetting: camera.PhotoCaptureSetting = {
  quality: camera.QualityLevel.QUALITY_LEVEL_HIGH,
  rotation: camera.ImageRotation.ROTATION_0
};

await photoOutput.capture(photoCaptureSetting);

// 监听拍照结果
photoOutput.on('photoAvailable', (err, photo) => {
  // photo 包含拍摄的图片
});
```

### 相机选择器（简化方式）

```typescript
import cameraPicker from '@ohos.multimedia.cameraPicker';

@Entry
@Component
struct CameraPickerPage {
  @State photoUri: string = '';

  async takePhoto(): Promise<void> {
    let pickerProfile: cameraPicker.PickerProfile = {
      cameraPosition: camera.CameraPosition.CAMERA_POSITION_BACK
    };
    let pickerResult = await cameraPicker.pick(
      getContext(this) as common.Context,
      [cameraPicker.PickerMediaType.PHOTO],
      pickerProfile
    );

    if (pickerResult.resultUri) {
      this.photoUri = pickerResult.resultUri;
    }
  }

  build() {
    Column() {
      if (this.photoUri) {
        Image(this.photoUri)
          .width(200)
          .height(200)
      }

      Button('拍照')
        .onClick(() => this.takePhoto())
    }
  }
}
```

### 音频管理

```typescript
import audio from '@ohos.multimedia.audio';

// 获取音频管理器
let audioManager = audio.getAudioManager();

// 获取音量
let volume = audioManager.getVolume(audio.AudioVolumeType.MEDIA);
console.log('Media volume: ' + volume);

// 设置音量
audioManager.setVolume(audio.AudioVolumeType.MEDIA, 50);

// 监听音量变化
audioManager.on('volumeChange', (volumeEvent: audio.VolumeEvent) => {
  console.log('Volume changed: ' + volumeEvent.volume);
});

// 静音控制
audioManager.mute(audio.AudioVolumeType.MEDIA, true);
```

## 音频流类型

```typescript
enum AudioVolumeType {
  RINGTONE = 2,     // 铃声
  MEDIA = 3,        // 媒体
  VOICE_CALL = 0,   // 通话
  VOICE_ASSISTANT = 9  // 语音助手
}
```

## 播放器状态

```
idle → prepared → playing → paused → stopped
         ↓          ↓
       completed ←┘
```

## 视频播放组件示例

```typescript
import media from '@ohos.multimedia.media';

@Entry
@Component
struct VideoPlayerPage {
  private xComponentController: XComponentController = new XComponentController();
  private avPlayer: media.AVPlayer | null = null;
  @State isPlaying: boolean = false;

  build() {
    Column() {
      XComponent({
        id: 'videoPlayer',
        type: XComponentType.SURFACE,
        controller: this.xComponentController
      })
        .onLoad(async () => {
          let surfaceId = this.xComponentController.getXComponentSurfaceId();
          await this.initPlayer(surfaceId);
        })
        .width('100%')
        .height(200)

      Row({ space: 20 }) {
        Button(this.isPlaying ? '暂停' : '播放')
          .onClick(() => this.togglePlay())

        Button('停止')
          .onClick(() => this.stop())
      }
      .margin(20)
    }
  }

  private async initPlayer(surfaceId: string): Promise<void> {
    this.avPlayer = await media.createAVPlayer();
    this.avPlayer.surfaceId = surfaceId;
    this.avPlayer.url = '/data/video/test.mp4';

    this.avPlayer.on('stateChange', async (state: string) => {
      if (state === 'prepared') {
        await this.avPlayer?.play();
        this.isPlaying = true;
      }
    });

    await this.avPlayer.prepare();
  }

  private togglePlay(): void {
    if (this.isPlaying) {
      this.avPlayer?.pause();
    } else {
      this.avPlayer?.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  private stop(): void {
    this.avPlayer?.stop();
    this.isPlaying = false;
  }
}
```

## 权限配置

```json
{
  "module": {
    "requestPermissions": [
      {
        "name": "ohos.permission.CAMERA"
      },
      {
        "name": "ohos.permission.MICROPHONE"
      }
    ]
  }
}
```

## 最佳实践

1. **及时释放资源**：
```typescript
// 播放完成后释放
avPlayer.on('stateChange', (state) => {
  if (state === 'stopped' || state === 'released') {
    avPlayer.release();
  }
});
```

2. **错误处理**：
```typescript
avPlayer.on('error', (error) => {
  console.error('Player error: ' + error.message);
  avPlayer.release();
});
```

3. **大图片处理**：
```typescript
// 使用 desiredSize 避免加载原图
let decodingOptions: image.DecodingOptions = {
  desiredSize: { width: 1920, height: 1080 }
};
```

## 注意事项

1. 相机和麦克风需要申请权限
2. 播放器使用完毕需要调用 release()
3. 图片处理建议设置 desiredSize 控制内存
4. 视频播放需要 XComponent 提供的 surfaceId