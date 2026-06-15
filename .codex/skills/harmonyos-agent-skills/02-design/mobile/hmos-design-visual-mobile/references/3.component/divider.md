# Reference: divider

[Metadata]
- **Component**: `harmony-divider`
- **中文名称**: 分割线
- **Template Source**: `references/4.template/divider-tem.html`

## 1. Content Presentation (内容呈现格式)
- 一维组件：线条或块状分隔。
- 支持水平/垂直与内缩布局。

### 1.1 Base Structure
```html
<div class="harmony-divider harmony-divider-{{variant}}">
  {{content}}
</div>
```

### 1.2 Icon/Text/Action Snippet
```html
<div class="harmony-divider-slot">{{icon}}{{label}}{{action}}</div>
```

## 2. Interaction States (交互状态)
- 形态：`horizontal / inset / block / vertical`。
- 值态：`opacity` 与 `length` 控制可见度与主轴长度。
- `interactive-preview`：通过 `opacity` 连续调节分隔可见性。

## 3. Dynamic Response (动态响应)
- **Length Constraint**: 仅允许沿主轴拉伸长度；厚度必须由 variant 固定，不能随容器二次拉伸。
- **Inset Alignment**: `inset` 形态需对齐父容器内容边距，不允许脱离内容网格任意居中。
- **No Stretch Guard**: `block / vertical` 形态的厚度、圆角与透明度按源规格渲染。
- **Empty/Placeholder**: 缺省数据时可保留透明占位线，不改变组件所在轴向几何。

## 4. Template Injection (模版注入)
- `{{variant}}`: `horizontal|inset|block|vertical`
- `{{opacity}}`: 线条透明度
- `{{length}}`: 分隔线长度

### 4.1 Numeric Baseline (Pixso MCP 归一值)
- 厚度映射：
  - `horizontal` / `inset` / `vertical`：`0.5px`（symbol `1:13045`）
  - `block`：`8px`
- block 态填充透明度基线：`0.0471`（约等于 12/255）。
- 线条态描边透明度：`0.2`（vector 子层）。

## 5. Audit Checklist
- [ ] 仅描述视觉表现，不包含业务逻辑。
- [ ] 状态命名与 benchmark 一致。
- [ ] 图标与按钮无拉伸（返回图标/箭头/switch 拇指/状态栏图标）。
- [ ] 与 `references/4.template/divider-tem.html` 的变量契约一致。
