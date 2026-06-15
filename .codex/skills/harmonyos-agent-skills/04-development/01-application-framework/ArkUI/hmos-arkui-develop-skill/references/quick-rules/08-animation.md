## 8. 动画约束

### 通用动画

| 规则 | 说明 |
|------|------|
| 位置/尺寸动画性能差 | 动画 width/height/position 会触发布局重计算，**推荐使用 scale 替代** |
| onFinish 回调慎用 | 关闭开发者转场动画或 UIAbility 后台时，finish 回调**立即触发**。不要在回调中放置时序相关逻辑 |
| animateToImmediately 慎用 | 会绕过 vsync，状态不完整时可能导致显示错误。**正常情况应使用 animateTo** |
| keyframeAnimateTo 不支持弹簧曲线 | 不支持 springMotion / responsiveSpringMotion / interpolatingSpring |

### 弹簧曲线

| 规则 | 说明 |
|------|------|
| springMotion / interpolatingSpring 自动计算时长 | 开发者指定的 duration 会被**忽略** |
| springCurve 不推荐 | 将物理弹簧映射到固定时长，扭曲了物理时间，**不推荐使用** |

### 转场动画（Transition）

| 规则 | 说明 |
|------|------|
| transition vs 属性动画 | 转场动画用于**出现/消失**的组件；属性动画用于**始终存在**的组件。不要混用 |
| TransitionEffect.animation 的 onFinish 不工作 | **onFinish 回调不生效** |
| 父组件必须有 transition | 子组件消失转场时，**所有父控件也必须有 transition 效果**，否则子组件的消失转场不会触发 |
| TransitionEffect 参数级联 | combine() 调用中，上层 animation() 的参数会影响下层效果 |
| pageTransition 已废弃 | **不推荐使用** pageTransition，应使用 Navigation 转场和 Modal 转场 |
| 页面转场时长需同步 | 两个页面使用 pageTransition 时，**必须确保双方转场时长一致** |

### @AnimatableExtend

| 规则 | 说明 |
|------|------|
| 参数类型限制 | **只允许** number、string、Color 及其联合类型 |
| 鸿蒙卡片限制 | 卡片中动画最大时长 **1000ms** |

### AnimatorResult

| 规则 | 说明 |
|------|------|
| 内存泄漏风险 | 不及时销毁 AnimatorResult 会导致内存泄漏，需在适当时机调用销毁方法 |

---
