## 10. 手势与事件


> **组件索引**：`基础手势`、`组合手势`、`手势绑定`、`通用事件`、`拖拽事件`

### 基础手势

| 手势 | 构造签名 | 参数 |
|------|---------|------|
| **TapGesture** | `TapGesture(value?: number)` | `count?:1` `fingers?:1` |
| **LongPressGesture** | `LongPressGesture(options?)` | `fingers?:1` `repeat?:true` `duration?:500` |
| **PanGesture** | `PanGesture(options?)` | `fingers?:1` `distance?:5vp` `direction?:All` |
| **PinchGesture** | `PinchGesture(options?)` | `fingers?:2` `distance?:3vp` |
| **RotationGesture** | `RotationGesture(options?)` | `fingers?:2` `angle?:1deg` |
| **SwipeGesture** | `SwipeGesture(options?)` | `fingers?:1` `direction?:All` `speed?:100` |

### 组合手势

| 类型 | 签名 | 说明 |
|------|------|------|
| **GestureGroup** | `GestureGroup(mode: GestureMode, ...gestures)` | Sequence/Parallel/Exclusive |

### 手势绑定

| 方法 | 说明 |
|------|------|
| `.gesture(gesture, mask?)` | 绑定手势(子组件优先) |
| `.priorityGesture(gesture, mask?)` | 优先于子组件 |
| `.parallelGesture(gesture, mask?)` | 与子组件并行 |

### 通用事件

| 事件 | 签名 | 说明 |
|------|------|------|
| .onClick | `.onClick((event: ClickEvent) => void)` | 点击，ClickEvent: {x,y,timestamp,target,source} |
| .onTouch | `.onTouch((event: TouchEvent) => void)` | 触摸，TouchEvent: {touches,changedTouches,type} |
| .onHover | `.onHover((isHover, event) => void)` | 鼠标悬停 |
| .onMouse | `.onMouse((event: MouseEvent) => void)` | 鼠标事件 |
| .onKeyEvent | `.onKeyEvent((event: KeyEvent) => void)` | 按键事件 |
| .onFocus | `.onFocus(() => void)` | 获取焦点 |
| .onBlur | `.onBlur(() => void)` | 失去焦点 |
| .onAppear | `.onAppear(() => void)` | 挂载 |
| .onDisappear | `.onDisappear(() => void)` | 卸载 |
| .onAreaChange | `.onAreaChange((old, new) => void)` | 区域变化 |
| .onSizeChange | `.onSizeChange((old, new) => void)` | 尺寸变化 |
| .onVisibleChange | `.onVisibleChange((isVisible) => void)` | 可见性变化 |

### 拖拽事件

| 事件 | 签名 | 说明 |
|------|------|------|
| .onDragStart | `.onDragStart((event) => CustomBuilder \| DragItemInfo)` | 拖拽开始 |
| .onDragEnter | `.onDragEnter((event) => void)` | 拖入 |
| .onDragMove | `.onDragMove((event) => void)` | 移动 |
| .onDragLeave | `.onDragLeave((event) => void)` | 离开 |
| .onDrop | `.onDrop((event) => void)` | 释放 |
| .onDragEnd | `.onDragEnd((event) => void)` | 结束 |

---
