---
name: kits_avsession
description: "HarmonyOS AVSessionKit 音视频会话能力集使用规范。包含 avSession 媒体会话、AVCastPicker 投播组件等音视频会话管理能力。Use when: (1) 媒体会话管理，(2) 后台音乐控制，(3) 蓝牙耳机控制，(4) 多设备投播。Triggers: AVSession、avSession、AVCastPicker、媒体会话、后台音乐、投播、蓝牙控制、媒体控制。"
user-invocable: false
---

# AVSessionKit 音视频会话能力集 (kits_avsession)

本 skill 覆盖 HarmonyOS **AVSessionKit** 音视频会话能力集的使用规范。

## 能力列表

| 模块 | 导入方式 | 用途 |
|------|----------|------|
| avSession | @ohos.multimedia.avsession | 媒体会话管理 |
| AVCastPicker | @ohos.multimedia.avCastPicker | 投播组件 |

## 快速索引

### 创建 AVSession

```typescript
import avSession from '@ohos.multimedia.avsession';
import common from '@ohos.app.ability.common';

let session: avSession.AVSession | null = null;

// 创建媒体会话
async function createSession(context: common.UIAbilityContext): Promise<void> {
  session = await avSession.createAVSession(context, 'MusicPlayer', 'audio');

  // 设置会话元数据
  let metadata: avSession.AVMetadata = {
    assetId: 'song_001',
    title: 'Nightingale',
    artist: 'Demi Lovato',
    album: 'Confident',
    duration: 225, // 秒
    mediaImage: 'https://example.com/cover.jpg'
  };
  await session.setAVMetadata(metadata);

  // 激活会话
  await session.activate();
  console.log('AVSession created and activated');
}
```

### 播放状态管理

```typescript
import avSession from '@ohos.multimedia.avsession';

// 设置播放状态
async function setPlayingState(): Promise<void> {
  let playbackState: avSession.AVPlaybackState = {
    state: avSession.PlaybackState.PLAYBACK_STATE_PLAY,
    speed: 1.0,
    position: {
      elapsedTime: 120000, // 120秒 (毫秒)
      updateTime: Date.now()
    },
    bufferedTime: 180000, // 缓冲到 180秒
    loopMode: avSession.LoopMode.LOOP_MODE_SINGLE,
    isFavorite: true
  };
  await session?.setAVPlaybackState(playbackState);
}

// 暂停状态
async function setPausedState(): Promise<void> {
  let playbackState: avSession.AVPlaybackState = {
    state: avSession.PlaybackState.PLAYBACK_STATE_PAUSE,
    position: {
      elapsedTime: 120000,
      updateTime: Date.now()
    }
  };
  await session?.setAVPlaybackState(playbackState);
}

// 停止状态
async function setStoppedState(): Promise<void> {
  let playbackState: avSession.AVPlaybackState = {
    state: avSession.PlaybackState.PLAYBACK_STATE_STOP
  };
  await session?.setAVPlaybackState(playbackState);
}
```

### 播放状态常量

```typescript
import avSession from '@ohos.multimedia.avsession';

// 播放状态
avSession.PlaybackState.PLAYBACK_STATE_INVALID   = -1  // 无效
avSession.PlaybackState.PLAYBACK_STATE_PREPARE   = 0   // 准备中
avSession.PlaybackState.PLAYBACK_STATE_PLAY      = 1   // 播放中
avSession.PlaybackState.PLAYBACK_STATE_PAUSE     = 2   // 暂停
avSession.PlaybackState.PLAYBACK_STATE_STOP      = 3   // 停止
avSession.PlaybackState.PLAYBACK_STATE_PLAY_NEXT = 4   // 下一首
avSession.PlaybackState.PLAYBACK_STATE_PLAY_PREV = 5   // 上一首
avSession.PlaybackState.PLAYBACK_STATE_FAST_FORWARD = 6 // 快进
avSession.PlaybackState.PLAYBACK_STATE_REWIND    = 7   // 快退

// 循环模式
avSession.LoopMode.LOOP_MODE_OFF    = 0  // 关闭循环
avSession.LoopMode.LOOP_MODE_SINGLE = 1  // 单曲循环
avSession.LoopMode.LOOP_MODE_LIST   = 2  // 列表循环
avSession.LoopMode.LOOP_MODE_SHUFFLE = 3 // 随机播放
```

### 控制命令监听

```typescript
import avSession from '@ohos.multimedia.avsession';

// 注册控制命令监听
function setupControlCommands(): void {
  if (!session) return;

  // 播放命令
  session.on('play', () => {
    console.log('Play command received');
    // 执行播放逻辑
    player.play();
    setPlayingState();
  });

  // 暂停命令
  session.on('pause', () => {
    console.log('Pause command received');
    player.pause();
    setPausedState();
  });

  // 停止命令
  session.on('stop', () => {
    console.log('Stop command received');
    player.stop();
    setStoppedState();
  });

  // 下一首
  session.on('playNext', () => {
    console.log('Next command received');
    playNextSong();
  });

  // 上一首
  session.on('playPrevious', () => {
    console.log('Previous command received');
    playPreviousSong();
  });

  // 快进
  session.on('fastForward', () => {
    console.log('Fast forward command received');
    player.seek(currentPosition + 10000);
  });

  // 快退
  session.on('rewind', () => {
    console.log('Rewind command received');
    player.seek(currentPosition - 10000);
  });

  // 跳转
  session.on('seek', (time: number) => {
    console.log('Seek to: ' + time);
    player.seek(time);
  });

  // 设置速度
  session.on('setSpeed', (speed: number) => {
    console.log('Set speed: ' + speed);
    player.setSpeed(speed);
  });

  // 设置循环模式
  session.on('setLoopMode', (mode: avSession.LoopMode) => {
    console.log('Set loop mode: ' + mode);
    // 更新循环模式
  });

  // 收藏
  session.on('toggleFavorite', (assetId: string) => {
    console.log('Toggle favorite: ' + assetId);
    // 切换收藏状态
  });
}
```

### 媒体元数据

```typescript
import avSession from '@ohos.multimedia.avsession';

// 完整的媒体元数据
let metadata: avSession.AVMetadata = {
  assetId: 'song_001',              // 媒体ID
  title: 'Nightingale',             // 标题
  artist: 'Demi Lovato',            // 艺术家
  album: 'Confident',               // 专辑
  writer: 'Demi Lovato',            // 作词作曲
  composer: 'Demi Lovato',          // 作曲家
  duration: 225,                    // 时长（秒）
  mediaImage: 'https://example.com/cover.jpg', // 封面图片URL
  subtitle: 'Track 5',              // 副标题
  description: 'A beautiful song',  // 描述
  lyric: 'https://example.com/lyric.lrc', // 歌词URL
  previousAssetId: 'song_000',      // 上一首ID
  nextAssetId: 'song_002'           // 下一首ID
};

await session?.setAVMetadata(metadata);
```

### AVController 控制器

```typescript
import avSession from '@ohos.multimedia.avsession';

// 获取所有活动会话
let sessionDescriptors = await avSession.getAllSessionDescriptors();
sessionDescriptors.forEach((descriptor) => {
  console.log('Session: ' + descriptor.sessionTag);
});

// 创建控制器
let controller = await avSession.createController(sessionDescriptors[0].sessionId);

// 获取会话元数据
let metadata = await controller.getAVMetadata();
console.log('Now playing: ' + metadata.title);

// 获取播放状态
let playbackState = await controller.getAVPlaybackState();
console.log('State: ' + playbackState.state);

// 发送控制命令
await controller.play();
await controller.pause();
await controller.seek(60000); // 跳转到 60 秒
```

### AVCastPicker 投播组件

```typescript
import AVCastPicker from '@ohos.multimedia.avCastPicker';

@Entry
@Component
struct CastPickerPage {
  build() {
    Column() {
      // 投播按钮
      AVCastPicker()
        .width(48)
        .height(48)

      // 自定义样式
      AVCastPicker()
        .width(200)
        .height(40)
        .borderRadius(20)
        .backgroundColor('#E0E0E0')
    }
  }
}
```

### 投播状态监听

```typescript
import avSession from '@ohos.multimedia.avsession';

// 监听投播状态变化
session?.on('outputDeviceChange', (device: avSession.OutputDeviceInfo) => {
  console.log('Output device changed');
  console.log('Device name: ' + device.deviceName);
  console.log('Device id: ' + device.deviceId);

  if (device.isRemote) {
    console.log('Casting to remote device');
  } else {
    console.log('Playing on local device');
  }
});

// 获取当前输出设备
let device = await session?.getOutputDevice();
console.log('Current device: ' + device?.deviceName);
```

### 音频焦点管理

```typescript
import avSession from '@ohos.multimedia.avsession';

// 监听音频焦点变化
session?.on('audioDeviceChange', (device: avSession.AudioDeviceDescriptor) => {
  console.log('Audio device changed');
  console.log('Device type: ' + device.deviceType);
  console.log('Device role: ' + device.deviceRole);
});

// 请求音频焦点
// （通常由系统自动管理，无需手动请求）
```

### 会话销毁

```typescript
import avSession from '@ohos.multimedia.avsession';

// 停用会话
async function deactivateSession(): Promise<void> {
  await session?.deactivate();
  console.log('Session deactivated');
}

// 销毁会话
async function destroySession(): Promise<void> {
  // 先移除所有监听
  session?.off('play');
  session?.off('pause');
  session?.off('stop');
  session?.off('playNext');
  session?.off('playPrevious');

  // 销毁会话
  await session?.destroy();
  session = null;
  console.log('Session destroyed');
}
```

### 获取系统媒体会话管理器

```typescript
import avSession from '@ohos.multimedia.avsession';

// 获取媒体会话管理器
let sessionManager = avSession.getSessionManager();

// 获取所有活动会话
let sessions = await sessionManager.getAllSessionDescriptors();

// 监听会话创建
sessionManager.on('sessionCreate', (descriptor: avSession.AVSessionDescriptor) => {
  console.log('New session created: ' + descriptor.sessionTag);
});

// 监听会话销毁
sessionManager.on('sessionDestroy', (descriptor: avSession.AVSessionDescriptor) => {
  console.log('Session destroyed: ' + descriptor.sessionTag);
});

// 监听会话状态变化
sessionManager.on('sessionStateChange', (descriptor: avSession.AVSessionDescriptor) => {
  console.log('Session state changed: ' + descriptor.activeState);
});
```

## 完整示例：音乐播放器

```typescript
import avSession from '@ohos.multimedia.avsession';
import common from '@ohos.app.ability.common';

class MusicPlayer {
  private session: avSession.AVSession | null = null;
  private player: any; // 实际音频播放器

  async init(context: common.UIAbilityContext): Promise<void> {
    // 创建会话
    this.session = await avSession.createAVSession(context, 'MusicPlayer', 'audio');

    // 设置控制命令监听
    this.setupControlCommands();

    // 激活会话
    await this.session.activate();
  }

  private setupControlCommands(): void {
    if (!this.session) return;

    this.session.on('play', () => this.resume());
    this.session.on('pause', () => this.pause());
    this.session.on('stop', () => this.stop());
    this.session.on('playNext', () => this.next());
    this.session.on('playPrevious', () => this.previous());
    this.session.on('seek', (time: number) => this.seek(time));

    this.session.on('setLoopMode', (mode: avSession.LoopMode) => {
      this.setLoopMode(mode);
    });
  }

  async play(song: Song): Promise<void> {
    // 设置元数据
    await this.session?.setAVMetadata({
      assetId: song.id,
      title: song.title,
      artist: song.artist,
      album: song.album,
      duration: song.duration,
      mediaImage: song.coverUrl
    });

    // 开始播放
    this.player.play();
    await this.updatePlaybackState(avSession.PlaybackState.PLAYBACK_STATE_PLAY);
  }

  private async updatePlaybackState(state: avSession.PlaybackState): Promise<void> {
    await this.session?.setAVPlaybackState({
      state: state,
      position: {
        elapsedTime: this.player.currentPosition,
        updateTime: Date.now()
      }
    });
  }

  async pause(): Promise<void> {
    this.player.pause();
    await this.updatePlaybackState(avSession.PlaybackState.PLAYBACK_STATE_PAUSE);
  }

  async resume(): Promise<void> {
    this.player.play();
    await this.updatePlaybackState(avSession.PlaybackState.PLAYBACK_STATE_PLAY);
  }

  async stop(): Promise<void> {
    this.player.stop();
    await this.updatePlaybackState(avSession.PlaybackState.PLAYBACK_STATE_STOP);
  }

  async seek(time: number): Promise<void> {
    this.player.seek(time);
  }

  async next(): Promise<void> {
    // 播放下一首
  }

  async previous(): Promise<void> {
    // 播放上一首
  }

  async setLoopMode(mode: avSession.LoopMode): Promise<void> {
    // 设置循环模式
  }

  async destroy(): Promise<void> {
    await this.session?.deactivate();
    await this.session?.destroy();
    this.session = null;
  }
}

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverUrl: string;
}
```

## 注意事项

1. **会话生命周期**：会话需要在使用前创建并激活，使用后销毁
2. **后台播放**：需要配置后台任务权限才能在后台播放
3. **蓝牙控制**：AVSession 自动处理蓝牙耳机的媒体键
4. **锁屏控制**：系统会自动在锁屏界面显示媒体控制
5. **多应用互斥**：同一时间只有一个应用的会话可以接收媒体键事件