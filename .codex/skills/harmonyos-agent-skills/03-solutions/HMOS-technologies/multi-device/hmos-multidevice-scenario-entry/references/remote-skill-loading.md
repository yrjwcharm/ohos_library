# 远端场景 Skill 按需加载

## 目标

当多设备适配入口 skill 完成路由判定、确定需要加载哪些场景 skill 时，按需将远端 skill 缓存到本地并暴露给当前 agent 使用。

## 适用平台

通过本地 shell 脚本完成，不依赖某个 agent 平台的内置 skill 下载能力：

- Claude Code
- Codex
- Qoder
- OpenClaw
- 其他支持"本地 skill 目录"的 agent

## 核心思路

1. 入口 skill 路由命中后，输出 `next_scene_refs` 指向具体场景 skill。
2. 调用 `scripts/remote_load.sh` 加载所需场景 skill。
3. 脚本从远端下载 skill 内容，缓存到本地。
4. 通过 symlink 或 copy 暴露到指定 `--target-dir`。
5. 当前 agent 在下一次 turn 或新 session 中使用这些本地 skill。

## 可加载的场景 Skill

以下 skill 按入口路由结果按需加载，无需全量预装：

| 场景 Skill | 适用场景 |
|-----------|---------|
| `hmos-multidevice-screen-window-size` | 断点、响应式布局、窗口监听 |
| `hmos-multidevice-fold-state` | 折叠/展开/悬停态、折痕 |
| `hmos-multidevice-avoid-areas` | 状态栏、导航栏、键盘避让 |
| `hmos-multidevice-interaction-methods` | 鼠标、键盘、手写笔、交互归一 |
| `hmos-multidevice-natural-orientation` | 自然方向、rotation 值、横竖屏语义 |
| `hmos-multidevice-hardware-access` | canIUse、SysCap、外设热插拔 |

## 脚本用法

基础用法：

```bash
./scripts/remote_load.sh <skill-name> custom -d <target-dir>
```

示例 — 加载单个场景 skill：

```bash
./scripts/remote_load.sh hmos-multidevice-screen-window-size custom -d ../hmos-multidevice-screen-window-size
```

示例 — 加载多个场景 skill（需逐个调用）：

```bash
./scripts/remote_load.sh hmos-multidevice-fold-state custom -d ../hmos-multidevice-fold-state
./scripts/remote_load.sh hmos-multidevice-interaction-methods custom -d ../hmos-multidevice-interaction-methods
```

### 可选参数

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `--cache-root <dir>` | 本地缓存根目录 | `~/.cache/ai-skill-cache` |
| `--link-mode <symlink\|copy>` | 暴露方式 | `symlink` |
| `--force-refresh` | 强制重新下载，忽略缓存 | 关 |
| `--no-cache` | 跳过缓存，直接下载 | 关 |

## 常见目标目录示例

以下为建议值，由上层调用方根据入口 skill 的 `next_scene_refs` 路径确定。

### 入口 skill 同级目录（推荐）

入口 skill 位于 `<workspace>/.claude/skills/hmos-multidevice-scenario-entry/`，场景 skill 安装到同级：

```text
<workspace>/.claude/skills/hmos-multidevice-screen-window-size/
<workspace>/.claude/skills/hmos-multidevice-interaction-methods/
```

## 缓存策略

- 本地缓存根目录：`~/.cache/ai-skill-cache`
- 缓存单位：`matrix/<skill-name>`
- 缓存命中条件：缓存目录下存在 `SKILL.md` 且 `.manifest.json` 存在
- 暴露方式：
  - 默认 `symlink`：目标目录创建符号链接指向缓存，更新时只需刷新缓存
  - 可切换为 `copy`：直接复制，适用于不支持符号链接的环境
- 每次缓存写入 `.manifest.json`，记录来源、时间戳和链接模式

## 安全约束

必须遵守：

1. 只允许白名单来源：
   - Matrix API：`https://matrix.openharmony.cn/api/registry/skill/`
2. 只下载 skill 内容（SKILL.md + references + assets）
3. 不从远端执行任意脚本
4. 记录本地 manifest，保留缓存路径和时间戳

## 注意事项

- 部分平台对 skill 做 session snapshot，"下载后立刻在同一个 turn 使用"不一定稳定。
- 更稳的方式是：本 turn 先缓存，下一次 turn 或新 session 再正式使用。
- `--force-refresh` 用于 skill 内容更新后强制重新下载。
