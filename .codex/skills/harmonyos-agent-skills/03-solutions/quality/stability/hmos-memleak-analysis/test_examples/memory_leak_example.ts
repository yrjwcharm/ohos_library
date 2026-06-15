// 测试文件1 - 包含内存泄漏的示例
import window from '@ohos.window';

class TestComponent {
  private windowStage: window.Window | null = null;
  
  aboutToAppear() {
    // 这个on()没有对应的off()，会导致内存泄漏
    this.windowStage.on('windowSizeChange', (size) => {
      console.log('Window size changed');
    });
    
    // 这个也没有对应的off()
    this.windowStage.on('keyboardHeightChange', (height) => {
      console.log('Keyboard height changed');
    });
  }
  
  // 缺少aboutToDisappear方法来取消事件监听
}