# Reference: aibottombar

[Metadata]
- **Component**: `harmony-aibottombar`
- **中文名称**: 导航条
- **Template Source**: `references/4.template/aibottombar-tem.html`

## 1. Content Presentation (内容呈现格式)

### 1.1 Base Structure

```html
<div class="harmony-aibottombar harmony-aibottombar-{{theme}}" data-component="aibottombar">
  <div class="harmony-aibottombar-indicator"></div>
</div>
```

- 指示条：Home Indicator 矩形 `112×5`，圆角 `2.5`，水平居中。
- 组件为单层结构，仅承载指示条，无文字、无图标。
- 组件高度固定 `28px`，宽度 `360px`，指示条在容器内水平和垂直居中。

### 1.2 Indicator Snippet

```html
<div class="harmony-aibottombar harmony-aibottombar-{{theme}}" data-component="aibottombar">
  <div class="harmony-aibottombar-indicator"></div>
</div>
```

## 2. Interaction States (交互状态)

- `light`：浅色底部指示栏。背景为 `transparent`，指示条色为 `rgba(0,0,0,0.2)`（对应 DSL `Rectangle_36_3886`）。
- `dark`：深色底部指示栏。背景为 `transparent`，指示条色为 `rgba(255,255,255,0.5)`（对应 DSL `Rectangle_36_3888`）。
- `transparent`：透明底部指示栏。背景为 `transparent`，指示条色为 `rgba(255,255,255,0.7)`（对应 DSL `Rectangle_36_3884`）。
- `interactive-preview`：主题切换时，背景与指示条颜色同步变化。

## 3. Dynamic Response (动态响应)

- **Indicator Geometry**: 指示条固定 `112×5`，圆角 `2.5`，始终水平居中；不随容器拉伸或变形。
- **Height Stability**: 组件高度固定 `28px`，不得因任何主题切换或外部容器变化而改变。
- **Transparent Stacking**: `transparent` 模式下组件背景透明，需确保底层页面内容可见；指示条保持可见对比度（`rgba(255,255,255,0.7)`）。
- **Empty/Placeholder**: 无空态场景——指示条为组件唯一内容元素，始终渲染。

## 4. Template Injection (模版注入)

- `{{theme}}`: `light|dark|transparent`

### 4.1 Numeric Baseline (Pixso MCP DSL v2.1.15 归一值)

- 容器几何：`360×28`（light/dark/transparent 一致）。
- 指示条几何：`112×5`，圆角 `2.5`，水平居中。
- 指示条颜色：
  - Light：`rgba(0, 0, 0, 0.2)`（Rectangle_36_3886）
  - Dark：`rgba(255, 255, 255, 0.5)`（Rectangle_36_3888）
  - Transparent：`rgba(255, 255, 255, 0.7)`（Rectangle_36_3884）
- 组件外层展示容器（仅供 benchmark 参考，非组件本体）：`400×302`，`cornerRadius=5`，`stroke=rgba(137,72,249,1) 2px dash[5,5]`。

## 5. Audit Checklist

- [ ] 仅描述视觉表现，不包含业务逻辑。
- [ ] 状态命名与 benchmark 一致（`light`/`dark`/`transparent`）。
- [ ] 指示条无拉伸（固定 112×5，圆角 2.5）。
- [ ] 与 `references/4.template/aibottombar-tem.html` 的变量契约一致（唯一变量 `{{theme}}`）。
- [ ] Transparent 模式背景透明、指示条可见。
- [ ] 组件高度固定 28px，不随主题或外部容器变化。
