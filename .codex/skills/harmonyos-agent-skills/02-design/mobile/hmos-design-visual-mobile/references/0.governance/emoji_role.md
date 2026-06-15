# Emoji 资源规范 (Unicode + Local Font Contract)

## 1. 目标
统一页面中 emoji 的来源、写法与字体调用方式，避免出现：
- 系统字体回退不一致
- `FE0F` / `ZWJ` / 国旗序列被漏写
- 页面里散落无法回查来源的私有区 glyph

配套文件：
- `references/0.governance/hmos-emoji-map.json`
- 字体资源：
  - `assets/HMOSColorEmojiCompat.ttf`
  - `assets/HMOSColorEmojiFlags.ttf`

当页面、组件或 benchmark 渲染涉及 emoji 时，必须同时读取本文件与 `hmos-emoji-map.json`。

## 2. 与图标的边界
- emoji 不是 `HMSymbol` 图标，禁止把 emoji 语义错误地映射到 `HMSymbol`。
- 线性系统图标、动作图标、导航图标仍优先走 `HMSymbol`，遵循 `icon_role.md`。
- 情绪表情、食物封面、电影/场景插画、国旗等彩色 emoji，优先走本地 HMOS emoji 字体。

## 3. 字体调用规则（强制）
页面若使用 emoji，必须在 HTML 中声明本地字体：

```css
@font-face {
  font-family: "HMOS Color Emoji Compat";
  font-style: normal;
  font-weight: 400;
  src: url("../../../assets/HMOSColorEmojiCompat.ttf") format("truetype");
}

@font-face {
  font-family: "HMOS Color Emoji Flags";
  font-style: normal;
  font-weight: 400;
  src: url("../../../assets/HMOSColorEmojiFlags.ttf") format("truetype");
  unicode-range: U+1F1E6-1F1FF;
}

.hm-emoji {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family:
    "HMOS Color Emoji Flags",
    "HMOS Color Emoji Compat",
    sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  flex-shrink: 0;
}
```

说明：
- `Flags` 必须放在字体栈前面，用于优先命中国旗 regional indicator 序列。
- `Compat` 负责大多数标准 emoji、`FE0F` 变体、`ZWJ` 组合、keycap 等。
- 页面文件若位于 `test-cases/page/test-cases-[n]/v[n].html`，字体路径通常应为 `../../../assets/...`。

## 4. Unicode 写法规则（强制）
1. 必须输出完整 Unicode 序列，不能只凭“看起来像一个字符”拍脑袋写。
2. 优先使用 HTML 十六进制实体，保证序列显式、可审计，例如：
   - `&#x1F3AC;`
   - `&#x1F39E;&#xFE0F;`
   - `&#x1F575;&#xFE0F;`
   - `&#x1F1FA;&#x1F1F8;`
3. 需要保留以下组合要素，严禁丢失：
   - `FE0F`：emoji variation selector
   - `200D`：ZWJ
   - `1F3FB..1F3FF`：肤色修饰符
   - `1F1E6..1F1FF`：国旗 regional indicator 成对序列
   - `20E3`：keycap enclosing mark

## 5. 资源治理规则
- 标准 emoji 的渲染不需要像 SVG/PNG 一样为每个字符单独落库图片资源。
- 但为了让 agent 稳定生成正确序列，必须以 `references/0.governance/hmos-emoji-map.json` 作为本地可回查字典。
- 若新增页面高频使用的 emoji 语义，优先补充到本地 JSON，而不是让 glyph 散落在页面中。
- 禁止直接输出私有区 codepoint 作为页面默认 emoji 来源，除非本地字典明确记录且业务明确需要厂商扩展 glyph。

## 6. 生成流程（强制）
1. 先判断该语义是否属于彩色 emoji，而非 `HMSymbol` 图标。
2. 在 `hmos-emoji-map.json` 中检索最接近的 `name` / `name_cn` / `category`。
3. 命中后：
- 使用条目中的 `html_entity`
- 若有 `unicode_sequence`，必须完整保留每个 codepoint
- 使用 `.hm-emoji` 类承载
4. 若未命中：
- 可按标准 Unicode 新增条目后再使用
- 不允许直接拍脑袋输出来源不明的序列

## 7. 可访问性与使用建议
- 纯装饰 emoji：加 `aria-hidden="true"`
- 有语义承载的 emoji：在邻近文本或 `aria-label` 中提供可读语义
- 不要把 emoji 当成唯一信息来源，例如评分、警告、操作入口仍应有文字或图标辅助

## 8. 审核门禁
以下情况直接判定不通过：
- 页面使用了 emoji，但未声明本地 HMOS emoji 字体
- 漏写 `FE0F` / `ZWJ` / 国旗双码点，导致渲染错误或退回黑白字形
- 页面中直接出现无法回查来源的私有区 emoji glyph
- 本应用 `HMSymbol` 的线性图标，却错误替换成 emoji
- 本应用 emoji 的彩色封面，却错误退化为普通文本字体显示
