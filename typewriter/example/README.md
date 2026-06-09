## @ohos_lib/typewriter
___
#### 简介
**typewriter** 这是一款JSON序列化、反序列化防止后端返回Long类型导致精度缺失的开源插件

#### 安装步骤

```ohpm
ohpm install @ohos_lib/typewriter
```
#### 基本用法
```typescript
 // 在页面/组件中导入
import { TypewriterTextView, TypewriterTextController } from './TypewriterTextView'

@Entry
@Component
struct IndexPage {
  // 创建控制器（可选）
  private typewriterController = new TypewriterTextController()

  build() {
    Column({ space: 20 }) {
      Text('打字机效果示例')
        .fontSize(20)
        .fontWeight(FontWeight.Bold)

      // 基本用法
      TypewriterTextView({
        text: '这是一段会自动逐字显示的打字机效果文本！',
        delay: 80,  // 每个字符间隔(毫秒)
        autoStart: true,  // 自动开始
        fontSize: 18,
        fontColor: '#333333',
        lineHeight: 28,
        onTypingComplete: () => {
          console.log('打字完成！')
        },
        onLineChange: (lineCount) => {
          console.log(`当前行数：${lineCount}`)
        }
      })

      // 带控制器的用法
      TypewriterTextView({
        text: '可以通过控制器控制这段文本的显示！',
        controller: this.typewriterController,
        fontSize: 16,
        fontColor: '#666666',
        autoStart: false  // 手动控制开始
      })

      // 控制按钮
      Row({ space: 10 }) {
        Button('开始')
          .onClick(() => {
            this.typewriterController.setTextWithTypewriterEffect(
              '新文本内容',
              50,
              () => console.log('完成'),
              (lines) => console.log(`行数: ${lines}`)
            )
          })

        Button('暂停')
          .onClick(() => {
            this.typewriterController.stop()
          })

        Button('立即完成')
          .onClick(() => {
            this.typewriterController.finishImmediately()
          })
      }
    }
    .padding(20)
  }
}
```
