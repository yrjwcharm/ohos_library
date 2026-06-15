#!/usr/bin/env python3
"""
HarmonyOS Memory Leak Detection Tool - Risk API Pair Checker (non-on/off)

Scans source code for create/alloc APIs that require a paired release/destroy
call to avoid memory leaks. Covers C-API and ArkTS/JS-API rules derived from
HarmonyOS_App_MemoryLeak_Specifications.

Usage:
    python filter_risk_func.py <directory> [--json] [--output=<file>]
"""

import os
import re
import json
import argparse
from pathlib import Path
from typing import List, Dict, Any, Optional, Tuple

C_API_RULES: List[Dict[str, Any]] = [
    {"create": "napi_create_reference", "release": "napi_delete_reference",
     "risk": "high", "category": "Node-API"},
    {"create": "napi_open_handle_scope", "release": "napi_close_handle_scope",
     "risk": "high", "category": "Node-API"},
    {"create": "napi_wrap", "release": "napi_remove_wrap",
     "risk": "high", "category": "Node-API"},
    {"create": "napi_create_promise", "release": ["napi_resolve_deferred", "napi_reject_deferred"],
     "risk": "low", "category": "Node-API"},
    {"create": "napi_create_async_work", "release": "napi_delete_async_work",
     "risk": "low", "category": "Node-API"},
    {"create": "OH_Drawing_CreateSharedFontCollection", "release": "OH_Drawing_DestroyFontCollection",
     "risk": "high", "category": "Graphics"},
    {"create": "OH_Drawing_CreateFontCollection", "release": "OH_Drawing_DestroyFontCollection",
     "risk": "high", "category": "Graphics"},
    {"create": "OH_NativeImage_Create", "release": "OH_NativeImage_Destroy",
     "risk": "low", "category": "Graphics"},
    {"create": "OH_ConsumerSurface_Create", "release": "OH_NativeImage_Destroy",
     "risk": "low", "category": "Graphics"},
    {"create": "OH_NativeBuffer_Alloc", "release": "OH_NativeBuffer_Unreference",
     "risk": "low", "category": "Graphics"},
    {"create": "OH_NativeVSync_Create", "release": "OH_NativeVSync_Destroy",
     "risk": "low", "category": "Graphics"},
    {"create": "OH_NativeBuffer_Map", "release": "OH_NativeBuffer_Unmap",
     "risk": "low", "category": "Graphics"},
    {"create": "OH_NativeImage_AcquireNativeWindowBuffer", "release": "OH_NativeImage_ReleaseNativeWindowBuffer",
     "risk": "low", "category": "Graphics"},
    {"create": "OH_NativeBuffer_Reference", "release": "OH_NativeBuffer_Unreference",
     "risk": "low", "category": "Graphics"},
    {"create": "OH_Drawing_FontCreate", "release": "OH_Drawing_FontDestroy",
     "risk": "low", "category": "Graphics"},
    {"create": "OH_Drawing_TextBlobBuilderCreate", "release": "OH_Drawing_TextBlobBuilderDestroy",
     "risk": "low", "category": "Graphics"},
    {"create": "OH_Drawing_TextBlobCreateFromText", "release": "OH_Drawing_TextBlobDestroy",
     "risk": "low", "category": "Graphics"},
    {"create": "OH_Drawing_TextBlobCreateFromPosText", "release": "OH_Drawing_TextBlobDestroy",
     "risk": "low", "category": "Graphics"},
    {"create": "OH_Drawing_TextBlobCreateFromString", "release": "OH_Drawing_TextBlobDestroy",
     "risk": "low", "category": "Graphics"},
    {"create": "OH_Drawing_TextBlobBuilderMake", "release": "OH_Drawing_TextBlobDestroy",
     "risk": "low", "category": "Graphics"},
    {"create": "OH_Drawing_CanvasCreate", "release": "OH_Drawing_CanvasDestroy",
     "risk": "low", "category": "Graphics"},
    {"create": "OH_Drawing_CanvasCreateWithPixelMap", "release": "OH_Drawing_CanvasDestroy",
     "risk": "low", "category": "Graphics"},
    {"create": "OH_Drawing_CreateTypographyStyle", "release": "OH_Drawing_DestroyTypographyStyle",
     "risk": "low", "category": "Graphics"},
    {"create": "OH_Drawing_CreateTextStyle", "release": "OH_Drawing_DestroyTextStyle",
     "risk": "low", "category": "Graphics"},
    {"create": "OH_Drawing_CreateTypographyHandler", "release": "OH_Drawing_DestroyTypographyHandler",
     "risk": "low", "category": "Graphics"},
    {"create": "OH_Drawing_CreateTypography", "release": "OH_Drawing_DestroyTypography",
     "risk": "low", "category": "Graphics"},
    {"create": "OH_Drawing_CreateFontDescriptor", "release": "OH_Drawing_DestroyFontDescriptor",
     "risk": "low", "category": "Graphics"},
    {"create": "OH_Drawing_CreateFontParser", "release": "OH_Drawing_DestroyFontParser",
     "risk": "low", "category": "Graphics"},
    {"create": "OH_Drawing_CreateTextShadow", "release": "OH_Drawing_DestroyTextShadow",
     "risk": "low", "category": "Graphics"},
    {"create": "OH_Drawing_GetSystemFontConfigInfo", "release": "OH_Drawing_DestroySystemFontConfigInfo",
     "risk": "low", "category": "Graphics"},
    {"create": "OH_Drawing_CreateTextTab", "release": "OH_Drawing_DestroyTextTab",
     "risk": "low", "category": "Graphics"},
    {"create": "OH_Filter_CreateEffect", "release": "OH_Filter_Release",
     "risk": "low", "category": "Graphics"},
    {"create": "OH_NativeWindow_ReadFromParcel", "release": "OH_NativeWindow_DestroyNativeWindow",
     "risk": "high", "category": "Window"},
    {"create": "OH_NativeWindow_CreateNativeWindowFromSurfaceId", "release": "OH_NativeWindow_DestroyNativeWindow",
     "risk": "high", "category": "Window"},
    {"create": "OH_NativeWindow_CreateNativeWindowBufferFromNativeBuffer", "release": "OH_NativeWindow_DestroyNativeWindowBuffer",
     "risk": "high", "category": "Window"},
    {"create": "OH_NativeWindow_NativeObjectReference", "release": "OH_NativeWindow_NativeObjectUnreference",
     "risk": "high", "category": "Window"},
    {"create": "OH_NativeWindow_GetLastFlushedBuffer", "release": "OH_NativeWindow_NativeObjectUnreference",
     "risk": "low", "category": "Window"},
    {"create": "OH_NativeWindow_GetLastFlushedBufferV2", "release": "OH_NativeWindow_NativeObjectUnreference",
     "risk": "high", "category": "Window"},
    {"create": "OH_NativeWindow_NativeWindowRequestBuffer", "release": "OH_NativeWindow_NativeWindowFlushBuffer",
     "risk": "high", "category": "Window"},
    {"create": "OH_IPCParcel_Create", "release": "OH_IPCParcel_Destroy",
     "risk": "low", "category": "IPC"},
    {"create": "OH_JSVM_CreateReference", "release": "OH_JSVM_DeleteReference",
     "risk": "high", "category": "JSVM"},
    {"create": "OH_JSVM_OpenEnvScope", "release": "OH_JSVM_CloseEnvScope",
     "risk": "high", "category": "JSVM"},
    {"create": "OH_ArkUI_StyledString_Create", "release": "OH_ArkUI_StyledString_Destroy",
     "risk": "low", "category": "ArkUI"},
    {"create": "OH_ArkUI_NodeAdapter_Create", "release": "OH_ArkUI_NodeAdapter_Dispose",
     "risk": "low", "category": "ArkUI"},
    {"create": "OH_ArkUI_SurfaceHolder_Create", "release": "OH_ArkUI_SurfaceHolder_Dispose",
     "risk": "low", "category": "ArkUI"},
    {"create": "OH_ArkUI_SurfaceCallback_Create", "release": "OH_ArkUI_SurfaceCallback_Dispose",
     "risk": "low", "category": "ArkUI"},
    {"create": "OH_ArkUI_XComponent_Initialize", "release": "OH_ArkUI_XComponent_Finalize",
     "risk": "low", "category": "ArkUI"},
    {"create": "OH_PixelmapNative_CreatePixelmap", "release": ["OH_PixelmapNative_Destroy", "OH_PixelmapNative_Release"],
     "risk": "low", "category": "Media"},
    {"create": "OH_PixelmapImageInfo_Create", "release": "OH_PixelmapImageInfo_Release",
     "risk": "low", "category": "Media"},
    {"create": "OH_PictureNative_CreatePicture", "release": "OH_PictureNative_Release",
     "risk": "low", "category": "Media"},
    {"create": "OH_AuxiliaryPictureNative_Create", "release": "OH_AuxiliaryPictureNative_Release",
     "risk": "low", "category": "Media"},
    {"create": "OH_AuxiliaryPictureInfo_Create", "release": "OH_AuxiliaryPictureInfo_Release",
     "risk": "low", "category": "Media"},
    {"create": "OH_PixelmapInitializationOptions_Create", "release": "OH_PixelmapInitializationOptions_Release",
     "risk": "low", "category": "Media"},
    {"create": "OH_ArkWeb_CreateResponse", "release": "OH_ArkWeb_DestroyResponse",
     "risk": "high", "category": "ArkWeb"},
    {"create": "aki::TaskRunner::PostTask", "release": "napi_close_handle_scope",
     "risk": "high", "category": "ThirdParty"},
]

ARKTS_JS_API_RULES: List[Dict[str, Any]] = [
    {"create": "MessageSequence.create", "release": ".reclaim()",
     "risk": "high", "category": "IPC"},
    {"create": "commonEventManager.subscribe", "release": "subscriber = undefined",
     "risk": "high", "category": "IPC"},
    {"create": "new BuilderNode", "release": ".dispose()",
     "risk": "high", "category": "ArkUI"},
    {"create": "new ComponentContent", "release": ".dispose()",
     "risk": "low", "category": "ArkUI"},
    {"create": "Animator.create", "release": [".finish()", "= undefined"],
     "risk": "high", "category": "ArkUI"},
    {"create": "new CustomDialogController", "release": "= null",
     "risk": "high", "category": "ArkUI", "require_var_match": True},
    {"create": "createAVPlayer", "release": ".release()",
     "risk": "low", "category": "Media"},
    {"create": "createImageSource", "release": ".release()",
     "risk": "low", "category": "Media"},
    {"create": "createPixelMap", "release": ".release()",
     "risk": "high", "category": "Media"},
    {"create": "getEffectPixelMap", "release": ".release()",
     "risk": "high", "category": "Media"},
    {"create": "setInterval", "release": "clearInterval",
     "risk": "low", "category": "Common"},
    {"create": ".subscribe(", "release": ".unsubscribe()",
     "risk": "high", "category": "ThirdParty"},
    # 通用监听器检测：匹配任意 .on(...) 调用，检查是否有对应的 .off(...)
    {"create": r"\.on\s*\(", "release": r"\.off\s*\(",
     "risk": "high", "category": "EventListener", "is_listener": True, "is_generic": True},
]

C_FILE_EXTS = {'.c', '.cpp', '.cc', '.cxx', '.h', '.hpp', '.hxx'}
JS_FILE_EXTS = {'.js', '.ts', '.ets', '.jsx', '.tsx'}

def _release_patterns(rule: Dict[str, Any]) -> List[str]:
    rel = rule["release"]
    return rel if isinstance(rel, list) else [rel]


def _compile_release_regex(pattern: str) -> Any:
    if pattern.startswith("= "):
        return re.compile(r'(?:^|[^!=])=\s*' + re.escape(pattern.lstrip("= ")).rstrip())
    return re.compile(re.escape(pattern))


def _extract_event_name(line: str) -> Optional[str]:
    """从 .on(...) 或 .off(...) 调用中提取事件名称"""
    # 匹配 .on('event', ...) 或 .on("event", ...) 或 .on(`event`, ...)
    # 使用单引号包裹原始字符串，双引号不需要转义，单引号需要用 \' 转义
    match = re.search(r"\.on\s*\(\s*[\'\"]([^\'\"]+)[\'\"]", line)
    if match:
        return match.group(1)
    return None


def _check_pair(create_re: Any, release_res: List[Any], lines: List[str],
                rule: Optional[Dict[str, Any]] = None) -> List[Tuple[int, str]]:
    """
    检测文件中是否存在未配对的 API 调用。

    Args:
        create_re: 创建 API 的正则表达式
        release_res: 释放 API 的正则表达式列表
        lines: 文件的所有行
        rule: 规则字典，可能包含 require_var_match 或 is_listener 标志

    Returns:
        List[Tuple[int, str]]: 发现的问题列表，每个元素为 (行号, 代码)
    """
    issues = []
    require_var_match = rule.get("require_var_match", False) if rule else False
    is_listener = rule.get("is_listener", False) if rule else False
    is_generic = rule.get("is_generic", False) if rule else False

    for i, line in enumerate(lines):
        if not create_re.search(line):
            continue

        # 提取创建行中的变量名（如果需要变量名匹配）
        create_var = None
        if require_var_match:
            # 匹配模式：variableName: Type = new CustomDialogController
            var_match = re.search(r'(\w+)\s*:\s*\w*CustomDialogController\s*=', line)
            if var_match:
                create_var = var_match.group(1)
            elif ': CustomDialogController' in line:
                # 尝试另一种模式：dialogController: CustomDialogController = new ...
                var_match = re.search(r'(\w+)\s*:\s*CustomDialogController', line)
                if var_match:
                    create_var = var_match.group(1)

        # 提取监听器变量名和事件名（如果是监听器检测）
        listener_var = None
        event_name = None
        if is_listener:
            # 匹配：this.listener.on(...) 或 listener.on(...)
            listener_match = re.search(r'(\w+(?:\.\w+)*)\s*\.on\s*\(', line)
            if listener_match:
                listener_var = listener_match.group(1)
                event_name = _extract_event_name(line)

        found = False
        for rel_re in release_res:
            for j, other in enumerate(lines):
                if not rel_re.search(other):
                    continue

                # 如果要求变量名匹配，检查是否是同一个变量
                if require_var_match and create_var:
                    # 检查释放行是否包含相同的变量名
                    release_match = re.search(rf'{re.escape(create_var)}\s*=\s*null', other)
                    if release_match:
                        found = True
                        break
                # 如果是通用监听器检测，检查监听器变量和事件名是否匹配
                elif is_generic and listener_var and event_name:
                    # 检查是否有: listenerVar.off('eventName', ...)
                    # 或者: listenerVar.off('eventName')
                    # 支持单引号、双引号、反引号
                    pattern = rf'{re.escape(listener_var)}\s*\.off\s*\(\s*["\'`]({re.escape(event_name)})["\'`]?\s*[,)]'
                    if re.search(pattern, other):
                        found = True
                        break
                # 如果是特定监听器检测，检查是否是同一个监听器
                elif is_listener and listener_var:
                    release_listener_match = re.search(rf'{re.escape(listener_var)}\s*\.off\s*\(', other)
                    if release_listener_match:
                        found = True
                        break
                else:
                    # 原有逻辑：只要找到释放调用就认为已配对
                    found = True
                    break

            if found:
                break

        if not found:
            issues.append((i + 1, line.strip()))

    return issues


def _compile_c_rules() -> List[Tuple[Any, List[Any], Dict[str, Any]]]:
    compiled = []
    for rule in C_API_RULES:
        create_re = re.compile(re.escape(rule["create"]))
        release_res = [_compile_release_regex(r) for r in _release_patterns(rule)]
        compiled.append((create_re, release_res, rule))
    return compiled


def _compile_arkts_rules() -> List[Tuple[Any, List[Any], Dict[str, Any]]]:
    compiled = []
    for rule in ARKTS_JS_API_RULES:
        # 对于通用规则（is_generic=True），直接使用正则表达式而不转义
        if rule.get("is_generic"):
            create_re = re.compile(rule["create"])
        else:
            create_re = re.compile(re.escape(rule["create"]))
        release_res = [_compile_release_regex(r) for r in _release_patterns(rule)]
        compiled.append((create_re, release_res, rule))
    return compiled


def _is_comment(line: str, ext: str) -> bool:
    s = line.strip()
    if ext in C_FILE_EXTS:
        return s.startswith('//') or s.startswith('/*') or s.startswith('*')
    return s.startswith('//') or s.startswith('/*') or s.startswith('*')


def analyze_c_file(file_path: Path, compiled_rules: List[Tuple[Any, List[Any], Dict[str, Any]]]) -> List[Dict[str, Any]]:
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            lines = f.readlines()
    except Exception:
        return []

    code_lines = [l for l in lines if not _is_comment(l, '.c')]
    issues = []
    for create_re, release_res, rule in compiled_rules:
        hits = _check_pair(create_re, release_res, code_lines, rule)
        for line_no, code in hits:
            release_desc = ' / '.join(_release_patterns(rule))
            issues.append({
                "file": str(file_path),
                "line": line_no,
                "code": code,
                "api_type": "C-API",
                "category": rule["category"],
                "risk": rule["risk"],
                "create_api": rule["create"],
                "release_api": release_desc,
                "issue_type": "Unpaired Resource API",
            })
    return issues


def analyze_arkts_file(file_path: Path, compiled_rules: List[Tuple[Any, List[Any], Dict[str, Any]]]) -> List[Dict[str, Any]]:
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            lines = f.readlines()
    except Exception:
        return []

    ext = file_path.suffix.lower()
    code_lines = [l for l in lines if not _is_comment(l, ext)]
    issues = []
    for create_re, release_res, rule in compiled_rules:
        hits = _check_pair(create_re, release_res, code_lines, rule)
        for line_no, code in hits:
            release_desc = ' / '.join(_release_patterns(rule))

            # 对于通用监听器规则，提取事件名称以改善可读性
            create_api = rule["create"]
            if rule.get("is_generic"):
                event_name = _extract_event_name(code)
                if event_name:
                    create_api = f".on('{event_name}')"
                    release_desc = f".off('{event_name}')"

            issues.append({
                "file": str(file_path),
                "line": line_no,
                "code": code,
                "api_type": "ArkTS/JS-API",
                "category": rule["category"],
                "risk": rule["risk"],
                "create_api": create_api,
                "release_api": release_desc,
                "issue_type": "Unpaired Resource API",
            })
    return issues


def search_code(code_dir: str, output_format: str = "console", output_file: Optional[str] = None) -> Dict[str, Any]:
    c_rules = _compile_c_rules()
    arkts_rules = _compile_arkts_rules()

    all_issues: List[Dict[str, Any]] = []
    stats = {"total_files": 0, "scanned_files": 0, "issues_found": 0}

    for root, _dirs, files in os.walk(code_dir):
        for fname in files:
            fpath = Path(root) / fname
            ext = fpath.suffix.lower()
            if ext not in C_FILE_EXTS and ext not in JS_FILE_EXTS:
                continue
            stats["total_files"] += 1
            if ext in C_FILE_EXTS:
                issues = analyze_c_file(fpath, c_rules)
            else:
                issues = analyze_arkts_file(fpath, arkts_rules)
            stats["scanned_files"] += 1
            all_issues.extend(issues)

    stats["issues_found"] = len(all_issues)

    if output_format == "console":
        _print_console(all_issues, stats)
    elif output_format == "json":
        _output_json(all_issues, stats, output_file or "memleak_risk_func_report.json")
    elif output_format == "skill":
        return _format_skill(all_issues, stats)

    return {"results": all_issues, "stats": stats, "success": True}


def _print_console(issues: List[Dict[str, Any]], stats: Dict[str, Any]) -> None:
    print(f"\nScan summary: scanned {stats['scanned_files']} files")
    print("=" * 60)
    if not issues:
        print("\nNo unpaired resource API issues found.")
        return
    print(f"\nFound {len(issues)} potential leak(s):\n")
    for item in issues:
        print(f"  [{item['risk'].upper()}] {item['file']}:{item['line']}")
        print(f"    API: {item['create_api']}  ->  missing: {item['release_api']}")
        print(f"    code: {item['code']}")
        print(f"    category: {item['category']}  ({item['api_type']})")
        print("-" * 60)


def _output_json(issues: List[Dict[str, Any]], stats: Dict[str, Any], path: str) -> None:
    payload = {"scan_stats": stats, "issues": issues}
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
    print(f"\nReport saved to {path}")


def _format_skill(issues: List[Dict[str, Any]], stats: Dict[str, Any]) -> Dict[str, Any]:
    skill_issues = []
    for item in issues:
        severity = "Critical" if item["risk"] == "high" else "Minor"
        skill_issues.append({
            "severity": severity,
            "type": item["issue_type"],
            "file_path": item["file"],
            "line_number": item["line"],
            "technical_breakdown": (
                f"File {item['file']} line {item['line']} calls `{item['create_api']}` "
                f"but no corresponding `{item['release_api']}` was found in the same file. "
                f"According to HarmonyOS memory leak specification ({item['category']}), "
                f"these APIs must be paired to avoid memory leaks."
            ),
            "optimized_solution": (
                f"Ensure `{item['release_api']}` is called when the resource created by "
                f"`{item['create_api']}` is no longer needed. For component-scoped resources, "
                f"release in `aboutToDisappear()`."
            ),
            "spec_source": f"HarmonyOS_App_MemoryLeak_Specifications_c_api.md ({item['category']})"
                           if item["api_type"] == "C-API"
                           else f"HarmonyOS_App_MemoryLeak_Specifications_arkts_js_api.md ({item['category']})",
            "code_snippet": item["code"],
        })
    return {"analyzer": "risk_func_memory_leak", "stats": stats, "issues": skill_issues}


def main() -> None:
    parser = argparse.ArgumentParser(
        description="HarmonyOS Memory Leak Detection - Risk API Pair Checker",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""\
Examples:
  python filter_risk_func.py ./src
  python filter_risk_func.py ./src --json
  python filter_risk_func.py ./src --json --output=report.json
  python filter_risk_func.py ./src --skill
        """,
    )
    parser.add_argument("directory", help="Source code directory to scan")
    parser.add_argument("--json", action="store_true", help="Output JSON report")
    parser.add_argument("--output", help="Output file path (JSON mode)")
    parser.add_argument("--skill", action="store_true", help="Output skill integration format")

    args = parser.parse_args()

    if args.skill:
        fmt = "skill"
    elif args.json:
        fmt = "json"
    else:
        fmt = "console"

    result = search_code(args.directory, fmt, args.output)
    if fmt == "skill":
        print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
