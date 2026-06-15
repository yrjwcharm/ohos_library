# Harmony Theme Token 全量表

> 说明：以下颜色值均为 ARGB 格式，前两位为透明度（Alpha）参数。

## 1. 系统基础与语义 Token

| Token | 场景类别 | Light | Dark |
| --- | --- | --- | --- |
| `brand` | 品牌色 | `#ff0a59f7` | `#ff317af7` |
| `warning` | 一级警示色 | `#ffe84026` | `#ffd94838` |
| `alert` | 二级警示色 | `#ffed6f21` | `#ffdb6b42` |
| `confirm` | 确认色 | `#ff64bb5c` | `#ff5ba854` |
| `font_primary` | 一级文本 | `#e5000000` | `#e5ffffff` |
| `font_secondary` | 二级文本 | `#99000000` | `#99ffffff` |
| `font_tertiary` | 三级文本 | `#66000000` | `#66ffffff` |
| `font_fourth` | 四级文本 | `#33000000` | `#33ffffff` |
| `font_emphasize` | 高亮文本 | `#ff0a59f7` | `#ff317af7` |
| `font_on_primary` | 一级文本反色 | `#ffffffff` | `#ffffffff` |
| `font_on_secondary` | 二级文本反色 | `#99ffffff` | `#99ffffff` |
| `font_on_tertiary` | 三级文本反色 | `#66ffffff` | `#66ffffff` |
| `font_on_fourth` | 四级文本反色 | `#33ffffff` | `#33ffffff` |
| `icon_primary` | 一级图标 | `#e5000000` | `#e5ffffff` |
| `icon_secondary` | 二级图标 | `#99000000` | `#99ffffff` |
| `icon_tertiary` | 三级图标 | `#66000000` | `#66ffffff` |
| `icon_fourth` | 四级图标 | `#33000000` | `#33ffffff` |
| `icon_emphasize` | 高亮图标 | `#ff0a59f7` | `#ff317af7` |
| `icon_sub_emphasize` | 高亮辅助图标 | `#660a59f7` | `#66317af7` |
| `icon_on_primary` | 一级图标反色 | `#ffffffff` | `#ffffffff` |
| `icon_on_secondary` | 二级图标反色 | `#99ffffff` | `#99ffffff` |
| `icon_on_tertiary` | 三级图标反色 | `#66ffffff` | `#66ffffff` |
| `icon_on_fourth` | 四级图标反色 | `#33ffffff` | `#33ffffff` |
| `background_primary` | 一级背景（实色/不透明色） | `#ffffffff` | `#ffe5e5e5` |
| `background_secondary` | 二级背景（实色/不透明色） | `#fff1f3f5` | `#ff191a1c` |
| `background_tertiary` | 三级背景（实色/不透明色） | `#ffe5e5ea` | `#ff202224` |
| `background_fourth` | 四级背景（实色/不透明色） | `#ffd1d1d6` | `#ff2e3033` |
| `background_emphasize` | 高亮背景（实色/不透明色） | `#ff0a59f7` | `#ff317af7` |
| `comp_foreground_primary` | 前背景 | `#ff000000` | `#ffe5e5e5` |
| `comp_background_primary` | 白色背景 | `#ffffffff` | `#ff202224` |
| `comp_background_primary_contrary` | 常亮背景 | `#ffffffff` | `#ffe5e5e5` |
| `comp_background_gray` | 灰色背景 | `#fff1f3f5` | `#ffe5e5ea` |
| `comp_background_secondary` | 二级背景 | `#19000000` | `#19ffffff` |
| `comp_background_tertiary` | 三级背景 | `#0c000000` | `#0cffffff` |
| `comp_background_emphasize` | 高亮背景 | `#ff0a59f7` | `#ff317af7` |
| `comp_background_neutral` | 黑色中性高亮背景 | `#ff000000` | `#ffffffff` |
| `comp_emphasize_secondary` | 20% 高亮背景 | `#330a59f7` | `#33317af7` |
| `comp_emphasize_tertiary` | 10% 高亮背景 | `#190a59f7` | `#19317af7` |
| `comp_divider` | 分割线颜色 | `#33000000` | `#33ffffff` |
| `comp_common_contrary` | 通用反色 | `#ffffffff` | `#ff000000` |
| `comp_background_focus` | 获焦态背景色 | `#fff1f3f5` | `#ff000000` |
| `comp_focused_primary` | 获焦态一级反色 | `#e5000000` | `#e5ffffff` |
| `comp_focused_secondary` | 获焦态二级反色 | `#99000000` | `#99ffffff` |
| `comp_focused_tertiary` | 获焦态三级反色 | `#66000000` | `#66ffffff` |
| `interactive_hover` | 通用悬停交互式颜色 | `#0c000000` | `#0cffffff` |
| `interactive_pressed` | 通用按压交互式颜色 | `#19000000` | `#19ffffff` |
| `interactive_focus` | 通用获焦交互式颜色 | `#ff0a59f7` | `#ff317af7` |
| `interactive_active` | 通用激活交互式颜色 | `#ff0a59f7` | `#ff317af7` |
| `interactive_select` | 通用选择交互式颜色 | `#330a59f7` | `#33317af7` |
| `interactive_click` | 通用点击交互式颜色 | `#19000000` | `#19ffffff` |


## 2. 手机字阶 Token

> 说明：这一组为主题无关的移动端排版等级，适合作为页面与组件的统一字号/字重约束。

| Token | 使用场景 | 字号 | 字重 |
| --- | --- | --- | --- |
| `display_l` | 展示文本 L | `56` | `Light` |
| `display_m` | 展示文本 M | `48` | `Light` |
| `display_s` | 展示文本 S | `38` | `Light` |
| `title_l` | 标题文本 L | `30` | `Bold` |
| `title_m` | 标题文本 M | `24` | `Bold` |
| `title_s` | 标题文本 S、标题栏组件文本 | `20` | `Bold` |
| `subtitle_l` | 子标题文本 L、列表标题文本 | `18` | `Medium` |
| `subtitle_m` | 子标题文本 M、按钮文本 | `16` | `Medium` |
| `subtitle_s` | 子标题文本 S、小按钮文本 | `14` | `Medium` |
| `body_l` | 正文文本 L、系统正文 | `16` | `Regular` |
| `body_m` | 正文文本 M、系统辅助文本 | `14` | `Regular` |
| `body_s` | 正文文本 S、系统提示文本 | `12` | `Regular` |
| `caption_l` | 说明文本 L、水印文本 | `12` | `Medium` |
| `caption_m` | 说明文本 M | `10` | `Medium` |
| `caption_s` | 说明文本 S、图表刻度 | `8` | `Medium` |
