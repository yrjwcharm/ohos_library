## 11. 样式与主题约束

### @Extend
- **仅支持全局定义**
- **仅当前文件可用**，不支持 export
- **不能与 @Styles 混用**

### stateStyles
- 仅支持**通用属性**，组件私有属性**不生效**
- 聚焦状态仅通过外接键盘 Tab/方向键触发，**不支持**嵌套滚动组件内按键触发

### 模糊效果性能
- 所有实时模糊接口（backdropBlur / blur / backgroundBlurStyle / foregroundBlurStyle / motionBlur）**每帧实时渲染，性能开销大**
- 静态模糊场景请使用 effectKit 的静态模糊接口

### clipShape
- clipShape 使用时，shape 的 **fill 属性不生效**

### 深色/浅色模式
- 通过函数返回值动态读取 colorMode 的方式**不可靠**（如 `this.getResource()`），热更新时属性设置代码可能不重新执行
- BuilderNode / ComponentContent 需要**手动传播**系统环境变更事件，调用 `updateConfiguration()`

---
