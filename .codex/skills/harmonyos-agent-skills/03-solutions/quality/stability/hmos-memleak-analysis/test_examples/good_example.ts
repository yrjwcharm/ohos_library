// 测试文件2 - 正确使用on/off的示例
import window from '@ohos.window';

class GoodComponent {
  private windowStage: window.Window | null = null;
  private sizeChangeCallback = (size: any) => {
    console.log('Window size changed');
  };
  
  aboutToAppear() {
    // 正确使用on/off配对
    this.windowStage.on('windowSizeChange', this.sizeChangeCallback);
  }
  
  aboutToDisappear() {
    // 正确取消事件监听
    if (this.windowStage) {
      this.windowStage.off('windowSizeChange', this.sizeChangeCallback);
    }
  }
}