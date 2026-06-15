# Reference: size

[Metadata]
- **Component**: `harmony-size`
- **中文名称**: 尺寸框架
- **Template Source**: `references/4.template/size-tem.html`

## 1. Content Presentation (内容呈现格式)
- 由状态栏（时间+信号图标）与底部 home-indicator 构成。
- 每个设备态必须锁定画布宽高，禁止缩放拉伸。

### 1.1 Base Structure
```html
<div class="harmony-size harmony-size-{{device}}">
  <div class="harmony-size-statusbar">{{time}}</div>
  <div class="harmony-size-content">{{content}}</div>
  <div class="harmony-size-home-indicator" {{showHomeIndicator}}></div>
</div>
```

### 1.2 Icon/Text/Action Snippet
```html
<div class="harmony-size-slot">{{time}}</div>
```

## 2. Interaction States (交互状态)
- `phone-portrait / phone-landscape / foldable / tablet-portrait / tablet-landscape`：不同设备尺寸态。
- `interactive-preview`：通过尺寸切换按钮实时切换画布尺寸。

## 3. Dynamic Response (动态响应)
- **Canvas Lock**: 不同设备态必须锁定成对的宽高值，禁止通过自由缩放模拟设备尺寸。
- **Shell Anchoring**: 状态栏与 home indicator 始终锚定到壳层边缘，不能随内部内容漂移。
- **No Stretch Guard**: 状态图标、时间文本和底部指示条保持源比例与位置逻辑。
- **Empty/Placeholder**: 缺省数据时展示标准设备壳层，不改变组件外部几何。

## 4. Template Injection (模版注入)
- `{{device}}`: `phone-portrait|phone-landscape|foldable|tablet-portrait|tablet-landscape`
- `{{time}}`: 状态栏时间
- `{{content}}`: 页面内容槽
- `{{overlay}}`: 全屏覆盖层槽（如 `bindsheet`）
- `{{showHomeIndicator}}`: 是否显示底部指示条

### 4.1 Numeric Baseline (Pixso MCP 归一值)
- 画布基线：`360x792`（`phone-portrait`）。
- 状态栏容器：高度 `36`，内边距 `8/24/8/24`。
- 状态栏时间：字号 `15`，字重 `500`，行高 `20`。
- 右侧图标组容器：`96x13`。
- 底部 home-indicator 容器：高度 `28`；指示条高度 `5`，底距 `10`，圆角 `4`。
- 壳层锚点（target `1:8083`）：
  - `statusbar`: `top=0`
  - `home-indicator`: `top=764`（`bottom=0`）

## 5. Audit Checklist
- [ ] 仅描述视觉表现，不包含业务逻辑。
- [ ] 状态命名与 benchmark 一致。
- [ ] 图标与按钮无拉伸（返回图标/箭头/switch 拇指/状态栏图标）。
- [ ] 与 `references/4.template/size-tem.html` 的变量契约一致。
- [ ] 全屏覆盖层通过 `{{overlay}}` 注入并锚定 `harmony-size` 根层，不挂载在 `.harmony-size-content` 流式层。
