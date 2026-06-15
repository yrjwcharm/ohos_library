// 图片九宫格一镜到底完整集成示例
// 触发页：ImageGridPage（九宫格）
// 目标页：ImageDetailPage（全屏大图 + Swiper滑动）
// Navigation容器：IndexPage

import { ezCustomTransition, LongTakeTransitionParam, LongTakeTransitionType, LongTakeSession, LongTakeTransitionDelegate } from '@hmanimations/ezcustomtransition';

// ========== 触发页：九宫格图片页 ==========

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
    NavDestination() {
      Grid() {
        ForEach(this.imageList, (item: string, index: number) => {
          GridItem() {
            Image(item)
              .width('100%').height('100%')
              .objectFit(ImageFit.Cover)
              .borderRadius(8)
              .id(`grid_img_${index}`)
              .onClick(() => this.openImageDetail(index, item))
          }
          .width('33.3%').height(120)
        }, (item: string, index: number) => `${index}`)
      }
      .columnsTemplate('1fr 1fr 1fr')
      .rowsGap(4).columnsGap(4)
      .padding(12)
    }
    .title('图片九宫格')
  }

  private openImageDetail(index: number, imageUrl: string) {
    let param: Record<string, Object> = {
      'imageUrl': imageUrl,
      'initialIndex': index,
      'imageList': this.imageList,
    };
    let longTakeTransitionParam: LongTakeTransitionParam | undefined =
      ezCustomTransition.generateLongTakeParam(
        this.getUIContext(),
        `grid_img_${index}`,
        8,
        { type: LongTakeTransitionType.ImageLongTake }
      );
    if (longTakeTransitionParam) {
      param['longTakeTransitionParam'] = longTakeTransitionParam;
    }
    this.pathStack.pushPath({ name: 'ImageDetailPage', param: param });
  }
}

// ========== 目标页：全屏大图页 ==========

@Component
struct ImageDetailPage {
  @Prop pathStack: NavPathStack;
  @State longTakeSession: LongTakeSession = new LongTakeSession();
  @State longTakeTransitionParam: LongTakeTransitionParam | undefined = undefined;
  @State currentIndex: number = 0;
  private imageList: string[] = [];

  @Builder
  ContentBuilder() {
    Stack() {
      Swiper() {
        ForEach(this.imageList, (item: string) => {
          Image(item).width('100%').height('100%').objectFit(ImageFit.Contain)
        }, (item: string, index: number) => `${index}`)
      }
      .index(this.currentIndex)
      .indicator(false)
      .onChange((index: number) => { this.currentIndex = index; })

      Row() {
        Image($r('sys.media.ohos_ic_public_arrow_left')).width(24).height(24).fillColor(Color.White)
      }
      .width(40).height(40).margin({ left: 16, top: 48 })
      .onClick(() => {
        this.longTakeSession.updateSnapshotComponentId(`grid_img_${this.currentIndex}`);
        this.pathStack.pop();
      })
    }
    .width('100%').height('100%')
    .backgroundColor(Color.Black)
    .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM])
  }

  build() {
    NavDestination() {
      if (this.longTakeTransitionParam) {
        LongTakeTransitionDelegate({
          longTakeSession: this.longTakeSession,
          contentBuilder: (): void => { this.ContentBuilder() }
        })
      } else {
        this.ContentBuilder()
      }
    }
    .backgroundColor(this.longTakeTransitionParam ? this.longTakeSession.navDestinationBgColor : Color.Black)
    .hideTitleBar(true)
    .onSizeChange((oldValue: SizeOptions, newValue: SizeOptions) => {
      this.longTakeSession.setNewSize(newValue);
    })
    .onReady((navDestContext: NavDestinationContext) => {
      let param = navDestContext.pathInfo?.param as Record<string, Object>;
      this.imageList = param['imageList'] as string[];
      this.currentIndex = param['initialIndex'] as number;
      this.longTakeTransitionParam = param['longTakeTransitionParam'] as LongTakeTransitionParam;
      if (this.longTakeTransitionParam) {
        this.longTakeSession.init(navDestContext, this.longTakeTransitionParam, {
          pop: () => {
            this.longTakeSession.updateSnapshotComponentId(`grid_img_${this.currentIndex}`);
            this.pathStack.pop();
          },
        });
      }
    })
  }
}