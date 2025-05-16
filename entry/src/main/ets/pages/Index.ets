import { GTNetworkUtil, NetworkCallback } from '@ohos_lib/net_connection';
import { promptAction } from '@kit.ArkUI';

@ComponentV2
@Entry
export struct  Index{
  private networkCallback:NetworkCallback={
    netAvailableCallback:(netHandle)=>{
      promptAction.showToast({
        message:'网络可用～'
      })
   },
    netLostCallback:()=>{
      promptAction.showToast({
        message:'网络连接不可用～，请检查网络连接'
      })
    }
  }
  aboutToAppear(): void {
    GTNetworkUtil.register(this.networkCallback)
  }
  aboutToDisappear(): void {
    GTNetworkUtil.unregister();
  }
  build() {
    Column(){


    }.width('100%')
      .height('100%')
  }
}