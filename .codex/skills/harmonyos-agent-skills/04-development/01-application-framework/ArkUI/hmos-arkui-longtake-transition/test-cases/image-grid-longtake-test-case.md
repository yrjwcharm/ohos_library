# 图片九宫格一镜到底转场测试用例

## 场景描述

用户有一个图片九宫格页面，点击图片后以一镜到底动画全屏查看大图，且支持左右滑动浏览。返回时需要回到当前浏览的图片对应位置（而非初始点击的图片位置）。

## 前提条件

- 应用使用 Navigation + NavDestination 路由体系
- 大图页已适配沉浸式状态栏
- 大图页 NavDestination 配置 .hideTitleBar(true)

## 测试输入

**触发页代码（九宫格页）**：

```arkui
@Component
struct ImageGridPage {
  @Prop pathStack: NavPathStack;
  private imageList: string[] = [
    'https://example.com/img1.jpg',
    'https://example.com/img2.jpg',
    'https://example.com/img3.jpg',
    'https://example.com/img4.jpg',
    'https://example.com/img5.jpg',
    'https://example.com/img6.jpg',
    'https://example.com/img7.jpg',
    'https://example.com/img8.jpg',
    'https://example.com/img9.jpg',
  ];

  build() {
    Grid() {
      ForEach(this.imageList, (item: string, index: number) => {
        GridItem() {
          Image(item)
            .width('100%')
            .height('100%')
            .objectFit(ImageFit.Cover)
            .borderRadius(8)
            .onClick(() => {
              this.pathStack.pushPath({ name: 'ImageDetailPage', param: { 'imageUrl': item, 'initialIndex': index } });
            })
        }
        .width('33.3%')
        .height(120)
      }, (item: string, index: number) => `${index}`)
    }
    .columnsTemplate('1fr 1fr 1fr')
  }
}
```

## 期望输出要点

### 关键差异（vs 卡片一镜到底）
1. 使用 `LongTakeTransitionType.ImageLongTake`（而非默认的 CardLongTake）
2. 九宫格每张图片设置唯一 `.id()`（如 `grid_img_${index}`）
3. 大图页 Swiper `onChange` 记录 `currentIndex`
4. 返回前调用 `this.longTakeSession.updateSnapshotComponentId('grid_img_${currentIndex}')`
5. 大图页背景色通常为黑色（而非白色）

### 全局修改
- 与卡片场景一致的6步全局修改（EntryAbility、AbilityStage、Navigation）

### 目标页修改
- 与卡片场景一致的5处目标页修改