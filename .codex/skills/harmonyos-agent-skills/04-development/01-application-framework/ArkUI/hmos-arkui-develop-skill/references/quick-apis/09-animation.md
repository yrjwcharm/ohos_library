## 9. 动画 API


> **组件索引**：`属性动画`、`动画曲线`、`转场动画`、`帧动画`

### 属性动画

| API | 签名 | 参数说明 |
|-----|------|---------|
| **animateTo** | `animateTo(value: AnimateParam, event: () => void)` | 显式动画 |

> **核心语义**：`event` 闭包内必须放**状态变更**（如 `this.width = 200`），框架会对闭包内的状态变化自动插入过渡动画。闭包内不放状态变更则无动画效果。
>
> **推荐写法**：`this.getUIContext()?.animateTo({ duration: 1000, curve: Curve.EaseOut }, () => { this.widthSize = 200 })`
>
> **注意**：全局 animateTo 已从 API 18 开始废弃，推荐通过 `this.getUIContext().animateTo()` 调用。禁止在 aboutToAppear/aboutToDisappear 中调用动画。
| **animateToImmediately** | `animateToImmediately(value: AnimateParam, event: () => void)` | 立即播放 |
| **.animation** | `.animation(value: AnimateParam)` | 隐式属性动画(链式) |
| **keyframeAnimateTo** | `keyframeAnimateTo(context, keyframes, options?)` | 关键帧动画 |

> **关键约束**：`.animation()` 必须放在**被动画属性之后**，且它会作用于该组件上**所有**属性变化（不只是前一个）。建议只对需要动画的属性链末尾添加 `.animation()`，避免不相关的属性变化也被动画化。

**AnimateParam：**

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| duration | number | 1000 | 时长(ms) |
| curve | Curve \| ICurve | Ease | 曲线 |
| delay | number | 0 | 延迟(ms) |
| iterations | number | 1 | 迭代次数 |
| playMode | PlayMode | Normal | 播放模式 |
| tempo | number | 1.0 | 速率 |
| direction | AnimationDirection | — | 方向 |
| fill | FillMode | None | 填充模式 |
| onFinish | () => void | — | 完成回调 |

### 动画曲线

> **注意：** `curves.springCurve` 需要 **4 个参数** `(velocity, mass, stiffness, damping)`，如 `curves.springCurve(10, 1, 228, 30)`，不能只传 2 个。不存在 `curves.easeInOut()`，缓动用 `curves.initCurve(Curve.EaseInOut)`。
>
> **命名空间区别**：`curves.*`（如 curves.springCurve）需要 `import { curves } from '@kit.ArkUI'`；`Curve.*`（如 Curve.EaseInOut）是全局枚举，不需要 import。

| 曲线 | 签名 | 说明 |
|------|------|------|
| **预设曲线** | `Curve.Linear/Ease/EaseIn/EaseOut/EaseInOut/FastOutSlowIn/...` | 13种预设 |
| **贝塞尔** | `Curve.cubicBezierCurve(x1,y1,x2,y2)` | 三阶贝塞尔 |
| **弹簧** | `curves.springCurve(velocity,mass,stiffness,damping)` | **必须 4 参数**，需 `import { curves } from '@kit.ArkUI'` |
| **弹簧运动** | `Curve.springMotion(response?,dampingFraction?,velocity?)` | 弹簧物理运动 |
| **响应弹簧** | `Curve.responsiveSpringMotion(response?,dampingFraction?,velocity?)` | 响应式 |
| **插值弹簧** | `Curve.interpolatingSpring(velocity,mass,stiffness,damping)` | 插值弹簧 |
| **自定义** | `Curve.customCurve(interpolate: (t) => number)` | 自定义 |
| **初始化曲线** | `curves.initCurve(Curve.EaseInOut)` | 获取预设曲线实例 |

### 转场动画

| API | 签名 | 说明 |
|-----|------|------|
| **.transition** | `.transition(value: TransitionEffect \| TransitionOptions)` | 出现/消失过渡 |
| **TransitionEffect** | `.OPACITY / .SLIDE / .FADE / .MOVE / .ROTATE / .SCALE / .ASYMMETRIC / .IDENTITY` | 可组合 |

### TransitionEffect 组合用法

通过 `.combine()` 链式组合多个转场效果，通过 `.animation()` 指定动画参数：

```typescript
// 组合多个效果
TransitionEffect.OPACITY
  .combine(TransitionEffect.scale({ x: 0, y: 0 }))
  .combine(TransitionEffect.rotate({ angle: 90 }))
  .animation({ duration: 300, curve: Curve.Friction })

// 非对称转场（出现和消失不同效果）
TransitionEffect.asymmetric(
  TransitionEffect.scale({ x: 0, y: 0 }),  // 出现效果
  TransitionEffect.rotate({ angle: 90 })    // 消失效果
)

// 从边缘滑入
TransitionEffect.move(TransitionEdge.END)  // TransitionEdge: TOP/BOTTOM/START/END
```

可用效果：OPACITY, SLIDE, scale({x,y}), rotate({angle}), opacity(value), translate({x,y}), move(TransitionEdge), asymmetric(appear, disappear)
组合方法：`.combine(otherEffect)` 链式调用
动画参数：`.animation({ duration, curve, delay })` 可附加在任何效果上

| **.sharedTransition** | `.sharedTransition(id, options?)` | 共享元素转场 |
| **.geometryTransition** | `.geometryTransition(id, options?)` | 几何转场 |
| **PageTransition** | `PageTransitionEnter / PageTransitionExit` | 页面转场 |

### PageTransition 用法

```typescript
// 页面入场
PageTransitionEnter({ duration: 500, curve: Curve.EaseOut })
  .slide(SlideEffect.Right)

// 页面出场
PageTransitionExit({ duration: 500, curve: Curve.EaseIn })
  .slide(SlideEffect.Left)
```

SlideEffect 枚举：Left / Right / Up / Down

### 帧动画

| API | 签名 | 说明 |
|-----|------|------|
| **Animator** | `animator.create({duration, easing, delay, fill, direction, iterations, begin, end})` | 创建动画 |
| **AnimatorResult** | `.play()` `.pause()` `.cancel()` `.reverse()` `.finish()` | 控制方法 |

---
