import { scanBarcode, scanCore } from '@kit.ScanKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { PromptAction, UIContext } from '@kit.ArkUI';

@Entry
@Component
struct Index {
  @State message: string = 'Hello World';
  // 获取当前组件的UIContext
  private uiContext: UIContext = this.getUIContext();
  // 通过UIContext获取PromptAction对象
  private promptAction: PromptAction = this.uiContext.getPromptAction();

  build() {
    RelativeContainer() {
      Button('扫一扫')
        .id('ScanButton')
        .fontSize(16)
        .fontWeight(FontWeight.Medium)
        .width(120)
        .height(40)
        .margin({ top: 20 })
        .alignRules({
          top: { anchor: 'HelloWorld', align: VerticalAlign.Bottom },
          center: { anchor: '__container__', align: VerticalAlign.Center },
          middle: { anchor: '__container__', align: HorizontalAlign.Center }
        })
        .onClick(() => {
          // 调用扫码 API 前检测设备能力
          const isScanBarCode = canIUse('SystemCapability.Multimedia.Scan.ScanBarcode');
          if (isScanBarCode) {
            scanBarcode.startScanForResult(this.uiContext.getHostContext()).then((result) => {
              // 扫码成功后显示 Toast
              this.promptAction.openToast({
                message: result.originalValue,
                duration: 2000,
              }).catch((error: BusinessError) => {
                console.error(`openToast error code is ${error.code}, message is ${error.message}`);
              })
              // TODO: 在此处添加扫码成功后的业务逻辑代码
              // ...
            }).catch((error: BusinessError) => {
              // 处理错误
              this.promptAction.openToast({
                message: '扫码失败: ' + error.message,
                duration: 2000,
              }).catch((error: BusinessError) => {
                console.error(`openToast error code is ${error.code}, message is ${error.message}`);
              })
            });
          } else {
            this.promptAction.openToast({
              message: '当前设备不支持默认扫码功能',
              duration: 2000,
            }).catch((error: BusinessError) => {
              console.error(`openToast error code is ${error.code}, message is ${error.message}`);
            })
          }
        })
    }
    .height('100%')
    .width('100%')
  }
}