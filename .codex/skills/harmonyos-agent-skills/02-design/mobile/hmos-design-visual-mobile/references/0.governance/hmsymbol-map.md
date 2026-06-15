# HMSymbol 本地字典说明

## 1. 文件位置
- 机器可读字典：`references/0.governance/hmsymbol-map.json`
- 使用规则：`references/0.governance/icon_role.md`

## 2. 数据来源
- 官方页面：`https://developer.huawei.com/consumer/cn/design/harmonyos-symbol/`
- 官方名字典 JSON：`https://developer.huawei.com/allianceCmsResource/resource/HUAWEI_Developer_VUE/template/resources/hm-symbol/name_map_new.json`

## 3. 当前本地快照
- 版本：`2.1`
- 拉取日期：`2026-03-23`
- 去重后唯一图标数：`404`

## 4. 推荐使用方式
- agent 在涉及图标时，先读 `icon_role.md`
- 再在 `hmsymbol-map.json` 中检索合适的 `name` / `name_cn`
- 命中则优先使用 `HMSymbol`
- 未命中才退回本地 SVG

## 5. JSON 结构
每个图标条目至少包含：
- `name`
- `name_cn`
- `unicode`
- `char`
- `module`
- `categories`
- `primary_categories`

## 6. 备注
- 本地字典已经按 `name + unicode` 去重。
- 若后续官方版本升级，建议重新拉取并覆盖更新 `hmsymbol-map.json`，同时在提交说明中记录版本变化。
