## 14. 自定义扩展

### Modifier 系列

| Modifier | 签名 | 说明 |
|----------|------|------|
| **AttributeModifier** | `class M implements AttributeModifier { applyNormalAttribute(instance) }` | 动态属性修改 |
| **AttributeUpdater** | `class M extends AttributeUpdater { ... }` | 高性能属性更新 |
| **DrawModifier** | `class M implements DrawModifier { drawBehind?() drawContentBelow?() drawAbove?() }` | 自定义绘制 |
| **GestureModifier** | `class M implements GestureModifier { applyGestureType() setGestureEnabled() }` | 动态手势 |
| **ContentModifier** | `class M implements ContentModifier { applyContent(column) }` | 自定义内容 |

### 自定义节点

| 节点 | 签名 | 说明 |
|------|------|------|
| **FrameNode** | `FrameNode(uiContext)` | 帧节点 |
| **RenderNode** | `new RenderNode()` | `.draw()` `.setBackgroundColor()` `.setOpacity()` `.setPosition()` `.setSize()` `.appendChild()` `.removeChild()` |
| **BuilderNode** | `new BuilderNode(uiContext, options?)` | `.build(builder, args?)` |
| **NodeController** | `class M extends NodeController { makeNode(uiContext) }` | 与 NodeContainer 配合 |

---
