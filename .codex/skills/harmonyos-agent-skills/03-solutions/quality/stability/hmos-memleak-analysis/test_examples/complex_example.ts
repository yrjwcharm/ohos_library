// 测试文件3 - 复杂的示例
import display from '@ohos.display';
import sensor from '@ohos.sensor';

class ComplexComponent {
  private display = null;
  private sensorId = sensor.SensorId.ACCELEROMETER;
  
  build() {
    // 这个有对应的off，不应该被报告
    this.display.on('brightnessInfoChange', (info) => {
      console.log('Brightness changed');
    });
    
    // 这个没有off，应该被报告
    this.display.on('foldStatusChange', (status) => {
      console.log('Fold status changed');
    });
    
    // 这个也没有off，应该被报告
    sensor.on(this.sensorId, (data) => {
      console.log('Sensor data:', data);
    });
  }
  
  aboutToDisappear() {
    // 只取消了一个事件监听
    if (this.display) {
      this.display.off('brightnessInfoChange');
    }
    // 缺少对其他事件的off()调用
  }
}