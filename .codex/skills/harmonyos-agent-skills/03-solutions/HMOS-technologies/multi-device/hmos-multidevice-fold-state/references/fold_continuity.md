# 开合连续性指南

## 目标

确保折叠设备在折叠/展开过程中用户体验连续，不出现操作步骤增加、滚动位置偏移、输入内容丢失、图片模糊或播放进度漂移等问题。

## 背景

开合连续性是指应用在各种屏幕和窗口状态间切换时，页面内容连续，切换之前的任务和相关状态能保存、延续或能够快速恢复。

折叠屏设备开合时屏幕尺寸会发生变化，如果处理不当，用户会遇到以下典型问题：

| 问题 | 表现 |
| --- | --- |
| 页面异常跳转 | 开合后页面切换到其他页面 |
| 滚动位置偏移 | 列表/瀑布流回到顶部或跳到其他位置 |
| 输入内容丢失 | 正在编辑的文本框内容消失 |
| 图片变模糊 | 图片分辨率未适配新窗口尺寸 |
| 播放进度变化 | 视频或音频进度漂移 |

因此，开合连续性的目标是确保：展开后不会增加操作步骤或降低体验，页面不跳转、焦点不偏移、输入不丢失、进度不漂移。

## 核心原则：基于断点，而非折叠状态

**应用页面的开合连续能力应使用断点实现，通过 `window.on('windowSizeChange')` 监听窗口尺寸变化来驱动布局更新。**

折叠状态监听接口（`display.on('foldStatusChange')` 等）仅适用于特定功能场景（如悬停态、相机预览），**不能用于页面布局的开合连续适配**。原因：窗口变化但折叠状态未改变的场景下（如分屏、悬浮窗），布局将无法及时调整。

> 来源：[折叠屏应用开发 - 适配应用界面开合连续](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-foldable-guide#section186893019118)

## 开合连续性实现方案

### 一、刷新 UI 布局

折叠屏开合状态变化时伴随窗口尺寸变化，通过监听 `windowSizeChange` 重新计算断点，驱动 UI 布局更新。

#### 步骤 1：监听窗口尺寸变化

```typescript
private onWindowSizeChange: (windowSize: window.Size) => void = (windowSize: window.Size) => {
  AppStorage.setOrCreate('currentWidthBreakpoint', this.uiContext!.getWindowWidthBreakpoint());
  AppStorage.setOrCreate('currentHeightBreakpoint', this.uiContext!.getWindowHeightBreakpoint());
};
```

> 来源：示例代码 [EntryAbility.ets](https://gitcode.com/harmonyos_samples/SmallWindowScene/blob/master/entry/src/main/ets/entryability/EntryAbility.ets)

#### 步骤 2：基于断点切换布局

在页面中根据断点值渲染不同布局，实现折叠态/展开态的无缝切换：

```typescript
@StorageProp('currentWidthBreakpoint') currentBreakpoint: string = 'sm';

build() {
  if (this.currentBreakpoint === 'sm') {
    // 折叠态紧凑布局
    CompactLayout()
  } else {
    // 展开态分栏布局
    ExpandedLayout()
  }
}
```

> 来源：[响应式布局 - 断点机制](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-multi-device-responsive-layout)

### 二、保持折展后视频播放连续性

折叠屏折展过程中，Video 组件可能因布局重建而重置播放状态，导致进度回到起点、暂停/播放状态被重置。ArkUI 的条件渲染（`if`/`else`）在分支切换时会**销毁旧分支的组件并创建新分支的组件**，因此断点切换导致 Video 从 `if` 分支进入 `else` 分支时，播放进度会归零。

以下步骤 1-3 针对 Video 组件，讲解如何通过快照-恢复机制保持播放连续性。如果使用 AVPlayer + XComponent 自定义播放器，参见后文的 [AVPlayer + XComponent 方案](#avplayer--xcomponent-方案自定义播放器场景)。

#### 根因分析

| 根因 | 说明 |
| --- | --- |
| Video 组件重建 | 折展触发断点切换，条件渲染导致 Video 销毁重建，进度归零 |
| autoPlay 误触发 | 重建后 autoPlay=true 导致视频从头自动播放 |
| 进度快照时机错误 | 在布局切换之后才记录进度，记录的已是切换后的状态 |
| 旧 prepared 回调干扰 | 重建后新旧 Video 实例的 prepared 事件可能交错触发，导致旧实例的恢复逻辑误覆盖新实例 |

#### 步骤 1：布局切换前快照播放进度和状态

在 `foldStatusChange` / `foldDisplayModeChange` 回调中，**布局切换前**记录当前播放进度和状态。注意这里使用折叠状态回调而非 `windowSizeChange`，是因为折叠状态回调在布局重建之前触发，可以捕获到真实的播放进度；而 `windowSizeChange` 触发时布局可能已经开始切换。进度需要通过时间戳差值估算，而非仅依赖 `onUpdate` 最后回调值：

```typescript
@State savedPosition: number = 0;
@State wasPlaying: boolean = false;
@State lastUpdateTime: number = 0;
@State lastReportedTime: number = 0;
private controller: VideoController = new VideoController();

// 在 foldStatusChange 回调中，布局切换前快照
private snapshotVideoState(): void {
  const now = Date.now();
  const elapsed = (now - this.lastUpdateTime) / 1000;
  // 通过时间差估算当前真实进度
  this.savedPosition = this.wasPlaying
    ? this.lastReportedTime + elapsed
    : this.lastReportedTime;
  // wasPlaying 已在 onUpdate 中持续更新
}
```

> 来源：[Video API 参考 - onUpdate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-media-components-video)

#### 步骤 2：序列号防止旧 prepared 回调误响应

Video 重建后会产生新的 `onPrepared` 事件，新旧实例的回调可能交错触发。通过递增序列号（generation），确保只响应最新 Video 实例的 prepared 事件。同时在折展回调中启动定时器兜底，防止 `onPrepared` 延迟或丢失：

```typescript
@State currentGeneration: number = 0;
private preparedGeneration: number = 0;
private restoreTimer: number = -1;

// 折展触发时：递增序列号 → 快照 → 启动兜底定时器
private onFoldStateChange(): void {
  this.currentGeneration++;
  this.snapshotVideoState();
  this.startRestoreTimer();
}
```

#### 步骤 3：恢复播放进度和状态（autoPlay + onPrepared + 定时器兜底）

将 `autoPlay` 设为 `false` 避免重建后从头播放。恢复采用双通道触发：`onPrepared` 即时恢复 + 定时器兜底。首次加载（无保存进度）时从头播放：

```typescript
private clearRestoreTimer(): void {
  if (this.restoreTimer >= 0) {
    clearTimeout(this.restoreTimer);
    this.restoreTimer = -1;
  }
}

// 通道 2：定时器兜底，防止 onPrepared 延迟或丢失
private startRestoreTimer(): void {
  this.clearRestoreTimer();
  this.restoreTimer = setTimeout(() => {
    if (this.savedPosition > 0) {
      this.controller.setCurrentTime(this.savedPosition, SeekMode.Accurate);
      if (this.wasPlaying) {
        this.controller.start();
      }
    }
  }, 500);
}

build() {
  Video({
    src: this.videoSrc,
    controller: this.controller
  })
    .autoPlay(false)  // 关键：禁用自动播放，由恢复逻辑决定是否 start
    .onPrepared((e) => {
      this.preparedGeneration = this.currentGeneration;
      if (this.savedPosition > 0) {
        // 通道 1：prepared 回调即时恢复进度
        this.controller.setCurrentTime(this.savedPosition, SeekMode.Accurate);
        if (this.wasPlaying) {
          this.controller.start();
        }
        this.clearRestoreTimer();
      } else {
        // 首次加载，无保存进度，从头播放
        this.controller.start();
      }
    })
    .onUpdate((e) => {
      this.lastReportedTime = e.time;
      this.lastUpdateTime = Date.now();
    })
}

aboutToDisappear() {
  this.clearRestoreTimer();
}
```

> 来源：[Video API 参考 - setCurrentTime](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-media-components-video)

#### 反面模式（需避免）

```typescript
// 错误 1：不快照，直接依赖 Video 内部状态恢复
// → 布局重建后进度归零

// 错误 2：autoPlay 始终为 true
.autoPlay(true)  // → 折展后视频从头播放

// 错误 3：只依赖定时器不监听 onPrepared
// → 定时器触发时 Video 可能还未 prepared，setCurrentTime 无效

// 错误 4：快照放在布局切换之后
// → 记录的是切换后的状态，而非折展前的真实进度
```

#### AVPlayer + XComponent 方案（自定义播放器场景）

以上步骤针对 Video 组件。Video 组件封装了基础播放能力但扩展性较弱，需要自定义 UI、精细控制播放状态、或接入画中画等高级功能时，应使用 **AVPlayer + XComponent** 组合。AVPlayer 负责解码和播放控制，XComponent 提供 Surface 用于视频渲染。

> 来源：[Video 组件文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-common-components-video-player)："如果开发者想自定义视频播放，请使用 AVPlayer。"

**与 Video 组件方案的核心区别**：Video 组件可能因条件渲染被销毁重建（进度归零），而 AVPlayer + XComponent 方案的推荐做法是 **保持 XComponent 存在于组件树中，通过调整尺寸适应折展**，避免 Surface 销毁重建带来的复杂恢复逻辑。

##### 步骤 1：XComponent 初始化时创建 AVPlayer 并绑定 surfaceId

在 XComponent 的 `onLoad` 回调中获取 `surfaceId`，传给 AVPlayerUtil 创建播放器。AVPlayer 在 `initialized` 状态回调中将 surfaceId 绑定到播放器：

```typescript
// VideoPlayView.ets
@Component
export struct VideoPlayView {
  @StorageLink('creaseRegion') creaseRegion: number[] = [];
  @StorageLink('isHover') isHover: boolean = false;
  public avPlayerUtil?: AVPlayerUtil;
  private xComponentController: XComponentController = new XComponentController();

  build() {
    Column() {
      XComponent({
        id: 'videoPlayer',
        type: XComponentType.SURFACE,
        controller: this.xComponentController
      })
        .onLoad(() => {
          this.avPlayerUtil?.createAvPlayer(this.xComponentController.getXComponentSurfaceId());
        })
        .aspectRatio(16 / 9)
    }
    // 关键：悬停态时限制在折痕上方，非悬停态占满，XComponent 始终不被销毁
    .height(this.isHover ? this.creaseRegion[0] : '100%')
    .width('100%')
  }
}
```

```typescript
// AVPlayerUtil.ets（关键片段）
export class AVPlayerUtil {
  private avPlayer?: media.AVPlayer;
  private surfaceId: string = '';

  async createAvPlayer(surfaceId: string): Promise<void> {
    if (this.avPlayer === undefined || this.avPlayer.state === 'released') {
      this.avPlayer = await media.createAVPlayer();
      this.surfaceId = surfaceId;
      this.url = await this.context.resourceManager.getRawFd('video.mp4');
      this.avPlayer.fdSrc = this.url;
      this.setAVPlayerCallback();
    } else {
      // 已有实例时仅更新 surfaceId 和资源
      this.surfaceId = surfaceId;
      this.url = await this.context.resourceManager.getRawFd('video.mp4');
      this.avPlayer.fdSrc = this.url;
    }
  }

  private setStateChange(): void {
    this.avPlayer?.on('stateChange', async (state: media.AVPlayerState) => {
      switch (state) {
        case 'initialized':
          // 在 initialized 状态绑定 surfaceId 并 prepare
          this.avPlayer.surfaceId = this.surfaceId;
          this.avPlayer.prepare();
          break;
        case 'prepared':
          this.avPlayer.videoScaleType = media.VideoScaleType.VIDEO_SCALE_TYPE_FIT;
          this.avPlayer.play();
          break;
        // ... 其他状态处理
      }
    });
  }
}
```

> 来源：示例代码 [VideoPlayView.ets](https://gitcode.com/harmonyos_samples/FoldedHover/blob/master/entry/src/main/ets/view/basicview/VideoPlayView.ets)、[AVPlayerUtil.ets](https://gitcode.com/harmonyos_samples/FoldedHover/blob/master/entry/src/main/ets/common/utils/AVPlayerUtil.ets)

##### 步骤 2：通过页面生命周期控制播放状态

折展切换页面可见性时，通过 `onShown` / `onHidden` 控制播放/暂停，而非在折展回调中直接操作 AVPlayer：

```typescript
// 悬停态页面（三种布局方案均相同模式）
NavDestination() {
  FolderStack({ upperItems: ['upper'] }) {
    VideoPlayView({ avPlayerUtil: this.avPlayerUtil })
      .id('upper')
    VideoControlView({ avPlayerUtil: this.avPlayerUtil })
    BackTitleView({ title: '沉浸观影' })
  }
}
.onShown(() => {
  // 页面可见：继续播放
  this.avPlayerUtil?.playerStateControl();
})
.onHidden(() => {
  // 页面隐藏：暂停播放
  this.avPlayerUtil?.pauseAVPlayer();
})
.onWillDisappear(() => {
  // 页面退出：重置播放器
  this.avPlayerUtil?.resetAVPlayer();
})
```

> 来源：示例代码 [HoverUseFolderStack.ets](https://gitcode.com/harmonyos_samples/FoldedHover/blob/master/entry/src/main/ets/view/hoverview/HoverUseFolderStack.ets)

##### 步骤 3：AVPlayer 跨页面共享（单例模式）

AVPlayer 实例通过 AppStorage 实现单例管理，确保在页面导航和折展切换中播放状态不丢失：

```typescript
static getInstance(): AVPlayerUtil | undefined {
  if (!AppStorage.get<AVPlayerUtil>('avPlayerUtil')) {
    AppStorage.setOrCreate('avPlayerUtil', new AVPlayerUtil());
  }
  return AppStorage.get<AVPlayerUtil>('avPlayerUtil');
}
```

播放进度通过 `timeUpdate` 回调持续写入 AppStorage，供进度条等 UI 组件消费：

```typescript
this.avPlayer?.on('timeUpdate', (updateTime: number) => {
  AppStorage.setOrCreate('currentTime', this.formatTime(updateTime));
  AppStorage.setOrCreate('progress', updateTime / this.avPlayer!.duration * 100);
});
```

##### 不可避免的 XComponent 重建场景

如果业务需要条件渲染导致 XComponent 销毁重建（如双栏/单栏完全不同的播放器布局），需要处理 Surface 生命周期。继承 `XComponentController` 并重写生命周期回调（API 12+）：

```typescript
class VideoXComponentController extends XComponentController {
  private avPlayerUtil: AVPlayerUtil;

  constructor(avPlayerUtil: AVPlayerUtil) {
    super();
    this.avPlayerUtil = avPlayerUtil;
  }

  onSurfaceCreated(surfaceId: string): void {
    // Surface 创建后获取新 surfaceId，重新绑定给 AVPlayer
    this.avPlayerUtil.updateSurfaceId(surfaceId);
  }

  onSurfaceChanged(surfaceId: string, rect: SurfaceRect): void {
    // Surface 尺寸变化（折展触发），可在此更新渲染区域
  }

  onSurfaceDestroyed(surfaceId: string): void {
    // Surface 销毁前暂停播放，防止渲染到已释放的 Surface
    this.avPlayerUtil.pauseAVPlayer();
  }
}
```

> 来源：[XComponent API 参考 - XComponentController 生命周期回调](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-xcomponent)

此场景下仍需按上述 Video 组件快照恢复的思路，在布局切换前快照 AVPlayer 的 `currentTime`（通过 `timeUpdate` 回调维护）和 `state`，重建后在新 Surface 创建完成时通过 `seek()` 恢复进度。

##### AVPlayer + XComponent 反面模式（需避免）

```typescript
// 错误 1：条件渲染导致 XComponent 销毁但不处理 Surface 重建
if (this.isHover) {
  XComponent({ ... })  // 新 Surface，surfaceId 已变
}
// → AVPlayer 仍持有旧 surfaceId，画面黑屏

// 错误 2：在 foldStatusChange 回调中直接操作 AVPlayer
this.avPlayer.seek(savedPosition);  // 此时 XComponent 可能还未重建完成
// → seek 到旧 Surface 上无效

// 错误 3：每次折展都销毁重建 AVPlayer
this.avPlayer.release();
this.avPlayer = await media.createAVPlayer();
// → 不必要的资源释放和重建，导致播放中断
```

### 三、保持折展后图片画质清晰

折叠屏折展后窗口尺寸变化，如果图片仍使用折叠态时的小尺寸分辨率，会被拉伸显示导致模糊。华为官方设计规范明确要求：**"展开态不应出现图形化元素模糊、分辨率下降或视觉体量减小等损失"**。

> 来源：[折叠屏设计规范 - 针对多设备设计](https://developer.huawei.com/consumer/cn/doc/design-guides/foldable-0000002352875141)

#### 根因分析

折展导致图片模糊的常见原因：

| 根因 | 说明 |
| --- | --- |
| 图片尺寸固定 | Image 组件使用固定宽高或固定分辨率图片源，折展后未重新适配 |
| 网络图片未按需加载 | 图片 URL 未携带尺寸参数，展开后仍加载低分辨率版本 |
| objectFit 设置不当 | 使用 `Contain` 或未设置，导致图片拉伸而非重新采样 |

#### 方案 1：基于断点动态切换图片资源（推荐）

通过网络图片的 CDN 裁剪能力，根据当前断点加载对应分辨率的图片。断点变化时自动触发 Image 组件重新加载高分辨率图源：

```typescript
@StorageProp('currentWidthBreakpoint') currentBreakpoint: string = 'sm';

// 根据断点选择不同分辨率的图片 URL
getImageUrl(baseUrl: string): string {
  if (this.currentBreakpoint === 'sm') {
    return `${baseUrl}?w=300&h=200&format=webp`;
  } else if (this.currentBreakpoint === 'md') {
    return `${baseUrl}?w=600&h=400&format=webp`;
  } else {
    return `${baseUrl}?w=900&h=600&format=webp`;
  }
}

build() {
  Image(this.getImageUrl(this.rawImageUrl))
    .width('100%')
    .objectFit(ImageFit.Cover)
}
```

> 来源：[图片资源加载优化 - 使用CDN优化网络图片资源](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-texture-compression-improve-performance#section91581551143319)

CDN 参数说明：

| 参数 | 作用 | 示例 |
| --- | --- | --- |
| `w` | 图片宽度（px） | `w=600` |
| `h` | 图片高度（px） | `h=400` |
| `fit` | 裁剪方式 | `fit=cover` |
| `q` | 图片质量（0-100） | `q=85` |
| `format` | 输出格式 | `format=webp` |

#### 方案 2：启用 autoResize 自动降采样

对于非预置图片（网络图片、本地文件图片），开启 `autoResize` 后 Image 组件会根据显示区域尺寸自动选择合适的图源分辨率进行绘制，避免加载超大图源造成的内存浪费，同时保证折展后图片清晰：

```typescript
Image(this.imageUrl)
  .width('100%')
  .height(200)
  .autoResize(true)
  .objectFit(ImageFit.Cover)
```

> 来源：[图片资源加载优化 - 使用autoResize对Image组件进行降采样](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-texture-compression-improve-performance#section14375239203519)

**autoResize 适用场景**：响应页面内容变化或设备形态差异（不同屏幕尺寸、折叠屏展开/收起）时，图片需要根据父容器尺寸自动缩放。

#### 方案 3：预置多分辨率资源 + 断点切换

对于预置在应用内的图片，可准备 sm/md/lg 三套分辨率资源，根据断点动态切换：

```typescript
@StorageProp('currentWidthBreakpoint') currentBreakpoint: string = 'sm';

build() {
  Image(this.currentBreakpoint === 'sm' ? $r('app.media.cover_sm')
      : this.currentBreakpoint === 'md' ? $r('app.media.cover_md')
      : $r('app.media.cover_lg'))
    .width('100%')
    .objectFit(ImageFit.Cover)
}
```

#### 方案选择建议

| 场景 | 推荐方案 | 原因 |
| --- | --- | --- |
| 网络图片列表（电商、社交） | 方案 1（CDN 裁剪） | 按需加载精确分辨率，带宽和内存最优 |
| 用户头像、缩略图等通用场景 | 方案 2（autoResize） | 零开发成本，系统自动处理 |
| 应用内预置图片（封面、引导页） | 方案 3（多分辨率资源） | 编译期确定资源，无运行时加载延迟 |

#### 反面模式（需避免）

```typescript
// 错误：折展后图片仍使用固定尺寸，导致拉伸模糊
Image(this.imageUrl)
  .width(300)      // 固定宽度，折展后不适应
  .height(200)     // 固定高度，折展后拉伸
  // 缺少 objectFit 设置
```

```typescript
// 错误：网络图片 URL 未携带分辨率参数
Image('https://cdn.example.com/image.jpg')  // 折展后加载同一低分辨率图
  .width('100%')
```

### 四、保持可滑动组件的阅读焦点

折叠屏开合后，可滑动组件（List、WaterFlow、Scroll）需要确保阅读焦点不偏移。

#### List 组件：通过索引保持焦点

List 组件通过 `onScrollIndex()` 监听当前可见项索引，折叠状态变化后使用 `scrollToIndex()` 恢复位置：

```typescript
private listScroller: Scroller = new Scroller();
@State currentIndex: number = 0;

aboutToAppear(): void {
  let callback: Callback<display.FoldStatus> = (data: display.FoldStatus) => {
    if (data === display.FoldStatus.FOLD_STATUS_EXPANDED) {
      this.listScroller.scrollToIndex(this.currentIndex);
    } else if (data === display.FoldStatus.FOLD_STATUS_FOLDED) {
      this.listScroller.scrollToIndex(this.currentIndex);
    }
  };
  try {
    display.on('foldStatusChange', callback);
  } catch (error) {
    hilog.error(0x0000, TAG, `Failed to register callback. Code: ${error.code}`);
  }
}

build() {
  List({ space: 16, scroller: this.listScroller }) {
    // ...列表项
  }
  .onScrollIndex((start: number) => {
    this.currentIndex = start;
  })
}
```

> 来源：示例代码 [Index.ets](https://gitcode.com/harmonyos_samples/SmallWindowScene/blob/master/entry/src/main/ets/pages/Index.ets)

#### WaterFlow 组件：使用 SLIDING_WINDOW 模式

若开合前后 WaterFlow 列数未改变，系统默认使用改变前的滑动偏移量保持焦点。若列数改变，需将布局模式改为 `SLIDING_WINDOW`，系统将根据最小索引值自动调整：

```typescript
WaterFlow({ layoutMode: WaterFlowLayoutMode.SLIDING_WINDOW }) {
  LazyForEach(this.dataSource, (item: number) => {
    FlowItem() {
      Column() {
        Text('Num' + item).fontSize(12).height('16')
      }
    }
    .width('100%')
    .height(this.itemHeightArray[item % 100])
    .backgroundColor(this.colors[item % 5])
  }, (item: string) => item)
}
.columnsTemplate(this.waterFlowColumnsTemplate)
```

> 来源：示例代码 [WaterFlowView.ets](https://gitcode.com/harmonyos_samples/SmallWindowScene/blob/master/entry/src/main/ets/views/WaterFlowView.ets)

#### Scroll 组件：手动计算偏移

Scroll 组件无法像 List 一样根据索引恢复位置，需使用 `scrollBy()` 手动计算滑动距离：

```typescript
// 根据业务场景计算需要滑动的距离，通过 scrollBy 恢复焦点
this.scroller.scrollBy(dx, dy);
```

> 来源：[Scroll API 参考 - scrollBy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-scroll#scrollby9)

## 回调时序

了解开合过程中各监听回调的触发顺序，有助于正确处理状态更新：

- **展开态 → 折叠态**：`foldStatusChange`(悬停态) → `foldStatusChange`(折叠态) → `foldDisplayModeChange` → `windowSizeChange`
- **折叠态 → 展开态**：`foldStatusChange`(悬停态) → `foldDisplayModeChange` → `windowSizeChange` → `foldStatusChange`(展开态)

> 来源：[折叠屏应用开发 - 适配应用界面开合连续](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-foldable-guide#section186893019118)

## 常用 API 汇总

| API | 用途 | 适用场景 |
| --- | --- | --- |
| `UIContext.getWindowWidthBreakpoint()` | 获取当前窗口宽度断点 | 页面布局适配 |
| `UIContext.getWindowHeightBreakpoint()` | 获取当前窗口高度断点 | 页面布局适配 |
| `window.on('windowSizeChange')` | 监听窗口尺寸变化 | 驱动断点更新和布局刷新 |
| `display.on('foldStatusChange')` | 监听折叠状态变化 | 悬停态、相机等特定功能（**不用于页面布局**） |
| `display.isFoldable()` | 检查设备是否可折叠 | 判断是否需要折叠适配 |
| `Scroller.scrollToIndex()` | 滚动到指定索引位置 | List 组件焦点恢复 |
| `Scroller.scrollBy()` | 滚动指定距离 | Scroll 组件焦点恢复 |

> 来源：[折叠屏应用开发](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-foldable-guide)

## 验证清单

- 展开态不会出现操作步骤增加或操作更复杂的情况
- 开合后页面不发生异常跳转
- List / WaterFlow / Scroll 等可滑动组件的阅读焦点不偏移
- 输入框内容不丢失
- 图片和视频播放不模糊、进度不漂移
- 视频折展后播放进度偏差不超过 2 秒，暂停/播放状态正确恢复
- Video 组件恢复采用双通道（onPrepared + 定时器兜底），autoPlay 配合恢复条件控制
- AVPlayer + XComponent 方案保持 XComponent 不被条件渲染销毁，通过调整尺寸适应折展
- 不可避免的 XComponent 重建场景通过 onSurfaceCreated/onSurfaceDestroyed 管理 Surface 生命周期
- 网络图片通过 CDN 裁剪或 autoResize 按需加载适配分辨率
- 布局切换使用断点而非折叠状态作为判断条件

## 参考来源

- [示例代码 - SmallWindowScene](https://gitcode.com/harmonyos_samples/SmallWindowScene)
- [示例代码 - FoldedHover（折叠屏悬停态，AVPlayer + XComponent）](https://gitcode.com/harmonyos_samples/FoldedHover)
- [双折叠应用开发 - 适配应用界面开合连续](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-foldable-guide#section186893019118)
- [折叠屏设计规范 - 针对多设备设计](https://developer.huawei.com/consumer/cn/doc/design-guides/foldable-0000002352875141)
- [图片资源加载优化](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-texture-compression-improve-performance)
- [Pura X阔折叠应用开发](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-purax-guide)
- [XComponent API 参考 - Surface 生命周期回调](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-xcomponent)
- [AVPlayer 视频播放开发指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/video-playback)
