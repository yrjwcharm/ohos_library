# Reference: cardview

[Metadata]
- **Component**: `harmony-cardview`
- **中文名称**: 卡片视图
- **Template Source**: `references/4.template/cardview-tem.html`

## 1. Content Presentation (内容呈现格式)

### 1.1 Base Structure

```html
<div class="harmony-cardview harmony-cardview--{{size}}"
  data-component="cardview"
  data-size="{{size}}">
  {{#icon}}<button class="harmony-cardview__icon-btn harmony-cardview__icon-btn--{{iconPosition}}" aria-label="{{iconAria}}" type="button">
    <span class="harmony-cardview__icon hm hm-20">{{iconGlyph}}</span>
  </button>{{/icon}}
  {{#icon2}}<button class="harmony-cardview__icon-btn harmony-cardview__icon-btn--{{icon2Position}}" aria-label="{{icon2Aria}}" type="button">
    <span class="harmony-cardview__icon hm hm-20">{{icon2Glyph}}</span>
  </button>{{/icon2}}
  {{content}}
</div>
```

- 容器为相对定位，白色背景 (`rgba(255,255,255,1)`)，border-radius 20px。
- IconButton 32×32 圆形 (border-radius:50%)，背景 `rgba(0,0,0,0.047)`，绝对定位。
- Icon 20×20，HMSymbol `circle_dashed` (F0134)，颜色 `rgba(0,0,0,0.898)`。
- 默认 icon 位置：bottom-right (right:12px, bottom:12px)。
- Mini 变体含 2 个 icon：一个左 (left:12px)，一个右 (right:12px)，垂直居中 (top:50%; transform:translateY(-50%))。
- `{{content}}` 插槽用于注入卡片内容。

### 1.2 Size Variants

| Size | Width | Height | Icon 数量 | Icon 位置 |
|------|-------|--------|-----------|----------|
| Max | 328px | 496px | 1 | bottom-right (right:12, bottom:12) |
| Larger | 328px | 328px | 1 | bottom-right |
| Medium | 328px | 156px | 1 | bottom-right |
| Small | 156px | 156px | 1 | bottom-right |
| Mini | 328px | 56px | 2 | left (left:12, 垂直居中) + right (right:12, 垂直居中) |

### 1.3 Icon Button

```html
<button class="harmony-cardview__icon-btn harmony-cardview__icon-btn--br" aria-label="操作" type="button">
  <span class="harmony-cardview__icon hm hm-20">&#xF0134;</span>
</button>
```

- 32×32 圆形容器，背景 `rgba(0,0,0,0.047)`。
- Button reset: `border:0; padding:0; appearance:none; -webkit-appearance:none;`。
- Icon 20×20 HMSymbol glyph，颜色继承 `--card-icon-color`。

## 2. Interaction States (交互状态)

CardView 为容器组件，本身无交互状态。IconButton 继承自 IconButton 组件（3.Icon Button, node 36:1798），预期支持：

| 状态 | 视觉表现 |
|------|---------|
| Default | 背景 `rgba(0,0,0,0.047)` |
| Hover | 背景加深 (interactive_hover) |
| Pressed | 背景进一步加深 (interactive_pressed) |
| Focus | focus ring |

> 注：IconButton 交互状态由独立 IconButton 组件 reference 定义，cardview 仅消费其实例。

## 3. Dynamic Response (动态响应)

- **Width Stability**：由 size 变体固定宽度，不变。
- **Height Stability**：由 size 变体固定高度，不变。
- **Border Radius**：固定 20px，不变。
- **IconButton Position**：绝对定位，不随内容变化。
- **Icon Anti-Stretch**：固定 20×20，flex-shrink:0。
- **Content Slot**：`{{content}}` 插槽区域自由填充，容器不限制内部布局。

## 4. Template Injection (模版注入)

- `{{size}}`: `max` | `larger` | `medium` | `small` | `mini`
- `{{content}}`: 卡片内容插槽
- `{{#icon}}...{{/icon}}`: icon button 条件块
- `{{iconPosition}}`: `br` (bottom-right) — 默认 icon 位置
- `{{iconGlyph}}`: HMSymbol glyph 字符，默认 `&#xF0134;` (circle_dashed)
- `{{iconAria}}`: icon 无障碍标签
- `{{#icon2}}...{{/icon2}}`: 第二个 icon button 条件块 (Mini 变体)
- `{{icon2Position}}`: `right` | `left` — 第二 icon 位置
- `{{icon2Glyph}}`: 第二 icon HMSymbol glyph
- `{{icon2Aria}}`: 第二 icon 无障碍标签

### 4.1 Numeric Baseline

| 属性 | 值 |
|------|-----|
| Card Border Radius | 20px |
| Max | 328×496 |
| Larger | 328×328 |
| Medium | 328×156 |
| Small | 156×156 |
| Mini | 328×56 |
| IconButton Size | 32×32 |
| IconButton Border Radius | 50% |
| Icon Size | 20×20 |
| Icon Margin (bottom-right) | right:12px, bottom:12px |
| Icon Margin (Mini left) | left:12px, top:50%, translateY(-50%) |
| Icon Margin (Mini right) | right:12px, top:50%, translateY(-50%) |

### 4.2 Color Baseline (Design Tokens)

| Token ID | Name | Value | Usage |
|----------|------|-------|-------|
| 95:64 | comp_background_list_card | `rgba(255,255,255,1)` | 卡片背景 |
| 36:1901 | comp_background_tertiary | `rgba(0,0,0,0.047)` | IconButton 背景 |
| 36:1904 | icon_primary | `rgba(0,0,0,0.898)` | 图标颜色 |

### 4.3 Icon Baseline

| 属性 | 值 |
|------|-----|
| HMSymbol Name | circle_dashed |
| HMSymbol Codepoint | F0134 |
| Font | HMSymbolVF |
| Icon Class | `.hm.hm-20` (20×20) |

## 5. Audit Checklist

- [ ] 仅描述视觉表现，不包含业务逻辑。
- [ ] 尺寸变体完整覆盖 5 种（Max/Larger/Medium/Small/Mini）。
- [ ] 所有 `{{variable}}` 在 template 中可被消费。
- [ ] IconButton 清除默认外观（`border:0; padding:0; appearance:none;`）。
- [ ] Icon 防拉伸：固定 20×20，flex-shrink:0。
- [ ] Mini 变体双 icon 位置正确（左+右垂直居中）。
- [ ] Icon 使用 HMSymbol 字体，codepoint F0134 可追溯。
