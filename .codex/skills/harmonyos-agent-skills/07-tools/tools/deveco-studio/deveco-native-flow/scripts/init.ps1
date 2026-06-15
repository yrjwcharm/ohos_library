# init.ps1: Multi-platform project detection and skill registration (HarmonyOS/Android/iOS)
# Usage: .\init.ps1 [project-root]    (default: current directory)

param(
    [string]$ProjectRoot = "."
)

$ErrorActionPreference = "Stop"

# Get script directory (with fallback)
$ScriptDir = $PSScriptRoot
if ([string]::IsNullOrEmpty($ScriptDir)) {
    $ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
}
if ([string]::IsNullOrEmpty($ScriptDir)) {
    $ScriptDir = Split-Path -Parent $PSCommandPath
}
if ([string]::IsNullOrEmpty($ScriptDir)) {
    $ScriptDir = $pwd.Path
}
$SkillRoot = Split-Path -Parent $ScriptDir

# Resolve to absolute path
if (-not (Test-Path $ProjectRoot)) {
    Write-Host "Error: Project root does not exist: $ProjectRoot" -ForegroundColor Red
    exit 1
}
$ProjectRoot = (Get-Item $ProjectRoot).FullName

# Normalize paths to forward slashes for config files (Markdown/JSON compatible)
$SkillRootFwd = $SkillRoot -replace '\\', '/'
$ProjectRootFwd = $ProjectRoot -replace '\\', '/'

# ---------------------------------------------------------------------------
# Helper: Write UTF-8 without BOM (compatible with PowerShell 5.1+)
# ---------------------------------------------------------------------------
function Write-Utf8NoBom {
    param(
        [string]$Path,
        [string]$Content
    )
    $Utf8NoBom = [System.Text.UTF8Encoding]::new($false)
    [System.IO.File]::WriteAllText($Path, $Content, $Utf8NoBom)
}

# ---------------------------------------------------------------------------
# 0. Detect project platform type
# ---------------------------------------------------------------------------
$HarmonyFlag = Test-Path (Join-Path $ProjectRoot "build-profile.json5")
$AndroidFlag = (Test-Path (Join-Path $ProjectRoot "build.gradle.kts")) -or (Test-Path (Join-Path $ProjectRoot "build.gradle"))
$IosFlag = $false

# Check for iOS project (xcodeproj may be in subdirectory)
$xcodeprojFiles = @(Get-ChildItem -Path $ProjectRoot -Filter "*.xcodeproj" -Recurse -Depth 2 -ErrorAction SilentlyContinue)
if ($xcodeprojFiles.Count -gt 0) {
    $IosFlag = $true
}
if (Test-Path (Join-Path $ProjectRoot "Podfile")) {
    $IosFlag = $true
}

$Platforms = @()
if ($HarmonyFlag) { $Platforms += "HarmonyOS" }
if ($AndroidFlag) { $Platforms += "Android" }
if ($IosFlag) { $Platforms += "iOS" }

$PlatformStr = $Platforms -join ","

if ($Platforms.Count -eq 0) {
    Write-Host "Warning: No known project type detected (HarmonyOS/Android/iOS). Generic config will be generated." -ForegroundColor Yellow
    Write-Host "   If the project root is incorrect, specify: .\init.ps1 <project-root>"
}

# ---------------------------------------------------------------------------
# 1. .deveco-flow/rules.md
# ---------------------------------------------------------------------------
$devecoDir = Join-Path $ProjectRoot ".deveco-flow"
if (-not (Test-Path $devecoDir)) { New-Item -ItemType Directory -Path $devecoDir -Force | Out-Null }

$platformLines = ""
if ($HarmonyFlag) { $platformLines += "- HarmonyOS (build-profile.json5 detected)`n" }
if ($AndroidFlag) { $platformLines += "- Android (Gradle build detected)`n" }
if ($IosFlag) { $platformLines += "- iOS (Xcode project detected)`n" }

$rulesContent = @"
=== MANDATORY: DEVECO NATIVE FLOW — MULTI-PLATFORM DEVELOPMENT ===

This project uses the deveco-native-flow skill for three-platform development
(HarmonyOS/Android/iOS). The skill is self-contained with built-in HarmonyOS
ArkTS knowledge routing.

## Detected Platforms
$platformLines## How to Load Skills

This project uses the deveco-native-flow skill system. To reference sub-skills:
- **Claude Code**: Read ``<skill_root>/references/<name>/SKILL.md``
- **Other AI tools**: Read the file at the path shown below and follow its instructions

### Skill Paths

| Skill | Path |
|-------|------|
| deveco-native-flow (main pipeline) | ``$SkillRootFwd/SKILL.md`` |
| Pipeline sub-skills | ``$SkillRootFwd/references/native-analyse/SKILL.md`` etc. |
| HarmonyOS knowledge (lang-syntax) | ``$SkillRootFwd/references/lang-syntax/SKILL.md`` |
| HarmonyOS components | ``$SkillRootFwd/references/component_basic_ui/SKILL.md`` etc. |
| HarmonyOS Kit APIs | ``$SkillRootFwd/references/kits_<name>/SKILL.md`` |
| HarmonyOS build-fix | ``$SkillRootFwd/references/harmony-build-fix/SKILL.md`` |
| HarmonyOS verify | ``$SkillRootFwd/references/harmony-verify/SKILL.md`` |

## HarmonyOS Knowledge Routing

When working on HarmonyOS platform:
1. Read the routing table in the main SKILL.md to identify which sub-kill to load
2. Read the appropriate references/<name>/SKILL.md for component/Kit knowledge
3. For syntax rules, read references/lang-syntax/SKILL.md
4. For knowledge search fallback, use the harmonyos_knowledge_search MCP tool

## VERIFY — Mandatory Self-Check

Before generating HarmonyOS/ArkTS code, confirm:
- [ ] Did I read the relevant references/<name>/SKILL.md for the component/Kit I'm using?
- [ ] Am I using loaded skill knowledge, NOT just my training data?
- [ ] Am I following ArkTS syntax constraints from references/lang-syntax/SKILL.md?

===
"@

Write-Utf8NoBom -Path (Join-Path $devecoDir "rules.md") -Content $rulesContent

# ---------------------------------------------------------------------------
# 2. .claude/CLAUDE.md
# ---------------------------------------------------------------------------
$claudeDir = Join-Path $ProjectRoot ".claude"
if (-not (Test-Path $claudeDir)) { New-Item -ItemType Directory -Path $claudeDir -Force | Out-Null }

$claudeContent = @"
=== DEVECO NATIVE FLOW — MULTI-PLATFORM DEVELOPMENT ===

This project uses deveco-native-flow for three-platform development.
The skill is self-contained with built-in HarmonyOS ArkTS knowledge routing.

Detected platforms: $PlatformStr

### Skill Paths

| Skill | Path |
|-------|------|
| Main pipeline | ``$SkillRootFwd/SKILL.md`` |
| HarmonyOS knowledge | ``$SkillRootFwd/references/<name>/SKILL.md`` |

### HarmonyOS Development Rules

Before coding HarmonyOS/ArkTS:
1. Read the routing table in the main SKILL.md
2. Read the relevant references/<name>/SKILL.md for component/Kit knowledge
3. Follow ArkTS syntax constraints from references/lang-syntax/SKILL.md
4. Do NOT answer from training data alone for ArkTS questions

===
"@

Write-Utf8NoBom -Path (Join-Path $claudeDir "CLAUDE.md") -Content $claudeContent

# ---------------------------------------------------------------------------
# 3. .cursor/rules/deveco-flow.mdc
# ---------------------------------------------------------------------------
$cursorDir = Join-Path (Join-Path $ProjectRoot ".cursor") "rules"
if (-not (Test-Path $cursorDir)) { New-Item -ItemType Directory -Path $cursorDir -Force | Out-Null }

$cursorContent = @"
---
description: Multi-platform development routing rules (HarmonyOS/Android/iOS)
globs: ["**/*.ets", "**/*.kt", "**/*.swift"]
alwaysApply: true
---

$rulesContent
"@

Write-Utf8NoBom -Path (Join-Path $cursorDir "deveco-flow.mdc") -Content $cursorContent

# ---------------------------------------------------------------------------
# 4. .windsurfrules
# ---------------------------------------------------------------------------
$windsurfFile = Join-Path $ProjectRoot ".windsurfrules"
$sentinelStart = "# === DEVECO NATIVE FLOW START ==="
$sentinelEnd = "# === DEVECO NATIVE FLOW END ==="

# Remove existing deveco-flow block if present
if (Test-Path $windsurfFile) {
    $windsurfRaw = [System.IO.File]::ReadAllText($windsurfFile)
    if ($windsurfRaw -and $windsurfRaw.Contains($sentinelStart)) {
        $pattern = "(?s)$([regex]::Escape($sentinelStart)).*?$([regex]::Escape($sentinelEnd))"
        $windsurfRaw = [regex]::Replace($windsurfRaw, $pattern, "")
        $windsurfRaw = $windsurfRaw.TrimEnd()
        Write-Utf8NoBom -Path $windsurfFile -Content $windsurfRaw
    }
}

# Append new block to .windsurfrules
$windsurfBlock = @"


$sentinelStart
$rulesContent
$sentinelEnd
"@

$Utf8NoBom = [System.Text.UTF8Encoding]::new($false)
if (Test-Path $windsurfFile) {
    $windsurfExisting = [System.IO.File]::ReadAllText($windsurfFile)
    [System.IO.File]::WriteAllText($windsurfFile, $windsurfExisting + $windsurfBlock, $Utf8NoBom)
} else {
    [System.IO.File]::WriteAllText($windsurfFile, $windsurfBlock, $Utf8NoBom)
}

# ---------------------------------------------------------------------------
# 5. opencode.json
# ---------------------------------------------------------------------------
$opencodeFile = Join-Path $ProjectRoot "opencode.json"

if (Test-Path $opencodeFile) {
    $opencodeRaw = [System.IO.File]::ReadAllText($opencodeFile)
    if (-not $opencodeRaw.Contains('.deveco-flow/rules.md')) {
        Write-Host "opencode.json already exists. Please add .deveco-flow/rules.md to the instructions array manually." -ForegroundColor Yellow
    }
} else {
    $opencodeJson = '{ "instructions": [".deveco-flow/rules.md"] }'
    Write-Utf8NoBom -Path $opencodeFile -Content $opencodeJson
}

# ---------------------------------------------------------------------------
# Banner
# ---------------------------------------------------------------------------
Write-Host ""
Write-Host "  DevEco Native Flow — Multi-AI Config Installed" -ForegroundColor Cyan
Write-Host ""
Write-Host "  ============================================================"
Write-Host "  Three-platform development pipeline (HarmonyOS / Android / iOS)"
Write-Host "  analyse -> plan -> coding -> build -> verify"
Write-Host "  ============================================================"
Write-Host ""
Write-Host "  Generated config files:"
Write-Host "    .deveco-flow/rules.md        (common rules)"
Write-Host "    .claude/CLAUDE.md            (Claude Code)"
Write-Host "    .cursor/rules/deveco-flow.mdc (Cursor)"
Write-Host "    .windsurfrules               (Windsurf)"
Write-Host "    opencode.json                (OpenCode)"
Write-Host ""
Write-Host "  Project: $ProjectRootFwd"
Write-Host "  Skill:   $SkillRootFwd"
Write-Host "  Platforms: $PlatformStr"