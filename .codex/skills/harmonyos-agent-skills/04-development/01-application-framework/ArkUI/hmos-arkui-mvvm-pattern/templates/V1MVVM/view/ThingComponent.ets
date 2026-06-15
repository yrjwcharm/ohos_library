import ThingViewModel from '../viewmodel/ThingViewModel';

@Component
export struct ThingComponent {
  @ObjectLink thing: ThingViewModel;

  @Builder
  displayIcon(icon: Resource) {
    Image(icon)
      .width(28)
      .height(28)
      .onClick(() => {
        this.thing.updateIsFinish();
      })
      .id(this.thing.thingName)
  }

  build() {
    Row({ space: 15 }) {
      if (this.thing.isFinish) {
        this.displayIcon($r('app.media.finished'));
      } else {
        this.displayIcon($r('app.media.unfinished'));
      }

      Text(`${this.thing.thingName}`)
        .fontSize(24)
        .decoration({ type: this.thing.isFinish ? TextDecorationType.LineThrough : TextDecorationType.None })
        .onClick(() => {
          this.thing.addSuffixes();
        })
    }
    .height('8%')
    .width('90%')
    .padding({ left: 15 })
    .opacity(this.thing.isFinish ? 0.3 : 1)
    .border({ width: 1 })
    .borderColor(Color.White)
    .borderRadius(25)
    .backgroundColor(Color.White)
  }
}
