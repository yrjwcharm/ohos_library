#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import sys
import json
import subprocess
import shutil
import traceback
import argparse
from typing import Optional, List, Dict, Any


def split_comma_string(s: Optional[str]) -> List[str]:
    """Split comma-separated string into list of non-empty trimmed items."""
    if not s:
        return []
    return [item.strip() for item in s.split(',') if item.strip()]


def load_build_profile_modules(project_path: str):
    """Read and parse build-profile.json5, return the 'modules' list."""
    try:
        import json5
    except ImportError:
        raise ImportError(
            "json5 is required because no 'module' parameter was provided, "
            "and the script needs to parse build-profile.json5 to determine modules. "
            "Please install json5 via 'pip install json5' or specify the 'module' parameter."
        )

    profile_path = os.path.join(project_path, 'build-profile.json5')
    if not os.path.isfile(profile_path):
        raise FileNotFoundError(f"build-profile.json5 not found: {profile_path}")

    try:
        with open(profile_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except OSError as e:
        raise RuntimeError(f"Failed to read {profile_path}: {e}")

    try:
        data = json5.loads(content)
    except json5.JSONDecodeError as e:
        raise RuntimeError(f"Failed to parse {profile_path}: {e}")

    return data.get('modules', [])


def get_modules_from_build_profile(project_path: str) -> List[str]:
    """Parse build-profile.json5 to extract module names."""
    modules = load_build_profile_modules(project_path)
    return [m.get('name') for m in modules if m.get('name')]


def get_module_src_paths(project_path: str) -> Dict[str, str]:
    """Parse build-profile.json5 to extract module srcPath mappings.
    Returns a dict mapping module name to resolved absolute path.
    Falls back to <project_path>/<module_name> if srcPath is absent.
    """
    try:
        modules = load_build_profile_modules(project_path)
    except Exception as e:
        print(f"Warning: Failed to parse build-profile.json5 for srcPath lookup: {e}. "
              f"Result file paths will fall back to <project_path>/<module_name>.", file=sys.stderr)
        return {}

    result = {}
    for m in modules:
        name = m.get('name')
        if not name:
            continue
        src_path = m.get('srcPath', f"./{name}")
        resolved = os.path.normpath(os.path.join(project_path, src_path))
        result[name] = resolved
    return result


def find_hvigorw(project_path: str) -> Optional[str]:
    """Locate hvigorw executable in project or PATH."""
    if sys.platform == "win32":
        candidates = ["hvigorw.bat", "hvigorw"]
    else:
        candidates = ["hvigorw"]

    # Check local project directory
    for filename in candidates:
        local_path = os.path.join(project_path, filename)
        if os.path.isfile(local_path):
            if sys.platform == "win32" or os.access(local_path, os.X_OK):
                return local_path

    # Fallback to PATH lookup
    for filename in candidates:
        cmd = shutil.which(filename)
        if cmd:
            return cmd

    return None




def resolve_module_list(project_path: str, module: Optional[str]) -> List[str]:
    """Resolve list of modules to test."""
    if module is not None:
        return split_comma_string(module)
    else:
        return get_modules_from_build_profile(project_path)


def resolve_scope(project_path: str, scope: Optional[str]) -> Optional[List[str]]:
    """Resolve test scope from scope parameter."""
    if scope:
        return split_comma_string(scope)
    return None


def collect_test_results(project_path: str, modules: List[str], coverage: bool = True, asan: bool = False) -> Dict[str, Any]:
    """
    Collect test results and report paths for given modules.
    Returns a dict with keys:
      - modules: list of all expected module names
      - reports: dict mapping module name to report info
      - collected_modules: list of modules with .test/default directory AND a valid test_result_file
      - missing_modules: list of expected modules with no output directory or no test_result_file
    """
    reports = {}
    collected_modules = []
    src_paths = get_module_src_paths(project_path)
    for module in modules:
        if module in src_paths:
            module_path = src_paths[module]
        else:
            module_path = os.path.join(project_path, module)
            if src_paths:
                print(f"Warning: Module '{module}' not found in build-profile.json5 srcPath mapping. "
                      f"Falling back to directory: {module_path}", file=sys.stderr)
        test_dir = os.path.join(module_path, '.test')
        if not os.path.isdir(test_dir):
            print(f"Warning: .test directory not found for module '{module}' at: {test_dir}", file=sys.stderr)
            continue

        default_dir = os.path.join(test_dir, 'default')
        if not os.path.isdir(default_dir):
            print(f"Warning: default output directory not found for module '{module}' at: {default_dir}", file=sys.stderr)
            continue

        # Test result file and Coverage report (HTML)
        result_file = os.path.join(default_dir, 'intermediates', 'ohosTest', 'coverage_data', 'test_result.txt')
        coverage_html = os.path.join(default_dir, 'outputs', 'ohosTest', 'reports', 'index.html')
        coverage_json = os.path.join(default_dir, 'outputs', 'ohosTest', 'reports', 'coverageReport.json')
        cpp_coverage_html = os.path.join(default_dir, 'outputs', 'ohosTest', 'cpp_reports', 'index.html')
        asan_log_dir = os.path.join(default_dir, 'intermediates', 'ohosTest', 'coverage_data')

        report = {
            'test_result_file': result_file.replace('\\', '/') if os.path.isfile(result_file) else None,
        }
        if coverage:
            report['coverage_html'] = coverage_html.replace('\\', '/') if os.path.isfile(coverage_html) else None
            report['coverage_json'] = coverage_json.replace('\\', '/') if os.path.isfile(coverage_json) else None
            report['cpp_coverage_html'] = cpp_coverage_html.replace('\\', '/') if os.path.isfile(cpp_coverage_html) else None
        if asan:
            report['asan_log_dir'] = asan_log_dir.replace('\\', '/') if os.path.isdir(asan_log_dir) else None

        reports[module] = report
        collected_modules.append(module)

    actually_collected = [m for m in collected_modules if reports[m]['test_result_file'] is not None]
    missing_modules = [m for m in modules if m not in actually_collected]

    return {
        'modules': modules,
        'reports': reports,
        'collected_modules': actually_collected,
        'missing_modules': missing_modules,
    }


def run_instrument_test(
    project_path: str,
    module: Optional[str] = None,
    coverage: bool = True,
    scope: Optional[str] = None,
    asan: bool = False,
    timeout: int = 300
) -> Dict[str, Any]:
    """
    Run instrument test using hvigorw.

    Returns:
        A dictionary with:
        - success: bool
        - message: str
        - data: dict containing test results and report paths
    """
    if not os.path.isdir(project_path):
        raise ValueError(f"Project path does not exist: {project_path}")

    hvigorw_cmd = find_hvigorw(project_path)
    if not hvigorw_cmd:
        raise RuntimeError(
            "hvigorw executable not found in system PATH. "
            "Please ensure Hvigor toolchain is installed and added to PATH."
        )

    # Determine modules and scope
    module_list = resolve_module_list(project_path, module)
    scope_list = resolve_scope(project_path, scope)

    # Build command line arguments
    cmd = [hvigorw_cmd, "onDeviceTest"]
    if module_list:
        cmd.extend(["-p", f"module={','.join(module_list)}"])
    cmd.extend(["-p", f"coverage={'true' if coverage else 'false'}"])
    if scope_list:
        cmd.extend(["-p", f"scope={','.join(scope_list)}"])
    if asan:
        cmd.extend(["-p", "ohos-debug-asan=true"])

    # Run command
    try:
        result = subprocess.run(
            cmd,
            cwd=project_path,
            text=True,
            timeout=timeout,
            capture_output=True,  # capture stdout/stderr for error reporting
        )
    except subprocess.TimeoutExpired as e:
        raise RuntimeError(f"Command timed out after {timeout} seconds: {' '.join(cmd)}") from e
    except Exception as e:
        raise RuntimeError(f"Failed to execute command: {' '.join(cmd)}") from e

    if result.returncode != 0:
        # Build detailed error message
        error_msg = f"Test failed with return code {result.returncode}\n"
        if result.stdout:
            error_msg += f"STDOUT:\n{result.stdout}\n"
        if result.stderr:
            error_msg += f"STDERR:\n{result.stderr}\n"
        raise RuntimeError(error_msg)

    # Collect test results
    results_data = collect_test_results(project_path, module_list, coverage, asan)

    if results_data['missing_modules']:
        if results_data['collected_modules']:
            return {
                'success': True,
                'partial': True,
                'message': (
                    f"Instrument test completed with partial results: "
                    f"{len(results_data['collected_modules'])}/{len(module_list)} modules collected. "
                    f"Missing: {', '.join(results_data['missing_modules'])}."
                ),
                'data': results_data,
            }
        else:
            return {
                'success': True,
                'partial': True,
                'message': 'Instrument test ran but no result artifacts were found.',
                'data': results_data,
            }

    return {
        'success': True,
        'message': 'Instrument test completed successfully.',
        'data': results_data,
    }


def main():
    """Main entry point: parse command line arguments, run test, output JSON result."""
    parser = argparse.ArgumentParser(
        description='Run instrument tests using hvigorw and output results as JSON.',
        formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument(
        '--project-path',
        required=True,
        help='Absolute path to the project root directory. Required.'
    )
    parser.add_argument(
        '--module',
        help='Comma-separated list of module names to test (e.g., "entry,feature"). '
             'If omitted, modules are automatically read from build-profile.json5.'
    )
    parser.add_argument(
        '--coverage',
        action='store_true',
        default=True,
        help='Enable coverage collection. (default: enabled)'
    )
    parser.add_argument(
        '--no-coverage',
        action='store_false',
        dest='coverage',
        help='Disable coverage collection.'
    )
    parser.add_argument(
        '--scope',
        help='Comma-separated list of test suites or individual test methods to run. '
             'Format: "{suiteName}#{methodName}" (method) or "{suiteName}" (whole suite). '
             'Example: "ActsAbilityTest#testFunction1,ActsAbilityTest"'
    )
    parser.add_argument(
        '--asan',
        action='store_true',
        default=False,
        help='Enable AddressSanitizer (ASan).'
    )
    parser.add_argument(
        '--timeout',
        type=int,
        default=300,
        help='Timeout in seconds for the test command. (default: 300)'
    )

    args = parser.parse_args()

    try:
        result = run_instrument_test(
            project_path=args.project_path,
            module=args.module,
            coverage=args.coverage,
            scope=args.scope,
            asan=args.asan,
            timeout=args.timeout
        )
        # Success: output result JSON
        print(json.dumps(result, indent=2))
        sys.exit(0)

    except Exception as e:
        # Capture full traceback for debugging
        error_type = type(e).__name__
        error_message = str(e)
        details = {
            "traceback": traceback.format_exc()
        }
        if e.__cause__:
            details["cause"] = str(e.__cause__)

        output = {
            "success": False,
            "message": error_message,
            "error": {
                "type": error_type,
                "message": error_message,
                "details": details
            }
        }
        print(json.dumps(output, indent=2))
        sys.exit(1)


if __name__ == "__main__":
    main()