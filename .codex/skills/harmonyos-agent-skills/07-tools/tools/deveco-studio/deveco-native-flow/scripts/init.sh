#!/usr/bin/env bash
# init.sh: 多平台项目检测与技能注册（支持 HarmonyOS/Android/iOS）
# 用法: ./init.sh [项目根目录]    (默认: 当前目录)

set -e

PROJECT_ROOT="${1:-.}"
PROJECT_ROOT="$(cd "$PROJECT_ROOT" && pwd)"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILL_ROOT="$(dirname "$SCRIPT_DIR")"

# ---------------------------------------------------------------------------
# 0. 检测项目平台类型
# ---------------------------------------------------------------------------
HARMONY_FLAG=false
ANDROID_FLAG=false
IOS_FLAG=false

[ -f "$PROJECT_ROOT/build-profile.json5" ] && HARMONY_FLAG=true
[ -f "$PROJECT_ROOT/build.gradle.kts" ] && ANDROID_FLAG=true
[ -f "$PROJECT_ROOT/build.gradle" ] && ANDROID_FLAG=true
# 检查 iOS 项目（xcodeproj 可能在子目录）
if [ -n "$(find "$PROJECT_ROOT" -maxdepth 2 -name '*.xcodeproj' 2>/dev/null | head -1)" ]; then
  IOS_FLAG=true
fi
[ -f "$PROJECT_ROOT/Podfile" ] && IOS_FLAG=true

PLATFORMS=()
[ "$HARMONY_FLAG" = true ] && PLATFORMS+=("HarmonyOS")
[ "$ANDROID_FLAG" = true ] && PLATFORMS+=("Android")
[ "$IOS_FLAG" = true ] && PLATFORMS+=("iOS")

PLATFORM_STR=$(IFS=','; echo "${PLATFORMS[*]}")

if [ ${#PLATFORMS[@]} -eq 0 ]; then
  echo "⚠️  未检测到已知项目类型（HarmonyOS/Android/iOS），将生成通用配置。"
  echo "   如果项目根目录不正确，请指定: ./init.sh <项目根目录>"
fi

# ---------------------------------------------------------------------------
# 1. .deveco-flow/rules.md — 通用规则（单一事实源）
# ---------------------------------------------------------------------------
mkdir -p "$PROJECT_ROOT/.deveco-flow"

cat > "$PROJECT_ROOT/.deveco-flow/rules.md" << EOF
=== MANDATORY: DEVECO NATIVE FLOW — MULTI-PLATFORM DEVELOPMENT ===

This project uses the deveco-native-flow skill for three-platform development
(HarmonyOS/Android/iOS). The skill is self-contained with built-in HarmonyOS
ArkTS knowledge routing.

## Detected Platforms
$([ "$HARMONY_FLAG" = true ] && echo "- HarmonyOS (build-profile.json5 detected)")
$([ "$ANDROID_FLAG" = true ] && echo "- Android (Gradle build detected)")
$([ "$IOS_FLAG" = true ] && echo "- iOS (Xcode project detected)")

## How to Load Skills

This project uses the deveco-native-flow skill system. To reference sub-skills:
- **Claude Code**: Read \`<skill_root>/references/<name>/SKILL.md\`
- **Other AI tools**: Read the file at the path shown below and follow its instructions

### Skill Paths

| Skill | Path |
|-------|------|
| deveco-native-flow (main pipeline) | \`$SKILL_ROOT/SKILL.md\` |
| Pipeline sub-skills | \`$SKILL_ROOT/references/native-analyse/SKILL.md\` etc. |
| HarmonyOS knowledge (lang-syntax) | \`$SKILL_ROOT/references/lang-syntax/SKILL.md\` |
| HarmonyOS components | \`$SKILL_ROOT/references/component_basic_ui/SKILL.md\` etc. |
| HarmonyOS Kit APIs | \`$SKILL_ROOT/references/kits_<name>/SKILL.md\` |
| HarmonyOS build-fix | \`$SKILL_ROOT/references/harmony-build-fix/SKILL.md\` |
| HarmonyOS verify | \`$SKILL_ROOT/references/harmony-verify/SKILL.md\` |

## HarmonyOS Knowledge Routing

When working on HarmonyOS platform:
1. Read the routing table in the main SKILL.md to identify which sub-skill to load
2. Read the appropriate references/<name>/SKILL.md for component/Kit knowledge
3. For syntax rules, read references/lang-syntax/SKILL.md
4. For knowledge search fallback, use the harmonyos_knowledge_search MCP tool

## VERIFY — Mandatory Self-Check

Before generating HarmonyOS/ArkTS code, confirm:
- [ ] Did I read the relevant references/<name>/SKILL.md for the component/Kit I'm using?
- [ ] Am I using loaded skill knowledge, NOT just my training data?
- [ ] Am I following ArkTS syntax constraints from references/lang-syntax/SKILL.md?

===
EOF

# ---------------------------------------------------------------------------
# 2. .claude/CLAUDE.md — Claude Code 专用
# ---------------------------------------------------------------------------
mkdir -p "$PROJECT_ROOT/.claude"

cat > "$PROJECT_ROOT/.claude/CLAUDE.md" << CLAUDE_EOF
=== DEVECO NATIVE FLOW — MULTI-PLATFORM DEVELOPMENT ===

This project uses deveco-native-flow for three-platform development.
The skill is self-contained with built-in HarmonyOS ArkTS knowledge routing.

Detected platforms: $PLATFORM_STR

### Skill Paths

| Skill | Path |
|-------|------|
| Main pipeline | \`$SKILL_ROOT/SKILL.md\` |
| HarmonyOS knowledge | \`$SKILL_ROOT/references/<name>/SKILL.md\` |

### HarmonyOS Development Rules

Before coding HarmonyOS/ArkTS:
1. Read the routing table in the main SKILL.md
2. Read the relevant references/<name>/SKILL.md for component/Kit knowledge
3. Follow ArkTS syntax constraints from references/lang-syntax/SKILL.md
4. Do NOT answer from training data alone for ArkTS questions

===
CLAUDE_EOF

# ---------------------------------------------------------------------------
# 3. .cursor/rules/deveco-flow.mdc — Cursor 专用
# ---------------------------------------------------------------------------
mkdir -p "$PROJECT_ROOT/.cursor/rules"

cat > "$PROJECT_ROOT/.cursor/rules/deveco-flow.mdc" << EOF
---
description: Multi-platform development routing rules (HarmonyOS/Android/iOS)
globs: ["**/*.ets", "**/*.kt", "**/*.swift"]
alwaysApply: true
---

$(cat "$PROJECT_ROOT/.deveco-flow/rules.md")
EOF

# ---------------------------------------------------------------------------
# 4. .windsurfrules — Windsurf 专用
# ---------------------------------------------------------------------------
WINDSURF_FILE="$PROJECT_ROOT/.windsurfrules"
SENTINEL_START="# === DEVECO NATIVE FLOW START ==="
SENTINEL_END="# === DEVECO NATIVE FLOW END ==="

if [ -f "$WINDSURF_FILE" ]; then
  if grep -qF "$SENTINEL_START" "$WINDSURF_FILE" 2>/dev/null; then
    sed -i.bak "/$SENTINEL_START/,/$SENTINEL_END/d" "$WINDSURF_FILE"
    rm -f "$WINDSURF_FILE.bak"
  fi
fi

{
  echo ""
  echo "$SENTINEL_START"
  cat "$PROJECT_ROOT/.deveco-flow/rules.md"
  echo "$SENTINEL_END"
} >> "$WINDSURF_FILE"

# ---------------------------------------------------------------------------
# 5. opencode.json — OpenCode 专用
# ---------------------------------------------------------------------------
OPENCODE_FILE="$PROJECT_ROOT/opencode.json"

if [ -f "$OPENCODE_FILE" ]; then
  if ! grep -qF '.deveco-flow/rules.md' "$OPENCODE_FILE" 2>/dev/null; then
    echo "⚠️  opencode.json 已存在，请手动将 \".deveco-flow/rules.md\" 添加到 instructions 数组中"
  fi
else
  cat > "$OPENCODE_FILE" << 'OPENCODE_EOF'
{
  "instructions": [".deveco-flow/rules.md"]
}
OPENCODE_EOF
fi

# ---------------------------------------------------------------------------
# Banner
# ---------------------------------------------------------------------------
cat << 'BANNER'

  🔧 DevEco Native Flow — Multi-AI Config Installed

  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  三端一致开发流水线 (HarmonyOS / Android / iOS)
  analyse → plan → coding → build → verify
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BANNER

echo "✅ 已生成以下配置文件:"
echo "   📄 .deveco-flow/rules.md        (通用规则 — 单一事实源)"
echo "   📄 .claude/CLAUDE.md            (Claude Code)"
echo "   📄 .cursor/rules/deveco-flow.mdc (Cursor)"
echo "   📄 .windsurfrules               (Windsurf)"
echo "   📄 opencode.json                (OpenCode)"
echo ""
echo "   项目: $PROJECT_ROOT"
echo "   技能: $SKILL_ROOT"
echo "   平台: $PLATFORM_STR"