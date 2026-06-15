import { KeyCode } from '@kit.InputKit';
import { ColorMetrics, LengthMetrics } from '@kit.ArkUI';

@Entry
@Component
struct FocusNavigationExample {
  @State focusedIndex: number = 0;

  build() {
    Column() {
      ForEach([0, 1, 2, 3], (index: number) => {
        Button(`按钮 ${index}`)
          .focusable(true)
          .defaultFocus(index === 0)
          .tabIndex(index)
          .focusBox({
              strokeColor: ColorMetrics.rgba(255, 0, 0),
              strokeWidth: LengthMetrics.px(2)
            })
          .backgroundColor(this.focusIndex === index? '#007DFF' : '#FF7DFF')
          .onFocus(() => {
            this.focusedIndex = index;
          })
          .onBlur(() => {
          })
          .onKeyEvent((event?: KeyEvent) => {
            if (event && event.type === KeyType.Down) {
              if (event.keyCode === KeyCode.KEYCODE_ENTER || 
                  event.keyCode === KeyCode.KEYCODE_SPACE) {
                console.log(`按钮 ${index} 被激活`);
                return true;
              }
            }
            return false;
          })
      })
    }
    .width('100%')
    .height('100%')
    .padding(16)
  }
}