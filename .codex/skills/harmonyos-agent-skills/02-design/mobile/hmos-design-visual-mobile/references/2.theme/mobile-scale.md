# Mobile Scale Tokens

## 0. Purpose
- `mobile-scale` 是面向 `360x792` 手机竖屏主场景的页面参数 token 层。
- 它用于约束页面编排、片段编排和无明确 MCP 真值区域的尺寸选择，避免移动端页面出现系统性放大。
- 它**不替代**组件 reference 中的 `Numeric Baseline`，也**不覆盖**组件私有几何。

## 1. Priority
实现时按以下顺序取值：
1. 组件 `Numeric Baseline`
2. page fragment reference
3. `mobile-scale` token
4. 页面级临时值

约束：
- 页面级临时值只允许在前三者都没有覆盖时出现。
- 页面级临时值若出现，必须吸附到最接近的 `mobile-scale` 档位。
- 页面增强层文字、容器和主视觉几何不得超过对应组件基线的 `1.15x`。

## 2. Spacing Scale
| Token | Value |
| --- | --- |
| `padding_level0` | `0px` |
| `padding_level1` | `2px` |
| `padding_level2` | `4px` |
| `padding_level3` | `6px` |
| `padding_level4` | `8px` |
| `padding_level5` | `10px` |
| `padding_level6` | `12px` |
| `padding_level7` | `14px` |
| `padding_level8` | `16px` |
| `padding_level9` | `18px` |
| `padding_level10` | `20px` |
| `padding_level11` | `22px` |
| `padding_level12` | `24px` |
| `padding_level13` | `26px` |
| `padding_level16` | `32px` |

## 3. Radius Scale
| Token | Value |
| --- | --- |
| `corner_radius_none` | `0px` |
| `corner_radius_level1` | `2px` |
| `corner_radius_level2` | `4px` |
| `corner_radius_level3` | `6px` |
| `corner_radius_level4` | `8px` |
| `corner_radius_level5` | `10px` |
| `corner_radius_level6` | `12px` |
| `corner_radius_level7` | `14px` |
| `corner_radius_level8` | `16px` |
| `corner_radius_level9` | `18px` |
| `corner_radius_level10` | `20px` |
| `corner_radius_level11` | `22px` |
| `corner_radius_level12` | `24px` |
| `corner_radius_level13` | `26px` |
| `corner_radius_level16` | `32px` |
| `corner_radius_level18` | `36px` |


## 4. Control Heights
| Token | Value |
| --- | --- |
| `--harmony-control-height-28` | `28px` |
| `--harmony-control-height-36` | `36px` |
| `--harmony-control-height-40` | `40px` |
| `--harmony-control-height-56` | `56px` |
| `--harmony-control-height-64` | `64px` |
| `--harmony-control-height-72` | `72px` |

## 5. Mobile Layout Aliases
| Alias Token | Value | Recommended Usage |
| --- | --- | --- |
| `--harmony-page-canvas-width-mobile` | `360px` | 手机画布宽度，仅用于 page/screen 根容器 |
| `--harmony-page-padding-mobile` | `16px` | 页面左右边距 |
| `--harmony-page-padding-mobile-top` | `36px` | 页面顶部边距 |
| `--harmony-page-padding-mobile-bottom` | `28px` | 页面底部边距 |
| `--harmony-page-content-width-mobile` | `328px` | 默认主内容宽，等于 360px 画布扣除左右 16px 边距 |
| `--harmony-card-gap-mobile` | `12px` | 卡片之间堆叠间距 |
| `--harmony-section-gap-tight-mobile` | `8px` | 区块之间紧凑堆叠间距 |
| `--harmony-section-gap-mobile` | `16px` | 区块之间堆叠间距 |
| `--harmony-text-gap-mobile-top` | `2px` | 主次文本上下间距 |
| `--harmony-text-gap-mobile-left` | `8px` | 主次文本左右间距 |
| `--harmony-inline-gap-tight-mobile` | `4px` | 值与箭头、微型标签间距 |
| `--harmony-inline-gap-mobile` | `12px` | 行内 icon 与文本基础间距 |
| `--harmony-inline-gap-loose-mobile` | `16px` | 行内 icon 与文本宽松间距 |

## 6. Usage Guidance
- 页面级 `padding / gap / margin / radius / height` 默认必须来自 `mobile-scale`。
- 当页面没有明确 fragment reference 时，优先使用 alias token，而不是自由拼装 spacing token。
- 固定内容块（search bar、section header、满宽卡片、列表组卡片）应使用 `--harmony-page-content-width-mobile` 或 `width: calc(100% - var(--harmony-page-padding-mobile) - var(--harmony-page-padding-mobile))` 的等效结果，不能使用 360px 画布宽代替内容宽。
- 水平滚动区域可以占满 360px 画布，但首尾内边距必须显式使用 `--harmony-page-padding-mobile`，保证首张卡片从 x=16 开始。
- 片段 reference 可以引用 `mobile-scale` 作为默认值，并在有 Pixso 真值时覆盖。
- 组件模板只有在“明显属于通用页面节奏”的值上才逐步改用 `mobile-scale`；组件私有 MCP 真值保留。

## 7. Non-goals
- 不负责平板、横屏、折叠屏的参数系统。
- 不负责具体业务组件的字段契约。
- 不直接定义字体等级；它只负责尺寸、间距、圆角和控制高度。
