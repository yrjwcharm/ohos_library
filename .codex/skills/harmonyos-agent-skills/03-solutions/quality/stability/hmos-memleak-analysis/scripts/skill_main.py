#!/usr/bin/env python3
"""
HarmonyOS Memory Leak Detection Skill - Main Entry Point

This is the main entry point for the appcheck-memleak skill that integrates
with the skill framework to provide comprehensive memory leak analysis for
HarmonyOS applications.

Usage (from skill framework):
    import skill_main
    result = skill_main.analyze_codebase(code_path, language)
"""

import os
import sys
import json
from pathlib import Path
from typing import Dict, List, Any, Optional

# Import the analysis modules
from filter_on import search_code as analyze_event_listeners

def detect_napi_memory_leaks(code_path: str) -> List[Dict[str, Any]]:
    """
    Detect NAPI-related memory leaks in C/C++ files
    
    Args:
        code_path: Path to the source code directory
        
    Returns:
        List of detected memory leak issues
    """
    # This is a placeholder for NAPI memory leak detection
    # In a real implementation, this would:
    # 1. Parse C/C++ files for NAPI calls
    # 2. Check for napi_create_reference/napi_delete_reference pairs
    # 3. Look for missing napi_handle_scope in loops
    # 4. Check for proper resource cleanup
    
    issues = []
    
    # Example logic (to be implemented)
    for root, dirs, files in os.walk(code_path):
        for file in files:
            if file.endswith(('.cpp', '.c', '.h')):
                file_path = os.path.join(root, file)
                # TODO: Implement C/C++ analysis
                pass
    
    return issues

def detect_app_storage_leaks(code_path: str) -> List[Dict[str, Any]]:
    """
    Detect AppStorage-related memory leaks
    
    Args:
        code_path: Path to the source code directory
        
    Returns:
        List of detected memory leak issues
    """
    issues = []
    
    # TODO: Implement AppStorage analysis
    # Look for large objects stored in AppStorage without cleanup
    
    return issues

def detect_closure_retention_leaks(code_path: str) -> List[Dict[str, Any]]:
    """
    Detect closure retention memory leaks
    
    Args:
        code_path: Path to the source code directory
        
    Returns:
        List of detected memory leak issues
    """
    issues = []
    
    # TODO: Implement closure retention analysis
    # Look for async callbacks capturing 'this' without proper cleanup
    
    return issues

def analyze_codebase(code_path: str, language: Optional[str] = None) -> Dict[str, Any]:
    """
    Main entry point for analyzing a codebase for memory leaks
    
    Args:
        code_path: Path to the source code directory
        language: Optional language filter ('js', 'cpp', 'all')
        
    Returns:
        Comprehensive analysis results in skill format
    """
    if not os.path.exists(code_path):
        return {
            'success': False,
            'error': f'Directory not found: {code_path}',
            'issues': []
        }
    
    all_issues = []
    stats = {
        'files_analyzed': 0,
        'issues_found': 0,
        'analysis_time': 0  # TODO: Add timing
    }
    
    # Analyze event listeners (JS/TS/ArkTS)
    if language in ['js', 'arkts', None, 'all']:
        event_result = analyze_event_listeners(code_path, output_format="skill")
        if event_result and isinstance(event_result, dict) and event_result.get('issues'):
            all_issues.extend(event_result.get('issues', []))
            stats['files_analyzed'] += event_result.get('stats', {}).get('scanned_files', 0)
    
    # Analyze NAPI memory leaks (C/C++)
    if language in ['cpp', 'c', None, 'all']:
        napi_issues = detect_napi_memory_leaks(code_path)
        all_issues.extend(napi_issues)
    
    # Analyze AppStorage leaks
    if language in ['js', 'arkts', None, 'all']:
        app_storage_issues = detect_app_storage_leaks(code_path)
        all_issues.extend(app_storage_issues)
    
    # Analyze closure retention leaks
    if language in ['js', 'arkts', None, 'all']:
        closure_issues = detect_closure_retention_leaks(code_path)
        all_issues.extend(closure_issues)
    
    stats['issues_found'] = len(all_issues)
    
    # Sort issues by severity
    severity_order = {'Critical': 0, 'Major': 1, 'Minor': 2}
    all_issues.sort(key=lambda x: severity_order.get(x.get('severity', 'Minor'), 2))
    
    return {
        'success': True,
        'codebase_path': code_path,
        'language_filter': language,
        'stats': stats,
        'issues': all_issues,
        'summary': {
            'critical_issues': len([i for i in all_issues if i.get('severity') == 'Critical']),
            'major_issues': len([i for i in all_issues if i.get('severity') == 'Major']),
            'minor_issues': len([i for i in all_issues if i.get('severity') == 'Minor']),
        }
    }

def generate_report(analysis_result: Dict[str, Any], output_file: Optional[str] = None) -> str:
    """
    Generate a comprehensive memory leak report
    
    Args:
        analysis_result: Result from analyze_codebase
        output_file: Optional output file path
        
    Returns:
        Report file path or JSON string
    """
    if not analysis_result.get('success', False):
        return json.dumps(analysis_result, indent=2)
    
    # Add additional metadata
    report = {
        'tool': 'HarmonyOS Memory Leak Detection Skill',
        'version': '1.0',
        'timestamp': '2026-03-07',  # TODO: Use actual timestamp
        **analysis_result
    }
    
    report_json = json.dumps(report, indent=2, ensure_ascii=False)
    
    if output_file:
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(report_json)
        return output_file
    
    return report_json

def main():
    """Command line interface for the skill"""
    import argparse
    
    parser = argparse.ArgumentParser(
        description='HarmonyOS Memory Leak Detection Skill',
        formatter_class=argparse.RawDescriptionHelpFormatter
    )
    
    parser.add_argument('code_path', help='Path to the source code directory')
    parser.add_argument('--language', choices=['js', 'arkts', 'cpp', 'c', 'all'], 
                       help='Filter by language (default: all)')
    parser.add_argument('--output', help='Output file path')
    parser.add_argument('--json', action='store_true', help='Output JSON format')
    
    args = parser.parse_args()
    
    # Analyze the codebase
    result = analyze_codebase(args.code_path, args.language)
    
    # Generate and output report
    if args.output or args.json:
        output_file = args.output
        report_path = generate_report(result, output_file)
        print(f"Report saved to: {report_path}")
    else:
        # Print summary
        if result.get('success', False):
            summary = result.get('summary', {})
            print(f"Analysis completed for {result.get('codebase_path', 'unknown')}")
            print(f"Found {summary.get('critical_issues', 0)} critical, "
                  f"{summary.get('major_issues', 0)} major, "
                  f"{summary.get('minor_issues', 0)} minor issues")
        else:
            print(f"Analysis failed: {result.get('error', 'Unknown error')}")

if __name__ == '__main__':
    main()