#!/bin/bash

# ================================================
# Matrix skills Installer with Cache & Link
# ================================================

set -e

ALL_PLATFORMS="claude codex opencode codeagent gemini openclaw custom"

DEFAULT_CACHE_ROOT="${HOME}/.cache/ai-skill-cache"

get_platform_name() {
    case "$1" in
        claude)    echo "Claude Code" ;;
        codex)     echo "Codex CLI" ;;
        opencode)  echo "OpenCode" ;;
        codeagent) echo "CodeAgent" ;;
        gemini)    echo "Gemini CLI" ;;
        openclaw)  echo "OpenClaw" ;;
        custom)    echo "Custom Path" ;;
        *)         echo "" ;;
    esac
}

get_platform_dir() {
    case "$1" in
        claude)    echo ".claude" ;;
        codex)     echo ".codex" ;;
        opencode)  echo ".opencode" ;;
        codeagent) echo ".codeagent" ;;
        gemini)    echo ".gemini" ;;
        openclaw)  echo ".openclaw" ;;
        *)         echo "" ;;
    esac
}

is_valid_platform() {
    case "$1" in
        claude|codex|opencode|codeagent|gemini|openclaw|custom) return 0 ;;
        *) return 1 ;;
    esac
}

show_usage() {
    cat <<'EOF'
Usage: $0 <skill-name> [platforms...] [options]

Platforms:
  claude     - Claude Code
  codex      - Codex CLI
  opencode   - OpenCode
  codeagent  - CodeAgent
  gemini     - Gemini CLI
  openclaw   - OpenClaw
  custom     - Custom path (requires -d)

Options:
  -d <path>             Custom installation path (used with 'custom' platform)
  --cache-root <dir>    Local cache root directory (default: ~/.cache/ai-skill-cache)
  --link-mode <mode>    Expose mode: symlink (default) or copy
  --force-refresh       Force re-download even if skill is already cached
  --no-cache            Skip cache entirely, always download fresh
  -h, --help            Show help

Cache Strategy:
  Downloaded skills are cached under <cache-root>/matrix/<skill-name>/.
  On subsequent installs the cached copy is reused, avoiding re-download.
  Skills are exposed to target directories via symlink (default) or copy.

Examples:
  $0 my-skill claude
  $0 my-skill claude codex gemini
  $0 my-skill all
  $0 my-skill custom -d /opt/skills
  $0 my-skill claude --link-mode copy
  $0 my-skill claude --force-refresh
  $0 my-skill claude --cache-root /tmp/my-cache

If no platform specified, installs to all built-in platforms.
EOF
}

# Defaults
CUSTOM_DIR=""
SKILL_NAME=""
ARGS=""
CACHE_ROOT="${DEFAULT_CACHE_ROOT}"
LINK_MODE="symlink"
FORCE_REFRESH="false"
NO_CACHE="false"

# Parse arguments
while [ $# -gt 0 ]; do
    case "$1" in
        -h|--help)
            show_usage
            exit 0
            ;;
        -d)
            if [ -z "${2:-}" ]; then
                echo "Error: -d requires a path argument"
                exit 1
            fi
            CUSTOM_DIR="$2"
            shift 2
            ;;
        -d*)
            CUSTOM_DIR="${1#-d}"
            if [ -z "$CUSTOM_DIR" ]; then
                echo "Error: -d requires a path argument"
                exit 1
            fi
            shift
            ;;
        --cache-root)
            if [ -z "${2:-}" ]; then
                echo "Error: --cache-root requires a directory argument"
                exit 1
            fi
            CACHE_ROOT="$2"
            shift 2
            ;;
        --link-mode)
            if [ -z "${2:-}" ]; then
                echo "Error: --link-mode requires symlink or copy"
                exit 1
            fi
            LINK_MODE="$2"
            shift 2
            ;;
        --force-refresh)
            FORCE_REFRESH="true"
            shift
            ;;
        --no-cache)
            NO_CACHE="true"
            shift
            ;;
        *)
            if [ -z "$SKILL_NAME" ]; then
                SKILL_NAME="$1"
            else
                ARGS="${ARGS:+$ARGS }$1"
            fi
            shift
            ;;
    esac
done

if [ -z "$SKILL_NAME" ]; then
    show_usage
    exit 1
fi

# Validate link-mode
if [ "${LINK_MODE}" != "symlink" ] && [ "${LINK_MODE}" != "copy" ]; then
    echo "Error: --link-mode must be 'symlink' or 'copy'" >&2
    exit 1
fi

# Determine target platforms
SELECTED_PLATFORMS=""

has_custom() {
    case " $1 " in
        *" custom "*) return 0 ;;
        *) return 1 ;;
    esac
}

if [ -z "$ARGS" ]; then
    SELECTED_PLATFORMS="claude codex opencode codeagent gemini openclaw"
else
    for arg in $ARGS; do
        if [ "$arg" = "all" ]; then
            SELECTED_PLATFORMS="claude codex opencode codeagent gemini openclaw"
            break
        fi
        if ! is_valid_platform "$arg"; then
            echo "Error: Unknown platform '$arg'"
            echo ""
            show_usage
            exit 1
        fi
        case " $SELECTED_PLATFORMS " in
            *" $arg "*) ;;
            *) SELECTED_PLATFORMS="${SELECTED_PLATFORMS:+$SELECTED_PLATFORMS }$arg" ;;
        esac
    done
fi

if has_custom "$SELECTED_PLATFORMS" && [ -z "$CUSTOM_DIR" ]; then
    echo "Error: 'custom' platform requires -d <path>"
    echo ""
    show_usage
    exit 1
fi

if [ -z "$SELECTED_PLATFORMS" ]; then
    echo "Error: No valid platform selected."
    exit 1
fi

# ===================================================
# Cache logic
# ===================================================

CACHE_SKILL_DIR="${CACHE_ROOT}/matrix/${SKILL_NAME}"
CACHE_MANIFEST="${CACHE_SKILL_DIR}/.manifest.json"

# Check if a valid cached copy exists
is_cache_valid() {
    if [ "${NO_CACHE}" = "true" ]; then
        return 1
    fi
    if [ "${FORCE_REFRESH}" = "true" ]; then
        return 1
    fi
    if [ ! -f "${CACHE_MANIFEST}" ]; then
        return 1
    fi
    # Verify SKILL.md exists in cache
    if [ ! -f "${CACHE_SKILL_DIR}/SKILL.md" ]; then
        return 1
    fi
    return 0
}

# Download skill content and populate cache
populate_cache() {
    echo "Downloading ${SKILL_NAME} from Matrix API..."
    mkdir -p "${CACHE_SKILL_DIR}"

    TEMP_FILE=$(mktemp)
    curl -sL "https://matrix.openharmony.cn/api/registry/skill/${SKILL_NAME}/install?format=zip" -o "$TEMP_FILE"

    IS_ZIP=false
    if file "$TEMP_FILE" | grep -q "Zip archive"; then
        IS_ZIP=true
    fi

    # Clear old cache contents before writing
    rm -rf "${CACHE_SKILL_DIR:?}"/*

    if [ "$IS_ZIP" = true ]; then
        unzip -q -o "$TEMP_FILE" -d "${CACHE_SKILL_DIR}"
        echo "  ✓ Downloaded and extracted to cache"
    else
        cat "$TEMP_FILE" > "${CACHE_SKILL_DIR}/SKILL.md"
        echo "  ✓ Downloaded SKILL.md to cache"
    fi

    rm -f "$TEMP_FILE"

    # Write cache manifest
    TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    cat > "${CACHE_MANIFEST}" <<EOF
{
  "skillName": "${SKILL_NAME}",
  "source": "matrix",
  "cachedAt": "${TIMESTAMP}",
  "linkMode": "${LINK_MODE}"
}
EOF
}

# ===================================================
# Ensure cache is populated
# ===================================================

if is_cache_valid; then
    CACHED_AT=""
    if [ -f "${CACHE_MANIFEST}" ]; then
        CACHED_AT=$(grep -o '"cachedAt"[[:space:]]*:[[:space:]]*"[^"]*"' "${CACHE_MANIFEST}" | head -1 | cut -d'"' -f4)
    fi
    echo "Using cached ${SKILL_NAME} (cached at: ${CACHED_AT})"
else
    populate_cache
fi

# ===================================================
# Expose to target directories (symlink or copy)
# ===================================================

echo ""
echo "Installing ${SKILL_NAME} to: ${SELECTED_PLATFORMS}"
echo ""

INSTALLED_PATHS=""

for platform in $SELECTED_PLATFORMS; do
    platform_name=$(get_platform_name "$platform")

    if [ "$platform" = "custom" ]; then
        target_dir="${CUSTOM_DIR}"
    else
        platform_dir=$(get_platform_dir "$platform")
        target_dir="$HOME/${platform_dir}/skills/${SKILL_NAME}"
    fi

    echo "Installing to ${platform_name}..."

    # Remove old target
    rm -rf "$target_dir"

    if [ "${LINK_MODE}" = "symlink" ]; then
        # Ensure parent directory exists
        mkdir -p "$(dirname "$target_dir")"
        ln -s "${CACHE_SKILL_DIR}" "$target_dir"
        echo "  ✓ Linked: ${target_dir} -> ${CACHE_SKILL_DIR}"
    else
        mkdir -p "$target_dir"
        cp -R "${CACHE_SKILL_DIR}/." "$target_dir/"
        echo "  ✓ Copied to: ${target_dir}/"
    fi

    INSTALLED_PATHS="${INSTALLED_PATHS}  - ${platform_name}: ${target_dir}
"
    echo ""
done

echo "========================================"
echo "✓ Installation complete!"
echo ""
echo "Installed to:"
echo -n "$INSTALLED_PATHS"
echo "Cache: ${CACHE_SKILL_DIR}"
echo "Link mode: ${LINK_MODE}"
echo "Manifest: ${CACHE_MANIFEST}"
echo ""
echo "Restart your agent to activate the skill."
echo "========================================"
