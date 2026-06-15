// 卡片一镜到底完整集成示例
// 触发页：CardListPage
// 目标页：CardDetailPage
// Navigation容器：IndexPage

import { ezCustomTransition, LongTakeTransitionParam, LongTakeTransitionType, LongTakeSession, LongTakeTransitionDelegate } from '@hmanimations/ezcustomtransition';

// ========== Navigation 容器页 ==========

@Entry
@Component
struct IndexPage {
  @State pathStack: NavPathStack = new NavPathStack();
  @State isEnabled: boolean = true;

  @Builder
  PageMap(name: string, param: Object) {
    if (name === 'CardDetailPage') {
      CardDetailPage({ pathStack: this.pathStack })
    }
  }

  build() {
    Navigation(this.pathStack) {
      CardListPage({ pathStack: this.pathStack })
    }
    .navDestination(this.PageMap)
    .enabled(this.isEnabled)
    .customNavContentTransition((from: NavContentInfo, to: NavContentInfo, operation: NavigationOperation) => {
      return ezCustomTransition.customNavContentTransition(from, to, operation, {
        onTransitionStart: () => {
          this.isEnabled = false;
        },
        onTransitionEnd: () => {
          this.isEnabled = true;
        }
      });
    })
  }
}

// ========== 触发页：卡片列表页 ==========

@Component
struct CardListPage {
  @Prop pathStack: NavPathStack;
  @State cardList: CardItem[] = [
    { id: '1', title: '新闻标题1', summary: '新闻摘要1' },
    { id: '2', title: '新闻标题2', summary: '新闻摘要2' },
  ];

  build() {
    NavDestination() {
      List() {
        ForEach(this.cardList, (item: CardItem) => {
          ListItem() {
            Column() {
              Text(item.title).fontSize(16).fontWeight(FontWeight.Bold)
              Text(item.summary).fontSize(12).fontColor('#666666').margin({ top: 4 })
            }
            .width('100%')
            .height(200)
            .padding(12)
            .borderRadius(16)
            .backgroundColor(Color.White)
            .id(`card_${item.id}`)
            .onClick(() => this.onCardClick(item))
          }
          .margin({ bottom: 12 })
        })
      }
      .width('100%')
      .padding({ left: 16, right: 16, top: 16 })
    }
    .title('卡片列表')
  }

  private onCardClick(item: CardItem): void {
    let param: Record<string, Object> = { 'cardId': item.id, 'cardTitle': item.title };
    let longTakeTransitionParam: LongTakeTransitionParam | undefined =
      ezCustomTransition.generateLongTakeParam(this.getUIContext(), `card_${item.id}`, 16);
    if (longTakeTransitionParam) {
      param['longTakeTransitionParam'] = longTakeTransitionParam;
    }
    this.pathStack.pushPath({ name: 'CardDetailPage', param: param });
  }
}

// ========== 目标页：详情页 ==========

@Component
struct CardDetailPage {
  @Prop pathStack: NavPathStack;
  @State longTakeSession: LongTakeSession = new LongTakeSession();
  @State longTakeTransitionParam: LongTakeTransitionParam | undefined = undefined;
  @State cardTitle: string = '';

  @Builder
  ContentBuilder() {
    Column() {
      Row() {
        Image($r('sys.media.ohos_ic_public_arrow_left')).width(24).height(24)
          .onClick(() => { this.pathStack.pop(); })
        Text('详情').fontSize(18).fontWeight(FontWeight.Bold)
      }
      .width('100%').height(56).padding({ left: 16 })

      Column() {
        Text(this.cardTitle).fontSize(24).fontWeight(FontWeight.Bold).margin({ top: 16 })
      }
      .width('100%').padding({ left: 16, right: 16 })
      .id('detail_content')
    }
    .width('100%').height('100%')
    .backgroundColor(this.longTakeTransitionParam ? Color.White : Color.Transparent)
    .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP])
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
    .backgroundColor(this.longTakeTransitionParam ? this.longTakeSession.navDestinationBgColor : Color.White)
    .hideTitleBar(true)
    .onSizeChange((oldValue: SizeOptions, newValue: SizeOptions) => {
      this.longTakeSession.setNewSize(newValue);
    })
    .onReady((navDestContext: NavDestinationContext) => {
      let param = navDestContext.pathInfo?.param as Record<string, Object>;
      this.cardTitle = param['cardTitle'] as string;
      this.longTakeTransitionParam = param['longTakeTransitionParam'] as LongTakeTransitionParam;
      if (this.longTakeTransitionParam) {
        this.longTakeSession.init(navDestContext, this.longTakeTransitionParam, {
          pop: () => { this.pathStack.pop(); },
          alignTargetId: 'detail_content'
        });
      }
    })
  }
}